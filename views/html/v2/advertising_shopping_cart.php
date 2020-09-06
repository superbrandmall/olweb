<?php
$scripts = $scripts . '<script type="text/javascript" src="/views/assets/base/js/v2/advertising-shopping-cart-admin.js"></script>';
?>

<div class="weui-article" style="margin-top: 20px; padding: 0 16px;">
    <h1 style="margin-bottom: 0.5em;">购物车</h1>
</div>

<div class="page__bd">
    <div class="weui-panel">
        <div class="weui-panel__hd">
            <div class="icon-box">
                <i class="weui-icon-info weui-icon_msg"></i>
                <div class="icon-box__ctn">
                    <h3 class="icon-box__title">提示</h3>
                    <p class="icon-box__desc">购物车里空空如也～</p>
                </div>
            </div>
        </div>
    </div>
</div>

<div style="position: fixed; bottom: 63px; left: 0; right: 0;text-align: center; z-index: 2;">
    <div class="weui-cells" style="margin-top: 0;">
        <div class="weui-cell" style="margin-bottom: 6px;">
            <div class="weui-cells_checkbox">
                <label class="weui-cell weui-cell_active weui-check__label" for="check_all" style="padding: 0; font-size: 14px;">
                    <div class="weui-cell__hd" style="float: left; padding-right: 5px;">
                        <input type="checkbox" class="weui-check" name="check_all" id="check_all" checked="checked">
                        <i class="weui-icon-checked"></i>
                    </div>
                    全选
                </label>
            </div>
            <div class="weui-cell__bd">
                <p style="font-size: 14px;">合计: <span style="color: #b43018;">¥</span> <span id="subTotal" style="color: #b43018;"></span><small> (含税)</small></p>
            </div>
            <div class="weui-cell__ft">
                <a class="weui-btn weui-btn_primary" id="confirm_price" href="javascript:;" style="width: initial; font-size: 14px;">结算 <small>(<span id="subQTY"></span><small>)</small></a>
            </div>
        </div>
    </div>
</div>
<br><br><br><br><br>
<?php include ('menu_bottom.php'); ?>

<?php include ('footer.php'); ?>