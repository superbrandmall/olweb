<?php
if(explode('?id=', $_SERVER['REQUEST_URI'])[1] != null) {
    $id = explode('?id=', $_SERVER['REQUEST_URI'])[1];
    if (strpos($id, '&s=') !== false) {
        $id = explode('&s=', $id)[0];
    }
}

if(isset($_SESSION['lotus_admin_name']) && $_SESSION['lotus_admin_name'] == '马俊') {
    $scripts = $scripts .PHP_EOL. '        <script type="text/javascript" src="/views/assets/base/js/lotus-admin/modify-summary-admin.js"></script>'.PHP_EOL;
} else {
    $scripts = $scripts .PHP_EOL. '        <script type="text/javascript" src="/views/assets/base/js/lotus-admin/encrypted/modify-summary.js"></script>'.PHP_EOL;
}

?>

<?php include 'sidebar.php'; ?>

<div class="content-wrapper modify-summary">
    <section class="sub-header" style="height: 45px;">
        <h4>
            <span class="badge badge-info" id="modifyType" style="vertical-align: top;"></span> <span class="badge badge-success" id="formStatus" style="vertical-align: top;"></span> 变更租赁合同申请单: <span id="requestName"></span>
        </h4>
        <?php include 'component/investment-contract-request-create-dropdown.php'; ?>
        <div class="box-header" style="background-color: #ecf0f5; margin-top: 13px; height: 50px;">
            <div class="pull-left">
                <ol class="breadcrumb" style="margin-bottom: 0; padding-left: 0;">
                    <li class="active"><a href="javascript: void(0);">单据概要</a></li>
                    <li><a href="/lotus-admin/modify-detail?id=<?= $id; ?>">单据内容</a></li>
                    <li><a href="/lotus-admin/dr-summary?id=<?= $id; ?>">DR概要</a></li>
                </ol>
            </div>
        </div>
    </section>

    <section class="content" style="margin-top: 136px;">
        <div id="webui">
            <div class="row">
                <div class="col-md-12">
                    <?php
                    include 'modify-summary/investmentContractCertificates.php'; //附件信息
                    include 'modify-summary/textareapanel.php'; //小作文
                    include 'modify-summary/investmentContractModel.php'; //签约信息
                    include 'modify-summary/investmentContractModelBasicinfo.php'; // 品牌信息以及商务合作条件
                    include 'modify-summary/investmentContractAccounttermFixed.php'; //固定租金
                    include 'modify-summary/investmentContractAccounttermCommission.php'; //提成租金
                    include 'modify-summary/investmentContractAccounttermPropertyMgmt.php'; //其它固定费用
                    include 'modify-summary/investmentContractAccounttermPromotion.php'; //推广费
                    include 'modify-summary/investmentContractDepositterm.php'; //首期费用以及保证金
                    include 'modify-summary/investmentContractApprovalProcess.php'; //操作历史
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
</div>

<?php include 'component/investment-contract-request-modify-create.php'; ?>
<?php include 'component/investment-contract-request-renew-termination-create.php'; ?>
<?php include 'component/investment-contract-request-create.php'; ?>

<?php include 'footer.php'; ?>