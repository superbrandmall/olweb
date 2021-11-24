$(document).ready(function(){ 
    var uid = $.cookie('uid');
    $('#uid').text(uid.substr(0,3)+'****'+uid.substr(7,uid.length));

    if(sessionStorage.getItem('wechat_user_info') != undefined && sessionStorage.getItem('wechat_user_info') != null && sessionStorage.getItem('wechat_user_info') != '') {
        var headimgurl = $.parseJSON(sessionStorage.getItem("wechat_user_info")).headimgurl;
        var nickname = $.parseJSON(sessionStorage.getItem("wechat_user_info")).nickname;
        $('#avatar').css('backgroundImage','url('+headimgurl+')');
        $('#nickname').text(nickname);
    }
});

/*function getUserFiles() {
    $.ajax({
        url: $.api.baseNew+"/comm-wechatol/api/user/file/findAllByMobileNo?mobileNo="+$.cookie('uid'),
        type: "GET",
        async: false,
        dataType: "json",
        contentType: "application/json",
        beforeSend: function(request) {
            request.setRequestHeader("Lang", $.cookie('lang'));
            request.setRequestHeader("Source", "onlineleasing");
        },
        complete: function(){},
        success: function (response, status, xhr) {
            if(response.code === 'C0') {
                if(response.data.length > 0){
                    $.each(response.data, function(i,v){
                        if(v.fileType == 'avatar'){
                            var url = $.api.baseNew+"/comm-wechatol/api/download/showFile?fileName="+v.fileName;
                            $('#avatar').css('backgroundImage','url('+url+')');
                        }
                    })
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

function fileUpload() {
    var formData = new FormData();
    formData.append('file', $('#avatar_selector input')[0].files[0]);
    $.ajax({
        type: "POST",
        url: $.api.baseNew+"/zuul/comm-wechatol/api/upload/upload?mobileNo="+$.cookie('uid')+"&fileType=avatar",
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
                if(response.data.length > 0){
                    $.each(response.data, function(i,v){
                        if(v.fileType == 'avatar'){
                            var url = $.api.baseNew+"/comm-wechatol/api/download/showFile?fileName="+v.fileName;
                            $('#avatar').css('backgroundImage','url('+url+')');
                        }
                    })
                }
                
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
}*/