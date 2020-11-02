<?php
$scripts = $scripts. '<script type="text/javascript" src="/views/assets/base/js/v2/bill-admin.js"></script>'
        . '<script src="/views/assets/plugins/pdfjs/build/pdf.worker.js" type="text/javascript"></script>';
?>

<div class="page__bd" style="font-size: 15px;">
    <div class="page__bd">
        <div class="weui-form-preview">
            <div class="weui-form-preview__hd">
                <p style="text-align: left; margin-bottom: 20px;">感谢贵司对"<span class="org"></span>"的信赖。贵我双方已经签定<span id="mall"></span>的<span id="type"></span>合同双方已完成签章, 已到付款环节。</p>
                <div class="weui-form-preview__item">
                    <h2 class="weui-form-preview__label">应付金额</h2>
                    <em class="weui-form-preview__value">¥ <span id="amount"></span></em>
                </div>
                <div class="weui-form-preview__item">
                    <label class="weui-form-preview__label"></label>
                    <em class="weui-form-preview__value"><small>(含税费 ¥ <span id="tax"></span>)</small></em>
                </div>
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
                <div id="leasing_price" style="display: none;">
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
                    <p style="text-align: left; padding: 0 16px;"><small><i class="fa fa-exclamation-triangle" aria-hidden="true"></i> 应缴金额=保证金+数据采集设备押金+首月固定租金与物业管理费(含税)</small></p>
                    <p style="text-align: left; padding: 0 16px 16px;"><small><i class="fa fa-exclamation-triangle" aria-hidden="true"></i> 保证金=3x(最高月固定租金+物业管理费)(含税)</small></p>
                </div>
                <div id="adevent_price" style="display: none;">
                    <div class="weui-form-preview__item">
                        <label class="weui-form-preview__label">租金(含税)</label>
                        <span class="weui-form-preview__value">¥ <span id="adevent_rent"></span></span>
                    </div>
                    <div class="weui-form-preview__item">
                        <label class="weui-form-preview__label">保证金</label>
                        <span class="weui-form-preview__value">¥ <span id="adevent_deposit"></span></span>
                    </div>
                    <p style="text-align: left; padding: 0 16px;"><small><i class="fa fa-exclamation-triangle" aria-hidden="true"></i> 应缴金额=保证金+租金(含税)</small></p>
                    <p style="text-align: left; padding: 0 16px 16px;"><small><i class="fa fa-exclamation-triangle" aria-hidden="true"></i> 保证金=20%租金(含税)</small></p>
                </div>
            </div>
        </div>
        
        <div class="weui-form__control-area">
            <div class="weui-cells__group weui-cells__group_form">
                <div class="weui-cells_radio">
                    <label class="weui-cell weui-cell_active weui-check__label">
                        <h3>支付方式选择</h3>
                    </label>
                    <label id="unionPayLabel" class="weui-cell weui-cell_active weui-check__label" for="unionPay">
                        <div class="weui-cell__bd">
                            <p><img src="/views/assets/base/img/content/banks/unionpay.jpg" style="width: 70px; vertical-align: bottom;"> 网银支付(推荐使用)</p>
                            <small>请指定邮箱接收付款链接和账单</small>
                        </div>
                        <div class="weui-cell__ft" style="border: solid 1px rgba(0,0,0,.3); padding-left: 0;">
                            <input type="radio" name="payment" class="weui-check placeholder" id="unionPay" checked="checked" />
                            <span class="weui-icon-checked"></span>
                        </div>
                    </label>
                    <label class="weui-cell weui-cell_active weui-check__label" for="transfer">
                        <div class="weui-cell__bd">
                            <p>公司转账</p>
                            <small>请务必使用此账号进行转账，且转账金额与订单金额务必保持一致</small>
                        </div>
                        <div class="weui-cell__ft" style="border: solid 1px rgba(0,0,0,.3); padding-left: 0;">
                            <input type="radio" name="payment" class="weui-check placeholder" id="transfer" />
                            <span class="weui-icon-checked"></span>
                        </div>
                    </label>
                    <div id="transferDetail" class="weui-cell__bd" style="padding: 16px 32px; color: #000; display: none;">
                        <div><small>收款人户名: <span class="org"></span></small></div>
                        <div><small>收款人账号: <span id="payeeAccount"></span></small></div>
                        <div><small>开户行名称: <span id="payeeBank"></span></small></div>
                    </div>
                </div>
            </div>
        </div>
        <br>
        <br>
        
        <div class="weui-form-preview">
            <div class="weui-form-preview__ft">
                <a class="weui-form-preview__btn weui-form-preview__btn_default" href="javascript:history.back(-1);">返回</a>
                <a class="weui-form-preview__btn weui-form-preview__btn_primary" id="startPay" style="background: #07c160; color: #fff;">下一步</a>
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

<div class="js_dialog" id="emailDialog" style="display: none;">
    <form id="emailDialogForm">
        <div class="weui-mask"></div>
        <div class="weui-dialog" style="background: #fff;">
            <div class="weui-dialog__hd"><strong class="weui-dialog__title">请填写贵司财务付款人邮箱</strong></div>
            <div class="weui-dialog__bd" style="padding: 0;">
                <div class="weui-cells__group weui-cells__group_form">
                    <div class="weui-cells weui-cells_form">
                        <div class="weui-cell weui-cell_active" style="padding: 16px 0;">
                            <div class="weui-cell__hd" style="padding-right: 0;"><label class="weui-label">Email</label></div>
                            <div class="weui-cell__bd">
                                <input name="unionPayEmail" id="unionPayEmail" type="email" class="weui-input placeholder" required placeholder="如:first.last@company.com" />
                            </div>
                        </div>
                        <div class="errorDiv" id="errorcontainer-unionPayEmail"></div>
                    </div>
                </div>
            </div>
            <div class="weui-dialog__ft">
                <a href="javascript: hideDialog();" class="weui-dialog__btn weui-dialog__btn_default">取消</a>
                <button type="submit" class="weui-dialog__btn weui-dialog__btn_primary" style="color: var(--weui-FG-HALF); font-size: 17px; border: 0 none; background: #fff;">提交</button>
            </div>
        </div>
    </form>
</div>

<br>
<br>
<br>
<?php include ('timeline/step_five.php'); ?>
<?php include ('menu_bottom.php'); ?>
<?php include ('footer.php'); ?>