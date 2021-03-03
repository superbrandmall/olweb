<?php
session_start();
include ('system/Router.php');
$scripts = null;

if(!in_array($page, $page_nikola)) {
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
            <script src="/views/assets/plugins/jquery.min.js" type="text/javascript"></script>
            <script src="/views/assets/base/js/v2/api-configure.js" type="text/javascript" ></script>
        </head>
        <body ontouchstart>
            <div class="weui-toptips bg-warning" id="ui_alert" style="opacity: 1;"></div>

            <?php
        } else {
            ?>

        <!DOCTYPE html>
        <html>
            <head>
                <title>Online Leasing | 正大商业地产</title>
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
                <script src="/views/assets/base/js/nikola/jquery-3.3.1.min.js" type="text/javascript"></script>
                <script src="/views/assets/base/js/v2/api-configure.js" type="text/javascript" ></script>
            </head>
            <body>
                <!-- Main container -->
                    <?php
                }
                ?>
                
                <script>
		var appID = $.api.appId;
		var redirectUri = encodeURIComponent($.api.share+"/oauth2.html");
                var state = "1";
                var strUrl = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + appID + "&redirect_uri=" + redirectUri + "&response_type=code&scope=snsapi_userinfo&state=" + state + "#wechat_redirect";
                var timestamp = Date.parse(new Date());
                sessionStorage.setItem('location_href',window.location.href);
                
                if(sessionStorage.getItem('wechat_user_info') != undefined && sessionStorage.getItem('wechat_user_info') != null && sessionStorage.getItem('wechat_user_info') != '') {
                    var wechat_user_info = $.parseJSON(sessionStorage.getItem('wechat_user_info'));
                    var openid = wechat_user_info.openid;
                    if(openid == undefined || openid == null || openid == ''){
                        window.location.href = strUrl;
                    } else {
                        if(timestamp - sessionStorage.getItem('authorize_time') > 2592000000){ //30天
                            window.location.href = strUrl;
                        }
                    }
                } else {
                    window.location.href = strUrl;
                }
            </script>

       <?php include ('navbar_top.php'); ?>             