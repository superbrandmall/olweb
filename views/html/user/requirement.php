<?php
$scripts = $scripts. '<script type="text/javascript" src="views/assets/base/js/requirement.js"></script>'
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
				<h3 class="c-font-bold"><?= $lang['search_search_shops'] ?></h3>
			</div>
			<ul class="c-page-breadcrumbs c-theme-nav c-pull-right c-fonts-regular">
				<li>
					<a href="/"><?= $lang['search_home'] ?></a>
				</li>
				<li>
					/
				</li>
				<li class="c-state_active">
					<?= $lang['search_search_shops'] ?>
				</li>
			</ul>
		</div>
	</div>
	<!-- END: 标题 -->
    <!-- BEGIN: 搜索店铺 -->
    <div class="c-content-box c-size-md c-no-padding" style="margin-top: 20px;">
		<div class="container">
			<div class="c-content-feedback-1 c-option-2">
				<div class="row">
					<div class="col-md-8">
						<div class="c-contact">
                            <div class="c-content-title-1">
                                <h3 class="c-font-bold"><?= $lang['search_my_intention'] ?></h3>
                                <div class="c-line-left">
                                </div>
                            </div>
							<form id="requirement_form">
								<div class="form-group">
									<p><?= $lang['search_leasable_area'] ?></p>
                                    <div class="input-group">
                                        <span class="input-group-addon"><?= $lang['search_from'] ?></span>
                                        <select id="min_area" name="min_area" class="form-control c-square c-theme input-lg">
                                            <option value="0">0 m&sup2;</option>
                                            <option value="25">25 m&sup2;</option>
                                            <option value="100">100 m&sup2;</option>
                                            <option value="250">250 m&sup2;</option>
                                            <option value="550">550 m&sup2;</option>
                                            <option value="1000">1000 m&sup2;</option>
                                            <option value="1500">1500 m&sup2;</option>
                                            <option value="3000">3000 m&sup2;</option>
                                        </select>
                                        <span class="input-group-addon"><?= $lang['search_to'] ?></span>
                                        <select id="max_area" name="max_area" class="form-control c-square c-theme input-lg">
                                            <option value="0">0 m&sup2;</option>
                                            <option value="25">25 m&sup2;</option>
                                            <option value="100">100 m&sup2;</option>
                                            <option value="250">250 m&sup2;</option>
                                            <option value="550">550 m&sup2;</option>
                                            <option value="1000">1000 m&sup2;</option>
                                            <option value="1500">1500 m&sup2;</option>
                                            <option value="3000" selected>3000 m&sup2;</option>
                                        </select>
                                    </div>
                                    <div id="errorcontainer-min_area" class="errorDiv"></div>
								</div>
                                <div class="form-group">
									<p><?= $lang['search_leasing_period'] ?></p>
                                    <select id="length" name="length" class="form-control c-square c-theme input-lg" required>
                                        <option value=""><?= $lang['search_leasing_period'] ?>*</option>
                                    <?php for($i=1;$i<=8;$i++) { ?>
                                        <option value="<?= $i; ?>"><?= $i; ?><?= $lang['search_year'] ?></option>
                                    <?php } ?>
                                    </select>
                                    <div id="errorcontainer-length" class="errorDiv"></div>
								</div>
                                <div class="form-group">
									<p><?= $lang['search_planned_moving_in'] ?></p>
                                    <input type="text" id="start" name="start" class="form-control c-square c-theme input-lg" placeholder="<?= $lang['search_planned_moving_in_date'] ?>*" data-plugin="datepicker" required readonly style="background-color: #fff;">
                                    <div id="errorcontainer-start" class="errorDiv"></div>
								</div>
								<div class="form-group">
									<p><?= $lang['search_shopping_malls'] ?></p>
                                    <div class="form-group" style="float: left; margin-right: 20px;">
                                        <div class="c-checkbox">
                                            <input id="<?= $shanghai_sbm ?>" name="mall" value="<?= $shanghai_sbm ?>" class="c-check" type="checkbox" checked>
                                            <label for="<?= $shanghai_sbm ?>" class="c-font-thin c-font-17">
                                            <span></span>
                                            <span class="check"></span>
                                            <span class="box"></span>
                                            <?= $lang['search_ljz'] ?> </label>
                                        </div>
                                    </div>
                                    <div class="form-group" style="float: left; margin-right: 20px;">
                                        <div class="c-checkbox">
                                            <input id="<?= $xh_tm ?>" name="mall" value="<?= $xh_tm ?>" class="c-check" type="checkbox" disabled>
                                            <label for="<?= $xh_tm ?>" class="c-font-thin c-font-17">
                                            <span></span>
                                            <span class="check"></span>
                                            <span class="box"></span>
                                            <?= $lang['search_xh'] ?> </label>
                                        </div>
                                    </div>
                                    <div class="form-group" style="float: left; margin-right: 20px;">
                                        <div class="c-checkbox">
                                            <input id="<?= $bs_tm ?>" name="mall" value="<?= $bs_tm ?>" class="c-check" type="checkbox">
                                            <label for="<?= $bs_tm ?>" class="c-font-thin c-font-17">
                                            <span></span>
                                            <span class="check"></span>
                                            <span class="box"></span>
                                            <?= $lang['search_bs'] ?> </label>
                                        </div>
                                    </div>
                                    <div class="form-group" style="float: left; margin-right: 20px;">
                                        <div class="c-checkbox">
                                            <input id="<?= $wx_tm ?>" name="mall" value="<?= $wx_tm ?>" class="c-check" type="checkbox" disabled>
                                            <label for="<?= $wx_tm ?>" class="c-font-thin c-font-17">
                                            <span></span>
                                            <span class="check"></span>
                                            <span class="box"></span>
                                            <?= $lang['search_wx'] ?> </label>
                                        </div>
                                    </div>
                                    <div class="form-group" style="float: left; margin-right: 20px;">
                                        <div class="c-checkbox">
                                            <input id="<?= $xa_tm ?>" name="mall" value="<?= $xa_tm ?>" class="c-check" type="checkbox" disabled>
                                            <label for="<?= $xa_tm ?>" class="c-font-thin c-font-17">
                                            <span></span>
                                            <span class="check"></span>
                                            <span class="box"></span>
                                            <?= $lang['search_xa'] ?> </label>
                                        </div>
                                    </div>
                                    <div class="form-group" style="float: left; margin-right: 20px;">
                                        <div class="c-checkbox">
                                            <input id="<?= $zz_tm ?>" name="mall" value="<?= $zz_tm ?>" class="c-check" type="checkbox" disabled>
                                            <label for="<?= $zz_tm ?>" class="c-font-thin c-font-17">
                                            <span></span>
                                            <span class="check"></span>
                                            <span class="box"></span>
                                            <?= $lang['search_zz'] ?> </label>
                                        </div>
                                    </div>
								</div>
                                <div class="clearfix"> </div>
								<button id="search_button" class="btn c-theme-btn c-btn-uppercase btn-lg c-btn-bold c-btn-square"><?= $lang['search_search_shops'] ?></button>
							</form>
						</div>
					</div>
                    <div class="col-md-4">
                        <div class="c-content-testimonial-2-slider" data-slider="owl" data-single-item="true" data-auto-play="6000" style="margin-bottom: 30px;">
                            <div class="owl-carousel owl-theme c-theme owl-single">
                                <div class="item">
                                    <div class="c-content-testimonial-2 c-bg-grey-1" style="background-image:url(views/assets/base/img/content/misc/feedback_box_3.png); background-position: right bottom; background-repeat: no-repeat; padding: 30px;">
                                        <div class="c-content-title-1 c-inverse">
                                            <h4 class="c-font-bold"><?= $lang['search_my_info'] ?></h4>
                                            <div class="c-line-left"></div>
                                        </div>
                                        <ul class="c-content-list-1 c-theme c-separator-dot c-square">
                                            <li>
                                                <?= $lang['search_contact_name'] ?>: <span id="name"></span>
                                            </li>
                                            <li>
                                                <?= $lang['search_company_name'] ?>: <span id="company_name"></span>
                                            </li>
                                            <li>
                                                <?= $lang['search_mobile'] ?>: <span id="mobile"></span>
                                            </li>
                                            <li>
                                                <?= $lang['search_email'] ?>: <span id="email"></span>
                                            </li>
                                            <li>
                                                <?= $lang['search_brand'] ?>: <span id="brand"></span>
                                            </li>
                                            <li>
                                                <?= $lang['search_pre_category'] ?>: <span id="brand_modality_0"></span><input type="hidden" id="brand_modality_0_code"></input>
                                            </li>
                                            <li>
                                                <?= $lang['search_primary_category'] ?>: <span id="brand_modality_1"></span><input type="hidden" id="brand_modality_1_code"></input>
                                            </li>
                                            <li>
                                                <?= $lang['search_secondary_category'] ?>: <span id="brand_modality_2"></span><input type="hidden" id="brand_modality_2_code"></input>
                                            </li>
                                            <li>
                                                <?= $lang['search_tertiary_category'] ?>: <span id="brand_modality_3"></span><input type="hidden" id="brand_modality_3_code"></input>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="c-content-testimonial-2-slider" data-slider="owl" data-single-item="true" data-auto-play="6000">
                            <div class="owl-carousel owl-theme c-theme owl-single">
                                <div class="item">
                                    <div class="c-content-testimonial-2 c-bg-grey-1" style="min-height: 360px; background-image:url(views/assets/base/img/content/misc/feedback_box_3.png); background-position: right bottom; background-repeat: no-repeat; padding: 30px;">
                                        <div class="c-content-title-1 c-inverse">
                                            <h4 class="c-font-bold"><?= $lang['search_search_history'] ?></h4>
                                            <div class="c-line-left"></div>
                                        </div>
                                        <div class="c-content-accordion-1 c-theme"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- END: 搜索店铺 -->

    <div class="c-content-box c-size-md c-bg-grey-2" style="padding-bottom: 30px;">
		<div class="container">
			<div class="c-content-team-1-slider" data-slider="owl" data-items="3">
				<div class="c-content-title-1"></div>
				<div class="row c-content-list"></div>
			</div>
            <div id="loadMore-container" class="cbp-l-loadMore-button c-margin-t-60" style="display: none;">
				<a href="javascript:void(0);" class="cbp-l-loadMore-link btn btn-sm c-btn-square c-btn-border-2x c-btn-dark">
                    <span class="cbp-l-loadMore-defaultText"><?= $lang['search_load_more'] ?>...</span>
				</a>
			</div>
            <center><button type="submit" class="btn btn-danger btn-md c-btn-uppercase c-btn-bold c-btn-square" id="reserve_items" style="display: none;"><i class="icon-check"></i> <?= $lang['search_check_or_negotiation'] ?></button></center>
		</div>
	</div>
</div>

<div class="modal fade c-content-login-form" id="reserve-form" role="dialog" data-backdrop="static" data-keyboard="false" style="z-index: 10051;">
	<div class="modal-dialog">
        <div class="modal-content c-square" style="background-color: #fff; padding: 0;">
			<div class="modal-header c-no-border">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
			</div>
			<div class="modal-body">
				<form id="reserve_form">
                    <div class="c-content-label c-font-uppercase c-font-bold c-theme-bg">
                        <?= $lang['search_reserve_info'] ?>
                    </div>
                    <ul class="c-content-list-1 c-theme c-separator-dot c-square">
                        <li>
                            <?= $lang['search_moving_in_brand'] ?>: 
                            <input type="text" id="brand_name" name="brand_name" class="form-control c-square c-theme input-sm" style="display: inline; width: auto;" disabled>
                        </li>
                        <li>
                            <?= $lang['search_reserving'] ?><span id="reserve_tag"><?= $lang['search_reserving_stores'] ?></span>:
                            <input id="reserve_date" name="reserve_date" class="form-control c-square c-theme input-sm" placeholder="<?= $lang['search_reserve_date'] ?>" data-plugin="datepicker" required type="text" style="display: inline; width: auto; background-color: #fff;" readonly>
                            <div id="errorcontainer-reserve_date" class="errorDiv"></div>
                        </li>
                        <li>
                            <?= $lang['search_leasable_area'] ?>: 
                            <input type="text" id="leasing_area" name="leasing_area" class="form-control c-square c-theme input-sm" placeholder="<?= $lang['search_leasable_area'] ?>" style="display: inline; width: auto;" readonly>
                            <span class="input-group-addon" style="display: inline; width: auto; margin-left: -48px; padding-top: 8px;">m&sup2;</span>
                            <div id="errorcontainer-leasing_area" class="errorDiv"></div>
                        </li>
                        <li>
                            <?= $lang['search_lease_term'] ?>: 
                            <input type="text" id="rental_length" name="rental_length" class="form-control c-square c-theme input-sm" placeholder="<?= $lang['search_lease_term'] ?>" style="display: inline; width: auto;" readonly>
                            <span class="input-group-addon" style="display: inline; width: auto; margin-left: -48px; padding-top: 8px;"><?= $lang['search_year'] ?></span>
                            <div id="errorcontainer-rental_length" class="errorDiv"></div>
                        </li>
                        <li>
                            <?= $lang['search_planned_moving_in'] ?>: 
                            <input type="text" id="start_date" name="start_date" class="form-control c-square c-theme input-sm" placeholder="<?= $lang['search_planned_moving_in'] ?>" style="display: inline; width: auto;" readonly>
                            <div id="errorcontainer-start_date" class="errorDiv"></div>
                        </li>
                        <li>
                            <?= $lang['search_verify_method'] ?>: 
                            <select id="international" name="international" class="form-control c-square c-theme input-sm valid" required style="display: inline; width: auto;">
                                <option value=""><?= $lang['search_choose'] ?></option>
                            </select>
                            <div id="errorcontainer-international" class="errorDiv"></div>
                        </li>
                        <li style="position: relative;">
                            <?= $lang['search_verify_code'] ?>:&nbsp;&nbsp;&nbsp;
                            <input type="text" id="international_verify" name="international_verify" class="form-control c-square c-theme input-sm valid" required placeholder="<?= $lang['search_verify_code'] ?>" style="display: inline; width: auto;">
                            <a href="javascript: VeryficationCodeReservation()" id="international_verify_link" style="display: block; position: absolute; z-index: 10; left: 190px; font-size: 14px; top: 5px;"><?= $lang['search_send_code'] ?></a>
                            <div id="errorcontainer-international_verify" class="errorDiv"></div>
                        </li>
                    </ul>

                    <hr>
                    <div class="form-group">
                        <button type="submit" class="btn btn-danger btn-md c-btn-uppercase c-btn-bold c-btn-square"><i class="icon-check"></i> <?= $lang['search_make_reservation'] ?></button>
                    </div>
                </form>
			</div>
		</div>
	</div>
</div>

<?php include ('footer.php'); ?>