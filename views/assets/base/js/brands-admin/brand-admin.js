$(document).ready(function(){
    findOneBrandByCode(getURLParameter('id'));
})

function findOneBrandByCode(id) {
    $('.update-link').attr('href','/brands-admin/edit-brand?id='+id);
    $('.delete-asset').attr('href','javascript: deleteBrand("'+id+'")');
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
                
                var url;
                if($.parseJSON(sessionStorage.getItem("userModalities"))[0].isComplete == 2){
                    url = 'findAllByBrandCode/'+id; // Category head 可以查看自己管理的业态，其中马云飞和宋总可以查看所有业态
                } else {
                    url = 'findAllByBrandCodeAndUserCode/'+id+'/'+$.cookie('uid'); // 其他人只能查看自己建立的联系人
                }
                
                findContacts(url);
                    
                $('#loader').hide();
                
                var brand = response.data;
                
                var allow = 0;
                $.each($.parseJSON(sessionStorage.getItem("userModalities")), function(a,b) {
                    if(brand.newCategoryCode == b.newCategoryCode && b.isComplete == 2) {
                        allow = 1;
                    };
                })
                
                if(brand.state == 1 && brand.hdState == 'created' && (brand.userCode == $.cookie('uid') || allow == 1)) {
                    $('#brand_name').text(brand.name);
                    $('#contact_name_1').text(brand.contactName);
                    $('#contact_phone_1').text(brand.contactPhone);
                    $('#company_name').text(brand.companyName);
                    $('#title').text(brand.title);

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

                    $('#attribute').text(attribute);
                    $('#new_category').text(category);
                    $('#modality_1').text(modality1);
                    $('#modality_2').text(modality2);
                    $('#modality_3').text(modality3);

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

                    $('#class').text(brandClass);
                    $('#reputation').text(reputation);
                    $('#market_share').text(brand.marketShare);
                    $('#name_eng').text(brand.nameEng);

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

                    $('#location').text(location);

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

                    $('#standard_area').text(standardArea);

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

                    $('#target').text(target);
                    $('#city').text(brand.city);

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

                    $('#history').text(history);
                    $('#rank').text(brand.rank);
                    $('#shop_amount').text(brand.shopAmount);

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

                    $('#compare').text(compare);
                    $('#average_unit_price').text(brand.averageUnitPrice);

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

                    $('#joined').text(joined);

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

function findContacts(url) {
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
        success: function (response, status, xhr) {
            $('#loader').hide();
            if(response.code === 'C0') {
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                }
                
                if(response.data.content.length > 0) { 
                    
                }
            }
        }
    })
}

function deleteBrand(id) {
    $.ajax({
        url: $.api.baseNew + "/onlineleasing-customer/api/brand/delete/?code=" + id,
        type: "DELETE",
        async: false,
        beforeSend: function (request) {
            request.setRequestHeader("Login", $.cookie('login'));
            request.setRequestHeader("Authorization", $.cookie('authorization'));
            request.setRequestHeader("Lang", $.cookie('lang'));
            request.setRequestHeader("Source", "onlineleasing");
        },
        complete: function () {},
        success: function (response, status, xhr) {
            if(xhr.getResponseHeader("Authorization") !== null){
                $.cookie('authorization', xhr.getResponseHeader("Authorization"));
            }
                
            if (response.code === 'C0') {
                window.location.href = 'home/?delete=succeed';
            } else {
                window.location.href = 'home/?delete=fail';
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            window.location.href = 'home/?delete=fail';
        }
    });
}