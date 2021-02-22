$(document).ready(function(){
    GetBrandInfo();    
});

function GetBrandInfo(){
    $.ajax({
        url: $.api.baseNew+"/onlineleasing-admin/api/brand/"+getURLParameter('id')+"",
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
                
                var brand = response.data;
                $('#code').val(brand.code || '-');
                $('#brand_name').val(brand.name || '-');

                $.each($.parseJSON(sessionStorage.getItem("modalities")), function(i,u) {
                    if(u.code == brand.modality1.substr(0,2)) {
                        $.each(u.children, function(j,w) {
                            if(w.code == brand.modality1) {
                                $('#modality_1').val(w.name);
                                $.each(w.children, function(k,x) {
                                    if(x.code == brand.modality2) {
                                        $('#modality_2').val(x.name);
                                        $.each(x.children, function(l,y) {
                                            if(y.code == brand.modality3) {
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
                    var logo = '';
                    if(brand.logo.substr(0,10) == 'http://cre'){
                        logo = brand.logo;
                    } else {
                        logo = 'https://ol.superbrandmall.com/views/assets/base/img/content/client-logos/web/'+brand.logo;
                    }
                    $('<div class="col-md-6 logos"><img src="'+logo+'" class="img-responsive"></div>').insertBefore($('#logo'));
                }
            } 
        }
    });
}