<?php
$scripts = $scripts. '<script type="text/javascript" src="views/assets/base/js/password-recovery.js"></script>';
?>

<!-- BEGIN: CONTENT/USER/FORGET-PASSWORD-FORM -->
<div class="modal fade c-content-login-form" id="forget-password-form" role="dialog">
	<div class="modal-dialog">
		<div class="modal-content c-square">
			<div class="modal-header c-no-border">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
			</div>
			<div class="modal-body">
				<h3 class="c-font-24 c-font-sbold"><?= $lang['pw_recover_forgot_password'] ?></h3>
                <div class="c-body">
					<div class="c-content-tab-1 c-theme c-margin-t-30">
						<div class="clearfix">
							<ul class="nav nav-tabs c-font-uppercase c-font-bold">
								<li class="active">
									<a href="#tab_1_1_content" data-toggle="tab"><?= $lang['pw_recover_use_email'] ?></a>
								</li>
								<li>
									<a href="#tab_1_2_content" data-toggle="tab"><?= $lang['pw_recover_use_mobile'] ?></a>
								</li>
							</ul>
						</div>
						<div class="tab-content c-bordered c-padding-lg">
							<div class="tab-pane active" id="tab_1_1_content">
                                <form id="forget_password_email_form">
                                    <div class="form-group">
                                        <label for="forget_email" class="control-label"><?= $lang['pw_recover_email_to_reset_pw'] ?></label>
                                        <input type="email" id="forget_email" name="email" placeholder="<?= $lang['pw_recover_email'] ?>" class="form-control input-lg c-square" required>
                                        <div id="errorcontainer-forget_email" class="errorDiv"></div>
                                    </div>
                                    <div class="form-group">
                                        <label for="email_verify" class="control-label"><?= $lang['pw_recover_email_veryfication_code'] ?></label><br>
                                        <input type="text" placeholder="<?= $lang['pw_recover_mandatory'] ?>" id="email_verify" name="email_verify" class="form-control c-square c-theme input-lg" style="width: 40%; display: inline-block;"> <a href="javascript: VeryficationCode()" id="forget_password_email_verify_link" style="display: inline-block;margin-top:-4px;" class="btn c-theme-btn c-btn-uppercase btn-lg c-btn-bold c-btn-square"><?= $lang['pw_recover_send_code'] ?></a>
                                        <div id="errorcontainer-email_verify" class="errorDiv"></div>
                                    </div>
                                    <div class="form-group">
                                        <label class="control-label" for="email_password"><?= $lang['pw_recover_new_password'] ?></label>
                                        <input type="password" id="email_password" name="email_password" class="form-control c-square c-theme input-lg" placeholder="<?= $lang['pw_recover_mandatory'] ?>" required>
                                        <div id="errorcontainer-email_password" class="errorDiv"></div>
                                    </div>
                                    <div class="form-group">
                                        <label class="control-label" for="email_password_confirm"><?= $lang['pw_recover_confirm_password'] ?></label>
                                        <input type="password" id="email_password_confirm" name="email_password_confirm" class="form-control c-square c-theme input-lg" placeholder="<?= $lang['pw_recover_mandatory'] ?>" required>
                                        <div id="errorcontainer-email_password_confirm" class="errorDiv"></div>
                                    </div>
                                    <div class="form-group">
                                        <button type="submit" class="btn c-theme-btn btn-md c-btn-uppercase c-btn-bold c-btn-square c-btn-login"><?= $lang['pw_recover_submit'] ?></button>
                                    </div>
                                </form>
                            </div>
							<div class="tab-pane" id="tab_1_2_content">
							</div>
						</div>
					</div>
				</div>
                <div class="form-group">
                    <a href="javascript:;" class="c-btn-forgot" data-toggle="modal" data-target="#login-form" data-dismiss="modal"><?= $lang['pw_recover_back_login'] ?></a><br>
                </div>
			</div>
			<div class="modal-footer c-no-border">
				<span class="c-text-account"><?= $lang['pw_recover_not_registered_user'] ?>?</span>
				<a href="javascript:;" data-toggle="modal" data-target="#step1" data-dismiss="modal" class="btn c-btn-dark-1 btn c-btn-uppercase c-btn-bold c-btn-slim c-btn-border-2x c-btn-square c-btn-signup"><?= $lang['pw_recover_register_now'] ?></a>
			</div>
		</div>
	</div>
</div>
<!-- END: CONTENT/USER/FORGET-PASSWORD-FORM -->