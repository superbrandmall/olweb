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
<script src="/views/assets/plugins/jquery-migrate.min.js" type="text/javascript"></script>
<script src="/views/assets/plugins/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
<script src="/views/assets/plugins/jquery.validate.min.js" type="text/javascript"></script>
<script src="/views/assets/plugins/jquery.cookie.js" type="text/javascript"></script>
<!-- END: CORE PLUGINS -->
<!-- BEGIN: LAYOUT PLUGINS -->
<script src="/views/assets/plugins/revo-slider/js/jquery.themepunch.tools.min.js" type="text/javascript"></script>
<script src="/views/assets/plugins/revo-slider/js/jquery.themepunch.revolution.min.js" type="text/javascript"></script>
<script src="/views/assets/plugins/cubeportfolio/js/jquery.cubeportfolio.min.js" type="text/javascript"></script>
<script src="/views/assets/plugins/owl-carousel/owl.carousel.min.js" type="text/javascript"></script>
<script src="/views/assets/plugins/counterup/jquery.waypoints.min.js" type="text/javascript"></script>
<script src="/views/assets/plugins/counterup/jquery.counterup.min.js" type="text/javascript"></script>
<script src="/views/assets/plugins/fancybox/jquery.fancybox.pack.js" type="text/javascript"></script>
<!-- END: LAYOUT PLUGINS -->
<script src="/views/assets/base/js/app.js?t=<?php echo date("Y-m-d")?>" type="text/javascript"></script>
<!-- BEGIN: THEME SCRIPTS -->
<?php
    echo $scripts; 
?>
<script>
    // BEGIN: Layout Brand
var LayoutBrand = function() {

    return {
        //main function to initiate the module
        init: function() {
            $('body').on('click', '.c-hor-nav-toggler', function() {
                var target = $(this).data('target');
                $(target).toggleClass("c-shown");
            });
        }

    };
}();
// END

    // BEGIN: Layout Mega Menu
var LayoutMegaMenu = function() {

    return {
        //main function to initiate the module
        init: function() {
            $('.c-mega-menu').on('click', 'a.dropdown-toggle, .dropdown-submenu > a', function(e) {
                if (App.getViewPort().width < App.getBreakpoint('md')) {
                    e.preventDefault();
                    $(this).parent("li").toggleClass("c-open");
                }
            });
        }
    };
}();
// END

	$(document).ready(function() {    
		App.init(); // init core
                LayoutBrand.init();
                LayoutMegaMenu.init();
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
        
        
        
        ///////////////////// Validate contact form /////////////////////////
    var contact_contact_name_1_required = "姓名为必填项";
    var contact_contact_name_1_minlength = "请输入完整姓名";
    var contact_phone_required = "手机号码为必填项";
    var contact_phone_rangelength = "请输入正确手机号码";
    var contact_phone_digits = "请输入正确电话号码";
    var contact_email_required = "邮箱为必填项";
    var contact_email_email = "请输入有效邮箱地址";
    var contact_msg_sent = "预约发送成功";

    $("#form").validate({
        onkeyup: false,
        rules: {
            contact_name_1: {
                required: true,
                minlength: 1
            },
            phone: {
                required: true,
                rangelength: [1,11],
                digits: true
            },
            email: {
                required: true,
                email: true
            },
            terms: "required"
        },
        messages: {
            contact_name_1: {
                required: contact_contact_name_1_required,
                minlength: contact_contact_name_1_minlength
            },
            phone: {
                required: contact_phone_required,
                rangelength: contact_phone_rangelength,
                digits: contact_phone_digits
            },
            email: {
                required: contact_email_required,
                email: contact_email_email
            },
            terms: "请同意并勾选以上条款"
        },
        errorPlacement: function(error, element) {
            error.appendTo('#errorcontainer-' + element.attr('id'));
        },
        submitHandler: function() {
            var email = $('#email').val();
            var phone = $('#phone').val();
            var user_name = $('#contact_name_1').val();
            var country_code = $('#country_code').text();

            $.ajax({
                url: "controllers/api/1.0/ApiMailOzone.php",
                type: "POST",
                data: {
                    email: email,
                    phone: phone,
                    user_name: user_name,
                    country_code: country_code
                },
                async: false,
                beforeSend: function(request) {
                    $('#loader').show();
                },
                complete: function(){},
                success: function (response, status, xhr) {
                    $('#loader').hide();
                    $("#form")[0].reset();
                    $('#terms_box').html('<div class="alert alert-success" role="alert" style="display: block;">'+contact_msg_sent+'</div>');
                    setTimeout(function () {
                        window.location.reload(false);
                    },3000);
                },
                error: function(jqXHR, textStatus, errorThrown) {
                   console.log(textStatus, errorThrown);
                }
            });
        }
    });
        
        
        
        
	});
	</script>
<!-- END: THEME SCRIPTS -->
<!-- END: LAYOUT/BASE/BOTTOM -->
</body>
</html>