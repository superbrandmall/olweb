<?php
$scripts = $scripts. '<script type="text/javascript" src="/views/assets/base/js/nikola/bootstrap.bundle.min.js"></script>
            <script type="text/javascript" src="/views/assets/base/js/nikola/blocs.min.js"></script>
            <script type="text/javascript" src="/views/assets/plugins/iscroll-lite.js"></script>
            <script type="text/javascript" src="/views/assets/base/js/v2/bankCardAttribution.js">
            </script><script type="text/javascript" src="/views/assets/base/js/v2/improve-info2-admin.js"></script>';
?>

<link rel="stylesheet" type="text/css" href="/views/assets/base/css/nikola/bootstrap.min.css" />
<link rel="stylesheet" type="text/css" href="/views/assets/base/css/nikola.css" />

<div class="weui-form__text-area" style="margin: 65px 0 20px;">
    <h2 class="weui-form__title">编辑账户</h2>
</div>

<?php include ('timeline/step_three.php'); ?>

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

<?php include ('timeline/step_three.php'); ?>

<?php include ('footer.php'); ?>