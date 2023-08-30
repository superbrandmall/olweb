if($.cookie('checkVoucher') &&  JSON.parse($.cookie('checkVoucher')).length > 0){
    $.checkVoucher = JSON.parse($.cookie('checkVoucher'));
} else {
    $.checkVoucher = [];
}

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

$(document).ready(function(){
    $('#accountingVoucherDate, voucherDate').datepicker({
        'language': 'zh-CN',
        'format': 'yyyy-mm-dd',
        'todayBtn': "linked",
        'todayHighlight': true,
        'autoclose': true
    });
    
    $('#accountingYearMonth').datepicker({
        'language': 'zh-CN',
        'format': 'yyyy-mm',
        'todayHighlight': true,
        'startView': 'months',
        'maxViewMode': 'years',
        'minViewMode': 'months',
        'autoclose': true
    })
    
    findGlConfig();
    
    if($.cookie('accountingVoucherMallVal') != null && $.cookie('accountingVoucherMallVal') != 'null'){
        var newOption = new Option($.cookie('accountingVoucherMallTxt'), $.cookie('accountingVoucherMallVal'), true, true);
        $('#accountingDepartment').append(newOption).trigger('change');
    }
    
    if($.cookie('accountingVoucherCode') != null && $.cookie('accountingVoucherCode') != ''){
        $('#accountingVoucherCode').val($.cookie('accountingVoucherCode'));
    }
    
    if($.cookie('accountingMessIdOs') != null && $.cookie('accountingMessIdOs') != ''){
        $('#accountingMessIdOs').val($.cookie('accountingMessIdOs'));
    }
    
    if($.cookie('accountingVoucherDate') != null && $.cookie('accountingVoucherDate') != 'null'){
        $('#accountingVoucherDate').datepicker('update',$.cookie('accountingVoucherDate'));
    }
    
    if($.cookie('accountingYearMonth') != null && $.cookie('accountingYearMonth') != 'null'){
        $('#accountingYearMonth').val($.cookie('accountingYearMonth'));
    }
    
    if($.cookie('accountingVoucherInfo') != null && $.cookie('accountingVoucherInfo') != ''){
        $('#accountingVoucherInfo').val($.cookie('accountingVoucherInfo'));
    }
    
    var items = getURLParameter('items') || $('.page-size').first().text();
    if(getURLParameter('page') && getURLParameter('page') >= 1){
        findVoucherByKVCondition(getURLParameter('page'),items);
    } else {
        findVoucherByKVCondition(1,items);
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
    
    $('input.money').on('focus',function(){
        $(this).val(accounting.unformat($(this).val()));
    });
    
    $('input.money').on('blur',function(){
        $(this).val(accounting.formatNumber($(this).val()));
    });
    
    
    $('#clear').click(function(){
        $.cookie('accountingVoucherMallTxt', null);
        $.cookie('accountingVoucherMallVal', null);
        $.cookie('accountingVoucherCode', '');
        $.cookie('accountingVoucherMessIdOs', '');
        $.cookie('accountingVoucherVoucherDate', null);
        $.cookie('accountingYearMonth', null);
        $.cookie('accountingVoucherInfo', '');
        
        $('#accountingDepartment').val('').trigger('change');
        $('#accountingVoucherCode').val('');
        $('#accountingMessIdOs').val('');
        $('#accountingVoucherDate').val('');
        $('#accountingYearMonth').val('');
        $('#accountingVoucherInfo').val('');
    })
    
    $('#search').click(function(){
        $.cookie('accountingVoucherMallVal', $('#accountingDepartment').val());
        $.cookie('accountingVoucherMallTxt', $('#select2-department-container').attr('title'));
        $.cookie('accountingVoucherCode', $('#accountingVoucherCode').val()); 
        $.cookie('accountingMessIdOs', $('#accountingMessIdOs').val());
        $.cookie('accountingVoucherDate', $('#accountingVoucherDate').val());
        $.cookie('accountingYearMonth', $('#accountingYearMonth').val());
        $.cookie('accountingVoucherInfo', $('#accountingVoucherInfo').val());
        $.checkVoucher = [];
        $.cookie('checkVoucher','');
        findVoucherByKVCondition(1,items);
    })
});

function findVoucherByKVCondition(p,c) {
    var params = [];
    var param = {};
    var conditionGroups = [];
    
    if($.cookie('accountingVoucherMallVal') != null && $.cookie('accountingVoucherMallVal') != 'null'){
        param = {
            "columnName": "mallCode",
            "columnPatten": "",
            "conditionOperator": "AND",
            "operator": "=",
            "value": ($.cookie('accountingVoucherMallVal') != null ? $.cookie('accountingVoucherMallVal') : $('#accountingDepartment').val())
        }
        params.push(param);
    }

    if($.cookie('accountingVoucherCode') != null && $.cookie('accountingVoucherCode') != ''){
        param = {
            "columnName": "voucherCode",
            "columnPatten": "",
            "conditionOperator": "AND",
            "operator": "=",
            "value": $.cookie('accountingVoucherCode')
        }
        params.push(param);
    }
    
    if($.cookie('accountingMessIdOs') != null && $.cookie('accountingMessIdOs') != ''){
        param = {
            "columnName": "messIdOs",
            "columnPatten": "",
            "conditionOperator": "AND",
            "operator": "=",
            "value": $.cookie('accountingMessIdOs')
        }
        params.push(param);
    }
    
    if($.cookie('accountingVoucherDate') != null & $.cookie('accountingVoucherDate') != 'null' && $.cookie('accountingVoucherDate') != ''){
        param = {
            "columnName": "voucherDate",
            "columnPatten": "",
            "conditionOperator": "AND",
            "operator": "=",
            "value": $.cookie('accountingVoucherDate')
        }
        params.push(param);
    }
    
    if($.cookie('accountingYearMonth') != null & $.cookie('accountingYearMonth') != 'null' && $.cookie('accountingYearMonth') != ''){
        param = {
            "columnName": "yyyymm",
            "columnPatten": "",
            "conditionOperator": "AND",
            "operator": "=",
            "value": $.cookie('accountingYearMonth').split('-')[0]+$.cookie('accountingYearMonth').split('-')[1]
        }
        params.push(param);
    }
    
    if($.cookie('accountingVoucherInfo') != null && $.cookie('accountingVoucherInfo') != ''){
        param = {
            "columnName": "voucherInfo",
            "columnPatten": "",
            "conditionOperator": "AND",
            "operator": "LIKE",
            "value": $.cookie('accountingVoucherInfo')
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
        url: $.api.baseSap+"/api/sap/voucher/findAllByKVCondition?page="+(p-1)+"&size="+c+"&sort=id,desc",
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
                    
                    sessionStorage.setItem("voucher", JSON.stringify(response.data.content) );
                    
                    var checked = '';
                    $("#all").prop('checked',false);
                    if($.checkVoucher.length > 0){
                        $("#selected").html("已选<b class='text-red'>"+$.checkVoucher.length+"</b>条 <a href='javascript:void(0); onclick='javascript: disp_confirm()' class='btn btn-primary btn-sm'><i class='fa fa-paper-plane icon-white'></i> <span class='hidden-xs'>传凭到SAP</span></a>");
                    } else {
                        $("#selected").text("");
                    }
                    $.each(response.data.content, function(i,v){  
                        if($.checkVoucher && $.checkVoucher.length > 0 && isInArray($.checkVoucher,v.id) == 1) {
                            checked = ' checked';
                        } else {
                            checked = '';
                        }
                        var voucherStatus;
                        switch (v.voucherStatus) {
                            case "1":
                                voucherStatus = '<span class="badge badge-warning">未传凭</span>';
                                break;
                            case "2":
                                voucherStatus = '<span class="badge badge-danger">传凭失败</span>';
                                break;
                            case "8":
                                voucherStatus = '<span class="badge badge-danger">传凭作废</span>';
                                break;
                            case "9":
                                voucherStatus = '<span class="badge badge-success">传凭成功</span>';
                                break;
                            default:
                                break;
                        }
                        
                        $('#voucher').append('<tr>\n\
                            <td><input type="checkbox" class="me-1" value="'+v.id+'"'+checked+'></td>\n\
                            <td><a href=\'javascript:void(0);\' onclick=\'javascript: getVoucherDetail("'+v.id+'")\'>查看详情</a></td>\n\
                            <td>'+($('#department').find('option:selected').text() != '' ? $('#department').find('option:selected').text() : $.cookie('mallSelected').split(':::')[0]+'['+$.cookie('mallSelected').split(':::')[1]+']')+'</td>\n\
                            <td>'+voucherStatus+'</td>\n\
                            <td>'+(v.tableId!=null?'<span class="badge badge-info">常规</span>':'<span class="badge badge-danger">调整</span>')+'</td>\n\
                            <td>'+(v.voucherCode || '')+'</td>\n\
                            <td>'+v.companyCode+'</td>\n\
                            <td>'+v.voucherType+'</td>\n\
                            <td>'+v.voucherDate+'</td>\n\
                            <td>'+v.voucherPostDate+'</td>\n\
                            <td>'+v.yyyymm+'</td>\n\
                            <td>'+v.messIdOs+'</td>\n\
                            <td>'+v.optionMessIdOs+'</td>\n\
                            <td>'+v.voucherInfo+'</td>\n\
                            <td>'+v.currencyCode+'</td>\n\
                        </tr>');
                    })
                    
                    $(".me-1").each(function(){
                        $(this).change(function(){
                            if($(this).is(':checked') == true) {
                                $.checkVoucher.push($(this).val());
                                $.cookie('checkVoucher',JSON.stringify($.checkVoucher));
                            } else {
                                var pos = $.inArray($(this).val(),$.checkVoucher);
                                $.checkVoucher.splice(pos,1);
                                $.cookie('checkVoucher',JSON.stringify($.checkVoucher));
                            }
                            if($.checkVoucher.length > 0){
                                $("#selected").html("已选<b class='text-red'>"+$.checkVoucher.length+"</b>条 <a href='javascript:void(0);' onclick='javascript: disp_confirm()' class='btn btn-primary btn-sm'><i class='fa fa-paper-plane icon-white'></i> <span class='hidden-xs'>传凭到SAP</span></a>");
                            } else {
                                $("#selected").text("");
                            }
                        })
                    });

                    $("#all").change(function(){
                        if($(this).is(':checked') == true) {
                            $(".me-1").each(function(i,e){
                                if($(e).is(':checked') == false) {
                                    $(e).prop('checked',true);
                                    
                                    $.checkVoucher.push($(e).val());
                                    $.cookie('checkVoucher',JSON.stringify($.checkVoucher));
                                }
                            })
                        } else {
                            $(".me-1").each(function(i,e){
                                if($(e).is(':checked') == true) {
                                    $(e).prop("checked",false);

                                    var pos = $.inArray($(e).val(),$.checkVoucher);
                                    $.checkVoucher.splice(pos,1);
                                    $.cookie('checkVoucher',JSON.stringify($.checkVoucher));
                                }
                            })
                        }
                        if($.checkVoucher.length > 0){
                            $("#selected").html("已选<b class='text-red'>"+$.checkVoucher.length+"</b>条");
                        } else {
                            $("#selected").text("");
                        }
                    })
                    
                    if(p == pages){
                        $(".pagination-info").html('显示 '+Math.ceil((p-1)*c+1)+' 到 '+response.data.totalElements+' 行，共 '+response.data.totalElements+'行');
                    } else {
                        $(".pagination-info").html('显示 '+Math.ceil((p-1)*c+1)+' 到 '+Math.ceil((p-1)*c+Number(c))+' 行，共 '+response.data.totalElements+'行');
                    }
                } else {
                    $('#voucher').html('<tr><td colspan="15" style="text-align: center;">没有找到任何记录！</td></tr>');
                }
            } else {
                alertMsg(response.code,response.customerMessage);
            }
        }
    })
}

function getVoucherDetail(id){
    $('.mandatory-error').remove();
    $('#investment-contract-voucher-create').modal('toggle');

    updateVoucherContractDropDown(50);
    
    $('.input-daterange, #voucherDate, #voucherPostDate').datepicker({
        'language': 'zh-CN',
        'format': 'yyyy-mm-dd',
        'todayBtn': "linked",
        'todayHighlight': true,
        'autoclose': true
    });
    
    $('#voucherYearMonth').datepicker({
        'language': 'zh-CN',
        'format': 'yyyy-mm',
        'todayHighlight': true,
        'startView': 'months',
        'maxViewMode': 'years',
        'minViewMode': 'months',
        'autoclose': true
    })
    
    $('#deleteVoucher, #adjustRow').hide();
    var voucher = $.parseJSON(sessionStorage.getItem("voucher"));
    $('#voucherType, #voucherTermType, #voucherTaxRate').val('').trigger('change');
    $('#voucherStartDate, #voucherEndDate, #voucherYearMonth, #voucherPostDate, #voucherTaxAmount, #voucherAmount, #voucherCode, #voucherDate, #voucherInfo').val('');
    $('#voucherDepartment, #voucherContract').empty(); 
    $('#voucherDepartment, #voucherContract').select2("val", "");
    $('.modal-header h4').find('.badge').remove();
    $('.shield').remove();
    
    updateVoucherMallDropDown();
    
    var openId = 'admin';
    $.each(JSON.parse($.cookie('userModules')), function(i,v) {
        if(v.roleCode == 'CROLE220301000001'){
            openId = v.moduleName;
            return false;
        }
    })
        
    $.each(voucher, function(i,v){
        if(v.id == id){
            var temp;
            
            if(v.tableId != null){
                temp = '<span class="badge badge-info" style="vertical-align: top; margin-right: 10px;">常规</span>';
            } else {
                temp = '<span class="badge badge-danger" style="vertical-align: top; margin-right: 10px;">调整</span>'
            }
            $('.modal-header h4').prepend(temp);
            
            switch (v.voucherStatus) {
                case "1":
                    temp = '<span class="badge badge-warning" style="vertical-align: top; margin-right: 10px;">未传凭</span>';
                    break;
                case "2":
                    temp = '<span class="badge badge-danger" style="vertical-align: top; margin-right: 10px;">传凭失败</span>';
                    break;
                case "8":
                    temp = '<span class="badge badge-danger" style="vertical-align: top; margin-right: 10px;">传凭作废</span>';
                    break;
                case "9":
                    temp = '<span class="badge badge-success" style="vertical-align: top; margin-right: 10px;">传凭成功</span>';
                    break;
                default:
                    break;
            }            
            $('.modal-header h4').prepend(temp);
            
            $('#voucherCode').val(v.voucherCode);
            $('#voucherType').val(v.voucherType).trigger('change');
            
            if(sessionStorage.getItem("lotus_malls") && sessionStorage.getItem("lotus_malls") != null && sessionStorage.getItem("lotus_malls") != '') {
                var malls = $.parseJSON(sessionStorage.getItem("lotus_malls"));
                var mallName = '';
                $.each(malls, function(j,w) {
                    if(v.mallCode == w.code){
                        mallName = w.mallName;
                        return false;
                    }
                })
            }
            
            temp = new Option(mallName+'['+v.mallCode+']',v.mallCode+':::'+v.companyCode,true,true);
            $('#voucherDepartment').append(temp).trigger('change');
            
            temp = new Option(v.tenantName + '[' + v.contractNo + '] | '+(v.brandName || '')+' | '+v.unitName+' | V'+v.contractVersion, v.contractNo, true, true);
            $('#voucherContract').append(temp).trigger('change');
            
            $('#voucherStartDate').datepicker('update', v.startDate);
            $('#voucherEndDate').datepicker('update', v.endDate);
            
            $('#voucherTermType').val(v.itemCode).trigger('change');
            $('#voucherInfo').val(v.voucherInfo);
            
            $('#voucherTaxRate').val(v.taxRate).trigger('change');
            $('#voucherAmount').val(accounting.formatNumber(v.amount));
            $('#voucherTaxAmount').val(accounting.formatNumber(v.taxAmount));
            
            $('#voucherDate').datepicker('update',v.voucherDate);
            $('#voucherPostDate').datepicker('update',v.voucherPostDate);
            
            var voucherYearMonth = v.yyyymm.toString();
            $('#voucherYearMonth').datepicker('update', voucherYearMonth.substr(0,4)+'-'+voucherYearMonth.substr(4,2));
            
            if(v.voucherItemList.length > 0){
                var rowNumberOrder = v.voucherItemList.sort(
                    function(a, b) {
                        return (a.rowNumber - b.rowNumber);
                    }
                );
                $.each(rowNumberOrder, function(i, v) {
                    createRowSapGLVoucherItem();
                });
            }

            if(v.creatorOpenId == openId && v.tableId == null && (v.voucherStatus == 1 || v.voucherStatus == 2)){
                $('#deleteVoucher, #adjustRow').show();
                
                $('#saveVoucher').click(function(){
                    saveCheck(JSON.stringify(v));
                })
                
                $('#deleteVoucher').click(function(){
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

function updateVoucherMallDropDown() {
    if(sessionStorage.getItem("lotus_malls") && sessionStorage.getItem("lotus_malls") != null && sessionStorage.getItem("lotus_malls") != '') {
        var malls = $.parseJSON(sessionStorage.getItem("lotus_malls"));
        var returnData = [];
        var data = $.map(malls, function(item) {
            if($.cookie('userModules') && $.cookie('userModules') != '' && $.cookie('userModules') != null){
                $.each(JSON.parse($.cookie('userModules')), function(j,w) {
                    if((w.roleCode == 'CROLE211008000002' || w.roleCode == 'CROLE220922000001') && w.moduleCode == 'ALL'){
                        data = {
                            id: item.code + ':::' + item.mallLotusBase.companyCode,
                            text: item.mallName + '[' + item.code + ']'                   
                        }
                        returnData.push(data);
                    } else if(w.roleCode == 'CROLE211008000001' && w.moduleName == '门店对接人') {
                        if(item.code == w.moduleCode){
                            data = {
                                id: item.code + ':::' + item.mallLotusBase.companyCode,
                                text: item.mallName + '[' + item.code + ']'                 
                            }
                            returnData.push(data);
                        }
                    }
                })
            }
                
            return returnData;
        });
        
        $('#voucherDepartment').select2({
            dropdownParent: $('#investment-contract-voucher-create'),
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

function updateVoucherContractDropDown(data_count) {
    $('#voucherContract').select2({
        dropdownParent: $('#investment-contract-voucher-create'),
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
                    key: params.term || $('#voucherDepartment').val().split(':::')[0],
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
                                id: item.contractNo + ':::' + item.sapContractNo + ':::' + item.tenantNo,
                                text: item.tenantName + '[' + item.contractNo + '] | ' + (item.brandName || '') + ' | ' + item.unitName + ' | ' + 'V'+item.contractVersion           
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
    
    if($('#voucherDepartment').val() == null) {
        flag = 0;
        $('#voucherDepartment').parent().append(error);
    }
    
    if($('#voucherContract').val() == null) {
        flag = 0;
        $('#voucherContract').parent().append(error);
    }
    
    if($('#voucherStore').val() == null) {
        flag = 0;
        $('#voucherStore').parent().append(error);
    }
    
    if($('#voucherTermType').val() == '') {
        flag = 0;
        $('#voucherTermType').parent().append(error);
    }
    
    if($('#startDate').val() == '') {
        flag = 0;
        $('#endDate').parent().append(error);
    }
    
    if($('#endDate').val() == '') {
        flag = 0;
        $('#endDate').parent().append(error);
    }
    
    if($('#voucherYearMonth').val() == '') {
        flag = 0;
        $('#voucherYearMonth').parent().append(error);
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
    Ewin.confirm({ message: "确定要保存修改该条结算数据吗？" }).on(function (e) {
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
        map.area = $('#voucherStore').val().split(':::')[1];       
        map.contractNo = $('#voucherContract').find('option:selected').val(); 
        map.contractVersion = $('#voucherContract').find('option:selected').text().split(' | ')[4].substr(1,1);
        map.endDate = $('#endDate').val();  
        map.itemCode = $('#voucherTermType').find('option:selected').val();       
        map.itemName = $('#voucherTermType').find('option:selected').text();
        map.remarks = $('#remarks').val();
        map.rentAmount = numberWithoutCommas($('#rentAmount').val());
        map.settleDay = $('#settleDay').val();      
        map.shopCode = $('#voucherStore').val().split(':::')[0];
        map.startDate = $('#startDate').val();    
        map.taxAmount = numberWithoutCommas($('#taxAmount').val());
        map.taxCode = $('#taxRate').find('option:selected').text();
        map.taxRate = parseFloat($('#taxRate').find('option:selected').val() / 100).toFixed(5),
        map.taxRentAmount = numberWithoutCommas($('#taxRentAmount').val());
        map.updateOpenId = openId;      
        map.yyyymm =  $('#voucherYearMonth').val().split('-')[0]+$('#voucherYearMonth').val().split('-')[1] ;
        
        if(map.creatorOpenId != openId || map.itemType == 'normal' || map.voucherFlag == 1){
            alertMsg('9999','常规结算数据无法修改。');
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
                    
                    window.location.href = '/lotus-admin/contract-voucher?'+(getURLParameter('page') ? 'page='+getURLParameter('page') : '')+(getURLParameter('items') ? '&items='+getURLParameter('items') : '')+'&s=succeed';
                } else {
                    alertMsg(response.code,response.customerMessage);
                }
            }
        })
    })
}

function createVoucherDetail(){
    $('.mandatory-error,.shield').remove();
    $('#investment-contract-voucher-create').modal('toggle');

    updateVoucherContractDropDown(50);
    
    if($("#voucherDepartment").val() != '' && $("#voucherDepartment").val() != null){
        updateVoucherStoreDropDownByMallCode(10,$("#voucherDepartment").val());
    }
    $("#voucherDepartment").on('change',function(){
        updateVoucherStoreDropDownByMallCode(10,$(this).val());
    })
    
    $('.input-daterange, #billingDate, #paymentDate').datepicker({
        'language': 'zh-CN',
        'format': 'yyyy-mm-dd',
        'todayBtn': "linked",
        'todayHighlight': true,
        'autoclose': true
    });
    
    $('#voucherYearMonth').datepicker({
        'language': 'zh-CN',
        'format': 'yyyy-mm',
        'todayHighlight': true,
        'startView': 'months',
        'maxViewMode': 'years',
        'minViewMode': 'months',
        'autoclose': true
    })
    
    $('#deleteCalc, #adjustRow').hide();
    $('#voucherTermType, #taxRate').val('').trigger('change');
    $('#settleDay').val('25').trigger('change');
    $('#startDate, #endDate, #voucherYearMonth, #billingDate, #taxAmount, #amount, #taxRentAmount, #rentAmount, #paymentDate').val('');
    $('#voucherStore, #voucherContract').empty(); 
    $('#voucherDepartment, #voucherStore, #voucherContract').select2("val", "");
    $('#yearMonth, #remarks').val('');
    $('.modal-header h4').find('.badge').remove();
    
    var openId = 'admin';
    $.each(JSON.parse($.cookie('userModules')), function(i,v) {
        if(v.roleCode == 'CROLE220301000001'){
            openId = v.moduleName;
            return false;
        }
    })
        
    $('#adjustRow').show();
                
    $('#saveCalc').click(function(){
        saveCheck('');
    })
}

function saveCalc() {
    Ewin.confirm({ message: "确定要保存该条凭证吗？" }).on(function (e) {
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
            "area": $('#voucherStore').val().split(':::')[1],
            "contractNo": $('#voucherContract').find('option:selected').val(),
            "contractVersion": $('#voucherContract').find('option:selected').text().split(' | ')[4].substr(1,1),
            "creatorOpenId": openId,
            "endDate": $('#endDate').val(),
            "invoiceFlag": 1,
            "isOverdueFlag": 1,
            "itemCode": $('#voucherTermType').find('option:selected').val(),       
            "itemName": $('#voucherTermType').find('option:selected').text(),
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
            "shopCode": $('#voucherStore').val().split(':::')[0],
            "startDate": $('#startDate').val(),
            "taxAmount": numberWithoutCommas($('#taxAmount').val()),
            "taxCode": $('#taxRate').find('option:selected').text(),
            "taxRate": parseFloat($('#taxRate').find('option:selected').val() / 100).toFixed(5),
            "taxRentAmount": numberWithoutCommas($('#taxRentAmount').val()),
            "yyyymm":  $('#voucherYearMonth').val().split('-')[0]+$('#voucherYearMonth').val().split('-')[1]
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
                    
                    window.location.href = '/lotus-admin/contract-voucher?'+(getURLParameter('page') ? 'page='+getURLParameter('page') : '')+(getURLParameter('items') ? '&items='+getURLParameter('items') : '')+'&s=succeed';
                } else {
                    alertMsg(response.code,response.customerMessage);
                }
            }
        })
    })
}

function disp_confirm() {
    if($.checkVoucher.length > 0) {
        var r = confirm("确定要将选中的"+$.checkVoucher.length+"条凭证传到SAP吗");
        if (r == true) {
            //传凭
        }
    } else {
         alertMsg('9999','没有选中任何凭证！');
    }
}

function findGlConfig() {
    if(!sessionStorage.getItem('glConfig') || sessionStorage.getItem('glConfig') == null || sessionStorage.getItem('glConfig') == "null" || sessionStorage.getItem('glConfig') == '') {
        $.ajax({
            url: $.api.baseSap+"/api/gl/config/findAll",
            type: "GET",
            async: false,
            dataType: "json",
            contentType: "application/json",
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
                        sessionStorage.setItem('glConfig', JSON.stringify(response.data));
                    }
                }                             
            }
        })
    }
}

function createRowSapGLVoucherItem() {
    var newrow = document.createElement("tr");
    var column1 = createRowColumn(newrow);
    var column2 = createRowColumn(newrow);
    var column3 = createRowColumn(newrow);
    var column4 = createRowColumn(newrow);
    var column5 = createRowColumn(newrow);
    var column6 = createRowColumn(newrow);
    var column7 = createRowColumn(newrow);
    var column8 = createRowColumn(newrow);
    var column9 = createRowColumn(newrow);
    var column10 = createRowColumn(newrow);
    var column11 = createRowColumn(newrow);
    
    var table = document.getElementById('voucherItem');
    var tbody = table.querySelector('tbody') || table;
    var count = tbody.getElementsByTagName('tr').length + 1;
    column1.innerText = count.toLocaleString();
    
    var select = document.createElement("select"); //Debit
    select.setAttribute("class","select2");
    select.setAttribute("id","voucherItemDebitCreditFlag_"+count.toLocaleString());
    select.options[0] = new Option('借[S]','S');
    select.options[1] = new Option('贷[H]','H');
    column2.appendChild(select);
    
    var select = document.createElement("select"); //科目
    select.setAttribute("class","select2 voucherItemTypeDropDown");
    select.setAttribute("id","voucherItemType_"+count.toLocaleString());
    column3.appendChild(select);
    
    var select = document.createElement("select"); //总账科目
    select.setAttribute("class","select2 voucherItemSubjectDropDown");
    select.setAttribute("id","voucherItemSubject_"+count.toLocaleString());
    column4.appendChild(select);
    
    column5.innerText = 'CNY'; //本币
    
    var div = document.createElement("div"); //本币金额
    div.setAttribute("class","input-group");
    var input = document.createElement("input");
    input.setAttribute("class","form-control money");
    input.setAttribute("id","voucherItemLocalAmount_"+count.toLocaleString());
    input.setAttribute("type","text");
    div.appendChild(input);
    var percent = document.createElement("span");
    percent.innerText = "元";
    percent.setAttribute("class", "input-group-addon");
    div.appendChild(percent);
    column6.appendChild(div);
    
    var div = document.createElement("div"); //文本
    var input = document.createElement("input");
    input.setAttribute("class","form-control");
    input.setAttribute("id","voucherItemTermInfo_"+count.toLocaleString());
    input.setAttribute("type","text");
    column7.appendChild(input);

    var div = document.createElement("div"); //利润中心
    var input = document.createElement("input");
    input.setAttribute("class","form-control");
    input.setAttribute("id","voucherItemProfitCenter_"+count.toLocaleString());
    input.setAttribute("type","text");
    column8.appendChild(input);
    
    var select = document.createElement("select"); //税码
    select.setAttribute("class","select2");
    select.setAttribute("id","voucherItemTaxCode_"+count.toLocaleString());
    select.options[0] = new Option('X4','X4'); //5%
    select.options[1] = new Option('X3','X3'); //6%
    select.options[2] = new Option('X8','X8'); //9%
    column9.appendChild(select);
    
    var div = document.createElement("div"); //计息逾期日期
    div.setAttribute("class","input-group");
    var input = document.createElement("input");
    input.setAttribute("class","form-control date-picker");
    input.setAttribute("id","voucherItemInterestOverDate_"+count.toLocaleString());
    input.setAttribute("type","text");
    input.setAttribute("style","width: 100%");
    input.setAttribute("readonly","");
    div.appendChild(input);
    var icon = document.createElement("i");
    icon.setAttribute("class", "fa fa-calendar");
    var span = document.createElement("span");
    span.setAttribute("class", "input-group-addon");
    span.appendChild(icon);
    div.appendChild(span);
    column10.appendChild(div);
    
    var div = document.createElement("div"); //支付逾期日期
    div.setAttribute("class","input-group");
    var input = document.createElement("input");
    input.setAttribute("class","form-control date-picker");
    input.setAttribute("id","voucherItemPaymentOverDate_"+count.toLocaleString());
    input.setAttribute("type","text");
    input.setAttribute("style","width: 100%");
    input.setAttribute("readonly","");
    div.appendChild(input);
    var icon = document.createElement("i");
    icon.setAttribute("class", "fa fa-calendar");
    var span = document.createElement("span");
    span.setAttribute("class", "input-group-addon");
    span.appendChild(icon);
    div.appendChild(span);
    column11.appendChild(div);
    
    tbody.appendChild(newrow);
    
    $('#voucherItem .select2').select2();
    
    $('#voucherItem .date-picker').datepicker({
        'language': 'zh-CN',
        'format': 'yyyy-mm-dd',
        'todayHighlight': true,
        'autoclose': true
    });
    
    $('input.money').on('focus',function(){
        $(this).val(accounting.unformat($(this).val()));
        $(this).css('backgroundColor','#fff');
        $(this).select();
        $(this).parent().parent().addClass('success');
    });
    
    $('input.money').on('blur',function(){
        $(this).val(accounting.formatNumber($(this).val()));
        $(this).css('backgroundColor','transparent');
        $(this).parent().parent().removeClass('success');
    });
}