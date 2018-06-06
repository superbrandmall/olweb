$(document).ready(function(){
    if(getURLParameter('page') && getURLParameter('page') >= 1){
        ShowUsers(getURLParameter('page'),50);
    } else {
        ShowUsers(1,50);
    }
});

function ShowUsers(p,c){
    var map = {
        user: {
            page: p,
            pageCount: c
        }
    };
    $.ajax({
        url: $.api.base+"/user/findAllByConditionPage",
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
                
                if(response.data.pagination.details.length > 0) {
                    var pages =  Math.ceil(response.data.pagination.totalCount / c);
                    generatePages(p, pages);
                    
                    var type;
                    $.each(response.data.pagination.details, function(i,v){
                        switch(v.type){
                            case 1:
                                type = "系统管理员";
                                break;
                            case 2:
                                type = "普通用户";
                                break;
                            default:
                                type = "";
                                break;
                        }
                        
                        $('table tbody').append('<tr onclick=\'redirect("'+v.code+'");\' style="cursor: pointer;"><td>'+v.code+'</td><td>'+v.merchantCode+'</td><td>'+v.email+'</td><td>'+v.mobile+'</td><td>'+type+'</td><td>'+v.lastLogin+'</td></tr>');
                    });
                    
                    if(p == pages){
                        $("#shows").html('显示第'+Math.ceil((p-1)*c+1)+'到'+response.data.pagination.totalCount+'条，共'+response.data.pagination.totalCount+'条记录');
                    } else {
                        $("#shows").html('显示第'+Math.ceil((p-1)*c+1)+'到'+Math.ceil((p-1)*c+c)+'条，共'+response.data.pagination.totalCount+'条记录');
                    }
                }
            } 
        }
    });
}

function redirect(id) {
  window.location='user?id='+id;
}