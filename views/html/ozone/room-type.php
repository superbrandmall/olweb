<?php
$scripts = $scripts. '<script type="text/javascript" src="/views/assets/base/js/ozone/room-type.js"></script>';
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
    
    <div class="c-content-box c-size-md c-bg-white" style="margin-bottom: 0;">
        <div class="container">
            <div class="c-content-title-1">
                <h3 class="c-center c-font-uppercase c-font-bold"><?= $lang['co_work_recommend_top_office'] ?></h3>
            </div><br>
            <div class="row">
                <div class="col-md-6">
                    <div class="c-center c-desc">
                        <p><?= $lang['co_work_luxurious_office'] ?></p>
                    </div>
                    <img src="/views/assets/base/img/content/mall/ozone/work-space-1.jpg"  class="c-content-person-1 c-option-2 c-bordered c-shadow img-responsive" style="background-color: #fff;" />
                </div>
                <div class="col-md-6">
                    <div class="c-center c-desc">
                        <p><?= $lang['co_work_atrium_office'] ?></p>
                    </div>
                    <img src="/views/assets/base/img/content/mall/ozone/work-space-2.jpg"  class="c-content-person-1 c-option-2 c-bordered c-shadow img-responsive" style="background-color: #fff;" />
                </div>
            </div><br>
            <div class="row">
                <div class="col-md-6">
                    <div class="c-center c-desc">
                        <p><?= $lang['co_work_10_pax_office'] ?></p>
                    </div>
                    <img src="/views/assets/base/img/content/mall/ozone/work-space-3.jpg"  class="c-content-person-1 c-option-2 c-bordered c-shadow img-responsive" style="background-color: #fff;" />
                </div>
                <div class="col-md-6">
                    <div class="c-center c-desc">
                        <p><?= $lang['co_work_5_pax_office'] ?></p>
                    </div>
                    <img src="/views/assets/base/img/content/mall/ozone/work-space-4.jpg"  class="c-content-person-1 c-option-2 c-bordered c-shadow img-responsive" style="background-color: #fff;" />
                </div>
            </div>
        </div>
    </div>
    
    <div class="c-content-box c-size-md c-bg-grey-1" style="margin-bottom: 0;">
        <div class="container">
            <div class="col-md-12">
                <div class="c-title c-center c-font-bold c-font-uppercase" style="font-size: 30px; margin: 20px 0 30px 0;">
                    <?= $lang['co_work_popup_store'] ?>（9/15<?= $lang['co_work_person'] ?>）
                </div>
            </div>
            <div class="col-md-4">
                <img src="/views/assets/base/img/content/mall/ozone/work-space-6.jpg"  class="c-content-person-1 c-option-2 c-bordered c-shadow img-responsive" style="background-color: #fff;" />
            </div>
            <div class="col-md-8">
                <div class="table-responsive">
                    <table class="table">
                        <thead>
                            <tr>
                                <th></th>
                                <th>
                                    901#
                                </th>
                                <th>
                                    901+902#
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">
                                    <?= $lang['co_work_area'] ?>
                                </th>
                                <td>
                                    36㎡
                                </td>
                                <td>
                                    70㎡
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">
                                    <?= $lang['co_work_recommend_number_of_person'] ?>
                                </th>
                                <td>
                                    9<?= $lang['co_work_person'] ?>
                                </td>
                                <td>
                                    15<?= $lang['co_work_person'] ?>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">
                                    <?= $lang['co_work_unit_rental_fee'] ?>
                                </th>
                                <td>
                                    <?= $lang['co_work_approx'] ?>30<?= $lang['co_work_rmb'] ?>/㎡/<?= $lang['co_work_day'] ?>
                                </td>
                                <td>
                                    <?= $lang['co_work_approx'] ?>25<?= $lang['co_work_rmb'] ?>/㎡/<?= $lang['co_work_day'] ?>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">
                                    <?= $lang['co_work_unit_property_management_fee'] ?>
                                </th>
                                <td>
                                    <?= $lang['co_work_approx'] ?>30<?= $lang['co_work_rmb'] ?>㎡/<?= $lang['co_work_month'] ?>
                                </td>
                                <td>
                                    <?= $lang['co_work_approx'] ?>30<?= $lang['co_work_rmb'] ?>/㎡/<?= $lang['co_work_month'] ?>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">
                                    <?= $lang['co_work_total_monthly_rental'] ?>
                                </th>
                                <td>
                                    <?= $lang['co_work_approx'] ?>35,025<?= $lang['co_work_rmb'] ?>
                                </td>
                                <td>
                                    <?= $lang['co_work_approx'] ?>55,329<?= $lang['co_work_rmb'] ?>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">
                                    <?= $lang['co_work_special_feature'] ?>
                                </th>
                                <td>
                                    <?= $lang['co_work_special_feature_popup_901'] ?>
                                </td>
                                <td>
                                    <?= $lang['co_work_special_feature_popup_901902'] ?>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    
    <div class="c-content-box c-size-md c-bg-white" style="margin-bottom: 0;">
        <div class="container">
            <div class="col-md-12">
                <div class="c-title c-center c-font-bold c-font-uppercase" style="font-size: 30px; margin: 20px 0 30px 0;">
                    <?= $lang['co_work_customised_office'] ?> （44/18/140<?= $lang['co_work_person'] ?>）
                </div>
            </div>
            <div class="col-md-4">
                <img src="/views/assets/base/img/content/mall/ozone/work-space-7.jpg"  class="c-content-person-1 c-option-2 c-bordered c-shadow img-responsive" style="background-color: #fff;" />
            </div>
            <div class="col-md-8">
                <div class="table-responsive">
                    <table class="table">
                        <thead>
                            <tr>
                                <th></th>
                                <th>
                                    <?= $lang['co_work_orange_area'] ?>
                                </th>
                                <th>
                                    <?= $lang['co_work_blue_area'] ?>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">
                                    <?= $lang['co_work_area'] ?>
                                </th>
                                <td>
                                    220㎡
                                </td>
                                <td>
                                    70㎡
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">
                                    <?= $lang['co_work_recommend_number_of_person'] ?>
                                </th>
                                <td>
                                    44<?= $lang['co_work_person'] ?>
                                </td>
                                <td>
                                    18<?= $lang['co_work_person'] ?>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">
                                    <?= $lang['co_work_unit_rental_fee'] ?>
                                </th>
                                <td>
                                    <?= $lang['co_work_approx'] ?>16<?= $lang['co_work_rmb'] ?>/㎡/<?= $lang['co_work_day'] ?>
                                </td>
                                <td>
                                    <?= $lang['co_work_approx'] ?>19<?= $lang['co_work_rmb'] ?>/㎡/<?= $lang['co_work_day'] ?>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">
                                    <?= $lang['co_work_unit_property_management_fee'] ?>
                                </th>
                                <td>
                                    <?= $lang['co_work_approx'] ?>30<?= $lang['co_work_rmb'] ?>/㎡/<?= $lang['co_work_month'] ?>
                                </td>
                                <td>
                                    <?= $lang['co_work_approx'] ?>30<?= $lang['co_work_rmb'] ?>/㎡/<?= $lang['co_work_month'] ?>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">
                                    <?= $lang['co_work_total_monthly_rental'] ?>
                                </th>
                                <td>
                                    <?= $lang['co_work_approx'] ?>113,666<?= $lang['co_work_rmb'] ?>
                                </td>
                                <td>
                                    <?= $lang['co_work_approx'] ?>42,554<?= $lang['co_work_rmb'] ?>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">
                                    <?= $lang['co_work_special_feature'] ?>
                                </th>
                                <td>
                                    <?= $lang['co_work_special_feature_orange'] ?>
                                </td>
                                <td>
                                    <?= $lang['co_work_special_feature_blue'] ?>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="col-md-4">
                    <img src="/views/assets/base/img/content/mall/ozone/work-space-5.jpg"  class="c-content-person-1 c-option-2 c-bordered c-shadow img-responsive" style="background-color: #fff;" />
                </div>
                <div class="col-md-5">
                    <div class="table-responsive">
                        <table class="table">
                            <tbody>
                                <tr>
                                    <th scope="row">
                                        <?= $lang['co_work_area'] ?>
                                    </th>
                                    <td>
                                        560㎡
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">
                                        <?= $lang['co_work_recommend_number_of_person'] ?>
                                    </th>
                                    <td>
                                        140<?= $lang['co_work_person'] ?>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">
                                        <?= $lang['co_work_unit_rental_fee'] ?>
                                    </th>
                                    <td>
                                        <?= $lang['co_work_approx'] ?>13<?= $lang['co_work_rmb'] ?>/㎡/<?= $lang['co_work_day'] ?>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">
                                        <?= $lang['co_work_unit_property_management_fee'] ?>
                                    </th>
                                    <td>
                                        <?= $lang['co_work_approx'] ?>25<?= $lang['co_work_rmb'] ?>/㎡/<?= $lang['co_work_month'] ?>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">
                                        <?= $lang['co_work_total_monthly_rental'] ?>
                                    </th>
                                    <td>
                                        <?= $lang['co_work_approx'] ?>235,433<?= $lang['co_work_rmb'] ?>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <?php include ('contact_bar.php'); ?>
</div>
    
<?php include ('footer.php'); ?>