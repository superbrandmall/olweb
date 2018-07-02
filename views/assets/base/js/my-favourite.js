$(document).ready(function(){
    if(getURLParameter('page') && getURLParameter('page') >= 1){
        ShowFavourites(getURLParameter('page'),8);
    } else {
        ShowFavourites(1,8);
    }
 });

function ShowFavourites(p,c){
    $('.c-content-box .c-margin-t-30').html('');

    $.ajax({
        url: $.api.baseNew+"/onlineleasing-customer/api/myfavourite/details/"+$.cookie('uid')+"?page="+Math.round(p-1)+"&size="+c+"",
        type: "GET",
        async: false,
        beforeSend: function(request) {
            request.setRequestHeader("Login", $.cookie('login'));
            request.setRequestHeader("Authorization", $.cookie('authorization'));
            request.setRequestHeader("Lang", $.cookie('lang'));
            request.setRequestHeader("Source", "onlineleasing");
        },
        success: function (response, status, xhr) {
            $('#loader').hide();
            if(response.code === 'C0') {
                var img;
                if(response.data.content.length > 0) {
                    generatePages(p, response.data.totalPages);
                    
                    var modality,mallName,floorName;
                    $.each(response.data.content, function(i,v){
                        if(v.modality !== '' && v.modality !== null){
                            $.each($.parseJSON(sessionStorage.getItem("modalities")), function(a,b) {
                                $.each(b.children, function(j,w) {
                                    $.each(w.children, function(k,x) {
                                        $.each(x.children, function(l,y) {
                                            if($.cookie('lang') === 'en-us'){
                                                if(y.code == v.modality) {
                                                    modality = y.remark || '-';
                                                    return false;
                                                }
                                            } else {
                                                if(y.code == v.modality) {
                                                    modality = y.name || '-';
                                                    return false;
                                                }
                                            }
                                        });
                                    });
                                });
                            });
                        } else {
                            modality = "-";
                        }
                        
                        var area = numberWithCommas(v.area);
                        if(area === null){
                            area = "-";
                        }
                        
                        $.each($.parseJSON(sessionStorage.getItem("malls")), function(j,w) {
                            if(w.mallCode == v.mallCode) {
                                if($.cookie('lang') === 'en-us'){
                                    mallName = w.mallNameEng;
                                } else {
                                    mallName = w.mallName;
                                }
                                return false;
                            }
                        });

                        $.each($.parseJSON(sessionStorage.getItem("floors")), function(j,w) {
                            if(w.floorCode == v.floorCode) {
                                if($.cookie('lang') === 'en-us'){
                                    floorName = w.descriptionEng;
                                } else {
                                    floorName = w.description;
                                }
                                return false;
                            }
                        });

                        $('.c-content-box .c-margin-t-30').append('<div class="col-md-3"><div class="c-content-person-1 c-option-2"><div class="c-caption c-content-overlay">\n\
<div class="c-overlay-wrapper"><div class="c-overlay-content"><a class="cbp-l-caption-buttonLeft btn c-btn-square c-btn-border-1x c-btn-white c-btn-bold c-btn-uppercase" href="shop?id='+v.code+'">'+$.lang.shopIntro+'</a></div></div><img class="c-overlay-object img-responsive" src="'+v.firstImage+'" alt="">\n\
</div><div class="c-body"><div class="c-head"><div class="c-name c-font-uppercase c-font-bold">'+mallName+'</div></div>\n\
<div class="c-position">'+$.lang.shopUnit+': '+v.unit+'</div><div class="c-position">'+$.lang.floor+': '+floorName+'</div><div class="c-position">'+$.lang.leasableArea+': '+area+'m<sup>2</sup></div><div class="c-position" style="text-overflow: ellipsis;overflow: hidden;white-space: nowrap;width: 100%;">'+$.lang.modality+': '+modality+'</div></div></div></div>');                            

                    });
                } else {
                    $('.c-content-box .c-margin-t-30').html('<div class="col-md-12"><i class="fa fa-info" aria-hidden="true"></i> '+$.lang.noFavourites+'</div>');
                }
            } else {
                interpretBusinessCode(response.customerMessage);
            } 
        }
    });
}

function generatePages(currentPage, LastPage) {
    var pages = '';
    if (LastPage <= 6) {
        for(var i=1;i<=LastPage;i++) {
            if(i == currentPage ) {
                pages += '<li class="c-active"><a href="?page='+i+'">'+i+'</a></li>';
            } else {
                pages += '<li><a href="?page='+i+'">'+i+'</a></li>';
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
                pages += '<li class="c-active"><a href="?page='+i+'">'+i+'</a></li>';
            } else {
                pages += '<li><a href="?page='+i+'">'+i+'</a></li>';
            }
        }
        pages += '<li class="c-space"><span>...</span></li>';
        for(var i=LastPage-2;i<=LastPage;i++) {
            if(i == currentPage ) {
                pages += '<li class="c-active"><a href="?page='+i+'">'+i+'</a></li>';
            } else {
                pages += '<li><a href="?page='+i+'">'+i+'</a></li>';
            }
        }
        if(currentPage<LastPage){
            var nextPage = +currentPage+1;
            pages += '<li><a href="?page='+nextPage+'">&gt;</a></li>';
        } else {
            pages += '<li class="c-space"><span>&gt;</span></li>';
        }
    }
    $(".c-content-pagination").append(pages);
}