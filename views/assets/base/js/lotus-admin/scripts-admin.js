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
    if($.cookie('userModules') && $.cookie('userModules') != '' && $.cookie('userModules') != null){
        $.each(JSON.parse($.cookie('userModules')), function(i,v) {
            if(v.code == 'CROLE211008000002' && v.moduleCode == 'ALL'){
                $('.location-select ul li, .mall-select ul li').show();
                return false;
            } else if(v.code == 'CROLE211008000001' && v.moduleName == '门店对接人') {
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
        url: $.api.baseNew+"/onlineleasing-customer/api/floor/lotus/findAllByMallCode?mallCode="+$.cookie('mallSelected').split(':::')[1],
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
                console.log(response.customerMessage);
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

function generatePages(currentPage, LastPage, items) {
    var pages = '';
    if (LastPage <= 6) {
        for(var i=1;i<=LastPage;i++) {
            if(i == currentPage ) {
                pages += '<li class="page-item active"><a class="page-link" href="?page='+i+'&items='+items+'">'+i+'</a></li>';
            } else {
                pages += '<li class="page-item"><a class="page-link" href="?page='+i+'&items='+items+'">'+i+'</a></li>';
            }
        }
    } else {
        if(currentPage>1){
            pages += '<li class="page-item"><a class="page-link" href="?page=1&items='+items+'">&laquo;</a></li>';
        } else {
            pages += '<li class="page-item disabled"><a class="page-link" href="javascript: void(0);">&laquo;</a></li>';
        }
        var index = 1;
        if(currentPage<=(LastPage-6)*1) {
            index = currentPage;
        } else {
            index = (LastPage-6)*1;
        }
        var pindex, qindex;
        index > 1 ? pindex = index-1 : pindex = 1;
        index > 1 ? qindex = index*1+7: qindex = index*1+8;
        for(var i=pindex;i<qindex;i++) {
            if(i == currentPage ) {
                pages += '<li class="page-item active"><a class="page-link" href="?page='+i+'&items='+items+'">'+i+'</a></li>';
            } else {
                pages += '<li class="page-item"><a class="page-link" href="?page='+i+'&items='+items+'">'+i+'</a></li>';
            }
        }
        if(currentPage<LastPage){
            pages += '<li class="page-item"><a class="page-link" href="?page='+LastPage+'&items='+items+'">&raquo;</a></li>';
        } else {
            pages += '<li class="page-item disabled"><a class="page-link" href="javascript: void(0);">&raquo;</a></li>';
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