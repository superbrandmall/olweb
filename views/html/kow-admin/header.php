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
        <title>KOW - 工作管理系统</title>
        <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
        <link rel="stylesheet" href="/views/assets/plugins/select2/select2.min.css">
        <link rel="stylesheet" href="/views/assets/base/css/kow-admin/dist/all.css?t=<?php echo date("Y-m-d") ?>">
        <link rel="stylesheet" href="/views/assets/base/css/kow-admin/bootstrap-table.css">
        <link rel="icon" href="/views/assets/base/img/content/kow-admin/favicon.ico" type="image/x-icon"/>
        <link rel="shortcut icon" href="/views/assets/base/img/content/kow-admin/favicon.ico" type="image/x-icon"/>
        <link rel="stylesheet" href="/views/assets/base/css/kow-admin.css">
        <link rel="stylesheet" href="/views/assets/plugins/datepicker/bootstrap-datepicker.css" type="text/css" media="all" />
        <style>
            .main-header {
                background-color: #666219;
            }
            
            .skin-blue .main-header .navbar .sidebar-toggle:hover {
                background-color: #666219;
            }
        </style>
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
        if(isset($_GET['p']) && $_GET['p'] != 'kow-admin/reset') {
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
                            <a class="logo navbar-brand no-hover" href="/kow-admin/home">
                                <img class="navbar-brand-img" src="/views/assets/base/img/content/kow-admin/logo.jpg">
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
                                </ul>
                            </li>
                            <li class="dropdown user user-menu">
                                <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                                    <img src="/views/assets/base/img/content/kow-admin/avatar.png" class="user-image" alt="User Image">
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