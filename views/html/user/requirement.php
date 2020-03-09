<?php
$scripts = $scripts . '<script type="text/javascript" src="views/assets/base/js/requirement.js"></script>'
        . '<script src="views/assets/plugins/datepicker/bootstrap-datepicker.min.js" type="text/javascript"></script>'
        . '<script src="views/assets/plugins/datepicker/bootstrap-datepicker.zh-CN.min.js" type="text/javascript"></script>';
?>
<link href="views/assets/plugins/datepicker/bootstrap-datepicker.css" rel="stylesheet" type="text/css" media="all" />

<div class="c-layout-page">
    <div class="c-content-box c-size-md c-no-padding" style="margin: 20px 0 0;">
        <div class="container">
            <div class="c-content-feedback-1 c-option-2">
                <div class="row">
                    <div class="col-md-3">
                        <div class="c-contact">
                            <div class="c-content-title-1">
                                <h3 class="c-font-bold"><i class="fas fa-store-alt c-font-dark"></i> <?= $lang['search_search_shops'] ?></h3>
                            </div>
                            <form id="requirement_form">
                                <div class="form-group">
                                    <p><?= $lang['search_sub_type'] ?></p>
                                    <select id="subtype" name="subtype" class="form-control c-square c-theme input-sm" required>
                                        <option value=""><?= $lang['search_sub_type'] ?>*</option>
                                        <option value="正柜" selected="selected"><?= $lang['search_sub_type_store'] ?></option>
                                        <option value="kiosk"><?= $lang['search_sub_type_kiosk'] ?></option>
                                    </select>
                                    <div id="errorcontainer-subtype" class="errorDiv"></div>
                                </div>
                                <div class="form-group">
                                    <p><?= $lang['search_leasable_area'] ?></p>
                                    <div class="input-group" style="width: auto;">
                                        <select id="min_area" name="min_area" class="form-control c-square c-theme input-sm">
                                            <option value="0">0 m&sup2;</option>
                                            <option value="25">25 m&sup2;</option>
                                            <option value="100">100 m&sup2;</option>
                                            <option value="250">250 m&sup2;</option>
                                            <option value="550">550 m&sup2;</option>
                                            <option value="1000">1000 m&sup2;</option>
                                            <option value="1500">1500 m&sup2;</option>
                                            <option value="3000">3000 m&sup2;</option>
                                        </select>
                                        <span class="input-group-addon">-</span>
                                        <select id="max_area" name="max_area" class="form-control c-square c-theme input-sm">
                                            <option value="0">0 m&sup2;</option>
                                            <option value="25">25 m&sup2;</option>
                                            <option value="100">100 m&sup2;</option>
                                            <option value="250">250 m&sup2;</option>
                                            <option value="550">550 m&sup2;</option>
                                            <option value="1000">1000 m&sup2;</option>
                                            <option value="1500">1500 m&sup2;</option>
                                            <option value="3000" selected>3000 m&sup2;</option>
                                        </select>
                                    </div>
                                    <div id="errorcontainer-min_area" class="errorDiv"></div>
                                </div>
                                <div class="form-group">
                                    <p><?= $lang['search_leasing_period'] ?></p>
                                    <select id="length" name="length" class="form-control c-square c-theme input-sm" required></select>
                                    <div id="errorcontainer-length" class="errorDiv"></div>
                                </div>
                                <div class="form-group">
                                    <p><?= $lang['search_planned_moving_in'] ?></p>
                                    <input type="text" id="start" name="start" class="form-control c-square c-theme input-sm" placeholder="<?= $lang['search_planned_moving_in_date'] ?>*" data-plugin="datepicker" required readonly style="background-color: #fff;">
                                    <div id="errorcontainer-start" class="errorDiv"></div>
                                </div>
                                <div class="form-group">
                                    <p><?= $lang['search_shopping_malls'] ?></p>
                                    <div style="float: left; margin-right: 20px;">
                                        <div class="c-checkbox">
                                            <input id="<?= $shanghai_sbm ?>" name="mall" value="<?= $shanghai_sbm ?>" class="c-check" type="checkbox" checked>
                                            <label for="<?= $shanghai_sbm ?>" class="c-font-thin c-font-16">
                                                <span></span>
                                                <span class="check"></span>
                                                <span class="box"></span>
                                                <?= $lang['search_ljz'] ?> </label>
                                        </div>
                                    </div>

                                    <div style="float: left; margin-right: 20px;">
                                        <div class="c-checkbox">
                                            <input id="<?= $bs_tm ?>" name="mall" value="<?= $bs_tm ?>" class="c-check" type="checkbox">
                                            <label for="<?= $bs_tm ?>" class="c-font-thin c-font-16">
                                                <span></span>
                                                <span class="check"></span>
                                                <span class="box"></span>
                                                <?= $lang['search_bs'] ?> </label>
                                        </div>
                                    </div>

                                    <div style="float: left; margin-right: 20px;">
                                        <div class="c-checkbox">
                                            <input id="<?= $luoyang_sbm ?>" name="mall" value="<?= $luoyang_sbm ?>" class="c-check" type="checkbox">
                                            <label for="<?= $luoyang_sbm ?>" class="c-font-thin c-font-16">
                                                <span></span>
                                                <span class="check"></span>
                                                <span class="box"></span>
                                                <?= $lang['search_ly'] ?> </label>
                                        </div>
                                    </div>

                                    <div style="float: left; margin-right: 20px;">
                                        <div class="c-checkbox">
                                            <input id="<?= $hefei_sbm ?>" name="mall" value="<?= $hefei_sbm ?>" class="c-check" type="checkbox">
                                            <label for="<?= $hefei_sbm ?>" class="c-font-thin c-font-16">
                                                <span></span>
                                                <span class="check"></span>
                                                <span class="box"></span>
                                                <?= $lang['search_hf'] ?> </label>
                                        </div>
                                    </div>

                                </div>
                                <div class="clearfix"> </div><br>
                                <button id="search_button" class="btn c-theme-btn c-btn-uppercase btn-lg c-btn-bold c-btn-square"><?= $lang['search_search_shops'] ?></button>
                            </form>
                        </div>
                    </div>
                    <span style="display: none;" id="name"></span>
                    <span style="display: none;" id="company_name"></span>
                    <span style="display: none;" id="mobile"></span>
                    <span style="display: none;" id="email"></span>
                    <span style="display: none;" id="brand"></span>
                    <input type="hidden" id="brand_modality_0_code"></input>
                    <input type="hidden" id="brand_modality_1_code"></input>
                    <input type="hidden" id="brand_modality_2_code"></input>
                    <input type="hidden" id="brand_modality_3_code"></input>

                    <div class="col-md-9">
                        <div class="c-content-box c-size-md" style="padding: 0 0 30px;">
                            <div class="c-content-team-1-slider" data-slider="owl" data-items="3">
                                <div class="c-content-title-1"></div>
                                <div class="row c-content-list"></div>
                            </div>
                            <div id="loadMore-container" class="cbp-l-loadMore-button c-margin-t-60" style="display: none;">
                                <a href="javascript:void(0);" class="cbp-l-loadMore-link btn btn-sm c-btn-square c-btn-border-2x c-btn-dark">
                                    <span class="cbp-l-loadMore-defaultText"><?= $lang['search_load_more'] ?>...</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<?php include ('footer.php'); ?>