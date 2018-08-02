<?php
$scripts = $scripts. '<script type="text/javascript" src="views/assets/base/js/xuhui-tm.js"></script>';
?>

<!-- BEGIN: PAGE CONTAINER -->
<div class="c-layout-page">
    <div class="c-content-box c-size-md c-bg-parallax" style="background-image: url(views/assets/base/img/content/backgrounds/body-5.jpg); margin-bottom: 0;">
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
                <h3 class="c-center c-font-bold"><?= $lang['mall_xuhui_brief'] ?> & <?= $lang['mall_desc'] ?></h3>
                <div class="c-line-center c-theme-bg"></div>
            </div>
            <div class="col-md-4">
                <video loop="loop" src="upload/video/<?= $lang['mall_lang_cat'] ?>/xuhui.mp4" controls="true" width="100%"></video><br><br>
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
                <p><?= $lang['mall_xuhui_brief_p'] ?></p>
                <div class="row">
					<div class="col-md-4">
                        <h4 class="c-title c-first c-font-bold"><?= $lang['mall_gdp'] ?></h4>
						<span class="c-counter c-font-bold c-theme-font" data-counter="counterup">
							1,574</span><?= $lang['mall_yiyuan'] ?>
						</span>
					</div>
					<div class="col-md-4">
                        <h4 class="c-title c-font-bold"><?= $lang['mall_resident_population'] ?></h4>
						<span class="c-counter c-font-bold c-theme-font" data-counter="counterup">
							1,088,300
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
                        <a href="views/html/user/component/floor-plan-xuhui-tm.php?m=<?= $xh_tm ?>&f=0" data-toggle="modal" data-target="#floor_map_F_xuhui">
                            <span style="height: 100px; background-color: #fa26a3;" class="floor-name">
                                <span class="btn btn-xs c-btn-square c-btn-border-opacity-04 c-btn-uppercase c-btn-bold">
                                    <i class="fa fa-cutlery"></i><br>
                                    <?= $lang['mall_open_floor_map'] ?>B1F
                                </span>
                            </span>
                        </a>
					</div>
                    <div class="item">
                        <div style="height: 175px;" class="modality-name-div">
                            <div id="proportion_f1" class="modality-name"></div>
                        </div>
                        <a href="views/html/user/component/floor-plan-xuhui-tm.php?m=<?= $xh_tm ?>&f=1" data-toggle="modal" data-target="#floor_map_F_xuhui">
                            <span style="height: 125px; background-color: #0ecab6;" class="floor-name">
                                <span class="btn btn-xs c-btn-square c-btn-border-opacity-04 c-btn-uppercase c-btn-bold">
                                    <i class="fa fa-female"></i><br>
                                    <?= $lang['mall_open_floor_map'] ?>1F
                                </span>
                            </span>
                        </a>
					</div>
                    <div class="item">
                        <div style="height: 150px;" class="modality-name-div">
                            <div id="proportion_f2" class="modality-name"></div>
                        </div>
                        <a href="views/html/user/component/floor-plan-xuhui-tm.php?m=<?= $xh_tm ?>&f=2" data-toggle="modal" data-target="#floor_map_F_xuhui">
                            <span style="height: 150px; background-color: #fa6426;" class="floor-name">
                                <span class="btn btn-xs c-btn-square c-btn-border-opacity-04 c-btn-uppercase c-btn-bold">
                                    <i class="fa fa-shopping-bag"></i><br>
                                    <?= $lang['mall_open_floor_map'] ?>2F
                                </span>
                            </span>
                        </a>
					</div>
                    <div class="item">
                        <div style="height: 125px;" class="modality-name-div">
                            <div id="proportion_f3" class="modality-name"></div>
                        </div>
                        <a href="views/html/user/component/floor-plan-xuhui-tm.php?m=<?= $xh_tm ?>&f=3" data-toggle="modal" data-target="#floor_map_F_xuhui">
                            <span style="height: 175px; background-color: #92278f;" class="floor-name">
                                <span class="btn btn-xs c-btn-square c-btn-border-opacity-04 c-btn-uppercase c-btn-bold">
                                    <i class="fa fa-smile-o"></i><br>
                                    <?= $lang['mall_open_floor_map'] ?>3F
                                </span>
                            </span>
                        </a>
					</div>
                    <div class="item">
                        <div style="height: 100px;" class="modality-name-div">
                            <div id="proportion_f4" class="modality-name"></div>
                        </div>
                        <a href="views/html/user/component/floor-plan-xuhui-tm.php?m=<?= $xh_tm ?>&f=4" data-toggle="modal" data-target="#floor_map_F_xuhui">
                            <span style="height: 200px; background-color: #ede11c;" class="floor-name">
                                <span class="btn btn-xs c-btn-square c-btn-border-opacity-04 c-btn-uppercase c-btn-bold">
                                    <i class="fa fa-users"></i><br>
                                    <?= $lang['mall_open_floor_map'] ?>4F
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
                <img class="img-responsive" src="views/assets/base/img/content/mall/xuhui-tm/<?= $lang['mall_lang_cat'] ?>/xh-1.jpeg" alt=""><br>
            </div>
            <div class="col-md-3">
                <img class="img-responsive" src="views/assets/base/img/content/mall/xuhui-tm/<?= $lang['mall_lang_cat'] ?>/xh-2.jpeg" alt=""><br>
            </div>
            <div class="col-md-3">
                <img class="img-responsive" src="views/assets/base/img/content/mall/xuhui-tm/<?= $lang['mall_lang_cat'] ?>/xh-3.jpeg" alt=""><br>
            </div>
            <div class="col-md-3">
                <img class="img-responsive" src="views/assets/base/img/content/mall/xuhui-tm/<?= $lang['mall_lang_cat'] ?>/xh-4.jpeg" alt=""><br>
            </div>
        </div>  
	</div>
    
    <div class="c-content-box c-size-lg c-bg-grey-1" style="margin-bottom: 0;">
		<div class="container">
            <div class="c-content-title-1">
                <h3 class="c-center c-font-bold"><?= $lang['mall_xuhui_west_bund_riverside'] ?></h3>
                <div class="c-line-center c-theme-bg"></div>
            </div>
            <div class="col-md-3">
                <img class="img-responsive" src="views/assets/base/img/content/mall/xuhui-tm/<?= $lang['mall_lang_cat'] ?>/xh-5.jpeg" alt=""><br>
            </div>
            <div class="col-md-3">
                <img class="img-responsive" src="views/assets/base/img/content/mall/xuhui-tm/<?= $lang['mall_lang_cat'] ?>/xh-6.jpeg" alt=""><br>
            </div>
            <div class="col-md-3">
                <img class="img-responsive" src="views/assets/base/img/content/mall/xuhui-tm/<?= $lang['mall_lang_cat'] ?>/xh-7.jpeg" alt=""><br>
            </div>
            <div class="col-md-3">
                <img class="img-responsive" src="views/assets/base/img/content/mall/xuhui-tm/<?= $lang['mall_lang_cat'] ?>/xh-8.jpeg" alt=""><br>
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
                                <li class="c-bg-before-red"><a href="http://www.greenlandwhotel.com/" target="_blank"><?= $lang['mall_marriott_hotel'] ?></a> <small><?= $lang['mall_marriott_hotel_addr'] ?></small></li>                                
                                <li class="c-bg-before-red"><a href="http://www.courtyardxizang.com/" target="_blank"><?= $lang['mall_courtyard_hotel'] ?></a> <small><?= $lang['mall_courtyard_hotel_addr'] ?></small></li>
                                <li class="c-bg-before-red"><a href="http://www.huatinghotels.com/" target="_blank"><?= $lang['mall_huating_hotel'] ?></a> <small><?= $lang['mall_huating_hotel_addr'] ?></small></li>                                
                                <li class="c-bg-before-red"><a href="http://www.lhw.cn/hotel/China-Capella-Shanghai-Jian-Ye-Li/LW2847" target="_blank"><?= $lang['mall_capella_hotel'] ?></a> <small><?= $lang['mall_capella_hotel_addr'] ?></small></li>                                
                                <li class="c-bg-before-red"><a href="http://www.ascottchina.com/serviceDetail.aspx?id=16" target="_blank"><?= $lang['mall_ascott_hengshan'] ?></a> <small><?= $lang['mall_ascott_hengshan_addr'] ?></small></li>                                
                                <li class="c-bg-before-red"><a href="https://www.regalhotel.com/regal-international-east-asia-hotel/sc/home/home.html" target="_blank"><?= $lang['mall_regal_hotel'] ?></a> <small><?= $lang['mall_regal_hotel_addr'] ?></small></li>                                
                                <li class="c-bg-before-red"><a href="#" target="_blank"><?= $lang['mall_aristo_mansion'] ?></a> <small><?= $lang['mall_aristo_mansion_addr'] ?></small></li>                                
                                <li class="c-bg-before-red"><a href="#"><?= $lang['mall_joya_hotel'] ?></a> <small><?= $lang['mall_joya_hotel_addr'] ?></small></li>
                                <li class="c-bg-before-red"><a href="#"><?= $lang['mall_taiyuan_villa'] ?></a> <small><?= $lang['mall_taiyuan_villa_addr'] ?></small></li>
                                <li class="c-bg-before-red"><a href="http://www.12hshotel.com/" target="_blank"><?= $lang['mall_12_hotel'] ?></a> <small><?= $lang['mall_12_hotel_addr'] ?></small></li>
                                <li class="c-bg-before-red"><a href="http://www.skysway.com/"><?= $lang['mall_pullman_hotel'] ?></a> <small><?= $lang['mall_pullman_hotel_addr'] ?></small></li>
                                <li class="c-bg-before-red"><a href="http://www.ruijinihotel.com/"><?= $lang['mall_ruijin_hotel'] ?></a> <small><?= $lang['mall_ruijin_hotel_addr'] ?></small></li>
                                <li class="c-bg-before-red"><a href="http://www.huaihaihojo.com/" target="_blank"><?= $lang['mall_howard_johnson_hotel'] ?></a> <small><?= $lang['mall_howard_johnson_hotel_addr'] ?></small></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <div id="floor_map_F_xuhui" class="modal fade" role="dialog">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-body"></div>
            </div>
        </div>
    </div>
</div>

<?php include ('footer.php'); ?>