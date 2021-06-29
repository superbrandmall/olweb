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
            <script type="text/javascript" src="/views/assets/base/js/v2/ad-admin.js"></script>';
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

<div style="position: relative; margin-top: -11px;">
    <iframe id="vr" src="javascript:;" width="100%" height="300px" frameborder="0"></iframe>
    <video id="video" class="embed-responsive-item" autoplay muted playsinline preload="preload" loop="loop" style="width: 100%; height: auto">
        <source src="javascript:;" type="video/mp4">
    </video>
</div>

<div class="page__bd" style="position: relative; margin-top: -16px; margin-bottom: 66px;">
    <section style="padding: 20px 15px 10px;">
        <h3 class="weui-flex__item"><span id="ad_name"></span></h3>
        <div class="weui-flex__item">楼层: <strong id="ad_floor"></strong></div>
        <div class="weui-flex__item">类型: <strong id="ad_type"></strong></div>
        <div class="weui-flex__item">尺寸<sup>3</sup>(mm): <strong id="ad_size"></strong></div>
        <div class="weui-flex__item">材质: <strong id="ad_material"></strong></div>
        <div class="weui-flex__item" id="ad_desc"></div>
    </section>
        
    <section style="padding: 20px 15px 10px;">
        <h3 class="weui-flex__item" style="margin-bottom: 5px;">档期及价格<a id="floor_plan" href="javascript:;" class="weui-badge" style="float: right;background: rgba(0,0,0,0.1);color: #333;padding: 8px 12px;border-radius: 5px;">查看落位图</a></h3>
        <div class="weui-cell weui-cell_active" style="padding: 16px 2px;">
            <div class="weui-cell__hd"><label class="weui-label">档期起始</label></div>
            <div class="weui-cell__bd">
                <input class="weui-input date-start" id="dateStart_<?= $id; ?>" placeholder="填写档期起始日" readonly>
            </div>
        </div>
        <div class="weui-cell weui-cell_active" style="padding: 16px 2px;">
            <div class="weui-cell__hd"><label class="weui-label">档期终止</label></div>
            <div class="weui-cell__bd">
                <input class="weui-input date-end" id="dateEnd_<?= $id; ?>" placeholder="填写档期终止日" readonly>
            </div>
        </div>
        <div class="weui-flex__item"><small>*我司对档期有最终解释权</small></div>
        <div class="weui-flex__item">
            <table class="content" style="font-size: 11px;">
                <thead style="background: #F2F2F2; color: #333;">
                    <tr>
                        <th style="text-align: center;">不含税单价</th>
                        <th style="text-align: center;">含税单价(税率6%)</th>
                        <th style="text-align: center;">售卖单位</th>
                    </tr>
                </thead>
                <tbody id="adRent">
                    <tr>
                        <td id="ad_price_tax" style="text-align: center;"></td>
                        <td id="ad_price"style="text-align: center;"></td>
                        <td id="ad_frequency" style="text-align: center;"></td>
                    </tr>
                </tbody>
            </table>
            <table class="content">
                <tbody>
                    <tr>
                        <td style="background: #F2F2F2; color: #333;">播放频次</td>
                        <td id="ad_price_frequency"></td>
                    </tr>
                </tbody>
            </table>
            <table class="content">
                <tbody>
                    <tr>
                        <td style="background: #F2F2F2; color: #333; font-size: 12px;">天数</td>
                        <td>
                            <span id="days">请选择档期查看天数</span>
                        </td>
                    </tr>
                    <tr>
                        <td style="background: #F2F2F2; color: #333; font-size: 12px;">押金</td>
                        <td>
                            <span id="deposit">请选择档期查看押金</span>
                        </td>
                    </tr>
                    <tr>
                        <td style="background: #F2F2F2; color: #333; font-size: 12px;">总计需要交纳金额<br>(含税含押金)</td>
                        <td>
                            <span id="subTotal" style="color: #b43018">请选择档期查看总价</span>
                        </td>
                    </tr>
                </tbody>
            </table>
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
        <a id="favourite" href="javascript:;" style="display: inline-block; font-size: 12px; color: #fff; padding: 5px 0; text-align: center; width: 60px;">
            <i class="fa fa-heart-o" aria-hidden="true"></i><br>
            收藏
        </a>
        <a id="ad_shopping_cart" href="javascript:;" style="display: inline-block; font-size: 12px; color: #fff; padding: 5px 0; text-align: center; width: 60px;">
            <i class="fa fa-shopping-cart" aria-hidden="true"></i><br>
            购物车
        </a>
        <a id="orderType" href="javascript:;" class="weui-btn btn-primary" style="float: right; border-radius: 20px; font-size: 12px; margin-top: 5px; width: initial;">接受报价</a>
        <a id="add_ad" href="javascript:;" class="weui-btn btn-warning" style="float: right; border-radius: 20px; font-size: 12px; margin-top: 5px; margin-right: 5px; width: initial;">加入购物车</a>
    </div>
</div>

<div class="js_dialog" id="orderTypeDialog" style="display: none;">
    <div class="weui-mask"></div>
    <div class="weui-dialog" style="background: #f4f4f4;">
        <div class="weui-dialog__hd"><strong class="weui-dialog__title">请选择</strong></div>
        <form id="appointmentDialogForm">
            <div class="weui-dialog__bd" style="padding: 0 0 20px;">
                <div class="text-center" style="margin: 0 20px 20px;">
                    <input type="radio" name="accept-offers" id="msg_button" class="hidden radio-label" checked/>
                    <label for="msg_button" class="button-label">无e签宝,线上留言</label>
                    <p id="msg_p">请您留下联系方式，我司稍后会与您联系。</p>
                </div>
                <div class="text-center" style="margin:0 20px;">
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

<br>
<br>
<br>

<?php include ('footer.php'); ?>