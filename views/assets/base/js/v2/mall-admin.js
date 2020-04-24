$(document).ready(function(){
    const dp = new DPlayer({
        container: document.getElementById('dplayer'),
        screenshot: true,
        autoplay:true,
        video: {
            url: '/upload/video/video-1.mp4',
            pic: '/views/assets/base/img/content/backgrounds/video-1.jpg',
            thumbnails: '/views/assets/base/img/content/backgrounds/video-1.jpg'
        }
    });
    
    ContentOwlcarousel.init();
});

function showFloorVR(id){
    $("#floor_vr iframe").attr('src',"/upload/vr/100001/floors/"+id+"/tour.html");
    $("#floor_vr").show();
}

var ContentOwlcarousel = function() {
    
    var _initInstances = function() {
        $('.owl-carousel').owlCarousel({
            loop: true,
            margin: 15,
            dots: false,
            responsive:{
                0:{
                    items:1.5
                },
                600:{
                    items:3.5
                },
                1000:{
                    items:5.5
                }
            }
        })
    };

    return {

         //main function to initiate the module
        init: function() {
            
            _initInstances();
        }

    };
}();