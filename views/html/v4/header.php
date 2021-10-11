<?php
session_start();

include ('system/Router.php');
$scripts = null;
?>

<!DOCTYPE html>
<html lang="zh-CN">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
        <title>首页</title>
        <meta name="keywords" content="">
        <meta name="description" content="">
        <script src="/views/assets/base/js/v3/rem.js"></script>
        <script src="/views/assets/base/js/v3/jquery.min.js" type="text/javascript"></script>
        <link rel="stylesheet" type="text/css" href="/views/assets/base/css/v3/base.css"/>
        <link rel="stylesheet" type="text/css" href="/views/assets/base/css/v3/page.css?t=<?php echo date("Y-m-d") ?>"/>
        <link rel="stylesheet" type="text/css" href="/views/assets/base/css/v3/all.css"/>
        <link rel="stylesheet" type="text/css" href="/views/assets/base/css/v3/mui.min.css?t=<?php echo date("Y-m-d") ?>"/>
        <link rel="stylesheet" type="text/css" href="/views/assets/base/css/v3/loaders.min.css"/>
        <link rel="stylesheet" type="text/css" href="/views/assets/base/css/v3/loading.css"/>
        <link rel="stylesheet" type="text/css" href="/views/assets/plugins/slick/slick.css"/>
        <script type="text/javascript">
            $(window).load(function () {
                $(".loading").addClass("loader-chanage")
                $(".loading").fadeOut(300)
            })
        </script>
    </head>
    <!--loading页开始-->
    <div class="loading">
        <div class="loader">
            <div class="loader-inner pacman">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    </div>
    <!--loading页结束-->
    <body>