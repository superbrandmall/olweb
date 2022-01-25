<?php
$scripts = $scripts . '<script src="/views/assets/base/js/lotus-admin/create-contract-admin.js" type="text/javascript" ></script>'
    . '<script src="/views/assets/plugins/datepicker/bootstrap-datepicker.min.js" type="text/javascript"></script>'
    . '<script src="/views/assets/plugins/datepicker/bootstrap-datepicker.zh-CN.min.js" type="text/javascript"></script>';
?>
<link href="/views/assets/plugins/datepicker/bootstrap-datepicker.css" rel="stylesheet" type="text/css" media="all" />

<?php include 'sidebar.php'; ?>

<div class="content-wrapper">
    <section class="content-header" style="padding-bottom: 30px;">
        <h1 class="pull-left">
            新租赁合同申请单
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
                        新建合同成功!
                    </div>
                    <div class="callout callout-danger" style="display: none;">
                        新建合同失败!
                    </div>
                    <div class="callout callout-warning" style="display: none;">
                        该合同已存在!
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <div class="box box-default" id="investmentContractDepositterm">    
                        <div class="box-header with-border text-center">
                            <h3 class="box-title">新建新租赁合同申请单</h3>
                        </div>
                    </div>
                    <form id="create-form" class="form-horizontal" role="form" enctype="multipart/form-data">
                        <?php 
                        include 'create-contract/investmentContractModel.php'; //合同内容
                        include 'create-contract/investmentContractModelBasicinfo.php'; //基本信息
                        include 'create-contract/investmentContractEnteryterm.php';
                        include 'create-contract/investmentContractSettleterm.php'; 
                        include 'create-contract/investmentContractAccounttermList.php'; //账款条款
                        include 'create-contract/investmentContractOverduetermList.php';
                        include 'create-contract/investmentContractDepositterm.php';
                        include 'create-contract/investmentContractProperteisterm.php';
                        include 'create-contract/textareapanel.php';
                        ?>
                        
                        <!--<div class="box box-default">    
                            <div class="box-header with-border">
                                <h3 class="box-title">滞纳金条款</h3>
                            </div>
                            <div class="box-body">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="contractType" class="col-md-6 control-label">合同类型 <span class="btn-box-tool-lg">*</span></label>
                                        <div class="col-md-6 col-sm-12 required">
                                            <input class="form-control" type="text" id="contractType" name="contractType" />
                                            <div id="errorcontainer-contractType" class="errorDiv"></div>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="tenantName" class="col-md-6 control-label">商户名称 <span class="btn-box-tool-lg">*</span></label>
                                        <div class="col-md-6 col-sm-12 required">
                                            <input class="form-control" type="text" id="tenantName" name="tenantName" />
                                            <div id="errorcontainer-tenantName" class="errorDiv"></div>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="modality_1" class="col-md-6 control-label">一级业态 <span class="btn-box-tool-lg">*</span></label>
                                        <div class="col-md-6 col-sm-12 required">
                                            <select class="select2" id="modality_1" name="modality_1" style="width: 100%">
                                                <option value="">未选择</option>
                                                <option value="儿童">儿童</option>
                                                <option value="基站">基站</option>
                                                <option value="娱乐服务">娱乐服务</option>
                                                <option value="工程设备">工程设备</option>
                                                <option value="服务">服务</option>
                                                <option value="零售">零售</option>
                                                <option value="餐饮">餐饮</option>
                                            </select>
                                            <div id="errorcontainer-modality_1" class="errorDiv"></div>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="modality_2" class="col-md-6 control-label">二级业态 <span class="btn-box-tool-lg">*</span></label>
                                        <div class="col-md-6 col-sm-12 required">
                                            <select class="select2" id="modality_2" name="modality_2" style="width: 100%">
                                                <option value="">未选择</option>
                                                <option value="F&B Retail">F&B Retail</option>
                                                <option value="个人护理">个人护理</option>
                                                <option value="休闲娱乐">休闲娱乐</option>
                                                <option value="儿童育乐">儿童育乐</option>
                                                <option value="儿童零售">儿童零售</option>
                                                <option value="娱乐">娱乐</option>
                                                <option value="快时尚">快时尚</option>
                                                <option value="快餐">快餐</option>
                                                <option value="服务">服务</option>
                                                <option value="服装">服装</option>
                                                <option value="服饰">服饰</option>
                                                <option value="珠宝首饰">珠宝首饰</option>
                                                <option value="甜品">甜品</option>
                                                <option value="生活方式">生活方式</option>
                                                <option value="科技数码">科技数码</option>
                                                <option value="美容及个人护理">美容及个人护理</option>
                                                <option value="茶饮">茶饮</option>
                                                <option value="茶饮咖啡/甜品">茶饮咖啡/甜品</option>
                                                <option value="鞋服">鞋服</option>
                                                <option value="饮品">饮品</option>
                                                <option value="饰品">饰品</option>
                                            </select>
                                            <div id="errorcontainer-modality_2" class="errorDiv"></div>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="modality3" class="col-md-6 control-label">三级业态 <span class="btn-box-tool-lg">*</span></label>
                                        <div class="col-md-6 col-sm-12 required">
                                            <input class="form-control" type="text" id="modality3" name="modality3" />
                                            <div id="errorcontainer-modality3" class="errorDiv"></div>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="deduct" class="col-md-6 control-label">扣率 <span class="btn-box-tool-lg">*</span></label>
                                        <div class="col-md-6 col-sm-12 required">
                                            <input class="form-control" type="text" id="deduct" name="deduct" />
                                            <div id="errorcontainer-deduct" class="errorDiv"></div>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="totalAmountDay" class="col-md-6 control-label">日坪效(元/㎡/天) <span class="btn-box-tool-lg">*</span></label>
                                        <div class="col-md-6 col-sm-12 required">
                                            <input class="form-control" type="text" id="totalAmountDay" name="totalAmountDay" />
                                            <div id="errorcontainer-totalAmountDay" class="errorDiv"></div>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="depositAmount" class="col-md-6 control-label">押金金额 <span class="btn-box-tool-lg">*</span></label>
                                        <div class="col-md-6 col-sm-12 required">
                                            <input class="form-control" type="text" id="depositAmount" name="depositAmount" />
                                            <div id="errorcontainer-depositAmount" class="errorDiv"></div>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="startDate" class="col-md-6 control-label">合同起始日 <span class="btn-box-tool-lg">*</span></label>
                                        <div class="col-md-6 col-sm-12 required">
                                            <input class="form-control date-picker" type="text" id="startDate" name="startDate" data-plugin="datepicker" readonly style="border: 1px solid #ccc; background: #fff;" />
                                            <div id="errorcontainer-startDate" class="errorDiv"></div>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="contractStatus" class="col-md-6 control-label">签约情况 <span class="btn-box-tool-lg">*</span></label>
                                        <div class="col-md-6 col-sm-12 required">
                                            <input class="form-control" type="text" id="contractStatus" name="contractStatus" />
                                            <div id="errorcontainer-contractStatus" class="errorDiv"></div>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="unitCode" class="col-md-6 control-label">店铺位置代码 <span class="btn-box-tool-lg">*</span></label>
                                        <div class="col-md-6 col-sm-12 required">
                                            <input class="form-control" type="text" id="unitCode" name="unitCode" />
                                            <div id="errorcontainer-unitCode" class="errorDiv"></div>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="floorName" class="col-md-6 control-label">楼层 <span class="btn-box-tool-lg">*</span></label>
                                        <div class="col-md-6 col-sm-12 required">
                                            <input class="form-control" type="text" id="floorName" name="floorName" />
                                            <div id="errorcontainer-floorName" class="errorDiv"></div>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="unitArea" class="col-md-6 control-label">合同面积㎡ <span class="btn-box-tool-lg">*</span></label>
                                        <div class="col-md-6 col-sm-12 required">
                                            <input class="form-control" type="text" id="unitArea" name="unitArea" />
                                            <div id="errorcontainer-unitArea" class="errorDiv"></div>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="totalAmount" class="col-md-6 control-label">合同总收入(A+B+C) <span class="btn-box-tool-lg">*</span></label>
                                        <div class="col-md-6 col-sm-12 required">
                                            <input class="form-control" type="text" id="totalAmount" name="totalAmount" />
                                            <div id="errorcontainer-totalAmount" class="errorDiv"></div>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="rentAmount" class="col-md-6 control-label">(A)合同租金 <span class="btn-box-tool-lg">*</span></label>
                                        <div class="col-md-6 col-sm-12 required">
                                            <input class="form-control" type="text" id="rentAmount" name="rentAmount" />
                                            <div id="errorcontainer-rentAmount" class="errorDiv"></div>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="managerAmount" class="col-md-6 control-label">(B)合同管理费 <span class="btn-box-tool-lg">*</span></label>
                                        <div class="col-md-6 col-sm-12 required">
                                            <input class="form-control" type="text" id="managerAmount" name="managerAmount" />
                                            <div id="errorcontainer-managerAmount" class="errorDiv"></div>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="promotionAmount" class="col-md-6 control-label">(C)合同促销费 <span class="btn-box-tool-lg">*</span></label>
                                        <div class="col-md-6 col-sm-12 required">
                                            <input class="form-control" type="text" id="promotionAmount" name="promotionAmount" />
                                            <div id="errorcontainer-promotionAmount" class="errorDiv"></div>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="endDate" class="col-md-6 control-label">合同终止日 <span class="btn-box-tool-lg">*</span></label>
                                        <div class="col-md-6 col-sm-12 required">
                                            <input class="form-control date-picker" type="text" id="endDate" name="endDate" data-plugin="datepicker" readonly style="border: 1px solid #ccc; background: #fff;" />
                                            <div id="errorcontainer-endDate" class="errorDiv"></div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="box-footer text-right">
                                    <a class="btn btn-link text-left" href="/lotus-admin/contracts">取消</a>
                                    <button type="submit" class="btn btn-success"><i class="fa fa-check icon-white"></i> 保存</button>
                                </div>
                            </div>
                        </div>-->
                    </form>
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