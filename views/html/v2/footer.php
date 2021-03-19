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
<script type="text/javascript" src="/views/assets/plugins/jquery.cookie.js"></script>
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
<script type="text/javascript" src="/views/assets/plugins/jquery.cookie.js"></script>
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