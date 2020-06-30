<?php
$scripts = $scripts. '<script type="text/javascript" src="/views/assets/base/js/v2/login-admin.js"></script>';
?>
<?php include ('navbar_top.php'); ?>

<div class="weui-toptips bg-success topTips"><i class="fa fa-smile-o" aria-hidden="true"></i> 嘿嘿！您不需要记住复杂的密码，用您的手机号及收到的验证码就可以马上登录啦，赶紧试试嘛！</div>

<div class="page__hd" style="padding: 32px 32px 0;">
    <h1 class="page__title" style="font-size: 20px; font-weight: 400;">欢迎来到正大Online Leasing!</h1>
    <p class="page__desc" style="margin-top: 4px; color: rgb(191, 191, 191); font-size: 14px;">登录看看有什么新东西吧</p>
</div>

<form id="login_form">
    <div class="page__bd" style="background-color: #EDEDED;">
        <div class="weui-form">
            <div class="weui-form__control-area">
                <div class="weui-cells__group weui-cells__group_form">
                    <div class="weui-cells weui-cells_form">
                        <div class="weui-cell weui-cell_active">
                            <div class="weui-cell__hd errorDiv" id="errorcontainer-login_username"><label class="weui-label">手机号</label></div>
                            <div class="weui-cell__bd">
                                <input class="weui-input" type="number" pattern="[0-9]*" name="login_username" id="login_username" required placeholder="" value=""/>
                            </div>
                        </div>
                        <div class="weui-cell weui-cell_active weui-cell_vcode">
                            <div class="weui-cell__hd errorDiv" id="errorcontainer-login_verify"><label class="weui-label">验证码</label></div>
                            <div class="weui-cell__bd">
                                <input autofocus class="weui-input" type="text" pattern="[0-9]*" id="login_verify" name="login_verify" required placeholder="" maxlength="6"/>
                            </div>
                            <div class="weui-cell__ft">
                                <button id="login_verify_link" onClick="javascript: VeryficationCodeLogin();" class="weui-btn weui-btn_default weui-vcode-btn" style="color: rgb(230, 176, 76);">获取验证码</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="weui-btn-area">
        <button type="submit" class="weui-btn weui-btn_primary" id="login" style="border-radius: 50px; background-color: rgb(230, 176, 76);">登录</button>
    </div>
</form>

<?php include ('menu_bottom.php'); ?>
<?php include ('footer.php'); ?>