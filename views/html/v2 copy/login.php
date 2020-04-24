<?php
if (explode('?', $_SERVER['REQUEST_URI'])[1] != null) {
    $param = '?'.explode('?', $_SERVER['REQUEST_URI'])[1];
} else {
    $param = '';
}

$scripts = $scripts. '<script type="text/javascript" src="/views/assets/base/js/v2/login-admin.js"></script>';
?>

<div id="wrapper">
    <?php include ('navbar_top.php'); ?>
    <div id="page-wrapper">
        <div class="row">
            <div class="col-xs-6" style="text-align: center;padding: 20px 0; border-bottom: solid 2px #eee; background-color: #fff;">
                <a href="/v2/register<?= $param ?>" style="color: #333;">注册</a>
            </div>
            <div class="col-xs-6" style="text-align: center;padding: 20px 0; border-bottom: solid 2px #CEB688; background-color: #fff;">
                <span>登录</span>
            </div>
        </div>
        <div class="row">
            <div class="col-xs-12">
                <form role="form" style="margin-top: 20px;">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            登录信息
                        </div>
                        <div class="panel-body">
                            <div class="form-group input-group">
                                <span class="input-group-addon"><i class="fa fa-phone"></i></span>
                                <input type="tel" class="form-control" placeholder="请输入您的手机号">
                                <span class="input-group-addon" id="send_code">发送验证码</span>
                            </div>
                            <div class="form-group input-group" style="margin-bottom: 0;">
                                <span class="input-group-addon" style="padding: 6px 11px;"><i class="fa fa-key"></i></span>
                                <input type="password" class="form-control" placeholder="请输入您的验证码">
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div class="col-xs-12">
                <center>
                    <button class="btn btn-success" id="login"><i class="fa fa-paper-plane" aria-hidden="true"></i> 登录</button>
                </center>
            </div>
        </div>
    </div>
</div>

<?php include ('footer.php'); ?>