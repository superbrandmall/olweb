$(document).ready(function(){
    $('#facial').click(function(){
        $('#facial img').attr('src','/views/assets/base/img/content/backgrounds/890000-2.jpg');
        $('#pay_1').css('background','#BABABA');
        setTimeout(function () {
            window.location.href = '/v2/pay-done?type=leasing&id='+getURLParameter('id');
        },500);
    });
});

function startPay(){
    $("#pay_1").show();
}