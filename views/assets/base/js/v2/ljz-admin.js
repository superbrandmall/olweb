var index=0;
var unitCodes = ["01FL064","03FL039","03FL121"];
var vr;

$(document).ready(function(){
    //setInterval("change()",6000);
    $(function(){
        $('.collapse .js-category').click(function(){
            $parent = $(this).parent('li');
            if($parent.hasClass('js-show')){
                $parent.removeClass('js-show');
                $(this).children('i').removeClass('icon-35').addClass('icon-74');
            }else{
                $parent.siblings().removeClass('js-show');
                $parent.addClass('js-show');
                $(this).children('i').removeClass('icon-74').addClass('icon-35');
                $parent.siblings().find('i').removeClass('icon-35').addClass('icon-74');
            }
        });

    });
        
    $('.macaroon a').click(function(){
        if($(this).hasClass('active')){
            $(this).removeClass('active');
        }else{
            $(this).siblings().removeClass('active');
            $(this).addClass('active');
        }
    });
    
    window.onload = function(){ 
        $('.slide').hide();
        $('.floors').css('height',$('.macaroon').innerHeight());
    }
    
    $('.slide').swipeSlide({
        autoSwipe:true,
        continuousScroll:true,
        transitionType:'ease-in',
        lazyLoad:true,
        firstCallback : function(i,sum,me){
        },
        callback : function(i,sum,me){
        }
    });
    
    $('.weui-dialog__btn').on('click', function(){
        $(this).parents('.js_dialog').fadeOut(200);
    });
    
    $('.floor_plan').on('click', function(){
        $('map').html('');
        GetMap($(this).attr('id'),'shanghai-sbm','OLMALL180917000003');
    });
    
    getShopsInfo();
});

function change(){
    index++;
    
    if(index > 1){
        index=0;
    }
    console.log(index);
    var imgs=["/views/assets/base/img/content/backgrounds/sbm/Floor/4F-1.jpg","/views/assets/base/img/content/backgrounds/sbm/Floor/4F-2.jpg"];
    
    $("#4F").css('background','url('+imgs[index]+')');
}

function showFloorImg(floor){
    $('.slide, .floors_desc').hide();
    $('.floors, .floors_desc').hide();
    $('#'+floor+', #'+floor+'_desc').fadeIn();
}

function showFloorSlide(floor){
    $('.floors, .floors_desc').hide();
    $('.slide, .floors_desc').hide();
    
    $('.slide').css('height',$('.macaroon').innerHeight());
    
    $('#'+floor+', #'+floor+'_desc').fadeIn();
    $('#'+floor).parent('.slide').fadeIn();
}

function getShopsInfo() {
    $.ajax({
        url: $.api.baseNew+"/comm-wechatol/api/shop/base/findAllByStoreCode?storeCode=OLMALL180917000003",
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
                renderShopList(JSON.stringify(response.data));
            } else {
                interpretBusinessCode(response.customerMessage);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}

function renderShopList(s){
    var desc = '';
    var buildingCode;
    var storeCode;
    var shopNo;
    var shop = $.parseJSON(s);
    
    $.each(shop, function(j,w){
        if(w.state == 1){
            desc = w.desc || '';
            shopNo = w.shopNo || '';
            buildingCode = w.buildingCode;
            storeCode = w.storeCode;
            
            $('#empty_stores').append('<a id="shop_'+w.unitCode+'" href="/v2/category?id='+w.remarkSecond+'&type=leasing" class="weui-grid">\n\
                <div class="weui-grid__icon" style="position: relative;">\n\
                    <img src="/views/assets/base/img/content/backgrounds/leasing/'+w.unitCode+'.jpg" alt="">\n\
                    <img src="/views/assets/base/img/content/backgrounds/sbm/Floor/0'+w.floor+'.png" alt="0'+w.floor+'" height="35" style="position: absolute;bottom: 29px;right: 11px;width: 73px;height: auto;">\n\
                    <span style="position: absolute;bottom: 8px;right: 15px;color: #efefef;font-size: 12px;">'+w.shopNo+'</span>\n\
                </div>\n\
                <p class="weui-grid__label">\n\
                <strong>'+shopNo+'</strong>\
                <br>'+desc+'</p>\n\
                </a>'
            );
        }
    })
}

function showVR(){
    $("#vr_viewer").fadeIn();
}

function closeVR($s){
    $("#vr_viewer").hide();
    $s.parents('js-show').find('.js-category').find('i').removeClass('icon-35').addClass('icon-74');
    $s.parents('js-show').removeClass('js-show');
};

function GetMap(fn,lk,mc){
    var fc,FN;
    switch (fn) {
        case '9F':
            fc = '9';
            FN = '九楼';
            vr = 'https://720yun.com/t/d0vksldepqe?scene_id=44188809';
            break;
        case '8F':
            fc = '8';
            FN = '八楼';
            vr = 'https://720yun.com/t/d0vksldepqe?scene_id=48463594';
            break;
        case '7F':
            fc = '7';
            FN = '七楼';
            vr = 'https://720yun.com/t/d0vksldepqe?scene_id=44188807';
            break;    
        case '6F':
            fc = '6';
            FN = '六楼';
            vr = 'https://720yun.com/t/d0vksldepqe?scene_id=44186925';
            break;
        case '5F':
            fc = '5';
            FN = '五楼';
            vr = 'https://720yun.com/t/d0vksldepqe?scene_id=44186892';
            break;
        case '4F':
            fc = '4';
            FN = '四楼';
            vr = 'https://720yun.com/t/d0vksldepqe?scene_id=48463593';
            break;
        case '3F':
            fc = '3';
            FN = '三楼';
            vr = 'https://720yun.com/t/d0vksldepqe?scene_id=44182613';
            break;
        case '2F':
            fc = '2';
            FN = '二楼';
            vr = 'https://720yun.com/t/d0vksldepqe?scene_id=44182612';
            break;
        case '1F':
            fc = '1';
            FN = '一楼';
            vr = 'https://720yun.com/t/d0vksldepqe?scene_id=44042266';
            break;
        case 'B1F':
            fc = '0';
            FN = '负一楼';
            break;
        default:
            fc = '1';
            FN = '一楼';
            vr = 'https://720yun.com/t/d0vksldepqe?scene_id=44042266';
            break;
    }
    
    $('#map').attr({
        'src': '/views/assets/base/img/content/floor-plan/'+lk+'/'+fc+'F.png',
        'alt': fc+'F',
        'usemap': '#Map_'+fc+'F_s'
     });
     
    $('#map').parent().append('<map name="Map_'+fc+'F_s" id="Map_'+fc+'F_s"></map>');
    
    $('#floorNo').text(fn);
    $('#floorVRLink').attr('href','javascript: showFloorVR(vr)');
    getCoords(mc,FN);
}

function getCoords(mc,FN) {
    $.ajax({
        url: $.api.baseNew+"/onlineleasing-customer/api/base/coords/"+mc+"/"+FN+"",
        type: "GET",
        async: false,
        beforeSend: function(request) {
            request.setRequestHeader("Lang", $.cookie('lang'));
            request.setRequestHeader("Source", "onlineleasing");
        },
        complete: function(){},
        success: function (response, status, xhr) {
            if(response.code === 'C0') {
                $.each(response.data, function(i,v){
                    if(v.state !== 0 && v.coords != null && v.coords != ''){
                        var index = $.inArray(v.unit, unitCodes);
                        if(index >= 0){
                            $('map').append('<area data-key="'+v.unit+'" alt="'+v.code+'" data-full="'+v.shopState+'" data-area="'+v.area+'" data-logo="'+v.logo+'"  href="/v2/category?id='+v.code+'&type=leasing" shape="poly" coords="'+v.coords+'" />');
                        } else {
                            $('map').append('<area data-logo="'+v.logo+'" name="'+v.brandName+'" shape="poly" coords="'+v.coords+'" />');
                        }
                    }
                });
                drawShops();
            } else {
                interpretBusinessCode(response.customerMessage);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}

function drawShops(){
    var areas = $.map($('area'),function(el) {
        if($(el).attr('href')){
            return { 
                    key: $(el).attr('data-key'),
                    toolTip: "推荐位置",
                    fillColor: 'F26A85',
                    fillOpacity: 1,
                    stroke: true,
                    strokeColor: 'DC143C',
                    strokeWidth: 1,
                    selected: true
                };
        } else {
            if($(el).attr('data-full') != 1 && $(el).attr('data-full') != 3){
                return { 
                    key: $(el).attr('data-key'),
                    toolTip: $(el).attr('name'),
                    fillColor: 'cdcdcd'
                };
            }
        }
    });
    
    var xOffset;
    var yOffset;

    $('#map').mapster({
        fillColor: 'c9ae89',
        fillOpacity: 0,
        strokeColor: 'ffd62c',
        strokeWidth: 0,
        mapKey: 'data-key',
        showToolTip: true,
        areas:  areas,
        clickNavigate: true,
        onShowToolTip: function () {
            $(".mapster_tooltip").css({
                    "font-weight": "bold",
                    "color": "#fff",
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

    addLogoLayer();
    $('#floor_plan_viewer').fadeIn(200);
}

function showFloorVR(vr){
    $("#floor_vr iframe").attr('src',vr);
    $("#floor_vr").show();
}

function addLogoLayer(){
    $('map area').each(function(i,elem){
        if($(this).attr('data-area') > 100 && $(this).attr('data-logo') != null && $(this).attr('data-logo') != 'null' && $(this).attr('data-logo') != ''){
            var pos;
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

            var spanid = 'span_'+$(this).attr('data-key');
            $('#mapster_wrap_0').append(
                '<img id="'+spanid+'" src="https://ol.superbrandmall.com/views/assets/base/img/content/client-logos/web/'+$(this).attr('data-logo')+'" style="position:absolute;line-height:1;text-align:center;" />'
            );
            resetLogoSize(spanid,width,height,20,60,posLeftMin,posTopMin);
        }
    })
}

function resetLogoSize(spanid, maxWidth, maxHeight, minSize, maxSize, posLeftMin, posTopMin) {
    var divLogo = $('#'+spanid);
    for (var i = minSize; i < maxSize; i++) {
        if ($(divLogo).width() > maxWidth || $(divLogo).height() > maxHeight) {
            $(divLogo).css({
                'max-width': i + 'px',
                'max-height': maxHeight,
                'left': parseInt(posLeftMin - ($(divLogo).width() - maxWidth) / 4.7) + 'px',
                'top': parseInt(posTopMin - ($(divLogo).height() - maxHeight) / 3.5) + 'px'  
            }); 
                break;
        } else {
            $(divLogo).css({
                'max-height': i + 'px',
                'max-width': maxWidth,
                'left': parseInt(posLeftMin - ($(divLogo).width() - maxWidth) / 4.7) + 'px',
                'top': parseInt(posTopMin - ($(divLogo).height() - maxHeight) / 3.5) + 'px'
            });
        }
    }
};