<?php
$scripts = $scripts. '<script type="text/javascript" src="views/assets/plugins/summernote/summernote.min.js"></script>'
    . '<script type="text/javascript" src="views/assets/base/js/contract-order.js"></script>'
    . '<script type="text/javascript" src="views/assets/plugins/summernote/lang/summernote-zh-CN.js"></script>';

?>
<link href="views/assets/plugins/summernote/summernote.css" rel="stylesheet">
<style>
    .btn.btn-sm {
        padding: 5px 10px;
    }
    .btn-default {
        border-color: #ccc;
        color: #333;
    }
    .btn {
        font-size: 12px;
    }
    .btn.btn-sm > i {
        font-size: 12px;
    }
    .modal-body {
        padding: 15px;
    }
    .modal-header {
        border-bottom: 1px solid #e5e5e5;
        padding: 15px;
    }
    .btn-default.btn-no-focus:hover, 
    .btn-default:hover, 
    .btn-default.btn-no-focus:active, 
    .btn-default:active, 
    .btn-default.active, 
    .open > .btn-default.dropdown-toggle {
        color: #333;
        background: #e6e6e6;
        border-color: #adadad;
    }
    .modal {
        z-index: 1050;
    }
    .modal-header > .close {
        margin-top: -2px;
    }
    .close {
        color: #000;
        font-size: 21px;
        font-weight: bold;
        opacity: 0.2;
    }
    .dropdown-menu {
        border: 1px solid rgba(0, 0, 0, 0.15);
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.176);
    }
</style>

<!-- BEGIN: PAGE CONTAINER -->
<div class="c-layout-page">
    <!-- BEGIN: 标题 -->
	<div class="c-layout-breadcrumbs-1 c-fonts-uppercase c-fonts-bold">
		<div class="container">
			<div class="c-page-title c-pull-left">
				<h3 class="c-font-uppercase c-font-bold"><?= $lang['preview_contract_preview'] ?></h3>
			</div>
			<ul class="c-page-breadcrumbs c-theme-nav c-pull-right c-fonts-regular">
				<li>
					<a href="/"><?= $lang['preview_home'] ?></a>
				</li>
                <li>
					/
				</li>
                <li>
					<a href="my-info">我的信息</a>
				</li>
                <li>
					/
				</li>
                <li>
					<a href="my-offer">我的出价</a>
				</li>
				<li>
					/
				</li>
				<li class="c-state_active">
					<?= $lang['preview_contract_preview'] ?>
				</li>
			</ul>
		</div>
	</div>
	<!-- END: 标题 -->
    <!-- BEGIN: 合同预览 -->
    <div class="c-content-box c-size-md c-bg-grey-1">
        <div class="container">
            <div class="c-content-feedback-1 c-option-1">
                <div class="row">
                    <div class="col-md-12">
                        <div class="c-container c-bg-grey-1 c-bg-img-bottom-right" style="background-image:url(views/assets/base/img/content/misc/feedback_box_3.png)">
                            <div class="c-content-title-1">
                                <h3 class="c-font-uppercase c-font-bold"><?= $lang['preview_contract_preview'] ?></h3>
                                <div class="c-line-left">
                                </div>
                                <object data="" type="application/pdf" width="100%" height="800px"> 
                                    <p>您的浏览器没有安装PDF插件
                                     您可以 <a href="#">点此下载</a>合同订单页
                                    </p>
                                </object>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <center>
                            <button id="submit" onclick="return confirm('出价合同提交后将无法修改，是否确认提交?');" class="btn btn-primary c-btn-uppercase btn-md c-btn-square"><i class="fa fa-check" aria-hidden="true"></i> <?= $lang['preview_agree'] ?></button><br><br>
                            <a href="javascript: void(0);" data-toggle="modal" data-target="#business_suggestion" id="business_suggestion_link" class="btn c-theme-btn c-btn-uppercase btn-md c-btn-square" style="position: relative;"><i class="fa fa-briefcase" aria-hidden="true"></i> <?= $lang['preview_business_disagree'] ?></a>
                            <a href="javascript: void(0);" data-toggle="modal" data-target="#legal_suggestion" id="legal_suggestion_link" class="btn c-theme-btn c-btn-uppercase btn-md c-btn-square" style="position: relative;"><i class="fa fa-gavel" aria-hidden="true"></i> <?= $lang['preview_legal_disagree'] ?></a>
                        </center>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- END: 合同预览 -->
    <div id="business_suggestion" class="modal fade" role="dialog">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title">请输入您对合同的商务建议</h4>
                </div>
                <div class="modal-body">
                    <form id="business_suggestion_form">
                        <div id="business_suggestion_body" tabindex="0"></div>
                        <input type="hidden" id="business_body" name="business_body" value="">
                        <div id="errorcontainer-business_suggestion_body" class="errorDiv"></div>
                        <div class="form-info">
                            <center>
                                <button type="submit" class="btn btn-success c-btn-uppercase c-btn-square"><i class="fa fa-floppy-o" aria-hidden="true"></i> 保存</button>
                            </center>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    
    <div id="legal_suggestion" class="modal fade" role="dialog">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title">请输入您对合同的法务建议</h4>
                </div>
                <div class="modal-body">
                    <form id="legal_suggestion_form">
                        <div id="legal_suggestion_body" tabindex="0"></div>
                        <input type="hidden" id="legal_body" name="legal_body" value="">
                        <div id="errorcontainer-legal_suggestion_body" class="errorDiv"></div>
                        <div class="form-info">
                            <center>
                                <button type="submit" class="btn btn-success c-btn-uppercase c-btn-square"><i class="fa fa-floppy-o" aria-hidden="true"></i> 保存</button>
                            </center>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>

<?php include ('footer.php'); ?>