$(document).ready(function(){
    $('.weui-tabbar a').removeClass('weui-bar__item_on');
    $('.weui-tabbar a:eq(0)').addClass('weui-bar__item_on');
    
    $('#slide1').swipeSlide({
        autoSwipe:true,//自动切换默认是
        speed:3000,//速度默认4000
        continuousScroll:true,//默认否
        transitionType:'cubic-bezier(0.22, 0.69, 0.72, 0.88)',//过渡动画linear/ease/ease-in/ease-out/ease-in-out/cubic-bezier
        lazyLoad:true,//懒加载默认否
        firstCallback : function(i,sum,me){
            //me.find('.dot').children().first().addClass('cur');
        },
        callback : function(i,sum,me){
            //me.find('.dot').children().eq(i).addClass('cur').siblings().removeClass('cur');
        }
    });
    
    (function($) {
        $('.livechat-girl').animate({right:'0'},'fast',function(){
            $("#hint1").removeClass("hide_hint").addClass("show_hint");
        });
	setInterval(function(){
            if($(".animated-circles").hasClass("animated")){
                $(".animated-circles").removeClass("animated");
            }else{
                $(".animated-circles").addClass('animated');
            }
	},3000);
	var hint1 = setInterval(function(){
            $("#hint1").removeClass("show_hint").addClass("hide_hint");
            $("#hint2").removeClass("hide_hint").addClass("show_hint");
            clearInterval(hint1);
	},5500);
        
        var hint2 = setInterval(function(){
            $("#hint2").removeClass("show_hint").addClass("hide_hint");
            clearInterval(hint2);
            $('.livechat-girl').animate({right:'-100px'},'slow');
	},11500);
	/*$(".livechat-girl").hover(function(){
            clearInterval(hint1);
            $(".livechat-hint").removeClass("hide_hint").addClass("show_hint");
	},function(){
            $(".livechat-hint").removeClass("show_hint").addClass("hide_hint");
	}).click(function(){
            var oWidth = 606,
            oHeight = 630,
            top = ($(window).height()/2)-(oHeight/2),
            left = ($(window).width()/2)-(oWidth/2);
            window.open('#','','width='+oWidth+',height='+oHeight+',scrollbars=yes,top='+top+',left='+left+',resizable=yes');
	})*/;
    })(jQuery);
    
    audioplay('voiceplayer');
})

$(window).load(function() {
    $(".media-box-access").each(function(){
        $(this).css('height',$(this).parent().find('.weui-media-box__hd').height());
    });
}); 

function audioplay(id){
    var audio = document.getElementById(id);
    !audio.paused?audio.pause():audio.play();

    document.addEventListener("WeixinJSBridgeReady", function () {
        !audio.paused?audio.pause():audio.play();
    }, false);
}

function redirectToLeasing(){
    $('#mall_list').find('a:eq(0)').attr('href','/v2/floor-plan?f=8&type=leasing');
    $('#mall_list').toggle();
}

function redirectToEvents(){
    $('#mall_list').find('a:eq(0)').attr('href','/v2/events?type=events');
    $('#mall_list').toggle();
}

function redirectToAds(){
    $('#mall_list').find('a:eq(0)').attr('href','/v2/advertising?f=8&type=ads');
    $('#mall_list').toggle();
}