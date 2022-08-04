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
    updateDictDropDownByDictTypeCode('FORM_TYPE','formType',$.api.formType[6],$.api.formType[7]); // 表单类型
    updateDictDropDownByDictTypeCode('CONTRACT_MODIFY_TYPE','contractModifyType','未选择',''); // 变更模版
    updateDictDropDownByDictTypeCode('PAYMENT_MODE','paymentMode',$.api.paymentMode[0],$.api.paymentMode[1]); // 支付方式
    updateSelectTenantDropDown(50);
    updateBrandNameDropDown(10);
    findCommissionByDictTypeCode('PRODUCT_CATEGORY'); // 商品分类
    findCommissionByDictTypeCode('DEDUCT_TYPE'); // 全额/差额
    
    findFeeItemByContractType($('#contractType').val()); 
    $('input.money').on('focus',function(){
        $(this).val(accounting.unformat($(this).val()));
        $(this).css({
            'backgroundColor': '#fff',
            'boxShadow': 'inset 6px 6px 2px -6px #000'
        });
        $(this).select();
    });
    
    $('input.money').on('blur',function(){
        $(this).val(accounting.formatNumber($(this).val()));
        $(this).css({
            'backgroundColor': 'transparent',
            'boxShadow': 'none'
        });
    });
    
    // change事件
    $("input[id*='fixedRentEndDate_']").on('changeDate',function(){
        calBackPushNextCalendar('fixedRent');
        calBackPushFixedRentSingleRow($(this).attr('id').split('_')[1]);
    })
    
    $("input[id*='commissionEndDate_']").on('changeDate',function(){
        calBackPushNextCalendar('commission');
        calBackPushCommissionSingleRow($(this).attr('id').split('_')[1]);
    })
    
    $("input[id*='propertyMgmtEndDate_']").on('changeDate',function(){
        calBackPushNextCalendar('propertyMgmt');
        calBackPushPropertyMgmtSingleRow($(this).attr('id').split('_')[1]);
    })
    
    $("input[id*='promotionEndDate_']").on('changeDate',function(){
        calBackPushNextCalendar('promotion');
        calBackPushPromotionSingleRow($(this).attr('id').split('_')[1]);
    })
    
    $("#contractType").change(function(){
        findFeeItemByContractType($('#contractType').val());
    })
    
    $("#contractModifyType").change(function(){
        modifyTypeCheck();
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
        } else if($(this).val() == 'deduct'){
            $('#investmentContractAccounttermFixed').fadeOut();
            $('#investmentContractAccounttermCommission').fadeIn();
            $('#fixedRent').find('tr').remove();
            $('#investmentContractAccounttermCompare').fadeOut();
        } else {
            $('#investmentContractAccounttermFixed').fadeIn();
            $('#investmentContractAccounttermCommission').fadeIn();
            $('#investmentContractAccounttermCompare').fadeIn();
        }
    })
    
    var iNum1, selected;
    var compareFirstFrequency = ['月','季','年'];
    var compareSecondFrequency = [['季','年'],['年'],['年']];
    $(function () {
        for(var i=0;i<compareFirstFrequency.length;i++){
            compareFirstFrequency[i] == '月'? selected = ' selected' : selected = ''
            $('#compareFirstFrequency').append('<option value="'+compareFirstFrequency[i]+'"'+selected+'>'+compareFirstFrequency[i]+'</option>');
        }
        
        $('#compareFirstFrequency').change(function () {
            $('#compareSecondFrequency').children().not(':eq(0)').remove();
            iNum1 = $(this).children('option:selected').index();
            if(iNum1 != 0) {
                if(iNum1 != 3) {
                    $("#compareSecond").prop('disabled',false);
                    var CompareSecondFrequency = compareSecondFrequency[iNum1-1];
                    for(var j=0;j<CompareSecondFrequency.length;j++){
                        $('#compareSecondFrequency').append('<option value="'+CompareSecondFrequency[j]+'">'+CompareSecondFrequency[j]+'</option>');
                    }
                } else {
                    $("#compareSecond").prop("checked",false);
                    $("#compareSecond").prop('disabled',true);
                    $(".shell").show();
                }
            }
        })
    })          
    
    $("#compareSecond").change(function() {
        if($(this).prop('checked') == true) {
            $(".shell").hide();
        } else {
            $(".shell").show();
        }
    })
    
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
        $("input[id*='StartDate_'], input[id*='EndDate_'], #deliveryDate, #enterDate, #freeStartDate_1, #freeEndDate_1").datepicker('setEndDate',$(this).val());
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
            if($('#hq_leasing_head').find('option:selected').val() != null) {
                $('.step li:nth-child(6)').addClass('active');
            }
        } else {
            $('.step li:nth-child(5)').removeClass('active');
            $('.step li:nth-child(6)').removeClass('active');
        }
    })

    $('#hq_leasing_head').on('change',function(){
        if($(this).find('option:selected').val() != null) {
            if($('.step li:nth-child(5)').hasClass('active') == true){
                $('.step li:nth-child(6)').addClass('active');
            }
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

function updateSelectStoreDropDown(data_count,mall_code) {
    $('#selectStore').select2({
        placeholder: '未选择',
        dropdownAutoWidth: true,
        language: {
            searching: function() {
                return '加载中...';
            },
            loadingMore: function() {
                return '加载中...';
            }
        },
        ajax: {
            url: $.api.baseLotus+"/api/vshop/lotus/findAllByUserCodeAndMallCodesAndMallCode",
            type: 'GET',
            dataType: 'json',
            delay: 250,
            beforeSend: function(request) {
                request.setRequestHeader("Login", $.cookie('login'));
                request.setRequestHeader("Authorization", $.cookie('authorization'));
                request.setRequestHeader("Lang", $.cookie('lang'));
                request.setRequestHeader("Source", "onlineleasing");
            },
            data: function (params) { 
                var mallCodes = mall_code;
                var mallCode = mallCodes;
                $.each(JSON.parse($.cookie('userModules')), function(i,v) {
                    if(v.roleCode == 'CROLE211008000002' && v.moduleCode == 'ALL'){
                        mallCodes = 'ALL';
                        return false;
                    }
                })
                
                return {
                    page: params.page || 0,
                    size: data_count,
                    search: params.term,
                    userCode: $.cookie('uid'),
                    mallCodes: mallCodes,
                    mallCode: mallCode
                }
            },
            processResults: function (data,params) {
                if(data['code'] === 'C0') {
                    var jsonData = data['data'].content;
                    params.page = params.page || 0;
                    var data;
                    return {
                        results: $.map(jsonData, function(item) {
                            data = {
                                id: item.unitCode+':::'+item.code+':::'+item.unitName+':::'+item.floorName+':::'+item.floorCode,
                                text: item.unitName +'['+ item.unitCode +'] | '+ item.unitArea + '㎡'                            
                            }
                            var returnData = [];
                            returnData.push(data);
                            return returnData;
                        }),
                        pagination: {
                            "more": data_count <= jsonData.length
                        }
                    }
                } else {
                    alertMsg(data['code'],data['customerMessage']);
                }
            },
            cache: true
        }
    });
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
                if(response.data != '' && response.data != null && response.data.formType == 'modify'){
                    $.request.content = response.data;
                    if($.request.content != '' && $.request.content != null){
                        var data = $.request.content;
                        
                        if(data.formStatus != '1' && data.formStatus != '3'){
                            $('#saveDraft').hide();
                            $('#submitForm').hide();
                        }
                        
                        if(data.formStatus == '4' || data.formStatus == '5' || data.formStatus == '6'){
                            $('#create-form .sub-header').css('background','#fff url(/views/assets/base/img/content/lotus-admin/approval_completed.png) 0 100%/112px auto no-repeat');
                        } else if(data.formStatus == '9'){
                            $('#create-form .sub-header').css('background','#fff url(/views/assets/base/img/content/lotus-admin/seal_completed.png) 0 100%/112px auto no-repeat');
                        }

                        $('#creatorName').val((data.creatorName != null ? data.creatorName : 'admin'));
                        $('#requestName').text(data.bizId);
                        $('#bizId').val(data.bizId);
                        findMainSigningBody(data.mallCode);
                        updateDictByDictTypeCode('FORM_STATUS','formStatus',(data.formStatus != null ? data.formStatus : 1));
                        updateDictByDictTypeCodeAndVal('CONTRACT_MODIFY_TYPE', 'contractModifyType', data.modifyType);
                        
                        if(data.tenantCode != null && data.tenantName != null){
                            temp = new Option((data.tenantNo +' | '+ data.tenantName), data.tenantCode, true, true);
                            $('#selectTenant').append(temp).trigger('change');
                        }
                        $('#contractNo').val(data.contractNo);
                        $('#investmentContractModelMallSelect').val(data.mallName+'['+data.mallCode+']');
                        $.request.mallCode = data.mallCode;

                        updateSelectStoreDropDown(10,data.mallCode);
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
                        
                        $("#selectTenant").change(function(){
                            if(data.formStatus == 1 || data.formStatus == 3){
                                findFilesByBizId($(this).val());
                            }
                        })

                        temp = new Option(data.floorName, data.floorCode, true, true);
                        $('#floor').append(temp).trigger('change');
                        $('#contractName').val(data.contractName);
                        if(data.modifyType == 'TIME_CHANGE'){
                            $('#startDate').datepicker('update', data.startDate);
                        } else {
                            $('#startDate').datepicker('update', data.oldContractInfo.startDate);
                        }
                        $('#compareStartDate_1, #compareStartDate_2').datepicker('update', data.startDate);
                        $('#endDate, #compareEndDate_1, #compareEndDate_2').datepicker('update', data.endDate);
                        $('#endDate').datepicker('setStartDate',data.startDate);

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

                        $('#awardDate').datepicker({
                            'startDate': '',
                            'endDate': ''
                        });
                        
                        $("#startDate").on('changeDate',function(){
                            $("input[id*='StartDate_'], input[id*='EndDate_'], #deliveryDate, #enterDate, #freeStartDate_1, #freeEndDate_1").datepicker('setStartDate',$(this).val());
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
                            
                            if(data.formStatus == 1 || data.formStatus == 3){
                                findFilesByBizId($(this).val());
                            }
                        })

                        $('#deliveryDate').datepicker('update', data.deliveryDate);
                        $('#area').val(data.area);
                        $('#bizTypeName').val(data.bizTypeName);
                        $('#bizDate').datepicker('update', data.bizDate);
                        $('#awardDate').datepicker('update', data.oldContractInfo.awardDate);
                        $('#bizScope').val(data.bizScope);
                        $('#enterDate').datepicker('update', data.enterDate);
                        $('#freeStartDate_1').datepicker('update', data.freeStartDate);
                        $('#freeEndDate_1').datepicker('update', data.freeEndDate);
                        $('#openStartTime').val(data.openStartTime);
                        $('#openEndTime').val(data.openEndTime);
                        $('#freeDays').val(data.freeDays);
                        $('#remark').val(data.remark);
                        $('#rewardDate').datepicker('update', data.awardDate);
                        $('#modifyEffectTime').datepicker('update', data.modifyEffectTime);
                        $('#targetSales').val(data.targetSales);
        
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

                        $('input.money').each(function(){
                            $(this).val(accounting.formatNumber($(this).val()));
                        })
                        
                        if(data.oldContractInfo.fixedRentList.length > 0) {
                            if(data.modifyType != 'TIME_CHANGE'){
                                $.each(data.oldContractInfo.fixedRentList, function(i,v) {
                                    if(dateCompare(v.endDate, data.modifyEffectTime) != 'smaller'){
                                        v.endDate = DecrDate(data.modifyEffectTime);
                                    }
                                    updateRowInvestmentContractAccounttermFixed(JSON.stringify(v),' past');
                                    $('#fixedRent tr:eq("'+i+'")').find('select, input').attr('disabled','disabled');
                                    $('#fixedRent tr:eq("'+i+'")').find('a').css('opacity','0.5').attr('onclick','');
                                    return false;
                                })
                            }
                            
                            if(data.fixedRentList.length > 0) {
                                $.each(data.fixedRentList, function(i,v) {
                                    updateRowInvestmentContractAccounttermFixed(JSON.stringify(v),'');
                                })
                            }

                            $('#fixedRentPeriodType_1').val(data.oldContractInfo.fixedRentList[0].periodTypeCode).trigger('change');

                            $('#fixedRentSettleDay_1').val(data.oldContractInfo.fixedRentList[0].settleDay).trigger('change');

                            $('#fixedRentSettlePeriod_1').val(data.oldContractInfo.fixedRentList[0].settlePeriodCode).trigger('change');

                            if(data.oldContractInfo.fixedRentList[0].isOverdueFlag == 1) {
                                $('#fixedRentIsOverdueFlag_1').prop('checked', true);
                            } else {
                                $('#fixedRentIsOverdueFlag_1').prop('checked', false);
                            }

                            $('#fixedRentOverdueTaxRate_1').val(data.oldContractInfo.fixedRentList[0].overdueTaxRate).trigger('change');


                            $('#fixedRentOverdueRate_1').val(parseFloat(data.oldContractInfo.fixedRentList[0].overdueRate * 1000));

                            if(data.oldContractInfo.fixedRentList[0].overdueInvoiceFlag == 1) {
                                $('#fixedRentOverdueInvoiceFlag_1').prop('checked', true);
                            } else {
                                $('#fixedRentOverdueInvoiceFlag_1').prop('checked', false);
                            }
                        }

                        if(data.oldContractInfo.deductList.length > 0) {
                            if(data.modifyType != 'TIME_CHANGE'){
                                $.each(data.oldContractInfo.deductList, function(i,v) {
                                    if(dateCompare(v.endDate, data.modifyEffectTime) != 'smaller'){
                                        v.endDate = DecrDate(data.modifyEffectTime);
                                    }
                                    updateRowInvestmentContractAccounttermCommission(JSON.stringify(v),' past');
                                    $('#commission tr:eq("'+i+'")').find('select, input').attr('disabled','disabled');
                                    $('#commission tr:eq("'+i+'")').find('a').css('opacity','0.5').attr('onclick','');
                                    return false;
                                })
                            }
                            
                            if(data.deductList.length > 0) {
                                $.each(data.deductList, function(i,v) {
                                    updateRowInvestmentContractAccounttermCommission(JSON.stringify(v),'');
                                })
                            }

                            $('#commissionPeriodType_1').val(data.oldContractInfo.deductList[0].periodTypeCode).trigger('change');

                            $('#commissionSettleDay_1').val(data.oldContractInfo.deductList[0].settleDay).trigger('change');

                            $('#commissionSettlePeriod_1').val(data.oldContractInfo.deductList[0].settlePeriodCode).trigger('change');

                            if(data.oldContractInfo.deductList[0].isOverdueFlag == 1) {
                                $('#commissionIsOverdueFlag_1').prop('checked', true);
                            } else {
                                $('#commissionIsOverdueFlag_1').prop('checked', false);
                            }

                            $('#commissionOverdueTaxRate_1').val(data.oldContractInfo.deductList[0].overdueTaxRate).trigger('change');


                            $('#commissionOverdueRate_1').val(parseFloat(data.oldContractInfo.deductList[0].overdueRate * 1000));

                            if(data.oldContractInfo.deductList[0].overdueInvoiceFlag == 1) {
                                $('#commissionOverdueInvoiceFlag_1').prop('checked', true);
                            } else {
                                $('#commissionOverdueInvoiceFlag_1').prop('checked', false);
                            }
                        }

                        if(data.oldContractInfo.propertyFeeList.length > 0) {
                            if(data.modifyType != 'TIME_CHANGE'){
                                $.each(data.oldContractInfo.propertyFeeList, function(i,v) {
                                    if(dateCompare(v.endDate, data.modifyEffectTime) != 'smaller'){
                                        v.endDate = DecrDate(data.modifyEffectTime); 
                                    }
                                    updateRowInvestmentContractAccounttermPropertyMgmt(JSON.stringify(v),' past');
                                    $('#propertyMgmt tr:eq("'+i+'")').find('select, input').attr('disabled','disabled');
                                    $('#propertyMgmt tr:eq("'+i+'")').find('a').css('opacity','0.5').attr('onclick','');
                                    return false;
                                })
                            }
                            
                            if(data.propertyFeeList.length > 0) {
                                $.each(data.propertyFeeList, function(i,v) {
                                    updateRowInvestmentContractAccounttermPropertyMgmt(JSON.stringify(v),'');
                                })
                            }

                            $('#propertyMgmtPeriodType_1').val(data.oldContractInfo.propertyFeeList[0].periodTypeCode).trigger('change');

                            $('#propertyMgmtSettleDay_1').val(data.oldContractInfo.propertyFeeList[0].settleDay).trigger('change');

                            $('#propertyMgmtSettlePeriod_1').val(data.oldContractInfo.propertyFeeList[0].settlePeriodCode).trigger('change');

                            if(data.oldContractInfo.propertyFeeList[0].isOverdueFlag == 1) {
                                $('#propertyMgmtIsOverdueFlag_1').prop('checked', true);
                            } else {
                                $('#propertyMgmtIsOverdueFlag_1').prop('checked', false);
                            }

                            $('#propertyMgmtOverdueTaxRate_1').val(data.oldContractInfo.propertyFeeList[0].overdueTaxRate).trigger('change');


                            $('#propertyMgmtOverdueRate_1').val(parseFloat(data.oldContractInfo.propertyFeeList[0].overdueRate * 1000));

                            if(data.oldContractInfo.propertyFeeList[0].overdueInvoiceFlag == 1) {
                                $('#propertyMgmtOverdueInvoiceFlag_1').prop('checked', true);
                            } else {
                                $('#propertyMgmtOverdueInvoiceFlag_1').prop('checked', false);
                            }
                        }

                        if(data.oldContractInfo.promotionFeeList.length > 0) {
                            if(data.modifyType != 'TIME_CHANGE'){
                                $.each(data.oldContractInfo.promotionFeeList, function(i,v) {
                                    if(dateCompare(v.endDate, data.modifyEffectTime) == 'smaller'){
                                        v.endDate = DecrDate(data.modifyEffectTime); 
                                    }
                                    updateRowInvestmentContractAccounttermPromotion(JSON.stringify(v),' past');
                                    $('#promotion tr:eq("'+i+'")').find('select, input').attr('disabled','disabled');
                                    $('#promotion tr:eq("'+i+'")').find('a').css('opacity','0.5').attr('onclick','');
                                    return false;
                                })
                            }
                            
                            if(data.promotionFeeList.length > 0) {
                                $.each(data.promotionFeeList, function(i,v) {
                                    updateRowInvestmentContractAccounttermPromotion(JSON.stringify(v),'');
                                })
                            }

                            $('#promotionPeriodType_1').val(data.oldContractInfo.promotionFeeList[0].periodTypeCode).trigger('change');

                            $('#promotionSettleDay_1').val(data.oldContractInfo.promotionFeeList[0].settleDay).trigger('change');

                            $('#promotionSettlePeriod_1').val(data.oldContractInfo.promotionFeeList[0].settlePeriodCode).trigger('change');

                            if(data.oldContractInfo.promotionFeeList[0].isOverdueFlag == 1) {
                                $('#promotionIsOverdueFlag_1').prop('checked', true);
                            } else {
                                $('#promotionIsOverdueFlag_1').prop('checked', false);
                            }

                            $('#promotionOverdueTaxRate_1').val(data.oldContractInfo.promotionFeeList[0].overdueTaxRate).trigger('change');


                            $('#promotionOverdueRate_1').val(parseFloat(data.oldContractInfo.promotionFeeList[0].overdueRate * 1000));

                            if(data.oldContractInfo.promotionFeeList[0].overdueInvoiceFlag == 1) {
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
                        
                        if(data.oldContractInfo.salesList != null && data.oldContractInfo.salesList.length > 0) {                        
                            if(data.modifyType != 'TIME_CHANGE'){
                                $.each(data.oldContractInfo.salesList, function(i,v) {
                                    updateRowMinSales(JSON.stringify(v),' past');
                                    return false;
                                })
                            }
                        }
                        
                        if(data.salesList != null && data.salesList.length > 0) {                        
                            $.each(data.salesList, function(i,v) {
                                updateRowMinSales(JSON.stringify(v),'');
                            })
                        }
                        
                        appendLotusLeasingHead();
                        
                        $('#Lotus_leasing_head select').val('').select2({
                            placeholder: "未选择",
                            allowClear: true
                        });
                        
                        if(data.processApproveList.length > 0) {
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
                                    case "总部招商负责人":
                                        $('#hq_leasing_head select').append(temp).trigger('change');
                                        break;
                                    default:
                                        break;
                                }
                            })
                        }

                        if(data.processBizApprove == 1) {
                            $('.step-progress li:eq(4)').addClass('active');
                        }

                        if(data.processHqRentApprove == 1) {
                            $('.step-progress li:eq(5)').addClass('active');
                        }
                        
                        if($("#selectTenant").val() != null && ($.request.content.formStatus == 1 || $.request.content.formStatus == 3)){
                            findFilesByBizId($("#selectTenant").val());
                        }

                        if($("#brandName").val() != null && ($.request.content.formStatus == 1 || $.request.content.formStatus == 3)){
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
                        
                        modifyTypeCheck();
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

function updateBrandNameDropDown(data_count) {
    $('#brandName').select2({
        minimumResultsForSearch: -1,
        placeholder: '未选择',
        dropdownAutoWidth: true,
        language: {
            searching: function() {
                return '加载中...';
            },
            loadingMore: function() {
                return '加载中...';
            }
        },
        ajax: {
            url: $.api.baseLotus+"/api/brand/lotus/findAll?sort=id,desc",
            type: 'GET',
            dataType: 'json',
            delay: 250,
            beforeSend: function(request) {
                request.setRequestHeader("Login", $.cookie('login'));
                request.setRequestHeader("Authorization", $.cookie('authorization'));
                request.setRequestHeader("Lang", $.cookie('lang'));
                request.setRequestHeader("Source", "onlineleasing");
            },
            data: function (params) {
                return {
                    page: params.page || 0,
                    size: data_count,
                    search: params.term
                }
            },
            processResults: function (data,params) {
                if(data['code'] === 'C0') {
                    var jsonData = data['data'].content;
                    params.page = params.page || 0;
                    var data;
                    return {
                        results: $.map(jsonData, function(item) {
                            data = {
                                id: item.code,
                                text: item.name +'['+ item.modality3 +']'                        
                            }
                            var returnData = [];
                            returnData.push(data);
                            return returnData;
                        }),
                        pagination: {
                            "more": data_count <= jsonData.length
                        }
                    }
                } else {
                    alertMsg(data['code'],data['customerMessage']);
                }
            },
            cache: true
        }
    });
}

function findRoleYZJByParentId() {
    $.ajax({
        url: $.api.baseLotus+"/api/role/yzj/findAllByParentId/?parentId=69bcb693-92c4-11ec-8a77-ecf4bbea1498",
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
                
                if(response.data.length > 0){
                    sessionStorage.setItem("roleYZJ", JSON.stringify(response.data));
                    updateRoleYZJLabel();
                }
            } else {
                alertMsg(response.code,response.customerMessage);
            }
        }
    })
}

function updateRoleYZJLabel() {
    $.each($.parseJSON(sessionStorage.getItem('roleYZJ')), function(i,v){
        $('#'+v.roleId).find('label').prepend(v.roleName);
        if(v.roleId != 'Lotus_leasing_head'){
            updateUserRoleYZJDropDownByRoleId(v.roleId);
        }
    })
}
        
function updateUserRoleYZJDropDownByRoleId(id) {
    $('#'+id).find('select').select2({
        placeholder: '未选择',
        dropdownAutoWidth: true,
        allowClear: true,
        language: {
            searching: function() {
                return '加载中...';
            },
            loadingMore: function() {
                return '加载中...';
            }
        },
        ajax: {
            url: $.api.baseLotus+"/api/user/role/yzj/findAllByRoleId",
            type: 'GET',
            dataType: 'json',
            delay: 250,
            beforeSend: function(request) {
                request.setRequestHeader("Login", $.cookie('login'));
                request.setRequestHeader("Authorization", $.cookie('authorization'));
                request.setRequestHeader("Lang", $.cookie('lang'));
                request.setRequestHeader("Source", "onlineleasing");
            },
            data: function (params) {         
                return {
                    search: params.term,
                    roleId: id
                }
            },
            processResults: function (data,params) {
                if(data['code'] === 'C0') {
                    var jsonData = data['data'];
                    var data;
                    return {
                        results: $.map(jsonData, function(item) {
                            data = {
                                id: item.openId,
                                text: item.name
                            }
                            var returnData = [];
                            returnData.push(data);
                            return returnData;
                        })
                    }
                } else {
                    alertMsg(data['code'],data['customerMessage']);
                }
            },
            cache: true
        }
    })
}

function updateRowInvestmentContractAccounttermFixed(v,p) {
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
    var past = "";
    if(dateCompare(value.startDate, date) == 'smaller'){
        past = ' past';
    }
    newrow.setAttribute("class",p);
    input.setAttribute("class","form-control"+(p=''? past : ''));
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
    past = "";
    if(dateCompare(value.endDate, date) == 'smaller'){
        past = ' past';
    }
    input2.setAttribute("class","form-control"+(p=''? past : ''));
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
    input.setAttribute("class","form-control money"+p);
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
    input.setAttribute("class","form-control money"+p);
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
    input.setAttribute("class","form-control money"+p);
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
    input.setAttribute("class","form-control money"+p);
    input.setAttribute("id","fixedRentRentAmount_"+count.toLocaleString());
    input.setAttribute("type","text");
    input.setAttribute("value",value.rentAmount);
    div.appendChild(input);
    var percent = document.createElement("span");
    percent.innerText = "元/m²/天";
    percent.setAttribute("class", "input-group-addon");
    div.appendChild(percent);
    column7.appendChild(div);
    
    var select = document.createElement("select"); //税率
    select.setAttribute("class","select2 taxVat newVAT fixedVATDropDown newFee"+p);
    select.setAttribute("id","fixedRentTaxRate_"+count.toLocaleString());
    column8.appendChild(select);
    
    var checkbox = document.createElement("input"); //是否开发票
    checkbox.setAttribute("id","fixedRentInvoiceFlag_"+count.toLocaleString());
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
    updateFeeItems('fixedFeeItemDropDown','fixedVATDropDown','fixedRent');
    var tmp = $('#fixedRentEndDate_'+(parseInt(count)-1).toLocaleString()).val();
    var sd;
    count == 1 ?  sd = $('#startDate').val() : sd = IncrDate(tmp);
    $('#investmentContractAccounttermFixed .input-daterange').datepicker({
        'language': 'zh-CN',
        'format': 'yyyy-mm-dd',
        'todayHighlight': true,
        'startDate': sd,
        'endDate': $('#endDate').val(),
        'autoclose': true
    });
    
    $('#investmentContractAccounttermFixed .select2').select2();
    $("#fixedRentItem_"+count.toLocaleString()).val(value.itemCode).trigger("change");
    $("#fixedRentTaxRate_"+count.toLocaleString()).val(value.taxRate).trigger("change");
 
    $('input.money').on('focus',function(){
        $(this).val(accounting.unformat($(this).val()));
        $(this).css({
            'backgroundColor': '#fff',
            'boxShadow': 'inset 6px 6px 2px -6px #000'
        });
        $(this).select();
        $(this).parent().parent().addClass('success');
    });
    
    $('input.money').on('blur',function(){
        $(this).val(accounting.formatNumber($(this).val()));
        $(this).css({
            'backgroundColor': 'transparent',
            'boxShadow': 'none'
        });
        $(this).parent().parent().removeClass('success');
    });
    
    calBackPush('fixedRent');
    
    $("#fixedRentEndDate_"+count.toLocaleString()).on('changeDate',function(){
        calBackPushNextCalendar('fixedRent');
        calBackPushFixedRentSingleRow($(this).attr('id').split('_')[1]);
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

function updateRowInvestmentContractAccounttermCommission(v,p) {
    var value = JSON.parse(v);
    var newrow = document.createElement("tr");
    var column1 = createRowColumn(newrow);
    var column2 = createRowColumn(newrow);
    var column3 = createRowColumn(newrow);
    var column4 = createRowColumn(newrow);
    var column5 = createRowColumn(newrow);
    var column6 = createRowColumn(newrow);
    var column7 = createRowColumn(newrow);
    var column9 = createRowColumn(newrow);
    var column10 = createRowColumn(newrow);
    var column11 = createRowColumn(newrow);
    var column12 = createRowColumn(newrow);
    
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
    var past = "";
    if(dateCompare(value.startDate, date) == 'smaller'){
        past = ' past';
    }
    newrow.setAttribute("class",p);
    input.setAttribute("class","form-control"+(p=''? past : ''));
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
    past = "";
    if(dateCompare(value.endDate, date) == 'smaller'){
        past = ' past';
    }
    input2.setAttribute("class","form-control"+(p=''? past : ''));
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
    select.setAttribute("disabled","disabled");
    column4.appendChild(select);
    
    var select = document.createElement("select"); //商品分类
    select.setAttribute("class","select2 commissionCategoryDropDown new");
    select.setAttribute("id","commissionCategory_"+count.toLocaleString());
    column5.appendChild(select);
    
    var div = document.createElement("div"); //去税扣率
    div.setAttribute("class","input-group");
    var input = document.createElement("input");
    input.setAttribute("class","form-control money"+p);
    input.setAttribute("id","commissionTaxDeduct_"+count.toLocaleString());
    input.setAttribute("type","text");
    input.setAttribute("value",(parseFloat(value.deduct) * 100));
    div.appendChild(input);
    var percent = document.createElement("span");
    percent.innerText = "%";
    percent.setAttribute("class", "input-group-addon");
    div.appendChild(percent);
    column6.appendChild(div);
    
    var div = document.createElement("div"); //含税扣率
    div.setAttribute("class","input-group");
    var input = document.createElement("input");
    input.setAttribute("class","form-control money"+p);
    input.setAttribute("id","commissionDeduct_"+count.toLocaleString());
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
    
    var div = document.createElement("div"); //保底营业额
    div.setAttribute("class","input-group");
    var input = document.createElement("input");
    input.setAttribute("class","form-control money"+p);
    input.setAttribute("id","commissionMinSales_"+count.toLocaleString());
    input.setAttribute("type","text");
    input.setAttribute("value",value.targetSales);
    div.appendChild(input);
    var percent = document.createElement("span");
    percent.innerText = "元/月";
    percent.setAttribute("class", "input-group-addon");
    div.appendChild(percent);
    column9.appendChild(div);
    
    var select = document.createElement("select"); //税率
    select.setAttribute("class","select2 taxVat newVAT commissionVATDropDown newFee"+p);
    select.setAttribute("id","commissionTaxRate_"+count.toLocaleString());
    column10.appendChild(select);
    
    var checkbox = document.createElement("input"); //是否开发票
    checkbox.setAttribute("id","commissionInvoiceFlag_"+count.toLocaleString());
    checkbox.setAttribute("type", "checkbox");
    if(value.invoiceFlag == 1){
        checkbox.setAttribute("checked", "");
    }
    column11.appendChild(checkbox);
    
    var remove = document.createElement("a");
    remove.setAttribute("href", "javascript:void(0);");
    remove.setAttribute("onClick", "deleteRow(this)");
    var icon = document.createElement("i");
    icon.setAttribute("class", "fa fa-minus-circle");
    icon.setAttribute("style", "color: #ED4A52; font-size: 16px;");
    remove.appendChild(icon);
    column12.appendChild(remove);

    tbody.appendChild(newrow);
    updateTaxVAT();
    updateCommissionDropDown('commissionCategoryDropDown','PRODUCT_CATEGORY'); // 商品分类
    updateCommissionDropDown('commissionDeductTypeDropDown','DEDUCT_TYPE'); // 全额/差额
    updateFeeItems('commissionFeeItemDropDown','commissionVATDropDown','deductRent');
    var tmp = $('#commissionEndDate_'+(parseInt(count)-1).toLocaleString()).val();
    var sd;
    count == 1 ?  sd = $('#startDate').val() : sd = IncrDate(tmp);
    $('#investmentContractAccounttermCommission .input-daterange').datepicker({
        'language': 'zh-CN',
        'format': 'yyyy-mm-dd',
        'todayHighlight': true,
        'startDate': sd,
        'endDate': $('#endDate').val(),
        'autoclose': true
    });
    
    $("#commissionItem_"+count.toLocaleString()).val(value.itemCode).trigger("change");
    $('#investmentContractAccounttermCommission .select2').select2();
    $("#commissionTaxRate_"+count.toLocaleString()).val(value.taxRate).trigger("change");
 
    $('input.money').on('focus',function(){
        $(this).val(accounting.unformat($(this).val()));
        $(this).css({
            'backgroundColor': '#fff',
            'boxShadow': 'inset 6px 6px 2px -6px #000'
        });
        $(this).select();
        $(this).parent().parent().addClass('success');
    });
    
    $('input.money').on('blur',function(){
        $(this).val(accounting.formatNumber($(this).val()));
        $(this).css({
            'backgroundColor': 'transparent',
            'boxShadow': 'none'
        });
        $(this).parent().parent().removeClass('success');
    });
    
    $("#commissionEndDate_"+count.toLocaleString()).on('changeDate',function(){
        calBackPushNextCalendar('commission');
        calBackPushCommissionSingleRow($(this).attr('id').split('_')[1]);
    });
    
    $("#commissionTaxDeduct_"+count.toLocaleString()).on('change',function(){
        calBackPushCommissionDeduct();
    })
    
    $("#commissionTaxRate_"+count.toLocaleString()).on('change',function(){
        calBackPushCommissionSingleRow($(this).attr('id').split('_')[1]);
    })
}

function updateRowInvestmentContractAccounttermPropertyMgmt(v,p) {
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
    var past = "";
    if(dateCompare(value.startDate, date) == 'smaller'){
        past = ' past';
    }
    newrow.setAttribute("class",p);
    input.setAttribute("class","form-control"+(p=''? past : ''));
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
    past = "";
    if(dateCompare(value.endDate, date) == 'smaller'){
        past = ' past';
    }
    input2.setAttribute("class","form-control"+(p=''? past : ''));
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
    input.setAttribute("class","form-control money"+p);
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
    input.setAttribute("class","form-control money"+p);
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
    input.setAttribute("class","form-control money"+p);
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
    input.setAttribute("class","form-control money"+p);
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
    select.setAttribute("class","select2 taxVat newVAT propertyMgmtVATDropDown newFee"+p);
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
    var tmp = $('#propertyMgmtEndDate_'+(parseInt(count)-1).toLocaleString()).val();
    var sd;
    count == 1 ?  sd = $('#startDate').val() : sd = IncrDate(tmp);
    $('#investmentContractAccounttermPropertyMgmt .input-daterange').datepicker({
        'language': 'zh-CN',
        'format': 'yyyy-mm-dd',
        'todayHighlight': true,
        'startDate': sd,
        'endDate': $('#endDate').val(),
        'autoclose': true
    });
    
    $("#propertyMgmtItem_"+count.toLocaleString()).val(value.itemCode).trigger("change");
    $('#investmentContractAccounttermPropertyMgmt .select2').select2();
    $("#propertyMgmtTaxRate_"+count.toLocaleString()).val(value.taxRate).trigger("change");
 
    $('input.money').on('focus',function(){
        $(this).val(accounting.unformat($(this).val()));
        $(this).css({
            'backgroundColor': '#fff',
            'boxShadow': 'inset 6px 6px 2px -6px #000'
        });
        $(this).select();
        $(this).parent().parent().addClass('success');
    });
    
    $('input.money').on('blur',function(){
        $(this).val(accounting.formatNumber($(this).val()));
        $(this).css({
            'backgroundColor': 'transparent',
            'boxShadow': 'none'
        });
        $(this).parent().parent().removeClass('success');
    });
    
    calBackPush('propertyMgmt');
    
    $("#propertyMgmtEndDate_"+count.toLocaleString()).on('changeDate',function(){
        calBackPushNextCalendar('propertyMgmt');
        calBackPushPropertyMgmtSingleRow($(this).attr('id').split('_')[1]);
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

function updateRowInvestmentContractAccounttermPromotion(v,p) {
    var value = JSON.parse(v);
    var newrow = document.createElement("tr");
    var column1 = createRowColumn(newrow);
    var column2 = createRowColumn(newrow);
    var column3 = createRowColumn(newrow);
    var column4 = createRowColumn(newrow);
    var column5 = createRowColumn(newrow);
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
    select.setAttribute("disabled","disabled");
    column2.appendChild(select);
    
    var div = document.createElement("div"); //期限
    div.setAttribute("class","input-daterange input-group");
    var input = document.createElement("input");
    var past = "";
    if(dateCompare(value.startDate, date) == 'smaller'){
        past = ' past';
    }
    newrow.setAttribute("class",p);
    input.setAttribute("class","form-control"+(p=''? past : ''));
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
    past = "";
    if(dateCompare(value.endDate, date) == 'smaller'){
        past = ' past';
    }
    input2.setAttribute("class","form-control"+(p=''? past : ''));
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
    input.setAttribute("class","form-control money"+p);
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
    input.setAttribute("class","form-control money"+p);
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
    
    var select = document.createElement("select"); //税率
    select.setAttribute("class","select2 taxVat newVAT promotionVATDropDown newFee"+p);
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
    var tmp = $('#promotionEndDate_'+(parseInt(count)-1).toLocaleString()).val();
    var sd;
    count == 1 ?  sd = $('#startDate').val() : sd = IncrDate(tmp);
    $('#investmentContractAccounttermPromotion .input-daterange').datepicker({
        'language': 'zh-CN',
        'format': 'yyyy-mm-dd',
        'todayHighlight': true,
        'startDate': sd,
        'endDate': $('#endDate').val(),
        'autoclose': true
    });
    
    $("#promotionItem_"+count.toLocaleString()).val(value.itemCode).trigger("change");
    $('#investmentContractAccounttermPromotion .select2').select2();
    $("#promotionTaxRate_"+count.toLocaleString()).val(value.taxRate).trigger("change");
 
    $('input.money').on('focus',function(){
        $(this).val(accounting.unformat($(this).val()));
        $(this).css({
            'backgroundColor': '#fff',
            'boxShadow': 'inset 6px 6px 2px -6px #000'
        });
        $(this).select();
        $(this).parent().parent().addClass('success');
    });
    
    $('input.money').on('blur',function(){
        $(this).val(accounting.formatNumber($(this).val()));
        $(this).css({
            'backgroundColor': 'transparent',
            'boxShadow': 'none'
        });
        $(this).parent().parent().removeClass('success');
    });
    
    $("#promotionEndDate_"+count.toLocaleString()).on('changeDate',function(){
        calBackPushNextCalendar('promotion');
        calBackPushPromotionSingleRow($(this).attr('id').split('_')[1]);
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
        $(this).css({
            'backgroundColor': '#fff',
            'boxShadow': 'inset 6px 6px 2px -6px #000'
        });
        $(this).select();
        $(this).parent().parent().addClass('success');
    });
    
    $('input.money').on('blur',function(){
        $(this).val(accounting.formatNumber($(this).val()));
        $(this).css({
            'backgroundColor': 'transparent',
            'boxShadow': 'none'
        });
        $(this).parent().parent().removeClass('success');
    });
}

function updateRowMinSales(v,p) {
    var value = JSON.parse(v);
    var newrow = document.createElement("tr");
    var column1 = createRowColumn(newrow);
    var column2 = createRowColumn(newrow);
    var column3 = createRowColumn(newrow);
    var column4 = createRowColumn(newrow);
    
    var table = document.getElementById('investmentContractProperteisterm');
    var tbody = table.querySelector('tbody') || table;
    var count = tbody.getElementsByTagName('tr').length + 1;
    column1.innerText = count.toLocaleString();
    
    var div = document.createElement("div"); //期限
    div.setAttribute("class","input-daterange input-group");
    var input = document.createElement("input");
    var past = "";
    if(dateCompare(value.startDate, date) == 'smaller'){
        past = ' past';
    }
    newrow.setAttribute("class",p);
    input.setAttribute("class","form-control"+(p=''? past : ''));
    input.setAttribute("id","minSalesStartDate_"+count.toLocaleString());
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
    past = "";
    if(dateCompare(value.endDate, date) == 'smaller'){
        past = ' past';
    }
    input2.setAttribute("class","form-control"+(p=''? past : ''));
    input2.setAttribute("id","minSalesEndDate_"+count.toLocaleString());
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
    column2.appendChild(div);
    
    var div = document.createElement("div"); //金额
    div.setAttribute("class","input-group");
    var input = document.createElement("input");
    input.setAttribute("class","form-control money"+p);
    input.setAttribute("id","minSalesAmount_"+count.toLocaleString());
    input.setAttribute("type","text");
    input.setAttribute("value",value.amount);
    div.appendChild(input);
    var percent = document.createElement("span");
    percent.innerText = "元";
    percent.setAttribute("class", "input-group-addon");
    div.appendChild(percent);
    column3.appendChild(div);
    
    var remove = document.createElement("a");
    remove.setAttribute("href", "javascript:void(0);");
    remove.setAttribute("onClick", "deleteRow(this)");
    var icon = document.createElement("i");
    icon.setAttribute("class", "fa fa-minus-circle");
    icon.setAttribute("style", "color: #ED4A52; font-size: 16px;");
    remove.appendChild(icon);
    column4.appendChild(remove);

    tbody.appendChild(newrow);
    var tmp = $('#minSalesEndDate_'+(parseInt(count)-1).toLocaleString()).val();
    var sd;
    count == 1 ?  sd = $('#startDate').val() : sd = IncrDate(tmp);
    $('#investmentContractProperteisterm .input-daterange').datepicker({
        'language': 'zh-CN',
        'format': 'yyyy-mm-dd',
        'todayHighlight': true,
        'startDate': sd,
        'endDate': $('#endDate').val(),
        'autoclose': true
    });

    $('input.money').on('focus',function(){
        $(this).val(accounting.unformat($(this).val()));
        $(this).css({
            'backgroundColor': '#fff',
            'boxShadow': 'inset 6px 6px 2px -6px #000'
        });
        $(this).select();
        $(this).parent().parent().addClass('success');
    });
    
    $('input.money').on('blur',function(){
        $(this).val(accounting.formatNumber($(this).val()));
        $(this).css({
            'backgroundColor': 'transparent',
            'boxShadow': 'none'
        });
        $(this).parent().parent().removeClass('success');
    });
    
    $("#minSalesEndDate_"+count.toLocaleString()).on('changeDate',function(){
        calBackPushNextCalendar('minSales');
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
    
    if($('#rewardDate').val() == '') {
        flag = 0;
        $('#rewardDate').parent().append(error);
    }
    
    if($('#modifyEffectTime').val() == '') {
        flag = 0;
        $('#modifyEffectTime').parent().append(error);
    }
    
    if($('#brandName').val() == null) {
        flag = 0;
        $('#brandName').parent().append(error);
    }
    
    if($('#bizTypeName').val() == '') {
        flag = 0;
        $('#bizTypeName').parent().append(error);
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
    
    if($('#contractModifyType').val() == "") {
        flag = 0;
        $('#contractModifyType').parent().append(error);
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
    
    if($('#targetSales').val() == '' || parseFloat(numberWithoutCommas($('#targetSales').val())) < 0) {
        flag = 0;
        $('#targetSales').parent().append(error);
    }
    
    if($("input[id*='minSalesAmount_']").val() == '' || parseFloat(numberWithoutCommas($("input[id*='minSalesAmount_']").val())) <= 0) {
        flag = 0;
        $('#minSales').parent().append(error);
    }
    
    if($('#paymentMode').val() == '') {
        flag = 0;
        $('#paymentMode').parent().append(error);
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
            
            if($('#commissionMinSales_1').val() == ''){
                flag = 0;
                $('#commissionMinSales_1').parent().append(error);
            }
        } else {
            flag = 0;
            $('#investmentContractAccounttermCommission').append(error);
        }
    }
    
    if($('#minSales tr').length > 0) {
        if($('#minSalesStartDate_1').val() == ''){
            flag = 0;
            $('#minSalesStartDate_1').parent().prepend(error);
        }

        if($('#minSalesEndDate_1').val() == ''){
            flag = 0;
            $('#minSalesEndDate_1').parent().prepend(error);
        }

        if($('#minSalesAmount_1').val() == ''){
            flag = 0;
            $('#minSalesAmount_1').parent().append(error);
        }
    } else {
        flag = 0;
        $('#minSales').append(error);
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
    
    var area = $.request.content.area;
    var yearLength = calDatesDiff($('#startDate').val(),$('#endDate').val()) / 365;
    if(area >= 500){
        if($('#8d2794df-c15f-4d68-9f8e-8b847f6191db select').val() == null) {
            flag = 0;
            $('#8d2794df-c15f-4d68-9f8e-8b847f6191db select').parent().append(error);
        }
        
        if($('#hq_leasing_head select').val() == null) {
            flag = 0;
            $('#hq_leasing_head select').parent().append(error);
        }
    } else if(area > 40 && area < 500) {
        if((area >= 100 && yearLength > 3) || (area < 100 && yearLength > 2)){
            if($('#8d2794df-c15f-4d68-9f8e-8b847f6191db select').val() == null) {
                flag = 0;
                $('#8d2794df-c15f-4d68-9f8e-8b847f6191db select').parent().append(error);
            }
        }
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
        
        var modifyType = $('#contractModifyType').val();
        var startDate = $('#modifyEffectTime').val();
        var endDate = $('#endDate').val();
        var selectRentCalculationMode = $.request.content.rentCalculationMode;
        var brandCode = $.request.content.brandCode;
        var brandName = $.request.content.brandName;
        var contractName = $.request.content.contractName;
        var deliveryDate = $.request.content.deliveryDate;
        var enterDate = $.request.content.enterDate;
        var firstCompareCycle = $.request.content.compareFirstFrequency;
        var freeDays = $.request.content.freeDays;
        var freeEndDate = $.request.content.freeEndDate;
        var freeStartDate = $.request.content.freeStartDate;
        var openEndTime = $.request.content.openEndTime;
        var openStartTime = $.request.content.openStartTime;
        var secondCompareCycle = $.request.content.compareSecondFrequency;
        var secondCompareFlag = $.request.content.secondCompareFlag;
        var secondCompareValueType = $.request.content.compareSecondValue;
        var targetSales = numberWithoutCommas($('#targetSales').val());
        var tenantCode = $.request.content.tenantCode;
        var tenantName = $.request.content.tenantName;
        var tenantNo = $.request.content.tenantNo;
        
        switch (modifyType) {
            case "TENANT_CHANGE":
                tenantCode = $('#selectTenant').val();
                tenantName = $('#select2-selectTenant-container').text().split(' | ')[1];
                tenantNo = $('#select2-selectTenant-container').text().split(' | ')[0];
                break;
            case "BRAND_CHANGE":
                brandCode = $('#brandName').val();
                brandName = $('#select2-brandName-container').text().split('[')[0];
                contractName = $('#contractName').val();
                break;
            case "TIME_CHANGE":
                deliveryDate = $('#deliveryDate').val();
                enterDate = $('#enterDate').val();
                freeDays = $('#freeDays').val();
                freeEndDate = $('#freeEndDate_1').val();
                freeStartDate = $('#freeStartDate_1').val();
                openEndTime = $('#openEndTime').val();
                openStartTime = $('#openStartTime').val();
                secondCompareCycle = $('#compareSecondFrequency').val() != "" ? $('#compareSecondFrequency').val() : "";
                secondCompareFlag = 0;
                if($('#compareSecond').prop('checked') == true){
                    secondCompareFlag = 1;
                }
                secondCompareValueType = $('#compareSecondValue').val();
                break;
            case "CLAUSE_CHANGE":
                selectRentCalculationMode = $('#selectRentCalculationMode').val();
                firstCompareCycle = $('#compareFirstFrequency').val() != "" ? $('#compareFirstFrequency').val() : "";
                targetSales = numberWithoutCommas($('#targetSales').val());
                break;
            default:
                break;
        }
        
        var bizId = $.request.content.bizId;
        var creatorName = $('#creatorName').val();
        var shopCode = $.request.content.shopCode;
        var area = $.request.content.area;
        var awardDate = $('#rewardDate').val();
        var remark = $('#remark').val();
        var taxTotalPropertyAmount = numberWithoutCommas($('#propertyMgmtTaxTotalPropertyAmount').text());
        var taxTotalRentAmount = numberWithoutCommas($('#fixedRentTaxTotalRentAmount').text());
        var totalPropertyAmount = numberWithoutCommas($('#propertyMgmtTotalPropertyAmount').text());
        var totalRentAmount = numberWithoutCommas($('#fixedRentTotalRentAmount').text());
        var modifyEffectTime = $('#modifyEffectTime').val();
        
        var processBizApprove = 0;
        if($('.step-progress li:eq(4)').hasClass('active') == true){
            processBizApprove = 1;
        }
        
        var processHqRentApprove = 0;
        if($('.step-progress li:eq(5)').hasClass('active') == true){
            processHqRentApprove = 1;
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
                    case "总部招商负责人":
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
        var deductList = [];
        if($('#selectRentCalculationMode').find('option:selected').val() != 'fixRent') {
            var terms, len, lenOld, lenTotle;
            if(modifyType == 'TIME_CHANGE'){
                terms = $("#commission").find("tr");
                len = $("#commission").find("tr").length;
                lenOld = 0;
                lenTotle = len * 1 + lenOld * 1;
            } else {
                terms = $("#commission").find("tr").not('.past');
                len = $("#commission").find("tr").not('.past').length;
                lenOld = $("#commission").find("tr.past").length;
                lenTotle = len * 1 + lenOld * 1;
            }
            terms.each(function(i,e){
                var commission = {};
                index = i * 1 + lenOld * 1 + 1;
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

                commission.amount =  0;
                commission.targetSales =  numberWithoutCommas($('#commissionMinSales_'+index).val());

                commission.taxRate = $('#commissionTaxRate_'+index).val();
                commission.taxCode = $('#commissionTaxRate_'+index).find('option:selected').attr('data-code');

                if($('#commissionInvoiceFlag_'+index).prop('checked') == true){
                    commission.invoiceFlag = 1;
                } else {
                    commission.invoiceFlag = 0;
                }
                
                commission.contractNo = $.request.content.contractNo;
                commission.contractVersion = $.request.content.contractVersion;

                deductList.push(commission);  

            })
        }
        
        if(s == 'submit'){
            if(deductList.length > 0) {
                var check1 = dateCompare($('#commissionStartDate_1').val(),$('#startDate').val()); //条款开始日与合同开始日比较
                var check2 = dateCompare($('#commissionEndDate_'+lenTotle).val(),$('#endDate').val()); //条款结束日与合同结束日比较
                var check3 = 'smaller';
                for(var ln = 0; ln < lenTotle; ln++){ //条款每一期开始日与结束日比较
                    var check33 = dateCompare($('#commissionStartDate_'+(ln+1)).val(),$('#commissionEndDate_'+(ln+1)).val());
                    if(check33 != 'smaller'){
                        check3 = check33;
                    }
                }
                var check4 = 'equal';
                for(var ln = 1; ln < lenTotle; ln++){ //条款每一期开始日与上一期结束日比较，条款连续性
                    var check44 = dateCompare(IncrDate($('#commissionEndDate_'+ln).val()), $('#commissionStartDate_'+(ln+1)).val());
                    if(check44 != 'equal'){
                        check4 = check44;
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
                
                deposit.contractNo = $.request.content.contractNo;
                deposit.contractVersion = $.request.content.contractVersion;
                
                depositList.push(deposit);
            }
            
        })
        
        var fixedRentList = [];
        if($('#selectRentCalculationMode').find('option:selected').val() != 'deduct') {
            var terms, len, lenOld, lenTotle;
            if(modifyType == 'TIME_CHANGE'){
                terms = $("#fixedRent").find("tr");
                len = $("#fixedRent").find("tr").length;
                lenOld = 0;
                lenTotle = len * 1 + lenOld * 1;
            } else {
                terms = $("#fixedRent").find("tr").not('.past');
                len = $("#fixedRent").find("tr").not('.past').length;
                lenOld = $("#fixedRent").find("tr.past").length;
                lenTotle = len * 1 + lenOld * 1;
            }
            terms.each(function(i,e){
                var fixedRent = {};
                index = i * 1 + lenOld * 1 + 1;
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

                if($('#fixedRentInvoiceFlag_'+index).prop('checked') == true){
                    fixedRent.invoiceFlag = 1;
                } else {
                    fixedRent.invoiceFlag = 0;
                }
                
                fixedRent.contractNo = $.request.content.contractNo;
                fixedRent.contractVersion = $.request.content.contractVersion;

                fixedRentList.push(fixedRent);
            })
        }
        
        if(s == 'submit'){
            if(fixedRentList.length > 0) {
                var check1 = dateCompare($('#fixedRentStartDate_1').val(),$('#startDate').val()); //条款开始日与合同开始日比较
                var check2 = dateCompare($('#fixedRentEndDate_'+lenTotle).val(),$('#endDate').val()); //条款结束日与合同结束日比较
                var check3 = 'smaller';
                for(var ln = 0; ln < lenTotle; ln++){ //条款每一期开始日与结束日比较
                    var check33 = dateCompare($('#fixedRentStartDate_'+(ln+1)).val(),$('#fixedRentEndDate_'+(ln+1)).val());
                    if(check33 != 'smaller'){
                        check3 = check33;
                    }
                }
                var check4 = 'equal';
                for(var ln = 1; ln < lenTotle; ln++){ //条款每一期开始日与上一期结束日比较，条款连续性
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
        
        var promotionFeeList = [];
        var terms, len, lenOld, lenTotle;
        if(modifyType == 'TIME_CHANGE'){
            terms = $("#promotion").find("tr");
            len = $("#promotion").find("tr").length;
            lenOld = 0;
            lenTotle = len * 1 + lenOld * 1;
        } else {
            terms = $("#promotion").find("tr").not('.past');
            len = $("#promotion").find("tr").not('.past').length;
            lenOld = $("#promotion").find("tr.past").length;
            lenTotle = len * 1 + lenOld * 1;
        }
        terms.each(function(i,e){
            var promotion = {};
            index = i * 1 + lenOld * 1 + 1;
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

            promotion.taxRate = $('#promotionTaxRate_'+index).val();
            promotion.taxCode = $('#promotionTaxRate_'+index).find('option:selected').attr('data-code');

            if($('#promotionInvoiceFlag_'+index).prop('checked') == true){
                promotion.invoiceFlag = 1;
            } else {
                promotion.invoiceFlag = 0;
            }
            
            promotion.contractNo = $.request.content.contractNo;
            promotion.contractVersion = $.request.content.contractVersion;
            
            promotionFeeList.push(promotion);
        })
        
        if(s == 'submit'){
            if(promotionFeeList.length > 0) {
                var check1 = dateCompare($('#promotionStartDate_1').val(),$('#startDate').val()); //条款开始日与合同开始日比较
                var check2 = dateCompare($('#promotionEndDate_'+lenTotle).val(),$('#endDate').val()); //条款结束日与合同结束日比较
                var check3 = 'smaller';
                for(var ln = 0; ln < lenTotle; ln++){ //条款每一期开始日与结束日比较
                    var check33 = dateCompare($('#promotionStartDate_'+(ln+1)).val(),$('#promotionEndDate_'+(ln+1)).val());
                    if(check33 != 'smaller'){
                        check3 = check33;
                    }
                }
                var check4 = 'equal';
                for(var ln = 1; ln < lenTotle; ln++){ //条款每一期开始日与上一期结束日比较，条款连续性
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
        var terms, len, lenOld, lenTotle;
        if(modifyType == 'TIME_CHANGE'){
            terms = $("#propertyMgmt").find("tr");
            len = $("#propertyMgmt").find("tr").length;
            lenOld = 0;
            lenTotle = len * 1 + lenOld * 1;
        } else {
            terms = $("#propertyMgmt").find("tr").not('.past');
            len = $("#propertyMgmt").find("tr").not('.past').length;
            lenOld = $("#propertyMgmt").find("tr.past").length;
            lenTotle = len * 1 + lenOld * 1;
        }
        terms.each(function(i,e){
            var propertyMgmt = {};
            index = i * 1 + lenOld * 1 + 1;
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
            
            propertyMgmt.contractNo = $.request.content.contractNo;
            propertyMgmt.contractVersion = $.request.content.contractVersion;
            
            propertyFeeList.push(propertyMgmt);
        })
        
        if(s == 'submit'){
            if(propertyFeeList.length > 0) {
                var check1 = dateCompare($('#propertyMgmtStartDate_1').val(),$('#startDate').val()); //条款开始日与合同开始日比较
                var check2 = dateCompare($('#propertyMgmtEndDate_'+lenTotle).val(),$('#endDate').val()); //条款结束日与合同结束日比较
                var check3 = 'smaller';
                for(var ln = 0; ln < lenTotle; ln++){ //条款每一期开始日与结束日比较
                    var check33 = dateCompare($('#propertyMgmtStartDate_'+(ln+1)).val(),$('#propertyMgmtEndDate_'+(ln+1)).val());
                    if(check33 != 'smaller'){
                        check3 = check33;
                    }
                }
                var check4 = 'equal';
                for(var ln = 1; ln < lenTotle; ln++){ //条款每一期开始日与上一期结束日比较，条款连续性
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
        
        var salesList = [];
        var terms, len, lenOld, lenTotle;
        if(modifyType == 'TIME_CHANGE'){
            terms = $("#minSales").find("tr");
            len = $("#minSales").find("tr").length;
            lenOld = 0;
            lenTotle = len * 1 + lenOld * 1;
        } else {
            terms = $("#minSales").find("tr").not('.past');
            len = $("#minSales").find("tr").not('.past').length;
            lenOld = $("#minSales").find("tr.past").length;
            lenTotle = len * 1 + lenOld * 1;
        }
        terms.each(function(i,e){
            var minSales = {};
            index = i * 1 + lenOld * 1 + 1;
            minSales.startDate = $('#minSalesStartDate_'+index).val();
            minSales.endDate = $('#minSalesEndDate_'+index).val();
            minSales.amount =  numberWithoutCommas($('#minSalesAmount_'+index).val());
            
            minSales.contractNo = $.request.content.contractNo;
            minSales.contractVersion = $.request.content.contractVersion;
            
            salesList.push(minSales);
        })
        
        if(s == 'submit'){
            if(salesList.length > 0) {
                var check1 = dateCompare($('#minSalesStartDate_1').val(),$('#startDate').val()); //条款开始日与合同开始日比较
                var check2 = dateCompare($('#minSalesEndDate_'+lenTotle).val(),$('#endDate').val()); //条款结束日与合同结束日比较
                var check3 = 'smaller';
                for(var ln = 0; ln < lenTotle; ln++){ //条款每一期开始日与结束日比较
                    var check33 = dateCompare($('#minSalesStartDate_'+(ln+1)).val(),$('#minSalesEndDate_'+(ln+1)).val());
                    if(check33 != 'smaller'){
                        check3 = check33;
                    }
                }
                var check4 = 'equal';
                for(var ln = 1; ln < lenTotle; ln++){ //条款每一期开始日与上一期结束日比较，条款连续性
                    var check44 = dateCompare(IncrDate($('#minSalesEndDate_'+ln).val()), $('#minSalesStartDate_'+(ln+1)).val());
                    if(check44 != 'equal'){
                        check4 = check44;
                    }
                }

                if(check1 == 'smaller' || check2 != 'equal' || check3 != 'smaller' || check4 != 'equal') {
                    alertMsg('9999','预估销售额条款开始日与结束日错误，请修改重新提交！');
                    return false;
                } 
            }
        }
        
        var map = {
            "id": $.request.content.id, //必填
            "code": $.request.content.code, //必填
            "bizId": bizId, //必填
            "formType": $.request.content.formType, //必填
            "area": area, //必填
            "shopCode": shopCode, //必填
            "rentCalculationMode": selectRentCalculationMode, //必填
            "endDate": endDate, //必填
            "contractType": $.request.content.contractType, //必填
            "unitCode": $.request.content.unitCode, //必填
            "mallCode": $.request.mallCode, //必填
            "startDate": startDate, //必填
            "unitName": $.request.content.unitName, //必填
            "activityTimes": 0,
            "approvalName": $.request.content.creatorName,
            "approvalOpenId": $.request.content.creatorOpenId,
            "awardDate": awardDate,
            "bindCondition": "",
            "bizDate": $.request.content.bizDate,
            "bizFreeEndDate": "",
            "bizFreeStartDate": "",
            "bizScope": $.request.content.bizScope,
            "bizTypeCode": "",
            "bizTypeName": $.request.content.bizTypeName,
            "brandCode": brandCode,
            "brandName": brandName,
            "cardDiscount": 0,
            "contractName": contractName,
            "contractNo": $.request.content.contractNo,
            "contractTemplate": null,
            "contractVersion": $.request.content.contractVersion,
            "creatorCode": $.request.content.creatorCode,
            "creatorName": $.request.content.creatorName,
            "creatorOpenId": $.request.content.creatorOpenId,
            "creatorOrgId": "",
            "creatorOrgName": "",
            "dayRent": 0,
            "deductList": deductList,
            "deliveryCondition": "",
            "deliveryDate": deliveryDate,
            "depositList": depositList,
            "duration": 0,
            "enterDate": enterDate,
            "esignFlag": 0,
            "exclusiveCondition": "",
            "firstCompareCycle": firstCompareCycle,
            "firstYearRentFee": "",
            "firstYearRentFeeUnit": "",
            "fixedRentList": fixedRentList,
            "floorCode": $.request.content.floorCode,
            "floorName": $.request.content.floorName,
            "formStatus": formStatus,
            "freeDayBizRental": 0,
            "freeDays": freeDays,
            "freeEndDate": freeEndDate,
            "freeOverdueDays": 0,
            "freeStartDate": freeStartDate,
            "graphFee": 0,
            "growthRate": 0,
            "intentDate": "",
            "intentionMoney": 0,
            "isSupplement": "",
            "lastBrandCode": "",
            "lastBrandName": "",
            "mallName": $.request.content.mallName,
            "minSales": 0,
            "modifyEffectTime": modifyEffectTime,
            "modifyType": modifyType,
            "oldEndDate": $.request.content.oldContractInfo.endDate,
            "oldStartDate": $.request.content.oldContractInfo.startDate,
            "openEndTime": openEndTime,
            "openStartTime": openStartTime,
            "overdueBizAmount": 0,
            "overdueFee": 0,
            "paymentMode": $.request.content.paymentMode,
            "posMode": $.request.content.posMode,
            "processApproveList": processApproveList,
            "processBizApprove": processBizApprove,
            "processHqRentApprove": processHqRentApprove,
            "processInstId": "",
            "profitCenter": $.request.content.profitCenter,
            "promotionFee": 0,
            "promotionFeeList": promotionFeeList,
            "promotionFeeUnit": "",
            "propertyFeeList": propertyFeeList,
            "propertyManageFee": 0,
            "publicUtilitiesFee": 0,
            "remark": remark,
            "rentDeductRate": 0,
            "rentSalesRate": 0,
            "salesList": salesList,
            "secondCompareCycle": secondCompareCycle,
            "secondCompareFlag": secondCompareFlag,
            "secondCompareValueType": secondCompareValueType,
            "targetSales": targetSales,
            "taxReimbursement": "",
            "taxTotalPropertyAmount": taxTotalPropertyAmount,
            "taxTotalRentAmount": taxTotalRentAmount,
            "telLineNum": 0,
            "tenantCode": tenantCode,
            "tenantLicenseCode": "",
            "tenantName": tenantName,
            "tenantNo": tenantNo,
            "tenantOrgCode": "",
            "tenantTaxCode": "",
            "termCalcMode": $.request.content.termCalcMode,
            "totalPropertyAmount": totalPropertyAmount,
            "totalRentAmount": totalRentAmount,
            "unitBuildingArea": 0,
            "updateCode": userCode,
            "updateName": creatorName,
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
                                                html2canvas(document.querySelector(".content"), {
                                                    useCORS: true,
                                                    scale: 2,
                                                    height: $('.content').height() - 5
                                                }).then(canvas => {
                                                    var image = canvas.toDataURL("image/png");
                                                    var formData = new FormData();
                                                    var fileName = $.request.content.mallName+'_'+$.request.content.brandName+'_'+$.request.content.unitCode+'_更改租赁合同申请单_'+bizId;
                                                    formData.append('file', dataURLtoFile(image,fileName+'.png','image/png'));
                                                    
                                                    var upload = $.ajax({
                                                        type: "POST",
                                                        url: $.base+"/zuul/onlineleasing-lotus/api/co/file/uploadYzj?bizId="+bizId+"&creatorOpenId="+openId+"&activityName=&bizType=CONTRACT_screenshot",
                                                        data: formData,
                                                        async: false,
                                                        cache: false,
                                                        timeout: 15000,
                                                        processData: false,
                                                        contentType: false,
                                                        beforeSend: function(request) {
                                                            $('#submitState').fadeOut().text('检查完毕，上传单据快照中...').fadeIn();
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
                                                                        $('#submitState').fadeOut().text('上传完毕，提交单据中...').fadeIn();
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
                                                                                window.location.href = '/lotus-admin/modify-summary?id='+response.data.bizId+'&s=succeed';
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
                            window.location.href = '/lotus-admin/modify-summary?id='+response.data.bizId+'&s=succeed';
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