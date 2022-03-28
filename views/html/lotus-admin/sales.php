<?php
$scripts = $scripts . '<script type="text/javascript" src="/views/assets/plugins/datepicker/bootstrap-datepicker.min.js"></script>'.PHP_EOL
    . '        <script type="text/javascript" src="/views/assets/base/js/lotus-admin/sales-admin.js"></script>'.PHP_EOL;
?>

<?php include 'sidebar.php'; ?>

<div class="content-wrapper">
    <section class="sub-header">
        <h4>
            销售查询
        </h4>
    </section>

    <section class="content" style="margin-top: 90px;">
        <div id="webui">
            <div class="row">
                <div class="col-md-12">
                    <div class="box">
                        <div class="box-body">
                            <h4>按条件查询</h4>
                            <form id="condition_form" class="form-horizontal" role="form" enctype="multipart/form-data">
                                <div class="form-group col-md-4">
                                    <label for="department" class="col-md-5 control-label">选择门店 <span class="btn-box-tool-lg">*</span></label>
                                    <div class="col-md-7 required">
                                        <select class="select2" id="department" name="department" style="width: 100%">
                                            <option class="no-remove" value="" >未选择</option>
                                            <option value="SC033">川沙店</option>
                                            <option value="SC001">杨高南路店</option>
                                            <option value="SC005">上南店</option>
                                            <option value="SC011">杨高北路店</option>
                                            <option value="SC043">杨高中路店</option>
                                            <option value="SC078">浦江店</option>
                                            <option value="SC145">临港店</option>
                                            <option value="SC055">松江文诚店</option>
                                            <option value="SC027">松江岳阳店</option>
                                            <option value="SC126">牡丹江店</option>
                                            <option value="SC060">蕴川店</option>
                                            <option value="SC082">新港店</option>
                                            <option value="SC010">汶水店</option>
                                            <option value="SC040">保德店</option>
                                            <option value="SC041">南奉店</option>
                                            <option value="SC127">南桥店</option>
                                            <option value="SC050">金山店</option>
                                        </select>
                                        <div id="errorcontainer-department" class="errorDiv"></div>
                                    </div>
                                </div>
                                <div class="form-group col-md-4">
                                    <label for="contract" class="col-md-5 control-label">选择品牌 <span class="btn-box-tool-lg">*</span></label>
                                    <div class="col-md-7 required">
                                        <select class="select2" id="contract" name="contract" style="width: 100%"></select>
                                        <div id="errorcontainer-contract" class="errorDiv"></div>
                                    </div>
                                </div>
                                <div class="clearfix"></div>
                                <div class="form-group col-md-4">
                                    <label for="startDate" class="col-md-5 control-label">开始时间 <span class="btn-box-tool-lg">*</span></label>
                                    <div class="col-md-7 col-sm-12 required">
                                        <input class="form-control" type="text" id="startDate" name="startDate" readonly style="background: #fff; border: solid 1px #d2d6de;">
                                        <div id="errorcontainer-startDate" class="errorDiv"></div>
                                    </div>
                                </div>
                                <div class="form-group col-md-4">
                                    <label for="endDate" class="col-md-5 control-label">结束时间 <span class="btn-box-tool-lg">*</span></label>
                                    <div class="col-md-7 col-sm-12 required">
                                        <input class="form-control" type="text" id="endDate" name="endDate" readonly style="background: #fff; border: solid 1px #d2d6de;">
                                        <div id="errorcontainer-endDate" class="errorDiv"></div>
                                    </div>
                                </div>
                                <div class="form-group col-md-4" style="padding-left: 30px;">
                                    <button type="submit" class="btn btn-info"><i class="fa fa-question-circle-o icon-white"></i> 查询</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    
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
                                                            <span class="page-size">10</span>
                                                            <span class="caret"></span>
                                                        </button>
                                                        <ul class="dropdown-menu" role="menu">
                                                            <li role="menuitem"><a href="/lotus-admin/sales?items=10">10</a></li>
                                                            <li role="menuitem"><a href="/lotus-admin/sales?items=20">20</a></li>
                                                            <li role="menuitem"><a href="/lotus-admin/sales?items=30">30</a></li>
                                                            <li role="menuitem"><a href="/lotus-admin/sales?items=50">50</a></li>
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
                                                            <th>
                                                                <div class="th-inner">日期</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">品牌</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">金额</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">笔数</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody id="salesL" class="hidden-xs"></tbody>
                                                    <tbody id="salesS" class="hidden-sm hidden-md hidden-lg"></tbody>
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
                                                                <li role="menuitem"><a href="/lotus-admin/sales?items=10">10</a></li>
                                                                <li role="menuitem"><a href="/lotus-admin/sales?items=20">20</a></li>
                                                                <li role="menuitem"><a href="/lotus-admin/sales?items=30">30</a></li>
                                                                <li role="menuitem"><a href="/lotus-admin/sales?items=50">50</a></li>
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