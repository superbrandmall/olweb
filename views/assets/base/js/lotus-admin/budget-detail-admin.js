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
        mandatoryCheck('save');
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
                            case "SALE":
                                updateRowInvestmentBudgetAccounttermSales(JSON.stringify(v));
                                break;
                            default:
                                break;
                        }
                    })
                }
            }
        }
    })
}