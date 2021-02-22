$(document).ready(function(){
    ShowMallList();
    
    if($.cookie('shopsAdminShopName') && $.cookie('shopsAdminShopName') != null && $.cookie('shopsAdminShopName') != '') {
        $('#shop_name').val($.cookie('shopsAdminShopName'));
    }
    if($.cookie('shopsAdminUnit') && $.cookie('shopsAdminUnit') != null && $.cookie('shopsAdminUnit') != '') {
        $('#unit').val($.cookie('shopsAdminUnit'));
    }
    if($.cookie('shopsAdminState') && $.cookie('shopsAdminState') != null && $.cookie('shopsAdminState') != '') {
        $('#state option[value="'+$.cookie('shopsAdminState')+'"]').prop("selected", true);
    }
    if($.cookie('shopsAdminMallCode') && $.cookie('shopsAdminMallCode') != null && $.cookie('shopsAdminMallCode') != '') {
        $('#mall_list option[value="'+$.cookie('shopsAdminMallCode')+'"]').prop("selected", true);
    }
    if($.cookie('shopsAdminIsSync') && $.cookie('shopsAdminIsSync') != null && $.cookie('shopsAdminIsSync') != '') {
        $('#is_sync option[value="'+$.cookie('shopsAdminIsSync')+'"]').prop("selected", true);
    }
    if($.cookie('shopsAdminShopState') && $.cookie('shopsAdminShopState') != null && $.cookie('shopsAdminShopState') != '') {
        $('#shop_state option[value="'+$.cookie('shopsAdminShopState')+'"]').prop("selected", true);
    }
    
    if(getURLParameter('page') && getURLParameter('page') >= 1){
        ShowShops(getURLParameter('page'),50);  
    } else {
        ShowShops(1,50);
    }
    
    $('#search').click(function(e) {
        e.preventDefault();
        $.cookie('shopsAdminShopName',$('#shop_name').val());
        $.cookie('shopsAdminUnit',$('#unit').val());
        $.cookie('shopsAdminState',$('#state').children('option:selected').val());
        $.cookie('shopsAdminMallCode',$('#mall_list').children('option:selected').val());
        $.cookie('shopsAdminIsSync',$('#is_sync').children('option:selected').val());
        $.cookie('shopsAdminShopState',$('#shop_state').children('option:selected').val());
        
        ShowShops(1,50);
    });
    
});

function ShowMallList(){
    $('#mall_list').html('');
    $.each($.parseJSON(sessionStorage.getItem("malls")), function(j,w) {
        var selected = ''; 
        if(j == 0){
            selected = 'selected = "selected"';
        }
        $('#mall_list').append('<option value="'+w.mallCode+'" '+selected+'>'+w.mallName+'</option>');
    });
}

function ShowShops(p,c){
    var pg = p-1;
    var map = {
        unit: $('#unit').val() || null,
        shopName: $('#shop_name').val() || null,
        mallCode: $('#mall_list').val(),
        isSync: $('#is_sync').val() || null,
        hdState: 'using',
        state: $('#state').val() || null,
        shopState: $('#shop_state').val() || null
    };
    $.ajax({
        url: $.api.baseNew+"/onlineleasing-admin/api/shop/findAll?size="+c+"&page="+pg+"&sort=code,asc",
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
                        
                        var state, isLock, isSync;
                        switch(v.shopState){
                            case 1:
                                state = "<div class='badge badge-danger'>空铺</div>";
                                break;
                            case 2:
                                state = "<div class='badge badge-warning'>待租</div>";
                                break;
                            case 0:
                                state = "<div class='badge badge-success'>在租</div>";
                                break;
                            default:
                                state = "<div class='badge badge-success'>在租</div>";
                                break;
                        }
                        
                        v.state === 1? isLock = "<div class='badge badge-info'>未锁定</div>" : isLock = "<div class='badge badge-warning'>锁定</div>";
                        v.isSync === 1? isSync = "<div class='badge badge-info'>同步</div>" : isSync = "<div class='badge badge-warning'>不同步</div>";
                        
                        $('table tbody').append('<tr onclick=\'redirect("'+v.code+'");\' style="cursor: pointer;"><td>'+v.unit+'</td><td>'+isLock+'</td><td>'+isSync+'</td><td>'+v.shopName+'</td><td>'+mallName+'</td><td>'+floorName+'</td><td>'+v.area+'m<sup>2</sup></td><td>'+v.subType+'</td><td>'+modality+'</td><td>'+moving+'</td><td>'+state+'</td></tr>');
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