$(function () {
    var banner = new Swiper('.banner', {
        autoplay: 5000,
        pagination: '.swiper-pagination',
        paginationClickable: true,
        lazyLoading: true,
        loop: true
    });

    mui('.pop-schwrap .sch-input').input();
    var deceleration = mui.os.ios ? 0.003 : 0.0009;
    mui('.pop-schwrap .scroll-wrap').scroll({
        bounce: true,
        indicators: true,
        deceleration: deceleration
    });
    $('.top-sch-box .fdj,.top-sch-box .sch-txt,.pop-schwrap .btn-back').on('click', function () {
        $('html,body').toggleClass('holding');
        $('.pop-schwrap').toggleClass('on');
        if ($('.pop-schwrap').hasClass('on')) {
            ;
            $('.pop-schwrap .sch-input').focus();
        }
    });

});