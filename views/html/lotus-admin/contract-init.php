<?php
if(explode('?id=', $_SERVER['REQUEST_URI'])[1] != null) {
    $id = explode('?id=', $_SERVER['REQUEST_URI'])[1];
    if (strpos($id, '&s=') !== false) {
        $id = explode('&s=', $id)[0];
    }
}

if(isset($_SESSION['lotus_admin_name']) && $_SESSION['lotus_admin_name'] == '马俊') {
    $scripts = $scripts .PHP_EOL. '        <script type="text/javascript" src="/views/assets/base/js/lotus-admin/contract-init-admin.js"></script>'.PHP_EOL
    . '        <script type="text/javascript" src="/views/assets/plugins/timepicker/bootstrap-timepicker.js"></script>'.PHP_EOL;
} else {
    $scripts = $scripts .PHP_EOL. '        <script type="text/javascript" src="/views/assets/base/js/lotus-admin/encrypted/contract-init.js?t='.date("Y-m-d").'2"></script>'.PHP_EOL
    . '        <script type="text/javascript" src="/views/assets/plugins/timepicker/bootstrap-timepicker.js"></script>'.PHP_EOL;
}

?>
<link href="/views/assets/plugins/timepicker/bootstrap-timepicker.css" rel="stylesheet" type="text/css" media="all" />

<?php include 'sidebar.php'; ?>

<div class="content-wrapper contract-init">
    <form id="create-form" class="form-horizontal" role="form" enctype="multipart/form-data">
        <section class="sub-header" style="height: 90px;">
            <div class="pull-left">
                <a href="contract-duplicate?id=<?= $id; ?>" class="btn btn-primary btn-sm"><i class="fa fa-copy"></i> 复制</a>
                <a href="javascript: void(0);" class="btn btn-danger btn-sm" id="deleteContract"><i class="fa fa-times"></i> 删除</a>
            </div>
            <h4>
                <span class="badge badge-success" id="contractStatus" style="vertical-align: top;"></span> 合同: <b id="contractName"></b> - V<b id="contractVersion"></b>
            </h4>
            <!--<div class="pull-right">
                <button type="button" class="btn btn-success btn-sm" id="activateContract"><i class="fa fa-check icon-white"></i> <span class="hidden-xs">提交生效</span></button>
            </div>-->
            <div class="box-header" id="navbarTop" style="height: 53px;">
                <ul class="breadcrumb nav" style="margin-bottom: 0; padding-left: 0;">
                    <li><a href="#investmentContractModel">合同内容</a></li>
                    <li><a href="#investmentContractAccounttermFixed">固定租金</a></li>
                    <li style="display: none;"><a href="#investmentContractAccounttermCommission">提成租金</a></li>
                    <li><a href="#investmentContractAccounttermPropertyMgmt">物业管理费</a></li>
                    <li><a href="#investmentContractAccounttermPromotion">推广费</a></li>
                    <li><a href="#investmentContractDepositterm">预存款条款</a></li>
                </ul>
            </div>
        </section>

        <section class="content" style="margin-top: 140px;">
            <div id="webui">
                <div class="row">
                    <div class="col-md-12">
                        <?php 
                        include 'contract-init/investmentContractModel.php'; //合同内容
                        include 'contract-init/investmentContractAccounttermFixed.php'; //固定租金
                        include 'contract-init/investmentContractAccounttermCommission.php'; //提成租金
                        include 'contract-init/investmentContractAccounttermPropertyMgmt.php'; //物业管理费
                        include 'contract-init/investmentContractAccounttermPromotion.php'; //推广费
                        include 'contract-init/investmentContractDepositterm.php'; //保证金
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