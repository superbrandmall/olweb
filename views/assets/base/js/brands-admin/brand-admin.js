$(document).ready(function(){
    findOneBrandByCode(getURLParameter('id'));
})

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
                
                $('#brand_name').val(brand.name);
                $('#contact_name_1').val(brand.contactName);
                $('#contact_phone_1').val(brand.contactPhone);
                $('#company_name').val(brand.companyName);
                $('#title').val(brand.title);
                
                var attribute, category, modality1, modality2, modality3, brandClass, reputation, location, target, standardArea, history, compare, joined;
                switch (brand.attribute) {
                    case 1:
                        attribute = '国际知名品牌国内首家';
                        break;
                    case 2:
                        attribute = '国际主流知名品牌';
                        break;
                    case 3:
                        attribute = '国际普通品牌';
                        break;
                    case 4:
                        attribute = '国内主流知名品牌';
                        break;
                    case 5:
                        attribute = '国内普通品牌';
                        break;
                    case 6:
                        attribute = '区域知名品牌';
                        break;
                    case 7:
                        attribute = '区域普通品牌';
                        break;
                    default:
                        attribute = '';
                        break;
                }
                
                $.each($.parseJSON(sessionStorage.getItem("category")), function(h,u) {
                    if(u.code == brand.newCategoryCode) {
                        category = u.name;
                    }
                });
                
                $.each($.parseJSON(sessionStorage.getItem("modalities")), function(h,u) {
                    $.each(u.children, function(j,w) {
                        if(w.code == brand.modality1) {
                            modality1 = w.name;
                        }
                        $.each(w.children, function(k,x) {
                            if(x.code == brand.modality2) {
                                modality2 = x.name;
                            }
                            $.each(x.children, function(l,y) {
                                if(y.code == brand.modality3) {
                                    modality3 = y.name;
                                }
                            });
                        });
                    });
                });
                        
                $('#attribute').val(attribute);
                $('#new_category').val(category);
                $('#modality_1').val(modality1);
                $('#modality_2').val(modality2);
                $('#modality_3').val(modality3);
                
                switch (brand.brandClass) {
                    case 1:
                        brandClass = '奢侈';
                        break;
                    case 2:
                        brandClass = '中等';
                        break;
                    case 3:
                        brandClass = '低端';
                        break;
                    default:
                        brandClass = '';
                        break;
                }

                switch (brand.reputation) {
                    case 1:
                        reputation = '非常好';
                        break;
                    case 2:
                        reputation = '比较好';
                        break;
                    case 3:
                        reputation = '一般';
                        break;
                    default:
                        reputation = '';
                        break;
                }
                
                $('#class').val(brandClass);
                $('#reputation').val(reputation);
                $('#market_share').val(brand.marketShare);
                $('#name_eng').val(brand.nameEng);
                
                switch (brand.location) {
                    case 1:
                        location = '商务区';
                        break;
                    case 2:
                        location = '居民区';
                        break;
                    case 3:
                        location = '商务区/居民区';
                        break;
                    default:
                        location = '';
                        break;
                }
                
                $('#location').val(location);
                
                switch (brand.standardArea) {
                    case 1:
                        standardArea = '< 80 ㎡';
                        break;
                    case 2:
                        standardArea = '80 - 150 ㎡';
                        break;
                    case 3:
                        standardArea = '150 - 250 ㎡';
                        break;
                    case 4:
                        standardArea = '250 - 600 ㎡';
                        break;
                    case 5:
                        standardArea = '> 600 ㎡';
                        break;
                    default:
                        standardArea = '';
                        break;
                }
                
                $('#standard_area').val(standardArea);
                
                switch (brand.target) {
                    case 1:
                        target = '快速增长的中产家庭';
                        break;
                    case 2:
                        target = '金领/商务精英/高级白领/专业人';
                        break;
                    case 3:
                        target = '富裕的年长者/心态年轻的中老年人';
                        break;
                    case 4:
                        target = '有消费力的新世代（80/90后）';
                        break;
                    case 5:
                        target = '都有';
                        break;
                    default:
                        target = '';
                        break;
                }
                
                $('#target').val(target);
                $('#city').val(brand.city);
                
                switch (brand.history) {
                    case 1:
                        history = '> 10年';
                        break;
                    case 2:
                        history = '> 5年';
                        break;
                    case 3:
                        history = '> 2年';
                        break;
                    case 4:
                        history = '新品牌';
                        break;
                    default:
                        history = '';
                        break;
                }
                
                $('#history').val(history);
                $('#rank').val(brand.rank);
                $('#shop_amount').val(brand.shopAmount);
                
                switch (brand.compare) {
                    case 1:
                        compare = '> 当地同等行业水平 20%';
                        break;
                    case 2:
                        compare = '> 当地同等行业水平 10%';
                        break;
                    case 3:
                        compare = '= 当地同等行业水平';
                        break;
                    case 4:
                        compare = '< 当地同等行业水平 10%';
                        break;
                    case 5:
                        compare = '< 当地同等行业水平 20%';
                        break;
                    default:
                        compare = '';
                        break;
                }
                
                $('#compare').val(compare);
                $('#average_unit_price').val(brand.averageUnitPrice);
                
                switch (brand.joined) {
                    case 1:
                        joined = '0';
                        break;
                    case 2:
                        joined = '1';
                        break;
                    case 3:
                        joined = '2';
                        break;
                    case 4:
                        joined = '3';
                        break;
                    case 5:
                        joined = '> 3';
                        break;
                    default:
                        joined = '';
                        break;
                }
                
                $('#joined').val(joined);
                
                if(brand.logo != null){
                    $('#imagePreview').attr('src',brand.logo);
                }
            } else {
                console.log(response.customerMessage);
            }                               
        }
    }); 
}