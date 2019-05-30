<?php
$scripts = $scripts. '<script type="text/javascript" src="/views/assets/base/js/ozone/sh-space.js"></script>';
?>

<div class="c-layout-page">
    <img style="width: 100%;" src="/views/assets/base/img/content/mall/ozone/cowork5.jpg" alt="" />
    <div class="c-content-box c-size-md c-bg-grey-1" style="margin-bottom: 0; z-index: 11; padding: 0;">
        <div class="container">
            <div class="col-md-6" style="padding: 100px 50px 50px;">
                <img src="/views/assets/base/img/content/mall/ozone/sh-intro.jpg" class="img-responsive" />
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
    
    <div class="c-content-box c-size-lg c-bg-parallax" style="background-image: url(/views/assets/base/img/content/mall/ozone/sh-1.jpg); padding: 200px 0; z-index: 11;"></div>
    <div class="c-content-box c-size-lg c-bg-parallax" style="background-image: url(/views/assets/base/img/content/mall/ozone/sh-2.jpg); margin-bottom: 0; padding: 200px 0;"></div>
    
    <div class="c-content-box c-size-md c-bg-grey-1" style="margin-bottom: 0;">
        <div class="container">
            <div class="row">
                <div class="c-content-title-1">
                    <h3 class="c-font-uppercase c-center c-font-bold">Location</h3>
                </div>
                <br>
                <div class="col-md-8 col-md-offset-2">
                    <img src="/views/assets/base/img/content/mall/ozone/map-sh.jpg" class="img-responsive" style="margin: 0 auto;" />
                </div>
            </div>
        </div>
    </div>
    
    <div class="c-content-box c-size-md" style="padding: 12px 0 0; margin-bottom: 0; background-color: #fff;">
        <div class="container">
            <div class="c-content-subscribe-form-1">
                <div class="row">
                    <div class="col-sm-12">
                        <h1 class="c-center c-font-bold">go where?  eat or work?  let’s go to eat n work!</h1>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <?php include ('contact_bar.php'); ?>
</div>
    
<?php include ('footer.php'); ?>