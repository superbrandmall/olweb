<?php
if(explode('?id=', $_SERVER['REQUEST_URI'])[1] != null) {
    $id = explode('?id=', $_SERVER['REQUEST_URI'])[1];
    if (strpos($id, '&type=') !== false) {
        $id = explode('&type=', $id)[0];
    }
}

$scripts = $scripts . '<script type="text/javascript" src="/views/assets/base/js/nikola/bootstrap.bundle.min.js"></script>
            <script type="text/javascript" src="/views/assets/base/js/nikola/blocs.min.js"></script>
            <script type="text/javascript" src="/views/assets/plugins/jquery-weui-calendar/calendar.js"></script>
            <script type="text/javascript" src="/views/assets/base/js/v2/event-admin.js"></script>';
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
        background-color: #523634 !important;
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
        border: solid 3px #D9B791;
        color: #222;
        background: #fff;
    }
    
    .hidden {
        display: none;
    }
</style>

<div style="position: relative; margin-top: 65px;">
    <iframe id="vr" src="javascript:;" width="100%" height="300px" frameborder="0"></iframe>
    <video id="video" class="embed-responsive-item" autoplay muted playsinline preload="preload" loop="loop" style="width: 100%; height: auto">
        <source src="javascript:;" type="video/mp4">
    </video>
</div>

<div class="page__bd" style="margin-top: -6px;">
    <section class="cp-white" style="padding: 20px 15px; background-color: #323030;">
        <h3 class="weui-flex__item"><span id="shopName"></span></h3>
        <hr class="divider divider-default">
        <div class="weui-flex__item">面积: <strong id="area"></strong>m<sup>2</sup> <strong id="area_spesifc"></strong></div>
        <div class="weui-flex__item">限高: <strong id="height"></strong></div>
        <div class="weui-flex__item">电源: <strong id="electricity"></strong></div>
        <div class="weui-flex__item">材质: <strong id="material"></strong></div>
        <div class="weui-flex__item">网络: <strong id="internet"></strong></div>
        <div class="weui-flex__item">货梯: <strong id="lift"></strong></div>
        <div class="weui-flex__item" id="desc"></div>
    </section>
        
    <section style="padding: 20px 15px 10px;">
        <h3 class="weui-flex__item" style="margin-bottom: 5px;">档期及价格<a id="floor_plan" href="javascript:;" class="cp-btn-xs tc-white" style="float: right; border-width: 2px; padding: 0 10px; margin-top: -6px; border-radius: 14px;">查看落位图</a></h3>
        <div class="weui-cell weui-cell_active" style="padding: 16px 2px;">
            <div class="weui-cell__hd"><label class="weui-label">档期起始</label></div>
            <div class="weui-cell__bd">
                <input class="weui-input date-start placeholder" id="dateStart_<?= $id; ?>" placeholder="填写档期起始日" readonly>
            </div>
        </div>
        <div class="weui-cell weui-cell_active" style="padding: 16px 2px;">
            <div class="weui-cell__hd"><label class="weui-label">档期终止</label></div>
            <div class="weui-cell__bd">
                <input class="weui-input date-end placeholder" id="dateEnd_<?= $id; ?>" placeholder="填写档期终止日" readonly>
            </div>
        </div>
        <div class="weui-flex__item">
            <table class="content" style="font-size: 11px;">
                <thead style="background: #FEDDB8; background: -webkit-linear-gradient(to bottom, #DAB892, #FEDDB8); background: linear-gradient(to bottom, #DAB892, #FEDDB8); color: #333;">
                    <tr>
                        <th rowspan="2" style="text-align: center;">单价</th>
                        <th colspan="2" style="text-align: center;">1-7天</th>
                        <th colspan="2" style="text-align: center;">8天及8天以上</th>
                    </tr>
                    <tr>
                        <th style="text-align: center;">不含税</th>
                        <th style="text-align: center;">含税(税率5%)</th>
                        <th style="text-align: center;">不含税</th>
                        <th style="text-align: center;">含税(税率5%)</th>
                    </tr>
                </thead>
                <tbody id="eventRent">
                    <tr>
                        <td style="text-align: center; padding: 8px 6px;">工作日</td>
                        <td id="eventCWPriceTax" style="text-align: center;"></td>
                        <td id="eventCWPrice" style="text-align: center;"></td>
                        <td id="eventDWPriceTax"style="text-align: center;"></td>
                        <td id="eventDWPrice" style="text-align: center;"></td>
                    </tr>
                    <tr>
                        <td style="text-align: center; padding: 8px 6px;">节假日</td>
                        <td id="eventCHPriceTax" style="text-align: center;"></td>
                        <td id="eventCHPrice" style="text-align: center;"></td>
                        <td id="eventDHPriceTax"style="text-align: center;"></td>
                        <td id="eventDHPrice" style="text-align: center;"></td>
                    </tr>
                </tbody>
            </table>
            <table class="content">
                <thead style="background: #FEDDB8; background: -webkit-linear-gradient(to bottom, #DAB892, #FEDDB8); background: linear-gradient(to bottom, #DAB892, #FEDDB8); color: #333; font-size: 12px;">
                    <tr>
                        <th style="text-align: center;">类型</th>
                        <th style="text-align: center;">天数</th>
                        <th style="text-align: center;">单价</th>
                        <th style="text-align: center;">小计</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="text-align: center;">工作日</td>
                        <td id="workdays" style="text-align: center;">0天</td>
                        <td id="workdays_single"style="text-align: center;">¥-</td>
                        <td id="workdays_total" style="text-align: center;">¥-</td>
                    </tr>
                    <tr>
                        <td style="text-align: center;">节假日</td>
                        <td id="holidays" style="text-align: center;">0天</td>
                        <td id="holidays_single"style="text-align: center;">¥-</td>
                        <td id="holidays_total" style="text-align: center;">¥-</td>
                    </tr>
                </tbody>
                <tbody>
                    <tr>
                        <td colspan="2" style="background: #FEDDB8; color: #333; font-size: 12px;">合同总金额</td>
                        <td colspan="2">
                            <span id="amount">请选择档期查看</span>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2" style="background: #FEDDB8; color: #333; font-size: 12px;">押金</td>
                        <td colspan="2">
                            <span id="deposit">请选择档期查看</span>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2" style="background: #FEDDB8; color: #333; font-size: 12px;">总计需要交纳金额<br>(含税含押金)</td>
                        <td colspan="2">
                            <span id="subTotal" style="font-weight: bold;">请选择档期查看</span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>
        
    <section style="padding: 20px 15px 10px; clear: both;">
        <h3 class="weui-flex__item">活动方案及配套服务</h3>
        <div class="weui-cell weui-cell_active" style="padding: 16px 2px;">
            <div class="weui-cell__hd"><label class="weui-label">活动名称</label></div>
            <div class="weui-cell__bd">
                <input class="weui-input placeholder" id="event_name" placeholder="填写活动名称">
            </div>
        </div>
        <div class="weui-cell weui-cell_active" style="padding: 16px 2px;">
            <div class="weui-cell__hd"><label class="weui-label">活动类型</label></div>
            <div class="weui-cell__bd">
                <input class="weui-input placeholder" id="event_type" placeholder="活动类型">
            </div>
        </div>
        <div class="weui-cell weui-cell_active" style="padding: 16px 2px;">
            <div class="weui-cell__hd"><label class="weui-label">保安</label></div>
            <div class="weui-cell__bd">
                <div class="weui-input" id="security">请选择活动类型</div>
            </div>
        </div>
        <div class="weui-cell weui-cell_active" style="padding: 16px 2px;">
            <div class="weui-cell__hd"><label class="weui-label">保洁</label></div>
            <div class="weui-cell__bd">
                <div class="weui-input" id="cleaner">请选择活动类型</div>
            </div>
        </div>
        <div class="weui-cell weui-cell_active" style="padding: 16px 2px;">
            <div class="weui-cell__hd"><label class="weui-label">垃圾处理</label></div>
            <div class="weui-cell__bd">
                <div class="weui-input" id="garbage">请选择活动类型</div>
            </div>
        </div>
        <div class="weui-flex__item">*明星活动/大型发售会活动方必须办理大型公众性临时活动安全许可，请贵司配备相应标准的保安团队以保证您的活动顺利进行</div>
    </section>
    
    <section style="padding: 20px 15px 10px;">
        <h3 class="weui-flex__item">工程信息 
            <a id="cad" href="javascript:;" data-file="/upload/docs/cad/<?= $id?>.dwg" class="cp-btn-xs tc-white" style="float: right; border-width: 2px; padding: 0 10px; margin-top: -3px; border-radius: 14px;">下载CAD</a>                
            <a id="engineering_qa" href="/upload/docs/standards/<?= $id?>.pdf" download="/upload/docs/standards/<?= $id?>.pdf" class="cp-btn-xs tc-white" style="float: right; border-width: 2px; padding: 0 10px; margin-top: -3px; border-radius: 14px;">下载工程条件</a>
            <a id="engineering" href="/upload/docs/layout/<?= $id?>.pdf" download="/upload/docs/layout/<?= $id?>.pdf" class="cp-btn-xs tc-white" style="float: right; border-width: 2px; padding: 0 10px; margin-top: -3px; border-radius: 14px;">下载图纸</a>
        </h3>
        <div class="weui-flex__item">
            <img src="/upload/docs/converted-jpg/<?= $id?>.jpg" style="width: 100%;" />
        </div>
        <div class="weui-cells page-category-content">
            <p class="content" style="margin-top: 0;">
                <img src="/upload/docs/converted-jpg/<?= $id?>-1.jpg" style="width: 115%;" />
            </p>
            <p class="content" style="margin-top: 0; padding: 0 20px;">注:活动场地使用区域按斜线所示范围为限，活动场地内之装置或背板不得超过限高。</p>
        </div>
    </section>
</div>

<div class="page__bd" style="position: fixed;left: 0;right: 0;bottom: 0; z-index: 1;">
    <div class="weui-panel__bd" style="padding: 10px 20px; background-color: #323030;">
        <a id="favourite" href="javascript:;" style="display: inline-block; font-size: 12px; color: #fff; padding: 5px 0; text-align: center; width: 60px;">
            <i class="fa fa-heart-o" aria-hidden="true"></i><br>
            收藏
        </a>
        <a id="choose_event" href="javascript:;" class="weui-btn btn-primary" style="float: right; border-radius: 20px; font-size: 12px; margin-top: 5px;">接受报价</a>
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
        <div class="weui-dialog__hd"><strong class="weui-dialog__title">请选择</strong></div>
        <form id="appointmentDialogForm">
            <div class="weui-dialog__bd" style="padding: 0;">
                <div class="text-center" style="margin: 0 20px 20px;">
                    <input type="radio" name="accept-offers" id="msg_button" class="hidden radio-label" checked/>
                    <label for="msg_button" class="button-label">无e签宝,线上留言</label>
                    <p id="msg_p">请您留下联系方式，我司稍后会与您联系。</p>
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

<div class="js_dialog" id="floor_plan_viewer" style="display: none;">
    <div class="weui-mask"></div>
    <div class="weui-dialog">
        <div class="weui-dialog__bd" style="padding: 0; margin: 0;">
            <a href="javascript:" class="weui-dialog__btn weui-dialog__btn_primary" style="top: 0px; right: 10px; position: absolute;">x</a>
            <div style="margin: 10px; color: #565d66;">
                <strong id="floorNo"></strong>
                <span style="margin-left: 9px; background-color: #F26A85; border: solid 1px #DC143C; height: 10px; width: 15px; display: inline-block;"></span> 本位置    
            </div>
    
            <img src="javascript:;" width="320px" height="160px" id="map">
        </div>
        <div class="weui-dialog__ft" style="line-height: 28px; min-height: 28px;">
            
        </div>
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
        <p class="weui-toast__content">CAD发送成功</p>
    </div>
</div>

<div id="js_toast_4" style="display: none;">
    <div class="weui-mask_transparent"></div>
    <div class="weui-toast">
        <i class="weui-icon-cancel weui-icon_toast" style="color: #FA5151;"></i>
        <p class="weui-toast__content">
            本月暂无档期<br>请重新选择～
        </p>
    </div>
</div>

<br>
<br>
<br>

<?php include ('footer.php'); ?>