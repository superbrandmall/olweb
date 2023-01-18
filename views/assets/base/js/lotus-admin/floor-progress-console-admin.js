$(document).ready(function(){
    switch (getURLParameter('items')) {
        case '10':
            $('.page-size').text('10');
            break;
        case '20':
            $('.page-size').text('20');
            break;
        case '30':
            $('.page-size').text('30');
            break;
        case '50':
            $('.page-size').text('50');
            break;
        default:
            $('.page-size').text('20');
            break;
    }
    
    updateSelectMallDropDown();
    
    if($.cookie('searchMallCode') != 'null' && $.cookie('searchMallCode') != null){
        var newOption = new Option($.cookie('searchMallCode').split(':::')[0], $.cookie('searchMallCode').split(':::')[1], true, true);
        $('#mallCode').append(newOption).trigger('change');
    } else {
        $("#mallCode").val($.cookie('mallSelected').split(':::')[1]).trigger('change');
    }
    
    var items = getURLParameter('items') || $('.page-size').first().text();
    getFloors(1,items);
    
    $('#clear').click(function(){
        $('#mallCode').val('').trigger('change');
        $.cookie('searchMallCode', null);
    })
    
    $('#search').click(function(){
        if($('#mallCode').val() != null){
            $.cookie('searchMallCode', $('#select2-mallCode-container').text().split(' [ ')[0]+':::'+$('#mallCode').val());
        } else {
            $.cookie('searchMallCode', null);
        }
        getFloors(1,items);
    })
});

function getFloors(p,c) {
    $('#console').html('');
    
    $.ajax({
        url: $.api.baseLotus+"/api/floor/lotus/findAllByMallCode?mallCode="+$('#mallCode').val(),
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
                $.each(response.data, function(i,v){
                    getShopFloorInfo(JSON.stringify(v));
                });
                
                generatePages(p, 1, c);
                $(".pagination-info").html('显示 1 到 '+response.data.length+' 行，共 '+response.data.length+'行');
            } else {
                alertMsg(response.code,response.customerMessage);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}

function getShopFloorInfo(floor) {
    var fl = $.parseJSON(floor);
    var mallCodes;
    $.each(JSON.parse($.cookie('userModules')), function(i,v) {
        if((v.roleCode == 'CROLE211008000002' || v.roleCode == 'CROLE220922000001') && v.moduleCode == 'ALL'){
            mallCodes = v.moduleCode;
            return false;
        } else {
            mallCodes = $.cookie('mallSelected').split(':::')[1];
        }
    })
    
    var map = {
        "floorCode": fl.code,
        "mallCodes": mallCodes,
        "userCode": $.cookie('uid')
    };
    
    var stores = 0; //total
    var stores_0 = 0; //在租
    var stores_1 = 0; //空铺
    var stores_units = 0; //total个数
    var stores_0_units = 0; //在租个数
    var stores_1_units = 0; //空铺个数
    var leased = 0;
    var empty = 0;
    var leased_units = 0;
    var empty_units = 0;
        
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
                if(response.data.content.length > 0){  
                    $.each(response.data.content, function(i,v){
                        if(v.state != 0 ){
                            stores = stores + v.unitArea;
                            stores_units++;

                            switch (v.shopStatus) {
                                case "0":
                                    stores_0 = stores_0 + v.unitArea;
                                    stores_0_units++;
                                    break;
                                case "1":
                                    stores_1 = stores_1 + v.unitArea;
                                    stores_1_units++;
                                    break;
                                default:
                                    break;
                            }
                        }
                    });
                    
                    leased = (parseFloat(stores_0/stores*100).toFixed(2) || '0');
                }
            } else {
                alertMsg(response.code,response.customerMessage);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
    
    var rt = parseInt(100 - leased);
    
    $('#console').append('<tr>\n\
        <td><a href="/lotus-admin/home?id='+$('#mallCode').val()+'&f='+fl.code+'">'+fl.mallName+fl.floorName+'</a></td>\n\
        <td>'+parseFloat(stores).toFixed(2)+'</td>\n\
        <td>'+Math.round(stores_0_units)+'</td>\n\
        <td>'+parseFloat(stores_0).toFixed(2)+'</td>\n\
        <td style="position: relative; width: 100px; background: #fff5f5; vertical-align: top;" align="center"><div style="background: #f16d7f; left: 0; position: absolute; top: 2px; bottom: 2px; right: '+rt+'px;"></div><div style="position: absolute;left: 0;right: 0;vertical-align: top;">'+leased+'%</div></td>\n\
        <td>0</td>\n\
        <td>0</td>\n\
        <td>0</td></tr>');
}