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
        case "voucher":
            successMsg('00','传凭成功！');
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
    
    if(!sessionStorage.getItem("users") || sessionStorage.getItem("users") == null || sessionStorage.getItem("users") == '') {
        findAllUsers();
    }
    
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
    
    if($.cookie('accountingVoucherStatus') && $.cookie('accountingVoucherStatus') != ''){
        var accountingVoucherStatus = $.cookie('accountingVoucherStatus').split(',');
        if(accountingVoucherStatus.length > 1){
            $('#accountingVoucherStatus').val(accountingVoucherStatus).trigger('change');
        } else {
            $('#accountingVoucherStatus').val($.cookie('accountingVoucherStatus')).trigger('change');
        }
    }
    
    if($.cookie('accountingVoucherMallVal') != null && $.cookie('accountingVoucherMallVal') != 'null'){
        var newOption = new Option($.cookie('accountingVoucherMallTxt'), $.cookie('accountingVoucherMallVal'), true, true);
        $('#accountingDepartment').append(newOption).trigger('change');
    } else {
        $('#accountingDepartment').val('').trigger('change');
    }
    
    if($.cookie('accountingVoucherCode') != null && $.cookie('accountingVoucherCode') != ''){
        $('#accountingVoucherCode').val($.cookie('accountingVoucherCode'));
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
        $.cookie('accountingVoucherStatus','');
        $.cookie('accountingVoucherMallTxt', null);
        $.cookie('accountingVoucherMallVal', null);
        $.cookie('accountingVoucherCode', '');
        $.cookie('accountingVoucherVoucherDate', null);
        $.cookie('accountingYearMonth', null);
        $.cookie('accountingVoucherInfo', '');
        
        $('#accountingVoucherStatus, #accountingDepartment').val('').trigger('change');
        $('#accountingVoucherCode').val('');
        $('#accountingVoucherDate').val('');
        $('#accountingYearMonth').val('');
        $('#accountingVoucherInfo').val('');
    })
    
    $('#search').click(function(){
        $.cookie('accountingVoucherStatus', $('#accountingVoucherStatus').val());
        $.cookie('accountingVoucherMallVal', $('#accountingDepartment').val());
        $.cookie('accountingVoucherMallTxt', $('#accountingDepartment').find('option:selected').text());
        $.cookie('accountingVoucherCode', $('#accountingVoucherCode').val()); 
        $.cookie('accountingVoucherDate', $('#accountingVoucherDate').val());
        $.cookie('accountingYearMonth', $('#accountingYearMonth').val());
        $.cookie('accountingVoucherInfo', $('#accountingVoucherInfo').val());
        $.checkVoucher = [];
        $.cookie('checkVoucher','');
        findVoucherByKVCondition(1,items);
    })
    
    $('#voucherAmount').change(function(){
        if($('#voucherItemLocalAmount_1').length > 0){
            ($('#voucherItemLocalAmount_1').val(accounting.formatNumber(Math.abs($(this).val()))));
        }
        
        if($('#voucherTaxAmount').val() != '' && $('#voucherItemLocalAmount_3').length > 0){
            ($('#voucherItemLocalAmount_3').val(accounting.formatNumber(Math.abs($(this).val()) - Math.abs(parseFloat(numberWithoutCommas($('#voucherTaxAmount').val()))))));
        }
    })
    
    $('#voucherTaxAmount').change(function(){
        if($('#voucherItemLocalAmount_2').length > 0){
            ($('#voucherItemLocalAmount_2').val(accounting.formatNumber(Math.abs($(this).val()))));
        }
        
        if($('#voucherAmount').val() != '' && $('#voucherItemLocalAmount_3').length > 0){
            ($('#voucherItemLocalAmount_3').val(accounting.formatNumber(Math.abs(parseFloat(numberWithoutCommas($('#voucherAmount').val()))) - Math.abs($(this).val()))));
        }
    })
});

function findVoucherByKVCondition(p,c) {
    var params = [];
    var param = {};
    var conditionGroups = [];
    
    if($.cookie('accountingVoucherStatus') != null && $.cookie('accountingVoucherStatus') != ''  && $.cookie('accountingVoucherStatus').substring(0,1) != ','){
        var reg = new RegExp(",","g");
        param = {
            "columnName": "voucherStatus",
            "columnPatten": "",
            "conditionOperator": "AND",
            "operator": "in",
            "value": $.cookie('accountingVoucherStatus').replace(reg,";")
        }
        params.push(param);
    }
    
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
            "columnName": "state",
            "columnPatten": "",
            "conditionOperator": "AND",
            "operator": "=",
            "value": 1
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
                        $(".selected").html("已选<b class='text-red'>"+$.checkVoucher.length+"</b>条 <a href='javascript:void(0);' onclick='javascript: disp_confirm()' class='btn btn-primary btn-sm'><i class='fa fa-paper-plane icon-white'></i> <span class='hidden-xs'>传凭到SAP</span></a>");
                    } else {
                        $(".selected").text("");
                    }
                    $.each(response.data.content, function(i,v){  
                        if($.checkVoucher && $.checkVoucher.length > 0 && isInArray($.checkVoucher,v.messIdOs) == 1) {
                            checked = ' checked';
                        } else {
                            checked = '';
                        }
                        var voucherStatus = '', disabled = '', mallName = '';
                        switch (v.voucherStatus) {
                            case "1":
                                voucherStatus = '<span class="badge badge-warning">未传凭</span>';
                                disabled = '';
                                break;
                            case "2":
                                voucherStatus = '<span class="badge badge-danger">传凭失败</span>';
                                disabled = '';
                                break;
                            case "8":
                                voucherStatus = '<span class="badge badge-danger">传凭作废</span>';
                                disabled = ' disabled';
                                break;
                            case "9":
                                voucherStatus = '<span class="badge badge-success">传凭成功</span>';
                                disabled = ' disabled';
                                break;
                            default:
                                break;
                        }
                        
                        var openId = 'admin';
                        $.each(JSON.parse($.cookie('userModules')), function(i,v) {
                            if(v.roleCode == 'CROLE220301000001'){
                                openId = v.moduleName;
                                return false;
                            }
                        })
                        
                        if(v.creatorOpenId != 'admin' && v.creatorOpenId != openId){
                            disabled = ' disabled';
                        }
                        
                        if(sessionStorage.getItem("lotus_malls") && sessionStorage.getItem("lotus_malls") != null && sessionStorage.getItem("lotus_malls") != '') {
                            var malls = $.parseJSON(sessionStorage.getItem("lotus_malls"));
                            $.each(malls, function(j,w) {
                                if(v.mallCode == w.code){
                                    mallName = w.mallName;
                                    return false;
                                }
                            })
                        }
                        
                        $('#voucher').append('<tr>\n\
                            <td><input type="checkbox" class="me-1" value="'+v.messIdOs+'"'+checked+disabled+'></td>\n\
                            <td><a href=\'javascript:void(0);\' onclick=\'javascript: getVoucherDetail("'+v.messIdOs+'")\'>'+v.voucherCode+'</a></td>\n\
                            <td>'+voucherStatus+'</td>\n\
                            <td>'+(v.tableId!=null?'<span class="badge badge-info">常规</span>':'<span class="badge badge-danger">调整</span>')+'</td>\n\
                            <td>'+mallName+'['+v.mallCode+']</td>\n\
                            <td>'+v.brandName+'['+v.sapContractNo+']</td>\n\
                            <td>'+v.contractNo+'</td>\n\
                            <td>'+v.unitName+'</td>\n\
                            <td>'+v.tenantName+'['+v.tenantNo+']</td>\n\
                            <td>'+v.voucherDate+'</td>\n\
                            <td><strong>'+accounting.formatNumber(v.amount)+'</strong></td>\n\
                            <td>'+accounting.formatNumber(v.taxAmount)+'</td>\n\
                            <td>'+v.yyyymm+'</td>\n\
                            <td>'+v.created+'['+(v.creatorOpenId != 'admin' ? renderUserName(v.creatorOpenId) : 'admin')+']</td>\n\
                            <td>'+v.updated+'['+(v.updateOpenId != 'admin' ? renderUserName(v.updateOpenId) : 'admin')+']</td>\n\
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
                                $(".selected").html("已选<b class='text-red'>"+$.checkVoucher.length+"</b>条 <a href='javascript:void(0);' onclick='javascript: disp_confirm()' class='btn btn-primary btn-sm'><i class='fa fa-paper-plane icon-white'></i> <span class='hidden-xs'>传凭到SAP</span></a>");
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
                            $(".selected").html("已选<b class='text-red'>"+$.checkVoucher.length+"</b>条 <a href='javascript:void(0);' onclick='javascript: disp_confirm()' class='btn btn-primary btn-sm'><i class='fa fa-paper-plane icon-white'></i> <span class='hidden-xs'>传凭到SAP</span></a>");
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
                    $('#voucher').html('<tr><td colspan="15" style="text-align: center;">没有找到任何记录！</td></tr>');
                }
            } else {
                alertMsg(response.code,response.customerMessage);
            }
        }
    })
}

function getVoucherDetail(messIdOs){
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
    $('#voucherUpdated').text('');
    $('#voucherStartDate, #voucherEndDate, #voucherYearMonth, #voucherPostDate, #voucherTaxAmount, #voucherAmount, #voucherCode, #voucherDate, #voucherInfo').val('');
    $('#voucherDepartment, #voucherContract').empty(); 
    $('#voucherDepartment, #voucherContract').select2("val", "");
    $('#voucherDepartment, #voucherContract, #writeOffVoucherFlag').attr("disabled", 'disabled');
    $('.modal-header h4').find('.badge').remove();
    $('.shield').remove();
    
    updateVoucherMallDropDown();
        
    $.each(voucher, function(i,v){
        if(v.messIdOs == messIdOs){
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
            
            $('#voucherUpdated').text('最近更新：  '+v.updated+'['+(v.updateOpenId != 'admin' ? renderUserName(v.updateOpenId) : 'admin')+']');
            
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
            
            temp = new Option(v.tenantName + '[' + v.contractNo + '] | '+(v.brandName || '')+' | '+v.unitName+' | V'+v.contractVersion, v.contractNo + ':::' + v.sapContractNo + ':::' + v.tenantNo, true, true);
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
            
            $('#voucherItem tbody').html('');
            if(v.voucherItemList.length > 0){
                var rowNumberOrder = v.voucherItemList.sort(
                    function(a, b) {
                        return (a.rowNumber - b.rowNumber);
                    }
                );
                $.each(rowNumberOrder, function(j, w) {
                    updateRowSapGLVoucherItem(v.itemCode, JSON.stringify(w));
                });
            }
            
            var openId = 'admin';
            $.each(JSON.parse($.cookie('userModules')), function(i,v) {
                if(v.roleCode == 'CROLE220301000001'){
                    openId = v.moduleName;
                    return false;
                }
            })

            if(v.creatorOpenId == openId && v.tableId == null && (v.voucherStatus == 1 || v.voucherStatus == 2)){
                $('#deleteVoucher, #adjustRow').show();
                
                $('#saveVoucher').click(function(){
                    saveCheck(JSON.stringify(v));
                })
                
                $('#deleteVoucher').click(function(){
                    deleteVoucher(JSON.stringify(v));
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
    
    if($('#voucherType').val() == '') {
        flag = 0;
        $('#voucherType').parent().append(error);
    }
    
    if($('#voucherDepartment').val() == null) {
        flag = 0;
        $('#voucherDepartment').parent().append(error);
    }
    
    if($('#voucherContract').val() == null) {
        flag = 0;
        $('#voucherContract').parent().append(error);
    }
    
    if($('#voucherTermType').val() == '') {
        flag = 0;
        $('#voucherTermType').parent().append(error);
    }
    
    if($('#voucherStartDate').val() == '') {
        flag = 0;
        $('#voucherEndDate').parent().append(error);
    }
    
    if($('#voucherEndDate').val() == '') {
        flag = 0;
        $('#voucherEndDate').parent().append(error);
    }
    
    if($('#voucherTaxRate').val() == '') {
        flag = 0;
        $('#voucherTaxRate').parent().append(error);
    }
    
    if($('#voucherAmount').val() == '') {
        flag = 0;
        $('#voucherAmount').parent().append(error);
    }
    
    if($('#voucherTaxAmount').val() == '') {
        flag = 0;
        $('#voucherTaxAmount').parent().append(error);
    }
    
    if($('#voucherDate').val() == '') {
        flag = 0;
        $('#voucherDate').parent().append(error);
    }
    
    if($('#voucherPostDate').val() == '') {
        flag = 0;
        $('#voucherPostDate').parent().append(error);
    }
    
    if($('#voucherYearMonth').val() == '') {
        flag = 0;
        $('#voucherYearMonth').parent().append(error);
    }
    
    if($("#writeOffVoucherFlag").is(':checked')) {
        if(parseFloat($('#voucherAmount').val()) >= 0 ) {
            flag = 0;
            $('#voucherAmount').parent().append(error);
        }
        
        if(parseFloat($('#voucherTaxAmount').val()) >= 0 ) {
            flag = 0;
            $('#voucherTaxAmount').parent().append(error);
        }
    }
    
    if($('#voucherItem tbody tr').length == 0) {
        flag = 0;
        $('#voucherItem').parent().append(error);
    }
    
    var index = 0;
    $("#voucherItem tbody").find("tr").each(function(i,e){
        index = i * 1 + 1;
        
        if($('#voucherItemDebitCreditFlag_'+index).val() == null) {
            flag = 0;
            $('#voucherItemDebitCreditFlag_'+index).parent().append(error);
        }
        
        if($('#voucherItemSubject_'+index).val() == null) {
            flag = 0;
            $('#voucherItemSubject_'+index).parent().append(error);
        }
        
        if($('#voucherItemLocalAmount_'+index).val() == '') {
            flag = 0;
            $('#voucherItemLocalAmount_'+index).parent().append(error);
        }
        
        if($('#voucherItemInterestOverDate_'+index).val() == '') {
            flag = 0;
            $('#voucherItemInterestOverDate_'+index).parent().append(error);
        }
        
        if($('#voucherItemPaymentOverDate_'+index).val() == '') {
            flag = 0;
            $('#voucherItemPaymentOverDate_'+index).parent().append(error);
        }
    })
    
    if(flag == 1 && $('.mandatory-error').length == 0){
        if(v == ''){
            saveVoucher();
        } else {
            editVoucher(v);
        }
    } else {
        $('html, body').animate({
            scrollTop: $('.mandatory-error').offset().top - 195
        }, 0);
    }
}

function editVoucher(voucher) {
    Ewin.confirm({ message: "确定要修改该条凭证吗？" }).on(function (e) {
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
        
        var map = JSON.parse(voucher);
        if(map.creatorOpenId != openId){
            alertMsg('9999','非本人不能操作。');
            return false;
        } else if(map.tableId != null){
            alertMsg('9999','常规凭证不能修改。');
            return false;
        } else if(map.voucherStatus == '8'){
            alertMsg('9999','已作废凭证不能修改。');
            return false;
        } else if(map.voucherStatus == '9'){
            alertMsg('9999','已传凭凭证不能修改。');
            return false;
        }
        
        var writeOffVoucherFlag = 0;
        if($('#writeOffVoucherFlag').prop('checked') == true){
            writeOffVoucherFlag = 1;
        }
        
        var transactionType = null;
        var configs  = JSON.parse(sessionStorage.getItem("glConfig"));
        if(configs.length > 0){
            $.each(configs, function(i,v) {
                if(v.itemCode == $('#voucherTermType').val()){
                    transactionType = v.transactionType
                    return false;
                }            
            })
        }
        
        var index;
        var voucherItemList = map.voucherItemList;
        $("#voucherItem tbody").find("tr").each(function(i,e){
            index = i * 1 + 1;
            voucherItemList[i].accountPeriod = $('#voucherYearMonth').val().split('-')[0]+$('#voucherYearMonth').val().split('-')[1];
            voucherItemList[i].companyCode = $('#voucherDepartment').find('option:selected').val().split(':::')[1];
            voucherItemList[i].creatorOpenId = openId;
            voucherItemList[i].debitCreditFlag = $('#voucherItemDebitCreditFlag_'+index).val();
            voucherItemList[i].interestOverDate = $('#voucherItemInterestOverDate_'+index).val();
            voucherItemList[i].localAmount = numberWithoutCommas($('#voucherItemLocalAmount_'+index).val());
            voucherItemList[i].localCurrencyCode = 'CNY';
            voucherItemList[i].originalAmount = numberWithoutCommas($('#voucherItemLocalAmount_'+index).val());
            voucherItemList[i].originalCurrencyCode = 'CNY';
            voucherItemList[i].paymentOverDate = $('#voucherItemPaymentOverDate_'+index).val();
            voucherItemList[i].rowNumber = index;
            voucherItemList[i].sapContractNo = $('#voucherContract').val().split(':::')[1];
            voucherItemList[i].sapMallCode = $('#voucherDepartment').find('option:selected').val().split(':::')[0].replace("SC","0");
            voucherItemList[i].subjectCode = $('#voucherItemSubject_'+index).val() ;
            voucherItemList[i].taxCode = $('#voucherItemTaxCode_'+index).val();
            voucherItemList[i].tenantNo = $('#voucherContract').val().split(':::')[2];
            voucherItemList[i].termInfo = $('#voucherInfo').val();
            voucherItemList[i].transactionType = ($('#voucherItemSubject_'+index).val().substr(0,2) == '60' ? transactionType : null);
            voucherItemList[i].updateOpenId = openId;
        })
        
        map.accountMonth = $('#voucherYearMonth').val().split('-')[1].substr(0,1) == '0' ? $('#voucherYearMonth').val().split('-')[1].substr(1,1) : $('#voucherYearMonth').val().split('-')[1];
        map.accountYear = $('#voucherYearMonth').val().split('-')[0];
        map.amount = numberWithoutCommas($('#voucherAmount').val());
        map.brandName = $('#voucherContract').find('option:selected').text().split(' | ')[1];
        map.companyCode = $('#voucherDepartment').find('option:selected').val().split(':::')[1];
        map.contractNo = $('#voucherContract').val().split(':::')[0];
        map.contractVersion = $('#voucherContract').find('option:selected').text().split(' | ')[3].substr(1,1);
        map.currencyCode = "CNY";
        map.endDate = $('#voucherEndDate').val();
        map.itemCode = $('#voucherTermType').val();
        map.itemName = $('#voucherTermType').find('option:selected').text().split('[')[0];
        map.localCurrencyCode = "CNY";
        map.mallCode = $('#voucherDepartment').find('option:selected').val().split(':::')[0];
        map.sapContractNo = $('#voucherContract').val().split(':::')[1];
        map.startDate = $('#voucherStartDate').val();
        map.taxAmount = numberWithoutCommas($('#voucherTaxAmount').val());
        map.taxRate = $('#voucherTaxRate').find('option:selected').val();
        map.tenantName = $('#voucherContract').find('option:selected').text().split(' | ')[0].split('[')[0];
        map.tenantNo = $('#voucherContract').val().split(':::')[2];
        map.transactionType = transactionType;
        map.unitName = $('#voucherContract').find('option:selected').text().split(' | ')[2];
        map.updateOpenId = openId;
        map.voucherDate = $('#voucherDate').val();
        map.voucherInfo = $('#voucherInfo').val();
        map.voucherItemList = voucherItemList;
        map.voucherPostDate = $('#voucherPostDate').val();
        map.voucherStatus = 1;
        map.voucherType = $('#voucherType').val();
        map.writeOffVoucherFlag = writeOffVoucherFlag;
        map.yyyymm = $('#voucherYearMonth').val().split('-')[0]+$('#voucherYearMonth').val().split('-')[1];
        
        $.ajax({
            url: $.api.baseSap+"/api/sap/voucher/saveOrUpdate",
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
                    
                    window.location.href = '/lotus-admin/accounting-voucher?'+(getURLParameter('page') ? 'page='+getURLParameter('page') : '')+(getURLParameter('items') ? '&items='+getURLParameter('items') : '')+'&s=succeed';
                } else {
                    alertMsg(response.code,response.customerMessage);
                }
            }
        })
    })
}

function createVoucherDetail(){
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
    $('#voucherType, #voucherTermType, #voucherTaxRate').val('').trigger('change');
    $('#voucherStartDate, #voucherEndDate, #voucherYearMonth, #voucherPostDate, #voucherTaxAmount, #voucherAmount, #voucherCode, #voucherDate, #voucherInfo').val('');
    $('#voucherDepartment, #voucherContract').empty(); 
    $('#voucherDepartment, #voucherContract').select2("val", "");
    $('#voucherDepartment, #voucherContract, #writeOffVoucherFlag').attr("disabled", false);
    $('#voucherItem tbody').html('');
    $('.modal-header h4').find('.badge').remove();
    $('.shield').remove();
    
    updateVoucherMallDropDown();
    
    $("#voucherTermType, #voucherTaxRate, #writeOffVoucherFlag").on('change',function(){
        if($("#voucherTermType").val() != '' && $("#voucherTaxRate").val() != ''){
            var taxCode;
            switch ($("#voucherTaxRate").val()) {
                case "9":
                    taxCode = "X8";
                    break;
                case "6":
                    taxCode = "X3";
                    break;
                case "5":
                    taxCode = "X4";
                    break;
                default:
                    taxCode = "";
                    break;
            }
            
            var itemList = [];
            switch ($("#voucherTermType").val()) {
                case "B011": //"B011": 固定租金 租金
                case "D011": //"D011": 浮动租金 租金
                    itemList = [{
                           "rowNumber": "1",
                           "subjectCode": "1122001000",
                           "debitCreditFlag": ($("#writeOffVoucherFlag").is(':not(:checked)') ? "S" : "H"),
                           "localAmount": Math.abs(numberWithoutCommas($('#voucherAmount').val())),
                           "taxCode": taxCode,
                           "interestOverDate": "",
                           "paymentOverDate": ""
                        },{
                           "rowNumber": "2",
                           "subjectCode": "6001000000",
                           "debitCreditFlag": ($("#writeOffVoucherFlag").is(':not(:checked)') ? "H" : "S"),
                           "localAmount": Math.abs(numberWithoutCommas($('#voucherTaxAmount').val())),
                           "taxCode": taxCode,
                           "interestOverDate": "",
                           "paymentOverDate": ""
                        },{
                           "rowNumber": "3",
                           "subjectCode": "2221001005",
                           "debitCreditFlag": ($("#writeOffVoucherFlag").is(':not(:checked)') ? "H" : "S"),
                           "localAmount": (parseFloat(Math.abs(numberWithoutCommas($('#voucherAmount').val())) - Math.abs(numberWithoutCommas($('#voucherTaxAmount').val())))).toFixed(2),
                           "taxCode": taxCode,
                           "interestOverDate": "",
                           "paymentOverDate": ""
                        }
                    ];
                    break;
                case "B021":    //"B021": 物业管理费 服务费A
                case "Y021":    //"Y021": 物业管理费-年度 服务费A
                case "G011":    //"G011": 推广费 服务费A
                    itemList = [{
                           "rowNumber": "1",
                           "subjectCode": "1122001000",
                           "debitCreditFlag": ($("#writeOffVoucherFlag").is(':not(:checked)') ? "H" : "S"),
                           "localAmount": Math.abs(numberWithoutCommas($('#voucherAmount').val())),
                           "taxCode": taxCode,
                           "interestOverDate": "",
                           "paymentOverDate": ""
                        },{
                           "rowNumber": "2",
                           "subjectCode": "6001000000",
                           "debitCreditFlag": ($("#writeOffVoucherFlag").is(':not(:checked)') ? "S" : "H"),
                           "localAmount": Math.abs(numberWithoutCommas($('#voucherTaxAmount').val())),
                           "taxCode": taxCode,
                           "interestOverDate": "",
                           "paymentOverDate": ""
                        },{
                           "rowNumber": "3",
                           "subjectCode": "2221001005",
                           "debitCreditFlag": ($("#writeOffVoucherFlag").is(':not(:checked)') ? "S" : "H"),
                           "localAmount": (parseFloat(Math.abs(numberWithoutCommas($('#voucherAmount').val())) - Math.abs(numberWithoutCommas($('#voucherTaxAmount').val())))).toFixed(2),
                           "taxCode": taxCode,
                           "interestOverDate": "",
                           "paymentOverDate": ""
                        }
                    ];
                    break;
                case ("E02" || "E03" || "E22"):   //"E02": 租赁保证金 押金 "E03": 装修保证金 押金 "E22": //公共事业费押金 押金
                    itemList = [{
                           "rowNumber": "1",
                           "subjectCode": "1221999001",
                           "debitCreditFlag": ($("#writeOffVoucherFlag").is(':not(:checked)') ? "S" : "H"),
                           "localAmount": Math.abs(numberWithoutCommas($('#voucherAmount').val())),
                           "taxCode": taxCode,
                           "interestOverDate": "",
                           "paymentOverDate": ""
                        },{
                           "rowNumber": "2",
                           "subjectCode": "2241003001",
                           "debitCreditFlag": ($("#writeOffVoucherFlag").is(':not(:checked)') ? "H" : "S"),
                           "localAmount": Math.abs(numberWithoutCommas($('#voucherTaxAmount').val())),
                           "taxCode": taxCode,
                           "interestOverDate": "",
                           "paymentOverDate": ""
                        }
                    ];
                    break;
                case "H01": //水费 水费
                    itemList = [{
                           "rowNumber": "1",
                           "subjectCode": "1122001000",
                           "debitCreditFlag": ($("#writeOffVoucherFlag").is(':not(:checked)') ? "S" : "H"),
                           "localAmount": Math.abs(numberWithoutCommas($('#voucherAmount').val())),
                           "taxCode": taxCode,
                           "interestOverDate": "",
                           "paymentOverDate": ""
                        },{
                           "rowNumber": "2",
                           "subjectCode": "6000009001",
                           "debitCreditFlag": ($("#writeOffVoucherFlag").is(':not(:checked)') ? "H" : "S"),
                           "localAmount": Math.abs(numberWithoutCommas($('#voucherTaxAmount').val())),
                           "taxCode": taxCode,
                           "interestOverDate": "",
                           "paymentOverDate": ""
                        }
                    ];
                    break;
                case "H02": //电费 电费
                    itemList = [{
                           "rowNumber": "1",
                           "subjectCode": "1122001000",
                           "debitCreditFlag": ($("#writeOffVoucherFlag").is(':not(:checked)') ? "S" : "H"),
                           "localAmount": Math.abs(numberWithoutCommas($('#voucherAmount').val())),
                           "taxCode": taxCode,
                           "interestOverDate": "",
                           "paymentOverDate": ""
                        },{
                           "rowNumber": "2",
                           "subjectCode": "6000009002",
                           "debitCreditFlag": ($("#writeOffVoucherFlag").is(':not(:checked)') ? "H" : "S"),
                           "localAmount": Math.abs(numberWithoutCommas($('#voucherTaxAmount').val())),
                           "originalAmount": "",
                           "taxCode": taxCode,
                           "interestOverDate": "",
                           "paymentOverDate": ""
                        }
                    ];
                    break;
                case "H03": //煤气费 煤费
                    itemList = [{
                           "rowNumber": "1",
                           "subjectCode": "1122001000",
                           "debitCreditFlag": ($("#writeOffVoucherFlag").is(':not(:checked)') ? "S" : "H"),
                           "localAmount": Math.abs(numberWithoutCommas($('#voucherAmount').val())),
                           "taxCode": taxCode,
                           "interestOverDate": "",
                           "paymentOverDate": ""
                        },{
                           "rowNumber": "2",
                           "subjectCode": "6000006007",
                           "debitCreditFlag": ($("#writeOffVoucherFlag").is(':not(:checked)') ? "H" : "S"),
                           "localAmount": Math.abs(numberWithoutCommas($('#voucherTaxAmount').val())),
                           "taxCode": taxCode,
                           "interestOverDate": "",
                           "paymentOverDate": ""
                        }
                    ];
                    break;
                case "Y77": //服务费-线损费 服务费B
                    itemList = [{
                           "rowNumber": "1",
                           "subjectCode": "1122001000",
                           "debitCreditFlag": ($("#writeOffVoucherFlag").is(':not(:checked)') ? "S" : "H"),
                           "localAmount": Math.abs(numberWithoutCommas($('#voucherAmount').val())),
                           "taxCode": taxCode,
                           "interestOverDate": "",
                           "paymentOverDate": ""
                        },{
                           "rowNumber": "2",
                           "subjectCode": "6051888000",
                           "debitCreditFlag": ($("#writeOffVoucherFlag").is(':not(:checked)') ? "H" : "S"),
                           "localAmount": Math.abs(numberWithoutCommas($('#voucherTaxAmount').val())),
                           "taxCode": taxCode,
                           "interestOverDate": "",
                           "paymentOverDate": ""
                        },{
                           "rowNumber": "3",
                           "subjectCode": "2221001005",
                           "debitCreditFlag": ($("#writeOffVoucherFlag").is(':not(:checked)') ? "H" : "S"),
                           "localAmount": (parseFloat(Math.abs(numberWithoutCommas($('#voucherAmount').val())) - Math.abs(numberWithoutCommas($('#voucherTaxAmount').val())))).toFixed(2),
                           "taxCode": taxCode,
                           "interestOverDate": "",
                           "paymentOverDate": ""
                        }
                    ];
                    break;
                default:
                    break;
            }
            $('#voucherItem tbody').html('');
            for(var i=0;i<itemList.length;i++){
                updateRowSapGLVoucherItem($("#voucherTermType").val(), JSON.stringify(itemList[i]));
            }
        }
    })
    
    $('#adjustRow').show();
                
    $('#saveVoucher').click(function(){
        saveCheck('');
    })
}

function saveVoucher() {
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
        
        var writeOffVoucherFlag = 0;
        if($('#writeOffVoucherFlag').prop('checked') == true){
            writeOffVoucherFlag = 1;
        }
        
        var transactionType = null;
        var configs  = JSON.parse(sessionStorage.getItem("glConfig"));
        if(configs.length > 0){
            $.each(configs, function(i,v) {
                if(v.itemCode == $('#voucherTermType').val()){
                    transactionType = v.transactionType
                    return false;
                }            
            })
        }
        
        var index;
        var voucherItemList = [];
        $("#voucherItem tbody").find("tr").each(function(i,e){
            var voucherItem = {};
            index = i * 1 + 1;
            
            voucherItem.accountPeriod = $('#voucherYearMonth').val().split('-')[0]+$('#voucherYearMonth').val().split('-')[1];
            voucherItem.companyCode = $('#voucherDepartment').find('option:selected').val().split(':::')[1];
            voucherItem.creatorOpenId = openId;
            voucherItem.debitCreditFlag = $('#voucherItemDebitCreditFlag_'+index).val();
            voucherItem.interestOverDate = $('#voucherItemInterestOverDate_'+index).val();
            voucherItem.localAmount = numberWithoutCommas($('#voucherItemLocalAmount_'+index).val());
            voucherItem.localCurrencyCode = 'CNY';
            voucherItem.originalAmount = numberWithoutCommas($('#voucherItemLocalAmount_'+index).val());
            voucherItem.originalCurrencyCode = 'CNY';
            voucherItem.paymentOverDate = $('#voucherItemPaymentOverDate_'+index).val();
            voucherItem.rowNumber = index;
            voucherItem.sapContractNo = $('#voucherContract').val().split(':::')[1];
            voucherItem.sapMallCode = $('#voucherDepartment').find('option:selected').val().split(':::')[0].replace("SC","0");
            voucherItem.subjectCode = $('#voucherItemSubject_'+index).val() ;
            voucherItem.taxCode = $('#voucherItemTaxCode_'+index).val();
            voucherItem.tenantNo = $('#voucherContract').val().split(':::')[2];
            voucherItem.termInfo = $('#voucherInfo').val();
            voucherItem.transactionType = ($('#voucherItemSubject_'+index).val().substr(0,2) == '60' ? transactionType : null);
            voucherItem.updateOpenId = openId;
            voucherItemList.push(voucherItem);
        })
        
        var map = {
            "accountMonth": $('#voucherYearMonth').val().split('-')[1].substr(0,1) == '0' ? $('#voucherYearMonth').val().split('-')[1].substr(1,1) : $('#voucherYearMonth').val().split('-')[1],
            "accountYear": $('#voucherYearMonth').val().split('-')[0],
            "amount": numberWithoutCommas($('#voucherAmount').val()),
            "brandName": $('#voucherContract').find('option:selected').text().split(' | ')[1],
            "companyCode": $('#voucherDepartment').find('option:selected').val().split(':::')[1],
            "contractNo": $('#voucherContract').val().split(':::')[0],
            "contractVersion": $('#voucherContract').find('option:selected').text().split(' | ')[3].substr(1,1),
            "creatorOpenId": openId,
            "currencyCode": "CNY",
            "endDate": $('#voucherEndDate').val(),
            "itemCode": $('#voucherTermType').val(),
            "itemName": $('#voucherTermType').find('option:selected').text().split('[')[0],
            "localCurrencyCode": "CNY",
            "mallCode": $('#voucherDepartment').find('option:selected').val().split(':::')[0],
            "sapContractNo": $('#voucherContract').val().split(':::')[1],
            "startDate": $('#voucherStartDate').val(),
            "taxAmount": numberWithoutCommas($('#voucherTaxAmount').val()),
            "taxRate": $('#voucherTaxRate').find('option:selected').val(),
            "tenantName": $('#voucherContract').find('option:selected').text().split(' | ')[0].split('[')[0],
            "tenantNo": $('#voucherContract').val().split(':::')[2],
            "transactionType": transactionType,
            "unitName": $('#voucherContract').find('option:selected').text().split(' | ')[2],
            "updateOpenId": openId,
            "voucherDate": $('#voucherDate').val(),
            "voucherInfo": $('#voucherInfo').val(),
            "voucherItemList": voucherItemList,
            "voucherPostDate": $('#voucherPostDate').val(),
            "voucherStatus": 1,
            "voucherType": $('#voucherType').val(),
            "writeOffVoucherFlag": writeOffVoucherFlag,
            "yyyymm": $('#voucherYearMonth').val().split('-')[0]+$('#voucherYearMonth').val().split('-')[1]
        }
        
        $.ajax({
            url: $.api.baseSap+"/api/sap/voucher/saveOrUpdate",
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
                    
                    window.location.href = '/lotus-admin/accounting-voucher?'+(getURLParameter('page') ? 'page='+getURLParameter('page') : '')+(getURLParameter('items') ? '&items='+getURLParameter('items') : '')+'&s=succeed';
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
            writeVoucherListToSap();
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

function updateRowSapGLVoucherItem(ic, v) {
    var value = JSON.parse(v);
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
    
    var table = document.getElementById('voucherItem');
    var tbody = table.querySelector('tbody') || table;
    var count = tbody.getElementsByTagName('tr').length + 1;
    column1.innerText = count.toLocaleString();
    
    var select = document.createElement("select"); //Debit
    select.setAttribute("class","select2");
    select.setAttribute("id","voucherItemDebitCreditFlag_"+count.toLocaleString());
    select.options[0] = new Option('借[S]','S');
    select.options[1] = new Option('贷[H]','H');
    for (var i = 0;i < select.options.length; i++){  
    if (select.options[i].value == value.debitCreditFlag) {                
        select.options[i].selected = true;            
    }}
    column2.appendChild(select);
    
    var select = document.createElement("select"); //总账科目
    select.setAttribute("class","select2 voucherItemSubjectDropDown new");
    select.setAttribute("id","voucherItemSubject_"+count.toLocaleString());
    column3.appendChild(select);
    
    column4.innerText = 'CNY'; //本币
    
    var div = document.createElement("div"); //本币金额
    div.setAttribute("class","input-group");
    var input = document.createElement("input");
    input.setAttribute("class","form-control money");
    input.setAttribute("id","voucherItemLocalAmount_"+count.toLocaleString());
    input.setAttribute("type","text");
    input.setAttribute("style","background: #eee; border: none;");
    input.setAttribute("disabled","disabled");
    input.setAttribute("value",value.localAmount);
    div.appendChild(input);
    var percent = document.createElement("span");
    percent.innerText = "元";
    percent.setAttribute("class", "input-group-addon");
    div.appendChild(percent);
    column5.appendChild(div);

    var input = document.createElement("input"); //利润中心
    input.setAttribute("class","form-control");
    input.setAttribute("id","voucherItemProfitCenter_"+count.toLocaleString());
    input.setAttribute("type","text");
    input.setAttribute("style","background: #eee; border: none;");
    input.setAttribute("disabled","disabled");
    input.setAttribute("value",(value.profitCenter || '') );
    column6.appendChild(input);
    
    var select = document.createElement("select"); //税码
    select.setAttribute("class","select2");
    select.setAttribute("id","voucherItemTaxCode_"+count.toLocaleString());
    select.options[0] = new Option('未选择','');
    select.options[1] = new Option('X4','X4'); //5%
    select.options[2] = new Option('X3','X3'); //6%
    select.options[3] = new Option('X8','X8'); //9%
    for (var i = 0;i < select.options.length; i++){  
    if (select.options[i].value == value.taxCode) {                
        select.options[i].selected = true;            
    }}
    column7.appendChild(select);
    
    var div = document.createElement("div"); //计息逾期日期
    div.setAttribute("class","input-group");
    var input = document.createElement("input");
    input.setAttribute("class","form-control date-picker");
    input.setAttribute("id","voucherItemInterestOverDate_"+count.toLocaleString());
    input.setAttribute("type","text");
    input.setAttribute("style","width: 100%");
    input.setAttribute("readonly","");
    input.setAttribute("value",value.interestOverDate);
    div.appendChild(input);
    var icon = document.createElement("i");
    icon.setAttribute("class", "fa fa-calendar");
    var span = document.createElement("span");
    span.setAttribute("class", "input-group-addon");
    span.appendChild(icon);
    div.appendChild(span);
    column8.appendChild(div);
    
    var div = document.createElement("div"); //支付逾期日期
    div.setAttribute("class","input-group");
    var input = document.createElement("input");
    input.setAttribute("class","form-control date-picker");
    input.setAttribute("id","voucherItemPaymentOverDate_"+count.toLocaleString());
    input.setAttribute("type","text");
    input.setAttribute("style","width: 100%");
    input.setAttribute("readonly","");
    input.setAttribute("value",value.paymentOverDate);
    div.appendChild(input);
    var icon = document.createElement("i");
    icon.setAttribute("class", "fa fa-calendar");
    var span = document.createElement("span");
    span.setAttribute("class", "input-group-addon");
    span.appendChild(icon);
    div.appendChild(span);
    column9.appendChild(div);
    
    tbody.appendChild(newrow);
    updateVoucherItemSubjectItems('voucherItemSubjectDropDown',ic,value.subjectCode);
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

function updateVoucherItemSubjectItems(dropDown,itemCode,value) {
    var configs  = JSON.parse(sessionStorage.getItem("glConfig"));
    if(configs.length > 0){
        $.each(configs, function(i,v) {
            if(v.itemCode == itemCode){
                $('.'+dropDown+'.new').append('\
                    <option value="'+v.creditItemCode+'">'+v.creditItemName+'['+v.creditItemCode+']</option>\n\
                    <option value="'+v.creditTaxItemCode+'">'+v.creditTaxItemName+'['+v.creditTaxItemCode+']</option>\n\
                    <option value="'+v.debitItemCode+'">'+v.debitItemName+'['+v.debitItemCode+']</option>\n\
                ');
                return false;
            }            
        })
        $('.'+dropDown+'.new').val(value).trigger('change');
        $('.'+dropDown+'.new').removeClass('new');
    }
}

function writeVoucherListToSap() {
    var openId = 'admin';
    $.each(JSON.parse($.cookie('userModules')), function(i,v) {
        if(v.roleCode == 'CROLE220301000001'){
            openId = v.moduleName;
            return false;
        }
    })
    
    var map = {
        "messIdOsList": $.checkVoucher,
        "updateOpenId": openId
    }
    
    $.ajax({
        url: $.api.baseSap+"/api/sap/voucher/writeVoucherListToSap",
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
            $.checkVoucher = [];
            $.cookie('checkVoucher','');
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
                
                $('#myModalLabel').text('正在连接SAP, 请稍后...');
                $('#submitStateModal').modal('show');
                var obj = $('#submitState');
                var countdownWriteVoucher = $.checkVoucher.length * 5;
                setTimeWriteVoucher(obj);
                function setTimeWriteVoucher(obj) {
                    if (countdownWriteVoucher == 0) { 
                        $('#myModalLabel,#submitState').text('');
                        $('#submitStateModal').modal('hide');
                        countdownWriteVoucher = $.checkVoucher.length * 5;
                        
                        location.reload();
                        return;
                    } else { 
                        obj.html(countdownWriteVoucher + "秒");
                        countdownWriteVoucher--; 
                    } 
                setTimeout(function() { 
                    setTimeWriteVoucher(obj); }
                    ,1000); 
                }
            } else {
                alertMsg(response.code,response.customerMessage);
            }
        }
    })
}

function deleteVoucher(voucher) {
    Ewin.confirm({ message: "确定要删除该条凭证吗？" }).on(function (e) {
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
        
        var map = JSON.parse(voucher);
        if(map.creatorOpenId != openId){
            alertMsg('9999','非本人不能操作。');
            return false;
        } else if(map.tableId != null){
            alertMsg('9999','常规凭证不能删除。');
            return false;
        } else if(map.voucherStatus == '8'){
            alertMsg('9999','已作废凭证不能删除。');
            return false;
        } else if(map.voucherStatus == '9'){
            alertMsg('9999','已传凭凭证不能删除。');
            return false;
        }
        
        map.state = 0;
        map.updateOpenId = openId;
        
        $.ajax({
            url: $.api.baseSap+"/api/sap/voucher/saveOrUpdate",
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
                    
                    window.location.href = '/lotus-admin/accounting-voucher?'+(getURLParameter('page') ? 'page='+getURLParameter('page') : '')+(getURLParameter('items') ? '&items='+getURLParameter('items') : '')+'&s=delete';
                } else {
                    alertMsg(response.code,response.customerMessage);
                }
            }
        })
    })
}