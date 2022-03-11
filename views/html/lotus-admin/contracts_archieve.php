<?php
$scripts = $scripts . '<script type="text/javascript" src="/views/assets/base/js/lotus-admin/contracts-admin.js"></script>';
?>
<?php $_SESSION['record_url'] = 'http://'.$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI']; ?>
<?php include 'sidebar.php'; ?>

<div class="content-wrapper">
    <section class="sub-header">
        <h4>
            租赁合同
        </h4>
    </section>

    <section class="content" style="margin-top: 90px;">
        <div id="webui">
            <div class="row">
                <div class="col-md-12">
                    <div class="box">
                        <div class="box-header with-border">
                            <ol class="breadcrumb" style="margin-bottom: 0; padding-left: 0;">
                                <li class="active"><a href="javascript: void(0);">全部</a></li>
                                <li><a href="javascript: void(0);">进行中</a></li>
                                <li><a href="javascript: void(0);">已终止</a></li>
                                <li><a href="javascript: void(0);">已结束</a></li>
                                <li><a href="javascript: void(0);">已作废</a></li>
                            </ol>
                        </div>
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
                                                            <span class="page-size">10</span>
                                                            <span class="caret"></span>
                                                        </button>
                                                        <ul class="dropdown-menu" role="menu">
                                                            <li role="menuitem"><a href="/lotus-admin/contracts?items=10">10</a></li>
                                                            <li role="menuitem"><a href="/lotus-admin/contracts?items=20">20</a></li>
                                                            <li role="menuitem"><a href="/lotus-admin/contracts?items=30">30</a></li>
                                                            <li role="menuitem"><a href="/lotus-admin/contracts?items=50">50</a></li>
                                                        </ul>
                                                    </span> 行每页</span>
                                            </div>
                                            <div class="pull-right pagination">
                                                <ul class="pagination"></ul>
                                            </div>
                                        </div>
                                        <div class="fixed-table-container table-no-bordered">
                                            <div class="fixed-table-body">
                                                <table class="table table-striped snipe-table table-responsive table-no-bordered" style="margin-top: 0">
                                                    <thead id="assetsListingTable-sticky-header" class="hidden-xs">
                                                        <tr>
                                                            <th>
                                                                <div class="th-inner">品牌名称</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">合同类型</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">签约情况</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">店铺位置代码</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">合同面积㎡</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">操作</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">授权用户</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody id="contractsL" class="hidden-xs"></tbody>
                                                    <tbody id="contractsS" class="hidden-sm hidden-md hidden-lg"></tbody>
                                                </table>
                                            </div>

                                            <div class="fixed-table-pagination">
                                                <div class="pull-left pagination-detail">
                                                    <span class="pagination-info"></span>
                                                    <span class="page-list">
                                                        <span class="btn-group dropdown">
                                                            <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
                                                                <span class="page-size">10</span>
                                                                <span class="caret"></span>
                                                            </button>
                                                            <ul class="dropdown-menu" role="menu">
                                                                <li role="menuitem"><a href="/lotus-admin/contracts?items=10">10</a></li>
                                                                <li role="menuitem"><a href="/lotus-admin/contracts?items=20">20</a></li>
                                                                <li role="menuitem"><a href="/lotus-admin/contracts?items=30">30</a></li>
                                                                <li role="menuitem"><a href="/lotus-admin/contracts?items=50">50</a></li>
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

<div class="modal fade" id="contract_terms" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content c-square" style="background: #fff;">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="col-md-12">
                    <div class="bootstrap-table">
                        <div class="fixed-table-container">
                            <div class="fixed-table-body">
                                <table class="table table-striped snipe-table table-responsive" style="margin-top: 0">
                                    <thead id="assetsListingTable-sticky-header" class="hidden-xs">
                                        <tr>
                                            <th>
                                                <div class="th-inner">开始日期</div>
                                                <div class="fht-cell"></div>
                                            </th>
                                            <th>
                                                <div class="th-inner">结束日期</div>
                                                <div class="fht-cell"></div>
                                            </th>
                                            <th>
                                                <div class="th-inner">面积(m<sup>2</sup>)</div>
                                                <div class="fht-cell"></div>
                                            </th>
                                            <th>
                                                <div class="th-inner">含税金额(元)</div>
                                                <div class="fht-cell"></div>
                                            </th>
                                            <th>
                                                <div class="th-inner">不含税金额(元)</div>
                                                <div class="fht-cell"></div>
                                            </th>
                                            <th>
                                                <div class="th-inner">坪效(元/<small>m<sup>2</sup>/天</small>)</div>
                                                <div class="fht-cell"></div>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody id="deadRentL" class="hidden-xs"></tbody>
                                    <tbody id="deadRentS" class="hidden-sm hidden-md hidden-lg"></tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<?php include 'footer.php'; ?>