$.brand = {
	add: "addNewBrand",
    info: {},
    copy: "",
    getByCode: true
};

$(document).ready(function(){
    getBrandModality1();
    GetMyBrands();
    
    $('#brand_name').blur(function(){
        if($.brand.getByCode === true){
            GetBrandByCode($('#hidden_brand_code').val() || null);
        }
    });
    
    $('#brand_name').change(function(){
        $.brand.getByCode = true;
    });
    
    ///////////////////// Validate my brand form /////////////////////////
    $("#add_brand_form").validate({
        rules: {
            brand_name: {
                required: true,
                minlength: 2
            },
            attribute: {
                required: true
            },
            logo: {
                required: true
            },
            brand_author: {
                required: true
            },
            shop_sample: {
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
                required: true,
                minlength: 2
            },
            city: {
                minlength: 2
            },
            rank: {
                digits: true
            },
            average_unit_price: {
                number: true
            }
        },messages: {
            brand_name: {
                required: "请输入品牌名称",
                minlength: "请输入完整品牌名称"
            },
            attribute: {
                required: "请选择品牌属性"
            },
            logo: {
                required: "请上传品牌Logo"
            },
            brand_author: {
                required: "请上传品牌授权书"
            },
            shop_sample: {
                required: "请上传门店样图"
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
                required: "请输入市场销售份额",
                minlength: "请输入正确市场销售份额"
            },
            city: {
                minlength: "请输入所在城市"
            },
            rank: {
                digits: "请输入排名数字"
            },
            average_unit_price: {
                number: "请正确输入客单价"
            }
        },
        errorPlacement: function(error, element) {
            error.appendTo('#errorcontainer-' + element.attr('id'));
        },
        submitHandler: function() {
            var code = $('#hidden_brand_code').val() || null;
            var logo = $('#hidden_logo').val() || null;
            var brand_author = $('#hidden_brand_author').val() || null;
            var shop_sample = [];
            $(".shop-samples").each(function(){
                shop_sample.push($(this).find('img').attr('src'));
            });
            var name = $('#brand_name').val() || null;
            var attribute = parseInt($('#attribute').val()) || null;
            var modality_1 = $('#modality_1').val() || null;
            var modality_2 = $('#modality_2').val() || null;
            var modality_3 = $('#modality_3').val() || null;
            var brand_class = parseInt($('#class').val()) || null;
            var reputation = parseInt($('#reputation').val()) || null;
            var market_share = $('#market_share').val() || null;
            var name_eng = $('#name_eng').val();
            var location = $('#location').val() || null;
            var standard_area = $('#standard_area').val() || null;
            var target = $('#target').val() || null;
            var city = $('#city').val();
            var history = $('#history').val() || null;
            var rank = $('#rank').val() || null;
            var shop_amount = $('#shop_amount').val() || null;
            var compare = $('#compare').val() || null;
            var average_unit_price = $('#average_unit_price').val() || null;
            var joined = $('#joined').val() || null;
            var join_other_mall = $('#join_other_mall').val() || null;

            $.brand.info.code = code;
            $.brand.info.logo = logo;
            $.brand.info.name = name;
            $.brand.info.attribute = attribute;
            $.brand.info.modality_1 = modality_1;
            $.brand.info.modality_2 = modality_2;
            $.brand.info.modality_3 = modality_3;
            $.brand.info.brandClass = brand_class;
            $.brand.info.reputation = reputation;
            $.brand.info.marketShare = market_share;
            $.brand.info.nameEng = name_eng;
            $.brand.info.location = location;
            $.brand.info.standardArea = standard_area;
            $.brand.info.target = target;
            $.brand.info.city = city;
            $.brand.info.history = history;
            $.brand.info.rank = rank;
            $.brand.info.shopAmount = shop_amount;
            $.brand.info.compare = compare;
            $.brand.info.averageUnitPrice = average_unit_price;
            $.brand.info.joined = joined;
            $.brand.info.joinOtherMall = join_other_mall;
            $.brand.info.brandShopSamples = shop_sample;

            var info = JSON.stringify($.brand.info);

            if($.brand.add !== 'addNewBrand'){
                if(info == $.brand.copy){
                    $.brand.add = 'addExistingBrand'; // addExistingBrandWithoutUpdate
                } else {
                    $.brand.add = 'addExistingBrand'; // addExistingBrandWithUpdate
                }
                
                var map = {
                    brandCode: $.brand.info.code,
                    brandAuthor: brand_author,
                    merchantCode: $('#hidden_merchant_code').val()
                };
            } else {
                var map = {
                    brand: $.brand.info,
                    brandAuthor: brand_author,
                    merchantCode: $('#hidden_merchant_code').val()
                };
            }
            
            $.ajax({
                url: $.api.baseNew+"/onlineleasing-customer/api/brand/"+$.brand.add,
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
                        window.location.href = "my-brands";
                    } else {
                        interpretBusinessCode(response.customerMessage);
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
    
    $('#brand_author').on("change", function () {
        var formData = new FormData();
        formData.append('vo.userCode',  $.cookie('login'));
        formData.append('vo.containerName', 'test');
        formData.append('vo.prefix', $.cookie('login')+'/photo/brandAuthor');
        formData.append('files', $('#brand_author')[0].files[0]);
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
                    $('.brand-authors').remove();
                    $('#hidden_brand_author').val(response.data[0].uri);
                    $('<div class="col-md-6 brand-authors"><img src="'+response.data[0].uri+'" class="img-responsive"></div>').insertBefore($('#brand_author'));
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
                        $('<div class="col-md-3 shop-samples"><img src="'+v.uri+'" class="img-responsive" style="margin-bottom: 10px;"></div>').insertBefore($('#shop_sample')); 
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
    
    ///////////////////// Brand name tag suggestions /////////////////////////
    var tagSuggestion = new Bloodhound({
    datumTokenizer: function(datum) {
        return Bloodhound.tokenizers.whitespace(datum.value);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    remote: {
            url: $.api.baseNew+"/onlineleasing-customer/api/brand/findAllByNameContaining?name=QUERY",
            wildcard: 'QUERY',
            transform: function(response) {
                return $.map(response.data, function(brand) {
                    return {
                        value: brand.name,
                        code: brand.code
                    };
                });
            }
        }
    });
    
    $('#brand_name').typeahead(null,{
        display: 'value',
        source: tagSuggestion
    }).bind("typeahead:selected", function(obj, datum, name) {
        $('#hidden_brand_code').val(datum.code);
        $.brand.add = 'addExistingBrand'; // addExistingBrandWithoutUpdate
        GetBrandByCode(datum.code);
    });
});

function GetMyBrands() {
    $('#brand_list li:not(:last-child)').remove();
    
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
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                }
                $.each(response.data, function(i,v) {                    
                    $('#brand_list').prepend('<li><a class="c-font-16 c-font-bold" href="my-brands?bid='+v.brandCode+'">'+v.brandName+'</a></li>'); 
                });
            } else {
                interpretBusinessCode(response.customerMessage);
            }
        }
    });
}

var modal = [];
modal = $.parseJSON(sessionStorage.getItem("modalities"));
    
function getBrandModality1() {
	$('#modality_1').children().not(':first').remove();
    
    $.each(modal, function(i,v) {
        $.each(v.children, function(j,w) {
            $('#modality_1').append('<option value="'+w.code+'">'+w.name+'</option>');
        });
    });
}

function getBrandModality2(mod) {
	var m = mod;
	$('#modality_2').children().not(':first').remove();
  
    $.each(modal, function(i,v) {
        $.each(v.children, function(j,w) {
            if(w.code == m) {
                $.each(w.children, function(k,x) {
                    $('#modality_2').append('<option value="'+x.code+'">'+x.name+'</option>');
                });
            }
        });
    });
}

function getBrandModality3(mod) {
	var m = mod;
	$('#modality_3').children().not(':first').remove();
  
    $.each(modal, function(i,v) {
        $.each(v.children, function(j,w) {
            $.each(w.children, function(k,x) {
                if(x.code == m) {
                    $.each(x.children, function(l,y) {
                        $('#modality_3').append('<option value="'+y.code+'">'+y.name+'</option>');
                    });
                }
            });
        });
    });
}

function GetBrandByCode(n) {
    $('#add_brand_form').not('#brand_name')[0].reset(); 
    
	$.ajax({
        url: $.api.baseNew+"/onlineleasing-customer/api/brand/findOneByCode/"+n+"",
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
            $('#add_brand_form').not('#brand_name')[0].reset();
            $.brand.getByCode = false;
            
            if(response.code === 'C0') {
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                }
                if(response.data === null){ // 如果没有返回该品牌信息，则视增加的品牌为新品牌
                    $.brand.add = 'addNewBrand';
                    
                    $('#attribute').val("").attr('disabled',false);
                    $('#logo').show();
                    $('#shop_sample').show();
                    $('#modality_1').val("").attr('disabled',false);
                    $('#modality_2').val("").attr("disabled",false);
                    $('#modality_3').val("").attr("disabled",false);
                    $('#class').val("").attr('disabled',false);
                    $('#reputation').val("").attr('disabled',false);
                    $('#market_share').val("").attr('disabled',false);
                    $('#name_eng').val("").attr('disabled',false);
                    $('#location').val("").attr('disabled',false);
                    $('#standard_area').val("").attr('disabled',false);
                    $('#target').val("").attr('disabled',false);
                    $('#city').val("").attr('disabled',false);
                    $('#history').val("").attr('disabled',false);
                    $('#reputation').val("").attr('disabled',false);
                    $('#rank').val("").attr('disabled',false);
                    $('#shop_amount').val("").attr('disabled',false);
                    $('#compare').val("").attr('disabled',false);
                    $('#average_unit_price').val("").attr('disabled',false);
                    $('#joined').val("").attr('disabled',false);
                    $('#join_other_mall').val("").attr('disabled',false);
                } else {
                    $.brand.add = 'addExistingBrand'; // addExistingBrandWithoutUpdate, 如果有返回该品牌信息，则视增加的品牌为已经存在的品牌
                    var brand = response.data;
                    $.brand.info = brand;
                    $.brand.copy = JSON.stringify(brand); // 保存该品牌返回的所有信息为一个对象用以比较之后是否修改
                    $('#hidden_brand_code').val(brand.code); 
                    $('#brand_name').val(brand.name);
                    /*if(response.data.merchantBrand !== null){ // 如果该品牌已经挂钩于某商户
                        var merchantBrand = response.data.merchantBrand;
                        if(merchantBrand.brandAuthor !== null) { // 如果品牌授权书字段不为空，则插入授权书
                            $('.brand-authors').html('');
                            $('<div class="col-md-6 brand-authors"><img src="'+merchantBrand.brandAuthor+'" class="img-responsive"></div>').insertBefore($('#brand_author'));
                        }
                    }*/
                    $('#attribute').val(brand.attribute).attr('disabled','disabled');
                    if(brand.logo !== null) {
                        $('.logos').html('');
                        $('<div class="col-md-6 logos"><img src="'+brand.logo+'" class="img-responsive"></div>').insertBefore($('#logo'));
                        $('#hidden_logo').val(brand.logo);
                    }
                    $('#logo').hide();
                    if(response.data.brandShopSamples.length > 0) {
                        $.each(response.data.brandShopSamples, function(i,v) {    
                            $('<div class="col-md-3 shop-samples"><img src="'+v+'" class="img-responsive" style="margin-bottom: 10px;"></div>').insertBefore($('#shop_sample')); 
                        });
                    }
                    $('#shop_sample').hide();
                    $('#modality_1').val(brand.modality_1).attr('disabled','disabled');
                    getBrandModality2(brand.modality_1);
                    getBrandModality3(brand.modality_2);
                    $('#modality_2').val(brand.modality_2).attr("disabled",'disabled');
                    $('#modality_3').val(brand.modality_3).attr("disabled",'disabled');
                    $('#class').val(brand.brandClass).attr('disabled','disabled');
                    $('#reputation').val(brand.reputation).attr('disabled','disabled');
                    $('#market_share').val(brand.marketShare).attr('disabled','disabled');
                    $('#name_eng').val(brand.nameEng).attr('disabled','disabled');
                    $('#location').val(brand.location).attr('disabled','disabled');
                    $('#standard_area').val(brand.standardArea).attr('disabled','disabled');
                    $('#target').val(brand.target).attr('disabled','disabled');
                    $('#city').val(brand.city).attr('disabled','disabled');
                    $('#history').val(brand.history).attr('disabled','disabled');
                    $('#reputation').val(brand.reputation).attr('disabled','disabled');
                    $('#rank').val(brand.rank).attr('disabled','disabled');
                    $('#shop_amount').val(brand.shopAmount).attr('disabled','disabled');
                    $('#compare').val(brand.compare).attr('disabled','disabled');
                    $('#average_unit_price').val(brand.averageUnitPrice).attr('disabled','disabled');
                    $('#joined').val(brand.joined).attr('disabled','disabled');
                    $('#join_other_mall').val(brand.joinOtherMall).attr('disabled','disabled');
                }
                
                $('#hidden_brand_code').val(null);
            } else {
                interpretBusinessCode(response.customerMessage);
                
                $.brand.info = {};
                $.brand.copy = "";
            }
        }
    });
}