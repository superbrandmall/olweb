<?php
    $scripts = $scripts. '<script type="text/javascript" src="/views/assets/base/js/v2/register-events-admin.js"></script>';
?>

<?php include ('navbar_top.php'); ?>

<form id="register_form">
    <div class="page__bd" style="background-color: #EDEDED;">
        <div class="weui-form">
            <div class="weui-form__text-area">
                <h2 class="weui-form__title">完善信息</h2>
            </div>
            <div class="weui-form__control-area">
                <div class="weui-cells__group weui-cells__group_form" style="margin-top: 24px;">
                    <div class="weui-cells weui-cells_form">
                        <div class="weui-cell weui-cell_active">
                            <div class="weui-cell__hd errorDiv" id="errorcontainer-contact_name_1"><label class="weui-label">姓名*</label></div>
                            <div class="weui-cell__bd">
                                <input type="text" name="contact_name_1" id="contact_name_1" required class="weui-input" placeholder="填写姓名"/>
                            </div>
                        </div>
                        <div class="weui-cell weui-cell_active">
                            <div class="weui-cell__hd errorDiv" id="errorcontainer-email"><label class="weui-label">邮箱*</label></div>
                            <div class="weui-cell__bd">
                                <input type="email" name="email" id="email" required class="weui-input" placeholder="填写邮箱"/>
                            </div>
                        </div>
                        <div class="weui-cell weui-cell_active">
                            <div class="weui-cell__hd errorDiv" id="errorcontainer-sign_body"><label class="weui-label">签约主体*</label></div>
                            <div class="weui-cell__bd">
                                <input type="text" name="sign_body" id="sign_body" required class="weui-input" placeholder="须与营业执照保持一致"/>
                            </div>
                        </div>
                        <div class="weui-cell weui-cell_active">
                            <div class="weui-cell__hd errorDiv" id="errorcontainer-contact_address"><label class="weui-label">联系地址*</label></div>
                            <div class="weui-cell__bd">
                                <input type="text" name="contact_address" id="contact_address" required class="weui-input" placeholder="填写联系地址"/>
                            </div>
                        </div>
                        <div class="weui-cell weui-cell_active">
                            <div class="weui-cell__hd errorDiv" id="errorcontainer-event_name"><label class="weui-label">活动名称*</label></div>
                            <div class="weui-cell__bd">
                                <input type="text" name="event_name" id="event_name" required class="weui-input" placeholder="填写活动名称"/>
                            </div>
                        </div>
                        <div class="weui-cell weui-cell_uploader">
                            <div class="weui-cell__bd">
                                <div class="weui-uploader">
                                    <div class="weui-uploader__hd errorDiv" id="errorcontainer-event_plan">
                                        <p class="weui-uploader__title">活动方案上传*</p>
                                        <div class="weui-uploader__info">.jpg/.png格式</div>
                                    </div>
                                    <div class="weui-uploader__bd">
                                        <ul class="weui-uploader__files" id="event_plans"></ul>
                                        <div class="weui-uploader__input-box">
                                            <input id="event_plan" class="weui-uploader__input" type="file" accept="image/*" multiple/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="weui-cell weui-cell_uploader">
                            <div class="weui-cell__bd">
                                <div class="weui-uploader">
                                    <div class="weui-uploader__hd errorDiv" id="errorcontainer-authorization">
                                        <p class="weui-uploader__title">公司资质授权上传*</p>
                                        <div class="weui-uploader__info">.jpg/.png格式</div>
                                    </div>
                                    <div class="weui-uploader__bd">
                                        <ul class="weui-uploader__files" id="authorizations"></ul>
                                        <div class="weui-uploader__input-box">
                                            <input id="authorization" class="weui-uploader__input" type="file" accept="image/*" multiple/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="weui-cells__title" style="margin: 8px 0 0;">*如资质未到达我司要求，我司有权取消订单</div>
            </div>
        </div>
    </div>

    <div class="weui-btn-area">
        <button type="submit" class="weui-btn weui-btn_primary" id="register">提交信息</button>
    </div>
</form>
<br>
<br>
<br>
<br>

<?php include ('menu_bottom.php'); ?>
<?php include ('footer.php'); ?>