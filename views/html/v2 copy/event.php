<?php
$scripts = $scripts . '<script type="text/javascript" src="/views/assets/plugins/OwlCarousel2-2.3.4/dist/owl.carousel.min.js"></script>'
        . '<script type="text/javascript" src="/views/assets/base/js/v2/event-admin.js"></script>';
?>

<link href="/views/assets/plugins/OwlCarousel2-2.3.4/dist/assets/owl.carousel.min.css" rel="stylesheet" type="text/css"/>
<link href="/views/assets/plugins/OwlCarousel2-2.3.4/dist/assets/owl.theme.default.min.css" rel="stylesheet" type="text/css"/>

<?php include ('navbar_top.php'); ?>

<div class="slide" id="slide1">
    <ul></ul>
    <div class="dot"></div>
</div>

<div class="page__bd" style="font-size: 15px;">
    <h4 class="page-header" style="margin: 16px;">场地说明</h4>
    <div class="weui-cells" style="font-size: 15px;">
        <div class="weui-cell">
            <div class="weui-cell__bd">
                <p>门牌号</p>
            </div>
            <div class="weui-cell__ft" id="room_name"></div>
        </div>
        <div class="weui-cell">
            <div class="weui-cell__bd">
                <p>楼层</p>
            </div>
            <div class="weui-cell__ft" id="floor"></div>
        </div>
        <div class="weui-cell">
            <div class="weui-cell__bd">
                <p>面积</p>
            </div>
            <div class="weui-cell__ft"><span id="area"></span> (<span id="area_spesifc"></span>)</div>
        </div>
        <div class="weui-cell">
            <div class="weui-cell__bd">
                <p>限高</p>
            </div>
            <div class="weui-cell__ft" id="height" style="max-width: 50%;"></div>
        </div>
        <div class="weui-cell">
            <div class="weui-cell__bd">
                <p>用电量(包含接口类型)</p>
            </div>
            <div class="weui-cell__ft" id="electricity" style="max-width: 50%;"></div>
        </div>
        <div class="weui-cell">
            <div class="weui-cell__bd">
                <p>电线拖线要求</p>
            </div>
            <div class="weui-cell__ft" id="wire_towing" style="max-width: 50%;"></div>
        </div>
        <div class="weui-cell">
            <div class="weui-cell__bd">
                <p>附近电梯门尺寸</p>
            </div>
            <div class="weui-cell__ft" id="elevator_size" style="max-width: 50%;"></div>
        </div>
        <div class="weui-cell">
            <div class="weui-cell__bd">
                <p>网络端口</p>
            </div>
            <div class="weui-cell__ft" id="network_type" style="max-width: 50%;"></div>
        </div>
        <div class="weui-cell">
            <div class="weui-cell__bd">
                <small>注:活动场地使用区域按斜线所示范围为限，活动场地内之装置或背板不得超过限高。</small>
            </div>
        </div>
    </div>
    <br>
    <center>
        <a href="javascript:" class="choose_event weui-btn weui-btn_primary">选择并报价</a>
    </center>
    <br>
    <h4 class="page-header" style="margin: 16px;">VR看场</h4>
    <div class="weui-article" style="position: relative; padding: 0;">
        <iframe id="vr" src="#" style="height: 40vh; width: 100%;" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
    </div>

    <h4 class="page-header" style="margin: 16px;">场地落位图</h4>
    <div class="weui-article" style="position: relative; padding: 0;">
        <img src="#" id="map">
    </div>

    <center>
        <a href="javascript:" class="choose_event weui-btn weui-btn_primary">选择并报价</a>
    </center>
</div>
<br>
<?php include ('event-block.php'); ?>
<br>
<br>
<br>
<br>

<?php include ('menu_bottom.php'); ?>
<?php include ('footer.php'); ?>