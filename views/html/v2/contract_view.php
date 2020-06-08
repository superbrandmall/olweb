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

$scripts = $scripts. '<script type="text/javascript" src="/views/assets/base/js/v2/contract-view-admin.js"></script>'
        . '<script src="/views/assets/plugins/pdfjs/build/pdf.worker.js" type="text/javascript"></script>';
?>

<?php include ('navbar_top.php'); ?>

<div class="weui-panel weui-panel_access" style="background-color: #c9b18d; margin-top: -7px;">
    <div class="weui-panel__hd" style="font-weight: 500; font-size: 18px; color: #514026; padding: 10px;"><i class="fa fa-chevron-circle-right" aria-hidden="true"></i> 查看合同</div>
    <div class="weui-panel__bd"></div>
</div>

<div class="page__bd" style="font-size: 15px;">
    <div class="weui-article" style="position: relative; padding: 0;">
        <iframe id="pdfContainer" src="/views/assets/plugins/pdfjs/web/viewer.html?file=<?php echo $file; ?>" width="100%" frameborder="0" style="height: 60vh;"></iframe>
    </div>
    <br>
    <center>
        <button type="button" class="weui-btn" onclick="javascript: window.history.back(-1);" style="background-color: #c9b18d; color: #514026; border-radius: 15px; font-weight: 500; width: initial;">关闭</button>
    </center>
</div>
<br>
<br>
<br>
<br>

<?php include ('menu_bottom.php'); ?>
<?php include ('footer.php'); ?>