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
        <title>正大商业地产 - 品牌库</title>
        <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
        <link rel="stylesheet" href="/views/assets/base/js/brands-admin/plugins/select2/select2.min.css">
        <link rel="stylesheet" href="/views/assets/base/js/brands-admin/iCheck/all.css">
        <link rel="stylesheet" href="/views/assets/base/css/brands-admin/bootstrap-table.css">
        <link rel="stylesheet" href="/views/assets/base/css/brands-admin/dist/all.css">
        <link rel="icon" href="/views/assets/base/img/layout/logos/favicon.ico" type="image/x-icon"/>
        <link rel="shortcut icon" href="/views/assets/base/img/layout/logos/favicon.ico" type="image/x-icon"/>
        <link href="/views/assets/base/css/brands-admin.css" rel="stylesheet">
        <script>
            window.snipeit = {
                settings: {
                    "per_page": 10
                }
            };
        </script>
    </head>
    <?php
    if(isset($_SESSION['brands_admin_login'])) {
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
                            <a class="logo navbar-brand no-hover" href="/brands-admin/home">
                                <img class="navbar-brand-img" src="/views/assets/base/img/layout/logos/favicon.ico">
                                正大商业地产
                            </a>
                        </li>
                    </ul>

                    <div class="navbar-custom-menu">
                        <ul class="nav navbar-nav">
                            <form class="navbar-form navbar-left form-horizontal" role="search" action="#" method="get">
                                <div class="col-xs-12 col-md-12">
                                    <div class="col-xs-12 form-group">
                                        <label class="sr-only" for="tagSearch">搜寻品牌</label>
                                        <input type="text" class="form-control" id="tagSearch" name="assetTag" placeholder="搜寻品牌">
                                        <input type="hidden" name="topsearch" value="true">
                                    </div>
                                    <div class="col-xs-1">
                                        <button type="submit" class="btn btn-primary pull-right"><i class="fa fa-search"></i></button>
                                    </div>
                                </div>
                            </form>

                            <li>
                                <a href="/brands-admin/create-brand">
                                    <i class="fa fa-plus"></i> 新增品牌
                                </a>
                            </li>

                            <li class="dropdown user user-menu">
                                <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                                    <img src="/views/assets/base/img/content/brands-admin/mayunfei.gif" class="user-image" alt="User Image">
                                    <span class="hidden-xs">马云飞 <b class="caret"></b></span>
                                </a>
                                <ul class="dropdown-menu">
                                    <li>
                                        <a href="#">
                                            <i class="fa fa-check fa-fw"></i>
                                            查看所辖品牌
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <i class="fa fa-user fa-fw"></i>
                                            修改资料
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <i class="fa fa-asterisk fa-fw"></i>
                                            修改密码
                                        </a>
                                    </li>
                                    <li class="divider"></li>
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
                <a href="#" style="float:left" class="sidebar-toggle-mobile visible-xs btn" data-toggle="offcanvas" role="button">
                    <span class="sr-only">导航切换</span>
                    <i class="fa fa-bars"></i>
                </a>
            </header>
            <?php
    }
    ?>