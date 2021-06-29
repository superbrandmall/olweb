$.order = {
    copy: "",
    uscc: "",
    company: "",
    businessScope: ""
};

$.availableAdsUnit = new Array();
$.availableAdsUnitCode = new Array();

$.schedule = {
    startDate: [],
    endDate: [],
    available: 1
}

var d = new Date();
var month = d.getMonth()+1;
var day = d.getDate();
var time = d.getTime();
var date = d.getFullYear() + '-' +
    (month<10 ? '0' : '') + month + '-' +
    (day<10 ? '0' : '') + day;

$(document).ready(function(){
    if($.cookie('dateStartAdPackage') != '' && $.cookie('dateStartAdPackage') != null){
        $('#date-start').text($.cookie('dateStartAdPackage'));
    } else {
        $.cookie('dateStartAdPackage',date);
    }
    
    if($.cookie('dateEndAdPackage') != '' && $.cookie('dateEndAdPackage') != null){
        $('#date-end').text($.cookie('dateEndAdPackage'));
    }  else {
        $.cookie('dateEndAdPackage',IncrMonth(date));
    }
    
    getAdBaseInfo();
    getAdPackage();
    
    var startDate = [], endDate = [];
    if($.schedule.startDate.length > 0) {
        startDate = $.schedule.startDate;
    } else {
        startDate = ['2020-01-01'];
    }
    
    if($.schedule.endDate.length > 0) {
        endDate = $.schedule.endDate;
    } else {
        endDate = ['2020-01-01'];
    }
    
    $(".date-input").MultiCalendar({
        scheduleStart : startDate,
        scheduleEnd: endDate,
        title: '档期选择',
        totalMohth: 6,
        dayText: ['开始', '结束'],
        valueTypes: ''
    });
  
    
    $('.picker-button').click(function(){
        if($.schedule.available == 1){
            $('#date-start').text($('#checkin-date').text() || '');
            $.cookie('dateStartAdPackage',$('#date-start').text());
            $('#date-end').text($('#checkout-date').text() || '');
            $.cookie('dateEndAdPackage',$('#date-end').text());

            getSubTotal();
        }
    })
})

function getAdPackage() {
    var package = [
        {
            'shopCode' : 'OLSHOP200323000002',
            'unitCode' : '03FA101'
        },{
            'shopCode' : 'OLSHOP200802000001',
            'unitCode' : '08FA101'
        },{
            'shopCode' : 'OLSHOP200420000001',
            'unitCode' : '04FA101'
        },{
            'shopCode' : 'OLSHOP201025000005',
            'unitCode' : '03FA013'
        },{
            'shopCode' : 'OLSHOP201025000001',
            'unitCode' : 'E1FA023'
        },{
            'shopCode' : 'OLSHOP201025000004',
            'unitCode' : 'E1FA039'
        },{
            'shopCode' : 'OLSHOP201025000002',
            'unitCode' : 'E1FA030'
        },{
            'shopCode' : 'OLSHOP201025000007',
            'unitCode' : 'E1FA002'
        },{
            'shopCode' : 'OLSHOP201025000008',
            'unitCode' : 'E1FA008'
        }
    ];
   
    sessionStorage.setItem("ad_package", JSON.stringify(package));
    $.each(package, function(i,v){
        $.availableAdsUnit.push({
            'code': v.shopCode,
            'unitCode': v.unitCode
        });
        
         $.availableAdsUnitCode.push(v.unitCode);
                                    
        renderAdsList(JSON.stringify(v)); 
        getAdScheduleInfo(v.shopCode);
    });
    
    getSubTotal();
    
    if(getURLParameter('info') && getURLParameter('info') == 'done'){
        findUserCompanyByMobileNo(package[0].shopCode);
    }
}

function renderAdsList(s){
    var w = $.parseJSON(s);
    var unitDesc = '';
    var img;
    var unitCode;
    var taxAmount;
    var discountAmount;
    var frequency;
    
    $.each($.parseJSON(sessionStorage.getItem("ads")), function(k,y){
        if(w.shopCode == y.code){
            unitDesc = y.unitDescChs;
            img = y.advertisingImagesWxList[0].imagePath;
            unitCode = y.unitCode;
            taxAmount = parseFloat((y.dailyPrice*1.06).toFixed(2));
            discountAmount = parseFloat((y.dailyPrice*0.807*1.06).toFixed(2));
            frequency = y.remarkFirst;
        }
    })

    $('.page__bd').append('<div class="weui-panel" style="margin-top: 0;">\n\
        <div class="weui-panel__hd">\n\
            '+unitDesc+'\n\
        </div>\n\
        <div class="weui-panel__bd">\n\
            <div class="weui-media-box weui-media-box_appmsg" style="padding: 0 0 0 16px; margin-top: 0;">\n\
                <div class="weui-media-box__hd" style="width: 100px; height: 80px;">\n\
                    <img class="weui-media-box__thumb" src="'+img+'" alt="">\n\
                </div>\n\
                <div class="weui-media-box__bd">\n\
                    <div class="weui-form-preview__bd" style="font-size: 15px; padding: 10px 16px 16px 0;">\n\
                        <div class="weui-form-preview__item">\n\
                            <span class="weui-form-preview__value" style="text-align: left;">\n\
                                <small style="text-decoration: line-through;">原单价: ¥ '+numberWithCommas(taxAmount)+'</small>\n\
                            </span>\n\
                            <span class="weui-form-preview__value" style="text-align: left; line-height: 1;">\n\
                                套餐价: ¥ <span>'+numberWithCommas(discountAmount)+'</span> <small>/'+frequency+' (含6%税费)</small>\n\
                            </span>\n\
                            <span class="weui-form-preview__value" style="text-align: left;">\n\
                                <small style="text-decoration: line-through;">原总价: <span id="originalAmount_'+w.shopCode+'">¥ '+numberWithCommas(taxAmount)+'</span></small>\n\
                            </span>\n\
                            <span class="weui-form-preview__value" style="text-align: left;">\n\
                                <span style="color: #b43018; font-weight: bold;">¥ </span>\n\
                                <span id="totalAmount_'+w.shopCode+'" style="color: #b43018;">'+numberWithCommas(discountAmount)+'</span> \n\
                                <small>(含6%税费及20%押金)</small>\n\
                            </span>\n\
                        </div>\n\
                    </div>\n\
                </div>\n\
            </div>\n\
        </div>\n\
    </div>\n\
    ');    
}

function getAdBaseInfo() {
    var storeCode = 'OLMALL180917000003';
    if(getURLParameter('storeCode') && getURLParameter('storeCode') != 'undefined') {
        storeCode = getURLParameter('storeCode');
    }
    
    $.ajax({
        url: $.api.baseNew+"/comm-wechatol/api/advertising/base/findAllByStoreCode?storeCode="+storeCode,
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
                sessionStorage.setItem("ads", JSON.stringify(response.data));
                
                $('#confirm_price').click(function(){
                    datesAlignCheck();
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

function getAdScheduleInfo(shopCode) {
    $.ajax({
        url: $.api.baseNew+"/comm-wechatol/api/advertising/schedule/findAllByShopCode?shopCode="+shopCode,
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
                if(response.data.length > 0){
                    $.each(response.data, function(i,v){
                        var index = $.inArray(v.unitCode, $.availableAdsUnitCode);
                        if (index >= 0 && v.state == 1) {
                            $.schedule.startDate.push(v.startDate);
                            $.schedule.endDate.push(v.endDate);  
                        }
                    })
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

function checkAdSchedule() {
    var orgCode = '100001';
    if(getURLParameter('storeCode') && getURLParameter('storeCode') != 'undefined') {
        switch (getURLParameter('storeCode')) {
            case 'OLMALL190117000001':
                orgCode = '301001';
                break;
            case 'OLMALL180917000002':
                orgCode = '201001';
                break;
            case 'OLMALL180917000003':
                orgCode = '100001';
                break;
            default:
                orgCode = '100001';
                break;
        }
    }

    var advertisingScheduleList = [];
    for(var i=0; i<$.availableAdsUnit.length; i++){
        advertisingScheduleList.push({
            "endDate": $('#checkout-date').text(),
            "shopCode": $.availableAdsUnit[i].code,
            "startDate": $('#checkin-date').text(),
            "unitCode": $.availableAdsUnit[i].unitCode,
            "orgCode": orgCode
        })
    }

    var map = {
        "advertisingScheduleList": advertisingScheduleList,
        "mobileNo": $.cookie('uid'),
        "orgCode": "",
        "outTradeNo": "",
    }

    $.ajax({
        url: $.api.baseNew+"/comm-wechatol/api/advertising/schedule/check",
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
                $('.calendar-month .error').removeClass('error');
                if(response.data.returnCode == 'OK'){
                    $.schedule.available = 1;
                } else {
                    $.schedule.available = 0;
                    $('.calendar-month .cal_select span').addClass('error');
                    $('body').append('<div id="js_toast_3" style="display: none;"><div class="weui-mask_transparent"></div><div class="weui-toast"><i class="weui-icon-cancel weui-icon_toast" style="color: #FA5151;"></i><p class="weui-toast__content">'+response.data.returnMessage+'</p></div></div>');
                    var $toast = $('#js_toast_3');

                    $('.page.cell').removeClass('slideIn');

                    $toast.fadeIn(100);
                    setTimeout(function () {
                        $toast.remove();
                    }, 2000);
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

function getSubTotal() {
    var subTotal = 0;
    var subItems = 0;
   
    $.each($.parseJSON(sessionStorage.getItem("ad_package")), function(i,v){
        var rentAmount = 0;
        var deposit = 0;
        $.each($.parseJSON(sessionStorage.getItem("ads")), function(k,y){
            if(v.shopCode == y.code){
                rentAmount = y.dailyPrice;
            }
        })

        var qty = 1;
        var originalAmount = 1;
        var amount = 1;
        var result = 1;
        subItems = parseInt(subItems) + parseInt(qty);
        
        var sDate = $.cookie('dateStartAdPackage');
        var eDate = $.cookie('dateEndAdPackage');
        var sArr = sDate.split("-");
        var eArr = eDate.split("-");
        var sRDate = new Date(sArr[0], sArr[1], sArr[2]);
        var eRDate = new Date(eArr[0], eArr[1], eArr[2]);
        result = (eRDate-sRDate)/(24*60*60*1000)+1 || 1;
        $.cookie('result_adPackage',result);
        originalAmount = parseFloat((rentAmount * 1.06 * qty * result).toFixed(2));
        amount = parseFloat((rentAmount * 0.807 * 1.06 * qty * result).toFixed(2));
        deposit = parseFloat((amount*0.2).toFixed(2));
        if(deposit < 2000){
            deposit = 2000.00;
        }
        amount = parseFloat((amount+deposit).toFixed(2));
        $('#originalAmount_'+v.shopCode).text('¥ '+numberWithCommas(originalAmount.toFixed(2)));
        $('#totalAmount_'+v.shopCode).text(numberWithCommas(amount.toFixed(2)));
        subTotal = parseFloat((subTotal+amount).toFixed(2));
    })
    
    $('#subTotal').text(numberWithCommas(subTotal.toFixed(2)));
    $.cookie('subtotal_adPackage',subTotal.toFixed(2));
    $('#subQTY').text(subItems);
    $.cookie('subqty_adPackage',subItems);
    
    hideLoading();
}

function findUserCompanyByMobileNo(sc){
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
                hideLoading();
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                }
                
                if(response.data != null && response.data != ''){
                    if(response.data.name != '' && response.data.uscc != '' && response.data.name != null && response.data.uscc != null){
                        $.order.uscc = response.data.uscc;
                        $.order.company = response.data.name;
                        $.order.businessScope = response.data.businessScope;
                        saveOrder(sc);
                    }
                } else {
                    window.location.href = '/v2/improve-info?type=ads&storeCode='+getURLParameter('storeCode');
                }
            }
        }
    })
}

function saveOrder(sc){
    var orgCode = '100001';
    if(getURLParameter('storeCode') && getURLParameter('storeCode') != 'undefined') {
        switch (getURLParameter('storeCode')) {
            case 'OLMALL190117000001':
                orgCode = '301001';
                break;
            case 'OLMALL180917000002':
                orgCode = '201001';
                break;
            case 'OLMALL180917000003':
                orgCode = '100001';
                break;
            case 'OLMALL180917000001':
                orgCode = '204001';
                break;
            default:
                orgCode = '100001';
                break;
        }
    }

    var shopCode = sc;
    
    var openid = '';
    var unionid = '';
    if(sessionStorage.getItem('wechat_user_info') != undefined && sessionStorage.getItem('wechat_user_info') != null && sessionStorage.getItem('wechat_user_info') != '') {
        openid = $.parseJSON(sessionStorage.getItem("wechat_user_info")).openid;
        unionid = $.parseJSON(sessionStorage.getItem("wechat_user_info")).unionid;
    }
    /* 
     * @订单状态  
    *  合同已生成
    *  合同用印中
    *  待付款订单
    *  已完成订单
    *  已关闭订单
     */

    var outTradeNo = '10JT' + orgCode + d.getFullYear() +
            (month<10 ? '0' : '') + month +
            (day<10 ? '0' : '') + day + time
            + parseInt(Math.random()*10);

    var map = {
        "amount": 100000,
        "appid": $.api.appId,
        "openid": openid,
        "unionId": unionid,
        "brandId": "",
        "brandName": $.cookie('brand_1'),
        "code": "",
        "contractNo": "",
        "contractType": "R4",//R1租赁 R4广告 R5场地
        "mobileNo": $.cookie('uid'),
        "name": "wechatol",
        "orderStates": "合同已生成", //订单状态
        "orgCode": orgCode,
        "outTradeNo": outTradeNo,
        "payStates": "未支付", //支付状态
        "tenantId": "", //空
        "tenantName": $.order.company,
        "tenantNo": "", //空
        "tenantOrg": $.order.uscc, //uscc
        "userId": $.cookie('uid'), //手机号
        "remarkFirst": shopCode,
        "remarkSecond": 'advertising'
    };
    
    var contractInfos = [];
    var contractTermInfos = [];
    var units = ""; 
    var indexs = 0;
    var unitDesc, size, spec, frequency, amount, taxAmount, rentAmount, deposit, src;
    var sDate = $.cookie('dateStartAdPackage');
    var eDate = $.cookie('dateEndAdPackage');
    
    $.each($.parseJSON(sessionStorage.getItem("ad_package")), function(index,value){
        $.each($.parseJSON(sessionStorage.getItem("ads")), function(k,y){
            if(value.unitCode == y.unitCode){
                unitDesc = y.unitDescChs;
                size = y.size;
                spec = y.material;
                frequency = y.remarkFirst;
                amount = parseFloat((y.dailyPrice * 0.807 * $.cookie('result_adPackage') * 1.06).toFixed(2));
                taxAmount = parseFloat((y.dailyPrice * 0.807 * $.cookie('result_adPackage')).toFixed(2));
                rentAmount = parseFloat((y.dailyPrice * 0.807).toFixed(2));
                deposit = parseFloat((amount * 0.2).toFixed(2));
                if(deposit < 2000){
                    deposit = 2000.00;
                }
                
                amount = parseFloat((amount+deposit).toFixed(2));
                src = '/views/assets/base/img/content/mall/1s.jpg';
                if(y.advertisingImagesWxList != null && y.advertisingImagesWxList.length > 0){
                    src = y.advertisingImagesWxList[0].imagePath;
                }
            }
        })

        units = units + '【'+ value.unitCode + '】';

        contractInfos.push({
            "amount": amount,
            "bizScope": $.order.businessScope,
            "breachAmount": "",
            "code": value.unitCode,
            "depositAmount": deposit,
            "electricBillFlag": "1",
            "endDate": eDate,
            "enterDate": sDate,
            "isCleaning": "1",
            "isSecurity": "1",
            "isService": "1",
            "mobileNo": $.cookie('uid'),
            "name": "test name",
            "num": 1,
            "openDate": sDate,
            "orgCode": orgCode,
            "otherFlag": "",
            "outTradeNo": outTradeNo,
            "remarkFifth": "",
            "remarkFirst": src,
            "remarkFourth": "",
            "remarkSecond": frequency,
            "remarkThird": "1",
            "salesFlag": "1",
            "serviceDepositAmount": 0,
            "size": size, //广告尺寸规格
            "spec": spec,
            "startDate": sDate,
            "unitCode": value.unitCode,
            "unitDesc": unitDesc,
            "unitId": "", //uuid
            "userId": $.cookie('uid'),
            "vipFlag": "1",
            "wxCardFlag": "1",
            "area": 1, //广告默认传1
            "shopCode": value.shopCode
        })

        contractTermInfos.push({
            "amount": amount,
            "code": "1",
            "endDate": eDate,
            "name": unitDesc,
            "orgCode": orgCode,
            "outTradeNo": outTradeNo,
            "rentAmount": rentAmount,
            "startDate": sDate,
            "taxAmount": taxAmount,
            "termType": "B033",
            "termTypeName": "固定租金",
            "unitCode": value.unitCode,
            "unitId": "",
            "area": 1,
            "shopCode": value.shopCode
        })
        indexs++;

    })
        
    
    map.contractInfos = contractInfos;
    map.contractTermInfos = contractTermInfos;
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
                getOrderByTradeNO(outTradeNo,units);
            } else {
                interpretBusinessCode(response.customerMessage);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
    
}

function getOrderByTradeNO(outTradeNo,units) {
    var mallName = '上海陆家嘴正大广场';
    if(getURLParameter('storeCode') && getURLParameter('storeCode') != 'undefined') {
        switch (getURLParameter('storeCode')) {
            case 'OLMALL190117000001':
                mallName = '河南洛阳正大广场';
                break;
            case 'OLMALL180917000002':
                mallName = '上海宝山正大乐城';
                break;
            case 'OLMALL180917000003':
                mallName = '上海陆家嘴正大广场';
                break;
            case 'OLMALL180917000001':
                mallName = '上海徐汇正大乐城';
                break;
            default:
                mallName = '上海陆家嘴正大广场';
                break;
        }
    }
    
    $.ajax({
        url: $.api.baseNew+"/comm-wechatol/api/order/findAllByMobileNoAndOutTradeNo?mobileNo="+$.cookie('uid')+"&outTradeNo="+outTradeNo,
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
                generateContract(response.data.id,'订单合同已生成','您的订单【'+mallName+'】广告位置'+units+'合同已生成，请前往我的订单管理页面查看。',outTradeNo, '我的消息',units,'/v2/stamping');
            } else {
                interpretBusinessCode(response.customerMessage);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}

function generateContract(oid,a,b,c,d,e,f) {
    $.ajax({
        url: $.api.baseNew+"/comm-wechatol/api/order/generateContract?orderId="+oid+"&mobileNo="+$.cookie('uid'),
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
                
                saveMsgLog(a,b,c,d,e,f);
            } else {
                interpretBusinessCode(response.customerMessage);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}

function datesAlignCheck() {
    window.location.href = '/v2/improve-info?type=ad-package&storeCode='+getURLParameter('storeCode');
}