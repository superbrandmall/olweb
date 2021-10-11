<?php
$scripts = $scripts . '<script type="text/javascript" src="/views/assets/base/js/v2/unionpay-admin.js"></script>';
?>

<?php include ('navbar_top.php'); ?>

<h4 class="page-header" style="margin: 16px 16px 8px; font-weight: 500;">对公转账</h4>
<div class="weui-cell">
    <small>请在24小时内通过<b style="font-size: 18px; color: red;">网上银行(网银)</b>或<b style="font-size: 18px; color: red;">银行柜台</b>或<b style="font-size: 18px; color: red;">手机银行</b>向如下专属收款账号进行转账</small>
</div>
<div class="weui-header bg-green" style="height: 55px;"> 
    <div class="weui-header-left" style="font-size: 14px;">待付款金额：¥ <b id="amount" style="font-size: 24px;"></b></div>
</div>
<div class="page__bd">
    <div class="weui-cells" style="margin-top: 0;">
        <div class="weui-cell">
            <div class="weui-cell__bd">
                <small>收款信息：</small>
            </div>
        </div>
        <div class="weui-cell">
            <div style="width: 40%;">
                <p>收款人户名</p>
            </div>
            <div class="weui-cell__ft" id="receiver" style="width: 60%; text-align: left;">上海帝泰发展有限公司</div>
        </div>
        <div class="weui-cell">
            <div style="width: 40%;">
                <p>收款人账号</p>
            </div>
            <div class="weui-cell__ft" id="bank_account" style="width: 60%; text-align: left;">310066030018170043300</div>
        </div>
        <div class="weui-cell">
            <div style="width: 40%;">
                <p>开户行名称</p>
            </div>
            <div class="weui-cell__ft" id="bank_name" style="width: 60%; text-align: left; font-weight: bold;">交通银行上海虹口支行</div>
        </div>
        
        <div class="weui-cell">
            <div class="weui-cell__bd">
                <small><span style="color: red;">特别提醒</span>（转账前必读）</small>
                <ol style="margin: 0 15px; font-size: smaller">
                    <li><span style="color: red;">转账金额与订单金额务必保持一致</span>。不得多转，不得少转，不得分次转账，否则无法完成支付；</li>
                    <li><span style="color: red;">请您务必使用上述提供的账号进行转账</span>，不得向其它任何银行账户转账，否则造成的损失由您自行承担（可能钱货两空），平台不负任何责任；</li>
                    <li>我司收款账户到账后，订单即支持成功；</li>
                </ol>
            </div>
        </div>
        <br>
        <div class="weui-form__opr-area">
            <div class="weui-cells">
                <div class="weui-cell weui-cell_active weui-cell_select weui-cell_select-before">
                    <div class="weui-cell__hd">
                        <select class="weui-select" name="select2" style="width: inherit; padding-right: 50px;">
                            <option value="bank">交通银行</option>
                        </select>
                    </div>
                    <div class="weui-cell__bd">
                        <a href="javascript:;" class="weui-btn weui-btn_primary" id="go_payment">前往支付页面</a>
                    </div>
                </div>
            </div>
            
            
            
        </div>
    </div>  
</div>
<br>
<br>
<br>

<?php include ('menu_bottom.php'); ?>
<?php include ('footer.php'); ?>