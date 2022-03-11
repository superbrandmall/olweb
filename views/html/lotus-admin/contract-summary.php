<?php
if(explode('?id=', $_SERVER['REQUEST_URI'])[1] != null) {
    $id = explode('?id=', $_SERVER['REQUEST_URI'])[1];
}

if(isset($_SESSION['lotus_admin_name']) && $_SESSION['lotus_admin_name'] == '马俊') {
    $scripts = $scripts .PHP_EOL. '        <script type="text/javascript" src="/views/assets/base/js/lotus-admin/contract-summary-admin.js"></script>'.PHP_EOL
    . '        <script type="text/javascript" src="/views/assets/plugins/datepicker/bootstrap-datepicker.zh-CN.min.js"></script>'.PHP_EOL
    . '        <script type="text/javascript" src="/views/assets/plugins/datepicker/bootstrap-datepicker.min.js"></script>'.PHP_EOL
    . '        <script type="text/javascript" src="/views/assets/plugins/timepicker/bootstrap-timepicker.js"></script>'.PHP_EOL;
} else {
    $scripts = $scripts .PHP_EOL. '        <script type="text/javascript" src="/views/assets/base/js/lotus-admin/encrypted/contract-summary.js"></script>'.PHP_EOL
    . '        <script type="text/javascript" src="/views/assets/plugins/datepicker/bootstrap-datepicker.zh-CN.min.js"></script>'.PHP_EOL
    . '        <script type="text/javascript" src="/views/assets/plugins/datepicker/bootstrap-datepicker.min.js"></script>'.PHP_EOL
    . '        <script type="text/javascript" src="/views/assets/plugins/timepicker/bootstrap-timepicker.js"></script>'.PHP_EOL;
}

?>
<link href="/views/assets/plugins/datepicker/bootstrap-datepicker.css" rel="stylesheet" type="text/css" media="all" />
<link href="/views/assets/plugins/timepicker/bootstrap-timepicker.css" rel="stylesheet" type="text/css" media="all" />

<?php include 'sidebar.php'; ?>

<div class="content-wrapper contract-summary">
    <section class="sub-header" style="height: 45px;">
        <h4>
            <span class="badge badge-success" id="contractStatus" style="vertical-align: top;"></span> 合同: <span id="contractName"></span> - V<span id="contractVersion"></span>
        </h4>
        <div class="pull-right">
            <a href="/lotus-admin/make-request" class="btn btn-primary btn-sm"><i class="fa fa-plus icon-white"></i> <span class="hidden-xs">新建新租赁合同申请单</span></a>
        </div>
        <div class="box-header" style="background-color: #ecf0f5; margin-top: 13px;">
            <div class="pull-left">
                <ol class="breadcrumb" style="margin-bottom: 0; padding-left: 0;">
                    <li class="active"><a href="javascript: void(0);">合同概要</a></li>
                    <li><a href="/lotus-admin/contract-detail?id=<?= $id; ?>">合同内容</a></li>
                </ol>
            </div>
        </div>
    </section>

    <section class="content" style="margin-top: 136px;">
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
                    include 'contract-summary/investmentContractModel.php'; //签约信息
                    include 'contract-summary/investmentContractModelBasicinfo.php'; // 品牌信息以及商务合作条件
                    include 'contract-summary/investmentContractAccounttermFixed.php'; //固定租金
                    include 'contract-summary/investmentContractAccounttermCommission.php'; //提成租金
                    include 'contract-summary/investmentContractAccounttermPropertyMgmt.php'; //其他固定费用
                    include 'contract-summary/investmentContractDepositterm.php'; //首期费用以及保证金
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

<?php include 'footer.php'; ?>