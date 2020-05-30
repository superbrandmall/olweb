<?php
if (explode('?f=', $_SERVER['REQUEST_URI'])[1] != null) {
    $floor = explode('?f=', $_SERVER['REQUEST_URI'])[1];
} else {
    $floor = '';
}

$scripts = $scripts . '<script type="text/javascript" src="/views/assets/base/js/v2/advertising-admin.js"></script>';
?>

<?php include ('navbar_top.php'); ?>

<div class="weui-toptips bg-success topTips"><i class="fa fa-smile-o" aria-hidden="true"></i> 我们挑选了以下广告位推荐给您，您可以看看全景VR，或者"广告位详情"，如果没问题就直接"加入购物车"吧！</div>

<div class="page__hd" style="display: inline-block; width: 100%; background-color: #bba585; margin-top: -7px;">
    <div class="weui-cell weui-cell_select">
        <div class="weui-cell__bd">
            <a href="javascript:" class="weui-select" id="showFloorPicker" style="display: block; color: #514026; font-size: 12px; overflow: hidden; vertical-align: bottom; white-space: nowrap; text-overflow: ellipsis;">请选择楼层</a>
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

<div id="vr_viewer" class="weui-gallery" style="display: none;">
    <iframe src="#" width="100%" frameborder="0" style="height: 90vh;"></iframe>
    <div class="weui-gallery__opr">
        <a href="javascript:" class="weui-gallery__del">
            <i class="fa fa-times" aria-hidden="true" style="color: #fff;" onclick='$("#vr_viewer").hide();'></i>
        </a>
    </div>
</div>

<a href="advertising-shopping-cart" class="weui-btn weui-btn_primary" style="position: fixed; right: 0; top: 40%; background-color: #c9b18d; color: #514026; border-radius: 50%; padding: 10px; height: 80px; width: 80px; font-weight: 300; font-size: 16px; z-index: 5;">
    <i class="fa fa-shopping-cart" aria-hidden="true" style="font-size: 32px;"></i><br>购物车
</a>

<div id="js_toast" style="display: none;">
    <div class="weui-mask_transparent"></div>
    <div class="weui-toast">
        <i class="weui-icon-success-no-circle weui-icon_toast"></i>
        <p class="weui-toast__content">
            添加成功，在购物车等您～
        </p>
    </div>
</div>

<br>
<br>
<br>
<br>

<?php include ('menu_bottom.php'); ?>

<?php include ('footer.php'); ?>
