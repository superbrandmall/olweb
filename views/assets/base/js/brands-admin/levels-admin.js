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
    
    var size = 1;
    $('#zoom_in').click(function (){
        size = size + 0.5;
        $('#map').mapster('resize', size*($('#map_canvas').width()), 0, 0);
        addTextLayer();
        
        $('#zoom_out').attr('disabled', false);
        if(size >= 3){
            $(this).attr('disabled', true);
        } else {
            $(this).attr('disabled', false);
        }
    });
    
    $('#zoom_out').click(function (){
        size = size - 0.5;
        $('#map').mapster('resize', size*($('#map_canvas').width()), 0, 0);
        addTextLayer();
        
        $('#zoom_in').attr('disabled', false);
        if(size <= 1){
            $(this).attr('disabled', true);
        } else {
            $(this).attr('disabled', false);
        }
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
    
    $(".brands-selector").change(function () {
        if($(this).val() != ''){
            applyNewCategory($(this).parents('tr').attr('id'));
        }
    });
    
    /********************* Start of calculation *************************/
    
    $('.predict-sales').blur(function(){
        $(this).val(numberWithCommas(numberWithoutCommas($(this).val())));
        calBackPushRent();
        calBackPushUnitRent();
        calHigherRent();
        calHigherDailyRent();
    });
    
    $('.predict-floatin-rates').blur(function(){
        calBackPushRent();
        calBackPushUnitRent();
        calHigherRent();
        calHigherDailyRent();
    });
    
    $('.guarantee-unit-rent').blur(function(){
        calGuaranteeRent();
        calHigherRent();
        calHigherDailyRent();
    });
    
    $('.guarantee-rent').blur(function(){
        $(this).val(numberWithCommas(numberWithoutCommas($(this).val())));
        calGuaranteeUnitRent();
        calHigherRent();
        calHigherDailyRent();
    });
    
    /********************* End of calculation *************************/
});

$(function() {
    window.addEventListener("resize",function(){
        $('#map').mapster('resize', 1*($('#map_canvas').width()), 0, 0);
        addTextLayer();
    });
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
                            $('map').append('<area data-key="'+v.unit+'" alt="'+v.code+'" data-full="'+v.shopState+'" data-responsible-person="'+v.responsiblePerson+'" data-category-head="'+v.categoryHead+'" data-area="'+v.area+'" name="'+(v.brandName || '')+'" href=\'javascript: JumpToShopList("'+v.code+'");\' shape="poly" coords="'+v.coords+'" />'); 
                        } else {
                            $('map').append('<area data-key="'+v.unit+'" alt="'+v.code+'" data-full="'+v.shopState+'" data-responsible-person="'+v.responsiblePerson+'" data-category-head="'+v.categoryHead+'" data-area="'+v.area+'" name="'+(v.brandName || '')+'" shape="poly" coords="'+v.coords+'" />'); 
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
    
    addTextLayer();
}

function addTextLayer(){
    $('map span').remove();
    if(document.body.clientWidth > 1000){
        setTimeout(function () {
            var pos, brand;
            $('map area').each(function(i,elem){
                if($(this).attr('data-full') == 0 || $(this).attr('data-full') == 2){
                    pos = $(this).attr('coords').split(',');
                    var x = 0;
                    var posLeftMin = parseInt(pos[0]), posLeftMax = parseInt(pos[0]), posLeft, width;
                    while(x < pos.length){
                        if(parseInt(pos[x]) < posLeftMin){
                            posLeftMin = parseInt(pos[x]);
                        } 

                        if(parseInt(pos[x]) > posLeftMax){
                            posLeftMax = parseInt(pos[x]);
                        }
                        x = x + 2;
                    }
                    posLeft = parseInt((posLeftMin + posLeftMax) / 2);
                    width = parseInt(posLeftMax - posLeftMin);

                    var y = 1;
                    var posTopMin = parseInt(pos[1]), posTopMax = parseInt(pos[1]), posTop;
                    while(y < pos.length){
                        if(parseInt(pos[y]) < posTopMin){
                            posTopMin = parseInt(pos[y]);
                        }
                        if(parseInt(pos[y]) > posTopMax){
                            posTopMax = parseInt(pos[y]);
                        }
                        y = y + 2;
                    }
                    if(i % 2 == 0){
                        posTop = parseInt((posTopMin + posTopMax) / 2 - 10);
                    } else {
                        posTop = parseInt((posTopMin + posTopMax) / 2);
                    }
                    
                    brand = $(this).attr('name');
                    
                    var fontSize = 7;
                    if($(this).attr('data-area') < 25){
                        fontSize = 5;
                    } else if($(this).attr('data-area') >= 25 && $(this).attr('data-area') < 100){
                        fontSize = 6;
                    } else if($(this).attr('data-area') >= 100 && $(this).attr('data-area') < 200){
                        fontSize = 7;
                    } else if($(this).attr('data-area') >= 200 && $(this).attr('data-area') < 300){
                        fontSize = 8;
                    } else if($(this).attr('data-area') >= 300 && $(this).attr('data-area') < 400){
                        fontSize = 9;
                    } else if($(this).attr('data-area') >= 400 && $(this).attr('data-area') < 500){
                        fontSize = 10;
                    } else if($(this).attr('data-area') >= 500 && $(this).attr('data-area') < 600){
                        fontSize = 11;
                    } else if($(this).attr('data-area') >= 600 && $(this).attr('data-area') < 700){
                        fontSize = 12;
                    } else if($(this).attr('data-area') >= 700){
                        fontSize = 13;
                    }
                    
                    $(this).after(
                        '<span style="position:absolute; left:'+posLeft+'px; top:'+posTop+'px; width: '+width+'px; font-size: '+fontSize+'px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">'+brand+'</span>'
                    );
                }
            });
        },1000);
    }
}

function JumpToShopList(sc){
    $('td').removeClass('dark-layer');
    /*var sTop = $('#row_'+sc).offset().top - 550;
    var nowScrollTop = $('.fixed-table-body').scrollTop();

    $('html, body').animate({
        scrollTop: $('.fixed-table-body').offset().top
    }, 0);

    $('.fixed-table-body').stop(true).animate({
        scrollTop: sTop + nowScrollTop
    }, 0);*/
    
    $('.rows-'+sc+' td').addClass('dark-layer');
    
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
                    $('#store_img').html('<img src="'+images[0].image+'" style="width: auto; height: 100%;" />');
                } else {
                    $('#store_img').html('');
                }
                
                $('#store_img_2').find('img').remove();
                if(shop.vrValidated === 1) {
                    if(shop.shopState === 1 && shop.brandToSign != null && shop.brandToSign != ''){
                        $('#store_vr').hide();
                        if(images != null && images.length > 1) {
                            $('#store_img_2').show().append('<img src="'+images[1].image+'" style="width: auto; height: 100%;" />');
                        }
                    } else {
                        $('#store_img_2').hide();
                        $('#store_vr').show();
                        $('#store_vr iframe').attr('src','/'+shop.vr);
                    }
                } else {
                    $('#store_vr').hide();
                    if(images != null && images.length > 1) {
                         $('#store_img_2').show().append('<img src="'+images[1].image+'" style="width: auto; height: 100%;" />');
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
                    $('#levelShopList').append('\
    <tr style="border-left: 20px solid '+bg+'" id="row_'+v.code+'" class="rows-'+v.code+' primary-rows">\n\
    <td rowspan="1" style="vertical-align: middle;">'+v.shopName+'</td>\n\
    <td rowspan="1" style="vertical-align: middle;"><span class="area">'+v.area+'</span>m<sup>2</sup></td>\n\
    <td rowspan="1" style="vertical-align: middle;">'+(v.brandName || '')+'</td>\n\
    <td><i class="fa fa-plus"></i><select class="brands-selector" style="font-weight: bold; background: transparent; text-align: center;">'+brandsSelector+'</select></td>\n\
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
    <td><a href=\'javascript: saveShopBrand("'+v.code+'");\' class="save btn btn-danger btn-xs"><i class="fa fa-save"></i></a></td>\n\
    </tr>'); 
                } else {
                    $('#levelShopList2').append('\
    <tr style="border-left: 20px solid '+bg+'" id="row_'+v.code+'" class="rows-'+v.code+' primary-rows">\n\
    <td style="vertical-align: middle;">'+v.shopName+'</td>\n\
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
                        rows = $('#row_'+v.shopCode+' td:eq(0)').attr('rowSpan');
                        rows++;
                        for(var j=0;j<3;j++){
                            $('#row_'+v.shopCode+' td:eq('+j+')').attr('rowSpan',rows);
                        }
                        
                        bg = $('#row_'+v.shopCode).css('borderLeftColor');
                        
                        var user = '';
                        $.each($.parseJSON(sessionStorage.getItem("users")), function(h,u) {
                            if(u.code == v.userCode) {
                                user = u.name;
                            }
                        });
                        
                        $('<tr id="row_'+v.shopCode+'_'+i+'" class="rows-'+v.shopCode+'" style="border-left: 20px solid '+bg+'">\n\
                            <td><select class="brands-selector" style="font-weight: bold; background: transparent; text-align: center;">'+brandsSelector+'</select></td>\n\
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
\                           <td><a id="save_'+v.code+'" href=\'javascript: updateShopBrand("'+v.shopCode+'_'+i+'");\' class="save btn btn-danger btn-xs"><i class="fa fa-save"></i></a></td>\n\
                            </tr>').insertAfter('#row_'+v.shopCode);
                        
                        $('#row_'+v.shopCode).next('tr').find('td').find('.brands-selector').val(v.brandCode);
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

function applyNewCategory(rid) {
    var ct = $('#'+rid+' select option:selected').attr('category');
    var category = '';
    $.each($.parseJSON(sessionStorage.getItem("category")), function(h,u) {
        if(u.code == ct) {
            category = u.name;
        }
    });
    
    $('#'+rid+' .new-category-code').text(category);
    
    var uc = $('#'+rid+' select option:selected').attr('user');
    var user = '';
    $.each($.parseJSON(sessionStorage.getItem("users")), function(h,u) {
        if(u.code == uc) {
            user = u.name;
        }
    });
    
    $('#'+rid+' .responsible-person').text(user);
}

function updateShopBrand(i){
    var map = {
        code: $('#row_'+i+' .save').attr('id').split('_')[1],
        userCode: $.cookie('login'),
        shopCode: i.split('_')[0],
        brandCode: $('#row_'+i+' .brands-selector').val(),
        newCategoryCode: $('#row_'+i+' .new-category-code').text() || null,
        backPushRent: numberWithoutCommas($('#row_'+i+' .back-push-rent').val()) || null,
        backPushUnitRent: numberWithoutCommas($('#row_'+i+' .back-push-unit-rent').val()) || null,
        guaranteeRent: numberWithoutCommas($('#row_'+i+' .guarantee-rent').val()) || null,
        guaranteeUnitRent: numberWithoutCommas($('#row_'+i+' .guarantee-unit-rent').val()) || null,
        higherDailyRent: numberWithoutCommas($('#row_'+i+' .higher-daily-rent').val()) || null,
        higherRent: numberWithoutCommas($('#row_'+i+' .higher-rent').val()) || null,
        predictFloatingRates: $('#row_'+i+' .predict-floatin-rates').val() || null,
        predictSales: numberWithoutCommas($('#row_'+i+' .predict-sales').val()) || null,
        targetConfirmDate: $('#row_'+i+' .target-confirm-date').val() || null,
        targetContractSignedDate: $('#row_'+i+' .target-contract-signed-date').val() || null,
        targetEnteringDate: $('#row_'+i+' .target-entering-date').val() || null,
        targetHoardingDate: $('#row_'+i+' .target-hoarding-date').val() || null,
        targetOpeningDate: $('#row_'+i+' .target-opening-date').val() || null,
        userRemark: $('#row_'+i+' .user-remark').val(),
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
            $('#row_'+i+' .save').html('<i class="fa fa-spinner fa-spin"></i>');
            request.setRequestHeader("Login", $.cookie('login'));
            request.setRequestHeader("Authorization", $.cookie('authorization'));
            request.setRequestHeader("Lang", $.cookie('lang'));
            request.setRequestHeader("Source", "onlineleasing");
        },
        success: function (response, status, xhr) {
            if(response.code === 'C0') {
                $('#row_'+i+' .save').html('<i class="fa fa-check"></i>');
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                }
                
                setTimeout(function () {
                    $('#row_'+i+' .save').html('<i class="fa fa-save"></i>');
                },1000);
            } else {
                $('#row_'+i+' .save').html('<i class="fa fa-remove"></i> 错误');
                setTimeout(function () {
                    $('#row_'+i+' .save').html('<i class="fa fa-save"></i>');
                },1000);
            }
        }
    })
}

function saveShopBrand(i){
    if($('#row_'+i+' .brands-selector').val() != ''){
        var map = {
            userCode: $('#row_'+i+' .brands-selector option:selected').attr('user'),
            shopCode: i,
            brandCode: $('#row_'+i+' .brands-selector').val(),
            newCategoryCode: $('#row_'+i+' .new-category-code').text() || null,
            backPushRent: numberWithoutCommas($('#row_'+i+' .back-push-rent').val()) || null,
            backPushUnitRent: numberWithoutCommas($('#row_'+i+' .back-push-unit-rent').val()) || null,
            guaranteeRent: numberWithoutCommas($('#row_'+i+' .guarantee-rent').val()) || null,
            guaranteeUnitRent: numberWithoutCommas($('#row_'+i+' .guarantee-unit-rent').val()) || null,
            higherDailyRent: numberWithoutCommas($('#row_'+i+' .higher-daily-rent').val()) || null,
            higherRent: numberWithoutCommas($('#row_'+i+' .higher-rent').val()) || null,
            predictFloatingRates: $('#row_'+i+' .predict-floatin-rates').val() || null,
            predictSales: numberWithoutCommas($('#row_'+i+' .predict-sales').val()) || null,
            targetConfirmDate: $('#row_'+i+' .target-confirm-date').val() || null,
            targetContractSignedDate: $('#row_'+i+' .target-contract-signed-date').val() || null,
            targetEnteringDate: $('#row_'+i+' .target-entering-date').val() || null,
            targetHoardingDate: $('#row_'+i+' .target-hoarding-date').val() || null,
            targetOpeningDate: $('#row_'+i+' .target-opening-date').val() || null,
            userRemark: $('#row_'+i+' .user-remark').val(),
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
                $('#row_'+i+' .save').html('<i class="fa fa-spinner fa-spin"></i>');
                request.setRequestHeader("Login", $.cookie('login'));
                request.setRequestHeader("Authorization", $.cookie('authorization'));
                request.setRequestHeader("Lang", $.cookie('lang'));
                request.setRequestHeader("Source", "onlineleasing");
            },
            success: function (response, status, xhr) {
                if(response.code === 'C0') {
                    $('#row_'+i+' .save').html('<i class="fa fa-check"></i>');
                    if(xhr.getResponseHeader("Authorization") !== null){
                        $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                    }

                    setTimeout(function () {
                        $('#row_'+i+' .save').html('<i class="fa fa-save"></i>');
                    },1000);
                } else {
                    $('#row_'+i+' .save').html('<i class="fa fa-remove"></i> 错误');
                    setTimeout(function () {
                        $('#row_'+i+' .save').html('<i class="fa fa-save"></i>');
                    },1000);
                }
            }
        })
    } else {
        $('#row_'+i+' .save').html('<i class="fa fa-exclamation-circle"></i> 品牌');
        setTimeout(function () {
            $('#row_'+i+' .save').html('<i class="fa fa-save"></i>');
        },1000);
    }
}

function calBackPushRent() {
    var backPushRent;
    $('tbody tr').each(function(i){
        if(numberWithoutCommas($(this).find('.predict-sales').val()) > 0 && $(this).find('.predict-floatin-rates').val() > 0){
            backPushRent = Math.round(numberWithoutCommas($(this).find('.predict-sales').val()) * $(this).find('.predict-floatin-rates').val() / 100);
            if(numberWithoutCommas($(this).find('.back-push-rent').val()) != backPushRent){
                $(this).find('.back-push-rent').fadeOut().fadeIn();
            }
            $(this).find('.back-push-rent').val(numberWithCommas(backPushRent));
        }
    });
}

function calBackPushUnitRent() {
    var backPushUnitRent;
    $('tbody tr').each(function(i){
        if(numberWithoutCommas($(this).find('.back-push-rent').val()) > 0 && $('.primary-rows.'+$(this).attr('class').split(' ')[0]).find('.area').text() > 0){
            backPushUnitRent = Number(numberWithoutCommas($(this).find('.back-push-rent').val()) * 12 / 365 / $('.primary-rows.'+$(this).attr('class').split(' ')[0]).find('.area').text()).toFixed(2);
            if(numberWithoutCommas($(this).find('.back-push-unit-rent').val()) != backPushUnitRent){
                $(this).find('.back-push-unit-rent').fadeOut().fadeIn();
            }
            $(this).find('.back-push-unit-rent').val(numberWithCommas(backPushUnitRent));
        }
    });
}

function calGuaranteeRent() {
    var guaranteeRent;
    $('tbody tr').each(function(i){
        if(numberWithoutCommas($(this).find('.guarantee-unit-rent').val()) > 0 && $('.primary-rows.'+$(this).attr('class').split(' ')[0]).find('.area').text() > 0){
            guaranteeRent = Number(numberWithoutCommas($(this).find('.guarantee-unit-rent').val()) * $('.primary-rows.'+$(this).attr('class').split(' ')[0]).find('.area').text() * 365 / 12).toFixed(2);
            if(numberWithoutCommas($(this).find('.guarantee-rent').val()) != guaranteeRent){
                $(this).find('.guarantee-rent').fadeOut().fadeIn();
            }
            $(this).find('.guarantee-rent').val(numberWithCommas(guaranteeRent));
        }
    });
}

function calGuaranteeUnitRent() {
    var guaranteeUnitRent;
    $('tbody tr').each(function(i){
        if(numberWithoutCommas($(this).find('.guarantee-rent').val()) > 0 && $('.primary-rows.'+$(this).attr('class').split(' ')[0]).find('.area').text() > 0){
            guaranteeUnitRent = Number(numberWithoutCommas($(this).find('.guarantee-rent').val()) * 12 / 365 / $('.primary-rows.'+$(this).attr('class').split(' ')[0]).find('.area').text()).toFixed(2);
            if(numberWithoutCommas($(this).find('.guarantee-unit-rent').val()) != guaranteeUnitRent){
                $(this).find('.guarantee-unit-rent').fadeOut().fadeIn();
            }
            $(this).find('.guarantee-unit-rent').val(numberWithCommas(guaranteeUnitRent));
        }
    });
}

function calHigherRent() {
    var higherRent;
    $('tbody tr').each(function(i){
        if(numberWithoutCommas($(this).find('.back-push-rent').val()) > 0 && numberWithoutCommas($(this).find('.guarantee-rent').val()) > 0){
            higherRent = Math.max(numberWithoutCommas($(this).find('.back-push-rent').val()),numberWithoutCommas($(this).find('.guarantee-rent').val()));
            if(numberWithoutCommas($(this).find('.higher-rent').val()) != higherRent){
                $(this).find('.higher-rent').fadeOut().fadeIn();
            }
            $(this).find('.higher-rent').val(numberWithCommas(higherRent));
        }
    });
}

function calHigherDailyRent() {
    var higherDailyRent;
    $('tbody tr').each(function(i){
        if(numberWithoutCommas($(this).find('.back-push-unit-rent').val()) > 0 && numberWithoutCommas($(this).find('.guarantee-unit-rent').val()) > 0){
            higherDailyRent = Math.max(numberWithoutCommas($(this).find('.back-push-unit-rent').val()),numberWithoutCommas($(this).find('.guarantee-unit-rent').val()));
            if(numberWithoutCommas($(this).find('.higher-daily-rent').val()) != higherDailyRent){
                $(this).find('.higher-daily-rent').fadeOut().fadeIn();
            }
            $(this).find('.higher-daily-rent').val(numberWithCommas(higherDailyRent));
        }
    });
}