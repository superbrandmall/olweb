$(document).ready(function(){
    GetBrandInfo();    
});

function GetBrandInfo(){
    var map = {
        brand : {
            code: getURLParameter('id')
        }
    };
    $.ajax({
        url: $.api.base+"/brand/findByCode",
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
                
                var brand = response.data.brand;
                $('#code').val(brand.code || '-');
                $('#brand_name').val(brand.name || '-');
                
                var mod = [];
                mod = $.parseJSON(sessionStorage.getItem("modalities"));
                $.each(mod, function(i,v) {
                    if(v.code == brand.modality_1.substr(0,2)) {
                        $.each(v.list, function(j,w) {
                            if(w.code == brand.modality_1) {
                                $('#modality_1').val(w.name);
                                $.each(w.list, function(k,x) {
                                    if(x.code == brand.modality_2) {
                                        $('#modality_2').val(x.name);
                                        $.each(x.list, function(l,y) {
                                            if(y.code == brand.modality_3) {
                                                $('#modality_3').val(y.name);
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
                $('#class').val(brand.brandClass || '');
                $('#reputation').val(brand.reputation || '');
                $('#market_share').val(brand.marketShare || '-');
                $('#name_eng').val(brand.nameEng || '-');
                $('#location').val(brand.location || '');
                $('#standard_area').val(brand.standArea || '');
                $('#target').val(brand.target || '');
                $('#city').val(brand.city || '-');
                $('#history').val(brand.history || '');
                $('#rank').val(brand.rank || '-');
                $('#shop_amount').val(brand.shopAmount || '');
                $('#compare').val(brand.compare || '');
                $('#average_unit_price').val(brand.averageUnitPrice || '-');
                $('#joined').val(brand.joined || '');
                $('#join_other_mall').val(brand.joinOtherMall || '');
                $('#attribute').val(brand.attribute || '');
                if(brand.logo !== null) {
                    $('<div class="col-md-6 logos"><img src="'+brand.logo+'" class="img-responsive"></div>').insertBefore($('#logo'));
                }
            } 
        }
    });
}