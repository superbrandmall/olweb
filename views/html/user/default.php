<!-- BEGIN: PAGE CONTAINER -->
<div class="c-layout-page" style="margin-top: 0;">
	<!-- BEGIN: PAGE CONTENT -->
	<!-- BEGIN: LAYOUT/SLIDERS/REVO-SLIDER-7 -->
	<section class="c-layout-revo-slider c-layout-revo-slider-7">
        <div class="tp-banner-container tp-fullscreen tp-fullscreen-mobile">
            <div class="c-singup-form">
                <h3 class="c-font-54 c-font-bold c-font-white c-margin-b-40 c-font-uppercase">
                Online <span class="c-theme-font c-font-bold">Leasing</span></h3>
                <h5 class="c-font-24 c-font-thin c-font-white c-subtitle c-margin-b-40">
                <?= $lang['home_banner_slogan_1'] ?> </h5>
                <div class="form-inline">
                    <a href="requirement" class="btn btn-lg c-btn-red-1 c-btn-uppercase c-btn-square c-btn-bold"><i class="icon-map"></i> <?= $lang['home_shops'] ?></a>
                    <a href="events" class="btn btn-lg c-btn-blue c-btn-uppercase c-btn-square c-btn-bold"><i class="icon-calendar"></i> <?= $lang['home_events'] ?></a>
                </div>
            </div>
            <div class="tp-banner">
                <ul>
                    <!--BEGIN: SLIDE -->
                    <li data-transition="fade" data-slotamount="1" data-masterspeed="1000" data-style="dark">
                        <img alt="" src="views/assets/base/img/content/backgrounds/body-2.jpg" data-bgposition="center center" data-bgfit="cover" data-bgrepeat="no-repeat">
                    </li>
                    <!--END -->
                </ul>
            </div>
            
            <!-- BEGIN: 热门项目 -->
            <div class="c-content-box c-size-md hidden-md hidden-sm hidden-xs" style="position: absolute;bottom: 0;left: 0;right:0;z-index: 20;margin-bottom: 0;">
                <div class="container">
                    <div class="cbp-panel">
                        <div id="mall_list" class="c-content-latest-works cbp cbp-l-grid-masonry-projects"></div>
                    </div>
                </div>
            </div>
            <!-- END: 热门项目 -->
        </div>
	</section>
	<!-- END: LAYOUT/SLIDERS/REVO-SLIDER-7 -->
    
    <!-- BEGIN: 热门项目sm -->
	<div class="c-content-box c-size-md c-bg-white hidden-lg">
		<div class="container">
			<div class="c-content-title-1">
				<h3 class="c-center c-font-uppercase c-font-bold"><?= $lang['home_malls'] ?></h3>
				<div class="c-line-center c-theme-bg">
				</div>
			</div>
			<div class="cbp-panel">
				<div id="mall_list_sm" class="c-content-latest-works cbp cbp-l-grid-masonry-projects"></div>
			</div>
		</div>
	</div>
	<!-- END: 热门项目sm -->
    
	<!-- BEGIN: 平台介绍 -->
    <div class="c-content-box c-size-md c-bg-white" style="margin-bottom: 0; padding-bottom: 0;">
		<div class="container">
			<div class="row">
				<div class="col-md-12">
					<div class="c-content-title-1">
						<h3 class="c-center c-font-bold">
						<?= $lang['home_title'] ?> </h3>
						<div class="c-line-center">
						</div>
						<p class="c-center c-font-17">
							<?= $lang['home_banner_slogan_2'] ?>
						</p>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-md-3 col-sm-6">
					<div class="c-content-step-1 c-opt-1">
						<div class="c-icon">
							<span class="c-hr c-hr-first"><span class="c-content-line-icon c-icon-27 c-theme"></span></span>
						</div>
						<div class="c-title c-font-20 c-font-bold">
							1. <?= $lang['home_step_1'] ?>
						</div>
						<div class="c-description c-font-17">
							 <?= $lang['home_step_1_desc'] ?>
						</div>
					</div>
				</div>
				<div class="col-md-3 col-sm-6">
					<div class="c-content-step-1 c-opt-1">
						<div class="c-icon">
							<span class="c-hr"><span class="c-content-line-icon c-icon-15 c-theme"></span></span>
						</div>
						<div class="c-title c-font-20 c-font-bold">
							2. <?= $lang['home_step_2'] ?>
						</div>
						<div class="c-description c-font-17">
							 <?= $lang['home_step_2_desc'] ?>
						</div>
					</div>
				</div>
                <div class="col-md-3 col-sm-6">
					<div class="c-content-step-1 c-opt-1">
						<div class="c-icon">
							<span class="c-hr"><span class="c-content-line-icon c-icon-40 c-theme"></span></span>
						</div>
						<div class="c-title c-font-20 c-font-bold">
							3. <?= $lang['home_step_3'] ?>
						</div>
						<div class="c-description c-font-17">
							 <?= $lang['home_step_3_desc'] ?>
						</div>
					</div>
				</div>
				<div class="col-md-3 col-sm-6">
					<div class="c-content-step-1 c-opt-1">
						<div class="c-icon">
							<span class="c-hr c-hr-last"><span class="c-content-line-icon c-icon-28 c-theme"></span></span>
						</div>
						<div class="c-title c-font-20 c-font-bold">
							4. <?= $lang['home_step_4'] ?>
						</div>
						<div class="c-description c-font-17">
							 <?= $lang['home_step_4_desc'] ?>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- END: 平台介绍 -->
	<!-- BEGIN: CONTENT/SLIDERS/CLIENT-LOGOS-2 -->
	<div class="c-content-box c-size-md c-bg-grey-1" style="background: url(views/assets/base/img/content/backgrounds/body-3.jpg) center center no-repeat;background-size: cover; padding-bottom: 120px; margin-bottom: 0;">
		<div class="container">
			<!-- Begin: Testimonals 1 component -->
			<div class="c-content-client-logos-slider-1 c-bordered" data-slider="owl" data-items="6" data-desktop-items="4" data-desktop-small-items="3" data-tablet-items="3" data-mobile-small-items="2" data-auto-play="5000">
				<!-- Begin: Title 1 component -->
				<div class="c-content-title-1">
					<h3 class="c-center c-font-bold"><?= $lang['home_partner_brands'] ?></h3>
					<div class="c-line-center c-theme-bg">
					</div>
				</div>
				<!-- End-->
				<!-- Begin: Owlcarousel -->
				<div class="owl-carousel owl-theme c-theme owl-bordered1">
					<div class="item">
						<img src="views/assets/base/img/content/client-logos/chj-jewellery.jpg" alt=""/>
                        <img src="views/assets/base/img/content/client-logos/chow-tai-fook.jpg" alt=""/>
					</div>
                    <div class="item">
						<img src="views/assets/base/img/content/client-logos/enzo.jpg" alt=""/>
                        <img src="views/assets/base/img/content/client-logos/gelle-freres.jpg" alt=""/>
					</div>
                    <div class="item">
						<img src="views/assets/base/img/content/client-logos/moco.jpg" alt=""/>
                        <img src="views/assets/base/img/content/client-logos/innisfree.jpg" alt=""/>
					</div>
                    <div class="item">
						<img src="views/assets/base/img/content/client-logos/toysrus.jpg" alt=""/>
                        <img src="views/assets/base/img/content/client-logos/heytea.jpg" alt=""/>
					</div>
                    <div class="item">
						<img src="views/assets/base/img/content/client-logos/new-balance.jpg" alt=""/>
                        <img src="views/assets/base/img/content/client-logos/tomsworld.jpg" alt=""/>
					</div>
                    <div class="item">
						<img src="views/assets/base/img/content/client-logos/urban-revivo.jpg" alt=""/>
                        <img src="views/assets/base/img/content/client-logos/banila.jpg" alt=""/>
					</div>
                    <div class="item">
						<img src="views/assets/base/img/content/client-logos/xiaohuige.jpg" alt=""/>
                        <img src="views/assets/base/img/content/client-logos/stellar-international.jpg" alt=""/>
					</div>
                    <div class="item">
						<img src="views/assets/base/img/content/client-logos/zara.jpg" alt=""/>
                        <img src="views/assets/base/img/content/client-logos/teenie-weenie.jpg" alt=""/>
					</div>
                    <div class="item">
						<img src="views/assets/base/img/content/client-logos/adidas.jpg" alt=""/>
                        <img src="views/assets/base/img/content/client-logos/winhouse.jpg" alt=""/>
					</div>
                    <div class="item">
						<img src="views/assets/base/img/content/client-logos/hm.jpg" alt=""/>
                        <img src="views/assets/base/img/content/client-logos/lacesar.jpg" alt=""/>
					</div>
                    <div class="item">
						<img src="views/assets/base/img/content/client-logos/yershari.jpg" alt=""/>
                        <img src="views/assets/base/img/content/client-logos/element-fresh.jpg" alt=""/>
					</div>
                    <div class="item">
						<img src="views/assets/base/img/content/client-logos/pandora.jpg" alt=""/>
                        <img src="views/assets/base/img/content/client-logos/ca.jpg" alt=""/>
					</div>
                    
                    <div class="item">
						<img src="views/assets/base/img/content/client-logos/skechers.jpg" alt=""/>
                        <img src="views/assets/base/img/content/client-logos/swarovski.jpg" alt=""/>
					</div>
                    <div class="item">
						<img src="views/assets/base/img/content/client-logos/shiseido.jpg" alt=""/>
                        <img src="views/assets/base/img/content/client-logos/folli-follie.jpg" alt=""/>
					</div>
                    <div class="item">
						<img src="views/assets/base/img/content/client-logos/g-star.jpg" alt=""/>
                        <img src="views/assets/base/img/content/client-logos/gucci.jpg" alt=""/>
					</div>
                    <div class="item">
						<img src="views/assets/base/img/content/client-logos/calvin-klein.jpg" alt=""/>
                        <img src="views/assets/base/img/content/client-logos/haagen-dazs.jpg" alt=""/>
					</div>
                    <div class="item">
						<img src="views/assets/base/img/content/client-logos/laneige.jpg" alt=""/>
                        <img src="views/assets/base/img/content/client-logos/mellowe.jpg" alt=""/>
					</div>
                    <div class="item">
						<img src="views/assets/base/img/content/client-logos/wang-steak.jpg" alt=""/>
                        <img src="views/assets/base/img/content/client-logos/bloves.jpg" alt=""/>
					</div>
				</div>
				<!-- End-->
			</div>
			<!-- End-->
		</div>
	</div>
	<!-- END: CONTENT/SLIDERS/CLIENT-LOGOS-2 -->

	<!-- END: PAGE CONTENT -->
</div>
<!-- END: PAGE CONTAINER -->

<?php include ('footer.php'); ?>