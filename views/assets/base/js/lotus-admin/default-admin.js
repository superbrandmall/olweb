var d = new Date();
var month = d.getMonth()+1;
var year = d.getFullYear();
var day = d.getDate();
var date = d.getFullYear() + '-' +
    (month<10 ? '0' : '') + month + '-' +
    (day<10 ? '0' : '') + day;
var deFC = '';

$.mapRent = {
    shop: 'all',
    brand: 'showBrands',
    color: 'C2EECE'
}

$(document).ready(function(){
    if(!sessionStorage.getItem("floors-"+getURLParameter('id')) || sessionStorage.getItem("floors-"+getURLParameter('id')) == null || sessionStorage.getItem("floors-"+getURLParameter('id')) == '') {
        getFloors();
    } else {
        $.each($.parseJSON(sessionStorage.getItem("floors-"+getURLParameter('id'))), function(i,v) {
            $('#floorList').append('<a class="btn btn-default" href="/lotus-admin/default?id='+getURLParameter('id')+'&f='+v.code+'">'+v.floorName+'</a>');
        });

        showFloors();
    }
    
    if(!sessionStorage.getItem("CONTRACT_STATUS") || sessionStorage.getItem("CONTRACT_STATUS") == null || sessionStorage.getItem("CONTRACT_STATUS") == '') {
        findDictCodeByDictTypeCode('CONTRACT_STATUS');
    }
    
    if(!sessionStorage.getItem("FORM_TYPE") || sessionStorage.getItem("FORM_TYPE") == null || sessionStorage.getItem("FORM_TYPE") == '') {
        findDictCodeByDictTypeCode('FORM_TYPE');
    }
    
    var size = 0.85;
    $('#zoom_in').click(function (){
        size = size + 0.15;
        $('#map').mapster('resize', size*($(window).width()), 0, 0);
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
        $('#map').mapster('resize', size*($(window).width()), 0, 0);
        addTextLayer();
        
        $('#zoom_in').attr('disabled', false);
        if(size <= 0.15){
            $(this).attr('disabled', true);
        } else {
            $(this).attr('disabled', false);
        }
    });
    
    $('#enter_full_screen').click(function (){
        $('header, .main-sidebar, .sub-header, .box-header, #floorList, #legendProportion, #mapRentShop-select, #mapRentBrand-select, #zoom_in, #zoom_out').hide();
        $('.content-wrapper').css('marginLeft',0);
        $('.content-wrapper .content').css({
            'marginTop' : 0,
            'padding': 0
        });
        $('#map_canvas .box-body').css('height','100vh');
        $('#map').mapster('resize', 1*($(window).width()), 0, 0);
        addTextLayer();
        $(this).hide();
    });
    
    $('#exit_full_screen').click(function (){
        $('header, .main-sidebar, .sub-header, .box-header, #floorList, #legendProportion, #mapRentShop-select, #mapRentBrand-select, #zoom_in, #zoom_out, #enter_full_screen').show();
        $('.content-wrapper').css('marginLeft','150px');
        $('.content-wrapper .content').css({
            'marginTop' : '126px',
            'padding': '15px'
        });
        $('#map_canvas .box-body').css('height','auto');
        $('#map').mapster('resize',  0.85*($(window).width()), 0, 0);
        addTextLayer();
    });
    
    $('#mapRentBrand-select ul ul li a').click(function(){
        $.mapRent.brand = $(this).attr('data-target');
        $('#mapRentBrand').text($(this).text());
        addTextLayer();
    })
    
    $('#cp3').colorpicker({
        format: 'hex'
    }).on('changeColor', function(ev){
        $.mapRent.color = ev.color.toHex().split('#')[1];
    });
    
    $('#updateColor').click(function(){
        var target = $('#unitCode').text();
        var singleSelect = $('#map').mapster('get_options');
        
        $.each(singleSelect.areas, function(i,v) {
           if(v.key == target){
               v.fillColor = $.mapRent.color;
           }
        });
                        
        $('#map').mapster({
            clickNavigate: true,
            mapKey: 'data-key',
            areas:  singleSelect.areas
        });
    })
});

$(function() {
    window.addEventListener("resize",function(){
        $('#map').mapster('resize', 0.85*($(window).width()), 0, 0);
        addTextLayer();
    });
})

function getFloors() {
    $.ajax({
        url: $.api.baseLotus+"/api/floor/lotus/findAllByMallCode?mallCode="+getURLParameter('id'),
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
            if(response.code === 'C0' && response.data.length > 0) {
                sessionStorage.setItem("floors-"+getURLParameter('id'), JSON.stringify(response.data) );

                $.each(response.data, function(i,v){
                    $('#floorList').append('<a class="btn btn-default" href="/lotus-admin/default?id='+getURLParameter('id')+'&f='+v.code+'">'+v.floorName+'</a>');
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
    
    $('#name2').text($.parseJSON(sessionStorage.getItem("floors-"+getURLParameter('id')))[0].mallName+'['+$.parseJSON(sessionStorage.getItem("floors-"+getURLParameter('id')))[0].mallCode+']');
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
                'id'    : 'Map_'+deFC
            });
        },
        error: function() {
            $('#map').attr({
                'src'   : '/views/assets/base/img/content/lotus-admin/noImage.jpg',
                'alt'   : deFC,
                'style'   : 'margin:0 auto'
            });
            $('#fmap').hide();
        }
    });
}

function getShopFloorInfo(fc) {
    var mallCodes;
    $.each(JSON.parse($.cookie('userModules')), function(i,v) {
        if((v.roleCode == 'CROLE211008000002' || v.roleCode == 'CROLE220922000001') && v.moduleCode == 'ALL'){
            mallCodes = v.moduleCode;
            return false;
        } else {
            mallCodes = getURLParameter('id');
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
            $('#loader').show();
            request.setRequestHeader("Login", $.cookie('login'));
            request.setRequestHeader("Authorization", $.cookie('authorization'));
            request.setRequestHeader("Lang", 1);
            request.setRequestHeader("Source", "onlineleasing");
        },
        complete: function(){},
        success: function (response, status, xhr) {
            $('#loader').hide();
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

        var coords = $.parseJSON(sessionStorage.getItem("coords_"+fc));
        if(coords.length > 0) {
            $.each(coords, function(i,v){
                if(v.coords != null && v.coords != '' && v.state != 0 ){
                    stores = stores + v.unitArea;
                    switch (v.shopStatus) {
                        case '0':
                        case '2':
                        case '3':
                            stores_0 = stores_0 + v.unitArea;
                            break;
                        case '1':
                            stores_1 = stores_1 + v.unitArea;
                            break;
                        default:
                            break;
                    }
                }

                if(v.coords != null && v.coords != '' && v.remarkFirst == 1){
                    $('map').append('<area data-key="'+v.unitCode+'" alt="'+v.code+'" data-full="'+v.shopStatus+'" data-area="'+v.unitArea+'" data-shop-name="'+v.unitName+'" name="'+(v.remarkSecond || '')+'" href=\'javascript: JumpToShopList("'+v.code+'");\' shape="poly" coords="'+v.coords+'" />'); 
                    $('#mapRentShop-select .dropdown-menu').append('<li><a href="javascript: void(0);" data-target="'+v.unitCode+'">'+v.unitName+'</a></li>');
                }
            });
        }
        
        if(fc == 'LTFLOOR20211026000004'){ // SC005
            getVshopLotus('LTSHOP211026000049'); // F101,F201[02FL001]
        }
        
        $('#leasedArea').text(numberWithCommas(stores_0.toFixed(2)));
        $('#emptyArea').text(numberWithCommas(stores_1.toFixed(2)));
        $('#leased').text(Math.round(stores_0/stores*100));
        $('#empty').text(Math.round(100-$('#leased').text()-$('#to_be_lease').text()-$('#renovation').text()));

        drawShops();
        
        $('#mapRentShop-select ul ul li a').click(function(){
            $.mapRent.shop = $(this).text();
            $('#mapRentShop').text($.mapRent.shop);
            var target = $(this).attr('data-target');
            if(target != 'all') { 
                var areas = $.map($('area'),function(el) {
                    if(target == $(el).attr('data-key')){
                        return {
                            key: $(el).attr('data-key'),
                            fillColor: 'ff0000',
                            stroke: false,
                            selected: true
                        };
                    } else {
                        return {
                            key: $(el).attr('data-key'),
                            fillColor: 'ffffff',
                            stroke: false,
                            selected: true
                        };
                    }
                })

                $('#map').mapster({
                    clickNavigate: true,
                    mapKey: 'data-key',
                    areas:  areas
                });
            } else {
                drawShops();
            }
        })
    }, 500);
}
    
function drawShops(){
    var areas = $.map($('area'),function(el) {
        if($(el).attr('data-full') == 0 || $(el).attr('data-full') == 2 || $(el).attr('data-full') == 3){
            return {
                key: $(el).attr('data-key'),
                toolTip: $(el).attr('name')+'<br>'+$(el).attr('data-shop-name')+'<br>('+$(el).attr('data-area')+')',
                fillColor: 'ddf1ca',
                stroke: true,
                strokeColor: '000000',
                strokeWidth: 1,
                selected: true
            };
        } else if($(el).attr('data-full') == 1){
            return {
                key: $(el).attr('data-key'),
                toolTip: $(el).attr('data-shop-name')+'<br>('+$(el).attr('data-area')+')',
                fillColor: 'ffffff',
                stroke: true,
                strokeColor: '000000',
                strokeWidth: 1,
                selected: true
            };
        }
    });
    
    var xOffset;
    var yOffset;
    
    $('#map').mapster({
        clickNavigate: true,
        mapKey: 'data-key',
        showToolTip: true,
        areas:  areas,
        onShowToolTip: function () {
            $(".mapster_tooltip").css({
                "font-weight": "bold",
                "color": "#fff",
                "background": "rgba(0,0,0,0.8)",
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
                width = parseInt(posLeftMax - posLeftMin - 12);             

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

                height = parseInt(posTopMax - posTopMin + 6);
                
                if($(this).attr('data-full') == 0 || $(this).attr('data-full') == 2){
                    shopName = $(this).attr('data-shop-name');
                    area = $(this).attr('data-area');
                    
                    if($.mapRent.brand == 'showBrands'){
                        brand = $(this).attr('name')+'<br>';
                        if(brand.length > 10){
                            brand = brand.substring(0,10) + "...<br>";
                        }
                    } else {
                        brand = '';
                    }

                    $(this).after(
                        '<span style="position:absolute;line-height:1;text-align:center;cursor:pointer;" onclick=\'javascript: GetShopInfo("'+$(this).attr('alt')+'");\'>'+brand+shopName+'<br>('+area+')</span>'
                    );
                } else if($(this).attr('data-full') == 'ad') {
                    shopName = $(this).attr('data-shop-name');
                    $(this).after(
                        '<span style="position:absolute;line-height:1;text-align:center;font-size:20px;color:FF0000;">'+shopName+'</span>'
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
        if ($(divWord).width() > maxWidth || $(divWord).height() > maxHeight) {
            var left = parseInt(posLeftMin + (maxWidth - $(divWord).width()) / 2) + 'px';
            var top = parseInt(posTopMin + (maxHeight - $(divWord).height()) / 2 + 6) + 'px';
            if($(divWord).width() > maxWidth){
                left = parseInt(posLeftMin - ($(divWord).width() - maxWidth) / 2) + 'px';
            }
            
            if($(divWord).height() > maxHeight){
                top = parseInt(posTopMin - ($(divWord).height() - maxHeight) / 2 + 6) + 'px';
            }
            
            $(divWord).css({
                'font-size': i + 'px',
                'left': left,
                'top': top    
            });
            break;
        } else {
            $(divWord).css({
                'font-size': i + 'px',
                'left': parseInt(posLeftMin + (maxWidth - $(divWord).width()) / 2) + 'px',
                'top': parseInt(posTopMin + (maxHeight - $(divWord).height()) / 2 + 6) + 'px'
            });
        }
    }
};

function JumpToShopList(sc){
    GetShopInfo(sc);
}

function GetShopInfo(sc){
    var params = [];
    var param = {};
    var conditionGroups = [];
    
    param = {
        "columnName": "shopCode",
        "columnPatten": "",
        "conditionOperator": "AND",
        "operator": "=",
        "value": sc
    }
    
    params.push(param);
    
    var map = {
        "conditionGroups": conditionGroups,
        "params": params
    }
    
    $.ajax({
        url: $.api.baseLotus+"/api/contract/lotus/findAllByKVCondition?page=0&size=100&sort=id,desc",
        type: "POST",
        data: JSON.stringify(map),
        async: false,
        dataType: "json",
        contentType: "application/json",
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
                var content = response.data.content;
                $('.figure').text(0);
                $('#shop_detail strong').text('--');
                $('#contractName').html('<span class="badge badge-danger">空铺: 未签约</span>');
                $("#comparison").find("tr").each(function(i,e){
                    $(e).find('td:eq(3)').html('--'); 
                })
                $('#shop_detail').css('opacity', 1);
                $('#shop_detail').modal('toggle');
                $('#store_img').html('');
                var coords = $.parseJSON(sessionStorage.getItem("coords_"+deFC));
                if(coords.length > 0) {
                    $.each(coords, function(i,v){
                        if(v.code == sc){
                            if(v.images != null && v.images.length > 0) {
                                $('#store_img').html('<img src="'+v.images[0].image+'" style="width: 100%;" />');
                            } else {
                                $('#store_img').html('<img src="/views/assets/base/img/content/lotus-admin/noImage.jpg" style="width: 100%;" />');
                            }
                            return false;
                        }
                    });
                }
                if(content.length > 0){
                    var shop, version = 0;
                    $.each(content, function(i,v){
                        if(version < v.contractVersion) {
                            shop = content[i];
                            version = v.contractVersion;
                        }
                    })
                    var shopStateClass = 'badge-default';
                    switch(shop.contractStatus){
                        case 'effect':
                        case 'uneffect':
                            state = shop.contractName;
                            break;
                        default:
                            state = "空铺";
                            shopStateClass = 'badge-danger';
                            break;
                    }
                    $('#contractName').html('<span class="badge '+shopStateClass+'">'+state+': '+(content.length > 0 ? renderContractStatus(shop.contractStatus) : '未签约')+'</span>');
                    $('#unitName').text(content.length > 0 ? shop.unitName : '--' );
                    $('#unitCode').text(content.length > 0 ? shop.unitCode : '--' );
                    $('#unitArea').text(content.length > 0 ? shop.area + 'm²' : '--' );
                    $('#floorName').text(content.length > 0 ? shop.floorName : '--' );
                    $('#formType').text(content.length > 0 ? renderFormType(shop.formType.toLowerCase()) : '--' );
                    $('#startDate').text(content.length > 0 ? shop.startDate : '--' );
                    $('#endDate').text(content.length > 0 ? shop.endDate : '--' );
                    $('#tenantName').text(content.length > 0 ? shop.tenantName : '--' );
                    $('#bizTypeName').text(content.length > 0 ? shop.bizTypeName : '--' );
                    if(shop.bizId != null && shop.formType == "new"){
                        findDrFormByBizId(shop.bizId);
                        return false;
                    }
                    $('#comparison tr:eq(0) td:eq(2)').text(content.length > 0 ? numberWithCommas((shop.taxTotalRentAmount+shop.taxTotalPropertyAmount).toFixed(2)) : 0);
                    $('#comparison tr:eq(1) td:eq(2)').text(content.length > 0 ? ((shop.taxTotalRentAmount == 0 || shop.taxTotalRentAmount == null) ? 0 : numberWithCommas(shop.taxTotalRentAmount.toFixed(2))) : 0);
                    $('#comparison tr:eq(2) td:eq(2)').text(content.length > 0 ? ((shop.taxTotalPropertyAmount == 0 || shop.taxTotalPropertyAmount == null) ? 0 : numberWithCommas(shop.taxTotalPropertyAmount.toFixed(2))) : 0);
                    $('#comparison tr:eq(4) td:eq(1)').text(content.length > 0 ? ((shop.budgetPromotionFee == 0 || shop.budgetPromotionFee == null) ? 0 : numberWithCommas(shop.budgetPromotionFee.toFixed(2))) : 0);
                    $('#comparison tr:eq(4) td:eq(2)').text(content.length > 0 ? ((shop.promotionFee == 0 || shop.promotionFee == null) ? 0 : numberWithCommas(shop.promotionFee.toFixed(2))) : 0);
                    $('#comparison tr:eq(5) td:eq(1)').text(content.length > 0 ? ((shop.budgetDeductRate == 0 || shop.budgetDeductRate == null) ? 0 : parseFloat(shop.budgetDeductRate * 100).toFixed(2)) : 0);
                    $('#comparison tr:eq(5) td:eq(2)').text(content.length > 0 ? ((shop.rentDeductRate == 0 || shop.rentDeductRate == null) ? 0 : parseFloat(shop.rentDeductRate * 100).toFixed(2)) : 0);
                    var deposit = 0;
                    if(shop.depositList != null && shop.depositList.length > 0){
                        $.each(shop.depositList, function(i,v){
                            deposit += v.amount;
                        })
                    }
                    $('#comparison tr:eq(6) td:eq(2)').text(numberWithCommas(deposit.toFixed(2)));
                    $('#comparison tr:eq(7) td:eq(1)').text(content.length > 0 ? ((shop.budgetDayRent == 0 || shop.budgetDayRent == null) ? 0 : numberWithCommas(shop.budgetDayRent.toFixed(2))) : 0);
                    $('#comparison tr:eq(7) td:eq(2)').text(content.length > 0 ? ((shop.dayRent == 0 || shop.dayRent == null) ? 0 : numberWithCommas(shop.dayRent.toFixed(2))) : 0);
                } else {
                    $.ajax({
                        url: $.api.baseLotus+"/api/vshop/lotus/findAllByShopCode?shopCode="+sc,
                        type: "GET",
                        async: false,
                        dataType: "json",
                        contentType: "application/json",
                        beforeSend: function(request) {
                            request.setRequestHeader("Login", $.cookie('login'));
                            request.setRequestHeader("Authorization", $.cookie('authorization'));
                            request.setRequestHeader("Lang", $.cookie('lang'));
                            request.setRequestHeader("Source", "onlineleasing");
                        },
                        complete: function(){},
                        success: function (response, status, xhr) {
                            if(response.code === 'C0') {
                                if(xhr.getResponseHeader("Login") !== null){
                                    $.cookie('login', xhr.getResponseHeader("Login"));
                                }
                                if(xhr.getResponseHeader("Authorization") !== null){
                                    $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                                }
                                if(response.data != null){
                                    var data = response.data;
                                    $('#unitName').text(data.unitName);
                                    $('#unitCode').text(data.unitCode);
                                    $('#unitArea').text(data.unitArea);
                                    $('#floorName').text(data.floorName);
                                    $('#bizTypeName').text(data.modality != null ? data.modality : '--');
                                }
                            }
                        }
                    })
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
}

function getVshopLotus(sc) {
    $.ajax({
        url: $.api.baseLotus+"/api/vshop/lotus/findAllByShopCode?shopCode="+sc,
        type: "GET",
        async: false,
        dataType: "json",
        contentType: "application/json",
        beforeSend: function(request) {
            request.setRequestHeader("Login", $.cookie('login'));
            request.setRequestHeader("Authorization", $.cookie('authorization'));
            request.setRequestHeader("Lang", $.cookie('lang'));
            request.setRequestHeader("Source", "onlineleasing");
        },
        complete: function(){},
        success: function (response, status, xhr) {
            if(response.code === 'C0') {
                if(xhr.getResponseHeader("Login") !== null){
                    $.cookie('login', xhr.getResponseHeader("Login"));
                }
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                }
                
                var v = response.data;
                if(v.remarkFirst == 1){
                   $('map').append('<area data-key="'+v.unitCode+'" alt="'+v.code+'" data-full="'+v.shopStatus+'" data-area="'+v.unitArea+'" data-shop-name="'+v.unitName+'" name="'+(v.remarkSecond || '')+'" href=\'javascript: JumpToShopList("'+v.code+'");\' shape="poly" coords="857,2022,1083,2022,1083,1788,857,1788" />'); 
                }
            }
        }
    })
}

function calcDrForm(bizId) {
    $.ajax({
        url: $.api.baseLotus+"/api/drForm/lotus/calcDrForm?bizId="+bizId,
        type: "GET",
        async: false,
        dataType: "json",
        contentType: "application/json",
        beforeSend: function(request) {
            request.setRequestHeader("Login", $.cookie('login'));
            request.setRequestHeader("Authorization", $.cookie('authorization'));
            request.setRequestHeader("Lang", $.cookie('lang'));
            request.setRequestHeader("Source", "onlineleasing");
        },
        complete: function(){},
        success: function (response, status, xhr) {
            if(response.code === 'C0') {
                if(xhr.getResponseHeader("Login") !== null){
                    $.cookie('login', xhr.getResponseHeader("Login"));
                }
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                }
                
                findDrFormByBizId(bizId);
            }
        }
    })
}

function findDrFormByBizId(bizId) {
    $.ajax({
        url: $.api.baseLotus+"/api/drForm/lotus/findAllByBizId?bizId="+bizId,
        type: "GET",
        async: false,
        dataType: "json",
        contentType: "application/json",
        beforeSend: function(request) {
            request.setRequestHeader("Login", $.cookie('login'));
            request.setRequestHeader("Authorization", $.cookie('authorization'));
            request.setRequestHeader("Lang", $.cookie('lang'));
            request.setRequestHeader("Source", "onlineleasing");
        },
        complete: function(){},
        success: function (response, status, xhr) {
            if(response.code === 'C0') {
                if(xhr.getResponseHeader("Login") !== null){
                    $.cookie('login', xhr.getResponseHeader("Login"));
                }
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                }

                if(response.data != null){
                    if(response.data.brandCondition != null){
                        var shop = response.data.brandCondition;
                        $('#comparison tr:eq(0) td:eq(1)').text((shop.budgetTotalAmount == 0 || shop.budgetTotalAmount == null) ? 0 : numberWithCommas(shop.budgetTotalAmount.toFixed(2)));
                        $('#comparison tr:eq(0) td:eq(2)').text((shop.totalAmount == 0 || shop.totalAmount == null) ? 0 : numberWithCommas(shop.totalAmount.toFixed(2)));
                        $('#comparison tr:eq(1) td:eq(1)').text((shop.budgetFixedRent == 0 || shop.budgetFixedRent == null) ? 0 : numberWithCommas(shop.budgetFixedRent.toFixed(2)));
                        $('#comparison tr:eq(1) td:eq(2)').text((shop.reportFixedRent == 0 || shop.reportFixedRent == null) ? 0 : numberWithCommas(shop.reportFixedRent.toFixed(2)));
                        $('#comparison tr:eq(2) td:eq(1)').text((shop.propertyFee == 0 || shop.propertyFee == null) ? 0 : numberWithCommas(shop.propertyFee.toFixed(2)));
                        $('#comparison tr:eq(2) td:eq(2)').text((shop.reportPropertyFee == 0 || shop.reportPropertyFee == null) ? 0 : numberWithCommas(shop.reportPropertyFee.toFixed(2)));
                        $('#comparison tr:eq(4) td:eq(1)').text((shop.totalPromotion == 0 || shop.totalPromotion == null) ? 0 : numberWithCommas(shop.totalPromotion.toFixed(2)));
                        $('#comparison tr:eq(4) td:eq(2)').text((shop.totalReportPromotion == 0 || shop.totalReportPromotion == null) ? 0 : numberWithCommas(shop.totalReportPromotion.toFixed(2)));
                        $('#comparison tr:eq(6) td:eq(1)').text((shop.depositAmount == 0 || shop.depositAmount == null) ? 0 : numberWithCommas(parseInt(shop.depositAmount)));
                        $('#comparison tr:eq(6) td:eq(2)').text((shop.reportDepositAmount == 0 || shop.reportDepositAmount == null) ? 0 : numberWithCommas(parseInt(shop.reportDepositAmount)));
                        if(response.data.fixedRentReportList != null && response.data.fixedRentReportList.length > 0){
                            shop = response.data.fixedRentReportList[0];
                            $('#comparison tr:eq(7) td:eq(1)').text((shop.budgetForHighRent == 0 || shop.budgetForHighRent == null) ? 0 : numberWithCommas(shop.budgetForHighRent.toFixed(2)));
                            $('#comparison tr:eq(7) td:eq(2)').text((shop.reportHigherRent == 0 || shop.reportHigherRent == null) ? 0 : numberWithCommas(shop.reportHigherRent.toFixed(2)));
                        }
                        
                        $("#comparison").find("tr").each(function(i,e){
                            if(numberWithoutCommas($(e).find('td:eq(2)').text()) >= numberWithoutCommas($(e).find('td:eq(1)').text())){
                                $(e).find('td:eq(3)').html('<div class="green-light"></div>');
                            } else {
                                $(e).find('td:eq(3)').html('<div class="yellow-light"></div>');
                            }
                        })
                    }
                } else {
                    calcDrForm(bizId);
                }
            }
        }
    })     
}