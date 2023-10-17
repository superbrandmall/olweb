$(document).ready(function(){
    if(getURLParameter('s')) {
        switch (getURLParameter('s')) {
            case "delete":
                successMsg('00','删除成功！');
                break;
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
    
    if(!sessionStorage.getItem("CONTRACT_STATUS") || sessionStorage.getItem("CONTRACT_STATUS") == null || sessionStorage.getItem("CONTRACT_STATUS") == '') {
        findDictCodeByDictTypeCode('CONTRACT_STATUS');
    }
    if(!sessionStorage.getItem("UNIT_TYPE") || sessionStorage.getItem("UNIT_TYPE") == null || sessionStorage.getItem("UNIT_TYPE") == '') {
        findDictCodeByDictTypeCode('UNIT_TYPE');
    }
    if(!sessionStorage.getItem("RENT_CALCULATION_MODE") || sessionStorage.getItem("RENT_CALCULATION_MODE") == null || sessionStorage.getItem("RENT_CALCULATION_MODE") == '') {
        findDictCodeByDictTypeCode('RENT_CALCULATION_MODE');
    }
    if($.cookie('searchContractsContractStatus') && $.cookie('searchContractsContractStatus') != ''){
        var searchContractsContractStatus = $.cookie('searchContractsContractStatus').split(',');
        if(searchContractsContractStatus.length > 1){
            $('#contractStatus').val(searchContractsContractStatus).trigger('change');
        } else {
            $('#contractStatus').val($.cookie('searchContractsContractStatus')).trigger('change');
        }
    }
    if($.cookie('searchContractsCode') != ''){
        $('#code').val($.cookie('searchContractsCode'));
    }
    if($.cookie('searchContractsContractVersion') != ''){
        $('#contractVersion').val($.cookie('searchContractsContractVersion')).trigger('change');
    }
    if($.cookie('searchContractsContractNo') != ''){
        $('#contractNo').val($.cookie('searchContractsContractNo'));
    }
    if($.cookie('searchContractsContractName') != ''){
        $('#contractName').val($.cookie('searchContractsContractName'));
    }
    if($.cookie('searchContractsSelectTenantVal') != null && $.cookie('searchContractsSelectTenantVal') != 'null'){
        var newOption = new Option($.cookie('searchContractsSelectTenantTxt'), $.cookie('searchContractsSelectTenantVal'), true, true);
        $('#selectTenant').append(newOption).trigger('change');
    }
    if($.cookie('searchContractsSelectDepartmentVal') != null){
        $('#department').val($.cookie('searchContractsSelectDepartmentVal')).trigger('change');
    }
    if($.cookie('searchContractsUnitType') != ''){
        $('#unitType').val($.cookie('searchContractsUnitType')).trigger('change');
    }
    if($.cookie('searchContractsSelectStoreVal') != null){
        var newOption = new Option($.cookie('searchContractsSelectStoreTxt'), $.cookie('searchContractsSelectStoreVal'), true, true);
        $('#selectStore').append(newOption).trigger('change');
    }
    
    var items = getURLParameter('items') || $('.page-size').first().text();
    if(getURLParameter('page') && getURLParameter('page') >= 1){
        findAllContractsByKVCondition(getURLParameter('page'),items);
    } else {
        findAllContractsByKVCondition(1,items);
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
    
    $('#contractStatus').show();
    
    if($("#department").val() != '' && $("#department").val() != null){
        updateSelectStoreDropDownByMallCode(10,$("#department").val());
    }
    $("#department").on('change',function(){
        updateSelectStoreDropDownByMallCode(10,$(this).val());
    })
    
    $('#clear').click(function(){
        $('#code,#contractNo,#contractName').val('');
        $('#selectTenant, #selectStore').empty(); 
        $('#department, #contractStatus, #contractVersion').val("").trigger('change');
        $('#selectTenant, #unitType, #selectStore').select2("val", "");
        
        $.cookie('searchContractsContractStatus','');
        $.cookie('searchContractsCode', '');
        $.cookie('searchContractsContractNo', '');
        $.cookie('searchContractsContractName', '');
        $.cookie('searchContractsContractVersion','');
        $.cookie('searchContractsSelectTenantVal', null);
        $.cookie('searchContractsSelectTenantTxt', null);
        $.cookie('searchContractsUnitType','');
        $.cookie('searchContractsSelectStoreVal', null);
        $.cookie('searchContractsSelectDepartmentVal', null);
    })
    
    $('#search').click(function(){
        $.cookie('searchContractsContractStatus', $('#contractStatus').val());
        $.cookie('searchContractsCode', $('#code').val());
        $.cookie('searchContractsContractNo', $('#contractNo').val());
        $.cookie('searchContractsContractName', $('#contractName').val());
        $.cookie('searchContractsContractVersion',$('#contractVersion').val());
        $.cookie('searchContractsSelectTenantVal', $('#selectTenant').val());
        $.cookie('searchContractsSelectTenantTxt', $('#selectTenant').find('option:selected').text());
        $.cookie('searchContractsSelectDepartmentVal', $('#department').val());
        $.cookie('searchContractsUnitType', $('#unitType').val());
        $.cookie('searchContractsSelectStoreVal', $('#selectStore').val());
        $.cookie('searchContractsSelectStoreTxt', $('#selectStore').find('option:selected').text());
        findAllContractsByKVCondition(1,items);
    })
    
    $('.fixed-table-body').on('scroll', scrollHandle);
});

function findAllContractsByKVCondition(p,c){
    $('#contracts').html('');
    var params = [];
    var param = {};
    
    if($.cookie('searchContractsContractStatus') != null && $.cookie('searchContractsContractStatus') != ''  && $.cookie('searchContractsContractStatus').substring(0,1) != ','){
        var reg = new RegExp(",","g");
        param = {
            "columnName": "contractStatus",
            "columnPatten": "",
            "conditionOperator": "AND",
            "operator": "in",
            "value": $.cookie('searchContractsContractStatus').replace(reg,";")
        }
    } else {
            param = {
            "columnName": "state",
            "columnPatten": "",
            "operator": "AND",
            "value": 1
        }
    }
    
    params.push(param);
    
    if($.cookie('searchContractsSelectDepartmentVal') != null && $.cookie('searchContractsSelectDepartmentVal') != '' && $.cookie('searchContractsSelectDepartmentVal') != 'null'){
        param = {
            "columnName": "mallCode",
            "columnPatten": "",
            "operator": "AND",
            "value": $.cookie('searchContractsSelectDepartmentVal')
        }
        params.push(param);
    }
    
    if($.cookie('searchContractsContractVersion') != null && $.cookie('searchContractsContractVersion') != ''){
        param = {
            "columnName": "contractVersion",
            "columnPatten": "",
            "operator": "AND",
            "value": $.cookie('searchContractsContractVersion')
        }
        params.push(param);
    }
    
    if($.cookie('searchContractsCode') != null && $.cookie('searchContractsCode') != ''){
        param = {
            "columnName": "code",
            "columnPatten": "",
            "conditionOperator": "AND",
            "operator": "LIKE",
            "value": $.cookie('searchContractsCode')
        }
        params.push(param);
    }
    
    if($.cookie('searchContractsContractNo') != null && $.cookie('searchContractsContractNo') != ''){
        param = {
            "columnName": "contractNo",
            "columnPatten": "",
            "conditionOperator": "AND",
            "operator": "LIKE",
            "value": $.cookie('searchContractsContractNo')
        }
        params.push(param);
    }
    
    if($.cookie('searchContractsContractName') != null && $.cookie('searchContractsContractName') != ''){
        param = {
            "columnName": "contractName",
            "columnPatten": "",
            "conditionOperator": "AND",
            "operator": "LIKE",
            "value": $.cookie('searchContractsContractName')
        }
        params.push(param);
    }

    if($.cookie('searchContractsSelectTenantTxt') != null && $.cookie('searchContractsSelectTenantTxt') != '' && $.cookie('searchContractsSelectTenantTxt') != 'null' && $.cookie('searchContractsSelectTenantTxt') != '未选择'){
        param = {
            "columnName": "tenantNo",
            "columnPatten": "",
            "operator": "AND",
            "value": $.cookie('searchContractsSelectTenantTxt').split(' | ')[0]
        }
        params.push(param);
    }
    
    if($.cookie('searchContractsUnitType') && $.cookie('searchContractsUnitType') != ''){
        param = {
            "columnName": "unitCode",
            "columnPatten": "",
            "conditionOperator": "AND",
            "operator": "LIKE",
            "value": 'F'+$.cookie('searchContractsUnitType').split(':::')[0]
        }
        params.push(param);
    }
    
    if($.cookie('searchContractsSelectStoreVal') != null && $.cookie('searchContractsSelectStoreVal') != '' && $.cookie('searchContractsSelectStoreVal') != 'null'){
        param = {
            "columnName": "shopCode",
            "columnPatten": "",
            "operator": "AND",
            "value": $.cookie('searchContractsSelectStoreVal').split(':::')[1]
        }
        params.push(param);
    }
        
    var map = {
        "params": params
    }

    $.ajax({
        url: $.api.baseLotus+"/api/contract/lotus/findAllByKVCondition?page="+(p-1)+"&size="+c+"&sort=id,desc",
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
                        var link = '', unitType;
                        
                        if(v.contractStatus == 'init'){
                            link = '<a href="/lotus-admin/contract-init?id='+v.contractNo+'&contractVersion='+v.contractVersion+'">'+(v.bizId || v.code)+'</a>';
                        } else {
                            link = '<a href="/lotus-admin/contract-summary?id='+v.contractNo+'&contractVersion='+v.contractVersion+'">'+(v.bizId || v.code)+'</a>';
                        }
                        
                        var creatorName, updateName;
                        v.creatorName != null ? creatorName = '['+v.creatorName+']' : creatorName = '';
                        v.updateName != null ? updateName = '['+v.updateName+']' : updateName = '';
                        
                        var tbg = '#fff';
                        if(i%2==0){
                            tbg = '#f9f9f9';
                        }
                        
                        switch (v.unitCode.substring(3,4)) {
                            case "C":
                                unitType = '临时柜';
                                break;
                            case "S":
                                unitType = '仓库';
                                break;
                            case "T":
                                unitType = '基站';
                                break;
                            case "R":
                                unitType = '停车场';
                                break;
                            case "A":
                                unitType = '广告位';
                                break;
                            default:
                                unitType = '正柜';
                                break;
                        }
                        
                        $('#contracts').append('\
                            <tr data-index="'+i+'">\n\
                            <td style="background: '+tbg+'; z-index: 1; border-right: solid 2px #ddd;">'+link+'</td>\n\
                            <td>'+unitType+'</td>\n\
                            <td>'+(v.bizTypeName || '')+'</td>\n\
                            <td>'+(v.tenantName+'['+v.tenantNo+']' || '')+'</td>\n\
                            <td>'+(v.contractName || '')+'</td>\n\
                            <td>'+v.contractNo+'</td>\n\
                            <td>'+(renderContractStatus(v.contractStatus) || '')+'</td>\n\
                            <td>'+(v.mallName+'['+v.mallCode+']' || '')+'</td>\n\
                            <td>'+v.unitName+'['+v.unitCode+']</td>\n\
                            <td>'+accounting.formatNumber(v.area)+'㎡</td>\n\
                            <td>'+v.floorName+'</td>\n\
                            <td>'+v.startDate+'～'+v.endDate+'</td>\n\
                            <td>'+(renderRentCalculationMode(v.rentCalculationMode) || '')+'</td>\n\
                            <td>'+v.created+creatorName+'</td>\n\
                            <td>'+v.updated+updateName+'</td>\n\
                        </tr>');
                    });
                    
                    if(p == pages){
                        $(".pagination-info").html('显示 '+Math.ceil((p-1)*c+1)+' 到 '+response.data.totalElements+' 行，共 '+response.data.totalElements+'行');
                    } else {
                        $(".pagination-info").html('显示 '+Math.ceil((p-1)*c+1)+' 到 '+Math.ceil((p-1)*c+Number(c))+' 行，共 '+response.data.totalElements+'行');
                    }
                } else {
                    $('#contracts').html('<tr><td colspan="15" style="text-align: center;">没有找到任何记录！</td></tr>');
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
    });
}