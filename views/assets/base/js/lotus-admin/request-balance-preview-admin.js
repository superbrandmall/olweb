$(document).ready(function(){
    var init = 0;
    if($.cookie('balanceMallVal') != null && $.cookie('balanceMallVal') != 'null'){
        var newOption = new Option($.cookie('balanceMallTxt'), $.cookie('balanceMallVal'), true, true);
        $('#department').append(newOption).trigger('change');
        init++;
    }
    
    if($.cookie('balanceSelectStoreVal') != null && $.cookie('balanceSelectStoreVal') != 'null'){
        var newOption = new Option($.cookie('balanceSelectStoreTxt'), $.cookie('balanceSelectStoreVal'), true, true);
        $('#selectStore').append(newOption).trigger('change');
        init++;
    }
    
    if($.cookie('balanceUnitType') != null && $.cookie('balanceUnitType') != 'null' && $.cookie('balanceUnitType') != ''){
        $('#unitType').val($.cookie('balanceUnitType')).trigger('change');
    }
    
    if($.cookie('balanceTermType') != null && $.cookie('balanceTermType') != 'null'){
        $('#termType').val($.cookie('balanceTermType')).trigger('change');
    }
    
    if($.cookie('balanceYearMonth') != null && $.cookie('balanceYearMonth') != 'null'){
        $('#yearMonth').val($.cookie('balanceYearMonth'));
    }
    
    $('#termType').show();
    
    if($("#department").val() != '' && $("#department").val() != null){
        updateSelectStoreDropDownByMallCode(10,$("#department").val());
    }
    
    $("#department, #unitType").on('change',function(){
        updateSelectStoreDropDownByMallCode(10,$('#department').val());
    })
    
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
        $('#termType,#unitType,#department, #selectStore').val('').trigger('change');
        $('#yearMonth').val('');
        
        $.cookie('balanceTermType', null);
        $.cookie('balanceUnitType', null);
        $.cookie('balanceSelectStoreTxt', null);
        $.cookie('balanceSelectStoreVal', null);
        $.cookie('balanceMallTxt', null);
        $.cookie('balanceMallVal', null);
        $.cookie('balanceYearMonth', null);
    })
    
    $('#search').click(function(){
        $('#totalAmount, #totalTaxAmount').text(accounting.formatNumber(0));
        $.cookie('balanceTermType', $('#termType').val());
        $.cookie('balanceUnitType', $('#unitType').val());
        $.cookie('balanceSelectStoreVal', $('#selectStore').val());
        $.cookie('balanceSelectStoreTxt', $('#select2-selectStore-container').attr('title'));
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
    
    if($('#selectStore').val() == null){
        flag = 0;
        $('#selectStore').parent().prepend(error);
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
        "columnName": "mallCode",
        "columnPatten": "",
        "conditionOperator": "AND",
        "operator": "=",
        "value": $.cookie('balanceMallVal')
    },{
        "columnName": "shopCode",
        "columnPatten": "",
        "operator": "AND",
        "value": $.cookie('balanceSelectStoreVal').split(':::')[1]
    }]

//    if($.cookie('balanceTermType') != null && $.cookie('balanceTermType') != 'null' && $.cookie('balanceTermType') != ''){
//        param = {
//            "columnName": "itemCode",
//            "columnPatten": "",
//            "conditionOperator": "AND",
//            "operator": "=",
//            "value": $.cookie('balanceTermType')
//        }
//        params.push(param);
//    }
//
//    if($.cookie('balanceYearMonth') != null & $.cookie('balanceYearMonth') != 'null' && $.cookie('balanceYearMonth') != ''){
//        param = {
//            "columnName": "yyyymm",
//            "columnPatten": "",
//            "conditionOperator": "AND",
//            "operator": "=",
//            "value": $.cookie('balanceYearMonth').split('-')[0]+$.cookie('balanceYearMonth').split('-')[1]
//        }
//        params.push(param);
//    }

    var map = {
        "conditionGroups": conditionGroups,
        "params": params
    }
                
    $.ajax({
        url: $.api.baseLotus+"/api/rent/contract/form/findAllByKVCondition?page=0&size=1000&sort=id,asc",
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
                
                $.totalAmount = 0
                $.totalTaxAmount = 0;
                $.row = 0;
                $('#balance').html('');
                if(response.data.content.length > 0){
                    $.each(response.data.content, function(i,v){
                        if(v.rentCalcList != null && v.rentCalcList.length > 0){
                            renderBalance(JSON.stringify(v.rentCalcList));
                        }
                        
                        if(v.propertyCalcList != null && v.propertyCalcList.length > 0){
                            renderBalance(JSON.stringify(v.propertyCalcList));
                        }
                        
                        if(v.promotionCalcList != null && v.promotionCalcList.length > 0){
                            renderBalance(JSON.stringify(v.promotionCalcList));
                        }
                        
                        if(v.deductCalcList != null && v.deductCalcList.length > 0){
                            renderBalance(JSON.stringify(v.deductCalcList));
                        }
                    })
                    $('#totalTaxAmount').text(accounting.formatNumber($.totalTaxAmount));
                    $('#totalAmount').text(accounting.formatNumber($.totalAmount));
                } else {
                    $('#balance').html('<tr><td colspan="9" style="text-align: center;">没有找到任何记录！</td></tr>');
                }
            } else {
                alertMsg(response.code,response.customerMessage);
            }
        },
        complete: function () {
            setTimeout(function () {
                $('td').each(function(i,e){
                    $(this).attr('title',$(this).text());
                })
            },800);
        }
    })
}

function renderBalance(calcList){
    var obj = JSON.parse(calcList);
    $.each(obj, function(j,w){
        if(($.cookie('balanceTermType') != null && $.cookie('balanceTermType') != 'null' && $.cookie('balanceTermType') != '') 
                || ($.cookie('balanceYearMonth') != null && $.cookie('balanceYearMonth') != 'null' && $.cookie('balanceYearMonth') != '')){
            if($.cookie('balanceYearMonth') == null || $.cookie('balanceYearMonth') == 'null' || $.cookie('balanceYearMonth') == ''){
                if($.cookie('balanceTermType') == w.itemCode){
                    render();
                }
            } else if($.cookie('balanceTermType') == null || $.cookie('balanceTermType') == 'null' || $.cookie('balanceTermType') == ''){
                if($.cookie('balanceYearMonth').split('-')[0]+$.cookie('balanceYearMonth').split('-')[1] == w.yyyymm){
                    render();
                }
            } else {
                if($.cookie('balanceTermType') == w.itemCode && $.cookie('balanceYearMonth').split('-')[0]+$.cookie('balanceYearMonth').split('-')[1] == w.yyyymm){
                    render();
                }
            }
        } else {
            render();
        }
        
        function render(){
            $.totalTaxAmount += w.taxAmount;
            $.totalAmount += w.amount;
            $.row++;
            
            $('#balance').append('<tr>\n\
            <td>'+$.row+'</td>\n\
            <td>'+w.itemName+'['+w.itemCode+']</td>\n\
            <td>收</td>\n\
            <td>'+w.yyyymm+'</td>\n\
            <td>'+w.startDate+'～'+w.endDate+'</td>\n\
            <td>'+DecrMonth(w.startDate.split('-')[0]+'-'+w.startDate.split('-')[1]+'-01')+'</td>\n\
            <td>'+w.startDate.split('-')[0]+'-'+w.startDate.split('-')[1]+'-'+w.settleDay+'</td>\n\
            <td>'+accounting.formatNumber(w.taxAmount)+'</td>\n\
            <td>'+accounting.formatNumber(w.amount)+'</td>\n\
            </tr>');
        }
    })
}