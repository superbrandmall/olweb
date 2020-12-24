$(document).ready(function(){
    getAllOrdersToBeConfirmed();
});

function getAllOrdersToBeConfirmed() {
    $.ajax({
        url: $.api.baseNew+"/comm-wechatol/api/order/findAllByMobileNoAndOrderStates?mobileNo="+$.cookie('uid')+"&orderStates=待确认订单",
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
                var img = '';
                var empty = 1;
                var qty = 1;
                if(response.data.length > 0){
                    $.each(response.data.reverse(), function(i,v){
                        if(v.state === 1 && v.orderStates !== '已隐藏订单'){
                            empty = 0;
                            if(v.remarkSecond == 'leasing' || v.remarkSecond == 'events'){
                                img = getShopInfo(v.remarkFirst);
                                qty = 1;
                            } else if(v.remarkSecond == 'advertising'){
                                img = v.s[0].remarkFirst;
                                qty = v.contractInfos.length;
                            }
                            var alink = '<a class="weui-link" href=\'javascript: deleteOrder("'+v.id+'");\'>关闭订单</a>';
                            if(v.orderStates == '已关闭订单'){
                                alink = '<a class="weui-link" href=\'javascript: hideOrder("'+v.id+'");\'>隐藏已关闭订单</a>';
                            }
                            
                            
                            $('#orders').append('<div class="weui-panel">\n\
        <div class="weui-panel__hd">'+v.contractInfos[0].unitDesc+' <i class="fa fa-angle-right" aria-hidden="true"></i>\n\
        <div style="color: rgba(0,0,0,.5); float: right;">'+v.orderStates+'</div></div>\n\
        <div class="weui-panel__bd"><div class="weui-media-box weui-media-box_appmsg">\n\
        <div class="weui-media-box__hd" style="width: 100px; height: 67px;"><img class="weui-media-box__thumb" src="'+img+'" alt=""></div>\n\
        <div class="weui-media-box__bd">\n\
        <div class="weui-form-preview__bd" style="font-size: 15px;">\n\
        <div class="weui-form-preview__item">\n\
        <span class="weui-form-preview__value">共'+qty+'件商品 合计: ¥</small>******</span>\n\
        <span class="weui-form-preview__value"><small>(含税费 ¥*****)</small></span></div></div>\n\
        <ul class="weui-media-box__info" style="float: right;">\n\
        <li class="weui-media-box__info__meta"><a class="weui-link" style="color: #fa5151;" href=\'javascript: findUserCompanyByMobileNo("'+v.remarkFirst+'","'+v.outTradeNo+'","'+v.remarkSecond+'");\'>申请报价</a></li>\n\
        <li class="weui-media-box__info__meta weui-media-box__info__meta_extra">'+alink+'</li>\n\
        </ul></div></div></div>'); 
                        }
                    });
                }
                
                if(empty == 1) {
                    $('#orders').html('<div style="padding: 40px; background-color: #fff;">\n\
<div class="icon-box"><i class="weui-icon-info weui-icon_msg"></i>\n\
<div class="icon-box__ctn"><h3 class="icon-box__title">提示</h3>\n\
<p class="icon-box__desc">您还没有相关的订单</p>\n\
</div></div></div>');
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

function getShopInfo(sc){
    var img;
    $.ajax({
        url: $.api.baseNew+"/onlineleasing-customer/api/shop/"+sc,
        type: "GET",
        async: false,
        beforeSend: function(request) {
            request.setRequestHeader("Login", $.cookie('login'));
            request.setRequestHeader("Authorization", $.cookie('authorization'));
            request.setRequestHeader("Lang", $.cookie('lang'));
            request.setRequestHeader("Source", "onlineleasing");
        },
        complete: function(){},
        success: function (response, status, xhr) {
            if(response.code === 'C0') {
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                }
                
                img = '/' + response.data.firstImage;
                
                if(response.data.firstImage == null || response.data.firstImage == ''){
                    img = response.data.images[0].image;
                }
                
                if(response.data.unit != null && response.data.subType == '正柜'){
                    img = "/views/assets/base/img/content/backgrounds/leasing/"+response.data.unit+".jpg";
                }
            }
        }
    })
    
    return img;
    
}

function deleteOrder(id){
    showLoading();
    $.ajax({
        url: $.api.baseNew+"/comm-wechatol/api/order/updateOrderStates?id="+id+"&orderStates=已关闭订单",
        type: "POST",
        async: false,
        beforeSend: function(request) {
            request.setRequestHeader("Login", $.cookie('login'));
            request.setRequestHeader("Authorization", $.cookie('authorization'));
            request.setRequestHeader("Lang", $.cookie('lang'));
            request.setRequestHeader("Source", "onlineleasing");
        },
        complete: function(){},
        success: function (response, status, xhr) {
            if(response.code === 'C0') {
                hideLoading();
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                }
                location.reload();
            } else {
                interpretBusinessCode(response.customerMessage);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}

function hideOrder(id){
    showLoading();
    $.ajax({
        url: $.api.baseNew+"/comm-wechatol/api/order/updateOrderStates?id="+id+"&orderStates=已隐藏订单",
        type: "POST",
        async: false,
        beforeSend: function(request) {
            request.setRequestHeader("Login", $.cookie('login'));
            request.setRequestHeader("Authorization", $.cookie('authorization'));
            request.setRequestHeader("Lang", $.cookie('lang'));
            request.setRequestHeader("Source", "onlineleasing");
        },
        complete: function(){},
        success: function (response, status, xhr) {
            if(response.code === 'C0') {
                hideLoading();
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                }
                location.reload();
            } else {
                interpretBusinessCode(response.customerMessage);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}

function findUserCompanyByMobileNo(sc,outTradeNo,type){
    $.ajax({
        url: $.api.baseNew+"/comm-wechatol/api/user/company/wx/findAllByMobileNo?mobileNo="+$.cookie('uid'),
        type: "POST",
        async: false,
        dataType: "json",
        contentType: "application/json",
        beforeSend: function(request) {
            request.setRequestHeader("Login", $.cookie('login'));
            request.setRequestHeader("Authorization", $.cookie('authorization'));
            request.setRequestHeader("Lang", $.cookie('lang'));
            request.setRequestHeader("Source", "onlineleasing");
        },
        complete: function(){},
        success: function (response, status, xhr) {
            if(response.code === 'C0') {
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                }
                
                if(response.data.length > 0){
                    if(response.data[0].name != '' && response.data[0].uscc != ''){
                        if(type == 'leasing') {
                            window.location.href = '/v2/price?id='+sc+'&trade='+outTradeNo;
                        } else if(type == 'advertising') {
                            window.location.href = '/v2/advertising-shopping-cart?id='+sc+'&trade='+outTradeNo;
                        } else if(type == 'events') {
                            window.location.href = '/v2/choose-event?id='+sc+'&trade='+outTradeNo;
                        } 
                    } else {
                        window.location.href = '/v2/company-info?id='+sc+'&trade='+outTradeNo;
                    }
                } else {
                    window.location.href = '/v2/company-info?id='+sc+'&trade='+outTradeNo;
                }
            }
        }
    })
}
