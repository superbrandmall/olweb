var d = new Date();
var month = d.getMonth()+1;
var day = d.getDate();
var date = d.getFullYear() + '-' +
    (month<10 ? '0' : '') + month + '-' +
    (day<10 ? '0' : '') + day;

$(document).ready(function(){
    if(sessionStorage.getItem("searches") && sessionStorage.getItem("searches") != null && sessionStorage.getItem("searches") != '') {
        ShowResults($.parseJSON(sessionStorage.getItem("searches")),'');
    } else {
        ShowSearchInit();
    }
})

function ShowSearchInit(){
    var mallCodes = [$.mallCode.shanghaiSbm];
    if(getURLParameter('mall')) {
        switch (getURLParameter('mall')) {
            case "olmall180917000003":
                mallCodes = [$.mallCode.shanghaiSbm];
                break;
            case "olmall190117000001":
                mallCodes = [$.mallCode.luoyangSbm];
                break;
            default:
                break;
        }
    }
    
    $('#stores').html('');
    var map = {
        userCode: '',
        brandCode: '',
        brandName: '',
        brandModality: '',
        subType: '正柜',
        minArea: 0,
        maxArea: 3000,
        startDate: IncrMonth(date),
        endDate: '',
        mallCodes: mallCodes,
        max: 9,
        rentalLength: ''
    };
    $.ajax({
        url: $.api.baseNew+"/onlineleasing-customer/api/searchshop/details",
        type: "POST",
        data: JSON.stringify(map),
        async: false,
        dataType: "json",
        contentType: "application/json",
        beforeSend: function(request) {
            $('#loader').show();
            request.setRequestHeader("Lang", $.cookie('lang'));
            request.setRequestHeader("Source", "onlineleasing");
        },
        success: function (response, status, xhr) {
            $('#loader').hide();
            if(response.code === 'C0') {
                if(response.data.result.length > 0){
                    ShowResults(response.data.result,response.data.searchShopDetailCode);
                }
                
            } else {
                interpretBusinessCode(response.customerMessage);
            } 
        }
    });
}

function ShowResults(result,searchCode) {
    var mallName,floorName;
    $.each(result, function(i,v){                  
        var star_length;
        if(v.score === 100){
            star_length = 100;
        } else if(v.score >= 90 && v.score < 100){
            star_length = 80;
        } else if(v.score >= 80 && v.score < 90){
            star_length = 60;
        } else if(v.score >= 70 && v.score < 80){
            star_length = 50;
        } else if(v.score >= 60 && v.score < 70){
            star_length = 40;
        } else if(v.score >= 40 && v.score < 60){
            star_length = 30;
        } else if(v.score >= 20 && v.score < 40){
            star_length = 20;
        } else if(v.score >= 0 && v.score < 20){
            star_length = 10;
        }

        var modality;

        if(v.modality !== '' && v.modality !== null){
            $.each($.parseJSON(sessionStorage.getItem("modalities")), function(i,u) {
                $.each(u.children, function(j,w) {
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
        
        $('#stores').append('<div class="list clearfloat fl box-s">\n\
            <a href="house-details.html">\n\
                <div class="tu clearfloat">\n\
                    <span></span>\n\
                    <img src="'+v.firstImage+'"/>\n\
                </div>\n\
                <div class="right clearfloat">\n\
                    <div class="tit clearfloat">\n\
                        <p class="fl">正大广场陆家嘴购物中心</p>\n\
                        <span class="fr"><span><i class="iconfont icon-duihao"></i>随时住</span></span>\n\
                    </div>\n\
                    <p class="recom-jianjie">'+floorName+'   |  '+v.area+'m²  |  '+modality+'</p>\n\
                    <div class="recom-bottom clearfloat">\n\
                        <span style="float:left">推荐指数:</span> <span style="float:left;height:20px;width:'+star_length+'px;background:url(/views/assets/base/img/content/misc/star.png) 0 0 repeat-x;"></span>\n\
                    </div>\n\
                </div>\n\
            </a>\n\
        </div>');
        
        /*$('.c-content-list').append('<div class="col-md-4" style="display: none;"><div class="c-content-person-1 c-option-2 c-shadow">\n\
<div class="c-caption c-content-overlay"><div class="c-overlay-wrapper">\n\
<div class="c-overlay-content"><a class="cbp-l-caption-buttonLeft btn c-btn-square c-btn-border-1x c-btn-white c-btn-bold c-btn-uppercase" href="shop?id='+v.code+'&search='+searchCode+'">'+$.lang.dianpujieshao+'</a></div></div><img class="c-overlay-object img-responsive" src="'+img+'" alt=""></div>\n\
<div class="c-body"><div class="c-head"><div class="c-name c-font-uppercase c-font-bold">'+mallName+'</div>\n\
</div>\n\
<div class="c-position">'+$.lang.louceng+': '+floorName+'</div><div class="c-position">'+$.lang.mianji+': '+v.area+'m<sup>2</sup></div><div class="c-position" style="text-overflow: ellipsis;overflow: hidden;white-space: nowrap;width: 100%;">'+$.lang.modality+': '+modality+'</div>\n\
<div class="c-position"><div style="float: left;margin-right: 5px">'+$.lang.pipei+': </div><div style="float:left;height:20px;width:'+star_length+'px;background:url(views/assets/base/img/content/misc/star.png) 0 0 repeat-x;"></div>\n\
</div></div>\n\
</div></div>');*/
    });

    /*var size_li = $(".c-content-list > div").size();
    var x=9;
    if(size_li > x){
        $('#loadMore-container').fadeIn();
    }
    $('.c-content-list > div:lt('+x+')').fadeIn();
    $('.cbp-l-loadMore-link').click(function () {
        x= (x+9 <= size_li) ? x+9 : size_li;
        $('.c-content-list > div:lt('+x+')').fadeIn();

        if(x === size_li){
            $('#loadMore-container').fadeOut();
        }
    });*/
}