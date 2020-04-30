<?php
if (explode('?type=', $_SERVER['REQUEST_URI'])[1] != null) {
    if(explode('?type=', $_SERVER['REQUEST_URI'])[1] == 'ads'){
        $file = '/views/html/v2/ads_service_agreent-20181107final.pdf';
    } else if(explode('?type=', $_SERVER['REQUEST_URI'])[1] == 'event'){
        $file = '/views/html/v2/event_short_term_template_20181226.pdf';
    }
} else {
    $file = '#';
}

$scripts = $scripts. '<script type="text/javascript" src="/views/assets/base/js/v2/contract-admin.js"></script>'
        . '<script src="/views/assets/plugins/pdfjs/build/pdf.worker.js" type="text/javascript"></script>';
?>

<?php include ('navbar_top.php'); ?>

<div class="page__bd" style="font-size: 15px;">
    <div class="weui-article">
        <h2 class="title">查看合同</h2>
        <h3>请仔细阅读并提交确认</h3>
    </div>
    <div class="weui-article" style="position: relative; padding: 0;">
        <iframe id="pdfContainer" src="/views/assets/plugins/pdfjs/web/viewer.html?file=<?php echo $file; ?>" width="100%" frameborder="0" style="height: 60vh;"></iframe>
    </div>
    <br>
    <center>
        <a href="javascript:" id="confirm_contract" class="weui-btn weui-btn_primary">同意并用印</a>
    </center>
</div>
<br>
<br>
<br>
<br>

<?php include ('menu_bottom.php'); ?>
<?php include ('footer.php'); ?>