$(document).ready(function(){
    if(getURLParameter('delete')) {
        switch (getURLParameter('delete')) {
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
            window.history.pushState("object or string", "Title", "/brands-admin/"+refineDeleteUrl() );
        },1000);
    }
    
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
                
                var url;
                if($.parseJSON(sessionStorage.getItem("userModalities"))[0].isComplete == 2){
                    url = 'findAllByBrandCode/'+id; // Category head 可以查看自己的业category，其中宋总和马云飞可查看所有业态
                } else {
                    url = 'findAllByBrandCodeAndUserCode/'+id+'/'+$.cookie('uid'); // 其他人只能查看自己建立的品牌
                }
                
                findContacts(url);
                
                var brand = response.data;
                
                if($.cookie('login') == 'CUSER190709000022' || $.cookie('login') == 'CUSER190709000015' || $.cookie('login') == 'CUSER200524000004'){
                    if(brand.status == 1){
                        $('.lock-link').attr('href','javascript: lockBrand("'+brand.code+'",0)').text('锁定品牌');
                        $('#lock2').removeClass('btn-warning').addClass('btn-success');
                        $('.lock-link').parent().show();
                    } else {
                        $('.lock-link').attr('href','javascript: lockBrand("'+brand.code+'",1)').text('解锁品牌');
                        $('#lock2').removeClass('btn-success').addClass('btn-warning');
                        $('.lock-link').parent().show();
                    }
                }

                if(brand.userCode == $.cookie('login')){ // 如果登录者为该品牌所有者
                    if(brand.status == 0 && $.cookie('login') != 'CUSER190709000022' && $.cookie('login') != 'CUSER190709000015' && $.cookie('login') != 'CUSER200524000004'){ // 如果该品牌已锁定并且登录者没有最大权限
                        $('.lock-link').attr('href','#!').removeClass('btn-success').addClass('btn-warning').text('已锁定');
                        $('.lock-link').parent().show();
                    } else {
                        $('.update-link').attr('href','/brands-admin/edit-brand?id='+id);
                        $('.update-link').parent().show();
                        
                        $('#details .delete-asset, .dropdown .delete-asset').attr('href','javascript: deleteBrand("'+id+'")');
                        $('#details .delete-asset, .dropdown .delete-asset').parent().show();
                    }
                }
                
                $('.create-contact-link').attr('href','/brands-admin/create-brand-contact?id='+id+'&category='+brand.newCategoryCode);
                    
                $('#loader').hide();
                
                var allow = 0;
                $.each($.parseJSON(sessionStorage.getItem("userModalities")), function(a,b) {
                    if(brand.newCategoryCode == b.newCategoryCode && b.isComplete == 2) {
                        allow = 1;
                    };
                })
                
                if(brand.state == 1 && brand.hdState == 'created' && (brand.userCode == $.cookie('uid') || allow == 1)) {
                    if(brand.logo != null){
                        $('#imagePreview').attr('src',brand.logo);
                    }
                    
                    $('#brand_name').text(brand.name);

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
                    
                    $('#new_category').text(category);
                    $('#modality_1').text(modality1);
                    $('#modality_2').text(modality2);
                    $('#modality_3').text(modality3);
                    $('#average_unit_price').text(brand.averageUnitPrice);
                    $('#compare').text(compare);
                    $('#standard_area').text(standardArea);
                    $('#entered_mall').text(brand.mallName);
                    $('#competitor').text(brand.competitorBrand);
                    $('#attribute').text(attribute);

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
                if(xhr.getResponseHeader("Login") !== null){
                    $.cookie('login', xhr.getResponseHeader("Login"));
                }
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                }
                $('#loader').hide();
                
                if(response.data.content.length > 0) {
                    var update;
                    var lock = '';
                    $.each(response.data.content, function(i,v){
                        var user = '管理员';
                        $.each($.parseJSON(sessionStorage.getItem("users")), function(h,u) {
                            if(u.code == v.userCode) {
                                user = u.name;
                            }
                        });
                        
                        if($.cookie('login') == 'CUSER190709000022' || $.cookie('login') == 'CUSER190709000015' || $.cookie('login') == 'CUSER200524000004'){
                            if(v.status == 1){
                                lock = '<a href=\'javascript: lockContact("'+v.code+'",0);\' id="lock_'+v.code+'" class="btn btn-success btn-xs" title="Lock"><i class="fa fa-unlock"></i></a>&nbsp;';
                            } else {
                                lock = '<a href=\'javascript: lockContact("'+v.code+'",1);\' id="lock_'+v.code+'" class="btn btn-warning btn-xs" title="Unlock"><i class="fa fa-lock"></i></a>&nbsp;';
                            }
                        }
                        
                        if(v.userCode == $.cookie('login')){ // 如果登录者为该联系人所有者
                            if(v.status == 0 && $.cookie('login') != 'CUSER190709000022' && $.cookie('login') != 'CUSER190709000015' && $.cookie('login') != 'CUSER200524000004'){ // 如果该联系人已锁定并且登录者没有最大权限
                                update = '<span class="btn btn-xs btn-warning">已锁定</span>';
                            } else {
                                update = '<a href=\'javascript: deleteContact("'+v.code+'");\' class="btn btn-danger btn-xs delete-asset" data-tooltip="true" data-toggle="modal" data-content="是否确定删除该联系人 ?" data-title="删除联系人" onclick="return false;"><i class="fa fa-trash"></i></a>&nbsp;'+lock;
                            }
                        } else {
                            update = lock;
                        }
                        
                        if(v.remarkThird != null && v.remarkThird != ''){
                            var nameCard = '><a href="'+v.remarkThird+'" data-toggle="lightbox" data-type="image"><img src="'+v.remarkThird+'" width="50"></a>';
                        } else {
                            var nameCard = '';
                        }
                        
                        $('#contactsTable').append('\
<tr data-index="'+i+'">\n\
<td class="col-sm-1">'+v.contactName+'</td>\n\
<td class="col-sm-2">'+nameCard+'</td>\n\
<td class="col-sm-2">'+v.companyName+'</td>\n\
<td class="col-sm-2">'+v.title +'</td>\n\
<td class="col-sm-1">'+v.contactPhone+'</td>\n\
<td class="col-sm-1">'+(v.remarkFirst || "")+'</td>\n\
<td class="col-sm-1">'+(v.remarkSecond || "")+'</td>\n\
<td class="col-sm-1">'+user+'</td>\n\
<td class="col-sm-1">'+update+'</td>\n\
</tr>');
                    })
                }
            }
        }
    })
}

function deleteBrand(id) {
    $.ajax({
        url: $.api.baseNew + "/onlineleasing-customer/api/brand/delete/?code=" + id + "&loginUserCode=" + $.cookie('login'),
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

function deleteContact(id) {
    var map = {};
    $.ajax({
        url: $.api.baseNew + "/onlineleasing-customer/api/brandContact/deleteBrandContact/?code=" + id,
        type: "POST",
        data: JSON.stringify(map),
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
                window.location.href = 'brand?id='+getURLParameter('id')+'&delete=succeed#contacts_tab';
            } else {
                window.location.href = 'brand?id='+getURLParameter('id')+'&delete=fail#contacts_tab';
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            window.location.href = 'brand?id='+getURLParameter('id')+'&delete=fail#contacts_tab';
        }
    });
}

function lockBrand(id,s){
    var map = {};
    $.ajax({
        url: $.api.baseNew+"/onlineleasing-customer/api/brand/updateStatus?code="+id+"&status="+s+"&loginUserCode="+$.cookie('login'),
        type: "POST",
        data: JSON.stringify(map),
        async: false,
        dataType: "json",
        contentType: "application/json",
        beforeSend: function(request) {
            request.setRequestHeader("Login", $.cookie('login'));
            request.setRequestHeader("Authorization", $.cookie('authorization'));
            request.setRequestHeader("Lang", $.cookie('lang'));
            request.setRequestHeader("Source", "onlineleasing");
        },
        success: function (response, status, xhr) {
            if(response.code === 'C0') {
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                }
            }
            
            if(s == 0){
                $('.lock-link').attr('href','javascript: lockBrand("'+id+'",1)').text('解锁品牌');
                $('#lock2').removeClass('btn-success').addClass('btn-warning');
                $('.lock-link').parent().show();
                
            } else {
                $('.lock-link').attr('href','javascript: lockBrand("'+id+'",0)').text('锁定品牌');
                $('#lock2').removeClass('btn-warning').addClass('btn-success');
                $('.lock-link').parent().show();
            }
        }
    })
}

function lockContact(id,s){
    var map = {};
    $.ajax({
        url: $.api.baseNew+"/onlineleasing-customer/api/brandContact/updateStatus?code="+id+"&status="+s,
        type: "POST",
        data: JSON.stringify(map),
        async: false,
        dataType: "json",
        contentType: "application/json",
        beforeSend: function(request) {
            request.setRequestHeader("Login", $.cookie('login'));
            request.setRequestHeader("Authorization", $.cookie('authorization'));
            request.setRequestHeader("Lang", $.cookie('lang'));
            request.setRequestHeader("Source", "onlineleasing");
        },
        success: function (response, status, xhr) {
            if(response.code === 'C0') {
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                }
            }
            
            if(s == 0){
                $('#lock_'+id).removeClass('btn-success').attr({
                    'title' : 'Unlock',
                    'href'  : 'javascript: lockContact("'+id+'",1)'
                });
                $('#lock_'+id).addClass('btn-warning').html('<i class="fa fa-lock"></i>');
            } else {
                $('#lock_'+id).removeClass('btn-warning').attr({
                    'title' : 'Lock',
                    'href'  : 'javascript: lockContact("'+id+'",0)'
                });
                $('#lock_'+id).addClass('btn-success').html('<i class="fa fa-unlock"></i>');
            }
        }
    })
}

function refineDeleteUrl() {
    var url = window.location.href;
    var value = url.substring(url.lastIndexOf('/') + 1);
    value  = value.split("&delete")[0];   
    return value;     
}