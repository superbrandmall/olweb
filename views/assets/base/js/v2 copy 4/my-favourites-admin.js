var unitCodes = ["01FL064","03FL039","03FL121"];

$(document).ready(function(){
    getFavourites();
});

function getFavourites() {
    getShopsMoreInfo();
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
                        renderShopList(JSON.stringify(v));
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

function getShopsMoreInfo() {
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

function renderShopList(s){
    var desc = '';
    var buildingCode;
    var storeCode;
    var shopNo;
    var shop = $.parseJSON(s);
    
    $.each($.parseJSON(sessionStorage.getItem("shopsMoreInfo")), function(j,w){
        
        if(w.state ==1 && shop.remarkFirst == w.remarkSecond){
            desc = w.desc || '';
            shopNo = w.shopNo || '';
            buildingCode = w.buildingCode;
            storeCode = w.storeCode;
            
            $('.weui-grids').append('<a id="shop_'+w.unitCode+'" href="/v2/shop?id='+w.remarkSecond+'&type=leasing" class="weui-grid shop-list" data-wow-offset="200">\n\
        <div class="weui-grid__icon">\n\
            <img src="/views/assets/base/img/content/backgrounds/leasing/'+w.unitCode+'.jpg" alt="">\n\
        </div>\n\
        <p class="weui-grid__label">\n\
        <strong>'+shopNo+'</strong>\
        <br>'+desc+'</p>\n\
        </a>');
            
        }
    })
    
    $('#shop_'+shop.unit).addClass('wow').addClass('slideInRight');
}