$(document).ready(function(){
    if(getURLParameter('page') && getURLParameter('page') >= 1){
        ShowShops(getURLParameter('page'),50);
    } else {
        ShowShops(1,50);
    }
});

function ShowShops(p,c){
    var pg = p-1;
    var map = {
        mallName: "正大乐城宝山购物中心"
    };
    $.ajax({
        url: $.api.baseNew+"/onlineleasing-admin/api/shop/findAll?size=50&page="+pg+"&sort=code,asc",
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
                    
                    var modal = [];
                    modal = $.parseJSON(sessionStorage.getItem("modalities"));
                    
                    /*var modalities = [];
                    $.each(modal, function(i,u) {
                        $.each(u.children, function(j,w) {
                            $.each(w.children, function(k,x) {
                                $.each(x.children, function(l,y) {
                                    modalities.push(y);
                                });
                            });
                        });
                    });*/
                    
                    $.each(response.data.content, function(i,v){
                        /*var modality;                        
                        if(v.modality !== '' && v.modality !== null){
                            $.each(modalities, function(k,x) {
                                if(x.code == v.modality) {
                                    modality = x.name;
                                }
                            });
                        } else {
                            modality = "-";
                        }*/
                        
                        var state;
                        switch(v.shopState){
                            case 1:
                                state = "<button type='button' class='btn btn-success'>空铺</button>";
                                break;
                            case 2:
                                state = "<button type='button' class='btn btn-danger'>待租</button>";
                                break;
                            case 0:
                                state = "<button type='button' class='btn btn-warning'>在租</button>";
                                break;
                            default:
                                state = "<button type='button' class='btn btn-warning'>在租</button>";
                                break;
                        }
                        
                        $('table tbody').append('<tr onclick=\'redirect("'+v.code+'");\' style="cursor: pointer;"><td>'+v.code+'</td><td>'+v.shopName+'</td><td>'+v.buildingName+'</td><td>'+v.floorName+'</td><td>'+v.area+'m<sup>2</sup></td><td>'+v.modality+'</td><td>'+v.contractExpireDate+'</td><td>'+state+'</td><td></td></tr>');
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
  window.location='shop?id='+id;
}

/*function IncrDate(date_str){
    if(date_str){
        var parts = date_str.split("-");
        var dt = new Date(
          parseInt(parts[0], 10),      // year
          parseInt(parts[1], 10) - 1,  // month (starts with 0)
          parseInt(parts[2], 10)       // date
        );
        dt.setDate(dt.getDate() + 1);
        parts[0] = "" + dt.getFullYear();
        parts[1] = "" + (dt.getMonth() + 1);
        if (parts[1].length < 2) {
          parts[1] = "0" + parts[1];
        }
        parts[2] = "" + dt.getDate();
        if (parts[2].length < 2) {
          parts[2] = "0" + parts[2];
        }
        return parts.join("-");
    } else {
        return '';
    }
}*/