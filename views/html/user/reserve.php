<?php
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
				<h3 class="c-font-uppercase c-font-bold">预约看铺</h3>
			</div>
			<ul class="c-page-breadcrumbs c-theme-nav c-pull-right c-fonts-regular">
				<li>
					<a href="/"><?= $lang['shop_home'] ?></a>
				</li>
				<li>
					/
				</li>
				<li class="c-state_active">
					<?= $lang['shop_shop_detail'] ?>
				</li>
                <li>
					/
				</li>
                <li>预约看铺</li>
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
							我的信息
						</div>
						<ul class="c-content-list-1 c-theme c-separator-dot c-square">
                            <li>
                                姓名: <span id="name"></span><input type="hidden" id="code" name="code">
                            </li>
                            <li>
                                公司名称: <span id="company_name"></span>
                            </li>
                            <li>
                                联系电话: <span id="mobile"></span>
                            </li>
                            <li>
                                邮箱: <span id="email"></span>
                            </li>
                        </ul>
                    </div>
                    
                    <div class="c-content-media-1 c-bordered" style="margin-top: 20px;">
                        <form id="reserve_form">
                            <div class="c-content-label c-font-uppercase c-font-bold c-theme-bg">
                                预约信息
                            </div>
                            <ul class="c-content-list-1 c-theme c-separator-dot c-square">
                                <li>
                                    入驻品牌: 
                                    <input type="text" id="brand" name="brand" class="form-control c-square c-theme input-sm" style="display: inline; width: auto;" disabled>
                                    <input type="hidden" id="brand_modality" name="brand_modality">
                                </li>
                                <li>
                                    预约看铺:
                                    <input id="reserve_date" name="reserve_date" class="form-control c-square c-theme input-sm" placeholder="请选择看铺日期" data-plugin="datepicker" required type="text" style="display: inline; width: auto; background-color: #fff;" readonly>
                                    <div id="errorcontainer-reserve_date" class="errorDiv"></div>
                                </li>
                                <li>
                                    租约年限: 
                                    <select id="length" name="length" class="form-control c-square c-theme input-sm valid" required aria-invalid="false" style="display: inline; width: auto;">
                                        <option value="">请选择租约年限</option>
                                    <?php for($i=1;$i<=8;$i++) { ?>
                                        <option value="<?= $i; ?>"><?= $i; ?>年</option>
                                    <?php } ?>
                                    </select>
                                    <div id="errorcontainer-length" class="errorDiv"></div>
                                </li>
                                <li>
                                    预计入驻: 
                                    <input type="text" id="start_date" name="start_date" class="form-control c-square c-theme input-sm" placeholder="<?= $lang['bid_start_leasing_date'] ?>" data-plugin="datepicker" style="display: inline; width: auto; background-color: #fff;" readonly>
                                    <div id="errorcontainer-start_date" class="errorDiv"></div>
                                </li>
                                <li>
                                    验证方式: 
                                    <select id="international" name="international" class="form-control c-square c-theme input-sm valid" required style="display: inline; width: auto;">
                                        <option value=""><?= $lang['register_choose'] ?>验证方式</option>
                                    </select>
                                    <div id="errorcontainer-international" class="errorDiv"></div>
                                </li>
                                <li style="position: relative;">
                                    验证码:&nbsp;&nbsp;&nbsp;
                                    <input type="text" id="international_verify" name="international_verify" class="form-control c-square c-theme input-sm valid" required placeholder="<?= $lang['register_veryfication_code'] ?>" style="display: inline; width: auto;">
                                    <a href="javascript: VeryficationCodeReservation()" id="international_verify_link" style="display: block; position: absolute; z-index: 10; left: 165px; font-size: 14px; top: 5px;">发送验证码</a>
                                    <div id="errorcontainer-international_verify" class="errorDiv"></div>
                                </li>
                            </ul>

                            <hr>
                            <div class="form-group">
                                <button type="submit" class="btn btn-danger btn-md c-btn-uppercase c-btn-bold c-btn-square"><i class="icon-check"></i> 提交预约</button>
                            </div>
                        </form>
					</div>
				</div>
                <div class="col-md-4">
					<div class="c-content-media-1 c-bordered" style="min-height: 380px;">
						<div class="c-content-label c-font-uppercase c-font-bold c-theme-bg">
							店铺信息
						</div>
                        <img id="shop_image" src="#" class="img-responsive" style="margin-top: 20px;">
						<ul class="c-content-list-1 c-theme c-separator-dot c-square">
                            <li>
                                所属项目: <span id="mall"></span>
                            </li>
                            <li>
                                店铺编号: <span id="unit"></span>
                            </li>
                            <li>
                                所在楼层: <span id="floor"></span>
                            </li>
                            <li>
                                租赁面积: <span id="area"></span>m²
                            </li>
                            <li>
                                推荐业态: <span id="modality"></span>
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