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
    
    if(!sessionStorage.getItem("FORM_TYPE") || sessionStorage.getItem("FORM_TYPE") == null || sessionStorage.getItem("FORM_TYPE") == '') {
        findDictCodeByDictTypeCode('FORM_TYPE');
    }
    
    findRequestByBizId();
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
                    
                    var formType = '';
                    if(data.formType != null){
                        formType = renderFormType(data.formType);
                    }
                    var contractTemplate = '长期';
                    if(data.contractTemplate == 2){
                        contractTemplate = '短期';
                    }
                    $('#contractAttr').text(contractTemplate + '租赁合同' + '(' + formType + ')');
                    
                    findMainSigningBody(data.mallCode);
                    if(data.formStatus != 1){
                        findProcessInstByBizId();
                    }
                    
                    $('#updated').text(data.updated.split(' ')[0]);
                    $('#remark').val(data.remark);
                    $('#selectTenant').text(data.tenantName);
                    $('#mallName').text(data.mallName);
                    
                    
                    $('#unitName').text(data.unitName);
                    $('#freeDays').text(data.freeDays || 0);
                    
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
                    }
                    $('#depositFee').text(depositFee);
                    
                    $('#totalAmount').html(accounting.formatNumber(totalAmount));
                    $('#totalTaxAmount').html(accounting.formatNumber(totalTaxAmount));
                    $('#growthRate').text(data.growthRate * 100 + '%' || '0%');
                    $('#brandName').text(data.brandName);
                    $('#area').html(data.area+'m<sup>2</sup>');
                    $('#bizTypeName').text(data.bizTypeName);
                    $('#duration').text(data.duration +'个月');
                    
                    if(data.formType == 'new'){
                        $('#new').show();
                        $('#newMall').html('<span class="txt">'+data.mallName+'</span>【项目名称】');
                        $('#newFloor').html('<span class="txt">'+data.floorName+'</span>【楼层】');
                        $('#newModality').html('<span class="txt">'+data.bizTypeName+'</span>【业态】');
                        $('#newBrand').html('<span class="txt">'+data.brandName+'</span>【品牌】');
                        $('#newArea').html('<span class="txt">'+data.area+'</span>【铺位面积】平米，');
                        $('#newDuration').text(data.duration);
                        var saleRentalRatio = '';
                        if(data.fixedRentList.length > 0){
                            $('#newFixedRent').html('新签首年固定租金<span class="txt">'+data.fixedRentList[0].taxRentAmount+'</span>元/天/平米，');
                            saleRentalRatio = Math.round(data.fixedRentList[0].taxAmount / (data.salesList.length > 0 ? data.salesList[0].amount : 1) * 100) / 100;
                        }
                        if(data.deductList.length > 0){
                            $('#newCommission').html('首年扣率<span class="txt">'+Math.round(data.deductList[0].taxDeduct * 100)+'</span>%，');
                        }
                        if(data.propertyFeeList.length > 0){
                            $('#newPropertyMgmt').html('首年物管费<span class="txt">'+data.propertyFeeList[0].taxRentAmount+'</span>元/月/平米，');
                        }
                        if(data.promotionFeeList.length > 0){
                            $('#newPromotion').html('推广费<span class="txt">'+data.promotionFeeList[0].taxAmount+'</span>元/月，');
                        }
                        $('#newTargetSales').html('首年目标营业额<span class="txt">'+(data.targetSales || '/')+'</span>元/月，首年预估销售额<span class="txt">'+(data.salesList.length > 0 ? data.salesList[0].amount : '/')+'</span>元/月，租售比<span class="txt">'+(saleRentalRatio || '/')+'</span>%，');
                        if(data.awardDate != null && data.awardDate != ''){
                            $('#newAwardDate').html('<span class="txt">预计'+data.awardDate.split('-')[0]+'年'+data.awardDate.split('-')[1]+'月'+data.awardDate.split('-')[2]+'日</span>签约，');
                        }
                        if(data.deliveryDate != null && data.deliveryDate != ''){
                            $('#newDeliveryDate').html('<span class="txt">'+data.deliveryDate.split('-')[0]+'年'+data.deliveryDate.split('-')[1]+'月'+data.deliveryDate.split('-')[2]+'日</span>交楼，');
                        }
                        if(data.bizDate != null && data.bizDate != ''){
                            $('#newBizDate').html('<span class="txt">'+data.bizDate.split('-')[0]+'年'+data.bizDate.split('-')[1]+'月'+data.bizDate.split('-')[2]+'日</span>开业。');
                        }
                    } else if(data.formType == 'renew'){
                        $('#oldUnitName').text(data.oldContractInfo.unitName);
                        $('#oldFreeDays').text(data.oldContractInfo.freeDays || 0);

                        var oldRentalFloorEffect, oldRentalFloorTaxEffect;
                        var oldTotalAmount = 0;
                        var oldTotalTaxAmount = 0;
                        if(data.oldContractInfo.fixedRentList.length > 0){
                            $('#oldFixedRentTaxAmount').html(accounting.formatNumber(data.oldContractInfo.fixedRentList[0].taxAmount));
                            $('#oldFixedRentAmount').html(accounting.formatNumber(data.oldContractInfo.fixedRentList[0].amount));
                            oldRentalFloorEffect = Math.round(data.oldContractInfo.fixedRentList[0].amount * 12 / 365 / data.oldContractInfo.area * 100) / 100;
                            oldRentalFloorTaxEffect = Math.round(oldRentalFloorEffect / 1.09 * 100) / 100;
                            $('#oldRentalFloorEffect').text(oldRentalFloorEffect);
                            $('#oldRentalFloorTaxEffect').text(oldRentalFloorTaxEffect);
                            oldTotalAmount += data.oldContractInfo.fixedRentList[0].amount;
                            oldTotalTaxAmount += data.oldContractInfo.fixedRentList[0].taxAmount;
                        }

                        if(data.oldContractInfo.propertyFeeList.length > 0){
                            $('#oldPropertyMgmtTaxAmount').html(accounting.formatNumber(data.oldContractInfo.propertyFeeList[0].taxAmount));
                            $('#oldPropertyMgmtAmount').html(accounting.formatNumber(data.oldContractInfo.propertyFeeList[0].amount));
                            oldTotalAmount += data.oldContractInfo.propertyFeeList[0].amount;
                            oldTotalTaxAmount += data.oldContractInfo.propertyFeeList[0].taxAmount;
                        }

                        if(data.oldContractInfo.promotionFeeList.length > 0){
                            oldTotalAmount += data.oldContractInfo.promotionFeeList[0].amount;
                            oldTotalTaxAmount += data.oldContractInfo.promotionFeeList[0].taxAmount;
                        }

                        var oldDepositFee = 0;
                        if(data.oldContractInfo.depositList.length > 0){
                            for(var i=0; i < data.oldContractInfo.depositList.length; i++){
                                oldDepositFee += data.oldContractInfo.depositList[i].amount;
                            }
                        }
                        $('#oldDepositFee').text(oldDepositFee);

                        $('#oldTotalAmount').html(accounting.formatNumber(oldTotalAmount));
                        $('#oldTotalTaxAmount').html(accounting.formatNumber(oldTotalTaxAmount));
                        $('#oldGrowthRate').text(data.oldContractInfo.growthRate * 100 + '%' || '0%');
                        $('#oldBrandName').text(data.oldContractInfo.brandName);
                        $('#oldArea').html(data.oldContractInfo.area+'m<sup>2</sup>');
                        $('#oldBizTypeName').text(data.oldContractInfo.bizTypeName);
                        $('#oldDuration').text(data.oldContractInfo.duration +'个月');
                        
                        $('#renew').show();
                        $('#renewMall').html('<span class="txt">'+data.mallName+'</span>【项目名称】');
                        $('#renewFloor').html('<span class="txt">'+data.floorName+'</span>【楼层】');
                        $('#renewModality').html('<span class="txt">'+data.bizTypeName+'</span>【业态】');
                        $('#renewBrand').html('<span class="txt">'+data.brandName+'</span>【品牌】');
                        $('#renewArea').html('<span class="txt">'+data.area+'</span>【铺位面积】平米，');

                        if(data.oldContractInfo.endDate == data.endDate){
                            $('#renewDuration').text(0);
                        } else {
                            $('#renewDuration').text(data.duration);
                        }

                        $('#renewRenewBrandHoldFlag').text('');
                        $('#renewRenewBrandHoldReason').text('');
                        if(data.renewBrandHoldFlag == 1){
                            $('#renewRenewBrandHoldFlag').text('是需要保留的品牌。');
                        } else if(data.renewBrandHoldFlag == 0){
                            $('#renewRenewBrandHoldFlag').html('<span class="txt">不是需要保留的品牌，</span>');
                            $('#renewRenewBrandHoldReason').html('<span class="txt">'+data.renewBrandHoldReason+'</span>【暂时保留的原因】。');
                        }
                        var saleRentalRatio = '';
                        if(data.fixedRentList.length > 0){
                            $('#renewFixedRent').html('固定租金<span class="txt">'+data.fixedRentList[0].taxRentAmount+'</span>元/天/平米，');
                            if(data.renewRentSameFlag == 1){
                                $('#renewGrowthRate').text('平续，');
                            } else {
                                $('#renewGrowthRate').html('增长<span class="txt">'+Math.round(data.growthRate * 100)+'</span>%，');
                            }
                            saleRentalRatio = Math.round(data.fixedRentList[0].taxAmount / data.renewAvgSales * 100) / 100;
                        }
                        if(data.deductList.length > 0){
                            $('#renewCommission').html('扣率<span class="txt">'+Math.round(data.deductList[0].taxDeduct * 100)+'</span>%，');
                        }
                        if(data.propertyFeeList.length > 0){
                            $('#renewPropertyMgmt').html('物管费<span class="txt">'+data.propertyFeeList[0].taxRentAmount+'</span>元/月/平米，');
                        }
                        if(data.promotionFeeList.length > 0){
                            $('#renewPromotion').html('推广费<span class="txt">'+data.promotionFeeList[0].taxAmount+'</span>元/月，');
                        }
                        $('#renewRenewAvgSales').html('近12个月平均销售额<span class="txt">'+(data.renewAvgSales || '/')+'</span>元，租售比<span class="txt">'+(saleRentalRatio || '/')+'</span>%。');
                    }
                    
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
    <td>'+findRentCalculationMode('RENT_CALCULATION_MODE', data.rentCalculationMode)+'</td></tr>')
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

function findRentCalculationMode(dictTypeCode, val) {
    var dictName = '';
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
                            dictName = v.dictName;
                            return false;
                        }
                    })
                }
            }
        }
    })
    return dictName;
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

function renderFormType(t) {
    var type = '';
    if(sessionStorage.getItem("FORM_TYPE") && sessionStorage.getItem("FORM_TYPE") != null && sessionStorage.getItem("FORM_TYPE") != '') {
        var type = $.parseJSON(sessionStorage.getItem("FORM_TYPE"));
        $.each(type, function(i,v){
            if(v.dictCode == t){
                type = v.dictName;
            }
        })
    }
    
    return type;
}