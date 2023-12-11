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
        <!--<link rel="stylesheet" href="/views/assets/base/css/grayscale.css" type="text/css" media="all" />-->
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
            <header class="main-header hidden-print">
                <nav class="navbar navbar-static-top" role="navigation">
                    <a class="logo navbar-brand no-hover hidden-sm hidden-xs" href="/lotus-admin/todo">
                        <img class="navbar-brand-img" src="/views/assets/base/img/content/lotus-admin/logo.png">
                    </a>
                    <ul class="nav navbar-nav navbar-left">
                        <li class="left-navblock hidden-xs hidden-sm hidden-md">
                            <a class="<?php if (isset($_GET['p']) && $_GET['p'] == 'lotus-admin/todo') { echo 'active'; }?>" href="todo" style="font-size: 15px;">
                                首页
                            </a>
                        </li>
                        <li class="left-navblock hidden-xs hidden-sm hidden-md">
                            <a class="basicMgmt <?php if (isset($_GET['p']) && $_GET['p'] == 'lotus-admin/malls' || $_GET['p'] == 'lotus-admin/mall-detail' || $_GET['p'] == 'lotus-admin/stores' || $_GET['p'] == 'lotus-admin/create-store' || $_GET['p'] == 'lotus-admin/store-detail' || $_GET['p'] == 'lotus-admin/store-contract' || 
                        $_GET['p'] == 'lotus-admin/store-budget' || $_GET['p'] == 'lotus-admin/brands' || $_GET['p'] == 'lotus-admin/create-brand' || $_GET['p'] == 'lotus-admin/brand-detail' || $_GET['p'] == 'lotus-admin/modality' || $_GET['p'] == 'lotus-admin/tenants' || $_GET['p'] == 'lotus-admin/mall-visualization' || 
                        $_GET['p'] == 'lotus-admin/create-tenant' || $_GET['p'] == 'lotus-admin/tenant-detail' || $_GET['p'] == 'lotus-admin/tenant-history' || $_GET['p'] == 'lotus-admin/store-change' || $_GET['p'] == 'lotus-admin/default' || $_GET['p'] == 'lotus-admin/dict' || $_GET['p'] == 'lotus-admin/create-dict-type' || 
                        $_GET['p'] == 'lotus-admin/create-dict-data' || $_GET['p'] == 'lotus-admin/edit-dict-data' || $_GET['p'] == 'lotus-admin/map') { echo 'active'; }?>" href="javascript: void(0);" onclick="toggleMenu('basicMgmt')" style="font-size: 15px;">
                                基础管理
                            </a>
                        </li>
                        <li class="left-navblock hidden-xs hidden-sm hidden-md">
                            <a class="leasingMgmt <?php if (isset($_GET['p']) && $_GET['p'] == 'lotus-admin/store-progress-console' || $_GET['p'] == 'lotus-admin/modality-progress-console' || $_GET['p'] == 'lotus-admin/floor-progress-console' || $_GET['p'] == 'lotus-admin/leasing-budget' || $_GET['p'] == 'lotus-admin/budget-detail' || 
                        $_GET['p'] == 'lotus-admin/contracts' || $_GET['p'] == 'lotus-admin/contract-summary' || $_GET['p'] == 'lotus-admin/contract-detail' || $_GET['p'] == 'lotus-admin/contract-init' || $_GET['p'] == 'lotus-admin/contract-compare' || $_GET['p'] == 'lotus-admin/contract-history' || $_GET['p'] == 'lotus-admin/requests' || 
                        $_GET['p'] == 'lotus-admin/request-summary' || $_GET['p'] == 'lotus-admin/request-detail' || $_GET['p'] == 'lotus-admin/dr-summary' || $_GET['p'] == 'lotus-admin/make-request' || $_GET['p'] == 'lotus-admin/renew-requests' || $_GET['p'] == 'lotus-admin/renew-summary' || $_GET['p'] == 'lotus-admin/renew-detail' || $_GET['p'] == 'lotus-admin/renew-request' || 
                        $_GET['p'] == 'lotus-admin/terminate-requests' || $_GET['p'] == 'lotus-admin/terminate-summary' || $_GET['p'] == 'lotus-admin/terminate-detail' || $_GET['p'] == 'lotus-admin/terminate-request' || $_GET['p'] == 'lotus-admin/modify-summary' || $_GET['p'] == 'lotus-admin/standing-book' || $_GET['p'] == 'lotus-admin/contract-balance-preview' || 
                        $_GET['p'] == 'lotus-admin/modify-requests' || $_GET['p'] == 'lotus-admin/modify-detail' || $_GET['p'] == 'lotus-admin/modify-request' || $_GET['p'] == 'lotus-admin/request-balance-preview') { echo 'active'; }?>" href="javascript: void(0);" onclick="toggleMenu('leasingMgmt')" style="font-size: 15px;">
                                招商管理
                            </a>
                        </li>
                        <li class="left-navblock hidden-xs hidden-sm hidden-md">
                            <a class="salesMgmt <?php if (isset($_GET['p']) && $_GET['p'] == 'lotus-admin/product-category' || $_GET['p'] == 'lotus-admin/sales-data-entries' || $_GET['p'] == 'lotus-admin/create-sales-data' || $_GET['p'] == 'lotus-admin/edit-sales-data') { echo 'active'; }?>" href="javascript: void(0);" onclick="toggleMenu('salesMgmt')" style="font-size: 15px;">
                                销售管理
                            </a>
                        </li>
                        <li class="left-navblock hidden-xs hidden-sm hidden-md">
                            <a class="accountingMgmt <?php if (isset($_GET['p']) && $_GET['p'] == 'lotus-admin/gl-config' || $_GET['p'] == 'lotus-admin/fee-item' || $_GET['p'] == 'lotus-admin/contract-balance' || $_GET['p'] == 'lotus-admin/accounting-voucher' || $_GET['p'] == 'lotus-admin/accounting-tenant' || $_GET['p'] == 'lotus-admin/accounting-contract' || $_GET['p'] == 'lotus-admin/bills') { echo 'active'; }?>" href="javascript: void(0);" onclick="toggleMenu('accountingMgmt')" style="font-size: 15px;">
                                账务管理
                            </a>
                        </li>
                        <li class="left-navblock hidden-xs hidden-sm hidden-md">
                            <a href="/we-meter/#/meter" target="_blank" style="font-size: 15px;">
                                物业管理
                            </a>
                        </li>
                        <li class="left-navblock hidden-xs hidden-sm hidden-md">
                            <a class="processMgmt <?php if (isset($_GET['p']) && $_GET['p'] == 'lotus-admin/bi' || $_GET['p'] == 'lotus-admin/my-process' || $_GET['p'] == 'lotus-admin/in-process' || $_GET['p'] == 'lotus-admin/processes' || $_GET['p'] == 'lotus-admin/process-detail' || $_GET['p'] == 'lotus-admin/process-request' || 
                        $_GET['p'] == 'lotus-admin/sign-process-detail') { echo 'active'; }?>" href="javascript: void(0);" onclick="toggleMenu('processMgmt')" style="font-size: 15px;">
                                流程与报表
                            </a>
                        </li>
                        <li class="left-navblock hidden-xs hidden-sm hidden-md">
                            <a href="/authorization/#/user" target="_blank" style="font-size: 15px;">
                                系统管理
                            </a>
                        </li>
                        <li class="left-navblock hidden-lg">
                            <a class="<?php if (isset($_GET['p']) && $_GET['p'] == 'lotus-admin/todo') { echo 'active'; }?>" href="todo">
                                首页
                            </a>
                        </li>
                        <li class="left-navblock hidden-lg">
                            <a class="basicMgmt <?php if (isset($_GET['p']) && $_GET['p'] == 'lotus-admin/malls' || $_GET['p'] == 'lotus-admin/mall-detail' || $_GET['p'] == 'lotus-admin/stores' || $_GET['p'] == 'lotus-admin/create-store' || $_GET['p'] == 'lotus-admin/store-detail' || $_GET['p'] == 'lotus-admin/store-contract' || 
                        $_GET['p'] == 'lotus-admin/store-budget' || $_GET['p'] == 'lotus-admin/brands' || $_GET['p'] == 'lotus-admin/create-brand' || $_GET['p'] == 'lotus-admin/brand-detail' || $_GET['p'] == 'lotus-admin/modality' || $_GET['p'] == 'lotus-admin/tenants' || $_GET['p'] == 'lotus-admin/mall-visualization' || 
                        $_GET['p'] == 'lotus-admin/create-tenant' || $_GET['p'] == 'lotus-admin/tenant-detail' || $_GET['p'] == 'lotus-admin/tenant-history' || $_GET['p'] == 'lotus-admin/store-change' || $_GET['p'] == 'lotus-admin/default' || $_GET['p'] == 'lotus-admin/dict' || $_GET['p'] == 'lotus-admin/create-dict-type' || 
                        $_GET['p'] == 'lotus-admin/create-dict-data' || $_GET['p'] == 'lotus-admin/edit-dict-data' || $_GET['p'] == 'lotus-admin/map') { echo 'active'; }?>" href="javascript: void(0);" onclick="toggleMenu('basicMgmt')">
                                基础
                            </a>
                        </li>
                        <li class="left-navblock hidden-lg">
                            <a class="leasingMgmt <?php if (isset($_GET['p']) && $_GET['p'] == 'lotus-admin/store-progress-console' || $_GET['p'] == 'lotus-admin/modality-progress-console' || $_GET['p'] == 'lotus-admin/floor-progress-console' || $_GET['p'] == 'lotus-admin/leasing-budget' || $_GET['p'] == 'lotus-admin/budget-detail' || 
                        $_GET['p'] == 'lotus-admin/contracts' || $_GET['p'] == 'lotus-admin/contract-summary' || $_GET['p'] == 'lotus-admin/contract-detail' || $_GET['p'] == 'lotus-admin/contract-init' || $_GET['p'] == 'lotus-admin/contract-compare' || $_GET['p'] == 'lotus-admin/contract-history' || $_GET['p'] == 'lotus-admin/requests' || 
                        $_GET['p'] == 'lotus-admin/request-summary' || $_GET['p'] == 'lotus-admin/request-detail' || $_GET['p'] == 'lotus-admin/dr-summary' || $_GET['p'] == 'lotus-admin/make-request' || $_GET['p'] == 'lotus-admin/renew-requests' || $_GET['p'] == 'lotus-admin/renew-summary' || $_GET['p'] == 'lotus-admin/renew-detail' || $_GET['p'] == 'lotus-admin/renew-request' || 
                        $_GET['p'] == 'lotus-admin/terminate-requests' || $_GET['p'] == 'lotus-admin/terminate-summary' || $_GET['p'] == 'lotus-admin/terminate-detail' || $_GET['p'] == 'lotus-admin/terminate-request' || $_GET['p'] == 'lotus-admin/modify-summary' || $_GET['p'] == 'lotus-admin/standing-book' || $_GET['p'] == 'lotus-admin/contract-balance-preview' || 
                        $_GET['p'] == 'lotus-admin/modify-requests' || $_GET['p'] == 'lotus-admin/modify-detail' || $_GET['p'] == 'lotus-admin/modify-request' || $_GET['p'] == 'lotus-admin/request-balance-preview') { echo 'active'; }?>" href="javascript: void(0);" onclick="toggleMenu('leasingMgmt')">
                                招商
                            </a>
                        </li>
                        <li class="left-navblock hidden-lg">
                            <a class="salesMgmt <?php if (isset($_GET['p']) && $_GET['p'] == 'lotus-admin/product-category' || $_GET['p'] == 'lotus-admin/sales-data-entries' || $_GET['p'] == 'lotus-admin/create-sales-data' || $_GET['p'] == 'lotus-admin/edit-sales-data') { echo 'active'; }?>" href="javascript: void(0);" onclick="toggleMenu('salesMgmt')">
                                销售
                            </a>
                        </li>
                        <li class="left-navblock hidden-lg">
                            <a class="accountingMgmt <?php if (isset($_GET['p']) && $_GET['p'] == 'lotus-admin/gl-config' || $_GET['p'] == 'lotus-admin/fee-item' || $_GET['p'] == 'lotus-admin/contract-balance' || $_GET['p'] == 'lotus-admin/accounting-voucher' || $_GET['p'] == 'lotus-admin/accounting-tenant' || $_GET['p'] == 'lotus-admin/accounting-contract' || $_GET['p'] == 'lotus-admin/bills') { echo 'active'; }?>" href="javascript: void(0);" onclick="toggleMenu('accountingMgmt')">
                                账务
                            </a>
                        </li>
                        <li class="left-navblock hidden-lg">
                            <a href="/we-meter/#/meter" target="_blank">
                                物业
                            </a>
                        </li>
                        <li class="left-navblock hidden-lg">
                            <a class="processMgmt <?php if (isset($_GET['p']) && $_GET['p'] == 'lotus-admin/bi' || $_GET['p'] == 'lotus-admin/my-process' || $_GET['p'] == 'lotus-admin/in-process' || $_GET['p'] == 'lotus-admin/processes' || $_GET['p'] == 'lotus-admin/process-detail' || $_GET['p'] == 'lotus-admin/process-request' || 
                        $_GET['p'] == 'lotus-admin/sign-process-detail') { echo 'active'; }?>" href="javascript: void(0);" onclick="toggleMenu('processMgmt')">
                                流程
                            </a>
                        </li>
                        <li class="left-navblock hidden-lg">
                            <a href="/authorization/#/user" target="_blank">
                                系统
                            </a>
                        </li>
                    </ul>

                    <div class="navbar-custom-menu">
                        <ul class="nav navbar-nav">
                            <li class="dropdown location-select">
                                <a href="javascript: void(0);" class="dropdown-toggle" data-toggle="dropdown">
                                    <span class="locationSelected">选择区域</span><b class="caret"></b>
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
                                    <li class="to-select">
                                        <a href="javascript: void(0);" class="text-blue">
                                            <i class="fa fa-map-marker"></i>
                                            <span>广东省</span>
                                        </a>
                                    </li>
                                    <li class="to-select">
                                        <a href="javascript: void(0);" class="text-blue">
                                            <i class="fa fa-map-marker"></i>
                                            <span>广西省</span>
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
                                        <a href="javascript: sessionStorage.clear();" title="清除缓存">
                                            <i class="fa fa-trash-o fa-fw"></i>
                                            清除缓存
                                        </a>
                                    </li>
                                    <li class="divider" style="margin: 0;"></li>
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