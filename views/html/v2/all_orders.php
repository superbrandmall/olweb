<?php
$scripts = $scripts . '<script type="text/javascript" src="/views/assets/base/js/v2/all-orders-admin.js"></script>';
?>

<?php include ('timeline/step_three.php'); ?>

<div class="page__bd" style="background-color: #EDEDED;">
    <div class="weui-tab">
        <div class="weui-navbar">
            <div class="weui-navbar__item weui-bar__item_on" style="border-bottom: solid 1px #3F4E72; background: transparent;">
                全部
            </div>
            <div class="weui-navbar__item" onclick="window.location='/v2/stamping'">
                流程中
            </div>
            <div class="weui-navbar__item" onclick="window.location='/v2/to-pay'">
                已完成
            </div>
        </div>
    </div>

    <div id="orders"></div>
</div>

<div>
    <div class="weui-mask" id="iosMask" style="display: none;"></div>
    <div class="weui-actionsheet" id="iosActionsheet">
        <div class="weui-actionsheet__title">
            <p class="weui-actionsheet__title-text">进场指导文件下载</p>
        </div>
        <div class="weui-actionsheet__menu">
            <a href="/upload/docs/guides/tenants_fitting_out_manual.pdf" download="/upload/docs/guides/tenants_fitting_out_manual.pdf" class="weui-actionsheet__cell" style="display: block; color: #000;">租户装修管理手册</a>
            <a href="/upload/docs/guides/hoarding_guide.pdf" download="/upload/docs/guides/hoarding_guide.pdf" class="weui-actionsheet__cell" style="display: block; color: #000;">围挡设计规范</a>
            <a href="/upload/docs/guides/decoration.pdf" download="/upload/docs/guides/decoration.pdf" class="weui-actionsheet__cell" style="display: block; color: #000;">(装修、消防装修)委托书</a>
        </div>
        <div class="weui-actionsheet__action">
            <div class="weui-actionsheet__cell" id="iosActionsheetCancel">取消</div>
        </div>
    </div>
</div>

<br>
<br>
<br>
<br>

<?php include ('menu_bottom.php'); ?>

<?php include ('footer.php'); ?>