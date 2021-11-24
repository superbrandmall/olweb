<?php
$scripts = $scripts . '<script type="text/javascript" src="/views/assets/base/js/nikola/bootstrap.bundle.min.js"></script>
<script type="text/javascript" src="/views/assets/base/js/nikola/blocs.min.js"></script>
<script type="text/javascript" src="/views/assets/base/js/v2/leasing-admin.js"></script>';
?>

<link rel="stylesheet" type="text/css" href="/views/assets/base/css/nikola/bootstrap.min.css" />
<link rel="stylesheet" type="text/css" href="/views/assets/base/css/nikola.css" />

<div class="page__bd" style="margin-top: 65px;">
    <div class="weui-panel__hd"></div>
    <div class="weui-panel__bd"></div>
</div>

<div id="gallery" class="weui-gallery" style="display: none;">
    <div class="weui-gallery__opr">
        <a href="javascript:" class="weui-gallery__del">
            <i class="fa fa-times" aria-hidden="true" style="color: #fff;" onclick='$("#gallery").hide();'></i>
        </a>
    </div>
</div>

<div id="vr_viewer" class="weui-gallery" style="display: none;">
    <iframe src="javascript:;" width="100%" frameborder="0" style="height: 90vh;"></iframe>
    <div class="weui-gallery__opr">
        <a href="javascript:" class="weui-gallery__del">
            <i class="fa fa-times" aria-hidden="true" style="color: #fff;" onclick='$("#vr_viewer iframe").attr("src","javascript:;"); $("#vr_viewer").hide();'></i>
        </a>
    </div>
</div>

<br>
<br>
<br>

<?php include ('footer.php'); ?>