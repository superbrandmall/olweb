<?php
$scripts = $scripts. '<script type="text/javascript" src="views/assets/base/js/baoshan-tm.js"></script>';
?>

<!-- BEGIN: PAGE CONTAINER -->
<div class="c-layout-page">
    <div class="c-content-box c-size-md c-bg-parallax" style="background-image: url(views/assets/base/img/content/backgrounds/body-6.jpg); margin-bottom: 0;">
		<div class="container">
			<div class="c-content-feature-3-grid">
				<h3 class="c-title c-font-bold mall-name"></h3>
                <div class="row">
                    <div class="col-md-2 col-md-offset-4 col-xs-6">
						<div class="c-content-v-center" style="height: 90px;">
							<div class="c-wrapper">
                                <div class="c-body">
                                    <a href="requirement" class="btn btn-md c-btn-square c-btn-red-1 c-btn-uppercase c-btn-bold"><i class="icon-map"></i> <?= $lang['mall_shops'] ?></a>
								</div>
							</div>
						</div>
					</div>
					<div class="col-md-2 col-xs-6">
						<div class="c-content-v-center" style="height: 90px;">
							<div class="c-wrapper">
                                <div class="c-body">
                                    <a href="events" class="btn btn-md c-btn-square c-btn-blue c-btn-uppercase c-btn-bold"><i class="icon-calendar"></i> <?= $lang['mall_events'] ?></a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
    
    <!-- BEGIN: 项目介绍 -->
    <div class="c-content-box c-size-lg c-bg-white" style="margin-bottom: 0;">
		<div class="container">
            <div class="c-content-title-1">
                <h3 class="c-center c-font-bold"><?= $lang['mall_baoshan_brief'] ?> & <?= $lang['mall_desc'] ?></h3>
                <div class="c-line-center c-theme-bg"></div>
            </div>
            <div class="col-md-4">
                <video loop="loop" src="upload/video/<?= $lang['mall_lang_cat'] ?>/baoshan.mp4" controls="true" width="100%"></video><br><br>
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
                <p><?= $lang['mall_baoshan_brief_p'] ?></p>
                <div class="row">
					<div class="col-md-4">
                        <h4 class="c-title c-first c-font-bold"><?= $lang['mall_gdp'] ?></h4>
						<span class="c-counter c-font-bold c-theme-font" data-counter="counterup">
							1,147</span><?= $lang['mall_yiyuan'] ?>
						</span>
					</div>
					<div class="col-md-4">
                        <h4 class="c-title c-font-bold"><?= $lang['mall_resident_population'] ?></h4>
						<span class="c-counter c-font-bold c-theme-font" data-counter="counterup">
							2,030,800
                        </span><?= $lang['mall_ren'] ?>
					</div>
					<div class="col-md-4">
                        <h4 class="c-title c-font-bold"><?= $lang['mall_retail_sales'] ?></h4>
						<span class="c-counter c-font-bold c-theme-font" data-counter="counterup">
							667
                        </span><?= $lang['mall_yiyuan'] ?>
					</div>
				</div>
                <ul id="mall_desc" class="c-content-list-1 c-theme" style="text-align: left;"></ul>
            </div>
        </div>
    </div>
    <!-- END: 项目介绍 -->
    
    <!-- BEGIN: CONTENT/SLIDERS/CLIENT-LOGOS-2 -->
	<div class="c-content-box c-size-md c-bg-grey-1" style="background: url(views/assets/base/img/content/backgrounds/body-3.jpg) center center no-repeat;background-size: cover; padding-bottom: 120px; margin-bottom: 0;">
		<div class="container">
			<!-- Begin: Testimonals 1 component -->
			<div class="c-content-client-logos-slider-1 c-bordered" data-slider="owl" data-items="4" data-desktop-items="4" data-desktop-small-items="3" data-tablet-items="3" data-mobile-small-items="1">
				<!-- Begin: Title 1 component -->
				<div class="c-content-title-1">
					<h3 class="c-center c-font-bold"><?= $lang['mall_business_invitation'] ?></h3>
                    <div class="c-line-center c-theme-bg">
					</div>
				</div>
				<!-- End-->
				<!-- Begin: Owlcarousel -->
				<div class="owl-mall-carousel owl-theme c-theme owl-bordered1" style="visibility: hidden;">
                    <div class="item">
                        <div style="height: 200px;" class="modality-name-div">
                            <div id="proportion_fb1" class="modality-name"></div>
                        </div>
                        <a href="views/html/user/component/floor-plan-baoshan-tm.php?m=<?= $bs_tm ?>&f=0" data-toggle="modal" data-target="#floor_map_F_baoshan">
                            <span style="height: 100px; background-color: #fa26a3;" class="floor-name">
                                <span class="btn btn-xs c-btn-square c-btn-border-opacity-04 c-btn-uppercase c-btn-bold">
                                    <i class="fa fa-leaf"></i><br>
                                    <?= $lang['mall_open_floor_map'] ?>B1F
                                </span>
                            </span>
                        </a>
					</div>
                    <div class="item">
                        <div style="height: 167px;" class="modality-name-div">
                            <div id="proportion_f1" class="modality-name"></div>
                        </div>
                        <a href="views/html/user/component/floor-plan-baoshan-tm.php?m=<?= $bs_tm ?>&f=1" data-toggle="modal" data-target="#floor_map_F_baoshan">
                            <span style="height: 133px; background-color: #0ecab6;" class="floor-name">
                                <span class="btn btn-xs c-btn-square c-btn-border-opacity-04 c-btn-uppercase c-btn-bold">
                                    <i class="fa fa-diamond"></i><br>
                                    <?= $lang['mall_open_floor_map'] ?>1F
                                </span>
                            </span>
                        </a>
					</div>
                    <div class="item">
                        <div style="height: 134px;" class="modality-name-div">
                            <div id="proportion_f2" class="modality-name"></div>
                        </div>
                        <a href="views/html/user/component/floor-plan-baoshan-tm.php?m=<?= $bs_tm ?>&f=2" data-toggle="modal" data-target="#floor_map_F_baoshan">
                            <span style="height: 166px; background-color: #fa6426;" class="floor-name">
                                <span class="btn btn-xs c-btn-square c-btn-border-opacity-04 c-btn-uppercase c-btn-bold">
                                    <i class="fa fa-graduation-cap"></i><br>
                                    <?= $lang['mall_open_floor_map'] ?>2F
                                </span>
                            </span>
                        </a>
					</div>
                    <div class="item">
                        <div style="height: 100px;" class="modality-name-div">
                            <div id="proportion_f3" class="modality-name"></div>
                        </div>
                        <a href="views/html/user/component/floor-plan-baoshan-tm.php?m=<?= $bs_tm ?>&f=3" data-toggle="modal" data-target="#floor_map_F_baoshan">
                            <span style="height: 200px; background-color: #92278f;" class="floor-name">
                                <span class="btn btn-xs c-btn-square c-btn-border-opacity-04 c-btn-uppercase c-btn-bold">
                                    <i class="fa fa-child"></i><br>
                                    <?= $lang['mall_open_floor_map'] ?>3F
                                </span>
                            </span>
                        </a>
					</div>
				</div>
				<!-- End-->
			</div>
			<!-- End-->
		</div>
	</div>
	<!-- END: CONTENT/SLIDERS/CLIENT-LOGOS-2 -->

    <div class="c-content-box c-size-lg c-bg-white" style="margin-bottom: 0;">
		<div class="container">
            <div class="c-content-title-1">
                <h3 class="c-center c-font-bold mall-name"></h3>
                <div class="c-line-center c-theme-bg"></div>
            </div>
            <div class="col-md-3">
                <img class="img-responsive" src="views/assets/base/img/content/mall/baoshan-tm/<?= $lang['mall_lang_cat'] ?>/bs-1.jpeg" alt=""><br>
            </div>
            <div class="col-md-3">
                <img class="img-responsive" src="views/assets/base/img/content/mall/baoshan-tm/<?= $lang['mall_lang_cat'] ?>/bs-2.jpeg" alt=""><br>
            </div>
            <div class="col-md-3">
                <img class="img-responsive" src="views/assets/base/img/content/mall/baoshan-tm/<?= $lang['mall_lang_cat'] ?>/bs-3.jpeg" alt=""><br>
            </div>
            <div class="col-md-3">
                <img class="img-responsive" src="views/assets/base/img/content/mall/baoshan-tm/<?= $lang['mall_lang_cat'] ?>/bs-4.jpeg" alt=""><br>
            </div>
        </div>  
	</div>
    
    <div class="c-content-box c-size-lg c-bg-grey-1" style="margin-bottom: 0;">
		<div class="container">
            <div class="c-content-title-1">
                <h3 class="c-center c-font-bold"><?= $lang['mall_baoshan_gucun_park_area'] ?></h3>
                <div class="c-line-center c-theme-bg"></div>
            </div>
            <div class="col-md-3">
                <img class="img-responsive" src="views/assets/base/img/content/mall/baoshan-tm/<?= $lang['mall_lang_cat'] ?>/bs-5.jpeg" alt=""><br>
            </div>
            <div class="col-md-3">
                <img class="img-responsive" src="views/assets/base/img/content/mall/baoshan-tm/<?= $lang['mall_lang_cat'] ?>/bs-6.jpeg" alt=""><br>
            </div>
            <div class="col-md-3">
                <img class="img-responsive" src="views/assets/base/img/content/mall/baoshan-tm/<?= $lang['mall_lang_cat'] ?>/bs-7.jpeg" alt=""><br>
            </div>
            <div class="col-md-3">
                <img class="img-responsive" src="views/assets/base/img/content/mall/baoshan-tm/<?= $lang['mall_lang_cat'] ?>/bs-8.jpeg" alt=""><br>
            </div>
        </div>  
	</div>
    
    <div class="c-content-box c-size-md c-bg-white" style="margin-bottom: 0;">
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
                                <li class="c-bg-before-red"><a href="http://gucunparkhotel.com" target="_blank"><?= $lang['mall_gucun_park_hotel'] ?></a> <small><?= $lang['mall_gucun_park_hotel_addr'] ?></small></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <div id="floor_map_F_baoshan" class="modal fade" role="dialog">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-body"></div>
            </div>
        </div>
    </div>
</div>

<?php include ('footer.php'); ?>