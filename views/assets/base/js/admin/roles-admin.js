$(document).ready(function(){
    if(getURLParameter('s')) {
        switch (getURLParameter('s')) {
            case "add-succeed":
                $('#ui_succeed').show().delay(2000).hide(0);
                $('html, body').animate({
                    scrollTop: $('#ui_succeed').offset().top
                }, 0);
                break;
            case "edit-succeed":
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
    
    if(getURLParameter('page') && getURLParameter('page') >= 1){
        ShowRoles(getURLParameter('page'),50);
    } else {
        ShowRoles(1,50);
    }
    
    $('.edit').click(function(){
        var vc = $(this).attr('id').split('_');
        EditRoleInfo(vc[1]);
    });
});

function ShowRoles(p,c){
    var pg = p-1;
    $.ajax({
        url: $.api.baseNew+"/common-authorization/api/role/findAll?size="+c+"&page="+pg+"&sort=code,asc",
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
                    
                    $.each(response.data.content, function(i,v){                       
                        $('table tbody').append('<tr><td>'+v.code+'</td><td id="role_'+v.code+'">'+v.role+'</td><td><input value="'+v.roleName+'" id="role_name_'+v.code+'"></input></td><td><input value="'+v.remark+'" id="remark_'+v.code+'"></input></td><td><button class="btn btn-primary btn-sm edit" id="edit_'+v.code+'"><i class="fa fa-edit" aria-hidden="true"> </i> 修改</button></td></tr>');
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

function EditRoleInfo(vc){    
    var map = {
        code: vc,
        remark: $('#remark_'+vc).val() || null,
        role: $('#role_'+vc).text() || null,
        roleName: $('#role_name_'+vc).val() || null
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
                window.location.href = 'roles?s=edit-succeed';              
            } else {
                interpretBusinessCode(response.customerMessage);
            }
        }
    });
}