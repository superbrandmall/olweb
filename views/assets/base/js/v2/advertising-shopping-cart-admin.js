$.order = {
    copy: "",
    uscc: "",
    company: "",
    businessScope: ""
};

$.range = new Array();
$.availableAdsUnit = new Array();

var d = new Date();
var month = d.getMonth()+1;
var day = d.getDate();
var time = d.getTime();
var date = d.getFullYear() + '-' +
    (month<10 ? '0' : '') + month + '-' +
    (day<10 ? '0' : '') + day;

$(document).ready(function(){
    $(".weui-count__number").each(function(){
        $(this).val($.cookie('quantity_'+$(this).attr('id').split('_')[1]) || 1);
    })
    
    getAdScheduleInfo();
    getAdBaseInfo();
    getShoppingCart();
    
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
                $.each($.parseJSON(sessionStorage.getItem("ads_schedule")), function(i,v){
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
                $.each($.parseJSON(sessionStorage.getItem("ads_schedule")), function(i,v){
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
    
    $('.weui-count__decrease').click(function (e) {
        showLoading();
        var $input = $(e.currentTarget).parent().find('.weui-count__number');
        var number = parseInt($input.val() || "0") - 1;
        if (number < $(this).parent().find('.weui-count__number').attr('min')) number = $(this).parent().find('.weui-count__number').attr('min');
        $input.val(number);
        $.cookie('quantity_'+$input.attr('id').split('_')[1],number);
        if(number == 0){
            $(this).hide();
            $(this).parent().find('.weui-count__increase').show();
        } else if(number < $(this).parent().find('.weui-count__number').attr('max')){
            $(this).parent().find('.weui-count__increase').show();
        }
        getSubTotal();
    })
    
    $('.weui-count__increase').click(function (e) {
        showLoading();
        var $input = $(e.currentTarget).parent().find('.weui-count__number');
        var number = parseInt($input.val() || "0") + 1;
        if (number > $(this).parent().find('.weui-count__number').attr('max')) number = $(this).parent().find('.weui-count__number').attr('max');
        $input.val(number);
        $.cookie('quantity_'+$input.attr('id').split('_')[1],number);
        if(number == $(this).parent().find('.weui-count__number').attr('max')){
            $(this).hide();
            $(this).parent().find('.weui-count__decrease').show();
        } else if(number >   $(this).parent().find('.weui-count__number').attr('min')){
            $(this).parent().find('.weui-count__decrease').show();
        }
        getSubTotal();
    });
    
    $("#check_all").click(function () {
        if($(this).prop("checked")) {
            $("input:checkbox[name='check_items']").prop("checked",true);      
        } else {
            $("input:checkbox[name='check_items']").prop("checked",false);
        }
        getSubTotal();
    });
    
    $(".weui-panel .weui-check").each(function(){
        $(this).click(function(){
            getSubTotal();
        })
    })
    
    $('.weui-cell_swiped').swipeout();
    $('.weui-cell_swiped').swipeout('close');
    $('.delete-swipeout').click(function () {
        removeFromShoppingCart($(this).attr('id').split('_')[1]); 
    })

    $('.weui-cell_swiped').swipeout('open');
    $(document).on("swipeout-open",'.weui-cell_swiped',function(){
        //监听打开触发
    })
    $(document).on("swipeout-close",'.weui-cell_swiped',function(){
        //监听关闭触发
    })
})

function showExpectDatePicker(month,id,dates,type) {
    showLoading();
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
                $.cookie('sStart',result[0].label.replace("年","-") + month + ("-") + date);
                $(".date-start").each(function(){
                    if($(this).val() == '') {
                        $(this).val(result[0].label.replace("年","-") + month + ("-") + date);
                    }
                })
                
                var vdate = [];
                $.each($.parseJSON(sessionStorage.getItem("ads_schedule")), function(i,v){
                    if(id.split('_')[1] == v.shopNo && $.inArray(v.date, vdate) == -1){
                        vdate.push(v.date);
                    }
                })
                
                for(var x=0;x<vdate.length;x++){
                    if($.inArray(sEnd, vdate) == -1){
                        if($('#'+id).parent().parent().parent().find('.date-end').val() != '' && $('#'+id).parent().parent().parent().find('.date-end').val() > DecrDate(sEnd)){
                            $('#'+id).parent().parent().parent().find('.date-end').val(DecrDate(sEnd));
                            $.cookie('sEnd',DecrDate(sEnd));
                        } else if($('#'+id).parent().parent().parent().find('.date-end').val() == '') {
                            $('#'+id).parent().parent().parent().find('.date-end').val(DecrDate(sEnd));
                            $.cookie('sEnd',DecrDate(sEnd));
                        }
                        
                        $(".date-end").each(function(){
                            if($(this).val() == '') {
                                $(this).val(DecrDate(sEnd));
                                $.cookie('sEnd',DecrDate(sEnd));
                            }
                        })
                
                        getSubTotal();
                        return false;
                    } else {
                        sEnd = IncrDate(sEnd);
                    }
                }
            } else if(type == 1){
                var sStart = DecrDate(result[0].label.replace("年","-") + month + ("-") + date);
                $.cookie('sEnd',result[0].label.replace("年","-") + month + ("-") + date);
                
                $(".date-end").each(function(){
                    if($(this).val() == '') {
                        $(this).val(result[0].label.replace("年","-") + month + ("-") + date);
                    }
                })
                
                var vdate = [];
                $.each($.parseJSON(sessionStorage.getItem("ads_schedule")), function(i,v){
                    if(id.split('_')[1] == v.shopNo && $.inArray(v.date, vdate) == -1){
                        vdate.push(v.date);
                    }
                })
                
                for(var x=0;x<vdate.length;x++){
                    if($.inArray(sStart, vdate) == -1){
                        if($('#'+id).parent().parent().parent().find('.date-start').val() != '' && $('#'+id).parent().parent().parent().find('.date-start').val() < IncrDate(sStart)){
                            $('#'+id).parent().parent().parent().find('.date-start').val(IncrDate(sStart));
                            $.cookie('sStart',DecrDate(IncrDate(sStart)));
                        } else if($('#'+id).parent().parent().parent().find('.date-start').val() == '') {
                            $('#'+id).parent().parent().parent().find('.date-start').val(IncrDate(sStart));
                            $.cookie('sStart',DecrDate(IncrDate(sStart)));
                        }
                        
                        $(".date-start").each(function(){
                            if($(this).val() == '') {
                                $(this).val(IncrDate(sStart));
                                $.cookie('sStart',DecrDate(IncrDate(sStart)));
                            }
                        })
                
                        getSubTotal();
                        return false;
                    } else {
                        sStart = DecrDate(sStart);
                    }
                }
                
            }
        }
    })
}

function getShoppingCart() {
    var storeCode = 'OLMALL180917000003';
    if(getURLParameter('storeCode') && getURLParameter('storeCode') != 'undefined') {
        storeCode = getURLParameter('storeCode');
    }
    
    $.ajax({
        url: $.api.baseNew+"/comm-wechatol/api/user/favorites/wx/findAllByMobileNo?mobileNo="+$.cookie('uid'),
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
                
                if(response.data.length > 0){
                    sessionStorage.setItem("shopping_cart_terms", JSON.stringify(response.data));
                    
                    $.each(response.data, function(i,v){
                        if(v.unitType == 'shopping-cart' && v.storeCode == storeCode){
                            renderAdsList(JSON.stringify(v));
                        }
                    });
                    
                    getSubTotal();
                    
                    if(getURLParameter('info') && getURLParameter('info') == 'done'){
                        var code;
                        $(".weui-panel .weui-check").each(function(){
                            if($(this).prop("checked")) {
                                code = $(this).attr('id').split('_')[1];
                                return false;
                            }
                        })
                        findUserCompanyByMobileNo(code);
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

function updateShoppingCart(id,bc,c,sc,uc){
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
        "unitType": "shopping-cart"
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

function removeFromShoppingCart(id) {
    showLoading();
    $.ajax({
        type: "DELETE",
        url: $.api.baseNew+"/comm-wechatol/api/user/favorites/wx/delete/"+id,
        async: false,
        cache: false,
        processData: false,
        contentType: false,
        beforeSend: function(request) {
            showLoading();
            request.setRequestHeader("Login", $.cookie('login'));
            request.setRequestHeader("Authorization", $.cookie('authorization'));
            request.setRequestHeader("Lang", $.cookie('lang'));
            request.setRequestHeader("Source", "onlineleasing");
        },
        complete: function(){},
        success: function(response, status, xhr) {
            hideLoading();
            $('#swipe_'+id).parent().parent().parent().parent().parent().fadeOut('slow').remove();
            getSubTotal();
        }
    })
}

function renderAdsList(s){
    $('#shoppingCartEmpty').hide();
    
    var w = $.parseJSON(s);
    var unitDesc = '';
    var quantity = 0;
    var type;
    var img;
    var unitCode;
    var taxAmount;
    var frequency;
    
    $.each($.parseJSON(sessionStorage.getItem("ads")), function(k,y){
        if(w.shopCode == y.code){
            unitDesc = y.unitDescChs;
            quantity = quantity + 1;
            type = y.typeChs;
            img = y.advertisingImagesWxList[0].imagePath;
            unitCode = y.unitCode;
            taxAmount = parseFloat((y.dailyPrice*1.06).toFixed(2));
            frequency = y.remarkFirst;
        }
    })

    var style = '';
    if(quantity == 1){
        style = " display: none;";
    }

    $('.page__bd').append('<div class="weui-panel" style="margin-top: 0;">\n\
        <div class="weui-panel__hd">\n\
            '+unitDesc+'\n\
        </div>\n\
        <div class="weui-panel__bd">\n\
            <div class="weui-media-box weui-media-box_appmsg weui-cells weui-cells_checkbox" style="padding: 0 0 0 16px; margin-top: 0;">\n\
                <label class="weui-cell weui-cell_active weui-check__label" for="check_'+w.shopCode+'" style="padding: 0;">\n\
                    <div class="weui-cell__hd">\n\
                        <input type="checkbox" class="weui-check" name="check_items" id="check_'+w.shopCode+'" checked="checked">\n\
                        <i class="weui-icon-checked"></i>\n\
                    </div>\n\
                    <div class="weui-media-box__hd" style="width: 100px; height: 80px;">\n\
                        <img class="weui-media-box__thumb" src="'+img+'" alt="">\n\
                    </div>\n\
                </label>\n\
                <div class="weui-media-box__bd weui-cell_swiped">\n\
                    <div class="weui-form-preview__bd weui-cell__bd" style="font-size: 15px;">\n\
                        <div class="weui-form-preview__item">\n\
                            <span class="weui-form-preview__value" style="text-align: left;">'+type+'</span>\n\
                            <span class="weui-form-preview__value">\n\
                                <div class="weui-cell__bd">\n\
                                    <input class="weui-input date-start" id="dateStart_'+w.shopCode+'" placeholder="填写档期起始日" readonly>\n\
                                </div>\n\
                            </span>\n\
                            <span class="weui-form-preview__value">\n\
                                <div class="weui-cell__bd">\n\
                                    <input class="weui-input date-end" id="dateEnd_'+w.shopCode+'" placeholder="填写档期终止日" readonly>\n\
                                </div>\n\
                            </span>\n\
                        </div>\n\
                    </div>\n\
                    <div class="weui-cell__ft">\n\
                        <a id="swipe_'+w.id+'" class="weui-swiped-btn weui-swiped-btn_warn delete-swipeout" style="padding-top: 50%;" href="javascript:">删除</a>\n\
                    </div>\n\
                </div>\n\
            </div>\n\
            <div style="padding: 0 24px 16px;">\n\
                单价: ¥ <span id="taxAmount_'+w.shopCode+'">'+numberWithCommas(taxAmount)+'</span><small>/'+frequency+' (含6%税费)</small></div>\n\
            <div class="weui-cell">\n\
                <div class="weui-cell__bd">\n\
                    <p><span style="color: #b43018; font-weight: bold;">¥ </span><span id="totalAmount_'+w.shopCode+'" style="color: #b43018; font-size: 18px; font-weight: bold;">'+numberWithCommas(taxAmount)+'</span> <small>(含6%税费及20%押金)</small></p>\n\
                </div>\n\
                <div class="weui-cell__ft">\n\
                    <div class="weui-count">\n\
                        <a class="weui-count__btn weui-count__decrease"></a>\n\
                        <input id="qty_'+w.shopCode+'" class="weui-count__number" type="number" value="1" min="0" max="'+quantity+'" readonly />\n\
                        <a class="weui-count__btn weui-count__increase" style="'+style+'"></a>\n\
                    </div>\n\
                </div>\n\
            </div>\n\
        </div>\n\
    </div>\n\
    ');
    
    if($.cookie('quantity_'+w.shopCode) && $.cookie('quantity_'+w.shopCode) != null && $.cookie('quantity_'+w.shopCode) >= 0 && $.cookie('quantity_'+w.shopCode) <= quantity) {
        $('#qty_'+w.shopCode).val($.cookie('quantity_'+w.shopCode));
    }
        
    if($.cookie('sStart') != '' && $.cookie('sStart') != null){
        $('.date-start').val($.cookie('sStart'));
    } else {
        $('.date-start').val(date);
    }
    
    if($.cookie('sEnd') != '' && $.cookie('sEnd') != null){
        $('.date-end').val($.cookie('sEnd'));
    } else {
        $('.date-end').val('2020-12-31');
    }
    
}

function getAdBaseInfo() {
    var storeCode = 'OLMALL180917000003';
    if(getURLParameter('storeCode') && getURLParameter('storeCode') != 'undefined') {
        storeCode = getURLParameter('storeCode');
    }
    
    $.ajax({
        url: $.api.baseNew+"/comm-wechatol/api/advertising/base/findAllByStoreCode?storeCode="+storeCode,
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
                sessionStorage.setItem("ads", JSON.stringify(response.data));
                
                $('#confirm_price').click(function(){
                    datesAlignCheck();
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

function getAdScheduleInfo() {
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
                var adsSchedule = [];
                
                if(response.data.length > 0){
                    $.each(response.data, function(i,v){
                        if(v.unitType == 'ADS'){
                            adsSchedule.push(v);
                        }
                    });
                }
                sessionStorage.setItem("ads_schedule", JSON.stringify(adsSchedule));
            } else {
                interpretBusinessCode(response.customerMessage);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}

function getSubTotal() {
    var subTotal = 0;
    var subItems = 0;
    var storeCode = 'OLMALL180917000003';
    if(getURLParameter('storeCode') && getURLParameter('storeCode') != 'undefined') {
        storeCode = getURLParameter('storeCode');
    }
    $.each($.parseJSON(sessionStorage.getItem("shopping_cart_terms")), function(i,v){
        if(v.unitType == 'shopping-cart' && v.storeCode == storeCode){ 
            var rentAmount = 0;
            var deposit = 0;
            $.each($.parseJSON(sessionStorage.getItem("ads")), function(k,y){
                if(v.shopCode == y.code){
                    rentAmount = y.dailyPrice;
                }
            })

            var code;
            var qty = 1;
            var amount = 1;
            var result = 1;
            $(".weui-panel .weui-check").each(function(){
                if($(this).prop("checked")) {
                    code = $(this).attr('id').split('_')[1];
                    if(code == v.shopCode){
                        if($.cookie('quantity_'+code) != '' && $.cookie('quantity_'+code) != null){
                            qty = $.cookie('quantity_'+code);
                        } else {
                            qty = $(this).parents('.weui-panel__bd').find('.weui-count__number').val();
                        }
                        
                        var sDate = $('#dateStart_'+code).val() || $.cookie('sStart');
                        var eDate =  $('#dateEnd_'+code).val() || $.cookie('sEnd');
                        var sArr = sDate.split("-");
                        var eArr = eDate.split("-");
                        var sRDate = new Date(sArr[0], sArr[1], sArr[2]);
                        var eRDate = new Date(eArr[0], eArr[1], eArr[2]);
                        result = (eRDate-sRDate)/(24*60*60*1000)+1 || 1;
                        $.cookie('result_ad',result);
                        amount = parseFloat((rentAmount * 1.06 * qty * result).toFixed(2));
                        deposit = parseFloat((amount*0.2).toFixed(2));
                        amount = parseFloat((amount+deposit).toFixed(2));
                        $('#totalAmount_'+code).text(numberWithCommas(amount.toFixed(2)));
                        subTotal = parseFloat((subTotal+amount).toFixed(2));
                        subItems = parseInt(subItems) + parseInt(qty);
                       
                        $.range = [];
                        for(var d=0;d<result;d++){
                            $.range.push({
                                'code': code,
                                'sDate': sDate
                            });
                            sDate = IncrDate(sDate);
                        }

                        $.each($.range, function(index,value){
                            if(value.code == code){
                                $.each($.parseJSON(sessionStorage.getItem("ads_schedule")), function(i,v){
                                    if(v.unitType == 'ADS' && v.date == value.sDate && v.shopNo == code){
                                        var adsUnit = {
                                            'code': code,
                                            'unitCode': v.unitCode
                                        };
                                        var inArray = JSON.stringify($.availableAdsUnit).indexOf(JSON.stringify(adsUnit));
                                        if(v.enable == 1 && inArray == -1){
                                            $.availableAdsUnit.push({
                                                'code': code,
                                                'unitCode': v.unitCode
                                            });
                                        }
                                    }
                                })
                            }
                        })
                    }
                }
            })
        }
    })
    
    $(".weui-panel .weui-check").each(function(){
        if($(this).prop("checked") && $(this).parent().parent().parent().find('.date-start').val() != '' && $(this).parent().parent().parent().find('.date-end').val() != '') {
            var code = $(this).attr('id').split('_')[1];
            var quantity = 0;

            $.each($.availableAdsUnit, function(index,value){
                if(value.code == code){
                    quantity++;
                }
            })
            
            $('#qty_'+code).attr('max',quantity);     
        }
    })
    
    $('#subTotal').text(numberWithCommas(subTotal.toFixed(2)));
    $.cookie('subtotal',subTotal.toFixed(2));
    $('#subQTY').text(subItems);
    $.cookie('subqty',subItems);
    
    hideLoading();
}

function findUserCompanyByMobileNo(sc){
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
                        saveOrder(sc);
                    }
                } else {
                    window.location.href = '/v2/improve-info?type=ads&storeCode='+getURLParameter('storeCode');
                }
            }
        }
    })
}

function saveOrder(sc){
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

    var shopCode = sc;
        
    /* 
     * @订单状态  
    *  合同已生成
    *  合同用印中
    *  待付款订单
    *  已完成订单
    *  已关闭订单
     */

    var outTradeNo = '10JT' + orgCode + d.getFullYear() +
            (month<10 ? '0' : '') + month +
            (day<10 ? '0' : '') + day + time
            + parseInt(Math.random()*10);

    var map = {
        "amount": 100000,
        "appid": "",
        "brandId": "",
        "brandName": $.cookie('brand_1'),
        "code": "",
        "contractNo": "",
        "contractType": "R4",//R1租赁 R4广告 R5场地
        "mobileNo": $.cookie('uid'),
        "name": "wechatol",
        "orderStates": "合同已生成", //订单状态
        "orgCode": orgCode,
        "outTradeNo": outTradeNo,
        "payStates": "未支付", //支付状态
        "tenantId": "", //空
        "tenantName": $.order.company,
        "tenantNo": "", //空
        "tenantOrg": $.order.uscc, //uscc
        "userId": $.cookie('uid'), //手机号
        "remarkFirst": shopCode,
        "remarkSecond": 'advertising'
    };
    
    var contractInfos = [];
    var contractTermInfos = [];
    var units = "";
    $(".weui-panel .weui-check").each(function(){
        if($(this).prop("checked")) {
            var code = $(this).attr('id').split('_')[1];
            var qty = $.cookie('quantity_'+code) || $(this).parents('.weui-panel__bd').find('.weui-count__number').val();
            var sDate = $('.date-start').val() || $.cookie('sStart');
            var eDate =  $('.date-end').val() || $.cookie('sEnd');
            var sArr = sDate.split("-");
            var eArr = eDate.split("-");
            var sRDate = new Date(sArr[0], sArr[1], sArr[2]);
            var eRDate = new Date(eArr[0], eArr[1], eArr[2]);
            var result = (eRDate-sRDate)/(24*60*60*1000)+1 || 1;
            
            
            $.range = [];
            for(var d=0;d<result;d++){
                $.range.push({
                    'code': code,
                    'sDate': sDate
                });
                sDate = IncrDate(sDate);
            }

            $.each($.range, function(index,value){
                if(value.code == code){
                    $.each($.parseJSON(sessionStorage.getItem("ads_schedule")), function(i,v){
                        if(v.unitType == 'ADS' && v.date == value.sDate && v.shopNo == code){
                            var adsUnit = {
                                'code': code,
                                'unitCode': v.unitCode
                            };
                            var inArray = JSON.stringify($.availableAdsUnit).indexOf(JSON.stringify(adsUnit));
                            if(v.enable == 1 && inArray == -1){
                                
                                $.availableAdsUnit.push({
                                    'code': code,
                                    'unitCode': v.unitCode
                                });
                            }
                        }
                    })
                }
            })
            
            var indexs = 0;
            var unitDesc, size, spec, frequency, amount, taxAmount, rentAmount, deposit, src;
            $.each($.availableAdsUnit, function(index,value){
                if(value.code == code && indexs < qty){
                    $.each($.parseJSON(sessionStorage.getItem("ads")), function(k,y){
                        if(value.unitCode == y.unitCode){
                            unitDesc = y.unitDescChs;
                            size = y.size;
                            spec = y.material;
                            frequency = y.remarkFirst;
                            amount = parseFloat((y.dailyPrice * $.cookie('result_ad') * 1.06).toFixed(2));
                            taxAmount = parseFloat((y.dailyPrice * $.cookie('result_ad')).toFixed(2));
                            rentAmount = y.dailyPrice;
                            deposit = parseFloat((amount * 0.2).toFixed(2));
                            src = '/views/assets/base/img/content/mall/1s.jpg';
                            if(y.advertisingImagesWxList != null && y.advertisingImagesWxList.length > 0){
                                src = y.advertisingImagesWxList[0].imagePath;
                            }
                        }
                    })
                    
                    units = units + '【'+ value.unitCode + '】';
                    
                    contractInfos.push({
                        "amount": amount,
                        "bizScope": $.order.businessScope,
                        "breachAmount": "",
                        "code": value.unitCode,
                        "depositAmount": deposit,
                        "electricBillFlag": "1",
                        "endDate": $('.date-end').val() || $.cookie('sEnd'),
                        "enterDate": $('.date-start').val() || $.cookie('sStart'),
                        "isCleaning": "1",
                        "isSecurity": "1",
                        "isService": "1",
                        "mobileNo": $.cookie('uid'),
                        "name": "test name",
                        "num": 1,
                        "openDate": $('.date-start').val() || $.cookie('sStart'),
                        "orgCode": orgCode,
                        "otherFlag": "",
                        "outTradeNo": outTradeNo,
                        "remarkFifth": "",
                        "remarkFirst": src,
                        "remarkFourth": "",
                        "remarkSecond": frequency,
                        "remarkThird": "1",
                        "salesFlag": "1",
                        "serviceDepositAmount": 0,
                        "size": size, //广告尺寸规格
                        "spec": spec,
                        "startDate": $('.date-start').val() || $.cookie('sStart'),
                        "unitCode": value.unitCode,
                        "unitDesc": unitDesc,
                        "unitId": "", //uuid
                        "userId": $.cookie('uid'),
                        "vipFlag": "1",
                        "wxCardFlag": "1",
                        "area": 1, //广告默认传1
                        "shopCode": value.code
                    })
                    
                    contractTermInfos.push({
                        "amount": amount,
                        "code": "1",
                        "endDate": $('.date-end').val() || $.cookie('sEnd'),
                        "name": unitDesc,
                        "orgCode": orgCode,
                        "outTradeNo": outTradeNo,
                        "rentAmount": rentAmount,
                        "startDate": $('.date-start').val() || $.cookie('sStart'),
                        "taxAmount": taxAmount,
                        "termType": "B033",
                        "termTypeName": "固定租金",
                        "unitCode": value.unitCode,
                        "unitId": "",
                        "area": 1,
                        "shopCode": value.code
                    })
                    indexs++;
                }
            })
        }
    })
    
    map.contractInfos = contractInfos;
    map.contractTermInfos = contractTermInfos;
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
                getOrderByTradeNO(outTradeNo,units);
            } else {
                interpretBusinessCode(response.customerMessage);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
    
}

function getOrderByTradeNO(outTradeNo,units) {
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
                generateContract(response.data.id,'订单合同已生成','您的订单【'+mallName+'】广告位置'+units+'合同已生成，请前往我的订单管理页面查看。',outTradeNo, '我的消息',units,'/v2/stamping');
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

function datesAlignCheck() {
    var go = 1;
    var tempStart = '';
    var tempEnd = '';
    $('.date-start').each(function(i,elem){
        if(tempStart == '') {
            tempStart = $(this).val();
        }
        
        if($(this).val() == ''){
            go = 0;
        } else if ($(this).val() != tempStart){
            go = 2;
        } 
    })
    
    $('.date-end').each(function(i,elem){
        if(tempEnd == '') {
            tempEnd = $(this).val();
        }
        
        if($(this).val() == ''){
            go = 0;
        } else if($(this).val() != tempEnd){
            go = 2;
        }
    })
    
    if(go == 1){
        window.location.href = '/v2/improve-info?type=ads&storeCode='+getURLParameter('storeCode');
    } else {
        if(go == 0){
            $('body').append('<div id="js_toast_2" style="display: none;"><div class="weui-mask_transparent"></div><div class="weui-toast"><i class="weui-icon-cancel weui-icon_toast" style="color: #FA5151;"></i><p class="weui-toast__content"> 档期起始日与终止日不能为空 </p></div></div>');
        } else {
            $('body').append('<div id="js_toast_2" style="display: none;"><div class="weui-mask_transparent"></div><div class="weui-toast"><i class="weui-icon-cancel weui-icon_toast" style="color: #FA5151;"></i><p class="weui-toast__content"> 同一订单档期起始日与终止日需保持一致 </p></div></div>');            
        }
        
        var $toast = $('#js_toast_2');

        $('.page.cell').removeClass('slideIn');

        $toast.fadeIn(100);
        setTimeout(function () {
            $toast.fadeOut(100);
        }, 2000);
    }
}