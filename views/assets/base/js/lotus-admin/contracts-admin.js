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
        ShowContracts(getURLParameter('page'),items);
    } else {
        ShowContracts(1,items);
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

function ShowContracts(p,c){
    $.ajax({
        url: $.api.baseNew+"/onlineleasing-customer/api/user/contract/lotus/findAllByMallCode?mallCode="+$.cookie('mallSelected').split(':::')[1]+"&page="+(p-1)+"&size="+c+"&sort=id,desc",
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

                        
                        $('#contractsL').append('\
                        <tr data-index="'+i+'">\n\
                        <td>'+(v.contractName || '无')+'</td>\n\
                        <td>'+v.contractType+'</td>\n\
                        <td>'+v.contractStatus+'</td>\n\
                        <td>'+v.unitCode+'</td>\n\
                        <td>'+v.unitArea+'</td>\n\
                        </tr>');
                        
                        $('#contractsS').append('\
<tr data-index="'+i+'">\n\
<td colspan="65">\n\
<div class="card-views"><div class="card-view"><span class="title">品牌名称</span><span class="value">'+(v.contractName || '无')+'</span></div></div>\n\
<div class="card-views"><div class="card-view"><span class="title">合同类型</span><span class="value">'+v.contractType+'</span></div></div>\n\
<div class="card-views"><div class="card-view"><span class="title">签约情况</span><span class="value">'+v.contractStatus+'</span></div></div>\n\
<div class="card-views"><div class="card-view"><span class="title">店铺位置代码</span><span class="value">'+v.unitCode+'</span></div></div>\n\
<div class="card-views"><div class="card-view"><span class="title">合同面积㎡</span><span class="value">'+v.unitArea+'</span></div></div>\n\
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