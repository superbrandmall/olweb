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
                    <span>门店</span>
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
            <li class="<?php if (isset($_GET['p']) && $_GET['p'] == 'lotus-admin/stores' || $_GET['p'] == 'lotus-admin/create-store') { echo 'active'; }?>">
                <a href="#"><i class="fa fa-home"></i>
                    <span>铺位</span>
                    <i class="fa fa-angle-left pull-right"></i>
                </a>
                <ul class="treeview-menu">
                    <li class="<?php if (isset($_GET['p']) && $_GET['p'] == 'lotus-admin/stores') { echo 'active'; }?>"><a href="/lotus-admin/stores?items=10">铺位列表</a></li>
                    <li class="<?php if (isset($_GET['p']) && $_GET['p'] == 'lotus-admin/create-store') { echo 'active'; }?>"><a href="/lotus-admin/create-store">新建铺位</a></li>
                </ul>
            </li>
            <li class="<?php if (isset($_GET['p']) && $_GET['p'] == 'lotus-admin/brands' || $_GET['p'] == 'lotus-admin/create-brand') { echo 'active'; }?>">
                <a href="#"><i class="fa fa-registered"></i>
                    <span>品牌</span>
                    <i class="fa fa-angle-left pull-right"></i>
                </a>
                <ul class="treeview-menu">
                    <li class="<?php if (isset($_GET['p']) && $_GET['p'] == 'lotus-admin/brands') { echo 'active'; }?>"><a href="/lotus-admin/brands?items=10">品牌列表</a></li>
                    <li class="<?php if (isset($_GET['p']) && $_GET['p'] == 'lotus-admin/create-brand') { echo 'active'; }?>"><a href="/lotus-admin/create-brand">新建品牌</a></li>
                </ul>
            </li>
            <li class="<?php if (isset($_GET['p']) && $_GET['p'] == 'lotus-admin/tenants' || $_GET['p'] == 'lotus-admin/create-tenant') { echo 'active'; }?>">
                <a href="#"><i class="fa fa-users"></i>
                    <span>租户</span>
                    <i class="fa fa-angle-left pull-right"></i>
                </a>
                <ul class="treeview-menu">
                    <li class="<?php if (isset($_GET['p']) && $_GET['p'] == 'lotus-admin/tenants') { echo 'active'; }?>"><a href="/lotus-admin/tenants?items=10">租户列表</a></li>
                    <li class="<?php if (isset($_GET['p']) && $_GET['p'] == 'lotus-admin/create-tenant') { echo 'active'; }?>"><a href="/lotus-admin/create-tenant">新建租户</a></li>
                </ul>
            </li>
            <li class="<?php if (isset($_GET['p']) && $_GET['p'] == 'lotus-admin/contracts' || $_GET['p'] == 'lotus-admin/create-contract') { echo 'active'; }?>">
                <a href="#"><i class="fa fa-file-archive-o"></i>
                    <span>合同</span>
                    <i class="fa fa-angle-left pull-right"></i>
                </a>
                <ul class="treeview-menu">
                    <li class="<?php if (isset($_GET['p']) && $_GET['p'] == 'lotus-admin/contracts') { echo 'active'; }?>"><a href="/lotus-admin/contracts?items=10">合同列表</a></li>
                    <li class="<?php if (isset($_GET['p']) && $_GET['p'] == 'lotus-admin/create-contract') { echo 'active'; }?>">
                        <a href="/lotus-admin/create-contract">
                            <span>新建合同</span>
                            <i class="fa fa-angle-left pull-right"></i>
                        </a>
                        <ul class="treeview-menu">
                            <li class="active"><a href="/lotus-admin/create-contract">基本信息</a></li>
                            <li><a href="/lotus-admin/create-contract#investmentContractEnteryterm">进场条款</a></li>
                            <li><a href="/lotus-admin/create-contract#investmentContractSettleterm">结算周期</a></li>
                            <li><a href="/lotus-admin/create-contract#investmentContractAccounttermList">账款条款</a></li>
                            <li><a href="/lotus-admin/create-contract#investmentContractOverduetermList">滞纳金条款</a></li>
                            <li><a href="/lotus-admin/create-contract#investmentContractDepositterm">预存款条款</a></li>
                            <li><a href="/lotus-admin/create-contract#investmentContractProperteisterm">自定义条款</a></li>
                            <li><a href="/lotus-admin/create-contract#textareapanel">说明</a></li>
                        </ul>
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
            <li class="<?php if (isset($_GET['p']) && $_GET['p'] == 'lotus-admin/sales' || $_GET['p'] == 'lotus-admin/create-sales') { echo 'active'; }?>">
                <a href="/lotus-admin/sales"><i class="fa fa-dollar"></i>
                    <span>销售</span>
                    <i class="fa fa-angle-left pull-right"></i>
                </a>
                <ul class="treeview-menu">
                    <li class="<?php if (isset($_GET['p']) && $_GET['p'] == 'lotus-admin/sales') { echo 'active'; }?>"><a href="/lotus-admin/sales">销售查询</a></li>
                    <li class="<?php if (isset($_GET['p']) && $_GET['p'] == 'lotus-admin/create-sales') { echo 'active'; }?>"><a href="/lotus-admin/create-sales">新增销售</a></li>
                </ul>
            </li>
        </ul>
    </section>
</aside>