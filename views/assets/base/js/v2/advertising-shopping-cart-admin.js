$.order = {
    copy: "",
    uscc: "",
    company: ""
};

var d = new Date();
var month = d.getMonth()+1;
var day = d.getDate();
var time = d.getTime();
var date = d.getFullYear() + '-' +
    (month<10 ? '0' : '') + month + '-' +
    (day<10 ? '0' : '') + day;

$(document).ready(function(){
    getAdBaseInfo();
    getAdScheduleInfo();
    getShoppingCart();
    
    //开始日期
    $('.date-start').on('focus', function () {
        var dt = new Date();
        var id=dt.getFullYear()+""+dt.getMonth() +""+dt.getDate()+""+dt.getHours()+""+ dt.getMinutes()+""+dt.getSeconds();
        var startD = $(this).attr('id');
        weui.datePicker({
            id: "start"+id,
            start: formatTime(date_n),
            end: "2020-12-31",
            cron: '* * *',
            defaultValue: [dt.getFullYear(),dt.getMonth()+1,dt.getDate()],
            depth: 2,
            onConfirm: function (result) {
                var month = result[1].value < 10 ? '0'+result[1].value : result[1].value;
                var dates = '';
                $.each($.parseJSON(sessionStorage.getItem("ads_schedule")), function(i,v){
                    if(startD.split('_')[1] == v.shopNo && month == v.date.split('-')[1]){
                        dates = dates + v.date.split('-')[2] + ',';
                    }
                })
                dates = dates.substring(0,dates.length-1);
                // 二级调用：日期
                $('.ma_expect_month_picker .weui-picker').on('animationend webkitAnimationEnd', function() {
                    showExpectDatePicker(result,startD,dates,0);
                })
            },
            className: 'ma_expect_month_picker'
        });
    });
    
    //结束日期
    $('.date-end').on('focus', function () {
        var dt = new Date();
        var id = dt.getFullYear() + "" + dt.getMonth() + "" + dt.getDate() + "" + dt.getHours() + "" + dt.getMinutes() + "" + dt.getSeconds();

        var endD = $(this).attr('id');
        weui.datePicker({
            id: "end" + id,
            start: formatTime(date_n),
            end: "2020-12-31",
            defaultValue: [dt.getFullYear(),dt.getMonth()+1,dt.getDate()],
            depth: 2,
            onConfirm: function (result) {
                var month = result[1].value < 10 ? '0'+result[1].value : result[1].value;
                var dates = '';
                $.each($.parseJSON(sessionStorage.getItem("ads_schedule")), function(i,v){
                    if(endD.split('_')[1] == v.shopNo && month == v.date.split('-')[1]){
                        dates = dates + v.date.split('-')[2] + ',';
                    }
                })
                dates = dates.substring(0,dates.length-1);
                // 二级调用：日期
                $('.ma_expect_month_picker .weui-picker').on('animationend webkitAnimationEnd', function() {
                    showExpectDatePicker(result,endD,dates,1);
                })
            },
            className: 'ma_expect_month_picker'
        });
    });
    
    $('.weui-count__decrease').click(function (e) {
        var $input = $(e.currentTarget).parent().find('.weui-count__number');
        var number = parseInt($input.val() || "0") - 1;
        if (number < $(this).parent().find('.weui-count__number').attr('min')) number = $(this).parent().find('.weui-count__number').attr('min');
        $input.val(number);
        if(number == 0){
            $(this).hide();
            $(this).parent().find('.weui-count__increase').show();
        } else if(number < $(this).parent().find('.weui-count__number').attr('max')){
            $(this).parent().find('.weui-count__increase').show();
        }
        getSubTotal();
    })
    $('.weui-count__increase').click(function (e) {
        var $input = $(e.currentTarget).parent().find('.weui-count__number');
        var number = parseInt($input.val() || "0") + 1;
        if (number > $(this).parent().find('.weui-count__number').attr('max')) number = $(this).parent().find('.weui-count__number').attr('max');
        $input.val(number);
        if(number == $(this).parent().find('.weui-count__number').attr('max')){
            $(this).hide();
            $(this).parent().find('.weui-count__decrease').show();
        } else if(number >   $(this).parent().find('.weui-count__number').attr('min')){
            $(this).parent().find('.weui-count__decrease').show();
        }
        getSubTotal();
    });
    
    $("#check_all").click(function () {
        if($(this).prop("checked")) {
            $("input:checkbox[name='check_items']").prop("checked",true);      
        } else {
            $("input:checkbox[name='check_items']").prop("checked",false);
        }
        getSubTotal();
    });
    
    $(".weui-panel .weui-check").each(function(){
        $(this).click(function(){
            getSubTotal();
        })
    })
})

function showExpectDatePicker(month,id,dates,type) {
    weui.datePicker({
        cron: dates+' '+month[1].value+' *',
        start: '2020-'+(month[1].value < 10 ? '0'+month[1].value : month[1].value)+'-01',
        end: '2020-12-31',
        depth: 3,
        onConfirm: function (result) {
            var month = result[1].label.replace("月","");
            if(month < 10) {
                month = "0"+month;
            }

            var date = result[2].label.replace("日","");
            if(date < 10) {
                date = "0"+date;
            }

            $('#'+id).val(result[0].label.replace("年","-") + month + ("-") + date);
            if(type == 0){
                var sEnd = IncrDate(result[0].label.replace("年","-") + month + ("-") + date);
                $.cookie('sEnd',sEnd);
                
                $(".date-start").each(function(){
                    if($(this).val() == '') {
                        $(this).val(result[0].label.replace("年","-") + month + ("-") + date);
                    }
                })
                
                var vdate = [];
                $.each($.parseJSON(sessionStorage.getItem("ads_schedule")), function(i,v){
                    if(id.split('_')[1] == v.shopNo){
                        vdate.push(v.date);
                    }
                })
                
                for(var x=0;x<vdate.length;x++){
                    if($.inArray(sEnd, vdate) == -1){
                        if($('#'+id).parent().parent().parent().find('.date-end').val() != '' && $('#'+id).parent().parent().parent().find('.date-end').val() > DecrDate(sEnd)){
                            $('#'+id).parent().parent().parent().find('.date-end').val(DecrDate(sEnd));
                        } else if($('#'+id).parent().parent().parent().find('.date-end').val() == '') {
                            $('#'+id).parent().parent().parent().find('.date-end').val(DecrDate(sEnd));
                        }
                        
                        $(".date-end").each(function(){
                            if($(this).val() == '') {
                                $(this).val(DecrDate(sEnd));
                            }
                        })
                
                        getSubTotal();
                        return false;
                    } else {
                        sEnd = IncrDate(sEnd);
                    }
                }
            } else if(type == 1){
                var sStart = DecrDate(result[0].label.replace("年","-") + month + ("-") + date);
                $.cookie('sStart',sStart);
                
                $(".date-end").each(function(){
                    if($(this).val() == '') {
                        $(this).val(result[0].label.replace("年","-") + month + ("-") + date);
                    }
                })
                
                var vdate = [];
                $.each($.parseJSON(sessionStorage.getItem("ads_schedule")), function(i,v){
                    if(id.split('_')[1] == v.shopNo){
                        vdate.push(v.date);
                    }
                })
                
                for(var x=0;x<vdate.length;x++){
                    if($.inArray(sStart, vdate) == -1){
                        if($('#'+id).parent().parent().parent().find('.date-start').val() != '' && $('#'+id).parent().parent().parent().find('.date-start').val() < IncrDate(sStart)){
                            $('#'+id).parent().parent().parent().find('.date-start').val(IncrDate(sStart));
                        } else if($('#'+id).parent().parent().parent().find('.date-start').val() == '') {
                            $('#'+id).parent().parent().parent().find('.date-start').val(IncrDate(sStart));
                        }
                        
                        $(".date-start").each(function(){
                            if($(this).val() == '') {
                                $(this).val(IncrDate(sStart));
                            }
                        })
                
                        getSubTotal();
                        return false;
                    } else {
                        sStart = DecrDate(sStart);
                    }
                }
                
            }
        }
    })
}

function getShoppingCart() {
    $.ajax({
        url: $.api.baseNew+"/comm-wechatol/api/user/favorites/wx/findAllByMobileNo?mobileNo="+$.cookie('uid'),
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
                    $('.page__bd').html('');
                    
                    sessionStorage.setItem("shopping_cart_terms", JSON.stringify(response.data));
                    
                    $.each(response.data, function(i,v){
                        if(v.unitType == 'shopping-cart'){
                            renderAdsList(JSON.stringify(v));
                        }
                    });
                    
                    getSubTotal();
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

function renderAdsList(s){
    var w = $.parseJSON(s);
    var unitDesc = '';
    var quantity = 0;
    var type;
    var img;
    var unitCode;
    var taxAmount;
    var frequency;
    
    $.each($.parseJSON(sessionStorage.getItem("ads")), function(k,y){
        if(w.remarkFirst == y.code){
            unitDesc = y.unitDescChs;
            quantity = quantity + 1;
            type = y.typeChs;
            img = y.advertisingImagesWxList[0].imagePath;
            unitCode = y.unitCode;
            taxAmount = parseFloat((y.dailyPrice*1.06).toFixed(2));
            frequency = y.remarkFirst;
        }
    })

    var style = '';
    if(quantity == 1){
        style = " display: none;";
    }

    $('.page__bd').append('<div class="weui-panel" style="margin-top: 0;">\n\
        <div class="weui-panel__hd">\n\
            '+unitDesc+'\n\
        </div>\n\
        <div class="weui-panel__bd">\n\
            <div class="weui-media-box weui-media-box_appmsg weui-cells weui-cells_checkbox" style="padding-top: 0; padding-bottom: 0; margin-top: 0;">\n\
                <label class="weui-cell weui-cell_active weui-check__label" for="check_'+w.remarkFirst+'" style="padding: 0;">\n\
                    <div class="weui-cell__hd">\n\
                        <input type="checkbox" class="weui-check" name="check_items" id="check_'+w.remarkFirst+'" checked="checked">\n\
                        <i class="weui-icon-checked"></i>\n\
                    </div>\n\
                    <div class="weui-media-box__hd" style="width: 100px; height: 80px;">\n\
                        <img class="weui-media-box__thumb" src="'+img+'" alt="">\n\
                    </div>\n\
                </label>\n\
                <div class="weui-media-box__bd">\n\
                    <div class="weui-form-preview__bd" style="font-size: 15px;">\n\
                        <div class="weui-form-preview__item">\n\
                            <span class="weui-form-preview__value" style="text-align: left;">'+type+'</span>\n\
                            <span class="weui-form-preview__value">\n\
                                <div class="weui-cell__bd">\n\
                                    <input class="weui-input date-start" id="dateStart_'+w.remarkFirst+'" placeholder="填写档期起始日" readonly>\n\
                                </div>\n\
                            </span>\n\
                            <span class="weui-form-preview__value">\n\
                                <div class="weui-cell__bd">\n\
                                    <input class="weui-input date-end" id="dateEnd_'+w.remarkFirst+'" placeholder="填写档期终止日" readonly>\n\
                                </div>\n\
                            </span>\n\
                        </div>\n\
                    </div>\n\
                </div>\n\
            </div>\n\
            <div class="weui-cell">\n\
                <div class="weui-cell__bd">\n\
                    <p><span style="color: #b43018; font-weight: bold;">¥ </span><span id="taxAmount_'+w.remarkFirst+'" style="color: #b43018; font-size: 18px; font-weight: bold;">'+numberWithCommas(taxAmount)+'</span><small>/'+frequency+' (含6%税费)</small></p>\n\
                </div>\n\
                <div class="weui-cell__ft">\n\
                    <div class="weui-count">\n\
                        <a class="weui-count__btn weui-count__decrease"></a>\n\
                        <input id="qty_'+w.unitCode+'" class="weui-count__number" type="number" value="1" min="0" max="'+quantity+'" readonly />\n\
                        <a class="weui-count__btn weui-count__increase" style="'+style+'"></a>\n\
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
                
                var src = '/views/assets/base/img/content/mall/1s.jpg';
                if(response.data[0].advertisingImagesWxList != null && response.data[0].advertisingImagesWxList.length > 0){
                    src = response.data[0].advertisingImagesWxList[0].imagePath;
                }
                                
                if(getURLParameter('info') && getURLParameter('info') == 'done'){
                    findUserCompanyByMobileNo(response.data[0].unitCode,response.data[0].code,response.data[0].size,response.data[0].material,response.data[0].unitDescChs,response.data[0].dailyPrice,src,response.data[0].remarkFirst);
                }
                
                $('#confirm_price').click(function(){
                    window.location.href = '/v2/improve-info?type=ads&storeCode='+getURLParameter('storeCode');
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

function getAdScheduleInfo() {
    var storeCode = 'OLMALL180917000003';
    if(getURLParameter('storeCode') && getURLParameter('storeCode') != 'undefined') {
        storeCode = getURLParameter('storeCode');
    }
    
    $.ajax({
        url: $.api.baseNew+"/comm-wechatol/api/shop/schedule/findAllByStoreCodeAndEnable?storeCode="+storeCode+"&enable=1",
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
                var adsSchedule = [];
                $.each(response.data, function(i,v){
                    if(v.unitType == 'ADS'){
                        adsSchedule.push(v);
                    }
                });
                
                sessionStorage.setItem("ads_schedule", JSON.stringify(adsSchedule));
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
    $.each($.parseJSON(sessionStorage.getItem("shopping_cart_terms")), function(i,v){
        if(v.unitType == 'shopping-cart'){ 
            var rentAmount = 0;
            $.each($.parseJSON(sessionStorage.getItem("ads")), function(k,y){
                if(v.remarkFirst == y.code){
                    rentAmount = parseFloat((y.dailyPrice*1.06).toFixed(2));
                }
            })

            var code;
            var qty = 1;
            var amount = 1;
            var result = 1;
            $(".weui-panel .weui-check").each(function(){
                if($(this).prop("checked")) {
                    code = $(this).attr('id').split('_')[1];
                    if(code == v.remarkFirst){
                        qty = $(this).parents('.weui-panel__bd').find('.weui-count__number').val();

                        var sDate = $('#dateStart_'+code).val();
                        var eDate =  $('#dateEnd_'+code).val();
                        var sArr = sDate.split("-");
                        var eArr = eDate.split("-");
                        var sRDate = new Date(sArr[0], sArr[1], sArr[2]);
                        var eRDate = new Date(eArr[0], eArr[1], eArr[2]);
                        result = (eRDate-sRDate)/(24*60*60*1000) || 1;
                        amount = rentAmount * qty * result;
                        subTotal = subTotal + amount;
                        subItems = parseInt(subItems) + parseInt(qty);
                    }
                }
            })
        }
    })
    
    $('#subTotal').text(numberWithCommas(subTotal.toFixed(2)));
    $.cookie('subtotal',subTotal.toFixed(2));
    $('#subQTY').text(subItems);
    $.cookie('subqty',subItems);
}

function findUserCompanyByMobileNo(ut,sc,sz,sp,ud,pr,img,un){
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
                
                if(response.data.length > 0){
                    if(response.data[0].name != '' && response.data[0].uscc != '' && response.data[0].name != null && response.data[0].uscc != null){
                        $.order.uscc = response.data[0].uscc;
                        $.order.company = response.data[0].name;
                        saveOrder(ut,sc,sz,sp,ud,pr,img,un);
                    }
                } else {
                    window.location.href = '/v2/improve-info?type=ads&storeCode='+getURLParameter('storeCode');
                }
            }
        }
    })
}

function saveOrder(ut,sc,sz,sp,ud,pr,img,un){
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
    
    var unit = ut;
    var shopCode = sc;
    var size = sz;
    var spec = sp;
    var unitDesc = ud;
    var dailyPrice = pr;
    var firstImage = img;
    var unitName = un;
        
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
        "appid": "test",
        "brandId": "",
        "brandName": $.cookie('brand_1'),
        "code": unit,
        "contractInfos": [
          {
            "amount": $.cookie('subtotal'),
            "bizScope": "testss",
            "breachAmount": "",
            "code": unit,
            "depositAmount": parseFloat(($.cookie('subtotal')*0.2).toFixed(2)),
            "electricBillFlag": "1",
            "endDate": $.cookie('sEnd'),
            "enterDate": $.cookie('sStart'),
            "isCleaning": "1",
            "isSecurity": "1",
            "isService": "1",
            "mobileNo": $.cookie('uid'),
            "name": "test name",
            "num": 1,
            "openDate": $.cookie('sStart'),
            "orgCode": orgCode,
            "otherFlag": "",
            "outTradeNo": outTradeNo,
            "remarkFifth": "",
            "remarkFirst": firstImage,
            "remarkFourth": "",
            "remarkSecond": unitName,
            "remarkThird": $.cookie('subqty'),
            "salesFlag": "1",
            "serviceDepositAmount": 3000,
            "size": size, //广告尺寸规格
            "spec": spec,
            "startDate": $.cookie('sStart'),
            "unitCode": unit,
            "unitDesc": unitDesc,
            "unitId": "sfsdfsfasfsfasdfasdf",
            "userId": "10000101",
            "vipFlag": "1",
            "wxCardFlag": "1",
            "area": 1 //广告默认传1
          }
        ],
        "contractNo": "",
        "contractTermInfos": [
          {
            "amount": $.cookie('subtotal'),
            "code": "1",
            "endDate": $.cookie('sEnd'),
            "name": unitDesc,
            "orgCode": orgCode,
            "outTradeNo": outTradeNo,
            "rentAmount": parseFloat((dailyPrice*1.06).toFixed(2)),
            "startDate": $.cookie('sStart'),
            "taxAmount": dailyPrice,
            "termType": "B103",
            "termTypeName": "固定租金",
            "unitCode": unit,
            "unitId": "sfsdfsfasfsfasdfasdf",
            "area": 1,
            "remarkFirst": shopCode
          }
        ],
        "contractType": "R4",//R1租赁 R4广告 R5场地
        "mobileNo": $.cookie('uid'),
        "name": "wechatol",
        "orderStates": "合同已生成", //订单状态
        "orgCode": orgCode,
        "outTradeNo": outTradeNo,
        "payStates": "未支付", //支付状态
        "tenantId": "海鼎公司uuid",
        "tenantName": $.order.company,
        "tenantNo": "海鼎公司编号",
        "tenantOrg": $.order.uscc, //uscc
        "userId": "sfsdfsfasfsfasdfasdf",
        "remarkFirst": shopCode,
        "remarkSecond": 'advertising'
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
                getOrderByTradeNO(outTradeNo,unit);
            } else {
                interpretBusinessCode(response.customerMessage);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
    
}

function getOrderByTradeNO(outTradeNo,unit) {
    var mallName = '陆家嘴正大广场';
    if(getURLParameter('storeCode') && getURLParameter('storeCode') != 'undefined') {
        switch (getURLParameter('storeCode')) {
            case 'OLMALL190117000001':
                mallName = '洛阳国际广场';
                break;
            case 'OLMALL180917000002':
                mallName = '宝山正大乐城';
                break;
            case 'OLMALL180917000003':
                mallName = '陆家嘴正大广场';
                break;
            default:
                mallName = '陆家嘴正大广场';
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
                generateContract(response.data.id,'订单合同已生成','您的订单【'+mallName+'】广告单元【'+unit+'】合同已生成，请前往我的订单管理页面查看。',outTradeNo, '我的消息',unit,'/v2/stamping');
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

function removeFavorite(id,bc,c,sc,uc){
    var map = {
        "id": id,
        "buildingCode": bc,
        "code": "",
        "favoritesDate": "",
        "mobileNo": $.cookie('uid'),
        "name": "",
        "remarkFifth": "",
        "remarkFirst": c,
        "remarkFourth": "",
        "remarkSecond": 0,
        "remarkThird": "",
        "storeCode": sc,
        "unitCode": uc,
        "unitType": "leasing"
    }
    
    $.ajax({
        url: $.api.baseNew+"/comm-wechatol/api/user/favorites/wx/saveOrUpdate",
        type: "POST",
        data: JSON.stringify(map),
        async: false,
        dataType: "json",
        contentType: "application/json",
        beforeSend: function(request) {
            showLoading();
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
                
                var $toast = $('#js_toast_2');
                $('.page.cell').removeClass('slideIn');

                $toast.fadeIn(100);
                setTimeout(function () {
                    location.reload();
                }, 2000);
    
            } else {
                interpretBusinessCode(response.customerMessage);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}