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
            window.history.pushState("object or string", "Title", "/lotus-admin/"+refineUpdateUrl() );
        },1000);
    }
    
    if(!sessionStorage.getItem("FLOW_STEPS") || sessionStorage.getItem("FLOW_STEPS") == null || sessionStorage.getItem("FLOW_STEPS") == '') {
        findDictCodeByDictTypeCode('FLOW_STEPS');
    }
    
    findRequestByBizId();
    findRentCalculationMode('RENT_CALCULATION_MODE');
})

function findRequestByBizId() {
    $.ajax({
        url: $.api.baseLotus+"/api/rent/contract/form/findAllByBizId?bizId="+getURLParameter('id'),
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
                
                if(response.data != '' && response.data != null && response.data.formType == 'termination'){
                    var data = response.data;
                    var oldContractInfo = data.oldContractInfo;
                    
                    $('#requestName').text(data.bizId).attr('title',data.bizId);
                    findMainSigningBody(data.mallCode);
                    updateDictByDictTypeCode('FORM_STATUS','formStatus',(data.formStatus != null ? data.formStatus : 1));
                    if(data.formStatus != 1){
                        findProcessInstByBizId();
                    }
                    
                    $('#essayMall').html('<span class="txt">'+data.mallName+'</span>【项目名称】');
                    $('#essayFloor').html('<span class="txt">'+data.floorName+'</span>【楼层】');
                    $('#essayModality').html('<span class="txt">'+data.bizTypeName+'</span>【业态】');
                    $('#essayBrand').html('<span class="txt">'+data.brandName+'</span>【品牌】');
                    $('#essayArea').html('<span class="txt">'+data.area+'</span>【铺位面积】平米，');
                    if(data.cancelDate != null && data.cancelDate != ''){
                        $('#essayCancelDate').html('<span class="txt">'+data.cancelDate.split('-')[0]+'年'+data.cancelDate.split('-')[1]+'月'+data.cancelDate.split('-')[2]+'日</span>');
                    }
                    if(data.cancelType == 'A'){
                        $('#essayCancelType').html('<span class="txt">到期终止。</span>');
                    } else if(data.cancelType == 'B' || data.cancelType == 'C'){
                        $('#essayCancelType').html('<span class="txt">提前终止。</span>');
                    }
                    $('#essayNewBrandName').html('<span class="txt">'+data.newBrandName+'</span>【品牌名】，');
                    if(data.newDrDate != null && data.newDrDate != ''){
                        $('#essayNewDrDate').html('<span class="txt">预计'+data.newDrDate.split('-')[0]+'年'+data.newDrDate.split('-')[1]+'月'+data.newDrDate.split('-')[2]+'日</span>上会，');
                    }
                    if(data.newDeliveryDate != null && data.newDeliveryDate != ''){
                        $('#essayNewDeliveryDate').html('<span class="txt">'+data.newDeliveryDate.split('-')[0]+'年'+data.newDeliveryDate.split('-')[1]+'月'+data.newDeliveryDate.split('-')[2]+'日</span>交楼，');
                    }
                    if(data.newBizDate != null && data.newBizDate != ''){
                        $('#essayNewBizDate').html('<span class="txt">'+data.newBizDate.split('-')[0]+'年'+data.newBizDate.split('-')[1]+'月'+data.newBizDate.split('-')[2]+'日</span>开业。');
                    }
                    $('#essayBudgetDesc').html('该铺位预算中的情况说明<span class="txt">'+(data.renewBudgetDesc || '/')+'</span>，');
                    $('#essayBudgetDifference').text('与预算差异元。');
                    $('#remark').val(data.remark);
 
                    $('#selectTenant').text(data.tenantName).attr('title',data.tenantName);
                    $('#bizId').text(data.bizId).attr('title',data.bizId);
                    $('#mallName').text(data.mallName).attr('title',data.mallName);
                    $('#floorName').text(data.floorName).attr('title',data.floorName);
                    $('#requestName2').text(data.contractName).attr('title',data.contractName);
                    $('#startEndDate').text(data.startDate+'至'+data.endDate).attr('title',data.startDate+'至'+data.endDate);
                    $('#unitCode').text(data.unitCode).attr('title',data.unitCode);
                    $('#brandName').text(data.brandName).attr('title',data.brandName);
                    $('#deliveryDate').text(data.deliveryDate).attr('title',data.deliveryDate);
                    updateDictByDictTypeCode('PAYMENT_MODE','paymentMode',data.paymentMode);
                    $('#area').html(data.area+'m<sup>2</sup>').attr('title',data.area+'m²');
                    $('#bizTypeName').text(data.bizTypeName).attr('title',data.bizTypeName);
                    
                    $('#duration').text(data.duration +'个月').attr('title',data.duration +'个月');
                    $('#bizDate').text(data.bizDate).attr('title',data.bizDate);
                    
                    $('#endDateBefore').text(data.oldEndDate).attr('title',data.oldEndDate);
                    $('#endDateAfter').text(data.cancelDate).attr('title',data.cancelDate);
                    
                    $('#awardDateBefore').text(oldContractInfo.awardDate).attr('title',oldContractInfo.awardDate);
                    $('#awardDateAfter').text(data.awardDate).attr('title',data.awardDate);
                    
                    if(oldContractInfo.fixedRentList.length > 0){
                        $.each(oldContractInfo.fixedRentList, function(i,v) {
                            $('#fixedRentBefore').append('<tr>\n\
    <td>'+v.itemName+'['+v.itemCode+']</td>\n\
    <td>'+v.startDate+' ～ '+v.endDate+'</td>\n\
    <td>'+accounting.formatNumber(v.amount)+'</td>\n\
    <td>'+accounting.formatNumber(v.rentAmount)+'</td></tr>')
                        })
                        
                        $.each(data.fixedRentList, function(i,v) {
                            var ed = v.endDate;
                            if(v.endDate == data.cancelDate){
                                ed = '<span style="color: #E43C24;">'+ed+'</span>';
                            }
                            $('#fixedRentAfter').append('<tr>\n\
        <td>'+v.itemName+'['+v.itemCode+']</td>\n\
        <td>'+v.startDate+' ～ '+ed+'</td>\n\
        <td>'+accounting.formatNumber(v.amount)+'</td>\n\
        <td>'+accounting.formatNumber(v.rentAmount)+'</td></tr>') 
                        })
                    } else {
                        $('#investmentContractAccounttermFixed').hide();
                    }
                    
                    if(oldContractInfo.deductList.length > 0){
                        $.each(oldContractInfo.deductList, function(i,v) {
                            $('#commissionBefore').append('<tr>\n\
    <td>'+v.itemName+'['+v.itemCode+']</td>\n\
    <td>'+v.startDate+' ～ '+v.endDate+'</td>\n\
    <td>'+accounting.formatNumber(v.deduct * 100)+'%</td>\n\
    <td>'+data.rentCalculationMode+'</td></tr>')
                        })

                        if(sessionStorage.getItem("RENT_CALCULATION_MODE") && sessionStorage.getItem("RENT_CALCULATION_MODE") != null && sessionStorage.getItem("RENT_CALCULATION_MODE") != '') {
                            var mode = $.parseJSON(sessionStorage.getItem("RENT_CALCULATION_MODE"));
                            $.each(mode, function(i,v){
                                $("#commissionBefore tr td:nth-child(4)").each(function() {
                                    if(v.dictCode == $(this).text()){
                                        $(this).text(v.dictName);
                                        return false;
                                    }
                                })
                            })
                        }
                        
                        $.each(data.deductList, function(i,v) {
                            var ed = v.endDate;
                            if(v.endDate == data.cancelDate){
                                ed = '<span style="color: #E43C24;">'+ed+'</span>';
                            }
                            $('#commissionAfter').append('<tr>\n\
    <td>'+v.itemName+'['+v.itemCode+']</td>\n\
    <td>'+v.startDate+' ～ '+ed+'</td>\n\
    <td>'+accounting.formatNumber(v.deduct * 100)+'%</td>\n\
    <td>'+data.rentCalculationMode+'</td></tr>')
                        })

                        if(sessionStorage.getItem("RENT_CALCULATION_MODE") && sessionStorage.getItem("RENT_CALCULATION_MODE") != null && sessionStorage.getItem("RENT_CALCULATION_MODE") != '') {
                            var mode = $.parseJSON(sessionStorage.getItem("RENT_CALCULATION_MODE"));
                            $.each(mode, function(i,v){
                                $("#commissionAfter tr td:nth-child(4)").each(function() {
                                    if(v.dictCode == $(this).text()){
                                        $(this).text(v.dictName);
                                        return false;
                                    }
                                })
                            })
                       }
                    } else {
                        $('#investmentContractAccounttermCommission').hide();
                    }
                    
                    if(oldContractInfo.propertyFeeList.length > 0){
                        $.each(oldContractInfo.propertyFeeList, function(i,v) {
                            $('#propertyMgmtBefore').append('<tr>\n\
    <td>'+v.itemName+'['+v.itemCode+']</td>\n\
    <td>'+v.startDate+' ～ '+v.endDate+'</td>\n\
    <td>'+accounting.formatNumber(v.amount)+'</td>\n\
    <td>'+accounting.formatNumber(v.rentAmount)+'</td></tr>')
                        })
                    
                        $.each(data.propertyFeeList, function(i,v) {
                            var ed = v.endDate;
                            if(v.endDate == data.cancelDate){
                                ed = '<span style="color: #E43C24;">'+ed+'</span>';
                            }
                            $('#propertyMgmtAfter').append('<tr>\n\
        <td>'+v.itemName+'['+v.itemCode+']</td>\n\
        <td>'+v.startDate+' ～ '+ed+'</td>\n\
        <td>'+accounting.formatNumber(v.amount)+'</td>\n\
        <td>'+accounting.formatNumber(v.rentAmount)+'</td></tr>')
                        })
                    } else {
                        $('#investmentContractAccounttermPropertyMgmt').hide();
                    }
                    
                    if(oldContractInfo.promotionFeeList.length > 0){
                        $.each(oldContractInfo.promotionFeeList, function(i,v) {
                            $('#promotionBefore').append('<tr>\n\
    <td>'+v.itemName+'['+v.itemCode+']</td>\n\
    <td>'+v.startDate+' ～ '+v.endDate+'</td>\n\
    <td>'+accounting.formatNumber(v.amount)+'</td>\n\
    <td>'+accounting.formatNumber(v.taxAmount)+'</td></tr>')
                        })
                        
                        $.each(data.promotionFeeList, function(i,v) {
                            var ed = v.endDate;
                            if(v.endDate == data.cancelDate){
                                ed = '<span style="color: #E43C24;">'+ed+'</span>';
                            }
                            $('#promotionAfter').append('<tr>\n\
        <td>'+v.itemName+'['+v.itemCode+']</td>\n\
        <td>'+v.startDate+' ～ '+ed+'</td>\n\
        <td>'+accounting.formatNumber(v.amount)+'</td>\n\
        <td>'+accounting.formatNumber(v.taxAmount)+'</td></tr>')
                        })
                    } else {
                        $('#investmentContractAccounttermPromotion').hide();
                    }
                    
                    if(data.depositList.length > 0){
                        $.each(data.depositList, function(i,v) {
                            $('#depositBefore, #depositAfter').append('<tr>\n\
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
        url: $.api.baseLotus+"/api/process/inst/form/findAllByBizId?bizId="+getURLParameter('id'),
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