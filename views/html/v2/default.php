<?php
$scripts = $scripts . '<script type="text/javascript" src="/views/assets/base/js/v2/default-admin.js"></script>'
        . '<script type="text/javascript" src="/views/assets/plugins/folding/modernizr.custom.js"></script>';
?>

<link href="/views/assets/plugins/folding/style.css" rel="stylesheet" type="text/css"/>
<style>
.square {
    display: inline-block;
    width:100px;
    height:100px;
    border:7px solid #D8BD8F;
    overflow: hidden;
    animation: rotate 2s linear infinite;
}

.circle {
    display: inline-block;
    width:93px;
    height:93px;
    border-radius: 50%;
    border:7px solid #D8BD8F;
}

@keyframes rotate{from{transform: rotate(0deg)}
    to{transform: rotate(360deg)}
}
</style>

<div id="welcome" style="position: relative; height: 100vh; text-align: center;">
    <div style="position: absolute; top: 150px; left: 0; right: 0;">
        <div class="square"><div class="circle"></div></div>
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
                <img src='/views/assets/base/img/content/backgrounds/story-01.jpg' alt="">
            </a>
        </li>
        <li>
            <a href="javascript:;">
                <img src='/views/assets/base/img/content/backgrounds/story-02.jpg' alt="">
            </a>
        </li>
        <li>
            <a href="javascript:;">
                <img src='/views/assets/base/img/content/backgrounds/story-03.jpg' alt="">
            </a>
        </li>
        <li>
            <a href="javascript:;">
                <img src='/views/assets/base/img/content/backgrounds/story-04.jpg' alt="">
            </a>
        </li>
        <li>
            <a href="javascript:;">
                <img src='/views/assets/base/img/content/backgrounds/story-05.jpg' alt="">
            </a>
        </li>
        <li>
            <a href="javascript:;">
                <img src='/views/assets/base/img/content/backgrounds/story-06.jpg' alt="">
            </a>
        </li>
        <li>
            <a href="javascript:;">
                <img src='/views/assets/base/img/content/backgrounds/story-07.jpg' alt="">
            </a>
        </li>
        <li>
            <a href="javascript:;">
                <img src='/views/assets/base/img/content/backgrounds/story-08.jpg' alt="">
            </a>
        </li>
    </ul>
    <div class="dot">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
    </div>
</div>

<div class="slide" id="slide1">
    <ul class="main">
        <li class="view" onclick="window.location='/v2/ljz'">
            <img src='/views/assets/base/img/content/backgrounds/v2-banner-1.jpg' alt="">
        </li>
        <li class="view">
            <img src='/views/assets/base/img/content/backgrounds/v2-banner-2.jpg' alt="">
        </li>
        <li class="view">
            <img src='/views/assets/base/img/content/backgrounds/v2-banner-3.jpg' alt="">
        </li>
    </ul>
</div>
    
<br><br>
<?php include ('menu_bottom.php'); ?>

<?php include ('footer.php'); ?>