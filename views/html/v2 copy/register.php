<?php
if (explode('?', $_SERVER['REQUEST_URI'])[1] != null) {
    $param = '?'.explode('?', $_SERVER['REQUEST_URI'])[1];
} else {
    $param = '';
}

$scripts = $scripts. '<script type="text/javascript" src="/views/assets/base/js/v2/register-admin.js"></script>';
?>

<div id="wrapper">
    <?php include ('navbar_top.php'); ?>
    <div id="page-wrapper">
        <div class="row">
            <div class="col-xs-6" style="text-align: center;padding: 20px 0; border-bottom: solid 2px #CEB688; background-color: #fff;">
                <span>注册</span>
            </div>
            <div class="col-xs-6" style="text-align: center;padding: 20px 0; border-bottom: solid 2px #eee; background-color: #fff;">
                <a href="/v2/login<?= $param ?>" style="color: #333;">登录</a>
            </div>
        </div>
        <div class="row">
            <div class="col-xs-12">
                <form role="form" style="margin-top: 20px;">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            个人必填信息
                        </div>
                        <div class="panel-body">
                            <div class="form-group input-group">
                                <span class="input-group-addon"><i class="fa fa-user"></i></span>
                                <input type="text" class="form-control" placeholder="请输入您的姓名">
                            </div>
                            <div class="form-group input-group">
                                <span class="input-group-addon"><i class="fa fa-phone"></i></span>
                                <input type="tel" class="form-control" placeholder="请输入您的手机号">
                                <span class="input-group-addon" id="send_code">发送验证码</span>
                            </div>
                            <div class="form-group input-group" style="margin-bottom: 0;">
                                <span class="input-group-addon" style="padding: 6px 11px;"><i class="fa fa-key"></i></span>
                                <input type="password" class="form-control" placeholder="请输入您的验证码">
                                <span class="input-group-addon" id="verify" style="color: #fff; background-color: #5dc09c; border-color: #4bb991;">验证</span>
                            </div>
                        </div>
                    </div>
                    <div class="panel panel-default" id="brands">
                        <div class="panel-heading">
                            品牌必填信息
                            <a href="#" class="add pull-right"><small><i class="fa fa-plus"></i> 增加更多品牌</small></a>
                        </div>
                        <div class="panel-body">
                            <div class="form-group input-group">
                                <span class="input-group-addon"><i class="fa fa-registered"></i></span>
                                <input type="text" class="form-control brand" id="brand_1" placeholder="请输入品牌名">
                            </div>
                            <div class="form-group input-group">
                                <span class="input-group-addon" style="padding: 6px 14px;"><i class="fa fa-cutlery"></i></span>
                                <select class="form-control category" id="category_1" name="category_1">
                                    <option value="">请选择该品牌所属业态</option>
                                </select>
                            </div>
                            <div class="form-group input-group" style="margin-bottom: 0;">
                                <span class="input-group-addon"><i class="fa fa-life-ring"></i></span>
                                <select class="form-control operation" id="operation_1" name="operation_1">
                                    <option value="">请选择该品牌所属运营模式</option>
                                    <option value="0">直营</option>
                                    <option value="1">代理</option>
                                    <option value="2">加盟</option>
                                </select>
                            </div>
                            <hr>
                        </div>
                    </div>
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            其它选填
                        </div>
                        <div class="panel-body">
                            <div class="form-group input-group">
                                <span class="input-group-addon" style="padding: 6px 13px;"><i class="fa fa-building"></i></span>
                                <input type="text" class="form-control" placeholder="请输入您的公司名">
                            </div>
                            <div class="form-group input-group">
                                <span class="input-group-addon"><i class="fa fa-envelope"></i></span>
                                <input type="email" class="form-control" placeholder="请输入您的邮箱">
                            </div>
                            <div class="form-group input-group" style="margin-bottom: 0;">
                                <span class="input-group-addon"><i class="fa fa-briefcase"></i></span>
                                <input type="text" class="form-control" placeholder="请输入您的职位">
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div class="col-xs-12">
                <center>
                    <button class="btn btn-success" id="register"><i class="fa fa-paper-plane" aria-hidden="true"></i> 提交注册信息</button>
                </center>
            </div>
        </div>
    </div>
</div>

<?php include ('footer.php'); ?>