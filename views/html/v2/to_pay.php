<?php
$scripts = $scripts. '<script type="text/javascript" src="/views/assets/base/js/v2/to-pay-admin.js"></script>'
        . '<script src="/views/assets/plugins/pdfjs/build/pdf.worker.js" type="text/javascript"></script>';
?>

<?php include ('navbar_top.php'); ?>
<div class="weui-toptips bg-success topTips"><i class="fa fa-smile-o" aria-hidden="true"></i> 尊敬的阁下，谢谢您的支持！现在您可以点击"查看账单"进行付款哦！</div>

<div class="page__bd">
    <div class="weui-tab">
        <div class="weui-navbar">
            <div class="weui-navbar__item" onclick="window.location='/v2/all-orders'">
                全部
            </div>
            <div class="weui-navbar__item" onclick="window.location='/v2/order-to-be-stamped'">
                待用印
            </div>
            <div class="weui-navbar__item" onclick="window.location='/v2/stamping'">
                用印中
            </div>
            <div class="weui-navbar__item weui-bar__item_on" style="background-color:  #CEB688; color: #fff;">
                待付款
            </div>
        </div>
    </div>
</div>

<div class="weui-panel" style="margin-top: 0;">
    <div class="weui-panel__hd">
        B1FL07 <i class="fa fa-angle-right" aria-hidden="true"></i>
        <div style="color: rgba(0,0,0,.5); float: right;">待付款</div>
    </div>
    <div class="weui-panel__bd">
        <div class="weui-media-box weui-media-box_appmsg">
            <div class="weui-media-box__hd" style="width: 100px; height: 80px;">
                <img class="weui-media-box__thumb" src="http://cre.superbrandmall.com:8280/HDMediaService-Web/fileget?fileID=7e6846e422dbd9887ecf15f30d1c020ad7f5cd50eb73128ea5b8426f8c58b726b38624078f777ed3&amp;fileName=78c42b46876cd5f9&amp;size=0,0" alt="">
            </div>
            <div class="weui-media-box__bd">
                <div class="weui-form-preview__bd" style="font-size: 15px;">
                    <div class="weui-form-preview__item">
                        <span class="weui-form-preview__value">共1件商品 合计: ¥</small>325,241.<small>36</small></span>
                        <span class="weui-form-preview__value"><small>(不包含税费 ¥15,000)</small></span>
                    </div>
                </div>
                
                <ul class="weui-media-box__info" style="float: right;">
                    <li class="weui-media-box__info__meta"><a href="javascript:;" id="check_bill" style="color: #fa5151;">查看账单</a></li>
                    <li class="weui-media-box__info__meta weui-media-box__info__meta_extra"><a class="weui-link" href="/v2/contract-view">查看合同</a></li>
                </ul>
            </div>
        </div>
    </div>
</div>

<br>
<br>
<br>
<br>

<?php include ('menu_bottom.php'); ?>

<?php include ('footer.php'); ?>