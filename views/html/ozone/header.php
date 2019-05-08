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
<title>OZONE - 乐作生活</title>
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<meta http-equiv="Content-type" content="text/html; charset=utf-8">
<meta name="keywords" content="上海联合办公,出租上海写字楼,共享办公室上海,上海办公室出租,eat n work,上海办公楼出租,联合办公空间,联合办公出租,工位 出租,上海办公楼租赁,上海办公室租赁,上海写字楼出租,联合办公 空间,
      联合办公租赁,工位出租,共享办公室,funwork联合办公,wework" />
<meta property="og:type" content="website" />
<meta property="og:title" content="OZONE - 乐作生活">
<meta property="og:description" content="OZONE 致力于将“工作并快乐生活”的概念深耕至每一个人，让工作不再千篇⼀律、两点⼀线，重新定义生活哲学，实现新生代更多的“创意+”。">
<meta property="og:image" content="https://ol.superbrandmall.com/views/assets/base/img/content/backgrounds/wechat-thumbnail.jpg">
<meta property="og:url" content="http://ozone-cn.com/">
<!-- BEGIN GLOBAL MANDATORY STYLES -->
<link href="/views/assets/plugins/socicon/socicon.css" rel="stylesheet" type="text/css"/>
<link href="/views/assets/plugins/bootstrap-social/bootstrap-social.css" rel="stylesheet" type="text/css"/>
<link href="/views/assets/plugins/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css"/>
<link href="/views/assets/plugins/simple-line-icons/simple-line-icons.min.css" rel="stylesheet" type="text/css"/>
<link href="/views/assets/plugins/animate/animate.min.css" rel="stylesheet" type="text/css"/>
<link href="/views/assets/plugins/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css"/>
<!-- END GLOBAL MANDATORY STYLES -->
<!-- BEGIN: BASE PLUGINS  -->
<link href="/views/assets/plugins/revo-slider/css/settings.css" rel="stylesheet" type="text/css"/>
<link href="/views/assets/plugins/cubeportfolio/css/cubeportfolio.min.css" rel="stylesheet" type="text/css"/>
<link href="/views/assets/plugins/owl-carousel/owl.carousel.css" rel="stylesheet" type="text/css"/>
<link href="/views/assets/plugins/owl-carousel/owl.theme.css" rel="stylesheet" type="text/css"/>
<link href="/views/assets/plugins/owl-carousel/owl.transitions.css" rel="stylesheet" type="text/css"/>
<link href="/views/assets/plugins/fancybox/jquery.fancybox.css" rel="stylesheet" type="text/css"/>
<!-- END: BASE PLUGINS -->
<!-- BEGIN THEME STYLES -->
<link href="/views/assets/base/css/plugins.css" rel="stylesheet" type="text/css"/>
<link href="/views/assets/base/css/components.css?t=<?php echo date("Y-m-d")?>" id="style_components" rel="stylesheet" type="text/css"/>
<link href="/views/assets/base/css/themes/red1.css" rel="stylesheet" id="style_theme" type="text/css"/>
<link href="/views/assets/base/css/custom.css?t=<?php echo date("Y-m-d")?>" rel="stylesheet" type="text/css"/>
<!-- END THEME STYLES -->
<link rel="icon" href="/views/assets/base/img/layout/logos/favicon.ico" type="image/x-icon"/>
<link rel="shortcut icon" href="/views/assets/base/img/layout/logos/favicon.ico" type="image/x-icon"/>
<script src="/views/assets/plugins/jquery.min.js" type="text/javascript"></script>

<script>
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?ed58e2185471ba60a2249ef2d806d6c7";
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
                    <a href="https://ol.superbrandmall.com/" class="c-logo">
                        <img src="/views/assets/base/img/layout/logos/logo.png" alt="正大" height="40" class="c-desktop-logo">
                        <img src="/views/assets/base/img/layout/logos/logo.png" alt="正大" height="40" class="c-desktop-logo-inverse">
                        <img src="/views/assets/base/img/layout/logos/logo.png" alt="正大" height="25" class="c-mobile-logo">
                    </a>
                    <button class="c-hor-nav-toggler" type="button" data-target=".c-mega-menu">
                        <span class="c-line"></span>
                        <span class="c-line"></span>
                        <span class="c-line"></span>
                    </button>
                    <a href="co-work" class="c-logo">
                        <img src="/views/assets/base/img/content/mall/ozone/eat_n_work.png" alt="eat n work" class="c-desktop-logo" height="18" style="margin-left: 10px;">
                        <img src="/views/assets/base/img/content/mall/ozone/eat_n_work.png" alt="eat n work" class="c-desktop-logo-inverse" height="18" style="margin-left: 10px;">
                        <img src="/views/assets/base/img/content/mall/ozone/eat_n_work.png" alt="eat n work" class="c-mobile-logo" height="10" style="margin-left: 10px;">
                    </a>
                </div>
                
                <nav class="c-mega-menu c-pull-right c-mega-menu-dark c-mega-menu-dark-mobile c-theme c-fonts-bold">
                    <ul class="nav navbar-nav c-theme-nav">
                        <li class="c-menu-type-classic"><a href="about-us" class="c-link">关于我们</a></li>
                        <li class="c-menu-type-classic"><a href="#!" class="c-link dropdown-toggle"><i class="fa fa-caret-down"></i> 办公地点</a>
                            <ul class="dropdown-menu c-menu-type-classic c-pull-left" style="">
                                <li><a href="sh-space">上海</a></li>
                                <li><a href="ly-space">洛阳</a></li>
                            </ul>
                        </li>
                        <li class="c-menu-type-classic"><a href="co-work" class="c-link">关于eat n work</a></li>
                        <li class="c-menu-type-classic"><a href="room-type" class="c-link">房型介绍</a></li>
                        <li class="c-menu-type-classic"><a href="co-work#join_us" class="c-link">加入我们</a></li>
                        <li class="c-menu-type-classic"><a href="co-work#contact" class="c-link">联系我们</a></li>
                    </ul>
                </nav>
            </div>
        </div>
    </div>
</header>