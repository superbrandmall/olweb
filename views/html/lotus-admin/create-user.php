<?php
$scripts = $scripts . '<script type="text/javascript" src="/views/assets/base/js/lotus-admin/create-user-admin.js"></script>';
?>

<?php include 'sidebar.php'; ?>

<div class="content-wrapper">
    <section class="content-header" style="padding-bottom: 30px;">
        <h1 class="pull-left">
            新建用户
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
                    <div class="callout callout-danger" style="display: none;"></div>
                    <div class="callout callout-warning" style="display: none;"></div>
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
                            <form id="create-form" class="form-horizontal" role="form" enctype="multipart/form-data">
                                <div class="form-group">
                                    <label for="name" class="col-md-3 control-label">姓名 <span class="btn-box-tool-lg">*</span></label>
                                    <div class="col-md-7 col-sm-12 required">
                                        <input class="form-control" type="text" id="name" name="name">
                                        <div id="errorcontainer-name" class="errorDiv"></div>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label for="mobile"  class="col-md-3 control-label">手机 <span class="btn-box-tool-lg">*</span></label>
                                    <div class="col-md-7 col-sm-12 required">
                                        <input class="form-control" type="text" id="mobile" name="mobile" />
                                        <div id="errorcontainer-mobile" class="errorDiv"></div>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label for="email"  class="col-md-3 control-label">邮箱 <span class="btn-box-tool-lg">*</span></label>
                                    <div class="col-md-7 col-sm-12 required">
                                        <input class="form-control" type="email" id="email" name="email" />
                                        <div id="errorcontainer-email" class="errorDiv"></div>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label for="department" class="col-md-3 control-label">门店 <span class="btn-box-tool-lg">*</span></label>
                                    <div class="col-md-7 required">
                                        <select class="select2" id="department" name="department" style="width: 100%">
                                            <option value="">未选择</option>
                                            <option value="SC033">川沙店</option>
                                            <option value="SC001">杨高南路店</option>
                                            <option value="SC005">上南店</option>
                                            <option value="SC011">杨高北路店</option>
                                            <option value="SC043">杨高中路店</option>
                                            <option value="SC078">浦江店</option>
                                            <option value="SC145">临港店</option>
                                            <option value="SC055">文诚店</option>
                                            <option value="SC027">岳阳店</option>
                                            <option value="SC126">牡丹江路店</option>
                                            <option value="SC060">蕴川店</option>
                                            <option value="SC082">新港店</option>
                                            <option value="SC010">汶水店</option>
                                            <option value="SC040">保德店</option>
                                            <option value="SC041">南奉店</option>
                                            <option value="SC127">易买得-南桥店</option>
                                            <option value="SC050">金山店</option>
                                        </select>
                                        <div id="errorcontainer-department" class="errorDiv"></div>
                                    </div>
                                </div>
                                
                                <div class="form-group">
                                    <label for="type" class="col-md-3 control-label">分类 <span class="btn-box-tool-lg">*</span></label>
                                    <div class="col-md-7 required">
                                        <select class="select2" id="type" name="type" style="width: 100%">
                                            <option value="">未选择</option>
                                            <option value="10" selected>莲花租户</option>
                                        </select>
                                        <div id="errorcontainer-type" class="errorDiv"></div>
                                    </div>
                                </div>
                                
                                <div class="form-group" style="display: none;">
                                    <label for="contract" class="col-md-3 control-label">品牌 <span class="btn-box-tool-lg">*</span></label>
                                    <div class="col-md-7 required">
                                        <select class="select2" id="contract" name="contract" style="width: 100%"></select>
                                        <div id="errorcontainer-contract" class="errorDiv"></div>
                                    </div>
                                </div>
                                
                                <div class="box-footer text-right">
                                    <a class="btn btn-link text-left" href="/lotus-admin/brands">取消</a>
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