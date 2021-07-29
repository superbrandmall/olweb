<?php
$scripts = $scripts . '<script type="text/javascript" src="views/assets/base/js/baoshan-tm.js"></script>';
?>

<div class="c-layout-page">
    <div class="c-content-box c-size-md" style="background-image: url(views/assets/base/img/content/backgrounds/body-6.jpg); background-position: left center; margin-bottom: 0; z-index: 1;">
        <div class="container">
            <div class="c-content-feature-3-grid">
                <h3 class="c-title c-font-bold mall-name" style="text-shadow: 1px 0 1px #000;"></h3>
                <div class="row" style="height: 90px;"></div>
            </div>
        </div>
    </div>

    <div class="c-content-box c-size-lg c-bg-white" style="margin-bottom: 0; z-index: 1;">
        <div class="container">
            <div class="c-content-title-1">
                <h3 class="c-center c-font-bold"><?= $lang['mall_baoshan_brief'] ?> & <?= $lang['mall_desc'] ?></h3>
            </div>
            <div class="col-md-4">
                <video loop="loop" autoplay="true" src="upload/video/<?= $lang['mall_lang_cat'] ?>/baoshan-tm.mp4" controls="true" width="100%"></video><br><br>
                <div class="c-body">
                    <div class="c-section">
                        <div class="c-content-label c-font-uppercase c-font-bold c-theme-bg">
                            <?= $lang['mall_location'] ?>
                        </div>
                        <div>
                            <span id="street"></span>
                        </div>
                        <br>
                        <div class="c-content-label c-font-uppercase c-font-bold c-theme-bg">
                            <?= $lang['mall_floor_area'] ?>
                        </div>
                        <div>
                            <span id="gross_floor_area"></span>m<sup>2</sup>
                        </div>
                        <br>
                        <div class="c-content-label c-font-uppercase c-font-bold c-theme-bg">
                            <?= $lang['mall_leasable_area'] ?>
                        </div>
                        <div>
                            <span id="leasing_area"></span>m<sup>2</sup>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-8">
                <p style="margin: 10px 0;"><?= $lang['mall_baoshan_brief_p'] ?></p>
                <div class="row">
                    <div class="col-md-4">
                        <h4 class="c-title c-first c-font-bold"><?= $lang['mall_gdp'] ?></h4>
                        <span class="c-counter c-font-bold c-theme-font" data-counter="counterup">
                            1,392
                        </span><?= $lang['mall_yiyuan'] ?>
                    </div>
                    <div class="col-md-4">
                        <h4 class="c-title c-font-bold"><?= $lang['mall_resident_population'] ?></h4>
                        <span class="c-counter c-font-bold c-theme-font" data-counter="counterup">
                            2,042,300
                        </span><?= $lang['mall_ren'] ?>
                    </div>
                    <div class="col-md-4">
                        <h4 class="c-title c-font-bold"><?= $lang['mall_retail_sales'] ?></h4>
                        <span class="c-counter c-font-bold c-theme-font" data-counter="counterup">
                            683
                        </span><?= $lang['mall_yiyuan'] ?>
                    </div>
                </div>
                <ul id="mall_desc" class="c-content-list-1 c-theme" style="text-align: left;"></ul>
            </div>
        </div>
    </div>

    <div id="f3" class="c-content-box c-bg-parallax c-content-feature-16" style="background-image: url(views/assets/base/img/content/mall/baoshan-tm/3F.jpg); margin-bottom: 0;">
        <div class="container">
            <div class="row">
                <div class="col-md-offset-7 col-md-5 col-xs-12">
                    <div class="c-feature-16-container c-bg-white c-bg-opacity-5">
                        <div class="c-feature-16-line c-theme-bg"></div>
                        <h2 class="c-feature-16-title c-font-bold">3F <?= $lang['mall_baoshan_tm_3'] ?></h2>
                        <p class="c-feature-16-desc">
                            <?= $lang['mall_modality_shop_proportion'] ?>
                        </p>
                        <div id="proportion_f3"></div>
                        <a class="c-feature-15-btn btn c-btn btn-lg c-theme-btn c-font-uppercase c-btn-square" href="views/html/user/component/floor-plan-baoshan-tm.php?m=<?= $bs_tm ?>&f=3" data-toggle="modal" data-target="#floor_map_F"><?= $lang['mall_open_floor_map'] ?></a>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div id="f2" class="c-content-box c-bg-parallax c-content-feature-16" style="background-image: url(views/assets/base/img/content/mall/baoshan-tm/2F.jpg); margin-bottom: 0;">
        <div class="container">
            <div class="row">
                <div class="col-md-5 col-xs-12">
                    <div class="c-feature-16-container c-bg-dark c-bg-opacity-4">
                        <div class="c-feature-16-line c-theme-bg"></div>
                        <h2 class="c-feature-16-title c-font-bold c-font-white">2F <?= $lang['mall_baoshan_tm_2'] ?></h2>
                        <p class="c-feature-16-desc c-font-grey">
                            <?= $lang['mall_modality_shop_proportion'] ?>
                        </p>
                        <div id="proportion_f2"></div>
                        <a class="c-feature-15-btn btn c-btn btn-lg c-btn-blue c-font-uppercase c-btn-square" href="views/html/user/component/floor-plan-baoshan-tm.php?m=<?= $bs_tm ?>&f=2" data-toggle="modal" data-target="#floor_map_F"><?= $lang['mall_open_floor_map'] ?></a>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div id="f1" class="c-content-box c-bg-parallax c-content-feature-16" style="background-image: url(views/assets/base/img/content/mall/baoshan-tm/1F.jpg); margin-bottom: 0;">
        <div class="container">
            <div class="row">
                <div class="col-md-offset-7 col-md-5 col-xs-12">
                    <div class="c-feature-16-container c-bg-white c-bg-opacity-5">
                        <div class="c-feature-16-line c-theme-bg"></div>
                        <h2 class="c-feature-16-title c-font-bold">1F <?= $lang['mall_baoshan_tm_1'] ?></h2>
                        <p class="c-feature-16-desc">
                            <?= $lang['mall_modality_shop_proportion'] ?>
                        </p>
                        <div id="proportion_f1"></div>
                        <a class="c-feature-15-btn btn c-btn btn-lg c-theme-btn c-font-uppercase c-btn-square" href="views/html/user/component/floor-plan-baoshan-tm.php?m=<?= $bs_tm ?>&f=1" data-toggle="modal" data-target="#floor_map_F"><?= $lang['mall_open_floor_map'] ?></a>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div id="fb1" class="c-content-box c-bg-parallax c-content-feature-16" style="background-image: url(views/assets/base/img/content/mall/baoshan-tm/B1F.jpg); margin-bottom: 0;">
        <div class="container">
            <div class="row">
                <div class="col-md-5 col-xs-12">
                    <div class="c-feature-16-container c-bg-dark c-bg-opacity-4">
                        <div class="c-feature-16-line c-theme-bg"></div>
                        <h2 class="c-feature-16-title c-font-bold c-font-white">B1F <?= $lang['mall_baoshan_tm_0'] ?></h2>
                        <p class="c-feature-16-desc c-font-grey">
                            <?= $lang['mall_modality_shop_proportion'] ?>
                        </p>
                        <div id="proportion_fb1"></div>
                        <a class="c-feature-15-btn btn c-btn btn-lg c-btn-blue c-font-uppercase c-btn-square" href="views/html/user/component/floor-plan-baoshan-tm.php?m=<?= $bs_tm ?>&f=0" data-toggle="modal" data-target="#floor_map_F"><?= $lang['mall_open_floor_map'] ?></a>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="c-content-box c-size-lg c-bg-white" style="margin-bottom: 0; z-index: 1;">
        <div class="container">
            <div class="c-content-title-1">
                <h3 class="c-center c-font-bold mall-name"></h3>
            </div>
            <div class="col-md-3">
                <img class="img-responsive" src="views/assets/base/img/content/mall/baoshan-tm/<?= $lang['mall_lang_cat'] ?>/bs-1.jpg" alt=""><br>
            </div>
            <div class="col-md-3">
                <img class="img-responsive" src="views/assets/base/img/content/mall/baoshan-tm/<?= $lang['mall_lang_cat'] ?>/bs-2.jpg" alt=""><br>
            </div>
            <div class="col-md-3">
                <img class="img-responsive" src="views/assets/base/img/content/mall/baoshan-tm/<?= $lang['mall_lang_cat'] ?>/bs-3.jpg" alt=""><br>
            </div>
            <div class="col-md-3">
                <img class="img-responsive" src="views/assets/base/img/content/mall/baoshan-tm/<?= $lang['mall_lang_cat'] ?>/bs-4.jpg" alt=""><br>
            </div>
        </div>
    </div>

    <div class="c-content-box c-size-lg c-bg-grey-1" style="margin-bottom: 0; z-index: 1;">
        <div class="container">
            <div class="c-content-title-1">
                <h3 class="c-center c-font-bold"><?= $lang['mall_baoshan_gucun_park_area'] ?></h3>
            </div>
            <div class="col-md-3">
                <img class="img-responsive" src="views/assets/base/img/content/mall/baoshan-tm/<?= $lang['mall_lang_cat'] ?>/bs-5.jpg" alt=""><br>
            </div>
            <div class="col-md-3">
                <img class="img-responsive" src="views/assets/base/img/content/mall/baoshan-tm/<?= $lang['mall_lang_cat'] ?>/bs-6.jpg" alt=""><br>
            </div>
            <div class="col-md-3">
                <img class="img-responsive" src="views/assets/base/img/content/mall/baoshan-tm/<?= $lang['mall_lang_cat'] ?>/bs-7.jpg" alt=""><br>
            </div>
            <div class="col-md-3">
                <img class="img-responsive" src="views/assets/base/img/content/mall/baoshan-tm/<?= $lang['mall_lang_cat'] ?>/bs-8.jpg" alt=""><br>
            </div>
        </div>
    </div>

    <div class="c-content-box c-size-md c-bg-white" style="margin-bottom: 0; z-index: 1;">
        <div class="container">
            <div class="c-content-bar-2 c-opt-1">
                <div class="row">
                    <div class="col-md-6">
                        <div class="c-content-title-1">
                            <h3 class="c-font-bold"><?= $lang['mall_convenient_transportation'] ?></h3>
                            <ul id="traffics" class="c-content-list-1 c-theme c-separator-dot c-square"></ul>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="c-content-title-1">
                            <h3 class="c-font-bold"><?= $lang['mall_fivestar_hotel'] ?></h3>
                            <ul class="c-content-list-1 c-theme c-separator-dot c-square">
                                <li class="c-bg-before-red"><?= $lang['mall_bs_ji_gucun_park_station_hotel'] ?> <small><?= $lang['mall_bs_ji_gucun_park_station_hotel_addr'] ?></small></li>
                                <li class="c-bg-before-red"><?= $lang['mall_bs_ji_julian_rd_hotel'] ?> <small><?= $lang['mall_bs_ji_julian_rd_hotel_addr'] ?></small></li>
                                <li class="c-bg-before-red"><?= $lang['mall_bs_hengshanbj_hotel'] ?> <small><?= $lang['mall_bs_hengshanbj_hotel_addr'] ?></small></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <a id="f3_g" href="views/html/user/component/floor-plan-baoshan-tm.php?m=<?= $bs_tm ?>&f=3" data-toggle="modal" data-target="#floor_map_F" class="hidden-xs hidden-sm hidden-md floor-guide"><span class="badge c-bg-white c-font-red c-font-bold">3F</span><img src="views/assets/base/img/content/floor-plan/baoshan-tm/3F.png" class="img-responsive" alt="" /></a>
    <a id="f2_g" href="views/html/user/component/floor-plan-baoshan-tm.php?m=<?= $bs_tm ?>&f=2" data-toggle="modal" data-target="#floor_map_F" class="hidden-xs hidden-sm hidden-md floor-guide"><span class="badge c-bg-white c-font-red c-font-bold">2F</span><img src="views/assets/base/img/content/floor-plan/baoshan-tm/2F.png" class="img-responsive" alt="" /></a>
    <a id="f1_g" href="views/html/user/component/floor-plan-baoshan-tm.php?m=<?= $bs_tm ?>&f=1" data-toggle="modal" data-target="#floor_map_F" class="hidden-xs hidden-sm hidden-md floor-guide"><span class="badge c-bg-white c-font-red c-font-bold">1F</span><img src="views/assets/base/img/content/floor-plan/baoshan-tm/1F.png" class="img-responsive" alt="" /></a>
    <a id="fb1_g" href="views/html/user/component/floor-plan-baoshan-tm.php?m=<?= $bs_tm ?>&f=0" data-toggle="modal" data-target="#floor_map_F" class="hidden-xs hidden-sm hidden-md floor-guide"><span class="badge c-bg-white c-font-red c-font-bold">B1F</span><img src="views/assets/base/img/content/floor-plan/baoshan-tm/0F.png" class="img-responsive" alt="" /></a>

    <div id="floor_map_F" class="modal fade" role="dialog">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-body"></div>
            </div>
        </div>
    </div>
</div>

<?php include ('footer.php'); ?>