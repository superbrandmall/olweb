<?php
if(explode('?id=', $_SERVER['REQUEST_URI'])[1] != null) {
    $id = explode('?id=', $_SERVER['REQUEST_URI'])[1];
    if (strpos($id, '&s=') !== false) {
        $id = explode('&s=', $id)[0];
    }
}

$scripts = $scripts .PHP_EOL. '        <script type="text/javascript" src="/views/assets/base/js/lotus-approval-opinion/default-admin.js"></script>'.PHP_EOL;


?>

<div class="content-wrapper" style="margin-left: 0; padding-bottom: 40px;">
    <section class="sub-header" style="height: 45px; left: 0;">
        <h4>
            招商租赁审批意见书
        </h4>
    </section>

    <section class="content" style="margin-top: 96px;">
        <div id="webui">
            <div class="row">
                <?php
                include 'component/investmentContractDepartment.php'; // 承办部门
                include 'component/investmentContractTopic.php'; // 主题
                include 'component/investmentContractBasicInfo.php'; //基本信息
                include 'component/investmentContractDetails.php'; //商务明细
                include 'component/investmentContractAccounttermFixed.php'; //固定租金
                include 'component/investmentContractAccounttermCommission.php'; //提成租金
                include 'component/investmentContractAccounttermPropertyMgmt.php'; //其它固定费用
                include 'component/investmentContractAccounttermPromotion.php'; //推广费
                include 'component/investmentContractDepositterm.php'; //首期费用以及保证金
                include 'component/textareapanel.php'; //小作文
                include 'component/investmentContractCertificates.php'; //附件信息
                include 'component/investmentContractApprovalProcess.php'; //操作历史
                ?>
            </div>
        </div>
    </section>
</div>

<?php include 'footer.php'; ?>