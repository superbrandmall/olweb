var d = new Date();
var month = d.getMonth()+1;
var day = d.getDate();
var date = d.getFullYear() + '-' +
    (month<10 ? '0' : '') + month + '-' +
    (day<10 ? '0' : '') + day;
    
$.vals = [];
$.leaseTerm = 2;

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
    
    listSelectOptions();
    
    $('#subtype').change(function(){
        listSelectOptions();
    });
    
    ///////////////////// Validate search form /////////////////////////
    if($.cookie('lang') === 'en-us'){
        var requirement_min_area_LessThanEqual = "Minimum leasable area mustn't be greater than maximum leasable area";
        var requirement_subtype_required = "Please choose a subtype";
        var requirement_length_required = "Please choose a lease term";
        var requirement_start_required = "Moving in date can't be empty";
        var requirement_start_date = "Please give a correct date";
    } else {
        var requirement_min_area_LessThanEqual = "最小租赁面积不得大于最大租赁面积";
        var requirement_subtype_required = "请选择店铺类型";
        var requirement_length_required = "请选择租约年限";
        var requirement_start_required = "预计入驻日期为必填项";
        var requirement_start_date = "请输入有效日期";
    }
    
    $("#requirement_form").validate({
        rules: {
            min_area: {
                lessThanEqual: "#max_area"
            },
            subtype: {
                required: true
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
            subtype: {
                required: requirement_subtype_required
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
            $.cookie('search-sub-type',$("#subtype").val());
            $.cookie('search-rental-length',$("#length").val());
            $.cookie('search-start-date',$("#start").val());
                
            $('#loader').fadeIn(function(){
                ShowSearch();
            }); 
        }
    });
});

function ShowSearchInit(){
    var mallCodes = [$.mallCode.shanghaiSbm];
    if(getURLParameter('mall')) {
        switch (getURLParameter('mall')) {
            case "olmall180917000003":
                mallCodes = [$.mallCode.shanghaiSbm];
                break;
            case "olmall190117000001":
                mallCodes = [$.mallCode.luoyangSbm];
                break;
            default:
                break;
        }
    }
    
    $('.c-content-team-1-slider .c-content-title-1,.c-content-list').html('');
    var map = {
        userCode: '',
        brandCode: '',
        brandName: '',
        brandModality: '',
        subType: '正柜',
        minArea: 0,
        maxArea: 3000,
        startDate: IncrMonth(date),
        endDate: '',
        mallCodes: mallCodes,
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
    
    var endDate;
    if($.leaseTerm == 1){
        endDate = IncrYears($("#start").val()+'-01',$('#length').val());
    } else {
        endDate = IncrMonths($("#start").val()+'-01',$('#length').val());
    }
            
    var map = {
        userCode: '',
        brandCode: '',
        brandName: $("#brand").text(),
        brandModality: $("#brand_modality_3_code").val(),
        subType: $("#subtype").val(),
        minArea: $("#min_area").val(),
        maxArea: $("#max_area").val(),
        startDate: $("#start").val()+'-01',
        endDate: endDate,
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
            request.setRequestHeader("Lang", $.cookie('lang'));
            request.setRequestHeader("Source", "onlineleasing");
        },
        success: function (response, status, xhr) {
            $('#loader').hide();
            if(response.code === 'C0') {
                $('html,body').animate({
                scrollTop: $(".c-content-list").offset().top - 200},
                'slow');
               
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
        
        var img;
        if(v.shopState !== 0 && v.shopState !== 2){ //非在租或待租
            img = '/views/assets/base/img/content/mall/empty.jpg';
        } else {
            if(result.firstImage === null){
                img = '/views/assets/base/img/content/mall/empty.jpg';
            } else {
                img = v.firstImage;
            }
        }
        
        $('.c-content-list').append('<div class="col-md-4" style="display: none;"><div class="c-content-person-1 c-option-2 c-shadow">\n\
<div class="c-caption c-content-overlay"><div class="c-overlay-wrapper">\n\
<div class="c-overlay-content"><a class="cbp-l-caption-buttonLeft btn c-btn-square c-btn-border-1x c-btn-white c-btn-bold c-btn-uppercase" href="shop?id='+v.code+'&search='+searchCode+'">'+$.lang.dianpujieshao+'</a></div></div><img class="c-overlay-object img-responsive" src="'+img+'" alt=""></div>\n\
<div class="c-body"><div class="c-head"><div class="c-name c-font-uppercase c-font-bold">'+mallName+'</div>\n\
</div>\n\
<div class="c-position">'+$.lang.louceng+': '+floorName+'</div><div class="c-position">'+$.lang.mianji+': '+v.area+'m<sup>2</sup></div><div class="c-position" style="text-overflow: ellipsis;overflow: hidden;white-space: nowrap;width: 100%;">'+$.lang.modality+': '+modality+'</div>\n\
<div class="c-position"><div style="float: left;margin-right: 5px">'+$.lang.pipei+': </div><div style="float:left;height:20px;width:'+star_length+'px;background:url(views/assets/base/img/content/misc/star.png) 0 0 repeat-x;"></div>\n\
</div></div>\n\
</div></div>');
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

function listSelectOptions() {
    $('#length').html('<option value="">'+$.lang.choose+'</option>');
    if($('#subtype').val() == '正柜'){
        $.leaseTerm = 1;
        for(var i=1; i<=8; i++){
            $('#length').append('<option value="'+i+'">'+i+$.lang.lengthYear+'</option>');
        }
    } else {
        $.leaseTerm = 2;
        for(var i=1; i<=12; i++){
            $('#length').append('<option value="'+i+'">'+i+$.lang.lengthMonth+'</option>');
        }
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
