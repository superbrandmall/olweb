var d = new Date();
var month = d.getMonth()+1;
var year = d.getFullYear();
var day = d.getDate();
var date = d.getFullYear() + '-' +
    (month<10 ? '0' : '') + month + '-' +
    (day<10 ? '0' : '') + day;
var deFC = '';

$(document).ready(function(){
    getFloors();
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

function getFloors() {
    $.ajax({
        url: $.api.baseLotus+"/api/floor/lotus/findAllByMallCode?mallCode="+getURLParameter('id'),
        type: "GET",
        async: false,
        beforeSend: function(request) {
            request.setRequestHeader("Login", $.cookie('login'));
            request.setRequestHeader("Authorization", $.cookie('authorization'));
            request.setRequestHeader("Lang", 1);
            request.setRequestHeader("Source", "onlineleasing");
        },
        success: function (response, status, xhr) {
            if(response.code === 'C0' && response.data.length > 0) {
                sessionStorage.setItem("floors-"+getURLParameter('id'), JSON.stringify(response.data) );
                
                $.each(response.data, function(i,v){
                    $('#floorList').append('<a class="btn btn-default" href="/lotus-admin/home?f='+v.code+'">'+v.floorName+'</a>');
                });
                
                showFloors();
            } else {
                alertMsg(response.code,response.customerMessage);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}

function showFloors() {
    var floor = '';
    if(getURLParameter('f') && getURLParameter('f') != '') {
        deFC = getURLParameter('f');
    } else {
        deFC = $.parseJSON(sessionStorage.getItem("floors-"+getURLParameter('id')))[0].code;  
    }

    $.each($.parseJSON(sessionStorage.getItem("floors-"+getURLParameter('id'))), function(i,v){
        if(v.code == deFC) {
            floor = v.floorName;
        }
    })

    NetPing('/views/assets/base/img/content/floor-plan/'+getURLParameter('id')+'-lotus/'+deFC+'.png',deFC);

    if(!sessionStorage.getItem("coords_"+deFC) || sessionStorage.getItem("coords_"+deFC) == null || sessionStorage.getItem("coords_"+deFC) == '') {
        getShopFloorInfo(deFC);
    } else {
        renderMap(deFC);
    }

    $('#mallName').text($.parseJSON(sessionStorage.getItem("floors-"+getURLParameter('id')))[0].mallName);
    $('#floorNo').text(floor);
}

function NetPing(url,deFC) {
    $.ajax({
        type: "GET",
        cache: false,
        url: url,
        data: "",
        success: function() {
           $('#map').attr({
                'src'   : url,
                'alt'   : deFC,
                'usemap': '#Map_'+deFC
            });
            $('map').attr({
                'name'  : 'Map_'+deFC,
                'id'    : '"Map_'+deFC
            });
        },
        error: function() {
            $('#map').attr({
                'src'   : '/views/assets/base/img/content/lotus-admin/noImage.jpg',
                'alt'   : deFC
            });
            $('#fmap').hide();
        }
    });
}

function getShopFloorInfo(fc) {
    var mallCodes;
    $.each(JSON.parse($.cookie('userModules')), function(i,v) {
        if(v.roleCode == 'CROLE211008000002' && v.moduleCode == 'ALL'){
            mallCodes = v.moduleCode;
            return false;
        } else {
            mallCodes = $.cookie('mallSelected').split(':::')[1];
        }
    })
    
    var map = {
        "floorCode": fc,
        "mallCodes": mallCodes,
        "userCode": $.cookie('uid')
    };
        
    $.ajax({
        url: $.api.baseLotus+"/api/vshop/lotus/findAllByCondition?page=0&size=100",
        type: "POST",
        data: JSON.stringify(map),
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
                sessionStorage.setItem("coords_"+fc, JSON.stringify(response.data.content) );
                renderMap(fc);
            } else {
                alertMsg(response.code,response.customerMessage);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}

function renderMap(fc) {
    setTimeout(function () { 
        var stores = 0;
        var stores_0 = 0;
        var stores_1 = 0;

        var itm = 0;
        var coords = $.parseJSON(sessionStorage.getItem("coords_"+fc));
        if(coords.length > 0) {
            $.each(coords, function(i,v){
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
    }, 500);
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
    $('map span').each(function(i,elem){
        $(this).remove();
    })
    
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
        url: $.api.baseLotus+"/api/user/contract/lotus/findAllByMallCodeAndShopCode?mallCode="+$.cookie('mallSelected').split(':::')[1]+"&shopCode="+sc,
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
                                
                var state = "空铺";
                var shopStateClass = 'badge-danger';
                    
                if(response.data.length > 0){
                    var shop = response.data[response.data.length - 1];
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
                } else {
                    
                }
                
                $('.figure').text(0);
                
                $('#contractName').html('<span class="badge '+shopStateClass+'">'+state+': '+(response.data.length > 0 ? shop.contractStatus : '未签约')+'</span>');
                $('#contractType').text(response.data.length > 0 ? shop.contractType : '-' );
                $('#startDate').text(response.data.length > 0 ? shop.startDate : '-' );
                $('#endDate').text(response.data.length > 0 ? shop.endDate : '-' );
                $('#tenantName').text(response.data.length > 0 ? shop.tenantName : '-' );
                $('#totalAmount').text(response.data.length > 0 ? numberWithCommas(shop.totalAmount.toFixed(2)) : 0);
                $('#totalAmountDay').text(response.data.length > 0 ? shop.totalAmountDay.toFixed(2) : 0 );
                $('#B011_amount').text(response.data.length > 0 ? numberWithCommas(shop.rentAmount.toFixed(2)) : 0);
                $('#B021_amount').text(response.data.length > 0 ? ((shop.managerAmount == 0 || shop.managerAmount == null) ? 0 : numberWithCommas(shop.managerAmount.toFixed(2))) : 0);
                $('#G021_amount').text(response.data.length > 0 ? ((shop.promotionAmount == 0 || shop.promotionAmount == null) ? 0 : numberWithCommas(shop.promotionAmount.toFixed(2))) : 0);
                if(response.data.length > 0) {
                    if(shop.promotionAmount >= 10){
                        $('#G011_amount').text(numberWithCommas(shop.promotionAmount.toFixed(2)));
                        $('#G021_amount').text(0);
                    } else if (shop.promotionAmount > 0 && shop.promotionAmount < 10){
                        $('#G011_amount').text(0);
                        $('#G021_amount').text(parseFloat(shop.promotionAmount * 100).toFixed(2));
                    } else {
                        $('#G011_amount').text(0);
                        $('#G021_amount').text(0);
                    }
                } else {
                    $('#G011_amount').text(0);
                    $('#G021_amount').text(0);
                }
                
                $('#E02_amount').text(response.data.length > 0 ? ((shop.depositAmount == 0 || shop.depositAmount == null) ? 0 : numberWithCommas(shop.depositAmount.toFixed(2))) : 0);
                $('#D011_amount').text(response.data.length > 0 ? ((shop.deduct == 0 || shop.deduct == null) ? 0 : parseFloat(shop.deduct * 100).toFixed(2)) : 0);
                $('#contactName').text(response.data.length > 0 ? shop.contactName : '-' );
                $('#contactPhone').text(response.data.length > 0 ? shop.contactPhone : '-' );
                $('#modality1').text(response.data.length > 0 ? shop.brandLotus.modality1 : '-' );
                $('#modality2').text(response.data.length > 0 ? shop.brandLotus.modality2 : '-' );
                $('#modality3').text(response.data.length > 0 ? shop.brandLotus.modality3 : '-' );

                $('#shop_detail').css('opacity', 1);
                $('#shop_detail').modal('toggle');

                $('#store_img').html('');
                var coords = $.parseJSON(sessionStorage.getItem("coords_"+deFC));
                if(coords.length > 0) {
                    $.each(coords, function(i,v){
                        if(v.code == sc){
                            if(v.shopBudgetList.length > 0){
                                GetShopBudget(JSON.stringify(v.shopBudgetList));
                            } else {
                                $('#budgetL').html('');
                            }
                    
                            if(v.images != null && v.images.length > 0) {
                                $('#store_img').html('<img src="'+v.images[0].image+'" style="width: 100%;" />');
                            } else {
                                $('#store_img').html('<img src="/views/assets/base/img/content/lotus-admin/noImage.jpg" style="width: 100%;" />');
                            }
                            
                            $('#unitName').text(v.unitName);
                            $('#unitCode').text(v.unitCode);
                            $('#unitArea').text(v.unitArea + 'm²');
                            $('#floorName').text(v.floorName);
                            return false;
                        }

                        if(v.coords != null && v.coords != '' && v.state != 0){
                            $('map').append('<area data-key="'+v.unitCode+'" alt="'+v.code+'" data-full="'+v.shopStatus+'" data-area="'+v.unitArea+'" data-shop-name="'+v.unitName+'" name="'+(v.remarkFirst || '')+'" href=\'javascript: JumpToShopList("'+v.code+'");\' shape="poly" coords="'+v.coords+'" />'); 
                        }
                    });
                }
            } else {
                alertMsg(response.code,response.customerMessage);
            }
        }
    });
}

function GetShopBudget(b){
    var budget = $.parseJSON(b);
    $.each(budget, function(i,v){
        $('#'+v.termType).text((v.december == 0 || v.december == null) ? 0 : numberWithCommas(v.december.toFixed(2)));
        if($('#'+v.termType+'_amount').text() != '' && $('#'+v.termType+'_amount').text() != 0){
            if(numberWithoutCommas($('#'+v.termType+'_amount').text()) >= numberWithoutCommas($('#'+v.termType).text())){
                $('#'+v.termType+'_grade').html('<div class="green-light"></div>');
            } else {
                $('#'+v.termType+'_grade').html('<div class="red-light"></div>');
            }
        }
    })
    
    /*$('#budgetL').html('');
    $.each(budget, function(i,v){
        var termType;
        switch (v.termType) {
            case "B011":
                termType = '固定租金';
                break;
            case "B021":
                termType = '物业管理费';
                break;
            case "G021":
                termType = '推广费';
                break;
            case "D011":
                termType = '提成扣率';
                break;
            case "E02":
                termType = '保证金';
                break;
            case "E22":
                termType = '履约保证金';
                break;
            default:
                break;
        }
        
        $('#budgetL').append('<tr>\n\
            <td>'+termType+'</td>\n\
            <td>'+v.startDate+'</td>\n\
            <td>'+v.endDate+'</td>\n\
            <td>'+numberWithCommas(v.january)+'</td>\n\
            <td>'+numberWithCommas(v.february)+'</td>\n\
            <td>'+numberWithCommas(v.march)+'</td>\n\
            <td>'+numberWithCommas(v.april)+'</td>\n\
            <td>'+numberWithCommas(v.may)+'</td>\n\
            <td>'+numberWithCommas(v.june)+'</td>\n\
            <td>'+numberWithCommas(v.july)+'</td>\n\
            <td>'+numberWithCommas(v.august)+'</td>\n\
            <td>'+numberWithCommas(v.september)+'</td>\n\
            <td>'+numberWithCommas(v.october)+'</td>\n\
            <td>'+numberWithCommas(v.november)+'</td>\n\
            <td>'+numberWithCommas(v.december)+'</td></tr>'
        );
    })*/
}