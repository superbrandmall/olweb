var d = new Date();
var month = d.getMonth()+1;
var day = d.getDate();
var date = d.getFullYear() + '-' +
    (month<10 ? '0' : '') + month + '-' +
    (day<10 ? '0' : '') + day;
    
$(document).ready(function(){   
    GetShopInfo();
    
    $('.add-cart').click(function(){
        if($.cookie('uid') && $.cookie('uid') != ''){
            AddCart();
        }
    });
});

function GetShopInfo(){
    var shopCode = getURLParameter('id') || null;
    
    var userCodeParameter = '';
    if($.cookie('uid') && $.cookie('uid') != ''){
        userCodeParameter = "?userCode="+$.cookie('uid');
    }
    
    $.ajax({
        url: $.api.baseNew+"/onlineleasing-customer/api/shop/"+shopCode+userCodeParameter+"",
        type: "GET",
        async: false,
        beforeSend: function(request) {
            $('#loader').show();
            request.setRequestHeader("Login", $.cookie('login'));
            request.setRequestHeader("Authorization", $.cookie('authorization'));
            request.setRequestHeader("Lang", $.cookie('lang'));
            request.setRequestHeader("Source", "onlineleasing");
        },
        complete: function(){},
        success: function (response, status, xhr) {
            $('#loader').hide();
            if(response.code === 'C0') {
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                }
                $('#room_name').text(response.data.shopName || '-');
                $('#unit').text(response.data.unit || '-');
                
                var floorName,floorNameEng,mallName;
                $.each($.parseJSON(sessionStorage.getItem("floors")), function(i,v) {
                    if(v.floorCode == response.data.floorCode) {
                        floorNameEng = v.descriptionEng;
                        floorName = v.description;
                        return false;
                    }
                });
                
                if($.cookie('lang') === 'en-us'){
                    $('#floor').text(floorNameEng || '-');
                    switch(response.data.shopState){
                        case 0:
                            $('#shop_state').text('Current');
                            break;
                        case 1:
                            $('#shop_state').text('Previous');
                            break;
                        case 2:
                            $('#shop_state').text('Current');
                            break;
                        case 3:
                            $('#shop_state').text('Previous');
                            break;
                        default:
                            $('#shop_state').text('Current');
                            break;
                    }
                } else {
                    $('#floor').text(floorName || '-');
                    switch(response.data.shopState){
                        case 0:
                            $('#shop_state').text('在租品牌');
                            break;
                        case 1:
                            $('#shop_state').text('上一品牌');
                            break;
                        case 2:
                            $('#shop_state').text('在租品牌');
                            break;
                        case 3:
                            $('#shop_state').text('上一品牌');
                            break;
                        default:
                            $('#shop_state').text('在租品牌');
                            break;
                    }
                }
                
                var lk;
                switch (response.data.mallCode) {
                    case $.mallCode.shanghaiSbm:
                        lk = "shanghai-sbm";
                        break;
                    case $.mallCode.baoshanTm:
                        lk = "baoshan-tm";
                        break;
                    case $.mallCode.xuhuiTm:
                        lk = "xuhui-tm";
                        break;
                    case $.mallCode.luoyangSbm:
                        lk = "luoyang-sbm";
                        break;
                    case $.mallCode.hefeiSbm:
                        lk = "hefei-sbm";
                        break;
                    default:
                        lk = "shanghai-sbm";
                        break;
                }
                
                if(response.data.floorCode != null) {
                    GetMap(floorName,lk,response.data.mallCode);
                }
                
                $.each($.parseJSON(sessionStorage.getItem("malls")), function(i,v) {
                    if(v.mallCode == response.data.mallCode) {
                        if($.cookie('lang') === 'en-us'){
                            mallName = v.mallNameEng;
                        } else {
                            mallName = v.mallName;
                        }
                        return false;
                    }
                });
                
                $('.c-page-title h3').html(mallName || '-');
                $('#mall_link').html('<a href="'+response.data.mallCode.toLowerCase()+'">'+mallName+'</a>');
                if(response.data.images.length === 0){
                    $('.owl-carousel').append('<div class="c-content-media-2 c-bg-img-center" style="background-image: url('+response.data.firstImage+'); min-height: 380px;"><div class="c-panel"><div class="c-fav"></div></div></div>');            
                } else {
                    if(response.data.shopState !== 0 && response.data.shopState !== 2){ //非在租或待租
                        $('.owl-carousel').append('<div class="c-content-media-2 c-bg-img-center" style="background-image: url(/views/assets/base/img/content/mall/empty'+getRndInteger(1,5)+'.jpg); min-height: 380px;"><div class="c-panel"><div class="c-fav"></div></div></div>');
                    } else {
                        $.each(response.data.images, function(i,v){
                            $('.owl-carousel').append('<div class="item"><div class="c-content-media-2 c-bg-img-center" style="background-image: url('+v.image+'); min-height: 380px;"></div></div>');
                        });
                    }
                }
                
                if($.cookie('lang') === 'en-us'){
                    $('#floor_name').prepend(floorNameEng);
                } else {
                    $('#floor_name').prepend(floorName);
                }
                                
                getFloorInfo(response.data.mallCode,floorName);
                
                GetBrandModality3(response.data.modality);
                $('#b_name').text(response.data.brandName || '-');
                $('#area').text(numberWithCommas(response.data.area)+'m²' || '-');

                if(response.data.shopState === 1) { // 空铺
                    $('#moving_date').text(IncrMonth(date));
                } else { // 非空铺
                    var contractExpire = new Date();
                    contractExpire.setTime(response.data.contractExpireDate);
                    var contractExpireYear = contractExpire.getFullYear('yyyy');
                    var contractExpireMonth = contractExpire.getMonth('mm')+1;
                    var contractExpireDate = contractExpire.getDate('dd');

                    if(IncrMonths(date,6) <= (contractExpireYear+'-'+contractExpireMonth+'-'+contractExpireDate)) {
                        $('#moving_date').text('>6'+$.lang.lengthMonth);
                    } else {
                        if(IncrMonth(date) <= (contractExpireYear+'-'+contractExpireMonth+'-'+contractExpireDate)) {
                            $('#moving_date').text(IncrDate(contractExpireYear+'-'+contractExpireMonth+'-'+contractExpireDate));
                        } else {
                            $('#moving_date').text(IncrMonth(contractExpireYear+'-'+contractExpireMonth+'-'+contractExpireDate));
                        }
                    }
                }

                $('.item .c-content-media-2').append('<div class="c-panel"><div class="c-fav"></div></div>');
                
                if($.cookie('uid') && $.cookie('uid') != ''){
                    $('.c-content-list-1').after('<a href="javascript:;" class="add-cart btn c-btn btn-lg c-font-bold c-font-white c-theme-btn c-btn-square c-font-uppercase">加入购物车</a>');
                } else {
                    $('.c-content-list-1').after('<a href="javascript:;" data-toggle="modal" data-target="#login-form" class="btn c-btn btn-lg c-font-bold c-font-white c-theme-btn c-btn-square c-font-uppercase">加入购物车</a>');
                }
                
                if(response.data.vr !== null) {
                    NetPing(response.data.vr);
                } else {
                    $('#vr_video').hide();
                    $('#shop_location').addClass('col-md-offset-3');
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

function AddCart(){
    var userCode = $.cookie('uid');
    var shopCode = getURLParameter('id');
    
    $.ajax({
        url: $.api.baseNew+"/onlineleasing-customer/api/myfavourite/save?userCode="+userCode+"&shopCode="+shopCode+"",
        type: "POST",
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
        complete: function(){},
        success: function (response, status, xhr) {
            $('#loader').hide();
            if(response.code === 'C0') {
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                }
                window.location.href = "my-cart";
            } else {
                interpretBusinessCode(response.customerMessage);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
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
        'src': 'views/assets/base/img/content/floor-plan/'+lk+'/'+fc+'F.png',
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
                    if(v.state !== 0 && v.coords != null && v.coords != ''){
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
                    toolTip: $.lang.thisStore,
                    selected: true,
                    stroke: true,
                    strokeColor: '6a90e1'
                };
        } else {
            if($(el).attr('data-full') != 1 && $(el).attr('data-full') != 3){
                return { 
                    key: $(el).attr('data-key'),
                    toolTip: $(el).attr('name'),
                    stroke: true,
                    strokeColor: '6a90e1'
                };
            }
        }
    });

    $('#map').mapster({
        fillColor: '7d9fe9',
        fillOpacity: 0.8,
        strokeColor: '6a90e1',
        strokeWidth: 0,
        clickNavigate: true,
        mapKey: 'data-key',
        showToolTip: true,
        areas:  areas,
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
}

function getFloorInfo(mc,fn) {
    $.ajax({
        url: $.api.baseNew+"/onlineleasing-customer/api/base/info/floor/"+mc+"/"+fn+"",
        type: "GET",
        async: false,
        beforeSend: function(request) {
            request.setRequestHeader("Lang", $.cookie('lang'));
            request.setRequestHeader("Source", "onlineleasing");
        },
        complete: function(){},
        success: function (response, status, xhr) {
            if(response.code === 'C0' && response.data != null) {
                var details = response.data.proportion.details;
                var proportion = "";
                var modalityName;
                $.each(details, function(i,v){
                    modalityName = GetFloorModality(v.code);
                    proportion += '<div class="col-sm-5">'+modalityName+' ('+v.count+'): '+Math.round(v.percentage*100)+'%</div><div class="col-sm-7"><div class="progress"><div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="'+Math.round(v.percentage*100)+'" aria-valuemin="0" aria-valuemax="100" style="width: '+Math.round(v.percentage*100)+'%;"></div></div></div><div class="clearfix"> </div>'; 
                });
                $('#proportion').html(proportion);
            } else {
                interpretBusinessCode(response.customerMessage);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}

function NetPing(vr) {
    $.ajax({
        type: "GET",
        cache: false,
        url: vr,
        data: "",
        success: function() {
           $('.embed-responsive iframe').attr('src',vr);
        },
        error: function() {
            $('#vr_video').hide();
            $('#shop_location').addClass('col-md-offset-3');
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
                        if(y.code == m && $.cookie('lang') === 'en-us') {
                            $('#modality').text(y.remark);
                            return false;
                        } else if(y.code == m && $.cookie('lang') !== 'en-us') {
                            $('#modality').text(y.name);
                            return false;
                        } 
                    });
                });
            });
        });
    } else {
        $('#modality').text('-');
    }
}

function GetFloorModality(mod) {
    if($.cookie('lang') === 'en-us'){
        var mm = 'Other';
    } else {
        var mm = '其它';
    }
    if(mod !== null && mod !== '') {
        var m = mod;
        $.each($.parseJSON(sessionStorage.getItem("modalities")), function(i,v) {
            if(v.code == m && $.cookie('lang') !== 'en-us') {
                mm = v.name;
                return false;
            } else if(v.code == m && $.cookie('lang') === 'en-us') {
                mm = v.remark;
                return false;
            }
            $.each(v.children, function(j,w) {
                if(w.code == m && $.cookie('lang') !== 'en-us') {
                    mm = w.name;
                    return false;
                } else if(w.code == m && $.cookie('lang') === 'en-us') {
                    mm = w.remark;
                    return false;
                } 
                $.each(w.children, function(k,x) {
                    if(x.code == m && $.cookie('lang') !== 'en-us') {
                        mm = x.name;
                        return false;
                    } else if(x.code == m && $.cookie('lang') === 'en-us') {
                        mm = x.remark;
                        return false;
                    }
                    $.each(x.children, function(l,y) {
                        if(y.code == m && $.cookie('lang') !== 'en-us') {
                            mm = y.name;
                            return false;
                        } else if(y.code == m && $.cookie('lang') === 'en-us') {
                            mm = y.name;
                            return false;
                        }
                    });
                });
            });
        });
    } else {
        mm = '-';
    }
    
    return mm;
}