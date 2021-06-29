$.order = {
    shopName: "",
    expectDate: "",
    expect: ""
};

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
            if(response.code === 'C0' && response.data.payStates == '未支付') {
                var amount = 0; //含税总额
                var taxAmount = 0; //不含税总额
                
                var mallName,orgName,payeeAccount,payeeBank,type;
                switch (response.data.orgCode) {
                    case '301001':
                        mallName = '河南洛阳正大广场';
                        orgName = '洛阳正大置业有限公司';
                        payeeAccount = '413069600018010009891';
                        payeeBank = '交通银行洛阳分行营业部';  
                        break;
                    case '201001':
                        mallName = '上海宝山正大乐城';
                        orgName = '上海正大帝盈商业发展有限公司';
                        payeeAccount = '1001014219006800273';
                        payeeBank = '工商银行顾村支行'; 
                        break;
                    case '100001':
                        mallName = '上海陆家嘴正大广场';
                        orgName = '上海帝泰发展有限公司';
                        break;
                    case '204001':
                        mallName = '上海徐汇正大乐城';
                        orgName = '上海正大乐城百货有限公司';
                        payeeAccount = '0243014210002166';
                        payeeBank = '中国民生银行上海吴中支行';  
                        break;
                    default:
                        mallName = '上海陆家嘴正大广场';
                        orgName = '上海帝泰发展有限公司';
                        payeeAccount = '310066030018170043300';
                        payeeBank = '交通银行上海虹口支行';
                        break;
                }
                
                $.order.shopName = '【'+response.data.contractInfos[0].unitDesc+'】';
                
                $.order.expectDate = IncrDates(date,6);
                $.order.expect = $.order.expectDate.split('-')[0]+'年'+$.order.expectDate.split('-')[1]+'月'+$.order.expectDate.split('-')[2]+'日 23:59:59';

                $.each(response.data.contractInfos, function(i,v){
                    taxAmount = parseFloat((taxAmount + v.depositAmount).toFixed(2));
                    amount = taxAmount;
                })

                $.each(response.data.contractTermInfos, function(i,v){
                    if((v.termTypeName == '固定租金' || v.termTypeName == '物业管理费') && v.code == 1){
                        taxAmount = parseFloat((taxAmount + v.taxAmount).toFixed(2));
                        amount = parseFloat((amount + v.amount).toFixed(2));
                        if(v.termTypeName == '固定租金'){
                            $('#rent').text(numberWithCommas(v.amount));
                        }
                        if(v.termTypeName == '物业管理费'){
                            $('#maintenance').text(numberWithCommas(v.amount));
                        }
                    }
                })

                amount = parseFloat((amount + 3000).toFixed(2));
                taxAmount = parseFloat((taxAmount + 3000).toFixed(2));
                $('#amount').text(numberWithCommas(amount));
                $('#deposit').text(numberWithCommas(response.data.contractInfos[0].depositAmount.toFixed(2)));
                $('#tax').text(numberWithCommas(parseFloat((amount - taxAmount).toFixed(2))));
                
                $('.org').text(orgName);
                $('#mall').text(mallName);
                $('#expect').text($.order.expect);
                $('#outTradeNo').text(response.data.outTradeNo);
                $('#unitDesc').text(response.data.contractInfos[0].unitDesc);
                $('#unitDesc').text(response.data.contractInfos[0].unitDesc);

                $('#startPay').click(function(){
                    if($("input[id=wechatPay]").prop("checked")){
                        showWXDialog();
                    } else if($("input[id=aliPay]").prop("checked")){
                        showALIDialog();
                    }
                    
                })
                
                $('#leasing_price').append('<p style="text-align: left; padding: 0 16px 16px;"><small><i class="fa fa-exclamation-triangle" aria-hidden="true"></i>您支付的第一笔款项为定金壹仟元，该笔付款不可退还、不可转让。请您在'+$.order.expect+'前至我司签订正式《房屋租赁合同》，如果逾期则视为您放弃该房屋所有租赁权利，我司有权将该房屋另租他人，定金不予退还。</small></p>');
                
                if(response.data.orderPays.length > 0) {
                    sessionStorage.setItem("wxPay_"+getURLParameter('trade'), JSON.stringify(response.data.orderPays) );
                }
            
                $('#confirm').click(function(){
                    window.location.href = '/v2/stamping';
                    //updateOrderToPayed(response.data.id,response.data.remarkSecond,response.data.outTradeNo,response.data.contractInfos[0].unitCode);
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

function showWXDialog(){
    $(function(){
        var $iosDialog2 = '<div class="js_dialog" id="iosDialog2" style="display: none;">\n\
    <div class="weui-mask">\n\
    </div><div class="weui-dialog" style="background: #fff;">\n\
    <div class="weui-dialog__bd" style="padding-bottom: 32px;">您支付的第一笔款项为定金壹仟元，该笔付款不可退还、不可转让。请您在'+$.order.expect+'前至我司签订正式《房屋租赁合同》，如果逾期则视为您放弃该房屋所有租赁权利，我司有权将该房屋另租他人，定金不予退还。</div>\n\
    <div class="weui-dialog__ft" style="line-height: 56px; min-height: 56px; font-size: 17px; -webkit-flex-direction: initial;">\n\
    <a href="javascript: hideDialog();" class="weui-dialog__btn weui-dialog__btn_default">再考虑一下</a>\n\
    <a href="javascript: getBrandWCPayRequest();" class="weui-dialog__btn weui-dialog__btn_primary"  style="color: var(--weui-FG-HALF); font-size: 17px; border: 0 none; background: #fff;">确认</a>\n\
    </div>\n\
    </div> \n\
    </div>';

        if($('#iosDialog2').length > 0){
            $('#iosDialog2').remove();
        }
        $('body').append($iosDialog2);
        $('#iosDialog2').fadeIn(200);
    });
}

function showALIDialog(){
    $(function(){
        var $iosDialog2 = '<div class="js_dialog" id="iosDialog2" style="display: none;">\n\
    <div class="weui-mask">\n\
    </div><div class="weui-dialog" style="background: #fff;">\n\
    <div class="weui-dialog__bd" style="padding-bottom: 32px;">您支付的第一笔款项为定金壹仟元，该笔付款不可退还、不可转让。请您在'+$.order.expect+'前至我司签订正式《房屋租赁合同》，如果逾期则视为您放弃该房屋所有租赁权利，我司有权将该房屋另租他人，定金不予退还。</div>\n\
    <div class="weui-dialog__ft" style="line-height: 56px; min-height: 56px; font-size: 17px; -webkit-flex-direction: initial;">\n\
    <a href="javascript: hideDialog();" class="weui-dialog__btn weui-dialog__btn_default">再考虑一下</a>\n\
    <a href="javascript: getAliPayRequest();" class="weui-dialog__btn weui-dialog__btn_primary" style="color: var(--weui-FG-HALF); font-size: 17px; border: 0 none; background: #fff;">确认</a>\n\
    </div>\n\
    </div> \n\
    </div>';

        if($('#iosDialog2').length > 0){
            $('#iosDialog2').remove();
        }
        $('body').append($iosDialog2);
        $('#iosDialog2').fadeIn(200);
    });
}

function hideDialog(){
    $('#iosDialog2').fadeOut();
}
                    
function getBrandWCPayRequest(){  ////v3
    var wxPayTrade = sessionStorage.getItem("wxPay_"+getURLParameter('trade'));
    if(wxPayTrade != undefined && wxPayTrade != null && wxPayTrade != '') {
        hideDialog();
        
        var appId, timeStamp, nonceStr, package, paySign;
        if($.parseJSON(wxPayTrade).length > 0){
            appId = $.parseJSON(wxPayTrade)[0].appId;
            timeStamp = $.parseJSON(wxPayTrade)[0].timeStamp;
            nonceStr = $.parseJSON(wxPayTrade)[0].nonceStr;
            package = $.parseJSON(wxPayTrade)[0].prepayId;
            paySign = $.parseJSON(wxPayTrade)[0].sign;
        } else {
            appId = $.parseJSON(wxPayTrade).appId;
            timeStamp = $.parseJSON(wxPayTrade).timeStamp;
            nonceStr = $.parseJSON(wxPayTrade).nonceStr;
            package = $.parseJSON(wxPayTrade).prepayId;
            paySign = $.parseJSON(wxPayTrade).sign;
        }
        
        WeixinJSBridge.invoke(
           'getBrandWCPayRequest', {
              "appId": appId, 
              "timeStamp": timeStamp,    
              "nonceStr": nonceStr,   
              "package": package,    
              "signType":"RSA",         //微信签名方式：     
              "paySign": paySign
           },
           function(res){
            if (res.err_msg == "get_brand_wcpay_request:ok") {
                queryWxPay();   
            }
        }); 
    } else {
        callWechatPay();
    }
}
/*if (typeof WeixinJSBridge == "undefined"){
   if( document.addEventListener ){
       document.addEventListener('WeixinJSBridgeReady', getBrandWCPayRequest, false);
   }else if (document.attachEvent){
       document.attachEvent('WeixinJSBridgeReady', getBrandWCPayRequest); 
       document.attachEvent('onWeixinJSBridgeReady', getBrandWCPayRequest);
   }
}else{
   getBrandWCPayRequest();
}*/                  

function callWechatPay() {
    var openid = '';
    var unionid = '';
    var appid = '';
    var outTradeNo = getURLParameter('trade');
    if(sessionStorage.getItem('wechat_user_info') != undefined && sessionStorage.getItem('wechat_user_info') != null && sessionStorage.getItem('wechat_user_info') != '') {
        var wechatUserInfo = $.parseJSON(sessionStorage.getItem("wechat_user_info"));
        openid = wechatUserInfo.openid;
        unionid = wechatUserInfo.unionid;
        appid = wechatUserInfo.appId;
    }
    alert(appid);
    var map = {
        "appId": appid,
        "openId": openid,
        "orgCode": "100001",
        "outTradeNo": outTradeNo,
        "totalAmount": 1000,
        "unionId": unionid,
        "mobileNo": $.cookie('uid'),
        "payType": 'wxPay'
    }

    $.ajax({
        url: $.api.baseNew+"/comm-wechatol/api/pay/wxV3Pay",
        type: "POST",
        data: JSON.stringify(map),
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
                sessionStorage.setItem("wxPay_"+getURLParameter('trade'), JSON.stringify(response.data) );
                
                getBrandWCPayRequest();
            } else {
                interpretBusinessCode(response.customerMessage);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}

function queryWxPay() {
    var openid = '';
    var outTradeNo = getURLParameter('trade');
    if(sessionStorage.getItem('wechat_user_info') != undefined && sessionStorage.getItem('wechat_user_info') != null && sessionStorage.getItem('wechat_user_info') != '') {
        openid = $.parseJSON(sessionStorage.getItem("wechat_user_info")).openid;
    }
    
    $.ajax({
        url: $.api.baseNew+"/comm-wechatol/api/pay/queryWxV3Pay?mobileNo="+$.cookie('uid')+"&openId="+openid+"&outTradeNo="+outTradeNo,
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
            if(response.data.resultCode == 'OK') {
                window.location.href = 'https://ol.superbrandmall.com/v2/to-pay';
            } else {
                alert(response.data.resultInfo);
            }
        }
    })
}

function getAliPayRequest() {
    var openid = '';
    var unionid = '';
    var outTradeNo = getURLParameter('trade');
    if(sessionStorage.getItem('wechat_user_info') != undefined && sessionStorage.getItem('wechat_user_info') != null && sessionStorage.getItem('wechat_user_info') != '') {
        openid = $.parseJSON(sessionStorage.getItem("wechat_user_info")).openid;
        unionid = $.parseJSON(sessionStorage.getItem("wechat_user_info")).unionid;
    }

    var map = {
        "openId": openid,
        "orgCode": "100001",
        "outTradeNo": outTradeNo,
        "totalAmount": 1000,
        "unionId": unionid,
        "mobileNo": $.cookie('uid'),
        "payType": 'aliPay'
    }

    $.ajax({
        url: $.api.baseNew+"/comm-wechatol/api/pay/aliWapPay",
        type: "POST",
        data: JSON.stringify(map),
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
                sessionStorage.setItem("aliPay_"+getURLParameter('trade'), JSON.stringify(response.data) );
                
                callAliPay();
            } else {
                interpretBusinessCode(response.customerMessage);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}

function callAliPay(){
    var url = $.parseJSON(sessionStorage.getItem("aliPay_"+getURLParameter('trade'))).orderPay.sign;

    _AP.pay(url);
    return false;
}