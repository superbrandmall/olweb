$.request = {
    content: {},
    mallCode: ''
}

$(document).ready(function(){
    $('#create-form')[0].reset();
    
    findTaxInfoByTaxCategories('VAT');
    
    $('.date-picker, .input-daterange').datepicker({
        'language': 'zh-CN',
        'format': 'yyyy-mm-dd',
        'todayHighlight': true,
        'startDate': ($('#startDate').val() != '' ? $('#startDate').val() : ''),
        'endDate': $('#endDate').val(),
        'autoclose': true,
        'clearBtn': true
    });
    
    $("#openStartTime").timepicker({
        defaultTime:'10:00',
        showMeridian:false
    });
    
    $("#openEndTime").timepicker({
        defaultTime:'22:00',
        showMeridian:false
    });
    
    $('#propertyMgmtSettleDay_1,#promotionSettleDay_1,#commissionSettleDay_1,#fixedRentSettleDay_1').val('25').trigger('change');
    
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
    
    if(!sessionStorage.getItem('roleYZJ') || sessionStorage.getItem('roleYZJ') == null || sessionStorage.getItem('roleYZJ') == ''){
        findRoleYZJByParentId();
    } else {
        updateRoleYZJLabel();
    }
    
    // 初始化    
    updateDictDropDownByDictTypeCode('RENT_CALCULATION_MODE','selectRentCalculationMode',$.api.rentCalculationMode[0],$.api.rentCalculationMode[1]); // 计租方式
    updateDictDropDownByDictTypeCode('PROFIT_CENTER','profitCenter',$.api.profitCenter[0],$.api.profitCenter[1]); // 利润中心
    updateDictDropDownByDictTypeCode('TERM_CALC_MODE','termCalcMode',$.api.termCalcMode[0],$.api.termCalcMode[1]); // 条款计算方式
    updateDictDropDownByDictTypeCode('POS_MODE','posMode',$.api.posMode[0],$.api.posMode[1]); // 收银方式
    updateDictDropDownByDictTypeCode('CONTRACT_TYPE','contractType',$.api.contractType[0],$.api.contractType[1]); // 合同类型
    updateDictDropDownByDictTypeCode('FORM_TYPE','formType',$.api.formType[0],$.api.formType[1]); // 表单类型
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
        calBackPush('fixedRent');
    })
    
    $("input[id*='commissionEndDate_']").on('changeDate',function(){
        calBackPush('commission');
    })
    
    $("input[id*='propertyMgmtEndDate_']").on('changeDate',function(){
        calBackPushNextCalendar('propertyMgmt');
        calBackPush('propertyMgmt');
    })
    
    $("input[id*='promotionEndDate_']").on('changeDate',function(){
        calBackPushNextCalendar('promotion');
        calBackPush('promotion');
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
    findDictCodeByDictTypeCode('LOTUS_RENT_FLOW_STEP'); // 云之家流程
    findDictCodeByDictTypeCode('RENT_CALCULATION_MODE'); // 计租方式
    findDictCodeByDictTypeCode('CONTRACT_TYPE'); // 合同类型
    findDictCodeByDictTypeCode('PAYMENT_MODE'); // 支付方式
    findDictCodeByDictTypeCode('TERM_CALC_MODE'); // 条款计算方式
    
    // 选择计租方式隐藏相关板块
    $("#selectRentCalculationMode").change(function(){
        if($(this).val() == 'fixRent'){
            $('#investmentContractAccounttermCommission').fadeOut();
            $('#investmentContractAccounttermFixed').fadeIn();
            $('#commission').find('tr').remove();
            $('#investmentContractAccounttermCompare').fadeOut();
            $('#navbarTop ul li:eq(2)').show();
            $('#navbarTop ul li:eq(3)').hide();
        } else if($(this).val() == 'deduct'){
            $('#investmentContractAccounttermFixed').fadeOut();
            $('#investmentContractAccounttermCommission').fadeIn();
            $('#fixedRent').find('tr').remove();
            $('#investmentContractAccounttermCompare').fadeOut();
            $('#navbarTop ul li:eq(2)').hide();
            $('#navbarTop ul li:eq(3)').show();
        } else {
            $('#investmentContractAccounttermFixed').fadeIn();
            $('#investmentContractAccounttermCommission').fadeIn();
            $('#investmentContractAccounttermCompare').fadeIn();
            $('#navbarTop ul li:eq(2), #navbarTop ul li:eq(3)').show();
        }
    })
    
    updateCompareFrequencyDropDown();
    
    $("#saveDraft").click(function(){
        if($.request.content.formStatus == '1' || $.request.content.formStatus == '3') {
            mandatoryCheck('save');
        }
    })
    
    $("#submitForm").click(function(){
        if($.request.content.formStatus == '1' || $.request.content.formStatus == '3') {
            mandatoryCheck('submit');
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
    
    $("div[id*='uploadFile_']").on('click',function(){
        fileUpload($(this).attr('id').split('_')[1]);
    })
    
    $('#8d2794df-c15f-4d68-9f8e-8b847f6191db').on('change',function(){
        if($(this).find('option:selected').val() != null) {
            $('.step li:nth-child(5)').addClass('active');
        } else {
            $('.step li:nth-child(5)').removeClass('active');
        }
    })

    $('#hq_leasing_head').on('change',function(){
        if($(this).find('option:selected').val() != null) {
            $('.step li:nth-child(6)').addClass('active');
        } else {
            $('.step li:nth-child(6)').removeClass('active');
        }
    })
    
    findRequestbyBizId();
})

function findFilesByBizId(id) {
    $.ajax({
        url: $.api.baseLotus+"/api/co/file/findAllByBizId?bizId="+id,
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
                if(response.data != null && response.data != '' && response.data.length > 0){
                    $.each(response.data, function(i,v) {
                        sessionStorage.setItem("uploadFile_"+v.id,JSON.stringify(v));
                        var bizType = v.bizType.split('_')[1];
                        var type;
                        switch (bizType) {
                            case "BL":
                                type = 'businessLicense';
                                break;
                            case "IC":
                                type = 'idCard';
                                break;
                            case "TM":
                                type = 'trademark';
                                break;
                            case "BA":
                                type = 'brandAuthorization';
                                break;
                            default:
                                break;
                        }
                        
                        $("input[id*='"+type+"_']").each(function(j,e){
                            $('#'+type+'_'+j).val(v.fileName);
                            var fileSize;
                            if(v.fileSize >= 1024 && v.fileSize < 1048576){
                                fileSize = Math.round(v.fileSize / 1024 * 100) / 100 + 'Kb';
                            } else if(v.fileSize >= 1048576){
                                fileSize = Math.round(v.fileSize / 1048576 * 100) / 100 + 'Mb';
                            } else {
                                fileSize = v.fileSize + 'b';
                            }
                            $('#'+type+'FileSize'+'_'+j).text(fileSize);
                            $('#'+type+'Created'+'_'+j).text(v.created);
                            $('#'+type+'Action'+'_'+j).html('\
<a href="'+$.api.baseLotus+'/api/co/file/showFile?bizId='+v.bizId+'&fileId='+v.fileId+'" target="_blank">查看文件</a>\n\
<input type="hidden" id="file_'+v.id+'" />');
                            $('#'+type+'_'+j).parent().parent().show();
                            return false;
                        })
                    })
                }
            }
        }
    })
}

function fileUpload(id) {
    if($('#uploadFile_'+id).parent().find("input[type=file]").val() != ''){
        var type;
        switch (id) {
            default:
                type = 'OF';
                break;
        }
        
        var formData = new FormData();
        var file = $('#uploadFile_'+id).parent().find("input[type=file]")[0].files[0];
        formData.append('file', file);

        var openId = 'admin';
        $.each(JSON.parse($.cookie('userModules')), function(i,v) {
            if(v.roleCode == 'CROLE220301000001'){
                openId = v.moduleName;
                return false;
            }
        })

        var upload = $.ajax({
            type: "POST",
            url: $.base+"/zuul/onlineleasing-lotus/api/co/file/uploadYzj?bizId="+$('#bizId').val()+"&creatorOpenId="+openId+"&activityName=&bizType=CONTRACT_"+type,
            data: formData,
            async: false,
            cache: false,
            timeout: 15000,
            processData: false,
            contentType: false,
            beforeSend: function(request) {
                $('#loader').show();
                request.setRequestHeader("Login", $.cookie('login'));
                request.setRequestHeader("Authorization", $.cookie('authorization'));
                request.setRequestHeader("Lang", $.cookie('lang'));
                request.setRequestHeader("Source", "onlineleasing");
            },
            complete: function(jqXHR, textStatus, errorThrown) {
                if(textStatus == 'timeout'){
                     upload.abort();
                     upload();
                 }
            },
            success: function(response, status, xhr) {
                $('#loader').hide();
                if(response.code === 'C0') {
                    if(xhr.getResponseHeader("Login") !== null){
                        $.cookie('login', xhr.getResponseHeader("Login"));
                    }
                    if(xhr.getResponseHeader("Authorization") !== null){
                        $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                    }
                    
                    sessionStorage.setItem("uploadFile_"+response.data.id,JSON.stringify(response.data));

                    $('#fileName_'+id).val('');
                    $('#uploadFile_'+id).parent().find("input[type=file]").val('');
                    
                    $("input[id*='"+id+"_']").each(function(i,e){
                        if($('#'+id+'_'+i).val() == ''){
                            $('#'+id+'_'+i).val(response.data.fileName);
                            var fileSize;
                            if(response.data.fileSize >= 1024 && response.data.fileSize < 1048576){
                                fileSize = Math.round(response.data.fileSize / 1024 * 100) / 100 + 'Kb';
                            } else if(response.data.fileSize >= 1048576){
                                fileSize = Math.round(response.data.fileSize / 1048576 * 100) / 100 + 'Mb';
                            } else {
                                fileSize = response.data.fileSize + 'b';
                            }
                            $('#'+id+'FileSize'+'_'+i).text(fileSize);
                            $('#'+id+'Created'+'_'+i).text(response.data.created);
                            $('#'+id+'Action'+'_'+i).html('\
        <a href="'+$.api.baseLotus+'/api/co/file/showFile?bizId='+response.data.bizId+'&fileId='+response.data.fileId+'" target="_blank">查看文件</a> | \n\
        <a href="javascript:void(0)" onclick=\'javascript: deleteFile("'+response.data.id+'")\'>删除文件</a>\n\
        <input type="hidden" id="file_'+response.data.id+'" />');
                            $('#'+id+'_'+i).parent().parent().show();
                            return false;
                        }
                    }) 
                } else {
                    alertMsg(response.code,response.customerMessage);
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
               console.log(textStatus, errorThrown);
            }
        });
    }
}

function deleteFile(id) {
    var file = $.parseJSON(sessionStorage.getItem("uploadFile_"+id));
    file.update = '';
    file.state = 0;
    
    var bizType = file.bizType.split('_')[1];
    
    $.ajax({
        url: $.api.baseLotus+"/api/co/file/saveOrUpdate",
        type: "POST",
        data: JSON.stringify(file),
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
                
                var type;
                switch (bizType) {
                    default:
                        type = 'otherFiles';
                        break;
                }
                
                var row = $('#file_'+id).parent().parent();
                row.hide();
                row.find("input[id*='"+type+"_']").val('');
                row.find("td[id*='"+type+'FileSize'+"_']").text('');
                row.find("td[id*='"+type+'Created'+"_']").text('');
                row.find("td[id*='"+type+'Action'+"_']").html('');
            } else {
                alertMsg(response.code,response.customerMessage);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
        }
    });
}

function updateFeeItems(FeeItem,VAT,type) {
    var feeItems  = JSON.parse(sessionStorage.getItem("feeItems"));
    if(feeItems.length > 0){
        $.each(feeItems, function(i,v) {
            if(v.itemType == type){
                $('.'+FeeItem+'.new').append('<option value="'+v.itemCode+'">'+v.itemName+'['+v.itemCode+']</option>');
                if($.request.mallCode == 'SC126' || $.request.mallCode == 'SC127'){
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

function findRequestbyBizId() {
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
                
                var temp;
                if(response.data != '' && response.data != null && response.data.formType == 'new'){
                    var data = response.data;
                    $.request.content = data;

                    if($.request.content.formStatus != '1' && $.request.content.formStatus != '3'){
                        $('#saveDraft').hide();
                        $('#submitForm').hide();
                        
                        if($.request.content.formStatus == '4' || $.request.content.formStatus == '5' || $.request.content.formStatus == '6'){
                            $('#create-form .sub-header').css('background','#fff url(/views/assets/base/img/content/lotus-admin/approval_completed.png) 0 100%/112px auto no-repeat');
                        } else if($.request.content.formStatus == '9'){
                            $('#create-form .sub-header').css('background','#fff url(/views/assets/base/img/content/lotus-admin/seal_completed.png) 0 100%/112px auto no-repeat');
                        } else if($.request.content.formStatus == '10'){
                            $('#create-form .sub-header').css('background','#fff url(/views/assets/base/img/content/lotus-admin/approval_closed.png) 0 100%/112px auto no-repeat');
                        }
                    }
                    
                    $('#creatorName').val((data.creatorName != null ? data.creatorName : 'admin'));
                    $('#requestName').text(data.bizId);
                    $('#bizId').val(data.bizId);
                    findMainSigningBody(data.mallCode);
                    updateDictByDictTypeCode('FORM_STATUS','formStatus',(data.formStatus != null ? data.formStatus : 1));
                    
                    if(data.tenantCode != null && data.tenantName != null){
                        temp = new Option((data.tenantNo +' | '+ data.tenantName), data.tenantCode, true, true);
                        $('#selectTenant').append(temp).trigger('change');
                    }
                    $('#contractNo').val(data.contractNo);
                    $('#investmentContractModelMallSelect').val(data.mallName+'['+data.mallCode+']');
                    $.request.mallCode = data.mallCode;

                    updateSelectStoreDropDownByMallCode(10,data.mallCode);
                    temp = new Option((data.unitName +'['+ data.unitCode +'] | '+ data.area + '㎡'), data.unitCode+':::'+data.shopCode+':::'+data.unitName+':::'+data.floorName+':::'+data.floorCode, true, true);
                    $('#selectStore').append(temp).trigger('change');
                    findShopBudgetByCode(data.shopCode);
                    $('#investmentContractProperteistermFloor_0').val(data.floorName);
                    $('#investmentContractProperteistermArea_0').val(data.area);

                    $("#selectStore").change(function(){
                        var selectStoreArea = $('#select2-selectStore-container').text().split(' | ')[1];
                        selectStoreArea = selectStoreArea.split('㎡')[0];
                        $('#area').val(selectStoreArea);
                        var floor = new Option($('#selectStore').val().split(':::')[3], $('#selectStore').val().split(':::')[4], true, true);
                        $('#floor').append(floor).trigger('change');
                        calBackPushFixedRentTaxRentAmount();
                        calBackPushPropertyMgmtTaxRentAmount();
                        calBackPush('commission');
                        calBackPush('promotion');
                        findShopBudgetByCode($('#selectStore').val().split(':::')[1]);
                        $('#investmentContractProperteistermFloor_0').val($('#selectStore').val().split(':::')[3]);
                        $('#investmentContractProperteistermArea_0').val(selectStoreArea);
                    })
                    
                    $("#oldSelectStore").change(function(){
                        if( $(this).val() && $(this).val() != '' && $(this).val() != null && $(this).val() != 'null' && $('#oldArea').val() == '' ){
                            var oldArea = $(this).val().split(':::')[4];
                            $('#oldArea').val(oldArea);
                        }
                    })
                    
                    $("#selectTenant").change(function(){
                        if($.request.content.formStatus == 1 || $.request.content.formStatus == 3){
                            findFilesByBizId($(this).val());
                        }
                    })

                    temp = new Option(data.floorName, data.floorCode, true, true);
                    $('#floor').append(temp).trigger('change');
                    $('#contractName').val(data.contractName);
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
                    
                    $('#investmentContractModelBasicinfo .input-daterange, #awardDate').datepicker({
                        'startDate': '',
                        'endDate': ''
                    });
                    
                    $("#startDate").on('changeDate',function(){
                        updateStartDatepicker();
                        $('#freeEndDate_1').datepicker('setStartDate',$(this).val());
                        $('#freeEndDate_1').datepicker('update',$(this).val());
                        $("#deliveryDate").datepicker('update', $(this).val());
                        $("#enterDate").datepicker('update', $(this).val());
                        updateContractTemplate();
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
                    
                    if(data.brandName != null && data.brandCode != null){
                        temp = new Option(data.brandName, data.brandCode, true, true);
                        $('#brandName').append(temp).trigger('change');
                    }
                    
                    $("#brandName").change(function(){
                        var contractName = $('#select2-brandName-container').text().split('[')[0];
                        $('#contractName').val(contractName);
                        var bizTypeName = $('#select2-brandName-container').text().split('[')[1];
                        bizTypeName = bizTypeName.split(']')[0];
                        $('#bizTypeName').val(bizTypeName);
                        
                        if($.request.content.formStatus == 1 || $.request.content.formStatus == 3){
                            findFilesByBizId($(this).val());
                        }
                    })
                    
                    $('#deliveryDate').datepicker('update', data.deliveryDate);
                    $('#area').val(data.area);
                    $('#bizTypeName').val(data.bizTypeName);
                    $('#bizDate').datepicker('update', data.bizDate);
                    
                    $('#awardDate').datepicker('update', data.awardDate);
                    $('#bizScope').val(data.bizScope);
                    $('#targetSales').val(data.targetSales);
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
                    
                    if(data.firstCompareCycle != null && data.firstCompareCycle != null){
                        temp = new Option(data.firstCompareCycle, data.firstCompareCycle, true, true);
                        $('#compareFirstFrequency').append(temp).trigger('change');
                    }
                    if(data.secondCompareFlag == '1'){
                        $('#compareSecond').prop('checked', 'checked');
                    }
                    if(data.secondCompareCycle != null && data.secondCompareCycle != null){
                        temp = new Option(data.secondCompareCycle, data.secondCompareCycle, true, true);
                        $('#compareSecondFrequency').append(temp).trigger('change');
                    }
                    $('#compareSecondValue').val(data.secondCompareValueType).trigger('change');
                    
                    /*if(data.esignFlag == 1) {
                        $('#esignFlag').prop('checked', true);
                    } else {
                        $('#esignFlag').prop('checked', false);
                    }*/
                    
                    if(data.fixedRentList.length > 0) {
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
                    
                    if(data.deductList.length > 0) {
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
                    
                    if(data.propertyFeeList.length > 0) {
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
                    
                    if(data.promotionFeeList.length > 0) {
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
                    
                    if(data.depositList.length > 0) {
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
                    
                    /*** START 审批意见书 **/
                    if(data.oldContractTerm != null){
                        $('#oldFreeDays').val(data.oldContractTerm.freeDays || 0);
                        $('#oldGrowthRate').val(parseFloat(data.oldContractTerm.growthRate * 100) || '0');
                        $('#oldBrandName').val(data.oldContractTerm.brandName);
                        $('#oldArea').val(data.oldContractTerm.area);
                        $('#oldBizTypeName').val(data.oldContractTerm.bizScope);
                        $('#oldStartDate').datepicker('update', data.oldContractTerm.startDate);
                        $('#oldEndDate').datepicker('update', data.oldContractTerm.endDate);
                        $('#oldFixedRentTaxAmount').val(accounting.formatNumber(data.oldContractTerm.taxAmount));
                        $('#oldFixedRentAmount').val(accounting.formatNumber(data.oldContractTerm.amount));
                        $('#oldRentalFloorEffect').val(accounting.formatNumber(data.oldContractTerm.rentAmount));
                        $('#oldRentalFloorTaxEffect').val(accounting.formatNumber(data.oldContractTerm.taxRentAmount));
                        $('#oldCostEffect').val(accounting.formatNumber(data.oldContractTerm.budgetRentAmount));
                        $('#oldPropertyMgmtTaxAmount').val(accounting.formatNumber(data.oldContractTerm.taxPropertyFee));
                        $('#oldPropertyMgmtAmount').val(accounting.formatNumber(data.oldContractTerm.propertyFee));
                        $('#oldDepositFee').val(accounting.formatNumber(data.oldContractTerm.deposit));
                        $('#oldTotalAmount').val(accounting.formatNumber(data.oldContractTerm.totalRent));
                        $('#oldTotalTaxAmount').val(accounting.formatNumber(data.oldContractTerm.taxTotalRent));
                        $('#oldMonthAvgAmount').val(accounting.formatNumber(data.oldContractTerm.monthAvgAmount));
                        updateOldSelectStoreDropDownByMallCode(10,$.request.content.mallCode);
                        if(data.oldContractTerm.unitName != null && data.oldContractTerm.unitName != 'null' && data.oldContractTerm.unitCode != null && data.oldContractTerm.unitCode != 'null' ){
                            temp = new Option((data.oldContractTerm.unitName +'['+ data.oldContractTerm.unitCode +']'), data.oldContractTerm.unitCode+':::'+data.oldContractTerm.shopCode+':::'+data.oldContractTerm.unitName, true, true);
                            $('#oldSelectStore').append(temp).trigger('change');
                        }
                        $('#oldTaxPromotionFee').val(accounting.formatNumber(data.oldContractTerm.taxPromotionFee));
                        $('#oldPromotionFee').val(accounting.formatNumber(data.oldContractTerm.promotionFee));
                    }
                    /*** END 审批意见书 **/
                    
                    /*** START DR相关资料提交 **/
                    $('#investmentContractMallSummaryMallSelect').val(data.mallName+'['+data.mallCode+']');
                    if(data.mallSummary != null){
                        var mallSummary = data.mallSummary;
                        $('#investmentContractMallSummaryOpenDate').datepicker('update',mallSummary.openDate);
                        $('#investmentContractMallSummaryTotalRentArea').val(mallSummary.totalRentArea || '');
                        $('#investmentContractMallSummaryBudgetYear').val(mallSummary.budgetYear).trigger('change');
                        $('#investmentContractMallSummaryBudgetAmount').val(mallSummary.budgetAmount);
                        $('#investmentContractMallSummaryActualAmount').val(mallSummary.actualAmount);
                        $('#investmentContractMallSummaryDiffAmount').val(mallSummary.diffAmount);
                        $('#investmentContractMallSummaryBudgetCompletionRate').val(parseFloat(mallSummary.budgetCompletionRate * 100).toFixed(2));
                        $('#investmentContractMallSummaryRentedArea').val(mallSummary.rentedArea);
                        $('#investmentContractMallSummaryReportArea').val(mallSummary.reportArea);
                        $('#investmentContractMallSummarySubRentArea').val(mallSummary.subRentArea);
                        $('#investmentContractMallSummaryRentRate').val(parseFloat(mallSummary.rentRate * 100).toFixed(2));
                        $('#investmentContractMallSummarySubRentRate').val(parseFloat(mallSummary.subRentRate * 100).toFixed(2));
                        $('#investmentContractMallSummaryOpenRentArea').val(mallSummary.openRentArea);
                        $('#investmentContractMallSummaryOpenRate').val(parseFloat(mallSummary.openRate * 100).toFixed(2));
                        $('#investmentContractMallSummarySubOpenRate').val(parseFloat(mallSummary.subOpenRate * 100).toFixed(2));
                    }
                    
                    $('#investmentContractProperteistermMallName_0').val(data.mallName);
                    $('#investmentContractProperteistermArea_0').val(data.area);
                    $('#investmentContractProperteistermFloor_0').val(data.floorName);
                    if(data.compareList != null){
                        $.each(data.compareList, function(i,v) {
                            if(i != 0){
                                $('#investmentContractProperteistermMallName_'+i).val(v.mallName);
                                $('#investmentContractProperteistermArea_'+i).val(v.area);
                                $('#investmentContractProperteistermFloor_'+i).val(v.floor);
                            }
                            $('#investmentContractProperteistermDeduct_'+i).val(parseFloat(v.deduct * 100).toFixed(2));
                            $('#investmentContractProperteistermMinRent_'+i).val(v.minRent);
                            $('#investmentContractProperteistermPromotionFee_'+i).val(parseFloat(v.promotionFee * 100).toFixed(2));
                            $('#investmentContractProperteistermPropertyDayFee_'+i).val(v.propertyDayFee);
                            $('#investmentContractProperteistermRentSalesRate_'+i).val(parseFloat(v.rentSalesRate * 100).toFixed(2));
                            $('#investmentContractProperteistermRentTerm_'+i).val(v.rentTerm);
                            $('#investmentContractProperteistermSalesAmount_'+i).val(v.salesAmount);
                        })
                    }
                    /*** END DR相关资料提交 **/
                    
                    appendLotusLeasingHead();
                    
                    $('#Lotus_leasing_head select').val('').select2({
                        placeholder: "未选择",
                        allowClear: true
                    });
                    
                    if(data.processApproveList != null && data.processApproveList.length > 0) {
                        var temp;
                        $.each(data.processApproveList, function(i,v) {
                            temp = new Option(v.approveName, v.approveOpenId, true, true);
                            switch (v.activityName) {
                                case "财务负责人":
                                    $('#66bfb352-903b-490a-a25b-4c554bc16756 select').append(temp).trigger('change');
                                    break;
                                case "业态负责人审批":
                                    $('#8d2794df-c15f-4d68-9f8e-8b847f6191db select').append(temp).trigger('change');
                                    break;
                                case "法务负责人":
                                    $('#4381cd4e-b984-4641-8a99-15242faae0eb select').append(temp).trigger('change');
                                    break;
                                case "财务预审":
                                    $('#finance_pre_check select').append(temp).trigger('change');
                                    break;
                                case "法务预审":
                                    $('#legal_pre_check select').append(temp).trigger('change');
                                    break;
                                case "Lotus招商负责人":
                                    $('#Lotus_leasing_head select').append(temp).trigger('change');
                                    break;
                                case "商业首席执行官":
                                    $('#hq_leasing_head select').append(temp).trigger('change');
                                    break;
                                default:
                                    break;
                            }
                        })
                    }
                    
                    if(data.processBizApprove == 1) {
                        $('.step-progress li:eq(5)').addClass('active');
                    }
                    
                    if(data.processHqRentApprove == 1) {
                        $('.step-progress li:eq(6)').addClass('active');
                    }
                                        
                    if($("#selectTenant").val() != null && $.request.content.formStatus == 1){
                        findFilesByBizId($("#selectTenant").val());
                    }
                    
                    if($("#brandName").val() != null && $.request.content.formStatus == 1){
                        findFilesByBizId($("#brandName").val());
                    }
                    
                    if(data.coFileList.length > 0) {
                        $.each(data.coFileList, function(i,v){
                            sessionStorage.setItem("uploadFile_"+v.id,JSON.stringify(v));
                            if(v.bizType != null){
                                var bizType = v.bizType.split('_')[1];
                                var type;
                                var action = '<a href="'+$.api.baseLotus+'/api/co/file/showFile?bizId='+v.bizId+'&fileId='+v.fileId+'" target="_blank">查看文件</a>\n\
                                <input type="hidden" id="file_'+v.id+'" />';
                                switch (bizType) {
                                    case "BL":
                                        type = 'businessLicense';
                                        break;
                                    case "IC":
                                        type = 'idCard';
                                        break;
                                    case "TM":
                                        type = 'trademark';
                                        break;
                                    case "BA":
                                        type = 'brandAuthorization';
                                        break;
                                    case "OF":
                                        type = 'otherFiles';
                                        action = '<a href="'+$.api.baseLotus+'/api/co/file/showFile?bizId='+v.bizId+'&fileId='+v.fileId+'" target="_blank">查看文件</a> | \n\
                                        <a href="javascript:void(0)" onclick=\'javascript: deleteFile("'+v.id+'")\'>删除文件</a>\n\
                                        <input type="hidden" id="file_'+v.id+'" />';
                                        break;
                                    default:
                                        break;
                                }
                                
                                $("input[id*='"+type+"_']").each(function(j,e){
                                    if($('#'+type+'_'+j).val() == ''){
                                        $('#'+type+'_'+j).val(v.fileName);
                                        var fileSize;
                                        if(v.fileSize >= 1024 && v.fileSize < 1048576){
                                            fileSize = Math.round(v.fileSize / 1024 * 100) / 100 + 'Kb';
                                        } else if(v.fileSize >= 1048576){
                                            fileSize = Math.round(v.fileSize / 1048576 * 100) / 100 + 'Mb';
                                        } else {
                                            fileSize = v.fileSize + 'b';
                                        }
                                        $('#'+type+'FileSize'+'_'+j).text(fileSize);
                                        $('#'+type+'Created'+'_'+j).text(v.created);
                                        $('#'+type+'Action'+'_'+j).html(action);
                                        $('#'+type+'_'+j).parent().parent().show();
                                        return false;
                                    }
                                })
                            }
                        })
                    }
                    
                    $('input.money').each(function(){
                        $(this).val(accounting.formatNumber($(this).val()));
                    })
                } else {
                    alertMsg('9999','模块加载错误，该错误由【单号错误】导致！');
                }
            } else {
                alertMsg(response.code,response.customerMessage);
            }
        }
    })
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
        calBackPush('fixedRent');
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
    $("#commissionCategory_"+count.toLocaleString()).val(value.category).trigger("change");
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
    
    $("#commissionEndDate_"+count.toLocaleString()).on('changeDate',function(){
        calBackPush('commission');
    });
    
    $("#commissionTaxDeduct_"+count.toLocaleString()).on('change',function(){
        calBackPushCommissionDeduct();
    })
    
    $("#commissionDeduct_"+count.toLocaleString()).on('change',function(){
        calBackPushCommissionTaxDeduct();
    })
    
    $("#commissionAmount_"+count.toLocaleString()+", #commissionMinSalesAmount_"+count.toLocaleString()).on('change',function(){
        calBackPush('commission');
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
    
    $("#propertyMgmtEndDate_"+count.toLocaleString()).on('changeDate',function(){
        calBackPushNextCalendar('propertyMgmt');
        calBackPush('propertyMgmt');
    })
    
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
    var column6 = createRowColumn(newrow);
    var column7 = createRowColumn(newrow);
    var column8 = createRowColumn(newrow);
    var column9 = createRowColumn(newrow);
    var column10 = createRowColumn(newrow);
    var column11 = createRowColumn(newrow);
    
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
    
    var div = document.createElement("div"); //含税扣率
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
    column7.appendChild(div);
    
    var select = document.createElement("select"); //提成基数
    select.setAttribute("class","select2");
    select.setAttribute("id","promotionSalesType_"+count.toLocaleString());
    select.options[0] = new Option('包含营业额中的增值税','1');
    select.options[1] = new Option('不包含营业额中的增值税','2');
    column8.appendChild(select);
    
    var select = document.createElement("select"); //税率
    select.setAttribute("class","select2 taxVat newVAT promotionVATDropDown newFee");
    select.setAttribute("id","promotionTaxRate_"+count.toLocaleString());
    column9.appendChild(select);
    
    var checkbox = document.createElement("input"); //是否开发票
    checkbox.setAttribute("id","promotionInvoiceFlag_"+count.toLocaleString());
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
    $("#promotionSalesType_"+count.toLocaleString()).val(value.salesType).trigger("change");
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
        calBackPush('promotion');
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

function mandatoryCheck(s) {
    $('.mandatory-error').remove();
    var flag = 1;
    var error = '<i class="fa fa-exclamation-circle mandatory-error" aria-hidden="true"></i>';
    
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
    
    if($('#contractType').val() == null) {
        flag = 0;
        $('#contractType').parent().append(error);
    }
    
    if($('#selectRentCalculationMode').val() == null) {
        flag = 0;
        $('#selectRentCalculationMode').parent().append(error);
    }
    
    if(flag == 1){
        if(s == 'submit'){
            submitCheck();
        } else {
            saveContractForm('save');
        }
    } else {
        $('html, body').animate({
            scrollTop: $('.mandatory-error').offset().top - 195
        }, 0);
    }
}

function submitCheck() {
    $('.mandatory-error').remove();
    var flag = 1;
    var error = '<i class="fa fa-exclamation-circle mandatory-error" aria-hidden="true"></i>';
    
    if($('#area').val() == '') {
        flag = 0;
        $('#area').parent().append(error);
    }
    
    if($('#bizDate').val() == '') {
        flag = 0;
        $('#bizDate').parent().append(error);
    }
    
    if($('#awardDate').val() == '') {
        flag = 0;
        $('#awardDate').parent().append(error);
    }
    
    if($('#brandName').val() == null) {
        flag = 0;
        $('#brandName').parent().append(error);
    }
    
    if($('#bizTypeName').val() == '') {
        flag = 0;
        $('#bizTypeName').parent().append(error);
    }
    
    if($('#bizScope').val() == '') {
        flag = 0;
        $('#bizScope').parent().append(error);
    }
    
    if($('#contractNo').val() == '') {
        flag = 0;
        $('#contractNo').parent().append(error);
    }
    
    if($('#floor').val() == null) {
        flag = 0;
        $('#floor').parent().append(error);
    }
    
    if($('#formType').val() == null) {
        flag = 0;
        $('#formType').parent().append(error);
    }
    
    if($('#investmentContractModelMallSelect').val() == '') {
        flag = 0;
        $('#investmentContractModelMallSelect').parent().append(error);
    }
    
    if($('#posMode').val() == null) {
        flag = 0;
        $('#posMode').parent().append(error);
    }
    
    if($('#selectTenant').val() == null) {
        flag = 0;
        $('#selectTenant').parent().append(error);
    }
    
    if($('#targetSales').val() == '' || parseFloat(numberWithoutCommas($('#targetSales').val())) <= 0) {
        flag = 0;
        $('#targetSales').parent().append(error);
    }
    
    if($('#paymentMode').val() == '') {
        flag = 0;
        $('#paymentMode').parent().append(error);
    }
    
    if($('#contractTemplate').val() == '2') {
        if($('#fixedRent tr').length > 1 || $('#commission tr').length > 0) {
            flag = 0;
            $('#contractTemplate').parent().append(error);
        }
    }
    
    var budgetError = '<h5 style="vertical-align: super; display: inline-block; margin-left: 10px; color: #f00;"><i class="fa fa-exclamation-circle mandatory-error" aria-hidden="true" style="position: relative;"></i> 请保存单据后前往【招商规划 - 租金计划】完善当年度预算。</h5>';
    var shopBudget = sessionStorage.getItem("shopBudget_"+$('#selectStore').val().split(':::')[1]);
    
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
            
            var index = 0;
            $("#fixedRent").find("tr").each(function(i,e){
                index = i * 1 + 1;
                if(shopBudget != null && shopBudget != '' && shopBudget != 'null' ){
                    if(JSON.parse(shopBudget).length > 0){
                        var sd = $('#fixedRentStartDate_'+index).val();
                        flag = 1;
                        if(sd != ''){
                            flag = 0;
                            $.each(JSON.parse(shopBudget), function(j,w) {
                                if(w.year == sd.split('-')[0] && w.termType == 'B011'){
                                   flag = 1;
                                   return false;
                                }
                            })
                        }
                    } else {
                        flag = 0;
                        $('#fixedRentBudgetModalLink').parent().append(budgetError);
                    }
                } else {
                    flag = 0;
                    $('#fixedRentBudgetModalLink').parent().append(budgetError);
                }
            })
            if(flag == 0){
                $('#fixedRentBudgetModalLink').parent().append(budgetError);
            }
            
            var index = 0;
            $("#fixedRent").find("tr").each(function(i,e){
                index = i * 1 + 1;
                if(shopBudget != null && shopBudget != '' && shopBudget != 'null' ){
                    if(JSON.parse(shopBudget).length > 0){
                        var sd = $('#fixedRentStartDate_'+index).val();
                        flag = 1;
                        if(sd != ''){
                            flag = 0;
                            $.each(JSON.parse(shopBudget), function(j,w) {
                                if(w.year == sd.split('-')[0] && w.termType == 'SALES'){
                                   flag = 1;
                                   return false;
                                }
                            })
                        }
                    } else {
                        flag = 0;
                    }
                } else {
                    flag = 0;
                }
            })
            if(flag == 0){
                $('#fixedRentBudgetModalLink').parent().append(budgetError);
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
            
            var index = 0;
            $("#commission").find("tr").each(function(i,e){
                index = i * 1 + 1;
                if(shopBudget != null && shopBudget != '' && shopBudget != 'null' ){
                    if(JSON.parse(shopBudget).length > 0){
                        var sd = $('#commissionStartDate_'+index).val();
                        flag = 1;
                        if(sd != ''){
                            flag = 0;
                            $.each(JSON.parse(shopBudget), function(j,w) {
                                if(w.year == sd.split('-')[0] && w.termType == 'D011'){
                                   flag = 1;
                                   return false;
                                }
                            })
                        }
                    } else {
                        flag = 0;
                    }
                } else {
                    flag = 0;
                }
            })
            if(flag == 0){
                $('#commissionBudgetModalLink').parent().append(budgetError);
            }
            
            var index = 0;
            $("#commission").find("tr").each(function(i,e){
                index = i * 1 + 1;
                if(shopBudget != null && shopBudget != '' && shopBudget != 'null' ){
                    if(JSON.parse(shopBudget).length > 0){
                        var sd = $('#commissionStartDate_'+index).val();
                        flag = 1;
                        if(sd != ''){
                            flag = 0;
                            $.each(JSON.parse(shopBudget), function(j,w) {
                                if(w.year == sd.split('-')[0] && w.termType == 'SALES'){
                                   flag = 1;
                                   return false;
                                }
                            })
                        }
                    } else {
                        flag = 0;
                    }
                } else {
                    flag = 0;
                }
            })
            if(flag == 0){
                $('#commissionBudgetModalLink').parent().append(budgetError);
            }
        } else {
            flag = 0;
            $('#investmentContractAccounttermCommission').append(error);
        }
    }
    
    var index = 0;
    $("#propertyMgmt").find("tr").each(function(i,e){
        index = i * 1 + 1;
        if(shopBudget != null && shopBudget != '' && shopBudget != 'null' ){
            if(JSON.parse(shopBudget).length > 0){
                var sd = $('#propertyMgmtStartDate_'+index).val();
                flag = 1;
                if(sd != ''){
                    flag = 0;
                    $.each(JSON.parse(shopBudget), function(j,w) {
                        if(w.year == sd.split('-')[0] && w.termType == 'B021'){
                           flag = 1;
                           return false;
                        }
                    })
                }
            } else {
                flag = 0;
            }
        } else {
            flag = 0;
        }
    })
    
    if(flag == 0){
        $('#propertyMgmtBudgetModalLink').parent().append(budgetError);
    }
    
    var index = 0;
    $("#promotion").find("tr").each(function(i,e){
        index = i * 1 + 1;
        if(shopBudget != null && shopBudget != '' && shopBudget != 'null' ){
            if(JSON.parse(shopBudget).length > 0){
                var sd = $('#promotionStartDate_'+index).val();
                flag = 1;
                if(sd != ''){
                    flag = 0;
                    $.each(JSON.parse(shopBudget), function(j,w) {
                        if(w.year == sd.split('-')[0] && w.termType == 'G011'){
                           flag = 1;
                           return false;
                        }
                    })
                }
            } else {
                flag = 0;
            }
        } else {
            flag = 0;
        }
    })
    
    if(flag == 0){
        $('#promotionBudgetModalLink').parent().append(budgetError);
    }
    
    if($('#businessLicense_0').val() == '') {
        flag = 0;
        $('#businessLicense_0').parent().append(error);
    }
    
    if($('#idCard_0').val() == '') {
        flag = 0;
        $('#idCard_0').parent().append(error);
    }
    
    if($('#trademark_0').val() == '') {
        flag = 0;
        $('#trademark_0').parent().append(error);
    }
    
    if($('#brandAuthorization_0').val() == '') {
        flag = 0;
        $('#brandAuthorization_0').parent().append(error);
    }
    
    if($('#66bfb352-903b-490a-a25b-4c554bc16756 select').val() == null) {
        flag = 0;
        $('#66bfb352-903b-490a-a25b-4c554bc16756 select').parent().append(error);
    }
    
    if($('#4381cd4e-b984-4641-8a99-15242faae0eb select').val() == null) {
        flag = 0;
        $('#4381cd4e-b984-4641-8a99-15242faae0eb select').parent().append(error);
    }
    
    if($('#finance_pre_check select').val() == null) {
        flag = 0;
        $('#finance_pre_check select').parent().append(error);
    }
    
    if($('#legal_pre_check select').val() == null) {
        flag = 0;
        $('#legal_pre_check select').parent().append(error);
    }
    
    if($('#Lotus_leasing_head select').val() == null) {
        flag = 0;
        $('#Lotus_leasing_head select').parent().append(error);
    }
    
    var area = $('#area').val();
    if(area >= 500){
        if($('#hq_leasing_head select').val() == null) {
            flag = 0;
            $('#hq_leasing_head select').parent().append(error);
        }
    } else {
        if($('#hq_leasing_head select').val() == null && $('#8d2794df-c15f-4d68-9f8e-8b847f6191db select').val() == null) {
            flag = 0;
            $('#8d2794df-c15f-4d68-9f8e-8b847f6191db select').parent().append(error);
        }
    }
    
    if($('#oldSelectStore').val() == null) {
        flag = 0;
        $('#oldSelectStore').parent().append(error);
    }
    
    if($('#oldBizTypeName').val() == '') {
        flag = 0;
        $('#oldBizTypeName').parent().append(error);
    }
    
    if($('#oldRentalFloorEffect').val() == '') {
        flag = 0;
        $('#oldRentalFloorEffect').parent().append(error);
    }
    
    if($('#oldArea').val() == '') {
        flag = 0;
        $('#oldArea').parent().append(error);
    }
    
    if($('#oldCostEffect').val() == '') {
        flag = 0;
        $('#oldCostEffect').parent().append(error);
    }
    
    if($('#oldBrandName').val() == '') {
        flag = 0;
        $('#oldBrandName').parent().append(error);
    }
    
    if($('#oldRentalFloorTaxEffect').val() == '') {
        flag = 0;
        $('#oldRentalFloorTaxEffect').parent().append(error);
    }
    
    if($('#oldFixedRentTaxAmount').val() == '') {
        flag = 0;
        $('#oldFixedRentTaxAmount').parent().append(error);
    }
    
    if($('#oldFixedRentAmount').val() == '') {
        flag = 0;
        $('#oldFixedRentAmount').parent().append(error);
    }
    
    if($('#oldTotalTaxAmount').val() == '') {
        flag = 0;
        $('#oldTotalTaxAmount').parent().append(error);
    }
    
    if($('#oldDepositFee').val() == '') {
        flag = 0;
        $('#oldDepositFee').parent().append(error);
    }
    
    if($('#oldPropertyMgmtTaxAmount').val() == '') {
        flag = 0;
        $('#oldPropertyMgmtTaxAmount').parent().append(error);
    }
    
    if($('#oldTotalAmount').val() == '') {
        flag = 0;
        $('#oldTotalAmount').parent().append(error);
    }
    
    if($('#oldFreeDays').val() == '') {
        flag = 0;
        $('#oldFreeDays').parent().append(error);
    }
    
    if($('#oldPropertyMgmtAmount').val() == '') {
        flag = 0;
        $('#oldPropertyMgmtAmount').parent().append(error);
    }
    
    if($('#oldGrowthRate').val() == '') {
        flag = 0;
        $('#oldGrowthRate').parent().append(error);
    }
    
    if($('#oldMonthAvgAmount').val() == '') {
        flag = 0;
        $('#oldMonthAvgAmount').parent().append(error);
    }
    
    if($('#oldTaxPromotionFee').val() == '') {
        flag = 0;
        $('#oldTaxPromotionFee').parent().append(error);
    }
    
    if($('#oldPromotionFee').val() == '') {
        flag = 0;
        $('#oldPromotionFee').parent().append(error);
    }
    
    if($('#investmentContractMallSummaryOpenDate').val() == '') {
        flag = 0;
        $('#investmentContractMallSummaryOpenDate').parent().append(error);
    }
    
    if($('#investmentContractMallSummaryTotalRentArea').val() == '') {
        flag = 0;
        $('#investmentContractMallSummaryTotalRentArea').parent().append(error);
    }
    
    if($('#investmentContractMallSummaryBudgetAmount').val() == '') {
        flag = 0;
        $('#investmentContractMallSummaryBudgetAmount').parent().append(error);
    }
    
    if($('#investmentContractMallSummaryActualAmount').val() == '') {
        flag = 0;
        $('#investmentContractMallSummaryActualAmount').parent().append(error);
    }
    
    if($('#investmentContractMallSummaryDiffAmount').val() == '') {
        flag = 0;
        $('#investmentContractMallSummaryDiffAmount').parent().append(error);
    }
    
    if($('#investmentContractMallSummaryBudgetCompletionRate').val() == '') {
        flag = 0;
        $('#investmentContractMallSummaryBudgetCompletionRate').parent().append(error);
    }
    
    if($('#investmentContractMallSummaryRentedArea').val() == '') {
        flag = 0;
        $('#investmentContractMallSummaryRentedArea').parent().append(error);
    }
    
    if($('#investmentContractMallSummaryReportArea').val() == '') {
        flag = 0;
        $('#investmentContractMallSummaryReportArea').parent().append(error);
    }
    
    if($('#investmentContractMallSummarySubRentArea').val() == '') {
        flag = 0;
        $('#investmentContractMallSummarySubRentArea').parent().append(error);
    }
    
    if($('#investmentContractMallSummaryRentRate').val() == '') {
        flag = 0;
        $('#investmentContractMallSummaryRentRate').parent().append(error);
    }
    
    if($('#investmentContractMallSummarySubRentRate').val() == '') {
        flag = 0;
        $('#investmentContractMallSummarySubRentRate').parent().append(error);
    }
    
    if($('#investmentContractMallSummaryOpenRentArea').val() == '') {
        flag = 0;
        $('#investmentContractMallSummaryOpenRentArea').parent().append(error);
    }
    
    if($('#investmentContractMallSummaryOpenRate').val() == '') {
        flag = 0;
        $('#investmentContractMallSummaryOpenRate').parent().append(error);
    }
    
    if($('#investmentContractMallSummarySubOpenRate').val() == '') {
        flag = 0;
        $('#investmentContractMallSummarySubOpenRate').parent().append(error);
    }
    
    if(flag == 1){
        saveContractForm('submit');
    } else {
        $('html, body').animate({
            scrollTop: $('.mandatory-error').offset().top - 195
        }, 0);
    }
}

function saveContractForm(s) {
    var msg;
    if(s == 'submit'){
        msg = '确定要将此内容提交审批吗？';
    } else {
        msg = '确定要将此内容保存为草稿吗？';
    }
    Ewin.confirm({ message: msg }).on(function (e) {
        if (!e) {
            return;
        } else {
            $('.modal.in').hide().remove();
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
        
        var bizId = $('#bizId').val();
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
        
        var processBizApprove = 0;
        if($('.step-progress li:eq(4)').hasClass('active') == true){
            processBizApprove = 1;
        }
        
        var processHqRentApprove = 0;
        if($('.step-progress li:eq(5)').hasClass('active') == true){
            processHqRentApprove = 1;
        }
        
        var secondCompareFlag = 0;
        if($('#compareSecond').prop('checked') == true){
            secondCompareFlag = 1;
        }
        
        var processApproveList = [];
        var lotusRentFlowStep = JSON.parse(sessionStorage.getItem('LOTUS_RENT_FLOW_STEP'));
        if(lotusRentFlowStep.length > 0){
            $.each(lotusRentFlowStep, function(i,v) {
                var processApprove = {};
                processApprove.activityCode = v.dictCode;
                processApprove.activityName = v.dictName;
                switch (v.dictName) {
                    case "财务负责人":
                        processApprove.approveName = $('#66bfb352-903b-490a-a25b-4c554bc16756 select').find('option:selected').text();
                        processApprove.approveOpenId = $('#66bfb352-903b-490a-a25b-4c554bc16756 select').find('option:selected').val();
                        break;
                    case "业态负责人审批":
                        processApprove.approveName = $('#8d2794df-c15f-4d68-9f8e-8b847f6191db select').find('option:selected').text();
                        processApprove.approveOpenId = $('#8d2794df-c15f-4d68-9f8e-8b847f6191db select').find('option:selected').val();
                        break;
                    case "法务负责人":
                        processApprove.approveName = $('#4381cd4e-b984-4641-8a99-15242faae0eb select').find('option:selected').text();
                        processApprove.approveOpenId = $('#4381cd4e-b984-4641-8a99-15242faae0eb select').find('option:selected').val();
                        break;
                    case "财务预审":
                        processApprove.approveName = $('#finance_pre_check select').find('option:selected').text();
                        processApprove.approveOpenId = $('#finance_pre_check select').find('option:selected').val();
                        break;
                    case "法务预审":
                        processApprove.approveName = $('#legal_pre_check select').find('option:selected').text();
                        processApprove.approveOpenId = $('#legal_pre_check select').find('option:selected').val();
                        break;
                    case "Lotus招商负责人":
                        processApprove.approveName = $('#Lotus_leasing_head select').find('option:selected').text();
                        processApprove.approveOpenId = $('#Lotus_leasing_head select').find('option:selected').val();
                        break;
                    case "商业首席执行官":
                        processApprove.approveName = $('#hq_leasing_head select').find('option:selected').text();
                        processApprove.approveOpenId = $('#hq_leasing_head select').find('option:selected').val();
                        break;
                    default:
                        break;
                }
                processApprove.bizId = bizId;
                processApprove.state = 1;
                
                if(processApprove.approveOpenId != null){
                    processApproveList.push(processApprove);
                }
            })
        }
        
        var index;
        
        var fixedRentList = [];
        var salesList = [];
        if($('#selectRentCalculationMode').find('option:selected').val() != 'deduct') {
            var len = $("#fixedRent").find("tr").length;
            $("#fixedRent").find("tr").each(function(i,e){
                var fixedRent = {};
                var minSales = {}; 
                index = i * 1 + 1;
                fixedRent.itemCode = $('#fixedRentItem_'+index).val();
                fixedRent.itemName = $('#select2-fixedRentItem_'+index+'-container').text().split('[')[0];

                fixedRent.shopCode = shopCode;
                fixedRent.area = area;

                fixedRent.settlePeriodCode = $('#fixedRentSettlePeriod_1').val(); // 结算周期
                fixedRent.settlePeriodName = $('#select2-fixedRentSettlePeriod_1-container').text(); // 结算周期

                fixedRent.periodTypeCode = $('#fixedRentPeriodType_1').val(); // 周期类型
                fixedRent.periodTypeName = $('#select2-fixedRentPeriodType_1-container').text(); // 周期类型

                fixedRent.settleDay = $('#fixedRentSettleDay_1').val(); // 结算日期
                
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

                minSales.startDate = fixedRent.startDate;
                minSales.endDate = fixedRent.endDate;
                minSales.amount =  numberWithoutCommas($('#fixedRentMinSalesAmount_'+index).val());
                
                if($('#fixedRentInvoiceFlag_'+index).prop('checked') == true){
                    fixedRent.invoiceFlag = 1;
                } else {
                    fixedRent.invoiceFlag = 0;
                }

                fixedRentList.push(fixedRent);
                salesList.push(minSales);
            })
        }
        
        if(s == 'submit'){
            if(fixedRentList.length > 0) {
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
                    alertMsg('9999','固定租金条款开始日与结束日错误，请修改重新提交！');
                    return false;
                } 
            }
        }
        
        var deductList = [];
        if($('#selectRentCalculationMode').find('option:selected').val() != 'fixRent') {
            salesList = [];
            var len = $("#commission").find("tr").length;
            $("#commission").find("tr").each(function(i,e){
                var commission = {};
                var minSales = {};
                index = i * 1 + 1;
                commission.itemCode = $('#commissionItem_'+index).val();
                commission.itemName = $('#select2-commissionItem_'+index+'-container').text().split('[')[0];

                commission.shopCode = shopCode;
                commission.area = area;

                commission.salesType = $('#commissionSalesType_1').val();

                commission.settlePeriodCode = $('#commissionSettlePeriod_1').val(); // 结算周期
                commission.settlePeriodName = $('#select2-commissionSettlePeriod_1-container').text(); // 结算周期

                commission.periodTypeCode = $('#commissionPeriodType_1').val(); // 周期类型
                commission.periodTypeName = $('#select2-commissionPeriodType_1-container').text(); // 周期类型

                commission.settleDay = $('#commissionSettleDay_1').val(); // 结算日期

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
                commission.targetSales =  numberWithoutCommas($('#commissionMinSales_'+index).val());

                commission.taxRate = $('#commissionTaxRate_'+index).val();
                commission.taxCode = $('#commissionTaxRate_'+index).find('option:selected').attr('data-code');
                
                minSales.startDate = commission.startDate;
                minSales.endDate = commission.endDate;
                minSales.amount =  numberWithoutCommas($('#commissionMinSalesAmount_'+index).val());

                if($('#commissionInvoiceFlag_'+index).prop('checked') == true){
                    commission.invoiceFlag = 1;
                } else {
                    commission.invoiceFlag = 0;
                }

                deductList.push(commission);  
                salesList.push(minSales);
            })
        }
        
        if(s == 'submit'){
            if(deductList.length > 0) {
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
                    alertMsg('9999','提成租金条款开始日与结束日错误，请修改重新提交！');
                    return false;
                } 
            }
        }
        
        var depositList = [];
        $("#deposit").find("tr").each(function(i,e){
            var deposit = {};
            index = i * 1 + 1;
            if(numberWithoutCommas($('#deposittermAmount_'+index).val()) > 0) {
                deposit.itemCode = $('#deposittermItem_'+index).val();
                deposit.itemName = $('#select2-deposittermItem_'+index+'-container').text().split('[')[0];
                deposit.amount =  numberWithoutCommas($('#deposittermAmount_'+index).val());
                deposit.paymentDate = $('#deposittermPaymentDate_'+index).val();
                deposit.taxRate = 0;
                deposit.taxCode = $('#deposittermTaxRate_'+index).find('option:selected').attr('data-code');

                depositList.push(deposit);
            }
            
        })
        
        var promotionFeeList = [];
        var len = $("#promotion").find("tr").length;
        $("#promotion").find("tr").each(function(i,e){
            var promotion = {};
            index = i * 1 + 1;
            promotion.itemCode = $('#promotionItem_'+index).val();
            promotion.itemName = $('#select2-promotionItem_'+index+'-container').text().split('[')[0];

            promotion.shopCode = shopCode;
            promotion.area = area;

            promotion.settlePeriodCode = $('#promotionSettlePeriod_1').val(); // 结算周期
            promotion.settlePeriodName = $('#select2-promotionSettlePeriod_1-container').text(); // 结算周期

            promotion.periodTypeCode = $('#promotionPeriodType_1').val(); // 周期类型
            promotion.periodTypeName = $('#select2-promotionPeriodType_1-container').text(); // 周期类型

            promotion.settleDay = $('#promotionSettleDay_1').val(); // 结算日期

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

            promotion.deduct = parseFloat(numberWithoutCommas($('#promotionDeduct_'+index).val())) / 100;
            promotion.taxDeduct = parseFloat(numberWithoutCommas($('#promotionTaxDeduct_'+index).val())) / 100;
            promotion.salesType = $('#promotionSalesType_'+index).val();

            promotion.taxRate = $('#promotionTaxRate_'+index).val();
            promotion.taxCode = $('#promotionTaxRate_'+index).find('option:selected').attr('data-code');

            if($('#promotionInvoiceFlag_'+index).prop('checked') == true){
                promotion.invoiceFlag = 1;
            } else {
                promotion.invoiceFlag = 0;
            }

            promotionFeeList.push(promotion);
        })
        
        if(s == 'submit'){
            if(promotionFeeList.length > 0) {
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
                    alertMsg('9999','推广费条款开始日与结束日错误，请修改重新提交！');
                    return false;
                } 
            }
        }
        
        var propertyFeeList = [];
        var len = $("#propertyMgmt").find("tr").length;
        $("#propertyMgmt").find("tr").each(function(i,e){
            var propertyMgmt = {};
            index = i * 1 + 1;
            propertyMgmt.itemCode = $('#propertyMgmtItem_'+index).val();
            propertyMgmt.itemName = $('#select2-propertyMgmtItem_'+index+'-container').text().split('[')[0];

            propertyMgmt.shopCode = shopCode;
            propertyMgmt.area = area;

            propertyMgmt.settlePeriodCode = $('#propertyMgmtSettlePeriod_1').val(); // 结算周期
            propertyMgmt.settlePeriodName = $('#select2-propertyMgmtSettlePeriod_1-container').text(); // 结算周期

            propertyMgmt.periodTypeCode = $('#propertyMgmtPeriodType_1').val(); // 周期类型
            propertyMgmt.periodTypeName = $('#select2-propertyMgmtPeriodType_1-container').text(); // 周期类型

            propertyMgmt.settleDay = $('#propertyMgmtSettleDay_1').val(); // 结算日期

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

            propertyFeeList.push(propertyMgmt);
        })
        
        if(s == 'submit'){
            if(propertyFeeList.length > 0) {
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
                    alertMsg('9999','物业管理费条款开始日与结束日错误，请修改重新提交！');
                    return false;
                } 
            }
        }
        
        var oldContractTerm = {};
        if($.request.content.oldContractTerm != null) {
            oldContractTerm = $.request.content.oldContractTerm;
        }
        oldContractTerm.amount = numberWithoutCommas($('#oldFixedRentAmount').val());
        oldContractTerm.area = $('#oldArea').val();
        oldContractTerm.bizId = bizId;
        oldContractTerm.bizScope = $('#oldBizTypeName').val();
        oldContractTerm.brandName = $('#oldBrandName').val();
        oldContractTerm.budgetRentAmount = numberWithoutCommas($('#oldCostEffect').val());
        oldContractTerm.deposit = numberWithoutCommas($('#oldDepositFee').val());
        oldContractTerm.endDate = $('#oldEndDate').val() || '';
        oldContractTerm.freeDays = $('#oldFreeDays').val();
        oldContractTerm.growthRate = parseFloat($('#oldGrowthRate').val() / 100);
        oldContractTerm.propertyFee = numberWithoutCommas($('#oldPropertyMgmtAmount').val());
        oldContractTerm.rentAmount = numberWithoutCommas($('#oldRentalFloorEffect').val());
        oldContractTerm.startDate = $('#oldStartDate').val() || '';
        oldContractTerm.taxAmount = numberWithoutCommas($('#oldFixedRentTaxAmount').val());
        oldContractTerm.taxPropertyFee = numberWithoutCommas($('#oldPropertyMgmtTaxAmount').val());
        oldContractTerm.taxRentAmount = numberWithoutCommas($('#oldRentalFloorTaxEffect').val());
        oldContractTerm.taxTotalRent = numberWithoutCommas($('#oldTotalTaxAmount').val());
        oldContractTerm.totalRent = numberWithoutCommas($('#oldTotalAmount').val());
        oldContractTerm.updateOpenId = openId;
        if(oldContractTerm.startDate != '' && oldContractTerm.endDate != ''){
            oldContractTerm.rentDuration = calDatesDiff(oldContractTerm.startDate,oldContractTerm.endDate);
        }
        oldContractTerm.monthAvgAmount = numberWithoutCommas($('#oldMonthAvgAmount').val());
        if( $('#oldSelectStore').val() && $('#oldSelectStore').val() != '' && $('#oldSelectStore').val() != null && $('#oldSelectStore').val() != 'null'){
            oldContractTerm.unitCode = $('#oldSelectStore').val().split(':::')[0];
            oldContractTerm.shopCode = $('#oldSelectStore').val().split(':::')[1];
            oldContractTerm.unitName = $('#oldSelectStore').val().split(':::')[2];
            oldContractTerm.planModalitySecond = $('#oldSelectStore').val().split(':::')[3];
        }
        oldContractTerm.taxPromotionFee = numberWithoutCommas($('#oldTaxPromotionFee').val());
        oldContractTerm.promotionFee = numberWithoutCommas($('#oldPromotionFee').val());
        
        var mallSummary = {};
        if($.request.content.mallSummary != null) {
            mallSummary = $.request.content.mallSummary;
        }
        mallSummary.updateOpenId = openId;
        mallSummary.mallName = $.request.content.mallName;
        mallSummary.mallCode = $.request.content.mallCode;
        mallSummary.openDate = $('#investmentContractMallSummaryOpenDate').val();
        mallSummary.totalRentArea = $('#investmentContractMallSummaryTotalRentArea').val();
        mallSummary.budgetYear = $('#investmentContractMallSummaryBudgetYear').val();
        mallSummary.budgetAmount = numberWithoutCommas($('#investmentContractMallSummaryBudgetAmount').val());
        mallSummary.actualAmount = numberWithoutCommas($('#investmentContractMallSummaryActualAmount').val());
        mallSummary.diffAmount = numberWithoutCommas($('#investmentContractMallSummaryDiffAmount').val());
        mallSummary.budgetCompletionRate = parseFloat($('#investmentContractMallSummaryBudgetCompletionRate').val() / 100).toFixed(4);
        mallSummary.rentedArea = $('#investmentContractMallSummaryRentedArea').val();
        mallSummary.reportArea = $('#investmentContractMallSummaryReportArea').val();
        mallSummary.subRentArea = $('#investmentContractMallSummarySubRentArea').val();
        mallSummary.rentRate = parseFloat($('#investmentContractMallSummaryRentRate').val() / 100).toFixed(4);
        mallSummary.subRentRate = parseFloat($('#investmentContractMallSummarySubRentRate').val() / 100).toFixed(4);
        mallSummary.openRentArea = $('#investmentContractMallSummaryOpenRentArea').val();
        mallSummary.openRate = parseFloat($('#investmentContractMallSummaryOpenRate').val() / 100).toFixed(4);
        mallSummary.subOpenRate = parseFloat($('#investmentContractMallSummarySubOpenRate').val() / 100).toFixed(4);
        
        var compareList = [];
        if($.request.content.compareList != null && $.request.content.compareList.length > 0) {
            $.each($.request.content.compareList, function(i,v) {
                v.area = $('#investmentContractProperteistermArea_'+i).val();
                v.bizId = bizId;
                v.deduct = parseFloat($('#investmentContractProperteistermDeduct_'+i).val() / 100).toFixed(4);
                v.floor = $('#investmentContractProperteistermFloor_'+i).val();
                v.mallName = $('#investmentContractProperteistermMallName_'+i).val();
                v.minRent = $('#investmentContractProperteistermMinRent_'+i).val();
                v.promotionFee = parseFloat($('#investmentContractProperteistermPromotionFee_'+i).val() / 100).toFixed(4);
                v.propertyDayFee = $('#investmentContractProperteistermPropertyDayFee_'+i).val();
                v.rentSalesRate = parseFloat($('#investmentContractProperteistermRentSalesRate_'+i).val() / 100).toFixed(4);
                v.rentTerm = $('#investmentContractProperteistermRentTerm_'+i).val();
                v.salesAmount = numberWithoutCommas($('#investmentContractProperteistermSalesAmount_'+i).val());
                v.updateOpenId = openId;
                
                compareList.push(v);
            })
        } else {
            var compares = {};
            for(var i=0;i<4;i++){
                compares = {
                    area : $('#investmentContractProperteistermArea_'+i).val(),
                    bizId : bizId,
                    deduct : parseFloat($('#investmentContractProperteistermDeduct_'+i).val() / 100).toFixed(4),
                    floor : $('#investmentContractProperteistermFloor_'+i).val(),
                    mallName : $('#investmentContractProperteistermMallName_'+i).val(),
                    minRent : $('#investmentContractProperteistermMinRent_'+i).val(),
                    promotionFee : parseFloat($('#investmentContractProperteistermPromotionFee_'+i).val() / 100).toFixed(4),
                    propertyDayFee : $('#investmentContractProperteistermPropertyDayFee_'+i).val(),
                    rentSalesRate : parseFloat($('#investmentContractProperteistermRentSalesRate_'+i).val() / 100).toFixed(4),
                    rentTerm : $('#investmentContractProperteistermRentTerm_'+i).val(),
                    salesAmount : numberWithoutCommas($('#investmentContractProperteistermSalesAmount_'+i).val()),
                    createOpenId : openId
                }
                compareList.push(compares);
            }
        }

        var map = {
            "id": $.request.content.id, //必填
            "code": $.request.content.code, //必填
            "bizId": bizId, //必填
            "formType": $('#formType').find('option:selected').val(), //必填
            "area": area, //必填
            "shopCode": shopCode, //必填
            "rentCalculationMode": selectRentCalculationMode, //必填
            "endDate": endDate, //必填
            "contractType": contractType, //必填
            "unitCode": unitCode, //必填
            "mallCode": $.request.content.mallCode, //必填
            "startDate": startDate, //必填
            "unitName": unitName, //必填
            "activityTimes": 0,
            "approvalName": $.request.content.creatorName,
            "approvalOpenId": $.request.content.creatorOpenId,
            "awardDate": $('#awardDate').val(),
            "bindCondition": "",
            "bizDate": $('#bizDate').val(),
            "bizFreeEndDate": "",
            "bizFreeStartDate": "",
            "bizScope": $('#bizScope').val(),
            "bizTypeCode": "",
            "bizTypeName": $('#bizTypeName').val(),
            "brandCode": brandCode,
            "brandName": brandName,
            "cardDiscount": 0,
            "compareList": compareList,
            "contractName": $('#contractName').val(),
            "contractNo": $('#contractNo').val(),
            "contractTemplate": $('#contractTemplate').find('option:selected').val(),
            "contractVersion": 1,
            "creatorCode": $.request.content.creatorCode,
            "creatorName": $.request.content.creatorName,
            "creatorOpenId": $.request.content.creatorOpenId,
            "creatorOrgId": "",
            "creatorOrgName": "",
            "dayRent": 0,
            "deductList": deductList,
            "deliveryCondition": "",
            "deliveryDate": $('#deliveryDate').val(),
            "depositList": depositList,
            "duration": 0,
            "enterDate": $('#enterDate').val(),
            //"esignFlag": esignFlag,
            "esignFlag": 0,
            "exclusiveCondition": "",
            "firstCompareCycle": ($('#compareFirstFrequency').val() != "" ? $('#compareFirstFrequency').val() : ""),
            "firstYearRentFee": "",
            "firstYearRentFeeUnit": "",
            "fixedRentList": fixedRentList,
            "floorCode": $('#floor').find('option:selected').val(),
            "floorName": $('#floor').find('option:selected').text(),
            "formStatus": $.request.content.formStatus,
            "freeDayBizRental": 0,
            "freeDays": $('#freeDays').val(),
            "freeEndDate": $('#freeEndDate_1').val(),
            "freeOverdueDays": 0,
            "freeStartDate": $('#freeStartDate_1').val(),
            "graphFee": 0,
            "growthRate": 0,
            "intentDate": "",
            "intentionMoney": 0,
            "isSupplement": "",
            "lastBrandCode": "",
            "lastBrandName": "",
            "mallName": $.request.content.mallName,
            "mallSummary": mallSummary,
            "minSales": 0,
            "oldContractTerm": oldContractTerm,
            "openEndTime": $('#openEndTime').val(),
            "openStartTime": $('#openStartTime').val(),
            "overdueBizAmount": 0,
            "overdueFee": 0,
            "paymentMode": $('#paymentMode').find('option:selected').val(),
            "posMode": $('#posMode').find('option:selected').val(),
            "processApproveList": processApproveList,
            "processBizApprove": processBizApprove,
            "processHqRentApprove": processHqRentApprove,
            "processInstId": "",
            "profitCenter": $('#profitCenter').val(),
            "promotionFee": 0,
            "promotionFeeList": promotionFeeList,
            "promotionFeeUnit": "",
            "propertyFeeList": propertyFeeList,
            "propertyManageFee": 0,
            "publicUtilitiesFee": 0,
            "remark": $('#remark').val(),
            "rentDeductRate": 0,
            "rentSalesRate": 0,
            "salesList": salesList,
            "secondCompareCycle": ($('#compareSecondFrequency').val() != "" ? $('#compareSecondFrequency').val() : ""),
            "secondCompareFlag": secondCompareFlag,
            "secondCompareValueType": $('#compareSecondValue').val(),
            "targetSales": numberWithoutCommas($('#targetSales').val()),
            "taxReimbursement": "",
            "taxTotalPropertyAmount": numberWithoutCommas($('#propertyMgmtTaxTotalPropertyAmount').text()),
            "taxTotalRentAmount": numberWithoutCommas($('#fixedRentTaxTotalRentAmount').text()),
            "telLineNum": 0,
            "tenantCode": $('#selectTenant').val(),
            "tenantLicenseCode": "",
            "tenantName": $('#select2-selectTenant-container').text().split(' | ')[1],
            "tenantNo": $('#select2-selectTenant-container').text().split(' | ')[0],
            "tenantOrgCode": "",
            "tenantTaxCode": "",
            "termCalcMode": $('#termCalcMode').val(),
            "totalPropertyAmount": numberWithoutCommas($('#propertyMgmtTotalPropertyAmount').text()),
            "totalRentAmount": numberWithoutCommas($('#fixedRentTotalRentAmount').text()),
            "unitBuildingArea": 0,
            "updateCode": userCode,
            "updateName": $('#creatorName').val(),
            "updateOpenId": openId,
            "vipCardDiscount": "",
            "vipCardFlag": "",
            "vipCardPromotionFee": 0,
            "vipCardType": ""
        };
        
        if(s == 'submit') {
            $.ajax({
                url: $.api.baseLotus+"/api/rent/contract/form/checkDuplicateDate",
                type: "POST",
                data: JSON.stringify(map),
                async: false,
                dataType: "json",
                contentType: "application/json",
                beforeSend: function(request) {
                    $('#submitState').text('检查租赁期间是否已被占用中...').fadeIn();
                    $('#submitStateModal').modal('show');
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

                        $.ajax({
                            url: $.api.baseLotus+"/api/rent/contract/form/checkDate",
                            type: "POST",
                            data: JSON.stringify(map),
                            async: false,
                            dataType: "json",
                            contentType: "application/json",
                            beforeSend: function(request) {
                                $('#submitState').fadeOut().text('检查租赁期间是否正确...').fadeIn();
                                request.setRequestHeader("Login", $.cookie('login'));
                                request.setRequestHeader("Authorization", $.cookie('authorization'));
                                request.setRequestHeader("Lang", $.cookie('lang'));
                                request.setRequestHeader("Source", "onlineleasing");
                            },
                            complete: function(){},
                            success: function (response, status, xhr) {
                                if(response.code === 'C0') {
                                    $.ajax({
                                        url: $.api.baseLotus+"/api/rent/contract/form/checkRentCalculationMode",
                                        type: "POST",
                                        data: JSON.stringify(map),
                                        async: false,
                                        dataType: "json",
                                        contentType: "application/json",
                                        beforeSend: function(request) {
                                            $('#submitState').fadeOut().text('检查计租模式...').fadeIn();
                                            request.setRequestHeader("Login", $.cookie('login'));
                                            request.setRequestHeader("Authorization", $.cookie('authorization'));
                                            request.setRequestHeader("Lang", $.cookie('lang'));
                                            request.setRequestHeader("Source", "onlineleasing");
                                        },
                                        complete: function(){},
                                        success: function (response, status, xhr) {
                                            if(response.code === 'C0') {
                                                var submitRentContractForm = $.ajax({
                                                    url: $.base+"/zuul/onlineleasing-lotus/api/rent/contract/form/submit",
                                                    type: "POST",
                                                    data: JSON.stringify(map),
                                                    async: false,
                                                    timeout: 15000,
                                                    dataType: "json",
                                                    contentType: "application/json",
                                                    beforeSend: function(request) {
                                                        $('#submitState').fadeOut().text('提交单据中...').fadeIn();
                                                        request.setRequestHeader("Login", $.cookie('login'));
                                                        request.setRequestHeader("Authorization", $.cookie('authorization'));
                                                        request.setRequestHeader("Lang", $.cookie('lang'));
                                                        request.setRequestHeader("Source", "onlineleasing");
                                                    },
                                                    complete: function(jqXHR, textStatus, errorThrown) {
                                                        if(textStatus == 'timeout'){
                                                             submitRentContractForm.abort();
                                                             submitRentContractForm();
                                                         }
                                                    },
                                                    success: function (response, status, xhr) {
                                                        $('#submitState').text('');
                                                        $('#submitStateModal').modal('hide');
                                                        if(response.code === 'C0') {
                                                            if(response.data.resultCode == "ERROR" && response.data.id != ""){
                                                                $.request.content.id = response.data.id;
                                                                alertMsg(response.data.resultCode,response.data.resultMsg);
                                                            } else if(response.data.id != "" && response.data.formStatus == "2"){
                                                                window.location.href = '/lotus-admin/request-summary?id='+response.data.bizId+'&s=succeed';
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
                                            } else {
                                                alertMsg(response.code,response.customerMessage);
                                            }
                                        },
                                        error: function(jqXHR, textStatus, errorThrown) {
                                            console.log(textStatus, errorThrown);
                                        }
                                    });
                                } else {
                                    alertMsg(response.code,response.customerMessage);
                                }
                            },
                            error: function(jqXHR, textStatus, errorThrown) {
                                console.log(textStatus, errorThrown);
                            }
                        });
                    } else {
                        alertMsg(response.code,response.customerMessage);
                    }
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.log(textStatus, errorThrown);
                }
            });
        } else {
            var saveRentContractDraft = $.ajax({
                url: $.api.baseLotus+"/api/rent/contract/form/saveOrUpdate",
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
                complete: function(jqXHR, textStatus, errorThrown) {
                    if(textStatus == 'timeout'){
                         saveRentContractDraft.abort();
                         saveRentContractDraft();
                     }
                },
                success: function (response, status, xhr) {
                    $('#loader').hide();
                    if(response.code === 'C0') {
                        if(xhr.getResponseHeader("Login") !== null){
                            $.cookie('login', xhr.getResponseHeader("Login"));
                        }
                        if(xhr.getResponseHeader("Authorization") !== null){
                            $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                        }

                        if(response.data.id != ""){
                            window.location.href = '/lotus-admin/request-summary?id='+response.data.bizId+'&s=succeed';
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