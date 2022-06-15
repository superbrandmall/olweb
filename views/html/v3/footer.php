<div class="kaola-bottom">
    <a href="#" class="kaola-bottom-box1">
            <span class="kaola-bottom-img1"><img src="/views/assets/base/img/content/v3/home.png"></span>
            <span class="kaola-bottom-text1 text2">首页</span>
    </a>
    <a href="#" class="kaola-bottom-box1">
            <span class="kaola-bottom-img1"><img src="/views/assets/base/img/content/v3/search3.png"></span>
            <span class="kaola-bottom-text1">找铺</span>
    </a>
    <a href="#" class="kaola-bottom-box1">
            <span class="kaola-bottom-img1"><img src="/views/assets/base/img/content/v3/news.png"></span>
            <span class="kaola-bottom-text1">消息</span>
    </a>
    <a href="#" class="kaola-bottom-box1">
            <span class="kaola-bottom-img1"><img src="/views/assets/base/img/content/v3/people1.png"></span>
            <span class="kaola-bottom-text1">我的</span>
    </a>
</div>
</div>
<script type="text/javascript" src="/views/assets/base/js/v3/jquery-1.8.3.min.js"></script>
<script type="text/javascript" src="/views/assets/base/js/v3/TouchSlide.1.1.js"></script>
<script type="text/javascript" src="/views/assets/base/js/v3/scrolltopcontrol.js"></script>
<script type="text/javascript" src="/views/assets/plugins/jquery.cookie.js"></script>
<script type="text/javascript" src="/views/assets/plugins/jquery.validate.min.js"></script>
<script type="text/javascript" src="/views/assets/base/js/lotus-admin/protocol-admin.js"></script>
<script type="text/javascript" src="/views/assets/plugins/accounting.min.js"></script>
<script type="text/javascript" src="/views/assets/base/js/lotus-admin/scripts-admin.js"></script>
<?php
    echo $scripts; 
?>
<script>
	TouchSlide({ 
			slideCell:"#slideBox",
			titCell:".hd ul", //开启自动分页 autoPage:true ，此时设置 titCell 为导航元素包裹层
			mainCell:".bd ul", 
			effect:"leftLoop", 
			autoPage:true,//自动分页
			autoPlay:true, //自动播放
		});
</script>
</body>
</html>