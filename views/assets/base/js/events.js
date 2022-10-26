$(document).ready(function(){
    var eventForm = $('#events_form');
    var scrollFunc = function (e) {  
        e = e || window.event;  
        if (e.wheelDelta) {               
            if (e.wheelDelta > 0) {  
                eventForm.css({
                    'height':0,
                    'padding': 0 
                });  
            }  
            if (e.wheelDelta < 0) {  
                eventForm.css({
                    'height':'auto',
                    'padding': '30px 0 18px'
                });
            }  
        } else if (e.detail) {  
            if (e.detail> 0) {  
                eventForm.css({
                    'height':0,
                    'padding': 0 
                });
            }  
            if (e.detail< 0) {
                eventForm.css({
                    'height':'auto',
                    'padding': '30px 0 18px'
                });
            }  
        }  
    };
    
    if (document.addEventListener) {//firefox  
        document.addEventListener('DOMMouseScroll', scrollFunc, false);  
    }  
    window.onmousewheel = document.onmousewheel = scrollFunc;
    
    ///////////////////// Validate event form /////////////////////////
    if($.cookie('lang') === 'en-us'){
        var event_contact_name_2_required = "First and last name can't be empty";
        var event_phone_required = "Phone can't be empty";
        var event_phone_digits = "Please give a correct phone number";
        var event_event_time_required = "Event time can't be empty";
        var event_event_theme_required = "Event theme can't be empty";
        var event_target_required = "Target can't be empty";
        var event_msg_sent = "Message sent successfully";
    } else {
        var event_contact_name_2_required = "姓名为必填项";
        var event_phone_required = "电话为必填项";
        var event_phone_digits = "请输入正确电话号码";
        var event_event_time_required = "计划活动时间为必填项";
        var event_event_theme_required = "活动主题为必填项";
        var event_target_required = "意向场地为必填项";
        var event_msg_sent = "讯息发送成功";
    }
});