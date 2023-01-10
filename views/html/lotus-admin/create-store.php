<?php
if(isset($_SESSION['lotus_admin_name']) && $_SESSION['lotus_admin_name'] == '马俊') {
    $scripts = $scripts .PHP_EOL. '        <script type="text/javascript" src="/views/assets/base/js/lotus-admin/create-store-admin.js?t='.date("Y-m-d").'"></script>'.PHP_EOL;
} else {
    $scripts = $scripts .PHP_EOL. '        <script type="text/javascript" src="/views/assets/base/js/lotus-admin/encrypted/create-store.js?t='.date("Y-m-d").'"></script>'.PHP_EOL;
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
                    <li><a href="#storeUtilityInfo">配置信息</a></li>
                    <li><a href="#storeEnclosed">铺位附件</a></li>
                    <li><a href="#storeRemarks">说明</a></li>
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
                                        <label for="unitName" class="col-md-4 control-label">名称 <span class="btn-box-tool-lg">*</span></label>
                                        <div class="col-md-8 col-sm-12 required">
                                            <input class="form-control" type="text" id="unitName" name="unitName">
                                            <div id="errorcontainer-unitName" class="errorDiv"></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label for="unitType" class="col-md-4 control-label">类型 <span class="btn-box-tool-lg">*</span></label>
                                        <div class="col-md-8 col-sm-12 required">
                                            <select class="select2" id="unitType" style="width: 100%"></select>
                                            <div id="errorcontainer-unitType" class="errorDiv"></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label for="mallCode" class="col-md-4 control-label">所属项目 <span class="btn-box-tool-lg">*</span></label>
                                        <div class="col-md-8 col-sm-12">
                                            <select class="select2" id="mallCode" name="mallCode" style="width: 100%">
                                                <option value="">未选择</option>
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
                                            <div id="errorcontainer-mallCode" class="errorDiv"></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label for="selectFloor" class="col-md-4 control-label">所属楼层 <span class="btn-box-tool-lg">*</span></label>
                                        <div class="col-md-8 col-sm-12 required">
                                            <select class="select2" id="selectFloor" style="width: 100%">
                                                <option value="">未选择</option>
                                            </select>
                                            <div id="errorcontainer-selectFloor" class="errorDiv"></div>
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
                                        <label for="selectUser1" class="col-md-4 control-label">铺位负责人1 <span class="btn-box-tool-lg">*</span></label>
                                        <div class="col-md-8 col-sm-12 required">
                                            <select class="select2 selectUser" id="selectUser1" style="width: 100%">
                                                <option value="">未选择</option>
                                            </select>
                                            <div id="errorcontainer-selectUser1" class="errorDiv"></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label for="selectUser2" class="col-md-4 control-label">铺位负责人2</label>
                                        <div class="col-md-8 col-sm-12">
                                            <select class="select2 selectUser" id="selectUser2" style="width: 100%">
                                                <option value="">未选择</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label for="selectUser3" class="col-md-4 control-label">铺位负责人3</label>
                                        <div class="col-md-8 col-sm-12">
                                            <select class="select2 selectUser" id="selectUser3" style="width: 100%">
                                                <option value="">未选择</option>
                                            </select>
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
                                        <label for="buildingArea" class="col-md-4 control-label">建筑面积</label>
                                        <div class="col-md-8 col-sm-12">
                                            <div class="input-group">
                                                <input class="form-control money" id="buildingArea" name="buildingArea" type="text" style="border: 1px solid #ccc; background: #fff; border-right: none;" />                                                
                                                <span class="input-group-addon" style="border-left: none; background: transparent;">m<sup>2</sup></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label for="unitArea" class="col-md-4 control-label">租赁面积</label>
                                        <div class="col-md-8 col-sm-12">
                                            <div class="input-group">
                                                <input class="form-control money" id="unitArea" name="unitArea" type="text" style="border: 1px solid #ccc; background: #fff; border-right: none;" />                                                
                                                <span class="input-group-addon" style="border-left: none; background: transparent;">m<sup>2</sup></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label for="modality_1" class="col-md-4 control-label">业态</label>
                                        <div class="col-md-8 col-sm-12">
                                            <select class="select2" id="modality_1" name="modality_1" style="width: 100%">
                                                <option value="">未选择</option>
                                                <option value="零售">零售</option>
                                                <option value="餐饮">餐饮</option>
                                                <option value="娱乐服务">娱乐服务</option>
                                                <option value="儿童">儿童</option>
                                                <option value="主力店">主力店</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="box box-default" id="storeUtilityInfo">    
                            <div class="box-header with-border">
                                <h3 class="box-title">配置信息</h3>
                                <div class="box-tools">
                                    <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="box-body">
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label for="height" class="col-md-4 control-label">层高</label>
                                        <div class="col-md-8 col-sm-12">
                                            <div class="input-group">
                                                <input class="form-control money" id="height" name="height" type="text" style="border: 1px solid #ccc; background: #fff; border-right: none;" />                                                
                                                <span class="input-group-addon" style="border-left: none; background: transparent;">米</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label for="waterFlag" class="col-md-4 control-label">是否通水</label>
                                        <div class="col-md-8 col-sm-12">
                                            <select class="select2" id="waterFlag" name="waterFlag" style="width: 100%">
                                                <option value="">未选择</option>
                                                <option value="1">是</option>
                                                <option value="0">否</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label for="electricFlag" class="col-md-4 control-label">是否通电</label>
                                        <div class="col-md-8 col-sm-12">
                                            <select class="select2" id="electricFlag" name="electricFlag" style="width: 100%">
                                                <option value="">未选择</option>
                                                <option value="1">是</option>
                                                <option value="0">否</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label for="networkFlag" class="col-md-4 control-label">是否通网络</label>
                                        <div class="col-md-8 col-sm-12">
                                            <select class="select2" id="networkFlag" name="networkFlag" style="width: 100%">
                                                <option value="">未选择</option>
                                                <option value="1">是</option>
                                                <option value="0">否</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label for="networkFlag" class="col-md-4 control-label">是否通煤气</label>
                                        <div class="col-md-8 col-sm-12">
                                            <select class="select2" id="networkFlag" name="networkFlag" style="width: 100%">
                                                <option value="">未选择</option>
                                                <option value="1">是</option>
                                                <option value="0">否</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label for="freeState" class="col-md-4 control-label">装修情况</label>
                                        <div class="col-md-8 col-sm-12 required">
                                            <input class="form-control" type="text" id="freeState" name="freeState" maxlength="64">
                                            <div id="errorcontainer-freeState" class="errorDiv"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="box box-default" id="storeEnclosed">    
                            <div class="box-header with-border">
                                <h3 class="box-title">铺位附件</h3>
                                <div class="box-tools">
                                    <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="box-body">
                                <div class="col-md-12">
                                    <table class="table table-responsive" style="margin-top: 0; text-align: left;">
                                        <thead id="assetsListingTable-sticky-header">
                                            <tr>
                                                <th style="text-align: left;">
                                                    <div class="th-inner">附件类型</div>
                                                    <div class="fht-cell"></div>
                                                </th>
                                                <th style="text-align: left;">
                                                    <div class="th-inner">上传时间</div>
                                                    <div class="fht-cell"></div>
                                                </th>
                                                <th style="text-align: left;">
                                                    <div class="th-inner">文件名</div>
                                                    <div class="fht-cell"></div>
                                                </th>
                                                <th style="text-align: left;">
                                                    <div class="th-inner">大小</div>
                                                    <div class="fht-cell"></div>
                                                </th>
                                                <th style="text-align: left;">
                                                    <div class="th-inner">操作</div>
                                                    <div class="fht-cell"></div>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody id="fileList"></tbody>
                                    </table>
                                </div>

                                <div class="col-md-12">
                                    <div class="col-md-12">
                                        <label class="col-md-2 control-label">附件</label>
                                        <div class="col-md-10 col-sm-12">
                                            <div class="form-group input-group">
                                                <input type="text" id="fileName" class="form-control" disabled style="background-color: #fff; border: solid 1px rgb(210, 214, 222);">
                                                <input type="file" style="display: none;" onchange="javascript:$('input[id=\'fileName\']').val(this.files[0].name);" accept="image/*,application/pdf" multiple />
                                                <div type="button" class="input-group-addon" id="uploadFile" style="padding: 6px 12px; font-size: 11px; cursor: pointer; border-left: 0 none; border-right: 0 none;"><i class="fa fa-upload"></i> 上传文件</div>
                                                <div type="button" class="input-group-addon" style="background-color: #3c8dbc; border-color: #367fa9; padding: 6px 12px; font-size: 11px; cursor: pointer; color: #fff;" onclick="javascript:$(this).parent().find('input[type=\'file\']').click();"><i class="fa fa-folder-open-o"></i> 选择文件 &hellip;</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="box box-default" id="storeRemarks">    
                            <div class="box-header with-border">
                                <h3 class="box-title">说明</h3>
                                <div class="box-tools">
                                    <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="box-body">
                                <div class="col-md-12">
                                    <textarea class="form-control" id="remark" rows="3"></textarea>
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