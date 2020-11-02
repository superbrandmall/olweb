<?php
$scripts = $scripts . '<script type="text/javascript" src="/views/assets/base/js/v2/advertising-package-admin.js"></script>';
?>

<div class="weui-article" style="margin-top: 20px; padding: 0 16px;">
    <h1 style="margin-bottom: 0.5em;">广告位特价套餐</h1>
</div>

<div class="page__bd">
    <div style="margin-top: 0;">
        <div class="weui-form-preview">
            <div class="weui-form-preview__ft">
                <a class="weui-form-preview__btn weui-form-preview__btn_primary date-start" href="javascript:;">填写档期起始日</a>
                <a class="weui-form-preview__btn weui-form-preview__btn_primary date-end" href="javascript:;">填写档期终止日</a>
            </div>
        </div>
    </div>
</div>

<div id="checkPay" style="position: fixed; bottom: 63px; left: 0; right: 0;text-align: center; z-index: 2;">
    <div class="weui-cells" style="margin-top: 0; text-align: left;">
        <div class="weui-cell" style="margin-bottom: 6px;">
            <div class="weui-cell__bd">
                <p style="font-size: 14px;">合计: <span style="color: #b43018;">¥</span> <span id="subTotal" style="color: #b43018;">选择档期查看总价</span><small> (含税含押金)</small></p>
            </div>
            <div class="weui-cell__ft">
                <a class="weui-btn weui-btn_primary" id="confirm_price" href="javascript:;" style="width: initial; font-size: 14px;">结算 <small>(<span id="subQTY"></span><small>)</small></a>
            </div>
        </div>
    </div>
</div>
<br><br><br><br><br>

<?php include ('timeline/step_two.php'); ?>

<?php include ('menu_bottom.php'); ?>

<?php include ('footer.php'); ?>