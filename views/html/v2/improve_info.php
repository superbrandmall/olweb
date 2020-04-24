<?php
$scripts = $scripts. '<script type="text/javascript" src="/views/assets/base/js/v2/improve-info-admin.js"></script>';
?>

<?php include ('navbar_top.php'); ?>

<form id="improve_form">
    <div class="page__bd" style="background-color: #EDEDED;">
        <div class="weui-form">
            <div class="weui-form__text-area">
                <h2 class="weui-form__title">完善信息</h2>
            </div>
            <div class="weui-form__control-area">
                <div class="weui-cells__group weui-cells__group_form">
                    <div class="weui-cells__title">承租方信息</div>
                    <div class="weui-cells weui-cells_form">
                        <div class="weui-cell weui-cell_active">
                            <div class="weui-cell__hd"><label class="weui-label">公司名*</label></div>
                            <div class="weui-cell__bd">
                                <input name="company_name" id="company_name" class="weui-input" required placeholder="填写公司名"/>
                                <div id="errorcontainer-company_name" class="errorDiv"></div>
                            </div>
                        </div>
                        <div class="weui-cell weui-cell_active">
                            <div class="weui-cell__hd"><label class="weui-label">统一社会信用代码*</label></div>
                            <div class="weui-cell__bd">
                                <input name="uscc" id="uscc" class="weui-input" required placeholder="填写统一社会信用代码"/>
                                <div id="errorcontainer-uscc" class="errorDiv"></div>
                            </div>
                        </div>
                        <div class="weui-cell weui-cell_active">
                            <div class="weui-cell__hd"><label class="weui-label">注册地址/住址*</label></div>
                            <div class="weui-cell__bd">
                                <input name="register_address" id="register_address" class="weui-input" required placeholder="填写注册地址/住址"/>
                                <div id="errorcontainer-register_address" class="errorDiv"></div>
                            </div>
                        </div>
                        <div class="weui-cell weui-cell_active">
                            <div class="weui-cell__hd"><label class="weui-label">负责人身份证号码*</label></div>
                            <div class="weui-cell__bd">
                                <input name="identity_card_no" id="identity_card_no" class="weui-input" required placeholder="填写负责人身份证号码"/>
                                <div id="errorcontainer-identity_card_no" class="errorDiv"></div>
                            </div>
                        </div>
                        <div class="weui-cell weui-cell_active">
                            <div class="weui-cell__hd"><label class="weui-label">邮寄地址*</label></div>
                            <div class="weui-cell__bd">
                                <input name="contact_address" id="contact_address" class="weui-input" required placeholder="填写邮寄地址"/>
                                <div id="errorcontainer-contact_address" class="errorDiv"></div>
                            </div>
                        </div>
                        <div class="weui-cell weui-cell_active">
                            <div class="weui-cell__hd"><label class="weui-label">联系电话*</label></div>
                            <div class="weui-cell__bd">
                                <input name="contact_phone_1" id="contact_phone_1" class="weui-input" required placeholder="填写联系电话"/>
                                <div id="errorcontainer-contact_phone_1" class="errorDiv"></div>
                            </div>
                        </div>
                        <div class="weui-cell weui-cell_active">
                            <div class="weui-cell__hd"><label class="weui-label">开户银行*</label></div>
                            <div class="weui-cell__bd">
                                <input name="bank_name" id="bank_name" class="weui-input" required placeholder="填写开户银行"/>
                                <div id="errorcontainer-bank_name" class="errorDiv"></div>
                            </div>
                        </div>
                        <div class="weui-cell weui-cell_active">
                            <div class="weui-cell__hd"><label class="weui-label">银行账号*</label></div>
                            <div class="weui-cell__bd">
                                <input name="bank_card_no" id="bank_card_no" class="weui-input" required placeholder="填写银行账号"/>
                                <div id="errorcontainer-bank_card_no" class="errorDiv"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="weui-btn-area">
        <button type="submit" class="weui-btn weui-btn_primary" id="improve">提交</button>
    </div>
</form>

<br>
<br>
<br>
<br>

<?php include ('menu_bottom.php'); ?>
<?php include ('footer.php'); ?>