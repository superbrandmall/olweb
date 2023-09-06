if($.cookie('checkBalance') &&  JSON.parse($.cookie('checkBalance')).length > 0){
    $.checkBalance = JSON.parse($.cookie('checkBalance'));
} else {
    $.checkBalance = [];
}

if(getURLParameter('s')) {
    switch (getURLParameter('s')) {
        case "succeed":
            successMsg('00','保存成功！');
            break;
        case "voucher":
            successMsg('00','凭证生成成功！');
            break;
        case "delete":
            successMsg('00','删除成功！');
            break;
        default:
            break;
    }
    setTimeout(function () {
        window.history.pushState("object or string", "Title", "/lotus-admin/"+refineCreateUrl() );
    },1000);
}

$(document).ready(function(){
    var auth = 0;
    $.each(JSON.parse($.cookie('userModules')), function(i,v) {
        if(v.moduleCode == 'IT_ADMIN' || v.moduleCode == 'LOTUS_FINANCIAL'){
            auth = 1;
            return false;
        }
    })

    if(auth == 0){
        alertMsg('9999','没有访问授权，请联系系统管理员。');
        return false;
    }
                    
    updateSelectContractDropDown(50);
    
    if($.cookie('balanceMallVal') != null && $.cookie('balanceMallVal') != 'null'){
        var newOption = new Option($.cookie('balanceMallTxt'), $.cookie('balanceMallVal'), true, true);
        $('#department').append(newOption).trigger('change');
    }
    
    if($.cookie('balanceContractVal') != null && $.cookie('balanceContractVal') != 'null'){
        var newOption = new Option($.cookie('balanceContractTxt'), $.cookie('balanceContractVal'), true, true);
        $('#selectContract').append(newOption).trigger('change');
    }
    
    if($.cookie('balanceSelectTenantVal') != null && $.cookie('balanceSelectTenantVal') != 'null'){
        var newOption = new Option($.cookie('balanceSelectTenantTxt'), $.cookie('balanceSelectTenantVal'), true, true);
        $('#selectTenant').append(newOption).trigger('change');
    }
    
    if($.cookie('balanceTermType') != null && $.cookie('balanceTermType') != 'null'){
        $('#termType').val($.cookie('balanceTermType')).trigger('change');
    }
    
    if($.cookie('balanceItemType') != null && $.cookie('balanceItemType') != 'null'){
        $('#itemType').val($.cookie('balanceItemType')).trigger('change');
    }
    
    if($.cookie('balanceYearMonth') != null && $.cookie('balanceYearMonth') != 'null'){
        $('#yearMonth').val($.cookie('balanceYearMonth'));
    }
    
    var items = getURLParameter('items') || $('.page-size').first().text();
    if(getURLParameter('page') && getURLParameter('page') >= 1){
        findBalanceByKVCondition(getURLParameter('page'),items);
    } else {
        findBalanceByKVCondition(1,items);
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
    $('#termType, #itemType').show();
    
    $('input.money').on('focus',function(){
        $(this).val(accounting.unformat($(this).val()));
    });
    
    $('input.money').on('blur',function(){
        $(this).val(accounting.formatNumber($(this).val()));
    });
    
    $('#yearMonth').datepicker({
        'language': 'zh-CN',
        'format': 'yyyy-mm',
        'todayHighlight': true,
        'startView': 'months',
        'maxViewMode': 'years',
        'minViewMode': 'months',
        'autoclose': true
    })
    
    $('#clear').click(function(){
        $('#department, #termType, #itemType').val('').trigger('change');
        $('#selectContract, #selectTenant').empty(); 
        $('#selectContract, #selectTenant').select2("val", "");
        $('#yearMonth').val('');
        
        $.cookie('balanceTermType', null);
        $.cookie('balanceItemType', null);
        $.cookie('balanceContractTxt', null);
        $.cookie('balanceContractVal', null);
        $.cookie('balanceMallTxt', null);
        $.cookie('balanceMallVal', null);
        $.cookie('balanceYearMonth', null);
        $.cookie('balanceSelectTenantVal', null);
        $.cookie('balanceSelectTenantTxt', null);
    })
    
    $('#search').click(function(){
        $('#totalAmount, #totalTaxAmount').text(accounting.formatNumber(0));
        $.cookie('balanceTermType', $('#termType').val());
        $.cookie('balanceContractVal', $('#selectContract').val());
        $.cookie('balanceContractTxt', $('#select2-selectContract-container').attr('title'));
        $.cookie('balanceMallVal', $('#department').val());
        $.cookie('balanceMallTxt', $('#select2-department-container').attr('title'));
        $.cookie('balanceYearMonth', $('#yearMonth').val());
        $.cookie('balanceSelectTenantVal', $('#selectTenant').val());
        $.cookie('balanceSelectTenantTxt', $('#selectTenant').text());
        $.cookie('balanceItemType', $('#itemType').val());
        $.checkBalance = [];
        $.cookie('checkBalance','');
        findBalanceByKVCondition(1,items);
    })
});

function findBalanceByKVCondition(p,c) {
    var params = [];
    var param = {};
    var conditionGroups = [];
    
    if($.cookie('balanceMallVal') != null && $.cookie('balanceMallVal') != 'null'){
        param = {
            "columnName": "mallCode",
            "columnPatten": "",
            "conditionOperator": "AND",
            "operator": "=",
            "value": ($.cookie('balanceMallVal') != null ? $.cookie('balanceMallVal') : $('#department').val())
        }
        params.push(param);
    }
    
    if($.cookie('balanceContractVal') != null && $.cookie('balanceContractVal') != 'null' && $.cookie('balanceContractVal') != ''){
        params = [{
            "columnName": "contractNo",
            "columnPatten": "",
            "conditionOperator": "AND",
            "operator": "=",
            "value": $.cookie('balanceContractVal')
        }]
    }

    if($.cookie('balanceTermType') != null && $.cookie('balanceTermType') != 'null' && $.cookie('balanceTermType') != ''){
        param = {
            "columnName": "itemCode",
            "columnPatten": "",
            "conditionOperator": "AND",
            "operator": "=",
            "value": $.cookie('balanceTermType')
        }
        params.push(param);
    }

    if($.cookie('balanceYearMonth') != null & $.cookie('balanceYearMonth') != 'null' && $.cookie('balanceYearMonth') != ''){
        param = {
            "columnName": "yyyymm",
            "columnPatten": "",
            "conditionOperator": "AND",
            "operator": "=",
            "value": $.cookie('balanceYearMonth').split('-')[0]+$.cookie('balanceYearMonth').split('-')[1]
        }
        params.push(param);
    }
    
    if($.cookie('balanceSelectTenantTxt') != null && $.cookie('balanceSelectTenantTxt') != '' && $.cookie('balanceSelectTenantTxt') != 'null'){
        param = {
            "columnName": "tenantCode",
            "columnPatten": "",
            "operator": "AND",
            "value": $.cookie('balanceSelectTenantTxt').split(' | ')[0]
        }
        params.push(param);
    }
    
    if($.cookie('balanceItemType') != null && $.cookie('balanceItemType') != 'null' && $.cookie('balanceItemType') != ''){
        param = {
            "columnName": "itemType",
            "columnPatten": "",
            "conditionOperator": "AND",
            "operator": "=",
            "value": $.cookie('balanceItemType')
        }
        params.push(param);
    }
    
    if(params.length == 0){
        params = [{
            "columnName": "mallCode",
            "columnPatten": "",
            "conditionOperator": "AND",
            "operator": "=",
            "value": $.cookie('mallSelected').split(':::')[1]
        }];
    }

    var map = {
        "conditionGroups": conditionGroups,
        "params": params
    }
                
    $.ajax({
        url: $.api.baseLotus+"/api/v/contract/settle/data/findAllByKVCondition?page="+(p-1)+"&size="+c+"&sort=id,desc",
        type: "POST",
        data: JSON.stringify(map),
        async: true,
        dataType: "json",
        contentType: "application/json",
        beforeSend: function(request) {
            request.setRequestHeader("Login", $.cookie('login'));
            request.setRequestHeader("Authorization", $.cookie('authorization'));
            request.setRequestHeader("Lang", $.cookie('lang'));
            request.setRequestHeader("Source", "onlineleasing");
        },
        complete: function(){},
        success: function (response, status, xhr) {
            if(response.code === 'C0') {
                if(xhr.getResponseHeader("Login") !== null){
                    $.cookie('login', xhr.getResponseHeader("Login"));
                }
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                }
                
                $('#balance').html('');
                if(response.data.content.length > 0){
                    var pages =  response.data.totalPages;
                    generatePages(p, pages, c);
                    
                    sessionStorage.setItem("balance", JSON.stringify(response.data.content) );
                    
                    var totalAmount = 0, totalTaxAmount = 0, checked = '';
                    $("#all").prop('checked',false);
                    if($.checkBalance.length > 0){
                        $(".selected").html("已选<b class='text-red'>"+$.checkBalance.length+"</b>条 <a href='javascript:void(0); onclick='javascript: disp_confirm()' class='btn btn-primary btn-sm'><i class='fa fa-plus icon-white'></i> <span class='hidden-xs'>生成凭证</span></a>");
                    } else {
                        $(".selected").text("");
                    }
                    $.each(response.data.content, function(i,v){
                        totalTaxAmount += v.taxAmount;
                        totalAmount += v.amount;
                        
                        var tableSuffix = '';
                        switch (v.tableName) {
                            case "t_ol_contract_rent_calc_lotus_adjust":
                                tableSuffix = 2;
                                break;
                            default:
                                tableSuffix = 1;
                                break;
                        }
                        
                        
                        if($.checkBalance && $.checkBalance.length > 0 && isInArray($.checkBalance,v.id+':'+tableSuffix) == 1) {
                            checked = ' checked';
                        } else {
                            checked = '';
                        }
                        
                        $('#balance').append('<tr>\n\
                            <td><input type="checkbox" class="me-1" value="'+v.id+':'+tableSuffix+'"'+checked+'></td>\n\
                            <td><a href=\'javascript:void(0);\' onclick=\'javascript: getBalanceDetail("'+v.id+'")\'>查看详情</a></td>\n\
                            <td>'+v.mallName+'['+v.mallCode+']</td>\n\
                            <td>'+(v.voucherFlag==1?'<span class="badge badge-success">已生成凭证</span>':'<span class="badge badge-warning">未生成凭证</span>')+'</td>\n\
                            <td>'+(v.itemType=='normal'?'<span class="badge badge-info">常规</span>':'<span class="badge badge-danger">调整</span>')+'</td>\n\
                            <td>'+v.brandName+'['+v.sapContractNo+']</td>\n\
                            <td>'+v.tenantName+'['+v.tenantNo+']</td>\n\
                            <td>'+(v.unitName || '')+'</td>\n\
                            <td>'+v.itemName+'['+v.itemCode+']</td>\n\
                            <td>收</td>\n\
                            <td>'+v.startDate+'～'+v.endDate+'</td>\n\
                            <td>'+v.yyyymm+'</td>\n\
                            <td><strong>'+accounting.formatNumber(v.amount)+'</strong></td>\n\
                            <td>'+accounting.formatNumber(v.taxAmount)+'</td>\n\
                            <td>'+DecrMonth(v.startDate.split('-')[0]+'-'+v.startDate.split('-')[1]+'-01')+'</td>\n\
                            <td>'+v.startDate.split('-')[0]+'-'+v.startDate.split('-')[1]+'-'+v.settleDay+'</td>\n\
                        </tr>');
                    })
                    $('#totalTaxAmount').text(accounting.formatNumber(totalTaxAmount));
                    $('#totalAmount').text(accounting.formatNumber(totalAmount));
                    
                    $(".me-1").each(function(){
                        $(this).change(function(){
                            if($(this).is(':checked') == true) {
                                $.checkBalance.push($(this).val());
                                $.cookie('checkBalance',JSON.stringify($.checkBalance));
                            } else {
                                var pos = $.inArray($(this).val(),$.checkBalance);
                                $.checkBalance.splice(pos,1);
                                $.cookie('checkBalance',JSON.stringify($.checkBalance));
                            }
                            if($.checkBalance.length > 0){
                                $(".selected").html("已选<b class='text-red'>"+$.checkBalance.length+"</b>条 <a href='javascript:void(0);' onclick='javascript: disp_confirm()' class='btn btn-primary btn-sm'><i class='fa fa-plus icon-white'></i> <span class='hidden-xs'>生成凭证</span></a>");
                            } else {
                                $(".selected").text("");
                            }
                        })
                    });

                    $("#all").change(function(){
                        if($(this).is(':checked') == true) {
                            $(".me-1").each(function(i,e){
                                if($(e).is(':checked') == false) {
                                    $(e).prop('checked',true);
                                    
                                    $.checkBalance.push($(e).val());
                                    $.cookie('checkBalance',JSON.stringify($.checkBalance));
                                }
                            })
                        } else {
                            $(".me-1").each(function(i,e){
                                if($(e).is(':checked') == true) {
                                    $(e).prop("checked",false);

                                    var pos = $.inArray($(e).val(),$.checkBalance);
                                    $.checkBalance.splice(pos,1);
                                    $.cookie('checkBalance',JSON.stringify($.checkBalance));
                                }
                            })
                        }
                        if($.checkBalance.length > 0){
                            $(".selected").html("已选<b class='text-red'>"+$.checkBalance.length+"</b>条 <a href='javascript:void(0);' onclick='javascript: disp_confirm()' class='btn btn-primary btn-sm'><i class='fa fa-plus icon-white'></i> <span class='hidden-xs'>生成凭证</span></a>");
                        } else {
                            $(".selected").text("");
                        }
                    })
                    
                    if(p == pages){
                        $(".pagination-info").html('显示 '+Math.ceil((p-1)*c+1)+' 到 '+response.data.totalElements+' 行，共 '+response.data.totalElements+'行');
                    } else {
                        $(".pagination-info").html('显示 '+Math.ceil((p-1)*c+1)+' 到 '+Math.ceil((p-1)*c+Number(c))+' 行，共 '+response.data.totalElements+'行');
                    }
                } else {
                    $('#balance').html('<tr><td colspan="16" style="text-align: center;">没有找到任何记录！</td></tr>');
                }
            } else {
                alertMsg(response.code,response.customerMessage);
            }
        }
    })
}

function getBalanceDetail(id){
    $('.mandatory-error').remove();
    $('#investment-contract-balance-create').modal('toggle');
    
    updateBalanceContractDropDown(50);
    
    if($("#balanceDepartment").val() != '' && $("#balanceDepartment").val() != null){
        updateBalanceStoreDropDownByMallCode(10,$("#balanceDepartment").val());
    }
    $("#balanceDepartment").on('change',function(){
        updateBalanceStoreDropDownByMallCode(10,$(this).val());
    })
    
    $('.input-daterange, #billingDate, #paymentDate').datepicker({
        'language': 'zh-CN',
        'format': 'yyyy-mm-dd',
        'todayBtn': "linked",
        'todayHighlight': true,
        'autoclose': true
    });
    
    $('#balanceYearMonth').datepicker({
        'language': 'zh-CN',
        'format': 'yyyy-mm',
        'todayHighlight': true,
        'startView': 'months',
        'maxViewMode': 'years',
        'minViewMode': 'months',
        'autoclose': true
    })
    
    $('#deleteCalc, #adjustRow').hide();
    var balance = $.parseJSON(sessionStorage.getItem("balance"));
    $('#balanceTermType, #taxRate').val('').trigger('change');
    $('#settleDay').val('25').trigger('change');
    $('#startDate, #endDate, #balanceYearMonth, #billingDate, #taxAmount, #amount, #taxRentAmount, #rentAmount, #paymentDate, #yearMonth, #remarks').val('');
    $('#balanceDepartment, #balanceStore, #balanceContract').empty(); 
    $('#balanceDepartment, #balanceStore, #balanceContract').select2("val", "");
    $('.modal-header h4').find('.badge').remove();
    $('.shield').remove();
    
    var openId = 'admin';
    $.each(JSON.parse($.cookie('userModules')), function(i,v) {
        if(v.roleCode == 'CROLE220301000001'){
            openId = v.moduleName;
            return false;
        }
    })
        
    $.each(balance, function(i,v){
        if(v.id == id){
            var temp;
                        
            if(v.voucherFlag == 0){
                temp = '<span class="badge badge-warning" style="vertical-align: top; margin-right: 10px;">未生成凭证</span>';
            } else {
                temp = '<span class="badge badge-success" style="vertical-align: top; margin-right: 10px;">已生成凭证</span>'
            }
            $('.modal-header h4').prepend(temp);
            
            if(v.itemType == 'normal'){
                temp = '<span class="badge badge-info" style="vertical-align: top; margin-right: 10px;">常规</span>';
            } else {
                temp = '<span class="badge badge-danger" style="vertical-align: top; margin-right: 10px;">调整</span>'
            }
            $('.modal-header h4').prepend(temp);
            
            temp = new Option(v.mallName+'['+v.mallCode+']',v.mallCode,true,true);
            $('#balanceDepartment').append(temp).trigger('change');
            
            temp = new Option((v.unitName +' | '+ v.area + '㎡'),v.shopCode+':::'+v.area, true, true);
            $('#balanceStore').append(temp).trigger('change');
            
            temp = new Option(v.tenantName+'['+v.contractNo+'] | '+v.brandName+' | '+v.unitName+' | '+v.startDate+'～'+v.endDate+' | V'+v.contractVersion, v.contractNo, true, true);
            $('#balanceContract').append(temp).trigger('change');
            
            $('#balanceTermType').val(v.itemCode).trigger('change');
            $('#startDate').datepicker('update', v.startDate);
            $('#endDate').datepicker('update', v.endDate);
            var balanceYearMonth = v.yyyymm.toString();
            $('#balanceYearMonth').datepicker('update', balanceYearMonth.substr(0,4)+'-'+balanceYearMonth.substr(4,2));
            $('#billingDate').datepicker('update',DecrMonth(v.startDate.split('-')[0]+'-'+v.startDate.split('-')[1]+'-01'));
            $('#taxAmount').val(accounting.formatNumber(v.taxAmount));
            $('#amount').val(accounting.formatNumber(v.amount));
            $('#taxRentAmount').val(accounting.formatNumber(v.taxRentAmount));
            $('#rentAmount').val(accounting.formatNumber(v.rentAmount));
            $('#paymentDate').datepicker('update',v.startDate.split('-')[0]+'-'+v.startDate.split('-')[1]+'-'+v.settleDay); 
            $('#taxRate').val(v.taxRate).trigger('change');
            $('#settleDay').val(v.settleDay).trigger('change');
            $('#remarks').val(v.remarks);
            
            if(v.creatorOpenId == openId && v.itemType == 'adjust' && v.voucherFlag == 0){
                $('#deleteCalc, #adjustRow').show();
                
                $('#saveCalc').click(function(){
                    saveCheck(JSON.stringify(v));
                })
                
                $('#deleteCalc').click(function(){
                    deleteCalc(JSON.stringify(v));
                })
            } else {
                 $('.modal-content').prepend('<div class="shield" style="position: absolute;background:rgba(0,0,0,0.1);width: 100%;height: 100%;z-index: 3;"></div>');
            }
            
            return false;
        }
    })
}

function isInArray(arr,val){
    var str = ","+arr.join(",")+",";
    var res;
    if(str.indexOf(","+val+",") != "-1") {
        res = 1;
    } else {
        res = 2;
  }
  return res;
}

function updateBalanceContractDropDown(data_count) {
    $('#balanceContract').select2({
        dropdownParent: $('#investment-contract-balance-create'),
        placeholder: '输入合同编号',
        dropdownAutoWidth: true,
        allowClear: true,
        language: {
            searching: function() {
                return '加载中...';
            },
            loadingMore: function() {
                return '加载中...';
            }
        },
        ajax: {
            url: function (params) {
                return $.api.baseLotus+"/api/contract/lotus/findAllByFreeCondition?page="+(params.page || 0)+"&size="+data_count+"&sort=contractNo,asc";
            },
            type: "POST",
            async: true,
            dataType: "json",
            contentType: "application/json",
            delay: 250,
            beforeSend: function(request) {
                request.setRequestHeader("Login", $.cookie('login'));
                request.setRequestHeader("Authorization", $.cookie('authorization'));
                request.setRequestHeader("Lang", $.cookie('lang'));
                request.setRequestHeader("Source", "onlineleasing");
            },
            data: function (params) {
                var map = {
                    key: params.term || $('#department').val(),
                    operator: "OR",
                    params: [
                      "mallCode","tenantName","contractNo","unitName","contractName"
                    ],
                    sorts: []
                }
                return JSON.stringify(map);
            },
            processResults: function (data,params) {
                if(data['code'] === 'C0') {
                    var jsonData = data['data'].content;
                    params.page = params.page || 0;
                    var data;
                    return {
                        results: $.map(jsonData, function(item) {
                            data = {
                                id: item.contractNo,
                                text: item.tenantName + '[' + item.contractNo + '] | ' + (item.contractName || '') + ' | ' + item.unitName + ' | ' + item.startDate + '～' + item.endDate + ' | ' + 'V'+item.contractVersion           
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
    });
}

function updateBalanceStoreDropDownByMallCode(data_count,mall_code) {
    var selectStore = $('#balanceStore');
    
    selectStore.select2({
        dropdownParent: $('#investment-contract-balance-create'),
        placeholder: '未选择',
        dropdownAutoWidth: true,
        allowClear: true,
        language: {
            searching: function() {
                return '加载中...';
            },
            loadingMore: function() {
                return '加载中...';
            }
        },
        ajax: {
            url: function (params) {
                return $.api.baseLotus+"/api/vshop/lotus/findAllByKVCondition?page="+(params.page || 0)+"&size="+data_count+"&sort=id,asc";
            },
            type: "POST",
            async: false,
            dataType: "json",
            contentType: "application/json",
            delay: 250,
            beforeSend: function(request) {
                request.setRequestHeader("Login", $.cookie('login'));
                request.setRequestHeader("Authorization", $.cookie('authorization'));
                request.setRequestHeader("Lang", $.cookie('lang'));
                request.setRequestHeader("Source", "onlineleasing");
            },
            data: function (params) {
                var term = params.term;
                var mallCodes = mall_code;
                var mallCode = mallCodes;
                $.each(JSON.parse($.cookie('userModules')), function(i,v) {
                    if((v.roleCode == 'CROLE211008000002' || v.roleCode == 'CROLE220922000001') && v.moduleCode == 'ALL'){
                        mallCodes = 'ALL';
                        return false;
                    }
                })
                
                var params = [];
                var conditionGroups = [];
                var conditionGroup = {};
                
                params = [
                    {
                      "columnName": "mallCodes",
                      "columnPatten": "",
                      "conditionOperator": "AND",
                      "operator": "=",
                      "value": mallCodes
                    },
                    {
                      "columnName": "mallCode",
                      "columnPatten": "",
                      "conditionOperator": "AND",
                      "operator": "=",
                      "value": mallCode
                    },
                    {
                      "columnName": "userCode",
                      "columnPatten": "",
                      "conditionOperator": "AND",
                      "operator": "=",
                      "value": $.cookie('uid')
                    }
                ]

                conditionGroup = {
                    "conditionOperator": "AND",
                    "params": params
                }

                conditionGroups.push(conditionGroup);
                
                
                
                if(term != undefined && term != '') {
                    conditionGroups.push({
                        "conditionOperator": "OR",
                        "params": [{
                                "columnName": "unitName",
                                "columnPatten": "",
                                "conditionOperator": "AND",
                                "operator": "LIKE",
                                "value": term
                            }
                        ]
                    },{
                        "conditionOperator": "OR",
                        "params": [{
                                "columnName": "unitCode",
                                "columnPatten": "",
                                "conditionOperator": "AND",
                                "operator": "LIKE",
                                "value": term
                            }
                        ]
                    });
                }
                
                var map = {
                    "conditionGroups": conditionGroups,
                    "params": []
                }
    
                return JSON.stringify(map);
            },
            processResults: function (data,params) {
                if(data['code'] === 'C0') {
                    var jsonData = data['data'].content;
                    params.page = params.page || 0;
                    var data;
                    return {
                        results: $.map(jsonData, function(item) {
                            data = {
                                id: item.code+':::'+item.unitArea,
                                text: item.unitName +' | '+ item.unitArea + '㎡'                            
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
    });
}

function saveCheck(v) {
    $('.mandatory-error').remove();
    var flag = 1;
    var error = '<i class="fa fa-exclamation-circle mandatory-error" aria-hidden="true"></i>';
    
    if($('#balanceDepartment').val() == null) {
        flag = 0;
        $('#balanceDepartment').parent().append(error);
    }
    
    if($('#balanceContract').val() == null) {
        flag = 0;
        $('#balanceContract').parent().append(error);
    }
    
    if($('#balanceStore').val() == null) {
        flag = 0;
        $('#balanceStore').parent().append(error);
    }
    
    if($('#balanceTermType').val() == '') {
        flag = 0;
        $('#balanceTermType').parent().append(error);
    }
    
    if($('#startDate').val() == '') {
        flag = 0;
        $('#endDate').parent().append(error);
    }
    
    if($('#endDate').val() == '') {
        flag = 0;
        $('#endDate').parent().append(error);
    }
    
    if($('#balanceYearMonth').val() == '') {
        flag = 0;
        $('#balanceYearMonth').parent().append(error);
    }
    
    if($('#billingDate').val() == '') {
        flag = 0;
        $('#billingDate').parent().append(error);
    }
    
    if($('#paymentDate').val() == '') {
        flag = 0;
        $('#paymentDate').parent().append(error);
    }
    
    if($('#amount').val() == '') {
        flag = 0;
        $('#amount').parent().append(error);
    }
    
    if($('#taxAmount').val() == '') {
        flag = 0;
        $('#taxAmount').parent().append(error);
    }
    
    if($('#rentAmount').val() == '') {
        flag = 0;
        $('#rentAmount').parent().append(error);
    }
    
    if($('#taxRentAmount').val() == '') {
        flag = 0;
        $('#taxRentAmount').parent().append(error);
    }
    
    if($('#taxRate').val() == '') {
        flag = 0;
        $('#taxRate').parent().append(error);
    }
    
    if($('#settleDay').val() == null) {
        flag = 0;
        $('#settleDay').parent().append(error);
    }
    
    if(flag == 1 && $('.mandatory-error').length == 0){
        if(v == ''){
            saveCalc();
        } else {
            editCalc(v);
        }
    } else {
        $('html, body').animate({
            scrollTop: $('.mandatory-error').offset().top - 195
        }, 0);
    }
}

function editCalc(calc) {
    Ewin.confirm({ message: "确定要修改该条结算数据吗？" }).on(function (e) {
        if (!e) {
            return;
        }
        
        var openId = 'admin';
        $.each(JSON.parse($.cookie('userModules')), function(i,v) {
            if(v.roleCode == 'CROLE220301000001'){
                openId = v.moduleName;
                return false;
            }
        })
        
        var map = JSON.parse(calc);
        map.amount = numberWithoutCommas($('#amount').val());
        map.area = $('#balanceStore').val().split(':::')[1];       
        map.contractNo = $('#balanceContract').find('option:selected').val(); 
        map.contractVersion = $('#balanceContract').find('option:selected').text().split(' | ')[4].substr(1,1);
        map.endDate = $('#endDate').val();  
        map.itemCode = $('#balanceTermType').find('option:selected').val();       
        map.itemName = $('#balanceTermType').find('option:selected').text();
        map.remarks = $('#remarks').val();
        map.rentAmount = numberWithoutCommas($('#rentAmount').val());
        map.settleDay = $('#settleDay').val();      
        map.shopCode = $('#balanceStore').val().split(':::')[0];
        map.startDate = $('#startDate').val();    
        map.taxAmount = numberWithoutCommas($('#taxAmount').val());
        map.taxCode = $('#taxRate').find('option:selected').text();
        map.taxRate = parseFloat($('#taxRate').find('option:selected').val() / 100).toFixed(5),
        map.taxRentAmount = numberWithoutCommas($('#taxRentAmount').val());
        map.updateOpenId = openId;      
        map.yyyymm =  $('#balanceYearMonth').val().split('-')[0]+$('#balanceYearMonth').val().split('-')[1] ;
        
        if(map.creatorOpenId != openId){
            alertMsg('9999','非本人不能操作。');
            return false;
        } else if(map.itemType == 'normal'){
            alertMsg('9999','常规结算数据不能修改。');
            return false;
        } else if(map.voucherFlag == 1){
            alertMsg('9999','该条数据已生成凭证，不能修改。');
            return false;
        }
        
        $.ajax({
            url: $.api.baseLotus+"/api/contract/rent/calc/saveOrUpdate",
            type: "POST",
            data: JSON.stringify(map),
            async: false,
            dataType: "json",
            contentType: "application/json",
            beforeSend: function(request) {
                request.setRequestHeader("Login", $.cookie('login'));
                request.setRequestHeader("Authorization", $.cookie('authorization'));
                request.setRequestHeader("Lang", $.cookie('lang'));
                request.setRequestHeader("Source", "onlineleasing");
            },
            complete: function(){},
            success: function (response, status, xhr) {
                if(response.code === 'C0') {
                    if(xhr.getResponseHeader("Login") !== null){
                        $.cookie('login', xhr.getResponseHeader("Login"));
                    }
                    if(xhr.getResponseHeader("Authorization") !== null){
                        $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                    }
                    
                    window.location.href = '/lotus-admin/contract-balance?'+(getURLParameter('page') ? 'page='+getURLParameter('page') : '')+(getURLParameter('items') ? '&items='+getURLParameter('items') : '')+'&s=succeed';
                } else {
                    alertMsg(response.code,response.customerMessage);
                }
            }
        })
    })
}

function createBalanceDetail(){
    $('.mandatory-error,.shield').remove();
    $('#investment-contract-balance-create').modal('toggle');

    updateBalanceContractDropDown(50);
    
    if($("#balanceDepartment").val() != '' && $("#balanceDepartment").val() != null){
        updateBalanceStoreDropDownByMallCode(10,$("#balanceDepartment").val());
    }
    $("#balanceDepartment").on('change',function(){
        updateBalanceStoreDropDownByMallCode(10,$(this).val());
    })
    
    $('.input-daterange, #billingDate, #paymentDate').datepicker({
        'language': 'zh-CN',
        'format': 'yyyy-mm-dd',
        'todayBtn': "linked",
        'todayHighlight': true,
        'autoclose': true
    });
    
    $('#balanceYearMonth').datepicker({
        'language': 'zh-CN',
        'format': 'yyyy-mm',
        'todayHighlight': true,
        'startView': 'months',
        'maxViewMode': 'years',
        'minViewMode': 'months',
        'autoclose': true
    })
    
    $('#deleteCalc, #adjustRow').hide();
    $('#balanceTermType, #taxRate').val('').trigger('change');
    $('#settleDay').val('25').trigger('change');
    $('#startDate, #endDate, #balanceYearMonth, #billingDate, #taxAmount, #amount, #taxRentAmount, #rentAmount, #paymentDate').val('');
    $('#balanceStore, #balanceContract').empty(); 
    $('#balanceDepartment, #balanceStore, #balanceContract').select2("val", "");
    $('#yearMonth, #remarks').val('');
    $('.modal-header h4').find('.badge').remove();
        
    $('#adjustRow').show();
                
    $('#saveCalc').click(function(){
        saveCheck('');
    })
}

function saveCalc() {
    Ewin.confirm({ message: "确定要保存该条结算数据吗？" }).on(function (e) {
        if (!e) {
            return;
        }
        
        var openId = 'admin';
        $.each(JSON.parse($.cookie('userModules')), function(i,v) {
            if(v.roleCode == 'CROLE220301000001'){
                openId = v.moduleName;
                return false;
            }
        })
        
        var map = {
            "amount": numberWithoutCommas($('#amount').val()),
            "area": $('#balanceStore').val().split(':::')[1],
            "contractNo": $('#balanceContract').find('option:selected').val(),
            "contractVersion": $('#balanceContract').find('option:selected').text().split(' | ')[4].substr(1,1),
            "creatorOpenId": openId,
            "endDate": $('#endDate').val(),
            "invoiceFlag": 1,
            "isOverdueFlag": 1,
            "itemCode": $('#balanceTermType').find('option:selected').val(),       
            "itemName": $('#balanceTermType').find('option:selected').text(),
            "itemType": "adjust",
            "overdueInvoiceFlag": 1,
            "overdueRate": 0.00100,
            "overdueTaxRate": 0.06000,
            "periodTypeCode": 1,
            "periodTypeName": "自然月",
            "remarks": $('#remarks').val(),
            "rentAmount": numberWithoutCommas($('#rentAmount').val()),
            "settleDay": $('#settleDay').val(),
            "settlePeriodCode": "M",
            "settlePeriodName": "月",
            "shopCode": $('#balanceStore').val().split(':::')[0],
            "startDate": $('#startDate').val(),
            "taxAmount": numberWithoutCommas($('#taxAmount').val()),
            "taxCode": $('#taxRate').find('option:selected').text(),
            "taxRate": parseFloat($('#taxRate').find('option:selected').val() / 100).toFixed(5),
            "taxRentAmount": numberWithoutCommas($('#taxRentAmount').val()),
            "updateOpenId": openId,
            "yyyymm":  $('#balanceYearMonth').val().split('-')[0]+$('#balanceYearMonth').val().split('-')[1]
        }
        
        $.ajax({
            url: $.api.baseLotus+"/api/contract/rent/calc/saveOrUpdate",
            type: "POST",
            data: JSON.stringify(map),
            async: false,
            dataType: "json",
            contentType: "application/json",
            beforeSend: function(request) {
                request.setRequestHeader("Login", $.cookie('login'));
                request.setRequestHeader("Authorization", $.cookie('authorization'));
                request.setRequestHeader("Lang", $.cookie('lang'));
                request.setRequestHeader("Source", "onlineleasing");
            },
            complete: function(){},
            success: function (response, status, xhr) {
                if(response.code === 'C0') {
                    if(xhr.getResponseHeader("Login") !== null){
                        $.cookie('login', xhr.getResponseHeader("Login"));
                    }
                    if(xhr.getResponseHeader("Authorization") !== null){
                        $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                    }
                    
                    window.location.href = '/lotus-admin/contract-balance?'+(getURLParameter('page') ? 'page='+getURLParameter('page') : '')+(getURLParameter('items') ? '&items='+getURLParameter('items') : '')+'&s=succeed';
                } else {
                    alertMsg(response.code,response.customerMessage);
                }
            }
        })
    })
}

function disp_confirm() {
    if($.checkBalance.length > 0) {
        var r = confirm("确定要将选中的"+$.checkBalance.length+"条结算数据生成凭证吗");
        if (r == true) {
            generateVoucherEntryBySelect();
        }
    } else {
         alertMsg('9999','没有选中任何结算数据！');
    }
}

function generateVoucherEntryBySelect() {
    var detailList = [];
    var detail = {};
    var tableName = '';
    $.each($.checkBalance, function(i,v){
        switch (v.split(':')[1]) {
            case "2":
                tableName = 't_ol_contract_rent_calc_lotus_adjust';
                break;
            default:
                tableName = 't_ol_contract_rent_calc_lotus';
                break;
        }
        detail = {
            "id": v.split(':')[0],
            "tableName": tableName
        }
        detailList.push(detail);
    })
    
    var openId = 'admin';
    $.each(JSON.parse($.cookie('userModules')), function(i,v) {
        if(v.roleCode == 'CROLE220301000001'){
            openId = v.moduleName;
            return false;
        }
    })
    
    var map = {
        "detailList": detailList,
        "updateOpenId": openId
    }

    $.ajax({
        url: $.api.baseLotus+"/api/v/contract/settle/data/generateVoucherEntryBySelect",
        type: "POST",
        data: JSON.stringify(map),
        async: false,
        dataType: "json",
        contentType: "application/json",
        beforeSend: function(request) {
            request.setRequestHeader("Login", $.cookie('login'));
            request.setRequestHeader("Authorization", $.cookie('authorization'));
            request.setRequestHeader("Lang", $.cookie('lang'));
            request.setRequestHeader("Source", "onlineleasing");
        },
        complete: function(){},
        success: function (response, status, xhr) {
            if(response.code === 'C0') {
                if(xhr.getResponseHeader("Login") !== null){
                    $.cookie('login', xhr.getResponseHeader("Login"));
                }
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                }
                
                $.cookie('checkBalance','');
                $.checkBalance = [];
                
                window.location.href = '/lotus-admin/contract-balance?'+(getURLParameter('page') ? 'page='+getURLParameter('page') : '')+(getURLParameter('items') ? '&items='+getURLParameter('items') : '')+'&s=voucher';
            }
        }
    });
}

function deleteCalc(calc) {
    Ewin.confirm({ message: "确定要删除该条结算数据吗？" }).on(function (e) {
        if (!e) {
            return;
        }
        
        var openId = 'admin';
        $.each(JSON.parse($.cookie('userModules')), function(i,v) {
            if(v.roleCode == 'CROLE220301000001'){
                openId = v.moduleName;
                return false;
            }
        })
        
        var map = JSON.parse(calc);
        map.state = 0;
        map.updateOpenId = openId;
        
        if(map.creatorOpenId != openId){
            alertMsg('9999','非本人不能操作。');
            return false;
        } else if(map.itemType == 'normal'){
            alertMsg('9999','常规结算数据不能修改。');
            return false;
        } else if(map.voucherFlag == 1){
            alertMsg('9999','该条数据已生成凭证，不能修改。');
            return false;
        }
        
        $.ajax({
            url: $.api.baseLotus+"/api/contract/rent/calc/saveOrUpdate",
            type: "POST",
            data: JSON.stringify(map),
            async: false,
            dataType: "json",
            contentType: "application/json",
            beforeSend: function(request) {
                request.setRequestHeader("Login", $.cookie('login'));
                request.setRequestHeader("Authorization", $.cookie('authorization'));
                request.setRequestHeader("Lang", $.cookie('lang'));
                request.setRequestHeader("Source", "onlineleasing");
            },
            complete: function(){},
            success: function (response, status, xhr) {
                if(response.code === 'C0') {
                    if(xhr.getResponseHeader("Login") !== null){
                        $.cookie('login', xhr.getResponseHeader("Login"));
                    }
                    if(xhr.getResponseHeader("Authorization") !== null){
                        $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                    }
                    
                    window.location.href = '/lotus-admin/contract-balance?'+(getURLParameter('page') ? 'page='+getURLParameter('page') : '')+(getURLParameter('items') ? '&items='+getURLParameter('items') : '')+'&s=delete';
                } else {
                    alertMsg(response.code,response.customerMessage);
                }
            }
        })
    })
}