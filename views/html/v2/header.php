<?php
session_start();
include ('system/Router.php');
$scripts = null;

if ($page !== 'default.php' && $page !== 'login.php' && $page !== 'ljz.php' && $page !== 'xh.php' && $page !== 'bs.php' && $page !== 'ly.php') {
    ?>
    <!DOCTYPE html>
    <html lang="zh-cmn-Hans">
        <head>
            <title>Online Leasing | 正大商业地产</title>
            <meta name="description" content="Online Leasing | 正大商业地产" />
            <meta charset="utf-8" />
            <meta name="viewport" id="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no">
            <meta content="yes" name="apple-mobile-web-app-capable" />
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-status-bar-style" content="black" />
            <link href="/views/assets/plugins/weui/css/weui.min.css" rel="stylesheet" type="text/css" />
            <link href="/views/assets/plugins/weui/css/weuix.css" rel="stylesheet" type="text/css" />
            <link href="/views/assets/plugins/animate/animate.min.css" rel="stylesheet" type="text/css" />
            <link href="/views/assets/plugins/font-awesome-4.7.0/css/font-awesome.min.css" rel="stylesheet">
            <link href="/views/assets/plugins/weui/css/APlayer.min.css" rel="stylesheet" type="text/css" />
            <link href="/views/assets/base/css/sb-v2.css" rel="stylesheet">
            <link href="/views/assets/base/img/layout/logos/favicon.ico" rel="shortcut icon" type="image/x-icon"/>
        </head>
        <body ontouchstart>
            <div class="weui-toptips bg-warning" id="ui_alert" style="opacity: 1;"></div>

            <?php
        } else {
            ?>

        <!DOCTYPE html>
        <html>
            <head>
                <meta charset="utf-8" />
                <meta name="keywords" content="" />
                <meta name="description" content="" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
                <link href="/views/assets/base/img/layout/logos/favicon.ico" rel="shortcut icon" type="image/x-icon"/>
                <link rel="stylesheet" type="text/css" href="/views/assets/base/css/nikola/bootstrap.min.css" />
                <link rel="stylesheet" type="text/css" href="/views/assets/base/css/nikola.css" />
                <link rel="stylesheet" type="text/css" href="/views/assets/base/css/nikola/animate.min.css" />
                <link rel="stylesheet" type="text/css" href="/views/assets/base/css/nikola/cookieconsent.min.css" />
                <link rel="stylesheet" type="text/css" href="/views/assets/base/css/nikola/font-awesome.min.css" />
                <link href="https://fonts.googleapis.com/css?family=Oxygen:300,400,700&amp;subset=latin,latin-ext" rel="stylesheet" type="text/css" />
                <link href="https://fonts.googleapis.com/css?family=Montserrat:200,300,500,600,700&amp;subset=latin,latin-ext" rel="stylesheet" type="text/css" />
                <title>Online Leasing | 正大商业地产</title>
            </head>
            <body>
                <!-- Main container -->
                    <?php
                }
                ?>

       <?php include ('navbar_top.php'); ?>             