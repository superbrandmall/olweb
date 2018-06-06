<?php
$scripts = $scripts. '<script type="text/javascript" src="views/assets/base/js/baoshan-tm.js"></script>';
?>

<!-- BEGIN: PAGE CONTAINER -->
<div class="c-layout-page">
    <!-- BEGIN: 标题 -->
	<div class="c-layout-breadcrumbs-1 c-fonts-uppercase c-fonts-bold">
		<div class="container">
			<div class="c-page-title c-pull-left">
				<h3 class="c-font-uppercase c-font-bold"><span class="mall-name"></span></h3>
			</div>
			<ul class="c-page-breadcrumbs c-theme-nav c-pull-right c-fonts-regular">
				<li>
					<a href="/"><?= $lang['floor_home'] ?></a>
				</li>
				<li>
					/
				</li>
				<li class="c-state_active">
                    <span class="mall-name"></span>
				</li>
			</ul>
		</div>
	</div>
    
    <!-- BEGIN: 项目介绍 -->
    <div class="c-content-box animated fadeInRight" style="background-color: #000; margin-bottom: 0; overflow: hidden; z-index: 1;">
        <div class="col-md-6 hidden-xs hidden-sm">
            <embed id="video" src='#' allowFullScreen='true' quality='high' width='100%' height='400' align='middle' allowScriptAccess='always' type='application/x-shockwave-flash'></embed>
        </div>
        <div class="col-md-6 hidden-md hidden-lg">
            <video loop="loop" src="upload/video/baoshan.mp4" controls="true" width="100%"></video>
        </div>
        <div class="container">
            <div class="col-md-6">
                <div class="c-content-testimonial-2-slider" data-slider="owl" data-single-item="true" data-auto-play="10000">
                    <div class="owl-carousel owl-theme c-theme owl-single">
                        <div class="item">
                            <div class="c-content-title-1" style="margin-top: 40px;">
                                <h3 class="c-font-uppercase c-font-bold c-font-white">上海市宝山区概况</h3>
                                <div class="c-content-bar-1 c-opt-1">
                                    <blockquote class="c-theme-border c-font-white" style="text-align: left;">
                                        <p>宝山区位于上海市北部，是上海的“水路门户”。区内有吴淞国际邮轮码头、吴淞炮台湿地森林公园、顾村公园、美兰湖等著名景点。宝山区地处黄浦江和长江的交汇点，是上海重要的钢铁生产与港口集装箱进出口基地。</p>
                                    </blockquote>
                                    <ul class="c-content-list-1 c-theme" style="text-align: left;">
                                        <li class="c-bg-before-red c-font-white">
                                            2017年GDP: <span class="c-counter c-bg-red-font" data-counter="counterup">1,147</span>亿元
                                        </li>
                                        <li class="c-bg-before-red c-font-white">
                                            2017年常住人口: <span class="c-counter c-bg-red-font" data-counter="counterup">2,030,800</span>人
                                        </li>
                                        <li class="c-bg-before-red c-font-white">
                                            2017年社会消费品零售总额: <span class="c-counter c-bg-red-font" data-counter="counterup">667</span>亿元
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="item">
                            <div class="c-content-title-1" style="margin-top: 40px;">
                                <h3 class="c-font-uppercase c-font-bold c-font-white"><?= $lang['floor_mall_desc'] ?></h3>
                                <div class="c-content-bar-1 c-opt-1">
                                    <ul id="mall_desc" class="c-content-list-1 c-theme" style="text-align: left;"></ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <div class="c-content-box c-no-padding c-size-md c-bg-dark animated fadeInRight" style="margin-bottom: 0; z-index: 1;">
		<div class="container">
			<div class="c-content-bar-3">
				<div class="row">
                    <div class="col-md-2 col-md-offset-4 col-xs-6">
						<div class="c-content-v-center" style="height: 90px;">
							<div class="c-wrapper">
                                <div class="c-body">
                                    <a href="requirement" class="btn btn-md c-btn-square c-btn-border-2x c-theme-btn c-btn-uppercase c-btn-bold"><i class="icon-map"></i> <?= $lang['floor_shops'] ?></a>
								</div>
							</div>
						</div>
					</div>
					<div class="col-md-2 col-xs-6">
						<div class="c-content-v-center" style="height: 90px;">
							<div class="c-wrapper">
                                <div class="c-body">
                                    <a href="events" class="btn btn-md c-btn-square c-btn-border-2x c-theme-btn c-btn-uppercase c-btn-bold"><i class="icon-calendar"></i> <?= $lang['home_events'] ?></a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
    <!-- END: 项目介绍 -->
    
    <!-- BEGIN: 联系方式 -->
    <div id="intro" class="c-content-box animated fadeInRight" style="margin-bottom: 0; z-index: 1;">
		<div class="container">
			<div class="c-content-contact-1 c-opt-1">
				<div class="row" data-auto-height=".c-height">
					<div class="col-sm-8 c-desktop">
					</div>
					<div class="col-sm-4">
						<div class="c-body">
							<div class="c-section">
                                <h3>招商进行中</h3>
							</div>
							<div class="c-section">
								<div class="c-content-label c-font-uppercase c-font-bold c-theme-bg">
									<?= $lang['floor_mall_location'] ?>
								</div>
								<div>
									<span id="street"></span>
								</div>
                                <br>
                                <div class="c-content-label c-font-uppercase c-font-bold c-theme-bg">
									<?= $lang['floor_construction_floor_area'] ?>
								</div>
								<div>
									<span id="gross_floor_area"></span>m<sup>2</sup>
								</div>
                                <br>
                                <div class="c-content-label c-font-uppercase c-font-bold c-theme-bg">
									<?= $lang['floor_leasable_area'] ?>
								</div>
								<div>
                                    <span id="leasing_area"></span>m<sup>2</sup>
								</div>
                                <br>
                                <div class="c-content-label c-font-uppercase c-font-bold c-theme-bg">
									商户数
								</div>
								<div>
									<span>约180家</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
        <div id="gmapbg" class="c-content-contact-1-gmap c-content-box c-bg-parallax c-content-feature-16 hidden-sm hidden-xs" style="background-image: url(views/assets/base/img/content/mall/baoshan-tm/map.gif); margin-bottom: 0;">
		</div>
    </div>
    
    <!-- BEGIN: 3楼 -->
	<div id="f3" class="c-content-box c-bg-parallax c-content-feature-16" style="background-image: url(views/assets/base/img/content/mall/baoshan-tm/3F.jpg); margin-bottom: 0;">
		<div class="container">
			<div class="row">
                <div class="col-md-offset-7 col-md-5 col-xs-12">
                    <div class="c-feature-16-container c-bg-white c-bg-opacity-5 animated fadeInRight">
                        <div class="c-feature-16-line c-theme-bg"></div>
                        <h2 class="c-feature-16-title c-font-bold c-font-uppercase">3F 儿童兴趣教育</h2>
                        <p class="c-feature-16-desc">
                            <?= $lang['floor_modality_shop_proportion'] ?>
                        </p>
                        <div id="proportion_f3"></div>
                        <a class="c-feature-15-btn btn c-btn btn-lg c-theme-btn c-font-uppercase c-font-bold c-btn-square" href="views/html/user/component/floor-plan-baoshan-tm.php?m=<?= $bs_tm?>&f=3" data-toggle="modal" data-target="#floor_map_F_baoshan">打开楼层图</a>
                    </div>
                </div>
            </div>
		</div>
	</div>
	<!-- END: 3楼 -->
    
    <!-- BEGIN: 2楼 -->
	<div id="f2" class="c-content-box c-bg-parallax c-content-feature-16" style="background-image: url(views/assets/base/img/content/mall/baoshan-tm/2F.jpg); margin-bottom: 0;">
		<div class="container">
			<div class="row">
                <div class="col-md-5 col-xs-12">
                    <div class="c-feature-16-container c-bg-dark c-bg-opacity-4 animated fadeInLeft">
                        <div class="c-feature-16-line c-theme-bg"></div>
                        <h2 class="c-feature-16-title c-font-bold c-font-uppercase c-font-white">2F 儿童升学教育</h2>
                        <p class="c-feature-16-desc c-font-grey">
                            <?= $lang['floor_modality_shop_proportion'] ?>
                        </p>
                        <div id="proportion_f2"></div>
                        <a class="c-feature-15-btn btn c-btn btn-lg c-theme-btn c-font-uppercase c-font-bold c-btn-square" href="views/html/user/component/floor-plan-baoshan-tm.php?m=<?= $bs_tm?>&f=2" data-toggle="modal" data-target="#floor_map_F_baoshan">打开楼层图</a>
                    </div>
                </div>
            </div>
		</div>
	</div>
	<!-- END: 2楼 -->
    
    <!-- BEGIN: 1楼 -->
	<div id="f1" class="c-content-box c-bg-parallax c-content-feature-16" style="background-image: url(views/assets/base/img/content/mall/baoshan-tm/1F.jpg); margin-bottom: 0;">
		<div class="container">
			<div class="row">
                <div class="col-md-offset-7 col-md-5 col-xs-12">
                    <div class="c-feature-16-container c-bg-white c-bg-opacity-5 animated fadeInRight">
                        <div class="c-feature-16-line c-theme-bg"></div>
                        <h2 class="c-feature-16-title c-font-bold c-font-uppercase">1F 炫目名品</h2>
                        <p class="c-feature-16-desc">
                            <?= $lang['floor_modality_shop_proportion'] ?>
                        </p>
                        <div id="proportion_f1"></div>
                        <a class="c-feature-15-btn btn c-btn btn-lg c-theme-btn c-font-uppercase c-font-bold c-btn-square" href="views/html/user/component/floor-plan-baoshan-tm.php?m=<?= $bs_tm?>&f=1" data-toggle="modal" data-target="#floor_map_F_baoshan">打开楼层图</a>
                    </div>
                </div>
            </div>
		</div>
	</div>
	<!-- END: 1楼 -->
    
    <!-- BEGIN: B1楼 -->
	<div id="fb1" class="c-content-box c-bg-parallax c-content-feature-16" style="background-image: url(views/assets/base/img/content/mall/baoshan-tm/B1F.jpg); margin-bottom: 0;">
		<div class="container">
			<div class="row">
                <div class="col-md-5 col-xs-12">
                    <div class="c-feature-16-container c-bg-dark c-bg-opacity-4 animated fadeInLeft">
                        <div class="c-feature-16-line c-theme-bg"></div>
                        <h2 class="c-feature-16-title c-font-bold c-font-uppercase c-font-white">B1F 健康生活</h2>
                        <p class="c-feature-16-desc c-font-grey">
                            <?= $lang['floor_modality_shop_proportion'] ?>
                        </p>
                        <div id="proportion_fb1"></div>
                        <a class="c-feature-15-btn btn c-btn btn-lg c-theme-btn c-font-uppercase c-font-bold c-btn-square" href="views/html/user/component/floor-plan-baoshan-tm.php?m=<?= $bs_tm?>&f=0" data-toggle="modal" data-target="#floor_map_F_baoshan">打开楼层图</a>
                    </div>
                </div>
            </div>
		</div>
	</div>
	<!-- END: B1楼 -->
    
    <div class="c-content-box c-size-lg c-bg-white" style="margin-bottom: 0; z-index: 1;">
		<div class="container">
            <div class="c-content-title-1">
                <h3 class="c-center c-font-uppercase c-font-bold mall-name"></h3>
                <div class="c-line-center c-theme-bg"></div>
            </div>
            <div class="col-md-3">
                <img class="img-responsive" src="views/assets/base/img/content/mall/baoshan-tm/bs-1.jpeg" alt=""><br>
            </div>
            <div class="col-md-3">
                <img class="img-responsive" src="views/assets/base/img/content/mall/baoshan-tm/bs-2.jpeg" alt=""><br>
            </div>
            <div class="col-md-3">
                <img class="img-responsive" src="views/assets/base/img/content/mall/baoshan-tm/bs-3.jpeg" alt=""><br>
            </div>
            <div class="col-md-3">
                <img class="img-responsive" src="views/assets/base/img/content/mall/baoshan-tm/bs-4.jpeg" alt=""><br>
            </div>
        </div>  
	</div>
    
    <div class="c-content-box c-size-lg c-bg-grey-2" style="margin-bottom: 0; z-index: 1;">
		<div class="container">
            <div class="c-content-title-1">
                <h3 class="c-center c-font-uppercase c-font-bold c-font-white">宝山顾村公园周边</h3>
                <div class="c-line-center c-theme-bg"></div>
            </div>
            <div class="col-md-3">
                <img class="img-responsive" src="views/assets/base/img/content/mall/baoshan-tm/bs-5.jpeg" alt=""><br>
            </div>
            <div class="col-md-3">
                <img class="img-responsive" src="views/assets/base/img/content/mall/baoshan-tm/bs-6.jpeg" alt=""><br>
            </div>
            <div class="col-md-3">
                <img class="img-responsive" src="views/assets/base/img/content/mall/baoshan-tm/bs-7.jpeg" alt=""><br>
            </div>
            <div class="col-md-3">
                <img class="img-responsive" src="views/assets/base/img/content/mall/baoshan-tm/bs-8.jpeg" alt=""><br>
            </div>
        </div>  
	</div>
    
    <div class="c-content-box c-size-md c-bg-white animated fadeInDown" style="z-index: 1;">
		<div class="container">
			<div class="c-content-bar-2 c-opt-1">
				<div class="row">
					<div class="col-md-6">
                        <div class="c-content-title-1">
							<h3 class="c-font-uppercase c-font-bold">便利的交通</h3>
                            <div class="c-line-left"></div>
							<ul id="traffics" class="c-content-list-1 c-theme c-separator-dot c-square"></ul>
						</div>
					</div>
                    <div class="col-md-6">
                        <div class="c-content-title-1">
							<h3 class="c-font-uppercase c-font-bold"><?= $lang['floor_hotel'] ?></h3>
							<ul class="c-content-list-1 c-theme c-separator-dot c-square">
                                <li class="c-bg-before-red"><a href="http://www.hlwhotel.com/W/view23976/" target="_blank">上海衡山北郊宾馆</a> <small>宝山区沪太路4788号（顾村公园环境之中）</small></li>
                            </ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
    
    <a id="f3_g" href="views/html/user/component/floor-plan-baoshan-tm.php?m=<?= $bs_tm?>&f=3" data-toggle="modal" data-target="#floor_map_F_baoshan" class="hidden-xs hidden-sm hidden-md floor-guide"><span class="badge c-bg-white c-font-red c-font-bold">3F</span><img src="views/assets/base/img/content/floor-plan/baoshan-tm/3F.png" class="img-responsive" alt="" /></a>
    <a id="f2_g" href="views/html/user/component/floor-plan-baoshan-tm.php?m=<?= $bs_tm?>&f=2" data-toggle="modal" data-target="#floor_map_F_baoshan" class="hidden-xs hidden-sm hidden-md floor-guide"><span class="badge c-bg-white c-font-red c-font-bold">2F</span><img src="views/assets/base/img/content/floor-plan/baoshan-tm/2F.png" class="img-responsive" alt="" /></a>
    <a id="f1_g" href="views/html/user/component/floor-plan-baoshan-tm.php?m=<?= $bs_tm?>&f=1" data-toggle="modal" data-target="#floor_map_F_baoshan" class="hidden-xs hidden-sm hidden-md floor-guide"><span class="badge c-bg-white c-font-red c-font-bold">1F</span><img src="views/assets/base/img/content/floor-plan/baoshan-tm/1F.png" class="img-responsive" alt="" /></a>
    <a id="fb1_g" href="views/html/user/component/floor-plan-baoshan-tm.php?m=<?= $bs_tm?>&f=0" data-toggle="modal" data-target="#floor_map_F_baoshan" class="hidden-xs hidden-sm hidden-md floor-guide"><span class="badge c-bg-white c-font-red c-font-bold">B1F</span><img src="views/assets/base/img/content/floor-plan/baoshan-tm/0F.png" class="img-responsive" alt="" /></a>
    
    <div id="floor_map_F_baoshan" class="modal fade" role="dialog">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-body"></div>
            </div>
        </div>
    </div>
</div>

<?php include ('footer.php'); ?>