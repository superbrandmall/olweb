$(document).ready(function(){
    if(getURLParameter('page') && getURLParameter('page') >= 1){
        ShowBrands(getURLParameter('page'),getURLParameter('items'));
    } else {
        ShowBrands(1,getURLParameter('items'));
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
                    var attribute, brandClass, reputation, statusL, statusS;
                    var updateL = '<a href="#" class="btn btn-sm btn-success" data-tooltip="true" title="Check"><i class="fa fa-eye"></i></a>';
                    var updateS = '<a href="#" class="btn btn-xs btn-success" data-tooltip="true" title="Check"><i class="fa fa-eye"></i></a>';
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
                        
                        switch (v.attribute) {
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
                        
                        switch (v.brandClass) {
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
                        
                        switch (v.reputation) {
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
                        
                        if(v.userCode == $.cookie('login')){
                            updateL = '<a href="#" class="btn btn-sm btn-warning" data-tooltip="true" title="Update"><i class="fa fa-pencil"></i></a>&nbsp;<a href="#" class="btn btn-danger btn-sm delete-asset" data-tooltip="true" data-toggle="modal" data-content="是否确定删除该品牌 ?" data-title="删除品牌" onclick="return false;"><i class="fa fa-trash"></i></a>&nbsp;';
                            updateS = '<a href="#" class="btn btn-xs btn-warning" data-tooltip="true" title="Update"><i class="fa fa-pencil"></i></a>&nbsp;<a href="#" class="btn btn-danger btn-xs delete-asset" data-tooltip="true" data-toggle="modal" data-content="是否确定删除该品牌 ?" data-title="删除品牌" onclick="return false;"><i class="fa fa-trash"></i></a>&nbsp;';
                        }

                        $('#brandsL').append('\
<tr data-index="'+i+'">\n\
<td><a href="/brands-admin/brand?id='+v.code+'">'+v.name+'</a></td>\n\
<td>'+logoL+'</td>\n\
<td>'+modality3+'</td>\n\
<td>'+attribute+'</td>\n\
<td>'+brandClass+'</td>\n\
<td>'+reputation+'</td>\n\
<td>'+statusL+'</td>\n\
<td>'+updateL+'</td>\n\
</tr>');
                        
                        $('#brandsS').append('\
<tr data-index="'+i+'">\n\
<td colspan="65">\n\
<div class="card-views"><div class="card-view"><span class="title">Logo</span><span class="value">'+logoS+'</span></div></div>\n\
<div class="card-views"><div class="card-view"><span class="title">品牌</span><span class="value"><a href="/brands-admin/brand?id='+v.code+'">'+v.name+'</a></span></div></div>\n\
<div class="card-views"><div class="card-view"><span class="title">业态</span><span class="value">'+modality3+'</span></div></div>\n\
<div class="card-views"><div class="card-view"><span class="title">属性</span><span class="value">'+attribute+'</span></div></div>\n\
<div class="card-views"><div class="card-view"><span class="title">价位</span><span class="value">'+brandClass+'</span></div></div>\n\
<div class="card-views"><div class="card-view"><span class="title">口碑</span><span class="value">'+reputation+'</span></div></div>\n\
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

function redirect(id) {
  window.location='brand?id='+id;
}