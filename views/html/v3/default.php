<?php

$scripts = $scripts . '<script type="text/javascript" src="/views/assets/base/js/v3/default.js" ></script>';
?>

<section class="banner">
    <a href="#" class="banner-image">
        <img src="/views/assets/base/img/content/v3/banner.jpg">
    </a>
    <img src="/views/assets/base/img/content/backgrounds/slogan.png" class="img-responsive" style="position: absolute; top: 40%; left: 0; right: 0; margin: 0 auto; max-width: 80%;">
</section>

<section class="filter-bar" id="filter-bar">
    <div class="filter-bar-area">面积<i></i></div>
    <div class="filter-bar-category">业态<i></i></div>
    <div class="filter-bar-floor">楼层<i></i></div>
    <div class="filter-bar-more">更多<i></i></div>
</section>

<section class="filter-box" id="filter-box">
    <!--tab-->
    <div class="filter-tab" id="filter-tab">
        <div class="tab-area on">面积<i></i><span></span></div>
        <div class="tab-category">业态<i></i></div>
        <div class="tab-floor">楼层<i></i></div>
        <div class="tab-more">更多<i></i></div>
    </div>
    <!--tab-list-->
    <div class="filter-tab-list" id="filter-tab-list">
        <!--区域-->
        <div class="list-area list-area-area clearfix" style="display: block;">
            <ul class="fl left">
                <li>最小面积</li>
                <li><a href="javascript: void(0)" onclick="$.cookie('minArea',0)">0m&sup2;</a></li>
                <li><a href="javascript: void(0)" onclick="$.cookie('minArea',100)">100m&sup2;</a></li>
                <li><a href="javascript: void(0)" onclick="$.cookie('minArea',200)">200m&sup2;</a></li>
                <li><a href="javascript: void(0)" onclick="$.cookie('minArea',300)">300m&sup2;</a></li>
                <li><a href="javascript: void(0)" onclick="$.cookie('minArea',400)">400m&sup2;</a></li>
                <li><a href="javascript: void(0)" onclick="$.cookie('minArea',500)">500m&sup2;</a></li>
                <li><a href="javascript: void(0)" onclick="$.cookie('minArea',600)">600m&sup2;</a></li>
            </ul>
            <ul class="fl right">
                <li>选择最小查看最大面积</li>
            </ul>
        </div>
        <!--价格-->
        <div class="list-area list-area-price">
            <ul>
                <li><a href="">不限</a></li>
                <li><a href="">50万以下</a></li>
                <li><a href="">50-80万</a></li>
                <li><a href="">80-100万</a></li>
                <li><a href="">100-120万</a></li>
                <li><a href="">120-150万</a></li>
                <li><a href="">150-200万</a></li>
                <li><a href="">200-300万</a></li>
                <li><a href="">300万以上</a></li>
                <li>
                    自定义价格：
                    <input type="text" placeholder="最小"> -
                    <input type="text" placeholder="最大">
                    <a href="javascript:;" class="btn">确定</a>
                </li>
            </ul>
        </div>
        <!--房型-->
        <div class="list-area">
            <ul>
                <li class="weui-cells weui-cells_checkbox">
                    <label class="weui-cell weui-check__label">
                        <div class="weui-cell__bd">
                            <p>一室</p>
                        </div>
                        <div class="weui-cell__hd">
                            <input type="checkbox" class="weui-check" id="s11">
                            <i class="weui-icon-checked"></i>
                        </div>
                    </label>
                </li>
                <li class="weui-cells weui-cells_checkbox">
                    <label class="weui-cell weui-check__label">
                        <div class="weui-cell__bd">
                            <p>两室</p>
                        </div>
                        <div class="weui-cell__hd">
                            <input type="checkbox" class="weui-check" id="s11">
                            <i class="weui-icon-checked"></i>
                        </div>
                    </label>
                </li>
                <li class="weui-cells weui-cells_checkbox">
                    <label class="weui-cell weui-check__label">
                        <div class="weui-cell__bd">
                            <p>三室</p>
                        </div>
                        <div class="weui-cell__hd">
                            <input type="checkbox" class="weui-check" id="s11">
                            <i class="weui-icon-checked"></i>
                        </div>
                    </label>
                </li>
                <li class="weui-cells weui-cells_checkbox">
                    <label class="weui-cell weui-check__label">
                        <div class="weui-cell__bd">
                            <p>四室</p>
                        </div>
                        <div class="weui-cell__hd">
                            <input type="checkbox" class="weui-check" id="s11">
                            <i class="weui-icon-checked"></i>
                        </div>
                    </label>
                </li>
                <li class="weui-cells weui-cells_checkbox">
                    <label class="weui-cell weui-check__label">
                        <div class="weui-cell__bd">
                            <p>五室</p>
                        </div>
                        <div class="weui-cell__hd">
                            <input type="checkbox" class="weui-check" id="s11">
                            <i class="weui-icon-checked"></i>
                        </div>
                    </label>
                </li>
                <li class="weui-cells weui-cells_checkbox">
                    <label class="weui-cell weui-check__label">
                        <div class="weui-cell__bd">
                            <p>五室以上</p>
                        </div>
                        <div class="weui-cell__hd">
                            <input type="checkbox" class="weui-check" id="s11">
                            <i class="weui-icon-checked"></i>
                        </div>
                    </label>
                </li>
            </ul>
            <div class="weui-btn-area">
                <a class="weui-btn weui-btn_primary" href="javascript:">确定</a>
            </div>
        </div>
        <!--更多-->
        <div class="list-area list-area-more">
            <div class="more-div">
                <b>朝向</b>
                <div>
                    <a href="">朝东</a>
                    <a href="">朝南</a>
                    <a href="">朝西</a>
                    <a href="">朝北</a>
                    <a href="">南北</a>
                </div>
            </div>
            <div class="more-div">
                <b>面积</b>
                <div>
                    <a href="" class="on">不限</a>
                    <a href="">50平以下</a>
                    <a href="">50-70平</a>
                    <a href="">70-90平</a>
                    <a href="">90-120平</a>
                    <a href="">120-150平</a>
                    <a href="">150-200平</a>
                    <a href="">200-300平</a>
                    <a href="">300平以上</a>
                </div>
            </div>
            <div class="weui-btn-area mt10">
                <a class="weui-btn weui-btn_default" href="javascript:">清空条件</a>
            </div>
            <div class="weui-btn-area">
                <a class="weui-btn weui-btn_primary" href="javascript:">确定</a>
            </div>
        </div>
        <!--/更多-->
    </div>
    <!--/tab-list-->
</section>

<ul class="house-list" id="stores" style="display: none;"></ul>

<!--排序-->
<div class="sort-btn open-popup" id="sort" data-target="#sort-popup"><i class="sort-icon"></i><span>排序</span></div>
<div id="sort-popup" class="weui-popup__container sort-popup popup-bottom">
    <div class="weui-popup__modal">
        <ul class="lists">
            <li class="li active" data-act="sort" data-query="id=0"><a href="">默认</a></li>
            <li class="li" data-act="sort" data-query="id=32"><a href="">最新发布</a></li>
            <li class="li" data-act="sort" data-query="id=21"><a href="">总价从低到高</a></li>
            <li class="li" data-act="sort" data-query="id=22"><a href="">总价从高到低</a></li>
            <li class="li" data-act="sort" data-query="id=41"><a href="">单价从低到高</a></li>
            <li class="li" data-act="sort" data-query="id=12"><a href="">面积从大到小</a></li>
        </ul>
    </div>
</div>
<!--/排序-->

<section id="download-app" class="download-app">
    <a href="javascript:;" onClick="javascript:this.parentNode.remove();" class="download-close-btn">关闭</a>
    <div class="download-logo">微信扫一扫</div>
    <div class="download-slog"><p class="title">微信扫一扫</p><p class="sub-title">OLL线上租</p></div>
    <a class="download-btn weui-btn weui-btn_primary">立即打开</a>
</section>

<?php include ('footer.php'); ?>