<?php
$scripts = $scripts . '<script type="text/javascript" src="/views/assets/base/js/v2/default-admin.js"></script>';
?>


<?php include ('navbar_top.php'); ?>
<div class="weui-toptips bg-success topTips"><i class="fa fa-gratipay" aria-hidden="true"></i> 您好！欢迎来到正大商业地产智能招商平台，接下去我会陪您一起挑选您心仪的铺位、场地和广告位哦！</div>

<div class="slide" id="slide1">
    <ul>
        <li>
            <a href="javascript:;">
                <img src='/views/assets/base/img/content/backgrounds/v2-banner-1.jpg' alt="">
            </a>
            <div class="slide-desc">隔岸相望浦东陆家嘴</div>
        </li>
        <li>
            <a href="javascript:;">
                <img src='/views/assets/base/img/content/backgrounds/v2-banner-2.jpg' alt="">
            </a>
            <div class="slide-desc">陆家嘴明珠环</div>
        </li>
        <li>
            <a href="javascript:;">
                <img src='/views/assets/base/img/content/backgrounds/v2-banner-3.jpg' alt="">
            </a>
            <div class="slide-desc">SUPER BRAND MALL 正大广场正门</div>
        </li>
        <li>
            <a href="javascript:;">
                <img src='/views/assets/base/img/content/backgrounds/v2-banner-4.jpg' alt="">
            </a>
            <div class="slide-desc">3F黄金大道</div>
        </li>
    </ul>
    <div class="dot">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
    </div>
</div>

<div class="weui-navbar" id="home_shortcuts">
    <div class="weui-navbar__item" onclick="window.location='/v2/floor-plan?f=8&type=leasing'" style="color: #333;">
        <i class="fa fa-paper-plane" aria-hidden="true" style="color: #10aeff;"></i><br>
        租铺位
    </div>
    <div class="weui-navbar__item" onclick="window.location='/v2/events'" style="color: #333;">
        <i class="fa fa-calendar" aria-hidden="true" style="color: #10aeff;"></i><br>
        办活动
    </div>
    <div class="weui-navbar__item" onclick="window.location='/v2/advertising?f=8&type=ads'" style="color: #333;">
        <i class="fa fa-bolt" aria-hidden="true" style="color: #10aeff;"></i><br>
        做广告
    </div>
</div>

<div class="weui-grids">
    <a href="/v2/mall" class="weui-grid">
        <div class="weui-grid__icon">
            <img src="/views/assets/base/img/content/mall/1s.jpg" alt="">
        </div>
        <p class="weui-grid__label">上海正大广场</p>
    </a>
    <a href="javascript:" class="weui-grid">
        <div class="weui-grid__icon">
            <img src="/views/assets/base/img/content/mall/2s.jpg" alt="">
        </div>
        <p class="weui-grid__label">洛阳正大广场</p>
    </a>
    <a href="javascript:" class="weui-grid">
        <div class="weui-grid__icon">
            <img src="/views/assets/base/img/content/mall/3s.jpg" alt="">
        </div>
        <p class="weui-grid__label">合肥正大广场</p>
    </a>
    <a href="javascript:" class="weui-grid">
        <div class="weui-grid__icon">
            <img src="/views/assets/base/img/content/mall/9s.jpg" alt="">
        </div>
        <p class="weui-grid__label">乐清正大广场</p>
    </a>
    <a href="javascript:" class="weui-grid">
        <div class="weui-grid__icon">
            <img src="/views/assets/base/img/content/mall/4s.jpg" alt="">
        </div>
        <p class="weui-grid__label">徐汇正大乐城</p>
    </a>
    <a href="javascript:" class="weui-grid">
        <div class="weui-grid__icon">
            <img src="/views/assets/base/img/content/mall/5s.jpg" alt="">
        </div>
        <p class="weui-grid__label">宝山正大乐城</p>
    </a>
    <a href="javascript:" class="weui-grid">
        <div class="weui-grid__icon">
            <img src="/views/assets/base/img/content/mall/6s.jpg" alt="">
        </div>
        <p class="weui-grid__label">郑州正大乐城</p>
    </a>
    <a href="javascript:" class="weui-grid">
        <div class="weui-grid__icon">
            <img src="/views/assets/base/img/content/mall/7s.jpg" alt="">
        </div>
        <p class="weui-grid__label">无锡正大乐城</p>
    </a>
    <a href="javascript:" class="weui-grid">
        <div class="weui-grid__icon">
            <img src="/views/assets/base/img/content/mall/8s.jpg" alt="">
        </div>
        <p class="weui-grid__label">北京正大中心</p>
    </a>
</div>
<br>
<br>
<br>
<br>
    
<?php include ('menu_bottom.php'); ?>

<?php include ('footer.php'); ?>