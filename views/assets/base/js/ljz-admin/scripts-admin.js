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
            default:
                floorDesc = [];
                floor = 'L1';
                break;
        }

        $('#nav_f_'+getURLParameter('f')).addClass('active');

        $('#map').attr({
            'src'   : '/views/assets/base/img/content/floor-plan/shanghai-sbm/admin/'+getURLParameter('f')+'F.png',
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
            'src'   : '/views/assets/base/img/content/floor-plan/shanghai-sbm/admin/1F.png',
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

    if(getURLParameter('expire') && getURLParameter('expire') != '') {
        $('input[name=daysBeforeExpiration][value='+getURLParameter('expire')+']').attr('checked',true);
    } else {
        $('input[name=daysBeforeExpiration]').eq(0).prop('checked',true);
    }

    $('input[name=daysBeforeExpiration]').change(function() {
        var exp = $('input[name=daysBeforeExpiration]:checked').val();
        insertParam('expire',exp);
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
                    if((v.subType == '正柜' || v.subType == 'THEAT') && v.state == 1 ){
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

                    if((v.subType == '正柜' || v.subType == 'THEAT') && v.coords != null && v.coords != '' && v.state == 1){
                        $('map').append('<area data-key="'+v.unit+'" alt="'+v.code+'" data-full="'+v.shopState+'" data-modality="'+v.modality+'" name="'+(v.brandName || '')+'" href=\'javascript: GetShopInfo("'+v.code+'");\' shape="poly" coords="'+v.coords+'" />'); 
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
                    fillColor: 'cdcdcd',
                    selected: true
                };
            } else if($(el).attr('data-full') == 1){
                return { 
                    key: $(el).attr('data-key'),
                    toolTip: '空铺',
                    fillColor: 'FE9E9E',
                    selected: true
                };
            } else if($(el).attr('data-full') == 2){
                return { 
                    key: $(el).attr('data-key'),
                    toolTip: $(el).attr('name'),
                    fillColor: 'FEED99',
                    selected: true
                };
            } else if($(el).attr('data-full') == 3){
                return { 
                    key: $(el).attr('data-key'),
                    toolTip: '改造中',
                    fillColor: 'D5C8AA',
                    selected: true
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
                "color": "#fff",
                "background": "rgba(0,0,0,0.8)",
                "font-size": "26px",
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
    
    setTimeout(function () {
        var pos, brand;
        $('map area').each(function(i,elem){
            if($(this).attr('data-full') == 0 || $(this).attr('data-full') == 2){
                pos = $(this).attr('coords').split(',');
                var x = 0;
                var posLeftMin = parseInt(pos[0]), posLeftMax = parseInt(pos[0]), posLeft;
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
                posTop = parseInt((posTopMin + posTopMax) / 2 + 30);
                brand = $(this).attr('name');
                $(this).after(
                    '<span style="position:absolute; left:'+posLeft+'px; top:'+posTop+'px; font-size: 6px; width: 45px; word-break: break-all;">'+brand+'</span>'
                );
            }
        });
    },1000);
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
                        $('#brand_name').css('color','#333');
                    }
                } else {
                    $('#brand_name').css('color','#333');
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
                        state = "在租";
                        break;
                    case 1:
                        state = "空铺";
                        shopStateClass = 'badge-danger';
                        break;
                    case 2:
                        state = "待租";
                        shopStateClass = 'badge-warning';
                        break;
                    case 3:
                        state = "改造";
                        shopStateClass = 'badge-renovation';
                        break;
                    default:
                        state = "在租";
                        shopStateClass = 'badge-default';
                        break;
                }
                
                $('#brand_name').append(' <span class="badge '+shopStateClass+'">'+state+'</span>');
                
                $('#rent').text((shop.deadRent || '-' ) + '元/m²/日');
                $('#float_rent').text((Math.round(shop.floatingRentalRate * 100) || '-' ) + '%');
                
                $('#area').text((shop.area || '-' ) + 'm²');
                
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
                
                if(shop.remark_1 != null){
                    $('#plan_open_date').text(shop.remark_1);
                } else {
                    $('#plan_open_date').text('-');
                }
                if(shop.responsiblePerson != null){
                    $('#responsible_person').text(shop.responsiblePerson);
                } else {
                    $('#responsible_person').text('-');
                }
                
                if(shop.remark_2 != null){
                    $('#loss').text((numberWithCommas(shop.remark_2) || 0 ) + '元');
                    if(shop.remark_2 != 0){
                        $('#loss').css('color','#f00');
                    }
                } else {
                    $('#loss').text('-').css('color','#333');
                }
                
                if(images != null && images.length > 0) {
                    $('#store_img').html('<img src="'+images[0].image+'" style="width: 100%;" />');
                } else {
                    $('#store_img').html('');
                }
                
                if(shop.vrValidated === 1) {
                    if(shop.shopState === 1 && shop.brandToSign != null && shop.brandToSign != ''){
                        $('#store_vr .embed-responsive').hide();
                    } else {
                        $('#store_vr .embed-responsive').show();
                        $('#store_vr iframe').attr('src','/'+shop.vr);
                    }
                } else {
                    $('#store_vr .embed-responsive').hide();
                }
                
                $('#shop_detail').css('opacity', 1);
                
                $('#shop_detail').modal('toggle');
                
                console.log('单元号:'+shop.unit+', 门牌号:'+shop.shopName); 
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
                $('#sales').text((numberWithCommas(response.data.total) || 0 ) + '元'); 
            } else {
                $('#weeks').text('4');
                $('#sales').text('0元'); 
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

function generatePages(currentPage, LastPage) {
    var pages = '';
    if (LastPage <= 6) {
        for(var i=1;i<=LastPage;i++) {
            if(i == currentPage ) {
                pages += '<li class="paginate_button active"><a href="javascript: void(0);">'+i+'</a></li>';
            } else {
                pages += '<li class="paginate_button"><a href="?page='+i+'">'+i+'</a></li>';
            }
        }
    } else {
        if(currentPage>1){
            var previousPage = +currentPage-1;
            pages += '<li><a href="?page='+previousPage+'">&lt;</a></li>';
        } else {
            pages += '<li class="c-space"><span>&lt;</span></li>';
        }
        for(var i=1;i<=3;i++) {
            if(i == currentPage ) {
                pages += '<li class="paginate_button active"><a href="javascript: void(0);">'+i+'</a></li>';
            } else {
                pages += '<li class="paginate_button"><a href="?page='+i+'">'+i+'</a></li>';
            }
        }
        pages += '<li class="c-space"><span>...</span></li>';
        for(var i=LastPage-2;i<=LastPage;i++) {
            if(i == currentPage ) {
                pages += '<li class="paginate_button active"><a href="javascript: void(0);">'+i+'</a></li>';
            } else {
                pages += '<li class="paginate_button"><a href="?page='+i+'">'+i+'</a></li>';
            }
        }
        if(currentPage<LastPage){
            var nextPage = +currentPage+1;
            pages += '<li><a href="?page='+nextPage+'">&gt;</a></li>';
        } else {
            pages += '<li class="c-space"><span>&gt;</span></li>';
        }
    }
    $(".pagination").append(pages);
}

function refineUrl() {
    //get full url
    var url = window.location.href;
    //get url after/  
    var value = url.substring(url.lastIndexOf('/') + 1);
    //get the part after before ?
    value  = value.split("?")[0];   
    return value;     
}

function refineOfferUrl() {
    var url = window.location.href;
    var value = url.substring(url.lastIndexOf('/') + 1);
    value  = value.split("&")[0];   
    return value;     
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

function IncrDate(date_str){
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
}

function IncrDates(date_str,dates){
    if(date_str){
        var parts = date_str.split("-");
        var dt = new Date(
          parseInt(parts[0], 10),      // year
          parseInt(parts[1], 10) - 1,  // month (starts with 0)
          parseInt(parts[2], 10)       // date
        );
        dt.setDate(dt.getDate() + dates);
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
}

function IncrMonth(date_str){
    if(date_str){
        var parts = date_str.split("-");
        var dt = new Date(
          parseInt(parts[0], 10),      // year
          parseInt(parts[1], 10),  // month (starts with 0)
          parseInt(parts[2], 10)       // date
        );
        dt.setDate(dt.getDate());
        parts[0] = "" + dt.getFullYear();
        parts[1] = "" + (Number(dt.getMonth()) + 1);
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
}

function IncrYear(date_str){
    if(date_str){
        var parts = date_str.split("-");
        var dt = new Date(
          parseInt(parts[0], 10),      // year
          parseInt(parts[1], 10) - 1,  // month (starts with 0)
          parseInt(parts[2], 10)       // date
        );
        dt.setDate(dt.getDate());
        parts[0] = "" + (Number(dt.getFullYear()) + 1);
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
}

function IncrYears(date_str, years){
    if(date_str){
        var parts = date_str.split("-");
        var dt = new Date(
          parseInt(parts[0], 10),      // year
          parseInt(parts[1], 10) - 1,  // month (starts with 0)
          parseInt(parts[2], 10)       // date
        );
        dt.setDate(dt.getDate() - 1);
        parts[0] = "" + (Number(dt.getFullYear()) + Number(years));
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
}

function interpretBusinessCode(msg) {
    if(msg !== ''){
        $('#ui_alert').text(msg).slideDown().delay(2000).slideUp(0);
        $('html, body').animate({
            scrollTop: $('#ui_alert').offset().top
        }, 0);
    }
}

$.validator.addMethod( "remoteValidate", function( value, element, param, method ) {
    if ( this.optional( element ) ) {
        return "dependency-mismatch";
    }
    method = typeof method === "string" && method || "remoteValidate";

    var previous = this.previousValue( element, method ),
    validator, data, optionDataString;

    if ( !this.settings.messages[ element.name ] ) {
        this.settings.messages[ element.name ] = {};
    }
    previous.originalMessage = previous.originalMessage || this.settings.messages[ element.name ][ method ];
    this.settings.messages[ element.name ][ method ] = previous.message;

    param = typeof param === "string" && { url: param } || param;
    optionDataString = $.param( $.extend( { data: value }, param.data ) );
    if ( previous.old === optionDataString ) {
        return previous.valid;
    }

    previous.old = optionDataString;
    validator = this;
    this.startRequest( element );
    data = {};
    data[ element.name ] = value;
    
    $.ajax( $.extend( true, {
        mode: "abort",
        port: "validate" + element.name,
        data: data,
        context: validator.currentForm,
        success: function( response ) {
            var valid = response === true || response === "true",
            errors, message, submitted;

            validator.settings.messages[ element.name ][ method ] = previous.originalMessage;
            if ( valid ) {
                submitted = validator.formSubmitted;
                validator.resetInternals();
                validator.toHide = validator.errorsFor( element );
                validator.formSubmitted = submitted;
                validator.successList.push( element );
                validator.invalid[ element.name ] = false;
                validator.showErrors();
            } else {
                errors = {};
                message = response || validator.defaultMessage( element, { method: method, parameters: value } );
                errors[ element.name ] = previous.message = message;
                validator.invalid[ element.name ] = true;
                validator.showErrors( errors );
            }
            previous.valid = valid;
            validator.stopRequest( element, valid );
        }
    }, param ) );
    return "pending";
 }, "" );