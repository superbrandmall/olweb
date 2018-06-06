<?php
$scripts = '<script type="text/javascript" src="/views/assets/base/js/admin/bid-admin.js"></script>';
    
if(explode('?id=',$_SERVER['REQUEST_URI'])[1] != null) {
    $id = explode('?id=',$_SERVER['REQUEST_URI'])[1];
    if (strpos($id, '&k=') !== false) {
        $id = explode('&k=',$id)[0];
    }
} else {
    $id = null;
}
?>

<div id="wrapper">
    <?php include ('navbar_top.php'); ?>
    <?php include ('navbar_side.php'); ?>
    <div id="page-wrapper">
        <div class="row">
            <div class="col-lg-12">
                <h1 class="page-header">出价信息详情</h1>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-10">
                <div class="panel panel-default">
                    <div class="panel-body">
                        <div class="row">
                            <div class="col-md-3">
                                <div class="form-group">
                                    <label>出价编号</label>
                                    <input class="form-control" id="code" disabled>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="form-group">
                                    <label>审核状态</label>
                                    <input class="form-control" id="is_approve" disabled>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="form-group">
                                    <label>生效状态</label>
                                    <input class="form-control" id="is_effect" disabled>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="form-group">
                                    <label>账单号</label>
                                    <input class="form-control" id="bill_no" disabled>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="form-group">
                                    <label>项目名称</label>
                                    <input class="form-control" id="mall_name" disabled>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="form-group">
                                    <label>建筑名称</label>
                                    <input class="form-control" id="building_name" disabled>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="form-group">
                                    <label>楼层</label>
                                    <input class="form-control" id="floor_name" disabled>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="form-group">
                                    <label>单元号</label>
                                    <input class="form-control" id="unit" disabled>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="form-group">
                                    <label>商户名称</label>
                                    <input class="form-control" id="merchant_name" disabled>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="form-group">
                                    <label>品牌名称</label>
                                    <input class="form-control" id="brand_name" disabled>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="form-group">
                                    <label>出价状态</label>
                                    <input class="form-control" id="process_state" disabled>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="form-group">
                                    <label>出价失效日</label>
                                    <input class="form-control" id="expire_date" disabled>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="form-group">
                                    <label>合同期限</label>
                                    <div class="input-group">
                                        <input class="form-control" id="contract_length" disabled>
                                        <span class="input-group-addon">年</span>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="form-group">
                                    <label>开始日期</label>
                                    <input class="form-control" id="start_date" disabled>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="form-group">
                                    <label>终止日期</label>
                                    <input class="form-control" id="end_date" disabled>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="form-group">
                                    <label>开业日期</label>
                                    <input class="form-control" id="opening" disabled>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="form-group">
                                    <label>租赁类型</label>
                                    <input class="form-control" id="lease_type" disabled>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="form-group">
                                    <label>比高频率</label>
                                    <input class="form-control" id="compare_frequency" disabled>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="form-group">
                                    <label>计租方式</label>
                                    <input class="form-control" id="rent_method" disabled>
                                </div>
                            </div>
                             <div class="col-md-3">
                                <div class="form-group">
                                    <label>是否标准合同</label>
                                    <input class="form-control" id="is_standard" disabled>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="form-group">
                                    <label>租赁保证金</label>
                                    <div class="input-group">
                                        <input class="form-control" id="gurantee" disabled>
                                        <span class="input-group-addon">元</span>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="form-group">
                                    <label>装修期外物业费</label>
                                    <div class="input-group">
                                        <input class="form-control" id="maintenance_after_decoration" disabled>
                                        <span class="input-group-addon">元</span>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="form-group">
                                    <label>装修期内物业费</label>
                                    <div class="input-group">
                                        <input class="form-control" id="maintenance_during_decoration" disabled>
                                        <span class="input-group-addon">元</span>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="form-group">
                                    <label>公共事业费押金</label>
                                    <div class="input-group">
                                        <input class="form-control" id="public_deposit" disabled>
                                        <span class="input-group-addon">元</span>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="form-group">
                                    <label>营业时间</label>
                                    <input class="form-control" id="business_hours" disabled>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="form-group">
                                    <label>收银方式</label>
                                    <input class="form-control" id="cashier_mode" disabled>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="form-group">
                                    <label>装修免租期</label>
                                    <div class="input-group">
                                         <input class="form-control" id="free_days" disabled>
                                        <span class="input-group-addon">天</span>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="form-group">
                                    <label>目标营业额</label>
                                    <div class="input-group">
                                        <input class="form-control" id="target" disabled>
                                        <span class="input-group-addon">元</span>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="form-group">
                                    <label>推广费率</label>
                                    <div class="input-group">
                                        <input class="form-control" id="promotion_budget" disabled>
                                        <span class="input-group-addon">%</span>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="form-group">
                                    <label>推广活动类型</label>
                                    <input class="form-control" id="promotion_kind" disabled>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="form-group">
                                    <label>推广活动次数</label>
                                    <div class="input-group">
                                        <input class="form-control" id="promotion" disabled>
                                        <span class="input-group-addon">次</span>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>商务异议</label>
                                    <div contenteditable="true" style="height:100px;overflow:auto;" class="form-control" id="business_suggest" disabled></div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>法务异议</label>
                                    <div contenteditable="true" style="height:100px;overflow:auto;" class="form-control" id="legal_suggest" disabled></div>
                                </div>
                            </div>
                            <div class="clearfix"> </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-2">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <i class="fa fa-bell fa-fw"></i> 相关文件
                    </div>
                    <div class="panel-body">
                        <div class="list-group">
                            <a href="#" class="list-group-item" id="pdf">
                                <i class="fa fa-download fa-fw"></i> 合同
                                <span class="pull-right text-muted small"><em>下载</em>
                                </span>
                            </a>
                            <a href="#" class="list-group-item" id="pdf_temp">
                                <i class="fa fa-download fa-fw"></i> 预览合同
                                <span class="pull-right text-muted small"><em>下载</em>
                                </span>
                            </a>
                            <a href="#" class="list-group-item" id="deposit_bill_pdf">
                                <i class="fa fa-download fa-fw"></i> 保证金账单
                                <span class="pull-right text-muted small"><em>下载</em>
                                </span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-10">
                <div class="form-group" id="bid_details">
                    <label>出价明细</label>
                    <div class="table-responsive">
                        <table class="table table-striped table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th>开始日期</th>
                                    <th>结束日期</th>
                                    <th>固定租金</th>
                                    <th>浮动扣率</th>
                                </tr>
                            </thead>
                            <tbody></tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<?php include ('footer.php'); ?>