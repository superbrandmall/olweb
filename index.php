<?php
/*if($_SERVER['SERVER_NAME'] == 'eatnwork-china.com' || $_SERVER['SERVER_NAME'] == 'www.eatnwork-china.com'){
    if(strpos ($_SERVER['REQUEST_URI'] , 'advertising' ) == true){
        include ('views/html/advertising/index.php');
    } else {
        include ('views/html/ozone/header.php');
        include 'views/html/ozone/'.$page;
    }
} else {*/ // 内部汇报
    if (isset($_GET['p']) && (strpos($_GET['p'],'ljz-admin')) !== false) { // 陆家嘴内部汇报
        include ('views/html/ljz-admin/header.php');
        include 'views/html/ljz-admin/'.$page;
    } else if (isset($_GET['p']) && (strpos($_GET['p'],'v2-admin')) !== false) { // 2.0 admin
        include ('views/html/v2-admin/header.php');
        include 'views/html/v2-admin/'.$page;
    } else if (isset($_GET['p']) && (strpos($_GET['p'],'v2')) !== false) { // 2.0
        if((strpos($_GET['p'],'alipay')) === false){
            include ('views/html/v2/header.php');
            include 'views/html/v2/'.$page;
        } else {
            include 'views/html/v2/pay.htm';
        }
    } else if (isset($_GET['p']) && (strpos($_GET['p'],'brands-admin')) !== false) { // 品牌库
        include ('views/html/brands-admin/header.php');
        include 'views/html/brands-admin/'.$page;
    } else if (isset($_GET['p']) && (strpos($_GET['p'],'lotus-admin')) !== false) { // LOTUS
        include ('views/html/lotus-admin/header.php');
        include 'views/html/lotus-admin/'.$page;
    } else if (isset($_GET['p']) && (strpos($_GET['p'],'kow-admin')) !== false) { // KOW
        include ('views/html/kow-admin/header.php');
        include 'views/html/kow-admin/'.$page;
    } else if (isset($_GET['p']) && (strpos($_GET['p'],'v3')) !== false) { // 3.0
        if((strpos($_GET['p'],'alipay')) === false){
            include ('views/html/v3/header.php');
            include 'views/html/v3/'.$page;
        } else {
            include 'views/html/v3/pay.htm';
        }
    } else if (isset($_GET['p']) && (strpos($_GET['p'],'portal')) !== false) { // 内部portal
        include ('views/html/portal/header.php');
        include 'views/html/portal/'.$page;
    } else if (isset($_GET['p']) && (strpos($_GET['p'],'gateway')) !== false) { // Payment
        include ('views/html/gateway/header.php');
        include 'views/html/gateway/'.$page;
    } else {
        //if (isset($_SERVER['PHP_AUTH_USER']) and ($_SERVER['PHP_AUTH_USER'] == 'demo')){
            include ('views/html/user/header.php');
            include 'views/html/user/'.$page;
        /*} else {
                    header('WWW-Authenticate: Basic realm="Please enter username and password"');
                    header('HTTP/1.0 401 Unauthorized');
                    echo '您没有权限浏览本网站';
            }*/
    }
//}