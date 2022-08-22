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
    updateSelectMallDropDown(20) // 所属项目
    updateDictDropDownByDictTypeCode('RENT_CALCULATION_MODE','selectRentCalculationMode',$.api.rentCalculationMode[0],$.api.rentCalculationMode[1]); // 计租方式
    updateDictDropDownByDictTypeCode('PROFIT_CENTER','profitCenter',$.api.profitCenter[0],$.api.profitCenter[1]); // 利润中心
    updateDictDropDownByDictTypeCode('POS_MODE','posMode',$.api.posMode[0],$.api.posMode[1]); // 收银方式
    updateDictDropDownByDictTypeCode('CONTRACT_TYPE','contractType',$.api.contractType[0],$.api.contractType[1]); // 合同类型
    updateDictDropDownByDictTypeCode('FORM_TYPE','formType',$.api.formType[2],$.api.formType[3]); // 表单类型
    updateDictDropDownByDictTypeCode('PAYMENT_MODE','paymentMode',$.api.paymentMode[0],$.api.paymentMode[1]); // 支付方式
    updateSelectTenantDropDown(50, 'selectTenant', 'T0000000 | 上海易初莲花连锁超市有限公司','LTTENANT220606000001');
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
    
    $("input[id*='promotionEndDate_']").on('changeDate',function(){
        calBackPushPromotionSingleRow($(this).attr('id').split('_')[1]);
    })
    
    $("#propertyMgmtSettlePeriod_1").change(function(){
        var index;
        $("#propertyMgmt").find("tr").each(function(i,e){
            index = i * 1 + 1;
            calBackPushPropertyMgmtSingleRow(index);
        })
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
    
    findRequestbyBizId();
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
                if(response.data != '' && response.data != null && response.data.formType == 'renew'){
                    var data = response.data;
                    $.request.content = data;
                    
                    if(response.data.oldContractInfo != '' && response.data.oldContractInfo != null){
                        var data = response.data.oldContractInfo;
                        
                        if($.request.content.formStatus != '1' && $.request.content.formStatus != '3'){
                            $('#saveDraft').hide();
                            $('#submitForm').hide();
                        }

                        temp = new Option(data.approvalName, data.approvalOpenId, true, true);
                        $('#approvalName').append(temp).trigger('change');

                        $('#creatorName').val((data.creatorName != null ? data.creatorName : 'admin'));
                        $('#requestName').text($.request.content.bizId);
                        $('#bizId').val($.request.content.bizId);
                        updateDictByDictTypeCode('FORM_STATUS','formStatus',(data.formStatus != null ? data.formStatus : 1));

                        if(data.tenantCode != null && data.tenantName != null){
                            temp = new Option((data.tenantNo +' | '+ data.tenantName), data.tenantCode, true, true);
                            $('#selectTenant').append(temp).trigger('change');
                        }
                        $('#contractNo').val(data.contractNo);

                        if(data.mallCode != null && data.mallName != null){
                            temp = new Option(data.mallName, data.mallCode, true, true);
                            $('#mallCode').append(temp).trigger('change');
                        }

                        $("#mallCode").change(function(){
                            if($('#mallCode').val() != '' && $('#mallCode').val() != null){
                                updateSelectStoreDropDown(10,$('#mallCode').val());
                            }
                        })

                        $.request.mallCode = data.mallCode;
                        updateSelectStoreDropDown(10,data.mallCode);
                        temp = new Option((data.unitName +'['+ data.unitCode +'] | '+ data.area + '㎡'), data.unitCode+':::'+data.shopCode+':::'+data.unitName+':::'+data.floorName+':::'+data.floorCode, true, true);
                        $('#selectStore').append(temp).trigger('change');

                        $("#selectStore").change(function(){
                            var selectStoreArea = $('#selectStore').find('option:selected').text().split(' | ')[1];
                            selectStoreArea = selectStoreArea.split('㎡')[0];
                            $('#area').val(selectStoreArea);
                            var floor = new Option($('#selectStore').val().split(':::')[3], $('#selectStore').val().split(':::')[4], true, true);
                            $('#floor').append(floor).trigger('change');
                            calBackPushFixedRentRentAmount();
                            calBackPushPropertyMgmtRentAmount();
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

                        $('#deliveryDate').datepicker('update', data.deliveryDate);
                        $('#area').val(data.area);
                        $('#bizDate').datepicker('update', data.bizDate);
                        $('#awardDate').datepicker('update', response.data.oldContractInfo.awardDate);
                        $('#enterDate').datepicker('update', data.enterDate);
                        $('#freeStartDate_1').datepicker('update', data.freeStartDate);
                        $('#freeEndDate_1').datepicker('update', data.freeEndDate);
                        $('#openStartTime').val(data.openStartTime);
                        $('#openEndTime').val(data.openEndTime);
                        $('#freeDays').val(data.freeDays);
                        var kowSupplierStore = $.parseJSON(response.data.kowSupplierStore);
                        $('#kowSupplierStore').val(kowSupplierStore).trigger('change');
                        $('#remark').val(data.remark);

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

                        if(data.fixedRentList.length > 0) {
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
                            
                            $.each(data.fixedRentList, function(i,v) {
                                updateRowInvestmentContractAccounttermFixed(JSON.stringify(v));
                                $('#fixedRent tr:eq("'+i+'")').find('select, input').attr('disabled','disabled');
                                $('#fixedRent tr:eq("'+i+'")').find('a').css('opacity','0.5').attr('onclick','');
                            })
                        }

                        if(data.deductList.length > 0) {
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
                            
                            $.each(data.deductList, function(i,v) {
                                updateRowInvestmentContractAccounttermCommission(JSON.stringify(v));
                                $('#commission tr:eq("'+i+'")').find('select, input').attr('disabled','disabled');
                                $('#commission tr:eq("'+i+'")').find('a').css('opacity','0.5').attr('onclick','');
                            })
                        }

                        if(data.propertyFeeList.length > 0) {
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
                            
                            $.each(data.propertyFeeList, function(i,v) {
                                updateRowInvestmentContractAccounttermPropertyMgmt(JSON.stringify(v));
                                $('#propertyMgmt tr:eq("'+i+'")').find('select, input').attr('disabled','disabled');
                                $('#propertyMgmt tr:eq("'+i+'")').find('a').css('opacity','0.5').attr('onclick','');
                            })
                        }

                        if(data.promotionFeeList.length > 0) {
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
                            
                            $.each(data.promotionFeeList, function(i,v) {
                                updateRowInvestmentContractAccounttermPromotion(JSON.stringify(v));
                                $('#promotion tr:eq("'+i+'")').find('select, input').attr('disabled','disabled');
                                $('#promotion tr:eq("'+i+'")').find('a').css('opacity','0.5').attr('onclick','');
                            })
                        }

                        if(data.depositList.length > 0) {
                            $.each(data.depositList, function(i,v) {
                                updateRowInvestmentContractDepositterm(JSON.stringify(v));
                            })
                        }

                        $('input.money').each(function(){
                            $(this).val(accounting.formatNumber($(this).val()));
                        })
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
    input.setAttribute("class","form-control past");
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
    input2.setAttribute("class","form-control past");
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
    
    var div = document.createElement("div"); //金额(含税)
    div.setAttribute("class","input-group");
    var input = document.createElement("input");
    input.setAttribute("class","form-control money past");
    input.setAttribute("id","fixedRentAmount_"+count.toLocaleString());
    input.setAttribute("type","text");
    input.setAttribute("value",value.amount);
    div.appendChild(input);
    var percent = document.createElement("span");
    percent.innerText = "元";
    percent.setAttribute("class", "input-group-addon");
    div.appendChild(percent);
    column4.appendChild(div);
    
    var div = document.createElement("div"); //单价(含税)
    div.setAttribute("class","input-group");
    var input = document.createElement("input");
    input.setAttribute("class","form-control money past");
    input.setAttribute("id","fixedRentRentAmount_"+count.toLocaleString());
    input.setAttribute("type","text");
    input.setAttribute("value",value.rentAmount);
    div.appendChild(input);
    var percent = document.createElement("span");
    percent.innerText = "元/m²/天";
    percent.setAttribute("class", "input-group-addon");
    div.appendChild(percent);
    column5.appendChild(div);
    
    var div = document.createElement("div"); //金额(去税)
    div.setAttribute("class","input-group");
    var input = document.createElement("input");
    input.setAttribute("class","form-control money past");
    input.setAttribute("id","fixedRentTaxAmount_"+count.toLocaleString());
    input.setAttribute("type","text");
    input.setAttribute("value",value.taxAmount);
    div.appendChild(input);
    var percent = document.createElement("span");
    percent.innerText = "元";
    percent.setAttribute("class", "input-group-addon");
    div.appendChild(percent);
    column6.appendChild(div);
    
    var div = document.createElement("div"); //单价(去税)
    div.setAttribute("class","input-group");
    var input = document.createElement("input");
    input.setAttribute("class","form-control money past");
    input.setAttribute("id","fixedRentTaxRentAmount_"+count.toLocaleString());
    input.setAttribute("type","text");
    input.setAttribute("value",value.taxRentAmount);
    div.appendChild(input);
    var percent = document.createElement("span");
    percent.innerText = "元/m²/天";
    percent.setAttribute("class", "input-group-addon");
    div.appendChild(percent);
    column7.appendChild(div);
    
    var select = document.createElement("select"); //税率
    select.setAttribute("class","select2 taxVat newVAT fixedVATDropDown newFee past");
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
        calBackPushFixedRentSingleRow($(this).attr('id').split('_')[1]);
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
    input.setAttribute("class","form-control past");
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
    input2.setAttribute("class","form-control past");
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
    input.setAttribute("class","form-control money past");
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
    input.setAttribute("class","form-control money past");
    input.setAttribute("id","commissionDeduct_"+count.toLocaleString());
    input.setAttribute("type","text");
    input.setAttribute("readonly","");
    input.setAttribute("style","border: none");
    input.setAttribute("value",(parseFloat(value.deduct) * 100));
    div.appendChild(input);
    var percent = document.createElement("span");
    percent.innerText = "%";
    percent.setAttribute("class", "input-group-addon");
    div.appendChild(percent);
    column7.appendChild(div);
    
    var div = document.createElement("div"); //保底营业额
    div.setAttribute("class","input-group");
    var input = document.createElement("input");
    input.setAttribute("class","form-control money past");
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
    select.setAttribute("class","select2 taxVat newVAT commissionVATDropDown newFee past");
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
        calBackPushCommissionSingleRow($(this).attr('id').split('_')[1]);
    });
    
    $("#commissionTaxDeduct_"+count.toLocaleString()).on('change',function(){
        calBackPushCommissionDeduct();
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
    input.setAttribute("class","form-control past");
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
    input2.setAttribute("class","form-control past");
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
    
    var div = document.createElement("div"); //金额(含税)
    div.setAttribute("class","input-group");
    var input = document.createElement("input");
    input.setAttribute("class","form-control money past");
    input.setAttribute("id","propertyMgmtAmount_"+count.toLocaleString());
    input.setAttribute("type","text");
    input.setAttribute("value",value.amount);
    div.appendChild(input);
    var percent = document.createElement("span");
    percent.innerText = "元";
    percent.setAttribute("class", "input-group-addon");
    div.appendChild(percent);
    column4.appendChild(div);
    
    var div = document.createElement("div"); //月面积单价(含税)
    div.setAttribute("class","input-group");
    var input = document.createElement("input");
    input.setAttribute("class","form-control money past");
    input.setAttribute("id","propertyMgmtRentAmount_"+count.toLocaleString());
    input.setAttribute("type","text");
    input.setAttribute("value",value.rentAmount);
    div.appendChild(input);
    var percent = document.createElement("span");
    percent.innerText = "元/m²/月";
    percent.setAttribute("class", "input-group-addon");
    div.appendChild(percent);
    column5.appendChild(div);
    
    var div = document.createElement("div"); //金额(去税)
    div.setAttribute("class","input-group");
    var input = document.createElement("input");
    input.setAttribute("class","form-control money past");
    input.setAttribute("id","propertyMgmtTaxAmount_"+count.toLocaleString());
    input.setAttribute("type","text");
    input.setAttribute("value",value.taxAmount);
    div.appendChild(input);
    var percent = document.createElement("span");
    percent.innerText = "元";
    percent.setAttribute("class", "input-group-addon");
    div.appendChild(percent);
    column6.appendChild(div);
    
    var div = document.createElement("div"); //月面积单价(去税) 
    div.setAttribute("class","input-group");
    var input = document.createElement("input");
    input.setAttribute("class","form-control money past");
    input.setAttribute("id","propertyMgmtTaxRentAmount_"+count.toLocaleString());
    input.setAttribute("type","text");
    input.setAttribute("value",value.taxRentAmount);
    div.appendChild(input);
    var percent = document.createElement("span");
    percent.innerText = "元/m²/月";
    percent.setAttribute("class", "input-group-addon");
    div.appendChild(percent);
    column7.appendChild(div);
    
    var select = document.createElement("select"); //税率
    select.setAttribute("class","select2 taxVat newVAT propertyMgmtVATDropDown newFee past");
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
        calBackPushPropertyMgmtSingleRow($(this).attr('id').split('_')[1]);
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
    input.setAttribute("class","form-control past");
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
    input2.setAttribute("class","form-control past");
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
    input.setAttribute("class","form-control money past");
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
    input.setAttribute("class","form-control money past");
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
    select.setAttribute("class","select2 taxVat newVAT promotionVATDropDown newFee past");
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
    select.options[1] = new Option('装修保证金[E02]','E03');
    select.options[2] = new Option('公共事业费押金[E22]','E22');
    column2.appendChild(select);
    
    column3.innerText = '付';
    
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
        var creatorName = $('#creatorName').val();
        var unitCode = $.request.content.unitCode;
        var unitName = $.request.content.unitName;
        var shopCode = $.request.content.shopCode;
        var formType = $('#formType').find('option:selected').val();
        var endDate = $('#endDate').val();
        var awardDate = $('#rewardDate').val();
        var brandName = $.request.content.brandName;
        var brandCode = $.request.content.brandCode;
        var freeDays = $('#freeDays').val();
        var freeEndDate = $('#freeEndDate_1').val();
        var freeStartDate = $('#freeStartDate_1').val();
        var remark = $('#remark').val();
        var taxTotalPropertyAmount = numberWithoutCommas($('#propertyMgmtTaxTotalPropertyAmount').text());
        var taxTotalRentAmount = numberWithoutCommas($('#fixedRentTaxTotalRentAmount').text());
        var totalPropertyAmount = numberWithoutCommas($('#propertyMgmtTotalPropertyAmount').text());
        var totalRentAmount = numberWithoutCommas($('#fixedRentTotalRentAmount').text());
        
        var processBizApprove = 0;
        
        var processHqRentApprove = 0;
        if($('.step-progress li:eq(5)').hasClass('active') == true){
            processHqRentApprove = 1;
        }
        
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
            var len = $("#commission").find("tr.new").length;
            var lenOld = $("#commission").find("tr").not('.new').length;
            var lenTotle = len * 1 + lenOld * 1;
            $("#commission").find("tr.new").each(function(i,e){
                var commission = {};
                index = i * 1 + lenOld * 1 + 1;
                commission.itemCode = $('#commissionItem_'+index).val();
                commission.itemName = $('#select2-commissionItem_'+index+'-container').text().split('[')[0];

                commission.shopCode = shopCode;
                commission.area = $.request.content.area;

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
            var len = $("#fixedRent").find("tr.new").length;
            var lenOld = $("#fixedRent").find("tr").not('.new').length;
            var lenTotle = len * 1 + lenOld * 1;
            $("#fixedRent").find("tr.new").each(function(i,e){
                var fixedRent = {};
                index = i * 1 + lenOld * 1 + 1;
                fixedRent.itemCode = $('#fixedRentItem_'+index).val();
                fixedRent.itemName = $('#select2-fixedRentItem_'+index+'-container').text().split('[')[0];

                fixedRent.shopCode = shopCode;
                fixedRent.area = $.request.content.area;

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
        var len = $("#promotion").find("tr.new").length;
        var lenOld = $("#promotion").find("tr").not('.new').length;
        var lenTotle = len * 1 + lenOld * 1;
        $("#promotion").find("tr.new").each(function(i,e){
            var promotion = {};
            index = i * 1 + lenOld * 1 + 1;
            promotion.itemCode = $('#promotionItem_'+index).val();
            promotion.itemName = $('#select2-promotionItem_'+index+'-container').text().split('[')[0];

            promotion.shopCode = shopCode;
            promotion.area = $.request.content.area;

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
        var len = $("#propertyMgmt").find("tr.new").length;
        var lenOld = $("#propertyMgmt").find("tr").not('.new').length;
        var lenTotle = len * 1 + lenOld * 1;
        $("#propertyMgmt").find("tr.new").each(function(i,e){
            var propertyMgmt = {};
            index = i * 1 + lenOld * 1 + 1;
            propertyMgmt.itemCode = $('#propertyMgmtItem_'+index).val();
            propertyMgmt.itemName = $('#select2-propertyMgmtItem_'+index+'-container').text().split('[')[0];

            propertyMgmt.shopCode = shopCode;
            propertyMgmt.area = $.request.content.area;

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
            "id": $.request.content.id, //必填
            "code": $.request.content.code, //必填
            "bizId": bizId, //必填
            "formType": formType, //必填
            "area": $.request.content.area, //必填
            "shopCode": shopCode, //必填
            "rentCalculationMode": $.request.content.rentCalculationMode, //必填
            "endDate": endDate, //必填
            "contractType": $.request.content.contractType, //必填
            "unitCode": unitCode, //必填
            "mallCode": $.request.mallCode, //必填
            "startDate": IncrDate($.request.content.endDate), //必填
            "unitName": unitName, //必填
            "activityTimes": 0,
            "approvalName": $('#approvalName').find('option:selected').text(),
            "approvalOpenId": $('#approvalName').find('option:selected').val(),
            "awardDate": awardDate,
            "bindCondition": "",
            "bizDate": $.request.content.bizDate,
            "bizFreeEndDate": "",
            "bizFreeStartDate": "",
            "bizScope": "",
            "bizTypeCode": "",
            "bizTypeName": 'kow',
            "brandCode": brandCode,
            "brandName": brandName,
            "cardDiscount": 0,
            "contractName": $.request.content.contractName,
            "contractNo": $.request.content.contractNo,
            "contractTemplate": null,
            "contractVersion": $.request.content.contractVersion,
            "creatorCode": userCode,
            "creatorName": creatorName,
            "creatorOpenId": openId,
            "creatorOrgId": "",
            "creatorOrgName": "",
            "dayRent": 0,
            "deductList": deductList,
            "deliveryCondition": "",
            "deliveryDate": $.request.content.deliveryDate,
            "depositList": depositList,
            "duration": 0,
            "enterDate": $.request.content.enterDate,
            "esignFlag": 0,
            "exclusiveCondition": "",
            "firstCompareCycle": $.request.content.compareFirstFrequency,
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
            "mallName": $.request.content.mallName,
            "minSales": 0,
            "oldEndDate": $.request.content.endDate,
            "oldStartDate": $.request.content.startDate,
            "openEndTime": $.request.content.openEndTime,
            "openStartTime": $.request.content.openStartTime,
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
            "salesList": [],
            "secondCompareCycle": $.request.content.compareSecondFrequency,
            "secondCompareFlag": $.request.content.secondCompareFlag,
            "secondCompareValueType": $.request.content.compareSecondValue,
            "targetSales": 0,
            "taxReimbursement": "",
            "taxTotalPropertyAmount": taxTotalPropertyAmount,
            "taxTotalRentAmount": taxTotalRentAmount,
            "telLineNum": 0,
            "tenantCode": $.request.content.tenantCode,
            "tenantLicenseCode": "",
            "tenantName": $.request.content.tenantName,
            "tenantNo": $.request.content.tenantNo,
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
                                                    var fileName = $.request.content.mallName+'_'+brandName+'_'+unitCode+'_续签租赁合同申请单_'+bizId;
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
                                                                        if(response.code === 'C0') {
                                                                            $('#submitState').text('');
                                                                            $('#submitStateModal').modal('hide');
                                                                            if(response.data.resultCode == "ERROR" && response.data.id != ""){
                                                                                $.request.content.id = response.data.id;
                                                                                alertMsg(response.data.resultCode,response.data.resultMsg);
                                                                            } else if(response.data.id != "" && response.data.formStatus == "2"){
                                                                                window.location.href = '/kow-admin/renew-summary?id='+response.data.bizId+'&s=succeed';
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
                            window.location.href = '/kow-admin/renew-summary?id='+response.data.bizId+'&s=succeed';
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