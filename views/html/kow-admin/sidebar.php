<?php 
if(explode('?f=',$_SERVER['REQUEST_URI'])[1] != null) {
    $level = explode('?f=',$_SERVER['REQUEST_URI'])[1];
} else {
    $level = null;
}

?>
<aside class="main-sidebar">
    <section class="sidebar">
        <ul class="sidebar-menu">
            <li class="<?php if ($_GET['p'] == 'kow-admin/home' || $_GET['p'] == 'kow-admin/') { echo 'active'; }?>">
                <a href="/kow-admin/home"><i class="fa fa-dashboard"></i>
                    <span>首页</span>
                </a>
            </li>
            <li class="<?php if (isset($_GET['p']) && $_GET['p'] == 'kow-admin/malls' || $_GET['p'] == 'kow-admin/create-mall' || $_GET['p'] == 'kow-admin/mall-detail') { echo 'active'; }?>">
                <a href="#"><i class="fa fa-building-o"></i>
                    <span>项目</span>
                    <i class="fa fa-angle-left pull-right"></i>
                </a>
                <ul class="treeview-menu">
                    <li class="<?php if (isset($_GET['p']) && $_GET['p'] == 'kow-admin/malls' || $_GET['p'] == 'kow-admin/create-mall' || $_GET['p'] == 'kow-admin/mall-detail') { echo 'active'; }?>"><a href="/kow-admin/malls?items=20">项目</a></li>
                </ul>
            </li>
            <li class="<?php if (isset($_GET['p']) && $_GET['p'] == 'kow-admin/tenants' || $_GET['p'] == 'kow-admin/create-tenant' || $_GET['p'] == 'kow-admin/tenant-detail') { echo 'active'; }?>">
                <a href="#"><i class="fa fa-users"></i>
                    <span>商户</span>
                    <i class="fa fa-angle-left pull-right"></i>
                </a>
                <ul class="treeview-menu">
                    <li class="<?php if (isset($_GET['p']) && $_GET['p'] == 'kow-admin/tenants' || $_GET['p'] == 'kow-admin/create-tenant' || $_GET['p'] == 'kow-admin/tenant-detail') { echo 'active'; }?>"><a href="/kow-admin/tenants?items=20">商户</a></li>
                </ul>
            </li>
            <li class="<?php if (isset($_GET['p']) && $_GET['p'] == 'kow-admin/stores' || $_GET['p'] == 'kow-admin/create-store' || $_GET['p'] == 'kow-admin/store-detail') { echo 'active'; }?>">
                <a href="#"><i class="fa fa-home"></i>
                    <span>铺位</span>
                    <i class="fa fa-angle-left pull-right"></i>
                </a>
                <ul class="treeview-menu">
                    <li class="<?php if (isset($_GET['p']) && $_GET['p'] == 'kow-admin/stores' || $_GET['p'] == 'kow-admin/create-store' || $_GET['p'] == 'kow-admin/store-detail') { echo 'active'; }?>"><a href="/kow-admin/stores?items=20">铺位</a></li>
                </ul>
            </li>
            <li class="<?php if (isset($_GET['p']) && $_GET['p'] == 'kow-admin/requests' || $_GET['p'] == 'kow-admin/request-summary' || $_GET['p'] == 'kow-admin/request-detail' || $_GET['p'] == 'kow-admin/make-request' || $_GET['p'] == 'kow-admin/renewal-summary' || $_GET['p'] == 'kow-admin/renewal-detail' || $_GET['p'] == 'kow-admin/renew-request') { echo 'active'; }?>">
                <a href="#"><i class="fa fa-th-list"></i>
                    <span>流程</span>
                    <i class="fa fa-angle-left pull-right"></i>
                </a>
                <ul class="treeview-menu">
                    <li class="<?php if (isset($_GET['p']) && $_GET['p'] == 'kow-admin/requests' || $_GET['p'] == 'kow-admin/request-summary' || $_GET['p'] == 'kow-admin/request-detail' || $_GET['p'] == 'kow-admin/make-request') { echo 'active'; }?>"><a href="/kow-admin/requests?items=20">租赁合同申请单</a></li>
                </ul>
            </li>
            <li class="<?php if (isset($_GET['p']) && $_GET['p'] == 'kow-admin/sales') { echo 'active'; }?>">
                <a href="/kow-admin/sales"><i class="fa fa-dollar"></i>
                    <span>销售</span>
                    <i class="fa fa-angle-left pull-right"></i>
                </a>
                <ul class="treeview-menu">
                    <li class="<?php if (isset($_GET['p']) && $_GET['p'] == 'kow-admin/sales') { echo 'active'; }?>"><a href="/kow-admin/sales">销售查询</a></li>
                </ul>
            </li>
            <!--<li class="<?php if (isset($_GET['p']) && $_GET['p'] == 'kow-admin/contracts' || $_GET['p'] == 'kow-admin/contract-summary' || $_GET['p'] == 'kow-admin/contract-detail') { echo 'active'; }?>">
                <a href="#"><i class="fa fa-file-archive-o"></i>
                    <span>合同</span>
                </a>
            </li>-->
        </ul>
    </section>
</aside>