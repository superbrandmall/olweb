<?php
if(isset($_SESSION['lotus_admin_name']) && $_SESSION['lotus_admin_name'] == '马俊') {
    $scripts = $scripts .PHP_EOL. '        <script type="text/javascript" src="/views/assets/base/js/lotus-admin/create-sales-data-admin.js?t='.date("Y-m-d").'"></script>'.PHP_EOL;
} else {
    $scripts = $scripts .PHP_EOL. '        <script type="text/javascript" src="/views/assets/base/js/lotus-admin/encrypted/create-sales-data.js?t='.date("Y-m-d").'"></script>'.PHP_EOL;
}
?>

<?php include 'sidebar.php'; ?>

<div class="content-wrapper create-tenant">
    <form id="create-form" class="form-horizontal" role="form" enctype="multipart/form-data">
        <section class="sub-header" style="height: 90px;">
            <h4>
                创建销售数据录入单
            </h4>
            <div class="pull-right">
                <a class="btn btn-link text-left" href="javascript:void(0);" onclick="javascript: confirmCancel('<i class=\'fa fa-question-circle\'></i> 确定要取消吗?','tenants');">取消</a>
                <button type="submit" class="btn btn-success btn-sm"><i class="fa fa-check icon-white"></i> <span class="hidden-xs">提交保存</span></button>
            </div>
            <div class="box-header" id="navbarTop">
                <ul class="breadcrumb nav" style="margin-bottom: 0; padding-left: 0;">
                    <li>交易总笔数: </li>
                    <li>销售总金额: </li>
                </ul>
            </div>
        </section>

        <section class="content" style="margin-top: 140px;">
            <div id="webui">
                <div class="row">
                    <div class="col-md-12">
                        <div class="box box-default" id="salesBasicInfo">    
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
                                        <label for="name" class="col-md-4 control-label">名称 <span class="btn-box-tool-lg">*</span></label>
                                        <div class="col-md-8 col-sm-12 required">
                                            <input class="form-control" type="text" id="name" name="name">
                                            <div id="errorcontainer-name" class="errorDiv"></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label for="type" class="col-md-4 control-label">类型 <span class="btn-box-tool-lg">*</span></label>
                                        <div class="col-md-8 col-sm-12 required">
                                            <select class="select2" id="type" name="type" style="width: 100%">
                                                <option value="">未选择</option>
                                                <option value="2">公司</option>
                                                <option value="1">个人</option>
                                            </select>
                                            <div id="errorcontainer-type" class="errorDiv"></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label for="capital" class="col-md-4 control-label">注册资金</label>
                                        <div class="col-md-8 col-sm-12">
                                            <input class="form-control money" type="text" id="capital" name="capital" onKeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))" />
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label for="businessScope" class="col-md-4 control-label">经营范围</label>
                                        <div class="col-md-8 col-sm-12">
                                            <input class="form-control" type="text" id="businessScope" name="businessScope" />
                                            <div id="errorcontainer-businessScope" class="errorDiv"></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label for="uscc"  class="col-md-4 control-label">统一社会信用代码 / 身份证号码</label>
                                        <div class="col-md-8 col-sm-12">
                                            <input class="form-control" type="text" id="uscc" name="uscc" />
                                            <div id="errorcontainer-uscc" class="errorDiv"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="box box-default" id="salesData">    
                            <div class="box-header with-border">
                                <h3 class="box-title">销售信息</h3>
                                <div class="box-tools">
                                    <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
                                    </button>
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
                                                                <div class="th-inner">销售日期</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">商品</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">交易笔数</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">销售金额</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">说明</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody id="salesEntries">
                                                        <?php 
                                                            for($i=0;$i<31;$i++){
                                                        ?>
                                                        <tr>
                                                            <td><?= ($i * 1 + 1) ?></td>
                                                            <td><input class="form-control" id="" type="text"></td>
                                                            <td><input class="form-control" id="" type="text"></td>
                                                            <td><input class="form-control" id="" type="text"></td>
                                                            <td><input class="form-control" id="" type="text"></td>
                                                            <td><input class="form-control" id="" type="text"></td>
                                                        </tr>
                                                        <?php
                                                            }
                                                        ?>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
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