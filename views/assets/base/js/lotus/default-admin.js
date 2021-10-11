$(document).ready(function () {
    $('#swiper_banner').swipeSlide({
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
    /*.$(".swiper-news").swiper({
        loop: true,
        direction: 'vertical',
        paginationHide: true,
        autoplay: 30000
    });
    $(".swiper-jingxuan").swiper({
        pagination: '.swiper-pagination',
        loop: true,
        paginationType: 'fraction',
        slidesPerView: 3,
        paginationClickable: true,
        spaceBetween: 2
    });
    $(".swiper-jiushui").swiper({
        pagination: '.swiper-pagination',
        paginationType: 'fraction',
        loop: true,
        slidesPerView: 3,
        slidesPerColumn: 2,
        paginationClickable: true,
        spaceBetween: 2
    });*/
})