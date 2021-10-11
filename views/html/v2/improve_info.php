<?php
$scripts = $scripts. '<script type="text/javascript" src="/views/assets/base/js/nikola/bootstrap.bundle.min.js"></script>
            <script type="text/javascript" src="/views/assets/base/js/nikola/blocs.min.js"></script>
            <script type="text/javascript" src="/views/assets/plugins/iscroll-lite.js"></script>
            <script type="text/javascript" src="/views/assets/base/js/v2/bankCardAttribution.js">
            </script><script type="text/javascript" src="/views/assets/base/js/v2/improve-info-admin.js"></script>';
?>

<link rel="stylesheet" type="text/css" href="/views/assets/base/css/nikola/bootstrap.min.css" />
<link rel="stylesheet" type="text/css" href="/views/assets/base/css/nikola.css" />

<div class="weui-form__text-area" style="margin: 90px 0 20px;">
    <h2 class="weui-form__title">请填写合同必用的注册资料</h2>
</div>

<div id="tagnav" class="weui-navigator weui-navigator-wrapper">
    <ul class="weui-navigator-list">
        <li><a href="javascript:;" onclick="javascript: showForm('basic');">基本信息</a></li>
        <li><a href="javascript:;" onclick="javascript: showForm('invoice');">开票信息</a></li>
        <li><a href="javascript:;" onclick="javascript: showForm('bank');">银行信息</a></li>
        <li><a href="javascript:;" onclick="javascript: showForm('authorization');">授权人信息</a></li>
    </ul>
</div>
<div class="page__bd">
    <form id="basic" class="weui-form__control-area" style="margin-top: 20px;">
        <div class="weui-cells__group weui-cells__group_form">
            <div class="weui-cells__title"><i class="fa fa-info-circle"></i> 请务必填写营业执照上的企业名称</div>
            <div class="weui-cells weui-cells_form">
                <div class="weui-cell weui-cell_active">
                    <div class="weui-cell__hd errorDiv" id="errorcontainer-company_name"><label class="weui-label">企业名称<br>(公司名)</label></div>
                    <div class="weui-cell__bd">
                        <input name="company_name" id="company_name" class="weui-input placeholder" required placeholder="填写企业名称"/>
                    </div>
                </div>
                <div class="weui-cell weui-cell_active">
                    <div class="weui-cell__hd errorDiv" id="errorcontainer-uscc"><label class="weui-label">税号<br>(统一社会信用代码)</label></div>
                    <div class="weui-cell__bd">
                        <input name="uscc" id="uscc" class="weui-input placeholder" required placeholder="填写税号"/>
                    </div>
                </div>
                <div class="weui-cell weui-cell_active">
                    <div class="weui-cell__hd errorDiv" id="errorcontainer-brand_1"><label class="weui-label">品牌名</label></div>
                    <div class="weui-cell__bd">
                        <input name="brand_1" id="brand_1" required class="brand weui-input placeholder" placeholder="填写品牌名"/>
                    </div>
                </div>
                <div class="weui-cell weui-cell_active">
                    <div class="weui-cell__hd errorDiv" id="errorcontainer-business_scope"><label class="weui-label">经营范围</label></div>
                    <div class="weui-cell__bd">
                        <input name="business_scope" id="business_scope" required class="weui-input placeholder" placeholder="填写经营范围"/>
                    </div>
                </div>
                <div class="weui-cell weui-cell_active">
                    <div class="weui-cell__hd errorDiv" id="errorcontainer-contact_name_1"><label class="weui-label">联系人</label></div>
                    <div class="weui-cell__bd">
                        <input name="contact_name_1" id="contact_name_1" required class="weui-input placeholder" placeholder="填写联系人姓名"/>
                    </div>
                </div>
                <div class="weui-cell weui-cell_active">
                    <div class="weui-cell__hd errorDiv" id="errorcontainer-id_card"><label class="weui-label">联系人身份证号码</label></div>
                    <div class="weui-cell__bd">
                        <input name="id_card" id="id_card" class="weui-input placeholder" required placeholder="填写联系人身份证号码"/>
                    </div>
                </div>
                <div class="weui-cell weui-cell_active">
                    <div class="weui-cell__hd errorDiv" id="errorcontainer-contact_phone_1"><label class="weui-label">联系电话</label></div>
                    <div class="weui-cell__bd">
                        <input name="contact_phone_1" id="contact_phone_1" class="weui-input placeholder" required placeholder="填写联系电话"/>
                    </div>
                </div>
                <div class="weui-cell weui-cell_active">
                    <div class="weui-cell__hd errorDiv" id="errorcontainer-contact_email"><label class="weui-label">联系邮箱</label></div>
                    <div class="weui-cell__bd">
                        <input type="email" name="contact_email" id="contact_email" required class="weui-input placeholder" placeholder="填写电子邮箱"/>
                    </div>
                </div>
                <div class="weui-cell weui-cell_active weui-cell_select weui-cell_select-after">
                    <div class="weui-cell__hd errorDiv" id="errorcontainer-job_title">
                        <label for="job_title" class="weui-label">工作职位</label>
                    </div>
                    <div class="weui-cell__bd">
                        <select class="weui-select" id="job_title" name="job_title" required>
                            <option value="">请选择</option>
                            <option value="业务拓展负责人" selected="selected">业务拓展负责人</option>
                            <option value="公司负责人/总经理">公司负责人/总经理</option>
                            <option value="中介">中介</option>
                            <option value="others">其他</option>
                        </select>
                    </div>
                </div>
                <div id="other_jobs" class="weui-cell weui-cell_active" style="display: none;">
                    <div class="weui-cell__hd"><label class="weui-label"></label></div>
                    <div class="weui-cell__bd">
                        <input name="other_job" id="other_job" class="weui-input placeholder" placeholder="填写其他工作职位"/>
                    </div>
                </div>
            </div>
        </div>
        <div class="weui-btn-area">
            <button type="submit" class="weui-btn btn-primary" id="improve_basic" style="border-radius: 20px;">提交基本信息</button>
        </div>
    </form>
        
    <form id="invoice" class="weui-form__control-area" style="display: none;">
        <div class="weui-cells__title"><i class="fa fa-info-circle"></i> 该信息将用于系统自动生成合同，请准确填写</div>
        <div class="weui-cells__group weui-cells__group_form">
            <div class="weui-cells weui-cells_form">
                <div class="weui-cell weui-cell_active">
                    <div class="weui-cell__hd errorDiv" id="errorcontainer-mailing_address"><label class="weui-label">邮寄地址</label></div>
                    <div class="weui-cell__bd">
                        <input name="mailing_address" id="mailing_address" class="weui-input placeholder" required placeholder="填写邮寄地址"/>
                    </div>
                </div>
                <div class="weui-cell weui-cell_active">
                    <div class="weui-cell__hd errorDiv" id="errorcontainer-invoice_address"><label class="weui-label">开票地址</label></div>
                    <div class="weui-cell__bd">
                        <input name="invoice_address" id="invoice_address" class="weui-input placeholder" required placeholder="填写开票地址"/>
                    </div>
                </div>
                <div class="weui-cell weui-cell_active">
                    <div class="weui-cell__hd errorDiv" id="errorcontainer-invoice_phone"><label class="weui-label">开票电话</label></div>
                    <div class="weui-cell__bd">
                        <input name="invoice_phone" id="invoice_phone" class="weui-input placeholder" required placeholder="填写开票电话"/>
                    </div>
                </div>
                <div class="weui-cell weui-cell_active">
                    <div class="weui-cell__hd errorDiv" id="errorcontainer-street_address"><label class="weui-label">注册地址</label></div>
                    <div class="weui-cell__bd">
                        <input name="street_address" id="street_address" class="weui-input placeholder" required placeholder="填写注册地址"/>
                    </div>
                </div>
                <div class="weui-cell weui-cell_active">
                    <div class="weui-cell__hd errorDiv" id="errorcontainer-billing_address"><label class="weui-label">账单地址</label></div>
                    <div class="weui-cell__bd">
                        <input name="billing_address" id="billing_address" class="weui-input placeholder" required placeholder="填写账单地址"/>
                    </div>
                </div>
                <div class="weui-cell weui-cell_active weui-cell_select weui-cell_select-after">
                    <div class="weui-cell__hd errorDiv" id="errorcontainer-tax_payer_type">
                        <label for="tax_payer_type" class="weui-label">纳税人类型</label>
                    </div>
                    <div class="weui-cell__bd">
                        <select class="weui-select" id="tax_payer_type" name="tax_payer_type" required>
                            <option value="">请选择</option>
                            <option value="一般纳税人" selected="selected">一般纳税人</option>
                            <option value="小规模纳税人">小规模纳税人</option>
                        </select>
                    </div>
                </div>
                <div class="weui-cell weui-cell_active weui-cell_select weui-cell_select-after">
                    <div class="weui-cell__hd errorDiv" id="errorcontainer-invoice_type">
                        <label for="invoice_type" class="weui-label">发票类型</label>
                    </div>
                    <div class="weui-cell__bd">
                        <select class="weui-select" id="invoice_type" name="invoice_type" required>
                            <option value="">请选择</option>
                            <option value="普通发票" selected="selected">普通发票</option>
                            <option value="普通专票">普通专票</option>
                            <option value="电子普票">电子普票</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
        <div class="weui-btn-area">
            <button type="submit" class="weui-btn btn-primary" id="improve_invoice" style="border-radius: 20px;">提交开票信息</button>
        </div>
    </form>
        
    <form id="bank" class="weui-form__control-area" style="display: none;">
        <div class="weui-cells__title"><i class="fa fa-info-circle"></i> 此银行信息用于返款使用</div>
        <div class="weui-cells__group weui-cells__group_form">
            <div class="weui-cells weui-cells_form">
                <div class="weui-cell weui-cell_active">
                    <div class="weui-cell__hd errorDiv" id="errorcontainer-bank_account"><label class="weui-label">公司银行卡</label></div>
                    <div class="weui-cell__bd">
                        <input name="bank_account" id="bank_account" class="weui-input placeholder" required placeholder="填写公司银行卡号" />
                    </div>
                </div>
                <div class="weui-cell weui-cell_active">
                    <div class="weui-cell__hd errorDiv" id="errorcontainer-bank_name"><label class="weui-label">公司开户行</label></div>
                    <div class="weui-cell__bd">
                        <input name="bank_name" id="bank_name" class="weui-input placeholder" required placeholder="填写公司开户银行" />
                    </div>
                </div>
            </div>
        </div>
        <div class="weui-btn-area">
            <button type="submit" class="weui-btn btn-primary" id="improve_bank" style="border-radius: 20px;">提交银行信息</button>
        </div>
    </form>
        
    <form id="authorization" class="weui-form__control-area" style="display: none; margin-top: 20px;">
        <div class="weui-cells__group weui-cells__group_form">
            <div class="weui-cells__title"><i class="fa fa-info-circle"></i> 授权人即贵司法务签章授权人,请务必使用真实信息以通过审核</div>
            <div class="weui-cells weui-cells_form">
                <div class="weui-cell weui-cell_active">
                    <div class="weui-cell__hd errorDiv" id="errorcontainer-authName"><label class="weui-label">姓名</label></div>
                    <div class="weui-cell__bd">
                        <input name="authName" id="authName" class="weui-input placeholder" required placeholder="填写授权人姓名"/>
                    </div>
                </div>
                <div class="weui-cell weui-cell_active">
                    <div class="weui-cell__hd errorDiv" id="errorcontainer-authPhone"><label class="weui-label">手机号</label></div>
                    <div class="weui-cell__bd">
                        <input class="weui-input placeholder" type="number" pattern="[0-9]*" name="authPhone" id="authPhone" required placeholder="填写授权人手机号" value=""/>
                    </div>
                </div>
                <div class="weui-cell weui-cell_active">
                    <div class="weui-cell__hd errorDiv" id="errorcontainer-authIdentity"><label class="weui-label">身份证号</label></div>
                    <div class="weui-cell__bd">
                        <input name="authIdentity" id="authIdentity" class="weui-input placeholder" required placeholder="填写授权人身份证号"/>
                    </div>
                </div>
                <div class="weui-cell weui-cell_active">
                    <div class="weui-cell__hd errorDiv" id="errorcontainer-authEmail"><label class="weui-label">邮箱</label></div>
                    <div class="weui-cell__bd">
                        <input type="email" name="authEmail" id="authEmail" class="weui-input placeholder" required placeholder="填写授权人邮箱"/>
                    </div>
                </div>
            </div>
        </div>
        <div class="weui-btn-area">
            <button type="submit" class="weui-btn btn-primary" id="improve_authorization" style="border-radius: 20px;">提交授权人信息</button>
        </div>
    </form>
</div>

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

<?php include ('footer.php'); ?>