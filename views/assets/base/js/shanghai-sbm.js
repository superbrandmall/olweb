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
    getMallInfo($.mallCode.shanghaiSbm);
    getFloorInfo($.mallCode.shanghaiSbm,'负一楼','fb1');
    getFloorInfo($.mallCode.shanghaiSbm,'一楼','f1');
    getFloorInfo($.mallCode.shanghaiSbm,'二楼','f2');
    getFloorInfo($.mallCode.shanghaiSbm,'三楼','f3');
    getFloorInfo($.mallCode.shanghaiSbm,'四楼','f4');
    getFloorInfo($.mallCode.shanghaiSbm,'五楼','f5');
    getFloorInfo($.mallCode.shanghaiSbm,'六楼','f6');
    getFloorInfo($.mallCode.shanghaiSbm,'七楼','f7');
    getFloorInfo($.mallCode.shanghaiSbm,'八楼','f8');
    getFloorInfo($.mallCode.shanghaiSbm,'九楼','f9');
    getFloorInfo($.mallCode.shanghaiSbm,'十楼','f10');
    
    setTimeout(function () {
        $('.owl-mall-carousel').css('visibility','visible');
    },1000);
    
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
                
                //$('video').attr('src',mall.video);
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
                        proportion += '<div class="col-xs-8" style="text-align: left; padding: 0;">'+modalityName+' ('+v.count+$.lang.jia+')</div><div class="col-xs-4" style="text-align: right;">'+Math.round(v.percentage*100)+'%</div><div class="clearfix"> </div>'; 
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