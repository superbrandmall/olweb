<?php
if(!in_array($page, $page_no_footer)) {
    ?>
<div class="weui-footer" style="margin: 10px 0 0; padding-bottom: 70px;">
    <p class="weui-footer__links">
        <a class="weui-footer__link" target="_blank" href="https://beian.miit.gov.cn/">
            沪ICP备14029636号-1
        </a><br>
        <a class="weui-footer__link" target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=31011502015111">
            <img src="/views/assets/base/img/content/misc/gongan.png" />
            沪公网安备 31011502015111号
        </a>
    </p>
    <p class="weui-footer__text" style="font-size: 14px;">Copyright &copy; <?= date("Y") ?> 上海帝泰发展有限公司 <a class="weui-footer__link" href="/v2/privacy">隐私政策</a><br></p>
</div>
<?php
}
?>

<!-- loading toast -->
<div id="loadingToast" style="display: none;">
    <div class="weui-mask_transparent"></div>
    <div class="weui-toast">
        <i class="weui-loading weui-icon_toast"></i>
        <p class="weui-toast__content">数据加载中</p>
    </div>
</div>

<div id="aplayer" class="aplayer" style="display: none;"></div>

<?php
if(!in_array($page, $page_nikola)) {
    ?>
<script type="text/javascript" src="/views/assets/plugins/weui/js/jweixin-1.4.0.js"></script>
<script type="text/javascript" src="/views/assets/plugins/wow/wow.min.js"></script>
<script type="text/javascript" src="/views/assets/plugins/weui/js/swipe.js"></script>
<script type="text/javascript" src="/views/assets/plugins/weui/js/weui.min.js"></script>
<script type="text/javascript" src="/views/assets/plugins/jquery.validate.min.js"></script>
<script type="text/javascript" src="/views/assets/plugins/jquery.imagemapster.js"></script>
<script type="text/javascript" src="/views/assets/plugins/jquery.validate.min.js"></script>
<script type="text/javascript" src="/views/assets/plugins/weui/js/APlayer.min.js"></script>
<?php
    echo $scripts; 
?>
<script type="text/javascript" src="/views/assets/base/js/protocol.js"></script>
<script type="text/javascript" src="/views/assets/base/js/v2/scripts-admin.js"></script>
<?php
} else {
?>
<script type="text/javascript" src="/views/assets/plugins/weui/js/jweixin-1.4.0.js"></script>
<script type="text/javascript" src="/views/assets/plugins/wow/wow.min.js"></script>
<script type="text/javascript" src="/views/assets/plugins/jquery.validate.min.js"></script>
<script type="text/javascript" src="/views/assets/base/js/nikola/bootstrap.bundle.min.js"></script>
<script type="text/javascript" src="/views/assets/base/js/nikola/blocs.min.js"></script>
<script type="text/javascript" src="/views/assets/base/js/nikola/jquery.scrollify.js"></script>
<script type="text/javascript" src="/views/assets/base/js/nikola/cookieconsent.min.js"></script>
<?php
    echo $scripts; 
?>
<script type="text/javascript" src="/views/assets/base/js/v2/scripts-admin.js"></script>
<?php
}
?>
</body>
</html>