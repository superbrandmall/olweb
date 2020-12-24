<?php
if(explode('?id=', $_SERVER['REQUEST_URI'])[1] != null) {
    $id = explode('?id=', $_SERVER['REQUEST_URI'])[1];
    if (strpos($id, '&type=') !== false) {
        $id = explode('&type=', $id)[0];
    }
}

$scripts = $scripts . '<script type="text/javascript" src="/views/assets/base/js/v2/event-admin.js"></script>';
?>

<img src='/views/assets/base/img/content/backgrounds/judyhao.png' width="50px;" alt="" style="z-index: 1; position: absolute; top: 15px; left: 15px;">

<div style="position: relative;">
    <iframe id="vr" src="javascript:;" width="100%" height="300px" frameborder="0"></iframe>
</div>

<div class="page__bd" style="position: relative; margin-top: -16px;">
    <ul class="collapse shop-collapse">
        <li class="wow fadeInUp" data-wow-delay="0.5s" data-wow-offset="400">
            <?php include ('timeline/step_two.php'); ?>
            <div class="weui-flex js-category-1">
                <h3 class="weui-flex__item"><span id="shopName"></span></h3>
                <hr color=#fff size=1 style="margin: 5px 0;">
                <div class="weui-flex__item">面积: <strong id="area"></strong>m<sup>2</sup> <strong id="area_spesifc"></strong></div>
                <div class="weui-flex__item">限高: <strong id="height"></strong></div>
                <div class="weui-flex__item">电源: <strong id="electricity"></strong></div>
                <div class="weui-flex__item">材质: <strong id="material"></strong></div>
                <div class="weui-flex__item">网络: <strong id="internet"></strong></div>
                <div class="weui-flex__item">货梯: <strong id="lift"></strong></div>
                <div class="weui-flex__item" id="desc"></div>
            </div>
        </li>
        <li class="wow fadeInUp" data-wow-delay="0.7s" data-wow-offset="300" style="margin: -90px 0 0;">
            <div class="weui-flex js-category-2">
                <h3 class="weui-flex__item" style="margin-bottom: 5px;">档期及价格<a id="floor_plan" href="javascript:;" class="weui-mark-rb" style="float: right; padding: 8px 12px; border-radius: 5px;">查看落位图</a></h3>
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
                <div class="weui-flex__item"><small>*我司对档期有最终解释权</small></div>
                <div class="weui-flex__item">
                    <table class="content" style="font-size: 11px;">
                        <thead style="background: #F2F2F2; color: #333;">
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
                        <thead style="background: #F2F2F2; color: #333; font-size: 12px;">
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
                                <td colspan="2" style="background: #F2F2F2; color: #333; font-size: 12px;">押金</td>
                                <td colspan="2">
                                    <span id="deposit">请选择档期查看押金</span>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2" style="background: #F2F2F2; color: #333; font-size: 12px;">总计需要交纳金额<br>(含税含押金)</td>
                                <td colspan="2">
                                    <span id="subTotal" style="color: #b43018">请选择档期查看总价</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </li>
        <li class="wow fadeInUp" data-wow-delay="0.9s" data-wow-offset="200" style="margin: -90px 0 0;">
            <div class="weui-flex js-category-4" style="padding-bottom: 0;">
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
                        <input class="weui-input placeholder" id="event_type" placeholder="请选择活动类型">
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
            </div>
        </li>
        <li class="wow fadeInUp" data-wow-delay="1.1s" data-wow-offset="100" style="margin: -90px 0 0;">
            <div class="weui-flex js-category-3">
                <h3 class="weui-flex__item">工程图纸 
                    <a id="cad" href="javascript:;" data-file="/upload/docs/cad/<?= $id?>.dwg" class="weui-mark-rb" style="float: right; padding: 8px 12px;border-radius: 5px;">下载CAD</a>                
                    <a href="/upload/docs/standards/<?= $id?>.pdf" download="/upload/docs/standards/<?= $id?>.pdf" class="weui-mark-rb" style="float: right; padding: 8px 12px; border-radius: 5px; margin-right: 5px;">下载工程条件</a>
                    <a id="engineering" href="/upload/docs/layout/<?= $id?>.pdf" download="/upload/docs/layout/<?= $id?>.pdf" class="weui-mark-rb" style="float: right;padding: 8px 12px; border-radius: 5px; margin-right: 5px;">下载图纸</a>
                </h3>
                <hr color=#d2d2d0 size=1 style="margin: 5px 0;">
                <div class="weui-flex__item">
                    <img src="/upload/docs/converted-jpg/<?= $id?>.jpg" style="width: 100%;" />
                    <p class="content" style="margin-top: 0; padding: 0 20px;">注:活动场地使用区域按斜线所示范围为限，活动场地内之装置或背板不得超过限高。</p>
                    
                </div>
            </div>
            <img src="/upload/docs/converted-jpg/<?= $id?>-1.jpg" style="width: 115%;" />
        </li>
    </ul>
</div>

<div class="page__bd" style="position: fixed;left: 0;right: 0;bottom: 0;">
    <div class="weui-panel__bd" style="padding: 10px 20px; position: relative; background-color: #e5e5e5; border-radius: 10px; margin-top: -50px; box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.5);-webkit-box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.5);">
        <a id="favourite" href="javascript:;" style="display: inline-block; font-size: 12px; color: #0C31FA; padding: 5px 0; text-align: center; width: 60px;">
            <i class="fa fa-heart-o" aria-hidden="true"></i><br>
            收藏
        </a>
        <a id="choose_event" href="javascript:;" style="float: right; font-size: 12px; color: #000; text-align: center; width: 80px;">
            <i class="fa fa-check" aria-hidden="true" style="font-size: 30px; color: #0C31FA; font-weight: bold;"></i><br>
            接受
        </a>
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

<br>
<br>
<br>

<?php include ('footer.php'); ?>