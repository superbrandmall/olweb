if($.cookie('checkBalance') &&  JSON.parse($.cookie('checkBalance')).length > 0){
    $.checkBalance = JSON.parse($.cookie('checkBalance'));
} else {
    $.checkBalance = [];
}

$(document).ready(function(){
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
    updateSelectTenantDropDown(50);
    updateBrandNameDropDown(50);
    
    if($.cookie('balanceVoucherStatus') && $.cookie('balanceVoucherStatus') != ''){
        var balanceVoucherStatus = $.cookie('balanceVoucherStatus').split(',');
        if(balanceVoucherStatus.length > 1){
            $('#voucherStatus').val(balanceVoucherStatus).trigger('change');
        } else {
            $('#voucherStatus').val($.cookie('balanceVoucherStatus')).trigger('change');
        }
    }
    
    if($.cookie('balanceMallVal') != null && $.cookie('balanceMallVal') != 'null'){
        var newOption = new Option($.cookie('balanceMallTxt'), $.cookie('balanceMallVal'), true, true);
        $('#department').append(newOption).trigger('change');
    } else {
        $('#department').val('').trigger('change');
    }
    
    if($.cookie('balanceUnitType') != ''){
        $('#unitType').val($.cookie('balanceUnitType')).trigger('change');
    }
    
    if($.cookie('balanceSelectStoreVal') != null && $.cookie('balanceSelectStoreVal') != 'null'){
        var newOption = new Option($.cookie('balanceSelectStoreTxt'), $.cookie('balanceSelectStoreVal'), true, true);
        $('#selectStore').append(newOption).trigger('change');
    } else {
        $('#selectStore').val('').trigger('change');
    }
    
    if($.cookie('balanceContractVal') != null && $.cookie('balanceContractVal') != 'null'){
        var newOption = new Option($.cookie('balanceContractTxt'), $.cookie('balanceContractVal'), true, true);
        $('#selectContract').append(newOption).trigger('change');
    }
    
    if($.cookie('balanceSelectTenantVal') != null && $.cookie('balanceSelectTenantVal') != 'null'){
        var newOption = new Option($.cookie('balanceSelectTenantTxt'), $.cookie('balanceSelectTenantVal'), true, true);
        $('#selectTenant').append(newOption).trigger('change');
    }
    
    if($.cookie('balanceSelectBrandVal') != null && $.cookie('balanceSelectBrandVal') != 'null'){
        var newOption = new Option($.cookie('balanceSelectBrandTxt'), $.cookie('balanceSelectBrandVal'), true, true);
        $('#brandName').append(newOption).trigger('change');
    }
    
    if($.cookie('balanceTermType') != null && $.cookie('balanceTermType') != 'null'){
        $('#termType').val($.cookie('balanceTermType')).trigger('change');
    }
    
    if($.cookie('balanceItemType') != null && $.cookie('balanceItemType') != 'null'){
        $('#itemType').val($.cookie('balanceItemType')).trigger('change');
    }
    
    if($.cookie('balanceYearMonthStartDate') != null && $.cookie('balanceYearMonthStartDate') != 'null'){
        $('#yearMonthStartDate').val($.cookie('balanceYearMonthStartDate'));
    }
    
    if($.cookie('balanceYearMonthEndDate') != null && $.cookie('balanceYearMonthEndDate') != 'null'){
        $('#yearMonthEndDate').val($.cookie('balanceYearMonthEndDate'));
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
    
    if($("#department").val() != '' && $("#department").val() != null){
        updateSelectStoreDropDownByMallCode(10,$("#department").val());
    }
    $("#department").on('change',function(){
        updateSelectStoreDropDownByMallCode(10,$(this).val());
    })
    
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
        $.cookie('balanceVoucherStatus','');
        $.cookie('balanceTermType', null);
        $.cookie('balanceItemType', null);
        $.cookie('balanceContractTxt', null);
        $.cookie('balanceContractVal', null);
        $.cookie('balanceMallTxt', null);
        $.cookie('balanceMallVal', null);
        $.cookie('balanceUnitType','');
        $.cookie('balanceSelectStoreVal', null);
        $.cookie('balanceSelectStoreTxt', null);
        $.cookie('balanceYearMonthStartDate', null);
        $.cookie('balanceYearMonthEndDate', null);
        $.cookie('balanceSelectTenantVal', null);
        $.cookie('balanceSelectTenantTxt', null);
        $.cookie('balanceSelectBrandVal', null);
        $.cookie('balanceSelectBrandTxt', null);
        
        $('#voucherStatus, #department, #unitType, #termType, #itemType, #selectStore, #selectContract, #selectTenant, #brandName').val('').trigger('change');
        $('#yearMonthStartDate, #yearMonthEndDate').val('');
    })
    
    $('#search').click(function(){
        $('#totalAmount, #totalTaxAmount').text(accounting.formatNumber(0));
        $.cookie('balanceVoucherStatus', $('#voucherStatus').val());
        $.cookie('balanceYearMonthStartDate', $('#yearMonthStartDate').val());
        $.cookie('balanceYearMonthEndDate', $('#yearMonthEndDate').val());
        $.cookie('balanceTermType', $('#termType').val());
        $.cookie('balanceContractVal', $('#selectContract').val());
        $.cookie('balanceContractTxt', $('#selectContract').find('option:selected').text());
        $.cookie('balanceMallVal', $('#department').val());
        $.cookie('balanceMallTxt', $('#select2-department-container').attr('title'));
        $.cookie('balanceUnitType', $('#unitType').val());
        $.cookie('balanceSelectStoreVal', $('#selectStore').val());
        $.cookie('balanceSelectStoreTxt', $('#selectStore').find('select option:selected').text());
        $.cookie('balanceSelectTenantVal', $('#selectTenant'));
        $.cookie('balanceSelectTenantTxt', $('#selectTenant').find('option:selected').text());
        $.cookie('balanceSelectBrandVal', $('#brandName').val());
        $.cookie('balanceSelectBrandTxt', $('#brandName').find('option:selected').text());
        $.cookie('balanceItemType', $('#itemType').val());
        $.checkBalance = [];
        $.cookie('checkBalance','');
        findBalanceByKVCondition(1,items);
    })
    
    $('.fixed-table-body').on('scroll', scrollHandle);
});

function findBalanceByKVCondition(p,c) {
    var params = [];
    var param = {};
    var conditionGroups = [];
    
    if($.cookie('balanceVoucherStatus') != null && $.cookie('balanceVoucherStatus') != ''  && $.cookie('balanceVoucherStatus').substring(0,1) != ','){
        var reg = new RegExp(",","g");
        param = {
            "columnName": "voucherFlag",
            "columnPatten": "",
            "conditionOperator": "AND",
            "operator": "in",
            "value": $.cookie('balanceVoucherStatus').replace(reg,";")
        }
        params.push(param);
    }
    
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
    
    if($.cookie('balanceUnitType') && $.cookie('balanceUnitType') != ''){
        param = {
            "columnName": "unitCode",
            "columnPatten": "",
            "conditionOperator": "AND",
            "operator": "LIKE",
            "value": 'F'+$.cookie('balanceUnitType').split(':::')[0]
        }
        params.push(param);
    }
    
    if($.cookie('balanceSelectStoreVal') != null && $.cookie('balanceSelectStoreVal') != '' && $.cookie('balanceSelectStoreVal') != 'null'){
        param = {
            "columnName": "unitName",
            "columnPatten": "",
            "conditionOperator": "AND",
            "operator": "=",
            "value": $.cookie('balanceSelectStoreVal').split(':::')[2]
        }
        params.push(param);
    }
    
    if($.cookie('balanceContractVal') != null && $.cookie('balanceContractVal') != 'null' && $.cookie('balanceContractVal') != ''){
        param = {
            "columnName": "contractNo",
            "columnPatten": "",
            "conditionOperator": "AND",
            "operator": "=",
            "value": $.cookie('balanceContractVal')
        }
        params.push(param);
    }
    
    if($.cookie('balanceSelectBrandTxt') != null && $.cookie('balanceSelectBrandTxt') != '' && $.cookie('balanceSelectBrandTxt') != 'null'){
        param = {
            "columnName": "brandName",
            "columnPatten": "",
            "conditionOperator": "AND",
            "operator": "=",
            "value": $.cookie('balanceSelectBrandTxt').split('[')[0]
        }
        params.push(param);
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

    if($.cookie('balanceYearMonthStartDate') != null & $.cookie('balanceYearMonthStartDate') != 'null' && $.cookie('balanceYearMonthStartDate') != ''){
        param = {
            "columnName": "yyyymm",
            "columnPatten": "",
            "conditionOperator": "AND",
            "operator": ">=",
            "value": $.cookie('balanceYearMonthStartDate').split('-')[0]+$.cookie('balanceYearMonthStartDate').split('-')[1]
        }
        params.push(param);
    }
    
    if($.cookie('balanceYearMonthEndDate') != null & $.cookie('balanceYearMonthEndDate') != 'null' && $.cookie('balanceYearMonthEndDate') != ''){
        param = {
            "columnName": "yyyymm",
            "columnPatten": "",
            "conditionOperator": "AND",
            "operator": "<=",
            "value": $.cookie('balanceYearMonthEndDate').split('-')[0]+$.cookie('balanceYearMonthEndDate').split('-')[1]
        }
        params.push(param);
    }
    
    if($.cookie('balanceSelectTenantTxt') != null && $.cookie('balanceSelectTenantTxt') != '' && $.cookie('balanceSelectTenantTxt') != 'null'){
        param = {
            "columnName": "tenantNo",
            "columnPatten": "",
            "conditionOperator": "AND",
            "operator": "=",
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
        if($.cookie('userModules') && $.cookie('userModules') != '' && $.cookie('userModules') != null){
            var flag = 1, mc = '';
            $.each(JSON.parse($.cookie('userModules')), function(j,w) {
                if((w.roleCode == 'CROLE211008000002' || w.roleCode == 'CROLE220922000001') && w.moduleCode == 'ALL'){
                    flag = 2;
                    return;
                } else if(w.roleCode == 'CROLE211008000001' && w.moduleName == '门店对接人') {
                    flag = 1;
                    mc += w.moduleCode + ';';
                }
            })
            
            if(flag == 1){
                params = [{
                    "columnName": "mallCode",
                    "columnPatten": "",
                    "conditionOperator": "AND",
                    "operator": "in",
                    "value": mc
                }];
            } else if(flag == 2){
                params = [{
                    "columnName": "state",
                    "columnPatten": "",
                    "conditionOperator": "AND",
                    "operator": "=",
                    "value": 1
                }];
            }
        }
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
                        $(".selected").html("已选<b class='text-red'>"+$.checkBalance.length+"</b>条 <a href='javascript:void(0);' onclick='javascript: disp_confirm()' class='btn btn-primary btn-sm'><i class='fa fa-plus icon-white'></i> <span class='hidden-xs'>生成凭证</span></a>");
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
                        
                        var tbg = '#fff';
                        if(i%2==0){
                            tbg = '#f9f9f9';
                        }
                        
                        $('#balance').append('<tr>\n\
                            <td style="background: '+tbg+'; z-index: 1; border-right: solid 2px #ddd;"><input type="checkbox" class="me-1" value="'+v.id+':'+tableSuffix+'"'+checked+'></td>\n\
                            <td><a href=\'javascript:void(0);\' onclick=\'javascript: getBalanceDetail("'+v.id+'")\'>查看详情</a></td>\n\
                            <td>'+v.mallName+'['+v.mallCode+']</td>\n\
                            <td id="voucherFlag_'+v.id+'">'+(v.voucherFlag==1?'<span class="badge badge-success">已生成凭证</span>':'<span class="badge badge-warning">未生成凭证</span>')+'</td>\n\
                            <td>'+(v.voucherCode || '')+'</td>\n\
                            <td>'+(v.itemType=='normal'?'<span class="badge badge-info">常规</span>':'<span class="badge badge-danger">调整</span>')+'</td>\n\
                            <td>'+v.brandName+'['+v.sapContractNo+']</td>\n\
                            <td>'+v.tenantName+'['+v.tenantNo+']</td>\n\
                            <td>'+v.unitName+'['+v.unitCode+']</td>\n\
                            <td>'+v.itemName+'['+v.itemCode+']</td>\n\
                            <td>收</td>\n\
                            <td>'+v.startDate+'～'+v.endDate+'</td>\n\
                            <td>'+v.yyyymm+'</td>\n\
                            <td><strong>'+accounting.formatNumber(v.amount)+'</strong>元</td>\n\
                            <td>'+accounting.formatNumber(v.taxAmount)+'元</td>\n\
                            <td>'+v.created+'['+(v.creatorOpenId != 'admin' ? renderUserName(v.creatorOpenId) : 'admin')+']</td>\n\
                            <td>'+v.updated+'['+(v.updateOpenId != 'admin' ? renderUserName(v.updateOpenId) : 'admin')+']</td>\n\
                        </tr>');
                    })
                    $('#totalTaxAmount').text(accounting.formatNumber(totalTaxAmount));
                    $('#totalAmount').text(accounting.formatNumber(totalAmount));
                    
                    if($.cookie('generateVoucherEntryResult') && $.cookie('generateVoucherEntryResult') != '' && JSON.parse($.cookie('generateVoucherEntryResult')).length > 0){
                        $.each(JSON.parse($.cookie('generateVoucherEntryResult')), function(j,w) {
                            if(w.resultCode == 'ERROR'){
                                $('#voucherFlag_'+w.id).append('<strong class="text-red-bg-yellow">'+w.resultMsg+'</strong>');
                            }
                        })
                        
                        $.checkBalance = [];
                        $.cookie('checkBalance','');
                        $.cookie('generateVoucherEntryResult','');
                    }
                    
                    
                    
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
                    $('#balance').html('<tr><td colspan="17" style="text-align: center;">没有找到任何记录！</td></tr>');
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
    
    updateBalanceMallDropDown();
    updateBalanceContractDropDown(50);
    
    $('#balanceStartEndDate').datepicker({
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
    $('#balanceUpdated').text('');
    $('#settleDay').val('25').trigger('change');
    $('#startDate, #endDate, #balanceYearMonth, #taxAmount, #amount, #taxRentAmount, #rentAmount, #yearMonth, #remarks').val('');
    $('#balanceDepartment, #balanceContract').empty(); 
    $('#balanceDepartment, #balanceContract').select2("val", "");
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
            
            $('#balanceUpdated').text('最近更新：  '+v.updated+'['+(v.updateOpenId != 'admin' ? renderUserName(v.updateOpenId) : 'admin')+']');
            
            temp = new Option(v.mallName+'['+v.mallCode+']',v.mallCode,true,true);
            $('#balanceDepartment').append(temp).trigger('change');
            
            temp = new Option(v.tenantName+'['+v.contractNo+'] | '+v.brandName+' | '+v.unitName+' | '+v.startDate+'～'+v.endDate+' | V'+v.contractVersion, v.contractNo, true, true);
            $('#balanceContract').append(temp).trigger('change');
            
            $('#balanceTermType').val(v.itemCode).trigger('change');
            $('#startDate').datepicker('update', v.startDate);
            $('#endDate').datepicker('update', v.endDate);
            var balanceYearMonth = v.yyyymm.toString();
            $('#balanceYearMonth').datepicker('update', balanceYearMonth.substr(0,4)+'-'+balanceYearMonth.substr(4,2));
            $('#taxAmount').val(accounting.formatNumber(v.taxAmount));
            $('#amount').val(accounting.formatNumber(v.amount));
            $('#taxRentAmount').val(accounting.formatNumber(v.taxRentAmount));
            $('#rentAmount').val(accounting.formatNumber(v.rentAmount));
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

function updateBalanceMallDropDown() {
    if(sessionStorage.getItem("lotus_malls") && sessionStorage.getItem("lotus_malls") != null && sessionStorage.getItem("lotus_malls") != '') {
        var malls = $.parseJSON(sessionStorage.getItem("lotus_malls"));
        var returnData = [];
        var data = $.map(malls, function(item) {
            if($.cookie('userModules') && $.cookie('userModules') != '' && $.cookie('userModules') != null){
                $.each(JSON.parse($.cookie('userModules')), function(j,w) {
                    if((w.roleCode == 'CROLE211008000002' || w.roleCode == 'CROLE220922000001') && w.moduleCode == 'ALL'){
                        data = {
                            id: item.code,
                            text: item.mallName +'['+ item.code +']'                            
                        }
                        returnData.push(data);
                    } else if(w.roleCode == 'CROLE211008000001' && w.moduleName == '门店对接人') {
                        if(item.code == w.moduleCode){
                            data = {
                                id: item.code,
                                text: item.mallName +'['+ item.code +']'                            
                            }
                            returnData.push(data);
                        }
                    }
                })
            }
                
            return returnData;
        });
        
        $('#balanceDepartment').select2({
            dropdownParent: $('#investment-contract-balance-create'),
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
            data: returnData,
            pagination: {
                "more": 10 <= returnData.length
            }
        });
    }
}

function updateBalanceContractDropDown(data_count) {
    $('#balanceContract').select2({
        dropdownParent: $('#investment-contract-balance-create'),
        placeholder: '输入合同编号',
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
                    key: params.term || $('#balanceDepartment').val(),
                    operator: "OR",
                    params: [
                      "mallCode", "tenantNo","tenantName","sapContractNo","contractNo","contractName"
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
                                id: item.contractNo + ':::' + item.shopCode + ':::' + item.area,
                                text: item.tenantName + '[' + item.tenantNo + '] | ' + (item.contractName || '') + ' | ' + (item.sapContractNo || '') + ' | ' + item.startDate + '～' + item.endDate + ' | ' + 'V'+item.contractVersion           
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
        map.area = $('#balanceContract').val().split(':::')[2];       
        map.contractNo = $('#balanceContract').val().split(':::')[0]; 
        map.contractVersion = $('#balanceContract').find('option:selected').text().split(' | ')[4].substr(1,1);
        map.endDate = $('#endDate').val();  
        map.itemCode = $('#balanceTermType').find('option:selected').val();       
        map.itemName = $('#balanceTermType').find('option:selected').text().split('[')[0],
        map.remarks = $('#remarks').val();
        map.rentAmount = numberWithoutCommas($('#rentAmount').val());
        map.settleDay = $('#settleDay').val();      
        map.shopCode = $('#balanceContract').val().split(':::')[1];
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
                    
                    $.cookie('balanceItemType','adjust');
                    $.cookie('balanceYearMonth',$('#balanceYearMonth').val());
                    
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

    updateBalanceMallDropDown();
    updateBalanceContractDropDown(50);
    
    $('#balanceStartEndDate').datepicker({
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
    $('#startDate, #endDate, #balanceYearMonth, #taxAmount, #amount, #taxRentAmount, #rentAmount').val('');
    $('#balanceContract').empty(); 
    $('#balanceDepartment, #balanceContract').select2("val", "");
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
            "area": $('#balanceContract').val().split(':::')[2],
            "contractNo": $('#balanceContract').val().split(':::')[0],
            "contractVersion": $('#balanceContract').find('option:selected').text().split(' | ')[4].substr(1,1),
            "creatorOpenId": openId,
            "endDate": $('#endDate').val(),
            "invoiceFlag": 1,
            "isOverdueFlag": 1,
            "itemCode": $('#balanceTermType').find('option:selected').val(),       
            "itemName": $('#balanceTermType').find('option:selected').text().split('[')[0],
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
            "shopCode": $('#balanceContract').val().split(':::')[1],
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
                    
                    $.cookie('balanceItemType','adjust');
                    $.cookie('balanceYearMonth',$('#balanceYearMonth').val());
                    
                    successMsg('00','保存成功！');
                    //window.location.href = '/lotus-admin/contract-balance?'+(getURLParameter('page') ? 'page='+getURLParameter('page') : '')+(getURLParameter('items') ? '&items='+getURLParameter('items') : '')+'&s=succeed';
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
        async: true,
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
                
                $('#myModalLabel').text('正在生成凭证, 请稍后...');
                $('#submitStateModal').modal('show');
                var obj = $('#submitState');
                var countdownWriteBalance = $.checkBalance.length;
                setTimeWriteBalance(obj);
                function setTimeWriteBalance(obj) {
                    if (countdownWriteBalance == 0) { 
                        $('#myModalLabel,#submitState').text('');
                        $('#submitStateModal').modal('hide');
                        countdownWriteBalance = $.checkBalance.length;
                        
                        var resultList = [];
                        var result = {};
                        $.each($.checkBalance, function(i,v){
                            result = {
                                "id": v.split(':')[0],
                                "resultCode": response.data[i].resultCode, 
                                "resultMsg": response.data[i].resultMsg
                            }
                            resultList.push(result);
                        })
                        
                        $.cookie('generateVoucherEntryResult',JSON.stringify(resultList));
                        location.reload();
                        return;
                    } else { 
                        obj.html(countdownWriteBalance + "秒");
                        countdownWriteBalance--; 
                    } 
                setTimeout(function() { 
                    setTimeWriteBalance(obj); }
                    ,1000); 
                }
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