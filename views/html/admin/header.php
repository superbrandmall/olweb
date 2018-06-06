<?php
    session_start();
    include ('system/Router.php');
    $scripts = null;
?>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Online Leasing | 平台后台管理系统</title>
<link href="/views/assets/plugins/bootstrap/css/bootstrap.min.css" rel="stylesheet">
<link href="/views/assets/plugins/font-awesome/css/font-awesome.css" rel="stylesheet">
<link href="/views/assets/plugins/morris/morris-0.4.3.min.css" rel="stylesheet">
<link href="/views/assets/plugins/timeline/timeline.css" rel="stylesheet">
<link href="/views/assets/base/css/sb-admin.css" rel="stylesheet">
</head>
<body>
<div id="loader"></div>
<div class="alert alert-danger"  id="ui_alert" role="alert"></div>