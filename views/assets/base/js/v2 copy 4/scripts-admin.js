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
    document.addEventListener('WeixinJSBridgeReady', function() {
        document.getElementById('welcome_video').play(); 
    });
    
    new WOW().init();
            
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

function showVR(url){
    showLoading();
    setTimeout(function () {
        hideLoading();
        $("#vr_viewer iframe").attr('src',url);
        $("#vr_viewer").show();
    },100);  
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

function audioplay(id){
    var audio = document.getElementById(id);
    !audio.paused?audio.pause():audio.play();

    document.addEventListener("WeixinJSBridgeReady", function () {
        !audio.paused?audio.pause():audio.play();
    }, false);
}

function bgAudioPlay() {
    const ap = new APlayer({
        container: document.getElementById('aplayer'),
        autoplay: true,
        preload: 'auto',
        loop: 'all',
        volume: 0.1,
        audio: [{
            url: '/upload/audio/v2_bg_music.mp3'
        }]
    });
        
    //音轨补偿
    setTimeout(function(){
        //如果发现有本地存储，则进行音轨补偿
        if(localStorage.getItem('bgm_time') != null) {
            ap.seek(localStorage.getItem('bgm_time'));
            ap.play();
        }
        //不断循环记录播放进度
        window.setInterval(function(){
            //检测是否支持本地存储
            if(typeof(Storage) !== 'undefined'){
                //写入BGM播放进度
                localStorage.setItem('bgm_time',ap.audio.currentTime);
            }
        },100);
        //初始化启动BGM
        ap.play();
    },1000);
}

function numberWithCommas(x) {
    if(x == null){
        return '-';
    } else {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
}

function IncrDate(date_str){
    if(date_str){
        var parts = date_str.split("-");
        var dt = new Date(
          parseInt(parts[0], 10),      // year
          parseInt(parts[1], 10) - 1,  // month (starts with 0)
          parseInt(parts[2], 10)       // date
        );
        dt.setDate(dt.getDate() + 1);
        parts[0] = "" + dt.getFullYear();
        parts[1] = "" + (dt.getMonth() + 1);
        if (parts[1].length < 2) {
          parts[1] = "0" + parts[1];
        }
        parts[2] = "" + dt.getDate();
        if (parts[2].length < 2) {
          parts[2] = "0" + parts[2];
        }
        return parts.join("-");
    } else {
        return '';
    }
}

function DecrDate(date_str){
    if(date_str){
        var parts = date_str.split("-");
        var dt = new Date(
          parseInt(parts[0], 10),      // year
          parseInt(parts[1], 10) - 1,  // month (starts with 0)
          parseInt(parts[2], 10)       // date
        );
        dt.setDate(dt.getDate() - 1);
        parts[0] = "" + dt.getFullYear();
        parts[1] = "" + (dt.getMonth() + 1);
        if (parts[1].length < 2) {
          parts[1] = "0" + parts[1];
        }
        parts[2] = "" + dt.getDate();
        if (parts[2].length < 2) {
          parts[2] = "0" + parts[2];
        }
        return parts.join("-");
    } else {
        return '';
    }
}

function IncrDates(date_str,dates){
    if(date_str){
        var parts = date_str.split("-");
        var dt = new Date(
          parseInt(parts[0], 10),      // year
          parseInt(parts[1], 10) - 1,  // month (starts with 0)
          parseInt(parts[2], 10)       // date
        );
        dt.setDate(dt.getDate() + dates);
        parts[0] = "" + dt.getFullYear();
        parts[1] = "" + (dt.getMonth() + 1);
        if (parts[1].length < 2) {
          parts[1] = "0" + parts[1];
        }
        parts[2] = "" + dt.getDate();
        if (parts[2].length < 2) {
          parts[2] = "0" + parts[2];
        }
        return parts.join("-");
    } else {
        return '';
    }
}

function IncrMonth(date_str){
    if(date_str){
        var parts = date_str.split("-");
        var dt = new Date(
          parseInt(parts[0], 10),      // year
          parseInt(parts[1], 10),  // month (starts with 0)
          parseInt(parts[2], 10)       // date
        );
        dt.setDate(dt.getDate());
        parts[0] = "" + dt.getFullYear();
        parts[1] = "" + (Number(dt.getMonth()) + 1);
        if (parts[1].length < 2) {
          parts[1] = "0" + parts[1];
        }
        parts[2] = "" + dt.getDate();
        if (parts[2].length < 2) {
          parts[2] = "0" + parts[2];
        }
        return parts.join("-");
    } else {
        return '';
    }
}

function IncrMonths(date_str, months){
    if(date_str){
        var parts = date_str.split("-");
        var dt = new Date(
          parseInt(parts[0], 10),      // year
          parseInt(parts[1], 10),  // month (starts with 0)
          parseInt(parts[2], 10)       // date
        );
        dt.setDate(dt.getDate());
        parts[0] = "" + dt.getFullYear();
        parts[1] = "" + (Number(dt.getMonth()) + Number(months));
        if (parts[1].length < 2) {
          parts[1] = "0" + parts[1];
        }
        parts[2] = "" + dt.getDate();
        if (parts[2].length < 2) {
          parts[2] = "0" + parts[2];
        }
        return parts.join("-");
    } else {
        return '';
    }
}

function IncrYear(date_str){
    if(date_str){
        var parts = date_str.split("-");
        var dt = new Date(
          parseInt(parts[0], 10),      // year
          parseInt(parts[1], 10) - 1,  // month (starts with 0)
          parseInt(parts[2], 10)       // date
        );
        dt.setDate(dt.getDate());
        parts[0] = "" + (Number(dt.getFullYear()) + 1);
        parts[1] = "" + (dt.getMonth() + 1);
        if (parts[1].length < 2) {
          parts[1] = "0" + parts[1];
        }
        parts[2] = "" + dt.getDate();
        if (parts[2].length < 2) {
            parts[2] = "0" + parts[2];
        }
        return parts.join("-");
            
    } else {
        return '';
    }
}

function IncrYears(date_str, years){
    if(date_str){
        var parts = date_str.split("-");
        var dt = new Date(
          parseInt(parts[0], 10),      // year
          parseInt(parts[1], 10) - 1,  // month (starts with 0)
          parseInt(parts[2], 10)       // date
        );
        dt.setDate(dt.getDate());
        parts[0] = "" + (Number(dt.getFullYear()) + Number(years));
        parts[1] = "" + (dt.getMonth() + 1);
        if (parts[1].length < 2) {
          parts[1] = "0" + parts[1];
        }
        parts[2] = "" + dt.getDate();
        if (parts[2].length < 2) {
            parts[2] = "0" + parts[2];
        }
        return parts.join("-"); 
    } else {
        return '';
    }
}

$.validator.addMethod('numChar',function(text){
    var regex = /^[0-9a-zA-Z\ ]+$|(^$)/;
    return regex.test(text);
}, "The value entered is invalid");

var date_n = new Date();

function formatTime(date_n) {
    var year = date_n.getFullYear();
    var month = date_n.getMonth() + 1;
    var day = date_n.getDate();
    var hour = date_n.getHours();
    var minute = date_n.getMinutes();
    var second = date_n.getSeconds(); 
    return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':');
}
  
function formatNumber (n){
    n = n.toString();
    return n[1] ? n : '0' + n;
}

function saveMsgLog (name,content,trade,type,unit,url){
    sendSMS (name,content);
    var map = {
        "mobileNo": $.cookie('uid'),
        "name": name,
        "operatorContent": content,
        "orderCode": trade,
        "state": 1,
        "type": type,
        "unitCode": unit,
        "userCode": $.cookie('uid')
    }
    
    $.ajax({
        url: $.api.baseNew+"/comm-wechatol/api/wechatlog/save",
        type: "POST",
        data: JSON.stringify(map),
        async: false,
        dataType: "json",
        contentType: "application/json",
        beforeSend: function(request) {
            showLoading();
            request.setRequestHeader("Login", $.cookie('login'));
            request.setRequestHeader("Authorization", $.cookie('authorization'));
            request.setRequestHeader("Lang", $.cookie('lang'));
            request.setRequestHeader("Source", "onlineleasing");
        },
        complete: function(){},
        success: function (response, status, xhr) {
            hideLoading();
            if(response.code === 'C0') {
                if(xhr.getResponseHeader("Authorization") !== null) {
                    $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                }
                
                if(url != '') {
                    window.location.href = url;
                }
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    })
}

function sendSMS (name,cont){
    var reg = new RegExp('/',"g");
    var content = cont.replace(reg,'／');
    $.ajax({
        url: $.api.baseNew+"/comm-wechatol/api/sms/sendCommMessage?mobileNo="+$.cookie('uid')+"&reason="+name+"&message="+content,
        type: "POST",
        async: false,
        dataType: "json",
        contentType: "application/json",
        beforeSend: function(request) {
            showLoading();
            request.setRequestHeader("Login", $.cookie('login'));
            request.setRequestHeader("Authorization", $.cookie('authorization'));
            request.setRequestHeader("Lang", $.cookie('lang'));
            request.setRequestHeader("Source", "onlineleasing");
        },
        complete: function(){},
        success: function (response, status, xhr) {
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    })
}

function dateCompare(date1,date2){
    date1 = date1.replace(/\-/gi,"/");
    date2 = date2.replace(/\-/gi,"/");
    var time1 = new Date(date1).getTime();
    var time2 = new Date(date2).getTime();
    if(time1 > time2){
        return false;
    }else if(time1 == time2){
        return false;
    }else{
        return true;
    }
}