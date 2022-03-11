$.api = {
    base: $.base,
    baseLotus: $.base+"/onlineleasing-lotus",
    baseAdmin: $.base+"/onlineleasing-admin",
    dictModule: [],
    dictContractType: 1, //租赁
    contractType: ['租赁','leasing'],
    posMode: ['不用POS自收银','unUse'],
    profitCenter: ['租赁部','rent'],
    rentCalculationMode: ['固租','fixRent']
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
            if(v.code == 'CROLE211008000002' && v.moduleCode == 'ALL'){
                $('.location-select ul li, .mall-select ul li').show();
                return false;
            } else if(v.code == 'CROLE211008000001' && v.moduleName == '门店对接人') {
                $('.sidebar-menu > li').hide();
                $('.sidebar-menu > li:eq(5)').show();
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
            style = ' style="position: fixed; z-index: 9999; left: 20%; right: 20%; top: 40%;"';
            break;
        default:
            msg = m;
            color = "danger";
            style = '';
            break;
    }
    
    var msgDiv = '<div id="msgDiv" class="row"'+style+'>\n\
            <div class="col-md-12">\n\
                    <h5 class="callout callout-'+color+'">'+msg+'</h5>\n\
                </div>\n\
            </div>';

    $('#webui').prepend(msgDiv);
    $('html, body').animate({
        scrollTop: $('#webui').offset().top
    }, 0);
    setTimeout(function () {
        $('#msgDiv').remove();
    }, 3000);
}

function successMsg(code,m) {
    var msg,color,style;
    switch (code) {
        default:
            msg = m;
            color = "success";
            style = ' style="z-index: 1000;position: fixed;width: 100%;top: 200px;"';
            break;
    }
    
    var msgDiv = '<div id="msgDiv" class="row"'+style+'>\n\
            <div class="col-md-12">\n\
                    <h5 class="callout callout-'+color+'">'+msg+'</h5>\n\
                </div>\n\
            </div>';

    $('#webui').prepend(msgDiv);
    setTimeout(function () {
        $('#msgDiv').remove();
    }, 3000); 
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