<?php
if(explode('?id=',$_SERVER['REQUEST_URI'])[1] != null) {
    $id = explode('?id=',$_SERVER['REQUEST_URI'])[1];
    if (strpos($id, '&search=') !== false) {
        $id = explode('&search=',$id)[0];
    }
} else {
    $id = null;
}

$scripts = $scripts. '<script type="text/javascript" src="views/assets/base/js/shop.js"></script>';
?>
<!-- BEGIN: PAGE CONTAINER -->
<div class="c-layout-page">
    <!-- BEGIN: 标题 -->
	<div class="c-layout-breadcrumbs-1 c-fonts-uppercase c-fonts-bold">
		<div class="container">
			<div class="c-page-title c-pull-left">
				<h3 class="c-font-bold"></h3>
			</div>
			<ul class="c-page-breadcrumbs c-theme-nav c-pull-right c-fonts-regular">
				<li>
					<a href="/"><?= $lang['shop_home'] ?></a>
				</li>
                <li>
					/
				</li>
                <li id="mall_link"></li>
				<li>
					/
				</li>
				<li class="c-state_active">
					<?= $lang['shop_shop_detail'] ?>
				</li>
			</ul>
		</div>
	</div>
	<!-- END: 标题 -->
    <!-- BEGIN: 店铺招商详情 -->
    <div class="c-content-box c-size-md c-bg-grey-1" style="margin-bottom: 0; padding: 30px 0;">
		<div class="container">
			<div class="row">
				<div class="col-md-8">
					<div class="c-content-media-2-slider" data-slider="owl" data-single-item="true" data-auto-play="4000">
						<div class="c-content-label c-font-uppercase c-font-bold c-theme-bg">
							<?= $lang['shop_shop_picture'] ?>
						</div>
						<div class="owl-carousel owl-theme c-theme owl-single"></div>
					</div>
				</div>
                <div class="col-md-4">
					<div class="c-content-media-1 c-bordered" style="min-height: 380px;">
						<div class="c-content-label c-font-uppercase c-font-bold c-theme-bg">
							<?= $lang['shop_shop_detail'] ?>
						</div>
						<ul class="c-content-list-1 c-theme c-separator-dot c-square">
                            <li>
                                <?= $lang['shop_room_number'] ?>: <span id="unit"></span>
                            </li>
                            <li>
                                <?= $lang['shop_floor'] ?>: <span id="floor"></span>
                            </li>
                            <li>
                                <?= $lang['shop_recommand_modality'] ?>: <span id="modality"></span>
                            </li>
                            <li>
                                <span id="shop_state"></span>:
                                <span id="b_name"></span>
                            </li>
                            <li>
                                <?= $lang['shop_leasable_area'] ?>: 
                                <strong><span id="area"></span></strong>
                            </li>
                            <li><?= $lang['shop_moving_date'] ?>:
                                <strong><span id="moving_date"></span></strong>
                            </li>
                        </ul>
					</div>
				</div>
			</div>
		</div>
	</div>
    <div class="c-content-box c-size-md c-bg-grey-1" style="background: url(views/assets/base/img/content/backgrounds/body-1.jpg) center center no-repeat;background-size: cover; margin-bottom: 0;">
		<div class="container">
			<div class="row">
                <div id="vr_video" class="col-md-6">
                    <div class="c-content-title-1">
                        <h3 class="c-center c-font-uppercase c-font-bold c-font-white"><?= $lang['shop_vr'] ?></h3>
                    </div>
                    <div class="embed-responsive embed-responsive-16by9">
                        <iframe class="embed-responsive-item" src="" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
                    </div><br><br>
                </div>
                <div id="shop_location" class="col-md-6">
                    <div class="c-content-title-1">
                        <h3 class="c-center c-font-uppercase c-font-bold c-font-white"><?= $lang['shop_shop_location'] ?></h3>
                    </div>
                    <div class="c-content-panel" style="background-color: transparent;">
                        <div class="c-label" id="fmap" style="background-color: transparent;">
                            <span style="background-color: #c34343; width: 20px; height: 13px; display: inline-block;"></span> <?= $lang['shop_this_shop'] ?>
                            <span style="margin-left: 15px; background-color: #c9ae89; width: 20px; height: 13px; display: inline-block;"></span> <?= $lang['shop_shop_awaiting_rent'] ?>
                            <span style="margin-left: 15px; background-color: #E3E3E3; width: 20px; height: 13px; display: inline-block;"></span> <?= $lang['shop_shop_in_renting'] ?>
                        </div>
                        <div class="c-body" style="background-color: rgba(240,240,240,0.8);padding: 33px 20px 20px;">
                            <img src="#" class="img-responsive" id="map">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <div class="c-content-box c-size-md c-bg-white" style="margin-bottom: 0;" id="engineering_images">
		<div class="container" id="other_imgs">
			<div class="c-content-title-1">
				<h3 class="c-font-uppercase c-center c-font-bold">参考附件</h3>
			</div>
        </div>
    </div>
    
    <div class="c-content-box c-size-md c-bg-grey-1" style="margin-bottom: 0;" id="engineering_specifications">
		<div class="container">
            <div class="c-content-title-1">
                <h3 class="c-font-uppercase c-center c-font-bold">工程条件</h3>
            </div>
            
            <div class="table-responsive" style="background-color: #fff;">
                <table class="table table-bordered table-striped" style="margin-bottom: 1px;">
                    <tbody>
                        <tr>
                            <td style="background-color: #dedede;">
                                <i class="fa fa-bolt"></i> 强电
                            </td>
                            <td>
                                <table> 
                                    <tr>
                                        <td>电压:</td>
                                    </tr>
                                    <tr>
                                        <td><span id="dianya"></span></td>
                                    </tr>
                                </table>
                            </td>
                            <td>
                                <table> 
                                    <tr>
                                        <td>电箱数量:</td>
                                    </tr>
                                    <tr>
                                        <td><span id="dianxiang"></span></td>
                                    </tr>
                                </table>
                            </td>
                            <td>
                                <table> 
                                    <tr>
                                        <td>开关容量:</td>
                                    </tr>
                                    <tr>
                                        <td><span id="kaiguan"></span></td>
                                    </tr>
                                </table>
                            </td>
                            <td>
                                <table> 
                                    <tr>
                                        <td>供电方式:</td>
                                    </tr>
                                    <tr>
                                        <td><span id="gongdian"></span></td>
                                    </tr>
                                </table>
                            </td>
                            <td>
                                <table> 
                                    <tr>
                                        <td>电量:</td>
                                    </tr>
                                    <tr>
                                        <td><span id="dianliang"></span></td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td style="background-color: #dedede;">
                                <i class="fa fa-tint"></i> 给排水
                            </td>
                            <td colspan="2">
                                <table> 
                                    <tr>
                                        <td>给水</td>
                                    </tr>
                                    <tr>
                                        <td>管径: <span id="geishui"></span></td>
                                    </tr>
                                </table>
                            </td>
                            <td colspan="3">
                                <table> 
                                    <tr>
                                        <td>排水</td>
                                    </tr>
                                    <tr>
                                        <td>管径: <span id="paishui"></span></td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td style="background-color: #dedede;">
                                <i class="fa fa-snowflake-o"></i> 空调
                            </td>
                            <td>
                                <table> 
                                    <tr>
                                        <td>回水管</td>
                                    </tr>
                                    <tr>
                                        <td style="padding-right: 20px;">数量: <span id="huishui"></span></td>
                                        <td>规格: <span id="huishui1"></span></td>
                                    </tr>
                                </table>
                            </td>
                            <td>
                                <table> 
                                    <tr>
                                        <td>冷冻供水管</td>
                                    </tr>
                                    <tr>
                                        <td style="padding-right: 20px;">数量: <span id="lengdong"></span></td>
                                        <td>规格: <span id="lengdong1"></span></td>
                                    </tr>
                                </table>
                            </td>
                            <td>
                                <table> 
                                    <tr>
                                        <td>冷凝水管</td>
                                    </tr>
                                    <tr>
                                        <td style="padding-right: 20px;">数量: <span id="lenning"></span></td>
                                        <td>规格: <span id="lenning1"></span></td>
                                    </tr>
                                </table>
                            </td>
                            <td>
                                <table> 
                                    <tr>
                                        <td>新风管</td>
                                    </tr>
                                    <tr>
                                        <td style="padding-right: 20px;">数量: <span id="xinfeng"></span></td>
                                        <td>风量: <span id="xinfeng1"></span></td>
                                    </tr>
                                </table>
                            </td>
                            <td>
                                <table> 
                                    <tr>
                                        <td>自装独立空调</td>
                                    </tr>
                                    <tr>
                                        <td><span id="kongtiao"></span></td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td style="background-color: #dedede;">
                                <i class="fa fa-fire"></i> 供暖
                            </td>
                            <td>
                                <table> 
                                    <tr>
                                        <td>供暖热水管</td>
                                    </tr>
                                    <tr>
                                        <td>数量: <span id="gongnuanreshui"></span></td>
                                    </tr>
                                </table>
                            </td>
                            <td>
                                <table> 
                                    <tr>
                                        <td>供暖回水管</td>
                                    </tr>
                                    <tr>
                                        <td>数量: <span id="gongnuanhuishui"></span></td>
                                    </tr>
                                </table>
                            </td>
                            <td>
                                <table> 
                                    <tr>
                                        <td>新风管</td>
                                    </tr>
                                    <tr>
                                        <td>数量: <span id="xinfeng"></span></td>
                                    </tr>
                                </table>
                            </td>
                            <td colspan="2">
                                <table> 
                                    <tr>
                                        <td>风机管盘</td>
                                    </tr>
                                    <tr>
                                        <td>数量: <span id="fengji"></span></td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td style="background-color: #dedede;">
                                <i class="fa fa-cloud"></i> 排烟
                            </td>
                            <td>
                                <table> 
                                    <tr>
                                        <td>容量</td>
                                    </tr>
                                    <tr>
                                        <td><span id="rongliang"></span></td>
                                    </tr>
                                </table>
                            </td>
                            <td>
                                <table> 
                                    <tr>
                                        <td>风口数量</td>
                                    </tr>
                                    <tr>
                                        <td><span id="fengkoushuliang"></span></td>
                                    </tr>
                                </table>
                            </td>
                            <td>
                                <table> 
                                    <tr>
                                        <td>风口规格</td>
                                    </tr>
                                    <tr>
                                        <td><span id="fengkouguige"></span></td>
                                    </tr>
                                </table>
                            </td>
                            <td colspan="2">
                                <table> 
                                    <tr>
                                        <td>排风量</td>
                                    </tr>
                                    <tr>
                                        <td><span id="paifengliang"></span></td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <div class="c-content-box c-size-lg c-bg-white" style="margin-bottom: 0;">
		<div class="container">
			<div class="row">
                <div class="col-md-6 col-md-offset-3">
                    <div class="c-content-title-1">
                        <h3 class="c-center c-font-bold" id="floor_name"><?= $lang['shop_modality_shop_proportion'] ?></h3>
                    </div>
                    <div id="proportion"></div>
                </div>
            </div>
        </div>
    </div>
	<!-- END: 店铺招商详情 -->
</div>

<?php include ('footer.php'); ?>