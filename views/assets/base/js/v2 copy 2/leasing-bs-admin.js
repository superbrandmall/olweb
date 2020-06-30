$.selectedShops = new Array();
$.favorites = new Array();
$.favoritesId = new Array();

var d = new Date();
var month = d.getMonth()+1;
var day = d.getDate();
var time = d.getTime();
var date = d.getFullYear() + '-' +
    (month<10 ? '0' : '') + month + '-' +
    (day<10 ? '0' : '') + day;

$(document).ready(function(){
    showLoading();
    GetMyFavorites();
    
    var floorDesc, floorLable, floor = '8F';
    if(getURLParameter('f') && getURLParameter('f') != '') {
        switch (getURLParameter('f')) {
            case '0':
                floorDesc = '负一楼';
                floor = 'B1';
                floorLable = 'B1F 运动&美食';
                break;
            case '1':
                floorDesc = '一楼';
                floor = 'L1';
                floorLable = '1F 潮流生活';
                break;
            case '2':
                floorDesc = '二楼';
                floor = 'L2';
                floorLable = '2F 聚餐&培训';
                break;
            case '3':
                floorDesc = '三楼';
                floor = 'L3';
                floorLable = '3F 教育天地';
                break;
            default:
                floorDesc = [];
                floor = 'L1';
                floorLable = '1F 潮流生活';
                break;
        }
        
        $('#map').attr({
            'src'   : '/views/assets/base/img/content/floor-plan/baoshan-tm/'+getURLParameter('f')+'F.png',
            'alt'   : getURLParameter('f')+'F',
            'usemap': '#Map_'+getURLParameter('f')+'F'
        });
        $('map').attr({
            'name'  : 'Map_'+getURLParameter('f')+'F',
            'id'    : '"Map_'+getURLParameter('f')+'F'
        });
        getShopFloorInfo(floorDesc);
    } else {
        $('#map').attr({
            'src'   : '/views/assets/base/img/content/floor-plan/baoshan-tm/1F.png',
            'alt'   : '1F',
            'usemap': '#Map_1F'
        });
        $('map').attr({
            'name'  : 'Map_1F',
            'id'    : '"Map_1F'
        });

        getShopFloorInfo('一楼');
    }

    $('#showSizePicker').on('click', function () {
        weui.picker([{
            label: '不限面积',
            value: '0-1000'
        }, {
            label: '100m²以下',
            value: '0-100'
        }, {
            label: '100-200m²',
            value: '100-200'
        },{
            label: '200-500m²',
            value: '200-500'
        },{
            label: '500m²以上',
            value: '500-10000'
        }], {
            onChange: function (result) {
            },
            onConfirm: function (result) {
                $('#showSizePicker').text(result[0].label);
                $.cookie('size',result[0].value);
                $.cookie('sizeDesc',result[0].label);

                getShopFloorInfo(floorDesc);
            },
            title: '请选择面积范围'
        });
    });

    $('#showFloorPicker').on('click', function (){
        weui.picker([{
            label: '3F 教育天地',
            value: '3'
        },{
            label: '2F 聚餐&培训',
            value: '2'
        },{
            label: '1F 潮流生活',
            value: '1'
        },{
            label: 'B1 运动&美食',
            value: '0'
        }], {
            onChange: function (result) {
            },
            onConfirm: function (result) {
                window.location.href = '/v2/leasing-bs?f='+result[0].value+'&type=leasing';
            },
            title: '请选择铺位所在区域'
        });
    });
    
    $('#showFloorPicker').text('已选'+floorLable);
    
    var sizeDesc = '不限面积';
    if($.cookie('size') != ''){
        sizeDesc = $.cookie('sizeDesc');
    }
    $('#showSizePicker').text(sizeDesc);
    
    $('#floorNo').text(floor); 
});

function getShopFloorInfo(fl) {
    getShopsMoreInfo();
    $.ajax({
        url: $.api.baseNew+"/onlineleasing-customer/api/base/coords/OLMALL180917000002/"+fl+"",
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
                sessionStorage.setItem("shops", JSON.stringify(response.data) );
                $.each(response.data, function(i,v){
                    if((v.unit == "B1FL022") || (v.unit == "B1FL015") || (v.unit == "01FL035") || (v.unit == "01FL009") || (v.unit == "01FL015")){
                        $('map').append('<area data-key="'+v.unit+'" alt="'+v.code+'" data-full="'+v.shopState+'" data-push="1" data-area="'+v.area+'" data-shop-name="'+v.shopName+'" name="'+(v.brandName || '')+'" href=\'javascript: GetShopInfo("'+v.code+'");\' shape="poly" coords="'+v.coords+'" />'); 
                    } else {
                        if(v.shopState == 0 || v.shopState == 2){
                            if((v.subType == '正柜' || v.subType == 'THEAT') && v.coords != null && v.coords != '' && v.state != 0){
                                $('map').append('<area data-key="'+v.unit+'" alt="'+v.code+'" data-full="'+v.shopState+'" data-push="0" data-area="'+v.area+'" data-shop-name="'+v.shopName+'" name="'+(v.brandName || '')+'" href="#" shape="poly" coords="'+v.coords+'" />'); 
                            }
                        }
                    }
                });
                
                if(getURLParameter('f') && getURLParameter('id')){
                    renderShopListFromDraw(getURLParameter('id'));
                    drawShopsFromList(getURLParameter('id'));
                } else {
                    drawShops('','0-10000');
                    renderShopList('','0-10000');
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

function getShopsMoreInfo() {
    $.ajax({
        url: $.api.baseNew+"/comm-wechatol/api/shop/base/findAllByStoreCode?storeCode=OLMALL180917000002",
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
                sessionStorage.setItem("shopsMoreInfo", JSON.stringify(response.data)); 
            } else {
                interpretBusinessCode(response.customerMessage);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}

    
function drawShops(mod,size){
    var areas = $.map($('area'),function(el) {
        var area = $(el).attr('data-area');
        
        var minSize = size.split('-')[0];
        var maxSize = size.split('-')[1];
        
        if(mod == '') {
            if(Math.round(area) > minSize && Math.round(area) < maxSize && $(el).attr('data-push') == 1){
                return { 
                    key: $(el).attr('data-key'),
                    toolTip: '铺位号: '+$(el).attr('data-shop-name')+'<br>面积: '+$(el).attr('data-area')+'m<sup>2</sup>',
                    fillColor: 'ffff00',
                    fillOpacity: 1,
                    stroke: false,
                    selected: true 
                };
            }
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
    
    addTextLayer();
}

function drawShopsFromList(sc){
    var areas = $.map($('area'),function(el) {
        if($(el).attr('alt') == sc){
            return { 
                key: $(el).attr('data-key'),
                toolTip: '铺位号: '+$(el).attr('data-shop-name')+'<br>面积: '+$(el).attr('data-area')+'m<sup>2</sup>',
                fillColor: 'e12330',
                fillOpacity: 1,
                stroke: false,
                selected: true 
            };
        } else if($.inArray($(el).attr('alt'),$.selectedShops) != -1) {
            return { 
                key: $(el).attr('data-key'),
                toolTip: '铺位号: '+$(el).attr('data-shop-name')+'<br>面积: '+$(el).attr('data-area')+'m<sup>2</sup>',
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
   
    addTextLayer();
}

function renderShopList(shop){
    $('.weui-panel__bd').html('');
    var area;
    var minSize = 0;
    var maxSize = 10000;
    if($.cookie('size') != '' && $.cookie('size') != null){
        minSize = $.cookie('size').split('-')[0];
        maxSize = $.cookie('size').split('-')[1];
    }
    
    $.selectedShops = [];
    
    $.each($.parseJSON(sessionStorage.getItem("shops")), function(i,v){
        if((v.unit == "B1FL022") || (v.unit == "B1FL015") || (v.unit == "01FL035") || (v.unit == "01FL009") || (v.unit == "01FL015")){

            var settle_date = '-';
            var desc = '';
            var businessFormatChs = '-';
            var freeOfGroundRent = '-';
            var opening_date = '-';
            
            var buildingCode;
            var storeCode;
            var vr;
            
            $.each($.parseJSON(sessionStorage.getItem("shopsMoreInfo")), function(j,w){
                if(v.unit == w.unitCode){
                    desc = w.desc || '';
                    businessFormatChs = w.businessFormatChs || '-';
                    freeOfGroundRent = w.freeOfGroundRent || '-';
                    
                    buildingCode = w.buildingCode;
                    storeCode = w.storeCode;
                    vr = w.remarkFirst;
                }
            })

            area = v.area;

            if(Math.round(area) > minSize && Math.round(area) < maxSize){
                $.selectedShops.push(v.code);
                var src = '/views/assets/base/img/content/mall/5s.jpg';
                if(v.images != null && v.images.length > 0){
                    src = v.images[0].image;
                }

                if(v.shopState === 1 || v.shopState === 3) { // 空铺
                    settle_date = IncrDates(date,15);
                } else { // 非空铺
                    settle_date = IncrDates(date,(v.daysBeforeContractExpire+1));
                }

                if(freeOfGroundRent != '-'){
                    opening_date = IncrDates(settle_date,parseInt(freeOfGroundRent)) || '-';
                }

                var fav = '<a href=\'javascript: AddToFavorite("'+buildingCode+'","'+v.code+'","'+storeCode+'","'+v.unit+'");\' style="display: inline-block; font-size: 11px; background-color: #c9b18d; color: #514026; border-radius: 10px; padding: 5px 0; text-align: center; width: 60px;">加入关注</a>';
                if($.inArray(v.code, $.favorites) != -1){
                    fav = '<a href=\'javascript: RemoveFavorite("'+$.favoritesId[$.inArray(v.code, $.favorites)]+'","'+buildingCode+'","'+v.code+'","'+storeCode+'","'+v.unit+'");\' style="display: inline-block; font-size: 11px; background-color: #c9b18d; color: #514026; border-radius: 10px; padding: 5px 0; text-align: center; width: 60px;">取消关注</a>';
                }

                $('.weui-panel__bd').append('<div class="weui-media-box weui-media-box_appmsg" style="background-color: #3f3f3f; padding: 0 0 10px;">\n\
<div class="weui-media-box__bd" onclick=\'javascript: drawShopsFromList("'+v.code+'");\'>\n\
<div style="position: relative; float: left; width: 142px;">\n\
<a href=\'javascript: showGallery("'+src+'");\'><img class="weui-media-box__thumb" src="'+src+'" alt="" style="height: 84px; width: 126px;"></a>\n\
<span style="position: absolute; right: 16px; font-weight: bold; color: #ddd; background: rgba(0,0,0,0.5); width: 100%; text-align: right; padding-right: 6px; font-size: 12px;">'+v.shopName+'</span>\n\
<div style="padding: 5px 0;">\n\
<a href=\'javascript: showVR("'+vr+'");\' style="display: inline-block; margin: 2px; font-size: 11px; background-color: #c9b18d; color: #514026; border-radius: 10px; padding: 5px 0; text-align: center; width: 60px;">VR</a>\n\
'+fav+'\n\
<a href=\'javascript: showEngineering("'+v.shopName+'");\' style="display: inline-block; margin: 2px; font-size: 11px; background-color: #c9b18d; color: #514026; border-radius: 10px; padding: 5px 0; text-align: center; width: 60px;">工程条件</a>\n\
<a href=\'javascript: askPrice("'+v.unit+'","'+v.code+'","'+settle_date+'","'+opening_date+'","'+v.shopName+'","'+v.area+'");\' style="display: inline-block; font-size: 11px; background-color: #c9b18d; color: #514026; border-radius: 10px; padding: 5px 0; text-align: center; width: 60px;">申请报价</a>\n\
</div>\n\
</div>\n\
<div style="margin-left: 142px;">\n\
<p class="weui-media-box__desc" style="color: #bba585;">面积: '+v.area+'m<sup>2</sup></p>\n\
<p class="weui-media-box__desc" style="color: #bba585;">进场日期: <strong>'+settle_date+'</strong></p>\n\
<p class="weui-media-box__desc" style="color: #bba585;">开业日期: <strong>'+opening_date+'</strong></p>\n\
<p class="weui-media-box__desc" style="color: #bba585;">推荐业态: '+businessFormatChs+'</p>\n\
<p class="weui-media-box__desc" style="color: #bba585;">'+desc+'</p>\n\
</div>\n\
</div>\n\
</div>');
            }
        }
    });
    
    if(!$.selectedShops.length) {
        $('.weui-panel__bd').html('<div class="weui-media-box weui-media-box_appmsg" style="color: #c9b18d;">\n\
<div class="weui-media-box__hd">\n\
<i class="fa fa-exclamation-triangle" aria-hidden="true"></i></div>\n\
<div class="weui-media-box__bd">对不起，本区域暂无合适推荐位置，请重新选择区域</div></div>');
    }
}

function showEngineering(id){
    $("#engineering_pdf").show();
}

function showVR(url){
    $("#vr_viewer iframe").attr('src',url);
    $("#vr_viewer").show();
}

function renderShopListFromDraw(sc){
    $('.weui-panel__bd').html('');
    $.each($.parseJSON(sessionStorage.getItem("shops")), function(i,v){
        if(v.code == sc){
            $.selectedShops.push(v.code);

            var settle_date = '-';
            var desc = '';
            var businessFormatChs = '-';
            var freeOfGroundRent = '-';
            var opening_date = '-';
            
            var buildingCode;
            var storeCode;
            var vr;
            
            $.each($.parseJSON(sessionStorage.getItem("shopsMoreInfo")), function(j,w){

                if(v.unit == w.unitCode){
                    desc = w.desc || '';
                    businessFormatChs = w.businessFormatChs || '-';
                    freeOfGroundRent = w.freeOfGroundRent || '-';
                    
                    buildingCode = w.buildingCode;
                    storeCode = w.storeCode;
                    vr = w.remarkFirst;
                }
            })
            
            var src = '/views/assets/base/img/content/mall/1s.jpg';
            if(v.images != null && v.images.length > 0){
                src = v.images[0].image;
            }
            
            if(v.shopState === 1 || v.shopState === 3) { // 空铺
                settle_date = IncrDates(date,15);
            } else { // 非空铺
                settle_date = IncrDates(date,(v.daysBeforeContractExpire+1));
            }

            if(freeOfGroundRent != '-'){
                opening_date = IncrDates(settle_date,parseInt(freeOfGroundRent)) || '-';
            }
            
            var fav = '<a href=\'javascript: AddToFavorite("'+buildingCode+'","'+v.code+'","'+storeCode+'","'+v.unit+'");\' style="display: inline-block; font-size: 11px; background-color: #c9b18d; color: #514026; border-radius: 10px; padding: 5px 0; text-align: center; width: 60px;">加入关注</a>';
            if($.inArray(v.code, $.favorites) != -1){
                fav = '<a href=\'javascript: RemoveFavorite("'+$.favoritesId[$.inArray(v.code, $.favorites)]+'","'+buildingCode+'","'+v.code+'","'+storeCode+'","'+v.unit+'");\' style="display: inline-block; font-size: 11px; background-color: #c9b18d; color: #514026; border-radius: 10px; padding: 5px 0; text-align: center; width: 60px;">取消关注</a>';
            }
            
            $('.weui-panel__bd').append('<div class="weui-media-box weui-media-box_appmsg" tyle="background-color: #3f3f3f; padding: 0 0 10px;">\n\
<div class="weui-media-box__bd" onclick=\'javascript: drawShopsFromList("'+v.code+'");\'>\n\
<div style="position: relative; float: left; width: 142px;">\n\
<a href=\'javascript: showGallery("'+src+'");\'><img class="weui-media-box__thumb" src="'+src+'" alt="" style="height: 84px; width: 126px;"></a>\n\
<span style="position: absolute; right: 16px; font-weight: bold; color: #ddd; background: rgba(0,0,0,0.5); width: 100%; text-align: right; padding-right: 6px; font-size: 12px;">'+v.shopName+'</span>\n\
<div style="padding: 5px 0;">\n\
<a href=\'javascript: showVR("'+vr+'");\' style="display: inline-block; margin: 2px; font-size: 11px; background-color: #c9b18d; color: #514026; border-radius: 10px; padding: 5px 0; text-align: center; width: 60px;">VR</a>\n\
'+fav+'\n\
<a href=\'javascript: showEngineering("'+v.shopName+'");\' style="display: inline-block; margin: 2px; font-size: 11px; background-color: #c9b18d; color: #514026; border-radius: 10px; padding: 5px 0; text-align: center; width: 60px;">工程条件</a>\n\
<a href=\'javascript: askPrice("'+v.unit+'","'+v.code+'","'+settle_date+'","'+opening_date+'","'+v.shopName+'","'+v.area+'");\' style="display: inline-block; font-size: 11px; background-color: #c9b18d; color: #514026; border-radius: 10px; padding: 5px 0; text-align: center; width: 60px;">申请报价</a>\n\
</div>\n\
</div>\n\
<div style="margin-left: 142px;">\n\
<p class="weui-media-box__desc" style="color: #bba585;">面积: '+v.area+'m<sup>2</sup></p>\n\
<p class="weui-media-box__desc" style="color: #bba585;">进场日期: <strong>'+settle_date+'</strong></p>\n\
<p class="weui-media-box__desc" style="color: #bba585;">开业日期: <strong>'+opening_date+'</strong></p>\n\
<p class="weui-media-box__desc" style="color: #bba585;">推荐业态: '+businessFormatChs+'</p>\n\
<p class="weui-media-box__desc" style="color: #bba585;">'+desc+'</p>\n\
</div>\n\
</div>\n\
</div>');
        }
    });
    
    if(!$.selectedShops.length) {
        $('.weui-panel__bd').html('<div class="weui-media-box weui-media-box_appmsg" style="color: #c9b18d;">\n\
<div class="weui-media-box__hd">\n\
<i class="fa fa-exclamation-triangle" aria-hidden="true"></i></div>\n\
<div class="weui-media-box__bd">对不起，本区域暂无合适推荐位置，请重新选择区域</div></div>');
    }
}

function addTextLayer(){
    $('map span').remove();
        setTimeout(function () {
            var pos, brand;
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
                    brand = $(this).attr('name');
                    if(brand.length > 10){
                        brand = brand.substring(0,10) + "...";
                    }
                    
                    $(this).after(
                        '<span style="position:absolute;line-height:1;text-align:center;cursor:pointer;color:#fff;text-shadow:#000 1px 1px 1px;">'+brand+'</span>'
                    );
                }
                
                resetFontSize($(this).next(),width,height,4,11,posLeftMin,posTopMin);
            });
        },1000);
    
}

function resetFontSize(divWord, maxWidth, maxHeight, minSize, maxSize, posLeftMin, posTopMin) {
    divWord.css('font-size', minSize + "px");
    for (var i = minSize; i < maxSize; i++) {
        if ($(divWord).width() > maxWidth || $(divWord).height() > maxHeight) {
            $(divWord).css({
                //'font-size': i + 'px',
                'font-size': '6px',
                'left': parseInt(posLeftMin - ($(divWord).width() - maxWidth) / 2 + 6) + 'px',
                'top': parseInt(posTopMin - ($(divWord).height() - maxHeight) / 2 + 6) + 'px'    
            }); 
                break;
        } else {
            $(divWord).css({
                //'font-size': i + 'px',
                'font-size': '6px',
                'left': parseInt(posLeftMin - ($(divWord).width() - maxWidth) / 2) + 'px',
                'top': parseInt(posTopMin - ($(divWord).height() - maxHeight) / 2) + 'px'
            });
        }
    }
};

function GetShopInfo(sc){
    drawShopsFromList(sc);
    renderShopListFromDraw(sc);
}

function GetMyFavorites(){
    $.ajax({
        url: $.api.baseNew+"/comm-wechatol/api/user/favorites/wx/findAllByMobileNo?mobileNo="+$.cookie('uid'),
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
                $.each(response.data, function(i,v){
                    if(v.remarkSecond == 1){
                        $.favorites.push(v.remarkFirst);
                        $.favoritesId.push(v.id);
                    }
                });
            } else {
                interpretBusinessCode(response.customerMessage);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}

function AddToFavorite(bc,c,sc,uc){
    showLoading();
    var map = {
        "buildingCode": bc,
        "code": "",
        "favoritesDate": "",
        "mobileNo": $.cookie('uid'),
        "name": "",
        "remarkFifth": "",
        "remarkFirst": c,
        "remarkFourth": "",
        "remarkSecond": 1,
        "remarkThird": "",
        "storeCode": sc,
        "unitCode": uc,
        "unitType": "leasing",
    }
    
    $.ajax({
        url: $.api.baseNew+"/comm-wechatol/api/user/favorites/wx/saveOrUpdate",
        type: "POST",
        data: JSON.stringify(map),
        async: false,
        dataType: "json",
        contentType: "application/json",
        beforeSend: function(request) {
            request.setRequestHeader("Login", $.cookie('login'));
            request.setRequestHeader("Authorization", $.cookie('authorization'));
            request.setRequestHeader("Lang", $.cookie('lang'));
            request.setRequestHeader("Source", "onlineleasing");
        },
        complete: function(){},
        success: function (response, status, xhr) {
            if(response.code === 'C0') {
                hideLoading();
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                }
                
                var $toast = $('#js_toast_1');
                $('.page.cell').removeClass('slideIn');

                $toast.fadeIn(100);
                setTimeout(function () {
                    location.reload();
                }, 2000);
    
            } else {
                interpretBusinessCode(response.customerMessage);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}

function RemoveFavorite(id,bc,c,sc,uc){
    showLoading();
    var map = {
        "id": id,
        "buildingCode": bc,
        "code": "",
        "favoritesDate": "",
        "mobileNo": $.cookie('uid'),
        "name": "",
        "remarkFifth": "",
        "remarkFirst": c,
        "remarkFourth": "",
        "remarkSecond": 0,
        "remarkThird": "",
        "storeCode": sc,
        "unitCode": uc,
        "unitType": "leasing"
    }
    
    $.ajax({
        url: $.api.baseNew+"/comm-wechatol/api/user/favorites/wx/saveOrUpdate",
        type: "POST",
        data: JSON.stringify(map),
        async: false,
        dataType: "json",
        contentType: "application/json",
        beforeSend: function(request) {
            request.setRequestHeader("Login", $.cookie('login'));
            request.setRequestHeader("Authorization", $.cookie('authorization'));
            request.setRequestHeader("Lang", $.cookie('lang'));
            request.setRequestHeader("Source", "onlineleasing");
        },
        complete: function(){},
        success: function (response, status, xhr) {
            if(response.code === 'C0') {
                hideLoading();
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                }
                
                var $toast = $('#js_toast_2');
                $('.page.cell').removeClass('slideIn');

                $toast.fadeIn(100);
                setTimeout(function () {
                    location.reload();
                }, 2000);
    
            } else {
                interpretBusinessCode(response.customerMessage);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}

function askPrice(ut,sc,ed,od,ud,a){
    showLoading();
    var unit = ut;
    var enterDate = ed;
    var openDate = od;
    var unitDesc = ud;
    var area = a;
    var outTradeNo = '201001' + d.getFullYear() +
                (month<10 ? '0' : '') + month +
                (day<10 ? '0' : '') + day + time
                + '0000' + parseInt(Math.random()*10);
    
    /* 
     * @订单状态  
     *  待确认订单
     *  预览合同已生成
     *  合同待用印
     *  合同用印中
     *  待付款订单
     *  已完成订单
     *  已关闭订单
     */
    
    var map = {
        "amount": 100000,
        "appid": "test",
        "brandId": "",
        "brandName": $.cookie('brand_1'),
        "code": unit,
        "contractInfos": [
          {
            "amount": "",
            "bizScope": "testss",
            "breachAmount": "",
            "code": unit,
            "depositAmount": "",
            "electricBillFlag": "1",
            "endDate": "",
            "enterDate": enterDate,
            "isCleaning": "1",
            "isSecurity": "1",
            "isService": "1",
            "mobileNo": $.cookie('uid'),
            "name": "test name",
            "num": 1,
            "openDate": openDate,
            "orgCode": "201001",
            "otherFlag": "",
            "outTradeNo": outTradeNo,
            "remarkFifth": "",
            "remarkFirst": "",
            "remarkFourth": "",
            "remarkSecond": "",
            "remarkThird": "",
            "salesFlag": "1",
            "serviceDepositAmount": 3000,
            "size": "", //广告尺寸规格
            "spec": "",
            "startDate": openDate,
            "unitCode": unit,
            "unitDesc": unitDesc,
            "unitId": "sfsdfsfasfsfasdfasdf",
            "userId": "20100101",
            "vipFlag": "1",
            "wxCardFlag": "1",
            "area": area //广告默认传1
          }
        ],
        "contractNo": "",
        "contractTermInfos": [
          {
            "amount": "",
            "code": "1",
            "endDate": "",
            "name": "",
            "orgCode": "201001",
            "outTradeNo": outTradeNo,
            "rentAmount": "",
            "startDate": openDate,
            "taxAmount": "",
            "termType": "B011",
            "termTypeName": "固定租金",
            "unitCode": unit,
            "unitId": "sfsdfsfasfsfasdfasdf",
            "area": area 
          },
          {
            "amount": "",
            "code": "1",
            "endDate": "",
            "name": "",
            "orgCode": "201001",
            "outTradeNo": outTradeNo,
            "rentAmount": "",
            "startDate": openDate,
            "taxAmount": "",
            "termType": "B021",
            "termTypeName": "物业管理费",
            "unitCode": unit,
            "unitId": "sfsdfsfasfsfasdfasdf",
            "area": area
          },
          {
            "amount": 0.0159,
            "code": "1",
            "endDate": "",
            "name": "",
            "orgCode": "201001",
            "outTradeNo": outTradeNo,
            "startDate": openDate,
            "taxAmount": 0.015,
            "termType": "G021",
            "termTypeName": "推广费",
            "unitCode": unit,
            "unitId": "sfsdfsfasfsfasdfasdf",
            "area": area
          },
          {
            "amount": "",
            "code": "1",
            "endDate": "",
            "name": "",
            "orgCode": "201001",
            "outTradeNo": outTradeNo, //订单号需动态调用
            "rentAmount": "",
            "startDate": openDate,
            "taxAmount": "",
            "termType": "D011",
            "termTypeName": "提成扣率",
            "unitCode": unit,
            "unitId": "sfsdfsfasfsfasdfasdf",
            "area": area
          }
        ],
        "contractType": "R1",//R1租赁 R4广告 R5场地
        "mobileNo": $.cookie('uid'),
        "name": "wechatol",
        "orderStates": "待确认订单", //订单状态
        "orgCode": "100001",
        "outTradeNo": outTradeNo,
        "payStates": "未支付", //支付状态
        "tenantId": "海鼎公司uuid",
        "tenantName": "公司名",
        "tenantNo": "海鼎公司编号",
        "tenantOrg": "G12321312312223131", //uscc
        "userId": "sfsdfsfasfsfasdfasdf",
        "remarkFirst": sc,
        "remarkSecond": 'leasing'
    };
    
    $.ajax({
        url: $.api.baseNew+"/comm-wechatol/api/order/saveOrUpdate",
        type: "POST",
        data: JSON.stringify(map),
        async: false,
        dataType: "json",
        contentType: "application/json",
        beforeSend: function(request) {
            request.setRequestHeader("Login", $.cookie('login'));
            request.setRequestHeader("Authorization", $.cookie('authorization'));
            request.setRequestHeader("Lang", $.cookie('lang'));
            request.setRequestHeader("Source", "onlineleasing");
        },
        complete: function(){},
        success: function (response, status, xhr) {
            if(response.code === 'C0') {
                hideLoading();
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                }
                findUserCompanyByMobileNo(sc,outTradeNo);
            } else {
                interpretBusinessCode(response.customerMessage);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}

function findUserCompanyByMobileNo(sc,outTradeNo){
    $.ajax({
        url: $.api.baseNew+"/comm-wechatol/api/user/company/wx/findAllByMobileNo?mobileNo="+$.cookie('uid'),
        type: "POST",
        async: false,
        dataType: "json",
        contentType: "application/json",
        beforeSend: function(request) {
            request.setRequestHeader("Login", $.cookie('login'));
            request.setRequestHeader("Authorization", $.cookie('authorization'));
            request.setRequestHeader("Lang", $.cookie('lang'));
            request.setRequestHeader("Source", "onlineleasing");
        },
        complete: function(){},
        success: function (response, status, xhr) {
            if(response.code === 'C0') {
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                }
                
                if(response.data.length > 0){
                    if(response.data[0].name != '' && response.data[0].uscc != ''){
                        window.location.href = '/v2/price?id='+sc+'&trade='+outTradeNo;
                    } else {
                        window.location.href = '/v2/company-info?id='+sc+'&trade='+outTradeNo+'&type=leasing';
                    }
                } else {
                    window.location.href = '/v2/company-info?id='+sc+'&trade='+outTradeNo+'&type=leasing';
                }
            }
        }
    })
}