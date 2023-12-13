<?php
if(isset($_SESSION['lotus_admin_name']) && $_SESSION['lotus_admin_name'] == '马俊') {
    $scripts = $scripts .PHP_EOL. '        <script type="text/javascript" src="/views/assets/base/js/lotus-admin/fee-item-admin.js"></script>'.PHP_EOL;
} else {
    $scripts = $scripts .PHP_EOL. '        <script type="text/javascript" src="/views/assets/base/js/lotus-admin/encrypted/fee-item.js"></script>'.PHP_EOL;
}

?>
<?php $_SESSION['record_url'] = 'http://'.$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI']; ?>
<?php include 'sidebar.php'; ?>

<div class="content-wrapper">
    <section class="sub-header" style="height: 160px;">
        <h4>
            科目
        </h4>
        <div class="pull-right">
            <a href="javascript: void(0);" class="btn btn-primary btn-sm" onclick="javascript: createFeeItemDetail();"><i class="fa fa-plus icon-white"></i> <span class="hidden-xs">创建科目</span></a>
        </div>
        <div class="box-header">
            <div class="box-body">
                <div class="col-md-12">
                    <div class="col-md-4">
                        <div class="form-group">
                            <label for="termType" class="col-md-4 control-label" style="text-align: right;">用途</label>
                            <div class="col-md-8 col-sm-12" style="text-align: left;">
                                <select class="select2" id="termType" name="termType" style="width: 100%; display: none;">
                                    <option value="">未选择</option>
                                    <option value="B011">租金</option>
                                    <option value="D011">销售提成</option>
                                    <option value="B021,Y021">固定费用</option>
                                    <option value="G011">其他固定费用</option>
                                    <option value="E02,E03,E22">保证金</option>
                                    <option value="H01,H02,H03,Y77">其他费用</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label for="transactionType" class="col-md-4 control-label" style="text-align: right;">类型</label>
                            <div class="col-md-8 col-sm-12" style="text-align: left;">
                                <select class="select2" id="transactionType" name="transactionType" style="width: 100%; display: none;">
                                    <option value="">未选择</option>
                                    <option value="Z10">Z10</option>
                                    <option value="Z11">Z11</option>
                                    <option value="F02">F02</option>
                                    <option value="Y77">Y77</option>
                                    <option value="TES">TES</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label for="isTaxFlag" class="col-md-4 control-label" style="text-align: right;">交税</label>
                            <div class="col-md-8 col-sm-12" style="text-align: left;">
                                <select class="select2" id="isTaxFlag" name="isTaxFlag" style="width: 100%; display: none;">
                                    <option value="">未选择</option>
                                    <option value="1">是</option>
                                    <option value="0">否</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-12">
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

    <section class="content" style="margin-top: 210px;">
        <div id="webui">
            <div class="row">
                <div class="col-md-12">
                    <div class="box">
                        <div class="box-body">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="bootstrap-table">
                                        <div class="fixed-table-container">
                                            <div class="fixed-table-body">
                                                <table class="table table-striped snipe-table table-responsive">
                                                    <thead id="assetsListingTable-sticky-header">
                                                        <tr>
                                                            <th style="z-index: 1;">
                                                                <div class="th-inner" style="background: #fff;">科目</div>
                                                                <div class="fht-cell" style="background: #fff; border-right: solid 1px #ddd; border-bottom: solid 1px #ddd;"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">借方科目</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">贷方科目</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">贷方税科目</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">类型</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">税</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">创建信息</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">最后修改信息</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody id="item"></tbody>
                                                </table>
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

<?php include 'component/investment-fee-item-create.php'; ?>

<?php include 'footer.php'; ?>