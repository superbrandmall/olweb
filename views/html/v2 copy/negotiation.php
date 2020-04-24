<?php
$scripts = $scripts. '<script type="text/javascript" src="/views/assets/base/js/v2/negotiation-admin.js"></script>';
?>

<div id="wrapper">
    <?php include ('navbar_top.php'); ?>
    <div id="page-wrapper">
        <div class="row">
            <div class="col-xs-12">
                <h4 class="page-header"><i class="fa fa-rocket" aria-hidden="true"></i> 智能报价 - 商讨合同</h4>
                <div class="alert alert-danger">
                    现阶段没有合适的合作机会，期待将来的合作。
                </div>
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <i class="fa fa-info-circle" aria-hidden="true"></i> 基础信息
                    </div>
                    <div class="panel-body">
                        <div class="table-responsive">
                            <table class="table table-striped table-bordered table-hover no-footer" cellspacing="0">
                                <tbody>
                                    <tr>
                                        <td class="table-sub-title"> 位置</td>
                                        <td><span id="room_name"></span></td>
                                    </tr>
                                    <tr>
                                        <td class="table-sub-title"> 租赁面积</td>
                                        <td><span id="area"></span>m<sup class="small-price">2</sup></td>
                                    </tr>
                                    <tr>
                                        <td class="table-sub-title"> 交付时间</td>
                                        <td>2020-04-01</td>
                                    </tr>
                                    <tr>
                                        <td class="table-sub-title"> 装修免租期</td>
                                        <td>45天</td>
                                    </tr>
                                    <tr>
                                        <td class="table-sub-title"> 开业日</td>
                                        <td>2020-05-16</td>
                                    </tr>     
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                
                <div id="contract_info" class="panel panel-default" style="border-color: #E7505A;">
                    <div class="panel-heading">
                        <i class="fa fa-paperclip" aria-hidden="true"></i> 合同信息
                    </div>
                    <div class="panel-body">
                        <ul class="nav nav-tabs" role="tablist">
                            <li role="presentation" class="active"><a href="#tab-content-1" role="tab" data-toggle="tab">第1年</a></li>
                            <li role="presentation"><a href="#tab-content-2" role="tab" data-toggle="tab">第2年</a></li>
                        </ul>
                        <div class="tab-content">
                            <div role="tabpanel" class="tab-pane active" id="tab-content-1">
                                <div class="table-responsive">
                                    <table class="table table-striped table-bordered table-hover no-footer" cellspacing="0">
                                        <tbody>
                                            <tr>
                                                <td class="table-sub-title"> 日固定租金</td>
                                                <td><input type="text" id="daily_rent_1" class="daily_rent" value="20" style="width: 50%; border: solid 1px #E7505A;">元/m<sup class="small-price">2</sup></td>
                                            </tr>
                                            <tr class="even">
                                                <td class="table-sub-title"> 月固定租金</td>
                                                <td><span id="monthly_rent_1">255,560.83</span>元</td>
                                            </tr>
                                            <tr>
                                                <td class="table-sub-title"> 扣率</td>
                                                <td>20%</td>
                                            </tr>
                                            <tr class="even">
                                                <td class="table-sub-title"> 物业管理费</td>
                                                <td>29,407元</td>
                                            </tr>
                                            <tr>
                                                <td class="table-sub-title"> 比率推广费(按销售业绩)</td>
                                                <td>1.50%</td>
                                            </tr>      
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div role="tabpanel" class="tab-pane" id="tab-content-2">
                                <div class="table-responsive">
                                    <table class="table table-striped table-bordered table-hover no-footer" cellspacing="0">
                                        <tbody>
                                            <tr>
                                                <td class="table-sub-title"> 日固定租金</td>
                                                <td><input type="text" id="daily_rent_2" value="24.5" style="width: 50%; border: solid 1px #E7505A;">元/m<sup class="small-price">2</sup></td>
                                            </tr>
                                            <tr class="even">
                                                <td class="table-sub-title"> 月固定租金</td>
                                                <td><span id="monthly_rent_2">325,840.06元</span></td>
                                            </tr>
                                            <tr>
                                                <td class="table-sub-title"> 扣率</td>
                                                <td>21%</td>
                                            </tr>
                                            <tr class="even">
                                                <td class="table-sub-title"> 物业管理费</td>
                                                <td>29,407元</td>
                                            </tr>
                                            <tr>
                                                <td class="table-sub-title"> 比率推广费(按销售业绩)</td>
                                                <td>1.50%</td>
                                            </tr>      
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <p>*以上固定租金和物业管理费，推广费都为不含税价格，固定租金税率5%，物业管理费和推广费税率6%</p>
                    </div>
                </div>
                
                <div class="panel panel-default">
                    <div class="panel-body">
                        <div class="table-responsive">
                            <table class="table table-striped table-bordered table-hover no-footer" cellspacing="0">
                                <tbody>
                                    <tr>
                                        <td class="table-sub-title"> 保证金</td>
                                        <td>898,530.87元</td>
                                    </tr>     
                                </tbody>
                            </table>
                        </div>
                        <p>*保证金构成=3个月最高固定租金含税价+3个月最高物业管理费含税价</p>
                    </div>
                </div>
            </div>
            <div class="col-xs-12">
                <center>
                    <button class="btn btn-primary" id="apply_price" onclick="javascript: $('#negotiate-apply').modal('toggle');"><i class="fa fa-paper-plane" aria-hidden="true"> </i> 提交修改合同申请</button>
                </center><br><br>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="negotiate-apply" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-md">
        <div class="modal-content c-square">
            <div class="modal-body">
                <i class="fa fa-check" aria-hidden="true"></i> 报价发送成功！
            </div>
        </div>
    </div>
</div>

<?php include ('menu_bottom.php'); ?>
<?php include ('footer.php'); ?>