var d = new Date();
var month = d.getMonth()+1;
var day = d.getDate();
var date = d.getFullYear() + '-' +
    (month<10 ? '0' : '') + month + '-' +
    (day<10 ? '0' : '') + day;
    
var modal = [];
modal = $.parseJSON(sessionStorage.getItem("modalities"));

$.leaseTerm = 1;

$(document).ready(function(){
    $('#international_verify').val('');
    
    if($.cookie('lang') === 'en-us'){
        var stCal = "en-US";
    } else {
        var stCal = "zh-CN";
    }
    
    $('#start_date, #reserve_date').datepicker({
        'language': stCal,
        'format': 'yyyy-mm-dd',
        'startDate': '+1d'
    });
    
    $('#length').html('<option value="">'+$.lang.choose+'</option>');
    
    prepareReservation1();
    
    $('#reserve_date').datepicker('setDate',IncrDate(date));

    if($.cookie('lang') === 'en-us'){
        var reserve_length_required = "Please choose a lease term";
        var reserve_start_date_required = "Moving in date can't be empty";
        var reserve_start_date = "Please give a correct date";
        var reserve_reserve_date_required = "Reserving date can't be empty";
        var reserve_reserve_date_date = "Please give a correct date";
        var reserve_international_required = "Please choose a verification method";
        var reserve_international_verify_required = "Verification code can't be empty";
        var reserve_international_verify_rangelength = "Verification code must be {0} digits";
        var reserve_international_verify_numChar = "Verification code comprises letters and digits";
    } else {
        var reserve_length_required = "请选择租约时限";
        var reserve_start_date_required = "预计入驻日期为必填项";
        var reserve_start_date = "请输入有效日期";
        var reserve_reserve_date_required = "预约日期为必填项";
        var reserve_reserve_date_date = "请输入有效日期";
        var reserve_international_required = "请选择验证方式";
        var reserve_international_verify_required = "验证码为必填项";
        var reserve_international_verify_rangelength = "验证码须为{0}位及{0}位以上字母和数字";
        var reserve_international_verify_numChar = "验证码为字母和数字组合";
    }
    
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
                required: reserve_length_required
            },
            start_date: {
                required: reserve_start_date_required,
                date: reserve_start_date
            },
            reserve_date: {
                required: reserve_reserve_date_required,
                date: reserve_reserve_date_date
            },
            international: {
                required: reserve_international_required
            },
            international_verify: {
                required: reserve_international_verify_required,
                rangelength: reserve_international_verify_rangelength,
                numChar: reserve_international_verify_numChar
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
            
            var endDate;
            if($.leaseTerm == 1){
                endDate = IncrYears($('#start_date').val(),$('#length').val());
            } else {
                endDate = IncrMonths($('#start_date').val(),$('#length').val());
            }
            
            var map = {
                brandCode: "",
                brandModality: $('#brand_modality').val(),
                brandName: $("#brand").val(),
                email: $('#email').text(),
                endDate: endDate,
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
                $.each($.parseJSON(sessionStorage.getItem("malls")), function(i,v) {
                    if(v.mallCode == response.data.mallCode) {
                        if($.cookie('lang') === 'en-us'){
                             $('#mall').text(v.mallNameEng || '-');
                        } else {
                             $('#mall').text(v.mallName || '-');
                        }
                        return false;
                    }
                });
                
                $.each($.parseJSON(sessionStorage.getItem("floors")), function(i,v) {
                    if(v.floorCode == response.data.floorCode) {
                        if($.cookie('lang') === 'en-us'){
                            $('#floor').text(v.descriptionEng || '-');
                        } else {
                            $('#floor').text(v.description || '-');
                        }
                        return false;
                    }
                });
                
                if(response.data.subType == '正柜'){
                    for(var i=1; i<=8; i++){
                        $('#length').append('<option value="'+i+'">'+i+$.lang.lengthYear+'</option>');
                    }
                } else {
                    $.leaseTerm = 2;
                    for(var i=1; i<=12; i++){
                        $('#length').append('<option value="'+i+'">'+i+$.lang.lengthMonth+'</option>');
                    }
                }
                
                $('#shop_image').attr('src',response.data.firstImage || '#');
                $('#unit').text(response.data.unit || '-');
                $('#area').text(response.data.area || '-');
                $('#modality').text(GetBrandModality3(response.data.modality) || '-');
                                
                if(response.data.shopState === 1) { // 空铺
                    $('#start_date').datepicker('setDate', IncrMonth(date));
                } else { // 非空铺
                    if(response.data.contractExpireDate == null){
                        $('#start_date').datepicker('setDate', IncrMonth(date));
                    } else {
                        var contractExpire = new Date();
                        contractExpire.setTime(response.data.contractExpireDate);
                        var contractExpireYear = contractExpire.getFullYear('yyyy');
                        var contractExpireMonth = contractExpire.getMonth('mm')+1;
                        var contractExpireDate = contractExpire.getDate('dd');

                        if(IncrMonth(date) <= (contractExpireYear+'-'+contractExpireMonth+'-'+contractExpireDate)) {
                            $('#start_date').datepicker('setDate', IncrDate(contractExpireYear+'-'+contractExpireMonth+'-'+contractExpireDate));
                        } else {
                            $('#start_date').datepicker('setDate', IncrMonth(contractExpireYear+'-'+contractExpireMonth+'-'+contractExpireDate));
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
                    $('#international').append('<option value="email" selected="selected">'+$.lang.emailVerify+'</option>');
                } else if(response.data.mobileVerified == 1) {
                    $('#international').append('<option value="mobile" selected="selected">'+$.lang.mobileVerify+'</option>');
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

function GetBrandModality3(mod) {
    var mm;
    if(mod !== null && mod !== '') {
        var m = mod;
        $.each(modal, function(i,v) {
            $.each(v.children, function(j,w) {
                $.each(w.children, function(k,x) {
                    $.each(x.children, function(l,y) {
                        if(y.code == m && $.cookie('lang') === 'en-us') {
                            mm = y.remark;
                            return false;
                        } else if(y.code == m && $.cookie('lang') !== 'en-us') {
                            mm = y.name;
                            return false;
                        }
                    });
                });
            });
        });
    } else {
        mm = '-';
    }
    
    return mm;
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
        obj.html($.lang.sendCode);
        countdownReservation = 60; 
        return;
    } else { 
        obj.attr('href','javascript: void(0)');
        obj.html("(" + countdownReservation + ")s");
        countdownReservation--; 
    } 
setTimeout(function() { 
    setTimeReservation(obj); }
    ,1000); 
}