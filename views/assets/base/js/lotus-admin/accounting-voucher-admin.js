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
    if($.cookie('voucherMallVal') != null && $.cookie('voucherMallVal') != 'null'){
        var newOption = new Option($.cookie('voucherMallTxt'), $.cookie('voucherMallVal'), true, true);
        $('#department').append(newOption).trigger('change');
    }
    
//    if($.cookie('voucherContractVal') != null && $.cookie('voucherContractVal') != 'null'){
//        var newOption = new Option($.cookie('voucherContractTxt'), $.cookie('voucherContractVal'), true, true);
//        $('#selectContract').append(newOption).trigger('change');
//    }
//    
//    if($.cookie('voucherSelectTenantVal') != null && $.cookie('voucherSelectTenantVal') != 'null'){
//        var newOption = new Option($.cookie('voucherSelectTenantTxt'), $.cookie('voucherSelectTenantVal'), true, true);
//        $('#selectTenant').append(newOption).trigger('change');
//    }
//    
//    if($.cookie('voucherTermType') != null && $.cookie('voucherTermType') != 'null'){
//        $('#termType').val($.cookie('voucherTermType')).trigger('change');
//    }
//    
//    if($.cookie('voucherItemType') != null && $.cookie('voucherItemType') != 'null'){
//        $('#itemType').val($.cookie('voucherItemType')).trigger('change');
//    }
    
    if($.cookie('voucherYearMonth') != null && $.cookie('voucherYearMonth') != 'null'){
        $('#yearMonth').val($.cookie('voucherYearMonth'));
    }
    
    var items = getURLParameter('items') || $('.page-size').first().text();
    if(getURLParameter('page') && getURLParameter('page') >= 1){
        mandatoryCheck(getURLParameter('page'),items);
    } else {
        mandatoryCheck(1,items);
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
    
    $('#voucherDate').datepicker({
        'language': 'zh-CN',
        'format': 'yyyy-mm-dd',
        'todayBtn': "linked",
        'todayHighlight': true,
        'autoclose': true
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
//        $('#termType, #itemType').val('').trigger('change');
//        $('#selectContract, #selectTenant').empty(); 
//        $('#selectContract, #selectTenant').select2("val", "");
        $('#yearMonth').val('');
        
        $.cookie('voucherTermType', null);
        $.cookie('voucherItemType', null);
        $.cookie('voucherContractTxt', null);
        $.cookie('voucherContractVal', null);
        $.cookie('voucherMallTxt', null);
        $.cookie('voucherMallVal', null);
        $.cookie('voucherYearMonth', null);
//        $.cookie('voucherSelectTenantVal', null);
//        $.cookie('voucherSelectTenantTxt', null);
    })
    
    $('#search').click(function(){
        $('#totalAmount, #totalTaxAmount').text(accounting.formatNumber(0));
        $.cookie('voucherTermType', $('#termType').val());
        $.cookie('voucherContractVal', $('#selectContract').val());
        $.cookie('voucherContractTxt', $('#select2-selectContract-container').attr('title'));
        $.cookie('voucherMallVal', $('#department').val());
        $.cookie('voucherMallTxt', $('#select2-department-container').attr('title'));
        $.cookie('voucherYearMonth', $('#yearMonth').val());
        $.cookie('voucherSelectTenantVal', $('#selectTenant').val());
        $.cookie('voucherSelectTenantTxt', $('#selectTenant').text());
        $.cookie('voucherItemType', $('#itemType').val());
        $.checkVoucher = [];
        $.cookie('checkVoucher','');
        mandatoryCheck(1,items);
    })
});

function mandatoryCheck(p,c){
    $('.mandatory-error').remove();
    var flag = 1;
    var error = '<i class="fa fa-exclamation-circle mandatory-error" aria-hidden="true"></i>';
    
    if($('#department').val() == null || $('#department').val() == 'null'){
        flag = 0;
        $('#department').parent().prepend(error);
    }
    
    if(flag == 1){
        findVoucherByKVCondition(p,c);
    } else {
        $('html, body').animate({
            scrollTop: $('.mandatory-error').offset().top - 195
        }, 0);
    }
}

function findVoucherByKVCondition(p,c) {
    var params = [];
    var param = {};
    var conditionGroups = [];
    
    params = [{
        "columnName": "mallCode",
        "columnPatten": "",
        "conditionOperator": "AND",
        "operator": "=",
        "value": ($.cookie('voucherMallVal') != null ? $.cookie('voucherMallVal') : $('#department').val())
    }];
    
//    if($.cookie('voucherContractVal') != null && $.cookie('voucherContractVal') != 'null' && $.cookie('voucherContractVal') != ''){
//        params = [{
//            "columnName": "contractNo",
//            "columnPatten": "",
//            "conditionOperator": "AND",
//            "operator": "=",
//            "value": $.cookie('voucherContractVal')
//        }]
//    }
//
//    if($.cookie('voucherTermType') != null && $.cookie('voucherTermType') != 'null' && $.cookie('voucherTermType') != ''){
//        param = {
//            "columnName": "itemCode",
//            "columnPatten": "",
//            "conditionOperator": "AND",
//            "operator": "=",
//            "value": $.cookie('voucherTermType')
//        }
//        params.push(param);
//    }
//
//    if($.cookie('voucherYearMonth') != null & $.cookie('voucherYearMonth') != 'null' && $.cookie('voucherYearMonth') != ''){
//        param = {
//            "columnName": "yyyymm",
//            "columnPatten": "",
//            "conditionOperator": "AND",
//            "operator": "=",
//            "value": $.cookie('voucherYearMonth').split('-')[0]+$.cookie('voucherYearMonth').split('-')[1]
//        }
//        params.push(param);
//    }
//    
//    if($.cookie('voucherSelectTenantTxt') != null && $.cookie('voucherSelectTenantTxt') != '' && $.cookie('voucherSelectTenantTxt') != 'null'){
//        param = {
//            "columnName": "tenantCode",
//            "columnPatten": "",
//            "operator": "AND",
//            "value": $.cookie('voucherSelectTenantTxt').split(' | ')[0]
//        }
//        params.push(param);
//    }
//    
//    if($.cookie('voucherItemType') != null && $.cookie('voucherItemType') != 'null' && $.cookie('voucherItemType') != ''){
//        param = {
//            "columnName": "itemType",
//            "columnPatten": "",
//            "conditionOperator": "AND",
//            "operator": "=",
//            "value": $.cookie('voucherItemType')
//        }
//        params.push(param);
//    }

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
                            case "9":
                                voucherStatus = '<span class="badge badge-success">传凭成功</span>';
                                break;
                            default:
                                break;
                        }
                        
                        $('#voucher').append('<tr>\n\
                            <td><input type="checkbox" class="me-1" value="'+v.id+'"'+checked+'></td>\n\
                            <td><a href=\'javascript:void(0);\' onclick=\'javascript: getVoucherDetail("'+v.id+'")\'>查看详情</a></td>\n\
                            <td>'+$('#department').find('option:selected').text()+'</td>\n\
                            <td>'+voucherStatus+'</td>\n\
                            <td>'+(v.tableId!=null?'<span class="badge badge-info">常规</span>':'<span class="badge badge-danger">调整</span>')+'</td>\n\
                            <td>'+v.voucherCode+'</td>\n\
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
    
    if($("#voucherDepartment").val() != '' && $("#voucherDepartment").val() != null){
        updateVoucherStoreDropDownByMallCode(10,$("#voucherDepartment").val());
    }
    $("#voucherDepartment").on('change',function(){
        updateVoucherStoreDropDownByMallCode(10,$(this).val());
    })
    
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
    
    $('#deleteCalc, #adjustRow').hide();
    var voucher = $.parseJSON(sessionStorage.getItem("voucher"));
    $('#voucherTermType, #taxRate').val('').trigger('change');
    $('#settleDay').val('25').trigger('change');
    $('#startDate, #endDate, #voucherYearMonth, #billingDate, #taxAmount, #amount, #taxRentAmount, #rentAmount, #paymentDate').val('');
    $('#voucherStore, #voucherContract').empty(); 
    $('#voucherDepartment, #voucherStore, #voucherContract').select2("val", "");
    $('#yearMonth, #remarks').val('');
    $('.modal-header h4').find('.badge').remove();
    $('.shield').remove();
    
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
            $('#voucherDepartment').append(temp).trigger('change');
            
            temp = new Option((v.unitName +' | '+ v.area + '㎡'),v.shopCode+':::'+v.area, true, true);
            $('#voucherStore').append(temp).trigger('change');
            
            temp = new Option(v.tenantName+'['+v.contractNo+'] | '+v.brandName+' | '+v.unitName+' | '+v.startDate+'～'+v.endDate+' | V'+v.contractVersion, v.contractNo, true, true);
            $('#voucherContract').append(temp).trigger('change');
            
            $('#voucherTermType').val(v.itemCode).trigger('change');
            $('#startDate').datepicker('update', v.startDate);
            $('#endDate').datepicker('update', v.endDate);
            var voucherYearMonth = v.yyyymm.toString();
            $('#voucherYearMonth').datepicker('update', voucherYearMonth.substr(0,4)+'-'+voucherYearMonth.substr(4,2));
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

function updateVoucherContractDropDown(data_count) {
    $('#voucherContract').select2({
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

function updateVoucherStoreDropDownByMallCode(data_count,mall_code) {
    var selectStore = $('#voucherStore');
    
    selectStore.select2({
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