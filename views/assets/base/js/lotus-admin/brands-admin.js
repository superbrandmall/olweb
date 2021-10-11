$(document).ready(function(){
    if(getURLParameter('s')) {
        switch (getURLParameter('s')) {
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
            window.history.pushState("object or string", "Title", "/lotus-admin/"+refineCreateUrl() );
        },1000);
    }
    
    var items = getURLParameter('items') || $('.page-size').first().text();
    if(getURLParameter('page') && getURLParameter('page') >= 1){
        ShowBrands(getURLParameter('page'),items);
    } else {
        ShowBrands(1,items);
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
    $.ajax({
        url: $.api.baseNew+"/onlineleasing-customer/api/brand/lotus/findAll?page="+(p-1)+"&size="+c+"&sort=id,desc",
        type: "GET",
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

                    $.each(response.data.content, function(i,v){
                        $('#brandsL').append('\
                        <tr data-index="'+i+'">\n\
                        <td>'+v.name+'</td>\n\
                        <td>'+v.modality1+'</td>\n\
                        <td>'+v.modality2+'</td>\n\
                        <td>'+v.modality3+'</td>\n\
                        <td>'+v.contactName+'</td>\n\
                        <td>'+v.contactPhone+'</td>\n\
                        </tr>');
                        
                        $('#brandsS').append('\
<tr data-index="'+i+'">\n\
<td colspan="65">\n\
<div class="card-views"><div class="card-view"><span class="title">品牌</span><span class="value">'+v.name+'</span></div></div>\n\
<div class="card-views"><div class="card-view"><span class="title">一级业态</span><span class="value">'+v.modality1+'</span></div></div>\n\
<div class="card-views"><div class="card-view"><span class="title">一级业态</span><span class="value">'+v.modality2+'</span></div></div>\n\
<div class="card-views"><div class="card-view"><span class="title">一级业态</span><span class="value">'+v.modality3+'</span></div></div>\n\
<div class="card-views"><div class="card-view"><span class="title">联系人</span><span class="value">'+v.contactName+'</span></div></div>\n\
<div class="card-views"><div class="card-view"><span class="title">联系电话</span><span class="value">'+v.contactPhone+'</span></div></div>\n\
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