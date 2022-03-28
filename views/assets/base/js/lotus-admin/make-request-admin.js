var ltconform_id = '';
var ltconform_code = '';

$(document).ready(function(){
    $('#create-form')[0].reset();
    getBizId();
    
    if(getURLParameter('s')) {
        switch (getURLParameter('s')) {
            case "succeed":
                $('.callout-info').show().delay(2000).hide(0);
                $('html, body').animate({
                    scrollTop: $('#webui').offset().top
                }, 0);
                break;
            case "fail":
                $('.callout-danger').show().delay(2000).hide(0);
                $('html, body').animate({
                    scrollTop: $('#webui').offset().top
                }, 0);
                break;
            default:
                break;
        }
        setTimeout(function () {
            window.history.pushState("object or string", "Title", "/lotus-admin/"+refineCreateUrl() );
        },1000);
    }
    
    findTaxInfoByTaxCategories('VAT');
    
    $('.date-picker, .input-daterange').datepicker({
        'language': 'zh-CN',
        'format': 'yyyy-mm-dd',
        'todayBtn': "linked",
        'todayHighlight': true,
        'startDate': ($('#startDate').val() != '' ? $('#startDate').val() : new Date(new Date().setDate(new Date().getDate() + 0))),
        'endDate': $('#endDate').val(),
        'autoclose': true
    });
    
    $('#freePeriods').datepicker().on('changeDate', function(e) {
        var start = $('#freeStartDate_1').val(); 
        var end = $('#freeEndDate_1').val(); 
        var diff = calDatesDiff(start, end);
        $('#freeDays').val(diff); 
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
    
    $("input[id*='fixedRentAmount_']").on('blur',function(){
        calBackPushFixedRentAmount();
    })
    
    $("input[id*='fixedRentTaxAmount_']").on('blur',function(){
        calBackPushFixedRentTaxAmount();
    })
    
    $("input[id*='commissionDeduct_']").on('blur',function(){
        calBackPushCommissionDeduct();
    })
    
    $("input[id*='propertyMgmtAmount_']").on('blur',function(){
        calBackPushPropertyMgmtAmount();
    })
    
    $("input[id*='propertyMgmtTaxAmount_']").on('blur',function(){
        calBackPushPropertyMgmtTaxAmount();
    })
    
    $("input[id*='promotionAmount_']").on('blur',function(){
        calBackPushPromotionAmount();
    })
    
    $("input[id*='promotionDeduct_']").on('blur',function(){
        calBackPushPromotionDeduct();
    })
    
    if(!sessionStorage.getItem('roleYZJ') || sessionStorage.getItem('roleYZJ') == null || sessionStorage.getItem('roleYZJ') == ''){
        findRoleYZJByParentId();
    } else {
        updateRoleYZJLabel();
    }
    
    // 初始化
    $('#investmentContractModelMallSelect').val($.cookie('mallSelected').split(':::')[0]+'['+$.cookie('mallSelected').split(':::')[1]+']');
    
    updateDictDropDownByDictTypeCode('RENT_CALCULATION_MODE','selectRentCalculationMode',$.api.rentCalculationMode[0],$.api.rentCalculationMode[1]); // 计租方式
    updateDictDropDownByDictTypeCode('PROFIT_CENTER','profitCenter',$.api.profitCenter[0],$.api.profitCenter[1]); // 利润中心
    updateDictDropDownByDictTypeCode('POS_MODE','posMode',$.api.posMode[0],$.api.posMode[1]); // 收银方式
    updateDictDropDownByDictTypeCode('CONTRACT_TYPE','contractType',$.api.contractType[0],$.api.contractType[1]); // 合同类型
    updateSelectTenantDropDown(10);
    updateSelectStoreDropDown(10);
    findCommissionByDictTypeCode('PRODUCT_CATEGORY'); // 商品分类
    findCommissionByDictTypeCode('DEDUCT_TYPE'); // 全额/差额
    
    findFeeItemByContractType($('#contractType').val()); 
    findMainSigningBody($.cookie('mallSelected').split(':::')[0]);
    $('input.money').on('blur',function(){
        $(this).val(accounting.formatNumber($(this).val()));
    });
    calBackPushNextCalendar('fixedRent');
    calBackPushNextCalendar('commission');
    
    // change事件
    $("input[id*='fixedRentEndDate_']").on('changeDate',function(){
        calBackPushNextCalendar('fixedRent');
    })
    
    $("input[id*='commissionEndDate_']").on('changeDate',function(){
        calBackPushNextCalendar('commission');
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
        calBackPushFixedRentAmount();
        calBackPushPropertyMgmtAmount();
    })
    
    $(".promotionFeeItemDropDown").on('change',function(){
        $(".promotionFeeItemDropDown").not('#promotionItem_'+$(this).attr('id').split('_')[1]).val($(this).val()).trigger("change"); ;
        if($(this).val() == 'G011'){
            $('#promotionCommissionBase').hide();
        } else if($(this).val() == 'G021'){
            $('#promotionCommissionBase').show();
        }
    })
    
    updateTaxVAT();
    updateCommissionDropDown('commissionCategoryDropDown','PRODUCT_CATEGORY'); // 商品分类
    updateCommissionDropDown('commissionDeductTypeDropDown','DEDUCT_TYPE'); // 全额/差额
    updateFeeItems('fixedFeeItemDropDown','fixedVATDropDown','fixedRent'); // 固定租金科目
    updateFeeItems('commissionFeeItemDropDown','commissionVATDropDown','deductRent'); // 提成租金科目
    updateFeeItems('propertyMgmtFeeItemDropDown','propertyMgmtVATDropDown','property'); // 物业管理费科目
    updateFeeItems('promotionFeeItemDropDown','promotionVATDropDown','promitionFee'); // 推广费科目
    
    // 取高明细
    $("#selectRentCalculationMode").change(function(){
        if($(this).val() == 'fixedRentAndHigherDeduct'){
            $('#investmentContractAccounttermCompare').show();
        } else {
            $('#investmentContractAccounttermCompare').hide();
        }
    })
    
    var iNum1;
    var compareFirstFrequency = ['月','季','年'];
    var compareSecondFrequency = [['季','年'],['年'],['年']];
    $(function () {
        for(var i=0;i<compareFirstFrequency.length;i++){
            $('#compareFirstFrequency').append('<option>'+compareFirstFrequency[i]+'</option>');
        }
        
        $('#compareFirstFrequency').change(function () {
            $('#compareSecondFrequency').children().not(':eq(0)').remove();
            iNum1 = $(this).children('option:selected').index();
            if(iNum1 != 0) {
                if(iNum1 != 3) {
                    $("#compareSecond").prop('disabled',false);
                    var CompareSecondFrequency = compareSecondFrequency[iNum1-1];
                    for(var j=0;j<CompareSecondFrequency.length;j++){
                        $('#compareSecondFrequency').append('<option>'+CompareSecondFrequency[j]+'</option>');
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
        mandatoryCheck();
    })
    
    $("#startDate").on('changeDate',function(){
        updateStartDatepicker();
        $('#freeEndDate_1').datepicker('setStartDate',$(this).val());
        $('#freeEndDate_1').datepicker('update',$(this).val());
        $("#deliveryDate").val($(this).val());
        $("#enterDate").val($(this).val());
    })
    
    $("#endDate").on('changeDate',function(){
        updateEndDatepicker('fixedRent');
        updateEndDatepicker('commission');
        updateEndDatepicker('propertyMgmt');
        updateEndDatepicker('promotion');
    })
    
    $("#freeEndDate_1").on('changeDate',function(){
        $('#bizDate').val(IncrDate($(this).val()));
    })
})

function updateStartDatepicker() {
    $("input[id*='StartDate_1']").datepicker('setStartDate',$('#startDate').val());
    $("input[id*='StartDate_1']").datepicker('update',$('#startDate').val());
}

function updateEndDatepicker(Exid) {
    $("input[id*='"+Exid+"EndDate_']").each(function(i){  
        var num = i + 1;
        if($('#'+Exid+'EndDate_'+(parseInt(num)+1)).length <= 0){
            $('#'+Exid+'EndDate_'+num).datepicker('setEndDate',$('#endDate').val());
            $('#'+Exid+'EndDate_'+num).datepicker('update',$('#endDate').val());
            return false;
        }
    });  
}

function findFeeItemByContractType(type) {
    $.ajax({
        url: $.api.baseAdmin+"/api/finance/feeItem/findAllByContractType/"+type,
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
                    sessionStorage.setItem("feeItems", JSON.stringify(response.data));
                }
            } else {
                alertMsg(response.code,response.customerMessage);
            }
        }
    })
}

function findTaxInfoByTaxCategories(cate) {
    $.ajax({
        url: $.api.baseAdmin+"/api/finance/taxInfo/findAllByTaxCategories/"+cate,
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
                    sessionStorage.setItem("taxVAT", JSON.stringify(response.data));
                }
            } else {
                alertMsg(response.code,response.customerMessage);
            }
        }
    })
}

function findCommissionByDictTypeCode(dictTypeCode) {
    $.ajax({
        url: $.api.baseAdmin+"/api/dict/findAllByDictTypeCode/"+dictTypeCode,
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
                
                if(response.data.dictDataList.length > 0){
                    sessionStorage.setItem(dictTypeCode, JSON.stringify(response.data.dictDataList));
                }
            } else {
                alertMsg(response.code,response.customerMessage);
            }
        }
    })
}

function jumpTo(id) {
    $('html, body').animate({
        scrollTop: $('#'+id).offset().top - 150
    }, 0);
    
    $('.breadcrumb li').removeClass('active');
    $('#tab_'+id).addClass('active');
}

function calDatesDiff(s,e) {
    s=s.replace(/-/g,"/");
    var startdate=new Date(s);
    e=e.replace(/-/g,"/");
    var enddate=new Date(e);
 
    var time=enddate.getTime()-startdate.getTime();
    var days=parseInt(time/(1000 * 60 * 60 * 24) + 1);
    return days;
}

function selectProcess(i) {
    if($('.step li:nth-child('+i+')').hasClass('active') == true){
        for(var index = i;index < 7;index++){
            $('.step li:nth-child('+index+')').removeClass('active');
        }
    } else {
        for(var index = i;index > 4;index--){
            $('.step li:nth-child('+index+')').addClass('active');
        }
    }
}

function createRowColumn(row) {
    var column = document.createElement("td");
    row.appendChild(column);
    return column;
}

function addRowInvestmentContractAccounttermFixed() {
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
    select.setAttribute("className","select2 fixedFeeItemDropDown new");
    select.setAttribute("id","fixedRentItem_"+count.toLocaleString());
    column2.appendChild(select);
    
    var div = document.createElement("div"); //期限
    div.setAttribute("class","input-daterange input-group");
    div.setAttribute("className","input-daterange input-group");
    var input = document.createElement("input");
    input.setAttribute("class","form-control");
    input.setAttribute("className","form-control");
    input.setAttribute("id","fixedRentStartDate_"+count.toLocaleString());
    input.setAttribute("type","text");
    input.setAttribute("style","min-width: 80px");
    input.setAttribute("readonly","");
    div.appendChild(input);
    var icon = document.createElement("i");
    icon.setAttribute("class", "fa fa-calendar");
    icon.setAttribute("className", "fa fa-calendar");
    var span = document.createElement("span");
    span.setAttribute("class", "input-group-addon");
    span.setAttribute("className", "input-group-addon");
    span.appendChild(icon);
    div.appendChild(span);
    var to = document.createElement("span");
    to.innerText = "-";
    to.setAttribute("class", "input-group-addon");
    to.setAttribute("className", "input-group-addon");
    div.appendChild(to);
    var div2 = document.createElement("div");
    div2.setAttribute("class","input-group");
    div2.setAttribute("className","input-group");
    var input2 = document.createElement("input");
    input2.setAttribute("class","form-control");
    input2.setAttribute("className","form-control");
    input2.setAttribute("id","fixedRentEndDate_"+count.toLocaleString());
    input2.setAttribute("type","text");
    input2.setAttribute("style","min-width: 80px");
    input2.setAttribute("readonly","");
    div2.appendChild(input2);
    var icon2 = document.createElement("i");
    icon2.setAttribute("class", "fa fa-calendar");
    icon2.setAttribute("className", "fa fa-calendar");
    var span2 = document.createElement("span");
    span2.setAttribute("class", "input-group-addon");
    span2.setAttribute("className", "input-group-addon");
    span2.appendChild(icon2);
    div2.appendChild(span2);
    div.appendChild(div2);
    column3.appendChild(div);
    
    var div = document.createElement("div"); //含税金额
    div.setAttribute("class","input-group");
    div.setAttribute("className","input-group");
    var input = document.createElement("input");
    input.setAttribute("class","form-control money");
    input.setAttribute("className","form-control money");
    input.setAttribute("id","fixedRentAmount_"+count.toLocaleString());
    input.setAttribute("type","text");
    div.appendChild(input);
    var percent = document.createElement("span");
    percent.innerText = "元";
    percent.setAttribute("class", "input-group-addon");
    percent.setAttribute("className", "input-group-addon");
    div.appendChild(percent);
    column4.appendChild(div);
    
    var div = document.createElement("div"); //去税金额
    div.setAttribute("class","input-group");
    div.setAttribute("className","input-group");
    var input = document.createElement("input");
    input.setAttribute("class","form-control money");
    input.setAttribute("className","form-control money");
    input.setAttribute("id","fixedRentTaxAmount_"+count.toLocaleString());
    input.setAttribute("type","text");
    div.appendChild(input);
    var percent = document.createElement("span");
    percent.innerText = "元";
    percent.setAttribute("class", "input-group-addon");
    percent.setAttribute("className", "input-group-addon");
    div.appendChild(percent);
    column5.appendChild(div);
    
    var div = document.createElement("div"); //含税单价
    div.setAttribute("class","input-group");
    div.setAttribute("className","input-group");
    var input = document.createElement("input");
    input.setAttribute("class","form-control money");
    input.setAttribute("className","form-control money");
    input.setAttribute("id","fixedRentRentAmount_"+count.toLocaleString());
    input.setAttribute("type","text");
    input.setAttribute("readonly","");
    input.setAttribute("style","border: none");
    div.appendChild(input);
    var percent = document.createElement("span");
    percent.innerText = "元";
    percent.setAttribute("class", "input-group-addon");
    percent.setAttribute("className", "input-group-addon");
    div.appendChild(percent);
    column6.appendChild(div);
    
    var div = document.createElement("div"); //去税单价
    div.setAttribute("class","input-group");
    div.setAttribute("className","input-group");
    var input = document.createElement("input");
    input.setAttribute("class","form-control money");
    input.setAttribute("className","form-control money");
    input.setAttribute("id","fixedRentTaxRentAmount_"+count.toLocaleString());
    input.setAttribute("type","text");
    input.setAttribute("readonly","");
    input.setAttribute("style","border: none");
    div.appendChild(input);
    var percent = document.createElement("span");
    percent.innerText = "元";
    percent.setAttribute("class", "input-group-addon");
    percent.setAttribute("className", "input-group-addon");
    div.appendChild(percent);
    column7.appendChild(div);
    
    var select = document.createElement("select"); //税率
    select.setAttribute("class","select2 taxVat newVAT fixedVATDropDown newFee");
    select.setAttribute("className","select2 taxVat newVAT fixedVATDropDown newFee");
    select.setAttribute("id","fixedRentTaxRate_"+count.toLocaleString());
    column8.appendChild(select);
    
    var checkbox = document.createElement("input"); //是否开发票
    checkbox.setAttribute("id","fixedRentInvoiceFlag_"+count.toLocaleString());
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("checked", "");
    column9.appendChild(checkbox);
    
    var remove = document.createElement("a");
    remove.setAttribute("href", "javascript:void(0);");
    remove.setAttribute("onClick", "deleteRow(this)");
    var icon = document.createElement("i");
    icon.setAttribute("class", "fa fa-minus-circle");
    icon.setAttribute("className", "fa fa-minus-circle");
    icon.setAttribute("style", "color: #ED4A52; font-size: 16px;");
    remove.appendChild(icon);
    column10.appendChild(remove);

    tbody.appendChild(newrow);
    updateTaxVAT();
    updateFeeItems('fixedFeeItemDropDown','fixedVATDropDown','fixedRent');
    var tmp = $('#fixedRentEndDate_'+(parseInt(count)-1).toLocaleString()).val();
    $('#investmentContractAccounttermFixed .input-daterange input').datepicker({
        'language': 'zh-CN',
        'format': 'yyyy-mm-dd',
        'todayBtn': "linked",
        'todayHighlight': true,
        'startDate': IncrDate(tmp),
        'endDate': $('#endDate').val(),
        'autoclose': true
    });
    
    $('#investmentContractAccounttermFixed .select2').select2();
    calBackPushFixedRentTaxAmount();
    calBackPushNextCalendar('fixedRent'); 
    
    $('input.money').on('blur',function(){
        $(this).val(accounting.formatNumber($(this).val()));
    });
    
    $("input[id*='fixedRentEndDate_']").on('changeDate',function(){
        calBackPushNextCalendar('fixedRent');
    })
    
    $("input[id*='fixedRentAmount_']").on('blur',function(){
        calBackPushFixedRentAmount();
    })
    
    $("input[id*='fixedRentTaxAmount_']").on('blur',function(){
        calBackPushFixedRentTaxAmount();
    })
}

function addRowInvestmentContractAccounttermCommission() {
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
    
    var table = document.getElementById('investmentContractAccounttermCommission');
    var tbody = table.querySelector('tbody') || table;
    var count = tbody.getElementsByTagName('tr').length + 1;
    column1.innerText = count.toLocaleString();
    
    var select = document.createElement("select"); //费用项
    select.setAttribute("class","select2 commissionFeeItemDropDown new");
    select.setAttribute("className","select2 commissionFeeItemDropDown new");
    //new Option(text, value, defaultSelected, selected);
    //select.options[0] = new Option('提成扣率[D011]','');
    select.setAttribute("id","commissionItem_"+count.toLocaleString());
    column2.appendChild(select);
    
    var div = document.createElement("div"); //期限
    div.setAttribute("class","input-daterange input-group");
    div.setAttribute("className","input-daterange input-group");
    var input = document.createElement("input");
    input.setAttribute("class","form-control");
    input.setAttribute("className","form-control");
    input.setAttribute("id","commissionStartDate_"+count.toLocaleString());
    input.setAttribute("type","text");
    input.setAttribute("style","min-width: 80px");
    input.setAttribute("readonly","");
    div.appendChild(input);
    var icon = document.createElement("i");
    icon.setAttribute("class", "fa fa-calendar");
    icon.setAttribute("className", "fa fa-calendar");
    var span = document.createElement("span");
    span.setAttribute("class", "input-group-addon");
    span.setAttribute("className", "input-group-addon");
    span.appendChild(icon);
    div.appendChild(span);
    var to = document.createElement("span");
    to.innerText = "-";
    to.setAttribute("class", "input-group-addon");
    to.setAttribute("className", "input-group-addon");
    div.appendChild(to);
    var div2 = document.createElement("div");
    div2.setAttribute("class","input-group");
    div2.setAttribute("className","input-group");
    var input2 = document.createElement("input");
    input2.setAttribute("class","form-control");
    input2.setAttribute("className","form-control");
    input2.setAttribute("id","commissionEndDate_"+count.toLocaleString());
    input2.setAttribute("type","text");
    input2.setAttribute("style","min-width: 80px");
    input2.setAttribute("readonly","");
    div2.appendChild(input2);
    var icon2 = document.createElement("i");
    icon2.setAttribute("class", "fa fa-calendar");
    icon2.setAttribute("className", "fa fa-calendar");
    var span2 = document.createElement("span");
    span2.setAttribute("class", "input-group-addon");
    span2.setAttribute("className", "input-group-addon");
    span2.appendChild(icon2);
    div2.appendChild(span2);
    div.appendChild(div2);
    column3.appendChild(div);
    
    var select = document.createElement("select"); //扣率类型
    select.setAttribute("class","select2 commissionDeductTypeDropDown new");
    select.setAttribute("className","select2 commissionDeductTypeDropDown new");
    select.setAttribute("id","commissionDeductType_"+count.toLocaleString());
    column4.appendChild(select);
    
    var select = document.createElement("select"); //商品分类
    select.setAttribute("class","select2 commissionCategoryDropDown new");
    select.setAttribute("className","select2 commissionCategoryDropDown new");
    select.setAttribute("id","commissionCategory_"+count.toLocaleString());
    column5.appendChild(select);
    
    var div = document.createElement("div"); //含税扣率
    div.setAttribute("class","input-group");
    div.setAttribute("className","input-group");
    var input = document.createElement("input");
    input.setAttribute("class","form-control money");
    input.setAttribute("className","form-control money");
    input.setAttribute("id","commissionDeduct_"+count.toLocaleString());
    input.setAttribute("type","text");
    input.setAttribute("value","0");
    div.appendChild(input);
    var percent = document.createElement("span");
    percent.innerText = "%";
    percent.setAttribute("class", "input-group-addon");
    percent.setAttribute("className", "input-group-addon");
    div.appendChild(percent);
    column6.appendChild(div);
    
    var div = document.createElement("div"); //去税扣率
    div.setAttribute("class","input-group");
    div.setAttribute("className","input-group");
    var input = document.createElement("input");
    input.setAttribute("class","form-control money");
    input.setAttribute("className","form-control money");
    input.setAttribute("id","commissionTaxDeduct_"+count.toLocaleString());
    input.setAttribute("type","text");
    input.setAttribute("readonly","");
    input.setAttribute("style","border: none");
    input.setAttribute("value","0");
    div.appendChild(input);
    var percent = document.createElement("span");
    percent.innerText = "%";
    percent.setAttribute("class", "input-group-addon");
    percent.setAttribute("className", "input-group-addon");
    div.appendChild(percent);
    column7.appendChild(div);
    
    var div = document.createElement("div"); //起始金额
    div.setAttribute("class","input-group");
    div.setAttribute("className","input-group");
    var input = document.createElement("input");
    input.setAttribute("class","form-control money");
    input.setAttribute("className","form-control money");
    input.setAttribute("id","commissionAmount_"+count.toLocaleString());
    input.setAttribute("type","text");
    input.setAttribute("value","0");
    div.appendChild(input);
    var percent = document.createElement("span");
    percent.innerText = "元/月";
    percent.setAttribute("class", "input-group-addon");
    percent.setAttribute("className", "input-group-addon");
    div.appendChild(percent);
    column8.appendChild(div);
    
    var div = document.createElement("div"); //最低销售额
    div.setAttribute("class","input-group");
    div.setAttribute("className","input-group");
    var input = document.createElement("input");
    input.setAttribute("class","form-control money");
    input.setAttribute("className","form-control money");
    input.setAttribute("id","commissionMinSales_"+count.toLocaleString());
    input.setAttribute("type","text");
    div.appendChild(input);
    var percent = document.createElement("span");
    percent.innerText = "元/月";
    percent.setAttribute("class", "input-group-addon");
    percent.setAttribute("className", "input-group-addon");
    div.appendChild(percent);
    column9.appendChild(div);
    
    var select = document.createElement("select"); //税率
    select.setAttribute("class","select2 taxVat newVAT commissionVATDropDown newFee");
    select.setAttribute("className","select2 taxVat newVAT commissionVATDropDown newFee");
    select.setAttribute("id","commissionTaxRate_"+count.toLocaleString());
    column10.appendChild(select);
    
    var checkbox = document.createElement("input"); //是否开发票
    checkbox.setAttribute("id","commissionInvoiceFlag_"+count.toLocaleString());
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("checked", "");
    column11.appendChild(checkbox);
    
    var remove = document.createElement("a");
    remove.setAttribute("href", "javascript:void(0);");
    remove.setAttribute("onClick", "deleteRow(this)");
    var icon = document.createElement("i");
    icon.setAttribute("class", "fa fa-minus-circle");
    icon.setAttribute("className", "fa fa-minus-circle");
    icon.setAttribute("style", "color: #ED4A52; font-size: 16px;");
    remove.appendChild(icon);
    column12.appendChild(remove);
    
    /*var datebox = document.createElement("input");
    datebox.setAttribute("type", "date");
    //datebox.setAttribute("id", "mydate"); //don't reuse id's
    dateColumn.appendChild(datebox);*/

    tbody.appendChild(newrow);
    updateTaxVAT();
    updateCommissionDropDown('commissionCategoryDropDown','PRODUCT_CATEGORY'); // 商品分类
    updateCommissionDropDown('commissionDeductTypeDropDown','DEDUCT_TYPE'); // 全额/差额
    updateFeeItems('commissionFeeItemDropDown','commissionVATDropDown','deductRent');
    
    var tmp = $('#commissionEndDate_'+(parseInt(count)-1).toLocaleString()).val();
    $('#investmentContractAccounttermCommission .input-daterange').datepicker({
        'language': 'zh-CN',
        'format': 'yyyy-mm-dd',
        'todayBtn': "linked",
        'todayHighlight': true,
        'startDate': IncrDate(tmp),
        'endDate': $('#endDate').val(),
        'autoclose': true
    });
    
    $('#investmentContractAccounttermCommission .select2').select2();
    calBackPushCommissionDeduct();
    calBackPushNextCalendar('commission');
    
    $('input.money').on('blur',function(){
        $(this).val(accounting.formatNumber($(this).val()));
    });
    
    $("input[id*='commissionEndDate_']").on('changeDate',function(){
        calBackPushNextCalendar('commission');
    });
    
    $("input[id*='commissionDeduct_']").on('blur',function(){
        calBackPushCommissionDeduct();
    })
}

function addRowInvestmentContractAccounttermPropertyMgmt() {
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
    select.setAttribute("className","select2 propertyMgmtFeeItemDropDown new");
    select.setAttribute("id","propertyMgmtItem_"+count.toLocaleString());
    column2.appendChild(select);
    
    var div = document.createElement("div"); //期限
    div.setAttribute("class","input-daterange input-group");
    div.setAttribute("className","input-daterange input-group");
    var input = document.createElement("input");
    input.setAttribute("class","form-control");
    input.setAttribute("className","form-control");
    input.setAttribute("id","propertyMgmtStartDate_"+count.toLocaleString());
    input.setAttribute("type","text");
    input.setAttribute("style","min-width: 80px");
    input.setAttribute("readonly","");
    div.appendChild(input);
    var icon = document.createElement("i");
    icon.setAttribute("class", "fa fa-calendar");
    icon.setAttribute("className", "fa fa-calendar");
    var span = document.createElement("span");
    span.setAttribute("class", "input-group-addon");
    span.setAttribute("className", "input-group-addon");
    span.appendChild(icon);
    div.appendChild(span);
    var to = document.createElement("span");
    to.innerText = "-";
    to.setAttribute("class", "input-group-addon");
    to.setAttribute("className", "input-group-addon");
    div.appendChild(to);
    var div2 = document.createElement("div");
    div2.setAttribute("class","input-group");
    div2.setAttribute("className","input-group");
    var input2 = document.createElement("input");
    input2.setAttribute("class","form-control");
    input2.setAttribute("className","form-control");
    input2.setAttribute("id","propertyMgmtEndDate_"+count.toLocaleString());
    input2.setAttribute("type","text");
    input2.setAttribute("style","min-width: 80px");
    input2.setAttribute("readonly","");
    div2.appendChild(input2);
    var icon2 = document.createElement("i");
    icon2.setAttribute("class", "fa fa-calendar");
    icon2.setAttribute("className", "fa fa-calendar");
    var span2 = document.createElement("span");
    span2.setAttribute("class", "input-group-addon");
    span2.setAttribute("className", "input-group-addon");
    span2.appendChild(icon2);
    div2.appendChild(span2);
    div.appendChild(div2);
    column3.appendChild(div);
    
    var div = document.createElement("div"); //含税金额
    div.setAttribute("class","input-group");
    div.setAttribute("className","input-group");
    var input = document.createElement("input");
    input.setAttribute("class","form-control money");
    input.setAttribute("className","form-control money");
    input.setAttribute("id","propertyMgmtAmount_"+count.toLocaleString());
    input.setAttribute("type","text");
    div.appendChild(input);
    var percent = document.createElement("span");
    percent.innerText = "元";
    percent.setAttribute("class", "input-group-addon");
    percent.setAttribute("className", "input-group-addon");
    div.appendChild(percent);
    column4.appendChild(div);
    
    var div = document.createElement("div"); //去税金额
    div.setAttribute("class","input-group");
    div.setAttribute("className","input-group");
    var input = document.createElement("input");
    input.setAttribute("class","form-control money");
    input.setAttribute("className","form-control money");
    input.setAttribute("id","propertyMgmtTaxAmount_"+count.toLocaleString());
    input.setAttribute("type","text");
    div.appendChild(input);
    var percent = document.createElement("span");
    percent.innerText = "元";
    percent.setAttribute("class", "input-group-addon");
    percent.setAttribute("className", "input-group-addon");
    div.appendChild(percent);
    column5.appendChild(div);
    
    var div = document.createElement("div"); //含税单价
    div.setAttribute("class","input-group");
    div.setAttribute("className","input-group");
    var input = document.createElement("input");
    input.setAttribute("class","form-control money");
    input.setAttribute("className","form-control money");
    input.setAttribute("id","propertyMgmtRentAmount_"+count.toLocaleString());
    input.setAttribute("type","text");
    input.setAttribute("readonly","");
    input.setAttribute("style","border: none");
    div.appendChild(input);
    var percent = document.createElement("span");
    percent.innerText = "元";
    percent.setAttribute("class", "input-group-addon");
    percent.setAttribute("className", "input-group-addon");
    div.appendChild(percent);
    column6.appendChild(div);
    
    var div = document.createElement("div"); //去税单价
    div.setAttribute("class","input-group");
    div.setAttribute("className","input-group");
    var input = document.createElement("input");
    input.setAttribute("class","form-control money");
    input.setAttribute("className","form-control money");
    input.setAttribute("id","propertyMgmtTaxRentAmount_"+count.toLocaleString());
    input.setAttribute("type","text");
    input.setAttribute("readonly","");
    input.setAttribute("style","border: none");
    div.appendChild(input);
    var percent = document.createElement("span");
    percent.innerText = "元";
    percent.setAttribute("class", "input-group-addon");
    percent.setAttribute("className", "input-group-addon");
    div.appendChild(percent);
    column7.appendChild(div);
    
    var select = document.createElement("select"); //税率
    select.setAttribute("class","select2 taxVat newVAT propertyMgmtVATDropDown newFee");
    select.setAttribute("className","select2 taxVat newVAT propertyMgmtVATDropDown newFee");
    select.setAttribute("id","propertyMgmtTaxRate_"+count.toLocaleString());
    column8.appendChild(select);
    
    var checkbox = document.createElement("input"); //是否开发票
    checkbox.setAttribute("id","propertyMgmtInvoiceFlag_"+count.toLocaleString());
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("checked", "");
    column9.appendChild(checkbox);
    
    var remove = document.createElement("a");
    remove.setAttribute("href", "javascript:void(0);");
    remove.setAttribute("onClick", "deleteRow(this)");
    var icon = document.createElement("i");
    icon.setAttribute("class", "fa fa-minus-circle");
    icon.setAttribute("className", "fa fa-minus-circle");
    icon.setAttribute("style", "color: #ED4A52; font-size: 16px;");
    remove.appendChild(icon);
    column10.appendChild(remove);

    tbody.appendChild(newrow);
    updateTaxVAT();
    updateFeeItems('propertyMgmtFeeItemDropDown','propertyMgmtVATDropDown','property');
    var tmp = $('#propertyMgmtEndDate_'+(parseInt(count)-1).toLocaleString()).val();
    $('#investmentContractAccounttermPropertyMgmt .input-daterange').datepicker({
        'language': 'zh-CN',
        'format': 'yyyy-mm-dd',
        'todayBtn': "linked",
        'startDate': IncrDate(tmp),
        'endDate': $('#endDate').val(),
        'autoclose': true
    });
    $('#investmentContractAccounttermPropertyMgmt .select2').select2();
    calBackPushPropertyMgmtAmount();
    calBackPushPropertyMgmtTaxAmount();
    calBackPushNextCalendar('propertyMgmt');
    
    $('input.money').on('blur',function(){
        $(this).val(accounting.formatNumber($(this).val()));
    });
    
    $("input[id*='propertyMgmtEndDate_']").on('changeDate',function(){
        calBackPushNextCalendar('propertyMgmt');
    })
    
    $("input[id*='propertyMgmtAmount_']").on('blur',function(){
        calBackPushPropertyMgmtAmount();
    })
    
    $("input[id*='propertyMgmtTaxAmount_']").on('blur',function(){
        calBackPushPropertyMgmtTaxAmount();
    })
}

function addRowInvestmentContractAccounttermPromotion() {
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
    
    var table = document.getElementById('investmentContractAccounttermPromotion');
    var tbody = table.querySelector('tbody') || table;
    var count = tbody.getElementsByTagName('tr').length + 1;
    column1.innerText = count.toLocaleString();
    
    var select = document.createElement("select"); //费用项
    select.setAttribute("class","select2 promotionFeeItemDropDown new");
    select.setAttribute("className","select2 promotionFeeItemDropDown new");
    select.setAttribute("id","promotionItem_"+count.toLocaleString());
    column2.appendChild(select);
    
    var div = document.createElement("div"); //期限
    div.setAttribute("class","input-daterange input-group");
    div.setAttribute("className","input-daterange input-group");
    var input = document.createElement("input");
    input.setAttribute("class","form-control");
    input.setAttribute("className","form-control");
    input.setAttribute("id","promotionStartDate_"+count.toLocaleString());
    input.setAttribute("type","text");
    input.setAttribute("style","min-width: 80px");
    input.setAttribute("readonly","");
    div.appendChild(input);
    var icon = document.createElement("i");
    icon.setAttribute("class", "fa fa-calendar");
    icon.setAttribute("className", "fa fa-calendar");
    var span = document.createElement("span");
    span.setAttribute("class", "input-group-addon");
    span.setAttribute("className", "input-group-addon");
    span.appendChild(icon);
    div.appendChild(span);
    var to = document.createElement("span");
    to.innerText = "-";
    to.setAttribute("class", "input-group-addon");
    to.setAttribute("className", "input-group-addon");
    div.appendChild(to);
    var div2 = document.createElement("div");
    div2.setAttribute("class","input-group");
    div2.setAttribute("className","input-group");
    var input2 = document.createElement("input");
    input2.setAttribute("class","form-control");
    input2.setAttribute("className","form-control");
    input2.setAttribute("id","promotionEndDate_"+count.toLocaleString());
    input2.setAttribute("type","text");
    input2.setAttribute("style","min-width: 80px");
    input2.setAttribute("readonly","");
    div2.appendChild(input2);
    var icon2 = document.createElement("i");
    icon2.setAttribute("class", "fa fa-calendar");
    icon2.setAttribute("className", "fa fa-calendar");
    var span2 = document.createElement("span");
    span2.setAttribute("class", "input-group-addon");
    span2.setAttribute("className", "input-group-addon");
    span2.appendChild(icon2);
    div2.appendChild(span2);
    div.appendChild(div2);
    column3.appendChild(div);
    
    var div = document.createElement("div"); //含税金额
    div.setAttribute("class","input-group");
    div.setAttribute("className","input-group");
    var input = document.createElement("input");
    input.setAttribute("class","form-control money");
    input.setAttribute("className","form-control money");
    input.setAttribute("id","promotionAmount_"+count.toLocaleString());
    input.setAttribute("type","text");
    div.appendChild(input);
    var percent = document.createElement("span");
    percent.innerText = "元";
    percent.setAttribute("class", "input-group-addon");
    percent.setAttribute("className", "input-group-addon");
    div.appendChild(percent);
    column4.appendChild(div);
    
    var div = document.createElement("div"); //去税金额
    div.setAttribute("class","input-group");
    div.setAttribute("className","input-group");
    var input = document.createElement("input");
    input.setAttribute("class","form-control money");
    input.setAttribute("className","form-control money");
    input.setAttribute("id","promotionTaxAmount_"+count.toLocaleString());
    input.setAttribute("type","text");
    input.setAttribute("readonly","");
    input.setAttribute("style","border: none");
    div.appendChild(input);
    var percent = document.createElement("span");
    percent.innerText = "元";
    percent.setAttribute("class", "input-group-addon");
    percent.setAttribute("className", "input-group-addon");
    div.appendChild(percent);
    column5.appendChild(div);
    
    var div = document.createElement("div"); //含税扣率
    div.setAttribute("class","input-group");
    div.setAttribute("className","input-group");
    var input = document.createElement("input");
    input.setAttribute("class","form-control money");
    input.setAttribute("className","form-control money");
    input.setAttribute("id","promotionDeduct_"+count.toLocaleString());
    input.setAttribute("type","text");
    input.setAttribute("value","0");
    div.appendChild(input);
    var percent = document.createElement("span");
    percent.innerText = "%";
    percent.setAttribute("class", "input-group-addon");
    percent.setAttribute("className", "input-group-addon");
    div.appendChild(percent);
    column6.appendChild(div);
    
    var div = document.createElement("div"); //去税扣率
    div.setAttribute("class","input-group");
    div.setAttribute("className","input-group");
    var input = document.createElement("input");
    input.setAttribute("class","form-control money");
    input.setAttribute("className","form-control money");
    input.setAttribute("id","promotionTaxDeduct_"+count.toLocaleString());
    input.setAttribute("type","text");
    input.setAttribute("readonly","");
    input.setAttribute("style","border: none");
    input.setAttribute("value","0");
    div.appendChild(input);
    var percent = document.createElement("span");
    percent.innerText = "%";
    percent.setAttribute("class", "input-group-addon");
    percent.setAttribute("className", "input-group-addon");
    div.appendChild(percent);
    column7.appendChild(div);
    
    var select = document.createElement("select"); //税率
    select.setAttribute("class","select2 taxVat newVAT promotionVATDropDown newFee");
    select.setAttribute("className","select2 taxVat newVAT promotionVATDropDown newFee");
    select.setAttribute("id","promotionTaxRate_"+count.toLocaleString());
    column8.appendChild(select);
    
    var checkbox = document.createElement("input"); //是否开发票
    checkbox.setAttribute("id","promotionInvoiceFlag_"+count.toLocaleString());
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("checked", "");
    column9.appendChild(checkbox);
    
    var remove = document.createElement("a");
    remove.setAttribute("href", "javascript:void(0);");
    remove.setAttribute("onClick", "deleteRow(this)");
    var icon = document.createElement("i");
    icon.setAttribute("class", "fa fa-minus-circle");
    icon.setAttribute("className", "fa fa-minus-circle");
    icon.setAttribute("style", "color: #ED4A52; font-size: 16px;");
    remove.appendChild(icon);
    column10.appendChild(remove);

    tbody.appendChild(newrow);
    updateTaxVAT();
    updateFeeItems('promotionFeeItemDropDown','promotionVATDropDown','promitionFee');
    var tmp = $('#promotionEndDate_'+(parseInt(count)-1).toLocaleString()).val();
    $('#investmentContractAccounttermPromotion .input-daterange').datepicker({
        'language': 'zh-CN',
        'format': 'yyyy-mm-dd',
        'todayBtn': "linked",
        'todayHighlight': true,
        'startDate': IncrDate(tmp),
        'endDate': $('#endDate').val(),
        'autoclose': true
    });
    $('#investmentContractAccounttermPromotion .select2').select2();
    calBackPushPromotionAmount();
    calBackPushPromotionDeduct();
    calBackPushNextCalendar('promotion');
    
    $('input.money').on('blur',function(){
        $(this).val(accounting.formatNumber($(this).val()));
    });
    
    $("input[id*='fixedRentEndDate_']").on('changeDate',function(){
        calBackPushNextCalendar('promotion');
    })
    
    $("input[id*='promotionAmount_']").on('blur',function(){
        calBackPushPromotionAmount();
    })
    
    $("input[id*='promotionDeduct_']").on('blur',function(){
        calBackPushPromotionDeduct();
    })
}

function addRowInvestmentContractDepositterm() {
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
    select.setAttribute("className","select2");
    select.setAttribute("id","deposittermItem_"+count.toLocaleString());
    select.options[0] = new Option('租赁保证金[E02]','E02');
    select.options[1] = new Option('装修保证金[E03]','E03');
    column2.appendChild(select);
    
    column3.innerText = '收';
    
    var div = document.createElement("div"); //含税金额
    div.setAttribute("class","input-group");
    div.setAttribute("className","input-group");
    var input = document.createElement("input");
    input.setAttribute("class","form-control money");
    input.setAttribute("className","form-control money");
    input.setAttribute("id","deposittermAmount_"+count.toLocaleString());
    input.setAttribute("type","text");
    input.setAttribute("value","0");
    div.appendChild(input);
    var percent = document.createElement("span");
    percent.innerText = "元";
    percent.setAttribute("class", "input-group-addon");
    percent.setAttribute("className", "input-group-addon");
    div.appendChild(percent);
    column4.appendChild(div);
    
    var div = document.createElement("div"); //税率
    div.setAttribute("class","input-group");
    div.setAttribute("className","input-group");
    var input = document.createElement("input");
    input.setAttribute("class","form-control");
    input.setAttribute("className","form-control");
    input.setAttribute("id","deposittermTaxRate_"+count.toLocaleString());
    input.setAttribute("type","text");
    input.setAttribute("readonly","");
    input.setAttribute("style","border: none");
    input.setAttribute("value","0");
    div.appendChild(input);
    var percent = document.createElement("span");
    percent.innerText = "%";
    percent.setAttribute("class", "input-group-addon");
    percent.setAttribute("className", "input-group-addon");
    div.appendChild(percent);
    column5.appendChild(div);
    
    var remove = document.createElement("a");
    remove.setAttribute("href", "javascript:void(0);");
    remove.setAttribute("onClick", "deleteRow(this)");
    var icon = document.createElement("i");
    icon.setAttribute("class", "fa fa-minus-circle");
    icon.setAttribute("className", "fa fa-minus-circle");
    icon.setAttribute("style", "color: #ED4A52; font-size: 16px;");
    remove.appendChild(icon);
    column6.appendChild(remove);

    tbody.appendChild(newrow);
    $('#investmentContractDepositterm .select2').select2();
    
    $('input.money').on('blur',function(){
        $(this).val(accounting.formatNumber($(this).val()));
    });
}

function deleteRow(button) {
    var row = button.parentNode.parentNode;
    var tbody = row.parentNode;
    tbody.removeChild(row);

    // refactoring numbering
    var rows = tbody.getElementsByTagName("tr");
    for (var i = 0; i < rows.length; i++) {
        var currentRow = rows[i];
        currentRow.childNodes[0].innerText = (i+1).toLocaleString();
        //var td = currentRow.cells;
        var id = tbody.getAttribute("id");
        var td = $("#"+id+" tr:eq(" + i + ") td");
        td.find("input, select").each(function(){
            $(this).attr('id',$(this).attr('id').split('_')[0]+'_'+(i+1).toLocaleString());
        });
    }
}

function updateFeeItems(FeeItem,VAT,type) {
    var feeItems  = JSON.parse(sessionStorage.getItem("feeItems"));
    if(feeItems.length > 0){
        $.each(feeItems, function(i,v) {
            if(v.itemType == type){
                $('.'+FeeItem+'.new').append('<option value="'+v.itemCode+'">'+v.itemName+'['+v.itemCode+']</option>');
                if($.cookie('mallSelected').split(':::')[1] == 'SC126' || $.cookie('mallSelected').split(':::')[1] == 'SC127'){
                    $('.'+VAT+'.newFee').val('0.05').trigger('change');
                } else {
                    $('.'+VAT+'.newFee').val(v.taxRate).trigger('change');
                }
            }
        })
        $('.'+FeeItem+'.new').removeClass('new');
        $("."+VAT+".newFee").removeClass('newFee');
    }
}

function updateTaxVAT() {
    var taxVAT  = JSON.parse(sessionStorage.getItem("taxVAT"));
    if(taxVAT.length > 0){
        $.each(taxVAT, function(i,v) {
            $('.taxVat.newVAT').append('<option value="'+v.taxRate+'" data-code="'+v.taxCode+'">增值税'+parseInt(v.taxRate*100)+'%</option>');
        })
        $('.taxVat.newVAT').removeClass('newVAT');
    }
}

function updateCommissionDropDown(clas,dictTypeCode) {
    var dictType  = JSON.parse(sessionStorage.getItem(dictTypeCode));
    if(dictType.length > 0){
        $.each(dictType, function(i,v) {
            $('.'+clas+'.new').append('<option value="'+v.dictCode+'">'+v.dictName+'</option>');
        })
        $('.'+clas+'.new').removeClass('new');
    }
}

/*function updateCommissinDropDown(dictTypeCode, id, dataTxt, dataVal) {
    $('#'+id).select2({
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
            url: $.api.baseAdmin+"/api/dict/findAllByDictTypeCode/"+dictTypeCode,
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
                    search: params.term
                }
            },
            processResults: function (data,params) {
                if(data['code'] === 'C0') {
                    var jsonData = data['data'].dictDataList;
                    var data;
                    return {
                        results: $.map(jsonData, function(item) {
                            var index = $.inArray($.api.dictContractType,item.dictInfo.split(',').map(Number));
                            if(index >= 0){
                                data = {
                                    id: item.dictCode,
                                    text: item.dictName
                                }
                                var returnData = [];
                                returnData.push(data);
                                return returnData;
                            }
                        })
                    }
                } else {
                    alertMsg(data['code'],data['customerMessage']);
                }
            },
            cache: true
        }
    })
}*/

function updateDictDropDownByDictTypeCode(dictTypeCode, id, dataTxt, dataVal) {
    $('#'+id).select2({
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
            url: $.api.baseAdmin+"/api/dict/findAllByDictTypeCode/"+dictTypeCode,
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
                    search: params.term
                }
            },
            processResults: function (data,params) {
                if(data['code'] === 'C0') {
                    var jsonData = data['data'].dictDataList;
                    var data;
                    return {
                        results: $.map(jsonData, function(item) {
                            var index = $.inArray($.api.dictContractType,item.dictInfo.split(',').map(Number));
                            if(index >= 0){
                                data = {
                                    id: item.dictCode,
                                    text: item.dictName
                                }
                                var returnData = [];
                                returnData.push(data);
                                return returnData;
                            }
                        })
                    }
                } else {
                    alertMsg(data['code'],data['customerMessage']);
                }
            },
            cache: true
        }
    })

    var newOption = new Option(dataTxt, dataVal, true, true);
    $('#'+id).append(newOption).trigger('change');
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
                var mallCodes = $.cookie('mallSelected').split(':::')[1];
                var mallCode = mallCodes;
                $.each(JSON.parse($.cookie('userModules')), function(i,v) {
                    if(v.code == 'CROLE211008000002' && v.moduleCode == 'ALL'){
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

function updateSelectTenantDropDown(data_count) {
    $('#selectTenant').select2({
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
            url: $.api.baseLotus+"/api/tenant/lotus/findAll",
            type: 'GET',
            dataType: 'json',
            delay: 25,
            data: function (params) {
                return {
                    page: params.page || 0,
                    size: data_count,
                    sort: 'id,desc',
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
                                id: item.tenantCode,
                                text: item.tenantCode +' | '+ item.name
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
        
function updateUserRoleYZJDropDownByRoleId(id) {
    $('#'+id).find('select').select2({
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

function findMainSigningBody(name) {
    $.ajax({
        url: $.api.baseLotus+"/api/mall/lotus/findAllByName?mallName="+name,
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
                
                if(response.data.length > 0){
                    $('#mainSigningBody').val(response.data[0].mallLotusBaseList[0].name);
                }
            }                             
        }
    }); 
}

function mandatoryCheck() {
    $('.mandatory-error').remove();
    var flag = 1;
    var error = '<i class="fa fa-exclamation-circle mandatory-error" aria-hidden="true"></i>';
    
    if($('#startDate').val() == '' || $('#endDate').val() == '') {
        flag = 0;
        $('#startDate').parent().append(error);
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
        saveContractForm();
    }
}

function calBackPushFixedRentAmount() {
    $("input[id*='fixedRentAmount_']").each(function(i){  
        if(numberWithoutCommas($(this).val()) >= 0 && numberWithoutCommas($('#area').val()) > 0){
            var num = $(this).attr('id').split('_')[1];
            var taxAmount = Math.round(numberWithoutCommas($(this).val()) / (1 + parseFloat($('#fixedRentTaxRate_'+num).val())) * 100) / 100;
            $('#fixedRentTaxAmount_'+num).val(accounting.formatNumber(taxAmount));
            var rentAmount = Math.round(numberWithoutCommas($(this).val()) * 12 / 365 / $('#area').val() * 100) / 100;
            $('#fixedRentRentAmount_'+num).val(accounting.formatNumber(rentAmount));
            var taxRentAmount = Math.round(numberWithoutCommas($(this).val()) * 12 / 365 / $('#area').val() / (1 + parseFloat($('#fixedRentTaxRate_'+num).val())) * 100) / 100;
            $('#fixedRentTaxRentAmount_'+num).val(accounting.formatNumber(taxRentAmount));
        }
    });
    calBackPush('fixedRent');
}

function calBackPushFixedRentTaxAmount() {
    $("input[id*='fixedRentTaxAmount_']").each(function(i){  
        if(numberWithoutCommas($(this).val()) >= 0 && numberWithoutCommas($('#area').val()) > 0){
            var num = $(this).attr('id').split('_')[1];
            var taxRentAmount = Math.round(numberWithoutCommas($(this).val()) * 12 / 365 / $('#area').val() * 100) / 100;
            $('#fixedRentTaxRentAmount_'+num).val(accounting.formatNumber(taxRentAmount));
        }
    });
    calBackPush('fixedRent');
}

function calBackPushNextCalendar(Exid){
    $("input[id*='"+Exid+"EndDate_']").each(function(i){  
        var num = $(this).attr('id').split('_')[1];
        for(var i=1;i<30;i++){
            num = parseInt(num) + 1;
            if($('#'+Exid+'StartDate_'+num).length > 0){
                var tmp = $(this).val();
                $('#'+Exid+'StartDate_'+num).datepicker('setStartDate', IncrDate(tmp)).val(IncrDate(tmp));
                $('#'+Exid+'EndDate_'+num).datepicker('setStartDate', IncrDate(tmp)).val($('#endDate').val());
            } else {
                return false;
            }
        }
    })
}

function calBackPushCommissionDeduct(){
    $("input[id*='commissionDeduct_']").each(function(i){  
        if(numberWithoutCommas($(this).val()) >= 0){
            var num = $(this).attr('id').split('_')[1];
            var deduct = Math.round(numberWithoutCommas($(this).val()) / (1 + parseFloat($('#commissionTaxRate_'+num).val())) * 100) / 100;
            $('#commissionTaxDeduct_'+num).val(accounting.formatNumber(deduct));
        }
    });
}

function calBackPushPropertyMgmtAmount() {
    $("input[id*='propertyMgmtAmount_']").each(function(i){  
        if(numberWithoutCommas($(this).val()) >= 0 && numberWithoutCommas($('#area').val()) > 0){
            var num = $(this).attr('id').split('_')[1];
            var taxAmount = Math.round(numberWithoutCommas($(this).val()) / (1 + parseFloat($('#propertyMgmtTaxRate_'+num).val())) * 100) / 100;
            $('#propertyMgmtTaxAmount_'+num).val(accounting.formatNumber(taxAmount));
            var rentAmount = Math.round(numberWithoutCommas($(this).val()) * 12 / 365 / $('#area').val() * 100) / 100;
            $('#propertyMgmtRentAmount_'+num).val(accounting.formatNumber(rentAmount));
            var taxRentAmount = Math.round(numberWithoutCommas($(this).val()) * 12 / 365 / $('#area').val() / (1 + parseFloat($('#propertyMgmtTaxRate_'+num).val())) * 100) / 100;
            $('#propertyMgmtTaxRentAmount_'+num).val(accounting.formatNumber(taxRentAmount));
        }
    });
    
    calBackPush('propertyMgmt');
}

function calBackPushPropertyMgmtTaxAmount(){
    $("input[id*='propertyMgmtTaxAmount_']").each(function(i){  
        if(numberWithoutCommas($(this).val()) >= 0 && numberWithoutCommas($('#area').val()) > 0){
            var num = $(this).attr('id').split('_')[1];
            var taxRentAmount = Math.round(numberWithoutCommas($(this).val()) * 12 / 365 / $('#area').val() * 100) / 100;
            $('#propertyMgmtTaxRentAmount_'+num).val(accounting.formatNumber(taxRentAmount));
        }
    });
    
    calBackPush('propertyMgmt');
}

function calBackPushPromotionAmount() {
    $("input[id*='promotionAmount_']").each(function(i){  
        if(numberWithoutCommas($(this).val()) >= 0){
            var num = $(this).attr('id').split('_')[1];
            var taxAmount = Math.round(numberWithoutCommas($(this).val()) / (1 + parseFloat($('#promotionTaxRate_'+num).val())) * 100) / 100;
            $('#promotionTaxAmount_'+num).val(accounting.formatNumber(taxAmount));
        }
    });
}

function calBackPushPromotionDeduct(){
    $("input[id*='promotionDeduct_']").each(function(i){  
        if(numberWithoutCommas($(this).val()) >= 0){
            var num = $(this).attr('id').split('_')[1];
            var deduct = Math.round(numberWithoutCommas($(this).val()) / (1 + parseFloat($('#promotionTaxRate_'+num).val())) * 100) / 100;
            $('#promotionTaxDeduct_'+num).val(accounting.formatNumber(deduct));
        }
    });
}

function calBackPush(prefix){
    var path;
    switch (prefix) {
        case "fixedRent":
            path = 'fixedRentCalc';
            break;
        case "propertyMgmt":
            path = 'propertyFeeCalc';
            break;
        default:
            break;
    }
    var fixedRent = {};
    var fixedRentList = [];
    var propertyFee = {};
    var propertyFeeList = [];
    $("#"+prefix).find("tr").each(function(){
        var tdArr = $(this).children();
        var amount = tdArr.eq(3).find('input').val();
        var startDate = tdArr.eq(2).find("input[id*='"+prefix+"StartDate_']").val();
        var endDate = tdArr.eq(2).find("input[id*='"+prefix+"EndDate_']").val();
        var itemCode = tdArr.eq(1).find('select').val();
        var rentAmount = tdArr.eq(5).find('input').val();
        var taxAmount = tdArr.eq(4).find('input').val();
        var taxCode = tdArr.eq(7).find('select option:selected').attr('data-code');
        var taxRate = tdArr.eq(7).find('select').val();
        var taxRentAmount = tdArr.eq(6).find('input').val();
        
        if(path == 'fixedRentCalc'){
            if(amount != '' && startDate != '' && endDate != '' && itemCode != '' && rentAmount != '' && taxAmount != '' && taxCode != '' && taxRate != '' && taxRentAmount != ''){
                fixedRent = {
                    "amount": numberWithoutCommas(tdArr.eq(3).find('input').val()),
                    "startDate": tdArr.eq(2).find("input[id*='"+prefix+"StartDate_']").val(),
                    "endDate":  tdArr.eq(2).find("input[id*='"+prefix+"EndDate_']").val(),
                    "itemCode": tdArr.eq(1).find('select').val(),
                    "rentAmount": numberWithoutCommas(tdArr.eq(5).find('input').val()),
                    "taxAmount": numberWithoutCommas(tdArr.eq(4).find('input').val()),
                    "taxCode": taxCode,
                    "taxRate": tdArr.eq(7).find('select').val(),
                    "taxRentAmount": numberWithoutCommas(tdArr.eq(6).find('input').val())
                }
                fixedRentList.push(fixedRent);
            }
        } else if(path == 'propertyFeeCalc'){
            if(amount != '' && startDate != '' && endDate != '' && itemCode != '' && rentAmount != '' && taxAmount != '' && taxCode != '' && taxRate != '' && taxRentAmount != ''){
                propertyFee = {
                    "amount": numberWithoutCommas(tdArr.eq(3).find('input').val()),
                    "startDate": tdArr.eq(2).find("input[id*='"+prefix+"StartDate_']").val(),
                    "endDate":  tdArr.eq(2).find("input[id*='"+prefix+"EndDate_']").val(),
                    "itemCode": tdArr.eq(1).find('select').val(),
                    "rentAmount": numberWithoutCommas(tdArr.eq(5).find('input').val()),
                    "taxAmount": numberWithoutCommas(tdArr.eq(4).find('input').val()),
                    "taxCode": taxCode,
                    "taxRate": tdArr.eq(7).find('select').val(),
                    "taxRentAmount": numberWithoutCommas(tdArr.eq(6).find('input').val())
                }
                propertyFeeList.push(propertyFee);
            }
        }
    });
        
    if(fixedRentList.length > 0 || propertyFeeList.length > 0){
        var bizId = $('#bizId').val();
        var area = $('#area').val();
        var unitCode = '';
        var shopCode = '';
        if( $('#selectStore').val() && $('#selectStore').val() != ''){
            unitCode = $('#selectStore').val().split(':::')[0];
            shopCode = $('#selectStore').val().split(':::')[1];
        }
        var startDate = $('#startDate').val();
        var endDate = $('#endDate').val();
        var contractType = $('#contractType').val();
        var selectRentCalculationMode = $('#selectRentCalculationMode').val();
        var map = {};
        if(fixedRentList.length > 0){
            map = {
                "bizId": bizId,
                "startDate": startDate,
                "endDate": endDate,
                "area": area,
                "shopCode": shopCode,
                "formType": "new",
                "rentCalculationMode": selectRentCalculationMode,
                "contractType": contractType,
                "unitCode": unitCode,
                "mallCode": $.cookie('mallSelected').split(':::')[1],
                "fixedRentList": fixedRentList
            };
        } else if(propertyFeeList.length > 0) {
            map = {
                "bizId": bizId,
                "startDate": startDate,
                "endDate": endDate,
                "area": area,
                "shopCode": shopCode,
                "formType": "new",
                "rentCalculationMode": selectRentCalculationMode,
                "contractType": contractType,
                "unitCode": unitCode,
                "mallCode": $.cookie('mallSelected').split(':::')[1],
                "propertyFeeList": propertyFeeList
            };
        }

        $.ajax({
            url: $.api.baseLotus+"/api/rent/calc/"+path,
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
                    
                    if(response.data != null){
                        if(path == 'fixedRentCalc' && response.data.rentCalcList.length > 0){
                            $('#'+prefix+'TotalRentAmount').text(accounting.formatNumber(response.data.totalRentAmount));
                            $('#'+prefix+'TaxTotalRentAmount').text(accounting.formatNumber(response.data.taxTotalRentAmount));
                            sessionStorage.setItem("rentCalcList", JSON.stringify(response.data.rentCalcList));
                        } else if (path == 'propertyFeeCalc' && response.data.propertyCalcList.length > 0){
                            $('#'+prefix+'TotalPropertyAmount').text(accounting.formatNumber(response.data.totalPropertyAmount));
                            $('#'+prefix+'TaxTotalPropertyAmount').text(accounting.formatNumber(response.data.taxTotalPropertyAmount));
                            sessionStorage.setItem("propertyCalcList", JSON.stringify(response.data.propertyCalcList));
                        } 
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
}

function termsModalToggle(calc){
    var sessionTerm;
    switch (calc) {
        case "fixedRent":
            sessionTerm = 'rentCalcList';
            break;
        case "propertyMgmt":
            sessionTerm = 'propertyCalcList';
            break;
        default:
            break;
    }
    $('#accountTerm').html('');
    var terms  = JSON.parse(sessionStorage.getItem(sessionTerm));
    if(terms != null && terms.length > 0){
        $.each(terms, function(i,v) {
            $('#accountTerm').append('<tr>\n\
                <td>'+(i+1)+'</td>\n\
                <td>'+v.startDate+'</td>\n\
                <td>'+v.endDate+'</td>\n\
                <td>'+accounting.formatNumber(v.amount)+'</td>\n\
                <td>'+accounting.formatNumber(v.taxAmount)+'</td></tr>'
            );
        })
    }
    
    $('#investment-contract-accountterm-account').modal('toggle');
}

function saveContractForm() {
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

    var map = {
        "id": ltconform_id, //必填
        "code": ltconform_code, //必填
        "bizId": bizId, //必填
        "formType": "NEW", //必填
        "area": area, //必填
        "shopCode": shopCode, //必填
        "rentCalculationMode": selectRentCalculationMode, //必填
        "endDate": endDate, //必填
        "contractType": contractType, //必填
        "unitCode": unitCode, //必填
        "mallCode": $.cookie('mallSelected').split(':::')[1], //必填
        "startDate": startDate, //必填
        "unitName": unitName //必填
    };

    $.ajax({
        url: $.api.baseLotus+"/api/rent/contract/form/submit",
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
                
                ltconform_id = response.data.id;
                ltconform_code = response.data.code;

                //window.location.href = 'home?s=succeed';
            } else {
                alertMsg(response.code,response.customerMessage);
                //window.location.href = 'create-tenant?s=fail';
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
            //window.location.href = 'create-tenant?s=fail';
        }
    });
}