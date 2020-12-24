$.favorites = new Array();
$.favoritesId = new Array();
$.updateFavorites = new Array();
$.updateFavoritesId = new Array();

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
    
    if($.cookie('subTotal_event') != '' && $.cookie('subTotal_event') != null){
        $('#subTotal').text('¥'+numberWithCommas($.cookie('subTotal_event')));
    }
    
    if($.cookie('eventDeposit') != '' && $.cookie('eventDeposit') != null){
        $('#deposit').text('¥'+numberWithCommas($.cookie('eventDeposit')));
    }
    
    if($.cookie('startDate_event') != '' && $.cookie('startDate_event') != null){
        $('.date-start').val($.cookie('startDate_event'));
    }
    
    if($.cookie('endDate_event') != '' && $.cookie('endDate_event') != null){
        $('.date-end').val($.cookie('endDate_event'));
    }
    
    if($.cookie('workdays_event') != '' && $.cookie('workdays_event') != null){
        $('#workdays').text($.cookie('workdays_event')+'天');
    }
    
    if($.cookie('workdays_single_event') != '' && $.cookie('workdays_single_event') != null){
        $('#workdays_single').text('¥'+numberWithCommas($.cookie('workdays_single_event')));
        
        if($.cookie('workdays_event') != '' && $.cookie('workdays_event') != null){
            $('#workdays_total').text('¥'+numberWithCommas(parseFloat(($.cookie('workdays_single_event')*$.cookie('workdays_event')).toFixed(2))));
        }
    }
    
    if($.cookie('holidays_event') != '' && $.cookie('holidays_event') != null){
        $('#holidays').text($.cookie('holidays_event')+'天');
    }
    
    if($.cookie('holidays_single_event') != '' && $.cookie('holidays_single_event') != null){
        $('#holidays_single').text('¥'+numberWithCommas($.cookie('holidays_single_event')));
        
        if($.cookie('holidays_event') != '' && $.cookie('holidays_event') != null){
            $('#holidays_total').text('¥'+numberWithCommas(parseFloat(($.cookie('holidays_single_event')*$.cookie('holidays_event')).toFixed(2))));
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
    
    $(function () {
        $('.collapse .js-category-1').click(function () {
            $parent = $(this).parent('li');
            if ($parent.hasClass('js-show')) {
                $parent.removeClass('js-show');
            } else {
                $parent.siblings().removeClass('js-show');
                $parent.addClass('js-show');
            }
            $('.shop-collapse li').animate({
                marginTop: '0'
            }, 200);
        });

        $('.collapse .js-category-2').click(function () {
            $parent = $(this).parent('li');
            if ($parent.hasClass('js-show')) {
                $parent.removeClass('js-show');
                $parent.animate({
                    marginTop: '0'
                }, 200);
            } else {
                $parent.siblings().removeClass('js-show');
                $parent.addClass('js-show');
                $parent.animate({
                    marginTop: '-90px'
                }, 200);
            }
        });

        $('.collapse .js-category-3').click(function () {
            $parent = $(this).parent('li');
            if ($parent.hasClass('js-show')) {
                $parent.removeClass('js-show');
                $parent.animate({
                    marginTop: '0'
                }, 200);
            } else {
                $parent.siblings().removeClass('js-show');
                $parent.addClass('js-show');
                $parent.animate({
                    marginTop: '-90px'
                }, 200);
            }
        });
        
        $('.collapse .js-category-4').click(function () {
            $parent = $(this).parent('li');
            if ($parent.hasClass('js-show')) {
                $parent.removeClass('js-show');
                $parent.animate({
                    marginTop: '0'
                }, 200);
            } else {
                $parent.siblings().removeClass('js-show');
                $parent.addClass('js-show');
                $parent.animate({
                    marginTop: '-90px'
                }, 200);
            }
        });

    });
    
    //开始日期
    $('.date-start').on('focus', function () {
        var dt = new Date();
        var id=dt.getFullYear()+""+dt.getMonth() +""+dt.getDate()+""+dt.getHours()+""+ dt.getMinutes()+""+dt.getSeconds();
        var startD = $(this).attr('id');
        weui.datePicker({
            id: "start"+id,
            start: formatTime(date_n),
            end: "2021-01-31",
            cron: '* * *',
            defaultValue: [dt.getFullYear(),dt.getMonth()+1,dt.getDate()],
            depth: 2,
            onConfirm: function (result) {
                var month = result[1].value < 10 ? '0'+result[1].value : result[1].value;
                var dates = '';
                $.each($.parseJSON(sessionStorage.getItem("events_schedule")), function(i,v){
                    if(startD.split('_')[1] == v.shopNo && month == v.date.split('-')[1]){
                        if(v.enable == 1){
                            dates = dates + v.date.split('-')[2] + ',';
                        }
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
            end: "2021-01-31",
            defaultValue: [dt.getFullYear(),dt.getMonth()+1,dt.getDate()],
            depth: 2,
            onConfirm: function (result) {
                var month = result[1].value < 10 ? '0'+result[1].value : result[1].value;
                var dates = '';
                $.each($.parseJSON(sessionStorage.getItem("events_schedule")), function(i,v){
                    if(endD.split('_')[1] == v.shopNo && month == v.date.split('-')[1]){
                        if(v.enable == 1){
                            dates = dates + v.date.split('-')[2] + ',';
                        }
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
    
    $(".weui-input").each(function(){
        $(this).on("click", function() {
            $(this).removeClass("red-border");
        })
    })
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

function showExpectDatePicker(month,id,dates,type) {
    weui.datePicker({
        cron: dates+' '+month[1].value+' *',
        start: '2020-'+(month[1].value < 10 ? '0'+month[1].value : month[1].value)+'-01',
        end: '2021-01-31',
        depth: 3,
        onConfirm: function (result) {
            var month = result[1].label.replace("月","");
            if(month < 10) {
                month = "0"+month;
            }

            var date = result[2].label.replace("日","");

            if(date < day) {
                date = day;
            }
            
            if(date < 10) {
                date = "0"+date;
            }

            $('#'+id).val(result[0].label.replace("年","-") + month + ("-") + date);
            if(type == 0){
                var sEnd = IncrDate(result[0].label.replace("年","-") + month + ("-") + date);
                $.cookie('startDate_event',result[0].label.replace("年","-") + month + ("-") + date);
                var vdate = [];
                $.each($.parseJSON(sessionStorage.getItem("events_schedule")), function(i,v){
                    if(id.split('_')[1] == v.shopNo){
                        vdate.push(v.date);
                    }
                })
   
                for(var x=0;x<vdate.length;x++){
                    if($.inArray(sEnd, vdate) == -1){
                        if($('.date-end').val() == '') {
                            $('.date-end').val(DecrDate(sEnd));
                            $.cookie('endDate_event',DecrDate(sEnd));
                        }
                        getSubTotal(id);
                        return false;
                    } else {
                        sEnd = IncrDate(sEnd);
                    }
                }
            } else if(type == 1) {
                var sStart = DecrDate(result[0].label.replace("年","-") + month + ("-") + date);
                $.cookie('endDate_event',result[0].label.replace("年","-") + month + ("-") + date);
                var vdate = [];
                $.each($.parseJSON(sessionStorage.getItem("events_schedule")), function(i,v){
                    if(id.split('_')[1] == v.shopNo){
                        vdate.push(v.date);
                    }
                })
                
                for(var x=0;x<vdate.length;x++){
                    if($.inArray(sStart, vdate) == -1){
                        if($('.date-start').val() == '') {
                            $('.date-start').val(IncrDate(sStart));
                            $.cookie('startDate_event',IncrDate(sStart));
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

function getEventScheduleInfo() {
    var storeCode = 'OLMALL180917000003';
    if(getURLParameter('storeCode') && getURLParameter('storeCode') != 'undefined') {
        storeCode = getURLParameter('storeCode');
    }
    
    $.ajax({
        url: $.api.baseNew+"/comm-wechatol/api/shop/schedule/findAllByStoreCode?storeCode="+storeCode,
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
                var eventsSchedule = [];
                $.each(response.data, function(i,v){
                    if(v.unitType == 'EVENTS' && v.shopNo == getURLParameter('id')){
                        eventsSchedule.push(v);
                        
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
                                
                sessionStorage.setItem("events_schedule", JSON.stringify(eventsSchedule));
            } else {
                interpretBusinessCode(response.customerMessage);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}

function getSubTotal(id) {
    var code = id.split('_')[1];
    $.cookie('subTotal_event',0);
    $.subTotal = 0;
    var sDate = $('#dateStart_'+code).val();
    var eDate =  $('#dateEnd_'+code).val();
    var sArr = sDate.split("-");
    var eArr = eDate.split("-");
    var sRDate = new Date(sArr[0], sArr[1], sArr[2]);
    var eRDate = new Date(eArr[0], eArr[1], eArr[2]);
    var result = (eRDate-sRDate)/(24*60*60*1000)+1 || 1;
    var d = sDate;
    
    $.subTotal = 0;
    var holidays = 0, workdays = 0;
    for(var i=0; i<result; i++){
        $.each($.parseJSON(sessionStorage.getItem("events_schedule")), function(i,v){
            var amount = (v.basePrice*1.05).toFixed(2);
            if(code == v.shopNo && d == v.date){
                if(result >= 1 && result < 8){
                    amount = v.cprice;
                     
                    if(v.dateType == 'HOLIDAY'){
                        holidays++;
                        $.cookie('holidays_single_event',parseFloat((amount*1.05).toFixed(2)));
                    } else {
                        workdays++;
                        $.cookie('workdays_single_event',parseFloat((amount*1.05).toFixed(2)));
                    }
                } else if(result >= 8){
                    amount = v.dprice;
                    
                    if(v.dateType == 'HOLIDAY'){
                        holidays++;
                        $.cookie('holidays_single_event',parseFloat((amount*1.05).toFixed(2)));
                    } else {
                        workdays++;
                        $.cookie('workdays_single_event',parseFloat((amount*1.05).toFixed(2)));
                    }
                }

                $.subTotal = parseFloat(($.subTotal + parseFloat((amount*1.05).toFixed(2))).toFixed(2));
                $.cookie('total_event',$.subTotal);
                return false;
            }
        })
        d = IncrDate(d);
    }
    
    $.cookie('holidays_event',holidays);
    $('#holidays').text(holidays+'天');
    $.cookie('workdays_event',workdays);
    $('#workdays').text(workdays+'天');
    $('#workdays_single').text('¥'+numberWithCommas($.cookie('workdays_single_event')));
    $('#holidays_single').text('¥'+numberWithCommas($.cookie('holidays_single_event')));
    $('#workdays_total').text('¥'+numberWithCommas(parseFloat(($.cookie('workdays_single_event')*workdays).toFixed(2))));
    $('#holidays_total').text('¥'+numberWithCommas(parseFloat(($.cookie('holidays_single_event')*holidays).toFixed(2))));
    
    $.cookie('subTotal_event',$.subTotal + parseFloat(($.subTotal*0.2).toFixed(2)));
    $('#subTotal').text('¥'+numberWithCommas($.subTotal + parseFloat(($.subTotal*0.2).toFixed(2))));
    $.cookie('eventDeposit',parseFloat(($.subTotal*0.2).toFixed(2)));
    $('#deposit').text('¥'+numberWithCommas(parseFloat(($.subTotal*0.2).toFixed(2))));
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
                        
                            if(v.vr != null){
                                $('#vr').attr('src',v.vr);
                            }

                            $('#shopName').text(v.shopNo);
                            $.cookie('shopName',v.shopNo);
                            $('#area').text(v.area);
                            $.cookie('area',v.area);
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
                                if (index >= 0) {
                                    removeFavorite($.favoritesId[$.inArray(getURLParameter('id'), $.favorites)], v.buildingCode, getURLParameter('id'), v.storeCode, v.unitCode);
                                } else {
                                    addToFavorite($.updateFavoritesId[$.inArray(getURLParameter('id'), $.updateFavorites)],v.buildingCode, getURLParameter('id'), v.storeCode, v.unitCode);
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
       findUserCompanyByMobileNo(u);
    }

    var goCheck;
    $('#choose_event').click(function(){
        goCheck = 1;
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
            window.location.href = '/v2/improve-info?id='+getURLParameter('id')+'&type=events&storeCode='+getURLParameter('storeCode');
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
                
                if(response.data.length > 0){
                    if(response.data[0].name != '' && response.data[0].uscc != '' && response.data[0].name != null && response.data[0].uscc != null){
                        $.order.uscc = response.data[0].uscc;
                        $.order.company = response.data[0].name;
                        $.order.businessScope = response.data[0].businessScope;
                        saveOrder(u);
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
        "appid": "",
        "brandId": "",
        "brandName": $.cookie('brand_1'),
        "code": unit,
        "contractInfos": [
          {
            "amount": $.cookie('total_event'),
            "bizScope": $.order.businessScope,
            "breachAmount": "",
            "code": unit,
            "depositAmount": $.cookie('eventDeposit'),
            "electricBillFlag": "1",
            "endDate": $.cookie('endDate_event'),
            "enterDate": "",
            "isCleaning": "0", //额外保洁数量 
            "isSecurity": "0", //额外保安数量
            "isService": "0", //额外服务数量
            "mobileNo": $.cookie('uid'),
            "name": $.cookie('eventName'),  //活动名称
            "num": 1,
            "openDate": $.cookie('startDate_event'),
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
            "startDate": $.cookie('startDate_event'),
            "unitCode": unit,
            "unitDesc":  $.cookie('shopName'),
            "unitId": "sfsdfsfasfsfasdfasdf",
            "userId": $.cookie('uid'),
            "vipFlag": "1",
            "wxCardFlag": "1",
            "area": $.cookie('area'), //广告默认传1
            "shopCode": getURLParameter('id')
          }
        ],
        "contractNo": "",
        "contractTermInfos": [
          {
            "amount": $.cookie('total_event'),//总价
            "code": "1",
            "endDate": $.cookie('endDate_event'),
            "name": "",
            "orgCode": orgCode,
            "outTradeNo": outTradeNo,
            "rentAmount": parseFloat(($.cookie('total_event')/1.05/$.cookie('area')).toFixed(2)), //单价
            "startDate": $.cookie('startDate_event'),
            "taxAmount": parseFloat(($.cookie('total_event')/1.05).toFixed(2)),//不含税总价
            "termType": "B013", // 工作日 B013 节假日 B103
            "termTypeName": "固定租金",
            "unitCode": unit,
            "unitId": "sfsdfsfasfsfasdfasdf",
            "area": $.cookie('area'),
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