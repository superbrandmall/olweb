<?php
if(isset($_SESSION['lotus_admin_name']) && $_SESSION['lotus_admin_name'] == '马俊') {
    $scripts = $scripts .PHP_EOL. '        <script type="text/javascript" src="/views/assets/base/js/lotus-admin/requests-admin.js"></script>'.PHP_EOL;
} else {
    $scripts = $scripts .PHP_EOL. '        <script type="text/javascript" src="/views/assets/base/js/lotus-admin/encrypted/requests.js"></script>'.PHP_EOL;
}
?>
<?php $_SESSION['record_url'] = 'http://'.$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI']; ?>
<?php include 'sidebar.php'; ?>

<div class="content-wrapper">
    <section class="sub-header" style="height: 250px;">
        <div class="left-link">
            <a class="btn btn-link text-left" id="openDraft" href="javascript:void(0);">
                <i class="fa fa-inbox"></i><span>草稿箱<span id="draftCount"></span></span>
            </a>
        </div>
        <h4>
            租赁合同申请单
        </h4>
        <?php include 'component/investment-contract-request-create-dropdown.php'; ?>
        <div class="box-header">
            <div class="box-body">
                <div class="col-md-12">
                    <div class="col-md-4">
                        <div class="form-group">
                            <label class="col-md-4 control-label" style="text-align: right;">状态</label>
                            <div class="col-md-8 col-sm-12" style="text-align: left;">
                                <select class="select2" id="formStatus" style="width: 100%">
                                    <option value="" selected>全部</option>
                                    <option value="1">保存</option>
                                    <option value="2">提交</option>
                                    <option value="4">未用印合同上传</option>
                                    <option value="5">租户用印合同上传</option>
                                    <option value="6">双方用印合同上传</option>
                                    <option value="9">已完成</option>
                                    <option value="3">驳回</option>
                                    <option value="0">已终止</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label class="col-md-4 control-label" style="text-align: right;">项目</label>
                            <div class="col-md-8 col-sm-12" style="text-align: left;">
                                <select class="select2 mallCode" id="department" name="department" style="width: 100%"></select>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label class="col-md-4 control-label" style="text-align: right;">签约编号</label>
                            <div class="col-md-8 col-sm-12" style="text-align: left;">
                                <input class="form-control" id="contractNo" type="text" />
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label class="col-md-4 control-label" style="text-align: right;">店招</label>
                            <div class="col-md-8 col-sm-12" style="text-align: left;">
                                <input class="form-control" id="contractName" type="text" />
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label class="col-md-4 control-label" style="text-align: right;">商户</label>
                            <div class="col-md-8 col-sm-12" style="text-align: left;">
                                <select class="select2" id="selectTenant" style="width: 100%"></select>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label class="col-md-4 control-label" style="text-align: right;">表单类型</label>
                            <div class="col-md-8 col-sm-12" style="text-align: left;">
                                <select class="select2" id="formType" style="width: 100%"></select>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label class="col-md-4 control-label" style="text-align: right;">单号</label>
                            <div class="col-md-8 col-sm-12" style="text-align: left;">
                                <input class="form-control" id="bizId" type="text" />
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
                            <label class="col-md-4 control-label" style="text-align: right;">业态</label>
                            <div class="col-md-8 col-sm-12" style="text-align: left;">
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
                            <div class="col-md-8 col-sm-12" style="text-align: left; display: none;">
                                <select class="select2" id="modality_2" name="modality_2" style="width: 100%" data-placeholder="未选择二级业态" data-allow-clear="true">
                                    <option value="">未选择二级业态</option>
                                </select>
                            </div>
                            <div class="col-md-8 col-sm-12" style="text-align: left; display: none;">
                                <select class="select2" id="modality_3" name="modality_3" style="width: 100%" data-placeholder="未选择三级业态" data-allow-clear="true">
                                    <option value="">未选择三级业态</option>
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
                                    <!--<div class="alert alert-warning alert-dismissable">
                                        <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
                                        <b>租赁合同【申请单】当前仅限【上海区】使用，其他区请勿创建！</b>
                                    </div>-->
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
                                                            <li role="menuitem"><a href="/lotus-admin/requests?items=10">10</a></li>
                                                            <li role="menuitem"><a href="/lotus-admin/requests?items=20">20</a></li>
                                                            <li role="menuitem"><a href="/lotus-admin/requests?items=30">30</a></li>
                                                            <li role="menuitem"><a href="/lotus-admin/requests?items=50">50</a></li>
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
                                                <table class="table table-striped snipe-table table-responsive" style="margin-top: 0; text-align: left;">
                                                    <thead id="assetsListingTable-sticky-header">
                                                        <tr>
                                                            <th style="z-index: 1;">
                                                                <div class="th-inner" style="background: #fff;">单号</div>
                                                                <div class="fht-cell" style="background: #fff; border-right: solid 1px #ddd; border-bottom: solid 1px #ddd;"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner" style="width: 100px;">来源单据</div>
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
                                                                <div class="th-inner">表单类型</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner" style="width: 180px;">项目</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner" style="width: 140px;">业态</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner" style="width: 150px;">店招</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner" style="width: 270px;">商户</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner" style="width: 200px;">铺位</div>
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
                                                                <div class="th-inner">招商人员</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner" style="width: 90px;">签约日期</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner" style="width: 175px;">合同周期</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner" style="width: 100px;">合作方式</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner" style="width: 190px;">创建信息</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner" style="width: 190px;">最后修改信息</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody id="requests"></tbody>
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
                                                                <li role="menuitem"><a href="/lotus-admin/requests?items=10">10</a></li>
                                                                <li role="menuitem"><a href="/lotus-admin/requests?items=20">20</a></li>
                                                                <li role="menuitem"><a href="/lotus-admin/requests?items=30">30</a></li>
                                                                <li role="menuitem"><a href="/lotus-admin/requests?items=50">50</a></li>
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

<?php include 'component/investment-contract-request-todo.php'; ?>
<?php include 'component/investment-contract-request-modify-create.php'; ?>
<?php include 'component/investment-contract-request-renew-termination-create.php'; ?>
<?php include 'component/investment-contract-request-create.php'; ?>

<?php include 'footer.php'; ?>