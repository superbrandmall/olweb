$(document).ready(function(){
    getAllOrdersToStamping();
});

function getAllOrdersToStamping() {
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
                if(response.data.length > 0){
                    $.each(response.data.reverse(), function(i,v){
                        if(v.state == 1 && (v.orderStates == '合同已生成' || v.orderStates == '合同用印中' || v.orderStates == '待付款订单')){
                            empty = 0;
                            var alink = '';
                            var shopName = '';
                            
                            if(v.remarkSecond == 'leasing' || v.remarkSecond == 'events'){
                                img = "/views/assets/base/img/content/backgrounds/events/"+v.remarkFirst+"_1.jpg";
                                shopName = '【'+v.contractInfos[0].unitDesc+'】';
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
                                
                                if(v.remarkSecond == 'leasing'){
                                    img = getShopInfo(v.remarkFirst);
                                    amount = parseFloat((amount + 3000).toFixed(2));
                                    taxAmount = parseFloat((taxAmount + 3000).toFixed(2));
                                }
                                tax = parseFloat((amount - taxAmount).toFixed(2));
                                var qty = 1;
                            } else if(v.remarkSecond == 'advertising'){
                                img = v.contractInfos[0].remarkFirst;
                                var amount = 0; //含税总额
                                var taxAmount = 0; //不含税总额
                                var qty = 1;
                                
                                $.each(v.contractInfos, function(j,w){
                                    shopName = shopName + '【' + w.unitDesc + '】 ';
                                    amount = amount + w.amount;
                                    qty = w.remarkThird;
                                })
                                
                                amount = parseFloat(amount.toFixed(2));
                                taxAmount = parseFloat((amount/1.06).toFixed(2));
                                var tax = (amount-taxAmount).toFixed(2);
                                amount = parseFloat((amount*1.2).toFixed(2));
                            }
                            
                            if(v.orderStates === '合同已生成'){
                                alink = '<li><a class="current" href="/v2/contract?type='+v.remarkSecond+'&trade='+v.outTradeNo+'" style="color: #fa5151;">查看合同并用印</a></a></li>';
                            } else if(v.orderStates === '合同用印中'){
                                alink = '<li><a class="current" href="/v2/contract-view?type='+v.remarkSecond+'&trade='+v.outTradeNo+'">查看合同</a></li>';
                            } else if(v.orderStates === '待付款订单'){
                                alink = '<li><a class="current" href="/v2/bill?trade='+v.outTradeNo+'">查看账单</a></li>\n\
<li><a href="/v2/contract-view?type='+v.remarkSecond+'&trade='+v.outTradeNo+'">查看合同</a></li>';
                            }
                            
                            var mallName;
                            switch (v.orgCode) {
                                case '301001':
                                    mallName = '河南洛阳正大广场';
                                    break;
                                case '201001':
                                    mallName = '上海宝山正大乐城';
                                    break;
                                case '100001':
                                    mallName = '上海陆家嘴正大广场';
                                    break;
                                case '204001':
                                    mallName = '上海徐汇正大乐城';
                                    break;
                                default:
                                    mallName = '上海陆家嘴正大广场';
                                    break;
                            }
                            
                            $('#orders').append('<div class="weui-panel">\n\
        <div class="weui-panel__hd">'+mallName+' <i class="fa fa-angle-right" aria-hidden="true"></i>\n\
        <div style="color: rgba(0,0,0,.5); float: right;">'+v.orderStates+'</div></div>\n\
        <div class="weui-panel__bd"><div class="weui-media-box weui-media-box_appmsg">\n\
        <div class="weui-media-box__hd" style="width: 100px; height: 67px;"><img class="weui-media-box__thumb" src="'+img+'" alt=""></div>\n\
        <div class="weui-media-box__bd">\n\
        <div class="weui-form-preview__bd" style="font-size: 15px; padding: 0;">\n\
        <div class="weui-form-preview__item">\n\
        <span class="weui-form-preview__value">'+v.contractInfos[0].unitDesc+'</span>\n\
        <span class="weui-form-preview__value">共'+qty+'件商品 合计: <small>¥</small>'+numberWithCommas(amount)+'</span>\n\
        <span class="weui-form-preview__value"><small>(含税费 ¥'+numberWithCommas(tax)+')</small></span></div></div>\n\
        </div></div><ul class="weui-media-box__button">\n\
'+alink+'\n\
        </ul></div>'); 
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