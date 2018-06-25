<?php
$scripts = $scripts. '<script type="text/javascript" src="views/assets/base/js/xuhui-tm.js"></script>';
?>
<link href="https://vjs.zencdn.net/7.0.3/video-js.css" rel="stylesheet">

<!-- BEGIN: PAGE CONTAINER -->
<div class="c-layout-page">
    <!-- BEGIN: 标题 -->
	<div class="c-layout-breadcrumbs-1 c-fonts-uppercase c-fonts-bold">
		<div class="container">
			<div class="c-page-title c-pull-left">
				<h3 class="c-font-bold"><span class="mall-name"></span></h3>
			</div>
			<ul class="c-page-breadcrumbs c-theme-nav c-pull-right c-fonts-regular">
				<li>
					<a href="/"><?= $lang['mall_home'] ?></a>
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
    
    <!-- BEGIN: 项目介绍 -->
    <div class="c-content-box animated fadeInRight" style="background-color: #000; margin-bottom: 0; overflow: hidden; z-index: 1;">
        <div class="col-md-6">
            <video loop="loop" src="upload/video/xuhui.mp4" controls="true" width="100%"></video>
        </div>
        
        <div class="container">
            <div class="col-md-6">
                <div class="c-content-testimonial-2-slider" data-slider="owl" data-single-item="true" data-auto-play="10000">
                    <div class="owl-carousel owl-theme c-theme owl-single">
                        <div class="item">
                            <div class="c-content-title-1" style="margin-top: 40px;">
                                <h3 class="c-font-bold c-font-white"><?= $lang['mall_xuhui_brief'] ?></h3>
                                <div class="c-content-bar-1 c-opt-1">
                                    <blockquote class="c-theme-border c-font-white" style="text-align: left;">
                                        <p><?= $lang['mall_xuhui_brief_p'] ?></p>
                                    </blockquote>
                                    <ul class="c-content-list-1 c-theme" style="text-align: left;">
                                        <li class="c-bg-before-red c-font-white">
                                            2017年GDP: <span class="c-counter c-bg-red-font" data-counter="counterup">1,574</span>亿元
                                        </li>
                                        <li class="c-bg-before-red c-font-white">
                                            2017年常住人口: <span class="c-counter c-bg-red-font" data-counter="counterup">1,088,300</span>人
                                        </li>
                                        <li class="c-bg-before-red c-font-white">
                                            2017年社会消费品零售总额: <span class="c-counter c-bg-red-font" data-counter="counterup">667</span>亿元
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="item">
                            <div class="c-content-title-1" style="margin-top: 40px;">
                                <h3 class="c-font-bold c-font-white"><?= $lang['mall_desc'] ?></h3>
                                <div class="c-content-bar-1 c-opt-1">
                                    <ul id="mall_desc" class="c-content-list-1 c-theme" style="text-align: left;"></ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <div class="c-content-box c-no-padding c-size-md c-bg-dark animated fadeInRight" style="margin-bottom: 0; z-index: 1;">
		<div class="container">
			<div class="c-content-bar-3">
				<div class="row">
                    <div class="col-md-2 col-md-offset-4 col-xs-6">
						<div class="c-content-v-center" style="height: 90px;">
							<div class="c-wrapper">
                                <div class="c-body">
                                    <a href="requirement" class="btn btn-md c-btn-square c-btn-border-2x c-theme-btn c-btn-uppercase c-btn-bold"><i class="icon-map"></i> <?= $lang['mall_shops'] ?></a>
								</div>
							</div>
						</div>
					</div>
					<div class="col-md-2 col-xs-6">
						<div class="c-content-v-center" style="height: 90px;">
							<div class="c-wrapper">
                                <div class="c-body">
                                    <a href="events" class="btn btn-md c-btn-square c-btn-border-2x c-theme-btn c-btn-uppercase c-btn-bold"><i class="icon-calendar"></i> <?= $lang['mall_events'] ?></a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
    <!-- END: 项目介绍 -->
    
    <!-- BEGIN: 联系方式 -->
    <div id="intro" class="c-content-box animated fadeInRight" style="margin-bottom: 0; z-index: 1;">
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
									<span>约130家</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
        <div id="gmapbg" class="c-content-contact-1-gmap c-content-box c-bg-parallax c-content-feature-16 hidden-sm hidden-xs" style="background-image: url(views/assets/base/img/content/mall/xuhui-tm/map.gif); margin-bottom: 0;">
		</div>
    </div>
    
    <!-- BEGIN: 4楼 -->
	<div id="f4" class="c-content-box c-bg-parallax c-content-feature-16" style="background-image: url(views/assets/base/img/content/mall/xuhui-tm/4F.jpeg); margin-bottom: 0;">
		<div class="container">
			<div class="row">
                <div class="col-md-5 col-xs-12">
                    <div class="c-feature-16-container c-bg-dark c-bg-opacity-4 animated fadeInLeft">
                        <div class="c-feature-16-line c-theme-bg"></div>
                        <h2 class="c-feature-16-title c-font-bold c-font-uppercase c-font-white">4F 集会地</h2>
                        <p class="c-feature-16-desc c-font-grey">
                            <?= $lang['floor_modality_shop_proportion'] ?>
                        </p>
                        <div id="proportion_f4"></div>
                        <a class="c-feature-15-btn btn c-btn btn-lg c-theme-btn c-font-uppercase c-font-bold c-btn-square" href="views/html/user/component/floor-plan-xuhui-tm.php?m=<?= $xh_tm?>&f=4" data-toggle="modal" data-target="#floor_map_F_xuhui">打开楼层图</a>
                    </div>
                </div>
            </div>
		</div>
	</div>
	<!-- END: 4楼 -->
    
    <!-- BEGIN: 3楼 -->
	<div id="f3" class="c-content-box c-bg-parallax c-content-feature-16" style="background-image: url(views/assets/base/img/content/mall/xuhui-tm/3F.jpeg); margin-bottom: 0;">
		<div class="container">
			<div class="row">
                <div class="col-md-offset-7 col-md-5 col-xs-12">
                    <div class="c-feature-16-container c-bg-white c-bg-opacity-5 animated fadeInRight">
                        <div class="c-feature-16-line c-theme-bg"></div>
                        <h2 class="c-feature-16-title c-font-bold c-font-uppercase">3F 奇幻地</h2>
                        <p class="c-feature-16-desc">
                            <?= $lang['floor_modality_shop_proportion'] ?>
                        </p>
                        <div id="proportion_f3"></div>
                        <a class="c-feature-15-btn btn c-btn btn-lg c-theme-btn c-font-uppercase c-font-bold c-btn-square" href="views/html/user/component/floor-plan-xuhui-tm.php?m=<?= $xh_tm?>&f=3" data-toggle="modal" data-target="#floor_map_F_xuhui">打开楼层图</a>
                    </div>
                </div>
            </div>
		</div>
	</div>
	<!-- END: 3楼 -->
    
    <!-- BEGIN: 2楼 -->
	<div id="f2" class="c-content-box c-bg-parallax c-content-feature-16" style="background-image: url(views/assets/base/img/content/mall/xuhui-tm/2F.jpeg); margin-bottom: 0;">
		<div class="container">
			<div class="row">
                <div class="col-md-5 col-xs-12">
                    <div class="c-feature-16-container c-bg-dark c-bg-opacity-4 animated fadeInLeft">
                        <div class="c-feature-16-line c-theme-bg"></div>
                        <h2 class="c-feature-16-title c-font-bold c-font-uppercase c-font-white">2F 潮流地</h2>
                        <p class="c-feature-16-desc c-font-grey">
                            <?= $lang['floor_modality_shop_proportion'] ?>
                        </p>
                        <div id="proportion_f2"></div>
                        <a class="c-feature-15-btn btn c-btn btn-lg c-theme-btn c-font-uppercase c-font-bold c-btn-square" href="views/html/user/component/floor-plan-xuhui-tm.php?m=<?= $xh_tm?>&f=2" data-toggle="modal" data-target="#floor_map_F_xuhui">打开楼层图</a>
                    </div>
                </div>
            </div>
		</div>
	</div>
	<!-- END: 2楼 -->
    
    <!-- BEGIN: 1楼 -->
	<div id="f1" class="c-content-box c-bg-parallax c-content-feature-16" style="background-image: url(views/assets/base/img/content/mall/xuhui-tm/1F.jpeg); margin-bottom: 0;">
		<div class="container">
			<div class="row">
                <div class="col-md-offset-7 col-md-5 col-xs-12">
                    <div class="c-feature-16-container c-bg-white c-bg-opacity-5 animated fadeInRight">
                        <div class="c-feature-16-line c-theme-bg"></div>
                        <h2 class="c-feature-16-title c-font-bold c-font-uppercase">1F 漂"靓"地</h2>
                        <p class="c-feature-16-desc">
                            <?= $lang['floor_modality_shop_proportion'] ?>
                        </p>
                        <div id="proportion_f1"></div>
                        <a class="c-feature-15-btn btn c-btn btn-lg c-theme-btn c-font-uppercase c-font-bold c-btn-square" href="views/html/user/component/floor-plan-xuhui-tm.php?m=<?= $xh_tm?>&f=1" data-toggle="modal" data-target="#floor_map_F_xuhui">打开楼层图</a>
                    </div>
                </div>
            </div>
		</div>
	</div>
	<!-- END: 1楼 -->
    
    <!-- BEGIN: B1楼 -->
	<div id="fb1" class="c-content-box c-bg-parallax c-content-feature-16" style="background-image: url(views/assets/base/img/content/mall/xuhui-tm/B1F.jpeg); margin-bottom: 0;">
		<div class="container">
			<div class="row">
                <div class="col-md-5 col-xs-12">
                    <div class="c-feature-16-container c-bg-dark c-bg-opacity-4 animated fadeInLeft">
                        <div class="c-feature-16-line c-theme-bg"></div>
                        <h2 class="c-feature-16-title c-font-bold c-font-uppercase c-font-white">B1F 美食地</h2>
                        <p class="c-feature-16-desc c-font-grey">
                            <?= $lang['floor_modality_shop_proportion'] ?>
                        </p>
                        <div id="proportion_fb1"></div>
                        <a class="c-feature-15-btn btn c-btn btn-lg c-theme-btn c-font-uppercase c-font-bold c-btn-square" href="views/html/user/component/floor-plan-xuhui-tm.php?m=<?= $xh_tm?>&f=0" data-toggle="modal" data-target="#floor_map_F_xuhui">打开楼层图</a>
                    </div>
                </div>
            </div>
		</div>
	</div>
	<!-- END: B1楼 -->
    
    <div class="c-content-box c-size-lg c-bg-white" style="margin-bottom: 0; z-index: 1;">
		<div class="container">
            <div class="c-content-title-1">
                <h3 class="c-center c-font-uppercase c-font-bold mall-name"></h3>
                <div class="c-line-center c-theme-bg"></div>
            </div>
            <div class="col-md-3">
                <img class="img-responsive" src="views/assets/base/img/content/mall/xuhui-tm/xh-1.jpeg" alt=""><br>
            </div>
            <div class="col-md-3">
                <img class="img-responsive" src="views/assets/base/img/content/mall/xuhui-tm/xh-2.jpeg" alt=""><br>
            </div>
            <div class="col-md-3">
                <img class="img-responsive" src="views/assets/base/img/content/mall/xuhui-tm/xh-3.jpeg" alt=""><br>
            </div>
            <div class="col-md-3">
                <img class="img-responsive" src="views/assets/base/img/content/mall/xuhui-tm/xh-4.jpeg" alt=""><br>
            </div>
        </div>  
	</div>
    
    <div class="c-content-box c-size-lg c-bg-grey-2" style="margin-bottom: 0; z-index: 1;">
		<div class="container">
            <div class="c-content-title-1">
                <h3 class="c-center c-font-uppercase c-font-bold c-font-white">徐汇滨江周边</h3>
                <div class="c-line-center c-theme-bg"></div>
            </div>
            <div class="col-md-3">
                <img class="img-responsive" src="views/assets/base/img/content/mall/xuhui-tm/xh-5.jpeg" alt=""><br>
            </div>
            <div class="col-md-3">
                <img class="img-responsive" src="views/assets/base/img/content/mall/xuhui-tm/xh-6.jpeg" alt=""><br>
            </div>
            <div class="col-md-3">
                <img class="img-responsive" src="views/assets/base/img/content/mall/xuhui-tm/xh-7.jpeg" alt=""><br>
            </div>
            <div class="col-md-3">
                <img class="img-responsive" src="views/assets/base/img/content/mall/xuhui-tm/xh-8.jpeg" alt=""><br>
            </div>
        </div>  
	</div>
    
    <div class="c-content-box c-size-md c-bg-white animated fadeInDown" style="z-index: 1;">
		<div class="container">
			<div class="c-content-bar-2 c-opt-1">
				<div class="row">
					<div class="col-md-6">
                        <div class="c-content-title-1">
							<h3 class="c-font-uppercase c-font-bold">便利的交通</h3>
                            <div class="c-line-left"></div>
							<ul id="traffics" class="c-content-list-1 c-theme c-separator-dot c-square"></ul>
						</div>
					</div>
                    <div class="col-md-6">
                        <div class="c-content-title-1">
							<h3 class="c-font-uppercase c-font-bold">五星级酒店</h3>
							<ul class="c-content-list-1 c-theme c-separator-dot c-square">
                                <li class="c-bg-before-red"><a href="http://www.greenlandwhotel.com/" target="_blank">上海绿地万豪酒店</a> <small>黄浦区江滨路99号，近开平路</small></li>                                
                                <li class="c-bg-before-red"><a href="http://www.courtyardxizang.com/" target="_blank">上海西藏大厦万怡酒店</a> <small>徐汇区虹桥路100号，近中山西路</small></li>
                                <li class="c-bg-before-red"><a href="http://www.huatinghotels.com/" target="_blank">上海华亭宾馆</a> <small>徐汇区漕溪北路1200号，近宜山路</small></li>                                
                                <li class="c-bg-before-red"><a href="http://www.lhw.cn/hotel/China-Capella-Shanghai-Jian-Ye-Li/LW2847" target="_blank">上海建业里嘉佩乐酒店</a> <small>徐汇区建国西路480号，近乌鲁木齐南路</small></li>                                
                                <li class="c-bg-before-red"><a href="http://www.ascottchina.com/serviceDetail.aspx?id=16" target="_blank">上海雅诗阁衡山服务公寓</a> <small>徐汇区衡山路99号，近乌鲁木齐南路</small></li>                                
                                <li class="c-bg-before-red"><a href="https://www.regalhotel.com/regal-international-east-asia-hotel/sc/home/home.html" target="_blank">上海富豪环球东亚酒店</a> <small>徐汇区衡山路516号，近宛平路</small></li>                                
                                <li class="c-bg-before-red"><a href="#" target="_blank">上海雅集公馆</a> <small>徐汇区吴兴路83-85号，近衡山路</small></li>                                
                                <li class="c-bg-before-red"><a href="#">上海徐家汇禧玥酒店</a> <small>徐汇区蒲汇塘路118号，近文定路</small></li>
                                <li class="c-bg-before-red"><a href="#">上海瑞金宾馆太原别墅</a> <small>徐汇区太原路160号，近永嘉路</small></li>
                                <li class="c-bg-before-red"><a href="http://www.12hshotel.com/" target="_blank">上海衡山路十二号豪华精选酒店</a> <small>徐汇区衡山路12号，近高安路</small></li>
                                <li class="c-bg-before-red"><a href="http://www.skysway.com/">上海斯格威铂尔曼大酒店</a> <small>黄浦区打浦路15号，近南塘浜路</small></li>
                                <li class="c-bg-before-red"><a href="http://www.ruijinihotel.com/">上海瑞金洲际酒店</a> <small>黄浦区瑞金二路118号，近复兴中路</small></li>
                                <li class="c-bg-before-red"><a href="http://www.huaihaihojo.com/" target="_blank">上海嘉豪淮海国际豪生酒店</a> <small>徐汇区汾阳路1号，近淮海中路</small></li>
                            </ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
    
    <a id="f4_g" href="views/html/user/component/floor-plan-xuhui-tm.php?m=<?= $xh_tm?>&f=4" data-toggle="modal" data-target="#floor_map_F_xuhui" class="hidden-xs hidden-sm hidden-md floor-guide"><span class="badge c-bg-white c-font-red c-font-bold">4F</span><img src="views/assets/base/img/content/floor-plan/xuhui-tm/4F.png" class="img-responsive" alt="" /></a>
    <a id="f3_g" href="views/html/user/component/floor-plan-xuhui-tm.php?m=<?= $xh_tm?>&f=3" data-toggle="modal" data-target="#floor_map_F_xuhui" class="hidden-xs hidden-sm hidden-md floor-guide"><span class="badge c-bg-white c-font-red c-font-bold">3F</span><img src="views/assets/base/img/content/floor-plan/xuhui-tm/3F.png" class="img-responsive" alt="" /></a>
    <a id="f2_g" href="views/html/user/component/floor-plan-xuhui-tm.php?m=<?= $xh_tm?>&f=2" data-toggle="modal" data-target="#floor_map_F_xuhui" class="hidden-xs hidden-sm hidden-md floor-guide"><span class="badge c-bg-white c-font-red c-font-bold">2F</span><img src="views/assets/base/img/content/floor-plan/xuhui-tm/2F.png" class="img-responsive" alt="" /></a>
    <a id="f1_g" href="views/html/user/component/floor-plan-xuhui-tm.php?m=<?= $xh_tm?>&f=1" data-toggle="modal" data-target="#floor_map_F_xuhui" class="hidden-xs hidden-sm hidden-md floor-guide"><span class="badge c-bg-white c-font-red c-font-bold">1F</span><img src="views/assets/base/img/content/floor-plan/xuhui-tm/1F.png" class="img-responsive" alt="" /></a>
    <a id="fb1_g" href="views/html/user/component/floor-plan-xuhui-tm.php?m=<?= $xh_tm?>&f=0" data-toggle="modal" data-target="#floor_map_F_xuhui" class="hidden-xs hidden-sm hidden-md floor-guide"><span class="badge c-bg-white c-font-red c-font-bold">B1F</span><img src="views/assets/base/img/content/floor-plan/xuhui-tm/0F.png" class="img-responsive" alt="" /></a>
    
    <div id="floor_map_F_xuhui" class="modal fade" role="dialog">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-body"></div>
            </div>
        </div>
    </div>
</div>

<?php include ('footer.php'); ?>