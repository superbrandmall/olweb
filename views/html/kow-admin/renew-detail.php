<?php
if(explode('?id=', $_SERVER['REQUEST_URI'])[1] != null) {
    $id = explode('?id=', $_SERVER['REQUEST_URI'])[1];
    if (strpos($id, '&s=') !== false) {
        $id = explode('&s=', $id)[0];
    }
}

if(isset($_SESSION['lotus_admin_name']) && $_SESSION['lotus_admin_name'] == '马俊') {
    $scripts = $scripts .PHP_EOL. '        <script type="text/javascript" src="/views/assets/base/js/kow-admin/renew-detail-admin.js?t='.date("Y-m-d").'"></script>'.PHP_EOL
    . '        <script type="text/javascript" src="/views/assets/plugins/timepicker/bootstrap-timepicker.js"></script>'.PHP_EOL
    . '        <script type="text/javascript" src="/views/assets/plugins/html2canvas.min.js"></script>'.PHP_EOL;
} else {
    $scripts = $scripts .PHP_EOL. '        <script type="text/javascript" src="/views/assets/base/js/kow-admin/renew-detail-admin.js?t='.date("Y-m-d").'"></script>'.PHP_EOL
    . '        <script type="text/javascript" src="/views/assets/plugins/timepicker/bootstrap-timepicker.js"></script>'.PHP_EOL
    . '        <script type="text/javascript" src="/views/assets/plugins/html2canvas.min.js"></script>'.PHP_EOL;
}

?>
<link href="/views/assets/plugins/timepicker/bootstrap-timepicker.css" rel="stylesheet" type="text/css" media="all" />

<?php include 'sidebar.php'; ?>

<div class="content-wrapper renew-detail">
    <form id="create-form" class="form-horizontal" role="form" enctype="multipart/form-data">
        <section class="sub-header" style="height: 90px;">
            <h4>
                <span class="badge badge-success" id="formStatus" style="vertical-align: top; font-size: 12px;"></span> 续签租赁合同申请单: <span id="requestName" style="font-size: 18px;"></span>
            </h4>
            <div class="pull-right">
                <a class="btn btn-link text-left" href="javascript:void(0);" onclick="javascript: confirmCancel('<i class=\'fa fa-question-circle\'></i> 确定要取消吗?','requests');">取消</a>
                <button type="button" class="btn btn-info btn-sm" id="saveDraft"><i class="fa fa-save icon-white"></i> <span class="hidden-xs">保存草稿</span></button>
                <button type="button" class="btn btn-success btn-sm" id="submitForm"><i class="fa fa-check icon-white"></i> <span class="hidden-xs">提交审核</span></button>
            </div>
            <div class="box-header" id="navbarTop" style="height: 53px;">
                <ul class="breadcrumb nav" style="margin-bottom: 0; padding-left: 0;">
                    <li><a href="#investmentContractModel">基本信息</a></li>
                    <li><a href="#investmentContractEnteryterm">进场条款</a></li>
                    <li><a href="#investmentContractAccounttermFixed">固定租金</a></li>
                    <li><a href="#investmentContractAccounttermCommission">提成租金</a></li>
                    <li><a href="#investmentContractAccounttermPropertyMgmt">物业管理费</a></li>
                    <li><a href="#investmentContractAccounttermPromotion">推广费</a></li>
                    <li><a href="#investmentContractDepositterm">预存款条款</a></li>
                    <li><a href="#investmentContractProperteisterm">其它续约条件</a></li>
                    <li><a href="#investmentContractCertificates">合同附件</a></li>
                    <li><a href="#textareapanel">说明</a></li>
                    <li><a href="#approvalProcess">审批流程</a></li>
                </ul>
            </div>
            <div class="box-header" style="background-color: #f6f0b2; margin-top: -6px;">
                <div class="pull-left">
                    <ol class="breadcrumb" style="margin-bottom: 0; padding-left: 0;">
                        <li><a href="/kow-admin/renew-summary?id=<?= $id; ?>">单据概要</a></li>
                        <li class="active"><a href="javascript: void(0);">单据内容</a></li>
                    </ol>
                </div>
            </div>
        </section>

        <section class="content" style="margin-top: 179px;">
            <div id="webui">
                <div class="row">
                    <div class="col-md-12">
                        <?php 
                        include 'renew/investmentContractModel.php'; //合同内容
                        include 'renew/investmentContractModelBasicinfo.php'; //基本信息
                        include 'renew/investmentContractEnteryterm.php';
                        include 'renew/investmentContractAccounttermFixed.php'; //固定租金
                        include 'renew/investmentContractAccounttermCommission.php'; //提成租金
                        include 'renew/investmentContractAccounttermCompare.php'; //取高明细
                        include 'renew/investmentContractAccounttermPropertyMgmt.php'; //物业管理费
                        include 'renew/investmentContractAccounttermPromotion.php'; //推广费
                        include 'renew/investmentContractDepositterm.php';
                        include 'renew/investmentContractProperteisterm.php';
                        include 'renew/investmentContractCertificates.php';
                        include 'renew/textareapanel.php';
                        include 'renew/approvalProcess.php';
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

<?php include 'footer.php'; ?>