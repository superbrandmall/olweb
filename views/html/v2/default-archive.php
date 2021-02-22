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
    
    .skip {
        position: absolute; 
        top: 15px; 
        right: 15px; 
        border: solid 2px #fff; 
        padding: 5px 15px; 
        color: #fff;
    }
</style>

<div id="welcome" style="position: relative; height: 110vh;">
    <video id="welcome_video" autoplay muted playsinline preload="preload" style="width: auto; height: 100%">
        <source src="/upload/video/judy.mp4" type="video/mp4">
    </video>
    <a class="skip" href="javascript:;">x 跳过</a>
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