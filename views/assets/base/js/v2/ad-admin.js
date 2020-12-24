$.shoppingcart = new Array();

$.favorites = new Array();
$.favoritesId = new Array();
$.updateFavorites = new Array();
$.updateFavoritesId = new Array();

$.availableAdsUnit = new Array();

$.schedule = {
    startDate: [],
    endDate: [],
    unit: [],
    available: 1,
    multiple: 0
}

$.order = {
    copy: "",
    uscc: "",
    company: "",
    businessScope: ""
};

var d = new Date();
var month = d.getMonth()+1;
var day = d.getDate();
var time = d.getTime();
var date = d.getFullYear() + '-' +
    (month<10 ? '0' : '') + month + '-' +
    (day<10 ? '0' : '') + day;
    
$(document).ready(function(){
    if($.cookie('uid') != '' && $.cookie('uid') != null){
        getMyFavorites();
    }
    
    GetAdInfo();
    getAdScheduleInfo();
    
    if($.cookie('dateStart_'+getURLParameter('id')) != '' && $.cookie('dateStart_'+getURLParameter('id')) != null){
        $('.date-start').val($.cookie('dateStart_'+getURLParameter('id')));
    }
    
    if($.cookie('dateEnd_'+getURLParameter('id')) != '' && $.cookie('dateEnd_'+getURLParameter('id')) != null){
        $('.date-end').val($.cookie('dateEnd_'+getURLParameter('id')));
    }
    
    if($.cookie('result_'+getURLParameter('id')) != '' && $.cookie('result_'+getURLParameter('id')) != null){
        $('#days').text($.cookie('result_'+getURLParameter('id'))+'天');
    }
    
    if($.cookie('deposit_'+getURLParameter('id')) != '' && $.cookie('deposit_'+getURLParameter('id')) != null){
        $('#deposit').text('¥'+numberWithCommas($.cookie('deposit_'+getURLParameter('id'))));
    }
    
    if($.cookie('subTotal_'+getURLParameter('id')) != '' && $.cookie('subTotal_'+getURLParameter('id')) != null){
        $('#subTotal').text('¥'+numberWithCommas($.cookie('subTotal_'+getURLParameter('id'))));
    }

    if($.cookie('subqty_'+getURLParameter('id')) != '' && $.cookie('subqty_'+getURLParameter('id')) != null){
        $('#qty_'+getURLParameter('id')).val($.cookie('subqty_'+getURLParameter('id')));
        if($.cookie('subqty_'+getURLParameter('id')) == 0){
            $('.weui-count__decrease').hide();
        }
        
        if($.cookie('maxqty_'+getURLParameter('id')) != '' && $.cookie('maxqty_'+getURLParameter('id')) != null){
            $('#qty_'+getURLParameter('id')).attr('max',$.cookie('maxqty_'+getURLParameter('id')));
            if($.cookie('subqty_'+getURLParameter('id')) == $.cookie('maxqty_'+getURLParameter('id'))){
                $('.weui-count__increase').hide();
            }
        }
    }
    
    $('.weui-dialog__btn').on('click', function(){
        $(this).parents('.js_dialog').fadeOut(200);
    });
    
    $('#floor_plan').on('click', function(){
        $('#floor_plan_viewer').fadeIn(200);
    });

    if($.schedule.multiple == 0) {
        $('.date-start, .date-end').MultiCalendar({
            scheduleStart : $.schedule.startDate,
            scheduleEnd: $.schedule.endDate,
            title: '档期选择',
            totalMohth: 6,
            dayText: ['开始', '结束'],
            valueTypes: ''
        });
    } else {
        $('.date-start, .date-end').MultiCalendar({
            scheduleStart : ['2020-01-01'],
            scheduleEnd: ['2020-01-01'],
            title: '档期选择',
            totalMohth: 6,
            dayText: ['开始', '结束'],
            valueTypes: ''
        });
    }
    
    $('.picker-button').click(function(){
        if($.schedule.available == 1){
            $('.date-start').val($('#checkin-date').text() || '');
            $.cookie('dateStart_'+getURLParameter('id'),$('.date-start').val());
            $('.date-end').val($('#checkout-date').text() || '');
            $.cookie('dateEnd_'+getURLParameter('id'),$('.date-end').val());

            getSubTotal();
        }
    })
    
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
            case 'OLMALL180917000001':
                mall = 'xuhui-tm';
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
                        $.availableAdsUnit.push(v.unitCode);
                    }
                })
                
                if($.availableAdsUnit.length > 1){
                    $.schedule.multiple = 1;
                }
                
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
                
                            findUserCompanyByMobileNo(v.unitCode,v.code,v.size,v.material);
                        }
                        
                        var index = $.inArray(getURLParameter('id'), $.favorites);
                        if (index >= 0) {
                            $('#favourite').html('<i class="fa fa-heart" aria-hidden="true" style="color: #f60;"></i><br>取消收藏');
                        }
                        
                        $('#favourite').click(function () {
                            if (index >= 0) {
                                removeFavorite($.favoritesId[$.inArray(getURLParameter('id'), $.favorites)], v.buildingCode, getURLParameter('id'), v.storeCode, v.unitCode);
                            } else {
                                addToFavorite($.updateFavoritesId[$.inArray(getURLParameter('id'), $.updateFavorites)], v.buildingCode, getURLParameter('id'), v.storeCode, v.unitCode);
                            }
                        })
    
                        $('#ad_name').text(v.unitDescChs|| '');
                        $('#ad_type').text(v.typeChs || '');
                        $('#ad_size').text(v.size || '');
                        $('#ad_material').text(v.material || '');
                        $('#ad_floor').text(v.floor || '');
                        $('#ad_price_tax').text('¥ '+v.dailyPrice || '');
                        $('#ad_price').text('¥ '+numberWithCommas(parseFloat((v.dailyPrice*1.06).toFixed(2))) || '');
                        $('#ad_frequency').text(v.remarkFirst || '');
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

                                $('map').append('<area data-key="'+v.unitCode+'" alt="'+v.code+'" href="ad?id='+v.code+'&type=ad&storeCode='+storeCode+'" shape="poly" coords="'+v.coords+'" />');

                                drawShops();
                            });
                        }
                        
                        if(v.vr != null){
                            $('#vr').attr('src',v.vr);
                        }
                        
                        if(v.typeChs != 'LED/LCD/数字化'){
                            $('#ad_price_frequency').parent().parent().parent().hide();
                        }
                        
                        return false; 
                    }
                    
                });
                
                sessionStorage.setItem("availableAdsUnit_ad", JSON.stringify($.availableAdsUnit) );    
                var quantity = $.availableAdsUnit.length;                
                
                var style = '';
                if(quantity == 1){
                    style = " display: none;";
                }
                
                $('#ad_price_frequency').html('<div class="weui-cell__ft" style="text-align: center;">\n\
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
    
    $.ajax({
        url: $.api.baseNew+"/comm-wechatol/api/advertising/schedule/findAllByOrgCodeAndShopCode?orgCode="+orgCode+"&shopCode="+getURLParameter('id'),
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
                    sessionStorage.setItem("ads_schedule", JSON.stringify(response.data));
                    
                    $.each(response.data, function(i,v){
                        if(v.state == 1) {
                            $.schedule.startDate[i] = v.startDate;
                            $.schedule.endDate[i] = v.endDate;  
                            $.schedule.unit[i] = v.unitCode;  
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
    if($.schedule.multiple == 1) {
        $.schedule.available = 1;
    } else {
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

        var map = {
            "advertisingScheduleList": [
              {
                "endDate": $('#checkout-date').text(),
                "shopCode": getURLParameter('id'),
                "startDate": $('#checkin-date').text(),
                "unitCode": $.schedule.unit[0],
                "orgCode": orgCode
              }
            ],
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
}

function checkAdSubtotalSchedule() {
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
            "endDate": $('.date-end').val(),
            "shopCode": getURLParameter('id'),
            "startDate": $('.date-start').val(),
            "unitCode": $.availableAdsUnit[i],
            "orgCode": orgCode
          })
    }

    var map = {
        "advertisingScheduleList": advertisingScheduleList,
        "mobileNo": ($.cookie('uid') || ''),
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
                if(response.data.returnCode == 'ERROR'){
                    $.schedule.available = 0;
                    $('body').append('<div id="js_toast_3" style="display: none;"><div class="weui-mask_transparent"></div><div class="weui-toast"><i class="weui-icon-cancel weui-icon_toast" style="color: #FA5151;"></i><p class="weui-toast__content">'+response.data.returnMessage+'</p></div></div>');
                    var $toast = $('#js_toast_3');
                    $('.date-start').val('');
                    $('.date-end').val('');
                    $('.page.cell').removeClass('slideIn');

                    $toast.fadeIn(100);
                    setTimeout(function () {
                        $toast.remove();
                    }, 2000);
                } else {
                    $.schedule.available = 1;
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
    var rentAmount = 0;
    var deposit = 0;
    $.each($.parseJSON(sessionStorage.getItem("ads")), function(i,v){
        if(getURLParameter('id') == v.code){
            rentAmount = v.dailyPrice;
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
    result = (eRDate-sRDate)/(24*60*60*1000)+1 || 1;
    $('#days').text(result+'天');
    $.cookie('result_'+getURLParameter('id'),result);
    amount = parseFloat((rentAmount * 1.06 * qty * result).toFixed(2));
    deposit = parseFloat((amount*0.2).toFixed(2));
    $.cookie('deposit_'+getURLParameter('id'),deposit);
    subTotal = parseFloat((amount+deposit).toFixed(2));
    subItems = qty;
    $('#deposit').text('¥'+numberWithCommas(deposit));
    $('#subTotal').text('¥'+numberWithCommas(subTotal));
    $.cookie('subTotal_'+getURLParameter('id'),subTotal);
    $.cookie('subqty_'+getURLParameter('id'),subItems);
    
    var aau = [];
    $.each($.parseJSON(sessionStorage.getItem("ads_schedule")), function(i,v){
        if((dateCompare(v.startDate,sDate) == true || dateCompare(v.endDate,eDate) == true) && v.shopCode == getURLParameter('id')){
            aau.push(v.unitCode);
        }
    })
    
    for (var i = $.availableAdsUnit.length - 1; i >= 0; i--) {
        var a = $.availableAdsUnit[i];
        for (var j = aau.length - 1; j >= 0; j--) {
            var b = aau[j];
            if (a == b) {
                $.availableAdsUnit.splice(i, 1);
                aau.splice(j, 1);
                break;
            }
        }
    }
        
    checkAdSubtotalSchedule();
    
    sessionStorage.setItem("availableAdsUnit_ad", JSON.stringify($.availableAdsUnit) );    
    var quantity = $.availableAdsUnit.length;
    $.cookie('maxqty_'+getURLParameter('id'),quantity);
    $('#qty_'+getURLParameter('id')).attr('max',quantity);
}

function findUserCompanyByMobileNo(ut,sc,sz,sp){
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
                        $.order.businessScope = response.data[0].businessScope;
                        saveOrder(ut,sc,sz,sp);
                    }
                } else {
                    window.location.href = '/v2/improve-info?id='+getURLParameter('id')+'&type=ad&storeCode='+getURLParameter('storeCode');
                }
            }
        }
    })
}

function saveOrder(ut,sc,sz,sp){
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
        "appid": "",
        "brandId": "",
        "brandName": $.cookie('brand_1'),
        "code": unit,
        "contractNo": "",
        "contractType": "R4",//R1租赁 R4广告 R5场地
        "mobileNo": $.cookie('uid'),
        "name": "wechatol",
        "orderStates": "合同已生成", //订单状态
        "orgCode": orgCode,
        "outTradeNo": outTradeNo,
        "payStates": "未支付", //支付状态
        "tenantId": "",
        "tenantName": $.order.company,
        "tenantNo": "",
        "tenantOrg": $.order.uscc, //uscc
        "userId": $.cookie('uid'),
        "remarkFirst": shopCode,
        "remarkSecond": 'advertising'
    };
    
    var contractInfos = [];
    var contractTermInfos = [];  
    var indexs = 0;
    
    var code, unitDesc, size, spec, frequency, amount, taxAmount, rentAmount, deposit, src;
    $.each($.parseJSON(sessionStorage.getItem("availableAdsUnit_ad")), function(index,value){
        if(indexs < $.cookie('subqty_'+getURLParameter('id'))){
            $.each($.parseJSON(sessionStorage.getItem("ads")), function(k,y){
                if(value == y.unitCode){
                    code = y.code;
                    unitDesc = y.unitDescChs;
                    size = y.size;
                    spec = y.material;
                    frequency = y.remarkFirst;
                    amount = parseFloat((y.dailyPrice * $.cookie('result_'+getURLParameter('id')) * 1.06).toFixed(2));
                    taxAmount = parseFloat((y.dailyPrice * $.cookie('result_'+getURLParameter('id'))).toFixed(2));
                    rentAmount = y.dailyPrice;
                    deposit = parseFloat((amount * 0.2).toFixed(2));
                    src = '/views/assets/base/img/content/mall/1s.jpg';
                    if(y.advertisingImagesWxList != null && y.advertisingImagesWxList.length > 0){
                        src = y.advertisingImagesWxList[0].imagePath;
                    }
                }
            })

            contractInfos.push({
                "amount": amount,
                "bizScope": $.order.businessScope,
                "breachAmount": "",
                "code": value,
                "depositAmount": deposit,
                "electricBillFlag": "1",
                "endDate": $.cookie('dateEnd_'+getURLParameter('id')),
                "enterDate": $.cookie('dateStart_'+getURLParameter('id')),
                "isCleaning": "1",
                "isSecurity": "1",
                "isService": "1",
                "mobileNo": $.cookie('uid'),
                "name": "test name",
                "num": 1,
                "openDate": $.cookie('dateStart_'+getURLParameter('id')),
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
                "startDate": $.cookie('dateStart_'+getURLParameter('id')),
                "unitCode": value,
                "unitDesc": unitDesc,
                "unitId": "", //uuid
                "userId": $.cookie('uid'),
                "vipFlag": "1",
                "wxCardFlag": "1",
                "area": 1, //广告默认传1
                "shopCode": code
            })

            contractTermInfos.push({
                "amount": amount,
                "code": "1",
                "endDate": $.cookie('dateEnd_'+getURLParameter('id')),
                "name": unitDesc,
                "orgCode": orgCode,
                "outTradeNo": outTradeNo,
                "rentAmount": rentAmount,
                "startDate": $.cookie('dateStart_'+getURLParameter('id')),
                "taxAmount": taxAmount,
                "termType": "B033",
                "termTypeName": "固定租金",
                "unitCode": value,
                "unitId": "",
                "area": 1,
                "shopCode": code
            })
            indexs++;
        }
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
                generateContract(response.data.id,'订单合同已生成','您的订单【'+mallName+'】广告位置【'+unit+'】合同已生成，请前往我的订单管理页面查看。',outTradeNo, '我的消息',unit,'/v2/stamping');
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
                            $.shoppingcart.push(v.shopCode);
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
        "shopCode": c,
        "remarkFourth": "",
        "remarkSecond": 1,
        "remarkThird": "",
        "storeCode": sc,
        "unitCode": uc,
        "unitType": "shopping-cart"
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
                
                //showToast();
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
                    if(v.unitType == 'ads'){
                        if(v.remarkSecond == 1){
                            $.favorites.push(v.shopCode);
                            $.favoritesId.push(v.id);
                        } else if(v.remarkSecond == 0){
                            $.updateFavorites.push(v.shopCode);
                            $.updateFavoritesId.push(v.id);
                        }
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

function addToFavorite(id, bc, c, sc, uc) {
    var map = {
        "id": id,
        "buildingCode": bc,
        "code": "",
        "favoritesDate": "",
        "mobileNo": $.cookie('uid'),
        "name": "",
        "remarkFifth": "",
        "shopCode": c,
        "remarkFourth": "",
        "remarkSecond": 1,
        "remarkThird": "",
        "storeCode": sc,
        "unitCode": uc,
        "unitType": "ads"
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
        "shopCode": c,
        "remarkFourth": "",
        "remarkSecond": 0,
        "remarkThird": "",
        "storeCode": sc,
        "unitCode": uc,
        "unitType": "ads"
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