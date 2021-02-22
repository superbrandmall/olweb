<?php
$scripts = $scripts. '<script type="text/javascript" src="/views/assets/base/js/nikola/bootstrap.bundle.min.js"></script>
            <script type="text/javascript" src="/views/assets/base/js/nikola/blocs.min.js"></script>
            <script type="text/javascript" src="/views/assets/base/js/v2/info-admin.js"></script>';
?>

<link rel="stylesheet" type="text/css" href="/views/assets/base/css/nikola/bootstrap.min.css" />
<link rel="stylesheet" type="text/css" href="/views/assets/base/css/nikola.css" />

<div class="page__bd" style="margin-top: 65px;">
    <div class="weui-tab">
        <div class="weui-navbar">
            <div class="weui-navbar__item" onclick="window.location='/v2/all-orders'">
                我的订单
            </div>
            <div class="weui-navbar__item" onclick="window.location='/v2/favourites'">
                我的收藏
            </div>
            <div class="weui-navbar__item" onclick="window.location='/v2/my-reservation'">
                我的预约
            </div>
        </div>
    </div>
</div>

<div id="profile">
    <div id="avatar_selector">
        <div id="avatar" style="background-image: url(/views/assets/base/img/content/brands-admin/avatar.png)" class="avatar"></div>
        <input type="file" accept="image/*" multiple style="position: absolute; top: 122px; left: 0; right: 0; padding: 0px; margin: 0 auto; opacity: 0; height: 112px; width: 112px;" />
    </div>
    <h4 id="uid" style="margin-top: 20px; text-align: center;"></h4>
    <a href="javascript:;" id="change_avatar" style="text-align: center; display: block;">修改头像</a>
</div>

<div>
    <div data-appear-anim-style="fadeIn" class="col-lg-3 col-md-3 align-self-center cp-hero-button-column animDelay1 animated" style="visibility: visible;">
        <div class="text-center" style="margin: 0 20px;">
            <a href="/v2/improve-info" class="btn btn-primary btn-lg" style="width: 100%; border-width: 3px;">完善信息</a>
        </div>
    </div>
    <div data-appear-anim-style="fadeIn" class="col-lg-3 col-md-3 align-self-center cp-hero-button-column animDelay1 animated" style="visibility: visible;">
        <div class="text-center" style="margin: 0 20px;">
            <a href="/v2/contact" class="btn btn-default btn-lg" style="background-color: #f4f4f4; width: 100%; border-width: 3px;">联系客服</a>
        </div>
    </div>
    <div data-appear-anim-style="fadeIn" class="col-lg-3 col-md-3 align-self-center cp-hero-button-column animDelay1 animated" style="visibility: visible;">
        <div class="text-center" style="margin: 0 20px;">
            <a href="/v2/qa" class="btn btn-d btn-lg tesla-wire-button-black" style="width: 100%;">帮助中心</a>
        </div>
    </div>
</div>

<div id="js_toast" style="display: none;">
    <div class="weui-mask_transparent"></div>
    <div class="weui-toast">
        <i class="weui-icon-success-no-circle weui-icon_toast"></i>
        <p class="weui-toast__content">上传成功</p>
    </div>
</div>

<?php include ('footer.php'); ?>