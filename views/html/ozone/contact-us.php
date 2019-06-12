<?php
$scripts = $scripts. '<script type="text/javascript" src="/views/assets/base/js/ozone/contact-us.js"></script>';
?>

<div class="c-layout-page">
    <img style="width: 100%;" src="/views/assets/base/img/content/mall/ozone/contact_us.jpg" alt="" />
    <div class="c-content-box c-size-md c-bg-grey-1" style="margin-bottom: 0; z-index: 11; padding: 0;">
        <div class="container">
            <div class="col-md-6" style="padding: 40px 50px;">
                <img src="/views/assets/base/img/content/mall/ozone/sh-intro.jpg" class="img-responsive" />
            </div>
            
            <div id="contact_us" class="col-md-6" style="padding: 0;">
                <div class="modal-dialog" style="width: auto; margin: 0;">
                    <div class="modal-content c-square" style="background-color: #fff; box-shadow: none; border: 1px solid rgb(240, 240, 240); padding: 0;">
                        <div class="modal-body" style="padding: 20px 40px;">
                            <h1 class="c-font-44 c-font-sbold"><?= $lang['co_work_welcome_to'] ?> <img src="/views/assets/base/img/content/mall/ozone/eat_n_work.png" alt="eat n work" height="25" /></h1>
                            <p><?= $lang['co_work_leave_contact'] ?></p>
                            <?php include ('contact_us_form.php'); ?>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="c-content-box c-size-md c-bg-white" style="margin-bottom: 0;">
        <div class="container">
            <div class="c-content-product-1 c-opt-1">
                <div class="c-content-title-1">
                    <h3 class="c-center c-font-uppercase c-font-bold"><?= $lang['co_work_contact_us'] ?></h3>
                </div>
                <div class="c-content-bar-1 c-opt-1">
                    <h3>
                        <i class="icon-call-end c-theme-font"></i> 4000-069-800
                    </h3>
                    <a class="btn btn-md c-btn-square c-btn-border-2x" href="https://weibo.com/u/7099203912" target="_blank"><img class="img-responsive" src="/views/assets/base/img/content/mall/ozone/weibo.jpg" alt="微博" /></a>
                    <a class="btn btn-md c-btn-square c-btn-border-2x" href="#!"><img class="img-responsive" src="/views/assets/base/img/content/mall/ozone/wechat.jpg" alt="微信" /></a>
                </div>
            </div>
        </div>
    </div>
    
    <?php include ('contact_bar.php'); ?>
</div>

<?php include ('footer.php'); ?>