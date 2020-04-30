$.api = {
    base: "http://10.130.12.15:8080/oldataservice/ol/api",
    baseNew: $.base,
    emailVC: "",
    mobileVC: ""
};

var d = new Date();
var month = d.getMonth()+1;
var day = d.getDate();
var date = d.getFullYear() + '-' +
    (month<10 ? '0' : '') + month + '-' +
    (day<10 ? '0' : '') + day;

$(document).ready(function(){
    if(!sessionStorage.getItem("malls") || sessionStorage.getItem("malls") == null || sessionStorage.getItem("malls") == '') {
        getMalls();
    }

    if(!sessionStorage.getItem("floors") || sessionStorage.getItem("floors") == null || sessionStorage.getItem("floors") == '') {
        getFloors();
    }

    if(!sessionStorage.getItem("category") || sessionStorage.getItem("category") == null || sessionStorage.getItem("category") == '') {
        getNewCategories();
    }
});

function getURLParameter(sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) {
            return sParameterName[1];
        }
    }
}

function getMalls() {
    $.ajax({
        url: $.api.baseNew+"/onlineleasing-customer/api/base/info/mall/findAllOrderByPosition",
        type: "GET",
        async: false,
        beforeSend: function(request) {
            showLoading();
            request.setRequestHeader("Lang", $.cookie('lang'));
            request.setRequestHeader("Source", "onlineleasing");
        },
        success: function (response, status, xhr) {
            if(response.code === 'C0') {
                hideLoading();
                sessionStorage.setItem("malls", JSON.stringify(response.data) );
            } else {
                interpretBusinessCode(response.customerMessage);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}

function getFloors() {
    $.ajax({
        url: $.api.baseNew+"/onlineleasing-customer/api/base/info/floor/findAll",
        type: "GET",
        async: false,
        beforeSend: function(request) {
            showLoading();
            request.setRequestHeader("Lang", $.cookie('lang'));
            request.setRequestHeader("Source", "onlineleasing");
        },
        success: function (response, status, xhr) {
            if(response.code === 'C0') {
                hideLoading();
                sessionStorage.setItem("floors", JSON.stringify(response.data) );
            } else {
                interpretBusinessCode(response.customerMessage);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}

function getNewCategories() {
    var category = [];
    category.push(
        {code: 'OLCATEGORY190719000001',name: 'F&B-Chinese',desc: '中餐',isRetail: 0},
        {code: 'OLCATEGORY190719000002',name: 'F&B-Asian/Others',desc: '亚洲菜',isRetail: 0},
        {code: 'OLCATEGORY190719000003',name: 'F&B-Western & Bars & Clubs',desc: '西餐&酒吧',isRetail: 0},
        {code: 'OLCATEGORY190719000004',name: 'F&B-Fast Food/Drink Coffee/Desserts',desc: '快餐&咖啡奶茶&甜品',isRetail: 0},
        {code: 'OLCATEGORY190719000005',name: 'Selective Luxury',desc: '轻奢',isRetail: 1},
        {code: 'OLCATEGORY190719000006',name: "Men's Fashion",desc: '男性时尚',isRetail: 1},
        {code: 'OLCATEGORY190719000007',name: 'Cosmetics',desc: '化妆品',isRetail: 1},
        {code: 'OLCATEGORY190719000008',name: 'Sports',desc: '运动潮流',isRetail: 1},
        {code: 'OLCATEGORY190719000009',name: 'Entertainment',desc: '娱乐',isRetail: 0},
        {code: 'OLCATEGORY190719000010',name: 'Digital Products',desc: '电子产品',isRetail: 1},
        {code: 'OLCATEGORY190719000011',name: 'IP',desc: 'IP',isRetail: 1},
        {code: 'OLCATEGORY190719000012',name: "Women's Fashion",desc: '女性时尚',isRetail: 1},
        {code: 'OLCATEGORY190719000013',name: 'Underwear',desc: '内衣',isRetail: 1},
        {code: 'OLCATEGORY190719000014',name: 'Shoes/Bags',desc: '鞋包',isRetail: 1},
        {code: 'OLCATEGORY190719000015',name: 'Jewelry/Watches',desc: '黄金珠宝/表',isRetail: 1},
        {code: 'OLCATEGORY190719000016',name: 'Accessories',desc: '首饰配饰',isRetail: 1},
        {code: 'OLCATEGORY190719000017',name: 'Home/Lifestyle',desc: '家居/生活方式',isRetail: 1},
        {code: 'OLCATEGORY190719000018',name: 'Tourist items',desc: '旅游',isRetail: 1},
        {code: 'OLCATEGORY190719000019',name: 'Health & Wellness',desc: '健身&健康体验',isRetail: 0},
        {code: 'OLCATEGORY190719000020',name: 'Kids & Senior Citizens',desc: '儿童类',isRetail: 1},
        {code: 'OLCATEGORY190719000021',name: 'Fast Fashion',desc: '快时尚',isRetail: 1},
        {code: 'OLCATEGORY190719000022',name: 'Kiosks',desc: '临时柜',isRetail: 0},
        {code: 'OLCATEGORY190719000023',name: 'Service',desc: '服务',isRetail: 0}
    ) 
    sessionStorage.setItem("category", JSON.stringify(category));
}

function showGallery(src){
    if($('.weui-gallery__img').length > 0){
        $(this).remove();
    }
    $("#gallery").show().append('<span class="weui-gallery__img" style="background-image: url('+src+');"></span>');
}

function scrollTo(e){
    $('html, body').animate({
        scrollTop: e.offset().top
    }, 1000);
}

function interpretBusinessCode(msg) {
    if(msg !== ''){
        $('#ui_alert').text(msg).slideDown().delay(2000).slideUp(0);
        $('html, body').animate({
            scrollTop: $('#ui_alert').offset().top
        }, 0);
    }
}

function showLoading() {
    var $loadingToast = $('#loadingToast');
    if ($loadingToast.css('display') != 'none') return;
    $loadingToast.fadeIn();
}

function hideLoading() {
    var $loadingToast = $('#loadingToast');
    if ($loadingToast.css('display') == 'none') return;
    $loadingToast.fadeOut();
}

$.validator.addMethod('numChar',function(text){
    var regex = /^[0-9a-zA-Z\ ]+$|(^$)/;
    return regex.test(text);
}, "The value entered is invalid");