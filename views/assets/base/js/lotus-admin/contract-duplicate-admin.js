$.contract = {
    content: {}
};

$(document).ready(function(){
    $('#create-form')[0].reset();
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
    updateSelectTenantDropDown(50);
    updateBrandNameDropDown(10);
    
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
    
    // 选择计租方式隐藏相关板块
    $("#selectRentCalculationMode").change(function(){
        if($(this).val() == 'fixedRentAndHigherDeduct'){
            $('#investmentContractAccounttermCompare').show();
        } else {
            $('#investmentContractAccounttermCompare').hide();
        }
    })
    
    updateCompareFrequencyDropDown();
    
    $("#endDate").on('changeDate',function(){
        $('#freeStartDate_1').datepicker('setEndDate',$(this).val());
        $('#freeEndDate_1').datepicker('setEndDate',$(this).val());
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
                
                var temp;
                if(response.data != null && response.data.contractStatus == 'init'){
                    var data = response.data;
                    $.contract.content = data;
                    
                    $('#contractName').text(data.contractName).attr('title',data.contractName);
                    $.contract.content.contractVersion = $.contract.content.contractVersion * 1 + 1;
                    $('#contractVersion').text($.contract.content.contractVersion).attr('title',$.contract.content.contractVersion);
                    findMainSigningBody(data.mallCode);
                    findContractStatus('CONTRACT_STATUS',data.contractStatus);
                    
                    temp = new Option((data.tenantNo +' | '+ data.tenantName), data.tenantCode, true, true);
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
                    
                    if(data.rentCalculationMode == 'fixedRentAndHigherDeduct'){
                        $('#investmentContractAccounttermCompare').show();
                    } else {
                        $('#investmentContractAccounttermCompare').hide();
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
                    
                    $('#compareFirstFrequency').val(data.firstCompareCycle).trigger('change');
                    if(data.secondCompareFlag == '1'){
                        $('#compareSecond').prop('checked', 'checked');
                    }
                    $('#compareSecondFrequency').val(data.secondCompareCycle).trigger('change');
                    $('#compareSecondValue').val(data.secondCompareValueType).trigger('change');
                    
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
            
            $.contract.content.id = null;
            $.contract.content.created = null;
            $.contract.content.updated = null;
            $.contract.content.code = null;
            $.contract.content.updateOpenId = openId;
            $.contract.content.updateCode = userCode;
            $.contract.content.updateName = $('.navbar-nav .fa-user').siblings().text().trim().replace(/\s/g,"");
            $.contract.content.sapContractNo = $('#sapContractNo').val();
            $.contract.content.sapContractNo = $.contract.content.contractVersion;
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
                            window.location.href = '/lotus-admin/contract-init?id='+getURLParameter('id')+'&contractVersion='+$.contract.content.contractVersion+'&s=succeed';         
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