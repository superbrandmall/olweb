<?php
$scripts = $scripts . '<script type="text/javascript" src="/views/assets/base/js/v2-admin/login-admin.js"></script>';
?>

<body class="form-signin-wrapper">
    <div class="container">
        <form id="login_form" class="form-signin">
            <div class="panel periodic-login">
                <div class="panel-body text-center">
                    <p class="element-name">Online Leasing</p>
                    <i class="icons icon-arrow-down"></i>
                    <div class="form-group form-animate-text" style="margin-top:40px !important;">
                        <input class="form-text" name="login_username" id="login_username" type="text" autofocus required>
                        <div id="errorcontainer-login_username" class="errorDiv"></div>
                        <span class="bar"></span>
                        <label>账号</label>
                    </div>
                    <div class="form-group form-animate-text" style="margin-top:40px !important;">
                        <input class="form-text" name="login_password" id="login_password" type="password" autofocus required>
                        <div id="errorcontainer-login_password" class="errorDiv"></div>
                        <span class="bar"></span>
                        <label>密码</label>
                    </div>
                    <button type="submit" class="btn col-md-12">登录</button>
                </div>
            </div>
        </form>
    </div>

    <!-- end: Content -->
<?php include ('footer.php'); ?>