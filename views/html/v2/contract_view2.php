<?php
if (explode('?type=', $_SERVER['REQUEST_URI'])[1] != null) {
    $type = explode('?type=', $_SERVER['REQUEST_URI'])[1];
    if (strpos($type, '&trade=') !== false) {
        $type = explode('&trade=', $type)[0];
    }
} else {
    $type = null;
}

$scripts = $scripts. '<script type="text/javascript" src="/views/assets/base/js/nikola/bootstrap.bundle.min.js"></script>
                    <script type="text/javascript" src="/views/assets/base/js/nikola/blocs.min.js"></script>
                    <script type="text/javascript" src="/views/assets/base/js/v2/contract-view2-admin.js"></script>
                    <script src="/views/assets/plugins/pdfjs/build/pdf.worker.js" type="text/javascript"></script>
                    <script src="/views/assets/base/js/v2/my-files-admin.js" type="text/javascript" ></script>';
?>

<link rel="stylesheet" type="text/css" href="/views/assets/base/css/nikola/bootstrap.min.css" />
<link rel="stylesheet" type="text/css" href="/views/assets/base/css/nikola.css" />

<div class="weui-cells" id="download_links" style="margin-top: 65px; font-size: 13px;">
    <a class="weui-cell weui-cell_access" href="javascript: showContract();" style="float: left;">
        <div class="weui-cell__bd">
            <p>查看合同</p>
        </div>
        <div class="weui-cell__ft"></div>
    </a>
    <a id="download_file" class="weui-cell weui-cell_access" href="javascript:;" style="float: left;">
        <div class="weui-cell__bd">
            <p>下载合同</p>
        </div>
        <div class="weui-cell__ft"></div>
    </a>
</div>

<?php 
if($type == 'leasing'){
    include ('leasing_summary.php');
}

?>

<div class="weui-btn-area" style="margin-top: 20px;">
    <center>
        <button type="button" class="weui-btn weui-btn_mini btn-default" onclick="javascript: window.history.back(-1);" style="border-radius: 20px; color: #000;">返回</button>
    </center>
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

<div class="js_dialog" id="contractDialog" style="display: none;">
    <div class="weui-mask"></div>
    <div class="weui-dialog" style="background: #fff;">
        <div class="weui-dialog__hd"><strong class="weui-dialog__title">请提供下载合同的邮箱</strong></div>
        <form id="contractDialogForm">
            <div class="weui-dialog__bd" style="padding: 0;">
                <div class="weui-cells__group weui-cells__group_form">
                    <div class="weui-cells weui-cells_form">
                        <div class="weui-cell weui-cell_active" style="padding: 16px 0;">
                            <div class="weui-cell__hd" style="padding-right: 0;"><label class="weui-label">Email</label></div>
                            <div class="weui-cell__bd">
                                <input name="contractEmail" id="contractEmail" type="email" class="weui-input placeholder" required placeholder="如:first.last@company.com" />
                            </div>
                        </div>
                        <div class="errorDiv" id="errorcontainer-contractEmail"></div>
                    </div>
                </div>
            </div>
            <div class="weui-dialog__ft" style="line-height: 56px; min-height: 56px; font-size: 17px; -webkit-flex-direction: initial;">
                <a href="javascript: hideDialog2();" class="weui-dialog__btn weui-dialog__btn_default">取消</a>
                <button type="submit" class="weui-dialog__btn weui-dialog__btn_primary" style="color: var(--weui-FG-HALF); font-size: 17px; border: 0 none; background: #fff;">提交</button>
            </div>
        </form>
    </div>
</div>


<div id="js_toast_1" style="display: none;">
    <div class="weui-mask_transparent"></div>
    <div class="weui-toast">
        <i class="weui-icon-success-no-circle weui-icon_toast"></i>
        <p class="weui-toast__content">合同发送成功</p>
    </div>
</div>

<br>
<br>
<br>

<?php include ('timeline/step_three.php'); ?>
<?php include ('footer.php'); ?>