<?php
    $scripts = $scripts . '<script type="text/javascript" src="/views/assets/base/js/v2/register-admin.js"></script>';
?>

<form id="register_form" style="margin-top: 20px;">
    <div class="page__bd">
        <div class="weui-form__text-area" style="margin-top: 20px;">
            <h2 class="weui-form__title">品牌资料</h2>
        </div>
        <div class="weui-form__control-area">
            <div id="brands" class="weui-cells__group weui-cells__group_form" style="margin-top: 24px;">
                <div class="weui-cells__title">
                    品牌信息
                </div>
                <div class="weui-cells weui-cells_form">
                    <div class="weui-cell weui-cell_active">
                        <div class="weui-cell__hd errorDiv" id="errorcontainer-brand_1"><label class="weui-label">品牌名*</label></div>
                        <div class="weui-cell__bd">
                            <input name="brand_1" id="brand_1" required class="brand weui-input" placeholder="填写品牌名"/>
                        </div>
                    </div>
                    <div class="weui-cell weui-cell_active weui-cell_select weui-cell_select-after">
                        <div class="weui-cell__hd errorDiv" id="errorcontainer-category_1">
                            <label for="category_1" class="weui-label">业态*</label>
                        </div>
                        <div class="weui-cell__bd">
                            <select class="weui-select category" id="category_1" name="category_1" required>
                                <option value="">请选择</option>
                            </select>
                        </div>
                    </div>
                    <div class="weui-cell weui-cell_active weui-cell_select weui-cell_select-after">
                        <div class="weui-cell__hd errorDiv" id="errorcontainer-operation_1">
                            <label for="operation_1" class="weui-label">运营模式*</label>
                        </div>
                        <div class="weui-cell__bd">
                            <select class="weui-select operation" id="operation_1" name="operation_1" required>
                                <option value="">请选择</option>
                                <option value="直营">直营</option>
                                <option value="代理">代理</option>
                                <option value="加盟">加盟</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <br>
        <div class="weui-form__control-area">
            <div class="weui-cells__group weui-cells__group_form">
                <div class="weui-cells__title">联系人信息</div>
                <div class="weui-cells weui-cells_form">
                    <div class="weui-cell weui-cell_active">
                        <div class="weui-cell__hd errorDiv" id="errorcontainer-contact_name_1"><label class="weui-label">姓名*</label></div>
                        <div class="weui-cell__bd">
                            <input name="contact_name_1" id="contact_name_1" required class="weui-input" placeholder="填写姓名"/>
                        </div>
                    </div>
                    <div class="weui-cell weui-cell_active">
                        <div class="weui-cell__hd errorDiv" id="errorcontainer-company_name"><label class="weui-label">公司名*</label></div>
                        <div class="weui-cell__bd">
                            <input name="company_name" id="company_name" required class="weui-input" placeholder="填写公司名"/>
                        </div>
                    </div>
                    <div class="weui-cell weui-cell_active">
                        <div class="weui-cell__hd errorDiv" id="errorcontainer-email"><label class="weui-label">邮箱*</label></div>
                        <div class="weui-cell__bd">
                            <input type="email" name="email" id="email" required class="weui-input" placeholder="填写邮箱"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="weui-btn-area">
        <button type="submit" class="weui-btn weui-btn_primary" id="register">提交信息</button>
    </div>
</form>
<br>
<br>
<br>

<?php include ('menu_bottom.php'); ?>
<?php include ('footer.php'); ?>