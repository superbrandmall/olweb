<?php
$scripts = $scripts. '<script type="text/javascript" src="views/assets/base/js/my-contracts.js"></script>';
?>

<!-- BEGIN: PAGE CONTAINER -->
<div class="c-layout-page">
    <?php include ('component/sub-menu.php'); ?>
    <!-- BEGIN: 我的合同 -->
	<div class="c-content-box c-size-md c-bg-white">
		<div class="container">
            <!-- Begin: Title 1 component -->
            <div class="c-content-title-1">
                <h3 class="c-center c-font-uppercase c-font-bold">我的合同</h3>
                <div class="c-line-center c-theme-bg">
                </div>
            </div>
            <!-- End-->
            <div class="table-responsive">
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th>
                                #
                            </th>
                            <th>
                                生成时间
                            </th>
                            <th>
                                编号
                            </th>
                            <th>
                                缩略图
                            </th>
                            <th>
                                商场
                            </th>
                            <th>
                                楼层
                            </th>
                            <th>
                                面积
                            </th>
                            <th>
                                品牌
                            </th>
                            <th colspan="2">
                                操作
                            </th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>
		</div>
	</div>
    <!-- END: 我的合同 -->
</div>

<?php include ('footer.php'); ?>