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
            if(response.code === 'C0') {
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

                $('.org').text(orgName);
                $('#mall').text(mallName);
                $('#expect').text($.order.expect);
                $('#outTradeNo').text(response.data.outTradeNo);
                $('#unitDesc').text(response.data.contractInfos[0].unitDesc);
                $('#unitDesc').text(response.data.contractInfos[0].unitDesc);

                $('#startPay').click(function(){
                    if($("input[id=wechatPay]").prop("checked")){
                        showDialog();
                    } else if($("input[id=aliPay]").prop("checked")){

                    }
                    
                })
                
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

function showDialog(){
    $(function(){
        var $iosDialog2 = '<div class="js_dialog" id="iosDialog2" style="display: none;">\n\
    <div class="weui-mask">\n\
    </div><div class="weui-dialog">\n\
    <div class="weui-dialog__bd">您支付的第一笔款项为定金壹仟元，该笔付款不可退款，不可转让。请您在'+$.order.expect+'前至我司签订正式《房屋租赁合同》，如果逾期则视为您放弃该房屋所有租赁权利，我司有权将该房屋另租他人，定金不予退还。</div>\n\
    <div class="weui-dialog__ft">\n\
    <a href="javascript: hideDialog();" class="weui-dialog__btn weui-dialog__btn_default">再考虑一下</a>\n\
    <a href="javascript: getBrandWCPayRequest();" class="weui-dialog__btn weui-dialog__btn_primary">确认</a>\n\
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
                    
function getBrandWCPayRequest(){  ////v2
    if(sessionStorage.getItem("wxPay_"+getURLParameter('trade')) != undefined && sessionStorage.getItem("wxPay_"+getURLParameter('trade')) != null && sessionStorage.getItem("wxPay_"+getURLParameter('trade')) != '') {
        hideDialog();
        
        var appId = $.parseJSON(sessionStorage.getItem("wxPay_"+getURLParameter('trade'))).appId;
        var timeStamp = $.parseJSON(sessionStorage.getItem("wxPay_"+getURLParameter('trade'))).timeStamp;
        var nonceStr = $.parseJSON(sessionStorage.getItem("wxPay_"+getURLParameter('trade'))).nonceStr;
        var package = $.parseJSON(sessionStorage.getItem("wxPay_"+getURLParameter('trade'))).prepayId;
        var paySign = $.parseJSON(sessionStorage.getItem("wxPay_"+getURLParameter('trade'))).sign;
        //var paySign = md5('appId='+appId+'&nonceStr='+nonceStr+'&package='+package+'&signType=MD5&timeStamp='+timeStamp+'&key='+'LJZzhengdaguangchang202011weixin').toUpperCase();

        WeixinJSBridge.invoke(
           'getBrandWCPayRequest', {
              "appId": appId, 
              "timeStamp": timeStamp,    
              "nonceStr": nonceStr,   
              "package": package,    
              "signType":"MD5",         //微信签名方式：     
              "paySign": paySign
           },
           function(res){
           if(res.err_msg == "get_brand_wcpay_request:ok" ){
           // 使用以上方式判断前端返回,微信团队郑重提示：
                 //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
           } 
        }); 
    } else {
        callWechatPay();
    }
}
if (typeof WeixinJSBridge == "undefined"){
   if( document.addEventListener ){
       document.addEventListener('WeixinJSBridgeReady', getBrandWCPayRequest, false);
   }else if (document.attachEvent){
       document.attachEvent('WeixinJSBridgeReady', getBrandWCPayRequest); 
       document.attachEvent('onWeixinJSBridgeReady', getBrandWCPayRequest);
   }
}else{
   getBrandWCPayRequest();
}                  

function callWechatPay() {
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
        "totalAmount": 1,
        "unionId": unionid,
        "mobileNo": $.cookie('uid')
    }

    $.ajax({
        url: $.api.baseNew+"/comm-wechatol/api/pay/wxPay",
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