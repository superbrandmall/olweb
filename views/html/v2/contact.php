<?php
$scripts = $scripts. '<script type="text/javascript" src="/views/assets/base/js/v2/contact-admin.js"></script>';
?>

<div class="page-hd" style="margin-top: 20px;">
    <h1 class="page-hd-title">
        联系客服
    </h1>
    <p class="page-hd-desc"></p>
</div>

<div class="page-bd">
    <div class="weui-cells__title">我们会尽快回复您的留言</div>
    <div id="contact" class="weui-cells weui-cells_form">
        <form>
            <div class="weui-cell weui-cell_active weui-cell_select weui-cell_select-after">
                <div class="weui-cell__hd">
                    <label for="" class="weui-label">商业项目</label>
                </div>
                <div class="weui-cell__bd">
                    <select class="weui-select" name="target_mall" id="target_mall">
                        <option value="OLMALL180917000003">上海陆家嘴正大广场</option>
                        <option value="OLMALL190117000001">河南洛阳正大广场</option>
                        <option value="OLMALL180917000002">上海宝山正大乐城</option>
                        <option value="OLMALL180917000001">上海徐汇正大乐城</option>
                    </select>
                    <div id="errorcontainer-target_mall" class="errorDiv"></div>
                </div>
            </div>
            <div class="weui-cell weui-cell_active weui-cell_select weui-cell_select-after">
                <div class="weui-cell__hd">
                    <label for="" class="weui-label">业务选择</label>
                </div>
                <div class="weui-cell__bd">
                    <select class="weui-select" name="bu" id="bu">
                        <option value="leasing">租赁商铺</option>
                        <option value="events">举办活动</option>
                        <option value="advertising">广告投放<option>
                    </select>
                    <div id="errorcontainer-bu" class="errorDiv"></div>
                </div>
                <div id="errorcontainer-bu" class="errorDiv"></div>
            </div>
            <div class="weui-cell">
                <div class="weui-cell__bd">
                    <textarea id="contact_msg" name="contact_msg" class="weui-textarea" placeholder="请您留言" name="contact_msg" rows="5" onkeyup="textarea(this);"></textarea>
                    <div class="weui-textarea-counter"><span>0</span>/<i>200</i></div>
                    <div id="errorcontainer-contact_msg" class="errorDiv"></div>
                </div>
            </div>
            <div class="weui-btn-area">
                <button type="submit" class="weui-btn weui-btn_primary">提交信息</button>
            </div>
        </form>
    </div>
</div>

<div id="js_toast" style="display: none;">
    <div class="weui-mask_transparent"></div>
    <div class="weui-toast">
        <i class="weui-icon-success-no-circle weui-icon_toast"></i>
        <p class="weui-toast__content">已完成</p>
    </div>
</div>

<br><br><br><br>

<?php include ('menu_bottom.php'); ?>

<?php include ('footer.php'); ?>