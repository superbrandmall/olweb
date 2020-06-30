<?php
$scripts = $scripts. '<script type="text/javascript" src="/views/assets/base/js/v2/company-info-admin.js"></script>';
?>

<?php include ('navbar_top.php'); ?>

<div class="weui-toptips bg-success topTips"><i class="fa fa-smile-o" aria-hidden="true"></i> 亲！您可以在这里查看或编辑公司联系信息</div>

<form id="company_form">
    <div class="page__bd">
        <div class="weui-form__text-area">
            <h2 class="weui-form__title">公司信息</h2>
        </div>
        <div class="weui-form__control-area">
            <div class="weui-cells__group weui-cells__group_form">
                <div class="weui-cells__title">基本信息</div>
                <div class="weui-cells weui-cells_form">
                    <div class="weui-cell weui-cell_active">
                        <div class="weui-cell__hd errorDiv" id="errorcontainer-company_name"><label class="weui-label">公司名*</label></div>
                        <div class="weui-cell__bd">
                            <input name="company_name" id="company_name" class="weui-input" required placeholder="填写公司名"/>
                        </div>
                    </div>
                    <div class="weui-cell weui-cell_active">
                        <div class="weui-cell__hd errorDiv" id="errorcontainer-uscc"><label class="weui-label">统一社会信用代码*</label></div>
                        <div class="weui-cell__bd">
                            <input name="uscc" id="uscc" class="weui-input" required placeholder="填写统一社会信用代码"/>
                        </div>
                    </div>
                    <div class="weui-cell weui-cell_active">
                        <div class="weui-cell__hd errorDiv" id="errorcontainer-business_scope"><label class="weui-label">经营范围*</label></div>
                        <div class="weui-cell__bd">
                            <input name="business_scope" id="business_scope" required class="weui-input" placeholder="填写经营范围"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <br>
        <div class="weui-form__control-area">
            <div class="weui-cells__group weui-cells__group_form">
                <div class="weui-cells__title">联系方式</div>
                <div class="weui-cells weui-cells_form">
                    <div class="weui-cell weui-cell_active">
                        <div class="weui-cell__hd errorDiv" id="errorcontainer-contact_name_1"><label class="weui-label">联系人*</label></div>
                        <div class="weui-cell__bd">
                            <input name="contact_name_1" id="contact_name_1" required class="weui-input" placeholder="填写联系人姓名"/>
                        </div>
                    </div>
                    <div class="weui-cell weui-cell_active">
                        <div class="weui-cell__hd errorDiv" id="errorcontainer-contact_phone_1"><label class="weui-label">联系电话*</label></div>
                        <div class="weui-cell__bd">
                            <input name="contact_phone_1" id="contact_phone_1" class="weui-input" required placeholder="填写联系电话"/>
                        </div>
                    </div>
                    <div class="weui-cell weui-cell_active">
                        <div class="weui-cell__hd errorDiv" id="errorcontainer-contact_email"><label class="weui-label">联系邮箱*</label></div>
                        <div class="weui-cell__bd">
                            <input type="email" name="contact_email" id="contact_email" required class="weui-input" placeholder="填写电子邮箱"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="weui-btn-area">
        <button type="submit" class="weui-btn weui-btn_primary" id="improve">提交信息</button>
    </div>
</form>

<div id="js_toast" style="display: none;">
    <div class="weui-mask_transparent"></div>
    <div class="weui-toast">
        <i class="weui-icon-success-no-circle weui-icon_toast"></i>
        <p class="weui-toast__content">保存成功</p>
    </div>
</div>

<br>
<br>
<br>

<?php include ('menu_bottom.php'); ?>
<?php include ('footer.php'); ?>