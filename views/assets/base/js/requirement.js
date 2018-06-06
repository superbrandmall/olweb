$.vals = [];

$(document).ready(function(){
    $('#international_verify').val('');
    
    var d = new Date();
    var month = d.getMonth()+1;
    var day = d.getDate();
    var date = d.getFullYear() + '-' +
        (month<10 ? '0' : '') + month + '-' +
        (day<10 ? '0' : '') + day;

    $('#start').datepicker({
        'language': "zh-CN",
        'format': 'yyyy-mm',
        'startDate': '+30d',
        'startView': "months", 
        'minViewMode': "months"
    });
    
    $('#reserve_date').datepicker({
        'language': "zh-CN",
        'format': 'yyyy-mm-dd',
        'startDate': '+1d'
    });
    
    $('#reserve_date').datepicker('setDate',IncrDate(date));
    
    if(sessionStorage.getItem("searches") && sessionStorage.getItem("searches") != null && sessionStorage.getItem("searches") != '') {
        ShowResults($.parseJSON(sessionStorage.getItem("searches")),'');
    }
    
    ///////////////////// Validate search form /////////////////////////
    $("#requirement_form").validate({
        rules: {
            min_area: {
                lessThanEqual: "#max_area"
            },
            length: {
                required: true
            },
            start: {
                required: true,
                date: true
            }
        },
        messages: {
            min_area: {
                lessThanEqual: "最小租赁面积不得大于最大租赁面积"
            },
            length: {
                required: "请选择租约年限"
            },
            start: {
                required: "请选择预计入驻日期",
                date: "请输入有效日期"
            }
        },
        errorPlacement: function(error, element) {
            error.appendTo('#errorcontainer-' + element.attr('id'));
        },
        submitHandler: function() {
            $.cookie('search-min-area',$("#min_area").val());
            $.cookie('search-max-area',$("#max_area").val());
            $.cookie('search-rental-length',$("#length").val());
            $.cookie('search-start-date',$("#start").val());
                
            if($.cookie('uid') && $.cookie('uid') != '') {
                $('#loader').fadeIn(function(){
                    ShowSearch();
                });
            } else {
                var searchMalls = [];
                $('#requirement_form input:checkbox:checked').each(function(i,elem){
                    searchMalls.push($(this).val());
                });
                $.cookie('search-malls',JSON.stringify(searchMalls));
                
                $('#login-form').modal('show');
            }
        }
    });
    if($.cookie('uid') && $.cookie('uid') != '') {
        GetHistories(1);
    }
    
    $("#reserve_form").validate({
        rules: {
            rental_length: {
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
            rental_length: {
                required: "请选择租约年限"
            },
            start_date: {
                required: "请选择预计入驻日期",
                date: "请输入有效日期"
            },
            reserve_date: {
                required: "请选择看铺日期",
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
            var key;
            if($('#international').children('option:selected').val() == "email"){
                key = $.api.emailVC;
            } else if($('#international').children('option:selected').val() == "mobile"){
                key = $.api.mobileVC;
            }
            
            var map = {
                brandCode: "",
                brandModality: $('#brand_modality_3_code').val(),
                brandName: $("#brand_name").val(),
                email: $('#email').text(),
                endDate: IncrYears($('#start_date').val()+'-01',$('#rental_length').val()),
                merchantCode: "",
                merchantName: $('#company_name').text(),
                mobile: $('#mobile').text(),
                rentalLength: $('#rental_length').val(),
                reserveTime: $('#reserve_date').val(),
                shops: $.vals,
                startDate: $('#start_date').val()+'-01',
                userCode: $.cookie('uid'),
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

function ShowSearch(){
    $('.c-content-team-1-slider .c-content-title-1,.c-content-list').html('');
    var mall = [];
    $('#requirement_form input:checkbox:checked').each(function(i,elem){
        mall.push($(this).val());
    });
    var map = {
        userCode: $.cookie('uid'),
        brandCode: '',
        brandName: $("#brand").text(),
        brandModality: $("#brand_modality_3_code").val(),
        minArea: $("#min_area").val(),
        maxArea: $("#max_area").val(),
        startDate: $("#start").val()+'-01',
        endDate: IncrYears($("#start").val()+'-01',$('#length').val()),
        mallCodes: mall,
        max: 8,
        rentalLength: $('#length').val()
    };
    $.ajax({
        url: $.api.baseNew+"/onlineleasing-customer/api/searchshop/details",
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
        success: function (response, status, xhr) {
            $('#loader').hide();
            if(response.code === 'C0') {
                GetHistories(1);
                
                $('html,body').animate({
                scrollTop: $(".c-content-list").offset().top - 200},
                'slow');
                    
                $('.c-content-team-1-slider .c-content-title-1').append('<h3 class="c-center c-font-white c-font-bold">推荐店铺 ('+response.data.result.length+'家)</h3><div class="c-line-center c-theme-bg"></div>');                            

                sessionStorage.setItem("searches", JSON.stringify(response.data.result) );
                if(response.data.result.length > 0){
                    ShowResults(response.data.result,response.data.searchShopDetailCode);
                }
                
            } else {
                interpretBusinessCode(response.customerMessage);
            } 
        }
    });
}

var modalities = [];
$.each($.parseJSON(sessionStorage.getItem("modalities")), function(i,u) {
    $.each(u.children, function(j,w) {
        $.each(w.children, function(k,x) {
            $.each(x.children, function(l,y) {
                modalities.push(y);
            });
        });
    });
});

function ShowResults(result,searchCode) {
    $.each(result, function(i,v){                  
        var star_length;
        if(v.score === 100){
            star_length = 100;
        } else if(v.score >= 90 && v.score < 100){
            star_length = 80;
        } else if(v.score >= 80 && v.score < 90){
            star_length = 60;
        } else if(v.score >= 70 && v.score < 80){
            star_length = 50;
        } else if(v.score >= 60 && v.score < 70){
            star_length = 40;
        } else if(v.score >= 40 && v.score < 60){
            star_length = 30;
        } else if(v.score >= 20 && v.score < 40){
            star_length = 20;
        } else if(v.score >= 0 && v.score < 20){
            star_length = 10;
        }

        var modality;

        if(v.modality !== '' && v.modality !== null){
            $.each(modalities, function(k,x) {
                if(x.code == v.modality) {
                    modality = x.name;
                }
            });
        } else {
            modality = "-";
        }

        $('.c-content-list').append('<div class="col-md-3" style="display: none;"><div class="c-content-person-1 c-option-2">\n\
<div class="c-caption c-content-overlay"><div class="c-overlay-wrapper">\n\
<div class="c-overlay-content"><a class="cbp-l-caption-buttonLeft btn c-btn-square c-btn-border-1x c-btn-white c-btn-bold c-btn-uppercase" href="shop?id='+v.code+'&search='+searchCode+'">店铺介绍</a></div></div><img class="c-overlay-object img-responsive" src="'+v.firstImage+'" alt=""></div>\n\
<div class="c-body"><div class="c-head"><div class="c-name c-font-uppercase c-font-bold">'+v.mallName+'</div>\n\
</div>\n\
<div class="c-position">楼层: '+v.floorName+'</div><div class="c-position">面积: '+v.area+'m<sup>2</sup></div><div class="c-position">业态: '+modality+'</div>\n\
<div class="c-position"><div style="float: left;margin-right: 5px">匹配: </div><div style="float:left;height:20px;width:'+star_length+'px;background:url(views/assets/base/img/content/misc/star.png) 0 0 repeat-x;"></div>\n\
<div class="c-position" style="margin-top: 10px;"><span class="c-content-label c-font-uppercase c-font-bold c-theme-bg"><label class="checkbox-inline" style="font-size: 14px; font-weight: 400;"><input id="reserve_'+v.code+'" name="reservation[]" value="'+v.code+'" type="checkbox"> 预约 <i class="icon-clock"></i></label></span></div></div></div>\n\
</div></div>');
    });

    $('#reserve_items').fadeIn().click(function(){
        $.vals = [];
        
        $('input:checkbox[name="reservation[]"]').each(function() {
            if(this.checked) {
                $.vals.push(this.value);
            }
        });
        
        $('#reserve-form').modal('show');
        $('#brand_name').val($('#brand').text());
        $('#leasing_area').val($('#min_area').val()+'-'+$('#max_area').val());
        $('#rental_length').val($('#length').val());
        $('#start_date').val($('#start').val());
            
        if($.vals.length > 0){
            $('#reserve_tag').text('看铺');
        } else {
            $('#reserve_tag').text('洽谈');
        }
    });

    var size_li = $(".c-content-list > div").size();
    var x=8;
    if(size_li > x){
        $('#loadMore-container').fadeIn();
    }
    $('.c-content-list > div:lt('+x+')').fadeIn();
    $('.cbp-l-loadMore-link').click(function () {
        x= (x+8 <= size_li) ? x+8 : size_li;
        $('.c-content-list > div:lt('+x+')').fadeIn();

        if(x === size_li){
            $('#loadMore-container').fadeOut();
        }
    });
}

function GetHistories(p){
    $.ajax({
        url: $.api.baseNew+"/onlineleasing-customer/api/searchshop/histories/"+$.cookie('uid')+"?size=3",
        type: "GET",
        async: false,
        beforeSend: function(request) {
            request.setRequestHeader("Login", $.cookie('login'));
            request.setRequestHeader("Authorization", $.cookie('authorization'));
            request.setRequestHeader("Lang", $.cookie('lang'));
            request.setRequestHeader("Source", "onlineleasing");
        },
        success: function (response, status, xhr) {
            $('#loader').hide();
            if(response.code === 'C0') {
                $('.c-content-accordion-1').html('');
                $('.c-content-accordion-1').append('<div class="panel-group" id="accordion-'+p+'" role="tablist"></div>');
                $.each(response.data.content, function(i,v) {
                    var malls = [];
                    var codes = [];
                    var mallName;
                    $.each(v.mallCodes, function(j,w) {
                        codes.push(w);                        
                        switch (w) {
                            case 'OLMALL180424000005':
                                mallName = "正大广场上海购物中心";
                                break;
                            case 'OLMALL180424000006':
                                mallName = "正大乐城宝山购物中心";
                                break;
                            case 'OLMALL171212000007':
                                mallName = "正大乐城郑州购物中心";
                                break;
                            case 'OLMALL180424000004':
                                mallName = "正大乐城徐汇购物中心";
                                break;
                            case 'OLMALL171212000010':
                                mallName = "正大乐城西安购物中心";
                                break;
                            case 'OLMALL171212000008':
                                mallName = "正大乐城无锡购物中心";
                                break;
                            default:
                                mallName = "正大广场上海购物中心";
                                break;
                        }
                        malls.push(mallName);
                    });
                    
                    var created = new Date();
                    created.setTime(v.created);
                    created = created.toLocaleString();
                    
                    var start = new Date();
                    start.setTime(v.startDate);
                    var startYear = start.getFullYear('yyyy');
                    var startMonth = start.getMonth('mm')+1;
                    if(startMonth < 10){
                        startMonth = '0'+startMonth;
                    }
                    
                    $('#accordion-'+p).append('<div class="panel"><div class="panel-heading" role="tab" id="heading-'+i+'"><h4 class="panel-title"><a class="collapsed c-font-bold c-font-16" data-toggle="collapse" data-parent="#accordion-'+p+'" href="#collapse-'+i+'" aria-expanded="false"><i class="icon-clock"></i> '+created+' </a></h4></div><div id="collapse-'+i+'" class="panel-collapse collapse" role="tabpanel"><div class="panel-body c-font-14"><a href="javascript: void(0);" style="color: #fff;overflow-wrap: break-word;"><span class="min">'+v.minArea+'</span>-<span class="max">'+v.maxArea+'</span> m²/<span class="st">'+startYear+'-'+startMonth+'</span>/<span class="ln">'+v.rentalLength+'</span>年/\n\
<span>'+malls+'</span><span class="cd" style="display:none;">'+codes+'</span>\n\
</a></div></div></div>');
                });
                
                $('#requirement_form')[0].reset();
                $('input:checkbox').attr('checked',false);
                $("#min_area").val($.cookie('search-min-area') || 0);
                $("#max_area").val($.cookie('search-max-area') || 3000);
                $("#start").val($.cookie('search-start-date') || '');
                $("#length").val($.cookie('search-rental-length') || '');

                if($.cookie('search-malls') && $.cookie('search-malls') != '' && $.cookie('search-malls') != null) {
                    var searchMalls = JSON.parse($.cookie('search-malls'));
                    for(var k=0; k < searchMalls.length; k++){
                        $("#"+searchMalls[k]).prop("checked", true);
                    }
                } else {
                    $("input:checkbox[name=mall]:first").prop("checked", true);
                }
                
                $('.panel-heading:first').find('a').attr('aria-expanded',true);
                $('.panel-heading:first').find('a').removeClass('collapsed');
                $('.panel-collapse:first').addClass('in');
                
                $('.panel-body a').each(function(i,elem){
                    $(this).click(function(){
                        $('#requirement_form')[0].reset();
                        $('input:checkbox').attr('checked',false);
                        $("#min_area").val($(this).find('.min').text());
                        $("#max_area").val($(this).find('.max').text());
                        $("#start").val($(this).find('.st').text());
                        $("#length").val($(this).find('.ln').text());
                        
                        var cd = $(this).find('.cd').text();
                        var arr = cd.split(',');
                        for(var k=0; k < arr.length; k++){
                            $("#"+arr[k]).prop("checked", true);
                        }
                        
                        $("#search_button").trigger("click");
                    });
                });
                
                showMyInfo();
            } else {
                interpretBusinessCode(response.customerMessage);
            }
        }
    });
}

function showMyInfo(){
    $('#international').html('<option value="">请选择验证方式</option>');
    
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
                var brandModality = response.data.brandModality;
                $('#name').text(response.data.userName || '-');
                $('#company_name').text(response.data.merchantName || '-');
                $('#mobile').text(response.data.mobile || '-');
                $('#email').text(response.data.email || '-');
                $('#brand').text(response.data.brandName || '-');
                $('#brand_modality_1').text(GetBrandModality1(brandModality.substr(0,4)));
                $('#brand_modality_1_code').val(brandModality.substr(0,4));
                $('#brand_modality_2').text(GetBrandModality2(brandModality.substr(0,6)));
                $('#brand_modality_2_code').val(brandModality.substr(0,6));
                $('#brand_modality_3').text(GetBrandModality3(brandModality));
                $('#brand_modality_3_code').val(brandModality);
                
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

function GetBrandModality1(mod) {
    var mm;
    if(mod !== null && mod !== '') {
        var m = mod;
        $.each($.parseJSON(sessionStorage.getItem("modalities")), function(i,v) {
            $.each(v.children, function(j,w) {
                if(w.code == m) {
                    mm = w.name;
                }
            });
        });
    } else {
        mm = '-';
    }
    
    return mm;
}

function GetBrandModality2(mod) {
    var mm;
    if(mod !== null && mod !== '') {
        var m = mod;
        $.each($.parseJSON(sessionStorage.getItem("modalities")), function(i,v) {
            $.each(v.children, function(j,w) {
                $.each(w.children, function(k,x) {
                    if(x.code == m) {
                        mm = x.name;
                    }
                });
            });
        });
    } else {
        mm = '-';
    }
    
    return mm;
}

function GetBrandModality3(mod) {
    var mm;
    if(mod !== null && mod !== '') {
        var m = mod;
        $.each($.parseJSON(sessionStorage.getItem("modalities")), function(i,v) {
            $.each(v.children, function(j,w) {
                $.each(w.children, function(k,x) {
                    $.each(x.children, function(l,y) {
                        if(y.code == m) {
                            mm = y.name;
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

function PrettyDate(time){
    d = new Date();
    var date = new Date((time || "").replace(/-/g,"/").replace(/[TZ]/g," ")),
        diff = (((new Date()).getTime() - date.getTime()) / 1000),
        day_diff = Math.floor(diff / 86400);
     if ( isNaN(day_diff) || day_diff < 0 || day_diff >= 31 )
        return;

    return day_diff == 0 && (
            diff < 60 && "刚才" ||
            diff < 120 && "1分钟前" ||
            diff < 3600 && Math.floor( diff / 60 ) + "分钟前" ||
            diff < 7200 && "1小时前" ||
            diff < 86400 && Math.floor( diff / 3600 ) + "小时前") ||
        day_diff == 1 && "昨天" ||
        day_diff < 7 && day_diff + "天前" ||
        day_diff < 31 && Math.ceil( day_diff / 7 ) + "周前";
}

$.validator.addMethod('lessThanEqual', function(value, element, param) {
    if (this.optional(element)) return true;
    var i = parseInt(value);
    var j = parseInt($(param).val());
    return i <= j;
}, "The value {0} must be less than {1}");

$.validator.addMethod("greaterThan", 
function(value, element, params) {

    if (!/Invalid|NaN/.test(new Date(value))) {
        return new Date(value) > new Date($(params).val());
    }

    return isNaN(value) && isNaN($(params).val()) 
        || (Number(value) > Number($(params).val())); 
},'Must be greater than {0}.');

// If jQuery is included in the page, adds a jQuery plugin to handle it as well
if ( typeof jQuery != "undefined" )
    jQuery.fn.PrettyDate = function(){
        return this.each(function(){
            var $this = jQuery(this),  
                date = PrettyDate($this.text());
            if ( date )
                $this.text( date );
        });
    };

$(function() {
    $(".panel-title a").PrettyDate();
    setInterval(function(){ $(".panel-title a").PrettyDate(); }, 5000);
});