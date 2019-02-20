$(document).ready(function(){
    GetBuildingInfo();    
});

function GetBuildingInfo(){
    $.ajax({
        url: $.api.baseNew+"/onlineleasing-admin/api/building/"+getURLParameter('id')+"",
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
                
                var building = response.data;
                $('#code').val(building.buildingCode || '-');
                $('#mall').val(building.mallCode || '-');
                $('#building').val(building.buildingName || '-');
                $('#gross_area').val((building.grossFloorArea || '-' ) + '平方米');
                $('#leasing_area').val((building.leasingArea || '-' ) + '平方米');
                $('#hd_code').val(building.hdCode || '-');
            } 
        }
    });
}