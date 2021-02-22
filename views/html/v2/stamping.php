<?php
$scripts = $scripts. '<script type="text/javascript" src="/views/assets/base/js/nikola/bootstrap.bundle.min.js"></script>
    <script type="text/javascript" src="/views/assets/base/js/nikola/blocs.min.js"></script>
    <script type="text/javascript" src="/views/assets/base/js/v2/stamping-admin.js"></script>';
?>

<link rel="stylesheet" type="text/css" href="/views/assets/base/css/nikola/bootstrap.min.css" />
<link rel="stylesheet" type="text/css" href="/views/assets/base/css/nikola.css" />

<div class="page__bd" style="background-color: #EDEDED; margin-top: 65px;">
    <div class="weui-tab">
        <div class="weui-navbar">
            <div class="weui-navbar__item" onclick="window.location='/v2/all-orders'">
                全部
            </div>
            <div class="weui-navbar__item weui-bar__item_on" style="border-bottom: solid 1px #3F4E72; background: transparent;">
                流程中
            </div>
            <div class="weui-navbar__item" onclick="window.location='/v2/to-pay'">
                已完成
            </div>
        </div>
    </div>

    <div id="orders"></div>
</div>

<br>
<br>
<br>

<?php include ('timeline/step_two.php'); ?>

<?php include ('footer.php'); ?>