<?php
if(isset($_SESSION['lotus_admin_name']) && $_SESSION['lotus_admin_name'] == '马俊') {
    $scripts = $scripts .PHP_EOL. '        <script type="text/javascript" src="/views/assets/base/js/kow-admin/mall-detail-admin.js?t='.date("Y-m-d").'"></script>'.PHP_EOL;
} else {
    $scripts = $scripts .PHP_EOL. '        <script type="text/javascript" src="/views/assets/base/js/kow-admin/mall-detail-admin.js?t='.date("Y-m-d").'"></script>'.PHP_EOL;
}
?>

<?php include 'sidebar.php'; ?>

<div class="content-wrapper create-mall">
    <form id="create-form" class="form-horizontal" role="form" enctype="multipart/form-data">
        <section class="sub-header" style="height: 90px;">
            <h4>
                <span class="badge badge-success" id="state" style="vertical-align: top;"></span> <b id="mallName2"></b>[<b id="mallCode2"></b>]
            </h4>
            <div class="pull-right">
                <a class="btn btn-link text-left" href="javascript:void(0);" onclick="javascript: confirmCancel('<i class=\'fa fa-question-circle\'></i> 确定要取消吗?','malls');">取消</a>
                <button type="submit" class="btn btn-success btn-sm"><i class="fa fa-check icon-white"></i> <span class="hidden-xs">提交保存</span></button>
            </div>
            <div class="box-header" id="navbarTop">
                <ul class="breadcrumb nav" style="margin-bottom: 0; padding-left: 0;">
                    <li><a href="#mallBasicInfo">基本信息</a></li>
                    <li><a href="#mallBusinessInfo">业务信息</a></li>
                    <li><a href="#mallRemarks">说明</a></li>
                </ul>
            </div>
        </section>

        <section class="content" style="margin-top: 140px;">
            <div id="webui">
                <div class="row">
                    <div class="col-md-12">
                        <div class="box box-default" id="mallBasicInfo">    
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
                                        <label for="mallCode" class="col-md-4 control-label">代码 <span class="btn-box-tool-lg">*</span></label>
                                        <div class="col-md-8 col-sm-12 required">
                                            <input class="form-control" type="text" id="mallCode" name="mallCode" readonly>
                                            <div id="errorcontainer-mallCode" class="errorDiv"></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label for="mallName" class="col-md-4 control-label">名称 <span class="btn-box-tool-lg">*</span></label>
                                        <div class="col-md-8 col-sm-12 required">
                                            <input class="form-control" type="text" id="mallName" name="mallName" readonly>
                                            <div id="errorcontainer-mallName" class="errorDiv"></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label for="cityDistrict" class="col-md-4 control-label">项目所属地 <span class="btn-box-tool-lg">*</span></label>
                                        <div class="col-md-8 col-sm-12 required">
                                            <select class="select2" id="cityDistrict" name="cityDistrict" style="width: 100%" disabled>
                                                <option value="">未选择</option>
                                                <option value="黄浦区">黄浦区</option>
                                                <option value="徐汇区">徐汇区</option>
                                                <option value="长宁区">长宁区</option>
                                                <option value="静安区">静安区</option>
                                                <option value="普陀区">普陀区</option>
                                                <option value="虹口区">虹口区</option>
                                                <option value="杨浦区">杨浦区</option>
                                                <option value="闵行区">闵行区</option>
                                                <option value="宝山区">宝山区</option>
                                                <option value="嘉定区">嘉定区</option>
                                                <option value="浦东新区">浦东新区</option>
                                                <option value="金山区">金山区</option>
                                                <option value="松江区">松江区</option>
                                                <option value="青浦区">青浦区</option>
                                                <option value="奉贤区">奉贤区</option>
                                                <option value="崇明区">崇明区</option>
                                            </select>
                                            <div id="errorcontainer-cityDistrict" class="errorDiv"></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label class="col-md-4 control-label">生效日期 <span class="btn-box-tool-lg">*</span></label>
                                        <div class="col-md-8 col-sm-12">
                                            <div class="input-daterange input-group">
                                                <input type="text" class="form-control" id="startDate" disabled />
                                                <span class="input-group-addon" style="border: none; background: #eee;"><i class="fa fa-calendar"></i></span>
                                                <span class="input-group-addon" style="border: none; background: transparent;">-</span>
                                                <div class="input-group">
                                                    <input type="text" class="form-control" id="endDate" disabled />
                                                    <span class="input-group-addon" style="border: none; background: #eee;"><i class="fa fa-calendar"></i></span>
                                                </div>
                                                <div id="errorcontainer-startDate" class="errorDiv"></div>
                                                <div id="errorcontainer-endDate" class="errorDiv"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label for="name" class="col-md-4 control-label">签约主体 <span class="btn-box-tool-lg">*</span></label>
                                        <div class="col-md-8 col-sm-12 required">
                                            <input class="form-control" type="text" id="name" name="name">
                                            <div id="errorcontainer-name" class="errorDiv"></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label for="address" class="col-md-4 control-label">项目地址 <span class="btn-box-tool-lg">*</span></label>
                                        <div class="col-md-8 col-sm-12 required">
                                            <input class="form-control" type="text" id="address" name="address">
                                            <div id="errorcontainer-address" class="errorDiv"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="box box-default" id="mallBusinessInfo">    
                            <div class="box-header with-border">
                                <h3 class="box-title">业务信息</h3>
                                <div class="box-tools">
                                    <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="box-body">
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label for="mallArea" class="col-md-4 control-label">项目面积</label>
                                        <div class="col-md-8 col-sm-12">
                                            <div class="input-group">
                                                <input class="form-control money" id="mallArea" type="text" style="border: 1px solid #ccc; background: #fff; border-right: none;" />                                                
                                                <span class="input-group-addon" style="border-left: none; background: transparent;">m<sup>2</sup></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label for="weekdayCustomerNo" class="col-md-4 control-label">周中客流数</label>
                                        <div class="col-md-8 col-sm-12">
                                            <input class="form-control money" type="text" id="weekdayCustomerNo" name="weekdayCustomerNo">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label for="weekendCustomerNo" class="col-md-4 control-label">周末客流数</label>
                                        <div class="col-md-8 col-sm-12">
                                            <input class="form-control money" type="text" id="weekendCustomerNo" name="weekendCustomerNo">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-8">
                                    <div class="form-group">
                                        <label for="neighborTraffic" class="col-md-5 control-label">临街情况(主干道,支线道路,单向车道等)</label>
                                        <div class="col-md-7 col-sm-12">
                                            <input class="form-control" type="text" id="neighborTraffic" name="neighborTraffic" />
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label for="isFamous" class="col-md-5 control-label">知名连锁购物中心</label>
                                        <div class="col-md-1 col-sm-6" style="padding-top: 6px;">
                                            <input type="checkbox" id="isFamous">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="box box-default" id="mallRemarks" style="min-height: 350px;">    
                            <div class="box-header with-border">
                                <h3 class="box-title">说明</h3>
                                <div class="box-tools">
                                    <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
                                    </button>
                                </div>
                            </div>                  
                            <div class="box-body">
                                <div class="col-md-12">
                                    <textarea class="form-control" id="description" rows="7"></textarea>
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