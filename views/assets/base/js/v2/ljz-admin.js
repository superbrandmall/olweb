var index=0;
var unitCodes = ["01FL087","01FL059","01FL065","01FL071","01FL097","07FL036","07FL059","07FL060"];
var vr;

$(document).ready(function(){
    if(isAndroid() == true) {
        showIndexPix(1,1354,2);
        showIndexPix(2,1031,2);
        showIndexPix(3,298,1);
    } else {
        document.addEventListener('WeixinJSBridgeReady', function() {
            $('#pix_1,#pix_2,#pix_3').hide();
            $('#video_1,#video_2,#video_3').parent().show();
            
            document.getElementById('video_1').play();
            document.getElementById('video_2').play();
            document.getElementById('video_3').play();
        },false);
    }
    
    for(var j=0;j<=8;j++){
      if(!sessionStorage.getItem('ljz_fl_'+j) || sessionStorage.getItem('ljz_fl_'+j) == null || sessionStorage.getItem('ljz_fl_'+j) == ''){
        getCoordsByFloor(j);
      } else {
        $.each($.parseJSON(sessionStorage.getItem('ljz_fl_'+j)), function(i,v){
            if(v.state !== 0 && v.coords != null && v.coords != ''){
                var index = $.inArray(v.unit, unitCodes);
                if(index >= 0){
                    $('#Map_L'+j).append('<area data-key="'+v.unit+'" alt="'+v.code+'" data-full="'+v.shopState+'" data-area="'+v.area+'" href="/v2/category?id='+v.code+'&type=leasing" shape="poly" coords="'+v.coords+'" />');
                } else {
                    $('#Map_L'+j).append('<area data-key="'+v.unit+'" data-logo="'+v.logo+'" data-area="'+v.area+'" name="'+v.brandName+'" shape="poly" coords="'+v.coords+'" />');
                }
            }
        });

        drawShopsByFloor('L',j);
      }
    }
    
    $('.weui-dialog__btn').on('click', function(){
        $(this).parents('.js_dialog').fadeOut(200);
    });
    
    getShopsInfo();
});

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
                sessionStorage.setItem("shopList", JSON.stringify(response.data) );
            } else {
                interpretBusinessCode(response.customerMessage);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}

function renderShopList(s,category){
    var desc = '';
    var buildingCode;
    var storeCode;
    var shopNo;
    var shop = $.parseJSON(s);
    
    var count = 0;
    $.each(shop, function(j,w){
        if(w.state == 1 && w.businessFormatChs.indexOf(category) >= 0){
            count++;
            desc = w.descript || '';
            shopNo = w.shopNo || '';
            buildingCode = w.buildingCode;
            storeCode = w.storeCode;
            GetMapRecommand(w.floor,'shanghai-sbm','OLMALL180917000003',j,w);
        }
    })
    
    if(count == 0) {
        $('#empty_stores').html('<h4 style="margin: 20px;"><i class="fa fa-exclamation-circle" aria-hidden="true"></i> 抱歉，暂无对应该业态的铺位推荐，你可以选择其他业态看看。</h4>');
    }
    
    $("#recommend_empty_stores").show();
    
    
    function GetMapRecommand(fn,lk,mc,j,w){
        var fc,FN;
        switch (fn) {
            case '9F':
                fc = '9';
                FN = '九楼';
                break;
            case '8F':
                fc = '8';
                FN = '八楼';
                break;
            case '7F':
                fc = '7';
                FN = '七楼';
                break;    
            case '6F':
                fc = '6';
                FN = '六楼';
                break;
            case '5F':
                fc = '5';
                FN = '五楼';
                break;
            case '4F':
                fc = '4';
                FN = '四楼';
                break;
            case '3F':
                fc = '3';
                FN = '三楼';
                break;
            case '2F':
                fc = '2';
                FN = '二楼';
                break;
            case '1F':
                fc = '1';
                FN = '一楼';
                break;
            case 'B1F':
                fc = '0';
                FN = '负一楼';
                break;
            default:
                fc = '1';
                FN = '一楼';
                break;
        }
        
        var jfl=j+fc;
        while($('#recommend_empty_stores #J'+jfl).length <= 0) {
            jfl = Math.floor(Math.random() * 99); 
        }
        
        $('#empty_stores').append('<div style="position: relative; text-align: center;">\n\
<p id="mapp_'+jfl+'" class="weui-grid__label" style="text-align: center; color: #fff; padding: 0 30px 50px;">\n\
<strong>'+shopNo+'</strong>\
<br>'+desc+'</p>\n\</div');
       
        getCoordsRecommand(mc,FN,fc,j,jfl,w.unitCode);
    }
    
    function getCoordsRecommand(mc,FN,fl,j,jfl,unit) {
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
                            if(v.unit == unit){
                                $('#Map_J'+jfl).append('<area data-key="'+v.unit+'" alt="'+v.code+'" data-full="'+v.shopState+'" data-area="'+v.area+'" href="/v2/category?id='+v.code+'&type=leasing" shape="poly" coords="'+v.coords+'" />');
                            } else {
                                $('#Map_J'+jfl).append('<area data-key="'+v.unit+'" data-logo="'+v.logo+'" data-area="'+v.area+'" name="'+v.brandName+'" shape="poly" coords="'+v.coords+'" />');
                            }
                        }
                    });
                    drawRecommandShopsByFloor(j,fl,jfl);
                } else {
                    interpretBusinessCode(response.customerMessage);
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
               console.log(textStatus, errorThrown);
            }
        });
    }
}

function GetMap(fn,lk,mc){
    var fc,FN;
    switch (fn) {
        case '9F':
            fc = '9';
            FN = '九楼';
            break;
        case '8F':
            fc = '8';
            FN = '八楼';
            break;
        case '7F':
            fc = '7';
            FN = '七楼';
            break;    
        case '6F':
            fc = '6';
            FN = '六楼';
            break;
        case '5F':
            fc = '5';
            FN = '五楼';
            break;
        case '4F':
            fc = '4';
            FN = '四楼';
            break;
        case '3F':
            fc = '3';
            FN = '三楼';
            break;
        case '2F':
            fc = '2';
            FN = '二楼';
            break;
        case '1F':
            fc = '1';
            FN = '一楼';
            break;
        case 'B1F':
            fc = '0';
            FN = '负一楼';
            break;
        default:
            fc = '1';
            FN = '一楼';
            break;
    }
    
    $('#map').attr({
        'src': '/views/assets/base/img/content/floor-plan/'+lk+'/'+fc+'F.png',
        'alt': fc+'F',
        'usemap': '#Map_S'+fc
     });
     
    $('#floor_plan_viewer map').html('');
    $('#floor_plan_viewer map').attr({
        'name': 'Map_S'+fc,
        'id': 'Map_S'+fc
    });
        
    $('#floorNo').text(fn);
    getCoords(mc,FN,fc);
}

function getCoords(mc,FN,fl) {
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
                            $('#Map_S'+fl).append('<area data-key="'+v.unit+'" alt="'+v.code+'" data-full="'+v.shopState+'" data-area="'+v.area+'" href="/v2/category?id='+v.code+'&type=leasing" shape="poly" coords="'+v.coords+'" />');
                        } else {
                            $('#Map_S'+fl).append('<area data-key="'+v.unit+'" data-logo="'+v.logo+'" data-area="'+v.area+'" name="'+v.brandName+'" shape="poly" coords="'+v.coords+'" />');
                        }
                    }
                });
                drawShopsByFloor('S',fl);
                $('#floor_plan_viewer').fadeIn(200);
            } else {
                interpretBusinessCode(response.customerMessage);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}

function recommendStores(category){
    renderShopList(sessionStorage.getItem("shopList"),category);
}

function showFloorVR(floor){
    var vr;
    switch (floor) {
        case '6F':
            vr = 'https://720yun.com/t/davkt9d7zfh?scene_id=71055917';
            break;
        case '2F':
            vr = 'https://720yun.com/t/davkt9d7zfh?scene_id=71055570';
            break;
        default:
            vr = 'https://720yun.com/t/davkt9d7zfh?scene_id=71054380';
            break;
    }
    
    $("#vr_viewer iframe").attr('src',vr);
    $("#vr_viewer").show();
}

function showFloorVideo(floor){
    $("#video_viewer video").attr('src','/upload/video/ljz-'+floor+'.mp4');
    $("#video_viewer video").get(0).play();
    $("#video_viewer").show();
}

function getCoordsByFloor(fl) {
    var floorDesc;
    switch (fl) {
        case 0:
            floorDesc = '负一楼';
            break;
        case 1:
            floorDesc = '一楼';
            break;
        case 2:
            floorDesc = '二楼';
            break;
        case 3:
            floorDesc = '三楼';
            break;
        case 4:
            floorDesc = '四楼';
            break;
        case 5:
            floorDesc = '五楼';
            break;
        case 6:
            floorDesc = '六楼';
            break;
        case 7:
            floorDesc = '七楼';
            break;
        case 8:
            floorDesc = '八楼';
            break;
        default:
            floorDesc = [];
            break;
    }
        
    $.ajax({
        url: $.api.baseNew+"/onlineleasing-customer/api/base/coords/OLMALL180917000003/"+floorDesc+"",
        type: "GET",
        async: false,
        beforeSend: function(request) {
            request.setRequestHeader("Lang", $.cookie('lang'));
            request.setRequestHeader("Source", "onlineleasing");
        },
        complete: function(){},
        success: function (response, status, xhr) {
            if(response.code === 'C0') {
                sessionStorage.setItem('ljz_fl_'+fl, JSON.stringify(response.data));
                $.each(response.data, function(i,v){
                    if(v.state !== 0 && v.coords != null && v.coords != ''){
                        var index = $.inArray(v.unit, unitCodes);
                        if(index >= 0){
                            $('#Map_L'+fl).append('<area data-key="'+v.unit+'" alt="'+v.code+'" data-full="'+v.shopState+'" data-area="'+v.area+'" href="/v2/category?id='+v.code+'&type=leasing" shape="poly" coords="'+v.coords+'" />');
                        } else {
                            $('#Map_L'+fl).append('<area data-key="'+v.unit+'" data-logo="'+v.logo+'" data-area="'+v.area+'" name="'+v.brandName+'" shape="poly" coords="'+v.coords+'" />');
                        }
                    }
                });

                drawShopsByFloor('L',fl);
            } else {
                interpretBusinessCode(response.customerMessage);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}

function drawRecommandShopsByFloor(map,level,jfl){
    var areas = $.map($('#Map_J'+jfl+' area'),function(el) {
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
        }
    });
    
    var xOffset;
    var yOffset;
    
    $('#J'+jfl).show();
    $('#J'+jfl).find('img').attr('src','/views/assets/base/img/content/floor-plan/shanghai-sbm/'+level+'F.png');
    $('#J'+jfl).insertBefore($('#mapp_'+jfl));

    $('#J'+jfl).find('img').mapster({
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
    $('#J'+jfl).find('img').mapster('resize',320,null,0);
    setTimeout(function () {
        addLogoLayer(map,level,'J',jfl);
    },1000);
}

function drawShopsByFloor(map,level){
    var areas = $.map($('#Map_'+map+level+' area'),function(el) {
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
        }
    });
    
    var xOffset;
    var yOffset;

    $('#Map_'+map+level).parent().find('img').mapster({
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
    
    setTimeout(function () {
        addLogoLayer(map,level,'',map+level);
    },1000);
}

function addLogoLayer(map,level,J,jfl){
    $('#Map_'+J+jfl+' area').each(function(i,elem){
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

            var spanid = 'span_'+map+'_'+$(this).attr('data-key');
            
            var wrap;
            if(map == 'S'){
                wrap = $('#floor_plan_viewer div[id^=mapster_wrap_]');
            } else if(map == 'L') {
                wrap = $('#L'+level+' div[id^=mapster_wrap_]'); 
            } else {
                wrap = $('#J'+jfl+' div[id^=mapster_wrap_]');                
            }
            
            $(wrap).append(
                '<img id="'+spanid+'" src="https://ol.superbrandmall.com/views/assets/base/img/content/client-logos/web/'+$(this).attr('data-logo')+'" style="position:absolute;line-height:1;text-align:center;" />'
            );
            resetLogoSize(spanid,width,height,15,60,posLeftMin,posTopMin);
            
            $('.weui-dialog__bd img[id^=span_]').click(function(){
                $("#logo_gallery .weui-gallery__img").attr('style','background-image: url('+$(this).attr('src')+')');
                $("#logo_gallery").show();
            })
            
        } else if($(this).attr('data-area') > 200 && $(this).attr('name') != null && $(this).attr('name') != 'null' && $(this).attr('name') != ''){
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

            var brand = $(this).attr('name');
            if(brand.length > 10){
                brand = brand.substring(0,10) + "...";
            }

            var spanid = 'span_'+map+'_'+$(this).attr('data-key');
            
            var wrap;
            if(map == 'S'){
                wrap = $('#floor_plan_viewer div[id^=mapster_wrap_]');
            } else if(map == 'L') {
                wrap = $('#L'+level+' div[id^=mapster_wrap_]'); 
            } else {
                wrap = $('#J'+jfl+' div[id^=mapster_wrap_]');                
            }
            
            $(wrap).append(
                '<span id="'+spanid+'" style="position:absolute;line-height:1;text-align:center;">'+brand+'</span>'
            );

            resetFontSize(spanid,width,height,4,12,posLeftMin,posTopMin);
        }
    })
}

function resetLogoSize(spanid, maxWidth, maxHeight, minSize, maxSize, posLeftMin, posTopMin) {
    var divLogo = $('#'+spanid);
        $(divLogo).css({
            'width': 'auto',
            'height': 'auto',
            'max-width': minSize + 'px',
            'max-height': minSize + 'px',
            'left': parseInt(posLeftMin - ($(divLogo).width() - maxWidth) / 18) + 'px',
            'top': parseInt(posTopMin - ($(divLogo).height() - maxHeight) / 15) + 'px' 
        });
};

function resetFontSize(spanid, maxWidth, maxHeight, minSize, maxSize, posLeftMin, posTopMin) {
    var divWord = $('#'+spanid);
    divWord.css('font-size', minSize + "px");
    for (var i = minSize; i < maxSize; i++) {
        if ($(divWord).width() > maxWidth  || $(divWord).height() > maxHeight) {
            $(divWord).css({
                'font-size': i + 'px',
                'left': parseInt(posLeftMin - ($(divWord).width() - maxWidth) / 2 + 5) + 'px',
                'top': parseInt(posTopMin - ($(divWord).height() - maxHeight) / 2 + 5) + 'px'    
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

function showIndexPix(n,x,y){
    var urlRoot = '/upload/video/sbm-'+n+'/sbm-'+n;
    var indexRange = [0, x];
    var maxLength = indexRange[1] - indexRange[0] + 1;
    // loading
    var eleContainer = document.getElementById('pix_'+n);
    
    $('#video_'+n).parent().hide();
    $('#pix_'+n).show();
    var store = {
        length: 0
    };
    // 图片序列预加载
    for ( var start = indexRange[0]; start <= indexRange[1]; start++) {
        (function (index) {
            var img = new Image();
            img.onload = function () {
                store.length++;
                // 存储预加载的图片对象
                store[index] = this;
                play();
            };
            img.onerror = function () {
                store.length++;
                play();
            };
            if(y == 1){
                img.src = urlRoot + formatIndex(index) + '.jpg';
            } else {
                img.src = urlRoot + formatIndex2(index) + '.jpg';
            }
        })(start);
    }

    var play = function () {
        var percent = Math.round(100 * store.length / maxLength);
        // 全部加载完毕，无论成功还是失败
        if (percent == 100) {
            var index = indexRange[0];
            eleContainer.innerHTML = '';
            // 依次append图片对象
            var step = function () {
                if (store[index - 1]) {
                    store[index - 1].remove();
                }
                eleContainer.appendChild(store[index]);
                // 序列增加
                index++;
                // 如果超过最大限制
                if (index <= indexRange[1]) {
                    // 15fps, 1000ms/15=67 每帧约0.067秒
                    //setTimeout(step, 67);
                    setTimeout(step, 42);
                } else {
                    // 本段播放结束回调
                    play();
                }
            };
            // 等100%动画结束后执行播放
            setTimeout(step, 100);
        }
    };
}