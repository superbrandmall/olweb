$(document).ready(function(){
    $(function(){
        var $iosDialog2 = '<div class="js_dialog" id="iosDialog2" style="display: none;">\n\
<div class="weui-mask">\n\
</div><div class="weui-dialog">\n\
<div class="weui-dialog__bd">确认甲乙双方用印已完成，请查收账单并付款！</div>\n\
<div class="weui-dialog__ft">\n\
<a href="javascript: redirect();" class="weui-dialog__btn weui-dialog__btn_primary">知道了</a>\n\
</div>\n\
</div> \n\
</div>';

        $('#stamping_completed').on('click', function(){
            if($('#iosDialog2').length > 0){
                $('#iosDialog2').remove();
            }
            $('body').append($iosDialog2);
            $('#iosDialog2').fadeIn(200);
        });
    });
});

function redirect() {
    window.location.href = '/v2/to-pay';
};