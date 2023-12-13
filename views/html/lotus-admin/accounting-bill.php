<?php
if(isset($_SESSION['lotus_admin_name']) && $_SESSION['lotus_admin_name'] == '马俊') {
    $scripts = $scripts .PHP_EOL. '        <script type="text/javascript" src="/views/assets/base/js/lotus-admin/accounting-bill-admin.js?t='.date("Y-m-d").'"></script>'.PHP_EOL
    . '        <script type="text/javascript" src="/views/assets/plugins/timepicker/bootstrap-timepicker.js"></script>'.PHP_EOL; 
} else {
    $scripts = $scripts .PHP_EOL. '        <script type="text/javascript" src="/views/assets/base/js/lotus-admin/encrypted/accounting-bill.js?t='.date("Y-m-d").'"></script>'.PHP_EOL
    . '        <script type="text/javascript" src="/views/assets/plugins/timepicker/bootstrap-timepicker.js"></script>'.PHP_EOL; 
}
?>
<?php $_SESSION['record_url'] = 'http://'.$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI']; ?>
<?php include 'sidebar.php'; ?>

<div class="content-wrapper">
    <section class="sub-header" style="height: 250px;">
        <h4>
            财务账单
        </h4>
        <div class="box-header">
            <div class="box-body">
                <div class="col-md-12">
                    <div class="col-md-4">
                        <div class="form-group">
                            <label for="accountingVoucherStatus" class="col-md-4 control-label" style="text-align: right;">状态</label>
                            <div class="col-md-8 col-sm-12" style="text-align: left;">
                                <select class="select2" id="accountingVoucherStatus" style="width: 100%; display: none;" multiple>
                                    <option value="" selected>全部</option>
                                    <option value="1">未传凭</option>
                                    <option value="2">传凭失败</option>
                                    <option value="8">传凭作废</option>
                                    <option value="9">传凭成功</option>
                                </select>
                            </div>
                        </div>
                    </div>
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
                            <label for="accountingVoucherCode" class="col-md-4 control-label" style="text-align: right;">凭证编码</label>
                            <div class="col-md-8 col-sm-12" style="text-align: left;">
                                <input class="form-control" id="accountingVoucherCode" name="accountingVoucherCode" type="text" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-12">
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
                            <label for="selectTenant" class="col-md-4 control-label" style="text-align: right;">商户</label>
                            <div class="col-md-8 col-sm-12" style="text-align: left;">
                                <select id="selectTenant" class="select2" style="width: 100%"></select>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label for="accountingVoucherDate" class="col-md-4 control-label" style="text-align: right;">凭证日期</label>
                            <div class="col-md-8 col-sm-12" style="text-align: left;">
                                <div class="input-group">
                                    <input class="form-control date-picker" id="accountingVoucherDate" name="accountingVoucherDate" type="text" readonly style="border: 1px solid #ccc; background: #fff; border-right: none;" />
                                    <span class="input-group-addon" style="border-left: none; background: transparent;"><i class="fa fa-calendar"></i></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-12">
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
                    <div class="col-md-4">
                        <div class="form-group">
                            <label for="termType" class="col-md-4 control-label" style="text-align: right;">科目</label>
                            <div class="col-md-8 col-sm-12" style="text-align: left;">
                                <select class="select2" id="termType" name="termType" style="width: 100%; display: none;">
                                    <option value="">未选择</option>
                                    <option value="B011">固定租金[B011]</option>
                                    <option value="B021">商场服务费-月[B021]</option>
                                    <option value="D011">提成租金[D011]</option>
                                    <option value="G011">固定推广费[G011]</option>
                                    <option value="E02">租赁押金[E02]</option>
                                    <option value="E03">装修押金[E03]</option>
                                    <option value="E22">公共事业费押金[E22]</option>
                                    <option value="H01">水费[H01]</option>
                                    <option value="H02">电费[H02]</option>
                                    <option value="H03">煤气费[H03]</option>
                                    <option value="Y021">商场服务费-年[Y021]</option>
                                    <option value="Y77">服务费-线损费[Y77]</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label for="accountingVoucherMessIdOs" class="col-md-4 control-label" style="text-align: right;">Mess Id Os</label>
                            <div class="col-md-8 col-sm-12" style="text-align: left;">
                                <input class="form-control" id="accountingVoucherMessIdOs" name="accountingVoucherMessIdOs" type="text" />
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

    <section class="content" style="margin-top: 300px;">
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
                                                            <li role="menuitem"><a href="/lotus-admin/accounting-bill?items=10">10</a></li>
                                                            <li role="menuitem"><a href="/lotus-admin/accounting-bill?items=20">20</a></li>
                                                            <li role="menuitem"><a href="/lotus-admin/accounting-bill?items=30">30</a></li>
                                                            <li role="menuitem"><a href="/lotus-admin/accounting-bill?items=50">50</a></li>
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
                                                                <div class="th-inner">查看详情</div><!--url bill-detail-->
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">对方单位</div><!--tenantName[tenantNo]-->
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">项目</div><!--mallName[mallCode]-->
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">发布状态</div><!--resultCode 已发布-->
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">欠款金额</div><!--amount-->
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">结转期</div><!--yyyymm-->
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">出账日期</div><!--processDate-->
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">应收记账日期</div><!--paymentDate-->
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">创建信息</div><!--created[creatorOpenId]-->
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">最后修改信息</div><!--updated[updateOpenId]-->
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody id="bill"></tbody>
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
                                                            <li role="menuitem"><a href="/lotus-admin/accounting-bill?items=10">10</a></li>
                                                            <li role="menuitem"><a href="/lotus-admin/accounting-bill?items=20">20</a></li>
                                                            <li role="menuitem"><a href="/lotus-admin/accounting-bill?items=30">30</a></li>
                                                            <li role="menuitem"><a href="/lotus-admin/accounting-bill?items=50">50</a></li>
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

<?php include 'footer.php'; ?>