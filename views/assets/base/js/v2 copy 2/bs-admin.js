$(document).ready(function(){
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
        step: 25,
        defaultValue: 50,
        onChange: function(percent){
            if(percent >= 0 && percent <= 25) {
                $('.mall-floors a.active').removeClass('active');
                $('.mall-floors .weui-grid:eq(0)').find('a').addClass('active');
                $('.floor-guide .weui-media-box__bd').hide();
                $('.floor-guide .weui-media-box__bd:eq(3)').show();
            } else if(percent > 25 && percent <= 50) {
                $('.mall-floors a.active').removeClass('active');
                $('.mall-floors .weui-grid:eq(1)').find('a').addClass('active');
                $('.floor-guide .weui-media-box__bd').hide();
                $('.floor-guide .weui-media-box__bd:eq(2)').show();
            } else if(percent > 50 && percent <= 75) {
                $('.mall-floors a.active').removeClass('active');
                $('.mall-floors .weui-grid:eq(2)').find('a').addClass('active');
                $('.floor-guide .weui-media-box__bd').hide();
                $('.floor-guide .weui-media-box__bd:eq(1)').show();
            } else if(percent > 75 && percent <= 100) {
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
                   per = 0;
                   break;
                case 1:
                   per = 33;
                   break;
                case 2:
                   per = 66;
                   break;
                case 3:
                   per = 100;
                   break;
                default:
                   per = 33;
            }
            
            $('.mall-floors a.active').removeClass('active');
            $('.mall-floors .weui-grid:eq('+i+')').find('a').addClass('active');
            $('.floor-guide .weui-media-box__bd').hide();
            $('.floor-guide .weui-media-box__bd:eq('+i+')').show();
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