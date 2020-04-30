<?php
$scripts = $scripts . '<script type="text/javascript" src="/views/assets/plugins/weui/js/DPlayer.min.js"></script>'
        . '<script type="text/javascript" src="/views/assets/plugins/OwlCarousel2-2.3.4/dist/owl.carousel.min.js"></script>'
        . '<script type="text/javascript" src="/views/assets/base/js/v2/mall-admin.js"></script>';
?>

<link href="/views/assets/plugins/weui/css/DPlayer.min.css" rel="stylesheet" type="text/css" />
<link href="/views/assets/plugins/OwlCarousel2-2.3.4/dist/assets/owl.carousel.min.css" rel="stylesheet" type="text/css"/>
<link href="/views/assets/plugins/OwlCarousel2-2.3.4/dist/assets/owl.theme.default.min.css" rel="stylesheet" type="text/css"/>

<?php include ('navbar_top.php'); ?>

<div class="page__bd">
    <div style="padding-left: 0; padding-right: 0; background-image: url(/views/assets/base/img/content/backgrounds/mall-intro.jpg); background-size: cover; height: 670px;">
        <div style="padding: 370px 25px 0; color: #fff; font-size: 12px;">
            <h3 style="font-size: 18px;">上海正大广场</h3>
            <br>
            <p>上海正⼤广场雄踞⻩浦江畔，坐落在被称为“东方华尔街”的上海浦东陆家嘴核心地段。13层全业态购物空间，汇聚数百个全球⻛尚品牌，上百家国际美⾷；三大特色主题区域——Venus女性生活方式轻奢主题区、eat n work江景餐厅与共享办公空间、儿童的第三个家；创新功能区域划分，满足不同圈层消费者需求。</p>
            <br>
            <p>2020年，软硬件配套升级之后的正大广场将尚、食、乐、美一网打尽，顾客将能在这里体验主题特色区、浦江景观餐饮、办公区、精致文创空间、同步世界潮流的主题活动及全智能系统一体化服务。</p>
        </div>
    </div>
    <img src="/views/assets/base/img/content/backgrounds/WechatIMG4.jpg" style="width: 100%;" />

    <div id="dplayer"></div>

    <img src="/views/assets/base/img/content/backgrounds/WechatIMG5.jpg" style="width: 100%;" />
</div>

<div class="page__bd">
    <div class="weui-panel weui-panel_access">
        <div class="weui-panel__hd">楼层特色</div>
        <div class="weui-panel__bd">
            <div onclick="window.location = '#!'" class="weui-media-box weui-media-box_appmsg">
                <div class="weui-media-box__hd" style="position: relative; overflow: hidden;">
                    <a href='javascript: showGallery("/views/assets/base/img/content/mall/shanghai-sbm/9F.jpg");'>
                        <img class="weui-media-box__thumb" src="/views/assets/base/img/content/mall/shanghai-sbm/9F.jpg" alt="" style="height: 60px; width: 90px;">
                    </a>
                </div>
                <div class="weui-media-box__bd">
                    <h4 class="weui-media-box__title">9-10F 高档餐饮/联合办公</h4>
                    <p class="weui-media-box__desc"><img src="/views/assets/base/img/content/mall/ozone/eat_n_work.png" alt="eat n work" height="15"></p>
                    <ul class="weui-media-box__info">
                        <li class="weui-media-box__info__meta"><a href='javascript: showFloorVR("9F");'>VR</a></li>
                        <li class="weui-media-box__info__meta weui-media-box__info__meta_extra"><a href="/v2/event?id=OLSHOP180917001169">会议活动-正大厅</a></li>
                    </ul>
                </div>
            </div>
            <div onclick="window.location = '#!'" class="weui-media-box weui-media-box_appmsg">
                <div class="weui-media-box__hd" style="position: relative; overflow: hidden;">
                    <a href='javascript: showGallery("/views/assets/base/img/content/mall/shanghai-sbm/8F.jpg");'>
                        <img class="weui-media-box__thumb" src="/views/assets/base/img/content/mall/shanghai-sbm/8F.jpg" alt="" style="height: 60px; width: 90px;">
                    </a>
                </div>
                <div class="weui-media-box__bd">
                    <h4 class="weui-media-box__title">8F 聚会时光</h4>
                    <p class="weui-media-box__desc">
                        <img src="/views/assets/base/img/content/client-logos/web/shanghaimin.png" alt="小南国" height="50"> 
                        <img src="/views/assets/base/img/content/client-logos/web/wangpingniupai.png" alt="王品台塑牛排" height="50">
                        <img src="/views/assets/base/img/content/client-logos/web/stellar.jpg" alt="星美正大影城" height="50"> 
                        <img src="/views/assets/base/img/content/client-logos/web/haoledi.png" alt="好乐迪" height="50">
                    </p>
                    <ul class="weui-media-box__info">
                        <li class="weui-media-box__info__meta"><a href='javascript: showFloorVR("8F");'>VR</a></li>
                        <li class="weui-media-box__info__meta weui-media-box__info__meta_extra"><a href="/v2/floor-plan?f=8&type=leasing">在线选铺</a></li>
                        <li class="weui-media-box__info__meta weui-media-box__info__meta_extra"><a href="/v2/advertising?f=8&type=ads">广告宣传</a></li>
                    </ul>
                </div>
            </div>
            <div onclick="window.location = '#!'" class="weui-media-box weui-media-box_appmsg">
                <div class="weui-media-box__hd" style="position: relative; overflow: hidden;">
                    <a href='javascript: showGallery("/views/assets/base/img/content/mall/shanghai-sbm/7F.jpg");'>
                        <img class="weui-media-box__thumb" src="/views/assets/base/img/content/mall/shanghai-sbm/7F.jpg" alt="" style="height: 60px; width: 90px;">
                    </a>
                </div>
                <div class="weui-media-box__bd">
                    <h4 class="weui-media-box__title">7F 健康乐活</h4>
                    <p class="weui-media-box__desc">
                        <img src="/views/assets/base/img/content/client-logos/web/supermonkey.png" alt="SUPERMONKEY" height="50">
                        <img src="/views/assets/base/img/content/client-logos/web/DigPotency.png" alt="Dig Potency" height="50">
                        <img src="/views/assets/base/img/content/client-logos/web/yershari.png" alt="耶里夏丽" height="50">
                        <img src="/views/assets/base/img/content/client-logos/web/modongwu.png" alt="魔井屋" height="50">
                    </p>
                    <ul class="weui-media-box__info">
                        <li class="weui-media-box__info__meta"><a href='javascript: showFloorVR("7F");'>VR</a></li>
                        <li class="weui-media-box__info__meta weui-media-box__info__meta_extra"><a href="/v2/floor-plan?f=7&type=leasing">在线选铺</a></li>
                    </ul>
                </div>
            </div>
            <div onclick="window.location = '#!'" class="weui-media-box weui-media-box_appmsg">
                <div class="weui-media-box__hd" style="position: relative; overflow: hidden;">
                    <a href='javascript: showGallery("/views/assets/base/img/content/mall/shanghai-sbm/6F.jpg");'>
                        <img class="weui-media-box__thumb" src="/views/assets/base/img/content/mall/shanghai-sbm/6F.jpg" alt="" style="height: 60px; width: 90px;">
                    </a>
                </div>
                <div class="weui-media-box__bd">
                    <h4 class="weui-media-box__title">6F 国风文化</h4>
                    <p class="weui-media-box__desc">
                        <img src="/views/assets/base/img/content/client-logos/web/diandude.jpg" alt="点都德" height="50">
                        <img src="/views/assets/base/img/content/client-logos/web/wangshunge.png" alt="旺顺阁鱼头泡饼" height="50">
                        <img src="/views/assets/base/img/content/client-logos/web/leicun.png" alt="罍+村" height="50">
                        <img src="/views/assets/base/img/content/client-logos/web/nothing_but.png" alt="吃饭皇帝大" height="50">
                    </p>
                    <ul class="weui-media-box__info">
                        <li class="weui-media-box__info__meta"><a href='javascript: showFloorVR("6F");'>VR</a></li>
                        <li class="weui-media-box__info__meta weui-media-box__info__meta_extra"><a href="/v2/floor-plan?f=6&type=leasing">在线选铺</a></li>
                    </ul>
                </div>
            </div>
            <div onclick="window.location = '#!'" class="weui-media-box weui-media-box_appmsg">
                <div class="weui-media-box__hd" style="position: relative; overflow: hidden;">
                    <a href='javascript: showGallery("/views/assets/base/img/content/mall/shanghai-sbm/5F.jpg");'>
                        <img class="weui-media-box__thumb" src="/views/assets/base/img/content/mall/shanghai-sbm/5F.jpg" alt="" style="height: 60px; width: 90px;">
                    </a>
                </div>
                <div class="weui-media-box__bd">
                    <h4 class="weui-media-box__title">5F 运动潮玩</h4>
                    <p class="weui-media-box__desc">
                        <img src="/views/assets/base/img/content/client-logos/web/fila.png" alt="FILA" height="50">
                        <img src="/views/assets/base/img/content/client-logos/web/Dickies.png" alt="Dickies" height="50">
                        <img src="/views/assets/base/img/content/client-logos/web/heytea.png" alt="喜茶" height="50">
                        <img src="/views/assets/base/img/content/client-logos/web/gundam.png" alt="高达基地" height="50">
                    </p>
                    <ul class="weui-media-box__info">
                        <li class="weui-media-box__info__meta"><a href='javascript: showFloorVR("5F");'>VR</a></li>
                        <li class="weui-media-box__info__meta weui-media-box__info__meta_extra"><a href="/v2/floor-plan?f=5&type=leasing">在线选铺</a></li>
                        <li class="weui-media-box__info__meta weui-media-box__info__meta_extra"><a href="/v2/event?id=OLSHOP180917001166">场地活动</a></li>
                        <li class="weui-media-box__info__meta weui-media-box__info__meta_extra"><a href="/v2/advertising?f=5&type=ads">广告宣传</a></li>
                    </ul>
                </div>
            </div>
            <div onclick="window.location = '#!'" class="weui-media-box weui-media-box_appmsg">
                <div class="weui-media-box__hd" style="position: relative; overflow: hidden;">
                    <a href='javascript: showGallery("/views/assets/base/img/content/mall/shanghai-sbm/4F.jpg");'>
                        <img class="weui-media-box__thumb" src="/views/assets/base/img/content/mall/shanghai-sbm/4F.jpg" alt="" style="height: 60px; width: 90px;">
                    </a>
                </div>
                <div class="weui-media-box__bd">
                    <h4 class="weui-media-box__title">4F 型男周边</h4>
                    <p class="weui-media-box__desc">
                        <img src="/views/assets/base/img/content/client-logos/web/Under-Armour.png" alt="Under Armour" height="50">
                        <img src="/views/assets/base/img/content/client-logos/web/GU.png" alt="GU" height="50">
                        <img src="/views/assets/base/img/content/client-logos/web/adidas.png" alt="adidas" height="50">
                        <img src="/views/assets/base/img/content/client-logos/web/huawei.png" alt="华为" height="50">
                    </p>
                    <ul class="weui-media-box__info">
                        <li class="weui-media-box__info__meta"><a href='javascript: showFloorVR("4F");'>VR</a></li>
                        <li class="weui-media-box__info__meta weui-media-box__info__meta_extra"><a href="/v2/floor-plan?f=4&type=leasing">在线选铺</a></li>
                        <li class="weui-media-box__info__meta weui-media-box__info__meta_extra"><a href="/v2/event?id=OLSHOP190809000001">场地活动</a></li>
                    </ul>
                </div>
            </div>
            <div onclick="window.location = '#!'" class="weui-media-box weui-media-box_appmsg">
                <div class="weui-media-box__hd" style="position: relative; overflow: hidden;">
                    <a href='javascript: showGallery("/views/assets/base/img/content/mall/shanghai-sbm/3F.jpg");'>
                        <img class="weui-media-box__thumb" src="/views/assets/base/img/content/mall/shanghai-sbm/3F.jpg" alt="" style="height: 60px; width: 90px;">
                    </a>
                </div>
                <div class="weui-media-box__bd">
                    <h4 class="weui-media-box__title">3F 精致女孩/千禧女孩</h4>
                    <p class="weui-media-box__desc">
                        <img src="/views/assets/base/img/content/client-logos/web/UR.png" alt="UR/URBAN REVIVO/URBAN RENEWAL" height="50">
                        <img src="/views/assets/base/img/content/client-logos/web/monco.png" alt="MO&CO" height="50">
                        <img src="/views/assets/base/img/content/client-logos/web/moussy.png" alt="MOUSSY" height="50">
                        <img src="/views/assets/base/img/content/client-logos/web/KORADIOR.png" alt="Koradiorelsewhere" height="50">
                    </p>
                    <ul class="weui-media-box__info">
                        <li class="weui-media-box__info__meta"><a href='javascript: showFloorVR("3F");'>VR</a></li>
                        <li class="weui-media-box__info__meta weui-media-box__info__meta_extra"><a href="/v2/floor-plan?f=3&type=leasing">在线选铺</a></li>
                        <li class="weui-media-box__info__meta weui-media-box__info__meta_extra"><a href="/v2/event?id=OLSHOP180917001150">场地活动</a></li>
                        <li class="weui-media-box__info__meta weui-media-box__info__meta_extra"><a href="/v2/advertising?f=3&type=ads">广告宣传</a></li>
                    </ul>
                </div>
            </div>
            <div onclick="window.location = '#!'" class="weui-media-box weui-media-box_appmsg">
                <div class="weui-media-box__hd" style="position: relative; overflow: hidden;">
                    <a href='javascript: showGallery("/views/assets/base/img/content/mall/shanghai-sbm/2F.jpg");'>
                        <img class="weui-media-box__thumb" src="/views/assets/base/img/content/mall/shanghai-sbm/2F.jpg" alt="" style="height: 60px; width: 90px;">
                    </a>
                </div>
                <div class="weui-media-box__bd">
                    <h4 class="weui-media-box__title">2F 家庭生活</h4>
                    <p class="weui-media-box__desc">
                        <img src="/views/assets/base/img/content/client-logos/web/tomsworld.png" alt="汤姆熊" height="50">
                        <img src="/views/assets/base/img/content/client-logos/web/LEGO.png" alt="乐高" height="50">
                        <img src="/views/assets/base/img/content/client-logos/web/BIB.png" alt="baby international Blu" height="50">
                        <img src="/views/assets/base/img/content/client-logos/web/hinos.png" alt="喜眠hinos" height="50">
                    </p>
                    <ul class="weui-media-box__info">
                        <li class="weui-media-box__info__meta"><a href='javascript: showFloorVR("2F");'>VR</a></li>
                        <li class="weui-media-box__info__meta weui-media-box__info__meta_extra"><a href="/v2/floor-plan?f=2&type=leasing">在线选铺</a></li>
                    </ul>
                </div>
            </div>
            <div onclick="window.location = '#!'" class="weui-media-box weui-media-box_appmsg">
                <div class="weui-media-box__hd" style="position: relative; overflow: hidden;">
                    <a href='javascript: showGallery("/views/assets/base/img/content/mall/shanghai-sbm/1F.jpg");'>
                        <img class="weui-media-box__thumb" src="/views/assets/base/img/content/mall/shanghai-sbm/1F.jpg" alt="" style="height: 60px; width: 90px;">
                    </a>
                </div>
                <div class="weui-media-box__bd">
                    <h4 class="weui-media-box__title">1F 国际风尚/滨江夜食</h4>
                    <p class="weui-media-box__desc">
                        <img src="/views/assets/base/img/content/client-logos/web/icicle.png" alt="之禾 ICICLE" height="50">
                        <img src="/views/assets/base/img/content/client-logos/web/md.jpg" alt="MassimoDutti" height="50">
                        <img src="/views/assets/base/img/content/client-logos/web/starbucks-r.jpg" alt="Starbucks Reserve" height="50">
                        <img src="/views/assets/base/img/content/client-logos/web/Green_Safe.png" alt="Green&Safe" height="50">
                    </p>
                    <ul class="weui-media-box__info">
                        <li class="weui-media-box__info__meta"><a href='javascript: showFloorVR("1F");'>VR</a></li>
                        <li class="weui-media-box__info__meta weui-media-box__info__meta_extra"><a href="/v2/floor-plan?f=1&type=leasing">在线选铺</a></li>
                        <li class="weui-media-box__info__meta weui-media-box__info__meta_extra"><a href="/v2/advertising?f=1&type=ads">广告宣传</a></li>
                    </ul>
                    <ul class="weui-media-box__info" style="margin-top: 0;">
                        <li class="weui-media-box__info__meta"><a href="/v2/event?id=OLSHOP180917001126">场地活动-东厅</a></li>
                        <li class="weui-media-box__info__meta weui-media-box__info__meta_extra"><a href="/v2/event?id=OLSHOP180917001116">场地活动-西厅</a></li>
                    </ul>
                </div>
            </div>
            <div onclick="window.location = '#!'" class="weui-media-box weui-media-box_appmsg">
                <div class="weui-media-box__hd" style="position: relative; overflow: hidden;">
                    <a href='javascript: showGallery("/views/assets/base/img/content/mall/shanghai-sbm/B1F.jpg");'>
                        <img class="weui-media-box__thumb" src="/views/assets/base/img/content/mall/shanghai-sbm/B1F.jpg" alt="" style="height: 60px; width: 90px;">
                    </a>
                </div>
                <div class="weui-media-box__bd">
                    <h4 class="weui-media-box__title">B1 配套服务</h4>
                    <p class="weui-media-box__desc">
                        <img src="/views/assets/base/img/content/client-logos/web/icbc.png" alt="ICBC" height="50">
                        <img src="/views/assets/base/img/content/client-logos/web/ctrip.png" alt="携程" height="50">
                        <img src="/views/assets/base/img/content/client-logos/web/watsons.jpg" alt="屈臣氏" height="50">
                        <img src="/views/assets/base/img/content/client-logos/web/uniqlo.png" alt="优衣库" height="50">
                    </p>
                    <ul class="weui-media-box__info">
                        <li class="weui-media-box__info__meta"><a href='javascript: showFloorVR("B1");'>VR</a></li>
                        <li class="weui-media-box__info__meta weui-media-box__info__meta_extra"><a href="/v2/floor-plan?f=06&type=leasing">在线选铺</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>

<?php include ('event-block.php'); ?>

<?php include ('ad-block.php'); ?>
<br><br><br><br>

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