$.budget = {}

$(document).ready(function(){
    $('#create-form')[0].reset();
    
    $('.date-picker, .input-daterange').datepicker({
        'language': 'zh-CN',
        'format': 'yyyy-mm-dd',
        'todayHighlight': true,
        'autoclose': true,
        'clearBtn': true
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
    
    $("#saveDraft").click(function(){
        saveBudget();
    })
    
    findBudgetByShopCode();
})

function findBudgetByShopCode() {
    $.ajax({
        url: $.api.baseLotus+"/api/vshop/lotus/findAllByShopCode?shopCode="+getURLParameter('id'),
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
                
                var data = response.data;
                var state = "使用中";
                if(data.shopBudgetList == null || data.shopBudgetList.length == 0){
                    $('#budgetStatus').removeClass('badge-success').addClass('badge-danger');
                    state = "未使用";
                }
                
                $('#budgetStatus').text(state);
                $('#unitName').text(data.unitName);
                $('#unitCode').text(data.unitCode);
                $('#mall').val(data.mallName+'['+data.mallCode+']');
                $('#unitType').val(renderUnitType(data.unitType));
                $('#area').val(data.unitArea);
                
                if(data.shopBudgetList != null && data.shopBudgetList.length > 0) {
                    $.each(data.shopBudgetList, function(i,v) {
                        switch (v.termType) {
                            case "B011":
                                updateRowInvestmentBudgetAccounttermFixed(JSON.stringify(v));
                                break;
                            case "B021":
                                updateRowInvestmentBudgetAccounttermPropertyMgmt(JSON.stringify(v));
                                break;
                            case "G011":
                                updateRowInvestmentBudgetAccounttermCommission(JSON.stringify(v));
                                break;
                            case "D011":
                                updateRowInvestmentBudgetAccounttermPromotion(JSON.stringify(v));
                                break;
                            case "SALE":
                                updateRowInvestmentBudgetAccounttermSales(JSON.stringify(v));
                                break;
                            default:
                                break;
                        }
                    })
                }
                
                $('input.money').each(function(){
                    $(this).val(accounting.formatNumber($(this).val()));
                })
            }
        }
    })
}

function updateRowInvestmentBudgetAccounttermFixed(v) {
    var value = JSON.parse(v);
    var newrow = document.createElement("tr");
    if(value.lockFlag == 1){
        newrow.setAttribute("class","new");
    }
    var column = [];
    column[0] = createRowColumn(newrow);
    column[1] = createRowColumn(newrow);
    column[2] = createRowColumn(newrow);
    column[3] = createRowColumn(newrow);
    column[4] = createRowColumn(newrow);
    column[5] = createRowColumn(newrow);
    column[6] = createRowColumn(newrow);
    column[7] = createRowColumn(newrow);
    column[8] = createRowColumn(newrow);
    column[9] = createRowColumn(newrow);
    column[10] = createRowColumn(newrow);
    column[11] = createRowColumn(newrow);
    column[12] = createRowColumn(newrow);
    column[13] = createRowColumn(newrow);
    column[14] = createRowColumn(newrow);
    
    var table = document.getElementById('investmentBudgetAccounttermFixed');
    var tbody = table.querySelector('tbody') || table;
    var count = tbody.getElementsByTagName('tr').length + 1;
    column[0].innerText = count.toLocaleString();
    
    var div = document.createElement("div"); //期限
    div.setAttribute("class","input-daterange input-group");
    var input = document.createElement("input");
    input.setAttribute("class","form-control");
    input.setAttribute("id","fixedStartDate_"+count.toLocaleString());
    input.setAttribute("type","text");
    input.setAttribute("style","min-width: 80px");
    input.setAttribute("readonly","");
    input.setAttribute("value",value.startDate);
    if(value.lockFlag == 1){
        input.setAttribute('disabled','disabled');
    }
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
    input2.setAttribute("id","fixedEndDate_"+count.toLocaleString());
    input2.setAttribute("type","text");
    input2.setAttribute("style","min-width: 80px");
    input2.setAttribute("readonly","");
    input2.setAttribute("value",value.endDate);
    if(value.lockFlag == 1){
        input2.setAttribute('disabled','disabled');
    }
    div2.appendChild(input2);
    var icon2 = document.createElement("i");
    icon2.setAttribute("class", "fa fa-calendar");
    var span2 = document.createElement("span");
    span2.setAttribute("class", "input-group-addon");
    span2.appendChild(icon2);
    div2.appendChild(span2);
    div.appendChild(div2);
    column[1].appendChild(div);
    
    var rent;
    for(let i = 1; i <= 12; i++){
        switch (i) {
            case 1:
                rent = value.january;
                break;
            case 2:
                rent = value.february;
                break;
            case 3:
                rent = value.march;
                break;
            case 4:
                rent = value.april;
                break;
            case 5:
                rent = value.may;
                break;
            case 6:
                rent = value.june;
                break;
            case 7:
                rent = value.july;
                break;
            case 8:
                rent = value.august;
                break;
            case 9:
                rent = value.september;
                break;
            case 10:
                rent = value.october;
                break;
            case 11:
                rent = value.november;
                break;
            case 12:
                rent = value.december;
                break;    
            default:
                break;
        }
                            
        var div = document.createElement("div");
        div.setAttribute("class","input-group");
        var input = document.createElement("input");
        input.setAttribute("class","form-control money");
        input.setAttribute("id","fixed_"+i+"_"+count.toLocaleString());
        input.setAttribute("type","text");
        input.setAttribute("value",rent);
        if(value.lockFlag == 1){
            input.setAttribute('disabled','disabled');
        }
        div.appendChild(input);
        var percent = document.createElement("span");
        percent.innerText = "元";
        percent.setAttribute("class", "input-group-addon");
        div.appendChild(percent);
        column[i*1+1].appendChild(div);
    }
    
    var div = document.createElement("div");
    div.setAttribute("class","input-group");
    var input = document.createElement("input");
    input.setAttribute("class","form-control money");
    input.setAttribute("id","fixedTotal_"+count.toLocaleString());
    input.setAttribute("type","text");
    input.setAttribute("value",value.total);
    if(value.lockFlag == 1){
        input.setAttribute('disabled','disabled');
    }
    div.appendChild(input);
    var percent = document.createElement("span");
    percent.innerText = "元";
    percent.setAttribute("class", "input-group-addon");
    div.appendChild(percent);
    column[14].appendChild(div);

    tbody.appendChild(newrow);
    $('#investmentBudgetAccounttermFixed .input-daterange').datepicker({
        'language': 'zh-CN',
        'format': 'yyyy-mm-dd',
        'todayHighlight': true,
        'autoclose': true
    });
    
    $('#investmentBudgetAccounttermFixed .select2').select2();
 
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

function updateRowInvestmentBudgetAccounttermPropertyMgmt(v) {
    var value = JSON.parse(v);
    var newrow = document.createElement("tr");
    if(value.lockFlag == 1){
        newrow.setAttribute("class","new");
    }
    var column = [];
    column[0] = createRowColumn(newrow);
    column[1] = createRowColumn(newrow);
    column[2] = createRowColumn(newrow);
    column[3] = createRowColumn(newrow);
    column[4] = createRowColumn(newrow);
    column[5] = createRowColumn(newrow);
    column[6] = createRowColumn(newrow);
    column[7] = createRowColumn(newrow);
    column[8] = createRowColumn(newrow);
    column[9] = createRowColumn(newrow);
    column[10] = createRowColumn(newrow);
    column[11] = createRowColumn(newrow);
    column[12] = createRowColumn(newrow);
    column[13] = createRowColumn(newrow);
    column[14] = createRowColumn(newrow);
    
    var table = document.getElementById('investmentBudgetAccounttermPropertyMgmt');
    var tbody = table.querySelector('tbody') || table;
    var count = tbody.getElementsByTagName('tr').length + 1;
    column[0].innerText = count.toLocaleString();
    
    var div = document.createElement("div"); //期限
    div.setAttribute("class","input-daterange input-group");
    var input = document.createElement("input");
    input.setAttribute("class","form-control");
    input.setAttribute("id","propertyMgmtStartDate_"+count.toLocaleString());
    input.setAttribute("type","text");
    input.setAttribute("style","min-width: 80px");
    input.setAttribute("readonly","");
    input.setAttribute("value",value.startDate);
    if(value.lockFlag == 1){
        input.setAttribute('disabled','disabled');
    }
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
    if(value.lockFlag == 1){
        input2.setAttribute('disabled','disabled');
    }
    div2.appendChild(input2);
    var icon2 = document.createElement("i");
    icon2.setAttribute("class", "fa fa-calendar");
    var span2 = document.createElement("span");
    span2.setAttribute("class", "input-group-addon");
    span2.appendChild(icon2);
    div2.appendChild(span2);
    div.appendChild(div2);
    column[1].appendChild(div);
    
    var rent;
    for(let i = 1; i <= 12; i++){
        switch (i) {
            case 1:
                rent = value.january;
                break;
            case 2:
                rent = value.february;
                break;
            case 3:
                rent = value.march;
                break;
            case 4:
                rent = value.april;
                break;
            case 5:
                rent = value.may;
                break;
            case 6:
                rent = value.june;
                break;
            case 7:
                rent = value.july;
                break;
            case 8:
                rent = value.august;
                break;
            case 9:
                rent = value.september;
                break;
            case 10:
                rent = value.october;
                break;
            case 11:
                rent = value.november;
                break;
            case 12:
                rent = value.december;
                break;    
            default:
                break;
        }
                            
        var div = document.createElement("div");
        div.setAttribute("class","input-group");
        var input = document.createElement("input");
        input.setAttribute("class","form-control money");
        input.setAttribute("id","propertyMgmt_"+i+"_"+count.toLocaleString());
        input.setAttribute("type","text");
        input.setAttribute("value",rent);
        if(value.lockFlag == 1){
            input.setAttribute('disabled','disabled');
        }
        div.appendChild(input);
        var percent = document.createElement("span");
        percent.innerText = "元";
        percent.setAttribute("class", "input-group-addon");
        div.appendChild(percent);
        column[i*1+1].appendChild(div);
    }
    
    var div = document.createElement("div");
    div.setAttribute("class","input-group");
    var input = document.createElement("input");
    input.setAttribute("class","form-control money");
    input.setAttribute("id","propertyMgmtTotal_"+count.toLocaleString());
    input.setAttribute("type","text");
    input.setAttribute("value",value.total);
    if(value.lockFlag == 1){
        input.setAttribute('disabled','disabled');
    }
    div.appendChild(input);
    var percent = document.createElement("span");
    percent.innerText = "元";
    percent.setAttribute("class", "input-group-addon");
    div.appendChild(percent);
    column[14].appendChild(div);

    tbody.appendChild(newrow);
    $('#investmentBudgetAccounttermPropertyMgmt .input-daterange').datepicker({
        'language': 'zh-CN',
        'format': 'yyyy-mm-dd',
        'todayHighlight': true,
        'autoclose': true
    });
    
    $('#investmentBudgetAccounttermPropertyMgmt .select2').select2();
 
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

function updateRowInvestmentBudgetAccounttermCommission(v) {
    var value = JSON.parse(v);
    var newrow = document.createElement("tr");
    if(value.lockFlag == 1){
        newrow.setAttribute("class","new");
    }
    var column = [];
    column[0] = createRowColumn(newrow);
    column[1] = createRowColumn(newrow);
    column[2] = createRowColumn(newrow);
    column[3] = createRowColumn(newrow);
    column[4] = createRowColumn(newrow);
    column[5] = createRowColumn(newrow);
    column[6] = createRowColumn(newrow);
    column[7] = createRowColumn(newrow);
    column[8] = createRowColumn(newrow);
    column[9] = createRowColumn(newrow);
    column[10] = createRowColumn(newrow);
    column[11] = createRowColumn(newrow);
    column[12] = createRowColumn(newrow);
    column[13] = createRowColumn(newrow);
    column[14] = createRowColumn(newrow);
    
    var table = document.getElementById('investmentBudgetAccounttermCommission');
    var tbody = table.querySelector('tbody') || table;
    var count = tbody.getElementsByTagName('tr').length + 1;
    column[0].innerText = count.toLocaleString();
    
    var div = document.createElement("div"); //期限
    div.setAttribute("class","input-daterange input-group");
    var input = document.createElement("input");
    input.setAttribute("class","form-control");
    input.setAttribute("id","commissionStartDate_"+count.toLocaleString());
    input.setAttribute("type","text");
    input.setAttribute("style","min-width: 80px");
    input.setAttribute("readonly","");
    input.setAttribute("value",value.startDate);
    if(value.lockFlag == 1){
        input.setAttribute('disabled','disabled');
    }
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
    if(value.lockFlag == 1){
        input2.setAttribute('disabled','disabled');
    }
    div2.appendChild(input2);
    var icon2 = document.createElement("i");
    icon2.setAttribute("class", "fa fa-calendar");
    var span2 = document.createElement("span");
    span2.setAttribute("class", "input-group-addon");
    span2.appendChild(icon2);
    div2.appendChild(span2);
    div.appendChild(div2);
    column[1].appendChild(div);
    
    var rent;
    for(let i = 1; i <= 12; i++){
        switch (i) {
            case 1:
                rent = value.january;
                break;
            case 2:
                rent = value.february;
                break;
            case 3:
                rent = value.march;
                break;
            case 4:
                rent = value.april;
                break;
            case 5:
                rent = value.may;
                break;
            case 6:
                rent = value.june;
                break;
            case 7:
                rent = value.july;
                break;
            case 8:
                rent = value.august;
                break;
            case 9:
                rent = value.september;
                break;
            case 10:
                rent = value.october;
                break;
            case 11:
                rent = value.november;
                break;
            case 12:
                rent = value.december;
                break;    
            default:
                break;
        }
                            
        var div = document.createElement("div");
        div.setAttribute("class","input-group");
        var input = document.createElement("input");
        input.setAttribute("class","form-control money");
        input.setAttribute("id","commission_"+i+"_"+count.toLocaleString());
        input.setAttribute("type","text");
        input.setAttribute("value",rent);
        if(value.lockFlag == 1){
            input.setAttribute('disabled','disabled');
        }
        div.appendChild(input);
        var percent = document.createElement("span");
        percent.innerText = "元";
        percent.setAttribute("class", "input-group-addon");
        div.appendChild(percent);
        column[i*1+1].appendChild(div);
    }
    
    var div = document.createElement("div");
    div.setAttribute("class","input-group");
    var input = document.createElement("input");
    input.setAttribute("class","form-control money");
    input.setAttribute("id","commissionTotal_"+count.toLocaleString());
    input.setAttribute("type","text");
    input.setAttribute("value",value.total);
    if(value.lockFlag == 1){
        input.setAttribute('disabled','disabled');
    }
    div.appendChild(input);
    var percent = document.createElement("span");
    percent.innerText = "元";
    percent.setAttribute("class", "input-group-addon");
    div.appendChild(percent);
    column[14].appendChild(div);

    tbody.appendChild(newrow);
    $('#investmentBudgetAccounttermCommission .input-daterange').datepicker({
        'language': 'zh-CN',
        'format': 'yyyy-mm-dd',
        'todayHighlight': true,
        'autoclose': true
    });
    
    $('#investmentBudgetAccounttermCommission .select2').select2();
 
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

function updateRowInvestmentBudgetAccounttermPromotion(v) {
    var value = JSON.parse(v);
    var newrow = document.createElement("tr");
    if(value.lockFlag == 1){
        newrow.setAttribute("class","new");
    }
    var column = [];
    column[0] = createRowColumn(newrow);
    column[1] = createRowColumn(newrow);
    column[2] = createRowColumn(newrow);
    column[3] = createRowColumn(newrow);
    column[4] = createRowColumn(newrow);
    column[5] = createRowColumn(newrow);
    column[6] = createRowColumn(newrow);
    column[7] = createRowColumn(newrow);
    column[8] = createRowColumn(newrow);
    column[9] = createRowColumn(newrow);
    column[10] = createRowColumn(newrow);
    column[11] = createRowColumn(newrow);
    column[12] = createRowColumn(newrow);
    column[13] = createRowColumn(newrow);
    column[14] = createRowColumn(newrow);
    
    var table = document.getElementById('investmentBudgetAccounttermPromotion');
    var tbody = table.querySelector('tbody') || table;
    var count = tbody.getElementsByTagName('tr').length + 1;
    column[0].innerText = count.toLocaleString();
    
    var div = document.createElement("div"); //期限
    div.setAttribute("class","input-daterange input-group");
    var input = document.createElement("input");
    input.setAttribute("class","form-control");
    input.setAttribute("id","promotionStartDate_"+count.toLocaleString());
    input.setAttribute("type","text");
    input.setAttribute("style","min-width: 80px");
    input.setAttribute("readonly","");
    input.setAttribute("value",value.startDate);
    if(value.lockFlag == 1){
        input.setAttribute('disabled','disabled');
    }
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
    if(value.lockFlag == 1){
        input2.setAttribute('disabled','disabled');
    }
    div2.appendChild(input2);
    var icon2 = document.createElement("i");
    icon2.setAttribute("class", "fa fa-calendar");
    var span2 = document.createElement("span");
    span2.setAttribute("class", "input-group-addon");
    span2.appendChild(icon2);
    div2.appendChild(span2);
    div.appendChild(div2);
    column[1].appendChild(div);
    
    var rent;
    for(let i = 1; i <= 12; i++){
        switch (i) {
            case 1:
                rent = value.january;
                break;
            case 2:
                rent = value.february;
                break;
            case 3:
                rent = value.march;
                break;
            case 4:
                rent = value.april;
                break;
            case 5:
                rent = value.may;
                break;
            case 6:
                rent = value.june;
                break;
            case 7:
                rent = value.july;
                break;
            case 8:
                rent = value.august;
                break;
            case 9:
                rent = value.september;
                break;
            case 10:
                rent = value.october;
                break;
            case 11:
                rent = value.november;
                break;
            case 12:
                rent = value.december;
                break;    
            default:
                break;
        }
                            
        var div = document.createElement("div");
        div.setAttribute("class","input-group");
        var input = document.createElement("input");
        input.setAttribute("class","form-control money");
        input.setAttribute("id","promotion_"+i+"_"+count.toLocaleString());
        input.setAttribute("type","text");
        input.setAttribute("value",rent);
        if(value.lockFlag == 1){
            input.setAttribute('disabled','disabled');
        }
        div.appendChild(input);
        var percent = document.createElement("span");
        percent.innerText = "元";
        percent.setAttribute("class", "input-group-addon");
        div.appendChild(percent);
        column[i*1+1].appendChild(div);
    }
    
    var div = document.createElement("div");
    div.setAttribute("class","input-group");
    var input = document.createElement("input");
    input.setAttribute("class","form-control money");
    input.setAttribute("id","promotionTotal_"+count.toLocaleString());
    input.setAttribute("type","text");
    input.setAttribute("value",value.total);
    if(value.lockFlag == 1){
        input.setAttribute('disabled','disabled');
    }
    div.appendChild(input);
    var percent = document.createElement("span");
    percent.innerText = "元";
    percent.setAttribute("class", "input-group-addon");
    div.appendChild(percent);
    column[14].appendChild(div);

    tbody.appendChild(newrow);
    $('#investmentBudgetAccounttermPromotion .input-daterange').datepicker({
        'language': 'zh-CN',
        'format': 'yyyy-mm-dd',
        'todayHighlight': true,
        'autoclose': true
    });
    
    $('#investmentBudgetAccounttermPromotion .select2').select2();
 
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

function updateRowInvestmentBudgetAccounttermSales(v) {
    var value = JSON.parse(v);
    var newrow = document.createElement("tr");
    if(value.lockFlag == 1){
        newrow.setAttribute("class","new");
    }
    var column = [];
    column[0] = createRowColumn(newrow);
    column[1] = createRowColumn(newrow);
    column[2] = createRowColumn(newrow);
    column[3] = createRowColumn(newrow);
    column[4] = createRowColumn(newrow);
    column[5] = createRowColumn(newrow);
    column[6] = createRowColumn(newrow);
    column[7] = createRowColumn(newrow);
    column[8] = createRowColumn(newrow);
    column[9] = createRowColumn(newrow);
    column[10] = createRowColumn(newrow);
    column[11] = createRowColumn(newrow);
    column[12] = createRowColumn(newrow);
    column[13] = createRowColumn(newrow);
    column[14] = createRowColumn(newrow);
    
    var table = document.getElementById('investmentBudgetAccounttermSales');
    var tbody = table.querySelector('tbody') || table;
    var count = tbody.getElementsByTagName('tr').length + 1;
    column[0].innerText = count.toLocaleString();
    
    var div = document.createElement("div"); //期限
    div.setAttribute("class","input-daterange input-group");
    var input = document.createElement("input");
    input.setAttribute("class","form-control");
    input.setAttribute("id","salesStartDate_"+count.toLocaleString());
    input.setAttribute("type","text");
    input.setAttribute("style","min-width: 80px");
    input.setAttribute("readonly","");
    input.setAttribute("value",value.startDate);
    if(value.lockFlag == 1){
        input.setAttribute('disabled','disabled');
    }
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
    input2.setAttribute("id","salesEndDate_"+count.toLocaleString());
    input2.setAttribute("type","text");
    input2.setAttribute("style","min-width: 80px");
    input2.setAttribute("readonly","");
    input2.setAttribute("value",value.endDate);
    if(value.lockFlag == 1){
        input2.setAttribute('disabled','disabled');
    }
    div2.appendChild(input2);
    var icon2 = document.createElement("i");
    icon2.setAttribute("class", "fa fa-calendar");
    var span2 = document.createElement("span");
    span2.setAttribute("class", "input-group-addon");
    span2.appendChild(icon2);
    div2.appendChild(span2);
    div.appendChild(div2);
    column[1].appendChild(div);
    
    var rent;
    for(let i = 1; i <= 12; i++){
        switch (i) {
            case 1:
                rent = value.january;
                break;
            case 2:
                rent = value.february;
                break;
            case 3:
                rent = value.march;
                break;
            case 4:
                rent = value.april;
                break;
            case 5:
                rent = value.may;
                break;
            case 6:
                rent = value.june;
                break;
            case 7:
                rent = value.july;
                break;
            case 8:
                rent = value.august;
                break;
            case 9:
                rent = value.september;
                break;
            case 10:
                rent = value.october;
                break;
            case 11:
                rent = value.november;
                break;
            case 12:
                rent = value.december;
                break;    
            default:
                break;
        }
                            
        var div = document.createElement("div");
        div.setAttribute("class","input-group");
        var input = document.createElement("input");
        input.setAttribute("class","form-control money");
        input.setAttribute("id","sales_"+i+"_"+count.toLocaleString());
        input.setAttribute("type","text");
        input.setAttribute("value",rent);
        if(value.lockFlag == 1){
            input.setAttribute('disabled','disabled');
        }
        div.appendChild(input);
        var percent = document.createElement("span");
        percent.innerText = "元";
        percent.setAttribute("class", "input-group-addon");
        div.appendChild(percent);
        column[i*1+1].appendChild(div);
    }
    
    var div = document.createElement("div");
    div.setAttribute("class","input-group");
    var input = document.createElement("input");
    input.setAttribute("class","form-control money");
    input.setAttribute("id","salesTotal_"+count.toLocaleString());
    input.setAttribute("type","text");
    input.setAttribute("value",value.total);
    if(value.lockFlag == 1){
        input.setAttribute('disabled','disabled');
    }
    div.appendChild(input);
    var percent = document.createElement("span");
    percent.innerText = "元";
    percent.setAttribute("class", "input-group-addon");
    div.appendChild(percent);
    column[14].appendChild(div);

    tbody.appendChild(newrow);
    $('#investmentBudgetAccounttermSales .input-daterange').datepicker({
        'language': 'zh-CN',
        'format': 'yyyy-mm-dd',
        'todayHighlight': true,
        'autoclose': true
    });
    
    $('#investmentBudgetAccounttermSales .select2').select2();
 
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

function saveBudget() {
    var msg = '确定要将此内容保存提交吗？';
    
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
        
        var index;
        var fixedList = [];
        $("#fixed").find("tr.new").each(function(i,e){
            var fixed = {};
            index = i * 1 + 1;
            fixed.itemCode = $('#fixedItem_'+index).val();
            fixed.itemName = $('#select2-fixedItem_'+index+'-container').text().split('[')[0];


            fixed.settlePeriodCode = $('#fixedSettlePeriod_1').val(); // 结算周期
            fixed.settlePeriodName = $('#select2-fixedSettlePeriod_1-container').text(); // 结算周期

            fixed.periodTypeCode = $('#fixedPeriodType_1').val(); // 周期类型
            fixed.periodTypeName = $('#select2-fixedPeriodType_1-container').text(); // 周期类型

            fixed.settleDay = $('#fixedSettleDay_1').val(); // 结算日期

            if($('#fixedIsOverdueFlag_1').prop('checked') == true){
                fixed.isOverdueFlag = 1;
            } else {
                fixed.isOverdueFlag = 0;
            }

            fixed.overdueTaxRate = $('#fixedOverdueTaxRate_1').val();
            fixed.overdueRate = parseFloat($('#fixedOverdueRate_1').val()) / 1000;

            if($('#fixedOverdueInvoiceFlag_1').prop('checked') == true){
                fixed.overdueInvoiceFlag = 1;
            } else {
                fixed.overdueInvoiceFlag = 0;
            }

            fixed.startDate = $('#fixedStartDate_'+index).val();
            fixed.endDate = $('#fixedEndDate_'+index).val();

            fixed.amount =  numberWithoutCommas($('#fixedAmount_'+index).val());
            fixed.taxAmount =  numberWithoutCommas($('#fixedTaxAmount_'+index).val());

            fixed.rentAmount =  numberWithoutCommas($('#fixedRentAmount_'+index).val());
            fixed.taxRentAmount =  numberWithoutCommas($('#fixedTaxRentAmount_'+index).val());

            fixed.taxRate = $('#fixedTaxRate_'+index).val();
            fixed.taxCode = $('#fixedTaxRate_'+index).find('option:selected').attr('data-code');

            fixedList.push(fixed);
        })
        
        $.ajax({
            url: $.api.baseLotus+"/api/shop/budget/saveOrUpdate",
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
            complete: function(jqXHR, textStatus, errorThrown) {},
            success: function (response, status, xhr) {
                $('#loader').hide();
                if(response.code === 'C0') {
                    if(xhr.getResponseHeader("Login") !== null){
                        $.cookie('login', xhr.getResponseHeader("Login"));
                    }
                    if(xhr.getResponseHeader("Authorization") !== null){
                        $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                    }

//                    if(response.data.id != ""){
//                        window.location.href = '/lotus-admin/renew-summary?id='+response.data.bizId+'&s=succeed';
//                    } else {
//                        alertMsg(response.data.resultCode,response.data.resultMsg);
//                    }
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