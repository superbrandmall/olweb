var ltconform_id = '';
var ltconform_code = '';
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
    updateDictDropDownByDictTypeCode('RENT_CALCULATION_MODE','selectRentCalculationMode',$.api.rentCalculationMode[0],$.api.rentCalculationMode[1]); // 计租方式
    updateDictDropDownByDictTypeCode('PROFIT_CENTER','profitCenter',$.api.profitCenter[0],$.api.profitCenter[1]); // 利润中心
    updateDictDropDownByDictTypeCode('POS_MODE','posMode',$.api.posMode[0],$.api.posMode[1]); // 收银方式
    updateDictDropDownByDictTypeCode('CONTRACT_TYPE','contractType',$.api.contractType[0],$.api.contractType[1]); // 合同类型
    updateSelectTenantDropDown(10);
    findCommissionByDictTypeCode('PRODUCT_CATEGORY'); // 商品分类
    findCommissionByDictTypeCode('DEDUCT_TYPE'); // 全额/差额
    
    updateApprovalNameDropDownByRoleId('b58eb43c-aa63-4b0d-84c0-6ddcd9c8d07f');
    findFeeItemByContractType($('#contractType').val()); 
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
            $('#compareFirstFrequency').append('<option value='+compareFirstFrequency[i]+'>'+compareFirstFrequency[i]+'</option>');
        }
        
        $('#compareFirstFrequency').change(function () {
            $('#compareSecondFrequency').children().not(':eq(0)').remove();
            iNum1 = $(this).children('option:selected').index();
            if(iNum1 != 0) {
                if(iNum1 != 3) {
                    $("#compareSecond").prop('disabled',false);
                    var CompareSecondFrequency = compareSecondFrequency[iNum1-1];
                    for(var j=0;j<CompareSecondFrequency.length;j++){
                        $('#compareSecondFrequency').append('<option value='+CompareSecondFrequency[j]+'>'+CompareSecondFrequency[j]+'</option>');
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
    
    findRentCalculationMode('RENT_CALCULATION_MODE');
    findContractByContractNo();
    findContractFixedRentByContractNo();
    findContractCommissionByContractNo();
    findContractPropertyMgmtByContractNo();
    findContractPromotionByContractNo();
    findContractDepositByContractNo();
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

function updateApprovalNameDropDownByRoleId(id) {
    $('#approvalName').find('select').select2({
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

function findContractByContractNo() {
    $.ajax({
        url: $.api.baseLotus+"/api/contract/lotus/findAllByContractNoAndContractVersion?contractNo="+getURLParameter('id')+"&contractVersion=1",
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
                if(response.data != '' && response.data != null){
                    var data = response.data;
                    $.contract.content = data;
                    $('#contractName').text(data.contractName).attr('title',data.contractName);
                    $('#contractVersion').text(data.contractVersion).attr('title',data.contractVersion);
                    findMainSigningBody(data.mallCode);
                    findContractStatus('CONTRACT_STATUS',data.contractStatus);
                    
                    temp = new Option((data.tenantNo +' | '+ data.tenantName), data.tenantNo, true, true);
                    $('#selectTenant').append(temp).trigger('change');
                    $('#contractNo').val(data.contractNo);
                    $('#investmentContractModelMallSelect').val(data.mallName+'['+data.mallCode+']');
                    
                    updateSelectStoreDropDown(10,data.mallCode);
                    temp = new Option((data.unitName +'['+ data.unitCode +'] | '+ data.area + '㎡'), data.unitCode+':::'+data.shopCode+':::'+data.unitName+':::'+data.floorName+':::'+data.floorCode, true, true);
                    $('#selectStore').append(temp).trigger('change');
                    
                    $("#selectStore").change(function(){
                        var selectStoreArea = $('#select2-selectStore-container').text().split(' | ')[1];
                        selectStoreArea = selectStoreArea.split('㎡')[0];
                        $('#area').val(selectStoreArea);
                        var floor = new Option($('#selectStore').val().split(':::')[3], $('#selectStore').val().split(':::')[4], true, true);
                        $('#floor').append(floor).trigger('change');
                        calBackPushFixedRentAmount();
                        calBackPushPropertyMgmtAmount();
                    })
                    
                    temp = new Option(data.floorName, data.floorCode, true, true);
                    $('#floor').append(temp).trigger('change');
                    $('#contractName2').val(data.contractName);
                    $('#startDate, #compareStartDate_1, #compareStartDate_2').val(data.startDate);
                    $('#endDate, #compareEndDate_1, #compareEndDate_2').val(data.endDate);
                    
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
                    
                    if(data.rentCalculationMode == 'deduct' || data.rentCalculationMode == 'fixedRentAndAddDeduct'){
                        $('#investmentContractAccounttermCommission').show();
                    } else if(data.rentCalculationMode == 'fixedRentAndHigherDeduct'){
                        $('#investmentContractAccounttermCommission').show();
                        $('#investmentContractAccounttermCompare').show();
                    }
                    
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
                    
                    temp = new Option(data.brandName, data.brandCode, true, true);
                    $('#brandName').append(temp).trigger('change');
                    
                    $('#deliveryDate').val(data.deliveryDate);
                    $('#area').val(data.area);
                    $('#bizTypeName').val(data.bizTypeName);
                    $('#bizDate').val(data.bizDate);
                    
                    $('#awardDate').val(data.awardDate);
                    $('#bizScope').val(data.bizScope);
                    $('#targetSales').val(data.targetSales);
                    $('#enterDate').val(data.enterDate);
                    $('#freeStartDate_1').val(data.freeStartDate);
                    $('#freeEndDate_1').val(data.freeEndDate);
                    $('#remark').val(data.remark);
                    
                    $('#compareFirstFrequency').val(data.firstCompareCycle).trigger('change');
                    if(data.secondCompareFlag == '1'){
                        $('#compareSecond').prop('checked', 'checked');
                    }
                    $('#compareSecondFrequency').val(data.secondCompareCycle).trigger('change');
                    $('#compareSecondValue').val(data.secondCompareValueType).trigger('change');
                }
            } else {
                alertMsg(response.code,response.customerMessage);
            }
        }
    })
}

function findContractFixedRentByContractNo() {
    $.ajax({
        url: $.api.baseLotus+"/api/contract/fixed/rent/findAllByContractNoAndContractVersion?contractNo="+getURLParameter('id')+"&contractVersion=1",
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
                if(xhr.getResponseHeader("Login") !== null){
                    $.cookie('login', xhr.getResponseHeader("Login"));
                }
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                }
                
                if(response.data.length > 0){
                    $.contract.fixedRent = response.data;
                    $('#fixedRent tr').remove();
                    $.each(response.data, function(i,v) {
                        updateRowInvestmentContractAccounttermFixed(JSON.stringify(v));
                    })
                    $('input.money').each(function(){
                        $(this).val(accounting.formatNumber($(this).val()));
                    })
                    
                    $('#fixedRentPeriodType_1').val(response.data[0].periodTypeCode).trigger('change');
                    $('#fixedRentSettleDay_1').val(response.data[0].settleDay).trigger('change');
                    $('#fixedRentSettlePeriod_1').val(response.data[0].settlePeriodCode).trigger('change');
                    if(response.data[0].isOverdueFlag == '1'){
                        $('#fixedRentIsOverdueFlag_1').prop('checked', 'checked');
                    }
                    $('#fixedRentOverdueTaxRate_1').val(response.data[0].overdueTaxRate).trigger('change');
                    $('#fixedRentOverdueRate_1').val((parseFloat(response.data[0].overdueRate) * 1000));
                    if(response.data[0].overdueInvoiceFlag == '1'){
                        $('#fixedRentOverdueInvoiceFlag_1').prop('checked', 'checked');
                    }
                }
            }
        }
    })
}

function findContractCommissionByContractNo() {
    $.ajax({
        url: $.api.baseLotus+"/api/contract/deduct/findAllByContractNoAndContractVersion?contractNo="+getURLParameter('id')+"&contractVersion=1",
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
                if(xhr.getResponseHeader("Login") !== null){
                    $.cookie('login', xhr.getResponseHeader("Login"));
                }
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                }
                
                if(response.data.length > 0){
                    $.contract.commission = response.data;
                    $('#commission tr').remove();
                    $.each(response.data, function(i,v) {
                        updateRowInvestmentContractAccounttermCommission(JSON.stringify(v));
                    })
                    $('input.money').each(function(){
                        $(this).val(accounting.formatNumber($(this).val()));
                    })
                    
                    $('#commissionSalesType_1').val(response.data[0].salesType).trigger('change');
                    $('#commissionPeriodType_1').val(response.data[0].periodTypeCode).trigger('change');
                    $('#commissionSettleDay_1').val(response.data[0].settleDay).trigger('change');
                    $('#commissionSettlePeriod_1').val(response.data[0].settlePeriodCode).trigger('change');
                    if(response.data[0].isOverdueFlag == '1'){
                        $('#commissionIsOverdueFlag_1').prop('checked', 'checked');
                    }
                    $('#commissionOverdueTaxRate_1').val(response.data[0].overdueTaxRate).trigger('change');
                    $('#commissionOverdueRate_1').val((parseFloat(response.data[0].overdueRate) * 1000));
                    if(response.data[0].overdueInvoiceFlag == '1'){
                        $('#commissionOverdueInvoiceFlag_1').prop('checked', 'checked');
                    }
                }
            }
        }
    })
}

function findContractPropertyMgmtByContractNo() {
    $.ajax({
        url: $.api.baseLotus+"/api/contract/property/findAllByContractNoAndContractVersion?contractNo="+getURLParameter('id')+"&contractVersion=1",
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
                if(xhr.getResponseHeader("Login") !== null){
                    $.cookie('login', xhr.getResponseHeader("Login"));
                }
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                }
                
                if(response.data.length > 0){
                    $.contract.propertyMgmt = response.data;
                    $('#propertyMgmt tr').remove();
                    $.each(response.data, function(i,v) {
                        updateRowInvestmentContractAccounttermPropertyMgmt(JSON.stringify(v));
                    })
                    $('input.money').each(function(){
                        $(this).val(accounting.formatNumber($(this).val()));
                    })
                    
                    $('#propertyMgmtPeriodType_1').val(response.data[0].periodTypeCode).trigger('change');
                    $('#propertyMgmtSettleDay_1').val(response.data[0].settleDay).trigger('change');
                    $('#propertyMgmtSettlePeriod_1').val(response.data[0].settlePeriodCode).trigger('change');
                    if(response.data[0].isOverdueFlag == '1'){
                        $('#propertyMgmtIsOverdueFlag_1').prop('checked', 'checked');
                    }
                    $('#propertyMgmtOverdueTaxRate_1').val(response.data[0].overdueTaxRate).trigger('change');
                    $('#propertyMgmtOverdueRate_1').val((parseFloat(response.data[0].overdueRate) * 1000));
                    if(response.data[0].overdueInvoiceFlag == '1'){
                        $('#propertyMgmtOverdueInvoiceFlag_1').prop('checked', 'checked');
                    }
                }
            }
        }
    })
}

function findContractPromotionByContractNo() {
    $.ajax({
        url: $.api.baseLotus+"/api/contract/promotion/findAllByContractNoAndContractVersion?contractNo="+getURLParameter('id')+"&contractVersion=1",
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
                if(xhr.getResponseHeader("Login") !== null){
                    $.cookie('login', xhr.getResponseHeader("Login"));
                }
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                }
                
                if(response.data.length > 0){
                    $.contract.promotion = response.data;
                    $('#promotion tr').remove();
                    $.each(response.data, function(i,v) {
                        updateRowInvestmentContractAccounttermPromotion(JSON.stringify(v));
                    })
                    $('input.money').each(function(){
                        $(this).val(accounting.formatNumber($(this).val()));
                    })
                    
                    $('#promotionPeriodType_1').val(response.data[0].periodTypeCode).trigger('change');
                    $('#promotionSettleDay_1').val(response.data[0].settleDay).trigger('change');
                    $('#promotionSettlePeriod_1').val(response.data[0].settlePeriodCode).trigger('change');
                    if(response.data[0].isOverdueFlag == '1'){
                        $('#promotionIsOverdueFlag_1').prop('checked', 'checked');
                    }
                    $('#promotionOverdueTaxRate_1').val(response.data[0].overdueTaxRate).trigger('change');
                    $('#promotionOverdueRate_1').val((parseFloat(response.data[0].overdueRate) * 1000));
                    if(response.data[0].overdueInvoiceFlag == '1'){
                        $('#promotionOverdueInvoiceFlag_1').prop('checked', 'checked');
                    }
                }
            }
        }
    })
}

function findContractDepositByContractNo() {
    $.ajax({
        url: $.api.baseLotus+"/api/contract/deposit/findAllByContractNoAndContractVersion?contractNo="+getURLParameter('id')+"&contractVersion=1",
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
                if(xhr.getResponseHeader("Login") !== null){
                    $.cookie('login', xhr.getResponseHeader("Login"));
                }
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                }
                
                if(response.data.length > 0){
                    $.contract.deposit = response.data;
                    $('#deposit tr').remove();
                    $.each(response.data, function(i,v) {
                        updateRowInvestmentContractDepositterm(JSON.stringify(v));
                    })
                    $('input.money').each(function(){
                        $(this).val(accounting.formatNumber($(this).val()));
                    })
                }
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
                    $('#mainSigningBody').val(response.data.mallLotusBaseList[0].name);
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
                            $('#'+id).val(val).trigger('change');
                            return false;
                        }
                    })
                }
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
                        }
                        return false;
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
    input.setAttribute("value",value.startDate);
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
    input2.setAttribute("value",value.endDate);
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
    input.setAttribute("value",value.amount);
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
    input.setAttribute("value",value.taxAmount);
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
    input.setAttribute("value",value.rentAmount);
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
    input.setAttribute("value",value.taxRentAmount);
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
    if(value.invoiceFlag == 1){
        checkbox.setAttribute("checked", "");
    }
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
    $("#fixedRentItem_"+count.toLocaleString()).val(value.itemCode).trigger("change");
    $("#fixedRentTaxRate_"+count.toLocaleString()).val(value.taxRate).trigger("change");
 
    $("input.money").on('blur',function(){
        $(this).val(accounting.formatNumber($(this).val()));
    })
    
    $("input[id*='fixedRentAmount_']").on('blur',function(){
        calBackPushFixedRentAmount();
    })
    
    $("input[id*='fixedRentTaxAmount_']").on('blur',function(){
        calBackPushFixedRentTaxAmount();
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
    
    var table = document.getElementById('investmentContractAccounttermCommission');
    var tbody = table.querySelector('tbody') || table;
    var count = tbody.getElementsByTagName('tr').length + 1;
    column1.innerText = count.toLocaleString();
    
    var select = document.createElement("select"); //费用项
    select.setAttribute("class","select2 commissionFeeItemDropDown new");
    select.setAttribute("className","select2 commissionFeeItemDropDown new");
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
    input.setAttribute("value",value.startDate);
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
    input2.setAttribute("value",value.endDate);
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
    input.setAttribute("value",(parseFloat(value.deduct) * 100));
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
    input.setAttribute("value",(parseFloat(value.taxDeduct) * 100));
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
    input.setAttribute("value",value.amount);
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
    input.setAttribute("value",value.minSales);
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
    if(value.invoiceFlag == 1){
        checkbox.setAttribute("checked", "");
    }
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
    
    $("#commissionItem_"+count.toLocaleString()).val(value.itemCode).trigger("change");
    $('#investmentContractAccounttermCommission .select2').select2();
    calBackPushCommissionDeduct();
    $("#commissionTaxRate_"+count.toLocaleString()).val(value.taxRate).trigger("change");
 
    $("input.money").on('blur',function(){
        $(this).val(accounting.formatNumber($(this).val()));
    })
    
    $("input[id*='commissionDeduct_']").on('blur',function(){
        calBackPushCommissionDeduct();
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
    input.setAttribute("value",value.startDate);
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
    input2.setAttribute("value",value.endDate);
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
    input.setAttribute("value",value.amount);
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
    input.setAttribute("value",value.taxAmount);
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
    input.setAttribute("value",value.rentAmount);
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
    input.setAttribute("value",value.taxRentAmount);
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
    if(value.invoiceFlag == 1){
        checkbox.setAttribute("checked", "");
    }
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
    
    $("#propertyMgmtItem_"+count.toLocaleString()).val(value.itemCode).trigger("change");
    $('#investmentContractAccounttermPropertyMgmt .select2').select2();
    calBackPushPropertyMgmtAmount();
    calBackPushPropertyMgmtTaxAmount();
    $("#propertyMgmtTaxRate_"+count.toLocaleString()).val(value.taxRate).trigger("change");
 
    $("input.money").on('blur',function(){
        $(this).val(accounting.formatNumber($(this).val()));
    })
    
    $("input[id*='propertyMgmtAmount_']").on('blur',function(){
        calBackPushPropertyMgmtAmount();
    })
    
    $("input[id*='propertyMgmtTaxAmount_']").on('blur',function(){
        calBackPushPropertyMgmtTaxAmount();
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
    input.setAttribute("value",value.startDate);
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
    input2.setAttribute("value",value.endDate);
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
    input.setAttribute("value",value.amount);
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
    input.setAttribute("value",value.taxAmount);
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
    input.setAttribute("value",(parseFloat(value.deduct) * 100));
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
    input.setAttribute("value",(parseFloat(value.taxDeduct) * 100));
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
    if(value.invoiceFlag == 1){
        checkbox.setAttribute("checked", "");
    }
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
    
    $("#promotionItem_"+count.toLocaleString()).val(value.itemCode).trigger("change");
    $('#investmentContractAccounttermPromotion .select2').select2();
    calBackPushPromotionAmount();
    calBackPushPromotionDeduct();
    
    $("#promotionTaxRate_"+count.toLocaleString()).val(value.taxRate).trigger("change");
 
    $("input.money").on('blur',function(){
        $(this).val(accounting.formatNumber($(this).val()));
    })
    
    $("input[id*='promotionAmount_']").on('blur',function(){
        calBackPushPromotionAmount();
    })
    
    $("input[id*='promotionDeduct_']").on('blur',function(){
        calBackPushPromotionDeduct();
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
    input.setAttribute("value",value.amount);
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
    
    $("#deposittermItem_"+count.toLocaleString()).val(value.itemCode).trigger("change");
    $('#investmentContractDepositterm .select2').select2();
    
    $("input.money").on('blur',function(){
        $(this).val(accounting.formatNumber($(this).val()));
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

function saveContractFixedRent() {
    Ewin.confirm({ message: "确定要保存固定租金吗？" }).on(function (e) {
        if (!e) {
            return;
        }
        
        var ind;
        $.each($.contract.fixedRent, function(i,v) {
            ind = i * 1 + 1;
            if(ind > $("#fixedRent").find("tr").length){
                v.state = 0;
            }
        })
        
        var index;
        var fixedRent = {};
        $("#fixedRent").find("tr").each(function(i,e){
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
                
                fixedRent.shopCode = $.contract.propertyMgmt[0].shopCode;
                fixedRent.area = $.contract.propertyMgmt[0].area;
                
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
            "contractVersion": $('#contractVersion').text(),
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
                    successMsg(response.code,response.customerMessage);

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

function saveContractPropertyMgmt() {
    Ewin.confirm({ message: "确定要保存物业管理费吗？" }).on(function (e) {
        if (!e) {
            return;
        }
        
        var ind;
        $.each($.contract.propertyMgmt, function(i,v) {
            ind = i * 1 + 1;
            if(ind > $("#propertyMgmt").find("tr").length){
                v.state = 0;
            }
        })
        
        var index;
        var propertyMgmt = {};
        $("#propertyMgmt").find("tr").each(function(i,e){
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
                
                propertyMgmt.shopCode = $.contract.propertyMgmt[0].shopCode;
                propertyMgmt.area = $.contract.propertyMgmt[0].area;
                
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
            "contractVersion": $('#contractVersion').text(),
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
                    successMsg(response.code,response.customerMessage);

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

function saveContractCommission() {
    Ewin.confirm({ message: "确定要保存提成租金吗？" }).on(function (e) {
        if (!e) {
            return;
        }
        
        var ind;
        $.each($.contract.commission, function(i,v) {
            ind = i * 1 + 1;
            if(ind > $("#commission").find("tr").length){
                v.state = 0;
            }
        })
        
        var index;
        var commission = {};
        $("#commission").find("tr").each(function(i,e){
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
                
                commission.shopCode = $.contract.propertyMgmt[0].shopCode;
                commission.area = $.contract.propertyMgmt[0].area;
                
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
            "contractVersion": $('#contractVersion').text(),
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
                    successMsg(response.code,response.customerMessage);

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

function saveContractPromotion() {
    Ewin.confirm({ message: "确定要保存推广费吗？" }).on(function (e) {
        if (!e) {
            return;
        }
        
        var ind;
        $.each($.contract.promotion, function(i,v) {
            ind = i * 1 + 1;
            if(ind > $("#promotion").find("tr").length){
                v.state = 0;
            }
        })
        
        var index;
        var promotion = {};
        $("#promotion").find("tr").each(function(i,e){
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

                $.contract.promotion[i].deduct =  parseFloat(numberWithoutCommas($('#promotionDeduct_'+index).val())) / 100;
                $.contract.promotion[i].taxDeduct =  parseFloat(numberWithoutCommas($('#promotionTaxDeduct_'+index).val())) / 100;

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
                
                promotion.shopCode = $.contract.propertyMgmt[0].shopCode;
                promotion.area = $.contract.propertyMgmt[0].area;
                
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

                promotion.deduct =  parseFloat(numberWithoutCommas($('#promotionDeduct_'+index).val())) / 100;
                promotion.taxDeduct =  parseFloat(numberWithoutCommas($('#promotionTaxDeduct_'+index).val())) / 100;

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
            "contractVersion": $('#contractVersion').text(),
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
                    successMsg(response.code,response.customerMessage);

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

function saveContractDeposit() {
    Ewin.confirm({ message: "确定要保存预存款条款吗？" }).on(function (e) {
        if (!e) {
            return;
        }
        
        var ind;
        $.each($.contract.deposit, function(i,v) {
            ind = i * 1 + 1;
            if(ind > $("#deposit").find("tr").length){
                v.state = 0;
            }
        })
        
        var index;
        var deposit = {};
        $("#deposit").find("tr").each(function(i,e){
            index = i * 1 + 1;
            if(index <= $.contract.deposit.length){
                $.contract.deposit[i].itemCode = $('#deposittermItem_'+index).val();
                $.contract.deposit[i].itemName = $('#select2-deposittermItem_'+index+'-container').text().split('[')[0];

                $.contract.deposit[i].amount =  numberWithoutCommas($('#deposittermAmount_'+index).val());

                $.contract.deposit[i].taxRate = $('#deposittermTaxRate_'+index).val();
                $.contract.deposit[i].taxCode = $('#deposittermTaxRate_'+index).find('option:selected').attr('data-code');
            } else {
                deposit.itemCode = $('#deposittermItem_'+index).val();
                deposit.itemName = $('#select2-deposittermItem_'+index+'-container').text().split('[')[0];

                deposit.amount =  numberWithoutCommas($('#deposittermAmount_'+index).val());
                
                deposit.taxRate = $('#deposittermTaxRate_'+index).val();
                deposit.taxCode = $('#deposittermTaxRate_'+index).find('option:selected').attr('data-code');
                
                $.contract.deposit.push(deposit);
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
            "contractVersion": $('#contractVersion').text(),
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
                    successMsg(response.code,response.customerMessage);

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

function saveContract() {
    Ewin.confirm({ message: "确定要保存本版块合同内容吗？" }).on(function (e) {
        if (!e) {
            return;
        }
        
        $.contract.content.bizId = "900001";
        $.contract.content.contractName = $('#contractName2').val();
        $.contract.content.awardDate = $('#awardDate').val();
        $.contract.content.openStartTime = $('#openStartTime').val();
        $.contract.content.openEndTime = $('#openEndTime').val();
        $.contract.content.freeStartDate = $('#freeStartDate').val();
        $.contract.content.freeEndTime = $('#freeEndTime').val();
        $.contract.content.freeDays = $('#freeDays').val();
        $.contract.content.bizDate = $('#bizDate').val();
        $.contract.content.remark = $('#remark').val();
        
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
                    
                    successMsg(response.code,response.customerMessage);

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