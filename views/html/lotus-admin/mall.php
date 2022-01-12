<?php
$scripts = $scripts . '<script src="/views/assets/plugins/datepicker/bootstrap-datepicker.min.js" type="text/javascript"></script>'
    . '<script src="/views/assets/plugins/datepicker/bootstrap-datepicker.zh-CN.min.js" type="text/javascript"></script>';
?>
<link href="/views/assets/plugins/datepicker/bootstrap-datepicker.css" rel="stylesheet" type="text/css" media="all" />

<?php include 'sidebar.php'; ?>

<div class="content-wrapper">
    <section class="content-header" style="padding-bottom: 30px;">
        <h1 class="pull-left">
            门店详情
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
                        编辑门店成功!
                    </div>
                    <div class="callout callout-danger" style="display: none;">
                        编辑门店失败!
                    </div>
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
                            <form id="edit-form" class="form-horizontal" role="form" enctype="multipart/form-data">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="mallCode" class="col-md-6 control-label">门店代码</label>
                                        <div class="col-md-6 col-sm-12 required">
                                            <input class="form-control" type="text" id="mallCode" name="mallCode" disabled />
                                            <div id="errorcontainer-mallCode" class="errorDiv"></div>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="mallName" class="col-md-6 control-label">门店名称</label>
                                        <div class="col-md-6 col-sm-12 required">
                                            <input class="form-control" type="text" id="mallName" name="mallName" disabled />
                                            <div id="errorcontainer-mallName" class="errorDiv"></div>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="address" class="col-md-6 control-label">门店地址</label>
                                        <div class="col-md-6 col-sm-12 required">
                                            <input class="form-control" type="text" id="address" name="address" disabled />
                                            <div id="errorcontainer-address" class="errorDiv"></div>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="uscc" class="col-md-6 control-label">社会信用代码</label>
                                        <div class="col-md-6 col-sm-12 required">
                                            <input class="form-control" type="text" id="uscc" name="uscc" />
                                            <div id="errorcontainer-uscc" class="errorDiv"></div>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="regAddress" class="col-md-6 control-label">注册地址</label>
                                        <div class="col-md-6 col-sm-12 required">
                                            <input class="form-control" type="text" id="regAddress" name="regAddress" />
                                            <div id="errorcontainer-regAddress" class="errorDiv"></div>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="bankName" class="col-md-6 control-label">开户银行</label>
                                        <div class="col-md-6 col-sm-12 required">
                                            <input class="form-control" type="text" id="bankName" name="bankName" />
                                            <div id="errorcontainer-bankName" class="errorDiv"></div>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="bankAccount" class="col-md-6 control-label">银行账号</label>
                                        <div class="col-md-6 col-sm-12 required">
                                            <input class="form-control" type="text" id="bankAccount" name="bankAccount" />
                                            <div id="errorcontainer-bankAccount" class="errorDiv"></div>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="cityDistrict" class="col-md-6 control-label">所属区域</label>
                                        <div class="col-md-6 col-sm-12 required">
                                            <input class="form-control" type="text" id="cityDistrict" name="cityDistrict" />
                                            <div id="errorcontainer-cityDistrict" class="errorDiv"></div>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="deliveryAddress" class="col-md-6 control-label">邮寄地址</label>
                                        <div class="col-md-6 col-sm-12 required">
                                            <input class="form-control" type="text" id="deliveryAddress" name="deliveryAddress" />
                                            <div id="errorcontainer-deliveryAddress" class="errorDiv"></div>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="phoneNum" class="col-md-6 control-label">联系电话</label>
                                        <div class="col-md-6 col-sm-12 required">
                                            <input class="form-control" type="text" id="phoneNum" name="phoneNum" />
                                            <div id="errorcontainer-phoneNum" class="errorDiv"></div>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="mail" class="col-md-6 control-label">联系邮箱</label>
                                        <div class="col-md-6 col-sm-12 required">
                                            <input class="form-control" type="text" id="mail" name="mail" />
                                            <div id="errorcontainer-mail" class="errorDiv"></div>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="building" class="col-md-6 control-label">楼宇数量</label>
                                        <div class="col-md-6 col-sm-12 required">
                                            <input class="form-control" type="text" id="building" name="building" />
                                            <div id="errorcontainer-building" class="errorDiv"></div>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="startDate" class="col-md-6 control-label">合同开始日</label>
                                        <div class="col-md-6 col-sm-12 required">
                                            <input class="form-control date-picker" type="text" id="startDate" name="startDate" data-plugin="datepicker" readonly style="border: 1px solid #ccc; background: #fff;" />
                                            <div id="errorcontainer-startDate" class="errorDiv"></div>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="endDate" class="col-md-6 control-label">合同终止日</label>
                                        <div class="col-md-6 col-sm-12 required">
                                            <input class="form-control date-picker" type="text" id="endDate" name="endDate" data-plugin="datepicker" readonly style="border: 1px solid #ccc; background: #fff;" />
                                            <div id="errorcontainer-endDate" class="errorDiv"></div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="box-footer text-right">
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