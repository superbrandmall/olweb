<?php
$scripts = $scripts . '<script type="text/javascript" src="/views/assets/base/js/brands-admin/login-admin.js"></script>';
?>

<style>
    .main-header .navbar, .main-header .logo {
        background-color: #0da5be;
        background: -webkit-linear-gradient(top,  #0da5be 0%,#0da5be 100%);
        background: linear-gradient(to bottom, #0da5be 0%,#0da5be 100%);
        border-color: #0da5be;
    }
    .skin-blue .sidebar-menu > li:hover > a, .skin-blue .sidebar-menu > li.active > a {
        border-left-color: #0da5be;
    }

    .btn-primary {
        background-color: #0da5be;
        border-color: #0da5be;
    }
</style>
<body class="hold-transition login-page">
<center>
    <img id="login-logo" src="/views/assets/base/img/content/brands-admin/logo.png">
</center>
<form id="login_form">
    <div class="container">
        <div class="row">
            <div class="col-md-4 col-md-offset-4">
                <div class="box login-box">
                    <div class="box-header">
                        <h3 class="box-title"> 管理员登录</h3>
                    </div>
                    <div class="login-box-body">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="alert alert-info">
                                    <p>欢迎来到正大广场品牌库! </p>
                                </div>
                            </div>

                            <div class="col-md-12">
                                <div class="alert alert-danger login-failed">
                                    <button type="button" class="close" data-dismiss="alert">&times;</button>
                                    <i class="fa fa-remove faa-pulse animated"></i>
                                    <strong>登录失败!</strong> 账号输入有误。
                                </div>
                            </div>

                            <div class="col-md-12">
                                <fieldset>
                                    <div class="form-group">
                                        <input class="form-control" id="login_username" placeholder="手机或邮箱地址" name="login_username" type="text"  autocomplete="off" required autofocus>
                                        <div id="errorcontainer-login_username" class="errorDiv"></div>
                                    </div>
                                    <div class="form-group">
                                        <input class="form-control" id="login_password" placeholder="密码" name="login_password" type="password" required autocomplete="off">
                                        <div id="errorcontainer-login_password" class="errorDiv"></div>
                                    </div>
                                </fieldset>
                            </div>
                        </div>
                    </div>
                    <div class="box-footer">
                        <button type="submit" class="btn btn-lg btn-primary btn-block">登录</button>
                    </div>
                    <div class="col-md-12 col-sm-12 col-xs-12 text-right" style="padding-top: 10px;">
                        <a href="/brands-admin/reset" style="color: #CEB688;">忘记密码</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</form>
<div class="text-center" style="padding-top: 100px;">
</div>

<?php
    include ('footer.php');
?>