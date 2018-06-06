$.mall = '';
$.mallBidStandard = {};

$(document).ready(function(){
    if(getURLParameter('s')) {
        switch (getURLParameter('s')) {
            case "update-succeed":
                $('#ui_succeed').show().delay(10000).hide(0);
                $('html, body').animate({
                    scrollTop: $('#ui_succeed').offset().top
                }, 0);
                break;
            default:
        }
        setTimeout(function () {
            window.history.pushState("object or string", "Title", "/admin/"+refineOfferUrl() );
        },1000);
    }
    
    GetMallInfo();
    
     $('#submit').click(function(){
        SaveMallBidStandard();
    });
});

function GetMallInfo(){
    var map = {
        mall: {
            code: getURLParameter('id')
        }
    };
    $.ajax({
        url: $.api.base+"/mall/findByCode",
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
                
                var mall = response.data.mall;
                $.mall = mall;
                $('#code').val(mall.code || '-');
                $('#name').val(mall.mallName || '-');
                $('#gross_area').val((mall.grossFloorArea || '-' ) + '平方米');
                $('#leasing_area').val((mall.leasingArea || '-' ) + '平方米');
                $('#location').val(mall.location || '-');
                $('#desc').val(mall.description || '-');
                $('#hd_code').val(mall.hdCode || '-');
                
                if(response.data.traffics != null && response.data.traffics != ''){
                    var traffics = response.data.traffics;
                    $.each(traffics, function(i,v){
                        $('#traffics').append('\
<div class="col-lg-12">\n\
<div class="panel panel-default">\n\
<div class="panel-heading">'+v.type+'</div>\n\
<div class="panel-body"><p>'+v.text+'</p></div>\n\
</div></div>');
                    });
                }
                
                if(response.data.mallBidStandard != null && response.data.mallBidStandard != ''){
                    var mallBidStandard = response.data.mallBidStandard;
                    $.mallBidStandard = mallBidStandard; 
                    $('#rent_free_retail_1').val(mallBidStandard.rentFreeRetail_1 || '');
                    $('#rent_free_retail_2').val(mallBidStandard.rentFreeRetail_2 || '');
                    $('#rent_free_retail_3').val(mallBidStandard.rentFreeRetail_3 || '');
                    $('#rent_free_non_retail_1').val(mallBidStandard.rentFreeNonretail_1 || '');
                    $('#rent_free_non_retail_2').val(mallBidStandard.rentFreeNonretail_2 || '');
                    $('#rent_free_non_retail_3').val(mallBidStandard.rentFreeNonretail_3 || '');

                    $('#limit_retail_1').val(mallBidStandard.limitRetail_1 || '');
                    $('#limit_retail_2').val(mallBidStandard.limitRetail_2 || '');
                    $('#limit_retail_3').val(mallBidStandard.limitRetail_3 || '');
                    $('#limit_non_retail_1').val(mallBidStandard.limitNonretail_1 || '');
                    $('#limit_non_retail_2').val(mallBidStandard.limitNonretail_2 || '');
                    $('#limit_non_retail_3').val(mallBidStandard.limitNonretail_3 || '');

                    $('#rent_increase_1').val(mallBidStandard.rentIncrease_1 || '');
                    $('#rent_increase_2').val(mallBidStandard.rentIncrease_2 || '');
                    $('#promotion_budget').val(mallBidStandard.promotionBudget || '');
                    $('#maintenance_fee').val(mallBidStandard.maintenanceFee || '');
                }
            } 
        }
    });
}

function SaveMallBidStandard(){
    $.mallBidStandard.rentFreeRetail_1 = $('#rent_free_retail_1').val();
    $.mallBidStandard.rentFreeRetail_2 = $('#rent_free_retail_2').val();
    $.mallBidStandard.rentFreeRetail_3 = $('#rent_free_retail_3').val();
    $.mallBidStandard.rentFreeNonretail_1 = $('#rent_free_non_retail_1').val();
    $.mallBidStandard.rentFreeNonretail_2 = $('#rent_free_non_retail_2').val();
    $.mallBidStandard.rentFreeNonretail_3 = $('#rent_free_non_retail_3').val();
    
    $.mallBidStandard.limitRetail_1 = $('#limit_retail_1').val();
    $.mallBidStandard.limitRetail_2 = $('#limit_retail_2').val();
    $.mallBidStandard.limitRetail_3 = $('#limit_retail_3').val();
    $.mallBidStandard.limitNonretail_1 = $('#limit_non_retail_1').val();
    $.mallBidStandard.limitNonretail_2 = $('#limit_non_retail_2').val();
    $.mallBidStandard.limitNonretail_3 = $('#limit_non_retail_3').val();
    
    $.mallBidStandard.rentIncrease_1 = $('#rent_increase_1').val();
    $.mallBidStandard.rentIncrease_2 = $('#rent_increase_2').val();
    $.mallBidStandard.promotionBudget = $('#promotion_budget').val();
    $.mallBidStandard.maintenanceFee = $('#maintenance_fee').val();
    
    var map = {
        mall : $.mall,
        mallBidStandard: $.mallBidStandard
    };
    $.ajax({
        url: $.api.base+"/mall/saveOrUpdate",
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
            interpretBusinessCode(response.code);
            
            if(response.code === 'C0') {
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                }
                window.location.href = 'mall?id='+getURLParameter('id')+'&s=update-succeed';              
            }
        }
    });    
}