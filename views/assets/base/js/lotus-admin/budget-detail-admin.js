$.budget = {};

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
        mandatoryCheck();
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
                $.budget = data;
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
    if(value.lockFlag != 1){
        newrow.setAttribute("class","new");
    }
    if(value.id != '' && value.id != null && value.id != 'null'){
        newrow.setAttribute("data-id",value.id);
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
    if(value.lockFlag != 1){
        newrow.setAttribute("class","new");
    }
    if(value.id != '' && value.id != null && value.id != 'null'){
        newrow.setAttribute("data-id",value.id);
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
    if(value.lockFlag != 1){
        newrow.setAttribute("class","new");
    }
    if(value.id != '' && value.id != null && value.id != 'null'){
        newrow.setAttribute("data-id",value.id);
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
    if(value.lockFlag != 1){
        newrow.setAttribute("class","new");
    }
    if(value.id != '' && value.id != null && value.id != 'null'){
        newrow.setAttribute("data-id",value.id);
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
    if(value.lockFlag != 1){
        newrow.setAttribute("class","new");
    }
    if(value.id != '' && value.id != null && value.id != 'null'){
        newrow.setAttribute("data-id",value.id);
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

function mandatoryCheck() {
    $('.mandatory-error').remove();
    var flag = 1;
    var error = '<i class="fa fa-exclamation-circle mandatory-error" aria-hidden="true"></i>';
    
    $("input[id*='StartDate_']").each(function(){
        if($(this).val() == ''){
            flag = 0;
            $(this).parent().prepend(error);
        }
    })
    
    $("input[id*='EndDate_']").each(function(){
        if($(this).val() == ''){
            flag = 0;
            $(this).parent().prepend(error);
        }
    })
    
    if(flag == 1){
        saveBudget();
    } else {
        $('html, body').animate({
            scrollTop: $('.mandatory-error').offset().top - 195
        }, 0);
    }
}

function saveBudget() {
    var msg = '确定要将此内容保存提交吗？';
    
    Ewin.confirm({ message: msg }).on(function (e) {
        if (!e) {
            return;
        } else {
            $('.modal.in').hide().remove();
        }
        
        var index;
        var fixedList = [];
        var len = $("#fixed").find("tr").length;
        var map = [];
        $("#fixed").find("tr.new").each(function(i,e){
            var fixed = {};
            index = i * 1 + 1;
            fixed.april = numberWithoutCommas($('#fixed_4_'+index).val());
            fixed.area = $.budget.unitArea;
            fixed.august = numberWithoutCommas($('#fixed_8_'+index).val());
            fixed.december = numberWithoutCommas($('#fixed_12_'+index).val());
            fixed.endDate = $('#fixedEndDate_'+index).val();
            fixed.february = numberWithoutCommas($('#fixed_2_'+index).val());
            fixed.january = numberWithoutCommas($('#fixed_1_'+index).val());
            fixed.july = numberWithoutCommas($('#fixed_7_'+index).val());
            fixed.june = numberWithoutCommas($('#fixed_6_'+index).val());
            fixed.lockFlag = 0;
            fixed.mallCode = $.budget.mallCode;
            fixed.march = numberWithoutCommas($('#fixed_3_'+index).val());
            fixed.may = numberWithoutCommas($('#fixed_5_'+index).val());
            fixed.november = numberWithoutCommas($('#fixed_11_'+index).val());
            fixed.october = numberWithoutCommas($('#fixed_10_'+index).val());
            fixed.september = numberWithoutCommas($('#fixed_9_'+index).val());
            fixed.shopCode = $.budget.code;
            fixed.startDate = $('#fixedStartDate_'+index).val();
            fixed.termType = "B011";
            fixed.total = numberWithoutCommas($('#fixedTotal_'+index).val());
            fixed.unitCode = $.budget.unitCode;
            fixed.year = $('#fixedStartDate_'+index).val().split('-')[0];
            if($(this).attr('data-id') != ''){
                fixed.id = $(this).attr('data-id');
            }

            fixedList.push(fixed);
        })
        
        if(fixedList.length > 0) {
            map = fixedList;
            for(var ln = 1; ln < len; ln++){
                var year1 = $('#fixedStartDate_'+ln).val().split('-')[0];
                var year2 = $('#fixedStartDate_'+(ln+1)).val().split('-')[0];
                if(year1 == year2){
                    alertMsg('9999','此次提交的固定租金预算年份已经存在，请修改重新提交！');
                    return false;
                }
            }
        }
        
        var perpertyMgmtList = [];
        var len = $("#perpertyMgmt").find("tr").length;
        $("#perpertyMgmt").find("tr.new").each(function(i,e){
            var perpertyMgmt = {};
            index = i * 1 + 1;
            perpertyMgmt.april = numberWithoutCommas($('#perpertyMgmt_4_'+index).val());
            perpertyMgmt.area = $.budget.unitArea;
            perpertyMgmt.august = numberWithoutCommas($('#perpertyMgmt_8_'+index).val());
            perpertyMgmt.december = numberWithoutCommas($('#perpertyMgmt_12_'+index).val());
            perpertyMgmt.endDate = $('#perpertyMgmtEndDate_'+index).val();
            perpertyMgmt.february = numberWithoutCommas($('#perpertyMgmt_2_'+index).val());
            perpertyMgmt.january = numberWithoutCommas($('#perpertyMgmt_1_'+index).val());
            perpertyMgmt.july = numberWithoutCommas($('#perpertyMgmt_7_'+index).val());
            perpertyMgmt.june = numberWithoutCommas($('#perpertyMgmt_6_'+index).val());
            perpertyMgmt.lockFlag = 0;
            perpertyMgmt.mallCode = $.budget.mallCode;
            perpertyMgmt.march = numberWithoutCommas($('#perpertyMgmt_3_'+index).val());
            perpertyMgmt.may = numberWithoutCommas($('#perpertyMgmt_5_'+index).val());
            perpertyMgmt.november = numberWithoutCommas($('#perpertyMgmt_11_'+index).val());
            perpertyMgmt.october = numberWithoutCommas($('#perpertyMgmt_10_'+index).val());
            perpertyMgmt.september = numberWithoutCommas($('#perpertyMgmt_9_'+index).val());
            perpertyMgmt.shopCode = $.budget.code;
            perpertyMgmt.startDate = $('#perpertyMgmtStartDate_'+index).val();
            perpertyMgmt.termType = "B021";
            perpertyMgmt.total = numberWithoutCommas($('#perpertyMgmtTotal_'+index).val());
            perpertyMgmt.unitCode = $.budget.unitCode;
            perpertyMgmt.year = $('#perpertyMgmtStartDate_'+index).val().split('-')[0];
            if($(this).attr('data-id') != ''){
                perpertyMgmt.id = $(this).attr('data-id');
            }

            perpertyMgmtList.push(perpertyMgmt);
        })
        
        if(perpertyMgmtList.length > 0) {
            map = fixedList.concat(perpertyMgmtList);
            for(var ln = 1; ln < len; ln++){
                var year1 = $('#perpertyMgmtStartDate_'+ln).val().split('-')[0];
                var year2 = $('#perpertyMgmtStartDate_'+(ln+1)).val().split('-')[0];
                if(year1 == year2){
                    alertMsg('9999','此次提交的物业管理费预算年份已经存在，请修改重新提交！');
                    return false;
                }
            }
        } 
        
        var commissionList = [];
        var len = $("#commission").find("tr").length;
        $("#commission").find("tr.new").each(function(i,e){
            var commission = {};
            index = i * 1 + 1;
            commission.april = numberWithoutCommas($('#commission_4_'+index).val());
            commission.area = $.budget.unitArea;
            commission.august = numberWithoutCommas($('#commission_8_'+index).val());
            commission.december = numberWithoutCommas($('#commission_12_'+index).val());
            commission.endDate = $('#commissionEndDate_'+index).val();
            commission.february = numberWithoutCommas($('#commission_2_'+index).val());
            commission.january = numberWithoutCommas($('#commission_1_'+index).val());
            commission.july = numberWithoutCommas($('#commission_7_'+index).val());
            commission.june = numberWithoutCommas($('#commission_6_'+index).val());
            commission.lockFlag = 0;
            commission.mallCode = $.budget.mallCode;
            commission.march = numberWithoutCommas($('#commission_3_'+index).val());
            commission.may = numberWithoutCommas($('#commission_5_'+index).val());
            commission.november = numberWithoutCommas($('#commission_11_'+index).val());
            commission.october = numberWithoutCommas($('#commission_10_'+index).val());
            commission.september = numberWithoutCommas($('#commission_9_'+index).val());
            commission.shopCode = $.budget.code;
            commission.startDate = $('#commissionStartDate_'+index).val();
            commission.termType = "G011";
            commission.total = numberWithoutCommas($('#commissionTotal_'+index).val());
            commission.unitCode = $.budget.unitCode;
            commission.year = $('#commissionStartDate_'+index).val().split('-')[0];
            if($(this).attr('data-id') != ''){
                commission.id = $(this).attr('data-id');
            }

            commissionList.push(commission);
        })
        
        if(commissionList.length > 0) {
            map = map.concat(commissionList);
            for(var ln = 1; ln < len; ln++){
                var year1 = $('#commissionStartDate_'+ln).val().split('-')[0];
                var year2 = $('#commissionStartDate_'+(ln+1)).val().split('-')[0];
                if(year1 == year2){
                    alertMsg('9999','此次提交的提成扣率预算年份已经存在，请修改重新提交！');
                    return false;
                }
            }
        }
        
        var promotionList = [];
        var len = $("#promotion").find("tr").length;
        $("#promotion").find("tr.new").each(function(i,e){
            var promotion = {};
            index = i * 1 + 1;
            promotion.april = numberWithoutCommas($('#promotion_4_'+index).val());
            promotion.area = $.budget.unitArea;
            promotion.august = numberWithoutCommas($('#promotion_8_'+index).val());
            promotion.december = numberWithoutCommas($('#promotion_12_'+index).val());
            promotion.endDate = $('#promotionEndDate_'+index).val();
            promotion.february = numberWithoutCommas($('#promotion_2_'+index).val());
            promotion.january = numberWithoutCommas($('#promotion_1_'+index).val());
            promotion.july = numberWithoutCommas($('#promotion_7_'+index).val());
            promotion.june = numberWithoutCommas($('#promotion_6_'+index).val());
            promotion.lockFlag = 0;
            promotion.mallCode = $.budget.mallCode;
            promotion.march = numberWithoutCommas($('#promotion_3_'+index).val());
            promotion.may = numberWithoutCommas($('#promotion_5_'+index).val());
            promotion.november = numberWithoutCommas($('#promotion_11_'+index).val());
            promotion.october = numberWithoutCommas($('#promotion_10_'+index).val());
            promotion.september = numberWithoutCommas($('#promotion_9_'+index).val());
            promotion.shopCode = $.budget.code;
            promotion.startDate = $('#promotionStartDate_'+index).val();
            promotion.termType = "D011";
            promotion.total = numberWithoutCommas($('#promotionTotal_'+index).val());
            promotion.unitCode = $.budget.unitCode;
            promotion.year = $('#promotionStartDate_'+index).val().split('-')[0];
            if($(this).attr('data-id') != ''){
                promotion.id = $(this).attr('data-id');
            }

            promotionList.push(promotion);
        })
        
        if(promotionList.length > 0) {
            map = map.concat(promotionList);
            for(var ln = 1; ln < len; ln++){
                var year1 = $('#promotionStartDate_'+ln).val().split('-')[0];
                var year2 = $('#promotionStartDate_'+(ln+1)).val().split('-')[0];
                if(year1 == year2){
                    alertMsg('9999','此次提交的固定推广费预算年份已经存在，请修改重新提交！');
                    return false;
                }
            }
        }
        
        var salesList = [];
        var len = $("#sales").find("tr").length;
        $("#sales").find("tr.new").each(function(i,e){
            var sales = {};
            index = i * 1 + 1;
            sales.april = numberWithoutCommas($('#sales_4_'+index).val());
            sales.area = $.budget.unitArea;
            sales.august = numberWithoutCommas($('#sales_8_'+index).val());
            sales.december = numberWithoutCommas($('#sales_12_'+index).val());
            sales.endDate = $('#salesEndDate_'+index).val();
            sales.february = numberWithoutCommas($('#sales_2_'+index).val());
            sales.january = numberWithoutCommas($('#sales_1_'+index).val());
            sales.july = numberWithoutCommas($('#sales_7_'+index).val());
            sales.june = numberWithoutCommas($('#sales_6_'+index).val());
            sales.lockFlag = 0;
            sales.mallCode = $.budget.mallCode;
            sales.march = numberWithoutCommas($('#sales_3_'+index).val());
            sales.may = numberWithoutCommas($('#sales_5_'+index).val());
            sales.november = numberWithoutCommas($('#sales_11_'+index).val());
            sales.october = numberWithoutCommas($('#sales_10_'+index).val());
            sales.september = numberWithoutCommas($('#sales_9_'+index).val());
            sales.shopCode = $.budget.code;
            sales.startDate = $('#salesStartDate_'+index).val();
            sales.termType = "SALES";
            sales.total = numberWithoutCommas($('#salesTotal_'+index).val());
            sales.unitCode = $.budget.unitCode;
            sales.year = $('#salesStartDate_'+index).val().split('-')[0];
            if($(this).attr('data-id') != ''){
                sales.id = $(this).attr('data-id');
            }

            salesList.push(sales);
        })
        
        if(salesList.length > 0) {
            map = map.concat(salesList);
            for(var ln = 1; ln < len; ln++){
                var year1 = $('#salesStartDate_'+ln).val().split('-')[0];
                var year2 = $('#salesStartDate_'+(ln+1)).val().split('-')[0];
                if(year1 == year2){
                    alertMsg('9999','此次提交的预估销售额预算年份已经存在，请修改重新提交！');
                    return false;
                }
            }
        }
        
        if(map.length > 0){
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
        } else {
            alertMsg('9999','没有更新无需提交！');
        }
    })
}