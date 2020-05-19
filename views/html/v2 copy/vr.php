<?php
$scripts = $scripts . '<script type="text/javascript" src="/views/assets/base/js/v2/vr-admin.js"></script>';
?>

<?php include ('navbar_top.php'); ?>
<div class="weui-toptips bg-success topTips"><i class="fa fa-smile-o" aria-hidden="true"></i> 尊敬的阁下，请从下列菜单中选择VR看场的商业项目。</div>

<div class="page__bd">
    <a href="javascript: showVR();" class="weui-btn weui-btn_primary">上海正大广场</a>
    <a href="javascript:;" class="weui-btn weui-btn_default">洛阳正大广场</a>
    <a href="javascript:;" class="weui-btn weui-btn_default">合肥正大广场</a>
    <a href="javascript:;" class="weui-btn weui-btn_default">乐清正大广场</a>
    <a href="javascript:;" class="weui-btn weui-btn_default">徐汇正大乐城</a>
    <a href="javascript:;" class="weui-btn weui-btn_default">宝山正大乐城</a>
    <a href="javascript:;" class="weui-btn weui-btn_default">郑州正大乐城</a>
    <a href="javascript:;" class="weui-btn weui-btn_default">无锡正大乐城</a>
    <a href="javascript:;" class="weui-btn weui-btn_default">北京正大中心</a>
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