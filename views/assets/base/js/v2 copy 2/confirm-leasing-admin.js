$(document).ready(function(){
    $('#facial').click(function(){
        $('#facial img').attr('src','/views/assets/base/img/content/backgrounds/890000-2.jpg')
        setTimeout(function () {
            window.location.href = '/v2/pay-done?type=leasing';
        },500);
    });
})