$.favorites = new Array();
$.favoritesId = new Array();
$.updateFavorites = new Array();
$.updateFavoritesId = new Array();

$.order = {
    copy: "",
    building: "",
    mall: "",
    unit: "",
    id: "",
    uscc: "",
    company: "",
    businessScope: "",
    expectDate: "",
    expect: ""
};

var unitCodes = ["01FL087","01FL059","01FL065","01FL071","01FL097","07FL036","07FL059","07FL060",
    "1F-37","2F-44B","3F-11","4F-37","4F-38","4F","5F-06","5F-50B","6F-24","6F-50",
    "B1FL009","B1FL022","B1FL010","01FL009","01FL015",
    "HB1FL070H","HB1FL072H","C01FL003C","E02FL001E","F02FL002F"];
var vr;

var d = new Date();
var month = d.getMonth()+1;
var day = d.getDate();
var time = d.getTime();
var date = d.getFullYear() + '-' +
    (month<10 ? '0' : '') + month + '-' +
    (day<10 ? '0' : '') + day;

$(document).ready(function(){
    if(!$.cookie('categorySelected') || $.cookie('categorySelected') == '' || $.cookie('categorySelected') == null) {
        window.location.href = '/v2/category?id='+getURLParameter('id')+'&type=leasing&storeCode='+getURLParameter('storeCode');
    } else {
        if($.cookie('categorySelected').split('::')[3] == getURLParameter('id')){
            var storeCode = 'OLMALL180917000003';
            if(getURLParameter('storeCode') && getURLParameter('storeCode') != 'undefined') {
                storeCode = getURLParameter('storeCode');
            }

            if(storeCode != $.cookie('categorySelected').split('::')[2]){
                window.location.href = '/v2/category?id='+getURLParameter('id')+'&type=leasing&storeCode='+getURLParameter('storeCode');
            }
        } else {
            window.location.href = '/v2/category?id='+getURLParameter('id')+'&type=leasing&storeCode='+getURLParameter('storeCode');        
        }
    }
    
    if(getURLParameter('info') && getURLParameter('info') == 'done'){
        showLoading();
    }
    
    if(isAndroid() == true) {
        showIndexPix();
    } else {
        document.addEventListener('WeixinJSBridgeReady', function() {
            $('#pix_4').hide();
            $('#video_4').show();
            
            document.getElementById('video_4').play(); 
        },false);
    }
    
    getMyFavorites();
    getShopInfo();
    
    $('#cad').click(function(){
        showDialog();
    })
    
    $('a.weui-dialog__btn').on('click', function(){
        $(this).parents('.js_dialog').fadeOut(200);
    });
    
    $('#floor_plan').on('click', function(){
        $('#floor_plan_viewer').fadeIn(200);
    });
    
    $('#call').click(function(){
        if($.cookie('uid') == '' || $.cookie('uid') == null){
            window.location.href = '/v2/login?id='+getURLParameter('id')+'&type='+getURLParameter('type')+'&storeCode='+getURLParameter('storeCode');
        } else {
            showAppointmentDialog();
        }
    })
    
    $('#orderType').click(function(){
        showOrderTypeDialog();
    })
    
    $(".radio-label").change(function() {
        if($('#reserve_button').prop("checked")) {
            $('#reserve_p').fadeIn();
            $('#esign_p').hide();
        } else if($('#esign_button').prop("checked")) {
            $('#esign_p').fadeIn();
            $('#reserve_p').hide();
        }
    }); 
    
    var datetime = '';
    $("#appointmentTime").datetimePicker({
        title: '请选择看铺时间',
        years: [2021],
        monthes: ['04','05'],
        times: function () {
            return [
                {
                    values: (function () {
                        var hours = [];
                        for (var i=10; i<18; i++) hours.push(i > 9 ? i : '0'+i);
                        return hours;
                    })()
                },
                {
                    divider: true,  // 这是一个分隔符
                    content: '时'
                }
            ];
        },
        onClose: function (picker, values, displayValues) {
        }
    });
});

function getShopInfo(){
    var shopCode = getURLParameter('id') || null;
    
    var mall = 'shanghai-sbm';
    if(getURLParameter('storeCode') && getURLParameter('storeCode') != 'undefined') {
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
        url: $.api.baseNew+"/onlineleasing-customer/api/shop/"+shopCode,
        type: "GET",
        async: false,
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
                
                if(response.data.code == shopCode){
                    var index = $.inArray(response.data.unit, unitCodes);
                    if(index >= 0){
                        getShopsMoreInfo(response.data.unit);

                        $('#shopName').text(response.data.shopName);
                        $.cookie('shopName',response.data.shopName);
                        $('#area').text(response.data.area);
                        $.cookie('area',response.data.area);
                        $.cookie('shopNo',response.data.unit);

                        $('#negotiate').click(function(){
                            window.location.href = '/v2/negotiation?code='+getURLParameter('id')+'&unit='+response.data.unit+'&building='+response.data.buildingCode+'&mall='+response.data.mallCode+'&name=0';
                        });

                        var floorName;
                        $.each($.parseJSON(sessionStorage.getItem("floors")), function(i,v) {
                            if(v.floorCode == response.data.floorCode) {
                                floorName = v.description;
                                return false;
                            }
                        });

                        $('#floor_plan').on('click', function(){
                            if(response.data.floorCode != null) {
                                GetMap(floorName,mall,response.data.mallCode);
                            }
                        });
                    } else {
                        $('body').html('<div class="weui-gallery" style="display: block; opacity: 1;">\n\
                            <span class="weui-gallery__img" style="background-image: url(/views/assets/base/img/content/backgrounds/product_removed.jpg);"></span>\n\
                            <div class="weui-gallery__opr">\n\
                                <a href="javascript:" class="weui-gallery__del">\n\
                                    <i class="weui-icon-cancel" style="color: #fff;" onclick="$(&quot;.weui-gallery&quot;).hide();"></i>\n\
                                </a>\n\
                            </div>\n\
                        </div>');
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

function getShopsMoreInfo(u) {
    var storeCode = 'OLMALL180917000003';
    if(getURLParameter('storeCode') && getURLParameter('storeCode') != 'undefined') {
        storeCode = getURLParameter('storeCode');
    }
    
    $.ajax({
        url: $.api.baseNew+"/comm-wechatol/api/shop/base/findAllByStoreCodeAndUnitCodeAndCategoryCode?storeCode="+storeCode+"&unitCode="+u+"&categoryCode="+$.cookie('categorySelected').split('::')[0],
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
                
                var settleDate = '';
                var openDate = '';
                var rentAmount = '';
                var taxAmount = '';
                var amount = '';
                var deductionTaxAmount = '';
                var propertyMaintenanceRentAmount = '';
                var taxPropertyMaintenance = '';
                var propertyMaintenance = '';
                var promotionRate = '';

                if(u == response.data.unitCode){
                    var leasingState;
                    var expireDay = '';
                    
                    switch (response.data.state) {
                        case 1:
                            leasingState = '<small class="bg-light-red f-orange" style="padding: 2px 5px;">该铺位目前可签约</small>';
                            break;
                        case 2:
                            leasingState = '<small class="bg-light-red f-orange" style="padding: 2px 5px;">该铺位目前可签约</small>';
                            break;
                        case 3:
                            leasingState = '<small class="bg-light-red f-orange" style="padding: 2px 5px;">该铺位已与租户进入线上签约阶段</small>';
                            break;
                        case 4:
                            leasingState = '<small class="bg-light-red f-orange" style="padding: 2px 5px;">该铺位已与租户完成签约进入付款阶段</small>';
                            break;
                        case 0:
                            leasingState = '<small class="bg-light-red f-orange" style="padding: 2px 5px;">该铺位已下架</small>';
                            break;    
                        default:
                            leasingState = '';
                            break;
                    }
                    
                    $('.page__bd ul li:first-child .js-category-1').prepend(leasingState);
                    $('#desc').text(response.data.descript);
                    $('#businessFormatChs').text($.cookie('categorySelected').split('::')[1]);
                    $('#freeOfGroundRent').text(response.data.freeOfGroundRent);
                    $.cookie('contractLength',response.data.contractLength);

                    var totalAmount = 0;
                    for(var x = 1; x <= response.data.contractLength; x++){
                        $.each(response.data.shopRentWxs, function(k,y){
                            if(y.code == x && y.termTypeName == "固定租金"){
                                rentAmount = y.rentAmount;
                                $.cookie('rentAmount_'+x, y.rentAmount);
                                taxAmount = y.taxAmount;
                                $.cookie('taxAmount_'+x, y.taxAmount);
                                amount = y.amount;
                                $.cookie('amount_'+x, y.amount);
                            }
                            if(y.code == x && y.termTypeName == "提成扣率"){
                                deductionTaxAmount = y.taxAmount;
                                $.cookie('taxDeductionTaxAmount_'+x, y.taxAmount);
                                $.cookie('deductionTaxAmount_'+x, y.amount);
                            }
                            if(y.code == x && y.termTypeName == "物业管理费"){
                                propertyMaintenanceRentAmount = y.rentAmount;
                                $.cookie('propertyMaintenanceRentAmount_'+x, y.rentAmount);
                                taxPropertyMaintenance = y.taxAmount;
                                $.cookie('taxPropertyMaintenance_'+x, y.taxAmount);
                                propertyMaintenance = y.amount;
                                $.cookie('propertyMaintenance_'+x, y.amount);
                            }
                            if(y.code == x && y.termTypeName == "推广费"){
                                promotionRate = y.taxAmount;
                                $.cookie('taxPromotionRate_'+x, y.taxAmount);
                                $.cookie('promotionRate_'+x, y.amount);
                            }
                            if(y.termTypeName == "租赁保证金"){
                                $('#deposit').text(numberWithCommas(y.amount));
                                $.cookie('deposit',y.amount);
                                totalAmount = y.amount;
                            }
                        })

                        $('#shopRent').append('<tr>\n\
                        <td style="text-align: center;">第'+x+'年</td>\n\
                        <td style="text-align: center;">¥'+rentAmount+'</td>\n\
                        <td style="text-align: center;">'+deductionTaxAmount+'%</td>\n\
                        <td style="text-align: center;">¥'+numberWithCommas(taxAmount)+'</td>\n\
                        <td style="text-align: center;">¥'+numberWithCommas(amount)+'</td></tr>');
                    }

                    totalAmount = (totalAmount + parseFloat(($.cookie('amount_1'))) + parseFloat($.cookie('propertyMaintenance_1')) + 3000).toFixed(2);
                    $('#totalAmount').text(numberWithCommas(totalAmount));
                    $.cookie('totalAmount', totalAmount);
                    
                    $('#rentAmount').text($.cookie('rentAmount_1'));
                    $('#propertyMaintenance').html('<tr>\n\
                        <td style="text-align: center;">¥'+propertyMaintenanceRentAmount+'</td>\n\
                        <td style="text-align: center;">¥'+numberWithCommas(taxPropertyMaintenance)+'</td>\n\
                        <td style="text-align: center;">¥'+numberWithCommas(propertyMaintenance)+'</td></tr>');
                    $('#promotionRate').text(promotionRate);
                    if(!$.cookie('settleDate') || $.cookie('settleDate') == '' || $.cookie('settleDate') == null) {
                        $('#settleDate').text(IncrDates(date,7));
                        $.cookie('settleDate',IncrDates(date,7));
                    } else {
                        $('#settleDate').text($.cookie('settleDate'));
                    }

                    $('#settleDate').on('click', function () {
                        weui.datePicker({
                            start: IncrDates(date,7),
                            end: IncrDates(date,30),
                            onConfirm: function (result) {
                                var month = result[1].value < 10 ? '0'+result[1].value : result[1].value;
                                var dates = result[2].value < 10 ? '0'+result[2].value : result[2].value;
                                settleDate = result[0].value+'-'+month+'-'+dates;
                                $('#settleDate').text(settleDate);
                                $.cookie('settleDate',settleDate);
                                openDate = IncrDates(settleDate,parseInt(response.data.freeOfGroundRent));
                                $('#openDate').text(openDate);
                                $.cookie('openDate',openDate);
                            },
                            title: '选择进场日期'
                        });
                    });

                    if(response.data.freeOfGroundRent != ''){
                        openDate = IncrDates($.cookie('settleDate'),parseInt(response.data.freeOfGroundRent)) || '';
                    }

                    $('#openDate').text(openDate);
                    $.cookie('openDate',openDate);
                    
                    $('#vr').click(function () {
                        if(response.data.remarkFirst != null){
                            showVR(response.data.remarkFirst);
                        }
                    })

                    $('#engineering_qa').click(function(){
                        //showVideo("https://www.xinpianchang.com/a10824429");
                    })

                    var index = $.inArray(getURLParameter('id'), $.favorites);
                    if(index >= 0){
                        $('#favourite').html('<i class="fa fa-heart" aria-hidden="true" style="color: #f60;"></i><br>取消收藏');
                    }

                    $('#favourite').click(function(){
                        if(index >= 0){
                            removeFavorite($.favoritesId[$.inArray(getURLParameter('id'), $.favorites)],response.data.buildingCode,getURLParameter('id'),response.data.storeCode,u);
                        } else {
                            addToFavorite($.updateFavoritesId[$.inArray(getURLParameter('id'), $.updateFavorites)],response.data.buildingCode,getURLParameter('id'),response.data.storeCode,u);
                        }
                    })

                    if(getURLParameter('info') && getURLParameter('info') == 'done'){
                        if($.cookie('orderShopCode') != getURLParameter('id')){
                            findUserCompanyByMobileNo(u);
                        } else {
                            window.location.replace('/v2/shop?id='+getURLParameter('id')+'&type='+getURLParameter('type')+'&storeCode='+getURLParameter('storeCode')+'&payment='+getURLParameter('payment'));
                        }
                    }
                    
                    $("#confirm_price").click(function () {
                        if($('#reserve_button').prop("checked")) {
                            window.location.href = '/v2/improve-info2?id='+getURLParameter('id')+'&type=leasing&storeCode='+getURLParameter('storeCode');
                        } else if($('#esign_button').prop("checked")) {
                            window.location.href = '/v2/improve-info?id='+getURLParameter('id')+'&type=leasing&storeCode='+getURLParameter('storeCode');                       
                        }
                    });
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
                    window.location.href = '/v2/improve-info?id='+getURLParameter('id')+'&type=leasing&storeCode='+getURLParameter('storeCode');
                }
            }
        }
    })
}

function saveOrder(ut){
    showLoading();
    
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
    
    var payType = 'full';
    var orderStates = '合同已生成';
    if(getURLParameter('payment') && getURLParameter('payment') == 'deposit'){
        payType= 'deposit';
        orderStates = '定金待支付';
    }
    
    var unit = ut;
    var endDate;
    if($.cookie('contractLength') > 1) {
        endDate = $.cookie('termEndDate_2');
    } else if($.cookie('contractLength') > 2) {
        endDate = $.cookie('termEndDate_3');
    }
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
     *  定金待支付
     *  已完成订单
     *  已关闭订单
     */

    var map = {
        "amount": 1000,
        "appid": $.api.appId,
        "openid": openid,
        "unionId": unionid,
        "brandId": "",
        "brandName": $.cookie('brand_1'),
        "code": unit,
        "contractInfos": [
          {
            "amount": $.cookie('totalAmount'),
            "bizScope": $.order.businessScope,
            "breachAmount": "",
            "categoryCode": $.cookie('categorySelected').split('::')[0],
            "categoryName": $.cookie('categorySelected').split('::')[1],
            "code": unit,
            "depositAmount": $.cookie('deposit'),
            "electricBillFlag": "1",
            "endDate": DecrDate(IncrYears($.cookie('settleDate'),$.cookie('contractLength'))),
            "enterDate": $.cookie('settleDate'),
            "isCleaning": "0",
            "isSecurity": "0",
            "isService": "0",
            "mobileNo": $.cookie('uid'),
            "name": "test name",
            "num": 1,
            "openDate": $.cookie('openDate'),
            "orgCode": orgCode,
            "otherFlag": "",
            "outTradeNo": outTradeNo,
            "remarkFifth": "",
            "remarkFirst": "",
            "remarkFourth": "",
            "remarkSecond": "",
            "remarkThird": "",
            "salesFlag": "1",
            "serviceDepositAmount": 0, // 公共事业费押金
            "size": "", //广告尺寸规格
            "spec": "",
            "startDate": $.cookie('settleDate'),
            "unitCode": unit,
            "unitDesc": $.cookie('shopName'),
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
            "amount": $.cookie('amount_1'),
            "code": "1",
            "endDate": DecrDate(IncrYear($.cookie('settleDate'))),
            "name": "",
            "orgCode": orgCode,
            "outTradeNo": outTradeNo,
            "rentAmount": $.cookie('rentAmount_1'),
            "startDate": $.cookie('openDate'),
            "taxAmount": $.cookie('taxAmount_1'),
            "termType": "B011",
            "termTypeName": "固定租金",
            "unitCode": unit,
            "unitId": "sfsdfsfasfsfasdfasdf",
            "area": $.cookie('area'),
            "shopCode": getURLParameter('id')
          },
          {
            "amount": $.cookie('propertyMaintenance_1'),
            "code": "1",
            "endDate": DecrDate(IncrYear($.cookie('settleDate'))),
            "name": "",
            "orgCode": orgCode,
            "outTradeNo": outTradeNo,
            "rentAmount": $.cookie('propertyMaintenanceRentAmount_1'),
            "startDate": $.cookie('openDate'),
            "taxAmount":  $.cookie('taxPropertyMaintenance_1'),
            "termType": "B021",
            "termTypeName": "物业管理费",
            "unitCode": unit,
            "unitId": "sfsdfsfasfsfasdfasdf",
            "area":  $.cookie('area'),
            "shopCode": getURLParameter('id')
          },
          {
            "amount": $.cookie('propertyMaintenance_1'),
            "code": "1",
            "endDate": DecrDate($.cookie('openDate')),
            "name": "",
            "orgCode": orgCode,
            "outTradeNo": outTradeNo,
            "rentAmount": $.cookie('propertyMaintenanceRentAmount_1'),
            "startDate": $.cookie('settleDate'),
            "taxAmount":  $.cookie('taxPropertyMaintenance_1'),
            "termType": "B031",
            "termTypeName": "装修期物业管理费",
            "unitCode": unit,
            "unitId": "sfsdfsfasfsfasdfasdf",
            "area":  $.cookie('area'),
            "shopCode": getURLParameter('id')
          },
          {
            "amount": $.cookie('promotionRate_1'),
            "code": "1",
            "endDate": DecrDate(IncrYears($.cookie('settleDate'),$.cookie('contractLength'))),
            "name": "",
            "orgCode": orgCode,
            "outTradeNo": outTradeNo,
            "startDate": $.cookie('openDate'),
            "taxAmount": $.cookie('taxPromotionRate_1'),
            "termType": "G021",
            "termTypeName": "推广费",
            "unitCode": unit,
            "unitId": "sfsdfsfasfsfasdfasdf",
            "area": $.cookie('area'),
            "shopCode": getURLParameter('id')
          },
          {
            "amount": $.cookie('deductionTaxAmount_1'),
            "code": "1",
            "endDate": DecrDate(IncrYear($.cookie('settleDate'))),
            "name": "",
            "orgCode": orgCode,
            "outTradeNo": outTradeNo, //订单号需动态调用
            "rentAmount": "",
            "startDate": $.cookie('openDate'),
            "taxAmount":  $.cookie('taxDeductionTaxAmount_1'),
            "termType": "D011",
            "termTypeName": "提成扣率",
            "unitCode": unit,
            "unitId": "sfsdfsfasfsfasdfasdf",
            "area": $.cookie('area'),
            "shopCode": getURLParameter('id')
          }
        ],
        "contractType": "R1",//R1租赁 R4广告 R5场地
        "mobileNo": $.cookie('uid'),
        "name": "wechatol",
        "orderStates": orderStates, //订单状态
        "orgCode": orgCode,
        "outTradeNo": outTradeNo,
        "payStates": "未支付", //支付状态
        "payType": payType,
        "tenantId": "",
        "tenantName": $.order.company,
        "tenantNo": "",
        "tenantOrg": $.order.uscc, //uscc
        "userId": $.cookie('uid'),
        "remarkFirst": getURLParameter('id'),
        "remarkSecond": 'leasing'
    };
    
    if($.cookie('contractLength') > 1) {
        var secondYearPrice = {
            "amount": $.cookie('amount_2'),
            "code": "2",
            "endDate": DecrDate(IncrYears($.cookie('settleDate'),2)),
            "name": "",
            "orgCode": orgCode,
            "outTradeNo": outTradeNo,
            "rentAmount": $.cookie('rentAmount_2'),
            "startDate": IncrYear($.cookie('settleDate')),
            "taxAmount": $.cookie('taxAmount_2'),
            "termType": "B011",
            "termTypeName": "固定租金",
            "unitCode": unit,
            "unitId": "sfsdfsfasfsfasdfasdf",
            "area": $.cookie('area'),
            "id": 0,
            "shopCode": getURLParameter('id')
        }

        var secondYearMaintenance = {
            "amount": $.cookie('propertyMaintenance_2'),
            "code": "2",
            "endDate": DecrDate(IncrYears($.cookie('settleDate'),2)),
            "name": "",
            "orgCode": orgCode,
            "outTradeNo": outTradeNo,
            "rentAmount": $.cookie('propertyMaintenanceRentAmount_2'),
            "startDate": IncrYear($.cookie('settleDate')),
            "taxAmount": $.cookie('taxPropertyMaintenance_2'),
            "termType": "B021",
            "termTypeName": "物业管理费",
            "unitCode": unit,
            "unitId": "sfsdfsfasfsfasdfasdf",
            "area": $.cookie('area'),
            "id": 0,
            "shopCode": getURLParameter('id')
        }

        var secondYearRate = {
            "amount": $.cookie('deductionTaxAmount_2'),
            "code": "2",
            "endDate": DecrDate(IncrYears($.cookie('settleDate'),2)),
            "name": "",
            "orgCode": orgCode,
            "outTradeNo": outTradeNo,
            "rentAmount": "",
            "startDate": IncrYear($.cookie('settleDate')),
            "taxAmount": $.cookie('taxDeductionTaxAmount_2'),
            "termType": "D011",
            "termTypeName": "提成扣率",
            "unitCode": unit,
            "unitId": "sfsdfsfasfsfasdfasdf",
            "area": $.cookie('area'),
            "id": 0,
            "shopCode": getURLParameter('id')
        }
        
        map.contractTermInfos.push(secondYearPrice,secondYearMaintenance,secondYearRate);
    }
    
    if($.cookie('contractLength') > 2) {
        var thirdYearPrice = {
            "amount": $.cookie('amount_3'),
            "code": "3",
            "endDate": DecrDate(IncrYears($.cookie('settleDate'),3)),
            "name": "",
            "orgCode": orgCode,
            "outTradeNo": outTradeNo,
            "rentAmount": $.cookie('rentAmount_3'),
            "startDate": IncrYears($.cookie('settleDate'),2),
            "taxAmount": $.cookie('taxAmount_3'),
            "termType": "B011",
            "termTypeName": "固定租金",
            "unitCode": unit,
            "unitId": "sfsdfsfasfsfasdfasdf",
            "area": $.cookie('area'),
            "id": 0,
            "shopCode": getURLParameter('id')
        }

        var thirdYearMaintenance = {
            "amount": $.cookie('propertyMaintenance_3'),
            "code": "3",
            "endDate": DecrDate(IncrYears($.cookie('settleDate'),3)),
            "name": "",
            "orgCode": orgCode,
            "outTradeNo": outTradeNo,
            "rentAmount": $.cookie('propertyMaintenanceRentAmount_3'),
            "startDate": IncrYears($.cookie('settleDate'),2),
            "taxAmount": $.cookie('taxPropertyMaintenance_3'),
            "termType": "B021",
            "termTypeName": "物业管理费",
            "unitCode": unit,
            "unitId": "sfsdfsfasfsfasdfasdf",
            "area": $.cookie('area'),
            "id": 0,
            "shopCode": getURLParameter('id')
        }

        var thirdYearRate = {
            "amount": $.cookie('deductionTaxAmount_3'),
            "code": "3",
            "endDate": DecrDate(IncrYears($.cookie('settleDate'),3)),
            "name": "",
            "orgCode": orgCode,
            "outTradeNo": outTradeNo,
            "rentAmount": "",
            "startDate": IncrYears($.cookie('settleDate'),2),
            "taxAmount": $.cookie('taxDeductionTaxAmount_3'),
            "termType": "D011",
            "termTypeName": "提成扣率",
            "unitCode": unit,
            "unitId": "sfsdfsfasfsfasdfasdf",
            "area": $.cookie('area'),
            "id": 0,
            "shopCode": getURLParameter('id')
        }

        map.contractTermInfos.push(thirdYearPrice,thirdYearMaintenance,thirdYearRate);
    }

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
                if(response.data.payType != 'deposit'){
                    generateContract(response.data.id,'订单合同已生成','您的订单【'+mallName+'】商铺位置【'+$.cookie('shopName')+'】合同已生成，请前往我的订单管理页面查看。',outTradeNo, '我的消息',unit,'/v2/stamping');
                } else {
                    generateContract(response.data.id,'订单已生成','您的订单【'+mallName+'】商铺位置【'+$.cookie('shopName')+'】有一笔1,000元的定金待支付，请前往我的订单管理页面查看。',outTradeNo, '我的消息',unit,'/v2/stamping');
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

function getMyFavorites(){
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
                $.each(response.data, function(i,v){
                    if(v.unitType == 'leasing'){
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
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}

function addToFavorite(id,bc,c,sc,uc){
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
        "shopCode": c,
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

function GetMap(fn,lk,mc){
    var fc;
    switch (fn) {
        case '十楼':
            fc = '10';
            break;
        case '九楼':
            fc = '9';
            break;
        case '八楼':
            fc = '8';
            break;
        case '七楼':
            fc = '7';
            break;    
        case '六楼':
            fc = '6';
            break;
        case '五楼':
            fc = '5';
            break;
        case '四楼':
            fc = '4';
            break;
        case '三楼':
            fc = '3';
            break;
        case '二楼':
            fc = '2';
            break;
        case '一楼':
            fc = '1';
            break;
        case '负一楼':
            fc = '0';
            break;
        default:
            fc = '1';
            break;
    }
    
    $('#map').attr({
        'src': '/views/assets/base/img/content/floor-plan/'+lk+'/'+fc+'F.png',
        'alt': fc+'F',
        'usemap': '#Map_'+fc+'F_s'
     });
     
    $('#map').parent().append('<map name="Map_'+fc+'F_s" id="Map_'+fc+'F_s"></map>');
    
    getCoords(mc,fn);
}

function getCoords(mc,fn) {
    $.ajax({
        url: $.api.baseNew+"/onlineleasing-customer/api/base/coords/"+mc+"/"+fn+"",
        type: "GET",
        async: false,
        beforeSend: function(request) {
            request.setRequestHeader("Lang", $.cookie('lang'));
            request.setRequestHeader("Source", "onlineleasing");
        },
        complete: function(){},
        success: function (response, status, xhr) {
            if(response.code === 'C0') {
                $.each(response.data, function(i,v){
                    if(v.state !== 0 && v.coords != null && v.coords != ''){
                        var index = $.inArray(v.unit, unitCodes);
                        if(index >= 0){
                            $('map').append('<area data-key="'+v.unit+'" alt="'+v.code+'" data-full="'+v.shopState+'" data-area="'+v.area+'" data-logo="'+v.logo+'"  href="shop?id='+v.code+'&type=leasing" shape="poly" coords="'+v.coords+'" />');
                        } else {
                            $('map').append('<area data-key="'+v.unit+'" data-logo="'+v.logo+'" data-area="'+v.area+'" name="'+v.brandName+'" shape="poly" coords="'+v.coords+'" />');
                        }
                    }
                });
                
                drawShops();
                $('#floor_plan_viewer').fadeIn(200);
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
                toolTip: "本位置",
                fillColor: 'F26A85',
                fillOpacity: 1,
                stroke: true,
                strokeColor: 'DC143C',
                strokeWidth: 1,
                selected: true
            };
        }
    });
    
    var xOffset;
    var yOffset;

    $('#map').mapster({
        fillColor: 'c9ae89',
        fillOpacity: 0.8,
        strokeColor: 'ffd62c',
        strokeWidth: 0,
        clickNavigate: true,
        mapKey: 'data-key',
        showToolTip: true,
        areas:  areas,
        onShowToolTip: function () {
            $(".mapster_tooltip").css({
                "font-weight": "bold",
                "color": "#fff",
                "background": "rgba(28,34,56,1)",
                "font-size": "22px",
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
    
    setTimeout(function () {
        addLogoLayer();
    },1000);
}

function showFloorVR(vr){
    $("#floor_vr iframe").attr('src',vr);
    $("#floor_vr").show();
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
        } else if($(this).attr('data-area') > 200 && $(this).attr('name') != null && $(this).attr('name') != 'null' && $(this).attr('name') != ''){
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

            var brand = $(this).attr('name');
            if(brand.length > 10){
                brand = brand.substring(0,10) + "...";
            }

            var spanid = 'span_'+$(this).attr('data-key');
            $('#mapster_wrap_0').append(
                '<span id="'+spanid+'" style="position:absolute;line-height:1;text-align:center;">'+brand+'</span>'
            );

            resetFontSize(spanid,width,height,4,12,posLeftMin,posTopMin);
        }
    })
}

function resetLogoSize(spanid, maxWidth, maxHeight, minSize, maxSize, posLeftMin, posTopMin) {
    var divLogo = $('#'+spanid);
    for (var i = minSize; i < maxSize; i++) {
        if ($(divLogo).width() > maxWidth || $(divLogo).height() > maxHeight) {
            $(divLogo).css({
                'width': 'auto',
                'height': 'auto',
                'max-width': i + 'px',
                'max-height': maxHeight,
                'left': parseInt(posLeftMin - ($(divLogo).width() - maxWidth) / 18 + 25) + 'px',
                'top': parseInt(posTopMin - ($(divLogo).height() - maxHeight) / 15 + 20) + 'px' 
            }); 
                break;
        } else {
            $(divLogo).css({
                'width': 'auto',
                'height': 'auto',
                'max-height': i + 'px',
                'max-width': maxWidth,
                'left': parseInt(posLeftMin - ($(divLogo).width() - maxWidth) / 18 + 25) + 'px',
                'top': parseInt(posTopMin - ($(divLogo).height() - maxHeight) / 15 + 20) + 'px' 
            });
        }
    }
};

function resetFontSize(spanid, maxWidth, maxHeight, minSize, maxSize, posLeftMin, posTopMin) {
    var divWord = $('#'+spanid);
    divWord.css('font-size', minSize + "px");
    for (var i = minSize; i < maxSize; i++) {
        if ($(divWord).width() > maxWidth  || $(divWord).height() > maxHeight) {
            $(divWord).css({
                'font-size': i + 'px',
                'left': parseInt(posLeftMin - ($(divWord).width() - maxWidth) / 2 + 5) + 'px',
                'top': parseInt(posTopMin - ($(divWord).height() - maxHeight) / 2 + 5) + 'px'    
            }); 
                break;
        } else {
            $(divWord).css({
                'font-size': i + 'px',
                'left': parseInt(posLeftMin - ($(divWord).width() - maxWidth) / 2) + 'px',
                'top': parseInt(posTopMin - ($(divWord).height() - maxHeight) / 2) + 'px'
            });
        }
    }
};

function checkAppointment() {
    saveAppointment();
}

function saveAppointment() {
    var dt = $('#appointmentTime2').val();
    var year = dt.substring(0,4);
    var month = dt.substring(4,6);
    var date = dt.substring(6,8);
    var hour = dt.substring(8,10);
    
    var goCheck = 1;
    if(dt == '' || year == '' || month == '' || date == '' || hour == ''){
        $('#appointmentTime').addClass('red-border');
        goCheck = 0;
    }
        
    if(goCheck == 1){
        if($('.red-border').length > 0){
             $('.red-border').removeClass('red-border');
        }
        
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

        var map = {
            "appointmentDate": year+'-'+month+'-'+date,
            "appointmentHour": hour+'时',
            "mobileNo": $.cookie('uid'),
            "mail": $('#appointmentEmail').val(),
            "orgCode": orgCode,
            "state": 1,
            "status": "已预约",
            "unitCode": $.cookie('shopNo'),
            "unitDesc": $.cookie('shopName'),
            "name": $('#appointmentName').val(),
            "tenantName": $('#appointmentCompany').val(),
            "shopCode": getURLParameter('id')
        }

        $.ajax({
            url: $.api.baseNew+"/comm-wechatol/api/appointment/saveOrUpdate",
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
            complete: function(){ 
            },
            success: function (response, status, xhr) {
                var mallName;
                switch (response.data.orgCode) {
                    case '301001':
                        mallName = '河南洛阳国际广场';
                        break;
                    case '201001':
                        mallName = '上海宝山正大乐城';
                        break;
                    case '100001':
                        mallName = '上海陆家嘴正大广场';
                        break;
                    case '204001':
                        mallName = '上海徐汇正大乐城';
                        break;
                    default:
                        mallName = '上海陆家嘴正大广场';
                        break;
                }

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

function showAppointmentDialog(){
    var appointmentDialog = $('#appointmentDialog');
    appointmentDialog.fadeIn(200);
    
    $("#appointmentDialogForm").validate({
        onkeyup: false,
        rules: {
            appointmentCompany: {
                required: true
            },
            appointmentName: {
                required: true
            },
            appointmentEmail: {
                required: true,
                email: true
            },
            appointmentTime: {
                required: true
            }
        },
        messages: {
            appointmentCompany: {
                required: '<i class="fa fa-exclamation-circle" aria-hidden="true"></i>请填写联系人公司名称'
            },
            appointmentName: {
                required: '<i class="fa fa-exclamation-circle" aria-hidden="true"></i>请填写看铺联系人称呼'
            },
            appointmentEmail: {
                required: '<i class="fa fa-exclamation-circle" aria-hidden="true"></i>请填写看铺联系人邮箱',
                email: '<i class="fa fa-exclamation-circle" aria-hidden="true"></i>邮箱格式不对，请正确填写'
            },
            appointmentTime: {
                required: '<i class="fa fa-exclamation-circle" aria-hidden="true"></i>请选择看铺时间'
            }
        },
        errorPlacement: function(error, element) {
            error.appendTo('#errorcontainer-' + element.attr('id'));
        },
        submitHandler: function() {
            hideAppointmentDialog();
            showLoading();
            checkAppointment();
        }
    })
}

function hideDialog(){
    var authDialog = $('#cadDialog');
    authDialog.hide();
}

function hideAppointmentDialog(){
    var appointmentDialog = $('#appointmentDialog');
    appointmentDialog.hide();
}

function showOrderTypeDialog(){
    var orderTypeDialog = $('#orderTypeDialog');
    orderTypeDialog.fadeIn(200);
    
    $.order.expectDate = IncrDates(date,6);
    $.order.expect = $.order.expectDate.split('-')[0]+'年'+$.order.expectDate.split('-')[1]+'月'+$.order.expectDate.split('-')[2]+'日 23:59:59';
    $('#expect').text($.order.expect);
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
                var $toast = $('#js_toast_4');
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

function showIndexPix(){
    var urlRoot = '/upload/video/'+getURLParameter('id')+'/'+getURLParameter('id');
    var indexRange = [0, 82];
    var maxLength = indexRange[1] - indexRange[0] + 1;
    var eleContainer = document.getElementById('pix_4');
    
    $('#video_4').hide();
    $('#pix_4').show();
    // 存储预加载的DOM对象和长度信息
    var store = {
        length: 0
    };
    // 图片序列预加载
    for ( var start = indexRange[0]; start <= indexRange[1]; start++) {
        (function (index) {
            var img = new Image();
            img.onload = function () {
                store.length++;
                // 存储预加载的图片对象
                store[index] = this;
                play();
            };
            img.onerror = function () {
                store.length++;
                play();
            };
            img.src = urlRoot + formatIndex3(index) + '.jpg';
        })(start);
    }

    var play = function () {
        var percent = Math.round(100 * store.length / maxLength);
        // 全部加载完毕，无论成功还是失败
        if (percent == 100) {
            var index = indexRange[0];
            eleContainer.innerHTML = '';
            // 依次append图片对象
            var step = function () {
                if (store[index - 1]) {
                    store[index - 1].remove();
                }
                eleContainer.appendChild(store[index]);
                // 序列增加
                index++;
                // 如果超过最大限制
                if (index <= indexRange[1]) {
                    // 15fps, 1000ms/15=67 每帧约0.067秒
                    //setTimeout(step, 67);
                    setTimeout(step, 42);
                } else {
                    // 本段播放结束回调
                    play();
                }
            };
            // 等100%动画结束后执行播放
            setTimeout(step, 100);
        }
    };
}

