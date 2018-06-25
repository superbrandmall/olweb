var floor = [];
floor['f4'] = true;
floor['f3'] = true;
floor['f2'] = true;
floor['f1'] = true;
floor['fb1'] = true;

$(document).ready(function(){
    $(window).scroll(function() {
        var y = $(this).scrollTop();
        
        if (y <= $('#f4').offset().top) {
            
        } else if (y <= $('#f3').offset().top && y > $('#f4').offset().top) {
            getFloorInfo($.mallCode.xuhuiTm,'三楼','f3');
        } else if (y <= $('#f2').offset().top && y > $('#f3').offset().top) {
            getFloorInfo($.mallCode.xuhuiTm,'二楼','f2');
        } else if (y <= $('#f1').offset().top && y > $('#f2').offset().top) {
            getFloorInfo($.mallCode.xuhuiTm,'一楼','f1');
        } else if (y <= $('#fb1').offset().top && y > $('#f1').offset().top) {
            getFloorInfo($.mallCode.xuhuiTm,'负一楼','fb1');
        }
    });
    
    getMallInfo($.mallCode.xuhuiTm);
    getFloorInfo($.mallCode.xuhuiTm,'四楼','f4');
    
    document.addEventListener("webkitfullscreenchange", function (event) {
        if(document.webkitIsFullScreen){
            $('header, footer').css('display','none');
            $('video').parent().parent().css('height','100vh');
        } else {
            $('header, footer').css('display','block');
            $('video').parent().parent().css('height','auto');
        }
    });
    
    if($.cookie('lang') === '2'){
        translateToEngMall();
    }
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
                
                $('#video').attr('src',mall.video);
                $('#mall_desc').html(mall.description);
                $('#gross_floor_area').text(numberWithCommas(mall.grossFloorArea));
                $('#leasing_area').text(numberWithCommas(mall.leasingArea));
                $('#street').text(mall.location || '-');
                $('.mall-name').text(mall.mallName);
                
                var proportion = [];
                var modalityName = [];
                var mn;
                
                $.each(proportions, function(i,v){
                    mn = GetBrandModality3(v.code);
                    modalityName.push(mn+' ('+Math.round(v.percentage*100)+'%)');
                    proportion.push(Math.round(v.percentage*100));
                });
                
                var trafficType;
                var trafficText = "";
                $.each(traffics, function(i,v){
                    switch(v.type){
                    case 'bus':
                        trafficType = "公交";
                        break;
                    case 'metro':
                        trafficType = "地铁";
                        break;
                    case 'parking':
                        trafficType = "停车位";
                        break;    
                    }
                    trafficText += '<li class="c-bg-before-red">'+trafficType + ' <small>'+v.text+'</small></li>';
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
                        proportion += '<div class="col-sm-5 modality-name">'+modalityName+' ('+v.count+'家): '+Math.round(v.percentage*100)+'%</div><div class="col-sm-7"><div class="progress"><div class="progress-bar progress-bar-info progress-bar-striped" role="progressbar" aria-valuenow="'+Math.round(v.percentage*100)+'" aria-valuemin="0" aria-valuemax="100" style="width: '+Math.round(v.percentage*100)+'%;"></div></div></div><div class="clearfix"> </div>'; 
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
    var mm = '其它';
    if(mod !== null && mod !== '') {
        var m = mod;
        $.each($.parseJSON(sessionStorage.getItem("modalities")), function(i,v) {
            if(v.code == m) {
                mm = v.name;
                return false;
            }
            $.each(v.children, function(j,w) {
                if(w.code == m) {
                    mm = w.name;
                    return false;
                }
                $.each(w.children, function(k,x) {
                    if(x.code == m) {
                        mm = x.name;
                        return false;
                    }
                    $.each(x.children, function(l,y) {
                        if(y.code == m) {
                            mm = y.name;
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

function translateToEngMall() {
    var e = $(".c-layout-page");
    e.html(e.html()
            .replace(/\正大乐城徐汇购物中心/g, "Xuhui TouchMall")
            .replace(/\正大乐城郑州购物中心/g, "Zhengzhou TouchMall")
            .replace(/\正大乐城无锡购物中心/g, "Wuxi TouchMall")
            .replace(/\正大乐城西安购物中心/g, "Xi’an TouchMall")
            .replace(/\项目介绍/g, "Enter")
            .replace(/\尽请期待/g, "Coming Soon"));
}