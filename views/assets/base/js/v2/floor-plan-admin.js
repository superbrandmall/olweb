$.selectedShops = new Array();

$(document).ready(function(){
    if(!sessionStorage.getItem("modalities") || sessionStorage.getItem("modalities") == null || sessionStorage.getItem("modalities") == '') {
        getModalities();
    }
    
    getBrandModality0();
    
    $('#modality_0').change(function(){
       drawShops($(this).val(),$('#size').val());
       getBrandModality1($(this).val());
       renderShopList(sessionStorage.getItem("shops"));
    });
    
    $('#modality_1').change(function(){
       drawShops($(this).val(),$('#size').val());
       renderShopList(sessionStorage.getItem("shops"));
    });
    
    $('#size').change(function(){
       drawShops($('#modality_1').val() != '' ? $('#modality_1').val() : $('#modality_0').val(),$(this).val());
       renderShopList(sessionStorage.getItem("shops"));
    });
    
    $('#start').datepicker({
        'language': 'zh-CN',
        'format': 'yyyy-mm',
        'startDate': '+30d',
        'startView': "months", 
        'minViewMode': "months"
    });
    
    
    /*$('#ask_price').click(function(){
        window.location.href = '/v2/authentication?id='+$('#shop_code').text();
    });*/

    var floorDesc, floor = '8F';
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
        getShopFloorInfo(floorDesc);
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
        
        if($('#nav_summary').hasClass('active') == false){
            $('#nav_f_1').addClass('active');
        }
        
        getShopFloorInfo('八楼');
    }

    $('#floorNo').text(floor);
    
    var size = 0.85;
    $('#zoom_in').click(function (){
        size = size + 0.15;
        $('#map').mapster('resize', size*($(window).width()), 0, 0);
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
        $('#map').mapster('resize', size*($(window).width()), 0, 0);
        addTextLayer();
        
        $('#zoom_in').attr('disabled', false);
        if(size <= 0.15){
            $(this).attr('disabled', true);
        } else {
            $(this).attr('disabled', false);
        }
    });
    
});

function getShopFloorInfo(fl) {
    $.ajax({
        url: $.api.baseNew+"/onlineleasing-customer/api/base/coords/OLMALL180917000003/"+fl+"",
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
                sessionStorage.setItem("shops", JSON.stringify(response.data) );
                $.each(response.data, function(i,v){
                    if((v.subType == '正柜' || v.subType == 'THEAT') && v.state != 0 ){

                    }
                    
                    if(v.shopState == 0 || v.shopState == 2){
                        if((v.subType == '正柜' || v.subType == 'THEAT') && v.coords != null && v.coords != '' && v.state != 0){
                            $('map').append('<area data-key="'+v.unit+'" alt="'+v.code+'" data-full="'+v.shopState+'" data-modality="'+v.modality+'" data-area="'+v.area+'" data-shop-name="'+v.shopName+'" name="'+(v.brandName || '')+'" href="#" shape="poly" coords="'+v.coords+'" />'); 
                        }
                    } else {
                        if((v.subType == '正柜' || v.subType == 'THEAT') && v.coords != null && v.coords != '' && v.state != 0){
                            $('map').append('<area data-key="'+v.unit+'" alt="'+v.code+'" data-full="'+v.shopState+'" data-modality="'+v.modality+'" data-area="'+v.area+'" data-shop-name="'+v.shopName+'" name="'+(v.brandName || '')+'" href=\'javascript: GetShopInfo("'+v.code+'");\' shape="poly" coords="'+v.coords+'" />'); 
                        }
                    }
                });

                if(getURLParameter('f') && getURLParameter('f') == '10'){
                    $('#renovation').text('100');
                    $('#leased').text('0');
                }
                
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
    
function drawShops(mod,size){
    var areas = $.map($('area'),function(el) {
        var category = $(el).attr('data-modality').substring(0, 2);
        var area = $(el).attr('data-area');
        
        var minSize = size.split('-')[0];
        var maxSize = size.split('-')[1];
        
        if(mod.length == 4){
            category = $(el).attr('data-modality').substring(0, 4);
        }
        
        if(mod == '') {
            if(Math.round(area) > minSize && Math.round(area) < maxSize && $(el).attr('data-full') == 1){
                return { 
                    key: $(el).attr('data-key'),
                    toolTip: '铺位号: '+$(el).attr('data-shop-name')+'<br>面积: '+$(el).attr('data-area')+'m<sup>2</sup>',
                    fillColor: 'ffff00',
                    fillOpacity: 1,
                    stroke: false,
                    selected: true 
                };
            }
        } else {
            if(category == mod && Math.round(area) > minSize && Math.round(area) < maxSize && $(el).attr('data-full') == 1){
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
    
    if(document.body.clientWidth >= 1280){
        $('#map').mapster('resize', 0.85*($(window).width()), 0, 0);
    }
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
    
    if(document.body.clientWidth >= 1280){
        $('#map').mapster('resize', 0.85*($(window).width()), 0, 0);
    }
    addTextLayer();
}

function renderShopList(shop){
    $('ul.chat').html('');
    var category, area;
    var minSize = 0;
    var maxSize = 10000;
    if($('#size').val() != ''){
        minSize = $('#size').val().split('-')[0];
        maxSize = $('#size').val().split('-')[1];
    }
    var mod = $('#modality_0').val();
    if($('#modality_0').val() != ''){
        mod = $('#modality_1').val();
    }
    
    $.selectedShops = [];
    
    var moda = '00';
    $.each($.parseJSON(sessionStorage.getItem("shops")), function(i,v){
        if(v.shopState == 1) {
            if((v.subType == '正柜' || v.subType == 'THEAT') && v.coords != null && v.coords != '' && v.state != 0){
                if(v.modality != null){
                    moda = v.modality;
                }
                category = moda.substring(0, 2);
                area = v.area;

                if(mod != '' && mod.length == 4){
                    category = moda.substring(0, 4);
                }

                if(mod == '') {
                    if(Math.round(area) > minSize && Math.round(area) < maxSize && v.shopState == 1){
                        $.selectedShops.push(v.code);
                        var src = '/views/assets/base/img/content/mall/1s.jpg';
                        if(v.images != null && v.images.length > 0){
                            src = v.images[0].image;
                        }
                        
                        $('ul.chat').append('<li class="left clearfix">\n\
<span class="pull-left">\n\
<img src="'+src+'" alt=""><br>\n\
<strong class="primary-font">'+v.shopName+'</strong>\n\
</span>\n\
<div class="chat-body clearfix">\n\
<div class="header">入驻日期: <a href="#" class="pull-right badge">VR</a>\n\
</div>\n\
<div class="header">面积: '+v.area+'m<sup>2</sup><a href=\'javascript: drawShopsFromList("'+v.code+'");\' class="pull-right badge">查看位置</a></div>\n\
<div class="header">店铺特色: <a href="/v2/authentication?id='+v.code+'" class="pull-right badge">申请报价</a></div><div class="header">工程条件: 有/无，排烟量:</div><div class="header">展面宽度:</div></div></li>');
                    }
                } else {
                    if(category == mod && Math.round(area) > minSize && Math.round(area) < maxSize && v.shopState == 1){
                        var src = '/views/assets/base/img/content/mall/1s.jpg';
                        $.selectedShops.push(v.code);
                        
                        if(v.images != null && v.images.length > 0){
                            src = v.images[0].image;
                        }
                        
                        $('ul.chat').append('<li class="left clearfix">\n\
<span class="pull-left">\n\
<img src="'+src+'" alt=""><br>\n\
<strong class="primary-font">'+v.shopName+'</strong>\n\
</span>\n\
<div class="chat-body clearfix">\n\
<div class="header">入驻日期: <a href="#" class="pull-right badge">VR</a>\n\
</div>\n\
<div class="header">面积: '+v.area+'m<sup>2</sup><a href=\'javascript: drawShopsFromList("'+v.code+'");\' class="pull-right badge">查看位置</a></div>\n\
<div class="header">店铺特色: <a href="/v2/authentication?id='+v.code+'" class="pull-right badge">申请报价</a></div><div class="header">工程条件: 有/无，排烟量:</div><div class="header">展面宽度:</div></div></li>');
                    }
                }
            
            }
        }
    });
}

function renderShopListFromDraw(sc){
    $('ul.chat').html('');
    $.each($.parseJSON(sessionStorage.getItem("shops")), function(i,v){
        if(v.code == sc){
            $.selectedShops.push(v.code);
            
            var src = '/views/assets/base/img/content/mall/1s.jpg';
            if(v.images != null && v.images.length > 0){
                src = v.images[0].image;
            }

            $('ul.chat').append('<li class="left clearfix">\n\
<span class="pull-left">\n\
<img src="'+src+'" alt=""><br>\n\
<strong class="primary-font">'+v.shopName+'</strong>\n\
</span>\n\
<div class="chat-body clearfix">\n\
<div class="header">入驻日期: <a href="#" class="pull-right badge">VR</a>\n\
</div>\n\
<div class="header">面积: '+v.area+'m<sup>2</sup><a href=\'javascript: drawShopsFromList("'+v.code+'");\' class="pull-right badge">查看位置</a></div>\n\
<div class="header">店铺特色: <a href="/v2/authentication?id='+v.code+'" class="pull-right badge">申请报价</a></div><div class="header">工程条件: 有/无，排烟量:</div><div class="header">展面宽度:</div></div></li>');
        }
        
    });
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
                        '<span style="position:absolute;line-height:1;text-align:center;cursor:pointer;">'+brand+'</span>'
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
    drawShopsFromList(sc);
    renderShopListFromDraw(sc);
    
    /*var userCodeParameter = '';
    if($.cookie('uid') && $.cookie('uid') != ''){
        userCodeParameter = "?userCode="+$.cookie('uid');
    }
    
    $.ajax({
        url: $.api.baseNew+"/onlineleasing-customer/api/shop/"+sc+userCodeParameter+"",
        type: "GET",
        async: false,
        beforeSend: function(request) {
            $('#loader').show();
            request.setRequestHeader("Login", $.cookie('login'));
            request.setRequestHeader("Authorization", $.cookie('authorization'));
            request.setRequestHeader("Lang", $.cookie('lang'));
            request.setRequestHeader("Source", "onlineleasing");
        },
        success: function (response, status, xhr) {
            $('#loader').hide();
            if(response.code === 'C0') {
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                }
                
                var shop = response.data;
                $.shop = shop;
                var coords = shop.coords;
                $.coords = coords || '';
                var images = shop.images;
                $.images = images;
                
                if(shop.shopState === 1) { // 空铺
                    $('#moving_date').text(IncrMonth(date));
                } else { // 非空铺
                    var contractExpire = new Date();
                    contractExpire.setTime(shop.contractExpireDate);
                    var contractExpireYear = contractExpire.getFullYear('yyyy');
                    var contractExpireMonth = contractExpire.getMonth('mm')+1;
                    if(contractExpireMonth < 10){
                        contractExpireMonth = "0"+contractExpireMonth;
                    }
                    var contractExpireDate = contractExpire.getDate('dd');
                    if(contractExpireDate < 10) {
                        contractExpireDate = "0"+contractExpireDate;
                    }

                    if(IncrMonths(date,6) <= (contractExpireYear+'-'+contractExpireMonth+'-'+contractExpireDate)) {
                        $('#moving_date').text('>6个月');
                    } else {
                        if(IncrMonth(date) <= (contractExpireYear+'-'+contractExpireMonth+'-'+contractExpireDate)) {
                            $('#moving_date').text(IncrDate(contractExpireYear+'-'+contractExpireMonth+'-'+contractExpireDate));
                        } else {
                            $('#moving_date').text(IncrMonth(contractExpireYear+'-'+contractExpireMonth+'-'+contractExpireDate));
                        }
                    }
                }
                
                $('#rent').text((shop.deadRent || '-' ) + ' 元/m²/天');
                $('#float_rent').text((Math.round(shop.floatingRentalRate * 100) || '-' ) + '%');
                
                $('#area').text((shop.area || '-' ) + ' m²');
                
                if(images != null && images.length > 0) {
                    $('.modal-header').css('background-image','url("'+images[0].image+'")');
                } else {
                    $('.modal-header').css('background-image','url("https://ol.superbrandmall.com/views/assets/base/img/content/backgrounds/banner.jpg")');
                }
                
                if(shop.vr !== null) {
                    NetPing(images,shop.vr);
                } else {
                    $('#store_vr .embed-responsive').hide();
                    if(images != null && images.length > 1) {
                        $('#store_img').html('<img src="'+images[1].image+'" style="width: 100%;" />');
                    } else {
                        $('#store_img').html('');
                    } 
                }
                
                $('#shop_detail').css('opacity', 1);
                
                $('#shop_detail').modal('toggle');
                
                $('#shop_code').text(shop.code);
                $('#shop_name').text(shop.shopName);
            } else {
                interpretBusinessCode(response.customerMessage);
            }
        }
    });*/
}
function getBrandModality0() {
    $.each($.parseJSON(sessionStorage.getItem("modalities")), function(i,v) {
        if($.inArray(v.code,['00','01']) != -1){
            if($.cookie('lang') === 'en-us'){
                $('#modality_0').append('<option value="'+v.code+'">'+v.remark+'</option>');
            } else {
                $('#modality_0').append('<option value="'+v.code+'">'+v.name+'</option>');
            }
        }
    });
}

function getBrandModality1(mod) {
    var m = mod;
	$('#modality_1').children().not(':first').remove();
    
    $.each($.parseJSON(sessionStorage.getItem("modalities")), function(i,v) {
        if(v.code == m) {
            if($.inArray(v.code,['00','01','02']) != -1){
                $.each(v.children, function(j,w) {
                    if($.cookie('lang') === 'en-us'){
                        $('#modality_1').append('<option value="'+w.code+'">'+w.remark+'</option>');
                    } else {
                        $('#modality_1').append('<option value="'+w.code+'">'+w.name+'</option>');
                    }
                });
            }
        }
    });
}

function NetPing(images,vr) {
    $.ajax({
        type: "GET",
        cache: false,
        url: 'https://ol.superbrandmall.com/'+vr,
        data: "",
        success: function() {
            $('#store_vr .embed-responsive').show();
            $('#store_vr iframe').attr('src','/'+vr);
            $('#store_img').html('');
        },
        error: function() {
            $('#store_vr .embed-responsive').hide();
            if(images != null && images.length > 1) {
                $('#store_img').html('<img src="'+images[1].image+'" style="width: 100%;" />');
            } else {
                $('#store_img').html('');
            }
        }
    });
}

function getModalities() {
    $.ajax({
        url: $.api.baseNew+"/onlineleasing-customer/api/base/modality/findAll",
        type: "GET",
        async: false,
        beforeSend: function(request) {
            request.setRequestHeader("Lang", $.cookie('lang'));
            request.setRequestHeader("Source", "onlineleasing");
        },
        success: function (response, status, xhr) {
            if(response.code === 'C0') {
                sessionStorage.setItem("modalities", JSON.stringify(response.data) );
            } else {
                interpretBusinessCode(response.customerMessage);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}