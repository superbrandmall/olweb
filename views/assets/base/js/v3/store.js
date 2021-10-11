var d = new Date();
var month = d.getMonth()+1;
var day = d.getDate();
var date = d.getFullYear() + '-' +
    (month<10 ? '0' : '') + month + '-' +
    (day<10 ? '0' : '') + day;

if($.cookie('lang') === 'en-us'){
    $.lang = {
        addToFavorites: "Add to Favorites",
        lengthMonth: " month(s)"
    };
} else {
    $.lang = {
        addToFavorites: "加入收藏夹",
        lengthMonth: "个月"
    };
}

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
            $.showLoading("数据加载中");
            request.setRequestHeader("Login", $.cookie('login'));
            request.setRequestHeader("Authorization", $.cookie('authorization'));
            request.setRequestHeader("Lang", $.cookie('lang'));
            request.setRequestHeader("Source", "onlineleasing");
        },
        complete: function(){},
        success: function (response, status, xhr) {
            $.hideLoading();
            if(response.code === 'C0') {
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                }
                $('#store_desc').text(response.data.remark_5 != null ? response.data.remark_5 : response.data.brandName);
                $('#room_name').text(response.data.shopName || '-');
                
                var floorName,floorNameEng,mallName;
                $.each($.parseJSON(sessionStorage.getItem("floors")), function(i,v) {
                    if(v.floorCode == response.data.floorCode) {
                        floorNameEng = v.descriptionEng;
                        floorName = v.description;
                        return false;
                    }
                });
                
                $('#floor').text(floorName || '-');
                switch(response.data.shopState){
                    case 0:
                        $('#shop_state').text('在租');
                        break;
                    case 1:
                        $('#shop_state').text('空铺');
                        break;
                    case 2:
                        $('#shop_state').text('待租');
                        break;
                    default:
                        $('#shop_state').text('在租');
                        break;
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
                
                $('#shopName').text(response.data.shopName);
                
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
                
                $('#mall_name').html(mallName);
                
                if(response.data.images.length === 0){
                    $('.swiper-wrapper').append('<div class="swiper-slide"><img class="img-responsive" src="'+response.data.firstImage+'"></div>');
                } else {
                    $.each(response.data.images, function(i,v){
                        if(i < 4) {
                            $('.swiper-wrapper').append('<div class="swiper-slide"><img class="img-responsive" src="'+v.image+'"></div>');
                            $('.swiper-pagination').append('<span class="swiper-pagination-bullet"></span>');
                        }
                    });
                }
                
                $('#floor_plan').attr('src', 'https://photobank.superbrandmall.com/wp-content/uploads/ol//lujiazui/'+floorNameEng+'/'+response.data.unit+'/4.jpg');
                
                //首页banner滚动
                var mySwiper = new Swiper ('.banner-view',{
                    loop: true,
                    pagination: '.swiper-pagination',
                    autoplay: 5000
                })                
                                
                getFloorInfo(response.data.mallCode,floorName);
                
                GetBrandModality3(response.data.modality);
                $('#b_name').text(response.data.brandName || '-');
                $('#subType').text(response.data.subType || '-');
                $('#area').text(numberWithCommas(response.data.area)+'m²' || '-');

                if(response.data.shopState === 1 || response.data.shopState === 3) { // 空铺
                    $('#moving_date').text(IncrMonth(date));
                } else { // 非空铺
                    var contractExpire = new Date();
                    contractExpire.setTime(response.data.contractExpireDate);
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
                    $('.c-content-media-1 .c-content-list-1').after('<a href="javascript:;" class="add-cart btn c-btn btn-lg c-font-bold c-font-white c-theme-btn c-btn-square c-font-uppercase">'+$.lang.addToFavorites+'</a>');
                } else {
                    $('.c-content-media-1 .c-content-list-1').after('<a href="javascript:;" data-toggle="modal" data-target="#login-form" class="btn c-btn btn-lg c-font-bold c-font-white c-theme-btn c-btn-square c-font-uppercase">'+$.lang.addToFavorites+'</a>');
                }
                
                if(response.data.vrValidated == 1 && response.data.vr !== null) {
                    NetPing(response.data.vr);
                } else {
                    $('#vr_video').hide();
                    $('#shop_location').addClass('col-md-offset-3');
                }
                
                if(response.data.mallCode === $.mallCode.luoyangSbm) {
                    if(response.data.remark_1 != null && response.data.remark_1 != '' && response.data.remark_1 != '无'){
                        $('#electricity').text(response.data.remark_1+'KW');
                    } else {
                        $('#electricity').text('-');
                    }

                    if(response.data.remark_2 != null && response.data.remark_2 != ''){
                        $('#tap_water').text(response.data.remark_2);
                    } else {
                        $('#tap_water').text('-');
                    }

                    if(response.data.remark_3 != null && response.data.remark_3 != ''){
                        $('#drainege').text(response.data.remark_3);
                    } else {
                        $('#drainege').text('-');
                    }

                    if(response.data.remark_4 != null && response.data.remark_4 != ''){
                        $('#gas').text(response.data.remark_4);
                    } else {
                        $('#gas').text('-');
                    }

                    if(response.data.remark_5 != null && response.data.remark_5 != ''){
                        $('#oil_smoke_emission').text(response.data.remark_5);
                    } else {
                        $('#oil_smoke_emission').text('-');
                    }
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
            $.showLoading("数据加载中");
            request.setRequestHeader("Login", $.cookie('login'));
            request.setRequestHeader("Authorization", $.cookie('authorization'));
            request.setRequestHeader("Lang", $.cookie('lang'));
            request.setRequestHeader("Source", "onlineleasing");
        },
        complete: function(){},
        success: function (response, status, xhr) {
            $.hideLoading();
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
        case '负二楼':
            fc = '00';
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
                    fillColor: 'c34343',
                    fillOpacity: 1,
                    stroke: false,
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