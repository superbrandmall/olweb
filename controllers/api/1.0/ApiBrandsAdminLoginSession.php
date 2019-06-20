<?php
session_start();

$_SESSION['brands_admin_login'] = $_POST['user_code'];

setcookie('username', '', time() + 3600*12);
setcookie('password', '', time() + 3600*12);