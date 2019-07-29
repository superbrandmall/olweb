<?php
session_start();

$_SESSION['brands_admin_login'] = $_POST['user_code'];
$_SESSION['brands_admin_name'] = $_POST['user_name'];

setcookie('username', '', time() + 3600*12);
setcookie('password', '', time() + 3600*12);