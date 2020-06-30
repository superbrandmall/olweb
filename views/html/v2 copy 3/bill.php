<?php
$scripts = $scripts. '<script type="text/javascript" src="/views/assets/base/js/v2/bill-admin.js"></script>'
        . '<script src="/views/assets/plugins/pdfjs/build/pdf.worker.js" type="text/javascript"></script>';
?>

<?php include ('navbar_top.php'); ?>
<div class="weui-toptips bg-success topTips"><i class="fa fa-gratipay" aria-hidden="true"></i> 太激动了，我们快要成交了！在这里您可以看到"应缴金额"并选择支付方式，付款成交后会有服务人员与您联系哦。</div>

<div class="page__bd" style="font-size: 15px;">
    <div class="page__bd">
        <div class="weui-form-preview">
            <div class="weui-form-preview__hd">
                <div class="weui-form-preview__item">
                    <label class="weui-form-preview__label">待付款金额</label>
                    <em class="weui-form-preview__value">¥<span id="amount"></span></em>
                </div>
            </div>
            <div class="weui-form-preview__bd">
                <div class="weui-form-preview__item">
                    <label>上海陆家嘴正大广场<span id="unitDesc"></span></label>
                </div>
                <div class="weui-form-preview__item leasing-terms" style="display: none;">
                    <label>应缴金额=保证金+首月固定租金与物业管理费(含税)</label>
                </div>
                <div class="weui-form-preview__item leasing-terms" style="display: none;">
                    <label>保证金构成=3x(最高月固定租金+物业管理费)(含税)</label>
                </div>
            </div>
        </div>
        
        <div class="weui-form__control-area">
            <div class="weui-cells__group weui-cells__group_form">
                <div class="weui-cells_radio">
                    <label class="weui-cell weui-cell_active weui-check__label" for="unionPay">
                        <div class="weui-cell__bd">
                            <p><i class="fa fa-credit-card" aria-hidden="true"></i> 对公转账</p>
                            <small>大额轻松付，担保无忧</small><br>
                            <small>收款户名: 上海帝泰发展有限公司</small>
                        </div>
                        <div class="weui-cell__ft">
                            <input type="radio" name="payment" class="weui-check" id="unionPay" checked="checked" />
                            <span class="weui-icon-checked"></span>
                        </div>
                    </label>
                    <label class="weui-cell weui-cell_active weui-check__label" for="wechatPay" style="color: #999;">
                        <div class="weui-cell__bd">
                            <p><span class="icon icon-14"></span> 微信</p>
                            <small>微信支付,不止支付</small><br>
                            <small>此服务尚未开通</small>
                        </div>
                        <div class="weui-cell__ft">
                            <input type="radio" name="payment" class="weui-check" id="wechatPay" disabled />
                            <span class="weui-icon-checked"></span>
                        </div>
                    </label>
                    <label class="weui-cell weui-cell_active weui-check__label" for="aliPay" style="color: #999;">
                        <div class="weui-cell__bd">
                            <p><span class="icon icon-11"></span> 支付宝</p>
                            <small>支付宝，知托付</small><br>
                            <small>此服务尚未开通</small>
                        </div>
                        <div class="weui-cell__ft">
                            <input type="radio" name="payment" class="weui-check" id="aliPay" disabled />
                            <span class="weui-icon-checked"></span>
                        </div>
                    </label>
                </div>
            </div>
        </div>
        
        <div class="weui-form-preview">
            <div class="weui-form-preview__ft">
                <a class="weui-form-preview__btn weui-form-preview__btn_default" href="javascript:history.back(-1);">返回</a>
                <a class="weui-form-preview__btn weui-form-preview__btn_primary" id="startPay" style="background: #07c160; color: #fff;">去付款</a>
            </div>
        </div>
    </div>
</div>

<div id="pay_1" class="weui-gallery" style="display: none; background-color: #fff;">
    <a id="facial" href='#!'><img src="/views/assets/base/img/content/backgrounds/890000-1.jpg" width="100%" /></a>
    <div class="weui-gallery__opr">
        <a href="javascript:" class="weui-gallery__del">
            <i class="fa fa-times" aria-hidden="true" style="color: #fff;" onclick='$("#pay_1").hide();'></i>
        </a>
    </div>
</div>
<br>
<br>
<br>

<?php include ('menu_bottom.php'); ?>
<?php include ('footer.php'); ?>