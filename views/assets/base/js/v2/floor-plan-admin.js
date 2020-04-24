$.selectedShops = new Array();

$(document).ready(function(){
    $('#showCategoryPicker').on('click', function () {
        weui.picker([{
            label: '不限业态',
            value: '0-1000'
        }, {
            label: '中餐',
            value: 'OLCATEGORY190719000001'
        }, {
            label: '亚洲菜',
            value: 'OLCATEGORY190719000002'
        },{
            label: '西餐&酒吧',
            value: 'OLCATEGORY190719000003'
        }, {
            label: '快餐&咖啡奶茶&甜品',
            value: 'OLCATEGORY190719000004'
        },{
            label: '轻奢',
            value: 'OLCATEGORY190719000005'
        },{
            label: '男性时尚',
            value: 'OLCATEGORY190719000006'
        },{
            label: '化妆品',
            value: 'OLCATEGORY190719000007'
        },{
            label: '运动潮流',
            value: 'OLCATEGORY190719000008'
        },{
            label: '娱乐',
            value: 'OLCATEGORY190719000009'
        },{
            label: '电子产品',
            value: 'OLCATEGORY190719000010'
        },{
            label: 'IP',
            value: 'OLCATEGORY190719000011'
        },{
            label: '女性时尚',
            value: 'OLCATEGORY190719000012'
        },{
            label: '内衣',
            value: 'OLCATEGORY190719000013'
        },{
            label: '鞋包',
            value: 'OLCATEGORY190719000014'
        },{
            label: '黄金珠宝/表',
            value: 'OLCATEGORY190719000015'
        },{
            label: '首饰配饰',
            value: 'OLCATEGORY190719000016'
        },{
            label: '家居/生活方式',
            value: 'OLCATEGORY190719000017'
        },{
            label: '旅游',
            value: 'OLCATEGORY190719000018'
        },{
            label: '健身&健康体验',
            value: 'OLCATEGORY190719000019'
        },{
            label: '儿童类',
            value: 'OLCATEGORY190719000020'
        },{
            label: '快时尚',
            value: 'OLCATEGORY190719000021'
        },{
            label: '临时柜',
            value: 'OLCATEGORY190719000022'
        },{
            label: '服务',
            value: 'OLCATEGORY190719000023'
        }], {
            onChange: function (result) {
            },
            onConfirm: function (result) {
                $('#showCategoryPicker').text(result[0].label);
                $.cookie('category',result[0].value);
            },
            title: '请选择业态'
        });
    });
    
    $('#showSizePicker').on('click', function () {
        weui.picker([{
            label: '不限面积',
            value: '0-1000'
        }, {
            label: '50m²以下',
            value: '0-50'
        }, {
            label: '50-100m²',
            value: '50-100'
        },{
            label: '100-200m²',
            value: '100-200'
        }, {
            label: '200-300m²',
            value: '200-300'
        },{
            label: '300-500m²',
            value: '300-500'
        },{
            label: '500-800m²',
            value: '500-800'
        },{
            label: '800-1000m²',
            value: '800-1000'
        },{
            label: '1000m²以上',
            value: '1000-10000'
        }], {
            onChange: function (result) {
            },
            onConfirm: function (result) {
                $('#showSizePicker').text(result[0].label);
                $.cookie('size',result[0].value);
            },
            title: '请选择面积范围'
        });
    });
    
    $('#showDatePicker').on('click', function (){
        weui.datePicker({
            start: 2020,
            end: new Date().getFullYear(),
            onChange: function (result) {
                console.log(result);
            },
            onConfirm: function (result) {
                $.cookie('startDate',result[0].label+result[1].label+result[2].label);
                $('#showDatePicker').text( $.cookie('startDate'));
            },
            title: '请选择起始日期'
        });
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
    getShopsMoreInfo();
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
                            $('map').append('<area data-key="'+v.unit+'" alt="'+v.code+'" data-full="'+v.shopState+'" data-area="'+v.area+'" data-shop-name="'+v.shopName+'" name="'+(v.brandName || '')+'" href="#" shape="poly" coords="'+v.coords+'" />'); 
                        }
                    } else {
                        if((v.subType == '正柜' || v.subType == 'THEAT') && v.coords != null && v.coords != '' && v.state != 0){
                            $('map').append('<area data-key="'+v.unit+'" alt="'+v.code+'" data-full="'+v.shopState+'"  data-area="'+v.area+'" data-shop-name="'+v.shopName+'" name="'+(v.brandName || '')+'" href=\'javascript: GetShopInfo("'+v.code+'");\' shape="poly" coords="'+v.coords+'" />'); 
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
        url: "/views/assets/base/js/v2/json/shopAll.json",
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
            if(response.code == '200') {
                sessionStorage.setItem("shopsMoreInfo", JSON.stringify(response.data.shop_info) );
            }
        }
    })
}

    
function drawShops(mod,size){
    var areas = $.map($('area'),function(el) {
        //var category = $(el).attr('data-modality').substring(0, 2);
        var area = $(el).attr('data-area');
        
        var minSize = size.split('-')[0];
        var maxSize = size.split('-')[1];
        
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
    var category, area;
    var minSize = 0;
    var maxSize = 10000;
    if($.cookie('size') != '' && $.cookie('size') != null){
        minSize = $.cookie('size').split('-')[0];
        maxSize = $.cookie('size').split('-')[1];
    }
    
    $.selectedShops = [];
    
    $.each($.parseJSON(sessionStorage.getItem("shops")), function(i,v){
        if(v.shopState == 1) {
            if((v.subType == '正柜' || v.subType == 'THEAT') && v.coords != null && v.coords != '' && v.state != 0){
                
                
                
                
                var settle_date = '-';
                var ATV = '';
                var business_format_CHS = '-';
                var free_of_ground_rent = '-';
                var c_per = '';
                $.each($.parseJSON(sessionStorage.getItem("shopsMoreInfo")), function(j,w){
                    
                    if(v.unit == w.unit_no){
                        settle_date = w.settle_date.split(' ')[0] || '';
                        ATV = w.ATV || '';
                        business_format_CHS = w.business_format_CHS || '-';
                        free_of_ground_rent = w.free_of_ground_rent || '-';
                        c_per = w.c_per+'/m<sup>2</sup>/月' || '';
                    }
                })
                    
                
                
                area = v.area;

                if(Math.round(area) > minSize && Math.round(area) < maxSize && v.shopState == 1){
                    $.selectedShops.push(v.code);
                    var src = '/views/assets/base/img/content/mall/1s.jpg';
                    if(v.images != null && v.images.length > 0){
                        src = v.images[0].image;
                    }

                    $('.weui-panel__bd').append('<div onclick="window.location=#" class="weui-media-box weui-media-box_appmsg">\n\
<div class="weui-media-box__hd" style="position: relative; overflow: hidden; height: 110px;">\n\
<a href=\'javascript: showGallery("'+src+'");\'><img class="weui-media-box__thumb" src="'+src+'" alt="" style="height: 60px; width: 90px;"></a>\n\
<span class="weui-mark-lb" style="top:0; font-size: 0.65em; white-space: nowrap;">'+v.shopName+'</span>\n\
<p class="weui-media-box__desc">'+v.area+'m<sup>2</sup></p>\n\
</div>\n\
<div class="weui-media-box__bd">\n\
<p class="weui-media-box__desc">进场日期: '+settle_date+'</p>\n\
<p class="weui-media-box__desc">免租期: '+free_of_ground_rent+'天</p>\n\
<p class="weui-media-box__desc">推荐业态: '+business_format_CHS+'</p>\n\
<p class="weui-media-box__desc">'+ATV+'</p>\n\
<p class="weui-media-box__desc">同品类业绩坪效: '+c_per+'</p>\n\
<ul class="weui-media-box__info">\n\
<li class="weui-media-box__info__meta"><a href=\'javascript: showVR("'+v.shopName+'");\'>VR</a></li>\n\
<li class="weui-media-box__info__meta weui-media-box__info__meta_extra"><a href=\'javascript: drawShopsFromList("'+v.code+'");\'>查看位置</a></li>\n\
<li class="weui-media-box__info__meta weui-media-box__info__meta_extra"><a href=\'javascript: showEngineering("'+v.shopName+'");\'>工程条件</a></li>\n\
<li class="weui-media-box__info__meta weui-media-box__info__meta_extra"><a href=\'javascript: askPrice("'+v.code+'");\' style="color: #fa5151;">申请报价</a></li>\n\
</ul>\n\
</div>\n\
</div>');
                }
                
                
            }
        }
    });
}

function showEngineering(id){
    $("#engineering_pdf").show();
}

function showVR(id){
    $("#vr_viewer").show();
}

function askPrice(sc){
    if($.cookie('startDate') == '' || $.cookie('startDate') == null){
        weui.datePicker({
            start: 2020,
            end: new Date().getFullYear(),
            onChange: function (result) {
                console.log(result);
            },
            onConfirm: function (result) {
                $.cookie('startDate',result[0].label+result[1].label+result[2].label);
                $('#showDatePicker').text( $.cookie('startDate'));
            },
            title: '请选择起始日期'
        });
    } else {
        window.location.href = '/v2/authentication?id='+sc+'';
    }
}

function renderShopListFromDraw(sc){
    $('.weui-panel__bd').html('');
    $.each($.parseJSON(sessionStorage.getItem("shops")), function(i,v){
        if(v.code == sc){
            $.selectedShops.push(v.code);
            
            
            
            var settle_date = '-';
            var ATV = '';
            var business_format_CHS = '-';
            var free_of_ground_rent = '-';
            var c_per = '';
            $.each($.parseJSON(sessionStorage.getItem("shopsMoreInfo")), function(j,w){

                if(v.unit == w.unit_no){
                    settle_date = w.settle_date.split(' ')[0] || '-';
                    ATV = w.ATV || '';
                    business_format_CHS = w.business_format_CHS || '-';
                    free_of_ground_rent = w.free_of_ground_rent || '-';
                    c_per = w.c_per+'/m<sup>2</sup>/月' || '';
                }
            })
            
            
            
            
            var src = '/views/assets/base/img/content/mall/1s.jpg';
            if(v.images != null && v.images.length > 0){
                src = v.images[0].image;
            }

            $('.weui-panel__bd').append('<div onclick="window.location=#" class="weui-media-box weui-media-box_appmsg">\n\
<div class="weui-media-box__hd" style="position: relative; overflow: hidden; height: 110px;">\n\
<a href=\'javascript: showGallery("'+src+'");\'><img class="weui-media-box__thumb" src="'+src+'" alt="" style="height: 60px; width: 90px;"></a>\n\
<span class="weui-mark-lb" style="top:0; font-size: 0.65em; white-space: nowrap;">'+v.shopName+'</span>\n\
<p class="weui-media-box__desc">'+v.area+'m<sup>2</sup></p>\n\
</div>\n\
<div class="weui-media-box__bd">\n\
<p class="weui-media-box__desc">进场日期: '+settle_date+'</p>\n\
<p class="weui-media-box__desc">免租期: '+free_of_ground_rent+'</p>\n\
<p class="weui-media-box__desc">推荐业态: '+business_format_CHS+'</p>\n\
<p class="weui-media-box__desc">'+ATV+'</p>\n\
<p class="weui-media-box__desc">同品类业绩坪效: '+c_per+'</p>\n\
<ul class="weui-media-box__info">\n\
<li class="weui-media-box__info__meta"><a href=\'javascript: showVR("'+v.shopName+'");\'>VR</a></li>\n\
<li class="weui-media-box__info__meta weui-media-box__info__meta_extra"><a href=\'javascript: drawShopsFromList("'+v.code+'");\'>查看位置</a></li>\n\
<li class="weui-media-box__info__meta weui-media-box__info__meta_extra"><a href=\'javascript: showEngineering("'+v.shopName+'");\'>工程条件</a></li>\n\
<li class="weui-media-box__info__meta weui-media-box__info__meta_extra"><a href=\'javascript: askPrice("'+v.code+'");\' style="color: #fa5151;">申请报价</a></li>\n\
</ul>\n\
</div>\n\
</div>');
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