<?php
$scripts = $scripts . '<script type="text/javascript" src="/views/assets/base/js/v2/vr-admin.js"></script>';
?>

<?php include ('navbar_top.php'); ?>
<div class="weui-toptips bg-success topTips"><i class="fa fa-smile-o" aria-hidden="true"></i> 尊敬的阁下，请从下列菜单中选择VR看场的商业项目。</div>

<div class="page__bd" style="margin-top: 9px; padding: 0 16px;">
    <div class="weui-flex" style="text-align: center; height: 100px;">
        <div onclick="javascript: showVR();" class="weui-flex__item" style="position: relative; margin-right: 16px; background: url(/views/assets/base/img/content/backgrounds/mall01.jpg); background-size: cover; background-position: center">
            <div class="placeholder" style="position: absolute; bottom: 0; background: rgba(0,0,0,0.6); width: 100%; color: #bba585; font-size: 14px;">上海正大广场</div>
        </div>
        <div class="weui-flex__item" style="position: relative; margin-right: 16px; background: url(/views/assets/base/img/content/backgrounds/mall02.jpg); background-size: cover; background-position: center">
            <div class="placeholder" style="position: absolute; bottom: 0; background: rgba(0,0,0,0.6); width: 100%; color: #bba585; font-size: 14px;">洛阳正大广场</div>        
        </div>
        <div class="weui-flex__item" style="position: relative; background: url(/views/assets/base/img/content/backgrounds/mall03.jpg); background-size: cover; background-position: center">
            <div class="placeholder" style="position: absolute; bottom: 0; background: rgba(0,0,0,0.6); width: 100%; color: #bba585; font-size: 14px;">合肥正大广场</div>        
        </div>
    </div>
    
    <div class="weui-flex" style="text-align: center; height: 100px;">
        <div class="weui-flex__item" style="position: relative; margin-right: 16px; background: url(/views/assets/base/img/content/backgrounds/mall04.jpg); background-size: cover; background-position: center">
            <div class="placeholder" style="position: absolute; bottom: 0; background: rgba(0,0,0,0.6); width: 100%; color: #bba585; font-size: 14px;">乐清正大广场</div>
        </div>
        <div class="weui-flex__item" style="position: relative; margin-right: 16px; background: url(/views/assets/base/img/content/backgrounds/mall05.jpg); background-size: cover; background-position: center">
            <div class="placeholder" style="position: absolute; bottom: 0; background: rgba(0,0,0,0.6); width: 100%; color: #bba585; font-size: 14px;">徐汇正大乐城</div>        
        </div>
        <div class="weui-flex__item" style="position: relative; background: url(/views/assets/base/img/content/backgrounds/mall06.jpg); background-size: cover; background-position: center">
            <div class="placeholder" style="position: absolute; bottom: 0; background: rgba(0,0,0,0.6); width: 100%; color: #bba585; font-size: 14px;">宝山正大乐城</div>        
        </div>
    </div>
    
    <div class="weui-flex" style="text-align: center; height: 100px;">
        <div class="weui-flex__item" style="position: relative; margin-right: 16px; background: url(/views/assets/base/img/content/backgrounds/mall07.jpg); background-size: cover; background-position: center">
            <div class="placeholder" style="position: absolute; bottom: 0; background: rgba(0,0,0,0.6); width: 100%; color: #bba585; font-size: 14px;">郑州正大乐城</div>
        </div>
        <div class="weui-flex__item" style="position: relative; margin-right: 16px; background: url(/views/assets/base/img/content/backgrounds/mall08.jpg); background-size: cover; background-position: center">
            <div class="placeholder" style="position: absolute; bottom: 0; background: rgba(0,0,0,0.6); width: 100%; color: #bba585; font-size: 14px;">无锡正大乐城</div>        
        </div>
        <div class="weui-flex__item" style="position: relative; background: url(/views/assets/base/img/content/backgrounds/mall09.jpg); background-size: cover; background-position: center">
            <div class="placeholder" style="position: absolute; bottom: 0; background: rgba(0,0,0,0.6); width: 100%; color: #bba585; font-size: 14px;">北京正大中心</div>        
        </div>
    </div>
</div>

<div id="vr_viewer" class="weui-gallery">
    <iframe src="https://720yun.com/t/d0vksldepqe?scene_id=43986975" width="100%" frameborder="0" style="height: 90vh;"></iframe>
    <div class="weui-gallery__opr">
        <a href="javascript:" class="weui-gallery__del">
            <i class="fa fa-times" aria-hidden="true" style="color: #fff;" onclick='$("#vr_viewer").hide();'></i>
        </a>
    </div>
</div>


<br>
<br>
<br>
<br>

<?php include ('menu_bottom.php'); ?>

<?php include ('footer.php'); ?>