<?php
if (explode('?type=', $_SERVER['REQUEST_URI'])[1] != null) {
    $type = explode('?type=', $_SERVER['REQUEST_URI'])[1];
    if (strpos($type, '&trade=') !== false) {
        $type = explode('&trade=', $type)[0];
    }
} else {
    $type = null;
}

$scripts = $scripts. '<script type="text/javascript" src="/views/assets/base/js/v2/contract-view-admin.js"></script>'
        . '<script src="/views/assets/plugins/pdfjs/build/pdf.worker.js" type="text/javascript"></script>';
?>

<div class="weui-cells" id="download_links" style="margin-top: 20px;">
    <a class="weui-cell weui-cell_access" href="javascript: showContract();" style="width: 40%; float: left;">
        <div class="weui-cell__bd">
            <p>查看合同</p>
        </div>
        <div class="weui-cell__ft"></div>
    </a>
</div>

<?php 
if($type == 'leasing'){
    include ('leasing_summary.php');
} else if($type == 'advertising'){
    include ('advertising_summary.php');
} else if($type == 'events'){
    include ('events_summary.php');
}

?>

<div class="weui-btn-area">
    <button type="button" class="weui-btn weui-btn_default" onclick="javascript: window.history.back(-1);">返回</button>
</div>

<div id="contract_pdf" class="weui-gallery" style="display: none;">
    <iframe id="pdfContainer" src="javascript:;" width="100%" frameborder="0" style="height: 90vh;"></iframe>
    <div class="weui-gallery__opr">
        <a href="javascript:;" class="weui-gallery__del">
            <i class="fa fa-times" aria-hidden="true" style="color: #fff;" onclick='$("#contract_pdf iframe").attr("src","javascript:;"); $("#contract_pdf").hide();'></i>
        </a>
    </div>
</div>

<div id="engineering_pdf" class="weui-gallery" style="display: none;">
    <iframe id="engineeringContainer" src="javascript:;" width="100%" frameborder="0" style="height: 90vh;"></iframe>
    <div class="weui-gallery__opr">
        <a href="javascript:;" class="weui-gallery__del">
            <i class="fa fa-times" aria-hidden="true" style="color: #fff;" onclick='$("#engineering_pdf iframe").attr("src","javascript:;"); $("#engineering_pdf").hide();'></i>
        </a>
    </div>
</div>

<br>
<br>
<br>

<?php include ('menu_bottom.php'); ?>
<?php include ('footer.php'); ?>