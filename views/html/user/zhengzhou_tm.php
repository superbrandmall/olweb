<?php
$scripts = $scripts. '<script src="views/assets/plugins/chart.min.js" type="text/javascript"></script>'
    . '<script type="text/javascript" src="views/assets/base/js/zhengzhou-tm.js"></script>';
?>

<!-- BEGIN: PAGE CONTAINER -->
<div class="c-layout-page">
    <!-- BEGIN: 标题 -->
	<div class="c-layout-breadcrumbs-1 c-fonts-uppercase c-fonts-bold">
		<div class="container">
			<div class="c-page-title c-pull-left">
				<h3 class="c-font-uppercase c-font-bold"><span class="mall-name"></span></h3>
			</div>
			<ul class="c-page-breadcrumbs c-theme-nav c-pull-right c-fonts-regular">
				<li>
					<a href="/"><?= $lang['floor_home'] ?></a>
				</li>
				<li>
					/
				</li>
				<li class="c-state_active">
                    <span class="mall-name"></span>
				</li>
			</ul>
		</div>
	</div>
    
    <!-- BEGIN: video -->
    <div class="c-content-box animated animated fadeInRight" style="background-color: #000; margin-bottom: 0; overflow: hidden; z-index: 1;">
		<video loop="loop" autoplay="true" width="100%"></video>
    </div>
    <!-- END: video -->
    
    <!-- BEGIN: 项目介绍 -->
    <div class="c-content-box c-size-md c-bg-dark animated animated fadeInLeft" style="margin-bottom: 0; z-index: 1;">
		<div class="container">
            <div class="col-md-12">
                <div class="c-content-title-1">
                    <h3 class="c-font-uppercase c-font-bold c-font-white"><?= $lang['floor_mall_desc'] ?></h3>
                    <div class="c-content-bar-1 c-opt-1">
                        <blockquote id="mall_desc" class="c-theme-border c-font-white" style="text-align: left;">
                            <p></p>
                        </blockquote>
                        <a href="requirement" class="btn btn-md c-btn-square c-theme-btn c-btn-uppercase c-btn-bold c-margin-r-40"><i class="icon-map"></i> <?= $lang['floor_shops'] ?></a>
                    </div>
                </div>
            </div>
		</div>
	</div>
    <!-- END: 项目介绍 -->
    
    <div class="c-content-box c-size-md c-bg-grey-1 animated fadeInDown" style="margin-bottom: 0; z-index: 1;">
		<div class="container">
			<div class="c-content-bar-2 c-opt-1">
				<div class="row">
					<div class="col-md-6">
                        <div class="c-content-title-1">
							<h3 class="c-font-uppercase c-font-bold flowdata">客流量 201703-201802</h3>
							<div class="widget-content">
                                <canvas id="area-chart"></canvas>
                            </div>
						</div>
					</div>
                    <div class="col-md-6">
                        <div class="c-content-title-1">
                            <h3 class="c-font-uppercase c-font-bold flowdata">销售额 201701-201712</h3>
                            <div class="widget-content">
                                <canvas id="bar-chart"></canvas>
                            </div>
                        </div>
                    </div>
				</div>
			</div>
		</div>
	</div>
    
    <div class="c-content-box c-size-md c-bg-white animated fadeInLeft" style="margin-bottom: 0; z-index: 1;">
		<div class="container">
            <div class="col-md-6 col-md-offset-3">
                <div class="c-content-title-1">
                    <h3 class="c-font-uppercase c-font-bold text-center"><?= $lang['floor_modality_shop_proportion'] ?></h3>
                    <div class="widget-content">
                        <canvas id="pie-chart"></canvas><br>
                    </div>
                </div>
            </div>
		</div>
	</div>
    
    <div class="c-content-box c-size-lg c-bg-parallax" style="background-image: url(views/assets/base/img/content/mall/zhengzhou-tm/zz-4.jpg); margin-bottom: 0; z-index: 1;">
		<div class="container">
			<div class="c-content-counter-1">
				<div class="c-content-title-1">
					<h3 class="c-center c-font-uppercase c-font-bold">郑州概况</h3>
					<div class="c-line-center">
					</div>
				</div>
                <div class="row c-margin-t-60">
                    <blockquote class="c-theme-border" style="text-align: left;">
                        <p>郑州地处中国地理中心 是全国重要的铁路、航空、高速公路、店里、邮政电信主枢纽城市，中国中部地区重要的工业城市。得益于其独特的地理位置，郑州也是历史上著名商埠，至今仍是中部地区重要的物资集散地，每年都会举办全国性、区域性大型商贸活动。</p>
                    </blockquote>
                </div>
				<div class="row c-margin-t-60">
					<div class="col-md-4">
                        <h4 class="c-title c-first c-font-uppercase c-font-bold">2016年常住人口</h4>
						<div class="c-counter c-bg-red c-bg-red-font" data-counter="counterup">
                            972
						</div>
						<p class="c-content c-opacity-08">
							万人
						</p>
					</div>
					<div class="col-md-4">
                        <h4 class="c-title c-font-uppercase c-font-bold">2016年人均消费支出</h4>
						<div class="c-counter c-bg-red c-bg-red-font" data-counter="counterup">
							23,210
						</div>
						<p class="c-content c-opacity-08">
							元
						</p>
					</div>
					<div class="col-md-4">
                        <h4 class="c-title c-font-uppercase c-font-bold">2016年旅游产值超过</h4>
						<div class="c-counter c-bg-red c-bg-red-font" data-counter="counterup">
							1,053
						</div>
						<p class="c-content c-opacity-08">
							亿元
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
    
    <!-- BEGIN: 4楼 -->
	<div id="f4" class="c-content-box c-bg-parallax c-content-feature-16" style="background-image: url(views/assets/base/img/content/mall/zhengzhou-tm/4F.jpg); margin-bottom: 0;">
		<div class="container">
			<div class="row">
                <div class="col-md-offset-7 col-md-5 col-xs-12">
                    <div class="c-feature-16-container c-bg-white c-bg-opacity-5 animated fadeInLeft">
                        <div class="c-feature-16-line c-theme-bg"></div>
                        <h2 class="c-feature-16-title c-font-bold c-font-uppercase">4F 动感生活</h2>
                        <p class="c-feature-16-desc">
                            <?= $lang['floor_modality_shop_proportion'] ?>
                        </p>
                        <div id="proportion_f4"></div>
                        <a class="c-feature-15-btn btn c-btn btn-lg c-theme-btn c-font-uppercase c-font-bold c-btn-square" href="views/html/user/component/floor-plan-zhengzhou-tm.php?m=<?= $zz_tm?>&f=4" data-toggle="modal" data-target="#floor_map_F_zhengzhou">打开楼层图</a>
                    </div>
                </div>
            </div>
		</div>
	</div>
	<!-- END: 4楼 -->
    <!-- BEGIN: 3楼 -->
	<div id="f3" class="c-content-box c-bg-parallax c-content-feature-16" style="background-image: url(views/assets/base/img/content/mall/zhengzhou-tm/3F.jpg); margin-bottom: 0;">
		<div class="container">
            <div class="row">
                <div class="col-md-5 col-xs-12">
                    <div class="c-feature-16-container c-bg-dark c-bg-opacity-4 animated fadeInRight">
                        <div class="c-feature-16-line c-theme-bg"></div>
                        <h2 class="c-feature-16-title c-font-bold c-font-uppercase c-font-white">3F 家庭荟萃</h2>
                        <p class="c-feature-16-desc c-font-grey">
                            <?= $lang['floor_modality_shop_proportion'] ?>
                        </p>
                        <div id="proportion_f3"></div>
                        <a class="c-feature-15-btn btn c-btn btn-lg c-theme-btn c-font-uppercase c-font-bold c-btn-square" href="views/html/user/component/floor-plan-zhengzhou-tm.php?m=<?= $zz_tm?>&f=3" data-toggle="modal" data-target="#floor_map_F_zhengzhou">打开楼层图</a>
                    </div>
                </div>
            </div>
		</div>
	</div>
	<!-- END: 3楼 -->
    <!-- BEGIN: 2楼 -->
	<div id="f2" class="c-content-box c-bg-parallax c-content-feature-16" style="background-image: url(views/assets/base/img/content/mall/zhengzhou-tm/2F.jpg); margin-bottom: 0;">
		<div class="container">
			<div class="row">
                <div class="col-md-offset-7 col-md-5 col-xs-12">
                    <div class="c-feature-16-container c-bg-white c-bg-opacity-5 animated fadeInLeft">
                        <div class="c-feature-16-line c-theme-bg"></div>
                        <h2 class="c-feature-16-title c-font-bold c-font-uppercase">2F 欢乐世界</h2>
                        <p class="c-feature-16-desc">
                            <?= $lang['floor_modality_shop_proportion'] ?>
                        </p>
                        <div id="proportion_f2"></div>
                        <a class="c-feature-15-btn btn c-btn btn-lg c-theme-btn c-font-uppercase c-font-bold c-btn-square" href="views/html/user/component/floor-plan-zhengzhou-tm.php?m=<?= $zz_tm?>&f=2" data-toggle="modal" data-target="#floor_map_F_zhengzhou">打开楼层图</a>
                    </div>
                </div>
            </div>
		</div>
	</div>
	<!-- END: 2楼 -->
    <!-- BEGIN: 1楼 -->
	<div id="f1" class="c-content-box c-bg-parallax c-content-feature-16" style="background-image: url(views/assets/base/img/content/mall/zhengzhou-tm/1F.jpg); margin-bottom: 0;">
		<div class="container">
			<div class="row">
                <div class="col-md-5 col-xs-12">
                    <div class="c-feature-16-container c-bg-dark c-bg-opacity-4 animated fadeInRight">
                        <div class="c-feature-16-line c-theme-bg"></div>
                        <h2 class="c-feature-16-title c-font-bold c-font-uppercase c-font-white">1F 运动时尚</h2>
                        <p class="c-feature-16-desc c-font-grey">
                            <?= $lang['floor_modality_shop_proportion'] ?>
                        </p>
                        <div id="proportion_f1"></div>
                        <a class="c-feature-15-btn btn c-btn btn-lg c-theme-btn c-font-uppercase c-font-bold c-btn-square" href="views/html/user/component/floor-plan-zhengzhou-tm.php?m=<?= $zz_tm?>&f=1" data-toggle="modal" data-target="#floor_map_F_zhengzhou">打开楼层图</a>
                    </div>
                </div>
            </div>
		</div>
	</div>
	<!-- END: 1楼 -->
    <!-- BEGIN: B1楼 -->
	<div id="fb1" class="c-content-box c-bg-parallax c-content-feature-16" style="background-image: url(views/assets/base/img/content/mall/zhengzhou-tm/B1F.jpg); margin-bottom: 0;">
		<div class="container">
			<div class="row">
                <div class="col-md-offset-7 col-md-5 col-xs-12">
                    <div class="c-feature-16-container c-bg-white c-bg-opacity-5 animated fadeInLeft">
                        <div class="c-feature-16-line c-theme-bg"></div>
                        <h2 class="c-feature-16-title c-font-bold c-font-uppercase">B1F 美食街区</h2>
                        <p class="c-feature-16-desc">
                            <?= $lang['floor_modality_shop_proportion'] ?>
                        </p>
                        <div id="proportion_fb1"></div>
                        <a class="c-feature-15-btn btn c-btn btn-lg c-theme-btn c-font-uppercase c-font-bold c-btn-square" href="views/html/user/component/floor-plan-zhengzhou-tm.php?m=<?= $zz_tm?>&f=0" data-toggle="modal" data-target="#floor_map_F_zhengzhou">打开楼层图</a>
                    </div>
                </div>
            </div>
		</div>
	</div>
	<!-- END: B1楼 -->
    
    <div class="c-content-box c-size-lg c-bg-grey-1" style="margin-bottom: 0; z-index: 1;">
		<div class="container">
			<div class="">
				<div class="row">
					<div class="col-md-6">
						<div class="c-content-feature-5">
							<div class="c-content-title-1">
                                <h3 class="c-left c-font-dark c-font-uppercase c-font-bold">高铁<br/><small>会客厅</small></h3>
								<div class="c-line-left c-bg-blue-3">
								</div>
							</div>
							<div class="c-text c-font-16 c-font-sbold c-font-uppercase">
								 新郑机场，高铁地铁零换乘
							</div>
							<img class="c-photo img-responsive" style="width: 310px" src="views/assets/base/img/content/mall/zhengzhou-tm/zz-2.jpg" alt=""/>
						</div>
					</div>
					<div class="col-md-6">
						<div class="c-content-feature-5">
							<div class="c-content-title-1">
                                <h3 class="c-left c-font-dark c-font-uppercase c-font-bold">交通<br/><small>枢纽地</small></h3>
								<div class="c-line-left c-theme-bg">
								</div>
							</div>
							<div class="c-text c-font-16 c-font-sbold c-font-uppercase c-bg-red c-font-white">
								 高铁、地铁、普铁、城铁，"四铁"联运新时代
							</div>
							<img class="c-photo img-responsive" style="width: 310px" src="views/assets/base/img/content/mall/zhengzhou-tm/zz-3.jpg" alt=""/>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
        
    <!-- BEGIN: 联系方式 -->
    <div class="c-content-box animated animated fadeInRight" style="margin-bottom: 0; z-index: 1;">
		<div class="container">
			<div class="c-content-contact-1 c-opt-1">
				<div class="row" data-auto-height=".c-height">
					<div class="col-sm-8 c-desktop">
					</div>
					<div class="col-sm-4">
						<div class="c-body">
							<div class="c-section">
                                <h3>招商进行中</h3>
							</div>
							<div class="c-section">
								<div class="c-content-label c-font-uppercase c-font-bold c-theme-bg">
									<?= $lang['floor_mall_location'] ?>
								</div>
								<div>
									<span id="street"></span>
								</div>
                                <br>
                                <div class="c-content-label c-font-uppercase c-font-bold c-theme-bg">
									<?= $lang['floor_construction_floor_area'] ?>
								</div>
								<div>
									<span id="gross_floor_area"></span>m<sup>2</sup>
								</div>
                                <br>
                                <div class="c-content-label c-font-uppercase c-font-bold c-theme-bg">
									<?= $lang['floor_leasable_area'] ?>
								</div>
								<div>
									<span id="leasing_area"></span>m<sup>2</sup>
								</div>
                                <br>
                                <div class="c-content-label c-font-uppercase c-font-bold c-theme-bg">
									商户数
								</div>
								<div>
									<span>约109家</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
            <div id="gmapbg" class="c-content-contact-1-gmap">
		</div>
		</div>
	</div>
	<!-- END: 联系方式 -->
    
    <div class="c-content-box c-size-md c-bg-white animated fadeInDown" style="margin-bottom: 0; z-index: 1;">
		<div class="container">
			<div class="c-content-bar-2 c-opt-1">
				<div class="row">
					<div class="col-md-6">
                        <div class="c-content-title-1">
							<h3 class="c-font-uppercase c-font-bold">便利的交通</h3>
							<ul id="traffics" class="c-content-list-1 c-theme c-separator-dot c-square"></ul>
						</div>
					</div>
                    <div class="col-md-6">
                        <div class="c-content-title-1">
							<h3 class="c-font-uppercase c-font-bold">周边概况</h3>
                            <ul class="c-content-list-1 c-theme c-separator-dot c-square">
                                <li class="c-bg-before-red">位于郑东新区心怡路与东站北街，紧邻高铁站3公里内约60万人</li>
                                <li class="c-bg-before-red">住宅人口约37.8万人;企事业单位及在校师生约3万;写字楼商务白领约19.2万人</li>
                                <li class="c-bg-before-red">周边聚集升龙广场、亚新广场、汇艺时代广场、永和宇宙星、绿地中心等商业体</li>
                            </ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
    
    <a id="f4_g" href="views/html/user/component/floor-plan-zhengzhou-tm.php?f=4" data-toggle="modal" data-target="#floor_map_F_zhengzhou" class="hidden-xs hidden-sm hidden-md floor-guide"><span class="badge c-bg-white c-font-red c-font-bold">4F</span><img src="views/assets/base/img/content/floor-plan/zhengzhou-tm/4F.png" class="img-responsive" alt="" /></a>
    <a id="f3_g" href="views/html/user/component/floor-plan-zhengzhou-tm.php?f=3" data-toggle="modal" data-target="#floor_map_F_zhengzhou" class="hidden-xs hidden-sm hidden-md floor-guide"><span class="badge c-bg-white c-font-red c-font-bold">3F</span><img src="views/assets/base/img/content/floor-plan/zhengzhou-tm/3F.png" class="img-responsive" alt="" /></a>
    <a id="f2_g" href="views/html/user/component/floor-plan-zhengzhou-tm.php?f=2" data-toggle="modal" data-target="#floor_map_F_zhengzhou" class="hidden-xs hidden-sm hidden-md floor-guide"><span class="badge c-bg-white c-font-red c-font-bold">2F</span><img src="views/assets/base/img/content/floor-plan/zhengzhou-tm/2F.png" class="img-responsive" alt="" /></a>
    <a id="f1_g" href="views/html/user/component/floor-plan-zhengzhou-tm.php?f=1" data-toggle="modal" data-target="#floor_map_F_zhengzhou" class="hidden-xs hidden-sm hidden-md floor-guide"><span class="badge c-bg-white c-font-red c-font-bold">1F</span><img src="views/assets/base/img/content/floor-plan/zhengzhou-tm/1F.png" class="img-responsive" alt="" /></a>
    <a id="fb1_g" href="views/html/user/component/floor-plan-zhengzhou-tm.php?f=0" data-toggle="modal" data-target="#floor_map_F_zhengzhou" class="hidden-xs hidden-sm hidden-md floor-guide"><span class="badge c-bg-white c-font-red c-font-bold">B1F</span><img src="views/assets/base/img/content/floor-plan/zhengzhou-tm/0F.png" class="img-responsive" alt="" /></a>
    
    <div id="floor_map_F_zhengzhou" class="modal fade" role="dialog">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-body"></div>
            </div>
        </div>
    </div>
</div>

<?php include ('footer.php'); ?>