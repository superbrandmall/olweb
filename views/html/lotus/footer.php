<!--<div class="weui-footer">
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
</div>-->
<div class="weui-tabbar tab-bottom">
    <a href="javascript:;" class="weui-tabbar__item">
            <span style="display: inline-block;position: relative;">
                <i class="icon icon-29 f24 weui-tabbar__icon"></i>
            </span>
        <p class="weui-tabbar__label">首页</p>
    </a>
    <a href="javascript:;" class="weui-tabbar__item">
        <i class="icon icon-81 f24 weui-tabbar__icon"></i>
        <p class="weui-tabbar__label">分类</p>
    </a>
    <a href="javascript:;" class="weui-tabbar__item">
            <span style="display: inline-block;position: relative;">
                <i class="icon icon-79 f24 weui-tabbar__icon"></i>
                <span class="weui-badge weui-badge_dot" style="position: absolute;top: 0;right: -6px;"></span>
            </span>
        <p class="weui-tabbar__label">消息</p>
    </a>
    <a href="javascript:;" class="weui-tabbar__item ">
        <i class="icon icon-84 f24 weui-tabbar__icon" ></i>
        <p class="weui-tabbar__label">我的</p>
    </a>
</div>

<!-- loading toast -->
<div id="loadingToast" style="display: none;">
    <div class="weui-mask_transparent"></div>
    <div class="weui-toast">
        <i class="weui-loading weui-icon_toast"></i>
        <p class="weui-toast__content">数据加载中</p>
    </div>
</div>
<script type="text/javascript" src="/views/assets/plugins/weui/js/jweixin-1.4.0.js"></script>
<script type="text/javascript" src="/views/assets/plugins/wow/wow.min.js"></script>
<script type="text/javascript" src="/views/assets/plugins/weui/js/swipe.js"></script>
<script type="text/javascript" src="/views/assets/plugins/weui/js/weui.min.js"></script>
<script type="text/javascript" src="/views/assets/plugins/jquery.validate.min.js"></script>
<script type="text/javascript" src="/views/assets/plugins/jquery.imagemapster.js"></script>
<?php
    echo $scripts; 
?>
<script type="text/javascript" src="/views/assets/base/js/protocol.js"></script>
<script type="text/javascript" src="/views/assets/base/js/v2/scripts-admin.js"></script>

</body>
</html>