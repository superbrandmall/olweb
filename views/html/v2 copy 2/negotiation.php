<?php
$scripts = $scripts . '<script type="text/javascript" src="/views/assets/base/js/v2/negotiation-admin.js"></script>';
?>

<?php include ('navbar_top.php'); ?>

<div class="weui-toptips bg-success topTips"><i class="fa fa-sad" aria-hidden="true"></i> 抱歉让您失望了！但是希望您能告诉我们，这份报价有哪些地方可以改进呢？您的宝贵意见会帮助我们成长哦！</div>

<div class="weui-panel weui-panel_access" style="background-color: #c9b18d; margin-top: -7px;">
    <div class="weui-panel__hd" style="font-weight: 500; font-size: 18px; color: #514026; padding: 10px;"><i class="fa fa-chevron-circle-right" aria-hidden="true"></i> 谢绝报价的原因</div>
    <div class="weui-panel__bd"></div>
</div>

<div class="page__bd">
    <div class="weui-form" style="background-color: #292929;">
        <div class="weui-form__control-area">
            <div class="weui-cells__group weui-cells__group_form">
                <div class="weui-cells__title" style="color: #bba585;">请告诉我们您对以下哪些选项有异议</div>
                <div class="weui-cells weui-cells_checkbox" style="background-color: #3f3f3f;">
                    <label class="weui-cell weui-cell_active weui-check__label" style="display: block; color: #bba585;" for="years_flag">
                        <div class="weui-cell__hd" style="display: inline-block;">
                            <input type="checkbox" class="weui-check" name="years_flag" id="years_flag" />
                            <i class="weui-icon-checked" style="color: #bba585;"></i>
                        </div>
                        <div class="weui-cell__bd" style="display: inline-block; vertical-align: bottom;">
                            <p>合同年限</p>
                        </div>
                    </label>
                    <div class="weui-cell__bd" style="padding: 16px 32px; color: #bba585; display: none;">
                        <textarea class="weui-textarea" placeholder="请填写您对合同年限的意见" rows="1" id="years_reason"></textarea>
                        <div class="weui-textarea-counter"><span>0</span>/50</div>
                    </div>
                    <input type="hidden" id="years_result">
                    <label class="weui-cell weui-cell_active weui-check__label" style="display: block; color: #bba585;" for="free_flag">
                        <div class="weui-cell__hd" style="display: inline-block;">
                            <input type="checkbox" name="free_flag" class="weui-check" id="free_flag"/>
                            <i class="weui-icon-checked" style="color: #bba585;"></i>
                        </div>
                        <div class="weui-cell__bd" style="display: inline-block; vertical-align: bottom;">
                            <p>装修免租期</p>
                        </div>
                    </label>
                    <div class="weui-cell__bd" style="padding: 16px 32px; color: #bba585; display: none;">
                        <textarea class="weui-textarea" placeholder="请填写您对装修免租期的意见" rows="1" id="free_reason"></textarea>
                        <div class="weui-textarea-counter"><span>0</span>/50</div>
                    </div>
                    <input type="hidden" id="free_result">
                    <label class="weui-cell weui-cell_active weui-check__label" style="display: block; color: #bba585;" for="rent_flag">
                        <div class="weui-cell__hd" style="display: inline-block;">
                            <input type="checkbox" name="rent_flag" class="weui-check" id="rent_flag"/>
                            <i class="weui-icon-checked" style="color: #bba585;"></i>
                        </div>
                        <div class="weui-cell__bd" style="display: inline-block; vertical-align: bottom;">
                            <p>租金</p>
                        </div>
                    </label>
                    <div class="weui-cell__bd" style="padding: 16px 32px; color: #bba585; display: none;">
                        <textarea class="weui-textarea" placeholder="请填写您对租金的意见" rows="1" id="rent_reason"></textarea>
                        <div class="weui-textarea-counter"><span>0</span>/50</div>
                    </div>
                    <input type="hidden" id="rent_result">
                    <label class="weui-cell weui-cell_active weui-check__label" style="display: block; color: #bba585;" for="deduct_flag">
                        <div class="weui-cell__hd" style="display: inline-block;">
                            <input type="checkbox" class="weui-check" name="deduct_flag" id="deduct_flag" />
                            <i class="weui-icon-checked" style="color: #bba585;"></i>
                        </div>
                        <div class="weui-cell__bd" style="display: inline-block; vertical-align: bottom;">
                            <p>扣率</p>
                        </div>
                    </label>
                    <div class="weui-cell__bd" style="padding: 16px 32px; color: #bba585; display: none;">
                        <textarea class="weui-textarea" placeholder="请填写您对扣率的意见" rows="1" id="deduct_reason"></textarea>
                        <div class="weui-textarea-counter"><span>0</span>/50</div>
                    </div>
                    <input type="hidden" id="deduct_result">
                </div>
                <br>
                <div class="weui-cells__group weui-cells__group_form">
                    <div class="weui-cells__title" style="color: #bba585;">反馈与说明</div>
                    <div class="weui-cells weui-cells_form" style="background-color: #3f3f3f;">
                        <div class="weui-cell" style="color: #bba585;">
                            <div class="weui-cell__bd">
                                <textarea id="reason" class="weui-textarea" placeholder="请填写您的反馈与说明" rows="3"></textarea>
                                <div class="weui-textarea-counter"><span>0</span>/200</div>
                            </div>
                        </div>
                    </div>
                </div>
                <br>
                <div class="weui-form__opr-area">
                    <button type="button" class="weui-btn" id="submit_negotiation" style="background-color: #c9b18d; color: #514026; border-radius: 15px; font-weight: 500; width: initial;">提交反馈</button>
                </div>
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

<br>
<br>

<?php include ('menu_bottom.php'); ?>
<?php include ('footer.php'); ?>