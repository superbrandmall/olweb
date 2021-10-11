var d = new Date();
var month = d.getMonth()+1;
var day = d.getDate();
var date = d.getFullYear() + '-' +
    (month<10 ? '0' : '') + month + '-' +
    (day<10 ? '0' : '') + day;
    
$(document).ready(function(){
    getOrderByTradeNO();
});

function getOrderByTradeNO() {
    $.ajax({
        url: $.api.baseNew+"/comm-wechatol/api/order/findAllByMobileNoAndOutTradeNo?mobileNo="+$.cookie('uid')+"&outTradeNo="+getURLParameter('trade'),
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
            hideLoading();
            if(response.code === 'C0') {
                var v = response.data;
                
                if(v.id != null) {
                    var img = '';
                    var alink = '';
                    var shopName = '';
                    var leasingState = '';
                    var shopState = 1;
                    var expireDay = '';
                    var blink = ':;';

                    $('#brandName').text(v.brandName);
                            
                    if(v.remarkSecond == 'leasing' || v.remarkSecond == 'events'){
                        $('#unitDesc').text(response.data.contractInfos[0].unitDesc);
                        img = "/views/assets/base/img/content/backgrounds/events/"+v.remarkFirst+"_1.jpg";
                        shopName = '【'+v.contractInfos[0].unitDesc+'】';
                        //应缴金额=保证金+首月固定租金与物业管理费(含税)

                        var taxAmount = 0; //不含税总额
                        var amount = 0; //含税总额
                        var singlePrice = 0;
                        var deposit = 0;
                        var tax = 0; //税费
                        $.each(v.contractInfos, function(j,w){
                            taxAmount = parseFloat((taxAmount + w.depositAmount).toFixed(2));
                            amount = taxAmount;
                            if(v.remarkSecond == 'events'){
                               deposit = parseFloat((deposit + w.depositAmount).toFixed(2));
                            }
                        })
                        
                        $('#adevent_deposit').text(numberWithCommas(deposit));

                        $.each(v.contractTermInfos, function(j,w){
                            if((w.termTypeName == '固定租金' || w.termTypeName == '物业管理费') && w.code == 1){
                                taxAmount = parseFloat((taxAmount + w.taxAmount).toFixed(2));
                                amount = parseFloat((amount + w.amount).toFixed(2));
                                if(v.remarkSecond == 'leasing' && w.termTypeName == '固定租金'){
                                    $('#rent').text(numberWithCommas(w.amount));
                                }
                                if(v.remarkSecond == 'leasing' && w.termTypeName == '物业管理费'){
                                    $('#maintenance').text(numberWithCommas(w.amount));
                                }
                            }
                        })

                        var mark = '<span class="bg-blue f-white" style="font-size: 12px; padding: 2px 4px;">办活动</span>';

                        if(v.remarkSecond == 'leasing'){
                            $('#leasing_price').show();
                            $('#deposit').text(numberWithCommas(v.contractInfos[0].depositAmount.toFixed(2)));
                            var mallCode;
                            switch (v.orgCode) {
                                case '301001':
                                    mallCode = 'OLMALL190117000001';
                                    break;
                                case '201001':
                                    mallCode = 'OLMALL180917000002';
                                    break;
                                case '100001':
                                    mallCode = 'OLMALL180917000003';
                                    break;
                                case '204001':
                                    mallCode = 'OLMALL180917000001';
                                    break;
                                default:
                                    mallCode = 'OLMALL180917000003';
                                    break;
                            }

                            var temp = $.parseJSON(sessionStorage.getItem("shopmoreinfo_"+mallCode+"_"+v.contractInfos[0].shopCode));
                            if(temp != null){
                                var shopState = temp.state;
                            } else {
                                shopState = 0;
                            }

                            switch (shopState) {
                                case 1: //该铺位目前可签约
                                    break;
                                case 2: //该铺位目前可签约
                                    break;
                                case 3:
                                    if(v.orderStates != '合同用印中'){
                                        leasingState = '<small class="bg-light-red f-orange" style="padding: 2px 5px;"><i class="fa fa-exclamation-triangle" aria-hidden="true"></i>有其他用户已经准备签约该铺位</small>';
                                    }
                                    break;
                                case 4:
                                    if(v.orderStates != '待付款订单'){
                                        leasingState = '<small class="bg-light-red f-orange" style="padding: 2px 5px;"><i class="fa fa-exclamation-triangle" aria-hidden="true"></i>有其他用户已经签约该铺位,请重新选择</small>';
                                    }
                                    break;
                                case 5:
                                    if(v.orderStates != '已完成订单'){
                                        leasingState = '<small class="bg-light-red f-orange" style="padding: 2px 5px;"><i class="fa fa-exclamation-triangle" aria-hidden="true"></i>该铺位目前已被预定,请重新选择</small>';
                                    }
                                    break;
                                case 0:
                                    leasingState = '<small class="bg-light-red f-orange" style="padding: 2px 5px;"><i class="fa fa-exclamation-triangle" aria-hidden="true"></i>该铺位已下架,请重新选择</small>';
                                    break;
                                case 9:
                                    leasingState = '<small class="bg-light-red f-orange" style="padding: 2px 5px;"><i class="fa fa-exclamation-triangle" aria-hidden="true"></i>该铺位已下架,请重新选择</small>';
                                    break;
                                default:
                                    leasingState = '';
                                    break;
                            }

                            getShopInfo(v.remarkFirst);

                            img = "/views/assets/base/img/content/backgrounds/leasing/"+v.remarkFirst+".jpg";
                            amount = parseFloat((amount + 3000).toFixed(2));
                            taxAmount = parseFloat((taxAmount + 3000).toFixed(2));
                            if(v.payType == 'deposit' || v.payType == 'wxPay' || v.payType == 'aliPay'){
                                mark = '<span class="bg-gold" style="font-size: 12px; padding: 2px 4px;">定金支付</span>';
                            } else {
                                mark = '<span class="bg-gold" style="font-size: 12px; padding: 2px 4px;">租新铺</span>';
                            }

                            if(v.completeDate != null && v.completeDate != 'NULL' && v.completeDate != ''){
                                var isExpired = '';

                                if(dateCompare(IncrDates(v.completeDate,6),date) == true){
                                    isExpired = ' <span class="f-orange">已结束</span>';
                                }
                                if(v.payStates == '未支付'){
                                    expireDay = '<small style="float: right; padding: 16px 16px 0 16px; width: 90%; text-align: right;">付款截止日 <span style="color: rgba(0,0,0,.5);">'+IncrDates(v.completeDate,6)+'<span>'+isExpired+'<hr style="margin-top: 8px;"></small>';
                                } else if(v.payStates == '已支付' && v.payType != 'deposit'  && v.payType != 'aliPay'  && v.payType != 'wxPay'){
                                    expireDay = '<small style="float: right; padding: 16px 16px 0 16px; width: 90%; text-align: right;">退款截止日 <span style="color: rgba(0,0,0,.5);">'+IncrDates(v.completeDate,6)+'<span>'+isExpired+'<hr style="margin-top: 8px;"></small>';
                                }
                            }
                            
                            blink = '/v2/shop?id='+v.remarkFirst+'&type='+v.remarkSecond+'&storeCode='+mallCode;
                        } else {
                            $('#adevent_price').show();
                            $('#adevent_rent').text(numberWithCommas(parseFloat((amount-deposit).toFixed(2))));
                            blink = '/v2/event?id='+v.remarkFirst+'&type='+v.remarkSecond+'&storeCode='+mallCode;
                        }

                        singlePrice = numberWithCommas(amount);
                        tax = parseFloat((amount - taxAmount).toFixed(2));
                        var qty = 1;
                    } else if(v.remarkSecond == 'advertising'){
                        $('#adevent_price').show();
                        var amount = 0; //含税总额
                        var taxAmount = 0; //不含税总额
                        var qty = 1;
                        var deposit = 0;
                        
                        $.each(v.contractInfos, function(j,w){
                            amount = amount + w.amount;
                            qty = w.remarkThird;
                            deposit = parseFloat((deposit + w.depositAmount).toFixed(2));
                            $('#unitDesc').append(''+w.unitDesc+w.unitCode+'<br>');
                        })

                        amount = parseFloat(amount.toFixed(2));
                        taxAmount = parseFloat((amount/1.06).toFixed(2));
                        var tax = (amount-taxAmount).toFixed(2);
                        amount = parseFloat((amount*1.2).toFixed(2));

                        var mark = '<span class="bg-purple f-white" style="font-size: 12px; padding: 2px 4px;">做广告</span>';

                        img = "/views/assets/base/img/content/backgrounds/ads/"+v.remarkFirst+".jpg";
                        $('#adevent_rent').text(numberWithCommas(parseFloat((amount-deposit).toFixed(2))));
                        $('#adevent_deposit').text(numberWithCommas(deposit));
                        
                        blink = '/v2/ad?id='+v.remarkFirst+'&type='+v.remarkSecond+'&storeCode='+mallCode;
                    }

                    var mallName, mallCode, buildingCode, mallSpell;
                    var refundLink = '';
                    var orderTitle = '';
                    
                    switch (v.orgCode) {
                        case '301001':
                            mallName = '河南洛阳正大广场';
                            mallCode = 'OLMALL190117000001';
                            buildingCode = 'OLBUILDING190117000001';
                            mallSpell = 'ly';
                            break;
                        case '201001':
                            mallName = '上海宝山正大乐城';
                            mallCode = 'OLMALL180917000002';
                            buildingCode = 'OLBUILDING180917000005';
                            mallSpell = 'bs';
                            break;
                        case '100001':
                            mallName = '上海陆家嘴正大广场';
                            mallCode = 'OLMALL180917000003';
                            buildingCode = 'OLBUILDING180917000001';
                            mallSpell = 'ljz';
                            break;
                        case '204001':
                            mallName = '上海徐汇正大乐城';
                            mallCode = 'OLMALL180917000001';
                            buildingCode = 'OLBUILDING180917000006';
                            mallSpell = 'xh';
                            break;
                        default:
                            mallName = '上海陆家嘴正大广场';
                            mallCode = 'OLMALL180917000003';
                            buildingCode = 'OLBUILDING180917000001';
                            mallSpell = 'ljz';
                            break;
                    }

                    if(v.payStates != '退款中' && v.payStates != '已退款'){
                        if(v.payType == 'deposit' || v.payType == 'wxPay' || v.payType == 'aliPay'){
                            refundLink = '';
                        } else {
                            refundLink = '<li><a href=\'javascript: requireRefund("'+v.remarkFirst+'","'+v.contractInfos[0].unitCode+'","'+buildingCode+'","'+mallCode+'","'+v.outTradeNo+'","'+v.id+'");\'>申请退款</a></li>';                                    
                        }
                    } else {
                        refundLink = '<li><span style="background-color: #eee; border: solid 1px #eee; border-radius: 50px; padding: 4px 8px; color: #999;">'+v.payStates+'</span></li>';
                    }

                    if(v.state == 1 && v.orderStates == '合同已生成' && (shopState == 1 || shopState == 2 || shopState == 3)){
                        alink = '<li><a class="current" href="/upload/docs/guides/esign_proxy.docx" download="/upload/docs/guides/esign_proxy.docx">下载电子签章授权书</a></li>\n\
    <li><a class="current" href="/v2/contract?type='+v.remarkSecond+'&trade='+v.outTradeNo+'">查看合同并用印</a></a></li>';
                        orderTitle = '<i class="weui-icon-info weui-icon_msg"></i><div class="icon-box__ctn"><h3 class="icon-box__title">合同已经生成啦</h3></div>';                                                                        
                    } else if(v.state == 1 && v.orderStates == '合同用印中' && (shopState == 1 || shopState == 2 || shopState == 3)){
                        alink = '<li><a class="current" href="/upload/docs/guides/esign_proxy.docx" download="/upload/docs/guides/esign_proxy.docx">下载电子签章授权书</a></li>\n\
    <li><a class="current" href="/v2/contract-view?type='+v.remarkSecond+'&trade='+v.outTradeNo+'">查看合同</a></li>';
                        orderTitle = '<i class="weui-icon-warn weui-icon_msg-primary"></i><div class="icon-box__ctn"><h3 class="icon-box__title">合同正在用印中</h3></div>';                                                                        
                    } else if(v.state == 1 && v.orderStates === '待付款订单' && shopState == 4){
                        alink = '<li><a class="current" href="/v2/bill?trade='+v.outTradeNo+'">查看账单</a></li>\n\
    <li><a href="/v2/contract-view?type='+v.remarkSecond+'&trade='+v.outTradeNo+'">查看合同</a></li>';
                        orderTitle = '<i class="weui-icon-waiting weui-icon_msg"></i><div class="icon-box__ctn"><h3 class="icon-box__title">您有一笔付款尚未支付</h3></div>';
                    } else if(v.state == 1 && v.orderStates === '定金待支付' && (shopState == 1 || shopState == 2)){
                        alink = '<li><a class="current" href="/v2/bill2?trade='+v.outTradeNo+'">支付定金</a></li>\n\
    <li><a href="/v2/contract-view2?type='+v.remarkSecond+'&trade='+v.outTradeNo+'">查看合同</a></li>';
                        orderTitle = '<i class="weui-icon-waiting weui-icon_msg"></i><div class="icon-box__ctn"><h3 class="icon-box__title">您有一笔定金尚需支付</h3></div>';                                                                        
                    } else if(v.state == 1 && v.orderStates === '已完成订单'){
                        if(v.payType == 'deposit' || v.payType == 'wxPay' || v.payType == 'aliPay'){
                            alink = '<li><a class="current tenant-guide" href="javascript:;">进场指导</a></li><li><a href="/v2/contract-view2?type='+v.remarkSecond+'&trade='+v.outTradeNo+'">查看合同</a></li>';
                        } else {
                            alink = '<li><a class="current tenant-guide" href="javascript:;">进场指导</a></li>\n\
                                    <li><a href="/v2/contract-view?type='+v.remarkSecond+'&trade='+v.outTradeNo+'">查看合同</a></li>\n\
                                    '+refundLink+'';
                        }
                        orderTitle = '<i class="weui-icon-success weui-icon_msg"></i><div class="icon-box__ctn"><h3 class="icon-box__title">交易成功啦</h3></div>';
                    } else if(v.state == 1 && v.orderStates === '已关闭订单'){
                        alink = '<li><a href=\'javascript: hideOrder("'+v.id+'");\'>隐藏已关闭订单</a></li>';
                        orderTitle = '<i class="weui-icon-warn weui-icon_msg"></i><div class="icon-box__ctn"><h3 class="icon-box__title">订单超时已关闭</h3></div>';
                    } 


                    $('#order').html('<div id="weui_panel_'+v.id+'" class="weui-panel" onclick="window.location.href=\''+blink+'\'">\n\
            <div class="weui-panel__hd" onclick="window.location.href=\'/v2/'+mallSpell+'\'">'+mark+' '+mallName+' <i class="fa fa-angle-right" style="color: rgba(0,0,0,.5)" aria-hidden="true"></i>\n\
            <div class="f-orange" style="float: right;">'+v.orderStates+'</div></div></div>');

                    var weuiPanelBdId = '';
                    for(var c=0;c<v.contractInfos.length;c++){
                        if(v.remarkSecond == 'advertising'){                            
                            getAdInfo(v.orgCode,v.contractInfos[c].shopCode);
                            singlePrice = numberWithCommas(parseFloat((v.contractInfos[c].amount*1.2).toFixed(2)));
                            weuiPanelBdId = ' id=weui-panel__bd_'+v.id+'_'+v.contractInfos[c].shopCode;
                        }

                        if($('#weui-panel__bd_'+v.id+'_'+v.contractInfos[c].shopCode).length <= 0){
                            $('#weui_panel_'+v.id).append('<div class="weui-panel__bd"'+weuiPanelBdId+'><div class="weui-media-box weui-media-box_appmsg">\n\
                <div class="weui-media-box__hd" style="position: relative; width: 100px; height: 67px;"><img class="weui-media-box__thumb" src="'+img+'" alt=""></div>\n\
                <div class="weui-media-box__bd">\n\
                <div class="weui-form-preview__bd" style="font-size: 15px; padding: 0;">\n\
                <div class="weui-form-preview__item">\n\
                <span class="weui-form-preview__value">'+v.contractInfos[c].unitDesc+'</span>\n\
                <span class="weui-form-preview__value"><small>从</small> '+v.contractInfos[c].startDate+' <small>到</small> '+v.contractInfos[c].endDate+'</span>\n\
                '+leasingState+'\n\
                <span class="weui-form-preview__value"><small>¥</small> '+singlePrice+' <small style="color: rgba(0,0,0,.5)">x <span id=weui-panel__qty_'+v.id+'_'+v.contractInfos[c].shopCode+'>'+qty+'</span></small></span>\n\
                </div></div>\n\
                </div></div>');
                        } else {
                            $('#weui-panel__qty_'+v.id+'_'+v.contractInfos[c].shopCode).text(parseFloat($('#weui-panel__qty_'+v.id+'_'+v.contractInfos[c].shopCode).text())+1);
                        }
                    }
                    
                    var iniInstall = '';
                    if(v.payType == 'deposit' || v.payType == 'aliPay' || v.payType == 'wxPay') {
                        iniInstall = '<div style="clear: both;"></div><div style="float: right; padding: 0 16px 16px 16px;"><span style="float: left; margin-right: 20px;">第一笔付款<br><span style="font-size: 9px;">不可退还、不可转让</span></span> <small>¥</small> 1,000</div>'
                    }

                    $('#weui_panel_'+v.id).append(expireDay+'<div style="float: right; padding: 5px 16px 16px 16px;">总价 <small>¥</small> '+numberWithCommas(amount)+' <small>(含税费 ¥'+numberWithCommas(tax)+')</small></div>'+iniInstall);

                    if(v.orderStates == '已关闭订单'){
                        $('#weui_panel_'+v.id).append('<img src="/views/assets/base/img/content/backgrounds/closed.png" style="position: absolute; bottom: 10px; left: 5px;"/>');
                    }
                    
                    $('#orderTitle').html(orderTitle);
                    $('#outTradeNo').text(v.outTradeNowei);
                    $('#createDate').text(v.created);
                    if(v.payStates == '已支付') {
                        $('#createDate').parent().parent().append('<div class="weui-form-preview__item">\n\
                        <span class="weui-form-preview__label">支付时间</span>\n\
                        <span class="weui-form-preview__value"><span id="payDate">'+v.orderPays[0].payTime.split('+')[0].replace('T',' ')+'</span></span>\n\
                    </div>');
                    }
                    
                    $('#orderDetails').append('<ul class="weui-media-box__button">'+alink+'</ul>');
                } else {
                    $('#order').html('<div style="padding: 40px; background-color: #fff;">\n\
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
    if(!sessionStorage.getItem("shop_"+sc) || sessionStorage.getItem("shop_"+sc) == '' || sessionStorage.getItem("shop_"+sc) == null || sessionStorage.getItem("shop_"+sc) == 'undefined'){
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
                    
                    sessionStorage.setItem("shop_"+sc, JSON.stringify(response.data));
                }
            }
        })
    } 
}

function getAdInfo(og,sc){
    if(!sessionStorage.getItem("ads_"+og+"_"+sc) || sessionStorage.getItem("ads_"+og+"_"+sc) == '' || sessionStorage.getItem("ads_"+og+"_"+sc) == null || sessionStorage.getItem("ads_"+og+"_"+sc) == 'undefined'){
            var mallCode;
            switch (og) {
            case '301001':
                mallCode = 'OLMALL190117000001';
                break;
            case '201001':
                mallCode = 'OLMALL180917000002';
                break;
            case '100001':
                mallCode = 'OLMALL180917000003';
                break;
            case '204001':
                mallCode = 'OLMALL180917000001';
                break;
            default:
                mallCode = 'OLMALL180917000003';
                break;
        }

        $.ajax({
            url: $.api.baseNew+"/comm-wechatol/api/advertising/base/findAllByStoreCodeAndShopCode?storeCode="+mallCode+"&shopCode="+sc,
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
                    sessionStorage.setItem("ads_"+og+"_"+sc, JSON.stringify(response.data));
                }
            }
        });
    }
}