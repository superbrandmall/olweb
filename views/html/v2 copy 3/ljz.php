<?php
$scripts = $scripts . '<script type="text/javascript" src="/views/assets/plugins/OwlCarousel2-2.3.4/dist/owl.carousel.min.js"></script>'
        . '<script type="text/javascript" src="/views/assets/base/js/v2/ljz-admin.js"></script>';
?>

<link href="/views/assets/plugins/OwlCarousel2-2.3.4/dist/assets/owl.carousel.min.css" rel="stylesheet" type="text/css"/>
<link href="/views/assets/plugins/OwlCarousel2-2.3.4/dist/assets/owl.theme.default.min.css" rel="stylesheet" type="text/css"/>

<?php include ('navbar_top.php'); ?>

<div class="livechat-girl animated"> <img class="girl" src="/views/assets/base/img/content/backgrounds/en_3.png">
    <div id="hint1" class="livechat-hint rd-notice-tooltip rd-notice-type-success rd-notice-position-left single-line hide_hint">
        <div class="rd-notice-content">这是上海正大广场。</div>
    </div>
    <div id="hint2" class="livechat-hint rd-notice-tooltip rd-notice-type-success rd-notice-position-left single-line hide_hint">
        <div class="rd-notice-content">我们为您全方位介绍商场，还有全景VR可以看。</div>
    </div>
    <div id="hint3" class="livechat-hint rd-notice-tooltip rd-notice-type-success rd-notice-position-left single-line hide_hint">
        <div class="rd-notice-content">点击"去选铺"更有旺铺供您选择，快试试吧！</div>
    </div>
    <div class="animated-circles">
        <div class="circle c-1"></div>
        <div class="circle c-2"></div>
        <div class="circle c-3"></div>
    </div>
</div>

<audio id="voiceplayer" src="/upload/audio/sbm-voice.mp3" preload="meta" style="display: none;"></audio>

<div class="weui-article">
    <h1>上海正大广场</h1>
    <div id="mall_shortcuts" class="weui-grids">
        <a href="javascript:" class="weui-grid">
            <div class="weui-grid__icon" style="background-color: rgb(230, 176, 76); color: rgb(53, 53, 53);">
                <i class="fa fa-line-chart" aria-hidden="true"></i>
                <p class="weui-grid__label" style="color: rgb(53, 53, 53);">开新铺</p>
            </div>
        </a>
        <a href="/v2/events?type=events" class="weui-grid">
            <div class="weui-grid__icon">
                <i class="fa fa-fire" aria-hidden="true"></i>
                <p class="weui-grid__label">办活动</p>
            </div>
        </a>
        <a href="/v2/ads?type=ads" class="weui-grid">
            <div class="weui-grid__icon">
                <i class="fa fa-bolt" aria-hidden="true"></i>
                <p class="weui-grid__label">做广告</p>
            </div>
        </a>
    </div>
</div>

<div class="page__bd">
    <div class="weui-panel__hd">
        8个主题区
    </div>
    <div class="weui-panel__bd">
        <div class="weui-media-box weui-media-box_appmsg" style="background: rgb(245, 245, 245); padding: 0; margin: 0 16px 16px;">
            <div class="weui-media-box__bd">
                <div style="position: relative;">
                    <img class="weui-media-box__thumb" src="/views/assets/base/img/content/mall/shanghai-sbm/3F.jpg" alt="" style="border-top-left-radius: 10px; border-top-right-radius: 10px;">
                    <ul class="leasing-areas">
                        <li><a href='javascript: showFloorVR("3F");'>VR</a></li>
                        <li><a href="/v2/leasing?f=3&type=leasing">去选铺</a></li>
                    </ul>
                </div>
                <div class="weui-cell_select" onclick="window.location='/v2/leasing?f=3&type=leasing'" style="position: relative; margin: 10px 0 0 15px;">
                    <p style="font-size: 14px;">3F 精致宝藏女孩</p>
                    <small class="weui-cell__bd" style="margin-right: 40px; display: block; font-size: 12px;">快时尚、少淑女装搭配潮流彩妆，时髦女生必打卡</small>
                </div>
                <div style="margin: 5px 15px 10px;">
                    <span class="weui-mark-rb">Urban Revivo</span>
                    <span class="weui-mark-rb">DAZZLE</span>
                    <span class="weui-mark-rb">innisfree</span>
                </div>
            </div>
        </div>
        
        <div class="weui-media-box weui-media-box_appmsg" style="background: rgb(245, 245, 245); padding: 0; margin: 0 16px 16px;">
            <div class="weui-media-box__bd">
                <div style="position: relative;">
                    <img class="weui-media-box__thumb" src="/views/assets/base/img/content/mall/shanghai-sbm/8F.jpg" alt="" style="border-top-left-radius: 10px; border-top-right-radius: 10px;">
                    <ul class="leasing-areas">
                        <li><a href='javascript: showFloorVR("8F");'>VR</a></li>
                        <li><a href="/v2/leasing?f=8&type=leasing">去选铺</a></li>
                    </ul>
                </div>
                <div class="weui-cell_select" onclick="window.location='/v2/leasing?f=8&type=leasing'" style="position: relative; margin: 10px 0 0 15px;">
                    <p style="font-size: 14px;">8F 聚会好时光</p>
                    <small class="weui-cell__bd" style="margin-right: 40px; display: block; font-size: 12px;">聚餐K歌看电影，当代青年社交三件套，社交娱乐不二之选</small>
                </div>
                <div style="margin: 5px 15px 10px;">
                    <span class="weui-mark-rb">星美影城</span>
                    <span class="weui-mark-rb">好乐迪KTV</span>
                    <span class="weui-mark-rb">湊湊</span>
                    <span class="weui-mark-rb">太二酸菜鱼</span>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="page__bd">
    <div class="weui-panel__hd">
        各楼层主题
    </div>
    <div style="margin-top: -10px; background-color: #3f3f3f; color: #fff;">
        <div class="weui-media-box weui-media-box_appmsg floor-guide" style="padding: 0;">
            <div class="weui-media-box__bd" style="height: 210px; background: url(/views/assets/base/img/content/backgrounds/sbm/Floor/9F.jpg); background-size: cover;">
                <ul class="leasing-areas">
                    <li><a href='javascript: showFloorVR("9F");'>VR</a></li>
                </ul>
            </div>
            <div class="weui-media-box__bd" style="height: 210px; background: url(/views/assets/base/img/content/backgrounds/sbm/Floor/8F.jpg); background-size: cover;">
                <ul class="leasing-areas">
                    <li><a href='javascript: showFloorVR("8F");'>VR</a></li>
                    <li><a href="/v2/leasing?f=8&type=leasing">去选铺</a></li>
                </ul>
            </div>
            <div class="weui-media-box__bd" style="height: 210px; background: url(/views/assets/base/img/content/backgrounds/sbm/Floor/7F.jpg); background-size: cover;">
                <ul class="leasing-areas">
                    <li><a href='javascript: showFloorVR("7F");'>VR</a></li>
                    <li><a href="/v2/leasing?f=7&type=leasing">去选铺</a></li>
                </ul>
            </div>
            <div class="weui-media-box__bd" style="height: 210px; background: url(/views/assets/base/img/content/backgrounds/sbm/Floor/6F.jpg); background-size: cover;">
                <ul class="leasing-areas">
                    <li><a href='javascript: showFloorVR("6F");'>VR</a></li>
                    <li><a href="/v2/leasing?f=6&type=leasing">去选铺</a></li>
                </ul>
            </div>
            <div class="weui-media-box__bd" style="height: 210px; background: url(/views/assets/base/img/content/backgrounds/sbm/Floor/5F.jpg); background-size: cover;">
                <ul class="leasing-areas">
                    <li><a href='javascript: showFloorVR("5F");'>VR</a></li>
                    <li><a href="/v2/leasing?f=5&type=leasing">去选铺</a></li>
                </ul>
            </div>
            <div class="weui-media-box__bd" style="height: 210px; background: url(/views/assets/base/img/content/backgrounds/sbm/Floor/4F.jpg); background-size: cover;">
                <ul class="leasing-areas">
                    <li><a href='javascript: showFloorVR("4F");'>VR</a></li>
                    <li><a href="/v2/leasing?f=4&type=leasing">去选铺</a></li>
                </ul>
            </div>
            <div class="weui-media-box__bd" style="height: 210px; background: url(/views/assets/base/img/content/backgrounds/sbm/Floor/3F.jpg); background-size: cover;">
                <ul class="leasing-areas">
                    <li><a href='javascript: showFloorVR("3F");'>VR</a></li>
                    <li><a href="/v2/leasing?f=3&type=leasing">去选铺</a></li>
                </ul>
            </div>
            <div class="weui-media-box__bd" style="height: 210px; background: url(/views/assets/base/img/content/backgrounds/sbm/Floor/2F.jpg); background-size: cover;">
                <ul class="leasing-areas">
                    <li><a href='javascript: showFloorVR("2F");'>VR</a></li>
                    <li><a href="/v2/leasing?f=2&type=leasing">去选铺</a></li>
                </ul>
            </div>
            <div class="weui-media-box__bd" style="height: 210px; background: url(/views/assets/base/img/content/backgrounds/sbm/Floor/1F.jpg); background-size: cover;">
                <ul class="leasing-areas">
                    <li><a href='javascript: showFloorVR("1F");'>VR</a></li>
                    <li><a href="/v2/leasing?f=1&type=leasing">去选铺</a></li>
                </ul>
            </div>
            <div class="weui-media-box__bd" style="height: 210px; background: url(/views/assets/base/img/content/backgrounds/sbm/Floor/0F.jpg); background-size: cover;">
                <ul class="leasing-areas">
                    <li><a href='javascript: showFloorVR("B1");'>VR</a></li>
                    <li><a href="/v2/leasing?f=06&type=leasing">去选铺</a></li>
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
            <a href="javascript:">5F</a>
        </div>
        <div class="weui-grid">
            <a href="javascript:">6F</a>
        </div>
        <div class="weui-grid">
            <a href="javascript:">7F</a>
        </div>
        <div class="weui-grid">
            <a href="javascript:">8F</a>
        </div>
        <div class="weui-grid">
            <a href="javascript:">9F</a>
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
        <div class="weui-grid">
            <a href="javascript:">4F</a>
        </div>
    </div>

    <img src="/views/assets/base/img/content/backgrounds/sbm/data.jpg" style="width: 100%;" />
    
    <div class="weui-panel__hd">
        项目介绍
    </div>
    <div class="weui-panel__bd">
        <div class="weui-media-box weui-media-box_appmsg" style="background: rgb(245, 245, 245); padding: 0; margin: 0 16px 16px;">
            <div class="weui-media-box__bd">
                <div style="position: relative;">
                    <img class="weui-media-box__thumb" src="/views/assets/base/img/content/backgrounds/sbm/mall-view.jpg" alt="" style="border-top-left-radius: 10px; border-top-right-radius: 10px;">
                </div>
                <div style="position: relative; margin: 10px 0 0 15px;">
                    <b style="font-size: 20px;">上海正大广场</b><small class="weui-cell__bd" style="margin-right: 40px; display: block; font-size: 12px;">
                        坐落在黄浦江畔，毗临东方明珠、金茂大厦、环球金融中心、上海国际会议中心，处于上海陆家嘴中心地段。连接商场的明珠环每年人流量达1亿人次，服务于周边30万白领精英消费群体，商场每年客流超3000万人次
                    </small>
                </div>
                <div style="margin: 5px 15px 10px;">
                    <span class="weui-mark-rb">建筑面积 24.7万方</span>
                    <span class="weui-mark-rb">租赁面积 11.8万方</span>
                </div>
            </div>
        </div>
    </div>
    
    <img src="/views/assets/base/img/content/backgrounds/sbm/map.jpg" style="width: 100%; margin-top: -10px;" />
</div>

<br>

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