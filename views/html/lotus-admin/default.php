<?php
$scripts = $scripts . '<script src="/views/assets/base/js/lotus-admin/default-admin.js" type="text/javascript"></script>'
    . '<script src="/views/assets/plugins/datepicker/bootstrap-datepicker.min.js" type="text/javascript"></script>'
    . '<script src="/views/assets/plugins/datepicker/bootstrap-datepicker.zh-CN.min.js" type="text/javascript"></script>';
?>
<link href="/views/assets/plugins/datepicker/bootstrap-datepicker.css" rel="stylesheet" type="text/css" media="all" />

<?php $_SESSION['record_url'] = 'http://'.$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI']; ?>
<?php include 'sidebar.php'; ?>

<div class="content-wrapper" style="overflow: hidden;">
    <section class="content-header" style="padding-bottom: 30px;">
        <h1  class="pull-left"><span id="mallName"></span> <span id="floorNo"></span></h1>
    </section>
    
    <section class="content">
        <div class="col-lg-12" id="map_canvas">
            <div id="webui">
                <div class="box box-default" style="overflow: auto;">
                    <div class="box-header with-border">
                        <h3 class="box-title">楼层图</h3>
                        <div class="c-label" id="fmap" style="display: inline-block;">
                            <span style="margin-left: 5px; background-color: #d3fdd9; width: 13px; height: 13px; display: inline-block;"></span> 在租 <span id="leased"></span>%
                            <span style="margin-left: 5px; background-color: #ff2700; width: 13px; height: 13px; display: inline-block;"></span> 空铺 <span id="empty"></span>%
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
    <div class="modal-dialog modal-md">
        <div class="modal-content c-square">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span></button>
                <h4 class="modal-title" id="contractName"></h4>
            </div>
            <div class="modal-body">
                <div class="col-md-6">
                    <div class="form-group">
                        <span class="control-label">合同类型:</span>
                        <strong id="contractType" class="control-label"></strong>
                    </div>
                    <div class="form-group">
                        <span class="control-label">商户名称:</span>
                        <strong id="tenantName" class="control-label"></strong>
                    </div>
                    <div class="form-group">
                        <span class="control-label">一级业态:</span>
                        <strong id="modality1" class="control-label"></strong>
                    </div>
                    <div class="form-group">
                        <span class="control-label">二级业态:</span>
                        <strong id="modality2" class="control-label"></strong>
                    </div>
                    <div class="form-group">
                        <span class="control-label">三级业态:</span>
                        <strong id="modality3" class="control-label"></strong>
                    </div>
                    <div class="form-group">
                        <span class="control-label">扣率:</span>
                        <strong id="deduct" class="control-label"></strong>
                    </div>
                    <div class="form-group">
                        <span class="control-label">日坪效(元/㎡/天):</span>
                        <strong id="totalAmountDay" class="control-label"></strong>
                    </div>
                    <div class="form-group">
                        <span class="control-label">押金金额:</span>
                        <strong id="depositAmount" class="control-label"></strong>
                    </div>
                    <div class="form-group">
                        <span class="control-label">合同起始日:</span>
                        <strong id="startDate" class="control-label"></strong>
                    </div>
                </div>
                
                <div class="col-md-6">
                    <div class="form-group">
                        <span class="control-label">签约情况:</span>
                        <strong id="contractStatus" class="control-label"></strong>
                    </div>
                    <div class="form-group">
                        <span class="control-label">店铺位置代码:</span>
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
                        <span class="control-label">合同总收入(A+B+C):</span>
                        <strong id="totalAmount" class="control-label"></strong>
                    </div>
                    <div class="form-group">
                        <span class="control-label">(A)合同租金:</span>
                        <strong id="rentAmount" class="control-label"></strong>
                    </div>
                    <div class="form-group">
                        <span class="control-label">(B)合同管理费:</span>
                        <strong id="managerAmount" class="control-label"></strong>
                    </div>
                    <div class="form-group">
                        <span class="control-label">(C)合同促销费:</span>
                        <strong id="promotionAmount" class="control-label"></strong>
                    </div>
                    <div class="form-group">
                        <span class="control-label">合同终止日:</span>
                        <strong id="endDate" class="control-label"></strong>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<?php include ('footer.php'); ?>