$(document).ready(function(){
    if($.cookie('searchUnit') != ''){
        $('#unit').val($.cookie('searchUnit'));
    }
    
    if($.cookie('searchMallCode') != 'null' && $.cookie('searchMallCode') != null){
        var newOption = new Option($.cookie('searchMallCode').split(':::')[0], $.cookie('searchMallCode').split(':::')[1], true, true);
        $('#mallCode').append(newOption).trigger('change');
    } else {
        $("#mallCode").val($.cookie('mallSelected').split(':::')[1]).trigger('change');
    }
    
    var items = getURLParameter('items') || $('.page-size').first().text();
    if(getURLParameter('page') && getURLParameter('page') >= 1){
        findShopBudget(getURLParameter('page'),items);
    } else {
        findShopBudget(1,items);
    }
    
    $('.date-picker, .input-daterange').datepicker({
        'language': 'zh-CN',
        'format': 'yyyy-mm-dd',
        'todayBtn': "linked",
        'todayHighlight': true,
        'startDate': '',
        'endDate': '',
        'autoclose': true
    });
    
    if($("#mallCode").val() != ''){
        updateSelectStoreDropDownByMallCode(10,$("#mallCode").val());
    }
    $("#mallCode").on('change',function(){
        updateSelectStoreDropDownByMallCode(10,$(this).val());
    })
    
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
        if($('#mallCode').val() != null){
            $.cookie('searchMallCode', $('#select2-mallCode-container').text().split(' [ ')[0]+':::'+$('#mallCode').val());
        } else {
            $.cookie('searchMallCode', null);
        }
        findShopBudget(1,items);
    })
});

function findShopBudget(p,c){
    $('#budget').html('');
    
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
    
    if($.cookie('searchMallCode') != 'null' && $.cookie('searchMallCode') != null && $.cookie('searchMallCode') != ''){
        param = {
            "columnName": "mallCode",
            "columnPatten": "",
            "operator": "AND",
            "value": $.cookie('searchMallCode').split(':::')[1]
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
                        if($('#budget_'+v.code).length <= 0){
                            $('#budget').append('<tr data-index="'+i+'" id="budget_'+v.code+'">\n\
                            <td>'+v.unitName+'['+v.unitCode+']</td>\n\
                            <td>铺位-'+(v.unitDesc || v.unitType)+'</td>\n\
                            <td>2022-01-01</td>\n\
                            <td>2022-12-31</td>\n\
                            <td><b>'+(accounting.formatNumber(v.unitArea) || '')+'</b></td>\n\
                            <td id="D011_'+v.code+'"></td>\n\
                            <td>'+v.modality+'</td>\n\
                            <td></td>\n\
                            <td></td>\n\
                            <td></td>\n\
                            <td></td>\n\
                            <td id="B021_'+v.code+'"></td>\n\
                            <td id="G021_'+v.code+'"></td>\n\
                            <td></td>\n\
                            <td></td>\n\
                            <td></td>\n\
                            <td></td>\n\
                            <td id="B011_'+v.code+'"></td></tr>');
                        }
                    });

                    if(p == pages){
                        $(".pagination-info").html('显示 '+Math.ceil((p-1)*c+1)+' 到 '+response.data.totalElements+' 行，共 '+response.data.totalElements+'行');
                    } else {
                        $(".pagination-info").html('显示 '+Math.ceil((p-1)*c+1)+' 到 '+Math.ceil((p-1)*c+Number(c))+' 行，共 '+response.data.totalElements+'行');
                    }

                    $.each(response.data, function(i,v){
//                            switch (v.termType) {
//                                case "B011":
//                                    termType = '固定租金';
//                                    break;
//                                case "B021":
//                                    termType = '物业管理费';
//                                    break;
//                                case "G021":
//                                    termType = '推广费';
//                                    break;
//                                case "D011":
//                                    termType = '提成扣率';
//                                    break;
//                                case "E02":
//                                    termType = '保证金';
//                                    break;
//                                case "E22":
//                                    termType = '履约保证金';
//                                    break;
//                                default:
//                                    break;
//                            }

                        $('#'+v.termType+'_'+v.shopCode).text(accounting.formatNumber(v.january));
                    });
                } else {
                    $('#budget').html('<tr><td colspan="18" style="text-align: center;">没有找到任何记录！</td></tr>');
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
            url: $.api.baseAuth+"/api/user/findAllByUserType",
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
                    page: params.page || 0,
                    size: data_count,
                    sort: 'id,desc',
                    search: params.term,
                    userType: 11
                }
            },
            processResults: function (data,params) {
                if(data['code'] === 'C0') {
                    var jsonData = data['data'].content;
                    params.page = params.page || 0;
                    var data;
                    return {
                        results: $.map(jsonData.reverse(), function(item) {
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