$.request = {
    id: ''
}

$(document).ready(function(){
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
        'autoclose': true
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
    
    if(!sessionStorage.getItem('roleYZJ') || sessionStorage.getItem('roleYZJ') == null || sessionStorage.getItem('roleYZJ') == ''){
        findRoleYZJByParentId();
    } else {
        updateRoleYZJLabel();
    }
    
    // 初始化
    updateSelectMallDropDown(20) // 所属项目
    updateDictDropDownByDictTypeCode('RENT_CALCULATION_MODE','selectRentCalculationMode',$.api.rentCalculationMode[0],$.api.rentCalculationMode[1]); // 计租方式
    updateDictDropDownByDictTypeCode('PROFIT_CENTER','profitCenter',$.api.profitCenter[0],$.api.profitCenter[1]); // 利润中心
    updateDictDropDownByDictTypeCode('POS_MODE','posMode',$.api.posMode[0],$.api.posMode[1]); // 收银方式
    updateDictDropDownByDictTypeCode('CONTRACT_TYPE','contractType',$.api.contractType[0],$.api.contractType[1]); // 合同类型
    updateDictDropDownByDictTypeCode('FORM_TYPE','formType',$.api.formType[0],$.api.formType[1]); // 表单类型
    updateDictDropDownByDictTypeCode('PAYMENT_MODE','paymentMode',$.api.paymentMode[0],$.api.paymentMode[1]); // 支付方式
    updateSelectTenantDropDown(50, 'selectTenant', 'T0000000 | 上海易初莲花连锁超市有限公司','LTTENANT220606000001');
    updateUserRoleYZJDropDownByRoleId('kow_leasing'); // 商务拓展
    if($('#mallCode').val() != '' && $('#mallCode').val() != null){
        updateSelectStoreDropDown(10);
    }
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
        calBackPushFixedRentSingleRow($(this).attr('id').split('_')[1]);
    })
    
    $("#fixedRentSettlePeriod_1").change(function(){
        var index;
        $("#fixedRent").find("tr").each(function(i,e){
            index = i * 1 + 1;
            calBackPushFixedRentSingleRow(index);
        })
    })
    
    $("input[id*='commissionEndDate_']").on('changeDate',function(){
        calBackPushCommissionSingleRow($(this).attr('id').split('_')[1]);
    })
    
    $("input[id*='propertyMgmtEndDate_']").on('changeDate',function(){
        calBackPushPropertyMgmtSingleRow($(this).attr('id').split('_')[1]);
    })
    
    $("#propertyMgmtSettlePeriod_1").change(function(){
        var index;
        $("#propertyMgmt").find("tr").each(function(i,e){
            index = i * 1 + 1;
            calBackPushPropertyMgmtSingleRow(index);
        })
    })
    
    $("input[id*='promotionEndDate_']").on('changeDate',function(){
        calBackPushPromotionSingleRow($(this).attr('id').split('_')[1]);
    })
    
    $("#mallCode").change(function(){
        if($('#mallCode').val() != '' && $('#mallCode').val() != null){
            updateSelectStoreDropDown(10);
        }
    })
    
    $("#contractType").change(function(){
        findFeeItemByContractType($('#contractType').val());
    })
    
    $("#selectStore").change(function(){
        var selectStoreArea = $('#selectStore').find('option:selected').text().split(' | ')[1];
        selectStoreArea = selectStoreArea.split('㎡')[0];
        $('#area').val(selectStoreArea);
        var floor = new Option($('#selectStore').val().split(':::')[3], $('#selectStore').val().split(':::')[4], true, true);
        $('#floor').append(floor).trigger('change');
        calBackPushFixedRentRentAmount();
        calBackPushPropertyMgmtRentAmount();
    })
    
    updateTaxVAT();
    updateCommissionDropDown('commissionCategoryDropDown','PRODUCT_CATEGORY'); // 商品分类
    updateCommissionDropDown('commissionDeductTypeDropDown','DEDUCT_TYPE'); // 全额/差额
    updateFeeItems('fixedFeeItemDropDown','fixedVATDropDown','fixedRent'); // 固定租金科目
    updateFeeItems('commissionFeeItemDropDown','commissionVATDropDown','deductRent'); // 提成租金科目
    updateFeeItems('propertyMgmtFeeItemDropDown','propertyMgmtVATDropDown','property'); // 物业管理费科目
    updateFeeItems('promotionFeeItemDropDown','promotionVATDropDown','promitionFee'); // 推广费科目
    findDictCodeByDictTypeCode('LOTUS_RENT_FLOW_STEP'); // 云之家流程
    findDictCodeByDictTypeCode('FORM_STATUS'); // 表单状态
    
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
    
    $("#compareSecond").change(function(){
        if($(this).prop('checked') == true){
            $(".shell").hide();
        } else {
            $(".shell").show();
        }
    })
    
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
        $("#bizDate").datepicker('update', $(this).val());
    })
    
    $("#endDate").on('changeDate',function(){
        updateEndDatepicker('fixedRent');
        updateEndDatepicker('commission');
        updateEndDatepicker('propertyMgmt');
        updateEndDatepicker('promotion');
        $('#freeStartDate_1').datepicker('setEndDate',$(this).val());
        $('#freeEndDate_1').datepicker('setEndDate',$(this).val());
    })
    
    $("#freeEndDate_1").on('changeDate',function(){
        $('#bizDate').datepicker('update', IncrDate($(this).val()));
    })
    
    $("div[id*='uploadFile_']").on('click',function(){
        fileUpload($(this).attr('id').split('_')[1]);
    })

    $('#ceo').on('change',function(){
        if($(this).find('option:selected').val() != null) {
            $('.step li:nth-child(5)').addClass('active');
        } else {
            $('.step li:nth-child(5)').removeClass('active');
        }
    })
})

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
                $('.'+VAT+'.newFee').val(v.taxRate).trigger('change');  
            }
        })
        $('.'+FeeItem+'.new').removeClass('new');
        $("."+VAT+".newFee").removeClass('newFee');
    }
}

function updateSelectStoreDropDown(data_count) {
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
                var mallCodes = $('#mallCode').val();
                var mallCode = mallCodes;
                $.each(JSON.parse($.cookie('userModules')), function(i,v) {
                    if(v.roleCode == 'CROLE220607000002' && v.moduleCode == 'KOW'){
                        mallCodes = 'KOW';
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
        updateUserRoleYZJDropDownByRoleId(v.roleId);
    })
}

function getBizId() {
    $.ajax({
        url: $.api.baseLotus+"/api/rent/contract/form/getKowBizId/",
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
    
    if($('#approvalName').val() == null) {
        flag = 0;
        $('#approvalName').parent().append(error);
    }
    
    if($('#startDate').val() == ''){
        flag = 0;
        $('#startDate').parent().prepend(error);
    }
    
    if($('#endDate').val() == ''){
        flag = 0;
        $('#endDate').parent().prepend(error);
    }
    
     if($('#mallCode').val() == null) {
        flag = 0;
        $('#mallCode').parent().append(error);
    }
    
    if($('#selectStore').val() == '') {
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
    
    if($('#awardDate').val() == '') {
        flag = 0;
        $('#awardDate').parent().append(error);
    }
    
    if($('#brandName').val() == null) {
        flag = 0;
        $('#brandName').parent().append(error);
    }
    
    if($('#kowSupplierStore').val().length == 0) {
        flag = 0;
        $('#kowSupplierStore').parent().append(error);
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
    
    if($('#kowDaySales').val() == '' || parseFloat(numberWithoutCommas($('#kowDaySales').val())) <= 0) {
        flag = 0;
        $('#kowDaySales').parent().append(error);
    }
    
    if($('#kowTotalSales').val() == '' || parseFloat(numberWithoutCommas($('#kowTotalSales').val())) <= 0) {
        flag = 0;
        $('#kowTotalSales').parent().append(error);
    }
    
    if($('#kowProfitRate').val() == '' || parseFloat(numberWithoutCommas($('#kowProfitRate').val())) <= 0) {
        flag = 0;
        $('#kowProfitRate').parent().append(error);
    }
    
    if($('#kowNetRate').val() == '' || parseFloat(numberWithoutCommas($('#kowNetRate').val())) <= 0) {
        flag = 0;
        $('#kowNetRate').parent().append(error);
    }
    
    if($('#kowNetProfit').val() == '' || parseFloat(numberWithoutCommas($('#kowNetProfit').val())) <= 0) {
        flag = 0;
        $('#kowNetProfit').parent().append(error);
    }
    
    if($('#kowLabourCost').val() == '' || parseFloat(numberWithoutCommas($('#kowLabourCost').val())) <= 0) {
        flag = 0;
        $('#kowLabourCost').parent().append(error);
    }
    
    if($('#kowLabourUnit').val() == ''){
        flag = 0;
        $('#kowLabourUnit').parent().append(error);
    }
    
    if($('#kowPersonNum').val() == ''){
        flag = 0;
        $('#kowPersonNum').parent().append(error);
    }
    
    if($('#kowMatterConsumable').val() == '') {
        flag = 0;
        $('#kowMatterConsumable').parent().append(error);
    }
    
    if($('#kowFreight').val() == '') {
        flag = 0;
        $('#kowFreight').parent().append(error);
    }
    
    if($('#kow_manager select').val().length == 0) {
        flag = 0;
        $('#kow_manager select').parent().append(error);
    }
    
    if($('#kow_finance_pre_check select').val() == null) {
        flag = 0;
        $('#kow_finance_pre_check select').parent().append(error);
    }
    
    if($('#kow_finance select').val() == null) {
        flag = 0;
        $('#kow_finance select').parent().append(error);
    }
    
    if($('#kow_legal select').val().length == 0) {
        flag = 0;
        $('#kow_legal select').parent().append(error);
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
        
        var brandName = 'kow';
        var brandCode = brandName;
        
        var processBizApprove = 0;
        
        var processHqRentApprove = 0;
        if($('.step-progress li:eq(5)').hasClass('active') == true){
            processHqRentApprove = 1;
        }
        
        var secondCompareFlag = 0;
        if($('#compareSecond').prop('checked') == true){
            secondCompareFlag = 1;
        }
        
        var esignFlag = 0;
        
        var processApproveList = [];
        var lotusRentFlowStep = JSON.parse(sessionStorage.getItem('LOTUS_RENT_FLOW_STEP'));
        if(lotusRentFlowStep.length > 0){
            $.each(lotusRentFlowStep, function(i,v) {
                switch (v.dictName) {
                    case "分管负责人":
                        $.each($("#kow_manager select").val(), function(j,w) {
                            var processApprove = {};
                            processApprove.activityCode = v.dictCode;
                            processApprove.activityName = v.dictName;
                            processApprove.bizId = bizId;
                            processApprove.state = 1;
                            processApprove.approveName = $("#kow_manager select").find("option[value='"+w+"']").text();
                            processApprove.approveOpenId = w;
                            if(processApprove.approveOpenId != null){
                                processApproveList.push(processApprove);
                            }
                        })
                        break;
                    case "财务负责人":
                        var processApprove = {};
                        processApprove.activityCode = v.dictCode;
                        processApprove.activityName = v.dictName;
                        processApprove.bizId = bizId;
                        processApprove.state = 1;
                        processApprove.approveName = $('#kow_finance select').find('option:selected').text();
                        processApprove.approveOpenId = $('#kow_finance select').val();
                        if(processApprove.approveOpenId != null){
                            processApproveList.push(processApprove);
                        }
                        break;
                    case "法务负责人":
                        $.each($("#kow_legal select").val(), function(j,w) {
                            var processApprove = {};
                            processApprove.activityCode = v.dictCode;
                            processApprove.activityName = v.dictName;
                            processApprove.bizId = bizId;
                            processApprove.state = 1;
                            processApprove.approveName = $("#kow_legal select").find("option[value='"+w+"']").text();
                            processApprove.approveOpenId = w;
                            if(processApprove.approveOpenId != null){
                                processApproveList.push(processApprove);
                            }
                        })
                        break;
                    case "财务预审":
                        var processApprove = {};
                        processApprove.activityCode = v.dictCode;
                        processApprove.activityName = v.dictName;
                        processApprove.bizId = bizId;
                        processApprove.state = 1;
                        processApprove.approveName = $('#kow_finance_pre_check select').find('option:selected').text();
                        processApprove.approveOpenId = $('#kow_finance_pre_check select').val();
                        if(processApprove.approveOpenId != null){
                            processApproveList.push(processApprove);
                        }
                        break;
                    default:
                        var processApprove = {};
                        processApprove.activityCode = v.dictCode;
                        processApprove.activityName = v.dictName;
                        processApprove.bizId = bizId;
                        processApprove.state = 1;
                        processApprove.approveName = $('#ceo select').find('option:selected').text();
                        processApprove.approveOpenId = $('#ceo select').val();
                        if(processApprove.approveOpenId != null){
                            processApproveList.push(processApprove);
                        }
                        break;
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
            var len = $("#commission").find("tr").length;
            $("#commission").find("tr").each(function(i,e){
                var commission = {};
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

                commission.amount =  0;
                commission.targetSales =  numberWithoutCommas($('#commissionMinSales_'+index).val());

                commission.taxRate = $('#commissionTaxRate_'+index).val();
                commission.taxCode = $('#commissionTaxRate_'+index).find('option:selected').attr('data-code');

                if($('#commissionInvoiceFlag_'+index).prop('checked') == true){
                    commission.invoiceFlag = 1;
                } else {
                    commission.invoiceFlag = 0;
                }

                deductList.push(commission);  
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
                    if($('#commissionSettlePeriod_1').val() != 'D' && $('#commissionSettlePeriod_1').val() != 'T'){
                    for(var ln = 1; ln < len; ln++){ //条款每一期开始日与上一期结束日比较，条款连续性
                        var check44 = dateCompare(IncrDate($('#commissionEndDate_'+ln).val()), $('#commissionStartDate_'+(ln+1)).val());
                        if(check44 != 'equal'){
                            check4 = check44;
                        }
                    }
                }

                if(check1 == 'smaller' || check2 != 'equal' || check3 != 'smaller' || check4 != 'equal') {
                    alertMsg('9999','提成租金条款开始日与结束日错误，请修改重新提交！');
                    return;
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
        
        var fixedRentList = [];
        if($('#selectRentCalculationMode').find('option:selected').val() != 'deduct') {
            var len = $("#fixedRent").find("tr").length;
            $("#fixedRent").find("tr").each(function(i,e){
                var fixedRent = {};
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

                if($('#fixedRentInvoiceFlag_'+index).prop('checked') == true){
                    fixedRent.invoiceFlag = 1;
                } else {
                    fixedRent.invoiceFlag = 0;
                }

                fixedRentList.push(fixedRent);
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
                if($('#fixedRentSettlePeriod_1').val() != 'D' && $('#fixedRentSettlePeriod_1').val() != 'T'){
                    for(var ln = 1; ln < len; ln++){ //条款每一期开始日与上一期结束日比较，条款连续性
                        var check44 = dateCompare(IncrDate($('#fixedRentEndDate_'+ln).val()), $('#fixedRentStartDate_'+(ln+1)).val());
                        if(check44 != 'equal'){
                            check4 = check44;
                        }
                    }
                }
                
                if(check1 == 'smaller' || check2 != 'equal' || check3 != 'smaller' || check4 != 'equal') {
                    alertMsg('9999','固定租金条款开始日与结束日错误，请修改重新提交！');
                    return;
                } 
            }
        }
        
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
                    return;
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
                if($('#propertyMgmtSettlePeriod_1').val() != 'D' && $('#propertyMgmtSettlePeriod_1').val() != 'T'){
                    for(var ln = 1; ln < len; ln++){ //条款每一期开始日与上一期结束日比较，条款连续性
                        var check44 = dateCompare(IncrDate($('#propertyMgmtEndDate_'+ln).val()), $('#propertyMgmtStartDate_'+(ln+1)).val());
                        if(check44 != 'equal'){
                            check4 = check44;
                        }
                    }
                }
                
                if(check1 == 'smaller' || check2 != 'equal' || check3 != 'smaller' || check4 != 'equal') {
                    alertMsg('9999','物业管理费条款开始日与结束日错误，请修改重新提交！');
                    return;
                } 
            }
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
            "mallCode": $('#mallCode').val(), //必填
            "startDate": startDate, //必填
            "unitName": unitName, //必填
            "activityTimes": 0,
            "approvalName": $('#approvalName').find('option:selected').text(),
            "approvalOpenId": $('#approvalName').find('option:selected').val(),
            "awardDate": $('#awardDate').val(),
            "bindCondition": "",
            "bizDate": $('#bizDate').val(),
            "bizFreeEndDate": "",
            "bizFreeStartDate": "",
            "bizScope": "",
            "bizTypeCode": "",
            "bizTypeName": 'kow',
            "brandCode": brandCode,
            "brandName": brandName,
            "cardDiscount": 0,
            "contractName": 'KOW',
            "contractNo": '',
            "contractTemplate": "",
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
            "esignFlag": esignFlag,
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
            "kowDaySales": numberWithoutCommas($('#kowDaySales').val()),
            "kowFreight": numberWithoutCommas($('#kowFreight').val()),
            "kowLabourCost": numberWithoutCommas($('#kowLabourCost').val()),
            "kowLabourUnit": $('#kowLabourUnit').val(),
            "kowMatterConsumable": numberWithoutCommas($('#kowMatterConsumable').val()),
            "kowNetProfit": numberWithoutCommas($('#kowNetProfit').val()),
            "kowNetRate": parseFloat($('#kowNetRate').val()) / 100,
            "kowPersonNum": $('#kowPersonNum').val(),
            "kowProfitRate": parseFloat($('#kowProfitRate').val()) / 100,
            "kowSupplierStore": JSON.stringify($('#kowSupplierStore').val()),
            "kowTotalSales": numberWithoutCommas($('#kowTotalSales').val()),
            "lastBrandCode": "",
            "lastBrandName": "",
            "mallName": $('#mallCode').find('option:selected').text(),
            "minSales": 0,
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
            "salesList": [],
            "secondCompareCycle": ($('#compareSecondFrequency').val() != "" ? $('#compareSecondFrequency').val() : ""),
            "secondCompareFlag": secondCompareFlag,
            "secondCompareValueType": $('#compareSecondValue').val(),
            "targetSales": 0,
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
            "termCalcMode": "",
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
                                                html2canvas(document.querySelector(".content"), {
                                                    useCORS: true,
                                                    scale: 2,
                                                    height: $('.content').height() - 5
                                                }).then(canvas => {
                                                    var image = canvas.toDataURL("image/png");
                                                    var formData = new FormData();
                                                    var fileName = $('#mallCode').find('option:selected').text()+'_'+brandName+'_'+unitCode+'_新签租赁合同申请单_'+bizId;
                                                    formData.append('file', dataURLtoFile(image,fileName+'.png','image/png'));

                                                    var upload = $.ajax({
                                                        type: "POST",
                                                        url: $.base+"/zuul/onlineleasing-lotus/api/co/file/uploadYzj?bizId="+$('#bizId').val()+"&creatorOpenId="+openId+"&activityName=&bizType=CONTRACT_screenshot",
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
                                                                                $.request.id = response.data.id;
                                                                                alertMsg(response.data.resultCode,response.data.resultMsg);
                                                                            } else if(response.data.id != "" && response.data.formStatus == "2"){
                                                                                window.location.href = '/kow-admin/request-summary?id='+response.data.bizId+'&s=succeed';
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
                            window.location.href = '/kow-admin/request-summary?id='+response.data.bizId+'&s=succeed';
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