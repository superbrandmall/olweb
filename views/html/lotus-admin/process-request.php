<?php
if(isset($_SESSION['lotus_admin_name']) && $_SESSION['lotus_admin_name'] == '马俊') {
    $scripts = $scripts .PHP_EOL. '        <script type="text/javascript" src="/views/assets/base/js/lotus-admin/process-request-admin.js?t='.date("Y-m-d").'"></script>'.PHP_EOL;
} else {
    $scripts = $scripts .PHP_EOL. '        <script type="text/javascript" src="/views/assets/base/js/lotus-admin/encrypted/process-request.js?t='.date("Y-m-d").'"></script>'.PHP_EOL;
}
?>

<?php include 'sidebar.php'; ?>

<div class="content-wrapper create-brand">
    <form id="create-form" class="form-horizontal" role="form" enctype="multipart/form-data">
        <section class="sub-header" style="height: 90px;">
            <div class="pull-left">
                <a href="/lotus-admin/my-process" class="btn btn-link "><i class="fa fa-angle-left"></i> 返回列表</a>
            </div>
            <h4>
                <span class="badge badge-success" id="formStatus" style="vertical-align: top; font-size: 12px;"></span>
                卜蜂莲花签呈
                <span id="requestName" style="font-size: 18px;"></span>
            </h4>
            <div class="pull-right">
                <a class="btn btn-link text-left" href="javascript:void(0);" onclick="javascript: confirmCancel('<i class=\'fa fa-question-circle\'></i> 确定要取消吗?','processes');">取消</a>
                <button type="button" class="btn btn-info btn-sm" id="saveDraft"><i class="fa fa-save icon-white"></i> <span class="hidden-xs">保存草稿</span></button>
                <button type="button" class="btn btn-success btn-sm" id="submitForm"><i class="fa fa-check icon-white"></i> <span class="hidden-xs">提交审核</span></button>
            </div>
            <div class="box-header" id="navbarTop">
                <ul class="breadcrumb nav" style="margin-bottom: 0; padding-left: 0;">
                    <li><a href="#processBasicInfo">概要</a></li>
                    <li><a href="#processComplementaryFile">补充文件</a></li>
                    <li><a href="#processApprove">审批流程</a></li>
                </ul>
            </div>
        </section>

        <section class="content" style="margin-top: 140px;">
            <div id="webui">
                <div class="row">
                    <div class="col-md-12">
                        <div class="box box-default" id="processBasicInfo">    
                            <div class="box-header with-border">
                                <h3 class="box-title">概要</h3>
                                <div class="box-tools">
                                    <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="box-body">
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label class="col-md-4 control-label" for="applyReason">标题 <span class="btn-box-tool-lg">*</span></label>
                                        <div class="col-md-8 col-sm-12 required">
                                            <input id="applyReason" class="form-control" type="text" />
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-md-4 control-label" for="investmentContractModelMallSelect">申请部门</label>
                                        <div class="col-md-8 col-sm-12">
                                            <input id="investmentContractModelMallSelect" class="form-control" type="text" readonly />
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-md-4 control-label" for="applyType">签呈类型</label>
                                        <div class="col-md-8 col-sm-12">
                                            <select class="select2" id="applyType" style="width: 100%"></select>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label class="col-md-4 control-label" for="bizId">单号</label>
                                        <div class="col-md-8 col-sm-12">
                                            <input id="bizId" class="form-control" type="text" readonly />
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-md-4 control-label" for="creatorName">申请人</label>
                                        <div class="col-md-8 col-sm-12">
                                            <?php
                                            if(isset($_SESSION['lotus_admin_name'])) {
                                                echo '<input class="form-control" id="creatorName" type="text" value="'.$_SESSION['lotus_admin_name'].'" readonly />';
                                            } else {
                                                echo '<input class="form-control" id="creatorName" type="text" value="管理员" readonly />';
                                            }
                                            ?>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-md-4 control-label" for="amount">签呈总金额</label>
                                        <div class="col-md-8 col-sm-12">
                                            <div class="input-group">
                                                <input class="form-control money" id="amount" type="text" style="border-right: none;" />                                                
                                                <span class="input-group-addon" style="border-left: none; background: transparent;">元</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group" style="margin-bottom: 22px;">
                                        <label class="col-md-4 control-label" for="urgencyDegree">紧急程度</label>
                                        <div class="col-md-8 col-sm-12">
                                            <label class="radio-inline">
                                                <input type="radio" name="urgencyDegree" value="正常" checked="">正常
                                            </label>
                                            <label class="radio-inline">
                                                <input type="radio" name="urgencyDegree" value="重要">重要
                                            </label>
                                            <label class="radio-inline">
                                                <input type="radio" name="urgencyDegree" value="紧急">紧急
                                            </label>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-md-4 control-label" for="mobileNo">联系电话</label>
                                        <div class="col-md-6 col-sm-12">
                                            <input id="mobileNo" class="form-control" type="text" />
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label class="col-md-1 control-label" for="approveInfo">主旨 <span class="btn-box-tool-lg">*</span></label>
                                        <div class="col-md-10 col-sm-12 required" style="margin-left: 2.7%;">
                                            <input class="form-control" type="text" id="approveInfo" name="applyReason">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label class="col-md-1 control-label" for="remarks">说明 <span class="btn-box-tool-lg">*</span></label>
                                        <div class="col-md-10 col-sm-12 required" style="margin-left:2.7%;">
                                            <textarea class="form-control" id="remarks" name="remarks" rows="7" placeholder="理由,数据,附件,建议......"></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="box box-default" id="processComplementaryFile">    
                            <div class="box-header with-border">
                                <h3 class="box-title">补充文件</h3>
                                <div class="box-tools">
                                    <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="box-body">
                                <div class="col-md-12">
                                    <table class="table table-responsive" style="margin-top: 0; text-align: left;">
                                        <thead id="assetsListingTable-sticky-header">
                                            <tr>
                                                <th style="text-align: left;">
                                                    <div class="th-inner">附件类型</div>
                                                    <div class="fht-cell"></div>
                                                </th>
                                                <th style="text-align: left;">
                                                    <div class="th-inner">上传时间</div>
                                                    <div class="fht-cell"></div>
                                                </th>
                                                <th style="text-align: left;">
                                                    <div class="th-inner">文件名</div>
                                                    <div class="fht-cell"></div>
                                                </th>
                                                <th style="text-align: left;">
                                                    <div class="th-inner">大小</div>
                                                    <div class="fht-cell"></div>
                                                </th>
                                                <th style="text-align: left;">
                                                    <div class="th-inner">操作</div>
                                                    <div class="fht-cell"></div>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody id="fileList">
                                            <tr>
                                                <td>附件</td>
                                                <td id="otherFilesCreated_0"></td>
                                                <td>
                                                    <input type="text" id="otherFiles_0" name="otherFiles_0" style="border: 0 none; text-align: left; width: 100%;" readonly/>
                                                </td>
                                                <td id="otherFilesFileSize_0"></td>
                                                <td id="otherFilesAction_0"></td>
                                            </tr>
                                            <?php
                                                for($i=1;$i<10;$i++){
                                            ?>
                                            <tr style="display: none;">
                                                <td>附件</td>
                                                <td id="otherFilesCreated_<?= $i; ?>"></td>
                                                <td>
                                                    <input type="text" id="otherFiles_<?= $i; ?>" name="otherFiles_<?= $i; ?>" style="border: 0 none; text-align: left; width: 100%;" readonly/>
                                                </td>
                                                <td id="otherFilesFileSize_<?= $i; ?>"></td>
                                                <td id="otherFilesAction_<?= $i; ?>"></td>
                                            </tr>
                                            <?php
                                                }
                                            ?>
                                        </tbody>
                                    </table>
                                </div>
                                <div class="col-md-12">
                                    <div class="col-md-12">
                                        <label class="col-md-2 control-label">上传附件</label>
                                        <div class="col-md-10 col-sm-12">
                                            <div class="form-group input-group">
                                                <input type="text" id="fileName_otherFiles" class="form-control" disabled style="background-color: #fff; border: solid 1px rgb(210, 214, 222);">
                                                <input type="file" style="display: none;" onchange="javascript:$('input[id=\'fileName_otherFiles\']').val(this.files[0].name);" accept="image/*,application/pdf" multiple />
                                                <div type="button" class="input-group-addon" id="uploadFile_otherFiles" style="padding: 6px 12px; font-size: 11px; cursor: pointer; border-left: 0 none; border-right: 0 none;"><i class="fa fa-upload"></i> 选取文件</div>
                                                <div type="button" class="input-group-addon" style="background-color: #3c8dbc; border-color: #367fa9; padding: 6px 12px; font-size: 11px; cursor: pointer; color: #fff;" onclick="javascript:$(this).parent().find('input[type=\'file\']').click();"><i class="fa fa-folder-open-o"></i> 选择文件 &hellip;</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="box box-default" id="processApprove" style="min-height: 450px;">   
                            <div class="box-header with-border">
                                <h3 class="box-title">审批流程</h3>
                                <div class="box-tools">
                                    <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="box-body">
                                <div class="col-md-3">
                                    <div class="form-group" id="signLeasingApprove">
                                        <label class="col-md-5 control-label"> <span class="btn-box-tool-lg">*</span></label>
                                        <div class="col-md-7 col-sm-12 required">
                                            <select class="select2" style="width: 100%"></select>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="form-group" id="signFinPreApprove">
                                        <label class="col-md-5 control-label"> <span class="btn-box-tool-lg">*</span></label>
                                        <div class="col-md-7 col-sm-12 required">
                                            <select class="select2" style="width: 100%"></select>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="form-group" id="signLegalPreApprove">
                                        <label class="col-md-5 control-label"> <span class="btn-box-tool-lg">*</span></label>
                                        <div class="col-md-7 col-sm-12 required">
                                            <select class="select2" style="width: 100%"></select>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="form-group" id="signFinApprove">
                                        <label class="col-md-5 control-label"> <span class="btn-box-tool-lg">*</span></label>
                                        <div class="col-md-7 col-sm-12 required">
                                            <select class="select2" style="width: 100%"></select>
                                        </div>
                                    </div>
                                </div>
                                <div class="clearfix"></div>
                                <div class="col-md-3">
                                    <div class="form-group" id="signLegalApprove">
                                        <label class="col-md-5 control-label"> <span class="btn-box-tool-lg">*</span></label>
                                        <div class="col-md-7 col-sm-12 required">
                                            <select class="select2" style="width: 100%"></select>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="form-group" id="signHqLeasingApprove">
                                        <label class="col-md-5 control-label"> <span class="btn-box-tool-lg">*</span></label>
                                        <div class="col-md-7 col-sm-12 required">
                                            <select class="select2" style="width: 100%"></select>
                                        </div>
                                    </div>
                                </div>
                                <div class="clearfix"></div>

                                <div class="col-md-12">
                                    <h5 style="margin-bottom: 0;">流程</h5>
                                    <hr>
                                </div>
                                <div class="col-md-12">
                                    <ul class="nav nav-pills nav-justified step step-progress">
                                        <li class="active">
                                            <a href="javascript: void(0);">审批人: 提交人本人<span class="caret"></span></a>
                                        </li>
                                        <li class="active">
                                            <a href="javascript: void(0);">审批人: 招商负责人<span class="caret"></span></a>
                                        </li>
                                        <li class="active">
                                            <a href="javascript: void(0);">审批人: 财法预审<span class="caret"></span></a>
                                        </li>
                                        <li class="active">
                                            <a href="javascript: void(0);">审批人: 财法负责人<span class="caret"></span></a>
                                        </li>
                                        <li class="active">
                                            <a href="javascript: void(0);">审批人: 总部招商负责人<span class="caret"></span></a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
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