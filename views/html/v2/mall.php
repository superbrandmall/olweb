<?php
$scripts = $scripts . '<script type="text/javascript" src="/views/assets/plugins/OwlCarousel2-2.3.4/dist/owl.carousel.min.js"></script>'
        . '<script type="text/javascript" src="/views/assets/base/js/v2/mall-admin.js"></script>';
?>

<link href="/views/assets/plugins/OwlCarousel2-2.3.4/dist/assets/owl.carousel.min.css" rel="stylesheet" type="text/css"/>
<link href="/views/assets/plugins/OwlCarousel2-2.3.4/dist/assets/owl.theme.default.min.css" rel="stylesheet" type="text/css"/>

<div class="livechat-girl animated"> <img class="girl" src="/views/assets/base/img/content/backgrounds/en_3.png">
    <div id="hint1" class="livechat-hint rd-notice-tooltip rd-notice-type-success rd-notice-position-left single-line hide_hint">
        <div class="rd-notice-content">这是上海正大广场。</div>
    </div>
    <div id="hint2" class="livechat-hint rd-notice-tooltip rd-notice-type-success rd-notice-position-left single-line hide_hint">
        <div class="rd-notice-content">我们为您全方位介绍商场，还有全景VR可以看。</div>
    </div>
    <div id="hint3" class="livechat-hint rd-notice-tooltip rd-notice-type-success rd-notice-position-left single-line hide_hint">
        <div class="rd-notice-content">点击"在线选铺"更有旺铺供您选择，快试试吧！</div>
    </div>
    <div class="animated-circles">
        <div class="circle c-1"></div>
        <div class="circle c-2"></div>
        <div class="circle c-3"></div>
    </div>
</div>

<audio id="voiceplayer" src="/upload/audio/sbm-voice.mp3" preload="meta" style="display: none;"></audio>

<div class="page__bd">
    <img src="/views/assets/base/img/content/backgrounds/sbm/top.jpg" style="width: 100%;" />
    <img src="/views/assets/base/img/content/backgrounds/sbm/data.jpg" style="width: 100%; margin-top: -10px;" />
    <div style="margin-top: -10px; background-color: #8f2ef2; color: #fff;">
        <div class="weui-media-box weui-media-box_appmsg floor-guide">
            <div class="weui-media-box__bd">
                <h4 class="weui-media-box__title" style="color: #fff;">9-10F 高档餐饮/联合办公</h4>
                <img src="/views/assets/base/img/content/backgrounds/sbm/logos/9F.png" alt="" style="width: 200px;">
                <ul class="weui-media-box__info">
                    <li class="weui-media-box__info__meta"><a href='javascript: showFloorVR("9F");'>VR</a></li>
                    <li class="weui-media-box__info__meta"><a href="/v2/event?id=OLSHOP180917001169">会议活动-正大厅</a></li>
                </ul>
            </div>
            <div class="weui-media-box__bd">
                <h4 class="weui-media-box__title" style="color: #fff;">8F 聚会时光</h4>
                <img src="/views/assets/base/img/content/backgrounds/sbm/logos/6F.png" alt="">
                <ul class="weui-media-box__info">
                    <li class="weui-media-box__info__meta"><a href='javascript: showFloorVR("8F");'>VR</a></li>
                    <li class="weui-media-box__info__meta"><a href="/v2/floor-plan?f=8&type=leasing">在线选铺</a></li>
                    <li class="weui-media-box__info__meta"><a href="/v2/advertising?f=8&type=ads">广告宣传</a></li>
                </ul>
            </div>
            <div class="weui-media-box__bd">
                <h4 class="weui-media-box__title" style="color: #fff;">7F 健康乐活</h4>
                <img src="/views/assets/base/img/content/backgrounds/sbm/logos/6F.png" alt="">
                <ul class="weui-media-box__info">
                        <li class="weui-media-box__info__meta"><a href='javascript: showFloorVR("7F");'>VR</a></li>
                        <li class="weui-media-box__info__meta"><a href="/v2/floor-plan?f=7&type=leasing">在线选铺</a></li>
                    </ul>
            </div>
            <div class="weui-media-box__bd">
                <h4 class="weui-media-box__title" style="color: #fff;">6F 国风文化</h4>
                <img src="/views/assets/base/img/content/backgrounds/sbm/logos/6F.png" alt="">
                <ul class="weui-media-box__info">
                    <li class="weui-media-box__info__meta"><a href='javascript: showFloorVR("6F");'>VR</a></li>
                    <li class="weui-media-box__info__meta"><a href="/v2/floor-plan?f=6&type=leasing">在线选铺</a></li>
                </ul>
            </div>
            <div class="weui-media-box__bd">
                <h4 class="weui-media-box__title" style="color: #fff;">5F 运动潮玩</h4>
                <img src="/views/assets/base/img/content/backgrounds/sbm/logos/4F.png" alt="">
                <ul class="weui-media-box__info">
                    <li class="weui-media-box__info__meta"><a href='javascript: showFloorVR("5F");'>VR</a></li>
                    <li class="weui-media-box__info__meta"><a href="/v2/floor-plan?f=5&type=leasing">在线选铺</a></li>
                    <li class="weui-media-box__info__meta"><a href="/v2/event?id=OLSHOP180917001166">场地活动</a></li>
                    <li class="weui-media-box__info__meta"><a href="/v2/advertising?f=5&type=ads">广告宣传</a></li>
                </ul>
            </div>
            <div class="weui-media-box__bd">
                <h4 class="weui-media-box__title" style="color: #fff;">4F 型男周边</h4>
                <img src="/views/assets/base/img/content/backgrounds/sbm/logos/4F.png" alt="">     
                <ul class="weui-media-box__info">
                    <li class="weui-media-box__info__meta"><a href='javascript: showFloorVR("4F");'>VR</a></li>
                    <li class="weui-media-box__info__meta"><a href="/v2/floor-plan?f=4&type=leasing">在线选铺</a></li>
                    <li class="weui-media-box__info__meta"><a href="/v2/event?id=OLSHOP190809000001">场地活动</a></li>
                </ul>
            </div>
            <div class="weui-media-box__bd">
                <h4 class="weui-media-box__title" style="color: #fff;">3F 精致女孩/千禧女孩</h4>
                <img src="/views/assets/base/img/content/backgrounds/sbm/logos/3F.png" alt="">
                <ul class="weui-media-box__info">
                    <li class="weui-media-box__info__meta"><a href='javascript: showFloorVR("3F");'>VR</a></li>
                    <li class="weui-media-box__info__meta"><a href="/v2/floor-plan?f=3&type=leasing">在线选铺</a></li>
                    <li class="weui-media-box__info__meta"><a href="/v2/event?id=OLSHOP180917001150">场地活动</a></li>
                    <li class="weui-media-box__info__meta"><a href="/v2/advertising?f=3&type=ads">广告宣传</a></li>
                </ul>
            </div>
            <div class="weui-media-box__bd">
                <h4 class="weui-media-box__title" style="color: #fff;">2F 家庭生活</h4>
                <img src="/views/assets/base/img/content/backgrounds/sbm/logos/2F.png" alt="">
                <ul class="weui-media-box__info">
                    <li class="weui-media-box__info__meta"><a href='javascript: showFloorVR("2F");'>VR</a></li>
                    <li class="weui-media-box__info__meta"><a href="/v2/floor-plan?f=2&type=leasing">在线选铺</a></li>
                </ul>
            </div>
            <div class="weui-media-box__bd">
                <h4 class="weui-media-box__title" style="color: #fff;">1F 国际风尚/滨江夜食</h4>
                <img src="/views/assets/base/img/content/backgrounds/sbm/logos/1F.png" alt="">
                <ul class="weui-media-box__info">
                    <li class="weui-media-box__info__meta"><a href='javascript: showFloorVR("1F");'>VR</a></li>
                    <li class="weui-media-box__info__meta"><a href="/v2/floor-plan?f=1&type=leasing">在线选铺</a></li>
                    <li class="weui-media-box__info__meta"><a href="/v2/event?id=OLSHOP180917001126">东门场地</a></li>
                    <li class="weui-media-box__info__meta"><a href="/v2/event?id=OLSHOP180917001116">西门场地</a></li>
                    <li class="weui-media-box__info__meta"><a href="/v2/advertising?f=1&type=ads">广告宣传</a></li>
                </ul>
            </div>
            <div class="weui-media-box__bd">
                <h4 class="weui-media-box__title" style="color: #fff;">B1 配套服务</h4>
                <img src="/views/assets/base/img/content/backgrounds/sbm/logos/1F.png" alt="">
                <ul class="weui-media-box__info">
                    <li class="weui-media-box__info__meta"><a href='javascript: showFloorVR("B1");'>VR</a></li>
                    <li class="weui-media-box__info__meta"><a href="/v2/floor-plan?f=06&type=leasing">在线选铺</a></li>
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
            <a href="javascript:">9F</a>
        </div>
        <div class="weui-grid">
            <a href="javascript:">8F</a>
        </div>
        <div class="weui-grid">
            <a href="javascript:">7F</a>
        </div>
        <div class="weui-grid">
            <a href="javascript:">6F</a>
        </div>
        <div class="weui-grid">
            <a href="javascript:">5F</a>
        </div>
        <div class="weui-grid">
            <a href="javascript:">4F</a>
        </div>
        <div class="weui-grid">
            <a href="javascript:">3F</a>
        </div>
        <div class="weui-grid">
            <a href="javascript:">2F</a>
        </div>
        <div class="weui-grid" style="margin-left: 25%;">
            <a href="javascript:">1F</a>
        </div>
        <div class="weui-grid">
            <a href="javascript:">B1</a>
        </div>
    </div>
    
    <?php include ('event-block.php'); ?>

    <?php include ('ad-block.php'); ?>
    
    <img src="/views/assets/base/img/content/backgrounds/sbm/mall-intro.jpg" style="width: 100%; margin-top: -7px;" />
    <img src="/views/assets/base/img/content/backgrounds/sbm/map.jpg" style="width: 100%; margin-top: -10px;" />
    <img src="/views/assets/base/img/content/backgrounds/sbm/jerde.jpg" style="width: 100%; margin-top: -10px;" />
    <img src="/views/assets/base/img/content/backgrounds/sbm/architector.jpg" style="width: 100%; margin-top: -10px;" />
    <img src="/views/assets/base/img/content/backgrounds/sbm/sbm-info.jpg" style="width: 100%; margin-top: -10px;" />
    <img src="/views/assets/base/img/content/backgrounds/sbm/mall-view.jpg" style="width: 100%; margin-top: -10px;" />

    <div class="owl-carousel owl-carousel2 owl-theme" style="margin-top: -7px;">
        <div class="item">
            <img src="/views/assets/base/img/content/backgrounds/sbm/PALL/p01.jpg" alt="" />
        </div>
        <div class="item">
            <img src="/views/assets/base/img/content/backgrounds/sbm/PALL/p02.jpg" alt="" />
        </div>
        <div class="item">
            <img src="/views/assets/base/img/content/backgrounds/sbm/PALL/p03.jpg" alt="" />
        </div>
        <div class="item">
            <img src="/views/assets/base/img/content/backgrounds/sbm/PALL/p04.jpg" alt="" />
        </div>
        <div class="item">
            <img src="/views/assets/base/img/content/backgrounds/sbm/PALL/p05.jpg" alt="" />
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