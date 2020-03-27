$.selectedAds = new Array();

$.selectedAdTypes = new Array();
$(".ad-types").each(function(){
    $.selectedAdTypes.push($(this).val());
});

$(document).ready(function(){
    $('.ad-types').change(function(){
        if($(this).prop('checked')) {
            if($.inArray($(this).val(),$.selectedAdTypes) == -1){
                $.selectedAdTypes.push($(this).val());
            }
        } else {
            if($.inArray($(this).val(),$.selectedAdTypes) != -1){
                $.selectedAdTypes.splice($.inArray($(this).val(),$.selectedAdTypes),1);
            }
        }
                
        drawAds();
        renderAdList(sessionStorage.getItem("ads"));
    });
    
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

        $('#nav_f_'+getURLParameter('f')).addClass('active');

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
            'src'   : '/views/assets/base/img/content/floor-plan/shanghai-sbm/8F.png',
            'alt'   : '8F',
            'usemap': '#Map_8F'
        });
        $('map').attr({
            'name'  : 'Map_8F',
            'id'    : '"Map_8F'
        });
        
        getAdFloorInfo(8);
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
        url: "/views/assets/base/js/v2/ads-coords/"+fl+".json",
        type: "GET",
        async: false,
        dataType: "json",
        contentType: "application/json",
        beforeSend: function(request) {
            request.setRequestHeader("Lang", $.cookie('lang'));
            request.setRequestHeader("Source", "onlineleasing");
        },
        complete: function(){},
        success: function (response, status, xhr) {
            if(response.code === 'C0') {
                sessionStorage.setItem("ads", JSON.stringify(response.data) );
                $.each(response.data, function(i,v){
                    if(v.subType == 'ad' && v.coords != null && v.coords != '' && v.state != 0){
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
    
    if(document.body.clientWidth >= 1280){
        $('#map').mapster('resize', 0.85*($(window).width()), 0, 0);
    }
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
    
    if(document.body.clientWidth >= 1280){
        $('#map').mapster('resize', 0.85*($(window).width()), 0, 0);
    }
}

function renderAdList(ad){
    $('ul.chat').html('');
    
    $.selectedAds = [];
    
    $.each($.parseJSON(sessionStorage.getItem("ads")), function(i,v){
        if(v.shopState == 1) {
            if(v.subType == 'ad' && v.coords != null && v.coords != '' && v.state != 0 && $.inArray(v.shopName,$.selectedAdTypes) != -1){
                if(v.shopState == 1){
                    $.selectedAds.push(v.code);
                    var src = '/views/assets/base/img/content/mall/1s.jpg';
                    if(v.images != null && v.images.length > 0){
                        src = v.images[0].image;
                    }

                    $('ul.chat').append('<li class="left clearfix">\n\
<span class="pull-left">\n\
<img src="'+src+'" alt="">\n\
</span>\n\
<div class="chat-body clearfix">\n\
<div class="header">'+v.shopName+'<a href="#" class="pull-right badge">VR</a>\n\
</div>\n\
<div class="header">&nbsp;<a href=\'javascript: drawAdsFromList("'+v.code+'");\' class="pull-right badge">查看位置</a></div>\n\
<div class="header">&nbsp;<a href="#!" class="pull-right badge">加入购物车</a></div></div></li>');
                }
            }
        }
    });
}

function renderAdListFromDraw(sc){
    $('ul.chat').html('');
    $.each($.parseJSON(sessionStorage.getItem("ads")), function(i,v){
        if(v.code == sc){
            $.selectedAds.push(v.code);
            
            var src = '/views/assets/base/img/content/mall/1s.jpg';
            if(v.images != null && v.images.length > 0){
                src = v.images[0].image;
            }

            $('ul.chat').append('<li class="left clearfix">\n\
<span class="pull-left">\n\
<img src="'+src+'" alt="">\n\
</span>\n\
<div class="chat-body clearfix">\n\
<div class="header">'+v.shopName+'<a href="#" class="pull-right badge">VR</a>\n\
</div>\n\
<div class="header">&nbsp;<a href=\'javascript: drawAdsFromList("'+v.code+'");\' class="pull-right badge">查看位置</a></div>\n\
<div class="header">&nbsp;<a href="#!" class="pull-right badge">加入购物车</a></div></div></li>');
        }
        
    });
}

function GetAdInfo(sc){
    drawAdsFromList(sc);
    renderAdListFromDraw(sc);
}