$(document).ready(function(){
    /*if(getURLParameter('type') && getURLParameter('type') == 'leasing'){
        $('#done').attr('src','/views/assets/base/img/content/backgrounds/890000-3.jpg');
    } else if(getURLParameter('type') && getURLParameter('type') == 'event'){
        $('#done').attr('src','/views/assets/base/img/content/backgrounds/5000-3.jpg');
    } else if(getURLParameter('type') && getURLParameter('type') == 'ads'){
        $('#done').attr('src','/views/assets/base/img/content/backgrounds/365000-3.jpg');
    }*/
    $('#done').attr('src','/views/assets/base/img/content/backgrounds/890000-3.jpg');
    
    updateOrderToPayed();
})

function updateOrderToPayed(){
    showLoading();
    $.ajax({
        url: $.api.baseNew+"/comm-wechatol/api/order/updateOrderStates?id="+getURLParameter('id')+"&orderStates=已完成订单",
        type: "POST",
        async: false,
        beforeSend: function(request) {
            request.setRequestHeader("Login", $.cookie('login'));
            request.setRequestHeader("Authorization", $.cookie('authorization'));
            request.setRequestHeader("Lang", $.cookie('lang'));
            request.setRequestHeader("Source", "onlineleasing");
        },
        complete: function(){},
        success: function (response, status, xhr) {
            if(response.code === 'C0') {
                hideLoading();
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                }
                
                window.location.href = '/v2/to-pay';
            } else {
                interpretBusinessCode(response.customerMessage);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}