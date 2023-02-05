$(document).ready(function(){
    findContractByContractNo();
    findContractFixedRentByContractNo();
    findRentCalculationMode('RENT_CALCULATION_MODE');
    findContractPropertyMgmtByContractNo();
    findContractPromotionByContractNo();
    findContractDepositByContractNo();
})

function findContractByContractNo() {
    $.ajax({
        url: $.api.baseLotus+"/api/contract/lotus/findAllByContractNoAndContractVersion?contractNo="+getURLParameter('id')+"&contractVersion="+getURLParameter('contractVersion'),
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
                
                if(response.data != '' && response.data != null && response.data.contractStatus != 'init'){
                    var data = response.data;
                    if(data.bizId != null){
                        findContractCoFilesByBizId(data.bizId);
                    }
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
                    updateDictByDictTypeCode('PAYMENT_MODE','paymentMode',data.paymentMode);
                    $('#area').html(data.area+'m<sup>2</sup>').attr('title',data.area+'m²');
                    $('#bizTypeName').text(data.bizTypeName).attr('title',data.bizTypeName);
                    $('#duration').text(data.duration +'个月').attr('title',data.duration +'个月');
                    $('#bizDate').text(data.bizDate).attr('title',data.bizDate);
                    findContractCommissionByContractNo(data.rentCalculationMode);
                    
                    if(response.data.bizId != null){
                        $('#fileList2').append('<tr>\n\
                        <td>意见书</td>\n\
                        <td></td>\n\
                        <td><a href="/id/'+response.data.bizId.toLowerCase()+'/lotus-approval-opinion" target="_blank">招商租赁审批意见书</a></td>\n\
                        <td></td>\n\
                        </tr>');
                    }
                } else {
                    alertMsg('9999','模块加载错误，该错误由【签约编号或版本号错误】导致！');
                }
            } else {
                alertMsg(response.code,response.customerMessage);
            }
        }
    })
}

function findContractCoFilesByBizId(id){
    $.ajax({
        url: $.api.baseLotus+"/api/co/file/findAllByBizId?bizId="+id,
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
                    if(response.data.length > 0) {
                        $.each(response.data, function(i,v){
                            if(v.bizType != null){
                                var bizType = 'CONTRACT';
                                if(v.bizType != bizType){
                                    bizType = v.bizType.split('_')[1];
                                }
                                var type;
                                switch (bizType) {
                                    case "BL":
                                        type = '营业执照';
                                        break;
                                    case "IC":
                                        type = '法人代表身份证件';
                                        break;
                                    case "TM":
                                        type = '商标注册证';
                                        break;
                                    case "BA":
                                        type = '品牌授权书';
                                        break;
                                    case "OF":
                                        type = '其它文件';
                                        break;
                                    case "screenshot":
                                        type = '单据快照';
                                        break;
                                    case "CONTRACT":
                                        type = '系统生成合同';
                                        break;
                                    case "INIT":
                                        type = '未盖章合同';
                                        break;
                                    case "TENANT":
                                        type = '商户盖章合同';
                                        break;
                                    case "SIGN":
                                        type = '双方盖章合同';
                                        break;
                                    default:
                                        break;
                                }
                                
                                var fileSize;
                                if(v.fileSize >= 1024 && v.fileSize < 1048576){
                                    fileSize = Math.round(v.fileSize / 1024 * 100) / 100 + 'Kb';
                                } else if(v.fileSize >= 1048576){
                                    fileSize = Math.round(v.fileSize / 1048576 * 100) / 100 + 'Mb';
                                } else {
                                    v.fileSize == null ? fileSize = '' : fileSize = v.fileSize + 'b';
                                }
                                
                                if(v.success == 'SUCCESS' || v.success == 'true'){
                                    if($.inArray(bizType, ['CONTRACT','INIT','TENANT','SIGN']) != -1){
                                        $('#fileList2').prepend('<tr>\n\
                                    <td>'+type+'</td>\n\
                                    <td>'+v.created+'</td>\n\
                                    <td><a href="'+$.api.baseLotus+'/api/co/file/showFile?bizId='+v.bizId+'&fileId='+v.fileId+'" target="_blank">'+v.fileName+'</a></td>\n\
                                    <td>'+fileSize+'</td>\n\
                                    </tr>');
                                    } else if(bizType != 'screenshot') {
                                        $('#fileList').append('<tr>\n\
                                    <td>'+type+'</td>\n\
                                    <td>'+v.created+'</td>\n\
                                    <td><a href="'+$.api.baseLotus+'/api/co/file/showFile?bizId='+v.bizId+'&fileId='+v.fileId+'" target="_blank">'+v.fileName+'</a></td>\n\
                                    <td>'+fileSize+'</td>\n\
                                    </tr>');
                                    }
                                }
                            }
                        })
                    }
                }
            }                             
        }
    });
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
                    $('#mainSigningBody').text(response.data.mallLotusBase.name).attr('title',response.data.mallLotusBase.name);
                }
            }                             
        }
    }); 
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
        url: $.api.baseLotus+"/api/contract/fixed/rent/findAllByContractNoAndContractVersion?contractNo="+getURLParameter('id')+"&contractVersion="+getURLParameter('contractVersion'),
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
                
                if(response.data != null && response.data.length > 0){
                    $.each(response.data, function(i,v) {
                        $('#fixedRent').append('<tr>\n\
<td>'+v.itemName+'['+v.itemCode+']</td>\n\
<td>'+v.startDate+' ～ '+v.endDate+'</td>\n\
<td>'+accounting.formatNumber(v.taxRentAmount)+'</td>\n\
<td>'+accounting.formatNumber(v.taxAmount)+'</td>\n\
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
        url: $.api.baseLotus+"/api/contract/deduct/findAllByContractNoAndContractVersion?contractNo="+getURLParameter('id')+"&contractVersion="+getURLParameter('contractVersion'),
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
                
                if(response.data != null && response.data.length > 0){
                    $.each(response.data, function(i,v) {
                        $('#commission').append('<tr>\n\
<td>'+v.itemName+'['+v.itemCode+']</td>\n\
<td>'+v.startDate+' ～ '+v.endDate+'</td>\n\
<td>'+accounting.formatNumber(v.taxDeduct * 100)+'%</td>\n\
<td>'+accounting.formatNumber(v.deduct * 100)+'%</td>\n\
<td>'+rentCalcMode+'</td></tr>')
                    })
                    
                    if(sessionStorage.getItem("RENT_CALCULATION_MODE") && sessionStorage.getItem("RENT_CALCULATION_MODE") != null && sessionStorage.getItem("RENT_CALCULATION_MODE") != '') {
                        var mode = $.parseJSON(sessionStorage.getItem("RENT_CALCULATION_MODE"));
                        $.each(mode, function(i,v){
                            $("#commission tr td:nth-child(5)").each(function() {
                                if(v.dictCode == $(this).text()){
                                    $(this).text(v.dictName);
                                    return;
                                }
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
        url: $.api.baseLotus+"/api/contract/property/findAllByContractNoAndContractVersion?contractNo="+getURLParameter('id')+"&contractVersion="+getURLParameter('contractVersion'),
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
                
                if(response.data != null && response.data.length > 0){
                    $.each(response.data, function(i,v) {
                        $('#propertyMgmt').append('<tr>\n\
<td>'+v.itemName+'['+v.itemCode+']</td>\n\
<td>'+v.startDate+' ～ '+v.endDate+'</td>\n\
<td>'+accounting.formatNumber(v.taxRentAmount)+'</td>\n\
<td>'+accounting.formatNumber(v.taxAmount)+'</td>\n\
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

function findContractPromotionByContractNo() {
    $.ajax({
        url: $.api.baseLotus+"/api/contract/promotion/findAllByContractNoAndContractVersion?contractNo="+getURLParameter('id')+"&contractVersion="+getURLParameter('contractVersion'),
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
                
                if(response.data != null && response.data.length > 0){
                    $.each(response.data, function(i,v) {
                        $('#promotion').append('<tr>\n\
<td>'+v.itemName+'['+v.itemCode+']</td>\n\
<td>'+v.startDate+' ～ '+v.endDate+'</td>\n\
<td>'+accounting.formatNumber(v.amount)+'</td>\n\
<td>'+accounting.formatNumber(v.taxAmount)+'</td></tr>')
                    })
                } else {
                    $('#investmentContractAccounttermPromotion').hide();
                }
            }
        }
    })
}

function findContractDepositByContractNo() {
    $.ajax({
        url: $.api.baseLotus+"/api/contract/deposit/findAllByContractNoAndContractVersion?contractNo="+getURLParameter('id')+"&contractVersion="+getURLParameter('contractVersion'),
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
                
                if(response.data != null && response.data.length > 0){
                    $.each(response.data, function(i,v) {
                        $('#deposit').append('<tr>\n\
<td>'+v.itemName+'['+v.itemCode+']</td>\n\
<td>'+accounting.formatNumber(v.amount)+'</td>\n\
<td>'+(v.paymentDate || '-')+'</td></tr>')
                    })
                } else {
                    $('#investmentContractDepositterm').hide();
                }
            }
        }
    })
}