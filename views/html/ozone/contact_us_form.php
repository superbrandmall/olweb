<form id="form">
    <div class="form-group">
        <label for="contact_name_1" class="hidden"><?= $lang['contact_main_contact'] ?></label>
        <input type="text" id="contact_name_1" name="contact_name_1" placeholder="<?= $lang['contact_main_contact'] ?>*" required class="form-control input-lg c-square">
        <div id="errorcontainer-contact_name_1" class="errorDiv"></div>
    </div>
    <div class="form-group">
        <label for="email" class="hidden"><?= $lang['contact_email'] ?></label>
        <input type="email" id="email" name="email" placeholder="<?= $lang['contact_email'] ?>*" required class="form-control input-lg c-square">
        <div id="errorcontainer-email" class="errorDiv"></div>
    </div>
    <div class="form-group">
        <label for="phone" class="hidden"><?= $lang['contact_phone'] ?></label>
        <div class="input-group c-square">
            <div class="input-group-addon" style="background-color: #FAFAFA;">
                <button type="button" data-toggle="dropdown" aria-expanded="false" style="padding: 0;background: none; border: 0 none;">
                    <img id="country_flag" src="/views/assets/base/img/content/misc/cn.png" alt="中国" width="15"> <span id="country_code">+86</span>
                    <span class="caret" style="margin-top: -1px;"></span>
                </button>
                <ul id="country_selection" class="dropdown-menu" role="menu" style="min-width: 0;">
                    <li>
                        <a href="#!" style="padding: 1px 20px; font-size: 14px;"><img src="/views/assets/base/img/content/misc/cn.png" alt="" width="20"> +86</a>
                    </li>
                    <li>
                        <a href="#!" style="padding: 1px 20px; font-size: 14px;"><img src="/views/assets/base/img/content/misc/us.png" alt="" width="20"> +1</a>
                    </li>
                    <li>
                        <a href="#!" style="padding: 1px 20px; font-size: 14px;"><img src="/views/assets/base/img/content/misc/hk.png" alt="" width="20"> +852</a>
                    </li>
                    <li>
                        <a href="#!" style="padding: 1px 20px; font-size: 14px;"><img src="/views/assets/base/img/content/misc/tw.png" alt="" width="20"> +886</a>
                    </li>
                    <li>
                        <a href="#!" style="padding: 1px 20px; font-size: 14px;"><img src="/views/assets/base/img/content/misc/as.png" alt="" width="20"> +61</a>
                    </li>
                    <li>
                        <a href="#!" style="padding: 1px 20px; font-size: 14px;"><img src="/views/assets/base/img/content/misc/uk.png" alt="" width="20"> +44</a>
                    </li>
                    <li>
                        <a href="#!" style="padding: 1px 20px; font-size: 14px;"><img src="/views/assets/base/img/content/misc/id.png" alt="" width="20"> +91</a>
                    </li>
                    <li>
                        <a href="#!" style="padding: 1px 20px; font-size: 14px;"><img src="/views/assets/base/img/content/misc/fa.png" alt="" width="20"> +33</a>
                    </li>
                    <li>
                        <a href="#!" style="padding: 1px 20px; font-size: 14px;"><img src="/views/assets/base/img/content/misc/mo.png" alt="" width="20"> +853</a>
                    </li>
                    <li>
                        <a href="#!" style="padding: 1px 20px; font-size: 14px;">其他</a>
                    </li>
                </ul>
            </div>
            <input type="text" id="phone" name="phone" placeholder="<?= $lang['co_work_phone'] ?>*" required class="form-control input-lg c-square">
        </div>
        <div id="errorcontainer-phone" class="errorDiv"></div>
    </div>
    <!--<div class="form-group">
        <label for="reserve_verify" class="hidden"><?= $lang['co_work_veryfication_code'] ?>*</label>
        <div style="position: relative;">
            <input type="text" id="login_verify" name="reserve_verify" placeholder="<?= $lang['co_work_veryfication_code'] ?>*" required class="form-control c-square c-theme input-lg">
            <a href="javascript: VeryficationCodeReservation()" id="login_verify_link" style="display: block; position: absolute; z-index: 10; right: 9px; font-size: 14px; top: 13px;"><?= $lang['co_work_send_code'] ?></a>
        </div>
        <div id="errorcontainer-reserve_verify" class="errorDiv"></div>
    </div>-->
    <div class="form-group">
        <div class="c-checkbox">
            <input type="checkbox" id="terms" name="terms" class="c-check" checked="checked" required>
            <label for="terms" class="c-font-thin c-font-17">
                <span></span>
                <span class="check"></span>
                <span class="box"></span>
                <?= $lang['co_work_i_agree'] ?><a href="/terms.html" target="_blank"><?= $lang['co_work_service_terms'] ?></a><?= $lang['co_work_i_read'] ?><a href="/cookie.html" target="_blank"><?= $lang['co_work_privacy_policy'] ?></a>
            </label>
        </div>
        <div id="errorcontainer-terms" class="errorDiv" style="margin-left: 29px"></div>
    </div>
    <div id="terms_box" style="position: relative;"></div>
    <div class="form-group">
        <button type="submit" class="btn c-theme-btn btn-lg c-btn-uppercase c-btn-bold c-btn-square c-btn-login" style="width: 100%; font-size: 20px;"><?= $lang['co_work_book_now'] ?></button>
    </div>
</form>