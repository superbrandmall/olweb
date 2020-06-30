<?php
$scripts = $scripts. '<script type="text/javascript" src="/views/assets/base/js/v2/login-admin.js"></script>';
?>

<div style="position: relative; height: 100vh;">
    <img src="/views/assets/base/img/content/backgrounds/login-logo.png" class="wow slideInRight" data-wow-delay="0.2s" data-wow-offset="300" style="position: absolute; z-index: 1; opacity: 0.6; width: 300px; right: 0; margin: auto 0; top: 0; bottom: 0;" />
    <form id="register_form">
        <div class="page__hd" style="padding: 36px 32px 0;">
            <h1 class="page__title">注册</h1>
        </div>
        <div class="page__bd">
            <div class="weui-form">
                <div class="weui-form__control-area">
                    <div class="weui-cells__group weui-cells__group_form">
                        <div class="weui-cells weui-cells_form">
                            <div class="weui-cell weui-cell_active">
                                <div class="weui-cell__hd errorDiv" id="errorcontainer-register_username"><label class="weui-label">手机号</label></div>
                                <div class="weui-cell__bd">
                                    <input class="weui-input" type="number" pattern="[0-9]*" name="register_username" id="register_username" required placeholder="" value=""/>
                                </div>
                            </div>
                            <div class="weui-cell weui-cell_active weui-cell_vcode">
                                <div class="weui-cell__hd errorDiv" id="errorcontainer-register_verify"><label class="weui-label">验证码</label></div>
                                <div class="weui-cell__bd">
                                    <input autofocus class="weui-input" type="text" pattern="[0-9]*" id="register_verify" name="register_verify" required placeholder="" maxlength="6"/>
                                </div>
                                <div class="weui-cell__ft">
                                    <button id="register_verify_link" onClick="javascript: VeryficationCodeRegister();" class="weui-btn weui-btn_default weui-vcode-btn">获取验证码</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <button type="submit" id="register" style="background: url(/views/assets/base/img/content/backgrounds/register-btn.png); background-size: 100% auto; bottom: -38px; right: 5%; width: 82px; height: 43px; position: absolute; border: 0 none;"></button>
        
    </form>
    <form id="login_form" style="height: 50%;">
        <div class="page__hd" style="padding: 36px 32px 0;">
            <h1 class="page__title">登录</h1>
        </div>
        <div class="page__bd">
            <div class="weui-form" style="padding: 0;">
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
                                    <button id="login_verify_link" onClick="javascript: VeryficationCodeLogin();" class="weui-btn weui-btn_default weui-vcode-btn">获取验证码</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <button type="submit" id="login" style="background: url(/views/assets/base/img/content/backgrounds/login-btn.png); background-size: 100% auto; top: -32px; left: 50%; width: 82px; height: 43px; position: absolute; border: 0 none;"></button>
    </form>
</div>

<?php include ('footer.php'); ?>