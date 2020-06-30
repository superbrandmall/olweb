$(document).ready(function(){
    $('#facial').click(function(){
        $('#facial img').attr('src','/views/assets/base/img/content/backgrounds/365000-2.jpg')
        setTimeout(function () {
            window.location.href = '/v2/pay-done?type=ads';
        },500);
    });
})