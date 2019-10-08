var d = new Date();
var month = d.getMonth()+1;
var day = d.getDate();
var date = d.getFullYear() + '-' +
    (month<10 ? '0' : '') + month + '-' +
    (day<10 ? '0' : '') + day;
    
$(document).ready(function(){
    ShowOtherShops();
    ShowMyCart();
    
    $('.remove-cart').each(function(){
        $(this).click(function(){
            if($.cookie('uid') && $.cookie('uid') != ''){
                var shopCode = $(this).parent().parent().attr('id').split('_')[1];
                RemoveCart(shopCode);
            }
        });
    })    
 });

function ShowMyCart(){
    if($.cookie('lang') === 'en-us'){
        var my_cart_sub_type = "Sub type";
        var my_cart_shop_moving_date = "Availalbe date";
        var my_cart_shanghai_superbrandmall = "Shanghai SuperBrandMall";
        var my_cart_more_details = "More details";
        var my_cart_shopping_mall = "Mall";
        var my_cart_store = "Store";
        var my_cart_remove = "Remove";
        var my_cart_empty_cart = "Shopping cart is empty now";
    } else {
        var my_cart_sub_type = "店铺类型";
        var my_cart_shop_moving_date = "最早可入驻日期";
        var my_cart_shanghai_superbrandmall = "正大广场陆家嘴购物中心";
        var my_cart_more_details = "查看详情";
        var my_cart_shopping_mall = "商业项目";
        var my_cart_store = "店铺";
        var my_cart_remove = "从购物车里删除";
        var my_cart_empty_cart = "购物车目前为空";
    }
    
    $.ajax({
        url: $.api.baseNew+"/onlineleasing-customer/api/myfavourite/details/"+$.cookie('uid')+"?page=0&size=100",
        type: "GET",
        async: false,
        beforeSend: function(request) {
            request.setRequestHeader("Login", $.cookie('login'));
            request.setRequestHeader("Authorization", $.cookie('authorization'));
            request.setRequestHeader("Lang", $.cookie('lang'));
            request.setRequestHeader("Source", "onlineleasing");
        },
        success: function (response, status, xhr) {
            $('#loader').hide();
            if(response.code === 'C0') {
                var img;
                if(response.data.content.length > 0) {                    
                    var modality,mallName,floorName;
                    $.each(response.data.content, function(i,v){
                        if(v.modality !== '' && v.modality !== null){
                            $.each($.parseJSON(sessionStorage.getItem("modalities")), function(a,b) {
                                $.each(b.children, function(j,w) {
                                    $.each(w.children, function(k,x) {
                                        $.each(x.children, function(l,y) {
                                            if($.cookie('lang') === 'en-us'){
                                                if(y.code == v.modality) {
                                                    modality = y.remark || '-';
                                                    return false;
                                                }
                                            } else {
                                                if(y.code == v.modality) {
                                                    modality = y.name || '-';
                                                    return false;
                                                }
                                            }
                                        });
                                    });
                                });
                            });
                        } else {
                            modality = "-";
                        }
                        
                        var area = numberWithCommas(v.area);
                        if(area === null){
                            area = "-";
                        }
                        
                        $.each($.parseJSON(sessionStorage.getItem("malls")), function(j,w) {
                            if(w.mallCode == v.mallCode) {
                                if($.cookie('lang') === 'en-us'){
                                    mallName = w.mallNameEng;
                                } else {
                                    mallName = w.mallName;
                                }
                                return false;
                            }
                        });

                        $.each($.parseJSON(sessionStorage.getItem("floors")), function(j,w) {
                            if(w.floorCode == v.floorCode) {
                                if($.cookie('lang') === 'en-us'){
                                    floorName = w.descriptionEng;
                                } else {
                                    floorName = w.description;
                                }
                                return false;
                            }
                        });
                        
                        var index = i+1;
                        var moving_date = '';
                        
                        if(v.shopState === 1) { // 空铺
                            moving_date = IncrMonth(date);
                        } else { // 非空铺
                            var contractExpire = new Date();
                            contractExpire.setTime(v.contractExpireDate);
                            var contractExpireYear = contractExpire.getFullYear('yyyy');
                            var contractExpireMonth = contractExpire.getMonth('mm')+1;
                            var contractExpireDate = contractExpire.getDate('dd');

                            if(IncrMonths(date,6) <= (contractExpireYear+'-'+contractExpireMonth+'-'+contractExpireDate)) {
                                moving_date = '>6'+$.lang.lengthMonth;
                            } else {
                                if(IncrMonth(date) <= (contractExpireYear+'-'+contractExpireMonth+'-'+contractExpireDate)) {
                                    moving_date = IncrDate(contractExpireYear+'-'+contractExpireMonth+'-'+contractExpireDate);
                                } else {
                                    moving_date = IncrMonth(contractExpireYear+'-'+contractExpireMonth+'-'+contractExpireDate);
                                }
                            }
                        }
                        
                        var area = numberWithCommas(v.area);
                        if(area === null){
                            area = "-";
                        }
                
                        $('.table-rows').append('<div class="row c-cart-table-row" id="row_'+v.code+'">\n\
<h3 class="c-font-uppercase c-font-bold c-theme-bg c-font-white c-cart-item-title c-cart-item-first hidden-lg hidden-md" style="float: left;">'+my_cart_store+' '+index+'</h3>\n\
<div class="col-md-2 col-sm-3 col-xs-5 c-cart-image" style="clear: both;"><img src="'+v.firstImage+'"></div>\n\
<div class="col-md-3 col-sm-9 col-xs-7 c-cart-desc">\n\
<h3><a href="shop?id='+v.code+'" class="c-font-bold c-theme-link c-font-22 c-font-dark">'+v.unit+'</a></h3>\n\
<p>'+my_cart_sub_type+': '+v.subType+'</p>\n\
<p>'+my_cart_shop_moving_date+': '+moving_date+'</p></div>\n\
<div class="col-md-2 col-sm-4 col-xs-6 c-cart-ref c-cart-ref1">\n\
<p class="c-cart-sub-title c-theme-font c-font-uppercase c-font-bold hidden-lg hidden-md">'+$.lang.modality+'</p>\n\
<p>'+modality+'</p></div>\n\
<div class="col-md-3 col-sm-4 col-xs-6 c-cart-ref1">\n\
<p class="c-cart-sub-title c-theme-font c-font-uppercase c-font-bold hidden-lg hidden-md">'+my_cart_shopping_mall+'</p>\n\
<p>'+my_cart_shanghai_superbrandmall+'</p></div>\n\
<div class="col-md-1 col-sm-4 col-xs-6 c-cart-ref1">\n\
<p class="c-cart-sub-title c-theme-font c-font-uppercase c-font-bold hidden-lg hidden-md">'+$.lang.leasableArea+'</p>\n\
<p class="c-font-bold">'+area+'m<sup>2</sup></p></div>\n\
<div class="col-md-1 col-sm-12 c-cart-remove c-center">\n\
<a href="javascript:;" class="remove-cart c-theme-link c-cart-remove-desktop hidden-sm hidden-xs">×</a>\n\
<a href="javascript:;" class="remove-cart c-cart-remove-mobile btn c-btn c-btn-md c-btn-square c-btn-red c-btn-border-1x c-font-uppercase hidden-lg hidden-md">'+my_cart_remove+'</a></div>\n\
</div>');                            

                    });
                } else {
                    $('.table-rows').append('<div class="row c-cart-table-row"><div class="col-md-12">'+my_cart_empty_cart+'</div></div>');
                }
            } else {
                interpretBusinessCode(response.customerMessage);
            } 
        }
    });
}

function ShowOtherShops(){
    if($.cookie('lang') === 'en-us'){
        var my_cart_more_details = "More details";
    } else {
        var my_cart_more_details = "查看详情";
    }
    
    var map = {
        userCode: '',
        brandCode: '',
        brandName: '',
        brandModality: '',
        subType: '正柜',
        minArea: 0,
        maxArea: 3000,
        startDate: IncrMonth(date),
        endDate: '',
        mallCodes: [$.mallCode.shanghaiSbm],
        max: 9,
        rentalLength: ''
    };
    $.ajax({
        url: $.api.baseNew+"/onlineleasing-customer/api/searchshop/details",
        type: "POST",
        data: JSON.stringify(map),
        async: false,
        dataType: "json",
        contentType: "application/json",
        beforeSend: function(request) {
            $('#loader').show();
            request.setRequestHeader("Lang", $.cookie('lang'));
            request.setRequestHeader("Source", "onlineleasing");
        },
        success: function (response, status, xhr) {
            $('#loader').hide();
            if(response.code === 'C0') {
                if(response.data.result.length > 0){
                    $.each(response.data.result, function(i,v){
                        var modality;
                        if(v.modality !== '' && v.modality !== null){
                            $.each($.parseJSON(sessionStorage.getItem("modalities")), function(i,u) {
                                $.each(u.children, function(j,w) {
                                    $.each(w.children, function(k,x) {
                                        $.each(x.children, function(l,y) {
                                            if($.cookie('lang') === 'en-us'){
                                                if(y.code == v.modality) {
                                                    modality = y.remark || '-';
                                                    return false;
                                                }
                                            } else {
                                                if(y.code == v.modality) {
                                                    modality = y.name || '-';
                                                    return false;
                                                }
                                            }
                                        });
                                    });
                                });
                            });
                        } else {
                            modality = "-";
                        }
                        
                        var floorName;
                        $.each($.parseJSON(sessionStorage.getItem("floors")), function(j,w) {
                            if(w.floorCode == v.floorCode) {
                                if($.cookie('lang') === 'en-us'){
                                    floorName = w.descriptionEng;
                                } else {
                                    floorName = w.description;
                                }
                                return false;
                            }
                        });
                        
                        var img;
                        if(v.shopState !== 0 && v.shopState !== 2){ //非在租或待租
                            img = '/views/assets/base/img/content/mall/empty'+getRndInteger(1,5)+'.jpg';
                        } else {
                            if(v.firstImage === null){
                                img = '/views/assets/base/img/content/mall/empty'+getRndInteger(1,5)+'.jpg';
                            } else {
                                img = v.firstImage;
                            }
                        }
                        
                        $('.owl-bordered1').append('<div class="item">\n\
<div class="c-content-product-2 c-border">\n\
<div class="c-content-overlay">\n\
<div class="c-label c-bg-red c-font-uppercase c-font-white c-font-13 c-font-bold">'+modality+'</div>\n\
<div class="c-overlay-wrapper">\n\
<div class="c-overlay-content"><a href="shop?id='+v.code+'" class="btn btn-md c-btn-grey-1 c-btn-uppercase c-btn-bold c-btn-border-1x c-btn-square">'+my_cart_more_details+'</a></div></div>\n\
<div class="c-bg-img-center-contain c-overlay-object" data-height="height" style="height: 270px; background-size: 405px; background-image: url('+img+'); background-position: center center;"></div></div>\n\
<div class="c-info"><p class="c-title c-font-18 c-font-slim">'+v.unit+'</p>\n\
<p class="c-price c-font-16 c-font-slim">'+floorName+' &nbsp;\n\
<span class="c-font-16 c-font-line-through c-font-red">'+v.area+'m<sup>2</sup></span></p></div>\n\
<div class="btn-group btn-group-justified" role="group"><div class="btn-group c-border-top" role="group"><a href="shop?id='+v.code+'" class="btn btn-lg c-btn-white c-btn-uppercase c-btn-square c-font-grey-3 c-font-white-hover c-bg-red-2-hover c-btn-product">'+my_cart_more_details+'</a></div></div></div></div>');
                    })
                }
                
            } else {
                interpretBusinessCode(response.customerMessage);
            } 
        }
    });
}

function RemoveCart(shopCode){
    var userCode = $.cookie('uid');
    
    if($.cookie('lang') === 'en-us'){
        var my_cart_empty_cart = "Shopping cart is empty now";
    } else {
        var my_cart_empty_cart = "购物车目前为空";
    }
    
    $.ajax({
        url: $.api.baseNew+"/onlineleasing-customer/api/myfavourite/delete?userCode="+userCode+"&shopCode="+shopCode+"",
        type: "DELETE",
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
                
                $('#row_'+shopCode).remove();
                if($('.c-cart-table-row').length < 1){
                    $('.table-rows').append('<div class="row c-cart-table-row"><div class="col-md-12">'+my_cart_empty_cart+'</div></div>');
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