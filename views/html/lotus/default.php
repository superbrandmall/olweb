<?php
$scripts = $scripts . '<script type="text/javascript" src="/views/assets/plugins/weui/js/swipe.js"></script>'
        . '<script type="text/javascript" src="/views/assets/base/js/lotus/default-admin.js"></script>';
?>

<header class="weui-header bg-lotus" style="height: 60px;">
    <div class="weui-header-left" style="margin-top: 5px;"> <span class="icon icon-68"></span> <span id="mallSelected">松江文诚店</span>  </div>
    <div class="weui-header-right">
        <a href="javascript:;" id="locationBtn" class="weui-btn weui-btn_mini b-white f-white" style="font-weight: normal; font-size: 14px;"><span class="icon icon-27"></span> 选择门店</a>
    </div>
</header>
<div class="slide" id="swiper_banner">
    <ul>
        <li>
            <a href="javascript:;">
                <img src='http://placehold.it/640x300' alt="">
            </a>
        </li>
        <li>
            <a href="javascript:;">
                <img src='http://placehold.it/640x300' alt="">
            </a>
        </li>
        <li>
            <a href="javascript:;">
                <img src='http://placehold.it/640x300' alt="">
            </a>
        </li>
    </ul>
    <div class="dot">
        <span></span>
        <span></span>
        <span></span>
    </div>
</div>

<div class="weui-content" style="margin-bottom: 15px; margin-top: -2px;">    
    <div class="weui-flex">
        <div class="weui-flex__item tcenter">
            <a href="javascript:" role="button">
                <i class="fa fa-shopping-bag f30" aria-hidden="true"></i>
                <p class="weui-grid__label">零售</p>
            </a>
        </div>
        <div class="weui-flex__item tcenter">
            <a href="javascript:" role="button">
                <i class="fa fa-cutlery f30" aria-hidden="true"></i>
                <p class="weui-grid__label">餐饮</p>
            </a>
        </div>
        <div class="weui-flex__item tcenter">
            <a href="javascript:" role="button">
                <i class="fa fa-child f30" aria-hidden="true"></i>
                <p class="weui-grid__label">儿童</p>
            </a>
        </div>
        <div class="weui-flex__item tcenter">
            <a href="javascript:" role="button">
                <i class="fa fa-music f30" aria-hidden="true"></i>
                <p class="weui-grid__label">娱乐服务</p>
            </a>
        </div>
        <div class="weui-flex__item tcenter">
            <a href="javascript:" role="button">
                <i class="fa fa-rocket f30" aria-hidden="true"></i>
                <p class="weui-grid__label">体验服务</p>
            </a>
        </div>
    </div>
</div>

<div class="page__bd" style="padding-bottom: 40px;">
    <div class="weui-panel weui-panel_access">
        <div class="weui-panel__hd">
            为您推荐
            <span class="right"><a href="/lotus/leasing">查看更多</a></span>
        </div>
        <div id="storeRecommand" class="weui-panel__bd"></div>
        <div class="weui-loadmore weui-loadmore_line">
            <span class="weui-loadmore__tips">已经到底了</span>
        </div>
    </div>
</div>

<?php include ('location_selector.php'); ?>

<?php include ('footer.php'); ?>