<?php
session_start();

$_SESSION['uid'] = $_POST['user_code'];
$_SESSION['user_login'] = $_POST['merchant_mobile'];

setcookie('username', '', time() - 1*24*60*60);
setcookie('password', '', time() - 1*24*60*60);