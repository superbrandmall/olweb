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
            $.showLoading("数据加载中");
            request.setRequestHeader("Lang", $.cookie('lang'));
            request.setRequestHeader("Source", "onlineleasing");
        },
        success: function (response, status, xhr) {
            $.hideLoading();
            if(response.code === 'C0') {
                if(response.data.result.length > 0){
                    ShowResults(response.data.result,response.data.searchShopDetailCode);
                } else {
                    $.toast("数据获取失败","cancel");
                }
                
            } else {
                $.toast("数据获取失败","cancel");
                interpretBusinessCode(response.customerMessage);
            } 
        }
    });
}

function ShowResults(result,searchCode) {
    var mallName,floorName;
    $.each(result, function(i,v){                  
        var star_length;
        if(v.score == 100){
            star_length = 96;
        } else if(v.score >= 90 && v.score < 100){
            star_length = 86;
        } else if(v.score >= 80 && v.score < 90){
            star_length = 76;
        } else if(v.score >= 70 && v.score < 80){
            star_length = 66;
        } else if(v.score >= 60 && v.score < 70){
            star_length = 56;
        } else if(v.score >= 50 && v.score < 60){
            star_length = 46;
        } else if(v.score >= 40 && v.score < 50){
            star_length = 36;
        } else if(v.score >= 30 && v.score < 40){
            star_length = 26;
        } else if(v.score >= 20 && v.score < 30){
            star_length = 16;
        } else if(v.score >= 0 && v.score < 20){
            star_length = 6;
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
        
        $('#stores').show().append('<li>\n\
        <a href="/v3/store?id='+v.code+'&type=leasing" class="house-link"></a>\n\
        <div class="con">\n\
            <div class="house-pic"><img src="'+v.firstImage+'"></div>\n\
            <div class="house-detail">\n\
                <h3>'+v.unit+'</h3>\n\
                <div class="house-mj">正大广场陆家嘴购物中心 '+floorName+'</div>\n\
                <div class="house-price">\n\
                        <span class="price-total">'+modality+'</span>\n\
                        <span class="unit-price">'+v.area+'m²</span>\n\
                </div>\n\
                <div class="tag-box">\n\
                    <span class="tag five">推荐指数</span>\n\
                    <span style="display:inline-block;vertical-align:bottom;height:18px;width:'+star_length+'px;background:url(/views/assets/base/img/content/misc/star.png) 0 0 repeat-x;"></span></span>\n\
                </div>\n\
            </div>\n\
        </div>\n\
    </li>');
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