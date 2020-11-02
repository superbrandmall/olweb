<?php
$scripts = $scripts . '<script type="text/javascript" src="/views/assets/base/js/v2/default-admin.js"></script>'
        . '<script type="text/javascript" src="/views/assets/plugins/folding/modernizr.custom.js"></script>';
?>

<link href="/views/assets/plugins/folding/style.css" rel="stylesheet" type="text/css"/>
<style>
    html {
        height: 100vh;
        overflow: hidden;
    }
    body {
        background-color: #838da9;
    }
    
    .ta_c {
        text-align: center;
        margin-top: 100px;
    }

    @-webkit-keyframes rotation {
        from {-webkit-transform: rotate(0deg);}
        to {-webkit-transform: rotate(360deg);}
    }

    .Rotation{
        -webkit-transform: rotate(360deg);
        animation: rotation 3s linear infinite;
        -moz-animation: rotation 3s linear infinite;
        -webkit-animation: rotation 3s linear infinite;
        -o-animation: rotation 3s linear infinite;
    }

</style>

<div id="welcome" style="position: relative; background-color: #fff; height: 100vh; text-align: center;">
    <div style="position: absolute; top: 150px; left: 0; right: 0;">
        <div class="ta_c">
            <img class="Rotation img" src="/views/assets/base/img/content/backgrounds/spin-logo.png" width="100" height="100"/>
        </div>
    </div>
    
    <div class="wow fadeInUp" data-wow-delay="0.2s" data-wow-offset="300" style="position: absolute; top: 400px; left: 0; right: 0;">
        <h3>正大商业地产</h3>
        <h3>在线招商平台</h3>
    </div>
</div>

<div class="slide" id="slide2">
    <ul>
        <li>
            <a href="javascript:;">
                <img src='/views/assets/base/img/content/backgrounds/banner-6.jpg' alt="">
            </a>
        </li>
        <li>
            <a href="javascript:;">
                <img src='/views/assets/base/img/content/backgrounds/banner-7.jpg' alt="">
            </a>
        </li>
        <li>
            <a href="javascript:;">
                <img src='/views/assets/base/img/content/backgrounds/banner-8.jpg' alt="">
            </a>
        </li>
    </ul>
    <div class="dot">
        <span></span>
        <span></span>
        <span></span>
    </div>
</div>

<div class="slide" id="slide1">
    <div style="position: absolute; left: 0; right: 0; text-align: center; top: 14px; color: #fff; font-weight: bold;">
        <div class="mall_names" style="display: none; line-height: 22px;">上海，陆家嘴<br>正大广场</div>
        <div class="mall_names" style="display: none; line-height: 22px;">河南，洛阳<br>正大广场</div>
        <div class="mall_names" style="display: none; line-height: 22px;">上海，徐汇<br>正大乐城</div>
        <div class="mall_names" style="display: none; line-height: 22px;">上海，宝山<br>正大乐城</div>
    </div>
    <img src='/views/assets/base/img/content/backgrounds/v2-banner-top.jpg' alt="" style="width: 100%; margin-bottom: -8px;">
    <ul class="main">
        <li class="view" onclick="window.location='/v2/ljz'">
            <img src='/views/assets/base/img/content/backgrounds/v2-banner-1.jpg' alt="">
        </li>
        <li class="view" onclick="window.location='/v2/ly'">
            <img src='/views/assets/base/img/content/backgrounds/v2-banner-2.jpg' alt="">
        </li>
        <li class="view" onclick="window.location='/v2/xh'">
            <img src='/views/assets/base/img/content/backgrounds/v2-banner-4.jpg' alt="">
        </li>
        <li class="view" onclick="window.location='/v2/bs'">
            <img src='/views/assets/base/img/content/backgrounds/v2-banner-3.jpg' alt="">
        </li>
    </ul>
    <div style="position: relative; margin-top: -50px;">
        <div class="mall_footers" style="display: none;"><img src='/views/assets/base/img/content/backgrounds/v2-banner-footer-1.png' alt="" style="width: 100%;"></div>
        <div class="mall_footers" style="display: none;"><img src='/views/assets/base/img/content/backgrounds/v2-banner-footer-2.png' alt="" style="width: 100%;"></div>
        <div class="mall_footers" style="display: none;"><img src='/views/assets/base/img/content/backgrounds/v2-banner-footer-4.png' alt="" style="width: 100%;"></div>
        <div class="mall_footers" style="display: none;"><img src='/views/assets/base/img/content/backgrounds/v2-banner-footer-3.png' alt="" style="width: 100%;"></div>
    </div>
</div>

<?php include ('footer.php'); ?>