<?php
$scripts = $scripts. '<script type="text/javascript" src="views/assets/plugins/cubeportfolio/js/jquery.cubeportfolio.min.js"></script>'
    . '<script type="text/javascript" src="views/assets/base/js/events.js"></script>';
?>

<!-- BEGIN: PAGE CONTAINER -->
<div class="c-layout-page">
	<!-- BEGIN: LAYOUT/BREADCRUMBS/BREADCRUMBS-1 -->
	<div class="c-layout-breadcrumbs-1 c-fonts-uppercase c-fonts-bold">
		<div class="container">
			<div class="c-page-title c-pull-left">
				<h3 class="c-font-uppercase c-font-bold"><?= $lang['events_events'] ?></h3>
			</div>
			<ul class="c-page-breadcrumbs c-theme-nav c-pull-right c-fonts-regular">
				<li>
					<a href="/"><?= $lang['events_home'] ?></a>
				</li>
				<li>
					/
				</li>
                <li class="c-state_active">
                    <?= $lang['events_events'] ?>
				</li>
			</ul>
		</div>
	</div>
	<!-- END: LAYOUT/BREADCRUMBS/BREADCRUMBS-1 -->
	<!-- BEGIN: PAGE CONTENT -->
	<div class="c-content-box c-size-md">
		<div class="container">
			<div id="filters-container" class="cbp-l-filters-button">
				<div data-filter=".sh-sbm" class="cbp-filter-item-active cbp-filter-item">
                    <?= $lang['events_ljz'] ?>
				</div>
                <div data-filter=".sh-sbm" class="cbp-filter-item">
                    <?= $lang['events_bs'] ?>
				</div>
                <div data-filter=".sh-sbm" class="cbp-filter-item">
                    <?= $lang['events_xh'] ?>
				</div>
                <div data-filter=".sh-sbm" class="cbp-filter-item">
                    <?= $lang['events_wx'] ?>
				</div>
                <div data-filter=".sh-sbm" class="cbp-filter-item">
                    <?= $lang['events_xa'] ?>
				</div>
                <div data-filter=".sh-sbm" class="cbp-filter-item">
                    <?= $lang['events_zz'] ?>
				</div>
			</div>
			<div id="grid-container" class="cbp">
				<div class="cbp-item sh-sbm">
					<div class="cbp-caption">
						<div class="cbp-caption-defaultWrap">
							<img src="views/assets/base/img/content/events/pearl_atrium.jpg" alt="">
						</div>
						<div class="cbp-caption-activeWrap">
							<div class="cbp-l-caption-alignCenter">
								<div class="cbp-l-caption-body">
									<a href="event?id=OLSHOP180507001030" class="cbp-l-caption-buttonLeft btn btn-sm c-btn-square c-btn-border-1x c-btn-white c-btn-uppercase"><?= $lang['events_detail'] ?></a>
								</div>
							</div>
						</div>
					</div>
					<div class="cbp-l-grid-projects-title">
						<?= $lang['events_pearl_atrium'] ?>
					</div>
					<div class="cbp-l-grid-projects-desc">
						<?= $lang['events_pearl_atrium_location'] ?>
					</div>
				</div>
				<div class="cbp-item sh-sbm">
					<div class="cbp-caption">
						<div class="cbp-caption-defaultWrap">
							<img src="views/assets/base/img/content/events/bund_atrium.jpg" alt="">
						</div>
						<div class="cbp-caption-activeWrap">
							<div class="cbp-l-caption-alignCenter">
								<div class="cbp-l-caption-body">
									<a href="event?id=OLSHOP180507001024" class="cbp-l-caption-buttonLeft btn btn-sm c-btn-square c-btn-border-1x c-btn-white c-btn-uppercase"><?= $lang['events_detail'] ?></a>
								</div>
							</div>
						</div>
					</div>
					<div class="cbp-l-grid-projects-title">
						<?= $lang['events_bund_atrium'] ?>
					</div>
					<div class="cbp-l-grid-projects-desc">
						<?= $lang['events_bund_atrium_location'] ?>
					</div>
				</div>
                <div class="cbp-item sh-sbm">
					<div class="cbp-caption">
						<div class="cbp-caption-defaultWrap">
							<img src="views/assets/base/img/content/events/platform.jpg" alt="">
						</div>
						<div class="cbp-caption-activeWrap">
							<div class="cbp-l-caption-alignCenter">
								<div class="cbp-l-caption-body">
									<a href="event?id=OLSHOP180507001041" class="cbp-l-caption-buttonLeft btn btn-sm c-btn-square c-btn-border-1x c-btn-white c-btn-uppercase"><?= $lang['events_detail'] ?></a>
								</div>
							</div>
						</div>
					</div>
					<div class="cbp-l-grid-projects-title">
						<?= $lang['events_platform'] ?>
					</div>
					<div class="cbp-l-grid-projects-desc">
						<?= $lang['events_platform_location'] ?>
					</div>
				</div>
				<div class="cbp-item sh-sbm">
					<div class="cbp-caption">
						<div class="cbp-caption-defaultWrap">
							<img src="views/assets/base/img/content/events/pearl_platform.jpg" alt="">
						</div>
						<div class="cbp-caption-activeWrap">
							<div class="cbp-l-caption-alignCenter">
								<div class="cbp-l-caption-body">
									<a href="event?id=OLSHOP180507001054" class="cbp-l-caption-buttonLeft btn btn-sm c-btn-square c-btn-border-1x c-btn-white c-btn-uppercase"><?= $lang['events_detail'] ?></a>
								</div>
							</div>
						</div>
					</div>
					<div class="cbp-l-grid-projects-title">
						<?= $lang['events_pearl_platform'] ?>
					</div>
					<div class="cbp-l-grid-projects-desc">
						<?= $lang['events_pearl_platform_location'] ?>
					</div>
				</div>
                <div class="cbp-item sh-sbm">
					<div class="cbp-caption">
						<div class="cbp-caption-defaultWrap">
							<img src="views/assets/base/img/content/events/gd_avenue.jpg" alt="">
						</div>
						<div class="cbp-caption-activeWrap">
							<div class="cbp-l-caption-alignCenter">
								<div class="cbp-l-caption-body">
									<a href="event?id=OLSHOP180507001043" class="cbp-l-caption-buttonLeft btn btn-sm c-btn-square c-btn-border-1x c-btn-white c-btn-uppercase"><?= $lang['events_detail'] ?></a>
								</div>
							</div>
						</div>
					</div>
					<div class="cbp-l-grid-projects-title">
						<?= $lang['events_golden_avenue'] ?>
					</div>
					<div class="cbp-l-grid-projects-desc">
						<?= $lang['events_golden_avenue_location'] ?>
					</div>
				</div>
                <div class="cbp-item sh-sbm">
					<div class="cbp-caption">
						<div class="cbp-caption-defaultWrap">
							<img src="views/assets/base/img/content/events/gd_platform.jpg" alt="">
						</div>
						<div class="cbp-caption-activeWrap">
							<div class="cbp-l-caption-alignCenter">
								<div class="cbp-l-caption-body">
									<a href="event?id=OLSHOP180507001056" class="cbp-l-caption-buttonLeft btn btn-sm c-btn-square c-btn-border-1x c-btn-white c-btn-uppercase"><?= $lang['events_detail'] ?></a>
								</div>
							</div>
						</div>
					</div>
					<div class="cbp-l-grid-projects-title">
						<?= $lang['events_golden_platform'] ?>
					</div>
					<div class="cbp-l-grid-projects-desc">
						<?= $lang['events_golden_platform_location'] ?>
					</div>
				</div>
				<div class="cbp-item sh-sbm">
					<div class="cbp-caption">
						<div class="cbp-caption-defaultWrap">
							<img src="views/assets/base/img/content/events/jade_platform.jpg" alt="">
						</div>
						<div class="cbp-caption-activeWrap">
							<div class="cbp-l-caption-alignCenter">
								<div class="cbp-l-caption-body">
									<a href="event?id=OLSHOP180507001059" class="cbp-l-caption-buttonLeft btn btn-sm c-btn-square c-btn-border-1x c-btn-white c-btn-uppercase"><?= $lang['events_detail'] ?></a>
								</div>
							</div>
						</div>
					</div>
					<div class="cbp-l-grid-projects-title">
						<?= $lang['events_jade_platform'] ?>
					</div>
					<div class="cbp-l-grid-projects-desc">
						<?= $lang['events_jade_platform_location'] ?>
					</div>
				</div>
                <div class="cbp-item sh-sbm">
					<div class="cbp-caption">
						<div class="cbp-caption-defaultWrap">
							<img src="views/assets/base/img/content/events/happiness_platform.jpg" alt="">
						</div>
						<div class="cbp-caption-activeWrap">
							<div class="cbp-l-caption-alignCenter">
								<div class="cbp-l-caption-body">
									<a href="event?id=OLSHOP180507001060" class="cbp-l-caption-buttonLeft btn btn-sm c-btn-square c-btn-border-1x c-btn-white c-btn-uppercase"><?= $lang['events_detail'] ?></a>
								</div>
							</div>
						</div>
					</div>
					<div class="cbp-l-grid-projects-title">
						<?= $lang['events_happiness_platform'] ?>
					</div>
					<div class="cbp-l-grid-projects-desc">
						<?= $lang['events_happiness_platform_location'] ?>
					</div>
				</div>
                <div class="cbp-item sh-sbm">
					<div class="cbp-caption">
						<div class="cbp-caption-defaultWrap">
							<img src="views/assets/base/img/content/events/ct_hall.jpg" alt="">
						</div>
						<div class="cbp-caption-activeWrap">
							<div class="cbp-l-caption-alignCenter">
								<div class="cbp-l-caption-body">
									<a href="event?id=OLSHOP180507001062" class="cbp-l-caption-buttonLeft btn btn-sm c-btn-square c-btn-border-1x c-btn-white c-btn-uppercase"><?= $lang['events_detail'] ?></a>
								</div>
							</div>
						</div>
					</div>
					<div class="cbp-l-grid-projects-title">
						<?= $lang['events_ct_hall'] ?>
					</div>
					<div class="cbp-l-grid-projects-desc">
						<?= $lang['events_ct_hall_location'] ?>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- END: PAGE CONTENT -->
</div>
<!-- END: PAGE CONTAINER -->

<?php include ('footer.php'); ?>