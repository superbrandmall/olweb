<?php
if(isset($_SESSION['lotus_admin_name']) && $_SESSION['lotus_admin_name'] == '马俊') {
    $scripts = $scripts .PHP_EOL. '        <script type="text/javascript" src="/views/assets/base/js/kow-admin/create-store-admin.js?t='.date("Y-m-d").'"></script>'.PHP_EOL;
} else {
    $scripts = $scripts .PHP_EOL. '        <script type="text/javascript" src="/views/assets/base/js/kow-admin/create-store-admin.js?t='.date("Y-m-d").'"></script>'.PHP_EOL;
}
?>

<?php include 'sidebar.php'; ?>

<div class="content-wrapper create-store">
    <form id="create-form" class="form-horizontal" role="form" enctype="multipart/form-data">
        <section class="sub-header" style="height: 90px;">
            <h4>
                创建铺位
            </h4>
            <div class="pull-right">
                <a class="btn btn-link text-left" href="javascript:void(0);" onclick="javascript: confirmCancel('<i class=\'fa fa-question-circle\'></i> 确定要取消吗?','stores');">取消</a>
                <button type="submit" class="btn btn-success btn-sm"><i class="fa fa-check icon-white"></i> <span class="hidden-xs">提交保存</span></button>
            </div>
            <div class="box-header" id="navbarTop">
                <ul class="breadcrumb nav" style="margin-bottom: 0; padding-left: 0;">
                    <li><a href="#storeBasicInfo">基本信息</a></li>
                    <li><a href="#storePropertyInfo">物业信息</a></li>
                </ul>
            </div>
        </section>

        <section class="content" style="margin-top: 140px;">
            <div id="webui">
                <div class="row">
                    <div class="col-md-12">
                        <div class="box box-default" id="storeBasicInfo">    
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
                                        <label for="unitCode" class="col-md-4 control-label">合同铺位号 <span class="btn-box-tool-lg">*</span></label>
                                        <div class="col-md-8 col-sm-12 required">
                                            <input class="form-control" type="text" id="unitCode" name="unitCode" placeholder="如:01FC001">
                                            <div id="errorcontainer-unitCode" class="errorDiv"></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label for="unitType" class="col-md-4 control-label">类型 <span class="btn-box-tool-lg">*</span></label>
                                        <div class="col-md-8 col-sm-12 required">
                                            <select class="select2" id="unitType" style="width: 100%"></select>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label for="mallCode" class="col-md-4 control-label">所属项目 <span class="btn-box-tool-lg">*</span></label>
                                        <div class="col-md-8 col-sm-12 required">
                                            <select class="select2" id="mallCode" name="mallCode" style="width: 100%"></select>
                                            <div id="errorcontainer-mallCode" class="errorDiv"></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label for="floorName" class="col-md-4 control-label">所属楼层 <span class="btn-box-tool-lg">*</span></label>
                                        <div class="col-md-8 col-sm-12 required">
                                            <select class="select2" id="floorName" name="floorName" style="width: 100%">
                                                <option value="">未选择</option>
                                                <option value="B3F">B3F</option>
                                                <option value="B2F">B2F</option>
                                                <option value="B1F">B1F</option>
                                                <option value="01F" selected>1F</option>
                                                <option value="02F">2F</option>
                                                <option value="03F">3F</option>
                                                <option value="04F">4F</option>
                                                <option value="05F">5F</option>
                                                <option value="06F">6F</option>
                                                <option value="07F">7F</option>
                                                <option value="08F">8F</option>
                                                <option value="09F">9F</option>
                                                <option value="10F">10F</option>
                                            </select>
                                            <div id="errorcontainer-floorName" class="errorDiv"></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label class="col-md-4 control-label">生效日期 <span class="btn-box-tool-lg">*</span></label>
                                        <div class="col-md-8 col-sm-12 required">
                                            <div class="input-daterange input-group">
                                                <input type="text" class="form-control" id="startDate" readonly style="border: 1px solid #ccc; background: #fff; border-radius: 0; border-right: none;" />
                                                <span class="input-group-addon" style="border-left: none; background: transparent;"><i class="fa fa-calendar"></i></span>
                                                <span class="input-group-addon" style="border: none; background: transparent;">-</span>
                                                <div class="input-group">
                                                    <input type="text" class="form-control" id="endDate" readonly style="border: 1px solid #ccc; background: #fff; border-radius: 0; border-right: none;" />
                                                    <span class="input-group-addon" style="border-left: none; background: transparent;"><i class="fa fa-calendar"></i></span>
                                                </div>
                                                <div id="errorcontainer-startDate" class="errorDiv"></div>
                                                <div id="errorcontainer-endDate" class="errorDiv"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label for="approveFirst" class="col-md-4 control-label">铺位负责人1 <span class="btn-box-tool-lg">*</span></label>
                                        <div class="col-md-8 col-sm-12">
                                            <select class="select2" id="approveFirst" name="approveFirst" style="width: 100%"></select>
                                            <div id="errorcontainer-approveFirst" class="errorDiv"></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label for="approveSecond"class="col-md-4 control-label">铺位负责人2</label>
                                        <div class="col-md-8 col-sm-12">
                                            <select class="select2" id="approveSecond" name="approveSecond" style="width: 100%"></select>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label for="approveThird"class="col-md-4 control-label">铺位负责人3</label>
                                        <div class="col-md-8 col-sm-12">
                                            <select class="select2" id="approveThird" name="approveThird" style="width: 100%"></select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="box box-default" id="storePropertyInfo">    
                            <div class="box-header with-border">
                                <h3 class="box-title">物业信息</h3>
                                <div class="box-tools">
                                    <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="box-body">
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label for="unitName" class="col-md-4 control-label">门牌号 <span class="btn-box-tool-lg">*</span></label>
                                        <div class="col-md-8 col-sm-12 required">
                                            <input class="form-control" type="text" id="unitName" name="unitName" placeholder="请输入合同铺位号" readonly>
                                            <div id="errorcontainer-unitName" class="errorDiv"></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label for="length" class="col-md-4 control-label">铺位大小 <span class="btn-box-tool-lg">*</span></label>
                                        <div class="col-md-8 col-sm-12 required">
                                            <div class="input-group">
                                                <input type="text" class="form-control" id="length" name="length" placeholder="长(m)" />
                                                <span class="input-group-addon" style="border: none; background: transparent;">x</span>
                                                <div class="input-group">
                                                    <input type="text" class="form-control" id="width" name="width" placeholder="宽(m)" />
                                                </div>
                                                <span class="input-group-addon" style="border: none; background: transparent;">x</span>
                                                <div class="input-group">
                                                    <input type="text" class="form-control" id="height" name="height" placeholder="高(m)" />
                                                </div>
                                            </div>
                                            <div id="errorcontainer-length" class="errorDiv" style="display: inline;"></div>
                                            <div id="errorcontainer-width" class="errorDiv" style="display: inline;"></div>
                                            <div id="errorcontainer-height" class="errorDiv" style="display: inline;"></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label for="area" class="col-md-4 control-label">租赁面积</label>
                                        <div class="col-md-8 col-sm-12">
                                            <div class="input-group">
                                                <input class="form-control money" id="area" type="text" style="border: 1px solid #ccc; background: #fff; border-right: none;" />                                                
                                                <span class="input-group-addon" style="border-left: none; background: transparent;">m<sup>2</sup></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="clearfix"></div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label for="mulitPathFlag" class="col-md-4 control-label">多经点位</label>
                                        <div class="col-md-1 col-sm-6" style="padding-top: 6px;">
                                            <input type="checkbox" id="mulitPathFlag" name="mulitPathFlag">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label for="enterFlag" class="col-md-4 control-label">出入口</label>
                                        <div class="col-md-1 col-sm-6" style="padding-top: 6px;">
                                            <input type="checkbox" id="enterFlag" name="enterFlag">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label for="liftFlag" class="col-md-4 control-label">直梯或扶梯</label>
                                        <div class="col-md-1 col-sm-6" style="padding-top: 6px;">
                                            <input type="checkbox" id="liftFlag" name="liftFlag">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label for="unitDesc" class="col-md-4 control-label">附近有无竞品生鲜超市(如有,请备注具体名称)</label>
                                        <div class="col-md-8 col-sm-12">
                                            <input class="form-control" type="text" id="unitDesc" name="unitDesc" />
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