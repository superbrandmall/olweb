<?php
    $scripts = $scripts. '<script type="text/javascript" src="views/assets/base/js/my-reservations.js"></script>';
?>

<div class="alert alert-success reserve-succeed" role="alert">
    <?= $lang['reservation_reserve_succeed'] ?>！
</div>

<!-- BEGIN: PAGE CONTAINER -->
<div class="c-layout-page">
    <!-- BEGIN: 标题 -->
	<div class="c-layout-breadcrumbs-1 c-fonts-uppercase c-fonts-bold">
		<div class="container">
			<div class="c-page-title c-pull-left">
				<h3 class="c-font-bold"><?= $lang['reservation_my_reservations'] ?></h3>
			</div>
			<ul class="c-page-breadcrumbs c-theme-nav c-pull-right c-fonts-regular">
				<li>
					<a href="/"><?= $lang['reservation_home'] ?></a>
				</li>
				<li>
					/
				</li>
				<li class="c-state_active">
					<?= $lang['reservation_my_reservations'] ?>
				</li>
			</ul>
		</div>
	</div>
	<!-- END: 标题 -->
    <!-- BEGIN: 我的预约 -->
	<div class="c-content-box c-size-md c-no-padding" style="margin-top: 20px;">
		<div class="container">
            <div class="alert alert-theme" style="display: block;" role="alert"><i class="icon-info"></i> <?= $lang['reservation_following_records'] ?></div>
            <div class="col-md-12">
                <div class="c-content-accordion-1 c-accordion-grey">
                    <div class="panel-group" id="reserve_lists" role="tablist"></div>
                </div>
                <br>
                <center>
                    <ul class="c-content-pagination c-theme"></ul>
                </center>
            </div>
		</div>
	</div>
    <br><br><br><br>
    <!-- END: 我的预约 -->
</div>

<?php include ('footer.php'); ?>