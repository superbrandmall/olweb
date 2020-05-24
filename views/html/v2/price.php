<?php
$scripts = $scripts. '<script type="text/javascript" src="/views/assets/base/js/v2/price-admin.js"></script>';
?>

<?php include ('navbar_top.php'); ?>

<div class="weui-toptips bg-success topTips"><i class="fa fa-heartbeat" aria-hidden="true"></i> 尊敬的阁下，人工智能已为您量身定做了一份报价，请查收！对了，您可以"滑动"选择"合同年限"来告诉我们您对租赁时长需求哦！</div>

<div class="page__bd" style="background-color: #EDEDED;">
    <div class="weui-form">
        <div class="weui-form__text-area">
            <h2 class="weui-form__title">智能报价</h2>
        </div>
        <div class="weui-form__control-area">
            <div class="weui-cells__group weui-cells__group_form">
                <div class="weui-cells__title" style="margin-top: 24px;">基础信息</div>
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
                        <div class="weui-cell__hd"><label class="weui-label">装修免租期</label></div>
                        <div class="weui-cell__bd">
                            <div class="weui-input"><span id="free_of_ground_rent"></span></div>
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
                </div>
            </div>
        </div>
    </div>
    <br>

    <div style="background-color: #fff; font-size: 15px; padding: 0 16px;">
        <div class="weui-form-preview__hd">
            <div class="weui-form-preview__item">
                <label class="weui-form-preview__label">合同信息</label>
                <em class="weui-form-preview__value">3年</em>
            </div>
        </div>
        <table>
            <thead>
                <tr>
                    <th>年限</th>
                    <th>日固定租金</th>
                    <th>月固定租金</th>
                    <th>扣率</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>第1年</td>
                    <td>¥<span id="first_year_unit_price"></span>/m²</td>
                    <td>¥<span id="first_year_rent"></span></td>
                    <td><span id="first_year_deduction_rate"></span>%</td>
                </tr>
                <tr>
                    <td>第2年</td>
                    <td>¥<span id="second_year_unit_price"></span>/m²</td>
                    <td>¥<span id="second_year_rent"></span></td>
                    <td><span id="second_year_deduction_rate"></span>%</td>
                </tr>
                <tr>
                    <td>第3年</td>
                    <td>¥<span id="third_year_unit_price"></span>/m²</td>
                    <td>¥<span id="third_year_rent"></span></td>
                    <td><span id="third_year_deduction_rate"></span>%</td>
                </tr>
            </tbody>
        </table>
        <div class="weui-form-preview__bd">
            <div class="weui-form-preview__item">
                <label class="weui-form-preview__label">物业管理费</label>
                <span class="weui-form-preview__value">¥<span id="third_year_property_maintenance"></span>/月</span>
            </div>
            <div class="weui-form-preview__item">
                <label class="weui-form-preview__label">比率推广费(按含税营业额)</label>
                <span class="weui-form-preview__value">1.50%</span>
            </div>
        </div>
        
        <div class="weui-form-preview__bd">
            <div class="weui-form-preview__item" style="text-align: left;">
                <span class="weui-form-preview__value">*以上固定租金和物业管理费，推广费都为不含税价格，固定租金税率5%，物业管理费和推广费税率6%</span>
            </div>
            <div class="weui-form-preview__item" style="padding: 16px 0;">
                <label class="weui-form-preview__label">保证金</label>
                <span class="weui-form-preview__value">¥<span id="bond"></span></span>
            </div>
            <div class="weui-form-preview__item" style="text-align: left;">
                <span class="weui-form-preview__value">*保证金构成=3个月最高固定租金含税价+3个月最高物业管理费含税价</span>
            </div>
        </div>
        <div class="weui-form-preview__ft">
            <a class="weui-form-preview__btn weui-form-preview__btn_default" id="negotiate" href="javascript:">谢绝</a>
            <a class="weui-form-preview__btn weui-form-preview__btn_primary" id="confirm_price" href="javascript:">接受报价</a>
        </div>
    </div>
</div>
<br>
<br>
<br>
<br>

<?php include ('menu_bottom.php'); ?>
<?php include ('footer.php'); ?>