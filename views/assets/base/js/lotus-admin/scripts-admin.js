$.api = {
    base: $.base,
    baseLotus: $.base+"/onlineleasing-lotus",
    baseAdmin: $.base+"/onlineleasing-admin",
    baseCommYZJ: $.base+"/comm-yunzhijia",
    baseAuth: $.base+"/common-authorization",
    dictModule: [],
    dictContractType: 1, //租赁
    contractType: ['租赁','leasing'],
    formType: ['新签','new','续签','renew','终止','termination','变更','modify'],
    paymentMode: ['月付','M'],
    posMode: ['不用POS自收银','unUse'],
    profitCenter: ['租赁部','rent'],
    termCalcMode: ['新计算方法','NEW'],
    rentCalculationMode: ['固租与提成取高','fixedRentAndHigherDeduct'],
    contractTemplate: ['租期 > 6个月','1'],
    fivePercentFixedRent: ['SC126','SC127','SC140','SC124','SC046','SC029','SC028','SC102','SC109'],
    mallCodeSH: ['SC145','SC127','SC082','SC078','SC060','SC050','SC043','SC041','SC040','SC027','SC011','SC010','SC005','SC001','SC055','SC126','SC033']
};

var d = new Date();
var month = d.getMonth()+1;
var day = d.getDate();
var date = d.getFullYear() + '-' +
    (month<10 ? '0' : '') + month + '-' +
    (day<10 ? '0' : '') + day;

$(document).ready(function(){
    if($.cookie('locationSelected') && $.cookie('locationSelected') != ''){
        $('.locationSelected').text($.cookie('locationSelected'));
    } else {
        $('.location-select ul li').each(function(i,elem){
            if($(elem).hasClass('to-select')){
                $('.locationSelected').text($(elem).find('span').text());
                $.cookie('locationSelected',$(elem).find('span').text());
                return false;
            }
        })
    }
        
    if(!sessionStorage.getItem("lotus_malls") || sessionStorage.getItem("lotus_malls") == null || sessionStorage.getItem("lotus_malls") == "null" || sessionStorage.getItem("lotus_malls") == '') {
        findAllMalls();
    } else {
        updateTopNavMallSelection();
    }
    
    if($.cookie('userModules') && $.cookie('userModules') != '' && $.cookie('userModules') != null){
        $.each(JSON.parse($.cookie('userModules')), function(i,v) {
            if($.inArray(v.userCode,['CUSER200524000004','CUSER210628000002','CUSER220615000003','CUSER221227000001']) == -1){
                $('.sidebar-menu > li').last().hide();
                return false;
            }
        })
    }
    
    $('.location-select .text-blue').click(function(){
        $.cookie('locationSelected',$(this).find('span').text());
        $('.locationSelected').text($.cookie('locationSelected'));
        $.cookie('mallSelected','');
        window.location.href = location.protocol + location.pathname;
    })
    
    $('.mall-select .text-blue').click(function(){
        $.cookie('mallSelected',$(this).find('span').text()+':::'+$(this).attr('data-code'));
        $('#mallSelected').text($.cookie('mallSelected').split(':::')[0]);
        window.location.href = location.protocol + location.pathname;
    })
    
    $(document).on('click', '[data-toggle="lightbox"]', function (event) {
        event.preventDefault();
        $(this).ekkoLightbox();
    });
    
    var fixedNavHeight = $('.main-header').outerHeight();
    if (window.location.hash.indexOf('#') >= 0) {
        $('html,body').animate({
            scrollTop: ($(window.location.hash).offset().top - fixedNavHeight) + "px"
        }, 300);
    };
    $('.sidebar-menu .treeview-menu a').click(function() {
        var target = document.getElementById(this.hash.slice(1));
        if (!target) return;
        var targetOffset = $(target).offset().top - fixedNavHeight;
        $('html,body').animate({
                scrollTop: targetOffset
            },
            300);
        return false;
    });
    
    $('#createRenew, #createTerminate, #createModify, #createRenewMain, #createTerminateMain, #createModifyMain').click(function(){
        var ftTxt, ftVal,headTxt,rcdd,ftid,fheader,confirm;
        switch ($(this).attr('id')) {
            case "createRenew":
                ftTxt = $.api.formType[2];
                ftVal = $.api.formType[3];
                headTxt = '续签合同申请';
                rcdd = 'renewContract';
                ftid = 'renewUpdateFormType';
                fheader = 'renew-termination';
                confirm = 'renewCreateRequest';
                break;
            case "createTerminate":
                ftTxt = $.api.formType[4];
                ftVal = $.api.formType[5];
                headTxt = '终止合同申请';
                rcdd = 'renewContract';
                ftid = 'renewUpdateFormType';
                fheader = 'renew-termination';
                confirm = 'renewCreateRequest';
                break;
            case "createModify":
                ftTxt = $.api.formType[6];
                ftVal = $.api.formType[7];
                headTxt = '变更合同申请';
                rcdd = 'modifyContract';
                ftid = 'modifyUpdateFormType';
                fheader = 'modify';
                confirm = 'modifyCreateRequest';
                break;
            case "createRenewMain":
                ftTxt = $.api.formType[2];
                ftVal = $.api.formType[3];
                headTxt = '续签合同申请';
                rcdd = 'renewContract';
                ftid = 'renewUpdateFormType';
                fheader = 'renew-termination';
                confirm = 'renewCreateRequestMain';
                break;
            case "createTerminateMain":
                ftTxt = $.api.formType[4];
                ftVal = $.api.formType[5];
                headTxt = '终止合同申请';
                rcdd = 'renewContract';
                ftid = 'renewUpdateFormType';
                fheader = 'renew-termination';
                confirm = 'renewCreateRequestMain';
                break;
            case "createModifyMain":
                ftTxt = $.api.formType[6];
                ftVal = $.api.formType[7];
                headTxt = '变更合同申请';
                rcdd = 'modifyContract';
                ftid = 'modifyUpdateFormType';
                fheader = 'modify';
                confirm = 'modifyCreateRequestMain';
                break;
            default:
                break;
        }
        
        
        updateDictDropDownByDictTypeCode('FORM_TYPE',ftid,ftTxt,ftVal);
        $('#investment-contract-request-'+fheader+'-create .modal-header').find('h4').text(headTxt);
        $.fn.modal.Constructor.prototype.enforceFocus = function() {};
        $('#investment-contract-request-'+fheader+'-create').find('.btn-info').attr('id', confirm);
        $('#investment-contract-request-'+fheader+'-create').modal('toggle');
        updateRequestContractDropDown(rcdd,10);
        $('.date-picker').datepicker({
            'language': 'zh-CN',
            'format': 'yyyy-mm-dd',
            'todayBtn': "linked",
            'todayHighlight': true,
            'startDate': '',
            'endDate': '',
            'autoclose': true
        });
        
        $('#renewCreateRequest, #modifyCreateRequest').click(function(){
            var id = $(this).attr('id').split('CreateRequest')[0];
            redirectCheck(id,'');
        })

        $('#renewCreateRequestMain, #modifyCreateRequestMain').click(function(){
            var id = $(this).attr('id').split('CreateRequest')[0];
            redirectCheck(id,'-main');
        })
    })
    
    if($('.mallCode').length > 0){
        updateSelectMallDropDown();
    }
    
    if($("#createContractDepartment").val() != '' && $("#createContractDepartment").val() != null){
        updateSelectStoreDropDownByMallCode(21,$("#createContractDepartment").val());
    }
    
    $("#createContractDepartment").on("select2:select",function(){
        if($("#createContractDepartment").val() != '' && $("#createContractDepartment").val() != null){
            updateSelectStoreDropDownByMallCode(21,$("#createContractDepartment").val());
        }
    })
    
    $('#createContract').click(function(){
        $.fn.modal.Constructor.prototype.enforceFocus = function() {};
        $('#investment-contract-request-create').modal('toggle');
        updateSelectTenantDropDown(51);
        updateBrandNameDropDown(21);
        updateDictDropDownByDictTypeCode('RENT_CALCULATION_MODE','createContractSelectRentCalculationMode',$.api.rentCalculationMode[0],$.api.rentCalculationMode[1]);
        $('.input-daterange').datepicker({
            'language': 'zh-CN',
            'format': 'yyyy-mm-dd',
            'todayBtn': "linked",
            'todayHighlight': true,
            'startDate': ($('#createContractStartDate').val() != '' ? $('#createContractStartDate').val() : ''),
            'endDate': $('#createContractEndDate').val(),
            'autoclose': true,
            'clearBtn': true
        });
    })
    
    $("#renewContract, #modifyContract").on("select2:select",function(){
        var id = $(this).attr('id').split('Contract')[0];
        $("#"+id+"Tenant").text($('#select2-'+id+'Contract-container').text().split(' | ')[0].split('[')[0]);
        $("#"+id+"ContractName").text($('#select2-'+id+'Contract-container').text().split(' | ')[1]);
        $("#"+id+"UnitName").text($('#select2-'+id+'Contract-container').text().split(' | ')[2]);
        $("#"+id+"StartEndDate").text($('#select2-'+id+'Contract-container').text().split(' | ')[3]);
    })
    
    $('#createContractRequest').click(function(){
        createContractCheck();
    })
    
    scrollJump();
})

function alertMsg(code,m) {
    var msg,color,style;
    switch (code) {
        case "JWT0002":
            msg = m+"，请重新 <strong><a href='javascript: logout();'>登录</a></strong>！";
            color = "default";
            style = ' style="z-index: 1041;position: fixed; left:0; right: 0; top: 0; bottom: 0; background: rgba(193,194,193,0.5);"';
            break;
        default:
            msg = m;
            color = "default";
            style = ' style="z-index: 1041;position: fixed; left:0; right: 0; top: 0; bottom: 0; background: rgba(193,194,193,0.5);"';
            break;
    }
    
    var msgDiv = '<div id="msgDiv" class="row"'+style+' role="alert">\n\
            <div class="col-md-6 col-md-offset-3" style="top: 40%;">\n\
                    <h5 class="callout callout-'+color+'"><a href="javascript: void(0);" onclick=\'javascript: $("#msgDiv").remove()\' style="float: right; background-color: #d1eaf9; border: 1px solid #66a; color: #333; text-decoration: none; padding: 2px 10px;">关闭窗口</a><i class="fa fa-times-circle" style="color: #d20100; font-size: 30px; vertical-align: middle; margin-right: 20px;"></i> '+msg+'</h5>\n\
                </div>\n\
            </div>';

    $('#webui').prepend(msgDiv);
    $('html, body').animate({
        scrollTop: $('#webui').offset().top
    }, 0);
    setTimeout(function () {
        if($('#msgDiv').length > 0){
            $('#msgDiv').remove();
        }
    }, 60000);
}

function successMsg(code,m) {
    var msg,color,style;
    switch (code) {
        default:
            msg = m;
            color = "default";
            style = ' style="z-index: 1029;position: fixed; left:0; right: 0; top: 0; bottom: 0; background: rgba(193,194,193,0.5);"';
            break;
    }
    
    var msgDiv = '<div id="msgDiv" class="row"'+style+' role="alert">\n\
            <div class="col-md-6 col-md-offset-3" style="top: 40%;">\n\
                    <h5 class="callout callout-'+color+'"><a href="javascript: void(0);" onclick=\'javascript: $("#msgDiv").remove()\' style="float: right; background-color: #d1eaf9; border: 1px solid #66a; color: #333; text-decoration: none; padding: 2px 10px;">关闭窗口</a><i class="fa fa-check-circle" style="color: #008f50; font-size: 30px; vertical-align: middle; margin-right: 20px;"></i> '+msg+'</h5>\n\
                </div>\n\
            </div>';

    $('#webui').prepend(msgDiv);
    $('html, body').animate({
        scrollTop: $('#webui').offset().top
    }, 0);
    setTimeout(function () {
        $('#msgDiv').remove();
    }, 60000); 
}

function alertModalMsg(code,m) {
    var msg,color;
    switch (code) {
        case "JWT0002":
            msg = m+"，请重新登录！";
            color = "danger";
            break;
        default:
            msg = m;
            color = "danger";
            break;
    }
    
    var msgDiv = '<div class="row">\n\
            <div class="col-md-12">\n\
                    <h5 class="callout callout-'+color+'">'+msg+'</h5>\n\
                </div>\n\
            </div>';

    $('.modal-body').prepend(msgDiv);
}

function generatePages(currentPage, LastPage, items) {
    $(".pagination .pagination").html('');
    var pages = '';
    if (LastPage <= 4) {
        for(var i=1;i<=LastPage;i++) {
            if(i == currentPage ) {
                pages += '<li class="page-item active"><a class="page-link" href="?page='+i+'&items='+items+'">'+i+'</a></li>';
            } else {
                pages += '<li class="page-item"><a class="page-link" href="?page='+i+'&items='+items+'">'+i+'</a></li>';
            }
        }
    } else {
        var pre = 1, nex = LastPage;
        if(currentPage>1){
            if(currentPage>2){
                currentPage-6 > 0 ? pre = currentPage-6 : pre = 1;
                pages += '<li class="page-item"><a class="page-link" href="?page=1&items='+items+'" title="第一页"><i class="fa fa-angle-double-left"></i></a></li>'; //第一页
                pages += '<li class="page-item"><a class="page-link pn" href="?page='+pre+'&items='+items+'" title="上一页"><i class="fa fa-angle-left"></i></a></li>'; //上一页
            } else {
                pages += '<li class="page-item"><a class="page-link" href="?page=1&items='+items+'" title="第一页"><i class="fa fa-angle-double-left"></i></a></li>'; //第一页
                pages += '<li class="page-item disabled"><a class="page-link pn" href="javascript: void(0);"><i class="fa fa-angle-left"></i></a></li>'; //上一页
            }
        } else {
            pages += '<li class="page-item disabled"><a class="page-link" href="javascript: void(0);"><i class="fa fa-angle-double-left"></i></a></li>'; //第一页
            pages += '<li class="page-item disabled"><a class="page-link pn" href="javascript: void(0);"><i class="fa fa-angle-left"></i></a></li>'; //上一页
        }
        var index = 1;
        if(currentPage<=(LastPage-4)*1) {
            index = currentPage;
        } else {
            index = (LastPage-4)*1;
        }
        var pindex, qindex;
        index > 1 ? pindex = index-1 : pindex = 1;
        index > 1 ? qindex = index*1+5: qindex = index*1+5;
        for(var i=pindex;i<qindex;i++) {
            if(i == currentPage ) {
                pages += '<li class="page-item active"><a class="page-link" href="?page='+i+'&items='+items+'">'+i+'</a></li>';
            } else {
                pages += '<li class="page-item"><a class="page-link" href="?page='+i+'&items='+items+'">'+i+'</a></li>';
            }
        }
        if(currentPage<LastPage){
            if(currentPage<(LastPage-4)){
                currentPage*1+5 <= LastPage ? nex = currentPage*1+5 : nex = LastPage;
                pages += '<li class="page-item"><a class="page-link pn" href="?page='+nex+'&items='+items+'" title="下一页"><i class="fa fa-angle-right"></i></a></li>'; //下一页
                pages += '<li class="page-item"><a class="page-link" href="?page='+LastPage+'&items='+items+'" title="最后页"><i class="fa fa-angle-double-right"></i></a></li>'; //最后页
            } else {
                pages += '<li class="page-item disabled"><a class="page-link pn" href="javascript: void(0);"><i class="fa fa-angle-right"></i></a></li>'; //下一页
                pages += '<li class="page-item"><a class="page-link" href="?page='+LastPage+'&items='+items+'" title="最后页"><i class="fa fa-angle-double-right"></i></a></li>'; //最后页
            }
        } else {
            pages += '<li class="page-item disabled"><a class="page-link pn" href="javascript: void(0);"><i class="fa fa-angle-right"></i></a></li>'; //下一页
            pages += '<li class="page-item disabled"><a class="page-link" href="javascript: void(0);"><i class="fa fa-angle-double-right"></i></a></li>'; //最后页
        }
    }
    
    $(".pagination .pagination").append(pages);
}

function numberWithCommas(x) {
    if(x == null){
        return '';
    } else {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
}

function numberWithoutCommas(x) {
    if(x == null){
        return '';
    } else {
        return x.toString().replace(/[,]/g,"");
    }
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
    var url = window.location.href;
    var value = url.substring(url.lastIndexOf('/') + 1);
    value  = value.split("?")[0];   
    return value;     
}

function refineCreateUrl() {
    var url = window.location.href;
    var value = url.substring(url.lastIndexOf('/') + 1);
    value = value.split("?s")[0]+window.location.hash;
    value = value.split("&s")[0]+window.location.hash;
    return value;     
}

function refineUpdateUrl() {
    var url = window.location.href;
    var value = url.substring(url.lastIndexOf('/') + 1);
    value  = value.split("&s")[0];   
    return value;     
}

function logout() {
    deleteCookie();
    sessionStorage.clear();
    window.location.href = 'logout';
}

function deleteCookie() {
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
    }
    if(cookies.length > 0) {
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i];
            var eqPos = cookie.indexOf("=");
            var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            var domain = location.host.substr(location.host.indexOf('.'));
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=" + domain;
        }
    }
}

$.validator.addMethod('numChar',function(text){
    var regex = /^[0-9a-zA-Z\ ]+$|(^$)/;
    return regex.test(text);
}, "The value entered is invalid");

(function (){
    if(!sessionStorage.length){
      localStorage.setItem('getSessionStorage', Date.now());
    };
    
    window.addEventListener('storage', function (event){

    if(event.key == 'getSessionStorage'){
        localStorage.setItem('sessionStorage', JSON.stringify(sessionStorage));
        localStorage.removeItem('sessionStorage');
    } else if(event.key == 'sessionStorage' && !sessionStorage.length){
        var data = JSON.parse(event.newValue),
          value;
          
        for(key in data) {
          sessionStorage.setItem(key, data[key]);
        }
    }
  });
})();

function confirmCancel(msg,url) {
    Ewin.confirm({ message: msg }).on(function (e) {
        window.location.href = url;
    })
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
        dt.setDate(dt.getDate() + (dates - 1));
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

function DecrMonth(date_str){
    if(date_str){
        var parts = date_str.split("-");
        var dt = new Date(
          parseInt(parts[0], 10),      // year
          parseInt(parts[1], 10) - 2,  // month (starts with 0)
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

function dateCompare(date1,date2){
    date1 = date1.replace(/\-/gi,"/");
    date2 = date2.replace(/\-/gi,"/");
    var time1 = new Date(date1).getTime();
    var time2 = new Date(date2).getTime();
    var result;
    if(time1 > time2){
        result = "larger";
    }else if(time1 == time2){
        result = "equal";
    }else{
        result = "smaller";
    }
    return result;
}

function scrollJump() {
    $("#navbarTop a").on('click',function(e) {
        var id = $(this).attr('href').substr(1);
        $(this).parent().addClass("active").siblings().removeClass("active");
        
        $('html, body').animate({
            scrollTop: $('#'+id).offset().top - 160
        }, 0);
        e.preventDefault();
    });
}

function findAllMalls() {
    $.ajax({
        url: $.api.baseLotus+"/api/mall/lotus/findAll?page=0&size=150&sort=id,asc",
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
                if(xhr.getResponseHeader("Login") !== null){
                    $.cookie('login', xhr.getResponseHeader("Login"));
                }
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                }
                
                if(response.data.content.length > 0){
                    var returnData = [];
                    $.map(response.data.content, function(item) {
                        if(item.mallType != 'kow'){
                            returnData.push(item);
                        }
                        return returnData;
                    });
                    
                    sessionStorage.setItem("lotus_malls", JSON.stringify(returnData));
                    updateTopNavMallSelection();
                }
            } else {
                alertMsg(response.code,response.customerMessage);
            }
        }
    })
}

function findShopBudgetByCode(sc) {
    $.ajax({
        url: $.api.baseLotus+"/api/shop/budget/findAllByShopCode?shopCode="+sc,
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
                if(xhr.getResponseHeader("Login") !== null){
                    $.cookie('login', xhr.getResponseHeader("Login"));
                }
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                }
                
                if(response.data.length > 0){                    
                    sessionStorage.setItem("shopBudget_"+sc, JSON.stringify(response.data));
                }
            } else {
                alertMsg(response.code,response.customerMessage);
            }
        }
    })
}

function updateTopNavMallSelection() {
    if(sessionStorage.getItem("lotus_malls") && sessionStorage.getItem("lotus_malls") != null && sessionStorage.getItem("lotus_malls") != '') {
        $('.navbar-nav .mall-select > ul').html('<li><a href="javascript: void(0);"><span>选择项目</span></a></li>');
        var malls = $.parseJSON(sessionStorage.getItem("lotus_malls"));
        if($.cookie('userModules') && $.cookie('userModules') != '' && $.cookie('userModules') != null){
            $.each(JSON.parse($.cookie('userModules')), function(j,w) {
                if((w.roleCode == 'CROLE211008000002' || w.roleCode == 'CROLE220922000001') && w.moduleCode == 'ALL'){
                    if($.cookie('locationSelected') && $.cookie('locationSelected') != '' && $.cookie('locationSelected') != null){
                        $.each(malls, function(i,v){
                            if(v.mallLotusBase.province == $.cookie('locationSelected')){
                                $('.navbar-nav .mall-select > ul').append('<li class="to-select" style="display: block;">\n\
                                    <a href="javascript: void(0);" class="text-blue" data-code="'+v.code+'">\n\
                                        <i class="fa fa-location-arrow"></i>\n\
                                        <span>'+v.mallName+'</span>\n\
                                    </a>\n\
                                </li>');
                            }
                        })
                        renderLocationMalls();
                    }
                    return false;
                } else if(w.roleCode == 'CROLE211008000001' && w.moduleName == '门店对接人') {
                    if($.cookie('locationSelected') && $.cookie('locationSelected') != '' && $.cookie('locationSelected') != null){
                        renderLocations();
                    }

                    function renderLocations(){
                        var malls = $.parseJSON(sessionStorage.getItem("lotus_malls"));
                        $.each(malls, function(i,v){
                            if(v.mallLotusBase.province == $.cookie('locationSelected') && v.code == w.moduleCode){
                                $('.navbar-nav .mall-select > ul').append('<li class="to-select" style="display: block;">\n\
                                    <a href="javascript: void(0);" class="text-blue" data-code="'+v.code+'">\n\
                                        <i class="fa fa-location-arrow"></i>\n\
                                        <span>'+v.mallName+'</span>\n\
                                    </a>\n\
                                </li>');
                            }
                        })
                        
                        if($('.navbar-nav .mall-select > ul').find('.to-select').length <= 0){
                            var temp = $('.locationSelected').text();
                            var index;
                            $('.location-select ul li').each(function(i,elem){
                                if($(elem).find('span').text() == temp){
                                    index = i*1+1;
                                    if(i == $('.location-select ul li').length - 1){
                                        index = 0;
                                    }
                                    $('.locationSelected').text($('.location-select ul').find('li:eq('+index+')').find('span').text());
                                    $.cookie('locationSelected',$('.location-select ul').find('li:eq('+index+')').find('span').text());
                                    $.cookie('mallSelected','');
                                    return false;
                                }
                            })
                            renderLocations();
                        }
                    }
                }
                renderLocationMalls();
                function renderLocationMalls(){
                    if($.cookie('mallSelected') && $.cookie('mallSelected') != '' && $.cookie('mallSelected') != null){
                        $('#mallSelected').text($.cookie('mallSelected').split(':::')[0]);
                    } else {
                        $('.mall-select ul li').each(function(i,elem){
                            if($(elem).hasClass('to-select')){
                                $('#mallSelected').text($(elem).find('span').text());
                                $.cookie('mallSelected',$(elem).find('span').text()+':::'+$(elem).find('a').attr('data-code'));
                                return false;
                            }
                        })
                    }
                }
            })
        }
    } else {
        findAllMalls();
    }
}

function updateStartDatepicker() {
    $("input[id*='StartDate_1']").datepicker('setStartDate',$('#startDate').val());
    $("input[id*='StartDate_1']").datepicker('update',$('#startDate').val());
}

function updateEndDatepicker(Exid) {
    $("input[id*='"+Exid+"EndDate_']").not('.past').each(function(i){  
        var num = i + 1;
        if($('#'+Exid+'EndDate_'+(parseInt(num)+1)).length <= 0){
            $('#'+Exid+'EndDate_'+num).datepicker('setEndDate',$('#endDate').val());
            $('#'+Exid+'EndDate_'+num).datepicker('update',$('#endDate').val());
            return false;
        }
    });  
}

function updateEndDatepickerAndRemove(Exid) {
    $("input[id*='"+Exid+"EndDate_']").each(function(i){  
        var num = $(this).attr('id').split('_')[1];
        if($('#'+Exid+'StartDate_'+num).val() != '' && dateCompare($("#endDate").val(), $('#'+Exid+'StartDate_'+num).val()) == 'smaller'){
            deleteRow(document.getElementById(Exid+'EndDate_'+num).parentNode.parentNode);
        }
    });
    var id = $("input[id*='"+Exid+"EndDate_']").length;
    $('#'+Exid+'EndDate_'+id).datepicker('setEndDate',$('#endDate').val());
    $('#'+Exid+'EndDate_'+id).datepicker('update',$('#endDate').val());
    if(Exid == 'fixedRent' || Exid == 'propertyMgmt'){
        calBackPush(Exid);
    }
}

function findFeeItemByContractType(type) {
    $.ajax({
        url: $.api.baseAdmin+"/api/finance/feeItem/findAllByContractType/"+type,
        type: "GET",
        async: false,
        dataType: "json",
        contentType: "application/json",
        beforeSend: function(request) {
            request.setRequestHeader("Login", $.cookie('login'));
            request.setRequestHeader("Authorization", $.cookie('authorization'));
            request.setRequestHeader("Lang", $.cookie('lang'));
            request.setRequestHeader("Source", "onlineleasing");
        },
        complete: function(){},
        success: function (response, status, xhr) {
            if(response.code === 'C0') {
                if(xhr.getResponseHeader("Login") !== null){
                    $.cookie('login', xhr.getResponseHeader("Login"));
                }
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                }
                
                if(response.data.length > 0){
                    sessionStorage.setItem("feeItems", JSON.stringify(response.data));
                }
            } else {
                alertMsg(response.code,response.customerMessage);
            }
        }
    })
}

function findAllUsers() {
    $.ajax({
        url: $.api.baseAuth+"/api/user/findAll?page=0&size=500&sort=id,asc",
        type: "GET",
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
                if(xhr.getResponseHeader("Login") !== null){
                    $.cookie('login', xhr.getResponseHeader("Login"));
                }
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                }
                
                if(response.data.content.length > 0){
                    sessionStorage.setItem("users", JSON.stringify(response.data.content));
                }
            } else {
                alertMsg(response.code,response.customerMessage);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
        }
    });
}

function renderUserName(oi) {
    var user = '';
    if(sessionStorage.getItem("users") && sessionStorage.getItem("users") != null && sessionStorage.getItem("users") != '') {
        $.each($.parseJSON(sessionStorage.getItem("users")), function(i,v){
            if(v.userModules.length > 0){
                $.each(v.userModules, function(j,w){
                    if(w.moduleCode == 'YZJ_OPEN_ID' && w.moduleName == oi){
                        user = v.settings.name;
                    }
                })
            }
        })
    }
    return user;
}

function renderRentCalculationMode(r) {
    var rentCalculationMode = '';
    if(sessionStorage.getItem("RENT_CALCULATION_MODE") && sessionStorage.getItem("RENT_CALCULATION_MODE") != null && sessionStorage.getItem("RENT_CALCULATION_MODE") != '') { 
        $.each($.parseJSON(sessionStorage.getItem("RENT_CALCULATION_MODE")), function(i,v){
            if(v.dictCode == r){
                rentCalculationMode = v.dictName;
            }
        })
    }
    return rentCalculationMode;
}

function renderUnitType(t) {
    var type = '';
    if(sessionStorage.getItem("UNIT_TYPE") && sessionStorage.getItem("UNIT_TYPE") != null && sessionStorage.getItem("UNIT_TYPE") != '') { 
        $.each($.parseJSON(sessionStorage.getItem("UNIT_TYPE")), function(i,v){
            if(v.dictCode == t){
                type = v.dictName;
            }
        })
    }
    return type;
}

function renderContractStatus(s) {
    var status = '';
    if(sessionStorage.getItem("CONTRACT_STATUS") && sessionStorage.getItem("CONTRACT_STATUS") != null && sessionStorage.getItem("CONTRACT_STATUS") != '') { 
        $.each($.parseJSON(sessionStorage.getItem("CONTRACT_STATUS")), function(i,v){
            if(v.dictCode == s){
                status = v.dictName;
            }
        })
    }
    return status;
}

function renderFormStatus(s) {
    var status = '';
    if(sessionStorage.getItem("FORM_STATUS") && sessionStorage.getItem("FORM_STATUS") != null && sessionStorage.getItem("FORM_STATUS") != '') {
        var status = $.parseJSON(sessionStorage.getItem("FORM_STATUS"));
        $.each(status, function(i,v){
            if(v.dictCode == s){
                status = v.dictName;
            }
        })
    }  
    return status;
}

function renderFlowStatus(s) {
    var status = '';
    if(sessionStorage.getItem("FLOW_STATUS") && sessionStorage.getItem("FLOW_STATUS") != null && sessionStorage.getItem("FLOW_STATUS") != '') {
        var status = $.parseJSON(sessionStorage.getItem("FLOW_STATUS"));
        $.each(status, function(i,v){
            if(v.dictCode == s){
                status = v.dictName;
            }
        })
    }
    return status;
}

function renderFlowSteps(s) {
    var step = '';
    if(sessionStorage.getItem("FLOW_STEPS") && sessionStorage.getItem("FLOW_STEPS") != null && sessionStorage.getItem("FLOW_STEPS") != '') {
        var step = $.parseJSON(sessionStorage.getItem("FLOW_STEPS"));
        $.each(step, function(i,v){
            if(v.dictCode == s){
                step = v.dictName;
            }
        })
    }
    return step;
}

function renderBrandAttribute(a) {
    var attribute = '';
    if(sessionStorage.getItem("BRAND_ATTRIBUTE") && sessionStorage.getItem("BRAND_ATTRIBUTE") != null && sessionStorage.getItem("BRAND_ATTRIBUTE") != '') {
        var attribute = $.parseJSON(sessionStorage.getItem("BRAND_ATTRIBUTE"));
        $.each(attribute, function(i,v){
            if(v.dictCode == a){
                attribute = v.dictName;
            }
        })
    }
    return attribute;
}

function findMainSigningBody(code){
    $.ajax({
        url: $.api.baseLotus+"/api/mall/lotus/findOneByCode?code="+code,
        type: "GET",
        async: false,
        beforeSend: function(request) {
            request.setRequestHeader("Login", $.cookie('login'));
            request.setRequestHeader("Authorization", $.cookie('authorization'));
            request.setRequestHeader("Lang", $.cookie('lang'));
            request.setRequestHeader("Source", "onlineleasing");
        },
        success: function (response, status, xhr) {
            if(response.code === 'C0') {
                if(xhr.getResponseHeader("Login") !== null){
                    $.cookie('login', xhr.getResponseHeader("Login"));
                }
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                }
                
                if(response.data != '' && response.data != null){
                    $('#mainSigningBody').val(response.data.mallLotusBase.name);
                    
                    if($('#investmentContractMallSummaryOpenDate').length > 0){
                        $('#investmentContractMallSummaryOpenDate').val(response.data.startDate || '');
                    }
                }
            }                             
        }
    }); 
}

function findTaxInfoByTaxCategories(cate) {
    $.ajax({
        url: $.api.baseAdmin+"/api/finance/taxInfo/findAllByTaxCategories/"+cate,
        type: "GET",
        async: false,
        dataType: "json",
        contentType: "application/json",
        beforeSend: function(request) {
            request.setRequestHeader("Login", $.cookie('login'));
            request.setRequestHeader("Authorization", $.cookie('authorization'));
            request.setRequestHeader("Lang", $.cookie('lang'));
            request.setRequestHeader("Source", "onlineleasing");
        },
        complete: function(){},
        success: function (response, status, xhr) {
            if(response.code === 'C0') {
                if(xhr.getResponseHeader("Login") !== null){
                    $.cookie('login', xhr.getResponseHeader("Login"));
                }
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                }
                
                if(response.data.length > 0){
                    sessionStorage.setItem("taxVAT", JSON.stringify(response.data));
                }
            } else {
                alertMsg(response.code,response.customerMessage);
            }
        }
    })
}

function findCommissionByDictTypeCode(dictTypeCode) {
    $.ajax({
        url: $.api.baseAdmin+"/api/dict/findAllByDictTypeCode/"+dictTypeCode,
        type: "GET",
        async: false,
        dataType: "json",
        contentType: "application/json",
        beforeSend: function(request) {
            request.setRequestHeader("Login", $.cookie('login'));
            request.setRequestHeader("Authorization", $.cookie('authorization'));
            request.setRequestHeader("Lang", $.cookie('lang'));
            request.setRequestHeader("Source", "onlineleasing");
        },
        complete: function(){},
        success: function (response, status, xhr) {
            if(response.code === 'C0') {
                if(xhr.getResponseHeader("Login") !== null){
                    $.cookie('login', xhr.getResponseHeader("Login"));
                }
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                }
                
                if(response.data.dictDataList.length > 0){
                    sessionStorage.setItem(dictTypeCode, JSON.stringify(response.data.dictDataList));
                }
            } else {
                alertMsg(response.code,response.customerMessage);
            }
        }
    })
}

function findDictCodeByDictTypeCode(dictTypeCode) {
    if(!sessionStorage.getItem(dictTypeCode) || sessionStorage.getItem(dictTypeCode) == null || sessionStorage.getItem(dictTypeCode) == "null" || sessionStorage.getItem(dictTypeCode) == '') {
        $.ajax({
            url: $.api.baseAdmin+"/api/dict/findAllByDictTypeCode/"+dictTypeCode,
            type: "GET",
            async: false,
            dataType: "json",
            contentType: "application/json",
            beforeSend: function(request) {
                request.setRequestHeader("Login", $.cookie('login'));
                request.setRequestHeader("Authorization", $.cookie('authorization'));
                request.setRequestHeader("Lang", $.cookie('lang'));
                request.setRequestHeader("Source", "onlineleasing");
            },
            complete: function(){},
            success: function (response, status, xhr) {
                if(response.code === 'C0') {
                    if(xhr.getResponseHeader("Login") !== null){
                        $.cookie('login', xhr.getResponseHeader("Login"));
                    }
                    if(xhr.getResponseHeader("Authorization") !== null){
                        $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                    }

                    if(response.data.dictDataList.length > 0){
                        sessionStorage.setItem(dictTypeCode, JSON.stringify(response.data.dictDataList));
                    }
                } else {
                    alertMsg(response.code,response.customerMessage);
                }
            }
        })
    }
}

function updateDictByDictTypeCode(dictTypeCode, id, val) {
    $.ajax({
        url: $.api.baseAdmin+"/api/dict/findAllByDictTypeCode/"+dictTypeCode,
        type: "GET",
        async: false,
        beforeSend: function(request) {
            request.setRequestHeader("Login", $.cookie('login'));
            request.setRequestHeader("Authorization", $.cookie('authorization'));
            request.setRequestHeader("Lang", $.cookie('lang'));
            request.setRequestHeader("Source", "onlineleasing");
        },
        success: function (response, status, xhr) {
            if(response.code === 'C0') {
                if(xhr.getResponseHeader("Login") !== null){
                    $.cookie('login', xhr.getResponseHeader("Login"));
                }
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                }
                
                if(response.data.dictDataList.length > 0){
                    $.each(response.data.dictDataList, function(i,v) {
                        if(v.dictCode == val){
                            $('#'+id).text(v.dictName).attr('title',v.dictName);
                            if($('#'+id).hasClass('badge-success')){
                                if($.inArray(val.toUpperCase(), ['TERMINATION','CANCEL','0','3','RETURNED','ABANDON','SMART_RETURNED','DISAGREE','DISAGREE_CANCLE']) != -1){
                                    $('#'+id).removeClass('badge-success').addClass('badge-danger');
                                } else if($.inArray(val.toUpperCase(), ['UNEFFECT','INIT','1','10','AGREE_CANCEL']) != -1){
                                    $('#'+id).removeClass('badge-success').addClass('badge-warning');
                                }
                            }
                            return false;
                        }
                    })
                }
            }                             
        }
    })
}

function updateDictByDictTypeCodeAndVal(dictTypeCode, id, val) {
    $.ajax({
        url: $.api.baseAdmin+"/api/dict/findAllByDictTypeCode/"+dictTypeCode,
        type: "GET",
        async: false,
        beforeSend: function(request) {
            request.setRequestHeader("Login", $.cookie('login'));
            request.setRequestHeader("Authorization", $.cookie('authorization'));
            request.setRequestHeader("Lang", $.cookie('lang'));
            request.setRequestHeader("Source", "onlineleasing");
        },
        success: function (response, status, xhr) {
            if(response.code === 'C0') {
                if(xhr.getResponseHeader("Login") !== null){
                    $.cookie('login', xhr.getResponseHeader("Login"));
                }
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                }
                
                if(response.data.dictDataList.length > 0){
                    $.each(response.data.dictDataList, function(i,v) {
                        if(v.dictCode == val){
                            var newOption = new Option(v.dictName, val, true, true);
                            $('#'+id).append(newOption).trigger('change');
                            return false;
                        }
                    })
                }
            }                             
        }
    })
}

function updateCompareFrequencyDropDown(){
    var selected;
    var compareFirstFrequency = ['月','季','年'];
    $(function () {
        for(var i=0;i<compareFirstFrequency.length;i++){
            compareFirstFrequency[i] == '月'? selected = ' selected' : selected = ''
            $('#compareFirstFrequency').append('<option value="'+compareFirstFrequency[i]+'"'+selected+'>'+compareFirstFrequency[i]+'</option>');
        }
        
        updateCompareSecondFrequencyDropDown();
        
        $('#compareFirstFrequency').change(function () {
            updateCompareSecondFrequencyDropDown();
        })
    })
    
    $("#compareSecond").change(function(){
        if($(this).prop('checked') == true){
            $(".shell").hide();
        } else {
            $(".shell").show();
        }
    })
}

function updateCompareSecondFrequencyDropDown(){
    var iNum1;
    var compareSecondFrequency = [['季','年'],['年'],['年']];
    $('#compareSecondFrequency').children().not(':eq(0)').remove();
    iNum1 = $('#compareFirstFrequency').children('option:selected').index();
    if(iNum1 != 0) {
        if(iNum1 != 3) {
            $("#compareSecond").prop('disabled',false);
            var CompareSecondFrequency = compareSecondFrequency[iNum1-1];
            for(var j=0;j<CompareSecondFrequency.length;j++){
                $('#compareSecondFrequency').append('<option value='+CompareSecondFrequency[j]+'>'+CompareSecondFrequency[j]+'</option>');
            }
        } else {
            $("#compareSecond").prop("checked",false);
            $("#compareSecond").prop('disabled',true);
            $(".shell").show();
        }
    }
}

function calDatesDiff(s,e) {
    s=s.replace(/-/g,"/");
    var startdate=new Date(s);
    e=e.replace(/-/g,"/");
    var enddate=new Date(e);
 
    var time=enddate.getTime()-startdate.getTime();
    var days=parseInt(time/(1000 * 60 * 60 * 24) + 1);
    return days;
}

function createRowColumn(row) {
    var column = document.createElement("td");
    row.appendChild(column);
    return column;
}

function addRowInvestmentContractAccounttermFixed() {
    var newrow = document.createElement("tr");
    newrow.setAttribute("class","new");
    var column1 = createRowColumn(newrow);
    var column2 = createRowColumn(newrow);
    var column3 = createRowColumn(newrow);
    var column4 = createRowColumn(newrow);
    var column5 = createRowColumn(newrow);
    var column6 = createRowColumn(newrow);
    var column7 = createRowColumn(newrow);
    var column8 = createRowColumn(newrow);
    var column9 = createRowColumn(newrow);
    var column10 = createRowColumn(newrow);
    var column11 = createRowColumn(newrow);
    
    var table = document.getElementById('investmentContractAccounttermFixed');
    var tbody = table.querySelector('tbody') || table;
    var count = tbody.getElementsByTagName('tr').length + 1;
    column1.innerText = count.toLocaleString();
    
    var select = document.createElement("select"); //费用项
    select.setAttribute("class","select2 fixedFeeItemDropDown new");
    select.setAttribute("id","fixedRentItem_"+count.toLocaleString());
    column2.appendChild(select);
    
    var div = document.createElement("div"); //期限
    div.setAttribute("class","input-daterange input-group");
    var input = document.createElement("input");
    input.setAttribute("class","form-control");
    input.setAttribute("id","fixedRentStartDate_"+count.toLocaleString());
    input.setAttribute("type","text");
    input.setAttribute("style","min-width: 80px");
    input.setAttribute("readonly","");
    div.appendChild(input);
    var icon = document.createElement("i");
    icon.setAttribute("class", "fa fa-calendar");
    var span = document.createElement("span");
    span.setAttribute("class", "input-group-addon");
    span.appendChild(icon);
    div.appendChild(span);
    var to = document.createElement("span");
    to.innerText = "-";
    to.setAttribute("class", "input-group-addon");
    div.appendChild(to);
    var div2 = document.createElement("div");
    div2.setAttribute("class","input-group");
    var input2 = document.createElement("input");
    input2.setAttribute("class","form-control");
    input2.setAttribute("id","fixedRentEndDate_"+count.toLocaleString());
    input2.setAttribute("type","text");
    input2.setAttribute("style","min-width: 80px");
    input2.setAttribute("readonly","");
    div2.appendChild(input2);
    var icon2 = document.createElement("i");
    icon2.setAttribute("class", "fa fa-calendar");
    var span2 = document.createElement("span");
    span2.setAttribute("class", "input-group-addon");
    span2.appendChild(icon2);
    div2.appendChild(span2);
    div.appendChild(div2);
    column3.appendChild(div);
    
    var div = document.createElement("div"); //去税单价
    div.setAttribute("class","input-group");
    var input = document.createElement("input");
    input.setAttribute("class","form-control money");
    input.setAttribute("id","fixedRentTaxRentAmount_"+count.toLocaleString());
    input.setAttribute("type","text");
    div.appendChild(input);
    var percent = document.createElement("span");
    percent.innerText = "元/m²/天";
    percent.setAttribute("class", "input-group-addon");
    div.appendChild(percent);
    column4.appendChild(div);
    
    var div = document.createElement("div"); //去税金额
    div.setAttribute("class","input-group");
    var input = document.createElement("input");
    input.setAttribute("class","form-control money");
    input.setAttribute("id","fixedRentTaxAmount_"+count.toLocaleString());
    input.setAttribute("type","text");
    div.appendChild(input);
    var percent = document.createElement("span");
    percent.innerText = "元";
    percent.setAttribute("class", "input-group-addon");
    div.appendChild(percent);
    column5.appendChild(div);
    
    var div = document.createElement("div"); //含税金额
    div.setAttribute("class","input-group");
    var input = document.createElement("input");
    input.setAttribute("class","form-control money");
    input.setAttribute("id","fixedRentAmount_"+count.toLocaleString());
    input.setAttribute("type","text");
    div.appendChild(input);
    var percent = document.createElement("span");
    percent.innerText = "元";
    percent.setAttribute("class", "input-group-addon");
    div.appendChild(percent);
    column6.appendChild(div);
    
    var div = document.createElement("div"); //含税单价
    div.setAttribute("class","input-group");
    var input = document.createElement("input");
    input.setAttribute("class","form-control money");
    input.setAttribute("id","fixedRentRentAmount_"+count.toLocaleString());
    input.setAttribute("type","text");
    div.appendChild(input);
    var percent = document.createElement("span");
    percent.innerText = "元/m²/天";
    percent.setAttribute("class", "input-group-addon");
    div.appendChild(percent);
    column7.appendChild(div);
    
    var div = document.createElement("div"); //预估营业额
    div.setAttribute("class","input-group");
    var input = document.createElement("input");
    input.setAttribute("class","form-control money");
    input.setAttribute("id","fixedRentMinSalesAmount_"+count.toLocaleString());
    input.setAttribute("type","text");
    input.setAttribute("value","0");
    div.appendChild(input);
    var percent = document.createElement("span");
    percent.innerText = "元/月";
    percent.setAttribute("class", "input-group-addon");
    div.appendChild(percent);
    column8.appendChild(div);
    
    var select = document.createElement("select"); //税率
    select.setAttribute("class","select2 taxVat newVAT fixedVATDropDown newFee");
    select.setAttribute("id","fixedRentTaxRate_"+count.toLocaleString());
    column9.appendChild(select);
    
    var checkbox = document.createElement("input"); //是否开发票
    checkbox.setAttribute("id","fixedRentInvoiceFlag_"+count.toLocaleString());
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("checked", "");
    column10.appendChild(checkbox);
    
    var remove = document.createElement("a");
    remove.setAttribute("href", "javascript:void(0);");
    remove.setAttribute("onClick", "deleteRow(this)");
    var icon = document.createElement("i");
    icon.setAttribute("class", "fa fa-minus-circle");
    icon.setAttribute("style", "color: #ED4A52; font-size: 16px;");
    remove.appendChild(icon);
    column11.appendChild(remove);

    tbody.appendChild(newrow);
    updateTaxVAT();
    updateFeeItems('fixedFeeItemDropDown','fixedVATDropDown','fixedRent');
    $('#investmentContractAccounttermFixed .input-daterange').datepicker({
        'language': 'zh-CN',
        'format': 'yyyy-mm-dd',
        'todayHighlight': true,
        'startDate': $('#startDate').val(),
        'endDate': $('#endDate').val(),
        'autoclose': true
    });
    
    $('#investmentContractAccounttermFixed .select2').select2();
    calBackPushNextCalendar('fixedRent'); 
    
    $('input.money').on('focus',function(){
        $(this).val(accounting.unformat($(this).val()));
        $(this).css('backgroundColor','#fff');
        $(this).select();
        $(this).parent().parent().addClass('success');
    });
    
    $('input.money').on('blur',function(){
        $(this).val(accounting.formatNumber($(this).val()));
        $(this).css('backgroundColor','transparent');
        $(this).parent().parent().removeClass('success');
    });
    
    $("#fixedRentEndDate_"+count.toLocaleString()).on('changeDate',function(){
        calBackPushNextCalendar('fixedRent');
        calBackPush('fixedRent');
    })
    
    $("#fixedRentTaxRentAmount_"+count.toLocaleString()).on('change',function(){
        calBackPushFixedRentTaxRentAmount();
    })
    
    $("#fixedRentTaxAmount_"+count.toLocaleString()).on('change',function(){
        calBackPushFixedRentTaxAmount();
    })
    
    $("#fixedRentAmount_"+count.toLocaleString()).on('change',function(){
        calBackPushFixedRentAmount();
    })
    
    $("#fixedRentRentAmount_"+count.toLocaleString()).on('change',function(){
        calBackPushFixedRentRentAmount();
    })
    
    $("#fixedRentTaxRate_"+count.toLocaleString()).on('change',function(){
        calBackPushFixedRentSingleRow($(this).attr('id').split('_')[1]);
    })
}

function addRowInvestmentContractAccounttermCommission() {
    var newrow = document.createElement("tr");
    newrow.setAttribute("class","new");
    var column1 = createRowColumn(newrow);
    var column2 = createRowColumn(newrow);
    var column3 = createRowColumn(newrow);
    var column4 = createRowColumn(newrow);
    var column5 = createRowColumn(newrow);
    var column6 = createRowColumn(newrow);
    var column7 = createRowColumn(newrow);
    var column8 = createRowColumn(newrow);
    var column9 = createRowColumn(newrow);
    var column10 = createRowColumn(newrow);
    var column11 = createRowColumn(newrow);
    var column12 = createRowColumn(newrow);
    var column13 = createRowColumn(newrow);
    
    var table = document.getElementById('investmentContractAccounttermCommission');
    var tbody = table.querySelector('tbody') || table;
    var count = tbody.getElementsByTagName('tr').length + 1;
    column1.innerText = count.toLocaleString();
    
    var select = document.createElement("select"); //费用项
    select.setAttribute("class","select2 commissionFeeItemDropDown new");
    select.setAttribute("id","commissionItem_"+count.toLocaleString());
    column2.appendChild(select);
    
    var div = document.createElement("div"); //期限
    div.setAttribute("class","input-daterange input-group");
    var input = document.createElement("input");
    input.setAttribute("class","form-control");
    input.setAttribute("id","commissionStartDate_"+count.toLocaleString());
    input.setAttribute("type","text");
    input.setAttribute("style","min-width: 80px");
    input.setAttribute("readonly","");
    div.appendChild(input);
    var icon = document.createElement("i");
    icon.setAttribute("class", "fa fa-calendar");
    var span = document.createElement("span");
    span.setAttribute("class", "input-group-addon");
    span.appendChild(icon);
    div.appendChild(span);
    var to = document.createElement("span");
    to.innerText = "-";
    to.setAttribute("class", "input-group-addon");
    div.appendChild(to);
    var div2 = document.createElement("div");
    div2.setAttribute("class","input-group");
    var input2 = document.createElement("input");
    input2.setAttribute("class","form-control");
    input2.setAttribute("id","commissionEndDate_"+count.toLocaleString());
    input2.setAttribute("type","text");
    input2.setAttribute("style","min-width: 80px");
    input2.setAttribute("readonly","");
    div2.appendChild(input2);
    var icon2 = document.createElement("i");
    icon2.setAttribute("class", "fa fa-calendar");
    var span2 = document.createElement("span");
    span2.setAttribute("class", "input-group-addon");
    span2.appendChild(icon2);
    div2.appendChild(span2);
    div.appendChild(div2);
    column3.appendChild(div);
    
    var select = document.createElement("select"); //扣率类型
    select.setAttribute("class","select2 commissionDeductTypeDropDown new");
    select.setAttribute("id","commissionDeductType_"+count.toLocaleString());
    column4.appendChild(select);
    
    var select = document.createElement("select"); //商品分类
    select.setAttribute("class","select2 commissionCategoryDropDown new");
    select.setAttribute("id","commissionCategory_"+count.toLocaleString());
    column5.appendChild(select);
    
    var div = document.createElement("div"); //去税扣率
    div.setAttribute("class","input-group");
    var input = document.createElement("input");
    input.setAttribute("class","form-control money");
    input.setAttribute("id","commissionTaxDeduct_"+count.toLocaleString());
    input.setAttribute("type","text");
    input.setAttribute("value","0");
    div.appendChild(input);
    var percent = document.createElement("span");
    percent.innerText = "%";
    percent.setAttribute("class", "input-group-addon");
    div.appendChild(percent);
    column6.appendChild(div);
    
    var div = document.createElement("div"); //含税扣率
    div.setAttribute("class","input-group");
    var input = document.createElement("input");
    input.setAttribute("class","form-control money");
    input.setAttribute("id","commissionDeduct_"+count.toLocaleString());
    input.setAttribute("type","text");
    input.setAttribute("value","0");
    div.appendChild(input);
    var percent = document.createElement("span");
    percent.innerText = "%";
    percent.setAttribute("class", "input-group-addon");
    div.appendChild(percent);
    column7.appendChild(div);
    
    var div = document.createElement("div"); //营业额上限
    div.setAttribute("class","input-group");
    var input = document.createElement("input");
    input.setAttribute("class","form-control money");
    input.setAttribute("id","commissionAmount_"+count.toLocaleString());
    input.setAttribute("type","text");
    input.setAttribute("value","0");
    div.appendChild(input);
    var percent = document.createElement("span");
    percent.innerText = "元/年";
    percent.setAttribute("class", "input-group-addon");
    div.appendChild(percent);
    column8.appendChild(div);
    
    var div = document.createElement("div"); //保底营业额
    div.setAttribute("class","input-group");
    var input = document.createElement("input");
    input.setAttribute("class","form-control money");
    input.setAttribute("id","commissionMinSales_"+count.toLocaleString());
    input.setAttribute("type","text");
    input.setAttribute("value","0");
    div.appendChild(input);
    var percent = document.createElement("span");
    percent.innerText = "元/月";
    percent.setAttribute("class", "input-group-addon");
    div.appendChild(percent);
    column9.appendChild(div);
    
    var div = document.createElement("div"); //预估营业额
    div.setAttribute("class","input-group");
    var input = document.createElement("input");
    input.setAttribute("class","form-control money");
    input.setAttribute("id","commissionMinSalesAmount_"+count.toLocaleString());
    input.setAttribute("type","text");
    input.setAttribute("value","0");
    div.appendChild(input);
    var percent = document.createElement("span");
    percent.innerText = "元/月";
    percent.setAttribute("class", "input-group-addon");
    div.appendChild(percent);
    column10.appendChild(div);
    
    var select = document.createElement("select"); //税率
    select.setAttribute("class","select2 taxVat newVAT commissionVATDropDown newFee");
    select.setAttribute("id","commissionTaxRate_"+count.toLocaleString());
    column11.appendChild(select);
    
    var checkbox = document.createElement("input"); //是否开发票
    checkbox.setAttribute("id","commissionInvoiceFlag_"+count.toLocaleString());
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("checked", "");
    column12.appendChild(checkbox);
    
    var remove = document.createElement("a");
    remove.setAttribute("href", "javascript:void(0);");
    remove.setAttribute("onClick", "deleteRow(this)");
    var icon = document.createElement("i");
    icon.setAttribute("class", "fa fa-minus-circle");
    icon.setAttribute("style", "color: #ED4A52; font-size: 16px;");
    remove.appendChild(icon);
    column13.appendChild(remove);

    tbody.appendChild(newrow);
    updateTaxVAT();
    updateCommissionDropDown('commissionCategoryDropDown','PRODUCT_CATEGORY'); // 商品分类
    updateCommissionDropDown('commissionDeductTypeDropDown','DEDUCT_TYPE'); // 全额/差额
    updateFeeItems('commissionFeeItemDropDown','commissionVATDropDown','deductRent');
    $('#investmentContractAccounttermCommission .input-daterange').datepicker({
        'language': 'zh-CN',
        'format': 'yyyy-mm-dd',
        'todayHighlight': true,
        'startDate': $('#startDate').val(),
        'endDate': $('#endDate').val(),
        'autoclose': true
    });
    
    $('#investmentContractAccounttermCommission .select2').select2();
    
    $('input.money').on('focus',function(){
        $(this).val(accounting.unformat($(this).val()));
        $(this).css('backgroundColor','#fff');
        $(this).select();
        $(this).parent().parent().addClass('success');
    });
    
    $('input.money').on('blur',function(){
        $(this).val(accounting.formatNumber($(this).val()));
        $(this).css('backgroundColor','transparent');
        $(this).parent().parent().removeClass('success');
    });
    
    $("#commissionEndDate_"+count.toLocaleString()).on('changeDate',function(){
        calBackPush('commission');
    });
    
    $("#commissionTaxDeduct_"+count.toLocaleString()).on('change',function(){
        calBackPushCommissionDeduct();
    })
    
    $("#commissionDeduct_"+count.toLocaleString()).on('change',function(){
        calBackPushCommissionTaxDeduct();
    })
    
    $("#commissionAmount_"+count.toLocaleString()+", #commissionMinSalesAmount_"+count.toLocaleString()).on('change',function(){
        calBackPush('commission');
    })
    
    $("#commissionTaxRate_"+count.toLocaleString()).on('change',function(){
        calBackPushCommissionSingleRow($(this).attr('id').split('_')[1]);
    })
}

function addRowInvestmentContractAccounttermPropertyMgmt() {
    var newrow = document.createElement("tr");
    newrow.setAttribute("class","new");
    var column1 = createRowColumn(newrow);
    var column2 = createRowColumn(newrow);
    var column3 = createRowColumn(newrow);
    var column4 = createRowColumn(newrow);
    var column5 = createRowColumn(newrow);
    var column6 = createRowColumn(newrow);
    var column7 = createRowColumn(newrow);
    var column8 = createRowColumn(newrow);
    var column9 = createRowColumn(newrow);
    var column10 = createRowColumn(newrow);
    
    var table = document.getElementById('investmentContractAccounttermPropertyMgmt');
    var tbody = table.querySelector('tbody') || table;
    var count = tbody.getElementsByTagName('tr').length + 1;
    column1.innerText = count.toLocaleString();
    
    var select = document.createElement("select"); //费用项
    select.setAttribute("class","select2 propertyMgmtFeeItemDropDown new");
    select.setAttribute("id","propertyMgmtItem_"+count.toLocaleString());
    column2.appendChild(select);
    
    var div = document.createElement("div"); //期限
    div.setAttribute("class","input-daterange input-group");
    var input = document.createElement("input");
    input.setAttribute("class","form-control");
    input.setAttribute("id","propertyMgmtStartDate_"+count.toLocaleString());
    input.setAttribute("type","text");
    input.setAttribute("style","min-width: 80px");
    input.setAttribute("readonly","");
    div.appendChild(input);
    var icon = document.createElement("i");
    icon.setAttribute("class", "fa fa-calendar");
    var span = document.createElement("span");
    span.setAttribute("class", "input-group-addon");
    span.appendChild(icon);
    div.appendChild(span);
    var to = document.createElement("span");
    to.innerText = "-";
    to.setAttribute("class", "input-group-addon");
    div.appendChild(to);
    var div2 = document.createElement("div");
    div2.setAttribute("class","input-group");
    var input2 = document.createElement("input");
    input2.setAttribute("class","form-control");
    input2.setAttribute("id","propertyMgmtEndDate_"+count.toLocaleString());
    input2.setAttribute("type","text");
    input2.setAttribute("style","min-width: 80px");
    input2.setAttribute("readonly","");
    div2.appendChild(input2);
    var icon2 = document.createElement("i");
    icon2.setAttribute("class", "fa fa-calendar");
    var span2 = document.createElement("span");
    span2.setAttribute("class", "input-group-addon");
    span2.appendChild(icon2);
    div2.appendChild(span2);
    div.appendChild(div2);
    column3.appendChild(div);
    
    var div = document.createElement("div"); //去税单价
    div.setAttribute("class","input-group");
    var input = document.createElement("input");
    input.setAttribute("class","form-control money");
    input.setAttribute("id","propertyMgmtTaxRentAmount_"+count.toLocaleString());
    input.setAttribute("type","text");
    div.appendChild(input);
    var percent = document.createElement("span");
    percent.innerText = "元/m²/月";
    percent.setAttribute("class", "input-group-addon");
    div.appendChild(percent);
    column4.appendChild(div);
    
    var div = document.createElement("div"); //去税金额
    div.setAttribute("class","input-group");
    var input = document.createElement("input");
    input.setAttribute("class","form-control money");
    input.setAttribute("id","propertyMgmtTaxAmount_"+count.toLocaleString());
    input.setAttribute("type","text");
    div.appendChild(input);
    var percent = document.createElement("span");
    percent.innerText = "元";
    percent.setAttribute("class", "input-group-addon");
    div.appendChild(percent);
    column5.appendChild(div);
    
    var div = document.createElement("div"); //含税金额
    div.setAttribute("class","input-group");
    var input = document.createElement("input");
    input.setAttribute("class","form-control money");
    input.setAttribute("id","propertyMgmtAmount_"+count.toLocaleString());
    input.setAttribute("type","text");
    div.appendChild(input);
    var percent = document.createElement("span");
    percent.innerText = "元";
    percent.setAttribute("class", "input-group-addon");
    div.appendChild(percent);
    column6.appendChild(div);
    
    var div = document.createElement("div"); //含税单价
    div.setAttribute("class","input-group");
    var input = document.createElement("input");
    input.setAttribute("class","form-control money");
    input.setAttribute("id","propertyMgmtRentAmount_"+count.toLocaleString());
    input.setAttribute("type","text");
    div.appendChild(input);
    var percent = document.createElement("span");
    percent.innerText = "元/m²/月";
    percent.setAttribute("class", "input-group-addon");
    div.appendChild(percent);
    column7.appendChild(div);
    
    var select = document.createElement("select"); //税率
    select.setAttribute("class","select2 taxVat newVAT propertyMgmtVATDropDown newFee");
    select.setAttribute("id","propertyMgmtTaxRate_"+count.toLocaleString());
    column8.appendChild(select);
    
    var checkbox = document.createElement("input"); //是否开发票
    checkbox.setAttribute("id","propertyMgmtInvoiceFlag_"+count.toLocaleString());
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("checked", "");
    column9.appendChild(checkbox);
    
    var remove = document.createElement("a");
    remove.setAttribute("href", "javascript:void(0);");
    remove.setAttribute("onClick", "deleteRow(this)");
    var icon = document.createElement("i");
    icon.setAttribute("class", "fa fa-minus-circle");
    icon.setAttribute("style", "color: #ED4A52; font-size: 16px;");
    remove.appendChild(icon);
    column10.appendChild(remove);

    tbody.appendChild(newrow);
    updateTaxVAT();
    updateFeeItems('propertyMgmtFeeItemDropDown','propertyMgmtVATDropDown','property');
    $('#investmentContractAccounttermPropertyMgmt .input-daterange').datepicker({
        'language': 'zh-CN',
        'format': 'yyyy-mm-dd',
        'todayHighlight': true,
        'startDate': $('#startDate').val(),
        'endDate': $('#endDate').val(),
        'autoclose': true
    });
    $('#investmentContractAccounttermPropertyMgmt .select2').select2();
    calBackPushNextCalendar('propertyMgmt');
    
    $('input.money').on('focus',function(){
        $(this).val(accounting.unformat($(this).val()));
        $(this).css('backgroundColor','#fff');
        $(this).select();
        $(this).parent().parent().addClass('success');
    });
    
    $('input.money').on('blur',function(){
        $(this).val(accounting.formatNumber($(this).val()));
        $(this).css('backgroundColor','transparent');
        $(this).parent().parent().removeClass('success');
    });
    
    $("#propertyMgmtEndDate_"+count.toLocaleString()).on('changeDate',function(){
        calBackPushNextCalendar('propertyMgmt');
        calBackPush('propertyMgmt');
    })
    
    $("#propertyMgmtTaxRentAmount_"+count.toLocaleString()).on('change',function(){
        calBackPushPropertyMgmtTaxRentAmount();
    })
    
    $("#propertyMgmtTaxAmount_"+count.toLocaleString()).on('change',function(){
        calBackPushPropertyMgmtTaxAmount();
    })
    
    $("#propertyMgmtAmount_"+count.toLocaleString()).on('change',function(){
        calBackPushPropertyMgmtAmount();
    })
    
    $("#propertyMgmtRentAmount_"+count.toLocaleString()).on('change',function(){
        calBackPushPropertyMgmtRentAmount();
    })
    
    $("#propertyMgmtTaxRate_"+count.toLocaleString()).on('change',function(){
        calBackPushPropertyMgmtSingleRow($(this).attr('id').split('_')[1]);
    })
}

function addRowInvestmentContractAccounttermPropertyFeeYear() {
    var newrow = document.createElement("tr");
    newrow.setAttribute("class","new");
    var column1 = createRowColumn(newrow);
    var column2 = createRowColumn(newrow);
    var column3 = createRowColumn(newrow);
    var column4 = createRowColumn(newrow);
    var column5 = createRowColumn(newrow);
    var column6 = createRowColumn(newrow);
    var column7 = createRowColumn(newrow);
    var column8 = createRowColumn(newrow);
    
    var table = document.getElementById('investmentContractAccounttermPropertyFeeYear');
    var tbody = table.querySelector('tbody') || table;
    var count = tbody.getElementsByTagName('tr').length + 1;
    column1.innerText = count.toLocaleString();
    
    var select = document.createElement("select"); //费用项
    select.setAttribute("class","select2 propertyFeeYearItemDropDown new");
    select.setAttribute("id","propertyFeeYearItem_"+count.toLocaleString());
    column2.appendChild(select);
    
    var div = document.createElement("div"); //期限
    div.setAttribute("class","input-daterange input-group");
    var input = document.createElement("input");
    input.setAttribute("class","form-control");
    input.setAttribute("id","propertyFeeYearStartDate_"+count.toLocaleString());
    input.setAttribute("type","text");
    input.setAttribute("style","min-width: 80px");
    input.setAttribute("readonly","");
    div.appendChild(input);
    var icon = document.createElement("i");
    icon.setAttribute("class", "fa fa-calendar");
    var span = document.createElement("span");
    span.setAttribute("class", "input-group-addon");
    span.appendChild(icon);
    div.appendChild(span);
    var to = document.createElement("span");
    to.innerText = "-";
    to.setAttribute("class", "input-group-addon");
    div.appendChild(to);
    var div2 = document.createElement("div");
    div2.setAttribute("class","input-group");
    var input2 = document.createElement("input");
    input2.setAttribute("class","form-control");
    input2.setAttribute("id","propertyFeeYearEndDate_"+count.toLocaleString());
    input2.setAttribute("type","text");
    input2.setAttribute("style","min-width: 80px");
    input2.setAttribute("readonly","");
    div2.appendChild(input2);
    var icon2 = document.createElement("i");
    icon2.setAttribute("class", "fa fa-calendar");
    var span2 = document.createElement("span");
    span2.setAttribute("class", "input-group-addon");
    span2.appendChild(icon2);
    div2.appendChild(span2);
    div.appendChild(div2);
    column3.appendChild(div);
    
    var div = document.createElement("div"); //去税金额
    div.setAttribute("class","input-group");
    var input = document.createElement("input");
    input.setAttribute("class","form-control money");
    input.setAttribute("id","propertyFeeYearTaxAmount_"+count.toLocaleString());
    input.setAttribute("type","text");
    div.appendChild(input);
    var percent = document.createElement("span");
    percent.innerText = "元";
    percent.setAttribute("class", "input-group-addon");
    div.appendChild(percent);
    column4.appendChild(div);
    
    var div = document.createElement("div"); //含税金额
    div.setAttribute("class","input-group");
    var input = document.createElement("input");
    input.setAttribute("class","form-control money");
    input.setAttribute("id","propertyFeeYearAmount_"+count.toLocaleString());
    input.setAttribute("type","text");
    div.appendChild(input);
    var percent = document.createElement("span");
    percent.innerText = "元";
    percent.setAttribute("class", "input-group-addon");
    div.appendChild(percent);
    column5.appendChild(div);
    
    var select = document.createElement("select"); //税率
    select.setAttribute("class","select2 taxVat newVAT propertyFeeYearVATDropDown newFee");
    select.setAttribute("id","propertyFeeYearTaxRate_"+count.toLocaleString());
    column6.appendChild(select);
    
    var checkbox = document.createElement("input"); //是否开发票
    checkbox.setAttribute("id","propertyFeeYearInvoiceFlag_"+count.toLocaleString());
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("checked", "");
    column7.appendChild(checkbox);
    
    var remove = document.createElement("a");
    remove.setAttribute("href", "javascript:void(0);");
    remove.setAttribute("onClick", "deleteRow(this)");
    var icon = document.createElement("i");
    icon.setAttribute("class", "fa fa-minus-circle");
    icon.setAttribute("style", "color: #ED4A52; font-size: 16px;");
    remove.appendChild(icon);
    column8.appendChild(remove);

    tbody.appendChild(newrow);
    updateTaxVAT();
    updateFeeItems('propertyFeeYearItemDropDown','propertyFeeYearVATDropDown','propertyYear');
    $('#investmentContractAccounttermPropertyFeeYear .input-daterange').datepicker({
        'language': 'zh-CN',
        'format': 'yyyy-mm-dd',
        'todayHighlight': true,
        'startDate': $('#startDate').val(),
        'endDate': $('#endDate').val(),
        'autoclose': true
    });
    $('#investmentContractAccounttermPropertyFeeYear .select2').select2();
    calBackPushNextCalendar('propertyFeeYear');
    
    $('input.money').on('focus',function(){
        $(this).val(accounting.unformat($(this).val()));
        $(this).css('backgroundColor','#fff');
        $(this).select();
        $(this).parent().parent().addClass('success');
    });
    
    $('input.money').on('blur',function(){
        $(this).val(accounting.formatNumber($(this).val()));
        $(this).css('backgroundColor','transparent');
        $(this).parent().parent().removeClass('success');
    });
    
    $("#propertyFeeYearEndDate_"+count.toLocaleString()).on('changeDate',function(){
        calBackPushNextCalendar('propertyFeeYear');
    })
    
    $("#propertyFeeYearTaxAmount_"+count.toLocaleString()).on('change',function(){
        calBackPushPropertyFeeYearTaxAmount();
    })
    
    $("#propertyFeeYearAmount_"+count.toLocaleString()).on('change',function(){
        calBackPushPropertyFeeYearAmount();
    })
    
    $("#propertyFeeYearTaxRate_"+count.toLocaleString()).on('change',function(){
        calBackPushPropertyFeeYearSingleRow($(this).attr('id').split('_')[1]);
    })
}

function addRowInvestmentContractAccounttermPromotion() {
    var newrow = document.createElement("tr");
    newrow.setAttribute("class","new");
    var column1 = createRowColumn(newrow);
    var column2 = createRowColumn(newrow);
    var column3 = createRowColumn(newrow);
    var column4 = createRowColumn(newrow);
    var column5 = createRowColumn(newrow);
    var column6 = createRowColumn(newrow);
    var column7 = createRowColumn(newrow);
    var column8 = createRowColumn(newrow);
    var column9 = createRowColumn(newrow);
    var column10 = createRowColumn(newrow);
    var column11 = createRowColumn(newrow);
    
    var table = document.getElementById('investmentContractAccounttermPromotion');
    var tbody = table.querySelector('tbody') || table;
    var count = tbody.getElementsByTagName('tr').length + 1;
    column1.innerText = count.toLocaleString();
    
    var select = document.createElement("select"); //费用项
    select.setAttribute("class","select2 promotionFeeItemDropDown new");
    select.setAttribute("id","promotionItem_"+count.toLocaleString());
    column2.appendChild(select);
    
    var div = document.createElement("div"); //期限
    div.setAttribute("class","input-daterange input-group");
    var input = document.createElement("input");
    input.setAttribute("class","form-control");
    input.setAttribute("id","promotionStartDate_"+count.toLocaleString());
    input.setAttribute("type","text");
    input.setAttribute("style","min-width: 80px");
    input.setAttribute("readonly","");
    div.appendChild(input);
    var icon = document.createElement("i");
    icon.setAttribute("class", "fa fa-calendar");
    var span = document.createElement("span");
    span.setAttribute("class", "input-group-addon");
    span.appendChild(icon);
    div.appendChild(span);
    var to = document.createElement("span");
    to.innerText = "-";
    to.setAttribute("class", "input-group-addon");
    div.appendChild(to);
    var div2 = document.createElement("div");
    div2.setAttribute("class","input-group");
    var input2 = document.createElement("input");
    input2.setAttribute("class","form-control");
    input2.setAttribute("id","promotionEndDate_"+count.toLocaleString());
    input2.setAttribute("type","text");
    input2.setAttribute("style","min-width: 80px");
    input2.setAttribute("readonly","");
    div2.appendChild(input2);
    var icon2 = document.createElement("i");
    icon2.setAttribute("class", "fa fa-calendar");
    var span2 = document.createElement("span");
    span2.setAttribute("class", "input-group-addon");
    span2.appendChild(icon2);
    div2.appendChild(span2);
    div.appendChild(div2);
    column3.appendChild(div);
    
    var div = document.createElement("div"); //含税金额
    div.setAttribute("class","input-group");
    var input = document.createElement("input");
    input.setAttribute("class","form-control money");
    input.setAttribute("id","promotionAmount_"+count.toLocaleString());
    input.setAttribute("type","text");
    input.setAttribute("value","0");
    div.appendChild(input);
    var percent = document.createElement("span");
    percent.innerText = "元";
    percent.setAttribute("class", "input-group-addon");
    div.appendChild(percent);
    column4.appendChild(div);
    
    var div = document.createElement("div"); //去税金额
    div.setAttribute("class","input-group");
    var input = document.createElement("input");
    input.setAttribute("class","form-control money");
    input.setAttribute("id","promotionTaxAmount_"+count.toLocaleString());
    input.setAttribute("type","text");
    input.setAttribute("value","0");
    input.setAttribute("readonly","");
    input.setAttribute("style","border: none");
    div.appendChild(input);
    var percent = document.createElement("span");
    percent.innerText = "元";
    percent.setAttribute("class", "input-group-addon");
    div.appendChild(percent);
    column5.appendChild(div);
    
    var div = document.createElement("div"); //含税扣率
    div.setAttribute("class","input-group");
    var input = document.createElement("input");
    input.setAttribute("class","form-control money");
    input.setAttribute("id","promotionDeduct_"+count.toLocaleString());
    input.setAttribute("type","text");
    input.setAttribute("value","0");
    div.appendChild(input);
    var percent = document.createElement("span");
    percent.innerText = "%";
    percent.setAttribute("class", "input-group-addon");
    div.appendChild(percent);
    column6.appendChild(div);
    
    var div = document.createElement("div"); //去税扣率
    div.setAttribute("class","input-group");
    var input = document.createElement("input");
    input.setAttribute("class","form-control money");
    input.setAttribute("id","promotionTaxDeduct_"+count.toLocaleString());
    input.setAttribute("type","text");
    input.setAttribute("value","0");
    input.setAttribute("readonly","");
    input.setAttribute("style","border: none");
    div.appendChild(input);
    var percent = document.createElement("span");
    percent.innerText = "%";
    percent.setAttribute("class", "input-group-addon");
    div.appendChild(percent);
    column7.appendChild(div);
    
    var select = document.createElement("select"); //提成基数
    select.setAttribute("class","select2");
    select.setAttribute("id","promotionSalesType_"+count.toLocaleString());
    select.options[0] = new Option('包含营业额中的增值税','1');
    select.options[1] = new Option('不包含营业额中的增值税','2');
    column8.appendChild(select);
    
    var select = document.createElement("select"); //税率
    select.setAttribute("class","select2 taxVat newVAT promotionVATDropDown newFee");
    select.setAttribute("id","promotionTaxRate_"+count.toLocaleString());
    column9.appendChild(select);
    
    var checkbox = document.createElement("input"); //是否开发票
    checkbox.setAttribute("id","promotionInvoiceFlag_"+count.toLocaleString());
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("checked", "");
    column10.appendChild(checkbox);
    
    var remove = document.createElement("a");
    remove.setAttribute("href", "javascript:void(0);");
    remove.setAttribute("onClick", "deleteRow(this)");
    var icon = document.createElement("i");
    icon.setAttribute("class", "fa fa-minus-circle");
    icon.setAttribute("style", "color: #ED4A52; font-size: 16px;");
    remove.appendChild(icon);
    column11.appendChild(remove);

    tbody.appendChild(newrow);
    updateTaxVAT();
    updateFeeItems('promotionFeeItemDropDown','promotionVATDropDown','promitionFee');
    $('#investmentContractAccounttermPromotion .input-daterange').datepicker({
        'language': 'zh-CN',
        'format': 'yyyy-mm-dd',
        'todayHighlight': true,
        'startDate': $('#startDate').val(),
        'endDate': $('#endDate').val(),
        'autoclose': true
    });
    $('#investmentContractAccounttermPromotion .select2').select2();
    calBackPushNextCalendar('promotion');
    
    $('input.money').on('focus',function(){
        $(this).val(accounting.unformat($(this).val()));
        $(this).css('backgroundColor','#fff');
        $(this).select();
        $(this).parent().parent().addClass('success');
    });
    
    $('input.money').on('blur',function(){
        $(this).val(accounting.formatNumber($(this).val()));
        $(this).css('backgroundColor','transparent');
        $(this).parent().parent().removeClass('success');
    });
    
    $("#promotionEndDate_"+count.toLocaleString()).on('changeDate',function(){
        calBackPushNextCalendar('promotion');
        calBackPush('promotion');
    })
    
    $("#promotionAmount_"+count.toLocaleString()).on('change',function(){
        calBackPushPromotionAmount();
    })
    
    $("#promotionDeduct_"+count.toLocaleString()).on('change',function(){
        calBackPushPromotionDeduct();
    })
    
    $("#promotionTaxRate_"+count.toLocaleString()).on('change',function(){
        calBackPushPromotionSingleRow($(this).attr('id').split('_')[1]);
    })
}

function addRowInvestmentContractDepositterm() {
    var newrow = document.createElement("tr");
    newrow.setAttribute("class","new");
    var column1 = createRowColumn(newrow);
    var column2 = createRowColumn(newrow);
    var column3 = createRowColumn(newrow);
    var column4 = createRowColumn(newrow);
    var column5 = createRowColumn(newrow);
    var column6 = createRowColumn(newrow);
    
    var table = document.getElementById('investmentContractDepositterm');
    var tbody = table.querySelector('tbody') || table;
    var count = tbody.getElementsByTagName('tr').length + 1;
    column1.innerText = count.toLocaleString();
    
    var select = document.createElement("select"); //费用项
    select.setAttribute("class","select2");
    select.setAttribute("id","deposittermItem_"+count.toLocaleString());
    select.options[0] = new Option('租赁保证金[E02]','E02');
    select.options[1] = new Option('装修保证金[E03]','E03');
    select.options[2] = new Option('公共事业费押金[E22]','E22');
    column2.appendChild(select);
    
    column3.innerText = '收';
    
    var div = document.createElement("div"); //含税金额
    div.setAttribute("class","input-group");
    var input = document.createElement("input");
    input.setAttribute("class","form-control money");
    input.setAttribute("id","deposittermAmount_"+count.toLocaleString());
    input.setAttribute("type","text");
    div.appendChild(input);
    var percent = document.createElement("span");
    percent.innerText = "元";
    percent.setAttribute("class", "input-group-addon");
    div.appendChild(percent);
    column4.appendChild(div);
    
    var div = document.createElement("div"); //最后缴款期
    div.setAttribute("class","input-group");
    var input = document.createElement("input");
    input.setAttribute("class","form-control date-picker");
    input.setAttribute("id","deposittermPaymentDate_"+count.toLocaleString());
    input.setAttribute("type","text");
    input.setAttribute("style","width: 100%");
    input.setAttribute("readonly","");
    div.appendChild(input);
    var icon = document.createElement("i");
    icon.setAttribute("class", "fa fa-calendar");
    var span = document.createElement("span");
    span.setAttribute("class", "input-group-addon");
    span.appendChild(icon);
    div.appendChild(span);
    column5.appendChild(div);
    
    var remove = document.createElement("a");
    remove.setAttribute("href", "javascript:void(0);");
    remove.setAttribute("onClick", "deleteRow(this)");
    var icon = document.createElement("i");
    icon.setAttribute("class", "fa fa-minus-circle");
    icon.setAttribute("style", "color: #ED4A52; font-size: 16px;");
    remove.appendChild(icon);
    column6.appendChild(remove);

    tbody.appendChild(newrow);
    $('#investmentContractDepositterm .select2').select2();
    
    $('.date-picker').datepicker({
        'language': 'zh-CN',
        'format': 'yyyy-mm-dd',
        'todayHighlight': true,
        'autoclose': true
    });
    
    $('input.money').on('focus',function(){
        $(this).val(accounting.unformat($(this).val()));
        $(this).css('backgroundColor','#fff');
        $(this).select();
        $(this).parent().parent().addClass('success');
    });
    
    $('input.money').on('blur',function(){
        $(this).val(accounting.formatNumber($(this).val()));
        $(this).css('backgroundColor','transparent');
        $(this).parent().parent().removeClass('success');
    });
}

function addRowContactList() {
    var newrow = document.createElement("tr");
    newrow.setAttribute("class","new");
    var column1 = createRowColumn(newrow);
    var column2 = createRowColumn(newrow);
    var column3 = createRowColumn(newrow);
    var column4 = createRowColumn(newrow);
    var column5 = createRowColumn(newrow);
    var column6 = createRowColumn(newrow);
    var column7 = createRowColumn(newrow);
    var column8 = createRowColumn(newrow);
    var column9 = createRowColumn(newrow);
    var column10 = createRowColumn(newrow);
    var column11 = createRowColumn(newrow);
    var column12 = createRowColumn(newrow);
    var column13 = createRowColumn(newrow);
    
    var table = document.getElementById('tenantContactList');
    var tbody = table.querySelector('tbody') || table;
    var count = tbody.getElementsByTagName('tr').length + 1;
    column1.innerText = count.toLocaleString();
    
    var div = document.createElement("div"); //姓名
    var input = document.createElement("input");
    input.setAttribute("class","form-control");
    input.setAttribute("id","contactListName_"+count.toLocaleString());
    input.setAttribute("type","text");
    column2.appendChild(input);
    
    var div = document.createElement("div"); //身份证号
    var input = document.createElement("input");
    input.setAttribute("class","form-control");
    input.setAttribute("id","contactListCardId_"+count.toLocaleString());
    input.setAttribute("type","text");
    column3.appendChild(input);
    
    var div = document.createElement("div"); //岗位
    var input = document.createElement("input");
    input.setAttribute("class","form-control");
    input.setAttribute("id","contactListTitle_"+count.toLocaleString());
    input.setAttribute("type","text");
    column4.appendChild(input);
    
    var select = document.createElement("select"); //分类
    select.setAttribute("class","select2");
    select.setAttribute("id","contactListBdFlag_"+count.toLocaleString());
    select.options[0] = new Option('业务拓展','1');
    select.options[1] = new Option('财务','2');
    select.options[2] = new Option('法务','3');
    column5.appendChild(select);
    
    var div = document.createElement("div"); //手机
    var input = document.createElement("input");
    input.setAttribute("class","form-control");
    input.setAttribute("id","contactListMobileNo_"+count.toLocaleString());
    input.setAttribute("type","text");
    column6.appendChild(input);
    
    var div = document.createElement("div"); //办公电话
    var input = document.createElement("input");
    input.setAttribute("class","form-control");
    input.setAttribute("id","contactListPhoneNum_"+count.toLocaleString());
    input.setAttribute("type","text");
    column7.appendChild(input);
    
    var div = document.createElement("div"); //电子邮件
    var input = document.createElement("input");
    input.setAttribute("class","form-control");
    input.setAttribute("id","contactListMail_"+count.toLocaleString());
    input.setAttribute("type","text");
    column8.appendChild(input);
    
    var div = document.createElement("div"); //详细地址
    var input = document.createElement("input");
    input.setAttribute("class","form-control");
    input.setAttribute("id","contactListAddress_"+count.toLocaleString());
    input.setAttribute("type","text");
    column9.appendChild(input);
    
    var checkbox = document.createElement("input"); //线上签章人
    checkbox.setAttribute("id","contactListEsignFlag_"+count.toLocaleString());
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("checked", "");
    column10.appendChild(checkbox);
    
    var checkbox = document.createElement("input"); //接收财函
    checkbox.setAttribute("id","contactListFinanceFlag_"+count.toLocaleString());
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("checked", "");
    column11.appendChild(checkbox);
    
    var checkbox = document.createElement("input"); //接收法函
    checkbox.setAttribute("id","contactListLegalFlag_"+count.toLocaleString());
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("checked", "");
    column12.appendChild(checkbox);
    
    var remove = document.createElement("a");
    remove.setAttribute("href", "javascript:void(0);");
    remove.setAttribute("onClick", "deleteRow(this)");
    var icon = document.createElement("i");
    icon.setAttribute("class", "fa fa-minus-circle");
    icon.setAttribute("style", "color: #ED4A52; font-size: 16px;");
    remove.appendChild(icon);
    column13.appendChild(remove);

    tbody.appendChild(newrow);
    $('#tenantContactList .select2').select2();
}

function addRowInvestmentBudgetAccountterm(term) {
    var newrow = document.createElement("tr");
    newrow.setAttribute("class","new");
    newrow.setAttribute("data-id","");
    var column = [];
    column[0] = createRowColumn(newrow);
    column[1] = createRowColumn(newrow);
    column[2] = createRowColumn(newrow);
    column[3] = createRowColumn(newrow);
    column[4] = createRowColumn(newrow);
    column[5] = createRowColumn(newrow);
    column[6] = createRowColumn(newrow);
    column[7] = createRowColumn(newrow);
    column[8] = createRowColumn(newrow);
    column[9] = createRowColumn(newrow);
    column[10] = createRowColumn(newrow);
    column[11] = createRowColumn(newrow);
    column[12] = createRowColumn(newrow);
    column[13] = createRowColumn(newrow);
    column[14] = createRowColumn(newrow);
    
    var table = document.getElementById('investmentBudgetAccountterm'+term.slice(0,1).toUpperCase()+term.slice(1).toLowerCase());
    var tbody = table.querySelector('tbody') || table;
    var count = tbody.getElementsByTagName('tr').length + 1;
    column[0].innerText = count.toLocaleString();
    
    var div = document.createElement("div"); //期限
    div.setAttribute("class","input-daterange input-group");
    var input = document.createElement("input");
    input.setAttribute("class","form-control");
    input.setAttribute("id",term+"StartDate_"+count.toLocaleString());
    input.setAttribute("type","text");
    input.setAttribute("style","min-width: 80px");
    input.setAttribute("readonly","");
    div.appendChild(input);
    var icon = document.createElement("i");
    icon.setAttribute("class", "fa fa-calendar");
    var span = document.createElement("span");
    span.setAttribute("class", "input-group-addon");
    span.appendChild(icon);
    div.appendChild(span);
    var to = document.createElement("span");
    to.innerText = "-";
    to.setAttribute("class", "input-group-addon");
    div.appendChild(to);
    var div2 = document.createElement("div");
    div2.setAttribute("class","input-group");
    var input2 = document.createElement("input");
    input2.setAttribute("class","form-control");
    input2.setAttribute("id",term+"EndDate_"+count.toLocaleString());
    input2.setAttribute("type","text");
    input2.setAttribute("style","min-width: 80px");
    input2.setAttribute("readonly","");
    div2.appendChild(input2);
    var icon2 = document.createElement("i");
    icon2.setAttribute("class", "fa fa-calendar");
    var span2 = document.createElement("span");
    span2.setAttribute("class", "input-group-addon");
    span2.appendChild(icon2);
    div2.appendChild(span2);
    div.appendChild(div2);
    column[1].appendChild(div);
    
    for(let i = 1; i <= 12; i++){
        var div = document.createElement("div");
        div.setAttribute("class","input-group");
        var input = document.createElement("input");
        input.setAttribute("class","form-control money");
        input.setAttribute("id",term+"_"+i+"_"+count.toLocaleString());
        input.setAttribute("type","text");
        input.setAttribute("value",0);
        div.appendChild(input);
        var percent = document.createElement("span");
        percent.innerText = "元";
        percent.setAttribute("class", "input-group-addon");
        div.appendChild(percent);
        column[i*1+1].appendChild(div);
    }
    
    var remove = document.createElement("a");
    remove.setAttribute("href", "javascript:void(0);");
    remove.setAttribute("onClick", "deleteBudgetRow(this)");
    var icon = document.createElement("i");
    icon.setAttribute("class", "fa fa-minus-circle");
    icon.setAttribute("style", "color: #ED4A52; font-size: 16px;");
    remove.appendChild(icon);
    column[14].appendChild(remove);               

    tbody.appendChild(newrow);
    $('#investmentBudgetAccountterm'+term.slice(0,1).toUpperCase()+term.slice(1).toLowerCase()+' .input-daterange').datepicker({
        'language': 'zh-CN',
        'format': 'yyyy-mm-dd',
        'todayHighlight': true,
        'autoclose': true
    });
    
    $('#investmentBudgetAccountterm'+term.slice(0,1).toUpperCase()+term.slice(1).toLowerCase()+' .select2').select2();
    
    $('input.money').each(function(){
        $(this).val(accounting.formatNumber($(this).val()));
    })
 
    $('input.money').on('focus',function(){
        $(this).val(accounting.unformat($(this).val()));
        $(this).css('backgroundColor','#fff');
        $(this).select();
        $(this).parent().parent().addClass('success');
    });
    
    $('input.money').on('blur',function(){
        $(this).val(accounting.formatNumber($(this).val()));
        $(this).css('backgroundColor','transparent');
        $(this).parent().parent().removeClass('success');
    });
}

function deleteRow(button) {
    var row = button.parentNode.parentNode;
    var tbody = row.parentNode;
    tbody.removeChild(row);

    // refactoring numbering
    var rows = tbody.getElementsByTagName("tr");
    var id = tbody.getAttribute("id");
    for (var i = 0; i < rows.length; i++) {
        var currentRow = rows[i];
        currentRow.childNodes[0].innerText = (i+1).toLocaleString();
        var td = $("#"+id+" tr:eq(" + i + ") td");
        td.find("input, select").each(function(){
            $(this).attr('id',$(this).attr('id').split('_')[0]+'_'+(i+1).toLocaleString());
        });
    }
    calBackPush(id);
}

function deleteBudgetRow(button) {
    var row = button.parentNode.parentNode;
    var tbody = row.parentNode;
    tbody.removeChild(row);

    // refactoring numbering
    var rows = tbody.getElementsByTagName("tr");
    var id = tbody.getAttribute("id");
    for (var i = 0; i < rows.length; i++) {
        var currentRow = rows[i];
        currentRow.childNodes[0].innerText = (i+1).toLocaleString();
        var td = $("#"+id+" tr:eq(" + i + ") td");
        td.find("input, select").each(function(){
            $(this).attr('id',$(this).attr('id').split('_')[0]+'_'+(i+1).toLocaleString());
        });
    }
}

function updateTaxVAT() {
    var taxVAT  = JSON.parse(sessionStorage.getItem("taxVAT"));
    if(taxVAT.length > 0){
        $.each(taxVAT, function(i,v) {
            $('.taxVat.newVAT').append('<option value="'+v.taxRate+'" data-code="'+v.taxCode+'">增值税'+parseInt(v.taxRate*100)+'%</option>');
        })
        $('.taxVat.newVAT').removeClass('newVAT');
    }
}

function updateCommissionDropDown(clas,dictTypeCode) {
    var dictType  = JSON.parse(sessionStorage.getItem(dictTypeCode));
    if(dictType.length > 0){
        $.each(dictType, function(i,v) {
            $('.'+clas+'.new').append('<option value="'+v.dictCode+'">'+v.dictName+'</option>');
        })
        $('.'+clas+'.new').removeClass('new');
    }
}

function updateDictDropDownByDictTypeCode(dictTypeCode, id, dataTxt, dataVal) {
    $('#'+id).select2({
        minimumResultsForSearch: -1,
        placeholder: '未选择',
        dropdownAutoWidth: true,
        language: {
            searching: function() {
                return '加载中...';
            },
            loadingMore: function() {
                return '加载中...';
            }
        },
        ajax: {
            url: $.api.baseAdmin+"/api/dict/findAllByDictTypeCode/"+dictTypeCode,
            type: 'GET',
            dataType: 'json',
            delay: 250,
            beforeSend: function(request) {
                request.setRequestHeader("Login", $.cookie('login'));
                request.setRequestHeader("Authorization", $.cookie('authorization'));
                request.setRequestHeader("Lang", $.cookie('lang'));
                request.setRequestHeader("Source", "onlineleasing");
            },
            data: function (params) {         
                return {
                    search: params.term
                }
            },
            processResults: function (data,params) {
                if(data['code'] === 'C0') {
                    var jsonData = data['data'].dictDataList;
                    var data;
                    return {
                        results: $.map(jsonData, function(item) {
                            var index = $.inArray($.api.dictContractType,item.dictInfo.split(',').map(Number));
                            if(index >= 0){
                                data = {
                                    id: item.dictCode,
                                    text: item.dictName
                                }
                                var returnData = [];
                                returnData.push(data);
                                return returnData;
                            }
                        })
                    }
                } else {
                    alertMsg(data['code'],data['customerMessage']);
                }
            },
            cache: true
        }
    })

    var newOption = new Option(dataTxt, dataVal, true, true);
    $('#'+id).append(newOption).trigger('change');
}

function updateSelectTenantDropDown(data_count) {
    var selectTenant = $('#selectTenant');
    if(data_count == 51){
        selectTenant = $('#createContractSelectTenant');
    }
    
    selectTenant.select2({
        placeholder: '未选择',
        dropdownAutoWidth: true,
        language: {
            searching: function() {
                return '加载中...';
            },
            loadingMore: function() {
                return '加载中...';
            }
        },
        ajax: {
            url: function (params) {
                return $.api.baseLotus+"/api/tenant/lotus/findAllByFreeCondition?page="+(params.page || 0)+"&size="+data_count+"&sort=id,asc";
            },
            type: "POST",
            async: false,
            dataType: "json",
            contentType: "application/json",
            delay: 250,
            beforeSend: function(request) {
                request.setRequestHeader("Login", $.cookie('login'));
                request.setRequestHeader("Authorization", $.cookie('authorization'));
                request.setRequestHeader("Lang", $.cookie('lang'));
                request.setRequestHeader("Source", "onlineleasing");
            },
            data: function (params) {
                var map = {
                    key: params.term || 'LTTENANT',
                    operator: "OR",
                    params: [
                      "tenantCode", "code", "name"
                    ],
                    sorts: []
                }
                return JSON.stringify(map);
            },
            processResults: function (data,params) {
                if(data['code'] === 'C0') {
                    var jsonData = data['data'].content;
                    params.page = params.page || 0;
                    var data;
                    return {
                        results: $.map(jsonData, function(item) {
                            data = {
                                id: item.code,
                                text: item.tenantCode +' | '+ item.name
                            }
                            var returnData = [];
                            returnData.push(data);
                            return returnData;
                        }),
                        pagination: {
                            "more": data_count <= jsonData.length
                        }
                    }
                } else {
                    alertMsg(data['code'],data['customerMessage']);
                }
            },
            cache: true
        }
    });
}

function updateBrandNameDropDown(data_count) {
    var brandName = $('#brandName');
    if(data_count == 21){
        brandName = $('#createContractBrandName');
    }
    
    brandName.select2({
        placeholder: '未选择',
        dropdownAutoWidth: true,
        language: {
            searching: function() {
                return '加载中...';
            },
            loadingMore: function() {
                return '加载中...';
            }
        },
        ajax: {
            url: function (params) {
                return $.api.baseLotus+"/api/brand/lotus/findAllByFreeCondition?page="+(params.page || 0)+"&size="+data_count+"&sort=id,asc";
            },
            type: "POST",
            async: false,
            dataType: "json",
            contentType: "application/json",
            delay: 250,
            beforeSend: function(request) {
                request.setRequestHeader("Login", $.cookie('login'));
                request.setRequestHeader("Authorization", $.cookie('authorization'));
                request.setRequestHeader("Lang", $.cookie('lang'));
                request.setRequestHeader("Source", "onlineleasing");
            },
            data: function (params) {
                var map = {
                    key: params.term || '1',
                    operator: "OR",
                    params: [
                      "name","status"
                    ],
                    sorts: []
                }
                return JSON.stringify(map);
            },
            processResults: function (data,params) {
                if(data['code'] === 'C0') {
                    var jsonData = data['data'].content;
                    params.page = params.page || 0;
                    var data;
                    return {
                        results: $.map(jsonData, function(item) {
                            data = {
                                id: item.code,
                                text: item.name +'['+ item.modality3 +']'                        
                            }
                            var returnData = [];
                            returnData.push(data);
                            return returnData;
                        }),
                        pagination: {
                            "more": data_count <= jsonData.length
                        }
                    }
                } else {
                    alertMsg(data['code'],data['customerMessage']);
                }
            },
            cache: true
        }
    });
}

function updateSelectStoreDropDownByMallCode(data_count,mall_code) {
    var selectStore = $('#selectStore');
    if(data_count == 21){
        selectStore = $('#createContractStore');
    }
    
    selectStore.select2({
        placeholder: '未选择',
        dropdownAutoWidth: true,
        language: {
            searching: function() {
                return '加载中...';
            },
            loadingMore: function() {
                return '加载中...';
            }
        },
        ajax: {
            url: function (params) {
                return $.api.baseLotus+"/api/vshop/lotus/findAllByKVCondition?page="+(params.page || 0)+"&size="+data_count+"&sort=id,asc";
            },
            type: "POST",
            async: false,
            dataType: "json",
            contentType: "application/json",
            delay: 250,
            beforeSend: function(request) {
                request.setRequestHeader("Login", $.cookie('login'));
                request.setRequestHeader("Authorization", $.cookie('authorization'));
                request.setRequestHeader("Lang", $.cookie('lang'));
                request.setRequestHeader("Source", "onlineleasing");
            },
            data: function (params) {
                var term = params.term;
                var mallCodes = mall_code;
                var mallCode = mallCodes;
                $.each(JSON.parse($.cookie('userModules')), function(i,v) {
                    if((v.roleCode == 'CROLE211008000002' || v.roleCode == 'CROLE220922000001') && v.moduleCode == 'ALL'){
                        mallCodes = 'ALL';
                        return false;
                    }
                })
                
                var params = [];
                var conditionGroups = [];
                var conditionGroup = {};
                
                params = [
                    {
                      "columnName": "mallCodes",
                      "columnPatten": "",
                      "conditionOperator": "AND",
                      "operator": "=",
                      "value": mallCodes
                    },
                    {
                      "columnName": "mallCode",
                      "columnPatten": "",
                      "conditionOperator": "AND",
                      "operator": "=",
                      "value": mallCode
                    },
                    {
                      "columnName": "userCode",
                      "columnPatten": "",
                      "conditionOperator": "AND",
                      "operator": "=",
                      "value": $.cookie('uid')
                    }
                ]
                
                if($('#unitType').length > 0 && $('#unitType').val() != '') {
                    params.push({
                        "columnName": "unitType",
                        "columnPatten": "",
                        "conditionOperator": "AND",
                        "operator": "=",
                        "value": $('#unitType').val()
                    });
                }

                conditionGroup = {
                    "conditionOperator": "AND",
                    "params": params
                }

                conditionGroups.push(conditionGroup);
                
                
                
                if(term != undefined && term != '') {
                    conditionGroups.push({
                        "conditionOperator": "OR",
                        "params": [{
                                "columnName": "unitName",
                                "columnPatten": "",
                                "conditionOperator": "AND",
                                "operator": "LIKE",
                                "value": term
                            }
                        ]
                    },{
                        "conditionOperator": "OR",
                        "params": [{
                                "columnName": "unitCode",
                                "columnPatten": "",
                                "conditionOperator": "AND",
                                "operator": "LIKE",
                                "value": term
                            }
                        ]
                    });
                }
                
                var map = {
                    "conditionGroups": conditionGroups,
                    "params": []
                }
    
                return JSON.stringify(map);
            },
            processResults: function (data,params) {
                if(data['code'] === 'C0') {
                    var jsonData = data['data'].content;
                    params.page = params.page || 0;
                    var data;
                    return {
                        results: $.map(jsonData, function(item) {
                            data = {
                                id: item.unitCode+':::'+item.code+':::'+item.unitName+':::'+item.floorName+':::'+item.floorCode,
                                text: item.unitName +'['+ item.unitCode +'] | '+ item.unitArea + '㎡'                            
                            }
                            var returnData = [];
                            returnData.push(data);
                            return returnData;
                        }),
                        pagination: {
                            "more": data_count <= jsonData.length
                        }
                    }
                } else {
                    alertMsg(data['code'],data['customerMessage']);
                }
            },
            cache: true
        }
    });
}

function updateOldSelectStoreDropDownByMallCode(data_count,mall_code) {
    $('#oldSelectStore').select2({
        placeholder: '未选择',
        dropdownAutoWidth: true,
        allowClear: true,
        language: {
            searching: function() {
                return '加载中...';
            },
            loadingMore: function() {
                return '加载中...';
            }
        },
        ajax: {
            url: function (params) {
                return $.api.baseLotus+"/api/vshop/lotus/findAllByKVCondition?page="+(params.page || 0)+"&size="+data_count+"&sort=id,asc";
            },
            type: "POST",
            async: false,
            dataType: "json",
            contentType: "application/json",
            delay: 250,
            beforeSend: function(request) {
                request.setRequestHeader("Login", $.cookie('login'));
                request.setRequestHeader("Authorization", $.cookie('authorization'));
                request.setRequestHeader("Lang", $.cookie('lang'));
                request.setRequestHeader("Source", "onlineleasing");
            },
            data: function (params) {
                var term = params.term;
                var mallCodes = mall_code;
                var mallCode = mallCodes;
                $.each(JSON.parse($.cookie('userModules')), function(i,v) {
                    if((v.roleCode == 'CROLE211008000002' || v.roleCode == 'CROLE220922000001') && v.moduleCode == 'ALL'){
                        mallCodes = 'ALL';
                        return false;
                    }
                })
                
                var params = [];
                var conditionGroups = [];
                var conditionGroup = {};

                conditionGroup = {
                    "conditionOperator": "AND",
                    "params": [
                      {
                        "columnName": "mallCodes",
                        "columnPatten": "",
                        "conditionOperator": "AND",
                        "operator": "=",
                        "value": mallCodes
                      },
                      {
                        "columnName": "mallCode",
                        "columnPatten": "",
                        "conditionOperator": "AND",
                        "operator": "=",
                        "value": mallCode
                      },
                      {
                        "columnName": "userCode",
                        "columnPatten": "",
                        "conditionOperator": "AND",
                        "operator": "=",
                        "value": $.cookie('uid')
                      }
                    ]
                }

                conditionGroups.push(conditionGroup);
                
                if(term != undefined && term != '') {
                    conditionGroups.push({
                        "conditionOperator": "OR",
                        "params": [{
                                "columnName": "unitName",
                                "columnPatten": "",
                                "conditionOperator": "AND",
                                "operator": "LIKE",
                                "value": term
                            }
                        ]
                    },{
                        "conditionOperator": "OR",
                        "params": [{
                                "columnName": "unitCode",
                                "columnPatten": "",
                                "conditionOperator": "AND",
                                "operator": "LIKE",
                                "value": term
                            }
                        ]
                    });
                }
                
                var map = {
                    "conditionGroups": conditionGroups,
                    "params": params
                }
    
                return JSON.stringify(map);
            },
            processResults: function (data,params) {
                if(data['code'] === 'C0') {
                    var jsonData = data['data'].content;
                    params.page = params.page || 0;
                    var data;
                    return {
                        results: $.map(jsonData, function(item) {
                            data = {
                                id: item.unitCode+':::'+item.code+':::'+item.unitName+':::'+item.modality+':::'+ item.unitArea,
                                text: item.unitName +'['+ item.unitCode +']'                          
                            }
                            var returnData = [];
                            returnData.push(data);
                            return returnData;
                        }),
                        pagination: {
                            "more": data_count <= jsonData.length
                        }
                    }
                } else {
                    alertMsg(data['code'],data['customerMessage']);
                }
            },
            cache: true
        }
    });
}

function updateSelectMallDropDown() {
    if(sessionStorage.getItem("lotus_malls") && sessionStorage.getItem("lotus_malls") != null && sessionStorage.getItem("lotus_malls") != '') {
        var malls = $.parseJSON(sessionStorage.getItem("lotus_malls"));
        var returnData = [];
        var data = $.map(malls, function(item) {
            if($.cookie('userModules') && $.cookie('userModules') != '' && $.cookie('userModules') != null){
                $.each(JSON.parse($.cookie('userModules')), function(j,w) {
                    if((w.roleCode == 'CROLE211008000002' || w.roleCode == 'CROLE220922000001') && w.moduleCode == 'ALL'){
                        data = {
                            id: item.code,
                            text: item.mallName +'['+ item.code +']'                            
                        }
                        returnData.push(data);
                    } else if(w.roleCode == 'CROLE211008000001' && w.moduleName == '门店对接人') {
                        if(item.code == w.moduleCode){
                            data = {
                                id: item.code,
                                text: item.mallName +'['+ item.code +']'                            
                            }
                            returnData.push(data);
                        }
                    }
                })
            }
                
            return returnData;
        });
        
        $('.mallCode').select2({
            placeholder: '未选择',
            dropdownAutoWidth: true,
            language: {
                searching: function() {
                    return '加载中...';
                },
                loadingMore: function() {
                    return '加载中...';
                }
            },
            data: returnData,
            pagination: {
                "more": 10 <= returnData.length
            }
        });
    }
}

function findFloorDropDownByMallCode(mall_code) {
    $.ajax({
        url: $.api.baseLotus+"/api/floor/lotus/findAllByMallCode?mallCode="+mall_code,
        type: "GET",
        async: false,
        beforeSend: function(request) {
            request.setRequestHeader("Login", $.cookie('login'));
            request.setRequestHeader("Authorization", $.cookie('authorization'));
            request.setRequestHeader("Lang", $.cookie('lang'));
            request.setRequestHeader("Source", "onlineleasing");
        },
        success: function (response, status, xhr) {
            if(response.code === 'C0') {
                if(xhr.getResponseHeader("Login") !== null){
                    $.cookie('login', xhr.getResponseHeader("Login"));
                }
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                }
                
                if(response.data.length > 0){
                    $('#selectFloor').html('<option value="">未选择</option>');
                    $.each(response.data, function(i,v) {
                        $('#selectFloor').append('<option value="'+v.code+'">'+v.floorName+'</option>');
                    })
                }
            } else {
                alertMsg(response.code,response.customerMessage);
            }                               
        }
    });
}

function updateUserDropDown(data_count) {
    $('.selectUser').select2({
        placeholder: '未选择',
        dropdownAutoWidth: true,
        allowClear: true,
        language: {
            searching: function() {
                return '加载中...';
            },
            loadingMore: function() {
                return '加载中...';
            }
        },
        ajax: {
            url: $.api.baseAuth+"/api/user/findAll",
            type: 'GET',
            dataType: 'json',
            delay: 250,
            beforeSend: function(request) {
                request.setRequestHeader("Login", $.cookie('login'));
                request.setRequestHeader("Authorization", $.cookie('authorization'));
                request.setRequestHeader("Lang", $.cookie('lang'));
                request.setRequestHeader("Source", "onlineleasing");
            },
            data: function (params) {
                return {
                    page: params.page || 0,
                    size: data_count,
                    sort: 'id,desc',
                    search: params.term
                }
            },
            processResults: function (data,params) {
                if(data['code'] === 'C0') {
                    var jsonData = data['data'].content;
                    params.page = params.page || 0;
                    var data;
                    return {
                        results: $.map(jsonData.reverse(), function(item) {
                            data = {
                                id: item.settings.name,
                                text: item.settings.name                          
                            }
                            var returnData = [];
                            returnData.push(data);
                            return returnData;
                        }),
                        pagination: {
                            "more": data_count <= jsonData.length
                        }
                    }
                } else {
                    alertMsg(data['code'],data['customerMessage']);
                }
            },
            cache: true
        }
    });
}

function findRoleYZJByParentId() {
    $.ajax({
        url: $.api.baseCommYZJ+"/api/role/yzj/findAllByParentId/?parentId=69bcb693-92c4-11ec-8a77-ecf4bbea1498",
        type: "GET",
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
                if(xhr.getResponseHeader("Login") !== null){
                    $.cookie('login', xhr.getResponseHeader("Login"));
                }
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                }
                
                if(response.data.length > 0){
                    sessionStorage.setItem("roleYZJ", JSON.stringify(response.data));
                    updateRoleYZJLabel();
                }
            } else {
                alertMsg(response.code,response.customerMessage);
            }
        }
    })
}

function updateRoleYZJLabel() {
    $.each($.parseJSON(sessionStorage.getItem('roleYZJ')), function(i,v){
        $('#'+v.roleId).find('label').prepend(v.roleName);
        if(v.roleId != 'Lotus_leasing_head'){
            updateUserRoleYZJDropDownByRoleId(v.roleId);
        }
    })
}

function findUserRoleYZJByKVCondition(mc){
    var conditionGroups = [];
    conditionGroups.push({
        "conditionOperator": "OR",
        "params": [{
                "columnName": "mallCode",
                "columnPatten": "",
                "conditionOperator": "AND",
                "operator": "=",
                "value": mc
            }
        ]
    },{
        "conditionOperator": "OR",
        "params": [{
                "columnName": "roleId",
                "columnPatten": "",
                "conditionOperator": "AND",
                "operator": "in",
                "value": "bizApprove;hqFinanceApprove;hqLegalApprove;hqCeoApprove"
            }
        ]
    });

    var map = {
        "conditionGroups": conditionGroups,
        "params": []
    }
    
    $.ajax({
        url: $.api.baseCommYZJ+"/api/vUserRole/yzj/findAllByKVCondition?page=0&size=100&sort=id,desc",
        type: "POST",
        data: JSON.stringify(map),
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
        success: function (response, status, xhr) {
            $('#loader').hide();
            if(response.code === 'C0') {
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                }
                
                if(response.data.content.length > 0){
                    $.each(response.data.content, function(i,v){
                        $('#'+v.roleId).find('label').find('b').text(v.roleName);
                        updateUserRoleYZJDropDownByRoleId(v.roleId);
                        var pathname = window.location.pathname;
                        if(v.mallCode != null && v.mallCode != '' && (pathname.indexOf('make-request') != -1 || pathname.indexOf('renew-request') != -1 || pathname.indexOf('terminate-request') != -1 || pathname.indexOf('modify-request') != -1)){
                            var newOption = new Option(v.name, v.openId, true, true);
                            $('#'+v.roleId+' select').append(newOption).trigger('change');
                        }
                    })
                }
            } else {
                alertMsg(response.code,response.customerMessage);
            } 
        }
    });
}

function findProcessInstByBizId(){
    $.ajax({
        url: $.api.baseCommYZJ+"/api/process/inst/form/findAllByBizId?bizId="+getURLParameter('id'),
        type: "GET",
        async: false,
        dataType: "json",
        contentType: "application/json",
        beforeSend: function(request) {
            request.setRequestHeader("Login", $.cookie('login'));
            request.setRequestHeader("Authorization", $.cookie('authorization'));
            request.setRequestHeader("Lang", $.cookie('lang'));
            request.setRequestHeader("Source", "onlineleasing");
        },
        success: function (response, status, xhr) {
            if(response.code === 'C0') {
                if(xhr.getResponseHeader("Login") !== null){
                    $.cookie('login', xhr.getResponseHeader("Login"));
                }
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                }
                
                if(response.data != '' && response.data != null){
                    if(response.data.processInstStatus != null){
                        $('#flowStatus').html('(<span class="txt">流程'+renderFlowStatus(response.data.processInstStatus)+'</span>)');
                    }
                    $('#approvalProcess').html('');
                    if(response.data.processStepRecordList != '' && response.data.processStepRecordList != null && response.data.processStepRecordList.length > 0){
                        var index = 0;
                        $.each(response.data.processStepRecordList, function(i,v) {
                            if((i != 0 && v.status != null && v.status != 'WITHDRAW') || v.activityType == 'END'){
                                index++;
                                $('#approvalProcess').append('<tr><td>'+index+'</td>\n\
                                <td>'+v.activityName+'</td>\n\
                                <td>'+(v.approveName || '')+'</td>\n\
                                <td>'+(v.status != null ? renderFlowSteps(v.status) : '')+'</td>\n\
                                <td>'+(v.opinion || '')+'</td>\n\
                                <td>'+(v.createTime || '')+'</td>\n\
                                <td>'+(v.handleTime || '')+'</td></tr>');
                            }
                        })
                        $('#investmentContractApprovalProcess').show();
                    }
                }
            } else {
                alertMsg(response.code,response.customerMessage);
            }                            
        }
    }); 
}
        
function updateUserRoleYZJDropDownByRoleId(id) {
    $('#'+id).find('select').select2({
        placeholder: '未选择',
        dropdownAutoWidth: true,
        allowClear: true,
        language: {
            searching: function() {
                return '加载中...';
            },
            loadingMore: function() {
                return '加载中...';
            }
        },
        ajax: {
            url: $.api.baseCommYZJ+"/api/user/role/yzj/findAllByRoleId",
            type: 'GET',
            dataType: 'json',
            delay: 250,
            beforeSend: function(request) {
                request.setRequestHeader("Login", $.cookie('login'));
                request.setRequestHeader("Authorization", $.cookie('authorization'));
                request.setRequestHeader("Lang", $.cookie('lang'));
                request.setRequestHeader("Source", "onlineleasing");
            },
            data: function (params) {         
                return {
                    search: params.term,
                    roleId: id
                }
            },
            processResults: function (data,params) {
                if(data['code'] === 'C0') {
                    var jsonData = data['data'];
                    var data;
                    return {
                        results: $.map(jsonData, function(item) {
                            if(item.state == 1){
                                data = {
                                    id: item.openId,
                                    text: item.name
                                }

                                var returnData = [];
                                returnData.push(data);
                                return returnData;
                            }
                        })
                    }
                } else {
                    alertMsg(data['code'],data['customerMessage']);
                }
            },
            cache: true
        }
    })
}

function calBackPushFixedRentSingleRow(num) {
    if(numberWithoutCommas($('#fixedRentTaxRentAmount_'+num).val()) >= 0 && numberWithoutCommas($('#area').val()) > 0){
        if($('#termCalcMode').val() != 'OLD'){
            var taxAmount = Math.round(numberWithoutCommas($('#fixedRentTaxRentAmount_'+num).val()) * $('#area').val() * 365 / 12 * 100) / 100; //月金额(去税)
            var amount = Math.round(taxAmount * (1 + parseFloat($('#fixedRentTaxRate_'+num).val())) * 100) / 100; //月金额(含税)
            var rentAmount = Math.round(amount * 12 / 365 / $('#area').val() * 100) / 100; //单价(含税)    
        } else {
            var taxAmount = Math.round(numberWithoutCommas($('#fixedRentTaxRentAmount_'+num).val()) * $('#area').val() * 30 * 100) / 100; //月金额(去税)
            var amount = Math.round(taxAmount * (1 + parseFloat($('#fixedRentTaxRate_'+num).val())) * 100) / 100; //月金额(含税)
            var rentAmount = Math.round(amount / 30 / $('#area').val() * 100) / 100; //单价(含税) 
        }
        $('#fixedRentTaxAmount_'+num).val(accounting.formatNumber(taxAmount)).fadeOut().fadeIn(); //月金额(去税)
        $('#fixedRentAmount_'+num).val(accounting.formatNumber(amount)).fadeOut().fadeIn(); //月金额(含税)
        $('#fixedRentRentAmount_'+num).val(accounting.formatNumber(rentAmount)).fadeOut().fadeIn(); //单价(含税)
    }
    calBackPush('fixedRent');
}

function calBackPushFixedRentTaxRentAmount() { //单价(去税)
    $("input[id*='fixedRentTaxRentAmount_']").not('.past').each(function(i){  
        if(numberWithoutCommas($(this).val()) >= 0 && numberWithoutCommas($('#area').val()) > 0){
            var num = $(this).attr('id').split('_')[1];
            if($('#termCalcMode').val() != 'OLD'){
                var taxAmount = Math.round(numberWithoutCommas($(this).val()) * $('#area').val() * 365 / 12 * 100) / 100; //月金额(去税)
                var amount = Math.round(taxAmount * (1 + parseFloat($('#fixedRentTaxRate_'+num).val())) * 100) / 100; //月金额(含税)
                var rentAmount = Math.round(amount * 12 / 365 / $('#area').val() * 100) / 100; //单价(含税)
            } else {
                var taxAmount = Math.round(numberWithoutCommas($(this).val()) * $('#area').val() * 30 * 100) / 100; //月金额(去税)
                var amount = Math.round(taxAmount * (1 + parseFloat($('#fixedRentTaxRate_'+num).val())) * 100) / 100; //月金额(含税)
                var rentAmount = Math.round(amount / 30 / $('#area').val() * 100) / 100; //单价(含税)
            }
            $('#fixedRentTaxAmount_'+num).val(accounting.formatNumber(taxAmount)).fadeOut().fadeIn(); //月金额(去税)
            $('#fixedRentAmount_'+num).val(accounting.formatNumber(amount)).fadeOut().fadeIn(); //月金额(含税)
            $('#fixedRentRentAmount_'+num).val(accounting.formatNumber(rentAmount)).fadeOut().fadeIn(); //单价(含税)
        }
    });
    calBackPush('fixedRent');
}

function calBackPushFixedRentTaxAmount() { //月金额(去税)
    $("input[id*='fixedRentTaxAmount_']").not('.past').each(function(i){  
        if(numberWithoutCommas($(this).val()) >= 0 && numberWithoutCommas($('#area').val()) > 0){
            var num = $(this).attr('id').split('_')[1];
            if($('#termCalcMode').val() != 'OLD'){
                var taxRentAmount = Math.round(numberWithoutCommas($(this).val()) * 12 / 365 / $('#area').val() * 100) / 100; //单价(去税)
                var amount = Math.round(numberWithoutCommas($(this).val()) * (1 + parseFloat($('#fixedRentTaxRate_'+num).val())) * 100) / 100; //月金额(含税)
                var rentAmount = Math.round(amount * 12 / 365 / $('#area').val() * 100) / 100; //单价(含税)
            } else {
                var taxRentAmount = Math.round(numberWithoutCommas($(this).val()) / 30 / $('#area').val() * 100) / 100; //单价(去税)
                var amount = Math.round(numberWithoutCommas($(this).val()) * (1 + parseFloat($('#fixedRentTaxRate_'+num).val())) * 100) / 100; //月金额(含税)
                var rentAmount = Math.round(amount / 30 / $('#area').val() * 100) / 100; //单价(含税)
            }
            $('#fixedRentTaxRentAmount_'+num).val(accounting.formatNumber(taxRentAmount)).fadeOut().fadeIn(); //单价(去税)
            $('#fixedRentAmount_'+num).val(accounting.formatNumber(amount)).fadeOut().fadeIn(); //月金额(含税)
            $('#fixedRentRentAmount_'+num).val(accounting.formatNumber(rentAmount)).fadeOut().fadeIn(); //单价(含税)
        }
    });
    calBackPush('fixedRent');
}

function calBackPushFixedRentAmount() { //月金额(含税)
    $("input[id*='fixedRentAmount_']").not('.past').each(function(i){  
        if(numberWithoutCommas($(this).val()) >= 0 && numberWithoutCommas($('#area').val()) > 0){
            var num = $(this).attr('id').split('_')[1];
            if($('#termCalcMode').val() != 'OLD'){
                var taxAmount = Math.round(numberWithoutCommas($(this).val()) / (1 + parseFloat($('#fixedRentTaxRate_'+num).val())) * 100) / 100; //月金额(去税)
                var rentAmount = Math.round(numberWithoutCommas($(this).val()) * 12 / 365 / $('#area').val() * 100) / 100; //单价(含税)
                var taxRentAmount = Math.round(taxAmount * 12 / 365 / $('#area').val() * 100) / 100; //单价(去税)
            } else {
                var taxAmount = Math.round(numberWithoutCommas($(this).val()) / (1 + parseFloat($('#fixedRentTaxRate_'+num).val())) * 100) / 100; //月金额(去税)
                var rentAmount = Math.round(numberWithoutCommas($(this).val()) / 30 / $('#area').val() * 100) / 100; //单价(含税)
                var taxRentAmount = Math.round(taxAmount / 30 / $('#area').val() * 100) / 100; //单价(去税)    
            }
            $('#fixedRentTaxAmount_'+num).val(accounting.formatNumber(taxAmount)).fadeOut().fadeIn(); //月金额(去税)
            $('#fixedRentRentAmount_'+num).val(accounting.formatNumber(rentAmount)).fadeOut().fadeIn(); //单价(含税)
            $('#fixedRentTaxRentAmount_'+num).val(accounting.formatNumber(taxRentAmount)).fadeOut().fadeIn(); //单价(去税)
        }
    });
    calBackPush('fixedRent');
}

function calBackPushFixedRentRentAmount() { //单价(含税)
    $("input[id*='fixedRentRentAmount_']").not('.past').each(function(i){
        if(numberWithoutCommas($(this).val()) >= 0 && numberWithoutCommas($('#area').val()) > 0){
            var num = $(this).attr('id').split('_')[1];
            if($('#termCalcMode').val() != 'OLD'){
                var amount = Math.round(numberWithoutCommas($(this).val()) * $('#area').val() * 365 / 12 * 100) / 100; //月金额(含税)
                var taxAmount = Math.round(amount / (1 + parseFloat($('#fixedRentTaxRate_'+num).val())) * 100) / 100; //月金额(去税)
                var taxRentAmount = Math.round(taxAmount * 12 / 365 / $('#area').val() * 100) / 100; //单价(去税)
            } else {
                var amount = Math.round(numberWithoutCommas($(this).val()) * $('#area').val() * 30 * 100) / 100; //月金额(含税)
                var taxAmount = Math.round(amount / (1 + parseFloat($('#fixedRentTaxRate_'+num).val())) * 100) / 100; //月金额(去税)
                var taxRentAmount = Math.round(taxAmount / 30 / $('#area').val() * 100) / 100; //单价(去税)
            }
            $('#fixedRentAmount_'+num).val(accounting.formatNumber(amount)).fadeOut().fadeIn(); //月金额(含税)
            $('#fixedRentTaxAmount_'+num).val(accounting.formatNumber(taxAmount)).fadeOut().fadeIn(); //月金额(去税)
            $('#fixedRentTaxRentAmount_'+num).val(accounting.formatNumber(taxRentAmount)).fadeOut().fadeIn(); //单价(去税)
        }
    });
    calBackPush('fixedRent');
}

function calBackPushNextCalendar(Exid){
    $("input[id*='"+Exid+"EndDate_']").each(function(i){  
        var num0 = $(this).attr('id').split('_')[1];
        var num = parseInt(num0) + 1;
        var tmp = $(this).val();
        if($('#'+Exid+'StartDate_'+num).length > 0){
            $('#'+Exid+'StartDate_'+num).datepicker('update', IncrDate(tmp));
        } else {
            if($('#'+Exid+'EndDate_'+num0).val() == '' && $('#'+Exid+'StartDate_'+num0).val() != ''){
                $('#'+Exid+'EndDate_'+num0).datepicker('update', $('#endDate').val());
            }
        }
    })
}

function calBackPushCommissionSingleRow(num){
    if(numberWithoutCommas($('#commissionTaxDeduct_'+num).val()) >= 0){
        var taxDeduct = Math.round(numberWithoutCommas($('#commissionTaxDeduct_'+num).val()) * (1 + parseFloat($('#commissionTaxRate_'+num).val())) * 100) / 100;
        $('#commissionDeduct_'+num).val(accounting.formatNumber(taxDeduct)).fadeOut().fadeIn();
    }
    calBackPush('commission');
}

function calBackPushCommissionDeduct(){
    $("input[id*='commissionTaxDeduct_']").not('.past').each(function(i){
        if(numberWithoutCommas($(this).val()) >= 0){
            var num = $(this).attr('id').split('_')[1];
            var taxDeduct = Math.round(numberWithoutCommas($(this).val()) * (1 + parseFloat($('#commissionTaxRate_'+num).val())) * 100) / 100;
            $('#commissionDeduct_'+num).val(accounting.formatNumber(taxDeduct)).fadeOut().fadeIn();
        }
    });
    calBackPush('commission');
}

function calBackPushCommissionTaxDeduct(){
    $("input[id*='commissionDeduct_']").not('.past').each(function(i){
        if(numberWithoutCommas($(this).val()) >= 0){
            var num = $(this).attr('id').split('_')[1];
            var deduct = Math.round(numberWithoutCommas($(this).val()) / (1 + parseFloat($('#commissionTaxRate_'+num).val())) * 100) / 100;
            $('#commissionTaxDeduct_'+num).val(accounting.formatNumber(deduct)).fadeOut().fadeIn();
        }
    });
    calBackPush('commission');
}

function calBackPushPropertyMgmtSingleRow(num) {
    if(numberWithoutCommas($('#propertyMgmtTaxRentAmount_'+num).val()) >= 0 && numberWithoutCommas($('#area').val()) > 0){
        //月金额(去税)
        var taxAmount = Math.round(numberWithoutCommas($('#propertyMgmtTaxRentAmount_'+num).val()) * $('#area').val() * 100) / 100;
        $('#propertyMgmtTaxAmount_'+num).val(accounting.formatNumber(taxAmount)).fadeOut().fadeIn();
        //月金额(含税)
        var amount = Math.round(taxAmount * (1 + parseFloat($('#propertyMgmtTaxRate_'+num).val())) * 100) / 100;
        $('#propertyMgmtAmount_'+num).val(accounting.formatNumber(amount)).fadeOut().fadeIn();
        //单价(含税)
        var rentAmount = Math.round(amount / $('#area').val() * 100) / 100;
        $('#propertyMgmtRentAmount_'+num).val(accounting.formatNumber(rentAmount)).fadeOut().fadeIn();
    }
    calBackPush('propertyMgmt');
}

function calBackPushPropertyMgmtTaxRentAmount() { //月面积单价(去税)
    $("input[id*='propertyMgmtTaxRentAmount_']").not('.past').each(function(i){  
        if(numberWithoutCommas($(this).val()) >= 0 && numberWithoutCommas($('#area').val()) > 0){
            var num = $(this).attr('id').split('_')[1];
            //月金额(去税)
            var taxAmount = Math.round(numberWithoutCommas($(this).val()) * $('#area').val() * 100) / 100;
            $('#propertyMgmtTaxAmount_'+num).val(accounting.formatNumber(taxAmount)).fadeOut().fadeIn();
            //月金额(含税)
            var amount = Math.round(taxAmount * (1 + parseFloat($('#propertyMgmtTaxRate_'+num).val())) * 100) / 100;
            $('#propertyMgmtAmount_'+num).val(accounting.formatNumber(amount)).fadeOut().fadeIn();
            //月面积单价(含税)
            var rentAmount = Math.round(amount / $('#area').val() * 100) / 100;
            $('#propertyMgmtRentAmount_'+num).val(accounting.formatNumber(rentAmount)).fadeOut().fadeIn();
        }
    });
    calBackPush('propertyMgmt');
}

function calBackPushPropertyMgmtTaxAmount() { //月金额(去税)
    $("input[id*='propertyMgmtTaxAmount_']").not('.past').each(function(i){  
        if(numberWithoutCommas($(this).val()) >= 0 && numberWithoutCommas($('#area').val()) > 0){
            var num = $(this).attr('id').split('_')[1];
            //月面积单价(去税)
            var taxRentAmount = Math.round(numberWithoutCommas($(this).val()) / $('#area').val() * 100) / 100;
            $('#propertyMgmtTaxRentAmount_'+num).val(accounting.formatNumber(taxRentAmount)).fadeOut().fadeIn();
            //月金额(含税)
            var amount = Math.round(numberWithoutCommas($(this).val()) * (1 + parseFloat($('#propertyMgmtTaxRate_'+num).val())) * 100) / 100;
            $('#propertyMgmtAmount_'+num).val(accounting.formatNumber(amount)).fadeOut().fadeIn();
            //月面积单价(含税)
            var rentAmount = Math.round(amount / $('#area').val() * 100) / 100;
            $('#propertyMgmtRentAmount_'+num).val(accounting.formatNumber(rentAmount)).fadeOut().fadeIn();
        }
    });
    calBackPush('propertyMgmt');
}

function calBackPushPropertyMgmtAmount() { //月金额(含税)
    $("input[id*='propertyMgmtAmount_']").not('.past').each(function(i){  
        if(numberWithoutCommas($(this).val()) >= 0 && numberWithoutCommas($('#area').val()) > 0){
            var num = $(this).attr('id').split('_')[1];
            //月金额(去税)
            var taxAmount = Math.round(numberWithoutCommas($(this).val()) / (1 + parseFloat($('#propertyMgmtTaxRate_'+num).val())) * 100) / 100;
            $('#propertyMgmtTaxAmount_'+num).val(accounting.formatNumber(taxAmount)).fadeOut().fadeIn();
            //月面积单价(含税)
            var rentAmount = Math.round(numberWithoutCommas($(this).val()) / $('#area').val() * 100) / 100;
            $('#propertyMgmtRentAmount_'+num).val(accounting.formatNumber(rentAmount)).fadeOut().fadeIn();
            //月面积单价(去税)
            var taxRentAmount = Math.round(taxAmount / $('#area').val() * 100) / 100;
            $('#propertyMgmtTaxRentAmount_'+num).val(accounting.formatNumber(taxRentAmount)).fadeOut().fadeIn();
        }
    });
    calBackPush('propertyMgmt');
}

function calBackPushPropertyMgmtRentAmount() { //月面积单价(含税)
    $("input[id*='propertyMgmtRentAmount_']").not('.past').each(function(i){  
        if(numberWithoutCommas($(this).val()) >= 0 && numberWithoutCommas($('#area').val()) > 0){
            var num = $(this).attr('id').split('_')[1];
            //月金额(含税)
            var amount = Math.round(numberWithoutCommas($(this).val()) * $('#area').val() * 100) / 100;
            $('#propertyMgmtAmount_'+num).val(accounting.formatNumber(amount)).fadeOut().fadeIn();
            //月金额(去税)
            var taxAmount = Math.round(amount / (1 + parseFloat($('#propertyMgmtTaxRate_'+num).val())) * 100) / 100;
            $('#propertyMgmtTaxAmount_'+num).val(accounting.formatNumber(taxAmount)).fadeOut().fadeIn();
            //月面积单价(去税)
            var taxRentAmount = Math.round(taxAmount / $('#area').val() * 100) / 100;
            $('#propertyMgmtTaxRentAmount_'+num).val(accounting.formatNumber(taxRentAmount)).fadeOut().fadeIn();
        }
    });
    calBackPush('propertyMgmt');
}

function calBackPushPropertyFeeYearSingleRow(num) {
    if(numberWithoutCommas($('#propertyFeeYearAmount_'+num).val()) >= 0){
        var taxAmount = Math.round(numberWithoutCommas($('#propertyFeeYearAmount_'+num).val()) / (1 + parseFloat($('#propertyFeeYearTaxRate_'+num).val())) * 100) / 100;
        $('#propertyFeeYearTaxAmount_'+num).val(accounting.formatNumber(taxAmount)).fadeOut().fadeIn();
    }
}

function calBackPushPropertyFeeYearTaxAmount() { //总金额(去税)
    $("input[id*='propertyFeeYearTaxAmount_']").not('.past').each(function(i){  
        if(numberWithoutCommas($(this).val()) >= 0 && numberWithoutCommas($('#area').val()) > 0){
            var num = $(this).attr('id').split('_')[1];
            //月金额(含税)
            var amount = Math.round(numberWithoutCommas($(this).val()) * (1 + parseFloat($('#propertyFeeYearTaxRate_'+num).val())) * 100) / 100;
            $('#propertyFeeYearAmount_'+num).val(accounting.formatNumber(amount)).fadeOut().fadeIn();
        }
    });
}

function calBackPushPropertyFeeYearAmount() { //总金额(含税)
    $("input[id*='propertyFeeYearAmount_']").not('.past').each(function(i){  
        if(numberWithoutCommas($(this).val()) >= 0 && numberWithoutCommas($('#area').val()) > 0){
            var num = $(this).attr('id').split('_')[1];
            //月金额(去税)
            var taxAmount = Math.round(numberWithoutCommas($(this).val()) / (1 + parseFloat($('#propertyFeeYearTaxRate_'+num).val())) * 100) / 100;
            $('#propertyFeeYearTaxAmount_'+num).val(accounting.formatNumber(taxAmount)).fadeOut().fadeIn();
        }
    });
}

function calBackPushPromotionSingleRow(num) {
    if(numberWithoutCommas($('#promotionAmount_'+num).val()) >= 0){
        var taxAmount = Math.round(numberWithoutCommas($('#promotionAmount_'+num).val()) / (1 + parseFloat($('#promotionTaxRate_'+num).val())) * 100) / 100;
        $('#promotionTaxAmount_'+num).val(accounting.formatNumber(taxAmount)).fadeOut().fadeIn();
    }
    calBackPush('promotion');
}

function calBackPushPromotionAmount() {
    $("input[id*='promotionAmount_']").not('.past').each(function(i){  
        if(numberWithoutCommas($(this).val()) >= 0){
            var num = $(this).attr('id').split('_')[1];
            var taxAmount = Math.round(numberWithoutCommas($(this).val()) / (1 + parseFloat($('#promotionTaxRate_'+num).val())) * 100) / 100;
            $('#promotionTaxAmount_'+num).val(accounting.formatNumber(taxAmount)).fadeOut().fadeIn();
        }
    });
    calBackPush('promotion');
}

function calBackPushPromotionDeduct(){
    $("input[id*='promotionDeduct_']").not('.past').each(function(i){  
        if(numberWithoutCommas($(this).val()) >= 0){
            var num = $(this).attr('id').split('_')[1];
            var deduct = Math.round(numberWithoutCommas($(this).val()) / (1 + parseFloat($('#promotionTaxRate_'+num).val())) * 100) / 100;
            $('#promotionTaxDeduct_'+num).val(accounting.formatNumber(deduct)).fadeOut().fadeIn();
        }
    });
    calBackPush('promotion');
}

function calBackPush(prefix){
    var path, cal;
    switch (prefix) {
        case "fixedRent":
            path = 'fixedRentCalc';
            cal = $('#'+prefix+'TotalRentAmount');
            break;
        case "propertyMgmt":
            path = 'propertyFeeCalc';
            cal = $('#'+prefix+'TotalPropertyAmount');
            break;
        case "commission":
            path = 'deductCalc';
            cal = $('#'+prefix+'TotalDeductAmount');
            break;
        case "promotion":
            path = 'promotionCalc';
            cal = $('#'+prefix+'TotalPromotionAmount');
            break;
        default:
            break;
    }
        
    if(cal.length > 0){
        var fixedRent = {};
        var fixedRentList = [];
        var propertyFee = {};
        var propertyFeeList = [];
        var deductFee = {};
        var deductList = [];
        var sales = {};
        var salesList = [];
        var promotionFee = {};
        var promotionFeeList = [];
        sessionStorage.setItem("rentCalcList",null);
        sessionStorage.setItem("propertyCalcList",null);
        sessionStorage.setItem("deductCalcList",null);
        sessionStorage.setItem("promotionCalcList",null);
        $("#"+prefix).find("tr").each(function(){
            var tdArr = $(this).children();
            var amount = tdArr.eq(5).find('input').val();
            var startDate = tdArr.eq(2).find("input[id*='"+prefix+"StartDate_']").val();
            var endDate = tdArr.eq(2).find("input[id*='"+prefix+"EndDate_']").val();
            var itemCode = tdArr.eq(1).find('select').val();
            var taxAmount = tdArr.eq(4).find('input').val();
            var taxRentAmount = tdArr.eq(3).find('input').val();
            if(path == 'fixedRentCalc'){
                var rentAmount = tdArr.eq(6).find('input').val();
                var taxCode = tdArr.eq(8).find('select option:selected').attr('data-code');
                var taxRate = tdArr.eq(8).find('select').val();
                if(amount != '' && startDate != '' && endDate != '' && itemCode != '' && rentAmount != '' && taxAmount != '' && taxCode != '' && taxRate != '' && taxRentAmount != ''){
                    fixedRent = {
                        "amount": numberWithoutCommas(amount),
                        "startDate": startDate,
                        "endDate":  endDate,
                        "itemCode": itemCode,
                        "rentAmount": numberWithoutCommas(rentAmount),
                        "taxAmount": numberWithoutCommas(taxAmount),
                        "taxCode": taxCode,
                        "taxRate": taxRate,
                        "taxRentAmount": numberWithoutCommas(taxRentAmount)
                    }
                    fixedRentList.push(fixedRent);
                }
            } else if(path == 'propertyFeeCalc'){
                var rentAmount = tdArr.eq(6).find('input').val();
                var taxCode = tdArr.eq(7).find('select option:selected').attr('data-code');
                var taxRate = tdArr.eq(7).find('select').val();
                if(amount != '' && startDate != '' && endDate != '' && itemCode != '' && rentAmount != '' && taxAmount != '' && taxCode != '' && taxRate != '' && taxRentAmount != ''){
                    propertyFee = {
                        "amount": numberWithoutCommas(amount),
                        "startDate": startDate,
                        "endDate":  endDate,
                        "itemCode": itemCode,
                        "rentAmount": numberWithoutCommas(rentAmount),
                        "taxAmount": numberWithoutCommas(taxAmount),
                        "taxCode": taxCode,
                        "taxRate": taxRate,
                        "taxRentAmount": numberWithoutCommas(taxRentAmount)
                    }
                    propertyFeeList.push(propertyFee);
                }
            } else if(path == 'deductCalc'){
                var deduct = tdArr.eq(6).find('input').val();
                var category = tdArr.eq(4).find('select').val();
                var deductType = tdArr.eq(3).find('select').val();
                var amount = tdArr.eq(7).find('input').val();
                var targetSales = tdArr.eq(8).find('input').val();
                var taxCode = tdArr.eq(10).find('select option:selected').attr('data-code');
                var taxRate = tdArr.eq(10).find('select').val();

                var commissionMinSalesAmount = tdArr.eq(9).find('input').val();
                if(deduct != '' && startDate != '' && endDate != '' && itemCode != '' && category != '' && deductType != '' && taxCode != '' && taxRate != '' && amount != '' && targetSales != ''){
                    deductFee = {
                        "taxDeduct": parseFloat(numberWithoutCommas(tdArr.eq(5).find('input').val())) / 100,
                        "startDate": startDate,
                        "endDate":  endDate,
                        "itemCode": itemCode,
                        "deduct": parseFloat(numberWithoutCommas(deduct)) / 100,
                        "category": category,
                        "taxCode": taxCode,
                        "taxRate": taxRate,
                        "deductType": deductType,
                        "amount": numberWithoutCommas(amount),
                        "targetSales": numberWithoutCommas(targetSales)
                    }
                    deductList.push(deductFee);

                    sales = {
                        "startDate": startDate,
                        "endDate":  endDate,
                        "amount": numberWithoutCommas(commissionMinSalesAmount)
                    }
                    salesList.push(sales);
                }
            } else if(path == 'promotionCalc'){
                var amount = tdArr.eq(3).find('input').val();
                var taxAmount = tdArr.eq(4).find('input').val();
                var taxCode = tdArr.eq(5).find('select option:selected').attr('data-code');
                var taxRate = tdArr.eq(5).find('select').val();
                if(startDate != '' && endDate != '' && itemCode != '' && taxCode != '' && taxRate != '' && amount != '' && taxAmount != ''){
                    promotionFee = {
                        "taxAmount": numberWithoutCommas(taxAmount),
                        "startDate": startDate,
                        "endDate":  endDate,
                        "itemCode": itemCode,
                        "taxCode": taxCode,
                        "taxRate": taxRate,
                        "amount": numberWithoutCommas(amount)
                    }
                    promotionFeeList.push(promotionFee);
                }
            }
        });

        if(fixedRentList.length > 0 || propertyFeeList.length > 0 || deductList.length > 0 || promotionFeeList.length > 0){
            var bizId = $('#bizId').val();
            var area = $('#area').val();
            var unitCode = '';
            var shopCode = '';
            if( $('#selectStore').val() && $('#selectStore').val() != ''){
                unitCode = $('#selectStore').val().split(':::')[0];
                shopCode = $('#selectStore').val().split(':::')[1];
            }
            var startDate = $('#startDate').val();
            var endDate = $('#endDate').val();
            var contractType = $('#contractType').val();
            var selectRentCalculationMode = $('#selectRentCalculationMode').val();
            var termCalcMode = $('#termCalcMode').length > 0 ? $('#termCalcMode').val() : $.request.content.termCalcMode;
            var map = {};
            if(fixedRentList.length > 0){
                map = {
                    "bizId": bizId,
                    "startDate": startDate,
                    "endDate": endDate,
                    "area": area,
                    "shopCode": shopCode,
                    "formType": "new",
                    "rentCalculationMode": selectRentCalculationMode,
                    "termCalcMode": termCalcMode,
                    "contractType": contractType,
                    "unitCode": unitCode,
                    "mallCode": $('#investmentContractModelMallSelect').val().split('[')[1].split(']')[0],
                    "fixedRentList": fixedRentList
                };
            } else if(propertyFeeList.length > 0) {
                map = {
                    "bizId": bizId,
                    "startDate": startDate,
                    "endDate": endDate,
                    "area": area,
                    "shopCode": shopCode,
                    "formType": "new",
                    "rentCalculationMode": selectRentCalculationMode,
                    "termCalcMode": termCalcMode,
                    "contractType": contractType,
                    "unitCode": unitCode,
                    "mallCode": $('#investmentContractModelMallSelect').val().split('[')[1].split(']')[0],
                    "propertyFeeList": propertyFeeList
                };
            } else if(deductList.length > 0) {
                map = {
                    "bizId": bizId,
                    "startDate": startDate,
                    "endDate": endDate,
                    "area": area,
                    "shopCode": shopCode,
                    "formType": "new",
                    "rentCalculationMode": selectRentCalculationMode,
                    "termCalcMode": termCalcMode,
                    "contractType": contractType,
                    "unitCode": unitCode,
                    "mallCode": $('#investmentContractModelMallSelect').val().split('[')[1].split(']')[0],
                    "deductList": deductList,
                    "salesList": salesList
                };
            } else if(promotionFeeList.length > 0) {
                map = {
                    "bizId": bizId,
                    "startDate": startDate,
                    "endDate": endDate,
                    "area": area,
                    "shopCode": shopCode,
                    "formType": "new",
                    "rentCalculationMode": selectRentCalculationMode,
                    "termCalcMode": termCalcMode,
                    "contractType": contractType,
                    "unitCode": unitCode,
                    "mallCode": $('#investmentContractModelMallSelect').val().split('[')[1].split(']')[0],
                    "promotionFeeList": promotionFeeList
                };
            }

            $.ajax({
                url: $.api.baseLotus+"/api/rent/calc/"+path,
                type: "POST",
                data: JSON.stringify(map),
                async: false,
                dataType: "json",
                contentType: "application/json",
                beforeSend: function(request) {
                    request.setRequestHeader("Login", $.cookie('login'));
                    request.setRequestHeader("Authorization", $.cookie('authorization'));
                    request.setRequestHeader("Lang", $.cookie('lang'));
                    request.setRequestHeader("Source", "onlineleasing");
                },
                complete: function(){},
                success: function (response, status, xhr) {
                    if(response.code === 'C0') {
                        if(xhr.getResponseHeader("Login") !== null){
                            $.cookie('login', xhr.getResponseHeader("Login"));
                        }
                        if(xhr.getResponseHeader("Authorization") !== null){
                            $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                        }

                        if(response.data != null){
                            if(path == 'fixedRentCalc' && response.data.rentCalcList.length > 0){
                                $('#'+prefix+'TotalRentAmount').text(accounting.formatNumber(response.data.totalRentAmount));
                                $('#'+prefix+'TaxTotalRentAmount').text(accounting.formatNumber(response.data.taxTotalRentAmount));
                                sessionStorage.setItem("rentCalcList", JSON.stringify(response.data.rentCalcList));
                            } else if (path == 'propertyFeeCalc' && response.data.propertyCalcList.length > 0){
                                $('#'+prefix+'TotalPropertyAmount').text(accounting.formatNumber(response.data.totalPropertyAmount));
                                $('#'+prefix+'TaxTotalPropertyAmount').text(accounting.formatNumber(response.data.taxTotalPropertyAmount));
                                sessionStorage.setItem("propertyCalcList", JSON.stringify(response.data.propertyCalcList));
                            } else if(path == 'deductCalc' && response.data.deductCalcList.length > 0){
                                $('#'+prefix+'TotalDeductAmount').text(accounting.formatNumber(response.data.totalDeductAmount));
                                $('#'+prefix+'TaxTotalDeductAmount').text(accounting.formatNumber(response.data.taxTotalDeductAmount));
                                sessionStorage.setItem("deductCalcList", JSON.stringify(response.data.deductCalcList));
                            } else if(path == 'promotionCalc' && response.data.promotionCalcList.length > 0){
                                $('#'+prefix+'TotalPromotionAmount').text(accounting.formatNumber(response.data.totalPromotionAmount));
                                $('#'+prefix+'TaxTotalPromotionAmount').text(accounting.formatNumber(response.data.taxTotalPromotionAmount));
                                sessionStorage.setItem("promotionCalcList", JSON.stringify(response.data.promotionCalcList));
                            } 
                        }
                    } else {
                        alertMsg(response.code,response.customerMessage);
                    }
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.log(textStatus, errorThrown);
                }
            });
        } else {
            if(path == 'fixedRentCalc'){
                $('#'+prefix+'TotalRentAmount').text(accounting.formatNumber(0));
                $('#'+prefix+'TaxTotalRentAmount').text(accounting.formatNumber(0));
                sessionStorage.setItem("rentCalcList", null);
            } else if (path == 'propertyFeeCalc'){
                $('#'+prefix+'TotalPropertyAmount').text(accounting.formatNumber(0));
                $('#'+prefix+'TaxTotalPropertyAmount').text(accounting.formatNumber(0));
                sessionStorage.setItem("propertyCalcList", null);
            } else if (path == 'deductCalc'){
                $('#'+prefix+'TotalDeductAmount').text(accounting.formatNumber(0));
                $('#'+prefix+'TaxTotalDeductAmount').text(accounting.formatNumber(0));
                sessionStorage.setItem("deductCalcList", null);
            } else if (path == 'promotionCalc'){
                $('#'+prefix+'TotalPromotionAmount').text(accounting.formatNumber(0));
                $('#'+prefix+'TaxTotalPromotionAmount').text(accounting.formatNumber(0));
                sessionStorage.setItem("deductCalcList", null);
            }
        }
    }
}

function termsModalToggle(calc){
    calBackPush(calc);
    var sessionTerm;
    switch (calc) {
        case "fixedRent":
            sessionTerm = 'rentCalcList';
            break;
        case "propertyMgmt":
            sessionTerm = 'propertyCalcList';
            break;
        case "commission":
            sessionTerm = 'deductCalcList';
            break;
        case "promotion":
            sessionTerm = 'promotionCalcList';
            break;
        default:
            break;
    }
    
    $('#accountTerm').html('');
    var terms = JSON.parse(sessionStorage.getItem(sessionTerm));
    if(terms != null && terms.length > 0){
        $.each(terms, function(i,v) {
            var budgetAmountColor = '';
            var budgetTaxAmountColor = '';
            var budgetAmount = '-';
            var budgetTaxAmount = '-';
            if(v.budgetAmount != null){
                budgetAmount = accounting.formatNumber(v.budgetAmount);
                if(v.amount >= v.budgetAmount){
                    budgetAmountColor = 'text-green';
                } else {
                    budgetAmountColor = 'text-red';
                }
            }
            if(v.budgetTaxAmount != null){
                budgetTaxAmount = accounting.formatNumber(v.budgetTaxAmount);
                if(v.taxAmount >= v.budgetTaxAmount){
                    budgetTaxAmountColor = 'text-green';
                } else {
                    budgetTaxAmountColor = 'text-red';
                }
            }
            
            $('#accountTerm').append('<tr>\n\
                <td>'+(i+1)+'</td>\n\
                <td>'+v.startDate+'</td>\n\
                <td>'+v.endDate+'</td>\n\
                <td>'+accounting.formatNumber(v.amount)+'</td>\n\
                <td>'+accounting.formatNumber(v.taxAmount)+'</td>\n\
                <td class="'+budgetAmountColor+'">'+budgetAmount+'</td>\n\
                <td class="'+budgetTaxAmountColor+'">'+budgetTaxAmount+'</td></tr>'
            );
        })
    }
    
    $('#investment-contract-accountterm-account').modal('toggle');
}

function budgetModalToggle(term){
    $('#budgetTerm').html('');
    var shopBudget = sessionStorage.getItem("shopBudget_"+$('#selectStore').val().split(':::')[1]);
    if(shopBudget != null && shopBudget != '' && shopBudget != 'null' ){
        if(JSON.parse(shopBudget).length > 0){
            $.each(JSON.parse(shopBudget), function(i,v) {
                if(v.termType == term){
                    $('#budgetTerm').append('<tr>\n\
                        <td>'+v.year+'</td>\n\
                        <td>'+accounting.formatNumber(v.january)+'</td>\n\
                        <td>'+accounting.formatNumber(v.february)+'</td>\n\
                        <td>'+accounting.formatNumber(v.march)+'</td>\n\
                        <td>'+accounting.formatNumber(v.april)+'</td>\n\
                        <td>'+accounting.formatNumber(v.may)+'</td>\n\
                        <td>'+accounting.formatNumber(v.june)+'</td>\n\
                        <td>'+accounting.formatNumber(v.july)+'</td>\n\
                        <td>'+accounting.formatNumber(v.august)+'</td>\n\
                        <td>'+accounting.formatNumber(v.september)+'</td>\n\
                        <td>'+accounting.formatNumber(v.october)+'</td>\n\
                        <td>'+accounting.formatNumber(v.november)+'</td>\n\
                        <td>'+accounting.formatNumber(v.december)+'</td></tr>'
                    );
                }
            })
        }
    }
    $('#investment-contract-budgetterm-budget').modal('toggle');
}

function dataURLtoFile(dataurl,filename,filetype) {
    var arr = dataurl.split(","),
    bstr =atob(arr[1]),
    n = bstr.length,
    u8arr =new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {
        type: filetype
    });
}

function updateRequestContractDropDown(id, data_count) {
    var dropdownParent;
    switch (id) {
        case "renewContract":
            dropdownParent = 'investment-contract-request-renew-termination-create';
            break;
        case "modifyContract":
            dropdownParent = 'investment-contract-request-modify-create';
            break;
        default:
            break;
    }
    
    $('#'+id).select2({
        dropdownParent: $('#'+dropdownParent),
        placeholder: '输入合同编号、商户名称或店招',
        dropdownAutoWidth: true,
        language: {
            searching: function() {
                return '加载中...';
            },
            loadingMore: function() {
                return '加载中...';
            }
        },
        ajax: {
            url: function (params) {
                return $.api.baseLotus+"/api/contract/lotus/findAllByFreeCondition?page="+(params.page || 0)+"&size="+data_count+"&sort=contractNo,asc";
            },
            type: "POST",
            async: false,
            dataType: "json",
            contentType: "application/json",
            delay: 250,
            beforeSend: function(request) {
                request.setRequestHeader("Login", $.cookie('login'));
                request.setRequestHeader("Authorization", $.cookie('authorization'));
                request.setRequestHeader("Lang", $.cookie('lang'));
                request.setRequestHeader("Source", "onlineleasing");
            },
            data: function (params) {
                var term;
                switch (id) {
                    case "renewContract":
                        term = params.term || $('#renewDepartment').val();
                        break;
                    case "modifyContract":
                        term = params.term || $('#modifyDepartment').val();
                        break;
                    default:
                        break;
                }
                var map = {
                    key: term,
                    operator: "OR",
                    params: [
                      "mallCode","tenantName","contractNo"
                    ],
                    sorts: []
                }
                return JSON.stringify(map);
            },
            processResults: function (data,params) {
                if(data['code'] === 'C0') {
                    var jsonData = data['data'].content;
                    params.page = params.page || 0;
                    var data;
                    return {
                        results: $.map(jsonData, function(item) {
                            data = {
                                id: item.contractNo,
                                text: item.tenantName + '[' + item.contractNo + '] | ' + (item.contractName || '') + ' | ' + item.unitName + ' | ' + item.startDate + '～' + item.endDate            
                            }
                            var returnData = [];
                            returnData.push(data);
                            return returnData;
                        }),
                        pagination: {
                            "more": data_count <= jsonData.length
                        }
                    }
                } else {
                    alertMsg(data['code'],data['customerMessage']);
                }
            },
            cache: true
        }
    });
}

function updateSelectContractDropDown(data_count) {
    $('#selectContract').select2({
        placeholder: '输入合同编号',
        dropdownAutoWidth: true,
        allowClear: true,
        language: {
            searching: function() {
                return '加载中...';
            },
            loadingMore: function() {
                return '加载中...';
            }
        },
        ajax: {
            url: function (params) {
                return $.api.baseLotus+"/api/contract/lotus/findAllByFreeCondition?page="+(params.page || 0)+"&size="+data_count+"&sort=contractNo,asc";
            },
            type: "POST",
            async: false,
            dataType: "json",
            contentType: "application/json",
            delay: 250,
            beforeSend: function(request) {
                request.setRequestHeader("Login", $.cookie('login'));
                request.setRequestHeader("Authorization", $.cookie('authorization'));
                request.setRequestHeader("Lang", $.cookie('lang'));
                request.setRequestHeader("Source", "onlineleasing");
            },
            data: function (params) {
                var map = {
                    key: params.term || $('#department').val(),
                    operator: "OR",
                    params: [
                      "mallCode","tenantName","contractNo","unitName","contractName"
                    ],
                    sorts: []
                }
                return JSON.stringify(map);
            },
            processResults: function (data,params) {
                if(data['code'] === 'C0') {
                    var jsonData = data['data'].content;
                    params.page = params.page || 0;
                    var data;
                    return {
                        results: $.map(jsonData, function(item) {
                            data = {
                                id: item.contractNo,
                                text: item.tenantName + '[' + item.contractNo + '] | ' + (item.contractName || '') + ' | ' + item.unitName + ' | ' + item.startDate + '～' + item.endDate + ' | ' + 'V'+item.contractVersion           
                            }
                            var returnData = [];
                            returnData.push(data);
                            return returnData;
                        }),
                        pagination: {
                            "more": data_count <= jsonData.length
                        }
                    }
                } else {
                    alertMsg(data['code'],data['customerMessage']);
                }
            },
            cache: true
        }
    });
}

function redirectCheck(id,suffix) {
    $('.mandatory-error').remove();
    var flag = 1;
    var error = '<i class="fa fa-exclamation-circle mandatory-error" aria-hidden="true"></i>';
    
    if($('#'+id+'Contract').val() == null) {
        flag = 0;
        $('#'+id+'Contract').parent().append(error);
    }
    
    if($('#'+id+'UpdateFormType').val() == '') {
        flag = 0;
        $('#'+id+'UpdateFormType').parent().append(error);
    }
    
    if(flag == 1){
        saveContractInfoForRequest(id,suffix);
    }
}

function saveContractInfoForRequest(id,suffix) {
    var openId = 'admin';
    $.each(JSON.parse($.cookie('userModules')), function(i,v) {
        if(v.roleCode == 'CROLE220301000001'){
            openId = v.moduleName;
            return false;
        }
    })
       
    var map = {
        contractNo: $('#'+id+'Contract').val(),
        formType: $('#'+id+'UpdateFormType').val(),
        updateOpenId: openId
    }
    $.ajax({
        url: $.api.baseLotus+"/api/rent/contract/form/saveContractInfoForRenew",
        type: "POST",
        data: JSON.stringify(map),
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
                if(xhr.getResponseHeader("Login") !== null){
                    $.cookie('login', xhr.getResponseHeader("Login"));
                }
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                }
                
                if(response.data.bizId != null){
                    var path;
                    switch (response.data.formType) {
                        case "termination":
                            path = 'terminate';
                            break;
                        default:
                            path = response.data.formType;
                            break;
                    }
                    
                    window.location.href = '/lotus-admin/'+path+'-request'+suffix+'?id='+response.data.bizId;
                }
            } else {
                alertMsg(response.code,response.customerMessage);
            }
        }
    })
}

function createContractCheck() {
    $('.mandatory-error').remove();
    var flag = 1;
    var error = '<i class="fa fa-exclamation-circle mandatory-error" aria-hidden="true"></i>';
    
    if($('#createContractDepartment').val() == null) {
        flag = 0;
        $('#createContractDepartment').parent().append(error);
    }
    
    if($('#createContractStore').val() == null) {
        flag = 0;
        $('#createContractStore').parent().append(error);
    }
    
    if($('#createContractBrandName').val() == null) {
        flag = 0;
        $('#createContractBrandName').parent().append(error);
    }
    
    if($('#createContractSelectTenant').val() == null) {
        flag = 0;
        $('#createContractSelectTenant').parent().append(error);
    }
    
    if($('#createContractStartDate').val() == '' || $('#createContractEndDate').val() == '') {
        flag = 0;
        $('#createContractStartDate').parent().parent().append(error);
    }
    
    if(flag == 1){
        createContract();
    }
}

function createContract() {
    var openId = 'admin';
    var userCode = '';
    $.each(JSON.parse($.cookie('userModules')), function(i,v) {
        if(v.roleCode == 'CROLE220301000001'){
            openId = v.moduleName;
            userCode = v.userCode;
            return false;
        }
    })

    var mallName = '', mallCode = '', unitCode = '', unitName = '', shopCode = '', floorCode = '', floorName = '', 
    area = '', brandName = '', bizTypeName = '', brandCode = '', tenantName = '', tenantCode = '', tenantNo = '', 
    startDate = $('#createContractStartDate').val(), endDate = $('#createContractEndDate').val(), rentCalculationMode = $('#createContractSelectRentCalculationMode').val(), 
    userName = $('.navbar-nav .fa-user').siblings().text().trim().replace(/\s/g,"");
    
    if( $('#createContractDepartment').val() && $('#createContractDepartment').val() != '' && $('#createContractDepartment').val() != null){
        mallName = $('#select2-createContractDepartment-container').text().split('[')[0];
        mallCode = $('#createContractDepartment').val();
    }

    if( $('#createContractStore').val() && $('#createContractStore').val() != '' && $('#createContractStore').val() != null){
        unitCode = $('#createContractStore').val().split(':::')[0];
        shopCode = $('#createContractStore').val().split(':::')[1];
        unitName = $('#createContractStore').val().split(':::')[2];
        floorName = $('#createContractStore').val().split(':::')[3];
        floorCode = $('#createContractStore').val().split(':::')[4];
        area = $('#select2-createContractStore-container').text().split(' | ')[1].split('㎡')[0];
    }

    if( $('#createContractBrandName').val() && $('#createContractBrandName').val() != '' && $('#createContractBrandName').val() != null){
        brandName = $('#select2-createContractBrandName-container').text().split('[')[0];
        bizTypeName = $('#select2-createContractBrandName-container').text().split('[')[1].split(']')[0];
        brandCode = $('#createContractBrandName').val();
    }

    if( $('#createContractSelectTenant').val() && $('#createContractSelectTenant').val() != '' && $('#createContractSelectTenant').val() != null){
        tenantNo = $('#select2-createContractSelectTenant-container').text().split(' | ')[0];
        tenantName = $('#select2-createContractSelectTenant-container').text().split(' | ')[1];
        tenantCode = $('#createContractSelectTenant').val();
    }

    var map = {
        "creatorCode": userCode,
        "creatorName": userName,
        "creatorOpenId": openId,
        "shopCode": shopCode,
        "unitCode": unitCode,
        "unitName": unitName,
        "area": area,
        "formType": "NEW",
        "rentCalculationMode": rentCalculationMode,
        "endDate": endDate,
        "contractType": "leasing",
        "mallCode": mallCode,
        "startDate": startDate,
        "contractVersion": 1,
        "contractStatus": "init",
        "profitCenter": "leasing",
        "posMode": "unUse",
        "cooperationMode": "RENT",
        "mallName": mallName,
        "floorCode": floorCode,
        "floorName": floorName,
        "duration": 0,
        "termCalcMode": "NEW",
        "brandName": brandName,
        "brandCode": brandCode,
        "contractName": brandName,
        "tenantName": tenantName,
        "tenantCode": tenantCode,
        "tenantNo": tenantNo,
        "bizTypeName": bizTypeName,
        "bizDate": startDate,
        "enterDate": startDate,
        "deliveryDate": startDate,
        "awardDate": startDate,
        "intentDate": startDate,
        "approvalOpenId": openId,
        "approvalName": userName,
        "openStartTime": "10:00",
        "openEndTime": "22:00"
    };
    
    $.ajax({
        url: $.api.baseLotus+"/api/contract/lotus/checkDuplicateData?shopCode="+shopCode+"&startDate="+$('#createContractStartDate').val()+"&endDate="+$('#createContractEndDate').val(),
        type: "GET",
        async: false,
        dataType: "json",
        contentType: "application/json",
        beforeSend: function(request) {
            request.setRequestHeader("Login", $.cookie('login'));
            request.setRequestHeader("Authorization", $.cookie('authorization'));
            request.setRequestHeader("Lang", $.cookie('lang'));
            request.setRequestHeader("Source", "onlineleasing");
        },
        complete: function(){},
        success: function (response, status, xhr) {
            if(response.code === 'C0') {
                if(xhr.getResponseHeader("Login") !== null){
                    $.cookie('login', xhr.getResponseHeader("Login"));
                }
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                }
                
                if(response.data.resultCode == 'SUCCESS') {
                    $.ajax({
                        url: $.api.baseLotus+"/api/contract/lotus/saveOrUpdate",
                        type: "POST",
                        data: JSON.stringify(map),
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
                                if(xhr.getResponseHeader("Login") !== null){
                                    $.cookie('login', xhr.getResponseHeader("Login"));
                                }
                                if(xhr.getResponseHeader("Authorization") !== null){
                                    $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                                }
                                if(response.data.resultCode == 'SUCCESS') {
                                    window.location.href = '/lotus-admin/contract-init?id='+response.data.contractNo+'&contractVersion=1&s=succeed';         
                                } else {
                                    alertMsg(response.data.resultCode,response.data.resultMsg);
                                }
                            } else {
                                alertMsg(response.code,response.customerMessage);
                            }
                        },
                        error: function(jqXHR, textStatus, errorThrown) {
                            console.log(textStatus, errorThrown);
                        }
                    });
                } else {
                    alertMsg(response.data.resultCode,response.data.resultMsg);
                }
            } else {
                alertMsg(response.code,response.customerMessage);
            }
        }
    })
}

function modifyTypeCheck() {
    if($('#contractModifyType').val() != ''){
        $("#selectTenant, #brandName, #contractName, #startDate, #endDate, tbody input.money, tbody input[id*='TaxRate_'], tbody input[id*='InvoiceFlag_'], \n\
        tbody input[id*='StartDate_'], tbody input[id*='EndDate_'], #investmentContractEnteryterm input, #selectRentCalculationMode, #targetSales").attr('disabled','disabled');
        $('#startDate, #endDate, #investmentContractEnteryterm input, #targetSales').next().css({
            'border': 'none',
            'background': '#eee'
        });
        
        $("input[id*='StartDate_']").datepicker('setStartDate',$('#startDate').val());
        $("input[id*='StartDate_']").datepicker('setEndDate',$('#endDate').val());
        $("input[id*='EndDate_']").datepicker('setStartDate',$('#startDate').val());
        $("input[id*='EndDate_']").datepicker('setEndDate',$('#endDate').val());
        
        switch ($('#contractModifyType').val()) {
            case "TENANT_CHANGE":
                $("#selectTenant, tbody input[id*='StartDate_'], tbody input[id*='EndDate_']").not('.past').removeAttr('disabled');
                $("tbody input.money, tbody input[id*='TaxRate_'], tbody input[id*='InvoiceFlag_']").removeAttr('disabled');
                break;
            case "BRAND_CHANGE":
                $("#brandName, #contractName, tbody input[id*='StartDate_'], tbody input[id*='EndDate_']").not('.past').removeAttr('disabled');
                $("tbody input.money, tbody input[id*='TaxRate_'], tbody input[id*='InvoiceFlag_']").removeAttr('disabled');
                break;
            case "TIME_CHANGE":
                $('#startDate, #endDate, #investmentContractEnteryterm input').removeAttr('disabled').css({
                    'borderRight': 'none'
                });
                $("#startDate, #endDate, #investmentContractEnteryterm input").next().css({
                    'border': '1px solid #d2d6de',
                    'borderLeft': 'none',
                    'background': 'transparent'
                });
                $("tbody input[id*='StartDate_'], tbody input[id*='EndDate_']").removeAttr('disabled');
                $("tbody input.money, tbody input[id*='TaxRate_'], tbody input[id*='InvoiceFlag_']").removeAttr('disabled');
                break;
            case "CLAUSE_CHANGE":
                $("#selectRentCalculationMode, tbody input[id*='StartDate_'], tbody input[id*='EndDate_'], #targetSales").not('.past').removeAttr('disabled');
                $("input.money, tbody input[id*='TaxRate_'], tbody input[id*='InvoiceFlag_']").removeAttr('disabled');
                $("#targetSales").next().css({
                    'border': '1px solid #d2d6de',
                    'borderLeft': 'none',
                    'background': 'transparent'
                });
                break;
            default:
                break;
        }
    }
}

function scrollHandle() {
    var scrollTop = $('.fixed-table-body').scrollTop();
    // 当滚动距离大于0时设置top及相应的样式
    if (scrollTop > 0) {
        $('.fixed-table-body tr th').css({
            "top": scrollTop + 'px',
            "marginTop": "-1px",
            "padding": 0
        });
    } else {
    // 当滚动距离小于0时设置top及相应的样式
         $('.fixed-table-body tr th').css({
            "top": scrollTop + 'px',
            "marginTop": 0
        });
    }
    
    var scrollLeft = $('.fixed-table-body').scrollLeft();
    // 当滚动距离大于0时设置left及相应的样式
    if (scrollLeft > 275) {
        $('.fixed-table-body tr th:eq(0)').css({
            "left": scrollLeft + 'px',
            "marginLeft": "-1px",
            "padding": 0
        });
        
        $('.fixed-table-body tr').each(function() {
            $(this).find("td:eq(0)").css({
                "position": "relative",
                "left": scrollLeft + 'px',
                "marginLeft": "-1px",
                "padding": 0
            });
        })
    } else {
    // 当滚动距离小于0时设置left及相应的样式
         $('.fixed-table-body tr th:eq(0)').css({
            "left": scrollLeft + 'px',
            "marginLeft": 0
        });
        
        $('.fixed-table-body tr').each(function() {
            $(this).find("td:eq(0)").css({
                "left": scrollLeft + 'px',
                "marginLeft": 0
            });
        })
    }
}
(function ($) {
    window.Ewin = function () {
        var html = '<div id="[Id]" class="modal fade" role="dialog" aria-labelledby="modalLabel">' +
                              '<div class="modal-dialog modal-sm" style="top: 30%;">' +
                                  '<div class="modal-content">' +
                                      '<div class="modal-header">' +
                                          '<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>' +
                                          '<h4 class="modal-title" id="modalLabel">[Title]</h4>' +
                                      '</div>' +
                                      '<div class="modal-body">' +
                                      '<p>[Message]</p>' +
                                      '</div>' +
                                       '<div class="modal-footer">' +
        '<button type="button" class="btn btn-default cancel" data-dismiss="modal">[BtnCancel]</button>' +
        '<button type="button" class="btn btn-primary ok" data-dismiss="modal">[BtnOk]</button>' +
    '</div>' +
                                  '</div>' +
                              '</div>' +
                          '</div>';


        var dialogdHtml = '<div id="[Id]" class="modal fade" role="dialog" aria-labelledby="modalLabel">' +
                              '<div class="modal-dialog" style="top: 30%;">' +
                                  '<div class="modal-content">' +
                                      '<div class="modal-header">' +
                                          '<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>' +
                                          '<h4 class="modal-title" id="modalLabel">[Title]</h4>' +
                                      '</div>' +
                                      '<div class="modal-body">' +
                                      '</div>' +
                                  '</div>' +
                              '</div>' +
                          '</div>';
        var reg = new RegExp("\\[([^\\[\\]]*?)\\]", 'igm');
        var generateId = function () {
            var date = new Date();
            return 'mdl' + date.valueOf();
        }
        var init = function (options) {
            options = $.extend({}, {
                title: "提示",
                message: "提示内容",
                btnok: "是",
                btncl: "否",
                width: 200,
                auto: false
            }, options || {});
            var modalId = generateId();
            var content = html.replace(reg, function (node, key) {
                return {
                    Id: modalId,
                    Title: options.title,
                    Message: options.message,
                    BtnOk: options.btnok,
                    BtnCancel: options.btncl
                }[key];
            });
            $('body').append(content);
            $('#' + modalId).modal({
                width: options.width,
                backdrop: 'static'
            });
            $('#' + modalId).on('hide.bs.modal', function (e) {
                $('body').find('#' + modalId).remove();
            });
            return modalId;
        }

        return {
            alert: function (options) {
                if (typeof options == 'string') {
                    options = {
                        message: options
                    };
                }
                var id = init(options);
                var modal = $('#' + id);
                modal.find('.ok').removeClass('btn-success').addClass('btn-primary');
                modal.find('.cancel').hide();

                return {
                    id: id,
                    on: function (callback) {
                        if (callback && callback instanceof Function) {
                            modal.find('.ok').click(function () { callback(true); });
                        }
                    },
                    hide: function (callback) {
                        if (callback && callback instanceof Function) {
                            modal.on('hide.bs.modal', function (e) {
                                callback(e);
                            });
                        }
                    }
                };
            },
            confirm: function (options) {
                var id = init(options);
                var modal = $('#' + id);
                modal.find('.ok').removeClass('btn-primary').addClass('btn-success');
                modal.find('.cancel').show();
                return {
                    id: id,
                    on: function (callback) {
                        if (callback && callback instanceof Function) {
                            modal.find('.ok').click(function () { 
                                modal.on('hide.bs.modal', function (e) {
                                    callback(true);
                                });
                            });
                            //modal.find('.cancel').click(function () { callback(false); });
                        }
                    },
                    hide: function (callback) {
                        if (callback && callback instanceof Function) {
                            modal.on('hide.bs.modal', function (e) {
                                callback(e);
                            });
                        }
                    }
                };
            },
            dialog: function (options) {
                options = $.extend({}, {
                    title: 'title',
                    url: '',
                    width: 800,
                    height: 550,
                    onReady: function () { },
                    onShown: function (e) { }
                }, options || {});
                var modalId = generateId();

                var content = dialogdHtml.replace(reg, function (node, key) {
                    return {
                        Id: modalId,
                        Title: options.title
                    }[key];
                });
                $('body').append(content);
                var target = $('#' + modalId);
                target.find('.modal-body').load(options.url);
                if (options.onReady())
                    options.onReady.call(target);
                target.modal();
                target.on('shown.bs.modal', function (e) {
                    if (options.onReady(e))
                        options.onReady.call(target, e);
                });
                target.on('hide.bs.modal', function (e) {
                    $('body').find(target).remove();
                });
            }
        }
    }();
})(jQuery);
accounting.settings = {
    currency: {
            symbol : "¥",
            format: "%s%v",
            decimal : ".",
            thousand: ",",
            precision : 2 
    },
    number: {
            precision : 2,
            thousand: ",",
            decimal : "."
    }
}