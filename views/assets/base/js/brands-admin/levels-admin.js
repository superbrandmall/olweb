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
    
var levelShopsAdmin = '';

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
    
    renderLevelShops();
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
                        $('map').append('<area data-key="'+v.unit+'" alt="'+v.code+'" data-full="'+v.shopState+'" data-modality="'+v.modality+'" data-area="'+v.area+'" name="'+(v.brandName || '')+'" href=\'#!;\' shape="poly" coords="'+v.coords+'" />'); 
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

function renderLevelShops() {
    if(levelShopsAdmin != '') {
        var index = 0;
        $.each(levelShopsAdmin.data, function(i,v){
            if((v.subType == '正柜' || v.subType == 'THEAT') && v.state != 0){
                $('#levelShopList').append('\
<tr data-index="'+index+'">\n\
<td>'+v.unit+'</td>\n\
<td>'+v.area+'m<sup>2</sup></td>\n\
<td>'+v.brandName+'</td>\n\
<td></td>\n\
<td>'+v.modality+'</td>\n\
<td></td>\n\
<td></td>\n\
<td></td>\n\
<td></td>\n\
<td></td>\n\
<td></td>\n\
<td></td>\n\
<td></td>\n\
<td></td>\n\
<td></td>\n\
<td></td>\n\
<td></td>\n\
<td></td>\n\
<td></td>\n\
<td></td>\n\
</tr>'); 
                index++;
            }
        });
    }
}