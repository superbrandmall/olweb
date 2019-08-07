<?php
$scripts = $scripts . '<script type="text/javascript" src="/views/assets/base/js/brands-admin/default-admin.js"></script>';
?>

<?php include 'sidebar.php'; ?>

<div class="content-wrapper">
    <section class="content-header" style="padding-bottom: 30px;">
        <h1 class="pull-left">
            所有品牌
        </h1>
        <div class="pull-right">
            <a href="/brands-admin/create-brand" class="btn btn-primary pull-right">
                新增
            </a>
        </div>
    </section>

    <section class="content">
        <div id="webui">
            <div class="row">
                <div class="col-md-12">
                    <div class="callout callout-info" style="display: none;">
                        删除品牌成功!
                    </div>
                </div>
            </div>
           
        <?php
            if(isset($_SESSION['brands_admin_name']) && $_SESSION['brands_admin_name'] != '管理员') {
        ?>
            <div class="row">
                <div class="col-lg-4 col-xs-4">
                    <div class="small-box bg-teal">
                        <div class="inner">
                            <h3 id="totalBrands"></h3>
                            <p>新建品牌</p>
                        </div>
                        <div class="icon">
                            总共
                        </div>
                        <a href="javascript: void(0);" class="small-box-footer">总共 <i class="fa fa-plus"></i></a>
                    </div>
                </div>

                <div class="col-lg-4 col-xs-4">
                    <div class="small-box bg-maroon">
                        <div class="inner">
                            <h3 id="currentWeekNum"></h3>
                            <p>新建品牌</p>
                        </div>
                        <div class="icon">
                            本周
                        </div>
                        <a href="javascript: void(0);" class="small-box-footer">本周 <i class="fa fa-plus"></i></a>
                    </div>
                </div>

                <div class="col-lg-4 col-xs-4">
                    <div class="small-box bg-orange">
                        <div class="inner">
                            <h3 id="currentMonthNum"></h3>
                            <p>新建品牌</p>
                        </div>
                        <div class="icon">
                            本月
                        </div>
                        <a href="javascript: void(0);" class="small-box-footer">本月 <i class="fa fa-plus"></i></a>
                    </div>
                </div>
            </div>
        <?php
            }
        ?>
            
            <div class="row">
                <div class="col-md-12">
                    <div class="box">
                        <div class="box-body">
                            <form method="POST" action="#" accept-charset="UTF-8" class="form-inline" id="bulkForm"><input name="_token" type="hidden" value="">
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
                                                            <?php
                                                                if(isset($_SESSION['brands_admin_name']) && $_SESSION['brands_admin_name'] != '管理员') {
                                                            ?>
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
                                                                    <div class="th-inner">公司</div>
                                                                    <div class="fht-cell"></div>
                                                                </th>
                                                                <th>
                                                                    <div class="th-inner">联系人</div>
                                                                    <div class="fht-cell"></div>
                                                                </th>
                                                                <th>
                                                                    <div class="th-inner">职位</div>
                                                                    <div class="fht-cell"></div>
                                                                </th>
                                                                <th>
                                                                    <div class="th-inner">电话</div>
                                                                    <div class="fht-cell"></div>
                                                                </th>
                                                                <th>
                                                                    <div class="th-inner">操作</div>
                                                                    <div class="fht-cell"></div>
                                                                </th>
                                                            <?php
                                                                } else {
                                                            ?>
                                                                <th>
                                                                    <div class="th-inner">品牌</div>
                                                                    <div class="fht-cell"></div>
                                                                </th>
                                                                <th>
                                                                    <div class="th-inner">业态</div>
                                                                    <div class="fht-cell"></div>
                                                                </th>
                                                                <th>
                                                                    <div class="th-inner">细分业态</div>
                                                                    <div class="fht-cell"></div>
                                                                </th>
                                                                <th>
                                                                    <div class="th-inner">进入年份</div>
                                                                    <div class="fht-cell"></div>
                                                                </th>
                                                                <th>
                                                                    <div class="th-inner">城市</div>
                                                                    <div class="fht-cell"></div>
                                                                </th>
                                                                <th>
                                                                    <div class="th-inner">首店进驻Mall</div>
                                                                    <div class="fht-cell"></div>
                                                                </th>
                                                                <th>
                                                                    <div class="th-inner">首店情况</div>
                                                                    <div class="fht-cell"></div>
                                                                </th>
                                                                <th>
                                                                    <div class="th-inner">所在楼层</div>
                                                                    <div class="fht-cell"></div>
                                                                </th>
                                                                <th>
                                                                    <div class="th-inner">删除</div>
                                                                    <div class="fht-cell"></div>
                                                                </th>
                                                            <?php
                                                                }
                                                            ?>
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