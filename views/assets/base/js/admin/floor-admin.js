$(document).ready(function(){
    GetFloorInfo();    
});

function GetFloorInfo(){
    var map = {
        floor : {
            code: getURLParameter('id')
        }
    };
    $.ajax({
        url: $.api.base+"/floor/findByCode",
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
                
                var floor = response.data.floor;
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