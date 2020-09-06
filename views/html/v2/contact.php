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
    <div class="weui-cells weui-cells_form">
        <div class="weui-cell weui-cell_active weui-cell_select weui-cell_select-after">
            <div class="weui-cell__hd">
                <label for="" class="weui-label">商业项目</label>
            </div>
            <div class="weui-cell__bd">
                <select class="weui-select" name="select2">
                    <option value="1">上海陆家嘴正大广场</option>
                    <option value="2">洛阳正大广场</option>
                    <option value="3">上海宝山正大乐城</option>
                </select>
            </div>
        </div>
        <div class="weui-cell weui-cell_active weui-cell_select weui-cell_select-after">
            <div class="weui-cell__hd">
                <label for="" class="weui-label">业务选择</label>
            </div>
            <div class="weui-cell__bd">
                <select class="weui-select" name="select2">
                    <option value="1">租赁商铺</option>
                    <option value="2">举办活动</option>
                    <option value="3">广告投放<option>
                </select>
            </div>
        </div>
        <div class="weui-cell">
            <div class="weui-cell__bd">
                <textarea class="weui-textarea" placeholder="请您留言" rows="5" onkeyup="textarea(this);"></textarea>
                <div class="weui-textarea-counter"><span>0</span>/<i>200</i></div>
            </div>
        </div>
    </div>
</div>
<br><br><br><br>

<?php include ('menu_bottom.php'); ?>

<?php include ('footer.php'); ?>