$(document).ready(function(){
    $('.skip').click(function(){
        $('#welcome').slideUp();
        
        setTimeout(function () {
            $('#welcome').remove();
        }, 500);
    });
    
    setTimeout(function () {
        $('#welcome').slideUp();
        
        setTimeout(function () {
            $('#welcome').remove();
        }, 500);
    }, 17000);
                
    $('.weui-tabbar a').removeClass('weui-bar__item_on');
    $('.weui-tabbar a:eq(0)').addClass('weui-bar__item_on');

    Modernizr.load({
        test: Modernizr.csstransforms3d && Modernizr.csstransitions,
        yep : ['/views/assets/plugins/jquery.min.js','/views/assets/plugins/folding/hoverfold.js'],
        nope: 'css/fallback.css',
        callback : function( url, result, key ) {
            if( url === '/views/assets/plugins/folding/hoverfold.js' ) {
                $('.main').hoverfold();
            }
        }
    });
    
    $('#slide1').swipeSlide({
        autoSwipe: false,
        speed:3000,
        continuousScroll: true,
        transitionType:'cubic-bezier(0.22, 0.69, 0.72, 0.88)',//过渡动画linear/ease/ease-in/ease-out/ease-in-out/cubic-bezier
        lazyLoad: false,
        firstCallback: function(i,sum,me){
            me.find('.mall_names').first().fadeIn();
            me.find('.mall_footers').first().fadeIn();
        },
        callback : function(i,sum,me){
            me.find('.mall_names').eq(i).fadeIn().siblings().hide();
            me.find('.mall_footers').eq(i).fadeIn().siblings().hide();
        }
    });
    
    $('#slide2').swipeSlide({
        autoSwipe: true,
        continuousScroll: true,
        transitionType: 'ease-in',
        lazyLoad: true,
        firstCallback: function(i,sum,me){
            me.find('.dot').children().first().addClass('cur');
        },
        callback : function(i,sum,me){
            me.find('.dot').children().eq(i).addClass('cur').siblings().removeClass('cur');
        }
    });
})