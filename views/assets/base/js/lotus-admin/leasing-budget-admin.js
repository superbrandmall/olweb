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
    
    $('.fixed-table-body').on('scroll', scrollHandle);
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
                            var tbg = '#fff';
                            if(i%2==0){
                                tbg = '#f9f9f9';
                            }
                            
                            $('#budget').append('<tr data-index="'+i+'" id="budget_'+v.code+'">\n\
                            <td style="background: '+tbg+'; z-index: 1; border-right: solid 2px #ddd;">'+v.unitName+'['+v.unitCode+']</td>\n\
                            <td>铺位-'+renderUnitType(v.unitType)+'</td>\n\
                            <td><b>'+(accounting.formatNumber(v.unitArea) || '')+'</b></td>\n\
                            <td>'+(v.modality || '')+'</td>\n\
                            <td class="B011_january"></td>\n\
                            <td class="B011_february"></td>\n\
                            <td class="B011_march"></td>\n\
                            <td class="B011_april"></td>\n\
                            <td class="B011_may"></td>\n\
                            <td class="B011_june"></td>\n\
                            <td class="B011_july"></td>\n\
                            <td class="B011_august"></td>\n\
                            <td class="B011_september"></td>\n\
                            <td class="B011_october"></td>\n\
                            <td class="B011_november"></td>\n\
                            <td class="B011_december"></td>\n\
                            <td class="B021_january"></td>\n\
                            <td class="B021_february"></td>\n\
                            <td class="B021_march"></td>\n\
                            <td class="B021_april"></td>\n\
                            <td class="B021_may"></td>\n\
                            <td class="B021_june"></td>\n\
                            <td class="B021_july"></td>\n\
                            <td class="B021_august"></td>\n\
                            <td class="B021_september"></td>\n\
                            <td class="B021_october"></td>\n\
                            <td class="B021_november"></td>\n\
                            <td class="B021_december"></td>\n\
                            <td class="D011_january"></td>\n\
                            <td class="D011_february"></td>\n\
                            <td class="D011_march"></td>\n\
                            <td class="D011_april"></td>\n\
                            <td class="D011_may"></td>\n\
                            <td class="D011_june"></td>\n\
                            <td class="D011_july"></td>\n\
                            <td class="D011_august"></td>\n\
                            <td class="D011_september"></td>\n\
                            <td class="D011_october"></td>\n\
                            <td class="D011_november"></td>\n\
                            <td class="D011_december"></td>\n\
                            <td class="G011_january"></td>\n\
                            <td class="G011_february"></td>\n\
                            <td class="G011_march"></td>\n\
                            <td class="G011_april"></td>\n\
                            <td class="G011_may"></td>\n\
                            <td class="G011_june"></td>\n\
                            <td class="G011_july"></td>\n\
                            <td class="G011_august"></td>\n\
                            <td class="G011_september"></td>\n\
                            <td class="G011_october"></td>\n\
                            <td class="G011_november"></td>\n\
                            <td class="G011_december"></td>\n\
                            <td class="SALE_january"></td>\n\
                            <td class="SALE_february"></td>\n\
                            <td class="SALE_march"></td>\n\
                            <td class="SALE_april"></td>\n\
                            <td class="SALE_may"></td>\n\
                            <td class="SALE_june"></td>\n\
                            <td class="SALE_july"></td>\n\
                            <td class="SALE_august"></td>\n\
                            <td class="SALE_september"></td>\n\
                            <td class="SALE_october"></td>\n\
                            <td class="SALE_november"></td>\n\
                            <td class="SALE_december"></td>\n\
                            </tr>');
                            
                            if(v.shopBudgetList.length > 0){
                                $.each(v.shopBudgetList, function(j,w){
                                    $('#budget_'+v.code).find('.'+w.termType+'_january').text(accounting.formatNumber(w.january));
                                    $('#budget_'+v.code).find('.'+w.termType+'_february').text(accounting.formatNumber(w.february));
                                    $('#budget_'+v.code).find('.'+w.termType+'_march').text(accounting.formatNumber(w.march));
                                    $('#budget_'+v.code).find('.'+w.termType+'_april').text(accounting.formatNumber(w.april));
                                    $('#budget_'+v.code).find('.'+w.termType+'_may').text(accounting.formatNumber(w.may));
                                    $('#budget_'+v.code).find('.'+w.termType+'_june').text(accounting.formatNumber(w.june));
                                    $('#budget_'+v.code).find('.'+w.termType+'_july').text(accounting.formatNumber(w.july));
                                    $('#budget_'+v.code).find('.'+w.termType+'_august').text(accounting.formatNumber(w.august));
                                    $('#budget_'+v.code).find('.'+w.termType+'_september').text(accounting.formatNumber(w.september));
                                    $('#budget_'+v.code).find('.'+w.termType+'_october').text(accounting.formatNumber(w.october));
                                    $('#budget_'+v.code).find('.'+w.termType+'_november').text(accounting.formatNumber(w.november));
                                    $('#budget_'+v.code).find('.'+w.termType+'_december').text(accounting.formatNumber(w.december));
                                });
                            }
                        }
                    });

                    if(p == pages){
                        $(".pagination-info").html('显示 '+Math.ceil((p-1)*c+1)+' 到 '+response.data.totalElements+' 行，共 '+response.data.totalElements+'行');
                    } else {
                        $(".pagination-info").html('显示 '+Math.ceil((p-1)*c+1)+' 到 '+Math.ceil((p-1)*c+Number(c))+' 行，共 '+response.data.totalElements+'行');
                    }

                    $.each(response.data, function(i,v){
                        $('#'+v.termType+'_'+v.shopCode).text(accounting.formatNumber(v.january));
                    });
                } else {
                    $('#budget').html('<tr><td colspan="64" style="text-align: center;">没有找到任何记录！</td></tr>');
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