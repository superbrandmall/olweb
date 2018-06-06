$.brand = '';

$(document).ready(function(){
    GetMyBrands();
    
    ///////////////////// Validate my brand form /////////////////////////
    $("#my_brand_form").validate({
        rules: {
            attribute: {
                required: true
            },
            class: {
                required: true
            },
            reputation: {
                required: true
            },
            market_share: {
                required: true,
                minlength: 2
            },
            city: {
                minlength: 2
            },
            average_unit_price: {
                number: true
            }
        },messages: {
            attribute: {
                required: "请选择品牌属性"
            },
            class: {
                required: "请选择品牌价位"
            },
            reputation: {
                required: "请选择口碑"
            },
            market_share: {
                required: "请输入市场销售份额",
                minlength: "请输入正确市场销售份额"
            },
            city: {
                minlength: "请输入所在城市"
            },
            average_unit_price: {
                number: "请正确输入客单价"
            }
        },
        errorPlacement: function(error, element) {
            error.appendTo('#errorcontainer-' + element.attr('id'));
        },
        submitHandler: function() {
            var code = $('#hidden_brand_code').val();
            var logo;
            if($('.logos').find('img')){
                logo = $('.logos').find('img').attr('src');
            } else {
                logo = '';
            }
            var shop_sample = [];
            if($('.new-samples').length > 0){
                $('.new-samples').each(function(){
                    shop_sample.push({'shopSample': $(this).attr('src')});
                });
            }
            var attribute = $('#attribute').val();
            var brand_class = $('#class').val();
            var reputation = $('#reputation').val();
            var market_share = $('#market_share').val();
            var lawsuit = $('#lawsuit').val();
            var arrears_of_rent = $('#arrears_of_rent').val();
            var tax_evasion = $('#tax_evasion').val();
            var quality_problem = $('#quality_problem').val();
            var name_eng = $('#name_eng').val();
            var location = $('#location').val();
            var standard_area = $('#standard_area').val();
            var target = $('#target').val();
            var city = $('#city').val();
            var history = $('#history').val();
            var rank = $('#rank').val();
            var compare = $('#compare').val();
            var shop_amount = $('#shop_amount').val();
            var average_unit_price = $('#average_unit_price').val();
            var joined = $('#joined').val();
            var join_other_mall = $('#join_other_mall').val();
            
            $.brand.code = code;
            $.brand.attribute = attribute;
            $.brand.logo = logo;
            $.brand.brandClass = brand_class;
            $.brand.reputation = reputation;
            $.brand.marketShare = market_share;
            $.brand.lawsuit = lawsuit;
            $.brand.arrearsOfRent = arrears_of_rent;
            $.brand.taxEvasion = tax_evasion;
            $.brand.qualityProblem = quality_problem;
            $.brand.nameEng = name_eng;
            $.brand.location = location;
            $.brand.standardArea = standard_area;
            $.brand.target = target;
            $.brand.city = city;
            $.brand.history = history;
            $.brand.rank = rank;
            $.brand.shopAmount = shop_amount;
            $.brand.compare = compare;
            $.brand.averageUnitPrice = average_unit_price;
            $.brand.joined = joined;
            $.brand.joinOtherMall = join_other_mall;
            $.brand.logo = logo;
            $.brand.source = 1;
            

            var map = {
                brand: $.brand,
                sampleList: shop_sample
            };
            $.ajax({
                url: $.api.base+"/brandinfo/updateExistingBrand",
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
                    interpretBusinessCode(response.code);
                    
                    if(response.code === 'C0') {
                        if(xhr.getResponseHeader("Authorization") !== null){
                            $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                        }
                        if(getURLParameter('bid')){
                            window.location.href = "my-brands?bid="+getURLParameter('bid')+"&s=update-succeed";
                        } else {
                            window.location.href = "my-brands?s=update-succeed";
                        }
                    }
                },
                error: function(jqXHR, textStatus, errorThrown) {
                   console.log(textStatus, errorThrown);
                }
            });
        }
    });
    
    ///////////////////// File Uploading /////////////////////////////////////
    $('#logo').on("change", function () {
        var formData = new FormData();
        formData.append('vo.userCode',  $.cookie('login'));
        formData.append('vo.containerName', 'test');
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
                    $('.logos').remove();
                    $('#hidden_logo').val(response.data[0].uri);
                    $('<div class="col-md-6 logos"><img src="'+response.data[0].uri+'" class="img-responsive"></div>').insertBefore($('#logo'));
                } else {
                    interpretBusinessCode(response.customerMessage);
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
               console.log(textStatus, errorThrown);
            }
        });
    });
    
    $('#shop_sample').on("change", function () {
        var formData = new FormData();
        formData.append('vo.userCode',  $.cookie('login'));
        formData.append('vo.containerName', 'test');
        formData.append('vo.prefix', $.cookie('login')+'/photo/shopSample');
        for(var i=0;i<$('#shop_sample')[0].files.length;i++){
            formData.append('files', $('#shop_sample')[0].files[i]);
        }
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
                    $.each(response.data, function(i,v) {    
                        $('<div class="col-md-3 shop-samples"><img src="'+v.uri+'" class="img-responsive new-samples" style="margin-bottom: 10px;"></div>').insertBefore($('#shop_sample')); 
                    });
                } else {
                    interpretBusinessCode(response.customerMessage);
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
               console.log(textStatus, errorThrown);
            }
        });
    });
});

function GetMyBrands() {
    $('#brand_list li:not(:first-child)').remove();
    
    $.ajax({
        url: $.api.baseNew+"/onlineleasing-customer/api/brand/findAllByMerchantCode/"+$('#hidden_merchant_code').val()+"",
        type: "GET",
        async: false,
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
                $.each(response.data, function(i,v) {
                    if(getURLParameter('bid') && getURLParameter('bid') !== '') {
                        if (getURLParameter('bid') === v.brandCode) {
                            $('#brand_list').prepend('<li class="active"><a class="c-font-16 c-font-bold" href="?bid='+v.brandCode+'">'+v.brandName+'</a></li>');
                            GetBrandInfo(v.brandCode);
                            
                            if(v.brandAuthor !== null) {
                                $('#brand_author').append('<div class="col-md-6"><img src="'+v.brandAuthor+'" class="img-responsive"></div>');
                            }
                        } else {
                            $('#brand_list').prepend('<li><a class="c-font-16 c-font-bold" href="?bid='+v.brandCode+'">'+v.brandName+'</a></li>');
                        }
                    } else {
                        if (i === response.data.length - 1) {
                            $('#brand_list').prepend('<li class="active"><a class="c-font-16 c-font-bold" href="?bid='+v.brandCode+'">'+v.brandName+'</a></li>');
                            GetBrandInfo(v.brandCode);
                            
                            if(response.data[i].brandAuthor !== null) {
                                $('#brand_author').append('<div class="col-md-6"><img src="'+response.data[i].brandAuthor+'" class="img-responsive"></div>');
                            }
                        } else {
                            $('#brand_list').prepend('<li><a class="c-font-16 c-font-bold" href="?bid='+v.brandCode+'">'+v.brandName+'</a></li>');
                        }
                    }
                });
            } else {
                interpretBusinessCode(response.customerMessage);
            }
        }
    });
}

function GetBrandInfo(brandCode) {
    $('#my_brand_form')[0].reset();
    
    $.ajax({
        url: $.api.baseNew+"/onlineleasing-customer/api/brand/findOneByCode/"+brandCode+"",
        type: "GET",
        async: false,
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
                var brand = response.data;
                $.brand = brand;
                $('.c-content-title-1 h3').text(brand.name);
                $('#hidden_brand_code').val(brand.code);
                $('#brand_name').val(brand.name);
                $('#attribute').val(brand.attribute);
                if(brand.logo !== null) {
                    $('<div class="col-md-6 logos"><img src="'+brand.logo+'" class="img-responsive"></div>').insertBefore($('#logo'));
                }
                if(response.data.brandShopSamples !== null) {
                    $.each(response.data.brandShopSamples, function(i,v) {    
                        $('<div class="col-md-3 shop-samples"><img src="'+v+'" class="img-responsive" style="margin-bottom: 10px;"></div>').insertBefore($('#shop_sample')); 
                    });
                }

                var mod = [];
                mod = $.parseJSON(sessionStorage.getItem("modalities"));
                $.each(mod, function(i,v) {
                    if(v.code == brand.modality_1.substr(0,2)) {
                        $.each(v.children, function(j,w) {
                            if(w.code == brand.modality_1) {
                                $('#modality_1').val(w.name);
                                $.each(w.children, function(k,x) {
                                    if(x.code == brand.modality_2) {
                                        $('#modality_2').val(x.name);
                                        $.each(x.children, function(l,y) {
                                            if(y.code == brand.modality_3) {
                                                $('#modality_3').val(y.name);
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                });

                $('#class').val(brand.brandClass);
                $('#reputation').val(brand.reputation);
                $('#market_share').val(brand.marketShare);
                $('#name_eng').val(brand.nameEng);
                $('#location').val(brand.location);
                $('#standard_area').val(brand.standardArea);
                $('#target').val(brand.target);
                $('#city').val(brand.city);
                $('#history').val(brand.history);
                $('#reputation').val(brand.reputation);
                $('#rank').val(brand.rank);
                $('#shop_amount').val(brand.shopAmount);
                $('#compare').val(brand.compare);
                $('#average_unit_price').val(brand.averageUnitPrice);
                $('#joined').val(brand.joined);
                $('#join_other_mall').val(brand.joinOtherMall);
                
                /*if(brand.status === 2 || brand.status === 4) {
                    $('#my_brand_form :input').attr('disabled', true);
                    $('.c-content-title-1').append('<div class="alert alert-info" style="display: block;" role="alert">品牌信息正在审核或修改中，禁止修改。</div>');
                }*/
            } else {
                interpretBusinessCode(response.customerMessage);
            }
        }
    });
}