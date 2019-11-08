$(document).ready(function(){
    if(getURLParameter('s')) {
        switch (getURLParameter('s')) {
            case "succeed":
                $('.callout-info').show().delay(2000).hide(0);
                $('html, body').animate({
                    scrollTop: $('#webui').offset().top
                }, 0);
                break;
            case "fail":
                $('.callout-danger').show().delay(2000).hide(0);
                $('html, body').animate({
                    scrollTop: $('#webui').offset().top
                }, 0);
                break;
            default:
                break;
        }
        setTimeout(function () {
            window.history.pushState("object or string", "Title", "/brands-admin/"+refineCreateUrl() );
        },1000);
    }
       
    $('#brand_logo').on("change", function () {
        var formData = new FormData();
        formData.append('vo.userCode',  $.cookie('login'));
        formData.append('vo.containerName', 'brandlogo');
        formData.append('vo.prefix', $.cookie('login')+'/photo/brandlogo');
        formData.append('files', $('#brand_logo')[0].files[0]);
        $.ajax({
            type: "POST",
            url: $.api.baseNew+"/zuul/onlineleasing-file/api/upload/multi",
            data: formData,
            async: false,
            cache: false,
            processData: false,
            contentType: false,
            beforeSend: function(request) {
                $('#loader').show();
                request.setRequestHeader("Login", $.cookie('login'));
                request.setRequestHeader("Authorization", $.cookie('authorization'));
                request.setRequestHeader("Lang", $.cookie('lang'));
                request.setRequestHeader("Source", "onlineleasing");
            },
            complete: function(){},
            success: function(response, status, xhr) {
                $('#loader').hide();
                if(response.code === 'C0') {
                    $('#hidden_brand_logo').val(response.data[0].uri);
                    $('#imagePreview').attr('src',response.data[0].uri);
                    
                    $.ajax({
                        type: 'POST',
                        url: '/controllers/api/1.0/ApiAiTest.php',
                        data: {
                            brandlogo: response.data[0].uri
                        },
                        dataType: "json",
                        success: function(response, status, xhr) {
                            if(response.result.length > 0) {
                                $('#brand_name').val(response.result[0].name);
                            }
                        },
                        error : function(){ }
                    });
                } else {
                    console.log(response.customerMessage);
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
               console.log(textStatus, errorThrown);
            }
        });
    });            
})

function refineCreateUrl() {
    var url = window.location.href;
    var value = url.substring(url.lastIndexOf('/') + 1);
    value  = value.split("&s")[0];   
    return value;     
}