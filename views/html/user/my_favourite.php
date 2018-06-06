<?php  
    $scripts = $scripts. '<script type="text/javascript" src="views/assets/base/js/my-favourite.js"></script>';
?>

<!-- BEGIN: PAGE CONTAINER -->
<div class="c-layout-page">
    <!-- BEGIN: 标题 -->
	<div class="c-layout-breadcrumbs-1 c-fonts-uppercase c-fonts-bold">
		<div class="container">
			<div class="c-page-title c-pull-left">
				<h3 class="c-font-uppercase c-font-bold"><?= $lang['my_favourite_my_favourite'] ?></h3>
			</div>
			<ul class="c-page-breadcrumbs c-theme-nav c-pull-right c-fonts-regular">
				<li>
					<a href="/"><?= $lang['search_home'] ?></a>
				</li>
				<li>
					/
				</li>
				<li class="c-state_active">
					<?= $lang['my_favourite_my_favourite'] ?>
				</li>
			</ul>
		</div>
	</div>
	<!-- END: 标题 -->
    <!-- BEGIN: 我的关注 -->
    <div class="c-content-box c-size-md c-no-padding" style="margin-top: 20px;">
		<div class="container">
            <!-- Begin: Title 1 component -->
            <div class="c-content-title-1">
                <h3 class="c-font-uppercase c-font-bold"><?= $lang['my_favourite_my_favourite'] ?></h3>
                <div class="c-line-left c-theme-bg">
                </div>
            </div>
            <!-- End-->
            <div class="row c-margin-t-30"></div>
            <!-- End-->
            <center>
                <ul class="c-content-pagination c-theme"></ul>
            </center>
        </div>
    </div>
    <br><br><br><br>
    <!-- END: 我的关注 -->
</div>

<?php include ('footer.php'); ?>