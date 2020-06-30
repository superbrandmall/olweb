$(document).ready(function(){
    $('.macaroon a').click(function(){
        if($(this).hasClass('active')){
            $(this).removeClass('active');
        }else{
            $(this).siblings().removeClass('active');
            $(this).addClass('active');
        }
    });
    
    window.onload = function(){ 
        $('.floors').css('height',$('.macaroon').innerHeight());
    }
});

function showFloorImg(floor){
    $('.floors, .floors_desc').hide();
    $('#'+floor+', #'+floor+'_desc').fadeIn();
}

function showFloorVR(id){
    $("#floor_vr iframe").attr('src',"/upload/vr/100001/floors/"+id+"/tour.html");
    $("#floor_vr").show();
}