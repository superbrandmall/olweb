$(document).ready(function(){
    if(getURLParameter('page') && getURLParameter('page') >= 1){
        ShowBrands(getURLParameter('page'),getURLParameter('items'));
    } else {
        ShowBrands(1,getURLParameter('items'));
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

function ShowBrands(p,c){
    var map = {};
    $.ajax({
        url: $.api.baseNew+"/onlineleasing-customer/api/brand/findAllByUserCodes/"+$.cookie('login')+"?page="+(p-1)+"&size="+c+"&sort=id,desc",
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
                    var itm = getURLParameter('items');
                    generatePages(p, pages, itm);
                    
                    var modality3 = '';
                    var statusL, statusS;
                    var updateL;
                    var updateS;
                    $.each(response.data.content, function(i,v){
                        if(v.logo != null){
                            var logoL = '<a href="'+v.logo+'" data-toggle="lightbox" data-type="image"><img src="'+v.logo+'" width="50"></a>';
                            var logoS = '<a href="'+v.logo+'" data-toggle="lightbox" data-type="image"><img src="'+v.logo+'" style="max-height: 30px; width: auto; display: inline-block;" class="img-responsive"></a>';
                        } else {
                            var logoL = '';
                            var logoS = '';
                        }
                        
                        $.each($.parseJSON(sessionStorage.getItem("modalities")), function(h,u) {
                            $.each(u.children, function(j,w) {
                                $.each(w.children, function(k,x) {
                                    $.each(x.children, function(l,y) {
                                        if(y.code == v.modality3) {
                                            modality3 = y.name;
                                        }
                                    });
                                });
                            });
                        });
                        
                        switch (v.status) {
                            case 0:
                                statusL = '<span class="btn btn-sm btn-default">新增加</span>';
                                statusS = '<span class="btn btn-xs btn-default">新增加</span>';
                                break;
                            case 3:
                                statusL = '<span class="btn btn-sm btn-info">已生效</span>';
                                statusS = '<span class="btn btn-xs btn-info">已生效</span>';
                                break;
                            default:
                                statusL = '<span class="btn btn-sm btn-default">新增加</span>';
                                statusS = '<span class="btn btn-xs btn-default">新增加</span>';
                                break;
                        }
                        
                        updateL = '<a href="/brands-admin/brand?id='+v.code+'" class="btn btn-sm btn-success" data-tooltip="true" title="Check"><i class="fa fa-eye"></i></a>';
                        updateS = '<a href="/brands-admin/brand?id='+v.code+'" class="btn btn-xs btn-success" data-tooltip="true" title="Check"><i class="fa fa-eye"></i></a>';
                        
                        if(v.userCode == $.cookie('login')){
                            updateL = '<a href="/brands-admin/edit-brand?id='+v.code+'" class="btn btn-sm btn-warning" data-tooltip="true" title="Update"><i class="fa fa-pencil"></i></a>&nbsp;<a href=\'javascript: deleteBrand("'+v.code+'");\' class="btn btn-danger btn-sm delete-asset" data-tooltip="true" data-toggle="modal" data-content="是否确定删除该品牌 ?" data-title="删除品牌" onclick="return false;"><i class="fa fa-trash"></i></a>&nbsp;';
                            updateS = '<a href="/brands-admin/edit-brand?id='+v.code+'" class="btn btn-xs btn-warning" data-tooltip="true" title="Update"><i class="fa fa-pencil"></i></a>&nbsp;<a href="\'javascript: deleteBrand("'+v.code+'");\' class="btn btn-danger btn-xs delete-asset" data-tooltip="true" data-toggle="modal" data-content="是否确定删除该品牌 ?" data-title="删除品牌" onclick="return false;"><i class="fa fa-trash"></i></a>&nbsp;';
                        }

                        $('#brandsL').append('\
<tr data-index="'+i+'">\n\
<td><a href="/brands-admin/brand?id='+v.code+'">'+v.name+'</a></td>\n\
<td>'+logoL+'</td>\n\
<td>'+modality3+'</td>\n\
<td>'+v.companyName+'</td>\n\
<td>'+v.contactName+'</td>\n\
<td>'+v.title+'</td>\n\
<td>'+v.contactPhone+'</td>\n\
<td>'+statusL+'</td>\n\
<td>'+updateL+'</td>\n\
</tr>');
                        
                        $('#brandsS').append('\
<tr data-index="'+i+'">\n\
<td colspan="65">\n\
<div class="card-views"><div class="card-view"><span class="title">Logo</span><span class="value">'+logoS+'</span></div></div>\n\
<div class="card-views"><div class="card-view"><span class="title">品牌</span><span class="value"><a href="/brands-admin/brand?id='+v.code+'">'+v.name+'</a></span></div></div>\n\
<div class="card-views"><div class="card-view"><span class="title">业态</span><span class="value">'+modality3+'</span></div></div>\n\
<div class="card-views"><div class="card-view"><span class="title">公司</span><span class="value">'+v.companyName+'</span></div></div>\n\
<div class="card-views"><div class="card-view"><span class="title">联系人</span><span class="value">'+v.contactName+'</span></div></div>\n\
<div class="card-views"><div class="card-view"><span class="title">职位</span><span class="value">'+v.title+'</span></div></div>\n\
<div class="card-views"><div class="card-view"><span class="title">电话</span><span class="value">'+v.contactPhone+'</span></div></div>\n\
<div class="card-views"><div class="card-view"><span class="title">状态</span><span class="value" style="display: inline-block; margin-bottom: 2px;">'+statusS+'</span></div></div>\n\
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
    $.ajax({
        url: $.api.baseNew + "/onlineleasing-customer/api/brand/delete/?code=" + id,
        type: "DELETE",
        async: false,
        beforeSend: function (request) {
            request.setRequestHeader("Lang", $.cookie('lang'));
            request.setRequestHeader("Source", "onlineleasing");
        },
        complete: function () {},
        success: function (response, status, xhr) {
            if (response.code === 'C0') {
                if(getURLParameter('page') && getURLParameter('page') >= 1){
                window.location.href = 'brands?page'+getURLParameter('page')+'&items='+getURLParameter('items')+'&delete=succeed';
            } else {
                window.location.href = 'brands?items='+getURLParameter('items')+'&delete=succeed';
            }
            } else {
                if(getURLParameter('page') && getURLParameter('page') >= 1){
                    window.location.href = 'brands?page'+getURLParameter('page')+'&items='+getURLParameter('items')+'&delete=fail';
                } else {
                    window.location.href = 'brands?items='+getURLParameter('items')+'&delete=fail';
                }
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            if(getURLParameter('page') && getURLParameter('page') >= 1){
                window.location.href = 'brands?page'+getURLParameter('page')+'&items='+getURLParameter('items')+'&delete=fail';
            } else {
                window.location.href = 'brands?items='+getURLParameter('items')+'&delete=fail';
            }
        }
    });
}