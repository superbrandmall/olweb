var d = new Date();
var month = d.getMonth()+1;
var day = d.getDate();
var time = d.getTime();
var date = d.getFullYear() + '-' +
    (month<10 ? '0' : '') + month + '-' +
    (day<10 ? '0' : '') + day;
    
$(document).ready(function(){
    $('.slide').swipeSlide({
        autoSwipe:true,
        continuousScroll:true,
        transitionType:'ease-in',
        lazyLoad:true,
        firstCallback : function(i,sum,me){
            me.find('.dot').children().first().addClass('cur');
        },
        callback : function(i,sum,me){
            me.find('.dot').children().eq(i).addClass('cur').siblings().removeClass('cur');
        }
    });
});

function AddtoCart(uc,sc,un,ar){
    var unit = uc;
    var shopCode = sc;
    var unitName = un;
    var area = ar;
    var outTradeNo = '100001' + d.getFullYear() +
                (month<10 ? '0' : '') + month +
                (day<10 ? '0' : '') + day + time
                + '0000' + parseInt(Math.random()*10);

    /* 
     * @订单状态  
     *  待确认订单
     *  合同已生成
     *  合同用印中
     *  待付款订单
     *  已完成订单
     *  已关闭订单
     */

    var map = {
        "amount": 100000,
        "appid": "test",
        "brandId": "",
        "brandName": $.cookie('brand_1'),
        "code": unit,
        "contractInfos": [
          {
            "amount": "",
            "bizScope": "testss",
            "breachAmount": "",
            "code": unit,
            "depositAmount": "",
            "electricBillFlag": "1",
            "endDate": "",
            "enterDate": "",
            "isCleaning": "1",
            "isSecurity": "1",
            "isService": "1",
            "mobileNo": $.cookie('uid'),
            "name": "test name",
            "num": 1,
            "openDate": "",
            "orgCode": "100001",
            "otherFlag": "",
            "outTradeNo": outTradeNo,
            "remarkFifth": "",
            "remarkFirst": "",
            "remarkFourth": "",
            "remarkSecond": unitName,
            "remarkThird": "",
            "salesFlag": "1",
            "serviceDepositAmount": 3000,
            "size": "", //广告尺寸规格
            "spec": "",
            "startDate": "",
            "unitCode": unit,
            "unitDesc": unitName,
            "unitId": "sfsdfsfasfsfasdfasdf",
            "userId": "10000101",
            "vipFlag": "1",
            "wxCardFlag": "1",
            "area": area //广告默认传1
          }
        ],
        "contractNo": "",
        "contractTermInfos": [
          {
            "amount": "",
            "code": "1",
            "endDate": "",
            "name": "",
            "orgCode": "100001",
            "outTradeNo": outTradeNo,
            "rentAmount": "",
            "startDate": "",
            "taxAmount": "",
            "termType": "B011",
            "termTypeName": "固定租金",
            "unitCode": unit,
            "unitId": "sfsdfsfasfsfasdfasdf",
            "area": area
          }
        ],
        "contractType": "R5",//R1租赁 R4广告 R5场地
        "mobileNo": $.cookie('uid'),
        "name": "wechatol",
        "orderStates": "待确认订单", //订单状态
        "orgCode": "100001",
        "outTradeNo": outTradeNo,
        "payStates": "未支付", //支付状态
        "tenantId": "海鼎公司uuid",
        "tenantName": "公司名",
        "tenantNo": "海鼎公司编号",
        "tenantOrg": "G12321312312223131", //uscc
        "userId": "sfsdfsfasfsfasdfasdf",
        "remarkFirst": shopCode,
        "remarkSecond": 'events'
    };
    
    
    $.ajax({
        url: $.api.baseNew+"/comm-wechatol/api/order/saveOrUpdate",
        type: "POST",
        data: JSON.stringify(map),
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
                findUserCompanyByMobileNo(shopCode,outTradeNo);
            } else {
                interpretBusinessCode(response.customerMessage);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}

function findUserCompanyByMobileNo(sc,outTradeNo){
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
                        window.location.href = '/v2/choose-event?id='+sc+'&trade='+outTradeNo;
                    } else {
                        window.location.href = '/v2/company-info?id='+sc+'&trade='+outTradeNo+'&type=events';
                    }
                } else {
                    window.location.href = '/v2/company-info?id='+sc+'&trade='+outTradeNo+'&type=events';
                }
            }
        }
    })
}