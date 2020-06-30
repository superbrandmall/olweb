<?php
$scripts = $scripts. '<script type="text/javascript" src="/views/assets/base/js/v2/contact-admin.js"></script>';
?>

<?php include ('navbar_top.php'); ?>
<div class="weui-toptips bg-success topTips"><i class="fa fa-smile-o" aria-hidden="true"></i> 我们每个商业项目都有热线电话，您还可以给我们留言哦。</div>

<div class="page-hd">
    <h1 class="page-hd-title">
        联系客服
    </h1>
    <p class="page-hd-desc"></p>
</div>

<div class="page-bd">
    <div class="weui-cells__title">热线电话</div>
    <div class="weui-cells">
        <div class="weui-cell">
            <div class="weui-cell__bd">
                <p>上海陆家嘴正大广场</p>
            </div>
            <div class="weui-cell__ft">(021) 6887-7888*6666</div>
        </div>
        <div class="weui-cell">
            <div class="weui-cell__bd">
                <p>洛阳正大广场</p>
            </div>
            <div class="weui-cell__ft">(0379) 63977777</div>
        </div>
        <div class="weui-cell">
            <div class="weui-cell__bd">
                <p>合肥正大广场</p>
            </div>
            <div class="weui-cell__ft">(0551) 65677982</div>
        </div>
        <div class="weui-cell">
            <div class="weui-cell__bd">
                <p>上海宝山正大乐城</p>
            </div>
            <div class="weui-cell__ft">(021) 3650-0999*8802</div>
        </div>
        <div class="weui-cell">
            <div class="weui-cell__bd">
                <p>上海徐汇正大乐城</p>
            </div>
            <div class="weui-cell__ft">(021) 6195-6888</div>
        </div>
    </div>
</div>

<div class="page-bd">
    <div class="weui-cells__title">您也可以给我们留言，我们会尽快回复。</div>
    <div class="weui-cells weui-cells_form">
        <div class="weui-cell weui-cell_active weui-cell_select weui-cell_select-after">
            <div class="weui-cell__hd">
                <label for="" class="weui-label">商业项目</label>
            </div>
            <div class="weui-cell__bd">
                <select class="weui-select" name="select2">
                    <option value="1">上海陆家嘴正大广场</option>
                    <option value="2">洛阳正大广场</option>
                    <option value="3">合肥正大广场<option>
                    <option value="4">上海宝山正大乐城</option>
                    <option value="5">上海徐汇正大乐城</option>
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