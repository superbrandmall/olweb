$(document).ready(function(){
    if(getURLParameter('s')) {
        switch (getURLParameter('s')) {
            case "update-succeed":
                $('#ui_succeed').show().delay(2000).hide(0);
                $('html, body').animate({
                    scrollTop: $('#ui_succeed').offset().top
                }, 0);
                break;
            default:
        }
        setTimeout(function () {
            window.history.pushState("object or string", "Title", "/admin/"+refineUrl() );
        },1000);
    }
});

function syncHDBaseInfo(){
    $.ajax({
        url: $.api.baseNew+"/sync-hd/api/baseinfo/refresh",
        type: "POST",
        async: false,
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
                window.location.href = 'sync-hd?s=update-succeed';
            } else {
                interpretBusinessCode(response.customerMessage);
            }
        }
    });
}

function syncHDModality(){
    $.ajax({
        url: $.api.baseNew+"/sync-hd/api/modality/refresh",
        type: "POST",
        async: false,
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
                window.location.href = 'sync-hd?s=update-succeed';
            } else {
                interpretBusinessCode(response.customerMessage);
            }
        }
    });
}

function syncHDBrand(){
    $.ajax({
        url: $.api.baseNew+"/sync-hd/api/brand/refresh",
        type: "POST",
        async: false,
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
                window.location.href = 'sync-hd?s=update-succeed';
            } else {
                interpretBusinessCode(response.customerMessage);
            }
        }
    });
}

function syncHDMerchant(){
    $.ajax({
        url: $.api.baseNew+"/sync-hd/api/merchant/refresh",
        type: "POST",
        async: false,
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
                window.location.href = 'sync-hd?s=update-succeed';
            } else {
                interpretBusinessCode(response.customerMessage);
            }
        }
    });
}

function syncHDShop(){
    $.ajax({
        url: $.api.baseNew+"/sync-hd/api/shop/refresh",
        type: "POST",
        async: false,
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
                window.location.href = 'sync-hd?s=update-succeed';
            } else {
                interpretBusinessCode(response.customerMessage);
            }
        }
    });
}

function cachingMallInfo(){
    $.ajax({
        url: $.api.baseNew+"/onlineleasing-admin/api/base/info/mall/refresh",
        type: "POST",
        async: false,
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
                window.location.href = 'sync-hd?s=update-succeed';
            } else {
                interpretBusinessCode(response.customerMessage);
            }
        }
    });
}

function cachingFloorInfo(){
    $.ajax({
        url: $.api.baseNew+"/onlineleasing-admin/api/base/info/floor/refresh",
        type: "POST",
        async: false,
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
                window.location.href = 'sync-hd?s=update-succeed';
            } else {
                interpretBusinessCode(response.customerMessage);
            }
        }
    });
}

function cachingModality(){
    $.ajax({
        url: $.api.baseNew+"/onlineleasing-admin/api/base/modality/refresh",
        type: "POST",
        async: false,
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
                window.location.href = 'sync-hd?s=update-succeed';
            } else {
                interpretBusinessCode(response.customerMessage);
            }
        }
    });
}