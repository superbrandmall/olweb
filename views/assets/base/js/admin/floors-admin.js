$(document).ready(function(){
    if(getURLParameter('page') && getURLParameter('page') >= 1){
        ShowFloors(getURLParameter('page'),50);
    } else {
        ShowFloors(1,50);
    }
});

function ShowFloors(p,c){
    var map = {
        floor: {
            page: p,
            pageCount: c
        }
    };
    $.ajax({
        url: $.api.base+"/floor/findAllByConditionPage",
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
                    
                    $.each(response.data.pagination.details, function(i,v){
                        $('table tbody').append('<tr onclick=\'redirect("'+v.code+'");\' style="cursor: pointer;"><td>'+v.code+'</td><td>'+v.floorName+'</td><td>'+v.description+'</td><td>'+v.grossFloorArea+'m<sup>2</sup></td><td>'+v.leasingArea+'m<sup>2</sup></td></tr>');
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
  window.location='floor?id='+id;
}