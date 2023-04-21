<?php
if(explode('?id=', $_SERVER['REQUEST_URI'])[1] != null) {
    $id = explode('?id=', $_SERVER['REQUEST_URI'])[1];
    if (strpos($id, '&s=') !== false) {
        $id = explode('&s=', $id)[0];
    }
}

if(isset($_SESSION['lotus_admin_name']) && $_SESSION['lotus_admin_name'] == '马俊') {
    $scripts = $scripts .PHP_EOL. '        <script type="text/javascript" src="/views/assets/base/js/lotus-admin/budget-detail-admin.js"></script>'.PHP_EOL
    . '        <script type="text/javascript" src="/views/assets/plugins/timepicker/bootstrap-timepicker.js"></script>'.PHP_EOL;
} else {
    $scripts = $scripts .PHP_EOL. '        <script type="text/javascript" src="/views/assets/base/js/lotus-admin/encrypted/budget-detail.js"></script>'.PHP_EOL
    . '        <script type="text/javascript" src="/views/assets/plugins/timepicker/bootstrap-timepicker.js"></script>'.PHP_EOL;            
}

?>
<link href="/views/assets/plugins/timepicker/bootstrap-timepicker.css" rel="stylesheet" type="text/css" media="all" />

<?php include 'sidebar.php'; ?>

<div class="content-wrapper budget-detail">
    <form id="create-form" class="form-horizontal" role="form" enctype="multipart/form-data">
        <section class="sub-header" style="height: 90px;">
            <h4>
                <span class="badge badge-success" id="budgetStatus" style="vertical-align: top;"></span> 租金计划: <b><b id="unitName"></b>[<b id="unitCode"></b>]</b>
            </h4>
            <div class="pull-right">
                <a class="btn btn-link text-left" href="javascript:void(0);" onclick="javascript: confirmCancel('<i class=\'fa fa-question-circle\'></i> 确定要取消吗?','leasing-budget');">取消</a>
                <button type="button" class="btn btn-success btn-sm" id="saveDraft"><i class="fa fa-check icon-white"></i> <span class="hidden-xs">提交保存</span></button>
            </div>
            <div class="box-header" id="navbarTop">
                <ul class="breadcrumb nav" style="margin-bottom: 0; padding-left: 0;">
                    <li><a href="#investmentBudgetModel">概要信息</a></li>
                    <li><a href="#investmentBudgetAccounttermFixed">固定租金</a></li>
                    <li><a href="#investmentBudgetAccounttermPropertymgmt">物业管理费</a></li>
                    <li><a href="#investmentBudgetAccounttermCommission">提成扣率</a></li>
                    <li><a href="#investmentBudgetAccounttermPromotion">固定推广费</a></li>
                    <li><a href="#investmentBudgetAccounttermSales">预估销售额</a></li>
                </ul>
            </div>
            <div class="box-header" style="background-color: #ecf0f5; margin-top: -6px; height: 50px;">
                <div class="pull-left">
                    <ol class="breadcrumb" style="margin-bottom: 0; padding-left: 0;">
                        <li><a href="/lotus-admin/store-detail?id=<?= $id; ?>">铺位资料</a></li>
                        <li class="active"><a href="javascript: void(0);">租金计划</a></li>
                        <li><a href="/lotus-admin/store-contract?id=<?= $id; ?>">签约合同</a></li>
                    </ol>
                </div>
            </div>
        </section>

        <section class="content" style="margin-top: 179px;">
            <div id="webui">
                <div class="row">
                    <div class="col-md-12">
                        <?php 
                        include 'budget-detail/investmentBudgetModel.php';
                        include 'budget-detail/investmentBudgetAccounttermFixed.php';
                        include 'budget-detail/investmentBudgetAccounttermPropertymgmt.php';
                        include 'budget-detail/investmentBudgetAccounttermCommission.php';
                        include 'budget-detail/investmentBudgetAccounttermPromotion.php';
                        include 'budget-detail/investmentBudgetAccounttermSales.php';
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