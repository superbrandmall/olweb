<?php
$scripts = $scripts . '<script type="text/javascript" src="/views/assets/base/js/brands-admin/create-brand-contact-admin.js"></script>';
?>

<?php include 'sidebar.php'; ?>

<div class="content-wrapper">
    <section class="content-header" style="padding-bottom: 30px;">
        <h1 class="pull-left">
            新增品牌联系人
        </h1>
        <div class="pull-right">
            <a href="javascript: window.history.go(-1);" class="btn btn-primary pull-right">
                返回
            </a>
        </div>
    </section>
    
    <section class="content">
        <div id="webui">
            <div class="row">
                <div class="col-md-12">
                    <div class="callout callout-info" style="display: none;">
                        新增品牌成功!
                    </div>
                    <div class="callout callout-danger" style="display: none;">
                        新增联系人失败!
                    </div>
                    <div class="callout callout-warning" style="display: none;">
                        该联系人已存在!
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-8 col-md-offset-2">
                    <div class="box box-default">
                        <div class="box-header with-border">
                            <h3 class="box-title">
                            </h3>
                            <div class="box-tools pull-right">
                                <button class="slideout-menu-toggle btn btn-box-tool btn-box-tool-lg" data-toggle="tooltip" title="Help"><i class="fa fa-question"></i></button>
                            </div>
                        </div>

                        <div class="box-body">
                            <form id="create-form" class="form-horizontal" role="form" enctype="multipart/form-data">
                                <div class="form-group">
                                    <label class="col-md-3 control-label" for="namecard">联系人名片 <span style="margin-right:10px;"></span></label>
                                    <div class="col-md-7">
                                        <label class="btn btn-default">
                                            选择文件...
                                            <input type="hidden" name="MAX_FILE_SIZE" value="9000000">
                                            <input type="hidden" id="hidden_namecard" name="hidden_namecard">
                                            <input type="file" name="namecard" id="namecard" data-maxsize="9000000" accept="image/jpeg,image/png" style="width: 0;height: 0;">
                                        </label>
                                        <span class="help-block" id="namecard-status">文件类型可选择jpg、png，文件最大尺寸不超过10M。<br><i class="fa fa-exclamation-circle"></i> 图片请尽量保持清晰完整。</span>
                                        <span class='label label-default' id="namecard-info"></span>
                                        <div id="errorcontainer-namecard" class="errorDiv"></div>
                                    </div>
                                    <div class="col-md-4 col-md-offset-3">
                                        <img id="imagePreview" style="max-width: 200px; max-height: 100px;">
                                    </div>
                                </div>
                                
                                <div class="form-group">
                                    <label for="contact_name_1" class="col-md-3 control-label">联系人姓名 <span class="btn-box-tool-lg">*</span></label>
                                    <div class="col-md-7 col-sm-12 required">
                                        <input class="form-control" type="text" id="contact_name_1" name="contact_name_1" />
                                        <div id="errorcontainer-contact_name_1" class="errorDiv"></div>
                                    </div>
                                </div>
                                
                                <div class="form-group">
                                    <label for="contact_phone_1"  class="col-md-3 control-label">联系人电话 <span class="btn-box-tool-lg">*</span></label>
                                    <div class="col-md-7 col-sm-12 required">
                                        <input class="form-control" type="text" id="contact_phone_1" name="contact_phone_1" />
                                        <div id="errorcontainer-contact_phone_1" class="errorDiv"></div>
                                    </div>
                                </div>
                                
                                <div class="form-group">
                                    <label for="company_name" class="col-md-3 control-label">联系人公司 <span class="btn-box-tool-lg">*</span></label>
                                    <div class="col-md-7 col-sm-12 required">
                                        <input class="form-control" type="text" id="company_name" name="company_name" />
                                        <div id="errorcontainer-company_name" class="errorDiv"></div>
                                    </div>
                                </div>
                                
                                <div class="form-group">
                                    <label for="title"  class="col-md-3 control-label">联系人职位 <span class="btn-box-tool-lg">*</span></label>
                                    <div class="col-md-7 col-sm-12 required">
                                        <input class="form-control" type="text" id="title" name="title" />
                                        <div id="errorcontainer-title" class="errorDiv"></div>
                                    </div>
                                </div>
                                
                                <div class="form-group">
                                    <label for="wechat"  class="col-md-3 control-label">联系人微信号 <span style="margin-right:10px;"></span></label>
                                    <div class="col-md-7 col-sm-12">
                                        <input class="form-control" type="text" id="wechat" name="wechat" />
                                    </div>
                                </div>
                                
                                <div class="form-group">
                                    <label for="email"  class="col-md-3 control-label">联系人邮箱 <span style="margin-right:10px;"></span></label>
                                    <div class="col-md-7 col-sm-12">
                                        <input class="form-control" type="text" id="email" name="email" />
                                        <div id="errorcontainer-email" class="errorDiv"></div>
                                    </div>
                                </div>

                                <div class="box-footer text-right">
                                    <a class="btn btn-link text-left" href="/brands-admin/brands">取消</a>
                                    <button type="submit" class="btn btn-success"><i class="fa fa-check icon-white"></i> 保存</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <div class="slideout-menu">
                    <a href="#" class="slideout-menu-toggle pull-right">×</a>
                    <h3>
                        注意事项
                    </h3>
                    <p><span class="btn-box-tool-lg">*</span> 号代表该栏目为必填。</p>
                </div>
            </div>

        </div>

    </section>

</div>

<?php include 'footer.php'; ?>