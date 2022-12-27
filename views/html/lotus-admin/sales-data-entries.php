<?php
if(isset($_SESSION['lotus_admin_name']) && $_SESSION['lotus_admin_name'] == '马俊') {
    $scripts = $scripts .PHP_EOL. '        <script type="text/javascript" src="/views/assets/base/js/lotus-admin/sales-data-entries-admin.js?t='.date("Y-m-d").'"></script>'.PHP_EOL;
} else {
    $scripts = $scripts .PHP_EOL. '        <script type="text/javascript" src="/views/assets/base/js/lotus-admin/encrypted/sales-data-entries.js?t='.date("Y-m-d").'"></script>'.PHP_EOL;
}
?>
<?php $_SESSION['record_url'] = 'http://'.$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI']; ?>
<?php include 'sidebar.php'; ?>

<div class="content-wrapper">
    <section class="sub-header" style="height: 160px;">
        <h4>
            销售数据录入单
        </h4>
        <div class="pull-right">
            <a href="/lotus-admin/create-sales-data" class="btn btn-primary btn-sm">
                <i class="fa fa-plus icon-white"></i> 创建
            </a>
        </div>
        <div class="box-header">
            <div class="box-body">
                <div class="col-md-12">
                    <div class="col-md-4">
                        <div class="form-group">
                            <label class="col-md-4 control-label" style="text-align: right;">项目</label>
                            <div class="col-md-8 col-sm-12" style="text-align: left;">
                                <select class="select2" id="department" name="department" style="width: 100%">
                                    <option value="">未选择</option>
                                    <option value="SC033">川沙店[SC033]</option>
                                    <option value="SC001">杨高南路店[SC001]</option>
                                    <option value="SC005">上南店[SC005]</option>
                                    <option value="SC011">杨高北路店[SC011]</option>
                                    <option value="SC043">杨高中路店[SC043]</option>
                                    <option value="SC078">浦江店[SC078]</option>
                                    <option value="SC145">临港店[SC0145]</option>
                                    <option value="SC055">松江文诚店[SC055]</option>
                                    <option value="SC027">松江岳阳店[SC027]</option>
                                    <option value="SC126">牡丹江店[SC0126]</option>
                                    <option value="SC060">蕴川店[SC060]</option>
                                    <option value="SC082">新港店[SC082]</option>
                                    <option value="SC010">汶水店[SC010]</option>
                                    <option value="SC040">保德店[SC040]</option>
                                    <option value="SC041">南奉店[SC041]</option>
                                    <option value="SC127">南桥店[SC127]</option>
                                    <option value="SC050">金山店[SC050]</option>
                                    <option value="SC026">解放南路店[SC026]</option>
                                    <option value="SC130">大学路店[SC130]</option>
                                    <option value="SC138">中山北路店[SC138]</option>
                                    <option value="SC034">长江路店[SC034]</option>
                                    <option value="SC124">花桥店[SC124]</option>
                                    <option value="SC140">锡山东亭店[SC140]</option>
                                </select>
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
                            <label for="yearMonth" class="col-md-4 control-label" style="text-align: right;">销售年月</label>
                            <div class="col-md-8 col-sm-12" style="text-align: left;">
                                <div class="input-group">
                                    <input class="form-control date-picker" id="yearMonth" name="yearMonth" type="text" data-plugin="yearMonth" readonly style="border: 1px solid #ccc; background: #fff; border-right: none;" />
                                    <span class="input-group-addon" style="border-left: none; background: transparent;"><i class="fa fa-calendar"></i></span>
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
                                                            <li role="menuitem"><a href="/lotus-admin/sales-data-entries?items=10">10</a></li>
                                                            <li role="menuitem"><a href="/lotus-admin/sales-data-entries?items=20">20</a></li>
                                                            <li role="menuitem"><a href="/lotus-admin/sales-data-entries?items=30">30</a></li>
                                                            <li role="menuitem"><a href="/lotus-admin/sales-data-entries?items=50">50</a></li>
                                                        </ul>
                                                    </span> 行每页</span>
                                            </div>
                                            <div class="pull-right pagination">
                                                <ul class="pagination"></ul>
                                            </div>
                                        </div>
                                        <div class="fixed-table-container">
                                            <div class="fixed-table-body">
                                                <table class="table table-striped snipe-table table-responsive" style="margin-top: 0; text-align: center;">
                                                    <thead id="assetsListingTable-sticky-header">
                                                        <tr>
                                                            <th>
                                                                <div class="th-inner">单号</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">状态</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">合同号</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">起始日期</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">截止日期</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">交易笔数</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">销售金额</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">商品类别</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">说明</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody id="sales"></tbody>
                                                </table>
                                            </div>
                                            
                                            <div class="fixed-table-pagination">
                                                <div class="pull-left pagination-detail">
                                                    <span class="pagination-info"></span>
                                                    <span class="page-list">
                                                        <span class="btn-group dropdown">
                                                            <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
                                                                <span class="page-size">20</span>
                                                                <span class="caret"></span>
                                                            </button>
                                                            <ul class="dropdown-menu" role="menu">
                                                                <li role="menuitem"><a href="/lotus-admin/sales-data-entries?items=10">10</a></li>
                                                                <li role="menuitem"><a href="/lotus-admin/sales-data-entries?items=20">20</a></li>
                                                                <li role="menuitem"><a href="/lotus-admin/sales-data-entries?items=30">30</a></li>
                                                                <li role="menuitem"><a href="/lotus-admin/sales-data-entries?items=50">50</a></li>
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>

<?php include 'footer.php'; ?>