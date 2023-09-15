<?php
if(isset($_SESSION['lotus_admin_name']) && $_SESSION['lotus_admin_name'] == '马俊') {
    $scripts = $scripts .PHP_EOL. '        <script type="text/javascript" src="/views/assets/base/js/lotus-admin/stores-admin.js?t='.date("Y-m-d").'"></script>'.PHP_EOL;
} else {
    $scripts = $scripts .PHP_EOL. '        <script type="text/javascript" src="/views/assets/base/js/lotus-admin/encrypted/stores.js?t='.date("Y-m-d").'"></script>'.PHP_EOL;
}
?>
<?php $_SESSION['record_url'] = 'http://'.$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI']; ?>
<?php include 'sidebar.php'; ?>

<div class="content-wrapper">
    <section class="sub-header" style="height: 250px;">
        <h4>
            物业资源 - 铺位
        </h4>
        <div class="box-header" style="background-color: #ecf0f5; height: 50px;">
            <div class="pull-left">
                <ol class="breadcrumb" style="margin-bottom: 0; padding-left: 0;">
                    <li><a href="/lotus-admin/malls">项目</a></li>
                    <li class="active"><a href="javascript: void(0);">铺位</a></li>
                </ol>
            </div>
        </div>
        <div class="pull-right">
            <a href="/lotus-admin/create-store" class="btn btn-primary btn-sm">
                <i class="fa fa-plus icon-white"></i> 创建
            </a>
        </div>
        <div class="box-header">
            <div class="box-body">
                <div class="col-md-12">
                    <div class="col-md-4">
                        <div class="form-group">
                            <label class="col-md-4 control-label" style="text-align: right;">状态</label>
                            <div class="col-md-8 col-sm-12" style="text-align: left;">
                                <select class="select2" id="state" style="width: 100%">
                                    <option value="" selected>全部</option>
                                    <option value="1">使用中</option>
                                    <option value="0">已删除</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label class="col-md-4 control-label" style="text-align: right;">铺位</label>
                            <div class="col-md-8 col-sm-12" style="text-align: left;">
                                <input class="form-control" id="unit" placeholder="代码/名称" type="text"  />
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label class="col-md-4 control-label" style="text-align: right;">租用状态</label>
                            <div class="col-md-8 col-sm-12" style="text-align: left;">
                                <select class="select2" id="shopStatus" style="width: 100%">
                                    <option value="">未选择</option>
                                    <option value="1">空闲</option>
                                    <option value="0">租用</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-12">
                    <div class="col-md-4">
                        <div class="form-group">
                            <label class="col-md-4 control-label" style="text-align: right;">类型</label>
                            <div class="col-md-8 col-sm-12" style="text-align: left;">
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
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label class="col-md-4 control-label" style="text-align: right;">所属项目</label>
                            <div class="col-md-8 col-sm-12" style="text-align: left;">
                                <select class="select2 mallCode" id="mallCode" name="mallCode" style="width: 100%"></select>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label class="col-md-4 control-label" style="text-align: right;">铺位负责人</label>
                            <div class="col-md-8 col-sm-12" style="text-align: left;">
                                <select class="select2 selectUser" id="approveFirst" style="width: 100%">
                                    <option value="">未选择</option>
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
                                                <span class="pagination-info"></span>
                                                <span class="page-list">
                                                    <span class="btn-group dropdown">
                                                        <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
                                                            <span class="page-size">20</span>
                                                            <span class="caret"></span>
                                                        </button>
                                                        <ul class="dropdown-menu" role="menu">
                                                            <li role="menuitem"><a href="/lotus-admin/stores?items=10">10</a></li>
                                                            <li role="menuitem"><a href="/lotus-admin/stores?items=20">20</a></li>
                                                            <li role="menuitem"><a href="/lotus-admin/stores?items=30">30</a></li>
                                                            <li role="menuitem"><a href="/lotus-admin/stores?items=50">50</a></li>
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
                                                                <div class="th-inner" style="width: 200px; background: #fff;">铺位</div>
                                                                <div class="fht-cell" style="background: #fff; border-right: solid 1px #ddd; border-bottom: solid 1px #ddd;"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner" style="width: 55px;">状态</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">租用状态</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner" style="width: 150px;">所属项目</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">所属楼层</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner" style="width: 170px;">有效期</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">租赁面积(㎡)</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner" style="width: 60px;">类型</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">铺位负责人</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner" style="width: 150px;">落位品牌</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner" style="width: 250px;">签约合同</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody id="stores"></tbody>
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
                                                                <li role="menuitem"><a href="/lotus-admin/stores?items=10">10</a></li>
                                                                <li role="menuitem"><a href="/lotus-admin/stores?items=20">20</a></li>
                                                                <li role="menuitem"><a href="/lotus-admin/stores?items=30">30</a></li>
                                                                <li role="menuitem"><a href="/lotus-admin/stores?items=50">50</a></li>
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