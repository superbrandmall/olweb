$(document).ready(function(){
//    if(getURLParameter('s')) {
//        switch (getURLParameter('s')) {
//            case "succeed":
//                successMsg('00','保存成功！');
//                break;
//            default:
//                break;
//        }
//        setTimeout(function () {
//            window.history.pushState("object or string", "Title", "/lotus-admin/"+refineUpdateUrl() );
//        },1000);
//    }
    
    if(!sessionStorage.getItem("FLOW_STEPS") || sessionStorage.getItem("FLOW_STEPS") == null || sessionStorage.getItem("FLOW_STEPS") == '') {
        findDictCodeByDictTypeCode('FLOW_STEPS');
    }
    
    findRequestByBizId();
    findRentCalculationMode('RENT_CALCULATION_MODE');
})

function findRequestByBizId() {
    $.ajax({
        url: $.api.baseLotus+"/api/rent/contract/form/findAllByBizId?bizId="+getURLBizId(),
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
                    
                    findMainSigningBody(data.mallCode);
                    if(data.formStatus != 1){
                        findProcessInstByBizId();
                    }
                    
                    $('#updated').text(data.updated.split(' ')[0]);
                    $('#unitName').text(data.unitName);
                    $('#freeDays').text(data.freeDays);
                    
                    var rentalFloorEffect, rentalFloorTaxEffect;
                    var totalAmount = 0;
                    var totalTaxAmount = 0;
                    if(data.fixedRentList.length > 0){
                        $('#fixedRentTaxAmount').html(accounting.formatNumber(data.fixedRentList[0].taxAmount));
                        $('#fixedRentAmount').html(accounting.formatNumber(data.fixedRentList[0].amount));
                        rentalFloorEffect = Math.round(data.fixedRentList[0].amount * 12 / 365 / data.area * 100) / 100;
                        rentalFloorTaxEffect = Math.round(rentalFloorEffect / 1.09 * 100) / 100;
                        $('#rentalFloorEffect').text(rentalFloorEffect);
                        $('#rentalFloorTaxEffect').text(rentalFloorTaxEffect);
                        totalAmount += data.fixedRentList[0].amount;
                        totalTaxAmount += data.fixedRentList[0].taxAmount;
                    }
                    
                    //日租金坪效含税（元/m²/天）= 月租金含税 * 12 / 365 / 面积;
                    //日租金坪效（元/m²/天）= 日租金坪效含税 / 1.09
                    
                    if(data.propertyFeeList.length > 0){
                        $('#propertyMgmtTaxAmount').html(accounting.formatNumber(data.propertyFeeList[0].taxAmount));
                        $('#propertyMgmtAmount').html(accounting.formatNumber(data.propertyFeeList[0].amount));
                        totalAmount += data.propertyFeeList[0].amount;
                        totalTaxAmount += data.propertyFeeList[0].taxAmount;
                    }
                    
                    if(data.promotionFeeList.length > 0){
                        totalAmount += data.promotionFeeList[0].amount;
                        totalTaxAmount += data.promotionFeeList[0].taxAmount;
                    }
                    
                    var depositFee = 0;
                    if(data.depositList.length > 0){
                        for(var i=0; i < data.depositList.length; i++){
                            depositFee += data.depositList[i].amount;
                        }
                        $('#depositFee').text(depositFee);
                    }
                    
                    $('#totalAmount').html(accounting.formatNumber(totalAmount));
                    $('#totalTaxAmount').html(accounting.formatNumber(totalTaxAmount));
                    $('#remark').val(data.remark);
                    $('#selectTenant').text(data.tenantName);
                    $('#mallName').text(data.mallName);
                    $('#brandName').text(data.brandName);
                    $('#area').html(data.area+'m<sup>2</sup>');
                    $('#bizTypeName').text(data.bizTypeName);
                    $('#duration').text(data.duration +'个月');
                    
                    if(data.coFileList.length > 0){
                        $.each(data.coFileList, function(i,v) {
                            if(v.bizType != null){
                                var bizType = 'CONTRACT';
                                if(v.bizType != bizType){
                                    bizType = v.bizType.split('_')[1];
                                }
                                
                                if($.inArray(bizType, ['BL','IC','TM','BA','OF']) != -1){
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
                                            $('#fileList').append('<tr>\n\
                                        <td>'+type+'</td>\n\
                                        <td><a href="'+$.api.baseLotus+'/api/co/file/showFile?bizId='+v.bizId+'&fileId='+v.fileId+'" target="_blank">'+v.fileName+'</a></td>\n\
                                        <td>'+fileSize+'</td>\n\
                                        </tr>');

                                    }
                                }
                            }
                        })
                    }
                    
                    if(data.fixedRentList.length > 0){
                        $.each(data.fixedRentList, function(i,v) {
                            $('#fixedRent').append('<tr>\n\
    <td>'+v.startDate+' ～ '+v.endDate+'</td>\n\
    <td>'+accounting.formatNumber(v.taxRentAmount)+'</td>\n\
    <td>'+accounting.formatNumber(v.taxAmount)+'</td>\n\
    <td>'+accounting.formatNumber(v.amount)+'</td>\n\
    <td>'+accounting.formatNumber(v.rentAmount)+'</td></tr>')
                        })
                    } else {
                        $('#investmentContractAccounttermFixed').hide();
                    }
                    
                    if(data.deductList.length > 0){
                        $.each(data.deductList, function(i,v) {
                            $('#commission').append('<tr>\n\
    <td>'+v.startDate+' ～ '+v.endDate+'</td>\n\
    <td>'+accounting.formatNumber(v.taxDeduct * 100)+'%</td>\n\
    <td>'+accounting.formatNumber(v.deduct * 100)+'%</td>\n\
    <td>'+data.rentCalculationMode+'</td></tr>')
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
                    
                    if(data.propertyFeeList.length > 0){
                        $.each(data.propertyFeeList, function(i,v) {
                            $('#propertyMgmt').append('<tr>\n\
    <td>'+v.startDate+' ～ '+v.endDate+'</td>\n\
    <td>'+accounting.formatNumber(v.taxRentAmount)+'</td>\n\
    <td>'+accounting.formatNumber(v.taxAmount)+'</td>\n\
    <td>'+accounting.formatNumber(v.amount)+'</td>\n\
    <td>'+accounting.formatNumber(v.rentAmount)+'</td></tr>')
                        })
                    } else {
                        $('#investmentContractAccounttermPropertyMgmt').hide();
                    }
                    
                    if(data.promotionFeeList.length > 0){
                        $.each(data.promotionFeeList, function(i,v) {
                            $('#promotion').append('<tr>\n\
    <td>'+v.startDate+' ～ '+v.endDate+'</td>\n\
    <td>'+accounting.formatNumber(v.amount)+'</td>\n\
    <td>'+accounting.formatNumber(v.taxAmount)+'</td></tr>')
                        })
                    } else {
                        $('#investmentContractAccounttermPromotion').hide();
                    }
                    
                    if(data.depositList.length > 0){
                        $.each(data.depositList, function(i,v) {
                            $('#deposit').append('<tr>\n\
    <td>'+v.itemName+'['+v.itemCode+']</td>\n\
    <td>'+accounting.formatNumber(v.amount)+'</td>\n\
    <td>'+(v.paymentDate || '-')+'</td></tr>')
                        })
                    } else {
                        $('#investmentContractDepositterm').hide();
                    }
                } else {
                    alertMsg('9999','模块加载错误，该错误由【单号错误】导致！');
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
                    $('#mainSigningBody').text(response.data.mallLotusBase.name).attr('title',response.data.mallLotusBase.name);
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

function findProcessInstByBizId(){
    $.ajax({
        url: $.api.baseLotus+"/api/process/inst/form/findAllByBizId?bizId="+getURLBizId(),
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
                
                if(response.data != '' && response.data != null){
                    if(response.data.processStepRecordList != '' && response.data.processStepRecordList != null && response.data.processStepRecordList.length > 0){
                        var index = 0;
                        $.each(response.data.processStepRecordList, function(i,v) {
                            if(i != 0 && v.activityType != 'END'){
                                index++;
                                $('#approvalProcess').append('<tr><td>'+index+'</td>\n\
                                <td>'+v.activityName+'</td>\n\
                                <td>'+v.approveName+'</td>\n\
                                <td>'+renderFlowStatus(v.status)+'</td>\n\
                                <td>'+(v.opinion || '')+'</td>\n\
                                <td>'+(v.createTime || '')+'</td>\n\
                                <td>'+(v.handleTime || '')+'</td></tr>');
                            }
                        })
                        $('#investmentContractApprovalProcess').show();
                    }
                }
            } else {
                alertMsg(response.code,response.customerMessage);
            }                            
        }
    }); 
}

function renderFlowStatus(s) {
    var step = '';
    if(sessionStorage.getItem("FLOW_STEPS") && sessionStorage.getItem("FLOW_STEPS") != null && sessionStorage.getItem("FLOW_STEPS") != '') {
        var step = $.parseJSON(sessionStorage.getItem("FLOW_STEPS"));
        $.each(step, function(i,v){
            if(v.dictCode == s){
                step = v.dictName;
            }
        })
    }
    return step;
}