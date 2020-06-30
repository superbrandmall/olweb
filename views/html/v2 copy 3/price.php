<?php
$scripts = $scripts. '<script type="text/javascript" src="/views/assets/base/js/v2/price-admin.js"></script>';
?>

<?php include ('navbar_top.php'); ?>

<div class="weui-toptips bg-success topTips"><i class="fa fa-heartbeat" aria-hidden="true"></i> 尊敬的阁下，人工智能已为您量身定做了一份报价，请查收！对了，您可以"滑动"选择"合同年限"来告诉我们您对租赁时长需求哦！</div>

<div class="slide" id="slide1">
    <ul></ul>
    <div class="dot"></div>
</div>

<div class="page__bd">
    <div class="weui-form__control-area">
        <div class="weui-cells__group weui-cells__group_form">
            <div class="weui-cells weui-cells_form">
                <div class="weui-cell weui-cell_active weui-cell_readonly">
                    <div class="weui-cell__hd"><label class="weui-label">位置</label></div>
                    <div class="weui-cell__bd">
                        <div class="weui-input" id="room_name"></div>
                    </div>
                </div>
                <div class="weui-cell weui-cell_active weui-cell_readonly">
                    <div class="weui-cell__hd"><label class="weui-label">租赁面积</label></div>
                    <div class="weui-cell__bd">
                        <div class="weui-input"><span id="area"></span>m<sup>2</sup></div>
                    </div>
                </div>
                <div class="weui-cell weui-cell_active weui-cell_readonly">
                    <div class="weui-cell__hd"><label class="weui-label">进场日期</label></div>
                    <div class="weui-cell__bd">
                        <div class="weui-input" id="settle_date"></div>
                    </div>
                </div>
                <div class="weui-cell weui-cell_active weui-cell_readonly">
                    <div class="weui-cell__hd"><label class="weui-label">开业日期</label></div>
                    <div class="weui-cell__bd">
                        <div class="weui-input" id="open_date"></div>
                    </div>
                </div>
                <div class="weui-cell weui-cell_active weui-cell_readonly">
                    <div class="weui-cell__hd"><label class="weui-label">装修免租期</label></div>
                    <div class="weui-cell__bd">
                        <div class="weui-input"><span id="free_of_ground_rent"></span>天</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <div class="weui-panel__hd" style="margin: 0 32px; padding: 16px 0 8px;">
        合同条件
    </div>
    
    <div class="weui-form__control-area">
        <div class="weui-cells__group weui-cells__group_form">
            <div class="weui-cells weui-cells_form">
                <div class="weui-cell weui-cell_active weui-cell_readonly" style="margin: 0 32px; padding: 16px 0 8px;">
                    <div class="weui-cell__hd"><label class="weui-label">签约年限</label></div>
                    <div class="weui-cell__bd">
                        <div class="weui-input"><span id="contractLength"></span>年</div>
                    </div>
                </div>
                <div style="margin: 0 32px">
                    <table style="margin: 0 auto; font-size: 16px;">
                        <thead>
                            <tr>
                                <th>年限</th>
                                <th>日固定租金</th>
                                <th>月固定租金</th>
                                <th>扣率</th>
                            </tr>
                        </thead>
                        <tbody id="shopRent"></tbody>
                    </table>
                </div>
                <div class="weui-form-preview__bd" style="margin: 0 16px; padding: 0px 16px;">
                    <div class="weui-form-preview__item" style="padding: 5px 0;">
                        <label class="weui-form-preview__label">物业管理费</label>
                        <span class="weui-form-preview__value">¥<span id="propertyMaintenance"></span>/月</span>
                    </div>
                    <div class="weui-form-preview__item" style=" padding: 5px 0;">
                        <label class="weui-form-preview__label">比率推广费(按含税营业额)</label>
                        <span class="weui-form-preview__value"><span id="promotionRate"></span>%</span>
                    </div>
                </div>
                <div class="weui-form-preview__bd" style="margin: 0 16px;padding: 0px 16px;">
                    <div class="weui-form-preview__item" style="text-align: left; padding: 5px 0;">
                        <span class="weui-form-preview__value">*以上固定租金和物业管理费，推广费都为不含税价格，固定租金税率5%，物业管理费和推广费税率6%</span>
                    </div>
                    <div class="weui-form-preview__item" style="padding: 5px 0;">
                        <label class="weui-form-preview__label">保证金</label>
                        <span class="weui-form-preview__value">¥<span id="deposit"></span></span>
                    </div>
                    <div class="weui-form-preview__item" style="text-align: left; padding: 5px 0;">
                        <span class="weui-form-preview__value">*保证金构成=3个月最高固定租金含税价+3个月最高物业管理费含税价</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <div class="weui-form__opr-area" style="margin-left: 32px; margin-right: 32px;">
        <a href="javascript:;" class="weui-btn weui-btn_disabled weui-btn_primary" id="negotiate" style="display: inline-block; width: 49%;">谢绝</a>
        <a href="javascript:;" class="weui-btn weui-btn_primary" id="confirm_price" style="display: inline-block; width: 49%;">接受报价</a>
    </div>
</div>

<br>
<br>
<br>

<?php include ('menu_bottom.php'); ?>
<?php include ('footer.php'); ?>