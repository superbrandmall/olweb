<?php
$scripts = $scripts. '<script type="text/javascript" src="views/assets/base/js/my-msg.js"></script>';
?>

<!-- BEGIN: PAGE CONTAINER -->
<div class="c-layout-page">
    <!-- BEGIN: 消息中心 -->
	<div class="c-content-box c-size-md c-overflow-hide c-bg-grey-1">
		<div class="container">
            <div class="row">
				<div class="col-md-12">
					<div class="c-content-title-1">
						<h3 class="c-font-34 c-font-center c-font-bold c-font-uppercase c-margin-b-30">
						消息中心 </h3>
						<div class="c-line-center c-theme-bg">
						</div>
					</div>
				</div>
			</div>
			<div class="c-content-tab-4 c-opt-5">
                <ul class="nav nav-justified">
                    <li class="unread-list active">
                        <a class="c-font-15" href="javascript: getUnreadMsg();"><i class="fa fa-folder-o"></i> 未读</a>
                    </li>
                    <li class="read-list">
                        <div class="c-separator">
                        </div>
                        <a class="c-font-15" href="javascript: getReadMsg(1);"><i class="fa fa-folder-open-o"></i> 已读</a>
                    </li>
                </ul>
                <div class="tab-content">
                    <div class="row" style="padding: 0 20px;">
                        <div class="tab-pane fade in active" id="msg_content">
                            <div class="col-md-12">
                                <div class="c-content-ver-nav">
                                    <ul class="c-menu"></ul><br>
                                </div>
                            </div>
                        </div>
                        <div id="loadMore-container" class="cbp-l-loadMore-button c-margin-t-60" style="display: none;">
                            <a href="javascript:void(0);" class="cbp-l-loadMore-link btn btn-sm c-btn-square c-btn-border-2x c-btn-dark">
                                <span class="cbp-l-loadMore-defaultText">加载更多...</span>
                            </a><br><br>
                        </div>
                    </div>
                </div>
            </div>            
        </div>
    </div>
    <!-- END: 消息中心 -->
</div>

<?php include ('footer.php'); ?>