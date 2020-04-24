<?php
$scripts = $scripts . '<script type="text/javascript" src="/views/assets/base/js/v2/negotiation-admin.js"></script>';
?>

<?php include ('navbar_top.php'); ?>

<div class="page__bd" style="background-color: #EDEDED;">
    <div class="weui-form">
        <div class="weui-form__text-area">
            <h2 class="weui-form__title">谢绝报价的原因</h2>
        </div>
        <div class="weui-form__control-area">
            <div class="weui-cells__group weui-cells__group_form">
                    <div class="weui-cells__title" style="margin-top: 24px;">请告诉我们您对以下哪些选项有异议</div>
                    <div class="weui-cells weui-cells_checkbox">
                        <label class="weui-cell weui-cell_active weui-check__label" style="display: block;" for="s11">
                            <div class="weui-cell__hd" style="display: inline-block;">
                                <input type="checkbox" class="weui-check" name="checkbox1" id="s11" />
                                <i class="weui-icon-checked"></i>
                            </div>
                            <div class="weui-cell__bd" style="display: inline-block; vertical-align: bottom;">
                                <p>合同年限</p>
                            </div>
                        </label>
                        <label class="weui-cell weui-cell_active weui-check__label" style="display: block;" for="s12">
                            <div class="weui-cell__hd" style="display: inline-block;">
                                <input type="checkbox" name="checkbox1" class="weui-check" id="s12"/>
                                <i class="weui-icon-checked"></i>
                            </div>
                            <div class="weui-cell__bd" style="display: inline-block; vertical-align: bottom;">
                                <p>免租期</p>
                            </div>
                        </label>
                        <label class="weui-cell weui-cell_active weui-check__label" style="display: block;" for="s13">
                            <div class="weui-cell__hd" style="display: inline-block;">
                                <input type="checkbox" name="checkbox1" class="weui-check" id="s13"/>
                                <i class="weui-icon-checked"></i>
                            </div>
                            <div class="weui-cell__bd" style="display: inline-block; vertical-align: bottom;">
                                <p>租金</p>
                            </div>
                        </label>
                        <label class="weui-cell weui-cell_active weui-check__label" style="display: block;" for="s14">
                            <div class="weui-cell__hd" style="display: inline-block;">
                                <input type="checkbox" class="weui-check" name="checkbox1" id="s14" />
                                <i class="weui-icon-checked"></i>
                            </div>
                            <div class="weui-cell__bd" style="display: inline-block; vertical-align: bottom;">
                                <p>扣率</p>
                            </div>
                        </label>
                    </div>
                <br>
                <div class="weui-cells__group weui-cells__group_form">
                    <div class="weui-cells__title">反馈与说明</div>
                    <div class="weui-cells weui-cells_form">
                        <div class="weui-cell ">
                            <div class="weui-cell__bd">
                                <textarea class="weui-textarea" placeholder="请填写您的反馈与说明" rows="3"></textarea>
                                <div class="weui-textarea-counter"><span>0</span>/200</div>
                            </div>
                        </div>
                    </div>
                </div>
                <br>
                <div class="weui-form__opr-area">
                    <a class="weui-btn weui-btn_primary" href="javascript:" id="showTooltips">提交反馈</a>
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