<?php
$scripts = $scripts . '<script type="text/javascript" src="/views/assets/base/js/v2/events-admin.js"></script>';
?>

<div style="position: relative;">
    <img src="/views/assets/base/img/content/backgrounds/grey-blue-events.png" class="wow fadeInUp" data-wow-delay="0.2s" data-wow-offset="300" style="width: 100%; text-align: center;" />
    <img src="/views/assets/base/img/content/backgrounds/events-title.png" class="wow slideInRight" data-wow-delay="0.4s" data-wow-offset="300" style="position: absolute; left: 16px; right: 16px; width: 90%; bottom: 0; margin: 0 auto;" />
    <a href="/v2/ly?type=leasing" class="wow fadeInUp" data-wow-delay="0.6s" data-wow-offset="300" style="position: absolute; color: #838383; top: 46%; left: 7%; font-size: 14px; font-weight: 700;">开新铺</a>
    <a href="javascript:;" class="wow fadeInUp" data-wow-delay="0.8s" data-wow-offset="300" style="position: absolute; color: #fff; top: 37%; left: 45%; font-size: 14px; font-weight: 700; text-shadow: 0 1px 2px rgba(0,0,0,.6);">办活动</a>
    <a href="/v2/ads-ly?type=ads" class="wow fadeInUp" data-wow-delay="1.0s" data-wow-offset="300" style="position: absolute; color: #838383; top: 24%; left: 70%; font-size: 14px; font-weight: 700;">做广告</a>
</div>

<div class="page__bd">
    <?php include ('timeline/step_one.php'); ?>    
    <div class="weui-panel__hd">
        3个场地区
    </div>
    <div class="weui-panel__bd">
        <div class="weui-media-box weui-media-box_appmsg" style="background: rgb(245, 245, 245); padding: 0; margin: 0 16px 16px;">
            <div class="weui-media-box__bd">
                <div style="position: relative;">
                    <div class="slide">
                        <ul>
                            <li>
                                <img onclick='javascript: showGallery("/views/assets/base/img/content/backgrounds/events/OLSHOP190625000002_1.jpg");' class="weui-media-box__thumb" src="/views/assets/base/img/content/backgrounds/events/OLSHOP190625000002_1.jpg" alt="" style="border-top-left-radius: 10px; border-top-right-radius: 10px;">
                            </li>
                            <li>
                                <img onclick='javascript: showGallery("/views/assets/base/img/content/backgrounds/events/OLSHOP190625000002_2.jpg");' class="weui-media-box__thumb" src="/views/assets/base/img/content/backgrounds/events/OLSHOP190625000002_2.jpg" alt="" style="border-top-left-radius: 10px; border-top-right-radius: 10px;">
                            </li>
                        </ul>
                        <div class="dot" style="right: 50%;">
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                    <ul class="leasing-areas">
                        <li><a href='javascript: showVR("https://720yun.com/t/29vksq790ie?scene_id=53502944");'>VR</a></li>
                        <li><a href="/v2/event?id=OLSHOP190625000002&type=events&storeCode=OLMALL190117000001">查看详情</a></li>
                    </ul>
                </div>
                <div class="weui-cell_select" onclick="window.location='/v2/event?id=OLSHOP190625000002&type=events&storeCode=OLMALL190117000001'" style="position: relative; margin: 10px 0 0 15px;">
                    <p style="font-size: 14px;">1F东厅</p>
                    <small class="weui-cell__bd" style="margin-right: 40px; display: block; font-size: 12px;">展会类、生活类、文化类、娱乐类、时尚类</small>
                </div>
                <div style="margin: 5px 15px 10px;">
                    <span class="weui-mark-rb">1F东厅</span>
                    <span class="weui-mark-rb">306.77m²</span>
                </div>
            </div>
        </div>
    </div>
    <div class="weui-panel__bd">
        <div class="weui-media-box weui-media-box_appmsg" style="background: rgb(245, 245, 245); padding: 0; margin: 0 16px 16px;">
            <div class="weui-media-box__bd">
                <div style="position: relative;">
                    <div class="slide">
                        <ul>
                            <li>
                                <img onclick='javascript: showGallery("/views/assets/base/img/content/backgrounds/events/OLSHOP190625000001_1.jpg");' class="weui-media-box__thumb" src="/views/assets/base/img/content/backgrounds/events/OLSHOP190625000001_1.jpg" alt="" style="border-top-left-radius: 10px; border-top-right-radius: 10px;">
                            </li>
                            <li>
                                <img onclick='javascript: showGallery("/views/assets/base/img/content/backgrounds/events/OLSHOP190625000001_2.jpg");' class="weui-media-box__thumb" src="/views/assets/base/img/content/backgrounds/events/OLSHOP190625000001_2.jpg" alt="" style="border-top-left-radius: 10px; border-top-right-radius: 10px;">
                            </li>
                        </ul>
                        <div class="dot" style="right: 50%;">
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                    <ul class="leasing-areas">
                        <li><a href='javascript: showVR("https://720yun.com/t/29vksq790ie?scene_id=53502942");'>VR</a></li>
                        <li><a href="/v2/event?id=OLSHOP190625000001&type=events&storeCode=OLMALL190117000001">查看详情</a></li>
                    </ul>
                </div>
                <div class="weui-cell_select" onclick="window.location='/v2/event?id=OLSHOP190625000001&type=events&storeCode=OLMALL190117000001'" style="position: relative; margin: 10px 0 0 15px;">
                    <p style="font-size: 14px;">1F西厅</p>
                    <small class="weui-cell__bd" style="margin-right: 40px; display: block; font-size: 12px;">展会类、生活类、文化类、娱乐类、时尚类</small>
                </div>
                <div style="margin: 5px 15px 10px;">
                    <span class="weui-mark-rb">1F西厅</span>
                    <span class="weui-mark-rb">200m²</span>
                </div>
            </div>
        </div>
    </div>
    <div class="weui-panel__bd">
        <div class="weui-media-box weui-media-box_appmsg" style="background: rgb(245, 245, 245); padding: 0; margin: 0 16px 16px;">
            <div class="weui-media-box__bd">
                <div style="position: relative;">
                    <div class="slide">
                        <ul>
                            <li>
                                <img onclick='javascript: showGallery("/views/assets/base/img/content/backgrounds/events/OLSHOP190625000003_1.jpg");' class="weui-media-box__thumb" src="/views/assets/base/img/content/backgrounds/events/OLSHOP190625000003_1.jpg" alt="" style="border-top-left-radius: 10px; border-top-right-radius: 10px;">
                            </li>
                            <li>
                                <img onclick='javascript: showGallery("/views/assets/base/img/content/backgrounds/events/OLSHOP190625000003_2.jpg");' class="weui-media-box__thumb" src="/views/assets/base/img/content/backgrounds/events/OLSHOP190625000003_2.jpg" alt="" style="border-top-left-radius: 10px; border-top-right-radius: 10px;">
                            </li>
                        </ul>
                        <div class="dot" style="right: 50%;">
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                    <ul class="leasing-areas">
                        <li><a href='javascript: showVR("https://720yun.com/t/29vksq790ie?scene_id=53502947");'>VR</a></li>
                        <li><a href="/v2/event?id=OLSHOP190625000003&type=events&storeCode=OLMALL190117000001">查看详情</a></li>
                    </ul>
                </div>
                <div class="weui-cell_select" onclick="window.location='/v2/event?id=OLSHOP190625000003&type=events&storeCode=OLMALL190117000001'" style="position: relative; margin: 10px 0 0 15px;">
                    <p style="font-size: 14px;">2F东厅</p>
                    <small class="weui-cell__bd" style="margin-right: 40px; display: block; font-size: 12px;">生活类、文化类、娱乐类、时尚类</small>
                </div>
                <div style="margin: 5px 15px 10px;">
                    <span class="weui-mark-rb">2F东厅</span>
                    <span class="weui-mark-rb">270m²</span>
                </div>
            </div>
        </div>
    </div>
</div>

<div id="gallery" class="weui-gallery" style="display: none;">
    <div class="weui-gallery__opr">
        <a href="javascript:" class="weui-gallery__del">
            <i class="fa fa-times" aria-hidden="true" style="color: #fff;" onclick='$("#gallery").hide();'></i>
        </a>
    </div>
</div>

<div id="vr_viewer" class="weui-gallery" style="display: none;">
    <iframe src="javascript:;" width="100%" frameborder="0" style="height: 90vh;"></iframe>
    <div class="weui-gallery__opr">
        <a href="javascript:" class="weui-gallery__del">
            <i class="fa fa-times" aria-hidden="true" style="color: #fff;" onclick='$("#vr_viewer iframe").attr("src","javascript:;"); $("#vr_viewer").hide();'></i>
        </a>
    </div>
</div>

<br>
<br>
<br>

<?php include ('menu_bottom.php'); ?>

<?php include ('footer.php'); ?>