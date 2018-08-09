<?php
$scripts = $scripts. '<script type="text/javascript" src="/views/assets/base/js/admin/add-role-admin.js"></script>';
?>

<div id="wrapper">
    <?php include ('navbar_top.php'); ?>
    <?php include ('navbar_side.php'); ?>
    <div id="page-wrapper">
        <div class="row">
            <div class="col-lg-12">
                <h1 class="page-header">创建角色</h1>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-12">
                <div class="panel panel-default">
                    <div class="panel-body">
                        <div class="row">
                            <div class="col-sm-4">
                                <div class="form-group">
                                    <label>角色</label>
                                    <input class="form-control" id="role">
                                </div>
                            </div>
                            <div class="col-sm-4">
                                <div class="form-group">
                                    <label>描述</label>
                                    <input class="form-control" id="role_name">
                                </div>
                            </div>
                            <div class="col-sm-4">
                                <div class="form-group">
                                    <label>备注</label>
                                    <input class="form-control" id="remark">
                                </div>
                            </div>
                            <div class="clearfix"> </div>
                            
                            <div class="col-sm-12" id="buttons">
                                <center>
                                    <button class="btn btn-primary" id="submit"><i class="fa fa-check" aria-hidden="true"> </i> 提交</button>
                                    <a href="javascript:history.go(-1)" class="btn btn-default"><i class="fa fa-backward" aria-hidden="true"> </i> 返回</a>
                                </center>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<?php include ('footer.php'); ?>