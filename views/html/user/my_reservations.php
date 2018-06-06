<?php
    $scripts = $scripts. '<script type="text/javascript" src="views/assets/base/js/my-reservations.js"></script>';
?>

<div class="alert alert-success reserve-succeed" role="alert">
    预约成功！
</div>

<!-- BEGIN: PAGE CONTAINER -->
<div class="c-layout-page">
    <!-- BEGIN: 标题 -->
	<div class="c-layout-breadcrumbs-1 c-fonts-uppercase c-fonts-bold">
		<div class="container">
			<div class="c-page-title c-pull-left">
				<h3 class="c-font-uppercase c-font-bold">我的预约</h3>
			</div>
			<ul class="c-page-breadcrumbs c-theme-nav c-pull-right c-fonts-regular">
				<li>
					<a href="/"><?= $lang['search_home'] ?></a>
				</li>
				<li>
					/
				</li>
				<li class="c-state_active">
					我的预约
				</li>
			</ul>
		</div>
	</div>
	<!-- END: 标题 -->
    <!-- BEGIN: 我的预约 -->
	<div class="c-content-box c-size-md c-no-padding" style="margin-top: 20px;">
		<div class="container">
            <div class="alert alert-info" style="display: block;" role="alert"><i class="icon-info"></i> 以下是您的预约记录, 感谢您对正大Online Leasing的支持和关注。</div>
            <div class="col-md-3">
                <div class="c-body">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="panel panel-default">
                                <div class="panel-heading">
                                    <i class="icon-call-in"></i> 租赁热线电话
                                </div>
                                <ul class="list-group">
                                   <li class="list-group-item">
                                       正大广场陆家嘴购物中心: <a href="tel:+862168877888">(021) 6887-7888*6666</a>
                                   </li>
                                   <li class="list-group-item">
                                       正大乐城徐汇购物中心: <a href="tel:+862161956888">(021) 6195-6888</a>
                                   </li>
                                   <li class="list-group-item">
                                       正大乐城宝山购物中心: <a href="tel:+862136500999">(021) 3650-0999*8802</a>
                                   </li>
                               </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-9">
                <!-- Begin: Title 1 component -->
                <div class="c-content-title-1">
                    <h3 class="c-font-uppercase c-font-bold">我的预约</h3>
                    <div class="c-line-left c-theme-bg">
                    </div>
                </div>
                <!-- End-->
                <div class="c-content-accordion-1 c-accordion-grey">
                    <div class="panel-group" id="reserve_lists" role="tablist"></div>
                </div>
                <br>
                <center>
                    <ul class="c-content-pagination c-theme"></ul>
                </center>
            </div>
		</div>
	</div>
    <br><br><br><br>
    <!-- END: 我的预约 -->
</div>

<?php include ('footer.php'); ?>