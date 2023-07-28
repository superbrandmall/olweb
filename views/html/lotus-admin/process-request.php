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
            <h4>
                卜蜂莲花签呈
            </h4>
            <div class="pull-right">
                <a class="btn btn-link text-left" href="javascript:void(0);" onclick="javascript: confirmCancel('<i class=\'fa fa-question-circle\'></i> 确定要取消吗?','tenants');">取消</a>
                <button type="submit" class="btn btn-success btn-sm"><i class="fa fa-check icon-white"></i> <span class="hidden-xs">提交保存</span></button>
            </div>
            <div class="box-header" id="navbarTop">
                <ul class="breadcrumb nav" style="margin-bottom: 0; padding-left: 0;">
                    <li><a href="#processBasicInfo">概要</a></li>
                    <li><a href="#brandContacts">联系方式</a></li>
                    <li><a href="#brandCertificates">证照</a></li>
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
                                <div class="col-md-12">
                                    <div class="col-md-12">
                                        <label class="col-md-2 control-label" for="urgencyDegree">紧急程度</label>
                                        <div class="col-md-2 col-sm-2">
<!--                                            <div class="form-group required">
                                                <select class="select2" id="urgencyDegree" name="urgencyDegree" style="width: 100%">
                                                    <option value="正常">正常</option>
                                                    <option value="重要">重要</option>
                                                    <option value="紧急">紧急</option>
                                                </select>
                                                <div id="errorcontainer-urgencyDegree" class="errorDiv"></div>
                                            </div>-->
                                            <div class="form-group">
                                                <label class="radio-inline">
                                                    <input type="radio" name="optionsRadiosInline" id="optionsRadiosInline1" value="option1" checked="">1
                                                </label>
                                                <label class="radio-inline">
                                                    <input type="radio" name="optionsRadiosInline" id="optionsRadiosInline2" value="option2">2
                                                </label>
                                                <label class="radio-inline">
                                                    <input type="radio" name="optionsRadiosInline" id="optionsRadiosInline3" value="option3">3
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <label class="col-md-2 control-label" for="applyReason">主旨<span class="btn-box-tool-lg">*</span></label>
                                        <div class="col-md-10 col-sm-12">
                                            <div class="form-group required">
                                                <textarea class="form-control" id="applyReason" name="applyReason" rows="1"></textarea>
                                                <div id="errorcontainer-applyReason" class="errorDiv"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <label class="col-md-2 control-label" for="remarks">说明<span class="btn-box-tool-lg">*</span></label>
                                        <div class="col-md-10 col-sm-12">
                                            <div class="form-group required">
                                                <textarea class="form-control" id="remarks" name="remarks" rows="7" placeholder="理由,数据,附件,建议......"></textarea>
                                                <div id="errorcontainer-remarks" class="errorDiv"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="box box-default" id="approvalProcess" style="min-height: 450px;">   
                            <div class="box-header with-border">
                                <h3 class="box-title">审批流程</h3>
                                <div class="box-tools">
                                    <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="box-body">
                                <div class="col-md-3">
                                    <div class="form-group" id="Lotus_leasing_head">
                                        <label class="col-md-5 control-label"> <span class="btn-box-tool-lg">*</span></label>
                                        <div class="col-md-7 col-sm-12 required">
                                            <select class="select2" style="width: 100%"></select>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="form-group" id="finance_pre_check">
                                        <label class="col-md-5 control-label"> <span class="btn-box-tool-lg">*</span></label>
                                        <div class="col-md-7 col-sm-12 required">
                                            <select class="select2" style="width: 100%"></select>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="form-group" id="legal_pre_check">
                                        <label class="col-md-5 control-label"> <span class="btn-box-tool-lg">*</span></label>
                                        <div class="col-md-7 col-sm-12 required">
                                            <select class="select2" style="width: 100%"></select>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="form-group" id="66bfb352-903b-490a-a25b-4c554bc16756">
                                        <label class="col-md-5 control-label"> <span class="btn-box-tool-lg">*</span></label>
                                        <div class="col-md-7 col-sm-12 required">
                                            <select class="select2" style="width: 100%"></select>
                                        </div>
                                    </div>
                                </div>
                                <div class="clearfix"></div>
                                <div class="col-md-3">
                                    <div class="form-group" id="4381cd4e-b984-4641-8a99-15242faae0eb">
                                        <label class="col-md-5 control-label"> <span class="btn-box-tool-lg">*</span></label>
                                        <div class="col-md-7 col-sm-12 required">
                                            <select class="select2" style="width: 100%"></select>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="form-group" id="8d2794df-c15f-4d68-9f8e-8b847f6191db">
                                        <label class="col-md-5 control-label"></label>
                                        <div class="col-md-7 col-sm-12">
                                            <!--<select class="select2" multiple="multiple" style="width: 100%"></select>-->
                                            <select class="select2" style="width: 100%"></select>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="form-group" id="hq_leasing_head">
                                        <label class="col-md-5 control-label"></label>
                                        <div class="col-md-7 col-sm-12">
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
                                            <a href="javascript: void(0);">审批人: Lotus招商负责人<span class="caret"></span></a>
                                        </li>
                                        <li class="active">
                                            <a href="javascript: void(0);">审批人: 财法预审<span class="caret"></span></a>
                                        </li>
                                        <li class="active">
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