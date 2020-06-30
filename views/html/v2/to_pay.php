<?php
$scripts = $scripts. '<script type="text/javascript" src="/views/assets/base/js/v2/to-pay-admin.js"></script>'
        . '<script src="/views/assets/plugins/pdfjs/build/pdf.worker.js" type="text/javascript"></script>';
?>

<?php include ('navbar_top.php'); ?>
<div class="weui-toptips bg-success topTips"><i class="fa fa-smile-o" aria-hidden="true"></i> 尊敬的阁下，谢谢您的支持！付完款的订单都在这里哦！</div>

<div class="page__bd" style="background-color: #EDEDED;">
    <div class="weui-tab">
        <div class="weui-navbar">
            <div class="weui-navbar__item" onclick="window.location='/v2/all-orders'">
                全部
            </div>
            <div class="weui-navbar__item" onclick="window.location='/v2/order-to-be-stamped'">
                待确认
            </div>
            <div class="weui-navbar__item" onclick="window.location='/v2/stamping'">
                流程中
            </div>
            <div class="weui-navbar__item weui-bar__item_on" style="background-color: rgb(230, 176, 76); color: #fff;">
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
            <p class="weui-actionsheet__title-text">进场指导手册下载</p>
        </div>
        <div class="weui-actionsheet__menu">
            <div class="weui-actionsheet__cell">租户装修管理手册</div>
            <div class="weui-actionsheet__cell">围挡设计规范</div>
            <div class="weui-actionsheet__cell">工程图纸设计规范</div>
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