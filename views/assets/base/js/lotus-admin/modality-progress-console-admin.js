$(document).ready(function(){
    if($.cookie('searchUnit') != ''){
        $('#unit').val($.cookie('searchUnit'));
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
    
    updateSelectUserDropDown(20);

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
        $('#mallCode').val('').trigger('change');
        
        $.cookie('searchUnit', '');
        $.cookie('searchMallCode', null);
    })
    
    $('#search').click(function(){
        $.cookie('searchUnit', $('#unit').val());
        $.cookie('searchMallCode', $('#mallCode').val());
        findAllStoresByKVCondition(1,items);
    })
});

function findAllStoresByKVCondition(p,c){
    $('#console').html('');
    
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
    
    if($.cookie('searchMallCode') != null && $.cookie('searchMallCode') != '' && $.cookie('searchMallCode') != 'null'){
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
                        var isEmpty, isContract;
                        switch (v.shopStatus) {
                            case '1':
                                isEmpty = "是";
                                isContract = '<i class="fa fa-circle-o text-red"></i> 未签订';
                                break;
                            case '0':
                                isEmpty = "否";
                                isContract = '<i class="fa fa-circle text-green"></i> 已签订';
                                break;
                            default:
                                isEmpty = "是";
                                isContract = '<i class="fa fa-circle-o text-red"></i> 未签订';
                                break;
                        }
                        
                        var isDR = '<i class="fa fa-circle-o text-red"></i> 未通过';
                        var isRequest = '<i class="fa fa-circle-o text-red"></i> 未通过';
                        
                        $('#console').append('<tr data-index="'+i+'">\n\
                        <td><a href="/lotus-admin/store-detail?id='+v.code+'">'+v.unitName+'['+v.unitCode+']</a></td>\n\
                        <td>'+v.unitArea+'</td>\n\
                        <td></td>\n\
                        <td>'+isEmpty+'</td>\n\
                        <td>'+(v.remarkFirst || '/')+'</td>\n\
                        <td>'+isDR+'</td>\n\
                        <td>'+isRequest+'</td>\n\
                        <td>'+isContract+'</td></tr>');
                    });
                    
                    if(p == pages){
                        $(".pagination-info").html('显示 '+Math.ceil((p-1)*c+1)+' 到 '+response.data.totalElements+' 行，共 '+response.data.totalElements+'行');
                    } else {
                        $(".pagination-info").html('显示 '+Math.ceil((p-1)*c+1)+' 到 '+Math.ceil((p-1)*c+Number(c))+' 行，共 '+response.data.totalElements+'行');
                    }
                } else {
                    $('#console').html('<tr><td colspan="8" style="text-align: center;">没有找到任何记录！</td></tr>');
                }
            } else {
                alertMsg(response.code,response.customerMessage);
            }
        }
    });
}

function updateSelectUserDropDown(data_count) {
    $('#leasingMgr').select2({
        minimumResultsForSearch: -1,
        placeholder: '未选择',
        dropdownAutoWidth: true,
        language: {
            searching: function() {
                return '加载中...';
            },
            loadingMore: function() {
                return '加载中...';
            }
        },
        ajax: {
            url: $.api.baseLotus+"/api/user/lotus/findAllByUserType?userType=11",
            type: 'GET',
            dataType: 'json',
            delay: 250,
            beforeSend: function(request) {
                request.setRequestHeader("Login", $.cookie('login'));
                request.setRequestHeader("Authorization", $.cookie('authorization'));
                request.setRequestHeader("Lang", $.cookie('lang'));
                request.setRequestHeader("Source", "onlineleasing");
            },
            data: function (params) {         
                return {
                    search: params.term
                }
            },
            processResults: function (data,params) {
                if(data['code'] === 'C0') {
                    var jsonData = data['data'];
                    params.page = params.page || 0;
                    var data;
                    return {
                        results: $.map(jsonData, function(item) {
                            data = {
                                id: item.code,
                                text: item.settings.name +'['+ item.mobile + ']'
                            }
                            var returnData = [];
                            returnData.push(data);
                            return returnData;
                        }),
                        pagination: {
                            "more": data_count <= jsonData.length
                        }
                    }
                } else {
                    alertMsg(data['code'],data['customerMessage']);
                }
            },
            cache: true
        }
    })
}