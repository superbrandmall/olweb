<?php
$scripts = $scripts . '<script type="text/javascript" src="/views/assets/base/js/v2/advertising-shopping-cart-admin.js"></script>';
?>

<?php include ('navbar_top.php'); ?>
<div class="weui-toptips bg-success topTips"><i class="fa fa-smile-o" aria-hidden="true"></i> 欢迎来到购物车，您可以根据需要调整数量。在页面底部有"合计"总价，如果没问题可以点击"结算"进入支付环节哦！</div>

<div class="weui-panel weui-panel_access" style="background-color: #c9b18d; margin-top: -7px;">
    <div class="weui-panel__hd" style="font-weight: 500; font-size: 18px; color: #514026; padding: 10px;"><i class="fa fa-chevron-circle-right" aria-hidden="true"></i> 购物车</div>
    <div class="weui-panel__bd"></div>
</div>

<div class="page__bd" style="background-color: #EDEDED;">
    <div class="weui-panel" style="background-color: #292929;">
        <div class="weui-panel__hd" style="color: #bba585;">
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

<div style="position: fixed; bottom: 63px; left: 0; right: 0;text-align: center; color: #bba585; z-index: 2;">
    <div class="weui-cells" style="margin-top: 0; background: #292929;">
        <div class="weui-cell" style="margin-bottom: 6px;">
            <div class="weui-cells_checkbox">
                <label class="weui-cell weui-cell_active weui-check__label" for="check_all" style="padding: 0;">
                    <div class="weui-cell__hd" style="float: left; padding-right: 5px;">
                        <input type="checkbox" class="weui-check" name="check_all" id="check_all" checked="checked">
                        <i class="weui-icon-checked" style="color: #bba585;"></i>
                    </div>
                    全选
                </label>
            </div>
            <div class="weui-cell__bd">
                <p>合计: ¥<span id="subTotal"></span><small> (含税)</small></p>
            </div>
            <div class="weui-cell__ft">
                <a id="confirm_price" href="javascript:;" style="background-color: #c9b18d; color: #514026; border-radius: 10px; padding: 8px 16px; text-align: center; font-size: 14px;">结算 <small>(<span id="subQTY"></span><small>)</small></a>
            </div>
        </div>
    </div>
</div>
<br><br><br><br><br>
<?php include ('menu_bottom.php'); ?>

<?php include ('footer.php'); ?>