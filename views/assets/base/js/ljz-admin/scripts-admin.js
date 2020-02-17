$.api = {
    base: "http://10.130.12.15:8080/oldataservice/ol/api",
    baseNew: $.base,
    emailVC: "",
    mobileVC: ""
};

var d = new Date();
var month = d.getMonth()+1;
var day = d.getDate();
var date = d.getFullYear() + '-' +
    (month<10 ? '0' : '') + month + '-' +
    (day<10 ? '0' : '') + day;

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
    
    if (!sessionStorage.getItem("users") || sessionStorage.getItem("users") == null || sessionStorage.getItem("users") == '') {
        getUsers();
    }

    var floorDesc, floor = '1F';
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
            case '9':
                floorDesc = '九楼';
                floor = 'L9';
                break;
            default:
                floorDesc = [];
                floor = 'L1';
                break;
        }

        $('#nav_f_'+getURLParameter('f')).addClass('active');

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
        
        if($('#nav_summary').hasClass('active') == false){
            $('#nav_f_1').addClass('active');
        }
        
        getShopFloorInfo('一楼');
    }

    $('#floorNo').text(floor);

    if(getURLParameter('expire') && getURLParameter('expire') != '') {
        $('input[name=daysBeforeExpiration][value='+getURLParameter('expire')+']').attr('checked',true);
    } else {
        $('input[name=daysBeforeExpiration]').eq(0).prop('checked',true);
    }

    $('input[name=daysBeforeExpiration]').change(function() {
        var exp = $('input[name=daysBeforeExpiration]:checked').val();
        insertParam('expire',exp);
    });
    
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
    
});

$(function() {
    $('#side-menu').metisMenu();
});

//Loads the correct sidebar on window load,
//collapses the sidebar on window resize.
$(function() {
    $(window).bind("load resize", function() {
        console.log($(this).width());
        if ($(this).width() < 768) {
            $('div.sidebar-collapse').addClass('collapse');
        } else {
            $('div.sidebar-collapse').removeClass('collapse');
        }
    });
    
    window.addEventListener("resize",function(){
        $('#map').mapster('resize', 0.85*($(window).width()), 0, 0);
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
                var stores = 0;
                var stores_0 = 0;
                var stores_1 = 0;
                var stores_2 = 0;
                var stores_3 = 0;

                /*if(!getURLParameter('id') || getURLParameter('id') == '') {
                    $('#shops_info').html('<div class="col-sm-12"><div class="table-responsive"><table class="table table-hover table-striped"><tbody></tbody></table></div></div>');
                }*/

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

                        /*if(v.brandName != null && v.brandName != '' && v.coords != null && v.coords != '' && (v.shopState == 0 || v.shopState == 2)) {
                            if(itm % 2 == 0){
                                $('#shops_info tbody').append('<tr><td><a href="/ljz-admin/?f='+(getURLParameter('f') || '1')+'&id='+v.code+'">'+v.brandName+'</a></td></tr>');
                            } else {
                                $('#shops_info tbody').find('tr').last().append('<td><a href="/ljz-admin/?f='+(getURLParameter('f') || '1')+'&id='+v.code+'">'+v.brandName+'</a></td>');
                            }
                            itm++;
                        }*/
                    }

                    if((v.subType == '正柜' || v.subType == 'THEAT') && v.coords != null && v.coords != '' && v.state != 0){
                        $('map').append('<area data-key="'+v.unit+'" alt="'+v.code+'" data-full="'+v.shopState+'" data-modality="'+v.modality+'" data-area="'+v.area+'" data-shop-name="'+v.shopName+'" name="'+(v.brandName || '')+'" href=\'javascript: GetShopInfo("'+v.code+'");\' shape="poly" coords="'+v.coords+'" />'); 
                    }
                });

                $('#leased').text(Math.round(stores_0/stores*100) || '0');
                $('#to_be_lease').text(Math.round(stores_2/stores*100) || '0');
                $('#renovation').text(Math.round(stores_3/stores*100) || '0');
                $('#empty').text(Math.round(100-$('#leased').text()-$('#to_be_lease').text()-$('#renovation').text()));

                if(getURLParameter('f') && getURLParameter('f') == '10'){
                    $('#renovation').text('100');
                    $('#leased').text('0');
                }
                
                drawShops();
            } else {
                interpretBusinessCode(response.customerMessage);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}
    
function drawShops(){
    var areas = $.map($('area'),function(el) {
        if(getURLParameter('id') === $(el).attr('alt')){
            return { 
                key: $(el).attr('data-key'),
                toolTip: '本店铺',
                fillColor: '3c763d',
                fillOpacity: 1,
                stroke: false,
                selected: true 
            };
        } else {
            if($(el).attr('data-full') == 0){
                return { 
                    key: $(el).attr('data-key'),
                    toolTip: $(el).attr('name'),
                    fillColor: '7d9fe9',
                    selected: true,
                    stroke: true,
                    strokeColor: '6a90e1'
                };
            } else if($(el).attr('data-full') == 1){
                return { 
                    key: $(el).attr('data-key'),
                    toolTip: '空铺',
                    fillColor: 'FE9E9E',
                    selected: true,
                    stroke: true,
                    strokeColor: 'FE9E9E'
                };
            } else if($(el).attr('data-full') == 2){
                return { 
                    key: $(el).attr('data-key'),
                    toolTip: $(el).attr('name'),
                    fillColor: 'FEED99',
                    selected: true,
                    stroke: true,
                    strokeColor: 'FEED99'
                };
            } else if($(el).attr('data-full') == 3){
                return { 
                    key: $(el).attr('data-key'),
                    toolTip: '改造中',
                    fillColor: 'D5C8AA',
                    selected: true,
                    stroke: true,
                    strokeColor: 'D5C8AA'
                };
            }
            
        }
    });
    
    var xOffset;
    var yOffset;

    $('#map').mapster({
        fillColor: 'c9ae89',
        fillOpacity: 0.8,
        strokeColor: 'ffd62c',
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
        if ($(divWord).width() > maxWidth || $(divWord).height() > maxHeight) {
            $(divWord).css({
                'font-size': i + 'px',
                'left': parseInt(posLeftMin - ($(divWord).width() - maxWidth) / 2 + 6) + 'px',
                'top': parseInt(posTopMin - ($(divWord).height() - maxHeight) / 2 + 6) + 'px'    
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
                $.shop = shop;
                var coords = shop.coords;
                $.coords = coords || '';
                var images = shop.images;
                $.images = images;
                
                
                var brandName = shop.brandName;
                if(shop.shopState == 1 || shop.shopState == 3){
                    if(shop.brandToSign != null && shop.brandToSign != ''){
                        brandName = shop.brandToSign;
                        $('#brand_name').css('color','#f00');
                    } else {
                        $('#brand_name').css('color','#fff');
                    }
                } else {
                    $('#brand_name').css('color','#fff');
                }
                $('#brand_name').text(brandName || '-');
                
                var contractExpire,contractExpireYear,contractExpireMonth,contractExpireDate;
                if(shop.contractExpireDate != null){
                    contractExpire = new Date();
                    contractExpire.setTime(shop.contractExpireDate);
                    contractExpireYear = contractExpire.getFullYear('yyyy');
                    contractExpireMonth = contractExpire.getMonth('mm')+1;
                    if(contractExpireMonth < 10) {
                        contractExpireMonth = "0"+contractExpireMonth;
                    }
                    contractExpireDate = contractExpire.getDate('dd');
                    if(contractExpireDate < 10) {
                        contractExpireDate = "0"+contractExpireDate;
                    }
                    
                    $('#contract_expire_date').text(contractExpireYear+'-'+contractExpireMonth+'-'+contractExpireDate);
                }

                var state;
                var shopStateClass = 'badge-default';
                switch(shop.shopState){
                    case 0:
                        state = "Leased";
                        break;
                    case 1:
                        state = "Vacancy";
                        shopStateClass = 'badge-danger';
                        break;
                    case 2:
                        state = "Expiring";
                        shopStateClass = 'badge-warning';
                        break;
                    case 3:
                        state = "Renovation";
                        shopStateClass = 'badge-renovation';
                        break;
                    default:
                        state = "Leased";
                        shopStateClass = 'badge-default';
                        break;
                }
                
                $('#brand_name').append(' <span class="badge '+shopStateClass+'">'+state+'</span>');
                
                $('#rent').text((shop.deadRent || '-' ) + ' yuan/m²/day');
                $('#float_rent').text((Math.round(shop.floatingRentalRate * 100) || '-' ) + '%');
                
                $('#area').text((shop.area || '-' ) + ' m²');
                
                if(shop.brandName != null && shop.brandName != '') {
                    if(shop.shopState == 1) {
                        showShopSales(shop.brandName,'100001A'+shop.unit,contractExpireYear+((contractExpireMonth<10 ? '0' : '') + contractExpireMonth+((contractExpireDate<10 ? '0' : '') + contractExpireDate)));
                    } else {
                        showShopSales(shop.brandName,'100001A'+shop.unit,DecrDates(date,2));
                    }
                } else {
                    $('#weeks').text('4');
                }
                
                if(shop.signUpDate != null){
                    var signUp = new Date();
                    signUp.setTime(shop.signUpDate);
                    var signUpYear = signUp.getFullYear('yyyy');
                    var signUpMonth = signUp.getMonth('mm')+1;
                    if(signUpMonth < 10) {
                        signUpMonth = "0"+signUpMonth;
                    }
                    var signUpDate = signUp.getDate('dd');
                    if(signUpDate < 10) {
                        signUpDate = "0"+signUpDate;
                    }

                    $('#sign_up_date').text(signUpYear+'-'+signUpMonth+'-'+signUpDate);
                } else {
                    $('#sign_up_date').text('-');
                }
                if(shop.hoardingDate != null){
                    var hoarding = new Date();
                    hoarding.setTime(shop.hoardingDate);
                    var hoardingYear = hoarding.getFullYear('yyyy');
                    var hoardingMonth = hoarding.getMonth('mm')+1;
                    if(hoardingMonth < 10) {
                        hoardingMonth = "0"+hoardingMonth;
                    }
                    var hoardingDate = hoarding.getDate('dd');
                    if(hoardingDate < 10) {
                        hoardingDate = "0"+hoardingDate;
                    }

                    $('#hoarding_date').text(hoardingYear+'-'+hoardingMonth+'-'+hoardingDate);
                } else {
                    $('#hoarding_date').text('-');
                }

                if(shop.enteringDate != null){
                    var entering = new Date();
                    entering.setTime(shop.enteringDate);
                    var enteringYear = entering.getFullYear('yyyy');
                    var enteringMonth = entering.getMonth('mm')+1;
                    if(enteringMonth < 10) {
                        enteringMonth = "0"+enteringMonth;
                    }
                    var enteringDate = entering.getDate('dd');
                    if(enteringDate < 10) {
                        enteringDate = "0"+enteringDate;
                    }

                    $('#entering_date').text(enteringYear+'-'+enteringMonth+'-'+enteringDate);
                } else {
                    $('#entering_date').text('-');
                }
                if(shop.openingDate != null){
                    var opening = new Date();
                    opening.setTime(shop.openingDate);
                    var openingYear = opening.getFullYear('yyyy');
                    var openingMonth = opening.getMonth('mm')+1;
                    if(openingMonth < 10) {
                        openingMonth = "0"+openingMonth;
                    }
                    var openingDate = opening.getDate('dd');
                    if(openingDate < 10) {
                        openingDate = "0"+openingDate;
                    }

                    $('#opening_date').text(openingYear+'-'+openingMonth+'-'+openingDate);
                } else {
                    $('#opening_date').text('-');
                }
                
                /*if(shop.remark_1 != null){
                    $('#plan_open_date').text(shop.remark_1);
                } else {
                    $('#plan_open_date').text('-');
                }*/
                
                if(shop.responsiblePerson != null){
                    var user = '-';
                    $.each($.parseJSON(sessionStorage.getItem("users")), function(h,u) {
                        if(u.code == shop.responsiblePerson) {
                            user = u.name;
                        }
                    });
                
                    $('#responsible_person').text(user);
                } else {
                    $('#responsible_person').text('-');
                }
                
                
                
                
                /*if(shop.remark_2 != null){
                    $('#loss').text((numberWithCommas(shop.remark_2) || 0 ) + '元');
                    if(shop.remark_2 != 0){
                        $('#loss').css('color','#f00');
                    }
                } else {
                    $('#loss').text('-').css('color','#333');
                }*/
                
                if(images != null && images.length > 0) {
                    $('#store_img').html('<img src="'+images[0].image+'" style="width: 100%;" />');
                } else {
                    $('#store_img').html('');
                }
                
                $('#store_vr').find('img').remove();
                if(shop.vrValidated === 1) {
                    if(shop.shopState === 1 && shop.brandToSign != null && shop.brandToSign != ''){
                        $('#store_vr .embed-responsive').hide();
                        if(images != null && images.length > 1) {
                            $('#store_vr').append('<img src="'+images[1].image+'" style="width: 100%; margin-top: 10px;" />');
                        }
                    } else {
                        $('#store_vr .embed-responsive').show();
                        $('#store_vr iframe').attr('src','/'+shop.vr);
                    }
                } else {
                    $('#store_vr .embed-responsive').hide();
                    if(images != null && images.length > 1) {
                        $('#store_vr').append('<img src="'+images[1].image+'" style="width: 100%; margin-top: 10px;" />');
                    }
                }
                
                $('#shop_detail').css('opacity', 1);
                
                $('#shop_detail').modal('toggle');
                
                $('#unit').text(shop.unit);
                $('#shop_name').text(shop.shopName);
                console.log(shop.code);
            } else {
                interpretBusinessCode(response.customerMessage);
            }
        }
    });
}

function insertParam(key, value) {
    key = escape(key); value = escape(value);

    var kvp = document.location.search.substr(1).split('&');
    if (kvp == '') {
        document.location.search = '?' + key + '=' + value;
    }
    else {

        var i = kvp.length; var x; while (i--) {
            x = kvp[i].split('=');

            if (x[0] == key) {
                x[1] = value;
                kvp[i] = x.join('=');
                break;
            }
        }

        if (i < 0) { kvp[kvp.length] = [key, value].join('='); }

        //this will reload the page, it's likely better to store this until finished
        document.location.search = kvp.join('&');
    }
}

function showShopSales(brand,bu,date) {
    var map = {
        brandName: brand,
        buildunit: bu,
        yyyymmdd: date
    };

    $.ajax({
        url: $.api.baseNew+"/sync-bi/api/sales/calSales",
        type: "POST",
        data: JSON.stringify(map),
        async: false,
        dataType: "json",
        contentType: "application/json",
        beforeSend: function(request) {
            request.setRequestHeader("Login", $.cookie('login'));
            request.setRequestHeader("Authorization", $.cookie('authorization'));
            request.setRequestHeader("Lang", $.cookie('lang'));
            request.setRequestHeader("Source", "onlineleasing");
        },
        success: function (response, status, xhr) {
            if(response.code === 'C0') {
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                }
                $('#weeks').text(response.data.weeks > 0 ? response.data.weeks : 4); 
                $('#sales').text((numberWithCommas(response.data.total) || 0 ) + ' yuan'); 
            } else {
                $('#weeks').text('4');
                $('#sales').text('0 yuan'); 
            }
        }
    });
}

function numberWithCommas(x) {
    if(x == null){
        return '-';
    } else {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
}

function DecrDates(date_str,dates){
    if(date_str){
        var parts = date_str.split("-");
        var dt = new Date(
          parseInt(parts[0], 10),      // year
          parseInt(parts[1], 10) - 1,  // month (starts with 0)
          parseInt(parts[2], 10)       // date
        );
        dt.setDate(dt.getDate() - dates);
        parts[0] = "" + dt.getFullYear();
        parts[1] = "" + (dt.getMonth() + 1);
        if (parts[1].length < 2) {
          parts[1] = "0" + parts[1];
        }
        parts[2] = "" + dt.getDate();
        if (parts[2].length < 2) {
          parts[2] = "0" + parts[2];
        }
        return parts.join("");
    } else {
        return '';
    }
}

function logout() {
    var keys = document.cookie.match(/[^ =;]+(?=\=)/g); 
    if (keys) { 
    for (var i = keys.length; i--;) 
        document.cookie = keys[i]+'=0;expires=' + new Date(0).toUTCString();
    }
    
    window.location.href = 'logout';
}

function getURLParameter(sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) {
            return sParameterName[1];
        }
    }
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
                interpretBusinessCode(response.customerMessage);
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
                interpretBusinessCode(response.customerMessage);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}

function getUsers() {
    var users = [];
    users.push(
        {code: 'CUSER190709000001',name: 'Victor Jiang'},
        {code: 'CUSER190709000002',name: 'Chris Chen'},
        {code: 'CUSER190709000003',name: 'Grace Xu'},
        {code: 'CUSER190709000004',name: 'Maggie Li'},
        {code: 'CUSER190709000005',name: 'Jeff Xu'},
        {code: 'CUSER190709000006',name: "Austin Rao"},
        {code: 'CUSER191225000001',name: "Mikayla Deng"},
        {code: 'CUSER190709000008',name: 'Doris Zhou'},
        {code: 'CUSER191225000002',name: 'Joy Gu'},
        {code: 'CUSER190709000009',name: 'Megan Jing'},
        {code: 'CUSER190709000010',name: 'Kevin Jiang'},
        {code: 'CUSER190709000011',name: 'Melissa Bing'},
        {code: 'CUSER190709000012',name: "Pierre Fang"},
        {code: 'CUSER190709000013',name: 'Sylvia Wei'},
        {code: 'CUSER190709000015',name: 'Selena Song'},
        {code: 'CUSER190709000016',name: 'Di Cui'},
        {code: 'CUSER190709000017',name: 'Echo Zhou'},
        {code: 'CUSER190709000018',name: 'George Qiao'},
        {code: 'CUSER190709000019',name: 'Dolby Li'},
        {code: 'CUSER190709000020',name: 'Ariel Huang'},
        {code: 'CUSER190709000021',name: 'Joy Zhou'},
        {code: 'CUSER190709000022',name: 'Claude Ma'},
        {code: 'CUSER190709000023',name: 'Abby Shi'},
        {code: 'CUSER190709000024',name: 'Wei Ye'},
        {code: 'CUSER190924000001',name: 'Mia Hang'},
        {code: 'CUSER190927000001',name: 'Barnny Chen'}
    )
    
    sessionStorage.setItem("users", JSON.stringify(users));
}

function getModalities() {
    $.ajax({
        url: $.api.baseNew+"/onlineleasing-customer/api/base/modality/findAll",
        type: "GET",
        async: false,
        beforeSend: function(request) {
            request.setRequestHeader("Lang", $.cookie('lang'));
            request.setRequestHeader("Source", "onlineleasing");
        },
        success: function (response, status, xhr) {
            if(response.code === 'C0') {
                sessionStorage.setItem("modalities", JSON.stringify(response.data) );
            } else {
                interpretBusinessCode(response.customerMessage);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}

function interpretBusinessCode(msg) {
    if(msg !== ''){
        $('#ui_alert').text(msg).slideDown().delay(2000).slideUp(0);
        $('html, body').animate({
            scrollTop: $('#ui_alert').offset().top
        }, 0);
    }
}