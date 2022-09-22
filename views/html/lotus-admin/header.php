<?php
    session_start();
    include ('system/Router.php');
    $scripts = null;
?>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>卜蜂莲花 - 招商管理系统</title>
        <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
        <link rel="stylesheet" href="/views/assets/plugins/select2/select2.min.css">
        <link rel="stylesheet" href="/views/assets/base/css/lotus-admin/dist/all.css?t=<?php echo date("Y-m-d") ?>">
        <link rel="stylesheet" href="/views/assets/base/css/lotus-admin/bootstrap-table.css">
        <link rel="icon" href="/views/assets/base/img/content/lotus-admin/favicon.ico" type="image/x-icon"/>
        <link rel="shortcut icon" href="/views/assets/base/img/content/lotus-admin/favicon.ico" type="image/x-icon"/>
        <link rel="stylesheet" href="/views/assets/base/css/lotus-admin.css">
        <link rel="stylesheet" href="/views/assets/plugins/datepicker/bootstrap-datepicker.css" type="text/css" media="all" />
        <script>
            window.snipeit = {
                settings: {
                    "per_page": 10
                }
            };
        </script>
        <?php if ($_GET['p'] == 'lotus-admin/kow') { ?>
            <script type="text/javascript" src="//api.map.baidu.com/api?type=webgl&v=1.0&ak=fVgYajbwMUplLq0gZsLdh1AzeEfWUPpG"></script>
        <?php } ?>
    </head>
    <?php
    if(isset($_SESSION['lotus_admin_login'])) {
        if(isset($_GET['p']) && $_GET['p'] != 'lotus-admin/reset') {
    ?>
    <body class="sidebar-mini skin-blue " data-spy="scroll" data-target="#navbarTop" data-offset="190">
        <div id="loader"></div>
        <div class="wrapper">
            <header class="main-header">
                <nav class="navbar navbar-static-top" role="navigation">
                    <a href="#" style="color: white" class="sidebar-toggle btn btn-white" data-toggle="offcanvas" role="button">
                        <span class="sr-only">导航切换</span>
                    </a>
                    <ul class="nav navbar-nav navbar-left">
                        <li class="left-navblock">
                            <a class="logo navbar-brand no-hover" href="/lotus-admin/">
                                <img class="navbar-brand-img" src="/views/assets/base/img/content/lotus-admin/logo.png">
                            </a>
                        </li>
                        <li class="left-navblock hidden-xs hidden-sm">
                            <a href="/kow-admin" style="font-size: 15px;font-weight: bold;">
                                快闪店
                            </a>
                        </li>
                        <li class="left-navblock hidden-xs hidden-sm">
                            <a href="javascript: void(0);" style="font-size: 15px;font-weight: bold;">
                                系统
                            </a>
                        </li>
                    </ul>

                    <div class="navbar-custom-menu">
                        <ul class="nav navbar-nav">
                            <li class="dropdown location-select">
                                <a href="javascript: void(0);" class="dropdown-toggle" data-toggle="dropdown">
                                    <span id="locationSelected">选择区域</span><b class="caret"></b>
                                </a>
                                <ul class="dropdown-menu">
                                    <li>
                                        <a href="javascript: void(0);">
                                            <span>选择区域</span>
                                        </a>
                                    </li>
                                    <li class="to-select" style="display: none;">
                                        <a href="javascript: void(0);" class="text-blue" data-code="shanghai">
                                            <i class="fa fa-map-marker"></i>
                                            <span>上海</span>
                                        </a>
                                    </li>
                                    <li class="to-select" style="display: none;">
                                        <a href="javascript: void(0);" class="text-blue" data-code="xuzhou">
                                            <i class="fa fa-map-marker"></i>
                                            <span>徐州</span>
                                        </a>
                                    </li>
                                    <li class="to-select" style="display: none;">
                                        <a href="javascript: void(0);" class="text-blue" data-code="kunshan">
                                            <i class="fa fa-map-marker"></i>
                                            <span>昆山</span>
                                        </a>
                                    </li>
                                    <li class="to-select" style="display: none;">
                                        <a href="javascript: void(0);" class="text-blue" data-code="wuxi">
                                            <i class="fa fa-map-marker"></i>
                                            <span>无锡</span>
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            
                            <li class="dropdown mall-select">
                                <a href="javascript: void(0);" class="dropdown-toggle" data-toggle="dropdown">
                                    <span id="mallSelected">选择门店</span><b class="caret"></b>
                                </a>
                                <ul class="dropdown-menu">
                                    <li>
                                        <a href="javascript: void(0);">
                                            <span>选择门店</span>
                                        </a>
                                    </li>
                                    <li class="to-select shanghai" style="display: none;">
                                        <a href="javascript: void(0);" class="text-blue" data-code="SC033">
                                            <i class="fa fa-location-arrow"></i>
                                            <span>川沙店</span>
                                        </a>
                                    </li>
                                    <li class="to-select shanghai" style="display: none;">
                                        <a href="javascript: void(0);" class="text-blue" data-code="SC001">
                                            <i class="fa fa-location-arrow"></i>
                                            <span>杨高南路店</span>
                                        </a>
                                    </li>
                                    <li class="to-select shanghai" style="display: none;">
                                        <a href="javascript: void(0);" class="text-blue" data-code="SC005">
                                            <i class="fa fa-location-arrow"></i>
                                            <span>上南店</span>
                                        </a>
                                    </li>
                                    <li class="to-select shanghai" style="display: none;">
                                        <a href="javascript: void(0);" class="text-blue" data-code="SC011">
                                            <i class="fa fa-location-arrow"></i>
                                            <span>杨高北路店</span>
                                        </a>
                                    </li>
                                    <li class="to-select shanghai" style="display: none;">
                                        <a href="javascript: void(0);" class="text-blue" data-code="SC043">
                                            <i class="fa fa-location-arrow"></i>
                                            <span>杨高中路店</span>
                                        </a>
                                    </li>
                                    <li class="to-select shanghai" style="display: none;">
                                        <a href="javascript: void(0);" class="text-blue" data-code="SC078">
                                            <i class="fa fa-location-arrow"></i>
                                            <span>浦江店</span>
                                        </a>
                                    </li>
                                    <li class="to-select shanghai" style="display: none;">
                                        <a href="javascript: void(0);" class="text-blue" data-code="SC145">
                                            <i class="fa fa-location-arrow"></i>
                                            <span>临港店</span>
                                        </a>
                                    </li>
                                    <li class="to-select shanghai" style="display: none;">
                                        <a href="javascript: void(0);" class="text-blue" data-code="SC055">
                                            <i class="fa fa-location-arrow"></i>
                                            <span>松江文诚店</span>
                                        </a>
                                    </li>
                                    <li class="to-select shanghai" style="display: none;">
                                        <a href="javascript: void(0);" class="text-blue" data-code="SC027">
                                            <i class="fa fa-location-arrow"></i>
                                            <span>松江岳阳店</span>
                                        </a>
                                    </li>
                                    <li class="to-select shanghai" style="display: none;">
                                        <a href="javascript: void(0);" class="text-blue" data-code="SC126">
                                            <i class="fa fa-location-arrow"></i>
                                            <span>牡丹江店</span>
                                        </a>
                                    </li>
                                    <li class="to-select shanghai" style="display: none;">
                                        <a href="javascript: void(0);" class="text-blue" data-code="SC060">
                                            <i class="fa fa-location-arrow"></i>
                                            <span>蕴川店</span>
                                        </a>
                                    </li>
                                    <li class="to-select shanghai" style="display: none;">
                                        <a href="javascript: void(0);" class="text-blue" data-code="SC082">
                                            <i class="fa fa-location-arrow"></i>
                                            <span>新港店</span>
                                        </a>
                                    </li>
                                    <li class="to-select shanghai" style="display: none;">
                                        <a href="javascript: void(0);" class="text-blue" data-code="SC010">
                                            <i class="fa fa-location-arrow"></i>
                                            <span>汶水店</span>
                                        </a>
                                    </li>
                                    <li class="to-select shanghai" style="display: none;">
                                        <a href="javascript: void(0);" class="text-blue" data-code="SC040">
                                            <i class="fa fa-location-arrow"></i>
                                            <span>保德店</span>
                                        </a>
                                    </li>
                                    <li class="to-select shanghai" style="display: none;">
                                        <a href="javascript: void(0);" class="text-blue" data-code="SC041">
                                            <i class="fa fa-location-arrow"></i>
                                            <span>南奉店</span>
                                        </a>
                                    </li>
                                    <li class="to-select shanghai" style="display: none;">
                                        <a href="javascript: void(0);" class="text-blue" data-code="SC127">
                                            <i class="fa fa-location-arrow"></i>
                                            <span>南桥店</span>
                                        </a>
                                    </li>
                                    <li class="to-select shanghai" style="display: none;">
                                        <a href="javascript: void(0);" class="text-blue" data-code="SC050">
                                            <i class="fa fa-location-arrow"></i>
                                            <span>金山店</span>
                                        </a>
                                    </li>
                                    <li class="to-select xuzhou" style="display: none;">
                                        <a href="javascript: void(0);" class="text-blue" data-code="SC026">
                                            <i class="fa fa-location-arrow"></i>
                                            <span>解放南路店</span>
                                        </a>
                                    </li>
                                    <li class="to-select xuzhou" style="display: none;">
                                        <a href="javascript: void(0);" class="text-blue" data-code="SC130">
                                            <i class="fa fa-location-arrow"></i>
                                            <span>大学路店</span>
                                        </a>
                                    </li>
                                    <li class="to-select xuzhou" style="display: none;">
                                        <a href="javascript: void(0);" class="text-blue" data-code="SC138">
                                            <i class="fa fa-location-arrow"></i>
                                            <span>中山北路店</span>
                                        </a>
                                    </li>
                                    <li class="to-select kunshan" style="display: none;">
                                        <a href="javascript: void(0);" class="text-blue" data-code="SC034">
                                            <i class="fa fa-location-arrow"></i>
                                            <span>长江路店</span>
                                        </a>
                                    </li>
                                    <li class="to-select kunshan" style="display: none;">
                                        <a href="javascript: void(0);" class="text-blue" data-code="SC124">
                                            <i class="fa fa-location-arrow"></i>
                                            <span>花桥店</span>
                                        </a>
                                    </li>
                                    <li class="to-select wuxi" style="display: none;">
                                        <a href="javascript: void(0);" class="text-blue" data-code="SC140">
                                            <i class="fa fa-location-arrow"></i>
                                            <span>锡山东亭店</span>
                                        </a>
                                    </li>
                                </ul>
                            </li>

                            <li class="dropdown user user-menu">
                                <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                                    <img src="/views/assets/base/img/content/lotus-admin/avatar.png" class="user-image" alt="User Image">
                                    <span class="hidden-xs">
                                        <?php
                                        if(isset($_SESSION['lotus_admin_name'])) {
                                            echo $_SESSION['lotus_admin_name'];
                                        } else {
                                            echo "管理员";
                                        }
                                        ?>
                                        <b class="caret"></b></span>
                                </a>
                                <ul class="dropdown-menu">
                                    <li>
                                        <a href="javascript: logout();" title="登出">
                                            <i class="fa fa-sign-out fa-fw"></i>
                                            登出
                                        </a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </nav>
                <a href="#" class="sidebar-toggle-mobile visible-xs btn" data-toggle="offcanvas" role="button">
                    <span class="sr-only">导航切换</span>
                    <i class="fa fa-bars"></i>
                </a>
            </header>
            <?php
        }
    }
    ?>