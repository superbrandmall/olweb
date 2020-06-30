<?php
$scripts = $scripts. '<script type="text/javascript" src="/views/assets/base/js/v2/transfer-admin.js"></script>';
?>

<div class="weui-form">
    <div class="page__hd" style="text-align: center;">
        <h1 class="page__title" style="font-size: 16px; font-weight: 400; margin-bottom: 30px;">转账确认</h1>
        <p class="page__desc" style="font-size: 16px;">向<b style="font-size: 18px;">上海帝泰发展有限公司</b>转账</p>
        <p class="page__desc" style="font-size: 16px; margin-bottom: 10px;"><i class="fa fa-credit-card" aria-hidden="true"></i> 6242 3535 5344 4343 213</p>
        <p class="page__desc" style="font-size: 24px;">¥ <span id="amount"></span></p>
        <p class="page__desc" style="font-size: 16px; margin-bottom: 30px;">预计<span style="color: red;">24小时内</span>到账</p>

    </div>

    <form id="login_form">
        <div class="page__bd" style="background-color: #EDEDED;">
            <div class="weui-form__control-area">
                <div class="weui-cells__group weui-cells__group_form">
                    <div class="weui-cells weui-cells_form">
                        <div class="weui-cell weui-cell_active weui-cell_vcode">
                            <div class="weui-cell__hd errorDiv" id="errorcontainer-sms_code"><label class="weui-label">短信密码</label></div>
                            <div class="weui-cell__bd">
                                <input autofocus class="weui-input" type="text" pattern="[0-9]*" id="sms_code" name="sms_code" required placeholder="" maxlength="4"/>
                            </div>
                            <div class="weui-cell__ft">
                                <button id="login_verify_link" style="font-size: 16px;">获取密码</button>
                            </div>
                        </div>
                        <div class="weui-cell weui-cell_active">
                            <div class="weui-cell__hd errorDiv" id="errorcontainer-transfer_code"><label class="weui-label">交易密码</label></div>
                            <div class="weui-cell__bd">
                                <input class="weui-input" type="password" pattern="[0-9]*" name="transfer_code" id="transfer_code" required placeholder="请输入交易密码" value=""/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="weui-btn-area">
            <button type="submit" class="weui-btn weui-btn_default" id="confirm_pay">确认转账</button>
        </div>
    </form>
</div>

<?php include ('footer.php'); ?>