<?php  
    $scripts = $scripts. '<script type="text/javascript" src="views/assets/base/js/my-info.js"></script>';
?>

<div class="alert alert-success cinfo-succeed" role="alert">
    修改信息成功！
</div>

<!-- BEGIN: PAGE CONTAINER -->
<div class="c-layout-page">
    <!-- BEGIN: 标题 -->
	<div class="c-layout-breadcrumbs-1 c-fonts-uppercase c-fonts-bold">
		<div class="container">
			<div class="c-page-title c-pull-left">
				<h3 class="c-font-uppercase c-font-bold"><?= $lang['my_info_my_info'] ?></h3>
			</div>
			<ul class="c-page-breadcrumbs c-theme-nav c-pull-right c-fonts-regular">
				<li>
					<a href="/"><?= $lang['search_home'] ?></a>
				</li>
				<li>
					/
				</li>
				<li class="c-state_active">
					<?= $lang['my_info_my_info'] ?>
				</li>
			</ul>
		</div>
	</div>
	<!-- END: 标题 -->
    <!-- BEGIN: 我的信息 -->
	<div class="c-content-box c-size-md c-no-padding" style="margin-top: 20px;">
		<div class="container">
            <form id="my_info_form">
                <div class="c-content-title-1">
                    <h3 class="c-font-uppercase c-font-bold"><?= $lang['my_info_my_info'] ?></h3>
                    <div class="c-line-left c-theme-bg">
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-4">
                        <div class="form-group">
                            <label for="contact_name_1">姓名*</label>
                            <input type="text" id="contact_name_1" name="contact_name_1" class="form-control input-lg c-square" required>
                            <div id="errorcontainer-contact_name_1" class="errorDiv"></div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label for="merchant_name"><?= $lang['my_info_company_name'] ?>*</label>
                            <input type="text" id="merchant_name" name="merchant_name" class="form-control input-lg c-square" required>
                            <div id="errorcontainer-merchant_name" class="errorDiv"></div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label for="brand_name">品牌名称*</label>
                            <input type="text" id="brand_name" name="brand_name" class="form-control input-lg c-square" required>
                            <div id="errorcontainer-brand_name" class="errorDiv"></div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label for="modality_1"><?= $lang['register_modality_1'] ?>*</label>
                            <select class="form-control input-lg c-square" id="modality_1" name="modality_1" onchange="getBrandModality2(this.value);" required>
                                <option value=""><?= $lang['register_choose'] ?><?= $lang['register_modality_1'] ?>*</option>
                            </select>
                            <div id="errorcontainer-modality_1" class="errorDiv"></div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label for="modality_2"><?= $lang['register_modality_2'] ?>*</label>
                            <select class="form-control input-lg c-square" id="modality_2" name="modality_2" onchange="getBrandModality3(this.value);" required>
                                <option value=""><?= $lang['register_choose'] ?><?= $lang['register_modality_2'] ?>*</option>
                            </select>
                            <div id="errorcontainer-modality_2" class="errorDiv"></div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label for="modality_3"><?= $lang['register_modality_3'] ?>*</label>
                            <select class="form-control input-lg c-square" id="modality_3" name="modality_3" required>
                                <option value=""><?= $lang['register_choose'] ?><?= $lang['register_modality_3'] ?>*</option>
                            </select>
                            <div id="errorcontainer-modality_3" class="errorDiv"></div>
                        </div>
                    </div>
                    <div class="col-md-4">
                       <div class="form-group">
                            <label for="website">官网链接</label>
                            <input type="url" id="website" name="website" class="form-control input-lg c-square">
                            <div id="errorcontainer-website" class="errorDiv"></div>
                        </div>
                    </div>
                    <div class="col-md-4">
                       <div class="form-group">
                            <label>公司品牌PDF</label>
                            <div id="pdf" class="form-control input-lg c-square"></div>
                        </div>
                    </div>
                    <div class="col-md-4">
                       <div class="form-group">
                            <label for="website">上传PDF</label>
                            <input type="hidden" name="MAX_FILE_SIZE" value="9000000">
                            <input type="hidden" id="hidden_file">
                            <input type="file" id="file" name="file" accept=".pdf">
                            <div id="errorcontainer-file" class="errorDiv"></div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="contact_phone_1"><?= $lang['my_info_mobile'] ?>* <span id="contact_phone_1_verified"></span></label>
                            <input type="text" id="contact_phone_1" name="contact_phone_1" class="form-control input-lg c-square" required>
                            <div id="errorcontainer-contact_phone_1" class="errorDiv"></div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="email"><?= $lang['my_info_email'] ?>* <span id="email_verified"></span></label>
                            <input type="email" id="email" name="email" class="form-control input-lg c-square" required>
                            <div id="errorcontainer-email" class="errorDiv"></div>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="form-group">
                            <button type="submit" class="btn c-theme-btn c-btn-uppercase btn-lg c-btn-bold c-btn-square">保存信息</button>
                        </div>
                    </div>
                    <br><br><br>
                </div>
            </form>
        </div>
    </div>
    <!-- END: 我的信息 -->
</div>

<?php include ('footer.php'); ?>