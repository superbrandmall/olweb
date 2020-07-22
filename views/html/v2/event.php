<?php
if(explode('?id=', $_SERVER['REQUEST_URI'])[1] != null) {
    $id = explode('?id=', $_SERVER['REQUEST_URI'])[1];
    if (strpos($id, '&type=') !== false) {
        $id = explode('&type=', $id)[0];
    }
}

$scripts = $scripts . '<script type="text/javascript" src="/views/assets/plugins/sys-calendar/js/sys-calendar.js"></script>'
        . '<script type="text/javascript" src="/views/assets/base/js/v2/event-admin.js"></script>';
?>

<link href="/views/assets/plugins/sys-calendar/css/record.css" rel="stylesheet" type="text/css"/>
<style type="text/css">
    .calendar {
        margin-bottom: 10px;
    }
    .calendar-column-header {
        font-size: 14px;
        background: tan;
        height: auto;
    }
    
    .calendar-table, .calendar-tbody {
        height: 0;
    }
    
    .calendar-value {
        font-size: 14px;
    }
    
    .calendar-date {
        padding: 0;
    }
    
    .calendar-date .value {
        display: none;
    }
    
    .calendar-year-select, .calendar-month-select,
    .weui-table td, .weui-table th, table td, table th {
        border: solid 1px #baad9b
    }
    
    .dropdown-month .month-item, .dropdown-year .year-item {
        border-radius: 0;
        box-shadow: none;
    }
    
    .calendar-header {
        position: absolute;
        top: 0;
        right: 0;
    }
    
    hr {
        width: 100%;
    }
    
    .calendar-cell.active {
        border: 3px solid #F07102;
    }
</style>

<div style="position: relative;" class="wow lightSpeedIn" data-wow-delay="0.2s" data-wow-offset="300">
    <div class="slide">
        <ul>
            <li>
                <img src="/views/assets/base/img/content/backgrounds/events/<?= $id ?>_1.jpg" style="width: 100%; text-align: center;" />
            </li>
            <li>
                <img src="/views/assets/base/img/content/backgrounds/events/<?= $id ?>_2.jpg" style="width: 100%; text-align: center;" />
            </li>
        </ul>
    </div>
</div>

<div class="page__bd" style="position: relative; margin-top: -16px;">
    <ul class="collapse shop-collapse">
        <li class="wow fadeInUp" data-wow-delay="0.5s" data-wow-offset="400" style="background: url(/views/assets/base/img/content/backgrounds/shop/granite-bg.jpg);">
            <div class="weui-flex js-category-1">
                <h3 class="weui-flex__item"><span id="shopName"></span><a id="vr" href="javascript:;" class="weui-badge" style="float: right;background: rgba(0,0,0,0.1);color: #333;padding: 8px 12px;border-radius: 5px;">VR看场</a></h3>
                <div class="weui-flex__item">面积: <strong id="area"></strong>m<sup>2</sup> <strong id="area_spesifc"></strong></div>
                <div class="weui-flex__item">限高: <strong id="height"></strong></div>
                <div class="weui-flex__item" id="desc"></div>
            </div>
        </li>
        <li class="wow fadeInUp" data-wow-delay="0.7s" data-wow-offset="300" style="background: url(/views/assets/base/img/content/backgrounds/shop/marble-bg.jpg); margin: -90px 0 0;">
            <div class="weui-flex js-category-2">
                <h3 class="weui-flex__item">档期及价格</h3>
                <hr width=70% color=#baad9b size=1 style="margin: 5px 0;">
                <div id="calendar"></div>
                <div class="weui-flex__item">
                    选择: <strong id="startDate">开始日期</strong> 到 <strong id="endDate">结束日期</strong>
                </div>
                <div class="weui-flex__item">总价: <strong>¥<span style="color: #b43018">??</span></strong></div>
            </div>
        </li>
        <li class="wow fadeInUp" data-wow-delay="0.9s" data-wow-offset="200" style="background: url(/views/assets/base/img/content/backgrounds/shop/granite-bg.jpg); margin: -300px 0 0;">
            <div class="weui-flex js-category-3">
                <h3 class="weui-flex__item">工程条件 
                    <a id="engineering" href="/upload/docs/<?= $id?>.pdf" download="/upload/docs/<?= $id?>.pdf" class="weui-badge" style="float: right;background: rgba(0,0,0,0.1);color: #333;padding: 8px 12px;border-radius: 5px; margin-right: 5px;">下载PDF</a>
                </h3>
                <hr color=#d2d2d0 size=1 style="margin: 5px 0;">
                <div class="weui-flex__item">用电量(包含接口类型): <strong id="electricity"></strong></div>
                <div class="weui-flex__item">电线拖线要求: <strong id="wire_towing"></strong></div>
                <div class="weui-flex__item">附近电梯门尺寸: <strong id="elevator_size"></strong></div>
                <div class="weui-flex__item">网络端口: <strong id="network_type"></strong></div>
            </div>
            <div class="page-category js-categoryInner">
                <div class="weui-cells page-category-content">
                    <p class="content" style="margin-top: 0; padding: 0 20px;">注:活动场地使用区域按斜线所示范围为限，活动场地内之装置或背板不得超过限高。</p>
                    <p class="content">
                        <img src="/upload/docs/converted-jpg/<?= $id?>.jpg" style="width: 100%;" />
                    </p>
                </div>
            </div>
        </li>
        <li class="wow fadeInUp" data-wow-delay="1.1s" data-wow-offset="100" style="background: url(/views/assets/base/img/content/backgrounds/shop/marble-bg.jpg); margin: -90px 0 0;">
            <div class="weui-flex js-category-4" style="padding-bottom: 0;">
                <h3 class="weui-flex__item">配套服务</h3>
                <hr color=#d2d2d0 size=1 style="margin: 5px 0;">
                <div class="weui-flex__item">安保服务: <strong id="security"></strong></div>
                <div class="weui-flex__item">废物处理: <strong id="garbage"></strong></div>
                <div class="weui-flex__item">管理服务: <strong id="management"></strong></div>
                <div class="weui-flex__item">设施使用: <strong id="infra"></strong></div>
                <div class="weui-flex__item">*明星或发售活动，我们提供增值服务，您可选择增加相应的安保人员，以保证您的活动顺利进行</div>
            </div>
        </li>
    </ul>
</div>

<div class="page__bd" style="position: fixed;left: 0;right: 0;bottom: 0;">
    <div class="weui-panel__bd" style="padding: 10px 20px; position: relative; background-color: #e5e5e5; border-radius: 10px; margin-top: -50px; box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.5);-webkit-box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.5);">
        <a id="favourite" href="javascript:;" style="display: inline-block; font-size: 12px; color: #000; padding: 5px 0; text-align: center; width: 60px;">
            <i class="fa fa-heart-o" aria-hidden="true"></i><br>
            收藏
        </a>
        <a id="choose_event" href="javascript:;" style="float: right; background: #e69c2e; border: solid 2px #eeb96b; border-radius: 50px; font-size: 12px; color: #fff; margin-top: 5px; padding: 5px 25px; text-align: center; width: 60px; box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.5);-webkit-box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.5);">接受报价</a>
    </div>
</div>

<div id="vr_viewer" class="weui-gallery" style="display: none;">
    <iframe src="#" width="100%" frameborder="0" style="height: 90vh;"></iframe>
    <div class="weui-gallery__opr">
        <a href="javascript:" class="weui-gallery__del">
            <i class="fa fa-times" aria-hidden="true" style="color: #fff;" onclick='$("#vr_viewer iframe").attr("src","#"); $("#vr_viewer").hide();'></i>
        </a>
    </div>
</div>

<div id="video_viewer" class="weui-gallery" style="display: none;">
    <iframe src="#" width="100%" frameborder="0" style="height: 90vh;"></iframe>
    <div class="weui-gallery__opr">
        <a href="javascript:" class="weui-gallery__del">
            <i class="fa fa-times" aria-hidden="true" style="color: #fff;" onclick='$("#video_viewer iframe").attr("src","#"); $("#video_viewer").hide();'></i>
        </a>
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