$(document).ready(function(){
    $('.weui-tabbar a').removeClass('weui-bar__item_on');
    $('.weui-tabbar a:eq(3)').addClass('weui-bar__item_on');
    
    $('#uid').text($.cookie('uid'));
    $('#contact_name_1').text($.cookie('contact_name_1'));
});