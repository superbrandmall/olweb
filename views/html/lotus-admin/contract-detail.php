<?php
if(explode('?id=', $_SERVER['REQUEST_URI'])[1] != null) {
    $id = explode('?id=', $_SERVER['REQUEST_URI'])[1];
}

if(isset($_SESSION['lotus_admin_name']) && $_SESSION['lotus_admin_name'] == '马俊') {
    $scripts = $scripts .PHP_EOL. '        <script type="text/javascript" src="/views/assets/base/js/lotus-admin/contract-detail-admin.js"></script>'.PHP_EOL
    . '        <script type="text/javascript" src="/views/assets/plugins/datepicker/bootstrap-datepicker.zh-CN.min.js"></script>'.PHP_EOL
    . '        <script type="text/javascript" src="/views/assets/plugins/datepicker/bootstrap-datepicker.min.js"></script>'.PHP_EOL
    . '        <script type="text/javascript" src="/views/assets/plugins/timepicker/bootstrap-timepicker.js"></script>'.PHP_EOL;
} else {
    $scripts = $scripts .PHP_EOL. '        <script type="text/javascript" src="/views/assets/base/js/lotus-admin/encrypted/contract-detail.js"></script>'.PHP_EOL
    . '        <script type="text/javascript" src="/views/assets/plugins/datepicker/bootstrap-datepicker.zh-CN.min.js"></script>'.PHP_EOL
    . '        <script type="text/javascript" src="/views/assets/plugins/datepicker/bootstrap-datepicker.min.js"></script>'.PHP_EOL
    . '        <script type="text/javascript" src="/views/assets/plugins/timepicker/bootstrap-timepicker.js"></script>'.PHP_EOL;
}

?>
<link href="/views/assets/plugins/datepicker/bootstrap-datepicker.css" rel="stylesheet" type="text/css" media="all" />
<link href="/views/assets/plugins/timepicker/bootstrap-timepicker.css" rel="stylesheet" type="text/css" media="all" />

<?php include 'sidebar.php'; ?>

<div class="content-wrapper contract-detail">
    <form id="create-form" class="form-horizontal" role="form" enctype="multipart/form-data">
        <section class="sub-header" style="height: 90px;">
            <h4>
                <span class="badge badge-success" id="contractStatus" style="vertical-align: top;"></span> 合同: <b id="contractName"></b> - V<b id="contractVersion"></b>
            </h4>
            <div class="box-header">
                <ol class="breadcrumb" style="margin-bottom: 0; padding-left: 0;">
                    <li><a href="javascript: void(0);" onclick="javascript: jumpTo('investmentContractModel')">合同内容</a></li>
                    <li id="tab_investmentContractAccounttermFixed"><a href="javascript: void(0);" onclick="javascript: jumpTo('investmentContractAccounttermFixed')">固定租金</a></li>
                    <li id="tab_investmentContractAccounttermCommission" style="display: none;"><a href="javascript: void(0);" onclick="javascript: jumpTo('investmentContractAccounttermCommission')">提成租金</a></li>
                    <li id="tab_investmentContractAccounttermPropertyMgmt"><a href="javascript: void(0);" onclick="javascript: jumpTo('investmentContractAccounttermPropertyMgmt')">物业管理费</a></li>
                    <li id="tab_investmentContractAccounttermPromotion"><a href="javascript: void(0);" onclick="javascript: jumpTo('investmentContractAccounttermPromotion')">推广费</a></li>
                    <li id="tab_investmentContractDepositterm"><a href="javascript: void(0);" onclick="javascript: jumpTo('investmentContractDepositterm')">预存款条款</a></li>
                </ol>
            </div>
            <div class="box-header" style="background-color: #ecf0f5; margin-top: -6px;">
                <div class="pull-left">
                    <ol class="breadcrumb" style="margin-bottom: 0; padding-left: 0;">
                        <li><a href="/lotus-admin/contract-summary?id=<?= $id; ?>">合同概要</a></li>
                        <li class="active"><a href="javascript: void(0);">合同内容</a></li>
                    </ol>
                </div>
            </div>
        </section>

        <section class="content" style="margin-top: 179px;">
            <div id="webui">
                <div class="row">
                    <div class="col-md-12">
                        <div class="callout callout-info" style="display: none;">
                            编辑合同成功!
                        </div>
                        <div class="callout callout-danger" style="display: none;">
                            编辑合同失败!
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <?php 
                        include 'contract-detail/investmentContractModel.php'; //合同内容
                        include 'contract-detail/investmentContractAccounttermFixed.php'; //固定租金
                        include 'contract-detail/investmentContractAccounttermCommission.php'; //提成租金
                        include 'contract-detail/investmentContractAccounttermPropertyMgmt.php'; //物业管理费
                        include 'contract-detail/investmentContractAccounttermPromotion.php'; //推广费
                        include 'contract-detail/investmentContractDepositterm.php'; //保证金
                        ?>
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

<div class="modal fade" id="investment-contract-accountterm-account" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content c-square" style="background: #fff;">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="col-md-12">
                    <h4>账款明细</h4>
                    <div class="bootstrap-table">
                        <div class="fixed-table-container">
                            <div class="fixed-table-body">
                                <table class="table table-striped snipe-table table-responsive" style="margin-top: 0">
                                    <thead id="assetsListingTable-sticky-header">
                                        <tr>
                                            <th>
                                                <div class="th-inner">行</div>
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
                                                <div class="th-inner"><span class="btn-box-tool-lg">*</span> 月金额(含税)</div>
                                                <div class="fht-cell"></div>
                                            </th>
                                            <th>
                                                <div class="th-inner"><span class="btn-box-tool-lg">*</span> 月金额(去税)</div>
                                                <div class="fht-cell"></div>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody id="accountTerm"></tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<?php include 'footer.php'; ?>