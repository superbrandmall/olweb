<?php
$scripts = $scripts. '<script type="text/javascript" src="/views/assets/base/js/v2/confirm-leasing-admin.js"></script>';
?>

<div id="wrapper">
    <?php include ('navbar_top.php'); ?>
    <div id="page-wrapper">
        <div class="row">
            <div class="col-xs-12">
                <h4 class="page-header"><i class="fa fa-list-alt" aria-hidden="true"></i> 商品清单 <span id="round"></span></h4>
                <div class="alert alert-warning">
                    <i class="fa fa-exclamation-triangle" aria-hidden="true"></i> 您回价的固定租金过低，请重新回价，请在x月x日前进行回价。
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
                
                <div class="panel panel-default">
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
                                                <td>20.00元/m<sup class="small-price">2</sup></td>
                                            </tr>
                                            <tr class="even">
                                                <td class="table-sub-title"> 月固定租金</td>
                                                <td>255,560.83元</td>
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
                                                <td>24.50元/m<sup class="small-price">2</sup></td>
                                            </tr>
                                            <tr class="even">
                                                <td class="table-sub-title"> 月固定租金</td>
                                                <td>325,840.06元</td>
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
                    <button class="btn btn-warning" id="pay" onclick="javascript: $('#pay_bill').modal('toggle');"><i class="fa fa-check" aria-hidden="true"></i> 支付订单</button>
                </center><br><br>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="pay_bill" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-md">
        <div class="modal-content c-square">
            <div class="modal-body" style="padding: 0;">
                <a id="facial" href='#!'><img src="/views/assets/base/img/content/backgrounds/890000-1.jpg" class="img-responsive" /></a>
            </div>
        </div>
    </div>
</div>

<?php include ('menu_bottom.php'); ?>
<?php include ('footer.php'); ?>