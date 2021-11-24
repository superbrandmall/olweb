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
                    <script type="text/javascript" src="/views/assets/base/js/v2/contract-view-admin.js"></script>
                    <script src="/views/assets/plugins/pdfjs/build/pdf.worker.js" type="text/javascript"></script>
                    <script src="/views/assets/base/js/v2/my-files-admin.js" type="text/javascript" ></script>';
?>

<link rel="stylesheet" type="text/css" href="/views/assets/base/css/nikola/bootstrap.min.css" />
<link rel="stylesheet" type="text/css" href="/views/assets/base/css/nikola.css" />

<div class="weui-cells" id="download_links" style="font-size: 13px; margin-top: 65px;">
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
} else if($type == 'advertising'){
    include ('advertising_summary.php');
} else if($type == 'events'){
    include ('events_summary.php');
}

?>

<form id="authentication_form" style="margin-top: 20px;">
    <div class="page__bd">
        <div class="weui-form__text-area">
            <h2 class="weui-form__title">上传资质文件</h2>
        </div>
        <div class="weui-form__control-area">
            <div class="weui-cells__group weui-cells__group_form">
                <div class="weui-cells__title"><i class="fa fa-info-circle"></i> 请您上传相关资质文件以通过我司法务审核，如有问题，我司将会以邮件形式通知您。</div>
                <div class="weui-cells weui-cells_form">
                    <div class="weui-cell  weui-cell_uploader">
                        <div class="weui-cell__bd">
                            <div class="weui-uploader">
                                <div class="weui-uploader__hd">
                                    <p class="weui-uploader__title">上传营业执照</p>
                                </div>
                                <div class="weui-uploader__bd">
                                    <p class="weui-cells__title" style="padding: 0;">请上传营业执照电子版或复印件并加盖公章</p>
                                    <ul class="weui-uploader__files" id="uploaderFiles__business_license"></ul>
                                    <div class="weui-uploader__input-box">
                                        <input id="business_license" class="weui-uploader__input" type="file" accept="image/*,application/pdf" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="weui-cell  weui-cell_uploader">
                        <div class="weui-cell__bd">
                            <div class="weui-uploader">
                                <div class="weui-uploader__hd">
                                    <p class="weui-uploader__title">上传法人代表身份证件</p>
                                </div>
                                <div class="weui-uploader__bd">
                                    <p class="weui-cells__title" style="padding: 0;">请上传法人代表身份证件复印件并加盖公章</p>
                                    <ul class="weui-uploader__files" id="uploaderFiles__id_card"></ul>
                                    <div class="weui-uploader__input-box">
                                        <input id="id_card" class="weui-uploader__input" type="file" accept="image/*,application/pdf" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="weui-cell  weui-cell_uploader">
                        <div class="weui-cell__bd">
                            <div class="weui-uploader">
                                <div class="weui-uploader__hd">
                                    <p class="weui-uploader__title">上传商标注册证</p>
                                    <div class="weui-uploader__info">限自持或代理品牌</div>
                                </div>
                                <div class="weui-uploader__bd">
                                    <p class="weui-cells__title" style="padding: 0;"></p>
                                    <ul class="weui-uploader__files" id="uploaderFiles__trademark"></ul>
                                    <div class="weui-uploader__input-box">
                                        <input id="trademark" class="weui-uploader__input" type="file" accept="image/*,application/pdf" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="weui-cell  weui-cell_uploader">
                        <div class="weui-cell__bd">
                            <div class="weui-uploader">
                                <div class="weui-uploader__hd">
                                    <p class="weui-uploader__title">上传品牌授权书</p>
                                    <div class="weui-uploader__info">限代理品牌</div>
                                </div>
                                <div class="weui-uploader__bd">
                                    <p class="weui-cells__title" style="padding: 0;"></p>
                                    <ul class="weui-uploader__files" id="uploaderFiles__brand_authorization"></ul>
                                    <div class="weui-uploader__input-box">
                                        <input id="brand_authorization" class="weui-uploader__input" type="file" accept="image/*,application/pdf" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="weui-cell  weui-cell_uploader">
                        <div class="weui-cell__bd">
                            <div class="weui-uploader">
                                <div class="weui-uploader__hd">
                                    <p class="weui-uploader__title">上传电子签章人授权书</p>
                                    <div class="weui-uploader__info"><a href="/upload/docs/guides/esign_proxy.docx" download="/upload/docs/guides/esign_proxy.docx">《电子签章授权书》</a></div>
                                </div>
                                <div class="weui-uploader__bd">
                                    <p class="weui-cells__title" style="padding: 0;">请上传电子签章人授权书并加盖公章</p>
                                    <ul class="weui-uploader__files" id="uploaderFiles__esign_authorization"></ul>
                                    <div class="weui-uploader__input-box">
                                        <input id="esign_authorization" class="weui-uploader__input" type="file" accept="image/*,application/pdf" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <?php
                        if($type == 'events'){
                    ?>
                    <div class="weui-cell  weui-cell_uploader">
                        <div class="weui-cell__bd">
                            <div class="weui-uploader">
                                <div class="weui-uploader__hd">
                                    <p class="weui-uploader__title">上传活动方案</p>
                                    <div class="weui-uploader__info">限场地业务</div>
                                </div>
                                <div class="weui-uploader__bd">
                                    <p class="weui-cells__title" style="padding: 0;">请上传活动方案</p>
                                    <ul class="weui-uploader__files" id="uploaderFiles__event_program"></ul>
                                    <div class="weui-uploader__input-box">
                                        <input id="event_program" class="weui-uploader__input" type="file" accept="image/*,application/pdf" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <?php
                        }
                    ?>
                    
                    <?php
                        if($type == 'advertising'){
                    ?>
                    <div class="weui-cell  weui-cell_uploader">
                        <div class="weui-cell__bd">
                            <div class="weui-uploader">
                                <div class="weui-uploader__hd">
                                    <p class="weui-uploader__title">上传广告效果图</p>
                                    <div class="weui-uploader__info">限广告业务</div>
                                </div>
                                <div class="weui-uploader__bd">
                                    <p class="weui-cells__title" style="padding: 0;">请上传广告效果图</p>
                                    <ul class="weui-uploader__files" id="uploaderFiles__ad_design_sketch"></ul>
                                    <div class="weui-uploader__input-box">
                                        <input id="ad_design_sketch" class="weui-uploader__input" type="file" accept="image/*,application/pdf" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <?php
                        }
                    ?>
                </div>
            </div>
        </div>
    </div>
</form>

<div class="weui-btn-area" style="margin-top: 20px;">
    <center>
        <button type="button" class="weui-btn weui-btn_mini btn-secondary" onclick="javascript: window.history.back(-1);" style="border-radius: 20px; color: #000;">返回</button>
        <button type="button" class="weui-btn weui-btn_mini btn-secondary" id="negotiate" style="border-radius: 20px;">谢绝</button>
        <button type="button" class="weui-btn weui-btn_mini btn-primary" id="update_files" style="border-radius: 20px;">更新文件</button>
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

<div id="js_toast" style="display: none;">
    <div class="weui-mask_transparent"></div>
    <div class="weui-toast">
        <i class="weui-icon-success-no-circle weui-icon_toast"></i>
        <p class="weui-toast__content">文件更新成功</p>
    </div>
</div>


<div id="js_toast_1" style="display: none;">
    <div class="weui-mask_transparent"></div>
    <div class="weui-toast">
        <i class="weui-icon-success-no-circle weui-icon_toast"></i>
        <p class="weui-toast__content">合同发送成功</p>
    </div>
</div>

<div id="js_toast_2" style="display: none;">
    <div class="weui-mask_transparent"></div>
    <div class="weui-toast">
        <i class="weui-icon-success-no-circle weui-icon_toast"></i>
        <p class="weui-toast__content">文件删除成功</p>
    </div>
</div>

<br>
<br>
<br>

<?php include ('footer.php'); ?>