var d = new Date();
var month = d.getMonth()+1;
var day = d.getDate();
var date = d.getFullYear() + '-' +
    (month<10 ? '0' : '') + month + '-' +
    (day<10 ? '0' : '') + day;
    
$.vals = [];

$(document).ready(function(){
    $('#international_verify').val('');
    
    if($.cookie('lang') === 'en-us'){
        var stCal = "en-US";
    } else {
        var stCal = "zh-CN";
    }
    
    $('#start').datepicker({
        'language': stCal,
        'format': 'yyyy-mm',
        'startDate': '+30d',
        'startView': "months", 
        'minViewMode': "months"
    });
    
    if(sessionStorage.getItem("searches") && sessionStorage.getItem("searches") != null && sessionStorage.getItem("searches") != '') {
        ShowResults($.parseJSON(sessionStorage.getItem("searches")),'');
    } else {
        ShowSearchInit();
    }
    
    ///////////////////// Validate search form /////////////////////////
    if($.cookie('lang') === 'en-us'){
        var requirement_min_area_LessThanEqual = "Minimum leasable area mustn't be greater than maximum leasable area";
        var requirement_length_required = "Please choose a lease term";
        var requirement_start_required = "Moving in date can't be empty";
        var requirement_start_date = "Please give a correct date";
    } else {
        var requirement_min_area_LessThanEqual = "最小租赁面积不得大于最大租赁面积";
        var requirement_length_required = "请选择租约年限";
        var requirement_start_required = "预计入驻日期为必填项";
        var requirement_start_date = "请输入有效日期";
    }
    
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
                lessThanEqual: requirement_min_area_LessThanEqual
            },
            length: {
                required: requirement_length_required
            },
            start: {
                required: requirement_start_required,
                date: requirement_start_date
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
    
    ///////////////////// Validate reserve form /////////////////////////
    if($.cookie('lang') === 'en-us'){
        var requirement_rental_length_required = "Please choose a lease term";
        var requirement_start_date_required = "Moving in date can't be empty";
        var requirement_start_date_date = "Please give a correct date";
        var requirement_reserve_date_required = "Reserving date can't be empty";
        var requirement_reserve_date_date = "Please give a correct date";
        var requirement_international_required = "Please choose a verification method";
        var requirement_international_verify_required = "Verification code can't be empty";
        var requirement_international_verify_rangelength = "Verification code must be {0} digits";
        var requirement_international_verify_numChar = "Verification code comprises letters and digits";
    } else {
        var requirement_rental_length_required = "请选择租约年限";
        var requirement_start_date_required = "预计入驻日期为必填项";
        var requirement_start_date_date = "请输入有效日期";
        var requirement_reserve_date_required = "预约日期为必填项";
        var requirement_reserve_date_date = "请输入有效日期";
        var requirement_international_required = "请选择验证方式";
        var requirement_international_verify_required = "验证码为必填项";
        var requirement_international_verify_rangelength = "验证码须为{0}位及{0}位以上字母和数字";
        var requirement_international_verify_numChar = "验证码为字母和数字组合";
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
                required: requirement_rental_length_required
            },
            start_date: {
                required: requirement_start_date_required,
                date: requirement_start_date_date
            },
            reserve_date: {
                required: requirement_reserve_date_required,
                date: requirement_reserve_date_date
            },
            international: {
                required: requirement_international_required
            },
            international_verify: {
                required: requirement_international_verify_required,
                rangelength: requirement_international_verify_rangelength,
                numChar: requirement_international_verify_numChar
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

function ShowSearchInit(){
    $('.c-content-team-1-slider .c-content-title-1,.c-content-list').html('');
    var map = {
        userCode: '',
        brandCode: '',
        brandName: '',
        brandModality: '',
        minArea: 0,
        maxArea: 3000,
        startDate: IncrMonth(date),
        endDate: '',
        mallCodes: [$.mallCode.shanghaiSbm],
        max: 9,
        rentalLength: ''
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
            request.setRequestHeader("Lang", $.cookie('lang'));
            request.setRequestHeader("Source", "onlineleasing");
        },
        success: function (response, status, xhr) {
            $('#loader').hide();
            if(response.code === 'C0') {
                if(response.data.result.length > 0){
                    ShowResults(response.data.result,response.data.searchShopDetailCode);
                }
                
            } else {
                interpretBusinessCode(response.customerMessage);
            } 
        }
    });
}

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
        max: 9,
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
                
                //$('.c-content-team-1-slider .c-content-title-1').append('<h3 class="c-center c-font-bold">'+$.lang.recommandStores+' ('+response.data.result.length+$.lang.jia+')</h3><div class="c-line-center c-theme-bg"></div>');                            

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

function ShowResults(result,searchCode) {
    var mallName,floorName;
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
            $.each($.parseJSON(sessionStorage.getItem("modalities")), function(i,u) {
                $.each(u.children, function(j,w) {
                    $.each(w.children, function(k,x) {
                        $.each(x.children, function(l,y) {
                            if($.cookie('lang') === 'en-us'){
                                if(y.code == v.modality) {
                                    modality = y.remark || '-';
                                    return false;
                                }
                            } else {
                                if(y.code == v.modality) {
                                    modality = y.name || '-';
                                    return false;
                                }
                            }
                        });
                    });
                });
            });
        } else {
            modality = "-";
        }
        
        $.each($.parseJSON(sessionStorage.getItem("malls")), function(j,w) {
            if(w.mallCode == v.mallCode) {
                if($.cookie('lang') === 'en-us'){
                    mallName = w.mallNameEng;
                } else {
                    mallName = w.mallName;
                }
                return false;
            }
        });
        
        $.each($.parseJSON(sessionStorage.getItem("floors")), function(j,w) {
            if(w.floorCode == v.floorCode) {
                if($.cookie('lang') === 'en-us'){
                    floorName = w.descriptionEng;
                } else {
                    floorName = w.description;
                }
                return false;
            }
        });
        
        $('.c-content-list').append('<div class="col-md-4" style="display: none;"><div class="c-content-person-1 c-option-2 c-shadow">\n\
<div class="c-caption c-content-overlay"><div class="c-overlay-wrapper">\n\
<div class="c-overlay-content"><a class="cbp-l-caption-buttonLeft btn c-btn-square c-btn-border-1x c-btn-white c-btn-bold c-btn-uppercase" href="shop?id='+v.code+'&search='+searchCode+'">'+$.lang.dianpujieshao+'</a></div></div><img class="c-overlay-object img-responsive" src="'+v.firstImage+'" alt=""></div>\n\
<div class="c-body"><div class="c-head"><div class="c-name c-font-uppercase c-font-bold">'+mallName+'</div>\n\
</div>\n\
<div class="c-position">'+$.lang.louceng+': '+floorName+'</div><div class="c-position">'+$.lang.mianji+': '+v.area+'m<sup>2</sup></div><div class="c-position" style="text-overflow: ellipsis;overflow: hidden;white-space: nowrap;width: 100%;">'+$.lang.modality+': '+modality+'</div>\n\
<div class="c-position"><div style="float: left;margin-right: 5px">'+$.lang.pipei+': </div><div style="float:left;height:20px;width:'+star_length+'px;background:url(views/assets/base/img/content/misc/star.png) 0 0 repeat-x;"></div>\n\
<div class="c-position" style="margin-top: 10px;"><span class="c-btn btn-no-focus c-btn-header btn btn-xs c-btn-red-1 c-btn-circle c-btn-uppercase c-btn-sbold"><label class="checkbox-inline" style="font-size: 14px; font-weight: 400;"><input id="reserve_'+v.code+'" name="reservation[]" value="'+v.code+'" type="checkbox"> '+$.lang.yuyue+' <i class="icon-clock"></i></label></span></div></div></div>\n\
</div></div>');
    });

    $('#reserve_items').fadeIn().click(function(){
        if($.cookie('uid') && $.cookie('uid') != '') {
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
                $('#reserve_tag').text($.lang.kanpu);
            } else {
                $('#reserve_tag').text($.lang.qiatan);
            }

            var d = new Date();
            var month = d.getMonth()+1;
            var day = d.getDate();
            var date = d.getFullYear() + '-' +
                (month<10 ? '0' : '') + month + '-' +
                (day<10 ? '0' : '') + day;

            if($.cookie('lang') === 'en-us'){
                var reCal = "en-US";
            } else {
                var reCal = "zh-CN";
            }
            $('#reserve_date').datepicker({
                'language': reCal,
                'format': 'yyyy-mm-dd',
                'startDate': '+1d'
            });

            $('#reserve_date').datepicker('setDate',IncrDate(date));
        } else {
            $('#login-form').modal('show');
        }
    });

    var size_li = $(".c-content-list > div").size();
    var x=9;
    if(size_li > x){
        $('#loadMore-container').fadeIn();
    }
    $('.c-content-list > div:lt('+x+')').fadeIn();
    $('.cbp-l-loadMore-link').click(function () {
        x= (x+9 <= size_li) ? x+9 : size_li;
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
                    var mallName,nian;
                    $.each(v.mallCodes, function(j,w) {
                        codes.push(w);
                        
                        $.each($.parseJSON(sessionStorage.getItem("malls")), function(i,v) {
                            if(v.mallCode == w) {
                                if($.cookie('lang') === 'en-us'){
                                    mallName = v.mallNameEng;
                                    nian = ' year(s)';
                                } else {
                                    mallName = v.mallName;
                                    nian = '年';
                                }
                                return false;
                            }
                        });
                        
                        malls.push(mallName);
                    });
                    
                    /*var created = new Date();
                    created.setTime(v.created);
                    created = created.toLocaleString();
                    
                    var start = new Date();
                    start.setTime(v.startDate);
                    var startYear = start.getFullYear('yyyy');
                    var startMonth = start.getMonth('mm')+1;
                    if(startMonth < 10){
                        startMonth = '0'+startMonth;
                    }
                    
                    $('#accordion-'+p).append('<div class="panel"><div class="panel-heading" role="tab" id="heading-'+i+'"><h4 class="panel-title"><a class="collapsed c-font-bold c-font-16" data-toggle="collapse" data-parent="#accordion-'+p+'" href="#collapse-'+i+'" aria-expanded="false"><i class="icon-clock"></i> '+created+' </a></h4></div><div id="collapse-'+i+'" class="panel-collapse collapse" role="tabpanel"><div class="panel-body c-font-14"><a href="javascript: void(0);" style="color: #fff;overflow-wrap: break-word;"><span class="min">'+v.minArea+'</span>-<span class="max">'+v.maxArea+'</span> m²/<span class="st">'+startYear+'-'+startMonth+'</span>/<span class="ln">'+v.rentalLength+'</span>'+nian+'/\n\
<span>'+malls+'</span><span class="cd" style="display:none;">'+codes+'</span>\n\
</a></div></div></div>');*/
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
                
                /*$('.panel-heading:first').find('a').attr('aria-expanded',true);
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
                });*/
                
                showMyInfo();
            } else {
                interpretBusinessCode(response.customerMessage);
            }
        }
    });
}

function showMyInfo(){
    $('#international').html('<option value="">'+$.lang.choose+'</option>');
    
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
                //$('#brand_modality_0').text(GetBrandModality0(brandModality.substr(0,2)));
                $('#brand_modality_0_code').val(brandModality.substr(0,2));
                //$('#brand_modality_1').text(GetBrandModality1(brandModality.substr(0,4)));
                $('#brand_modality_1_code').val(brandModality.substr(0,4));
                //$('#brand_modality_2').text(GetBrandModality2(brandModality.substr(0,6)));
                $('#brand_modality_2_code').val(brandModality.substr(0,6));
                //$('#brand_modality_3').text(GetBrandModality3(brandModality));
                $('#brand_modality_3_code').val(brandModality);
                
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

/*function GetBrandModality0(mod) {
    var mm;
    if(mod !== null && mod !== '') {
        var m = mod;
        $.each($.parseJSON(sessionStorage.getItem("modalities")), function(i,v) {
            if(v.code == m && $.cookie('lang') === 'en-us') {
                mm = v.remark;
            } else if(v.code == m && $.cookie('lang') !== 'en-us') {
                mm = v.name;
            }
        });
    } else {
        mm = '-';
    }
    
    return mm;
}

function GetBrandModality1(mod) {
    var mm;
    if(mod !== null && mod !== '') {
        var m = mod;
        $.each($.parseJSON(sessionStorage.getItem("modalities")), function(i,v) {
            $.each(v.children, function(j,w) {
                if(w.code == m && $.cookie('lang') === 'en-us') {
                    mm = w.remark;
                } else if(w.code == m && $.cookie('lang') !== 'en-us') {
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
                    if(x.code == m && $.cookie('lang') === 'en-us') {
                        mm = x.remark;
                    } else if(x.code == m && $.cookie('lang') !== 'en-us') {
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
                        if(y.code == m && $.cookie('lang') === 'en-us') {
                            mm = y.remark;
                        } else if(y.code == m && $.cookie('lang') !== 'en-us') {
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
}*/

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
        
        if($.cookie('lang') === 'en-us'){
            obj.html("Send");
        } else {
            obj.html("发送");
        }
        
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

function PrettyDate(time){
    d = new Date();
    var date = new Date((time || "").replace(/-/g,"/").replace(/[TZ]/g," ")),
        diff = (((new Date()).getTime() - date.getTime()) / 1000),
        day_diff = Math.floor(diff / 86400);
     if ( isNaN(day_diff) || day_diff < 0 || day_diff >= 31 )
        return;

    if($.cookie('lang') === 'en-us'){
        return day_diff == 0 && (
            diff < 60 && "Just now" ||
            diff < 120 && "1 min ago" ||
            diff < 3600 && Math.floor( diff / 60 ) + " mins ago" ||
            diff < 7200 && "1 hour ago" ||
            diff < 86400 && Math.floor( diff / 3600 ) + " hours ago") ||
        day_diff == 1 && "Yesterday" ||
        day_diff < 7 && day_diff + " days ago" ||
        day_diff < 31 && Math.ceil( day_diff / 7 ) + " weeks ago";
    } else {
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