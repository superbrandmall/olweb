$(document).ready(function(){
    if(!sessionStorage.getItem("modalities") || sessionStorage.getItem("modalities") == null || sessionStorage.getItem("modalities") == '') {
        getModalities();
    } else {
        renderModalities();
    }
})

function getModalities() {
    $.ajax({
        url: $.api.baseLotus+"/api/biz/lotus/findAll?page=0&size=500&sort=id,desc",
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
                
                if(response.data.content.length > 0) {
                    sessionStorage.setItem("modalities", JSON.stringify(response.data) );
                    renderModalities();
                }
                
            } else {
                alertMsg(response.code,response.customerMessage);
            }
        }
    });
}

function renderModalities() {
    $('#modalities').html('');
    $.each($.parseJSON(sessionStorage.getItem("modalities")), function(i,v){
        var state;
        switch (v.state) {
            case '1':
                state = "使用中";
                break;
            case '0':
                state = "已删除";
                break;
            default:
                state = "使用中";
                break;
        }

        $('#modalities').append('<tr data-index="'+i+'">\n\
        <td>'+v.modality1+'</td>\n\
        <td>'+state+'</td>\n\
        <td></td></tr>');
    })
}