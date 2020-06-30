<?php
$scripts = $scripts . '<script type="text/javascript" src="/views/assets/plugins/OwlCarousel2-2.3.4/dist/owl.carousel.min.js"></script>'
        . '<script type="text/javascript" src="/views/assets/base/js/v2/bs-admin.js"></script>';
?>

<link href="/views/assets/plugins/OwlCarousel2-2.3.4/dist/assets/owl.carousel.min.css" rel="stylesheet" type="text/css"/>
<link href="/views/assets/plugins/OwlCarousel2-2.3.4/dist/assets/owl.theme.default.min.css" rel="stylesheet" type="text/css"/>

<audio id="voiceplayer" src="/upload/audio/sbm-voice.mp3" preload="meta" style="display: none;"></audio>

<div class="slide" id="slide1" style="height: calc(100vh - 60px); max-height: 100%;">
    <img src="/views/assets/base/img/content/backgrounds/sbm/logo.png" alt="正大" height="40" style="position: absolute; left: 0; right: 0; top: 10px; margin: 0 auto; z-index: 3;" />     
    <ul>
        <li>
            <a href="javascript:;">
                <img src='https://via.placeholder.com/750x1151' alt="">
            </a>
        </li>
    </ul>
    <div class="dot">
        <span></span>
    </div>
</div>
<div class="page__hd" style="background: #292929; padding: 16px 32px 8px;"><img src='https://via.placeholder.com/605x64' style="width: 100%;" alt=""></div>
<div class="page__bd">
    <img src="https://via.placeholder.com/750x707" style="width: 100%; margin-top: -10px;" />
    <div style="margin-top: -10px; background-color: #3f3f3f; color: #fff;">
        <div class="weui-media-box weui-media-box_appmsg floor-guide" style="padding: 0;">
            <div class="weui-media-box__bd" style="height: 210px; background: url(https://via.placeholder.com/750x387); background-size: cover;">
                <ul class="weui-media-box__info">
                    <li class="weui-media-box__info__meta"><a href='javascript: showFloorVR("3F");'>VR</a></li>
                    <li class="weui-media-box__info__meta"><a href="/v2/leasing?f=3&type=leasing">在线选铺</a></li>
                </ul>
            </div>
            <div class="weui-media-box__bd" style="height: 210px; background: url(https://via.placeholder.com/750x387); background-size: cover;">
                <ul class="weui-media-box__info">
                    <li class="weui-media-box__info__meta"><a href='javascript: showFloorVR("2F");'>VR</a></li>
                    <li class="weui-media-box__info__meta"><a href="/v2/leasing?f=2&type=leasing">在线选铺</a></li>
                </ul>
            </div>
            <div class="weui-media-box__bd" style="height: 210px; background: url(https://via.placeholder.com/750x387); background-size: cover;">
                <ul class="weui-media-box__info">
                    <li class="weui-media-box__info__meta"><a href='javascript: showFloorVR("1F");'>VR</a></li>
                    <li class="weui-media-box__info__meta"><a href="/v2/leasing?f=1&type=leasing">在线选铺</a></li>
                </ul>
            </div>
            <div class="weui-media-box__bd" style="height: 210px; background: url(https://via.placeholder.com/750x387); background-size: cover;">
                <ul class="weui-media-box__info">
                    <li class="weui-media-box__info__meta"><a href='javascript: showFloorVR("B1");'>VR</a></li>
                    <li class="weui-media-box__info__meta"><a href="/v2/leasing?f=06&type=leasing">在线选铺</a></li>
                </ul>
            </div>
        </div>
    </div>
    <div class="weui-grids mall-floors">
        <div class="weui-slider-box">
            <div id="slider" class="weui-slider">
                <div class="weui-slider__inner">
                    <div class="weui-slider__track"></div>
                    <div class="weui-slider__handler"></div>
                </div>
            </div>
        </div>
        
        <div class="weui-grid">
            <a href="javascript:">B1</a>
        </div>
        <div class="weui-grid">
            <a href="javascript:">1F</a>
        </div>
        <div class="weui-grid">
            <a href="javascript:">2F</a>
        </div>
        <div class="weui-grid">
            <a href="javascript:">3F</a>
        </div>
    </div>
    
    <div class="page__bd" style="font-size: 15px;">
        <div class="business-block" style="height: 299px;">
            <div style="position: relative; float: left; width: 28%; height: 100%; background: -webkit-linear-gradient(top,#d0b893,#a68d73); text-align: center;">
                <img src="/views/assets/base/img/content/backgrounds/events/event-block-bg.png" style="height: 55%; margin-top: 40px;">
                <a href="/v2/events" style="position: absolute; bottom: 20px; left: 0; right: 0; margin: 0 auto; text-align: center; z-index: 5;">
                    <img src="/views/assets/base/img/content/backgrounds/events/more.png" style="width: 70%;">
                </a>
            </div>
            <div class="owl-carousel owl-carousel1 owl-theme">
                <div class="item">
                    <a href="javascript:;">
                        <img src="https://via.placeholder.com/538x429" alt="B1中心广场(户外)" height="299" />
                        <span style="position: absolute;top: 10px;left: 10px;color: #fff;font-weight: bold;">B1中心广场(户外)</span>
                    </a>
                </div>
                <div class="item">
                    <a href="javascript:;">
                        <img src="https://via.placeholder.com/538x429" alt="正门主通道天桥(户外)" height="299" />
                        <span style="position: absolute;top: 10px;left: 10px;color: #fff;font-weight: bold;">正门主通道天桥(户外)</span>
                    </a>
                </div>
            </div>
        </div>
    </div>

    <div class="page__bd" style="font-size: 15px;">
        <div class="business-block" style="height: 299px;">
            <div class="owl-carousel owl-carousel1 owl-theme" style="float: left; width: 72%;">
                <div class="item">
                    <a href="javascript:;">
                        <img src="https://via.placeholder.com/538x429" alt="陆翔路招牌(中)大" height="299" />
                        <span style="position: absolute;top: 10px;left: 10px;color: #fff;font-weight: bold;">陆翔路招牌(中)大</span>
                    </a> 
                </div>
                <div class="item">
                    <a href="javascript:;">
                        <img src="https://via.placeholder.com/538x429" alt="陆翔路招牌(中)小" height="299" />
                        <span style="position: absolute;top: 10px;left: 10px;color: #fff;font-weight: bold;">陆翔路招牌(中)小</span>
                    </a>
                </div>
                <div class="item">
                    <a href="javascript:;">
                        <img src="https://via.placeholder.com/538x429" alt="陆翔路招牌(右)" height="299" />
                        <span style="position: absolute;top: 10px;left: 10px;color: #fff;font-weight: bold;">陆翔路招牌(右)</span>
                    </a>
                </div>
            </div>
            <div style="position: relative; height: 100%; background: -webkit-linear-gradient(top,#d0b893,#a68d73); text-align: center; float: left; width: 28%;">
                <img src="/views/assets/base/img/content/backgrounds/ads/ad-block-bg.png" style="height: 55%; margin-top: 40px;">
                <a href="/v2/ads" style="position: absolute; bottom: 20px; left: 0; right: 0; margin: 0 auto; text-align: center; z-index: 5;">
                    <img src="/views/assets/base/img/content/backgrounds/events/more.png" style="width: 70%;">
                </a>
            </div>
        </div>
    </div>
    
    <img src="https://via.placeholder.com/750x543" style="width: 100%; margin-top: -7px;" />
    <img src="https://via.placeholder.com/746x637" style="width: 100%; margin-top: -10px;" />
    <img src="https://via.placeholder.com/746x316" style="width: 100%; margin-top: -10px;" />
    <img src="https://via.placeholder.com/746x766" style="width: 100%; margin-top: -10px;" />
    <img src="https://via.placeholder.com/750x277" style="width: 100%; margin-top: -10px;" />
    <img src="https://via.placeholder.com/572x381" style="width: 100%; margin-top: -10px;" />

    <div class="owl-carousel owl-carousel2 owl-theme" style="margin-top: -10px;">
        <div class="item">
            <img src="https://via.placeholder.com/375x698" alt="" />
        </div>
        <div class="item">
            <img src="https://via.placeholder.com/375x698" alt="" />
        </div>
        <div class="item">
            <img src="https://via.placeholder.com/375x698" alt="" />
        </div>
        <div class="item">
            <img src="https://via.placeholder.com/375x698" alt="" />
        </div>
        <div class="item">
            <img src="https://via.placeholder.com/375x698" alt="" />
        </div>
    </div>
    
    
    
    
</div>

<br><br>

<div id="gallery" class="weui-gallery" style="display: none;">
    <div class="weui-gallery__opr">
        <a href="javascript:" class="weui-gallery__del">
            <i class="fa fa-times" aria-hidden="true" style="color: #fff;" onclick='$("#gallery").hide();'></i>
        </a>
    </div>
</div>

<div id="floor_vr" class="weui-gallery" style="display: none;">
    <iframe src="#!" style="height: 90vh; width: 100%;" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
    <div class="weui-gallery__opr">
        <a href="javascript:" class="weui-gallery__del">
            <i class="fa fa-times" aria-hidden="true" style="color: #fff;" onclick='$("#floor_vr").hide();'></i>
        </a>
    </div>
</div>

<?php include ('menu_bottom.php'); ?>

<?php include ('footer.php'); ?>