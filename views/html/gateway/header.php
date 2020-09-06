<?php
include ('system/Router.php');
?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="description" content="">
        <meta name="author" content="">
        <title>Online Leasing - 订单支付选择</title>
        <link href="/views/assets/plugins/bootstrap/css/bootstrap.min.css" rel="stylesheet">
        <link href="/views/assets/base/css/gateway.css" rel="stylesheet">
        <style>
            .portfolio-item a {
                border: solid 2px #dbdbdb;
                display: block;
                outline: none;
            }
            
            .portfolio-item a.active {
                border: solid 2px #3fc4ff;
            }
            
            .portfolio-item img {
                margin: 0 auto;
            }
        </style>
    </head>

    <body>
        <div class="weui-toptips bg-warning" id="ui_alert" style="opacity: 1;"></div>
        <nav class="navbar navbar-fixed-top navbar-inverse" role="navigation">
            <div class="container">
                <div class="navbar-header">
                    <img class="navbar-brand" src="/views/assets/base/img/layout/logos/logo.png" alt="正大">
                </div>
            </div><!-- /.container -->
        </nav>

