<?php
$scripts = $scripts . '<script type="text/javascript" src="/views/assets/plugins/jquery-weui-calendar/calendar.js"></script>'
        . '<script type="text/javascript" src="/views/assets/plugins/zepto.weui.js"></script>'
        . '<script type="text/javascript" src="/views/assets/base/js/v2/advertising-shopping-cart-admin.js"></script>';
?>

<link href="/views/assets/plugins/jquery-weui-calendar/calendar.css" rel="stylesheet" type="text/css"/>
<style type="text/css">
    .weui_cell {
        padding: 10px 15px;
        position: relative;
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -webkit-align-items: center;
        -ms-flex-align: center;
        align-items: center;
    }
    
    .weui_cell::before {
        content: " ";
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 1px;
        border-top: 1px solid #d9d9d9;
        color: #d9d9d9;
        -webkit-transform-origin: 0 0;
        transform-origin: 0 0;
        -webkit-transform: scaleY(.5);
        transform: scaleY(.5);
        left: 15px;
    }
    
    .calendar {
        padding-bottom: 150px;
    }
    
    .old.scheduled span {
        color: #fff;
        background-color: #e0e0e0;
        display: inline-block;
        width: 99%;
        height: 37px;
        line-height: 38px;
        margin-top: 1px;
        border-radius: 3px;
        text-decoration: line-through;
        color: #666;
    }
    
    .calendar-month span.error {
        background-color: #f00 !important;
    }
</style>
<div class="weui-article" style="margin-top: 20px; padding: 0 16px;">
    <h1 style="margin-bottom: 0.5em;">购物车</h1>
</div>

<div class="page__bd">
    <?php include ('timeline/step_two.php'); ?>
    <div id="shoppingCartEmpty" class="weui-panel">
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

<div id="checkPay" style="position: fixed; bottom: 63px; left: 0; right: 0;text-align: center; z-index: 2;">
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
                <p style="font-size: 14px;">合计: <span style="color: #b43018;">¥</span> <span id="subTotal" style="color: #b43018; font-size: 16px;">请先选择档期</span><small> (含税及押金)</small></p>
            </div>
            <div class="weui-cell__ft">
                <a class="weui-btn weui-btn_primary" id="confirm_price" href="javascript:;" style="width: initial; font-size: 14px; padding: 5px 8px 6px;">结算 <small>(<span id="subQTY"></span><small>)</small></a>
            </div>
        </div>
    </div>
</div>
<br><br><br><br><br>

<?php include ('menu_bottom.php'); ?>

<?php include ('footer.php'); ?>