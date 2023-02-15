$.contract = {
    content: {},
    fixedRent: [],
    commission: [],
    propertyMgmt: [],
    promotion: [],
    deposit: []
};

$(document).ready(function(){
    $('#create-form')[0].reset();
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
    
    findTaxInfoByTaxCategories('VAT');
    
    $('.date-picker, .input-daterange').datepicker({
        'language': 'zh-CN',
        'format': 'yyyy-mm-dd',
        'todayBtn': "linked",
        'todayHighlight': true,
        'autoclose': true
    });
    
    $("#openStartTime").timepicker({
        defaultTime:'10:00',
        showMeridian:false
    });
    
    $("#openEndTime").timepicker({
        defaultTime:'22:00',
        showMeridian:false
    });
    
    $('#fixedRentSettleDay_1,#commissionSettleDay_1,#promotionSettleDay_1,#propertyMgmtSettleDay_1').val('25').trigger('change');
    
    $('input.form-control, .select2-selection').click(function(){
        $(this).css('borderColor','#3c8dbc');
    })
    
    $('input.form-control, .select2-selection').blur(function(){
        $(this).css('borderColor','#d2d6de');
    })
    
    $('.input-group input').focus(function(){
        $(this).siblings('.input-group-addon:first').css('borderColor','#3c8dbc');
    })
    
    $('.input-group input').blur(function(){
        $(this).siblings('.input-group-addon:first').css('borderColor','#d2d6de');
    })
    
    // 初始化
    updateDictDropDownByDictTypeCode('RENT_CALCULATION_MODE','selectRentCalculationMode',$.api.rentCalculationMode[0],$.api.rentCalculationMode[1]); // 计租方式
    updateDictDropDownByDictTypeCode('PROFIT_CENTER','profitCenter',$.api.profitCenter[0],$.api.profitCenter[1]); // 利润中心
    updateDictDropDownByDictTypeCode('TERM_CALC_MODE','termCalcMode',$.api.termCalcMode[0],$.api.termCalcMode[1]); // 条款计算方式
    updateDictDropDownByDictTypeCode('POS_MODE','posMode',$.api.posMode[0],$.api.posMode[1]); // 收银方式
    updateDictDropDownByDictTypeCode('CONTRACT_TYPE','contractType',$.api.contractType[0],$.api.contractType[1]); // 合同类型
    updateDictDropDownByDictTypeCode('PAYMENT_MODE','paymentMode',$.api.paymentMode[0],$.api.paymentMode[1]); // 支付方式
    updateDictDropDownByDictTypeCode('CONTRACT_TEMPLATE','contractTemplate',$.api.contractTemplate[0],$.api.contractTemplate[1]); // 合同模版
    updateSelectTenantDropDown(50);
    updateBrandNameDropDown(10);
    findCommissionByDictTypeCode('PRODUCT_CATEGORY'); // 商品分类
    findCommissionByDictTypeCode('DEDUCT_TYPE'); // 全额/差额
    
    findFeeItemByContractType($('#contractType').val()); 
    $('input.money').on('focus',function(){
        $(this).val(accounting.unformat($(this).val()));
        $(this).css('backgroundColor','#fff');
        $(this).select();
        $(this).parent().parent().addClass('success');
    });
    
    $('input.money').on('blur',function(){
        $(this).val(accounting.formatNumber($(this).val()));
        $(this).css('backgroundColor','transparent');
        $(this).parent().parent().removeClass('success');
    });
    
    // change事件
    $("input[id*='fixedRentEndDate_']").on('changeDate',function(){
        calBackPushNextCalendar('fixedRent');
    })
    
    $("input[id*='promotionEndDate_']").on('changeDate',function(){
        calBackPushNextCalendar('promotion');
    })
    
    $("#contractType").change(function(){
        findFeeItemByContractType($('#contractType').val());
    })
    
    updateTaxVAT();
    updateCommissionDropDown('commissionCategoryDropDown','PRODUCT_CATEGORY'); // 商品分类
    updateCommissionDropDown('commissionDeductTypeDropDown','DEDUCT_TYPE'); // 全额/差额
    updateFeeItems('fixedFeeItemDropDown','fixedVATDropDown','fixedRent'); // 固定租金科目
    updateFeeItems('commissionFeeItemDropDown','commissionVATDropDown','deductRent'); // 提成租金科目
    updateFeeItems('propertyMgmtFeeItemDropDown','propertyMgmtVATDropDown','property'); // 物业管理费科目
    updateFeeItems('promotionFeeItemDropDown','promotionVATDropDown','promitionFee'); // 推广费科目

    // 选择计租方式隐藏相关板块
    $("#selectRentCalculationMode").change(function(){
        if($(this).val() == 'fixRent'){
            $('#investmentContractAccounttermCommission').hide();
            $('#investmentContractAccounttermFixed').show();
            $('#commission').find('tr').remove();
            $('#investmentContractAccounttermCompare').hide();
            $('#navbarTop ul li:eq(2)').hide();
        } else if($(this).val() == 'deduct'){
            $('#investmentContractAccounttermFixed').hide();
            $('#investmentContractAccounttermCommission').show();
            $('#fixedRent').find('tr').remove();
            $('#investmentContractAccounttermCompare').hide();
            $('#navbarTop ul li:eq(2)').show();
        } else {
            $('#investmentContractAccounttermFixed').show();
            $('#investmentContractAccounttermCommission').show();
            $('#investmentContractAccounttermCompare').show();
            $('#navbarTop ul li:eq(2)').show();
        }
    })
    
    updateCompareFrequencyDropDown();
    
    $("#activateContract").click(function(){
        if($.contract.content.contractStatus  == 'init') {
            activateCheck($.contract.content.id);
        }
    })
    
    $("#endDate").on('changeDate',function(){
        updateEndDatepicker('fixedRent');
        updateEndDatepicker('commission');
        updateEndDatepicker('propertyMgmt');
        updateEndDatepicker('promotion');
        $('#freeStartDate_1').datepicker('setEndDate',$(this).val());
        $('#freeEndDate_1').datepicker('setEndDate',$(this).val());
        updateContractTemplate();
    })
    
    $("#freeEndDate_1").on('changeDate',function(){
        $('#bizDate').datepicker('update', IncrDate($(this).val()));
    })
    
    findDictCodeByDictTypeCode('RENT_CALCULATION_MODE'); // 计租方式
    findDictCodeByDictTypeCode('CONTRACT_TYPE'); // 合同类型
    findDictCodeByDictTypeCode('PAYMENT_MODE'); // 支付方式
    findDictCodeByDictTypeCode('TERM_CALC_MODE'); // 条款计算方式
    findContractByContractNo();
})

function updateFeeItems(FeeItem,VAT,type) {
    var feeItems  = JSON.parse(sessionStorage.getItem("feeItems"));
    if(feeItems.length > 0){
        $.each(feeItems, function(i,v) {
            if(v.itemType == type){
                $('.'+FeeItem+'.new').append('<option value="'+v.itemCode+'">'+v.itemName+'['+v.itemCode+']</option>');
                if($.inArray($.contract.content.mallCode, $.api.fivePercentFixedRent) != -1){
                    $('.'+VAT+'.newFee').val(v.taxRate).trigger('change');
                    $('#fixedRent .'+VAT+'.newFee').val('0.05').trigger('change');
                } else {
                    $('.'+VAT+'.newFee').val(v.taxRate).trigger('change');
                }
            }
        })
        $('.'+FeeItem+'.new').removeClass('new');
        $("."+VAT+".newFee").removeClass('newFee');
    }
}

function updateContractTemplate() {
    var start = $('#startDate').val(); 
    var end = $('#endDate').val(); 
    if(start != end){
        var diff = calDatesDiff(start, end);
        if(diff > 183){
            updateDictByDictTypeCodeAndVal('CONTRACT_TEMPLATE', 'contractTemplate', '1');
        } else {
            updateDictByDictTypeCodeAndVal('CONTRACT_TEMPLATE', 'contractTemplate', '2');
        }
    }
}

function findContractByContractNo() {
    $.ajax({
        url: $.api.baseLotus+"/api/contract/lotus/findAllByContractNo?contractNo="+getURLParameter('id'),
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
                
                var temp;
                if(response.data.length > 0 && response.data[0].contractStatus == 'init'){
                    var data = response.data[0];
                    $.contract.content = data;
                    
                    $('#deleteContract').click(function(){
                        deleteContractById(data.id);
                    })
                    
                    $('#contractName').text(data.contractName).attr('title',data.contractName);
                    findMainSigningBody(data.mallCode);
                    findContractStatus('CONTRACT_STATUS',data.contractStatus);
                    
                    temp = new Option((data.tenantNo +' | '+ data.tenantName), data.tenantNo, true, true);
                    $('#selectTenant').append(temp).trigger('change');
                    $('#contractNo').val(data.contractNo);
                    $('#sapContractNo').val(data.sapContractNo);
                    $('#approvalName').val((data.approvalName != null ? data.approvalName : 'admin'));
                    $('#investmentContractModelMallSelect').val(data.mallName+'['+data.mallCode+']');
                    
                    updateSelectStoreDropDownByMallCode(10,data.mallCode);
                    temp = new Option((data.unitName +'['+ data.unitCode +'] | '+ data.area + '㎡'), data.unitCode+':::'+data.shopCode+':::'+data.unitName+':::'+data.floorName+':::'+data.floorCode, true, true);
                    $('#selectStore').append(temp).trigger('change');
                    
                    $("#selectStore").change(function(){
                        var selectStoreArea = $('#select2-selectStore-container').text().split(' | ')[1];
                        selectStoreArea = selectStoreArea.split('㎡')[0];
                        $('#area').val(selectStoreArea);
                        var floor = new Option($('#selectStore').val().split(':::')[3], $('#selectStore').val().split(':::')[4], true, true);
                        $('#floor').append(floor).trigger('change');
                        calBackPushFixedRentTaxRentAmount();
                        calBackPushPropertyMgmtTaxRentAmount();
                    })
                    
                    temp = new Option(data.floorName, data.floorCode, true, true);
                    $('#floor').append(temp).trigger('change');
                    $('#contractName2').val(data.contractName);
                    $('#startDate, #compareStartDate_1, #compareStartDate_2').datepicker('update', data.startDate);
                    $('#endDate, #compareEndDate_1, #compareEndDate_2').datepicker('update', data.endDate);
                    
                    if(sessionStorage.getItem("RENT_CALCULATION_MODE") && sessionStorage.getItem("RENT_CALCULATION_MODE") != null && sessionStorage.getItem("RENT_CALCULATION_MODE") != '') {
                        var mode = $.parseJSON(sessionStorage.getItem("RENT_CALCULATION_MODE"));
                        $.each(mode, function(i,v){
                            if(v.dictCode == data.rentCalculationMode){
                                temp = new Option(v.dictName, v.dictCode, true, true);
                                $('#selectRentCalculationMode').append(temp).trigger('change');
                                return false;
                            }
                        })
                    }
                    
                    if(sessionStorage.getItem("CONTRACT_TYPE") && sessionStorage.getItem("CONTRACT_TYPE") != null && sessionStorage.getItem("CONTRACT_TYPE") != '') {
                        var ct = $.parseJSON(sessionStorage.getItem("CONTRACT_TYPE"));
                        $.each(ct, function(i,v){
                            if(v.dictCode == data.contractType){
                                temp = new Option(v.dictName, v.dictCode, true, true);
                                $('#contractType').append(temp).trigger('change');
                                return false;
                            }
                        })
                    }
                    
                    if(sessionStorage.getItem("PAYMENT_MODE") && sessionStorage.getItem("PAYMENT_MODE") != null && sessionStorage.getItem("PAYMENT_MODE") != '') {
                        var pm = $.parseJSON(sessionStorage.getItem("PAYMENT_MODE"));
                        $.each(pm, function(i,v){
                            if(v.dictCode == data.paymentMode){
                                temp = new Option(v.dictName, v.dictCode, true, true);
                                $('#paymentMode').append(temp).trigger('change');
                                return false;
                            }
                        })
                    }
                    
                    if(sessionStorage.getItem("TERM_CALC_MODE") && sessionStorage.getItem("TERM_CALC_MODE") != null && sessionStorage.getItem("TERM_CALC_MODE") != '') {
                        var tcm = $.parseJSON(sessionStorage.getItem("TERM_CALC_MODE"));
                        $.each(tcm, function(i,v){
                            if(v.dictCode == data.termCalcMode){
                                temp = new Option(v.dictName, v.dictCode, true, true);
                                $('#termCalcMode').append(temp).trigger('change');
                                return false;
                            }
                        })
                    }
                    
                    if(data.rentCalculationMode == 'deduct' || data.rentCalculationMode == 'fixedRentAndAddDeduct'){
                        $('#investmentContractAccounttermCommission, #tab_investmentContractAccounttermCommission').show();
                    } else if(data.rentCalculationMode == 'fixedRentAndHigherDeduct'){
                        $('#investmentContractAccounttermCommission, #tab_investmentContractAccounttermCommission, #investmentContractAccounttermCompare').show();
                    }
                    
                    $('.date-picker, .input-daterange').datepicker({
                        'language': 'zh-CN',
                        'format': 'yyyy-mm-dd',
                        'todayBtn': "linked",
                        'todayHighlight': true,
                        'startDate': ($('#startDate').val() != '' ? $('#startDate').val() : ''),
                        'endDate': $('#endDate').val(),
                        'autoclose': true
                    });
                    
                    $("#startDate").on('changeDate',function(){
                        updateStartDatepicker();
                        $('#freeEndDate_1').datepicker('setStartDate',$(this).val());
                        $('#freeEndDate_1').datepicker('update',$(this).val());
                        $("#deliveryDate").datepicker('update', $(this).val());
                        $("#enterDate").datepicker('update', $(this).val());
                        updateContractTemplate();
                    })
                    
                    $("#freeEndDate_1").on('changeDate',function(){
                        $('#bizDate').datepicker('update', IncrDate($(this).val()));
                    })
                    
                    $('#freePeriods').datepicker().on('changeDate', function(e) {
                        var start = $('#freeStartDate_1').val(); 
                        var end = $('#freeEndDate_1').val(); 
                        var diff = calDatesDiff(start, end);
                        $('#freeDays').val(diff); 
                    });
                    
                    $('#freeDays').on('change',function(){
                        if($(this).val() != 0){
                            if($('#freeStartDate_1').val() != '') {
                                $('#freeEndDate_1').datepicker('update',IncrDates($('#freeStartDate_1').val(), parseInt($('#freeDays').val())));
                                $('#bizDate').datepicker('update', IncrDate($('#freeEndDate_1').val()));
                            }
                        } else {
                            $('#freeStartDate_1, #freeEndDate_1').datepicker('update','');
                        }
                    })
                    
                    temp = new Option(data.brandName, data.brandCode, true, true);
                    $('#brandName').append(temp).trigger('change');
                    
                    $('#deliveryDate').datepicker('update', data.deliveryDate);
                    $('#area').val(data.area);
                    $('#bizTypeName').val(data.bizTypeName);
                    $('#bizDate').datepicker('update', data.bizDate);
                    
                    $("#brandName").change(function(){
                        var contractName = $('#select2-brandName-container').text().split('[')[0];
                        $('#contractName2').val(contractName);
                        var bizTypeName = $('#select2-brandName-container').text().split('[')[1];
                        bizTypeName = bizTypeName.split(']')[0];
                        $('#bizTypeName').val(bizTypeName);
                    })
                    
                    $('#awardDate').datepicker('update', data.awardDate);
                    $('#bizScope').val(data.bizScope);
                    $('#targetSales').val(data.targetSales);
                    $('#overdueBizAmount').val(data.overdueBizAmount);
                    $('#enterDate').datepicker('update', data.enterDate);
                    $('#freeStartDate_1').datepicker('update', data.freeStartDate);
                    $('#freeEndDate_1').datepicker('update', data.freeEndDate);
                    $('#openStartTime').val(data.openStartTime);
                    $('#openEndTime').val(data.openEndTime);
                    $('#freeDays').val(data.freeDays);
                    $('#remark').val(data.remark);
                    if(data.contractTemplate != null) {
                        updateDictByDictTypeCodeAndVal('CONTRACT_TEMPLATE', 'contractTemplate', data.contractTemplate);
                    }
                    
                    $('#compareFirstFrequency').val(data.firstCompareCycle).trigger('change');
                    if(data.secondCompareFlag == '1'){
                        $('#compareSecond').prop('checked', 'checked');
                    }
                    $('#compareSecondFrequency').val(data.secondCompareCycle).trigger('change');
                    $('#compareSecondValue').val(data.secondCompareValueType).trigger('change');
                    
                    if(data.fixedRentList != null && data.fixedRentList.length > 0) {
                        $.contract.fixedRent = data.fixedRentList;
                        $.each(data.fixedRentList, function(i,v) {
                            updateRowInvestmentContractAccounttermFixed(JSON.stringify(v));
                        })
                        
                        $('#fixedRentPeriodType_1').val(data.fixedRentList[0].periodTypeCode).trigger('change');
                        
                        $('#fixedRentSettleDay_1').val(data.fixedRentList[0].settleDay).trigger('change');
                                                
                        $('#fixedRentSettlePeriod_1').val(data.fixedRentList[0].settlePeriodCode).trigger('change');
                        
                        if(data.fixedRentList[0].isOverdueFlag == 1) {
                            $('#fixedRentIsOverdueFlag_1').prop('checked', true);
                        } else {
                            $('#fixedRentIsOverdueFlag_1').prop('checked', false);
                        }
                        
                        $('#fixedRentOverdueTaxRate_1').val(data.fixedRentList[0].overdueTaxRate).trigger('change');
                        
                        
                        $('#fixedRentOverdueRate_1').val(parseFloat(data.fixedRentList[0].overdueRate * 1000));
                        
                        if(data.fixedRentList[0].overdueInvoiceFlag == 1) {
                            $('#fixedRentOverdueInvoiceFlag_1').prop('checked', true);
                        } else {
                            $('#fixedRentOverdueInvoiceFlag_1').prop('checked', false);
                        }
                        
                        if(data.salesList != null && data.salesList.length > 0) {                        
                            $.each(data.salesList, function(i,v) {
                                updateRowMinSales('fixedRent', i, JSON.stringify(v));
                            })
                        }
                    }
                    
                    if(data.deductList != null && data.deductList.length > 0) {
                        $.contract.commission = data.deductList;
                        $.each(data.deductList, function(i,v) {
                            updateRowInvestmentContractAccounttermCommission(JSON.stringify(v));
                        })
                        
                        $('#commissionPeriodType_1').val(data.deductList[0].periodTypeCode).trigger('change');
                        
                        $('#commissionSettleDay_1').val(data.deductList[0].settleDay).trigger('change');
                                                
                        $('#commissionSettlePeriod_1').val(data.deductList[0].settlePeriodCode).trigger('change');
                        
                        if(data.deductList[0].isOverdueFlag == 1) {
                            $('#commissionIsOverdueFlag_1').prop('checked', true);
                        } else {
                            $('#commissionIsOverdueFlag_1').prop('checked', false);
                        }
                        
                        $('#commissionOverdueTaxRate_1').val(data.deductList[0].overdueTaxRate).trigger('change');
                        
                        
                        $('#commissionOverdueRate_1').val(parseFloat(data.deductList[0].overdueRate * 1000));
                        
                        if(data.deductList[0].overdueInvoiceFlag == 1) {
                            $('#commissionOverdueInvoiceFlag_1').prop('checked', true);
                        } else {
                            $('#commissionOverdueInvoiceFlag_1').prop('checked', false);
                        }
                        
                        if(data.salesList != null && data.salesList.length > 0) {                        
                            $.each(data.salesList, function(i,v) {
                                updateRowMinSales('commission', i, JSON.stringify(v));
                            })
                        }
                    }
                    
                    if(data.propertyFeeList != null && data.propertyFeeList.length > 0) {
                        $.contract.propertyMgmt = data.propertyFeeList;
                        $.each(data.propertyFeeList, function(i,v) {
                            updateRowInvestmentContractAccounttermPropertyMgmt(JSON.stringify(v));
                        })
                        
                        $('#propertyMgmtPeriodType_1').val(data.propertyFeeList[0].periodTypeCode).trigger('change');
                        
                        $('#propertyMgmtSettleDay_1').val(data.propertyFeeList[0].settleDay).trigger('change');
                                                
                        $('#propertyMgmtSettlePeriod_1').val(data.propertyFeeList[0].settlePeriodCode).trigger('change');
                        
                        if(data.propertyFeeList[0].isOverdueFlag == 1) {
                            $('#propertyMgmtIsOverdueFlag_1').prop('checked', true);
                        } else {
                            $('#propertyMgmtIsOverdueFlag_1').prop('checked', false);
                        }
                        
                        $('#propertyMgmtOverdueTaxRate_1').val(data.propertyFeeList[0].overdueTaxRate).trigger('change');
                        
                        
                        $('#propertyMgmtOverdueRate_1').val(parseFloat(data.propertyFeeList[0].overdueRate * 1000));
                        
                        if(data.propertyFeeList[0].overdueInvoiceFlag == 1) {
                            $('#propertyMgmtOverdueInvoiceFlag_1').prop('checked', true);
                        } else {
                            $('#propertyMgmtOverdueInvoiceFlag_1').prop('checked', false);
                        }
                    }
                    
                    if(data.promotionFeeList != null && data.promotionFeeList.length > 0) {
                        $.contract.promotion = data.promotionFeeList;
                        $.each(data.promotionFeeList, function(i,v) {
                            updateRowInvestmentContractAccounttermPromotion(JSON.stringify(v));
                        })
                        
                        $('#promotionPeriodType_1').val(data.promotionFeeList[0].periodTypeCode).trigger('change');
                        
                        $('#promotionSettleDay_1').val(data.promotionFeeList[0].settleDay).trigger('change');
                                                
                        $('#promotionSettlePeriod_1').val(data.promotionFeeList[0].settlePeriodCode).trigger('change');
                        
                        if(data.promotionFeeList[0].isOverdueFlag == 1) {
                            $('#promotionIsOverdueFlag_1').prop('checked', true);
                        } else {
                            $('#promotionIsOverdueFlag_1').prop('checked', false);
                        }
                        
                        $('#promotionOverdueTaxRate_1').val(data.promotionFeeList[0].overdueTaxRate).trigger('change');
                        
                        
                        $('#promotionOverdueRate_1').val(parseFloat(data.promotionFeeList[0].overdueRate * 1000));
                        
                        if(data.promotionFeeList[0].overdueInvoiceFlag == 1) {
                            $('#promotionOverdueInvoiceFlag_1').prop('checked', true);
                        } else {
                            $('#promotionOverdueInvoiceFlag_1').prop('checked', false);
                        }
                    }
                    
                    if(data.depositList != null && data.depositList.length > 0) {
                        $.contract.deposit = data.depositList;
                        $.each(data.depositList, function(i,v) {
                            updateRowInvestmentContractDepositterm(JSON.stringify(v));
                        })
                    }
                    
                    if(data.totalRentAmount != null && data.taxTotalRentAmount != null){
                        $('#fixedRentTotalRentAmount').text(accounting.formatNumber(data.totalRentAmount));
                        $('#fixedRentTaxTotalRentAmount').text(accounting.formatNumber(data.taxTotalRentAmount));
                    } 
                    
                    if(data.totalPropertyAmount != null && data.taxTotalPropertyAmount != null){
                        $('#propertyMgmtTotalPropertyAmount').text(accounting.formatNumber(data.totalPropertyAmount));
                        $('#propertyMgmtTaxTotalPropertyAmount').text(accounting.formatNumber(data.taxTotalPropertyAmount));
                    }
                    
                    if(data.totalDeductAmount != null && data.taxTotalDeductAmount != null){
                        $('#commissionTotalDeductAmount').text(accounting.formatNumber(data.totalDeductAmount));
                        $('#commissionTaxTotalDeductAmount').text(accounting.formatNumber(data.taxTotalDeductAmount));
                    } 
                    
                    if(data.totalPromotionAmount != null && data.taxTotalPromotionAmount != null){
                        $('#promotionTotalPromotionAmount').text(accounting.formatNumber(data.totalPromotionAmount));
                        $('#promotionTaxTotalPromotionAmount').text(accounting.formatNumber(data.taxTotalPromotionAmount));
                    }
                    
                    $('input.money').each(function(){
                        $(this).val(accounting.formatNumber($(this).val()));
                    })
                } else {
                    alertMsg('9999','模块加载错误，该错误由【签约编号或版本号错误】导致！');
                }
            } else {
                alertMsg(response.code,response.customerMessage);
            }
        }
    })
}

function findContractStatus(dictTypeCode, val) {
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
                    $.each(response.data.dictDataList, function(i,v){
                        if(v.dictCode == val){
                            $('#contractStatus').text(v.dictName);
                            return false;
                        }
                    })
                }
            }                             
        }
    })
}

function updateRowInvestmentContractAccounttermFixed(v) {
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
    var column11 = createRowColumn(newrow);
    
    var table = document.getElementById('investmentContractAccounttermFixed');
    var tbody = table.querySelector('tbody') || table;
    var count = tbody.getElementsByTagName('tr').length + 1;
    column1.innerText = count.toLocaleString();
    
    var select = document.createElement("select"); //费用项
    select.setAttribute("class","select2 fixedFeeItemDropDown new");
    select.setAttribute("id","fixedRentItem_"+count.toLocaleString());
    column2.appendChild(select);
    
    var div = document.createElement("div"); //期限
    div.setAttribute("class","input-daterange input-group");
    var input = document.createElement("input");
    input.setAttribute("class","form-control");
    input.setAttribute("id","fixedRentStartDate_"+count.toLocaleString());
    input.setAttribute("type","text");
    input.setAttribute("style","min-width: 80px");
    input.setAttribute("readonly","");
    input.setAttribute("value",value.startDate);
    div.appendChild(input);
    var icon = document.createElement("i");
    icon.setAttribute("class", "fa fa-calendar");
    var span = document.createElement("span");
    span.setAttribute("class", "input-group-addon");
    span.appendChild(icon);
    div.appendChild(span);
    var to = document.createElement("span");
    to.innerText = "-";
    to.setAttribute("class", "input-group-addon");
    div.appendChild(to);
    var div2 = document.createElement("div");
    div2.setAttribute("class","input-group");
    var input2 = document.createElement("input");
    input2.setAttribute("class","form-control");
    input2.setAttribute("id","fixedRentEndDate_"+count.toLocaleString());
    input2.setAttribute("type","text");
    input2.setAttribute("style","min-width: 80px");
    input2.setAttribute("readonly","");
    input2.setAttribute("value",value.endDate);
    div2.appendChild(input2);
    var icon2 = document.createElement("i");
    icon2.setAttribute("class", "fa fa-calendar");
    var span2 = document.createElement("span");
    span2.setAttribute("class", "input-group-addon");
    span2.appendChild(icon2);
    div2.appendChild(span2);
    div.appendChild(div2);
    column3.appendChild(div);
    
    var div = document.createElement("div"); //去税单价
    div.setAttribute("class","input-group");
    var input = document.createElement("input");
    input.setAttribute("class","form-control money");
    input.setAttribute("id","fixedRentTaxRentAmount_"+count.toLocaleString());
    input.setAttribute("type","text");
    input.setAttribute("value",value.taxRentAmount);
    div.appendChild(input);
    var percent = document.createElement("span");
    percent.innerText = "元/m²/天";
    percent.setAttribute("class", "input-group-addon");
    div.appendChild(percent);
    column4.appendChild(div);
    
    var div = document.createElement("div"); //去税金额
    div.setAttribute("class","input-group");
    var input = document.createElement("input");
    input.setAttribute("class","form-control money");
    input.setAttribute("id","fixedRentTaxAmount_"+count.toLocaleString());
    input.setAttribute("type","text");
    input.setAttribute("value",value.taxAmount);
    div.appendChild(input);
    var percent = document.createElement("span");
    percent.innerText = "元";
    percent.setAttribute("class", "input-group-addon");
    div.appendChild(percent);
    column5.appendChild(div);
    
    var div = document.createElement("div"); //含税金额
    div.setAttribute("class","input-group");
    var input = document.createElement("input");
    input.setAttribute("class","form-control money");
    input.setAttribute("id","fixedRentAmount_"+count.toLocaleString());
    input.setAttribute("type","text");
    input.setAttribute("value",value.amount);
    div.appendChild(input);
    var percent = document.createElement("span");
    percent.innerText = "元";
    percent.setAttribute("class", "input-group-addon");
    div.appendChild(percent);
    column6.appendChild(div);
    
    var div = document.createElement("div"); //含税单价
    div.setAttribute("class","input-group");
    var input = document.createElement("input");
    input.setAttribute("class","form-control money");
    input.setAttribute("id","fixedRentRentAmount_"+count.toLocaleString());
    input.setAttribute("type","text");
    input.setAttribute("value",value.rentAmount);
    div.appendChild(input);
    var percent = document.createElement("span");
    percent.innerText = "元/m²/天";
    percent.setAttribute("class", "input-group-addon");
    div.appendChild(percent);
    column7.appendChild(div);
    
    var div = document.createElement("div"); //预估营业额
    div.setAttribute("class","input-group");
    var input = document.createElement("input");
    input.setAttribute("class","form-control money");
    input.setAttribute("id","fixedRentMinSalesAmount_"+count.toLocaleString());
    input.setAttribute("type","text");
    input.setAttribute("value","0");
    div.appendChild(input);
    var percent = document.createElement("span");
    percent.innerText = "元/月";
    percent.setAttribute("class", "input-group-addon");
    div.appendChild(percent);
    column8.appendChild(div);
    
    var select = document.createElement("select"); //税率
    select.setAttribute("class","select2 taxVat newVAT fixedVATDropDown newFee");
    select.setAttribute("id","fixedRentTaxRate_"+count.toLocaleString());
    column9.appendChild(select);
    
    var checkbox = document.createElement("input"); //是否开发票
    checkbox.setAttribute("id","fixedRentInvoiceFlag_"+count.toLocaleString());
    checkbox.setAttribute("type", "checkbox");
    if(value.invoiceFlag == 1){
        checkbox.setAttribute("checked", "");
    }
    column10.appendChild(checkbox);
    
    var remove = document.createElement("a");
    remove.setAttribute("href", "javascript:void(0);");
    remove.setAttribute("onClick", "deleteRow(this)");
    var icon = document.createElement("i");
    icon.setAttribute("class", "fa fa-minus-circle");
    icon.setAttribute("style", "color: #ED4A52; font-size: 16px;");
    remove.appendChild(icon);
    column11.appendChild(remove);

    tbody.appendChild(newrow);
    updateTaxVAT();
    updateFeeItems('fixedFeeItemDropDown','fixedVATDropDown','fixedRent');
    $('#investmentContractAccounttermFixed .input-daterange').datepicker({
        'language': 'zh-CN',
        'format': 'yyyy-mm-dd',
        'todayHighlight': true,
        'startDate': $('#startDate').val(),
        'endDate': $('#endDate').val(),
        'autoclose': true
    });
    
    $('#investmentContractAccounttermFixed .select2').select2();
    $("#fixedRentItem_"+count.toLocaleString()).val(value.itemCode).trigger("change");
    $("#fixedRentTaxRate_"+count.toLocaleString()).val(value.taxRate).trigger("change");
 
    $('input.money').on('focus',function(){
        $(this).val(accounting.unformat($(this).val()));
        $(this).css('backgroundColor','#fff');
        $(this).select();
        $(this).parent().parent().addClass('success');
    });
    
    $('input.money').on('blur',function(){
        $(this).val(accounting.formatNumber($(this).val()));
        $(this).css('backgroundColor','transparent');
        $(this).parent().parent().removeClass('success');
    });
    
    $("#fixedRentEndDate_"+count.toLocaleString()).on('changeDate',function(){
        calBackPushNextCalendar('fixedRent');
    })
    
    $("#fixedRentTaxRentAmount_"+count.toLocaleString()).on('change',function(){
        calBackPushFixedRentTaxRentAmount();
    })
    
    $("#fixedRentTaxAmount_"+count.toLocaleString()).on('change',function(){
        calBackPushFixedRentTaxAmount();
    })
    
    $("#fixedRentAmount_"+count.toLocaleString()).on('change',function(){
        calBackPushFixedRentAmount();
    })
    
    $("#fixedRentRentAmount_"+count.toLocaleString()).on('change',function(){
        calBackPushFixedRentRentAmount();
    })
    
    $("#fixedRentTaxRate_"+count.toLocaleString()).on('change',function(){
        calBackPushFixedRentSingleRow($(this).attr('id').split('_')[1]);
    })
}

function updateRowInvestmentContractAccounttermCommission(v) {
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
    var column11 = createRowColumn(newrow);
    var column12 = createRowColumn(newrow);
    var column13 = createRowColumn(newrow);
    
    var table = document.getElementById('investmentContractAccounttermCommission');
    var tbody = table.querySelector('tbody') || table;
    var count = tbody.getElementsByTagName('tr').length + 1;
    column1.innerText = count.toLocaleString();
    
    var select = document.createElement("select"); //费用项
    select.setAttribute("class","select2 commissionFeeItemDropDown new");
    select.setAttribute("id","commissionItem_"+count.toLocaleString());
    column2.appendChild(select);
    
    var div = document.createElement("div"); //期限
    div.setAttribute("class","input-daterange input-group");
    var input = document.createElement("input");
    input.setAttribute("class","form-control");
    input.setAttribute("id","commissionStartDate_"+count.toLocaleString());
    input.setAttribute("type","text");
    input.setAttribute("style","min-width: 80px");
    input.setAttribute("readonly","");
    input.setAttribute("value",value.startDate);
    div.appendChild(input);
    var icon = document.createElement("i");
    icon.setAttribute("class", "fa fa-calendar");
    var span = document.createElement("span");
    span.setAttribute("class", "input-group-addon");
    span.appendChild(icon);
    div.appendChild(span);
    var to = document.createElement("span");
    to.innerText = "-";
    to.setAttribute("class", "input-group-addon");
    div.appendChild(to);
    var div2 = document.createElement("div");
    div2.setAttribute("class","input-group");
    var input2 = document.createElement("input");
    input2.setAttribute("class","form-control");
    input2.setAttribute("id","commissionEndDate_"+count.toLocaleString());
    input2.setAttribute("type","text");
    input2.setAttribute("style","min-width: 80px");
    input2.setAttribute("readonly","");
    input2.setAttribute("value",value.endDate);
    div2.appendChild(input2);
    var icon2 = document.createElement("i");
    icon2.setAttribute("class", "fa fa-calendar");
    var span2 = document.createElement("span");
    span2.setAttribute("class", "input-group-addon");
    span2.appendChild(icon2);
    div2.appendChild(span2);
    div.appendChild(div2);
    column3.appendChild(div);
    
    var select = document.createElement("select"); //扣率类型
    select.setAttribute("class","select2 commissionDeductTypeDropDown new");
    select.setAttribute("id","commissionDeductType_"+count.toLocaleString());
    column4.appendChild(select);
    
    var select = document.createElement("select"); //商品分类
    select.setAttribute("class","select2 commissionCategoryDropDown new");
    select.setAttribute("id","commissionCategory_"+count.toLocaleString());
    column5.appendChild(select);
    
    var div = document.createElement("div"); //去税扣率
    div.setAttribute("class","input-group");
    var input = document.createElement("input");
    input.setAttribute("class","form-control money");
    input.setAttribute("id","commissionTaxDeduct_"+count.toLocaleString());
    input.setAttribute("type","text");
    input.setAttribute("value",(parseFloat(value.taxDeduct) * 100));
    div.appendChild(input);
    var percent = document.createElement("span");
    percent.innerText = "%";
    percent.setAttribute("class", "input-group-addon");
    div.appendChild(percent);
    column6.appendChild(div);
    
    var div = document.createElement("div"); //含税扣率
    div.setAttribute("class","input-group");
    var input = document.createElement("input");
    input.setAttribute("class","form-control money");
    input.setAttribute("id","commissionDeduct_"+count.toLocaleString());
    input.setAttribute("type","text");
    input.setAttribute("value",(parseFloat(value.deduct) * 100));
    div.appendChild(input);
    var percent = document.createElement("span");
    percent.innerText = "%";
    percent.setAttribute("class", "input-group-addon");
    div.appendChild(percent);
    column7.appendChild(div);
    
    var div = document.createElement("div"); //营业额上限
    div.setAttribute("class","input-group");
    var input = document.createElement("input");
    input.setAttribute("class","form-control money");
    input.setAttribute("id","commissionAmount_"+count.toLocaleString());
    input.setAttribute("type","text");
    input.setAttribute("value",value.amount);
    div.appendChild(input);
    var percent = document.createElement("span");
    percent.innerText = "元/年";
    percent.setAttribute("class", "input-group-addon");
    div.appendChild(percent);
    column8.appendChild(div);
    
    var div = document.createElement("div"); //保底营业额
    div.setAttribute("class","input-group");
    var input = document.createElement("input");
    input.setAttribute("class","form-control money");
    input.setAttribute("id","commissionMinSales_"+count.toLocaleString());
    input.setAttribute("type","text");
    input.setAttribute("value",value.targetSales);
    div.appendChild(input);
    var percent = document.createElement("span");
    percent.innerText = "元/月";
    percent.setAttribute("class", "input-group-addon");
    div.appendChild(percent);
    column9.appendChild(div);
    
    var div = document.createElement("div"); //预估营业额
    div.setAttribute("class","input-group");
    var input = document.createElement("input");
    input.setAttribute("class","form-control money");
    input.setAttribute("id","commissionMinSalesAmount_"+count.toLocaleString());
    input.setAttribute("type","text");
    input.setAttribute("value","0");
    div.appendChild(input);
    var percent = document.createElement("span");
    percent.innerText = "元/月";
    percent.setAttribute("class", "input-group-addon");
    div.appendChild(percent);
    column10.appendChild(div);
    
    var select = document.createElement("select"); //税率
    select.setAttribute("class","select2 taxVat newVAT commissionVATDropDown newFee");
    select.setAttribute("id","commissionTaxRate_"+count.toLocaleString());
    column11.appendChild(select);
    
    var checkbox = document.createElement("input"); //是否开发票
    checkbox.setAttribute("id","commissionInvoiceFlag_"+count.toLocaleString());
    checkbox.setAttribute("type", "checkbox");
    if(value.invoiceFlag == 1){
        checkbox.setAttribute("checked", "");
    }
    column12.appendChild(checkbox);
    
    var remove = document.createElement("a");
    remove.setAttribute("href", "javascript:void(0);");
    remove.setAttribute("onClick", "deleteRow(this)");
    var icon = document.createElement("i");
    icon.setAttribute("class", "fa fa-minus-circle");
    icon.setAttribute("style", "color: #ED4A52; font-size: 16px;");
    remove.appendChild(icon);
    column13.appendChild(remove);

    tbody.appendChild(newrow);
    updateTaxVAT();
    updateCommissionDropDown('commissionCategoryDropDown','PRODUCT_CATEGORY'); // 商品分类
    updateCommissionDropDown('commissionDeductTypeDropDown','DEDUCT_TYPE'); // 全额/差额
    updateFeeItems('commissionFeeItemDropDown','commissionVATDropDown','deductRent');
    $('#investmentContractAccounttermCommission .input-daterange').datepicker({
        'language': 'zh-CN',
        'format': 'yyyy-mm-dd',
        'todayHighlight': true,
        'startDate': $('#startDate').val(),
        'endDate': $('#endDate').val(),
        'autoclose': true
    });
    
    $("#commissionItem_"+count.toLocaleString()).val(value.itemCode).trigger("change");
    $('#investmentContractAccounttermCommission .select2').select2();
    $("#commissionDeductType_"+count.toLocaleString()).val(value.deductType).trigger("change");
    $("#commissionTaxRate_"+count.toLocaleString()).val(value.taxRate).trigger("change");
 
    $('input.money').on('focus',function(){
        $(this).val(accounting.unformat($(this).val()));
        $(this).css('backgroundColor','#fff');
        $(this).select();
        $(this).parent().parent().addClass('success');
    });
    
    $('input.money').on('blur',function(){
        $(this).val(accounting.formatNumber($(this).val()));
        $(this).css('backgroundColor','transparent');
        $(this).parent().parent().removeClass('success');
    });

    $("#commissionTaxDeduct_"+count.toLocaleString()).on('change',function(){
        calBackPushCommissionDeduct();
    })
    
    $("#commissionDeduct_"+count.toLocaleString()).on('change',function(){
        calBackPushCommissionTaxDeduct();
    })
    
    $("#commissionTaxRate_"+count.toLocaleString()).on('change',function(){
        calBackPushCommissionSingleRow($(this).attr('id').split('_')[1]);
    })
}

function updateRowInvestmentContractAccounttermPropertyMgmt(v) {
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
    
    var table = document.getElementById('investmentContractAccounttermPropertyMgmt');
    var tbody = table.querySelector('tbody') || table;
    var count = tbody.getElementsByTagName('tr').length + 1;
    column1.innerText = count.toLocaleString();
    
    var select = document.createElement("select"); //费用项
    select.setAttribute("class","select2 propertyMgmtFeeItemDropDown new");
    select.setAttribute("id","propertyMgmtItem_"+count.toLocaleString());
    column2.appendChild(select);
    
    var div = document.createElement("div"); //期限
    div.setAttribute("class","input-daterange input-group");
    var input = document.createElement("input");
    input.setAttribute("class","form-control");
    input.setAttribute("id","propertyMgmtStartDate_"+count.toLocaleString());
    input.setAttribute("type","text");
    input.setAttribute("style","min-width: 80px");
    input.setAttribute("readonly","");
    input.setAttribute("value",value.startDate);
    div.appendChild(input);
    var icon = document.createElement("i");
    icon.setAttribute("class", "fa fa-calendar");
    var span = document.createElement("span");
    span.setAttribute("class", "input-group-addon");
    span.appendChild(icon);
    div.appendChild(span);
    var to = document.createElement("span");
    to.innerText = "-";
    to.setAttribute("class", "input-group-addon");
    div.appendChild(to);
    var div2 = document.createElement("div");
    div2.setAttribute("class","input-group");
    var input2 = document.createElement("input");
    input2.setAttribute("class","form-control");
    input2.setAttribute("id","propertyMgmtEndDate_"+count.toLocaleString());
    input2.setAttribute("type","text");
    input2.setAttribute("style","min-width: 80px");
    input2.setAttribute("readonly","");
    input2.setAttribute("value",value.endDate);
    div2.appendChild(input2);
    var icon2 = document.createElement("i");
    icon2.setAttribute("class", "fa fa-calendar");
    var span2 = document.createElement("span");
    span2.setAttribute("class", "input-group-addon");
    span2.appendChild(icon2);
    div2.appendChild(span2);
    div.appendChild(div2);
    column3.appendChild(div);
    
    var div = document.createElement("div"); //去税单价
    div.setAttribute("class","input-group");
    var input = document.createElement("input");
    input.setAttribute("class","form-control money");
    input.setAttribute("id","propertyMgmtTaxRentAmount_"+count.toLocaleString());
    input.setAttribute("type","text");
    input.setAttribute("value",value.taxRentAmount);
    div.appendChild(input);
    var percent = document.createElement("span");
    percent.innerText = "元/m²/月";
    percent.setAttribute("class", "input-group-addon");
    div.appendChild(percent);
    column4.appendChild(div);
    
    var div = document.createElement("div"); //去税金额
    div.setAttribute("class","input-group");
    var input = document.createElement("input");
    input.setAttribute("class","form-control money");
    input.setAttribute("id","propertyMgmtTaxAmount_"+count.toLocaleString());
    input.setAttribute("type","text");
    input.setAttribute("value",value.taxAmount);
    div.appendChild(input);
    var percent = document.createElement("span");
    percent.innerText = "元";
    percent.setAttribute("class", "input-group-addon");
    div.appendChild(percent);
    column5.appendChild(div);
    
    var div = document.createElement("div"); //含税金额
    div.setAttribute("class","input-group");
    var input = document.createElement("input");
    input.setAttribute("class","form-control money");
    input.setAttribute("id","propertyMgmtAmount_"+count.toLocaleString());
    input.setAttribute("type","text");
    input.setAttribute("value",value.amount);
    div.appendChild(input);
    var percent = document.createElement("span");
    percent.innerText = "元";
    percent.setAttribute("class", "input-group-addon");
    div.appendChild(percent);
    column6.appendChild(div);
    
    var div = document.createElement("div"); //含税单价
    div.setAttribute("class","input-group");
    var input = document.createElement("input");
    input.setAttribute("class","form-control money");
    input.setAttribute("id","propertyMgmtRentAmount_"+count.toLocaleString());
    input.setAttribute("type","text");
    input.setAttribute("value",value.rentAmount);
    div.appendChild(input);
    var percent = document.createElement("span");
    percent.innerText = "元/m²/月";
    percent.setAttribute("class", "input-group-addon");
    div.appendChild(percent);
    column7.appendChild(div);
    
    var select = document.createElement("select"); //税率
    select.setAttribute("class","select2 taxVat newVAT propertyMgmtVATDropDown newFee");
    select.setAttribute("id","propertyMgmtTaxRate_"+count.toLocaleString());
    column8.appendChild(select);
    
    var checkbox = document.createElement("input"); //是否开发票
    checkbox.setAttribute("id","propertyMgmtInvoiceFlag_"+count.toLocaleString());
    checkbox.setAttribute("type", "checkbox");
    if(value.invoiceFlag == 1){
        checkbox.setAttribute("checked", "");
    }
    column9.appendChild(checkbox);
    
    var remove = document.createElement("a");
    remove.setAttribute("href", "javascript:void(0);");
    remove.setAttribute("onClick", "deleteRow(this)");
    var icon = document.createElement("i");
    icon.setAttribute("class", "fa fa-minus-circle");
    icon.setAttribute("style", "color: #ED4A52; font-size: 16px;");
    remove.appendChild(icon);
    column10.appendChild(remove);

    tbody.appendChild(newrow);
    updateTaxVAT();
    updateFeeItems('propertyMgmtFeeItemDropDown','propertyMgmtVATDropDown','property');
    $('#investmentContractAccounttermPropertyMgmt .input-daterange').datepicker({
        'language': 'zh-CN',
        'format': 'yyyy-mm-dd',
        'todayHighlight': true,
        'startDate': $('#startDate').val(),
        'endDate': $('#endDate').val(),
        'autoclose': true
    });
    
    $("#propertyMgmtItem_"+count.toLocaleString()).val(value.itemCode).trigger("change");
    $('#investmentContractAccounttermPropertyMgmt .select2').select2();
    $("#propertyMgmtTaxRate_"+count.toLocaleString()).val(value.taxRate).trigger("change");
 
    $('input.money').on('focus',function(){
        $(this).val(accounting.unformat($(this).val()));
        $(this).css('backgroundColor','#fff');
        $(this).select();
        $(this).parent().parent().addClass('success');
    });
    
    $('input.money').on('blur',function(){
        $(this).val(accounting.formatNumber($(this).val()));
        $(this).css('backgroundColor','transparent');
        $(this).parent().parent().removeClass('success');
    });
    
    $("#propertyMgmtTaxRentAmount_"+count.toLocaleString()).on('change',function(){
        calBackPushPropertyMgmtTaxRentAmount();
    })
    
    $("#propertyMgmtTaxAmount_"+count.toLocaleString()).on('change',function(){
        calBackPushPropertyMgmtTaxAmount();
    })
    
    $("#propertyMgmtAmount_"+count.toLocaleString()).on('change',function(){
        calBackPushPropertyMgmtAmount();
    })
    
    $("#propertyMgmtRentAmount_"+count.toLocaleString()).on('change',function(){
        calBackPushPropertyMgmtRentAmount();
    })
    
    $("#propertyMgmtTaxRate_"+count.toLocaleString()).on('change',function(){
        calBackPushPropertyMgmtSingleRow($(this).attr('id').split('_')[1]);
    })
}

function updateRowInvestmentContractAccounttermPromotion(v) {
    var value = JSON.parse(v);
    var newrow = document.createElement("tr");
    var column1 = createRowColumn(newrow);
    var column2 = createRowColumn(newrow);
    var column3 = createRowColumn(newrow);
    var column4 = createRowColumn(newrow);
    var column5 = createRowColumn(newrow);
    //var column6 = createRowColumn(newrow);
    //var column7 = createRowColumn(newrow);
    var column8 = createRowColumn(newrow);
    var column9 = createRowColumn(newrow);
    var column10 = createRowColumn(newrow);
    
    var table = document.getElementById('investmentContractAccounttermPromotion');
    var tbody = table.querySelector('tbody') || table;
    var count = tbody.getElementsByTagName('tr').length + 1;
    column1.innerText = count.toLocaleString();
    
    var select = document.createElement("select"); //费用项
    select.setAttribute("class","select2 promotionFeeItemDropDown new");
    select.setAttribute("id","promotionItem_"+count.toLocaleString());
    column2.appendChild(select);
    
    var div = document.createElement("div"); //期限
    div.setAttribute("class","input-daterange input-group");
    var input = document.createElement("input");
    input.setAttribute("class","form-control");
    input.setAttribute("id","promotionStartDate_"+count.toLocaleString());
    input.setAttribute("type","text");
    input.setAttribute("style","min-width: 80px");
    input.setAttribute("readonly","");
    input.setAttribute("value",value.startDate);
    div.appendChild(input);
    var icon = document.createElement("i");
    icon.setAttribute("class", "fa fa-calendar");
    var span = document.createElement("span");
    span.setAttribute("class", "input-group-addon");
    span.appendChild(icon);
    div.appendChild(span);
    var to = document.createElement("span");
    to.innerText = "-";
    to.setAttribute("class", "input-group-addon");
    div.appendChild(to);
    var div2 = document.createElement("div");
    div2.setAttribute("class","input-group");
    var input2 = document.createElement("input");
    input2.setAttribute("class","form-control");
    input2.setAttribute("id","promotionEndDate_"+count.toLocaleString());
    input2.setAttribute("type","text");
    input2.setAttribute("style","min-width: 80px");
    input2.setAttribute("readonly","");
    input2.setAttribute("value",value.endDate);
    div2.appendChild(input2);
    var icon2 = document.createElement("i");
    icon2.setAttribute("class", "fa fa-calendar");
    var span2 = document.createElement("span");
    span2.setAttribute("class", "input-group-addon");
    span2.appendChild(icon2);
    div2.appendChild(span2);
    div.appendChild(div2);
    column3.appendChild(div);
    
    var div = document.createElement("div"); //含税金额
    div.setAttribute("class","input-group");
    var input = document.createElement("input");
    input.setAttribute("class","form-control money");
    input.setAttribute("id","promotionAmount_"+count.toLocaleString());
    input.setAttribute("type","text");
    input.setAttribute("value",value.amount);
    div.appendChild(input);
    var percent = document.createElement("span");
    percent.innerText = "元";
    percent.setAttribute("class", "input-group-addon");
    div.appendChild(percent);
    column4.appendChild(div);
    
    var div = document.createElement("div"); //去税金额
    div.setAttribute("class","input-group");
    var input = document.createElement("input");
    input.setAttribute("class","form-control money");
    input.setAttribute("id","promotionTaxAmount_"+count.toLocaleString());
    input.setAttribute("type","text");
    input.setAttribute("readonly","");
    input.setAttribute("style","border: none");
    input.setAttribute("value",value.taxAmount);
    div.appendChild(input);
    var percent = document.createElement("span");
    percent.innerText = "元";
    percent.setAttribute("class", "input-group-addon");
    div.appendChild(percent);
    column5.appendChild(div);
    
    /*var div = document.createElement("div"); //含税扣率
    div.setAttribute("class","input-group");
    var input = document.createElement("input");
    input.setAttribute("class","form-control money");
    input.setAttribute("id","promotionDeduct_"+count.toLocaleString());
    input.setAttribute("type","text");
    input.setAttribute("value",(parseFloat(value.deduct) * 100));
    div.appendChild(input);
    var percent = document.createElement("span");
    percent.innerText = "%";
    percent.setAttribute("class", "input-group-addon");
    div.appendChild(percent);
    column6.appendChild(div);
    
    var div = document.createElement("div"); //去税扣率
    div.setAttribute("class","input-group");
    var input = document.createElement("input");
    input.setAttribute("class","form-control money");
    input.setAttribute("id","promotionTaxDeduct_"+count.toLocaleString());
    input.setAttribute("type","text");
    input.setAttribute("readonly","");
    input.setAttribute("style","border: none");
    input.setAttribute("value",(parseFloat(value.taxDeduct) * 100));
    div.appendChild(input);
    var percent = document.createElement("span");
    percent.innerText = "%";
    percent.setAttribute("class", "input-group-addon");
    div.appendChild(percent);
    column7.appendChild(div);*/
    
    var select = document.createElement("select"); //税率
    select.setAttribute("class","select2 taxVat newVAT promotionVATDropDown newFee");
    select.setAttribute("id","promotionTaxRate_"+count.toLocaleString());
    column8.appendChild(select);
    
    var checkbox = document.createElement("input"); //是否开发票
    checkbox.setAttribute("id","promotionInvoiceFlag_"+count.toLocaleString());
    checkbox.setAttribute("type", "checkbox");
    if(value.invoiceFlag == 1){
        checkbox.setAttribute("checked", "");
    }
    column9.appendChild(checkbox);
    
    var remove = document.createElement("a");
    remove.setAttribute("href", "javascript:void(0);");
    remove.setAttribute("onClick", "deleteRow(this)");
    var icon = document.createElement("i");
    icon.setAttribute("class", "fa fa-minus-circle");
    icon.setAttribute("style", "color: #ED4A52; font-size: 16px;");
    remove.appendChild(icon);
    column10.appendChild(remove);

    tbody.appendChild(newrow);
    updateTaxVAT();
    updateFeeItems('promotionFeeItemDropDown','promotionVATDropDown','promitionFee');
    $('#investmentContractAccounttermPromotion .input-daterange').datepicker({
        'language': 'zh-CN',
        'format': 'yyyy-mm-dd',
        'todayHighlight': true,
        'startDate': $('#startDate').val(),
        'endDate': $('#endDate').val(),
        'autoclose': true
    });
    
    $("#promotionItem_"+count.toLocaleString()).val(value.itemCode).trigger("change");
    $('#investmentContractAccounttermPromotion .select2').select2();    
    $("#promotionTaxRate_"+count.toLocaleString()).val(value.taxRate).trigger("change");
 
    $('input.money').on('focus',function(){
        $(this).val(accounting.unformat($(this).val()));
        $(this).css('backgroundColor','#fff');
        $(this).select();
        $(this).parent().parent().addClass('success');
    });
    
    $('input.money').on('blur',function(){
        $(this).val(accounting.formatNumber($(this).val()));
        $(this).css('backgroundColor','transparent');
        $(this).parent().parent().removeClass('success');
    });
    
    $("#promotionEndDate_"+count.toLocaleString()).on('changeDate',function(){
        calBackPushNextCalendar('promotion');
    })
    
    $("#promotionAmount_"+count.toLocaleString()).on('change',function(){
        calBackPushPromotionAmount();
    })
    
    $("#promotionDeduct_"+count.toLocaleString()).on('change',function(){
        calBackPushPromotionDeduct();
    })
    
    $("#promotionTaxRate_"+count.toLocaleString()).on('change',function(){
        calBackPushPromotionSingleRow($(this).attr('id').split('_')[1]);
    })
}

function updateRowInvestmentContractDepositterm(v) {
    var value = JSON.parse(v);
    var newrow = document.createElement("tr");
    var column1 = createRowColumn(newrow);
    var column2 = createRowColumn(newrow);
    var column3 = createRowColumn(newrow);
    var column4 = createRowColumn(newrow);
    var column5 = createRowColumn(newrow);
    var column6 = createRowColumn(newrow);
    
    var table = document.getElementById('investmentContractDepositterm');
    var tbody = table.querySelector('tbody') || table;
    var count = tbody.getElementsByTagName('tr').length + 1;
    column1.innerText = count.toLocaleString();
    
    var select = document.createElement("select"); //费用项
    select.setAttribute("class","select2");
    select.setAttribute("id","deposittermItem_"+count.toLocaleString());
    select.options[0] = new Option('租赁保证金[E02]','E02');
    select.options[1] = new Option('装修保证金[E03]','E03');
    select.options[2] = new Option('公共事业费押金[E22]','E22');
    column2.appendChild(select);
    
    column3.innerText = '收';
    
    var div = document.createElement("div"); //含税金额
    div.setAttribute("class","input-group");
    var input = document.createElement("input");
    input.setAttribute("class","form-control money");
    input.setAttribute("id","deposittermAmount_"+count.toLocaleString());
    input.setAttribute("type","text");
    input.setAttribute("value",value.amount);
    div.appendChild(input);
    var percent = document.createElement("span");
    percent.innerText = "元";
    percent.setAttribute("class", "input-group-addon");
    div.appendChild(percent);
    column4.appendChild(div);
    
    var div = document.createElement("div"); //最后缴款期
    div.setAttribute("class","input-group");
    var input = document.createElement("input");
    input.setAttribute("class","form-control date-picker");
    input.setAttribute("id","deposittermPaymentDate_"+count.toLocaleString());
    input.setAttribute("type","text");
    input.setAttribute("style","width: 100%");
    input.setAttribute("readonly","");
    div.appendChild(input);
    var icon = document.createElement("i");
    icon.setAttribute("class", "fa fa-calendar");
    var span = document.createElement("span");
    span.setAttribute("class", "input-group-addon");
    span.appendChild(icon);
    div.appendChild(span);
    column5.appendChild(div);
    
    var remove = document.createElement("a");
    remove.setAttribute("href", "javascript:void(0);");
    remove.setAttribute("onClick", "deleteRow(this)");
    var icon = document.createElement("i");
    icon.setAttribute("class", "fa fa-minus-circle");
    icon.setAttribute("style", "color: #ED4A52; font-size: 16px;");
    remove.appendChild(icon);
    column6.appendChild(remove);

    tbody.appendChild(newrow);
    
    $("#deposittermItem_"+count.toLocaleString()).val(value.itemCode).trigger("change");
    $('#investmentContractDepositterm .select2').select2();
    
    $('.date-picker').datepicker({
        'language': 'zh-CN',
        'format': 'yyyy-mm-dd',
        'todayBtn': "linked",
        'todayHighlight': true,
        'autoclose': true
    });
    
    $('#deposittermPaymentDate_'+count.toLocaleString()).datepicker('update', value.paymentDate);
    
    $('input.money').on('focus',function(){
        $(this).val(accounting.unformat($(this).val()));
        $(this).css('backgroundColor','#fff');
        $(this).select();
        $(this).parent().parent().addClass('success');
    });
    
    $('input.money').on('blur',function(){
        $(this).val(accounting.formatNumber($(this).val()));
        $(this).css('backgroundColor','transparent');
        $(this).parent().parent().removeClass('success');
    });
}

function updateRowMinSales(id,index,v) {
    var value = JSON.parse(v);
    $('#'+id+'MinSalesAmount_'+(index*1+1)).val((value.amount || '0'));
}

function saveContractFixedRent() {
    if($("#fixedRent").find("tr").length > 0 && $.contract.content.contractStatus == 'init'){
        Ewin.confirm({ message: "确定要保存固定租金吗？" }).on(function (e) {
            if (!e) {
                return;
            }

            var ind;
            if($.contract.fixedRent.length > 0){
                $.each($.contract.fixedRent, function(i,v) {
                    ind = i * 1 + 1;
                    if(ind > $("#fixedRent").find("tr").length){
                        v.state = 0;
                    }
                })
            }

            var index;
            var len = $("#fixedRent").find("tr").length;
            
            var check1 = dateCompare($('#fixedRentStartDate_1').val(),$('#startDate').val()); //条款开始日与合同开始日比较
            var check2 = dateCompare($('#fixedRentEndDate_'+len).val(),$('#endDate').val()); //条款结束日与合同结束日比较
            var check3 = 'smaller';
            for(var ln = 0; ln < len; ln++){ //条款每一期开始日与结束日比较
                var check33 = dateCompare($('#fixedRentStartDate_'+(ln+1)).val(),$('#fixedRentEndDate_'+(ln+1)).val());
                if(check33 != 'smaller'){
                    check3 = check33;
                }
            }
            var check4 = 'equal';
            for(var ln = 1; ln < len; ln++){ //条款每一期开始日与上一期结束日比较，条款连续性
                var check44 = dateCompare(IncrDate($('#fixedRentEndDate_'+ln).val()), $('#fixedRentStartDate_'+(ln+1)).val());
                if(check44 != 'equal'){
                    check4 = check44;
                }
            }

            if(check1 == 'smaller' || check2 != 'equal' || check3 != 'smaller' || check4 != 'equal') {
                alertMsg('9999','条款开始日与结束日错误，请修改重新提交！');
            } else {
                $("#fixedRent").find("tr").each(function(i,e){
                    var fixedRent = {};
                    index = i * 1 + 1;
                    if(index <= $.contract.fixedRent.length){
                        $.contract.fixedRent[i].itemCode = $('#fixedRentItem_'+index).val();
                        $.contract.fixedRent[i].itemName = $('#select2-fixedRentItem_'+index+'-container').text().split('[')[0];

                        $.contract.fixedRent[i].settlePeriodCode = $('#fixedRentSettlePeriod_1').val();
                        $.contract.fixedRent[i].settlePeriodName = $('#select2-fixedRentSettlePeriod_1-container').text();
                        $.contract.fixedRent[i].periodTypeCode = $('#fixedRentPeriodType_1').val();
                        $.contract.fixedRent[i].periodTypeName = $('#select2-fixedRentPeriodType_1-container').text();
                        $.contract.fixedRent[i].settleDay = $('#fixedRentSettleDay_1').val();
                        if($('#fixedRentIsOverdueFlag_1').prop('checked') == true){
                            $.contract.fixedRent[i].isOverdueFlag = 1;
                        } else {
                            $.contract.fixedRent[i].isOverdueFlag = 0;
                        }
                        $.contract.fixedRent[i].overdueTaxRate = $('#fixedRentOverdueTaxRate_1').val();
                        $.contract.fixedRent[i].overdueRate = parseFloat($('#fixedRentOverdueRate_1').val()) / 1000;
                        if($('#fixedRentOverdueInvoiceFlag_1').prop('checked') == true){
                            $.contract.fixedRent[i].overdueInvoiceFlag = 1;
                        } else {
                            $.contract.fixedRent[i].overdueInvoiceFlag = 0;
                        }

                        $.contract.fixedRent[i].startDate = $('#fixedRentStartDate_'+index).val();
                        $.contract.fixedRent[i].endDate = $('#fixedRentEndDate_'+index).val();

                        $.contract.fixedRent[i].amount =  numberWithoutCommas($('#fixedRentAmount_'+index).val());
                        $.contract.fixedRent[i].taxAmount =  numberWithoutCommas($('#fixedRentTaxAmount_'+index).val());

                        $.contract.fixedRent[i].rentAmount =  numberWithoutCommas($('#fixedRentRentAmount_'+index).val());
                        $.contract.fixedRent[i].taxRentAmount =  numberWithoutCommas($('#fixedRentTaxRentAmount_'+index).val());

                        $.contract.fixedRent[i].taxRate = $('#fixedRentTaxRate_'+index).val();
                        $.contract.fixedRent[i].taxCode = $('#fixedRentTaxRate_'+index).find('option:selected').attr('data-code');

                        if($('#fixedRentInvoiceFlag_'+index).prop('checked') == true){
                            $.contract.fixedRent[i].invoiceFlag = 1;
                        } else {
                            $.contract.fixedRent[i].invoiceFlag = 0;
                        }
                    } else {
                        fixedRent.itemCode = $('#fixedRentItem_'+index).val();
                        fixedRent.itemName = $('#select2-fixedRentItem_'+index+'-container').text().split('[')[0];

                        fixedRent.shopCode = $.contract.content.shopCode;
                        fixedRent.area = $.contract.content.area;

                        fixedRent.settlePeriodCode = $('#fixedRentSettlePeriod_1').val();
                        fixedRent.settlePeriodName = $('#select2-fixedRentSettlePeriod_1-container').text();
                        fixedRent.periodTypeCode = $('#fixedRentPeriodType_1').val();
                        fixedRent.periodTypeName = $('#select2-fixedRentPeriodType_1-container').text();
                        fixedRent.settleDay = $('#fixedRentSettleDay_1').val();
                        if($('#fixedRentIsOverdueFlag_1').prop('checked') == true){
                            fixedRent.isOverdueFlag = 1;
                        } else {
                            fixedRent.isOverdueFlag = 0;
                        }
                        fixedRent.overdueTaxRate = $('#fixedRentOverdueTaxRate_1').val();
                        fixedRent.overdueRate = parseFloat($('#fixedRentOverdueRate_1').val()) / 1000;
                        if($('#fixedRentOverdueInvoiceFlag_1').prop('checked') == true){
                            fixedRent.overdueInvoiceFlag = 1;
                        } else {
                            fixedRent.overdueInvoiceFlag = 0;
                        }

                        fixedRent.startDate = $('#fixedRentStartDate_'+index).val();
                        fixedRent.endDate = $('#fixedRentEndDate_'+index).val();

                        fixedRent.amount =  numberWithoutCommas($('#fixedRentAmount_'+index).val());
                        fixedRent.taxAmount =  numberWithoutCommas($('#fixedRentTaxAmount_'+index).val());

                        fixedRent.rentAmount =  numberWithoutCommas($('#fixedRentRentAmount_'+index).val());
                        fixedRent.taxRentAmount =  numberWithoutCommas($('#fixedRentTaxRentAmount_'+index).val());

                        fixedRent.taxRate = $('#fixedRentTaxRate_'+index).val();
                        fixedRent.taxCode = $('#fixedRentTaxRate_'+index).find('option:selected').attr('data-code');

                        if($('#fixedRentInvoiceFlag_'+index).prop('checked') == true){
                            fixedRent.invoiceFlag = 1;
                        } else {
                            fixedRent.invoiceFlag = 0;
                        }
                        $.contract.fixedRent.push(fixedRent);
                    }
                })
                
                var openId = 'admin';
                $.each(JSON.parse($.cookie('userModules')), function(i,v) {
                    if(v.roleCode == 'CROLE220301000001'){
                        openId = v.moduleName;
                        return false;
                    }
                })

                var map = {
                    "bizId": "",
                    "contractNo": getURLParameter('id'),
                    "contractVersion": 1,
                    "fixedRentList": $.contract.fixedRent,
                    "updateOpenId": openId
                };

                $.ajax({
                    url: $.api.baseLotus+"/api/contract/fixed/rent/saveOrUpdate",
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
                            if(response.data.resultCode == 'SUCCESS') {
                                window.location.href = '/lotus-admin/contract-init?id='+getURLParameter('id')+'&s=succeed';         
                            } else {
                                alertMsg(response.data.resultCode,response.data.resultMsg);
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
        })
    }
}

function saveContractPropertyMgmt() {
    if($("#propertyMgmt").find("tr").length > 0 && $.contract.content.contractStatus == 'init'){
        Ewin.confirm({ message: "确定要保存物业管理费吗？" }).on(function (e) {
            if (!e) {
                return;
            }

            var ind;
            if($.contract.propertyMgmt.length > 0){
                $.each($.contract.propertyMgmt, function(i,v) {
                    ind = i * 1 + 1;
                    if(ind > $("#propertyMgmt").find("tr").length){
                        v.state = 0;
                    }
                })
            }

            var index;
            var len = $("#propertyMgmt").find("tr").length;

            var check1 = dateCompare($('#propertyMgmtStartDate_1').val(),$('#startDate').val()); //条款开始日与合同开始日比较
            var check2 = dateCompare($('#propertyMgmtEndDate_'+len).val(),$('#endDate').val()); //条款结束日与合同结束日比较
            var check3 = 'smaller';
            for(var ln = 0; ln < len; ln++){ //条款每一期开始日与结束日比较
                var check33 = dateCompare($('#propertyMgmtStartDate_'+(ln+1)).val(),$('#propertyMgmtEndDate_'+(ln+1)).val());
                if(check33 != 'smaller'){
                    check3 = check33;
                }
            }
            var check4 = 'equal';
            for(var ln = 1; ln < len; ln++){ //条款每一期开始日与上一期结束日比较，条款连续性
                var check44 = dateCompare(IncrDate($('#propertyMgmtEndDate_'+ln).val()), $('#propertyMgmtStartDate_'+(ln+1)).val());
                if(check44 != 'equal'){
                    check4 = check44;
                }
            }

            if(check1 == 'smaller' || check2 != 'equal' || check3 != 'smaller' || check4 != 'equal') {
                alertMsg('9999','条款开始日与结束日错误，请修改重新提交！');
            } else {
                $("#propertyMgmt").find("tr").each(function(i,e){
                    var propertyMgmt = {};
                    index = i * 1 + 1;
                    if(index <= $.contract.propertyMgmt.length){
                        $.contract.propertyMgmt[i].itemCode = $('#propertyMgmtItem_'+index).val();
                        $.contract.propertyMgmt[i].itemName = $('#select2-propertyMgmtItem_'+index+'-container').text().split('[')[0];

                        $.contract.propertyMgmt[i].settlePeriodCode = $('#propertyMgmtSettlePeriod_1').val();
                        $.contract.propertyMgmt[i].settlePeriodName = $('#select2-propertyMgmtSettlePeriod_1-container').text();
                        $.contract.propertyMgmt[i].periodTypeCode = $('#propertyMgmtPeriodType_1').val();
                        $.contract.propertyMgmt[i].periodTypeName = $('#select2-propertyMgmtPeriodType_1-container').text();
                        $.contract.propertyMgmt[i].settleDay = $('#propertyMgmtSettleDay_1').val();
                        if($('#propertyMgmtIsOverdueFlag_1').prop('checked') == true){
                            $.contract.propertyMgmt[i].isOverdueFlag = 1;
                        } else {
                            $.contract.propertyMgmt[i].isOverdueFlag = 0;
                        }
                        $.contract.propertyMgmt[i].overdueTaxRate = $('#propertyMgmtOverdueTaxRate_1').val();
                        $.contract.propertyMgmt[i].overdueRate = parseFloat($('#propertyMgmtOverdueRate_1').val()) / 1000;
                        if($('#propertyMgmtOverdueInvoiceFlag_1').prop('checked') == true){
                            $.contract.propertyMgmt[i].overdueInvoiceFlag = 1;
                        } else {
                            $.contract.propertyMgmt[i].overdueInvoiceFlag = 0;
                        }

                        $.contract.propertyMgmt[i].startDate = $('#propertyMgmtStartDate_'+index).val();
                        $.contract.propertyMgmt[i].endDate = $('#propertyMgmtEndDate_'+index).val();

                        $.contract.propertyMgmt[i].amount =  numberWithoutCommas($('#propertyMgmtAmount_'+index).val());
                        $.contract.propertyMgmt[i].taxAmount =  numberWithoutCommas($('#propertyMgmtTaxAmount_'+index).val());

                        $.contract.propertyMgmt[i].rentAmount =  numberWithoutCommas($('#propertyMgmtRentAmount_'+index).val());
                        $.contract.propertyMgmt[i].taxRentAmount =  numberWithoutCommas($('#propertyMgmtTaxRentAmount_'+index).val());

                        $.contract.propertyMgmt[i].taxRate = $('#propertyMgmtTaxRate_'+index).val();
                        $.contract.propertyMgmt[i].taxCode = $('#propertyMgmtTaxRate_'+index).find('option:selected').attr('data-code');

                        if($('#propertyMgmtInvoiceFlag_'+index).prop('checked') == true){
                            $.contract.propertyMgmt[i].invoiceFlag = 1;
                        } else {
                            $.contract.propertyMgmt[i].invoiceFlag = 0;
                        }
                    } else {
                        propertyMgmt.itemCode = $('#propertyMgmtItem_'+index).val();
                        propertyMgmt.itemName = $('#select2-propertyMgmtItem_'+index+'-container').text().split('[')[0];

                        propertyMgmt.shopCode = $.contract.content.shopCode;
                        propertyMgmt.area = $.contract.content.area;

                        propertyMgmt.settlePeriodCode = $('#propertyMgmtSettlePeriod_1').val();
                        propertyMgmt.settlePeriodName = $('#select2-propertyMgmtSettlePeriod_1-container').text();
                        propertyMgmt.periodTypeCode = $('#propertyMgmtPeriodType_1').val();
                        propertyMgmt.periodTypeName = $('#select2-propertyMgmtPeriodType_1-container').text();
                        propertyMgmt.settleDay = $('#propertyMgmtSettleDay_1').val();
                        if($('#propertyMgmtIsOverdueFlag_1').prop('checked') == true){
                            propertyMgmt.isOverdueFlag = 1;
                        } else {
                            propertyMgmt.isOverdueFlag = 0;
                        }
                        propertyMgmt.overdueTaxRate = $('#propertyMgmtOverdueTaxRate_1').val();
                        propertyMgmt.overdueRate = parseFloat($('#propertyMgmtOverdueRate_1').val()) / 1000;
                        if($('#propertyMgmtOverdueInvoiceFlag_1').prop('checked') == true){
                            propertyMgmt.overdueInvoiceFlag = 1;
                        } else {
                            propertyMgmt.overdueInvoiceFlag = 0;
                        }

                        propertyMgmt.startDate = $('#propertyMgmtStartDate_'+index).val();
                        propertyMgmt.endDate = $('#propertyMgmtEndDate_'+index).val();

                        propertyMgmt.amount =  numberWithoutCommas($('#propertyMgmtAmount_'+index).val());
                        propertyMgmt.taxAmount =  numberWithoutCommas($('#propertyMgmtTaxAmount_'+index).val());

                        propertyMgmt.rentAmount =  numberWithoutCommas($('#propertyMgmtRentAmount_'+index).val());
                        propertyMgmt.taxRentAmount =  numberWithoutCommas($('#propertyMgmtTaxRentAmount_'+index).val());

                        propertyMgmt.taxRate = $('#propertyMgmtTaxRate_'+index).val();
                        propertyMgmt.taxCode = $('#propertyMgmtTaxRate_'+index).find('option:selected').attr('data-code');

                        if($('#propertyMgmtInvoiceFlag_'+index).prop('checked') == true){
                            propertyMgmt.invoiceFlag = 1;
                        } else {
                            propertyMgmt.invoiceFlag = 0;
                        }
                        $.contract.propertyMgmt.push(propertyMgmt);
                    }
                })
            
                var openId = 'admin';
                $.each(JSON.parse($.cookie('userModules')), function(i,v) {
                    if(v.roleCode == 'CROLE220301000001'){
                        openId = v.moduleName;
                        return false;
                    }
                })

                var map = {
                    "bizId": "",
                    "contractNo": getURLParameter('id'),
                    "contractVersion": 1,
                    "propertyFeeList": $.contract.propertyMgmt,
                    "updateOpenId": openId
                };

                $.ajax({
                    url: $.api.baseLotus+"/api/contract/property/saveOrUpdate",
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
                            if(response.data.resultCode == 'SUCCESS') {
                                window.location.href = '/lotus-admin/contract-init?id='+getURLParameter('id')+'&s=succeed';         
                            } else {
                                alertMsg(response.data.resultCode,response.data.resultMsg);
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
        })
    }
}

function saveContractCommission() {
    if($("#commission").find("tr").length > 0 && $.contract.content.contractStatus == 'init'){
        Ewin.confirm({ message: "确定要保存提成租金吗？" }).on(function (e) {
            if (!e) {
                return;
            }

            var ind;
            if($.contract.commission.length > 0){
                $.each($.contract.commission, function(i,v) {
                    ind = i * 1 + 1;
                    if(ind > $("#commission").find("tr").length){
                        v.state = 0;
                    }
                })
            }

            var index;
            var len = $("#commission").find("tr").length;

            var check1 = dateCompare($('#commissionStartDate_1').val(),$('#startDate').val()); //条款开始日与合同开始日比较
            var check2 = dateCompare($('#commissionEndDate_'+len).val(),$('#endDate').val()); //条款结束日与合同结束日比较
            var check3 = 'smaller';
            for(var ln = 0; ln < len; ln++){ //条款每一期开始日与结束日比较
                var check33 = dateCompare($('#commissionStartDate_'+(ln+1)).val(),$('#commissionEndDate_'+(ln+1)).val());
                if(check33 != 'smaller'){
                    check3 = check33;
                }
            }
            var check4 = 'equal';
            for(var ln = 1; ln < len; ln++){ //条款每一期开始日与上一期结束日比较，条款连续性
                if($('#commissionDeductType_'+ln).val() == "1"){
                    var check44 = dateCompare(IncrDate($('#commissionEndDate_'+ln).val()), $('#commissionStartDate_'+(ln+1)).val());
                    if(check44 != 'equal'){
                        check4 = check44;
                    }
                }
            }

            if(check1 == 'smaller' || check2 != 'equal' || check3 != 'smaller' || check4 != 'equal') {
                alertMsg('9999','条款开始日与结束日错误，请修改重新提交！');
            } else {
                $("#commission").find("tr").each(function(i,e){
                    var commission = {};
                    index = i * 1 + 1;
                    if(index <= $.contract.commission.length){
                        $.contract.commission[i].itemCode = $('#commissionItem_'+index).val();
                        $.contract.commission[i].itemName = $('#select2-commissionItem_'+index+'-container').text().split('[')[0];

                        $.contract.commission[i].salesType = $('#commissionSalesType_1').val();
                        $.contract.commission[i].settlePeriodCode = $('#commissionSettlePeriod_1').val();
                        $.contract.commission[i].settlePeriodName = $('#select2-commissionSettlePeriod_1-container').text();
                        $.contract.commission[i].periodTypeCode = $('#commissionPeriodType_1').val();
                        $.contract.commission[i].periodTypeName = $('#select2-commissionPeriodType_1-container').text();
                        $.contract.commission[i].settleDay = $('#commissionSettleDay_1').val();
                        if($('#commissionIsOverdueFlag_1').prop('checked') == true){
                            $.contract.commission[i].isOverdueFlag = 1;
                        } else {
                            $.contract.commission[i].isOverdueFlag = 0;
                        }
                        $.contract.commission[i].overdueTaxRate = $('#commissionOverdueTaxRate_1').val();
                        $.contract.commission[i].overdueRate = parseFloat($('#commissionOverdueRate_1').val()) / 1000;
                        if($('#commissionOverdueInvoiceFlag_1').prop('checked') == true){
                            $.contract.commission[i].overdueInvoiceFlag = 1;
                        } else {
                            $.contract.commission[i].overdueInvoiceFlag = 0;
                        }

                        $.contract.commission[i].startDate = $('#commissionStartDate_'+index).val();
                        $.contract.commission[i].endDate = $('#commissionEndDate_'+index).val();

                        $.contract.commission[i].deductType = $('#commissionDeductType_'+index).val();
                        $.contract.commission[i].category = $('#commissionCategory_'+index).val();

                        $.contract.commission[i].deduct =  parseFloat(numberWithoutCommas($('#commissionDeduct_'+index).val())) / 100;
                        $.contract.commission[i].taxDeduct =  parseFloat(numberWithoutCommas($('#commissionTaxDeduct_'+index).val())) / 100;

                        $.contract.commission[i].amount =  numberWithoutCommas($('#commissionAmount_'+index).val());
                        $.contract.commission[i].amount =  0;
                        $.contract.commission[i].targetSales =  numberWithoutCommas($('#commissionMinSales_'+index).val());

                        $.contract.commission[i].taxRate = $('#commissionTaxRate_'+index).val();
                        $.contract.commission[i].taxCode = $('#commissionTaxRate_'+index).find('option:selected').attr('data-code');

                        if($('#commissionInvoiceFlag_'+index).prop('checked') == true){
                            $.contract.commission[i].invoiceFlag = 1;
                        } else {
                            $.contract.commission[i].invoiceFlag = 0;
                        }
                    } else {
                        commission.itemCode = $('#commissionItem_'+index).val();
                        commission.itemName = $('#select2-commissionItem_'+index+'-container').text().split('[')[0];

                        commission.shopCode = $.contract.content.shopCode;
                        commission.area = $.contract.content.area;

                        commission.salesType = $('#commissionSalesType_1').val();
                        commission.settlePeriodCode = $('#commissionSettlePeriod_1').val();
                        commission.settlePeriodName = $('#select2-commissionSettlePeriod_1-container').text();
                        commission.periodTypeCode = $('#commissionPeriodType_1').val();
                        commission.periodTypeName = $('#select2-commissionPeriodType_1-container').text();
                        commission.settleDay = $('#commissionSettleDay_1').val();
                        if($('#commissionIsOverdueFlag_1').prop('checked') == true){
                            commission.isOverdueFlag = 1;
                        } else {
                            commission.isOverdueFlag = 0;
                        }
                        commission.overdueTaxRate = $('#commissionOverdueTaxRate_1').val();
                        commission.overdueRate = parseFloat($('#commissionOverdueRate_1').val()) / 1000;
                        if($('#commissionOverdueInvoiceFlag_1').prop('checked') == true){
                            commission.overdueInvoiceFlag = 1;
                        } else {
                            commission.overdueInvoiceFlag = 0;
                        }

                        commission.startDate = $('#commissionStartDate_'+index).val();
                        commission.endDate = $('#commissionEndDate_'+index).val();

                        commission.deductType = $('#commissionDeductType_'+index).val();
                        commission.category = $('#commissionCategory_'+index).val();

                        commission.deduct =  parseFloat(numberWithoutCommas($('#commissionDeduct_'+index).val())) / 100;
                        commission.taxDeduct =  parseFloat(numberWithoutCommas($('#commissionTaxDeduct_'+index).val())) / 100;

                        commission.amount =  numberWithoutCommas($('#commissionAmount_'+index).val());
                        commission.amount =  0;
                        commission.targetSales =  numberWithoutCommas($('#commissionMinSales_'+index).val());

                        commission.taxRate = $('#commissionTaxRate_'+index).val();
                        commission.taxCode = $('#commissionTaxRate_'+index).find('option:selected').attr('data-code');

                        if($('#commissionInvoiceFlag_'+index).prop('checked') == true){
                            commission.invoiceFlag = 1;
                        } else {
                            commission.invoiceFlag = 0;
                        }
                        $.contract.commission.push(commission);
                    }
                })
            
                var openId = 'admin';
                $.each(JSON.parse($.cookie('userModules')), function(i,v) {
                    if(v.roleCode == 'CROLE220301000001'){
                        openId = v.moduleName;
                        return false;
                    }
                })

                var map = {
                    "bizId": "",
                    "contractNo": getURLParameter('id'),
                    "contractVersion": 1,
                    "deductList": $.contract.commission,
                    "updateOpenId": openId
                };

                $.ajax({
                    url: $.api.baseLotus+"/api/contract/deduct/saveOrUpdate",
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
                            if(response.data.resultCode == 'SUCCESS') {
                                window.location.href = '/lotus-admin/contract-init?id='+getURLParameter('id')+'&s=succeed';         
                            } else {
                                alertMsg(response.data.resultCode,response.data.resultMsg);
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
        })
    }
}

function saveContractPromotion() {
    if($("#promotion").find("tr").length > 0 && $.contract.content.contractStatus == 'init'){
        Ewin.confirm({ message: "确定要保存推广费吗？" }).on(function (e) {
            if (!e) {
                return;
            }

            var ind;
            if($.contract.promotion.length > 0){
                $.each($.contract.promotion, function(i,v) {
                    ind = i * 1 + 1;
                    if(ind > $("#promotion").find("tr").length){
                        v.state = 0;
                    }
                })
            }

            var index;
            var len = $("#promotion").find("tr").length;

            var check1 = dateCompare($('#promotionStartDate_1').val(),$('#startDate').val()); //条款开始日与合同开始日比较
            var check2 = dateCompare($('#promotionEndDate_'+len).val(),$('#endDate').val()); //条款结束日与合同结束日比较
            var check3 = 'smaller';
            for(var ln = 0; ln < len; ln++){ //条款每一期开始日与结束日比较
                var check33 = dateCompare($('#promotionStartDate_'+(ln+1)).val(),$('#promotionEndDate_'+(ln+1)).val());
                if(check33 != 'smaller'){
                    check3 = check33;
                }
            }
            var check4 = 'equal';
            for(var ln = 1; ln < len; ln++){ //条款每一期开始日与上一期结束日比较，条款连续性
                var check44 = dateCompare(IncrDate($('#promotionEndDate_'+ln).val()), $('#promotionStartDate_'+(ln+1)).val());
                if(check44 != 'equal'){
                    check4 = check44;
                }
            }

            if(check1 == 'smaller' || check2 != 'equal' || check3 != 'smaller' || check4 != 'equal') {
                alertMsg('9999','条款开始日与结束日错误，请修改重新提交！');
            } else {
                $("#promotion").find("tr").each(function(i,e){
                    var promotion = {};
                    index = i * 1 + 1;
                    if(index <= $.contract.promotion.length){
                        $.contract.promotion[i].itemCode = $('#promotionItem_'+index).val();
                        $.contract.promotion[i].itemName = $('#select2-promotionItem_'+index+'-container').text().split('[')[0];

                        $.contract.promotion[i].settlePeriodCode = $('#promotionSettlePeriod_1').val();
                        $.contract.promotion[i].settlePeriodName = $('#select2-promotionSettlePeriod_1-container').text();
                        $.contract.promotion[i].periodTypeCode = $('#promotionPeriodType_1').val();
                        $.contract.promotion[i].periodTypeName = $('#select2-promotionPeriodType_1-container').text();
                        $.contract.promotion[i].settleDay = $('#promotionSettleDay_1').val();
                        if($('#promotionIsOverdueFlag_1').prop('checked') == true){
                            $.contract.promotion[i].isOverdueFlag = 1;
                        } else {
                            $.contract.promotion[i].isOverdueFlag = 0;
                        }
                        $.contract.promotion[i].overdueTaxRate = $('#promotionOverdueTaxRate_1').val();
                        $.contract.promotion[i].overdueRate = parseFloat($('#promotionOverdueRate_1').val()) / 1000;
                        if($('#promotionOverdueInvoiceFlag_1').prop('checked') == true){
                            $.contract.promotion[i].overdueInvoiceFlag = 1;
                        } else {
                            $.contract.promotion[i].overdueInvoiceFlag = 0;
                        }

                        $.contract.promotion[i].startDate = $('#promotionStartDate_'+index).val();
                        $.contract.promotion[i].endDate = $('#promotionEndDate_'+index).val();

                        $.contract.promotion[i].amount =  numberWithoutCommas($('#promotionAmount_'+index).val());
                        $.contract.promotion[i].taxAmount =  numberWithoutCommas($('#promotionTaxAmount_'+index).val());

                        //$.contract.promotion[i].deduct =  parseFloat(numberWithoutCommas($('#promotionDeduct_'+index).val())) / 100;
                        //$.contract.promotion[i].taxDeduct =  parseFloat(numberWithoutCommas($('#promotionTaxDeduct_'+index).val())) / 100;

                        $.contract.promotion[i].taxRate = $('#promotionTaxRate_'+index).val();
                        $.contract.promotion[i].taxCode = $('#promotionTaxRate_'+index).find('option:selected').attr('data-code');

                        if($('#promotionInvoiceFlag_'+index).prop('checked') == true){
                            $.contract.promotion[i].invoiceFlag = 1;
                        } else {
                            $.contract.promotion[i].invoiceFlag = 0;
                        }
                    } else {
                        promotion.itemCode = $('#promotionItem_'+index).val();
                        promotion.itemName = $('#select2-promotionItem_'+index+'-container').text().split('[')[0];

                        promotion.shopCode = $.contract.content.shopCode;
                        promotion.area = $.contract.content.area;

                        promotion.settlePeriodCode = $('#promotionSettlePeriod_1').val();
                        promotion.settlePeriodName = $('#select2-promotionSettlePeriod_1-container').text();
                        promotion.periodTypeCode = $('#promotionPeriodType_1').val();
                        promotion.periodTypeName = $('#select2-promotionPeriodType_1-container').text();
                        promotion.settleDay = $('#promotionSettleDay_1').val();
                        if($('#promotionIsOverdueFlag_1').prop('checked') == true){
                            promotion.isOverdueFlag = 1;
                        } else {
                            promotion.isOverdueFlag = 0;
                        }
                        promotion.overdueTaxRate = $('#promotionOverdueTaxRate_1').val();
                        promotion.overdueRate = parseFloat($('#promotionOverdueRate_1').val()) / 1000;
                        if($('#promotionOverdueInvoiceFlag_1').prop('checked') == true){
                            promotion.overdueInvoiceFlag = 1;
                        } else {
                            promotion.overdueInvoiceFlag = 0;
                        }

                        promotion.startDate = $('#promotionStartDate_'+index).val();
                        promotion.endDate = $('#promotionEndDate_'+index).val();

                        promotion.amount =  numberWithoutCommas($('#promotionAmount_'+index).val());
                        promotion.taxAmount =  numberWithoutCommas($('#promotionTaxAmount_'+index).val());

                        //promotion.deduct =  parseFloat(numberWithoutCommas($('#promotionDeduct_'+index).val())) / 100;
                        //promotion.taxDeduct =  parseFloat(numberWithoutCommas($('#promotionTaxDeduct_'+index).val())) / 100;

                        promotion.taxRate = $('#promotionTaxRate_'+index).val();
                        promotion.taxCode = $('#promotionTaxRate_'+index).find('option:selected').attr('data-code');

                        if($('#promotionInvoiceFlag_'+index).prop('checked') == true){
                            promotion.invoiceFlag = 1;
                        } else {
                            promotion.invoiceFlag = 0;
                        }
                        $.contract.promotion.push(promotion);
                    }
                })
            
                var openId = 'admin';
                $.each(JSON.parse($.cookie('userModules')), function(i,v) {
                    if(v.roleCode == 'CROLE220301000001'){
                        openId = v.moduleName;
                        return false;
                    }
                })

                var map = {
                    "bizId": "",
                    "contractNo": getURLParameter('id'),
                    "contractVersion": 1,
                    "promotionFeeList": $.contract.promotion,
                    "updateOpenId": openId
                };

                $.ajax({
                    url: $.api.baseLotus+"/api/contract/promotion/saveOrUpdate",
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
                            if(response.data.resultCode == 'SUCCESS') {
                                window.location.href = '/lotus-admin/contract-init?id='+getURLParameter('id')+'&s=succeed';         
                            } else {
                                alertMsg(response.data.resultCode,response.data.resultMsg);
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
        })
    }
}

function saveContractDeposit() {
    if($("#deposit").find("tr").length > 0 && $.contract.content.contractStatus == 'init'){
        Ewin.confirm({ message: "确定要保存预存款条款吗？" }).on(function (e) {
            if (!e) {
                return;
            }

            var ind;
            if($.contract.deposit.length > 0){
                $.each($.contract.deposit, function(i,v) {
                    ind = i * 1 + 1;
                    if(ind > $("#deposit").find("tr").length){
                        v.state = 0;
                    }
                })
            }

            var index;
            $("#deposit").find("tr").each(function(i,e){
                var deposit = {};
                index = i * 1 + 1;
                if(index <= $.contract.deposit.length){
                    $.contract.deposit[i].itemCode = $('#deposittermItem_'+index).val();
                    $.contract.deposit[i].itemName = $('#select2-deposittermItem_'+index+'-container').text().split('[')[0];

                    $.contract.deposit[i].amount =  numberWithoutCommas($('#deposittermAmount_'+index).val());
                    $.contract.deposit[i].paymentDate = $('#deposittermPaymentDate_'+index).val();

                    $.contract.deposit[i].taxRate = 0;
                    $.contract.deposit[i].taxCode = $('#deposittermTaxRate_'+index).find('option:selected').attr('data-code');
                } else {
                    if(numberWithoutCommas($('#deposittermAmount_'+index).val()) > 0) {
                        deposit.itemCode = $('#deposittermItem_'+index).val();
                        deposit.itemName = $('#select2-deposittermItem_'+index+'-container').text().split('[')[0];

                        deposit.amount =  numberWithoutCommas($('#deposittermAmount_'+index).val());
                        deposit.paymentDate = $('#deposittermPaymentDate_'+index).val();
                        
                        deposit.taxRate = 0;
                        deposit.taxCode = $('#deposittermTaxRate_'+index).find('option:selected').attr('data-code');

                        $.contract.deposit.push(deposit);
                    }
                }
            })

            var openId = 'admin';
            $.each(JSON.parse($.cookie('userModules')), function(i,v) {
                if(v.roleCode == 'CROLE220301000001'){
                    openId = v.moduleName;
                    return false;
                }
            })

            var map = {
                "bizId": "",
                "contractNo": getURLParameter('id'),
                "contractVersion": 1,
                "depositList": $.contract.deposit,
                "updateOpenId": openId
            };

            $.ajax({
                url: $.api.baseLotus+"/api/contract/deposit/saveOrUpdate",
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
                        if(response.data.resultCode == 'SUCCESS') {
                            window.location.href = '/lotus-admin/contract-init?id='+getURLParameter('id')+'&s=succeed';         
                        } else {
                            alertMsg(response.data.resultCode,response.data.resultMsg);
                        }
                    } else {
                        alertMsg(response.code,response.customerMessage);
                    }
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.log(textStatus, errorThrown);
                }
            });
        })
    }
}

function saveContract() {
    if($.contract.content.contractStatus == 'init'){
        Ewin.confirm({ message: "确定要保存本版块合同内容吗？" }).on(function (e) {
            if (!e) {
                return;
            }

            var openId = 'admin';
            var userCode = '';
            $.each(JSON.parse($.cookie('userModules')), function(i,v) {
                if(v.roleCode == 'CROLE220301000001'){
                    openId = v.moduleName;
                    userCode = v.userCode;
                    return false;
                }
            })
            
            var area = $('#area').val();
            var unitCode = '';
            var unitName = '';
            var shopCode = '';
            if( $('#selectStore').val() && $('#selectStore').val() != ''){
                unitCode = $('#selectStore').val().split(':::')[0];
                shopCode = $('#selectStore').val().split(':::')[1];
                unitName = $('#selectStore').val().split(':::')[2];
            }
            var startDate = $('#startDate').val();
            var endDate = $('#endDate').val();
            var contractType = $('#contractType').val();
            var selectRentCalculationMode = $('#selectRentCalculationMode').val();
            
            var brandName = '';
            var brandCode = '';
            if( $('#brandName').val() && $('#brandName').val() != ''){
                brandName = $('#select2-brandName-container').text().split('[')[0];
                brandCode = $('#brandName').val();
            }
        
            $.contract.content.updateOpenId = openId;
            $.contract.content.updateCode = userCode;
            $.contract.content.updateName = $('.navbar-nav .fa-user').siblings().text().trim().replace(/\s/g,"");
            $.contract.content.sapContractNo = $('#sapContractNo').val();
            $.contract.content.awardDate = $('#awardDate').val();
            $.contract.content.tenantCode = $('#selectTenant').val();
            $.contract.content.tenantName = $('#select2-selectTenant-container').text().split(' | ')[1];
            $.contract.content.tenantNo = $('#select2-selectTenant-container').text().split(' | ')[0];
            $.contract.content.startDate = startDate;
            $.contract.content.endDate = endDate;
            $.contract.content.bizTypeName = $('#bizTypeName').val();
            $.contract.content.rentCalculationMode = selectRentCalculationMode;
            $.contract.content.profitCenter = $('#profitCenter').val();
            $.contract.content.termCalcMode = $('#termCalcMode').val();
            $.contract.content.unitCode = unitCode;
            $.contract.content.unitName = unitName;
            $.contract.content.shopCode = shopCode;
            $.contract.content.area = area;
            $.contract.content.floorCode = $('#floor').find('option:selected').val();
            $.contract.content.floorName = $('#floor').find('option:selected').text();
            $.contract.content.bizScope = $('#bizScope').val();
            $.contract.content.targetSales = numberWithoutCommas($('#targetSales').val());
            $.contract.content.overdueBizAmount = numberWithoutCommas($('#overdueBizAmount').val());
            $.contract.content.brandName = brandName;
            $.contract.content.brandCode = brandCode;
            $.contract.content.contractName = $('#contractName2').val();
            $.contract.content.paymentMode = $('#paymentMode').find('option:selected').val();
            $.contract.content.contractType = contractType;
            $.contract.content.posMode = $('#posMode').find('option:selected').val();
            $.contract.content.deliveryDate = $('#deliveryDate').val();
            $.contract.content.enterDate = $('#enterDate').val();
            $.contract.content.freeStartDate = $('#freeStartDate_1').val();
            $.contract.content.freeEndDate = $('#freeEndDate_1').val();
            $.contract.content.freeDays = $('#freeDays').val();
            $.contract.content.bizDate = $('#bizDate').val();
            $.contract.content.openStartTime = $('#openStartTime').val();
            $.contract.content.openEndTime = $('#openEndTime').val();
            $.contract.content.contractTemplate = $('#contractTemplate').find('option:selected').val();
            $.contract.content.remark = $('#remark').val();
            $.contract.content.deductList = null;
            $.contract.content.propertyFeeList = null;
            $.contract.content.depositList = null;
            $.contract.content.salesList = null;
            $.contract.content.promotionFeeList = null;
            $.contract.content.fixedRentList = null;

            var map = $.contract.content;
            $.ajax({
                url: $.api.baseLotus+"/api/contract/lotus/saveOrUpdate",
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
                        if(response.data.resultCode == 'SUCCESS') {
                            window.location.href = '/lotus-admin/contract-init?id='+getURLParameter('id')+'&s=succeed';         
                        } else {
                            alertMsg(response.data.resultCode,response.data.resultMsg);
                        }
                    } else {
                        alertMsg(response.code,response.customerMessage);
                    }
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.log(textStatus, errorThrown);
                }
            });
        })
    }
}

function deleteContractById(id) {
    var msg = '确定要删除这份合同吗？';
    Ewin.confirm({ message: msg }).on(function (e) {
        if (!e) {
            return;
        } else {
            $('.modal.in').hide().remove();
        }
        
        var openId = 'admin';
        $.each(JSON.parse($.cookie('userModules')), function(i,v) {
            if(v.roleCode == 'CROLE220301000001'){
                openId = v.moduleName;
                return false;
            }
        })
        
        $.ajax({
            url: $.api.baseLotus+"/api/contract/lotus/deleteById?id="+id+"&updateOpenId="+openId,
            type: "DELETE",
            async: false,
            beforeSend: function (request) {
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

                    window.location.href = '/lotus-admin/contracts?s=delete';
                } else {
                    alertMsg(response.code,response.customerMessage);
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(textStatus, errorThrown);
            }
        });
    })
}

function activateCheck(id) {
    $('.mandatory-error').remove();
    var flag = 1;
    var error = '<i class="fa fa-exclamation-circle mandatory-error" aria-hidden="true"></i>';
    
    if($('#investmentContractModelMallSelect').val() == '') {
        flag = 0;
        $('#investmentContractModelMallSelect').parent().append(error);
    }
    
    if($('#contractNo').val() == '') {
        flag = 0;
        $('#contractNo').parent().append(error);
    }
    
    if($('#mainSigningBody').val() == '') {
        flag = 0;
        $('#mainSigningBody').parent().append(error);
    }
    
    if($('#approvalName').val() == '') {
        flag = 0;
        $('#approvalName').parent().append(error);
    }
    
    if($('#awardDate').val() == '') {
        flag = 0;
        $('#awardDate').parent().append(error);
    }
    
    if($('#selectTenant').val() == null) {
        flag = 0;
        $('#selectTenant').parent().append(error);
    }
    
    if($('#startDate').val() == ''){
        flag = 0;
        $('#startDate').parent().prepend(error);
    }
    
    if($('#endDate').val() == ''){
        flag = 0;
        $('#endDate').parent().prepend(error);
    }
    
    if($('#selectStore').val() == null) {
        flag = 0;
        $('#selectStore').parent().append(error);
    }
    
    if($('#brandName').val() == null) {
        flag = 0;
        $('#brandName').parent().append(error);
    }
    
    if($('#bizTypeName').val() == '') {
        flag = 0;
        $('#bizTypeName').parent().append(error);
    }
    
    if($('#area').val() == '') {
        flag = 0;
        $('#area').parent().append(error);
    }
    
    if($('#contractName2').val() == '') {
        flag = 0;
        $('#contractName2').parent().append(error);
    }
    
    if($('#selectRentCalculationMode').val() == null) {
        flag = 0;
        $('#selectRentCalculationMode').parent().append(error);
    }
    
    if($('#floor').val() == null) {
        flag = 0;
        $('#floor').parent().append(error);
    }
    
    if($('#paymentMode').val() == '') {
        flag = 0;
        $('#paymentMode').parent().append(error);
    }
    
    if($('#bizScope').val() == '') {
        flag = 0;
        $('#bizScope').parent().append(error);
    }
    
    if($('#contractType').val() == null) {
        flag = 0;
        $('#contractType').parent().append(error);
    }
    
    if($('#contractTemplate').val() == '2') {
        if($('#fixedRent tr').length > 1 || $('#commission tr').length > 0) {
            flag = 0;
            $('#contractTemplate').parent().append(error);
        }
    }
    
    if($('#posMode').val() == null) {
        flag = 0;
        $('#posMode').parent().append(error);
    }
    
    if($('#targetSales').val() == '' || parseFloat(numberWithoutCommas($('#targetSales').val())) < 0) {
        flag = 0;
        $('#targetSales').parent().append(error);
    }
    
    if($('#overdueBizAmount').val() == '' || parseFloat(numberWithoutCommas($('#overdueBizAmount').val())) < 0) {
        flag = 0;
        $('#overdueBizAmount').parent().append(error);
    }
    
    if($('#deliveryDate').val() == '') {
        flag = 0;
        $('#deliveryDate').parent().append(error);
    }
    
    if($('#enterDate').val() == '') {
        flag = 0;
        $('#enterDate').parent().append(error);
    }
    
    if($('#bizDate').val() == '') {
        flag = 0;
        $('#bizDate').parent().append(error);
    }
    
    if($('#selectRentCalculationMode').find('option:selected').val() == 'fixRent' || $('#selectRentCalculationMode').find('option:selected').val() == 'fixedRentAndHigherDeduct' || $('#selectRentCalculationMode').find('option:selected').val() == 'fixedRentAndAddDeduct') {
        if($('#fixedRent tr').length > 0) {
            if($('#fixedRentStartDate_1').val() == ''){
                flag = 0;
                $('#fixedRentStartDate_1').parent().prepend(error);
            }
            
            if($('#fixedRentEndDate_1').val() == ''){
                flag = 0;
                $('#fixedRentEndDate_1').parent().prepend(error);
            }
            
            if($('#fixedRentAmount_1').val() == ''){
                flag = 0;
                $('#fixedRentAmount_1').parent().append(error);
            }
            
            if($('#fixedRentTaxAmount_1').val() == ''){
                flag = 0;
                $('#fixedRentTaxAmount_1').parent().append(error);
            }
            
            if($('#fixedRentMinSalesAmount_1').val() == ''){
                flag = 0;
                $('#fixedRentMinSalesAmount_1').parent().append(error);
            }
        } else {
            flag = 0;
            $('#investmentContractAccounttermFixed').append(error);
        }
    }
    
    if($('#selectRentCalculationMode').find('option:selected').val() == 'deduct' || $('#selectRentCalculationMode').find('option:selected').val() == 'fixedRentAndHigherDeduct' || $('#selectRentCalculationMode').find('option:selected').val() == 'fixedRentAndAddDeduct') {
        if($('#commission tr').length > 0) {
            if($('#commissionStartDate_1').val() == ''){
                flag = 0;
                $('#commissionStartDate_1').parent().prepend(error);
            }
            
            if($('#commissionEndDate_1').val() == ''){
                flag = 0;
                $('#commissionEndDate_1').parent().prepend(error);
            }
            
            if($('#commissionTaxDeduct_1').val() == ''){
                flag = 0;
                $('#commissionTaxDeduct_1').parent().append(error);
            }
            
            if($('#commissionDeduct_1').val() == ''){
                flag = 0;
                $('#commissionDeduct_1').parent().append(error);
            }
            
            if($('#commissionAmount_1').val() == ''){
                flag = 0;
                $('#commissionAmount_1').parent().append(error);
            }
            
            if($('#commissionMinSales_1').val() == ''){
                flag = 0;
                $('#commissionMinSales_1').parent().append(error);
            }
            
            if($('#commissionMinSalesAmount_1').val() == ''){
                flag = 0;
                $('#commissionMinSalesAmount_1').parent().append(error);
            }
        } else {
            flag = 0;
            $('#investmentContractAccounttermCommission').append(error);
        }
    }
    
    if(flag == 1){
        activateContract(id);
    } else {
        $('html, body').animate({
            scrollTop: $('.mandatory-error').offset().top - 195
        }, 0);
    }
}

function activateContract(id){
    var msg = '确定要将此合同提交生效吗？合同生效后将不可修改';
    Ewin.confirm({ message: msg }).on(function (e) {
        if (!e) {
            return;
        } else {
            $('.modal.in').hide().remove();
        }
        
        var openId = 'admin';
        $.each(JSON.parse($.cookie('userModules')), function(i,v) {
            if(v.roleCode == 'CROLE220301000001'){
                openId = v.moduleName;
                return false;
            }
        })
        
        $.ajax({
            url: $.api.baseLotus+"/api/contract/lotus/updateContractStatus?id="+id+"&contractStatus=effect&updateOpenid="+openId,
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
                    
                    window.location.href = '/lotus-admin/contracts?s=succeed';
                }
            }
        })
    })
}