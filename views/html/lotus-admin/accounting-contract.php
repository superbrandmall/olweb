<?php
if(isset($_SESSION['lotus_admin_name']) && $_SESSION['lotus_admin_name'] == '马俊') {
    $scripts = $scripts .PHP_EOL. '        <script type="text/javascript" src="/views/assets/base/js/lotus-admin/accounting-contract-admin.js?t='.date("Y-m-d").'"></script>'.PHP_EOL; 
} else {
    $scripts = $scripts .PHP_EOL. '        <script type="text/javascript" src="/views/assets/base/js/lotus-admin/encrypted/accounting-contract.js?t='.date("Y-m-d").'"></script>'.PHP_EOL; 
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
    <section class="sub-header" style="height: 260px;">
        <h4>
            账务 - 合同
        </h4>
        <div class="box-header" style="background-color: #ecf0f5; height: 50px;">
            <div class="pull-left">
                <ol class="breadcrumb" style="margin-bottom: 0; padding-left: 0;">
                    <li><a href="/lotus-admin/accounting-voucher?items=20">会计凭证</a></li>
                    <li><a href="/lotus-admin/accounting-tenant?items=20">商户</a></li>
                    <li class="active"><a href="javascript: void(0);">合同</a></li>
                </ol>
            </div>
        </div>
        <div class="box-header">
            <div class="box-body">
                <div class="col-md-12">
                    <div class="col-md-4">
                        <div class="form-group">
                            <label for="accountingContractDepartment" class="col-md-4 control-label" style="text-align: right;">项目</label>
                            <div class="col-md-8 col-sm-12" style="text-align: left;">
                                <select class="select2 mallCode" id="accountingContractDepartment" name="accountingContractDepartment" style="width: 100%"></select>
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
                            <label for="companyCode" class="col-md-4 control-label" style="text-align: right;">签约编号</label>
                            <div class="col-md-8 col-sm-12" style="text-align: left;">
                                <input class="form-control" id="companyCode" name="companyCode" type="text" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-12">
                    <div class="col-md-4">
                        <div class="form-group">
                            <label for="companyCode" class="col-md-4 control-label" style="text-align: right;">商户</label>
                            <div class="col-md-8 col-sm-12" style="text-align: left;">
                                <input class="form-control" id="companyCode" name="companyCode" type="text" />
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label for="companyCode" class="col-md-4 control-label" style="text-align: right;">品牌</label>
                            <div class="col-md-8 col-sm-12" style="text-align: left;">
                                <input class="form-control" id="companyCode" name="companyCode" type="text" />
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

    <section class="content" style="margin-top: 310px;">
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
                                                <span id="selected"></span>
                                                <span class="pagination-info"></span>
                                                <span class="page-list">
                                                    <span class="btn-group dropdown">
                                                        <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
                                                            <span class="page-size">20</span>
                                                            <span class="caret"></span>
                                                        </button>
                                                        <ul class="dropdown-menu" role="menu">
                                                            <li role="menuitem"><a href="/lotus-admin/accounting-contract?items=10">10</a></li>
                                                            <li role="menuitem"><a href="/lotus-admin/accounting-contract?items=20">20</a></li>
                                                            <li role="menuitem"><a href="/lotus-admin/accounting-contract?items=30">30</a></li>
                                                            <li role="menuitem"><a href="/lotus-admin/accounting-contract?items=50">50</a></li>
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
                                                            <th style="z-index: 1;">
                                                                <div class="th-inner" style="background: #fff;"><input type="checkbox" id="all" value=""></div>
                                                                <div class="fht-cell" style="background: #fff; border-right: solid 1px #ddd; border-bottom: solid 1px #ddd;"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner" style="width: 250px;">合同</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner" style="width: 300px;">商户</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner" style="width: 200px;">项目</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">铺位</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">签约编号</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">合同状态</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner" style="width: 80px;">计租面积</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">公司代码</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">租金类型</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner" style="width: 160px;">租赁期限</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">业务范围</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner" style="width: 150px;">合同类型</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner" style="width: 100px;">商业类型</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner" style="width : 100px;">固定租金</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">固定租金日坪效</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner" style="width: 100px;">物业管理费</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner" style="width: 80px;">审图费</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">保底租金日坪效</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner" style="width: 100px;">租赁押金</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">水电押金</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner" style="width: 100px;">年商场服务费</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">施工保证金</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">租金税率</div>
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
                                                    <tbody id="contract"></tbody>
                                                </table>
                                            </div>
                                        </div>
                                        <div class="fixed-table-pagination" style="clear: both;">
                                            <div class="pull-left pagination-detail">
                                                <span id="selected"></span>
                                                <span class="pagination-info"></span>
                                                <span class="page-list">
                                                    <span class="btn-group dropdown">
                                                        <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
                                                            <span class="page-size">20</span>
                                                            <span class="caret"></span>
                                                        </button>
                                                        <ul class="dropdown-menu" role="menu">
                                                            <li role="menuitem"><a href="/lotus-admin/accounting-contract?items=10">10</a></li>
                                                            <li role="menuitem"><a href="/lotus-admin/accounting-contract?items=20">20</a></li>
                                                            <li role="menuitem"><a href="/lotus-admin/accounting-contract?items=30">30</a></li>
                                                            <li role="menuitem"><a href="/lotus-admin/accounting-contract?items=50">50</a></li>
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