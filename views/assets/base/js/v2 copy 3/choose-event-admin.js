$.subTotal = 99999999;
$.round = 1;

$.order = {
    copy: ""
};

$(document).ready(function(){
    getEventScheduleInfo();

    $('#quotation').click(function(){
        if($('#user_offer').val() != '') {
            $('#user_offer_txt').css('color','rgba(0,0,0,.9)');
            
            if($.round == 1) {
                $.round = 2;
                if(Math.round($('#user_offer').val()) >= Math.round($.subTotal)) {
                    var passed = '<div class="js_dialog" id="passed" style="display: none;">\n\
            <div class="weui-mask">\n\
            </div><div class="weui-dialog">\n\
            <div class="weui-dialog__bd">恭喜您阁下！我们初步接受了您的报价方案，接下来请点击"知道了"继续吧。</div>\n\
            <div class="weui-dialog__ft">\n\
            <a href="javascript: getOrderByTradeNO();" class="weui-dialog__btn weui-dialog__btn_primary">知道了</a>\n\
            </div>\n\
            </div> \n\
            </div>';

                    if($('#passed').length > 0){
                        $('#passed').remove();
                    }
                    $('body').append(passed);
                    $('#passed').fadeIn(200);
                    
                } else if(Math.round($('#user_offer').val()) < Math.round($.subTotal) && Math.round($('#user_offer').val()) >= Math.round(($.subTotal  * 0.7))) {
                    var failed = '<div class="js_dialog" id="failed" style="display: none;">\n\
            <div class="weui-mask">\n\
            </div><div class="weui-dialog">\n\
            <div class="weui-dialog__bd">我们期待与您的合作，请重新出价</div>\n\
            <div class="weui-dialog__ft">\n\
            <a href="javascript: redirect(\'remove\');" class="weui-dialog__btn weui-dialog__btn_primary">知道了</a>\n\
            </div>\n\
            </div> \n\
            </div>';

                    if($('#failed').length > 0){
                        $('#failed').remove();
                    }
                    $('body').append(failed);
                    $('#failed').fadeIn(200);
                } else {
                    var failed = '<div class="js_dialog" id="failed" style="display: none;">\n\
            <div class="weui-mask">\n\
            </div><div class="weui-dialog">\n\
            <div class="weui-dialog__bd">尊敬的阁下，您的报价有点低哦，我们再谈一次吧？请您点击"知道了"重新出价吧。</div>\n\
            <div class="weui-dialog__ft">\n\
            <a href="javascript: redirect(\'remove\');" class="weui-dialog__btn weui-dialog__btn_primary">知道了</a>\n\
            </div>\n\
            </div> \n\
            </div>';

                    if($('#failed').length > 0){
                        $('#failed').remove();
                    }
                    $('body').append(failed);
                    $('#failed').fadeIn(200);
                }
            } else {
                if(Math.round($('#user_offer').val()) >= Math.round($.subTotal)) {
                    var passed = '<div class="js_dialog" id="passed" style="display: none;">\n\
            <div class="weui-mask">\n\
            </div><div class="weui-dialog">\n\
            <div class="weui-dialog__bd">恭喜您阁下！我们初步接受了您的报价方案，接下来请点击"知道了"继续吧。</div>\n\
            <div class="weui-dialog__ft">\n\
            <a href="javascript: getOrderByTradeNO();" class="weui-dialog__btn weui-dialog__btn_primary">知道了</a>\n\
            </div>\n\
            </div> \n\
            </div>';

                    if($('#passed').length > 0){
                        $('#passed').remove();
                    }
                    $('body').append(passed);
                    $('#passed').fadeIn(200);
                    
                } else {
                    var failed = '<div class="js_dialog" id="failed" style="display: none;">\n\
            <div class="weui-mask">\n\
            </div><div class="weui-dialog">\n\
            <div class="weui-dialog__bd">尊敬的阁下，很遗憾您的报价还是低于我们的预期，看来现阶段我们没有合适的机会跟您合作，不过没关系，稍后我们会有专人与您取得联系哦。</div>\n\
            <div class="weui-dialog__ft">\n\
            <a href="javascript: redirect(\'/v2/default\');" class="weui-dialog__btn weui-dialog__btn_primary">知道了</a>\n\
            </div>\n\
            </div> \n\
            </div>';

                    if($('#failed').length > 0){
                        $('#failed').remove();
                    }
                    $('body').append(failed);
                    $('#failed').fadeIn(200);
                }
            }
            
        } else {
            $('#user_offer_txt').css('color','#f00');
        }
    });
    
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
                $.each($.parseJSON(sessionStorage.getItem("events_schedule")), function(i,v){
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
                $.each($.parseJSON(sessionStorage.getItem("events_schedule")), function(i,v){
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
                $.each($.parseJSON(sessionStorage.getItem("events_schedule")), function(i,v){
                    if(id.split('_')[1] == v.shopNo){
                        vdate.push(v.date);
                    }
                })
   
                for(var x=0;x<vdate.length;x++){
                    if($.inArray(sEnd, vdate) == -1){
                        if($('.date-end').val() != '' && $('.date-end').val() > DecrDate(sEnd)){
                            $d('.date-end').val(DecrDate(sEnd));
                        } else if($('.date-end').val() == '') {
                            $('.date-end').val(DecrDate(sEnd));
                        }
                        getSubTotal(id);
                        return false;
                    } else {
                        sEnd = IncrDate(sEnd);
                    }
                    
                }
            } else if(type == 1){
                var sStart = DecrDate(result[0].label.replace("年","-") + month + ("-") + date);
                var vdate = [];
                $.each($.parseJSON(sessionStorage.getItem("events_schedule")), function(i,v){
                    if(id.split('_')[1] == v.shopNo){
                        vdate.push(v.date);
                    }
                })
                
                for(var x=0;x<vdate.length;x++){
                    if($.inArray(sStart, vdate) == -1){
                        if($('.date-start').val() != '' && $('.date-start').val() < IncrDate(sStart)){
                            $('.date-start').val(IncrDate(sStart));
                        } else if($('.date-start').val() == '') {
                            $('.date-start').val(IncrDate(sStart));
                        }
                        getSubTotal(id);
                        return false;
                    } else {
                        sStart = DecrDate(sStart);
                    }
                    
                }
            }
        }
    })
}

function getEventScheduleInfo() {
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
                var eventsSchedule = [];
                $.each(response.data, function(i,v){
                    if(v.unitType == 'EVENTS'){
                        eventsSchedule.push(v);
                    }
                });
                
                sessionStorage.setItem("events_schedule", JSON.stringify(eventsSchedule));
            } else {
                interpretBusinessCode(response.customerMessage);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}

function getSubTotal(id) {
    var code = id.split('_')[1];
    $.subTotal = 0;
    var sDate = $('#dateStart_'+code).val();
    var eDate =  $('#dateEnd_'+code).val();
    var sArr = sDate.split("-");
    var eArr = eDate.split("-");
    var sRDate = new Date(sArr[0], sArr[1], sArr[2]);
    var eRDate = new Date(eArr[0], eArr[1], eArr[2]);
    var result = (eRDate-sRDate)/(24*60*60*1000) || 1;
    
    var d = sDate;
    for(var i=0; i<result; i++){
        $.each($.parseJSON(sessionStorage.getItem("events_schedule")), function(i,v){
            var amount = (v.basePrice*1.05).toFixed(2);
            if(code == v.shopNo && d == v.date){
                if(result >= 1 && result < 3){
                    amount = v.aprice;
                } else if(result == 3){
                    amount = v.bprice;
                } else if(result >= 4 && result < 8){
                    amount = v.cprice;
                } else if(result >= 8){
                    amount = v.dprice;
                }
                
                $.subTotal = $.subTotal + parseFloat((amount*1.05).toFixed(2));
                return false;
            }
        })
        d = IncrDate(d);
    }
}

function redirect(url) {
    if(url == 'remove'){
        $('#failed').remove();
    } else {
        window.location.href = url;
    }
};

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
    order.amount = $('#user_offer').val();
    
    $.each(order.contractTermInfos, function(i,v){
        if(v.termTypeName == '固定租金' && v.code == 1){
            v.endDate = $('.date-end').val();
            v.amount = $('#user_offer').val(),
            v.taxAmount = ($('#user_offer').val() - $('#user_offer').val()*0.05).toFixed(2),
            v.startDate = $('.date-start').val();
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