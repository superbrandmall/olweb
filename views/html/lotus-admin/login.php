<?php
$scripts = $scripts . '<script type="text/javascript" src="/views/assets/base/js/lotus-admin/login-admin.js"></script>';
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
    <img id="login-logo" src="/views/assets/base/img/content/lotus-admin/logo.png">
</center>
<form id="login_form">
    <div class="container">
        <div class="row">
            <div class="col-md-4 col-md-offset-4">
                <div class="box login-box">
                    <div class="box-header">
                        <h3 class="box-title"> 用户登录</h3>
                    </div>
                    <div class="login-box-body">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="alert alert-info">
                                    <p>欢迎来到卜蜂莲花招商管理系统! </p>
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
                                        <input class="form-control" id="login_username" placeholder="手机" name="login_username" type="text"  autocomplete="off" required autofocus>
                                        <div id="errorcontainer-login_username" class="errorDiv"></div>
                                    </div>
                                    
                                    <div class="form-group">
                                        <div style="position: relative;">
                                            <input class="form-control" id="login_verify" placeholder="验证码" name="login_verify" type="text" required autocomplete="off">
                                            <a href="javascript: VeryficationCodeLogin()" id="login_verify_link" style="display: block; position: absolute; z-index: 10; right: 9px; font-size: 14px; top: 7px;">发送验证码</a>
                                        </div>
                                        <div id="errorcontainer-login_verify" class="errorDiv"></div>
                                    </div>
                                    
                                </fieldset>
                            </div>
                        </div>
                    </div>
                    <div class="box-footer">
                        <button type="submit" class="btn btn-lg btn-primary btn-block">登录</button>
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