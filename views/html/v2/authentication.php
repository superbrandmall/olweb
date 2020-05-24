<?php
$scripts = $scripts. '<script type="text/javascript" src="/views/assets/base/js/v2/authentication-admin.js"></script>';
?>

<?php include ('navbar_top.php'); ?>

<div class="weui-toptips bg-success topTips"><i class="fa fa-gratipay" aria-hidden="true"></i> 谢谢您的青睐！在给您报价前，我们还需要核实一下您公司的信息，所以不好意思还要耽误您一会儿时间。</div>

<form id="authentication_form">
    <div class="page__bd" style="background-color: #EDEDED;">
        <div class="weui-form">
            <div class="weui-form__text-area">
                <h2 class="weui-form__title">授权认证</h2>
            </div>
            <div class="weui-form__control-area">
                <div class="weui-cells__group weui-cells__group_form">
                    <div class="weui-cells__title" style="margin-top: 24px;">公司信息</div>
                    <div class="weui-cells weui-cells_form">
                        <div class="weui-cell weui-cell_active">
                            <div class="weui-cell__hd errorDiv" id="errorcontainer-company_name"><label class="weui-label">公司名*</label></div>
                            <div class="weui-cell__bd">
                                <input name="company_name"  id="company_name" required class="weui-input" placeholder="填写公司名"/>
                            </div>
                        </div>
                        <div class="weui-cell weui-cell_active">
                            <div class="weui-cell__hd errorDiv" id="errorcontainer-uscc"><label class="weui-label">统一社会信用代码*</label></div>
                            <div class="weui-cell__bd">
                                <input name="uscc" id="uscc" required class="weui-input" placeholder="填写统一社会信用代码"/>
                            </div>
                        </div>
                        <div class="weui-cell weui-cell_active">
                            <div class="weui-cell__hd errorDiv" id="errorcontainer-business_scope"><label class="weui-label">经营范围*</label></div>
                            <div class="weui-cell__bd">
                                <input name="business_scope" id="business_scope" required class="weui-input" placeholder="填写经营范围"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="weui-btn-area">
        <button type="submit" class="weui-btn weui-btn_primary" id="to_authenticate">提交认证</button>
    </div>
</form>
<br>
<br>
<br>
<br>

<?php include ('menu_bottom.php'); ?>
<?php include ('footer.php'); ?>