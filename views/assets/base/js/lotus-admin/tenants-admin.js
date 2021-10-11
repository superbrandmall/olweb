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
        url: $.api.baseNew+"/onlineleasing-customer/api/tenant/lotus/findAll?page="+(p-1)+"&size="+c+"&sort=id,desc",
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
                        var tianyancha = '';
                        if(v.uscc != '' && v.uscc != null){
                            tianyancha = ' <small><a href="javascript: void(0)">[天眼查]</a></small>';
                        }
                        
                        $('#tenantsL').append('\
                        <tr data-index="'+i+'">\n\
                        <td>'+v.name+''+tianyancha+'</td>\n\
                        <td>'+(v.type == 1? '个人' : '公司')+'</td>\n\
                        <td>'+v.businessScope+'</td>\n\
                        <td>'+(v.capital == '' ? '' : numberWithCommas(v.capital) + '元')+'</td>\n\
                        <td>'+v.uscc+'</td>\n\
                        </tr>');
                        
                        $('#tenantsS').append('\
<tr data-index="'+i+'">\n\
<td colspan="65">\n\
<div class="card-views"><div class="card-view"><span class="title">品牌</span><span class="value">'+v.name+''+tianyancha+'</span></div></div>\n\
<div class="card-views"><div class="card-view"><span class="title">类型</span><span class="value">'+(v.type == 1? '个人' : '公司')+'</span></div></div>\n\
<div class="card-views"><div class="card-view"><span class="title">行业</span><span class="value">'+v.businessScope+'</span></div></div>\n\
<div class="card-views"><div class="card-view"><span class="title">注册资本</span><span class="value">'+(v.capital == '' ? '' : numberWithCommas(v.capital) + '元')+'</span></div></div>\n\
<div class="card-views"><div class="card-view"><span class="title">组织机构代码证</span><span class="value">'+v.uscc+'</span></div></div>\n\
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