<?php
    ini_set('session.cache_limiter','public');
    session_cache_limiter(false);
    session_start();
    include ('system/Router.php');
    $scripts = null;
    
    if(strpos($_SERVER['REQUEST_URI'], 'lang=en') == true) {
        $_SESSION["lang"] = 'en';
    } else if(strpos($_SERVER['REQUEST_URI'], 'lang=cn') == true) {
        $_SESSION["lang"] = 'cn';
    } else if(!isset($_SESSION["lang"])) {
        $_SESSION["lang"] = 'cn';
    }

    $filename = "lang/".$_SESSION["lang"].".php";
    include("views/assets/base/".$filename);
?>
<!DOCTYPE html>
<!--[if IE 9]> <html lang="en" class="ie9"> <![endif]-->
<!--[if !IE]><!-->
<html lang="en">
<!--<![endif]-->
<!-- BEGIN HEAD -->
<head>
<meta charset="utf-8"/>
<title>Online Leasing | 正大商业房地产管理有限公司</title>
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<meta http-equiv="Content-type" content="text/html; charset=utf-8">
<meta name="keywords" content="正大, 正大广场, 正大乐城, 上海, 徐汇, 宝山, 滨江, 顾村公园, 商铺, 商场, 郑州, 陆家嘴, 郑东新区, 浦东, 租赁, 在线租赁, leasing, online leasing" />
<!-- BEGIN GLOBAL MANDATORY STYLES -->
<link href="views/assets/plugins/socicon/socicon.css" rel="stylesheet" type="text/css"/>
<link href="views/assets/plugins/bootstrap-social/bootstrap-social.css" rel="stylesheet" type="text/css"/>
<link href="views/assets/plugins/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css"/>
<link href="views/assets/plugins/simple-line-icons/simple-line-icons.min.css" rel="stylesheet" type="text/css"/>
<link href="views/assets/plugins/animate/animate.min.css" rel="stylesheet" type="text/css"/>
<link href="views/assets/plugins/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css"/>
<!-- END GLOBAL MANDATORY STYLES -->
<!-- BEGIN: BASE PLUGINS  -->
<link href="views/assets/plugins/revo-slider/css/settings.css" rel="stylesheet" type="text/css"/>
<link href="views/assets/plugins/cubeportfolio/css/cubeportfolio.min.css" rel="stylesheet" type="text/css"/>
<link href="views/assets/plugins/owl-carousel/owl.carousel.css" rel="stylesheet" type="text/css"/>
<link href="views/assets/plugins/owl-carousel/owl.theme.css" rel="stylesheet" type="text/css"/>
<link href="views/assets/plugins/owl-carousel/owl.transitions.css" rel="stylesheet" type="text/css"/>
<link href="views/assets/plugins/fancybox/jquery.fancybox.css" rel="stylesheet" type="text/css"/>
<!-- END: BASE PLUGINS -->
<!-- BEGIN THEME STYLES -->
<link href="views/assets/base/css/plugins.css" rel="stylesheet" type="text/css"/>
<link href="views/assets/base/css/components.css" id="style_components" rel="stylesheet" type="text/css"/>
<link href="views/assets/base/css/themes/red1.css" rel="stylesheet" id="style_theme" type="text/css"/>
<link href="views/assets/base/css/custom.css" rel="stylesheet" type="text/css"/>
<!-- END THEME STYLES -->
<link rel="icon" href="views/assets/base/img/layout/logos/favicon.ico" type="image/x-icon"/>
<link rel="shortcut icon" href="views/assets/base/img/layout/logos/favicon.ico" type="image/x-icon"/>
<script src="views/assets/plugins/jquery.min.js" type="text/javascript"></script>
</head>
<body class="c-layout-header-fixed<?php if (!isset($_GET['p']) || $_GET['p'] == 'home') { echo ' c-layout-header-fullscreen';} ?>">
<div id="loader"></div>
<div class="alert alert-danger"  id="ui_alert" role="alert"></div>
<div class="alert alert-success"  id="ui_congrats" role="alert"></div>
<header class="c-layout-header c-layout-header-3 c-layout-header-default-mobile">
    <div class="c-navbar">
        <div class="container">
            <div class="c-navbar-wrapper clearfix">
                <div class="c-brand c-pull-left">
                    <a href="/" class="c-logo">
                        <img src="views/assets/base/img/layout/logos/sbm_logo.png" alt="正大" height="40" class="c-desktop-logo">
                        <img src="views/assets/base/img/layout/logos/sbm_logo.png" alt="正大" height="40" class="c-desktop-logo-inverse">
                        <img src="views/assets/base/img/layout/logos/sbm_logo.png" alt="正大" height="25" class="c-mobile-logo">
                    </a>
                    <button class="c-hor-nav-toggler" type="button" data-target=".c-mega-menu">
                        <span class="c-line"></span>
                        <span class="c-line"></span>
                        <span class="c-line"></span>
                    </button>
                </div>
                
                <nav class="c-mega-menu c-pull-right c-mega-menu-dark c-mega-menu-dark-mobile c-theme c-fonts-uppercase c-fonts-bold">
                <ul class="nav navbar-nav c-theme-nav">
                    <li class="<?php if (!isset($_GET['p']) || $_GET['p'] == 'home' || $_GET['p'] == '') { echo 'c-active '; } ?>c-menu-type-classic">
                        <a href="/" class="c-link"><i class="fa fa-home"></i> <?= $lang['nav_home'] ?></a>
                    </li>
                    <li class="c-menu-type-classic">
                        <a href="#!" class="c-link dropdown-toggle"><i class="fa fa-caret-down"></i> 项目</a>
                        <ul id="mall_list_top" class="dropdown-menu c-menu-type-classic c-pull-left"></ul>
                    </li>
                    <li class="<?php if (isset($_GET['p']) && $_GET['p'] == 'requirement') { echo 'c-active '; } ?>c-menu-type-classic">
                        <a href="requirement" class="c-link"><i class="fa fa-search"></i> 搜索</a>
                    </li>
                    <?php if(isset($_SESSION['user_login'])) { ?>
                    <li class="<?php if (isset($_GET['p']) && $_GET['p'] == 'my-info') { echo 'c-active '; } ?>c-menu-type-classic">
                        <a href="my-info" class="c-link"><i class="fa fa-user"></i> 个人</a>
                    </li>
                    <li class="<?php if (isset($_GET['p']) && $_GET['p'] == 'my-favourite') { echo 'c-active '; } ?>c-menu-type-classic">
                        <a href="my-favourite" class="c-link"><i class="fa fa-heart"></i> 关注</a>
                    </li>
                    <li class="<?php if (isset($_GET['p']) && $_GET['p'] == 'my-reservations') { echo 'c-active '; } ?>c-menu-type-classic">
                        <a href="my-reservations" class="c-link"><i class="fa fa-clock-o"></i> 预约</a>
                    </li>
                    <li class="c-menu-type-classic">
                        <a href="javascript: logout();" class="c-link"><i class="fa fa-sign-out"></i> <?= $lang['nav_logout'] ?></a>
                    </li>
                    <?php } else { ?>
                    <li>
                        <a href="javascript:;" data-toggle="modal" data-target="#login-form" class="c-btn-border-opacity-04 c-btn btn-no-focus c-btn-header btn btn-sm c-btn-border-1x c-btn-white c-btn-circle c-btn-uppercase c-btn-sbold"><i class="icon-user"></i> <?= $lang['nav_login'] ?></a>
                    </li>
                    <li>
                        <a href="javascript:;" data-toggle="modal" data-target="#step1" class="c-btn-border-opacity-04 c-btn btn-no-focus c-btn-header btn btn-sm c-btn-border-1x c-btn-white c-btn-circle c-btn-uppercase c-btn-sbold"><i class="icon-note"></i> <?= $lang['nav_register'] ?></a>
                    </li>
                    <?php } ?>
                    <li class="c-menu-type-classic">
                        <?php if (isset($_SESSION["lang"]) && $_SESSION["lang"] == 'en') { ?>
                        <a href="/?lang=cn" class="c-link" id="c_link_cn"><img src="views/assets/base/img/content/misc/cn.png" alt="正大" width="20" > 中文</a>
                        <?php } else { ?>
                        <a href="/?lang=en" class="c-link" id="c_link_en"><img src="views/assets/base/img/content/misc/en.png" alt="正大" width="20" > EN</a>
                        <?php } ?>
                    </li>
                </ul>
                </nav>
            </div>
        </div>
    </div>
</header>

<?php 
if(!isset($_SESSION['user_login']) || $_SESSION['user_login'] == "") {
    // BEGIN: 注册页/登录页
    include ('register.php');
    include ('login.php');
    // END: 注册页/登录页
}
?>

<div class="alert alert-success login-succeed" role="alert">
    <?= $lang['login_succeed'].$_SESSION['user_login'] ?>
</div>