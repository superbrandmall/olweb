<?php
if (explode('?type=', $_SERVER['REQUEST_URI'])[1] != null) {
    $type = explode('?type=', $_SERVER['REQUEST_URI'])[1];
    if (strpos($type, '&trade=') !== false) {
        $type = explode('&trade=', $type)[0];
    }
} else {
    $type = null;
}

$scripts = $scripts . '<script type="text/javascript" src="/views/assets/base/js/v2/contract-admin.js"></script>'
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

<div class="weui-btn-area" style="margin-top: 20px;">
    <button type="button" class="weui-btn weui-btn_primary" id="confirm_contract">同意并用印</button>
</div>

<div id="contract_pdf" class="weui-gallery" style="display: none;">
    <iframe id="pdfContainer" src="#" width="100%" frameborder="0" style="height: 90vh;"></iframe>
    <div class="weui-gallery__opr">
        <a href="javascript:;" class="weui-gallery__del">
            <i class="fa fa-times" aria-hidden="true" style="color: #fff;" onclick='$("#contract_pdf").hide();'></i>
        </a>
    </div>
</div>

<div id="engineering_pdf" class="weui-gallery" style="display: none;">
    <iframe id="engineeringContainer" src="#" width="100%" frameborder="0" style="height: 90vh;"></iframe>
    <div class="weui-gallery__opr">
        <a href="javascript:;" class="weui-gallery__del">
            <i class="fa fa-times" aria-hidden="true" style="color: #fff;" onclick='$("#engineering_pdf").hide();'></i>
        </a>
    </div>
</div>

<div class="js_dialog" id="authDialog" style="display: none;">
    <form id="authDialogForm">
        <div class="weui-mask"></div>
        <div class="weui-dialog">
            <div class="weui-dialog__hd"><strong class="weui-dialog__title">授权人信息</strong></div>
            <div class="weui-dialog__bd">
                <div class="weui-cells weui-cells_form">
                    <div class="weui-cell weui-cell_active">
                        <div class="weui-cell__hd errorDiv" id="errorcontainer-authName" style="text-align: left;"><label class="weui-label">姓名*</label></div>
                        <div class="weui-cell__bd">
                            <input name="authName" id="authName" class="weui-input" required placeholder="填写授权人姓名"/>
                        </div>
                    </div>
                    <div class="weui-cell weui-cell_active">
                        <div class="weui-cell__hd errorDiv" id="errorcontainer-authPhone" style="text-align: left;"><label class="weui-label">手机号*</label></div>
                        <div class="weui-cell__bd">
                            <input class="weui-input" type="number" pattern="[0-9]*" name="authPhone" id="authPhone" required placeholder="填写授权人手机号" value=""/>
                        </div>
                    </div>
                    <div class="weui-cell weui-cell_active">
                        <div class="weui-cell__hd errorDiv" id="errorcontainer-authIdentity" style="text-align: left;"><label class="weui-label">身份证号*</label></div>
                        <div class="weui-cell__bd">
                            <input name="authIdentity" id="authIdentity" class="weui-input" required placeholder="填写授权人身份证号"/>
                        </div>
                    </div>
                </div>
            </div>
            <div class="weui-dialog__ft">
                <a href="javascript: hideDialog();" class="weui-dialog__btn weui-dialog__btn_default">取消</a>
                <button type="submit" class="weui-dialog__btn weui-dialog__btn_primary" style="color: var(--weui-FG-HALF); font-size: 17px; border: 0 none; background: #fff;">提交信息</button>
            </div>
        </div>
    </form>
</div>

<br>
<br>
<br>

<?php include ('menu_bottom.php'); ?>
<?php include ('footer.php'); ?>