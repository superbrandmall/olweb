<?php
session_start();

include ('system/Router.php');
$scripts = null;

if(!in_array($page, $page_nikola)) {
    ?>
    <!DOCTYPE html>
    <html lang="zh-cmn-Hans">
        <head>
            <title>OLL线上租 | OnLine Leasing</title>
            <meta name="description" content="OLL线上租 | OnLine Leasing" />
            <meta charset="utf-8" />
            <meta name="viewport" id="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no">
            <meta content="yes" name="apple-mobile-web-app-capable" />
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-status-bar-style" content="black" />
            <meta name="keywords" content="正大商业地产,cp commercial real,正大广场最新楼层指南,正大广场,上海正大广场,正大,上海帝泰发展有限公司,
              上海正大广场官网,正大广场官网,上海正大广场所有品牌,正大地产,super brand mall,superbrandmall,正大商业地产,super brand mall shanghai,正大廣場,
              www.superbrandmall.com,正大广场有哪些品牌,浦东正大广场,陆家嘴正大广场,上海 正大广场,superbrand mall,正大广场商家,上海正大广场品牌,
              上海正大,super brand mall pudong,正大广场 上海,正大商业集团,正大广场品牌,正大商业,正大广场 品牌,正大广场活动,Super brand mall,帝泰,
              正大官网,正大广场 亲子娱乐,Super brand mall shanghai,superbrand mall pudong,上海陆家嘴正大广场,正大广场网站,上海正大广场品牌男装,
              上海正大集团有限公司,上海浦东正大广场,正大地产官网,正大商业房地产,上海市正大广场,Super Brand Mall,正大广场 英文,正大广场英文地址,
              正大广场有哪些牌子,superbrand mall adidas,上海正大广场活动,上海正大广场店,上海帝泰,上海浦东新区正大广场,super brand mall shanghai stores,
              正大广场上海,正大购物广场,superbrand mall shanghai,正大集团,正大商场,上海正大百货,正大广场入驻品牌,上海正大广场入驻品牌,正大广场商铺,
              上海正大广场楼层指南,上海正大广场网站,上海 浦东 正大广场,mall,正大广场都有什么品牌" />
            <meta property="og:type" content="website" />
            <meta property="og:title" content="OLL线上租 | OnLine Leasing">
            <meta property="og:description" content="数字化让租赁更透明，流程更简单">
            <meta property="og:image" content="https://ol.superbrandmall.com/views/assets/base/img/content/backgrounds/wechat-thumbnail.jpg">
            <meta property="og:url" content="https://ol.superbrandmall.com/v2">
            <link rel="stylesheet" type="text/css" href="/views/assets/plugins/weui/css/weui.min.css" />
            <link rel="stylesheet" type="text/css" href="/views/assets/plugins/weui/css/weuix.css" />
            <link rel="stylesheet" type="text/css" href="/views/assets/plugins/animate/animate.min.css" />
            <link rel="stylesheet" type="text/css" href="/views/assets/plugins/font-awesome-4.7.0/css/font-awesome.min.css" />
            <link rel="stylesheet" type="text/css" href="/views/assets/plugins/weui/css/APlayer.min.css" />
            <link rel="stylesheet" type="text/css" href="/views/assets/base/css/live-chat.css" />
            <link rel="stylesheet" type="text/css" href="/views/assets/base/css/sb-v2.css" />
            <link rel="shortcut icon" type="image/x-icon" href="/views/assets/base/img/layout/logos/favicon.ico" />
            <script type="text/javascript" src="/views/assets/plugins/jquery.min.js"></script>
            <script type="text/javascript" src="/views/assets/base/js/v2/api-configure.js"></script>
            <script type="text/javascript" src="/views/assets/plugins/jquery.cookie.js"></script>
            
            <script>
                var _hmt = _hmt || [];
                (function() {
                  var hm = document.createElement("script");
                  hm.src = "https://hm.baidu.com/hm.js?65074846c6d6d010d52fa0091f90561c";
                  var s = document.getElementsByTagName("script")[0]; 
                  s.parentNode.insertBefore(hm, s);
                })();
            </script>
        </head>
        <body ontouchstart>
            <div class="weui-toptips bg-warning" id="ui_alert" style="opacity: 1;"></div>

            <?php
        } else {
            ?>

        <!DOCTYPE html>
        <html>
            <head>
                <title>OLL线上租 | OnLine Leasing</title>
                <meta name="description" content="OLL线上租 | OnLine Leasing" />
                <meta charset="utf-8" />
                <meta name="keywords" content="" />
                <meta name="description" content="" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
                <meta name="keywords" content="正大商业地产,cp commercial real,正大广场最新楼层指南,正大广场,上海正大广场,正大,上海帝泰发展有限公司,
              上海正大广场官网,正大广场官网,上海正大广场所有品牌,正大地产,super brand mall,superbrandmall,正大商业地产,super brand mall shanghai,正大廣場,
              www.superbrandmall.com,正大广场有哪些品牌,浦东正大广场,陆家嘴正大广场,上海 正大广场,superbrand mall,正大广场商家,上海正大广场品牌,
              上海正大,super brand mall pudong,正大广场 上海,正大商业集团,正大广场品牌,正大商业,正大广场 品牌,正大广场活动,Super brand mall,帝泰,
              正大官网,正大广场 亲子娱乐,Super brand mall shanghai,superbrand mall pudong,上海陆家嘴正大广场,正大广场网站,上海正大广场品牌男装,
              上海正大集团有限公司,上海浦东正大广场,正大地产官网,正大商业房地产,上海市正大广场,Super Brand Mall,正大广场 英文,正大广场英文地址,
              正大广场有哪些牌子,superbrand mall adidas,上海正大广场活动,上海正大广场店,上海帝泰,上海浦东新区正大广场,super brand mall shanghai stores,
              正大广场上海,正大购物广场,superbrand mall shanghai,正大集团,正大商场,上海正大百货,正大广场入驻品牌,上海正大广场入驻品牌,正大广场商铺,
              上海正大广场楼层指南,上海正大广场网站,上海 浦东 正大广场,mall,正大广场都有什么品牌" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="OLL线上租 | OnLine Leasing">
                <meta property="og:description" content="数字化让租赁更透明，流程更简单">
                <meta property="og:image" content="https://ol.superbrandmall.com/views/assets/base/img/content/backgrounds/wechat-thumbnail.jpg">
                <meta property="og:url" content="https://ol.superbrandmall.com/v2">
                <link href="/views/assets/base/img/layout/logos/favicon.ico" rel="shortcut icon" type="image/x-icon"/>
                <link rel="stylesheet" type="text/css" href="/views/assets/base/css/nikola/bootstrap.min.css" />
                <link rel="stylesheet" type="text/css" href="/views/assets/base/css/nikola.css" />
                <link rel="stylesheet" type="text/css" href="/views/assets/base/css/nikola/animate.min.css" />
                <link rel="stylesheet" type="text/css" href="/views/assets/base/css/live-chat.css" />
                <link rel="stylesheet" type="text/css" href="/views/assets/base/css/nikola/cookieconsent.min.css" />
                <link rel="stylesheet" type="text/css" href="/views/assets/base/css/nikola/font-awesome.min.css" />
                <link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Oxygen:300,400,700&amp;subset=latin,latin-ext" />
                <link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Montserrat:200,300,500,600,700&amp;subset=latin,latin-ext" />
                <script type="text/javascript" src="/views/assets/base/js/nikola/jquery-3.3.1.min.js"></script>
                <script type="text/javascript" src="/views/assets/base/js/v2/api-configure.js"></script>
                <script type="text/javascript" src="/views/assets/plugins/jquery.cookie.js"></script>
                <script>
                    var _hmt = _hmt || [];
                    (function() {
                      var hm = document.createElement("script");
                      hm.src = "https://hm.baidu.com/hm.js?65074846c6d6d010d52fa0091f90561c";
                      var s = document.getElementsByTagName("script")[0]; 
                      s.parentNode.insertBefore(hm, s);
                    })();
                </script>
            </head>
            <body>
                <!-- Main container -->
                    <?php
                }
                ?>
                
                <script>
		var appID = $.api.appId;
		var redirectUri = encodeURIComponent($.api.share+"/oauth2.php");
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
                <div id="ui_alert" style="display: none;"></div>
       <?php include ('navbar_top.php'); ?>             