$(document).ready(function(){
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
    
    if($.cookie('searchMallCode') != null){
        $('#department').val($.cookie('searchMallCode')).trigger('change');
    }
    
    if($.cookie('searchYearMonth') != null && $.cookie('searchYearMonth') != ''){
        var ym = $.cookie('searchYearMonth').split('');
        ym[6] = ym[5];
        ym[5] = ym[4];
        ym[4] = '-';
        var yearM = ym.join('');
        $('#yearMonth').val(yearM);
    }
    
    var items = getURLParameter('items') || $('.page-size').first().text();
    if(getURLParameter('page') && getURLParameter('page') >= 1){
        findAllSalesByKVCondition(getURLParameter('page'),items);
    } else {
        findAllSalesByKVCondition(1,items);
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
    
    updateSelectContractDropDown(50);
    
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
        $('#yearMonth').val('');
        $('#department, #selectContract').val('').trigger('change');
        
        $.cookie('searchYearMonth', '');
        $.cookie('searchMallCode', null);
        $.cookie('searchContract', null);
    })
    
    $('#search').click(function(){
        $.cookie('searchMallCode', $('#department').val());
        $.cookie('searchContract', $('#selectContract').val());
        $.cookie('searchYearMonth', $('#yearMonth').val().replace('-',''));
        findAllSalesByKVCondition(1,items);
    })
});

function findAllSalesByKVCondition(p,c) {
    $('#sales').html('');
    
    var params = [];
    var param = {};
    var conditionGroups = [];
    
    params = [{
        "columnName": "state",
        "columnPatten": "",
        "conditionOperator": "AND",
        "operator": "=",
        "value": "1"
    }]

    if($.cookie('searchContract') != null && $.cookie('searchContract') != 'null' && $.cookie('searchContract') != ''){
        param = {
            "columnName": "contractNo",
            "columnPatten": "",
            "operator": "AND",
            "value": $.cookie('searchContract')
        }
        params.push(param);
    }
    
    if($.cookie('searchYearMonth') != null && $.cookie('searchYearMonth') != ''){
        param = {
            "columnName": "yyyymm",
            "columnPatten": "",
            "operator": "AND",
            "value": $.cookie('searchYearMonth')
        }
        params.push(param);
    }

    var map = {
        "conditionGroups": conditionGroups,
        "params": params
    }
    $.ajax({
        url: $.api.baseLotus+"/api/sales/lotus/findAllByKVCondition?page="+(p-1)+"&size="+c+"&sort=id,desc",
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

                $('#sales').html('');
                if(response.data.content.length > 0){
                    var pages =  response.data.totalPages;
                    generatePages(p, pages, c);
                    
                    $.each(response.data.content, function(i,v) {
                        if(!sessionStorage.getItem("CONTRACT_"+v.contractNo) || sessionStorage.getItem("CONTRACT_"+v.contractNo) == null || sessionStorage.getItem("CONTRACT_"+v.contractNo) == '') {
                            findContractByContractNo(v.contractNo, JSON.stringify(v));
                        } else {
                            if(!sessionStorage.getItem("USER_"+v.userCode) || sessionStorage.getItem("USER_"+v.userCode) == null || sessionStorage.getItem("USER_"+v.userCode) == '') {
                                findUserByUserCode(v.userCode, JSON.stringify(v));
                            } else {
                                renderSalesList(JSON.stringify(v));
                            }
                        }
                    })
                    
                    if(p == pages){
                        $(".pagination-info").html('显示 '+Math.ceil((p-1)*c+1)+' 到 '+response.data.totalElements+' 行，共 '+response.data.totalElements+'行');
                    } else {
                        $(".pagination-info").html('显示 '+Math.ceil((p-1)*c+1)+' 到 '+Math.ceil((p-1)*c+Number(c))+' 行，共 '+response.data.totalElements+'行');
                    }
                } else {
                    $('#sales').append('<tr><td colspan="13" style="text-align: center;">没有查到相关记录！</td></tr>');
                }
            } else {
                alertMsg(response.code,response.customerMessage);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
        }
    });
}

function renderSalesList(sl) {
    var v = JSON.parse(sl);
    var approveFlag;
    switch (v.approveFlag) {
        case 1:
            approveFlag = "已审核";
            break;
        case 0:
            approveFlag = "未审核";
            break;
        default:
            approveFlag = "未审核";
            break;
    }

    var category;
    switch (v.category) {
        case 'A01':
            category = "默认商品";
            break;
        case 'A02':
            category = "促销商品";
            break;
        default:
            category = "其它商品";
            break;
    }

    $('#sales').append('<tr>\n\
        <td><a href="/lotus-admin/edit-sales-data?id='+v.yyyymm+v.contractNo+'">'+v.yyyymm+v.contractNo+'</a></td>\n\
        <td>'+approveFlag+'</td>\n\
        <td>'+renderMallInfo(v.contractNo)+'</td>\n\
        <td>'+renderContractInfo(v.contractNo)+'</td>\n\
        <td>'+renderTenantInfo(v.contractNo)+'</td>\n\
        <td>'+renderBizInfo(v.contractNo)+'</td>\n\
        <td>'+v.salesDate+'</td>\n\
        <td>'+v.salesDate+'</td>\n\
        <td>'+numberWithCommas(v.saleNum)+'</td>\n\
        <td>'+accounting.formatNumber(v.amount)+'</td>\n\
        <td>'+renderStoreInfo(v.contractNo)+'</td>\n\
        <td>'+(v.remark || '')+'</td>\n\
        <td>'+renderUserInfo(v.userCode)+'</td>\n\
    </tr>');
}

function findContractByContractNo(cn, sl) {
    $.ajax({
        url: $.api.baseLotus+"/api/contract/lotus/findAllByContractNo?contractNo="+cn,
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
                    sessionStorage.setItem("CONTRACT_"+cn,JSON.stringify(response.data[0]));
                    renderSalesList(sl);
                }
            }                             
        }
    })
}

function renderMallInfo(cn) {
    var mallInfo = '';
    if(sessionStorage.getItem("CONTRACT_"+cn) && sessionStorage.getItem("CONTRACT_"+cn) != null && sessionStorage.getItem("CONTRACT_"+cn) != '') {
        var contract = $.parseJSON(sessionStorage.getItem("CONTRACT_"+cn));
        mallInfo = contract.mallName + '[' + contract.mallCode + ']';
    }
    return mallInfo;
}

function renderContractInfo(cn) {
    var contractInfo = '';
    if(sessionStorage.getItem("CONTRACT_"+cn) && sessionStorage.getItem("CONTRACT_"+cn) != null && sessionStorage.getItem("CONTRACT_"+cn) != '') {
        var contract = $.parseJSON(sessionStorage.getItem("CONTRACT_"+cn));
        contractInfo = contract.brandName + '[' + contract.contractNo + ']';
    }
    return contractInfo;
}

function renderTenantInfo(cn) {
    var tenantInfo = '';
    if(sessionStorage.getItem("CONTRACT_"+cn) && sessionStorage.getItem("CONTRACT_"+cn) != null && sessionStorage.getItem("CONTRACT_"+cn) != '') {
        var contract = $.parseJSON(sessionStorage.getItem("CONTRACT_"+cn));
        tenantInfo = contract.tenantName + '[' + contract.tenantNo + ']';
    }
    return tenantInfo;
}

function renderBizInfo(cn) {
    var bizInfo = '';
    if(sessionStorage.getItem("CONTRACT_"+cn) && sessionStorage.getItem("CONTRACT_"+cn) != null && sessionStorage.getItem("CONTRACT_"+cn) != '') {
        var contract = $.parseJSON(sessionStorage.getItem("CONTRACT_"+cn));
        var bizTypeCode = contract.bizTypeCode == null? '' : '[' + contract.bizTypeCode + ']'; 
        bizInfo = contract.bizTypeName + bizTypeCode;
    }
    return bizInfo;
}

function renderStoreInfo(cn) {
    var storeInfo = '';
    if(sessionStorage.getItem("CONTRACT_"+cn) && sessionStorage.getItem("CONTRACT_"+cn) != null && sessionStorage.getItem("CONTRACT_"+cn) != '') {
        var contract = $.parseJSON(sessionStorage.getItem("CONTRACT_"+cn));
        storeInfo = contract.unitCode + '[' + contract.unitName + ']';
    }
    return storeInfo;
}

function findUserByUserCode(uc, sl) {
    $.ajax({
        url: $.api.baseAuth+"/api/passport/user/"+uc,
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
                
                if(response.data != null){
                    sessionStorage.setItem("USER_"+uc,JSON.stringify(response.data));
                    renderSalesList(sl);
                }
            }                             
        }
    })
}

function renderUserInfo(uc) {
    var userInfo = '';
    if(sessionStorage.getItem("USER_"+uc) && sessionStorage.getItem("USER_"+uc) != null && sessionStorage.getItem("USER_"+uc) != '') {
        var user = $.parseJSON(sessionStorage.getItem("USER_"+uc));
        userInfo = user.settings.name;
    }
    return userInfo;
}