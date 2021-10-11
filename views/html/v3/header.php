<?php
session_start();

include ('system/Router.php');
$scripts = null;
?>

<!doctype html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<title>首页</title>
<link rel="stylesheet" href="/views/assets/base/css/v3/weui.min.css">
<link rel="stylesheet" href="/views/assets/base/css/v3/jquery-weui.min.css">
<link href="/views/assets/base/css/v3/base.css?t=<?php echo date("Y-m-d") ?>" rel="stylesheet">
<link href="/views/assets/base/css/v3/index.css?t=<?php echo date("Y-m-d") ?>" rel="stylesheet">
</head>
<body>
<header class="header">
	<div class="header-left">
		<a href="javascript:history.back();" class="header-back"></a>
		<a href="#" class="header-city">
			<span class="switch-city"><em class="city">上海</em><i class="icon-pull"></i></span>
		</a>
	</div>
	<a href="#" class="header-logo"><span class="logo">OLL线上租</span></a>
	<a href="#" class="header-user"><i class="icon-user"></i></a>
</header>