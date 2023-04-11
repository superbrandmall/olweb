<?php
if(isset($_SESSION['lotus_admin_name']) && $_SESSION['lotus_admin_name'] == '马俊') {
    $scripts = $scripts .PHP_EOL. '        <script type="text/javascript" src="/views/assets/base/js/lotus-admin/make-request-admin.js?t='.date("Y-m-d").'"></script>'.PHP_EOL
    . '        <script type="text/javascript" src="/views/assets/plugins/timepicker/bootstrap-timepicker.js"></script>'.PHP_EOL;            
} else {
    $scripts = $scripts .PHP_EOL. '        <script type="text/javascript" src="/views/assets/base/js/lotus-admin/encrypted/make-request.js?t='.date("Y-m-d").'"></script>'.PHP_EOL
    . '        <script type="text/javascript" src="/views/assets/plugins/timepicker/bootstrap-timepicker.js"></script>'.PHP_EOL;            
}

?>
<link href="/views/assets/plugins/timepicker/bootstrap-timepicker.css" rel="stylesheet" type="text/css" media="all" />

<?php include 'sidebar.php'; ?>

<div class="content-wrapper make-request">
    <form id="create-form" class="form-horizontal" role="form" enctype="multipart/form-data">
        <section class="sub-header" style="height: 90px;">
            <div class="pull-left">
                <a href="/lotus-admin/requests" class="btn btn-link "><i class="fa fa-angle-left"></i> 返回列表</a>
            </div>
            <h4>
                新签租赁合同申请单
            </h4>
            <div class="pull-right">
                <a class="btn btn-link text-left" href="javascript:void(0);" onclick="javascript: confirmCancel('<i class=\'fa fa-question-circle\'></i> 确定要取消吗?','requests');">取消</a>
                <button type="button" class="btn btn-info btn-sm" id="saveDraft"><i class="fa fa-save icon-white"></i> <span class="hidden-xs">保存草稿</span></button>
                <button type="button" class="btn btn-success btn-sm" id="submitForm"><i class="fa fa-check icon-white"></i> <span class="hidden-xs">提交审核</span></button>
            </div>
            <div class="box-header" id="navbarTop">
                <ul class="breadcrumb nav" style="margin-bottom: 0; padding-left: 0;">
                    <li><a href="#investmentContractModel">基本信息</a></li>
                    <li><a href="#investmentContractEnteryterm">进场条款</a></li>
                    <li><a href="#investmentContractAccounttermFixed">固定租金</a></li>
                    <li><a href="#investmentContractAccounttermCommission">提成租金</a></li>
                    <li><a href="#investmentContractAccounttermPropertyMgmt">物业管理费</a></li>
                    <li><a href="#investmentContractAccounttermPromotion">推广费</a></li>
                    <li><a href="#investmentContractDepositterm">预存款条款</a></li>
                    <li><a href="#investmentContractCertificates">合同附件</a></li>
                    <li><a href="#textareapanel">说明</a></li>
                    <li><a href="#investmentContractPriorTerms">原租户合同</a></li>
                    <li><a href="#investmentContractMallSummary">项目情况汇总</a></li>
                    <li><a href="#investmentContractProperteisterm">商圈租金参考</a></li>
                    <li><a href="#approvalProcess">审批流程</a></li>
                </ul>
            </div>
        </section>

        <section class="content" style="margin-top: 140px;">
            <div id="webui">
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
                        include 'make-request/investmentContractCertificates.php';
                        include 'make-request/textareapanel.php';
                        include 'make-request/investmentContractPriorTerms.php';
                        include 'make-request/investmentContractMallSummary.php';
                        include 'make-request/investmentContractProperteisterm.php';
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

<?php include 'component/investment-contract-accountterm-account.php'; ?>
<?php include 'component/investment-contract-budgetterm-budget.php'; ?>
<?php include 'footer.php'; ?>