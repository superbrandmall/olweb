$(document).ready(function(){
    if(getURLParameter('s')) {
        switch (getURLParameter('s')) {
            case "add-succeed":
                $('#ui_succeed').show().delay(2000).hide(0);
                $('html, body').animate({
                    scrollTop: $('#ui_succeed').offset().top
                }, 0);
                break;
            default:
                break;
        }
        setTimeout(function () {
            window.history.pushState("object or string", "Title", "/admin/"+refineUrl() );
        },1000);
    }
    
    GetRoles();
    GetUserRole();
    
    if(getURLParameter('page') && getURLParameter('page') >= 1){
        ShowUsers(getURLParameter('page'),50);
    } else {
        ShowUsers(1,50);
    }
});

function ShowUsers(p,c){
    var pg = p-1;
    $.ajax({
        url: $.api.baseNew+"/common-authorization/api/user/findAll?size="+c+"&page="+pg+"&sort=code,asc",
        type: "GET",
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
                $('table tbody').html('');
                $('.pagination').html('');
                
                if(response.data.content.length > 0) {
                    var pages =  response.data.totalPages;
                    generatePages(p, pages);
                    
                    var verified;
                    $.each(response.data.content, function(i,v){
                        if(v.mobileVerified == 1){
                            verified = '手机';
                        } else if(v.emailVerified == 1) {
                            verified = '邮箱';
                        } else {
                            verified = '未绑定';
                        }
                        
                        var rolebadge;
                        $.each($.parseJSON(sessionStorage.getItem("userrole")), function(i,u) {
                            if(u.userCode == v.code) {
                                $.each($.parseJSON(sessionStorage.getItem("role")), function(l,y) {
                                    if(y.code == u.roleCode) {
                                        rolebadge = '<span class="badge badge-info">' + y.role + '</span> ';
                                        return false;
                                    }
                                });
                            }
                        });
                        
                        $('table tbody').append('<tr><td>'+v.code+'</td><td>'+v.email+'</td><td>'+v.mobile+'</td><td>'+GetDateTime(v.lastLogin)+'</td><td>'+verified+'</td><td>'+(v.settings.name || '')+'</td><td>'+rolebadge+'</td></tr>');
                    });
                    
                    if(p == pages){
                        $("#shows").html('显示第'+Math.ceil((p-1)*c+1)+'到'+response.data.totalElements+'条，共'+response.data.totalElements+'条记录');
                    } else {
                        $("#shows").html('显示第'+Math.ceil((p-1)*c+1)+'到'+Math.ceil((p-1)*c+c)+'条，共'+response.data.totalElements+'条记录');
                    }
                }
            } else {
                interpretBusinessCode(response.customerMessage);
            }
        }
    });
}

function GetUserRole() {
    $.ajax({
        url: $.api.baseNew+"/common-authorization/api/userrole/findAll?size=1000&sort=userCode,asc",
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
                sessionStorage.setItem("userrole", JSON.stringify(response.data.content) );
            } else {
                interpretBusinessCode(response.customerMessage);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}

function GetRoles() {
    $.ajax({
        url: $.api.baseNew+"/common-authorization/api/role/findAll?size=1000&sort=code,asc",
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
                sessionStorage.setItem("role", JSON.stringify(response.data.content) );
            } else {
                interpretBusinessCode(response.customerMessage);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}

function GetDateTime(str){
    var oDate = new Date(str),
    oYear = oDate.getFullYear(),
    oMonth = oDate.getMonth()+1,
    oDay = oDate.getDate(),
    oHour = oDate.getHours(),
    oMin = oDate.getMinutes(),
    oSen = oDate.getSeconds(),
    oTime = oYear +'年'+ getzf(oMonth) +'月'+ getzf(oDay) +'日 '+ getzf(oHour) +':'+
            getzf(oMin) +':'+getzf(oSen);//最后拼接时间
    return oTime;
}

//补0操作
function getzf(num){
    if(parseInt(num) < 10){
        num = '0'+num;
    }
    return num;
}