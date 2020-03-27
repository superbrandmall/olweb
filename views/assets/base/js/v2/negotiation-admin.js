$(document).ready(function(){
    GetShopPriceInfo();
 
    $('#apply_price').click(function(){
        
    });
});

function GetShopPriceInfo(){
    var shopCode = getURLParameter('id') || null;
    
    var userCodeParameter = '';
    if($.cookie('uid') && $.cookie('uid') != ''){
        userCodeParameter = "?userCode="+$.cookie('uid');
    }
    
    $.ajax({
        url: $.api.baseNew+"/onlineleasing-customer/api/shop/"+shopCode+userCodeParameter+"",
        type: "GET",
        async: false,
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
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                }
                $('#room_name').text(response.data.shopName || '-');
                $('#area').text(response.data.area || '-');
                
                
                
                
                
            } else {
                interpretBusinessCode(response.customerMessage);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}