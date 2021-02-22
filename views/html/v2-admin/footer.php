<?php if (isset($_SESSION['v2_admin_login'])) { ?>
    <?php include ('navbar_mobile.php'); ?>
    <button id="mimin-mobile-menu-opener" class="animated rubberBand btn btn-circle btn-danger">
        <span class="fa fa-bars"></span>
    </button>
<?php } ?>

<script type="text/javascript" src="/views/assets/plugins/jquery.min.js"></script>
<script type="text/javascript" src="/views/assets/plugins/jquery.ui.min.js"></script>
<script type="text/javascript" src="/views/assets/plugins/bootstrap/js/bootstrap.min.js"></script>
<script type="text/javascript" src="/views/assets/base/js/v2-admin/plugins/moment.min.js"></script>
<script type="text/javascript" src="/views/assets/base/js/v2-admin/plugins/moment-with-locales.js"></script>

<script type="text/javascript" src="/views/assets/base/js/v2-admin/plugins/fullcalendar.min.js"></script>
<script type="text/javascript" src="/views/assets/base/js/v2-admin/plugins/jquery.nicescroll.js"></script>
<script type="text/javascript" src="/views/assets/base/js/v2-admin/plugins/jquery.vmap.min.js"></script>
<script type="text/javascript" src="/views/assets/base/js/v2-admin/plugins/maps/jquery.vmap.world.js"></script>
<script type="text/javascript" src="/views/assets/base/js/v2-admin/plugins/jquery.vmap.sampledata.js"></script>
<script type="text/javascript" src="/views/assets/base/js/v2-admin/plugins/chart.min.js"></script>

<script type="text/javascript" src="/views/assets/base/js/v2-admin/plugins/jquery.nicescroll.js"></script>
<script type="text/javascript" src="/views/assets/plugins/jquery.cookie.js"></script>
<script type="text/javascript" src="/views/assets/plugins/jquery.validate.min.js"></script>
<script type="text/javascript" src="/views/assets/plugins/jquery.imagemapster.js"></script>
<script type="text/javascript" src="/views/assets/base/js/mall-code.js"></script>
<?php
    echo $scripts; 
?>
<script type="text/javascript" src="/views/assets/base/js/v2-admin/protocol-admin.js"></script>
<script type="text/javascript" src="/views/assets/base/js/v2-admin/main.js"></script>
<script type="text/javascript" src="/views/assets/base/js/v2-admin/scripts-admin.js"></script>
<div id="loader"></div>
</body>
</html>