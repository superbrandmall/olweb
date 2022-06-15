<?php
if(explode('?id=', $_SERVER['REQUEST_URI'])[1] != null) {
    $id = explode('?id=', $_SERVER['REQUEST_URI'])[1];
    if (strpos($id, '&s=') !== false) {
        $id = explode('&s=', $id)[0];
    }
}

if(isset($_SESSION['lotus_admin_name']) && $_SESSION['lotus_admin_name'] == '马俊') {
    $scripts = $scripts .PHP_EOL. '        <script type="text/javascript" src="/views/assets/base/js/lotus-admin/request-summary-admin.js"></script>'.PHP_EOL
    . '        <script type="text/javascript" src="/views/assets/plugins/timepicker/bootstrap-timepicker.js"></script>'.PHP_EOL;
} else {
    $scripts = $scripts .PHP_EOL. '        <script type="text/javascript" src="/views/assets/base/js/lotus-admin/encrypted/request-summary.js"></script>'.PHP_EOL
    . '        <script type="text/javascript" src="/views/assets/plugins/timepicker/bootstrap-timepicker.js"></script>'.PHP_EOL;
}

?>
<link href="/views/assets/plugins/timepicker/bootstrap-timepicker.css" rel="stylesheet" type="text/css" media="all" />

<?php include 'sidebar.php'; ?>

<div class="content-wrapper request-summary">
    <section class="sub-header" style="height: 45px;">
        <h4>
            <span class="badge badge-success" id="formStatus" style="vertical-align: top;"></span> 新签租赁合同申请单: <span id="requestName"></span>
        </h4>
        <div class="pull-right">
            <div class="btn-group">
                <button type="button" class="btn btn-primary btn-sm dropdown-toggle" data-toggle="dropdown">
                    <i class="fa fa-plus icon-white"></i> 创建
                    <span class="caret"></span>
                </button>
                <ul class="dropdown-menu pull-right" role="menu">
                    <li><a href="/lotus-admin/make-request">新签租赁合同申请单</a></li>
                    <li><a href="javascript: void(0);" id="createRenew">续签租赁合同申请单</a></li>
                    <?php
                    if(isset($_SESSION['lotus_admin_name']) && $_SESSION['lotus_admin_name'] == '马俊') {
                    ?>                    
                    <li><a href="javascript: void(0);" id="createTerminate">终止租赁合同申请单</a></li>
                    <?php
                    }
                    ?>
                </ul>
            </div>
        </div>
        <div class="box-header" style="background-color: #ecf0f5; margin-top: 13px;">
            <div class="pull-left">
                <ol class="breadcrumb" style="margin-bottom: 0; padding-left: 0;">
                    <li class="active"><a href="javascript: void(0);">单据概要</a></li>
                    <li><a href="/lotus-admin/request-detail?id=<?= $id; ?>">单据内容</a></li>
                </ol>
            </div>
        </div>
    </section>

    <section class="content" style="margin-top: 136px;">
        <div id="webui">
            <div class="row">
                <div class="col-md-12">
                    <?php 
                    include 'request-summary/investmentContractModel.php'; //签约信息
                    include 'request-summary/investmentContractModelBasicinfo.php'; // 品牌信息以及商务合作条件
                    include 'request-summary/investmentContractAccounttermFixed.php'; //固定租金
                    include 'request-summary/investmentContractAccounttermCommission.php'; //提成租金
                    include 'request-summary/investmentContractAccounttermPropertyMgmt.php'; //其它固定费用
                    include 'request-summary/investmentContractAccounttermPromotion.php'; //推广费
                    include 'request-summary/investmentContractDepositterm.php'; //首期费用以及保证金
                    include 'request-summary/investmentContractApprovalProcess.php'; //操作历史
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

<?php include 'footer.php'; ?>