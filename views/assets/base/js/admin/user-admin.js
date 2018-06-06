$(document).ready(function(){
    GetUserInfo();    
});

function GetUserInfo(){
    var map = {
        user : {
            code: getURLParameter('id')
        }
    };
    $.ajax({
        url: $.api.base+"/user/findByCode",
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
                
                var user = response.data.user;
                $('#code').val(user.code || '-');
                $('#merchant_code').val(user.merchantCode || '-');
                $('#email').val(user.email || '-');
                $('#mobile').val(user.mobile || '-');
                $('#type').val(user.type || '-');
                $('#last_login').val(user.lastLogin || '-');
                $('#merchant_code').val(user.merchantCode || '-');
                
                if(response.data.userContacts && response.data.userContacts != null) {
                    var userContacts = response.data.userContacts;
                    $('#id_card').val(userContacts.idCard || '-');
                    $('#name').val(userContacts.name || '-');
                }
            } 
        }
    });
}