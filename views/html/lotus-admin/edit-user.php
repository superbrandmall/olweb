<?php
$scripts = $scripts . '<script type="text/javascript" src="/views/assets/base/js/lotus-admin/edit-user-admin.js"></script>'.PHP_EOL;
?>

<?php include 'sidebar.php'; ?>

<div class="content-wrapper">
    <form id="create-form" class="form-horizontal" role="form" enctype="multipart/form-data">
        <section class="sub-header">
            <h4>
                编辑用户
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
                                    <label for="department" class="col-md-3 control-label">项目 <span class="btn-box-tool-lg">*</span></label>
                                    <div class="col-md-7 required">
                                        <select class="select2" id="department" name="department" style="width: 100%">
                                            <option class="no-remove" value="">未选择</option>
                                            <option value="SC033">川沙店[SC033]</option>
                                            <option value="SC001">杨高南路店[SC001]</option>
                                            <option value="SC005">上南店[SC005]</option>
                                            <option value="SC011">杨高北路店[SC011]</option>
                                            <option value="SC043">杨高中路店[SC043]</option>
                                            <option value="SC078">浦江店[SC078]</option>
                                            <option value="SC145">临港店[SC0145]</option>
                                            <option value="SC055">松江文诚店[SC055]</option>
                                            <option value="SC027">松江岳阳店[SC027]</option>
                                            <option value="SC126">牡丹江店[SC0126]</option>
                                            <option value="SC060">蕴川店[SC060]</option>
                                            <option value="SC082">新港店[SC082]</option>
                                            <option value="SC010">汶水店[SC010]</option>
                                            <option value="SC040">保德店[SC040]</option>
                                            <option value="SC041">南奉店[SC041]</option>
                                            <option value="SC127">南桥店[SC127]</option>
                                            <option value="SC050">金山店[SC050]</option>
                                            <option value="SC026">解放南路店[SC026]</option>
                                            <option value="SC130">大学路店[SC130]</option>
                                            <option value="SC138">中山北路店[SC138]</option>
                                            <option value="SC034">长江路店[SC034]</option>
                                            <option value="SC124">花桥店[SC124]</option>
                                            <option value="SC140">锡山东亭店[SC140]</option>
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