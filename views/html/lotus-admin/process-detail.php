<?php
if(isset($_SESSION['lotus_admin_name']) && $_SESSION['lotus_admin_name'] == '马俊') {
    $scripts = $scripts .PHP_EOL. '        <script type="text/javascript" src="/views/assets/base/js/lotus-admin/process-detail-admin.js?t='.date("Y-m-d").'"></script>'.PHP_EOL;
} else {
    $scripts = $scripts .PHP_EOL. '        <script type="text/javascript" src="/views/assets/base/js/lotus-admin/encrypted/process-detail.js?t='.date("Y-m-d").'"></script>'.PHP_EOL;
}
?>

<?php include 'sidebar.php'; ?>

<style>
    @media print {
        body {
            background-color: #fff;
        }
        
        .content-wrapper {
            margin-left: 0;
            background-color: #fff;
        }
        
        h4 {
            letter-spacing: 30px;
        }
        
        table {
            border-collapse: initial;
            border: solid 1px #90badd !important;
            font-size: 11px !important;
        }

        td {
            border: solid 1px #90badd !important;
        }
        
        tr td tbody tr td {
            border: none !important;
        }
        
        input {
            border: solid 1px #e9e9e2 !important;
            box-shadow: none !important;
            width: 90% !important;
        }
        
        p {
            border: solid 1px #e9e9e2 !important;
            box-shadow: none !important;
            width: 100% !important;
            height: auto !important;
            text-align: left !important;
        }
        
        table .form-control {
            text-align: left !important;
            font-weight: normal !important;
        }
        
        .table > thead > tr > th {
            border-bottom: 1px solid #90badd !important;
            border-left: 1px solid #90badd !important;
            border-right: 1px solid #90badd !important;
        }
        
        th {
            font-weight: normal !important;
        }
        
        .bootstrap-table .table {
            border-collapse: initial !important;
            border-left: none !important;
            border-right: none !important;
            padding: 0 !important;
        }
        
        .bootstrap-table .table > thead > tr > th {
            border-bottom: 1px solid #90badd !important;
        }
        
        .fixed-table-container {
            border-color: #90badd !important;
        }
        
        .fixed-table-container thead th {
            border-left: 1px solid #90badd !important;
            font-size: 10px !important;
        }

        .fixed-table-container tbody td {
            border-left: solid 1px #90badd !important;
            white-space: normal !important;
            font-size: 10px !important;
        }
    }
</style>

<div class="content-wrapper hidden-print">
    <form class="form-horizontal" role="form" enctype="multipart/form-data">
        <section class="sub-header" style="height: 90px;">
            <div class="pull-left">
                <a href="/lotus-admin/my-process" class="btn btn-link "><i class="fa fa-angle-left"></i> 返回列表</a>
                <a id="checkRequest" href="javascript: void(0);" class="btn btn-primary btn-sm">查看业务单据</a>
                <a href="javascript: flowInstUpdate();" class="btn btn-warning btn-sm">更新审批状态</a>
            </div>
            <h4>
                <b id="status"></b>流程:<b id="formType"></b>申请
            </h4>
            <div class="pull-right">
                <button type="button" class="btn" id="opinion_print" style="background: #fff; display: none;"><i class="fa fa-print"></i> 打印</button>
            </div>
            <div class="box-header" id="navbarTop">
                <ul class="breadcrumb nav" style="margin-bottom: 0; padding-left: 0;">
                    <li><a href="#processBasic">概要</a></li>
                    <li><a href="#processFlow">流程图</a></li>
                    <li style="display: none;"><a href="#processFiles">上传附件</a></li>
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
                                        <label class="col-md-4 control-label">流程名称</label>
                                        <b class="col-md-8 col-sm-12 control-label" id="processName" style="overflow: hidden; white-space: nowrap; text-overflow: ellipsis;"></b>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label class="col-md-4 control-label">当前状态</label>
                                        <div class="col-md-8 col-sm-12 control-label" id="processInstStatus"></div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label class="col-md-4 control-label">发起人</label>
                                        <b class="col-md-8 col-sm-12 control-label" id="creatorName"></b>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label class="col-md-4 control-label">发起时间</label>
                                        <div class="col-md-8 col-sm-12 control-label" id="created"></div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label class="col-md-4 control-label">最后操作时间</label>
                                        <div class="col-md-8 col-sm-12 control-label" id="updated"></div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label class="col-md-4 control-label">流程分类</label>
                                        <div class="col-md-8 col-sm-12 control-label" id="bizType"></div>
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
                                    <ul class="nav nav-pills nav-justified step step-progress" id="leasingContract" style="display: none;">
                                        <li>
                                            <a href="javascript: void(0);">提交人<span class="caret"></span></a>
                                        </li>
                                        <li>
                                            <a href="javascript: void(0);">招商负责人<span class="caret"></span></a>
                                        </li>
                                        <li>
                                            <a href="javascript: void(0);">财法预审<span class="caret"></span></a>
                                        </li>
                                        <li>
                                            <a href="javascript: void(0);">财法负责人<span class="caret"></span></a>
                                        </li>
                                        <li>
                                            <a href="javascript: void(0);">业态负责人<span class="caret"></span></a>
                                        </li>
                                        <li>
                                            <a href="javascript: void(0);">总部招商负责人<span class="caret"></span></a>
                                        </li>
                                        <li>
                                            <a href="javascript: void(0);">总裁及地区相关领导<span class="caret"></span></a>
                                        </li>
                                        <li>
                                            <a href="javascript: void(0);">合同上传<span class="caret"></span></a>
                                        </li>
                                        <li>
                                            <a href="javascript: void(0);">合同收回<span class="caret"></span></a>
                                        </li>
                                        <li>
                                            <a href="javascript: void(0);">合同用印财法预审<span class="caret"></span></a>
                                        </li>
                                        <li>
                                            <a href="javascript: void(0);">合同用印财法负责人<span class="caret"></span></a>
                                        </li>
                                        <li>
                                            <a href="javascript: void(0);">合同用印总部招商负责人<span class="caret"></span></a>
                                        </li>
                                        <li>
                                            <a href="javascript: void(0);">合同用印总裁及地区相关领导<span class="caret"></span></a>
                                        </li>
                                        <li>
                                            <a href="javascript: void(0);">盖章合同上传<span class="caret"></span></a>
                                        </li>
                                    </ul>
                                    <ul class="nav nav-pills nav-justified step step-progress" id="lotusApprove" style="display: none;">
                                        <li>
                                            <a href="javascript: void(0);">开始审批<span class="caret"></span></a>
                                        </li>
                                        <li>
                                            <a href="javascript: void(0);">招商负责人审批<span class="caret"></span></a>
                                        </li>
                                        <li>
                                            <a href="javascript: void(0);">财法预审负责人<span class="caret"></span></a>
                                        </li>
                                        <li>
                                            <a href="javascript: void(0);">财法负责人<span class="caret"></span></a>
                                        </li>
                                        <li>
                                            <a href="javascript: void(0);">总部招商负责人<span class="caret"></span></a>
                                        </li>
                                        <li>
                                            <a href="javascript: void(0);">签呈负责人审批<span class="caret"></span></a>
                                        </li>
                                    </ul>
                                    <ul class="nav nav-pills nav-justified step step-progress" id="lotusSign" style="display: none;">
                                        <li>
                                            <a href="javascript: void(0);">开始审批<span class="caret"></span></a>
                                        </li>
                                        <li>
                                            <a href="javascript: void(0);">招商负责人审批<span class="caret"></span></a>
                                        </li>
                                        <li>
                                            <a href="javascript: void(0);">财法预审负责人<span class="caret"></span></a>
                                        </li>
                                        <li>
                                            <a href="javascript: void(0);">财法负责人<span class="caret"></span></a>
                                        </li>
                                        <li>
                                            <a href="javascript: void(0);">总部招商负责人<span class="caret"></span></a>
                                        </li>
                                        <li>
                                            <a href="javascript: void(0);">签呈负责人审批<span class="caret"></span></a>
                                        </li>
                                        <li>
                                            <a href="javascript: void(0);">用印文件上传<span class="caret"></span></a>
                                        </li>
                                        <li>
                                            <a href="javascript: void(0);">用印财法预审<span class="caret"></span></a>
                                        </li>
                                        <li>
                                            <a href="javascript: void(0);">用印财法负责人审批<span class="caret"></span></a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        
                        <div class="box box-default" id="processFiles" style="display: none;">    
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
                                                <td class="headTxt">用印文件</td>
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
                                        <label class="col-md-2 control-label"><span class="headTxt">文件</span>上传</label>
                                        <div class="col-md-10 col-sm-12">
                                             <div class="form-group input-group">
                                                <input type="text" id="fileName_reqFile" class="form-control" disabled placeholder="文件大小不超过10M" style="background-color: #fff; border: solid 1px rgb(210, 214, 222);">
                                                <input type="file" style="display: none;" onchange="javascript:$('input[id=\'fileName_reqFile\']').val(this.files[0].name);" accept="image/*,application/pdf" multiple />
                                                <div type="button" class="input-group-addon" id="reqUploadFile" style="padding: 6px 12px; font-size: 11px; cursor: pointer; border-left: 0 none; border-right: 0 none;"><i class="fa fa-upload"></i> 上传文件</div>
                                                <div type="button" class="input-group-addon" style="background-color: #3c8dbc; border-color: #367fa9; padding: 6px 12px; font-size: 11px; cursor: pointer; color: #fff;" onclick="javascript:$(this).parent().find('input[type=\'file\']').click();"><i class="fa fa-folder-open-o"></i> 选择文件 &hellip;</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <label class="col-md-2 control-label">其它文件上传</label>
                                        <div class="col-md-10 col-sm-12">
                                             <div class="form-group input-group">
                                                <input type="text" id="fileName_otherFiles" class="form-control" disabled placeholder="文件大小不超过10M" style="background-color: #fff; border: solid 1px rgb(210, 214, 222);">
                                                <input type="file" style="display: none;" onchange="javascript:$('input[id=\'fileName_otherFiles\']').val(this.files[0].name);" accept="image/*,application/pdf" multiple />
                                                <div type="button" class="input-group-addon" id="uploadFile_otherFiles" style="padding: 6px 12px; font-size: 11px; cursor: pointer; border-left: 0 none; border-right: 0 none;"><i class="fa fa-upload"></i> 上传文件</div>
                                                <div type="button" class="input-group-addon" style="background-color: #3c8dbc; border-color: #367fa9; padding: 6px 12px; font-size: 11px; cursor: pointer; color: #fff;" onclick="javascript:$(this).parent().find('input[type=\'file\']').click();"><i class="fa fa-folder-open-o"></i> 选择文件 &hellip;</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label class="col-md-5 control-label"></label>
                                        <div class="col-md-7 col-sm-12" style="text-align: left;">
                                            <button type="button" class="btn btn-info btn-sm" id="createToDoModify"><i class="fa fa-search icon-white"></i> <span class="hidden-xs">确定</span></button>
                                            <button type="button" class="btn btn-default btn-sm" data-dismiss="modal" aria-label="Close"><i class="fa fa-times icon-white"></i> <span class="hidden-xs">取消</span></button>
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

<div class="content-wrapper visible-print">
    <div class="text-red" style="position: relative; height: 60px; left: 0; top: 0; font-size: 18px; letter-spacing: 30px; line-height: 30px; font-weight: bold; text-align: center;">
        卜蜂莲花<br>签呈
    </div>
    <div class="box box-default">
        <div class="col-md-12">
            <div class="box-body">
                <div class="row">
                    <table class="table">
                        <tbody>
                            <tr>
                                <td align="center" style="background-color: #e6f2fb;">标题</td>
                                <td>
                                    <input id="applyReason" class="form-control" type="text" />
                                </td>
                                <td align="center" style="background-color: #e6f2fb;">单号</td>
                                <td>
                                    <input id="bizId" class="form-control" type="text" />
                                </td>
                            </tr>
                            <tr>
                                <td align="center" style="background-color: #e6f2fb;">申请部门</td>
                                <td>
                                    <input id="investmentContractModelMallSelect" class="form-control" type="text" />
                                </td>
                                <td align="center" style="background-color: #e6f2fb;">申请人</td>
                                <td>
                                    <input id="creatorName" class="form-control" type="text" />
                                </td>
                            </tr>
                            <tr>
                                <td align="center" style="background-color: #e6f2fb;">我方公司</td>
                                <td>
                                    <input id="mainSigningBody" class="form-control" type="text" />
                                </td>
                                <td align="center" style="background-color: #e6f2fb;">申请总金额</td>
                                <td>
                                    <input class="form-control money" id="amount" type="text" />
                                </td>
                            </tr>
                            <tr>
                                <td align="center" style="background-color: #e6f2fb;">紧急程度</td>
                                <td>
                                    <div>
                                        <input type="radio" name="urgencyDegree" value="正常" style="width: 20px !important; margin-top: 2px;">正常
                                        <input type="radio" name="urgencyDegree" value="重要" style="width: 20px !important; margin-top: 2px;">重要
                                        <input type="radio" name="urgencyDegree" value="紧急" style="width: 20px !important; margin-top: 2px;">紧急
                                    </div>
                                </td>
                                <td align="center" style="background-color: #e6f2fb;">联系电话</td>
                                <td>
                                    <input id="mobileNo" class="form-control" type="text" />
                                </td>
                            </tr>
                            <tr>
                                <td align="center" style="background-color: #e6f2fb;">申请类型</td>
                                <td>
                                    <div>
                                        <input type="checkbox" name="applyType" value="1" style="width: 20px !important; margin-top: 2px;">单元变动
                                        <input type="checkbox" name="applyType" value="5" style="width: 20px !important; margin-top: 2px;">用印申请
                                        <input type="checkbox" name="applyType" value="2" style="width: 20px !important; margin-top: 2px;">其他
                                    </div>
                                </td>
                                <td align="center" style="background-color: #e6f2fb;">申请日期</td>
                                <td>
                                     <input class="form-control" id="applyDate" type="text" />
                                </td>
                            </tr>
                            <tr>
                                <td align="center" style="background-color: #e6f2fb;">说明</td>
                                <td colspan="3">
                                    <p id="approveInfo" class="form-control"></p>
                                </td>
                            </tr>
                            <tr style="display: none;">
                                <td align="center" style="background-color: #e6f2fb;">印鉴名称</td>
                                <td>
                                    <div>
                                        <input type="checkbox" name="signName" value="1" style="width: 20px !important; margin-top: 2px;">合同章
                                        <input type="checkbox" name="signName" value="2" style="width: 20px !important; margin-top: 2px;">法人章
                                        <input type="checkbox" name="signName" value="3" style="width: 20px !important; margin-top: 2px;">公章
                                        <input type="checkbox" name="signName" value="4" style="width: 20px !important; margin-top: 2px;">财务章
                                        <input type="checkbox" name="signName" value="5" style="width: 20px !important; margin-top: 2px;">门店章
                                        <input type="checkbox" name="signName" value="6" style="width: 20px !important; margin-top: 2px;">工会章
                                    </div>
                                </td>
                                <td align="center" style="background-color: #e6f2fb;">法人章名称</td>
                                <td>
                                    <input id="corporationName" class="form-control" type="text" />
                                </td>
                            </tr>
                            <tr style="display: none;">
                                <td align="center" style="background-color: #e6f2fb;">对方公司</td>
                                <td>
                                    <input id="selectTenant" class="form-control" type="text" />
                                </td>
                                <td align="center" style="background-color: #e6f2fb;">用印份数</td>
                                <td>
                                    <input id="signNum" class="form-control" type="text" />
                                </td>
                            </tr>
                            <tr style="display: none;">
                                <td align="center" style="background-color: #e6f2fb;">用印文件名</td>
                                <td colspan="3">
                                    <textarea id="signFileName" class="form-control" name="approveInfo"></textarea>
                                </td>
                            </tr>
                            <tr>
                                <td align="center" style="background-color: #e6f2fb;">关联事项</td>
                                <td colspan="3" id="signRelation"></td>
                            </tr>
                            <tr align="center">
                                <td style="background-color: #e6f2fb;">附件</td>
                                <td colspan="3" id="fileListClone" style="text-align: left;"></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    
    <div class="box-body">
        <div class="col-md-12">
            <div class="row">
                <div class="bootstrap-table">
                    <div class="fixed-table-container">
                        <div class="fixed-table-body">
                            <table class="table">
                                <thead>
                                    <tr style="background-color: #e6f2fb;">
                                        <th>
                                            <div class="th-inner">审批</div>
                                            <div class="fht-cell"></div>
                                        </th>
                                        <th>
                                            <div class="th-inner">操作</div>
                                            <div class="fht-cell"></div>
                                        </th>
                                        <th>
                                            <div class="th-inner">执行人</div>
                                            <div class="fht-cell"></div>
                                        </th>
                                        <th>
                                            <div class="th-inner">状态</div>
                                            <div class="fht-cell"></div>
                                        </th>
                                        <th>
                                            <div class="th-inner">意见</div>
                                            <div class="fht-cell"></div>
                                        </th>
                                        <th>
                                            <div class="th-inner">开始日期</div>
                                            <div class="fht-cell"></div>
                                        </th>
                                        <th>
                                            <div class="th-inner">结束日期</div>
                                            <div class="fht-cell"></div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody id="approvalProcessClone"></tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="clearfix"></div>
            </div>
        </div>
    </div>
</div>

<?php include 'footer.php'; ?>