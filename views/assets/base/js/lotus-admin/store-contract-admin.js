$(document).ready(function(){
    findStoreByCode();
    if(!sessionStorage.getItem("CONTRACT_STATUS") || sessionStorage.getItem("CONTRACT_STATUS") == null || sessionStorage.getItem("CONTRACT_STATUS") == '') {
        findDictCodeByDictTypeCode('CONTRACT_STATUS');
    }
})

function findStoreByCode() {
    $.ajax({
        url: $.api.baseLotus+"/api/vshop/lotus/findAllByShopCode?shopCode="+getURLParameter('id'),
        type: "GET",
        async: false,
        dataType: "json",
        contentType: "application/json",
        beforeSend: function(request) {
            $('#loader').show();
            request.setRequestHeader("Login", $.cookie('login'));
            request.setRequestHeader("Authorization", $.cookie('authorization'));
            request.setRequestHeader("Lang", $.cookie('lang'));
            request.setRequestHeader("Source", "onlineleasing");
        },
        complete: function(){},
        success: function (response, status, xhr) {
            $('#loader').hide();
            if(response.code === 'C0') {
                if(xhr.getResponseHeader("Login") !== null){
                    $.cookie('login', xhr.getResponseHeader("Login"));
                }
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                }
                
                if(response.data != null && response.data != ''){
                    $('#state').text(response.data.state == 1 ? '使用中' : '已删除');
                    $('#shopStatus').text(response.data.shopStatus == 1 ? '空闲' : '租用');
                    $('#name2').text(response.data.unitName+'['+response.data.unitCode+']');
                    findContractsByStore();
                }
            }
        }
    })
}

function findContractsByStore() {
    var map = {
        key: getURLParameter('id'),
        operator: "OR",
        params: [
          "shopCode"
        ],
        sorts: []
    }
                
    $.ajax({
        url: $.api.baseLotus+"/api/contract/lotus/findAllByFreeCondition?page=0&size=100&sort=id,desc",
        type: "POST",
        data: JSON.stringify(map),
        async: false,
        dataType: "json",
        contentType: "application/json",
        beforeSend: function(request) {
            $('#loader').show();
            request.setRequestHeader("Login", $.cookie('login'));
            request.setRequestHeader("Authorization", $.cookie('authorization'));
            request.setRequestHeader("Lang", $.cookie('lang'));
            request.setRequestHeader("Source", "onlineleasing");
        },
        complete: function(){},
        success: function (response, status, xhr) {
            $('#loader').hide();
            if(response.code === 'C0') {
                if(xhr.getResponseHeader("Login") !== null){
                    $.cookie('login', xhr.getResponseHeader("Login"));
                }
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                }
                
                if(response.data.content.length > 0) {
                    $.each(response.data.content, function(i,v){
                        var formType;
                        switch (v.formType.toLowerCase()) {
                            case "new":
                                formType = '新签';
                                break;
                            case "renew":
                                formType = '续签';
                                break;
                            case "termination":
                                formType = '终止';
                                break;
                            case "modify":
                                formType = '变更';
                                break;
                            default:
                                break;
                        }
                            
                        $('#store-contract').append('\
                            <tr data-index="'+i+'">\n\
                            <td>'+(i*1+1)+'</td>\n\
                            <td>'+v.startDate+'~'+v.endDate+'</td>\n\
                            <td>'+v.tenantName+'</td>\n\
                            <td><a href="/lotus-admin/contract-summary?id='+v.contractNo+'&contractVersion='+v.contractVersion+'">'+(v.contractName+'['+v.contractNo+']')+'</a></td>\n\
                            <td>'+formType+'</td>\n\
                            <td>'+(v.brandName || '')+'</td>\n\
                            <td><span class="">'+(renderContractStatus(v.contractStatus) || '')+'</span></td>\n\
                            <td>租赁</td>\n\
                        </tr>');
                    })
                } else {
                    $('#store-contract').html('<tr><td colspan="8" style="text-align: center;">没有找到任何记录！</td></tr>');
                }
                
            }
        }
    })
}