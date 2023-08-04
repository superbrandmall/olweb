<?php
if(isset($_SESSION['lotus_admin_name']) && $_SESSION['lotus_admin_name'] == '马俊') {
    $scripts = $scripts .PHP_EOL. '        <script type="text/javascript" src="/views/assets/base/js/lotus-admin/processes-admin.js?t='.date("Y-m-d").'"></script>'.PHP_EOL;
} else {
    $scripts = $scripts .PHP_EOL. '        <script type="text/javascript" src="/views/assets/base/js/lotus-admin/encrypted/processes.js?t='.date("Y-m-d").'"></script>'.PHP_EOL;
}
?>
<?php $_SESSION['record_url'] = 'http://'.$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI']; ?>
<?php include 'sidebar.php'; ?>

<div class="content-wrapper">
    <section class="sub-header" style="height: 210px;">
        <div class="left-link">
            <a class="btn btn-link text-left" href="javascript:void(0);" onclick="javascript: $('#investment-sign-request-todo').modal('toggle');">
                <i class="fa fa-inbox"></i><span>草稿箱<span id="draftCount"></span></span>
            </a>
        </div>
        <h4>
            流程
        </h4>
        <?php include 'component/investment-process-request-create-dropdown.php'; ?>
        <div class="box-header" style="background-color: #ecf0f5; height: 50px;">
            <div class="pull-left">
                <ol class="breadcrumb" style="margin-bottom: 0; padding-left: 0;">
                    <li><a href="/lotus-admin/my-process?items=20">我的流程</a></li>
                    <li><a href="/lotus-admin/in-process?items=20">执行中流程</a></li>
                    <li class="active"><a href="javascript: void(0);">全部流程</a></li>
                </ol>
            </div>
        </div>
        <div class="box-header">
            <div class="box-body">
                <div class="col-md-12">
                    <div class="col-md-4">
                        <div class="form-group">
                            <label class="col-md-4 control-label" style="text-align: right;">流程</label>
                            <div class="col-md-8 col-sm-12" style="text-align: left;">
                                <select class="select2" id="bizType" style="width: 100%">
                                    <option value="" selected>全部</option>
                                    <option value="new">租赁新签合同审批流程</option>
                                    <option value="renew">租赁续签合同审批流程</option>
                                    <option value="termination">租赁终止合同审批流程</option>
                                    <option value="modify">租赁变更合同审批流程</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label class="col-md-4 control-label" style="text-align: right;">状态</label>
                            <div class="col-md-8 col-sm-12" style="text-align: left;">
                                <select class="select2" id="processInstStatus" style="width: 100%">
                                    <option value="" selected>全部</option>
                                    <option value="RUNNING">待审批</option>
                                    <option value="FINISH">同意已完成</option>
                                    <option value="DISAGREE">不同意已完成</option>
                                    <option value="SUSPEND">挂起</option>
                                    <option value="RETURNED">已驳回</option>
                                    <option value="TOSUBMIT">待提交</option>
                                    <option value="ABANDON">废弃</option>
                                    <option value="DELETE">已删除</option>
                                    <option value="CLOSED">已关闭</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label class="col-md-4 control-label" style="text-align: right;">发起人</label>
                            <div class="col-md-8 col-sm-12" style="text-align: left;">
                                <select class="select2 selectUser" id="creator" style="width: 100%">
                                    <option value="" selected>未选择</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label class="col-md-4 control-label"></label>
                            <div class="col-md-8 col-sm-12" style="text-align: left;">
                                <button type="button" class="btn btn-info btn-sm" id="search"><i class="fa fa-search icon-white"></i> <span class="hidden-xs">搜索</span></button>
                                <button type="button" class="btn btn-default btn-sm" id="clear"><i class="fa fa-times icon-white"></i> <span class="hidden-xs">清除</span></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="content" style="margin-top: 260px;">
        <div id="webui">
            <div class="row">
                <div class="col-md-12">
                    <div class="box">
                        <div class="box-body">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="bootstrap-table">
                                        <div class="fixed-table-pagination" style="clear: both;">
                                            <div class="pull-left pagination-detail">
                                                <span class="pagination-info"></span>
                                                <span class="page-list">
                                                    <span class="btn-group dropdown">
                                                        <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
                                                            <span class="page-size">20</span>
                                                            <span class="caret"></span>
                                                        </button>
                                                        <ul class="dropdown-menu" role="menu">
                                                            <li role="menuitem"><a href="/lotus-admin/processes?items=10">10</a></li>
                                                            <li role="menuitem"><a href="/lotus-admin/processes?items=20">20</a></li>
                                                            <li role="menuitem"><a href="/lotus-admin/processes?items=30">30</a></li>
                                                            <li role="menuitem"><a href="/lotus-admin/processes?items=50">50</a></li>
                                                        </ul>
                                                    </span> 行每页</span>
                                            </div>
                                            <div class="pull-right pagination">
                                                <ul class="pagination"></ul>
                                            </div>
                                        </div>
                                        <div class="fixed-table-container">
                                            <div class="fixed-table-body">
                                                <table class="table table-striped snipe-table table-responsive" style="margin-top: 0; text-align: left; font-size: 11px;">
                                                    <thead id="assetsListingTable-sticky-header">
                                                        <tr>
                                                            <th style="z-index: 1;">
                                                                <div class="th-inner" style="width: 200px; background: #fff;">流程名称</div>
                                                                <div class="fht-cell" style="background: #fff; border-right: solid 1px #ddd; border-bottom: solid 1px #ddd;"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner" style="width: 85px;">流程状态</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner" style="width: 120px;">流程分类</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner" style="width: 50px;">发起人</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner" style="width: 180px;">当前任务</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner" style="width: 80px;">当前执行人</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner" style="width: 150px;">开始时间</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner" style="width: 150px;">最后操作时间</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner" style="width: 150px;">结束时间</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody id="process"></tbody>
                                                </table>
                                            </div>

                                            <div class="fixed-table-pagination">
                                                <div class="pull-left pagination-detail">
                                                    <span class="pagination-info"></span>
                                                    <span class="page-list">
                                                        <span class="btn-group dropdown">
                                                            <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
                                                                <span class="page-size">20</span>
                                                                <span class="caret"></span>
                                                            </button>
                                                            <ul class="dropdown-menu" role="menu">
                                                                <li role="menuitem"><a href="/lotus-admin/processes?items=10">10</a></li>
                                                                <li role="menuitem"><a href="/lotus-admin/processes?items=20">20</a></li>
                                                                <li role="menuitem"><a href="/lotus-admin/processes?items=30">30</a></li>
                                                                <li role="menuitem"><a href="/lotus-admin/processes?items=50">50</a></li>
                                                            </ul>
                                                        </span> 行每页
                                                    </span>
                                                </div>
                                                <div class="pull-right pagination">
                                                    <ul class="pagination"></ul>
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
        </div>
    </section>
</div>

<?php include 'component/investment-sign-request-todo.php'; ?>

<?php include 'footer.php'; ?>