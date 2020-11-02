$(document).ready(function(){
    /*$(function(){
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
                
                var point = src.lastIndexOf(".");  
                var type = src.substr(point);  
                
                if(type == ".pdf"){  
                    src = '/views/assets/base/img/content/backgrounds/pdf-bg.png';
                }
                
                $(this).parent().parent().find($uploaderFiles).append($(tmpl.replace('#url#', src)));
            }
        });
    });*/
    
    getUserFiles();
    showUserfiles();
    
    $('.weui-uploader__input').on("change", function () { // max 1 mb
        fileUpload($(this).attr('id'));
    })
});

function getUserFiles() {
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
                    sessionStorage.setItem("userfiles", JSON.stringify(response.data)); 
                } else {
                    sessionStorage.setItem("userfiles", "");
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

function showUserfiles() {
    if(sessionStorage.getItem("userfiles") && sessionStorage.getItem("userfiles") != ''){
        var file;
        $.each($.parseJSON(sessionStorage.getItem("userfiles")), function(i,v){
            if(v.fileExt != 'pdf'){
                file = $.api.baseNew+"/comm-wechatol/api/download/showFile?fileName="+v.fileName;                      
            } else {
                file = '/views/assets/base/img/content/backgrounds/pdf-bg.png';
            }
            
            $('#uploaderFiles__'+v.fileType).append('<li id="file_'+v.id+'" class="weui-uploader__file" style="background-image:url('+file+'); position: relative;">\n\
<span onclick=\'javascript: fileDelete("'+v.id+'");\' class="weui-icon-clear weui-icon-warn" style="position: absolute; top: -5px; right: -5px; display: block;"></span></li>');
        })
    }
}

function fileDelete(id) {
    showLoading();
    $.ajax({
        type: "DELETE",
        url: $.api.baseNew+"/comm-wechatol/api/user/file/delete/"+id,
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
            $('#file_'+id).remove();
            $(function(){
                var $toast = $('#js_toast_2');
                $toast.fadeIn(100);
                setTimeout(function () {
                    $toast.fadeOut(100);
                }, 2000);
            });
        }
    })
}

function fileUpload(id) {
    var formData = new FormData();
    formData.append('file', $('#'+id)[0].files[0]);
    $.ajax({
        type: "POST",
        url: $.api.baseNew+"/comm-wechatol/api/upload/upload?mobileNo="+$.cookie('uid')+"&fileType="+id+"&orderId="+$.order.id,
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
                getUserFile(id);
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

function getUserFile(id) {
    $.ajax({
        url: $.api.baseNew+"/comm-wechatol/api/user/file/findAllByMobileNoAndFileType?mobileNo="+$.cookie('uid')+"&fileType="+id,
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
                    var file;
                    $.each(response.data, function(i,v){
                        if(v.fileExt != 'pdf'){
                            file = $.api.baseNew+"/comm-wechatol/api/download/showFile?fileName="+v.fileName;                      
                        } else {
                            file = '/views/assets/base/img/content/backgrounds/pdf-bg.png';
                        }
                        
                        if($('#file_'+v.id).length <= 0){
                        $('#uploaderFiles__'+v.fileType).append('<li id="file_'+v.id+'" class="weui-uploader__file" style="background-image:url('+file+'); position: relative;">\n\
            <span onclick=\'javascript: fileDelete("'+v.id+'");\' class="weui-icon-clear weui-icon-warn" style="position: absolute; top: -5px; right: -5px; display: block;"></span></li>');
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