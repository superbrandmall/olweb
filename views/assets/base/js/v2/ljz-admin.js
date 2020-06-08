$(document).ready(function(){
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
            $("#hint3").removeClass("hide_hint").addClass("show_hint");
            clearInterval(hint2);
	},10500);
        
        var hint3 = setInterval(function(){
            $("#hint3").removeClass("show_hint").addClass("hide_hint");
            clearInterval(hint3);
            $('.livechat-girl').animate({right:'-100px'},'slow');
	},15500);
    })(jQuery);
    
    audioplay('voiceplayer');
    
    $('#slide1').swipeSlide({
        autoSwipe:true,//自动切换默认是
        speed:3000,//速度默认4000
        continuousScroll:true,//默认否
        transitionType:'cubic-bezier(0.22, 0.69, 0.72, 0.88)',//过渡动画linear/ease/ease-in/ease-out/ease-in-out/cubic-bezier
        lazyLoad:true,//懒加载默认否
        firstCallback : function(i,sum,me){
            me.find('.dot').children().first().addClass('cur');
        },
        callback : function(i,sum,me){
            me.find('.dot').children().eq(i).addClass('cur').siblings().removeClass('cur');
        }
    });
    
    weui.slider('#slider', {
        step: 10,
        defaultValue: 40,
        onChange: function(percent){
            if(percent >= 0 && percent <= 10) {
                $('.mall-floors a.active').removeClass('active');
                $('.mall-floors .weui-grid:eq(8)').find('a').addClass('active');
                $('.floor-guide .weui-media-box__bd').hide();
                $('.floor-guide .weui-media-box__bd:eq(9)').show();
            } else if(percent > 10 && percent <= 20) {
                $('.mall-floors a.active').removeClass('active');
                $('.mall-floors .weui-grid:eq(9)').find('a').addClass('active');
                $('.floor-guide .weui-media-box__bd').hide();
                $('.floor-guide .weui-media-box__bd:eq(8)').show();
            } else if(percent > 20 && percent <= 30) {
                $('.mall-floors a.active').removeClass('active');
                $('.mall-floors .weui-grid:eq(4)').find('a').addClass('active');
                $('.floor-guide .weui-media-box__bd').hide();
                $('.floor-guide .weui-media-box__bd:eq(7)').show();
            } else if(percent > 30 && percent <= 40) {
                $('.mall-floors a.active').removeClass('active');
                $('.mall-floors .weui-grid:eq(5)').find('a').addClass('active');
                $('.floor-guide .weui-media-box__bd').hide();
                $('.floor-guide .weui-media-box__bd:eq(6)').show();
            } else if(percent > 40 && percent <= 50) {
                $('.mall-floors a.active').removeClass('active');
                $('.mall-floors .weui-grid:eq(6)').find('a').addClass('active');
                $('.floor-guide .weui-media-box__bd').hide();
                $('.floor-guide .weui-media-box__bd:eq(5)').show();
            } else if(percent > 50 && percent <= 60) {
                $('.mall-floors a.active').removeClass('active');
                $('.mall-floors .weui-grid:eq(7)').find('a').addClass('active');
                $('.floor-guide .weui-media-box__bd').hide();
                $('.floor-guide .weui-media-box__bd:eq(4)').show();
            } else if(percent > 60 && percent <= 70) {
                $('.mall-floors a.active').removeClass('active');
                $('.mall-floors .weui-grid:eq(0)').find('a').addClass('active');
                $('.floor-guide .weui-media-box__bd').hide();
                $('.floor-guide .weui-media-box__bd:eq(3)').show();
            } else if(percent > 70 && percent <= 80) {
                $('.mall-floors a.active').removeClass('active');
                $('.mall-floors .weui-grid:eq(1)').find('a').addClass('active');
                $('.floor-guide .weui-media-box__bd').hide();
                $('.floor-guide .weui-media-box__bd:eq(2)').show();
            } else if(percent > 80 && percent <= 90) {
                $('.mall-floors a.active').removeClass('active');
                $('.mall-floors .weui-grid:eq(2)').find('a').addClass('active');
                $('.floor-guide .weui-media-box__bd').hide();
                $('.floor-guide .weui-media-box__bd:eq(1)').show();
            } else if(percent > 90 && percent <= 100) {
                $('.mall-floors a.active').removeClass('active');
                $('.mall-floors .weui-grid:eq(3)').find('a').addClass('active');
                $('.floor-guide .weui-media-box__bd').hide();
                $('.floor-guide .weui-media-box__bd:eq(0)').show();
            }
        }
    });

    $('.mall-floors .weui-grid').each(function(i){
        var per, index;
        $(this).find('a').click(function(){
            switch(i) {
                case 0:
                   per = 70;
                   index = 3;
                   break;
                case 1:
                   per = 80;
                   index = 2;
                   break;
                case 2:
                   per = 90;
                   index = 1;
                   break;
                case 3:
                   per = 100;
                   index = 0;
                   break;
                case 4:
                   per = 30;
                   index = 7;
                   break;
                case 5:
                   per = 40;
                   index = 6;
                   break;
                case 6:
                   per = 50;
                   index = 5;
                   break;
                case 7:
                   per = 60;
                   index = 4;
                   break;
                case 8:
                   per = 10;
                   index = 9;
                   break;
                case 9:
                   per = 20;
                   index = 8;
                   break;
                default:
                   per = 40;
                   index = 6;
            }
            
            $('.mall-floors a.active').removeClass('active');
            $('.mall-floors .weui-grid:eq('+i+')').find('a').addClass('active');
            $('.floor-guide .weui-media-box__bd').hide();
            $('.floor-guide .weui-media-box__bd:eq('+index+')').show();
            $('.weui-slider__track').css('width', per + '%');
            $('.weui-slider__handler').css('left', per + '%');
        })
    })
    
    $(function(){
        var sliderTrack = $('#sliderTrack'),
            sliderHandler = $('#sliderHandler');
 
        var totalLen = $('#sliderInner').width(),
            startLeft = 0,
            startX = 0;
 
        $('.weui-slider__handler')
        .on('touchstart', function (e) {
            startLeft = parseInt(sliderHandler.css('left')) * totalLen / 100;
            startX = e.originalEvent.changedTouches[0].clientX; //移动端
           //pc端：e.originalEvent.clientX;
        })
        .on('touchmove', function(e){
            var dist = startLeft + e.originalEvent.changedTouches[0].clientX - startX,
            //pc端：e.originalEvent.clientX;               
            percent;
            dist = dist < 0 ? 0 : dist > totalLen ? totalLen : dist;
            percent =  parseInt(dist / totalLen * 100);

            sliderTrack.css('width', percent + '%');
            sliderHandler.css('left', percent + '%');
            
            e.preventDefault();
        })
       .on('touchend',function(e){
           //代码
        });
    });
    
    ContentOwlcarousel();
    ContentOwlcarousel2();
});

function showFloorVR(id){
    $("#floor_vr iframe").attr('src',"/upload/vr/100001/floors/"+id+"/tour.html");
    $("#floor_vr").show();
}

function audioplay(id){
    var audio = document.getElementById(id);
    !audio.paused?audio.pause():audio.play();

    document.addEventListener("WeixinJSBridgeReady", function () {
        !audio.paused?audio.pause():audio.play();
    }, false);
}

function ContentOwlcarousel() {
    $('.owl-carousel1').owlCarousel({
        loop: true,
        margin: 0,
        dots: true,
        responsive:{
            0:{
                items:1
            },
            600:{
                items:2
            },
            1000:{
                items:3
            }
        }
    })
};

function ContentOwlcarousel2() {
    $('.owl-carousel2').owlCarousel({
        loop: true,
        margin: 0,
        dots: false,
        autoplay: true,
        responsive:{
            0:{
                items:2
            },
            600:{
                items:3
            },
            1000:{
                items:4
            }
        }
    })
};