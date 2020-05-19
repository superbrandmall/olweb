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
                    <label class="weui-form-preview__label">应缴金额</label>
                    <em class="weui-form-preview__value">¥898,530.87</em>
                </div>
            </div>
            <div class="weui-form-preview__bd">
                <div class="weui-form-preview__item">
                    <label class="weui-form-preview__label" style="text-align: left;">上海陆家嘴正大广场5F58</label>
                </div>
                <div class="weui-form-preview__item">
                    <label class="weui-form-preview__label" style="text-align: left;">应缴金额=保证金+首月固定租金与物业管理费(含税)</label>
                </div>
                <div class="weui-form-preview__item">
                    <label class="weui-form-preview__label" style="text-align: left;">保证金构成=3x(最高月固定租金+物业管理费)(含税)</label>
                </div>
            </div>
            <div class="weui-form-preview__ft">
                <a class="weui-form-preview__btn weui-form-preview__btn_default" href="javascript:history.back(-1);">返回</a>
                <a class="weui-form-preview__btn weui-form-preview__btn_primary" href="javascript: startPay();">支付</a>
            </div>
        </div>
        
        <div class="weui-form__text-area" style="margin-top: 25px;">
            <h2 class="weui-form__title">支付方式选择</h2>
        </div>
        <div class="weui-form__control-area">
            <div class="weui-cells__group weui-cells__group_form">
                <div class="weui-cells weui-cells_radio">
                    <label class="weui-cell weui-cell_active weui-check__label" for="x11">
                        <div class="weui-cell__bd">
                            <p><i class="fa fa-credit-card" aria-hidden="true"></i> 银行卡转账</p>
                        </div>
                        <div class="weui-cell__ft">
                            <input type="radio" class="weui-check" name="radio1" id="x11" disabled />
                            <span class="weui-icon-checked"></span>
                        </div>
                    </label>
                    <label class="weui-cell weui-cell_active weui-check__label" for="x12">
                        <div class="weui-cell__bd">
                            <p><i class="fa fa-weixin" aria-hidden="true"></i> 微信支付</p>
                        </div>
                        <div class="weui-cell__ft">
                            <input type="radio" name="radio1" class="weui-check" id="x12" checked="checked"/>
                            <span class="weui-icon-checked"></span>
                        </div>
                    </label>
                    <label class="weui-cell weui-cell_active weui-check__label" for="x13">
                        <div class="weui-cell__bd">
                            <p><i class="fa fa-weixin" aria-hidden="true"></i> 支付宝支付</p>
                        </div>
                        <div class="weui-cell__ft">
                            <input type="radio" name="radio1" class="weui-check" id="x13" />
                            <span class="weui-icon-checked"></span>
                        </div>
                    </label>
                </div>
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
<br>

<?php include ('menu_bottom.php'); ?>
<?php include ('footer.php'); ?>