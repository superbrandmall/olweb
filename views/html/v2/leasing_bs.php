<?php
$scripts = $scripts . '<script type="text/javascript" src="/views/assets/base/js/v2/leasing-bs-admin.js"></script>'
        . '<script src="/views/assets/plugins/pdfjs/build/pdf.worker.js" type="text/javascript"></script>';
?>

<?php include ('navbar_top.php'); ?>

<div class="weui-toptips bg-success topTips"><i class="fa fa-smile-o" aria-hidden="true"></i> 我们为您推荐以下铺位，您可以逛逛不同楼层，看看全景VR, 比比工程条件。如果满意就请点击"申请报价"吧！</div>

<div class="page__hd" style="display: inline-block; width: 100%; background-color: #bba585; margin-top: -7px;">
    <div class="weui-cell weui-cell_select" style="float: left; width: 60%;">
        <div class="weui-cell__bd">
            <a href="javascript:" class="weui-select" id="showFloorPicker" style="color: #514026; font-size: 12px; overflow: hidden; vertical-align: bottom; white-space: nowrap; text-overflow: ellipsis;">请选择区域</a>
        </div>
    </div>

    <div class="weui-cell weui-cell_select" style="float: left; width: 40%;">
        <div class="weui-cell__bd">
            <a href="javascript:" class="weui-select" id="showSizePicker" style="color: #514026; font-size: 12px; overflow: hidden; vertical-align: bottom; white-space: nowrap; text-overflow: ellipsis;">请选择面积</a>
        </div>
    </div>
</div>
<div class="page__bd" style="margin: 0 16px 16px;">
    <div class="weui-article" style="position: relative; padding: 0;">
        <img src="#" usemap="" id="map" />
        <map name="" id=""></map>
    </div>
</div>
<div class="page__bd">    
    <div class="weui-panel weui-panel_access" style="background-color: #292929;">
        <div class="weui-panel__hd" style="color: #c9b18d;"><span id="floorNo"></span> <span style="border: solid 1px #ccc; background-color: #ffff00; width: 13px; height: 8px; display: inline-block; margin-left: 5px;"></span> 推荐位置 <small>(可点击上图黄色位置查看铺位详细信息)</small></div>
        <div class="weui-panel__bd" style="max-height: 300px; overflow: auto;"></div>
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
    <iframe id="pdfContainer" src="/views/assets/plugins/pdfjs/web/viewer.html?file=/views/html/v2/GF01A.pdf" width="100%" frameborder="0" style="height: 90vh;"></iframe>
    <div class="weui-gallery__opr">
        <a href="javascript:" class="weui-gallery__del">
            <i class="fa fa-times" aria-hidden="true" style="color: #fff;" onclick='$("#engineering_pdf").hide();'></i>
        </a>
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

<?php include ('menu_bottom.php'); ?>

<?php include ('footer.php'); ?>