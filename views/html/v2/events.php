<?php include ('navbar_top.php'); ?>

<div class="weui-panel">
    <div class="weui-panel__hd">会议和场地活动</div>
    <div class="weui-panel__bd">
        <div class="weui-media-box weui-media-box_small-appmsg">
            <div class="weui-cells">
                <div class="weui-cell weui-cell_active weui-cell_access">
                    <div class="weui-cell__hd">
                        <a href='javascript: showGallery("/views/assets/base/img/content/events/pearl_atrium.jpg");'>
                            <img src="/views/assets/base/img/content/events/pearl_atrium.jpg" alt="" style="width: 30px; height: 20px; margin-right: 16px; display: block;">
                        </a>
                    </div>
                    <div onclick="window.location = '/v2/event?id=OLSHOP180917001126'" class="weui-cell__bd weui-cell_primary">
                        <p>1F东厅</p>
                    </div>
                    <span onclick="window.location = '/v2/event?id=OLSHOP180917001126'" class="weui-cell__ft"></span>
                </div>
                <div class="weui-cell weui-cell_active weui-cell_access">
                    <div class="weui-cell__hd">
                        <a href='javascript: showGallery("/views/assets/base/img/content/events/bund_atrium.jpg");'>
                            <img src="/views/assets/base/img/content/events/bund_atrium.jpg" alt="" style="width: 30px; height: 20px; margin-right: 16px; display: block;">
                        </a>
                    </div>
                    <div onclick="window.location = '/v2/event?id=OLSHOP180917001116'" class="weui-cell__bd weui-cell_primary">
                        <p>1F西厅</p>
                    </div>
                    <span onclick="window.location = '/v2/event?id=OLSHOP180917001116'" class="weui-cell__ft"></span>
                </div>
                <div class="weui-cell weui-cell_active weui-cell_access">
                    <div class="weui-cell__hd">
                        <a href='javascript: showGallery("/views/assets/base/img/content/events/gd_avenue.jpg");'>
                            <img src="/views/assets/base/img/content/events/gd_avenue.jpg" alt="" style="width: 30px; height: 20px; margin-right: 16px; display: block;">
                        </a>    
                    </div>
                    <div onclick="window.location = '/v2/event?id=OLSHOP180917001150'" class="weui-cell__bd weui-cell_primary">
                        <p>3F黄金大道</p>
                    </div>
                    <span onclick="window.location = '/v2/event?id=OLSHOP180917001150'" class="weui-cell__ft"></span>
                </div>
                <div class="weui-cell weui-cell_active weui-cell_access">
                    <div class="weui-cell__hd">
                        <a href='javascript: showGallery("/views/assets/base/img/content/events/gd_platform.jpg");'>
                            <img src="/views/assets/base/img/content/events/gd_platform.jpg" alt="" style="width: 30px; height: 20px; margin-right: 16px; display: block;">
                        </a>
                    </div>
                    <div onclick="window.location = '/v2/event?id=OLSHOP190809000001'" class="weui-cell__bd weui-cell_primary">
                        <p>4F东厅</p>
                    </div>
                    <span onclick="window.location = '/v2/event?id=OLSHOP190809000001'" class="weui-cell__ft"></span>
                </div>
                <div class="weui-cell weui-cell_active weui-cell_access">
                    <div class="weui-cell__hd">
                        <a href='javascript: showGallery("/views/assets/base/img/content/events/jade_platform.jpg");'>
                            <img src="/views/assets/base/img/content/events/jade_platform.jpg" alt="" style="width: 30px; height: 20px; margin-right: 16px; display: block;">
                        </a>
                    </div>
                    <div onclick="window.location = '/v2/event?id=OLSHOP180917001166'" class="weui-cell__bd weui-cell_primary">
                        <p>5F东平台</p>
                    </div>
                    <span onclick="window.location = '/v2/event?id=OLSHOP180917001166'" class="weui-cell__ft"></span>
                </div>
                <div class="weui-cell weui-cell_active weui-cell_access">
                    <div class="weui-cell__hd">
                        <a href='javascript: showGallery("/views/assets/base/img/content/events/ct_hall.jpg");'>
                            <img src="/views/assets/base/img/content/events/ct_hall.jpg" alt="" style="width: 30px; height: 20px; margin-right: 16px; display: block;">
                        </a>
                    </div>
                    <div onclick="window.location = '/v2/event?id=OLSHOP180917001169'" class="weui-cell__bd weui-cell_primary">
                        <p>9F封闭式多功能大厅</p>
                    </div>
                    <span onclick="window.location = '/v2/event?id=OLSHOP180917001169'" class="weui-cell__ft"></span>
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