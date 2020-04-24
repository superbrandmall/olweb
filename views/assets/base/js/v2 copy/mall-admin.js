$(document).ready(function(){
    ContentOwlcarousel.init();
    
    document.addEventListener("WeixinJSBridgeReady",function() {
	document.getElementById('vido_one').play(); 
    }, false);
});

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