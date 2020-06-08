<?php
if (explode('?id=', $_SERVER['REQUEST_URI'])[1] != null) {
    $id = explode('?id=', $_SERVER['REQUEST_URI'])[1];
    if (strpos($id, '&trade=') !== false) {
        $id = explode('&trade=', $id)[0];
    }
} else {
    $id = null;
}

$scripts = $scripts . '<script type="text/javascript" src="/views/assets/base/js/v2/choose-event-admin.js"></script>';
?>

<?php include ('navbar_top.php'); ?>
<div class="weui-toptips bg-success topTips"><i class="fa fa-smile-o" aria-hidden="true"></i> 尊敬的阁下，请您告诉我们活动的档期、选择的有偿服务，以及您对本场地的报价，我们谈谈吧！</div>

<div class="page__bd" style="background-color: #EDEDED;">
    <div class="weui-form">
        <div class="weui-form__text-area">
            <h2 class="weui-form__title">场地选择报价</h2>
        </div>
        <div class="weui-form__control-area">
            <div class="weui-cells__group weui-cells__group_form">
                <div class="weui-cells__title" style="margin-top: 24px;">档期选择</div>
                <div class="weui-cells weui-cells_form">
                    <div class="weui-cell weui-cell_active">
                        <div class="weui-cell__hd"><label class="weui-label">档期起始</label></div>
                        <div class="weui-cell__bd">
                            <input class="weui-input date-start" id="dateStart_<?= $id; ?>" placeholder="填写档期起始日" readonly>
                        </div>
                    </div>
                    <div class="weui-cell weui-cell_active">
                        <div class="weui-cell__hd"><label class="weui-label">档期终止</label></div>
                        <div class="weui-cell__bd">
                            <input class="weui-input date-end" id="dateEnd_<?= $id; ?>" placeholder="填写档期终止日" readonly>
                        </div>
                    </div>
                    <div class="weui-cells__title">*我司对档期有最终解释权</div>
                </div>
            </div>
        </div>
    </div>
    <br>
    <div class="weui-form">
        <div class="weui-form__control-area">
            <div class="weui-cells__group weui-cells__group_form">
                <div class="weui-cells__title">增值有偿服务</div>
                <div class="weui-cells weui-cells_form">
                    <div class="weui-cell weui-cell_active">
                        <div class="weui-cell__bd">
                            <div class="weui-cells_checkbox">
                                <label class="weui-cell weui-cell_active weui-check__label" for="s11" style="padding: 8px 0 8px; display: block;">
                                    <div class="weui-cell__hd" style="float: left;">
                                        <input type="checkbox" class="weui-check" name="checkbox1" id="s11" checked="checked"/>
                                        <i class="weui-icon-checked"></i>
                                    </div>
                                    <div class="weui-cell__bd">
                                        <p>垃圾清运费服务: 活动所产生的干垃圾收费标准为 ¥40/桶、生活湿垃圾为 ¥60/桶，标准环卫桶 240L/桶; 建筑垃圾为 ¥1200/车</p>
                                    </div>
                                </label>
                                <label class="weui-cell weui-cell_active weui-check__label" for="s12" style="padding: 16px 0; display: block;">
                                    <div class="weui-cell__hd" style="float: left;">
                                        <input type="checkbox" name="checkbox2  " class="weui-check" id="s12"/>
                                        <i class="weui-icon-checked"></i>
                                    </div>
                                    <div class="weui-cell__bd">
                                        <p>保安服务: ¥55/人/小时 (不含税) ¥58/人/小时 (含税)</p>
                                    </div>
                                </label>
                                <label class="weui-cell weui-cell_active weui-check__label" for="s13" style="padding: 16px 0; display: block;">
                                    <div class="weui-cell__hd" style="float: left;">
                                        <input type="checkbox" name="checkbox3" class="weui-check" id="s13"/>
                                        <i class="weui-icon-checked"></i>
                                    </div>
                                    <div class="weui-cell__bd">
                                        <p>保洁服务: ¥30/人/小时 (含税)</p>
                                    </div>
                                </label>
                            </div>
                            <div class="weui-cells__title" style="padding: 0;">*有偿服务需另行签署补充协议</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <br>
    <div class="weui-form">
        <div class="weui-form__control-area">
            <div class="weui-cells__group weui-cells__group_form">
                <div class="weui-cells__title">价格信息</div>
                <div class="weui-cells weui-cells_form">
                    <div class="weui-cell weui-cell_active">
                        <div class="weui-cell__hd"><label id="user_offer_txt" for="" class="weui-label">您报的总价</label></div>
                        <div class="weui-cell__bd">
                            <input id="user_offer" class="weui-input" type="number" type="number" pattern="[0-9]*" placeholder="请填写您报的总价"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="weui-btn-area">
    <a class="weui-btn weui-btn_primary" href="javascript:" id="quotation">提交报价</a>
</div>

<br>
<br>
<br>
<br>

<?php include ('menu_bottom.php'); ?>

<?php include ('footer.php'); ?>