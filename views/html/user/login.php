<?php
$scripts = $scripts. '<script type="text/javascript" src="views/assets/base/js/login.js"></script>';
?>

<div class="modal fade c-content-login-form" id="login-form" role="dialog" data-backdrop="static" data-keyboard="false" style="z-index: 10051;">
	<div class="modal-dialog">
        <div class="modal-content c-square" style="padding: 0;">
			<div class="modal-header c-no-border">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
			</div>
			<div class="modal-body">
				<h3 class="c-font-24 c-font-sbold"><?= $lang['login_welcome'] ?></h3>
                <div class="c-content-panel c-no-border c-shadow" style="margin: 30px 0 20px;">
                    <div class="c-body" style="padding-top: 20px;">
                        <div class="c-content-title-1">
                            <h4 class="c-font-bold"><i class="icon-user"></i> <?= $lang['login_not_registered_user'] ?>?</h4><br>
                            <div class="c-line-left">
                            </div>
                            <p><?= $lang['login_after_login'] ?></p>
                            <a href="javascript:;" data-toggle="modal" data-target="#step1" data-dismiss="modal" class="btn c-theme-btn c-btn-uppercase c-btn-bold c-btn-slim c-btn-border-2x c-btn-square c-btn-signup"><?= $lang['login_register_now'] ?></a>
                        </div>
                    </div>
                </div>
                <div class="c-content-panel c-no-border c-shadow">
                    <div class="c-body" style="padding-top: 20px;">
                        <p>
                            <?= $lang['login_verification_login'] ?>
                        </p>

                        <form id="login_form">
                            <div class="form-group">
                                <label for="login_username" class="hide"><?= $lang['login_account'] ?></label>
                                <input type="text" class="form-control input-lg c-square" name="login_username" id="login_username" required placeholder="<?= $lang['login_account'] ?>*">
                                <div id="errorcontainer-login_username" class="errorDiv"></div>
                            </div>

                            <div class="form-group">
                                <label for="login_verify" class="hide"><?= $lang['register_veryfication_code'] ?></label>
                                <div style="position: relative;">
                                    <input type="text" id="login_verify" name="login_verify" placeholder="<?= $lang['register_veryfication_code'] ?>*" required class="form-control c-square c-theme input-lg">
                                    <a href="javascript: VeryficationCodeLogin()" id="login_verify_link" style="display: block; position: absolute; z-index: 10; right: 9px; font-size: 14px; top: 13px;"><?= $lang['register_send_code'] ?></a>
                                </div>
                                <div id="errorcontainer-login_verify" class="errorDiv"></div>
                            </div>

                            <div>
                                <button type="submit" class="btn c-theme-btn btn-md c-btn-uppercase c-btn-bold c-btn-square c-btn-login"><?= $lang['login_login'] ?></button>
                            </div>
                        </form>
                    </div>
                </div>
			</div>
		</div>
	</div>
</div>