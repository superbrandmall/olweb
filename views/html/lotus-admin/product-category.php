<?php
if(isset($_SESSION['lotus_admin_name']) && $_SESSION['lotus_admin_name'] == '马俊') {
    $scripts = $scripts .PHP_EOL. '        <script type="text/javascript" src="/views/assets/base/js/lotus-admin/product-category-admin.js?t='.date("Y-m-d").'"></script>'.PHP_EOL;
} else {
    $scripts = $scripts .PHP_EOL. '        <script type="text/javascript" src="/views/assets/base/js/lotus-admin/encrypted/product-category.js?t='.date("Y-m-d").'"></script>'.PHP_EOL;
}
?>
<?php $_SESSION['record_url'] = 'http://'.$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI']; ?>
<?php include 'sidebar.php'; ?>

<div class="content-wrapper">
    <form id="search-form" class="form-horizontal" role="form" enctype="multipart/form-data">
        <section class="sub-header" style="height: 40px;">
            <h4>
                商品类别
            </h4>
        </section>
    </form>

    <section class="content" style="margin-top: 90px;">
        <div id="webui">
            <div class="row">
                <div class="col-md-12">
                    <div class="box">
                        <div class="box-body">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="bootstrap-table">
                                        <div class="fixed-table-body">
                                            <table class="table table-responsive" style="margin-top: 0; text-align: left; border: 0 none;">
                                                <thead id="assetsListingTable-sticky-header">
                                                    <tr>
                                                        <th style="padding: 8px;">
                                                            <div class="th-inner">商品类别</div>
                                                            <div class="fht-cell"></div>
                                                        </th>
                                                        <th style="padding: 8px;">
                                                            <div class="th-inner">状态</div>
                                                            <div class="fht-cell"></div>
                                                        </th>
                                                        <th style="padding: 8px;">
                                                            <div class="th-inner">说明</div>
                                                            <div class="fht-cell"></div>
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody id="productCategory"></tbody>
                                            </table>
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