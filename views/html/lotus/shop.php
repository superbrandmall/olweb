<?php
if(explode('?id=', $_SERVER['REQUEST_URI'])[1] != null) {
    $id = explode('?id=', $_SERVER['REQUEST_URI'])[1];
    if (strpos($id, '&type=') !== false) {
        $id = explode('&type=', $id)[0];
    }
}

$scripts = $scripts . '<script type="text/javascript" src="/views/assets/base/js/nikola/bootstrap.bundle.min.js"></script>
            <script type="text/javascript" src="/views/assets/base/js/nikola/blocs.min.js"></script>
            <script type="text/javascript" src="/views/assets/plugins/zepto.weui.js"></script>
            <script type="text/javascript" src="/views/assets/base/js/v2/shop-admin.js?t='.date("Y-m-d").'"></script>';
?>

<link rel="stylesheet" type="text/css" href="/views/assets/base/css/nikola/bootstrap.min.css" />
<link rel="stylesheet" type="text/css" href="/views/assets/base/css/nikola.css" />

<style type="text/css">
    #pix_4 img {
        width: 100%;
    }
    
    #mapster_wrap_0 {
        margin: 0 auto;
    }

    .button-label {
        border: solid 2px #a2a3a5;
        color: #a2a3a5;
        border-radius: 100px;
        padding: 10px 0;
        width: 250px;
        font-size: 12px;
    }

    .radio-label:checked + .button-label {
        border: solid 3px #3e6ae1;
        color: #222;
        background: #fff;
    }
    
    .hidden {
        display: none;
    }
</style>

<div style="position: relative; margin-top: -11px;">
    <iframe id="vr" src="javascript:;" width="100%" height="300px" frameborder="0"></iframe>
    <video id="video_4" class="embed-responsive-item" autoplay muted playsinline preload="preload" loop="loop" style="width: 100%; height: auto">
        <source src="javascript:;" type="video/mp4">
    </video>
</div>
<!--<div id="pix_4" style="position: relative; display: none;">
    <img src="/upload/video/<?= $id ?>/<?= $id ?>00.jpg" />
</div>-->

<div class="page__bd">
    <section style="padding: 20px 15px 10px;">
        <h3 class="weui-flex__item"><span id="shopName"></span><a id="engineering_qa" href="/upload/docs/qa/<?= $id?>.pdf" download="/upload/docs/qa/<?= $id?>.pdf" class="weui-badge" style="float: right;background: rgba(0,0,0,0.1);color: #333;padding: 8px 10px;border-radius: 5px;">下载常见问答</a></h3>
        <div class="weui-flex__item"><strong>¥<span id="taxAmount"></span> <small>/m<sup>2</sup>/月</small></strong> <small>(¥<span id="rentAmount"></span> /m<sup>2</sup>/天)</small></div>
        <div class="weui-flex__item">面积 <span id="area">8</span>m<sup>2</sup>(租赁面积)</div>
        <div class="weui-flex__item" id="desc"></div>
    </section>
    <section style="padding: 20px 15px 10px;">
        <h3 class="weui-flex__item">租约信息
            <a id="floor_plan" href="javascript:;" class="weui-badge" style="float: right;background: rgba(0,0,0,0.1);color: #333;padding: 8px 10px;border-radius: 5px;">查看落位图</a>
            <a id="vr_3d" href="javascript:;" class="weui-badge" style="float: right;background: #007bff; font-weight: bold; padding: 8px 10px;border-radius: 5px;margin-right: 5px;">VR看铺</a>
        </h3>
        <div class="weui-flex__item weui-cell_access" style="float: left; width: 35%;"><small>进场日期</small><br><h6 id="settleDate" class="weui-cell__ft" style="text-align: left; color: #000;"></h6></div>
        <div style="float: left; width: 5%;">&nbsp;</div>
        <div class="weui-flex__item" style="float: left; width: 30%;"><small>开业日期</small><br><h6 id="openDate"></h6></div>
        <div class="weui-flex__item" style="float: left; width: 30%;"><small>装修免租期</small><br><h6><span id="freeOfGroundRent"></span>天</h6></div>
    </section>
    <section style="padding: 20px 15px 10px; clear: both;">
        <div class="weui-cells page-category-content">
            <h3 class="weui-flex__item">商务条件</h3>
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
                        <td style="background: #F2F2F2; color: #333;">首期总计交纳金额</td>
                        <td>¥<span id="totalAmount"></span></td>
                    </tr>
                    <tr>
                        <td colspan="2">注: 应缴金额=保证金+数据采集设备押金+首月固定租金与物业管理费(含税)</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>
    <section style="padding: 20px 15px 10px;">
        <h3 class="weui-flex__item">工程信息
            <a href="javascript:;" id="cad" data-file="/upload/docs/cad/<?= $id?>.dwg" class="weui-badge" style="float: right;background: rgba(0,0,0,0.1);color: #333;padding: 8px 10px;border-radius: 5px;">下载CAD</a>                
            <a id="engineering_qa" href="/upload/docs/standards/<?= $id?>.pdf" download="/upload/docs/standards/<?= $id?>.pdf" class="weui-badge" style="float: right;background: rgba(0,0,0,0.1);color: #333;padding: 8px 10px;border-radius: 5px; margin-right: 5px;">下载工程条件</a>            
            <a id="engineering" href="/upload/docs/layout/<?= $id?>.pdf" download="/upload/docs/layout/<?= $id?>.pdf" class="weui-badge" style="float: right;background: rgba(0,0,0,0.1);color: #333;padding: 8px 10px;border-radius: 5px; margin-right: 5px;">下载图纸</a>
        </h3>
        <div class="weui-flex__item">
            <img src="/upload/docs/converted-jpg/<?= $id?>.jpg" style="width: 100%;" />
        </div>
        <div class="weui-cells page-category-content">
            <p class="content" style="margin-top: 0;">
                <img src="/upload/docs/converted-jpg/<?= $id?>-1.jpg" style="width: 100%;" />
                <img src="/upload/docs/converted-jpg/<?= $id?>-2.jpg" alt="" style="width: 100%;" />
                <img src="/upload/docs/converted-jpg/<?= $id?>-3.jpg" alt="" style="width: 100%;" />
            </p>
        </div>
    </section>
</div>

<div class="nikola-steps" style="bottom: 65px; z-index: 1;">
    <div class="nikola-tab">
        <div class="nikola-navbar">
            <div class="nikola-navbar__item">
                1.介绍
            </div>
            <div class="nikola-navbar__item nikola-bar__item_on">
                2.选择
            </div>
            <div class="nikola-navbar__item">
                3.付款
            </div>
        </div>
    </div>
</div>

<div class="page__bd" style="position: fixed;left: 0;right: 0;bottom: 0; z-index: 1;">
    <div class="weui-panel__bd" style="padding: 10px 20px; background-color: #333;">
        <a id="call" href="javascript:;" style="display: inline-block; font-size: 12px; color: #fff; padding: 5px 0; text-align: center; width: 48px;">
            <i class="fa fa-calendar" aria-hidden="true"></i><br>
            联系看铺
        </a>
        <a id="negotiate" href="javascript:;" style="display: inline-block; font-size: 12px; color: #fff; padding: 5px 0; text-align: center; width: 30px;">
            <i class="fa fa-times" aria-hidden="true"></i><br>
            谢绝
        </a>
        <a id="favourite" href="javascript:;" style="display: inline-block; font-size: 12px; color: #fff; padding: 5px 0; text-align: center; width: 48px;">
            <i class="fa fa-heart-o" aria-hidden="true"></i><br>
            收藏
        </a>
        <a id="orderType" href="javascript:;" class="weui-btn btn-primary" style="float: right; border-radius: 20px; padding: 8px 80px; font-size: 12px; margin-top: 5px; width: initial;">下一步</a>
    </div>
</div>

<div id="vr_viewer" class="weui-gallery" style="display: none;">
    <iframe src="javascript:;" width="100%" frameborder="0" style="height: 90vh;"></iframe>
    <div class="weui-gallery__opr">
        <a href="javascript:" class="weui-gallery__del">
            <i class="fa fa-times" aria-hidden="true" style="color: #fff;" onclick='$("#vr_viewer iframe").attr("src","javascript:;"); $("#vr_viewer").hide();'></i>
        </a>
    </div>
</div>

<div class="js_dialog" id="floor_plan_viewer" style="display: none;">
    <div class="weui-mask"></div>
    <div class="weui-dialog">
        <div class="weui-dialog__bd" style="padding: 0; margin: 0;">
            <a href="javascript:" class="weui-dialog__btn weui-dialog__btn_primary" style="top: 0px; right: 10px; position: absolute;">x</a>
            <img src="javascript:;" width="320px" id="map">
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
                            <div class="weui-cell__bd" style="margin-top: -8px;">
                                <input name="cadEmail" id="cadEmail" type="email" class="weui-input placeholder" required placeholder="如:first.last@company.com" />
                            </div>
                        </div>
                        <div class="errorDiv" id="errorcontainer-cadEmail"></div>
                    </div>
                </div>
            </div>
            <div class="weui-dialog__ft" style="line-height: 56px; min-height: 56px; font-size: 17px; -webkit-flex-direction: initial;">
                <a href="javascript: hideDialog();" class="weui-dialog__btn weui-dialog__btn_default">取消</a>
                <button type="submit" class="weui-dialog__btn weui-dialog__btn_primary" style="color: var(--weui-FG-HALF); font-size: 17px; border: 0 none; background: #fff;">提交</button>
            </div>
        </form>
    </div>
</div>

<div class="js_dialog" id="orderTypeDialog" style="display: none;">
    <div class="weui-mask"></div>
    <div class="weui-dialog" style="background: #f4f4f4;">
        <div class="weui-dialog__hd"><strong class="weui-dialog__title">请选择订单形式</strong></div>
        <form>
            <div class="weui-dialog__bd" style="padding: 0;">
                <div class="text-center" style="margin: 0 20px 20px;">
                    <input type="radio" name="accept-offers" id="reserve_button" class="hidden radio-label" checked/>
                    <label for="reserve_button" class="button-label">无e签宝,线上支付定金 ¥1,000元</label>
                    <p id="reserve_p">第一笔款项为定金壹仟元，支付后请于<strong id="expect"></strong>日与我司完成线下签约。该笔付款不可退还、不可转让。</p>
                </div>
                <div class="text-center" style="margin: 0 20px 20px;">
                    <input type="radio" name="accept-offers" id="esign_button" class="hidden radio-label" />
                    <label for="esign_button" class="button-label">e签宝,线上签约并付全款</label>
                    <p id="esign_p" class="hidden">需上传资质文件，待审核后通过e签宝电子签章平台完成双方用印。</p>
                </div>
            </div>
            <div class="weui-dialog__ft" style="line-height: 56px; min-height: 56px; font-size: 17px; -webkit-flex-direction: initial;">
                <a href="javascript: hideOrderTypeDialog();" class="weui-dialog__btn weui-dialog__btn_default">取消</a>
                <button type="button" id="confirm_price" class="weui-dialog__btn weui-dialog__btn_primary" style="color: var(--weui-FG-HALF); font-size: 17px; border: 0 none;">提交</button>
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
                                <div class="weui-cell__hd" style="padding-right: 0; margin-top: 8px;">
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
            <div class="weui-dialog__ft" style="line-height: 56px; min-height: 56px; font-size: 17px; -webkit-flex-direction: initial;">
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