<?php
if(isset($_SESSION['lotus_admin_name']) && $_SESSION['lotus_admin_name'] == '马俊') {
    $scripts = $scripts .PHP_EOL. '        <script type="text/javascript" src="/views/assets/base/js/kow-admin/tenants-admin.js?t='.date("Y-m-d").'"></script>'.PHP_EOL;
} else {
    $scripts = $scripts .PHP_EOL. '        <script type="text/javascript" src="/views/assets/base/js/kow-admin/tenants-admin.js?t='.date("Y-m-d").'"></script>'.PHP_EOL;
}
?>
<?php $_SESSION['record_url'] = 'http://'.$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI']; ?>
<?php include 'sidebar.php'; ?>

<div class="content-wrapper">
    <form id="search-form" class="form-horizontal" role="form" enctype="multipart/form-data">
        <section class="sub-header" style="height: 160px;">
            <h4>
                商户
            </h4>
            <div class="pull-right">
                <a href="/kow-admin/create-tenant" class="btn btn-primary btn-sm"><i class="fa fa-plus icon-white"></i> <span class="hidden-xs">创建商户</span></a>
            </div>
            <div class="box-header">
                <div class="box-body">
                    <div class="col-md-12">
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="col-md-4 control-label" style="text-align: right;">状态</label>
                                <div class="col-md-8 col-sm-12" style="text-align: left;">
                                    <select class="select2" id="state" style="width: 100%">
                                        <option value="" selected>全部</option>
                                        <option value="1">使用中</option>
                                        <option value="0">已删除</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="col-md-4 control-label" style="text-align: right;">代码</label>
                                <div class="col-md-8 col-sm-12" style="text-align: left;">
                                    <input class="form-control" id="tenantCode" type="text"  />
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="col-md-4 control-label" style="text-align: right;">商户</label>
                                <div class="col-md-8 col-sm-12" style="text-align: left;">
                                    <select class="select2" id="selectTenant" style="width: 100%"></select>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="col-md-4 control-label" style="text-align: right;">类型</label>
                                <div class="col-md-8 col-sm-12" style="text-align: left;">
                                    <select class="select2" id="type" style="width: 100%">
                                        <option value="" selected>全部</option>
                                        <option value="2">公司</option>
                                        <option value="1">个人</option>
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
    </form>

    <section class="content" style="margin-top: 210px;">
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
                                                            <li role="menuitem"><a href="/kow-admin/tenants?items=10">10</a></li>
                                                            <li role="menuitem"><a href="/kow-admin/tenants?items=20">20</a></li>
                                                            <li role="menuitem"><a href="/kow-admin/tenants?items=30">30</a></li>
                                                            <li role="menuitem"><a href="/kow-admin/tenants?items=50">50</a></li>
                                                        </ul>
                                                    </span> 行每页</span>
                                            </div>
                                            <div class="pull-right pagination">
                                                <ul class="pagination"></ul>
                                            </div>
                                        </div>
                                        <div class="fixed-table-container">
                                            <div class="fixed-table-body">
                                                <table class="table table-striped snipe-table table-responsive" style="margin-top: 0; text-align: left;">
                                                    <thead id="assetsListingTable-sticky-header">
                                                        <tr>
                                                            <th>
                                                                <div class="th-inner">代码</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">商户</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">状态</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">类型</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                             <th>
                                                                <div class="th-inner">地址</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody id="tenants"></tbody>
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
                                                                <li role="menuitem"><a href="/kow-admin/tenants?items=10">10</a></li>
                                                                <li role="menuitem"><a href="/kow-admin/tenants?items=20">20</a></li>
                                                                <li role="menuitem"><a href="/kow-admin/tenants?items=30">30</a></li>
                                                                <li role="menuitem"><a href="/kow-admin/tenants?items=50">50</a></li>
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

<?php include 'footer.php'; ?>