<?php
$scripts = $scripts. '<script type="text/javascript" src="/views/assets/base/js/v2/engineering-admin.js"></script>'
        . '<script src="/views/assets/plugins/pdfjs/build/pdf.worker.js" type="text/javascript"></script>';
?>

<?php include ('navbar_top.php'); ?>

<div class="page__bd" style="font-size: 15px;">
    <div class="weui-article">
        <h2 class="title">工程条件确认</h2>
        <h3>请仔细阅读并提交确认</h3>
    </div>
    <div class="weui-article" style="position: relative; padding: 0;">
        <iframe id="pdfContainer" src="/views/assets/plugins/pdfjs/web/viewer.html?file=/views/html/v2/GF01A.pdf" width="100%" frameborder="0" style="height: 80vh;"></iframe>
    </div>
    <br>
    <center>
        <a href="javascript:" id="confirm_engineering" class="weui-btn weui-btn_primary">确认并获取合同</a>
    </center>
</div>
<br>
<br>
<br>
<br>

<?php include ('menu_bottom.php'); ?>
<?php include ('footer.php'); ?>