$(document).ready(function(){
    if(getURLParameter('page') && getURLParameter('page') >= 1){
        ShowBrands(getURLParameter('page'),50);
    } else {
        ShowBrands(1,50);
    }
});

function ShowBrands(p,c){
    var map = {
        brand : {
            page: p,
            pageCount: c
        }
    };
    $.ajax({
        url: $.api.base+"/brand/findAllByConditionPage",
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
                    
                    var modal = [];
                    modal = $.parseJSON(sessionStorage.getItem("modalities"));
                    
                    $.each(response.data.pagination.details, function(i,v){
                        var modality1,modality2,modality3;
                        
                        if(v.modality_1 !== '' && v.modality_1 !== null){
                            $.each(modal, function(i,u) {
                                $.each(u.list, function(j,w) {
                                    if(w.code == v.modality_1) {
                                        modality1 = w.name.split(' ');
                                        modality1 = modality1[modality1.length-1];
                                    }
                                });
                            });
                        } else {
                            modality1 = "-";
                        }
                        
                        if(v.modality_2 !== '' && v.modality_2 !== null){
                            $.each(modal, function(i,u) {
                                $.each(u.list, function(j,w) {
                                    $.each(w.list, function(k,x) {
                                        if(x.code == v.modality_2) {
                                            modality2 = x.name.split(' ');
                                            modality2 = modality2[modality2.length-1];
                                        }
                                    });
                                });
                            });
                        } else {
                            modality2 = "-";
                        }
                        
                        if(v.modality_3 !== '' && v.modality_3 !== null){
                            $.each(modal, function(i,u) {
                                $.each(u.list, function(j,w) {
                                    $.each(w.list, function(k,x) {
                                        $.each(x.list, function(l,y) {
                                            if(y.code == v.modality_3) {
                                                modality3 = y.name.split(' ');
                                                modality3 = modality3[modality3.length-1];
                                            }
                                        });
                                    });
                                });
                            });
                        } else {
                            modality3 = "-";
                        }
                        
                        $('table tbody').append('<tr onclick=\'redirect("'+v.code+'");\' style="cursor: pointer;"><td>'+v.id+'</td><td>'+v.name+'</td><td>'+modality1+'</td><td>'+modality2+'</td><td>'+modality3+'</td></tr>');
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
  window.location='brand?id='+id;
}