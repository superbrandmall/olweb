<?php
if(isset($_SESSION['lotus_admin_name']) && $_SESSION['lotus_admin_name'] == '马俊') {
    $scripts = $scripts .PHP_EOL. '        <script type="text/javascript" src="/views/assets/base/js/lotus-admin/request-balance-preview-admin.js?t='.date("Y-m-d").'"></script>'.PHP_EOL
    . '        <script type="text/javascript" src="/views/assets/plugins/timepicker/bootstrap-timepicker.js"></script>'.PHP_EOL; 
} else {
    $scripts = $scripts .PHP_EOL. '        <script type="text/javascript" src="/views/assets/base/js/lotus-admin/encrypted/request-balance-preview.js?t='.date("Y-m-d").'"></script>'.PHP_EOL
    . '        <script type="text/javascript" src="/views/assets/plugins/timepicker/bootstrap-timepicker.js"></script>'.PHP_EOL; 
}
?>
<?php $_SESSION['record_url'] = 'http://'.$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI']; ?>
<?php include 'sidebar.php'; ?>

<div class="content-wrapper">
    <section class="sub-header" style="height: 245px;">
        <h4>
            合同结算预览
        </h4>
        <div class="box-header" style="background-color: #ecf0f5; margin-top: 13px; height: 50px;">
            <div class="pull-left">
                <ol class="breadcrumb" style="margin-bottom: 0; padding-left: 0;">
                    <li><a href="/lotus-admin/contract-balance-preview">合同</a></li>
                    <li class="active"><a href="javascript: void(0);">合同申请</a></li>
                </ol>
            </div>
        </div>
        <div class="box-header">
            <h5>不含税金额合计: <strong id="totalTaxAmount" class="text-red" style="margin-right: 10px;">0.00</strong> 含税金额合计: <strong id="totalAmount" class="text-red">0.00</strong></h5>
            <div class="box-body">
                <div class="col-md-12">
                    <div class="col-md-4">
                        <div class="form-group">
                            <label for="department" class="col-md-4 control-label" style="text-align: right;"><span class="btn-box-tool-lg" style="vertical-align: top;">*</span> 项目</label>
                            <div class="col-md-8 col-sm-12" style="text-align: left;">
                                <select class="select2 mallCode" id="department" name="department" style="width: 100%"></select>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label for="selectStore" class="col-md-4 control-label" style="text-align: right;"><span class="btn-box-tool-lg" style="vertical-align: top;">*</span> 铺位</label>
                            <div class="col-md-3 col-sm-12" style="text-align: left; padding-right: 2px;">
                                <select class="select2" id="unitType" style="width: 100%">
                                    <option value=""></option>
                                    <option value="L">正柜</option>
                                    <option value="C">临时柜</option>
                                    <option value="S">仓库</option>
                                    <option value="T">基站</option>
                                    <option value="R">停车场</option>
                                    <option value="A">广告位</option>
                                </select>
                            </div>
                            <div class="col-md-5 col-sm-12" style="text-align: left; padding-left: 0;">
                                <select class="select2" id="selectStore" name="selectStore" style="width: 100%"></select>
                            </div>
                        </div>
                    </div>
                    <!--<div class="col-md-4">
                        <div class="form-group">
                            <label for="minSales" class="col-md-4 control-label" style="text-align: right;">预估销售额</label>
                            <div class="col-md-8 col-sm-12">
                                <div class="input-group">
                                    <input class="form-control money" id="minSales" name="minSales" type="text" style="border: 1px solid #ccc; background: #fff; border-right: none;" />
                                    <span class="input-group-addon" style="border-left: none; background: transparent;">元</span>
                                </div>
                            </div>
                        </div>
                    </div>-->
                    <div class="col-md-4">
                        <div class="form-group">
                            <label for="termType" class="col-md-4 control-label" style="text-align: right;">科目</label>
                            <div class="col-md-8 col-sm-12" style="text-align: left;">
                                <select class="select2" id="termType" name="termType" style="width: 100%; display: none;">
                                    <option value=""></option>
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
                            <label for="yearMonth" class="col-md-4 control-label" style="text-align: right;">账期</label>
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

    <section class="content" style="margin-top: 295px;">
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
                                                <table class="table table-striped snipe-table table-responsive" style="margin-top: 0; text-align: left; font-size: 11px;">
                                                    <thead id="assetsListingTable-sticky-header">
                                                        <tr>
                                                            <th>
                                                                <div class="th-inner">行</div>
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
                                                                <div class="th-inner">账期</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">费用周期</div>
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
                                                            <th>
                                                                <div class="th-inner">不含税金额</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">含税金额</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody id="balance"></tbody>
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