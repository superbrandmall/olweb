$.order = {
    copy: "",
    uscc: "",
    company: "",
    businessScope: ""
};

$.availableAdsUnit = new Array();
$.shopCodeTemp = '';
$.multipleTemp = 0;

$.subTotal = 0;

var d = new Date();
var month = d.getMonth()+1;
var day = d.getDate();
var time = d.getTime();
var date = d.getFullYear() + '-' +
    (month<10 ? '0' : '') + month + '-' +
    (day<10 ? '0' : '') + day;

$(document).ready(function(){
    $(".weui-count__number").each(function(){
        $(this).val($.cookie('quantity_'+$(this).attr('id').split('_')[1]) || 1);
    })
    
    getAdBaseInfo();
    getShoppingCart();
    
    $(".date-start, .date-end").each(function(){
        $(this).click(function() {
            $.shopCodeTemp = $(this).attr('id').split('_')[1];
            $.multipleTemp = $(this).attr('data-multiple');
            if($(this).attr('data-multiple') == 0) {
                var sD, eD, startDate = [], endDate = [];
                if($.cookie('startDate_'+$.shopCodeTemp) != '' && $.cookie('startDate_'+$.shopCodeTemp) != null) {
                    var sD = $.cookie('startDate_'+$.shopCodeTemp).split(',');
                    for(var i=0;i<sD.length;i++){
                        startDate.push(sD[i]);
                    }
                } else {
                    startDate = ['2020-01-01'];
                }
                
                if($.cookie('endDate_'+$.shopCodeTemp) != '' && $.cookie('endDate_'+$.shopCodeTemp) != null) {
                    var eD = $.cookie('endDate_'+$.shopCodeTemp).split(',');
                    for(var i=0;i<eD.length;i++){
                        endDate.push(eD[i]);
                    }
                } else {
                    endDate = ['2020-01-01'];
                }
                
                $(this).MultiCalendar({
                    scheduleStart : startDate,
                    scheduleEnd: endDate,
                    title: '档期选择',
                    totalMohth: 6,
                    dayText: ['开始', '结束'],
                    valueTypes: ''
                });
            } else {
                $(this).MultiCalendar({
                    scheduleStart : ['2020-01-01'],
                    scheduleEnd: ['2020-01-01'],
                    title: '档期选择',
                    totalMohth: 6,
                    dayText: ['开始', '结束'],
                    valueTypes: ''
                });
            }
            
            $('.picker-button').click(function(){
                if($.cookie('available_'+$.shopCodeTemp) == 1){
                    $('#dateStart_'+$.shopCodeTemp).val($('#checkin-date').text() || '');
                    $.cookie('dateStart_'+$.shopCodeTemp,$('#dateStart_'+$.shopCodeTemp).val());
                    $('#dateEnd_'+$.shopCodeTemp).val($('#checkout-date').text() || '');
                    $.cookie('dateEnd_'+$.shopCodeTemp,$('#dateEnd_'+$.shopCodeTemp).val());

                    getSubTotal();
                }
            })
        })
    })
    
    $('.weui-count__decrease').click(function (e) {
        showLoading();
        var $input = $(e.currentTarget).parent().find('.weui-count__number');
        var number = parseInt($input.val() || "0") - 1;
        if (number < $(this).parent().find('.weui-count__number').attr('min')) number = $(this).parent().find('.weui-count__number').attr('min');
        $input.val(number);
        $.cookie('quantity_'+$input.attr('id').split('_')[1],number);
        if(number == 0){
            $(this).hide();
            $(this).parent().find('.weui-count__increase').show();
        } else if(number < $(this).parent().find('.weui-count__number').attr('max')){
            $(this).parent().find('.weui-count__increase').show();
        }
        getSubTotal();
    })
    
    $('.weui-count__increase').click(function (e) {
        showLoading();
        var $input = $(e.currentTarget).parent().find('.weui-count__number');
        var number = parseInt($input.val() || "0") + 1;
        if (number > $(this).parent().find('.weui-count__number').attr('max')) number = $(this).parent().find('.weui-count__number').attr('max');
        $input.val(number);
        $.cookie('quantity_'+$input.attr('id').split('_')[1],number);
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
    
    $('.weui-cell_swiped').swipeout();
    $('.weui-cell_swiped').swipeout('close');
    $('.delete-swipeout').click(function () {
        removeFromShoppingCart($(this).attr('id').split('_')[1]); 
    })

    $('.weui-cell_swiped').swipeout('open');
    //$(document).on("swipeout-open",'.weui-cell_swiped',function(){ })  监听打开触发
    //$(document).on("swipeout-close",'.weui-cell_swiped',function(){ }) 监听关闭触发
})

function getShoppingCart() {
    var storeCode = 'OLMALL180917000003';
    if(getURLParameter('storeCode') && getURLParameter('storeCode') != 'undefined') {
        storeCode = getURLParameter('storeCode');
    }
    
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
                    sessionStorage.setItem("shopping_cart_terms", JSON.stringify(response.data));
                    
                    $.each(response.data, function(i,v){
                        if(v.unitType == 'shopping-cart' && v.storeCode == storeCode){
                            $.each($.parseJSON(sessionStorage.getItem("ads")), function(j,w){
                                if(v.shopCode == w.code){
                                    $.availableAdsUnit.push({
                                        'code': w.code,
                                        'unitCode': w.unitCode
                                    });
                                }
                            })
                            
                            renderAdsList(JSON.stringify(v));
                            getAdScheduleInfo(v.shopCode);
                        }
                    });
                    
                    getSubTotal();
                    
                    if(getURLParameter('info') && getURLParameter('info') == 'done'){
                        var code;
                        $(".weui-panel .weui-check").each(function(){
                            if($(this).prop("checked")) {
                                code = $(this).attr('id').split('_')[1];
                                return false;
                            }
                        })
                        findUserCompanyByMobileNo(code);
                    }
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

function updateShoppingCart(id,bc,c,sc,uc){
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

function removeFromShoppingCart(id) {
    showLoading();
    $.ajax({
        type: "DELETE",
        url: $.api.baseNew+"/comm-wechatol/api/user/favorites/wx/delete/"+id,
        async: false,
        cache: false,
        processData: false,
        contentType: false,
        beforeSend: function(request) {
            showLoading();
            request.setRequestHeader("Login", $.cookie('login'));
            request.setRequestHeader("Authorization", $.cookie('authorization'));
            request.setRequestHeader("Lang", $.cookie('lang'));
            request.setRequestHeader("Source", "onlineleasing");
        },
        complete: function(){},
        success: function(response, status, xhr) {
            hideLoading();
            $('#swipe_'+id).parent().parent().parent().parent().parent().fadeOut('slow').remove();
            getSubTotal();
        }
    })
}

function renderAdsList(s){
    $('#shoppingCartEmpty').hide();
    
    var w = $.parseJSON(s);
    var unitDesc = '';
    var quantity = 0;
    var type;
    var img;
    var unitCode;
    var taxAmount;
    var frequency;
    var multiple = 1;
    
    $.each($.parseJSON(sessionStorage.getItem("ads")), function(k,y){
        if(w.shopCode == y.code){
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
        multiple = 0;
    }

    $('.page__bd').append('<div class="weui-panel" style="margin-top: 0;">\n\
        <div class="weui-panel__hd">\n\
            '+unitDesc+'\n\
        </div>\n\
        <div class="weui-panel__bd">\n\
            <div class="weui-media-box weui-media-box_appmsg weui-cells weui-cells_checkbox" style="padding: 0 0 0 16px; margin-top: 0;">\n\
                <label class="weui-cell weui-cell_active weui-check__label" for="check_'+w.shopCode+'" style="padding: 0;">\n\
                    <div class="weui-cell__hd">\n\
                        <input type="checkbox" class="weui-check" name="check_items" id="check_'+w.shopCode+'" checked="checked">\n\
                        <i class="weui-icon-checked"></i>\n\
                    </div>\n\
                    <div class="weui-media-box__hd" style="width: 100px; height: 80px;">\n\
                        <img class="weui-media-box__thumb" src="'+img+'" alt="">\n\
                    </div>\n\
                </label>\n\
                <div class="weui-media-box__bd weui-cell_swiped">\n\
                    <div class="weui-form-preview__bd weui-cell__bd" style="font-size: 15px;">\n\
                        <div class="weui-form-preview__item">\n\
                            <span class="weui-form-preview__value" style="text-align: left;">'+type+'</span>\n\
                            <span class="weui-form-preview__value">\n\
                                <div class="weui-cell__bd">\n\
                                    <input class="weui-input date-start" id="dateStart_'+w.shopCode+'" data-multiple="'+multiple+'" placeholder="填写档期起始日" readonly>\n\
                                </div>\n\
                            </span>\n\
                            <span class="weui-form-preview__value">\n\
                                <div class="weui-cell__bd">\n\
                                    <input class="weui-input date-end" id="dateEnd_'+w.shopCode+'" data-multiple="'+multiple+'" placeholder="填写档期终止日" readonly>\n\
                                </div>\n\
                            </span>\n\
                        </div>\n\
                    </div>\n\
                    <div class="weui-cell__ft">\n\
                        <a id="swipe_'+w.id+'" class="weui-swiped-btn weui-swiped-btn_warn delete-swipeout" style="padding-top: 50%;" href="javascript:">删除</a>\n\
                    </div>\n\
                </div>\n\
            </div>\n\
            <div style="padding: 0 24px 16px;">\n\
                单价: ¥ <span id="taxAmount_'+w.shopCode+'">'+numberWithCommas(taxAmount)+'</span><small>/'+frequency+' (含6%税费)</small></div>\n\
            <div class="weui-cell">\n\
                <div class="weui-cell__bd">\n\
                    <p><span style="color: #b43018; font-weight: bold;">¥ </span><span id="totalAmount_'+w.shopCode+'" style="color: #b43018; font-size: 18px; font-weight: bold;">'+numberWithCommas(taxAmount)+'</span> <small>(含6%税费及20%押金)</small></p>\n\
                </div>\n\
                <div class="weui-cell__ft">\n\
                    <div class="weui-count">\n\
                        <a class="weui-count__btn weui-count__decrease"></a>\n\
                        <input id="qty_'+w.shopCode+'" class="weui-count__number" type="number" value="1" min="1" max="'+quantity+'" readonly />\n\
                        <a class="weui-count__btn weui-count__increase" style="'+style+'"></a>\n\
                    </div>\n\
                </div>\n\
            </div>\n\
        </div>\n\
    </div>\n\
    ');
    
    $('#dateStart_'+w.shopCode).val(($.cookie('dateStart_'+w.shopCode) || ''));
    $('#dateEnd_'+w.shopCode).val(($.cookie('dateEnd_'+w.shopCode) || ''));
    
    if($.cookie('quantity_'+w.shopCode) && $.cookie('quantity_'+w.shopCode) != null && $.cookie('quantity_'+w.shopCode) >= 0 && $.cookie('quantity_'+w.shopCode) <= quantity) {
        $('#qty_'+w.shopCode).val($.cookie('quantity_'+w.shopCode));
    }
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
                    if($.subTotal > 0){
                        datesAlignCheck();
                    } else {
                        $('body').append('<div id="js_toast_4" style="display: none;"><div class="weui-mask_transparent"></div><div class="weui-toast"><i class="weui-icon-cancel weui-icon_toast" style="color: #FA5151;"></i><p class="weui-toast__content">无法结算</p></div></div>');
                        var $toast = $('#js_toast_4');
                        $('.page.cell').removeClass('slideIn');

                        $toast.fadeIn(100);
                        setTimeout(function () {
                            $toast.fadeOut(100);
                        }, 2000);
                    }
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
                    sessionStorage.setItem("ads_schedule_"+shopCode, JSON.stringify(response.data));
                    
                    var startDate = [], endDate = [], unitCode = [];
                    $.each(response.data, function(i,v){
                        if(v.state == 1) {
                            startDate.push(v.startDate);
                            endDate.push(v.endDate);
                            unitCode.push(v.unitCode);
                        }
                    })
                    
                    $.cookie('startDate_'+shopCode,startDate);
                    $.cookie('endDate_'+shopCode,endDate);  
                    $.cookie('unit_'+shopCode,unitCode);  
                    
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
    if($.multipleTemp == 1) {
        $.cookie('available_'+$.shopCodeTemp,1);
    } else {
        if($.cookie('unit_'+$.shopCodeTemp) == 'undefined' || $.cookie('unit_'+$.shopCodeTemp) == '' || $.cookie('unit_'+$.shopCodeTemp) == null){
            $.cookie('available_'+$.shopCodeTemp,1);
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
                    "shopCode": $.shopCodeTemp,
                    "startDate": $('#checkin-date').text(),
                    "unitCode": $.cookie('unit_'+$.shopCodeTemp)[0],
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
                            $.cookie('available_'+$.shopCodeTemp,1);
                        } else {
                            $.cookie('available_'+$.shopCodeTemp,0);
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
}

function checkAdSubtotalSchedule(code) {
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
        if($.availableAdsUnit[i].code == code){
            advertisingScheduleList.push({
                "endDate": $('#dateEnd_'+code).val(),
                "shopCode": code,
                "startDate": $('#dateStart_'+code).val(),
                "unitCode": $.availableAdsUnit[i].unitCode,
                "orgCode": orgCode
            })
        }
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
                if(response.data.returnCode == 'ERROR'){
                    $.cookie('available_'+code,0);
                    $('body').append('<div id="js_toast_1" style="display: none;"><div class="weui-mask_transparent"></div><div class="weui-toast"><i class="weui-icon-cancel weui-icon_toast" style="color: #FA5151;"></i><p class="weui-toast__content">'+response.data.returnMessage+'</p></div></div>');
                    var $toast = $('#js_toast_1');
                    $('#dateStart_'+code).val('');
                    $('#dateEnd_'+code).val('');
                    $('.page.cell').removeClass('slideIn');

                    $toast.fadeIn(100);
                    setTimeout(function () {
                        $toast.remove();
                    }, 2000);
                } else {
                    $.cookie('available_'+code,1);
                }
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}

function getSubTotal() {
    $.subTotal = 0;
    var subItems = 0;
    var storeCode = 'OLMALL180917000003';
    if(getURLParameter('storeCode') && getURLParameter('storeCode') != 'undefined') {
        storeCode = getURLParameter('storeCode');
    }
    $.each($.parseJSON(sessionStorage.getItem("shopping_cart_terms")), function(i,v){
        if(v.unitType == 'shopping-cart' && v.storeCode == storeCode){ 
            var rentAmount = 0;
            var deposit = 0;
            $.each($.parseJSON(sessionStorage.getItem("ads")), function(k,y){
                if(v.shopCode == y.code){
                    rentAmount = y.dailyPrice;
                }
            })

            var code;
            var qty = 1;
            var amount = 1;
            var result = 1;
            $(".weui-panel .weui-check").each(function(){
                if($(this).prop("checked")) {
                    code = $(this).attr('id').split('_')[1];
                    if(code == v.shopCode){
                        if($.cookie('quantity_'+code) != '' && $.cookie('quantity_'+code) != null){
                            qty = $.cookie('quantity_'+code);
                        } else {
                            qty = $(this).parents('.weui-panel__bd').find('.weui-count__number').val();
                        }
                        
                        if($('#dateStart_'+code).val() != '' && $('#dateEnd_'+code).val() != ''){
                            var sDate = $('#dateStart_'+code).val();
                            var eDate =  $('#dateEnd_'+code).val();
                            var sArr = sDate.split("-");
                            var eArr = eDate.split("-");
                            var sRDate = new Date(sArr[1]+'/'+sArr[2]+'/'+sArr[0]);
                            var eRDate = new Date(eArr[1]+'/'+eArr[2]+'/'+eArr[0]);
                            var result = parseInt(Math.abs(sRDate - eRDate) / 1000 / 60 / 60 /24 + 1);
                        } else {
                            result = 0;
                        }
                        
                        $.cookie('result_ad',result);
                        amount = parseFloat((rentAmount * 1.06 * qty * result).toFixed(2));
                        deposit = parseFloat((amount*0.2).toFixed(2));
                        if(amount > 0 && deposit < 2000){
                            deposit = 2000.00;
                        }
                        amount = parseFloat((amount+deposit).toFixed(2));
                        $('#totalAmount_'+code).text(numberWithCommas(amount.toFixed(2)));
                        $.subTotal = parseFloat(($.subTotal+amount).toFixed(2));
                        subItems = parseInt(subItems) + parseInt(qty);
                    }
                }
            })
        }
    })
    
    var aau = [];
    var code;
    $(".weui-panel .weui-check").each(function(){
        if($(this).prop("checked") && $(this).parent().parent().parent().find('.date-start').val() != '' && $(this).parent().parent().parent().find('.date-end').val() != '') {
            code = $(this).attr('id').split('_')[1];

            if(sessionStorage.getItem("ads_schedule_"+code) != null && sessionStorage.getItem("ads_schedule_"+code) != ''){
                $.each($.parseJSON(sessionStorage.getItem("ads_schedule_"+code)), function(i,v){
                    if(((TimelizeDate(v.startDate) <= TimelizeDate($('#dateStart_'+code).val()) &&  TimelizeDate(v.endDate) >= TimelizeDate(($('#dateStart_'+code).val())) 
                || (TimelizeDate(v.startDate) >= TimelizeDate($('#dateStart_'+code).val()) &&  TimelizeDate(v.startDate) <= TimelizeDate($('#dateEnd_'+code).val())) 
                || (TimelizeDate(v.endDate) >= TimelizeDate($('#dateStart_'+code).val()) &&  TimelizeDate(v.endDate) <= TimelizeDate($('#dateEnd_'+code).val())) 
                || (TimelizeDate(v.startDate) <= TimelizeDate($('#dateStart_'+code).val()) &&  TimelizeDate(v.endDate) >= TimelizeDate($('#dateEnd_'+code).val()))) 
                && v.shopCode == code)){    
                        aau.push({
                            'code': code,
                            'unitCode': v.unitCode
                        });
                    }
                })
                
                for (var i = $.availableAdsUnit.length - 1; i >= 0; i--) {
                    var a = JSON.stringify($.availableAdsUnit[i]);
                    for (var j = aau.length - 1; j >= 0; j--) {
                        var b = JSON.stringify(aau[j]);

                        if (a == b) {
                            $.availableAdsUnit.splice(i, 1);
                            aau.splice(j, 1);
                            break;
                        }
                    }
                }
            }
            
            var quantity = 0;

            $.each($.availableAdsUnit, function(index,value){
                if(value.code == code){
                    quantity++;
                }
            })
            
            $('#qty_'+code).attr('max',quantity);     
        }
    })
    
    checkAdSubtotalSchedule(code);
    
    $('#subTotal').text(numberWithCommas($.subTotal.toFixed(2)));
    $.cookie('subtotal',$.subTotal.toFixed(2));
    $('#subQTY').text(subItems);
    $.cookie('subqty',subItems);
    
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
    $(".weui-panel .weui-check").each(function(){
        if($(this).prop("checked")) {
            var code = $(this).attr('id').split('_')[1];
            var qty = $.cookie('quantity_'+code) || $(this).parents('.weui-panel__bd').find('.weui-count__number').val();
            var sDate = $('.date-start').val();
            var eDate =  $('.date-end').val();
            var sArr = sDate.split("-");
            var eArr = eDate.split("-");
            var sRDate = new Date(sArr[0], sArr[1], sArr[2]);
            var eRDate = new Date(eArr[0], eArr[1], eArr[2]);
            
            var indexs = 0;
            var unitDesc, size, spec, frequency, amount, taxAmount, rentAmount, deposit, src;
            $.each($.availableAdsUnit, function(index,value){
                if(value.code == code && indexs < qty){
                    $.each($.parseJSON(sessionStorage.getItem("ads")), function(k,y){
                        if(value.unitCode == y.unitCode){
                            unitDesc = y.unitDescChs;
                            size = y.size;
                            spec = y.material;
                            frequency = y.remarkFirst;
                            amount = parseFloat((y.dailyPrice * $.cookie('result_ad') * 1.06).toFixed(2));
                            taxAmount = parseFloat((y.dailyPrice * $.cookie('result_ad')).toFixed(2));
                            rentAmount = y.dailyPrice;
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
                        "endDate": $('.date-end').val(),
                        "enterDate": $('.date-start').val(),
                        "isCleaning": "1",
                        "isSecurity": "1",
                        "isService": "1",
                        "mobileNo": $.cookie('uid'),
                        "name": "test name",
                        "num": 1,
                        "openDate": $('.date-start').val(),
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
                        "startDate": $('.date-start').val(),
                        "unitCode": value.unitCode,
                        "unitDesc": unitDesc,
                        "unitId": "", //uuid
                        "userId": $.cookie('uid'),
                        "vipFlag": "1",
                        "wxCardFlag": "1",
                        "area": 1, //广告默认传1
                        "shopCode": value.code
                    })
                    
                    contractTermInfos.push({
                        "amount": amount,
                        "code": "1",
                        "endDate": $('.date-end').val(),
                        "name": unitDesc,
                        "orgCode": orgCode,
                        "outTradeNo": outTradeNo,
                        "rentAmount": rentAmount,
                        "startDate": $('.date-start').val(),
                        "taxAmount": taxAmount,
                        "termType": "B033",
                        "termTypeName": "固定租金",
                        "unitCode": value.unitCode,
                        "unitId": "",
                        "area": 1,
                        "shopCode": value.code
                    })
                    indexs++;
                }
            })
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
    var go = 1;
    var tempStart = '';
    var tempEnd = '';
    $('.date-start').each(function(i,elem){
        if(tempStart == '') {
            tempStart = $(this).val();
        }
        
        if($(this).val() == ''){
            go = 0;
        } else if ($(this).val() != tempStart){
            go = 2;
        } 
    })
    
    $('.date-end').each(function(i,elem){
        if(tempEnd == '') {
            tempEnd = $(this).val();
        }
        
        if($(this).val() == ''){
            go = 0;
        } else if($(this).val() != tempEnd){
            go = 2;
        }
    })
    
    if(go == 1){
        window.location.href = '/v2/improve-info?type=ads&storeCode='+getURLParameter('storeCode');
    } else {
        if(go == 0){
            $('body').append('<div id="js_toast_2" style="display: none;"><div class="weui-mask_transparent"></div><div class="weui-toast"><i class="weui-icon-cancel weui-icon_toast" style="color: #FA5151;"></i><p class="weui-toast__content"> 档期起始日与终止日不能为空 </p></div></div>');
        } else {
            $('body').append('<div id="js_toast_2" style="display: none;"><div class="weui-mask_transparent"></div><div class="weui-toast"><i class="weui-icon-cancel weui-icon_toast" style="color: #FA5151;"></i><p class="weui-toast__content"> 同一订单档期起始日与终止日需保持一致 </p></div></div>');            
        }
        
        var $toast = $('#js_toast_2');

        $('.page.cell').removeClass('slideIn');

        $toast.fadeIn(100);
        setTimeout(function () {
            $toast.fadeOut(100);
        }, 2000);
    }
}