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
    
    if ($.cookie('uid') != '' && $.cookie('uid') != 'CUSER180912000001') {
        if($.parseJSON(sessionStorage.getItem("userModalities"))[0].isComplete == 2) {
            getALLNewCategory();
        } else {
            getNewCategory();
        }
    
        getBrandModality1();
    }
    
    /*$('#brand_name').blur(function(){
        if($('#brand_name').val() != ''){
            findBrandDashboard($('#brand_name').val());
        }
    });*/
    
    $('#modality_1').change(function(){
        getBrandModality2($(this).val());
    })
    
    $('#modality_2').change(function(){
        getBrandModality3($(this).val());
    })
    
    if ($.cookie('uid') != '' && $.cookie('uid') == 'CUSER180912000001') {
        $("#create-form").validate({
            rules: {
                brand_name: {
                    required: true,
                    minlength: 2
                }
            },
            messages: {
                brand_name: {
                    required: "请输入品牌名称",
                    minlength: "请输入完整品牌名称"
                }
            },
            errorPlacement: function(error, element) {
                error.appendTo('#errorcontainer-' + element.attr('id'));
            },
            submitHandler: function() {
                addBrandAdmin();
            }
        });
    } else {
        $("#create-form").validate({
            rules: {
                brand_name: {
                    required: true,
                    minlength: 2
                },
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
                new_category: {
                    required: true
                },
                modality_1: {
                    required: true
                },
                modality_2: {
                    required: true
                },
                modality_3: {
                    required: true
                },
                name_eng: {
                    minlength: 2
                },
                city: {
                    minlength: 2
                },
                average_unit_price: {
                    number: true
                }
            },
            messages: {
                brand_name: {
                    required: "请输入品牌名称",
                    minlength: "请输入完整品牌名称"
                },
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
                new_category: {
                    required: "请选择新业态"
                },
                modality_1: {
                    required: "请选择一级业态"
                },
                modality_2: {
                    required: "请选择二级业态"
                },
                modality_3: {
                    required: "请选择三级业态"
                },
                name_eng: {
                    minlength: "请输入完整品牌英文名称"
                },
                city: {
                    minlength: "请输入完整城市名称"
                },
                average_unit_price: {
                    number: "请正确输入客单价"
                }
            },
            errorPlacement: function(error, element) {
                error.appendTo('#errorcontainer-' + element.attr('id'));
            },
            submitHandler: function() {
                //findBrandDashboard($('#brand_name').val());
                checkBrand();
            }
        });
    }
    
    $('#logo').on("change", function () {
        var formData = new FormData();
        formData.append('vo.userCode',  $.cookie('login'));
        formData.append('vo.containerName', 'brands');
        formData.append('vo.prefix', $.cookie('login')+'/photo/logo');
        formData.append('files', $('#logo')[0].files[0]);
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
                    $('#hidden_logo').val(response.data[0].uri);
                    $('#imagePreview').attr('src',response.data[0].uri);
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

function getALLNewCategory() {
    $.each($.parseJSON(sessionStorage.getItem("category")), function(i,v) {
        $('#new_category').append('<option value="'+v.code+'">'+v.name+'</option>');
    });
}

function getNewCategory() {
    $.each($.parseJSON(sessionStorage.getItem("userModalities")), function(a,b) {
        $.each($.parseJSON(sessionStorage.getItem("category")), function(i,v) {
            if(v.code == b.newCategoryCode) {
                $('#new_category').append('<option value="'+v.code+'">'+v.name+'</option>');
            };
        });
    })
}

function getBrandModality1() {
    $.each($.parseJSON(sessionStorage.getItem("modalities")), function(i,v) {
        if(v.code == '00' || v.code == '01' || v.code == '02') {
            $.each(v.children, function(j,w) {
                $('#modality_1').append('<option value="'+w.code+'">'+w.name+'</option>');
            });
        };
    });
}

function getBrandModality2(mod) {
    var m = mod;
    $('#modality_2').children().not(':first').remove();
    $('#modality_3').children().not(':first').remove();
  
    $.each($.parseJSON(sessionStorage.getItem("modalities")), function(i,v) {
        $.each(v.children, function(j,w) {
            if(w.code == m) {
                $.each(w.children, function(k,x) {
                    $('#modality_2').append('<option value="'+x.code+'">'+x.name+'</option>');
                });
            };
        });
    });
}

function getBrandModality3(mod) {
    var m = mod;
    $('#modality_3').children().not(':first').remove();
  
    $.each($.parseJSON(sessionStorage.getItem("modalities")), function(i,v) {
        $.each(v.children, function(j,w) {
            $.each(w.children, function(k,x) {
                if(x.code == m) {
                    $.each(x.children, function(l,y) {
                        $('#modality_3').append('<option value="'+y.code+'">'+y.name+'</option>');
                    });
                };
            });
        });
    });
}

function getUserBrandModality3() {
    $.each($.parseJSON(sessionStorage.getItem("userModalities")), function(a,b) {
        $.each($.parseJSON(sessionStorage.getItem("modalities")), function(i,v) {
            $.each(v.children, function(j,w) {
                $.each(w.children, function(k,x) {
                    $.each(x.children, function(l,y) {
                        if(y.code == b.modalityCode) {
                            $('#modality_3').append('<option value="'+y.code+'">'+y.name+'</option>');
                        };
                    });
                });
            });
        });
    })
}

/*function findBrandDashboard(name) {
    $.ajax({
        url: $.api.baseNew+"/onlineleasing-customer/api/brand/findAllByNameContaining?name="+name,
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
                
                if(response.data.length > 0){
                    $('.callout-warning').show().delay(2000).hide(0);
                    $('html, body').animate({
                        scrollTop: $('#webui').offset().top
                    }, 0);
                } else {
                    addBrand();
                }
            } else {
                $('#loader').hide();
                $('.callout-warning').show().delay(2000).hide(0);
                $('html, body').animate({
                    scrollTop: $('#webui').offset().top
                }, 0);
            }                               
        }
    }); 
}*/

function checkBrand() {
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
                    addBrand();
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

function addBrand() {
    var logo = $('#hidden_logo').val() || null;
    var brand_name = $('#brand_name').val();
    var contact_name_1 = $('#contact_name_1').val();
    var contact_phone_1 = $('#contact_phone_1').val();
    var company_name = $('#company_name').val();
    var title = $('#title').val();
    var new_category = $('#new_category').val();
    var modality_1 = $('#modality_3').val().substr(0,4);
    var modality_2 = $('#modality_3').val().substr(0,6);
    var modality_3 = $('#modality_3').val();
    var attribute = $('#attribute').val() || null;
    var brand_class = $('#class').val() || null;
    var reputation = $('#reputation').val() || null;
    var market_share = $('#market_share').val() || null;
    var name_eng = $('#name_eng').val() || null;
    var location = $('#location').val() || null;
    var standard_area = $('#standard_area').val() || null;
    var target = $('#target').val() || null;
    var city = $('#city').val() || null;
    var history = $('#history').val() || null;
    var rank = $('#rank').val() || null;
    var shop_amount = $('#shop_amount').val() || null;
    var compare = $('#compare').val() || null;
    var average_unit_price = $('#average_unit_price').val() || null;
    var joined = $('#joined').val() || null;

    if(brand_name != '' && contact_name_1 != '' && contact_phone_1 != '' && company_name != '' && title != '' && new_category != '' && modality_1!= '' && modality_2 != '' && modality_3 != ''){
        var map = {
            "attribute": attribute,
            "averageUnitPrice": average_unit_price,
            "brandClass": brand_class,
            "city": city,
            "compare": compare,
            "companyName": company_name,
            "contactName": contact_name_1,
            "contactPhone": contact_phone_1,
            "hdState": "created",
            "history": history,
            "joined": joined,
            "location": location,
            "logo": logo,
            "marketShare": market_share,
            "modality1": modality_1,
            "modality2": modality_2,
            "modality3": modality_3,
            "name": brand_name,
            "nameEng": name_eng,
            "newCategoryCode": new_category,
            "rank": rank,
            "reputation": reputation,
            "shopAmount": shop_amount,
            "standardArea": standard_area,
            "target": target,
            "title": title,
            "userCode": $.cookie('login'),
            "status": 1
        };

        $.ajax({
            url: $.api.baseNew+"/onlineleasing-customer/api/brand/addBrand",
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

function addBrandAdmin() {
    var name = $('#brand_name').val();
    var littleModality = $('#detailed_category').val() || null;
    var floorCode = $('#floor').val() || null;
    var firstMemo = $('#if_first').val() || null;
    var firstMall = $('#mall').val() || null;
    var enterYear = $('#entered_year').val() || null;
    var city = $('#city').val() || null;
    var bigModality = $('#category').val() || null;

    if(name != ''){
        var map = {
            "bigModality": bigModality,
            "city": city,
            "enterYear": enterYear,
            "firstMall": firstMall,
            "firstMemo": firstMemo,
            "floorCode": floorCode,
            "littleModality": littleModality,
            "name": name,
            "state": 1,
            "status": 1,
        };

        $.ajax({
            url: $.api.baseNew+"/onlineleasing-customer/api/brandCompany/save",
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