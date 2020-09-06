<?php
$scripts = $scripts. '<script type="text/javascript" src="/views/assets/base/js/v2/login-admin.js"></script>';
?>

<div style="position: relative;">
    <img src="/views/assets/base/img/content/backgrounds/login-logo.png" style="position: absolute; height: 705px; width: 100%; left: 0; margin: auto 0; top: 705px; bottom: 0;" />
    <img src="/views/assets/base/img/content/backgrounds/login-welcome.png" class="wow slideInDown" data-wow-delay="0.1s" data-wow-offset="300" width="180" style="margin: 20px 0 0 10px;" />
    <form id="login_form" class="wow slideInLeft" data-wow-delay="0.2s" data-wow-offset="300">
        <div class="page__hd" style="padding-left: 15px;">
            <h1 class="page__title">登 录</h1>
        </div>
        <div class="page__bd">
            <div class="weui-form" style="padding: 0;">
                <div class="weui-form__control-area">
                    <div class="weui-cells__group weui-cells__group_form">
                        <div class="weui-cells weui-cells_form">
                            <div class="weui-cell weui-cell_active">
                                <div class="weui-cell__hd errorDiv" id="errorcontainer-login_username" style="padding-right: 0;"><label class="weui-label" style="margin-right: 0; max-width: 3.5em;">手机号</label></div>
                                <div class="weui-cell__bd">
                                    <input class="weui-input" type="number" pattern="[0-9]*" name="login_username" id="login_username" required placeholder="" value=""/>
                                </div>
                            </div>
                            <div class="weui-cell weui-cell_active weui-cell_vcode">
                                <div class="weui-cell__hd errorDiv" id="errorcontainer-login_verify" style="padding-right: 0;"><label class="weui-label" style="margin-right: 0; max-width: 3.5em;">验证码</label></div>
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
        
        <div style="width: 220px; text-align: right; margin-top: 10px;">
            <button type="submit" id="login" style="background: url(/views/assets/base/img/content/backgrounds/login-btn.png); background-size: 100% auto; width: 50px; height: 50px; border: 0 none;"></button>
        </div>
    </form>
</div>

<?php include ('footer.php'); ?>