<?php
$scripts = $scripts. '<script type="text/javascript" src="/views/assets/base/js/v2/register-events-admin.js"></script>';
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
                        <input type="text" class="form-control" placeholder="签约主体(须与营业执照保持一致)">
                    </div>
                    <div class="form-group input-group">
                        <span class="input-group-addon"><i class="fa fa-location-arrow"></i></span>
                        <input type="text" class="form-control" placeholder="联系地址">
                    </div>
                    <div class="form-group input-group">
                        <span class="input-group-addon"><i class="fa fa-clipboard"></i></span>
                        <input type="text" class="form-control" placeholder="活动名称">
                    </div>
                    <div class="form-group">
                        <label><i class="fa fa-upload" aria-hidden="true"></i> 上传活动方案</label>
                        <input type="file">
                    </div>
                    <div class="form-group">
                        <label><i class="fa fa-upload" aria-hidden="true"></i> 上传公司资质授权</label>
                        <input type="file">
                    </div>
                    <p>*如资质未到达我司要求，我司有权取消订单</p>
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