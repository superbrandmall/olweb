<?php
$scripts = $scripts. '<script type="text/javascript" src="/views/assets/base/js/v2/bill-admin.js"></script>'
        . '<script src="/views/assets/plugins/pdfjs/build/pdf.worker.js" type="text/javascript"></script>';
?>

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
                            <p><i class="fa fa-credit-card" aria-hidden="true"></i> 银联在线支付</p>
                            <small>大额轻松付，担保无忧</small>
                        </div>
                        <div class="weui-cell__ft">
                            <input type="radio" name="payment" class="weui-check" id="unionPay" checked="checked" />
                            <span class="weui-icon-checked"></span>
                        </div>
                    </label>
                    <div class="weui-cell__bd" style="padding: 16px 32px;">
                        <i class="fa fa-envelope" aria-hidden="true"></i> <input name="unionPayEmail" id="unionPayEmail" type="email" class="weui-input" required placeholder="银联支付链接需要发送到的邮箱" style="width: auto; margin-left: 5px;" />
                    </div>
                    <label class="weui-cell weui-cell_active weui-check__label" for="offline">
                        <div class="weui-cell__bd">
                            <p><i class="fa fa-desktop" aria-hidden="true"></i> 对公转账</p>
                            <small>收款户名: 上海帝泰发展有限公司</small>
                        </div>
                        <div class="weui-cell__ft">
                            <input type="radio" name="payment" class="weui-check" id="offline" />
                            <span class="weui-icon-checked"></span>
                        </div>
                    </label>
                    <div class="weui-cell__bd" style="padding: 16px 32px;">
                        <i class="fa fa-envelope" aria-hidden="true"></i> <input name="offlineEmail" id="offlineEmail" type="email" class="weui-input" required placeholder="账单需要发送到的邮箱" style="width: auto; margin-left: 5px;"/>
                    </div>
                    <label class="weui-cell weui-cell_active weui-check__label" for="wechatPay" style="color: #999;">
                        <div class="weui-cell__bd">
                            <p><span class="icon icon-14"></span> 微信</p>
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

<div class="page" style="display: none">
    <div class="weui-msg">
        <div class="weui-msg__icon-area"><i class="weui-icon-success weui-icon_msg"></i></div>
        <div class="weui-msg__text-area">
            <h2 class="weui-msg__title">邮件发送成功</h2>
            <p class="weui-msg__desc">请在24小时内通过<b style="font-size: 18px; color: red;">收到的银联支付链接</b>或<b style="font-size: 18px; color: red;">线下付款</b>向我司转账</p>
        </div>
        <div class="weui-msg__opr-area">
            <p class="weui-btn-area">
                <a href="javascript:;" id="confirm" class="weui-btn weui-btn_primary">确定</a>
            </p>
        </div>
        <div class="weui-msg__tips-area">
        <span style="color: red;">特别提醒</span>（转账前必读）
        <ol style="margin: 0 15px; font-size: smaller">
            <li><span style="color: red;">转账金额与订单金额务必保持一致</span>。不得多转，不得少转，不得分次转账，否则无法完成支付；</li>
            <li><span style="color: red;">请您务必使用上述提供的账号进行转账</span>，不得向其它任何银行账户转账，否则造成的损失由您自行承担（可能钱货两空），平台不负任何责任；</li>
            <li>我司收款账户到账后，订单即支持成功；</li>
        </ol>
        </div>
    </div>
</div>

<br>
<br>
<br>

<?php include ('menu_bottom.php'); ?>
<?php include ('footer.php'); ?>