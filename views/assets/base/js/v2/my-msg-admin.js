$(document).ready(function(){
    getMyMsg();
    
    $('.weui-tabbar a').removeClass('weui-bar__item_on');
    $('.weui-tabbar a:eq(2)').addClass('weui-bar__item_on');
});

function getMyMsg() {
    $.ajax({
        url: $.api.baseNew+"/comm-wechatol/api/wechatlog/findAllByMobileNoAndType?mobileNo="+$.cookie('uid')+"&type=我的消息&size=1000",
        type: "GET",
        async: false,
        beforeSend: function(request) {
            showLoading();
            request.setRequestHeader("Lang", $.cookie('lang'));
            request.setRequestHeader("Source", "onlineleasing");
        },
        complete: function(){},
        success: function (response, status, xhr) {
            if(response.code === 'C0') {
                hideLoading();
                if(response.data.content.length > 0){
                    $.each(response.data.content.reverse(), function(i,v){
                        $('.weui-panel__bd').append('<div class="weui-media-box weui-media-box_text" style="background: #fff; margin-bottom: 10px;"><h4 class="weui-media-box__title">'+v.name+'</h4>\n\
                            <p class="weui-media-box__desc">'+v.operatorContent+'</p>\n\
                            <ul class="weui-media-box__info">\n\
                                <li class="weui-media-box__info__meta">商户交易号: '+v.orderCode+'</li>\n\
                            </ul>\n\
                        </div>')
                    });
                } else {
                    $('.weui-panel__bd').html('<div style="padding: 40px; background-color: #fff;">\n\
<div class="icon-box"><i class="weui-icon-info weui-icon_msg"></i>\n\
<div class="icon-box__ctn"><h3 class="icon-box__title">提示</h3>\n\
<p class="icon-box__desc">您还没收到任何消息</p>\n\
</div></div></div>');
                }
            } else {
                interpretBusinessCode(response.customerMessage);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}