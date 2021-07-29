<?php
$scripts = $scripts . '<script type="text/javascript" src="/views/assets/base/js/nikola/bootstrap.bundle.min.js"></script>
                    <script type="text/javascript" src="/views/assets/base/js/nikola/blocs.min.js"></script>
                    <script type="text/javascript" src="/views/assets/base/js/v2/negotiation-admin.js"></script>';
?>

<link rel="stylesheet" type="text/css" href="/views/assets/base/css/nikola/bootstrap.min.css" />
<link rel="stylesheet" type="text/css" href="/views/assets/base/css/nikola.css" />

<div class="weui-article" style="padding: 24px 32px 0;">
    <h1>很遗憾未能与您达成合作···</h1>
</div>

<div class="page__bd">
    <div class="weui-form__control-area">
        <div id="negotiation" class="weui-cells__group weui-cells__group_form">
            <form>
                <div class="weui-cells__title">请告诉我们您的期望：</div>
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
                        <textarea class="weui-textarea" placeholder="请填写您对合同年限的意见" rows="1" id="years_reason" name="years_reason"></textarea>
                        <div class="weui-textarea-counter"><span>0</span>/50</div>
                        <div id="errorcontainer-years_reason" class="errorDiv"></div>
                    </div>
                    <input type="hidden" id="years_result">
                    <label class="weui-cell weui-cell_active weui-check__label" style="display: block;" for="term_flag">
                        <div class="weui-cell__hd" style="display: inline-block;">
                            <input type="checkbox" class="weui-check" name="term_flag" id="term_flag" />
                            <i class="weui-icon-checked"></i>
                        </div>
                        <div class="weui-cell__bd" style="display: inline-block; vertical-align: bottom;">
                            <p>合同条款</p>
                        </div>
                    </label>
                    <div class="weui-cell__bd" style="padding: 16px 32px; display: none;">
                        <textarea class="weui-textarea" placeholder="请填写您对合同条款的意见" rows="1" id="term_reason" name="term_reason"></textarea>
                        <div class="weui-textarea-counter"><span>0</span>/50</div>
                        <div id="errorcontainer-term_reason" class="errorDiv"></div>
                    </div>
                    <input type="hidden" id="term_result">
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
                        <textarea class="weui-textarea" placeholder="请填写您对装修免租期的意见" rows="1" id="free_reason" name="free_reason"></textarea>
                        <div class="weui-textarea-counter"><span>0</span>/50</div>
                        <div id="errorcontainer-free_reason" class="errorDiv"></div>
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
                        <textarea class="weui-textarea" placeholder="请填写您对租金的意见" rows="1" id="rent_reason" name="rent_reason"></textarea>
                        <div class="weui-textarea-counter"><span>0</span>/50</div>
                        <div id="errorcontainer-rent_reason" class="errorDiv"></div>
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
                        <textarea class="weui-textarea" placeholder="请填写您对扣率的意见" rows="1" id="deduct_reason" name="deduct_reason"></textarea>
                        <div class="weui-textarea-counter"><span>0</span>/50</div>
                        <div id="errorcontainer-deduct_reason" class="errorDiv"></div>
                    </div>
                    <input type="hidden" id="deduct_result">
                </div>
                <br>
                <div class="weui-cells__title">其他反馈</div>
                <div class="weui-cells weui-cells_form">
                    <div class="weui-cell">
                        <div class="weui-cell__bd">
                            <textarea id="reason" name="reason" class="weui-textarea" placeholder="请填写其他反馈" rows="3"></textarea>
                            <div class="weui-textarea-counter"><span>0</span>/200</div>
                            <div id="errorcontainer-reason" class="errorDiv"></div>
                        </div>
                    </div>
                </div>
                <br>
                <div class="weui-form__opr-area">
                    <button type="submit" class="weui-btn btn-primary" style="border-radius: 20px;">提交反馈</button>
                </div>
            </form>
        </div>
    </div>
</div>

<div id="js_toast" style="display: none;">
    <div class="weui-mask_transparent"></div>
    <div class="weui-toast">
        <i class="weui-icon-success-no-circle weui-icon_toast"></i>
        <p class="weui-toast__content">提交成功</p>
    </div>
</div>

<?php include ('footer.php'); ?>