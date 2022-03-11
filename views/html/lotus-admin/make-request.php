<?php
if(isset($_SESSION['lotus_admin_name']) && $_SESSION['lotus_admin_name'] == '马俊') {
    $scripts = $scripts .PHP_EOL. '        <script type="text/javascript" src="/views/assets/base/js/lotus-admin/make-request-admin.js"></script>'.PHP_EOL
    . '        <script type="text/javascript" src="/views/assets/plugins/datepicker/bootstrap-datepicker.zh-CN.min.js"></script>'.PHP_EOL
    . '        <script type="text/javascript" src="/views/assets/plugins/datepicker/bootstrap-datepicker.min.js"></script>'.PHP_EOL
    . '        <script type="text/javascript" src="/views/assets/plugins/timepicker/bootstrap-timepicker.js"></script>'.PHP_EOL;
} else {
    $scripts = $scripts .PHP_EOL. '        <script type="text/javascript" src="/views/assets/base/js/lotus-admin/encrypted/make-request.js"></script>'.PHP_EOL
    . '        <script type="text/javascript" src="/views/assets/plugins/datepicker/bootstrap-datepicker.zh-CN.min.js"></script>'.PHP_EOL
    . '        <script type="text/javascript" src="/views/assets/plugins/datepicker/bootstrap-datepicker.min.js"></script>'.PHP_EOL
    . '        <script type="text/javascript" src="/views/assets/plugins/timepicker/bootstrap-timepicker.js"></script>'.PHP_EOL;
}

?>
<link href="/views/assets/plugins/datepicker/bootstrap-datepicker.css" rel="stylesheet" type="text/css" media="all" />
<link href="/views/assets/plugins/timepicker/bootstrap-timepicker.css" rel="stylesheet" type="text/css" media="all" />

<?php include 'sidebar.php'; ?>

<div class="content-wrapper make-request">
    <form id="create-form" class="form-horizontal" role="form" enctype="multipart/form-data">
        <section class="sub-header" style="height: 90px;">
            <h4>
                新建新租赁合同申请单
            </h4>
            <div class="pull-right">
                <a class="btn btn-link text-left" href="javascript:void(0);" onclick="javascript: confirmCancel('<i class=\'fa fa-question-circle\'></i> 确定要取消吗?','requests');">取消</a>
                <button type="button" class="btn btn-info btn-sm" id="saveDraft"><i class="fa fa-save icon-white"></i> <span class="hidden-xs">保存草稿</span></button>
                <button type="button" class="btn btn-success btn-sm"><i class="fa fa-check icon-white"></i> <span class="hidden-xs">提交审核</span></button>
            </div>
            <div class="box-header">
                <ol class="breadcrumb" style="margin-bottom: 0; padding-left: 0;">
                    <li><a href="javascript: void(0);">基本信息</a></li>
                    <li id="tab_investmentContractEnteryterm"><a href="javascript: void(0);" onclick="javascript: jumpTo('investmentContractEnteryterm')">进场条款</a></li>
                    <li id="tab_investmentContractAccounttermFixed"><a href="javascript: void(0);" onclick="javascript: jumpTo('investmentContractAccounttermFixed')">固定租金</a></li>
                    <li id="tab_investmentContractAccounttermCommission"><a href="javascript: void(0);" onclick="javascript: jumpTo('investmentContractAccounttermCommission')">提成租金</a></li>
                    <li id="tab_investmentContractAccounttermPropertyMgmt"><a href="javascript: void(0);" onclick="javascript: jumpTo('investmentContractAccounttermPropertyMgmt')">物业管理费</a></li>
                    <li id="tab_investmentContractAccounttermPromotion"><a href="javascript: void(0);" onclick="javascript: jumpTo('investmentContractAccounttermPromotion')">推广费</a></li>
                    <li id="tab_investmentContractDepositterm"><a href="javascript: void(0);" onclick="javascript: jumpTo('investmentContractDepositterm')">预存款条款</a></li>
                    <li id="tab_investmentContractProperteisterm"><a href="javascript: void(0);" onclick="javascript: jumpTo('investmentContractProperteisterm')">其他商务条件</a></li>
                    <li id="tab_textareapanel"><a href="javascript: void(0);" onclick="javascript: jumpTo('textareapanel')">说明</a></li>
                    <li id="tab_approvalProcess"><a href="javascript: void(0);" onclick="javascript: jumpTo('approvalProcess')">审批流程</a></li>
                </ol>
            </div>
        </section>

        <section class="content" style="margin-top: 140px;">
            <div id="webui">
                <div class="row">
                    <div class="col-md-12">
                        <div class="callout callout-info" style="display: none;">
                            新建合同成功!
                        </div>
                        <div class="callout callout-danger" style="display: none;">
                            新建合同失败!
                        </div>
                        <div class="callout callout-warning" style="display: none;">
                            该合同已存在!
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <?php 
                        include 'make-request/investmentContractModel.php'; //合同内容
                        include 'make-request/investmentContractModelBasicinfo.php'; //基本信息
                        include 'make-request/investmentContractEnteryterm.php';
                        include 'make-request/investmentContractAccounttermFixed.php'; //固定租金
                        include 'make-request/investmentContractAccounttermCommission.php'; //提成租金
                        include 'make-request/investmentContractAccounttermCompare.php'; //取高明细
                        include 'make-request/investmentContractAccounttermPropertyMgmt.php'; //物业管理费
                        include 'make-request/investmentContractAccounttermPromotion.php'; //推广费
                        include 'make-request/investmentContractDepositterm.php';
                        include 'make-request/investmentContractProperteisterm.php';
                        include 'make-request/textareapanel.php';
                        include 'make-request/approvalProcess.php';
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