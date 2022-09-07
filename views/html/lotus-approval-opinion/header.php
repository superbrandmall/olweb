<?php
    if(explode('?logout=', $_SERVER['REQUEST_URI'])[1] != null) {
        if(session_id() == '' || !isset($_SESSION)) {
            session_start();
        }
        session_destroy();
    }
    
    session_start();
    include ('system/Router.php');
    $scripts = null;
?>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>招商租赁审批意见书</title>
        <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
        <link rel="stylesheet" href="/views/assets/base/css/lotus-admin/dist/all.css?t=<?php echo date("Y-m-d") ?>">
        <link rel="stylesheet" href="/views/assets/base/css/lotus-admin/bootstrap-table.css">
        <link rel="icon" href="/views/assets/base/img/content/lotus-admin/favicon.ico" type="image/x-icon"/>
        <link rel="shortcut icon" href="/views/assets/base/img/content/lotus-admin/favicon.ico" type="image/x-icon"/>
        <link rel="stylesheet" href="/views/assets/base/css/lotus-admin.css">
        <script>
            window.snipeit = {
                settings: {
                    "per_page": 10
                }
            };
        </script>
    </head>
    <body class="sidebar-mini skin-blue " data-spy="scroll" data-target="#navbarTop" data-offset="190">
        <div id="loader"></div>
        <div class="wrapper">
            <header class="main-header hidden-print">
                <nav class="navbar navbar-static-top" role="navigation" style="margin-left: 0;">
                    <ul class="nav navbar-nav navbar-left">
                        <li class="left-navblock">
                            <a class="logo navbar-brand no-hover" href="javascript: void(0);">
                                <img class="navbar-brand-img" src="/views/assets/base/img/content/lotus-admin/logo.png">
                            </a>
                        </li>
                    </ul>

                    <div class="navbar-custom-menu">
                        <ul class="nav navbar-nav">
                            <li class="dropdown user user-menu">
                                <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                                    <img src="/views/assets/base/img/content/lotus-admin/avatar.png" class="user-image" alt="User Image">
                                    <span>
                                        <?php
                                        if(isset($_SESSION['lotus_admin_name'])) {
                                            echo $_SESSION['lotus_admin_name'];
                                        }
                                        ?>
                                        <b class="caret"></b></span>
                                </a>
                                <ul class="dropdown-menu" style="border: 1px solid rgba(0,0,0,.15); background-color: #fff;">
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
            </header>