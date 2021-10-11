$.favorites = new Array();
$.favoritesId = new Array();
$.updateFavorites = new Array();
$.updateFavoritesId = new Array();

$.schedule = {
    startDate: [],
    endDate: []
}

$.eventTypes = new Array();

$.order = {
    copy: "",
    building: "",
    mall: "",
    unit: "",
    id: "",
    uscc: "",
    company: "",
    businessScope: ""
};

$.subTotal = 0;

var d = new Date();
var month = d.getMonth() + 1;
var day = d.getDate();
var time = d.getTime();
var date = d.getFullYear() + '-' +
        (month < 10 ? '0' : '') + month + '-' +
        (day < 10 ? '0' : '') + day;

$(document).ready(function () {
    if($.cookie('uid') != '' && $.cookie('uid') != null){
        getMyFavorites();
    }
    
    getEventServices();
    getShopInfo();
    getEventScheduleInfo();
    
    if($.cookie('dateStart_'+getURLParameter('id')) != '' && $.cookie('dateStart_'+getURLParameter('id')) != null){
        $('.date-start').val($.cookie('dateStart_'+getURLParameter('id')));
    }
    
    if($.cookie('dateEnd_'+getURLParameter('id')) != '' && $.cookie('dateEnd_'+getURLParameter('id')) != null){
        $('.date-end').val($.cookie('dateEnd_'+getURLParameter('id')));
    }
    
    if($.cookie('amount_'+getURLParameter('id')) != '' && $.cookie('amount_'+getURLParameter('id')) != null){
        $('#amount').text('¥'+numberWithCommas($.cookie('amount_'+getURLParameter('id'))));
    }
    
    if($.cookie('deposit_'+getURLParameter('id')) != '' && $.cookie('deposit_'+getURLParameter('id')) != null){
        $('#deposit').text('¥'+numberWithCommas($.cookie('deposit_'+getURLParameter('id'))));
    }
    
    if($.cookie('subTotal_'+getURLParameter('id')) != '' && $.cookie('subTotal_'+getURLParameter('id')) != null){
        $('#subTotal').text('¥'+numberWithCommas($.cookie('subTotal_'+getURLParameter('id'))));
    }
    
    if($.cookie('workdays_'+getURLParameter('id')) != '' && $.cookie('workdays_'+getURLParameter('id')) != null){
        $('#workdays').text($.cookie('workdays_'+getURLParameter('id'))+'天');
    }
    
    if($.cookie('workdays_single_'+getURLParameter('id')) != '' && $.cookie('workdays_single_'+getURLParameter('id')) != null){
        $('#workdays_single').text('¥'+numberWithCommas($.cookie('workdays_single_'+getURLParameter('id'))));
        
        if($.cookie('workdays_'+getURLParameter('id')) != '' && $.cookie('workdays_'+getURLParameter('id')) != null){
            $('#workdays_total').text('¥'+numberWithCommas(parseFloat(($.cookie('workdays_single_'+getURLParameter('id'))*$.cookie('workdays_'+getURLParameter('id'))).toFixed(2))));
        }
    }
    
    if($.cookie('holidays_'+getURLParameter('id')) != '' && $.cookie('holidays_'+getURLParameter('id')) != null){
        $('#holidays').text($.cookie('holidays_'+getURLParameter('id'))+'天');
    }
    
    if($.cookie('holidays_single_'+getURLParameter('id')) != '' && $.cookie('holidays_single_'+getURLParameter('id')) != null){
        $('#holidays_single').text('¥'+numberWithCommas($.cookie('holidays_single_'+getURLParameter('id'))));
        
        if($.cookie('holidays_'+getURLParameter('id')) != '' && $.cookie('holidays_'+getURLParameter('id')) != null){
            $('#holidays_total').text('¥'+numberWithCommas(parseFloat(($.cookie('holidays_single_'+getURLParameter('id'))*$.cookie('holidays_'+getURLParameter('id'))).toFixed(2))));
        }
    }
    
    $('.weui-dialog__btn').on('click', function(){
        $(this).parents('.js_dialog').fadeOut(200);
    });
    
    $('#floor_plan').on('click', function(){
        $('#floor_plan_viewer').fadeIn(200);
    });
    
    $('#cad').click(function(){
        showDialog();
    })
    
    $('.date-start, .date-end').MultiCalendar({
        scheduleStart : $.schedule.startDate,
        scheduleEnd: $.schedule.endDate,
        title: '档期选择',
        totalMohth: 6,
        dayText: ['开始', '结束'],
        valueTypes: ''
    });
    
    $('.picker-button').click(function(){
        $('.date-start').val($('#checkin-date').text() || '');
        $.cookie('dateStart_'+getURLParameter('id'),$('.date-start').val());
        $('.date-end').val($('#checkout-date').text() || '');
        $.cookie('dateEnd_'+getURLParameter('id'),$('.date-end').val());

        getSubTotal();
    })
    
    $(".weui-input").each(function(){
        $(this).on("click", function() {
            $(this).removeClass("red-border");
        })
    })
    
    $(".radio-label").change(function() {
        if($('#msg_button').prop("checked")) {
            $('#msg_p').fadeIn();
            $('#esign_p').hide();
        } else if($('#esign_button').prop("checked")) {
            $('#esign_p').fadeIn();
            $('#msg_p').hide();
        }
    }); 
});

function getEventServices() {
    $.ajax({
        url: "/views/assets/base/js/v2/json/event_service.json",
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
            $.each(response.data, function(i,v){
                $.eventTypes.push({
                    label: v.name,
                    value: v.security+'_'+v.cleaner+'_'+v.garbage
                });
            });

            $('#event_type').on('click', function () {
                $(this).blur(); 
                weui.picker($.eventTypes, {
                    onChange: function (result) {},
                    onConfirm: function (result) {
                        $('#event_type').val(result[0].label);
                        $('#security').text(result[0].value.split('_')[0]);
                        $('#cleaner').text(result[0].value.split('_')[1]);
                        $('#garbage').text(result[0].value.split('_')[2]);
                    },
                    title: '选择场地活动类型'
                });
            });
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}

function getEventScheduleInfo() {    
    $.ajax({
        url: $.api.baseNew+"/comm-wechatol/api/shop/schedule/findAllByShopCode?shopCode="+getURLParameter('id'),
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
                if(response.data.shopExistsScheduleList.length > 0){
                    sessionStorage.setItem("events_schedule_"+getURLParameter('id'), JSON.stringify(response.data.shopExistsScheduleList));
                    
                    $.each(response.data.shopExistsScheduleList, function(i,v){
                        $.schedule.startDate[i] = v.startDate;
                        $.schedule.endDate[i] = v.endDate;  
                    })
                }
                
                $.each(response.data.shopScheduleList, function(i,v){
                    if(v.unitType == 'EVENTS' && v.shopCode == getURLParameter('id')){                        
                        if(v.dateType == 'HOLIDAY' && $('#eventCHPriceTax').text() == '') {
                            $('#eventCHPrice').text('¥'+numberWithCommas(parseFloat((v.cprice*1.05).toFixed(2))));
                            $('#eventCHPriceTax').text('¥'+numberWithCommas(v.cprice));
                        } else if(v.dateType == 'HOLIDAY' && $('#eventDHPriceTax').text() == '') {
                            $('#eventDHPrice').text('¥'+numberWithCommas(parseFloat((v.dprice*1.05).toFixed(2))));
                            $('#eventDHPriceTax').text('¥'+numberWithCommas(v.dprice));
                        }
                        
                        if(v.dateType == 'WORK' && $('#eventCWPriceTax').text() == '') {
                            $('#eventCWPrice').text('¥'+numberWithCommas(parseFloat((v.cprice*1.05).toFixed(2))));
                            $('#eventCWPriceTax').text('¥'+numberWithCommas(v.cprice));
                        } else if(v.dateType == 'WORK' && $('#eventDWPriceTax').text() == '') {
                            $('#eventDWPrice').text('¥'+numberWithCommas(parseFloat((v.dprice*1.05).toFixed(2))));
                            $('#eventDWPriceTax').text('¥'+numberWithCommas(v.dprice));
                        }
                    }
                });
                
                sessionStorage.setItem("events_unit_price_"+getURLParameter('id'), JSON.stringify(response.data.shopScheduleList));
            } else {
                interpretBusinessCode(response.customerMessage);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}

function checkEventSchedule(u) {
    var map = {   
        "endDate": $.cookie('dateEnd_'+getURLParameter('id')),
        "shopCode": getURLParameter('id'),
        "startDate": $.cookie('dateStart_'+getURLParameter('id'))  
    }

    $.ajax({
        url: $.api.baseNew+"/comm-wechatol/api/shop/schedule/check",
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
                    $('body').append('<div id="js_toast_5" style="display: none;"><div class="weui-mask_transparent"></div><div class="weui-toast"><i class="weui-icon-cancel weui-icon_toast" style="color: #FA5151;"></i><p class="weui-toast__content">'+response.data.returnMessage+'</p></div></div>');
                    var $toast = $('#js_toast_5');
                    $('.date-start').val('');
                    $('.date-end').val('');
                    $('.page.cell').removeClass('slideIn');

                    $toast.fadeIn(100);
                    setTimeout(function () {
                        $toast.remove();
                    }, 2000);
                } else {
                    saveOrder(u);
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
    $.cookie('subTotal_'+getURLParameter('id'),0);
    $.subTotal = 0;
    var sDate = $('#dateStart_'+getURLParameter('id')).val();
    var eDate =  $('#dateEnd_'+getURLParameter('id')).val();
    var deposit = 0;
    var sArr = sDate.split("-");
    var eArr = eDate.split("-");
    var sRDate = new Date(sArr[1]+'/'+sArr[2]+'/'+sArr[0]);
    var eRDate = new Date(eArr[1]+'/'+eArr[2]+'/'+eArr[0]);
    var result = parseInt(Math.abs(sRDate - eRDate) / 1000 / 60 / 60 /24 + 1);
    var d = sDate;
    
    $.subTotal = 0;
    var holidays = 0, workdays = 0;
    for(var i=0; i<result; i++){
        $.each($.parseJSON(sessionStorage.getItem("events_unit_price_"+getURLParameter('id'))), function(i,v){
            var amount = (v.basePrice*1.05).toFixed(2);
            if(d == v.date){
                if(result >= 1 && result < 8){
                    amount = v.cprice;
                    if(v.dateType == 'HOLIDAY'){
                        holidays++;
                        $.cookie('holidays_single_'+getURLParameter('id'),parseFloat((amount*1.05).toFixed(2)));
                    } else {
                        workdays++;
                        $.cookie('workdays_single_'+getURLParameter('id'),parseFloat((amount*1.05).toFixed(2)));
                    }
                } else if(result >= 8){
                    amount = v.dprice;
                    if(v.dateType == 'HOLIDAY'){
                        holidays++;
                        $.cookie('holidays_single_'+getURLParameter('id'),parseFloat((amount*1.05).toFixed(2)));
                    } else {
                        workdays++;
                        $.cookie('workdays_single_'+getURLParameter('id'),parseFloat((amount*1.05).toFixed(2)));
                    }
                }

                $.subTotal = parseFloat(($.subTotal + parseFloat((amount*1.05).toFixed(2))).toFixed(2));
                $.cookie('total_'+getURLParameter('id'),$.subTotal);
                $.cookie('amount_'+getURLParameter('id'),$.subTotal);
                $('#amount').text('¥'+numberWithCommas($.subTotal));
                return false;
            }
        })
        d = IncrDate(d);
    }
    
    $.cookie('holidays_'+getURLParameter('id'),holidays);
    $('#holidays').text(holidays+'天');
    $.cookie('workdays_'+getURLParameter('id'),workdays);
    $('#workdays').text(workdays+'天');
    $('#workdays_single').text('¥'+numberWithCommas($.cookie('workdays_single_'+getURLParameter('id'))));
    $('#holidays_single').text('¥'+numberWithCommas($.cookie('holidays_single_'+getURLParameter('id'))));
    $('#workdays_total').text('¥'+numberWithCommas(parseFloat(($.cookie('workdays_single_'+getURLParameter('id'))*workdays).toFixed(2))));
    $('#holidays_total').text('¥'+numberWithCommas(parseFloat(($.cookie('holidays_single_'+getURLParameter('id'))*holidays).toFixed(2))));
    
    $.cookie('subTotal_'+getURLParameter('id'),$.subTotal + parseFloat(($.subTotal*0.2).toFixed(2)));
    $('#subTotal').text('¥'+numberWithCommas($.subTotal + parseFloat(($.subTotal*0.2).toFixed(2))));
    
    deposit = parseFloat(($.subTotal*0.2).toFixed(2));
    
    if(deposit < 5000){
        deposit = 5000.00;
    }
    $.cookie('deposit_'+getURLParameter('id'),deposit);
    $('#deposit').text('¥'+numberWithCommas(deposit));
    
    $.cookie('total_'+getURLParameter('id'),parseFloat(($.subTotal+deposit).toFixed(2)));
}

function getShopInfo() {
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
        url: $.api.baseNew+"/comm-wechatol/api/event/info/findAllByStoreCode?storeCode="+storeCode,
        type: "GET",
        async: false,
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
                
                if(response.data.length > 0){
                    $.each(response.data, function (i, v) {
                        if(v.shopCode == getURLParameter('id')) {
                            getShopsMoreInfo(v.unitCode);
                            
                            var floor = v.floor;
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

                                    $('map').append('<area data-key="'+v.unitCode+'" alt="'+v.shopCode+'" href="event?id='+v.shopCode+'&type=events&storeCode='+storeCode+'" shape="poly" coords="'+v.coords+'" />');

                                    drawShops();
                                });
                            }
                        
                            if(v.vr != null && v.vr != ''){
                                $('#vr').attr('src',v.vr);
                                $('#video').hide();
                            } else {
                                document.addEventListener('WeixinJSBridgeReady', function() {
                                    $("#video").attr('src','/upload/video/'+getURLParameter('id')+'.mp4');
                                    $("#video").get(0).play();
                                    $('#vr').hide();
                                })
                            }

                            $('#shopName').text(v.shopNo);
                            $.cookie('shopName',v.shopNo+'::'+v.shopCode);
                            $('#area').text(v.area);
                            $.cookie('area',v.area+'::'+v.shopCode);
                            $('#area_spesifc').text(v.size != null ? '(' + v.size + ')' : '');
                            $('#height').text(v.height != null ? v.height : '');
                            $('#electricity').text(v.electricity != null ? v.electricity : '');
                            $('#material').text(v.material != null ? v.material : '');
                            $('#internet').text(v.internet != null ? v.internet : '');
                            $('#lift').text(v.lift != null ? v.lift : '');
                            $('#desc').text(v.descript != null ? v.descript : '');

                            var index = $.inArray(getURLParameter('id'), $.favorites);
                            if (index >= 0) {
                                $('#favourite').html('<i class="fa fa-heart" aria-hidden="true" style="color: #f60;"></i><br>取消收藏');
                            }

                            $('#favourite').click(function () {
                                if($.cookie('uid') == '' || $.cookie('uid') == null){
                                    window.location.href = '/v2/login?id='+getURLParameter('id')+'&type='+getURLParameter('type')+'&storeCode='+getURLParameter('storeCode');
                                } else {
                                    if (index >= 0) {
                                        removeFavorite($.favoritesId[$.inArray(getURLParameter('id'), $.favorites)], v.buildingCode, getURLParameter('id'), v.storeCode, v.unitCode);
                                    } else {
                                        addToFavorite($.updateFavoritesId[$.inArray(getURLParameter('id'), $.updateFavorites)],v.buildingCode, getURLParameter('id'), v.storeCode, v.unitCode);
                                    }
                                }
                            })
                        }
                    })
                }
            } else {
                interpretBusinessCode(response.customerMessage);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
        }
    });
}

function getShopsMoreInfo(u) {
    if(getURLParameter('info') && getURLParameter('info') == 'done'){
       if($.cookie('orderShopCode') != getURLParameter('id')){
            findUserCompanyByMobileNo(u);
        } else {
            window.location.replace('/v2/event?id='+getURLParameter('id')+'&type='+getURLParameter('type')+'&storeCode='+getURLParameter('storeCode'));
        }
    }

    var goCheck = 1;
    $('#choose_event').click(function(){
        if($('.date-start').val() == ''){
            $('.date-start').addClass('red-border');
            goCheck = 0;
        } else {
            $('.date-start.red-border').removeClass('red-border');
            goCheck = 1;
        }
       
        if($('.date-end').val() == ''){
            $('.date-end').addClass('red-border');
            goCheck = 0;
        } else {
            $('.date-end.red-border').removeClass('red-border');
            goCheck = 1;
        }
        
        if(dateCompare($('.date-start').val(),$('.date-end').val()) == false){
            $('.date-start').addClass('red-border');
            $('.date-end').addClass('red-border');
            goCheck = 0;
        }
        
        if($('#event_name').val() == ''){
            $('#event_name').addClass('red-border');
            goCheck = 0;
        } else {
            $('#event_name.red-border').removeClass('red-border');
            goCheck = 1;
        }
        
        if($('#event_type').val() == ''){
            $('#event_type').addClass('red-border');
            goCheck = 0;
        }  else {
            $('#event_type.red-border').removeClass('red-border');
            goCheck = 1;
        }
                
        if(goCheck == 1){
            $.cookie('eventName',$('#event_name').val());
            $.cookie('eventType',$('#event_type').val());
            showOrderTypeDialog();      
        } else {
            $('body').append('<div id="js_toast_6" style="display: none;"><div class="weui-mask_transparent"></div><div class="weui-toast"><i class="weui-icon-cancel weui-icon_toast" style="color: #FA5151;"></i><p class="weui-toast__content">请完成必填项</p></div></div>');
            var $toast = $('#js_toast_6');
            $('.page.cell').removeClass('slideIn');
            
            $('html, body').animate({
                scrollTop: $('.red-border').offset().top
            }, 0);
        
            $toast.fadeIn(100);
            setTimeout(function () {
                $toast.fadeOut(100);
            }, 2000);
        }
    });
    
    $("#confirm_price").click(function () {
        if(goCheck == 1){
            if($('#msg_button').prop("checked")) {
                window.location.href = '/v2/contact?type=events&storeCode='+getURLParameter('storeCode');
            } else if($('#esign_button').prop("checked")) {
                window.location.href = '/v2/improve-info?id='+getURLParameter('id')+'&type=events&storeCode='+getURLParameter('storeCode');                       
            }
        }
    });
}

function findUserCompanyByMobileNo(u){
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
                        checkEventSchedule(u);
                    }
                } else {
                    window.location.href = '/v2/improve-info?id='+getURLParameter('id')+'&type=events&storeCode='+getURLParameter('storeCode');
                }
            }
        }
    })
}

function saveOrder(ut){
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
    
    var unit = ut;
    var outTradeNo = '10JT' + orgCode + d.getFullYear() +
                (month<10 ? '0' : '') + month +
                (day<10 ? '0' : '') + day + time
                + parseInt(Math.random()*10);
        
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

    var order = {
        "amount": 100000,
        "appid": $.api.appId,
        "openid": openid,
        "unionId": unionid,
        "brandId": "",
        "brandName": $.cookie('brand_1'),
        "code": unit,
        "contractInfos": [
          {
            "amount": $.cookie('total_'+getURLParameter('id')),
            "bizScope": $.order.businessScope,
            "breachAmount": "",
            "code": unit,
            "depositAmount": $.cookie('deposit_'+getURLParameter('id')),
            "electricBillFlag": "1",
            "endDate": $.cookie('dateEnd_'+getURLParameter('id')),
            "enterDate": "",
            "isCleaning": "0", //额外保洁数量 
            "isSecurity": "0", //额外保安数量
            "isService": "0", //额外服务数量
            "mobileNo": $.cookie('uid'),
            "name": $.cookie('eventName'),  //活动名称
            "num": 1,
            "openDate": $.cookie('dateStart_'+getURLParameter('id')),
            "orgCode": orgCode,
            "otherFlag": "",
            "outTradeNo": outTradeNo,
            "remarkFifth": "",
            "remarkFirst": "",
            "remarkFourth": "",
            "remarkSecond": "",
            "remarkThird": "",
            "salesFlag": "1",
            "serviceDepositAmount": 0,
            "size": "", //广告尺寸规格
            "spec": "",
            "startDate": $.cookie('dateStart_'+getURLParameter('id')),
            "unitCode": unit,
            "unitDesc":  $.cookie('shopName').split('::')[0],
            "unitId": "",
            "userId": $.cookie('uid'),
            "vipFlag": "1",
            "wxCardFlag": "1",
            "area": $.cookie('area').split('::')[0], //广告默认传1
            "shopCode": getURLParameter('id')
          }
        ],
        "contractNo": "",
        "contractTermInfos": [
          {
            "amount": $.cookie('total_'+getURLParameter('id')),//总价
            "code": "1",
            "endDate": $.cookie('dateEnd_'+getURLParameter('id')),
            "name": "",
            "orgCode": orgCode,
            "outTradeNo": outTradeNo,
            "rentAmount": parseFloat(($.cookie('total_'+getURLParameter('id'))/1.05/$.cookie('area').split('::')[0]).toFixed(2)), //单价
            "startDate": $.cookie('dateStart_'+getURLParameter('id')),
            "taxAmount": parseFloat(($.cookie('total_'+getURLParameter('id'))/1.05).toFixed(2)),//不含税总价
            "termType": "B013", // 工作日 B013 节假日 B103
            "termTypeName": "固定租金",
            "unitCode": unit,
            "unitId": "",
            "area": $.cookie('area').split('::')[0],
            "shopCode": getURLParameter('id')
          }
        ],
        "contractType": "R5",//R1租赁 R4广告 R5场地
        "mobileNo": $.cookie('uid'),
        "name": $.cookie('eventType'), //活动类型
        "orderStates": "合同已生成", //订单状态
        "orgCode": orgCode,
        "outTradeNo": outTradeNo,
        "payStates": "未支付", //支付状态
        "tenantId": "",
        "tenantName": $.order.company,
        "tenantNo": "",
        "tenantOrg": $.order.uscc, //uscc
        "userId": $.cookie('uid'),
        "remarkFirst": getURLParameter('id'),
        "remarkSecond": 'events'
    };
    
    
    $.ajax({
        url: $.api.baseNew+"/comm-wechatol/api/order/saveOrUpdate",
        type: "POST",
        data: JSON.stringify(order),
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
                $.cookie('orderShopCode',getURLParameter('id'));
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
                generateContract(response.data.id,'订单合同已生成','您的订单【'+mallName+'】场地位置【'+unit+'】合同已生成，请前往我的订单管理页面查看。',outTradeNo, '我的消息',unit,'/v2/stamping');
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
                    if(v.unitType == 'event'){
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

function showDialog(){
    var authDialog = $('#cadDialog');
    authDialog.fadeIn(200);
    
    $("#cadDialogForm").validate({
        onkeyup: false,
        rules: {
            cadEmail: {
                required: true,
                email: true
            }
        },
        messages: {
            cadEmail: {
                required: '<i class="fa fa-exclamation-circle" aria-hidden="true"></i>请填写收件人邮箱',
                email: '<i class="fa fa-exclamation-circle" aria-hidden="true"></i>邮箱格式不对，请正确填写'
            }
        },
        errorPlacement: function(error, element) {
            error.appendTo('#errorcontainer-' + element.attr('id'));
        },
        submitHandler: function() {
            hideDialog();
            showLoading();
            sendMail($('#cadEmail').val(),$('#cad').attr('data-file'));
        }
    })
}

function hideDialog(){
    var authDialog = $('#cadDialog');
    authDialog.hide();
}

function showOrderTypeDialog(){
    var orderTypeDialog = $('#orderTypeDialog');
    orderTypeDialog.fadeIn(200)
}

function hideOrderTypeDialog(){
    var orderTypeDialog = $('#orderTypeDialog');
    orderTypeDialog.hide();
}

function sendMail(email,file) {
    $.ajax({
        url: "/controllers/api/2.0/ApiSendCAD.php",
        type: "POST",
        data: {
            "email": email,
            "file": file
        },
        async: false,
        beforeSend: function(request) {},
        complete: function(){},
        success: function (response, status, xhr) {
            hideLoading();
            $(function(){
                var $toast = $('#js_toast_3');
                $toast.fadeIn(100);
                setTimeout(function () {
                    $toast.fadeOut(100);
                }, 2000);
            });
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