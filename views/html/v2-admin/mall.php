<?php
$scripts = $scripts . '<script type="text/javascript" src="/views/assets/base/js/v2-admin/mall-admin.js"></script>';
?>

<body id="mimin" class="dashboard">
    <?php include ('navbar_top.php'); ?>
    <div class="container-fluid mimin-wrapper">
        <?php include ('navbar_side.php'); ?>
        <!-- start: Content -->
        <div id="content">
            <div class="panel box-shadow-none content-header">
                <div class="panel-body">
                    <div class="col-md-12">
                        <h3 class="animated fadeInLeft" style="display: inline-block;">项目信息</h3>
                        <p class="animated fadeInDown" style="display: inline-block;">详情</p>
                    </div>
                </div>
            </div>
            <div class="form-element">
                <div class="col-md-12 padding-0">
                    <div class="col-md-12">
                        <div class="panel form-element-padding">
                            <div class="panel-body" style="padding-bottom:30px;">
                                <div class="col-md-6">
                                    <div class="form-group"><label class="col-sm-4 control-label text-right">项目编号</label>
                                        <div class="col-sm-8"><input type="text" class="form-control" id="code" disabled></div>
                                    </div>
                                    <div class="form-group"><label class="col-sm-4 control-label text-right">建筑面积</label>
                                        <div class="col-sm-8"><input type="text" class="form-control" id="gross_area" disabled></div>
                                    </div>
                                    <div class="form-group"><label class="col-sm-4 control-label text-right">租赁面积</label>
                                        <div class="col-sm-8"><input type="text" class="form-control" id="leasing_area" disabled></div>
                                    </div>
                                    <div class="form-group"><label class="col-sm-4 control-label text-right">中文地址</label>
                                        <div class="col-sm-8"><input type="text" class="form-control" id="location" disabled></div>
                                    </div>
                                    <div class="form-group"><label class="col-sm-4 control-label text-right">中文描述</label>
                                        <div class="col-sm-8"><input type="text" class="form-control" id="desc"></div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group"><label class="col-sm-4 control-label text-right">中文名称</label>
                                        <div class="col-sm-8"><input type="text" class="form-control" id="name" disabled></div>
                                    </div>
                                    <div class="form-group"><label class="col-sm-4 control-label text-right">英文名称</label>
                                        <div class="col-sm-8"><input type="text" class="form-control" id="name_eng"></div>
                                    </div>
                                    <div class="form-group"><label class="col-sm-4 control-label text-right">联系电话</label>
                                        <div class="col-sm-8"><input type="text" class="form-control" id="phone"></div>
                                    </div>
                                    <div class="form-group"><label class="col-sm-4 control-label text-right">英文地址</label>
                                        <div class="col-sm-8"><input type="text" class="form-control" id="location_eng"></div>
                                    </div>
                                    <div class="form-group"><label class="col-sm-4 control-label text-right">英文描述</label>
                                        <div class="col-sm-8"><input type="text" class="form-control" id="desc_eng"></div>
                                    </div>
                                </div>
                                
                                <div class="col-md-6">
                                   <div class="panel form-group">
                                        <div class="panel-heading-white panel-heading text-center">
                                           <h4>客流量</h4>
                                        </div>
                                        <div class="panel-body">
                                            <div class="col-md-12">
                                              <canvas class="line-chart" id="line-chart"></canvas>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                   <div class="panel form-group">
                                        <div class="panel-heading-white panel-heading text-center">
                                           <h4>车库流量</h4>
                                        </div>
                                        <div class="panel-body">
                                            <div class="col-md-12">
                                              <canvas class="line-chart" id="line-chart2"></canvas>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="col-md-12">
                                   <div class="panel form-group">
                                        <div class="panel-heading-white panel-heading text-center">
                                           <h4>销售额</h4>
                                        </div>
                                        <div class="panel-body">
                                            <div class="col-md-12">
                                              <canvas class="bar-chart" id="bar-chart"></canvas>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- end: content -->
    </div>

    <?php include ('footer.php'); ?>