$(document).ready(function(){
    updateSelectContractDropDown(50);
    
    if($.cookie('balanceMallVal') != null && $.cookie('balanceMallVal') != 'null'){
        var newOption = new Option($.cookie('balanceMallTxt'), $.cookie('balanceMallVal'), true, true);
        $('#department').append(newOption).trigger('change');
    }
    
    if($.cookie('balanceContractVal') != null && $.cookie('balanceContractVal') != 'null'){
        var newOption = new Option($.cookie('balanceContractTxt'), $.cookie('balanceContractVal'), true, true);
        $('#selectContract').append(newOption).trigger('change');
    }
    
    if($.cookie('balanceMinSales') != null && $.cookie('balanceMinSales') != 'null'){
        $('#minSales').val($.cookie('balanceMinSales'));
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
        $('#minSales, #yearMonth').val('');
        
        $.cookie('balanceTermType', null);
        $.cookie('balanceContractTxt', null);
        $.cookie('balanceContractVal', null);
        $.cookie('balanceMallTxt', null);
        $.cookie('balanceMallVal', null);
        $.cookie('balanceMinSales', null);
        $.cookie('balanceYearMonth', null);
    })
    
    $('#search').click(function(){
        $.cookie('balanceTermType', $('#termType').val());
        $.cookie('balanceContractVal', $('#selectContract').val());
        $.cookie('balanceContractTxt', $('#select2-selectContract-container').attr('title'));
        $.cookie('balanceMallVal', $('#department').val());
        $.cookie('balanceMallTxt', $('#select2-department-container').attr('title'));
        $.cookie('balanceMinSales', $('#minSales').val());
        $.cookie('balanceYearMonth', $('#yearMonth').val());
        mandatoryCheck();
    })
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
        //findBalance();
    } else {
        $('html, body').animate({
            scrollTop: $('.mandatory-error').offset().top - 195
        }, 0);
    }
}

function findBalance(){
    $('#balance').html('');
    $.ajax({
        url: $.api.baseLotus+"/api/vshop/lotus/findAllByKVCondition?page="+(p-1)+"&size="+c+"&sort=id,desc",
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
        success: function (response, status, xhr) {
            $('#loader').hide();
            if(response.code === 'C0') {
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                }
            } else {
                alertMsg(response.code,response.customerMessage);
            }
        }
    });
}