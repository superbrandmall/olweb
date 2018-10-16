<?php
$scripts = $scripts. '<script type="text/javascript" src="views/assets/plugins/typeahead/typeahead.bundle.js"></script>'
. '<script type="text/javascript" src="views/assets/base/js/register.js"></script>';
?>
<link href="views/assets/plugins/typeahead/typeaheadjs.css" rel="stylesheet">

<div class="modal fade c-content-login-form" id="step1" role="dialog" data-backdrop="static" data-keyboard="false">
	<div class="modal-dialog">
		<div class="modal-content c-square">
			<div class="modal-header c-no-border">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
			</div>
			<div class="modal-body">
				<h3 class="c-font-24 c-font-sbold"><?= $lang['register_register'] ?></h3>
				<form>
                    <div class="form-group">
                        <div class="input-group">
                            <label for="contact_name_1" class="hide"><?= $lang['register_main_contact'] ?>*</label>
                            <input type="text" id="contact_name_1" name="contact_name_1" placeholder="<?= $lang['register_main_contact'] ?>*" required class="form-control input-lg c-square">
                            <span class="input-group-addon" style="background: none;border: none;padding: 2px;"> </span>
                            <div style="position: relative;">
                                <label for="uscc" class="hide"><?= $lang['register_uscc'] ?>*</label>
                                <input type="text" id="uscc" name="uscc" placeholder="<?= $lang['register_uscc'] ?>*" required class="form-control input-lg c-square">
                            </div>
                        </div>
                        <div id="errorcontainer-contact_name_1" class="errorDiv"></div>
                        <div id="errorcontainer-uscc" class="errorDiv"></div>
                    </div>
                    <div class="form-group">
                        <div class="input-group">
                            <label for="name" class="hide"><?= $lang['register_company_name'] ?>*</label>
                            <input type="text" id="name" name="name" placeholder="<?= $lang['register_company_name'] ?>*" required class="form-control input-lg c-square">
                            <span class="input-group-addon" style="background: none;border: none;padding: 2px;"> </span>
                            <div style="position: relative;">
                                <label for="brand_name" class="hide"><?= $lang['register_brand_name'] ?>*</label>
                                <input type="text" id="brand_name" name="brand_name" placeholder="<?= $lang['register_brand_name'] ?>*" required class="form-control input-lg c-square">
                            </div>
                        </div>
                        <div id="errorcontainer-name" class="errorDiv"></div>
                        <div id="errorcontainer-brand_name" class="errorDiv"></div>
					</div>
                    <div class="form-group">
						<label for="modality_0" class="hide"><?= $lang['register_modality_0'] ?>*</label>
						<select class="form-control input-lg c-square" id="modality_0" name="modality_0" onchange="getBrandModality1(this.value);" required>
                            <option value=""><?= $lang['register_choose'] ?><?= $lang['register_modality_0'] ?>*</option>
						</select>
                        <div id="errorcontainer-modality_0" class="errorDiv"></div>
					</div>
                    <div class="form-group">
						<label for="modality_1" class="hide"><?= $lang['register_modality_1'] ?>*</label>
						<select class="form-control input-lg c-square" id="modality_1" name="modality_1" onchange="getBrandModality2(this.value);" required>
                            <option value=""><?= $lang['register_choose'] ?><?= $lang['register_modality_1'] ?>*</option>
						</select>
                        <div id="errorcontainer-modality_1" class="errorDiv"></div>
					</div>
                    <div class="form-group">
						<label for="modality_2" class="hide"><?= $lang['register_modality_2'] ?>*</label>
						<select class="form-control input-lg c-square" id="modality_2" name="modality_2" onchange="getBrandModality3(this.value);" required>
                            <option value=""><?= $lang['register_choose'] ?><?= $lang['register_modality_2'] ?>*</option>
						</select>
                        <div id="errorcontainer-modality_2" class="errorDiv"></div>
					</div>
                    <div class="form-group">
						<label for="modality_3" class="hide"><?= $lang['register_modality_3'] ?>*</label>
						<select class="form-control input-lg c-square" id="modality_3" name="modality_3" required>
                            <option value=""><?= $lang['register_choose'] ?><?= $lang['register_modality_3'] ?>*</option>
						</select>
                        <div id="errorcontainer-modality_3" class="errorDiv"></div>
					</div>
                    <div class="form-group">
                        <div class="input-group">
                            <label for="mobile" class="hide"><?= $lang['register_mobile'] ?>*</label>
                            <input type="text" id="mobile" name="mobile" placeholder="<?= $lang['register_mobile'] ?>*" required class="form-control input-lg c-square">
                            <span class="input-group-addon" style="background: none;border: none;padding: 2px;"> </span>
                            <div style="position: relative;">
                                <label for="email" class="hide"><?= $lang['register_company_email'] ?>*</label>
                                <input type="email" id="email" name="email" placeholder="<?= $lang['register_company_email'] ?>*" required class="form-control input-lg c-square">
                            </div>
                        </div>
                        <div id="errorcontainer-mobile" class="errorDiv"></div>
                        <div id="errorcontainer-email" class="errorDiv"></div>
					</div>
					<div class="form-group">
                        <div class="input-group">
                            <select class="form-control input-lg c-square" id="international" name="international" required>
                                <option value=""><?= $lang['register_verify_method'] ?>*</option>
                                <option value="verify_mobile"><?= $lang['register_verify_mobile'] ?></option>
                                <option value="verify_email"><?= $lang['register_verify_email'] ?></option>
                            </select>
                            <span class="input-group-addon" style="background: none;border: none;padding: 2px;"> </span>
                            <div style="position: relative;">
                                <input type="text" id="international_verify" name="international_verify" placeholder="<?= $lang['register_veryfication_code'] ?>*" required class="form-control c-square c-theme input-lg">
                                <a href="javascript: VeryficationCodeInternational()" id="international_verify_link" style="display: block; position: absolute; z-index: 10; right: 9px; font-size: 14px; top: 13px;"><?= $lang['register_send_code'] ?></a>
                            </div>
                        </div>
                        <div id="errorcontainer-international" class="errorDiv"></div>
                        <div id="errorcontainer-international_verify" class="errorDiv"></div>
					</div>
                    <div class="form-group">
						<div class="c-checkbox">
							<input type="checkbox" id="terms" name="terms" class="c-check" required>
							<label for="terms" class="c-font-thin c-font-17">
							<span></span>
							<span class="check"></span>
							<span class="box"></span>
                            <?= $lang['register_accept'] ?><a href="terms.html" target="_blank">《<?= $lang['register_chiatai_ol_reg_agree'] ?>》</a></label>
						</div>
                        <div id="errorcontainer-terms" class="errorDiv" style="margin-left: 29px"></div>
					</div>
					<div class="form-group">
						<button type="submit" class="btn c-theme-btn btn-md c-btn-uppercase c-btn-bold c-btn-square c-btn-login"><?= $lang['register_finish_registration'] ?></button>
						<a href="javascript:;" class="c-btn-forgot" data-toggle="modal" data-target="#login-form" data-dismiss="modal"><?= $lang['register_back_login'] ?></a>
					</div>
                    <input type="hidden" id="hidden_brand_code">
				</form>
			</div>
		</div>
	</div>
</div>