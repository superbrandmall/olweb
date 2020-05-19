var first_year_bond = '-';
var second_year_bond = '-';
var third_year_bond = '-';

$(document).ready(function(){
    GetShopPriceInfo();
    //SaveOrder();
   
    $('#confirm_price').click(function(){
        window.location.href = '/v2/engineering?id='+getURLParameter('id');
    });
    
    $('#negotiate').click(function(){
        window.location.href = '/v2/negotiation?id='+getURLParameter('id')+'#contract_info';
    });
    
    $(function(){
        var $sliderTrack = $('#sliderTrack'),
            $sliderHandler = $('#sliderHandler'),
            $sliderValue = $('#sliderValue');

        var totalLen = $('#sliderInner').width(),
            startLeft = 0,
            startX = 0;

        $sliderHandler
            .on('touchstart', function (e) {
                startLeft = parseInt($sliderHandler.css('left')) * totalLen / 100;
                startX = e.originalEvent.changedTouches[0].clientX;
            })
            .on('touchmove', function(e){
                var dist = startLeft + e.originalEvent.changedTouches[0].clientX - startX,
                    percent;
                dist = dist < 0 ? 0 : dist > totalLen ? totalLen : dist;
                percent =  parseInt(dist / totalLen * 100);
                var years;
                if(percent >= 0 && percent < 31) {
                    years = 1;
                    $('#year_2').fadeOut();
                    $('#year_3').fadeOut();
                    
                    $('#bond').text(first_year_bond);
                    $.cookie('bond',first_year_bond);
                } else if(percent >= 31 && percent < 71) {
                    years = 2;
                    $('#year_2').fadeIn();
                    $('#year_3').fadeOut();
                    
                    $('#bond').text(second_year_bond);
                    $.cookie('bond',second_year_bond);
                } else if(percent >= 71) {
                    years = 3;
                    $('#year_2').fadeIn();
                    $('#year_3').fadeIn();
                    
                    $('#bond').text(third_year_bond);
                    $.cookie('bond',third_year_bond);
                }
                $.cookie('years',years);
                
                $sliderTrack.css('width', percent + '%');
                $sliderHandler.css('left', percent + '%');
                $sliderValue.text(years+'年');

                e.preventDefault();
            })
        ;
    });
});

function GetShopPriceInfo(){
    getShopsMoreInfo();
    var shopCode = getURLParameter('id') || null;
    
    var userCodeParameter = '';
    if($.cookie('uid') && $.cookie('uid') != ''){
        userCodeParameter = "?userCode="+$.cookie('uid');
    }
    
    $.ajax({
        url: $.api.baseNew+"/onlineleasing-customer/api/shop/"+shopCode+userCodeParameter+"",
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
                
                var settle_date = '-';
                var open_date = '-';
                var free_of_ground_rent = '-';
                
                var first_year_unit_price = '-';
                var first_year_rent = '-';
                var first_year_deduction_rate = '-';
                var first_year_property_maintenance = '-';
                
                var second_year_unit_price = '-';
                var second_year_rent = '-';
                var second_year_deduction_rate = '-';
                var second_year_property_maintenance = '-';
                
                var third_year_unit_price = '-';
                var third_year_rent = '-';
                var third_year_deduction_rate = '-';
                var third_year_property_maintenance = '-';
                
                $.each($.parseJSON(sessionStorage.getItem("shopsMoreInfo")), function(j,w){
                    
                    if(response.data.unit == w.unit_no){
                        settle_date = w.settle_date.split(' ')[0] || '';
                        open_date = w.settle_date.split(' ')[0] || '';
                        free_of_ground_rent = w.free_of_ground_rent + '天' || '-';
                        
                        first_year_unit_price = '¥'+w.first_year.first_year_unit_price + '/m²' || '-';
                        first_year_rent = '¥'+w.first_year.first_year_rent || '-';
                        first_year_deduction_rate = w.first_year.first_year_deduction_rate || '-';
                        first_year_property_maintenance = '¥'+w.first_year.first_year_property_maintenance + '/月' || '-';
                        first_year_bond = '¥'+w.first_year.first_year_bond || '-';
                        
                        second_year_unit_price = '¥'+w.second_year.second_year_unit_price + '/m²' || '-';
                        second_year_rent = '¥'+w.second_year.second_year_rent || '-';
                        second_year_deduction_rate = w.second_year.second_year_deduction_rate || '-';
                        second_year_property_maintenance = '¥'+w.second_year.second_year_property_maintenance + '/月' || '-';
                        second_year_bond = '¥'+w.second_year.second_year_bond || '-';
                        
                        third_year_unit_price = '¥'+w.third_year.third_year_unit_price + '/m²' || '-';
                        third_year_rent = '¥'+w.third_year.third_year_rent || '-';
                        third_year_deduction_rate = w.third_year.third_year_deduction_rate || '-';
                        third_year_property_maintenance = '¥'+w.third_year.third_year_property_maintenance + '/月' || '-';
                        third_year_bond = '¥'+w.third_year.third_year_bond || '-';
                    }
                })
                
                
                $('#room_name').text(response.data.shopName || '-');
                $.cookie('room_name',$('#room_name').text());
                $('#area').text(response.data.area || '-');
                $.cookie('area',$('#area').text());
                $('#free_of_ground_rent').text(free_of_ground_rent);
                $.cookie('free_of_ground_rent',free_of_ground_rent);
                $('#settle_date').text(settle_date);
                $.cookie('settle_date',settle_date);
                $('#open_date').text(open_date);
                $.cookie('open_date',open_date);
                
                $('#first_year_unit_price').text(first_year_unit_price);
                $.cookie('first_year_unit_price',first_year_unit_price);
                $('#first_year_rent').text(first_year_rent);
                $.cookie('first_year_rent',first_year_rent);
                $('#first_year_deduction_rate').text(first_year_deduction_rate);
                $.cookie('first_year_deduction_rate',first_year_deduction_rate);
                $('#first_year_property_maintenance').text(first_year_property_maintenance);
                $.cookie('first_year_property_maintenance',first_year_property_maintenance);
                
                $('#second_year_unit_price').text(second_year_unit_price);
                $.cookie('second_year_unit_price',second_year_unit_price);
                $('#second_year_rent').text(second_year_rent);
                $.cookie('second_year_rent',second_year_rent);
                $('#second_year_deduction_rate').text(second_year_deduction_rate);
                $.cookie('second_year_deduction_rate',second_year_deduction_rate);
                $('#second_year_property_maintenance').text(second_year_property_maintenance);
                $.cookie('second_year_property_maintenance',second_year_property_maintenance);
                
                $('#third_year_unit_price').text(third_year_unit_price);
                $.cookie('third_year_unit_price',third_year_unit_price);
                $('#third_year_rent').text(third_year_rent);
                $.cookie('third_year_rent',third_year_rent);
                $('#third_year_deduction_rate').text(third_year_deduction_rate);
                $.cookie('third_year_deduction_rate',third_year_deduction_rate);
                $('#third_year_property_maintenance').text(third_year_property_maintenance);
                $.cookie('third_year_property_maintenance',third_year_property_maintenance);
                
                $('#bond').text(first_year_bond);
                $.cookie('bond',first_year_bond);
            } else {
                interpretBusinessCode(response.customerMessage);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}

function getShopsMoreInfo() {
    $.ajax({
        url: "/views/assets/base/js/v2/json/shopAll.json",
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
            if(response.code == '200') {
                hideLoading();
                sessionStorage.setItem("shopsMoreInfo", JSON.stringify(response.data.shop_info) );
            }
        }
    })
}

function SaveOrder(){
    var shopCode = getURLParameter('id') || null;
    
    /* 
     * @订单状态  
     *  待确认订单
     *  待用印订单
     *  用印中订单
     *  待付款订单
     *  已完成订单
     *  已关闭订单
     */
    
    var map = {
        "amount": 100000,
        "appid": "test",
        "brandId": "",
        "brandName": $.cookie('brand_1'),
        "code": shopCode,
        "contractInfos": [
          {
            "amount": 100000,
            "bizScope": "testss",
            "breachAmount": 100,
            "code": shopCode,
            "depositAmount": 10000,
            "electricBillFlag": "1",
            "endDate": "2021-05-31",
            "enterDate": "2020-06-01",
            "isCleaning": "1",
            "isSecurity": "1",
            "isService": "1",
            "mobileNo": $.cookie('uid'),
            "name": "test name",
            "num": 1,
            "openDate": "2020-06-01",
            "orgCode": "100001",
            "otherFlag": "",
            "outTradeNo": "10000120200423000000000000000001",
            "remarkFifth": "",
            "remarkFirst": "",
            "remarkFourth": "",
            "remarkSecond": "",
            "remarkThird": "",
            "salesFlag": "1",
            "serviceDepositAmount": 2000,
            "size": "", //广告尺寸规格
            "spec": "",
            "startDate": $.cookie('startDate'),
            "unitCode": $('#room_name').text(),
            "unitDesc": $('#room_name').text(),
            "unitId": "sfsdfsfasfsfasdfasdf",
            "userId": "10000101",
            "vipFlag": "1",
            "wxCardFlag": "1",
            "area": $('#area').text() //广告默认传1
          }
        ],
        "contractNo": "",
        "contractTermInfos": [
          {
            "amount": $('#first_year_rent').text(),
            "code": "11",
            "endDate": "2021-05-31",
            "name": "",
            "orgCode": "100001",
            "outTradeNo": "10000120200423000000000000000001",
            "rentAmount": 10,
            "startDate": $.cookie('startDate'),
            "taxAmount": 49750,
            "termType": "B011",
            "termTypeName": "固定租金",
            "unitCode": $('#room_name').text(),
            "unitId": "sfsdfsfasfsfasdfasdf",
            "area": $('#area').text() 
          },
          {
            "amount": $('#first_year_property_maintenance').text(),
            "code": "11",
            "endDate": "2021-05-31",
            "name": "",
            "orgCode": "100001",
            "outTradeNo": "10000120200423000000000000000001",
            "rentAmount": 109.09,
            "startDate": $.cookie('startDate'),
            "taxAmount": 49880,
            "termType": "B021",
            "termTypeName": "物业管理费",
            "unitCode": $('#room_name').text(),
            "unitId": "sfsdfsfasfsfasdfasdf",
            "area": $('#area').text()
          },
          {
            "amount": 0.15,
            "code": "11",
            "endDate": "2021-05-31",
            "name": "",
            "orgCode": "100001",
            "outTradeNo": "10000120200423000000000000000001",
            "startDate": $.cookie('startDate'),
            "taxAmount": 0.015,
            "termType": "G021",
            "termTypeName": "推广费",
            "unitCode": $('#room_name').text(),
            "unitId": "sfsdfsfasfsfasdfasdf",
            "area": $('#area').text()
          },
          {
            "amount": $('#first_year_deduction_rate').text(),
            "code": "11",
            "endDate": "2021-05-31",
            "name": "",
            "orgCode": "100001",
            "outTradeNo": "10000120200423000000000000000001", //订单号需动态调用
            "rentAmount": $('#first_year_deduction_rate').text(),
            "startDate": $.cookie('startDate'),
            "taxAmount": 0.18,
            "termType": "D011",
            "termTypeName": "提成扣率",
            "unitCode": $('#room_name').text(),
            "unitId": "sfsdfsfasfsfasdfasdf",
            "area": $('#area').text()
          }
        ],
        "contractType": "R1",//租赁 R4广告 R5场地
        "mobileNo": $.cookie('uid'),
        "name": "wechatol",
        "orderStates": "未生成订单", //订单状态
        "orgCode": "100001",
        "outTradeNo": "10000120200423000000000000000001",
        "payStates": "未支付", //支付状态
        "tenantId": "海鼎公司uuid",
        "tenantName": "公司名",
        "tenantNo": "海鼎公司编号",
        "tenantOrg": "G12321312312223131", //uscc
        "userId": "sfsdfsfasfsfasdfasdf"
    };
    
    $.ajax({
        url: $.api.baseNew+"/comm-wechatol/api/order/saveOrUpdate",
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
            } else {
                interpretBusinessCode(response.customerMessage);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}