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
            window.history.pushState("object or string", "Title", "/brands-admin/"+refineUrl() );
        },1000);
    }
    
    getBrandModality1();
    
    $('#brand_name').blur(function(){
        if($('#brand_name').val() != ''){
            findBrandDashboard($('#brand_name').val());
        }
    });
    
    $('#modality_1').change(function(){
        getBrandModality2($(this).val());
    })
    
    $('#modality_2').change(function(){
        getBrandModality3($(this).val());
    })
    
    $("#create-form").validate({
        onkeyup: false,
        rules: {
            brand_name: {
                required: true,
                minlength: 2
            },
            attribute: {
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
            class: {
                required: true
            },
            reputation: {
                required: true
            },
            market_share: {
                required: true
            },
            name_eng: {
                required: true,
                minlength: 2
            },
            location: {
                required: true
            },
            standard_area: {
                required: true
            },
            target: {
                required: true
            },
            city: {
                required: true,
                minlength: 2
            },
            history: {
                required: true
            },
            rank: {
                required: true
            },
            shop_amount: {
                required: true
            },
            compare: {
                required: true
            },
            average_unit_price: {
                required: true,
                number: true
            },
            joined: {
                required: true
            },
            contact_name_1: {
                required: true
            },
            contact_phone_1: {
                required: true
            },
            logo: {
                required: true
            }
        },
        messages: {
            brand_name: {
                required: "请输入品牌名称",
                minlength: "请输入完整品牌名称"
            },
            attribute: {
                required: "请选择品牌属性"
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
            class: {
                required: "请选择品牌价位"
            },
            reputation: {
                required: "请选择口碑"
            },
            market_share: {
                required: "请输入市场销售份额"
            },
            name_eng: {
                required: "请输入品牌英文名称",
                minlength: "请输入完整品牌英文名称"
            },
            location: {
                required: "请选择开店区域"
            },
            standard_area: {
                required: "请选择标准店面积"
            },
            target: {
                required: "请选择主要客户群"
            },
            city: {
                required: "请输入所在城市",
                minlength: "请输入完整城市名称"
            },
            history: {
                required: "请选择品牌发展历史"
            },
            rank: {
                required: "请输入行业排名"
            },
            shop_amount: {
                required: "请选择当地已开店数"
            },
            compare: {
                required: "请选择月均销售额坪效"
            },
            average_unit_price: {
                required: "请输入客单价",
                number: "请正确输入客单价"
            },
            joined: {
                required: "请选择是否有旗下品牌已入驻SBM/TM"
            },
            contact_name_1: {
                required: "请输入联系人姓名"
            },
            contact_phone_1: {
                required: "请输入联系人电话"
            },
            logo: {
                required: "请上传品牌logo"
            }
        },
        errorPlacement: function(error, element) {
            error.appendTo('#errorcontainer-' + element.attr('id'));
        },
        submitHandler: function() {
            findBrandDashboard($('#brand_name').val());
        }
    });
    
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

function getBrandModality1() {
    $.each($.parseJSON(sessionStorage.getItem("modalities")), function(i,v) {
        $('#modality_1').append('<option value="'+v.code+'">'+v.name+'</option>');
    });
}

function getBrandModality2(mod) {
    var m = mod;
    $('#modality_2').children().not(':first').remove();
    $('#modality_3').children().not(':first').remove();
  
    $.each($.parseJSON(sessionStorage.getItem("modalities")), function(i,v) {
        if(v.code == m) {
            $.each(v.children, function(j,w) {
                $('#modality_2').append('<option value="'+w.code+'">'+w.name+'</option>');
            });
        };
    });
}

function getBrandModality3(mod) {
    var m = mod;
    $('#modality_3').children().not(':first').remove();
  
    $.each($.parseJSON(sessionStorage.getItem("modalities")), function(i,v) {
        $.each(v.children, function(j,w) {
            if(w.code == m) {
                $.each(w.children, function(k,x) {
                    $('#modality_3').append('<option value="'+x.code+'">'+x.name+'</option>');
                });
            };
        });
    });
}

function findBrandDashboard(name) {
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
                    addNewBrand();
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
}

function addNewBrand() {
    var logo = $('#hidden_logo').val();
    var brand_name = $('#brand_name').val();
    var attribute = $('#attribute').val();
    var modality_1 = $('#modality_1').val();
    var modality_2 = $('#modality_2').val();
    var modality_3 = $('#modality_3').val();
    var brand_class = $('#class').val();
    var reputation = $('#reputation').val();
    var market_share = $('#market_share').val();
    var name_eng = $('#name_eng').val();
    var location = $('#location').val();
    var standard_area = $('#standard_area').val();
    var target = $('#target').val();
    var city = $('#city').val();
    var history = $('#history').val();
    var rank = $('#rank').val();
    var shop_amount = $('#shop_amount').val();
    var compare = $('#compare').val();
    var average_unit_price = $('#average_unit_price').val();
    var joined = $('#joined').val();
    var contact_name_1 = $('#contact_name_1').val();
    var contact_phone_1 = $('#contact_phone_1').val();

    var map = {
        "brand": {
            "attribute": attribute,
            "averageUnitPrice": average_unit_price,
            "brandClass": brand_class,
            "city": city,
            "compare": compare,
            "contactName": contact_name_1,
            "contactPhone": contact_phone_1,
            "hdState": "using",
            "history": history,
            "joined": joined,
            "location": location,
            "logo": logo,
            "marketShare": market_share,
            "modality_1": modality_1,
            "modality_2": modality_2,
            "modality_3": modality_3,
            "name": brand_name,
            "nameEng": name_eng,
            "rank": rank,
            "reputation": reputation,
            "shopAmount": shop_amount,
            "standardArea": standard_area,
            "target": target,
            "userCode": $.cookie('login')
          },
          "brandAuthor": "",
          "merchantCode": "1"
    };

    $.ajax({
        url: $.api.baseNew+"/onlineleasing-customer/api/brand/addNewBrand",
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