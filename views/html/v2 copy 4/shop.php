<?php
if(explode('?id=', $_SERVER['REQUEST_URI'])[1] != null) {
    $id = explode('?id=', $_SERVER['REQUEST_URI'])[1];
    if (strpos($id, '&type=') !== false) {
        $id = explode('&type=', $id)[0];
    }
}

$scripts = $scripts . '<script type="text/javascript" src="/views/assets/plugins/zepto.weui.js"></script>'
        . '<script type="text/javascript" src="/views/assets/base/js/v2/shop-admin.js"></script>';
?>

<style type="text/css">
    #mapster_wrap_0 {
        margin: 0 auto;
    }  
</style>

<img src='/views/assets/base/img/content/backgrounds/judyhao.png' width="50px;" alt="" style="z-index: 1; position: absolute; top: 15px; left: 15px;">

<div style="position: relative;">
    <iframe id="vr" src="javascript:;" width="100%" height="300px" frameborder="0"></iframe>
</div>

<div class="page__bd" style="position: relative; margin-top: -20px;">
    <ul class="collapse shop-collapse">
        <li class="wow fadeInUp" data-wow-delay="0.5s" data-wow-offset="300">
            <?php include ('timeline/step_two.php'); ?>
            <div class="weui-flex js-category-1">
                <h3 class="weui-flex__item"><span id="shopName"></span><a href="/upload/docs/qa/<?= $id?>.pdf" download="/upload/docs/qa/<?= $id?>.pdf" class="weui-mark-rb" style="float: right; padding: 8px 12px; border-radius: 5px;">下载常见问答</a></h3>
                <div class="weui-flex__item"><strong>¥<span id="rentAmount"></span> /m<sup>2</sup>/天</strong></div>
                <div class="weui-flex__item">面积 <span id="area">8</span>m<sup>2</sup>(租赁面积)</div>
                <div class="weui-flex__item">推荐业态 <span id="businessFormatChs"></span></div>
            </div>
        </li>
        <li class="wow fadeInUp" data-wow-delay="0.7s" data-wow-offset="200">
            <div class="weui-flex js-category-2">
                <h3 class="weui-flex__item">租约信息<a id="floor_plan" href="javascript:;" class="weui-mark-rb" style="float: right; padding: 8px 12px; border-radius: 5px;">查看落位图</a></h3>
                <hr color=#ffffff size=1 style="margin: 5px 0;">
                <div class="weui-flex__item weui-cell_access" style="float: left; width: 35%;"><small>进场日期</small><br><h4 id="settleDate" class="weui-cell__ft" style="text-align: left; color: #fff;"></h4></div>
                <div style="float: left; width: 5%;">&nbsp;</div>
                <div class="weui-flex__item" style="float: left; width: 30%;"><small>开业日期</small><br><h4 id="openDate"></h4></div>
                <div class="weui-flex__item" style="float: left; width: 30%;"><small>装修免租期</small><br><h4><span id="freeOfGroundRent"></span>天</h4></div>
            </div>
            <div class="page-category js-categoryInner" style="clear: both; padding: 15px 20px;">
                <div class="weui-cells page-category-content">
                    <h3 class="weui-flex__item">商务条件</h3>
                    <hr color=#ffffff size=1 style="margin: 5px 0;">
                    <table class="content" style="font-size: 11px;">
                        <thead style="background: #F2F2F2; color: #333;">
                            <tr>
                                <th rowspan="2" style="text-align: center;">年限</th>
                                <th style="text-align: center;">日固定租金<br>(元/m²/天)</th>
                                <th rowspan="2" style="text-align: center;">扣率%</th>
                                <th colspan="2" style="text-align: center;">月固定租金</th>
                            </tr>
                            <tr>
                                <th style="text-align: center;">不含税</th>
                                <th style="text-align: center;">不含税</th>
                                <th style="text-align: center;">含税(税率5%)</th>
                            </tr>
                        </thead>
                        <tbody id="shopRent"></tbody>
                    </table>
                    
                    <table class="content" style="font-size: 11px;">
                        <thead style="background: #F2F2F2; color: #333;">
                            <tr>
                                <th style="text-align: center;">月物业管理费<br>(元/m²)</th>
                                <th colspan="2" style="text-align: center;">月物业管理费</th>
                            </tr>
                            <tr>
                                <th style="text-align: center;">不含税</th>
                                <th style="text-align: center;">不含税</th>
                                <th style="text-align: center;">含税(税率6%)</th>
                            </tr>
                        </thead>
                        <tbody id="propertyMaintenance"></tbody>
                    </table>
                    
                    <table class="content" style="font-size: 11px;">
                        <tbody>
                            <tr>
                                <td style="background: #F2F2F2; color: #333;">履约保证金(含税)</td>
                                <td>¥<span id="deposit"></span></td>
                            </tr>
                            <tr>
                                <td style="background: #F2F2F2; color: #333;">数据采集设备押金</td>
                                <td>¥<span>3,000</span></td>
                            </tr>
                            <tr>
                                <td style="background: #F2F2F2; color: #333;">每月推广费</td>
                                <td>含税营业额的<span id="promotionRate"></span>%</td>
                            </tr>
                            <tr>
                                <td colspan="2">注: 保证金构成=3x(最高月固定租金+物业管理费)(含税)</td>
                            </tr>
                        </tbody>
                    </table>
                    
                    <table class="content">
                        <tbody>
                            <tr>
                                <td style="background: #F2F2F2; color: #333;">总计需要交纳金额</td>
                                <td>¥<span id="totalAmount"></span></td>
                            </tr>
                            <tr>
                                <td colspan="2">注: 应缴金额=保证金+数据采集设备押金+首月固定租金与物业管理费(含税)</td>
                            </tr>
                        </tbody>
                    </table>
                    <br>
                    <h3 class="weui-flex__item">铺位简介</h3>
                    <hr color=#ffffff size=1 style="margin: 5px 0;">
                    <p class="content" id="desc"></p>
                </div>
            </div>
        </li>
        <li class="wow fadeInUp" data-wow-delay="0.9s" data-wow-offset="100">
            <div class="weui-flex js-category-3" style="padding-bottom: 0;">
                <h3 class="weui-flex__item">工程图纸
                    <a href="javascript:;" id="cad" data-file="/upload/docs/cad/<?= $id?>.dwg" class="weui-mark-rb" style="float: right; padding: 8px 12px;border-radius: 5px;">下载CAD</a>                
                    <a href="/upload/docs/standards/<?= $id?>.pdf" download="/upload/docs/standards/<?= $id?>.pdf" class="weui-mark-rb" style="float: right; padding: 8px 12px; border-radius: 5px; margin-right: 5px;">下载工程条件</a>            
                    <a id="engineering" href="/upload/docs/layout/<?= $id?>.pdf" download="/upload/docs/layout/<?= $id?>.pdf" class="weui-mark-rb" style="float: right;padding: 8px 12px; border-radius: 5px; margin-right: 5px;">下载图纸</a>
                </h3>
                <hr color=#d2d2d0 size=1 style="margin: 5px 0;">
                <div class="weui-flex__item">
                    <img src="/upload/docs/converted-jpg/<?= $id?>.jpg" style="width: 100%;" />
                </div>
            </div>
            <div class="page-category js-categoryInner">
                <div class="weui-cells page-category-content">
                    <p class="content" style="margin-top: 0;">
                        <img src="/upload/docs/converted-jpg/<?= $id?>-1.jpg" style="width: 100%;" />
                        <img src="/upload/docs/converted-jpg/<?= $id?>-2.jpg" alt="" style="width: 100%;" />
                        <img src="/upload/docs/converted-jpg/<?= $id?>-3.jpg" alt="" style="width: 100%;" />
                    </p>
                </div>
            </div>
        </li>
    </ul>
</div>

<div class="page__bd" style="position: fixed;left: 0;right: 0;bottom: 0;">
    <div class="weui-panel__bd" style="padding: 10px 20px; position: relative; background-color: #e5e5e5; border-radius: 10px; margin-top: -50px;">
        <a id="favourite" href="javascript:;" style="display: inline-block; font-size: 12px; color: #0C31FA; padding: 5px 0; text-align: center; width: 60px;">
            <i class="fa fa-heart-o" aria-hidden="true"></i><br>
            收藏
        </a>
        <a id="call" href="javascript:;" style="display: inline-block; font-size: 12px; color: #0C31FA; padding: 5px 0; text-align: center; width: 60px;">
            <i class="fa fa-calendar" aria-hidden="true"></i><br>
            联系看铺
        </a>
        <a id="confirm_price" href="javascript:;" style="float: right; font-size: 12px; color: #000; text-align: center; width: 80px;">
            <i class="fa fa-check" aria-hidden="true" style="font-size: 30px; color: #0C31FA; font-weight: bold;"></i><br>
            接受
        </a>
        <a id="negotiate" href="javascript:;" style="float: right; font-size: 12px; color: #000; text-align: center; width: 80px;">
            <i class="fa fa-times" aria-hidden="true" style="font-size: 30px; color: #0C31FA; font-weight: bold;"></i><br>
            谢绝
        </a>
    </div>
</div>

<div class="js_dialog" id="floor_plan_viewer" style="display: none;">
    <div class="weui-mask"></div>
    <div class="weui-dialog">
        <div class="weui-dialog__bd" style="padding: 0; margin: 0;">
            <a href="javascript:" class="weui-dialog__btn weui-dialog__btn_primary" style="top: 0px; right: 10px; position: absolute;">x</a>
            <div style="margin: 10px; color: #565d66;">
                <strong id="floorNo"></strong>
                <span style="margin-left: 9px; background-color: #F26A85; border: solid 1px #DC143C; height: 10px; width: 15px; display: inline-block;"></span> 本位置可点击    
            </div>
    
            <img src="javascript:;" width="320px" height="160px" id="map">
        </div>
        <div class="weui-dialog__ft" style="line-height: 28px; min-height: 28px;">
            
        </div>
    </div>
</div>

<div class="js_dialog" id="cadDialog" style="display: none;">
    <div class="weui-mask"></div>
    <div class="weui-dialog" style="background: #fff;">
        <div class="weui-dialog__hd"><strong class="weui-dialog__title">请提供下载CAD文件的邮箱</strong></div>
        <form id="cadDialogForm">
            <div class="weui-dialog__bd" style="padding: 0;">
                <div class="weui-cells__group weui-cells__group_form">
                    <div class="weui-cells weui-cells_form">
                        <div class="weui-cell weui-cell_active" style="padding: 16px 0;">
                            <div class="weui-cell__hd" style="padding-right: 0;"><label class="weui-label">Email</label></div>
                            <div class="weui-cell__bd">
                                <input name="cadEmail" id="cadEmail" type="email" class="weui-input placeholder" required placeholder="如:first.last@company.com" />
                            </div>
                        </div>
                        <div class="errorDiv" id="errorcontainer-cadEmail"></div>
                    </div>
                </div>
            </div>
            <div class="weui-dialog__ft">
                <a href="javascript: hideDialog();" class="weui-dialog__btn weui-dialog__btn_default">取消</a>
                <button type="submit" class="weui-dialog__btn weui-dialog__btn_primary" style="color: var(--weui-FG-HALF); font-size: 17px; border: 0 none; background: #fff;">提交</button>
            </div>
        </form>
    </div>
</div>

<div class="js_dialog" id="appointmentDialog" style="display: none;">
    <div class="weui-mask"></div>
    <div class="weui-dialog" style="background: #fff;">
        <div class="weui-dialog__hd"><strong class="weui-dialog__title">请提供贵司看铺联系人的邮箱</strong></div>
        <form id="appointmentDialogForm">
            <div class="weui-dialog__bd" style="padding: 0;">
                <div class="weui-cells__group weui-cells__group_form">
                    <div class="weui-cells weui-cells_form">
                        <div class="weui-cell weui-cell_active">
                            <div class="weui-cell__hd" style="padding-right: 0;"><label class="weui-label">公司名称*</label></div>
                            <div class="weui-cell__bd">
                                <input name="appointmentCompany" id="appointmentCompany" class="weui-input placeholder" required placeholder="填写公司名称"/>
                            </div>
                        </div>
                        <div class="errorDiv" id="errorcontainer-appointmentCompany"></div>
                        <div class="weui-cell weui-cell_active">
                            <div class="weui-cell__hd" style="padding-right: 0;"><label class="weui-label">联系人*</label></div>
                            <div class="weui-cell__bd">
                                <input name="appointmentName" id="appointmentName" required class="weui-input placeholder" placeholder="填写联系人姓名"/>
                            </div>
                        </div>
                        <div class="errorDiv" id="errorcontainer-appointmentName"></div>
                        <div class="weui-cell weui-cell_active">
                            <div class="weui-cell__hd" style="padding-right: 0;"><label class="weui-label">Email</label></div>
                            <div class="weui-cell__bd">
                                <input name="appointmentEmail" id="appointmentEmail" type="email" class="weui-input placeholder" placeholder="填写电子邮箱" />
                            </div>
                        </div>
                        <div class="errorDiv" id="errorcontainer-appointmentEmail"></div>
                        <div class="weui-cell weui-cell_active weui-cell_select weui-cell_select-after">
                            <div class="weui-cell" style="padding: 16px 0;">
                                <div class="weui-cell__hd" style="padding-right: 0;">
                                    <label for="appointmentTime" class="weui-label">看铺时间*</label>
                                </div>
                                <div class="weui-cell__bd">
                                    <input name="appointmentTime" id="appointmentTime" required class="weui-input placeholder" placeholder="选择看铺时间" readonly />
                                    <input id="appointmentTime2" type="hidden" />
                                </div>
                            </div>
                        </div>
                        <div class="errorDiv" id="errorcontainer-appointmentTime"></div>
                    </div>
                </div>
            </div>
            <div class="weui-dialog__ft">
                <a href="javascript: hideAppointmentDialog();" class="weui-dialog__btn weui-dialog__btn_default">取消</a>
                <button type="submit" class="weui-dialog__btn weui-dialog__btn_primary" style="color: var(--weui-FG-HALF); font-size: 17px; border: 0 none; background: #fff;">提交</button>
            </div>
        </form>
    </div>
</div>

<div id="js_toast_1" style="display: none;">
    <div class="weui-mask_transparent"></div>
    <div class="weui-toast">
        <i class="weui-icon-success-no-circle weui-icon_toast"></i>
        <p class="weui-toast__content">
            加入关注成功～
        </p>
    </div>
</div>

<div id="js_toast_2" style="display: none;">
    <div class="weui-mask_transparent"></div>
    <div class="weui-toast">
        <i class="weui-icon-success-no-circle weui-icon_toast"></i>
        <p class="weui-toast__content">
            取消关注成功～
        </p>
    </div>
</div>

<div id="js_toast_3" style="display: none;">
    <div class="weui-mask_transparent"></div>
    <div class="weui-toast">
        <i class="weui-icon-success-no-circle weui-icon_toast"></i>
        <p class="weui-toast__content">预约看铺成功</p>
    </div>
</div>

<div id="js_toast_4" style="display: none;">
    <div class="weui-mask_transparent"></div>
    <div class="weui-toast">
        <i class="weui-icon-success-no-circle weui-icon_toast"></i>
        <p class="weui-toast__content">CAD发送成功</p>
    </div>
</div>

<br>
<br>
<br>

<?php include ('footer.php'); ?>