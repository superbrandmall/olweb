<div style="position: relative;">
    <img src="/views/assets/base/img/content/backgrounds/grey-blue-ads.png" class="wow fadeInUp" data-wow-delay="0.2s" data-wow-offset="300" style="width: 100%; text-align: center;" />
    <img src="/views/assets/base/img/content/backgrounds/ads-title.png" class="wow slideInRight" data-wow-delay="0.4s" data-wow-offset="300" style="position: absolute; left: 16px; right: 16px; width: 90%; bottom: 0; margin: 0 auto;" />
    <a href="/v2/ly?type=leasing" class="wow fadeInUp" data-wow-delay="0.6s" data-wow-offset="300" style="position: absolute; color: #838383; top: 46%; left: 7%; font-size: 14px; font-weight: 700;">开新铺</a>
    <a href="/v2/events-ly?type=events" class="wow fadeInUp" data-wow-delay="0.8s" data-wow-offset="300" style="position: absolute; color: #838383; top: 37%; left: 45%; font-size: 14px; font-weight: 700;">办活动</a>
    <a href="javascript:;" class="wow fadeInUp" data-wow-delay="1.0s" data-wow-offset="300" style="position: absolute; color: #fff; top: 24%; left: 70%; font-size: 14px; font-weight: 700; text-shadow: 0 1px 2px rgba(0,0,0,.6);">做广告</a>
</div>

<div class="page__bd">
    <div class="weui-panel__hd">
        2个广告区
    </div>
    <div class="weui-panel__bd">
        <div class="weui-media-box weui-media-box_appmsg" style="background: rgb(245, 245, 245); padding: 0; margin: 0 16px 16px;">
            <div class="weui-media-box__bd">
                <div style="position: relative;">
                    <img onclick='javascript: showGallery("/views/assets/base/img/content/ads/zhongting-chuiman.jpg");' class="weui-media-box__thumb" src="/views/assets/base/img/content/ads/zhongting-chuiman.jpg" alt="" style="border-top-left-radius: 10px; border-top-right-radius: 10px;">
                    <ul class="leasing-areas">
                        <li><a href='javascript: showVR("https://720yun.com/t/d0vksldepqe?scene_id=47832646");'>VR</a></li>
                        <li><a href="/v2/ad?id=OLSHOP200820000001&type=ad&storeCode=OLMALL190117000001">查看详情</a></li>
                    </ul>
                </div>
                <div class="weui-cell_select" onclick="window.location='/v2/ad?id=OLSHOP200820000001&type=ad&storeCode=OLMALL190117000001'" style="position: relative; margin: 10px 0 0 15px;">
                    <p style="font-size: 14px;">中庭垂幔</p>
                    <small class="weui-cell__bd" style="margin-right: 40px; display: block; font-size: 12px;">中庭吊幔搭配环形客流动线，点位稀缺，巨型吊幔视觉效果突出醒目，发布效果明显，东西庭吊幔周边为广场扶梯，可直接进入顾客视角，便于品牌曝光。</small>
                </div>
                <div style="margin: 5px 15px 10px;">
                    <span class="weui-mark-rb">7F</span>
                    <span class="weui-mark-rb">点位稀缺，效果明显</span>
                </div>
            </div>
        </div>
        
        <div class="weui-media-box weui-media-box_appmsg" style="background: rgb(245, 245, 245); padding: 0; margin: 0 16px 16px;">
            <div class="weui-media-box__bd">
                <div style="position: relative;">
                    <img onclick='javascript: showGallery("/views/assets/base/img/content/ads/shoufuti-tie.jpg");' class="weui-media-box__thumb" src="/views/assets/base/img/content/ads/shoufuti-tie.jpg" alt="" style="border-top-left-radius: 10px; border-top-right-radius: 10px;">
                    <ul class="leasing-areas">
                        <li><a href='javascript: showVR("https://720yun.com/t/d0vksldepqe?scene_id=47832644");'>VR</a></li>
                        <li><a href="/v2/ad?id=OLSHOP200820000092&type=ad&storeCode=OLMALL190117000001">查看详情</a></li>
                    </ul>
                </div>
                <div class="weui-cell_select" onclick="window.location='/v2/ad?id=OLSHOP200820000092&type=ad&storeCode=OLMALL190117000001'" style="position: relative; margin: 10px 0 0 15px;">
                    <p style="font-size: 14px;">手扶梯贴</p>
                    <small class="weui-cell__bd" style="margin-right: 40px; display: block; font-size: 12px;">广告点位位于洛阳正大广场核心区域，连接正大广场1-7楼所有手扶梯，为正大广场核心客流动线，曝光率高，固定画面容易引起顾客视觉冲击，能够持续有效的对品牌进行宣传。</small>
                </div>
                <div style="margin: 5px 15px 10px;">
                    <span class="weui-mark-rb">B3-7F</span>
                    <span class="weui-mark-rb">核心区域，曝光率高</span>
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