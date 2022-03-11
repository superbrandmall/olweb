<?php
$scripts = $scripts . '<script type="text/javascript" src="/views/assets/base/js/lotus-admin/create-dict-data-admin.js"></script>'.PHP_EOL;
?>

<?php include 'sidebar.php'; ?>

<div class="content-wrapper">
    <form id="create-dict-data-form" class="form-horizontal" role="form" enctype="multipart/form-data">
        <section class="sub-header">
            <h4>
                新建数据
            </h4>
            <div class="pull-right">
                <a href="javascript: window.history.go(-1);" class="btn btn-primary btn-sm">
                返回
            </a>
                <button type="submit" class="btn btn-success btn-sm"><i class="fa fa-check icon-white"></i> 保存</button>
            </div>
        </section>

        <section class="content" style="margin-top: 90px;">
            <div id="webui">
                <div class="row">
                    <div class="col-md-12">
                        <div class="callout callout-danger" style="display: none;"></div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <div class="box box-default">
                            <div class="box-header with-border">
                                <h3 class="box-title">
                                </h3>
                                <div class="box-tools pull-right">
                                    <button class="slideout-menu-toggle btn btn-box-tool btn-box-tool-lg" data-toggle="tooltip" title="Help"><i class="fa fa-question"></i></button>
                                </div>
                            </div>

                            <div class="box-body">
                                <div class="form-group">
                                    <label for="dictTypeCode"  class="col-md-3 control-label">类型代码</label>
                                    <div class="col-md-7 col-sm-12">
                                        <input class="form-control" type="text" id="dictTypeCode" name="dictTypeCode" readonly />
                                    </div>
                                </div>
                                
                                <div class="form-group">
                                    <label for="dictName"  class="col-md-3 control-label">数据名称 <span class="btn-box-tool-lg">*</span></label>
                                    <div class="col-md-7 col-sm-12 required">
                                        <input class="form-control" type="text" id="dictName" name="dictName" />
                                        <div id="errorcontainer-dictName" class="errorDiv"></div>
                                    </div>
                                </div>
                                
                                <div class="form-group">
                                    <label for="dictCode" class="col-md-3 control-label">数据代码 <span class="btn-box-tool-lg">*</span></label>
                                    <div class="col-md-7 col-sm-12 required">
                                        <input class="form-control" type="text" id="dictCode" name="dictCode">
                                        <div id="errorcontainer-dictCode" class="errorDiv"></div>
                                    </div>
                                </div>
                                
                                <div class="form-group">
                                    <label for="dictOrder" class="col-md-3 control-label">数据顺序 <span class="btn-box-tool-lg">*</span></label>
                                    <div class="col-md-7 col-sm-12 required">
                                        <input class="form-control" type="number" id="dictOrder" name="dictOrder">
                                        <div id="errorcontainer-dictOrder" class="errorDiv"></div>
                                    </div>
                                </div>
                                
                                <div class="form-group">
                                    <label for="dictInfo" class="col-md-3 control-label">数据描述</label>
                                    <div class="col-md-7 col-sm-12">
                                        <input class="form-control" type="text" id="dictInfo" name="dictInfo">
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