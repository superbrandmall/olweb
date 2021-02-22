<?php
$scripts = $scripts . '<script type="text/javascript" src="/views/assets/base/js/v2-admin/buildings-admin.js"></script>';
?>

<body id="mimin" class="dashboard">
    <?php include ('navbar_top.php'); ?>
    <div class="container-fluid mimin-wrapper">
        <?php include ('navbar_side.php'); ?>
        <div id="content">
            <div class="panel box-shadow-none content-header">
                <div class="panel-body">
                    <div class="col-md-12">
                        <h3 class="animated fadeInLeft" style="display: inline-block;">建筑信息</h3>
                        <p class="animated fadeInDown" style="display: inline-block;">列表</p>
                    </div>
                </div>
            </div>

            <div class="col-md-12 top-20 padding-0">
                <div class="col-md-12">
                    <div class="panel">
                        <div id="panel_table" class="panel-body">
                            <div class="responsive-table">
                                <table class="table table-striped table-bordered" width="100%" cellspacing="0">
                                    <thead>
                                        <tr>
                                            <th>建筑编码</th>
                                            <th>项目编码</th>
                                            <th>建筑名</th>
                                            <th>建筑面积</th>
                                            <th>租赁面积</th>
                                        </tr>
                                    </thead>
                                    <tbody></tbody>
                                </table>
                            </div>
                            <div class="col-md-6" style="padding-top:20px;">
                                <span id="shows"></span>
                            </div>
                            <div class="col-md-6">
                                <ul class="pagination pull-right"></ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <?php include ('footer.php'); ?>