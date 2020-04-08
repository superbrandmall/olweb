<?php
$scripts = $scripts. '<script type="text/javascript" src="/views/assets/base/js/v2/register-admin.js"></script>';
?>

<div id="wrapper">
    <?php include ('navbar_top.php'); ?>
    <div id="page-wrapper">
        <div class="row">
            <div class="col-xs-12">
                <h4 class="page-header"><i class="fa fa-user-plus" aria-hidden="true"></i> 注册
                </h4>
                <form role="form">
                    <div class="form-group input-group">
                        <span class="input-group-addon"><i class="fa fa-user"></i></span>
                        <input type="text" class="form-control" placeholder="姓名">
                    </div>
                    <div class="form-group input-group">
                        <span class="input-group-addon"><i class="fa fa-phone"></i></span>
                        <input type="text" class="form-control" placeholder="手机">
                    </div>
                    <div class="form-group input-group">
                        <span class="input-group-addon"><i class="fa fa-envelope"></i></span>
                        <input type="email" class="form-control" placeholder="邮箱">
                    </div>
                    <div class="form-group input-group">
                        <span class="input-group-addon"><i class="fa fa-key"></i></span>
                        <input type="password" class="form-control" placeholder="密码">
                    </div>
                    <div class="form-group input-group">
                        <span class="input-group-addon"><i class="fa fa-building"></i></span>
                        <input type="text" class="form-control" placeholder="公司">
                    </div>
                    <div class="form-group input-group">
                        <span class="input-group-addon"><i class="fa fa-briefcase"></i></span>
                        <input type="text" class="form-control" placeholder="职位">
                    </div>
                    <div class="form-group input-group">
                        <span class="input-group-addon"><i class="fa fa-registered"></i></span>
                        <input type="text" class="form-control" placeholder="品牌">
                    </div>
                    <p class="text-right"><a href="#"><i class="fa fa-plus"></i> 增加更多品牌</a></p>
                    <div class="form-group">
                        <label><i class="fa fa-hand-o-right" aria-hidden="true"></i> 运营模式</label>
                        <label class="radio-inline">
                            <input type="radio" name="optionsRadiosInline" id="optionsRadiosInline1" value="option1" checked="">直营
                        </label>
                        <label class="radio-inline">
                            <input type="radio" name="optionsRadiosInline" id="optionsRadiosInline2" value="option2">代理
                        </label>
                        <label class="radio-inline">
                            <input type="radio" name="optionsRadiosInline" id="optionsRadiosInline3" value="option3">加盟
                        </label>
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