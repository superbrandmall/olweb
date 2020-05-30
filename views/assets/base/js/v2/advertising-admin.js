$.selectedAds = new Array();

$(document).ready(function(){
    showLoading();
    
    var floorDesc, floor;
    if(getURLParameter('f') && getURLParameter('f') != '') {
        switch (getURLParameter('f')) {
            case '0':
                floorDesc = '负一楼';
                floor = 'B1';
                break;
            case '1':
                floorDesc = '一楼';
                floor = 'L1';
                break;
            case '2':
                floorDesc = '二楼';
                floor = 'L2';
                break;
            case '3':
                floorDesc = '三楼';
                floor = 'L3';
                break;
            case '4':
                floorDesc = '四楼';
                floor = 'L4';
                break;
            case '5':
                floorDesc = '五楼';
                floor = 'L5';
                break;
            case '6':
                floorDesc = '六楼';
                floor = 'L6';
                break;
            case '7':
                floorDesc = '七楼';
                floor = 'L7';
                break;
            case '8':
                floorDesc = '八楼';
                floor = 'L8';
                break;
            case '9':
                floorDesc = '九楼';
                floor = 'L9';
                break;
            default:
                floorDesc = [];
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
    
    $('#showFloorPicker').on('click', function (){
        weui.picker([{
            label: '八楼东区悬挂式LED',
            value: '8'
        }, {
            label: '五楼黄金大道悬挂分屏LED',
            value: '5'
        }, {
            label: '三楼入口全包LED环绕屏',
            value: '3'
        }, {
            label: '一楼户外墙面广告',
            value: '1'
        }], {
            onChange: function (result) {
            },
            onConfirm: function (result) {
                $.cookie('floor',result[0].value);
                window.location.href = '/v2/advertising?f='+result[0].value+'&type=ads';
            },
            title: '请选择广告位所在楼层'
        });
    });
    
    $('#showFloorPicker p').text('已选择'+floorDesc);
    $('#floorNo').text(floor);
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
                    renderAdList();
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
        return { 
            key: $(el).attr('data-key'),
            fillColor: 'ffff00',
            fillOpacity: 1,
            stroke: false,
            selected: true 
        }; 
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

function renderAdList(){
    $('.weui-panel__bd').html('');
    
    $.selectedAds = [];
    
    $.each($.parseJSON(sessionStorage.getItem("ads")), function(i,v){
        if(v.shopState == 1) {
            if(v.subType == 'ad' && v.floor == getURLParameter('f') && v.coords != null && v.coords != '' && v.state != 0){
                if(v.shopState == 1){
                    $.selectedAds.push(v.code);
                    var src = '/views/assets/base/img/content/mall/1s.jpg';
                    if(v.images != null && v.images.length > 0){
                        src = v.images[0].image;
                    }

                    $('.weui-panel__bd').append('<div onclick="window.location=#" class="weui-media-box weui-media-box_appmsg" style="background-color: #3f3f3f; padding: 0;">\n\
<div class="weui-media-box__bd" onclick=\'javascript: drawAdsFromList("'+v.code+'");\'>\n\
<div style="position: relative; float: left; width: 142px;">\n\
<a href=\'javascript: showGallery("'+src+'");\'><img class="weui-media-box__thumb" src="'+src+'" alt="" style="height: 84px; width: 126px;"></a>\n\
<span style="position: absolute; right: 16px; font-weight: bold; color: #ddd; background: rgba(0,0,0,0.5); width: 100%; text-align: right; padding-right: 6px; font-size: 12px;">'+v.shopName+'</span>\n\
</div>\n\
<div style="margin-left: 142px; padding: 0 5px 5px;">\n\
<p class="weui-media-box__desc" style="-webkit-line-clamp: 4; color: #bba585;">'+v.remark_1+'m<sup>2</sup></p>\n\
<p class="weui-media-box__desc" style="color: #bba585;">价格: '+v.remark_2+'/月</p>\n\
</div>\n\
<div style="clear: both; background-color: #292929; text-align: center; padding: 10px 0;">\n\
<a href=\'javascript: showVR("'+v.remark_6+'");\' style="display: inline-block; font-size: 11px; background-color: #c9b18d; color: #514026; border-radius: 10px; padding: 8px 4px; text-align: center; width: 60px;">VR</a>\n\
<a href=\'javascript:;\' style="display: inline-block; font-size: 11px; background-color: #c9b18d; color: #514026; border-radius: 10px; padding: 8px 4px; text-align: center; width: 60px;">加入关注</a>\n\
<a href="/v2/ad?id='+v.code+'" style="display: inline-block; font-size: 11px; background-color: #c9b18d; color: #514026; border-radius: 10px; padding: 8px 4px; text-align: center; width: 60px;">广告位详情</a>\n\
<a href=\'javascript: AddtoCart("'+v.code+'");\' style="display: inline-block; font-size: 11px; background-color: #c9b18d; color: #514026; border-radius: 10px; padding: 8px 4px; text-align: center; width: 60px;">加入购物车</a>\n\</div>\n\
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
<p class="weui-media-box__desc" style="-webkit-line-clamp: 4; font-size: 12px;">'+v.remark_1+'</p>\n\
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