<?php
if(isset($_SESSION['lotus_admin_name']) && $_SESSION['lotus_admin_name'] == '马俊') {
    $scripts = $scripts .PHP_EOL. '        <script type="text/javascript" src="/views/assets/base/js/lotus-admin/create-tenant-admin.js?t='.date("Y-m-d").'"></script>'.PHP_EOL;
} else {
    $scripts = $scripts .PHP_EOL. '        <script type="text/javascript" src="/views/assets/base/js/lotus-admin/encrypted/create-tenant.js?t='.date("Y-m-d").'"></script>'.PHP_EOL;
}
?>

<?php include 'sidebar.php'; ?>

<div class="content-wrapper create-tenant">
    <form id="create-form" class="form-horizontal" role="form" enctype="multipart/form-data">
        <section class="sub-header" style="height: 90px;">
            <h4>
                创建商户
            </h4>
            <div class="pull-right">
                <a class="btn btn-link text-left" href="javascript:void(0);" onclick="javascript: confirmCancel('<i class=\'fa fa-question-circle\'></i> 确定要取消吗?','tenants');">取消</a>
                <button type="submit" class="btn btn-success btn-sm"><i class="fa fa-check icon-white"></i> <span class="hidden-xs">提交保存</span></button>
            </div>
            <div class="box-header" id="navbarTop">
                <ul class="breadcrumb nav" style="margin-bottom: 0; padding-left: 0;">
                    <li><a href="#tenantBasicInfo">基本信息</a></li>
                    <li><a href="#tenantInvoices">开票信息</a></li>
                    <li><a href="#tenantBanks">银行资料</a></li>
                    <li><a href="#tenantContacts">联系方式</a></li>
                    <li><a href="#tenantContactList">联系人</a></li>
                    <li><a href="#tenantCertificates">证照</a></li>
                </ul>
            </div>
        </section>

        <section class="content" style="margin-top: 140px;">
            <div id="webui">
                <div class="row">
                    <div class="col-md-12">
                        <div class="box box-default" id="tenantBasicInfo">    
                            <div class="box-header with-border">
                                <h3 class="box-title">基本信息</h3>
                                <div class="box-tools">
                                    <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="box-body">
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label for="tenantCode" class="col-md-4 control-label">商户编码</label>
                                        <div class="col-md-8 col-sm-12">
                                            <input class="form-control" type="text" id="tenantCode" name="tenantCode" placeholder="请填入原招商系统中的商户编码">
                                            <div id="errorcontainer-tenantCode" class="errorDiv"></div>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="capital" class="col-md-4 control-label">注册资金</label>
                                        <div class="col-md-8 col-sm-12">
                                            <input class="form-control money" type="text" id="capital" name="capital" onKeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))" />
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label for="name" class="col-md-4 control-label">名称 <span class="btn-box-tool-lg">*</span></label>
                                        <div class="col-md-8 col-sm-12 required">
                                            <input class="form-control" type="text" id="name" name="name">
                                            <div id="errorcontainer-name" class="errorDiv"></div>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="businessScope" class="col-md-4 control-label">经营范围</label>
                                        <div class="col-md-8 col-sm-12">
                                            <input class="form-control" type="text" id="businessScope" name="businessScope" />
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label for="type" class="col-md-4 control-label">类型 <span class="btn-box-tool-lg">*</span></label>
                                        <div class="col-md-8 col-sm-12">
                                            <select class="select2" id="type" name="type" style="width: 100%">
                                                <option value="">未选择</option>
                                                <option value="2">公司</option>
                                                <option value="1">个人</option>
                                            </select>
                                            <div id="errorcontainer-type" class="errorDiv"></div>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="uscc"  class="col-md-4 control-label">统一社会信用代码/身份证号码 <span class="btn-box-tool-lg">*</span></label>
                                        <div class="col-md-8 col-sm-12">
                                            <input class="form-control" type="text" id="uscc" name="uscc" required />
                                            <div id="errorcontainer-uscc" class="errorDiv"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="box box-default" id="tenantInvoices">    
                            <div class="box-header with-border">
                                <h3 class="box-title">开票信息</h3>
                                <div class="box-tools">
                                    <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="box-body">
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label for="regAddress" class="col-md-4 control-label">注册地址 <span class="btn-box-tool-lg">*</span></label>
                                        <div class="col-md-8 col-sm-12 required">
                                            <input class="form-control" type="text" id="regAddress" name="regAddress" />
                                            <div id="errorcontainer-regAddress" class="errorDiv"></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label for="deliveryAddress" class="col-md-4 control-label">账单地址</label>
                                        <div class="col-md-8 col-sm-12">
                                            <input class="form-control" type="text" id="deliveryAddress" name="deliveryAddress" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="box box-default" id="tenantBanks">    
                            <div class="box-header with-border">
                                <h3 class="box-title">银行资料</h3>
                                <div class="box-tools">
                                    <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="box-body">
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label for="bankName" class="col-md-4 control-label">银行名称 <span class="btn-box-tool-lg">*</span></label>
                                        <div class="col-md-8 col-sm-12 required">
                                            <input class="form-control" type="text" id="bankName" name="bankName" />
                                            <div id="errorcontainer-bankName" class="errorDiv"></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label for="bankAccount" class="col-md-4 control-label">银行账号 <span class="btn-box-tool-lg">*</span></label>
                                        <div class="col-md-8 col-sm-12 required">
                                            <input class="form-control" type="text" id="bankAccount" name="bankAccount" />
                                            <div id="errorcontainer-bankAccount" class="errorDiv"></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label for="bankProvince" class="col-md-4 control-label">银行省市 <span class="btn-box-tool-lg">*</span></label>
                                        <div class="col-md-5 col-sm-12 required" style="text-align: left; padding-right: 0px;">
                                            <select class="select2" id="bankProvince" name="bankProvince" style="width: 100%"></select>
                                            <div id="errorcontainer-bankProvince" class="errorDiv"></div>
                                        </div>
                                        <div class="col-md-3 col-sm-12 required" style="text-align: left; padding-left: 2px;">
                                            <select class="select2" id="bankCity" name="bankCity" style="width: 100%"></select>
                                            <div id="errorcontainer-bankCity" class="errorDiv"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="box box-default" id="tenantContacts">    
                            <div class="box-header with-border">
                                <h3 class="box-title">联系方式</h3>
                                <div class="box-tools">
                                    <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="box-body">
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label for="shareHolder" class="col-md-4 control-label">企业法人</label>
                                        <div class="col-md-8 col-sm-12">
                                            <input class="form-control" type="text" id="shareHolder" name="shareHolder" />
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="mail" class="col-md-4 control-label">送达邮箱</label>
                                        <div class="col-md-8 col-sm-12">
                                            <input class="form-control" type="text" id="mail" name="mail" />
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label for="remarkFirst" class="col-md-4 control-label">办公地址</label>
                                        <div class="col-md-8 col-sm-12">
                                            <input class="form-control" type="text" id="remarkFirst" name="remarkFirst" />
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label for="phoneNum" class="col-md-4 control-label">联系电话</label>
                                        <div class="col-md-8 col-sm-12">
                                            <input class="form-control" type="text" id="phoneNum" name="phoneNum" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="box box-default" id="tenantContactList">    
                            <div class="box-header with-border">
                                <h3 class="box-title">联系人</h3>
                                <div class="box-tools">
                                    <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
                                    </button>
                                </div>
                                <div class="pull-right" style="margin-right: 40px;">
                                    <a href="javascript:void(0);" onClick="addRowContactList()" style="margin-right: 10px;">
                                        <i class="fa fa-plus-circle" style="color: #84CC3D; font-size: 16px; vertical-align: bottom;"></i> 增加行
                                    </a>
                                </div>
                            </div>
                            <div class="box-body">
                                <div class="col-md-12">
                                    <div class="bootstrap-table">
                                        <div class="fixed-table-container">
                                            <div class="fixed-table-body">
                                                <table class="table table-striped snipe-table table-responsive" style="margin-top: 0">
                                                    <thead id="assetsListingTable-sticky-header">
                                                        <tr>
                                                            <th>
                                                                <div class="th-inner">行</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">姓名</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">身份证号</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">岗位</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">分类</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">手机</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">办公电话</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">电子邮件</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">详细地址</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">线上签章人</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">接收财函</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">接收法函</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">操作</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody id="contactList"></tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="box box-default" id="tenantCertificates">    
                            <div class="box-header with-border">
                                <h3 class="box-title">证照</h3>
                                <div class="box-tools">
                                    <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="box-body">
                                <div class="col-md-12">
                                    <h5><i class="fa fa-exclamation-triangle"></i> 请先提交保存商户，然后在编辑商户时再上传相关证照。</h5>
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