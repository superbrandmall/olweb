<?php
    $scripts = $scripts .PHP_EOL. '        <script type="text/javascript" src="/views/assets/base/js/lotus-admin/encrypted/login.js"></script>'.PHP_EOL;
?>

<style>
    body {
        background: #ecf0f5;
    }

    .btn-primary {
        background-color: #222d32;
        color: #b8c7ce;
    }
    
    .btn-primary:hover,
    .btn-primary:active,
    .btn-primary:focus    {
        color: #425559;
        font-weight: bold;
        background: #1a2226;
    }
</style>
<body class="hold-transition login-page">
<div class="jumbotron hero-spacer" style="background: url(/views/assets/base/img/content/lotus-admin/center-top-bj.jpg) 0 0 no-repeat; background-color: #cb220a;">
    <div style="width: 360px; margin: 0 auto;">
        <img id="login-logo" src="/views/assets/base/img/content/lotus-admin/logo.png">
        <h3 style="display: inline-block; vertical-align: bottom; color: #fff; margin-left: 8px;">集成安全系统</h3>
        <img class="img-responsive" src="/views/assets/base/img/content/lotus-admin/slogan.png">
    </div>
</div>
<form id="login_form">
    <div class="container">
        <div class="row">
            <div class="col-md-4">
                <div class="box login-box">
                    <div class="box-header" style="background: #fff;">
                        <h3 class="box-title"> 用户登录</h3>
                    </div>
                    <div class="sub-header" style="display: none;">
                        <h4>登录 - [正大集团卜蜂莲花]</h4>
                    </div>
                    <div class="login-box-body">
                        <div class="row">
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
            <div class="col-md-6 col-md-offset-1">
                <div style="margin: 20px 20px 150px;">
                    <h5>应用系统：</h5>
                    <div class="col-md-12">
                        <div class="col-xs-4 text-center" style="margin-bottom: 10px;">
                            <img src="/views/assets/base/img/content/lotus-admin/lotus.png" width="50"><br>
                            莲花招商管理
                        </div>
                        <div class="col-xs-4 text-center" style="margin-bottom: 10px;">
                            <img src="/views/assets/base/img/content/lotus-admin/lotus.png" width="50"><br>
                            快闪日常管理
                        </div>
                        <div class="col-xs-4 text-center" style="margin-bottom: 10px;">
                            <img src="/views/assets/base/img/content/lotus-admin/lotus.png" width="50"><br>
                            DR商务审批
                        </div>
                    </div>
                </div>
                <hr>
                提示：为获得最佳性能，推荐使用火狐、谷歌等浏览器。<br>
                建议使用1024*768以上分辨率浏览。
            </div>
        </div>
    </div>
</form>

<?php
    include ('footer.php');
?>