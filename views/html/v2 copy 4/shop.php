<?php
if(explode('?id=', $_SERVER['REQUEST_URI'])[1] != null) {
    $id = explode('?id=', $_SERVER['REQUEST_URI'])[1];
    if (strpos($id, '&type=') !== false) {
        $id = explode('&type=', $id)[0];
    }
}

$scripts = $scripts . '<script type="text/javascript" src="/views/assets/plugins/jquery.imagemapster.js"></script>'
        . '<script type="text/javascript" src="/views/assets/base/js/v2/shop-admin.js"></script>';
?>

<style type="text/css">
    #mapster_wrap_0 {
        margin: 0 auto;
    }  
</style>

<div style="position: relative;">
    <iframe id="vr" src="#" width="100%" height="300px" frameborder="0"></iframe>
</div>

<div class="page__bd" style="position: relative; margin-top: -50px;">
    <ul class="collapse shop-collapse">
        <li class="wow fadeInUp" data-wow-delay="0.5s" data-wow-offset="300" style="background: url(/views/assets/base/img/content/backgrounds/shop/granite-bg.jpg);">
            <div class="weui-flex js-category-1">
                <h3 class="weui-flex__item"><span id="shopName"></span></h3>
                <div class="weui-flex__item" style="margin: 10px 0;">
                    <a id="price_1" href="javascript:;" style="background: #e69c2e; border: solid 2px #eeb96b; border-radius: 50px; font-size: 12px; color: #fff; padding: 5px 25px; text-align: center; width: 60px; box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.5);-webkit-box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.5);">查看报价</a>
                </div>
                <div class="weui-flex__item">面积 <span id="area">8</span>m<sup>2</sup>(使用面积)</div>
                <div class="weui-flex__item">推荐业态 <span id="businessFormatChs"></span></div>
            </div>
        </li>
        <li class="wow fadeInUp" data-wow-delay="0.7s" data-wow-offset="200" style="background: url(/views/assets/base/img/content/backgrounds/shop/marble-bg.jpg);">
            <div class="weui-flex js-category-2">
                <h3 class="weui-flex__item">租约信息<a id="floor_plan" href="javascript:;" class="weui-badge" style="float: right;background: rgba(0,0,0,0.1);color: #333;padding: 8px 12px;border-radius: 5px;">查看落位图</a></h3>
                <hr width=70% color=#baad9b size=1 style="margin: 5px 0;">
                <div class="weui-flex__item"><small>进场日期</small><br><h4 id="settleDate"></h4></div>
                <div class="weui-flex__item"><small>开业日期</small><br><h4 id="openDate"></h4></div>
            </div>
            <div class="page-category js-categoryInner">
                <div class="weui-cells page-category-content">
                    <h4 class="content">铺位简介</h4>
                    <p class="content" id="desc"></p>
                </div>
            </div>
        </li>
        <li class="wow fadeInUp" data-wow-delay="0.9s" data-wow-offset="100" style="background: url(/views/assets/base/img/content/backgrounds/shop/granite-bg.jpg);">
            <div class="weui-flex js-category-3" style="padding-bottom: 0;">
                <h3 class="weui-flex__item">工程图纸 
                    <a id="cad" href="/upload/docs/cad/<?= $id?>.dwg" download="/upload/docs/cad/<?= $id?>.dwg" class="weui-badge" style="float: right;background: rgba(0,0,0,0.1);color: #333;padding: 8px 12px;border-radius: 5px;">下载CAD</a>
                    <a id="engineering" href="/upload/docs/layout/<?= $id?>.pdf" download="/upload/docs/layout/<?= $id?>.pdf" class="weui-badge" style="float: right;background: rgba(0,0,0,0.1);color: #333;padding: 8px 12px;border-radius: 5px; margin-right: 5px;">下载PDF</a>
                    <a id="engineering_qa" href="/upload/docs/qa/<?= $id?>.pdf" download="/upload/docs/qa/<?= $id?>.pdf" class="weui-badge" style="float: right;background: rgba(0,0,0,0.1);color: #333;padding: 8px 12px;border-radius: 5px; margin-right: 5px;">下载工程条件</a>
                </h3>
                <hr color=#d2d2d0 size=1 style="margin: 5px 0;">
                <div class="weui-flex__item">
                    <img src="/upload/docs/converted-jpg/<?= $id?>.jpg" style="width: 100%;" />
                </div>
            </div>
            <div class="page-category js-categoryInner">
                <div class="weui-cells page-category-content">
                    <p class="content" style="margin-top: 0;">
                        <img src="/upload/docs/converted-jpg/<?= $id?>-1.jpg" style="width: 100%;" />
                    </p>
                </div>
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
        <a id="price_2" href="javascript:;" style="float: right; background: #e69c2e; border: solid 2px #eeb96b; border-radius: 50px; font-size: 12px; color: #fff; margin-top: 5px; padding: 5px 25px; text-align: center; width: 60px; box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.5);-webkit-box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.5);">查看报价</a>
    </div>
</div>

<div class="js_dialog" id="floor_plan_viewer" style="display: none;">
    <div class="weui-mask"></div>
    <div class="weui-dialog">
        <div class="weui-dialog__bd" style="padding: 0; margin: 0;">
            <div style="background-color: #c34343; width: 80px; height: 25px; color: #eee; margin: 10px auto;">本店铺</div>
            <img src="#" width="300" height="150" id="map">
        </div>
        <div class="weui-dialog__ft" style="line-height: 28px; min-height: 28px;">
            <a href="javascript:" class="weui-dialog__btn weui-dialog__btn_primary">x</a>
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