<?php
if(isset($_SESSION['lotus_admin_name']) && $_SESSION['lotus_admin_name'] == '马俊') {
    $scripts = $scripts .PHP_EOL. '        <script type="text/javascript" src="/views/assets/base/js/lotus-admin/todo-admin.js"></script>'.PHP_EOL
    . '        <script type="text/javascript" src="/views/assets/plugins/raphael.js"></script>'.PHP_EOL
    . '        <script type="text/javascript" src="/views/assets/plugins/chinamapPath.js"></script>'.PHP_EOL;    
} else {
    $scripts = $scripts .PHP_EOL. '        <script type="text/javascript" src="/views/assets/base/js/lotus-admin/encrypted/todo.js"></script>'.PHP_EOL
    . '        <script type="text/javascript" src="/views/assets/plugins/raphael.js"></script>'.PHP_EOL
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
                                        项目数(已开业)<br><h4 class="text-red">49</h4><hr>
                                        总面积(m²)<br><h4 class="text-red">342,637.42</h4><hr>
                                        总铺位数<br><h4 class="text-red">2,220</h4><hr>
                                        出租率<br><h4 class="text-red">80.55%</h4><hr>
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
        </div>
    </section>
</div>

<?php include 'component/investment-todo-request-modify-create.php'; ?>

<?php include 'footer.php'; ?>