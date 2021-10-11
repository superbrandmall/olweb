<?php
session_start();
include ('system/Router.php');
$scripts = null;
?>
<!DOCTYPE html>
<html lang="zh-cmn-Hans">
    <head>
        <title>OLL线上租 | 卜蜂莲花</title>
        <meta name="description" content="OLL线上租 | 卜蜂莲花" />
        <meta charset="utf-8" />
        <meta name="viewport" id="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no">
        <meta content="yes" name="apple-mobile-web-app-capable" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <meta name="keywords" content="卜蜂莲花,超市,大卖场,租赁,泰国,正大" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="OLL线上租 | 卜蜂莲花">
        <meta property="og:description" content="数字化让租赁更透明，流程更简单">
        <meta property="og:image" content="https://ol.superbrandmall.com/views/assets/base/img/content/backgrounds/wechat-thumbnail.jpg">
        <meta property="og:url" content="https://ol.superbrandmall.com/lotus">
        <link rel="stylesheet" type="text/css" href="/views/assets/plugins/weui/css/weui.min.css" />
        <link rel="stylesheet" type="text/css" href="/views/assets/plugins/weui/css/weuix.css" />
        <link rel="stylesheet" type="text/css" href="/views/assets/plugins/animate/animate.min.css" />
        <link rel="stylesheet" type="text/css" href="/views/assets/plugins/font-awesome-4.7.0/css/font-awesome.min.css" />
        <link rel="stylesheet" type="text/css" href="/views/assets/base/css/sb-lotus.css" />
        <link rel="shortcut icon" type="image/x-icon" href="/views/assets/base/img/layout/logos/favicon.ico" />
        <script type="text/javascript" src="/views/assets/plugins/jquery.min.js"></script>
        <script type="text/javascript" src="/views/assets/base/js/lotus/api-configure.js"></script>
        <script type="text/javascript" src="/views/assets/plugins/jquery.cookie.js"></script>
    </head>
    <body ontouchstart>
        <div class="weui-toptips bg-warning" id="ui_alert" style="opacity: 1;"></div>
        <script>
        var appID = $.api.appId;
        var redirectUri = encodeURIComponent($.api.share+"/oauth2_lotus.php");
        var state = "1";
        var strUrl = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + appID + "&redirect_uri=" + redirectUri + "&response_type=code&scope=snsapi_userinfo&state=" + state + "&callback=" + sessionStorage.getItem('location_href') + "#wechat_redirect";
        var timestamp = Date.parse(new Date());

        if(window.location.href.indexOf('login') == -1){
            sessionStorage.setItem('location_href',window.location.href);
        }

        if(sessionStorage.getItem('wechat_user_info') != undefined && sessionStorage.getItem('wechat_user_info') != null && sessionStorage.getItem('wechat_user_info') != '') {
            var wechat_user_info = $.parseJSON(sessionStorage.getItem('wechat_user_info'));
            var openid = wechat_user_info.openid;

            $.cookie('uid',wechat_user_info.mobileNo);

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