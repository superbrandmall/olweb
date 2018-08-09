$(document).ready(function(){
    $('#submit').click(function(){
        SaveUserInfo();
    });    
});

function SaveUserInfo(){    
    var map = {
        email: $('#email').val() || null,
        emailVerified: 1,
        mobile: $('#email').val() || null,
        mobileVerified: 0,
        password: $('#password').val() || null
    };

    $.ajax({
        url: $.api.baseNew+"/common-authorization/api/passport/register",
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
                GetAdminRole(response.data.code);
            } else {
                interpretBusinessCode(response.customerMessage);
            }
        }
    });    
}

function GetAdminRole(vc) {
    $.ajax({
        url: $.api.baseNew+"/common-authorization/api/role/findOneByRole?role=admin",
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
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                }
                BindUserRole(vc,response.data.code);
            } else {
                interpretBusinessCode(response.customerMessage);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}

function BindUserRole(uc,rc){    
    var map = [{
        roleCode: rc,
        userCode: uc
    }];

    $.ajax({
        url: $.api.baseNew+"/common-authorization/api/userrole/save",
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
                window.location.href = 'users?s=add-succeed';           
            } else {
                interpretBusinessCode(response.customerMessage);
            }
        }
    });
}