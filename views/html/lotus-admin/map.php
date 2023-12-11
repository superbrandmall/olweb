<?php
if(isset($_SESSION['lotus_admin_name']) && $_SESSION['lotus_admin_name'] == '马俊') {
    $scripts = $scripts .PHP_EOL. '        <script type="text/javascript" src="/views/assets/base/js/lotus-admin/map-admin.js"></script>'.PHP_EOL
    . '        <script type="text/javascript" src="/views/assets/plugins/raphael.js"></script>'.PHP_EOL
    . '        <script type="text/javascript" src="/views/assets/plugins/flot/jquery.flot.js"></script>'.PHP_EOL 
    . '        <script type="text/javascript" src="/views/assets/plugins/flot/flot-demo.js"></script>'.PHP_EOL         
    . '        <script type="text/javascript" src="/views/assets/plugins/chinamapPath.js"></script>'.PHP_EOL;
} else {
    $scripts = $scripts .PHP_EOL. '        <script type="text/javascript" src="/views/assets/base/js/lotus-admin/encrypted/map.js"></script>'.PHP_EOL
    . '        <script type="text/javascript" src="/views/assets/plugins/raphael.js"></script>'.PHP_EOL
    . '        <script type="text/javascript" src="/views/assets/plugins/flot/jquery.flot.js"></script>'.PHP_EOL 
    . '        <script type="text/javascript" src="/views/assets/plugins/flot/flot-demo.js"></script>'.PHP_EOL 
    . '        <script type="text/javascript" src="/views/assets/plugins/chinamapPath.js"></script>'.PHP_EOL;
}
?>

<?php $_SESSION['record_url'] = 'http://'.$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI']; ?>
<?php include 'sidebar.php'; ?>

<div class="content-wrapper">
    <section class="content" style="margin-top: 50px;">
        <div id="webui">
            <div class="row">
                <div class="col-md-12">
                    <div class="box">
                        <div class="box-body">
                            <div class="row">
                                <div class="col-md-4">
                                    <div id="lotusFiguresBI" style="margin: 30px 15px;">
                                        <h4>莲花项目概览<small><i class="fa fa-circle-o-notch fa-spin fa-fw"></i></small></h4>
                                        <hr>
                                        项目数(已开业)<br><h4 class="text-red">96</h4><hr>
                                        总面积(m²)<br><h4 class="text-red"><i class="fa fa-circle-o-notch fa-spin fa-fw"></i></h4><hr>
                                        总铺位数<br><h4 class="text-red"><i class="fa fa-circle-o-notch fa-spin fa-fw"></i></h4><hr>
                                        出租率(按面积)<br><h4 class="text-red"><i class="fa fa-circle-o-notch fa-spin fa-fw"></i></h4><hr>
                                        合同数(生效中)<br><h4 class="text-red"><i class="fa fa-circle-o-notch fa-spin fa-fw"></i></h4>
                                    </div>
                                </div>
                                <div class="col-md-8">
                                    <div class="box" style="padding: 30px 30px 0 30px; margin-bottom: 0; box-shadow: -1px 0px 0px rgba(0,0,0,.1); overflow: auto;">
                                        <div id="map"></div>
                                        <a href="/lotus-admin/malls" class="btn btn-primary btn-sm hidden-xs" style="position: absolute; right: 0; top: 0;">进入项目列表 <i class="fa fa-angle-right icon-white"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-8">
                    <div class="box">
                        <div class="box-body">
                            <div class="row">
                                <div class="col-md-12">
                                    <h4 style="display: inline-block;">收入/预算</h4>
                                    <div class="pull-right">
                                        <ul class="nav nav-tabs">
                                            <li class="active"><a href="javascript: void(0);">上月</a></li>
                                            <li class="hidden-xs"><a href="javascript: void(0);">本年</a></li>
                                        </ul>
                                    </div>
                                    <hr>
                                </div>
                                <div class="col-md-6">
                                    <div style="margin: 7px 0 0 5px; font-size: 16px;">数据总览</div><br>
                                    <div class="row">
                                        <div class="col-md-6 text-center">
                                            预计收入(万元)<br><h4>0.00</h4>
                                        </div>
                                        <div class="col-md-6 text-center">
                                            实际收入(万元)<br><h4 class="text-blue">0.00</h4>
                                        </div>
                                        <div class="col-md-12">
                                            <div class="flot-chart">
                                                <div class="flot-chart-content" id="flot-line-chart" style="width: auto; height: 180px;"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6" style="box-shadow: -1px 0px 0px rgba(0,0,0,.1);">
                                    <div style="margin: 7px 0 0 5px; font-size: 16px;">收入明细</div><br>
                                    <div class="row">
                                        <div class="col-md-6 text-center">
                                            租金收入(万元)<br><h4 class="text-red">0.00</h4>
                                        </div>
                                        <div class="col-md-6 text-center">
                                            物管收入(万元)<br><h4 class="text-purple">0.00</h4>
                                        </div>
                                    </div>
                                    <br><br><br><br>
                                    <div class="row">
                                        <small class="col-md-6 text-center">
                                            <b>0%</b><br>收缴率
                                        </small>
                                        <small class="col-md-6 text-center">
                                            <b>0%</b><br>收缴率
                                        </small>
                                    </div>
                                    <br><br><br><br>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="box">
                        <div class="box-body">
                            <div class="row">
                                <div class="col-md-12">
                                    <h4 style="display: inline-block;">客流和车流</h4>
                                    <hr>
                                </div>
                                <div class="col-md-4 text-center">
                                    <i class="fa fa-users text-gray" style="font-size: 60px;margin-top: 20px;"></i>
                                </div>
                                <div class="col-md-8">
                                    <h5 style="margin-bottom: 2px;">本月客流(万人)</h5>
                                    <h4 class="text-red" style="margin-top: 0;">0.00</h4><br>
                                    <p>
                                        上月客流(万人) 0.00<br>
                                        本年客流(万人) 0.00
                                    </p>
                                </div>
                                <div class="col-md-12">
                                    <hr>
                                </div>
                                <div class="col-md-4 text-center">
                                    <i class="fa fa-car text-gray" style="font-size: 60px;margin-top: 20px;"></i>
                                </div>
                                <div class="col-md-8">
                                    <h5 style="margin-bottom: 2px;">本月车流(辆)</h5>
                                    <h4 class="text-red" style="margin-top: 0;">0</h4><br>
                                    <p>
                                        上月车流(辆) 0<br>
                                        本年车流(辆) 0
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>

<?php include 'footer.php'; ?>