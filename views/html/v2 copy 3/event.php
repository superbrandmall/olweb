<?php
$scripts = $scripts . '<script type="text/javascript" src="/views/assets/plugins/OwlCarousel2-2.3.4/dist/owl.carousel.min.js"></script>'
        . '<script type="text/javascript" src="/views/assets/base/js/v2/event-admin.js"></script>';
?>

<link href="/views/assets/plugins/OwlCarousel2-2.3.4/dist/assets/owl.carousel.min.css" rel="stylesheet" type="text/css"/>
<link href="/views/assets/plugins/OwlCarousel2-2.3.4/dist/assets/owl.theme.default.min.css" rel="stylesheet" type="text/css"/>

<?php include ('navbar_top.php'); ?>
<div class="weui-toptips bg-success topTips"><i class="fa fa-smile-o" aria-hidden="true"></i> 在这里您可以查看场地说明，不仅有图文介绍，还有全景VR可以看哦。对了，如果都满意的话就点击"选择并报价"吧！</div>

<div class="slide" id="slide1">
    <ul></ul>
    <div class="dot"></div>
</div>

<div class="page__bd">
    <div class="weui-cells" style="margin-top: 0;">
        <div class="weui-cell">
            <div style="width: 50%;">
                <p>门牌号</p>
            </div>
            <div class="weui-cell__ft" id="room_name" style="width: 50%; text-align: left;"></div>
        </div>
        <div class="weui-cell">
            <div style="width: 50%;">
                <p>楼层</p>
            </div>
            <div class="weui-cell__ft" id="floor" style="width: 50%; text-align: left;"></div>
        </div>
        <div class="weui-cell">
            <div style="width: 50%;">
                <p>面积</p>
            </div>
            <div class="weui-cell__ft" style="width: 50%; text-align: left;"><span id="area"></span> (<span id="area_spesifc"></span>)</div>
        </div>
        <div class="weui-cell">
            <div style="width: 50%;">
                <p>限高</p>
            </div>
            <div class="weui-cell__ft" id="height" style="width: 50%; text-align: left;"></div>
        </div>
        <div class="weui-cell">
            <div style="width: 50%;">
                <p>用电量(包含接口类型)</p>
            </div>
            <div class="weui-cell__ft" id="electricity" style="width: 50%; text-align: left;"></div>
        </div>
        <div class="weui-cell">
            <div style="width: 50%;">
                <p>电线拖线要求</p>
            </div>
            <div class="weui-cell__ft" id="wire_towing" style="width: 50%; text-align: left;"></div>
        </div>
        <div class="weui-cell">
            <div style="width: 50%;">
                <p>附近电梯门尺寸</p>
            </div>
            <div class="weui-cell__ft" id="elevator_size" style="width: 50%; text-align: left;"></div>
        </div>
        <div class="weui-cell">
            <div style="width: 50%;">
                <p>网络端口</p>
            </div>
            <div class="weui-cell__ft" id="network_type" style="width: 50%; text-align: left;"></div>
        </div>
        <div class="weui-cell">
            <div class="weui-cell__bd">
                <small>注:活动场地使用区域按斜线所示范围为限，活动场地内之装置或背板不得超过限高。</small>
            </div>
        </div>
    </div>
    
    <h4 class="page-header" style="margin: 16px 16px 8px; font-weight: 500;">VR看场</h4>
    <div class="weui-article" style="position: relative; padding: 0;">
        <iframe id="vr" src="#" style="height: 40vh; width: 100%;" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
    </div>

    <h4 class="page-header" style="margin: 9px 16px 8px; font-weight: 500;">场地落位图</h4>
    <div class="weui-article" style="position: relative; padding: 0;">
        <img src="#" id="map">
    </div>
    
    <h4 class="page-header" style="margin: 16px 16px 8px; font-weight: 500;">其他场地推荐</h4>
    <div style="text-align: center; margin: 10px 0 0;">
        <a class="weui-btn weui-btn_default" href="/v2/event?id=OLSHOP180917001126&type=events" style="display: inline-block; margin: 2px; padding: 5px 0; text-align: center; width: 110px; font-size: 11px;">1F东厅</a>
        <a class="weui-btn weui-btn_default" href="/v2/event?id=OLSHOP180917001116&type=events" style="display: inline-block; margin: 2px; padding: 5px 0; text-align: center; width: 110px; font-size: 11px;">1F西厅</a>
        <a class="weui-btn weui-btn_default" href="/v2/event?id=OLSHOP180917001150&type=events" style="display: inline-block; margin: 2px; padding: 5px 0; text-align: center; width: 110px; font-size: 11px;">3F黄金大道</a>
        <a class="weui-btn weui-btn_default" href="/v2/event?id=OLSHOP190809000001&type=events" style="display: inline-block; margin: 2px; padding: 5px 0; text-align: center; width: 110px; font-size: 11px;">4F东厅</a>
        <a class="weui-btn weui-btn_default" href="/v2/event?id=OLSHOP180917001166&type=events" style="display: inline-block; margin: 2px; padding: 5px 0; text-align: center; width: 110px; font-size: 11px;">5F东平台</a>
        <a class="weui-btn weui-btn_default" href="/v2/event?id=OLSHOP180917001169&type=events" style="display: inline-block; margin: 2px; padding: 5px 0; text-align: center; width: 110px; font-size: 11px;">9F封闭式多功能大厅</a>
    </div>
    
    <a id="choose_event" href="javascript:;" class="weui-btn weui-btn_primary" style="position: fixed; right: 0; top: 40%; border-radius: 50%; padding: 10px; height: 80px; width: 80px; line-height: 27px; font-weight: 300; font-size: 21px; z-index: 5;">申请报价</a>
</div>
<br>
<br>
<br>

<?php include ('menu_bottom.php'); ?>
<?php include ('footer.php'); ?>