$(document).ready(function(){
    $('.weui-tabbar a').removeClass('weui-bar__item_on');
    $('.weui-tabbar a:eq(1)').addClass('weui-bar__item_on');
});

function showVR(vr){
    $("#vr_viewer iframe").attr('src',vr);
    $("#vr_viewer").show();
}