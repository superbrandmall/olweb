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
            <li class="<?php if ($_GET['p'] == 'lotus-admin/mall') { echo 'active'; }?>">
                <a href="/lotus-admin/mall"><i class="fa fa-building-o"></i>
                    <span>项目</span>
                </a>
            </li>
            <li class="<?php if (isset($_GET['p']) && ($_GET['p'] == 'lotus-admin/' || $_GET['p'] == 'lotus-admin/home')) { echo 'active '; }?>">            
                <a href="#"><i class="fa fa-cubes"></i>
                    <span>楼层</span>
                    <i class="fa fa-angle-left pull-right"></i>
                </a>
                <ul id="floorList" class="treeview-menu">
                </ul>
            </li>
            <li class="<?php if (isset($_GET['p']) && $_GET['p'] == 'lotus-admin/stores') { echo 'active'; }?>">
                <a href="#"><i class="fa fa-home"></i>
                    <span>铺位</span>
                    <i class="fa fa-angle-left pull-right"></i>
                </a>
                <ul class="treeview-menu">
                    <li class="<?php if (isset($_GET['p']) && $_GET['p'] == 'lotus-admin/stores') { echo 'active'; }?>"><a href="/lotus-admin/stores?items=10">铺位列表</a></li>
                </ul>
            </li>
            <li class="<?php if (isset($_GET['p']) && $_GET['p'] == 'lotus-admin/brands' || $_GET['p'] == 'lotus-admin/create-brand' || $_GET['p'] == 'lotus-admin/brand-detail') { echo 'active'; }?>">
                <a href="#"><i class="fa fa-registered"></i>
                    <span>品牌</span>
                    <i class="fa fa-angle-left pull-right"></i>
                </a>
                <ul class="treeview-menu">
                    <li class="<?php if (isset($_GET['p']) && $_GET['p'] == 'lotus-admin/brands' || $_GET['p'] == 'lotus-admin/create-brand' || $_GET['p'] == 'lotus-admin/brand-detail') { echo 'active'; }?>"><a href="/lotus-admin/brands?items=20">品牌</a></li>
                </ul>
            </li>
            <li class="<?php if (isset($_GET['p']) && $_GET['p'] == 'lotus-admin/tenants' || $_GET['p'] == 'lotus-admin/create-tenant' || $_GET['p'] == 'lotus-admin/tenant-detail') { echo 'active'; }?>">
                <a href="#"><i class="fa fa-users"></i>
                    <span>商户</span>
                    <i class="fa fa-angle-left pull-right"></i>
                </a>
                <ul class="treeview-menu">
                    <li class="<?php if (isset($_GET['p']) && $_GET['p'] == 'lotus-admin/tenants' || $_GET['p'] == 'lotus-admin/create-tenant' || $_GET['p'] == 'lotus-admin/tenant-detail') { echo 'active'; }?>"><a href="/lotus-admin/tenants?items=20">商户</a></li>
                </ul>
            </li>
            <li class="<?php if (isset($_GET['p']) && $_GET['p'] == 'lotus-admin/contracts' || $_GET['p'] == 'lotus-admin/contract-summary' || $_GET['p'] == 'lotus-admin/contract-detail') { echo 'active'; }?>">
                <a href="#"><i class="fa fa-file-archive-o"></i>
                    <span>合同</span>
                    <i class="fa fa-angle-left pull-right"></i>
                </a>
                <ul class="treeview-menu">
                    <li class="<?php if (isset($_GET['p']) && $_GET['p'] == 'lotus-admin/contracts' || $_GET['p'] == 'lotus-admin/contract-summary' || $_GET['p'] == 'lotus-admin/contract-detail') { echo 'active'; }?>"><a href="/lotus-admin/contracts?items=20">租赁合同</a></li>
                </ul>
            </li>
            <li class="<?php if (isset($_GET['p']) && $_GET['p'] == 'lotus-admin/requests' || $_GET['p'] == 'lotus-admin/request-summary' || $_GET['p'] == 'lotus-admin/request-detail' || $_GET['p'] == 'lotus-admin/make-request' 
                    || $_GET['p'] == 'lotus-admin/renew-summary' || $_GET['p'] == 'lotus-admin/renew-detail' || $_GET['p'] == 'lotus-admin/renew-request' || $_GET['p'] == 'lotus-admin/terminate-summary' 
                    || $_GET['p'] == 'lotus-admin/terminate-detail' || $_GET['p'] == 'lotus-admin/terminate-request' || $_GET['p'] == 'lotus-admin/modify-summary' 
                    || $_GET['p'] == 'lotus-admin/modify-detail' || $_GET['p'] == 'lotus-admin/modify-request' || $_GET['p'] == 'lotus-admin/todo') { echo 'active'; }?>">
                <a href="#"><i class="fa fa-th-list"></i>
                    <span>流程</span>
                    <i class="fa fa-angle-left pull-right"></i>
                </a>
                <ul class="treeview-menu">
                    <li class="<?php if (isset($_GET['p']) && $_GET['p'] == 'lotus-admin/requests' || $_GET['p'] == 'lotus-admin/request-summary' || $_GET['p'] == 'lotus-admin/request-detail' || $_GET['p'] == 'lotus-admin/make-request' 
                            || $_GET['p'] == 'lotus-admin/renew-summary' || $_GET['p'] == 'lotus-admin/renew-detail' || $_GET['p'] == 'lotus-admin/renew-request' 
                            || $_GET['p'] == 'lotus-admin/terminate-summary' || $_GET['p'] == 'lotus-admin/terminate-detail' || $_GET['p'] == 'lotus-admin/terminate-request' 
                            || $_GET['p'] == 'lotus-admin/modify-summary' || $_GET['p'] == 'lotus-admin/modify-detail' || $_GET['p'] == 'lotus-admin/modify-request' ) { echo 'active'; }?>">
                        <a href="/lotus-admin/requests?items=20">租赁合同申请单</a>
                    </li>
                    <li class="<?php if (isset($_GET['p']) && $_GET['p'] == 'lotus-admin/todo') { echo 'active'; }?>">
                        <a href="/lotus-admin/todo?items=20">待办事项</a>
                    </li>
                </ul>
            </li>
            <li class="<?php if (isset($_GET['p']) && $_GET['p'] == 'lotus-admin/create-user' || $_GET['p'] == 'lotus-admin/users') { echo 'active'; }?>">
                <a href="#"><i class="fa fa-key"></i>
                    <span>用户</span>
                    <i class="fa fa-angle-left pull-right"></i>
                </a>
                <ul class="treeview-menu">
                    <li class="<?php if (isset($_GET['p']) && $_GET['p'] == 'lotus-admin/users') { echo 'active'; }?>"><a href="/lotus-admin/users">用户列表</a></li>
                    <li class="<?php if (isset($_GET['p']) && $_GET['p'] == 'lotus-admin/create-user') { echo 'active'; }?>"><a href="/lotus-admin/create-user">新建用户</a></li>
                </ul>
            </li>
            <li class="<?php if (isset($_GET['p']) && $_GET['p'] == 'lotus-admin/sales') { echo 'active'; }?>">
                <a href="/lotus-admin/sales"><i class="fa fa-dollar"></i>
                    <span>销售</span>
                    <i class="fa fa-angle-left pull-right"></i>
                </a>
                <ul class="treeview-menu">
                    <li class="<?php if (isset($_GET['p']) && $_GET['p'] == 'lotus-admin/sales') { echo 'active'; }?>"><a href="/lotus-admin/sales">销售查询</a></li>
                </ul>
            </li>
            <li class="<?php if (isset($_GET['p']) && $_GET['p'] == 'lotus-admin/dict' || $_GET['p'] == 'lotus-admin/create-dict-type' || $_GET['p'] == 'lotus-admin/create-dict-data' || $_GET['p'] == 'lotus-admin/edit-dict-data') { echo 'active'; }?>">
                <a href="/lotus-admin/dict"><i class="fa fa-trademark"></i>
                    <span>字典</span>
                    <i class="fa fa-angle-left pull-right"></i>
                </a>
                <ul class="treeview-menu">
                    <li class="<?php if (isset($_GET['p']) && $_GET['p'] == 'lotus-admin/dict') { echo 'active'; }?>"><a href="/lotus-admin/dict">数据字典</a></li>
                    <li class="<?php if (isset($_GET['p']) && $_GET['p'] == 'lotus-admin/create-dict-type') { echo 'active'; }?>"><a href="/lotus-admin/create-dict-type">新建类型</a></li>
                </ul>
            </li>
        </ul>
    </section>
</aside>