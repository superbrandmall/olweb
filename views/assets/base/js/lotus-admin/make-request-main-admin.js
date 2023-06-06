$.request = {
    id: ''
}

$(document).ready(function(){
    var auth = 0;
    $.each(JSON.parse($.cookie('userModules')), function(i,v) {
        if((v.roleCode == 'CROLE211008000002' || v.roleCode == 'CROLE220922000001') && v.moduleCode == 'ALL'){
            auth = 1;
            return false;
        } else if(v.roleCode == 'CROLE211008000001' && v.moduleName == '门店对接人') {
            if($.inArray(v.moduleCode, $.api.mallCodeSH) == -1){
                auth = 1;
                return false;
            }
        }
    })
    
    if(auth == 0){
        alertMsg('9999','没有访问授权，请联系系统管理员。');
        return false;
    }
    
    $('#create-form')[0].reset();
    getBizId();
    
    findTaxInfoByTaxCategories('VAT');
    $('.date-picker, .input-daterange').datepicker({
        'language': 'zh-CN',
        'format': 'yyyy-mm-dd',
        'todayBtn': "linked",
        'todayHighlight': true,
        'startDate': ($('#startDate').val() != '' ? $('#startDate').val() : ''),
        'endDate': $('#endDate').val(),
        'autoclose': true,
        'clearBtn': true
    });
    
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
    
    findUserRoleYZJByKVCondition($.cookie('mallSelected').split(':::')[1]);
    
    // 初始化
    $('#investmentContractModelMallSelect').val($.cookie('mallSelected').split(':::')[0]+'['+$.cookie('mallSelected').split(':::')[1]+']');
    
    /*** START DR相关资料提交 **/
    $('#investmentContractMallSummaryMallSelect').val($.cookie('mallSelected').split(':::')[0]+'['+$.cookie('mallSelected').split(':::')[1]+']');
    $('#investmentContractProperteistermMallName_0').val($.cookie('mallSelected').split(':::')[0]);
    /*** END DR相关资料提交 **/
    updateDictDropDownByDictTypeCode('RENT_CALCULATION_MODE','selectRentCalculationMode',$.api.rentCalculationMode[0],$.api.rentCalculationMode[1]); // 计租方式
    updateDictDropDownByDictTypeCode('PROFIT_CENTER','profitCenter',$.api.profitCenter[0],$.api.profitCenter[1]); // 利润中心
    updateDictDropDownByDictTypeCode('TERM_CALC_MODE','termCalcMode',$.api.termCalcMode[0],$.api.termCalcMode[1]); // 条款计算方式
    updateDictDropDownByDictTypeCode('POS_MODE','posMode',$.api.posMode[0],$.api.posMode[1]); // 收银方式
    updateDictDropDownByDictTypeCode('CONTRACT_TYPE','contractType',$.api.contractType[0],$.api.contractType[1]); // 合同类型
    updateDictDropDownByDictTypeCode('FORM_TYPE','formType',$.api.formType[0],$.api.formType[1]); // 表单类型
    updateDictDropDownByDictTypeCode('PAYMENT_MODE','paymentMode',$.api.paymentMode[0],$.api.paymentMode[1]); // 支付方式
    updateDictDropDownByDictTypeCode('CONTRACT_TEMPLATE','contractTemplate',$.api.contractTemplate[0],$.api.contractTemplate[1]); // 合同模版
    updateSelectTenantDropDown(50);
    updateSelectStoreDropDownByMallCode(10,$.cookie('mallSelected').split(':::')[1]);
    updateOldSelectStoreDropDownByMallCode(10,$.cookie('mallSelected').split(':::')[1]);
    updateBrandNameDropDown(10);
    findCommissionByDictTypeCode('PRODUCT_CATEGORY'); // 商品分类
    findCommissionByDictTypeCode('DEDUCT_TYPE'); // 全额/差额
    
    findFeeItemByContractType($('#contractType').val()); 
    findMainSigningBody($.cookie('mallSelected').split(':::')[1]);
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
    
    $("input[id*='propertyFeeYearEndDate_']").on('changeDate',function(){
        calBackPushNextCalendar('propertyFeeYear');
    })
    
    $("input[id*='promotionEndDate_']").on('changeDate',function(){
        calBackPushNextCalendar('promotion');
        calBackPush('promotion');
    })
    
    $("#contractType").change(function(){
        findFeeItemByContractType($('#contractType').val());
    })
    
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
        findFilesByBizId($(this).val());
    })
    
    $("#brandName").change(function(){
        var contractName = $('#select2-brandName-container').text().split('[')[0];
        $('#contractName').val(contractName);
        var bizTypeName = $('#select2-brandName-container').text().split('[')[1];
        bizTypeName = bizTypeName.split(']')[0];
        $('#bizTypeName').val(bizTypeName);
        findFilesByBizId($(this).val());
    })
    
    updateTaxVAT();
    updateCommissionDropDown('commissionCategoryDropDown','PRODUCT_CATEGORY'); // 商品分类
    updateCommissionDropDown('commissionDeductTypeDropDown','DEDUCT_TYPE'); // 全额/差额
    updateFeeItems('fixedFeeItemDropDown','fixedVATDropDown','fixedRent'); // 固定租金科目
    updateFeeItems('commissionFeeItemDropDown','commissionVATDropDown','deductRent'); // 提成租金科目
    updateFeeItems('propertyMgmtFeeItemDropDown','propertyMgmtVATDropDown','property'); // 物业管理费科目
    updateFeeItems('propertyFeeYearItemDropDown','propertyFeeYearVATDropDown','propertyYear'); // 年度商场服务费科目
    updateFeeItems('promotionFeeItemDropDown','promotionVATDropDown','promitionFee'); // 推广费科目
    findDictCodeByDictTypeCode('LOTUS_OUTER_CONTRACT_FLOW_STEP'); // 全国云之家流程
    findDictCodeByDictTypeCode('FORM_STATUS'); // 表单状态
    
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
        mandatoryCheck('save');
    })
    
    $("#submitForm").click(function(){
        mandatoryCheck('submit');
    })
    
    $("#startDate").on('changeDate',function(){
        updateStartDatepicker();
        $('#freeEndDate_1').datepicker('setStartDate',$(this).val());
        $('#freeEndDate_1').datepicker('update',$(this).val());
        $("#deliveryDate").datepicker('update', $(this).val());
        $("#enterDate").datepicker('update', $(this).val());
        updateContractTemplate();
    })
    
    $("#endDate").on('changeDate',function(){
        updateEndDatepicker('fixedRent');
        updateEndDatepicker('commission');
        updateEndDatepicker('propertyMgmt');
        updateEndDatepicker('propertyFeeYear');
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
    
    $('#bizApprove').on('change',function(){
        if($(this).find('option:selected').val() != null) {
            $('.step li:nth-child(6)').addClass('active');
        } else {
            $('.step li:nth-child(6)').removeClass('active');
        }
    })

    $('#hqFinanceApprove').on('change',function(){
        if($(this).find('option:selected').val() != null) {
            $('.step li:nth-child(7)').addClass('active');
        } else {
            $('.step li:nth-child(7)').removeClass('active');
        }
    })
    
    $('#hqLegalApprove').on('change',function(){
        if($(this).find('option:selected').val() != null) {
            $('.step li:nth-child(8)').addClass('active');
        } else {
            $('.step li:nth-child(8)').removeClass('active');
        }
    })

    $('#hqCeoApprove').on('change',function(){
        if($(this).find('option:selected').val() != null) {
            $('.step li:nth-child(9)').addClass('active');
        } else {
            $('.step li:nth-child(9)').removeClass('active');
        }
    })
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
                if($.inArray($.cookie('mallSelected').split(':::')[1], $.api.fivePercentFixedRent) != -1){
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

function getBizId() {
    $.ajax({
        url: $.api.baseLotus+"/api/rent/contract/form/getBizId/",
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
                
                $('#bizId').val(response.data);
            } else {
                alertMsg(response.code,response.customerMessage);
            }
        }
    })
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
    
    if($('#overdueBizAmount').val() == '' || parseFloat(numberWithoutCommas($('#overdueBizAmount').val())) < 0) {
        flag = 0;
        $('#overdueBizAmount').parent().append(error);
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
    
    if($('#gmApprove select').val() == null) {
        flag = 0;
        $('#gmApprove select').parent().append(error);
    }
    
    if($('#areaGmApprove select').val() == null) {
        flag = 0;
        $('#areaGmApprove select').parent().append(error);
    }
    
    var area = $('#area').val();
    var yearLength = calDatesDiff($('#startDate').val(),$('#endDate').val()) / 365;
    if(area >= 500 || yearLength >= 5){
        if($('#bizApprove select').val() == null) {
            flag = 0;
            $('#bizApprove select').parent().append(error);
        }
        
        if($('#hqFinanceApprove select').val() == null) {
            flag = 0;
            $('#hqFinanceApprove select').parent().append(error);
        }
        
        if($('#hqLegalApprove select').val() == null) {
            flag = 0;
            $('#hqLegalApprove select').parent().append(error);
        }
        
        if($('#hqCeoApprove select').val() == null) {
            flag = 0;
            $('#hqCeoApprove select').parent().append(error);
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
                        var ed = $('#fixedRentEndDate_'+index).val();
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
                        
                        if(ed != ''){
                            flag = 0;
                            $.each(JSON.parse(shopBudget), function(j,w) {
                                if(w.year == ed.split('-')[0] && w.termType == 'B011'){
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
                        var ed = $('#commissionEndDate_'+index).val();
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
                        
                        if(ed != ''){
                            flag = 0;
                            $.each(JSON.parse(shopBudget), function(j,w) {
                                if(w.year == ed.split('-')[0] && w.termType == 'D011'){
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
    
    if($("#propertyMgmt").find("tr").length > 0){
        var index = 0;
        $("#propertyMgmt").find("tr").each(function(i,e){
            index = i * 1 + 1;
            if(shopBudget != null && shopBudget != '' && shopBudget != 'null' ){
                if(JSON.parse(shopBudget).length > 0){
                    var sd = $('#propertyMgmtStartDate_'+index).val();
                    var ed = $('#propertyMgmtEndDate_'+index).val();
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
                    
                    if(ed != ''){
                        flag = 0;
                        $.each(JSON.parse(shopBudget), function(j,w) {
                            if(w.year == ed.split('-')[0] && w.termType == 'B021'){
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
    }
    
    if($("#promotion").find("tr").length > 0){
        var index = 0;
        $("#promotion").find("tr").each(function(i,e){
            index = i * 1 + 1;
            if(shopBudget != null && shopBudget != '' && shopBudget != 'null' ){
                if(JSON.parse(shopBudget).length > 0){
                    var sd = $('#promotionStartDate_'+index).val();
                    var ed = $('#promotionEndDate_'+index).val();
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
                    
                    if(ed != ''){
                        flag = 0;
                        $.each(JSON.parse(shopBudget), function(j,w) {
                            if(w.year == ed.split('-')[0] && w.termType == 'G011'){
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
    }
    
    if(flag == 1 && $('.mandatory-error').length == 0){
        saveContractForm('submit');
    } else {
        $('html, body').animate({
            scrollTop: $('.mandatory-error').offset().top - 195
        }, 0);
    }
}

function saveContractForm(s) {
    var msg;
    var formStatus = '保存';
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
        if($('.step-progress li:eq(6)').hasClass('active') == true){
            processBizApprove = 1;
        }
        
        var processHqRentApprove = 0;
        if($('.step-progress li:eq(9)').hasClass('active') == true){
            processHqRentApprove = 1;
        }
        
        var secondCompareFlag = 0;
        if($('#compareSecond').prop('checked') == true){
            secondCompareFlag = 1;
        }
        
        var processApproveList = [];
        var lotusRentFlowStep = JSON.parse(sessionStorage.getItem('LOTUS_OUTER_CONTRACT_FLOW_STEP'));
        if(lotusRentFlowStep.length > 0){
            $.each(lotusRentFlowStep, function(i,v) {
                $.each($('#'+v.dictCode+' select').val(), function(j,w) {
                    var processApprove = {};
                    processApprove.activityCode = v.dictCode;
                    processApprove.activityName = v.dictName;
                    processApprove.bizId = bizId;
                    processApprove.state = 1;
                    processApprove.approveName = $('#'+v.dictCode+' select').find("option[value='"+w+"']").text();
                    processApprove.approveOpenId = w;
                    if(processApprove.approveOpenId != null){
                        processApproveList.push(processApprove);
                    }
                })
            })
        }
        
        var fs = JSON.parse(sessionStorage.getItem('FORM_STATUS'));
        if(fs.length > 0){
            $.each(fs, function(i,v) {
                if(v.dictName == formStatus){
                    formStatus = v.dictCode;
                    return false;
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

            propertyMgmt.amount = numberWithoutCommas($('#propertyMgmtAmount_'+index).val());
            propertyMgmt.taxAmount = numberWithoutCommas($('#propertyMgmtTaxAmount_'+index).val());

            propertyMgmt.rentAmount = numberWithoutCommas($('#propertyMgmtRentAmount_'+index).val());
            propertyMgmt.taxRentAmount = numberWithoutCommas($('#propertyMgmtTaxRentAmount_'+index).val());

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
        
        var propertyFeeYearList = [];
        var len = $("#propertyFeeYear").find("tr").length;
        $("#propertyFeeYear").find("tr").each(function(i,e){
            var propertyFeeYear = {};
            index = i * 1 + 1;
            propertyFeeYear.itemCode = $('#propertyFeeYearItem_'+index).val();
            propertyFeeYear.itemName = $('#select2-propertyFeeYearItem_'+index+'-container').text().split('[')[0];

            propertyFeeYear.shopCode = shopCode;
            propertyFeeYear.area = area;

            propertyFeeYear.settlePeriodCode = 'T';
            propertyFeeYear.settlePeriodName = '次';

            propertyFeeYear.startDate = $('#propertyFeeYearStartDate_'+index).val();
            propertyFeeYear.endDate = $('#propertyFeeYearEndDate_'+index).val();

            propertyFeeYear.amount = (numberWithoutCommas($('#propertyFeeYearAmount_'+index).val()) || 0);
            propertyFeeYear.rentAmount = propertyFeeYear.amount;
            propertyFeeYear.taxAmount = (numberWithoutCommas($('#propertyFeeYearTaxAmount_'+index).val()) || 0);
            propertyFeeYear.taxRentAmount = propertyFeeYear.taxAmount;

            propertyFeeYear.taxRate = $('#propertyFeeYearTaxRate_'+index).val();
            propertyFeeYear.taxCode = $('#propertyFeeYearTaxRate_'+index).find('option:selected').attr('data-code');

            if($('#propertyFeeYearInvoiceFlag_'+index).prop('checked') == true){
                propertyFeeYear.invoiceFlag = 1;
            } else {
                propertyFeeYear.invoiceFlag = 0;
            }
            propertyFeeYearList.push(propertyFeeYear);
        })
        
        if(s == 'submit'){
            if(propertyFeeYearList.length > 0) {
                var check1 = dateCompare($('#propertyFeeYearStartDate_1').val(),$('#startDate').val()); //条款开始日与合同开始日比较
                var check2 = dateCompare($('#propertyFeeYearEndDate_'+len).val(),$('#endDate').val()); //条款结束日与合同结束日比较
                var check3 = 'smaller';
                for(var ln = 0; ln < len; ln++){ //条款每一期开始日与结束日比较
                    var check33 = dateCompare($('#propertyFeeYearStartDate_'+(ln+1)).val(),$('#propertyFeeYearEndDate_'+(ln+1)).val());
                    if(check33 != 'smaller'){
                        check3 = check33;
                    }
                }
                var check4 = 'equal';
                for(var ln = 1; ln < len; ln++){ //条款每一期开始日与上一期结束日比较，条款连续性
                    var check44 = dateCompare(IncrDate($('#propertyFeeYearEndDate_'+ln).val()), $('#propertyFeeYearStartDate_'+(ln+1)).val());
                    if(check44 != 'equal'){
                        check4 = check44;
                    }
                }

                if(check1 == 'smaller' || check2 != 'equal' || check3 != 'smaller' || check4 != 'equal') {
                    alertMsg('9999','年度商场服务费条款开始日与结束日错误，请修改重新提交！');
                    return false;
                } 
            }
        }
        
        var oldContractTerm = {};
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
        oldContractTerm.creatorOpenId = openId;
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
        mallSummary.createOpenId = openId;
        mallSummary.mallName = $.cookie('mallSelected').split(':::')[0];
        mallSummary.mallCode = $.cookie('mallSelected').split(':::')[1];
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
        
        
        var map = {
            "id": $.request.id, //必填
            "code": '', //必填
            "bizId": bizId, //必填
            "formType": $('#formType').find('option:selected').val(), //必填
            "area": area, //必填
            "shopCode": shopCode, //必填
            "rentCalculationMode": selectRentCalculationMode, //必填
            "endDate": endDate, //必填
            "contractType": contractType, //必填
            "unitCode": unitCode, //必填
            "mallCode": $.cookie('mallSelected').split(':::')[1], //必填
            "startDate": startDate, //必填
            "unitName": unitName, //必填
            "activityTimes": 0,
            "approvalName": $('#creatorName').val(),
            "approvalOpenId": openId,
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
            "contractName": ($('#contractName').val() || ' '),
            "contractNo": '',
            "contractTemplate": $('#contractTemplate').find('option:selected').val(),
            "contractVersion": 1,
            "creatorCode": userCode,
            "creatorName": $('#creatorName').val(),
            "creatorOpenId": openId,
            "creatorOrgId": "",
            "creatorOrgName": "",
            "dayRent": 0,
            "deductList": deductList,
            "deliveryCondition": "",
            "deliveryDate": $('#deliveryDate').val(),
            "depositList": depositList,
            "duration": 0,
            "enterDate": $('#enterDate').val(),
            "esignFlag": 0,
            "exclusiveCondition": "",
            "firstCompareCycle": ($('#compareFirstFrequency').val() != "" ? $('#compareFirstFrequency').val() : ""),
            "firstYearRentFee": "",
            "firstYearRentFeeUnit": "",
            "fixedRentList": fixedRentList,
            "floorCode": $('#floor').find('option:selected').val(),
            "floorName": $('#floor').find('option:selected').text(),
            "formStatus": formStatus,
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
            "mallName": $.cookie('mallSelected').split(':::')[0],
            "mallSummary": mallSummary,
            "minSales": 0,
            "oldContractTerm": oldContractTerm,
            "openEndTime": $('#openEndTime').val(),
            "openStartTime": $('#openStartTime').val(),
            "overdueBizAmount": numberWithoutCommas($('#overdueBizAmount').val()),
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
            "propertyFeeYearList": propertyFeeYearList,
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
                                                                $.request.id = response.data.id;
                                                                alertMsg(response.data.resultCode,response.data.resultMsg);
                                                            } else if(response.data.id != "" && response.data.formStatus == "2"){
                                                                window.location.href = '/lotus-admin/request-summary?id='+response.data.bizId+'&t=&s=succeed';
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
                            window.location.href = '/lotus-admin/request-summary?id='+response.data.bizId+'&t=&s=succeed';
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