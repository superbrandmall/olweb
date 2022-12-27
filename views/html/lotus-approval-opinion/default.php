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
        <img class="navbar-brand-img visible-print" src="/views/assets/base/img/content/lotus-admin/lotus-logo.png" style="top: -3px; position: absolute; left: 0;">
        <h4>
            招商租赁审批意见书 <span id="formType"></span>
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

<div class="modal fade" id="approval_form" tabindex="-1" role="dialog" aria-hidden="true" data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog modal-md">
        <div class="modal-content c-square" style="background: #fff;">
            <div class="modal-header"><h4 class="text-center">添加审批意见</h4></div>
            <div class="modal-body">
                <form id="create-form" class="form-horizontal" role="form" enctype="multipart/form-data">
                    <div class="col-md-12">
                        <div class="form-group">
                            <div class="jumbotron">
                                <h4 id="txt" class="text-center"></h4>
                            </div>
                            <textarea class="form-control" id="opinion" rows="3" placeholder="输入意见"></textarea>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="form-group">
                            <div class="col-md-12" style="text-align: center;">
                                <button type="button" class="btn btn-info btn-lg" id="submitApproval">确定</button>
                                <button type="button" class="btn btn-default btn-lg" data-dismiss="modal" aria-label="Close">取消</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

<?php include 'footer.php'; ?>