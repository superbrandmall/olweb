$(document).ready(function(){
    GetBuildingInfo();    
});

function GetBuildingInfo(){
    var map = {
        building : {
            code: getURLParameter('id')
        }
    };
    $.ajax({
        url: $.api.base+"/building/findByCode",
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
                
                var building = response.data.building;
                $('#code').val(building.code || '-');
                $('#mall').val(building.mallCode || '-');
                $('#building').val(building.buildingName || '-');
                $('#gross_area').val((building.grossFloorArea || '-' ) + '平方米');
                $('#leasing_area').val((building.leasingArea || '-' ) + '平方米');
                $('#hd_code').val(building.hdCode || '-');
            } 
        }
    });
}