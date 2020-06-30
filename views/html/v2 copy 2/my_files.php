<?php
$scripts = $scripts. '<script type="text/javascript" src="/views/assets/base/js/v2/my-files-admin.js"></script>';
?>

<?php include ('navbar_top.php'); ?>

<div class="weui-toptips bg-success topTips"><i class="fa fa-gratipay" aria-hidden="true"></i> 您可以在这里上传所需文件哦。</div>

<form id="authentication_form">
    <div class="page__bd" style="background-color: #EDEDED;">
        <div class="weui-form">
            <div class="weui-form__text-area">
                <h2 class="weui-form__title">我的文件</h2>
            </div>
            <div class="weui-form__control-area">
                <div class="weui-cells__group weui-cells__group_form">
                    <div class="weui-cells__title">上传证照资料</div>
                    <div class="weui-cells weui-cells_form">
                        <div class="weui-cell  weui-cell_uploader">
                            <div class="weui-cell__bd">
                                <div class="weui-uploader">
                                    <div class="weui-uploader__hd">
                                        <p class="weui-uploader__title">上传营业执照图片</p>
                                        <div class="weui-uploader__info">.jpg/.png格式</div>
                                    </div>
                                    <div class="weui-uploader__bd">
                                        <ul class="weui-uploader__files" id="uploaderFiles1"></ul>
                                        <div class="weui-uploader__input-box">
                                            <input id="uploaderInput1" class="weui-uploader__input" type="file" accept="image/*" multiple/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="weui-cell  weui-cell_uploader">
                            <div class="weui-cell__bd">
                                <div class="weui-uploader">
                                    <div class="weui-uploader__hd">
                                        <p class="weui-uploader__title">上传法代身份证件</p>
                                        <div class="weui-uploader__info">.jpg/.png格式</div>
                                    </div>
                                    <div class="weui-uploader__bd">
                                        <ul class="weui-uploader__files" id="uploaderFiles2"></ul>
                                        <div class="weui-uploader__input-box">
                                            <input id="uploaderInput2" class="weui-uploader__input" type="file" accept="image/*" multiple/>
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
                                        <ul class="weui-uploader__files" id="uploaderFiles3"></ul>
                                        <div class="weui-uploader__input-box">
                                            <input id="uploaderInput3" class="weui-uploader__input" type="file" accept="image/*" multiple/>
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
                                        <ul class="weui-uploader__files" id="uploaderFiles4"></ul>
                                        <div class="weui-uploader__input-box">
                                            <input id="uploaderInput4" class="weui-uploader__input" type="file" accept="image/*" multiple/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="weui-btn-area">
        <button type="submit" class="weui-btn weui-btn_primary" id="to_upload">确认上传</button>
    </div>
</form>
<br>
<br>
<br>
<br>

<?php include ('menu_bottom.php'); ?>
<?php include ('footer.php'); ?>