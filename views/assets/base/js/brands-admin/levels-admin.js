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
    
var levelShopsAdmin = '';
var brandsSelector = '<option value="">请选择</option>';
var floorDesc;

$(document).ready(function(){
    if(!sessionStorage.getItem("malls") || sessionStorage.getItem("malls") == null || sessionStorage.getItem("malls") == '') {
        getMalls();
    }

    if(!sessionStorage.getItem("floors") || sessionStorage.getItem("floors") == null || sessionStorage.getItem("floors") == '') {
        getFloors();
    }

    if(!sessionStorage.getItem("modalities") || sessionStorage.getItem("modalities") == null || sessionStorage.getItem("modalities") == '') {
        getModalities();
    }

    var floor = '1F';
    if(getURLParameter('f') && getURLParameter('f') != '') {
        switch (getURLParameter('f')) {
            case '0':
                floorDesc = '负一楼';
                floor = 'B1';
                break;
            case '1':
                floorDesc = '一楼';
                floor = 'L1';
                break;
            case '2':
                floorDesc = '二楼';
                floor = 'L2';
                break;
            case '3':
                floorDesc = '三楼';
                floor = 'L3';
                break;
            case '4':
                floorDesc = '四楼';
                floor = 'L4';
                break;
            case '5':
                floorDesc = '五楼';
                floor = 'L5';
                break;
            case '6':
                floorDesc = '六楼';
                floor = 'L6';
                break;
            case '7':
                floorDesc = '七楼';
                floor = 'L7';
                break;
            case '8':
                floorDesc = '八楼';
                floor = 'L8';
                break;
            default:
                floorDesc = [];
                floor = 'L1';
                break;
        }

        $('#map').attr({
            'src'   : '/views/assets/base/img/content/floor-plan/shanghai-sbm/'+getURLParameter('f')+'F.png',
            'alt'   : getURLParameter('f')+'F',
            'usemap': '#Map_'+getURLParameter('f')+'F'
        });
        $('map').attr({
            'name'  : 'Map_'+getURLParameter('f')+'F',
            'id'    : '"Map_'+getURLParameter('f')+'F'
        });
        getShopFloorInfo(floorDesc);
    } else {
        $('#map').attr({
            'src'   : '/views/assets/base/img/content/floor-plan/shanghai-sbm/1F.png',
            'alt'   : '1F',
            'usemap': '#Map_1F'
        });
        $('map').attr({
            'name'  : 'Map_1F',
            'id'    : '"Map_1F'
        });
        
        getShopFloorInfo('一楼');
    }

    $('#floorNo').text(floor);
    
    $('#zoom_in').click(function (){
        $('#map_canvas').removeClass('col-lg-6').addClass('col-lg-12');
        $('#map').mapster('resize', 0.95*($('#map_canvas').width()), 0, 0);
        addTextLayer();
        $('#vr, #image').hide();
        $(this).hide();
        $('#zoom_out').show();
    });
    
    $('#zoom_out').click(function (){
        $('#map_canvas').removeClass('col-lg-12').addClass('col-lg-6');
        $('#map').mapster('resize', 0.95*($('#map_canvas').width()), 0, 0);
        addTextLayer();
        $('#vr, #image').show();
        $(this).hide();
        $('#zoom_in').show();
    });
    
    var pendDays = 90;
    getBrands(pendDays);
    renderLevelShops(floorDesc);
    
    
    $('#view_all').click(function (){
        $('#levelShopList2').fadeIn();
        
        $('.fixed-table-body').stop(true).animate({
            scrollTop: $('#levelShopList2').offset().top
        }, 0);
    });
    
    $(".brands-selector-L").change(function () {
        if($(this).val() != ''){
            applyNewCategoryL($(this).parents('tr').attr('id'));
        }
    });
    
    $(".brands-selector-S").change(function () {
        if($(this).val() != ''){
            applyNewCategoryS($(this).parents('tr').attr('id'));
        }
    });
    
    /********************* Start of calculation *************************/
    
    $('.predict-sales').blur(function(){
        $(this).val(numberWithCommas(numberWithoutCommas($(this).val())));
        calBackPushRent($(this).parents('tr').attr('id'),$(this).parents('tbody').attr('id'));
        calBackPushUnitRent($(this).parents('tr').attr('id'),$(this).parents('tbody').attr('id'));
        calHigherRent($(this).parents('tr').attr('id'),$(this).parents('tbody').attr('id'));
        calHigherDailyRent($(this).parents('tr').attr('id'),$(this).parents('tbody').attr('id'));
    });
    
    $('.predict-floatin-rates').blur(function(){
        calBackPushRent($(this).parents('tr').attr('id'),$(this).parents('tbody').attr('id'));
        calBackPushUnitRent($(this).parents('tr').attr('id'),$(this).parents('tbody').attr('id'));
        calHigherRent($(this).parents('tr').attr('id'),$(this).parents('tbody').attr('id'));
        calHigherDailyRent($(this).parents('tr').attr('id'),$(this).parents('tbody').attr('id'));
    });
    
    $('.guarantee-unit-rent').blur(function(){
        calGuaranteeRent($(this).parents('tr').attr('id'),$(this).parents('tbody').attr('id'));
        calHigherRent($(this).parents('tr').attr('id'),$(this).parents('tbody').attr('id'));
        calHigherDailyRent($(this).parents('tr').attr('id'),$(this).parents('tbody').attr('id'));
    });
    
    $('.guarantee-rent').blur(function(){
        $(this).val(numberWithCommas(numberWithoutCommas($(this).val())));
        calGuaranteeUnitRent($(this).parents('tr').attr('id'),$(this).parents('tbody').attr('id'));
        calHigherRent($(this).parents('tr').attr('id'),$(this).parents('tbody').attr('id'));
        calHigherDailyRent($(this).parents('tr').attr('id'),$(this).parents('tbody').attr('id'));
    });
    
    /********************* End of calculation *************************/
});

$(function() {
    window.addEventListener("resize",function(){
        $('#map').mapster('resize', 1*($('#map_canvas').width()), 0, 0);
        addTextLayer();
    });
    
    window.οnlοad =
        $("#store_vr").css({
            'height': $("#store_img").height()+'px'
        });
        
    window.οnlοad = addTextLayer();
        
    $('.fixed-table-body').on('scroll', scrollHandle);
});


function getShopFloorInfo(fl) {
    $.ajax({
        url: $.api.baseNew+"/onlineleasing-customer/api/base/coords/OLMALL180917000003/"+fl+"",
        type: "GET",
        async: false,
        dataType: "json",
        contentType: "application/json",
        beforeSend: function(request) {
            request.setRequestHeader("Lang", $.cookie('lang'));
            request.setRequestHeader("Source", "onlineleasing");
        },
        complete: function(){},
        success: function (response, status, xhr) {
            if(response.code === 'C0') {
                levelShopsAdmin = response;
                
                var stores = 0;
                var stores_0 = 0;
                var stores_1 = 0;
                var stores_2 = 0;
                var stores_3 = 0;

                var itm = 0;
                $.each(response.data, function(i,v){
                    if((v.subType == '正柜' || v.subType == 'THEAT') && v.state != 0 ){
                        stores = stores + v.area;

                        switch (v.shopState) {
                            case 0:
                                stores_0 = stores_0 + v.area;
                                break;
                            case 1:
                                stores_1 = stores_1 + v.area;
                                break;
                            case 2:
                                if(getURLParameter('expire') && getURLParameter('expire') != '') {
                                    if(v.daysBeforeContractExpire <= getURLParameter('expire')) {
                                        stores_2 = stores_2 + v.area;
                                    } else {
                                        v.shopState = 0;
                                        stores_0 = stores_0 + v.area;
                                    }
                                } else {
                                    stores_2 = stores_2 + v.area;
                                }

                                break;
                            case 3:
                                stores_3 = stores_3 + v.area;
                                break;
                            default:
                                break;
                        }
                    }

                    if((v.subType == '正柜' || v.subType == 'THEAT') && v.coords != null && v.coords != '' && v.state != 0){
                        if(v.responsiblePerson == $.cookie('uid') || v.categoryHead == $.cookie('uid') || $.inArray($.cookie('uid'),$.parseJSON(sessionStorage.getItem("admins"))) != -1){
                            $('map').append('<area data-key="'+v.unit+'" alt="'+v.code+'" data-full="'+v.shopState+'" data-responsible-person="'+v.responsiblePerson+'" data-category-head="'+v.categoryHead+'" data-area="'+v.area+'" data-shop-name="'+v.shopName+'" name="'+(v.brandName || '')+'" href=\'javascript: JumpToShopList("'+v.code+'");\' shape="poly" coords="'+v.coords+'" />'); 
                        } else {
                            $('map').append('<area data-key="'+v.unit+'" alt="'+v.code+'" data-full="'+v.shopState+'" data-responsible-person="'+v.responsiblePerson+'" data-category-head="'+v.categoryHead+'" data-area="'+v.area+'" data-shop-name="'+v.shopName+'" name="'+(v.brandName || '')+'" shape="poly" coords="'+v.coords+'" />'); 
                        }
                    }
                });

                $('#leased').text(Math.round(stores_0/stores*100) || '0');
                $('#to_be_lease').text(Math.round(stores_2/stores*100) || '0');
                $('#renovation').text(Math.round(stores_3/stores*100) || '0');
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
            if($(el).attr('data-responsible-person') == $.cookie('uid') || $(el).attr('data-category-head') == $.cookie('uid') || $.inArray($.cookie('uid'),$.parseJSON(sessionStorage.getItem("admins"))) != -1){
                return { 
                    key: $(el).attr('data-key'),
                    toolTip: $(el).attr('name'),
                    fillColor: '7d9fe9',
                    selected: true,
                    stroke: false
                };
            } else {
                return { 
                    key: $(el).attr('data-key'),
                    toolTip: $(el).attr('name'),
                    fillColor: 'becff4',
                    selected: true,
                    stroke: false,
                    clickNavigate: false
                };
            }
        } else if($(el).attr('data-full') == 1){
            if($(el).attr('data-responsible-person') == $.cookie('uid') || $(el).attr('data-category-head') == $.cookie('uid') || $.inArray($.cookie('uid'),$.parseJSON(sessionStorage.getItem("admins"))) != -1){
                return { 
                    key: $(el).attr('data-key'),
                    toolTip: '空铺',
                    fillColor: 'FE9E9E',
                    selected: true,
                    stroke: false
                };
            } else {
                return { 
                    key: $(el).attr('data-key'),
                    toolTip: '空铺',
                    fillColor: 'fecece',
                    selected: true,
                    stroke: false,
                    clickNavigate: false
                };
            }
        } else if($(el).attr('data-full') == 2){
            if($(el).attr('data-responsible-person') == $.cookie('uid') || $(el).attr('data-category-head') == $.cookie('uid') || $.inArray($.cookie('uid'),$.parseJSON(sessionStorage.getItem("admins"))) != -1){
                return { 
                    key: $(el).attr('data-key'),
                    toolTip: $(el).attr('name'),
                    fillColor: 'FEED99',
                    selected: true,
                    stroke: false
                };
            } return { 
                key: $(el).attr('data-key'),
                toolTip: $(el).attr('name'),
                fillColor: 'fef6cc',
                selected: true,
                stroke: false,
                clickNavigate: false
            };
        } else if($(el).attr('data-full') == 3){
            if($(el).attr('data-responsible-person') == $.cookie('uid') || $(el).attr('data-category-head') == $.cookie('uid') || $.inArray($.cookie('uid'),$.parseJSON(sessionStorage.getItem("admins"))) != -1){
                return { 
                    key: $(el).attr('data-key'),
                    toolTip: '改造中',
                    fillColor: 'D5C8AA',
                    selected: true,
                    stroke: false
                };
            } return { 
                key: $(el).attr('data-key'),
                toolTip: '改造中',
                fillColor: 'eae3d4',
                selected: true,
                stroke: false,
                clickNavigate: false
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
                "font-weight": "bold",
                "color": "#a3aec2",
                "background": "rgba(28,34,56,1)",
                "font-size": "22px",
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
                    
                if($(this).attr('data-full') == 0 || $(this).attr('data-full') == 2){
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
        if ($(divWord).width() > maxWidth) {
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
    $('#levelShopListL td').removeClass('dark-layer');
    $('#levelShopListS tr').hide();

    $('#levelShopListL .rows-'+sc+' td').addClass('dark-layer');
    $('#levelShopListS .rows-'+sc).show();
    
    GetShopInfo(sc);
}

function GetShopInfo(sc){
    $.ajax({
        url: $.api.baseNew+"/onlineleasing-admin/api/shop/"+sc+"",
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
                var images = shop.images;
                
                if(images != null && images.length > 0) {
                    $('#store_img').html('<img src="'+images[0].image+'" class="img-responsive" alt="" />');
                } else {
                    $('#store_img').html('');
                }
                
                $('#store_img_2').find('img').remove();
                if(shop.vrValidated === 1) {
                    if(shop.shopState === 1 && shop.brandToSign != null && shop.brandToSign != ''){
                        $('#store_vr').hide();
                        if(images != null && images.length > 1) {
                            $('#store_img_2').show().append('<img src="'+images[1].image+'" class="img-responsive" alt="" />');
                        }
                    } else {
                        $('#store_img_2').hide();
                        $('#store_vr').show();
                        $('#store_vr iframe').attr('src','/'+shop.vr);
                    }
                } else {
                    $('#store_vr').hide();
                    if(images != null && images.length > 1) {
                         $('#store_img_2').show().append('<img src="'+images[1].image+'" class="img-responsive" alt="" />');
                    }
                }
                
            } else {
                console.log(response.customerMessage);
            }
        }
    });
}

function getMalls() {
    $.ajax({
        url: $.api.baseNew+"/onlineleasing-customer/api/base/info/mall/findAllOrderByPosition",
        type: "GET",
        async: false,
        beforeSend: function(request) {
            request.setRequestHeader("Lang", $.cookie('lang'));
            request.setRequestHeader("Source", "onlineleasing");
        },
        success: function (response, status, xhr) {
            if(response.code === 'C0') {
                sessionStorage.setItem("malls", JSON.stringify(response.data) );
            } else {
                console.log(response.customerMessage);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}

function getFloors() {
    $.ajax({
        url: $.api.baseNew+"/onlineleasing-customer/api/base/info/floor/findAll",
        type: "GET",
        async: false,
        beforeSend: function(request) {
            request.setRequestHeader("Lang", $.cookie('lang'));
            request.setRequestHeader("Source", "onlineleasing");
        },
        success: function (response, status, xhr) {
            if(response.code === 'C0') {
                sessionStorage.setItem("floors", JSON.stringify(response.data) );
            } else {
                console.log(response.customerMessage);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}

function renderLevelShops(fD) {
    if(levelShopsAdmin != '') {
        var bg = '#AFBEDE';
        $.each(levelShopsAdmin.data, function(i,v){
            if(v.shopState == 0){
                if(v.responsiblePerson == $.cookie('uid') || v.categoryHead == $.cookie('uid') || $.inArray($.cookie('uid'),$.parseJSON(sessionStorage.getItem("admins"))) != -1){
                    bg = '#7d9fe9';
                } else {
                    bg = '#becff4';
                }
            } else if(v.shopState == 1){
                if(v.responsiblePerson == $.cookie('uid') || v.categoryHead == $.cookie('uid') || $.inArray($.cookie('uid'),$.parseJSON(sessionStorage.getItem("admins"))) != -1){
                    bg = '#FE9E9E';
                } else {
                    bg = '#fecece';
                }
            } else if(v.shopState == 2){
                if(v.responsiblePerson == $.cookie('uid') || v.categoryHead == $.cookie('uid') || $.inArray($.cookie('uid'),$.parseJSON(sessionStorage.getItem("admins"))) != -1){
                    bg = '#FEED99';
                } else { 
                    bg = '#fef6cc';
                };
            } else if(v.shopState == 3){
                if(v.responsiblePerson == $.cookie('uid') || v.categoryHead == $.cookie('uid') || $.inArray($.cookie('uid'),$.parseJSON(sessionStorage.getItem("admins"))) != -1){
                    bg = '#D5C8AA';
                } else { 
                    bg = '#eae3d4';
                };
            }
            
            if((v.subType == '正柜' || v.subType == 'THEAT') && v.state != 0){
                if(v.responsiblePerson == $.cookie('uid') || v.categoryHead == $.cookie('uid') || $.inArray($.cookie('uid'),$.parseJSON(sessionStorage.getItem("admins"))) != -1){
                    $('#levelShopListL').append('\
    <tr id="row_'+v.code+'" class="rows-'+v.code+' primary-rows" onclick=\'javascript: JumpToShopList("'+v.code+'");\'>\n\
    <td rowspan="1" style="vertical-align: middle; z-index: 4; background-color: '+bg+';">'+v.shopName+'</td>\n\
    <td rowspan="1" style="vertical-align: middle; z-index: 4;"><span class="area">'+v.area+'</span>m<sup>2</sup></td>\n\
    <td rowspan="1" style="vertical-align: middle; z-index: 4;">'+(v.brandName || '')+'</td>\n\
    <td><i class="fa fa-plus"></i><select class="brands-selector-L" style="font-weight: bold; background: transparent; text-align: center;">'+brandsSelector+'</select></td>\n\
    <td class="new-category-code"></td>\n\
    <td><input class="form-control target-confirm-date date-picker" type="text" data-plugin="datepicker" readonly /></td>\n\
    <td><input class="form-control target-contract-signed-date date-picker" type="text" data-plugin="datepicker" readonly /></td>\n\
    <td><input class="form-control target-hoarding-date date-picker" type="text" data-plugin="datepicker" readonly /></td>\n\
    <td><input class="form-control target-entering-date date-picker" type="text" data-plugin="datepicker" readonly /></td>\n\
    <td><input class="form-control target-opening-date date-picker" type="text" data-plugin="datepicker" readonly /></td>\n\
    <td><input class="form-control user-remark" type="text" style="width: auto;" /></td>\n\
    <td class="responsible-person"></td>\n\
    <td><div class="input-group"><input class="form-control predict-sales" type="text" style="width: auto;" /><span class="input-group-addon">元</span></div></td>\n\
    <td><div class="input-group"><input class="form-control predict-floatin-rates" type="text" /><span class="input-group-addon">%</span></div></td>\n\
    <td><div class="input-group"><input class="form-control back-push-rent non-input" type="text" style="width: auto;" readonly /><span class="input-group-addon">元</span></div></td>\n\
    <td><div class="input-group"><input class="form-control back-push-unit-rent non-input" type="text" readonly /><span class="input-group-addon">元</span></div></td>\n\
    <td><div class="input-group"><input class="form-control guarantee-unit-rent" type="text" /><span class="input-group-addon">元</span></div></td>\n\
    <td><div class="input-group"><input class="form-control guarantee-rent" type="text" style="width: auto;" /><span class="input-group-addon">元</span></div></td>\n\
    <td><div class="input-group"><input class="form-control higher-rent non-input" type="text" style="width: auto;" readonly /><span class="input-group-addon">元</span></div></td>\n\
    <td><div class="input-group"><input class="form-control higher-daily-rent non-input" type="text" readonly /><span class="input-group-addon">元</span></div></td>\n\
    <td><a href=\'javascript: saveShopBrandL("'+v.code+'");\' class="save btn btn-danger btn-xs"><i class="fa fa-save"></i></a></td>\n\
    </tr>'); 
                    
                    $('#levelShopListS').append('\
<tr style="border-left: 10px solid '+bg+'" id="row_'+v.code+'" class="rows-'+v.code+' primary-rows">\n\
<td colspan="65">\n\
<div class="card-views"><div class="card-view"><span class="title">铺位号</span><span class="value"><a href="/brands-admin/brand?id='+v.code+'">'+v.shopName+'</a></span></div></div>\n\
<div class="card-views"><div class="card-view"><span class="title">面积</span><span class="value">'+v.area+'</span></div></div>\n\
<div class="card-views"><div class="card-view"><span class="title">原品牌</span><span class="value">'+(v.brandName || '')+'</span></div></div>\n\
<div class="card-views"><div class="card-view"><span class="title">新品牌</span><span class="value"><select class="brands-selector-S">'+brandsSelector+'</select></span></div></div>\n\
<div class="card-views"><div class="card-view"><span class="title">业态</span><span class="value new-category-code"></span></div></div>\n\
<div class="card-views"><div class="card-view"><span class="title">确认时间</span><span class="value"><input class="target-confirm-date date-picker" type="text" data-plugin="datepicker" readonly style="background: #FFF; border: solid 1px #dedede;" /></span></div></div>\n\
<div class="card-views"><div class="card-view"><span class="title">签约时间</span><span class="value"><input class="target-contract-signed-date date-picker" type="text" data-plugin="datepicker" readonly style="background: #FFF; border: solid 1px #dedede;" /></span></div></div>\n\
<div class="card-views"><div class="card-view"><span class="title">围挡时间</span><span class="value"><input class="target-hoarding-date date-picker" type="text" data-plugin="datepicker" readonly style="background: #FFF; border: solid 1px #dedede;" /></span></div></div>\n\
<div class="card-views"><div class="card-view"><span class="title">进场时间</span><span class="value"><input class="target-entering-date date-picker" type="text" data-plugin="datepicker" readonly style="background: #FFF; border: solid 1px #dedede;" /></span></div></div>\n\
<div class="card-views"><div class="card-view"><span class="title">开业时间</span><span class="value"><input class="target-opening-date date-picker" type="text" data-plugin="datepicker" readonly style="background: #FFF; border: solid 1px #dedede;" /></span></div></div>\n\
<div class="card-views"><div class="card-view"><span class="title">备注</span><span class="value"><input class="user-remark" type="text" /></span></div></div>\n\
<div class="card-views"><div class="card-view"><span class="title">责任人</span><span class="value responsible-person"></span></div></div>\n\
<div class="card-views"><div class="card-view"><span class="title">业绩预估</span><span class="value"><input class="predict-sales" type="text" /><span>元</span></span></div></div>\n\
<div class="card-views"><div class="card-view"><span class="title">预估扣点</span><span class="value"><input class="predict-floatin-rates" type="text" /><span>%</span></span></span></div></div>\n\
<div class="card-views"><div class="card-view"><span class="title">倒推月租金</span><span class="value"><input class="back-push-rent" type="text" readonly /><span>元</span></span></div></div>\n\
<div class="card-views"><div class="card-view"><span class="title">倒推租金单价</span><span class="value"><input class="back-push-unit-rent" type="text" readonly /><span>元</span></span></div></div>\n\
<div class="card-views"><div class="card-view"><span class="title">保底租金单价</span><span class="value"><input class="guarantee-unit-rent" type="text" /><span>元</span></div></div>\n\
<div class="card-views"><div class="card-view"><span class="title">保底月租金</span><span class="value"><input class="guarantee-rent" type="text" /><span>元</span></div></div>\n\
<div class="card-views"><div class="card-view"><span class="title">取高月租金</span><span class="value"><input class="higher-rent" type="text" readonly /><span>元</span></span></div></div>\n\
<div class="card-views"><div class="card-view"><span class="title">取高日租金</span><span class="value"><input class="higher-daily-rent" type="text" readonly /><span>元</span></span></div></div>\n\
<div class="card-views"><div class="card-view"><span class="title">保存</span><span class="value"><a href=\'javascript: saveShopBrandS("'+v.code+'");\' class="save btn btn-danger btn-xs"><i class="fa fa-save"></i></a></span></div></div>\n\
</td></tr>');
                   
                } else {
                    $('#levelShopList2').append('\
    <tr id="row_'+v.code+'" class="rows-'+v.code+' primary-rows">\n\
    <td style="vertical-align: middle; background-color: '+bg+';">'+v.shopName+'</td>\n\
    <td style="vertical-align: middle;">'+v.area+'m<sup>2</sup></td>\n\
    <td style="vertical-align: middle;">'+(v.brandName || '')+'</td>\n\
    <td colspan="18"></td>\n\
    </tr>'); 
                }
                
                $('.date-picker').datepicker({
                    'language': 'zh-CN',
                    'format': 'yyyy-mm-dd'
                });
            } 
        });
        
        renderLevelShopNewBrands(fD);
    }
}

function renderLevelShopNewBrands(fD) {
    var map = {};
    
    var url = '';
    if($.inArray($.cookie('uid'),$.parseJSON(sessionStorage.getItem("admins"))) != -1){
        url = 'findAllByFloorCodeAndState/'+fD+"/1";
    } else {
        url = 'findAllByFloorCodeAndStateAndUserCode/'+fD+"/1/"+$.cookie('uid');
    }
    
    
    $.ajax({
        url: $.api.baseNew+"/onlineleasing-customer/api/shopBrand/"+url,
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
                
                if(response.data.length > 0){
                    var bg = "#fff";
                    var rows = 1;
                    $.each(response.data, function(i,v){
                        rows = $('#levelShopListL #row_'+v.shopCode+' td:eq(0)').attr('rowSpan');
                        rows++;
                        for(var j=0;j<3;j++){
                            $('#levelShopListL #row_'+v.shopCode+' td:eq('+j+')').attr('rowSpan',rows);
                        }
                        
                        bg = $('#levelShopListL #row_'+v.shopCode).css('backgroundColor');
                        
                        var user = '';
                        $.each($.parseJSON(sessionStorage.getItem("users")), function(h,u) {
                            if(u.code == v.userCode) {
                                user = u.name;
                            }
                        });
                        
                        $('<tr id="row_'+v.shopCode+'_'+i+'" class="rows-'+v.shopCode+'" onclick=\'javascript: JumpToShopList("'+v.shopCode+'");\'>\n\
                            <td><select class="brands-selector-L" style="font-weight: bold; background: transparent; text-align: center;">'+brandsSelector+'</select></td>\n\
                            <td class="new-category-code">'+v.newCategoryCode+'</td>\n\
                            <td><input class="form-control target-confirm-date date-picker" type="text" value="'+(v.targetConfirmDate || '')+'" data-plugin="datepicker" readonly /></td>\n\
                            <td><input class="form-control target-contract-signed-date date-picker" type="text" value="'+(v.targetContractSignedDate || '')+'" data-plugin="datepicker" readonly /></td>\n\
                            <td><input class="form-control target-hoarding-date date-picker" type="text" value="'+(v.targetHoardingDate || '')+'" data-plugin="datepicker" readonly /></td>\n\
                            <td><input class="form-control target-entering-date date-picker" type="text" value="'+(v.targetEnteringDate || '')+'" data-plugin="datepicker" readonly /></td>\n\
                            <td><input class="form-control target-opening-date date-picker" type="text" value="'+(v.targetOpeningDate || '')+'" data-plugin="datepicker" readonly /></td>\n\
                            <td><input class="form-control user-remark" type="text" value="'+v.userRemark+'" style="width: auto;" /></td>\n\
                            <td class="responsible-person">'+user+'</td>\n\
                            <td><div class="input-group"><input class="form-control predict-sales" type="text" value="'+(numberWithCommas(v.predictSales) || '')+'" style="width: auto;" /><span class="input-group-addon">元</span></div></td>\n\
                            <td><div class="input-group"><input class="form-control predict-floatin-rates" type="text" value="'+(v.predictFloatingRates || '')+'" /><span class="input-group-addon">%</span></div></td>\n\
                            <td><div class="input-group"><input class="form-control back-push-rent non-input" type="text" style="width: auto;" value="'+(numberWithCommas(v.backPushRent) || '')+'" readonly /><span class="input-group-addon">元</span></div></td>\n\
                            <td><div class="input-group"><input class="form-control back-push-unit-rent non-input" type="text" value="'+(numberWithCommas(v.backPushUnitRent) || '')+'" readonly /><span class="input-group-addon">元</span></div></td>\n\
                            <td><div class="input-group"><input class="form-control guarantee-unit-rent" type="text" value="'+(numberWithCommas(v.guaranteeUnitRent) || '')+'" /><span class="input-group-addon">元</span></div></td>\n\
                            <td><div class="input-group"><input class="form-control guarantee-rent" type="text" value="'+(numberWithCommas(v.guaranteeRent) || '')+'" style="width: auto;" /><span class="input-group-addon">元</span></div></td>\n\
                            <td><div class="input-group"><input class="form-control higher-rent non-input" type="text" value="'+(numberWithCommas(v.higherRent) || '')+'" style="width: auto;" readonly /><span class="input-group-addon">元</span></div></td>\n\
                            <td><div class="input-group"><input class="form-control higher-daily-rent non-input" type="text" value="'+(numberWithCommas(v.higherDailyRent) || '')+'" readonly /><span class="input-group-addon">元</span></div></td>\n\
\                           <td><a id="save_'+v.code+'" href=\'javascript: updateShopBrandL("'+v.shopCode+'_'+i+'");\' class="save btn btn-danger btn-xs"><i class="fa fa-save"></i></a></td>\n\
                            </tr>').insertAfter('#levelShopListL #row_'+v.shopCode);
                        
                        $('#levelShopListL #row_'+v.shopCode).next('tr').find('td').find('.brands-selector-L').val(v.brandCode);
                        
                        $('<tr id="row_'+v.shopCode+'_'+i+'" class="rows-'+v.shopCode+'" style="border-left: 10px solid '+bg+'" >\n\
<td colspan="65">\n\
<div class="card-views"><div class="card-view"><span class="title">新品牌</span><span class="value"><select class="brands-selector-S">'+brandsSelector+'</select></span></div></div>\n\
<div class="card-views"><div class="card-view"><span class="title">业态</span><span class="value new-category-code">'+v.newCategoryCode+'</span></div></div>\n\
<div class="card-views"><div class="card-view"><span class="title">确认时间</span><span class="value"><input class="target-confirm-date date-picker" type="text" value="'+(v.targetConfirmDate || '')+'" data-plugin="datepicker" readonly style="background: #FFF; border: solid 1px #dedede;" /></span></div></div>\n\
<div class="card-views"><div class="card-view"><span class="title">签约时间</span><span class="value"><input class="target-contract-signed-date date-picker" type="text" value="'+(v.targetContractSignedDate || '')+'" data-plugin="datepicker" readonly style="background: #FFF; border: solid 1px #dedede;" /></span></div></div>\n\
<div class="card-views"><div class="card-view"><span class="title">围挡时间</span><span class="value"><input class="target-hoarding-date date-picker" type="text" value="'+(v.targetHoardingDate || '')+'" data-plugin="datepicker" readonly style="background: #FFF; border: solid 1px #dedede;" /></span></div></div>\n\
<div class="card-views"><div class="card-view"><span class="title">进场时间</span><span class="value"><input class="target-entering-date date-picker" type="text" value="'+(v.targetEnteringDate || '')+'" data-plugin="datepicker" readonly style="background: #FFF; border: solid 1px #dedede;" /></span></div></div>\n\
<div class="card-views"><div class="card-view"><span class="title">开业时间</span><span class="value"><input class="target-opening-date date-picker" type="text" value="'+(v.targetOpeningDate || '')+'" data-plugin="datepicker" readonly style="background: #FFF; border: solid 1px #dedede;" /></span></div></div>\n\
<div class="card-views"><div class="card-view"><span class="title">备注</span><span class="value"><input class="user-remark" type="text" value="'+v.userRemark+'" /></span></div></div>\n\
<div class="card-views"><div class="card-view"><span class="title">责任人</span><span class="value responsible-person">'+user+'</span></div></div>\n\
<div class="card-views"><div class="card-view"><span class="title">业绩预估</span><span class="value"><input class="predict-sales" type="text" value="'+(numberWithCommas(v.predictSales) || '')+'" /><span>元</span></span></div></div>\n\
<div class="card-views"><div class="card-view"><span class="title">预估扣点</span><span class="value"><input class="predict-floatin-rates" type="text" value="'+(v.predictFloatingRates || '')+'" /><span>%</span></span></span></div></div>\n\
<div class="card-views"><div class="card-view"><span class="title">倒推月租金</span><span class="value"><input class="back-push-rent" type="text" value="'+(numberWithCommas(v.backPushRent) || '')+'" readonly /><span>元</span></span></div></div>\n\
<div class="card-views"><div class="card-view"><span class="title">倒推租金单价</span><span class="value"><input class="back-push-unit-rent" type="text" value="'+(numberWithCommas(v.backPushUnitRent) || '')+'" readonly /><span>元</span></span></div></div>\n\
<div class="card-views"><div class="card-view"><span class="title">保底租金单价</span><span class="value"><input class="guarantee-unit-rent" type="text" value="'+(numberWithCommas(v.guaranteeUnitRent) || '')+'" /><span>元</span></div></div>\n\
<div class="card-views"><div class="card-view"><span class="title">保底月租金</span><span class="value"><input class="guarantee-rent" type="text" value="'+(numberWithCommas(v.guaranteeRent) || '')+'" /><span>元</span></div></div>\n\
<div class="card-views"><div class="card-view"><span class="title">取高月租金</span><span class="value"><input class="higher-rent" type="text" value="'+(numberWithCommas(v.higherRent) || '')+'" readonly /><span>元</span></span></div></div>\n\
<div class="card-views"><div class="card-view"><span class="title">取高日租金</span><span class="value"><input class="higher-daily-rent" type="text" value="'+(numberWithCommas(v.higherDailyRent) || '')+'" readonly /><span>元</span></span></div></div>\n\
<div class="card-views"><div class="card-view"><span class="title">保存</span><span class="value"><a id="save_'+v.code+'" href=\'javascript: updateShopBrandS("'+v.shopCode+'_'+i+'");\' class="save btn btn-danger btn-xs"><i class="fa fa-save"></i></a></span></div></div>\n\
</td></tr>').insertAfter('#levelShopListS #row_'+v.shopCode);
                        
                        $('#levelShopListS #row_'+v.shopCode).next('tr').find('td').find('.brands-selector-S').val(v.brandCode);
                    });
                    
                    $('.date-picker').datepicker({
                        'language': 'zh-CN',
                        'format': 'yyyy-mm-dd'
                    });
                }
            } 
        }
    });
}

function getBrands(pd) {
    $.ajax({
        url: $.api.baseNew + "/onlineleasing-customer/api/brand/findBrandDashboardByUserCode/?pendDays=" + pd+ "&yyyyMm="+year+(month<10 ? '0'+month : month)+"&userCode=" + $.cookie('login'),
        type: "GET",
        async: false,
        beforeSend: function (request) {
            request.setRequestHeader("Lang", $.cookie('lang'));
            request.setRequestHeader("Source", "onlineleasing");
        },
        complete: function () {},
        success: function (response, status, xhr) {
            if (response.code === 'C0') {
                if(response.data.userModalities.length > 0){
                    var url = '';
                    if(response.data.userModalities[0].isComplete == 2){
                        url = 'findAllByUserCodes'; // Category head 可以查看自己管理的业态，其中马云飞和宋总可以查看所有业态
                    } else {
                        url = 'findAllByUserCode2'; // 其他人只能查看自己建立的品牌
                    }
                    
                    showBrands(1,100,url);
                }
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
        }
    });
}

function showBrands(p,c,u){
    var map = {};
    $.ajax({
        url: $.api.baseNew+"/onlineleasing-customer/api/brand/"+u+"/"+$.cookie('login')+"?page="+(p-1)+"&size="+c+"&sort=id,desc",
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
                    $.each(response.data.content, function(i,v){
                        brandsSelector += '<option value="'+v.code+'" category="'+v.newCategoryCode+'" user="'+v.userCode+'">'+v.name+'</option>';
                    });  
                }
            } 
        }
    });
}

function applyNewCategoryL(rid) {
    var ct = $('#levelShopListL #'+rid+' select option:selected').attr('category');
    var category = '';
    $.each($.parseJSON(sessionStorage.getItem("category")), function(h,u) {
        if(u.code == ct) {
            category = u.name;
        }
    });
    
    $('#levelShopListL #'+rid+' .new-category-code').text(category);
    
    var uc = $('#levelShopListL #'+rid+' select option:selected').attr('user');
    var user = '';
    $.each($.parseJSON(sessionStorage.getItem("users")), function(h,u) {
        if(u.code == uc) {
            user = u.name;
        }
    });
    
    $('#levelShopListL #'+rid+' .responsible-person').text(user);
}

function applyNewCategoryS(rid) {
    var ct = $('#levelShopListS #'+rid+' select option:selected').attr('category');
    var category = '';
    $.each($.parseJSON(sessionStorage.getItem("category")), function(h,u) {
        if(u.code == ct) {
            category = u.name;
        }
    });
    
    $('#levelShopListS #'+rid+' .new-category-code').text(category);
    
    var uc = $('#levelShopListS #'+rid+' select option:selected').attr('user');
    var user = '';
    $.each($.parseJSON(sessionStorage.getItem("users")), function(h,u) {
        if(u.code == uc) {
            user = u.name;
        }
    });
    
    $('#levelShopListS #'+rid+' .responsible-person').text(user);
}

function updateShopBrandL(i){
    var map = {
        code: $('#levelShopListL #row_'+i+' .save').attr('id').split('_')[1],
        userCode: $.cookie('login'),
        shopCode: i.split('_')[0],
        brandCode: $('#levelShopListL #row_'+i+' .brands-selector-L').val(),
        newCategoryCode: $('#levelShopListL #row_'+i+' .new-category-code').text() || null,
        backPushRent: numberWithoutCommas($('#levelShopListL #row_'+i+' .back-push-rent').val()) || null,
        backPushUnitRent: numberWithoutCommas($('#levelShopListL #row_'+i+' .back-push-unit-rent').val()) || null,
        guaranteeRent: numberWithoutCommas($('#levelShopListL #row_'+i+' .guarantee-rent').val()) || null,
        guaranteeUnitRent: numberWithoutCommas($('#levelShopListL #row_'+i+' .guarantee-unit-rent').val()) || null,
        higherDailyRent: numberWithoutCommas($('#levelShopListL #row_'+i+' .higher-daily-rent').val()) || null,
        higherRent: numberWithoutCommas($('#levelShopListL #row_'+i+' .higher-rent').val()) || null,
        predictFloatingRates: $('#levelShopListL #row_'+i+' .predict-floatin-rates').val() || null,
        predictSales: numberWithoutCommas($('#levelShopListL #row_'+i+' .predict-sales').val()) || null,
        targetConfirmDate: $('#levelShopListL #row_'+i+' .target-confirm-date').val() || null,
        targetContractSignedDate: $('#levelShopListL #row_'+i+' .target-contract-signed-date').val() || null,
        targetEnteringDate: $('#levelShopListL #row_'+i+' .target-entering-date').val() || null,
        targetHoardingDate: $('#levelShopListL #row_'+i+' .target-hoarding-date').val() || null,
        targetOpeningDate: $('#levelShopListL #row_'+i+' .target-opening-date').val() || null,
        userRemark: $('#levelShopListL #row_'+i+' .user-remark').val(),
        status: 1,
        floorCode: floorDesc
    };
    $.ajax({
        url: $.api.baseNew+"/onlineleasing-customer/api/shopBrand/update",
        type: "POST",
        data: JSON.stringify(map),
        async: false,
        dataType: "json",
        contentType: "application/json",
        beforeSend: function(request) {
            $('#levelShopListL #row_'+i+' .save').html('<i class="fa fa-spinner fa-spin"></i>');
            request.setRequestHeader("Login", $.cookie('login'));
            request.setRequestHeader("Authorization", $.cookie('authorization'));
            request.setRequestHeader("Lang", $.cookie('lang'));
            request.setRequestHeader("Source", "onlineleasing");
        },
        success: function (response, status, xhr) {
            if(response.code === 'C0') {
                $('#levelShopListL #row_'+i+' .save').html('<i class="fa fa-check"></i>');
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                }
                
                setTimeout(function () {
                    $('#levelShopListL #row_'+i+' .save').html('<i class="fa fa-save"></i>');
                },1000);
            } else {
                $('#levelShopListL #row_'+i+' .save').html('<i class="fa fa-remove"></i> 错误');
                setTimeout(function () {
                    $('#levelShopListL #row_'+i+' .save').html('<i class="fa fa-save"></i>');
                },1000);
            }
        }
    });
}

function updateShopBrandS(i){
    var map = {
        code: $('#levelShopListS #row_'+i+' .save').attr('id').split('_')[1],
        userCode: $.cookie('login'),
        shopCode: i.split('_')[0],
        brandCode: $('#levelShopListS #row_'+i+' .brands-selector-S').val(),
        newCategoryCode: $('#levelShopListS #row_'+i+' .new-category-code').text() || null,
        backPushRent: numberWithoutCommas($('#levelShopListS #row_'+i+' .back-push-rent').val()) || null,
        backPushUnitRent: numberWithoutCommas($('#levelShopListS #row_'+i+' .back-push-unit-rent').val()) || null,
        guaranteeRent: numberWithoutCommas($('#levelShopListS #row_'+i+' .guarantee-rent').val()) || null,
        guaranteeUnitRent: numberWithoutCommas($('#levelShopListS #row_'+i+' .guarantee-unit-rent').val()) || null,
        higherDailyRent: numberWithoutCommas($('#levelShopListS #row_'+i+' .higher-daily-rent').val()) || null,
        higherRent: numberWithoutCommas($('#levelShopListS #row_'+i+' .higher-rent').val()) || null,
        predictFloatingRates: $('#levelShopListS #row_'+i+' .predict-floatin-rates').val() || null,
        predictSales: numberWithoutCommas($('#levelShopListS #row_'+i+' .predict-sales').val()) || null,
        targetConfirmDate: $('#levelShopListS #row_'+i+' .target-confirm-date').val() || null,
        targetContractSignedDate: $('#levelShopListS #row_'+i+' .target-contract-signed-date').val() || null,
        targetEnteringDate: $('#levelShopListS #row_'+i+' .target-entering-date').val() || null,
        targetHoardingDate: $('#levelShopListS #row_'+i+' .target-hoarding-date').val() || null,
        targetOpeningDate: $('#levelShopListS #row_'+i+' .target-opening-date').val() || null,
        userRemark: $('#levelShopListS #row_'+i+' .user-remark').val(),
        status: 1,
        floorCode: floorDesc
    };
    $.ajax({
        url: $.api.baseNew+"/onlineleasing-customer/api/shopBrand/update",
        type: "POST",
        data: JSON.stringify(map),
        async: false,
        dataType: "json",
        contentType: "application/json",
        beforeSend: function(request) {
            $('#levelShopListS #row_'+i+' .save').html('<i class="fa fa-spinner fa-spin"></i>');
            request.setRequestHeader("Login", $.cookie('login'));
            request.setRequestHeader("Authorization", $.cookie('authorization'));
            request.setRequestHeader("Lang", $.cookie('lang'));
            request.setRequestHeader("Source", "onlineleasing");
        },
        success: function (response, status, xhr) {
            if(response.code === 'C0') {
                $('#levelShopListS #row_'+i+' .save').html('<i class="fa fa-check"></i>');
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                }
                
                setTimeout(function () {
                    $('#levelShopListS #row_'+i+' .save').html('<i class="fa fa-save"></i>');
                },1000);
            } else {
                $('#levelShopListS #row_'+i+' .save').html('<i class="fa fa-remove"></i> 错误');
                setTimeout(function () {
                    $('#levelShopListS #row_'+i+' .save').html('<i class="fa fa-save"></i>');
                },1000);
            }
        }
    })
}

function saveShopBrandL(i){
    if($('#levelShopListL #row_'+i+' .brands-selector-L').val() != ''){
        var map = {
            userCode: $('#levelShopListL #row_'+i+' .brands-selector-L option:selected').attr('user'),
            shopCode: i,
            brandCode: $('#levelShopListL #row_'+i+' .brands-selector-L').val(),
            newCategoryCode: $('#levelShopListL #row_'+i+' .new-category-code').text() || null,
            backPushRent: numberWithoutCommas($('#levelShopListL #row_'+i+' .back-push-rent').val()) || null,
            backPushUnitRent: numberWithoutCommas($('#levelShopListL #row_'+i+' .back-push-unit-rent').val()) || null,
            guaranteeRent: numberWithoutCommas($('#levelShopListL #row_'+i+' .guarantee-rent').val()) || null,
            guaranteeUnitRent: numberWithoutCommas($('#levelShopListL #row_'+i+' .guarantee-unit-rent').val()) || null,
            higherDailyRent: numberWithoutCommas($('#levelShopListL #row_'+i+' .higher-daily-rent').val()) || null,
            higherRent: numberWithoutCommas($('#levelShopListL #row_'+i+' .higher-rent').val()) || null,
            predictFloatingRates: $('#levelShopListL #row_'+i+' .predict-floatin-rates').val() || null,
            predictSales: numberWithoutCommas($('#levelShopListL #row_'+i+' .predict-sales').val()) || null,
            targetConfirmDate: $('#levelShopListL #row_'+i+' .target-confirm-date').val() || null,
            targetContractSignedDate: $('#levelShopListL #row_'+i+' .target-contract-signed-date').val() || null,
            targetEnteringDate: $('#levelShopListL #row_'+i+' .target-entering-date').val() || null,
            targetHoardingDate: $('#levelShopListL #row_'+i+' .target-hoarding-date').val() || null,
            targetOpeningDate: $('#levelShopListL #row_'+i+' .target-opening-date').val() || null,
            userRemark: $('#levelShopListL #row_'+i+' .user-remark').val(),
            status: 1,
            state: 1,
            floorCode: floorDesc
        };
        $.ajax({
            url: $.api.baseNew+"/onlineleasing-customer/api/shopBrand/save",
            type: "POST",
            data: JSON.stringify(map),
            async: false,
            dataType: "json",
            contentType: "application/json",
            beforeSend: function(request) {
                $('#levelShopListL #row_'+i+' .save').html('<i class="fa fa-spinner fa-spin"></i>');
                request.setRequestHeader("Login", $.cookie('login'));
                request.setRequestHeader("Authorization", $.cookie('authorization'));
                request.setRequestHeader("Lang", $.cookie('lang'));
                request.setRequestHeader("Source", "onlineleasing");
            },
            success: function (response, status, xhr) {
                if(response.code === 'C0') {
                    $('#levelShopListL #row_'+i+' .save').html('<i class="fa fa-check"></i>');
                    if(xhr.getResponseHeader("Authorization") !== null){
                        $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                    }

                    setTimeout(function () {
                        window.location.reload();
                    },1000);
                } else {
                    $('#levelShopListL #row_'+i+' .save').html('<i class="fa fa-remove"></i> 错误');
                    setTimeout(function () {
                        $('#levelShopListL #row_'+i+' .save').html('<i class="fa fa-save"></i>');
                    },1000);
                }
            }
        })
    } else {
        $('#levelShopListL #row_'+i+' .save').html('<i class="fa fa-exclamation-circle"></i> 品牌');
        setTimeout(function () {
            $('#levelShopListL #row_'+i+' .save').html('<i class="fa fa-save"></i>');
        },1000);
    }
}

function saveShopBrandS(i){
    if($('#levelShopListS #row_'+i+' .brands-selector-S').val() != ''){
        var map = {
            userCode: $('#levelShopListS #row_'+i+' .brands-selector-S option:selected').attr('user'),
            shopCode: i,
            brandCode: $('#levelShopListS #row_'+i+' .brands-selector-S').val(),
            newCategoryCode: $('#levelShopListS #row_'+i+' .new-category-code').text() || null,
            backPushRent: numberWithoutCommas($('#levelShopListS #row_'+i+' .back-push-rent').val()) || null,
            backPushUnitRent: numberWithoutCommas($('#levelShopListS #row_'+i+' .back-push-unit-rent').val()) || null,
            guaranteeRent: numberWithoutCommas($('#levelShopListS #row_'+i+' .guarantee-rent').val()) || null,
            guaranteeUnitRent: numberWithoutCommas($('#levelShopListS #row_'+i+' .guarantee-unit-rent').val()) || null,
            higherDailyRent: numberWithoutCommas($('#levelShopListS #row_'+i+' .higher-daily-rent').val()) || null,
            higherRent: numberWithoutCommas($('#levelShopListS #row_'+i+' .higher-rent').val()) || null,
            predictFloatingRates: $('#levelShopListS #row_'+i+' .predict-floatin-rates').val() || null,
            predictSales: numberWithoutCommas($('#levelShopListS #row_'+i+' .predict-sales').val()) || null,
            targetConfirmDate: $('#levelShopListS #row_'+i+' .target-confirm-date').val() || null,
            targetContractSignedDate: $('#levelShopListS #row_'+i+' .target-contract-signed-date').val() || null,
            targetEnteringDate: $('#levelShopListS #row_'+i+' .target-entering-date').val() || null,
            targetHoardingDate: $('#levelShopListS #row_'+i+' .target-hoarding-date').val() || null,
            targetOpeningDate: $('#levelShopListS #row_'+i+' .target-opening-date').val() || null,
            userRemark: $('#levelShopListS #row_'+i+' .user-remark').val(),
            status: 1,
            state: 1,
            floorCode: floorDesc
        };
        $.ajax({
            url: $.api.baseNew+"/onlineleasing-customer/api/shopBrand/save",
            type: "POST",
            data: JSON.stringify(map),
            async: false,
            dataType: "json",
            contentType: "application/json",
            beforeSend: function(request) {
                $('#levelShopListS #row_'+i+' .save').html('<i class="fa fa-spinner fa-spin"></i>');
                request.setRequestHeader("Login", $.cookie('login'));
                request.setRequestHeader("Authorization", $.cookie('authorization'));
                request.setRequestHeader("Lang", $.cookie('lang'));
                request.setRequestHeader("Source", "onlineleasing");
            },
            success: function (response, status, xhr) {
                if(response.code === 'C0') {
                    $('#levelShopListS #row_'+i+' .save').html('<i class="fa fa-check"></i>');
                    if(xhr.getResponseHeader("Authorization") !== null){
                        $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                    }

                    setTimeout(function () {
                        window.location.reload();
                    },1000);
                } else {
                    $('#levelShopListS #row_'+i+' .save').html('<i class="fa fa-remove"></i> 错误');
                    setTimeout(function () {
                        $('#levelShopListS #row_'+i+' .save').html('<i class="fa fa-save"></i>');
                    },1000);
                }
            }
        })
    } else {
        $('#levelShopListS #row_'+i+' .save').html('<i class="fa fa-exclamation-circle"></i> 品牌');
        setTimeout(function () {
            $('#levelShopListS #row_'+i+' .save').html('<i class="fa fa-save"></i>');
        },1000);
    }
}

function calBackPushRent(id,id2) {
    var backPushRent;
    if(numberWithoutCommas($('#'+id2+' #'+id).find('.predict-sales').val()) > 0 && $('#'+id2+' #'+id).find('.predict-floatin-rates').val() > 0){
        backPushRent = Math.round(numberWithoutCommas($('#'+id2+' #'+id).find('.predict-sales').val()) * $('#'+id2+' #'+id).find('.predict-floatin-rates').val() / 100);
        if(numberWithoutCommas($('#'+id2+' #'+id).find('.back-push-rent').val()) != backPushRent){
            $('#'+id2+' #'+id).find('.back-push-rent').fadeOut().fadeIn();
        }
        $('#'+id2+' #'+id).find('.back-push-rent').val(numberWithCommas(backPushRent));
    }
}

function calBackPushUnitRent(id,id2) {
    var backPushUnitRent;
    if(numberWithoutCommas($('#'+id2+' #'+id).find('.back-push-rent').val()) > 0 && $('.primary-rows.rows-'+id.split('_')[1]).find('.area').text() > 0){
        backPushUnitRent = Number(numberWithoutCommas($('#'+id2+' #'+id).find('.back-push-rent').val()) * 12 / 365 / $('.primary-rows.rows-'+id.split('_')[1]).find('.area').text()).toFixed(2);
        if(numberWithoutCommas($('#'+id2+' #'+id).find('.back-push-unit-rent').val()) != backPushUnitRent){
            $('#'+id2+' #'+id).find('.back-push-unit-rent').fadeOut().fadeIn();
        }
        $('#'+id2+' #'+id).find('.back-push-unit-rent').val(numberWithCommas(backPushUnitRent));
    }
}

function calGuaranteeRent(id,id2) {
    var guaranteeRent;
    if(numberWithoutCommas($('#'+id2+' #'+id).find('.guarantee-unit-rent').val()) > 0 && $('.primary-rows.rows-'+id.split('_')[1]).find('.area').text() > 0){
        guaranteeRent = Number(numberWithoutCommas($('#'+id2+' #'+id).find('.guarantee-unit-rent').val()) * $('.primary-rows.rows-'+id.split('_')[1]).find('.area').text() * 365 / 12).toFixed(2);
        if(numberWithoutCommas($('#'+id2+' #'+id).find('.guarantee-rent').val()) != guaranteeRent){
            $('#'+id2+' #'+id).find('.guarantee-rent').fadeOut().fadeIn();
        }
        $('#'+id2+' #'+id).find('.guarantee-rent').val(numberWithCommas(guaranteeRent));
    }
}

function calGuaranteeUnitRent(id,id2) {
    var guaranteeUnitRent;
    if(numberWithoutCommas($('#'+id2+' #'+id).find('.guarantee-rent').val()) > 0 && $('.primary-rows.rows-'+id.split('_')[1]).find('.area').text() > 0){
        guaranteeUnitRent = Number(numberWithoutCommas($('#'+id2+' #'+id).find('.guarantee-rent').val()) * 12 / 365 / $('.primary-rows.rows-'+id.split('_')[1]).find('.area').text()).toFixed(2);
        if(numberWithoutCommas($('#'+id2+' #'+id).find('.guarantee-unit-rent').val()) != guaranteeUnitRent){
            $('#'+id2+' #'+id).find('.guarantee-unit-rent').fadeOut().fadeIn();
        }
        $('#'+id2+' #'+id).find('.guarantee-unit-rent').val(numberWithCommas(guaranteeUnitRent));
    }
}

function calHigherRent(id,id2) {
    var higherRent;
    if(numberWithoutCommas($('#'+id2+' #'+id).find('.back-push-rent').val()) > 0 && numberWithoutCommas($('#'+id2+' #'+id).find('.guarantee-rent').val()) > 0){
        higherRent = Math.max(numberWithoutCommas($('#'+id2+' #'+id).find('.back-push-rent').val()),numberWithoutCommas($('#'+id2+' #'+id).find('.guarantee-rent').val()));
        if(numberWithoutCommas($('#'+id2+' #'+id).find('.higher-rent').val()) != higherRent){
            $('#'+id2+' #'+id).find('.higher-rent').fadeOut().fadeIn();
        }
        $('#'+id2+' #'+id).find('.higher-rent').val(numberWithCommas(higherRent));
    }
}

function calHigherDailyRent(id,id2) {
    var higherDailyRent;
    if(numberWithoutCommas($('#'+id2+' #'+id).find('.back-push-unit-rent').val()) > 0 && numberWithoutCommas($('#'+id2+' #'+id).find('.guarantee-unit-rent').val()) > 0){
        higherDailyRent = Math.max(numberWithoutCommas($('#'+id2+' #'+id).find('.back-push-unit-rent').val()),numberWithoutCommas($('#'+id2+' #'+id).find('.guarantee-unit-rent').val()));
        if(numberWithoutCommas($('#'+id2+' #'+id).find('.higher-daily-rent').val()) != higherDailyRent){
            $('#'+id2+' #'+id).find('.higher-daily-rent').fadeOut().fadeIn();
        }
        $('#'+id2+' #'+id).find('.higher-daily-rent').val(numberWithCommas(higherDailyRent));
    }
}

function scrollHandle() {
    var scrollTop = $('.fixed-table-body').scrollTop();
    // 当滚动距离大于0时设置top及相应的样式
    if (scrollTop > 0) {
        $('.fixed-table-body tr th').css({
            "top": scrollTop + 'px',
            "marginTop": "-1px",
            "padding": 0
        });
    } else {
    // 当滚动距离小于0时设置top及相应的样式
         $('.fixed-table-body tr th').css({
            "top": scrollTop + 'px',
            "marginTop": 0
        });
    }
    
    var scrollLeft = $('.fixed-table-body').scrollLeft();
    // 当滚动距离大于0时设置left及相应的样式
    if (scrollLeft > 275) {
        $('.fixed-table-body tr th:eq(0), .fixed-table-body tr th:eq(1), .fixed-table-body tr th:eq(2)').css({
            "left": scrollLeft + 'px',
            "marginLeft": "-1px",
            "padding": 0
        });
        
        $('.primary-rows').each(function() {
            $(this).find("td:eq(0),td:eq(1),td:eq(2)").css({
                "position": "relative",
                "left": scrollLeft + 'px',
                "marginLeft": "-1px",
                "padding": 0
            });
        })
    } else {
    // 当滚动距离小于0时设置left及相应的样式
         $('.fixed-table-body tr th:eq(0), .fixed-table-body tr th:eq(1), .fixed-table-body tr th:eq(2)').css({
            "left": scrollLeft + 'px',
            "marginLeft": 0
        });
        
        $('.primary-rows').each(function() {
            $(this).find("td:eq(0),td:eq(1),td:eq(2)").css({
                "left": scrollLeft + 'px',
                "marginLeft": 0
            });
        })
    }
}