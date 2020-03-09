$(document).ready(function(){
    var eventForm = $('#events_form');
    var scrollFunc = function (e) {  
        e = e || window.event;  
        if (e.wheelDelta) {               
            if (e.wheelDelta > 0) {  
                eventForm.css('opacity',0);  
            }  
            if (e.wheelDelta < 0) {  
                eventForm.css('opacity',1);
            }  
        } else if (e.detail) {  
            if (e.detail> 0) {  
                eventForm.css('opacity',0);
            }  
            if (e.detail< 0) {
                eventForm.css('opacity',1); 
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
    
    $("#events_form form").validate({
        onkeyup: false,
        rules: {
            contact_name_2: {
                required: true
            },
            phone2: {
                required: true,
                digits: true
            },
            event_time: {
                required: true
            },
            event_theme: {
                required: true
            },
            target: {
                required: true
            }
        },
        messages: {
            contact_name_2: {
                required: event_contact_name_2_required,
            },
            phone2: {
                required: event_phone_required,
                digits: event_phone_digits
            },
            event_time: {
                required: event_event_time_required
            },
            event_theme: {
                required: event_event_theme_required
            },
            target: {
                required: event_target_required
            }
        },
        errorPlacement: function(error, element) {
            error.appendTo('#errorcontainer-' + element.attr('id'));
            $('#errorcontainer-' + element.attr('id')).find('label').css('font-size','12px');
        },
        submitHandler: function() {
            $('#loader').show();
            var user_name = $('#contact_name_2').val();
            var phone = $('#phone2').val();
            var event_time = $('#event_time').val();
            var event_theme = $('#event_theme').val();
            var target = $('#target').val();
            var other_requirements = $('#other_requirements').val();
            
            $.ajax({
                url: "controllers/api/1.0/ApiMailEvent.php",
                type: "POST",
                data: {
                    user_name: user_name,
                    phone: phone,
                    event_time: event_time,
                    event_theme: event_theme,
                    target: target,
                    other_requirements: other_requirements
                },
                async: false,
                beforeSend: function(request) {},
                complete: function(){},
                success: function (response, status, xhr) {
                    $('#events_form form').append('<div class="alert alert-success" role="alert" style="display: block;margin: 10px; padding: 10px;">'+event_msg_sent+'</div>');
                    setTimeout(function () {
                        $('#events_form form')[0].reset();
                        window.location.reload(false);
                    },3000);
                },
                error: function(jqXHR, textStatus, errorThrown) {
                   console.log(textStatus, errorThrown);
                }
            });
        }
    });
});