<?php
$scripts = $scripts . '<script type="text/javascript" src="views/assets/base/js/luoyang-sbm.js"></script>';
?>

<div class="c-layout-page">
    <div class="c-content-box c-size-md" style="background-image: url(views/assets/base/img/content/backgrounds/body-7.jpg); background-position: left center; margin-bottom: 0; z-index: 1;">
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
                <h3 class="c-center c-font-bold"><?= $lang['mall_luoyang_brief'] ?> & <?= $lang['mall_desc'] ?></h3>
            </div>
            <div class="col-md-4">
                <video loop="loop" autoplay="true" src="upload/video/<?= $lang['mall_lang_cat'] ?>/luoyang-sbm.mp4" controls="true" width="100%"></video><br><br>
                <div class="c-body">
                    <div class="c-section">
                        <div>
                            <span id="street"></span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-8">
                <p><?= $lang['mall_luoyang_brief_p'] ?></p>
                <div class="row">
                    <div class="col-md-4">
                        <h4 class="c-title c-first c-font-bold"><?= $lang['mall_gdp'] ?></h4>
                        <span class="c-counter c-font-bold c-theme-font" data-counter="counterup">
                            4,641
                        </span><?= $lang['mall_yiyuan'] ?>
                    </div>
                    <div class="col-md-4">
                        <h4 class="c-title c-font-bold"><?= $lang['mall_resident_population'] ?></h4>
                        <span class="c-counter c-font-bold c-theme-font" data-counter="counterup">
                            6,823,000
                        </span><?= $lang['mall_ren'] ?>
                    </div>
                    <div class="col-md-4">
                        <h4 class="c-title c-font-bold"><?= $lang['mall_retail_sales'] ?></h4>
                        <span class="c-counter c-font-bold c-theme-font" data-counter="counterup">
                            2,155
                        </span><?= $lang['mall_yiyuan'] ?>
                    </div>
                </div>
                <ul id="mall_desc" class="c-content-list-1 c-theme" style="text-align: left;"></ul>
            </div>
        </div>
    </div>

    <div id="f7" class="c-content-box c-bg-parallax c-content-feature-16" style="background-image: url(views/assets/base/img/content/mall/luoyang-sbm/7F.jpg); margin-bottom: 0;">
        <div class="container">
            <div class="row">
                <div class="col-md-offset-7 col-md-5 col-xs-12">
                    <div class="c-feature-16-container c-bg-white c-bg-opacity-5">
                        <div class="c-feature-16-line c-theme-bg"></div>
                        <h2 class="c-feature-16-title c-font-bold">7F <?= $lang['mall_luoyang_sbm_7'] ?></h2>
                        <img src="/views/assets/base/img/content/mall/ozone/eat_n_work.png" alt="eat n work" class="c-desktop-logo" style="display: block; margin-bottom: 15px;" height="20">
                        <a class="c-feature-15-btn btn c-btn btn-lg c-theme-btn c-font-uppercase c-btn-square" href="http://eatnwork-china.com/ly-space" target="_blank"><?= $lang['home_enter'] ?></a>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div id="f6" class="c-content-box c-bg-parallax c-content-feature-16" style="background-image: url(views/assets/base/img/content/mall/luoyang-sbm/6F.jpg); margin-bottom: 0;">
        <div class="container">
            <div class="row">
                <div class="col-md-5 col-xs-12">
                    <div class="c-feature-16-container c-bg-dark c-bg-opacity-4">
                        <div class="c-feature-16-line c-theme-bg"></div>
                        <h2 class="c-feature-16-title c-font-bold c-font-white">6F <?= $lang['mall_luoyang_sbm_6'] ?></h2>
                        <p class="c-feature-16-desc c-font-grey">
                            <?= $lang['mall_modality_shop_proportion'] ?>
                        </p>
                        <div id="proportion_f6"></div>
                        <a class="c-feature-15-btn btn c-btn btn-lg c-btn-blue c-font-uppercase c-btn-square" href="views/html/user/component/floor-plan-luoyang-sbm.php?m=<?= $luoyang_sbm ?>&f=6" data-toggle="modal" data-target="#floor_map_F"><?= $lang['mall_open_floor_map'] ?></a>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div id="f5" class="c-content-box c-bg-parallax c-content-feature-16" style="background-image: url(views/assets/base/img/content/mall/luoyang-sbm/5F.jpg); margin-bottom: 0;">
        <div class="container">
            <div class="row">
                <div class="col-md-offset-7 col-md-5 col-xs-12">
                    <div class="c-feature-16-container c-bg-white c-bg-opacity-5">
                        <div class="c-feature-16-line c-theme-bg"></div>
                        <h2 class="c-feature-16-title c-font-bold">5F <?= $lang['mall_luoyang_sbm_5'] ?></h2>
                        <p class="c-feature-16-desc">
                            <?= $lang['mall_modality_shop_proportion'] ?>
                        </p>
                        <div id="proportion_f5"></div>
                        <a class="c-feature-15-btn btn c-btn btn-lg c-theme-btn c-font-uppercase c-btn-square" href="views/html/user/component/floor-plan-luoyang-sbm.php?m=<?= $luoyang_sbm ?>&f=5" data-toggle="modal" data-target="#floor_map_F"><?= $lang['mall_open_floor_map'] ?></a>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div id="f4" class="c-content-box c-bg-parallax c-content-feature-16" style="background-image: url(views/assets/base/img/content/mall/luoyang-sbm/4F.jpg); margin-bottom: 0;">
        <div class="container">
            <div class="row">
                <div class="col-md-5 col-xs-12">
                    <div class="c-feature-16-container c-bg-dark c-bg-opacity-4">
                        <div class="c-feature-16-line c-theme-bg"></div>
                        <h2 class="c-feature-16-title c-font-bold c-font-white">4F <?= $lang['mall_luoyang_sbm_4'] ?></h2>
                        <p class="c-feature-16-desc c-font-grey">
                            <?= $lang['mall_modality_shop_proportion'] ?>
                        </p>
                        <div id="proportion_f4"></div>
                        <a class="c-feature-15-btn btn c-btn btn-lg c-btn-blue c-font-uppercase c-btn-square" href="views/html/user/component/floor-plan-luoyang-sbm.php?m=<?= $luoyang_sbm ?>&f=4" data-toggle="modal" data-target="#floor_map_F"><?= $lang['mall_open_floor_map'] ?></a>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div id="f3" class="c-content-box c-bg-parallax c-content-feature-16" style="background-image: url(views/assets/base/img/content/mall/luoyang-sbm/3F.jpg); margin-bottom: 0;">
        <div class="container">
            <div class="row">
                <div class="col-md-offset-7 col-md-5 col-xs-12">
                    <div class="c-feature-16-container c-bg-white c-bg-opacity-5">
                        <div class="c-feature-16-line c-theme-bg"></div>
                        <h2 class="c-feature-16-title c-font-bold">3F <?= $lang['mall_luoyang_sbm_3'] ?></h2>
                        <p class="c-feature-16-desc">
                            <?= $lang['mall_modality_shop_proportion'] ?>
                        </p>
                        <div id="proportion_f3"></div>
                        <a class="c-feature-15-btn btn c-btn btn-lg c-theme-btn c-font-uppercase c-btn-square" href="views/html/user/component/floor-plan-luoyang-sbm.php?m=<?= $luoyang_sbm ?>&f=3" data-toggle="modal" data-target="#floor_map_F"><?= $lang['mall_open_floor_map'] ?></a>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div id="f2" class="c-content-box c-bg-parallax c-content-feature-16" style="background-image: url(views/assets/base/img/content/mall/luoyang-sbm/2F.jpg); margin-bottom: 0;">
        <div class="container">
            <div class="row">
                <div class="col-md-5 col-xs-12">
                    <div class="c-feature-16-container c-bg-dark c-bg-opacity-4">
                        <div class="c-feature-16-line c-theme-bg"></div>
                        <h2 class="c-feature-16-title c-font-bold c-font-white">2F <?= $lang['mall_luoyang_sbm_2'] ?></h2>
                        <p class="c-feature-16-desc c-font-grey">
                            <?= $lang['mall_modality_shop_proportion'] ?>
                        </p>
                        <div id="proportion_f2"></div>
                        <a class="c-feature-15-btn btn c-btn btn-lg c-btn-blue c-font-uppercase c-btn-square" href="views/html/user/component/floor-plan-luoyang-sbm.php?m=<?= $luoyang_sbm ?>&f=2" data-toggle="modal" data-target="#floor_map_F"><?= $lang['mall_open_floor_map'] ?></a>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div id="f1" class="c-content-box c-bg-parallax c-content-feature-16" style="background-image: url(views/assets/base/img/content/mall/luoyang-sbm/1F.jpg); margin-bottom: 0;">
        <div class="container">
            <div class="row">
                <div class="col-md-offset-7 col-md-5 col-xs-12">
                    <div class="c-feature-16-container c-bg-white c-bg-opacity-5">
                        <div class="c-feature-16-line c-theme-bg"></div>
                        <h2 class="c-feature-16-title c-font-bold">1F <?= $lang['mall_luoyang_sbm_1'] ?></h2>
                        <p class="c-feature-16-desc">
                            <?= $lang['mall_modality_shop_proportion'] ?>
                        </p>
                        <div id="proportion_f1"></div>
                        <a class="c-feature-15-btn btn c-btn btn-lg c-theme-btn c-font-uppercase c-btn-square" href="views/html/user/component/floor-plan-luoyang-sbm.php?m=<?= $luoyang_sbm ?>&f=1" data-toggle="modal" data-target="#floor_map_F"><?= $lang['mall_open_floor_map'] ?></a>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div id="fb1" class="c-content-box c-bg-parallax c-content-feature-16" style="background-image: url(views/assets/base/img/content/mall/luoyang-sbm/B1F.jpg); margin-bottom: 0;">
        <div class="container">
            <div class="row">
                <div class="col-md-5 col-xs-12">
                    <div class="c-feature-16-container c-bg-dark c-bg-opacity-4">
                        <div class="c-feature-16-line c-theme-bg"></div>
                        <h2 class="c-feature-16-title c-font-bold c-font-white">B1F <?= $lang['mall_luoyang_sbm_0'] ?></h2>
                        <p class="c-feature-16-desc c-font-grey">
                            <?= $lang['mall_modality_shop_proportion'] ?>
                        </p>
                        <div id="proportion_fb1"></div>
                        <a class="c-feature-15-btn btn c-btn btn-lg c-btn-blue c-font-uppercase c-btn-square" href="views/html/user/component/floor-plan-luoyang-sbm.php?m=<?= $luoyang_sbm ?>&f=0" data-toggle="modal" data-target="#floor_map_F"><?= $lang['mall_open_floor_map'] ?></a>
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
                <img class="img-responsive" src="views/assets/base/img/content/mall/luoyang-sbm/<?= $lang['mall_lang_cat'] ?>/ly-5.jpg" alt=""><br>
            </div>
            <div class="col-md-3">
                <img class="img-responsive" src="views/assets/base/img/content/mall/luoyang-sbm/<?= $lang['mall_lang_cat'] ?>/ly-6.jpg" alt=""><br>
            </div>
            <div class="col-md-3">
                <img class="img-responsive" src="views/assets/base/img/content/mall/luoyang-sbm/<?= $lang['mall_lang_cat'] ?>/ly-7.jpg" alt=""><br>
            </div>
            <div class="col-md-3">
                <img class="img-responsive" src="views/assets/base/img/content/mall/luoyang-sbm/<?= $lang['mall_lang_cat'] ?>/ly-8.jpg" alt=""><br>
            </div>
        </div>
    </div>

    <div class="c-content-box c-size-lg c-bg-grey-1" style="margin-bottom: 0; z-index: 1;">
        <div class="container">
            <div class="c-content-title-1">
                <h3 class="c-center c-font-bold"><?= $lang['mall_luoyang_luolong'] ?></h3>
            </div>
            <div class="col-md-3">
                <img class="img-responsive" src="views/assets/base/img/content/mall/luoyang-sbm/<?= $lang['mall_lang_cat'] ?>/ly-1.jpg" alt=""><br>
            </div>
            <div class="col-md-3">
                <img class="img-responsive" src="views/assets/base/img/content/mall/luoyang-sbm/<?= $lang['mall_lang_cat'] ?>/ly-2.jpg" alt=""><br>
            </div>
            <div class="col-md-3">
                <img class="img-responsive" src="views/assets/base/img/content/mall/luoyang-sbm/<?= $lang['mall_lang_cat'] ?>/ly-3.jpg" alt=""><br>
            </div>
            <div class="col-md-3">
                <img class="img-responsive" src="views/assets/base/img/content/mall/luoyang-sbm/<?= $lang['mall_lang_cat'] ?>/ly-4.jpg" alt=""><br>
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
                                <li class="c-bg-before-red"><a href="#!"><?= $lang['mall_ly_lee_royal_hotel'] ?></a> <small><?= $lang['mall_ly_lee_royal_hotel_addr'] ?></small></li>
                                <li class="c-bg-before-red"><a href="http://www.lydongshanhotel.cn/" target="_blank"><?= $lang['mall_ly_dongshan_hotel'] ?></a> <small><?= $lang['mall_ly_dongshan_hotel_addr'] ?></small></li>
                                <li class="c-bg-before-red"><a href="#!"><?= $lang['mall_ly_yading_peninsula_hotel'] ?></a> <small><?= $lang['mall_ly_yading_peninsula_hotel_addr'] ?></small></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <a id="f7_g" href="views/html/user/component/floor-plan-luoyang-sbm.php?m=<?= $luoyang_sbm ?>&f=7" data-toggle="modal" data-target="#floor_map_F" class="hidden-xs hidden-sm hidden-md floor-guide"><span class="badge c-bg-white c-font-red c-font-bold">7F</span><img src="views/assets/base/img/content/floor-plan/luoyang-sbm/<?= $lang['mall_lang_cat'] ?>/7F.png" class="img-responsive" alt="" /></a>
    <a id="f6_g" href="views/html/user/component/floor-plan-luoyang-sbm.php?m=<?= $luoyang_sbm ?>&f=6" data-toggle="modal" data-target="#floor_map_F" class="hidden-xs hidden-sm hidden-md floor-guide"><span class="badge c-bg-white c-font-red c-font-bold">6F</span><img src="views/assets/base/img/content/floor-plan/luoyang-sbm/<?= $lang['mall_lang_cat'] ?>/6F.png" class="img-responsive" alt="" /></a>
    <a id="f5_g" href="views/html/user/component/floor-plan-luoyang-sbm.php?m=<?= $luoyang_sbm ?>&f=5" data-toggle="modal" data-target="#floor_map_F" class="hidden-xs hidden-sm hidden-md floor-guide"><span class="badge c-bg-white c-font-red c-font-bold">5F</span><img src="views/assets/base/img/content/floor-plan/luoyang-sbm/<?= $lang['mall_lang_cat'] ?>/5F.png" class="img-responsive" alt="" /></a>
    <a id="f4_g" href="views/html/user/component/floor-plan-luoyang-sbm.php?m=<?= $luoyang_sbm ?>&f=4" data-toggle="modal" data-target="#floor_map_F" class="hidden-xs hidden-sm hidden-md floor-guide"><span class="badge c-bg-white c-font-red c-font-bold">4F</span><img src="views/assets/base/img/content/floor-plan/luoyang-sbm/<?= $lang['mall_lang_cat'] ?>/4F.png" class="img-responsive" alt="" /></a>
    <a id="f3_g" href="views/html/user/component/floor-plan-luoyang-sbm.php?m=<?= $luoyang_sbm ?>&f=3" data-toggle="modal" data-target="#floor_map_F" class="hidden-xs hidden-sm hidden-md floor-guide"><span class="badge c-bg-white c-font-red c-font-bold">3F</span><img src="views/assets/base/img/content/floor-plan/luoyang-sbm/<?= $lang['mall_lang_cat'] ?>/3F.png" class="img-responsive" alt="" /></a>
    <a id="f2_g" href="views/html/user/component/floor-plan-luoyang-sbm.php?m=<?= $luoyang_sbm ?>&f=2" data-toggle="modal" data-target="#floor_map_F" class="hidden-xs hidden-sm hidden-md floor-guide"><span class="badge c-bg-white c-font-red c-font-bold">2F</span><img src="views/assets/base/img/content/floor-plan/luoyang-sbm/<?= $lang['mall_lang_cat'] ?>/2F.png" class="img-responsive" alt="" /></a>
    <a id="f1_g" href="views/html/user/component/floor-plan-luoyang-sbm.php?m=<?= $luoyang_sbm ?>&f=1" data-toggle="modal" data-target="#floor_map_F" class="hidden-xs hidden-sm hidden-md floor-guide"><span class="badge c-bg-white c-font-red c-font-bold">1F</span><img src="views/assets/base/img/content/floor-plan/luoyang-sbm/<?= $lang['mall_lang_cat'] ?>/1F.png" class="img-responsive" alt="" /></a>
    <a id="fb1_g" href="views/html/user/component/floor-plan-luoyang-sbm.php?m=<?= $luoyang_sbm ?>&f=0" data-toggle="modal" data-target="#floor_map_F" class="hidden-xs hidden-sm hidden-md floor-guide"><span class="badge c-bg-white c-font-red c-font-bold">B1F</span><img src="views/assets/base/img/content/floor-plan/luoyang-sbm/<?= $lang['mall_lang_cat'] ?>/0F.png" class="img-responsive" alt="" /></a>

    <div id="floor_map_F" class="modal fade" role="dialog">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-body"></div>
            </div>
        </div>
    </div>
</div>

<?php include ('footer.php'); ?>