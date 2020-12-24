<?php
if (explode('?f=', $_SERVER['REQUEST_URI'])[1] != null) {
    $floor = explode('?f=', $_SERVER['REQUEST_URI'])[1];
} else {
    $floor = '';
}

$scripts = $scripts . '<script type="text/javascript" src="/views/assets/base/js/v2/advertising-admin.js"></script>';
?>

<div class="page__hd" style="width: 100%; margin-top: 20px;">
    <div class="weui-cell weui-cell_select">
        <div class="weui-cell__bd">
            <a href="javascript:;" class="weui-select" id="showFloorPicker" style="font-size: 12px;">请选择楼层</a>
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

<div id="vr_viewer" class="weui-gallery" style="display: none;">
    <iframe src="javascript:;" width="100%" frameborder="0" style="height: 90vh;"></iframe>
    <div class="weui-gallery__opr">
        <a href="javascript:" class="weui-gallery__del">
            <i class="fa fa-times" aria-hidden="true" style="color: #fff;" onclick='$("#vr_viewer iframe").attr("src","javascript:;");  $("#vr_viewer").hide();'></i>
        </a>
    </div>
</div>

<a href="advertising-shopping-cart" class="weui-btn weui-btn_primary" style="position: fixed; right: 0; top: 40%; border-radius: 50%; padding: 10px; height: 80px; width: 80px; font-weight: 300; font-size: 16px; z-index: 5;">
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
<br>

<?php include ('menu_bottom.php'); ?>

<?php include ('footer.php'); ?>
