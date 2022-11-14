<?php
if(explode('?id=', $_SERVER['REQUEST_URI'])[1] != null) {
    $id = explode('?id=', $_SERVER['REQUEST_URI'])[1];
    if (strpos($id, '&s=') !== false) {
        $id = explode('&s=', $id)[0];
    }
}

if(isset($_SESSION['lotus_admin_name']) && $_SESSION['lotus_admin_name'] == '马俊') {
    $scripts = $scripts .PHP_EOL. '        <script type="text/javascript" src="/views/assets/base/js/lotus-admin/contract-compare-admin.js"></script>'.PHP_EOL;
} else {
    $scripts = $scripts .PHP_EOL. '        <script type="text/javascript" src="/views/assets/base/js/lotus-admin/encrypted/contract-compare.js"></script>'.PHP_EOL;
}

?>

<?php include 'sidebar.php'; ?>

<div class="content-wrapper contract-summary">
    <section class="sub-header" style="height: 200px;">
        <h4>
            合同版本比较: <span id="contractNo"></span>
        </h4>
        <div class="col-md-12">
            <div class="row" style="margin-bottom: 10px;">
                <div class="col-md-2 col-md-offset-3">
                    <div class="cUpdated">表示有变更的内容</div>
                </div>
                <div class="col-md-2">
                    <div class="cAdded">表示有增加的内容</div>
                </div>
                <div class="col-md-2">
                    <div class="cEnded">表示有终止的内容</div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-3 col-md-offset-3">
                    <div style="border: solid 1px #ddd; padding-top: 10px;">
                        <div class="form-group">
                            <label class="col-md-6">版本号:</label>
                            <div class="col-md-6" id="versionA"></div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-6">修改人:</label>
                            <div class="col-md-6" id="updatorA"></div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-6">修改时间:</label>
                            <div class="col-md-6" id="updateTimeA"></div>
                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div style="border: solid 1px #ddd; padding-top: 10px;">
                        <div class="form-group">
                            <label class="col-md-6">版本号:</label>
                            <div class="col-md-6" id="versionB"></div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-6">修改人:</label>
                            <div class="col-md-6" id="updatorB"></div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-6">修改时间:</label>
                            <div class="col-md-6" id="updateTimeB"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="content" style="margin-top: 250px;">
        <div id="webui">
            <div class="row">
                <div class="col-md-12">
                    <?php
                    include 'contract-summary/investmentContractModel.php'; //签约信息
                    include 'contract-summary/investmentContractModelBasicinfo.php'; // 品牌信息以及商务合作条件
                    include 'contract-summary/investmentContractAccounttermFixed.php'; //固定租金
                    include 'contract-summary/investmentContractAccounttermCommission.php'; //提成租金
                    include 'contract-summary/investmentContractAccounttermPropertyMgmt.php'; //其它固定费用
                    include 'contract-summary/investmentContractAccounttermPromotion.php'; //推广费
                    include 'contract-summary/investmentContractDepositterm.php'; //首期费用以及保证金
                    include 'contract-summary/investmentContractCertificates.php'; //附件信息
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