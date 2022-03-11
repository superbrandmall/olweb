$(document).ready(function(){
    findContractByContractNo();
    findContractFixedRentByContractNo();
    findRentCalculationMode('RENT_CALCULATION_MODE');
    findContractPropertyMgmtByContractNo();
    findContractDepositByContractNo();
})

function findContractByContractNo() {
    $.ajax({
        url: $.api.baseLotus+"/api/contract/lotus/findAllByContractNoAndContractVersion?contractNo="+getURLParameter('id')+"&contractVersion=1",
        type: "GET",
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
                
                if(response.data != '' && response.data != null){
                    var data = response.data;
                    $('#contractName').text(data.contractName).attr('title',data.contractName);
                    $('#contractVersion').text(data.contractVersion).attr('title',data.contractVersion);
                    findMainSigningBody(data.mallCode);
                    updateDictByDictTypeCode('CONTRACT_STATUS','contractStatus',data.contractStatus);
                    $('#selectTenant').text(data.tenantName).attr('title',data.tenantName);
                    $('#contractNo').text(data.contractNo).attr('title',data.contractNo);
                    $('#mallName').text(data.mallName).attr('title',data.mallName);
                    $('#floorName').text(data.floorName).attr('title',data.floorName);
                    $('#contractName2').text(data.contractName).attr('title',data.contractName);
                    $('#startEndDate').text(data.startDate+'至'+data.endDate).attr('title',data.startDate+'至'+data.endDate);
                    $('#unitCode').text(data.unitCode).attr('title',data.unitCode);
                    $('#brandName').text(data.brandName).attr('title',data.brandName);
                    $('#deliveryDate').text(data.deliveryDate).attr('title',data.deliveryDate);
                    updateDictByDictTypeCode('COOPERATION_MODE','cooperationMode',data.cooperationMode);
                    $('#area').html(data.area+'m<sup>2</sup>').attr('title',data.area+'m²');
                    $('#bizTypeName').text(data.bizTypeName).attr('title',data.bizTypeName);
                    $('#duration').text(data.duration +'个月').attr('title',data.duration +'个月');
                    $('#bizDate').text(data.bizDate).attr('title',data.bizDate);
                    findContractCommissionByContractNo(data.rentCalculationMode);
                }
            } else {
                alertMsg(response.code,response.customerMessage);
            }
        }
    })
}

function findMainSigningBody(code){
    $.ajax({
        url: $.api.baseLotus+"/api/mall/lotus/findOneByCode?code="+code,
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
                
                if(response.data != '' && response.data != null){
                    $('#mainSigningBody').text(response.data.mallLotusBaseList[0].name).attr('title',response.data.mallLotusBaseList[0].name);
                }
            }                             
        }
    }); 
}

function updateDictByDictTypeCode(dictTypeCode, id, val) {
    $.ajax({
        url: $.api.baseAdmin+"/api/dict/findAllByDictTypeCode/"+dictTypeCode,
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
                
                if(response.data.dictDataList.length > 0){
                    $.each(response.data.dictDataList, function(i,v) {
                        if(v.dictCode == val){
                            $('#'+id).text(v.dictName).attr('title',v.dictName);
                            return false;
                        }
                    })
                }
            }                             
        }
    })
}

function findRentCalculationMode(dictTypeCode) {
    $.ajax({
        url: $.api.baseAdmin+"/api/dict/findAllByDictTypeCode/"+dictTypeCode,
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
                
                if(response.data.dictDataList.length > 0){
                    sessionStorage.setItem("RENT_CALCULATION_MODE",JSON.stringify(response.data.dictDataList));
                }
            }                             
        }
    })
}

function findContractFixedRentByContractNo() {
    $.ajax({
        url: $.api.baseLotus+"/api/contract/fixed/rent/findAllByContractNoAndContractVersion?contractNo="+getURLParameter('id')+"&contractVersion=1",
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
        complete: function(){},
        success: function (response, status, xhr) {
            if(response.code === 'C0') {
                if(xhr.getResponseHeader("Login") !== null){
                    $.cookie('login', xhr.getResponseHeader("Login"));
                }
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                }
                
                if(response.data.length > 0){
                    $.each(response.data, function(i,v) {
                        $('#fixedRent').append('<tr>\n\
<td>'+v.itemName+'['+v.itemCode+']</td>\n\
<td>'+v.startDate+' ～ '+v.endDate+'</td>\n\
<td>'+accounting.formatNumber(v.amount)+'</td>\n\
<td>'+accounting.formatNumber(v.rentAmount)+'</td></tr>')
                    })
                } else {
                    $('#investmentContractAccounttermFixed').hide();
                }
            }
        }
    })
}

function findContractCommissionByContractNo(rentCalcMode) {
    $.ajax({
        url: $.api.baseLotus+"/api/contract/deduct/findAllByContractNoAndContractVersion?contractNo="+getURLParameter('id')+"&contractVersion=1",
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
        complete: function(){},
        success: function (response, status, xhr) {
            if(response.code === 'C0') {
                if(xhr.getResponseHeader("Login") !== null){
                    $.cookie('login', xhr.getResponseHeader("Login"));
                }
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                }
                
                if(response.data.length > 0){
                    $.each(response.data, function(i,v) {
                        $('#commission').append('<tr>\n\
<td>'+v.itemName+'['+v.itemCode+']</td>\n\
<td>'+v.startDate+' ～ '+v.endDate+'</td>\n\
<td>'+accounting.formatNumber(v.deduct * 100)+'%</td>\n\
<td>'+rentCalcMode+'</td></tr>')
                    })
                    
                    if(sessionStorage.getItem("RENT_CALCULATION_MODE") && sessionStorage.getItem("RENT_CALCULATION_MODE") != null && sessionStorage.getItem("RENT_CALCULATION_MODE") != '') {
                        var mode = $.parseJSON(sessionStorage.getItem("RENT_CALCULATION_MODE"));
                        $.each(mode, function(i,v){
                            $("#commission tr td:nth-child(4)").each(function() {
                                if(v.dictCode == $(this).text()){
                                    $(this).text(v.dictName);
                                }
                                return false;
                            })
                            
                        })
                   }
                } else {
                    $('#investmentContractAccounttermCommission').hide();
                }
            }
        }
    })
}

function findContractPropertyMgmtByContractNo() {
    $.ajax({
        url: $.api.baseLotus+"/api/contract/property/findAllByContractNoAndContractVersion?contractNo="+getURLParameter('id')+"&contractVersion=1",
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
        complete: function(){},
        success: function (response, status, xhr) {
            if(response.code === 'C0') {
                if(xhr.getResponseHeader("Login") !== null){
                    $.cookie('login', xhr.getResponseHeader("Login"));
                }
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                }
                
                if(response.data.length > 0){
                    $.each(response.data, function(i,v) {
                        $('#propertyMgmt').append('<tr>\n\
<td>'+v.itemName+'['+v.itemCode+']</td>\n\
<td>'+v.startDate+' ～ '+v.endDate+'</td>\n\
<td>'+accounting.formatNumber(v.amount)+'</td>\n\
<td>'+accounting.formatNumber(v.rentAmount)+'</td></tr>')
                    })
                } else {
                    $('#investmentContractAccounttermPropertyMgmt').hide();
                }
            }
        }
    })
}

function findContractDepositByContractNo() {
    $.ajax({
        url: $.api.baseLotus+"/api/contract/deposit/findAllByContractNoAndContractVersion?contractNo="+getURLParameter('id')+"&contractVersion=1",
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
        complete: function(){},
        success: function (response, status, xhr) {
            if(response.code === 'C0') {
                if(xhr.getResponseHeader("Login") !== null){
                    $.cookie('login', xhr.getResponseHeader("Login"));
                }
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                }
                
                if(response.data.length > 0){
                    $.each(response.data, function(i,v) {
                        $('#deposit').append('<tr>\n\
<td>'+v.itemName+'['+v.itemCode+']</td>\n\
<td>-</td>\n\
<td>'+accounting.formatNumber(v.amount)+'</td></tr>')
                    })
                } else {
                    $('#investmentContractDepositterm').hide();
                }
            }
        }
    })
}