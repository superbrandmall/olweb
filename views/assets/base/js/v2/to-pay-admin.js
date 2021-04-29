var d = new Date();
var month = d.getMonth()+1;
var day = d.getDate();
var date = d.getFullYear() + '-' +
    (month<10 ? '0' : '') + month + '-' +
    (day<10 ? '0' : '') + day;
    
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
                            var leasingState = '';
                            var expireDay = '';
                            var alink = '';
                            
                            if(v.remarkSecond == 'leasing' || v.remarkSecond == 'events'){
                                img = "/views/assets/base/img/content/backgrounds/events/"+v.remarkFirst+"_1.jpg";
                                //应缴金额=保证金+首月固定租金与物业管理费(含税)
                                var taxAmount = 0; //不含税总额
                                var amount = 0; //含税总额
                                var tax = 0; //税费
                                var singlePrice = 0;
                                
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
                                
                                var mark = '<span class="bg-blue f-white" style="font-size: 12px; padding: 2px 4px;">办活动</span>';
                                
                                if(v.remarkSecond == 'leasing'){
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
                                    
                                    var shopState = 1;
                                    shopState = getShopState(mallCode,v.contractInfos[0].unitCode);
                                    
                                    switch (shopState) {
                                        case 1:
                                            leasingState = '<small class="bg-light-red f-orange" style="padding: 2px 5px;">该铺位目前可签约</small>';
                                            break;
                                        case 2:
                                            leasingState = '<small class="bg-light-red f-orange" style="padding: 2px 5px;">该铺位目前可签约</small>';
                                            break;
                                        case 3:
                                            leasingState = '<small class="bg-light-red f-orange" style="padding: 2px 5px;">该铺位已与租户进入线上签约阶段</small>';
                                            break;
                                        case 4:
                                            leasingState = '<small class="bg-light-red f-orange" style="padding: 2px 5px;">该铺位已与租户完成签约进入付款阶段</small>';
                                            break;
                                        case 0:
                                            leasingState = '<small class="bg-light-red f-orange" style="padding: 2px 5px;">该铺位已下架</small>';
                                            break;    
                                        default:
                                            leasingState = '';
                                            break;
                                    }
                                    
                                    img = getShopInfo(v.remarkFirst);
                                    amount = parseFloat((amount + 3000).toFixed(2));
                                    taxAmount = parseFloat((taxAmount + 3000).toFixed(2));
                                    if(v.payType == 'deposit' || v.payType == 'wxPay' || v.payType == 'aliPay'){
                                        mark = '<span class="bg-orange f-white" style="font-size: 12px; padding: 2px 4px;">定金支付</span>';
                                    } else {
                                        mark = '<span class="bg-green f-white" style="font-size: 12px; padding: 2px 4px;">租新铺</span>';
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
                                }
                                
                                singlePrice = numberWithCommas(amount);
                                tax = parseFloat((amount - taxAmount).toFixed(2));
                                var qty = 1;
                            } else if(v.remarkSecond == 'advertising'){
                                img = v.contractInfos[0].remarkFirst;
                                var amount = 0; //含税总额
                                var taxAmount = 0; //不含税总额
                                var qty = 1;
                                
                                $.each(v.contractInfos, function(j,w){
                                    amount = amount + w.amount;
                                    qty = w.remarkThird;
                                })
                                
                                amount = parseFloat(amount.toFixed(2));
                                taxAmount = parseFloat((amount/1.06).toFixed(2));
                                tax = (amount-taxAmount).toFixed(2);
                                amount = parseFloat((amount*1.2).toFixed(2));
                                
                                var mark = '<span class="bg-purple f-white" style="font-size: 12px; padding: 2px 4px;">做广告</span>';
                            }
                            
                            var mallName, mallCode, buildingCode;
                            var refundLink = '';
                            switch (v.orgCode) {
                                case '301001':
                                    mallName = '河南洛阳正大广场';
                                    mallCode = 'OLMALL190117000001';
                                    buildingCode = 'OLBUILDING190117000001';
                                    break;
                                case '201001':
                                    mallName = '上海宝山正大乐城';
                                    mallCode = 'OLMALL180917000002';
                                    buildingCode = 'OLBUILDING180917000005';
                                    break;
                                case '100001':
                                    mallName = '上海陆家嘴正大广场';
                                    mallCode = 'OLMALL180917000003';
                                    buildingCode = 'OLBUILDING180917000001';
                                    break;
                                case '204001':
                                    mallName = '上海徐汇正大乐城';
                                    mallCode = 'OLMALL180917000001';
                                    buildingCode = 'OLBUILDING180917000006';
                                    break;
                                default:
                                    mallName = '上海陆家嘴正大广场';
                                    mallCode = 'OLMALL180917000003';
                                    buildingCode = 'OLBUILDING180917000001';
                                    break;
                            }
                            
                            if(v.payStates != '退款中' && v.payStates != '已退款'){
                                if(v.payType == 'deposit' || v.payType == 'wxPay' || v.payType == 'aliPay'){
                                    refundLink = '';
                                } else {
                                    refundLink = '<li><a href=\'javascript: requireRefund("'+v.remarkFirst+'","'+v.contractInfos[0].unitCode+'","'+buildingCode+'","'+mallCode+'","'+v.outTradeNo+'","'+v.id+'");\'>申请退款</a></li>';                                    
                                }
                            } else {
                                refundLink = '<li><span style="background-color: #eee; border: solid 1px #eee; border-radius: 50px; padding: 6px 10px; color: #999;">'+v.payStates+'</span></li>';
                            }
                            
                            if(v.payType == 'deposit' || v.payType == 'wxPay' || v.payType == 'aliPay'){
                                alink = '<li><a class="current tenant-guide" href="javascript:;">进场指导</a></li><li><a href="/v2/contract-view2?type='+v.remarkSecond+'&trade='+v.outTradeNo+'">查看合同</a></li>';
                            } else {
                                alink = '<li><a class="current tenant-guide" href="javascript:;">进场指导</a></li><li><a href="/v2/contract-view?type='+v.remarkSecond+'&trade='+v.outTradeNo+'">查看合同</a></li>';
                            }
                            
                            $('#orders').append('<div id="weui_panel_'+v.id+'" class="weui-panel">\n\
        <div class="weui-panel__hd">'+mark+' '+mallName+' <i class="fa fa-angle-right" style="color: rgba(0,0,0,.5)" aria-hidden="true"></i>\n\
        <div class="f-orange" style="float: right;">'+v.orderStates+'</div></div></div>');
         
                            var weuiPanelBdId = '';
                            for(var c=0;c<v.contractInfos.length;c++){
                                if(v.remarkSecond == 'advertising'){                            
                                    img = getAdInfo(v.orgCode,v.contractInfos[c].unitCode);
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
                            
                            $('#weui_panel_'+v.id).append(expireDay+'<div style="float: right; padding: 5px 16px 16px 16px;">总价 <small>¥</small> '+numberWithCommas(amount)+' <small>(含税费 ¥'+numberWithCommas(tax)+')</small></div>'+iniInstall+'\n\
                        <ul class="weui-media-box__button">\n\
                        '+alink+'\n\
                        '+refundLink+'\n\
                        </ul>');                      
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

function getAdInfo(og,unit){
    if(!sessionStorage.getItem("ads_"+og+"_"+unit) || sessionStorage.getItem("ads_"+og+"_"+unit) == '' || sessionStorage.getItem("ads_"+og+"_"+unit) == null || sessionStorage.getItem("ads_"+og+"_"+unit) == 'undefined'){
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
            url: $.api.baseNew+"/comm-wechatol/api/advertising/base/findAllByStoreCodeAndUnitCode?storeCode="+mallCode+"&unitCode="+unit,
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
                    sessionStorage.setItem("ads_"+og+"_"+unit, JSON.stringify(response.data));
                }
            }
        });
    }
    
    var temp = $.parseJSON(sessionStorage.getItem("ads_"+og+"_"+unit));
    var img = temp[0].advertisingImagesWxList[0].imagePath;
    
    return img;
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
    
    var temp = $.parseJSON(sessionStorage.getItem("shop_"+sc));
    var img = '/' + temp.firstImage;

    if(temp.firstImage == null || temp.firstImage == ''){
        img = temp.images[0].image;
    }

    if(temp.unit != null && temp.subType == '正柜'){
        img = "/views/assets/base/img/content/backgrounds/leasing/"+temp.unit+".jpg";
    }
    
    return img;
    
}

function getShopState(mall,unit){
    //if(!sessionStorage.getItem("shopmoreinfo_"+mall+"_"+unit) || sessionStorage.getItem("shopmoreinfo_"+mall+"_"+unit) == '' || sessionStorage.getItem("shopmoreinfo_"+mall+"_"+unit) == null || sessionStorage.getItem("shopmoreinfo_"+mall+"_"+unit) == 'undefined'){
        $.ajax({
            url: $.api.baseNew+"/comm-wechatol/api/shop/base/findAllByStoreCodeAndUnitCode?storeCode="+mall+"&unitCode="+unit,
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
                    
                    sessionStorage.setItem("shopmoreinfo_"+mall+"_"+unit, JSON.stringify(response.data));
                }
            }
        })
    //}
    
    var temp = $.parseJSON(sessionStorage.getItem("shopmoreinfo_"+mall+"_"+unit));
    
    var state = 1;
    if(temp != '' && temp != [] && temp != 'undefined' && temp.length > 0){
        state = temp[0].state;
    }
    
    return state;
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

function requireRefund(code,unit,buildingCode,mallCode,trade,id) {
    window.location.href = '/v2/negotiation?code='+code+'&unit='+unit+'&building='+buildingCode+'&mall='+mallCode+'&name=2&trade='+trade+'&order='+id;
}