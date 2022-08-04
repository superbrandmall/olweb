$.api = {
    base: $.base,
    baseLotus: $.base+"/onlineleasing-lotus",
    baseAdmin: $.base+"/onlineleasing-admin",
    dictModule: [],
    dictContractType: 1, //租赁
    contractType: ['租赁','leasing'],
    formType: ['新签','new','续签','renew','终止','termination','变更','modify'],
    paymentMode: ['月付','M'],
    posMode: ['不用POS自收银','unUse'],
    profitCenter: ['租赁部','rent'],
    termCalcMode: ['新计算方法','NEW'],
    rentCalculationMode: ['固租与提成取高','fixedRentAndHigherDeduct'],
    contractTemplate: ['租期 > 6个月','1']
};

var d = new Date();
var month = d.getMonth()+1;
var day = d.getDate();
var date = d.getFullYear() + '-' +
    (month<10 ? '0' : '') + month + '-' +
    (day<10 ? '0' : '') + day;

$(document).ready(function(){
    if($.cookie('userModules') && $.cookie('userModules') != '' && $.cookie('userModules') != null){
        $.each(JSON.parse($.cookie('userModules')), function(i,v) {
            if(v.roleCode == 'CROLE211008000002' && v.moduleCode == 'ALL'){
                $('.location-select ul li, .mall-select ul li').show();
                if($.inArray(v.userCode,['CUSER200524000004','CUSER210628000002','CUSER220615000002']) == -1){
                    $('.sidebar-menu > li').hide();
                    $('.sidebar-menu > li:eq(3), .sidebar-menu > li:eq(4), .sidebar-menu > li:eq(5), .sidebar-menu > li:eq(6)').show();
                }
                return false;
            } else if(v.roleCode == 'CROLE211008000001' && v.moduleName == '门店对接人') {
                $('.sidebar-menu > li').hide();
                $('.sidebar-menu > li:eq(3), .sidebar-menu > li:eq(4), .sidebar-menu > li:eq(5), .sidebar-menu > li:eq(6)').show();
                $('.mall-select ul li').each(function(i,elem){
                    if($(elem).find('a').attr('data-code') == v.moduleCode){
                        $(this).show();
                    }
                })
            }
        })
        
        if($.cookie('locationSelected') && $.cookie('locationSelected') != ''){
            $('#locationSelected').text($.cookie('locationSelected').split(':::')[0]);
        } else {
            $('.location-select ul li').each(function(i,elem){
                if($(elem).hasClass('to-select') && $(elem).css('display') != 'none'){
                    $('#locationSelected').text($(elem).find('span').text());
                    $.cookie('locationSelected',$(elem).find('span').text()+':::'+$(elem).find('a').attr('data-code'));
                    return false;
                }
            })
        }
        
        if($.cookie('mallSelected') && $.cookie('mallSelected') != ''){
            $('#mallSelected').text($.cookie('mallSelected').split(':::')[0]);
        } else {
            $('.mall-select ul li').each(function(i,elem){
                if($(elem).hasClass('to-select') && $(elem).css('display') != 'none'){
                    $('#mallSelected').text($(elem).find('span').text());
                    $.cookie('mallSelected',$(elem).find('span').text()+':::'+$(elem).find('a').attr('data-code'));
                    return false;
                }
            })
        }
        
        if(!sessionStorage.getItem("floors-"+$.cookie('mallSelected').split(':::')[1]) || sessionStorage.getItem("floors-"+$.cookie('mallSelected').split(':::')[1]) == null || sessionStorage.getItem("floors-"+$.cookie('mallSelected').split(':::')[1]) == '') {
            getFloors();
        }
        
        getSideBarFloor();
    }
    
    $('.location-select .text-blue').click(function(){
        $.cookie('locationSelected',$(this).find('span').text()+':::'+$(this).attr('data-code'));
        $('#locationSelected').text($.cookie('locationSelected').split(':::')[0]);
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
    
    // An highlighted block
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
    
    $('#createRenew, #createTerminate, #createModify').click(function(){
        var ftTxt, ftVal,headTxt,rcdd,ftid,fheader;
        switch ($(this).attr('id')) {
            case "createRenew":
                ftTxt = $.api.formType[2];
                ftVal = $.api.formType[3];
                headTxt = '续签合同申请';
                rcdd = 'renewContract';
                ftid = 'renewUpdateFormType';
                fheader = 'renew-termination';
                break;
            case "createTerminate":
                ftTxt = $.api.formType[4];
                ftVal = $.api.formType[5];
                headTxt = '终止合同申请';
                rcdd = 'renewContract';
                ftid = 'renewUpdateFormType';
                fheader = 'renew-termination';
                break;
            case "createModify":
                ftTxt = $.api.formType[6];
                ftVal = $.api.formType[7];
                headTxt = '变更合同申请';
                rcdd = 'modifyContract';
                ftid = 'modifyUpdateFormType';
                fheader = 'modify';
                break;
            default:
                break;
        }
        
        updateDictDropDownByDictTypeCode('FORM_TYPE',ftid,ftTxt,ftVal);
        $('#investment-contract-request-'+fheader+'-create .modal-header').find('h4').text(headTxt);
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
    })
    
    $('#renewDepartment').select2({
        dropdownParent: $('#investment-contract-request-renew-termination-create')
    })
    
    $('#modifyDepartment').select2({
        dropdownParent: $('#investment-contract-request-modify-create')
    })
    
    $("#renewContract, #modifyContract").on("select2:select",function(){
        var id = $(this).attr('id').split('Contract')[0];
        $("#"+id+"Tenant").text($('#select2-'+id+'Contract-container').text().split(' | ')[0].split('[')[0]);
        $("#"+id+"ContractName").text($('#select2-'+id+'Contract-container').text().split(' | ')[1]);
        $("#"+id+"UnitName").text($('#select2-'+id+'Contract-container').text().split(' | ')[2]);
        $("#"+id+"StartEndDate").text($('#select2-'+id+'Contract-container').text().split(' | ')[3]);
    })
    
    $('#renewCreateRequest, #modifyCreateRequest').click(function(){
        var id = $(this).attr('id').split('CreateRequest')[0];
        redirectCheck(id);
    })
    
    scrollJump();
})

function getFloors() {
    $.ajax({
        url: $.api.baseLotus+"/api/floor/lotus/findAllByMallCode?mallCode="+$.cookie('mallSelected').split(':::')[1],
        type: "GET",
        async: false,
        beforeSend: function(request) {
            request.setRequestHeader("Login", $.cookie('login'));
            request.setRequestHeader("Authorization", $.cookie('authorization'));
            request.setRequestHeader("Lang", 1);
            request.setRequestHeader("Source", "onlineleasing");
        },
        success: function (response, status, xhr) {
            if(response.code === 'C0') {
                sessionStorage.setItem("floors-"+$.cookie('mallSelected').split(':::')[1], JSON.stringify(response.data) );             
            } else {
                alertMsg(response.code,response.customerMessage);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}

function getSideBarFloor() {
    $.each($.parseJSON(sessionStorage.getItem("floors-"+$.cookie('mallSelected').split(':::')[1])), function(i,v){
        var url = window.location.href;
        var floorClass;
        if(v.code == getURLParameter('f')) {
            floorClass = 'active';
        } else if(getURLParameter('f') == undefined && i == 0) {
            floorClass = 'active';
        } else {
            floorClass = '';
        }
        
        $('#floorList').append('<li class="'+floorClass+'"><a href="/lotus-admin/home?f='+v.code+'"><i class="fa fa-level-up"></i> '+v.floorName+'</a></li>');
    })
}

function alertMsg(code,m) {
    var msg,color,style;
    switch (code) {
        case "JWT0002":
            msg = m+"，请重新 <strong><a href='javascript: logout();'>登录</a></strong>！";
            color = "danger";
            style = ' style="z-index: 1041;position: fixed; left:165px; right: 15px; top: 152px;"';
            break;
        default:
            msg = m;
            color = "danger";
            style = ' style="z-index: 1041;position: fixed; left:165px; right: 15px; top: 152px;"';
            break;
    }
    
    var msgDiv = '<div id="msgDiv" class="row"'+style+' role="alert">\n\
            <div class="col-md-12">\n\
                    <h5 class="callout callout-'+color+'"><a href="javascript: void(0);" onclick=\'javascript: $("#msgDiv").remove()\' style="float: right;"><i class="fa fa-times"></i></a>'+msg+'</h5>\n\
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
            color = "success";
            style = ' style="z-index: 1029;position: fixed; left:165px; right: 15px; top: 152px;"';
            break;
    }
    
    var msgDiv = '<div id="msgDiv" class="row"'+style+'>\n\
            <div class="col-md-12">\n\
                    <h5 class="callout callout-'+color+'"><a href="javascript: void(0);" onclick=\'javascript: $("#msgDiv").remove()\' style="float: right;"><i class="fa fa-times"></i></a>'+msg+'</h5>\n\
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
                pages += '<li class="page-item"><a class="page-link" href="?page=1&items='+items+'">&laquo;</a></li>';
                pages += '<li class="page-item"><a class="page-link pn" href="?page='+pre+'&items='+items+'">上一页</a></li>';
            } else {
                pages += '<li class="page-item"><a class="page-link" href="?page=1&items='+items+'">&laquo;</a></li>';
                pages += '<li class="page-item disabled"><a class="page-link pn" href="javascript: void(0);">上一页</a></li>';
            }
        } else {
            pages += '<li class="page-item disabled"><a class="page-link" href="javascript: void(0);">&laquo;</a></li>';
            pages += '<li class="page-item disabled"><a class="page-link pn" href="javascript: void(0);">上一页</a></li>';
        }
        var index = 1;
        if(currentPage<=(LastPage-4)*1) {
            index = currentPage;
        } else {
            index = (LastPage-4)*1;
        }
        var pindex, qindex;
        index > 1 ? pindex = index-1 : pindex = 1;
        index > 1 ? qindex = index*1+5: qindex = index*1+6;
        for(var i=pindex;i<qindex;i++) {
            if(i == currentPage ) {
                pages += '<li class="page-item active"><a class="page-link" href="?page='+i+'&items='+items+'">'+i+'</a></li>';
            } else {
                pages += '<li class="page-item"><a class="page-link" href="?page='+i+'&items='+items+'">'+i+'</a></li>';
            }
        }
        if(currentPage<LastPage){
            if(currentPage<(LastPage-4)){
                currentPage*1+6 <= LastPage ? nex = currentPage*1+6 : nex = LastPage;
                pages += '<li class="page-item"><a class="page-link pn" href="?page='+nex+'&items='+items+'">下一页</a></li>';
                pages += '<li class="page-item"><a class="page-link" href="?page='+LastPage+'&items='+items+'">&raquo;</a></li>';
            } else {
                pages += '<li class="page-item disabled"><a class="page-link pn" href="javascript: void(0);">下一页</a></li>';
                pages += '<li class="page-item"><a class="page-link" href="?page='+LastPage+'&items='+items+'">&raquo;</a></li>';
            }
        } else {
            pages += '<li class="page-item disabled"><a class="page-link pn" href="javascript: void(0);">下一页</a></li>';
            pages += '<li class="page-item disabled"><a class="page-link" href="javascript: void(0);">&raquo;</a></li>';
        }
    }
    
    $(".pagination .pagination").append(pages);
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
    //get full url
    var url = window.location.href;
    //get url after/  
    var value = url.substring(url.lastIndexOf('/') + 1);
    //get the part after before ?
    value  = value.split("?")[0];   
    return value;     
}

function refineCreateUrl() {
    var url = window.location.href;
    var value = url.substring(url.lastIndexOf('/') + 1);
    value  = value.split("?s")[0];   
    return value;     
}

function refineUpdateUrl() {
    var url = window.location.href;
    var value = url.substring(url.lastIndexOf('/') + 1);
    value  = value.split("&s")[0];   
    return value;     
}

function logout() {
    var keys = document.cookie.match(/[^ =;]+(?=\=)/g); 
    if (keys) { 
    for (var i = keys.length; i--;) 
        document.cookie = keys[i]+'=0;expires=' + new Date(0).toUTCString();
    }
    
    window.location.href = 'logout';
}

$.validator.addMethod('numChar',function(text){
    var regex = /^[0-9a-zA-Z\ ]+$|(^$)/;
    return regex.test(text);
}, "The value entered is invalid");

(function (){
    // 这个调用能触发目标事件，从而达到共享数据的目的
    if(!sessionStorage.length){
      localStorage.setItem('getSessionStorage', Date.now());
    };
    
    // 该事件是核心
    window.addEventListener('storage', function (event){

    if(event.key == 'getSessionStorage'){
        // 已存在的标签页会收到这个事件
        localStorage.setItem('sessionStorage', JSON.stringify(sessionStorage));
        localStorage.removeItem('sessionStorage');
    } else if(event.key == 'sessionStorage' && !sessionStorage.length){
        // 新开启的标签页会收到这个事件
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
        var num = i + 1;
        if($('#'+Exid+'EndDate_'+(parseInt(num)+1)).length <= 0){
            $('#'+Exid+'EndDate_'+num).datepicker('setEndDate',$('#endDate').val());
            $('#'+Exid+'EndDate_'+num).datepicker('update',$('#endDate').val());
            
            if($('#'+Exid+'EndDate_'+num).val() == '' ){
                deleteRow(document.getElementById(Exid+'EndDate_'+num).parentNode.parentNode);
            }
            return false;
        }
    });
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
                            return;
                        }
                    })
                }
            }                             
        }
    })
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
    
    var select = document.createElement("select"); //税率
    select.setAttribute("class","select2 taxVat newVAT fixedVATDropDown newFee");
    select.setAttribute("id","fixedRentTaxRate_"+count.toLocaleString());
    column8.appendChild(select);
    
    var checkbox = document.createElement("input"); //是否开发票
    checkbox.setAttribute("id","fixedRentInvoiceFlag_"+count.toLocaleString());
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
    updateFeeItems('fixedFeeItemDropDown','fixedVATDropDown','fixedRent');
    var tmp = $('#fixedRentEndDate_'+(parseInt(count)-1).toLocaleString()).val();
    var sd;
    count == 1 ?  sd = $('#startDate').val() : sd = IncrDate(tmp);
    $('#investmentContractAccounttermFixed .input-daterange').datepicker({
        'language': 'zh-CN',
        'format': 'yyyy-mm-dd',
        'todayHighlight': true,
        'startDate': sd,
        'endDate': $('#endDate').val(),
        'autoclose': true
    });
    
    $('#investmentContractAccounttermFixed .select2').select2();
    calBackPushNextCalendar('fixedRent'); 
    
    $('input.money').on('focus',function(){
        $(this).val(accounting.unformat($(this).val()));
        $(this).css({
            'backgroundColor': '#fff',
            'boxShadow': 'inset 6px 6px 2px -6px #000'
        });
        $(this).select();
        $(this).parent().parent().addClass('success');
    });
    
    $('input.money').on('blur',function(){
        $(this).val(accounting.formatNumber($(this).val()));
        $(this).css({
            'backgroundColor': 'transparent',
            'boxShadow': 'none'
        });
        $(this).parent().parent().removeClass('success');
    });
    
    $("#fixedRentEndDate_"+count.toLocaleString()).on('changeDate',function(){
        calBackPushNextCalendar('fixedRent');
        calBackPushFixedRentSingleRow($(this).attr('id').split('_')[1]);
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
    //var column8 = createRowColumn(newrow);
    var column9 = createRowColumn(newrow);
    var column10 = createRowColumn(newrow);
    var column11 = createRowColumn(newrow);
    var column12 = createRowColumn(newrow);
    
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
    select.setAttribute("disabled","disabled");
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
    input.setAttribute("readonly","");
    input.setAttribute("style","border: none");
    input.setAttribute("value","0");
    div.appendChild(input);
    var percent = document.createElement("span");
    percent.innerText = "%";
    percent.setAttribute("class", "input-group-addon");
    div.appendChild(percent);
    column7.appendChild(div);
    
    /*var div = document.createElement("div"); //起始金额
    div.setAttribute("class","input-group");
    var input = document.createElement("input");
    input.setAttribute("class","form-control money");
    input.setAttribute("id","commissionAmount_"+count.toLocaleString());
    input.setAttribute("type","text");
    input.setAttribute("value","0");
    div.appendChild(input);
    var percent = document.createElement("span");
    percent.innerText = "元/月";
    percent.setAttribute("class", "input-group-addon");
    div.appendChild(percent);
    column8.appendChild(div);*/
    
    var div = document.createElement("div"); //保底营业额
    div.setAttribute("class","input-group");
    var input = document.createElement("input");
    input.setAttribute("class","form-control money");
    input.setAttribute("id","commissionMinSales_"+count.toLocaleString());
    input.setAttribute("type","text");
    div.appendChild(input);
    var percent = document.createElement("span");
    percent.innerText = "元/月";
    percent.setAttribute("class", "input-group-addon");
    div.appendChild(percent);
    column9.appendChild(div);
    
    var select = document.createElement("select"); //税率
    select.setAttribute("class","select2 taxVat newVAT commissionVATDropDown newFee");
    select.setAttribute("id","commissionTaxRate_"+count.toLocaleString());
    column10.appendChild(select);
    
    var checkbox = document.createElement("input"); //是否开发票
    checkbox.setAttribute("id","commissionInvoiceFlag_"+count.toLocaleString());
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("checked", "");
    column11.appendChild(checkbox);
    
    var remove = document.createElement("a");
    remove.setAttribute("href", "javascript:void(0);");
    remove.setAttribute("onClick", "deleteRow(this)");
    var icon = document.createElement("i");
    icon.setAttribute("class", "fa fa-minus-circle");
    icon.setAttribute("style", "color: #ED4A52; font-size: 16px;");
    remove.appendChild(icon);
    column12.appendChild(remove);

    tbody.appendChild(newrow);
    updateTaxVAT();
    updateCommissionDropDown('commissionCategoryDropDown','PRODUCT_CATEGORY'); // 商品分类
    updateCommissionDropDown('commissionDeductTypeDropDown','DEDUCT_TYPE'); // 全额/差额
    updateFeeItems('commissionFeeItemDropDown','commissionVATDropDown','deductRent');
    
    var tmp = $('#commissionEndDate_'+(parseInt(count)-1).toLocaleString()).val();
    var sd;
    count == 1 ?  sd = $('#startDate').val() : sd = IncrDate(tmp);
    $('#investmentContractAccounttermCommission .input-daterange').datepicker({
        'language': 'zh-CN',
        'format': 'yyyy-mm-dd',
        'todayHighlight': true,
        'startDate': sd,
        'endDate': $('#endDate').val(),
        'autoclose': true
    });
    
    $('#investmentContractAccounttermCommission .select2').select2();
    calBackPushNextCalendar('commission');
    
    $('input.money').on('focus',function(){
        $(this).val(accounting.unformat($(this).val()));
        $(this).css({
            'backgroundColor': '#fff',
            'boxShadow': 'inset 6px 6px 2px -6px #000'
        });
        $(this).select();
        $(this).parent().parent().addClass('success');
    });
    
    $('input.money').on('blur',function(){
        $(this).val(accounting.formatNumber($(this).val()));
        $(this).css({
            'backgroundColor': 'transparent',
            'boxShadow': 'none'
        });
        $(this).parent().parent().removeClass('success');
    });
    
    $("#commissionEndDate_"+count.toLocaleString()).on('changeDate',function(){
        calBackPushNextCalendar('commission');
        calBackPushCommissionSingleRow($(this).attr('id').split('_')[1]);
    });
    
    $("#commissionTaxDeduct_"+count.toLocaleString()).on('change',function(){
        calBackPushCommissionDeduct();
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
    var tmp = $('#propertyMgmtEndDate_'+(parseInt(count)-1).toLocaleString()).val();
    var sd;
    count == 1 ?  sd = $('#startDate').val() : sd = IncrDate(tmp);
    $('#investmentContractAccounttermPropertyMgmt .input-daterange').datepicker({
        'language': 'zh-CN',
        'format': 'yyyy-mm-dd',
        'todayHighlight': true,
        'startDate': sd,
        'endDate': $('#endDate').val(),
        'autoclose': true
    });
    $('#investmentContractAccounttermPropertyMgmt .select2').select2();
    calBackPushNextCalendar('propertyMgmt');
    
    $('input.money').on('focus',function(){
        $(this).val(accounting.unformat($(this).val()));
        $(this).css({
            'backgroundColor': '#fff',
            'boxShadow': 'inset 6px 6px 2px -6px #000'
        });
        $(this).select();
        $(this).parent().parent().addClass('success');
    });
    
    $('input.money').on('blur',function(){
        $(this).val(accounting.formatNumber($(this).val()));
        $(this).css({
            'backgroundColor': 'transparent',
            'boxShadow': 'none'
        });
        $(this).parent().parent().removeClass('success');
    });
    
    $("#propertyMgmtEndDate_"+count.toLocaleString()).on('changeDate',function(){
        calBackPushNextCalendar('propertyMgmt');
        calBackPushPropertyMgmtSingleRow($(this).attr('id').split('_')[1]);
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

function addRowInvestmentContractAccounttermPromotion() {
    var newrow = document.createElement("tr");
    newrow.setAttribute("class","new");
    var column1 = createRowColumn(newrow);
    var column2 = createRowColumn(newrow);
    var column3 = createRowColumn(newrow);
    var column4 = createRowColumn(newrow);
    var column5 = createRowColumn(newrow);
    //var column6 = createRowColumn(newrow);
    //var column7 = createRowColumn(newrow);
    var column8 = createRowColumn(newrow);
    var column9 = createRowColumn(newrow);
    var column10 = createRowColumn(newrow);
    
    var table = document.getElementById('investmentContractAccounttermPromotion');
    var tbody = table.querySelector('tbody') || table;
    var count = tbody.getElementsByTagName('tr').length + 1;
    column1.innerText = count.toLocaleString();
    
    var select = document.createElement("select"); //费用项
    select.setAttribute("class","select2 promotionFeeItemDropDown new");
    select.setAttribute("id","promotionItem_"+count.toLocaleString());
    select.setAttribute("disabled","disabled");
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
    input.setAttribute("readonly","");
    input.setAttribute("style","border: none");
    div.appendChild(input);
    var percent = document.createElement("span");
    percent.innerText = "元";
    percent.setAttribute("class", "input-group-addon");
    div.appendChild(percent);
    column5.appendChild(div);
    
    /*var div = document.createElement("div"); //含税扣率
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
    input.setAttribute("readonly","");
    input.setAttribute("style","border: none");
    input.setAttribute("value","0");
    div.appendChild(input);
    var percent = document.createElement("span");
    percent.innerText = "%";
    percent.setAttribute("class", "input-group-addon");
    div.appendChild(percent);
    column7.appendChild(div);*/
    
    var select = document.createElement("select"); //税率
    select.setAttribute("class","select2 taxVat newVAT promotionVATDropDown newFee");
    select.setAttribute("id","promotionTaxRate_"+count.toLocaleString());
    column8.appendChild(select);
    
    var checkbox = document.createElement("input"); //是否开发票
    checkbox.setAttribute("id","promotionInvoiceFlag_"+count.toLocaleString());
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
    updateFeeItems('promotionFeeItemDropDown','promotionVATDropDown','promitionFee');
    var tmp = $('#promotionEndDate_'+(parseInt(count)-1).toLocaleString()).val();
    var sd;
    count == 1 ?  sd = $('#startDate').val() : sd = IncrDate(tmp);
    $('#investmentContractAccounttermPromotion .input-daterange').datepicker({
        'language': 'zh-CN',
        'format': 'yyyy-mm-dd',
        'todayHighlight': true,
        'startDate': sd,
        'endDate': $('#endDate').val(),
        'autoclose': true
    });
    $('#investmentContractAccounttermPromotion .select2').select2();
    calBackPushNextCalendar('promotion');
    
    $('input.money').on('focus',function(){
        $(this).val(accounting.unformat($(this).val()));
        $(this).css({
            'backgroundColor': '#fff',
            'boxShadow': 'inset 6px 6px 2px -6px #000'
        });
        $(this).select();
        $(this).parent().parent().addClass('success');
    });
    
    $('input.money').on('blur',function(){
        $(this).val(accounting.formatNumber($(this).val()));
        $(this).css({
            'backgroundColor': 'transparent',
            'boxShadow': 'none'
        });
        $(this).parent().parent().removeClass('success');
    });
    
    $("#promotionEndDate_"+count.toLocaleString()).on('changeDate',function(){
        calBackPushNextCalendar('promotion');
        calBackPushPromotionSingleRow($(this).attr('id').split('_')[1]);
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
        $(this).css({
            'backgroundColor': '#fff',
            'boxShadow': 'inset 6px 6px 2px -6px #000'
        });
        $(this).select();
        $(this).parent().parent().addClass('success');
    });
    
    $('input.money').on('blur',function(){
        $(this).val(accounting.formatNumber($(this).val()));
        $(this).css({
            'backgroundColor': 'transparent',
            'boxShadow': 'none'
        });
        $(this).parent().parent().removeClass('success');
    });
}

function addRowMinSales() {
    var newrow = document.createElement("tr");
    newrow.setAttribute("class","new");
    var column1 = createRowColumn(newrow);
    var column2 = createRowColumn(newrow);
    var column3 = createRowColumn(newrow);
    var column4 = createRowColumn(newrow);
    
    var table = document.getElementById('investmentContractProperteisterm');
    var tbody = table.querySelector('tbody') || table;
    var count = tbody.getElementsByTagName('tr').length + 1;
    column1.innerText = count.toLocaleString();
    
    var div = document.createElement("div"); //期限
    div.setAttribute("class","input-daterange input-group");
    var input = document.createElement("input");
    input.setAttribute("class","form-control");
    input.setAttribute("id","minSalesStartDate_"+count.toLocaleString());
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
    input2.setAttribute("id","minSalesEndDate_"+count.toLocaleString());
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
    column2.appendChild(div);
    
    var div = document.createElement("div"); //金额
    div.setAttribute("class","input-group");
    var input = document.createElement("input");
    input.setAttribute("class","form-control money");
    input.setAttribute("id","minSalesAmount_"+count.toLocaleString());
    input.setAttribute("type","text");
    div.appendChild(input);
    var percent = document.createElement("span");
    percent.innerText = "元";
    percent.setAttribute("class", "input-group-addon");
    div.appendChild(percent);
    column3.appendChild(div);
    
    var remove = document.createElement("a");
    remove.setAttribute("href", "javascript:void(0);");
    remove.setAttribute("onClick", "deleteRow(this)");
    var icon = document.createElement("i");
    icon.setAttribute("class", "fa fa-minus-circle");
    icon.setAttribute("style", "color: #ED4A52; font-size: 16px;");
    remove.appendChild(icon);
    column4.appendChild(remove);

    tbody.appendChild(newrow);
    var tmp = $('#minSalesEndDate_'+(parseInt(count)-1).toLocaleString()).val();
    var sd;
    count == 1 ? sd = $('#startDate').val() : sd = IncrDate(tmp);

    $('#investmentContractProperteisterm .input-daterange').datepicker({
        'language': 'zh-CN',
        'format': 'yyyy-mm-dd',
        'todayHighlight': true,
        'startDate': sd,
        'endDate': $('#endDate').val(),
        'autoclose': true
    });

    calBackPushNextCalendar('minSales'); 
    
    $('input.money').on('focus',function(){
        $(this).val(accounting.unformat($(this).val()));
        $(this).css({
            'backgroundColor': '#fff',
            'boxShadow': 'inset 6px 6px 2px -6px #000'
        });
        $(this).select();
        $(this).parent().parent().addClass('success');
    });
    
    $('input.money').on('blur',function(){
        $(this).val(accounting.formatNumber($(this).val()));
        $(this).css({
            'backgroundColor': 'transparent',
            'boxShadow': 'none'
        });
        $(this).parent().parent().removeClass('success');
    });
    
    $("#minSalesEndDate_"+count.toLocaleString()).on('changeDate',function(){
        calBackPushNextCalendar('minSales');
    })
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
    $('#selectTenant').select2({
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
            url: $.api.baseLotus+"/api/tenant/lotus/findAll",
            type: 'GET',
            dataType: 'json',
            delay: 25,
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

    var newOption = new Option(dataTxt, dataVal, true, true);
    $('#'+id).append(newOption).trigger('change');
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
            $('#'+Exid+'StartDate_'+num).datepicker('setStartDate', IncrDate(tmp));
            $('#'+Exid+'StartDate_'+num).datepicker('update', IncrDate(tmp));
        } else {
            if($('#'+Exid+'EndDate_'+num0).val() == '' && $('#'+Exid+'StartDate_'+num0).val() != ''){
                $('#'+Exid+'EndDate_'+num0).datepicker('setStartDate', IncrDate(tmp));
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
}

function calBackPushCommissionDeduct(){
    $("input[id*='commissionTaxDeduct_']").not('.past').each(function(i){  
        if(numberWithoutCommas($(this).val()) >= 0){
            var num = $(this).attr('id').split('_')[1];
            var taxDeduct = Math.round(numberWithoutCommas($(this).val()) * (1 + parseFloat($('#commissionTaxRate_'+num).val())) * 100) / 100;
            $('#commissionDeduct_'+num).val(accounting.formatNumber(taxDeduct)).fadeOut().fadeIn();
        }
    });
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

function calBackPushPromotionSingleRow(num) {
    if(numberWithoutCommas($('#promotionAmount_'+num).val()) >= 0){
        var taxAmount = Math.round(numberWithoutCommas($('#promotionAmount_'+num).val()) / (1 + parseFloat($('#promotionTaxRate_'+num).val())) * 100) / 100;
        $('#promotionTaxAmount_'+num).val(accounting.formatNumber(taxAmount)).fadeOut().fadeIn();
    }
}

function calBackPushPromotionAmount() {
    $("input[id*='promotionAmount_']").not('.past').each(function(i){  
        if(numberWithoutCommas($(this).val()) >= 0){
            var num = $(this).attr('id').split('_')[1];
            var taxAmount = Math.round(numberWithoutCommas($(this).val()) / (1 + parseFloat($('#promotionTaxRate_'+num).val())) * 100) / 100;
            $('#promotionTaxAmount_'+num).val(accounting.formatNumber(taxAmount)).fadeOut().fadeIn();
        }
    });
}

function calBackPushPromotionDeduct(){
    $("input[id*='promotionDeduct_']").not('.past').each(function(i){  
        if(numberWithoutCommas($(this).val()) >= 0){
            var num = $(this).attr('id').split('_')[1];
            var deduct = Math.round(numberWithoutCommas($(this).val()) / (1 + parseFloat($('#promotionTaxRate_'+num).val())) * 100) / 100;
            $('#promotionTaxDeduct_'+num).val(accounting.formatNumber(deduct)).fadeOut().fadeIn();
        }
    });
}

function calBackPush(prefix){
    var path;
    switch (prefix) {
        case "fixedRent":
            path = 'fixedRentCalc';
            break;
        case "propertyMgmt":
            path = 'propertyFeeCalc';
            break;
        default:
            break;
    }
    var fixedRent = {};
    var fixedRentList = [];
    var propertyFee = {};
    var propertyFeeList = [];
    sessionStorage.setItem("rentCalcList",null);
    sessionStorage.setItem("propertyCalcList",null);
    $("#"+prefix).find("tr").each(function(){
        var tdArr = $(this).children();
        var amount = tdArr.eq(5).find('input').val();
        var startDate = tdArr.eq(2).find("input[id*='"+prefix+"StartDate_']").val();
        var endDate = tdArr.eq(2).find("input[id*='"+prefix+"EndDate_']").val();
        var itemCode = tdArr.eq(1).find('select').val();
        var rentAmount = tdArr.eq(6).find('input').val();
        var taxAmount = tdArr.eq(4).find('input').val();
        var taxCode = tdArr.eq(7).find('select option:selected').attr('data-code');
        var taxRate = tdArr.eq(7).find('select').val();
        var taxRentAmount = tdArr.eq(3).find('input').val();
        
        if(path == 'fixedRentCalc'){
            if(amount != '' && startDate != '' && endDate != '' && itemCode != '' && rentAmount != '' && taxAmount != '' && taxCode != '' && taxRate != '' && taxRentAmount != ''){
                fixedRent = {
                    "amount": numberWithoutCommas(tdArr.eq(5).find('input').val()),
                    "startDate": tdArr.eq(2).find("input[id*='"+prefix+"StartDate_']").val(),
                    "endDate":  tdArr.eq(2).find("input[id*='"+prefix+"EndDate_']").val(),
                    "itemCode": tdArr.eq(1).find('select').val(),
                    "rentAmount": numberWithoutCommas(tdArr.eq(6).find('input').val()),
                    "taxAmount": numberWithoutCommas(tdArr.eq(4).find('input').val()),
                    "taxCode": taxCode,
                    "taxRate": tdArr.eq(7).find('select').val(),
                    "taxRentAmount": numberWithoutCommas(tdArr.eq(3).find('input').val())
                }
                fixedRentList.push(fixedRent);
            }
        } else if(path == 'propertyFeeCalc'){
            if(amount != '' && startDate != '' && endDate != '' && itemCode != '' && rentAmount != '' && taxAmount != '' && taxCode != '' && taxRate != '' && taxRentAmount != ''){
                propertyFee = {
                    "amount": numberWithoutCommas(tdArr.eq(5).find('input').val()),
                    "startDate": tdArr.eq(2).find("input[id*='"+prefix+"StartDate_']").val(),
                    "endDate":  tdArr.eq(2).find("input[id*='"+prefix+"EndDate_']").val(),
                    "itemCode": tdArr.eq(1).find('select').val(),
                    "rentAmount": numberWithoutCommas(tdArr.eq(6).find('input').val()),
                    "taxAmount": numberWithoutCommas(tdArr.eq(4).find('input').val()),
                    "taxCode": taxCode,
                    "taxRate": tdArr.eq(7).find('select').val(),
                    "taxRentAmount": numberWithoutCommas(tdArr.eq(3).find('input').val())
                }
                propertyFeeList.push(propertyFee);
            }
        }
    });
        
    if(fixedRentList.length > 0 || propertyFeeList.length > 0){
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
                "contractType": contractType,
                "unitCode": unitCode,
                "mallCode": $.cookie('mallSelected').split(':::')[1],
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
                "contractType": contractType,
                "unitCode": unitCode,
                "mallCode": $.cookie('mallSelected').split(':::')[1],
                "propertyFeeList": propertyFeeList
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
        default:
            break;
    }
    
    $('#accountTerm').html('');
    var terms = JSON.parse(sessionStorage.getItem(sessionTerm));
    if(terms != null && terms.length > 0){
        $.each(terms, function(i,v) {
            $('#accountTerm').append('<tr>\n\
                <td>'+(i+1)+'</td>\n\
                <td>'+v.startDate+'</td>\n\
                <td>'+v.endDate+'</td>\n\
                <td>'+accounting.formatNumber(v.amount)+'</td>\n\
                <td>'+accounting.formatNumber(v.taxAmount)+'</td></tr>'
            );
        })
    }
    
    $('#investment-contract-accountterm-account').modal('toggle');
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

function redirectCheck(id) {
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
        saveContractInfoForRequest($('#'+id+'UpdateFormType').val());
    }
}

function saveContractInfoForRequest(id) {
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
                    
                    window.location.href = '/lotus-admin/'+path+'-request?id='+response.data.bizId;
                }
            } else {
                alertMsg(response.code,response.customerMessage);
            }
        }
    })
}

function activateAddDeleteRow(){
    if($('#investmentContractAccounttermFixed tbody tr').length > 0){
        $('#investmentContractAccounttermFixed .box-header .pull-right a').attr('onClick','addRowInvestmentContractAccounttermFixed()').css('opacity',1);
    }
    if($('#investmentContractAccounttermCommission tbody tr').length > 0){
        $('#investmentContractAccounttermCommission .box-header .pull-right a').attr('onClick','addRowInvestmentContractAccounttermCommission()').css('opacity',1);
    }
    if($('#investmentContractAccounttermPropertyMgmt tbody tr').length > 0){
        $('#investmentContractAccounttermPropertyMgmt .box-header .pull-right a').attr('onClick','addRowInvestmentContractAccounttermPropertyMgmt()').css('opacity',1);
    }
    if($('#investmentContractAccounttermPromotion tbody tr').length > 0){
        $('#investmentContractAccounttermPromotion .box-header .pull-right a').attr('onClick','addRowInvestmentContractAccounttermPromotion()').css('opacity',1);
    }
    $('#investmentContractProperteisterm .box-body .pull-right a').attr('onClick','addRowMinSales()').css('opacity',1);
    
    $('tbody tr').not('.past').find('.fa-minus-circle').parent().attr('onClick','deleteRow(this)');
    $('tbody tr').not('.past').find('.fa-minus-circle').parent().css('opacity',1);
}

function modifyTypeCheck() {
    if($('#contractModifyType').val() != ''){
        $("#selectTenant, #brandName, #contractName, #startDate, #endDate, input.money, tbody input[id*='TaxRate_'], tbody input[id*='InvoiceFlag_'], \n\
        tbody input[id*='StartDate_'], tbody input[id*='EndDate_'], #investmentContractEnteryterm input, #selectRentCalculationMode, #targetSales").attr('disabled','disabled');
        $('#startDate, #endDate, #investmentContractEnteryterm input, #targetSales').next().css({
            'border': 'none',
            'background': '#eee'
        });
        $('#investmentContractAccounttermFixed .box-header .pull-right a').removeAttr('onClick').css('opacity',0.5);
        $('#investmentContractAccounttermCommission .box-header .pull-right a').removeAttr('onClick').css('opacity',0.5);
        $('#investmentContractAccounttermPropertyMgmt .box-header .pull-right a').removeAttr('onClick').css('opacity',0.5);
        $('#investmentContractAccounttermPromotion .box-header .pull-right a').removeAttr('onClick').css('opacity',0.5);
        $('#investmentContractProperteisterm .box-body .pull-right a').removeAttr('onClick').css('opacity',0.5);
        $('tbody .fa-minus-circle').parent().removeAttr('onClick');
        $('tbody .fa-minus-circle').parent().css('opacity',0.5);
        
        $("input[id*='StartDate_']").datepicker('setStartDate',$('#startDate').val());
        $("input[id*='StartDate_']").datepicker('setEndDate',$('#endDate').val());
        $("input[id*='EndDate_']").datepicker('setStartDate',$('#startDate').val());
        $("input[id*='EndDate_']").datepicker('setEndDate',$('#endDate').val());
        
        switch ($('#contractModifyType').val()) {
            case "TENANT_CHANGE":
                $("#selectTenant, tbody input[id*='StartDate_'], tbody input[id*='EndDate_']").not('.past').removeAttr('disabled');
                $("tbody input.money, tbody input[id*='TaxRate_'], tbody input[id*='InvoiceFlag_']").removeAttr('disabled');
                
                activateAddDeleteRow();
                break;
            case "BRAND_CHANGE":
                $("#brandName, #contractName, tbody input[id*='StartDate_'], tbody input[id*='EndDate_']").not('.past').removeAttr('disabled');
                $("tbody input.money, tbody input[id*='TaxRate_'], tbody input[id*='InvoiceFlag_']").removeAttr('disabled');
                
                activateAddDeleteRow();
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
                
                activateAddDeleteRow();
                break;
            case "CLAUSE_CHANGE":
                $("#selectRentCalculationMode, tbody input[id*='StartDate_'], tbody input[id*='EndDate_'], #targetSales").not('.past').removeAttr('disabled');
                $("input.money, tbody input[id*='TaxRate_'], tbody input[id*='InvoiceFlag_']").removeAttr('disabled');
                $("#targetSales").next().css({
                    'border': '1px solid #d2d6de',
                    'borderLeft': 'none',
                    'background': 'transparent'
                });
                
                activateAddDeleteRow();
                break;
            default:
                break;
        }
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

// Settings object that controls default parameters for library methods:
accounting.settings = {
    currency: {
            symbol : "¥",   // default currency symbol is '$'
            format: "%s%v", // controls output: %s = symbol, %v = value/number (can be object: see below)
            decimal : ".",  // decimal point separator
            thousand: ",",  // thousands separator
            precision : 2   // decimal places
    },
    number: {
            precision : 2,  // default precision on numbers is 0
            thousand: ",",
            decimal : "."
    }
}