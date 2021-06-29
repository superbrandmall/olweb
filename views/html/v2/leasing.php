<?php
$scripts = $scripts . '<script type="text/javascript" src="/views/assets/base/js/nikola/bootstrap.bundle.min.js"></script>
<script type="text/javascript" src="/views/assets/base/js/nikola/blocs.min.js"></script>
<script type="text/javascript" src="/views/assets/base/js/v2/leasing-admin.js"></script>';
?>

<link rel="stylesheet" type="text/css" href="/views/assets/base/css/nikola/bootstrap.min.css" />
<link rel="stylesheet" type="text/css" href="/views/assets/base/css/nikola.css" />

<div class="livechat-girl animated"> <img class="girl" src="/views/assets/base/img/content/backgrounds/en_3.png">
    <div id="hint1" class="livechat-hint rd-notice-tooltip rd-notice-type-success rd-notice-position-left single-line hide_hint">
        <div class="rd-notice-content">我们为您推荐了这些铺位</div>
    </div>
    <div id="hint2" class="livechat-hint rd-notice-tooltip rd-notice-type-success rd-notice-position-left single-line hide_hint">
        <div class="rd-notice-content">您可以逛一逛、比一比</div>
    </div>
    <div id="hint3" class="livechat-hint rd-notice-tooltip rd-notice-type-success rd-notice-position-left single-line hide_hint">
        <div class="rd-notice-content">点击箭头">"可以查看铺位详情</div>
    </div>
    <div class="animated-circles">
        <div class="circle c-1"></div>
        <div class="circle c-2"></div>
        <div class="circle c-3"></div>
    </div>
</div>

<div class="page__bd">
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

<?php include ('timeline/step_two.php'); ?>

<?php include ('footer.php'); ?>