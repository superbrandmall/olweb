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
<title>Online Leasing | <?= $lang['nav_title'] ?></title>
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
<link href="views/assets/base/css/components.css?t=<?php echo date("Y-m-d")?>" id="style_components" rel="stylesheet" type="text/css"/>
<link href="views/assets/base/css/themes/red1.css" rel="stylesheet" id="style_theme" type="text/css"/>
<link href="views/assets/base/css/custom.css?t=<?php echo date("Y-m-d")?>" rel="stylesheet" type="text/css"/>
<!-- END THEME STYLES -->
<link rel="icon" href="views/assets/base/img/layout/logos/favicon.ico" type="image/x-icon"/>
<link rel="shortcut icon" href="views/assets/base/img/layout/logos/favicon.ico" type="image/x-icon"/>
<script src="views/assets/plugins/jquery.min.js" type="text/javascript"></script>

<script>
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?e00d3e6681b0b3f02f92f9c45bd58997";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();
</script>
</head>
<body class="c-layout-header-fixed<?php if (!isset($_GET['p']) || $_GET['p'] == 'home') { echo ' c-layout-header-fullscreen';} ?>">
<div id="loader"></div>
<div class="alert alert-danger"  id="ui_alert" role="alert"></div>
<div class="alert alert-success"  id="ui_congrats" role="alert"></div>
<header class="c-layout-header c-layout-header-3 c-layout-header-default-mobile">
    <div class="c-topbar" style="display: none;">
        <div class="c-topbar-inner c-bg-dark">
			<div class="container">
				<h3 class="c-topbar-title c-font-white c-font-12 c-font-thin c-center">
					<i class="fa fa-exclamation-circle"></i> <?= $lang['nav_cookie_policy'] ?>
                    <a href="cookie.html" target="_blank" class="c-font-bold c-font-red1 c-font-white-hover"><?= $lang['nav_cookie_know_more'] ?></a>
				</h3>
				<a href="#" class="c-topbar-close c-font-red1 c-font-white-hover"><i class="fa fa-close"></i></a>
			</div>
		</div>
    </div>
    <div class="c-navbar">
        <div class="container">
            <div class="c-navbar-wrapper clearfix">
                <div class="c-brand c-pull-left">
                    <a href="/" class="c-logo">
                        <img src="views/assets/base/img/layout/logos/logo.png" alt="正大" height="40" class="c-desktop-logo">
                        <img src="views/assets/base/img/layout/logos/logo.png" alt="正大" height="40" class="c-desktop-logo-inverse">
                        <img src="views/assets/base/img/layout/logos/logo.png" alt="正大" height="25" class="c-mobile-logo">
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
                    <li class="<?php if (isset($_GET['p']) && substr($_GET['p'],0,6) == 'olmall') { echo 'c-active '; } ?>c-menu-type-classic">
                        <a href="#!" class="c-link dropdown-toggle"><i class="fa fa-caret-down"></i> <?= $lang['nav_malls'] ?></a>
                        <ul id="mall_list_top" class="dropdown-menu c-menu-type-classic c-pull-left"></ul>
                    </li>
                    <li class="<?php if (isset($_GET['p']) && $_GET['p'] == 'requirement') { echo 'c-active '; } ?>c-menu-type-classic">
                        <a href="requirement" class="c-link"><i class="fa fa-search"></i> <?= $lang['nav_search'] ?></a>
                    </li>
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
