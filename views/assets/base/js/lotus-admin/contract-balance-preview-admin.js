$(document).ready(function(){
    updateSelectContractDropDown(50);
    
    var init = 0;
    if($.cookie('balanceMallVal') != null && $.cookie('balanceMallVal') != 'null'){
        var newOption = new Option($.cookie('balanceMallTxt'), $.cookie('balanceMallVal'), true, true);
        $('#department').append(newOption).trigger('change');
        init++;
    }
    
    if($.cookie('balanceContractVal') != null && $.cookie('balanceContractVal') != 'null'){
        var newOption = new Option($.cookie('balanceContractTxt'), $.cookie('balanceContractVal'), true, true);
        $('#selectContract').append(newOption).trigger('change');
        init++;
    }
    
    if($.cookie('balanceTermType') != null && $.cookie('balanceTermType') != 'null'){
        $('#termType').val($.cookie('balanceTermType')).trigger('change');
    }
    
    if($.cookie('balanceYearMonth') != null && $.cookie('balanceYearMonth') != 'null'){
        $('#yearMonth').val($.cookie('balanceYearMonth'));
    }
    
    $('#termType').show();
    
    $('input.money').on('focus',function(){
        $(this).val(accounting.unformat($(this).val()));
    });
    
    $('input.money').on('blur',function(){
        $(this).val(accounting.formatNumber($(this).val()));
    });
    
    $('#yearMonth').datepicker({
        'language': 'zh-CN',
        'format': 'yyyy-mm',
        'todayHighlight': true,
        'startView': 'months',
        'maxViewMode': 'years',
        'minViewMode': 'months',
        'autoclose': true
    })
    
    $('#clear').click(function(){
        $('#termType').val('').trigger('change');
        $('#department, #selectContract').empty(); 
        $('#department, #selectContract').select2("val", "");
        $('#yearMonth').val('');
        
        $.cookie('balanceTermType', null);
        $.cookie('balanceContractTxt', null);
        $.cookie('balanceContractVal', null);
        $.cookie('balanceMallTxt', null);
        $.cookie('balanceMallVal', null);
        $.cookie('balanceYearMonth', null);
    })
    
    $('#search').click(function(){
        $('#totalAmount, #totalTaxAmount').text(accounting.formatNumber(0));
        $.cookie('balanceTermType', $('#termType').val());
        $.cookie('balanceContractVal', $('#selectContract').val());
        $.cookie('balanceContractTxt', $('#select2-selectContract-container').attr('title'));
        $.cookie('balanceMallVal', $('#department').val());
        $.cookie('balanceMallTxt', $('#select2-department-container').attr('title'));
        $.cookie('balanceYearMonth', $('#yearMonth').val());
        mandatoryCheck();
    })
    
    if(init == 2){
        $('#search').trigger('click');
    }
});

function mandatoryCheck() {
    $('.mandatory-error').remove();
    var flag = 1;
    var error = '<i class="fa fa-exclamation-circle mandatory-error" aria-hidden="true"></i>';
    
    if($('#department').val() == null || $('#department').val() == 'null'){
        flag = 0;
        $('#department').parent().prepend(error);
    }
    
    if($('#selectContract').val() == null){
        flag = 0;
        $('#selectContract').parent().prepend(error);
    }
    
    if(flag == 1){
        findBalanceByKVCondition();
    } else {
        $('html, body').animate({
            scrollTop: $('.mandatory-error').offset().top - 195
        }, 0);
    }
}

function findBalanceByKVCondition() {
    var params = [];
    var param = {};
    var conditionGroups = [];

    params = [{
        "columnName": "contractNo",
        "columnPatten": "",
        "conditionOperator": "AND",
        "operator": "=",
        "value": $.cookie('balanceContractVal')
    }]

    if($.cookie('balanceTermType') != null && $.cookie('balanceTermType') != 'null' && $.cookie('balanceTermType') != ''){
        param = {
            "columnName": "itemCode",
            "columnPatten": "",
            "conditionOperator": "AND",
            "operator": "=",
            "value": $.cookie('balanceTermType')
        }
        params.push(param);
    }

    if($.cookie('balanceYearMonth') != null & $.cookie('balanceYearMonth') != 'null' && $.cookie('balanceYearMonth') != ''){
        param = {
            "columnName": "yyyymm",
            "columnPatten": "",
            "conditionOperator": "AND",
            "operator": "=",
            "value": $.cookie('balanceYearMonth').split('-')[0]+$.cookie('balanceYearMonth').split('-')[1]
        }
        params.push(param);
    }

    var map = {
        "conditionGroups": conditionGroups,
        "params": params
    }
                
    $.ajax({
        url: $.api.baseLotus+"/api/contract/rent/calc/findAllByKVCondition?page=0&size=1000&sort=id,asc",
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
                
                $('#balance').html('');
                if(response.data.content.length > 0){
                    var totalAmount = 0, totalTaxAmount = 0;
                    $.each(response.data.content, function(i,v){
                        totalTaxAmount += v.taxAmount;
                        totalAmount += v.amount;
                        $('#balance').append('<tr>\n\
                        <td>'+(i*1+1)+'</td>\n\
                        <td>'+v.itemName+'['+v.itemCode+']</td>\n\
                        <td>收</td>\n\
                        <td>'+v.yyyymm+'</td>\n\
                        <td>'+v.startDate+'～'+v.endDate+'</td>\n\
                        <td>'+DecrMonth(v.startDate.split('-')[0]+'-'+v.startDate.split('-')[1]+'-01')+'</td>\n\
                        <td>'+v.startDate.split('-')[0]+'-'+v.startDate.split('-')[1]+'-'+v.settleDay+'</td>\n\
                        <td>'+accounting.formatNumber(v.taxAmount)+'</td>\n\
                        <td>'+accounting.formatNumber(v.amount)+'</td>\n\
                    </tr>');
                    })
                    $('#totalTaxAmount').text(accounting.formatNumber(totalTaxAmount));
                    $('#totalAmount').text(accounting.formatNumber(totalAmount));
                } else {
                    $('#balance').html('<tr><td colspan="9" style="text-align: center;">没有找到任何记录！</td></tr>');
                }
            } else {
                alertMsg(response.code,response.customerMessage);
            }
        }
    })
}