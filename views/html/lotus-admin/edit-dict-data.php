<?php
$scripts = $scripts . '<script type="text/javascript" src="/views/assets/base/js/lotus-admin/edit-dict-data-admin.js"></script>';
?>

<?php include 'sidebar.php'; ?>

<div class="content-wrapper">
    <section class="content-header">
        <h1 class="pull-left">
            修改数据
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
                            <form id="edit-dict-data-form" class="form-horizontal" role="form" enctype="multipart/form-data">
                                <div class="form-group">
                                    <label for="dictName"  class="col-md-3 control-label">数据名称 <span class="btn-box-tool-lg">*</span></label>
                                    <div class="col-md-7 col-sm-12 required">
                                        <input class="form-control" type="text" id="dictName" name="dictName" />
                                        <div id="errorcontainer-dictName" class="errorDiv"></div>
                                    </div>
                                </div>
                                
                                <div class="form-group">
                                    <label for="dictCode" class="col-md-3 control-label">数据代码</label>
                                    <div class="col-md-7 col-sm-12">
                                        <input class="form-control" type="text" id="dictCode" name="dictCode" readonly>
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
                                
                                <div class="form-group">
                                    <div class="col-md-12">
                                        <p>p.s. 数据描述中正柜租赁请填1，pop-up租赁请填2，kiosk租赁请填3，广告位租赁请填4，场地租赁请填5，用逗号隔开。如1,2,3</p>
                                    </div>
                                </div>
                                                       
                                <div class="box-footer text-right">
                                    <a class="btn btn-link text-left" href="/lotus-admin/dict">取消</a>
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