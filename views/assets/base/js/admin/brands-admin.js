$(document).ready(function(){
    if(getURLParameter('page') && getURLParameter('page') >= 1){
        ShowBrands(getURLParameter('page'),50);
    } else {
        ShowBrands(1,50);
    }
});

function ShowBrands(p,c){
    var pg = p-1;
    var map = {};
    $.ajax({
        url: $.api.baseNew+"/onlineleasing-admin/api/brand/findAll?size="+c+"&page="+pg+"&sort=code,asc",
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
                $('table tbody').html('');
                $('.pagination').html('');

                if(response.data.content.length > 0) { 
                    var pages =  response.data.totalPages;
                    generatePages(p, pages);
                    
                    $.each(response.data.content, function(i,v){
                        var modality1,modality2,modality3;
                        if(v.modality_1 !== '' && v.modality_1 !== null){
                            $.each($.parseJSON(sessionStorage.getItem("modalities")), function(i,u) {
                                $.each(u.children, function(j,w) {
                                    if(w.code == v.modality_1) {
                                        modality1 = w.name || '-';
                                        return false;
                                    }
                                });
                            });
                        } else {
                            modality1 = "-";
                        }
                        
                        if(v.modality_2 !== '' && v.modality_2 !== null){
                            $.each($.parseJSON(sessionStorage.getItem("modalities")), function(i,u) {
                                $.each(u.children, function(j,w) {
                                    $.each(w.children, function(k,x) {
                                        if(x.code == v.modality_2) {
                                            modality2 = x.name || '-';
                                            return false;
                                        }
                                    });
                                });
                            });
                        } else {
                            modality2 = "-";
                        }
                        
                        if(v.modality_3 !== '' && v.modality_3 !== null){
                            $.each($.parseJSON(sessionStorage.getItem("modalities")), function(i,u) {
                                $.each(u.children, function(j,w) {
                                    $.each(w.children, function(k,x) {
                                        $.each(x.children, function(l,y) {
                                            if(y.code == v.modality_3) {
                                                modality3 = y.name || '-';
                                                return false;
                                            }
                                        });
                                    });
                                });
                            });
                        } else {
                            modality3 = "-";
                        }
                        
                        $('table tbody').append('<tr onclick=\'redirect("'+v.code+'");\' style="cursor: pointer;"><td>'+v.code+'</td><td>'+v.name+'</td><td>'+modality1+'</td><td>'+modality2+'</td><td>'+modality3+'</td></tr>');
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
  window.location='brand?id='+id;
}