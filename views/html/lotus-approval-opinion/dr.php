<?php
$scripts = $scripts .PHP_EOL. '        <script type="text/javascript" src="/views/assets/base/js/lotus-approval-opinion/dr-admin.js"></script>'.PHP_EOL;


?>

<div class="content-wrapper" style="margin-left: 0; padding-bottom: 40px;">
    <section class="sub-header" style="height: 45px; left: 0;">
        <img class="navbar-brand-img visible-print" src="/views/assets/base/img/content/lotus-admin/lotus-logo.png" style="top: -3px; position: absolute; left: 0;">
        <h4>
            <span id="opinionType">leasing DR商务审批</span> <span id="formType"></span>
        </h4>
    </section>
    <section class="content">
        <div id="webui">
            <div class="row">
                <div class="col-md-12">
                    <div class="box" style="height: 0;">
                        <div class="box-body" style="padding-top: 0; padding-bottom: 0; margin: 0 2px;">
                            <div class="row">
                                <div class="col-md-12" style="padding: 0;">
                                    <iframe id="leasingDrFrame" src ="/dr-summary/#/summary" width="100%" height="800" scrolling="auto" frameBorder="0" style="margin-top: 76px; overflow: hidden;">
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

<div id="lotus-approval-opinion" style="position: fixed;right: 0;top: 95px;background: #FFFFCC;width: 50px;z-index: 1;bottom: 0;">
    <div style="padding: 50px 18px;">
        <a href="javascript: void(0);" style="color: #1c9e74;"><i class="fa fa-folder-open-o" style="margin-bottom: 5px;"></i>招商租赁审批意见书</a>
    </div>
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