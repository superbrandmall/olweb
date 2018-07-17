$(document).ready(function(){
    if(getURLParameter('page') && getURLParameter('page') >= 1){
        ShowShops(getURLParameter('page'),50);
    } else {
        ShowMalls(1,50);
    }
});

function ShowMalls(p,c){
    var map = {
        mall: {
            page: p,
            pageCount: c
        }
    };
    $.ajax({
        url: $.api.baseNew+"/onlineleasing-admin/api/mall/findAll",
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
                    generatePages(p, pages);
                    
                    $.each(response.data.content, function(i,v){
                        $('table tbody').append('<tr onclick=\'redirect("'+v.mallCode+'");\' style="cursor: pointer;"><td><img src="/'+v.img+'" width="100" /></td><td>'+v.position+'</td><td>'+v.mallName+'</td><td>'+v.location+'</td><td>'+v.phone+'</td></tr>');
                    });
                    
                    if(p == pages){
                        $("#shows").html('显示第'+Math.ceil((p-1)*c+1)+'到'+response.data.totalElements+'条，共'+response.data.totalElements+'条记录');
                    } else {
                        $("#shows").html('显示第'+Math.ceil((p-1)*c+1)+'到'+Math.ceil((p-1)*c+c)+'条，共'+response.data.totalElements+'条记录');
                    }
                }
            } else {
                interpretBusinessCode(response.customerMessage);
            }
        }
    });
}

function redirect(id) {
  window.location='mall?id='+id;
}