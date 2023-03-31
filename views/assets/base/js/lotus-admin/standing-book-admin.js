$(document).ready(function(){
    if(!sessionStorage.getItem("CONTRACT_STATUS") || sessionStorage.getItem("CONTRACT_STATUS") == null || sessionStorage.getItem("CONTRACT_STATUS") == '') {
        findDictCodeByDictTypeCode('CONTRACT_STATUS');
    }
    if(!sessionStorage.getItem("UNIT_TYPE") || sessionStorage.getItem("UNIT_TYPE") == null || sessionStorage.getItem("UNIT_TYPE") == '') {
        findDictCodeByDictTypeCode('UNIT_TYPE');
    }
    if(!sessionStorage.getItem("RENT_CALCULATION_MODE") || sessionStorage.getItem("RENT_CALCULATION_MODE") == null || sessionStorage.getItem("RENT_CALCULATION_MODE") == '') {
        findDictCodeByDictTypeCode('RENT_CALCULATION_MODE');
    }
    if($.cookie('searchStandingBooksSelectDepartmentVal') != null){
        $('#department').val($.cookie('searchStandingBooksSelectDepartmentVal')).trigger('change');
    }
    
    var items = getURLParameter('items') || $('.page-size').first().text();
    if(getURLParameter('page') && getURLParameter('page') >= 1){
        findAllContractsByFreeCondition(getURLParameter('page'),items);
    } else {
        findAllContractsByFreeCondition(1,items);
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
        
    $('#contractStatus').show();
    
    $('#clear').click(function(){
        $('#department').val("").trigger('change');
        $.cookie('searchStandingBooksSelectDepartmentVal', null);
    })
    
    $('#search').click(function(){
        $.cookie('searchStandingBooksSelectDepartmentVal', $('#department').val());
        findAllContractsByFreeCondition(1,items);
    })
    
    $('.fixed-table-body').on('scroll', scrollHandle);
});

function findAllContractsByFreeCondition(p,c){
    $('#standing-book').html('');
    var map = {};
    if($.cookie('searchStandingBooksSelectDepartmentVal') != null && $.cookie('searchStandingBooksSelectDepartmentVal') != '' && $.cookie('searchStandingBooksSelectDepartmentVal') != 'null'){
        map = {
            "key": $.cookie('searchStandingBooksSelectDepartmentVal'),
            "operator": "OR",
            "params": [
              "mallCode"
            ]
        }
    } else {
        if($('#select2-department-container').text() != '未选择'){
            map = {
                "key": $('#select2-department-container').text().split('[')[1].split(']')[0],
                "operator": "OR",
                "params": [
                  "mallCode"
                ]
            }
        } else {
            map = {
                "key": 'leasing',
                "operator": "OR",
                "params": [
                  "contractType"
                ]
            }
        }
    }
    
    $.ajax({
        url: $.api.baseLotus+"/api/contract/lotus/findAllByFreeCondition?page="+(p-1)+"&size="+c+"&sort=id,desc",
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
                        var link = '';
                        if(v.contractStatus == 'init'){
                            link = '<a href="/lotus-admin/contract-init?id='+v.contractNo+'&contractVersion='+v.contractVersion+'">'+(v.bizId || v.code)+'</a>';
                        } else {
                            link = '<a href="/lotus-admin/contract-summary?id='+v.contractNo+'&contractVersion='+v.contractVersion+'">'+(v.bizId || v.code)+'</a>';
                        }
                        
                        var tbg = '#fff';
                        if(i%2==0){
                            tbg = '#f9f9f9';
                        }
                        
                        var unitType;
                        switch (v.unitCode.substring(3,4)) {
                            case "C":
                                unitType = '临时柜';
                                break;
                            case "S":
                                unitType = '仓库';
                                break;
                            case "T":
                                unitType = '基站';
                                break;
                            case "R":
                                unitType = '停车场';
                                break;
                            case "A":
                                unitType = '广告位';
                                break;
                            default:
                                unitType = '正柜';
                                break;
                        }
                        
                        var fixRentList = '', deductList = '', propertyFeeList = '', promotionFeeList = '';
                        if(v.fixedRentList != null && v.fixedRentList.length > 0){
                            $.each(v.fixedRentList, function(j,w){
                                fixRentList += w.startDate+'~'+w.endDate+', '+w.amount+'元/月'+(j!=v.fixedRentList.length-1 ? ', <br>' : '');
                            })
                        }
                        
                        if(v.deductList != null && v.deductList.length > 0){
                            $.each(v.deductList, function(j,w){
                                deductList += w.startDate+'~'+w.endDate+', '+parseFloat(w.deduct)*100+'%'+(j!=v.deductList.length-1 ? ', <br>' : '');
                            })
                        }
                        
                        if(v.propertyFeeList != null && v.propertyFeeList.length > 0){
                            $.each(v.propertyFeeList, function(j,w){
                                propertyFeeList += w.startDate+'~'+w.endDate+', '+w.amount+'元/月'+(j!=v.propertyFeeList.length-1 ? ', <br>' : '');
                            })
                        }
                        
                        if(v.promotionFeeList != null && v.promotionFeeList.length > 0){
                            $.each(v.promotionFeeList, function(j,w){
                                promotionFeeList += w.startDate+'~'+w.endDate+', '+w.amount+'元/月'+(j!=v.promotionFeeList.length-1 ? ', <br>' : '');
                            })
                        }
                        
                        $('#standing-book').append('\
                            <tr data-index="'+i+'">\n\
                            <td style="background: '+tbg+'; z-index: 1; border-right: solid 2px #ddd;">'+link+'</td>\n\
                            <td>'+unitType+'</td>\n\
                            <td>'+(v.bizTypeName || '')+'</td>\n\
                            <td>'+(v.contractName || '')+'</td>\n\
                            <td>'+(renderContractStatus(v.contractStatus) || '')+'</td>\n\
                            <td>'+(v.mallName || '')+(v.floorName || '')+'</td>\n\
                            <td>'+(renderRentCalculationMode(v.rentCalculationMode) || '')+'</td>\n\
                            <td>'+(v.unitName || '')+'</td>\n\
                            <td>'+(v.area || '')+'㎡</td>\n\
                            <td>'+(v.tenantName+'['+v.tenantNo+']' || '')+'</td>\n\
                            <td>'+(v.contractNo || '')+'</td>\n\
                            <td>'+(v.awardDate || '')+'</td>\n\
                            <td>'+(v.startDate || '')+'</td>\n\
                            <td>'+(v.endDate || '')+'</td>\n\
                            <td>'+(v.deliveryDate || '')+'</td>\n\
                            <td>'+(v.bizDate || '')+'</td>\n\
                            <td>'+(v.freeDays || '0')+'天</td>\n\
                            <td>'+fixRentList+'</td>\n\
                            <td>'+deductList+'</td>\n\
                            <td>'+propertyFeeList+'</td>\n\
                            <td>'+promotionFeeList+'</td>\n\
                            <td><div title="'+v.remark+'" style="width: 200px;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;">'+(v.remark || '')+'</div></td>\n\
                        </tr>');
                    });
                    
                    if(p == pages){
                        $(".pagination-info").html('显示 '+Math.ceil((p-1)*c+1)+' 到 '+response.data.totalElements+' 行，共 '+response.data.totalElements+'行');
                    } else {
                        $(".pagination-info").html('显示 '+Math.ceil((p-1)*c+1)+' 到 '+Math.ceil((p-1)*c+Number(c))+' 行，共 '+response.data.totalElements+'行');
                    }
                } else {
                    $('#standing-book').html('<tr><td colspan="22" style="text-align: center;">没有找到任何记录！</td></tr>');
                }
            } else {
                alertMsg(response.code,response.customerMessage);
            } 
        }
    });
}