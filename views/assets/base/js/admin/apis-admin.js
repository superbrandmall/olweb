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
    
    GetRoleMethod();
    GetRoles();
    
    if(getURLParameter('page') && getURLParameter('page') >= 1){
        ShowAPIs(getURLParameter('page'),50);
    } else {
        ShowAPIs(1,50);
    }
    
    $('.bind').click(function(){
        var vc = $(this).attr('id').split('_');
        BindRoleMethod(vc[1]);
    });
});

function ShowAPIs(p,c){
    var pg = p-1;
    $.ajax({
        url: $.api.baseNew+"/common-authorization/api/method/findAll?size="+c+"&page="+pg+"&sort=code,asc",
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
                    var validFlag;
                    
                    var options = ''; 
                    $.each($.parseJSON(sessionStorage.getItem("role")), function(i,v) {
                        options += '<option value="'+v.code+'" >'+v.role+'</option>';
                    });
                    
                    $.each(response.data.content, function(i,v){
                        switch (v.validFlag) {
                            case 1:
                                validFlag = '绑定 ';
                                break;
                            default:
                                validFlag = '公开 ';
                                break;
                        }
                        
                        $.each($.parseJSON(sessionStorage.getItem("rolemethod")), function(i,u) {
                            if(u.methodCode == v.code) {
                                $.each($.parseJSON(sessionStorage.getItem("role")), function(l,y) {
                                    if(y.code == u.roleCode) {
                                        validFlag += '<span class="badge badge-info">' + y.role + '</span> ';
                                        return false;
                                    }
                                });
                            }
                        });
                        
                        $('table tbody').append('<tr><td>'+v.code+'</td><td>'+v.applicationName+'</td><td>'+v.method+'</td><td>'+v.pattern+'</td>\n\
<td>'+validFlag+'<select id="select_'+v.code+'"><option value="">添加绑定</option>'+options+'</select>\n\
<button class="btn btn-success btn-xs bind" id="bind_'+v.code+'"><i class="fa fa-edit" aria-hidden="true"> </i> 确定</button></td></tr>');
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

function GetRoleMethod() {
    $.ajax({
        url: $.api.baseNew+"/common-authorization/api/rolemethod/findAll?size=1000&sort=methodCode,asc",
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
                sessionStorage.setItem("rolemethod", JSON.stringify(response.data.content) );
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

function BindRoleMethod(vc){    
    var map = [{
        methodCode: vc,
        roleCode: $('#select_'+vc).val() || null
    }];

    $.ajax({
        url: $.api.baseNew+"/common-authorization/api/rolemethod/save",
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
                window.location.href = 'apis?s=add-succeed';              
            } else {
                interpretBusinessCode(response.customerMessage);
            }
        }
    });
}