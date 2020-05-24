<?php
$scripts = $scripts. '<script type="text/javascript" src="/views/assets/base/js/v2/improve-info-admin.js"></script>';
?>

<?php include ('navbar_top.php'); ?>

<div class="weui-toptips bg-success topTips"><i class="fa fa-smile-o" aria-hidden="true"></i> 太好了！人工智能已经开始准备合同了！您还需要再确认一遍以下信息，麻烦您看一下这些信息是否完善了？</div>

<form id="improve_form">
    <div class="page__bd" style="background-color: #EDEDED;">
        <div class="weui-form">
            <div class="weui-form__text-area">
                <h2 class="weui-form__title">完善信息</h2>
            </div>
            <div class="weui-form__control-area">
                <div class="weui-cells__group weui-cells__group_form">
                    <div class="weui-cells__title">开票信息</div>
                    <div class="weui-cells weui-cells_form">
                        <div class="weui-cell weui-cell_active">
                            <div class="weui-cell__hd errorDiv" id="errorcontainer-fapiao_company_name"><label class="weui-label">企业名称*</label></div>
                            <div class="weui-cell__bd">
                                <input name="fapiao_company_name" id="fapiao_company_name" class="weui-input" required placeholder="填写企业名称"/>
                            </div>
                        </div>
                        <div class="weui-cell weui-cell_active">
                            <div class="weui-cell__hd errorDiv" id="errorcontainer-tax_no"><label class="weui-label">税号*</label></div>
                            <div class="weui-cell__bd">
                                <input name="tax_no" id="tax_no" class="weui-input" required placeholder="填写税号"/>
                            </div>
                        </div>
                        <div class="weui-cell weui-cell_active">
                            <div class="weui-cell__hd errorDiv" id="errorcontainer-contact_address"><label class="weui-label">邮寄地址*</label></div>
                            <div class="weui-cell__bd">
                                <input name="contact_address" id="contact_address" class="weui-input" required placeholder="填写邮寄地址"/>
                            </div>
                        </div>
                        <div class="weui-cell weui-cell_active">
                            <div class="weui-cell__hd errorDiv" id="errorcontainer-fapiao_address"><label class="weui-label">开票地址*</label></div>
                            <div class="weui-cell__bd">
                                <input name="fapiao_address" id="fapiao_address" class="weui-input" required placeholder="填写开票地址"/>
                            </div>
                        </div>
                        <div class="weui-cell weui-cell_active">
                            <div class="weui-cell__hd errorDiv" id="errorcontainer-fapiao_phone"><label class="weui-label">开票电话*</label></div>
                            <div class="weui-cell__bd">
                                <input name="fapiao_phone" id="fapiao_phone" class="weui-input" required placeholder="填写开票电话"/>
                            </div>
                        </div>
                        <div class="weui-cell weui-cell_active">
                            <div class="weui-cell__hd errorDiv" id="errorcontainer-register_address"><label class="weui-label">注册地址*</label></div>
                            <div class="weui-cell__bd">
                                <input name="register_address" id="register_address" class="weui-input" required placeholder="填写注册地址"/>
                            </div>
                        </div>
                        <div class="weui-cell weui-cell_active">
                            <div class="weui-cell__hd errorDiv" id="errorcontainer-invoice_address"><label class="weui-label">账单地址*</label></div>
                            <div class="weui-cell__bd">
                                <input name="invoice_address" id="invoice_address" class="weui-input" required placeholder="填写账单地址"/>
                            </div>
                        </div>
                        <div class="weui-cell weui-cell_active">
                            <div class="weui-cell__hd errorDiv" id="errorcontainer-identity_card_no"><label class="weui-label">负责人身份证号码*</label></div>
                            <div class="weui-cell__bd">
                                <input name="identity_card_no" id="identity_card_no" class="weui-input" required placeholder="填写负责人身份证号码"/>
                            </div>
                        </div>
                        <div class="weui-cell weui-cell_active weui-cell_select weui-cell_select-after">
                            <div class="weui-cell__hd errorDiv" id="errorcontainer-taxpayer_type">
                                <label for="taxpayer_type" class="weui-label">纳税人类型*</label>
                            </div>
                            <div class="weui-cell__bd">
                                <select class="weui-select operation" id="taxpayer_type" name="taxpayer_type" required>
                                    <option value="">请选择</option>
                                    <option value="一般纳税人">一般纳税人</option>
                                    <option value="小规模纳税人">小规模纳税人</option>
                                </select>
                            </div>
                        </div>
                        <div class="weui-cell weui-cell_active weui-cell_select weui-cell_select-after">
                            <div class="weui-cell__hd errorDiv" id="errorcontainer-fapiao_type">
                                <label for="fapiao_type" class="weui-label">发票类型*</label>
                            </div>
                            <div class="weui-cell__bd">
                                <select class="weui-select operation" id="fapiao_type" name="fapiao_type" required>
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
        <br>
        <div class="weui-form">
            <div class="weui-form__control-area">
                <div class="weui-cells__group weui-cells__group_form">
                    <div class="weui-cells__title">银行资料</div>
                    <div class="weui-cells weui-cells_form">
                        <div class="weui-cell weui-cell_active">
                            <div class="weui-cell__hd errorDiv" id="errorcontainer-bank_name"><label class="weui-label">开户银行*</label></div>
                            <div class="weui-cell__bd">
                                <input name="bank_name" id="bank_name" class="weui-input" required placeholder="填写开户银行名称"/>
                            </div>
                        </div>
                        <div class="weui-cell weui-cell_active">
                            <div class="weui-cell__hd errorDiv" id="errorcontainer-bank_card_no"><label class="weui-label">银行账号*</label></div>
                            <div class="weui-cell__bd">
                                <input name="bank_card_no" id="bank_card_no" class="weui-input" required placeholder="填写银行账号"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="weui-btn-area">
        <button type="submit" class="weui-btn weui-btn_primary" id="improve">提交</button>
    </div>
</form>

<br>
<br>
<br>
<br>

<?php include ('menu_bottom.php'); ?>
<?php include ('footer.php'); ?>