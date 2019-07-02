<?php
$scripts = $scripts . '<script type="text/javascript" src="/views/assets/base/js/brands-admin/brands-admin.js"></script>';
?>

<?php include 'sidebar.php'; ?>

<div class="content-wrapper">
    <section class="content-header" style="padding-bottom: 30px;">
        <h1 class="pull-left">
            所有品牌
        </h1>
        <div class="pull-right">
            <a href="#" style="margin-right: 5px;" class="btn btn-default">
                导出本地</a>
            <a href="/brands-admin/create-brand" class="btn btn-primary pull-right"></i> 新增</a>
        </div>
    </section>

    <section class="content">
        <div id="webui">

            <div class="row">
                <div class="col-md-12">
                    <div class="box">
                        <div class="box-body">
                            <form method="POST" action="#" accept-charset="UTF-8" class="form-inline" id="bulkForm"><input name="_token" type="hidden" value="">
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="bootstrap-table">
                                            <div class="fixed-table-toolbar">
                                                <div class="columns columns-right btn-group pull-right" role="group">
                                                    <button class="btn btn-default" type="button" name="advancedSearch" aria-label="高级搜索" title="Advanced search">
                                                        <i class="fa fa fa-search-plus"></i>
                                                    </button>
                                                </div>
                                                <div class="bs-bars pull-left">
                                                    <div class="search">
                                                        <input class="form-control" type="text" placeholder="搜索">
                                                    </div>
                                                </div>
                                            </div>
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
                                                                <li role="menuitem"><a href="/brands-admin/brands?items=10">10</a></li>
                                                                <li role="menuitem"><a href="/brands-admin/brands?items=20">20</a></li>
                                                                <li role="menuitem"><a href="/brands-admin/brands?items=30">30</a></li>
                                                                <li role="menuitem"><a href="/brands-admin/brands?items=50">50</a></li>
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
                                                                    <div class="th-inner">品牌</div>
                                                                    <div class="fht-cell"></div>
                                                                </th>
                                                                <th>
                                                                    <div class="th-inner">Logo</div>
                                                                    <div class="fht-cell"></div>
                                                                </th>
                                                                <th>
                                                                    <div class="th-inner">业态</div>
                                                                    <div class="fht-cell"></div>
                                                                </th>
                                                                <th>
                                                                    <div class="th-inner">属性</div>
                                                                    <div class="fht-cell"></div>
                                                                </th>
                                                                <th>
                                                                    <div class="th-inner">价位</div>
                                                                    <div class="fht-cell"></div>
                                                                </th>
                                                                <th>
                                                                    <div class="th-inner">口碑</div>
                                                                    <div class="fht-cell"></div>
                                                                </th>
                                                                <th>
                                                                    <div class="th-inner">状态</div>
                                                                    <div class="fht-cell"></div>
                                                                </th>
                                                                <th>
                                                                    <div class="th-inner">操作</div>
                                                                    <div class="fht-cell"></div>
                                                                </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody id="brandsL" class="hidden-xs"></tbody>
                                                        <tbody id="brandsS" class="hidden-sm hidden-md hidden-lg"></tbody>
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
                                                                    <li role="menuitem"><a href="/brands-admin/brands?items=10">10</a></li>
                                                                    <li role="menuitem"><a href="/brands-admin/brands?items=20">20</a></li>
                                                                    <li role="menuitem"><a href="/brands-admin/brands?items=30">30</a></li>
                                                                    <li role="menuitem"><a href="/brands-admin/brands?items=50">50</a></li>
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
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </section>

</div>
<?php include 'footer.php'; ?>