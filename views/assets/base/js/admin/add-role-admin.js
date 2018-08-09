$(document).ready(function(){
    $('#submit').click(function(){
        SaveRoleInfo();
    });    
});

function SaveRoleInfo(){    
    var map = {
        remark: $('#remark').val() || null,
        role: $('#role').val() || null,
        roleName: $('#role_name').val() || null
    };

    $.ajax({
        url: $.api.baseNew+"/common-authorization/api/role/save",
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
                window.location.href = 'roles?s=add-succeed';              
            } else {
                interpretBusinessCode(response.customerMessage);
            }
        }
    });    
}