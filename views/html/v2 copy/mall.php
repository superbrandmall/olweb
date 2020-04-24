<?php
$scripts = $scripts. '<script type="text/javascript" src="/views/assets/plugins/OwlCarousel2-2.3.4/dist/owl.carousel.min.js"></script>'
        . '<script type="text/javascript" src="http://res.wx.qq.com/open/js/jweixin-1.2.0.js" charset="utf-8"></script>'
        . '<script type="text/javascript" src="/views/assets/base/js/v2/mall-admin.js"></script>';
?>

<link href="/views/assets/plugins/OwlCarousel2-2.3.4/dist/assets/owl.carousel.min.css" rel="stylesheet" type="text/css"/>
<link href="/views/assets/plugins/OwlCarousel2-2.3.4/dist/assets/owl.theme.default.min.css" rel="stylesheet" type="text/css"/>

<div id="wrapper">
    <?php include ('navbar_top.php'); ?>
    <div class="col-xs-12" style="padding-left: 0; padding-right: 0; background-image: url(/views/assets/base/img/content/backgrounds/mall-intro.jpg); background-size: cover; height: 670px;">
        <div style="margin: 376px 25px 0; color: #fff;">
            <h3>上海正大广场</h3>
            <p>上海正⼤广场雄踞⻩浦江畔，坐落在被称为“东方华尔街”的上海浦东陆家嘴核心地段。13层全业态购物空间，汇聚数百个全球⻛尚品牌，上百家国际美⾷；三大特色主题区域——Venus女性生活方式轻奢主题区、eat n work江景餐厅与共享办公空间、儿童的第三个家；创新功能区域划分，满足不同圈层消费者需求。</p>
            <p>2020年，软硬件配套升级之后的正大广场将尚、食、乐、美一网打尽，顾客将能在这里体验主题特色区、浦江景观餐饮、办公区、精致文创空间、同步世界潮流的主题活动及全智能系统一体化服务。</p>
        </div>
    </div>
    
    <div class="col-xs-12" style="padding-left: 0; padding-right: 0;">
        <img src="/views/assets/base/img/content/backgrounds/WechatIMG4.jpg" class="img-responsive" />
    </div>

    <div class="col-xs-12" style="padding-left: 0; padding-right: 0;">
        <video id="vido_one" controls="controls"  autoplay="autoplay" loop="loop" width="100%" webkit-playsinline="true" playsinline="true">
            <source src="/upload/video/video-1.mp4" type="video/mp4" />
Your browser does not support the video tag.
        </video>
    </div>
    <div class="col-xs-12" style="padding-left: 0; padding-right: 0;">
        <img src="/views/assets/base/img/content/backgrounds/WechatIMG5.jpg" class="img-responsive" />
    </div>
    <div id="page-wrapper" style="padding: 0 0 30px;">
        <div class="container">
            <div class="row">
                <div class="col-xs-12">
                    <br>
                    <h4><i class="fa fa-star" aria-hidden="true"></i> 楼层特色</h4>
                    <ul class="timeline">
                        <li>
                            <div class="timeline-badge">9F
                            </div>
                            <div class="timeline-panel">
                                <div class="timeline-heading">
                                    <h4 class="timeline-title">9、10F 高档餐饮/联合办公</h4>
                                </div>
                                <div class="timeline-body">
                                    <div class="btn-group">
                                        <button type="button" class="btn btn-success btn-sm dropdown-toggle" data-toggle="dropdown">
                                            商务合作
                                            <span class="caret"></span>
                                        </button>
                                        <ul class="dropdown-menu" role="menu">
                                            <li><a href="/v2/event?id=OLSHOP180917001169">会议活动-正大厅</a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div style="margin-top: 5px;">
                                        <img src="/views/assets/base/img/content/mall/ozone/eat_n_work.png" alt="eat n work" height="15">
                                    </div>
                                </div>
                            </div>
                            <div style="position: relative;">
                                <img src="/views/assets/base/img/content/mall/shanghai-sbm/9F.jpg" style="float: right; width: 46%;">
                                <a href="#!" onclick="javascript: $('#floor_detail').modal('toggle');" class="badge badge-renovation" style="position: absolute; top: 5px; right: 5px;">VR</a>
                            </div>
                        </li>
                        <li class="timeline-inverted">
                            <div class="timeline-badge warning">8F
                            </div>
                            <div style="position: relative;">
                                <img src="/views/assets/base/img/content/mall/shanghai-sbm/8F.jpg" style="float: left; width: 46%; margin-top: 10px;">
                                <a href="#!" onclick="javascript: $('#floor_detail').modal('toggle');" class="badge badge-renovation" style="position: absolute; top: 15px; left: 5px;">VR</a>
                            </div>
                            <div class="timeline-panel">
                                <div class="timeline-heading">
                                    <h4 class="timeline-title">餐饮&娱乐</h4>
                                </div>
                                <div class="timeline-body">
                                    <div class="btn-group">
                                        <button type="button" class="btn btn-success btn-sm dropdown-toggle" data-toggle="dropdown">
                                            商务合作
                                            <span class="caret"></span>
                                        </button>
                                        <ul class="dropdown-menu" role="menu">
                                            <li><a href="/v2/register?f=8&type=leasing">在线选铺</a>
                                            </li>
                                            <li><a href="/v2/register?f=8&type=ads">广告宣传</a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div style="margin-top: 5px;">
                                        <img src="/views/assets/base/img/content/client-logos/web/stellar.jpg" alt="影城" height="50">
                                        <img src="/views/assets/base/img/content/client-logos/web/haoledi.png" alt="好乐迪" height="50">
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="timeline-badge danger">7F
                            </div>
                            <div class="timeline-panel">
                                <div class="timeline-heading">
                                    <h4 class="timeline-title">健康塑性及特色餐饮</h4>
                                </div>
                                <div class="timeline-body">
                                    <div class="btn-group">
                                        <button type="button" class="btn btn-success btn-sm dropdown-toggle" data-toggle="dropdown">
                                            商务合作
                                            <span class="caret"></span>
                                        </button>
                                        <ul class="dropdown-menu" role="menu">
                                            <li><a href="/v2/register?f=7&type=leasing">在线选铺</a>
                                            </li>
                                            <li><a href="/v2/register?f=7&type=ads">广告宣传</a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div style="margin-top: 5px;">
                                        <img src="/views/assets/base/img/content/client-logos/web/supermonkey.png" alt="SuperMonkey" height="50">
                                        <img src="/views/assets/base/img/content/client-logos/web/DigPotency.png" alt="DipPotency" height="50">
                                    </div>
                                </div>
                            </div>
                            <div style="position: relative;">
                                <img src="/views/assets/base/img/content/mall/shanghai-sbm/7F.jpg" style="float: right; width: 46%;">
                                <a href="#!" onclick="javascript: $('#floor_detail').modal('toggle');" class="badge badge-renovation" style="position: absolute; top: 5px; right: 5px;">VR</a>
                            </div>
                        </li>
                        <li class="timeline-inverted">
                            <div class="timeline-badge warning">6F
                            </div>
                            <div style="position: relative;">
                                <img src="/views/assets/base/img/content/mall/shanghai-sbm/6F.jpg" style="float: left; width: 46%; margin-top: 10px;">
                                <a href="#!" onclick="javascript: $('#floor_detail').modal('toggle');" class="badge badge-renovation" style="position: absolute; top: 15px; left: 5px;">VR</a>
                            </div>
                            <div class="timeline-panel">
                                <div class="timeline-heading">
                                    <h4 class="timeline-title">餐饮&中国风</h4>
                                </div>
                                <div class="timeline-body">
                                    <div class="btn-group">
                                        <button type="button" class="btn btn-success btn-sm dropdown-toggle" data-toggle="dropdown">
                                            商务合作
                                            <span class="caret"></span>
                                        </button>
                                        <ul class="dropdown-menu" role="menu">
                                            <li><a href="/v2/register?f=6&type=leasing">在线选铺</a>
                                            </li>
                                            <li><a href="/v2/register?f=6&type=ads">广告宣传</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div style="margin-top: 5px;">
                                    <img src="/views/assets/base/img/content/client-logos/web/leicun.png" alt="罍+村" height="50">
                                    <img src="/views/assets/base/img/content/client-logos/web/diandude.jpg" alt="点都德" height="50">
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="timeline-badge info">5F
                            </div>
                            <div class="timeline-panel">
                                <div class="timeline-heading">
                                    <h4 class="timeline-title">运动&生活</h4>
                                </div>
                                <div class="timeline-body">
                                    <div class="btn-group">
                                        <button type="button" class="btn btn-success btn-sm dropdown-toggle" data-toggle="dropdown">
                                            商务合作
                                            <span class="caret"></span>
                                        </button>
                                        <ul class="dropdown-menu" role="menu">
                                            <li><a href="/v2/register?f=5&type=leasing">在线选铺</a>
                                            </li>
                                            <li><a href="/v2/event?id=OLSHOP180917001166">场地活动-东平台</a>
                                            </li>
                                            <li><a href="/v2/register?f=5&type=ads">广告宣传</a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div style="margin-top: 5px;">
                                        <img src="/views/assets/base/img/content/client-logos/web/heytea.png" alt="喜茶" height="50">
                                        <img src="/views/assets/base/img/content/client-logos/web/gundam.png" alt="高达基地" height="50">
                                    </div>
                                </div>
                            </div>
                            <div style="position: relative;">
                                <img src="/views/assets/base/img/content/mall/shanghai-sbm/5F.jpg" style="float: right; width: 46%;">
                                <a href="#!" onclick="javascript: $('#floor_detail').modal('toggle');" class="badge badge-renovation" style="position: absolute; top: 5px; right: 5px;">VR</a>
                            </div>
                        </li>
                        <li>
                            <div class="timeline-badge success">4F
                            </div>
                            <div class="timeline-panel">
                                <div class="timeline-heading">
                                    <h4 class="timeline-title">男装&数码</h4>
                                </div>
                                <div class="timeline-body">
                                    <div class="btn-group">
                                        <button type="button" class="btn btn-success btn-sm dropdown-toggle" data-toggle="dropdown">
                                            商务合作
                                            <span class="caret"></span>
                                        </button>
                                        <ul class="dropdown-menu" role="menu">
                                            <li><a href="/v2/register?f=4&type=leasing">在线选铺</a>
                                            </li>
                                            <li><a href="/v2/event?id=OLSHOP190809000001">场地活动-东厅</a>
                                            </li>
                                            <li><a href="/v2/register?f=4&type=ads">广告宣传</a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div style="margin-top: 5px;">
                                        <img src="/views/assets/base/img/content/client-logos/web/huawei.png" alt="华为" height="50">
                                        <img src="/views/assets/base/img/content/client-logos/web/adidas.png" alt="Adidas" height="50">
                                    </div>
                                </div>
                            </div>
                            <div style="position: relative;">
                                <img src="/views/assets/base/img/content/mall/shanghai-sbm/4F.jpg" style="float: right; width: 46%;">
                                <a href="#!" onclick="javascript: $('#floor_detail').modal('toggle');" class="badge badge-renovation" style="position: absolute; top: 5px; right: 5px;">VR</a>
                            </div>
                        </li>
                        <li class="timeline-inverted">
                            <div class="timeline-badge warning">3F
                            </div>
                            <div style="position: relative;">
                                <img src="/views/assets/base/img/content/mall/shanghai-sbm/3F.jpg" style="float: left; width: 46%; margin-top: 10px;">
                                <a href="#!" onclick="javascript: $('#floor_detail').modal('toggle');" class="badge badge-renovation" style="position: absolute; top: 15px; left: 5px;">VR</a>
                            </div>
                            <div class="timeline-panel">
                                <div class="timeline-heading">
                                    <h4 class="timeline-title">快时尚</h4>
                                </div>
                                <div class="timeline-body">
                                    <div class="btn-group">
                                        <button type="button" class="btn btn-success btn-sm dropdown-toggle" data-toggle="dropdown">
                                            商务合作
                                            <span class="caret"></span>
                                        </button>
                                        <ul class="dropdown-menu" role="menu">
                                            <li><a href="/v2/register?f=3&type=leasing">在线选铺</a>
                                            </li>
                                            <li><a href="/v2/event?id=OLSHOP180917001150">场地活动-黄金大道</a>
                                            </li>
                                            <li><a href="/v2/register?f=3&type=ads">广告宣传</a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div style="margin-top: 5px;">
                                        <img src="/views/assets/base/img/content/client-logos/web/UR.png" alt="UrbanRevivo" height="50">
                                        <img src="/views/assets/base/img/content/client-logos/web/zara.png" alt="Zara" height="50">   
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li class="timeline-inverted">
                            <div class="timeline-badge primary">2F
                            </div>
                            <div style="position: relative;">
                                <img src="/views/assets/base/img/content/mall/shanghai-sbm/2F.jpg" style="float: left; width: 46%; margin-top: 10px;">
                                <a href="#!" onclick="javascript: $('#floor_detail').modal('toggle');" class="badge badge-renovation" style="position: absolute; top: 15px; left: 5px;">VR</a>
                            </div>
                            <div class="timeline-panel">
                                <div class="timeline-heading">
                                    <h4 class="timeline-title">儿童第三个家</h4>
                                </div>
                                <div class="timeline-body">
                                    <div class="btn-group">
                                        <button type="button" class="btn btn-success btn-sm dropdown-toggle" data-toggle="dropdown">
                                            商务合作
                                            <span class="caret"></span>
                                        </button>
                                        <ul class="dropdown-menu" role="menu">
                                            <li><a href="/v2/register?f=2&type=leasing">在线选铺</a>
                                            </li>
                                            <li><a href="/v2/register?f=2&type=ads">广告宣传</a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div style="margin-top: 5px;">
                                        <img src="/views/assets/base/img/content/client-logos/web/tomsworld.png" alt="汤姆熊" height="50">
                                        <img src="/views/assets/base/img/content/client-logos/web/LEGO.png" alt="乐高" height="50">     
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="timeline-badge danger">1F
                            </div>

                            <div class="timeline-panel">
                                <div class="timeline-heading">
                                    <h4 class="timeline-title">轻奢及休闲餐饮娱乐街</h4>
                                </div>
                                <div class="timeline-body">
                                    <div class="btn-group">
                                        <button type="button" class="btn btn-success btn-sm dropdown-toggle" data-toggle="dropdown">
                                            商务合作
                                            <span class="caret"></span>
                                        </button>
                                        <ul class="dropdown-menu" role="menu">
                                            <li><a href="/v2/register?f=1&type=leasing">在线选铺</a>
                                            </li>
                                            <li><a href="/v2/event?id=OLSHOP180917001126">场地活动-东厅</a>
                                            </li>
                                            <li><a href="/v2/event?id=OLSHOP180917001116">场地活动-西厅</a>
                                            </li>
                                            <li><a href="/v2/register-events?f=1&type=ads">广告宣传</a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div style="margin-top: 5px;">
                                        <img src="/views/assets/base/img/content/client-logos/web/md.jpg" alt="MassimoDutti" height="50">
                                        <img src="/views/assets/base/img/content/client-logos/web/starbucks-r.jpg" alt="Starbucks Reserve" height="50">    
                                    </div>
                                </div>
                            </div>
                            <div style="position: relative;">
                                <img src="/views/assets/base/img/content/mall/shanghai-sbm/1F.jpg" style="float: right; width: 46%;">
                                <a href="#!" onclick="javascript: $('#floor_detail').modal('toggle');" class="badge badge-renovation" style="position: absolute; top: 5px; right: 5px;">VR</a>
                            </div>
                        </li>
                        <li class="timeline-inverted">
                            <div class="timeline-badge">B1
                            </div>
                            <div style="position: relative;">
                                <img src="/views/assets/base/img/content/mall/shanghai-sbm/B1F.jpg" style="float: left; width: 46%; margin-top: 10px;">
                                <a href="#!" onclick="javascript: $('#floor_detail').modal('toggle');" class="badge badge-renovation" style="position: absolute; top: 15px; left: 5px;">VR</a>
                            </div>
                            <div class="timeline-panel">
                                <div class="timeline-heading">
                                    <h4 class="timeline-title">配套服务及快时尚</h4>
                                </div>
                                <div class="timeline-body">
                                    <div class="btn-group">
                                        <button type="button" class="btn btn-success btn-sm dropdown-toggle" data-toggle="dropdown">
                                            商务合作
                                            <span class="caret"></span>
                                        </button>
                                        <ul class="dropdown-menu" role="menu">
                                            <li><a href="/v2/register?f=0&type=leasing">在线选铺</a>
                                            </li>
                                            <li><a href="/v2/register?f=0&type=ads">广告宣传</a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div style="margin-top: 5px;">
                                        <img src="/views/assets/base/img/content/client-logos/web/uniqlo.png" alt="优衣库" height="50">
                                        <img src="/views/assets/base/img/content/client-logos/web/watsons.jpg" alt="屈臣氏" height="50">     
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            <?php include ('event-block.php'); ?>
            
            <?php include ('ad-block.php'); ?>
            <hr>
        </div>
    </div>

    <?php include ('menu_bottom.php'); ?>
</div>

<div class="modal fade" id="floor_detail" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-md">
        <div class="modal-content c-square">
            <div class="modal-body" style="padding: 0;">
                <div class="col-md-6" style="padding: 0;">
                    <div id="floor_vr" class="embed-responsive embed-responsive-4by3">
                        <iframe class="embed-responsive-item" src="/upload/vr/100001/floors/8F/tour.html" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<?php include ('footer.php'); ?>