var floor = [];
floor['f10'] = true;
floor['f9'] = true;
floor['f8'] = true;
floor['f7'] = true;
floor['f6'] = true;
floor['f5'] = true;
floor['f4'] = true;
floor['f3'] = true;
floor['f2'] = true;
floor['f1'] = true;
floor['fb1'] = true;

$(document).ready(function(){
    $(window).scroll(function() {
        var y = $(this).scrollTop();
        
        if (y <= $('#f10').offset().top) {
            $(".floor-guide").removeClass('floor-guide-active').removeClass('floor-guide-active-pre-pre').removeClass('floor-guide-active-pre').removeClass('floor-guide-active-next').removeClass('floor-guide-active-next-next');
            $( "#f8_g" ).addClass('floor-guide-active-pre-pre');
            $( "#f7_g" ).addClass('floor-guide-active-pre');
            $( "#f6_g" ).addClass('floor-guide-active');
            $( "#f5_g" ).addClass('floor-guide-active-next');
            $( "#f4_g" ).addClass('floor-guide-active-next-next');
        } else if (y <= $('#f9').offset().top && y > $('#f10').offset().top) {
            $(".floor-guide").removeClass('floor-guide-active').removeClass('floor-guide-active-pre-pre').removeClass('floor-guide-active-pre').removeClass('floor-guide-active-next').removeClass('floor-guide-active-next-next');
            $( "#f7_g" ).addClass('floor-guide-active-pre-pre');
            $( "#f6_g" ).addClass('floor-guide-active-pre');
            $( "#f5_g" ).addClass('floor-guide-active');
            $( "#f4_g" ).addClass('floor-guide-active-next');
            $( "#f3_g" ).addClass('floor-guide-active-next-next');
            getFloorInfo($.mallCode.shanghaiSbm,'九楼','f9');
        } else if (y <= $('#f8').offset().top && y > $('#f9').offset().top) {
            $(".floor-guide").removeClass('floor-guide-active').removeClass('floor-guide-active-pre-pre').removeClass('floor-guide-active-pre').removeClass('floor-guide-active-next').removeClass('floor-guide-active-next-next');
            $( "#f6_g" ).addClass('floor-guide-active-pre-pre');
            $( "#f5_g" ).addClass('floor-guide-active-pre');
            $( "#f4_g" ).addClass('floor-guide-active');
            $( "#f3_g" ).addClass('floor-guide-active-next');
            $( "#f2_g" ).addClass('floor-guide-active-next-next');
            getFloorInfo($.mallCode.shanghaiSbm,'八楼','f8');
        } else if (y <= $('#f7').offset().top && y > $('#f8').offset().top) {
            $(".floor-guide").removeClass('floor-guide-active').removeClass('floor-guide-active-pre-pre').removeClass('floor-guide-active-pre').removeClass('floor-guide-active-next').removeClass('floor-guide-active-next-next');
            $( "#f5_g" ).addClass('floor-guide-active-pre-pre');
            $( "#f4_g" ).addClass('floor-guide-active-pre');
            $( "#f3_g" ).addClass('floor-guide-active');
            $( "#f2_g" ).addClass('floor-guide-active-next');
            $( "#f1_g" ).addClass('floor-guide-active-next-next');
            getFloorInfo($.mallCode.shanghaiSbm,'七楼','f7');
        } else if (y <= $('#f6').offset().top && y > $('#f7').offset().top) {
            $(".floor-guide").removeClass('floor-guide-active').removeClass('floor-guide-active-pre-pre').removeClass('floor-guide-active-pre').removeClass('floor-guide-active-next').removeClass('floor-guide-active-next-next');
            $( "#f4_g" ).addClass('floor-guide-active-pre-pre');
            $( "#f3_g" ).addClass('floor-guide-active-pre');
            $( "#f2_g" ).addClass('floor-guide-active');
            $( "#f1_g" ).addClass('floor-guide-active-next');
            $( "#fb1_g" ).addClass('floor-guide-active-next-next');
            getFloorInfo($.mallCode.shanghaiSbm,'六楼','f6');
        } else if (y <= $('#f5').offset().top && y > $('#f6').offset().top) {
            $(".floor-guide").removeClass('floor-guide-active').removeClass('floor-guide-active-pre-pre').removeClass('floor-guide-active-pre').removeClass('floor-guide-active-next').removeClass('floor-guide-active-next-next');
            $( "#f10_g" ).addClass('floor-guide-active-pre-pre');
            $( "#f9_g" ).addClass('floor-guide-active-pre');
            $( "#f8_g" ).addClass('floor-guide-active');
            $( "#f7_g" ).addClass('floor-guide-active-next');
            $( "#f6_g" ).addClass('floor-guide-active-next-next');
            getFloorInfo($.mallCode.shanghaiSbm,'五楼','f5');
        } else if (y <= $('#f4').offset().top && y > $('#f5').offset().top) {
            $(".floor-guide").removeClass('floor-guide-active').removeClass('floor-guide-active-pre-pre').removeClass('floor-guide-active-pre').removeClass('floor-guide-active-next').removeClass('floor-guide-active-next-next');
            $( "#f9_g" ).addClass('floor-guide-active-pre-pre');
            $( "#f8_g" ).addClass('floor-guide-active-pre');
            $( "#f7_g" ).addClass('floor-guide-active');
            $( "#f6_g" ).addClass('floor-guide-active-next');
            $( "#f5_g" ).addClass('floor-guide-active-next-next');
            getFloorInfo($.mallCode.shanghaiSbm,'四楼','f4');
        } else if (y <= $('#f3').offset().top && y > $('#f4').offset().top) {
            $(".floor-guide").removeClass('floor-guide-active').removeClass('floor-guide-active-pre-pre').removeClass('floor-guide-active-pre').removeClass('floor-guide-active-next').removeClass('floor-guide-active-next-next');
            $( "#f8_g" ).addClass('floor-guide-active-pre-pre');
            $( "#f7_g" ).addClass('floor-guide-active-pre');
            $( "#f6_g" ).addClass('floor-guide-active');
            $( "#f5_g" ).addClass('floor-guide-active-next');
            $( "#f4_g" ).addClass('floor-guide-active-next-next');
            getFloorInfo($.mallCode.shanghaiSbm,'三楼','f3');
        } else if (y <= $('#f2').offset().top && y > $('#f3').offset().top) {
            $(".floor-guide").removeClass('floor-guide-active').removeClass('floor-guide-active-pre-pre').removeClass('floor-guide-active-pre').removeClass('floor-guide-active-next').removeClass('floor-guide-active-next-next');
            $( "#f7_g" ).addClass('floor-guide-active-pre-pre');
            $( "#f6_g" ).addClass('floor-guide-active-pre');
            $( "#f5_g" ).addClass('floor-guide-active');
            $( "#f4_g" ).addClass('floor-guide-active-next');
            $( "#f3_g" ).addClass('floor-guide-active-next-next');
            getFloorInfo($.mallCode.shanghaiSbm,'二楼','f2');
        } else if (y <= $('#f1').offset().top && y > $('#f2').offset().top) {
            $(".floor-guide").removeClass('floor-guide-active').removeClass('floor-guide-active-pre-pre').removeClass('floor-guide-active-pre').removeClass('floor-guide-active-next').removeClass('floor-guide-active-next-next');
            $( "#f6_g" ).addClass('floor-guide-active-pre-pre');
            $( "#f5_g" ).addClass('floor-guide-active-pre');
            $( "#f4_g" ).addClass('floor-guide-active');
            $( "#f3_g" ).addClass('floor-guide-active-next');
            $( "#f2_g" ).addClass('floor-guide-active-next-next');
            getFloorInfo($.mallCode.shanghaiSbm,'一楼','f1');
        } else if (y <= $('#fb1').offset().top && y > $('#f1').offset().top) {
            $(".floor-guide").removeClass('floor-guide-active').removeClass('floor-guide-active-pre-pre').removeClass('floor-guide-active-pre').removeClass('floor-guide-active-next').removeClass('floor-guide-active-next-next');
            $( "#f5_g" ).addClass('floor-guide-active-pre-pre');
            $( "#f4_g" ).addClass('floor-guide-active-pre');
            $( "#f3_g" ).addClass('floor-guide-active');
            $( "#f2_g" ).addClass('floor-guide-active-next');
            $( "#f1_g" ).addClass('floor-guide-active-next-next');
            getFloorInfo($.mallCode.shanghaiSbm,'负一楼','fb1');
        }
    });
    
    getMallInfo($.mallCode.shanghaiSbm);
    getFloorInfo($.mallCode.shanghaiSbm,'十楼','f10');
    
    document.addEventListener("webkitfullscreenchange", function (event) {
        if(document.webkitIsFullScreen){
            $('header, footer').css('display','none');
            $('video').parent().parent().css('height','100vh');
        } else {
            $('header, footer').css('display','block');
            $('video').parent().parent().css('height','auto');
        }
    });
});

function getMallInfo(mc) {
    $.ajax({
        url: $.api.baseNew+"/onlineleasing-customer/api/base/info/mall/"+mc+"",
        type: "GET",
        async: false,
        beforeSend: function(request) {
            request.setRequestHeader("Lang", $.cookie('lang'));
            request.setRequestHeader("Source", "onlineleasing");
        },
        complete: function(){},
        success: function (response, status, xhr) {
            if(response.code === 'C0') {
                var mall = response.data;
                var proportions = mall.proportion.details;
                var traffics = mall.traffic;
                
                if($.cookie('lang') === 'en-us'){
                    var mallName = mall.mallNameEng;
                    var description = mall.descriptionEng;
                    var location = mall.locationEng;
                } else {
                    var mallName = mall.mallName;
                    var description = mall.description;
                    var location = mall.location;
                }
                
                $('#mall_desc').html(description);
                $('#gross_floor_area').text(numberWithCommas(mall.grossFloorArea));
                $('#leasing_area').text(numberWithCommas(mall.leasingArea));
                $('#street').text(location || '-');
                $('.mall-name').text(mallName);
                
                var proportion = [];
                var modalityName = [];
                var mn;
                
                $.each(proportions, function(i,v){
                    mn = GetBrandModality3(v.code);
                    modalityName.push(mn+' ('+Math.round(v.percentage*100)+'%)');
                    proportion.push(Math.round(v.percentage*100));
                });
                
                var trafficType,text;
                var trafficText = "";
                $.each(traffics, function(i,v){
                    if($.cookie('lang') === 'en-us'){
                        trafficType = v.typeEng;
                        text = v.textEng;
                    } else {
                        trafficType = v.type;
                        text = v.text;
                    }
                    trafficText += '<li class="c-bg-before-red">'+trafficType + ' <small>'+text+'</small></li>';
                });
                $('#traffics').html(trafficText);
            } else {
                interpretBusinessCode(response.customerMessage);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}

function getFloorInfo(mc,fn,fl) {
    if(floor[fl] === true){
        floor[fl] = false;
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
                if(response.code === 'C0') {
                    var details = response.data.proportion.details;
                    var proportion = "";
                    var modalityName;
                    $.each(details, function(i,v){
                        modalityName = GetBrandModality3(v.code);
                        proportion += '<div class="col-sm-5 modality-name">'+modalityName+' ('+v.count+'): '+Math.round(v.percentage*100)+'%</div><div class="col-sm-7"><div class="progress"><div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="'+Math.round(v.percentage*100)+'" aria-valuemin="0" aria-valuemax="100" style="width: '+Math.round(v.percentage*100)+'%;"></div></div></div><div class="clearfix"> </div>'; 
                    });
                    $('#proportion_'+fl).html(proportion);
                } else {
                    interpretBusinessCode(response.customerMessage);
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
               console.log(textStatus, errorThrown);
            }
        });
    }
}

function GetBrandModality3(mod) {
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