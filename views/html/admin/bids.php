<?php
$scripts = $scripts. '<script type="text/javascript" src="/views/assets/base/js/admin/bids-admin.js"></script>';
?>

<div id="wrapper">
    <?php include ('navbar_top.php'); ?>
    <?php include ('navbar_side.php'); ?>
    <div id="page-wrapper">
        <div class="row">
            <div class="col-lg-12">
                <h1 class="page-header">出价信息管理</h1>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-12">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        出价信息管理
                    </div>
                    <!-- /.panel-heading -->
                    <div class="panel-body">
                        <div class="table-responsive">
                            <table class="table table-striped table-bordered table-hover">
                                <thead>
                                    <tr>
                                        <th>出价编码</th>
                                        <th>项目</th>
                                        <th>单元号</th>
                                        <th>商户名</th>
                                        <th>品牌名</th>
                                        <th>出价状态</th>
                                        <th>审核状态</th>
                                        <th>生效状态</th>
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