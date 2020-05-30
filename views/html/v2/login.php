<?php
$scripts = $scripts. '<script type="text/javascript" src="/views/assets/base/js/v2/login-admin.js"></script>';
?>
<?php include ('navbar_top.php'); ?>

<div class="weui-toptips bg-success topTips"><i class="fa fa-smile-o" aria-hidden="true"></i> 嘿嘿！您不需要记住复杂的密码，用您的手机号及收到的验证码就可以马上登录啦，赶紧试试嘛！</div>

<div class="weui-panel weui-panel_access" style="background-color: #c9b18d; margin-top: -7px;">
    <div class="weui-panel__hd" style="font-weight: 500; font-size: 18px; color: #514026; padding: 10px;"><i class="fa fa-chevron-circle-right" aria-hidden="true"></i> 登录</div>
    <div class="weui-panel__bd"></div>
</div>

<form id="login_form">
    <div class="page__bd">
        <div class="weui-form" style="background-color: #292929; margin-top: -23px;">
            <div class="weui-form__control-area">
                <div class="weui-cells__group weui-cells__group_form">
                    <div class="weui-cells weui-cells_form" style="background-color: #3f3f3f;">
                        <div class="weui-cell weui-cell_active" style="color: #bba585;">
                            <div class="weui-cell__hd errorDiv" id="errorcontainer-login_username"><label class="weui-label">手机号</label></div>
                            <div class="weui-cell__bd">
                                <input class="weui-input" type="number" pattern="[0-9]*" name="login_username" id="login_username" required placeholder="请输入手机号" value=""/>
                            </div>
                        </div>
                        <div class="weui-cell weui-cell_active weui-cell_vcode" style="color: #bba585;">
                            <div class="weui-cell__hd errorDiv" id="errorcontainer-login_verify"><label class="weui-label">验证码</label></div>
                            <div class="weui-cell__bd">
                                <input autofocus class="weui-input" type="text" pattern="[0-9]*" id="login_verify" name="login_verify" required placeholder="输入验证码" maxlength="6"/>
                            </div>
                            <div class="weui-cell__ft">
                                <button id="login_verify_link" onClick="javascript: VeryficationCodeLogin();" class="weui-btn" style="background-color: #c9b18d; color: #514026; border-radius: 12px; font-weight: 500; width: initial; padding: 4px 8px;">获取验证码</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="weui-btn-area">
        <button type="submit" class="weui-btn" id="login" style="background-color: #c9b18d; color: #514026; border-radius: 15px; font-weight: 500; width: initial;">登录</button>
    </div>
</form>

<?php include ('menu_bottom.php'); ?>
<?php include ('footer.php'); ?>