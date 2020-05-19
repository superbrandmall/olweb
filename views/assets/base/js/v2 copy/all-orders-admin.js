$.order = {
    copy: ""
};

$(document).ready(function(){
    getAllOrders();
});

function getAllOrders() {
    $.ajax({
        url: $.api.baseNew+"/comm-wechatol/api/order/findAllByMobileNo?mobileNo="+$.cookie('uid'),
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
                var f = '';
                var empty = 1;
                if(response.data.length > 0){
                    $.each(response.data.reverse(), function(i,v){
                        if(v.state === 1 && v.orderStates !== '已隐藏订单'){
                            empty = 0;
                            img = getShopInfo(v.remarkFirst);
                            f = v.contractInfos[0].unitCode.split('F')[0];
                            f = f.charAt(f.length - 1);
                            var alink = '<a class="weui-link" href=\'javascript: deleteOrder("'+v.id+'");\'>关闭订单</a>';
                            if(v.orderStates == '已关闭订单'){
                                alink = '<a class="weui-link" href=\'javascript: hideOrder("'+v.id+'");\'>隐藏已关闭订单</a>';
                            }
                            
                            
                            $('#orders').append('<div class="weui-panel" onclick=\'window.location="/v2/floor-plan?f='+f+'&type=leasing&id='+v.remarkFirst+'"\'>\n\
        <div class="weui-panel__hd">'+v.contractInfos[0].unitDesc+' <i class="fa fa-angle-right" aria-hidden="true"></i>\n\
        <div style="color: rgba(0,0,0,.5); float: right;">'+v.orderStates+'</div></div>\n\
        <div class="weui-panel__bd"><div class="weui-media-box weui-media-box_appmsg">\n\
        <div class="weui-media-box__hd" style="width: 100px; height: 80px;"><img class="weui-media-box__thumb" src="'+img+'" alt=""></div>\n\
        <div class="weui-media-box__bd">\n\
        <div class="weui-form-preview__bd" style="font-size: 15px;">\n\
        <div class="weui-form-preview__item">\n\
        <span class="weui-form-preview__value">共1件商品 合计: ¥</small>******</span>\n\
        <span class="weui-form-preview__value"><small>(不包含税费 ¥*****)</small></span></div></div>\n\
        <ul class="weui-media-box__info" style="float: right;">\n\
        <li class="weui-media-box__info__meta"><a class="weui-link" style="color: #fa5151;" href="/v2/authentication?id='+v.remarkFirst+'">申请报价</a></li>\n\
        <li class="weui-media-box__info__meta weui-media-box__info__meta_extra">'+alink+'</li>\n\
        </ul></div></div></div>'); 
                        }
                    });
                }
                
                if(empty == 1) {
                    $('#orders').html('<div style="padding: 40px; background-color: #fff;">\n\
<div class="icon-box"><i class="weui-icon-info weui-icon_msg"></i>\n\
<div class="icon-box__ctn"><h3 class="icon-box__title">提示</h3>\n\
<p class="icon-box__desc">你还没有相关的订单</p>\n\
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
                if(response.data.images.length !== 0){
                    img = response.data.images[0].image;
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

function getOrder(outNO) {
    $.ajax({
        url: $.api.baseNew+"/comm-wechatol/api/order/findAllByMobileNoAndOutTradeNo?mobileNo="+$.cookie('uid')+"&outTradeNo="+outNO,
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
                $.order.copy = JSON.stringify(response.data[0]);
                hideDeletedOrder();
            } else {
                interpretBusinessCode(response.customerMessage);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
} 


function hideDeletedOrder(){
    var map = $.order.copy; 
    
    $.ajax({
        url: $.api.baseNew+"/comm-wechatol/api/order/saveOrUpdate",
        type: "POST",
        data: map,
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
                hideLoading();
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                }
                alert('Succeed!');
            } else {
                interpretBusinessCode(response.customerMessage);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}
