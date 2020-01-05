$(document).ready(function(){
    var items = getURLParameter('items') || $('.page-size').first().text();
    
    /*if(getURLParameter('page') && getURLParameter('page') >= 1){
        ShowBrands(getURLParameter('page'),items);
    } else {
        ShowBrands(1,items);
    }*/
                    
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
        url: $.api.baseNew+"/onlineleasing-customer/api/brand/findAll?page="+(p-1)+"&size="+c+"&sort=id,desc",
        type: "GET",
        async: false,
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
                
                /*if(response.data.length > 0) { 
                    var pages =  response.data.totalPages;
                    generatePages(p, pages, c);
                    
                    $.each(response.data, function(i,v){   
                        var category = '';
                        $.each($.parseJSON(sessionStorage.getItem("category")), function(h,u) {
                            if(u.code == v.newCategoryCode) {
                                category = u.name;
                            }
                        });
                        
                        $('#brandsL').append('\
<tr data-index="'+i+'">\n\
<td><a href="/brands-admin/brand?id='+v.code+'">'+v.name+'</a></td>\n\
<td>'+logoL+'</td>\n\
<td>'+category+'</td>\n\
<td>'+user+'</td>\n\
<td>'+updateL+addContactL+'</td>\n\
</tr>');
                        
                        $('#brandsS').append('\
<tr data-index="'+i+'">\n\
<td colspan="65">\n\
<div class="card-views"><div class="card-view"><span class="title">Logo</span><span class="value">'+logoS+'</span></div></div>\n\
<div class="card-views"><div class="card-view"><span class="title">品牌</span><span class="value"><a href="/brands-admin/brand?id='+v.code+'">'+v.name+'</a></span></div></div>\n\
<div class="card-views"><div class="card-view"><span class="title">业态</span><span class="value">'+category+'</span></div></div>\n\
<div class="card-views"><div class="card-view"><span class="title">所有人</span><span class="value">'+user+'</span></div></div>\n\
<div class="card-views"><div class="card-view"><span class="title">操作</span><span class="value">'+updateS+addContactS+'</span></div></div>\n\
</td></tr>');

                    });
                    
                    if(p == pages){
                        $(".pagination-info").html('显示 '+Math.ceil((p-1)*c+1)+' 到 '+response.data.totalElements+' 行，共 '+response.data.totalElements+'行');
                    } else {
                        $(".pagination-info").html('显示 '+Math.ceil((p-1)*c+1)+' 到 '+Math.ceil((p-1)*c+Number(c))+' 行，共 '+response.data.totalElements+'行');
                    }
                }*/
            } 
        }
    });
}