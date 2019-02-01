<!-- BEGIN: LAYOUT/FOOTERS/FOOTER-2 -->
<a name="footer"></a>
<footer class="c-layout-footer c-layout-footer-1">
<div class="c-postfooter">
	<div class="container">
		<div class="row">
			<div class="col-md-6 col-sm-6">
				<p class="c-copyright c-font-oswald c-font-14">
					 &copy; COPYRIGHT <?= date("Y") ?>. <?= $lang['copyright'] ?> 
				</p>
			</div>
            <div class="col-md-6 col-sm-6 hidden-sm hidden-xs">
                <ul class="c-socials">
                    <li>
                        <p class="c-copyright c-font-oswald c-font-14">
                            沪ICP备14029636号-1
                        </p>
                    </li>
                </ul>
			</div>
		</div>
	</div>
</div>
</footer>
<!-- END: LAYOUT/FOOTERS/FOOTER-2 -->
<!-- BEGIN: LAYOUT/BASE/BOTTOM -->
<!-- BEGIN: CORE PLUGINS -->
<script src="views/assets/plugins/jquery-migrate.min.js" type="text/javascript"></script>
<script src="views/assets/plugins/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
<script src="views/assets/plugins/jquery.validate.min.js" type="text/javascript"></script>
<script src="views/assets/plugins/jquery.imagemapster.js" type="text/javascript"></script>
<script src="views/assets/plugins/jquery.cookie.js" type="text/javascript"></script>
<!-- END: CORE PLUGINS -->
<!-- BEGIN: LAYOUT PLUGINS -->
<script src="views/assets/plugins/revo-slider/js/jquery.themepunch.tools.min.js" type="text/javascript"></script>
<script src="views/assets/plugins/revo-slider/js/jquery.themepunch.revolution.min.js" type="text/javascript"></script>
<script src="views/assets/plugins/cubeportfolio/js/jquery.cubeportfolio.min.js" type="text/javascript"></script>
<script src="views/assets/plugins/owl-carousel/owl.carousel.min.js" type="text/javascript"></script>
<script src="views/assets/plugins/counterup/jquery.waypoints.min.js" type="text/javascript"></script>
<script src="views/assets/plugins/counterup/jquery.counterup.min.js" type="text/javascript"></script>
<script src="views/assets/plugins/fancybox/jquery.fancybox.pack.js" type="text/javascript"></script>
<!-- END: LAYOUT PLUGINS -->
<script src="views/assets/base/js/app.js?t=<?php echo date("Y-m-d")?>" type="text/javascript"></script>
<script src="views/assets/base/js/protocol.js?t=<?php echo date("Y-m-d")?>" type="text/javascript"></script>
<script src="views/assets/base/js/scripts.js?t=<?php echo date("Y-m-d")?>" type="text/javascript"></script>
<script src="views/assets/base/js/mall-code.js?t=<?php echo date("Y-m-d")?>" type="text/javascript"></script>
<!-- BEGIN: THEME SCRIPTS -->
<?php
    echo $scripts; 
?>
<script src="views/assets/base/js/components.js?t=<?php echo date("Y-m-d")?>" type="text/javascript"></script>
<script>
	$(document).ready(function() {    
		App.init(); // init core    

		// init main slider
		var slider = $('.c-layout-revo-slider .tp-banner');
	    var cont = $('.c-layout-revo-slider .tp-banner-container');
	    var api = slider.show().revolution({
	        delay: 0,    
	        startwidth: 960,
	        startheight: 550,
	        navigationType: "hide",
	        navigationArrows: "none",
	        touchenabled: "on",
	        onHoverStop: "off",
	        keyboardNavigation: "off",
	        navigationStyle: "circle",
	        navigationHAlign: "center",
	        navigationVAlign: "bottom",
	        spinner: "spinner2",
	        fullScreen: "off",   
	        fullScreenAlignForce: "on",
	        fullScreenOffsetContainer: (App.getViewPort().width < App.getBreakpoint('md') ? '.c-layout-header' : ''),
	        shadow: 0,
	        fullWidth: "off",
	        forceFullWidth: "off",
	        hideTimerBar: "on",
	        hideThumbsOnMobile: "on",
	        hideNavDelayOnMobile: 1500,
	        hideBulletsOnMobile: "on",
	        hideArrowsOnMobile: "on",
	        hideThumbsUnderResolution: 0
	    });
	    api.bind("revolution.slide.onchange",function (e,data) {
	        $('.c-layout-header').removeClass('hide');   
	        setTimeout(function(){
	            $('.c-singup-form').fadeIn(); 
	        }, 1500);
	    });

        if($('.tp-bgimg').length >0){
            var element = document.getElementsByClassName('tp-bgimg')[0];
            element.addEventListener('transitionend', handle, false);
        }
        
        function handle(){
            change();
        }
        function change() {
            if($('.tp-bgimg').hasClass('zoom')) {
                $('.tp-bgimg').removeClass('zoom');
            } else {
                $('.tp-bgimg').addClass('zoom');
            }            
        }
	});
	</script>
<!-- END: THEME SCRIPTS -->
<!-- END: LAYOUT/BASE/BOTTOM -->
</body>
</html>