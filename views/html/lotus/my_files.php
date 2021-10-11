<?php
$scripts = $scripts. '<script type="text/javascript" src="/views/assets/base/js/v2/my-files-admin.js"></script>';
?>

<form id="authentication_form" style="margin-top: 20px;">
    <div class="page__bd">
        <div class="weui-form__text-area">
            <h2 class="weui-form__title">上传资质文件</h2>
        </div>
        <div class="weui-form__control-area">
            <div class="weui-cells__group weui-cells__group_form">
                <div class="weui-cells__title"><i class="fa fa-info-circle"></i> 请您上传相关资质文件，如有问题，我司将会以短信和邮件通知您。</div>
                <div class="weui-cells weui-cells_form">
                    <div class="weui-cell  weui-cell_uploader">
                        <div class="weui-cell__bd">
                            <div class="weui-uploader">
                                <div class="weui-uploader__hd">
                                    <p class="weui-uploader__title">上传营业执照图片</p>
                                    <div class="weui-uploader__info">.jpg/.png格式</div>
                                </div>
                                <div class="weui-uploader__bd">
                                    <ul class="weui-uploader__files" id="uploaderFiles__business_license"></ul>
                                    <div class="weui-uploader__input-box">
                                        <input id="business_license" class="weui-uploader__input" type="file" accept="image/*" multiple/>
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
                                    <div class="weui-uploader__info">.jpg/.png格式</div>
                                </div>
                                <div class="weui-uploader__bd">
                                    <ul class="weui-uploader__files" id="uploaderFiles__id_card"></ul>
                                    <div class="weui-uploader__input-box">
                                        <input id="id_card" class="weui-uploader__input" type="file" accept="image/*" multiple/>
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
                                    <div class="weui-uploader__info">.jpg/.png格式</div>
                                </div>
                                <div class="weui-uploader__bd">
                                    <ul class="weui-uploader__files" id="uploaderFiles__trademark"></ul>
                                    <div class="weui-uploader__input-box">
                                        <input id="trademark" class="weui-uploader__input" type="file" accept="image/*" multiple/>
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
                                    <div class="weui-uploader__info">.jpg/.png格式</div>
                                </div>
                                <div class="weui-uploader__bd">
                                    <ul class="weui-uploader__files" id="uploaderFiles__brand_authorization"></ul>
                                    <div class="weui-uploader__input-box">
                                        <input id="brand_authorization" class="weui-uploader__input" type="file" accept="image/*" multiple/>
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
                                    <div class="weui-uploader__info">.jpg/.png格式</div>
                                </div>
                                <div class="weui-uploader__bd">
                                    <ul class="weui-uploader__files" id="uploaderFiles__esign_authorization"></ul>
                                    <div class="weui-uploader__input-box">
                                        <input id="esign_authorization" class="weui-uploader__input" type="file" accept="image/*" multiple/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</form>
<br>
<br>
<br>

<div id="js_toast" style="display: none;">
    <div class="weui-mask_transparent"></div>
    <div class="weui-toast">
        <i class="weui-icon-success-no-circle weui-icon_toast"></i>
        <p class="weui-toast__content">上传成功</p>
    </div>
</div>

<?php include ('menu_bottom.php'); ?>
<?php include ('footer.php'); ?>