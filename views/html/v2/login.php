<?php
$scripts = $scripts . '<script type="text/javascript" src="/views/assets/base/js/v2/login-admin.js"></script>';
?>

<form id="login_form" class="form-signin">
    <h1 class="h3 mb-3 font-weight-normal">登录</h1>
    <label for="login_username">手机号</label>
    <input type="number" class="form-control" pattern="[0-9]*" name="login_username" id="login_username" placeholder="" required autofocus>
    <div class="errorDiv" id="errorcontainer-login_username"></div>
    <br>
    <label for="login_verify">验证码</label>
    <button id="login_verify_link" onClick="javascript: VeryficationCodeLogin();">获取验证码</button>
    <input type="text" class="form-control" pattern="[0-9]*" id="login_verify" name="login_verify" placeholder="" required maxlength="4">
    <div class="errorDiv" id="errorcontainer-login_verify"></div>
    <br><br>
    <button type="submit" id="login" class="btn btn-lg btn-primary btn-block">登录</button>
    <div class="container mt-5 mb-3 text-muted">
        <div class="row">
            <div class="col-12">
                <p class="text-center">&copy; COPYRIGHT <?= date("Y") ?></p>
                <p class="text-center">上海帝泰发展有限公司版权所有</p>
                <p class="text-center">
                    <a class="text-muted" target="_blank" href="https://beian.miit.gov.cn/">
                        沪ICP备14029636号-1
                    </a>
                </p>
                <p class="text-center">
                    <a class="text-muted" target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=31011502015111">
                        <img src="/views/assets/base/img/content/misc/gongan.png" />
                        沪公网安备 31011502015111号
                    </a>
                </p>
            </div>
        </div>
    </div>
</form>
<?php include ('footer.php'); ?>