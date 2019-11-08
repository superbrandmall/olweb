<?php
$scripts = $scripts . '<script type="text/javascript" src="/views/assets/base/js/brands-admin/ai-test-admin.js"></script>';
?>

<?php include 'sidebar.php'; ?>

<div class="content-wrapper">
    <section class="content-header" style="padding-bottom: 30px;">
        <h1 class="pull-left">
            AI图像识别
        </h1>
    </section>
    
    <section class="content">
        <div id="webui">
            <div class="row">
                <div class="col-md-12">
                    <div class="callout callout-info" style="display: none;">
                        成功!
                    </div>
                    <div class="callout callout-danger" style="display: none;">
                        失败!
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
                            <form id="image-detect-form" class="form-horizontal" role="form" enctype="multipart/form-data">
                                <div class="form-group">
                                    <label class="col-md-3 control-label" for="brand_logo">店铺logo <span style="margin-right:10px;"></span></label>
                                    <div class="col-md-7">
                                        <label class="btn btn-default">
                                            选择文件...
                                            <input type="hidden" name="MAX_FILE_SIZE" value="9000000">
                                            <input type="hidden" id="hidden_brand_logo" name="hidden_brand_logo">
                                            <input type="file" name="brand_logo" id="brand_logo" data-maxsize="9000000" accept="image/jpeg,image/png" style="width: 0;height: 0;">
                                        </label>
                                        <span class="help-block" id="brand_logo-status">文件类型可选择jpg、png，文件最大尺寸不超过4M。<br><i class="fa fa-exclamation-circle"></i> 图片请尽量保持清晰完整。</span>
                                        <span class='label label-default' id="brand_logo-info"></span>
                                        <div id="errorcontainer-brand_logo" class="errorDiv"></div>
                                    </div>
                                    <div class="col-md-4 col-md-offset-3">
                                        <img id="imagePreview" style="max-width: 200px; max-height: 100px;">
                                    </div>
                                </div>
                                
                                <div class="form-group">
                                    <label for="brand_name" class="col-md-3 control-label">品牌名</label>
                                    <div class="col-md-7 col-sm-12 required">
                                        <input class="form-control" type="text" id="brand_name" name="brand_name" />
                                        <div id="errorcontainer-brand_name" class="errorDiv"></div>
                                    </div>
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