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
        <link href="/views/assets/base/css/lotus-admin.css" rel="stylesheet">
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
    <body class="sidebar-mini skin-blue ">
        <div id="loader"></div>
        <div class="wrapper">
            <header class="main-header">
                <nav class="navbar navbar-static-top" role="navigation">
                    <a href="#" style="color: white" class="sidebar-toggle btn btn-white" data-toggle="offcanvas" role="button">
                        <span class="sr-only">导航切换</span>
                    </a>
                    <ul class="nav navbar-nav navbar-left">
                        <li class="left-navblock">
                            <a class="logo navbar-brand no-hover" href="/lotus-admin/home">
                                <img class="navbar-brand-img" src="/views/assets/base/img/content/lotus-admin/logo.png">
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
                                        <a href="javascript: void(0);" data-code="jiangsu">
                                            <i class="fa fa-map-marker"></i>
                                            <span>江苏</span>
                                        </a>
                                    </li>
                                    <li class="to-select" style="display: none;">
                                        <a href="javascript: void(0);" data-code="guangzhou">
                                            <i class="fa fa-map-marker"></i>
                                            <span>广州</span>
                                        </a>
                                    </li>
                                    <li class="to-select" style="display: none;">
                                        <a href="javascript: void(0);" data-code="beijing">
                                            <i class="fa fa-map-marker"></i>
                                            <span>北京</span>
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
                                    <li class="to-select" style="display: none;">
                                        <a href="javascript: void(0);" class="text-blue" data-code="SC033">
                                            <i class="fa fa-location-arrow"></i>
                                            <span>川沙店</span>
                                        </a>
                                    </li>
                                    <li class="to-select" style="display: none;">
                                        <a href="javascript: void(0);" data-code="SC001">
                                            <i class="fa fa-location-arrow"></i>
                                            <span>杨高南路店</span>
                                        </a>
                                    </li>
                                    <li class="to-select" style="display: none;">
                                        <a href="javascript: void(0);" class="text-blue" data-code="SC005">
                                            <i class="fa fa-location-arrow"></i>
                                            <span>上南店</span>
                                        </a>
                                    </li>
                                    <li class="to-select" style="display: none;">
                                        <a href="javascript: void(0);" class="text-blue" data-code="SC011">
                                            <i class="fa fa-location-arrow"></i>
                                            <span>杨高北路店</span>
                                        </a>
                                    </li>
                                    <li class="to-select" style="display: none;">
                                        <a href="javascript: void(0);" data-code="SC043">
                                            <i class="fa fa-location-arrow"></i>
                                            <span>杨高中路店</span>
                                        </a>
                                    </li>
                                    <li class="to-select" style="display: none;">
                                        <a href="javascript: void(0);" class="text-blue" data-code="SC078">
                                            <i class="fa fa-location-arrow"></i>
                                            <span>浦江店</span>
                                        </a>
                                    </li>
                                    <li class="to-select" style="display: none;">
                                        <a href="javascript: void(0);" class="text-blue" data-code="SC145">
                                            <i class="fa fa-location-arrow"></i>
                                            <span>临港店</span>
                                        </a>
                                    </li>
                                    <li class="to-select" style="display: none;">
                                        <a href="javascript: void(0);" class="text-blue" data-code="SC055">
                                            <i class="fa fa-location-arrow"></i>
                                            <span>文诚店</span>
                                        </a>
                                    </li>
                                    <li class="to-select" style="display: none;">
                                        <a href="javascript: void(0);" data-code="SC027">
                                            <i class="fa fa-location-arrow"></i>
                                            <span>岳阳店</span>
                                        </a>
                                    </li>
                                    <li class="to-select" style="display: none;">
                                        <a href="javascript: void(0);" class="text-blue" data-code="SC126">
                                            <i class="fa fa-location-arrow"></i>
                                            <span>牡丹江路店</span>
                                        </a>
                                    </li>
                                    <li class="to-select" style="display: none;">
                                        <a href="javascript: void(0);" class="text-blue" data-code="SC060">
                                            <i class="fa fa-location-arrow"></i>
                                            <span>蕴川店</span>
                                        </a>
                                    </li>
                                    <li class="to-select" style="display: none;">
                                        <a href="javascript: void(0);" class="text-blue" data-code="SC082">
                                            <i class="fa fa-location-arrow"></i>
                                            <span>新港店</span>
                                        </a>
                                    </li>
                                    <li class="to-select" style="display: none;">
                                        <a href="javascript: void(0);" data-code="SC010">
                                            <i class="fa fa-location-arrow"></i>
                                            <span>汶水店</span>
                                        </a>
                                    </li>
                                    <li class="to-select" style="display: none;">
                                        <a href="javascript: void(0);" data-code="SC040">
                                            <i class="fa fa-location-arrow"></i>
                                            <span>保德店</span>
                                        </a>
                                    </li>
                                    <li class="to-select" style="display: none;">
                                        <a href="javascript: void(0);" class="text-blue" data-code="SC041">
                                            <i class="fa fa-location-arrow"></i>
                                            <span>南奉店</span>
                                        </a>
                                    </li>
                                    <li class="to-select" style="display: none;">
                                        <a href="javascript: void(0);" class="text-blue" data-code="SC127">
                                            <i class="fa fa-location-arrow"></i>
                                            <span>易买得-南桥店</span>
                                        </a>
                                    </li>
                                    <li class="to-select" style="display: none;">
                                        <a href="javascript: void(0);" class="text-blue" data-code="SC050">
                                            <i class="fa fa-location-arrow"></i>
                                            <span>金山店</span>
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
                                            echo "未知人员";
                                        }
                                        ?>
                                        <b class="caret"></b></span>
                                </a>
                                <ul class="dropdown-menu">
                                <?php
                                if(isset($_SESSION['lotus_admin_name']) && $_SESSION['lotus_admin_name'] != '管理员') {
                                ?>
                                    <li>
                                        <a href="/lotus-admin/reset">
                                            <i class="fa fa-asterisk fa-fw"></i>
                                            修改密码
                                        </a>
                                    </li>
                                    <li class="divider"></li>
                                <?php
                                }
                                ?>
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