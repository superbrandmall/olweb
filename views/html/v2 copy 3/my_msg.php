<?php
$scripts = $scripts. '<script type="text/javascript" src="/views/assets/base/js/v2/my-msg-admin.js"></script>';
?>

<?php include ('navbar_top.php'); ?>
<div class="weui-toptips bg-success topTips"><i class="fa fa-smile-o" aria-hidden="true"></i> 叮咚！请查收您的消息。为了让您不错过任何重要信息，我们也已经通过手机短信把消息推送给您啦！</div>

<div class="page__bd">
    <div class="weui-tab">
        <div class="weui-navbar">
            <div class="weui-navbar__item weui-bar__item_on" style="background-color: rgb(230, 176, 76); color: #fff;">
                我的消息
            </div>
            <div class="weui-navbar__item">
                系统消息
            </div>
        </div>
        <div class="weui-tab__panel">
            <div class="weui-panel">
                <div class="weui-panel__bd" style="background: #e5e5e5;">
                </div>
            </div>
        </div>
    </div>
</div>
<br>
<br>
<br>
<br>

<?php include ('menu_bottom.php'); ?>

<?php include ('footer.php'); ?>