var stores_total = 0;
var stores_0_total = 0;
var stores_1_total = 0;
var stores_2_total = 0;
var stores_3_total = 0;

var stores_units_total = 0;
var stores_0_units_total = 0;
var stores_1_units_total = 0;
var stores_2_units_total = 0;
var stores_3_units_total = 0;

$(document).ready(function(){
    $('#nav_summary').addClass('active');

    var floorDesc = ['三楼','二楼','一楼','负一楼'];
    
    for(var i=0;i<4;i++){
        getFloorsRentalInfo(floorDesc[i]);
    }
    
    $('#summary_area tbody').append('<tr><td>合计</td><td>'+stores_0_total+'m<sup>2</sup></td><td>'+stores_2_total+'m<sup>2</sup></td><td>'+stores_1_total+'m<sup>2</sup></td><td>'+stores_3_total+'m<sup>2</sup></td><td>'+stores_total+'m<sup>2</sup></td></tr>');
    $('#summary_area_percentage tbody').append('<tr><td>合计</td><td>'+Math.round(stores_0_total/stores_total*100)+'%</td><td>'+Math.round(stores_2_total/stores_total*100)+'%</td><td>'+Math.round(100-Math.round(stores_0_total/stores_total*100)-Math.round(stores_2_total/stores_total*100)-Math.round(stores_3_total/stores_total*100))+'%</td><td>'+Math.round(stores_3_total/stores_total*100)+'%</td></tr>');

    $('#summary_units tbody').append('<tr><td>合计</td><td>'+stores_0_units_total+'个</td><td>'+stores_2_units_total+'个</td><td>'+stores_1_units_total+'个</td><td>'+stores_3_units_total+'个</td><td>'+stores_units_total+'个</td></tr>');
    $('#summary_units_percentage tbody').append('<tr><td>合计</td><td>'+Math.round(stores_0_units_total/stores_units_total*100)+'%</td><td>'+Math.round(stores_2_units_total/stores_units_total*100)+'%</td><td>'+Math.round(100-Math.round(stores_0_units_total/stores_units_total*100)-Math.round(stores_2_units_total/stores_units_total*100)-Math.round(stores_3_units_total/stores_units_total*100))+'%</td><td>'+Math.round(stores_3_units_total/stores_units_total*100)+'%</td></tr>');

    if(getURLParameter('expire') && getURLParameter('expire') != '') {
        $('select[name=days-before-expiration]').val(getURLParameter('expire'));
    } else {
        $('select[name=days-before-expiration]').val(90);
    }
    
    $('select[name=days-before-expiration]').change(function() {
        var exp = $(this).val();
        insertParam('expire',exp);
    });
});

function getFloorsRentalInfo(fl) {
    $.ajax({
        url: $.api.baseNew+"/onlineleasing-customer/api/base/coords/OLMALL180917000002/"+fl+"",
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
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                }
                
                var stores = 0; //total
                var stores_0 = 0; //在租
                var stores_1 = 0; //空铺
                var stores_2 = 0; //待租
                var stores_3 = 0; //改造
                
                var stores_units = 0; //total个数
                var stores_0_units = 0; //在租个数
                var stores_1_units = 0; //空铺个数
                var stores_2_units = 0; //待租个数
                var stores_3_units = 0; //改造个数

                $.each(response.data, function(i,v){
                    if((v.subType == '正柜' || v.subType == 'THEAT') && v.state != 0 ){
                        stores = stores + v.area;
                        stores_units++;

                        switch (v.shopState) {
                            case 0:
                                stores_0 = stores_0 + v.area;
                                stores_0_units++;
                                break;
                            case 1:
                                stores_1 = stores_1 + v.area;
                                stores_1_units++;
                                break;
                            case 2:
                                if(getURLParameter('expire') && getURLParameter('expire') != '') {
                                    if(v.daysBeforeContractExpire <= getURLParameter('expire')) {
                                        stores_2 = stores_2 + v.area;
                                        stores_2_units++;
                                    } else {
                                        stores_0 = stores_0 + v.area;
                                        stores_0_units++;
                                    }
                                } else {
                                    stores_2 = stores_2 + v.area;
                                    stores_2_units++;
                                }
                                break;
                            case 3:
                                stores_3 = stores_3 + v.area;
                                stores_3_units++;
                                break;
                            default:
                                break;
                        }
                    }
                });
                
                var leased = (Math.round(stores_0/stores*100) || '0');
                var toBeLeased = (Math.round(stores_2/stores*100) || '0');
                var renovation = (Math.round(stores_3/stores*100) || '0');
                var empty = (Math.round(100-leased-toBeLeased-renovation));
                
                var leased_units = (Math.round(stores_0_units/stores_units*100) || '0');
                var toBeLeased_units = (Math.round(stores_2_units/stores_units*100) || '0');
                var renovation_units = (Math.round(stores_3_units/stores_units*100) || '0');
                var empty_units = (Math.round(100-leased_units-toBeLeased_units-renovation_units));
                        
                $('#summary_area_percentage tbody').append('<tr><td>'+fl+'</td><td>'+leased+'%</td><td>'+toBeLeased+'%</td><td>'+empty+'%</td><td>'+renovation+'%</td></tr>');
                $('#summary_area tbody').append('<tr><td>'+fl+'</td><td>'+Math.round(stores_0)+'m<sup>2</sup></td><td>'+Math.round(stores_2)+'m<sup>2</sup></td><td>'+Math.round(stores_1)+'m<sup>2</sup></td><td>'+Math.round(stores_3)+'m<sup>2</sup></td><td>'+Math.round(stores)+'m<sup>2</sup></td></tr>');
                
                $('#summary_units_percentage tbody').append('<tr><td>'+fl+'</td><td>'+leased_units+'%</td><td>'+toBeLeased_units+'%</td><td>'+empty_units+'%</td><td>'+renovation_units+'%</td></tr>');
                $('#summary_units tbody').append('<tr><td>'+fl+'</td><td>'+Math.round(stores_0_units)+'个</td><td>'+Math.round(stores_2_units)+'个</td><td>'+Math.round(stores_1_units)+'个</td><td>'+Math.round(stores_3_units)+'个</td><td>'+Math.round(stores_units)+'个</td></tr>');
                
                stores_total = Math.round(stores_total + stores);
                stores_0_total = Math.round(stores_0_total + stores_0);
                stores_1_total = Math.round(stores_1_total + stores_1);
                stores_2_total = Math.round(stores_2_total + stores_2);
                stores_3_total = Math.round(stores_3_total + stores_3);
                
                stores_units_total = Math.round(stores_units_total + stores_units);
                stores_0_units_total = Math.round(stores_0_units_total + stores_0_units);
                stores_1_units_total = Math.round(stores_1_units_total + stores_1_units);
                stores_2_units_total = Math.round(stores_2_units_total + stores_2_units);
                stores_3_units_total = Math.round(stores_3_units_total + stores_3_units);           
            } else {
                console.log(response.customerMessage);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}