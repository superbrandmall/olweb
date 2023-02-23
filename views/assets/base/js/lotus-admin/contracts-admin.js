$(document).ready(function(){
    if(getURLParameter('s')) {
        switch (getURLParameter('s')) {
            case "delete":
                successMsg('00','删除成功！');
                break;
            case "succeed":
                successMsg('00','提交成功！');
                break;
            default:
                break;
        }
        setTimeout(function () {
            window.history.pushState("object or string", "Title", "/lotus-admin/"+refineCreateUrl() );
        },1000);
    }
    
    if(!sessionStorage.getItem("CONTRACT_STATUS") || sessionStorage.getItem("CONTRACT_STATUS") == null || sessionStorage.getItem("CONTRACT_STATUS") == '') {
        findDictCodeByDictTypeCode('CONTRACT_STATUS');
    }
    if(!sessionStorage.getItem("UNIT_TYPE") || sessionStorage.getItem("UNIT_TYPE") == null || sessionStorage.getItem("UNIT_TYPE") == '') {
        findDictCodeByDictTypeCode('UNIT_TYPE');
    }
    if(!sessionStorage.getItem("RENT_CALCULATION_MODE") || sessionStorage.getItem("RENT_CALCULATION_MODE") == null || sessionStorage.getItem("RENT_CALCULATION_MODE") == '') {
        findDictCodeByDictTypeCode('RENT_CALCULATION_MODE');
    }
    if($.cookie('searchContractsContractStatus') != ''){
        $('#contractStatus').val($.cookie('searchContractsContractStatus')).trigger('change');
    }
    if($.cookie('searchContractsContractVersion') != ''){
        $('#contractVersion').val($.cookie('searchContractsContractVersion')).trigger('change');
    }
    if($.cookie('searchContractsContractNo') != ''){
        $('#contractNo').val($.cookie('searchContractsContractNo'));
    }
    if($.cookie('searchContractsSelectTenantVal') != null){
        var newOption = new Option($.cookie('searchContractsSelectTenantTxt'), $.cookie('searchContractsSelectTenantVal'), true, true);
        $('#selectTenant').append(newOption).trigger('change');
    }
    if($.cookie('searchContractsSelectDepartmentVal') != null){
        $('#department').val($.cookie('searchContractsSelectDepartmentVal')).trigger('change');
    }
    if($.cookie('searchContractsSelectStoreVal') != null){
        var newOption = new Option($.cookie('searchContractsSelectStoreTxt'), $.cookie('searchContractsSelectStoreVal'), true, true);
        $('#selectStore').append(newOption).trigger('change');
    }
    
    var items = getURLParameter('items') || $('.page-size').first().text();
    if(getURLParameter('page') && getURLParameter('page') >= 1){
        findAllContractsByKVCondition(getURLParameter('page'),items);
    } else {
        findAllContractsByKVCondition(1,items);
    }

    switch (getURLParameter('items')) {
        case '10':
            $('.page-size').text('10');
            break;
        case '20':
            $('.page-size').text('20');
            break;
        case '30':
            $('.page-size').text('30');
            break;
        case '50':
            $('.page-size').text('50');
            break;
        default:
            $('.page-size').text('20');
            break;
    }
    
    updateSelectTenantDropDown(50);
    
    if($("#department").val() != '' && $("#department").val() != null){
        updateSelectStoreDropDownByMallCode(10,$("#department").val());
    }
    $("#department").on('change',function(){
        updateSelectStoreDropDownByMallCode(10,$(this).val());
    })
    
    $('#clear').click(function(){
        $('#contractNo').val('');
        $('#selectTenant, #selectStore').empty(); 
        $('#department, #contractStatus, #contractVersion').val("").trigger('change');
        $('#selectTenant, #selectStore').select2("val", "");
        
        $.cookie('searchContractsContractStatus','');
        $.cookie('searchContractsContractNo', '');
        $.cookie('searchContractsContractVersion','');
        $.cookie('searchContractsSelectTenantVal', null);
        $.cookie('searchContractsSelectTenantTxt', null);
        $.cookie('searchContractsSelectStoreVal', null);
        $.cookie('searchContractsSelectDepartmentVal', null);
    })
    
    $('#search').click(function(){
        $.cookie('searchContractsContractStatus', $('#contractStatus').val());
        $.cookie('searchContractsContractNo', $('#contractNo').val());
        $.cookie('searchContractsContractVersion',$('#contractVersion').val());
        $.cookie('searchContractsSelectTenantVal', $('#selectTenant').val());
        $.cookie('searchContractsSelectTenantTxt', $('#selectTenant').text());
        $.cookie('searchContractsSelectDepartmentVal', $('#department').val());
        $.cookie('searchContractsSelectStoreVal', $('#selectStore').val());
        $.cookie('searchContractsSelectStoreTxt', $('#selectStore').text());
        findAllContractsByKVCondition(1,items);
    })
    
    $('.fixed-table-body').on('scroll', scrollHandle);
});

function findAllContractsByKVCondition(p,c){
    $('#contracts').html('');
    var params = [];
    var param = {};
    
    param = {
        "columnName": "contractName",
        "columnPatten": "",
        "conditionOperator": "",
        "operator": "!=",
        "value": 'KOW'
    }
    params.push(param);
    
    if($.cookie('searchContractsContractStatus') != null && $.cookie('searchContractsContractStatus') != ''){
        param = {
            "columnName": "contractStatus",
            "columnPatten": "",
            "operator": "AND",
            "value": $.cookie('searchContractsContractStatus')
        }
    } else {
            param = {
            "columnName": "state",
            "columnPatten": "",
            "operator": "AND",
            "value": 1
        }
    }
    
    params.push(param);
    
    if($.cookie('searchContractsSelectDepartmentVal') != null && $.cookie('searchContractsSelectDepartmentVal') != '' && $.cookie('searchContractsSelectDepartmentVal') != 'null'){
        param = {
            "columnName": "mallCode",
            "columnPatten": "",
            "operator": "AND",
            "value": $.cookie('searchContractsSelectDepartmentVal')
        }
        params.push(param);
    }
    
    if($.cookie('searchContractsContractVersion') != null && $.cookie('searchContractsContractVersion') != ''){
        param = {
            "columnName": "contractVersion",
            "columnPatten": "",
            "operator": "AND",
            "value": $.cookie('searchContractsContractVersion')
        }
        params.push(param);
    }
    
    if($.cookie('searchContractsContractNo') != null && $.cookie('searchContractsContractNo') != ''){
        param = {
            "columnName": "contractNo",
            "columnPatten": "",
            "operator": "AND",
            "value": $.cookie('searchContractsContractNo')
        }
        params.push(param);
    }

    if($.cookie('searchContractsSelectTenantTxt') != null && $.cookie('searchContractsSelectTenantTxt') != '' && $.cookie('searchContractsSelectTenantTxt') != 'null'){
        param = {
            "columnName": "tenantCode",
            "columnPatten": "",
            "operator": "AND",
            "value": $.cookie('searchContractsSelectTenantTxt').split(' | ')[0]
        }
        params.push(param);
    }
    
    if($.cookie('searchContractsSelectStoreVal') != null && $.cookie('searchContractsSelectStoreVal') != '' && $.cookie('searchContractsSelectStoreVal') != 'null'){
        param = {
            "columnName": "shopCode",
            "columnPatten": "",
            "operator": "AND",
            "value": $.cookie('searchContractsSelectStoreVal').split(':::')[1]
        }
        params.push(param);
    }
        
    var map = {
        "params": params
    }
    
    $.ajax({
        url: $.api.baseLotus+"/api/user/contract/lotus/findAllByKVCondition?page="+(p-1)+"&size="+c+"&sort=id,desc",
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
        success: function (response, status, xhr) {
            $('#loader').hide();
            if(response.code === 'C0') {
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                }
                
                if(response.data.content.length > 0) { 
                    var pages =  response.data.totalPages;
                    generatePages(p, pages, c);
                    
                    $.each(response.data.content, function(i,v){
                        var modality = '', link = '';
                        if(v.brandLotus != null){
                            modality = v.brandLotus.modality3;
                            
                            if(v.brandLotus.modality4 != null){
                                modality = modality + '（' + v.brandLotus.modality4 + '）';
                            }
                        }
                        
                        if(v.contractStatus == 'init'){
                            link = '<a href="/lotus-admin/contract-init?id='+v.contractNo+'&contractVersion='+v.contractVersion+'">'+(v.bizId || v.code)+'</a>';
                        } else {
                            link = '<a href="/lotus-admin/contract-summary?id='+v.contractNo+'&contractVersion='+v.contractVersion+'">'+(v.bizId || v.code)+'</a>';
                        }
                        
                        var tbg = '#fff';
                        if(i%2==0){
                            tbg = '#f9f9f9';
                        }
                        
                        $('#contracts').append('\
                            <tr data-index="'+i+'">\n\
                            <td style="background: '+tbg+'; z-index: 1; border-right: solid 2px #ddd;">'+link+'</td>\n\
                            <td>'+(v.vshopLotus != null ? renderUnitType(v.vshopLotus.unitType) : '')+'</td>\n\
                            <td>'+modality+'</td>\n\
                            <td>'+(v.tenantName+'['+v.tenantNo+']' || '')+'</td>\n\
                            <td>'+(v.contractName || '')+'</td>\n\
                            <td>'+v.contractNo+'</td>\n\
                            <td>'+(renderContractStatus(v.contractStatus) || '')+'</td>\n\
                            <td>'+(v.mallName+'['+v.mallCode+']' || '')+'</td>\n\
                            <td>'+(v.vshopLotus != null ? v.vshopLotus.unitName+'['+v.vshopLotus.unitCode+']' : '')+'</td>\n\
                            <td>'+(v.unitArea || '')+'㎡</td>\n\
                            <td>'+(v.vshopLotus != null ? v.vshopLotus.floorName : '')+'</td>\n\
                            <td>'+v.startDate+'～'+v.endDate+'</td>\n\
                            <td>'+(renderRentCalculationMode(v.rentCalculationMode) || '')+'</td>\n\
                        </tr>');
                    });
                    
                    if(p == pages){
                        $(".pagination-info").html('显示 '+Math.ceil((p-1)*c+1)+' 到 '+response.data.totalElements+' 行，共 '+response.data.totalElements+'行');
                    } else {
                        $(".pagination-info").html('显示 '+Math.ceil((p-1)*c+1)+' 到 '+Math.ceil((p-1)*c+Number(c))+' 行，共 '+response.data.totalElements+'行');
                    }
                } else {
                    $('#contracts').html('<tr><td colspan="13" style="text-align: center;">没有找到任何记录！</td></tr>');
                }
            } else {
                alertMsg(response.code,response.customerMessage);
            } 
        }
    });
}