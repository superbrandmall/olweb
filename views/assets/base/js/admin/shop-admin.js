$.shop = '';
$.coords = '';
$.images = '';

$(document).ready(function(){
    if(getURLParameter('s')) {
        switch (getURLParameter('s')) {
            case "update-succeed":
                $('#ui_succeed').show().delay(2000).hide(0);
                $('html, body').animate({
                    scrollTop: $('#ui_succeed').offset().top
                }, 0);
                break;
            default:
        }
        setTimeout(function () {
            window.history.pushState("object or string", "Title", "/admin/"+refineOfferUrl() );
        },1000);
    }
    
    GetShopInfo();
    
    $('#submit').click(function(){
        SaveShopInfo();
    });
    
    $('#add_images').on("change", function () {
        var formData = new FormData();
        formData.append('vo.userCode',  $.cookie('login'));
        formData.append('vo.containerName', 'test');
        formData.append('vo.prefix', $.cookie('login')+'/photo/shops');
        for(var i=0;i<$('#add_images')[0].files.length;i++){
            formData.append('files', $('#add_images')[0].files[i]);
        }
        $.ajax({
            type: "POST",
            url: $.api.baseNew+"/zuul/onlineleasing-file/api/upload/multi",
            data: formData,
            async: false,
            cache: false,
            processData: false,
            contentType: false,
            beforeSend: function(request) {
                $('#loader').show();
                request.setRequestHeader("Login", $.cookie('login'));
                request.setRequestHeader("Authorization", $.cookie('authorization'));
                request.setRequestHeader("Lang", $.cookie('lang'));
                request.setRequestHeader("Source", "onlineleasing");
            },
            complete: function(){},
            success: function(response, status, xhr) {
                $('#loader').hide();
                if(response.code === 'C0') {
                    $.each(response.data, function(i,v) {
                        var options = ''; 
                        for (var index=0; index<($.images.length + response.data.length); index++) {
                            options += '<option value="'+index+'" class="position_'+index+'">位置 '+index+'</option>';
                        }
                    
                        $('#images').append('\
<div class="col-xs-12 col-sm-6 col-sm-3">\n\
<div class="thumbnail">\n\
<img class="img-responsive" src="'+v.uri+'" alt="">\n\
</div><select style="position:absolute;right:10px;top:0;" id="img_'+($.images.length + i)+'"><option value="">操作</option>'+options+'</select>\n\
</div>'
                        );
                        $('#img_'+($.images.length + i)).find('.position_'+($.images.length + i)).attr('selected','selected');
                    });
                } else {
                    interpretBusinessCode(response.customerMessage);
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
               console.log(textStatus, errorThrown);
            }
        });
    });
});

function GetShopInfo(){
    $.ajax({
        url: $.api.baseNew+"/onlineleasing-admin/api/shop/"+getURLParameter('id')+"",
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
                
                var floorName,mallName;
                $.each($.parseJSON(sessionStorage.getItem("floors")), function(i,v) {
                    if(v.floorCode == shop.floorCode) {
                        floorName = v.description;
                        return false;
                    }
                });
                
                var lk;
                switch (response.data.mallCode) {
                    case $.mallCode.shanghaiSbm:
                        lk = "shanghai-sbm";
                        break;
                    case $.mallCode.baoshanTm:
                        lk = "baoshan-tm";
                        break;
                    case $.mallCode.zhengzhouTm:
                        lk = "zhengzhou-tm";
                        break;
                    case $.mallCode.xuhuiTm:
                        lk = "xuhui-tm";
                        break;
                    case $.mallCode.xianTm:
                        lk = "xian-tm";
                        break;
                    case $.mallCode.wuxiTm:
                        lk = "wuxi-tm";
                        break;
                    default:
                        lk = "shanghai-sbm";
                        break;
                }
                
                if(shop.floorCode != null) {
                    GetMap(floorName,lk,response.data.mallCode);
                }
                
                $.each($.parseJSON(sessionStorage.getItem("malls")), function(i,v) {
                    if(v.mallCode == shop.mallCode) {
                        mallName = v.mallName;
                        return false;
                    }
                });
                
                $('#code').val(shop.code || '-');
                $('#name').val(shop.shopName || '-');
                $('#sub_type').val(shop.subType || '-');
                $('#hd_code').val(shop.hdCode || '-');
                $('#mall').val(mallName || '-');
                $('#floor').val(floorName || '-');
                $('#dead_rent').val((Math.round((shop.deadRent * shop.area * 365) / 12) || '-' ) + '元');
                $('#floating_rental_rate').val((shop.floatingRentalRate * 100 || '-' ) + '%');
                GetBrandModality3(shop.modality);
                
                if(shop.shopState === 1) { // 空铺
                    $('#moving_date').val(IncrMonth(date));
                } else { // 非空铺
                    var contractExpire = new Date();
                    contractExpire.setTime(shop.contractExpireDate);
                    var contractExpireYear = contractExpire.getFullYear('yyyy');
                    var contractExpireMonth = contractExpire.getMonth('mm')+1;
                    var contractExpireDate = contractExpire.getDate('dd');

                    if(IncrMonth(date) <= (contractExpireYear+'-'+contractExpireMonth+'-'+contractExpireDate)) {
                        $('#moving_date').val(IncrDate(contractExpireYear+'-'+contractExpireMonth+'-'+contractExpireDate));
                    } else {
                        $('#moving_date').val(IncrMonth(contractExpireYear+'-'+contractExpireMonth+'-'+contractExpireDate));
                    }
                }
                
                var state;
                switch(shop.shopState){
                    case 1:
                        state = "空铺";
                        break;
                    case 2:
                        state = "待租";
                        break;
                    case 0:
                        state = "在租";
                        break;
                    default:
                        state = "在租";
                        break;
                }
                $('#shop_state').val(state);
                $('#hd_state').val(shop.hdState || '-');
                $('#brand_name').val(shop.brandName || '-');
                $('#area').val((shop.area || '-' ) + '平方米');
                
                if(coords) {
                    $('#coords').val(coords);
                }
                
                if(images && images != null) {
                    var options = ''; 
                    for (var index=0; index<images.length; index++) {
                        options += '<option value="'+index+'" class="position_'+index+'">位置 '+index+'</option>';
                    }
                    
                    $.each(images, function(i,v){
                        $('#images').append('\
<div class="col-xs-12 col-sm-6 col-sm-3">\n\
<div class="thumbnail">\n\
<img class="img-responsive" src="'+v.image+'" alt="">\n\
</div><select style="position:absolute;right:10px;top:0;" id="img_'+i+'"><option value="">操作</option>'+options+'<option value="del">删除</option></select>\n\
</div>'
                        );
                        
                        $('#img_'+i).find('.position_'+v.position).attr('selected','selected');
                
                    });
                }
                
                var locked = 0;
                if(shop.state === 1){
                    $('#buttons center').prepend('<button class="btn btn-danger" id="lock" onClick=\'lockShop("'+shop.code+'");\'><i class="fa fa-lock" aria-hidden="true"> </i> 锁定</button>');
                } else {
                    $('#buttons center').prepend('<button class="btn btn-success" id="unlock" onClick=\'unlockShop("'+shop.code+'");\'><i class="fa fa-unlock" aria-hidden="true"> </i> 解锁</button>');
                }
                
                if(shop.vrValidated === 1) { 
                    $('input:radio[name=vrValidated]')[0].checked = true;
                    $('#vr iframe').attr('src','/'+shop.vr);
                } else {
                    $('input:radio[name=vrValidated]')[1].checked = true;
                    $('#vr .embed-responsive').hide();
                }
                
            } else {
                interpretBusinessCode(response.customerMessage);
            }
        }
    });
}

function SaveShopInfo(){
    $.coords = $('#coords').val();
    
    $('#images select').each(function(i,e){
        if(i<$.images.length){
            if($(e).val() === 'del'){
                $.images[i].deleteFlag = true;
            } else {
                $.images[i].position = $(e).val();
            }
        } else {
            $.images.push({
                'image': $(e).parent().find('img').attr('src'),
                'position': $(e).val()
            });
        }
    });
    
    $.shop.images = $.images;
    $.shop.coords = $.coords;
    $.shop.vrValidated = $('input:radio[name=vrValidated]:checked').val();
    
    var map = $.shop;

    $.ajax({
        url: $.api.baseNew+"/onlineleasing-admin/api/shop/save",
        type: "PUT",
        data: JSON.stringify(map),
        async: false,
        dataType: "json",
        contentType: "application/json",
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
                window.location.href = 'shop?id='+getURLParameter('id')+'&s=update-succeed';              
            } else {
                interpretBusinessCode(response.customerMessage);
            }
        }
    });    
}

function caching() {
    $.ajax({
        url: $.api.baseNew+"/onlineleasing-admin/api/base/coords/refresh",
        type: "POST",
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
                window.location.href = 'shop?id='+getURLParameter('id')+'&s=update-succeed';
            } else {
                interpretBusinessCode(response.customerMessage);
            }
        }
    });    
}

function lockShop(code){
    $.ajax({
        url: $.api.baseNew+"/onlineleasing-admin/api/shop/"+code+"/operate/lock",
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
                $('#lock').remove();
                window.location.href = 'shop?id='+getURLParameter('id')+'&s=update-succeed';
                $('#buttons center').prepend('<button class="btn btn-success" id="unlock" onClick=\'unlockShop("'+code+'");\'><i class="fa fa-unlock" aria-hidden="true"> </i> 解锁</button>');
            } else {
                interpretBusinessCode(response.customerMessage);
            }
        }
    });    
}

function unlockShop(code){
    $.ajax({
        url: $.api.baseNew+"/onlineleasing-admin/api/shop/"+code+"/operate/unlock",
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
                $('#unlock').remove();
                window.location.href = 'shop?id='+getURLParameter('id')+'&s=update-succeed';
                $('#buttons center').prepend('<button class="btn btn-danger" id="lock" onClick=\'lockShop("'+code+'");\'><i class="fa fa-lock" aria-hidden="true"> </i> 锁定</button>');
            } else {
                interpretBusinessCode(response.customerMessage);
            }
        }
    });    
}

function GetBrandModality3(mod) {
    if(mod !== null && mod !== '') {
        var m = mod;
        $.each($.parseJSON(sessionStorage.getItem("modalities")), function(i,v) {
            $.each(v.children, function(j,w) {
                $.each(w.children, function(k,x) {
                    $.each(x.children, function(l,y) {
                        if(y.code == m) {
                            $('#modality').val(y.name);
                            return false;
                        }
                    });
                });
            });
        });
    } else {
        $('#modality').val('-');
    }
}

function GetMap(fn,lk,mc){
    var fc;
    switch (fn) {
        case '十楼':
            fc = '10';
            break;
        case '九楼':
            fc = '9';
            break;
        case '八楼':
            fc = '8';
            break;
        case '七楼':
            fc = '7';
            break;    
        case '六楼':
            fc = '6';
            break;
        case '五楼':
            fc = '5';
            break;
        case '四楼':
            fc = '4';
            break;
        case '三楼':
            fc = '3';
            break;
        case '二楼':
            fc = '2';
            break;
        case '一楼':
            fc = '1';
            break;
        case '负一楼':
            fc = '0';
            break;
        default:
            fc = '1';
            break;
    }
    
    $('#map').attr({
        'src': '/views/assets/base/img/content/floor-plan/'+lk+'/cn/'+fc+'F.png',
        'alt': fc+'F',
        'usemap': '#Map_'+fc+'F_s'
     });
     
    $('#map').parent().append('<map name="Map_'+fc+'F_s" id="Map_'+fc+'F_s"></map>');
    
    getCoords(mc,fn);
}

function getCoords(mc,fn) {
    $.ajax({
        url: $.api.baseNew+"/onlineleasing-customer/api/base/coords/"+mc+"/"+fn+"",
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
                    if(v.state === 1 && v.coords != null && v.coords != ''){
                        $('map').append('<area data-key="'+v.unit+'" alt="'+v.code+'" data-full="'+v.shopState+'" data-modality="'+v.modality+'" name="'+v.brandName+'" href="shop?id='+v.code+'" shape="poly" coords="'+v.coords+'" />');
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
                    fillColor: 'cdcdcd',
                    selected: true
                };
            } else if($(el).attr('data-full') == 1){
                return { 
                    key: $(el).attr('data-key'),
                    toolTip: '空铺',
                    fillColor: 'f2dede',
                    selected: true
                };
            } else {
                return { 
                    key: $(el).attr('data-key'),
                    toolTip: '待租',
                    fillColor: 'fcf8e3',
                    selected: true
                };
            }
            
        }
    });

    $('#map').mapster({
        fillColor: 'c9ae89',
        fillOpacity: 0.8,
        strokeColor: 'ffd62c',
        strokeWidth: 0,
        clickNavigate: true,
        mapKey: 'data-key',
        showToolTip: true,
        areas:  areas,
        onShowToolTip: function () {
            $(".mapster_tooltip").css({
                "font-weight": "bold",
                "color": "#fff",
                "background": "rgba(0,0,0,0.8)",
                "font-size": "26px",
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