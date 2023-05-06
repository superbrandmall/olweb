<?php
if(explode('?id=', $_SERVER['REQUEST_URI'])[1] != null) {
    $id = explode('?id=', $_SERVER['REQUEST_URI'])[1];
    if (strpos($id, '&s=') !== false) {
        $id = explode('&s=', $id)[0];
    }
}

if(isset($_SESSION['lotus_admin_name']) && $_SESSION['lotus_admin_name'] == '马俊') {
    $scripts = $scripts .PHP_EOL. '        <script type="text/javascript" src="/views/assets/base/js/lotus-admin/mall-detail-admin.js?t='.date("Y-m-d").'"></script>'.PHP_EOL
    . '        <script type="text/javascript" src="/views/assets/plugins/timepicker/bootstrap-timepicker.js"></script>'.PHP_EOL;
} else {
    $scripts = $scripts .PHP_EOL. '        <script type="text/javascript" src="/views/assets/base/js/lotus-admin/encrypted/mall-detail.js?t='.date("Y-m-d").'"></script>'.PHP_EOL
    . '        <script type="text/javascript" src="/views/assets/plugins/timepicker/bootstrap-timepicker.js"></script>'.PHP_EOL;
}
?>
<link href="/views/assets/plugins/timepicker/bootstrap-timepicker.css" rel="stylesheet" type="text/css" media="all" />

<?php include 'sidebar.php'; ?>

<div class="content-wrapper mall-detail">
    <form id="create-form" class="form-horizontal" role="form" enctype="multipart/form-data">
        <section class="sub-header" style="height: 90px;">
            <div class="pull-left">
                <a href="/lotus-admin/malls" class="btn btn-link "><i class="fa fa-angle-left"></i> 返回列表</a>
            </div>
            <h4>
                <span class="badge badge-success" id="state" style="vertical-align: top;"></span> <b id="name2"></b>
            </h4>
            <div class="pull-right">
                <a class="btn btn-link text-left" href="javascript:void(0);" onclick="javascript: confirmCancel('<i class=\'fa fa-question-circle\'></i> 确定要取消吗?','stores');">取消</a>
                <button type="submit" class="btn btn-success btn-sm" id="saveDraft"><i class="fa fa-check icon-white"></i> <span class="hidden-xs">提交保存</span></button>
            </div>
            <div class="box-header" id="navbarTop" style="height: 53px;">
                <ul class="breadcrumb nav" style="margin-bottom: 0; padding-left: 0;">
                    <li><a href="#mallBasicInfo">基本信息</a></li>
                    <li><a href="#mallImages">项目图片</a></li>
                    <li><a href="#mallResources">物业信息</a></li>
                    <li><a href="#mallBankInfo">关联公司</a></li>
                    <li><a href="#mallDesc">说明</a></li>
                </ul>
            </div>
            <div class="box-header" style="background-color: #ecf0f5; margin-top: -6px; height: 50px;">
                <div class="pull-left">
                    <ol class="breadcrumb" style="margin-bottom: 0; padding-left: 0;">
                        <li class="active"><a href="javascript: void(0);">详细资料</a></li>
                        <li><a href="/lotus-admin/default?id=<?= $id; ?>">平面图</a></li>
                        <li><a href="/lotus-admin/mall-summary?id=<?= $id; ?>">概要</a></li>
                    </ol>
                </div>
            </div>
        </section>

        <section class="content" style="margin-top: 179px;">
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
                                        <label for="code" class="col-md-4 control-label">代码 <span class="btn-box-tool-lg">*</span></label>
                                        <div class="col-md-8 col-sm-12 required">
                                            <input class="form-control" type="text" id="code" name="code" readonly>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="mallType" class="col-md-4 control-label">项目类型</label>
                                        <div class="col-md-8 col-sm-12">
                                            <select class="select2" id="mallType" name="mallType" style="width: 100%">
                                                <option value="">莲花</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="regAddress" class="col-md-4 control-label">注册地址 <span class="btn-box-tool-lg">*</span></label>
                                        <div class="col-md-8 col-sm-12 required">
                                            <input class="form-control" type="text" id="regAddress" name="regAddress">
                                            <div id="errorcontainer-regAddress" class="errorDiv"></div>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="remarkFirst" class="col-md-4 control-label">状态</label>
                                        <div class="col-md-8 col-sm-12">
                                            <select class="select2" id="remarkFirst" style="width: 100%">
                                                <option value="" selected>全部</option>
                                                <option value="经营中">经营中</option>
                                                <option value="待续签">待续签</option>
                                                <option value="改造中">改造中</option>
                                                <option value="已闭店">已闭店</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label for="mallName" class="col-md-4 control-label">名称 <span class="btn-box-tool-lg">*</span></label>
                                        <div class="col-md-8 col-sm-12 required">
                                            <input class="form-control" type="text" id="mallName" name="mallName">
                                            <div id="errorcontainer-mallName" class="errorDiv"></div>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="location" class="col-md-4 control-label">位置 <span class="btn-box-tool-lg">*</span></label>
                                        <div class="col-md-8 col-sm-12 required">
                                            <input class="form-control" type="text" id="location" name="location">
                                            <div id="errorcontainer-location" class="errorDiv"></div>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="startDate" class="col-md-4 control-label">大业主合同 <span class="btn-box-tool-lg">*</span></label>
                                        <div class="col-md-8 col-sm-12 required">
                                            <div class="input-daterange input-group">
                                                <input type="text" class="form-control" id="startDate" name="startDate" readonly style="border: 1px solid #ccc; background: #fff; border-radius: 0; border-right: none;" />
                                                <span class="input-group-addon" style="border-left: none; background: transparent;"><i class="fa fa-calendar"></i></span>
                                                <span class="input-group-addon" style="border: none; background: transparent;">-</span>
                                                <div class="input-group">
                                                    <input type="text" class="form-control" id="endDate" name="endDate" readonly style="border: 1px solid #ccc; background: #fff; border-radius: 0; border-right: none;" />
                                                    <span class="input-group-addon" style="border-left: none; background: transparent;"><i class="fa fa-calendar"></i></span>
                                                </div>
                                            </div>
                                            <div id="errorcontainer-startDate" class="errorDiv" style="float: left;"></div>
                                            <div id="errorcontainer-endDate" class="errorDiv"></div>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="remarkSecond" class="col-md-4 control-label">项目招商</label>
                                        <div class="col-md-8 col-sm-12">
                                            <select class="select2 selectUser" id="remarkSecond" style="width: 100%">
                                                <option value="">未选择</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label class="col-md-4 control-label">项目所属地 <span class="btn-box-tool-lg">*</span></label>
                                        <div class="col-md-8 col-sm-12 required">
                                            <div class="input-group">
                                                <input class="form-control" type="text" id="province" name="province">
                                                <span class="input-group-addon" style="border: none; background: transparent;"></span>
                                                <div class="input-group">
                                                    <input class="form-control" type="text" id="cityDistrict" name="cityDistrict">
                                                </div>
                                            </div>
                                            <div id="errorcontainer-province" class="errorDiv" style="float: left;"></div>
                                            <div id="errorcontainer-cityDistrict" class="errorDiv"></div>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="deliveryAddress" class="col-md-4 control-label">邮寄地址 <span class="btn-box-tool-lg">*</span></label>
                                        <div class="col-md-8 col-sm-12 required">
                                            <input class="form-control" type="text" id="deliveryAddress" name="deliveryAddress">
                                            <div id="errorcontainer-deliveryAddress" class="errorDiv"></div>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-md-4 control-label">营业时间</label>
                                        <div class="col-md-8 col-sm-12">
                                            <div class="input-group">
                                                <input type="text" class="form-control timepicker" id="openStartTime" readonly style="border: 1px solid #ccc; background: #fff; border-radius: 0; border-right: none;" />
                                                <span class="input-group-addon" style="border-left: none; background: transparent;"><i class="fa fa-clock-o"></i></span>
                                                <span class="input-group-addon" style="border: none; background: transparent;">-</span>
                                                <div class="input-group">
                                                    <input type="text" class="form-control timepicker" id="openEndTime" readonly style="border: 1px solid #ccc; background: #fff; border-radius: 0; border-right: none;" />
                                                    <span class="input-group-addon" style="border-left: none; background: transparent;"><i class="fa fa-clock-o"></i></span>
                                                </div>    
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="box box-default" id="mallImages">    
                            <div class="box-header with-border">
                                <h3 class="box-title">项目图片</h3>
                                <div class="box-tools">
                                    <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="box-body">
                                <div class="col-md-12"></div>
                            </div>
                        </div>
                        
                        <div class="box box-default" id="mallResources">    
                            <div class="box-header with-border">
                                <h3 class="box-title">物业信息</h3>
                                <div class="box-tools">
                                    <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="box-body">
                                <div class="col-md-4">
                                    <br>
                                    <div class="form-group">
                                        <label class="col-md-4 control-label" style="padding-top: 0;">项目面积(m<sup>2</sup>)</label>
                                        <div class="col-md-8 col-sm-12">
                                            <p>-</p>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-md-4 control-label" style="padding-top: 0;">车位数量</label>
                                        <div class="col-md-8 col-sm-12">
                                            <p>0</p>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-md-4 control-label" style="padding-top: 0;">车库面积(m<sup>2</sup>)</label>
                                        <div class="col-md-8 col-sm-12">
                                            <p>-</p>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-md-4 control-label" style="padding-top: 0;">仓库数量</label>
                                        <div class="col-md-8 col-sm-12">
                                            <p>0</p>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-md-4 control-label" style="padding-top: 0;">仓库面积(m<sup>2</sup>)</label>
                                        <div class="col-md-8 col-sm-12">
                                            <p>-</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <h5>铺位(单元)信息</h5>
                                    <hr>
                                    <div class="form-group">
                                        <label class="col-md-4 control-label" style="padding-top: 0;">建筑面积(m<sup>2</sup>)</label>
                                        <div class="col-md-8 col-sm-12">
                                            <p>-</p>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-md-4 control-label" style="padding-top: 0;">租赁面积(m<sup>2</sup>)</label>
                                        <div class="col-md-8 col-sm-12">
                                            <p id="leasingArea"></p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <h5>招商资源</h5>
                                    <hr>
                                    <div class="form-group">
                                        <label class="col-md-4 control-label" style="padding-top: 0;">楼宇</label>
                                        <div class="col-md-8 col-sm-12">
                                            <p><span id="building"></span>栋</p>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-md-4 control-label" style="padding-top: 0;">楼层</label>
                                        <div class="col-md-8 col-sm-12">
                                            <p><span id="floor"></span>层</p>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-md-4 control-label" style="padding-top: 0;">正柜</label>
                                        <div class="col-md-8 col-sm-12">
                                            <p><span id="shoppeUnits"></span>个</p>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-md-4 control-label" style="padding-top: 0;">临时柜</label>
                                        <div class="col-md-8 col-sm-12">
                                            <p><span id="kioskUnits"></span>个</p>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-md-4 control-label" style="padding-top: 0;">仓库</label>
                                        <div class="col-md-8 col-sm-12">
                                            <p><span id="storaUnits"></span>个</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="box box-default" id="mallBankInfo">    
                            <div class="box-header with-border">
                                <h3 class="box-title">关联公司</h3>
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
                                                                <div class="th-inner">公司类型</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">名称 <span class="btn-box-tool-lg">*</span></div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">开户行 <span class="btn-box-tool-lg">*</span></div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">银行账号 <span class="btn-box-tool-lg">*</span></div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">税号 <span class="btn-box-tool-lg">*</span></div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">联系电话 <span class="btn-box-tool-lg">*</span></div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">地址 <span class="btn-box-tool-lg">*</span></div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody id="BankInfoList">
                                                        <tr>
                                                            <td>1</td>
                                                            <td>商管公司</td>
                                                            <td><input class="form-control" type="text" id="name"></td>
                                                            <td><input class="form-control" type="text" id="bankName"></td>
                                                            <td><input class="form-control" type="text" id="bankAccount"></td>
                                                            <td><input class="form-control" type="text" id="uscc"></td>
                                                            <td><input class="form-control" type="text" id="phoneNum"></td>
                                                            <td><input class="form-control" type="text" id="address"></td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="box box-default" id="mallDesc">    
                            <div class="box-header with-border">
                                <h3 class="box-title">说明</h3>
                                <div class="box-tools">
                                    <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="box-body">
                                <div class="col-md-12">
                                    <textarea class="form-control" id="remarkThird" rows="3"></textarea>
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