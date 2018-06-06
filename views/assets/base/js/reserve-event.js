var d = new Date();
var month = d.getMonth()+1;
var day = d.getDate();
var date = d.getFullYear() + '-' +
    (month<10 ? '0' : '') + month + '-' +
    (day<10 ? '0' : '') + day;
    
var modal = [];
modal = $.parseJSON(sessionStorage.getItem("modalities"));

$(document).ready(function(){
    $('#international_verify').val('');
    
    $('#start_date, #reserve_date').datepicker({
        'language': "zh-CN",
        'format': 'yyyy-mm-dd',
        'startDate': '+1d'
    });
    
    prepareReservation1();
    
    $('#reserve_date').datepicker('setDate',IncrDate(date));
    
    $("#reserve_form").validate({
        rules: {
            length: {
                required: true
            },
            start_date: {
                required: true,
                date: true
            },
            reserve_date: {
                required: true,
                date: true
            },
            international: {
                required: true
            },
            international_verify: {
                required: true,
                rangelength: [6,6],
                numChar: true
            }
        },messages: {
            length: {
                required: "请选择租约时限"
            },
            start_date: {
                required: "请选择预计入场日期",
                date: "请输入有效日期"
            },
            reserve_date: {
                required: "请选择看场日期",
                date: "请输入有效日期"
            },
            international: {
                required: "请选择验证方式"
            },
            international_verify: {
                required: "验证码为必填项",
                rangelength: "验证码须为{0}位及{0}位以上字母和数字",
                numChar: "验证码为字母和数字组合"
            }
        },
        errorPlacement: function(error, element) {
            error.appendTo('#errorcontainer-' + element.attr('id'));
        },
        submitHandler: function() {
            var shops = [getURLParameter('sid')];
            
            var key;
            if($('#international').children('option:selected').val() == "email"){
                key = $.api.emailVC;
            } else if($('#international').children('option:selected').val() == "mobile"){
                key = $.api.mobileVC;
            }
            
            var map = {
                brandCode: "",
                brandModality: $('#brand_modality').val(),
                brandName: $("#brand").val(),
                email: $('#email').text(),
                endDate: IncrDates($('#start_date').val(),Math.floor($('#length').val())),
                merchantCode: "",
                merchantName: $('#company_name').text(),
                mobile: $('#mobile').text(),
                rentalLength: $('#length').val(),
                reserveTime: $('#reserve_date').val(),
                shops: shops,
                startDate: $('#start_date').val(),
                userCode: $('#code').val(),
                userName: $('#name').text(),
                verificationCodeCheck: {
                    code: $('#international_verify').val(),
                    key: key,
                    keyword: $('#international_verify').val(),
                    verifyType: $('#international').children('option:selected').val()
                }
            };
            
            $.ajax({
                url: $.api.baseNew+"/onlineleasing-customer/api/reservation/save",
                type: "POST",
                data: JSON.stringify(map),
                async: false,
                dataType: "json",
                contentType: "application/json",
                beforeSend: function(request) {
                    $('#loader').show();
                    request.setRequestHeader("Login", $.cookie('login'));
                    request.setRequestHeader("Authorization", $.cookie('authorization'));
                    request.setRequestHeader("Lang", $.cookie('lang'));
                    request.setRequestHeader("Source", "onlineleasing");
                },
                complete: function(){},
                success: function (response, status, xhr) {
                    $('#loader').hide();
                    if(response.code === 'C0') {
                        if(xhr.getResponseHeader("Authorization") !== null){
                            $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                        }
                        window.location.href = "my-reservations?k=reserved";
                    } else {
                        interpretBusinessCode(response.customerMessage);
                    }
                },
                error: function(jqXHR, textStatus, errorThrown) {
                   console.log(textStatus, errorThrown);
                }
            });
        }
    });
});

function prepareReservation1(){
    var shopCode = getURLParameter('sid') || null;
    $.ajax({
        url: $.api.baseNew+"/onlineleasing-customer/api/reservation/shop/"+shopCode+"",
        type: "GET",
        async: false,
        beforeSend: function(request) {
            $('#loader').show();
            request.setRequestHeader("Login", $.cookie('login'));
            request.setRequestHeader("Authorization", $.cookie('authorization'));
            request.setRequestHeader("Lang", $.cookie('lang'));
            request.setRequestHeader("Source", "onlineleasing");
        },
        complete: function(){},
        success: function (response, status, xhr) {
            $('#loader').hide();
            if(response.code === 'C0') {
                $('#shop_image').attr('src',response.data.firstImage || '#');
                $('#mall').text(response.data.mallName || '-');
                $('#unit').text(response.data.unit || '-');
                $('#floor').text(response.data.floorName || '-');
                $('#area').text(response.data.area || '-');
                                
                if(response.data.shopState === 1) { // 空铺
                    $('#start_date').datepicker('setDate', IncrDates(date,5));
                } else { // 非空铺
                    if(response.data.contractExpireDate == null){
                        $('#start_date').datepicker('setDate', IncrDates(date,5));
                    } else {
                        var contractExpire = new Date();
                        contractExpire.setTime(response.data.contractExpireDate);
                        var contractExpireYear = contractExpire.getFullYear('yyyy');
                        var contractExpireMonth = contractExpire.getMonth('mm')+1;
                        var contractExpireDate = contractExpire.getDate('dd');

                        if(IncrMonth(date) <= (contractExpireYear+'-'+contractExpireMonth+'-'+contractExpireDate)) {
                            $('#start_date').datepicker('setDate', IncrDate(contractExpireYear+'-'+contractExpireMonth+'-'+contractExpireDate));
                        } else {
                            $('#start_date').datepicker('setDate', IncrDates(contractExpireYear+'-'+contractExpireMonth+'-'+contractExpireDate,5));
                        }
                    }
                }
                
                prepareReservation2();
            } else {
                interpretBusinessCode(response.customerMessage);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}

function prepareReservation2(){
    var userCode = $.cookie('uid');
    $.ajax({
        url: $.api.baseNew+"/onlineleasing-customer/api/reservation/user/"+userCode+"",
        type: "GET",
        async: false,
        beforeSend: function(request) {
            $('#loader').show();
            request.setRequestHeader("Login", $.cookie('login'));
            request.setRequestHeader("Authorization", $.cookie('authorization'));
            request.setRequestHeader("Lang", $.cookie('lang'));
            request.setRequestHeader("Source", "onlineleasing");
        },
        complete: function(){},
        success: function (response, status, xhr) {
            $('#loader').hide();
            if(response.code === 'C0') {
                $('#name').text(response.data.userName || '-');
                $('#code').val(response.data.userCode);
                $('#company_name').text(response.data.merchantName || '-');
                $('#mobile').text(response.data.mobile || '-');
                $('#email').text(response.data.email || '-');
                $('#brand').val(response.data.brandName || '-');
                $('#brand_modality').val(response.data.brandModality);
                
                if(response.data.emailVerified == 1) {
                    $('#international').append('<option value="email" selected="selected">邮箱验证</option>');
                } else if(response.data.mobileVerified == 1) {
                    $('#international').append('<option value="mobile" selected="selected">手机验证</option>');
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

$.validator.addMethod('numChar',function(text){
    var regex = /^[0-9a-zA-Z\ ]+$|(^$)/;
    return regex.test(text);
}, "The value entered is invalid");

var countdownReservation=60;

function VeryficationCodeReservation() {
    var obj = $("#international_verify_link");
    var internationalError = $('#errorcontainer-international_verify').html();
    var map, url;
    
    if($('#international').children('option:selected').val() == "mobile"){
        if($('#mobile').text() && (internationalError == '' || $('#errorcontainer-international_verify').text() == '')) {
            map = {
                mobile : $('#mobile').text()
            };
            url = $.api.baseNew+"/onlineleasing-customer/api/verify/sms";
        }
    } else if($('#international').children('option:selected').val() == "email"){
        if($('#email').text() && (internationalError == '' || $('#errorcontainer-international_verify').text() == '')) {
            map = {
                mail : $('#email').text()
            };
            url = $.api.baseNew+"/onlineleasing-customer/api/verify/mail";
        }
    }
    $.ajax({
        url: url,
        type: "POST",
        data: map,
        async: false,
        beforeSend: function(request) {
            $('#loader').show();
            request.setRequestHeader("Lang", $.cookie('lang'));
            request.setRequestHeader("Source", "onlineleasing");
        },
        complete: function(){},
        success: function (response, status, xhr) {
            $('#loader').hide();
            interpretBusinessCode1(response.customerMessage);

            if($('#international').children('option:selected').val() == "email"){
                $.api.emailVC = response.data;
            } else if($('#international').children('option:selected').val() == "mobile"){
                $.api.mobileVC = response.data;
            }
            setTimeReservation(obj);
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
    
}

function setTimeReservation(obj) {
    if (countdownReservation == 0) { 
        obj.attr('href','javascript: VeryficationCodeReservation()'); 
        obj.html("发送验证码");
        countdownReservation = 60; 
        return;
    } else { 
        obj.attr('href','javascript: void(0)');
        obj.html("等待(" + countdownReservation + ")s");
        countdownReservation--; 
    } 
setTimeout(function() { 
    setTimeReservation(obj); }
    ,1000); 
}