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
        <title>招商管理系统 - [正大集团卜蜂莲花]</title>
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
                            <a class="logo navbar-brand no-hover" href="javascript: void(0);">
                                <img class="navbar-brand-img" src="/views/assets/base/img/content/lotus-admin/logo.png">
                            </a>
                        </li>
                        <li class="left-navblock hidden-xs hidden-sm">
                            <a href="/lotus-admin/todo" style="font-size: 15px;font-weight: bold;">
                                招商
                            </a>
                        </li>
                        <li class="left-navblock hidden-xs hidden-sm">
                            <a href="javascript: void(0);" style="font-size: 15px;font-weight: bold;">
                                物业
                            </a>
                        </li>
                        <li class="left-navblock hidden-xs hidden-sm">
                            <a href="/kow-admin" style="font-size: 15px;font-weight: bold;">
                                快闪
                            </a>
                        </li>
                        <li class="left-navblock hidden-xs hidden-sm">
                            <a href="/authorization/#/user" style="font-size: 15px;font-weight: bold;">
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
                                    <li class="to-select">
                                        <a href="javascript: void(0);" class="text-blue">
                                            <i class="fa fa-map-marker"></i>
                                            <span>上海市</span>
                                        </a>
                                    </li>
                                    <li class="to-select">
                                        <a href="javascript: void(0);" class="text-blue">
                                            <i class="fa fa-map-marker"></i>
                                            <span>北京市</span>
                                        </a>
                                    </li>
                                    <li class="to-select">
                                        <a href="javascript: void(0);" class="text-blue">
                                            <i class="fa fa-map-marker"></i>
                                            <span>重庆市</span>
                                        </a>
                                    </li>
                                    <li class="to-select">
                                        <a href="javascript: void(0);" class="text-blue">
                                            <i class="fa fa-map-marker"></i>
                                            <span>江苏省</span>
                                        </a>
                                    </li>
                                    <li class="to-select">
                                        <a href="javascript: void(0);" class="text-blue">
                                            <i class="fa fa-map-marker"></i>
                                            <span>河南省</span>
                                        </a>
                                    </li>
                                    <li class="to-select">
                                        <a href="javascript: void(0);" class="text-blue">
                                            <i class="fa fa-map-marker"></i>
                                            <span>山东省</span>
                                        </a>
                                    </li>
                                    <li class="to-select">
                                        <a href="javascript: void(0);" class="text-blue">
                                            <i class="fa fa-map-marker"></i>
                                            <span>湖南省</span>
                                        </a>
                                    </li>
                                    <li class="to-select">
                                        <a href="javascript: void(0);" class="text-blue">
                                            <i class="fa fa-map-marker"></i>
                                            <span>陕西省</span>
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            
                            <li class="dropdown mall-select">
                                <a href="javascript: void(0);" class="dropdown-toggle" data-toggle="dropdown">
                                    <span id="mallSelected">选择项目</span><b class="caret"></b>
                                </a>
                                <ul class="dropdown-menu">
                                    <li>
                                        <a href="javascript: void(0);">
                                            <span>选择项目</span>
                                        </a>
                                    </li>
                                </ul>
                            </li>

                            <li class="dropdown user user-menu">
                                <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                                    <i class="fa fa-user"></i>
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
<!--                <a href="#" class="sidebar-toggle-mobile visible-xs btn" data-toggle="offcanvas" role="button">
                    <span class="sr-only">导航切换</span>
                    <i class="fa fa-bars"></i>
                </a>-->
            </header>
            <?php
        }
    }
    ?>