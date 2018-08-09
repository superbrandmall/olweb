<?php
$scripts = $scripts. '<script type="text/javascript" src="/views/assets/base/js/admin/users-admin.js"></script>';
?>

<div class="alert alert-success"  id="ui_succeed" role="alert">成功!</div>
<div id="wrapper">
    <?php include ('navbar_top.php'); ?>
    <?php include ('navbar_side.php'); ?>
    <div id="page-wrapper">
        <div class="row">
            <div class="col-lg-12">
                <h1 class="page-header">用户信息管理</h1>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-12">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        用户信息管理
                        (<a href="add-admin"><i class="fa fa-plus" aria-hidden="true"></i> 添加Admin</a>)
                    </div>
                    <!-- /.panel-heading -->
                    <div class="panel-body">
                        <div class="table-responsive">
                            <table class="table table-striped table-bordered table-hover">
                                <thead>
                                    <tr>
                                        <th>用户编码</th>
                                        <th>邮箱</th>
                                        <th>手机</th>
                                        <th>最近登录时间</th>
                                        <th>绑定</th>
                                        <th>姓名</th>
                                        <th>角色</th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                            
                            <div>
                                <div class="col-sm-6">
                                    <div id="shows"></div>
                                </div>
                                <div class="col-sm-6">
                                    <ul class="pagination"></ul>
                                </div>
                            </div>
                        </div>
                        <!-- /.table-responsive -->
                    </div>
                    <!-- /.panel-body -->
                </div>
            </div>
        </div>
    </div>
</div>

<?php include ('footer.php'); ?>