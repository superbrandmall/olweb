<?php
$scripts = $scripts . '<script type="text/javascript" src="/views/assets/plugins/jquery.imagemapster.js"></script>'
        . '<script type="text/javascript" src="/views/assets/base/js/v2/ljz-admin.js"></script>';
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

<div style="position: relative; margin-bottom: 20px;">
    <img src="/views/assets/base/img/content/backgrounds/grey-blue-leasing.png" class="wow fadeInUp" data-wow-delay="0.2s" data-wow-offset="300" style="width: 100%; text-align: center;" />
    <img src="/views/assets/base/img/content/backgrounds/leasing-title.png" class="wow slideInRight" data-wow-delay="0.4s" data-wow-offset="300" style="position: absolute; left: 16px; right: 16px; width: 90%; bottom: 0; margin: 0 auto;" />
    <a href="javascript:;" class="wow fadeInUp" data-wow-delay="0.6s" data-wow-offset="300" style="position: absolute; color: #fff; top: 46%; left: 7%; font-size: 14px; font-weight: 700; text-shadow: 0 1px 2px rgba(0,0,0,.6);">开新铺</a>
    <a href="/v2/events?type=events" class="wow fadeInUp" data-wow-delay="0.8s" data-wow-offset="300" style="position: absolute; color: #838383; top: 37%; left: 45%; font-size: 14px; font-weight: 700;">办活动</a>
    <a href="/v2/ads?type=ads" class="wow fadeInUp" data-wow-delay="1.0s" data-wow-offset="300" style="position: absolute; color: #838383; top: 24%; left: 70%; font-size: 14px; font-weight: 700;">做广告</a>
</div>

<div class="page__bd">
    <ul class="collapse">
        <li class="js-show">
            <div class="weui-flex js-category">
                <div class="weui-flex__item"><i class="fa fa-bullhorn" aria-hidden="true"></i> 项目介绍</div>
                <i class="icon icon-74"></i>
            </div>
            <div class="page-category js-categoryInner">
                <div class="weui-cells page-category-content">
                    <div class="content">
                        <div class="weui-media-box weui-media-box_appmsg" style="padding: 0;">
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
                        <img src="/views/assets/base/img/content/backgrounds/sbm/jerde.jpg" style="width: 100%;" />
                        <img src="/views/assets/base/img/content/backgrounds/sbm/architector.jpg" style="width: 100%; margin-top: -10px;" />
                        <div class="weui-grids" style="background-color: #f0f1f3; margin-top: -5px;">
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
                        <img src="/views/assets/base/img/content/backgrounds/sbm/map.jpg" style="width: 100%; margin-top: -10px;" />
                    </div>
                </div>
            </div>
        </li>
        <li>
            <div class="weui-flex js-category">
                <div class="weui-flex__item"><i class="fa fa-diamond" aria-hidden="true"></i> 各楼层主题区</div>
                <i class="icon icon-74"></i>
            </div>
            <div class="page-category js-categoryInner">
                <div class="weui-cells page-category-content">
                    <div class="content">
                        <div class="weui-flex">
                            <div class="weui-flex__item">
                                <div id="9F" class="floors floors2 floor_plan" style="display: none; position: relative; background: url(/views/assets/base/img/content/backgrounds/sbm/Floor/9F.jpg);">
                                    <img src="/views/assets/base/img/content/backgrounds/sbm/Floor/09F.png" alt="09F" height="35" style="position: absolute; bottom: 20px; left: 20px;" />
                                </div>
                                <div id="8F" class="floors floors2 floor_plan" style="display: none; position: relative; background: url(/views/assets/base/img/content/backgrounds/sbm/Floor/8F.jpg);">
                                    <img src="/views/assets/base/img/content/backgrounds/sbm/Floor/08F.png" alt="08F" height="35" style="position: absolute; bottom: 20px; left: 20px;" /> 
                                </div>
                                <div id="7F" class="floors floors2 floor_plan" style="display: none; position: relative; background: url(/views/assets/base/img/content/backgrounds/sbm/Floor/7F.jpg);">
                                    <img src="/views/assets/base/img/content/backgrounds/sbm/Floor/07F.png" alt="07F" height="35" style="position: absolute; bottom: 20px; left: 20px;" /> 
                                </div>                
                                <div id="6F" class="floors floors2 floor_plan" style="display: none; position: relative; background: url(/views/assets/base/img/content/backgrounds/sbm/Floor/6F.jpg);">
                                    <img src="/views/assets/base/img/content/backgrounds/sbm/Floor/06F.png" alt="06F" height="35" style="position: absolute; bottom: 20px; left: 20px;" />
                                </div>                
                                <div id="5F" class="floors floors2 floor_plan" style="display: none; position: relative; background: url(/views/assets/base/img/content/backgrounds/sbm/Floor/5F.jpg);">
                                    <img src="/views/assets/base/img/content/backgrounds/sbm/Floor/05F.png" alt="05F" height="35" style="position: absolute; bottom: 20px; left: 20px;" /> 
                                </div>
                                <div id="4F" class="floors floors2 floor_plan" style="display: none; position: relative; background: url(/views/assets/base/img/content/backgrounds/sbm/Floor/4F.jpg);">
                                    <img src="/views/assets/base/img/content/backgrounds/sbm/Floor/04F.png" alt="04F" height="35" style="position: absolute; bottom: 20px; left: 20px;" /> 
                                </div>
                                <div id="3F" class="floors floors2 floor_plan" style="position: relative; background: url(/views/assets/base/img/content/backgrounds/sbm/Floor/3F.jpg);">
                                    <img src="/views/assets/base/img/content/backgrounds/sbm/Floor/03F.png" alt="03F" height="35" style="position: absolute; bottom: 20px; left: 20px;" />
                                </div>
                                <div class="slide" style="max-height: 100%; margin-right: 20px;">
                                    <ul id="2F" class="floor_plan" style="display: none;"> 
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
                                <div id="1F" class="floors floors2 floor_plan" style="display: none; position: relative; background: url(/views/assets/base/img/content/backgrounds/sbm/Floor/1F.jpg);">
                                    <img src="/views/assets/base/img/content/backgrounds/sbm/Floor/01F.png" alt="08F" height="35" style="position: absolute; bottom: 20px; left: 20px;" /> 
                                </div>
                                <div id="B1F" class="floors floors2 floor_plan" style="display: none; position: relative; background: url(/views/assets/base/img/content/backgrounds/sbm/Floor/B1F.jpg);">
                                    <img src="/views/assets/base/img/content/backgrounds/sbm/Floor/B1F.png" alt="B1F" height="35" style="position: absolute; bottom: 20px; left: 20px;" /> 
                                </div>

                                <div id="9F_desc" class="floors_desc" style="display: none; margin-top: 10px;">一线江景餐厅、联合办公复合业态，正大集团携手MUSE GROUP 精心打造！</div>
                                <div id="8F_desc" class="floors_desc" style="display: none; margin-top: 10px;">聚餐、K歌、观影，聚会娱乐不二之选！</div>
                                <div id="7F_desc" class="floors_desc" style="display: none; margin-top: 10px;">造型护理、身材管理，从发丝精致到足尖</div>
                                <div id="6F_desc" class="floors_desc" style="display: none; margin-top: 10px;">怀旧中式家庭场景，“罍+村”带你追忆地道古早味</div>
                                <div id="5F_desc" class="floors_desc" style="display: none; margin-top: 10px;">美食、动漫潮店云集，展览、快闪活动不断！</div>
                                <div id="4F_desc" class="floors_desc" style="display: none; margin-top: 10px;">运动、数码旗舰林立，行头、装备一个都不能少！</div>
                                <div id="3F_desc" class="floors_desc" style="margin-top: 10px;">少淑女装、潮流彩妆、甜品咖啡，时髦女孩必打卡！</div>
                                <div id="2F_desc" class="floors_desc" style="display: none; margin-top: 10px;">爸妈宝贝同乐，一站式遛娃好去处！</div>
                                <div id="1F_desc" class="floors_desc" style="display: none; margin-top: 10px;">国际时尚品牌旗舰店入驻，滨江露天花园餐酒空间</div>
                                <div id="B1F_desc" class="floors_desc" style="display: none; margin-top: 10px;">各项配套，生活服务好去处</div>
                            </div>
                            <div style="margin-top: -30px;">
                                <div class="macaroon">
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
                                    <a href="javascript: showFloorImg('4F')">
                                        <img src="/views/assets/base/img/content/backgrounds/sbm/macaroon/4F.png" alt="4F">
                                    </a>
                                    <a href="javascript: showFloorImg('3F')" class="active">
                                        <img src="/views/assets/base/img/content/backgrounds/sbm/macaroon/3F.png" alt="3F">
                                        <span class="weui-badge" style="position: absolute; top: -0.4em; right: -0.4em;">2</span>
                                    </a>
                                    <a href="javascript: showFloorSlide('2F')">
                                        <img src="/views/assets/base/img/content/backgrounds/sbm/macaroon/2F.png" alt="2F">
                                    </a>
                                    <a href="javascript: showFloorSlide('1F')">
                                        <img src="/views/assets/base/img/content/backgrounds/sbm/macaroon/1F.png" alt="1F">
                                        <span class="weui-badge" style="position: absolute; top: -0.4em; right: -0.4em;">1</span>
                                    </a>
                                    <a href="javascript: showFloorSlide('B1F')">
                                        <img src="/views/assets/base/img/content/backgrounds/sbm/macaroon/B1.png" alt="B1">
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </li>
        <li>
            <div class="weui-flex js-category">
                <div class="weui-flex__item"><i class="fa fa-star-o" aria-hidden="true"></i> 铺位推荐</div>
                <i class="icon icon-74"></i>
            </div>
            <div class="page-category js-categoryInner">
                <div class="weui-cells page-category-content">
                    <div class="content">
                        <div id="empty_stores" class="weui-grids"></div>
                    </div>
                </div>
            </div>
        </li>
        <li>
            <div class="weui-flex js-category" onclick="javascript: showVR();">
                <div class="weui-flex__item"><i class="fa fa-street-view" aria-hidden="true"></i> 360°全景</div>
                <i class="icon icon-74"></i>
            </div>
            <div class="page-category js-categoryInner">
                <div class="weui-cells page-category-content">
                    <div class="content">
                        <div id="vr_viewer" class="weui-gallery" style="position: relative;">
                            <iframe src="https://720yun.com/t/d0vksldepqe?scene_id=43986975" width="100%" frameborder="0" style="height: 90vh;"></iframe>
                            <div class="weui-gallery__opr" style="position: relative;">
                                <a href="javascript:" class="weui-gallery__del">
                                    <i class="fa fa-times" aria-hidden="true" style="color: #fff;" onclick="javascript: closeVR(this);"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    </ul>
</div>

<div class="js_dialog" id="floor_plan_viewer" style="display: none;">
    <div class="weui-mask"></div>
    <div class="weui-dialog">
        <div class="weui-dialog__bd" style="padding: 0; margin: 0;">
            <a href="javascript:" class="weui-dialog__btn weui-dialog__btn_primary" style="top: 0px; right: 10px; position: absolute;">x</a>
            <div style="margin: 10px; color: #565d66;">
                <strong id="floorNo"></strong>
                <span style="margin-left: 9px; background-color: #F26A85; border: solid 1px #DC143C; height: 10px; width: 15px; display: inline-block;"></span> 推荐位置    
                <a id="floorVRLink" href='javascript:;' style="margin-left: 9px; display: inline-block; color: #F26A85;"><i class="fa fa-street-view" aria-hidden="true"></i> 360°全景</a> 
            </div>
    
            <img src="#" width="320px" height="160px" id="map">
        </div>
        <div class="weui-dialog__ft" style="line-height: 28px; min-height: 28px;">
            
        </div>
    </div>
</div>

<div id="floor_vr" class="weui-gallery" style="display: none; z-index: 2000;">
    <iframe src="javascript:;" width="100%" frameborder="0" style="height: 90vh;"></iframe>
    <div class="weui-gallery__opr">
        <a href="javascript:" class="weui-gallery__del">
            <i class="fa fa-times" aria-hidden="true" style="color: #fff;" onclick='$("#floor_vr iframe").attr("src","javascript:;");  $("#floor_vr").hide();'></i>
        </a>
    </div>
</div>

<br><br><br>

<?php include ('menu_bottom.php'); ?>

<?php include ('footer.php'); ?>