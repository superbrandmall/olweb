<?php
$scripts = $scripts. '<script type="text/javascript" src="/views/assets/plugins/owl-carousel/owl.carousel.min.js"></script>'
        . '<script type="text/javascript" src="/views/assets/base/js/ozone/co-work.js"></script>';
?>
<link href="/views/assets/plugins/owl-carousel/owl.carousel.css" rel="stylesheet" type="text/css" media="all" />
<link href="/views/assets/plugins/owl-carousel/owl.theme.css" rel="stylesheet" type="text/css" media="all" />
<link href="/views/assets/plugins/owl-carousel/owl.transitions.css" rel="stylesheet" type="text/css" media="all" />

<div class="c-layout-page">
    <img style="width: 100%;" src="/views/assets/base/img/content/mall/ozone/<?= $lang['mall_lang_cat'] ?>/cowork2.jpg" alt="" />
    <div id="abt_eat_n_work" class="c-content-box c-size-md c-bg-grey-1" style="margin-bottom: 0; z-index: 11; padding: 0;">
        <div class="container">
            <div class="col-md-6" style="padding: 50px;">
                <img src="/views/assets/base/img/content/mall/ozone/<?= $lang['mall_lang_cat'] ?>/eatnwork-intro.jpg" class="img-responsive" />
            </div>
            
            <div id="contact_us" class="col-md-6" style="padding: 0;">
                <div class="modal-dialog" style="width: auto; margin: 0;">
                    <div class="modal-content c-square" style="background-color: #fff; box-shadow: none; border: 1px solid rgb(240, 240, 240); padding: 0;">
                        <div class="modal-body" style="padding: 20px 40px;">
                            <h1 class="c-font-44 c-font-sbold"><?= $lang['co_work_welcome_to'] ?> <img src="/views/assets/base/img/content/mall/ozone/eat_n_work.png" alt="eat n work" height="25" /></h1>
                            <p class="c-font-14"><?= $lang['co_work_sbm_ljz'] ?> | <?= $lang['co_work_sbm_ljz_addr'] ?></p>
                            <hr>
                            <p><?= $lang['co_work_leave_contact'] ?></p>
                            <?php include ('contact_us_form.php'); ?>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <div id="grids" class="c-content-box c-size-md" style="margin-bottom: 0; background-color: #fff; z-index: 11; padding-bottom: 0;">
        <div class="container">
            <div class="c-content-title-1">
                <h3 class="c-center c-font-uppercase c-font-bold"><?= $lang['co_work_we_different'] ?></h3>
                <p class="c-center">
                    <?= $lang['co_work_we_different_p1'] ?>
                </p>
                <p class="c-center">
                    <?= $lang['co_work_we_different_p2'] ?>
                </p>
                <p class="c-center">
                    <?= $lang['co_work_we_different_p3'] ?>
                </p>
            </div><br>
        </div>
        <img style="width: 100%;" src="/views/assets/base/img/content/mall/ozone/<?= $lang['mall_lang_cat'] ?>/grid1.jpg" alt="" /><br><br>
        <img style="width: 100%;" src="/views/assets/base/img/content/mall/ozone/<?= $lang['mall_lang_cat'] ?>/grid2.jpg" alt="" /><br><br>
        <img style="width: 100%;" src="/views/assets/base/img/content/mall/ozone/<?= $lang['mall_lang_cat'] ?>/grid3.jpg" alt="" />
    </div>
    
    <div id="we_offer" class="c-content-box c-size-md c-bg-grey-1" style="margin-bottom: 0; padding: 60px 0;">
        <div class="container">
            <div class="c-content-title-1">
                <h3 class="c-center c-font-bold">
                    eat n work <?= $lang['co_work_tastebuds_experience'] ?>
                </h3>
                <p class="c-center">
                    <?= $lang['co_work_tastebuds_experience_p1'] ?>
                </p>
                <p class="c-center">
                    <?= $lang['co_work_tastebuds_experience_p2'] ?>
                </p>
                <p class="c-center">
                    <?= $lang['co_work_tastebuds_experience_p3'] ?>
                </p>
            </div><br>
            <div class="cbp-panel">
                <div id="grid-container" class="c-content-latest-works cbp cbp-l-grid-masonry-projects">
                    <div class="cbp-item">
                        <div class="cbp-caption">
                            <div class="cbp-caption-defaultWrap">
                                <img src="/views/assets/base/img/content/mall/ozone/food1.jpg" alt="">
                            </div>
                        </div>
                    </div>
                    <div class="cbp-item">
                        <div class="cbp-caption">
                            <div class="cbp-caption-defaultWrap">
                                <img src="/views/assets/base/img/content/mall/ozone/food2.jpg" alt="">
                            </div>
                        </div>
                    </div>
                    <div class="cbp-item">
                        <div class="cbp-caption">
                            <div class="cbp-caption-defaultWrap">
                                <img src="/views/assets/base/img/content/mall/ozone/food3.jpg" alt="">
                            </div>
                            <div class="cbp-caption-activeWrap">
                                <div class="c-masonry-border">
                                </div>
                                <div class="cbp-l-caption-alignCenter">
                                    <div class="cbp-l-caption-body">
                                        <p class="c-font-white">取餐区</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="cbp-item">
                        <div class="cbp-caption">
                            <div class="cbp-caption-defaultWrap">
                                <img src="/views/assets/base/img/content/mall/ozone/food4.jpg" alt="">
                            </div>
                        </div>
                    </div>
                    <div class="cbp-item">
                        <div class="cbp-caption">
                            <div class="cbp-caption-defaultWrap">
                                <img src="/views/assets/base/img/content/mall/ozone/food5.jpg" alt="">
                            </div>
                            <div class="cbp-caption-activeWrap">
                                <div class="c-masonry-border">
                                </div>
                                <div class="cbp-l-caption-alignCenter">
                                    <div class="cbp-l-caption-body">
                                        <p class="c-font-white">私董VIP包厢</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="cbp-item">
                        <div class="cbp-caption">
                            <div class="cbp-caption-defaultWrap">
                                <img src="/views/assets/base/img/content/mall/ozone/food6.jpg" alt="">
                            </div>
                            <div class="cbp-caption-activeWrap">
                                <div class="c-masonry-border"> 
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="cbp-item">
                        <div class="cbp-caption">
                            <div class="cbp-caption-defaultWrap">
                                <img src="/views/assets/base/img/content/mall/ozone/food7.jpg" alt="">
                            </div>
                            <div class="cbp-caption-activeWrap">
                                <div class="c-masonry-border">
                                </div>
                                <div class="cbp-l-caption-alignCenter">
                                    <div class="cbp-l-caption-body">
                                        <p class="c-font-white">多元化社交就餐区</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <div class="c-content-box c-size-md c-bg-white" style="margin-bottom: 0;">
        <div class="container">
            <div class="c-content-title-1">
                <h3 class="c-center c-font-uppercase c-font-bold"><?= $lang['co_work_causal_dining'] ?></h3>
                <h4 class="c-center c-font-uppercase c-font-bold"><?= $lang['co_work_causal_dining_p1'] ?> <img src="/views/assets/base/img/content/mall/ozone/eat_n_work.png" alt="eat n work" height="12" style="margin-bottom: 3px;" /></h4>
                <div class="c-center c-font-18">
                    <?= $lang['co_work_causal_dining_p2'] ?>
                </div>
            </div>
            <div class="row c-margin-t-60">
                <div class="col-md-12">
                    <div class="c-content-testimonial-2-slider" data-slider="owl1" data-single-item="true" data-auto-play="6000">
                        <div class="c-title c-font-bold c-theme-bg" style="font-size: 12px;">
                            <?= $lang['co_work_star_chef'] ?>
                        </div>
                        <div class="owl-carousel owl-theme c-theme owl-single">
                            <div class="item">
                                <div class="col-md-4">
                                    <div class="c-content-testimonial-2" style="padding: 50px 30px 40px 30px;">
                                        <div class="c-testimonial c-font-uppercase c-font-bold" style="margin: 20px 0;">
                                            Jacqueline Qiu
                                        </div>
                                        <div class="c-author">
                                            <div class="c-portrait" style="background-image: url(/views/assets/base/img/content/mall/ozone/cook2.jpg)">
                                            </div>
                                            <div class="c-name" style="margin-top: -20px;">
                                                <?= $lang['co_work_jacqueline_qiu'] ?>
                                            </div>
                                            <p class="c-position c-theme" style="margin-left: 75px;">
                                                <?= $lang['co_work_jacqueline_qiu_intro'] ?>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <img class="img-responsive" src="/views/assets/base/img/content/mall/ozone/cook21.jpg" alt="">
                                </div>
                                <div class="col-md-4">
                                    <img class="img-responsive" src="/views/assets/base/img/content/mall/ozone/cook22.jpg" alt="">
                                </div>
                            </div>
                            <div class="item">
                                <div class="col-md-4">
                                    <div class="c-content-testimonial-2" style="padding: 50px 30px 40px 30px;">
                                        <div class="c-testimonial c-font-uppercase c-font-bold" style="margin: 20px 0;">
                                            Sunny Yu
                                        </div>
                                        <div class="c-author">
                                            <div class="c-portrait" style="background-image: url(/views/assets/base/img/content/mall/ozone/cook3.jpg)">
                                            </div>
                                            <div class="c-name" style="margin-top: -20px;">
                                                <?= $lang['co_work_sunny_yu'] ?>
                                            </div>
                                            <p class="c-position c-theme" style="margin-left: 75px;">
                                                <?= $lang['co_work_sunny_yu_intro'] ?>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="col-md-4">
                                    <img class="img-responsive" src="/views/assets/base/img/content/mall/ozone/cook31.jpg" alt="">
                                </div>
                                
                                <div class="col-md-4">
                                    <img class="img-responsive" src="/views/assets/base/img/content/mall/ozone/cook32.jpg" alt="">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <div class="c-content-box c-size-lg c-bg-parallax" style="background-image: url(/views/assets/base/img/content/mall/ozone/Organic-VEG.jpg); margin-bottom: 0;">
        <div class="container">
            <div class="c-content-title-1">
                <h3 class="c-center c-font-uppercase c-font-white c-font-bold"><?= $lang['co_work_cp_foods'] ?></h3>
                <div class="c-center c-font-24 c-font-white">
                    <?= $lang['co_work_cp_foods_p'] ?>
                </div>
            </div>
        </div>
    </div>
    
    <?php include ('contact_bar.php'); ?>
</div>

<?php include ('footer.php'); ?>