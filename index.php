<?php
if($_SERVER['SERVER_NAME'] == 'eatnwork-china.com' || $_SERVER['SERVER_NAME'] == 'www.eatnwork-china.com'){
    if(strpos ($_SERVER['REQUEST_URI'] , 'advertising' ) == true){
        include ('views/html/advertising/index.php');
    } else {
        include ('views/html/ozone/header.php');
        include 'views/html/ozone/'.$page;
    }
} else { // 内部汇报
    if (isset($_GET['p']) && (strpos($_GET['p'],'ljz-admin')) !== false) { // 陆家嘴内部汇报
        include ('views/html/ljz-admin/header.php');
        include 'views/html/ljz-admin/'.$page;
    } else if (isset($_GET['p']) && (strpos($_GET['p'],'ly-admin')) !== false) { // 洛阳内部汇报
        include ('views/html/ly-admin/header.php');
        include 'views/html/ly-admin/'.$page;
    } else if (isset($_GET['p']) && (strpos($_GET['p'],'bs-admin')) !== false) { // 宝山内部汇报
        include ('views/html/bs-admin/header.php');
        include 'views/html/bs-admin/'.$page;
    } else if (isset($_GET['p']) && (strpos($_GET['p'],'hf-admin')) !== false) { // 合肥内部汇报
        include ('views/html/hf-admin/header.php');
        include 'views/html/hf-admin/'.$page;
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
    } else if (isset($_GET['p']) && (strpos($_GET['p'],'lotus-admin')) !== false) { // 莲花管理
        include ('views/html/lotus-admin/header.php');
        include 'views/html/lotus-admin/'.$page;
    } else if (isset($_GET['p']) && (strpos($_GET['p'],'lotus')) !== false) { // 莲花
        if((strpos($_GET['p'],'alipay')) === false){
            include ('views/html/lotus/header.php');
            include 'views/html/lotus/'.$page;
        } else {
            include 'views/html/lotus/pay.htm';
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
}