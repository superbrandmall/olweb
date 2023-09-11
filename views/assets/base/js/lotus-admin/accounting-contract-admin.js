if($.cookie('checkContract') &&  JSON.parse($.cookie('checkContract')).length > 0){
    $.checkContract = JSON.parse($.cookie('checkContract'));
} else {
    $.checkContract = [];
}

$(document).ready(function(){
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
    
    if(!sessionStorage.getItem("LOTUS_SAP_RENT_TYPE") || sessionStorage.getItem("LOTUS_SAP_RENT_TYPE") == null || sessionStorage.getItem("LOTUS_SAP_RENT_TYPE") == '') {
        findDictCodeByDictTypeCode('LOTUS_SAP_RENT_TYPE');
    }
    
    if(!sessionStorage.getItem("LOTUS_SAP_COMMERCIAL_TYPE") || sessionStorage.getItem("LOTUS_SAP_COMMERCIAL_TYPE") == null || sessionStorage.getItem("LOTUS_SAP_COMMERCIAL_TYPE") == '') {
        findDictCodeByDictTypeCode('LOTUS_SAP_COMMERCIAL_TYPE');
    }
    
    if(!sessionStorage.getItem("LOTUS_SAP_CONTRACT_TYPE") || sessionStorage.getItem("LOTUS_SAP_CONTRACT_TYPE") == null || sessionStorage.getItem("LOTUS_SAP_CONTRACT_TYPE") == '') {
        findDictCodeByDictTypeCode('LOTUS_SAP_CONTRACT_TYPE');
    }
    
    if(!sessionStorage.getItem("LOTUS_SAP_CONTRACT_STATE") || sessionStorage.getItem("LOTUS_SAP_CONTRACT_STATE") == null || sessionStorage.getItem("LOTUS_SAP_CONTRACT_STATE") == '') {
        findDictCodeByDictTypeCode('LOTUS_SAP_CONTRACT_STATE');
    }
    
    if(!sessionStorage.getItem("UNIT_TYPE") || sessionStorage.getItem("UNIT_TYPE") == null || sessionStorage.getItem("UNIT_TYPE") == '') {
        findDictCodeByDictTypeCode('UNIT_TYPE');
    }
    
    if(!sessionStorage.getItem("users") || sessionStorage.getItem("users") == null || sessionStorage.getItem("users") == '') {
        findAllUsers();
    }
    
    var items = getURLParameter('items') || $('.page-size').first().text();
    if(getURLParameter('page') && getURLParameter('page') >= 1){
        findContractByKVCondition(getURLParameter('page'),items);
    } else {
        findContractByKVCondition(1,items);
    }
    
    if($.cookie('accountingContractMallVal') != null && $.cookie('accountingContractMallVal') != 'null'){
        var newOption = new Option($.cookie('accountingContractMallTxt'), $.cookie('accountingContractMallVal'), true, true);
        $('#accountingContractDepartment').append(newOption).trigger('change');
    } else {
        $('#accountingContractDepartment').val('').trigger('change');
    }
    
    if($.cookie('accountingContractUnitType') != ''){
        $('#unitType').val($.cookie('accountingContractUnitType')).trigger('change');
    }
    
    if($.cookie('accountingContractSelectStoreVal') != null){
        var newOption = new Option($.cookie('accountingContractSelectStoreTxt'), $.cookie('accountingContractSelectStoreVal'), true, true);
        $('#selectStore').append(newOption).trigger('change');
    }
    
//    if($.cookie('accountingContractNo') != null && $.cookie('accountingContractNo') != ''){
//        $('#accountingContractNo').val($.cookie('accountingContractNo'));
//    }
//    
//    if($.cookie('accountingContractName') != null && $.cookie('accountingContractName') != ''){
//        $('#accountingContractName').val($.cookie('accountingContractName'));
//    }
//    
//    if($.cookie('accountingContractShortName') != null && $.cookie('accountingContractShortName') != ''){
//        $('#accountingContractShortName').val($.cookie('accountingContractShortName'));
//    }
//    
//    if($.cookie('accountingContractMallVal') != null && $.cookie('accountingContractMallVal') != 'null'){
//        var newOption = new Option($.cookie('accountingContractMallTxt'), $.cookie('accountingContractMallVal'), true, true);
//        $('#accountingContractDepartment').append(newOption).trigger('change');
//    } else {
//        $('#accountingContractDepartment').val('').trigger('change');
//    }
//    
//    if($.cookie('accountingContractUSCC') != null && $.cookie('accountingContractUSCC') != ''){
//        $('#accountingContractUSCC').val($.cookie('accountingContractUSCC'));
//    }

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
    
    if($("#accountingContractDepartment").val() != '' && $("#accountingContractDepartment").val() != null){
        updateSelectStoreDropDownByMallCode(10,$("#accountingContractDepartment").val());
    }
    $("#accountingContractDepartment").on('change',function(){
        updateSelectStoreDropDownByMallCode(10,$(this).val());
    })
    
    $('#clear').click(function(){
        $.cookie('accountingContractMallTxt', null);
        $.cookie('accountingContractMallVal', null);
        $.cookie('accountingContractUnitType','');
        $.cookie('accountingContractSelectStoreVal', null);
        
        
        
        $.cookie('accountingContractNo','');
        $.cookie('accountingContractName', '');
        $.cookie('accountingContractShortName', '');
        $.cookie('accountingContractUSCC', '');



        $('#accountingContractDepartment').val('').trigger('change');
        $('#selectStore').empty();
        $('#unitType, #selectStore').select2("val", "");
        
        $('#accountingContractNo').val('');
        $('#accountingContractName').val('');
        $('#accountingContractShortName').val('');
        $('#accountingContractUSCC').val('');
    })
    
    $('#search').click(function(){
        $.cookie('accountingContractMallVal', $('#accountingContractDepartment').val());
        $.cookie('accountingContractMallTxt', $('#accountingContractDepartment').find('option:selected').text());
        $.cookie('accountingContractUnitType', $('#unitType').val());
        $.cookie('accountingContractSelectStoreVal', $('#selectStore').val());
        $.cookie('accountingContractSelectStoreTxt', $('#select2-selectStore-container').text());
        
        
        $.cookie('accountingContractNo', $('#accountingContractNo').val());
        $.cookie('accountingContractName', $('#accountingContractName').val());
        $.cookie('accountingContractShortName', $('#accountingContractShortName').val());
        $.cookie('accountingContractUSCC', $('#accountingContractUSCC').val());
        
        $.checkContract = [];
        $.cookie('checkContract','');
        findContractByKVCondition(1,items);
    })
    
    $('.fixed-table-body').on('scroll', scrollHandle);
});

function findContractByKVCondition(p,c) {
    var params = [];
    var param = {};
    var conditionGroups = [];
    
    if($.cookie('accountingContractMallVal') != null && $.cookie('accountingContractMallVal') != 'null'){
        param = {
            "columnName": "mallCode",
            "columnPatten": "",
            "conditionOperator": "AND",
            "operator": "=",
            "value": ($.cookie('accountingContractMallVal') != null ? $.cookie('accountingContractMallVal') : $('#accountingContractDepartment').val())
        }
        params.push(param);
    }
    
    if($.cookie('accountingContractUnitType') && $.cookie('accountingContractUnitType') != ''){
        param = {
            "columnName": "unitCode",
            "columnPatten": "",
            "conditionOperator": "AND",
            "operator": "LIKE",
            "value": 'F'+$.cookie('accountingContractUnitType')
        }
        params.push(param);
    }
    
    if($.cookie('accountingContractSelectStoreVal') != null && $.cookie('accountingContractSelectStoreVal') != '' && $.cookie('accountingContractSelectStoreVal') != 'null'){
        param = {
            "columnName": "unitName",
            "columnPatten": "",
            "operator": "AND",
            "value": $.cookie('accountingContractSelectStoreVal').split(':::')[2]
        }
        params.push(param);
    }
    
    
    
//    if($.cookie('accountingContractName') != null && $.cookie('accountingContractName') != ''){
//        param = {
//            "columnName": "contractName",
//            "columnPatten": "",
//            "conditionOperator": "AND",
//            "operator": "LIKE",
//            "value": $.cookie('accountingContractName')
//        }
//        params.push(param);
//    }
//   
//    if($.cookie('accountingContractShortName') != null && $.cookie('accountingContractShortName') != ''){
//        param = {
//            "columnName": "shortName",
//            "columnPatten": "",
//            "conditionOperator": "AND",
//            "operator": "LIKE",
//            "value": $.cookie('accountingContractShortName')
//        }
//        params.push(param);
//    }
//    
//    if($.cookie('accountingContractUSCC') != null && $.cookie('accountingContractUSCC') != ''){
//        param = {
//            "columnName": "uscc",
//            "columnPatten": "",
//            "conditionOperator": "AND",
//            "operator": "LIKE",
//            "value": $.cookie('accountingContractUSCC')
//        }
//        params.push(param);
//    }
    
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
        url: $.api.baseSap+"/api/sap/contract/findAllByKVCondition?page="+(p-1)+"&size="+c+"&sort=id,desc",
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
                
                $('#contract').html('');
                if(response.data.content.length > 0){
                    var pages =  response.data.totalPages;
                    generatePages(p, pages, c);
                    
                    sessionStorage.setItem("contract", JSON.stringify(response.data.content) );
                    
                    var checked = '';
                    $("#all").prop('checked',false);
                    if($.checkContract.length > 0){
                        $(".selected").html("已选<b class='text-red'>"+$.checkContract.length+"</b>条 <a href='javascript:void(0);' onclick='javascript: disp_confirm()' class='btn btn-primary btn-sm'><i class='fa fa-paper-plane icon-white'></i> <span class='hidden-xs'>传凭到SAP</span></a>");
                    } else {
                        $(".selected").text("");
                    }
                    
                    $.each(response.data.content, function(i,v){  
                        if($.checkContract && $.checkContract.length > 0 && isInArray($.checkContract,v.messIdOs) == 1) {
                            checked = ' checked';
                        } else {
                            checked = '';
                        }
                        
                        var tbg = '#fff';
                        if(i%2==0){
                            tbg = '#f9f9f9';
                        }
                        
                        $('#contract').append('<tr>\n\
                            <td style="background: '+tbg+'; z-index: 1; border-right: solid 2px #ddd;"><input type="checkbox" class="me-1" value="'+v.messIdOs+'"'+checked+'></td>\n\
                            <td>'+v.brandName+'['+v.sapContractNo+']</td>\n\
                            <td>'+v.tenantName+'['+v.tenantNo+']</td>\n\
                            <td>'+v.mallName+'['+v.mallCode+']</td>\n\
                            <td>'+v.unitName+'['+v.unitCode+']</td>\n\
                            <td>'+v.contractNo+'</td>\n\
                            <td>'+renderSapContractState(v.contractStatus)+'</td>\n\
                            <td>'+accounting.formatNumber(v.rentArea)+'㎡</td>\n\
                            <td>'+v.companyCode+'</td>\n\
                            <td>'+renderSapCommercialType(v.bizType)+'</td>\n\
                            <td>'+v.startDate+'～'+v.endDate+'</td>\n\
                            <td>'+(v.sapMallCode || '')+'</td>\n\
                            <td>'+renderSapContractType(v.contractType)+'</td>\n\
                            <td>'+renderSapRentType(v.rentType)+'</td>\n\
                            <td>'+accounting.formatNumber(v.rentAmount)+'元/月</td>\n\
                            <td>'+accounting.formatNumber(v.dayRentAmount)+'元/㎡/天</td>\n\
                            <td>'+accounting.formatNumber(v.propertyFee)+'元/月</td>\n\
                            <td>'+accounting.formatNumber(v.graphFee)+'元</td>\n\
                            <td>'+accounting.formatNumber(v.minDayRentAmount)+'元/㎡/天</td>\n\
                            <td>'+accounting.formatNumber(v.rentDeposit)+'元</td>\n\
                            <td>'+accounting.formatNumber(v.waterDeposit)+'元</td>\n\
                            <td>'+accounting.formatNumber(v.yearPropertyFee)+'元/年</td>\n\
                            <td>'+accounting.formatNumber(v.buildDeposit)+'元</td>\n\
                            <td>'+v.taxRate * 100+'%</td>\n\
                            <td>'+v.created+'['+(v.creatorOpenId != 'admin' ? renderUserName(v.creatorOpenId) : 'admin')+']</td>\n\
                            <td>'+v.updated+'['+(v.updateOpenId != 'admin' ? renderUserName(v.updateOpenId) : 'admin')+']</td>\n\
                        </tr>');
                    })
                    
                    $(".me-1").each(function(){
                        $(this).change(function(){
                            if($(this).is(':checked') == true) {
                                $.checkContract.push($(this).val());
                                $.cookie('checkContract',JSON.stringify($.checkContract));
                            } else {
                                var pos = $.inArray($(this).val(),$.checkContract);
                                $.checkContract.splice(pos,1);
                                $.cookie('checkContract',JSON.stringify($.checkContract));
                            }
                            if($.checkContract.length > 0){
                                $(".selected").html("已选<b class='text-red'>"+$.checkContract.length+"</b>条 <a href='javascript:void(0);' onclick='javascript: disp_confirm()' class='btn btn-primary btn-sm'><i class='fa fa-paper-plane icon-white'></i> <span class='hidden-xs'>传凭到SAP</span></a>");
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
                                    
                                    $.checkContract.push($(e).val());
                                    $.cookie('checkContract',JSON.stringify($.checkContract));
                                }
                            })
                        } else {
                            $(".me-1").each(function(i,e){
                                if($(e).is(':checked') == true) {
                                    $(e).prop("checked",false);

                                    var pos = $.inArray($(e).val(),$.checkContract);
                                    $.checkContract.splice(pos,1);
                                    $.cookie('checkContract',JSON.stringify($.checkContract));
                                }
                            })
                        }
                        if($.checkContract.length > 0){
                            $(".selected").html("已选<b class='text-red'>"+$.checkContract.length+"</b>条 <a href='javascript:void(0);' onclick='javascript: disp_confirm()' class='btn btn-primary btn-sm'><i class='fa fa-paper-plane icon-white'></i> <span class='hidden-xs'>传凭到SAP</span></a>");
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
                    $('#voucher').html('<tr><td colspan="26" style="text-align: center;">没有找到任何记录！</td></tr>');
                }
            } else {
                alertMsg(response.code,response.customerMessage);
            }
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

function renderSapRentType(r) {
    var sapRentType = '';
    if(sessionStorage.getItem("LOTUS_SAP_RENT_TYPE") && sessionStorage.getItem("LOTUS_SAP_RENT_TYPE") != null && sessionStorage.getItem("LOTUS_SAP_RENT_TYPE") != '') { 
        $.each($.parseJSON(sessionStorage.getItem("LOTUS_SAP_RENT_TYPE")), function(i,v){
            if(v.dictCode == r){
                sapRentType = v.dictName;
            }
        })
    }
    return sapRentType;
}

function renderSapCommercialType(c) {
    var sapCommercialType = '';
    if(sessionStorage.getItem("LOTUS_SAP_COMMERCIAL_TYPE") && sessionStorage.getItem("LOTUS_SAP_COMMERCIAL_TYPE") != null && sessionStorage.getItem("LOTUS_SAP_COMMERCIAL_TYPE") != '') { 
        $.each($.parseJSON(sessionStorage.getItem("LOTUS_SAP_COMMERCIAL_TYPE")), function(i,v){
            if(v.dictCode == c){
                sapCommercialType = v.dictName;
            }
        })
    }
    return sapCommercialType;
}

function renderSapContractType(c) {
    var sapContractType = '';
    if(sessionStorage.getItem("LOTUS_SAP_CONTRACT_TYPE") && sessionStorage.getItem("LOTUS_SAP_CONTRACT_TYPE") != null && sessionStorage.getItem("LOTUS_SAP_CONTRACT_TYPE") != '') { 
        $.each($.parseJSON(sessionStorage.getItem("LOTUS_SAP_CONTRACT_TYPE")), function(i,v){
            if(v.dictCode == c){
                sapContractType = v.dictName;
            }
        })
    }
    return sapContractType;
}

function renderSapContractState(c) {
    var sapContractState = '';
    if(sessionStorage.getItem("LOTUS_SAP_CONTRACT_STATE") && sessionStorage.getItem("LOTUS_SAP_CONTRACT_STATE") != null && sessionStorage.getItem("LOTUS_SAP_CONTRACT_STATE") != '') { 
        $.each($.parseJSON(sessionStorage.getItem("LOTUS_SAP_CONTRACT_STATE")), function(i,v){
            if(v.dictCode == c){
                sapContractState = v.dictName;
            }
        })
    }
    return sapContractState;
}