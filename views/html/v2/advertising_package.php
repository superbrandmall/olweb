<?php
$scripts = $scripts . '<script type="text/javascript" src="/views/assets/base/js/nikola/bootstrap.bundle.min.js"></script>
            <script type="text/javascript" src="/views/assets/base/js/nikola/blocs.min.js"></script>
            <script type="text/javascript" src="/views/assets/plugins/jquery-weui-calendar/calendar.js"></script>
            <script type="text/javascript" src="/views/assets/base/js/v2/advertising-package-admin.js"></script>';
?>

<link href="/views/assets/plugins/jquery-weui-calendar/calendar.css" rel="stylesheet" type="text/css"/>
<link rel="stylesheet" type="text/css" href="/views/assets/base/css/nikola/bootstrap.min.css" />
<link rel="stylesheet" type="text/css" href="/views/assets/base/css/nikola.css" />

<style type="text/css">
    .weui_cell {
        padding: 10px 15px;
        position: relative;
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -webkit-align-items: center;
        -ms-flex-align: center;
        align-items: center;
    }
    
    .weui_cell::before {
        content: " ";
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 1px;
        border-top: 1px solid #d9d9d9;
        color: #d9d9d9;
        -webkit-transform-origin: 0 0;
        transform-origin: 0 0;
        -webkit-transform: scaleY(.5);
        transform: scaleY(.5);
        left: 15px;
    }
    
    .calendar {
        padding-bottom: 150px;
    }
    
    .old.scheduled span {
        color: #fff;
        background-color: #e0e0e0;
        display: inline-block;
        width: 99%;
        height: 37px;
        line-height: 38px;
        margin-top: 1px;
        border-radius: 3px;
        text-decoration: line-through;
        color: #666;
    }
    
    .calendar-month span.error {
        background-color: #f00 !important;
    }
</style>

<div class="weui-article" style="margin-top: 65px; padding: 0 16px;">
    <h1 style="margin-bottom: 0.5em;">广告位特价套餐</h1>
</div>
<div class="page__bd">
    <div style="margin-top: 0;">
        <div class="weui-form-preview">
            <div class="weui-form-preview__ft">
                <a class="weui-form-preview__btn weui-form-preview__btn_primary date-start" href="javascript:;" style="position:relative; color: #000;"><i class="fa fa-calendar" aria-hidden="true"></i> 开始日期<br>
                    <span id="date-start">填写档期起始日</span>
                    <input style="position: absolute; left: 0; top: 0; opacity: 0; height: 100%;  width: 100%;" class="date-input">
                </a>
                <a class="weui-form-preview__btn weui-form-preview__btn_primary date-end" href="javascript:;" style="color: #000;"><i class="fa fa-calendar" aria-hidden="true"></i> 结束日期<br>
                    <span id="date-end">填写档期终止日</span>
                    <input style="position: absolute; right: 0; top: 0; opacity: 0; height: 100%;  width: 100%;" class="date-input">
                </a>
            </div>
        </div>
    </div>
</div>

<div id="checkPay" style="position: fixed; bottom: 63px; left: 0; right: 0;text-align: center; z-index: 2;">
    <div class="weui-cells" style="margin-top: 0; text-align: left;">
        <div class="weui-cell" style="margin-bottom: 6px;">
            <div class="weui-cell__bd">
                <p style="font-size: 14px;">合计: <span style="color: #b43018;">¥</span> <span id="subTotal" style="color: #b43018; font-size: 18px;">请先选择档期</span><small> (含税含押金)</small></p>
            </div>
            <div class="weui-cell__ft">
                <a class="weui-btn btn-primary" id="confirm_price" href="javascript:;" style="width: initial; font-size: 14px; border-radius: 20px;">结算 <small>(<span id="subQTY"></span><small>)</small></a>
            </div>
        </div>
    </div>
</div>
<br><br><br><br><br>

<?php include ('timeline/step_two.php'); ?>

<?php include ('footer.php'); ?>