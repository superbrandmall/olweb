<?php
$scripts = $scripts . '<script type="text/javascript" src="/views/assets/base/js/lotus-admin/create-tenant-admin.js"></script>';
?>

<?php include 'sidebar.php'; ?>

<div class="content-wrapper">
    <section class="content-header" style="padding-bottom: 30px;">
        <h1 class="pull-left">
            创建租户
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
                        创建租户成功!
                    </div>
                    <div class="callout callout-danger" style="display: none;">
                        创建租户失败!
                    </div>
                    <div class="callout callout-warning" style="display: none;">
                        该租户已存在!
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
                                    <label for="name" class="col-md-3 control-label">租户名称 <span class="btn-box-tool-lg">*</span></label>
                                    <div class="col-md-7 col-sm-12 required">
                                        <input class="form-control" type="text" id="name" name="name">
                                        <div id="errorcontainer-name" class="errorDiv"></div>
                                    </div>
                                </div>
                                
                                <div class="form-group">
                                    <label for="tenantCode" class="col-md-3 control-label">租户编号 <span class="btn-box-tool-lg">*</span></label>
                                    <div class="col-md-7 col-sm-12 required">
                                        <input class="form-control" type="text" id="tenantCode" name="tenantCode">
                                        <div id="errorcontainer-tenantCode" class="errorDiv"></div>
                                    </div>
                                </div>
                                
                                <div class="form-group">
                                    <label for="type" class="col-md-3 control-label">类型 <span class="btn-box-tool-lg">*</span></label>
                                    <div class="col-md-7 required">
                                        <select class="select2" id="type" name="type" style="width: 100%">
                                            <option value="">未选择</option>
                                            <option value="2">公司</option>
                                            <option value="1">个人</option>
                                        </select>
                                        <div id="errorcontainer-type" class="errorDiv"></div>
                                    </div>
                                </div>
                                
                                <div class="form-group">
                                    <label for="businessScope" class="col-md-3 control-label">行业</label>
                                    <div class="col-md-7 col-sm-12">
                                        <input class="form-control" type="text" id="businessScope" name="businessScope" />
                                        <div id="errorcontainer-businessScope" class="errorDiv"></div>
                                    </div>
                                </div>
                                
                                <div class="form-group">
                                    <label for="capital" class="col-md-3 control-label">注册资本</label>
                                    <div class="col-md-7 col-sm-12">
                                        <input class="form-control" type="number" id="capital" name="capital" />
                                        <div id="errorcontainer-capital" class="errorDiv"></div>
                                    </div>
                                </div>
                                
                                <div class="form-group">
                                    <label for="uscc"  class="col-md-3 control-label">组织机构代码证</label>
                                    <div class="col-md-7 col-sm-12">
                                        <input class="form-control" type="text" id="uscc" name="uscc" />
                                        <div id="errorcontainer-uscc" class="errorDiv"></div>
                                    </div>
                                </div>
                                
                                <div class="box-footer text-right">
                                    <a class="btn btn-link text-left" href="/lotus-admin/tenants">取消</a>
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
                    <p><span class="btn-box-tool-lg">*</span> Silence is gold</p>
                </div>
            </div>

        </div>

    </section>

</div>

<?php include 'footer.php'; ?>