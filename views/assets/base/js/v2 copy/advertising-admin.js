$.selectedAds = new Array();

$.selectedAdTypes = new Array();
$(".ad-types").each(function(){
    $.selectedAdTypes.push($(this).parent().parent().find('p').text());
});

$(document).ready(function(){
    $('.ad-types').change(function(){
        if($(this).prop('checked')) {
            if($.inArray($(this).val(),$.selectedAdTypes) == -1){
                $.selectedAdTypes.push($(this).parent().parent().find('p').text());
            }
        } else {
            if($.inArray($(this).val(),$.selectedAdTypes) != -1){
                $.selectedAdTypes.splice($.inArray($(this).push($(this).parent().parent().find('p').text()),$.selectedAdTypes),1);
            }
        }
                
        drawAds();
        renderAdList(sessionStorage.getItem("ads"));
    });
    
    
    $('.nav-item>a').on('click', function () {
        $(".weui-navs ul ul li").removeClass('active');
        $('.nav-item').children('ul').hide();
        if ($(this).next().css('display') == "none") {
            //展开
            $('.nav-item').children('ul').hide();
            $(this).next('ul').show();
            $(this).parent('li').addClass('nav-show').siblings('li').removeClass('nav-show');
        } else {
            //收缩
            $(this).next('ul').hide();
            $('.nav-item.nav-show').removeClass('nav-show');
        }
    });

    var sidebarjs = new SidebarJS('navbar');
    
    var floor;
    if(getURLParameter('f') && getURLParameter('f') != '') {
        switch (getURLParameter('f')) {
            case '0':
                floor = 'B1';
                break;
            case '1':
                floor = 'L1';
                break;
            case '2':
                floor = 'L2';
                break;
            case '3':
                floor = 'L3';
                break;
            case '4':
                floor = 'L4';
                break;
            case '5':
                floor = 'L5';
                break;
            case '6':
                floor = 'L6';
                break;
            case '7':
                floor = 'L7';
                break;
            case '8':
                floor = 'L8';
                break;
            case '9':
                floor = 'L9';
                break;
            default:
                floor = 'L1';
                break;
        }

        $('#map').attr({
            'src'   : '/views/assets/base/img/content/floor-plan/shanghai-sbm/'+getURLParameter('f')+'F.png',
            'alt'   : getURLParameter('f')+'F',
            'usemap': '#Map_'+getURLParameter('f')+'F'
        });
        $('map').attr({
            'name'  : 'Map_'+getURLParameter('f')+'F',
            'id'    : '"Map_'+getURLParameter('f')+'F'
        });
        getAdFloorInfo(getURLParameter('f'));
    } else {
        $('#map').attr({
            'src'   : '/views/assets/base/img/content/floor-plan/shanghai-sbm/1F.png',
            'alt'   : '1F',
            'usemap': '#Map_1F'
        });
        $('map').attr({
            'name'  : 'Map_1F',
            'id'    : '"Map_1F'
        });
        
        getAdFloorInfo(1);
    }

    $('#floorNo').text(floor);
    
    var size = 0.85;
    $('#zoom_in').click(function (){
        size = size + 0.15;
        $('#map').mapster('resize', size*($(window).width()), 0, 0);
        
        $('#zoom_out').attr('disabled', false);
        if(size >= 2.35){
            $(this).attr('disabled', true);
        } else {
            $(this).attr('disabled', false);
        }
    });
    
    $('#zoom_out').click(function (){
        size = size - 0.15;
        $('#map').mapster('resize', size*($(window).width()), 0, 0);
        
        $('#zoom_in').attr('disabled', false);
        if(size <= 0.15){
            $(this).attr('disabled', true);
        } else {
            $(this).attr('disabled', false);
        }
    });
    
});

function getAdFloorInfo(fl) {
    $.ajax({
        url: "/views/assets/base/js/v2/json/ad.json",
        type: "GET",
        async: false,
        dataType: "json",
        contentType: "application/json",
        beforeSend: function(request) {
            showLoading();
            request.setRequestHeader("Lang", $.cookie('lang'));
            request.setRequestHeader("Source", "onlineleasing");
        },
        complete: function(){},
        success: function (response, status, xhr) {
            if(response.code === 'C0') {
                hideLoading();
                sessionStorage.setItem("ads", JSON.stringify(response.data) );
                $.each(response.data, function(i,v){
                    if(v.subType == 'ad' && v.floor == fl && v.coords != null && v.coords != '' && v.state != 0){
                        $('map').append('<area data-key="'+v.unit+'" alt="'+v.code+'" data-full="'+v.shopState+'" data-shop-name="'+v.shopName+'" href=\'javascript: GetAdInfo("'+v.code+'");\' shape="poly" coords="'+v.coords+'" />'); 
                    }
                    
                });
                
                if(getURLParameter('f') && getURLParameter('id')){
                    renderAdListFromDraw(getURLParameter('id'));
                    drawAdsFromList(getURLParameter('id'));
                } else {
                    drawAds();
                    renderAdList($.selectedAdTypes);
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
    
function drawAds(){
    var areas = $.map($('area'),function(el) {
        if($.inArray($(el).attr('data-shop-name'),$.selectedAdTypes) != -1){
            return { 
                key: $(el).attr('data-key'),
                fillColor: 'ffff00',
                fillOpacity: 1,
                stroke: false,
                selected: true 
            };
        }
    });
    
    var xOffset;
    var yOffset;

    $('#map').mapster({
        fillColor: 'AFBEDE',
        fillOpacity: 0.8,
        strokeColor: 'ffd62c',
        strokeWidth: 0,
        clickNavigate: true,
        mapKey: 'data-key',
        showToolTip: false,
        areas:  areas,
        onShowToolTip: function () {
            $(".mapster_tooltip").css({
                "font-weight": "bold",
                "color": "#a3aec2",
                "background": "rgba(28,34,56,1)",
                "font-size": "14px",
                "width": "auto"
            });

            $("area").on("mouseenter",  function (data) {
               xOffset = data.pageX;
               yOffset = data.pageY;
               $(".mapster_tooltip").css("left", xOffset);
               $(".mapster_tooltip").css("top", yOffset);
            });
        }
    });
}

function drawAdsFromList(sc){
    var areas = $.map($('area'),function(el) {
        if($(el).attr('alt') == sc){
            return { 
                key: $(el).attr('data-key'),
                fillColor: 'e12330',
                fillOpacity: 1,
                stroke: false,
                selected: true 
            };
        } else if($.inArray($(el).attr('alt'),$.selectedAds) != -1) {
            return { 
                key: $(el).attr('data-key'),
                fillColor: 'ffff00',
                fillOpacity: 1,
                stroke: false,
                selected: true 
            };
        } 
    });
    
    var xOffset;
    var yOffset;

    $('#map').mapster({
        fillColor: 'AFBEDE',
        fillOpacity: 0.8,
        strokeColor: 'ffd62c',
        strokeWidth: 0,
        clickNavigate: true,
        mapKey: 'data-key',
        showToolTip: false,
        areas:  areas,
        onShowToolTip: function () {
            $(".mapster_tooltip").css({
                "font-weight": "bold",
                "color": "#a3aec2",
                "background": "rgba(28,34,56,1)",
                "font-size": "22px",
                "width": "auto"
            });

            $("area").on("mouseenter",  function (data) {
               xOffset = data.pageX;
               yOffset = data.pageY;
               $(".mapster_tooltip").css("left", xOffset);
               $(".mapster_tooltip").css("top", yOffset);
            });
        }
    });
}

function renderAdList(ad){
    $('.weui-panel__bd').html('');
    
    $.selectedAds = [];
    
    $.each($.parseJSON(sessionStorage.getItem("ads")), function(i,v){
        if(v.shopState == 1) {
            if(v.subType == 'ad' && v.floor == getURLParameter('f') && v.coords != null && v.coords != '' && v.state != 0 && $.inArray(v.shopName,$.selectedAdTypes) != -1){
                if(v.shopState == 1){
                    $.selectedAds.push(v.code);
                    var src = '/views/assets/base/img/content/mall/1s.jpg';
                    if(v.images != null && v.images.length > 0){
                        src = v.images[0].image;
                    }

                    $('.weui-panel__bd').append('<div onclick="window.location=#" class="weui-media-box weui-media-box_appmsg">\n\
<div class="weui-media-box__hd" style="position: relative; overflow: hidden;">\n\
<a href=\'javascript: showGallery("'+src+'");\'><img class="weui-media-box__thumb" src="'+src+'" alt="" style="height: 60px; width: 90px;"></a>\n\
<span class="weui-mark-lb" style="top:0; font-size: 0.65em; white-space: nowrap;">'+v.shopName+'</span>\n\
</div>\n\
<div class="weui-media-box__bd">\n\
<p class="weui-media-box__desc" style="-webkit-line-clamp: 4;">'+v.remark_1+'</p>\n\
<p class="weui-media-box__desc">价格: '+v.remark_2+'/月</p>\n\
<ul class="weui-media-box__info">\n\
<li class="weui-media-box__info__meta"><a href=\'javascript: showVR("'+v.remark_6+'");\'>VR</a></li>\n\
<li class="weui-media-box__info__meta weui-media-box__info__meta_extra"><a href=\'javascript: drawAdsFromList("'+v.code+'");\'>查看位置</a></li>\n\
<li class="weui-media-box__info__meta weui-media-box__info__meta_extra"><a href="/v2/ad?id='+v.code+'">广告位详情</a></li>\n\
<li class="weui-media-box__info__meta weui-media-box__info__meta_extra"><a href=\'javascript: AddtoCart("'+v.code+'");\' style="color: #fa5151;">加入购物车</a></li>\n\
</ul>\n\
</div>\n\
</div>');
                }
            }
        }
    });
}

function showVR(url){
    $("#vr_viewer iframe").attr('src',url);
    $("#vr_viewer").show();
}

function renderAdListFromDraw(sc){
    $('.weui-panel__bd').html('');
    $.each($.parseJSON(sessionStorage.getItem("ads")), function(i,v){
        if(v.code == sc){
            $.selectedAds.push(v.code);
            
            var src = '/views/assets/base/img/content/mall/1s.jpg';
            if(v.images != null && v.images.length > 0){
                src = v.images[0].image;
            }

            $('.weui-panel__bd').append('<div onclick="window.location=#" class="weui-media-box weui-media-box_appmsg">\n\
<div class="weui-media-box__hd" style="position: relative; overflow: hidden;">\n\
<a href=\'javascript: showGallery("'+src+'");\'><img class="weui-media-box__thumb" src="'+src+'" alt="" style="height: 60px; width: 90px;"></a>\n\
<span class="weui-mark-lb" style="top:0; font-size: 0.65em; white-space: nowrap;">'+v.shopName+'</span>\n\
</div>\n\
<div class="weui-media-box__bd">\n\
<p class="weui-media-box__desc" style="-webkit-line-clamp: 4;">'+v.remark_1+'</p>\n\
<p class="weui-media-box__desc">价格: '+v.remark_2+'/月</p>\n\
<ul class="weui-media-box__info">\n\
<li class="weui-media-box__info__meta"><a href=\'javascript: showVR("'+v.remark_6+'");\'>VR</a></li>\n\
<li class="weui-media-box__info__meta weui-media-box__info__meta_extra"><a href=\'javascript: drawAdsFromList("'+v.code+'");\'>查看位置</a></li>\n\
<li class="weui-media-box__info__meta weui-media-box__info__meta_extra"><a href="/v2/ad?id='+v.code+'">广告位详情</a></li>\n\
<li class="weui-media-box__info__meta weui-media-box__info__meta_extra"><a href=\'javascript: AddtoCart("'+v.code+'");\' style="color: #fa5151;">加入购物车</a></li>\n\
</ul>\n\
</div>\n\
</div>');
        }
        
    });
}

function GetAdInfo(sc){
    drawAdsFromList(sc);
    renderAdListFromDraw(sc);
}

function AddtoCart(vc) {
    var $tooltips = $('.js_tooltips');
    var $toast = $('#js_toast');
        
    $('.page.cell').removeClass('slideIn');

    $toast.fadeIn(100);
    setTimeout(function () {
        $toast.fadeOut(100);
    }, 2000);

}