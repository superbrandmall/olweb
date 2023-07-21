<?php
if(isset($_SESSION['lotus_admin_name']) && $_SESSION['lotus_admin_name'] == '马俊') {
    $scripts = $scripts .PHP_EOL. '        <script type="text/javascript" src="/views/assets/base/js/lotus-admin/process-detail-admin.js?t='.date("Y-m-d").'"></script>'.PHP_EOL;
} else {
    $scripts = $scripts .PHP_EOL. '        <script type="text/javascript" src="/views/assets/base/js/lotus-admin/encrypted/process-detail.js?t='.date("Y-m-d").'"></script>'.PHP_EOL;
}
?>

<?php include 'sidebar.php'; ?>

<div class="content-wrapper create-sales-data">
    <form id="create-form" class="form-horizontal" role="form" enctype="multipart/form-data">
        <section class="sub-header" style="height: 90px;">
            <div class="pull-left">
                <a href="/lotus-admin/my-process" class="btn btn-link "><i class="fa fa-angle-left"></i> 返回列表</a>
                <a href="javascript: checkRequest();" class="btn btn-primary btn-sm">查看业务单据</a>
                <a href="javascript: flowInstUpdate();" class="btn btn-warning btn-sm">更新审批状态</a>
            </div>
            <h4>
                <b id="status"></b>流程: 租赁合同【<b id="formType"></b>】申请
            </h4>
            <div class="box-header" id="navbarTop">
                <ul class="breadcrumb nav" style="margin-bottom: 0; padding-left: 0;">
                    <li><a href="#processBasic">概要</a></li>
                    <li><a href="#processFlow">流程图</a></li>
                    <li><a href="#processFiles">上传附件</a></li>
                    <li><a href="#processList">流转过程</a></li>
                </ul>
            </div>
        </section>

        <section class="content" style="margin-top: 140px;">
            <div id="webui">
                <div class="row">
                    <div class="col-md-12">
                        <div class="box box-default" id="processBasic">    
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
                                        <label class="col-md-6 control-label">流程名称</label>
                                        <b class="col-md-6 col-sm-12 control-label" id="processName" style="overflow: hidden; white-space: nowrap; text-overflow: ellipsis;"></b>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label class="col-md-6 control-label">当前状态</label>
                                        <div class="col-md-6 col-sm-12 control-label" id="processInstStatus"></div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label class="col-md-6 control-label">发起人</label>
                                        <b class="col-md-6 col-sm-12 control-label" id="creatorName"></b>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label class="col-md-6 control-label">发起时间</label>
                                        <div class="col-md-6 col-sm-12 control-label" id="created"></div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label class="col-md-6 control-label">最后操作时间</label>
                                        <div class="col-md-6 col-sm-12 control-label" id="updated"></div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label class="col-md-6 control-label">流程分类</label>
                                        <div class="col-md-6 col-sm-12 control-label" id="bizType"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="box box-default" id="processFlow">    
                            <div class="box-header with-border">
                                <h3 class="box-title">流程图</h3>
                                <div class="box-tools">
                                    <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="box-body">
                                <div class="col-md-12">
                                    <ul class="nav nav-pills nav-justified step step-progress">
                                        <li>
                                            <a href="javascript: void(0);">审批人: 提交人本人<span class="caret"></span></a>
                                        </li>
                                        <li>
                                            <a href="javascript: void(0);">审批人: Lotus招商负责人<span class="caret"></span></a>
                                        </li>
                                        <li>
                                            <a href="javascript: void(0);">审批人: 财法预审<span class="caret"></span></a>
                                        </li>
                                        <li>
                                            <a href="javascript: void(0);">审批人: 财法负责人<span class="caret"></span></a>
                                        </li>
                                        <li>
                                            <a href="javascript: void(0);">审批人: 业态负责人<span class="caret"></span></a>
                                        </li>
                                        <li>
                                            <a href="javascript: void(0);">审批人: 总部招商负责人<span class="caret"></span></a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        
                        <div class="box box-default" id="processFiles">    
                            <div class="box-header with-border">
                                <h3 class="box-title">上传附件</h3>
                                <div class="box-tools">
                                    <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="box-body">
                                <div class="col-md-12">
                                    <table class="table table-responsive" style="text-align: left;">
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
                                                <td class="headTxt"></td>
                                                <td id="reqFileCreated_0"></td>
                                                <td>
                                                    <input type="text" id="reqFile_0" name="reqFile_0" style="border: 0 none; text-align: left; width: 100%;" readonly/>
                                                </td>
                                                <td id="reqFileFileSize_0"></td>
                                                <td id="reqFileAction_0"></td>
                                            </tr>
                                            <tr>
                                                <td>其它文件</td>
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
                                                <td>其它文件</td>
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
                                        <label class="col-md-2 control-label" style="padding-left: 22px;"><span class="headTxt">文件</span>上传</label>
                                        <div class="col-md-10 col-sm-12">
                                            <div class="form-group input-group">
                                                <input type="text" id="fileName_reqFile" class="form-control" disabled placeholder="文件大小不超过10M" style="background-color: #fff; border: solid 1px rgb(210, 214, 222);">
                                                <input type="file" style="display: none;" onchange="javascript:$('input[id=\'fileName_reqFile\']').val(this.files[0].name);" accept="image/*,application/pdf" multiple />
                                                <div type="button" class="input-group-addon" id="reqUploadFile" style="padding: 6px 12px; font-size: 11px; cursor: pointer; border-left: 0 none; border-right: 0 none;"><i class="fa fa-upload"></i> 上传文件</div>
                                                <div type="button" class="input-group-addon" style="background-color: #3c8dbc; border-color: #367fa9; padding: 6px 12px; font-size: 11px; cursor: pointer; color: #fff;" onclick="javascript:$(this).parent().find('input[type=\'file\']').click();"><i class="fa fa-folder-open-o"></i> 选择文件 &hellip;</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="box box-default" id="processList">    
                            <div class="box-header with-border">
                                <h3 class="box-title">流转过程</h3>
                                <div class="box-tools">
                                    <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="box-body">
                                <div class="col-md-12">
                                    <div class="box-body">
                                        <div class="row">
                                            <div class="bootstrap-table">
                                                <div class="fixed-table-container">
                                                    <div class="fixed-table-body">
                                                        <table class="table table-striped snipe-table table-responsive">
                                                            <thead id="assetsListingTable-sticky-header">
                                                                <tr style="text-align: left;">
                                                                    <th>
                                                                        <div class="th-inner">行</div>
                                                                        <div class="fht-cell"></div>
                                                                    </th>
                                                                    <th style="width: 150px;">
                                                                        <div class="th-inner">操作</div>
                                                                        <div class="fht-cell"></div>
                                                                    </th>
                                                                    <th>
                                                                        <div class="th-inner">执行人</div>
                                                                        <div class="fht-cell"></div>
                                                                    </th>
                                                                    <th style="width: 80px;">
                                                                        <div class="th-inner">状态</div>
                                                                        <div class="fht-cell"></div>
                                                                    </th>
                                                                    <th>
                                                                        <div class="th-inner">意见</div>
                                                                        <div class="fht-cell"></div>
                                                                    </th>
                                                                    <th style="width: 150px;">
                                                                        <div class="th-inner">开始日期</div>
                                                                        <div class="fht-cell"></div>
                                                                    </th>
                                                                    <th style="width: 150px;">
                                                                        <div class="th-inner">结束日期</div>
                                                                        <div class="fht-cell"></div>
                                                                    </th>
                                                                </tr>
                                                            </thead>
                                                            <tbody id="approvalProcess"></tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="clearfix"></div>
                                        </div>
                                    </div>
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