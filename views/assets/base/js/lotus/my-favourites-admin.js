$(document).ready(function(){
    getFavourites();
});

function getFavourites() {
    $.ajax({
        url: $.api.baseNew+"/comm-wechatol/api/user/favorites/wx/findAllByMobileNo?mobileNo="+$.cookie('uid'),
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
                
                if(response.data.length > 0){
                    $.each(response.data, function(i,v){
                        if(v.remarkSecond == 1){
                            if(v.unitType == 'leasing'){
                                getShopMoreInfo(v.storeCode, v.shopCode);
                            } else if(v.unitType == 'ads'){
                                getAdMoreInfo(v.storeCode, v.shopCode);
                            } else if(v.unitType == 'event'){
                                getEventMoreInfo(v.storeCode, v.shopCode);
                            }
                        }
                    });
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

function getAdMoreInfo(mall,sc){
    $.ajax({
        url: $.api.baseNew+"/comm-wechatol/api/advertising/base/findAllByStoreCodeAndShopCode?storeCode="+mall+"&shopCode="+sc,
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
            if(response.code === 'C0' && response.data != null) {
                if(response.data.state != 9) {
                    $('.weui-grids').append('<a id="fav_'+response.data[0].code+'" href="/v2/ad?id='+response.data[0].code+'&type=ad&storeCode='+response.data[0].storeCode+'" class="weui-grid shop-list" data-wow-offset="200">\n\
                    <div class="weui-grid__icon" style="height: 100px; background: url('+response.data[0].advertisingImagesWxList[0].imagePath+'); background-size: cover; background-position: center center;"></div>\n\
                    <p class="weui-grid__label"><strong>'+response.data[0].unitDescChs+'</strong>\n\
                    <br>'+response.data[0].descChs+'</p></a>');

                    $('#fav_'+response.data[0].code).addClass('wow').addClass('slideInRight');
                }
            }
        }
    });
}

function getEventMoreInfo(mall,sc){
    $.ajax({
        url: $.api.baseNew+"/comm-wechatol/api/event/info/findAllByStoreCodeAndShopCode?storeCode="+mall+"&shopCode="+sc,
        type: "GET",
        async: false,
        beforeSend: function(request) {
            showLoading();
            request.setRequestHeader("Login", $.cookie('login'));
            request.setRequestHeader("Authorization", $.cookie('authorization'));
            request.setRequestHeader("Lang", $.cookie('lang'));
            request.setRequestHeader("Source", "onlineleasing");
        },
        complete: function(){},
        success: function (response, status, xhr) {
            if(response.code === 'C0' && response.data != null) {
                if(response.data.state != 9) {
                    $('.weui-grids').append('<a id="fav_'+response.data.shopCode+'" href="/v2/event?id='+response.data.shopCode+'&type=events&storeCode='+response.data.storeCode+'" class="weui-grid shop-list" data-wow-offset="200">\n\
                    <div class="weui-grid__icon" style="height: 100px; background: url(/views/assets/base/img/content/backgrounds/events/'+response.data.shopCode+'_1.jpg); background-size: cover; background-position: center center;"></div>\n\
                    <p class="weui-grid__label"><strong>'+response.data.shopNo+'</strong>\n\
                    <br>'+response.data.descript+'</p></a>');

                    $('#fav_'+response.data.shopCode).addClass('wow').addClass('slideInRight');
                }
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}

function getShopMoreInfo(mall,sc){
    $.ajax({
        url: $.api.baseNew+"/comm-wechatol/api/shop/base/findAllByStoreCodeAndShopCode?storeCode="+mall+"&shopCode="+sc,
        type: "GET",
        async: false,
        beforeSend: function(request) {
            showLoading();
            request.setRequestHeader("Login", $.cookie('login'));
            request.setRequestHeader("Authorization", $.cookie('authorization'));
            request.setRequestHeader("Lang", $.cookie('lang'));
            request.setRequestHeader("Source", "onlineleasing");
        },
        complete: function(){},
        success: function (response, status, xhr) {
            if(response.code === 'C0' && response.data != null) {
                if(response.data.state != 9) {
                    $('.weui-grids').append('<a id="fav_'+response.data.shopCode+'" href="/v2/category?id='+response.data.shopCode+'&type=leasing&storeCode='+response.data.storeCode+'" class="weui-grid shop-list" data-wow-offset="200">\n\
                    <div class="weui-grid__icon" style="height: 100px; background: url(/views/assets/base/img/content/backgrounds/leasing/'+response.data.shopCode+'.jpg); background-size: cover; background-position: center center;"></div>\n\
                    <p class="weui-grid__label"><strong>'+response.data.shopNo+'</strong>\n\
                    <br>'+response.data.descript+'</p></a>');

                    $('#fav_'+response.data.shopCode).addClass('wow').addClass('slideInRight');
                }
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}