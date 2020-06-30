$(document).ready(function(){
    $('#submit_negotiation').on('click', function(){
        saveUserRefusal();
    });
    
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
});

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
        "deductFlag": parseInt($("#deduct_result").val()),
        "deductReason": $("#deduct_reason").val(),
        "freeFlag": parseInt($("#free_result").val()),
        "freeReason": $("#free_reason").val(),
        "mobileNo": $.cookie('uid'),
        "name": "",
        "reason": $("#reason").val(),
        "rentFlag": parseInt($("#rent_result").val()),
        "rentReason": $("#rent_reason").val(),
        "storeCode": getURLParameter('mall'),
        "unitCode": getURLParameter('unit'),
        "yearsReason": $("#years_reason").val()
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
        complete: function(){},
        success: function (response, status, xhr) {
            if(response.code === 'C0') {
                if(xhr.getResponseHeader("Authorization") !== null) {
                    $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                }
                
                deleteOrder(getURLParameter('id'));
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    })
}

function deleteOrder(id){
    $.ajax({
        url: $.api.baseNew+"/comm-wechatol/api/order/updateOrderStates?id="+id+"&orderStates=已关闭订单",
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
                
                $(function(){
                    var $toast = $('#js_toast');
                    $toast.fadeIn(100);
                    setTimeout(function () {
                        $toast.fadeOut(100);
                        window.location.href = '/v2/default';
                    }, 2000);
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