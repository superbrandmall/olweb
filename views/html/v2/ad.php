<?php
$scripts = $scripts . '<script type="text/javascript" src="/views/assets/plugins/OwlCarousel2-2.3.4/dist/owl.carousel.min.js"></script>'
        . '<script type="text/javascript" src="/views/assets/base/js/v2/ad-admin.js"></script>';
?>

<link href="/views/assets/plugins/OwlCarousel2-2.3.4/dist/assets/owl.carousel.min.css" rel="stylesheet" type="text/css"/>
<link href="/views/assets/plugins/OwlCarousel2-2.3.4/dist/assets/owl.theme.default.min.css" rel="stylesheet" type="text/css"/>

<?php include ('navbar_top.php'); ?>
<div class="weui-toptips bg-success topTips"><i class="fa fa-smile-o" aria-hidden="true"></i> 在这里您可以查看广告位说明，不仅有图文介绍，还有全景VR可以看哦。对了，如果都满意的话就点击"加入购物车"吧！</div>

<div class="slide" id="slide1">
    <ul></ul>
    <div class="dot"></div>
</div>

<div class="page__bd" style="font-size: 15px;">
    <h4 class="page-header" style="margin: 16px;">广告位说明</h4>
    <div class="weui-cells" style="font-size: 15px;">
        <div class="weui-cell">
            <div class="weui-cell__bd">
                <p>名称</p>
            </div>
            <div class="weui-cell__ft" id="ad_name"></div>
        </div>
        <div class="weui-cell">
            <div class="weui-cell__bd">
                <p>类型</p>
            </div>
            <div class="weui-cell__ft" id="ad_type"></div>
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
    </div>
    <br>
    <center>
        <a href="/v2/advertising-shopping-cart" class="add_ad weui-btn weui-btn_primary">加入购物车</a>
    </center>
    <br>
    <h4 class="page-header" style="margin: 16px;">VR看广告位</h4>
    <div class="weui-article" style="position: relative; padding: 0;">
        <iframe id="vr" src="#" style="height: 40vh; width: 100%;" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
    </div>

    <h4 class="page-header" style="margin: 16px;">广告位落位图</h4>
    <div class="weui-article" style="position: relative; padding: 0;">
        <img src="#" id="map">
    </div>

    <center>
        <a href="/v2/advertising-shopping-cart" class="add_ad weui-btn weui-btn_primary">加入购物车</a>
    </center>
</div>
<br>
<?php include ('ad-block.php'); ?>
<br>
<br>
<br>

<?php include ('menu_bottom.php'); ?>
<?php include ('footer.php'); ?>