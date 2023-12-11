$.shop = {};

$(document).ready(function(){
    if(!sessionStorage.getItem("UNIT_TYPE") || sessionStorage.getItem("UNIT_TYPE") == null || sessionStorage.getItem("UNIT_TYPE") == '') {
        findDictCodeByDictTypeCode('UNIT_TYPE');
    }
    
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
    
    findShopByShopCode();
    findBudgetByShopCode();
})

function findShopByShopCode() {
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
                $.shop = data;
                $('#unitName').text(data.unitName);
                $('#unitCode').text(data.unitCode);
                $('#mall').val(data.mallName+'['+data.mallCode+']');
                $('#unitType').val(renderUnitType(data.unitType));
                $('#area').val(data.unitArea);
            }
        }
    })
}

function findBudgetByShopCode() {
    $.ajax({
        url: $.api.baseLotus+"/api/shop/budget/findAllByShopCode?shopCode="+getURLParameter('id'),
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
                if(data == null || data.length == 0){
                    $('#budgetStatus').removeClass('badge-success').addClass('badge-danger');
                    state = "未使用";
                }
                
                $('#budgetStatus').text(state);
                if(data != null && data.length > 0) {
                    data.sort(function(a,b){
                        if(a.year > b.year) return 1 ;
                        if(a.year < b.year) return -1 ;
                        return 0 ;
                    });
                    
                    $.each(data, function(i,v) {
                        switch (v.termType) {
                            case "B011":
                                updateRowInvestmentBudgetAccounttermFixed(JSON.stringify(v));
                                break;
                            case "B021":
                                updateRowInvestmentBudgetAccounttermPropertymgmt(JSON.stringify(v));
                                break;
                            case "D011":
                                updateRowInvestmentBudgetAccounttermCommission(JSON.stringify(v));
                                break;
                            case "G011":
                                updateRowInvestmentBudgetAccounttermPromotion(JSON.stringify(v));
                                break;
                            case "SALES":
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
    
    var remove = document.createElement("a");
    remove.setAttribute("href", "javascript:void(0);");
    var icon = document.createElement("i");
    icon.setAttribute("class", "fa fa-minus-circle");
    icon.setAttribute("style", "color: #ED4A52; font-size: 16px; opacity: 0.5");
    remove.appendChild(icon);
    column[14].appendChild(remove);

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

function updateRowInvestmentBudgetAccounttermPropertymgmt(v) {
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
    
    var table = document.getElementById('investmentBudgetAccounttermPropertymgmt');
    var tbody = table.querySelector('tbody') || table;
    var count = tbody.getElementsByTagName('tr').length + 1;
    column[0].innerText = count.toLocaleString();
    
    var div = document.createElement("div"); //期限
    div.setAttribute("class","input-daterange input-group");
    var input = document.createElement("input");
    input.setAttribute("class","form-control");
    input.setAttribute("id","propertymgmtStartDate_"+count.toLocaleString());
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
    input2.setAttribute("id","propertymgmtEndDate_"+count.toLocaleString());
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
        input.setAttribute("id","propertymgmt_"+i+"_"+count.toLocaleString());
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
    
    var remove = document.createElement("a");
    remove.setAttribute("href", "javascript:void(0);");
    var icon = document.createElement("i");
    icon.setAttribute("class", "fa fa-minus-circle");
    icon.setAttribute("style", "color: #ED4A52; font-size: 16px; opacity: 0.5");
    remove.appendChild(icon);
    column[14].appendChild(remove);

    tbody.appendChild(newrow);
    $('#investmentBudgetAccounttermPropertymgmt .input-daterange').datepicker({
        'language': 'zh-CN',
        'format': 'yyyy-mm-dd',
        'todayHighlight': true,
        'autoclose': true
    });
    
    $('#investmentBudgetAccounttermPropertymgmt .select2').select2();
 
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
    
    var remove = document.createElement("a");
    remove.setAttribute("href", "javascript:void(0);");
    var icon = document.createElement("i");
    icon.setAttribute("class", "fa fa-minus-circle");
    icon.setAttribute("style", "color: #ED4A52; font-size: 16px; opacity: 0.5");
    remove.appendChild(icon);
    column[14].appendChild(remove);
    
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
    
    var remove = document.createElement("a");
    remove.setAttribute("href", "javascript:void(0);");
    var icon = document.createElement("i");
    icon.setAttribute("class", "fa fa-minus-circle");
    icon.setAttribute("style", "color: #ED4A52; font-size: 16px; opacity: 0.5");
    remove.appendChild(icon);
    column[14].appendChild(remove);
    
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
    
    var remove = document.createElement("a");
    remove.setAttribute("href", "javascript:void(0);");
    var icon = document.createElement("i");
    icon.setAttribute("class", "fa fa-minus-circle");
    icon.setAttribute("style", "color: #ED4A52; font-size: 16px; opacity: 0.5");
    remove.appendChild(icon);
    column[14].appendChild(remove);

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
        
        var fixedList = [];
        var len = $("#fixed").find("tr").length;
        var budgetList = [];
        $("#fixed").find("tr.new").each(function(i,e){
            var fixed = {};
            fixed.april = numberWithoutCommas($(this).find('input:eq(5)').val());
            fixed.area = $.shop.unitArea;
            fixed.august = numberWithoutCommas($(this).find('input:eq(9)').val());
            fixed.december = numberWithoutCommas($(this).find('input:eq(13)').val());
            fixed.endDate = $(this).find('input:eq(1)').val();
            fixed.february = numberWithoutCommas($(this).find('input:eq(3)').val());
            fixed.january = numberWithoutCommas($(this).find('input:eq(2)').val());
            fixed.july = numberWithoutCommas($(this).find('input:eq(8)').val());
            fixed.june = numberWithoutCommas($(this).find('input:eq(7)').val());
            fixed.lockFlag = 0;
            fixed.mallCode = $.shop.mallCode;
            fixed.march = numberWithoutCommas($(this).find('input:eq(4)').val());
            fixed.may = numberWithoutCommas($(this).find('input:eq(6)').val());
            fixed.november = numberWithoutCommas($(this).find('input:eq(12)').val());
            fixed.october = numberWithoutCommas($(this).find('input:eq(11)').val());
            fixed.september = numberWithoutCommas($(this).find('input:eq(10)').val());
            fixed.shopCode = $.shop.code;
            fixed.startDate = $(this).find('input:eq(0)').val();
            fixed.termType = "B011";
            fixed.total = 0;
            fixed.unitCode = $.shop.unitCode;
            fixed.year = $(this).find('input:eq(0)').val().split('-')[0];
            if($(this).attr('data-id') != ''){
                fixed.id = $(this).attr('data-id');
            }
            fixed.updateOpenId = openId;
            
            fixedList.push(fixed);
        })
        
        if(fixedList.length > 0) {
            budgetList = fixedList;
            for(var ln = 0; ln < len; ln++){
                var year1 = $('#fixedStartDate_'+(ln+1)).val().split('-')[0];
                var year2 = $('#fixedStartDate_'+len).val().split('-')[0];
                var year3 = $('#fixedEndDate_'+(ln+1)).val().split('-')[0];
                var year4 = $('#fixedEndDate_'+len).val().split('-')[0];
                if(year1 == year2 && (ln+1) != len){
                    alertMsg('9999','固定租金预算年份重复，请修改重新提交！');
                    return false;
                } else if (year1 != year3 || year2 != year4){
                    alertMsg('9999','固定租金预算开始与结束年份不同，请修改重新提交！');
                    return false;
                }
            }
        }
        
        var propertymgmtList = [];
        var len = $("#propertymgmt").find("tr").length;
        $("#propertymgmt").find("tr.new").each(function(i,e){
            var propertymgmt = {};
            propertymgmt.april = numberWithoutCommas($(this).find('input:eq(5)').val());
            propertymgmt.area = $.shop.unitArea;
            propertymgmt.august = numberWithoutCommas($(this).find('input:eq(9)').val());
            propertymgmt.december = numberWithoutCommas($(this).find('input:eq(13)').val());
            propertymgmt.endDate = $(this).find('input:eq(1)').val();
            propertymgmt.february = numberWithoutCommas($(this).find('input:eq(3)').val());
            propertymgmt.january = numberWithoutCommas($(this).find('input:eq(2)').val());
            propertymgmt.july = numberWithoutCommas($(this).find('input:eq(8)').val());
            propertymgmt.june = numberWithoutCommas($(this).find('input:eq(7)').val());
            propertymgmt.lockFlag = 0;
            propertymgmt.mallCode = $.shop.mallCode;
            propertymgmt.march = numberWithoutCommas($(this).find('input:eq(4)').val());
            propertymgmt.may = numberWithoutCommas($(this).find('input:eq(6)').val());
            propertymgmt.november = numberWithoutCommas($(this).find('input:eq(12)').val());
            propertymgmt.october = numberWithoutCommas($(this).find('input:eq(11)').val());
            propertymgmt.september = numberWithoutCommas($(this).find('input:eq(10)').val());
            propertymgmt.shopCode = $.shop.code;
            propertymgmt.startDate = $(this).find('input:eq(0)').val();
            propertymgmt.termType = "B021";
            propertymgmt.total = 0;
            propertymgmt.unitCode = $.shop.unitCode;
            propertymgmt.year = $(this).find('input:eq(0)').val().split('-')[0];
            if($(this).attr('data-id') != ''){
                propertymgmt.id = $(this).attr('data-id');
            }
            propertymgmt.updateOpenId = openId;

            propertymgmtList.push(propertymgmt);
        })
        
        if(propertymgmtList.length > 0) {
            budgetList = fixedList.concat(propertymgmtList);
            for(var ln = 0; ln < len; ln++){
                var year1 = $('#propertymgmtStartDate_'+(ln+1)).val().split('-')[0];
                var year2 = $('#propertymgmtStartDate_'+len).val().split('-')[0];
                var year3 = $('#propertymgmtEndDate_'+(ln+1)).val().split('-')[0];
                var year4 = $('#propertymgmtEndDate_'+len).val().split('-')[0];
                if(year1 == year2 && (ln+1) != len){
                    alertMsg('9999','物业管理费预算年份重复，请修改重新提交！');
                    return false;
                } else if (year1 != year3 || year2 != year4){
                    alertMsg('9999','物业管理费预算开始与结束年份不同，请修改重新提交！');
                    return false;
                }
            }
        } 
        
        var commissionList = [];
        var len = $("#commission").find("tr").length;
        $("#commission").find("tr.new").each(function(i,e){
            var commission = {};
            commission.april = numberWithoutCommas($(this).find('input:eq(5)').val());
            commission.area = $.shop.unitArea;
            commission.august = numberWithoutCommas($(this).find('input:eq(9)').val());
            commission.december = numberWithoutCommas($(this).find('input:eq(13)').val());
            commission.endDate = $(this).find('input:eq(1)').val();
            commission.february = numberWithoutCommas($(this).find('input:eq(3)').val());
            commission.january = numberWithoutCommas($(this).find('input:eq(2)').val());
            commission.july = numberWithoutCommas($(this).find('input:eq(8)').val());
            commission.june = numberWithoutCommas($(this).find('input:eq(7)').val());
            commission.lockFlag = 0;
            commission.mallCode = $.shop.mallCode;
            commission.march = numberWithoutCommas($(this).find('input:eq(4)').val());
            commission.may = numberWithoutCommas($(this).find('input:eq(6)').val());
            commission.november = numberWithoutCommas($(this).find('input:eq(12)').val());
            commission.october = numberWithoutCommas($(this).find('input:eq(11)').val());
            commission.september = numberWithoutCommas($(this).find('input:eq(10)').val());
            commission.shopCode = $.shop.code;
            commission.startDate = $(this).find('input:eq(0)').val();
            commission.termType = "D011";
            commission.total = 0;
            commission.unitCode = $.shop.unitCode;
            commission.year = $(this).find('input:eq(0)').val().split('-')[0];
            if($(this).attr('data-id') != ''){
                commission.id = $(this).attr('data-id');
            }
            commission.updateOpenId = openId;

            commissionList.push(commission);
        })
        
        if(commissionList.length > 0) {
            budgetList = budgetList.concat(commissionList);
            for(var ln = 0; ln < len; ln++){
                var year1 = $('#commissionStartDate_'+(ln+1)).val().split('-')[0];
                var year2 = $('#commissionStartDate_'+len).val().split('-')[0];
                var year3 = $('#commissionEndDate_'+(ln+1)).val().split('-')[0];
                var year4 = $('#commissionEndDate_'+len).val().split('-')[0];
                if(year1 == year2 && (ln+1) != len){
                    alertMsg('9999','提成扣率预算年份重复，请修改重新提交！');
                    return false;
                } else if (year1 != year3 || year2 != year4){
                    alertMsg('9999','提成扣率预算开始与结束年份不同，请修改重新提交！');
                    return false;
                }
            }
        }
        
        var promotionList = [];
        var len = $("#promotion").find("tr").length;
        $("#promotion").find("tr.new").each(function(i,e){
            var promotion = {};
            promotion.april = numberWithoutCommas($(this).find('input:eq(5)').val());
            promotion.area = $.shop.unitArea;
            promotion.august = numberWithoutCommas($(this).find('input:eq(9)').val());
            promotion.december = numberWithoutCommas($(this).find('input:eq(13)').val());
            promotion.endDate = $(this).find('input:eq(1)').val();
            promotion.february = numberWithoutCommas($(this).find('input:eq(3)').val());
            promotion.january = numberWithoutCommas($(this).find('input:eq(2)').val());
            promotion.july = numberWithoutCommas($(this).find('input:eq(8)').val());
            promotion.june = numberWithoutCommas($(this).find('input:eq(7)').val());
            promotion.lockFlag = 0;
            promotion.mallCode = $.shop.mallCode;
            promotion.march = numberWithoutCommas($(this).find('input:eq(4)').val());
            promotion.may = numberWithoutCommas($(this).find('input:eq(6)').val());
            promotion.november = numberWithoutCommas($(this).find('input:eq(12)').val());
            promotion.october = numberWithoutCommas($(this).find('input:eq(11)').val());
            promotion.september = numberWithoutCommas($(this).find('input:eq(10)').val());
            promotion.shopCode = $.shop.code;
            promotion.startDate = $(this).find('input:eq(0)').val();
            promotion.termType = "G011";
            promotion.total = 0;
            promotion.unitCode = $.shop.unitCode;
            promotion.year = $(this).find('input:eq(0)').val().split('-')[0];
            if($(this).attr('data-id') != ''){
                promotion.id = $(this).attr('data-id');
            }
            promotion.updateOpenId = openId;

            promotionList.push(promotion);
        })
        
        if(promotionList.length > 0) {
            budgetList = budgetList.concat(promotionList);
            for(var ln = 0; ln < len; ln++){
                var year1 = $('#promotionStartDate_'+(ln+1)).val().split('-')[0];
                var year2 = $('#promotionStartDate_'+len).val().split('-')[0];
                var year3 = $('#promotionEndDate_'+(ln+1)).val().split('-')[0];
                var year4 = $('#promotionEndDate_'+len).val().split('-')[0];
                if(year1 == year2 && (ln+1) != len){
                    alertMsg('9999','固定推广费预算年份重复，请修改重新提交！');
                    return false;
                } else if (year1 != year3 || year2 != year4){
                    alertMsg('9999','固定推广费预算开始与结束年份不同，请修改重新提交！');
                    return false;
                }
            }
        }
        
        var salesList = [];
        var len = $("#sales").find("tr").length;
        $("#sales").find("tr.new").each(function(i,e){
            var sales = {};
            sales.april = numberWithoutCommas($(this).find('input:eq(5)').val());
            sales.area = $.shop.unitArea;
            sales.august = numberWithoutCommas($(this).find('input:eq(9)').val());
            sales.december = numberWithoutCommas($(this).find('input:eq(13)').val());
            sales.endDate = $(this).find('input:eq(1)').val();
            sales.february = numberWithoutCommas($(this).find('input:eq(3)').val());
            sales.january = numberWithoutCommas($(this).find('input:eq(2)').val());
            sales.july = numberWithoutCommas($(this).find('input:eq(8)').val());
            sales.june = numberWithoutCommas($(this).find('input:eq(7)').val());
            sales.lockFlag = 0;
            sales.mallCode = $.shop.mallCode;
            sales.march = numberWithoutCommas($(this).find('input:eq(4)').val());
            sales.may = numberWithoutCommas($(this).find('input:eq(6)').val());
            sales.november = numberWithoutCommas($(this).find('input:eq(12)').val());
            sales.october = numberWithoutCommas($(this).find('input:eq(11)').val());
            sales.september = numberWithoutCommas($(this).find('input:eq(10)').val());
            sales.shopCode = $.shop.code;
            sales.startDate = $(this).find('input:eq(0)').val();
            sales.termType = "SALES";
            sales.total = 0;
            sales.unitCode = $.shop.unitCode;
            sales.year = $(this).find('input:eq(0)').val().split('-')[0];
            if($(this).attr('data-id') != ''){
                sales.id = $(this).attr('data-id');
            }
            sales.updateOpenId = openId;

            salesList.push(sales);
        })
        
        if(salesList.length > 0) {
            budgetList = budgetList.concat(salesList);
            for(var ln = 0; ln < len; ln++){
                var year1 = $('#salesStartDate_'+(ln+1)).val().split('-')[0];
                var year2 = $('#salesStartDate_'+len).val().split('-')[0];
                var year3 = $('#salesEndDate_'+(ln+1)).val().split('-')[0];
                var year4 = $('#salesEndDate_'+len).val().split('-')[0];
                if(year1 == year2 && (ln+1) != len){
                    alertMsg('9999','预估销售额预算年份重复，请修改重新提交！');
                    return false;
                } else if (year1 != year3 || year2 != year4){
                    alertMsg('9999','预估销售额预算开始与结束年份不同，请修改重新提交！');
                    return false;
                }
            }
        }
        
        if(budgetList.length > 0){
            var openId = 'admin';
            $.each(JSON.parse($.cookie('userModules')), function(i,v) {
                if(v.roleCode == 'CROLE220301000001'){
                    openId = v.moduleName;
                    return false;
                }
            })
        
            var map = {
                "shopCode": $.shop.code,
                "updateOpenId": openId,
                "budgetList": budgetList
            }
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

                        window.location.href = '/lotus-admin/leasing-budget?s=succeed';
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