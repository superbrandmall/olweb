<?php
if(isset($_SESSION['lotus_admin_name']) && $_SESSION['lotus_admin_name'] == '马俊') {
    $scripts = $scripts .PHP_EOL. '        <script type="text/javascript" src="/views/assets/base/js/lotus-admin/contracts-admin.js"></script>'.PHP_EOL;
} else {
    $scripts = $scripts .PHP_EOL. '        <script type="text/javascript" src="/views/assets/base/js/lotus-admin/encrypted/contracts.js"></script>'.PHP_EOL;
}
?>
<?php $_SESSION['record_url'] = 'http://'.$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI']; ?>
<?php include 'sidebar.php'; ?>

<div class="content-wrapper">
    <section class="sub-header" style="height: 200px;">
        <h4>
            租赁合同
        </h4>
        <div class="pull-right">
            <div class="btn-group">
                <button type="button" class="btn btn-primary btn-sm dropdown-toggle" data-toggle="dropdown">
                    <i class="fa fa-plus icon-white"></i> 创建
                    <span class="caret"></span>
                </button>
                <ul class="dropdown-menu pull-right" role="menu">
                    <li><a href="/lotus-admin/make-request">新签租赁合同申请单</a></li>
                    <li><a href="javascript: void(0);" id="createRenew">续签租赁合同申请单</a></li>              
                    <li><a href="javascript: void(0);" id="createTerminate">终止租赁合同申请单</a></li>
                    <li><a href="javascript: void(0);" id="createModify">变更租赁合同申请单</a></li>
                </ul>
            </div>
        </div>
        <div class="box-header">
            <div class="box-body">
                <div class="col-md-12">
                    <div class="col-md-4">
                        <div class="form-group">
                            <label class="col-md-4 control-label" style="text-align: right;">状态</label>
                            <div class="col-md-8 col-sm-12" style="text-align: left;">
                                <select class="select2" id="contractStatus" style="width: 100%">
                                    <option value="" selected>全部</option>
                                    <option value="effect">已生效</option>
                                    <option value="termination">已终止</option>
                                    <option value="uneffect">未生效</option>
                                    <option value="cancel">已作废</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label class="col-md-4 control-label" style="text-align: right;">签约编号</label>
                            <div class="col-md-8 col-sm-12" style="text-align: left;">
                                <input class="form-control" id="contractNo" type="text"  />
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label class="col-md-4 control-label" style="text-align: right;">版本</label>
                            <div class="col-md-8 col-sm-12" style="text-align: left;">
                                <select class="select2" id="contractVersion" style="width: 100%">
                                    <option value="" selected>全部</option>
                                    <option value="1">V1</option>
                                    <option value="2">V2</option>
                                    <option value="3">V3</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label class="col-md-4 control-label" style="text-align: right;">项目</label>
                            <div class="col-md-8 col-sm-12" style="text-align: left;">
                                <select class="select2" id="department" name="department" style="width: 100%">
                                    <option class="no-remove" value="">未选择</option>
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
                            <label class="col-md-4 control-label" style="text-align: right;">铺位</label>
                            <div class="col-md-8 col-sm-12" style="text-align: left;">
                                <select class="select2" id="selectStore" style="width: 100%"></select>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label class="col-md-4 control-label" style="text-align: right;">商户</label>
                            <div class="col-md-8 col-sm-12" style="text-align: left;">
                                <select id="selectTenant" class="select2" style="width: 100%"></select>
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
                                                            <li role="menuitem"><a href="/lotus-admin/contracts?items=10">10</a></li>
                                                            <li role="menuitem"><a href="/lotus-admin/contracts?items=20">20</a></li>
                                                            <li role="menuitem"><a href="/lotus-admin/contracts?items=30">30</a></li>
                                                            <li role="menuitem"><a href="/lotus-admin/contracts?items=50">50</a></li>
                                                        </ul>
                                                    </span> 
                                                    行每页
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
                                                                <div class="th-inner">合同编号</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">合同类型</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner" style="width: 140px;">业态</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner" style="width: 270px;">商户</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner" style="width: 120px;">店招</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">签约编号</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner" style="width: 120px;">状态</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner" style="width: 140px;">项目</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner" style="width: 100px;">铺位</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">计租面积</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">核算楼层</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner" style="width: 170px;">合同周期</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">合作方式</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody id="contracts"></tbody>
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
                                                                <li role="menuitem"><a href="/lotus-admin/contracts?items=10">10</a></li>
                                                                <li role="menuitem"><a href="/lotus-admin/contracts?items=20">20</a></li>
                                                                <li role="menuitem"><a href="/lotus-admin/contracts?items=30">30</a></li>
                                                                <li role="menuitem"><a href="/lotus-admin/contracts?items=50">50</a></li>
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

<?php include 'component/investment-contract-request-modify-create.php'; ?>
<?php include 'component/investment-contract-request-renew-termination-create.php'; ?>

<?php include 'footer.php'; ?>