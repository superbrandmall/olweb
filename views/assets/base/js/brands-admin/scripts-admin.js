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
    $("#tagSearch").focus();
    
    $(function () {
        $('[data-toggle="tooltip"]').tooltip();
        $('.select2 span').addClass('needsclick');
    });

    if (!sessionStorage.getItem("modalities") || sessionStorage.getItem("modalities") == null || sessionStorage.getItem("modalities") == '') {
        getModalities();
    }

    $(document).on('click', '[data-toggle="lightbox"]', function (event) {
        event.preventDefault();
        $(this).ekkoLightbox();
    });
})

function getModalities() {
    $.ajax({
        url: $.api.baseNew + "/onlineleasing-customer/api/base/modality/findAll",
        type: "GET",
        async: false,
        beforeSend: function (request) {
            request.setRequestHeader("Lang", $.cookie('lang'));
            request.setRequestHeader("Source", "onlineleasing");
        },
        success: function (response, status, xhr) {
            if (response.code === 'C0') {
                sessionStorage.setItem("modalities", JSON.stringify(response.data));
            } else {
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
        }
    });
}

function numberWithCommas(x) {
    if(x == null){
        return '-';
    } else {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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

function logout() {
    var keys = document.cookie.match(/[^ =;]+(?=\=)/g); 
    if (keys) { 
    for (var i = keys.length; i--;) 
        document.cookie = keys[i]+'=0;expires=' + new Date(0).toUTCString();
    }
    
    window.location.href = 'logout';
}