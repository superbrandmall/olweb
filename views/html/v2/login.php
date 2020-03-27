<?php
$scripts = $scripts. '<script type="text/javascript" src="/views/assets/base/js/v2/login-admin.js"></script>';
?>

<body>
    <div class="container">
        <div class="row">
            <div style="max-width: 320px; margin: 0 auto;">
                <div class="login-panel panel panel-default">
                    <div class="panel-heading">
                        <h3 class="panel-title">欢迎来到 Online Leasing 2.0</h3>
                    </div>
                    <div class="panel-body">
                        <form id="login_form">
                            <fieldset>
                                <div class="alert alert-warning login-failed" role="alert">
                                    <strong>登录失败!</strong> 账号输入有误。
                                </div>
                                <div class="form-group">
                                    <input class="form-control" placeholder="手机或邮箱地址" name="login_username" id="login_username" type="text" autofocus required>
                                    <div id="errorcontainer-login_username" class="errorDiv"></div>
                                </div>
                                <div class="form-group">
                                    <input class="form-control" placeholder="密码" id="login_password" name="login_password" type="password" required>
                                    <div id="errorcontainer-login_password" class="errorDiv"></div>
                                </div>
                                <button type="submit" class="btn btn-lg btn-success btn-block">登录</button>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

<?php include ('footer.php'); ?>