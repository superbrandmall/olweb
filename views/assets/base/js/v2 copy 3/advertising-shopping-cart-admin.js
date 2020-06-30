$.order = {
    copy: ""
};

$(document).ready(function(){
    getAdBaseInfo();
    getAdScheduleInfo();
    getOrderByOrderStates();
    
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
        var $input = $(e.currentTarget).parent().find('.weui-count__number');
        var number = parseInt($input.val() || "0") - 1;
        if (number < $(this).parent().find('.weui-count__number').attr('min')) number = $(this).parent().find('.weui-count__number').attr('min');
        $input.val(number);
        if(number == 0){
            $(this).hide();
            $(this).parent().find('.weui-count__increase').show();
        } else if(number < $(this).parent().find('.weui-count__number').attr('max')){
            $(this).parent().find('.weui-count__increase').show();
        }
        getSubTotal();
    })
    $('.weui-count__increase').click(function (e) {
        var $input = $(e.currentTarget).parent().find('.weui-count__number');
        var number = parseInt($input.val() || "0") + 1;
        if (number > $(this).parent().find('.weui-count__number').attr('max')) number = $(this).parent().find('.weui-count__number').attr('max');
        $input.val(number);
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
    
    $('#confirm_price').click(function(){
        getOrderByTradeNO();
    });
})

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
                var vdate = [];
                $.each($.parseJSON(sessionStorage.getItem("ads_schedule")), function(i,v){
                    if(id.split('_')[1] == v.shopNo){
                        vdate.push(v.date);
                    }
                })
                
                for(var x=0;x<vdate.length;x++){
                    if($.inArray(sEnd, vdate) == -1){
                        if($('#'+id).parent().parent().parent().find('.date-end').val() != '' && $('#'+id).parent().parent().parent().find('.date-end').val() > DecrDate(sEnd)){
                            $('#'+id).parent().parent().parent().find('.date-end').val(DecrDate(sEnd));
                        } else if($('#'+id).parent().parent().parent().find('.date-end').val() == '') {
                            $('#'+id).parent().parent().parent().find('.date-end').val(DecrDate(sEnd));
                        }
                        getSubTotal();
                        return false;
                    } else {
                        sEnd = IncrDate(sEnd);
                    }
                    
                }
            } else if(type == 1){
                var sStart = DecrDate(result[0].label.replace("年","-") + month + ("-") + date);
                var vdate = [];
                $.each($.parseJSON(sessionStorage.getItem("ads_schedule")), function(i,v){
                    if(id.split('_')[1] == v.shopNo){
                        vdate.push(v.date);
                    }
                })
                
                for(var x=0;x<vdate.length;x++){
                    if($.inArray(sStart, vdate) == -1){
                        if($('#'+id).parent().parent().parent().find('.date-start').val() != '' && $('#'+id).parent().parent().parent().find('.date-start').val() < IncrDate(sStart)){
                            $('#'+id).parent().parent().parent().find('.date-start').val(IncrDate(sStart));
                        } else if($('#'+id).parent().parent().parent().find('.date-start').val() == '') {
                            $('#'+id).parent().parent().parent().find('.date-start').val(IncrDate(sStart));
                        }
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

function getOrderByOrderStates() {
    $.ajax({
        url: $.api.baseNew+"/comm-wechatol/api/order/findAllByMobileNoAndOrderStates?mobileNo="+$.cookie('uid')+"&orderStates=待确认订单",
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
                if(response.data != '') {
                    var subTotal = 0;
                    $.each(response.data, function(i,v){
                        if(v.remarkSecond == 'advertising'){
                            $('.page__bd').html('');
                            var quantity = 0;
                            var type;
                            sessionStorage.setItem("shopping_cart_terms", JSON.stringify(v.contractTermInfos));
                            $.each(v.contractTermInfos, function(j,w){
                                quantity = 0;
                                subTotal = subTotal+w.amount;
                                $.each($.parseJSON(sessionStorage.getItem("ads")), function(k,y){
                                    if(w.remarkFirst == y.code){
                                        quantity = quantity + 1;
                                        type = y.typeChs;
                                    }
                                })
                                
                                var style = '';
                                if(quantity == 1){
                                    style = " display: none;";
                                }
                                
                                $('.page__bd').append('<div class="weui-panel" style="margin-top: 0;">\n\
            <div class="weui-panel__hd">\n\
                '+w.name+'\n\
            </div>\n\
            <div class="weui-panel__bd">\n\
                <div class="weui-media-box weui-media-box_appmsg weui-cells weui-cells_checkbox" style="padding-top: 0; padding-bottom: 0; margin-top: 0;">\n\
                    <label class="weui-cell weui-cell_active weui-check__label" for="check_'+w.remarkFirst+'" style="padding: 0;">\n\
                        <div class="weui-cell__hd">\n\
                            <input type="checkbox" class="weui-check" name="check_items" id="check_'+w.remarkFirst+'" checked="checked">\n\
                            <i class="weui-icon-checked"></i>\n\
                        </div>\n\
                        <div class="weui-media-box__hd" style="width: 100px; height: 80px;">\n\
                            <img class="weui-media-box__thumb" src="'+v.contractInfos[j].remarkFirst+'" alt="">\n\
                        </div>\n\
                    </label>\n\
                    <div class="weui-media-box__bd">\n\
                        <div class="weui-form-preview__bd" style="font-size: 15px;">\n\
                            <div class="weui-form-preview__item">\n\
                                <span class="weui-form-preview__value" style="text-align: left;">'+type+'</span>\n\
                                <span class="weui-form-preview__value">\n\
                                    <div class="weui-cell__bd">\n\
                                        <input class="weui-input date-start" id="dateStart_'+w.remarkFirst+'" placeholder="填写档期起始日" readonly>\n\
                                    </div>\n\
                                </span>\n\
                                <span class="weui-form-preview__value">\n\
                                    <div class="weui-cell__bd">\n\
                                        <input class="weui-input date-end" id="dateEnd_'+w.remarkFirst+'" placeholder="填写档期终止日" readonly>\n\
                                    </div>\n\
                                </span>\n\
                            </div>\n\
                        </div>\n\
                    </div>\n\
                </div>\n\
                <div class="weui-cell">\n\
                    <div class="weui-cell__bd">\n\
                        <p>¥<span id="taxAmount_'+w.remarkFirst+'">'+numberWithCommas(w.taxAmount)+'</span><small>/'+v.contractInfos[j].remarkSecond+' (不含6%税费)</small></p>\n\
                    </div>\n\
                    <div class="weui-cell__ft">\n\
                        <div class="weui-count">\n\
                            <a class="weui-count__btn weui-count__decrease"></a>\n\
                            <input id="qty_'+w.unitCode+'" class="weui-count__number" type="number" value="1" min="0" max="'+quantity+'" readonly />\n\
                            <a class="weui-count__btn weui-count__increase" style="'+style+'"></a>\n\
                        </div>\n\
                    </div>\n\
                </div>\n\
            </div>\n\
        </div>\n\
                                ');
                            })
                        }
                    });
                    
                   getSubTotal();
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

function getAdBaseInfo() {
    $.ajax({
        url: $.api.baseNew+"/comm-wechatol/api/advertising/base/findAllByStoreCode?storeCode=OLMALL180917000003",
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
    $.ajax({
        url: $.api.baseNew+"/comm-wechatol/api/shop/schedule/findAllByStoreCodeAndEnable?storeCode=OLMALL180917000003&enable=1",
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
                $.each(response.data, function(i,v){
                    if(v.unitType == 'ADS'){
                        adsSchedule.push(v);
                    }
                });
                
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
    $.each($.parseJSON(sessionStorage.getItem("shopping_cart_terms")), function(i,v){
        var code;
        var qty = 1;
        var amount = 1;
        var result = 1;
        $(".weui-panel .weui-check").each(function(){
            if($(this).prop("checked")) {
                code = $(this).attr('id').split('_')[1];
                if(code == v.remarkFirst){
                    qty = $(this).parents('.weui-panel__bd').find('.weui-count__number').val();
                    
                    var sDate = $('#dateStart_'+code).val();
                    var eDate =  $('#dateEnd_'+code).val();
                    var sArr = sDate.split("-");
                    var eArr = eDate.split("-");
                    var sRDate = new Date(sArr[0], sArr[1], sArr[2]);
                    var eRDate = new Date(eArr[0], eArr[1], eArr[2]);
                    result = (eRDate-sRDate)/(24*60*60*1000) || 1;
                    amount = v.rentAmount * qty * result;
                    subTotal = subTotal + amount;
                    subItems = parseInt(subItems) + parseInt(qty);
                }
            }
        })
    })
    
    $('#subTotal').text(numberWithCommas(subTotal.toFixed(2)));
    $('#subQTY').text(subItems);
}

function getOrderByTradeNO() {
    $.ajax({
        url: $.api.baseNew+"/comm-wechatol/api/order/findAllByMobileNoAndOutTradeNo?mobileNo="+$.cookie('uid')+"&outTradeNo="+getURLParameter('trade'),
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
                $.order.copy = JSON.stringify(response.data[0]);
                SaveOrder();
            } else {
                interpretBusinessCode(response.customerMessage);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}

function SaveOrder(){
    var order = $.parseJSON($.order.copy);
    order.mobileNo = $.cookie('uid');
    order.brandName = $.cookie('brand_1');
    order.remarkFirst = getURLParameter('id');
    order.amount = $('#subTotal').text().replace(/,/g,'');
    order.remarkThird = parseInt($('#subQTY').text());
    var advPos= "";
    
    $.each(order.contractInfos, function(i,v){
        v.remarkThird = $('#qty_'+v.unitCode).val();
        advPos = advPos + '【' + v.unitDesc + '】 ';
    });
    
    $.each(order.contractTermInfos, function(i,v){
        if(v.termTypeName == '固定租金' && v.code == 1){
            v.endDate = $('#dateEnd_'+v.remarkFirst).val();
            v.rentAmount = $('#taxAmount_'+v.remarkFirst).text().replace(/,/g,'');
            v.amount = ($('#taxAmount_'+v.remarkFirst).text().replace(/,/g,'')*1.06).toFixed(2),
            v.taxAmount = $('#taxAmount_'+v.remarkFirst).text().replace(/,/g,'');
            v.startDate = $('#dateStart_'+v.remarkFirst).val();
        }
    });
    
    order.orderStates = '合同已生成';
    
    /* 
     * @订单状态  
     *  待确认订单
     *  合同已生成
     *  合同用印中
     *  待付款订单
     *  已完成订单
     *  已关闭订单
     */

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
                
                saveMsgLog('订单合同已生成','您的订单【陆家嘴正大广场】广告位 '+advPos+'合同已生成，请前往我的订单管理页面查看。',getURLParameter('trade'), '我的消息',order.contractInfos[0].unitCode,'/v2/contract?type=advertising&trade='+getURLParameter('trade'));
            } else {
                interpretBusinessCode(response.customerMessage);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}