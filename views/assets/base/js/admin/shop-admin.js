$.shop = '';
$.coords = '';
$.images = '';

$(document).ready(function(){
    if(getURLParameter('s')) {
        switch (getURLParameter('s')) {
            case "update-succeed":
                $('#ui_succeed').show().delay(10000).hide(0);
                $('html, body').animate({
                    scrollTop: $('#ui_succeed').offset().top
                }, 0);
                break;
            default:
        }
        setTimeout(function () {
            window.history.pushState("object or string", "Title", "/admin/"+refineOfferUrl() );
        },1000);
    }
    
    GetShopInfo();
    
    $('#submit').click(function(){
        SaveShopInfo();
    });
    
    $('#add_images').on("change", function () {
        var formData = new FormData();
        formData.append('vo.userCode',  $.cookie('login'));
        formData.append('vo.containerName', 'test');
        formData.append('vo.prefix', $.cookie('login')+'/photo/shops');
        for(var i=0;i<$('#add_images')[0].files.length;i++){
            formData.append('files', $('#add_images')[0].files[i]);
        }
        $.ajax({
            type: "POST",
            url: $.api.baseNew+"/zuul/onlineleasing-file/api/upload/multi",
            data: formData,
            async: false,
            cache: false,
            processData: false,
            contentType: false,
            beforeSend: function(request) {
                $('#loader').show();
                request.setRequestHeader("Login", $.cookie('login'));
                request.setRequestHeader("Authorization", $.cookie('authorization'));
                request.setRequestHeader("Lang", $.cookie('lang'));
                request.setRequestHeader("Source", "onlineleasing");
            },
            complete: function(){},
            success: function(response, status, xhr) {
                $('#loader').hide();
                interpretBusinessCode(response.code);
                
                if(response.code === 'C0') {
                    $.each(response.data, function(i,v) {
                        var options = ''; 
                        for (var index=0; index<($.images.length + response.data.length); index++) {
                            options += '<option value="'+index+'" class="position_'+index+'">位置 '+index+'</option>';
                        }
                    
                        $('#images').append('\
<div class="col-xs-12 col-sm-6 col-sm-3">\n\
<div class="thumbnail">\n\
<img class="img-responsive" src="'+v.uri+'" alt="">\n\
</div><select style="position:absolute;right:10px;top:0;" id="img_'+($.images.length + i)+'"><option value="">操作</option>'+options+'</select>\n\
</div>'
                        );
                        $('#img_'+($.images.length + i)).find('.position_'+($.images.length + i)).attr('selected','selected');
                    });
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
               console.log(textStatus, errorThrown);
            }
        });
    });
});

function GetShopInfo(){
    $.ajax({
        url: $.api.baseNew+"/onlineleasing-admin/api/shop/"+getURLParameter('id')+"",
        type: "GET",
        async: false,
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
                
                var shop = response.data;
                $.shop = shop;
                var coords = shop.coords;
                $.coords = coords || '';
                var images = shop.images;
                $.images = images;
                
                var floorName,mallName;
                $.each($.parseJSON(sessionStorage.getItem("floors")), function(i,v) {
                    if(v.floorCode == shop.floorCode) {
                        floorName = v.description;
                        return false;
                    }
                });
                
                $.each($.parseJSON(sessionStorage.getItem("malls")), function(i,v) {
                    if(v.mallCode == shop.mallCode) {
                        mallName = v.mallName;
                        return false;
                    }
                });
                
                $('#code').val(shop.code || '-');
                $('#name').val(shop.shopName || '-');
                $('#sub_type').val(shop.subType || '-');
                $('#hd_code').val(shop.hdCode || '-');
                $('#mall').val(mallName || '-');
                $('#floor').val(floorName || '-');
                $('#dead_rent').val((shop.deadRent || '-' ) + '元');
                $('#floating_rental_rate').val((shop.floatingRentalRate || '-' ) + '%');
                GetBrandModality3(shop.modality);
                
                if(shop.shopState === 1) { // 空铺
                    $('#moving_date').val(IncrMonth(date));
                } else { // 非空铺
                    var contractExpire = new Date();
                    contractExpire.setTime(shop.contractExpireDate);
                    var contractExpireYear = contractExpire.getFullYear('yyyy');
                    var contractExpireMonth = contractExpire.getMonth('mm')+1;
                    var contractExpireDate = contractExpire.getDate('dd');

                    if(IncrMonth(date) <= (contractExpireYear+'-'+contractExpireMonth+'-'+contractExpireDate)) {
                        $('#moving_date').val(IncrDate(contractExpireYear+'-'+contractExpireMonth+'-'+contractExpireDate));
                    } else {
                        $('#moving_date').val(IncrMonth(contractExpireYear+'-'+contractExpireMonth+'-'+contractExpireDate));
                    }
                }
                
                var state;
                switch(shop.shopState){
                    case 1:
                        state = "空铺";
                        break;
                    case 2:
                        state = "待租";
                        break;
                    case 0:
                        state = "在租";
                        break;
                    default:
                        state = "在租";
                        break;
                }
                $('#shop_state').val(state);
                $('#hd_state').val(shop.hdState || '-');
                $('#brand_name').val(shop.brandName || '-');
                $('#area').val((shop.area || '-' ) + '平方米');
                
                if(coords) {
                    $('#coords').val(coords);
                }
                
                if(images && images != null) {
                    var options = ''; 
                    for (var index=0; index<images.length; index++) {
                        options += '<option value="'+index+'" class="position_'+index+'">位置 '+index+'</option>';
                    }
                    
                    $.each(images, function(i,v){
                        $('#images').append('\
<div class="col-xs-12 col-sm-6 col-sm-3">\n\
<div class="thumbnail">\n\
<img class="img-responsive" src="'+v.image+'" alt="">\n\
</div><select style="position:absolute;right:10px;top:0;" id="img_'+i+'"><option value="">操作</option>'+options+'<option value="del">删除</option></select>\n\
</div>'
                        );
                        
                        $('#img_'+i).find('.position_'+v.position).attr('selected','selected');
                
                    });
                }
                
                var locked = 0;
                if(shop.state === 1){
                    $('#buttons center').prepend('<button class="btn btn-danger" id="lock" onClick="lockShop('+shop.id+');">锁定</button>');
                } else {
                    $('#buttons center').prepend('<button class="btn btn-success" id="unlock" onClick="unlockShop('+shop.id+');">解锁</button>');
                }
                
            } 
        }
    });
}

function SaveShopInfo(){
    $.coords = $('#coords').val();
    
    $('#images select').each(function(i,e){
        if(i<$.images.length){
            if($(e).val() === 'del'){
                $.images[i].deleteFlag = true;
            } else {
                $.images[i].position = $(e).val();
            }
        } else {
            $.images.push({
                'image': $(e).parent().find('img').attr('src'),
                'position': $(e).val()
            });
        }
    });
    
    $.shop.images = $.images;
    $.shop.coords = $.coords;
    
    var map = $.shop;

    $.ajax({
        url: $.api.baseNew+"/onlineleasing-admin/api/shop/save",
        type: "PUT",
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
            interpretBusinessCode(response.code);
            
            if(response.code === 'C0') {
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                }
                window.location.href = 'shop?id='+getURLParameter('id')+'&s=update-succeed';              
            }
        }
    });    
}

function lockShop(id){
    var map = {
        shop: {
            id : id
        }
    };
    $.ajax({
        url: $.api.base+"/shop/lock",
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
            interpretBusinessCode(response.code);
            
            if(response.code === 'C0') {
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                }
                $('#lock').remove();
                $('#buttons center').prepend('<button class="btn btn-success" id="unlock" onClick="unlockShop('+id+');">解锁</button>');
            }
        }
    });    
}

function unlockShop(id){
    var map = {
        shop: {
            id : id
        }
    };
    $.ajax({
        url: $.api.base+"/shop/unlock",
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
            interpretBusinessCode(response.code);
            
            if(response.code === 'C0') {
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                }
                $('#unlock').remove();
                $('#buttons center').prepend('<button class="btn btn-danger" id="lock" onClick="lockShop('+id+');">锁定</button>');
            }
        }
    });    
}

function GetBrandModality3(mod) {
    if(mod !== null && mod !== '') {
        var m = mod;
        $.each($.parseJSON(sessionStorage.getItem("modalities")), function(i,v) {
            $.each(v.children, function(j,w) {
                $.each(w.children, function(k,x) {
                    $.each(x.children, function(l,y) {
                        if(y.code == m) {
                            $('#modality').val(y.name);
                            return false;
                        }
                    });
                });
            });
        });
    } else {
        $('#modality').val('-');
    }
}