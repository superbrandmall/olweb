<?php
$scripts = $scripts. '<script type="text/javascript" src="views/assets/base/js/bid.js"></script>'
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
				<h3 class="c-font-uppercase c-font-bold"><?= $lang['bid_price_offer'] ?></h3>
			</div>
			<ul class="c-page-breadcrumbs c-theme-nav c-pull-right c-fonts-regular">
				<li>
					<a href="/"><?= $lang['bid_home'] ?></a>
				</li>
				<li>
					/
				</li>
				<li class="c-state_active">
					<?= $lang['bid_price_offer'] ?>
				</li>
			</ul>
		</div>
	</div>
	<!-- END: 标题 -->
    <!-- BEGIN: 店铺出价 -->
    <div class="c-content-box c-size-md c-bg-white">
		<div class="container">
            <div class="c-content-feedback-1 c-option-1">
                <div class="row">
                    <div class="col-md-12">
                        <div class="c-container c-bg-grey-1 c-bg-img-bottom-right" style="background-image:url(views/assets/base/img/content/misc/feedback_box_3.png); overflow: auto;">
                            <div class="c-content-title-1">
                                <h3 class="c-font-uppercase c-font-bold"><?= $lang['bid_my_info'] ?></h3>
                                <div class="c-line-left">
                                </div>
                                <div class="col-md-6">
                                    <ul class="c-content-list-1 c-theme c-separator-dot c-square" style="margin: 0;">
                                        <li id="company_name"></li>
                                    </ul>
                                </div>
                                <div class="col-md-6">
                                    <ul class="c-content-list-1 c-theme c-separator-dot c-square" style="margin: 0;">
                                        <li> <?= $lang['bid_contact_info'] ?>: <?= $_SESSION['user_login'] ?> </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="c-container c-bg-grey-1 c-bg-img-bottom-right" style="background-image:url(views/assets/base/img/content/misc/feedback_box_3.png); overflow: auto;">
                            <div class="c-content-title-1">
                                <h3 class="c-font-uppercase c-font-bold"><?= $lang['bid_shop_info'] ?></h3>
                                <div class="c-line-left">
                                </div>
                                <div class="col-md-6">
                                    <ul class="c-content-list-1 c-theme c-separator-dot c-square" id="shop_info_1" style="margin: 0;"></ul>
                                </div>
                                <div class="col-md-6">
                                    <ul class="c-content-list-1 c-theme c-separator-dot c-square" id="shop_info_2" style="margin: 0;"></ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div><br>
            <h1 class="c-font-uppercase c-font-bold">请选择经营模式</h1>
            <div class="c-body">
                <div class="c-content-tab-1 c-theme c-margin-t-30">
                    <div class="clearfix">
                        <ul class="nav nav-tabs c-font-uppercase c-font-bold">
                            <li class="active">
                                <a href="#tab_1_1_content" data-toggle="tab"><i class="fa fa-hand-pointer-o" aria-hidden="true"></i> 租赁</a>
                            </li>
                            <li>
                                <a href="#tab_1_2_content" data-toggle="tab"><i class="fa fa-handshake-o" aria-hidden="true"></i> 联销</a>
                            </li>
                        </ul>
                    </div>
                    <div class="tab-content c-bordered c-padding-lg">
                        <div class="tab-pane active" id="tab_1_1_content">
                            <form id="bid_form">
                                <div class="c-content-box c-size-md c-bg-white" style="padding: 0 0 30px; margin-bottom: 0;">
                                    <div class="c-content-feedback-1 c-option-1">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="c-container c-bg-grey-1 c-bg-img-bottom-right" style="background-image:url(views/assets/base/img/content/misc/feedback_box_3.png); overflow: auto; margin: 0;">
                                                    <div class="c-content-title-1">
                                                        <h3 class="c-font-uppercase c-font-bold"><?= $lang['bid_moving_info'] ?></h3>
                                                        <div class="c-line-left">
                                                        </div>
                                                        <div class="col-md-6">
                                                            <div class="form-group">
                                                                <p><?= $lang['bid_brand'] ?></p>
                                                                <select id="brand" name="brand" class="form-control c-square c-theme input-lg" required>
                                                                    <option value=""><?= $lang['bid_choose_from_brands'] ?></option>
                                                                </select>
                                                                <div id="errorcontainer-brand" class="errorDiv"></div>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <div class="form-group">
                                                                <p>租约年限</p>
                                                                <select id="length" name="length" class="form-control c-square c-theme input-lg" required>
                                                                    <option value="">请选择租约年限</option>
                                                                    <?php for($i=1;$i<=8;$i++) { ?>
                                                                    <option value="<?= $i; ?>"><?= $i; ?>年</option>
                                                                    <?php } ?>
                                                                </select>
                                                                <div id="errorcontainer-length" class="errorDiv"></div>
                                                            </div>
                                                        </div>
                                                        <div class="clearfix"> </div>
                                                        <div class="col-md-6">
                                                            <div class="form-group">
                                                                <p><?= $lang['bid_leasing_period'] ?></p>
                                                                <div class="input-group input-daterange" id="date">
                                                                    <span class="input-group-addon"><?= $lang['bid_from'] ?></span>
                                                                    <input type="text" id="start_date" name="start_date" class="form-control c-square c-theme input-lg" placeholder="<?= $lang['bid_start_leasing_date'] ?>" data-plugin="datepicker">
                                                                    <span class="input-group-addon"><?= $lang['bid_to'] ?></span>
                                                                    <input type="text" id="end_date" name="end_date" class="form-control c-square c-theme input-lg" placeholder="<?= $lang['bid_end_leasing_date'] ?>" data-plugin="datepicker">
                                                                </div>
                                                                <div id="errorcontainer-start_date" class="errorDiv"></div>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <div class="form-group">
                                                                <p><?= $lang['bid_rent_method'] ?></p>
                                                                <select id="rent_method" name="rent_method" class="form-control c-square c-theme input-lg" required>
                                                                    <option value=""><?= $lang['bid_please_choose'] ?><?= $lang['bid_rent_method'] ?></option>
                                                                    <option value="1"><?= $lang['bid_dead_commission_rent_take_high'] ?></option>
                                                                    <option value="2"><?= $lang['bid_dead_rent'] ?></option>
                                                                    <option value="3"><?= $lang['bid_commission_rent'] ?></option>
                                                                    <option value="4"><?= $lang['bid_dead_plus_commission_rent'] ?></option>
                                                                </select>
                                                                <div id="errorcontainer-rent_method" class="errorDiv"></div>
                                                            </div>
                                                        </div>
                                                        <!--<div class="col-md-4">
                                                            <div class="form-group">
                                                                <p><?= $lang['bid_high_frequency'] ?></p>
                                                                <select id="compare_frequency" name="compare_frequency" class="form-control c-square c-theme input-lg" required>
                                                                    <option value=""><?= $lang['bid_please_choose'] ?><?= $lang['bid_high_frequency'] ?></option>
                                                                    <option value="1"><?= $lang['bid_by_month'] ?></option>
                                                                    <option value="2"><?= $lang['bid_by_quater'] ?></option>
                                                                    <option value="3"><?= $lang['bid_by_year'] ?></option>
                                                                </select>
                                                                <div id="errorcontainer-compare_frequency" class="errorDiv"></div>
                                                            </div>
                                                        </div>-->
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div id="relevant_fees" class="c-content-box c-size-md c-bg-white" style="padding: 0 0 30px; margin-bottom: 0; display: none;">
                                    <div class="c-content-feedback-1 c-option-1">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="c-container c-bg-grey-1 c-bg-img-bottom-right" style="background-image:url(views/assets/base/img/content/misc/feedback_box_3.png); overflow: auto; margin: 0;">
                                                    <div class="c-content-title-1">
                                                        <h3 class="c-font-uppercase c-font-bold"><?= $lang['bid_relevant_fees'] ?></h3>
                                                        <div class="c-line-left">
                                                        </div>
                                                        <div class="table-responsive">
                                                            <table class="table table-bordered" style="background: #fff;">
                                                                <thead>
                                                                    <tr>
                                                                        <th>
                                                                            开始时间&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                                        </th>
                                                                        <th>
                                                                            <?= $lang['bid_dead_rent'] ?>(<?= $lang['bid_monthly'] ?>)
                                                                        </th>
                                                                        <th>
                                                                            <?= $lang['bid_floating_rental_rate'] ?>(%)
                                                                        </th>
                                                                        <th>
                                                                            推广费率(%)
                                                                        </th>
                                                                        <th>
                                                                            装修期内物业管理费
                                                                        </th>
                                                                        <th>
                                                                            装修期外物业管理费
                                                                        </th>
                                                                        <th>
                                                                            租赁保证金(<?= $lang['bid_yuan'] ?>)
                                                                        </th>
                                                                        <th>
                                                                            公共事业费押金
                                                                        </th>
                                                                        <th>
                                                                            数据采集设备初装费
                                                                        </th>
                                                                        <th>
                                                                            数据采集设备保证金
                                                                        </th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <?php for($i=1;$i<=8;$i++) { ?>
                                                                    <tr>
                                                                        <td>
                                                                            <input type="text" id="begin_rent_period_<?= $i ?>" name="begin_rent_period_<?= $i ?>" class="begin-rent-period form-control c-square c-theme" data-plugin="datepicker">
                                                                            <input type="hidden" id="hidden_begin_rent_period_<?= $i ?>" name="hidden_begin_rent_period_<?= $i ?>">
                                                                            <div id="errorcontainer-begin_rent_period_<?= $i ?>" class="errorDiv"></div>
                                                                        </td>
                                                                        <td>
                                                                            <input type="text" id="dead_rent_<?= $i ?>" name="dead_rent_<?= $i ?>" class="dead_rent form-control c-square c-theme">
                                                                            <div id="errorcontainer-dead_rent_<?= $i ?>" class="errorDiv"></div>
                                                                        </td>
                                                                        <td>
                                                                            <input type="text" id="floating_rent_<?= $i ?>" name="floating_rent_<?= $i ?>" class="form-control c-square c-theme">
                                                                            <div id="errorcontainer-floating_rent_<?= $i ?>" class="errorDiv"></div>
                                                                        </td>
                                                                        <td>
                                                                            <input type="text"  <?php if($i === 1) { ?>id="promotion_budget" name="promotion_budget"<?php } ?> class="form-control c-square c-theme" value="1" disabled>
                                                                        </td>
                                                                        <td>
                                                                            <div class="input-group c-square">
                                                                                <input type="text" <?php if($i === 1) { ?>id="maintenance_during_decoration" name="maintenance_during_decoration"<?php } ?> class="maintenance_during_decoration form-control c-square c-theme" disabled>
                                                                                <span class="input-group-addon"><?= $lang['bid_monthly'] ?></span>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div class="input-group c-square">
                                                                                <input type="text" <?php if($i === 1) { ?>id="maintenance_after_decoration" name="maintenance_after_decoration"<?php } ?> class="maintenance_after_decoration form-control c-square c-theme" disabled>
                                                                                <span class="input-group-addon"><?= $lang['bid_monthly'] ?></span>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <?php if($i === 1) { ?>
                                                                            <input type="text" id="gurantee" name="gurantee" class="form-control c-square c-theme" required>
                                                                            <div id="errorcontainer-gurantee" class="errorDiv"></div>
                                                                            <?php } else { ?>
                                                                            /
                                                                            <?php } ?>
                                                                        </td>
                                                                        <td>
                                                                            <?php if($i === 1) { ?>
                                                                            <div class="input-group c-square">
                                                                                <input type="text" id="public_deposit" name="public_deposit" class="form-control c-square c-theme" required>
                                                                                <span class="input-group-addon"><?= $lang['bid_yuan'] ?></span>
                                                                            </div>
                                                                            <div id="errorcontainer-public_deposit" class="errorDiv"></div>
                                                                            <?php } else { ?>
                                                                            /
                                                                            <?php } ?>
                                                                        </td>
                                                                        <td>
                                                                            <?php if($i === 1) { ?>
                                                                            <div class="input-group c-square">
                                                                                <input type="text" class="form-control c-square c-theme" value="3500" disabled>
                                                                                <span class="input-group-addon"><?= $lang['bid_yuan'] ?></span>
                                                                            </div>
                                                                            <?php } else { ?>
                                                                            /
                                                                            <?php } ?>
                                                                        </td>
                                                                        <td>
                                                                            <?php if($i === 1) { ?>
                                                                            <div class="input-group c-square">
                                                                                <input type="text" class="form-control c-square c-theme" value="3000" disabled>
                                                                                <span class="input-group-addon"><?= $lang['bid_yuan'] ?></span>
                                                                            </div>
                                                                            <?php } else { ?>
                                                                            /
                                                                            <?php } ?>
                                                                        </td>
                                                                    </tr>
                                                                    <?php } ?>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="c-content-box c-size-md c-bg-white" style="padding: 0 0 30px; margin-bottom: 0;">
                                    <div class="c-content-feedback-1 c-option-1">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="c-container c-bg-grey-1 c-bg-img-bottom-right" style="background-image:url(views/assets/base/img/content/misc/feedback_box_3.png); overflow: auto; margin: 0;">
                                                    <div class="c-content-title-1">
                                                        <h3 class="c-font-uppercase c-font-bold"><?= $lang['bid_other_info'] ?></h3>
                                                        <div class="c-line-left">
                                                        </div>
                                                        <input type="hidden" id="promotion_kind" name="promotion_kind" value="0">
                                                        <div class="col-md-3">
                                                            <div class="form-group">
                                                                <p><?= $lang['bid_target'] ?></p>
                                                                <div class="input-group c-square">
                                                                    <input type="text" id="target" name="target" class="form-control c-square c-theme input-lg" placeholder="<?= $lang['bid_please_enter'] ?><?= $lang['bid_target'] ?>" required>
                                                                    <span class="input-group-addon"><?= $lang['bid_monthly'] ?></span>
                                                                </div>
                                                                <div id="errorcontainer-target" class="errorDiv"></div>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-3">
                                                            <div class="form-group">
                                                                <p><?= $lang['bid_promotion'] ?></p>
                                                                <div class="input-group c-square">
                                                                    <input type="text" id="promotion" name="promotion" class="form-control c-square c-theme input-lg" value="2" placeholder="<?= $lang['bid_please_enter'] ?><?= $lang['bid_promotion'] ?>" required>
                                                                    <span class="input-group-addon"><?= $lang['bid_times_year'] ?></span>
                                                                </div>
                                                                <div id="errorcontainer-promotion" class="errorDiv"></div>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-3">
                                                            <div class="form-group">
                                                                <p><?= $lang['bid_free_days'] ?></p>
                                                                <div class="input-group c-square">
                                                                    <input type="text" id="free_days" name="free_days" class="form-control c-square c-theme input-lg" placeholder="<?= $lang['bid_please_enter'] ?><?= $lang['bid_free_days'] ?>" required>
                                                                    <span class="input-group-addon"><?= $lang['bid_days'] ?></span>
                                                                </div>
                                                                <div id="errorcontainer-free_days" class="errorDiv"></div>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-3">
                                                            <div class="form-group">
                                                                <p><?= $lang['bid_opening'] ?></p>
                                                                <input type="text" id="opening" name="opening" class="form-control c-square c-theme input-lg" placeholder="<?= $lang['bid_please_choose'] ?><?= $lang['bid_opening'] ?>" data-plugin="datepicker" required>
                                                                <div id="errorcontainer-opening" class="errorDiv"></div>
                                                            </div>
                                                        </div>
                                                        <div class="clearfix"> </div>
                                                        <div class="col-md-4">
                                                            <div class="form-group">
                                                                <p><?= $lang['bid_cashier_mode'] ?></p>
                                                                <div class="radio">
                                                                    <label>
                                                                    <input id="pos_service" name="cashier_mode" value="2" checked type="radio">
                                                                    <?= $lang['bid_rent_pos'] ?> </label>
                                                                </div>
                                                                <div class="radio">
                                                                    <label>
                                                                    <input id="self_pos" name="cashier_mode" value="1" type="radio">
                                                                    <?= $lang['bid_self_pos'] ?> </label>
                                                                </div>
                                                                <div class="radio">
                                                                    <label>
                                                                    <input id="central_cashier" name="cashier_mode" value="3" type="radio">
                                                                    <?= $lang['bid_central_pos'] ?> </label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-8">
                                                            <div class="form-group">
                                                                <p><?= $lang['bid_business_hours_requirement'] ?></p>
                                                                <div class="radio">
                                                                    <label>
                                                                    <input id="normal" name="business_hours" value="1"  checked type="radio">
                                                                    <?= $lang['bid_business_hours_1'] ?> </label>
                                                                </div>
                                                                <div class="radio">
                                                                    <label>
                                                                    <input id="extra" name="business_hours" value="2" type="radio">
                                                                    <?= $lang['bid_business_hours_2'] ?>
                                                                    <select id="extra_business_hour_1" name="extra_business_hour_1" class="c-square c-theme input-sm">
                                                                        <option value="七">七</option>
                                                                        <option value="八">八</option>
                                                                    </select>
                                                                    <?= $lang['bid_business_hours_3'] ?>
                                                                    <select id="extra_business_hour_2" name="extra_business_hour_2" class="c-square c-theme input-sm">
                                                                        <option value="二十三">二十三</option>
                                                                        <option value="次日零晨零点">次日凌晨零点</option>
                                                                        <option value="次日零晨一点">次日凌晨一点</option>
                                                                        <option value="次日零晨二点">次日凌晨二点</option>
                                                                    </select>
                                                                    <?= $lang['bid_oclock'] ?> 
                                                                    </label>                                                                
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="c-content-box c-size-md" style="padding: 0 0 30px; margin-bottom: 0;">
                                    <div class="c-content-feedback-1 c-option-1">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="c-container c-bg-grey-1 c-bg-img-bottom-right" style="background-image:url(views/assets/base/img/content/misc/feedback_box_3.png); overflow: auto; margin: 0;">
                                                    <div class="c-content-title-1">
                                                        <h3 class="c-font-uppercase c-font-bold">以下为不符合我司招商标准的条款</h3>
                                                        <div class="c-line-left">
                                                        </div>
                                                        <div class="c-content-ver-nav">
                                                            <ul class="c-menu c-arrow-dot" id="non_standard_list"></ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="form-group">
                                    <div class="c-checkbox">
                                        <input id="terms" name="terms" class="c-check" type="checkbox" required>
                                        <label for="terms" class="c-font-thin c-font-17">
                                        <span></span>
                                        <span class="check"></span>
                                        <span class="box"></span>
                                        <?= $lang['bid_read_agree'] ?><a href="#!">《<?= $lang['bid_some_agreement'] ?>》</a> </label>
                                    </div>
                                    <div id="errorcontainer-terms" class="errorDiv" style="margin-left: 23px"></div>
                                    <button type="submit" class="btn c-theme-btn btn-md c-btn-uppercase c-btn-bold c-btn-square"><?= $lang['bid_confirm'] ?></button>
                                </div>
                                <input type="hidden" id="hidden_merchant_code" value="<?= $_SESSION['mid'] ?>">
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- END: 店铺出价 -->
    
    <div class="modal fade bs-example-modal-lg" id="recommand_others" role="dialog" data-backdrop="static" data-keyboard="false">
        <div class="modal-dialog modal-lg">
            <div class="modal-content c-square">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                    <h4 class="modal-title" id="myLargeModalLabel"><i class="fa fa-exclamation-triangle"></i> 根据您所选的品牌，以下是我们为您推荐的与之业态相符的店铺</h4>
                </div>
                <div class="modal-body"></div>
            </div>
        </div>
    </div>
    
</div>

<?php include ('footer.php'); ?>