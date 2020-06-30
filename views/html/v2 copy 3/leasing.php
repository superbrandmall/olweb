<?php
$scripts = $scripts . '<script type="text/javascript" src="/views/assets/base/js/v2/leasing-admin.js"></script>'
        . '<script src="/views/assets/plugins/pdfjs/build/pdf.worker.js" type="text/javascript"></script>';
?>

<?php include ('navbar_top.php'); ?>

<div class="weui-toptips bg-success topTips"><i class="fa fa-smile-o" aria-hidden="true"></i> 我们为您推荐以下铺位，您可以逛逛不同楼层，看看全景VR, 比比工程条件。如果满意就请点击"申请报价"吧！</div>

<div class="page__hd" style="display: inline-block; width: 100%; margin-top: -20px;">
    <div class="weui-cell weui-cell_select" style="float: left; width: 60%;">
        <div class="weui-cell__bd">
            <a href="javascript:" class="weui-select" id="showFloorPicker" style="color: #000; font-size: 12px; overflow: hidden; vertical-align: bottom; white-space: nowrap; text-overflow: ellipsis;">请选择区域</a>
        </div>
    </div>

    <div class="weui-cell weui-cell_select" style="float: left; width: 40%;">
        <div class="weui-cell__bd">
            <a href="javascript:" class="weui-select" id="showSizePicker" style="color: #000; font-size: 12px; overflow: hidden; vertical-align: bottom; white-space: nowrap; text-overflow: ellipsis;">请选择面积</a>
        </div>
    </div>
</div>
<div class="page__bd" style="margin: -25px 16px 16px;">
    <div class="weui-article" style="position: relative; padding: 0;">
        <img src="#" usemap="" id="map" />
        <map name="" id=""></map>
    </div>
</div>
<div class="page__bd" style="margin-top: -20px;">    
    <div class="weui-panel weui-panel_access" style="background-color: #F5F5F5;">
        <div class="weui-panel__bd" style="max-height: 350px; overflow: auto;"></div>
    </div>
</div>

<div id="gallery" class="weui-gallery" style="display: none;">
    <div class="weui-gallery__opr">
        <a href="javascript:" class="weui-gallery__del">
            <i class="fa fa-times" aria-hidden="true" style="color: #fff;" onclick='$("#gallery").hide();'></i>
        </a>
    </div>
</div>

<div id="engineering_pdf" class="weui-gallery" style="display: none;">
    <iframe id="engineeringContainer" src="#" width="100%" frameborder="0" style="height: 90vh;"></iframe>
    <div class="weui-gallery__opr">
        <a href="javascript:" class="weui-gallery__del">
            <i class="fa fa-times" aria-hidden="true" style="color: #fff;" onclick='$("#engineering_pdf").hide();'></i>
        </a>
    </div>
</div>

<div id="vr_viewer" class="weui-gallery" style="display: none;">
    <iframe src="#" width="100%" frameborder="0" style="height: 90vh;"></iframe>
    <div class="weui-gallery__opr">
        <a href="javascript:" class="weui-gallery__del">
            <i class="fa fa-times" aria-hidden="true" style="color: #fff;" onclick='$("#vr_viewer").hide();'></i>
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

<?php include ('menu_bottom.php'); ?>

<?php include ('footer.php'); ?>