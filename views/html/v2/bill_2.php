<?php
$scripts = $scripts. '<script type="text/javascript" src="/views/assets/base/js/nikola/bootstrap.bundle.min.js"></script>
                    <script type="text/javascript" src="/views/assets/base/js/nikola/blocs.min.js"></script>
                    <script type="text/javascript" src="/views/assets/plugins/ap.js"></script>
                    <script type="text/javascript" src="/views/assets/base/js/v2/bill2-admin.js"></script>';
?>

<link rel="stylesheet" type="text/css" href="/views/assets/base/css/nikola/bootstrap.min.css" />
<link rel="stylesheet" type="text/css" href="/views/assets/base/css/nikola.css" />

<div class="page__bd" style="margin-top: 65px; font-size: 15px;">
    <div class="page__bd">
        <div class="weui-form-preview">
            <div class="weui-form-preview__hd">
                <p style="text-align: left; margin-bottom: 20px;">感谢贵司对"<span class="org"></span>"的信赖。支付后请于<strong id="expect"></strong>日前往<span id="mall"></span>与我司完成线下签约。</p>
                <div class="weui-form-preview__item">
                    <h2 class="weui-form-preview__label">第一笔付款</h2>
                    <em class="weui-form-preview__value">¥ 1,000.00</em>
                </div>
                <div class="weui-form-preview__item">
                    <label class="weui-form-preview__label"><small>不可退还、不可转让</small></label>
                    <em class="weui-form-preview__value"><small>(此定金不可退)</small></em>
                </div>
                <small>
                    <i class="fa fa-exclamation" aria-hidden="true"></i> 温馨提示: 请您在支付定金前确认合同内容
                </small>
            </div>
            <div class="weui-form-preview__bd">
                <div class="weui-form-preview__item">
                    <label class="weui-form-preview__label">租户交易号</label>
                    <span class="weui-form-preview__value"><span id="outTradeNo"></span></span>
                </div>
                <div class="weui-form-preview__item">
                    <label class="weui-form-preview__label">位置</label>
                    <span class="weui-form-preview__value"><span id="unitDesc"></span></span>
                </div>
                <div id="leasing_price">
                    <div class="weui-form-preview__item">
                        <label class="weui-form-preview__label">装修期满后首月固定租金(含税)</label>
                        <span class="weui-form-preview__value">¥ <span id="rent"></span></span>
                    </div>
                    <div class="weui-form-preview__item">
                        <label class="weui-form-preview__label">租赁期内首月物业管理费(含税)</label>
                        <span class="weui-form-preview__value">¥ <span id="maintenance"></span></span>
                    </div>
                    <div class="weui-form-preview__item">
                        <label class="weui-form-preview__label">租赁保证金(含税)</label>
                        <span class="weui-form-preview__value">¥ <span id="deposit"></span></span>
                    </div>
                    <div class="weui-form-preview__item">
                        <label class="weui-form-preview__label">数据采集设备押金</label>
                        <span class="weui-form-preview__value">¥ 3,000.00</span>
                    </div>
                    <p style="text-align: left; padding: 0 16px 16px;"><small><i class="fa fa-exclamation-triangle" aria-hidden="true"></i> 租赁保证金 = 3 x (最高月固定租金 + 物业管理费)(含税)</small></p>
                </div>
            </div>
        </div>
        
        <div class="weui-form__control-area">
            <div class="weui-cells__group weui-cells__group_form">
                <div class="weui-cells_radio">
                    <label class="weui-cell weui-cell_active weui-check__label">
                        <h3>支付方式选择</h3>
                    </label>
                    <label class="weui-cell weui-cell_active weui-check__label" for="wechatPay">
                        <div class="weui-cell__bd">
                            <img src="/views/assets/base/img/content/banks/wechatpay.png" height="30">
                            <label class="label f-red b-red" style="padding: 2px; font-size: 11px; border-radius: 3px;">推荐</label>
                        </div>
                        <div class="weui-cell__ft" style="border: solid 1px #FEDEBA; padding-left: 0;">
                            <input type="radio" name="payment" class="weui-check placeholder" id="wechatPay" checked="checked" />
                            <span class="weui-icon-checked"></span>
                        </div>
                    </label>
                    <label class="weui-cell weui-cell_active weui-check__label" for="aliPay">
                        <div class="weui-cell__bd">
                            <img src="/views/assets/base/img/content/banks/alipay.png" height="30">
                        </div>
                        <div class="weui-cell__ft" style="border: solid 1px #FEDEBA; padding-left: 0;">
                            <input type="radio" name="payment" class="weui-check placeholder" id="aliPay" />
                            <span class="weui-icon-checked"></span>
                        </div>
                    </label>
                </div>
            </div>
        </div>
        <br>
        <br>
        
        <div class="weui-form-preview">
            <div class="weui-form-preview__ft">
                <a class="weui-form-preview__btn weui-form-preview__btn_default" href="javascript:history.back(-1);" style="color: #494949; border: solid 1px #EFE2D2; background: #fff;">返回</a>
                <a class="weui-form-preview__btn weui-form-preview__btn_primary" id="startPay" style="color: #583D35; border: solid 1px #968077; background: #FEDDB8; background: -webkit-linear-gradient(to bottom, #DAB892, #FEDDB8); background: linear-gradient(to bottom, #DAB892, #FEDDB8);">下一步</a>
            </div>
        </div>
    </div>
</div>

<div class="page" style="display: none">
    <div class="weui-msg">
        <div class="weui-msg__icon-area"><i class="weui-icon-success weui-icon_msg"></i></div>
        <div class="weui-msg__text-area">
            <h2 class="weui-msg__title">邮件发送成功</h2>
            <p class="weui-msg__desc">请尽快通过<b style="font-size: 18px; color: red;">收到的银联支付链接</b>或<b style="font-size: 18px; color: red;">线下付款</b>向我司转账</p>
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
            <li><span style="color: red;">请您务必使用邮件里提供的账号进行转账</span>，不得向其它任何银行账户转账，否则造成的损失由您自行承担（可能钱货两空），平台不负任何责任；</li>
            <li>我司收款账户到账后，订单即支付成功；</li>
        </ol>
        </div>
    </div>
</div>

<br>
<br>
<br>
<?php include ('footer.php'); ?>