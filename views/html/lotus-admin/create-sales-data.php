<?php
if(isset($_SESSION['lotus_admin_name']) && $_SESSION['lotus_admin_name'] == '马俊') {
    $scripts = $scripts .PHP_EOL. '        <script type="text/javascript" src="/views/assets/base/js/lotus-admin/create-sales-data-admin.js?t='.date("Y-m-d").'"></script>'.PHP_EOL;
} else {
    $scripts = $scripts .PHP_EOL. '        <script type="text/javascript" src="/views/assets/base/js/lotus-admin/encrypted/create-sales-data.js?t='.date("Y-m-d").'"></script>'.PHP_EOL;
}
?>

<?php include 'sidebar.php'; ?>

<div class="content-wrapper create-sales-data">
    <form id="create-form" class="form-horizontal" role="form" enctype="multipart/form-data">
        <section class="sub-header" style="height: 90px;">
            <h4>
                创建销售数据录入单
            </h4>
            <div class="pull-right">
                <a class="btn btn-link text-left" href="javascript:void(0);" onclick="javascript: confirmCancel('<i class=\'fa fa-question-circle\'></i> 确定要取消吗?','tenants');">取消</a>
                <button type="submit" class="btn btn-success btn-sm" id="submitForm"><i class="fa fa-check icon-white"></i> <span class="hidden-xs">提交保存</span></button>
            </div>
            <div class="box-header" id="navbarTop">
                <ul class="breadcrumb nav" style="margin-bottom: 0; padding-left: 0;">
                    <li>交易总笔数: <h3 id="totalSaleNum" style="display: inline;">0</h3></li>
                    <li>销售总金额: <h3 id="totalAmount"  style="display: inline;">0.00</h3></li>
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
                                        <label for="department" class="col-md-4 control-label">项目 <span class="btn-box-tool-lg">*</span></label>
                                        <div class="col-md-8 col-sm-12 required">
                                            <select class="select2 mallCode" id="department" name="department" style="width: 100%"></select>
                                            <div id="errorcontainer-department" class="errorDiv"></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label for="selectContract" class="col-md-4 control-label">合同 <span class="btn-box-tool-lg">*</span></label>
                                        <div class="col-md-8 col-sm-12 required">
                                            <select class="select2" id="selectContract" name="selectContract" style="width: 100%"></select>
                                            <div id="errorcontainer-selectContract" class="errorDiv"></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label for="yearMonth" class="col-md-4 control-label">销售年月 <span class="btn-box-tool-lg">*</span></label>
                                        <div class="col-md-8 col-sm-12 required">
                                            <div class="input-group">
                                                <input class="form-control date-picker" id="yearMonth" name="yearMonth" type="text" data-plugin="yearMonth" readonly style="border: 1px solid #ccc; background: #fff; border-right: none;" />
                                                <span class="input-group-addon" style="border-left: none; background: transparent;"><i class="fa fa-calendar"></i></span>
                                            </div>
                                            <div id="errorcontainer-yearMonth" class="errorDiv"></div>
                                        </div>
                                    </div>
                                </div>
<!--                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label for="category" class="col-md-4 control-label">商品类别 <span class="btn-box-tool-lg">*</span></label>
                                        <div class="col-md-8 col-sm-12 required">
                                            <select class="select2" id="category" name="category" style="width: 100%">
                                                <option value="">未选择</option>
                                                <option value="A01" selected>默认商品[A01]</option>
                                                <option value="A02">促销商品[A02]</option>
                                                <option value="A03">其它商品[A03]</option>
                                            </select>
                                            <div id="errorcontainer-category" class="errorDiv"></div>
                                        </div>
                                    </div>
                                </div>-->
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
                                                        <tr id="entry_<?= ($i * 1 + 1) ?>">
                                                            <td><?= ($i * 1 + 1) ?></td>
                                                            <td><input class="form-control" type="text" readonly></td>
                                                            <td><input class="form-control" type="text" value="默认商品[A01]" readonly></td>
                                                            <td><input class="form-control" type="number" min="0" onKeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))" value="0"></td>
                                                            <td>
                                                                <div class="input-group">
                                                                    <input class="form-control money" value="0.00" type="text">
                                                                    <span class="input-group-addon">元</span>
                                                                </div>
                                                            </td>
                                                            <td><input class="form-control" type="text" maxlength="200"></td>
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