<?php
if(explode('?id=', $_SERVER['REQUEST_URI'])[1] != null) {
    $id = explode('?id=', $_SERVER['REQUEST_URI'])[1];
    if (strpos($id, '&messid=') !== false) {
        $id = explode('&messid=', $id)[0];
    }
}

if(isset($_SESSION['lotus_admin_name']) && $_SESSION['lotus_admin_name'] == '马俊') {
    $scripts = $scripts .PHP_EOL. '        <script type="text/javascript" src="/views/assets/base/js/lotus-admin/tenant-history-admin.js?t='.date("Y-m-d").'"></script>'.PHP_EOL;
} else {
    $scripts = $scripts .PHP_EOL. '        <script type="text/javascript" src="/views/assets/base/js/lotus-admin/encrypted/tenant-history.js?t='.date("Y-m-d").'"></script>'.PHP_EOL;
}
?>

<?php include 'sidebar.php'; ?>

<div class="content-wrapper tenant-detail">
    <form id="create-form" class="form-horizontal" role="form" enctype="multipart/form-data">
        <section class="sub-header">
            <div class="pull-left">
                <a href="/lotus-admin/tenants" class="btn btn-link"><i class="fa fa-angle-left"></i> 返回列表</a>
            </div>
            <h4>
                <b id="tenantName2"></b>
            </h4>
            <div class="box-header" style="background-color: #ecf0f5; margin-top: -6px; height: 50px;">
                <div class="pull-left">
                    <ol id="tenantNav" class="breadcrumb" style="margin-bottom: 0; padding-left: 0;">
                        <li><a href="/lotus-admin/tenant-detail?id=<?= $id; ?>">基本资料</a></li>
                        <li class="active"><a href="javascript: void(0);">商户历史</a></li>
                    </ol>
                </div>
                <div class="pull-right">
                    <p id="tenantUpdated" class="text-gray" style="font-size: 13px; margin: 10px 0;"></p>
                </div>
            </div>
        </section>

        <section class="content" style="margin-top: 120px;">
            <div id="webui">
                <div class="row">
                    <div class="col-md-12">
                        <div class="box box-default" id="tenantHistory">    
                            <div class="box-header with-border">
                                <h3 class="box-title">商户历史</h3>
                                <div class="box-tools">
                                    <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="box-body">
                                <div class="col-md-12">
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label class="col-md-4 control-label">商户</label>
                                            <div class="col-md-8 col-sm-12" id="tenantName" style="padding-top: 7px;"></div>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label class="col-md-4 control-label">Mess Id Os</label>
                                            <div class="col-md-8 col-sm-12" id="tenantMessIdOs" style="padding-top: 7px;"></div>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label class="col-md-4 control-label">简称</label>
                                            <div class="col-md-8 col-sm-12" id="tenantShortName" style="padding-top: 7px;"></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label class="col-md-4 control-label">纳税识别号</label>
                                            <div class="col-md-8 col-sm-12" id="tenantUSCC" style="padding-top: 7px;"></div>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label class="col-md-4 control-label">登记地址</label>
                                            <div class="col-md-8 col-sm-12" id="tenantRegAddress" style="padding-top: 7px;"></div>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label class="col-md-4 control-label">登记电话</label>
                                            <div class="col-md-8 col-sm-12" id="tenantPhone" style="padding-top: 7px;"></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label class="col-md-4 control-label">邮政编码</label>
                                            <div class="col-md-8 col-sm-12" id="tenantPostCode" style="padding-top: 7px;"></div>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label class="col-md-4 control-label">城市代码</label>
                                            <div class="col-md-8 col-sm-12" id="tenantCityCode" style="padding-top: 7px;"></div>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label class="col-md-4 control-label">账户组</label>
                                            <div class="col-md-8 col-sm-12" id="tenantAccountGroup" style="padding-top: 7px;"></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label class="col-md-4 control-label">支付条款</label>
                                            <div class="col-md-8 col-sm-12" id="tenantPaymentTerm" style="padding-top: 7px;"></div>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label class="col-md-4 control-label">项目</label>
                                            <div class="col-md-8 col-sm-12" id="tenantDepartment" style="padding-top: 7px;"></div>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label class="col-md-4 control-label">虚拟账户</label>
                                            <div class="col-md-8 col-sm-12" id="tenantBankDummyAccount" style="padding-top: 7px;"></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="box-body">
                                        <div class="row">
                                            <div class="bootstrap-table">
                                                <div class="fixed-table-container">
                                                    <div class="fixed-table-body">
                                                        <table id="bankList" class="table table-striped snipe-table table-responsive" style="font-size: 10px;">
                                                            <thead id="assetsListingTable-sticky-header">
                                                                <tr>
                                                                    <th>
                                                                        <div class="th-inner">行</div>
                                                                        <div class="fht-cell"></div>
                                                                    </th>
                                                                    <th>
                                                                        <div class="th-inner">银行名称</div>
                                                                        <div class="fht-cell"></div>
                                                                    </th>
                                                                    <th>
                                                                        <div class="th-inner">银行账号</div>
                                                                        <div class="fht-cell"></div>
                                                                    </th>
                                                                    <th>
                                                                        <div class="th-inner" style="width: 50px;">类型</div>
                                                                        <div class="fht-cell"></div>
                                                                    </th>
                                                                    <th>
                                                                        <div class="th-inner">商户编号</div>
                                                                        <div class="fht-cell"></div>
                                                                    </th>
                                                                    <th>
                                                                        <div class="th-inner">银行组</div>
                                                                        <div class="fht-cell"></div>
                                                                    </th>
                                                                    <th>
                                                                        <div class="th-inner">省市</div>
                                                                        <div class="fht-cell"></div>
                                                                    </th>
                                                                    <th>
                                                                        <div class="th-inner">联行号代码</div>
                                                                        <div class="fht-cell"></div>
                                                                    </th>
                                                                    <th>
                                                                        <div class="th-inner">地区代码</div>
                                                                        <div class="fht-cell"></div>
                                                                    </th>
                                                                    <th>
                                                                        <div class="th-inner">国家代码</div>
                                                                        <div class="fht-cell"></div>
                                                                    </th>
                                                                </tr>
                                                            </thead>
                                                            <tbody></tbody>
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

                    <div class="slideout-menu">
                        <a href="#" class="slideout-menu-toggle pull-right">×</a>
                        <h3>
                            注意事项
                        </h3>
                        <p><span class="btn-box-tool-lg">*</span> Silence is gold</p>
                    </div>
                </div>
            </div>
        </section>
    </form>
</div>

<?php include 'footer.php'; ?>