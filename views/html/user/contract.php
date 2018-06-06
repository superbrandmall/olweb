<?php
$scripts = $scripts. '<script type="text/javascript" src="views/assets/base/js/contract.js"></script>';

?>

<!-- BEGIN: PAGE CONTAINER -->
<div class="c-layout-page">
    <!-- BEGIN: 标题 -->
	<div class="c-layout-breadcrumbs-1 c-fonts-uppercase c-fonts-bold">
		<div class="container">
			<div class="c-page-title c-pull-left">
				<h3 class="c-font-uppercase c-font-bold">合同详情</h3>
			</div>
			<ul class="c-page-breadcrumbs c-theme-nav c-pull-right c-fonts-regular">
				<li>
					<a href="/">首页</a>
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
					<a href="my-contracts">我的合同</a>
				</li>
				<li>
					/
				</li>
				<li class="c-state_active">
					合同详情
				</li>
			</ul>
		</div>
	</div>
	<!-- END: 标题 -->
    <!-- BEGIN: 合同详情 -->
    <div class="c-content-box c-size-md c-bg-grey-1" style="margin-bottom: 0;">
        <div class="container">
            <div class="c-content-feedback-1 c-option-1">
                <div class="row">
                    <div class="col-md-12">
                        <div class="c-container c-bg-grey-1 c-bg-img-bottom-right" style="background-image:url(views/assets/base/img/content/misc/feedback_box_3.png);">
                            <div class="c-content-title-1">
                                <h3 class="c-font-uppercase c-font-bold">合同详情</h3>
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
                </div>
            </div>
        </div>
    </div>
    <!-- END: 合同详情 -->
    <div class="c-content-box c-size-md c-bg-white">
		<div class="container">
            <div class="c-content-feedback-1 c-option-1">
                <div class="row">
                    <div class="col-md-6">
                        <div class="c-container c-bg-grey-1 c-bg-img-bottom-right" style="background-image:url(views/assets/base/img/content/misc/feedback_box_3.png)">
                            <div class="c-content-title-1">
								<h3 class="c-font-uppercase c-font-bold">上传合同</h3>
								<div class="c-line-left">
								</div>
								<p class="c-font-lowercase">
                                    请加盖公章后上传合同扫描件
								</p><br>
								<div class="form-group">
                                    <input type="hidden" name="MAX_FILE_SIZE" value="9000000">
                                    <input type="file" id="contract_to_upload" name="contract_to_upload" style="clear: both;">
                                </div>
							</div>
                        </div>
                        <div class="c-container c-bg-grey-1 c-bg-img-bottom-right" style="background-image:url(views/assets/base/img/content/misc/feedback_box_3.png)">
                            <div class="c-content-title-1">
								<h3 class="c-font-uppercase c-font-bold">邮寄信息</h3>
								<div class="c-line-left">
								</div>
								<div class="form-group">
                                    <select class="form-control input-lg c-square" id="courier" name="courier" required>
                                        <option value="">请选择快递公司*</option>
                                        <option value="0">顺丰</option>
                                        <option value="1">中通</option>
                                        <option value="2">圆通</option>
                                    </select>
                                    <div id="errorcontainer-courier" class="errorDiv"></div>
                                </div>
							</div>
                            <div class="form-group">
                                <label for="tracking_no" class="hide">请填写快递单号*</label>
                                <input type="text" id="tracking_no" name="tracking_no" placeholder="请填写快递单号*" required class="form-control input-lg c-square">
                                <div id="errorcontainer-tracking_no" class="errorDiv"></div>
                            </div>
                            <button type="submit" class="btn c-theme-btn c-btn-uppercase btn-lg c-btn-bold c-btn-square">提交</button>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="c-content-title-1 c-theme c-title-md">
                            <h3 class="c-font-bold c-font-uppercase">文件下载</h3>
                        </div>
                        <div class="tab-content">
                            <ul class="c-content-recent-posts-1">
                                <li>
                                    <div class="c-image">
                                        <i class="fa fa-file-pdf-o fa-3x"></i>
                                    </div>
                                    <div class="c-post">
                                        <a href="#!" class="c-title">
                                        合同 </a>
                                        <div class="c-date">
                                            407Kb
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div class="c-image">
                                        <i class="fa fa-file-pdf-o fa-3x"></i>
                                    </div>
                                    <div class="c-post">
                                        <a href="#!" class="c-title">
                                        楼层位置图 </a>
                                        <div class="c-date">
                                            1.5Mb
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div class="c-image">
                                        <i class="fa fa-file-zip-o fa-3x"></i>
                                    </div>
                                    <div class="c-post">
                                        <a href="#!" class="c-title">
                                        房型图 </a>
                                        <div class="c-date">
                                            3.3Mb
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div class="c-image">
                                        <i class="fa fa-file-image-o fa-3x"></i>
                                    </div>
                                    <div class="c-post">
                                        <a href="#!" class="c-title">
                                        附件 </a>
                                        <div class="c-date">
                                            0.2Mb
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div class="c-image">
                                        <i class="fa fa-file-image-o fa-3x"></i>
                                    </div>
                                    <div class="c-post">
                                        <a href="#!" class="c-title">
                                        附件 </a>
                                        <div class="c-date">
                                            0.6Mb
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
		</div>
	</div>
</div>

<?php include ('footer.php'); ?>