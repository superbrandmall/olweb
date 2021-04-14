$(document).ready(function(){
    if(getURLParameter('type') && getURLParameter('type') == 'events'){
        $('#bu').val('events');
    } else if(getURLParameter('type') && getURLParameter('type') == 'ad'){
        $('#bu').val('advertising');
    }
    
    $("#contact form").validate({
        onkeyup: false,
        rules: {
            target_mall: {
                required: true
            },
            bu: {
                required: true
            },
            contact_msg: {
                required: true,
                maxlength: 200
            }
        },
        messages: {
            target_mall: {
                required: "请选择商业项目"
            },
            bu: {
                required: "请选择业务"
            },
            contact_msg: {
                required: "留言为必填项",
                maxlength: "留言文字数不对"
            }
        },
        errorPlacement: function(error, element) {
            error.appendTo('#errorcontainer-' + element.attr('id'));
        },
        submitHandler: function() {
            showLoading();
            var target_mall = $('#target_mall').val();
            var phone = $.cookie('uid');
            var bu = $('#bu').val();
            var contact_msg = $('#contact_msg').val();

            $.ajax({
                url: "/controllers/api/2.0/ApiMail.php",
                type: "POST",
                data: {
                    target_mall: target_mall,
                    phone: phone,
                    bu: bu,
                    contact_msg: contact_msg
                },
                async: false,
                beforeSend: function(request) {},
                complete: function(){},
                success: function (response, status, xhr) {
                    $(function(){
                        var $toast = $('#js_toast');
                        $toast.fadeIn(100);
                        setTimeout(function () {
                            $toast.fadeOut(100);
                            window.location.href = '/v2/default';
                        }, 2000);
                    });
                },
                error: function(jqXHR, textStatus, errorThrown) {
                   console.log(textStatus, errorThrown);
                }
            });
        }
    });
})

function textarea(input) {
    var content = $(input);
      var max =  content.next().find('i') .text();
    var value = content.val();
    if (value.length>0) {

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