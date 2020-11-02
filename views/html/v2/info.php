<?php
$scripts = $scripts. '<script type="text/javascript" src="/views/assets/base/js/v2/info-admin.js"></script>';
?>

<div id="profile">
    <img src="/views/assets/base/img/content/backgrounds/profile-hjdd.png" class="wow slideInLeft" data-wow-delay="0.2s" data-wow-offset="300" style="width: 100%; text-align: center;" />
    <div id="avatar_selector">
        <div id="avatar" style="background-image: url(/views/assets/base/img/content/brands-admin/avatar.png)" class="avatar wow fadeInUp" data-wow-delay="0.2s" data-wow-offset="300"></div>
        <input type="file" accept="image/*" multiple style="position: absolute; top: 122px; left: 0; right: 0; padding: 0px; margin: 0 auto; opacity: 0; height: 112px; width: 112px;" />
    </div>
    <p id="uid" style="position: absolute; font-weight: bold; font-size: 15px; color: #fff; right: 20px; bottom: 190px;"></p>
    <a href="javascript:;" id="change_avatar" style="position: absolute; font-size: 16px; color: #fff; right: 20px; bottom: 170px;">修改头像</a>
</div>

<div class="wow slideInLeft" data-wow-delay="0.4s" data-wow-offset="300" style="position: relative; margin-top: -140px; height: 50vh; margin-bottom: 200px;">
    <a href="/v2/all-orders" class="profile-links info-link" style="left: -27px; top: 0; width: 210px;">订单管理</a> 
    <a href="/v2/improve-info" class="profile-links info-link" style="left: -27px; top: 70px; width: 220px;">完善信息</a>
    
    <a href="/v2/favourites" class="profile-links manage-link" style="left: -30px; top: 160px; width: 250px;">我的收藏</a> 
    <a href="/v2/my-reservation" class="profile-links manage-link" style="left: -30px; top: 230px; width: 240px;">我的预约</a>
    
    <a href="/v2/contact" class="profile-links help-link" style="left: -20px; top: 280px; width: 100px;">联系客服</a> 
    <a href="/v2/qa" class="profile-links help-link" style="left: -20px; top: 350px; width: 90px;">帮助中心</a>
</div>

<div id="js_toast" style="display: none;">
    <div class="weui-mask_transparent"></div>
    <div class="weui-toast">
        <i class="weui-icon-success-no-circle weui-icon_toast"></i>
        <p class="weui-toast__content">上传成功</p>
    </div>
</div>

<?php include ('menu_bottom.php'); ?>

<?php include ('footer.php'); ?>