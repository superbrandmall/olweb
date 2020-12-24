<?php
$scripts = $scripts . '<script type="text/javascript" src="/views/assets/base/js/v2/ljz-admin.js"></script>';
?>
<style>
.floors {
    background-size: cover;
    background-position: 0 center;
    background-repeat: no-repeat;
    animation: animatedBackground 20s linear infinite;
    -moz-animation: animatedBackground 20s linear infinite;
    -o-animation: animatedBackground 20s linear infinite;
}
 
@-webkit-keyframes animatedBackground {
    0% { background-position: 0 100%; }
    25% { background-position: 40% 75%; }
    50% { background-position: 80% 50%; }
    75% { background-position: 40% 75%; }
    100% {background-position: 0 100%; }
}
@-moz-keyframes animatedBackground {
    0% { background-position: 0 100%; }
    25% { background-position: 40% 75%; }
    50% { background-position: 80% 50%; }
    75% { background-position: 40% 75%; }
    100% {background-position: 0 100%; }
}
@-o-keyframes animatedBackground {
    0% { background-position: 0 100%; }
    25% { background-position: 40% 75%; }
    50% { background-position: 80% 50%; }
    75% { background-position: 40% 75%; }
    100% {background-position: 0 100%; }
}
@keyframes animatedBackground {
    0% { background-position: 0 100%; }
    25% { background-position: 40% 75%; }
    50% { background-position: 80% 50%; }
    75% { background-position: 40% 75%; }
    100% {background-position: 0 100%; }
}

.floors2:before{
    content:"";
    position: absolute;
    left: -665px;
    top: -460px;
    width: 800px;
    height: 250px;
    background-color: rgba(255,255,255,.3);
    -webkit-transform: rotate(90deg);
    -moz-transform: rotate(90deg);
    -ms-transform: rotate(90deg);
    -o-transform: rotate(90deg);
    transform: rotate(90deg);
    -webkit-animation: searchLights 1s ease-in 1s infinite;
    -o-animation: searchLights 1s ease-in 1s infinite;
    animation: searchLights 1s ease-in 1s infinite;
}
@-webkit-keyframes searchLights {
    0% { left: -500px; top: 50%; }
    to { left: 60%; top: 50%; }
}
@-o-keyframes searchLights {
    0% { left: -500px; top: 50%; }
    to { left: 60%; top: 50%; }
}
@-moz-keyframes searchLights {
    0% { left: -500px; top: 50%; }
    to { left: 60%; top: 50%; }
}
@keyframes searchLights {
    0% { left: -500px; top: 50%; }
    to { left: 60%; top: 50%; }
}

.floors.floors2 {
    overflow: hidden;
    animation: animatedBackground2 20s linear infinite;
    -moz-animation: animatedBackground2 20s linear infinite;
    -o-animation: animatedBackground2 20s linear infinite;
}

@keyframes animatedBackground2 {
    0% { background-position: 0 75%; }
    40% { background-position: 41% 50%; }
    50% { background-position: 41% 50%; }
    90% {background-position: 81% 75%; }
    100% {background-position: 81% 75%; }
}
</style>

<div style="position: relative;">
    <img src="/views/assets/base/img/content/backgrounds/grey-blue-leasing.png" class="wow fadeInUp" data-wow-delay="0.2s" data-wow-offset="300" style="width: 100%; text-align: center;" />
    <img src="/views/assets/base/img/content/backgrounds/leasing-title.png" class="wow slideInRight" data-wow-delay="0.4s" data-wow-offset="300" style="position: absolute; left: 16px; right: 16px; width: 90%; bottom: 0; margin: 0 auto;" />
    <a href="javascript:;" class="wow fadeInUp" data-wow-delay="0.6s" data-wow-offset="300" style="position: absolute; color: #fff; top: 46%; left: 7%; font-size: 14px; font-weight: 700; text-shadow: 0 1px 2px rgba(0,0,0,.6);">开新铺</a>
    <a href="/v2/events?type=events" class="wow fadeInUp" data-wow-delay="0.8s" data-wow-offset="300" style="position: absolute; color: #838383; top: 37%; left: 45%; font-size: 14px; font-weight: 700;">办活动</a>
    <a href="/v2/ads?type=ads" class="wow fadeInUp" data-wow-delay="1.0s" data-wow-offset="300" style="position: absolute; color: #838383; top: 24%; left: 70%; font-size: 14px; font-weight: 700;">做广告</a>
</div>

<div class="page__bd">
    <div class="weui-panel__hd">
        九大主题区
    </div>
    <div class="weui-grids">
        <a href="/v2/leasing?f=1&type=leasing" class="weui-grid wow slideInRight" data-wow-offset="300" style="width: 33%;">
            <div class="weui-grid__icon">
                <img src="/views/assets/base/img/content/backgrounds/sbm/Area/1F.jpg" alt="" style="border-radius: 15px;">
            </div>
            <p class="weui-grid__label">国际时尚品牌旗舰店入驻,滨江露天餐酒空间</p>
        </a>
        <a href="/v2/leasing?f=2&type=leasing" class="weui-grid wow slideInRight" data-wow-offset="300" style="width: 33%;">
            <div class="weui-grid__icon">
                <img src="/views/assets/base/img/content/backgrounds/sbm/Area/2F.jpg" alt="" style="border-radius: 15px;">
            </div>
            <p class="weui-grid__label">爸妈宝贝同乐;  一站式遛娃好去处!</p>
        </a>
        <a href="/v2/leasing?f=3&type=leasing" class="weui-grid wow slideInRight" data-wow-offset="300" style="width: 33%;">
            <div class="weui-grid__icon">
                <img src="/views/assets/base/img/content/backgrounds/sbm/Area/3F.jpg" alt="" style="border-radius: 15px;">
            </div>
            <p class="weui-grid__label">快时尚、少淑女装搭配潮流彩妆,时髦女生必打卡!</p>
        </a>
        <a href="/v2/leasing?f=4&type=leasing" class="weui-grid wow slideInRight" data-wow-offset="300" style="width: 33%;">
            <div class="weui-grid__icon">
                <img src="/views/assets/base/img/content/backgrounds/sbm/Area/4F.jpg" alt="" style="border-radius: 15px;">
            </div>
            <p class="weui-grid__label">运动、数码旗舰林立;行头、装备一个都不能少!</p>
        </a>
        <a href="/v2/leasing?f=5&type=leasing" class="weui-grid wow slideInRight" data-wow-offset="300" style="width: 33%;">
            <div class="weui-grid__icon">
                <img src="/views/assets/base/img/content/backgrounds/sbm/Area/5F.jpg" alt="" style="border-radius: 15px;">
            </div>
            <p class="weui-grid__label">美食、动漫潮店云集,展览、快闪活动不断</p>
        </a>
        <a href="/v2/leasing?f=6&type=leasing" class="weui-grid wow slideInRight" data-wow-offset="300" style="width: 33%;">
            <div class="weui-grid__icon">
                <img src="/views/assets/base/img/content/backgrounds/sbm/Area/6F.jpg" alt="" style="border-radius: 15px;">
            </div>
            <p class="weui-grid__label">怀旧中式家庭场景,"罍+村"带你追忆地道古早味</p>
        </a>
        <a href="/v2/leasing?f=7&type=leasing" class="weui-grid wow slideInRight" data-wow-offset="300" style="width: 33%;">
            <div class="weui-grid__icon">
                <img src="/views/assets/base/img/content/backgrounds/sbm/Area/7F.jpg" alt="" style="border-radius: 15px;">
            </div>
            <p class="weui-grid__label">造型护理、身材管理,从发丝精致到足尖</p>
        </a>
        <a href="/v2/leasing?f=8&type=leasing" class="weui-grid wow slideInRight" data-wow-offset="300" style="width: 33%;">
            <div class="weui-grid__icon">
                <img src="/views/assets/base/img/content/backgrounds/sbm/Area/8F.jpg" alt="" style="border-radius: 15px;">
            </div>
            <p class="weui-grid__label">聚餐、K歌、观影,聚会娱乐不二之选</p>
        </a>
        <a href="javascript:;" class="weui-grid wow slideInRight" data-wow-offset="300" style="width: 33%;">
            <div class="weui-grid__icon">
                <img src="/views/assets/base/img/content/backgrounds/sbm/Area/9F.jpg" alt="" style="border-radius: 15px;">
            </div>
            <p class="weui-grid__label">江景餐厅+联合办公,满足办公、餐饮、社交需求</p>
        </a>
    </div>
</div>

<div class="page__bd">
    <div class="weui-grids" style="background-color: #f0f1f3;">
        <a href="javascript:" class="weui-grid wow fadeInUp" data-wow-delay="1.0s" data-wow-offset="300" style="width: 33.3%">
            <div class="weui-grid__icon">
                <img src="/views/assets/base/img/content/backgrounds/sbm/Area/image-icon1.png" alt="品牌" style="width: 35px; margin: 0 auto;">
            </div>
            <p class="weui-grid__label" style="font-size: 11px; margin-bottom: 5px; text-align: center;">
                品牌
            </p>
            <p class="weui-grid__label" style="font-size: 7px; text-align: center;">超四百知名品牌入驻<br>年销售额32亿元<br>年接待三千万顾客</p>
        </a>
        <a href="javascript:" class="weui-grid wow fadeInUp" data-wow-delay="1.2s" data-wow-offset="300" style="width: 33.3%">
            <div class="weui-grid__icon">
                <img src="/views/assets/base/img/content/backgrounds/sbm/Area/image-icon2.png" alt="技术" style="width: 35px; margin: 0 auto;">
            </div>
            <p class="weui-grid__label" style="font-size: 11px; margin-bottom: 5px; text-align: center;">
                技术
            </p>
            <p class="weui-grid__label" style="font-size: 7px; text-align: center;">价格公开透明<br>选铺精准便捷<br>流程简易安全</p>
        </a>
        <a href="javascript:" class="weui-grid wow fadeInUp" data-wow-delay="1.4s" data-wow-offset="300" style="width: 33.3%">
            <div class="weui-grid__icon">
                <img src="/views/assets/base/img/content/backgrounds/sbm/Area/image-icon3.png" alt="优势" style="width: 35px; margin: 0 auto;">
            </div>
            <p class="weui-grid__label" style="font-size: 11px; margin-bottom: 5px; text-align: center;">
                优势
            </p>
            <p class="weui-grid__label" style="font-size: 7px; text-align: center;">上海浦东黄浦江畔<br>陆家嘴核心地段<br>大型国际化都会购物中心</p>
        </a>
    </div>
</div>

<div class="page__bd">
    <div class="weui-panel__hd">
        各楼层主题
    </div>
    <div class="page__bd_spacing">
        <div class="weui-flex">
            <div class="weui-flex__item wow slideInLeft" data-wow-offset="300">
                <div id="9F" class="floors floors2" onclick="window.location='/v2/leasing?f=9&type=leasing'" style="display: none; position: relative; background: url(/views/assets/base/img/content/backgrounds/sbm/Floor/9F.jpg);">
                    <img src="/views/assets/base/img/content/backgrounds/sbm/Floor/09F.png" alt="09F" height="35" style="position: absolute; bottom: 20px; left: 20px;" />
                </div>
                <div id="8F" class="floors floors2" onclick="window.location='/v2/leasing?f=8&type=leasing'" style="display: none; position: relative; background: url(/views/assets/base/img/content/backgrounds/sbm/Floor/8F.jpg);">
                    <img src="/views/assets/base/img/content/backgrounds/sbm/Floor/08F.png" alt="08F" height="35" style="position: absolute; bottom: 20px; left: 20px;" /> 
                </div>
                <div id="7F" class="floors floors2" onclick="window.location='/v2/leasing?f=7&type=leasing'" style="display: none; position: relative; background: url(/views/assets/base/img/content/backgrounds/sbm/Floor/7F.jpg);">
                    <img src="/views/assets/base/img/content/backgrounds/sbm/Floor/07F.png" alt="07F" height="35" style="position: absolute; bottom: 20px; left: 20px;" /> 
                </div>                
                <div id="6F" class="floors" onclick="window.location='/v2/leasing?f=6&type=leasing'" style="display: none; position: relative; background: url(/views/assets/base/img/content/backgrounds/sbm/Floor/6F.jpg);">
                    <img src="/views/assets/base/img/content/backgrounds/sbm/Floor/06F.png" alt="06F" height="35" style="position: absolute; bottom: 20px; left: 20px;" />
                </div>                
                <div id="5F" class="floors floors2" onclick="window.location='/v2/leasing?f=5&type=leasing'" style="display: none; position: relative; background: url(/views/assets/base/img/content/backgrounds/sbm/Floor/5F.jpg);">
                    <img src="/views/assets/base/img/content/backgrounds/sbm/Floor/05F.png" alt="05F" height="35" style="position: absolute; bottom: 20px; left: 20px;" /> 
                </div>
                <div id="4F" class="floors floors2" onclick="window.location='/v2/leasing?f=4&type=leasing'" style="position: relative; background: url(/views/assets/base/img/content/backgrounds/sbm/Floor/4F.jpg);">
                    <img src="/views/assets/base/img/content/backgrounds/sbm/Floor/04F.png" alt="04F" height="35" style="position: absolute; bottom: 20px; left: 20px;" /> 
                </div>
                <div id="3F" class="floors" onclick="window.location='/v2/leasing?f=3&type=leasing'" style="display: none; position: relative; background: url(/views/assets/base/img/content/backgrounds/sbm/Floor/3F.jpg);">
                    <img src="/views/assets/base/img/content/backgrounds/sbm/Floor/03F.png" alt="03F" height="35" style="position: absolute; bottom: 20px; left: 20px;" />
                </div>
                <div class="slide" onclick="window.location='/v2/leasing?f=2&type=leasing'" style="max-height: 100%; margin-right: 20px;">
                    <ul id="2F" style="display: none;"> 
                        <li>
                            <a href="javascript:;">
                                <img src="/views/assets/base/img/content/backgrounds/sbm/Floor/2F-1.jpg" alt="" style="border-radius: 25px;">
                            </a>
                        </li>
                        <li>
                            <a href="javascript:;">
                                <img src="/views/assets/base/img/content/backgrounds/sbm/Floor/2F-2.jpg" alt="" style="border-radius: 25px;">
                            </a>
                        </li>
                        <li>
                            <a href="javascript:;">
                                <img src="/views/assets/base/img/content/backgrounds/sbm/Floor/2F-3.jpg" alt="" style="border-radius: 25px;">
                            </a>
                        </li>
                        <li>
                            <a href="javascript:;">
                                <img src="/views/assets/base/img/content/backgrounds/sbm/Floor/2F-4.jpg" alt="" style="border-radius: 25px;">
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="slide" onclick="window.location='/v2/leasing?f=1&type=leasing'" style="max-height: 100%; margin-right: 20px;">
                    <ul id="1F" style="display: none;"> 
                        <li>
                            <a href="javascript:;">
                                <img src="/views/assets/base/img/content/backgrounds/sbm/Floor/1F-1.jpg" alt="" style="border-radius: 25px;">
                            </a>
                        </li>
                        <li>
                            <a href="javascript:;">
                                <img src="/views/assets/base/img/content/backgrounds/sbm/Floor/1F-2.jpg" alt="" style="border-radius: 25px;">
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="slide" onclick="window.location='/v2/leasing?f=0&type=leasing'" style="max-height: 100%; margin-right: 20px;">
                    <ul id="B1F" style="display: none;"> 
                        <li>
                            <a href="javascript:;">
                                <img src="/views/assets/base/img/content/backgrounds/sbm/Floor/B1F-1.jpg" alt="" style="border-radius: 25px;">
                            </a>
                        </li>
                        <li>
                            <a href="javascript:;">
                                <img src="/views/assets/base/img/content/backgrounds/sbm/Floor/B1F-2.jpg" alt="" style="border-radius: 25px;">
                            </a>
                        </li>
                    </ul>
                </div>
                
                <div id="9F_desc" class="floors_desc" style="display: none; width: 50%;font-size: 12px;margin-top: 5px;">一线江景餐厅、联合办公复合业态，正大集团携手MUSE GROUP 精心打造！</div>
                <div id="8F_desc" class="floors_desc" style="display: none; width: 50%;font-size: 12px;margin-top: 5px;">聚餐、K歌、观影，聚会娱乐不二之选！</div>
                <div id="7F_desc" class="floors_desc" style="display: none; width: 50%;font-size: 12px;margin-top: 5px;">造型护理、身材管理，从发丝精致到足尖</div>
                <div id="6F_desc" class="floors_desc" style="display: none; width: 50%;font-size: 12px;margin-top: 5px;">怀旧中式家庭场景，“罍+村”带你追忆地道古早味</div>
                <div id="5F_desc" class="floors_desc" style="display: none; width: 50%;font-size: 12px;margin-top: 5px;">美食、动漫潮店云集，展览、快闪活动不断！</div>
                <div id="4F_desc" class="floors_desc" style="display: none; width: 50%;font-size: 12px;margin-top: 5px;">运动、数码旗舰林立，行头、装备一个都不能少！</div>
                <div id="3F_desc" class="floors_desc" style="width: 50%;font-size: 12px;margin-top: 5px;">少淑女装、潮流彩妆、甜品咖啡，时髦女孩必打卡！</div>
                <div id="2F_desc" class="floors_desc" style="display: none; width: 50%;font-size: 12px;margin-top: 5px;">爸妈宝贝同乐，一站式遛娃好去处！</div>
                <div id="1F_desc" class="floors_desc" style="display: none; width: 50%;font-size: 12px;margin-top: 5px;">国际时尚品牌旗舰店入驻，滨江露天花园餐酒空间</div>
                <div id="B1F_desc" class="floors_desc" style="display: none; width: 50%;font-size: 12px;margin-top: 5px;">各项配套，生活服务好去处</div>
            </div>
            <div>
                <div class="macaroon wow slideInRight" data-wow-offset="600">
                    <a href="javascript: showFloorImg('9F')">
                        <img src="/views/assets/base/img/content/backgrounds/sbm/macaroon/9F.png" alt="9F">
                    </a>
                    <a href="javascript: showFloorImg('8F')">
                        <img src="/views/assets/base/img/content/backgrounds/sbm/macaroon/8F.png" alt="8F">
                    </a>
                    <a href="javascript: showFloorImg('7F')">
                        <img src="/views/assets/base/img/content/backgrounds/sbm/macaroon/7F.png" alt="7F">
                    </a>
                    <a href="javascript: showFloorImg('6F')">
                        <img src="/views/assets/base/img/content/backgrounds/sbm/macaroon/6F.png" alt="6F">
                    </a>
                    <a href="javascript: showFloorImg('5F')">
                        <img src="/views/assets/base/img/content/backgrounds/sbm/macaroon/5F.png" alt="5F">
                    </a>
                    <a href="javascript: showFloorImg('4F')" class="active">
                        <img src="/views/assets/base/img/content/backgrounds/sbm/macaroon/4F.png" alt="4F">
                    </a>
                    <a href="javascript: showFloorImg('3F')">
                        <img src="/views/assets/base/img/content/backgrounds/sbm/macaroon/3F.png" alt="3F">
                    </a>
                    <a href="javascript: showFloorSlide('2F')">
                        <img src="/views/assets/base/img/content/backgrounds/sbm/macaroon/2F.png" alt="2F">
                    </a>
                    <a href="javascript: showFloorSlide('1F')">
                        <img src="/views/assets/base/img/content/backgrounds/sbm/macaroon/1F.png" alt="1F">
                    </a>
                    <a href="javascript: showFloorSlide('B1F')">
                        <img src="/views/assets/base/img/content/backgrounds/sbm/macaroon/B1.png" alt="B1">
                    </a>
                </div>
            </div>
        </div>
    </div>
    <!--<div style="margin-top: -10px; background-color: #3f3f3f; color: #fff;">
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
    </div>-->

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

<br>

<?php include ('menu_bottom.php'); ?>

<?php include ('footer.php'); ?>