<?php
$scripts = $scripts . '<script type="text/javascript" src="views/assets/base/js/register.js"></script>';
?>
<link href="views/assets/plugins/typeahead/typeaheadjs.css" rel="stylesheet">

<div class="modal fade c-content-login-form" id="step1" role="dialog" data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog">
        <div class="modal-content c-square" style="background: rgba(240,240,240,1);">
            <div class="modal-header c-no-border">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            </div>
            <div class="modal-body">
                <h3 class="c-font-24 c-font-sbold"><?= $lang['register_register'] ?></h3>
                <form>
                    <div class="form-group">
                        <label for="mobile" class="hide"><?= $lang['register_mobile'] ?>*</label>
                        <input type="text" id="mobile" name="mobile" placeholder="<?= $lang['register_mobile'] ?>*" required class="form-control input-lg c-square">
                        <div id="errorcontainer-mobile" class="errorDiv"></div>
                    </div>
                    <div class="form-group">
                        <div style="position: relative;">
                            <input type="text" id="international_verify" name="international_verify" placeholder="<?= $lang['register_veryfication_code'] ?>*" required class="form-control c-square c-theme input-lg">
                            <a href="javascript: VeryficationCodeInternational()" id="international_verify_link" style="display: block; position: absolute; z-index: 10; right: 9px; font-size: 14px; top: 13px;"><?= $lang['register_send_code'] ?></a>
                        </div>
                        <div id="errorcontainer-international_verify" class="errorDiv"></div>
                    </div>
                    <div class="form-group">
                        <div class="c-checkbox">
                            <input type="checkbox" id="terms" name="terms" class="c-check" checked required>
                            <label for="terms" class="c-font-thin c-font-17">
                                <span></span>
                                <span class="check"></span>
                                <span class="box"></span>
                                <?= $lang['register_accept'] ?><a href="terms.html" target="_blank">《<?= $lang['register_chiatai_ol_reg_agree'] ?>》</a></label>
                        </div>
                        <div id="errorcontainer-terms" class="errorDiv" style="margin-left: 29px"></div>
                    </div>
                    <div class="form-group">
                        <button type="submit" class="btn c-theme-btn btn-md c-btn-uppercase c-btn-bold c-btn-square c-btn-login"><?= $lang['register_finish_registration'] ?></button>
                        <a href="javascript:;" class="c-btn-forgot" data-toggle="modal" data-target="#login-form" data-dismiss="modal"><?= $lang['register_back_login'] ?></a>
                    </div>
                    <input type="hidden" id="hidden_brand_code">
                </form>
            </div>
        </div>
    </div>
</div>