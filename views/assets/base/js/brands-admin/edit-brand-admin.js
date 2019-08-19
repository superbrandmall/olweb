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
            window.history.pushState("object or string", "Title", "/brands-admin/"+refineEditUrl() );
        },1000);
    }
    
    if ($.cookie('uid') != '' && $.cookie('uid') != 'CUSER180912000001') {
        if($.parseJSON(sessionStorage.getItem("userModalities"))[0].isComplete == 2) {
            getALLNewCategory();
        } else {
            getNewCategory();
        }
    
        getBrandModality1();
        findOneBrandByCode(getURLParameter('id'));
    } else {
        findOneBrandByCodeAdmin(getURLParameter('id'));
    }
    
    $('#modality_1').change(function(){
        getBrandModality2($(this).val());
    })
    
    $('#modality_2').change(function(){
        getBrandModality3($(this).val());
    })
    
    if ($.cookie('uid') != '' && $.cookie('uid') == 'CUSER180912000001') {
        $("#edit-form").validate({
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
                editBrandAdmin();
            }
        });
    } else {
        $("#edit-form").validate({
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
                CheckBrandStatus(getURLParameter('id'));
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

function findOneBrandByCode(id) {
    $.ajax({
        url: $.api.baseNew+"/onlineleasing-customer/api/brand/findOneByCode/"+id,
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
                
                var brand = response.data;
                
                if(brand.state == 1 && brand.hdState == 'created' && brand.userCode == $.cookie('uid')) {
                    $('#brand_name').val(brand.name);
                    $('#hidden_logo').val(brand.logo);
                    $('#contact_name_1').val(brand.contactName);
                    $('#contact_phone_1').val(brand.contactPhone);
                    $('#company_name').val(brand.companyName);
                    $('#title').val(brand.title);
                    $('#new_category').val(brand.newCategoryCode).trigger('change');
                    $('#modality_1').val(brand.modality1).trigger('change');
                    getBrandModality2(brand.modality1);
                    $('#modality_2').val(brand.modality2).trigger('change');
                    getBrandModality3(brand.modality2);
                    $('#modality_3').val(brand.modality3).trigger('change');
                    $('#attribute').val(brand.attribute).trigger('change');
                    $('#class').val(brand.brandClass).trigger('change');
                    $('#reputation').val(brand.reputation).trigger('change');
                    $('#market_share').val(brand.marketShare);
                    $('#name_eng').val(brand.nameEng);
                    $('#location').val(brand.location).trigger('change');
                    $('#standard_area').val(brand.standardArea).trigger('change');
                    $('#target').val(brand.target).trigger('change');
                    $('#city').val(brand.city);
                    $('#history').val(brand.history).trigger('change');
                    $('#rank').val(brand.rank);
                    $('#shop_amount').val(brand.shopAmount).trigger('change');
                    $('#compare').val(brand.compare).trigger('change');
                    $('#average_unit_price').val(brand.averageUnitPrice);
                    $('#joined').val(brand.joined).trigger('change');

                    if(brand.logo != null){
                        $('#imagePreview').attr('src',brand.logo);
                    }
                }
            } else {
                console.log(response.customerMessage);
            }                               
        }
    }); 
}

function CheckBrandStatus(id) {
    $.ajax({
        url: $.api.baseNew+"/onlineleasing-customer/api/brand/findOneByCode/"+id,
        type: "GET",
        async: false,
        beforeSend: function(request) {
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
                
                var brand = response.data;
                
                if(brand.status != 0 && brand.state != 0 && brand.hdState != 'deleted' && brand.userCode == $.cookie('uid')){
                    editBrand();
                } else {
                    window.location.href = 'edit-brand?id='+getURLParameter('id')+'&s=fail';
                }
                
                
            } else {
                console.log(response.customerMessage);
            }                               
        }
    }); 
}

function editBrand() {
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

    if(brand_name != '' && contact_name_1 != '' && contact_phone_1 != '' && company_name != '' && title != ''  && new_category != '' && modality_1!= '' && modality_2 != '' && modality_3 != ''){
        var map = {
            "code": getURLParameter('id'),
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
            "status": 1,
            "state": 1
        };

        $.ajax({
            url: $.api.baseNew+"/onlineleasing-customer/api/brand/update",
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

                    window.location.href = 'edit-brand?id='+getURLParameter('id')+'&s=succeed';
                } else {
                    console.log(response.customerMessage);
                    window.location.href = 'edit-brand?id='+getURLParameter('id')+'&s=fail';
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(textStatus, errorThrown);
                window.location.href = 'edit-brand?id='+getURLParameter('id')+'&s=fail';
            }
        });
    }
}

function refineEditUrl() {
    var url = window.location.href;
    var value = url.substring(url.lastIndexOf('/') + 1);
    value  = value.split("&s")[0];   
    return value;     
}

function findOneBrandByCodeAdmin(id) {
    $.ajax({
        url: $.api.baseNew+"/onlineleasing-customer/api/brandCompany/findOneByCode/"+id,
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
                
                var brand = response.data;
                
                $('#brand_name').val(brand.name);
                $('#category').val(brand.bigModality);
                $('#detailed_category').val(brand.littleModality);
                $('#entered_year').val(brand.enterYear).trigger('change');
                $('#city').val(brand.city);
                $('#mall').val(brand.firstMall);
                $('#if_first').val(brand.firstMemo);
                $('#floor').val(brand.floorCode);
                
            } else {
                console.log(response.customerMessage);
            }                               
        }
    }); 
}

function editBrandAdmin() {
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
            "code": getURLParameter('id'),
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
            url: $.api.baseNew+"/onlineleasing-customer/api/brandCompany/update",
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

                    window.location.href = 'edit-brand?id='+getURLParameter('id')+'&s=succeed';
                } else {
                    console.log(response.customerMessage);
                    window.location.href = 'edit-brand?id='+getURLParameter('id')+'&s=fail';
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(textStatus, errorThrown);
                window.location.href = 'edit-brand?id='+getURLParameter('id')+'&s=fail';
            }
        });
    }
}