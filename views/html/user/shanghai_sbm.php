<?php
$scripts = $scripts. '<script type="text/javascript" src="views/assets/base/js/shanghai-sbm.js"></script>';
?>

<!-- BEGIN: PAGE CONTAINER -->
<div class="c-layout-page">
    <!-- BEGIN: 标题 -->
	<div class="c-layout-breadcrumbs-1 c-fonts-uppercase c-fonts-bold">
		<div class="container">
			<div class="c-page-title c-pull-left">
				<h3 class="c-font-bold"><span class="mall-name"></span></h3>
			</div>
			<ul class="c-page-breadcrumbs c-theme-nav c-pull-right c-fonts-regular">
				<li>
					<a href="/"><?= $lang['mall_home'] ?></a>
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
    <div class="c-content-box" style="background-color: #000; margin-bottom: 0; overflow: hidden; z-index: 1;">
        <div class="col-md-6">
            <video loop="loop" src="upload/video/shanghai-sbm.mp4" controls="true" width="100%"></video>
        </div>
        <div class="container">
            <div class="col-md-6">
                <div class="c-content-testimonial-2-slider" data-slider="owl" data-single-item="true" data-auto-play="10000">
                    <div class="owl-carousel owl-theme c-theme owl-single">
                        <div class="item">
                            <div class="c-content-title-1" style="margin-top: 40px;">
                                <h3 class="c-font-bold c-font-white"><?= $lang['mall_shanghai_brief'] ?></h3>
                                <div class="c-content-bar-1 c-opt-1">
                                    <blockquote class="c-theme-border c-font-white" style="text-align: left;">
                                        <p><?= $lang['mall_shanghai_brief_p'] ?></p>
                                    </blockquote>
                                    <ul class="c-content-list-1 c-theme" style="text-align: left;">
                                        <li class="c-bg-before-red c-font-white">
                                            <?= $lang['mall_gdp'] ?>: <span class="c-counter c-bg-red-font" data-counter="counterup">30,134</span><?= $lang['mall_yiyuan'] ?>
                                        </li>
                                        <li class="c-bg-before-red c-font-white">
                                            <?= $lang['mall_resident_population'] ?>: <span class="c-counter c-bg-red-font" data-counter="counterup">24,183,300</span><?= $lang['mall_ren'] ?>
                                        </li>
                                        <li class="c-bg-before-red c-font-white">
                                            <?= $lang['mall_retail_sales'] ?>: <span class="c-counter c-bg-red-font" data-counter="counterup">11,830</span></span><?= $lang['mall_yiyuan'] ?>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="item">
                            <div class="c-content-title-1" style="margin-top: 40px;">
                                <h3 class="c-font-bold c-font-white"><?= $lang['mall_desc'] ?></h3>
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
    
    <div class="c-content-box c-no-padding c-size-md c-bg-dark" style="margin-bottom: 0; z-index: 1;">
		<div class="container">
			<div class="c-content-bar-3">
				<div class="row">
                    <div class="col-md-2 col-md-offset-4 col-xs-6">
						<div class="c-content-v-center" style="height: 90px;">
							<div class="c-wrapper">
                                <div class="c-body">
                                    <a href="requirement" class="btn btn-md c-btn-square c-btn-border-2x c-theme-btn c-btn-uppercase c-btn-bold"><i class="icon-map"></i> <?= $lang['mall_shops'] ?></a>
								</div>
							</div>
						</div>
					</div>
					<div class="col-md-2 col-xs-6">
						<div class="c-content-v-center" style="height: 90px;">
							<div class="c-wrapper">
                                <div class="c-body">
                                    <a href="events" class="btn btn-md c-btn-square c-btn-border-2x c-theme-btn c-btn-uppercase c-btn-bold"><i class="icon-calendar"></i> <?= $lang['mall_events'] ?></a>
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
    <div id="intro" class="c-content-box" style="margin-bottom: 0; z-index: 1;">
		<div class="container">
			<div class="c-content-contact-1 c-opt-1">
				<div class="row" data-auto-height=".c-height">
					<div class="col-sm-8 c-desktop">
					</div>
					<div class="col-sm-4">
						<div class="c-body">
							<div class="c-section">
                                <h3><?= $lang['mall_business_invitation'] ?></h3>
							</div>
							<div class="c-section">
								<div class="c-content-label c-font-uppercase c-font-bold c-theme-bg">
									<?= $lang['mall_location'] ?>
								</div>
								<div>
									<span id="street"></span>
								</div>
                                <br>
                                <div class="c-content-label c-font-uppercase c-font-bold c-theme-bg">
									<?= $lang['mall_floor_area'] ?>
								</div>
								<div>
									<span id="gross_floor_area"></span>m<sup>2</sup>
								</div>
                                <br>
                                <div class="c-content-label c-font-uppercase c-font-bold c-theme-bg">
									<?= $lang['mall_leasable_area'] ?>
								</div>
								<div>
                                    <span id="leasing_area"></span>m<sup>2</sup>
								</div>
                                <br>
                                <div class="c-content-label c-font-uppercase c-font-bold c-theme-bg">
									<?= $lang['mall_stores'] ?>
								</div>
								<div>
									<span><?= $lang['mall_around'] ?>400<?= $lang['mall_pieces'] ?></span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
        <div id="gmapbg" class="c-content-contact-1-gmap c-content-box c-bg-parallax c-content-feature-16 hidden-sm hidden-xs" style="background-image: url(views/assets/base/img/content/mall/shanghai-sbm/<?= $lang['mall_lang_cat'] ?>/map.gif); margin-bottom: 0;">
		</div>
    </div>
    
    <!-- BEGIN: 10楼 -->
	<div id="f10" class="c-content-box c-bg-parallax c-content-feature-16" style="background-image: url(views/assets/base/img/content/mall/shanghai-sbm/10F.jpg); margin-bottom: 0;">
		<div class="container">
			<div class="row">
                <div class="col-md-5 col-xs-12">
                    <div class="c-feature-16-container c-bg-dark c-bg-opacity-4">
                        <div class="c-feature-16-line c-theme-bg"></div>
                        <h2 class="c-feature-16-title c-font-bold c-font-white">10F <?= $lang['mall_shanghai_sbm_10'] ?></h2>
                        <p class="c-feature-16-desc c-font-grey">
                            <?= $lang['mall_modality_shop_proportion'] ?>
                        </p>
                        <div id="proportion_f10"></div>
                        <a class="c-feature-15-btn btn c-btn btn-lg c-theme-btn c-font-uppercase c-font-bold c-btn-square" href="views/html/user/component/floor-plan-shanghai-sbm.php?m=<?= $shanghai_sbm?>&f=10" data-toggle="modal" data-target="#floor_map_F"><?= $lang['mall_open_floor_map'] ?></a>
                    </div>
                </div>
            </div>
		</div>
	</div>
	<!-- END: 10楼 -->
    
    <!-- BEGIN: 9楼 -->
	<div id="f9" class="c-content-box c-bg-parallax c-content-feature-16" style="background-image: url(views/assets/base/img/content/mall/shanghai-sbm/9F.jpg); margin-bottom: 0;">
		<div class="container">
			<div class="row">
                <div class="col-md-offset-7 col-md-5 col-xs-12">
                    <div class="c-feature-16-container c-bg-white c-bg-opacity-5">
                        <div class="c-feature-16-line c-theme-bg"></div>
                        <h2 class="c-feature-16-title c-font-bold">9F <?= $lang['mall_shanghai_sbm_9'] ?></h2>
                        <p class="c-feature-16-desc">
                            <?= $lang['mall_modality_shop_proportion'] ?>
                        </p>
                        <div id="proportion_f9"></div>
                        <a class="c-feature-15-btn btn c-btn btn-lg c-theme-btn c-font-uppercase c-font-bold c-btn-square" href="views/html/user/component/floor-plan-shanghai-sbm.php?m=<?= $shanghai_sbm?>&f=9" data-toggle="modal" data-target="#floor_map_F"><?= $lang['mall_open_floor_map'] ?></a>
                    </div>
                </div>
            </div>
		</div>
	</div>
	<!-- END: 9楼 -->
    
    <!-- BEGIN: 8楼 -->
	<div id="f8" class="c-content-box c-bg-parallax c-content-feature-16" style="background-image: url(views/assets/base/img/content/mall/shanghai-sbm/8F.jpg); margin-bottom: 0;">
		<div class="container">
			<div class="row">
                <div class="col-md-5 col-xs-12">
                    <div class="c-feature-16-container c-bg-dark c-bg-opacity-4">
                        <div class="c-feature-16-line c-theme-bg"></div>
                        <h2 class="c-feature-16-title c-font-bold c-font-white">8F <?= $lang['mall_shanghai_sbm_8'] ?></h2>
                        <p class="c-feature-16-desc c-font-grey">
                            <?= $lang['mall_modality_shop_proportion'] ?>
                        </p>
                        <div id="proportion_f8"></div>
                        <a class="c-feature-15-btn btn c-btn btn-lg c-theme-btn c-font-uppercase c-font-bold c-btn-square" href="views/html/user/component/floor-plan-shanghai-sbm.php?m=<?= $shanghai_sbm?>&f=8" data-toggle="modal" data-target="#floor_map_F"><?= $lang['mall_open_floor_map'] ?></a>
                    </div>
                </div>
            </div>
		</div>
	</div>
	<!-- END: 8楼 -->
    
    <!-- BEGIN: 7楼 -->
	<div id="f7" class="c-content-box c-bg-parallax c-content-feature-16" style="background-image: url(views/assets/base/img/content/mall/shanghai-sbm/7F.jpg); margin-bottom: 0;">
		<div class="container">
			<div class="row">
                <div class="col-md-offset-7 col-md-5 col-xs-12">
                    <div class="c-feature-16-container c-bg-white c-bg-opacity-5">
                        <div class="c-feature-16-line c-theme-bg"></div>
                        <h2 class="c-feature-16-title c-font-bold">7F <?= $lang['mall_shanghai_sbm_7'] ?></h2>
                        <p class="c-feature-16-desc">
                            <?= $lang['mall_modality_shop_proportion'] ?>
                        </p>
                        <div id="proportion_f7"></div>
                        <a class="c-feature-15-btn btn c-btn btn-lg c-theme-btn c-font-uppercase c-font-bold c-btn-square" href="views/html/user/component/floor-plan-shanghai-sbm.php?m=<?= $shanghai_sbm?>&f=7" data-toggle="modal" data-target="#floor_map_F"><?= $lang['mall_open_floor_map'] ?></a>
                    </div>
                </div>
            </div>
		</div>
	</div>
	<!-- END: 7楼 -->
    
    <!-- BEGIN: 6楼 -->
	<div id="f6" class="c-content-box c-bg-parallax c-content-feature-16" style="background-image: url(views/assets/base/img/content/mall/shanghai-sbm/6F.jpg); margin-bottom: 0;">
		<div class="container">
			<div class="row">
                <div class="col-md-5 col-xs-12">
                    <div class="c-feature-16-container c-bg-dark c-bg-opacity-4">
                        <div class="c-feature-16-line c-theme-bg"></div>
                        <h2 class="c-feature-16-title c-font-bold c-font-white">6F <?= $lang['mall_shanghai_sbm_6'] ?></h2>
                        <p class="c-feature-16-desc c-font-grey">
                            <?= $lang['mall_modality_shop_proportion'] ?>
                        </p>
                        <div id="proportion_f6"></div>
                        <a class="c-feature-15-btn btn c-btn btn-lg c-theme-btn c-font-uppercase c-font-bold c-btn-square" href="views/html/user/component/floor-plan-shanghai-sbm.php?m=<?= $shanghai_sbm?>&f=6" data-toggle="modal" data-target="#floor_map_F"><?= $lang['mall_open_floor_map'] ?></a>
                    </div>
                </div>
            </div>
		</div>
	</div>
	<!-- END: 6楼 -->
    
    <!-- BEGIN: 5楼 -->
	<div id="f5" class="c-content-box c-bg-parallax c-content-feature-16" style="background-image: url(views/assets/base/img/content/mall/shanghai-sbm/5F.jpg); margin-bottom: 0;">
		<div class="container">
			<div class="row">
                <div class="col-md-offset-7 col-md-5 col-xs-12">
                    <div class="c-feature-16-container c-bg-white c-bg-opacity-5">
                        <div class="c-feature-16-line c-theme-bg"></div>
                        <h2 class="c-feature-16-title c-font-bold">5F <?= $lang['mall_shanghai_sbm_5'] ?></h2>
                        <p class="c-feature-16-desc">
                            <?= $lang['mall_modality_shop_proportion'] ?>
                        </p>
                        <div id="proportion_f5"></div>
                        <a class="c-feature-15-btn btn c-btn btn-lg c-theme-btn c-font-uppercase c-font-bold c-btn-square" href="views/html/user/component/floor-plan-shanghai-sbm.php?m=<?= $shanghai_sbm?>&f=5" data-toggle="modal" data-target="#floor_map_F"><?= $lang['mall_open_floor_map'] ?></a>
                    </div>
                </div>
            </div>
		</div>
	</div>
	<!-- END: 5楼 -->
    
    <!-- BEGIN: 4楼 -->
	<div id="f4" class="c-content-box c-bg-parallax c-content-feature-16" style="background-image: url(views/assets/base/img/content/mall/shanghai-sbm/4F.jpg); margin-bottom: 0;">
		<div class="container">
			<div class="row">
                <div class="col-md-5 col-xs-12">
                    <div class="c-feature-16-container c-bg-dark c-bg-opacity-4">
                        <div class="c-feature-16-line c-theme-bg"></div>
                        <h2 class="c-feature-16-title c-font-bold c-font-white">4F <?= $lang['mall_shanghai_sbm_4'] ?></h2>
                        <p class="c-feature-16-desc c-font-grey">
                            <?= $lang['mall_modality_shop_proportion'] ?>
                        </p>
                        <div id="proportion_f4"></div>
                        <a class="c-feature-15-btn btn c-btn btn-lg c-theme-btn c-font-uppercase c-font-bold c-btn-square" href="views/html/user/component/floor-plan-shanghai-sbm.php?m=<?= $shanghai_sbm?>&f=4" data-toggle="modal" data-target="#floor_map_F"><?= $lang['mall_open_floor_map'] ?></a>
                    </div>
                </div>
            </div>
		</div>
	</div>
	<!-- END: 4楼 -->
    
    <!-- BEGIN: 3楼 -->
	<div id="f3" class="c-content-box c-bg-parallax c-content-feature-16" style="background-image: url(views/assets/base/img/content/mall/shanghai-sbm/3F.jpg); margin-bottom: 0;">
		<div class="container">
			<div class="row">
                <div class="col-md-offset-7 col-md-5 col-xs-12">
                    <div class="c-feature-16-container c-bg-white c-bg-opacity-5">
                        <div class="c-feature-16-line c-theme-bg"></div>
                        <h2 class="c-feature-16-title c-font-bold">3F <?= $lang['mall_shanghai_sbm_3'] ?></h2>
                        <p class="c-feature-16-desc">
                            <?= $lang['mall_modality_shop_proportion'] ?>
                        </p>
                        <div id="proportion_f3"></div>
                        <a class="c-feature-15-btn btn c-btn btn-lg c-theme-btn c-font-uppercase c-font-bold c-btn-square" href="views/html/user/component/floor-plan-shanghai-sbm.php?m=<?= $shanghai_sbm?>&f=3" data-toggle="modal" data-target="#floor_map_F"><?= $lang['mall_open_floor_map'] ?></a>
                    </div>
                </div>
            </div>
		</div>
	</div>
	<!-- END: 3楼 -->
    
    <!-- BEGIN: 2楼 -->
	<div id="f2" class="c-content-box c-bg-parallax c-content-feature-16" style="background-image: url(views/assets/base/img/content/mall/shanghai-sbm/2F.jpg); margin-bottom: 0;">
		<div class="container">
			<div class="row">
                <div class="col-md-5 col-xs-12">
                    <div class="c-feature-16-container c-bg-dark c-bg-opacity-4">
                        <div class="c-feature-16-line c-theme-bg"></div>
                        <h2 class="c-feature-16-title c-font-bold c-font-white">2F <?= $lang['mall_shanghai_sbm_2'] ?></h2>
                        <p class="c-feature-16-desc c-font-grey">
                            <?= $lang['mall_modality_shop_proportion'] ?>
                        </p>
                        <div id="proportion_f2"></div>
                        <a class="c-feature-15-btn btn c-btn btn-lg c-theme-btn c-font-uppercase c-font-bold c-btn-square" href="views/html/user/component/floor-plan-shanghai-sbm.php?m=<?= $shanghai_sbm?>&f=2" data-toggle="modal" data-target="#floor_map_F"><?= $lang['mall_open_floor_map'] ?></a>
                    </div>
                </div>
            </div>
		</div>
	</div>
	<!-- END: 2楼 -->
    
    <!-- BEGIN: 1楼 -->
	<div id="f1" class="c-content-box c-bg-parallax c-content-feature-16" style="background-image: url(views/assets/base/img/content/mall/shanghai-sbm/1F.jpg); margin-bottom: 0;">
		<div class="container">
			<div class="row">
                <div class="col-md-offset-7 col-md-5 col-xs-12">
                    <div class="c-feature-16-container c-bg-white c-bg-opacity-5">
                        <div class="c-feature-16-line c-theme-bg"></div>
                        <h2 class="c-feature-16-title c-font-bold">1F <?= $lang['mall_shanghai_sbm_1'] ?></h2>
                        <p class="c-feature-16-desc">
                            <?= $lang['mall_modality_shop_proportion'] ?>
                        </p>
                        <div id="proportion_f1"></div>
                        <a class="c-feature-15-btn btn c-btn btn-lg c-theme-btn c-font-uppercase c-font-bold c-btn-square" href="views/html/user/component/floor-plan-shanghai-sbm.php?m=<?= $shanghai_sbm?>&f=1" data-toggle="modal" data-target="#floor_map_F"><?= $lang['mall_open_floor_map'] ?></a>
                    </div>
                </div>
            </div>
		</div>
	</div>
	<!-- END: 1楼 -->
    
    <!-- BEGIN: B1楼 -->
	<div id="fb1" class="c-content-box c-bg-parallax c-content-feature-16" style="background-image: url(views/assets/base/img/content/mall/shanghai-sbm/B1F.jpg); margin-bottom: 0;">
		<div class="container">
			<div class="row">
                <div class="col-md-5 col-xs-12">
                    <div class="c-feature-16-container c-bg-dark c-bg-opacity-4">
                        <div class="c-feature-16-line c-theme-bg"></div>
                        <h2 class="c-feature-16-title c-font-bold c-font-white">B1F <?= $lang['mall_shanghai_sbm_0'] ?></h2>
                        <p class="c-feature-16-desc c-font-grey">
                            <?= $lang['mall_modality_shop_proportion'] ?>
                        </p>
                        <div id="proportion_fb1"></div>
                        <a class="c-feature-15-btn btn c-btn btn-lg c-theme-btn c-font-uppercase c-font-bold c-btn-square" href="views/html/user/component/floor-plan-shanghai-sbm.php?m=<?= $shanghai_sbm?>&f=0" data-toggle="modal" data-target="#floor_map_F"><?= $lang['mall_open_floor_map'] ?></a>
                    </div>
                </div>
            </div>
		</div>
	</div>
	<!-- END: B1楼 -->
    
    <div class="c-content-box c-size-lg c-bg-white" style="margin-bottom: 0; z-index: 1;">
		<div class="container">
            <div class="c-content-title-1">
                <h3 class="c-center c-font-bold mall-name"></h3>
                <div class="c-line-center c-theme-bg"></div>
            </div>
            <div class="col-md-3">
                <img class="img-responsive" src="views/assets/base/img/content/mall/shanghai-sbm/<?= $lang['mall_lang_cat'] ?>/sh-5.jpeg" alt=""><br>
            </div>
            <div class="col-md-3">
                <img class="img-responsive" src="views/assets/base/img/content/mall/shanghai-sbm/<?= $lang['mall_lang_cat'] ?>/sh-6.jpeg" alt=""><br>
            </div>
            <div class="col-md-3">
                <img class="img-responsive" src="views/assets/base/img/content/mall/shanghai-sbm/<?= $lang['mall_lang_cat'] ?>/sh-7.jpeg" alt=""><br>
            </div>
            <div class="col-md-3">
                <img class="img-responsive" src="views/assets/base/img/content/mall/shanghai-sbm/<?= $lang['mall_lang_cat'] ?>/sh-8.jpeg" alt=""><br>
            </div>
        </div>  
	</div>
    
    <div class="c-content-box c-size-lg c-bg-grey-2" style="margin-bottom: 0; z-index: 1;">
		<div class="container">
            <div class="c-content-title-1">
                <h3 class="c-center c-font-bold c-font-white"><?= $lang['mall_lujiazui_financial_zone'] ?></h3>
                <div class="c-line-center c-theme-bg"></div>
            </div>
            <div class="col-md-3">
                <img class="img-responsive" src="views/assets/base/img/content/mall/shanghai-sbm/<?= $lang['mall_lang_cat'] ?>/sh-1.jpeg" alt=""><br>
            </div>
            <div class="col-md-3">
                <img class="img-responsive" src="views/assets/base/img/content/mall/shanghai-sbm/<?= $lang['mall_lang_cat'] ?>/sh-2.jpeg" alt=""><br>
            </div>
            <div class="col-md-3">
                <img class="img-responsive" src="views/assets/base/img/content/mall/shanghai-sbm/<?= $lang['mall_lang_cat'] ?>/sh-3.jpeg" alt=""><br>
            </div>
            <div class="col-md-3">
                <img class="img-responsive" src="views/assets/base/img/content/mall/shanghai-sbm/<?= $lang['mall_lang_cat'] ?>/sh-4.jpeg" alt=""><br>
            </div>
        </div>  
	</div>
    
    <div class="c-content-box c-size-md c-bg-white" style="z-index: 1;">
		<div class="container">
			<div class="c-content-bar-2 c-opt-1">
				<div class="row">
					<div class="col-md-6">
                        <div class="c-content-title-1">
							<h3 class="c-font-bold"><?= $lang['mall_convenient_transportation'] ?></h3>
                            <div class="c-line-left"></div>
							<ul id="traffics" class="c-content-list-1 c-theme c-separator-dot c-square"></ul>
						</div>
					</div>
                    <div class="col-md-6">
                        <div class="c-content-title-1">
							<h3 class="c-font-bold"><?= $lang['mall_fivestar_hotel'] ?></h3>
                            <div class="c-line-left"></div>
							<ul class="c-content-list-1 c-theme c-separator-dot c-square">
                                <li class="c-bg-before-red"><a href="http://www.shangri-la.com/cn/shanghai/pudongshangrila/" target="_blank"><?= $lang['mall_shangri_la'] ?></a> <small><?= $lang['mall_shangri_la_addr'] ?></small></li>
                                <li class="c-bg-before-red"><a href="http://www.shicc.net/shicc/?lang=zh" target="_blank"><?= $lang['mall_oriental_riverside'] ?></a> <small><?= $lang['mall_oriental_riverside_addr'] ?></small></li>
                                <li class="c-bg-before-red"><a href="http://www.ritzcarlton.com/zh-cn/hotels/china/shanghai-pudong" target="_blank"><?= $lang['mall_ritz_carlton'] ?></a> <small><?= $lang['mall_ritz_carlton_addr'] ?></small></li>
                                <li class="c-bg-before-red"><a href="https://shanghai.grand.hyatt.com/zh-Hans/hotel/home.html" target="_blank"><?= $lang['mall_grand_hyatt'] ?></a> <small><?= $lang['mall_grand_hyatt_addr'] ?></small></li>
                                <li class="c-bg-before-red"><a href="http://www.kempinskishanghaihotel.com/" target="_blank"><?= $lang['mall_grand_kempinski'] ?></a> <small><?= $lang['mall_grand_kempinski_addr'] ?></small></li>
                                <li class="c-bg-before-red"><a href="http://shanghai-hyatt.com/" target="_blank"><?= $lang['mall_park_hyatt'] ?></a> <small><?= $lang['mall_park_hyatt_addr'] ?></small></li>
                                <li class="c-bg-before-red"><a href="https://cn.mandarinoriental.com/" target="_blank"><?= $lang['mall_mandarin_oriental'] ?></a> <small><?= $lang['mall_mandarin_oriental_addr'] ?></small></li>
                                <li class="c-bg-before-red"><a href="https://www.fourseasons.com/zh/pudong/offers/" target="_blank"><?= $lang['mall_four_seasons'] ?></a> <small><?= $lang['mall_four_seasons_addr'] ?></small></li>
                            </ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
    
    <a id="f10_g" href="views/html/user/component/floor-plan-shanghai-sbm.php?m=<?= $shanghai_sbm?>&f=10" data-toggle="modal" data-target="#floor_map_F" class="hidden-xs hidden-sm hidden-md floor-guide"><span class="badge c-bg-white c-font-red c-font-bold">10F</span><img src="views/assets/base/img/content/floor-plan/shanghai-sbm/10F.png" class="img-responsive" alt="" /></a>
    <a id="f9_g" href="views/html/user/component/floor-plan-shanghai-sbm.php?m=<?= $shanghai_sbm?>&f=9" data-toggle="modal" data-target="#floor_map_F" class="hidden-xs hidden-sm hidden-md floor-guide"><span class="badge c-bg-white c-font-red c-font-bold">9F</span><img src="views/assets/base/img/content/floor-plan/shanghai-sbm/9F.png" class="img-responsive" alt="" /></a>
    <a id="f8_g" href="views/html/user/component/floor-plan-shanghai-sbm.php?m=<?= $shanghai_sbm?>&f=8" data-toggle="modal" data-target="#floor_map_F" class="hidden-xs hidden-sm hidden-md floor-guide"><span class="badge c-bg-white c-font-red c-font-bold">8F</span><img src="views/assets/base/img/content/floor-plan/shanghai-sbm/8F.png" class="img-responsive" alt="" /></a>
    <a id="f7_g" href="views/html/user/component/floor-plan-shanghai-sbm.php?m=<?= $shanghai_sbm?>&f=7" data-toggle="modal" data-target="#floor_map_F" class="hidden-xs hidden-sm hidden-md floor-guide"><span class="badge c-bg-white c-font-red c-font-bold">7F</span><img src="views/assets/base/img/content/floor-plan/shanghai-sbm/7F.png" class="img-responsive" alt="" /></a>
    <a id="f6_g" href="views/html/user/component/floor-plan-shanghai-sbm.php?m=<?= $shanghai_sbm?>&f=6" data-toggle="modal" data-target="#floor_map_F" class="hidden-xs hidden-sm hidden-md floor-guide"><span class="badge c-bg-white c-font-red c-font-bold">6F</span><img src="views/assets/base/img/content/floor-plan/shanghai-sbm/6F.png" class="img-responsive" alt="" /></a>
    <a id="f5_g" href="views/html/user/component/floor-plan-shanghai-sbm.php?m=<?= $shanghai_sbm?>&f=5" data-toggle="modal" data-target="#floor_map_F" class="hidden-xs hidden-sm hidden-md floor-guide"><span class="badge c-bg-white c-font-red c-font-bold">5F</span><img src="views/assets/base/img/content/floor-plan/shanghai-sbm/5F.png" class="img-responsive" alt="" /></a>
    <a id="f4_g" href="views/html/user/component/floor-plan-shanghai-sbm.php?m=<?= $shanghai_sbm?>&f=4" data-toggle="modal" data-target="#floor_map_F" class="hidden-xs hidden-sm hidden-md floor-guide"><span class="badge c-bg-white c-font-red c-font-bold">4F</span><img src="views/assets/base/img/content/floor-plan/shanghai-sbm/4F.png" class="img-responsive" alt="" /></a>
    <a id="f3_g" href="views/html/user/component/floor-plan-shanghai-sbm.php?m=<?= $shanghai_sbm?>&f=3" data-toggle="modal" data-target="#floor_map_F" class="hidden-xs hidden-sm hidden-md floor-guide"><span class="badge c-bg-white c-font-red c-font-bold">3F</span><img src="views/assets/base/img/content/floor-plan/shanghai-sbm/3F.png" class="img-responsive" alt="" /></a>
    <a id="f2_g" href="views/html/user/component/floor-plan-shanghai-sbm.php?m=<?= $shanghai_sbm?>&f=2" data-toggle="modal" data-target="#floor_map_F" class="hidden-xs hidden-sm hidden-md floor-guide"><span class="badge c-bg-white c-font-red c-font-bold">2F</span><img src="views/assets/base/img/content/floor-plan/shanghai-sbm/2F.png" class="img-responsive" alt="" /></a>
    <a id="f1_g" href="views/html/user/component/floor-plan-shanghai-sbm.php?m=<?= $shanghai_sbm?>&f=1" data-toggle="modal" data-target="#floor_map_F" class="hidden-xs hidden-sm hidden-md floor-guide"><span class="badge c-bg-white c-font-red c-font-bold">1F</span><img src="views/assets/base/img/content/floor-plan/shanghai-sbm/1F.png" class="img-responsive" alt="" /></a>
    <a id="fb1_g" href="views/html/user/component/floor-plan-shanghai-sbm.php?m=<?= $shanghai_sbm?>&f=0" data-toggle="modal" data-target="#floor_map_F" class="hidden-xs hidden-sm hidden-md floor-guide"><span class="badge c-bg-white c-font-red c-font-bold">B1F</span><img src="views/assets/base/img/content/floor-plan/shanghai-sbm/0F.png" class="img-responsive" alt="" /></a>
    
    <div id="floor_map_F" class="modal fade" role="dialog">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-body"></div>
            </div>
        </div>
    </div>
</div>

<?php include ('footer.php'); ?>