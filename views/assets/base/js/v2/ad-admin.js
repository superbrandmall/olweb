$.shoppingcart = new Array();

$.favorites = new Array();
$.favoritesId = new Array();

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
    getMyFavorites();
    GetAdInfo();
    
    $('.slide').swipeSlide({
        autoSwipe: true,//自动切换默认是
        speed: 3000,//速度默认4000
        continuousScroll: true,//默认否
        transitionType: 'cubic-bezier(0.22, 0.69, 0.72, 0.88)',//过渡动画linear/ease/ease-in/ease-out/ease-in-out/cubic-bezier
        lazyLoad: true//懒加载默认否
    });
    
    $('.weui-dialog__btn').on('click', function(){
        $(this).parents('.js_dialog').fadeOut(200);
    });
    
    $('#floor_plan').on('click', function(){
        $('#floor_plan_viewer').fadeIn(200);
    });
    
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
});

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
                $.cookie('startDate',result[0].label.replace("年","-") + month + ("-") + date);
                var vdate = [];
                $.each($.parseJSON(sessionStorage.getItem("ads_schedule")), function(i,v){
                    if(id.split('_')[1] == v.shopNo){
                        vdate.push(v.date);
                    }
                })
   
                for(var x=0;x<vdate.length;x++){
                    if($.inArray(sEnd, vdate) == -1){
                        if($('.date-end').val() != '' && $('.date-end').val() > DecrDate(sEnd)){
                            $d('.date-end').val(DecrDate(sEnd));
                        } else if($('.date-end').val() == '') {
                            $('.date-end').val(DecrDate(sEnd));
                        }
                        getSubTotal(id);
                        return false;
                    } else {
                        sEnd = IncrDate(sEnd);
                    }
                }
            } else if(type == 1) {
                var sStart = DecrDate(result[0].label.replace("年","-") + month + ("-") + date);
                $.cookie('endDate',result[0].label.replace("年","-") + month + ("-") + date);
                var vdate = [];
                $.each($.parseJSON(sessionStorage.getItem("ads_schedule")), function(i,v){
                    if(id.split('_')[1] == v.shopNo){
                        vdate.push(v.date);
                    }
                })
                
                for(var x=0;x<vdate.length;x++){
                    if($.inArray(sStart, vdate) == -1){
                        if($('.date-start').val() != '' && $('.date-start').val() < IncrDate(sStart)){
                            $('.date-start').val(IncrDate(sStart));
                        } else if($('.date-start').val() == '') {
                            $('.date-start').val(IncrDate(sStart));
                        }
                        getSubTotal(id);
                        return false;
                    } else {
                        sStart = DecrDate(sStart);
                    }
                    
                }
            }
        }
    })
}

function GetAdInfo(){
    var storeCode = 'OLMALL180917000003';
    var mall = 'shanghai-sbm';
    if(getURLParameter('storeCode') && getURLParameter('storeCode') != 'undefined') {
        storeCode = getURLParameter('storeCode');
        
        switch (getURLParameter('storeCode')) {
            case 'OLMALL190117000001':
                mall = 'luoyang-sbm';
                break;
            case 'OLMALL180917000002':
                mall = 'baoshan-tm';
                break;
            case 'OLMALL180917000003':
                mall = 'shanghai-sbm';
                break;
            default:
                mall = 'shanghai-sbm';
                break;
        }
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
                sessionStorage.setItem("ads", JSON.stringify(response.data) );

                $.each(response.data, function(i,v){
                    if(v.code == getURLParameter('id') && v.state != 0){
                        var src = '/views/assets/base/img/content/mall/1s.jpg';
                        if(v.advertisingImagesWxList != null && v.advertisingImagesWxList.length > 0){
                            src = v.advertisingImagesWxList[0].imagePath;
                        }
                        $('#add_ad').click(function(){
                            if($.cookie('uid') == '' || $.cookie('uid') == null){
                                window.location.href = '/v2/login?id='+getURLParameter('id')+'&type='+getURLParameter('type')+'&storeCode='+getURLParameter('storeCode');
                            } else {
                                getMyShoppingCart(v.buildingCode,getURLParameter('id'),v.storeCode,v.unitCode);
                            }
                        });
                        
                        $('#ad_shopping_cart').click(function(){
                            if($.cookie('uid') == '' || $.cookie('uid') == null){
                                window.location.href = '/v2/login?id='+getURLParameter('id')+'&type='+getURLParameter('type')+'&storeCode='+getURLParameter('storeCode');
                            } else {
                                window.location.href = '/v2/advertising-shopping-cart?type=ads&storeCode='+v.storeCode;
                            }
                        });
                        
                        $('#confirm_price').click(function(){
                            window.location.href = '/v2/improve-info?id='+getURLParameter('id')+'&type=ad&storeCode='+getURLParameter('storeCode');
                        });
                        
                        if(getURLParameter('info') && getURLParameter('info') == 'done'){
                            var src = '/views/assets/base/img/content/mall/1s.jpg';
                            if(v.advertisingImagesWxList != null && v.advertisingImagesWxList.length > 0){
                                src = v.advertisingImagesWxList[0].imagePath;
                            }
                
                            findUserCompanyByMobileNo(v.unitCode,v.code,v.size,v.material,v.unitDescChs,v.dailyPrice,src,v.remarkFirst);
                        }
                        
                        var index = $.inArray(getURLParameter('id'), $.favorites);
                        if (index >= 0) {
                            $('#favourite').html('<i class="fa fa-heart" aria-hidden="true" style="color: #f60;"></i><br>取消收藏');
                        }
                        
                        $('#favourite').click(function () {
                            if (index >= 0) {
                                removeFavorite($.favoritesId[$.inArray(getURLParameter('id'), $.favorites)], v.buildingCode, getURLParameter('id'), v.storeCode, v.unitCode);
                            } else {
                                addToFavorite(v.buildingCode, getURLParameter('id'), v.storeCode, v.unitCode);
                            }
                        })
    
                        $('#ad_name').text(v.unitDescChs|| '');
                        $('#ad_type').text(v.typeChs || '');
                        $('#ad_size').text(v.size || '');
                        $('#ad_material').text(v.material || '');
                        $('#ad_floor').text(v.floor || '');
                        $('#ad_price').text('¥ '+numberWithCommas(parseFloat((v.dailyPrice*1.06).toFixed(2))) || '');
                        $('#ad_frequency').text('/'+v.remarkFirst || '');
                        $('#ad_desc').text(v.descChs || '');
                        
                        var floor = v.remarkSecond;
                        if(floor == "B1") {
                            floor = "0";
                        }
                        
                        if(v.unitCode != null) {
                            $('#floor_plan').on('click', function(){
                                $('#map').attr({
                                    'src': '/views/assets/base/img/content/floor-plan/'+mall+'/'+floor+'F.png',
                                    'alt': floor+'F',
                                    'usemap': '#Map_'+floor+'F_s'
                                 });

                                $('#map').parent().append('<map name="Map_'+floor+'F_s" id="Map_'+floor+'F_s"></map>');

                                $('map').append('<area data-key="'+v.unitCode+'" alt="'+v.code+'" href="ad?id='+v.code+'" shape="poly" coords="'+v.coords+'" />');

                                drawShops();
                            });
                        }

                        $.each(v.advertisingImagesWxList, function(j,w){
                            $('.slide ul').append('<li><a href="javascript:;"><img src='+w.imagePath+' alt=""></a></li>');
                        });

                        $('#vr').click(function () {
                            showVR(v.vr);
                        })
                        return false; 
                    }
                    
                });
                
                var quantity = 0;
                $.each(response.data, function(i,v){
                    if(v.code == getURLParameter('id') && v.state != 0){
                        quantity = quantity + 1;
                    }
                })
                
                var style = '';
                if(quantity == 1){
                    style = " display: none;";
                }
    
                $('#ad_price_frequency').append('<div class="weui-cell__ft" style="float: right;">\n\
                    <div class="weui-count">\n\
                        <a class="weui-count__btn weui-count__decrease"></a>\n\
                        <input id="qty_'+getURLParameter('id')+'" class="weui-count__number" type="number" value="1" min="0" max="'+quantity+'" readonly />\n\
                        <a class="weui-count__btn weui-count__increase" style="'+style+'"></a>\n\
                    </div>\n\
                </div>');
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
    var rentAmount = 0;
    $.each($.parseJSON(sessionStorage.getItem("ads")), function(i,v){
        if(getURLParameter('id') == v.code){
            rentAmount = parseFloat((v.dailyPrice*1.06).toFixed(2));
        }
    })
            
    var qty = 1;
    var amount = 1;
    var result = 1;
    
    qty = $('.weui-count__number').val();

    var sDate = $('#dateStart_'+getURLParameter('id')).val();
    var eDate =  $('#dateEnd_'+getURLParameter('id')).val();
    var sArr = sDate.split("-");
    var eArr = eDate.split("-");
    var sRDate = new Date(sArr[0], sArr[1], sArr[2]);
    var eRDate = new Date(eArr[0], eArr[1], eArr[2]);
    result = (eRDate-sRDate)/(24*60*60*1000) || 1;
    amount = rentAmount * qty * result;
    subTotal = amount;
    subItems = qty;
    
    $('#subTotal').text(numberWithCommas(subTotal.toFixed(2)));
    $.cookie('subtotal',subTotal.toFixed(2));
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
                    window.location.href = '/v2/improve-info?id='+getURLParameter('id')+'&type=ad&storeCode='+getURLParameter('storeCode');
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
            "endDate": $.cookie('endDate'),
            "enterDate": $.cookie('startDate'),
            "isCleaning": "1",
            "isSecurity": "1",
            "isService": "1",
            "mobileNo": $.cookie('uid'),
            "name": "test name",
            "num": 1,
            "openDate": $.cookie('startDate'),
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
            "startDate": $.cookie('startDate'),
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
            "endDate": $.cookie('endDate'),
            "name": unitDesc,
            "orgCode": orgCode,
            "outTradeNo": outTradeNo,
            "rentAmount": parseFloat((dailyPrice*1.06).toFixed(2)),
            "startDate": $.cookie('startDate'),
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

function drawShops(){
    var areas = $.map($('area'),function(el) {
        if(getURLParameter('id') === $(el).attr('alt')){
            return { 
                key: $(el).attr('data-key'),
                toolTip: "本场地",
                fillColor: 'e12330',
                fillOpacity: 1,
                stroke: false,
                selected: true 
            };
        } else {
            return { 
                key: $(el).attr('data-key'),
                fillColor: 'ffff00',
                fillOpacity: 1,
                stroke: false,
                selected: true 
            };
        }
    });

    $('#map').mapster({
        fillColor: 'AFBEDE',
        fillOpacity: 0.8,
        strokeColor: 'ffd62c',
        strokeWidth: 0,
        clickNavigate: false,
        mapKey: 'data-key',
        showToolTip: true,
        areas:  areas,
        onShowToolTip: function () {
            $(".mapster_tooltip").css({
                "font-weight": "bold",
                "color": "#fff",
                "background": "rgba(0,0,0,0.8)",
                "font-size": "26px",
                "width": "auto"
            });

            $("area").on("mouseenter",  function (data) {
               xOffset = data.pageX;
               yOffset = data.pageY;
               $(".mapster_tooltip").css("left", xOffset);
               $(".mapster_tooltip").css("top", yOffset);
            });
        }
    });
    
    addLogoLayer();
    $('#floor_plan_viewer').fadeIn(200);
}

function addLogoLayer(){
    $('map area').each(function(i,elem){
        if($(this).attr('data-area') > 100 && $(this).attr('data-logo') != null && $(this).attr('data-logo') != 'null' && $(this).attr('data-logo') != ''){
            var pos;
            pos = $(this).attr('coords').split(',');
            var x = 0;
            var posLeftMin = parseInt(pos[0]), posLeftMax = parseInt(pos[0]), width, height;
            while(x < pos.length){
                if(parseInt(pos[x]) < posLeftMin){
                    posLeftMin = parseInt(pos[x]);
                } 

                if(parseInt(pos[x]) > posLeftMax){
                    posLeftMax = parseInt(pos[x]);
                }
                x = x + 2;
            }
            width = parseInt(posLeftMax - posLeftMin - 10);             

            var y = 1;
            var posTopMin = parseInt(pos[1]), posTopMax = parseInt(pos[1]);
            while(y < pos.length){
                if(parseInt(pos[y]) < posTopMin){
                    posTopMin = parseInt(pos[y]);
                }
                if(parseInt(pos[y]) > posTopMax){
                    posTopMax = parseInt(pos[y]);
                }
                y = y + 2;
            }

            height = parseInt(posTopMax - posTopMin - 10);

            var spanid = 'span_'+$(this).attr('data-key');
            $('#mapster_wrap_0').append(
                '<img id="'+spanid+'" src="https://ol.superbrandmall.com/views/assets/base/img/content/client-logos/web/'+$(this).attr('data-logo')+'" style="position:absolute;line-height:1;text-align:center;" />'
            );
            resetLogoSize(spanid,width,height,20,60,posLeftMin,posTopMin);
        }
    })
}

function resetLogoSize(spanid, maxWidth, maxHeight, minSize, maxSize, posLeftMin, posTopMin) {
    var divLogo = $('#'+spanid);
    for (var i = minSize; i < maxSize; i++) {
        if ($(divLogo).width() > maxWidth || $(divLogo).height() > maxHeight) {
            $(divLogo).css({
                'max-width': i + 'px',
                'max-height': maxHeight,
                'left': parseInt(posLeftMin - ($(divLogo).width() - maxWidth) / 4.7) + 'px',
                'top': parseInt(posTopMin - ($(divLogo).height() - maxHeight) / 3.5) + 'px'  
            }); 
                break;
        } else {
            $(divLogo).css({
                'max-height': i + 'px',
                'max-width': maxWidth,
                'left': parseInt(posLeftMin - ($(divLogo).width() - maxWidth) / 4.7) + 'px',
                'top': parseInt(posTopMin - ($(divLogo).height() - maxHeight) / 3.5) + 'px'
            });
        }
    }
}

function getMyShoppingCart(bc,c,sc,uc){
    $.ajax({
        url: $.api.baseNew+"/comm-wechatol/api/user/favorites/wx/findAllByMobileNo?mobileNo="+$.cookie('uid'),
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
                if(response.data.length > 0) {
                    $.each(response.data, function(i,v){
                        if(v.remarkSecond == 1 && v.unitType == 'shopping-cart'){
                            $.shoppingcart.push(v.remarkFirst);
                        }
                    });
                   
                    var index = $.inArray(c, $.shoppingcart);
                    if(index >= 0){
                        showToast();
                    } else {
                        addToShoppingCart(bc,c,sc,uc);
                    }
                } else {
                    addToShoppingCart(bc,c,sc,uc);
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

function addToShoppingCart(bc,c,sc,uc){
    var map = {
        "buildingCode": bc,
        "code": "",
        "favoritesDate": "",
        "mobileNo": $.cookie('uid'),
        "name": "",
        "remarkFifth": "",
        "remarkFirst": c,
        "remarkFourth": "",
        "remarkSecond": 1,
        "remarkThird": "",
        "storeCode": sc,
        "unitCode": uc,
        "unitType": "shopping-cart",
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
                
                showToast();
            } else {
                interpretBusinessCode(response.customerMessage);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}

function showToast() {
    $('body').append('<div id="toast" style="display: none;">\n\
<div class="weui-mask_transparent"></div>\n\
<div class="weui-toast"><i class="weui-icon-success-no-circle weui-icon_toast"></i>\n\
<p class="weui-toast__content">加入购物车成功</p>\n\
</div></div>');
    
    $toast = $('#toast');
    
    if ($toast.css('display') != 'none') return;

    $toast.fadeIn(100);
    setTimeout(function () {
        $toast.fadeOut(100);
        $toast.remove();
    }, 2000);  
}

function getMyFavorites() {
    $.ajax({
        url: $.api.baseNew + "/comm-wechatol/api/user/favorites/wx/findAllByMobileNo?mobileNo=" + $.cookie('uid'),
        type: "GET",
        async: false,
        dataType: "json",
        contentType: "application/json",
        beforeSend: function (request) {
            request.setRequestHeader("Lang", $.cookie('lang'));
            request.setRequestHeader("Source", "onlineleasing");
        },
        complete: function () {},
        success: function (response, status, xhr) {
            if (response.code === 'C0') {
                $.each(response.data, function (i, v) {
                    if (v.remarkSecond == 1 && v.unitType == 'ads') {
                        $.favorites.push(v.remarkFirst);
                        $.favoritesId.push(v.id);
                    }
                });
            } else {
                interpretBusinessCode(response.customerMessage);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
        }
    });
}

function addToFavorite(bc, c, sc, uc) {
    var map = {
        "buildingCode": bc,
        "code": "",
        "favoritesDate": "",
        "mobileNo": $.cookie('uid'),
        "name": "",
        "remarkFifth": "",
        "remarkFirst": c,
        "remarkFourth": "",
        "remarkSecond": 1,
        "remarkThird": "",
        "storeCode": sc,
        "unitCode": uc,
        "unitType": "ads",
    }

    $.ajax({
        url: $.api.baseNew + "/comm-wechatol/api/user/favorites/wx/saveOrUpdate",
        type: "POST",
        data: JSON.stringify(map),
        async: false,
        dataType: "json",
        contentType: "application/json",
        beforeSend: function (request) {
            showLoading();
            request.setRequestHeader("Login", $.cookie('login'));
            request.setRequestHeader("Authorization", $.cookie('authorization'));
            request.setRequestHeader("Lang", $.cookie('lang'));
            request.setRequestHeader("Source", "onlineleasing");
        },
        complete: function () {},
        success: function (response, status, xhr) {
            if (response.code === 'C0') {
                hideLoading();
                if (xhr.getResponseHeader("Authorization") !== null) {
                    $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                }

                var $toast = $('#js_toast_1');
                $('.page.cell').removeClass('slideIn');

                $toast.fadeIn(100);
                setTimeout(function () {
                    location.reload();
                }, 2000);

            } else {
                interpretBusinessCode(response.customerMessage);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
        }
    });
}

function removeFavorite(id, bc, c, sc, uc) {
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
        "unitType": "event"
    }

    $.ajax({
        url: $.api.baseNew + "/comm-wechatol/api/user/favorites/wx/saveOrUpdate",
        type: "POST",
        data: JSON.stringify(map),
        async: false,
        dataType: "json",
        contentType: "application/json",
        beforeSend: function (request) {
            showLoading();
            request.setRequestHeader("Login", $.cookie('login'));
            request.setRequestHeader("Authorization", $.cookie('authorization'));
            request.setRequestHeader("Lang", $.cookie('lang'));
            request.setRequestHeader("Source", "onlineleasing");
        },
        complete: function () {},
        success: function (response, status, xhr) {
            if (response.code === 'C0') {
                hideLoading();
                if (xhr.getResponseHeader("Authorization") !== null) {
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
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
        }
    });
}