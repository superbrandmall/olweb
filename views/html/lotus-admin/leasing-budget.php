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
    <section class="sub-header" style="height: 200px;">
        <h4>
            租金计划
        </h4>
        <div class="box-header">
            <div class="box-body">
                <div class="col-md-12">
                    <div class="col-md-4">
                        <div class="form-group">
                            <label class="col-md-4 control-label" style="text-align: right;">业态</label>
                            <div class="col-md-8 col-sm-12" style="text-align: left;">
                                <select class="select2" id="biz" name="biz" style="width: 100%">
                                    <option value="">未选择</option>
                                    <option value="0">零售 (I)</option>
                                    <option value="1">娱乐服务 (I)</option>
                                    <option value="2">儿童 (I)</option>
                                    <option value="3">餐饮 (I)</option>
                                    <option value="4">主力店 (I)</option>
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
                    <div class="col-md-4">
                        <div class="form-group">
                            <label class="col-md-4 control-label" style="text-align: right;">开始日期</label>
                            <div class="col-md-8 col-sm-12">
                                <div class="input-daterange input-group">
                                    <input type="text" class="form-control" id="startStartDate" readonly style="border: 1px solid #ccc; background: #fff; border-radius: 0; border-right: none; text-align: right; font-size: 10px;" />
                                    <span class="input-group-addon" style="border-left: none; background: transparent;"><i class="fa fa-calendar"></i></span>
                                    <span class="input-group-addon" style="border: none; background: transparent; padding: 0;">-</span>
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="startEndDate" readonly style="border: 1px solid #ccc; background: #fff; border-radius: 0; border-right: none; text-align: right; font-size: 10px;" />
                                        <span class="input-group-addon" style="border-left: none; background: transparent;"><i class="fa fa-calendar"></i></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label class="col-md-4 control-label" style="text-align: right;">截止日期</label>
                            <div class="col-md-8 col-sm-12">
                                <div class="input-daterange input-group">
                                    <input type="text" class="form-control" id="endStartDate" readonly style="border: 1px solid #ccc; background: #fff; border-radius: 0; border-right: none; text-align: right; font-size: 10px;" />
                                    <span class="input-group-addon" style="border-left: none; background: transparent;"><i class="fa fa-calendar"></i></span>
                                    <span class="input-group-addon" style="border: none; background: transparent; padding: 0;">-</span>
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="endEndDate" readonly style="border: 1px solid #ccc; background: #fff; border-radius: 0; border-right: none; text-align: right; font-size: 10px;" />
                                        <span class="input-group-addon" style="border-left: none; background: transparent;"><i class="fa fa-calendar"></i></span>
                                    </div>
                                </div>
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

    <section class="content" style="margin-top: 250px;">
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
                                                            <li role="menuitem"><a href="/lotus-admin/store-progress-console?items=10">10</a></li>
                                                            <li role="menuitem"><a href="/lotus-admin/store-progress-console?items=20">20</a></li>
                                                            <li role="menuitem"><a href="/lotus-admin/store-progress-console?items=30">30</a></li>
                                                            <li role="menuitem"><a href="/lotus-admin/store-progress-console?items=50">50</a></li>
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
                                                                <div class="th-inner" style="width: 200px; background: #fff;">位置</div>
                                                                <div class="fht-cell" style="background: #fff; border-right: solid 1px #ddd; border-bottom: solid 1px #ddd;"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner" style="width: 90px;">位置类型</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">开始日期</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">截止日期</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">面积(m²)</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">扣点</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner" style="width: 90px;">业态</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">租金单价</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">月管理费(元/月/平米)</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">租赁年限</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">装修期</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">月管理费(元/月)</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">推广费</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">销售额</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">租金总计</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">日租金(元/天)</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">月租金(元/月/平米)</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">月租金(元/月)</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
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