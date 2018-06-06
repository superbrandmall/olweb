<?php
session_start();

$_SESSION['admin_login'] = $_POST['user_code'];

setcookie('username', '', time() - 1*24*60*60);
setcookie('password', '', time() - 1*24*60*60);