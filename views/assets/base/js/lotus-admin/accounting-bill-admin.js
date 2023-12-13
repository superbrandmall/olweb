if($.cookie('checkBill') &&  JSON.parse($.cookie('checkBill')).length > 0){
    $.checkBill = JSON.parse($.cookie('checkBill'));
} else {
    $.checkBill = [];
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
    updateSelectTenantDropDown(50);
    
    if(!sessionStorage.getItem("users") || sessionStorage.getItem("users") == null || sessionStorage.getItem("users") == '') {
        findAllUsers();
    }
    
//    $('#accountingVoucherDate').datepicker({
//        'language': 'zh-CN',
//        'format': 'yyyy-mm-dd',
//        'todayBtn': "linked",
//        'todayHighlight': true,
//        'autoclose': true
//    });
//    
//    $('#yearMonth').datepicker({
//        'language': 'zh-CN',
//        'format': 'yyyy-mm',
//        'todayHighlight': true,
//        'startView': 'months',
//        'maxViewMode': 'years',
//        'minViewMode': 'months',
//        'autoclose': true
//    })
//    
//    if($.cookie('accountingVoucherStatus') && $.cookie('accountingVoucherStatus') != ''){
//        var accountingVoucherStatus = $.cookie('accountingVoucherStatus').split(',');
//        if(accountingVoucherStatus.length > 1){
//            $('#accountingVoucherStatus').val(accountingVoucherStatus).trigger('change');
//        } else {
//            $('#accountingVoucherStatus').val($.cookie('accountingVoucherStatus')).trigger('change');
//        }
//    }
//    
//    if($.cookie('accountingVoucherMallVal') != null && $.cookie('accountingVoucherMallVal') != 'null'){
//        var newOption = new Option($.cookie('accountingVoucherMallTxt'), $.cookie('accountingVoucherMallVal'), true, true);
//        $('#department').append(newOption).trigger('change');
//    } else {
//        $('#department').val('').trigger('change');
//    }
//    
//    if($.cookie('accountingVoucherCode') != null && $.cookie('accountingVoucherCode') != ''){
//        $('#accountingVoucherCode').val($.cookie('accountingVoucherCode'));
//    }
//    
//    if($.cookie('accountingVoucherDate') != null && $.cookie('accountingVoucherDate') != 'null'){
//        $('#accountingVoucherDate').datepicker('update',$.cookie('accountingVoucherDate'));
//    }
//    
//    if($.cookie('accountingContractVal') != null && $.cookie('accountingContractVal') != 'null'){
//        var newOption = new Option($.cookie('accountingContractTxt'), $.cookie('accountingContractVal'), true, true);
//        $('#selectContract').append(newOption).trigger('change');
//    }
//    
//    if($.cookie('accountingSelectTenantVal') != null && $.cookie('accountingSelectTenantVal') != 'null'){
//        var newOption = new Option($.cookie('accountingSelectTenantTxt'), $.cookie('accountingSelectTenantVal'), true, true);
//        $('#selectTenant').append(newOption).trigger('change');
//    }
//    
//    if($.cookie('accountingTermType') != null && $.cookie('accountingTermType') != 'null'){
//        $('#termType').val($.cookie('accountingTermType')).trigger('change');
//    }
//    
//    if($.cookie('accountingYearMonthStartDate') != null && $.cookie('accountingYearMonthStartDate') != 'null'){
//        $('#yearMonthStartDate').val($.cookie('accountingYearMonthStartDate'));
//    }
//    
//    if($.cookie('accountingYearMonthEndDate') != null && $.cookie('accountingYearMonthEndDate') != 'null'){
//        $('#yearMonthEndDate').val($.cookie('accountingYearMonthEndDate'));
//    }
//    
//    if($.cookie('accountingVoucherMessIdOs') != null && $.cookie('accountingVoucherMessIdOs') != ''){
//        $('#accountingVoucherMessIdOs').val($.cookie('accountingVoucherMessIdOs'));
//    }
    
    var items = getURLParameter('items') || $('.page-size').first().text();
    if(getURLParameter('page') && getURLParameter('page') >= 1){
        findBillsByKVCondition(getURLParameter('page'),items);
    } else {
        findBillsByKVCondition(1,items);
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
//        $.cookie('accountingVoucherStatus','');
//        $.cookie('accountingVoucherMallTxt', null);
//        $.cookie('accountingVoucherMallVal', null);
//        $.cookie('accountingContractTxt', null);
//        $.cookie('accountingContractVal', null);
//        $.cookie('accountingSelectTenantVal', null);
//        $.cookie('accountingSelectTenantTxt', null);
//        $.cookie('accountingTermType', null);
//        $.cookie('accountingYearMonthStartDate', null);
//        $.cookie('accountingYearMonthEndDate', null);
//        $.cookie('accountingVoucherCode', '');
//        $.cookie('accountingVoucherVoucherDate', null);
//        $.cookie('accountingVoucherMessIdOs', '');
//        
//        $('#accountingVoucherStatus, #department, #selectContract, #selectTenant, #termType').val('').trigger('change');
//        $('#accountingVoucherCode, #accountingVoucherDate, #accountingVoucherMessIdOs, #yearMonthStartDate, #yearMonthEndDate').val('');
    })
    
    $('#search').click(function(){
//        $.cookie('accountingVoucherStatus', $('#accountingVoucherStatus').val());
//        $.cookie('accountingVoucherMallVal', $('#department').val());
//        $.cookie('accountingVoucherMallTxt', $('#department').find('option:selected').text());
//        $.cookie('accountingContractVal', $('#selectContract').val());
//        $.cookie('accountingContractTxt', $('#selectContract').find('option:selected').text());
//        $.cookie('accountingSelectTenantVal', $('#selectTenant'));
//        $.cookie('accountingSelectTenantTxt', $('#selectTenant').find('option:selected').text());
//        $.cookie('accountingTermType', $('#termType').val());
//        $.cookie('accountingVoucherCode', $('#accountingVoucherCode').val()); 
//        $.cookie('accountingVoucherDate', $('#accountingVoucherDate').val());
//        $.cookie('accountingYearMonthStartDate', $('#yearMonthStartDate').val());
//        $.cookie('accountingYearMonthEndDate', $('#yearMonthEndDate').val());
//        $.cookie('accountingVoucherMessIdOs', $('#accountingVoucherMessIdOs').val());
        $.checkBill = [];
        $.cookie('checkBill','');
        findBillsByKVCondition(1,items);
    })
    
    $('.fixed-table-body').on('scroll', scrollHandle);
});

function findBillsByKVCondition(p,c) {
    var params = [];
    var param = {};
    var conditionGroups = [];
    
    param = {
        "columnName": "letterType",
        "columnPatten": "",
        "conditionOperator": "AND",
        "operator": "=",
        "value": "财务账单"
    }
    params.push(param);
    
//    if($.cookie('accountingVoucherStatus') != null && $.cookie('accountingVoucherStatus') != ''  && $.cookie('accountingVoucherStatus').substring(0,1) != ','){
//        var reg = new RegExp(",","g");
//        param = {
//            "columnName": "voucherStatus",
//            "columnPatten": "",
//            "conditionOperator": "AND",
//            "operator": "in",
//            "value": $.cookie('accpountingVoucherStatus').replace(reg,";")
//        }
//        params.push(param);
//    }
//    
//    if($.cookie('accountingVoucherMallVal') != null && $.cookie('accountingVoucherMallVal') != 'null'){
//        param = {
//            "columnName": "mallCode",
//            "columnPatten": "",
//            "conditionOperator": "AND",
//            "operator": "=",
//            "value": ($.cookie('accountingVoucherMallVal') != null ? $.cookie('accountingVoucherMallVal') : $('#department').val())
//        }
//        params.push(param);
//    }
//    
//    if($.cookie('accountingContractVal') != null && $.cookie('accountingContractVal') != 'null' && $.cookie('accountingContractVal') != ''){
//        param = {
//            "columnName": "contractNo",
//            "columnPatten": "",
//            "conditionOperator": "AND",
//            "operator": "=",
//            "value": $.cookie('accountingContractVal')
//        }
//        params.push(param);
//    }
//    
//    if($.cookie('accountingSelectTenantTxt') != null && $.cookie('accountingSelectTenantTxt') != '' && $.cookie('accountingSelectTenantTxt') != 'null'){
//        param = {
//            "columnName": "tenantNo",
//            "columnPatten": "",
//            "conditionOperator": "AND",
//            "operator": "=",
//            "value": $.cookie('accountingSelectTenantTxt').split(' | ')[0]
//        }
//        params.push(param);
//    }
//    
//    if($.cookie('accountingTermType') != null && $.cookie('accountingTermType') != 'null' && $.cookie('accountingTermType') != ''){
//        param = {
//            "columnName": "itemCode",
//            "columnPatten": "",
//            "conditionOperator": "AND",
//            "operator": "=",
//            "value": $.cookie('accountingTermType')
//        }
//        params.push(param);
//    }
//
//    if($.cookie('accountingVoucherCode') != null && $.cookie('accountingVoucherCode') != ''){
//        param = {
//            "columnName": "voucherCode",
//            "columnPatten": "",
//            "conditionOperator": "AND",
//            "operator": "=",
//            "value": $.cookie('accountingVoucherCode')
//        }
//        params.push(param);
//    }
//    
//    if($.cookie('accountingVoucherDate') != null & $.cookie('accountingVoucherDate') != 'null' && $.cookie('accountingVoucherDate') != ''){
//        param = {
//            "columnName": "voucherDate",
//            "columnPatten": "",
//            "conditionOperator": "AND",
//            "operator": "=",
//            "value": $.cookie('accountingVoucherDate')
//        }
//        params.push(param);
//    }
//    
//    if($.cookie('accountingYearMonthStartDate') != null & $.cookie('accountingYearMonthStartDate') != 'null' && $.cookie('accountingYearMonthStartDate') != ''){
//        param = {
//            "columnName": "yyyymm",
//            "columnPatten": "",
//            "conditionOperator": "AND",
//            "operator": ">=",
//            "value": $.cookie('accountingYearMonthStartDate').split('-')[0]+$.cookie('accountingYearMonthStartDate').split('-')[1]
//        }
//        params.push(param);
//    }
//    
//    if($.cookie('accountingYearMonthEndDate') != null & $.cookie('accountingYearMonthEndDate') != 'null' && $.cookie('accountingYearMonthEndDate') != ''){
//        param = {
//            "columnName": "yyyymm",
//            "columnPatten": "",
//            "conditionOperator": "AND",
//            "operator": "<=",
//            "value": $.cookie('accountingYearMonthEndDate').split('-')[0]+$.cookie('accountingYearMonthEndDate').split('-')[1]
//        }
//        params.push(param);
//    }
//    
//    if($.cookie('accountingVoucherMessIdOs') != null && $.cookie('accountingVoucherMessIdOs') != ''){
//        param = {
//            "columnName": "messIdOs",
//            "columnPatten": "",
//            "conditionOperator": "AND",
//            "operator": "=",
//            "value": $.cookie('accountingVoucherMessIdOs')
//        }
//        params.push(param);
//    }

    var map = {
        "conditionGroups": conditionGroups,
        "params": params
    }
                
    $.ajax({
        url: $.api.baseBilling+"/api/ar/letter/recode/findAllByKVCondition?page="+(p-1)+"&size="+c+"&sort=id,desc",
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
                
                $('#voucher').html('');
                if(response.data.content.length > 0){
                    var pages =  response.data.totalPages;
                    generatePages(p, pages, c);
                    
                    sessionStorage.setItem("bills", JSON.stringify(response.data.content) );
                    
                    var checked = '';
                    $("#all").prop('checked',false);
                    if($.checkBill.length > 0){
                        $(".selected").html("已选<b class='text-red'>"+$.checkBill.length+"</b>条 <a href='javascript:void(0);' onclick='javascript: disp_confirm()' class='btn btn-primary btn-sm'><i class='fa fa-cloud-download icon-white'></i> <span class='hidden-xs'>下载到本地</span></a>");
                    } else {
                        $(".selected").text("");
                    }
                    $.each(response.data.content, function(i,v){  
                        if($.checkBill && $.checkBill.length > 0 && isInArray($.checkBill,v.id) == 1) {
                            checked = ' checked';
                        } else {
                            checked = '';
                        }
                        var billStatus = '<span class="badge badge-danger">失败</span>';
                        if(v.resultCode == 'SUCCESS'){
                            billStatus = '<span class="badge badge-success">成功</span>';
                        }
                        
                        var openId = 'admin';
                        $.each(JSON.parse($.cookie('userModules')), function(i,v) {
                            if(v.roleCode == 'CROLE220301000001'){
                                openId = v.moduleName;
                                return false;
                            }
                        })
                        
                        var tbg = '#fff';
                        if(i%2==0){
                            tbg = '#f9f9f9';
                        }
                        
                        $('#bill').append('<tr>\n\
                            <td style="background: '+tbg+'; z-index: 1; border-right: solid 2px #ddd;"><input type="checkbox" class="me-1" value="'+v.id+'"'+checked+'></td>\n\
                            <td><a href="bill-detail?id='+v.id+'">查看详情</a></td>\n\
                            <td>'+v.tenantName+'['+v.tenantNo+']</td>\n\
                            <td>'+v.mallName+'['+v.mallCode+']</td>\n\
                            <td>'+billStatus+'</td>\n\
                            <td><strong class="text-red">'+accounting.formatNumber(v.amount)+'</strong></td>\n\
                            <td>'+v.yyyymm+'</td>\n\
                            <td>'+v.processDate+'</td>\n\
                            <td>'+v.paymentDate+'</td>\n\
                            <td>'+v.created+'['+(v.creatorOpenId != 'admin' ? renderUserName(v.creatorOpenId) : 'admin')+']</td>\n\
                            <td>'+v.updated+'['+(v.updateOpenId != 'admin' ? renderUserName(v.updateOpenId) : 'admin')+']</td>\n\
                        </tr>');
                    })
                    
                    $(".me-1").each(function(){
                        $(this).change(function(){
                            if($(this).is(':checked') == true) {
                                $.checkBill.push($(this).val());
                                $.cookie('checkBill',JSON.stringify($.checkBill));
                            } else {
                                var pos = $.inArray($(this).val(),$.checkBill);
                                $.checkBill.splice(pos,1);
                                $.cookie('checkBill',JSON.stringify($.checkBill));
                            }
                            if($.checkBill.length > 0){
                                $(".selected").html("已选<b class='text-red'>"+$.checkBill.length+"</b>条 <a href='javascript:void(0);' onclick='javascript: disp_confirm()' class='btn btn-primary btn-sm'><i class='fa fa-cloud-download icon-white'></i> <span class='hidden-xs'>下载到本地</span></a>");
                            } else {
                                $(".selected").text("");
                            }
                        })
                    });

                    $("#all").change(function(){
                        if($(this).is(':checked') == true) {
                            $(".me-1").each(function(i,e){
                                if($(e).is(':checked') == false && !$(e).attr('disabled')) {
                                    $(e).prop('checked',true);
                                    
                                    $.checkBill.push($(e).val());
                                    $.cookie('checkBill',JSON.stringify($.checkBill));
                                }
                            })
                        } else {
                            $(".me-1").each(function(i,e){
                                if($(e).is(':checked') == true) {
                                    $(e).prop("checked",false);

                                    var pos = $.inArray($(e).val(),$.checkBill);
                                    $.checkBill.splice(pos,1);
                                    $.cookie('checkBill',JSON.stringify($.checkBill));
                                }
                            })
                        }
                        if($.checkBill.length > 0){
                            $(".selected").html("已选<b class='text-red'>"+$.checkBill.length+"</b>条 <a href='javascript:void(0);' onclick='javascript: disp_confirm()' class='btn btn-primary btn-sm'><i class='fa fa-cloud-download icon-white'></i> <span class='hidden-xs'>下载到本地</span></a>");
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
                    $('#bill').html('<tr><td colspan="11" style="text-align: center;">没有找到任何记录！</td></tr>');
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
    })
}

function disp_confirm() {
    if($.checkBill.length > 0) {
        var r = confirm("确定要将选中的"+$.checkBill.length+"账单下载到本地吗");
        if (r == true) {
            downloadZipFile();
        }
    } else {
         alertMsg('9999','没有选中任何账单！');
    }
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

function downloadZipFile() {
    var openId = 'admin';
    $.each(JSON.parse($.cookie('userModules')), function(i,v) {
        if(v.roleCode == 'CROLE220301000001'){
            openId = v.moduleName;
            return false;
        }
    })
    
    var map = {
        "messIdOsList": $.checkBill,
        "updateOpenId": openId
    }
    
    $.ajax({
        url: $.api.baseBilling+"/api/letter/file/downloadZipFile",
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
        complete: function(){
            $.checkBill = [];
            $.cookie('checkBill','');
        },
        success: function (response, status, xhr) {
            $('#loader').hide();
            if(response.code === 'C0') {
                if(xhr.getResponseHeader("Login") !== null){
                    $.cookie('login', xhr.getResponseHeader("Login"));
                }
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                }
                
                $('#myModalLabel').text('正在生成Zip文件, 请稍后...');
                $('#submitStateModal').modal('show');
                var obj = $('#submitState');
                var countdownDownloadZipFile = $.checkBill.length * 5;
                setTimeDownloadZipFile(obj);
                function setTimeDownloadZipFile(obj) {
                    if (countdownDownloadZipFile == 0) { 
                        $('#myModalLabel,#submitState').text('');
                        $('#submitStateModal').modal('hide');
                        countdownDownloadZipFile = $.checkBill.length * 5;
                        
                        location.reload();
                        return;
                    } else { 
                        obj.html(countdownDownloadZipFile + "秒");
                        countdownDownloadZipFile--; 
                    } 
                setTimeout(function() { 
                    setTimeDownloadZipFile(obj); }
                    ,1000); 
                }
            } else {
                alertMsg(response.code,response.customerMessage);
            }
        }
    })
}