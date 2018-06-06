<?php
$scripts = $scripts. '<script type="text/javascript" src="views/assets/base/js/my-bid.js"></script>';
?>

<!-- BEGIN: PAGE CONTAINER -->
<div class="c-layout-page">
    <?php include ('component/sub-menu.php'); ?>
    <!-- BEGIN: 我的出价 -->
	<div class="c-content-box c-size-md c-bg-white">
		<div class="container">
            <!-- Begin: Title 1 component -->
            <div class="c-content-title-1">
                <h3 class="c-center c-font-uppercase c-font-bold"><?= $lang['my_bid_my_bid'] ?></h3>
                <div class="c-line-center c-theme-bg">
                </div>
            </div>
            <!-- End-->
            <div class="table-responsive">
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th>
                                #
                            </th>
                            <th>
                                <?= $lang['my_bid_bid_time'] ?>
                            </th>
                            <th>
                                <?= $lang['my_bid_shop'] ?>
                            </th>
                            <th>
                                <?= $lang['my_bid_mall'] ?>
                            </th>
                            <th>
                                <?= $lang['my_bid_floor'] ?>
                            </th>
                            <th>
                                <?= $lang['my_bid_area'] ?>
                            </th>
                            <th>
                                <?= $lang['my_bid_rent_period'] ?>
                            </th>
                            <th>
                                <?= $lang['my_bid_rent'] ?>
                            </th>
                            <th>
                                <?= $lang['my_bid_floating_rate'] ?>
                            </th>
                            <th>
                                <?= $lang['my_bid_action'] ?>
                            </th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>
		</div>
	</div>
    <!-- END: 我的出价 -->
</div>

<?php include ('footer.php'); ?>