<?php
if(isset($_SESSION['lotus_admin_name']) && $_SESSION['lotus_admin_name'] == '马俊') {
    $scripts = $scripts .PHP_EOL. '        <script type="text/javascript" src="/views/assets/base/js/lotus-admin/bills-admin.js?t='.date("Y-m-d").'"></script>'.PHP_EOL
    . '        <script type="text/javascript" src="/views/assets/plugins/timepicker/bootstrap-timepicker.js"></script>'.PHP_EOL; 
} else {
    $scripts = $scripts .PHP_EOL. '        <script type="text/javascript" src="/views/assets/base/js/lotus-admin/encrypted/bills.js?t='.date("Y-m-d").'"></script>'.PHP_EOL
    . '        <script type="text/javascript" src="/views/assets/plugins/timepicker/bootstrap-timepicker.js"></script>'.PHP_EOL; 
}
?>
<?php $_SESSION['record_url'] = 'http://'.$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI']; ?>
<?php include 'sidebar.php'; ?>

<div class="content-wrapper">
    <section class="sub-header" style="height: 280px;">
        <h4>
            财务账单
        </h4>
        <div class="box-header">
            <h5>不含税金额合计: <strong id="totalTaxAmount" class="text-red" style="margin-right: 10px;">0.00</strong> 含税金额合计: <strong id="totalAmount" class="text-red">0.00</strong></h5>
            <div class="box-body">
                <div class="col-md-12">
                    <div class="col-md-4">
                        <div class="form-group">
                            <label for="voucherStatus" class="col-md-4 control-label" style="text-align: right;">状态</label>
                            <div class="col-md-8 col-sm-12" style="text-align: left;">
                                <select class="select2" id="voucherStatus" style="width: 100%; display: none;" multiple>
                                    <option value="" selected>全部</option>
                                    <option value="0">未生成凭证</option>
                                    <option value="1">已生成凭证</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label for="accountingVoucherCode" class="col-md-4 control-label" style="text-align: right;">凭证编码</label>
                            <div class="col-md-8 col-sm-12" style="text-align: left;">
                                <input class="form-control" id="accountingVoucherCode" name="accountingVoucherCode" type="text" />
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label for="voucherType" class="col-md-4 control-label" style="text-align: right;">凭证类型</label>
                            <div class="col-md-8 col-sm-12" style="text-align: left;">
                                <select class="select2" id="voucherType" style="width: 100%; display: none;">
                                    <option value="">未选择</option>
                                    <option value="SA">SA</option>
                                    <option value="Z1">Z1</option>
                                    <option value="Z3">Z3</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
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
                            <label class="col-md-4 control-label" style="text-align: right;">铺位</label>
                            <div class="col-md-3 col-sm-12" style="text-align: left; padding-right: 0px;">
                                <select class="select2" id="unitType" style="width: 100%">
                                    <option value=""></option>
                                    <option value="L:::shoppe">正柜</option>
                                    <option value="C:::kiosk">临时柜</option>
                                    <option value="S:::stora">仓库</option>
                                    <option value="T:::station">基站</option>
                                    <option value="R:::park">停车场</option>
                                    <option value="A:::ad">广告位</option>
                                    <option value="B:::booth">虚拟点位</option>
                                    <option value="E:::event">场地</option>
                                    <option value="M:::union">联销区</option>
                                </select>
                            </div>
                            <div class="col-md-5 col-sm-12" style="text-align: left; padding-left: 2px;">
                                <select class="select2" id="selectStore" style="width: 100%"></select>
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
                </div>
                <div class="col-md-12">
                    <div class="col-md-4">
                        <div class="form-group">
                            <label for="selectTenant" class="col-md-4 control-label" style="text-align: right;">商户</label>
                            <div class="col-md-8 col-sm-12" style="text-align: left;">
                                <select id="selectTenant" class="select2" style="width: 100%"></select>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label for="brandName" class="col-md-4 control-label" style="text-align: right;">品牌</label>
                            <div class="col-md-8 col-sm-12" style="text-align: left;">
                                <select id="brandName" class="select2" style="width: 100%"></select>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label for="yearMonthStartDate" class="col-md-4 control-label" style="text-align: right;">账单结转期</label>
                            <div class="col-md-8 col-sm-12">
                                <div id="yearMonth" class="input-daterange input-group">
                                    <input type="text" class="form-control" id="yearMonthStartDate" readonly style="border: 1px solid #ccc; background: #fff; border-radius: 0; border-right: none;" />
                                    <span class="input-group-addon" style="border-left: none; background: transparent;"><i class="fa fa-calendar"></i></span>
                                    <span class="input-group-addon" style="border: none; background: transparent; padding: 0;">-</span>
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="yearMonthEndDate" readonly style="border: 1px solid #ccc; background: #fff; border-radius: 0; border-right: none;" />
                                        <span class="input-group-addon" style="border-left: none; background: transparent;"><i class="fa fa-calendar"></i></span>
                                    </div>
                                </div>
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

    <section class="content" style="margin-top: 330px;">
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
                                                <table class="table table-striped snipe-table table-responsive">
                                                    <thead id="assetsListingTable-sticky-header">
                                                        <tr>
                                                            <th style="z-index: 1;">
                                                                <div class="th-inner" style="background: #fff;"><input type="checkbox" id="all" value=""></div>
                                                                <div class="fht-cell" style="background: #fff; border-right: solid 1px #ddd; border-bottom: solid 1px #ddd;"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">查看详情</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">项目</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">状态</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">凭证编码</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">来源数据</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">合同</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">商户</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">铺位</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">科目</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">收付方向</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">费用周期</div>
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
                                                                <div class="th-inner">创建信息</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">最后修改信息</div>
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