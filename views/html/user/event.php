<?php
if(explode('?id=',$_SERVER['REQUEST_URI'])[1] != null) {
    $id = explode('?id=',$_SERVER['REQUEST_URI'])[1];
    if (strpos($id, '&search=') !== false) {
        $id = explode('&search=',$id)[0];
    }
} else {
    $id = null;
}

$scripts = $scripts. '<script type="text/javascript" src="views/assets/base/js/event.js"></script>';
?>
<div class="c-layout-page">
    <div class="c-layout-breadcrumbs-1 c-fonts-uppercase c-fonts-bold">
        <div class="container">
            <div class="c-page-title c-pull-left">
                <h3 class="c-font-bold"></h3>
            </div>
            <ul class="c-page-breadcrumbs c-theme-nav c-pull-right c-fonts-regular">
                <li>
                    <a href="/"><?= $lang['event_home'] ?></a>
                </li>
                <li>
                    /
                </li>
                <li id="mall_link"></li>
                <li>
                    /
                </li>
                <li class="c-state_active">
                        <?= $lang['event_event_detail'] ?>
                </li>
            </ul>
        </div>
    </div>

    <div class="c-content-box c-size-md c-bg-grey-1" style="margin-bottom: 0; padding-bottom: 0;">
        <div class="container">
            <div class="row">
                <div class="col-md-8">
                    <div class="c-content-media-2-slider" data-slider="owl" data-single-item="true" data-auto-play="4000">
                        <div class="c-content-label c-font-uppercase c-font-bold c-theme-bg">
                            <?= $lang['event_event_picture'] ?>
                        </div>
                        <div class="owl-carousel owl-theme c-theme owl-single"></div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="c-content-media-1 c-bordered" style="min-height: 380px;">
                        <div class="c-content-label c-font-uppercase c-font-bold c-theme-bg">
                            <?= $lang['event_event_detail'] ?>
                        </div>
                        <ul class="c-content-list-1 c-theme c-separator-dot c-square">
                            <li>
                                <?= $lang['event_room_number'] ?>: <span id="unit"></span>
                            </li>
                            <li>
                                <?= $lang['event_floor'] ?>: <span id="floor"></span>
                            </li>
                            <li>
                                <?= $lang['event_leasable_area'] ?>: 
                                <strong><span id="area"></span></strong>
                            </li>
                            <li><?= $lang['event_moving_date'] ?>:
                                <strong><span id="moving_date"></span></strong>
                            </li>
                        </ul>
                    </div><br>
                </div>
            </div>
        </div>
    </div>
    <div class="c-content-box c-size-md c-bg-grey-1" style="background: url(views/assets/base/img/content/backgrounds/body-1.jpg) center center no-repeat;background-size: cover; margin-bottom: 0;">
        <div class="container">
            <div class="row">
                <div id="vr_video" class="col-md-6">
                    <div class="c-content-title-1">
                        <h3 class="c-center c-font-uppercase c-font-bold c-font-white"><?= $lang['event_vr'] ?></h3>
                    </div>
                    <div class="embed-responsive embed-responsive-16by9">
                        <iframe class="embed-responsive-item" src="" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
                    </div><br><br>
                </div>
                <div id="shop_location" class="col-md-6">
                    <div class="c-content-title-1">
                        <h3 class="c-center c-font-uppercase c-font-bold c-font-white"><?= $lang['event_event_location'] ?></h3>
                    </div>
                    <div class="c-content-panel" style="background-color: transparent;">
                        <div class="c-label" id="fmap" style="background-color: transparent;">
                            <span style="background-color: #c34343; width: 20px; height: 13px; display: inline-block;"></span> <?= $lang['event_this_event'] ?>
                        </div>
                        <div class="c-body" style="background-color: rgba(240,240,240,0.8);padding: 33px 20px 20px;">
                            <img src="#" class="img-responsive" id="map">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="c-content-box c-size-lg c-bg-white">
		<div class="container">
			<div class="row">
                <div class="col-md-6 col-md-offset-3">
                    <div class="c-content-title-1">
                        <h3 class="c-center c-font-uppercase c-font-bold" id="floor_name"><?= $lang['event_modality_shop_proportion'] ?></h3>
                    </div>
                    <div id="proportion"></div>
                </div>
            </div>
        </div>
    </div>
</div>

<?php include ('footer.php'); ?>