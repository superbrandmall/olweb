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
                        if(v.unitType == 'leasing'){
                            getShopMoreInfo(v.storeCode, v.unitCode);
                        } else if(v.unitType == 'ads'){
                            getAdMoreInfo(v.storeCode, v.unitCode);
                        } else if(v.unitType == 'event'){
                            getEventMoreInfo(v.storeCode, v.unitCode);
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

function getAdMoreInfo(mall,unit){
    $.ajax({
        url: $.api.baseNew+"/comm-wechatol/api/advertising/base/findAllByStoreCodeAndUnitCode?storeCode="+mall+"&unitCode="+unit,
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
                $('.weui-grids').append('<a id="fav_'+response.data[0].code+'" href="/v2/ad?id='+response.data[0].code+'&type=ad&storeCode='+response.data[0].storeCode+'" class="weui-grid shop-list" data-wow-offset="200">\n\
                <div class="weui-grid__icon" style="height: 100px; background: url('+response.data[0].advertisingImagesWxList[0].imagePath+'); background-size: cover; background-position: center center;"></div>\n\
                <p class="weui-grid__label"><strong>'+response.data[0].unitDescChs+'</strong>\n\
                <br>'+response.data[0].descChs+'</p></a>');
                
                $('#fav_'+response.data[0].code).addClass('wow').addClass('slideInRight');
            }
        }
    });
}

function getEventMoreInfo(mall,unit){
    $.ajax({
        url: $.api.baseNew+"/comm-wechatol/api/event/info/findAllByStoreCodeAndUnitCode?storeCode="+mall+"&unitCode="+unit,
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
            if(response.code === 'C0') {
                $('.weui-grids').append('<a id="fav_'+response.data[0].shopCode+'" href="/v2/event?id='+response.data[0].shopCode+'&type=events&storeCode='+response.data[0].storeCode+'" class="weui-grid shop-list" data-wow-offset="200">\n\
                <div class="weui-grid__icon" style="height: 100px; background: url(/views/assets/base/img/content/backgrounds/events/'+response.data[0].shopCode+'_1.jpg); background-size: cover; background-position: center center;"></div>\n\
                <p class="weui-grid__label"><strong>'+response.data[0].shopNo+'</strong>\n\
                <br>'+response.data[0].descript+'</p></a>');
                
                $('#fav_'+response.data[0].shopCode).addClass('wow').addClass('slideInRight');
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}

function getShopMoreInfo(mall,unit){
    $.ajax({
        url: $.api.baseNew+"/comm-wechatol/api/shop/base/findAllByStoreCodeAndUnitCode?storeCode="+mall+"&unitCode="+unit,
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
            if(response.code === 'C0') {
                $('.weui-grids').append('<a id="fav_'+response.data[0].remarkSecond+'" href="/v2/category?id='+response.data[0].remarkSecond+'&type=leasing&storeCode='+response.data[0].storeCode+'" class="weui-grid shop-list" data-wow-offset="200">\n\
                <div class="weui-grid__icon" style="height: 100px; background: url(/views/assets/base/img/content/backgrounds/leasing/'+response.data[0].unitCode+'.jpg); background-size: cover; background-position: center center;"></div>\n\
                <p class="weui-grid__label"><strong>'+response.data[0].shopNo+'</strong>\n\
                <br>'+response.data[0].descript+'</p></a>');
                
                $('#fav_'+response.data[0].remarkSecond).addClass('wow').addClass('slideInRight');
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}