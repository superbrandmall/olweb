$.budgetShops = '';

$(document).ready(function(){
    if(getURLParameter('s')) {
        switch (getURLParameter('s')) {
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
    
    findDictCodeByDictTypeCode('UNIT_TYPE');
    
    if($.cookie('searchLeasingBudgetSelectStoreVal') != null){
        var newOption = new Option($.cookie('searchLeasingBudgetSelectStoreTxt'), $.cookie('searchLeasingBudgetSelectStoreVal'), true, true);
        $('#selectStore').append(newOption).trigger('change');
    }
    
    if($.cookie('searchLeasingBudgetModality3') != null){
        var newOption = new Option($.cookie('searchLeasingBudgetModality3'), $.cookie('searchLeasingBudgetModality3'), true, true);
        $('#modality_3').append(newOption).trigger('change');
    }
    
    
    if($.cookie('searchMallCode') != 'null' && $.cookie('searchMallCode') != null){
        var newOption = new Option($.cookie('searchMallCode').split(':::')[0], $.cookie('searchMallCode').split(':::')[1], true, true);
        $('#mallCode').append(newOption).trigger('change');
    } else {
        $("#mallCode").val($.cookie('mallSelected').split(':::')[1]).trigger('change');
    }
    
    var items = getURLParameter('items') || $('.page-size').first().text();
    if(getURLParameter('page') && getURLParameter('page') >= 1){
        findShops(getURLParameter('page'),items);
    } else {
        findShops(1,items);
    }
    
    $('.date-picker, .input-daterange').datepicker({
        'language': 'zh-CN',
        'format': 'yyyy-mm-dd',
        'todayBtn': "linked",
        'todayHighlight': true,
        'startDate': '',
        'endDate': '',
        'autoclose': true,
        'clearBtn': true
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
        $('#mallCode, #modality_1, #modality_2, #modality_3').val('').trigger('change');
        $('#selectStore').empty(); 
        $('#selectStore').select2("val", "");
        
        $.cookie('searchLeasingBudgetModality3', null);
        $.cookie('searchLeasingBudgetSelectStoreVal', null);
        $.cookie('searchMallCode', null);
    })
    
    $('#search').click(function(){
        $.cookie('searchLeasingBudgetModality3', $('#modality_3').val());
        $.cookie('searchLeasingBudgetSelectStoreVal', $('#selectStore').val());
        $.cookie('searchLeasingBudgetSelectStoreTxt', $('#select2-selectStore-container').text());
        if($('#mallCode').val() != null){
            $.cookie('searchMallCode', $('#select2-mallCode-container').text().split(' [ ')[0]+':::'+$('#mallCode').val());
        } else {
            $.cookie('searchMallCode', null);
        }
        findShops(1,items);
    })
    
    $('#modality_1').on('change',function(){
        if($(this).val() != '') {
            findBizByBiz1($(this).val());
        }
    })
    
    if($('#modality_1').val() != '' && $('#modality_2').val() == '') {
        findBizByBiz1($('#modality_1').val());
    }
    
    $('.fixed-table-body').on('scroll', scrollHandle);
});

function findShops(p,c){
    $('#budget').html('');
                
    var params = [];
    var conditionGroups = [];
    var conditionGroup = {};
    
    var mallCodes = 'ALL';
    if($.cookie('searchMallCode') != 'null' && $.cookie('searchMallCode') != null && $.cookie('searchMallCode') != ''){
        mallCodes = $.cookie('searchMallCode').split(':::')[1];
    }
    
    $.each(JSON.parse($.cookie('userModules')), function(i,v) {
        if((v.roleCode == 'CROLE211008000002' || v.roleCode == 'CROLE220922000001') && v.moduleCode == 'ALL'){
            mallCodes = 'ALL';
            return false;
        }
    })
    
    conditionGroup = {
        "conditionOperator": "AND",
        "params": [{
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
            "value": mallCodes
        },{
            "columnName": "mallName",
            "columnPatten": "",
            "conditionOperator": "AND",
            "operator": "!=",
            "value": '测试店'
        }]
    }

    conditionGroups.push(conditionGroup);
    
    if($.cookie('searchMallCode') != 'null' && $.cookie('searchMallCode') != null && $.cookie('searchMallCode') != ''){
        conditionGroups.push({
            "conditionOperator": "AND",
            "params": [{
                    "columnName": "mallCode",
                    "columnPatten": "",
                    "conditionOperator": "AND",
                    "operator": "=",
                    "value": $.cookie('searchMallCode').split(':::')[1]
                }
            ]
        })
    }
    
    if($.cookie('searchLeasingBudgetSelectStoreVal') != null && $.cookie('searchLeasingBudgetSelectStoreVal') != '' && $.cookie('searchLeasingBudgetSelectStoreVal') != 'null'){
        conditionGroups.push({
            "conditionOperator": "AND",
            "params": [{
                    "columnName": "unitName",
                    "columnPatten": "",
                    "conditionOperator": "AND",
                    "operator": "=",
                    "value": $.cookie('searchLeasingBudgetSelectStoreVal').split(':::')[2]
                }
            ]
        },{
            "conditionOperator": "AND",
            "params": [{
                    "columnName": "unitCode",
                    "columnPatten": "",
                    "conditionOperator": "AND",
                    "operator": "=",
                    "value": $.cookie('searchLeasingBudgetSelectStoreVal').split(':::')[0]
                }
            ]
        })
    }
    
    if($.cookie('searchLeasingBudgetModality3') != null && $.cookie('searchLeasingBudgetModality3') != '' && $.cookie('searchLeasingBudgetModality3') != 'null'){
        conditionGroups.push({
            "conditionOperator": "AND",
            "params": [{
                    "columnName": "modality",
                    "columnPatten": "",
                    "conditionOperator": "AND",
                    "operator": "=",
                    "value": $.cookie('searchLeasingBudgetModality3').split(':::')[0]
                }
            ]
        })
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
                            
                            $.budgetShops += v.code + ';';
                            
                            $('#budget').append('<tr data-index="'+i+'" id="budget_'+v.code+'">\n\
                            <td style="background: '+tbg+'; z-index: 1; border-right: solid 2px #ddd;"><a href="budget-detail?id='+v.code+'">'+v.unitName+'['+v.unitCode+']</a></td>\n\
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
                        }
                    });
                    
                    findShopBudget(1,10000);

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

function findShopBudget(p,c){
    var params = [];
    var param = {};
    var conditionGroups = [];
    
    param = {
        "columnName": "shopCode",
        "columnPatten": "",
        "conditionOperator": "AND",
        "operator": "in",
        "value": $.budgetShops
    }
    
    params.push(param);
    
    var map = {
        "conditionGroups": conditionGroups,
        "params": params
    }

    $.ajax({
        url: $.api.baseLotus+"/api/shop/budget/findAllByKVCondition?page="+(p-1)+"&size="+c+"&sort=id,desc",
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
                    $.each(response.data.content, function(i,v){
                        $('#budget_'+v.shopCode).find('.'+v.termType+'_january').text(accounting.formatNumber(v.january));
                        $('#budget_'+v.shopCode).find('.'+v.termType+'_february').text(accounting.formatNumber(v.february));
                        $('#budget_'+v.shopCode).find('.'+v.termType+'_march').text(accounting.formatNumber(v.march));
                        $('#budget_'+v.shopCode).find('.'+v.termType+'_april').text(accounting.formatNumber(v.april));
                        $('#budget_'+v.shopCode).find('.'+v.termType+'_may').text(accounting.formatNumber(v.may));
                        $('#budget_'+v.shopCode).find('.'+v.termType+'_june').text(accounting.formatNumber(v.june));
                        $('#budget_'+v.shopCode).find('.'+v.termType+'_july').text(accounting.formatNumber(v.july));
                        $('#budget_'+v.shopCode).find('.'+v.termType+'_august').text(accounting.formatNumber(v.august));
                        $('#budget_'+v.shopCode).find('.'+v.termType+'_september').text(accounting.formatNumber(v.september));
                        $('#budget_'+v.shopCode).find('.'+v.termType+'_october').text(accounting.formatNumber(v.october));
                        $('#budget_'+v.shopCode).find('.'+v.termType+'_november').text(accounting.formatNumber(v.november));
                        $('#budget_'+v.shopCode).find('.'+v.termType+'_december').text(accounting.formatNumber(v.december));
                    })
                }
            }
        }
    })
}

function findBizByBiz1(biz) {
    $.ajax({
        url: $.api.baseLotus+"/api/biz/lotus/findAllByModality1?modality1="+encodeURIComponent(biz),
        type: "GET",
        async: false,
        beforeSend: function(request) {
            request.setRequestHeader("Login", $.cookie('login'));
            request.setRequestHeader("Authorization", $.cookie('authorization'));
            request.setRequestHeader("Lang", $.cookie('lang'));
            request.setRequestHeader("Source", "onlineleasing");
        },
        success: function (response, status, xhr) {
            if(response.code === 'C0') {
                if(xhr.getResponseHeader("Login") !== null){
                    $.cookie('login', xhr.getResponseHeader("Login"));
                }
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                }
                
                if(response.data.length > 0){
                    $('#modality_1,#modality_3').parent().hide();
                    $('#modality_2').parent().fadeIn();
                    $('#modality_2').html('<option value="">未选择二级业态</option>').fadeIn();
                    $.each(response.data, function(i,v) {
                        $('#modality_2').append('<option value="'+v.modality2+'">'+v.modality2+'</option>');
                        if ($("#modality_2 option:contains('"+v.modality2+"')").length > 1){
                            $("#modality_2 option:contains('"+v.modality2+"'):gt(0)").remove();
                        }
                    })
                }
                
                $('#modality_2').on('change',function(){
                    if($(this).val() != '') {
                        findBizByBiz2($(this).val());
                    } else {
                        $('#modality_2').select2('close').parent().hide();
                        $('#modality_3').select2('close').parent().hide();
                        $('#modality_1').parent().fadeIn();
                    }
                })
                
                if($('#modality_2').val() != '' && $('#modality_3').val() == '') {
                    findBizByBiz2($('#modality_2').val());
                }
            } else {
                alertMsg(response.code,response.customerMessage);
            }                               
        }
    }); 
}

function findBizByBiz2(biz) {
    $.ajax({
        url: $.api.baseLotus+"/api/biz/lotus/findAllByModality2?modality2="+encodeURIComponent(biz),
        type: "GET",
        async: false,
        beforeSend: function(request) {
            request.setRequestHeader("Login", $.cookie('login'));
            request.setRequestHeader("Authorization", $.cookie('authorization'));
            request.setRequestHeader("Lang", $.cookie('lang'));
            request.setRequestHeader("Source", "onlineleasing");
        },
        success: function (response, status, xhr) {
            if(response.code === 'C0') {
                if(xhr.getResponseHeader("Login") !== null){
                    $.cookie('login', xhr.getResponseHeader("Login"));
                }
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                }
                
                if(response.data.length > 0){
                    $('#modality_1,#modality_2').parent().hide();
                    $('#modality_3').parent().fadeIn();
                    $('#modality_3').html('<option value="">未选择三级业态</option>').fadeIn();
                    $.each(response.data, function(i,v) {
                        $('#modality_3').append('<option value="'+v.modality3+'">'+v.modality3+'</option>');
                        if ($("#modality_3 option:contains('"+v.modality3+"')").length > 1){
                            $("#modality_3 option:contains('"+v.modality3+"'):gt(0)").remove();
                        }
                    })
                }
                
                $('#modality_3').on('change',function(){
                    if($(this).val() != '') {
                    } else {
                        $('#modality_2').select2('close').parent().hide();
                        $('#modality_3').select2('close').parent().hide();
                        $('#modality_1').parent().fadeIn();
                    }
                })
            } else {
                alertMsg(response.code,response.customerMessage);
            }                               
        }
    }); 
}