$(document).ready(function(){
    if($.cookie('userModules') && $.cookie('userModules') != null && $.cookie('userModules') != ''){
        var no = JSON.parse($.cookie('userModules'))[0].mobile;
        findBI(no);
    }
})

function findBI(no) {
    $.ajax({
        url: $.api.baseLotus+"/api/vbi/user/menu/findAllByMobileNo?mobileNo="+no,
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
                
                if(response.data != null && response.data.length > 0){
                    var flag = 0;
                    $.each(response.data, function(i,v) {
                        if(v.sysName == '莲花'){
                            $('#bi iframe').attr('src',v.url);
                            flag = 1;
                            return false;
                        }
                    })
                    
                    if(flag == 0){
                        alertMsg('9999','没有访问授权，请联系系统管理员。');
                    }
                } {
                    alertMsg('9999','没有访问授权，请联系系统管理员。');
                }
            } else {
                alertMsg(response.code,response.customerMessage);
            }                               
        }
    }); 
}