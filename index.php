<?php
if($_SERVER['SERVER_NAME'] == 'ozone-cn.com' || $_SERVER['SERVER_NAME'] == 'www.ozone-cn.com'){
    include ('views/html/ozone/header.php');
    if(strpos($_SERVER['REQUEST_URI'],'co-work')) {
        include ('views/html/ozone/co-work.php');
    } else if(strpos($_SERVER['REQUEST_URI'],'sh-space')) {
        include ('views/html/ozone/sh-space.php');
    } else if(strpos($_SERVER['REQUEST_URI'],'ly-space')) {
        include ('views/html/ozone/ly-space.php');
    } else if(strpos($_SERVER['REQUEST_URI'],'room-type')) {
        include ('views/html/ozone/room-type.php');
    } else {
        include ('views/html/ozone/co-work.php');
    }
} else {
    if (isset($_GET['p']) && (strpos($_GET['p'],'admin')) !== false) {
        include ('views/html/admin/header.php');
        include 'views/html/admin/'.$page;
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