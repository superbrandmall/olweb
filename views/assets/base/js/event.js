var d = new Date();
var month = d.getMonth()+1;
var day = d.getDate();
var date = d.getFullYear() + '-' +
    (month<10 ? '0' : '') + month + '-' +
    (day<10 ? '0' : '') + day;
    
$(document).ready(function(){   
    GetShopInfo();
    
    $('#grid-container').cubeportfolio({
        filters: '#filters-container',
        defaultFilter: '.qiangdian',
        animationType: 'sequentially',
        gridAdjustment: 'responsive',
        displayType: 'default',
        caption: 'expand',
        mediaQueries: [{
            width: 1,
            cols: 1
        }],
        gapHorizontal: 0,
        gapVertical: 0
    });

});

function GetShopInfo(){
    var shopCode = getURLParameter('id') || null;
    var userCode = $.cookie('uid');
    $.ajax({
        url: $.api.baseNew+"/onlineleasing-customer/api/shop/"+shopCode+"?userCode="+userCode+"",
        type: "GET",
        async: false,
        beforeSend: function(request) {
            $('#loader').show();
            request.setRequestHeader("Login", $.cookie('login'));
            request.setRequestHeader("Authorization", $.cookie('authorization'));
            request.setRequestHeader("Lang", $.cookie('lang'));
            request.setRequestHeader("Source", "onlineleasing");
        },
        complete: function(){},
        success: function (response, status, xhr) {
            $('#loader').hide();
            if(response.code === 'C0') {
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                }
                $('#unit').text(response.data.unit || '-');
                
                var floorName,floorNameEng,mallName;
                $.each($.parseJSON(sessionStorage.getItem("floors")), function(i,v) {
                    if(v.floorCode == response.data.floorCode) {
                        floorNameEng = v.descriptionEng;
                        floorName = v.description;
                        return false;
                    }
                });
                
                if($.cookie('lang') === 'en-us'){
                    $('#floor').text(floorNameEng || '-');
                } else {
                    $('#floor').text(floorName || '-');
                }
                
                if(response.data.unit != null) {
                    GetMap(response.data.unit,response.data.mallCode);
                }
                
                $.each($.parseJSON(sessionStorage.getItem("malls")), function(i,v) {
                    if(v.mallCode == response.data.mallCode) {
                        if($.cookie('lang') === 'en-us'){
                            mallName = v.mallNameEng;
                        } else {
                            mallName = v.mallName;
                        }
                        return false;
                    }
                });
                
                $('.c-page-title h3').html(mallName || '-');
                $('#mall_link').html('<a href="'+response.data.mallCode.toLowerCase()+'">'+mallName+'</a>');
                
                if(response.data.images.length === 0){
                    $('.owl-carousel').append('<div class="c-content-media-2 c-bg-img-center" style="background-image: url('+response.data.firstImage+'); min-height: 380px;"><div class="c-panel"><div class="c-fav"></div></div></div>');
                } else {
                    $.each(response.data.images, function(i,v){
                        $('.owl-carousel').append('<div class="item"><div class="c-content-media-2 c-bg-img-center" style="background-image: url('+v.image+'); min-height: 380px;"></div></div>');
                    });
                }
                
                if($.cookie('lang') === 'en-us'){
                    $('#floor_name').prepend(floorNameEng);
                } else {
                    $('#floor_name').prepend(floorName);
                }
                
                getFloorInfo(response.data.mallCode,floorName);
                $('#area').text(numberWithCommas(response.data.area)+'m²' || '-');

                if(response.data.shopState === 1) { // 空铺
                    $('#moving_date').text(IncrDates(date,5));
                } else { // 非空铺
                    var contractExpire = new Date();
                    contractExpire.setTime(response.data.contractExpireDate);
                    var contractExpireYear = contractExpire.getFullYear('yyyy');
                    var contractExpireMonth = contractExpire.getMonth('mm')+1;
                    var contractExpireDate = contractExpire.getDate('dd');

                    if(IncrDates(date,5) <= (contractExpireYear+'-'+contractExpireMonth+'-'+contractExpireDate)) {
                        $('#moving_date').text(IncrDate(contractExpireYear+'-'+contractExpireMonth+'-'+contractExpireDate));
                    } else {
                        $('#moving_date').text(IncrDates(contractExpireYear+'-'+contractExpireMonth+'-'+contractExpireDate,5));
                    }
                }

                $('.item .c-content-media-2').append('<div class="c-panel"><div class="c-fav"></div></div>');
                
                if(response.data.vr !== null) {
                    NetPing(response.data.vr);
                } else {
                    $('#vr_video').hide();
                    $('#shop_location').addClass('col-md-offset-3');
                }
            } else {
                interpretBusinessCode(response.customerMessage);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}

function GetMap(u,m){     
    $('#map').append('<img src="views/assets/base/img/content/events/'+$.lang.mallLangCat+'/'+m+'/'+u+'.jpg" class="img-responsive" style="margin: 0 auto;">');
}

function getFloorInfo(mc,fn) {
    $.ajax({
        url: $.api.baseNew+"/onlineleasing-customer/api/base/info/floor/"+mc+"/"+fn+"",
        type: "GET",
        async: false,
        beforeSend: function(request) {
            request.setRequestHeader("Lang", $.cookie('lang'));
            request.setRequestHeader("Source", "onlineleasing");
        },
        complete: function(){},
        success: function (response, status, xhr) {
            if(response.code === 'C0' && response.data != null) {
                var details = response.data.proportion.details;
                var proportion = "";
                var modalityName;
                $.each(details, function(i,v){
                    modalityName = GetFloorModality(v.code);
                    proportion += '<div class="col-sm-5">'+modalityName+' ('+v.count+'): '+Math.round(v.percentage*100)+'%</div><div class="col-sm-7"><div class="progress"><div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="'+Math.round(v.percentage*100)+'" aria-valuemin="0" aria-valuemax="100" style="width: '+Math.round(v.percentage*100)+'%;"></div></div></div><div class="clearfix"> </div>'; 
                });
                $('#proportion').html(proportion);
            } else {
                interpretBusinessCode(response.customerMessage);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}

function NetPing(vr) {
    $.ajax({
        type: "GET",
        cache: false,
        url: vr,
        data: "",
        success: function() {
           $('.embed-responsive iframe').attr('src',vr);
        },
        error: function() {
            $('#vr_video').hide();
            $('#shop_location').addClass('col-md-offset-3');
        }
    });
}

function GetFloorModality(mod) {
    if($.cookie('lang') === 'en-us'){
        var mm = 'Other';
    } else {
        var mm = '其它';
    }
    if(mod !== null && mod !== '') {
        var m = mod;
        $.each($.parseJSON(sessionStorage.getItem("modalities")), function(i,v) {
            if(v.code == m && $.cookie('lang') !== 'en-us') {
                mm = v.name;
                return false;
            } else if(v.code == m && $.cookie('lang') === 'en-us') {
                mm = v.remark;
                return false;
            }
            $.each(v.children, function(j,w) {
                if(w.code == m && $.cookie('lang') !== 'en-us') {
                    mm = w.name;
                    return false;
                } else if(w.code == m && $.cookie('lang') === 'en-us') {
                    mm = w.remark;
                    return false;
                } 
                $.each(w.children, function(k,x) {
                    if(x.code == m && $.cookie('lang') !== 'en-us') {
                        mm = x.name;
                        return false;
                    } else if(x.code == m && $.cookie('lang') === 'en-us') {
                        mm = x.remark;
                        return false;
                    }
                    $.each(x.children, function(l,y) {
                        if(y.code == m && $.cookie('lang') !== 'en-us') {
                            mm = y.name;
                            return false;
                        } else if(y.code == m && $.cookie('lang') === 'en-us') {
                            mm = y.name;
                            return false;
                        }
                    });
                });
            });
        });
    } else {
        mm = '-';
    }
    
    return mm;
}