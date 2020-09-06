$(document).ready(function(){
    $(function(){
        var tmpl = '<li class="weui-uploader__file" style="background-image:url(#url#)"></li>',
            $uploaderInput = $(".weui-uploader__input"),
            $uploaderFiles = ".weui-uploader__files"
            ;

        $uploaderInput.on("change", function(e){
            var src, url = window.URL || window.webkitURL || window.mozURL, files = e.target.files;
            for (var i = 0, len = files.length; i < len; ++i) {
                var file = files[i];

                if (url) {
                    src = url.createObjectURL(file);
                } else {
                    src = e.target.result;
                }
                
                $(this).parent().parent().find($uploaderFiles).html($(tmpl.replace('#url#', src)));
            }
        });
    });
    
    $('.weui-uploader__input').on("change", function () { // max 1 mb
        fileUpload($(this).attr('id'));
    })
});

function fileUpload(id) {
    var formData = new FormData();
    formData.append('file', $('#'+id)[0].files[0]);
    $.ajax({
        type: "POST",
        url: $.api.baseNew+"/comm-wechatol/api/upload/upload?mobileNo="+$.cookie('uid')+"&fileType="+id.charAt(id.length - 1),
        data: formData,
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
            if(response.code === 'C0') {
                $(function(){
                    var $toast = $('#js_toast');
                    $toast.fadeIn(100);
                    setTimeout(function () {
                        $toast.fadeOut(100);
                    }, 2000);
                });
            } else {
                console.log(response.customerMessage);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}