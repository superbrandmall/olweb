$.api = {
    base: $.base,
    baseLotus: $.base+"/onlineleasing-lotus",
    baseAdmin: $.base+"/onlineleasing-admin",
    dictModule: [],
    unitType: ['KOW','kow'],
    dictContractType: 2, //KOW
    contractType: ['租赁','leasing'],
    formType: ['新签','new'],
    paymentMode: ['月付','M'],
    posMode: ['不用POS自收银','unUse'],
    profitCenter: ['KOW部','kow'],
    rentCalculationMode: ['纯固租','fixRent']
};

var d = new Date();
var month = d.getMonth()+1;
var day = d.getDate();
var date = d.getFullYear() + '-' +
    (month<10 ? '0' : '') + month + '-' +
    (day<10 ? '0' : '') + day;

$(document).ready(function(){
    if($.cookie('userModules') && $.cookie('userModules') != '' && $.cookie('userModules') != null){
//        $.each(JSON.parse($.cookie('userModules')), function(i,v) {
//            if(v.roleCode == 'CROLE211008000002' && v.moduleCode == 'ALL'){
//                $('.location-select ul li, .mall-select ul li').show();
//                if($.inArray(v.userCode,['CUSER200524000004','CUSER210628000002','CUSER220615000002']) == -1){
//                    $('.sidebar-menu > li').hide();
//                    $('.sidebar-menu > li:eq(0), .sidebar-menu > li:eq(5)').show();
//                }
//                return false;
//            } else if(v.roleCode == 'CROLE211008000001' && v.moduleName == 'KOW') {
//                $('.sidebar-menu > li').hide();
//                $('.sidebar-menu > li:eq(0), .sidebar-menu > li:eq(5)').show();
//                $('.mall-select ul li').each(function(i,elem){
//                    if($(elem).find('a').attr('data-code') == v.moduleCode){
//                        $(this).show();
//                    }
//                })
//            }
//        })
        
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
    }
    
    $('.location-select .text-blue').click(function(){
        $.cookie('locationSelected',$(this).find('span').text()+':::'+$(this).attr('data-code'));
        $('#locationSelected').text($.cookie('locationSelected').split(':::')[0]);
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
    
    scrollJump();
    
    $('.date-picker, .input-daterange').datepicker({
        'language': 'zh-CN',
        'format': 'yyyy-mm-dd',
        'todayBtn': "linked",
        'todayHighlight': true,
        'startDate': '',
        'endDate': '',
        'autoclose': true
    });
})

function alertMsg(code,m) {
    var msg,color,style;
    switch (code) {
        case "JWT0002":
            msg = m+"，请重新 <strong><a href='javascript: logout();'>登录</a></strong>！";
            color = "danger";
            style = ' style="z-index: 1029;position: fixed; left:165px; right: 15px; top: 152px;"';
            break;
        default:
            msg = m;
            color = "danger";
            style = ' style="z-index: 1029;position: fixed; left:165px; right: 15px; top: 152px;"';
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
            url: $.api.baseLotus+"/api/user/role/yzj/findAllByRoleId",
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
                            data = {
                                id: item.openId,
                                text: item.name
                            }
                            var returnData = [];
                            returnData.push(data);
                            return returnData;
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

function updateSelectMallDropDown(data_count) {
    $('#mallCode').select2({
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
                return $.api.baseLotus+"/api/mall/lotus/findAllByFreeCondition?page="+(params.page || 0)+"&size="+data_count+"&sort=id,asc";
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
                    key: params.term || 'kow',
                    operator: "OR",
                    params: [
                      "mallName", "mallType"
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
                                text: item.mallName            
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

function updateStartDatepicker() {
    $("input[id*='StartDate_1']").datepicker('setStartDate',$('#startDate').val());
    $("input[id*='StartDate_1']").datepicker('update',$('#startDate').val());
}

function updateEndDatepicker(Exid) {
    $("input[id*='"+Exid+"EndDate_']").each(function(i){  
        var num = i + 1;
        if($('#'+Exid+'EndDate_'+(parseInt(num)+1)).length <= 0){
            $('#'+Exid+'EndDate_'+num).datepicker('setEndDate',$('#endDate').val());
            $('#'+Exid+'EndDate_'+num).datepicker('update',$('#endDate').val());
            return;
        }
    });  
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
    
    var div = document.createElement("div"); //金额(含税)
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
    column4.appendChild(div);
    
    var div = document.createElement("div"); //单价(含税)
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
    column5.appendChild(div);
    
    var div = document.createElement("div"); //金额(去税)
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
    column6.appendChild(div);
    
    var div = document.createElement("div"); //单价(去税)
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
        calBackPushFixedRentSingleRow($(this).attr('id').split('_')[1]);
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
    var column1 = createRowColumn(newrow);
    var column2 = createRowColumn(newrow);
    var column3 = createRowColumn(newrow);
    var column4 = createRowColumn(newrow);
    var column5 = createRowColumn(newrow);
    var column6 = createRowColumn(newrow);
    var column7 = createRowColumn(newrow);
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
    select.options[0] = new Option('单一扣率','1');
    select.setAttribute("disabled","disabled");
    column4.appendChild(select);
    
    var select = document.createElement("select"); //商品分类
    select.setAttribute("class","select2 commissionCategoryDropDown new");
    select.setAttribute("id","commissionCategory_"+count.toLocaleString());
    select.options[0] = new Option('默认商品','A01');
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
    
    var div = document.createElement("div"); //金额(含税)
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
    column4.appendChild(div);
    
    var div = document.createElement("div"); //月面积单价(含税)
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
    column5.appendChild(div);
    
    var div = document.createElement("div"); //金额(去税)
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
    column6.appendChild(div);
    
    var div = document.createElement("div"); //月面积单价(去税) 
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
        calBackPushPropertyMgmtSingleRow($(this).attr('id').split('_')[1]);
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
    var column1 = createRowColumn(newrow);
    var column2 = createRowColumn(newrow);
    var column3 = createRowColumn(newrow);
    var column4 = createRowColumn(newrow);
    var column5 = createRowColumn(newrow);
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
    select.options[1] = new Option('装修保证金[E02]','E03');
    select.options[2] = new Option('公共事业费押金[E22]','E22');
    column2.appendChild(select);
    
    column3.innerText = '付';
    
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
    
    var div = document.createElement("div"); //最后返还日
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

function addRowContactList() {
    var newrow = document.createElement("tr");
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
    for (var i = 0; i < rows.length; i++) {
        var currentRow = rows[i];
        currentRow.childNodes[0].innerText = (i+1).toLocaleString();
        //var td = currentRow.cells;
        var id = tbody.getAttribute("id");
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

function updateSelectTenantDropDown(data_count, id, dataTxt, dataVal) {
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
        var taxAmount = Math.round(numberWithoutCommas($('#fixedRentTaxRentAmount_'+num).val()) * $('#area').val() * 365 / 12 * 100) / 100; //月金额(去税)
        var amount = Math.round(taxAmount * (1 + parseFloat($('#fixedRentTaxRate_'+num).val())) * 100) / 100; //金额(含税)
        var rentAmount = Math.round(amount * 12 / 365 / $('#area').val() * 100) / 100; //单价(含税)
        $('#fixedRentAmount_'+num).val(accounting.formatNumber(amount)).fadeOut().fadeIn(); //金额(含税)
        $('#fixedRentRentAmount_'+num).val(accounting.formatNumber(rentAmount)).fadeOut().fadeIn(); //单价(含税)
        $('#fixedRentTaxAmount_'+num).val(accounting.formatNumber(taxAmount)).fadeOut().fadeIn(); //金额(去税)
    }
    calBackPush('fixedRent');
}

function calBackPushFixedRentAmount() { //金额(含税)
    $("input[id*='fixedRentAmount_']").not('.past').each(function(i){  
        if(numberWithoutCommas($(this).val()) >= 0 && numberWithoutCommas($('#area').val()) > 0){
            var num = $(this).attr('id').split('_')[1];
            var taxAmount = Math.round(numberWithoutCommas($(this).val()) / (1 + parseFloat($('#fixedRentTaxRate_'+num).val())) * 100) / 100; //金额(去税)
            var rentAmount; //单价(含税)
            var taxRentAmount; //单价(去税)
            if($('#fixedRentSettlePeriod_1').val() == 'D'){
                rentAmount = Math.round(numberWithoutCommas($(this).val()) / $('#area').val() * 100) / 100; //单价(含税)
                taxRentAmount = Math.round(taxAmount / $('#area').val() * 100) / 100; //单价(去税)
            } else if($('#fixedRentSettlePeriod_1').val() == 'T' && $('#fixedRentStartDate_'+num).val() != '' && $('#fixedRentEndDate_'+num).val() != ''){
                rentAmount = Math.round(numberWithoutCommas($(this).val()) / calDatesDiff($('#fixedRentStartDate_'+num).val(),$('#fixedRentEndDate_'+num).val()) / $('#area').val() * 100) / 100; //单价(含税)
                taxRentAmount = Math.round(taxAmount / calDatesDiff($('#fixedRentStartDate_'+num).val(),$('#fixedRentEndDate_'+num).val()) / $('#area').val() * 100) / 100; //单价(去税)
            } else {
                rentAmount = Math.round(numberWithoutCommas($(this).val()) * 12 / 365 / $('#area').val() * 100) / 100; //单价(含税)
                taxRentAmount = Math.round(taxAmount * 12 / 365 / $('#area').val() * 100) / 100; //单价(去税)
            }
            $('#fixedRentRentAmount_'+num).val(accounting.formatNumber(rentAmount)).fadeOut().fadeIn(); //单价(含税)
            $('#fixedRentTaxAmount_'+num).val(accounting.formatNumber(taxAmount)).fadeOut().fadeIn(); //金额(去税)
            $('#fixedRentTaxRentAmount_'+num).val(accounting.formatNumber(taxRentAmount)).fadeOut().fadeIn(); //单价(去税)
        }
    });
    calBackPush('fixedRent');
}

function calBackPushFixedRentRentAmount() { //单价(含税)
    $("input[id*='fixedRentRentAmount_']").not('.past').each(function(i){  
        if(numberWithoutCommas($(this).val()) >= 0 && numberWithoutCommas($('#area').val()) > 0){
            var num = $(this).attr('id').split('_')[1];
            var amount = Math.round(numberWithoutCommas($(this).val()) * $('#area').val() * 365 / 12 * 100) / 100; //金额(含税)
            var taxAmount = Math.round(amount / (1 + parseFloat($('#fixedRentTaxRate_'+num).val())) * 100) / 100; //金额(去税)
            var taxRentAmount; //单价(去税)
            if($('#fixedRentSettlePeriod_1').val() == 'D'){
                taxRentAmount = Math.round(taxAmount / $('#area').val() * 100) / 100; //单价(去税)
            } else if($('#fixedRentSettlePeriod_1').val() == 'T' && $('#fixedRentStartDate_'+num).val() != '' && $('#fixedRentEndDate_'+num).val() != ''){
                taxRentAmount = Math.round(taxAmount / calDatesDiff($('#fixedRentStartDate_'+num).val(),$('#fixedRentEndDate_'+num).val()) / $('#area').val() * 100) / 100; //单价(去税)
            } else {
                taxRentAmount = Math.round(taxAmount * 12 / 365 / $('#area').val() * 100) / 100; //单价(去税)
            }
            $('#fixedRentAmount_'+num).val(accounting.formatNumber(amount)).fadeOut().fadeIn(); //金额(含税)
            $('#fixedRentTaxAmount_'+num).val(accounting.formatNumber(taxAmount)).fadeOut().fadeIn(); //金额(去税)
            $('#fixedRentTaxRentAmount_'+num).val(accounting.formatNumber(taxRentAmount)).fadeOut().fadeIn(); //单价(去税)
        }
    });
    calBackPush('fixedRent');
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
        var taxAmount = Math.round(numberWithoutCommas($('#propertyMgmtTaxRentAmount_'+num).val()) * $('#area').val() * 100) / 100; //金额(去税)
        var amount = Math.round(taxAmount * (1 + parseFloat($('#propertyMgmtTaxRate_'+num).val())) * 100) / 100; //金额(含税)
        var rentAmount = Math.round(amount / $('#area').val() * 100) / 100; //月面积单价(含税)
        $('#propertyMgmtAmount_'+num).val(accounting.formatNumber(amount)).fadeOut().fadeIn(); //金额(含税)
        $('#propertyMgmtRentAmount_'+num).val(accounting.formatNumber(rentAmount)).fadeOut().fadeIn(); //月面积单价(含税)
        $('#propertyMgmtTaxAmount_'+num).val(accounting.formatNumber(taxAmount)).fadeOut().fadeIn(); //金额(去税)
    }
    calBackPush('propertyMgmt');
}

function calBackPushPropertyMgmtAmount() { //金额(含税)
    $("input[id*='propertyMgmtAmount_']").not('.past').each(function(i){  
        if(numberWithoutCommas($(this).val()) >= 0 && numberWithoutCommas($('#area').val()) > 0){
            var num = $(this).attr('id').split('_')[1];
            var taxAmount = Math.round(numberWithoutCommas($(this).val()) / (1 + parseFloat($('#propertyMgmtTaxRate_'+num).val())) * 100) / 100; //金额(去税)
            var rentAmount; //月面积单价(含税)
            var taxRentAmount; //月面积单价(去税)
            if($('#fixedRentSettlePeriod_1').val() == 'D'){
                rentAmount = Math.round(numberWithoutCommas($(this).val()) * 365 / 12 / $('#area').val() * 100) / 100; //月面积单价(含税)
                taxRentAmount = Math.round(taxAmount * 365 / 12 / $('#area').val() * 100) / 100; //月面积单价(去税)
            } else if($('#fixedRentSettlePeriod_1').val() == 'T' && $('#propertyMgmtStartDate_'+num).val() != '' && $('#propertyMgmtEndDate_'+num).val() != ''){
                rentAmount = Math.round(numberWithoutCommas($(this).val()) / calDatesDiff($('#propertyMgmtStartDate_'+num).val(),$('#propertyMgmtEndDate_'+num).val()) * 365 / 12 / $('#area').val() * 100) / 100; //月面积单价(含税)
                taxRentAmount = Math.round(taxAmount / calDatesDiff($('#propertyMgmtStartDate_'+num).val(),$('#propertyMgmtEndDate_'+num).val()) * 365 / 12 / $('#area').val() * 100) / 100; //月面积单价(去税)
            } else {
                rentAmount = Math.round(numberWithoutCommas($(this).val()) / $('#area').val() * 100) / 100; //月面积单价(含税)
                taxRentAmount = Math.round(taxAmount / $('#area').val() * 100) / 100; //月面积单价(去税)
            }
            $('#propertyMgmtRentAmount_'+num).val(accounting.formatNumber(rentAmount)).fadeOut().fadeIn(); //月面积单价(含税)
            $('#propertyMgmtTaxAmount_'+num).val(accounting.formatNumber(taxAmount)).fadeOut().fadeIn(); //金额(去税)
            $('#propertyMgmtTaxRentAmount_'+num).val(accounting.formatNumber(taxRentAmount)).fadeOut().fadeIn(); //月面积单价(去税)
        }
    });
    calBackPush('propertyMgmt');
}

function calBackPushPropertyMgmtRentAmount() { //月面积单价(含税)
    $("input[id*='propertyMgmtRentAmount_']").not('.past').each(function(i){  
        if(numberWithoutCommas($(this).val()) >= 0 && numberWithoutCommas($('#area').val()) > 0){
            var num = $(this).attr('id').split('_')[1];
            var amount = Math.round(numberWithoutCommas($(this).val()) * $('#area').val() * 100) / 100; //金额(含税)
            var taxAmount = Math.round(amount / (1 + parseFloat($('#propertyMgmtTaxRate_'+num).val())) * 100) / 100; //金额(去税)
            var taxRentAmount; //月面积单价(去税)
            if($('#fixedRentSettlePeriod_1').val() == 'D'){
                taxRentAmount = Math.round(taxAmount * 365 / 12 / $('#area').val() * 100) / 100; //月面积单价(去税)
            } else if($('#fixedRentSettlePeriod_1').val() == 'T' && $('#propertyMgmtStartDate_'+num).val() != '' && $('#propertyMgmtEndDate_'+num).val() != ''){
                taxRentAmount = Math.round(taxAmount / calDatesDiff($('#propertyMgmtStartDate_'+num).val(),$('#propertyMgmtEndDate_'+num).val()) * 365 / 12 / $('#area').val() * 100) / 100; //月面积单价(去税)
            } else {
                taxRentAmount = Math.round(taxAmount / $('#area').val() * 100) / 100; //月面积单价(去税)
            }
            $('#propertyMgmtAmount_'+num).val(accounting.formatNumber(amount)).fadeOut().fadeIn(); //金额(含税)
            $('#propertyMgmtTaxAmount_'+num).val(accounting.formatNumber(taxAmount)).fadeOut().fadeIn(); //金额(去税)
            $('#propertyMgmtTaxRentAmount_'+num).val(accounting.formatNumber(taxRentAmount)).fadeOut().fadeIn(); //月面积单价(去税)
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
    $("#"+prefix).find("tr").each(function(){
        var tdArr = $(this).children();
        var amount = tdArr.eq(3).find('input').val();
        var startDate = tdArr.eq(2).find("input[id*='"+prefix+"StartDate_']").val();
        var endDate = tdArr.eq(2).find("input[id*='"+prefix+"EndDate_']").val();
        var itemCode = tdArr.eq(1).find('select').val();
        var rentAmount = tdArr.eq(4).find('input').val();
        var taxAmount = tdArr.eq(5).find('input').val();
        var taxCode = tdArr.eq(7).find('select option:selected').attr('data-code');
        var taxRate = tdArr.eq(7).find('select').val();
        var taxRentAmount = tdArr.eq(6).find('input').val();
        
        if(path == 'fixedRentCalc'){
            if(amount != '' && startDate != '' && endDate != '' && itemCode != '' && rentAmount != '' && taxAmount != '' && taxCode != '' && taxRate != '' && taxRentAmount != ''){
                fixedRent = {
                    "amount": numberWithoutCommas(tdArr.eq(3).find('input').val()),
                    "startDate": tdArr.eq(2).find("input[id*='"+prefix+"StartDate_']").val(),
                    "endDate":  tdArr.eq(2).find("input[id*='"+prefix+"EndDate_']").val(),
                    "itemCode": tdArr.eq(1).find('select').val(),
                    "rentAmount": numberWithoutCommas(tdArr.eq(4).find('input').val()),
                    "taxAmount": numberWithoutCommas(tdArr.eq(5).find('input').val()),
                    "taxCode": taxCode,
                    "taxRate": tdArr.eq(7).find('select').val(),
                    "taxRentAmount": numberWithoutCommas(tdArr.eq(6).find('input').val())
                }
                fixedRentList.push(fixedRent);
            }
        } else if(path == 'propertyFeeCalc'){
            if(amount != '' && startDate != '' && endDate != '' && itemCode != '' && rentAmount != '' && taxAmount != '' && taxCode != '' && taxRate != '' && taxRentAmount != ''){
                propertyFee = {
                    "amount": numberWithoutCommas(tdArr.eq(3).find('input').val()),
                    "startDate": tdArr.eq(2).find("input[id*='"+prefix+"StartDate_']").val(),
                    "endDate":  tdArr.eq(2).find("input[id*='"+prefix+"EndDate_']").val(),
                    "itemCode": tdArr.eq(1).find('select').val(),
                    "rentAmount": numberWithoutCommas(tdArr.eq(4).find('input').val()),
                    "taxAmount": numberWithoutCommas(tdArr.eq(5).find('input').val()),
                    "taxCode": taxCode,
                    "taxRate": tdArr.eq(7).find('select').val(),
                    "taxRentAmount": numberWithoutCommas(tdArr.eq(6).find('input').val())
                }
                propertyFeeList.push(propertyFee);
            }
        }
    });
        
    if(fixedRentList.length > 0 || propertyFeeList.length > 0){
        if(path == 'fixedRentCalc' && $('#fixedRentSettlePeriod_1').val() == 'D'){
            if($('#startDate').val() != '' && $('#endDate').val() != ''){
                var amount = 0;
                var taxAmount = 0;
                var ind;
                for(var i=0;i<fixedRentList.length;i++){
                    ind = i * 1 + 1;
                    amount = amount * 1 + Math.round(fixedRentList[i].amount * calDatesDiff($('#fixedRentStartDate_'+ind).val(),$('#fixedRentEndDate_'+ind).val()) * 100) / 100;
                    taxAmount = taxAmount * 1 + Math.round(fixedRentList[i].taxAmount * calDatesDiff($('#fixedRentStartDate_'+ind).val(),$('#fixedRentEndDate_'+ind).val()) * 100) / 100;
                }
                $('#'+prefix+'TotalRentAmount').text(accounting.formatNumber(amount));
                $('#'+prefix+'TaxTotalRentAmount').text(accounting.formatNumber(taxAmount)); 
            }
        } else if(path == 'fixedRentCalc' && $('#fixedRentSettlePeriod_1').val() == 'T'){
            if($('#startDate').val() != '' && $('#endDate').val() != ''){
                var amount = 0;
                var taxAmount = 0;
                for(var i=0;i<fixedRentList.length;i++){
                    amount = amount * 1 + fixedRentList[i].amount * 1;
                    taxAmount = taxAmount * 1 + fixedRentList[i].taxAmount * 1;
                }
                $('#'+prefix+'TotalRentAmount').text(accounting.formatNumber(amount));
                $('#'+prefix+'TaxTotalRentAmount').text(accounting.formatNumber(taxAmount));  
            }
        } else if(path == 'propertyFeeCalc' && $('#propertyMgmtSettlePeriod_1').val() == 'D'){
            if($('#startDate').val() != '' && $('#endDate').val() != ''){
                var amount = 0;
                var taxAmount = 0;
                var ind;
                for(var i=0;i<propertyFeeList.length;i++){
                    ind = i * 1 + 1;
                    amount = amount * 1 + Math.round(propertyFeeList[0].amount * calDatesDiff($('#propertyMgmtStartDate_'+ind).val(),$('#propertyMgmtEndDate_'+ind).val()) * 100) / 100;
                    taxAmount = taxAmount * 1 + Math.round(propertyFeeList[0].taxAmount * calDatesDiff($('#propertyMgmtStartDate_'+ind).val(),$('#propertyMgmtEndDate_'+ind).val()) * 100) / 100;
                }
                $('#'+prefix+'TotalPropertyAmount').text(accounting.formatNumber(amount));
                $('#'+prefix+'TaxTotalPropertyAmount').text(accounting.formatNumber(taxAmount));
            }
        } else if(path == 'propertyFeeCalc' && $('#propertyMgmtSettlePeriod_1').val() == 'T'){
            if($('#startDate').val() != '' && $('#endDate').val() != ''){
                var amount = 0;
                var taxAmount = 0;
                for(var i=0;i<propertyFeeList.length;i++){
                    amount = amount * 1 + propertyFeeList[i].amount * 1;
                    taxAmount = taxAmount * 1 + propertyFeeList[i].taxAmount * 1;
                }
                $('#'+prefix+'TotalPropertyAmount').text(accounting.formatNumber(amount));
                $('#'+prefix+'TaxTotalPropertyAmount').text(accounting.formatNumber(taxAmount));
                
            }
        } else {
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
                    "mallCode": $('#mallCode').val(),
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
                    "mallCode": $('#mallCode').val(),
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
                            } else if (path == 'propertyFeeCalc' && response.data.propertyCalcList.length > 0){
                                $('#'+prefix+'TotalPropertyAmount').text(accounting.formatNumber(response.data.totalPropertyAmount));
                                $('#'+prefix+'TaxTotalPropertyAmount').text(accounting.formatNumber(response.data.taxTotalPropertyAmount));
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
        }
    } else {
        if(path == 'fixedRentCalc'){
            $('#'+prefix+'TotalRentAmount').text(accounting.formatNumber(0));
            $('#'+prefix+'TaxTotalRentAmount').text(accounting.formatNumber(0));
        } else if (path == 'propertyFeeCalc'){
            $('#'+prefix+'TotalPropertyAmount').text(accounting.formatNumber(0));
            $('#'+prefix+'TaxTotalPropertyAmount').text(accounting.formatNumber(0));
        } 
    }
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
                            modal.find('.ok').click(function () { callback(true); });
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
            format: "%v", // controls output: %s = symbol, %v = value/number (can be object: see below)
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