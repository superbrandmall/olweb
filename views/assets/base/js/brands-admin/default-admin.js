var d = new Date();
var month = d.getMonth()+1;
var year = d.getFullYear();
    
$(document).ready(function(){
    var pendDays = 90;
    
    if ($.cookie('uid') != '' && $.cookie('uid') == 'CUSER180604000001') {
        var items = getURLParameter('items') || $('.bootstrap-table .page-size:first').text();
                    
        if(getURLParameter('page') && getURLParameter('page') >= 1){
            ShowBrandsAdmin(getURLParameter('page'),items);
        } else {
            ShowBrandsAdmin(1,items);
        }
    } else {
        findBrandDashboard(pendDays);
    }
    
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
    
    switch (getURLParameter('items')) {
        case '10':
            $('.page-size').text('10');
            break;
        case '20':
            $('.page-size').text('20');
            break;
        case '30':
            $('.page-size').text('30');
            break;
        case '50':
            $('.page-size').text('50');
            break;
        default:
            $('.page-size').text('10');
            break;
    }
});

function findBrandDashboard(pd) {
    $.ajax({
        url: $.api.baseNew + "/onlineleasing-customer/api/brand/findBrandDashboardByUserCode/?pendDays=" + pd+ "&yyyyMm="+year+(month<10 ? '0'+month : month)+"&userCode=" + $.cookie('login'),
        type: "GET",
        async: false,
        beforeSend: function (request) {
            request.setRequestHeader("Lang", $.cookie('lang'));
            request.setRequestHeader("Source", "onlineleasing");
        },
        complete: function () {},
        success: function (response, status, xhr) {
            if (response.code === 'C0') {
                sessionStorage.setItem("brandSummaryInfos", JSON.stringify(response.data));  
                sessionStorage.setItem("userModalities", JSON.stringify(response.data.userModalities));
                
                if(response.data.userModalities.length > 0){
                    var items = getURLParameter('items') || $('.page-size').text();
                    var url = '';
                    if(response.data.userModalities[0].isComplete == 2){
                        url = 'findAllByUserCodes';
                    } else {
                        url = 'findAllByUserCode2';
                    }
                    
                    if(getURLParameter('page') && getURLParameter('page') >= 1){
                        ShowBrands(getURLParameter('page'),items,url);
                    } else {
                        ShowBrands(1,items,url);
                    }
                }
                
                getBrandDashboard();
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
        }
    });
}

function getBrandDashboard() {    
    var brandSummaryInfos = $.parseJSON(sessionStorage.getItem("brandSummaryInfos"));
    $('#totalBrands').text(numberWithCommas(brandSummaryInfos.total));
    $('#currentWeekNum').text(numberWithCommas(brandSummaryInfos.weekNum));
    $('#currentMonthNum').text(numberWithCommas(brandSummaryInfos.monthNum));
}

function ShowBrands(p,c,u){
    var map = {};
    $.ajax({
        url: $.api.baseNew+"/onlineleasing-customer/api/brand/"+u+"/"+$.cookie('login')+"?page="+(p-1)+"&size="+c+"&sort=id,desc",
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
                    var pages =  response.data.totalPages;
                    generatePages(p, pages, c);
                    
                    var updateL;
                    var updateS;
                    var lockL = '';
                    var lockS = '';
                    $.each(response.data.content, function(i,v){
                        if(v.logo != null){
                            var logoL = '<a href="'+v.logo+'" data-toggle="lightbox" data-type="image"><img src="'+v.logo+'" width="50"></a>';
                            var logoS = '<a href="'+v.logo+'" data-toggle="lightbox" data-type="image"><img src="'+v.logo+'" style="max-height: 30px; width: auto; display: inline-block;" class="img-responsive"></a>';
                        } else {
                            var logoL = '';
                            var logoS = '';
                        }
                        
                        var category = '';
                        $.each($.parseJSON(sessionStorage.getItem("category")), function(h,u) {
                            if(u.code == v.newCategoryCode) {
                                category = u.name;
                            }
                        });
                        
                        if($.cookie('login') == 'CUSER190709000022' || $.cookie('login') == 'CUSER190709000015'){
                            if(v.status == 1){
                                lockL = '<a href=\'javascript: lockBrand("'+v.code+'",0);\' id="lockL_'+v.code+'" class="btn btn-warning btn-sm" title="Lock"><i class="fa fa-lock"></i></a>&nbsp;';
                                lockS = '<a href=\'javascript: lockBrand("'+v.code+'",0);\' id="lockS_'+v.code+'" class="btn btn-warning btn-xs" title="Lock"><i class="fa fa-lock"></i></a>&nbsp;';
                            } else {
                                lockL = '<a href=\'javascript: lockBrand("'+v.code+'",1);\' id="lockL_'+v.code+'" class="btn btn-success btn-sm" title="Unlock"><i class="fa fa-unlock"></i></a>&nbsp;';
                                lockS = '<a href=\'javascript: lockBrand("'+v.code+'",1);\' id="lockS_'+v.code+'" class="btn btn-success btn-xs" title="Unlock"><i class="fa fa-unlock"></i></a>&nbsp;';
                            }
                        }
                        
                        if(v.userCode == $.cookie('login')){
                            updateL = '<a href="/brands-admin/edit-brand?id='+v.code+'" class="btn btn-sm btn-info" data-tooltip="true" title="Update"><i class="fa fa-pencil"></i></a>&nbsp;<a href=\'javascript: deleteBrand("'+v.code+'");\' class="btn btn-danger btn-sm delete-asset" data-tooltip="true" data-toggle="modal" data-content="是否确定删除该品牌 ?" data-title="删除品牌" onclick="return false;"><i class="fa fa-trash"></i></a>&nbsp;'+lockL;
                            updateS = '<a href="/brands-admin/edit-brand?id='+v.code+'" class="btn btn-xs btn-info" data-tooltip="true" title="Update"><i class="fa fa-pencil"></i></a>&nbsp;<a href=\'javascript: deleteBrand("'+v.code+'");\' class="btn btn-danger btn-xs delete-asset" data-tooltip="true" data-toggle="modal" data-content="是否确定删除该品牌 ?" data-title="删除品牌" onclick="return false;"><i class="fa fa-trash"></i></a>&nbsp;'+lockS;
                        } else {
                            updateL = '<a href="/brands-admin/brand?id='+v.code+'" class="btn btn-sm btn-default" data-tooltip="true" title="Check"><i class="fa fa-eye"></i></a>&nbsp;'+lockL;
                            updateS = '<a href="/brands-admin/brand?id='+v.code+'" class="btn btn-xs btn-default" data-tooltip="true" title="Check"><i class="fa fa-eye"></i></a>&nbsp;'+lockS;
                        }

                        $('#brandsL').append('\
<tr data-index="'+i+'">\n\
<td><a href="/brands-admin/brand?id='+v.code+'">'+v.name+'</a></td>\n\
<td>'+logoL+'</td>\n\
<td>'+category+'</td>\n\
<td>'+(v.companyName || '')+'</td>\n\
<td>'+(v.contactName || '')+'</td>\n\
<td>'+(v.title || '')+'</td>\n\
<td>'+(v.contactPhone || '')+'</td>\n\
<td>'+updateL +'</td>\n\
</tr>');
                        
                        $('#brandsS').append('\
<tr data-index="'+i+'">\n\
<td colspan="65">\n\
<div class="card-views"><div class="card-view"><span class="title">Logo</span><span class="value">'+logoS+'</span></div></div>\n\
<div class="card-views"><div class="card-view"><span class="title">品牌</span><span class="value"><a href="/brands-admin/brand?id='+v.code+'">'+v.name+'</a></span></div></div>\n\
<div class="card-views"><div class="card-view"><span class="title">业态</span><span class="value">'+category+'</span></div></div>\n\
<div class="card-views"><div class="card-view"><span class="title">公司</span><span class="value">'+v.companyName+'</span></div></div>\n\
<div class="card-views"><div class="card-view"><span class="title">联系人</span><span class="value">'+v.contactName+'</span></div></div>\n\
<div class="card-views"><div class="card-view"><span class="title">职位</span><span class="value">'+v.title+'</span></div></div>\n\
<div class="card-views"><div class="card-view"><span class="title">电话</span><span class="value">'+v.contactPhone+'</span></div></div>\n\
<div class="card-views"><div class="card-view"><span class="title">操作</span><span class="value">'+updateS+'</span></div></div>\n\
</td></tr>');

                    });
                    
                    if(p == pages){
                        $(".pagination-info").html('显示 '+Math.ceil((p-1)*c+1)+' 到 '+response.data.totalElements+' 行，共 '+response.data.totalElements+'行');
                    } else {
                        $(".pagination-info").html('显示 '+Math.ceil((p-1)*c+1)+' 到 '+Math.ceil((p-1)*c+Number(c))+' 行，共 '+response.data.totalElements+'行');
                    }
                }
            } 
        }
    });
}

function deleteBrand(id) {
    var items = getURLParameter('items') || $('.bootstrap-table .page-size:first').text();
    
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
            if (response.code === 'C0') {
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                }
                
                if(getURLParameter('page') && getURLParameter('page') >= 1){
                window.location.href = '?page'+getURLParameter('page')+'&items='+items+'&delete=succeed';
                } else {
                    window.location.href = '?items='+items+'&delete=succeed';
                }
            } else {
                if(getURLParameter('page') && getURLParameter('page') >= 1){
                    window.location.href = '?page'+getURLParameter('page')+'&items='+items+'&delete=fail';
                } else {
                    window.location.href = '?items='+items+'&delete=fail';
                }
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            if(getURLParameter('page') && getURLParameter('page') >= 1){
                window.location.href = '?page'+getURLParameter('page')+'&items='+items+'&delete=fail';
            } else {
                window.location.href = '?items='+items+'&delete=fail';
            }
        }
    });
}

function lockBrand(id,s){
    var map = {};
    $.ajax({
        url: $.api.baseNew+"/onlineleasing-customer/api/brand/updateStatus?code="+id+"&status="+s,
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
                $('#lockL_'+id+',#lockS_'+id).removeClass('btn-warning').attr({
                    'title' : 'Unlock',
                    'href'  : 'javascript: lockBrand("'+id+'",1)'
                });
                $('#lockL_'+id+',#lockS_'+id).addClass('btn-success').html('<i class="fa fa-unlock"></i>');
            } else {
                $('#lockL_'+id+',#lockS_'+id).removeClass('btn-success').attr({
                    'title' : 'Lock',
                    'href'  : 'javascript: lockBrand("'+id+'",0)'
                });
                $('#lockL_'+id+',#lockS_'+id).addClass('btn-warning').html('<i class="fa fa-lock"></i>');
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


function ShowBrandsAdmin(p,c){
    var map = {};
    $.ajax({
        url: $.api.baseNew+"/onlineleasing-customer/api/brandCompany/findAll?page="+(p-1)+"&size="+c+"&sort=id,desc",
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
                    var pages =  response.data.totalPages;
                    generatePages(p, pages, c);
                    
                    var deleteL;
                    var deleteS;
                    $.each(response.data.content, function(i,v){
                        deleteL = '<a href=\'javascript: deleteBrandAdmin("'+v.code+'");\' class="btn btn-danger btn-sm delete-asset" data-tooltip="true" data-toggle="modal" data-content="是否确定删除该品牌 ?" data-title="删除品牌" onclick="return false;"><i class="fa fa-trash"></i></a>';
                        deleteS = '<a href=\'javascript: deleteBrandAdmin("'+v.code+'");\' class="btn btn-danger btn-xs delete-asset" data-tooltip="true" data-toggle="modal" data-content="是否确定删除该品牌 ?" data-title="删除品牌" onclick="return false;"><i class="fa fa-trash"></i></a>';
                        

                        $('#brandsL').append('\
<tr data-index="'+i+'">\n\
<td><a href="/brands-admin/edit-brand?id='+v.code+'" title="Update">'+v.name+'</a></td>\n\
<td>'+v.bigModality+'</td>\n\
<td>'+v.littleModality+'</td>\n\
<td>'+v.enterYear+'</td>\n\
<td>'+v.city+'</td>\n\
<td>'+v.firstMall+'</td>\n\
<td>'+v.firstMemo+'</td>\n\
<td>'+v.floorCode +'</td>\n\
<td>'+deleteL +'</td>\n\
</tr>');
                        
                        $('#brandsS').append('\
<tr data-index="'+i+'">\n\
<td colspan="65">\n\
<div class="card-views"><div class="card-view"><span class="title">品牌</span><span class="value"><a href="/brands-admin/edit-brand?id='+v.code+'" title="Update">'+v.name+'</a></span></div></div>\n\
<div class="card-views"><div class="card-view"><span class="title">业态</span><span class="value">'+v.bigModality+'</span></div></div>\n\
<div class="card-views"><div class="card-view"><span class="title">细分业态</span><span class="value">'+v.littleModality+'</span></div></div>\n\
<div class="card-views"><div class="card-view"><span class="title">进入年份</span><span class="value">'+v.enterYear+'</span></div></div>\n\
<div class="card-views"><div class="card-view"><span class="title">城市</span><span class="value">'+v.city+'</span></div></div>\n\
<div class="card-views"><div class="card-view"><span class="title">首店进驻Mall</span><span class="value">'+v.firstMall+'</span></div></div>\n\
<div class="card-views"><div class="card-view"><span class="title">首店情况</span><span class="value">'+v.firstMemo+'</span></div></div>\n\
<div class="card-views"><div class="card-view"><span class="title">所在楼层</span><span class="value">'+v.floorCode+'</span></div></div>\n\
<div class="card-views"><div class="card-view"><span class="title">删除</span><span class="value">'+deleteS+'</span></div></div>\n\
</td></tr>');

                    });
                    
                    if(p == pages){
                        $(".pagination-info").html('显示 '+Math.ceil((p-1)*c+1)+' 到 '+response.data.totalElements+' 行，共 '+response.data.totalElements+'行');
                    } else {
                        $(".pagination-info").html('显示 '+Math.ceil((p-1)*c+1)+' 到 '+Math.ceil((p-1)*c+Number(c))+' 行，共 '+response.data.totalElements+'行');
                    }
                }
            } 
        }
    });
}

function deleteBrandAdmin(id) {
    var items = getURLParameter('items') || $('.bootstrap-table .page-size:first').text();
    var map = {};
    $.ajax({
        url: $.api.baseNew + "/onlineleasing-customer/api/brandCompany/deleteBrand?code=" + id,
        type: "POST",
        data: JSON.stringify(map),
        async: false,
        dataType: "json",
        contentType: "application/json",
        beforeSend: function (request) {
            request.setRequestHeader("Login", $.cookie('login'));
            request.setRequestHeader("Authorization", $.cookie('authorization'));
            request.setRequestHeader("Lang", $.cookie('lang'));
            request.setRequestHeader("Source", "onlineleasing");
        },
        complete: function () {},
        success: function (response, status, xhr) {
            if (response.code === 'C0') {
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                }
                
                if(getURLParameter('page') && getURLParameter('page') >= 1){
                    window.location.href = '?page'+getURLParameter('page')+'&items='+items+'&delete=succeed';
                } else {
                    window.location.href = '?items='+items+'&delete=succeed';
                }
            } else {
                if(getURLParameter('page') && getURLParameter('page') >= 1){
                    window.location.href = '?page'+getURLParameter('page')+'&items='+items+'&delete=fail';
                } else {
                    window.location.href = '?items='+items+'&delete=fail';
                }
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            if(getURLParameter('page') && getURLParameter('page') >= 1){
                window.location.href = '?page'+getURLParameter('page')+'&items='+items+'&delete=fail';
            } else {
                window.location.href = '?items='+items+'&delete=fail';
            }
        }
    });
}