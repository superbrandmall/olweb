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
            window.history.pushState("object or string", "Title", "/lotus-admin/"+refineCreateUrl() );
        },1000);
    }

    $("#create-form").validate({
        rules: {
            brand_name: {
                required: true,
                minlength: 2
            },
            modality_1: {
                required: true
            },
            modality_2: {
                required: true
            },
            modality_3: {
                required: true,
                minlength: 4
            },
            contact_name_1: {
                required: true,
                minlength: 2
            },
            contact_phone_1: {
                required: true,
                minlength: 6
            }
        },
        messages: {
            brand_name: {
                required: "请输入品牌名称",
                minlength: "请输入完整品牌名称"
            },
            modality_1: {
                required: "请选择一级业态"
            },
            modality_2: {
                required: "请选择二级业态"
            },
            modality_3: {
                required: "请输入三级业态",
                minlength: "请输入完整三级业态"
            },
            contact_name_1: {
                required: "请输入联系人",
                minlength: "请输入完整联系人"
            },
            contact_phone_1: {
                required: "请输入联系电话",
                minlength: "请输入完整联系电话"
            }
        },
        errorPlacement: function(error, element) {
            error.appendTo('#errorcontainer-' + element.attr('id'));
        },
        submitHandler: function() {
            checkBrandName($('#brand_name').val());
        }
    });
})

function checkBrandName(name) {
    $.ajax({
        url: $.api.baseLotus+"/api/brand/lotus/findAllByName?name="+name,
        type: "GET",
        async: false,
        beforeSend: function(request) {
            request.setRequestHeader("Login", $.cookie('login'));
            request.setRequestHeader("Authorization", $.cookie('authorization'));
            request.setRequestHeader("Lang", $.cookie('lang'));
            request.setRequestHeader("Source", "onlineleasing");
        },
        success: function (response, status, xhr) {
            if(response.code === 'C0') {
                if(xhr.getResponseHeader("Login") !== null){
                    $.cookie('login', xhr.getResponseHeader("Login"));
                }
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                }
                
                if(response.data.length > 0){
                    var duplicate = false;
                    $.each(response.data, function(i,x) {
                        if(x.name == name){
                            duplicate = true;
                        }
                    })
                    
                    if(duplicate == true) {
                        $('.callout-warning').show().delay(2000).hide(0);
                        $('html, body').animate({
                            scrollTop: $('#webui').offset().top
                        }, 0);
                    } else {
                        addBrand();
                    }
                } else {
                    addBrand();
                }
            } else {
                $('.callout-warning').show().delay(2000).hide(0);
                $('html, body').animate({
                    scrollTop: $('#webui').offset().top
                }, 0);
            }                               
        }
    }); 
}

function addBrand() {
    var brand_name = $('#brand_name').val();
    var modality_1 = $('#modality_3').val().substr(0,4);
    var modality_2 = $('#modality_3').val().substr(0,6);
    var modality_3 = $('#modality_3').val();
    var contact_name_1 = $('#contact_name_1').val();
    var contact_phone_1 = $('#contact_phone_1').val();

    if(brand_name != '' && modality_1!= '' && modality_2 != '' && modality_3 != '' && contact_name_1 != '' && contact_phone_1 != ''){
        var map = {
            "contactName": contact_name_1,
            "contactPhone": contact_phone_1,
            "modality1": modality_1,
            "modality2": modality_2,
            "modality3": modality_3,
            "name": brand_name,
            "logo": "",
            "status": 1,
            "title": ""
        };

        $.ajax({
            url: $.api.baseLotus+"/api/brand/lotus/saveOrUpdate",
            type: "POST",
            data: JSON.stringify(map),
            async: false,
            dataType: "json",
            contentType: "application/json",
            beforeSend: function(request) {
                $('#loader').show();
                request.setRequestHeader("Login", $.cookie('login'));
                request.setRequestHeader("Authorization", $.cookie('authorization'));
                request.setRequestHeader("Lang", $.cookie('lang'));
                request.setRequestHeader("Source", "onlineleasing");
            },
            complete: function(){},
            success: function (response, status, xhr) {
                $('#loader').hide();
                if(response.code === 'C0') {
                    if(xhr.getResponseHeader("Login") !== null){
                        $.cookie('login', xhr.getResponseHeader("Login"));
                    }
                    if(xhr.getResponseHeader("Authorization") !== null){
                        $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                    }

                    window.location.href = 'home?s=succeed';
                } else {
                    alertMsg(response.code,response.customerMessage);
                    window.location.href = 'create-brand?s=fail';
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(textStatus, errorThrown);
                window.location.href = 'create-brand?s=fail';
            }
        });
    }
}