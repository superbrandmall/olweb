$(document).ready(function(){
    findAllShopsByMallCode(1,100);
});

function findAllShopsByMallCode(p,c){
    $.ajax({
        url: $.api.baseLotus+"/api/shop/lotus/findAllByMallCode?mallCode="+getURLParameter('id')+"&page="+(p-1)+"&size="+c+"&sort=id,asc",
        type: "GET",
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
                        $('.discounts-bigbox').append('<div class="discounts-box1">\n\
            <span class="d-box1-img1"><img src="/views/assets/base/img/content/v3/shop.png" alt=""></span>\n\
            <div class="discounts-box2">\n\
                <span class="d-box2-text1">'+v.unitName+' ('+v.modality+')</span>\n\
                <span class="d-box2-text2">'+v.area+'m<sup>2</sup> <i>原品牌: '+v.remarkFirst+'</i></span>\n\
                <button class="d-box2-btn">查看详情</button>\n\
            </div>\n\
        </div>');

                    });
                }
            } else {
                alertMsg(response.code,response.customerMessage);
            } 
        }
    });
}