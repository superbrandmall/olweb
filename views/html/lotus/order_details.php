<?php
$scripts = $scripts. '<script type="text/javascript" src="/views/assets/base/js/nikola/bootstrap.bundle.min.js"></script>
                    <script type="text/javascript" src="/views/assets/base/js/nikola/blocs.min.js"></script>
                    <script type="text/javascript" src="/views/assets/base/js/v2/order_details-admin.js"></script>';
?>

<link rel="stylesheet" type="text/css" href="/views/assets/base/css/nikola/bootstrap.min.css" />
<link rel="stylesheet" type="text/css" href="/views/assets/base/css/nikola.css" />

<div class="page__bd" style="background-color: #EDEDED;">
    <div class="page__bd">
        <div class="weui-cells">
            <div class="weui-cell">
                <div id="orderTitle" class="icon-box"></div>
            </div>
        </div>
        
        <div id="order" class="weui-panel"></div>
        
        <div class="weui-panel">
            <div class="weui-panel__hd">订单信息</div>
            <div class="weui-form-preview">
                <div id="orderDetails" class="weui-form-preview__bd" style="overflow: auto;">
                    <div class="weui-form-preview__item">
                        <span class="weui-form-preview__label">租户交易号</span>
                        <span class="weui-form-preview__value"><small id="outTradeNo"></small></span>
                    </div>
                    <div class="weui-form-preview__item">
                        <span class="weui-form-preview__label">创建日期</span>
                        <span class="weui-form-preview__value"><span id="createDate"></span></span>
                    </div>
                    <div class="weui-form-preview__item">
                        <span class="weui-form-preview__label">位置</span>
                        <span class="weui-form-preview__value"><span id="unitDesc"></span></span>
                    </div>
                    <div class="weui-form-preview__item">
                        <span class="weui-form-preview__label">品牌</span>
                        <span class="weui-form-preview__value"><span id="brandName"></span></span>
                    </div>
                    <div id="leasing_price" style="display: none;">
                        <div class="weui-form-preview__item">
                            <span class="weui-form-preview__label">装修期满后首月固定租金(含税)</span>
                            <span class="weui-form-preview__value">¥ <span id="rent"></span></span>
                        </div>
                        <div class="weui-form-preview__item">
                            <span class="weui-form-preview__label">租赁期内首月物业管理费(含税)</span>
                            <span class="weui-form-preview__value">¥ <span id="maintenance"></span></span>
                        </div>
                        <div class="weui-form-preview__item">
                            <span class="weui-form-preview__label">租赁保证金(含税)</span>
                            <span class="weui-form-preview__value">¥ <span id="deposit"></span></span>
                        </div>
                        <div class="weui-form-preview__item">
                            <span class="weui-form-preview__label">数据采集设备押金</span>
                            <span class="weui-form-preview__value">¥ 3,000.00</span>
                        </div>
                        <p style="text-align: left;"><small><i class="fa fa-exclamation-triangle" aria-hidden="true"></i> 应缴金额 = 租赁保证金 + 数据采集设备押金 + 首月固定租金与物业管理费(含税)</small></p>
                        <p style="text-align: left;"><small><i class="fa fa-exclamation-triangle" aria-hidden="true"></i> 租赁保证金 = 3 x (最高月固定租金 + 物业管理费)(含税)</small></p>
                    </div>
                    <div id="adevent_price" style="display: none;">
                        <div class="weui-form-preview__item">
                            <span class="weui-form-preview__label">合同总金额</span>
                            <span class="weui-form-preview__value">¥ <span id="adevent_rent"></span></span>
                        </div>
                        <div class="weui-form-preview__item">
                            <span class="weui-form-preview__label">押金</span>
                            <span class="weui-form-preview__value">¥ <span id="adevent_deposit"></span></span>
                        </div>
                        <p style="text-align: left;"><small><i class="fa fa-exclamation-triangle" aria-hidden="true"></i> 应缴金额 = 押金 + 合同总金额</small></p>
                        <p style="text-align: left;"><small><i class="fa fa-exclamation-triangle" aria-hidden="true"></i> 押金 = 20%合同总金额</small></p>
                    </div>
                    <br>
                </div>
            </div>
        </div>
    </div>
</div>

<br>
<br>
<br>
<?php include ('timeline/step_three.php'); ?>
<?php include ('footer.php'); ?>