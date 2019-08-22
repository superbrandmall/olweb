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
    
    $("#create-form").validate({
        rules: {
            contact_name_1: {
                required: true
            },
            contact_phone_1: {
                required: true
            },
            company_name: {
                required: true
            },
            title: {
                required: true
            }
        },
        messages: {
            contact_name_1: {
                required: "请输入联系人姓名"
            },
            contact_phone_1: {
                required: "请输入联系人电话"
            },
            company_name: {
                required: "请输入联系人公司"
            },
            title: {
                required: "请输入联系人职位"
            }
        },
        errorPlacement: function(error, element) {
            error.appendTo('#errorcontainer-' + element.attr('id'));
        },
        submitHandler: function() {
            checkBrand();
        }
    });
})

function checkBrand() {
    var url;
    if($.parseJSON(sessionStorage.getItem("userModalities"))[0].isComplete == 2){
        url = 'findAllByUserCode2/'+$.cookie('uid'); // Category head 可以查看自己管理的业态，其中马云飞和宋总可以查看所有业态
    } else {
        url = 'findAllByUserCode/'+$.cookie('uid'); // 其他人只能查看自己建立的联系人
    }
                
    $.ajax({
        url: $.api.baseNew+"/onlineleasing-customer/api/brand/checkBrandName/?name="+$('#brand_name').val(),
        type: "GET",
        async: false,
        beforeSend: function(request) {
            $('#loader').show();
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
                $('#loader').hide();
                
                var brands = response.data;
                var ab = true;
                if(brands.length > 0) {
                    $.each(brands, function(i,v) {
                        if(v.contactName == $('#contact_name_1').val()){
                            ab = false;
                        }
                    })
                }
                
                if(ab == true) {
                    addContact();
                } else {
                    $('.callout-warning').show().delay(2000).hide(0);
                    $('html, body').animate({
                        scrollTop: $('#webui').offset().top
                    }, 0);
                }
            }
        }
    })
}

function addContact() {
    var brand_code = getURLParameter('id') || '';
    var new_category_code = getURLParameter('category') || '';
    var contact_name_1 = $('#contact_name_1').val();
    var contact_phone_1 = $('#contact_phone_1').val();
    var company_name = $('#company_name').val();
    var title = $('#title').val();

    if(brand_code != '' && contact_name_1 != '' && contact_phone_1 != '' && company_name != '' && title != '' && new_category_code != ''){
        var map = {
            "companyName": company_name,
            "contactName": contact_name_1,
            "contactPhone": contact_phone_1,
            "code": brand_code,
            "title": title,
            "userCode": $.cookie('login'),
            "status": 1,
            "newCategoryCode": new_category_code
        };

        $.ajax({
            url: $.api.baseNew+"/onlineleasing-customer/api/brandContact/save",
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
                    if(xhr.getResponseHeader("Authorization") !== null){
                        $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                    }

                    window.location.href = 'create-brand?s=succeed';
                } else {
                    console.log(response.customerMessage);
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

function refineCreateUrl() {
    var url = window.location.href;
    var value = url.substring(url.lastIndexOf('/') + 1);
    value  = value.split("&s")[0];   
    return value;     
}