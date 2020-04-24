<?php
if (explode('?f=', $_SERVER['REQUEST_URI'])[1] != null) {
    $floor = explode('?f=', $_SERVER['REQUEST_URI'])[1];
} else {
    $floor = '';
}

$scripts = $scripts . '<script type="text/javascript" src="/views/assets/plugins/weui/js/sidebar.js"></script>'
        . '<script type="text/javascript" src="/views/assets/base/js/v2/advertising-admin.js"></script>';
?>

<style>
    [sidebarjs-container] {
        width: auto;
    }
</style>

<?php include ('navbar_top.php'); ?>

<div class="page__hd" style="display: inline-block;">
    <div class="weui-cells__title" style="display: inline-block;" navbar-toggle><i class="fa fa-retweet" aria-hidden="true"></i> 切换楼层</div>
    <div class="weui-cells__title" style="display: inline-block;"><span style="border: solid 1px #ccc; background-color: #ffff00; width: 13px; height: 8px; display: inline-block;"></span> 推荐位置</div>
</div>
<div class="page__bd" style="margin: 0 16px 16px;">
    <div class="weui-article" style="position: relative; padding: 0;">
        <img src="#" usemap="" id="map" />
        <map name="" id=""></map>
    </div>
</div>
<div class="page__bd"> 
    <div class="weui-panel weui-panel_access">
        <div class="weui-panel__hd">
            <span id="floorNo"></span>
            <div class="weui-cell__ft" style="float: right;"><a href="advertising-shopping-cart" class="weui-link"><i class="fa fa-shopping-cart" aria-hidden="true"></i> 查看购物车</a></div>
        </div>
        <div class="weui-panel__bd" style="max-height: 300px; overflow: auto;"></div>
    </div>
</div>
<div class="weui-navs" navbar>
    <ul>
        <li class="nav-item">
            <a id="f8_g" href="/v2/advertising?f=8">8F</a>
            <div class="weui-form__control-area">
              <div class="weui-cells__group weui-cells__group_form">
                  <div class="weui-cells weui-cells_checkbox">
                      <?php include ('ads-types/8.html'); ?>
                  </div>
              </div>
            </div>
        </li>
        <li class="nav-item">
            <a id="f5_g" href="/v2/advertising?f=5">5F</a>
            <div class="weui-form__control-area">
              <div class="weui-cells__group weui-cells__group_form">
                  <div class="weui-cells weui-cells_checkbox">
                      <?php include ('ads-types/5.html'); ?>
                  </div>
              </div>
            </div>
        </li>
        <li class="nav-item">
            <a id="f3_g" href="/v2/advertising?f=3">3F</a>
            <div class="weui-form__control-area">
              <div class="weui-cells__group weui-cells__group_form">
                  <div class="weui-cells weui-cells_checkbox">
                      <?php include ('ads-types/3.html'); ?>
                  </div>
              </div>
            </div>
        </li>
        <li class="nav-item">
            <a id="f1_g" href="/v2/advertising?f=1">1F</a>
            <div class="weui-form__control-area">
              <div class="weui-cells__group weui-cells__group_form">
                  <div class="weui-cells weui-cells_checkbox">
                      <?php include ('ads-types/1.html'); ?>
                  </div>
              </div>
            </div>
        </li>
    </ul>
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
