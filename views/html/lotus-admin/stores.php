<?php
$scripts = $scripts . '<script type="text/javascript" src="/views/assets/base/js/lotus-admin/stores-admin.js"></script>'.PHP_EOL;
?>
<?php $_SESSION['record_url'] = 'http://'.$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI']; ?>
<?php include 'sidebar.php'; ?>

<div class="content-wrapper">
    <section class="sub-header">
        <h4>
            铺位列表
        </h4>
        <div class="pull-right">
            <a href="/lotus-admin/create-store" class="btn btn-primary btn-sm">
                新建铺位
            </a>
        </div>
    </section>

    <section class="content" style="margin-top: 90px;">
        <div id="webui">
            <div class="row">
                <div class="col-md-12">
                    <div class="callout callout-info" style="display: none;">
                        新建铺位成功!
                    </div>
                    <div class="callout callout-danger" style="display: none;">
                        新建铺位失败!
                    </div>
                    <div class="callout callout-warning" style="display: none;">
                        该铺位已存在!
                    </div>
                </div>
            </div>
            
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
                                                            <span class="page-size">10</span>
                                                            <span class="caret"></span>
                                                        </button>
                                                        <ul class="dropdown-menu" role="menu">
                                                            <li role="menuitem"><a href="/lotus-admin/stores?items=10">10</a></li>
                                                            <li role="menuitem"><a href="/lotus-admin/stores?items=20">20</a></li>
                                                            <li role="menuitem"><a href="/lotus-admin/stores?items=30">30</a></li>
                                                            <li role="menuitem"><a href="/lotus-admin/stores?items=50">50</a></li>
                                                        </ul>
                                                    </span> 行每页</span>
                                            </div>
                                            <div class="pull-right pagination">
                                                <ul class="pagination"></ul>
                                            </div>
                                        </div>
                                        <div class="fixed-table-container">
                                            <div class="fixed-table-body">
                                                <table class="table table-striped snipe-table table-responsive" style="margin-top: 0">
                                                    <thead id="assetsListingTable-sticky-header" class="hidden-xs">
                                                        <tr>
                                                            <th>
                                                                <div class="th-inner">单元号</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">门牌号</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">面积(m<sup>2</sup>)</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">业态</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">品牌</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">负责人</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody id="storesL" class="hidden-xs" style="text-align: center;"></tbody>
                                                    <tbody id="storesS" class="hidden-sm hidden-md hidden-lg"></tbody>
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
                                                                <li role="menuitem"><a href="/lotus-admin/stores?items=10">10</a></li>
                                                                <li role="menuitem"><a href="/lotus-admin/stores?items=20">20</a></li>
                                                                <li role="menuitem"><a href="/lotus-admin/stores?items=30">30</a></li>
                                                                <li role="menuitem"><a href="/lotus-admin/stores?items=50">50</a></li>
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