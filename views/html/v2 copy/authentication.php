<?php
$scripts = $scripts. '<script type="text/javascript" src="/views/assets/base/js/v2/authentication-admin.js"></script>';
?>

<div id="wrapper">
    <?php include ('navbar_top.php'); ?>
    <div id="page-wrapper">
        <div class="row">
            <div class="col-xs-12">
                <h4 class="page-header"><i class="fa fa-check-square-o" aria-hidden="true"></i> 授权认证</h4>
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <i class="fa fa-certificate" aria-hidden="true"></i> 公司认证必填
                    </div>
                    <div class="panel-body">
                        <div class="form-group input-group">
                            <span class="input-group-addon"><i class="fa fa-building"></i></span>
                            <input type="text" class="form-control" placeholder="公司">
                        </div>
                        <div class="form-group input-group">
                            <span class="input-group-addon"><i class="fa fa-id-card"></i></span>
                            <input type="text" class="form-control" placeholder="统一社会信用代码">
                        </div>
                        <div class="form-group" style="margin-bottom: 0;">
                            <label><i class="fa fa-file-text" aria-hidden="true"></i> 营业执照上传 (.jpg/.png/.pdf格式)</label>
                            <input type="file">
                        </div>
                    </div>
                </div>
                
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <i class="fa fa-upload" aria-hidden="true"></i> 其它选填资料
                    </div>
                    <div class="panel-body">
                        <label>名片 (.jpg/.png/.pdf格式)</label>
                        <div class="form-group input-group">
                            <span class="input-group-addon"><i class="fa fa-id-card-o" aria-hidden="true"></i></span>
                            <input type="file" class="form-control">
                        </div>
                        
                        <label>品牌Logo (.jpg/.png/.pdf格式)</label>
                        <div class="form-group input-group">
                            <span class="input-group-addon"><i class="fa fa-registered" aria-hidden="true"></i></span>
                            <input type="file" class="form-control">
                        </div>
                        
                        <label>品牌介绍 (.jpg/.png/.pdf格式)</label>
                        <div class="form-group input-group">
                            <span class="input-group-addon"><i class="fa fa-file-text-o" aria-hidden="true"></i></span>
                            <input type="file" class="form-control">
                        </div>
                    </div>
                </div>
                <div class="panel panel-default">
                    <div class="panel-heading">
                        选填现有门店经营状况
                        <a href="#" class="add pull-right"><small><i class="fa fa-plus"></i> 增加更多品牌</small></a>
                    </div>
                    <div class="panel-body">
                        <div class="form-group input-group">
                            <span class="input-group-addon" style="padding: 6px 13px;"><i class="fa fa-map-signs"></i></span>
                            <input type="text" class="form-control" placeholder="所在商场">
                        </div>
                        <div class="form-group input-group">
                            <span class="input-group-addon"><i class="fa fa-map-o"></i></span>
                            <input type="text" class="form-control" placeholder="楼层">
                        </div>
                        <div class="form-group input-group">
                            <span class="input-group-addon"><i class="fa fa-area-chart"></i></span>
                            <input type="text" class="form-control" placeholder="面积(m²)">
                        </div>
                        <div class="form-group input-group">
                            <span class="input-group-addon"><i class="fa fa-money"></i></span>
                            <input type="text" class="form-control" placeholder="营业额(万)">
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xs-12" style="margin-bottom: 40px;">
                <center>
                    <button class="btn btn-success" id="to_authenticate"><i class="fa fa-paper-plane" aria-hidden="true"></i> 提交认证</button>
                </center>
            </div>
        </div>
    </div>
</div>

<?php include ('menu_bottom.php'); ?>
<?php include ('footer.php'); ?>