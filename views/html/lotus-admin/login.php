<?php
    $scripts = $scripts .PHP_EOL. '        <script type="text/javascript" src="/views/assets/base/js/lotus-admin/encrypted/login.js"></script>'.PHP_EOL;
?>

<style>
    .btn-primary {
        color: #b8c7ce;
        margin: 20px 0 30px;
        border-radius: 40px;
        padding: 18px 0;
    }
    
    .btn-primary:hover,
    .btn-primary:active,
    .btn-primary:focus    {
        color: #cccccc;
        background: #000000 !important;
    }
</style>
<body class="hold-transition login-page">
<div style="height: 70px; margin: 0 30px 30px;">
    <img id="login-logo" src="/views/assets/base/img/content/lotus-admin/logo.png">
</div>
<form id="login_form">
    <div class="container">
        <div class="row">
            <div class="col-md-4 col-md-offset-7">
                <div class="box login-box">
                    <div class="box-header" style="text-align: center;">
                        <h3>华东区莲花新招商管理系统</h3>
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
                                    <div class="form-group" style="border-bottom: solid 1px #d2d6de;">
                                        <label class="col-md-2 control-label"><i class="fa fa-user" style="font-size: 30px;"></i></label>
                                        <div class="col-md-10">
                                            <input class="form-control" id="login_username" name="login_username" type="text"  autocomplete="off" required autofocus style="border: none;">
                                            <div id="errorcontainer-login_username" class="errorDiv"></div>
                                        </div>
                                    </div>
                                    
                                    <div class="form-group" style="border-bottom: solid 1px #d2d6de;">
                                        <label class="col-md-2 control-label"><i class="fa fa-lock" style="font-size: 30px;"></i></label>
                                        <div class="col-md-10">
                                            <input class="form-control" id="login_verify" name="login_verify" type="text" required autocomplete="off" style="border: none;">
                                            <a href="javascript: VeryficationCodeLogin()" id="login_verify_link" style="display: block; position: absolute; z-index: 10; right: 9px; font-size: 14px; top: 7px;">发送验证码</a>
                                            <div id="errorcontainer-login_verify" class="errorDiv"></div>
                                        </div>
                                    </div>
                                </fieldset>
                            </div>
                        </div>
                    </div>
                    <div class="box-footer text-gray">
                        <button type="submit" class="btn btn-lg btn-primary btn-block">登 录</button>
                        提示：为获得最佳性能，推荐使用火狐或谷歌等浏览器；建议使用1024*768以上分辨率浏览。
                    </div>
                </div>
            </div>
        </div>
    </div>
</form>

<?php
    include ('footer.php');
?>