<?php
$scripts = $scripts. '<script type="text/javascript" src="/views/assets/base/js/v2/authentication-admin.js"></script>';
?>

<?php include ('navbar_top.php'); ?>

<form id="authentication_form">
    <div class="page__bd" style="background-color: #EDEDED;">
        <div class="weui-form">
            <div class="weui-form__text-area">
                <h2 class="weui-form__title">授权认证</h2>
            </div>
            <div class="weui-form__control-area">
                <div class="weui-cells__group weui-cells__group_form">
                    <div class="weui-cells__title" style="margin-top: 24px;">公司认证必填</div>
                    <div class="weui-cells weui-cells_form">
                        <div class="weui-cell weui-cell_active">
                            <div class="weui-cell__hd"><label class="weui-label">公司名*</label></div>
                            <div class="weui-cell__bd">
                                <input name="company_name"  id="company_name" required class="weui-input" placeholder="填写公司名"/>
                                <div id="errorcontainer-company_name" class="errorDiv"></div>
                            </div>
                        </div>
                        <div class="weui-cell weui-cell_active">
                            <div class="weui-cell__hd"><label class="weui-label">统一社会信用代码*</label></div>
                            <div class="weui-cell__bd">
                                <input name="uscc" id="uscc" required class="weui-input" placeholder="填写统一社会信用代码"/>
                                <div id="errorcontainer-uscc" class="errorDiv"></div>
                            </div>
                        </div>
                        <div class="weui-cell  weui-cell_uploader">
                            <div class="weui-cell__bd">
                                <div class="weui-uploader">
                                    <div class="weui-uploader__hd">
                                        <p class="weui-uploader__title">营业执照图片上传*</p>
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
                    </div>
                </div>
            </div>
        </div>
        <br>
        <div class="weui-form">
            <div class="weui-form__control-area">
                <div class="weui-cells__group weui-cells__group_form">
                    <div class="weui-cells__title">其它选填资料</div>
                    <div class="weui-cells weui-cells_form">
                        <div class="weui-cell  weui-cell_uploader">
                            <div class="weui-cell__bd">
                                <div class="weui-uploader">
                                    <div class="weui-uploader__hd">
                                        <p class="weui-uploader__title">名片图片上传</p>
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
                                        <p class="weui-uploader__title">品牌Logo图片上传</p>
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
                                        <p class="weui-uploader__title">品牌介绍图片上传</p>
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
        <br>
        <div class="weui-form">
            <div class="weui-form__control-area">
                <div id="malls" class="weui-cells__group weui-cells__group_form" style="background-color: #EDEDED;">
                    <div class="weui-cells__title" style="background-color: #fff; margin-bottom: 0; padding-bottom: 8px;">
                        选填现有门店经营状况
                        <a class="add weui-link" href="#" style="float: right;">增加更多门店</a>
                    </div>
                    <div class="weui-cells weui-cells_form">
                        <div class="weui-cell weui-cell_active">
                            <div class="weui-cell__hd"><label class="weui-label">所在商场</label></div>
                            <div class="weui-cell__bd">
                                <input id="mall_1" class="mall weui-input" placeholder="填写商场名"/>
                            </div>
                        </div>
                        <div class="weui-cell weui-cell_active">
                            <div class="weui-cell__hd"><label class="weui-label">楼层</label></div>
                            <div class="weui-cell__bd">
                                <input id="floor_1" class="floor weui-input" placeholder="填写楼层"/>
                            </div>
                        </div>
                        <div class="weui-cell weui-cell_active">
                            <div class="weui-cell__hd"><label class="weui-label">面积(m²)</label></div>
                            <div class="weui-cell__bd">
                                <input id="area_1" class="area weui-input" placeholder="填写面积"/>
                            </div>
                        </div>
                        <div class="weui-cell weui-cell_active">
                            <div class="weui-cell__hd"><label class="weui-label">营业额(万)</label></div>
                            <div class="weui-cell__bd">
                                <input id="sales_1" class="sales weui-input" placeholder="填写营业额"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="weui-btn-area">
        <button type="submit" class="weui-btn weui-btn_primary" id="to_authenticate">提交认证</button>
    </div>
</form>
<br>
<br>
<br>
<br>

<?php include ('menu_bottom.php'); ?>
<?php include ('footer.php'); ?>