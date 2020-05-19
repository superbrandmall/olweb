<?php
    if(strpos($_SERVER["REQUEST_URI"],'events') != false) { 
        $url = str_replace('mall-list','events',$_SERVER["REQUEST_URI"]);
    } else if(strpos($_SERVER["REQUEST_URI"],'leasing') != false){
        $url = str_replace('mall-list','floor-plan',$_SERVER["REQUEST_URI"]);
    } else if(strpos($_SERVER["REQUEST_URI"],'ads') != false){
        $url = str_replace('mall-list','advertising',$_SERVER["REQUEST_URI"]);
    } 
?>

<?php include ('navbar_top.php'); ?>
<div class="weui-toptips bg-success topTips"><i class="fa fa-smile-o" aria-hidden="true"></i> 尊敬的阁下，请选择想要哪个商业项目哦。</div>

<div class="page__bd" style="margin-top: 50px;">
    <a href="<?= $url; ?>" class="weui-btn weui-btn_primary">上海正大广场</a>
    <a href="<?= $url; ?>" class="weui-btn weui-btn_default">洛阳正大广场</a>
    <a href="<?= $url; ?>" class="weui-btn weui-btn_default">宝山正大乐城</a>
</div>

<?php include ('menu_bottom.php'); ?>

<?php include ('footer.php'); ?>