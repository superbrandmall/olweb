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
    
    /**.ta_c {
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
    }*/
    
    .skip {
        position: absolute; 
        top: 15px; 
        right: 15px; 
        border: solid 2px #fff; 
        padding: 5px 15px; 
        color: #fff;
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

<div id="welcome" style="position: relative; height: 110vh;">
    <video id="welcome_video" autoplay muted playsinline preload="preload" style="width: auto; height: 100%">
        <source src="/upload/video/judy.mp4" type="video/mp4">
    </video>
    <img src='/views/assets/base/img/content/backgrounds/judyhao.png' width="50px;" alt="" style="position: absolute; top: 15px; left: 15px;">
    <a class="skip" href="javascript:;">x 跳过</a>
</div>

<div id="slide2">
    <img src='/views/assets/base/img/content/backgrounds/judyhao.png' alt="" style="margin: 20px 0;">
</div>

<div class="slide" id="slide1">
    <div style="background: #0C31FA; text-align: center; font-size: 22px; font-weight: bold; color: #fff; line-height: 40px;">
        <div class="mall_names" style="display: none; position: relative;">上海陆家嘴正大广场 <img src='/views/assets/base/img/content/backgrounds/arrow-right-w.png' alt="" height="54" style="position: absolute; right: 10px; top: -2px;"></div>
        <div class="mall_names" style="display: none; position: relative;">河南洛阳正大广场 <img src='/views/assets/base/img/content/backgrounds/arrow-right-w.png' alt="" height="54" style="position: absolute; right: 10px; top: -2px;"></div>
        <div class="mall_names" style="display: none; position: relative;">上海徐汇正大乐城 <img src='/views/assets/base/img/content/backgrounds/arrow-right-w.png' alt="" height="54" style="position: absolute; right: 10px; top: -2px;"></div>
        <div class="mall_names" style="display: none; position: relative;">上海宝山正大乐城 <img src='/views/assets/base/img/content/backgrounds/arrow-right-w.png' alt="" height="54" style="position: absolute; right: 10px; top: -2px;"></div>
    </div>
    <div style="background: #0C31FA; height: 15px;"></div>
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
    <div style="position: relative; margin-top: -30px;">
        <div class="mall_footers" style="display: none;"><img src='/views/assets/base/img/content/backgrounds/v2-banner-footer-1.png' alt="" style="width: 100%;"></div>
        <div class="mall_footers" style="display: none;"><img src='/views/assets/base/img/content/backgrounds/v2-banner-footer-2.png' alt="" style="width: 100%;"></div>
        <div class="mall_footers" style="display: none;"><img src='/views/assets/base/img/content/backgrounds/v2-banner-footer-4.png' alt="" style="width: 100%;"></div>
        <div class="mall_footers" style="display: none;"><img src='/views/assets/base/img/content/backgrounds/v2-banner-footer-3.png' alt="" style="width: 100%;"></div>
    </div>
</div>

<?php include ('footer.php'); ?>