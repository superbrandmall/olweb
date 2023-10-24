if($.cookie('checkTenant') &&  JSON.parse($.cookie('checkTenant')).length > 0){
    $.checkTenant = JSON.parse($.cookie('checkTenant'));
} else {
    $.checkTenant = [];
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
    
    if(!sessionStorage.getItem("users") || sessionStorage.getItem("users") == null || sessionStorage.getItem("users") == '') {
        findAllUsers();
    }
    
    var items = getURLParameter('items') || $('.page-size').first().text();
    if(getURLParameter('page') && getURLParameter('page') >= 1){
        findTenantByKVCondition(getURLParameter('page'),items);
    } else {
        findTenantByKVCondition(1,items);
    }
    
    updateAccountingTenantMallDropDown();
    
    if($.cookie('accountingTenantNo') != null && $.cookie('accountingTenantNo') != ''){
        $('#accountingTenantNo').val($.cookie('accountingTenantNo'));
    }
    
    if($.cookie('accountingTenantName') != null && $.cookie('accountingTenantName') != ''){
        $('#accountingTenantName').val($.cookie('accountingTenantName'));
    }
    
    if($.cookie('accountingTenantMessIdOs') != null && $.cookie('accountingTenantMessIdOs') != ''){
        $('#accountingTenantMessIdOs').val($.cookie('accountingTenantMessIdOs'));
    }
    
    if($.cookie('accountingTenantMallVal') != null && $.cookie('accountingTenantMallVal') != 'null'){
        var newOption = new Option($.cookie('accountingTenantMallTxt'), $.cookie('accountingTenantMallVal'), true, true);
        $('#accountingTenantDepartment').append(newOption).trigger('change');
    } else {
        $('#accountingTenantDepartment').val('').trigger('change');
    }
    
    if($.cookie('accountingTenantUSCC') != null && $.cookie('accountingTenantUSCC') != ''){
        $('#accountingTenantUSCC').val($.cookie('accountingTenantUSCC'));
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
        $.cookie('accountingTenantNo','');
        $.cookie('accountingTenantName', '');
        $.cookie('accountingTenantMessIdOs', '');
        $.cookie('accountingTenantMallTxt', null);
        $.cookie('accountingTenantMallVal', null);
        $.cookie('accountingTenantUSCC', '');

        $('#accountingTenantNo').val('');
        $('#accountingTenantName').val('');
        $('#accountingTenantMessIdOs').val('');
        $('#accountingTenantDepartment').val('').trigger('change');
        $('#accountingTenantUSCC').val('');
    })
    
    $('#search').click(function(){
        $.cookie('accountingTenantNo', $('#accountingTenantNo').val());
        $.cookie('accountingTenantName', $('#accountingTenantName').val());
        $.cookie('accountingTenantMessIdOs', $('#accountingTenantMessIdOs').val());
        $.cookie('accountingTenantMallVal', $('#accountingTenantDepartment').val());
        $.cookie('accountingTenantMallTxt', $('#accountingTenantDepartment').find('option:selected').text());
        $.cookie('accountingTenantUSCC', $('#accountingTenantUSCC').val());
        
        $.checkTenant = [];
        $.cookie('checkTenant','');
        findTenantByKVCondition(1,items);
    })
    
    $('.fixed-table-body').on('scroll', scrollHandle);
});

function findTenantByKVCondition(p,c) {
    var params = [];
    var param = {};
    var conditionGroups = [];
    
    if($.cookie('accountingTenantNo') != null && $.cookie('accountingTenantNo') != ''){
        param = {
            "columnName": "tenantNo",
            "columnPatten": "",
            "conditionOperator": "AND",
            "operator": "LIKE",
            "value": $.cookie('accountingTenantNo')
        }
        params.push(param);
    }
    
    if($.cookie('accountingTenantName') != null && $.cookie('accountingTenantName') != ''){
        param = {
            "columnName": "tenantName",
            "columnPatten": "",
            "conditionOperator": "AND",
            "operator": "LIKE",
            "value": $.cookie('accountingTenantName')
        }
        params.push(param);
    }
   
    if($.cookie('accountingTenantMessIdOs') != null && $.cookie('accountingTenantMessIdOs') != ''){
        param = {
            "columnName": "messIdOs",
            "columnPatten": "",
            "conditionOperator": "AND",
            "operator": "=",
            "value": $.cookie('accountingTenantMessIdOs')
        }
        params.push(param);
    }
    
    if($.cookie('accountingTenantMallVal') != null && $.cookie('accountingTenantMallVal') != 'null'){
        param = {
            "columnName": "companyCode",
            "columnPatten": "",
            "conditionOperator": "AND",
            "operator": "=",
            "value": ($.cookie('accountingTenantMallVal') != null ? $.cookie('accountingTenantMallVal') : $('#accountingTenantDepartment').val())
        }
        params.push(param);
    }
    
    if($.cookie('accountingTenantUSCC') != null && $.cookie('accountingTenantUSCC') != ''){
        param = {
            "columnName": "uscc",
            "columnPatten": "",
            "conditionOperator": "AND",
            "operator": "LIKE",
            "value": $.cookie('accountingTenantUSCC')
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
        url: $.api.baseSap+"/api/sap/tenant/findAllByKVCondition?page="+(p-1)+"&size="+c+"&sort=id,desc",
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
                
                $('#tenant').html('');
                if(response.data.content.length > 0){
                    var pages =  response.data.totalPages;
                    generatePages(p, pages, c);
                    
                    sessionStorage.setItem("tenant", JSON.stringify(response.data.content) );
                    
                    var checked = '';
                    $("#all").prop('checked',false);
                    if($.checkTenant.length > 0){
                        $(".selected").html("已选<b class='text-red'>"+$.checkTenant.length+"</b>条 <a href='javascript:void(0);' onclick='javascript: disp_confirm()' class='btn btn-primary btn-sm'><i class='fa fa-paper-plane icon-white'></i> <span class='hidden-xs'>传凭到SAP</span></a>");
                    } else {
                        $(".selected").text("");
                    }
                    $.each(response.data.content, function(i,v){  
                        if($.checkTenant && $.checkTenant.length > 0 && isInArray($.checkTenant,v.messIdOs) == 1) {
                            checked = ' checked';
                        } else {
                            checked = '';
                        }
                        
                        var tbg = '#fff';
                        if(i%2==0){
                            tbg = '#f9f9f9';
                        }
                        
                        $('#tenant').append('<tr>\n\
                            <td style="background: '+tbg+'; z-index: 1; border-right: solid 2px #ddd;"><input type="checkbox" class="me-1" value="'+v.messIdOs+'"'+checked+'></td>\n\
                            <td><a href=\'javascript:void(0);\' onclick=\'javascript: getTenantDetail("'+v.messIdOs+'")\'>'+v.tenantName+'['+v.tenantNo+']</a></td>\n\
                            <td>'+v.messIdOs+'</td>\n\
                            <td>'+(v.postCode || '--')+'</td>\n\
                            <td>'+(v.paymentMethod || '--')+'</td>\n\
                            <td>'+v.countryCode+'</td>\n\
                            <td>'+v.companyCode+'</td>\n\
                            <td>'+v.uscc+'</td>\n\
                            <td>'+(v.accountGroup || '--')+'</td>\n\
                            <td>'+(v.cityCode || '--')+'</td>\n\
                            <td>'+(v.regAddress || '--')+'</td>\n\
                            <td>'+(v.language || '--')+'</td>\n\
                            <td>'+(v.apSubjectTenant || '--')+'</td>\n\
                            <td>'+v.created+'['+(v.creatorOpenId != 'admin' ? renderUserName(v.creatorOpenId) : 'admin')+']</td>\n\
                            <td>'+v.updated+'['+(v.updateOpenId != 'admin' ? renderUserName(v.updateOpenId) : 'admin')+']</td>\n\
                        </tr>');
                    })
                    
                    $(".me-1").each(function(){
                        $(this).change(function(){
                            if($(this).is(':checked') == true) {
                                $.checkTenant.push($(this).val());
                                $.cookie('checkTenant',JSON.stringify($.checkTenant));
                            } else {
                                var pos = $.inArray($(this).val(),$.checkTenant);
                                $.checkTenant.splice(pos,1);
                                $.cookie('checkTenant',JSON.stringify($.checkTenant));
                            }
                            if($.checkTenant.length > 0){
                                $(".selected").html("已选<b class='text-red'>"+$.checkTenant.length+"</b>条 <a href='javascript:void(0);' onclick='javascript: disp_confirm()' class='btn btn-primary btn-sm'><i class='fa fa-paper-plane icon-white'></i> <span class='hidden-xs'>传凭到SAP</span></a>");
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
                                    
                                    $.checkTenant.push($(e).val());
                                    $.cookie('checkTenant',JSON.stringify($.checkTenant));
                                }
                            })
                        } else {
                            $(".me-1").each(function(i,e){
                                if($(e).is(':checked') == true) {
                                    $(e).prop("checked",false);

                                    var pos = $.inArray($(e).val(),$.checkTenant);
                                    $.checkTenant.splice(pos,1);
                                    $.cookie('checkTenant',JSON.stringify($.checkTenant));
                                }
                            })
                        }
                        if($.checkTenant.length > 0){
                            $(".selected").html("已选<b class='text-red'>"+$.checkTenant.length+"</b>条 <a href='javascript:void(0);' onclick='javascript: disp_confirm()' class='btn btn-primary btn-sm'><i class='fa fa-paper-plane icon-white'></i> <span class='hidden-xs'>传凭到SAP</span></a>");
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

function getTenantDetail(messIdOs){
    $('#investment-contract-tenant-create').modal('toggle');
    
    var tenant = $.parseJSON(sessionStorage.getItem("tenant"));
    $('.modal-header h4, #tenantUpdated, #tenantMessIdOs, #tenantName, #tenantShortName, #tenantUSCC, #tenantRegAddress,  #tenantPhone, #tenantPostCode, #tenantCityCode, #tenantAccountGroup').text('');
            
    $.each(tenant, function(i,v){
        if(v.messIdOs == messIdOs){
            $('.modal-header h4').text(v.tenantName+'['+v.tenantNo+']');
            $('#tenantUpdated').text('最近更新：  '+v.updated+'['+(v.updateOpenId != 'admin' ? renderUserName(v.updateOpenId) : 'admin')+']');
            $('#tenantMessIdOs').text(v.messIdOs);
            $('#tenantName').text(v.tenantName+'['+v.tenantNo+']').attr('title',v.tenantName+'['+v.tenantNo+']');
            $('#tenantShortName').text(v.shortName || '--').attr('title',v.shortName);
            $('#tenantUSCC').text(v.uscc || '--');
            $('#tenantRegAddress').text(v.regAddress || '--').attr('title',v.regAddress);
            $('#tenantPhone').text(v.phone || '--');
            $('#tenantPostCode').text(v.postCode || '--');
            $('#tenantCityCode').text(v.cityCode || '--');
            $('#tenantAccountGroup').text(v.accountGroup || '--');
            $('#tenantPaymentTerm').text(v.paymentTerm == 'Z001' ? '一天之内' : (v.paymentTerm || '--'));
            
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
            $('#tenantDepartment').text(mallName + '[' + (v.mallCode || v.companyCode) + ']');
            $('#tenantBankDummyAccount').text(v.bankDummyAccount || '--');
            
            $('#bankList tbody').html('');
            if(v.bankList.length > 0){
                $.each(v.bankList, function(j, w) {
                    updateRowSapTenantBankItem(JSON.stringify(w));
                });
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

function updateAccountingTenantMallDropDown() {
    if(sessionStorage.getItem("lotus_malls") && sessionStorage.getItem("lotus_malls") != null && sessionStorage.getItem("lotus_malls") != '') {
        var malls = $.parseJSON(sessionStorage.getItem("lotus_malls"));
        var returnData = [];
        var data = $.map(malls, function(item) {
            if($.cookie('userModules') && $.cookie('userModules') != '' && $.cookie('userModules') != null){
                $.each(JSON.parse($.cookie('userModules')), function(j,w) {
                    if((w.roleCode == 'CROLE211008000002' || w.roleCode == 'CROLE220922000001') && w.moduleCode == 'ALL'){
                        data = {
                            id: item.mallLotusBase.companyCode,
                            text: item.mallName + '[' + item.code + ']'                   
                        }
                        returnData.push(data);
                    } else if(w.roleCode == 'CROLE211008000001' && w.moduleName == '门店对接人') {
                        if(item.code == w.moduleCode){
                            data = {
                                id: item.mallLotusBase.companyCode,
                                text: item.mallName + '[' + item.code + ']'                 
                            }
                            returnData.push(data);
                        }
                    }
                })
            }
                
            return returnData;
        });
        
        $('#accountingTenantDepartment').select2({
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

function updateRowSapTenantBankItem(v) {
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
    var column10 = createRowColumn(newrow);
    
    var table = document.getElementById('bankList');
    var tbody = table.querySelector('tbody') || table;
    var count = tbody.getElementsByTagName('tr').length + 1;
    column1.innerText = count.toLocaleString();

    var div = document.createElement("div");
    div.innerText = value.name+"["+value.bankNo+"]";
    column2.appendChild(div);
    
    var div = document.createElement("div");
    div.innerText = value.accountName+"["+value.accountCode+"]";
    column3.appendChild(div);
    
    var div = document.createElement("div");
    div.innerText = (value.type == 1?'商户':'供应商');
    column4.appendChild(div);
    
    var div = document.createElement("div");
    div.innerText = value.tenantNo;
    column5.appendChild(div);
    
    var div = document.createElement("div");
    div.innerText = (value.groupCode || '--');
    column6.appendChild(div);
    
    var div = document.createElement("div");
    div.innerText = (value.provinceCity || '--');
    column7.appendChild(div);
    
    var div = document.createElement("div");
    div.innerText = value.unionBankCode;
    column8.appendChild(div);
    
    var div = document.createElement("div");
    div.innerText = value.districtCode;
    column9.appendChild(div);
    
    var div = document.createElement("div");
    div.innerText = value.countryCode;
    column10.appendChild(div);
    
    tbody.appendChild(newrow);
}