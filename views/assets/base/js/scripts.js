$.api = {
    base: "http://10.130.12.15:8080/oldataservice/ol/api",
    baseNew: $.base,
    emailVC: "",
    mobileVC: ""
};

if($.cookie('lang') === 'en-us'){
    $.lang = {
        reserveShop: 'Reserve',
        reserveEvent: 'Reserve',
        addToFav: 'Add to favorite',
        addToFav2: 'Add to favorite',
        removeFromFav: 'Remove from favorite',
        thisStore: 'This store',
        forRent: 'For rent',
        emailVerify: 'Email',
        mobileVerify: 'Mobile',
        sendCode: 'Send',
        sendVerificationCode: 'Send',
        verifyCode: 'Code',
        resendCode: 'Re-send',
        certifiedNonRemodifiable: 'Certified and non remodifiable',
        noReservations: "You don't have any reservations yet",
        reserveNegotiation: 'Reserve for negotiation',
        shopUnit: 'Unit',
        floor: 'Floor',
        recommandModality: 'Category',
        leasableArea: 'Leasable area',
        reserveDate: 'Date reserved',
        leasingPeriod: 'Leasing Period',
        reserveAmount: 'Stores reserved',
        reserveCallBack: 'Reserve succeeded, our leasing experts will contact you within 2 working days.',
        noFavourites: "You don't have any favourite stores yet",
        shopIntro: 'Store detail',
        modality: 'Category',
        choose: 'Please choose',
        contactPhone: 'Contact',
        recommandStores: 'Recommended stores',
        jia: '',
        dianpujieshao : "Store info",
        louceng : "Floor",
        mianji : "Area",
        pipei : "Matching",
        yuyue : "Reserve",
        kanpu : " date",
        qiatan : " date",
        mallLangCat: "en"
    };
} else {
    $.lang = {
        reserveShop: '预约看铺',
        reserveEvent: '预约看场',
        addToFav: '关注该店铺',
        addToFav2: '关注该场地',
        removeFromFav: '取消关注',
        thisStore: '本店铺',
        forRent: '待租',
        emailVerify: '邮箱验证',
        mobileVerify: '手机验证',
        sendCode: '发送',
        sendVerificationCode: '发送验证码',
        verifyCode: '验证码',
        resendCode: '重新发送',
        certifiedNonRemodifiable: '已认证，不可修改',
        noReservations: '您目前没有任何看铺预约',
        reserveNegotiation: '预约洽谈',
        shopUnit: '单元号',
        floor: '所在楼层',
        recommandModality: '推荐业态',
        leasableArea: '租赁面积',
        reserveDate: '预约时间',
        leasingPeriod: '租约时限',
        reserveAmount: '预约数量',
        reserveCallBack: '预约成功，我们的招商人员会在2个工作日内与您取得联系。',
        noFavourites: '您目前没有关注任何店铺',
        shopIntro: '店铺介绍',
        modality: '业态',
        choose: '请选择',
        contactPhone: '联系电话',
        recommandStores: '推荐店铺',
        jia: '家',
        dianpujieshao : "店铺介绍",
        louceng : "楼层",
        mianji : "面积",
        pipei : "匹配",
        yuyue : "预约",
        kanpu : "看铺",
        qiatan : "洽谈",
        mallLangCat: "cn"
    };
}

$(document).ready(function(){
    if(!sessionStorage.getItem("malls") || sessionStorage.getItem("malls") == null || sessionStorage.getItem("malls") == '') {
        getMalls();
    }
    getMallList();
    
    $('#c_link_cn').click(function(){
        $.cookie('lang','zh-cn');
    });
    
    $('#c_link_en').click(function(){
        $.cookie('lang','en-us');
    });
    
    $('#dropdownMenu1').html('');
    
    if(!sessionStorage.getItem("floors") || sessionStorage.getItem("floors") == null || sessionStorage.getItem("floors") == '') {
        getFloors();
    }
    
    if(!sessionStorage.getItem("modalities") || sessionStorage.getItem("modalities") == null || sessionStorage.getItem("modalities") == '') {
        getModalities();
    }
    
    if($.cookie('cookie') && $.cookie('cookie') == 1){
        $('.c-topbar').hide();
        
    } else {
        $('.c-topbar').slideDown();
        $('.c-topbar a').click(function(){
            $('.c-topbar').slideUp();
            $.cookie('cookie',1);
        });
    }
    
    $('.floor-maps a[data-toggle="modal"]').on('click', function(){
        var modal_id = $(this).attr('data-target');
        $(modal_id+' .modal-content').load(
            $(this).attr('href')
        );
    });
    
    $('#headingOne-6 a').click(function() {
        $("i", this).toggleClass("fa-chevron-up fa-chevron-down");
    });

    if($.cookie('newlogin') && $.cookie('newlogin') == 1){
        $('.login-succeed').show().delay(2000).hide(0);
        $.cookie('newlogin',0);
    }
    
    if(getURLParameter('k')){
        switch (getURLParameter('k')) {
            case "login":
                $('#login-form').modal('show');
                break;
        }
        setTimeout(function () {
            window.history.pushState("object or string", "Title", "/"+refineUrl() );
        },1000);
    }
    
    if($.cookie('lang') === 'en-us'){
        translateToEngDefault();
    }
});

function getMallList() {
    var mallName,location;
    $.each($.parseJSON(sessionStorage.getItem("malls")), function(i,v) {
        if($.cookie('lang') === 'en-us'){
            mallName = v.mallNameEng;
            location = v.locationEng;
        } else {
            mallName = v.mallName;
            location = v.location;
        }
    
        if($('#mall_list').length >0){
            $('#mall_list').append('<div class="cbp-item web-design logos">\n\
            <div class="cbp-caption">\n\
            <div class="cbp-caption-defaultWrap"><img src="'+v.img+'" alt=""></div>\n\
            <div class="cbp-caption-activeWrap">\n\
            <div class="c-masonry-border"></div>\n\
            <div class="cbp-l-caption-alignCenter">\n\
            <div class="cbp-l-caption-body">\n\
            <a href="'+v.mallCode.toLowerCase()+'" class="cbp-l-caption-buttonLeft btn c-btn-square c-btn-border-1x c-btn-white c-btn-bold c-btn-uppercase">项目介绍</a>\n\
            </div></div></div></div>\n\
            <div class="cbp-l-grid-projects-desc"> '+mallName+' </div></div>');
        }
        
        $('#mall_list_top').append('<li><a href="'+v.mallCode.toLowerCase()+'">'+mallName+'</a></li>');
                
        if($('#mall_list_sm').length > 0){
            $('#mall_list_sm').append('<div class="cbp-item web-design logos">\n\
            <div class="cbp-caption">\n\
            <div class="cbp-caption-defaultWrap"><img src="'+v.img+'" alt=""></div>\n\
            <div class="cbp-caption-activeWrap">\n\
            <div class="c-masonry-border"></div>\n\
            <div class="cbp-l-caption-alignCenter">\n\
            <div class="cbp-l-caption-body">\n\
            <a href="'+v.mallCode.toLowerCase()+'" class="cbp-l-caption-buttonLeft btn c-btn-square c-btn-border-1x c-btn-white c-btn-bold c-btn-uppercase">项目介绍</a>\n\
            </div></div></div></div>\n\
            <div class="cbp-l-grid-projects-title"> '+mallName+' </div><div class="cbp-l-grid-projects-desc"> '+location+' </div></div>');
        }
    });
    
    if($('#mall_list').length >0){
        /******** Zhengzhou ***************/
        $('#mall_list').append('<div class="cbp-item web-design logos">\n\
        <div class="cbp-caption">\n\
        <div class="cbp-caption-defaultWrap"><img src="views/assets/base/img/content/mall/zhengzhou-tm.jpg" alt=""></div>\n\
        <div class="cbp-caption-activeWrap">\n\
        <div class="c-masonry-border"></div>\n\
        <div class="cbp-l-caption-alignCenter">\n\
        <div class="cbp-l-caption-body">\n\
        <a href="#!" class="cbp-l-caption-buttonLeft btn c-btn-square c-btn-border-1x c-btn-white c-btn-bold c-btn-uppercase">尽请期待</a>\n\
        </div></div></div></div>\n\
        <div class="cbp-l-grid-projects-desc">正大乐城郑州购物中心</div></div>');

        /******** Wuxi ***************/
        $('#mall_list').append('<div class="cbp-item web-design logos">\n\
        <div class="cbp-caption">\n\
        <div class="cbp-caption-defaultWrap"><img src="views/assets/base/img/content/mall/wuxi-tm.jpg" alt=""></div>\n\
        <div class="cbp-caption-activeWrap">\n\
        <div class="c-masonry-border"></div>\n\
        <div class="cbp-l-caption-alignCenter">\n\
        <div class="cbp-l-caption-body">\n\
        <a href="#!" class="cbp-l-caption-buttonLeft btn c-btn-square c-btn-border-1x c-btn-white c-btn-bold c-btn-uppercase">尽请期待</a>\n\
        </div></div></div></div>\n\
        <div class="cbp-l-grid-projects-desc">正大乐城无锡购物中心</div></div>');

        /******** Xi'an ***************/
        $('#mall_list').append('<div class="cbp-item web-design logos">\n\
        <div class="cbp-caption">\n\
        <div class="cbp-caption-defaultWrap"><img src="views/assets/base/img/content/mall/xian-tm.jpg" alt=""></div>\n\
        <div class="cbp-caption-activeWrap">\n\
        <div class="c-masonry-border"></div>\n\
        <div class="cbp-l-caption-alignCenter">\n\
        <div class="cbp-l-caption-body">\n\
        <a href="#!" class="cbp-l-caption-buttonLeft btn c-btn-square c-btn-border-1x c-btn-white c-btn-bold c-btn-uppercase">尽请期待</a>\n\
        </div></div></div></div>\n\
        <div class="cbp-l-grid-projects-desc">正大乐城西安购物中心</div></div>');
    }
    
    if($('#mall_list_sm').length > 0){
        /******** Zhengzhou ***************/
        $('#mall_list_sm').append('<div class="cbp-item web-design logos">\n\
        <div class="cbp-caption">\n\
        <div class="cbp-caption-defaultWrap"><img src="views/assets/base/img/content/mall/zhengzhou-tm.jpg" alt=""></div>\n\
        <div class="cbp-caption-activeWrap">\n\
        <div class="c-masonry-border"></div>\n\
        <div class="cbp-l-caption-alignCenter">\n\
        <div class="cbp-l-caption-body">\n\
        <a href="#!" class="cbp-l-caption-buttonLeft btn c-btn-square c-btn-border-1x c-btn-white c-btn-bold c-btn-uppercase">尽请期待</a>\n\
        </div></div></div></div>\n\
        <div class="cbp-l-grid-projects-title">正大乐城郑州购物中心</div><div class="cbp-l-grid-projects-desc">河南省郑州市郑东新区普惠路77号</div></div>');

        /******** Wuxi ***************/
        $('#mall_list_sm').append('<div class="cbp-item web-design logos">\n\
        <div class="cbp-caption">\n\
        <div class="cbp-caption-defaultWrap"><img src="views/assets/base/img/content/mall/wuxi-tm.jpg" alt=""></div>\n\
        <div class="cbp-caption-activeWrap">\n\
        <div class="c-masonry-border"></div>\n\
        <div class="cbp-l-caption-alignCenter">\n\
        <div class="cbp-l-caption-body">\n\
        <a href="#!" class="cbp-l-caption-buttonLeft btn c-btn-square c-btn-border-1x c-btn-white c-btn-bold c-btn-uppercase">尽请期待</a>\n\
        </div></div></div></div>\n\
        <div class="cbp-l-grid-projects-title">正大乐城无锡购物中心</div><div class="cbp-l-grid-projects-desc">江苏省无锡市惠山区华惠路绿地世纪城600号</div></div>');

        /******** Xi'an ***************/
        $('#mall_list_sm').append('<div class="cbp-item web-design logos">\n\
        <div class="cbp-caption">\n\
        <div class="cbp-caption-defaultWrap"><img src="views/assets/base/img/content/mall/xian-tm.jpg" alt=""></div>\n\
        <div class="cbp-caption-activeWrap">\n\
        <div class="c-masonry-border"></div>\n\
        <div class="cbp-l-caption-alignCenter">\n\
        <div class="cbp-l-caption-body">\n\
        <a href="#!" class="cbp-l-caption-buttonLeft btn c-btn-square c-btn-border-1x c-btn-white c-btn-bold c-btn-uppercase">尽请期待</a>\n\
        </div></div></div></div>\n\
        <div class="cbp-l-grid-projects-title">正大乐城西安购物中心</div><div class="cbp-l-grid-projects-desc">陕西省西安市雁塔区锦业路7号</div></div>');
    }
}

function logout() {
    var keys = document.cookie.match(/[^ =;]+(?=\=)/g); 
    if (keys) { 
    for (var i = keys.length; i--;) 
        document.cookie = keys[i]+'=0;expires=' + new Date(0).toUTCString();
    }
    
    window.location.href = 'logout';
}

function getMalls() {
    $.ajax({
        url: $.api.baseNew+"/onlineleasing-customer/api/base/info/mall/findAllOrderByPosition",
        type: "GET",
        async: false,
        beforeSend: function(request) {
            request.setRequestHeader("Lang", $.cookie('lang'));
            request.setRequestHeader("Source", "onlineleasing");
        },
        success: function (response, status, xhr) {
            if(response.code === 'C0') {
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
            request.setRequestHeader("Lang", $.cookie('lang'));
            request.setRequestHeader("Source", "onlineleasing");
        },
        success: function (response, status, xhr) {
            if(response.code === 'C0') {
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

function getModalities() {
    $.ajax({
        url: $.api.baseNew+"/onlineleasing-customer/api/base/modality/findAll",
        type: "GET",
        async: false,
        beforeSend: function(request) {
            request.setRequestHeader("Lang", $.cookie('lang'));
            request.setRequestHeader("Source", "onlineleasing");
        },
        success: function (response, status, xhr) {
            if(response.code === 'C0') {
                sessionStorage.setItem("modalities", JSON.stringify(response.data) );
            } else {
                interpretBusinessCode(response.customerMessage);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}

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

function refineUrl() {
    //get full url
    var url = window.location.href;
    //get url after/  
    var value = url.substring(url.lastIndexOf('/') + 1);
    //get the part after before ?
    value  = value.split("?")[0];   
    return value;     
}

function refineOfferUrl() {
    var url = window.location.href;
    var value = url.substring(url.lastIndexOf('/') + 1);
    value  = value.split("&")[0];   
    return value;     
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
        dt.setDate(dt.getDate() - 1);
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

function interpretBusinessCode(msg) {
    if(msg !== ''){
        $('#ui_alert').text(msg).slideDown().delay(2000).slideUp(0);
    }
}

function interpretBusinessCode1(msg) {
    if(msg !== ''){
        $('#ui_congrats').text(msg).slideDown().delay(2000).slideUp(0);
    }
}

$.validator.addMethod( "remoteValidate", function( value, element, param, method ) {
    if ( this.optional( element ) ) {
        return "dependency-mismatch";
    }
    method = typeof method === "string" && method || "remoteValidate";

    var previous = this.previousValue( element, method ),
    validator, data, optionDataString;

    if ( !this.settings.messages[ element.name ] ) {
        this.settings.messages[ element.name ] = {};
    }
    previous.originalMessage = previous.originalMessage || this.settings.messages[ element.name ][ method ];
    this.settings.messages[ element.name ][ method ] = previous.message;

    param = typeof param === "string" && { url: param } || param;
    optionDataString = $.param( $.extend( { data: value }, param.data ) );
    if ( previous.old === optionDataString ) {
        return previous.valid;
    }

    previous.old = optionDataString;
    validator = this;
    this.startRequest( element );
    data = {};
    data[ element.name ] = value;
    
    $.ajax( $.extend( true, {
        mode: "abort",
        port: "validate" + element.name,
        data: data,
        context: validator.currentForm,
        success: function( response ) {
            var valid = response === true || response === "true",
            errors, message, submitted;

            validator.settings.messages[ element.name ][ method ] = previous.originalMessage;
            if ( valid ) {
                submitted = validator.formSubmitted;
                validator.resetInternals();
                validator.toHide = validator.errorsFor( element );
                validator.formSubmitted = submitted;
                validator.successList.push( element );
                validator.invalid[ element.name ] = false;
                validator.showErrors();
            } else {
                errors = {};
                message = response || validator.defaultMessage( element, { method: method, parameters: value } );
                errors[ element.name ] = previous.message = message;
                validator.invalid[ element.name ] = true;
                validator.showErrors( errors );
            }
            previous.valid = valid;
            validator.stopRequest( element, valid );
        }
    }, param ) );
    return "pending";
 }, "" );
 
 $.validator.addMethod( "remoteVerificationCode", function( value, element, param, method ) {
    if ( this.optional( element ) ) {
        return "dependency-mismatch";
    }
    method = typeof method === "string" && method || "remoteVerificationCode";

    var previous = this.previousValue( element, method ),
    validator, data, optionDataString;

    if ( !this.settings.messages[ element.name ] ) {
     this.settings.messages[ element.name ] = {};
    }
    previous.originalMessage = previous.originalMessage || this.settings.messages[ element.name ][ method ];
    this.settings.messages[ element.name ][ method ] = previous.message;

    param = typeof param === "string" && { url: param } || param;
    optionDataString = $.param( $.extend( { data: value }, param.data ) );
    if ( previous.old === optionDataString ) {
        return previous.valid;
    }

    previous.old = optionDataString;
    validator = this;
    this.startRequest( element );
    data = {};
    data[ 'key' ] = $.api.emailVC;
    data[ 'value' ] = value;
    data = JSON.stringify(data);
    $.ajax( $.extend( true, {
        mode: "abort",
        port: "validate" + element.name,
        dataType: "json",
        data: data,
        context: validator.currentForm,
        success: function( response ) {
            var valid = response === true || response === "true",
            errors, message, submitted;

            validator.settings.messages[ element.name ][ method ] = previous.originalMessage;
            if ( valid ) {
                submitted = validator.formSubmitted;
                validator.resetInternals();
                validator.toHide = validator.errorsFor( element );
                validator.formSubmitted = submitted;
                validator.successList.push( element );
                validator.invalid[ element.name ] = false;
                validator.showErrors();
            } else {
                errors = {};
                message = response || validator.defaultMessage( element, { method: method, parameters: value } );
                errors[ element.name ] = previous.message = message;
                validator.invalid[ element.name ] = true;
                validator.showErrors( errors );
            }
            previous.valid = valid;
            validator.stopRequest( element, valid );
        }
    }, param ) );
    return "pending";
 }, "" );
 
 $.validator.addMethod( "remoteValidateIdCard", function( value, element, param, method ) {
    if ( this.optional( element ) ) {
        return "dependency-mismatch";
    }
    method = typeof method === "string" && method || "remoteValidateIdCard";

    var previous = this.previousValue( element, method ),
    validator, data, optionDataString;

    if ( !this.settings.messages[ element.name ] ) {
     this.settings.messages[ element.name ] = {};
    }
    previous.originalMessage = previous.originalMessage || this.settings.messages[ element.name ][ method ];
    this.settings.messages[ element.name ][ method ] = previous.message;

    param = typeof param === "string" && { url: param } || param;
    optionDataString = $.param( $.extend( { data: value }, param.data ) );
    if ( previous.old === optionDataString ) {
        return previous.valid;
    }

    previous.old = optionDataString;
    validator = this;
    this.startRequest( element );
    data = {};
    data[ 'name' ] = $('#contact_name_1').val() || '';
    data[ 'idCard' ] = $('#idCard').val() || '';
    data = JSON.stringify(data);
    $.ajax( $.extend( true, {
        mode: "abort",
        port: "validate" + element.name,
        dataType: "json",
        data: data,
        context: validator.currentForm,
        beforeSend: function(request) {
            request.setRequestHeader("Login", $.cookie('login'));
            request.setRequestHeader("Authorization", $.cookie('authorization'));
            request.setRequestHeader("Lang", $.cookie('lang'));
            request.setRequestHeader("Source", "onlineleasing");
        },
        success: function( response ) {
            var valid = response === true || response === "true",
            errors, message, submitted;

            validator.settings.messages[ element.name ][ method ] = previous.originalMessage;
            if ( valid ) {
                submitted = validator.formSubmitted;
                validator.resetInternals();
                validator.toHide = validator.errorsFor( element );
                validator.formSubmitted = submitted;
                validator.successList.push( element );
                validator.invalid[ element.name ] = false;
                validator.showErrors();
            } else {
                errors = {};
                message = response || validator.defaultMessage( element, { method: method, parameters: value } );
                errors[ element.name ] = previous.message = message;
                validator.invalid[ element.name ] = true;
                validator.showErrors( errors );
            }
            previous.valid = valid;
            validator.stopRequest( element, valid );
        }
    }, param ) );
    return "pending";
 }, "" );
 
 function translateToEngDefault() {
    var e = $(".c-layout-page");
    e.html(e.html()
            .replace(/\正大乐城郑州购物中心/g, "Zhengzhou TouchMall")
            .replace(/\正大乐城无锡购物中心/g, "Wuxi TouchMall")
            .replace(/\正大乐城西安购物中心/g, "Xi’an TouchMall")
            .replace(/\项目介绍/g, "Enter")
            .replace(/\尽请期待/g, "Coming Soon"));
}