<?php
$scripts = $scripts. '<script type="text/javascript" src="/views/assets/base/js/v2/price-admin.js"></script>';
?>

<?php include ('navbar_top.php'); ?>

<div class="weui-toptips bg-success topTips"><i class="fa fa-heartbeat" aria-hidden="true"></i> 尊敬的阁下，人工智能已为您量身定做了一份报价，请查收！对了，您可以"滑动"选择"合同年限"来告诉我们您对租赁时长需求哦！</div>

<div class="weui-panel weui-panel_access" style="background-color: #c9b18d; margin-top: -7px;">
    <div class="weui-panel__hd" style="font-weight: 500; font-size: 18px; color: #514026; padding: 10px;"><i class="fa fa-chevron-circle-right" aria-hidden="true"></i> 智能报价</div>
    <div class="weui-panel__bd"></div>
</div>

<div class="page__bd">
    <div class="weui-form" style="background-color: #292929;">
        <div class="weui-form__control-area">
            <div class="weui-cells__group weui-cells__group_form">
                <div class="weui-cells__title" style="color: #bba585;">基础信息</div>
                <div class="weui-cells weui-cells_form" style="background-color: #3f3f3f;">
                    <div class="weui-cell weui-cell_active weui-cell_readonly" style="color: #bba585;">
                        <div class="weui-cell__hd"><label class="weui-label">位置</label></div>
                        <div class="weui-cell__bd">
                            <div class="weui-input" id="room_name"></div>
                        </div>
                    </div>
                    <div class="weui-cell weui-cell_active weui-cell_readonly" style="color: #bba585;">
                        <div class="weui-cell__hd"><label class="weui-label">租赁面积</label></div>
                        <div class="weui-cell__bd">
                            <div class="weui-input"><span id="area"></span>m<sup>2</sup></div>
                        </div>
                    </div>
                    <div class="weui-cell weui-cell_active weui-cell_readonly" style="color: #bba585;">
                        <div class="weui-cell__hd"><label class="weui-label">装修免租期</label></div>
                        <div class="weui-cell__bd">
                            <div class="weui-input"><span id="free_of_ground_rent"></span></div>
                        </div>
                    </div>
                    <div class="weui-cell weui-cell_active weui-cell_readonly" style="color: #bba585;">
                        <div class="weui-cell__hd"><label class="weui-label">进场日期</label></div>
                        <div class="weui-cell__bd">
                            <div class="weui-input" id="settle_date"></div>
                        </div>
                    </div>
                    <div class="weui-cell weui-cell_active weui-cell_readonly" style="color: #bba585;">
                        <div class="weui-cell__hd"><label class="weui-label">开业日期</label></div>
                        <div class="weui-cell__bd">
                            <div class="weui-input" id="open_date"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <div class="weui-form" style="background-color: #292929;">
        <div class="weui-form__control-area">
            <div class="weui-cells__group weui-cells__group_form">
                <div class="weui-cells__title" style="color: #bba585;">合同信息</div>
                <div class="weui-cells weui-cells_form" style="background-color: #3f3f3f;">
                    <div class="weui-cell weui-cell_active weui-cell_readonly" style="color: #bba585; border-bottom: solid 1px #292929; margin: 0 32px; padding: 16px 0 8px;">
                        <div class="weui-cell__hd"><label class="weui-label">合同年限</label></div>
                        <div class="weui-cell__bd">
                            <div class="weui-input" id="">2年</div>
                        </div>
                    </div>
                    <div style="margin: 0 32px">
                        <table style="margin: 0 auto; font-size: 16px; background-color: transparent; color: #bba585;">
                            <thead>
                                <tr style="border-bottom: solid 1px #595959; color: #fff;">
                                    <th style="border: 0 none;">年限</th>
                                    <th style="border: 0 none;">日固定租金</th>
                                    <th style="border: 0 none;">月固定租金</th>
                                    <th style="border: 0 none;">扣率</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr style="border-bottom: solid 1px #595959;">
                                    <td style="border: 0 none;">第1年</td>
                                    <td style="border: 0 none;">¥<span id="first_year_unit_price"></span>/m²</td>
                                    <td style="border: 0 none;">¥<span id="first_year_rent"></span></td>
                                    <td style="border: 0 none;"><span id="first_year_deduction_rate"></span>%</td>
                                </tr>
                                <tr style="border-bottom: solid 1px #595959;">
                                    <td style="border: 0 none;">第2年</td>
                                    <td style="border: 0 none;">¥<span id="second_year_unit_price"></span>/m²</td>
                                    <td style="border: 0 none;">¥<span id="second_year_rent"></span></td>
                                    <td style="border: 0 none;"><span id="second_year_deduction_rate"></span>%</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="weui-form-preview__bd" style="margin: 0 16px; padding: 0px 16px;">
                        <div class="weui-form-preview__item" style="border-bottom: solid 1px #292929; padding: 5px 0;">
                            <label class="weui-form-preview__label" style="color: #bba585;">物业管理费</label>
                            <span class="weui-form-preview__value" style="color: #bba585;">¥<span id="first_year_property_maintenance"></span>/月</span>
                        </div>
                        <div class="weui-form-preview__item" style="border-bottom: solid 1px #292929; padding: 5px 0;">
                            <label class="weui-form-preview__label" style="color: #bba585;">比率推广费(按含税营业额)</label>
                            <span class="weui-form-preview__value" style="color: #bba585;">1.50%</span>
                        </div>
                    </div>
                    <div class="weui-form-preview__bd" style="margin: 0 16px;padding: 0px 16px;">
                        <div class="weui-form-preview__item" style="text-align: left; border-bottom: solid 1px #292929; padding: 5px 0;">
                            <span class="weui-form-preview__value" style="color: #bba585;"><span style="color: #fff">*</span>以上固定租金和物业管理费，推广费都为不含税价格，固定租金税率5%，物业管理费和推广费税率6%</span>
                        </div>
                        <div class="weui-form-preview__item" style="border-bottom: solid 1px #292929; padding: 5px 0;">
                            <label class="weui-form-preview__label" style="color: #bba585;">保证金</label>
                            <span class="weui-form-preview__value" style="color: #bba585;">¥<span id="bond"></span></span>
                        </div>
                        <div class="weui-form-preview__item" style="text-align: left; padding: 5px 0;">
                            <span class="weui-form-preview__value" style="color: #bba585;"><span style="color: #fff">*</span>保证金构成=3个月最高固定租金含税价+3个月最高物业管理费含税价</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <br>
        <div class="weui-form-preview__ft">
            <button type="button" class="weui-btn" id="negotiate" style="background-color: #999999; color: #fff; border-radius: 15px; font-weight: 500; width: initial;">谢绝</button>
            <button type="button" class="weui-btn" id="confirm_price" style="background-color: #c9b18d; color: #514026; border-radius: 15px; font-weight: 500; width: initial; margin-top: 0;">接受报价</button>
        </div>
    </div>
</div>
<br>
<br>
<br>
<br>

<?php include ('menu_bottom.php'); ?>
<?php include ('footer.php'); ?>