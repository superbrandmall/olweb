<?php
if(isset($_SESSION['lotus_admin_name']) && $_SESSION['lotus_admin_name'] == '马俊') {
    $scripts = $scripts .PHP_EOL. '        <script type="text/javascript" src="/views/assets/base/js/lotus-admin/todo-admin.js"></script>'.PHP_EOL
    . '        <script type="text/javascript" src="/views/assets/plugins/raphael.js"></script>'.PHP_EOL
    . '        <script type="text/javascript" src="/views/assets/plugins/flot/jquery.flot.js"></script>'.PHP_EOL 
    . '        <script type="text/javascript" src="/views/assets/plugins/flot/flot-demo.js"></script>'.PHP_EOL         
    . '        <script type="text/javascript" src="/views/assets/plugins/chinamapPath.js"></script>'.PHP_EOL;
} else {
    $scripts = $scripts .PHP_EOL. '        <script type="text/javascript" src="/views/assets/base/js/lotus-admin/encrypted/todo.js"></script>'.PHP_EOL
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
                                <div class="col-md-12">
                                    <h4 style="display: inline-block;">我的事项</h4>
                                    <div class="pull-right">
                                        <ul class="nav nav-tabs" style="margin-bottom: 1px;">
                                            <li class="active"><a href="#toDoList" data-toggle="tab">待办流程<span id="toDoCount"></span></a></li>
                                            <li class="hidden-xs"><a href="#doneList" data-toggle="tab">已办流程<span id="doneCount"></span></a></li>
                                            <li class="hidden-xs"><a href="#draftList" data-toggle="tab">草稿箱<span id="draftCount"></span></a></li>
                                            <li class="hidden-xs"><a href="#files" data-toggle="tab">我的文件<span>(1)</span></a></li>
                                        </ul>
                                    </div>
                                    <div class="tab-content">
                                        <div class="tab-pane fade in active" id="toDoList">
                                            <div class="bootstrap-table">
                                                <div class="fixed-table-container">
                                                    <div class="fixed-table-body" style="max-height: 300px;">
                                                        <table class="table table-striped snipe-table table-responsive" style="text-align: left;">
                                                            <thead id="assetsListingTable-sticky-header">
                                                                <tr>
                                                                    <th>
                                                                        <div class="th-inner">标题</div>
                                                                        <div class="fht-cell"></div>
                                                                    </th>
                                                                    <th>
                                                                        <div class="th-inner">发起人</div>
                                                                        <div class="fht-cell"></div>
                                                                    </th>
                                                                    <th>
                                                                        <div class="th-inner">当前环节</div>
                                                                        <div class="fht-cell"></div>
                                                                    </th>
                                                                </tr>
                                                            </thead>
                                                            <tbody id="toDoListBody"></tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="tab-pane fade" id="doneList">
                                            <div class="bootstrap-table">
                                                <div class="fixed-table-container">
                                                    <div class="fixed-table-body" style="max-height: 300px;">
                                                        <table class="table table-striped snipe-table table-responsive" style="text-align: left;">
                                                            <thead id="assetsListingTable-sticky-header">
                                                                <tr>
                                                                    <th>
                                                                        <div class="th-inner">标题</div>
                                                                        <div class="fht-cell"></div>
                                                                    </th>
                                                                    <th>
                                                                        <div class="th-inner">发起人</div>
                                                                        <div class="fht-cell"></div>
                                                                    </th>
                                                                    <th>
                                                                        <div class="th-inner">处理时间</div>
                                                                        <div class="fht-cell"></div>
                                                                    </th>
                                                                </tr>
                                                            </thead>
                                                            <tbody id="doneListBody"></tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="tab-pane fade" id="draftList">
                                            <div class="bootstrap-table">
                                                <div class="fixed-table-container">
                                                    <div class="fixed-table-body" style="max-height: 300px;">
                                                        <table class="table table-striped snipe-table table-responsive" style="text-align: left;">
                                                            <thead id="assetsListingTable-sticky-header">
                                                                <tr>
                                                                    <th>
                                                                        <div class="th-inner">标题</div>
                                                                        <div class="fht-cell"></div>
                                                                    </th>
                                                                    <th>
                                                                        <div class="th-inner">表单类型</div>
                                                                        <div class="fht-cell"></div>
                                                                    </th>
                                                                    <th>
                                                                        <div class="th-inner">修改时间</div>
                                                                        <div class="fht-cell"></div>
                                                                    </th>
                                                                    <th>
                                                                        <div class="th-inner">操作</div>
                                                                        <div class="fht-cell"></div>
                                                                    </th>
                                                                </tr>
                                                            </thead>
                                                            <tbody id="draftListBody"></tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="tab-pane fade" id="files">
                                            <div class="bootstrap-table">
                                                <div class="fixed-table-container">
                                                    <div class="fixed-table-body">
                                                        <table class="table table-striped snipe-table table-responsive" style="text-align: left;">
                                                            <thead id="assetsListingTable-sticky-header">
                                                                <tr>
                                                                    <th>
                                                                        <div class="th-inner">附件类型</div>
                                                                        <div class="fht-cell"></div>
                                                                    </th>
                                                                    <th>
                                                                        <div class="th-inner">上传时间</div>
                                                                        <div class="fht-cell"></div>
                                                                    </th>
                                                                    <th>
                                                                        <div class="th-inner">文件名</div>
                                                                        <div class="fht-cell"></div>
                                                                    </th>
                                                                    <th>
                                                                        <div class="th-inner">大小</div>
                                                                        <div class="fht-cell"></div>
                                                                    </th>
                                                                    <th>
                                                                        <div class="th-inner">操作</div>
                                                                        <div class="fht-cell"></div>
                                                                    </th>
                                                                </tr>
                                                            </thead>
                                                            <tbody id="filesBody">
                                                                <tr>
                                                                    <td>操作手册</td>
                                                                    <td>2023.05.05 17:41:24</td>
                                                                    <td>Lotus招商管理系统操作手册_v2.4.pdf</td>
                                                                    <td>6.6Mb</td>
                                                                    <td><a href="/upload/manual/Lotus招商管理系统操作手册_v2.4.pdf" target="_blank">查看文件</a></td>
                                                                </tr>
                                                                <tr>
                                                                    <td>操作指南</td>
                                                                    <td>2023.05.06 10:29:33</td>
                                                                    <td>Lotus招商系统快速操作指南v0.1.pptx</td>
                                                                    <td>4.3Mb</td>
                                                                    <td><a href="/upload/manual/Lotus招商系统快速操作指南v0.1.pptx" target="_blank">查看文件</a></td>
                                                                </tr>
                                                                <tr>
                                                                    <td>审批节点模版</td>
                                                                    <td>2023.05.06 10:29:37</td>
                                                                    <td>莲花租赁流程审批人员表.xlsx</td>
                                                                    <td>58Kb</td>
                                                                    <td><a href="/upload/manual/莲花租赁流程审批人员表.xlsx" target="_blank">查看文件</a></td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="clearfix"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <div class="box">
                        <div class="box-body">
                            <div class="row">
                                <div class="col-md-4">
                                    <div style="margin: 30px 15px;">
                                        <h4>莲花项目概览</h4>
                                        <hr>
                                        项目数(已开业)<br><h4 class="text-red">96</h4><hr>
                                        总面积(m²)<br><h4 class="text-red">501,906</h4><hr>
                                        总铺位数<br><h4 class="text-red">3,864</h4><hr>
                                        出租率(按面积)<br><h4 class="text-red">61.28%</h4><hr>
                                        合同数(生效中)<br><h4 class="text-red">1,817</h4>
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

<?php include 'component/investment-todo-request-modify-create.php'; ?>

<?php include 'footer.php'; ?>