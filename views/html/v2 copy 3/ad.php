<?php
$scripts = $scripts . '<script type="text/javascript" src="/views/assets/plugins/OwlCarousel2-2.3.4/dist/owl.carousel.min.js"></script>'
        . '<script type="text/javascript" src="/views/assets/base/js/v2/ad-admin.js"></script>';
?>

<link href="/views/assets/plugins/OwlCarousel2-2.3.4/dist/assets/owl.carousel.min.css" rel="stylesheet" type="text/css"/>
<link href="/views/assets/plugins/OwlCarousel2-2.3.4/dist/assets/owl.theme.default.min.css" rel="stylesheet" type="text/css"/>

<div class="slide" id="slide1">
    <ul></ul>
    <div class="dot"></div>
</div>

<div class="page__bd">
    <div class="weui-cells" style="margin-top: 0;">
        <div class="weui-cell">
            <div class="weui-cell__bd">
                <p>名称</p>
            </div>
            <div class="weui-cell__ft" id="ad_name"></div>
        </div>
        <div class="weui-cell">
            <div class="weui-cell__bd">
                <p>楼层</p>
            </div>
            <div class="weui-cell__ft" id="ad_floor"></div>
        </div>
        <div class="weui-cell">
            <div class="weui-cell__bd">
                <p>类型</p>
            </div>
            <div class="weui-cell__ft" id="ad_type"></div>
        </div>
        <div class="weui-cell">
            <div class="weui-cell__bd">
                <p>价格</p>
            </div>
            <div class="weui-cell__ft"><span id="ad_price"></span><small id="ad_frequency"></small></div>
        </div>
        <div class="weui-cell">
            <div class="weui-cell__bd">
                <p>尺寸<sup>3</sup>(mm)</p>
            </div>
            <div class="weui-cell__ft" id="ad_size"></div>
        </div>
        <div class="weui-cell">
            <div class="weui-cell__bd">
                <p>材质</p>
            </div>
            <div class="weui-cell__ft" id="ad_material"></div>
        </div>
        <div class="weui-cell">
            <div class="weui-cell__bd">
                <p id="ad_desc"></p>
            </div>
        </div>
    </div>
    
    <h4 class="page-header" style="margin: 9px 16px 8px; font-weight: 500;">VR看广告位</h4>
    <div class="weui-article" style="position: relative; padding: 0;">
        <iframe id="vr" src="#" style="height: 40vh; width: 100%;" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
    </div>
    
    <h4 class="page-header" style="margin: 9px 16px 8px; font-weight: 500;">广告位落位图</h4>
    <div class="weui-article" style="position: relative; padding: 0;">
        <img src="#" id="map">
    </div>
    
    <h4 class="page-header" style="margin: 16px 16px 8px; font-weight: 500;">其他广告位推荐</h4>
    <div style="text-align: center; margin: 10px 0 0;">
        <a class="weui-btn weui-btn_default" href="/v2/ad?id=OLSHOP200420000001" style="display: inline-block; margin: 2px; padding: 8px 0; text-align: center; width: 300px; font-size: 11px;">黄金大道悬挂分屏LED</a>
        <a class="weui-btn weui-btn_default" href="/v2/ad?id=OLSHOP200323000002" style="display: inline-block; margin: 2px; padding: 8px 0; text-align: center; width: 150px; font-size: 11px;">3F入口全包LED环绕屏</a>
        <a class="weui-btn weui-btn_default" href="/v2/ad?id=OLSHOP200802000001" style="display: inline-block; margin: 2px; padding: 8px 0; text-align: center; width: 150px; font-size: 11px;">东中庭大屏LED</a>
    </div>
    
    <a id="add_ad" href="javascript:;" class="weui-btn weui-btn_primary" style="position: fixed; right: 0; top: 40%; border-radius: 50%; padding: 14px; height: 80px; width: 80px; font-weight: 300; font-size: 16px; z-index: 5;">
        加入<br>购物车
    </a>
</div>
<br>
<br>
<br>

<?php include ('menu_bottom.php'); ?>
<?php include ('footer.php'); ?>