<?php
$scripts = $scripts. '<script type="text/javascript" src="views/assets/base/js/change-info.js"></script>';

include_once 'models/user/ChangeInfo.class.php';
$controller = new ChangeInfo();
?>

<!-- BEGIN: PAGE CONTAINER -->
<div class="c-layout-page">
    <?php include ('component/sub-menu.php'); ?>
    <!-- BEGIN: 修改信息 -->
	<div class="c-content-box c-size-lg c-bg-grey-1">
        <div class="container">
            <div class="c-content-feedback-1 c-option-1">
                <div class="row">
                    <div class="col-md-6">
						<div class="c-container c-bg-white c-bg-img-bottom-right" style="background-image:url(views/assets/base/img/content/misc/feedback_box_3.png)">
							<div class="c-content-title-1">
								<h3 class="c-font-uppercase c-font-bold">修改手机号码</h3>
								<div class="c-line-left">
								</div>
								<div class="c-contact">
                                    <form id="change_mobile_form">
                                        <div class="form-group">
                                            <label class="control-label">原手机号</label>
                                            <input type="text" value="<?= $controller->_getMobileEmail_action()[0]->mobile ?>" class="form-control c-square c-theme input-lg" disabled>
                                        </div>
                                        <div class="form-group">
                                            <label class="control-label" for="contact_phone_1">新手机号</label>
                                            <input type="text" id="contact_phone_1" name="contact_phone_1" class="form-control c-square c-theme input-lg" value="" placeholder="必填" required>
                                            <div id="errorcontainer-contact_phone_1" class="errorDiv"></div>
                                        </div>
                                        <div class="form-group">
                                            <label class="control-label">手机验证码</label><br>
                                            <input type="text" placeholder="必填" id="phone_verify" name="phone_verify" class="form-control c-square c-theme input-lg" style="width: 40%; display: inline-block;"> <a href="javascript: VeryficationCodePhone()" id="phone_verify_link" style="display: inline-block;margin-top:-4px;" class="btn c-theme-btn c-btn-uppercase btn-lg c-btn-bold c-btn-square">发送验证码</a>
                                            <div id="errorcontainer-phone_verify" class="errorDiv"></div>
                                        </div>
                                        <div class="form-group">
                                            <button type="submit" class="btn c-theme-btn c-btn-uppercase btn-lg c-btn-bold c-btn-square" onclick="return confirm('您将更改账户绑定的手机号码，是否确认提交?');">提交</button>
                                        </div>
                                    </form>
                                </div>
							</div>
						</div>
					</div>
                    <div class="col-md-6">
						<div class="c-container c-bg-white c-bg-img-bottom-right" style="background-image:url(views/assets/base/img/content/misc/feedback_box_3.png)">
							<div class="c-content-title-1">
								<h3 class="c-font-uppercase c-font-bold">修改公司邮箱</h3>
								<div class="c-line-left">
								</div>
								<div class="c-contact">
                                    <form id="change_email_form">
                                        <div class="form-group">
                                            <label class="control-label">原邮箱地址</label>
                                            <input type="text" value="<?= $controller->_getMobileEmail_action()[0]->email ?>" class="form-control c-square c-theme input-lg" disabled>
                                        </div>
                                        <div class="form-group">
                                            <label class="control-label" for="contact_phone_1">新邮箱地址</label>
                                            <input type="email" id="email" name="email" class="form-control c-square c-theme input-lg" value="" placeholder="必填" required>
                                            <div id="errorcontainer-email" class="errorDiv"></div>
                                        </div>
                                        <div class="form-group">
                                            <label class="control-label">邮箱验证码</label><br>
                                            <input type="text" placeholder="必填" id="email_verify" name="email_verify" class="form-control c-square c-theme input-lg" style="width: 40%; display: inline-block;"> <a href="javascript: VeryficationCodeEmail()" id="email_verify_link" style="display: inline-block;margin-top:-4px;" class="btn c-theme-btn c-btn-uppercase btn-lg c-btn-bold c-btn-square">发送验证码</a>
                                            <div id="errorcontainer-email_verify" class="errorDiv"></div>
                                        </div>
                                        <div class="form-group">
                                            <button type="submit" class="btn c-theme-btn c-btn-uppercase btn-lg c-btn-bold c-btn-square" onclick="return confirm('您将更改账户绑定的公司邮箱，是否确认提交?');">提交</button>
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