<?php
$scripts = $scripts. '<script type="text/javascript" src="/views/assets/base/js/v2/improve-info-admin.js"></script>';
?>

<?php include ('navbar_top.php'); ?>

<div class="weui-toptips bg-success topTips"><i class="fa fa-smile-o" aria-hidden="true"></i> 太好了！人工智能已经开始准备合同了！您还需要再确认一遍以下信息，麻烦您看一下这些信息是否完善了？</div>

<form id="improve_form">
    <div class="weui-form__text-area">
        <h2 class="weui-form__title">签约信息</h2>
    </div>
    <div class="page__bd">
        <div class="weui-form__control-area">
            <div class="weui-cells__group weui-cells__group_form">
                <div class="weui-cells__title">开票信息</div>
                <div class="weui-cells weui-cells_form">
                    <div class="weui-cell weui-cell_active">
                        <div class="weui-cell__hd errorDiv" id="errorcontainer-invoice_company_name"><label class="weui-label">企业名称*</label></div>
                        <div class="weui-cell__bd">
                            <input name="invoice_company_name" id="invoice_company_name" class="weui-input" required placeholder="填写企业名称"/>
                        </div>
                    </div>
                    <div class="weui-cell weui-cell_active">
                        <div class="weui-cell__hd errorDiv" id="errorcontainer-invoice_tax_no"><label class="weui-label">税号*</label></div>
                        <div class="weui-cell__bd">
                            <input name="invoice_tax_no" id="invoice_tax_no" class="weui-input" required placeholder="填写税号"/>
                        </div>
                    </div>
                    <div class="weui-cell weui-cell_active">
                        <div class="weui-cell__hd errorDiv" id="errorcontainer-mailing_address"><label class="weui-label">邮寄地址*</label></div>
                        <div class="weui-cell__bd">
                            <input name="mailing_address" id="mailing_address" class="weui-input" required placeholder="填写邮寄地址"/>
                        </div>
                    </div>
                    <div class="weui-cell weui-cell_active">
                        <div class="weui-cell__hd errorDiv" id="errorcontainer-invoice_address"><label class="weui-label">开票地址*</label></div>
                        <div class="weui-cell__bd">
                            <input name="invoice_address" id="invoice_address" class="weui-input" required placeholder="填写开票地址"/>
                        </div>
                    </div>
                    <div class="weui-cell weui-cell_active">
                        <div class="weui-cell__hd errorDiv" id="errorcontainer-invoice_phone"><label class="weui-label">开票电话*</label></div>
                        <div class="weui-cell__bd">
                            <input name="invoice_phone" id="invoice_phone" class="weui-input" required placeholder="填写开票电话"/>
                        </div>
                    </div>
                    <div class="weui-cell weui-cell_active">
                        <div class="weui-cell__hd errorDiv" id="errorcontainer-street_address"><label class="weui-label">注册地址*</label></div>
                        <div class="weui-cell__bd">
                            <input name="street_address" id="street_address" class="weui-input" required placeholder="填写注册地址"/>
                        </div>
                    </div>
                    <div class="weui-cell weui-cell_active">
                        <div class="weui-cell__hd errorDiv" id="errorcontainer-billing_address"><label class="weui-label">账单地址*</label></div>
                        <div class="weui-cell__bd">
                            <input name="billing_address" id="billing_address" class="weui-input" required placeholder="填写账单地址"/>
                        </div>
                    </div>
                    <div class="weui-cell weui-cell_active">
                        <div class="weui-cell__hd errorDiv" id="errorcontainer-id_card"><label class="weui-label">负责人身份证号码*</label></div>
                        <div class="weui-cell__bd">
                            <input name="id_card" id="id_card" class="weui-input" required placeholder="填写负责人身份证号码"/>
                        </div>
                    </div>
                    <div class="weui-cell weui-cell_active weui-cell_select weui-cell_select-after">
                        <div class="weui-cell__hd errorDiv" id="errorcontainer-tax_payer_type">
                            <label for="tax_payer_type" class="weui-label">纳税人类型*</label>
                        </div>
                        <div class="weui-cell__bd">
                            <select class="weui-select" id="tax_payer_type" name="tax_payer_type" required>
                                <option value="">请选择</option>
                                <option value="一般纳税人">一般纳税人</option>
                                <option value="小规模纳税人">小规模纳税人</option>
                            </select>
                        </div>
                    </div>
                    <div class="weui-cell weui-cell_active weui-cell_select weui-cell_select-after">
                        <div class="weui-cell__hd errorDiv" id="errorcontainer-invoice_type">
                            <label for="invoice_type" class="weui-label">发票类型*</label>
                        </div>
                        <div class="weui-cell__bd">
                            <select class="weui-select" id="invoice_type" name="invoice_type" required>
                                <option value="">请选择</option>
                                <option value="普通发票">普通发票</option>
                                <option value="普通专票">普通专票</option>
                                <option value="电子普票">电子普票</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <br>
        <div class="weui-form__control-area">
            <div class="weui-cells__group weui-cells__group_form">
                <div class="weui-cells__title">银行信息</div>
                <div class="weui-cells weui-cells_form">
                    <div class="weui-cell weui-cell_active">
                        <div class="weui-cell__hd errorDiv" id="errorcontainer-bank_name"><label class="weui-label">开户银行*</label></div>
                        <div class="weui-cell__bd">
                            <input name="bank_name" id="bank_name" class="weui-input" required placeholder="填写开户银行名称"/>
                        </div>
                    </div>
                    <div class="weui-cell weui-cell_active">
                        <div class="weui-cell__hd errorDiv" id="errorcontainer-bank_account"><label class="weui-label">银行账号*</label></div>
                        <div class="weui-cell__bd">
                            <input name="bank_account" id="bank_account" class="weui-input" required placeholder="填写银行账号"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <br>
        <div class="weui-form__control-area">
            <div class="weui-cells__group weui-cells__group_form">
                <div class="weui-cells__title">授权人信息</div>
                <div class="weui-cells__title"><small><i class="fa fa-info-circle"></i> 授权人即贵司授权用印人</small></div>
                <div class="weui-cells weui-cells_form">
                    <div class="weui-cell weui-cell_active">
                        <div class="weui-cell__hd errorDiv" id="errorcontainer-authName"><label class="weui-label">姓名*</label></div>
                        <div class="weui-cell__bd">
                            <input name="authName" id="authName" class="weui-input" required placeholder="填写授权人姓名"/>
                        </div>
                    </div>
                    <div class="weui-cell weui-cell_active">
                        <div class="weui-cell__hd errorDiv" id="errorcontainer-authPhone"><label class="weui-label">手机号*</label></div>
                        <div class="weui-cell__bd">
                            <input class="weui-input" type="number" pattern="[0-9]*" name="authPhone" id="authPhone" required placeholder="填写授权人手机号" value=""/>
                        </div>
                    </div>
                    <div class="weui-cell weui-cell_active">
                        <div class="weui-cell__hd errorDiv" id="errorcontainer-authIdentity"><label class="weui-label">身份证号*</label></div>
                        <div class="weui-cell__bd">
                            <input name="authIdentity" id="authIdentity" class="weui-input" required placeholder="填写授权人身份证号"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <div class="weui-btn-area">
        <button type="submit" class="weui-btn weui-btn_primary" id="improve">提交信息</button>
    </div>
</form>

<div id="js_toast" style="display: none;">
    <div class="weui-mask_transparent"></div>
    <div class="weui-toast">
        <i class="weui-icon-success-no-circle weui-icon_toast"></i>
        <p class="weui-toast__content">保存成功</p>
    </div>
</div>

<br>
<br>
<br>

<?php include ('menu_bottom.php'); ?>
<?php include ('footer.php'); ?>