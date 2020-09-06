<?php
$scripts = $scripts . '<script type="text/javascript" src="/views/assets/plugins/jquery.imagemapster.js"></script>'
        . '<script type="text/javascript" src="/views/assets/base/js/v2/ly-admin.js"></script>';
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
</style>

<div style="position: relative; margin-bottom: 20px;">
    <img src="/views/assets/base/img/content/backgrounds/grey-blue-leasing.png" class="wow fadeInUp" data-wow-delay="0.2s" data-wow-offset="300" style="width: 100%; text-align: center;" />
    <img src="/views/assets/base/img/content/backgrounds/leasing-title.png" class="wow slideInRight" data-wow-delay="0.4s" data-wow-offset="300" style="position: absolute; left: 16px; right: 16px; width: 90%; bottom: 0; margin: 0 auto;" />
    <a href="javascript:;" class="wow fadeInUp" data-wow-delay="0.6s" data-wow-offset="300" style="position: absolute; color: #fff; top: 46%; left: 7%; font-size: 14px; font-weight: 700; text-shadow: 0 1px 2px rgba(0,0,0,.6);">开新铺</a>
    <a href="/v2/events-ly?type=events" class="wow fadeInUp" data-wow-delay="0.8s" data-wow-offset="300" style="position: absolute; color: #838383; top: 37%; left: 45%; font-size: 14px; font-weight: 700;">办活动</a>
    <a href="/v2/ads-ly?type=ads" class="wow fadeInUp" data-wow-delay="1.0s" data-wow-offset="300" style="position: absolute; color: #838383; top: 24%; left: 70%; font-size: 14px; font-weight: 700;">做广告</a>
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
                                    <img class="weui-media-box__thumb" src="/views/assets/base/img/content/backgrounds/ly/mall-view.jpg" alt="" style="border-top-left-radius: 10px; border-top-right-radius: 10px;">
                                </div>
                                <div style="position: relative; margin: 10px 0 0 15px;">
                                    <b style="font-size: 20px;">洛阳正大国际广场</b><small class="weui-cell__bd" style="margin-right: 40px; display: block; font-size: 12px;">
                                        位于开元大道以南、展览路以北、厚载门街以西、长兴街以东，毗邻市政府，面朝亚洲最大音乐喷泉"开元湖"。北距隋唐洛阳城厚载门遗址仅一公里，南距洛阳龙门站(高铁)仅两公里，总停车位1,229个，B1层拥有可容纳8辆旅游大巴停放的专用车位
                                    </small>
                                </div>
                                <div style="margin: 5px 15px 10px;">
                                    <span class="weui-mark-rb">建筑面积 17.8万方</span>
                                    <span class="weui-mark-rb">租赁面积 6.9万方</span>
                                </div>
                            </div>
                        </div>
                        <h3 style="margin: 18px; color: #ccb57a;">国际知名设计团队倾力打造</h3>
                        <img src="/views/assets/base/img/content/backgrounds/ly/architector.jpg" style="width: 100%; margin-top: -10px;" />
                        <div class="weui-grids" style="background-color: #f0f1f3; margin-top: -5px;">
                            <a href="javascript:" class="weui-grid wow fadeInUp" data-wow-delay="1.0s" data-wow-offset="300" style="width: 33.3%">
                                <div class="weui-grid__icon">
                                    <img src="/views/assets/base/img/content/backgrounds/sbm/Area/image-icon1.png" alt="品牌" style="width: 35px; margin: 0 auto;">
                                </div>
                                <p class="weui-grid__label" style="font-size: 11px; margin-bottom: 5px; text-align: center;">
                                    交通
                                </p>
                                <p class="weui-grid__label" style="font-size: 7px; text-align: center;">距高铁龙门站车程3分钟<br>距洛阳火车站车程21分钟<br>距洛阳东车站车程27分钟</p>
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
                                <p class="weui-grid__label" style="font-size: 7px; text-align: center;">神都洛阳，城市中央<br>开元湖畔，厚载门前<br>牡丹园文化主题步行街</p>
                            </a>
                        </div>
                        <img src="/views/assets/base/img/content/backgrounds/ly/map.jpg" style="width: 100%; margin-top: -10px;" />
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
                                <div id="7F" class="floors floor_plan" style="display: none; position: relative; background: url(/views/assets/base/img/content/backgrounds/ly/Floor/7F.jpg);">
                                    <img src="/views/assets/base/img/content/backgrounds/ly/Floor/07F.png" alt="07F" height="35" style="position: absolute; bottom: 20px; left: 20px;" /> 
                                </div>                
                                <div id="6F" class="floors floor_plan" style="display: none; position: relative; background: url(/views/assets/base/img/content/backgrounds/ly/Floor/6F.jpg);">
                                    <img src="/views/assets/base/img/content/backgrounds/ly/Floor/06F.png" alt="06F" height="35" style="position: absolute; bottom: 20px; left: 20px;" />
                                </div>                
                                <div id="5F" class="floors floor_plan" style="display: none; position: relative; background: url(/views/assets/base/img/content/backgrounds/ly/Floor/5F.jpg);">
                                    <img src="/views/assets/base/img/content/backgrounds/ly/Floor/05F.png" alt="05F" height="35" style="position: absolute; bottom: 20px; left: 20px;" /> 
                                </div>
                                <div id="4F" class="floors floor_plan" style="display: none; position: relative; background: url(/views/assets/base/img/content/backgrounds/ly/Floor/4F.jpg);">
                                    <img src="/views/assets/base/img/content/backgrounds/ly/Floor/04F.png" alt="04F" height="35" style="position: absolute; bottom: 20px; left: 20px;" /> 
                                </div>
                                <div id="3F" class="floors floor_plan" style="display: none; position: relative; background: url(/views/assets/base/img/content/backgrounds/ly/Floor/3F.jpg);">
                                    <img src="/views/assets/base/img/content/backgrounds/ly/Floor/03F.png" alt="03F" height="35" style="position: absolute; bottom: 20px; left: 20px;" />
                                </div>
                                <div id="2F" class="floors floor_plan" style="display: none; position: relative; background: url(/views/assets/base/img/content/backgrounds/ly/Floor/2F.jpg);">
                                    <img src="/views/assets/base/img/content/backgrounds/ly/Floor/02F.png" alt="02F" height="35" style="position: absolute; bottom: 20px; left: 20px;" />
                                </div>
                                <div id="1F" class="floors floor_plan" style="position: relative; background: url(/views/assets/base/img/content/backgrounds/ly/Floor/1F.jpg);">
                                    <img src="/views/assets/base/img/content/backgrounds/ly/Floor/01F.png" alt="01F" height="35" style="position: absolute; bottom: 20px; left: 20px;" />
                                </div>
                                <div id="B1F" class="floors floor_plan" style="display: none; position: relative; background: url(/views/assets/base/img/content/backgrounds/ly/Floor/B1F.jpg);">
                                    <img src="/views/assets/base/img/content/backgrounds/ly/Floor/B1F.png" alt="B1F" height="35" style="position: absolute; bottom: 20px; left: 20px;" />
                                </div>

                                <div id="7F_desc" class="floors_desc" style="display: none; margin-top: 10px;">如入其境，大型电影梦工厂</div>
                                <div id="6F_desc" class="floors_desc" style="display: none; margin-top: 10px;">怀聚会首选，品类齐全任君选</div>
                                <div id="5F_desc" class="floors_desc" style="display: none; margin-top: 10px;">运动健康，创造fun时代</div>
                                <div id="4F_desc" class="floors_desc" style="display: none; margin-top: 10px;">亲子同乐，乐享其中</div>
                                <div id="3F_desc" class="floors_desc" style="display: none; margin-top: 10px;">囊括品牌男装，彰显个性休闲</div>
                                <div id="2F_desc" class="floors_desc" style="display: none; margin-top: 10px;">汇聚时尚设计精品，摩登都市的个性领地</div>
                                <div id="1F_desc" class="floors_desc" style="margin-top: 10px;">国际一线快时尚，紧跟最新时尚潮流</div>
                                <div id="B1F_desc" class="floors_desc" style="display: none; margin-top: 10px;">精品生活集市，体会文化传承，乐享高端生活</div>
                            </div>
                            <div style="margin-top: -30px;">
                                <div class="macaroon">
                                    <a href="javascript: showFloorImg('7F')">
                                        <img src="/views/assets/base/img/content/backgrounds/ly/macaroon/7F.png" alt="7F">
                                    </a>
                                    <a href="javascript: showFloorImg('6F')">
                                        <img src="/views/assets/base/img/content/backgrounds/ly/macaroon/6F.png" alt="6F">
                                        <span class="weui-badge" style="position: absolute; top: -0.4em; right: -0.4em;">1</span>
                                    </a>
                                    <a href="javascript: showFloorImg('5F')">
                                        <img src="/views/assets/base/img/content/backgrounds/ly/macaroon/5F.png" alt="5F">
                                    </a>
                                    <a href="javascript: showFloorImg('4F')">
                                        <img src="/views/assets/base/img/content/backgrounds/ly/macaroon/4F.png" alt="4F">
                                        <span class="weui-badge" style="position: absolute; top: -0.4em; right: -0.4em;">2</span>
                                    </a>
                                    <a href="javascript: showFloorImg('3F')">
                                        <img src="/views/assets/base/img/content/backgrounds/ly/macaroon/3F.png" alt="3F">
                                    </a>
                                    <a href="javascript: showFloorSlide('2F')">
                                        <img src="/views/assets/base/img/content/backgrounds/ly/macaroon/2F.png" alt="2F">
                                        <span class="weui-badge" style="position: absolute; top: -0.4em; right: -0.4em;">1</span>
                                    </a>
                                    <a href="javascript: showFloorSlide('1F')" class="active">
                                        <img src="/views/assets/base/img/content/backgrounds/ly/macaroon/1F.png" alt="1F">
                                    </a>
                                    <a href="javascript: showFloorSlide('B1F')">
                                        <img src="/views/assets/base/img/content/backgrounds/ly/macaroon/B1.png" alt="B1">
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
                            <iframe src="https://720yun.com/t/29vksq790ie?scene_id=53502941" width="100%" frameborder="0" style="height: 90vh;"></iframe>
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