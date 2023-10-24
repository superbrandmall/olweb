$(document).ready(function(){
    if(!sessionStorage.getItem("users") || sessionStorage.getItem("users") == null || sessionStorage.getItem("users") == '') {
        findAllUsers();
    }
    
    findTenantByMessId();
});

function findTenantByMessId() {
    $.ajax({
        url: $.api.baseSap+"/api/sap/tenant/findAllByMessIdOs?messIdOs="+getURLParameter('messid'),
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
                
                if(response.data != null){
                    var v = response.data;
                    $('#tenantName2').text(v.tenantName+'['+v.tenantNo+']');
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
                }
            } else {
                alertMsg(response.code,response.customerMessage);
            }
        },
        complete: function () {}
    })
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