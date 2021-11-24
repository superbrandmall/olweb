$(document).ready(function(){
    if(getURLParameter('s')) {
        switch (getURLParameter('s')) {
            case "succeed":
                $('.callout-info').text('创建用户成功!').show().delay(2000).hide(0);
                $('html, body').animate({
                    scrollTop: $('#webui').offset().top
                }, 0);
                break;
            default:
                break;
        }
        setTimeout(function () {
            window.history.pushState("object or string", "Title", "/lotus-admin/"+refineCreateUrl() );
        },1000);
    }
    
    ShowUsers();

});

function ShowUsers(){
    $.ajax({
        url: $.api.baseNew+"/onlineleasing-customer/api/user/findAllByUserType?userType=10",
        type: "GET",
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
                
                if(response.data.length > 0) { 
                    $.each(response.data, function(i,v){
                        $('#usersL').append('\
                        <tr data-index="'+i+'">\n\
                        <td>'+v.settings.name+'</td>\n\
                        <td>'+v.mobile+'</td>\n\
                        <td>'+v.email+'</td>\n\
                        <td>'+v.userModules+'</td>\n\
                        <td>莲花租户</td>\n\
                        <td>'+v.userModules+'</td>\n\
                        </tr>');
                        
                        $('#usersS').append('\
<tr data-index="'+i+'">\n\
<td colspan="65">\n\
<div class="card-views"><div class="card-view"><span class="title">姓名</span><span class="value">'+v.settings.name+'</span></div></div>\n\
<div class="card-views"><div class="card-view"><span class="title">手机</span><span class="value">'+v.mobile+'</span></div></div>\n\
<div class="card-views"><div class="card-view"><span class="title">邮箱</span><span class="value">'+v.email+'</span></div></div>\n\
<div class="card-views"><div class="card-view"><span class="title">门店</span><span class="value">'+v.userModules+'</span></div></div>\n\
<div class="card-views"><div class="card-view"><span class="title">分类</span><span class="value">莲花租户</span></div></div>\n\
<div class="card-views"><div class="card-view"><span class="title">品牌</span><span class="value">'+v.userModules+'</span></div></div>\n\
</td></tr>');

                    });
                }
            } 
        }
    });
}