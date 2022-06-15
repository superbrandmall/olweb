<?php
function query_decode($sEncode) {
  if(strlen($sEncode)==0)
   {
     return '';
   }
   else
   {
    $s_tem = strrev($sEncode);
    $s_tem = base64_decode($s_tem);
    $s_tem = rawurldecode($s_tem);
     return $s_tem;
   }
}
?>
<?php
$name=null;
if (explode('?id=', $_SERVER['REQUEST_URI'])[1] != null) {
    $id = explode('?id=', $_SERVER['REQUEST_URI'])[1];
    if (strpos($id, '&name=') !== false) {
        $name = explode('&name=', $id)[1];
    }
}
?>

<?php
$scripts = $scripts .PHP_EOL. '        <script type="text/javascript" src="/views/assets/base/js/v3/lotus-list.js?t='.date("Y-m-d").'"></script>'.PHP_EOL;
?>

<link href="/views/assets/base/css/v3/discounts.css" rel="stylesheet" type="text/css">

<div class="near-box">
    <div class="header">
        <a href="/v3/" class="left"></a>
        <?= query_decode($name) ?>
    </div>
    <div class="discounts-bigbox">
        <div class="discounts-banner1"><img src="/views/assets/base/img/content/v3/del/discounts-img1.jpg" alt=""></div>
    </div>

    <?php include ('footer.php'); ?>