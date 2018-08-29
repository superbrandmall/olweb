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
            window.history.pushState("object or string", "Title", "/admin/"+refineOfferUrl() );
        },1000);
    }
    
    GetFloorInfo();  
    
    $('#submit').click(function(){
        SaveFloorInfo();
    });
});

function GetFloorInfo(){
    $.ajax({
        url: $.api.baseNew+"/onlineleasing-admin/api/floor/"+getURLParameter('id')+"",
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
                
                var floor = response.data;
                $('#code').val(floor.code || '-');
                $('#floor').val(floor.floorName || '-');
                $('#building').val(floor.buildingCode || '-');
                $('#desc').val(floor.description || '-');
                $('#gross_area').val((floor.grossFloorArea || '-' ) + '平方米');
                $('#leasing_area').val((floor.leasingArea || '-' ) + '平方米');
                $('#hd_code').val(floor.hdCode || '-');
            } 
        }
    });
}