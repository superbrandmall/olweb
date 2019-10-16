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
            },
            email: {
                email: true
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
            },
            email: {
                email: "请输入有效邮箱地址"
            }
        },
        errorPlacement: function(error, element) {
            error.appendTo('#errorcontainer-' + element.attr('id'));
        },
        submitHandler: function() {
            checkBrand();
        }
    });
                
    $('#namecard').on("change", function () {
        var formData = new FormData();
        formData.append('vo.userCode',  $.cookie('login'));
        formData.append('vo.containerName', 'namecard');
        formData.append('vo.prefix', $.cookie('login')+'/photo/namecard');
        formData.append('files', $('#namecard')[0].files[0]);
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
                    $('#hidden_namecard').val(response.data[0].uri);
                    $('#imagePreview').attr('src',response.data[0].uri);
                    
                    $.ajax({
                        type: 'POST',
                        url: '/controllers/api/1.0/ApiNameCard.php',
                        data: {
                            namecard: response.data[0].uri
                        },
                        dataType: "json",
                        success: function(response, status, xhr) {
                            var rs = response.words_result;
                            if($('#contact_name_1').val() == '' && rs.NAME.length > 0){
                                $('#contact_name_1').val(rs.NAME[rs.NAME.length - 1]);
                            }
                            if($('#contact_phone_1').val() == '' && rs.MOBILE.length > 0){
                                $('#contact_phone_1').val(rs.MOBILE[rs.MOBILE.length - 1]);
                            }
                            if($('#company_name').val() == '' && rs.COMPANY.length > 0){
                                $('#company_name').val(rs.COMPANY[rs.COMPANY.length - 1]);
                            }
                            if($('#title').val() == '' && rs.TITLE.length > 0){
                                $('#title').val(rs.TITLE[rs.TITLE.length - 1]);
                            }
                            if($('#email').val() == '' && rs.EMAIL.length > 0){
                                $('#email').val(rs.EMAIL[rs.EMAIL.length - 1]);
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

function checkBrand() {
    var url;
    if($.parseJSON(sessionStorage.getItem("userModalities"))[0].isComplete == 2){
        url = 'findAllByUserCode2/'+$.cookie('uid'); // Category head 可以查看自己管理的业态，其中马云飞和宋总可以查看所有业态
    } else {
        url = 'findAllByUserCode/'+$.cookie('uid'); // 其他人只能查看自己建立的联系人
    }
    
    var map = {};
                
    $.ajax({
        url: $.api.baseNew+"/onlineleasing-customer/api/brandContact/"+url+"?page=0&size=100&sort=id,desc",
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
            if(response.code === 'C0') {
                if(xhr.getResponseHeader("Login") !== null){
                    $.cookie('login', xhr.getResponseHeader("Login"));
                }
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                }
                $('#loader').hide();
                
                var brands = response.data.content;
                var ab = true;
                if(brands.length > 0) {
                    $.each(brands, function(i,v) {
                        if(v.brandCode == getURLParameter('id') && v.contactName == $('#contact_name_1').val() && v.userCode == $.cookie('login')){
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
    var namecard = $('#hidden_namecard').val();
    var contact_name_1 = $('#contact_name_1').val();
    var contact_phone_1 = $('#contact_phone_1').val();
    var company_name = $('#company_name').val();
    var title = $('#title').val();
    var wechat = $('#wechat').val();
    var email = $('#email').val();

    if(brand_code != '' && contact_name_1 != '' && contact_phone_1 != '' && company_name != '' && title != '' && new_category_code != ''){
        var map = {
            "companyName": company_name,
            "contactName": contact_name_1,
            "contactPhone": contact_phone_1,
            "brandCode": brand_code,
            "title": title,
            "userCode": $.cookie('login'),
            "status": 0, //默认锁定
            "state": 1,
            "newCategoryCode": new_category_code,
            "remarkFirst": wechat,
            "remarkSecond": email,
            "remarkThird": namecard,
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

                    window.location.href = 'brand?id='+brand_code+'#contacts_tab';
                } else {
                    console.log(response.customerMessage);
                    window.location.href = 'create-brand-contact?id='+brand_code+'&category='+new_category_code+'&s=fail';
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(textStatus, errorThrown);
                window.location.href = 'create-brand-contact?id='+brand_code+'&category='+new_category_code+'&s=fail';
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