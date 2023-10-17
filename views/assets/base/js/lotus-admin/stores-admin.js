$(document).ready(function(){
    if(getURLParameter('s')) {
        switch (getURLParameter('s')) {
            case "succeed":
                successMsg('00','保存成功！');
                break;
            default:
                break;
        }
        setTimeout(function () {
            window.history.pushState("object or string", "Title", "/lotus-admin/"+refineCreateUrl() );
        },1000);
    }
    
    if($.cookie('searchUnit') != ''){
        $('#unit').val($.cookie('searchUnit'));
    }
    
    if($.cookie('searchShopStatus') != null){
        $('#shopStatus').val($.cookie('searchShopStatus')).trigger('change');
    }
    
    if($.cookie('searchUnitType') != null){
        $('#unitType').val($.cookie('searchUnitType')).trigger('change');
    }
    
    var items = getURLParameter('items') || $('.page-size').first().text();
    if(getURLParameter('page') && getURLParameter('page') >= 1){
        findAllStoresByKVCondition(getURLParameter('page'),items);
    } else {
        findAllStoresByKVCondition(1,items);
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
    
    if($.cookie('searchMallCode') != 'null' && $.cookie('searchMallCode') != null){
        var newOption = new Option($.cookie('searchMallCode').split(':::')[0], $.cookie('searchMallCode').split(':::')[1], true, true);
        $('#mallCode').append(newOption).trigger('change');
    } else {
        $("#mallCode").val(null).trigger('change');
    }
    
    updateUserDropDown(20);
    
    $('#clear').click(function(){
        $('#unit').val('');
        $('#state, #shopStatus, #unitType, #mallCode, #approveFirst').val('').trigger('change');
        
        $.cookie('searchUnitState',null);
        $.cookie('searchUnit', '');
        $.cookie('searchShopStatus',null);
        $.cookie('searchUnitType', null);
        $.cookie('searchUser', null);
        $.cookie('searchMallCode', null);
    })
    
    $('#search').click(function(){
        $.cookie('searchUnitState',$('#state').val());
        $.cookie('searchShopStatus',$('#shopStatus').val());
        $.cookie('searchUnit', $('#unit').val());
        $.cookie('searchUnitType', $('#unitType').val());
        $.cookie('searchUser', $('#approveFirst').val());
        if($('#mallCode').val() != null){
            $.cookie('searchMallCode', $('#mallCode').find('option:selected').text().split(' [ ')[0]+':::'+$('#mallCode').val());
        } else {
            $.cookie('searchMallCode', null);
        }
        
        findAllStoresByKVCondition(1,items);
    })
    
    $('.fixed-table-body').on('scroll', scrollHandle);
});

function findAllStoresByKVCondition(p,c){
    $('#stores').html('');
    
    var params = [];
    var param = {};
    var conditionGroups = [];
    
    params = [{
        "columnName": "userCode",
        "columnPatten": "",
        "conditionOperator": "AND",
        "operator": "=",
        "value": $.cookie('uid')
    },{
        "columnName": "unitType",
        "columnPatten": "",
        "conditionOperator": "AND",
        "operator": "!=",
        "value": 'kow'
    }]

    if($.cookie('searchUnitState') != null && $.cookie('searchUnitState') != '' && $.cookie('searchUnitState') != 'null'){
        param = {
            "columnName": "remarkFirst",
            "columnPatten": "",
            "operator": "AND",
            "value": $.cookie('searchUnitState')
        }
        params.push(param);
    }
    
    if($.cookie('searchShopStatus') != null && $.cookie('searchShopStatus') != '' && $.cookie('searchShopStatus') != 'null'){
        param = {
            "columnName": "shopStatus",
            "columnPatten": "",
            "conditionOperator": "AND",
            "operator": "=",
            "value": $.cookie('searchShopStatus')
        }
        params.push(param);
    }

    if($.cookie('searchUnitType') != null && $.cookie('searchUnitType') != '' && $.cookie('searchUnitType') != 'null'){
        param = {
            "columnName": "unitType",
            "columnPatten": "",
            "operator": "AND",
            "value": $.cookie('searchUnitType').split(':::')[1]
        }
        params.push(param);
    }
    
    if($.cookie('searchMallCode') != 'null' && $.cookie('searchMallCode') != null && $.cookie('searchMallCode') != ''){
        param = {
            "columnName": "mallCode",
            "columnPatten": "",
            "operator": "AND",
            "value": $.cookie('searchMallCode').split(':::')[1]
        }
        params.push(param);
    } else {
        if($.cookie('userModules') && $.cookie('userModules') != '' && $.cookie('userModules') != null){
            var tmc = 0, mc = '';
            $.each(JSON.parse($.cookie('userModules')), function(j,w) {
                if(w.roleCode == 'CROLE211008000001' && w.moduleName == '门店对接人') {
                    tmc = 1;
                    mc += w.moduleCode+';';
                }
            })
            
            if(tmc == 1){
                param = {
                    "columnName": "mallCode",
                    "columnPatten": "",
                    "conditionOperator": "AND",
                    "operator": "IN",
                    "value": mc
                }
            } else {
                param = {
                    "columnName": "mallCodes",
                    "columnPatten": "",
                    "conditionOperator": "AND",
                    "operator": "=",
                    "value": 'ALL'
                }
            }
            params.push(param); 
        } else {
            param = {
                "columnName": "mallCodes",
                "columnPatten": "",
                "conditionOperator": "AND",
                "operator": "=",
                "value": ''
            }
            params.push(param);
        }
    }
    
    if($.cookie('searchUnit') != null && $.cookie('searchUnit') != '' && $.cookie('searchUnit') != 'null'){
        param = {
            "columnName": "unitCode",
            "columnPatten": "",
            "conditionOperator": "OR",
            "operator": "LIKE",
            "value": $.cookie('searchUnit')
        }
        params.push(param);
    
        param = {
            "columnName": "unitName",
            "columnPatten": "",
            "conditionOperator": "OR",
            "operator": "LIKE",
            "value": $.cookie('searchUnit')
        }
        params.push(param);
    }
    
    if($.cookie('searchUser') != null && $.cookie('searchUser') != '' && $.cookie('searchUser') != 'null'){
        param = {
            "columnName": "approveFirst",
            "columnPatten": "",
            "operator": "AND",
            "value": $.cookie('searchUser')
        }
        params.push(param);
    }
        
     var map = {
        "conditionGroups": conditionGroups,
        "params": params
    }
    
    $.ajax({
        url: $.api.baseLotus+"/api/vshop/lotus/findAllByKVCondition?page="+(p-1)+"&size="+c+"&sort=id,desc",
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
                    
                    var storeCodes = '';
                    $.each(response.data.content, function(i,v){
                        storeCodes += v.code + ';';
                        
                        var state;
                        switch (v.remarkFirst) {
                            case '1':
                                state = "使用中";
                                break;
                            case '0':
                                state = "已删除";
                                break;
                            default:
                                state = "使用中";
                                break;
                        }
                        
                        var shopStatus;
                        switch (v.shopStatus) {
                            case '1':
                                shopStatus = "空闲";
                                break;
                            case '0':
                                shopStatus = "租用";
                                break;
                            default:
                                shopStatus = "预定";
                                break;
                        }
                        
                        var unitType;
                        switch (v.unitType) {
                            case 'shoppe':
                                unitType = "正柜";
                                break;
                            case 'kiosk':
                                unitType = "临时柜";
                                break;
                            case 'stora':
                                unitType = "仓库";
                                break;
                            case 'base':
                                unitType = "基站";
                                break;
                            case 'parking':
                                unitType = "停车场";
                                break;
                            default:
                                unitType = "其它";
                                break;
                        }
                        
                        var tbg = '#fff';
                        if(i%2==0){
                            tbg = '#f9f9f9';
                        }
                        
                        $('#stores').append('<tr data-index="'+i+'" id="store_'+v.code+'">\n\
                        <td style="background: '+tbg+'; z-index: 1; border-right: solid 2px #ddd;"><a href="/lotus-admin/store-detail?id='+v.code+'">'+v.unitName+'['+v.unitCode+']</a></td>\n\
                        <td>'+state+'</td>\n\
                        <td>'+shopStatus+'</td>\n\
                        <td>'+v.mallName+'['+v.mallCode+']</td>\n\
                        <td>'+v.floorName+'</td>\n\
                        <td>'+v.startDate+'~'+v.endDate+'</td>\n\
                        <td>'+v.unitArea+'</td>\n\
                        <td>'+unitType+'</td>\n\
                        <td>'+(v.approveFirst || '')+'</td>\n\
                        <td>/</td>\n\
                        <td><span class="ifSigned">未签约</span></td></tr>');
                    });
                    
                    if(storeCodes != ''){
                        findContractsByStoreCode(storeCodes);
                    }
                    
                    if(p == pages){
                        $(".pagination-info").html('显示 '+Math.ceil((p-1)*c+1)+' 到 '+response.data.totalElements+' 行，共 '+response.data.totalElements+'行');
                    } else {
                        $(".pagination-info").html('显示 '+Math.ceil((p-1)*c+1)+' 到 '+Math.ceil((p-1)*c+Number(c))+' 行，共 '+response.data.totalElements+'行');
                    }
                } else {
                    $('#stores').html('<tr><td colspan="11" style="text-align: center;">没有找到任何记录！</td></tr>');
                }
            } else {
                alertMsg(response.code,response.customerMessage);
            }
        },
        complete: function () {
            setTimeout(function () {
                $('td').each(function(i,e){
                    $(this).attr('title',$(this).text());
                })
            },800);
        }
    });
}

function findContractsByStoreCode(sc) {
    var params = [];
    var param = {};
    var conditionGroups = [];
    
    param = {
        "columnName": "shopCode",
        "columnPatten": "",
        "conditionOperator": "AND",
        "operator": "in",
        "value": sc
    }
    
    params.push(param);
    
    var map = {
        "conditionGroups": conditionGroups,
        "params": params
    }
    
    $.ajax({
        url: $.api.baseLotus+"/api/contract/lotus/findAllByKVCondition?page=0&size=100&sort=id,desc",
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
                    var link;
                    $.each(response.data.content, function(i,v){
                        $('#store_'+v.shopCode+' td:eq(9)').html('<a href="/lotus-admin/brand-detail?id='+v.brandCode+'" target="_blank">'+v.contractName+'</a>');
                        if(v.contractStatus == 'init'){
                            link = 'init';
                        } else {
                            link = 'summary';
                        }
                        $('#store_'+v.shopCode+' td:eq(10) .ifSigned').html('已签约 <a href="/lotus-admin/contract-'+link+'?id='+v.contractNo+'&contractVersion='+v.contractVersion+'" target="_blank">'+v.contractName+'['+v.mallName+']</a>').removeClass('ifSigned');
                    })
                }
            }
        }
    })
}