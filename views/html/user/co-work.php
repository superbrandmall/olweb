<?php
$scripts = $scripts. '<script type="text/javascript" src="views/assets/plugins/owl-carousel/owl.carousel.min.js"></script>';
?>
<link href="views/assets/plugins/owl-carousel/owl.carousel.css" rel="stylesheet" type="text/css" media="all" />
<link href="views/assets/plugins/owl-carousel/owl.theme.css" rel="stylesheet" type="text/css" media="all" />
<link href="views/assets/plugins/owl-carousel/owl.transitions.css" rel="stylesheet" type="text/css" media="all" />

<script>
// BEGIN: OzoneOwlcarousel
var Ozone1Owlcarousel = function() {
    
    var _initInstances = function() {
        $("[data-slider='owl1'] .owl-carousel").each(function() { 
            var parent = $(this).parent();

            var items;
            var itemsDesktop;
            var itemsDesktopSmall;
            var itemsTablet;
            var itemsTabletSmall;
            var itemsMobile;

            if (parent.attr("data-single-item") == "true") {
                items = 1;
                itemsDesktop = 1;
                itemsDesktopSmall = 1;
                itemsTablet = 1;
                itemsTabletSmall = 1;
                itemsMobile = 1;
            } else {
                items = parent.attr('data-items');
                itemsDesktop = [1199, parent.attr('data-desktop-items') ? parent.attr('data-desktop-items') : items];
                itemsDesktopSmall = [979, parent.attr('data-desktop-small-items') ? parent.attr('data-desktop-small-items') : 3];
                itemsTablet = [768, parent.attr('data-tablet-items') ? parent.attr('data-tablet-items') : 2];
                itemsMobile = [479, parent.attr('data-mobile-items') ? parent.attr('data-mobile-items') : 1];
            }

            $(this).owlCarousel({

                items: items,
                itemsDesktop: itemsDesktop,
                itemsDesktopSmall: itemsDesktopSmall,
                itemsTablet: itemsTablet,
                itemsTabletSmall: itemsTablet,
                itemsMobile: itemsMobile,
                
                navigation : false,
                slideSpeed : parent.attr('data-slide-speed', 400),
                paginationSpeed : parent.attr('data-pagination-speed', 800),  
                singleItem: parent.attr("data-single-item") == "true" ? true : false,
                autoPlay: parent.attr("data-auto-play"),
            });
        });
    };

    return {

         //main function to initiate the module
        init: function() {
            
            _initInstances();
        }

    };
}();
// END: OwlCarousel

// BEGIN: ContentCubeWorldsFoods
var ContentCubeWorldsFoods = function() {

    var _initInstances = function() {

        // init cubeportfolio
        $('#grid-container').cubeportfolio({
            filters: '#filters-container',
            loadMore: '#loadMore-container',
            loadMoreAction: 'click',
            layoutMode: 'grid',
            defaultFilter: '*',
            animationType: 'quicksand',
            gapHorizontal: 35,
            gapVertical: 25,
            gridAdjustment: 'responsive',
            mediaQueries: [{
                width: 1100,
                cols: 4
            }, {
                width: 800,
                cols: 3
            }, {
                width: 500,
                cols: 2
            }, {
                width: 320,
                cols: 1
            }],
            caption: 'zoom',
            displayType: 'lazyLoading',
            displayTypeSpeed: 100
        });

    };

    return {

         //main function to initiate the module
        init: function() {
            _initInstances();
        }

    };
}();
// END: ContentCubeWorldsFoods



$(document).ready(function() {
    $('nav .navbar-nav').html('\
<li class="c-menu-type-classic"><a href="#hot_spaces" class="c-link">办公地点</a></li>\n\
<li class="c-menu-type-classic"><a href="#we_offer" class="c-link">关于eat n work</a></li>\n\
<li class="c-menu-type-classic"><a href="#grids" class="c-link">关于OZONE</a></li>\n\
<li class="c-menu-type-classic"><a href="#prices" class="c-link">房型与价格</a></li>');
        
    Ozone1Owlcarousel.init();
    ContentCubeWorldsFoods.init();
    $('.c-brand').append('<a href="co-work" class="c-logo"><img src="views/assets/base/img/content/mall/ozone.png" alt="正大" class="c-desktop-logo" height="20" style="margin-left: 10px;"></a>');
});
</script>

<div class="c-layout-page">
    <div id="form" class="c-content-box c-bg-parallax c-content-feature-16" style="background-image: url(views/assets/base/img/content/mall/cowork4.jpg); background-position: center -380px; margin-bottom: 0; padding: 120px 0; z-index: 11;">
        <div class="container">
            <h3 class="c-font-70 c-font-bold c-font-uppercase c-font-white">梦寐以求的办公生活！</h3>
            <div class="col-md-4">
                <p class="c-font-20 c-font-white">在这里你能找到美食的期许，更有不少工作的乐趣，自由上瘾，乐业无限！</p>
            </div>
        </div>
    </div>
    
    <div class="c-content-box c-size-md c-bg-grey-1" style="margin-bottom: 0; z-index: 11;">
        <div class="container">
            <div class="col-md-6" style="font-size: 20px;">
                <h1 class="c-font-bold" style="font-size: 26px;">How Unique We are</h1><br>
                <p>正大集团和Muse集团于2018年<br>携手开创eat n work品牌，<br>
                    OZONE 是旗下共享办公子品牌，<br>
                    它不是一般意义上的办公地，<br>而是一个办公、社交和服务的生活工作平衡点。</p>
                <p>它源自于快节奏工作的白领生活，<br>办公不仅是工作，而是一种生活方式！</p>
<p>eat n work 满足对美食的无限期许，<br>又能找到工作的乐趣！
                </p>
            </div>
            
            <div class="col-md-6">
                <div class="modal-dialog" style="position: absolute; top: -270px; right: 0;">
                    <div class="modal-content c-square" style="background-color: #fff; box-shadow: none; border: 1px solid rgb(240, 240, 240); padding: 0;">
                        <div class="modal-body" style="padding: 20px 40px;">
                            <h1 class="c-font-44 c-font-sbold">欢迎来到 eat n work</h1>
                            <p>正大广场陆家嘴购物中心 | 上海市浦东陆家嘴西路168号9、10楼</p>
                            <hr>
                            <p>请留下联系方式，我们将有专人与您联系。</p>
                            <form>
                                <div class="form-group">
                                    <label for="contact_name_1" class="hidden"><?= $lang['contact_main_contact'] ?></label>
                                    <input type="text" id="contact_name_1" name="contact_name_1" placeholder="<?= $lang['contact_main_contact'] ?>*" required class="form-control input-lg c-square">
                                    <div id="errorcontainer-contact_name_1" class="errorDiv"></div>
                                </div>
                                <div class="form-group">
                                    <label for="email" class="hidden"><?= $lang['contact_email'] ?></label>
                                    <input type="email" id="email" name="email" placeholder="<?= $lang['contact_email'] ?>*" required class="form-control input-lg c-square">
                                    <div id="errorcontainer-email" class="errorDiv"></div>
                                </div>
                                <div class="form-group">
                                    <label for="phone" class="hidden"><?= $lang['contact_phone'] ?></label>
                                    <div class="input-group c-square">
                                        <div class="input-group-addon" style="background-color: #FAFAFA;">
                                            <button type="button" data-toggle="dropdown" aria-expanded="false" style="padding: 0;background: none; border: 0 none;">
                                                <img src="views/assets/base/img/content/misc/cn.png" alt="中国" width="15"> +86 
                                                <span class="caret" style="margin-top: -1px;"></span>
                                            </button>
                                            <ul class="dropdown-menu" role="menu" style="min-width: 0;">
                                                <li>
                                                    <a href="#" style="padding: 1px 20px; font-size: 14px;"><img src="views/assets/base/img/content/misc/cn.png" alt="" width="20"> +86</a>
                                                </li>
                                                <li>
                                                    <a href="#" style="padding: 1px 20px; font-size: 14px;"><img src="views/assets/base/img/content/misc/us.png" alt="" width="20"> +1</a>
                                                </li>
                                                <li>
                                                    <a href="#" style="padding: 1px 20px; font-size: 14px;"><img src="views/assets/base/img/content/misc/hk.png" alt="" width="20"> +852</a>
                                                </li>
                                                <li>
                                                    <a href="#" style="padding: 1px 20px; font-size: 14px;"><img src="views/assets/base/img/content/misc/tw.png" alt="" width="20"> +886</a>
                                                </li>
                                                <li>
                                                    <a href="#" style="padding: 1px 20px; font-size: 14px;"><img src="views/assets/base/img/content/misc/as.png" alt="" width="20"> +61</a>
                                                </li>
                                                <li>
                                                    <a href="#" style="padding: 1px 20px; font-size: 14px;"><img src="views/assets/base/img/content/misc/uk.png" alt="" width="20"> +44</a>
                                                </li>
                                                <li>
                                                    <a href="#" style="padding: 1px 20px; font-size: 14px;"><img src="views/assets/base/img/content/misc/id.png" alt="" width="20"> +91</a>
                                                </li>
                                                <li>
                                                    <a href="#" style="padding: 1px 20px; font-size: 14px;"><img src="views/assets/base/img/content/misc/fa.png" alt="" width="20"> +33</a>
                                                </li>
                                                <li>
                                                    <a href="#" style="padding: 1px 20px; font-size: 14px;"><img src="views/assets/base/img/content/misc/mo.png" alt="" width="20"> +853</a>
                                                </li>
                                                <li>
                                                    <a href="#" style="padding: 1px 20px; font-size: 14px;">其他</a>
                                                </li>
                                            </ul>
                                        </div>
                                        <input type="text" id="phone" name="phone" placeholder="<?= $lang['co_work_phone'] ?>*" required class="form-control input-lg c-square">
                                    </div>
                                    <div id="errorcontainer-phone" class="errorDiv"></div>
                                </div>
                                <div class="form-group">
                                    <label for="reserve_verify" class="hidden"><?= $lang['co_work_veryfication_code'] ?>*</label>
                                    <div style="position: relative;">
                                        <input type="text" id="login_verify" name="reserve_verify" placeholder="<?= $lang['co_work_veryfication_code'] ?>*" required class="form-control c-square c-theme input-lg">
                                        <a href="javascript: VeryficationCodeReservation()" id="login_verify_link" style="display: block; position: absolute; z-index: 10; right: 9px; font-size: 14px; top: 13px;"><?= $lang['co_work_send_code'] ?></a>
                                    </div>
                                    <div id="errorcontainer-reserve_verify" class="errorDiv"></div>
                                </div>
                                <div class="form-group">
                                    <div class="c-checkbox">
                                        <input type="checkbox" id="terms" name="terms" class="c-check" required>
                                        <label for="terms" class="c-font-thin c-font-17">
                                            <span></span>
                                            <span class="check"></span>
                                            <span class="box"></span>
                                            我同意正大Online Leasing的<a href="terms.html" target="_blank">服务条款</a>，并且我已阅读并理解正大Online Leasing的<a href="cookie.html" target="_blank">隐私政策</a>，包括隐私政策中所规定的处理和传输我的信息。
                                        </label>
                                    </div>
                                    <div id="errorcontainer-terms" class="errorDiv" style="margin-left: 29px"></div>
                                </div>
                                <div class="form-group">
                                    <button type="submit" class="btn c-theme-btn btn-lg c-btn-uppercase c-btn-bold c-btn-square c-btn-login" style="width: 100%; font-size: 20px;">立即预约</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <div id="grids" class="c-content-box c-size-md" style="margin-bottom: 0; background-color: #fff; z-index: 11; padding: 120px 0;">
        <div class="container">
            <div class="row" style="background-color: rgb(219, 219, 219);">
                <div class="col-sm-3" style="padding: 0;">
                    <img class="c-photo img-responsive" alt="" src="views/assets/base/img/content/mall/snapshot-1.jpg">
                </div>
                <div class="col-sm-3" style="padding: 0;">
                    <img class="c-photo img-responsive" alt="" src="views/assets/base/img/content/mall/snapshot-2.jpg">
                </div>
                <div class="col-sm-6 c-font-14" style="padding: 2%;">
                    <h3 class="c-font-uppercase c-font-bold">正大广场有联合办公吗?</h3>
                    <p class="c-font-thin">
                        <strong>有啊</strong>，一样办公，感受高贵不贵的“商业共享空间”！
                    </p>
                </div>
            </div>
            <div class="row" style="background-color: #F4F4F5;">
                <div class="col-sm-3 c-font-14" style="padding: 2%;">
                    <h3 class="c-font-uppercase c-font-bold">商场里有全配套的联合办公吗?</h3>
                    <p class="c-font-thin">
                        <strong>当然</strong>，“餐饮+办公+生活”400+入驻品牌，一站式办公配套，一步到位！
                    </p>
                </div>
                <div class="col-sm-3 c-font-14" style="padding: 2%;">
                    <h3 class="c-font-uppercase c-font-bold">黄金地段有联合办公吗?</h3>
                    <p class="c-font-thin">
                        <strong>有</strong>，近千平全江景餐厅，一样吃喝、会晤、谈判，有车族、上班族，交通直达，性价比才是硬道理！
                    </p>
                </div>
                <div class="col-sm-3" style="padding: 0;">
                    <img class="c-photo img-responsive" alt="" src="views/assets/base/img/content/mall/work-space.jpg">
                </div>
                <div class="col-sm-3" style="padding: 0;">
                    <img class="c-photo img-responsive" alt="" src="views/assets/base/img/content/mall/work-space-4.jpg">
                </div>
            </div>
            <div class="row" style="background-color: rgb(219, 219, 219);">
                <div class="col-sm-3 c-font-14" style="padding: 2%;">
                    <h3 class="c-font-uppercase c-font-bold">“餐饮+办公”一站式</h3>
                    <div class="c-content">
                        <p><strong><i>6<small>000m<sup>2</sup></small></i></strong> 总面积</p>
                        <p><strong><i>2<small>000m<sup>2</sup></small></i></strong> 星级全江景餐厅</p>
                        <p><strong><i>3<small>800m<sup>2</sup></small></i></strong> 办公区域</p>
                        <p><strong><i>5<small>60个</small></i></strong> 可实地注册的办公工位</p>
                        <p><strong><i>3<small>65天</small></i></strong> 全年空调无休</p>
                        <p><strong><i>7<small>50个</small></i></strong> 停车位（900元/年付）</p>
                        <p><strong><i>三<small>层</small></i></strong> PM2.5过滤新风系统</p>
                        <p><strong><i>高<small>颜值</small></i></strong> 化妆间</p>
                    </div>
                </div>
                <div class="col-sm-3" style="padding: 0;">
                    <img class="c-photo img-responsive" alt="" src="views/assets/base/img/content/mall/snapshot-3.jpg">
                </div>
                <div class="col-sm-3" style="padding: 0;">
                    <img class="c-photo img-responsive" alt="" src="views/assets/base/img/content/mall/snapshot-4.jpg">
                </div>
                <div class="col-sm-3 c-font-14" style="padding: 2%;">
                    <h3 class="c-font-uppercase c-font-bold">生活方式组合</h3>
                    <div class="c-content">
                        <p><strong><i>4<small>00+</small></i></strong> 正大广场入驻品牌</p>
                        <p><strong><i>整<small>层</small></i></strong> “儿童第三个家”亲子活动区</p>
                        <p><strong><i>大<small>型专业连锁</small></i></strong> SPA、美容、纤体品牌</p>
                        <p><strong><i>健<small>身潮牌</small> & 全<small>国连锁</small></i></strong> “动“无止尽</p>
                        <p><strong><i>2<small>0+ 办公专属餐厅布局 品类融合，空间开放</small></i></strong> 焗烤台、刺生台、色拉吧、水吧<br>
                                                蛤蜊煮、选菜区、卡座区、公共区<br>
                                                中包厢、私董宴客厅/专属景观露台</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <div id="we_offer" class="c-content-box c-size-md c-bg-grey-1" style="margin-bottom: 0; padding: 120px 0;">
        <div class="container">
            <div class="c-content-title-1">
                <h3 class="c-center c-font-uppercase c-font-bold">WHAT DO WE OFFER?</h3>
                <div class="c-center c-font-24">
                    <img src="views/assets/base/img/content/mall/eat_n_work.png" alt="" height="20" style="margin: -8px 10px 0 0;"><br>
                    舌尖上的办公体验
                </div>
            </div><br>
            <div class="cbp-panel">
                <div id="grid-container" class="c-content-latest-works cbp cbp-l-grid-masonry-projects">
                    <div class="cbp-item">
                        <div class="cbp-caption">
                            <div class="cbp-caption-defaultWrap">
                                <img src="views/assets/base/img/content/mall/food1.jpg" alt="">
                            </div>
                            <div class="cbp-caption-activeWrap">
                                <div class="c-masonry-border">
                                </div>
                                <div class="cbp-l-caption-alignCenter">
                                    <div class="cbp-l-caption-body">
                                        <p class="c-font-white">BBQ猪肋排</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="cbp-item">
                        <div class="cbp-caption">
                            <div class="cbp-caption-defaultWrap">
                                <img src="views/assets/base/img/content/mall/food2.jpg" alt="">
                            </div>
                            <div class="cbp-caption-activeWrap">
                                <div class="c-masonry-border">
                                </div>
                                <div class="cbp-l-caption-alignCenter">
                                    <div class="cbp-l-caption-body">
                                        <p class="c-font-white">⻩油柠檬香草烤鸡</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="cbp-item">
                        <div class="cbp-caption">
                            <div class="cbp-caption-defaultWrap">
                                <img src="views/assets/base/img/content/mall/food3.jpg" alt="">
                            </div>
                            <div class="cbp-caption-activeWrap">
                                <div class="c-masonry-border">
                                </div>
                                <div class="cbp-l-caption-alignCenter">
                                    <div class="cbp-l-caption-body">
                                        <p class="c-font-white">取餐区</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="cbp-item">
                        <div class="cbp-caption">
                            <div class="cbp-caption-defaultWrap">
                                <img src="views/assets/base/img/content/mall/food4.jpg" alt="">
                            </div>
                            <div class="cbp-caption-activeWrap">
                                <div class="c-masonry-border">
                                </div>
                                <div class="cbp-l-caption-alignCenter">
                                    <div class="cbp-l-caption-body">
                                        <p class="c-font-white">脆⽪烤⾁</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="cbp-item">
                        <div class="cbp-caption">
                            <div class="cbp-caption-defaultWrap">
                                <img src="views/assets/base/img/content/mall/food5.jpg" alt="">
                            </div>
                            <div class="cbp-caption-activeWrap">
                                <div class="c-masonry-border">
                                </div>
                                <div class="cbp-l-caption-alignCenter">
                                    <div class="cbp-l-caption-body">
                                        <p class="c-font-white">私董VIP包厢</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="cbp-item">
                        <div class="cbp-caption">
                            <div class="cbp-caption-defaultWrap">
                                <img src="views/assets/base/img/content/mall/food6.jpg" alt="">
                            </div>
                            <div class="cbp-caption-activeWrap">
                                <div class="c-masonry-border"> 
                                </div>
                                <div class="cbp-l-caption-alignCenter">
                                    <div class="cbp-l-caption-body">
                                        <p class="c-font-white">烤⽜排和⽺排</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="cbp-item">
                        <div class="cbp-caption">
                            <div class="cbp-caption-defaultWrap">
                                <img src="views/assets/base/img/content/mall/food7.jpg" alt="">
                            </div>
                            <div class="cbp-caption-activeWrap">
                                <div class="c-masonry-border">
                                </div>
                                <div class="cbp-l-caption-alignCenter">
                                    <div class="cbp-l-caption-body">
                                        <p class="c-font-white">多元化社交就餐区</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <div class="c-content-box c-size-md c-bg-white" style="margin-bottom: 0;">
        <div class="container">
            <div class="c-content-title-1">
                <h3 class="c-center c-font-uppercase c-font-bold">现代休闲共餐</h3>
                <div class="c-center c-font-18">
                    您将拥有环球美食餐厅所提供的超高性价比星际服务，<br>"eat n work"将星厨与创意合二为一，将餐饮与工作完美融合
                </div>
            </div>
            <div class="row c-margin-t-60">
                <div class="col-md-12">
                    <div class="c-content-testimonial-2-slider" data-slider="owl1" data-single-item="true" data-auto-play="6000">
                        <div class="c-title c-font-uppercase c-font-bold c-theme-bg">
                            明星主厨 用美食传递幸福
                        </div>
                        <div class="owl-carousel owl-theme c-theme owl-single">
                            <div class="item">
                                <div class="col-md-4">
                                    <div class="c-content-testimonial-2" style="padding: 50px 30px 50px 30px;">
                                        <div class="c-testimonial c-font-uppercase c-font-bold">
                                            Brian Tan 
                                        </div>
                                        <div class="c-author">
                                            <div class="c-portrait" style="background-image: url(/views/assets/base/img/content/mall/cook1.jpg)">
                                            </div>
                                            <div class="c-name c-font-uppercase">
                                                陈绵泰
                                            </div>
                                            <p class="c-position c-theme c-font-uppercase">
                                                美食家 / 厨师 / 概念创意师 / 活动策划师
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <img class="img-responsive" src="/views/assets/base/img/content/mall/cook11.jpg" alt="">
                                </div>
                                <div class="col-md-4">
                                    <img class="img-responsive" src="/views/assets/base/img/content/mall/cook12.jpg" alt="">
                                </div>
                            </div>
                            <div class="item">
                                <div class="col-md-4">
                                    <div class="c-content-testimonial-2" style="padding: 50px 30px 50px 30px;">
                                        <div class="c-testimonial c-font-uppercase c-font-bold" style="margin: 20px 0;">
                                            Jacqueline Qiu
                                        </div>
                                        <div class="c-author">
                                            <div class="c-portrait" style="background-image: url(/views/assets/base/img/content/mall/cook2.jpg)">
                                            </div>
                                            <div class="c-name c-font-uppercase">
                                                邱琼
                                            </div>
                                            <p class="c-position c-theme c-font-uppercase" style="margin-left: 75px;">
                                                中国饭店协会西餐休闲餐专业委员会副主席 / 世界名厨之星大赛评委 / 世界青年厨师大赛中国队导师
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <img class="img-responsive" src="/views/assets/base/img/content/mall/cook21.jpg" alt="">
                                </div>
                                <div class="col-md-4">
                                    <img class="img-responsive" src="/views/assets/base/img/content/mall/cook22.jpg" alt="">
                                </div>
                            </div>
                            <div class="item">
                                <div class="col-md-4">
                                    <div class="c-content-testimonial-2" style="padding: 50px 30px 40px 30px;">
                                        <div class="c-testimonial c-font-uppercase c-font-bold" style="margin: 20px 0;">
                                            Sunny Yu
                                        </div>
                                        <div class="c-author">
                                            <div class="c-portrait" style="background-image: url(/views/assets/base/img/content/mall/cook3.jpg)">
                                            </div>
                                            <div class="c-name c-font-uppercase" style="margin-top: -20px;">
                                                于冰
                                            </div>
                                            <p class="c-position c-theme c-font-uppercase" style="margin-left: 75px;">
                                                从业20年 / 拥有丰富多国料理经验 / 秉持简约、自然的烹饪理念，以当季食材还原食物的美味 / 曾任职于香格里拉大酒店、外滩18号、万达洲际酒店
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="col-md-4">
                                    <img class="img-responsive" src="/views/assets/base/img/content/mall/cook31.jpg" alt="">
                                </div>
                                
                                <div class="col-md-4">
                                    <img class="img-responsive" src="/views/assets/base/img/content/mall/cook32.jpg" alt="">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <div class="c-content-box c-size-lg c-bg-parallax" style="background-image: url(/views/assets/base/img/content/mall/Organic-VEG.jpg); margin-bottom: 0;">
        <div class="container">
            <div class="c-content-title-1">
                <h3 class="c-center c-font-uppercase c-font-white c-font-bold">CP GROUP世界的厨房: “从农场到餐桌” 完美呈现</h3>
                <div class="c-center c-font-24 c-font-white">
                    成为陆家嘴白领生活的一抹亮色
                </div>
            </div>
        </div>
    </div>
    
    <div id="prices" class="c-content-box c-size-md c-bg-white" style="margin-bottom: 0; padding: 120px 0;">
        <div class="container">
            <div class="container">
                <div class="c-content-pricing-1 c-option-2">
                    <div class="c-content-title-1">
                        <h3 class="c-center c-font-uppercase c-font-bold">房型与价格</h3>
                    </div><br>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="c-content-person-1 c-option-2 c-bordered c-shadow" style="background-color: #fff;">
                                <div class="c-caption c-content-overlay">
                                    <div class="c-overlay-wrapper">
                                        <div class="c-overlay-content">
                                            <a href="shared-space"><i class="icon-link"></i></a>
                                        </div>
                                    </div>
                                    <img class="c-overlay-object img-responsive" src="/views/assets/base/img/content/mall/shared-space.jpg" alt="">
                                </div>
                                <div class="c-body">
                                    <div class="c-head">
                                        <div class="c-name c-font-uppercase c-font-bold" style="line-height: 47px; font-size: 20px;">
                                            公共区域
                                        </div>
                                        <div class="c-socials c-theme">
                                            <a href="shared-space" class="btn btn-md c-btn-square c-btn-border-2x c-btn-dark c-btn-uppercase c-btn-bold">查看详情</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="col-md-6">
                            <div class="c-content-person-1 c-option-2 c-bordered c-shadow" style="background-color: #fff;">
                                <div class="c-caption c-content-overlay">
                                    <div class="c-overlay-wrapper">
                                        <div class="c-overlay-content">
                                            <a href="work-space"><i class="icon-link"></i></a>
                                        </div>
                                    </div>
                                    <img class="c-overlay-object img-responsive" src="/views/assets/base/img/content/mall/work-space.jpg" alt="">
                                </div>
                                <div class="c-body">
                                    <div class="c-head">
                                        <div class="c-name c-font-uppercase c-font-bold" style="line-height: 47px; font-size: 20px;">
                                            办公区域
                                        </div>
                                        <div class="c-socials c-theme">
                                            <a href="work-space" class="btn btn-md c-btn-square c-btn-border-2x c-btn-dark c-btn-uppercase c-btn-bold">查看详情</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div id="hot_spaces" class="c-content-box c-size-md c-bg-grey-1" style="margin-bottom: 120px;">
        <div class="container">
            <div class="container">
                <div class="c-content-pricing-1 c-option-2">
                    <div class="c-content-title-1">
                        <h3 class="c-center c-font-uppercase c-font-bold">热门办公空间</h3>
                    </div><br>
                    <div class="row">
                        <div class="col-md-4 col-md-offset-2">
                            <div class="c-content-person-1 c-option-2">
                                <div class="c-caption c-content-overlay">
                                    <div class="c-overlay-wrapper">
                                        <div class="c-overlay-content">
                                            <a href="shared-space"><i class="icon-link"></i></a>
                                        </div>
                                    </div>
                                    <img class="c-overlay-object img-responsive" src="/views/assets/base/img/content/mall/shanghai-sbm.jpg" alt="">
                                </div>
                                <div class="c-body">
                                    <div class="c-head">
                                        <div class="c-name c-font-uppercase c-font-bold" style="line-height: 47px; font-size: 20px;">
                                            上海
                                        </div>
                                        <div class="c-socials c-theme">
                                            <a href="work-space" class="btn btn-md c-btn-square c-btn-border-2x c-btn-dark c-btn-uppercase c-btn-bold">查看地点</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-4">
                            <div class="c-content-person-1 c-option-2">
                                <div class="c-caption c-content-overlay">
                                    <div class="c-overlay-wrapper">
                                        <div class="c-overlay-content">
                                            <a href="ly-space"><i class="icon-link"></i></a>
                                        </div>
                                    </div>
                                    <img class="c-overlay-object img-responsive" src="/views/assets/base/img/content/mall/luoyang-sbm.jpg" alt="">
                                </div>
                                <div class="c-body">
                                    <div class="c-head">
                                        <div class="c-name c-font-uppercase c-font-bold" style="line-height: 47px; font-size: 20px;">
                                            洛阳
                                        </div>
                                        <div class="c-socials c-theme">
                                            <a href="ly-space" class="btn btn-md c-btn-square c-btn-border-2x c-btn-dark c-btn-uppercase c-btn-bold">查看地点</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="c-content-box c-size-sm c-bg-grey-2" style="padding: 12px 0 0; position: fixed; bottom: -20px; left: 0; right: 0; z-index: 10;">
        <div class="container">
            <div class="c-content-subscribe-form-1">
                <div class="row">
                    <div class="col-sm-8">
                        <h3 class="c-font-20 c-font-uppercase c-font-bold c-font-white">正在寻找一个灵活高端的办公空间？预约参观，我们将尽快与你确认。</h3>
                    </div>
                    <div class="col-sm-4">
                        <a href="#form" class="btn c-theme-btn btn-lg c-btn-uppercase c-btn-bold c-btn-square c-btn-login" style="width: 100%; font-size: 20px;">立即预约</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<?php include ('footer.php'); ?>