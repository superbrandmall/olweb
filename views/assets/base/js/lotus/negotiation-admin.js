$.order = {
    id: ""
};

var d = new Date();
var month = d.getMonth()+1;
var day = d.getDate();
var time = d.getTime();
var date = d.getFullYear() + '-' +
    (month<10 ? '0' : '') + month + '-' +
    (day<10 ? '0' : '') + day;
    
$(document).ready(function(){
    $(".weui-check").each(function(){
        $(this).click(function(){
            var textarea_id = $(this).attr('id').split('_')[0];
            if($(this).prop("checked")) {
                $("#"+textarea_id+"_reason").parent().fadeIn();      
            } else {
                $("#"+textarea_id+"_reason").parent().fadeOut();
            }
        })
    })
    
    if(getURLParameter('outTradeNo') && getURLParameter('outTradeNo') != ''){
        getOrderByTradeNO();
    }
    
    $(".weui-textarea").each(function(){
        $(this).on("input propertychange",function(){
            textarea($(this));
        })
    })
    
    $("#negotiation form").validate({
        onkeyup: false,
        rules: {
            years_reason: {
                maxlength: 50
            },
            term_reason: {
                maxlength: 50
            },
            free_reason: {
                maxlength: 50
            },
            rent_reason: {
                maxlength: 50
            },
            deduct_reason: {
                maxlength: 50
            },
            reason: {
                maxlength: 200
            }
        },
        messages: {
            years_reason: {
                maxlength: "留言文字数不对"
            },
            term_reason: {
                maxlength: "留言文字数不对"
            },
            free_reason: {
                maxlength: "留言文字数不对"
            },
            rent_reason: {
                maxlength: "留言文字数不对"
            },
            deduct_reason: {
                maxlength: "留言文字数不对"
            },
            reason: {
                maxlength: "留言文字数不对"
            }
        },
        errorPlacement: function(error, element) {
            error.appendTo('#errorcontainer-' + element.attr('id'));
        },
        submitHandler: function() {
            inputCheck();
        }
    });
});

function inputCheck() {
    var flag = 1;
    
    if($('#years_reason').val() == '' && $('#term_reason').val() == '' && $('#free_reason').val() == '' && $('#rent_reason').val() == '' && $('#deduct_reason').val() == '' && $('#reason').val() == ''){
        flag = 0;
        $('#reason').css('border','solid 1px #f00');
    } else {
        $('#reason').css('border','0 none');
    }        
    
    if(flag == 1){
        if($.order.id != ''){
            deleteOrder();
        }
        saveUserRefusal();
    }
}

function saveUserRefusal() {
    $(".weui-check").each(function(){
        var hidden_id = $(this).attr('id').split('_')[0];
        if($(this).prop("checked")) {
            $("#"+hidden_id+"_result").val(1);
        } else {
            $("#"+hidden_id+"_result").val(0);
        }
    })
    
    var map = {
        "buildingCode": getURLParameter('building'),
        "code": getURLParameter('code'),
        "yearsFlag": parseInt($("#years_result").val()),
        "termFlag": parseInt($("#term_result").val()),
        "deductFlag": parseInt($("#deduct_result").val()),
        "deductReason": $("#deduct_reason").val(),
        "freeFlag": parseInt($("#free_result").val()),
        "freeReason": $("#free_reason").val(),
        "mobileNo": $.cookie('uid'),
        "name": getURLParameter('name'),
        "reason": $("#reason").val(),
        "rentFlag": parseInt($("#rent_result").val()),
        "rentReason": $("#rent_reason").val(),
        "storeCode": getURLParameter('mall'),
        "unitCode": getURLParameter('unit'),
        "outTradeNo": getURLParameter('trade') || 'NULL',
        "yearsReason": $("#years_reason").val(),
        "termReason": $("#term_reason").val()
    }
    
    $.ajax({
        url: $.api.baseNew+"/comm-wechatol/api/user/refusal/saveOrUpdate",
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
        complete: function(){
            hideLoading();
        },
        success: function (response, status, xhr) {
            if(response.code === 'C0') {
                if(xhr.getResponseHeader("Authorization") !== null) {
                    $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                }
                
                $.ajax({
                    url: "/controllers/api/2.0/ApiRefusal.php",
                    type: "POST",
                    data: {
                        "date": date,
                        "storeCode": getURLParameter('mall'),
                        "unitCode": getURLParameter('unit'),
                        "outTradeNo": getURLParameter('trade') || '',
                        "yearsFlag": parseInt($("#years_result").val()),
                        "deductFlag": parseInt($("#deduct_result").val()),
                        "deductReason": $("#deduct_reason").val(),
                        "freeFlag": parseInt($("#free_result").val()),
                        "freeReason": $("#free_reason").val(),
                        "mobileNo": $.cookie('uid'),
                        "reason": $("#reason").val(),
                        "rentFlag": parseInt($("#rent_result").val()),
                        "rentReason": $("#rent_reason").val(),
                        "yearsReason": $("#years_reason").val(),
                        "name": getURLParameter('name'),
                        "termFlag": parseInt($("#term_result").val()),
                        "termReason": $("#term_reason").val()
                    },
                    async: false,
                    beforeSend: function(request) {},
                    complete: function(){},
                    success: function (response, status, xhr) {
                        if(getURLParameter('name') == '2' && getURLParameter('trade')) {
                            updatePayStates();
                            saveMsgLog('退款申请发送成功','您好，我司已收到您的退款申请，接下去会尽快处理并通知您处理进度，请留意短信及邮箱。谢谢！',getURLParameter('trade'), '我的消息',getURLParameter('unit'),'');
                            
                            $(function(){
                                var $iosDialog2 = '<div class="js_dialog" id="iosDialog2" style="display: none;">\n\
                        <div class="weui-mask">\n\
                        </div><div class="weui-dialog">\n\
                        <div class="weui-dialog__bd">我司已收到您的退款申请，处理结果会以短信与邮件的方式即时反馈您！谢谢！</div>\n\
                        <div class="weui-dialog__ft">\n\
                        <a href="/v2/to-pay" class="weui-dialog__btn weui-dialog__btn_primary">知道了</a>\n\
                        </div>\n\
                        </div> \n\
                        </div>';

                                if($('#iosDialog2').length > 0){
                                    $('#iosDialog2').remove();
                                }
                                $('body').append($iosDialog2);
                                $('#iosDialog2').fadeIn(200);
                            });
                        } else {
                            $(function(){
                                var $toast = $('#js_toast');
                                $toast.fadeIn(100);
                                setTimeout(function () {
                                    $toast.fadeOut(100);
                                    window.history.back(-1);
                                }, 2000);
                            });
                        }
                    },
                    error: function(jqXHR, textStatus, errorThrown) {
                       console.log(textStatus, errorThrown);
                    }
                }); 
            } else {
                $('body').append('<div id="js_toast_error" style="display: none;"><div class="weui-mask_transparent"></div><div class="weui-toast"><i class="weui-icon-cancel weui-icon_toast" style="color: #FA5151;"></i><p class="weui-toast__content">不支持特殊字符</p></div></div>');
                var $toast = $('#js_toast_error');

                $('.page.cell').removeClass('slideIn');

                $toast.fadeIn(100);
                setTimeout(function () {
                    $toast.fadeOut(100);
                }, 2000);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    })
}

function getOrderByTradeNO() {
    $.ajax({
        url: $.api.baseNew+"/comm-wechatol/api/order/findAllByMobileNoAndOutTradeNo?mobileNo="+$.cookie('uid')+"&outTradeNo="+getURLParameter('outTradeNo'),
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
                $.order.id = response.data.id;
            } else {
                interpretBusinessCode(response.customerMessage);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}

function deleteOrder(){
    $.ajax({
        url: $.api.baseNew+"/comm-wechatol/api/order/updateOrderStates?id="+$.order.id+"&orderStates=已关闭订单",
        type: "POST",
        async: false,
        beforeSend: function(request) {
            request.setRequestHeader("Login", $.cookie('login'));
            request.setRequestHeader("Authorization", $.cookie('authorization'));
            request.setRequestHeader("Lang", $.cookie('lang'));
            request.setRequestHeader("Source", "onlineleasing");
        },
        complete: function(){},
        success: function (response, status, xhr) {
            if(response.code === 'C0') {
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


function updatePayStates(){
    showLoading();
    $.ajax({
        url: $.api.baseNew+"/comm-wechatol/api/order/updatePayStates?id="+getURLParameter('order')+"&payStates=退款中&payDate="+date+"&payNo="+getURLParameter('trade')+"&payAmount=0",
        type: "POST",
        async: false,
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
            } else {
                interpretBusinessCode(response.customerMessage);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}

function textarea(input) {
    var content = $(input);
      var max =  content.next().find('i') .text();
    var value = content.val();
    if (value.length >= 0) {

        value = value.replace(/\n|\r/gi,"");
        var len = value.length;
        content.next().find('span').text(len) ;
         if(len>max){
             content.next().addClass('f-red');
         }else{
             content.next().removeClass('f-red');
         }
    }
}