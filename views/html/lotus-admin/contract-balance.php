<?php
if(isset($_SESSION['lotus_admin_name']) && $_SESSION['lotus_admin_name'] == '马俊') {
    $scripts = $scripts .PHP_EOL. '        <script type="text/javascript" src="/views/assets/base/js/lotus-admin/contract-balance-admin.js?t='.date("Y-m-d").'"></script>'.PHP_EOL
    . '        <script type="text/javascript" src="/views/assets/plugins/timepicker/bootstrap-timepicker.js"></script>'.PHP_EOL; 
} else {
    $scripts = $scripts .PHP_EOL. '        <script type="text/javascript" src="/views/assets/base/js/lotus-admin/encrypted/contract-balance.js?t='.date("Y-m-d").'"></script>'.PHP_EOL
    . '        <script type="text/javascript" src="/views/assets/plugins/timepicker/bootstrap-timepicker.js"></script>'.PHP_EOL; 
}
?>
<?php $_SESSION['record_url'] = 'http://'.$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI']; ?>
<?php include 'sidebar.php'; ?>

<style>
    #create-form input, #create-form span {
        font-size: 8px;
    }
</style>

<div class="content-wrapper">
    <section class="sub-header" style="height: 240px;">
        <h4>
            合同结算情况
        </h4>
        <div class="pull-right">
            <a href="javascript: void(0);" class="btn btn-primary btn-sm" onclick="javascript: createBalanceDetail();"><i class="fa fa-plus icon-white"></i> <span class="hidden-xs">创建结算调整单</span></a>
        </div>
        <div class="box-header">
            <h5>不含税金额合计: <strong id="totalTaxAmount" class="text-red" style="margin-right: 10px;">0.00</strong> 含税金额合计: <strong id="totalAmount" class="text-red">0.00</strong></h5>
            <div class="box-body">
                <div class="col-md-12">
                    <div class="col-md-4">
                        <div class="form-group">
                            <label for="department" class="col-md-4 control-label" style="text-align: right;">项目</label>
                            <div class="col-md-8 col-sm-12" style="text-align: left;">
                                <select class="select2 mallCode" id="department" name="department" style="width: 100%"></select>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label for="selectContract" class="col-md-4 control-label" style="text-align: right;">合同</label>
                            <div class="col-md-8 col-sm-12" style="text-align: left;">
                                <select class="select2" id="selectContract" name="selectContract" style="width: 100%"></select>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label for="selectTenant" class="col-md-4 control-label" style="text-align: right;">对方单位</label>
                            <div class="col-md-8 col-sm-12" style="text-align: left;">
                                <select id="selectTenant" class="select2" style="width: 100%"></select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-12">
                    <div class="col-md-4">
                        <div class="form-group">
                            <label for="yearMonth" class="col-md-4 control-label" style="text-align: right;">账单结转期</label>
                            <div class="col-md-8 col-sm-12" style="text-align: left;">
                                <div class="input-group">
                                    <input class="form-control date-picker" id="yearMonth" name="yearMonth" type="text" data-plugin="yearMonth" readonly style="border: 1px solid #ccc; background: #fff; border-right: none;" />
                                    <span class="input-group-addon" style="border-left: none; background: transparent;"><i class="fa fa-calendar"></i></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label for="termType" class="col-md-4 control-label" style="text-align: right;">科目</label>
                            <div class="col-md-8 col-sm-12" style="text-align: left;">
                                <select class="select2" id="termType" name="termType" style="width: 100%; display: none;">
                                    <option value="">未选择</option>
                                    <option value="B011">固定租金</option>
                                    <option value="B021">物业管理费</option>
                                    <option value="G011">固定推广费</option>
                                    <option value="D011">提成扣率</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label for="itemType" class="col-md-4 control-label" style="text-align: right;">明细类型</label>
                            <div class="col-md-8 col-sm-12" style="text-align: left;">
                                <select class="select2" id="itemType" name="itemType" style="width: 100%; display: none;">
                                    <option value="">未选择</option>
                                    <option value="normal">常规</option>
                                    <option value="adjust">调整</option>
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

    <section class="content" style="margin-top: 290px;">
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
                                                <span class="selected"></span>
                                                <span class="pagination-info"></span>
                                                <span class="page-list">
                                                    <span class="btn-group dropdown">
                                                        <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
                                                            <span class="page-size">20</span>
                                                            <span class="caret"></span>
                                                        </button>
                                                        <ul class="dropdown-menu" role="menu">
                                                            <li role="menuitem"><a href="/lotus-admin/contract-balance?items=10">10</a></li>
                                                            <li role="menuitem"><a href="/lotus-admin/contract-balance?items=20">20</a></li>
                                                            <li role="menuitem"><a href="/lotus-admin/contract-balance?items=30">30</a></li>
                                                            <li role="menuitem"><a href="/lotus-admin/contract-balance?items=50">50</a></li>
                                                        </ul>
                                                    </span> 行每页
                                                </span>
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
                                                            <th>
                                                                <div class="th-inner"><input type="checkbox" id="all" value=""></div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">查看详情</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner" style="width: 150px;">项目</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">状态</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">来源数据</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner" style="width: 200px;">合同</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner" style="width: 300px;">对方单位</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">位置</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner" style="width: 120px;">科目</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">收付方向</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner" style="width: 200px;">费用周期</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">账单结转期</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">含税金额</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">不含税金额</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">计划出账日期</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">最后缴款日期</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody id="balance"></tbody>
                                                </table>
                                            </div>
                                        </div>
                                        <div class="fixed-table-pagination" style="clear: both;">
                                            <div class="pull-left pagination-detail">
                                                <span class="selected"></span>
                                                <span class="pagination-info"></span>
                                                <span class="page-list">
                                                    <span class="btn-group dropdown">
                                                        <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
                                                            <span class="page-size">20</span>
                                                            <span class="caret"></span>
                                                        </button>
                                                        <ul class="dropdown-menu" role="menu">
                                                            <li role="menuitem"><a href="/lotus-admin/contract-balance?items=10">10</a></li>
                                                            <li role="menuitem"><a href="/lotus-admin/contract-balance?items=20">20</a></li>
                                                            <li role="menuitem"><a href="/lotus-admin/contract-balance?items=30">30</a></li>
                                                            <li role="menuitem"><a href="/lotus-admin/contract-balance?items=50">50</a></li>
                                                        </ul>
                                                    </span> 行每页
                                                </span>
                                            </div>
                                            <div class="pull-right pagination">
                                                <ul class="pagination"></ul>
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

<?php include 'component/investment-contract-balance-create.php'; ?>

<?php include 'footer.php'; ?>