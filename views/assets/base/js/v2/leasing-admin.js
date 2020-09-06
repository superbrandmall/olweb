var unitCodes = ["01FL064","03FL039","03FL121","2F-44B","4F-37","4F-38","6F-24","B1FL022","B1FL015","01FL035","01FL009","01FL015"];
var amount = 0;

$(document).ready(function(){
    showLoading();   
    $('#storeAmount').text(amount);
    
    var floorDesc;
    if(getURLParameter('f') && getURLParameter('f') != '') {
        switch (getURLParameter('f')) {
            case '0':
                floorDesc = '负一楼';
                break;
            case '1':
                floorDesc = '一楼';
                break;
            case '2':
                floorDesc = '二楼';
                break;
            case '3':
                floorDesc = '三楼';
                break;
            case '4':
                floorDesc = '四楼';
                break;
            case '5':
                floorDesc = '五楼';
                break;
            case '6':
                floorDesc = '六楼';
                break;
            case '7':
                floorDesc = '七楼';
                break;
            case '8':
                floorDesc = '八楼';
                break;
            default:
                floorDesc = '三楼';
                break;
        }
        
        getShopFloorInfo(floorDesc);
    } else {
        getShopFloorInfo('三楼');
    }
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
            showLoading();
            request.setRequestHeader("Lang", $.cookie('lang'));
            request.setRequestHeader("Source", "onlineleasing");
        },
        complete: function(){},
        success: function (response, status, xhr) {
            if(response.code === 'C0') {
                hideLoading();
                sessionStorage.setItem("shops", JSON.stringify(response.data) );
                
                var index;
                $.each(response.data, function(i,v){
                    index = $.inArray(v.unit, unitCodes);
                    if(index >= 0){
                        renderShopList(JSON.stringify(v));
                    }
                });
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
        
        if(w.state ==1 && shop.unit == w.unitCode){
            desc = w.desc || '';
            shopNo = w.shopNo || '';
            buildingCode = w.buildingCode;
            storeCode = w.storeCode;
            
            $('.weui-grids').append('<a id="shop_'+shop.unit+'" href="/v2/shop?id='+shop.code+'&type=leasing" class="weui-grid shop-list" data-wow-offset="200">\n\
        <div class="weui-grid__icon">\n\
            <img src="/views/assets/base/img/content/backgrounds/leasing/'+shop.unit+'.jpg" alt="">\n\
        </div>\n\
        <p class="weui-grid__label">\n\
        <strong>'+shopNo+'</strong>\
        <br>'+desc+'</p>\n\
        </a>');
            
            amount++;
        }
    })
    
    $('#storeAmount').text(amount);
    $('#shop_'+shop.unit).addClass('wow').addClass('slideInRight');
}