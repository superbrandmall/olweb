<?php
if(explode('?id=', $_SERVER['REQUEST_URI'])[1] != null) {
    $id = explode('?id=', $_SERVER['REQUEST_URI'])[1];
    if (strpos($id, '&s=') !== false) {
        $id = explode('&s=', $id)[0];
    }
}

if(isset($_SESSION['lotus_admin_name']) && $_SESSION['lotus_admin_name'] == '马俊') {
    $scripts = $scripts .PHP_EOL. '        <script type="text/javascript" src="/views/assets/base/js/lotus-admin/terminate-request-admin.js?t='.date("Y-m-d").'"></script>'.PHP_EOL
    . '        <script type="text/javascript" src="/views/assets/plugins/timepicker/bootstrap-timepicker.js"></script>'.PHP_EOL;
} else {
    $scripts = $scripts .PHP_EOL. '        <script type="text/javascript" src="/views/assets/base/js/lotus-admin/encrypted/terminate-request.js?t='.date("Y-m-d").'"></script>'.PHP_EOL
    . '        <script type="text/javascript" src="/views/assets/plugins/timepicker/bootstrap-timepicker.js"></script>'.PHP_EOL;
}

?>
<link href="/views/assets/plugins/timepicker/bootstrap-timepicker.css" rel="stylesheet" type="text/css" media="all" />

<?php include 'sidebar.php'; ?>

<div class="content-wrapper terminate-request">
    <form id="create-form" class="form-horizontal" role="form" enctype="multipart/form-data">
        <section class="sub-header" style="height: 90px;">
            <h4>
                终止租赁合同申请单: <span id="requestName" style="font-size: 18px;"></span>
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
                    <li><a href="#investmentContractProperteisterm">其它终止条件</a></li>
                    <li><a href="#investmentContractCertificates">合同附件</a></li>
                    <li><a href="#textareapanel">说明</a></li>
                    <li><a href="#investmentContractPriorTerms">原租户合同</a></li>
                    <li><a href="#approvalProcess">审批流程</a></li>
                </ul>
            </nav>
        </section>

        <section class="content" style="margin-top: 140px;">
            <div id="webui">
                <div class="row">
                    <div class="col-md-12">
                        <?php 
                        include 'terminate/investmentContractModel.php'; //合同内容
                        include 'terminate/investmentContractModelBasicinfo.php'; //基本信息
                        include 'terminate/investmentContractEnteryterm.php';
                        include 'terminate/investmentContractAccounttermFixed.php'; //固定租金
                        include 'terminate/investmentContractAccounttermCommission.php'; //提成租金
                        include 'terminate/investmentContractAccounttermCompare.php'; //取高明细
                        include 'terminate/investmentContractAccounttermPropertyMgmt.php'; //物业管理费
                        include 'terminate/investmentContractAccounttermPromotion.php'; //推广费
                        include 'terminate/investmentContractDepositterm.php';
                        include 'terminate/investmentContractProperteisterm.php';
                        include 'terminate/investmentContractCertificates.php';
                        include 'terminate/textareapanel.php';
                        include 'terminate/investmentContractPriorTerms.php';
                        include 'terminate/approvalProcessMain.php'; //全国审批流程
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
<?php include 'footer.php'; ?>