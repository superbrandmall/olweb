<?php
$scripts = $scripts. '<script type="text/javascript" src="/views/assets/base/js/v2/improve-info-admin.js"></script>';
?>

<?php include ('navbar_top.php'); ?>

<div class="weui-toptips bg-success topTips"><i class="fa fa-smile-o" aria-hidden="true"></i> 太好了！人工智能已经开始准备合同了！您还需要再确认一遍以下信息，麻烦您看一下这些信息是否完善了？</div>

<div class="weui-panel weui-panel_access" style="background-color: #c9b18d; margin-top: -7px;">
    <div class="weui-panel__hd" style="font-weight: 500; font-size: 18px; color: #514026; padding: 10px;"><i class="fa fa-chevron-circle-right" aria-hidden="true"></i> 签约信息</div>
    <div class="weui-panel__bd"></div>
</div>

<form id="improve_form">
    <div class="page__bd">
        <div class="weui-form" style="background-color: #292929;">
            <div class="weui-form__control-area">
                <div class="weui-cells__group weui-cells__group_form">
                    <div class="weui-cells__title" style="color: #bba585;">开票信息</div>
                    <div class="weui-cells weui-cells_form" style="background-color: #3f3f3f;">
                        <div class="weui-cell weui-cell_active" style="color: #bba585;">
                            <div class="weui-cell__hd errorDiv" id="errorcontainer-invoice_company_name"><label class="weui-label">企业名称<span style="color: #fff">*</span></label></div>
                            <div class="weui-cell__bd">
                                <input name="invoice_company_name" id="invoice_company_name" class="weui-input" required placeholder="填写企业名称"/>
                            </div>
                        </div>
                        <div class="weui-cell weui-cell_active" style="color: #bba585;">
                            <div class="weui-cell__hd errorDiv" id="errorcontainer-invoice_tax_no"><label class="weui-label">税号<span style="color: #fff">*</span></label></div>
                            <div class="weui-cell__bd">
                                <input name="invoice_tax_no" id="invoice_tax_no" class="weui-input" required placeholder="填写税号"/>
                            </div>
                        </div>
                        <div class="weui-cell weui-cell_active" style="color: #bba585;">
                            <div class="weui-cell__hd errorDiv" id="errorcontainer-mailing_address"><label class="weui-label">邮寄地址<span style="color: #fff">*</span></label></div>
                            <div class="weui-cell__bd">
                                <input name="mailing_address" id="mailing_address" class="weui-input" required placeholder="填写邮寄地址"/>
                            </div>
                        </div>
                        <div class="weui-cell weui-cell_active" style="color: #bba585;">
                            <div class="weui-cell__hd errorDiv" id="errorcontainer-invoice_address"><label class="weui-label">开票地址<span style="color: #fff">*</span></label></div>
                            <div class="weui-cell__bd">
                                <input name="invoice_address" id="invoice_address" class="weui-input" required placeholder="填写开票地址"/>
                            </div>
                        </div>
                        <div class="weui-cell weui-cell_active" style="color: #bba585;">
                            <div class="weui-cell__hd errorDiv" id="errorcontainer-invoice_phone"><label class="weui-label">开票电话<span style="color: #fff">*</span></label></div>
                            <div class="weui-cell__bd">
                                <input name="invoice_phone" id="invoice_phone" class="weui-input" required placeholder="填写开票电话"/>
                            </div>
                        </div>
                        <div class="weui-cell weui-cell_active" style="color: #bba585;">
                            <div class="weui-cell__hd errorDiv" id="errorcontainer-street_address"><label class="weui-label">注册地址<span style="color: #fff">*</span></label></div>
                            <div class="weui-cell__bd">
                                <input name="street_address" id="street_address" class="weui-input" required placeholder="填写注册地址"/>
                            </div>
                        </div>
                        <div class="weui-cell weui-cell_active" style="color: #bba585;">
                            <div class="weui-cell__hd errorDiv" id="errorcontainer-billing_address"><label class="weui-label">账单地址<span style="color: #fff">*</span></label></div>
                            <div class="weui-cell__bd">
                                <input name="billing_address" id="billing_address" class="weui-input" required placeholder="填写账单地址"/>
                            </div>
                        </div>
                        <div class="weui-cell weui-cell_active" style="color: #bba585;">
                            <div class="weui-cell__hd errorDiv" id="errorcontainer-id_card"><label class="weui-label">负责人身份证号码<span style="color: #fff">*</span></label></div>
                            <div class="weui-cell__bd">
                                <input name="id_card" id="id_card" class="weui-input" required placeholder="填写负责人身份证号码"/>
                            </div>
                        </div>
                        <div class="weui-cell weui-cell_active weui-cell_select weui-cell_select-after" style="color: #bba585;">
                            <div class="weui-cell__hd errorDiv" id="errorcontainer-tax_payer_type">
                                <label for="tax_payer_type" class="weui-label">纳税人类型<span style="color: #fff">*</span></label>
                            </div>
                            <div class="weui-cell__bd">
                                <select class="weui-select" id="tax_payer_type" name="tax_payer_type" style="color: #bba585;" required>
                                    <option value="">请选择</option>
                                    <option value="一般纳税人">一般纳税人</option>
                                    <option value="小规模纳税人">小规模纳税人</option>
                                </select>
                            </div>
                        </div>
                        <div class="weui-cell weui-cell_active weui-cell_select weui-cell_select-after" style="color: #bba585;">
                            <div class="weui-cell__hd errorDiv" id="errorcontainer-invoice_type">
                                <label for="invoice_type" class="weui-label">发票类型<span style="color: #fff">*</span></label>
                            </div>
                            <div class="weui-cell__bd">
                                <select class="weui-select" id="invoice_type" name="invoice_type" style="color: #bba585;" required>
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
        </div>
        
        <div class="weui-form" style="background-color: #292929;">
            <div class="weui-form__control-area">
                <div class="weui-cells__group weui-cells__group_form">
                    <div class="weui-cells__title" style="color: #bba585;">银行资料</div>
                    <div class="weui-cells weui-cells_form" style="background-color: #3f3f3f;">
                        <div class="weui-cell weui-cell_active" style="color: #bba585;">
                            <div class="weui-cell__hd errorDiv" id="errorcontainer-bank_name"><label class="weui-label">开户银行<span style="color: #fff">*</span></label></div>
                            <div class="weui-cell__bd">
                                <input name="bank_name" id="bank_name" class="weui-input" required placeholder="填写开户银行名称"/>
                            </div>
                        </div>
                        <div class="weui-cell weui-cell_active" style="color: #bba585;">
                            <div class="weui-cell__hd errorDiv" id="errorcontainer-bank_account"><label class="weui-label">银行账号<span style="color: #fff">*</span></label></div>
                            <div class="weui-cell__bd">
                                <input name="bank_account" id="bank_account" class="weui-input" required placeholder="填写银行账号"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <div class="weui-btn-area">
        <button type="submit" class="weui-btn" id="improve" style="background-color: #c9b18d; color: #514026; border-radius: 15px; font-weight: 500; width: initial;">提交信息</button>
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
<br>

<?php include ('menu_bottom.php'); ?>
<?php include ('footer.php'); ?>