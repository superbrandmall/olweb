<?php include ('navbar_top.php'); ?>

<div class="weui-panel">
    <div class="weui-panel__hd">广告宣传</div>
    <div class="weui-panel__bd">
        <div class="weui-media-box weui-media-box_small-appmsg">
            <div class="weui-cells">
                <div class="weui-cell weui-cell_active weui-cell_access">
                    <div class="weui-cell__hd">
                        <a href='javascript: showGallery("/views/assets/base/img/content/ads/outdoor-southeast-corner.jpg");'>
                            <img src="/views/assets/base/img/content/ads/outdoor-southeast-corner.jpg" alt="" style="width: 30px; height: 20px; margin-right: 16px; display: block;">
                        </a>
                    </div>
                    <div onclick="window.location = '/v2/ad?id=OLSHOP200323000017'" class="weui-cell__bd weui-cell_primary">
                        <p>墙面广告 户外 东南口转角</p>
                    </div>
                    <span onclick="window.location = '/v2/ad?id=OLSHOP200323000017'" class="weui-cell__ft"></span>
                </div>
                <div class="weui-cell weui-cell_active weui-cell_access">
                    <div class="weui-cell__hd">
                        <a href='javascript: showGallery("/views/assets/base/img/content/ads/outdoor-southeast.jpg");'>
                            <img src="/views/assets/base/img/content/ads/outdoor-southeast.jpg" alt="" style="width: 30px; height: 20px; margin-right: 16px; display: block;">
                        </a>
                    </div>
                    <div onclick="window.location = '/v2/ad?id=OLSHOP200323000018'" class="weui-cell__bd weui-cell_primary">
                        <p>墙面广告 户外 东南口</p>
                    </div>
                    <span onclick="window.location = '/v2/ad?id=OLSHOP200323000018'" class="weui-cell__ft"></span>
                </div>
                <div class="weui-cell weui-cell_active weui-cell_access">
                    <div class="weui-cell__hd">
                        <a href='javascript: showGallery("/views/assets/base/img/content/ads/outdoor-northeast.jpg");'>
                            <img src="/views/assets/base/img/content/ads/outdoor-northeast.jpg" alt="" style="width: 30px; height: 20px; margin-right: 16px; display: block;">
                        </a>    
                    </div>
                    <div onclick="window.location = '/v2/ad?id=OLSHOP200323000019'" class="weui-cell__bd weui-cell_primary">
                        <p>墙面广告 户外 东北口</p>
                    </div>
                    <span onclick="window.location = '/v2/ad?id=OLSHOP200323000019'" class="weui-cell__ft"></span>
                </div>
                <div class="weui-cell weui-cell_active weui-cell_access">
                    <div class="weui-cell__hd">
                        <a href='javascript: showGallery("/views/assets/base/img/content/ads/golden-avenue-led.jpg");'>
                            <img src="/views/assets/base/img/content/ads/golden-avenue-led.jpg" alt="" style="width: 30px; height: 20px; margin-right: 16px; display: block;">
                        </a>
                    </div>
                    <div onclick="window.location = '/v2/ad?id=OLSHOP200420000001'" class="weui-cell__bd weui-cell_primary">
                        <p>黄金大道悬挂分屏LED</p>
                    </div>
                    <span onclick="window.location = '/v2/ad?id=OLSHOP200420000001'" class="weui-cell__ft"></span>
                </div>
                <div class="weui-cell weui-cell_active weui-cell_access">
                    <div class="weui-cell__hd">
                        <a href='javascript: showGallery("/views/assets/base/img/content/ads/3f-east-entrance-led.jpg");'>
                            <img src="/views/assets/base/img/content/ads/3f-east-entrance-led.jpg" alt="" style="width: 30px; height: 20px; margin-right: 16px; display: block;">
                        </a>
                    </div>
                    <div onclick="window.location = '/v2/ad?id=OLSHOP200323000002'" class="weui-cell__bd weui-cell_primary">
                        <p>3F入口全包LED环绕屏</p>
                    </div>
                    <span onclick="window.location = '/v2/ad?id=OLSHOP200323000002'" class="weui-cell__ft"></span>
                </div>
                <div class="weui-cell weui-cell_active weui-cell_access">
                    <div class="weui-cell__hd">
                        <a href='javascript: showGallery("/views/assets/base/img/content/ads/8f-eastside-led.jpg");'>
                            <img src="/views/assets/base/img/content/ads/8f-eastside-led.jpg" alt="" style="width: 30px; height: 20px; margin-right: 16px; display: block;">
                        </a>
                    </div>
                    <div onclick="window.location = '/v2/ad?id=OLSHOP200323000038'" class="weui-cell__bd weui-cell_primary">
                        <p>8F东区悬挂式LED</p>
                    </div>
                    <span onclick="window.location = '/v2/ad?id=OLSHOP200323000038'" class="weui-cell__ft"></span>
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

<?php include ('menu_bottom.php'); ?>

<?php include ('footer.php'); ?>