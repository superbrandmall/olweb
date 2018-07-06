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
                    
                    var modality,mallName,floorName,moving;
                    $.each(response.data.content, function(i,v){
                        if(v.modality !== '' && v.modality !== null){
                            $.each($.parseJSON(sessionStorage.getItem("modalities")), function(i,u) {
                                $.each(u.children, function(j,w) {
                                    $.each(w.children, function(k,x) {
                                        $.each(x.children, function(l,y) {
                                            if(y.code == v.modality) {
                                                modality = y.name || '-';
                                                return false;
                                            }
                                        });
                                    });
                                });
                            });
                        } else {
                            modality = "-";
                        }
                        
                        $.each($.parseJSON(sessionStorage.getItem("malls")), function(j,w) {
                            if(w.mallCode == v.mallCode) {
                                mallName = w.mallName;
                                return false;
                            }
                        });
                        
                        $.each($.parseJSON(sessionStorage.getItem("floors")), function(j,w) {
                            if(w.floorCode == v.floorCode) {
                                floorName = w.description;
                                return false;
                            }
                        });
                        
                        if(v.shopState === 1) { // 空铺
                            moving = IncrMonth(date);
                        } else { // 非空铺
                            var contractExpire = new Date();
                            contractExpire.setTime(v.contractExpireDate);
                            var contractExpireYear = contractExpire.getFullYear('yyyy');
                            var contractExpireMonth = contractExpire.getMonth('mm')+1;
                            var contractExpireDate = contractExpire.getDate('dd');

                            if(IncrMonth(date) <= (contractExpireYear+'-'+contractExpireMonth+'-'+contractExpireDate)) {
                                moving = IncrDate(contractExpireYear+'-'+contractExpireMonth+'-'+contractExpireDate);
                            } else {
                                moving = IncrMonth(contractExpireYear+'-'+contractExpireMonth+'-'+contractExpireDate);
                            }
                        }
                        
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
                        
                        $('table tbody').append('<tr onclick=\'redirect("'+v.code+'");\' style="cursor: pointer;"><td>'+v.code+'</td><td>'+v.shopName+'</td><td>'+mallName+'</td><td>'+floorName+'</td><td>'+v.area+'m<sup>2</sup></td><td>'+modality+'</td><td>'+moving+'</td><td>'+state+'</td><td></td></tr>');
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
  window.location='shop?id='+id;
}