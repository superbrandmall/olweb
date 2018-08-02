<?php
$scripts = $scripts. '<script type="text/javascript" src="views/assets/base/js/shanghai-sbm.js"></script>';
?>

<!-- BEGIN: PAGE CONTAINER -->
<div class="c-layout-page">
    <div class="c-content-box c-size-md c-bg-parallax" style="background-image: url(views/assets/base/img/content/backgrounds/body-4.jpg); margin-bottom: 0;">
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
                <h3 class="c-center c-font-bold"><?= $lang['mall_shanghai_brief'] ?> & <?= $lang['mall_desc'] ?></h3>
                <div class="c-line-center c-theme-bg"></div>
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
    
    <!-- BEGIN: CONTENT/SLIDERS/CLIENT-LOGOS-2 -->
	<div class="c-content-box c-size-md c-bg-grey-1" style="background: url(views/assets/base/img/content/backgrounds/body-3.jpg) center center no-repeat;background-size: cover; padding-bottom: 120px; margin-bottom: 0;">
		<div class="container">
			<!-- Begin: Testimonals 1 component -->
			<div class="c-content-client-logos-slider-1 c-bordered" data-slider="owl" data-items="5" data-desktop-items="4" data-desktop-small-items="3" data-tablet-items="3" data-mobile-small-items="1">
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
    
    <div class="c-content-box c-size-lg c-bg-grey-1" style="margin-bottom: 0;">
		<div class="container">
            <div class="c-content-title-1">
                <h3 class="c-center c-font-bold"><?= $lang['mall_lujiazui_financial_zone'] ?></h3>
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
    
    <div id="floor_map_F" class="modal fade" role="dialog">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-body"></div>
            </div>
        </div>
    </div>
</div>

<?php include ('footer.php'); ?>