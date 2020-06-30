<?php
$scripts = $scripts . '<script type="text/javascript" src="/views/assets/plugins/OwlCarousel2-2.3.4/dist/owl.carousel.min.js"></script>'
        . '<script type="text/javascript" src="/views/assets/base/js/v2/ad-admin.js"></script>';
?>

<link href="/views/assets/plugins/OwlCarousel2-2.3.4/dist/assets/owl.carousel.min.css" rel="stylesheet" type="text/css"/>
<link href="/views/assets/plugins/OwlCarousel2-2.3.4/dist/assets/owl.theme.default.min.css" rel="stylesheet" type="text/css"/>

<?php include ('navbar_top.php'); ?>
<div class="weui-toptips bg-success topTips"><i class="fa fa-smile-o" aria-hidden="true"></i> 在这里您可以查看广告位说明，不仅有图文介绍，还有全景VR可以看哦。对了，如果都满意的话就点击"加入购物车"吧！</div>

<h4 class="page-header" style="margin: 9px 16px 8px; color: #bba585; font-weight: 500;">广告位说明</h4>

<div class="slide" id="slide1">
    <ul></ul>
    <div class="dot"></div>
</div>

<div class="page__bd" style="font-size: 15px; margin-top: -8px;">
    <div class="weui-cells" style="font-size: 15px; color: #bba585; background-color: #3f3f3f;">
        <div class="weui-cell">
            <div class="weui-cell__bd">
                <p>名称</p>
            </div>
            <div class="weui-cell__ft" id="ad_name" style="color: #bba585;"></div>
        </div>
        <div class="weui-cell">
            <div class="weui-cell__bd">
                <p>楼层</p>
            </div>
            <div class="weui-cell__ft" id="ad_floor" style="color: #bba585;"></div>
        </div>
        <div class="weui-cell">
            <div class="weui-cell__bd">
                <p>类型</p>
            </div>
            <div class="weui-cell__ft" id="ad_type" style="color: #bba585;"></div>
        </div>
        <div class="weui-cell">
            <div class="weui-cell__bd">
                <p>价格</p>
            </div>
            <div class="weui-cell__ft" style="color: #bba585;"><span id="ad_price"></span><small id="ad_frequency"></small></div>
        </div>
        <div class="weui-cell">
            <div class="weui-cell__bd">
                <p>尺寸<sup>3</sup>(mm)</p>
            </div>
            <div class="weui-cell__ft" id="ad_size" style="color: #bba585;"></div>
        </div>
        <div class="weui-cell">
            <div class="weui-cell__bd">
                <p>材质</p>
            </div>
            <div class="weui-cell__ft" id="ad_material" style="color: #bba585;"></div>
        </div>
        <div class="weui-cell">
            <div class="weui-cell__bd">
                <p id="ad_desc"></p>
            </div>
        </div>
    </div>
    
    <h4 class="page-header" style="margin: 9px 16px 8px; color: #bba585; font-weight: 500;">VR看广告位</h4>
    <div class="weui-article" style="position: relative; padding: 0;">
        <iframe id="vr" src="#" style="height: 40vh; width: 100%;" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
    </div>
    
    <h4 class="page-header" style="margin: 9px 16px 8px; color: #bba585; font-weight: 500;">广告位落位图</h4>
    <div class="weui-article" style="position: relative; padding: 0;">
        <img src="#" id="map">
    </div>
    
    <h4 class="page-header" style="margin: 16px 16px 8px; color: #bba585; font-weight: 500;">其他广告位推荐</h4>
    <div style="text-align: center; margin: 10px 0 0;">
        <a href="/v2/ad?id=OLSHOP200323000017" style="display: inline-block; margin: 2px; background-color: #c9b18d; color: #514026; border-radius: 10px; padding: 8px 0; text-align: center; width: 150px; font-size: 11px;">墙面广告 户外 东南口转角</a>
        <a href="/v2/ad?id=OLSHOP200323000018" style="display: inline-block; margin: 2px; background-color: #c9b18d; color: #514026; border-radius: 10px; padding: 8px 0; text-align: center; width: 150px; font-size: 11px;">墙面广告 户外 东南口</a>
        <a href="/v2/ad?id=OLSHOP200323000019" style="display: inline-block; margin: 2px; background-color: #c9b18d; color: #514026; border-radius: 10px; padding: 8px 0; text-align: center; width: 150px; font-size: 11px;">墙面广告 户外 东北口</a>
        <a href="/v2/ad?id=OLSHOP200420000001" style="display: inline-block; margin: 2px; background-color: #c9b18d; color: #514026; border-radius: 10px; padding: 8px 0; text-align: center; width: 150px; font-size: 11px;">黄金大道悬挂分屏LED</a>
        <a href="/v2/ad?id=OLSHOP200323000002" style="display: inline-block; margin: 2px; background-color: #c9b18d; color: #514026; border-radius: 10px; padding: 8px 0; text-align: center; width: 150px; font-size: 11px;">3F入口全包LED环绕屏</a>
        <a href="/v2/ad?id=OLSHOP200323000038" style="display: inline-block; margin: 2px; background-color: #c9b18d; color: #514026; border-radius: 10px; padding: 8px 0; text-align: center; width: 150px; font-size: 11px;">8F东区悬挂式LED</a>
    </div>
    
    <a id="add_ad" href="javascript:;" class="weui-btn weui-btn_primary" style="position: fixed; right: 0; top: 40%; background-color: #c9b18d; color: #514026; border-radius: 50%; padding: 14px; height: 80px; width: 80px; font-weight: 300; font-size: 16px; z-index: 5;">
        加入<br>购物车
    </a>
</div>
<br>
<br>
<br>

<?php include ('menu_bottom.php'); ?>
<?php include ('footer.php'); ?>