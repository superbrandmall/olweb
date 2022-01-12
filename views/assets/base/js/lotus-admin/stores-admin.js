var d = new Date();
var month = d.getMonth()+1;
var year = d.getFullYear();
var day = d.getDate();
var date = d.getFullYear() + '-' +
    (month<10 ? '0' : '') + month + '-' +
    (day<10 ? '0' : '') + day;
var deFC = '';

$(document).ready(function(){
    if(getURLParameter('s')) {
        switch (getURLParameter('s')) {
            case "succeed":
                $('.callout-info').show().delay(2000).hide(0);
                $('html, body').animate({
                    scrollTop: $('#webui').offset().top
                }, 0);
                break;
            case "fail":
                $('.callout-danger').show().delay(2000).hide(0);
                $('html, body').animate({
                    scrollTop: $('#webui').offset().top
                }, 0);
                break;
            default:
                break;
        }
        setTimeout(function () {
            window.history.pushState("object or string", "Title", "/lotus-admin/"+refineCreateUrl() );
        },1000);
    }
    
    if(getURLParameter('f') && getURLParameter('f') != '') {
        deFC = getURLParameter('f');
    } else {
        deFC = $.parseJSON(sessionStorage.getItem("floors-"+$.cookie('mallSelected').split(':::')[1]))[0].code;  
    }
    
    var items = getURLParameter('items') || $('.page-size').first().text();
    var page = 1;
    if(getURLParameter('page') && getURLParameter('page') >= 1){
        page = getURLParameter('page');
    }

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
            $('.page-size').text('10');
            break;
    }
    
    if(!sessionStorage.getItem("shops_"+deFC) || sessionStorage.getItem("shops_"+deFC) == null || sessionStorage.getItem("shops_"+deFC) == '') {
        getShops(deFC, page, items);
    } else {
        renderShops(deFC, page, items);
    }
});

function getShops(fc, page, items) {
    var mallCodes;
    $.each(JSON.parse($.cookie('userModules')), function(i,v) {
        if(v.code == 'CROLE211008000002' && v.moduleCode == 'ALL'){
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
        url: $.api.baseNew+"/onlineleasing-customer/api/vshop/lotus/findAllByCondition?page=0&size=100",
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
                sessionStorage.setItem("shops_"+fc, JSON.stringify(response.data) );
                renderShops(fc, page, items);
            } else {
                console.log(response.customerMessage);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}

function renderShops(fc, page, items) {
    var shops = $.parseJSON(sessionStorage.getItem("shops_"+fc));
    if(shops.content.length > 0) {
        generatePages(page, shops.content.totalPages, items);
        
        $.each(shops.content, function(i,v){
            $('#storesL').append('\
            <tr data-index="'+i+'">\n\
            <td>'+v.unitCode+'</td>\n\
            <td>'+v.unitName+'</td>\n\
            <td>'+v.unitArea+'</td>\n\
            <td>'+v.modality+'</td>\n\
            <td>'+v.remarkFirst+'</td>\n\
            <td>'+v.userCode+'</td>\n\
            </tr>');
        })
    }
}