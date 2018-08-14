<?php
session_start();

$_SESSION['uid'] = $_POST['user_code'];
$_SESSION['user_email'] = $_POST['user_email'];
$_SESSION['user_login'] = $_POST['merchant_mobile'];

setcookie('username', '', time() + 3600*12);
setcookie('password', '', time() + 3600*12);