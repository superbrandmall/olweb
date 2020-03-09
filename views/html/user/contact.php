<?php
$scripts = $scripts . '<script type="text/javascript" src="views/assets/base/js/contact.js"></script>';
?>

<div class="modal fade c-content-login-form" id="contact" role="dialog" data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog">
        <div class="modal-content c-square" style="background: rgba(240,240,240,1);">
            <div class="modal-header c-no-border">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            </div>
            <div class="modal-body">
                <h3 class="c-font-24 c-font-sbold"><?= $lang['contact_contact'] ?></h3>
                <form>
                    <div class="form-group">
                        <div class="input-group">
                            <label for="contact_name_1" class="hide"><?= $lang['contact_main_contact'] ?>*</label>
                            <input type="text" id="contact_name_1" name="contact_name_1" placeholder="<?= $lang['contact_main_contact'] ?>*" required class="form-control input-lg c-square">
                            <span class="input-group-addon" style="background: none;border: none;padding: 2px;"> </span>
                            <div style="position: relative;">
                                <label for="target_mall" class="hide"><?= $lang['nav_malls'] ?>*</label>
                                <select class="form-control input-lg c-square" id="target_mall" name="target_mall" required>
                                    <option value=""><?= $lang['nav_malls'] ?>*</option>
                                    <option value="<?= $shanghai_sbm ?>"><?= $lang['search_ljz'] ?></option>
                                    <option value="<?= $baoshan_tm ?>"><?= $lang['search_bs'] ?></option>
                                    <option value="<?= $luoyang_sbm ?>"><?= $lang['search_ly'] ?></option>
                                    <option value="<?= $hefei_sbm ?>"><?= $lang['search_hf'] ?></option>
                                </select>
                            </div>
                        </div>
                        <div id="errorcontainer-contact_name_1" class="errorDiv"></div>
                        <div id="errorcontainer-target_mall" class="errorDiv"></div>
                    </div>
                    <div class="form-group">
                        <div class="input-group">
                            <label for="name" class="hide"><?= $lang['contact_company_name'] ?>*</label>
                            <input type="text" id="name" name="name" placeholder="<?= $lang['contact_company_name'] ?>*" required class="form-control input-lg c-square">
                            <span class="input-group-addon" style="background: none;border: none;padding: 2px;"> </span>
                            <div style="position: relative;">
                                <label for="brand_name" class="hide"><?= $lang['contact_brand_name'] ?>*</label>
                                <input type="text" id="brand_name" name="brand_name" placeholder="<?= $lang['contact_brand_name'] ?>*" required class="form-control input-lg c-square">
                            </div>
                        </div>
                        <div id="errorcontainer-name" class="errorDiv"></div>
                        <div id="errorcontainer-brand_name" class="errorDiv"></div>
                    </div>
                    <div class="form-group">
                        <label for="modality_0" class="hide"><?= $lang['contact_modality_0'] ?>*</label>
                        <select class="form-control input-lg c-square" id="modality_0" name="modality_0" onchange="getBrandModality1(this.value);" required>
                            <option value=""><?= $lang['contact_choose'] ?><?= $lang['contact_modality_0'] ?>*</option>
                        </select>
                        <div id="errorcontainer-modality_0" class="errorDiv"></div>
                    </div>
                    <div class="form-group">
                        <label for="modality_1" class="hide"><?= $lang['contact_modality_1'] ?>*</label>
                        <select class="form-control input-lg c-square" id="modality_1" name="modality_1" onchange="getBrandModality2(this.value);" required>
                            <option value=""><?= $lang['contact_choose'] ?><?= $lang['contact_modality_1'] ?>*</option>
                        </select>
                        <div id="errorcontainer-modality_1" class="errorDiv"></div>
                    </div>
                    <div class="form-group">
                        <label for="modality_2" class="hide"><?= $lang['contact_modality_2'] ?>*</label>
                        <select class="form-control input-lg c-square" id="modality_2" name="modality_2" onchange="getBrandModality3(this.value);" required>
                            <option value=""><?= $lang['contact_choose'] ?><?= $lang['contact_modality_2'] ?>*</option>
                        </select>
                        <div id="errorcontainer-modality_2" class="errorDiv"></div>
                    </div>
                    <div class="form-group">
                        <label for="modality_3" class="hide"><?= $lang['contact_modality_3'] ?>*</label>
                        <select class="form-control input-lg c-square" id="modality_3" name="modality_3" required>
                            <option value=""><?= $lang['contact_choose'] ?><?= $lang['contact_modality_3'] ?>*</option>
                        </select>
                        <div id="errorcontainer-modality_3" class="errorDiv"></div>
                    </div>
                    <div class="form-group">
                        <div class="input-group">
                            <label for="phone" class="hide"><?= $lang['contact_phone'] ?>*</label>
                            <input type="text" id="phone" name="phone" placeholder="<?= $lang['contact_phone'] ?>*" required class="form-control input-lg c-square">
                            <span class="input-group-addon" style="background: none;border: none;padding: 2px;"> </span>
                            <div style="position: relative;">
                                <label for="email" class="hide"><?= $lang['contact_email'] ?>*</label>
                                <input type="email" id="email" name="email" placeholder="<?= $lang['contact_email'] ?>*" required class="form-control input-lg c-square">
                            </div>
                        </div>
                        <div id="errorcontainer-phone" class="errorDiv"></div>
                        <div id="errorcontainer-email" class="errorDiv"></div>
                    </div>
                    <div class="form-group">
                        <label for="contact_msg" class="hide"><?= $lang['contact_msg'] ?>*</label>
                        <textarea id="contact_msg" name="contact_msg" placeholder="<?= $lang['contact_msg'] ?>*" required class="form-control input-lg c-square"></textarea>
                        <div id="errorcontainer-contact_msg" class="errorDiv"></div>
                    </div>
                    <div class="form-group">
                        <button type="submit" class="btn c-theme-btn btn-md c-btn-uppercase c-btn-bold c-btn-square c-btn-login"><?= $lang['contact_finish_form'] ?></button>
                    </div>

                </form>
            </div>
        </div>
    </div>
</div>