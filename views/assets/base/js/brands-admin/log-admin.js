$(document).ready(function(){
    var items = getURLParameter('items') || $('.page-size').first().text();
    if(getURLParameter('page') && getURLParameter('page') >= 1){
        findAllLogs(getURLParameter('page'),items);
    } else {
        findAllLogs(1,items);
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

function findAllLogs(p,c){
    var map = {};
    $.ajax({
        url: $.api.baseNew+"/onlineleasing-customer/api/log/findAll?page="+(p-1)+"&size="+c+"&sort=id,desc",
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
                    
                    var user = '管理员';
                    $.each(response.data.content, function(i,v){
                        $.each($.parseJSON(sessionStorage.getItem("users")), function(h,u) {
                            if(u.code == v.userCode) {
                                user = u.name;
                            }
                        });
                            
                        $('#logL').append('\
<tr data-index="'+i+'">\n\
<td>'+v.changeDate+'</td>\n\
<td>'+user+'</td>\n\
<td>'+v.type+'</td>\n\
<td>'+v.brandCode+'</td>\n\
<td>'+v.changeContent+'</td>\n\
</tr>');
                        
                        $('#logS').append('\
<tr data-index="'+i+'">\n\
<td colspan="65">\n\
<div class="card-views"><div class="card-view"><span class="title">日期</span><span class="value">'+v.changeDate+'</span></div></div>\n\
<div class="card-views"><div class="card-view"><span class="title">用户</span><span class="value"'+user+'</span></div></div>\n\
<div class="card-views"><div class="card-view"><span class="title">类型</span><span class="value">'+v.type+'</span></div></div>\n\
<div class="card-views"><div class="card-view"><span class="title">品牌</span><span class="value">'+v.brandCode+'</span></div></div>\n\
<div class="card-views"><div class="card-view"><span class="title">操作</span><span class="value">'+v.changeContent+'</span></div></div>\n\
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