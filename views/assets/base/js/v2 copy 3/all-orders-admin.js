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
                var empty = 1;
                var qty = 1;
                if(response.data.length > 0){
                    $.each(response.data.reverse(), function(i,v){
                        if(v.state === 1 && v.orderStates !== '已隐藏订单'){
                            empty = 0;
                            if(v.remarkSecond == 'leasing' || v.remarkSecond == 'events'){
                                img = getShopInfo(v.remarkFirst);
                            } else if(v.remarkSecond == 'advertising'){
                                img = v.contractInfos[0].remarkFirst;
                            }
                            
                            var alink = '';
                            if(v.state == 1 && v.orderStates == '已关闭订单'){
                                alink = '<li class="weui-media-box__info__meta"><a class="weui-link" href=\'javascript: hideOrder("'+v.id+'");\'>隐藏已关闭订单</a></li>';
                            } else if(v.state == 1 && v.orderStates == '待确认订单'){
                                alink = '<li class="weui-media-box__info__meta"><a class="weui-link" style="color: #fa5151;" href=\'javascript: findUserCompanyByMobileNo("'+v.remarkFirst+'","'+v.outTradeNo+'","'+v.remarkSecond+'");\'>申请报价</a></li>\n\
<li class="weui-media-box__info__meta weui-media-box__info__meta_extra"><a class="weui-link" href=\'javascript: deleteOrder("'+v.id+'");\'>关闭订单</a></li>'
                            } else if(v.state == 1 && v.orderStates == '合同已生成'){
                                alink = '<li class="weui-media-box__info__meta"><a class="weui-link" href="/v2/contract?type='+v.remarkSecond+'&trade='+v.outTradeNo+'" style="color: #fa5151;">查看合同并用印</a></a></li>';
                            } else if(v.state == 1 && v.orderStates == '合同用印中'){
                                alink = '<li class="weui-media-box__info__meta"><a href=\'javascript: updateOrderToPay("'+v.id+'");\' style="color: #fa5151;">用印完成</a></li>\n\
<li class="weui-media-box__info__meta weui-media-box__info__meta_extra"><a class="weui-link" href="/v2/contract-view?type='+v.remarkSecond+'&trade='+v.outTradeNo+'">查看合同</a></li>';
                            } else if(v.state == 1 && v.orderStates === '待付款订单'){
                                alink = '<li class="weui-media-box__info__meta"><a href="/v2/bill?trade='+v.outTradeNo+'" style="color: #fa5151;">查看账单</a></li>\n\
<li class="weui-media-box__info__meta weui-media-box__info__meta_extra"><a class="weui-link" href="/v2/contract-view?type='+v.remarkSecond+'&trade='+v.outTradeNo+'">查看合同</a></li>';
                            } else if(v.state == 1 && v.orderStates === '已完成订单'){
                                alink = '<li class="weui-media-box__info__meta"><a class="weui-link" href="/v2/my-files">我的文件</a></li>\n\
<li class="weui-media-box__info__meta weui-media-box__info__meta_extra"><a class="weui-link" href="/v2/contract-view?type='+v.remarkSecond+'&trade='+v.outTradeNo+'">查看合同</a></li>';
                            }
                            
                            var tax = '*****';
                            var amount = '******';
                            
                            if(v.state == 1 && (v.orderStates == '合同已生成' || v.orderStates == '合同用印中' || v.orderStates == '待付款订单' || v.orderStates == '已完成订单')){
                                if(v.remarkSecond == 'leasing' || v.remarkSecond == 'events'){
                                    //应缴金额=保证金+首月固定租金与物业管理费(含税)

                                    var taxAmount = 0; //不含税总额
                                    amount = 0; //含税总额
                                    tax = 0; //税费
                                    $.each(v.contractInfos, function(j,w){
                                        taxAmount = parseFloat((taxAmount + w.depositAmount).toFixed(2));
                                        amount = taxAmount;
                                    })

                                    $.each(v.contractTermInfos, function(j,w){
                                        if((w.termTypeName == '固定租金' || w.termTypeName == '物业管理费') && w.code == 1){
                                            taxAmount = parseFloat((taxAmount + w.taxAmount).toFixed(2));
                                            amount = parseFloat((amount + w.amount).toFixed(2));
                                        }
                                    })

                                    tax = parseFloat((amount - taxAmount).toFixed(2));
                                    qty = 1;
                                } else if(v.remarkSecond == 'advertising'){
                                    amount = v.amount;
                                    tax = (v.amount*0.06).toFixed(2);
                                    qty = v.remarkThird || v.contractInfos.length;
                                }
                            }
                            
                            
                            $('#orders').append('<div class="weui-panel">\n\
        <div class="weui-panel__hd">'+v.contractInfos[0].unitDesc+' <i class="fa fa-angle-right" aria-hidden="true"></i>\n\
        <div style="color: rgba(0,0,0,.5); float: right;">'+v.orderStates+'</div></div>\n\
        <div class="weui-panel__bd"><div class="weui-media-box weui-media-box_appmsg">\n\
        <div class="weui-media-box__hd" style="width: 100px; height: 130px;"><img class="weui-media-box__thumb" src="'+img+'" alt=""></div>\n\
        <div class="weui-media-box__bd">\n\
        <div class="weui-form-preview__bd" style="font-size: 15px;">\n\
        <div class="weui-form-preview__item">\n\
        <span class="weui-form-preview__value">共'+qty+'件商品 合计: ¥'+numberWithCommas(amount)+'</span>\n\
        <span class="weui-form-preview__value"><small>(含税费 ¥'+numberWithCommas(tax)+')</small></span></div></div>\n\
        <ul class="weui-media-box__info" style="float: right;">\n\
        '+alink+'\n\
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
                if(response.data.unit != null){
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

function updateOrderToPay(id){
    showLoading();
    $.ajax({
        url: $.api.baseNew+"/comm-wechatol/api/order/updateOrderStates?id="+id+"&orderStates=待付款订单",
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
                
                var $iosDialog2 = '<div class="js_dialog" id="iosDialog2" style="display: none;">\n\
<div class="weui-mask">\n\
</div><div class="weui-dialog">\n\
<div class="weui-dialog__bd">您好，已确认甲乙双方用印完成，请查收账单并付款！</div>\n\
<div class="weui-dialog__ft">\n\
<a href="javascript: location.reload();" class="weui-dialog__btn weui-dialog__btn_primary">知道了</a>\n\
</div>\n\
</div> \n\
</div>';

                if($('#iosDialog2').length > 0){
                    $('#iosDialog2').remove();
                }
                $('body').append($iosDialog2);
                $('#iosDialog2').fadeIn(200);
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
