<?php
$scripts = $scripts . '<script type="text/javascript" src="/views/assets/base/js/v2/floor-plan-admin.js"></script>'
        . '<script src="/views/assets/plugins/pdfjs/build/pdf.worker.js" type="text/javascript"></script>';
?>

<?php include ('navbar_top.php'); ?>

<div class="weui-toptips bg-success topTips"><i class="fa fa-smile-o" aria-hidden="true"></i> 我们为您推荐以下铺位，您可以逛逛不同楼层，看看全景VR, 比比工程条件。如果满意就请点击"申请报价"吧！</div>

<div class="page__hd" style="display: inline-block; width: 100%;">
    <div class="weui-cell weui-cell_select" style="float: left; width: 33%;">
        <div class="weui-cell__bd">
            <a href="javascript:" class="weui-select" id="showFloorPicker" style="font-size: 12px; width: 60%; display: inline-block; overflow: hidden; vertical-align: bottom; white-space: nowrap; text-overflow: ellipsis;">请选择楼层</a>
        </div>
    </div>
    
    <div class="weui-cell weui-cell_select" style="float: left; width: 33%;">
        <div class="weui-cell__bd">
            <a href="javascript:" class="weui-select" id="showCategoryPicker" style="font-size: 12px; width: 60%; display: inline-block; overflow: hidden; vertical-align: bottom; white-space: nowrap; text-overflow: ellipsis;">请选择业态</a>
        </div>
    </div>

    <div class="weui-cell weui-cell_select" style="float: left; width: 33%;">
        <div class="weui-cell__bd">
            <a href="javascript:" class="weui-select" id="showSizePicker" style="font-size: 12px; width: 60%; display: inline-block; overflow: hidden; vertical-align: bottom; white-space: nowrap; text-overflow: ellipsis;">请选择面积</a>
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
    <div class="weui-panel weui-panel_access">
        <div class="weui-panel__hd"><span id="floorNo"></span> <span style="border: solid 1px #ccc; background-color: #ffff00; width: 13px; height: 8px; display: inline-block; margin-left: 10px;"></span> 推荐位置</div>
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
    <iframe src="/upload/vr/100001/floors/8-mid-0421/tour.html" width="100%" frameborder="0" style="height: 90vh;"></iframe>
    <div class="weui-gallery__opr">
        <a href="javascript:" class="weui-gallery__del">
            <i class="fa fa-times" aria-hidden="true" style="color: #fff;" onclick='$("#vr_viewer").hide();'></i>
        </a>
    </div>
</div>

<br>
<br>
<br>
<br>

<?php include ('menu_bottom.php'); ?>

<?php include ('footer.php'); ?>