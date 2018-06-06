<?php
$scripts = '<script type="text/javascript" src="views/assets/base/js/change-password.js"></script>';
?>

<div class="alert alert-success cpwd-succeed" role="alert">
    修改密码成功！
</div>

<!-- BEGIN: PAGE CONTAINER -->
<div class="c-layout-page">
    <?php include ('component/sub-menu.php'); ?>
    <!-- BEGIN: 修改密码 -->
	<div class="c-content-box c-size-md c-bg-grey-1">
        <div class="container">
            <div class="c-content-feedback-1 c-option-1">
                <div class="row">
                    <div class="col-md-6 col-md-offset-3">
						<div class="c-container c-bg-white c-bg-img-bottom-right" style="background-image:url(views/assets/base/img/content/misc/feedback_box_3.png)">
							<div class="c-content-title-1">
								<h3 class="c-font-uppercase c-font-bold"><?= $lang['change_password_change_password'] ?></h3>
								<div class="c-line-left">
								</div>
								<div class="c-contact">
                                    <form id="change_password_form">
                                        <div class="form-group">
                                            <label class="control-label"><?= $lang['change_password_current_password'] ?></label>
                                            <input type="password" id="old_password" name="old_password" class="form-control c-square c-theme input-lg" placeholder="<?= $lang['change_password_mandatory'] ?>" required>
                                            <div id="errorcontainer-old_password" class="errorDiv"></div>
                                        </div>
                                        <div class="form-group">
                                            <label class="control-label" for="password"><?= $lang['change_password_new_password'] ?></label>
                                            <input type="password" id="password" name="password" class="form-control c-square c-theme input-lg" placeholder="<?= $lang['change_password_mandatory'] ?>" required>
                                            <div id="errorcontainer-password" class="errorDiv"></div>
                                        </div>
                                        <div class="form-group">
                                            <label class="control-label" for="password_confirm"><?= $lang['change_password_confirm_password'] ?></label>
                                            <input type="password" id="password_confirm" name="password_confirm" class="form-control c-square c-theme input-lg" placeholder="<?= $lang['change_password_mandatory'] ?>" required>
                                            <div id="errorcontainer-password_confirm" class="errorDiv"></div>
                                        </div>
                                        <div class="form-group">
                                            <label class="control-label" for="mobile">手机号</label>
                                            <input type="text" id="mobile" name="mobile" class="form-control c-square c-theme input-lg" value="<?= $_SESSION['user_login'] ?>" disabled>
                                        </div>
                                        <div class="form-group">
                                            <label class="control-label">手机验证码</label><br>
                                            <input type="text" placeholder="必填" id="phone_verify" name="phone_verify" class="form-control c-square c-theme input-lg" style="width: 40%; display: inline-block;"> <a href="javascript: VeryficationCodePhone()" id="phone_verify_link" style="display: inline-block;margin-top:-4px;" class="btn c-theme-btn c-btn-uppercase btn-lg c-btn-bold c-btn-square">发送验证码</a>
                                            <div id="errorcontainer-phone_verify" class="errorDiv"></div>
                                        </div>
                                        <div class="form-group">
                                            <button type="submit" class="btn c-theme-btn c-btn-uppercase btn-lg c-btn-bold c-btn-square" onclick="return confirm('<?= $lang['change_password_confirmation'] ?>?');"><?= $lang['change_password_submit'] ?></button>
                                        </div>
                                    </form>
                                </div>
							</div>
						</div>
					</div>
                </div>
            </div>
        </div>
    </div>
</div>

<?php include ('footer.php'); ?>