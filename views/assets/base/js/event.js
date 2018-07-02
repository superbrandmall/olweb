var d = new Date();
var month = d.getMonth()+1;
var day = d.getDate();
var date = d.getFullYear() + '-' +
    (month<10 ? '0' : '') + month + '-' +
    (day<10 ? '0' : '') + day;
    
$(document).ready(function(){   
    GetShopInfo();
    
    $('.add-favourite').click(function(){
        if($.cookie('uid') && $.cookie('uid') != ''){
            AddFavourite();
        }
    });
    
    $('.remove-favourite').click(function(){
        if($.cookie('uid') && $.cookie('uid') != ''){
            RemoveFavourite();
        }
    });
    
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
                    GetMap(response.data.unit);
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

                if(response.data.engineeringImages != '' && response.data.engineeringImages != null) {
                    GetEngineeringImages(response.data.engineeringImages);
                } else {
                    $('#engineering_images').hide();
                }

                if(response.data.engineeringSpecifications != '' && response.data.engineeringSpecifications != null) {
                    GetEngineeringSpecifications(response.data.engineeringSpecifications);
                } else {
                    $('#engineering_specifications').hide();
                }

                if(response.data.shopState !== 0) {
                    if($.cookie('uid') && $.cookie('uid') != '') {
                        $('<a href="reserve-event?sid='+getURLParameter('id')+'" class="btn btn-lg btn-danger c-btn-uppercase c-btn-square c-btn-bold"><i class="icon-clock"></i> '+$.lang.reserveEvent+'</a>').insertAfter(".c-content-list-1");
                    } else {
                        $('<a href="javascript:;" data-toggle="modal" data-target="#login-form" class="btn btn-lg btn-danger c-btn-uppercase c-btn-square c-btn-bold"><i class="icon-clock"></i> '+$.lang.reserveEvent+'</a>').insertAfter(".c-content-list-1");
                    }
                }

                $('.item .c-content-media-2').append('<div class="c-panel"><div class="c-fav"></div></div>');

                if($.cookie('uid') && $.cookie('uid') != ''){
                    if(response.data.isMyFavourite === false) {
                        $('.c-fav').append('<button type="button" class="add-favourite" style="background: transparent;border:none;"><i class="icon-plus c-font-thin"></i> <p class="c-font-thin">'+$.lang.addToFav2+'</p></button>');
                    } else {
                        $('.c-fav').append('<button type="button" class="remove-favourite" style="background: transparent;border:none; color: rgba(255,255,255,0.5);"><i class="icon-close c-font-thin"></i> <p class="c-font-thin">'+$.lang.removeFromFav+'</p></button>');
                    }
                }
                
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

function AddFavourite(){
    var userCode = $.cookie('uid');
    var shopCode = getURLParameter('id');
    
    $.ajax({
        url: $.api.baseNew+"/onlineleasing-customer/api/myfavourite/save?userCode="+userCode+"&shopCode="+shopCode+"",
        type: "POST",
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
        complete: function(){},
        success: function (response, status, xhr) {
            $('#loader').hide();
            if(response.code === 'C0') {
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                }
                $('.c-fav').remove('button');
                $('.c-fav').html('<button type="button" class="remove-favourite" style="background: transparent;border:none; color: rgba(255,255,255,0.5);"><i class="icon-close c-font-thin"></i> <p class="c-font-thin">'+$.lang.removeFromFav+'</p></button>');

                $('.remove-favourite').click(function(){
                    RemoveFavourite();
                });
            } else {
                interpretBusinessCode(response.customerMessage);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}

function RemoveFavourite(){
    var userCode = $.cookie('uid');
    var shopCode = getURLParameter('id');
    
    $.ajax({
        url: $.api.baseNew+"/onlineleasing-customer/api/myfavourite/delete?userCode="+userCode+"&shopCode="+shopCode+"",
        type: "DELETE",
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
                $('.c-fav').remove('button');
                $('.c-fav').html('<button type="button" class="add-favourite" style="background: transparent;border:none;"><i class="icon-plus c-font-thin"></i> <p class="c-font-thin">'+$.lang.addToFav2+'</p></button>');
                $('.add-favourite').click(function(){
                    AddFavourite();
                });
            } else {
                interpretBusinessCode(response.customerMessage);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}

function GetEngineeringImages(imgs){
    $.each(imgs,function(i,v) {
        $('#other_imgs').append('<div class="c-content-panel"><div class="c-label">'+v.attachmentType+'</div><div class="c-body"><img src="'+v.image+'" class="img-responsive" /></div></div>');
    });
}

function GetEngineeringSpecifications(specs){
    $.each(specs,function(i,v) {
        switch (v.title) {
            case '电压':
                $('#dianya').text(v.number != null ? v.number+'V' : '-');
                break;
            case '电箱数量':
                $('#dianxiang').text(v.number != null ? v.number : '-');
                break;
            case '开关容量':
                $('#kaiguan').text(v.number != null ? v.number+'A' : '-');
                break;
            case '供电方式':
                $('#gongdian').text(v.spec != null ? v.spec+'相' : '-');
                break;
            case '电量':
                $('#dianliang').text(v.number != null ? v.number+'KW' : '-');
                break;
            case '给水':
                $('#geishui').text(v.number != null ? v.number+'cm' : '-');
                break;
            case '排水':
                $('#paishui').text(v.number != null ? v.number+'cm' : '-');
                break;
            case '回水管':
                $('#huishui').text(v.numberv != null ? v.number : '-');
                $('#huishui1').text(v.spec != null ? v.spec : '-');
                break;
            case '冷冻供水管':
                $('#lengdong').text(v.number != null ? v.number : '-');
                $('#lengdong1').text(v.spec != null ? v.spec : '-');
                break;
            case '冷凝水管':
                $('#lenning').text(v.numberv != null ? v.number : '-');
                $('#lenning1').text(v.spec != null ? v.spec : '-');
                break;
            case '新风管':
                $('#xinfeng').text(v.numberv != null ? v.number : '-');
                $('#xinfeng1').html(v.spec != null ? v.spec+'L' : '-');
                break;
            case '自装独立空调':
                $('#kongtiao').text(v.number == 1? '是' : '否');
                break;
            case '供暖热水管':
                $('#gongnuanreshui').text(v.number != null ? v.number : '-');
                break;
            case '供暖回水管':
                $('#gongnuanhuishui').text(v.number != null ? v.number : '-');
                break;
            case '新风管':
                $('#xinfeng').text(v.number != null ? v.number : '-');
                break;
            case '风机管盘':
                $('#fengji').text(v.number != null ? v.number : '-');
                break;
            case '容量':
                $('#rongliang').text(v.number != null ? v.number+'L' : '-');
                break;
            case '风口数量':
                $('#fengkoushuliang').text(v.number != null ? v.number : '-');
                break;
            case '风口规格':
                $('#fengkouguige').text(v.number != null ? v.number+'mm' : '-');
                break;
            case '排风量':
                $('#paifengliang').html(v.number != null ? v.number+'m<sup>3</sup>/h' : '-');
                break;
            default:
                break;
        }
    });
}

function GetMap(u){     
    $('#map').append('<img src="views/assets/base/img/content/events/'+u+'.jpg" class="img-responsive" style="margin: 0 auto;">');
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
                    proportion += '<div class="col-sm-5">'+modalityName+' ('+v.count+'): '+Math.round(v.percentage*100)+'%</div><div class="col-sm-7"><div class="progress"><div class="progress-bar progress-bar-info progress-bar-striped" role="progressbar" aria-valuenow="'+Math.round(v.percentage*100)+'" aria-valuemin="0" aria-valuemax="100" style="width: '+Math.round(v.percentage*100)+'%;"></div></div></div><div class="clearfix"> </div>'; 
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
            if(v.code == m && $.cookie('lang') === 'zh-cn') {
                mm = v.name;
                return false;
            } else if(v.code == m && $.cookie('lang') === 'en-us') {
                mm = v.remark;
                return false;
            }
            $.each(v.children, function(j,w) {
                if(w.code == m && $.cookie('lang') === 'zh-cn') {
                    mm = w.name;
                    return false;
                } else if(w.code == m && $.cookie('lang') === 'en-us') {
                    mm = w.remark;
                    return false;
                } 
                $.each(w.children, function(k,x) {
                    if(x.code == m && $.cookie('lang') === 'zh-cn') {
                        mm = x.name;
                        return false;
                    } else if(x.code == m && $.cookie('lang') === 'en-us') {
                        mm = x.remark;
                        return false;
                    }
                    $.each(x.children, function(l,y) {
                        if(y.code == m && $.cookie('lang') === 'zh-cn') {
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