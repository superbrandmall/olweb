$.api = {
    base: "http://10.130.12.15:8080/oldataservice/ol/api",
    baseNew: $.base,
    emailVC: "",
    mobileVC: ""
};

var d = new Date();
var month = d.getMonth()+1;
var year = d.getFullYear();
var day = d.getDate();
var date = d.getFullYear() + '-' +
    (month<10 ? '0' : '') + month + '-' +
    (day<10 ? '0' : '') + day;

$(document).ready(function(){
    setTimeout(function () { 
        var deFC = '', floor = '';
        if(getURLParameter('f') && getURLParameter('f') != '') {
            deFC = getURLParameter('f');
        } else {
            deFC = $.parseJSON(sessionStorage.getItem("floors-"+$.cookie('mallSelected').split(':::')[1]))[0].code;  
        }

        $.each($.parseJSON(sessionStorage.getItem("floors-"+$.cookie('mallSelected').split(':::')[1])), function(i,v){
            if(v.code == deFC) {
                floor = v.floorName;
            }
        })

        $('#map').attr({
            'src'   : '/views/assets/base/img/content/floor-plan/'+$.cookie('mallSelected').split(':::')[1]+'-lotus/'+deFC+'.png',
            'alt'   : deFC,
            'usemap': '#Map_'+deFC
        });
        $('map').attr({
            'name'  : 'Map_'+deFC,
            'id'    : '"Map_'+deFC
        });

        getShopFloorInfo(deFC);

        $('#mallName').text($.cookie('mallSelected').split(':::')[0]);
        $('#floorNo').text(floor);
    }, 500);
    
    var size = 0.85;
    $('#zoom_in').click(function (){
        size = size + 0.15;
        $('#map').mapster('resize', size*($(window).width()), 0, 300);
        addTextLayer();
        
        $('#zoom_out').attr('disabled', false);
        if(size >= 2.35){
            $(this).attr('disabled', true);
        } else {
            $(this).attr('disabled', false);
        }
    });
    
    $('#zoom_out').click(function (){
        size = size - 0.15;
        $('#map').mapster('resize', size*($(window).width()), 0, 300);
        addTextLayer();
        
        $('#zoom_in').attr('disabled', false);
        if(size <= 0.15){
            $(this).attr('disabled', true);
        } else {
            $(this).attr('disabled', false);
        }
    });
});

$(function() {
    window.addEventListener("resize",function(){
        $('#map').mapster('resize', 0.85*($(window).width()), 0, 0);
        $('img.mapster_el').css('marginLeft','3%');
        addTextLayer();
    });
});

function getShopFloorInfo(fc) {
    $.ajax({
        url: $.api.baseNew+"/onlineleasing-customer/api/vshop/lotus/findAllByMallCodeAndFloorCode?mallCode="+$.cookie('mallSelected').split(':::')[1]+"&floorCode="+fc+"&page=0&size=100&sort=id,desc",
        type: "GET",
        async: false,
        dataType: "json",
        contentType: "application/json",
        beforeSend: function(request) {
            request.setRequestHeader("Login", $.cookie('login'));
            request.setRequestHeader("Authorization", $.cookie('authorization'));
            request.setRequestHeader("Lang", 1);
            request.setRequestHeader("Source", "onlineleasing");
        },
        complete: function(){},
        success: function (response, status, xhr) {
            if(response.code === 'C0') {  
                var stores = 0;
                var stores_0 = 0;
                var stores_1 = 0;

                var itm = 0;
                if(response.data.content.length > 0) {
                    $.each(response.data.content, function(i,v){
                        if(v.coords != null && v.coords != '' && v.state != 0 ){
                            stores = stores + v.unitArea;
                            switch (v.shopStatus) {
                                case '0':
                                    stores_0 = stores_0 + v.unitArea;
                                    break;
                                case '1':
                                    stores_1 = stores_1 + v.unitArea;
                                    break;
                                default:
                                    break;
                            }
                        }
                        
                        if(v.coords != null && v.coords != '' && v.state != 0){
                            $('map').append('<area data-key="'+v.unitCode+'" alt="'+v.code+'" data-full="'+v.shopStatus+'" data-area="'+v.unitArea+'" data-shop-name="'+v.unitName+'" name="'+(v.remarkFirst || '')+'" href=\'javascript: JumpToShopList("'+v.code+'");\' shape="poly" coords="'+v.coords+'" />'); 
                        }
                    });
                }

                $('#leased').text(Math.round(stores_0/stores*100));
                $('#empty').text(Math.round(100-$('#leased').text()-$('#to_be_lease').text()-$('#renovation').text()));
                
                drawShops();
            } else {
                console.log(response.customerMessage);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}
    
function drawShops(){
    var areas = $.map($('area'),function(el) {
        if($(el).attr('data-full') == 0){
            return { 
                key: $(el).attr('data-key'),
                toolTip: $(el).attr('data-shop-name')+'<br>('+$(el).attr('data-area')+')<br>'+$(el).attr('name'),
                fillColor: 'd3fdd9',
                selected: true,
                stroke: true,
                strokeColor: 'd3fdd9'
            };
        } else if($(el).attr('data-full') == 1){
            return { 
                key: $(el).attr('data-key'),
                toolTip: $(el).attr('data-shop-name')+'<br>('+$(el).attr('data-area')+')',
                fillColor: 'ff2700',
                selected: true,
                stroke: true,
                strokeColor: 'ff2700'
            };
        }
    });
    
    var xOffset;
    var yOffset;

    $('#map').mapster({
        fillColor: 'becff4',
        fillOpacity: 0.8,
        strokeColor: 'becff4',
        strokeWidth: 0,
        clickNavigate: true,
        mapKey: 'data-key',
        showToolTip: true,
        areas:  areas,
        onShowToolTip: function () {
            $(".mapster_tooltip").css({
                "font-weight": "normal",
                "color": "#a3aec2",
                "background": "rgba(28,34,56,1)",
                "font-size": "14px",
                "width": "auto"
            });

            $("area").on("mouseenter",  function (data) {
               xOffset = data.pageX;
               yOffset = data.pageY;
               $(".mapster_tooltip").css("left", xOffset);
               $(".mapster_tooltip").css("top", yOffset);
            });
        }
    });
    
    if(document.body.clientWidth >= 1280){
        $('#map').mapster('resize', 0.85*($(window).width()), 0, 0);
    }
    $('img.mapster_el').css('marginLeft','3%');
    addTextLayer();
}

function addTextLayer(){
    $('map span').remove();
    if(document.body.clientWidth > 1000){
        setTimeout(function () {
            var pos, shopName, area, brand;
            $('map area').each(function(i,elem){
                pos = $(this).attr('coords').split(',');
                var x = 0;
                var posLeftMin = parseInt(pos[0]), posLeftMax = parseInt(pos[0]), width, height;
                while(x < pos.length){
                    if(parseInt(pos[x]) < posLeftMin){
                        posLeftMin = parseInt(pos[x]);
                    } 

                    if(parseInt(pos[x]) > posLeftMax){
                        posLeftMax = parseInt(pos[x]);
                    }
                    x = x + 2;
                }
                width = parseInt(posLeftMax - posLeftMin - 10); 

                var y = 1;
                var posTopMin = parseInt(pos[1]), posTopMax = parseInt(pos[1]);
                while(y < pos.length){
                    if(parseInt(pos[y]) < posTopMin){
                        posTopMin = parseInt(pos[y]);
                    }
                    if(parseInt(pos[y]) > posTopMax){
                        posTopMax = parseInt(pos[y]);
                    }
                    y = y + 2;
                }

                height = parseInt(posTopMax - posTopMin - 10);
                    
                if($(this).attr('data-full') == 0){
                    shopName = $(this).attr('data-shop-name');
                    area = $(this).attr('data-area');
                    brand = $(this).attr('name');
                    if(brand.length > 10){
                        brand = brand.substring(0,10) + "...";
                    }
                    
                    $(this).after(
                        '<span style="position:absolute;line-height:1;text-align:center;cursor:pointer;" onclick=\'javascript: GetShopInfo("'+$(this).attr('alt')+'");\'>'+shopName+'<br>('+area+')<br>'+brand+'</span>'
                    );
                } else {
                    shopName = $(this).attr('data-shop-name');
                    area = $(this).attr('data-area');
                    
                    $(this).after(
                        '<span style="position:absolute;line-height:1;text-align:center;cursor:pointer;" onclick=\'javascript: GetShopInfo("'+$(this).attr('alt')+'");\'>'+shopName+'<br>('+area+')</span>'
                    );
                }
                
                resetFontSize($(this).next(),width,height,4,12,posLeftMin,posTopMin);
            });
        },1000);
    }
}

function resetFontSize(divWord, maxWidth, maxHeight, minSize, maxSize, posLeftMin, posTopMin) {
    divWord.css('font-size', minSize + "px");
    for (var i = minSize; i < maxSize; i++) {
        if ($(divWord).width() > maxWidth  || $(divWord).height() > maxHeight) {
            $(divWord).css({
                'font-size': i + 'px',
                'left': parseInt(posLeftMin - ($(divWord).width() - maxWidth) / 2 + 5) + 'px',
                'top': parseInt(posTopMin - ($(divWord).height() - maxHeight) / 2 + 5) + 'px'    
            }); 
                break;
        } else {
            $(divWord).css({
                'font-size': i + 'px',
                'left': parseInt(posLeftMin - ($(divWord).width() - maxWidth) / 2) + 'px',
                'top': parseInt(posTopMin - ($(divWord).height() - maxHeight) / 2) + 'px'
            });
        }
    }
};

function JumpToShopList(sc){
    GetShopInfo(sc);
}

function GetShopInfo(sc){
    $.ajax({
        url: $.api.baseNew+"/onlineleasing-customer/api/user/contract/lotus/findAllByMallCodeAndShopCode?mallCode="+$.cookie('mallSelected').split(':::')[1]+"&shopCode="+sc,
        type: "GET",
        async: false,
        beforeSend: function(request) {
            $('#loader').show();
            request.setRequestHeader("Login", $.cookie('login'));
            request.setRequestHeader("Authorization", $.cookie('authorization'));
            request.setRequestHeader("Lang", 1);
            request.setRequestHeader("Source", "onlineleasing");
        },
        success: function (response, status, xhr) {
            $('#loader').hide();
            if(response.code === 'C0') {
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                }
                
                var shop = response.data[response.data.length - 1];
                var state;
                var shopStateClass = 'badge-default';
                switch(shop.vshopLotus.shopStatus){
                    case '0':
                        state = shop.contractName;
                        break;
                    case '1':
                        state = "空铺";
                        shopStateClass = 'badge-danger';
                        break;
                    default:
                        state = "在租";
                        shopStateClass = 'badge-default';
                        break;
                }

                $('#contractName').html('<span class="badge '+shopStateClass+'">'+state+'</span>');
                $('#contractType').text(shop.contractType || '-' );
                $('#contractStatus').text(shop.contractStatus || '-' );
                $('#unitCode').text(shop.unitCode || '-' );
                $('#unitArea').text((shop.unitArea || '-' ) + 'm²');
                $('#startDate').text(shop.startDate || '-' );
                $('#endDate').text(shop.endDate || '-' );
                $('#tenantName').text(shop.tenantName || '-' );
                $('#totalAmount').text(numberWithCommas(shop.totalAmount) + '元');
                $('#totalAmountDay').text(shop.totalAmountDay || '-' );
                $('#rentAmount').text(numberWithCommas(shop.rentAmount) + '元');
                $('#managerAmount').text(numberWithCommas(shop.managerAmount) + '元');
                $('#floorName').text(shop.vshopLotus.floorName || '-' );
                $('#promotionAmount').text(numberWithCommas(shop.promotionAmount) + '元');
                $('#depositAmount').text(numberWithCommas(shop.depositAmount) + '元');
                $('#deduct').text(shop.deduct == 0 ? shop.deduct : parseFloat(shop.deduct * 100).toFixed(2)+'%');
                $('#contactName').text(shop.contactName || '-' );
                $('#contactPhone').text(shop.contactPhone || '-' );
                $('#modality1').text(shop.brandLotus.modality1 || '-' );
                $('#modality2').text(shop.brandLotus.modality2 || '-' );
                $('#modality3').text(shop.brandLotus.modality3 || '-' );

                $('#shop_detail').css('opacity', 1);
                $('#shop_detail').modal('toggle');
            } else {
                console.log(response.customerMessage);
            }
        }
    });
}