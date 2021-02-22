$(document).ready(function(){
    ShowBuildings(1,50);
});

function ShowBuildings(p,c){
    var pg = p-1;
    var map = {};
    $.ajax({
        url: $.api.baseNew+"/onlineleasing-admin/api/building/findAll?size="+c+"&page="+pg+"&sort=code,asc",
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
                        $('table tbody').append('<tr onclick=\'redirect("'+v.buildingCode+'");\' style="cursor: pointer;"><td>'+v.buildingCode+'</td><td>'+v.mallCode+'</td><td>'+v.buildingName+'</td><td>'+v.grossFloorArea+'m<sup>2</sup></td><td>'+v.leasingArea+'m<sup>2</sup></td></tr>');
                    });
                    
                    if(p == pages){
                        $("#shows").html('显示第'+Math.ceil((p-1)*c+1)+'到'+response.data.totalElements+'条，共'+response.data.totalElements+'条记录');
                    } else {
                        $("#shows").html('显示第'+Math.ceil((p-1)*c+1)+'到'+Math.ceil((p-1)*c+c)+'条，共'+response.data.totalElements+'条记录');
                    }
                }
            } 
        }
    });
}

function redirect(id) {
  window.location='building?id='+id;
}