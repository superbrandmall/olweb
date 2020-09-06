$(document).ready(function(){
    getAllOrdersToBeConfirmed();
 
    $(function(){
        var $iosActionsheet = $('#iosActionsheet');
        var $iosMask = $('#iosMask');

        function hideActionSheet() {
            $iosActionsheet.removeClass('weui-actionsheet_toggle');
            $iosMask.fadeOut(200);
        }

        $iosMask.on('click', hideActionSheet);
        $('#iosActionsheetCancel').on('click', hideActionSheet);
        $(".tenant-guide").on("click", function(){
            $iosActionsheet.addClass('weui-actionsheet_toggle');
            $iosMask.fadeIn(200);
        });
    });
});

function getAllOrdersToBeConfirmed() {
    $.ajax({
        url: $.api.baseNew+"/comm-wechatol/api/order/findAllByMobileNoAndOrderStates?mobileNo="+$.cookie('uid')+"&orderStates=已完成订单",
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
                        if(v.state === 1 && v.orderStates == '已完成订单'){
                            empty = 0;
                            if(v.remarkSecond == 'leasing' || v.remarkSecond == 'events'){
                                img = getShopInfo(v.remarkFirst);
                                //应缴金额=保证金+首月固定租金与物业管理费(含税)
                                var taxAmount = 0; //不含税总额
                                var amount = 0; //含税总额
                                var tax = 0; //税费
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
                                var qty = 1;
                            } else if(v.remarkSecond == 'advertising'){
                                img = v.contractInfos[0].remarkFirst;
                                
                                var amount = v.amount;
                                var tax = (v.amount*0.06).toFixed(2);
                                var qty = v.remarkThird;
                            
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
        <li class="weui-media-box__info__meta"><a class="weui-link tenant-guide" href="javascript:;">进场指导</a></li>\n\
        <li class="weui-media-box__info__meta weui-media-box__info__meta_extra"><a class="weui-link" href="/v2/contract-view?type='+v.remarkSecond+'&trade='+v.outTradeNo+'">查看合同</a></li>\n\
        <li class="weui-media-box__info__meta weui-media-box__info__meta_extra"><a class="weui-link" href="javascript:;">申请退款</a></li>\n\
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
