<?php
$scripts = $scripts. '<script type="text/javascript" src="/views/assets/base/js/v2/engineering-admin.js"></script>'
        . '<script src="/views/assets/plugins/pdfjs/build/pdf.worker.js" type="text/javascript"></script>';
?>

<?php include ('navbar_top.php'); ?>

<div class="weui-toptips bg-success topTips"><i class="fa fa-gratipay" aria-hidden="true"></i> 谢谢您能接受我们的报价，麻烦您再看一下本铺位的工程条件是否还有什么问题？</div>

<div class="weui-panel weui-panel_access" style="background-color: #c9b18d; margin-top: -7px;">
    <div class="weui-panel__hd" style="font-weight: 500; font-size: 18px; color: #514026; padding: 10px;"><i class="fa fa-chevron-circle-right" aria-hidden="true"></i> 工程条件确认</div>
    <div class="weui-panel__bd"></div>
</div>

<div class="page__bd" style="font-size: 15px;">
    <div class="weui-article" style="color: #bba585; padding: 8px 16px;">
        <h3><span style="color: #fff">*</span> 请仔细阅读并提交确认</h3>
    </div>
    <div class="weui-article" style="position: relative; padding: 0;">
        <iframe id="pdfContainer" src="/views/assets/plugins/pdfjs/web/viewer.html?file=/views/html/v2/GF01A.pdf" width="100%" frameborder="0" style="height: 80vh;"></iframe>
    </div>
    <br>
    <center>
        <button type="button" class="weui-btn" id="confirm_engineering" style="background-color: #c9b18d; color: #514026; border-radius: 15px; font-weight: 500; width: initial;">确认并获取合同</button>
    </center>
</div>
<br>
<br>
<br>
<br>

<?php include ('menu_bottom.php'); ?>
<?php include ('footer.php'); ?>