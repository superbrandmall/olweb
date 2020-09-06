$.favorites = new Array();
$.favoritesId = new Array();

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
                    marginTop: '-300px'
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
});

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
                    getShopsMoreInfo(response.data.unit, response.data.shopName, response.data.area, response.data.shopState, response.data.daysBeforeContractExpire);
                    
                    $('#vr').click(function () {
                        showVR('/'+response.data.vr);
                    })
                        
                    $('#shopName').text(response.data.shopName);
                    $('#area').text(response.data.area);
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
                
                    $('#choose_event').click(function(){
                        SaveOrder(response.data.hdCode,response.data.code,response.data.shopName,response.data.area);
                    });
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

function getShopsMoreInfo(u, sn, a, ss, dbce) {
    findUserCompanyByMobileNo();

    $.ajax({
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

                //$.each(response.data, function (i, v) {
                    //if (u == v.unitCode) {
                        
                    //}
                //})
            } else {
                interpretBusinessCode(response.customerMessage);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
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
        "unitType": "leasing",
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
        "unitType": "leasing"
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

function SaveOrder(uc,sc,un,ar){
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

    var order = {
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
            "amount": "", //$('#user_offer').val()
            "code": "1",
            "endDate": $('#endDate').text(),
            "name": "",
            "orgCode": "100001",
            "outTradeNo": outTradeNo,
            "rentAmount": "",
            "startDate": $('#startDate').text(),
            "taxAmount": "", //($('#user_offer').val() - $('#user_offer').val()*0.05).toFixed(2)
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
        "orderStates": "合同已生成", //订单状态
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
                
                saveMsgLog('订单合同已生成','您的订单【陆家嘴正大广场】场地单元【'+order.contractInfos[0].remarkSecond+'】合同已生成，请前往我的订单管理页面查看。',getURLParameter('trade'), '我的消息',order.contractInfos[0].unitCode,'/v2/contract?type=events&id='+getURLParameter('id'));
            } else {
                interpretBusinessCode(response.customerMessage);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}

function findUserCompanyByMobileNo(){
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
                            showCalendar();
                    } else {
                        window.location.href = '/v2/company-info?id='+getURLParameter('id')+'&type=events';
                    }
                } else {
                    window.location.href = '/v2/company-info?id='+getURLParameter('id')+'&type=events';
                }
            }
        }
    })
}

function showCalendar() {
    var data = [{
        'name': "145",
        'startDate': "2020-3-09 15:31:29",
        'type': "手机号"
    }, {
        'name': "178956874",
        'startDate': "2020-3-23 15:31:29",
        'type': "手机号"
    }, {
        'name': "信息编辑",
        'startDate': "2020-3-20 15:31:29",
        'type': "手机号"
    }];

    var workdata=[
        "2020-4-26",
        "2020-5-9",
        "2020-6-28",
        "2020-9-27",
        "2020-10-10"
    ]
    
    var holidaydata = [{
        "holiday_name":"春节",
        "holiday_time":[
            "2020-1-24",
            "2020-1-25",
            "2020-1-26",
            "2020-1-27",
            "2020-1-28",
            "2020-1-29",
            "2020-1-30",
            "2020-1-31",
            "2020-2-1",
            "2020-2-2"
        ]},{
        "holiday_name":"清明节",
        "holiday_time":[
            "2020-4-4",
            "2020-4-5",
            "2020-4-6"
        ]},{
        "holiday_name":"劳动节",
        "holiday_time":[
            "2020-5-1",
            "2020-5-2",
            "2020-5-3",
            "2020-5-4",
            "2020-5-5"
        ]},{
        "holiday_name":"端午节",
        "holiday_time":[
            "2020-6-25",
            "2020-6-26",
            "2020-6-27"
        ]},{
        "holiday_name":"国庆节、中秋节",
        "holiday_time":[
            "2020-10-1",
            "2020-10-2",
            "2020-10-3",
            "2020-10-4",
            "2020-10-5",
            "2020-10-6",
            "2020-10-7",
            "2020-10-8"
        ]}];
    
    $("#calendar").calendar({
        data: data, //获取记录数据
        holiday: holidaydata, //规划假日时间
        work: workdata,//规划上班时间
        mode: "month",//显示模式，month为月份详细显示， year为年显示
        width: $('.js-category-2').width(),
        showModeBtn: false,//是否显示月/年却换模式
        showEvent: true,//设置年份显示记录信息，为true显示每月记录信息，为false不显示记录信息
        /*cellClick: function(data, me, lay) {

        },*/
        monthClick: function(Event, nextMonth, opts, me) {
            // Event 当前事件  nextMonth月份，opts参数 ，me集合
            //点击月份的处理方法
            //开始月份第一天
            var start = me._cloneDate(opts.newDate);
            start.setDate(1);
            // 获取当前月的最后一天
            var date = new Date();
            var nextMonthFirstDay = new Date(date.getFullYear(), nextMonth, 1);
            var oneDay = 1000 * 60 * 60 * 24;
            var end = new Date(nextMonthFirstDay - oneDay);
            var startDate = me.transferDate(start); // 日期变换
            var endDate = me.transferDate(end); // 日期变换
            var cycleData = [{
                'name': "145",
                'startDate': "2020-2-09 15:31:29",
                'type': "手机号"
            }, {
                'name': "178956874",
                'startDate': "2020-2-23 15:31:29",
                'type': "手机号"
            }]//数据结构，以往记录数据，可通过ajax获取
            me._refreshCalendar(opts.newDate, cycleData);//加载方法
            
            calendarCellClick();
        }
    })
    
    calendarCellClick();
}
var firstIndex = 41;
function calendarCellClick() {
    var indexCell;
    $('.calendar-cell').not('.calendar-last-month-cell').click(function(){ 
        indexCell = $(".calendar-cell").index(this);
        if(indexCell < firstIndex){
            firstIndex = indexCell;
        }
        
        $('#startDate').text($(".calendar-cell:eq("+firstIndex+")").attr('title'));
        ($(this).attr("title"));
        
        var indexCells = parseInt(indexCell+7);
        var i = firstIndex;
        while(i < indexCells){
            $(".calendar-cell:eq("+i+")").addClass('active');
            i++;
        }
        
        $('#endDate').text($(".calendar-cell:eq("+(indexCells-1)+")").attr('title'));
        
    })
}