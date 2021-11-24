<?php
$scripts = $scripts . '<script type="text/javascript" src="views/assets/base/js/hefei-sbm.js"></script>';
?>

<div class="c-layout-page">
    <div class="c-content-box c-size-md" style="background-image: url(views/assets/base/img/content/backgrounds/body-8.jpg); background-position: left center; margin-bottom: 0; z-index: 1;">
        <div class="container">
            <div class="c-content-feature-3-grid">
                <h3 class="c-title c-font-bold mall-name"></h3>
                <div class="row" style="height: 90px;"></div>
            </div>
        </div>
    </div>

    <div class="c-content-box c-size-lg c-bg-white" style="margin-bottom: 0; z-index: 1;">
        <div class="container">
            <div class="c-content-title-1">
                <h3 class="c-center c-font-bold"><?= $lang['mall_hefei_brief'] ?> & <?= $lang['mall_desc'] ?></h3>
            </div>
            <div class="col-md-4">
                <video loop="loop" autoplay="true" src="upload/video/<?= $lang['mall_lang_cat'] ?>/hefei-sbm.mp4" controls="true" width="100%"></video><br><br>
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
                <p style="margin: 10px 0;"><?= $lang['mall_hefei_brief_p'] ?></p>
                <div class="row">
                    <div class="col-md-4">
                        <h4 class="c-title c-first c-font-bold"><?= $lang['mall_gdp'] ?></h4>
                        <span class="c-counter c-font-bold c-theme-font" data-counter="counterup">
                            10,045
                        </span><?= $lang['mall_yiyuan'] ?>
                    </div>
                    <div class="col-md-4">
                        <h4 class="c-title c-font-bold"><?= $lang['mall_resident_population'] ?></h4>
                        <span class="c-counter c-font-bold c-theme-font" data-counter="counterup">
                            9,369,900
                        </span><?= $lang['mall_ren'] ?>
                    </div>
                    <div class="col-md-4">
                        <h4 class="c-title c-font-bold"><?= $lang['mall_retail_sales'] ?></h4>
                        <span class="c-counter c-font-bold c-theme-font" data-counter="counterup">
                            4,510
                        </span><?= $lang['mall_yiyuan'] ?>
                    </div>
                </div>
                <ul id="mall_desc" class="c-content-list-1 c-theme" style="text-align: left;"></ul>
            </div>
        </div>
    </div>

    <div id="f7" class="c-content-box c-bg-parallax c-content-feature-16" style="background-image: url(views/assets/base/img/content/mall/hefei-sbm/7F.jpg); margin-bottom: 0;">
        <div class="container">
            <div class="row">
                <div class="col-md-offset-7 col-md-5 col-xs-12">
                    <div class="c-feature-16-container c-bg-white c-bg-opacity-5">
                        <div class="c-feature-16-line c-theme-bg"></div>
                        <h2 class="c-feature-16-title c-font-bold">L7 <?= $lang['mall_hefei_sbm_7'] ?></h2>
                        <p class="c-feature-16-desc">
                            <?= $lang['mall_modality_shop_proportion'] ?>
                        </p>
                        <div id="proportion_f7"></div>
                        <a class="c-feature-15-btn btn c-btn btn-lg c-theme-btn c-font-uppercase c-btn-square" href="views/html/user/component/floor-plan-hefei-sbm.php?m=<?= $hefei_sbm ?>&f=7" data-toggle="modal" data-target="#floor_map_F"><?= $lang['mall_open_floor_map'] ?></a>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div id="f6" class="c-content-box c-bg-parallax c-content-feature-16" style="background-image: url(views/assets/base/img/content/mall/hefei-sbm/6F.jpg); margin-bottom: 0;">
        <div class="container">
            <div class="row">
                <div class="col-md-5 col-xs-12">
                    <div class="c-feature-16-container c-bg-dark c-bg-opacity-4" style="background: url(views/assets/base/img/content/mall/hefei-sbm/mall-bg.jpg) bottom right no-repeat;">
                        <div class="c-feature-16-line c-theme-bg"></div>
                        <h2 class="c-feature-16-title c-font-bold c-font-white">L6 <?= $lang['mall_hefei_sbm_6'] ?></h2>
                        <p class="c-feature-16-desc c-font-grey">
                            <?= $lang['mall_modality_shop_proportion'] ?>
                        </p>
                        <div id="proportion_f6"></div>
                        <a class="c-feature-15-btn btn c-btn btn-lg c-btn-blue c-font-uppercase c-btn-square" href="views/html/user/component/floor-plan-hefei-sbm.php?m=<?= $hefei_sbm ?>&f=6" data-toggle="modal" data-target="#floor_map_F"><?= $lang['mall_open_floor_map'] ?></a>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div id="f5" class="c-content-box c-bg-parallax c-content-feature-16" style="background-image: url(views/assets/base/img/content/mall/hefei-sbm/5F.jpg); margin-bottom: 0;">
        <div class="container">
            <div class="row">
                <div class="col-md-offset-7 col-md-5 col-xs-12">
                    <div class="c-feature-16-container c-bg-white c-bg-opacity-5">
                        <div class="c-feature-16-line c-theme-bg"></div>
                        <h2 class="c-feature-16-title c-font-bold">L5 <?= $lang['mall_hefei_sbm_5'] ?></h2>
                        <p class="c-feature-16-desc">
                            <?= $lang['mall_modality_shop_proportion'] ?>
                        </p>
                        <div id="proportion_f5"></div>
                        <a class="c-feature-15-btn btn c-btn btn-lg c-theme-btn c-font-uppercase c-btn-square" href="views/html/user/component/floor-plan-hefei-sbm.php?m=<?= $hefei_sbm ?>&f=5" data-toggle="modal" data-target="#floor_map_F"><?= $lang['mall_open_floor_map'] ?></a>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div id="f4" class="c-content-box c-bg-parallax c-content-feature-16" style="background-image: url(views/assets/base/img/content/mall/hefei-sbm/4F.jpg); margin-bottom: 0;">
        <div class="container">
            <div class="row">
                <div class="col-md-5 col-xs-12">
                    <div class="c-feature-16-container c-bg-dark c-bg-opacity-4" style="background: url(views/assets/base/img/content/mall/hefei-sbm/mall-bg.jpg) bottom right no-repeat;">
                        <div class="c-feature-16-line c-theme-bg"></div>
                        <h2 class="c-feature-16-title c-font-bold c-font-white">L4 <?= $lang['mall_hefei_sbm_4'] ?></h2>
                        <p class="c-feature-16-desc c-font-grey">
                            <?= $lang['mall_modality_shop_proportion'] ?>
                        </p>
                        <div id="proportion_f4"></div>
                        <a class="c-feature-15-btn btn c-btn btn-lg c-btn-blue c-font-uppercase c-btn-square" href="views/html/user/component/floor-plan-hefei-sbm.php?m=<?= $hefei_sbm ?>&f=4" data-toggle="modal" data-target="#floor_map_F"><?= $lang['mall_open_floor_map'] ?></a>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div id="f3" class="c-content-box c-bg-parallax c-content-feature-16" style="background-image: url(views/assets/base/img/content/mall/hefei-sbm/3F.jpg); margin-bottom: 0;">
        <div class="container">
            <div class="row">
                <div class="col-md-offset-7 col-md-5 col-xs-12">
                    <div class="c-feature-16-container c-bg-white c-bg-opacity-5">
                        <div class="c-feature-16-line c-theme-bg"></div>
                        <h2 class="c-feature-16-title c-font-bold">L3 <?= $lang['mall_hefei_sbm_3'] ?></h2>
                        <p class="c-feature-16-desc">
                            <?= $lang['mall_modality_shop_proportion'] ?>
                        </p>
                        <div id="proportion_f3"></div>
                        <a class="c-feature-15-btn btn c-btn btn-lg c-theme-btn c-font-uppercase c-btn-square" href="views/html/user/component/floor-plan-hefei-sbm.php?m=<?= $hefei_sbm ?>&f=3" data-toggle="modal" data-target="#floor_map_F"><?= $lang['mall_open_floor_map'] ?></a>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div id="f2" class="c-content-box c-bg-parallax c-content-feature-16" style="background-image: url(views/assets/base/img/content/mall/hefei-sbm/2F.jpg); margin-bottom: 0;">
        <div class="container">
            <div class="row">
                <div class="col-md-5 col-xs-12">
                    <div class="c-feature-16-container c-bg-dark c-bg-opacity-4" style="background: url(views/assets/base/img/content/mall/hefei-sbm/mall-bg.jpg) bottom right no-repeat;">
                        <div class="c-feature-16-line c-theme-bg"></div>
                        <h2 class="c-feature-16-title c-font-bold c-font-white">L2 <?= $lang['mall_hefei_sbm_2'] ?></h2>
                        <p class="c-feature-16-desc c-font-grey">
                            <?= $lang['mall_modality_shop_proportion'] ?>
                        </p>
                        <div id="proportion_f2"></div>
                        <a class="c-feature-15-btn btn c-btn btn-lg c-btn-blue c-font-uppercase c-btn-square" href="views/html/user/component/floor-plan-hefei-sbm.php?m=<?= $hefei_sbm ?>&f=2" data-toggle="modal" data-target="#floor_map_F"><?= $lang['mall_open_floor_map'] ?></a>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div id="f1" class="c-content-box c-bg-parallax c-content-feature-16" style="background-image: url(views/assets/base/img/content/mall/hefei-sbm/1F.jpg); margin-bottom: 0;">
        <div class="container">
            <div class="row">
                <div class="col-md-offset-7 col-md-5 col-xs-12">
                    <div class="c-feature-16-container c-bg-white c-bg-opacity-5">
                        <div class="c-feature-16-line c-theme-bg"></div>
                        <h2 class="c-feature-16-title c-font-bold">L1 <?= $lang['mall_hefei_sbm_1'] ?></h2>
                        <p class="c-feature-16-desc">
                            <?= $lang['mall_modality_shop_proportion'] ?>
                        </p>
                        <div id="proportion_f1"></div>
                        <a class="c-feature-15-btn btn c-btn btn-lg c-theme-btn c-font-uppercase c-btn-square" href="views/html/user/component/floor-plan-hefei-sbm.php?m=<?= $hefei_sbm ?>&f=1" data-toggle="modal" data-target="#floor_map_F"><?= $lang['mall_open_floor_map'] ?></a>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div id="fb1" class="c-content-box c-bg-parallax c-content-feature-16" style="background-image: url(views/assets/base/img/content/mall/hefei-sbm/B1F.jpg); margin-bottom: 0;">
        <div class="container">
            <div class="row">
                <div class="col-md-5 col-xs-12">
                    <div class="c-feature-16-container c-bg-dark c-bg-opacity-4" style="background: url(views/assets/base/img/content/mall/hefei-sbm/mall-bg.jpg) bottom right no-repeat;">
                        <div class="c-feature-16-line c-theme-bg"></div>
                        <h2 class="c-feature-16-title c-font-bold c-font-white">LG <?= $lang['mall_hefei_sbm_0'] ?></h2>
                        <p class="c-feature-16-desc c-font-grey">
                            <?= $lang['mall_modality_shop_proportion'] ?>
                        </p>
                        <div id="proportion_fb1"></div>
                        <a class="c-feature-15-btn btn c-btn btn-lg c-btn-blue c-font-uppercase c-btn-square" href="views/html/user/component/floor-plan-hefei-sbm.php?m=<?= $hefei_sbm ?>&f=0" data-toggle="modal" data-target="#floor_map_F"><?= $lang['mall_open_floor_map'] ?></a>
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
                <img class="img-responsive" src="views/assets/base/img/content/mall/hefei-sbm/<?= $lang['mall_lang_cat'] ?>/hf-1.jpg" alt=""><br>
            </div>
            <div class="col-md-3">
                <img class="img-responsive" src="views/assets/base/img/content/mall/hefei-sbm/<?= $lang['mall_lang_cat'] ?>/hf-2.jpg" alt=""><br>
            </div>
            <div class="col-md-3">
                <img class="img-responsive" src="views/assets/base/img/content/mall/hefei-sbm/<?= $lang['mall_lang_cat'] ?>/hf-3.jpg" alt=""><br>
            </div>
            <div class="col-md-3">
                <img class="img-responsive" src="views/assets/base/img/content/mall/hefei-sbm/<?= $lang['mall_lang_cat'] ?>/hf-4.jpg" alt=""><br>
            </div>
        </div>
    </div>

    <div class="c-content-box c-size-lg c-bg-grey-1" style="margin-bottom: 0; z-index: 1;">
        <div class="container">
            <div class="c-content-title-1">
                <h3 class="c-center c-font-bold"><?= $lang['mall_hefei_jingkai'] ?></h3>
            </div>
            <div class="col-md-3">
                <img class="img-responsive" src="views/assets/base/img/content/mall/hefei-sbm/<?= $lang['mall_lang_cat'] ?>/hf-5.jpg" alt=""><br>
            </div>
            <div class="col-md-3">
                <img class="img-responsive" src="views/assets/base/img/content/mall/hefei-sbm/<?= $lang['mall_lang_cat'] ?>/hf-6.jpg" alt=""><br>
            </div>
            <div class="col-md-3">
                <img class="img-responsive" src="views/assets/base/img/content/mall/hefei-sbm/<?= $lang['mall_lang_cat'] ?>/hf-7.jpg" alt=""><br>
            </div>
            <div class="col-md-3">
                <img class="img-responsive" src="views/assets/base/img/content/mall/hefei-sbm/<?= $lang['mall_lang_cat'] ?>/hf-8.jpg" alt=""><br>
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
                                <li class="c-bg-before-red"><?= $lang['mall_hf_grand_hyatt_hotel'] ?> <small><?= $lang['mall_hf_grand_hyatt_hotel_addr'] ?></small></li>
                                <li class="c-bg-before-red"><?= $lang['mall_hf_langham_hotel'] ?> <small><?= $lang['mall_hf_langham_hotel_addr'] ?></small></li>
                                <li class="c-bg-before-red"><?= $lang['mall_hf_iccc_hotel'] ?> <small><?= $lang['mall_hf_iccc_hotel_addr'] ?></small></li>
                                <li class="c-bg-before-red"><?= $lang['mall_hf_fpsheraton_hotel'] ?> <small><?= $lang['mall_hf_fpsheraton_hotel_addr'] ?></small></li>                            
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <a id="f7_g" href="views/html/user/component/floor-plan-hefei-sbm.php?m=<?= $hefei_sbm ?>&f=7" data-toggle="modal" data-target="#floor_map_F" class="hidden-xs hidden-sm hidden-md floor-guide"><span class="badge c-bg-white c-font-red c-font-bold">7F</span><img src="views/assets/base/img/content/floor-plan/hefei-sbm/7F.png" class="img-responsive" alt="" /></a>
    <a id="f6_g" href="views/html/user/component/floor-plan-hefei-sbm.php?m=<?= $hefei_sbm ?>&f=6" data-toggle="modal" data-target="#floor_map_F" class="hidden-xs hidden-sm hidden-md floor-guide"><span class="badge c-bg-white c-font-red c-font-bold">6F</span><img src="views/assets/base/img/content/floor-plan/hefei-sbm/6F.png" class="img-responsive" alt="" /></a>
    <a id="f5_g" href="views/html/user/component/floor-plan-hefei-sbm.php?m=<?= $hefei_sbm ?>&f=5" data-toggle="modal" data-target="#floor_map_F" class="hidden-xs hidden-sm hidden-md floor-guide"><span class="badge c-bg-white c-font-red c-font-bold">5F</span><img src="views/assets/base/img/content/floor-plan/hefei-sbm/5F.png" class="img-responsive" alt="" /></a>
    <a id="f4_g" href="views/html/user/component/floor-plan-hefei-sbm.php?m=<?= $hefei_sbm ?>&f=4" data-toggle="modal" data-target="#floor_map_F" class="hidden-xs hidden-sm hidden-md floor-guide"><span class="badge c-bg-white c-font-red c-font-bold">4F</span><img src="views/assets/base/img/content/floor-plan/hefei-sbm/4F.png" class="img-responsive" alt="" /></a>
    <a id="f3_g" href="views/html/user/component/floor-plan-hefei-sbm.php?m=<?= $hefei_sbm ?>&f=3" data-toggle="modal" data-target="#floor_map_F" class="hidden-xs hidden-sm hidden-md floor-guide"><span class="badge c-bg-white c-font-red c-font-bold">3F</span><img src="views/assets/base/img/content/floor-plan/hefei-sbm/3F.png" class="img-responsive" alt="" /></a>
    <a id="f2_g" href="views/html/user/component/floor-plan-hefei-sbm.php?m=<?= $hefei_sbm ?>&f=2" data-toggle="modal" data-target="#floor_map_F" class="hidden-xs hidden-sm hidden-md floor-guide"><span class="badge c-bg-white c-font-red c-font-bold">2F</span><img src="views/assets/base/img/content/floor-plan/hefei-sbm/2F.png" class="img-responsive" alt="" /></a>
    <a id="f1_g" href="views/html/user/component/floor-plan-hefei-sbm.php?m=<?= $hefei_sbm ?>&f=1" data-toggle="modal" data-target="#floor_map_F" class="hidden-xs hidden-sm hidden-md floor-guide"><span class="badge c-bg-white c-font-red c-font-bold">1F</span><img src="views/assets/base/img/content/floor-plan/hefei-sbm/1F.png" class="img-responsive" alt="" /></a>
    <a id="fb1_g" href="views/html/user/component/floor-plan-hefei-sbm.php?m=<?= $hefei_sbm ?>&f=0" data-toggle="modal" data-target="#floor_map_F" class="hidden-xs hidden-sm hidden-md floor-guide"><span class="badge c-bg-white c-font-red c-font-bold">B1F</span><img src="views/assets/base/img/content/floor-plan/hefei-sbm/0F.png" class="img-responsive" alt="" /></a>

    <div id="floor_map_F" class="modal fade" role="dialog">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-body"></div>
            </div>
        </div>
    </div>
</div>

<?php include ('footer.php'); ?>