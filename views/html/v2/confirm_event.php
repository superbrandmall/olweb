<?php
$scripts = $scripts . '<script type="text/javascript" src="/views/assets/base/js/v2/confirm-event-admin.js"></script>'
        . '<script src="/views/assets/plugins/daterangepicker/moment.min.js" type="text/javascript"></script>'
        . '<script src="/views/assets/plugins/daterangepicker/daterangepicker.js" type="text/javascript"></script>';
?>
<link href="/views/assets/plugins/daterangepicker/daterangepicker.css" rel="stylesheet" type="text/css" media="all" />

<div id="wrapper">
    <?php include ('navbar_top.php'); ?>
    <div id="page-wrapper">
        <div class="row">
            <div class="col-xs-12">
                <h4 class="page-header"><i class="fa fa-list-alt" aria-hidden="true"></i> 商品清单</h4>
                <div class="form-group">
                    <label><i class="fa fa-calendar" aria-hidden="true"></i> 档期选择</label>
                    <input type="text" id="daterange" name="daterange" class="form-control input-sm" style="background: #fff;" readonly>
                    <p>*我司对档期有最终解释权</p>
                </div>
                <div class="form-group">
                    <label><i class="fa fa-gift" aria-hidden="true"></i> 增值有偿服务</label>
                    <div class="checkbox">
                        <label>
                            <input type="checkbox" value="" checked>垃圾清运费服务: 活动所产生的干垃圾收费标准为 40 元/桶、生活湿垃圾为 60 元/桶，标准环卫桶 240L/桶; 建筑垃圾为 1200 元/车
                        </label>
                    </div>
                    <div class="checkbox">
                        <label>
                            <input type="checkbox" value="" checked>保安服务: 55元/人/小时（不含税）58元/人/小时（含税）
                        </label>
                    </div>
                    <div class="checkbox">
                        <label>
                            <input type="checkbox" value="" checked>保洁服务: 30元/人/小时（含税）
                        </label>
                    </div>
                    <p>*有偿服务需另行签署补充协议</p>
                </div>
                <label><i class="fa fa-money" aria-hidden="true"></i> 您的报价</label>
                <div class="form-group input-group">
                    <input type="text" class="form-control input-sm">
                    <span class="input-group-addon input-sm">元</span>
                </div>
                <p>*税金为5%</p>
            </div>
            
        </div>
        <br>
        <div class="row">
            <div class="col-xs-12">
                <center>
                    <button class="btn btn-warning" id="pay" onclick="javascript: $('#pay_bill').modal('toggle');"><i class="fa fa-check" aria-hidden="true"></i> 支付订单</button>
                </center>
            </div>
        </div>
        <?php include ('menu_bottom.php'); ?>
    </div>
    
    <div class="modal fade" id="pay_bill" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-md">
            <div class="modal-content c-square">
                <div class="modal-body" style="padding: 0;">
                    <a id="facial" href='#!'><img src="/views/assets/base/img/content/backgrounds/5000-1.jpg" class="img-responsive" /></a>
                </div>
            </div>
        </div>
    </div>

    <?php include ('footer.php'); ?>