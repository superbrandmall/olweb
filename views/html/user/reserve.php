<?php
    if(explode('?sid=',$_SERVER['REQUEST_URI'])[1] != null) {
    $id = explode('?sid=',$_SERVER['REQUEST_URI'])[1];
    if (strpos($id, '&search=') !== false) {
        $id = explode('&search=',$id)[0];
    }
} else {
    $id = null;
}

$scripts = $scripts. '<script type="text/javascript" src="views/assets/base/js/reserve.js"></script>'
    . '<script src="views/assets/plugins/datepicker/bootstrap-datepicker.min.js" type="text/javascript"></script>'
    . '<script src="views/assets/plugins/datepicker/bootstrap-datepicker.zh-CN.min.js" type="text/javascript"></script>';
?>
<link href="views/assets/plugins/datepicker/bootstrap-datepicker.css" rel="stylesheet" type="text/css" media="all" />

<!-- BEGIN: PAGE CONTAINER -->
<div class="c-layout-page">
    <!-- BEGIN: 标题 -->
	<div class="c-layout-breadcrumbs-1 c-fonts-uppercase c-fonts-bold">
		<div class="container">
			<div class="c-page-title c-pull-left">
				<h3 class="c-font-bold"><?= $lang['reserve_reserve_showing'] ?></h3>
			</div>
			<ul class="c-page-breadcrumbs c-theme-nav c-pull-right c-fonts-regular">
				<li>
					<a href="/"><?= $lang['reserve_home'] ?></a>
				</li>
				<li>
					/
				</li>
				<li class="c-state_active">
					<a href="shop?id=<?= $id ?>"><?= $lang['reserve_shop_detail'] ?></a>
				</li>
                <li>
					/
				</li>
                <li><?= $lang['reserve_reserve_showing'] ?></li>
			</ul>
		</div>
	</div>
	<!-- END: 标题 -->
    <!-- BEGIN: 店铺信息 -->
    <div class="c-content-box c-size-md c-bg-grey-1">
		<div class="container">
			<div class="row">
				<div class="col-md-8">
					<div class="c-content-media-1 c-bordered">
						<div class="c-content-label c-font-uppercase c-font-bold c-theme-bg">
							<?= $lang['reserve_my_info'] ?>
						</div>
						<ul class="c-content-list-1 c-theme c-separator-dot c-square">
                            <li>
                                <?= $lang['reserve_name'] ?>: <span id="name"></span><input type="hidden" id="code" name="code">
                            </li>
                            <li>
                                <?= $lang['reserve_company'] ?>: <span id="company_name"></span>
                            </li>
                            <li>
                                <?= $lang['reserve_mobile'] ?>: <span id="mobile"></span>
                            </li>
                            <li>
                                <?= $lang['reserve_email'] ?>: <span id="email"></span>
                            </li>
                        </ul>
                    </div>
                    
                    <div class="c-content-media-1 c-bordered" style="margin-top: 20px;">
                        <form id="reserve_form">
                            <div class="c-content-label c-font-uppercase c-font-bold c-theme-bg">
                                <?= $lang['reserve_reservation'] ?>
                            </div>
                            <ul class="c-content-list-1 c-theme c-separator-dot c-square">
                                <li>
                                    <?= $lang['reserve_brands'] ?>: 
                                    <input type="text" id="brand" name="brand" class="form-control c-square c-theme input-sm" style="display: inline; width: auto;" disabled>
                                    <input type="hidden" id="brand_modality" name="brand_modality">
                                </li>
                                <li>
                                    <?= $lang['reserve_date'] ?>:
                                    <input id="reserve_date" name="reserve_date" class="form-control c-square c-theme input-sm" placeholder="<?= $lang['reserve_please_choose'] ?><?= $lang['reserve_date'] ?>" data-plugin="datepicker" required type="text" style="display: inline; width: auto; background-color: #fff;" readonly>
                                    <div id="errorcontainer-reserve_date" class="errorDiv"></div>
                                </li>
                                <li>
                                    <?= $lang['reserve_lease_term'] ?>: 
                                    <select id="length" name="length" class="form-control c-square c-theme input-sm valid" required aria-invalid="false" style="display: inline; width: auto;"></select>
                                    <div id="errorcontainer-length" class="errorDiv"></div>
                                </li>
                                <li>
                                    <?= $lang['reserve_planned_moving_in_date'] ?>: 
                                    <input type="text" id="start_date" name="start_date" class="form-control c-square c-theme input-sm" placeholder="<?= $lang['reserve_planned_moving_in_date'] ?>" data-plugin="datepicker" style="display: inline; width: auto; background-color: #fff;" readonly>
                                    <div id="errorcontainer-start_date" class="errorDiv"></div>
                                </li>
                                <li>
                                    <?= $lang['reserve_verify_method'] ?>: 
                                    <select id="international" name="international" class="form-control c-square c-theme input-sm valid" required style="display: inline; width: auto;">
                                        <option value=""><?= $lang['register_choose'] ?></option>
                                    </select>
                                    <div id="errorcontainer-international" class="errorDiv"></div>
                                </li>
                                <li style="position: relative;">
                                    <?= $lang['reserve_veryfication_code'] ?>:&nbsp;&nbsp;&nbsp;
                                    <input type="text" id="international_verify" name="international_verify" class="form-control c-square c-theme input-sm valid" required placeholder="<?= $lang['reserve_veryfication_code'] ?>" style="display: inline; width: auto;">
                                    <a href="javascript: VeryficationCodeReservation()" id="international_verify_link" style="display: block; position: absolute; z-index: 10; left: 165px; font-size: 14px; top: 5px;"><?= $lang['reserve_send_code'] ?></a>
                                    <div id="errorcontainer-international_verify" class="errorDiv"></div>
                                </li>
                            </ul>

                            <hr>
                            <div class="form-group">
                                <button type="submit" class="btn btn-md c-theme-btn c-btn-uppercase c-btn-square c-btn-bold"><i class="icon-check"></i> <?= $lang['reserve_make_reservation'] ?></button>
                            </div>
                        </form>
					</div>
				</div>
                <div class="col-md-4">
					<div class="c-content-media-1 c-bordered" style="min-height: 380px;">
						<div class="c-content-label c-font-uppercase c-font-bold c-theme-bg">
							<?= $lang['reserve_shop_info'] ?>
						</div>
                        <img id="shop_image" src="#" class="img-responsive" style="margin-top: 20px;">
						<ul class="c-content-list-1 c-theme c-separator-dot c-square">
                            <li>
                                <?= $lang['reserve_project'] ?>: <span id="mall"></span>
                            </li>
                            <li>
                                <?= $lang['reserve_room_number'] ?>: <span id="unit"></span>
                            </li>
                            <li>
                                <?= $lang['reserve_floor'] ?>: <span id="floor"></span>
                            </li>
                            <li>
                                <?= $lang['reserve_leasable_area'] ?>: <span id="area"></span>m²
                            </li>
                            <li>
                                <?= $lang['reserve_recommand_modality'] ?>: <span id="modality"></span>
                            </li>
                        </ul>
					</div><br>
				</div>
			</div>
		</div>
	</div>
	<!-- END: 店铺信息 -->
</div>

<?php include ('footer.php'); ?>