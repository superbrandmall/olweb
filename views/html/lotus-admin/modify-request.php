<?php
if(explode('?id=', $_SERVER['REQUEST_URI'])[1] != null) {
    $id = explode('?id=', $_SERVER['REQUEST_URI'])[1];
    if (strpos($id, '&s=') !== false) {
        $id = explode('&s=', $id)[0];
    }
}

if(isset($_SESSION['lotus_admin_name']) && $_SESSION['lotus_admin_name'] == '马俊') {
    $scripts = $scripts .PHP_EOL. '        <script type="text/javascript" src="/views/assets/base/js/lotus-admin/modify-request-admin.js?t='.date("Y-m-d").'"></script>'.PHP_EOL
    . '        <script type="text/javascript" src="/views/assets/plugins/timepicker/bootstrap-timepicker.js"></script>'.PHP_EOL
    . '        <script type="text/javascript" src="/views/assets/plugins/html2canvas.min.js"></script>'.PHP_EOL;
} else {
    $scripts = $scripts .PHP_EOL. '        <script type="text/javascript" src="/views/assets/base/js/lotus-admin/encrypted/modify-request.js?t='.date("Y-m-d").'"></script>'.PHP_EOL
    . '        <script type="text/javascript" src="/views/assets/plugins/timepicker/bootstrap-timepicker.js"></script>'.PHP_EOL
    . '        <script type="text/javascript" src="/views/assets/plugins/html2canvas.min.js"></script>'.PHP_EOL;
}

?>
<link href="/views/assets/plugins/timepicker/bootstrap-timepicker.css" rel="stylesheet" type="text/css" media="all" />

<?php include 'sidebar.php'; ?>

<div class="content-wrapper modify-request">
    <form id="create-form" class="form-horizontal" role="form" enctype="multipart/form-data">
        <section class="sub-header" style="height: 90px;">
            <h4>
                变更租赁合同申请单: <span id="requestName" style="font-size: 18px;"></span>
            </h4>
            <div class="pull-right">
                <a class="btn btn-link text-left" href="javascript:void(0);" onclick="javascript: confirmCancel('<i class=\'fa fa-question-circle\'></i> 确定要取消吗?','requests');">取消</a>
                <button type="button" class="btn btn-info btn-sm" id="saveDraft"><i class="fa fa-save icon-white"></i> <span class="hidden-xs">保存草稿</span></button>
                <button type="button" class="btn btn-success btn-sm" id="submitForm"><i class="fa fa-check icon-white"></i> <span class="hidden-xs">提交审核</span></button>
            </div>
            <nav class="box-header" id="navbarTop" style="height: 53px;">
                <ul class="breadcrumb nav" style="margin-bottom: 0; padding-left: 0;">
                    <li><a href="#investmentContractModel">基本信息</a></li>
                    <li><a href="#investmentContractEnteryterm">进场条款</a></li>
                    <li><a href="#investmentContractAccounttermFixed">固定租金</a></li>
                    <li><a href="#investmentContractAccounttermCommission">提成租金</a></li>
                    <li><a href="#investmentContractAccounttermPropertyMgmt">物业管理费</a></li>
                    <li><a href="#investmentContractAccounttermPromotion">推广费</a></li>
                    <li><a href="#investmentContractDepositterm">预存款条款</a></li>
                    <li><a href="#investmentContractProperteisterm">其它变更条件</a></li>
                    <li><a href="#investmentContractCertificates">合同附件</a></li>
                    <li><a href="#textareapanel">说明</a></li>
                    <li><a href="#approvalProcess">审批流程</a></li>
                </ul>
            </nav>
        </section>

        <section class="content" style="margin-top: 140px;">
            <div id="webui">
                <div class="row">
                    <div class="col-md-12">
                        <?php 
                        include 'modify/investmentContractModel.php'; //合同内容
                        include 'modify/investmentContractModelBasicinfo.php'; //基本信息
                        include 'modify/investmentContractEnteryterm.php';
                        include 'modify/investmentContractAccounttermFixed.php'; //固定租金
                        include 'modify/investmentContractAccounttermCommission.php'; //提成租金
                        include 'modify/investmentContractAccounttermCompare.php'; //取高明细
                        include 'modify/investmentContractAccounttermPropertyMgmt.php'; //物业管理费
                        include 'modify/investmentContractAccounttermPromotion.php'; //推广费
                        include 'modify/investmentContractDepositterm.php';
                        include 'modify/investmentContractProperteisterm.php';
                        include 'modify/investmentContractCertificates.php';
                        include 'modify/textareapanel.php';
                        include 'modify/approvalProcess.php';
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
                                        <tr style="text-align: left;">
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