<?php
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