<!-- BEGIN: LAYOUT/FOOTERS/FOOTER-2 -->
<a name="footer"></a>
<footer class="c-layout-footer c-layout-footer-1">
    <div class="c-postfooter" style="padding: 10px 0 20px;">
        <div class="container">
            <div class="row">
                <div class="col-md-3 c-copyright c-font-oswald c-font-14 text-center">
                    &copy; COPYRIGHT <?= date("Y") ?>
                </div>
                <div class="col-md-3 c-copyright c-font-oswald c-font-14 text-center">
                    <?= $lang['copyright'] ?>
                </div>
                <div class="col-md-3 c-copyright c-font-oswald c-font-14 text-center">
                    <a class="c-copyright c-font-oswald c-font-14" target="_blank" href="https://beian.miit.gov.cn/">
                    沪ICP备14029636号-1
                    </a>
                </div>
                <div class="col-md-3 c-copyright c-font-oswald c-font-14 text-center">
                    <a class="c-copyright c-font-oswald c-font-14" target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=31011502015111">
                        <img src="views/assets/base/img/content/misc/gongan.png" />
                        沪公网安备 31011502015111号
                    </a>
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
<script src="views/assets/base/js/app.js?t=<?php echo date("Y-m-d") ?>" type="text/javascript"></script>
<script src="views/assets/base/js/protocol.js?t=<?php echo date("Y-m-d") ?>" type="text/javascript"></script>
<script src="views/assets/base/js/scripts.js?t=<?php echo date("Y-m-d") ?>" type="text/javascript"></script>
<script src="views/assets/base/js/mall-code.js?t=<?php echo date("Y-m-d") ?>" type="text/javascript"></script>
<!-- BEGIN: THEME SCRIPTS -->
<?php
echo $scripts;
?>
<script src="views/assets/base/js/components.js?t=<?php echo date("Y-m-d") ?>" type="text/javascript"></script>
<!-- END: THEME SCRIPTS -->
<!-- END: LAYOUT/BASE/BOTTOM -->
</body>
</html>