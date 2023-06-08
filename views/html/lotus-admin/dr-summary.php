<?php
if(isset($_SESSION['lotus_admin_name']) && $_SESSION['lotus_admin_name'] == '马俊') {
    $scripts = $scripts .PHP_EOL. '        <script type="text/javascript" src="/views/assets/base/js/lotus-admin/dr-summary-admin.js?t='.date("Y-m-d").'"></script>'.PHP_EOL;
} else {
    $scripts = $scripts .PHP_EOL. '        <script type="text/javascript" src="/views/assets/base/js/lotus-admin/encrypted/dr-summary.js?t='.date("Y-m-d").'"></script>'.PHP_EOL;
}
?>

<?php include 'sidebar.php'; ?>

<div class="content-wrapper">
    <section class="sub-header" style="height: 45px;">
        <div class="pull-left">
            <a href="/lotus-admin/requests" class="btn btn-link "><i class="fa fa-angle-left"></i> 返回列表</a>
        </div>
        <h4>
            <span class="badge badge-success" id="formStatus" style="vertical-align: top;"></span> <span id="mallName"></span>项目<span id="brandName"></span>品牌商务审批表<span id="created"></span>
        </h4>
        <?php include 'component/investment-contract-request-create-dropdown.php'; ?>
        <div class="box-header" style="background-color: #ecf0f5; margin-top: 13px; height: 50px;">
            <div class="pull-left">
                <ol class="breadcrumb" style="margin-bottom: 0; padding-left: 0;">
                    <li><a href="javascript: void(0);">单据概要</a></li>
                    <li><a href="javascript: void(0);">单据内容</a></li>
                    <li class="active"><a href="javascript: void(0);">DR概要</a></li>
                </ol>
            </div>
        </div>
    </section>
    
    <section class="content" style="margin-top: 130px;">
        <div id="webui">
            <div class="row">
                <div class="col-md-12">
                    <div class="box" style="height: 0;">
                        <div class="box-body" style="padding-top: 0; padding-bottom: 0; margin: 0 2px;">
                            <div class="row">
                                <div class="col-md-12" style="padding: 0;">
                                    <iframe src ="/dr-summary/#/summary" width="100%" height="800" scrolling="auto" frameBorder="0" style="overflow: hidden;">
                                        <p>你的浏览器不支持iframes。</p>
                                    </iframe>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>

<?php include 'component/investment-contract-request-modify-create.php'; ?>
<?php include 'component/investment-contract-request-renew-termination-create.php'; ?>
<?php include 'component/investment-contract-request-create.php'; ?>

<?php include 'footer.php'; ?>