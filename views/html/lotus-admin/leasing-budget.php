<?php
if(isset($_SESSION['lotus_admin_name']) && $_SESSION['lotus_admin_name'] == '马俊') {
    $scripts = $scripts .PHP_EOL. '        <script type="text/javascript" src="/views/assets/base/js/lotus-admin/leasing-budget-admin.js?t='.date("Y-m-d").'"></script>'.PHP_EOL;
} else {
    $scripts = $scripts .PHP_EOL. '        <script type="text/javascript" src="/views/assets/base/js/lotus-admin/encrypted/leasing-budget.js?t='.date("Y-m-d").'"></script>'.PHP_EOL;
}
?>
<?php $_SESSION['record_url'] = 'http://'.$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI']; ?>
<?php include 'sidebar.php'; ?>

<div class="content-wrapper">
    <section class="sub-header" style="height: 160px;">
        <h4>
            租金计划
        </h4>
        <div class="box-header">
            <div class="box-body">
                <div class="col-md-12">
                    <div class="col-md-4">
                        <div class="form-group">
                            <label class="col-md-4 control-label" style="text-align: right;">业态</label>
                            <div class="col-md-8 col-sm-12" style="text-align: left; padding-right: 0px;">
                                <select class="select2" id="modality_1" name="modality_1" style="width: 100%" data-placeholder="未选择一级业态">
                                    <option value="">未选择一级业态</option>
                                    <option value="零售">零售</option>
                                    <option value="餐饮">餐饮</option>
                                    <option value="娱乐服务">娱乐服务</option>
                                    <option value="儿童">儿童</option>
                                    <option value="主力店">主力店</option>
                                    <option value="基站">基站</option>
                                    <option value="停车场">停车场</option>
                                    <option value="酒店公寓">酒店公寓</option>
                                </select>
                            </div>
                            <div class="col-md-8 col-sm-12" style="text-align: left; padding-left: 2px; display: none;">
                                <select class="select2" id="modality_2" name="modality_2" style="width: 100%" data-placeholder="未选择二级业态" data-allow-clear="true">
                                    <option value="">未选择二级业态</option>
                                </select>
                            </div>
                            <div class="col-md-8 col-sm-12" style="text-align: left; padding-left: 2px; display: none;">
                                <select class="select2" id="modality_3" name="modality_3" style="width: 100%" data-placeholder="未选择三级业态" data-allow-clear="true">
                                    <option value="">未选择三级业态</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label class="col-md-4 control-label" style="text-align: right;">项目</label>
                            <div class="col-md-8 col-sm-12" style="text-align: left;">
                                <select class="select2 mallCode" id="mallCode" name="mallCode" style="width: 100%"></select>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label class="col-md-4 control-label" style="text-align: right;">铺位</label>
                            <div class="col-md-8 col-sm-12" style="text-align: left;">
                                <select class="select2" id="selectStore" style="width: 100%"></select>
                            </div>
                        </div>
                    </div>
                    <div class="clearfix"></div>
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
                                                            <li role="menuitem"><a href="/lotus-admin/leasing-budget?items=10">10</a></li>
                                                            <li role="menuitem"><a href="/lotus-admin/leasing-budget?items=20">20</a></li>
                                                            <li role="menuitem"><a href="/lotus-admin/leasing-budget?items=30">30</a></li>
                                                            <li role="menuitem"><a href="/lotus-admin/leasing-budget?items=50">50</a></li>
                                                        </ul>
                                                    </span> 行每页</span>
                                            </div>
                                            <div class="pull-right pagination">
                                                <ul class="pagination"></ul>
                                            </div>
                                        </div>
                                        <div class="fixed-table-container">
                                            <div class="fixed-table-body">
                                                <table class="table table-striped snipe-table table-responsive">
                                                    <thead id="assetsListingTable-sticky-header">
                                                        <tr>
                                                            <th colspan="4"></th>
                                                            <th colspan="12">
                                                                <div class="th-inner" style="text-align: center;">固定租金(元/月)</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th colspan="12">
                                                                <div class="th-inner" style="text-align: center;">物业管理费(元/月)</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th colspan="12">
                                                                <div class="th-inner" style="text-align: center;">提成扣率</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th colspan="12">
                                                                <div class="th-inner" style="text-align: center;">固定推广费(元/月)</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th colspan="12">
                                                                <div class="th-inner" style="text-align: center;">预估销售额(元/月)</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                        </tr>
                                                        <tr>
                                                            <th style="z-index: 1;">
                                                                <div class="th-inner" style="background: #fff;">位置</div>
                                                                <div class="fht-cell" style="background: #fff; border-right: solid 1px #ddd; border-bottom: solid 1px #ddd;"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">位置类型</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">面积(m²)</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">业态</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <?php
                                                                for($n=0;$n<5;$n++) {
                                                                for($i=1;$i<=12;$i++) {
                                                            ?>
                                                            <th>
                                                                <div class="th-inner"><?= $i;?>月</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <?php
                                                                }}
                                                            ?>
                                                        </tr>
                                                    </thead>
                                                    <tbody id="budget"></tbody>
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

<?php include 'footer.php'; ?>