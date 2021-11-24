$(document).ready(function () {
    if($.cookie('mallSelected') != '' && $.cookie('mallSelected') != null){
        getAllShopsByMallCode();
    }
    
    $('.tab-bottom a:eq(0)').find('i,p').addClass('f-lotus');
    
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
    
    $("#locationBtn").bind("click", function(){
        $("#locationSelector").toggleClass('active');
    });
    
    $(".close-location").bind("click", function(){
        $("#locationSelector").removeClass('active');
    });
    
    $(function(){
        $('#sidebar ul li').click(function(){
            $(this).addClass('active').siblings('li').removeClass('active');
            var index = $(this).index();
            $('.j-content').eq(index).show().siblings('.j-content').hide();
        })
    })
})

function getMallSelected(mc) {
    $.cookie('mallSelected',mc);
    $("#locationSelector").removeClass('active');
    $("#mallSelected").text($.cookie('mallSelected').split(':::')[0]);
    getAllShopsByMallCode();
}

function getAllShopsByMallCode() {
    var map = {
        "mallCode": $.cookie('mallSelected').split(':::')[1],
        "userCode": "CUSER190709000022"
    };
        
    $.ajax({
        url: $.api.baseNew+"/onlineleasing-customer/api/vshop/lotus/findAllByCondition?page=0&size=100&sort=id,desc",
        type: "POST",
        data: JSON.stringify(map),
        async: false,
        dataType: "json",
        contentType: "application/json",
        beforeSend: function(request) {
            request.setRequestHeader("Lang", 1);
            request.setRequestHeader("Source", "onlineleasing");
        },
        complete: function(){},
        success: function (response, status, xhr) {
            if(response.code === 'C0') {  
                if(response.data.content.length > 0) {
                    $('#storeRecommand').html('');
                    $.each(response.data.content, function(i,v){
                        $('#storeRecommand').append('<a href="/lotus/shop?id='+v.code+'&type=leasing" class="weui-media-box weui-media-box_appmsg">\n\
                <div aria-hidden="true" class="weui-media-box__hd">\n\
                    <img class="weui-media-box__thumb" src="http://placehold.it/120x120" alt="">\n\
                </div>\n\
                <div aria-hidden="true" class="weui-media-box__bd">\n\
                    <strong class="weui-media-box__title"><label class="label f-white">'+v.mallName+'</label> '+v.remarkFirst+'</strong>\n\
                    <p class="weui-media-box__desc">\n\
                        <strong><span class="f-red">8,885.01</span>元<small>/m<sup>2</sup>/月</small></strong> <small>(<span id="rentAmount">21元</span> /m<sup>2</sup>/天)</small>\n\
                    </p>\n\
                    <p class="weui-media-box__desc">\n\
                        <label class="label f-blue b-blue">'+v.floorName+'</label>\n\
                        <label class="label f-orange b-orange">'+v.unitArea+'m<sup>2</sup></label>\n\
                        <label class="label f-green b-green">'+v.modality+'</label>\n\
                    </p>\n\
                </div>\n\
            </a>');
                    });
                }
            } else {
                console.log(response.customerMessage);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}