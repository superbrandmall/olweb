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
    
//    if(!sessionStorage.getItem('lotusUser') || sessionStorage.getItem('lotusUser') == null || sessionStorage.getItem('lotusUser') == ''){
//        findAllLotusUsers();
//    } 
    
    if($.cookie('searchUnit') != ''){
        $('#unit').val($.cookie('searchUnit'));
    }
    
    if($.cookie('searchShopStatus') != null){
        $('#shopStatus').val($.cookie('searchShopStatus')).trigger('change');
    }
    
    if($.cookie('searchUnitType') != null){
        $('#unitType').val($.cookie('searchUnitType')).trigger('change');
    }
    
    if($.cookie('searchMallCode') != null){
        $('#mallCode').val($.cookie('searchMallCode')).trigger('change');
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
    
    $('#clear').click(function(){
        $('#unit').val('');
        $('#shopStatus, #unitType, #mallCode').val('').trigger('change');
        
        $.cookie('searchUnit', '');
        $.cookie('searchShopStatus',null);
        $.cookie('searchUnitType', null);
        $.cookie('searchMallCode', null);
    })
    
    $('#search').click(function(){
        $.cookie('searchShopStatus',$('#shopStatus').val());
        $.cookie('searchUnit', $('#unit').val());
        $.cookie('searchUnitType', $('#unitType').val());
        $.cookie('searchMallCode', $('#mallCode').val());
        findAllStoresByKVCondition(1,items);
    })
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
    },{
        "columnName": "mallCodes",
        "columnPatten": "",
        "conditionOperator": "AND",
        "operator": "=",
        "value": 'ALL'
    },{
        "columnName": "mallName",
        "columnPatten": "",
        "conditionOperator": "AND",
        "operator": "!=",
        "value": '测试店'
    }]
    
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
            "value": $.cookie('searchUnitType')
        }
        params.push(param);
    }
    
    if($.cookie('searchMallCode') != null && $.cookie('searchMallCode') != ''){
        param = {
            "columnName": "mallCode",
            "columnPatten": "",
            "operator": "AND",
            "value": $.cookie('searchMallCode')
        }
        params.push(param);
    }
    
    if($.cookie('searchUnit') != null && $.cookie('searchUnit') != '' && $.cookie('searchUnit') != 'null'){
        param = {
            "columnName": "unitCode",
            "columnPatten": "",
            "conditionOperator": "OR",
            "operator": "=",
            "value": $.cookie('searchUnit')
        }
        params.push(param);
    
        param = {
            "columnName": "unitName",
            "columnPatten": "",
            "conditionOperator": "OR",
            "operator": "=",
            "value": $.cookie('searchUnit')
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
                    
                    $.each(response.data.content, function(i,v){
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
                        
                        
                        $('#stores').append('<tr data-index="'+i+'">\n\
                        <td><a href="/lotus-admin/store-detail?id='+v.code+'">'+v.unitName+'['+v.unitCode+']</a></td>\n\
                        <td>'+state+'</td>\n\
                        <td>'+shopStatus+'</td>\n\
                        <td>'+v.mallName+'['+v.mallCode+']</td>\n\
                        <td>'+v.floorName+'</td>\n\
                        <td>'+v.startDate+'~'+v.endDate+'</td>\n\
                        <td>'+v.unitArea+'</td>\n\
                        <td>'+unitType+'</td>\n\
                        <td>'+(v.remarkFirst || '')+'</td></tr>');
                    });
                    
                    if(p == pages){
                        $(".pagination-info").html('显示 '+Math.ceil((p-1)*c+1)+' 到 '+response.data.totalElements+' 行，共 '+response.data.totalElements+'行');
                    } else {
                        $(".pagination-info").html('显示 '+Math.ceil((p-1)*c+1)+' 到 '+Math.ceil((p-1)*c+Number(c))+' 行，共 '+response.data.totalElements+'行');
                    }
                } else {
                    $('#stores').html('<tr><td colspan="9" style="text-align: center;">没有找到任何记录！</td></tr>');
                }
            } else {
                alertMsg(response.code,response.customerMessage);
            }
        }
    });
}

//function findAllLotusUsers() {
//    $.ajax({
//        url: $.api.baseLotus+"/api/user/lotus/findAllByUserType?userType=11",
//        type: "GET",
//        async: false,
//        dataType: "json",
//        contentType: "application/json",
//        beforeSend: function(request) {
//            $('#loader').show();
//            request.setRequestHeader("Login", $.cookie('login'));
//            request.setRequestHeader("Authorization", $.cookie('authorization'));
//            request.setRequestHeader("Lang", $.cookie('lang'));
//            request.setRequestHeader("Source", "onlineleasing");
//        },
//        complete: function(){},
//        success: function (response, status, xhr) {
//            $('#loader').hide();
//            if(response.code === 'C0') {
//                if(xhr.getResponseHeader("Login") !== null){
//                    $.cookie('login', xhr.getResponseHeader("Login"));
//                }
//                if(xhr.getResponseHeader("Authorization") !== null){
//                    $.cookie('authorization', xhr.getResponseHeader("Authorization"));
//                }
//                
//                sessionStorage.setItem("lotusUser", JSON.stringify(response.data));
//            } else {
//                alertMsg(response.code,response.customerMessage);
//            }
//        },
//        error: function(jqXHR, textStatus, errorThrown) {
//            console.log(textStatus, errorThrown);
//        }
//    });
//}

//function renderUserNames(uc) {
//    var step = '';
//    if(sessionStorage.getItem("lotusUser") && sessionStorage.getItem("lotusUser") != null && sessionStorage.getItem("lotusUser") != '') {
//        var user = $.parseJSON(sessionStorage.getItem("lotusUser"));
//        $.each(user, function(i,v){
//            if(v.code == uc){
//                user = v.settings.name;
//            } else {
//                user = '';
//            }
//        })
//    }
//    return user;
//}