<?php
$scripts = $scripts . '<script type="text/javascript" src="/views/assets/base/js/v2/negotiation-admin.js"></script>';
?>

<?php include ('navbar_top.php'); ?>

<div class="weui-toptips bg-success topTips"><i class="fa fa-sad" aria-hidden="true"></i> 抱歉让您失望了！但是希望您能告诉我们，这份报价有哪些地方可以改进呢？您的宝贵意见会帮助我们成长哦！</div>

<div class="weui-article" style="padding: 24px 32px 0;">
    <h1>很遗憾未能与您达成合作···</h1>
</div>

<div class="page__bd">
    <div class="weui-form__control-area">
        <div class="weui-cells__group weui-cells__group_form">
            <div class="weui-cells__title">请告诉我们您期望的合同条件：</div>
            <div class="weui-cells weui-cells_checkbox">
                <label class="weui-cell weui-cell_active weui-check__label" style="display: block;" for="years_flag">
                    <div class="weui-cell__hd" style="display: inline-block;">
                        <input type="checkbox" class="weui-check" name="years_flag" id="years_flag" />
                        <i class="weui-icon-checked"></i>
                    </div>
                    <div class="weui-cell__bd" style="display: inline-block; vertical-align: bottom;">
                        <p>合同年限</p>
                    </div>
                </label>
                <div class="weui-cell__bd" style="padding: 16px 32px; display: none;">
                    <textarea class="weui-textarea" placeholder="请填写您对合同年限的意见" rows="1" id="years_reason"></textarea>
                    <div class="weui-textarea-counter"><span>0</span>/50</div>
                </div>
                <input type="hidden" id="years_result">
                <label class="weui-cell weui-cell_active weui-check__label" style="display: block;" for="free_flag">
                    <div class="weui-cell__hd" style="display: inline-block;">
                        <input type="checkbox" name="free_flag" class="weui-check" id="free_flag"/>
                        <i class="weui-icon-checked"></i>
                    </div>
                    <div class="weui-cell__bd" style="display: inline-block; vertical-align: bottom;">
                        <p>装修免租期</p>
                    </div>
                </label>
                <div class="weui-cell__bd" style="padding: 16px 32px; display: none;">
                    <textarea class="weui-textarea" placeholder="请填写您对装修免租期的意见" rows="1" id="free_reason"></textarea>
                    <div class="weui-textarea-counter"><span>0</span>/50</div>
                </div>
                <input type="hidden" id="free_result">
                <label class="weui-cell weui-cell_active weui-check__label" style="display: block;" for="rent_flag">
                    <div class="weui-cell__hd" style="display: inline-block;">
                        <input type="checkbox" name="rent_flag" class="weui-check" id="rent_flag"/>
                        <i class="weui-icon-checked"></i>
                    </div>
                    <div class="weui-cell__bd" style="display: inline-block; vertical-align: bottom;">
                        <p>租金</p>
                    </div>
                </label>
                <div class="weui-cell__bd" style="padding: 16px 32px; display: none;">
                    <textarea class="weui-textarea" placeholder="请填写您对租金的意见" rows="1" id="rent_reason"></textarea>
                    <div class="weui-textarea-counter"><span>0</span>/50</div>
                </div>
                <input type="hidden" id="rent_result">
                <label class="weui-cell weui-cell_active weui-check__label" style="display: block;" for="deduct_flag">
                    <div class="weui-cell__hd" style="display: inline-block;">
                        <input type="checkbox" class="weui-check" name="deduct_flag" id="deduct_flag" />
                        <i class="weui-icon-checked"></i>
                    </div>
                    <div class="weui-cell__bd" style="display: inline-block; vertical-align: bottom;">
                        <p>扣率</p>
                    </div>
                </label>
                <div class="weui-cell__bd" style="padding: 16px 32px; display: none;">
                    <textarea class="weui-textarea" placeholder="请填写您对扣率的意见" rows="1" id="deduct_reason"></textarea>
                    <div class="weui-textarea-counter"><span>0</span>/50</div>
                </div>
                <input type="hidden" id="deduct_result">
            </div>
            <br>
            <div class="weui-cells__title">反馈与说明</div>
            <div class="weui-cells weui-cells_form">
                <div class="weui-cell">
                    <div class="weui-cell__bd">
                        <textarea id="reason" class="weui-textarea" placeholder="请填写您的反馈与说明" rows="3"></textarea>
                        <div class="weui-textarea-counter"><span>0</span>/200</div>
                    </div>
                </div>
            </div>
            <br>
            <div class="weui-form__opr-area">
                <a href="javascript:;" class="weui-btn weui-btn_default" id="submit_negotiation">提交反馈</a>
            </div>
        </div>
    </div>
</div>

<div id="js_toast" style="display: none;">
    <div class="weui-mask_transparent"></div>
    <div class="weui-toast">
        <i class="weui-icon-success-no-circle weui-icon_toast"></i>
        <p class="weui-toast__content">已完成</p>
    </div>
</div>

<?php include ('menu_bottom.php'); ?>
<?php include ('footer.php'); ?>