<?php
if (explode('?f=', $_SERVER['REQUEST_URI'])[1] != null) {
    $floor = explode('?f=', $_SERVER['REQUEST_URI'])[1];
    if (strpos($floor, '&type=') !== false) {
        $floor = explode('&type=', $floor)[0];
    }
} else {
    $floor = 3;
}

$scripts = $scripts . '<script type="text/javascript" src="/views/assets/base/js/v2/leasing-admin.js"></script>';
?>

<div style="position: relative;">
    <img src="/views/assets/base/img/content/backgrounds/leasing/<?= $floor ?>F-banner.jpg" class="wow fadeInUp" data-wow-delay="0.2s" data-wow-offset="300" style="width: 100%; text-align: center;" />
    <img src="/views/assets/base/img/content/backgrounds/leasing/banner-bg.png" class="wow fadeInUp" data-wow-delay="0.2s" data-wow-offset="300" style="position: absolute; top: 0; left: 0; width: 100%; text-align: center;" />
</div>

<div class="page__bd" style="margin-top: -60px;">
    <div class="weui-panel__hd" style="padding-left: 24px;">
        <span id="storeAmount"></span>个铺位
    </div>
    <div class="weui-grids"></div>
</div>

<br>
<br>

<?php include ('menu_bottom.php'); ?>

<?php include ('footer.php'); ?>