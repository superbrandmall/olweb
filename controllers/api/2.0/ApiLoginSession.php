<?php
session_start();

$_SESSION['uid'] = $_POST['uid'];

setcookie('username', '', time() + 3600*12);
setcookie('password', '', time() + 3600*12);