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
    if($.cookie('mallSelected') && $.cookie('mallSelected') != ''){
        $('#mallSelected').text($.cookie('mallSelected').split(':::')[0]);
    } else {
        $('#mallSelected').text('文诚店');
        $.cookie('mallSelected','文诚店:::SC055');
    }
    
    if(!sessionStorage.getItem("floors-"+$.cookie('mallSelected').split(':::')[1]) || sessionStorage.getItem("floors-"+$.cookie('mallSelected').split(':::')[1]) == null || sessionStorage.getItem("floors-"+$.cookie('mallSelected').split(':::')[1]) == '') {
        getFloors();
    }
    
    if (!sessionStorage.getItem("users") || sessionStorage.getItem("users") == null || sessionStorage.getItem("users") == '') {
        getUsers();
    }
    
    if (!sessionStorage.getItem("admins") || sessionStorage.getItem("admins") == null || sessionStorage.getItem("admins") == '') {
        getAdmins();
    }
    
    getSideBarFloor();
    
    $('.mall-select .text-blue').click(function(){
        $.cookie('mallSelected',$(this).find('span').text()+':::'+$(this).attr('data-code'));
        $('#mallSelected').text($.cookie('mallSelected').split(':::')[0]);
        window.location.href = location.protocol + location.pathname;
    })
    
    $(document).on('click', '[data-toggle="lightbox"]', function (event) {
        event.preventDefault();
        $(this).ekkoLightbox();
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
        if(url.indexOf("home") >= 0 && v.code == getURLParameter('f')) {
            var floorClass = 'active';
        } else {
            floorClass = '';
        }
        
        $('#floorList').append('<li class="'+floorClass+'"><a href="/lotus-admin/home?f='+v.code+'"><i class="fa fa-level-up text-blue"></i> '+v.floorName+'</a></li>');
    })
}

function getUsers() {
    var users = [];
    users.push(
        {code: 'CUSER190709000005',name: 'Jeff Xu'},
        {code: 'CUSER190709000002',name: 'Chris Chen'},
        {code: 'CUSER190709000004',name: 'Maggie Li'},
        {code: 'CUSER190709000006',name: "Austin Rao"},
        {code: 'CUSER200524000001',name: "Nicole Zhang"},
        {code: 'CUSER190709000008',name: 'Doris Zhou'},
        {code: 'CUSER190709000009',name: 'Megan Jing'},
        {code: 'CUSER190709000010',name: 'Kevin Jiang'},
        {code: 'CUSER191225000001',name: "Mikayla Deng"},
        {code: 'CUSER191225000002',name: 'Joy Gu'},
        {code: 'CUSER200524000002',name: 'Yiyi Chen'},
        {code: 'CUSER200524000003',name: 'Willa Sun'},
        {code: 'CUSER200524000004',name: 'Johnson Ma'},
        {code: 'CUSER190709000015',name: 'Selena Song'},
        {code: 'CUSER190709000016',name: 'Di Cui'},
        {code: 'CUSER190709000018',name: 'George Qiao'},
        {code: 'CUSER190709000020',name: 'Ariel Huang'},
        {code: 'CUSER190709000021',name: 'Anna Li'},
        {code: 'CUSER190709000022',name: 'Claude Ma'},
        {code: 'CUSER190709000023',name: 'Abby Shi'},
        {code: 'CUSER190709000024',name: 'Wei Ye'},
        {code: 'CUSER190927000001',name: 'Olivia Xie'},
        {code: 'CUSER190924000001',name: 'Yiyi Chen'}
        
    )
    
    sessionStorage.setItem("users", JSON.stringify(users));
}

function getAdmins() {
    var admins = [];
    admins.push(
        'CUSER190709000015',
        'CUSER190709000022',
        'CUSER190709000023',
        'CUSER190709000024',
        'CUSER190924000001',
        'CUSER200524000002',
        'CUSER190927000001',
        'CUSER200524000004'
    )
    
    sessionStorage.setItem("admins", JSON.stringify(admins));
}

function generatePages(currentPage, LastPage, items) {
    var pages = '';
    if (LastPage <= 6) {
        for(var i=1;i<=LastPage;i++) {
            if(i == currentPage ) {
                pages += '<li class="paginate_button active"><a href="?page='+i+'&items='+items+'">'+i+'</a></li>';
            } else {
                pages += '<li class="paginate_button"><a href="?page='+i+'&items='+items+'">'+i+'</a></li>';
            }
        }
    } else {
        if(currentPage>1){
            var previousPage = +currentPage-1;
            pages += '<li><a href="?page='+previousPage+'&items='+items+'">&lt;</a></li>';
        } else {
            pages += '<li class="c-space"><span>&lt;</span></li>';
        }
        for(var i=1;i<=3;i++) {
            if(i == currentPage ) {
                pages += '<li class="paginate_button active"><a href="?page='+i+'&items='+items+'">'+i+'</a></li>';
            } else {
                pages += '<li class="paginate_button"><a href="?page='+i+'&items='+items+'">'+i+'</a></li>';
            }
        }
        pages += '<li class="c-space"><span>...</span></li>';
        for(var i=LastPage-2;i<=LastPage;i++) {
            if(i == currentPage ) {
                pages += '<li class="paginate_button active"><a href="?page='+i+'&items='+items+'">'+i+'</a></li>';
            } else {
                pages += '<li class="paginate_button"><a href="?page='+i+'&items='+items+'">'+i+'</a></li>';
            }
        }
        if(currentPage<LastPage){
            var nextPage = +currentPage+1;
            pages += '<li><a href="?page='+nextPage+'&items='+items+'">&gt;</a></li>';
        } else {
            pages += '<li class="c-space"><span>&gt;</span></li>';
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