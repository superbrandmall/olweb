$.favorites = new Array();
$.favoritesId = new Array();

$.order = {
    copy: "",
    building: "",
    mall: "",
    unit: "",
    id: "",
    uscc: "",
    company: ""
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
    getMyFavorites();
    getShopInfo();
    getEventScheduleInfo();
    
    if($.cookie('subTotal') != '' && $.cookie('subTotal') != null){
        $('#subTotal').text(numberWithCommas($.cookie('subTotal')));
    }
    
    if($.cookie('startDate') != '' && $.cookie('startDate') != null){
        $('.date-start').val($.cookie('startDate'));
    }
    
    if($.cookie('endDate') != '' && $.cookie('endDate') != null){
        $('.date-end').val($.cookie('endDate'));
    }

    $('.slide').swipeSlide({
        autoSwipe: true,
        continuousScroll: true,
        transitionType: 'ease-in',
        lazyLoad: true
    });
    
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
                    marginTop: '-40px'
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
            end: "2020-12-31",
            cron: '* * *',
            defaultValue: [dt.getFullYear(),dt.getMonth()+1,dt.getDate()],
            depth: 2,
            onConfirm: function (result) {
                var month = result[1].value < 10 ? '0'+result[1].value : result[1].value;
                var dates = '';
                $.each($.parseJSON(sessionStorage.getItem("events_schedule")), function(i,v){
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
                $.each($.parseJSON(sessionStorage.getItem("events_schedule")), function(i,v){
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
                $.each($.parseJSON(sessionStorage.getItem("events_schedule")), function(i,v){
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
                $.each($.parseJSON(sessionStorage.getItem("events_schedule")), function(i,v){
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

function getEventScheduleInfo() {
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
                var eventsSchedule = [];
                $.each(response.data, function(i,v){
                    if(v.unitType == 'EVENTS' && v.shopNo == getURLParameter('id')){
                        eventsSchedule.push(v);
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
    $.cookie('subTotal',0);
    var sDate = $('#dateStart_'+code).val();
    var eDate =  $('#dateEnd_'+code).val();
    var sArr = sDate.split("-");
    var eArr = eDate.split("-");
    var sRDate = new Date(sArr[0], sArr[1], sArr[2]);
    var eRDate = new Date(eArr[0], eArr[1], eArr[2]);
    var result = (eRDate-sRDate)/(24*60*60*1000) || 1;
    
    var d = sDate;
    for(var i=0; i<result; i++){
        var workPrice = 0, holidayPrice = 0;
        $.each($.parseJSON(sessionStorage.getItem("events_schedule")), function(i,v){
            var amount = (v.basePrice*1.05).toFixed(2);
            if(code == v.shopNo && d == v.date){
                if(result >= 1 && result < 3){
                    amount = v.aprice;
                } else if(result == 3){
                    amount = v.bprice;
                } else if(result >= 4 && result < 8){
                    amount = v.cprice;
                } else if(result >= 8){
                    amount = v.dprice;
                }
                
                if(v.dateType == 'WORK'){
                    workPrice = amount;
                } 
                
                if(v.dateType == 'HOLIDAY'){
                    holidayPrice = amount;
                }
                
                $.subTotal = $.subTotal + parseFloat((amount*1.05).toFixed(2));
                return false;
            }
        })
        d = IncrDate(d);
    }
    $.cookie('subTotal',$.subTotal);
    $('#subTotal').text(numberWithCommas($.subTotal));
    //console.log(workPrice+','+holidayPrice);
}

function getShopInfo() {
    var shopCode = getURLParameter('id') || null;
    var userCode = $.cookie('uid');
    $.ajax({
        url: $.api.baseNew + "/onlineleasing-customer/api/shop/" + shopCode + "?userCode=" + userCode + "",
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

                if (response.data.code == shopCode) {
                    getShopsMoreInfo(response.data.unit);
                    
                    $('#vr').click(function () {
                        showVR(response.data.vr);
                    })
                        
                    $('#shopName').text(response.data.shopName);
                    $.cookie('shopName',response.data.shopName);
                    $('#area').text(response.data.area);
                    $.cookie('area',response.data.area);
                    $('#area_spesifc').text(response.data.remark_1 != null ? '(' + response.data.remark_1 + ')' : '');
                    $('#height').text(response.data.remark_2 != null ? response.data.remark_2 : '');
                    $('#desc').text(response.data.remark_7 != null ? response.data.remark_7 : '');
                    
                    $('#electricity').text(response.data.remark_3 != null ? response.data.remark_3 : '');
                    $('#wire_towing').text(response.data.remark_4 != null ? response.data.remark_4 : '');
                    $('#elevator_size').text(response.data.remark_5 != null ? response.data.remark_5 : '');
                    $('#network_type').text(response.data.remark_6 != null ? response.data.remark_6 : '');
                    
                    $('#security').text(response.data.remark_8 != null ? response.data.remark_8 : '');
                    $('#garbage').text(response.data.remark_9 != null ? response.data.remark_9 : '');
                    $('#management').text(response.data.remark_10 != null ? response.data.remark_10 : '');
                    $('#infra').text(response.data.responsiblePerson != null ? response.data.responsiblePerson : '');
                
                    var index = $.inArray(getURLParameter('id'), $.favorites);
                    if (index >= 0) {
                        $('#favourite').html('<i class="fa fa-heart" aria-hidden="true" style="color: #f60;"></i><br>取消收藏');
                    }

                    $('#favourite').click(function () {
                        if (index >= 0) {
                            removeFavorite($.favoritesId[$.inArray(getURLParameter('id'), $.favorites)], response.data.buildingCode, getURLParameter('id'), response.data.mallCode, response.data.unit);
                        } else {
                            addToFavorite(response.data.buildingCode, getURLParameter('id'), response.data.mallCode, response.data.unit);
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

    $('#choose_event').click(function(){
        window.location.href = '/v2/improve-info?id='+getURLParameter('id')+'&type=event&storeCode='+getURLParameter('storeCode');
    });

    /*$.ajax({
        url: $.api.baseNew + "/comm-wechatol/api/shop/base/findAllByStoreCode?storeCode=OLMALL180917000003",
        type: "GET",
        async: false,
        dataType: "json",
        contentType: "application/json",
        beforeSend: function (request) {
            showLoading();
            request.setRequestHeader("Lang", $.cookie('lang'));
            request.setRequestHeader("Source", "onlineleasing");
        },
        complete: function () {},
        success: function (response, status, xhr) {
            if (response.code === 'C0') {
                hideLoading();
            } else {
                interpretBusinessCode(response.customerMessage);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
        }
    });*/
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
                        saveOrder(u);
                    }
                } else {
                    window.location.href = '/v2/improve-info?id='+getURLParameter('id')+'&type=event&storeCode='+getURLParameter('storeCode');
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
        "appid": "test",
        "brandId": "",
        "brandName": $.cookie('brand_1'),
        "code": unit,
        "contractInfos": [
          {
            "amount": $.cookie('subTotal'),
            "bizScope": "testss",
            "breachAmount": "",
            "code": unit,
            "depositAmount": parseFloat(($.cookie('subTotal')*0.2).toFixed(2)),
            "electricBillFlag": "1",
            "endDate": $.cookie('endDate'),
            "enterDate": "",
            "isCleaning": "0", //额外保洁数量 
            "isSecurity": "0", //额外保安数量
            "isService": "0", //额外服务数量
            "mobileNo": $.cookie('uid'),
            "name": "test name",
            "num": 1,
            "openDate": "",
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
            "startDate": $.cookie('startDate'),
            "unitCode": unit,
            "unitDesc":  $.cookie('shopName'),
            "unitId": "sfsdfsfasfsfasdfasdf",
            "userId": "10000101",
            "vipFlag": "1",
            "wxCardFlag": "1",
            "area": $.cookie('area') //广告默认传1
          }
        ],
        "contractNo": "",
        "contractTermInfos": [
          {
            "amount": $.cookie('subTotal'),
            "code": "1",
            "endDate": $.cookie('endDate'),
            "name": "",
            "orgCode": orgCode,
            "outTradeNo": outTradeNo,
            "rentAmount": parseFloat(($.cookie('subTotal')/1.05).toFixed(2)),
            "startDate": $.cookie('startDate'),
            "taxAmount": parseFloat(($.cookie('subTotal')/1.05*0.05).toFixed(2)),
            "termType": "B031", // 工作日 B013 节假日 B103
            "termTypeName": "固定租金",
            "unitCode": unit,
            "unitId": "sfsdfsfasfsfasdfasdf",
            "area": $.cookie('area')
          }
        ],
        "contractType": "R5",//R1租赁 R4广告 R5场地
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
                generateContract(response.data.id,'订单合同已生成','您的订单【'+mallName+'】场地单元【'+unit+'】合同已生成，请前往我的订单管理页面查看。',outTradeNo, '我的消息',unit,'/v2/stamping');
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
                    if (v.remarkSecond == 1) {
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
        "unitType": "event",
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