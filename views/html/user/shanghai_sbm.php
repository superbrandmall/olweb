<?php
$scripts = $scripts. '<script type="text/javascript" src="views/assets/base/js/shanghai-sbm.js"></script>';
?>

<!-- BEGIN: PAGE CONTAINER -->
<div class="c-layout-page">
    <div class="c-content-box c-size-md" style="background-image: url(views/assets/base/img/content/backgrounds/body-4.jpg); background-position: center bottom; margin-bottom: 0; z-index: 1;">
		<div class="container">
			<div class="c-content-feature-3-grid">
				<h3 class="c-title c-font-bold mall-name"></h3>
                <div class="row">
                    <div class="col-md-2 col-md-offset-4 col-xs-6">
						<div class="c-content-v-center" style="height: 90px;">
							<div class="c-wrapper">
                                <div class="c-body">
                                    <a href="requirement" class="btn btn-lg c-btn-white c-btn-uppercase c-btn-square"><?= $lang['mall_shops'] ?></a>
								</div>
							</div>
						</div>
					</div>
					<div class="col-md-2 col-xs-6">
						<div class="c-content-v-center" style="height: 90px;">
							<div class="c-wrapper">
                                <div class="c-body">
                                    <a href="events" class="btn btn-lg c-btn-white c-btn-uppercase c-btn-square"><?= $lang['mall_events'] ?></a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
    
    <!-- BEGIN: 项目介绍 -->
    <div class="c-content-box c-size-lg c-bg-white" style="margin-bottom: 0; z-index: 1;">
		<div class="container">
            <div class="c-content-title-1">
                <h3 class="c-center c-font-bold"><?= $lang['mall_shanghai_brief'] ?> & <?= $lang['mall_desc'] ?></h3>
            </div>
            <div class="col-md-4">
                <video loop="loop" src="upload/video/<?= $lang['mall_lang_cat'] ?>/shanghai-sbm.mp4" controls="true" width="100%"></video><br><br>
                <div class="c-body">
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
                    </div>
                </div>
            </div>
            <div class="col-md-8">
                <p><?= $lang['mall_shanghai_brief_p'] ?></p>
                <div class="row">
					<div class="col-md-4">
                        <h4 class="c-title c-first c-font-bold"><?= $lang['mall_gdp'] ?></h4>
						<span class="c-counter c-font-bold c-theme-font" data-counter="counterup">
							30,134</span><?= $lang['mall_yiyuan'] ?>
						</span>
					</div>
					<div class="col-md-4">
                        <h4 class="c-title c-font-bold"><?= $lang['mall_resident_population'] ?></h4>
						<span class="c-counter c-font-bold c-theme-font" data-counter="counterup">
							24,183,300
                        </span><?= $lang['mall_ren'] ?>
					</div>
					<div class="col-md-4">
                        <h4 class="c-title c-font-bold"><?= $lang['mall_retail_sales'] ?></h4>
						<span class="c-counter c-font-bold c-theme-font" data-counter="counterup">
							11,830
                        </span><?= $lang['mall_yiyuan'] ?>
					</div>
				</div>
                <ul id="mall_desc" class="c-content-list-1 c-theme" style="text-align: left;"></ul>
            </div>
        </div>
    </div>
    <!-- END: 项目介绍 -->
    
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
                        <a class="c-feature-15-btn btn c-btn btn-lg c-btn-blue c-font-uppercase c-btn-square" href="views/html/user/component/floor-plan-shanghai-sbm.php?m=<?= $shanghai_sbm?>&f=10" data-toggle="modal" data-target="#floor_map_F"><?= $lang['mall_open_floor_map'] ?></a>
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
                        <a class="c-feature-15-btn btn c-btn btn-lg c-theme-btn c-font-uppercase c-btn-square" href="views/html/user/component/floor-plan-shanghai-sbm.php?m=<?= $shanghai_sbm?>&f=9" data-toggle="modal" data-target="#floor_map_F"><?= $lang['mall_open_floor_map'] ?></a>
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
                        <a class="c-feature-15-btn btn c-btn btn-lg c-btn-blue c-font-uppercase c-btn-square" href="views/html/user/component/floor-plan-shanghai-sbm.php?m=<?= $shanghai_sbm?>&f=8" data-toggle="modal" data-target="#floor_map_F"><?= $lang['mall_open_floor_map'] ?></a>
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
                        <a class="c-feature-15-btn btn c-btn btn-lg c-theme-btn c-font-uppercase c-btn-square" href="views/html/user/component/floor-plan-shanghai-sbm.php?m=<?= $shanghai_sbm?>&f=7" data-toggle="modal" data-target="#floor_map_F"><?= $lang['mall_open_floor_map'] ?></a>
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
                        <a class="c-feature-15-btn btn c-btn btn-lg c-btn-blue c-font-uppercase c-btn-square" href="views/html/user/component/floor-plan-shanghai-sbm.php?m=<?= $shanghai_sbm?>&f=6" data-toggle="modal" data-target="#floor_map_F"><?= $lang['mall_open_floor_map'] ?></a>
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
                        <a class="c-feature-15-btn btn c-btn btn-lg c-theme-btn c-font-uppercase c-btn-square" href="views/html/user/component/floor-plan-shanghai-sbm.php?m=<?= $shanghai_sbm?>&f=5" data-toggle="modal" data-target="#floor_map_F"><?= $lang['mall_open_floor_map'] ?></a>
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
                        <a class="c-feature-15-btn btn c-btn btn-lg c-btn-blue c-font-uppercase c-btn-square" href="views/html/user/component/floor-plan-shanghai-sbm.php?m=<?= $shanghai_sbm?>&f=4" data-toggle="modal" data-target="#floor_map_F"><?= $lang['mall_open_floor_map'] ?></a>
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
                        <a class="c-feature-15-btn btn c-btn btn-lg c-theme-btn c-font-uppercase c-btn-square" href="views/html/user/component/floor-plan-shanghai-sbm.php?m=<?= $shanghai_sbm?>&f=3" data-toggle="modal" data-target="#floor_map_F"><?= $lang['mall_open_floor_map'] ?></a>
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
                        <a class="c-feature-15-btn btn c-btn btn-lg c-btn-blue c-font-uppercase c-btn-square" href="views/html/user/component/floor-plan-shanghai-sbm.php?m=<?= $shanghai_sbm?>&f=2" data-toggle="modal" data-target="#floor_map_F"><?= $lang['mall_open_floor_map'] ?></a>
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
                        <a class="c-feature-15-btn btn c-btn btn-lg c-theme-btn c-font-uppercase c-btn-square" href="views/html/user/component/floor-plan-shanghai-sbm.php?m=<?= $shanghai_sbm?>&f=1" data-toggle="modal" data-target="#floor_map_F"><?= $lang['mall_open_floor_map'] ?></a>
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
                        <a class="c-feature-15-btn btn c-btn btn-lg c-btn-blue c-font-uppercase c-btn-square" href="views/html/user/component/floor-plan-shanghai-sbm.php?m=<?= $shanghai_sbm?>&f=0" data-toggle="modal" data-target="#floor_map_F"><?= $lang['mall_open_floor_map'] ?></a>
                    </div>
                </div>
            </div>
		</div>
	</div>
	<!-- END: B1楼 -->
    
    <!-- BEGIN: CONTENT/SLIDERS/CLIENT-LOGOS-2 -->
	<!--<div class="c-content-box c-size-md c-bg-grey-1" style="background: url(views/assets/base/img/content/backgrounds/body-3.jpg) center center no-repeat;background-size: cover; padding-bottom: 120px; margin-bottom: 0;">
		<div class="container">
			<div class="c-content-client-logos-slider-1 c-bordered" data-slider="owl" data-items="5" data-desktop-items="4" data-desktop-small-items="3" data-tablet-items="3" data-mobile-small-items="1">
				<div class="c-content-title-1">
					<h3 class="c-center c-font-bold"><?= $lang['mall_business_invitation'] ?></h3>
                    <div class="c-line-center c-theme-bg">
					</div>
				</div>
				<div class="owl-mall-carousel owl-theme c-theme owl-bordered1" style="visibility: hidden;">
                    <div class="item">
                        <div style="height: 200px;" class="modality-name-div">
                            <div id="proportion_fb1" class="modality-name"></div>
                        </div>
                        <a href="views/html/user/component/floor-plan-shanghai-sbm.php?m=<?= $shanghai_sbm?>&f=0" data-toggle="modal" data-target="#floor_map_F">
                            <span style="height: 100px;" class="floor-name">
                                <span class="btn btn-xs c-btn-square c-btn-border-opacity-04 c-btn-uppercase c-btn-bold">
                                    <i class="fa fa-bank"></i><br>
                                    <?= $lang['mall_open_floor_map'] ?>B1F
                                </span>
                            </span>
                        </a>
					</div>
                    <div class="item">
                        <div style="height: 190px;" class="modality-name-div">
                            <div id="proportion_f1" class="modality-name"></div>
                        </div>
                        <a href="views/html/user/component/floor-plan-shanghai-sbm.php?m=<?= $shanghai_sbm?>&f=1" data-toggle="modal" data-target="#floor_map_F">
                            <span style="height: 110px;" class="floor-name">
                                <span class="btn btn-xs c-btn-square c-btn-border-opacity-04 c-btn-uppercase c-btn-bold">
                                    <i class="fa fa-diamond"></i><br>
                                    <?= $lang['mall_open_floor_map'] ?>1F
                                </span>
                            </span>
                        </a>
					</div>
                    <div class="item">
                        <div style="height: 180px;" class="modality-name-div">
                            <div id="proportion_f2" class="modality-name"></div>
                        </div>
                        <a href="views/html/user/component/floor-plan-shanghai-sbm.php?m=<?= $shanghai_sbm?>&f=2" data-toggle="modal" data-target="#floor_map_F">
                            <span style="height: 120px;" class="floor-name">
                                <span class="btn btn-xs c-btn-square c-btn-border-opacity-04 c-btn-uppercase c-btn-bold">
                                    <i class="fa fa-child"></i><br>
                                    <?= $lang['mall_open_floor_map'] ?>2F
                                </span>
                            </span>
                        </a>
					</div>
                    <div class="item">
                        <div style="height: 170px;" class="modality-name-div">
                            <div id="proportion_f3" class="modality-name"></div>
                        </div>
                        <a href="views/html/user/component/floor-plan-shanghai-sbm.php?m=<?= $shanghai_sbm?>&f=3" data-toggle="modal" data-target="#floor_map_F">
                            <span style="height: 130px;" class="floor-name">
                                <span class="btn btn-xs c-btn-square c-btn-border-opacity-04 c-btn-uppercase c-btn-bold">
                                    <i class="fa fa-female"></i><br>
                                    <?= $lang['mall_open_floor_map'] ?>3F
                                </span>
                            </span>
                        </a>
					</div>
                    <div class="item">
                        <div style="height: 160px;" class="modality-name-div">
                            <div id="proportion_f4" class="modality-name"></div>
                        </div>
                        <a href="views/html/user/component/floor-plan-shanghai-sbm.php?m=<?= $shanghai_sbm?>&f=4" data-toggle="modal" data-target="#floor_map_F">
                            <span style="height: 140px;" class="floor-name">
                                <span class="btn btn-xs c-btn-square c-btn-border-opacity-04 c-btn-uppercase c-btn-bold">
                                    <i class="fa fa-soccer-ball-o"></i><br>
                                    <?= $lang['mall_open_floor_map'] ?>4F
                                </span>
                            </span>
                        </a>
					</div>
                    <div class="item">
                        <div style="height: 150px;" class="modality-name-div">
                            <div id="proportion_f5" class="modality-name"></div>
                        </div>
                        <a href="views/html/user/component/floor-plan-shanghai-sbm.php?m=<?= $shanghai_sbm?>&f=5" data-toggle="modal" data-target="#floor_map_F">
                            <span style="height: 150px;" class="floor-name">
                                <span class="btn btn-xs c-btn-square c-btn-border-opacity-04 c-btn-uppercase c-btn-bold">
                                    <i class="fa fa-male"></i><br>
                                    <?= $lang['mall_open_floor_map'] ?>5F
                                </span>
                            </span>
                        </a>
					</div>
                    <div class="item">
                        <div style="height: 140px;" class="modality-name-div">
                            <div id="proportion_f6" class="modality-name"></div>
                        </div>
                        <a href="views/html/user/component/floor-plan-shanghai-sbm.php?m=<?= $shanghai_sbm?>&f=6" data-toggle="modal" data-target="#floor_map_F">
                            <span style="height: 160px;" class="floor-name">
                                <span class="btn btn-xs c-btn-square c-btn-border-opacity-04 c-btn-uppercase c-btn-bold">
                                    <i class="fa fa-cutlery"></i><br>
                                    <?= $lang['mall_open_floor_map'] ?>6F
                                </span>
                            </span>
                        </a>
					</div>
                    <div class="item">
                        <div style="height: 130px;" class="modality-name-div">
                            <div id="proportion_f7" class="modality-name"></div>
                        </div>
                        <a href="views/html/user/component/floor-plan-shanghai-sbm.php?m=<?= $shanghai_sbm?>&f=7" data-toggle="modal" data-target="#floor_map_F">
                            <span style="height: 170px;" class="floor-name">
                                <span class="btn btn-xs c-btn-square c-btn-border-opacity-04 c-btn-uppercase c-btn-bold">
                                    <i class="fa fa-venus-mars"></i><br>
                                    <?= $lang['mall_open_floor_map'] ?>7F
                                </span>
                            </span>
                        </a>
					</div>
                    <div class="item">
                        <div style="height: 120px;" class="modality-name-div">
                            <div id="proportion_f8" class="modality-name"></div>
                        </div>
                        <a href="views/html/user/component/floor-plan-shanghai-sbm.php?m=<?= $shanghai_sbm?>&f=8" data-toggle="modal" data-target="#floor_map_F">
                            <span style="height: 180px;" class="floor-name">
                                <span class="btn btn-xs c-btn-square c-btn-border-opacity-04 c-btn-uppercase c-btn-bold">
                                    <i class="fa fa-film"></i><br>
                                    <?= $lang['mall_open_floor_map'] ?>8F
                                </span>
                            </span>
                        </a>
					</div>
                    <div class="item">
                        <div style="height: 110px;" class="modality-name-div">
                            <div id="proportion_f9" class="modality-name"></div>
                        </div>
                        <a href="views/html/user/component/floor-plan-shanghai-sbm.php?m=<?= $shanghai_sbm?>&f=9" data-toggle="modal" data-target="#floor_map_F">
                            <span style="height: 190px;" class="floor-name">
                                <span class="btn btn-xs c-btn-square c-btn-border-opacity-04 c-btn-uppercase c-btn-bold">
                                    <i class="fa fa-suitcase"></i><br>
                                    <?= $lang['mall_open_floor_map'] ?>9F
                                </span>
                            </span>
                        </a>
					</div>
                    <div class="item">
                        <div style="height: 100px;" class="modality-name-div">
                            <div id="proportion_f10" class="modality-name"></div>
                        </div>
                        <a href="views/html/user/component/floor-plan-shanghai-sbm.php?m=<?= $shanghai_sbm?>&f=10" data-toggle="modal" data-target="#floor_map_F">
                            <span style="height: 200px;" class="floor-name">
                                <span class="btn btn-xs c-btn-square c-btn-border-opacity-04 c-btn-uppercase c-btn-bold">
                                    <i class="fa fa-suitcase"></i><br>
                                    <?= $lang['mall_open_floor_map'] ?>10F
                                </span>
                            </span>
                        </a>
					</div>
				</div>
			</div>
		</div>
	</div>-->
	<!-- END: CONTENT/SLIDERS/CLIENT-LOGOS-2 -->

    <div class="c-content-box c-size-lg c-bg-white" style="margin-bottom: 0; z-index: 1;">
		<div class="container">
            <div class="c-content-title-1">
                <h3 class="c-center c-font-bold mall-name"></h3>
            </div>
            <div class="col-md-3">
                <img class="img-responsive" src="views/assets/base/img/content/mall/shanghai-sbm/<?= $lang['mall_lang_cat'] ?>/sh-5.jpg" alt=""><br>
            </div>
            <div class="col-md-3">
                <img class="img-responsive" src="views/assets/base/img/content/mall/shanghai-sbm/<?= $lang['mall_lang_cat'] ?>/sh-6.jpg" alt=""><br>
            </div>
            <div class="col-md-3">
                <img class="img-responsive" src="views/assets/base/img/content/mall/shanghai-sbm/<?= $lang['mall_lang_cat'] ?>/sh-7.jpg" alt=""><br>
            </div>
            <div class="col-md-3">
                <img class="img-responsive" src="views/assets/base/img/content/mall/shanghai-sbm/<?= $lang['mall_lang_cat'] ?>/sh-8.jpg" alt=""><br>
            </div>
        </div>  
	</div>
    
    <div class="c-content-box c-size-lg c-bg-grey-1" style="margin-bottom: 0; z-index: 1;">
		<div class="container">
            <div class="c-content-title-1">
                <h3 class="c-center c-font-bold"><?= $lang['mall_lujiazui_financial_zone'] ?></h3>
            </div>
            <div class="col-md-3">
                <img class="img-responsive" src="views/assets/base/img/content/mall/shanghai-sbm/<?= $lang['mall_lang_cat'] ?>/sh-1.jpg" alt=""><br>
            </div>
            <div class="col-md-3">
                <img class="img-responsive" src="views/assets/base/img/content/mall/shanghai-sbm/<?= $lang['mall_lang_cat'] ?>/sh-2.jpg" alt=""><br>
            </div>
            <div class="col-md-3">
                <img class="img-responsive" src="views/assets/base/img/content/mall/shanghai-sbm/<?= $lang['mall_lang_cat'] ?>/sh-3.jpg" alt=""><br>
            </div>
            <div class="col-md-3">
                <img class="img-responsive" src="views/assets/base/img/content/mall/shanghai-sbm/<?= $lang['mall_lang_cat'] ?>/sh-4.jpg" alt=""><br>
            </div>
        </div>  
	</div>
    
    <div class="c-content-box c-size-md c-bg-white" style="margin-bottom: 0; z-index: 1;">
		<div class="container">
			<div class="c-content-bar-2 c-opt-1">
				<div class="row">
					<div class="col-md-6">
                        <div class="c-content-title-1">
							<h3 class="c-font-bold"><?= $lang['mall_convenient_transportation'] ?></h3>
							<ul id="traffics" class="c-content-list-1 c-theme c-separator-dot c-square"></ul>
						</div>
					</div>
                    <div class="col-md-6">
                        <div class="c-content-title-1">
							<h3 class="c-font-bold"><?= $lang['mall_fivestar_hotel'] ?></h3>
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
    
    <a id="f10_g" href="views/html/user/component/floor-plan-shanghai-sbm.php?m=<?= $shanghai_sbm?>&f=10" data-toggle="modal" data-target="#floor_map_F" class="hidden-xs hidden-sm hidden-md floor-guide"><span class="badge c-bg-white c-font-red c-font-bold">10F</span><img src="views/assets/base/img/content/floor-plan/shanghai-sbm/<?= $lang['mall_lang_cat'] ?>/10F.png" class="img-responsive" alt="" /></a>
    <a id="f9_g" href="views/html/user/component/floor-plan-shanghai-sbm.php?m=<?= $shanghai_sbm?>&f=9" data-toggle="modal" data-target="#floor_map_F" class="hidden-xs hidden-sm hidden-md floor-guide"><span class="badge c-bg-white c-font-red c-font-bold">9F</span><img src="views/assets/base/img/content/floor-plan/shanghai-sbm/<?= $lang['mall_lang_cat'] ?>/9F.png" class="img-responsive" alt="" /></a>
    <a id="f8_g" href="views/html/user/component/floor-plan-shanghai-sbm.php?m=<?= $shanghai_sbm?>&f=8" data-toggle="modal" data-target="#floor_map_F" class="hidden-xs hidden-sm hidden-md floor-guide"><span class="badge c-bg-white c-font-red c-font-bold">8F</span><img src="views/assets/base/img/content/floor-plan/shanghai-sbm/<?= $lang['mall_lang_cat'] ?>/8F.png" class="img-responsive" alt="" /></a>
    <a id="f7_g" href="views/html/user/component/floor-plan-shanghai-sbm.php?m=<?= $shanghai_sbm?>&f=7" data-toggle="modal" data-target="#floor_map_F" class="hidden-xs hidden-sm hidden-md floor-guide"><span class="badge c-bg-white c-font-red c-font-bold">7F</span><img src="views/assets/base/img/content/floor-plan/shanghai-sbm/<?= $lang['mall_lang_cat'] ?>/7F.png" class="img-responsive" alt="" /></a>
    <a id="f6_g" href="views/html/user/component/floor-plan-shanghai-sbm.php?m=<?= $shanghai_sbm?>&f=6" data-toggle="modal" data-target="#floor_map_F" class="hidden-xs hidden-sm hidden-md floor-guide"><span class="badge c-bg-white c-font-red c-font-bold">6F</span><img src="views/assets/base/img/content/floor-plan/shanghai-sbm/<?= $lang['mall_lang_cat'] ?>/6F.png" class="img-responsive" alt="" /></a>
    <a id="f5_g" href="views/html/user/component/floor-plan-shanghai-sbm.php?m=<?= $shanghai_sbm?>&f=5" data-toggle="modal" data-target="#floor_map_F" class="hidden-xs hidden-sm hidden-md floor-guide"><span class="badge c-bg-white c-font-red c-font-bold">5F</span><img src="views/assets/base/img/content/floor-plan/shanghai-sbm/<?= $lang['mall_lang_cat'] ?>/5F.png" class="img-responsive" alt="" /></a>
    <a id="f4_g" href="views/html/user/component/floor-plan-shanghai-sbm.php?m=<?= $shanghai_sbm?>&f=4" data-toggle="modal" data-target="#floor_map_F" class="hidden-xs hidden-sm hidden-md floor-guide"><span class="badge c-bg-white c-font-red c-font-bold">4F</span><img src="views/assets/base/img/content/floor-plan/shanghai-sbm/<?= $lang['mall_lang_cat'] ?>/4F.png" class="img-responsive" alt="" /></a>
    <a id="f3_g" href="views/html/user/component/floor-plan-shanghai-sbm.php?m=<?= $shanghai_sbm?>&f=3" data-toggle="modal" data-target="#floor_map_F" class="hidden-xs hidden-sm hidden-md floor-guide"><span class="badge c-bg-white c-font-red c-font-bold">3F</span><img src="views/assets/base/img/content/floor-plan/shanghai-sbm/<?= $lang['mall_lang_cat'] ?>/3F.png" class="img-responsive" alt="" /></a>
    <a id="f2_g" href="views/html/user/component/floor-plan-shanghai-sbm.php?m=<?= $shanghai_sbm?>&f=2" data-toggle="modal" data-target="#floor_map_F" class="hidden-xs hidden-sm hidden-md floor-guide"><span class="badge c-bg-white c-font-red c-font-bold">2F</span><img src="views/assets/base/img/content/floor-plan/shanghai-sbm/<?= $lang['mall_lang_cat'] ?>/2F.png" class="img-responsive" alt="" /></a>
    <a id="f1_g" href="views/html/user/component/floor-plan-shanghai-sbm.php?m=<?= $shanghai_sbm?>&f=1" data-toggle="modal" data-target="#floor_map_F" class="hidden-xs hidden-sm hidden-md floor-guide"><span class="badge c-bg-white c-font-red c-font-bold">1F</span><img src="views/assets/base/img/content/floor-plan/shanghai-sbm/<?= $lang['mall_lang_cat'] ?>/1F.png" class="img-responsive" alt="" /></a>
    <a id="fb1_g" href="views/html/user/component/floor-plan-shanghai-sbm.php?m=<?= $shanghai_sbm?>&f=0" data-toggle="modal" data-target="#floor_map_F" class="hidden-xs hidden-sm hidden-md floor-guide"><span class="badge c-bg-white c-font-red c-font-bold">B1F</span><img src="views/assets/base/img/content/floor-plan/shanghai-sbm/<?= $lang['mall_lang_cat'] ?>/0F.png" class="img-responsive" alt="" /></a>
    
    <div id="floor_map_F" class="modal fade" role="dialog">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-body"></div>
            </div>
        </div>
    </div>
</div>

<?php include ('footer.php'); ?>