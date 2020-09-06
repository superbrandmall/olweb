$(document).ready(function(){
    getShopFloorInfo($('#floor').val());
    
    var size = 0.85;
    $('#zoom_in').click(function (){
        size = size + 0.15;
        $('#map').layout('resize', size*($(window).width()), 0, 0);
        addTextLayer();
        
        $('#zoom_out').attr('disabled', false);
        if(size >= 2.35){
            $(this).attr('disabled', true);
        } else {
            $(this).attr('disabled', false);
        }
    });
    
    $('#zoom_out').click(function (){
        size = size - 0.15;
        $('#map').layout('resize', size*($(window).width()), 0, 0);
        addTextLayer();
        
        $('#zoom_in').attr('disabled', false);
        if(size <= 0.15){
            $(this).attr('disabled', true);
        } else {
            $(this).attr('disabled', false);
        }
    });
    
});

$(function() {   
    window.addEventListener("resize",function(){
        $('#map').layout('resize', 0.85*($(window).width()), 0, 0);
        addTextLayer();
    });
});

function getShopFloorInfo(fl) {
    $.ajax({
        url: $.api+"/onlineleasing-customer/api/base/coords/OLMALL180917000003/"+fl+"",
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
            $.each(response.data, function(i,v){
                if((v.subType == '正柜' || v.subType == 'THEAT') && v.coords != null && v.coords != '' && v.state != 0){
                    $('map').append('<area data-key="'+v.unit+'" alt="'+v.code+'" data-full="'+v.shopState+'" data-modality="'+v.modality+'" data-area="'+v.area+'" data-shop-name="'+v.shopName+'" name="'+(v.brandName || '')+'" href=\'javascript: GetShopInfo("'+v.code+'");\' shape="poly" coords="'+v.coords+'" />'); 
                }
            });

            drawShops();
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}
    
function drawShops(){
    var areas = $.map($('area'),function(el) {
        if(getURLParameter('id') === $(el).attr('alt')){
            return { 
                key: $(el).attr('data-key'),
                toolTip: '本店铺',
                fillColor: '3c763d',
                fillOpacity: 1,
                stroke: false,
                selected: true 
            };
        } else {
            if($(el).attr('data-full') == 0){
                return { 
                    key: $(el).attr('data-key'),
                    toolTip: $(el).attr('name'),
                    fillColor: '7d9fe9',
                    selected: true,
                    stroke: true,
                    strokeColor: '6a90e1'
                };
            } else if($(el).attr('data-full') == 1){
                return { 
                    key: $(el).attr('data-key'),
                    toolTip: '空铺',
                    fillColor: 'FE9E9E',
                    selected: true,
                    stroke: true,
                    strokeColor: 'FE9E9E'
                };
            } else if($(el).attr('data-full') == 2){
                return { 
                    key: $(el).attr('data-key'),
                    toolTip: $(el).attr('name'),
                    fillColor: 'FEED99',
                    selected: true,
                    stroke: true,
                    strokeColor: 'FEED99'
                };
            } else if($(el).attr('data-full') == 3){
                return { 
                    key: $(el).attr('data-key'),
                    toolTip: '改造中',
                    fillColor: 'D5C8AA',
                    selected: true,
                    stroke: true,
                    strokeColor: 'D5C8AA'
                };
            }
            
        }
    });
    
    var xOffset;
    var yOffset;

    $('#map').layout({
        fillColor: 'c9ae89',
        fillOpacity: 0.8,
        strokeColor: 'ffd62c',
        strokeWidth: 0,
        clickNavigate: true,
        mapKey: 'data-key',
        showToolTip: true,
        areas:  areas,
        onShowToolTip: function () {
            $(".layout_tooltip").css({
                "font-weight": "bold",
                "color": "#a3aec2",
                "background": "rgba(28,34,56,1)",
                "font-size": "22px",
                "width": "auto"
            });

            $("area").on("mouseenter",  function (data) {
               xOffset = data.pageX;
               yOffset = data.pageY;
               $(".layout_tooltip").css("left", xOffset);
               $(".layout_tooltip").css("top", yOffset);
            });
        }
    });
    
    if(document.body.clientWidth >= 1280){
        $('#map').layout('resize', 0.85*($(window).width()), 0, 0);
    }
    
    addTextLayer();
}

function addTextLayer(){
    $('map span').remove();
    if(document.body.clientWidth > 1000){
        setTimeout(function () {
            var pos, shopName, area, brand;
            $('map area').each(function(i,elem){
                pos = $(this).attr('coords').split(',');
                var x = 0;
                var posLeftMin = parseInt(pos[0]), posLeftMax = parseInt(pos[0]), width, height;
                while(x < pos.length){
                    if(parseInt(pos[x]) < posLeftMin){
                        posLeftMin = parseInt(pos[x]);
                    } 

                    if(parseInt(pos[x]) > posLeftMax){
                        posLeftMax = parseInt(pos[x]);
                    }
                    x = x + 2;
                }
                width = parseInt(posLeftMax - posLeftMin - 10);             

                var y = 1;
                var posTopMin = parseInt(pos[1]), posTopMax = parseInt(pos[1]);
                while(y < pos.length){
                    if(parseInt(pos[y]) < posTopMin){
                        posTopMin = parseInt(pos[y]);
                    }
                    if(parseInt(pos[y]) > posTopMax){
                        posTopMax = parseInt(pos[y]);
                    }
                    y = y + 2;
                }

                height = parseInt(posTopMax - posTopMin - 10);
                
                if($(this).attr('data-full') == 0 || $(this).attr('data-full') == 2){
                    shopName = $(this).attr('data-shop-name');
                    area = $(this).attr('data-area');
                    brand = $(this).attr('name');
                    if(brand.length > 10){
                        brand = brand.substring(0,10) + "...";
                    }
                    
                    $(this).after(
                        '<span style="position:absolute;line-height:1;text-align:center;cursor:pointer;" onclick=\'javascript: GetShopInfo("'+$(this).attr('alt')+'");\'>'+shopName+'<br>('+area+')<br>'+brand+'</span>'
                    );
                } else {
                    shopName = $(this).attr('data-shop-name');
                    area = $(this).attr('data-area');
                    
                    $(this).after(
                        '<span style="position:absolute;line-height:1;text-align:center;cursor:pointer;" onclick=\'javascript: GetShopInfo("'+$(this).attr('alt')+'");\'>'+shopName+'<br>('+area+')</span>'
                    );
                }
                
                resetFontSize($(this).next(),width,height,4,12,posLeftMin,posTopMin);
            });
        },1000);
    }
}

function resetFontSize(divWord, maxWidth, maxHeight, minSize, maxSize, posLeftMin, posTopMin) {
    divWord.css('font-size', minSize + "px");
    for (var i = minSize; i < maxSize; i++) {
        if ($(divWord).width() > maxWidth || $(divWord).height() > maxHeight) {
            $(divWord).css({
                'font-size': i + 'px',
                'left': parseInt(posLeftMin - ($(divWord).width() - maxWidth) / 2 + 6) + 'px',
                'top': parseInt(posTopMin - ($(divWord).height() - maxHeight) / 2 + 6) + 'px'    
            }); 
                break;
        } else {
            $(divWord).css({
                'font-size': i + 'px',
                'left': parseInt(posLeftMin - ($(divWord).width() - maxWidth) / 2) + 'px',
                'top': parseInt(posTopMin - ($(divWord).height() - maxHeight) / 2) + 'px'
            });
        }
    }
};

function GetShopInfo(sc){
    $.ajax({
        url: $.api+"/onlineleasing-admin/api/shop/"+sc+"",
        type: "GET",
        async: false,
        beforeSend: function(request) {
        },
        success: function (response, status, xhr) {
                var shop = response.data;                
                var brandName = shop.brandName;
                if(shop.shopState == 1 || shop.shopState == 3){
                    if(shop.brandToSign != null && shop.brandToSign != ''){
                        brandName = shop.brandToSign;
                        $('#brand_name').css('color','#f00');
                    } else {
                        $('#brand_name').css('color','#fff');
                    }
                } else {
                    $('#brand_name').css('color','#fff');
                }
                $('#brand_name').text(brandName || '-');
        }
    });
}

