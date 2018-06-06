$.api = {
    base: "http://10.130.12.15:8080/oldataservice/ol/api",
    baseNew: "http://10.130.12.15:8750",
    emailVC: "",
    mobileVC: ""
};

$(document).ready(function(){
    if(!sessionStorage.getItem("modalities") || sessionStorage.getItem("modalities") == null || sessionStorage.getItem("modalities") == '') {
        getModalities();
    }
});

$(function() {
    $('#side-menu').metisMenu();
});

//Loads the correct sidebar on window load,
//collapses the sidebar on window resize.
$(function() {
    $(window).bind("load resize", function() {
        console.log($(this).width())
        if ($(this).width() < 768) {
            $('div.sidebar-collapse').addClass('collapse')
        } else {
            $('div.sidebar-collapse').removeClass('collapse')
        }
    });
});

function logout() {
    $.cookie('login', null);
    $.cookie('authorization', null);
    $.cookie('uid', null);
    window.location.href = 'logout';
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

function generatePages(currentPage, LastPage) {
    var pages = '';
    if (LastPage <= 6) {
        for(var i=1;i<=LastPage;i++) {
            if(i == currentPage ) {
                pages += '<li class="paginate_button active"><a href="?page='+i+'">'+i+'</a></li>';
            } else {
                pages += '<li class="paginate_button"><a href="?page='+i+'">'+i+'</a></li>';
            }
        }
    } else {
        if(currentPage>1){
            var previousPage = +currentPage-1;
            pages += '<li><a href="?page='+previousPage+'">&lt;</a></li>';
        } else {
            pages += '<li class="c-space"><span>&lt;</span></li>';
        }
        for(var i=1;i<=3;i++) {
            if(i == currentPage ) {
                pages += '<li class="paginate_button active"><a href="?page='+i+'">'+i+'</a></li>';
            } else {
                pages += '<li class="paginate_button"><a href="?page='+i+'">'+i+'</a></li>';
            }
        }
        pages += '<li class="c-space"><span>...</span></li>';
        for(var i=LastPage-2;i<=LastPage;i++) {
            if(i == currentPage ) {
                pages += '<li class="paginate_button active"><a href="?page='+i+'">'+i+'</a></li>';
            } else {
                pages += '<li class="paginate_button"><a href="?page='+i+'">'+i+'</a></li>';
            }
        }
        if(currentPage<LastPage){
            var nextPage = +currentPage+1;
            pages += '<li><a href="?page='+nextPage+'">&gt;</a></li>';
        } else {
            pages += '<li class="c-space"><span>&gt;</span></li>';
        }
    }
    $(".pagination").append(pages);
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

function interpretBusinessCode(bc) {
    var msg;
    switch(bc){
        /**
        * 参数不能为空
        */
        case 'C9000':
            msg = "参数不能为空";
            break;
        case 'C9001':
            msg = "参数不能为负数";
            break;
        /**
        * 操作过于频繁
        */
        case 'C9994':
            msg = "操作过于频繁。";
            break;
        case 'C9995':
            msg = "数据库操作异常";
            break;
        case 'C9996':
            msg = "查询表单流水号出错";
            break;
        case 'C9997':
            msg = "数据已经过期，请重新刷新。";
            break;
        case 'C9998':
            msg = "请求数据异常";
            break;
        case 'C9999':
            msg = "失败";
            break;
        case 'C9995':
            msg = "数据库操作异常";
            break; 
        /**
        * 用户登录token验证出错
        */    
        case 'C0001':
            msg = "用户token验证出错";
            break;
        case 'C0002':
            msg = "用户token过期";
            break;
        case 'C0003':
            msg = "用户token不能为空";
            break;
        case 'C0004':
            msg = "用户login不能为空";
            break;
        case 'C0005':
            msg = "用户login和token不匹配";
            break;
        case 'C0006':
            msg = "用户类型不匹配";
            break;
        /**
        * 验证码keyword不能为空
        */
        case 'C0100':
            msg = "验证码keyword不能为空";
            break;
        case 'C0101':
            msg = "验证码key不能为空";
            break;
        case 'C9999':
            msg = "验证码不正确";
            break;
        case 'C0102':
            msg = "数据库操作异常";
            break;
        /**
        * 手机号已存在
        */
        case 'C0200':
            msg = "手机号已存在";
            break;
        case 'C0201':
            msg = "邮箱已存在";
            break;
        case 'C0202':
            msg = "用户名或者密码错误";
            break;
        case 'C0203':
            msg = "用户名或者密码错误";
            break;
        case 'C0204':
            msg = "手机号不存在";
            break;
        case 'C0205':
            msg = "邮箱不存在";
            break;
        case 'C0206':
            msg = "用户不存在";
            break;
        case 'C0207':
            msg = "证件已存在";
            break;
        case 'C0208':
            msg = "证件不存在";
            break;
        /**
        * 没有查询到相关信息
        */
        case 'C0300':
            msg = "没有查询到相关信息";
            break;
        case 'C0301':
            msg = "商户不处于开业状态";
            break;
        case 'C0302':
            msg = "统一信用代码和商户名称不匹配";
            break;
        /**
        * 时间转换错误
        */
        case 'C1000':
            msg = "时间转换错误";
            break;    
        /**
        * 获取文件流失败
        */
        case 'C1100':
            msg = "获取文件流失败";
            break;
        case 'C1101':
            msg = "获取指定文件失败，指定文件不存在";
            break;
        case 'C1102':
            msg = "指定key过期或不存在";
            break;
        case 'C1103':
            msg = "文件key不能为空";
            break;
        case 'C1104':
            msg = "文件原始名称编码转换失败";
            break;
        /**
        * freemarker模板生成异常
        */
        case 'C1200':
            msg = "freemarker模板生成异常";
            break;
        /**
        * 初始化容器失败
        */
        case 'C2000':
            msg = "初始化容器失败";
            break;
        case 'C2001':
            msg = "设置权限失败";
            break;
        case 'C2002':
            msg = "容器上传失败";
            break;
        case 'C2003':
            msg = "容器下载失败";
            break;
        case 'C2004':
            msg = "容器删除失败";
            break;
        case 'C2005':
            msg = "删除容器失败";
            break;
        /**
        * 初始化文件访问接口失败
        */
        case 'C2100':
            msg = "freemarker模板生成异常";
            break;
        /**
        * 品牌状态不正确
        */
        case 'C5000':
            msg = "品牌状态不正确";
            break;
        case 'C5001':
            msg = "品牌不处于可以更新的状态";
            break;
        case 'C5002':
            msg = "品牌已经存在";
            break;
        case 'C5003':
            msg = "品牌和商户已经绑定";
            break;
        case 'C5004':
            msg = "品牌信息不存在";
            break;
        /**
        * 用户和商铺已经绑定
        */
        case 'C5100':
            msg = "用户和商铺已经绑定";
            break;
        /**
        * 商户信息不存在
        */
        case 'C5200':
            msg = "商户信息不存在";
            break;
        /**
        * 商铺信息不存在
        */
        case 'C5300':
            msg = "商铺信息不存在";
            break;
        /**
        * 出价信息不存在
        */
        case 'C6000':
            msg = "出价信息不存在";
            break;
        case 'C6001':
            msg = "合同信息不存在";
            break;
        case 'C6002':
            msg = "预览key不能为空";
            break;
        case 'C6003':
            msg = "指定key过期或不存在";
            break;
        case 'C6004':
            msg = "商铺信息不匹配";
            break;
        case 'C6005':
            msg = "用户信息不匹配";
            break;
        case 'C6006':
            msg = "出价明细不能为空";
            break;
        /**
        * 起租日期必须大于等于当日
        */
        case 'C6100':
            msg = "起租日期必须大于等于当日";
            break;
        case 'C6101':
            msg = "起租日期必须大于等于最早可入住日期";
            break;
        case 'C6102':
            msg = "起租日期必须小于等于终止日期";
            break;
        case 'C6103':
            msg = "开始日期必须大于等于起租日期";
            break;
        case 'C6104':
            msg = "结束日期必须小于等于终止日期";
            break;
        case 'C6105':
            msg = "开始日期必须小于等于结束日期";
            break;
        /**
        * 操作码不正确
        */
        case 'C11000':
            msg = "操作码不正确";
            break;
        case 'C11100':
            msg = "操作码不正确";
            break;
        /**
        * 审批通过的出价过期日期不能为空
        */
        case 'C11200':
            msg = "审批通过的出价过期日期不能为空";
            break;
        case 'C11201':
            msg = "审批结果参数不正确";
            break;
        case 'C11202':
            msg = "是否生效参数不正确";
            break;
        case 'C11203':
            msg = "出价不存在";
            break;
        /**
        * 操作结果不正确
        */
        case 'C12000':
            msg = "操作结果不正确";
            break;
        default:
            msg = "";
            break;
    }
    
    if(msg !== ''){
        $('#ui_alert').text(msg).slideDown().delay(10000).slideUp(0);
        $('html, body').animate({
            scrollTop: $('#ui_alert').offset().top
        }, 0);
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