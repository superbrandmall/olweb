var index=0;
$(document).ready(function(){
    //setInterval("change()",6000);

    $('.macaroon a').click(function(){
        if($(this).hasClass('active')){
            $(this).removeClass('active');
        }else{
            $(this).siblings().removeClass('active');
            $(this).addClass('active');
        }
    });
    
    window.onload = function(){ 
        $('.slide').hide();
        $('.floors').css('height',$('.macaroon').innerHeight());
    }
    
    $('.slide').swipeSlide({
        autoSwipe:true,
        continuousScroll:true,
        transitionType:'ease-in',
        lazyLoad:true,
        firstCallback : function(i,sum,me){
        },
        callback : function(i,sum,me){
        }
    });
});

function change(){
    index++;
    
    if(index > 1){
        index=0;
    }
    console.log(index);
    var imgs=["/views/assets/base/img/content/backgrounds/sbm/Floor/4F-1.jpg","/views/assets/base/img/content/backgrounds/sbm/Floor/4F-2.jpg"];
    
    $("#4F").css('background','url('+imgs[index]+')');
    
    
}

function showFloorImg(floor){
    $('.slide, .floors_desc').hide();
    $('.floors, .floors_desc').hide();
    $('#'+floor+', #'+floor+'_desc').fadeIn();
}

function showFloorSlide(floor){
    $('.floors, .floors_desc').hide();
    $('.slide, .floors_desc').hide();
    
    $('.slide').css('height',$('.macaroon').innerHeight());
    
    $('#'+floor+', #'+floor+'_desc').fadeIn();
    $('#'+floor).parent('.slide').fadeIn();
}

function showFloorVR(id){
    $("#floor_vr iframe").attr('src',"/upload/vr/100001/floors/"+id+"/tour.html");
    $("#floor_vr").show();
}