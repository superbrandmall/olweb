$(document).ready(function(){
    $('.slide').swipeSlide({
        autoSwipe:true,
        continuousScroll:true,
        transitionType:'ease-in',
        lazyLoad:true,
        firstCallback : function(i,sum,me){
            me.find('.dot').children().first().addClass('cur');
        },
        callback : function(i,sum,me){
            me.find('.dot').children().eq(i).addClass('cur').siblings().removeClass('cur');
        }
    });
    
    var width = ($('.slide img').width() / 2) + 'px';
    $('.slide').height(width);
});