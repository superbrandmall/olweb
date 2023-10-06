<?php
if(explode('?id=', $_SERVER['REQUEST_URI'])[1] != null) {
    $id = explode('?id=', $_SERVER['REQUEST_URI'])[1];
    if (strpos($id, '&s=') !== false) {
        $id = explode('&s=', $id)[0];
    }
}

if(isset($_SESSION['lotus_admin_name']) && $_SESSION['lotus_admin_name'] == '马俊') {
    $scripts = $scripts .PHP_EOL. '        <script type="text/javascript" src="/views/assets/base/js/lotus-admin/default-admin.js"></script>'.PHP_EOL;
} else {
    $scripts = $scripts .PHP_EOL. '        <script type="text/javascript" src="/views/assets/base/js/lotus-admin/encrypted/default.js"></script>'.PHP_EOL;
}
?>

<?php $_SESSION['record_url'] = 'http://'.$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI']; ?>
<?php include 'sidebar.php'; ?>

<div class="content-wrapper" style="overflow: hidden;">
    <section class="sub-header">
        <div class="pull-left">
            <a href="/lotus-admin/malls" class="btn btn-link "><i class="fa fa-angle-left"></i> 返回列表</a>
        </div>
        <h4><b id="name2"></b> - <b id="floorNo"></b></h4>
        <div class="box-header" style="background-color: #ecf0f5; height: 50px;">
            <div class="pull-left">
                <ol class="breadcrumb" style="margin-bottom: 0; padding-left: 0;">
                    <li><a href="/lotus-admin/mall-detail?id=<?= $id; ?>">详细资料</a></li>
                    <li class="active"><a href="javascript: void(0);">平面图</a></li>
                    <li><a href="/lotus-admin/mall-summary?id=<?= $id; ?>">概要</a></li>
                </ol>
            </div>
        </div>
    </section>
    
    <section class="content" style="margin-top: 126px;">
        <div class="col-lg-12" id="map_canvas">
            <div id="webui">
                <div class="box box-default" style="overflow: auto;">
                    <div class="box-header with-border">
                        <h3 class="box-title">平面图</h3>
                        <div class="c-label" id="fmap" style="display: inline-block;">
                            <span style="margin-left: 5px; background-color: #e3efcf; border: solid 2px #5e5e59; width: 13px; height: 10px; display: inline-block;"></span> 在租 <span id="leased"></span>%
                            <span style="margin-left: 5px; background-color: #fbf9f4; border: solid 2px #5e5e59; width: 13px; height: 10px; display: inline-block;"></span> 空铺 <span id="empty"></span>%
                        </div>
                    </div>
                    <div class="box-body">
                        <div class="row">
                            <div class="form-group">
                                <div class="c-content-panel" style="background-color: transparent;">
                                    <div class="c-body" style="position: relative; margin-left: -3%;">
                                        <div style="position: absolute; top: 0;left: 5%; z-index: 1;">
                                            <button id="zoom_in" class="btn btn-xs btn-zoom">
                                                <i class="fa fa-plus"></i>
                                            </button>
                                            <button id="zoom_out" class="btn btn-xs btn-zoom">
                                                <i class="fa fa-minus"></i>
                                            </button>
                                        </div>
                                        <div id="floorList" class="btn-group-vertical" style="position: absolute; bottom: 0;right: 5%; z-index: 1;"></div>
                                        <img src="#" class="img-responsive" usemap="" id="map" />
                                        <map name="" id=""></map>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>        
            </div>
        </div>
    </section>
</div>

<div class="modal fade" id="shop_detail" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content c-square">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="col-md-4">
                    <div class="form-group" id="store_img"></div>
                </div>
                
                <div class="col-md-4 col-xs-6">
                    <div class="form-group" id="contractName"></div>
                    <div class="form-group">
                        <span class="control-label">合同类型:</span>
                        <strong id="formType" class="control-label"></strong>
                    </div>
                    <div class="form-group">
                        <span class="control-label">商户名称:</span>
                        <strong id="tenantName" class="control-label"></strong>
                    </div>
                    <div class="form-group">
                        <span class="control-label">业态:</span>
                        <strong id="bizTypeName" class="control-label"></strong>
                    </div>
                    <div class="form-group">
                        <span class="control-label">合同起始日:</span>
                        <strong id="startDate" class="control-label"></strong>
                    </div>
                </div>
                
                <div class="col-md-4 col-xs-6">
                    <div class="form-group">
                        <span class="control-label">门牌号:</span>
                        <strong id="unitName" class="control-label"></strong>
                    </div>
                    <div class="form-group">
                        <span class="control-label">位置代码:</span>
                        <strong id="unitCode" class="control-label"></strong>
                    </div>
                    <div class="form-group">
                        <span class="control-label">楼层:</span>
                        <strong id="floorName" class="control-label"></strong>
                    </div>
                    <div class="form-group">
                        <span class="control-label">合同面积:</span>
                        <strong id="unitArea" class="control-label"></strong>
                    </div>
                    <div class="form-group">
                        <span class="control-label">合同终止日:</span>
                        <strong id="endDate" class="control-label"></strong>
                    </div>
                </div>
                
                <div class="col-md-12" style="clear: both;">
                    <div class="box">
                        <div class="box-body">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="bootstrap-table">
                                        <div class="fixed-table-container table-no-bordered">
                                            <div class="fixed-table-body">
                                                <table class="table table-striped snipe-table table-responsive table-no-bordered" style="margin-top: 0">
                                                    <thead id="assetsListingTable-sticky-header" class="hidden-xs">
                                                        <tr>
                                                            <th>
                                                            </th>
                                                            <th style="text-align: left; padding: 8px;">
                                                                预算指标
                                                            </th>
                                                            <th style="text-align: left; padding: 8px;">
                                                                本合同
                                                            </th>
                                                            <th>
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody id="comparison">
                                                        <tr><td>合同总收入(A+B+C)(元)</td><td class="figure">0,00</td><td class="figure"></td><td>--</td></tr>
                                                        <tr><td>(A)固定租金(元)</td><td class="figure">0,00</td><td class="figure"></td><td>--</td></tr>
                                                        <tr><td>(B)物业管理费(元)</td><td class="figure">0,00</td><td class="figure"></td><td>--</td></tr>
                                                        <tr><td>(C)比率推广费(%)</td><td class="figure">0</td><td class="figure"></td><td>--</td></tr>
                                                        <tr><td>(C)固定推广费(元)</td><td class="figure">0,00</td><td class="figure"></td><td>--</td></tr>
                                                        <tr><td>提成扣率(%)</td><td class="figure">0</td><td class="figure"></td><td>--</td></tr>
                                                        <tr><td>保证金(元)</td><td class="figure">0,00</td><td class="figure"></td><td>--</td></tr>
                                                        <tr><td>日坪效(元/㎡/天)</td><td class="figure">0,00</td><td class="figure"></td><td>--</td></tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<?php include ('footer.php'); ?>