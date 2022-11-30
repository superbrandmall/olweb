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
            <li class="<?php if ($_GET['p'] == 'lotus-admin/todo' || $_GET['p'] == 'lotus-admin' || $_GET['p'] == 'lotus-admin/' || $_GET['p'] == 'lotus-admin/home') { echo 'active'; }?>">
                <a href="/lotus-admin/todo?items=5"><i class="fa fa-home"></i>
                    <span>首页</span>
                </a>
            </li>
            <li class="<?php if (isset($_GET['p']) && $_GET['p'] == 'lotus-admin/bi') { echo 'active'; }?>">
                <a href="#"><i class="fa fa-pie-chart"></i>
                    <span>报表</span>
                    <i class="fa fa-angle-left pull-right"></i>
                </a>
                <ul class="treeview-menu">
                    <li class="<?php if (isset($_GET['p']) && $_GET['p'] == 'lotus-admin/bi') { echo 'active'; }?>"><a href="/lotus-admin/bi">报表分析</a></li>
                </ul>
            </li>
            <li class="<?php if (isset($_GET['p']) && $_GET['p'] == 'lotus-admin/stores' || $_GET['p'] == 'lotus-admin/store-detail' || $_GET['p'] == 'lotus-admin/brands' || $_GET['p'] == 'lotus-admin/create-brand' || 
                    $_GET['p'] == 'lotus-admin/brand-detail' || $_GET['p'] == 'lotus-admin/modality' || $_GET['p'] == 'lotus-admin/product-category' || $_GET['p'] == 'lotus-admin/tenants' || $_GET['p'] == 'lotus-admin/create-tenant' || 
                    $_GET['p'] == 'lotus-admin/tenant-detail') { echo 'active'; }?>">
                <a href="#"><i class="fa fa-address-card"></i>
                    <span>基础资料</span>
                    <i class="fa fa-angle-left pull-right"></i>
                </a>
                <ul class="treeview-menu">
                    <li class="<?php if (isset($_GET['p']) && $_GET['p'] == 'lotus-admin/stores' || $_GET['p'] == 'lotus-admin/store-detail') { echo 'active'; }?>"><a href="/lotus-admin/stores?items=20">物业资源</a></li>
                    <li class="<?php if (isset($_GET['p']) && $_GET['p'] == 'lotus-admin/brands' || $_GET['p'] == 'lotus-admin/create-brand' || $_GET['p'] == 'lotus-admin/brand-detail') { echo 'active'; }?>"><a href="/lotus-admin/brands?items=20">品牌</a></li>
                    <li class="<?php if (isset($_GET['p']) && $_GET['p'] == 'lotus-admin/modality') { echo 'active'; }?>"><a href="/lotus-admin/modality">业态</a></li>
                    <li class="<?php if (isset($_GET['p']) && $_GET['p'] == 'lotus-admin/product-category') { echo 'active'; }?>"><a href="/lotus-admin/product-category">商品类别</a></li>
                    <li class="<?php if (isset($_GET['p']) && $_GET['p'] == 'lotus-admin/tenants' || $_GET['p'] == 'lotus-admin/create-tenant' || $_GET['p'] == 'lotus-admin/tenant-detail') { echo 'active'; }?>"><a href="/lotus-admin/tenants?items=20">商户</a></li>
                </ul>
            </li>
            <li class="<?php if (isset($_GET['p']) && $_GET['p'] == 'lotus-admin/store-progress-console' || $_GET['p'] == 'lotus-admin/modality-progress-console' || $_GET['p'] == 'lotus-admin/floor-progress-console' || $_GET['p'] == 'lotus-admin/leasing-budget') { echo 'active'; }?>">
                <a href="#"><i class="fa fa-bullseye"></i>
                    <span>招商规划</span>
                    <i class="fa fa-angle-left pull-right"></i>
                </a>
                <ul class="treeview-menu">
                    <li class="<?php if (isset($_GET['p']) && $_GET['p'] == 'lotus-admin/store-progress-console' || $_GET['p'] == 'lotus-admin/modality-progress-console' || $_GET['p'] == 'lotus-admin/floor-progress-console') { echo 'active'; }?>"><a href="/lotus-admin/store-progress-console?items=20">招商进度控制台</a></li>
                    <li class="<?php if (isset($_GET['p']) && $_GET['p'] == 'lotus-admin/leasing-budget') { echo 'active'; }?>"><a href="/lotus-admin/leasing-budget?items=20">租金计划</a></li>
                </ul>
            </li>
            <li class="<?php if (isset($_GET['p']) && $_GET['p'] == 'lotus-admin/contracts' || $_GET['p'] == 'lotus-admin/contract-summary' || $_GET['p'] == 'lotus-admin/contract-detail' || $_GET['p'] == 'lotus-admin/contract-compare' || $_GET['p'] == 'lotus-admin/contract-history' || $_GET['p'] == 'lotus-admin/requests'
                    || $_GET['p'] == 'lotus-admin/request-summary' || $_GET['p'] == 'lotus-admin/request-detail' || $_GET['p'] == 'lotus-admin/dr-summary' || $_GET['p'] == 'lotus-admin/make-request' || $_GET['p'] == 'lotus-admin/renew-summary' || $_GET['p'] == 'lotus-admin/renew-detail' || $_GET['p'] == 'lotus-admin/renew-request'
                    || $_GET['p'] == 'lotus-admin/terminate-summary' || $_GET['p'] == 'lotus-admin/terminate-detail' || $_GET['p'] == 'lotus-admin/terminate-request' || $_GET['p'] == 'lotus-admin/modify-summary' 
                    || $_GET['p'] == 'lotus-admin/modify-detail' || $_GET['p'] == 'lotus-admin/modify-request') { echo 'active'; }?>">
                <a href="#"><i class="fa fa-paperclip"></i>
                    <span>租赁合同</span>
                    <i class="fa fa-angle-left pull-right"></i>
                </a>
                <ul class="treeview-menu">
                    <li class="<?php if (isset($_GET['p']) && $_GET['p'] == 'lotus-admin/contracts' || $_GET['p'] == 'lotus-admin/contract-summary' || $_GET['p'] == 'lotus-admin/contract-detail' || $_GET['p'] == 'lotus-admin/contract-history' || $_GET['p'] == 'lotus-admin/contract-compare') { echo 'active'; }?>"><a href="/lotus-admin/contracts?items=20">租赁合同</a></li>
                    <li class="<?php if (isset($_GET['p']) && $_GET['p'] == 'lotus-admin/requests' || $_GET['p'] == 'lotus-admin/request-summary' || $_GET['p'] == 'lotus-admin/request-detail' || $_GET['p'] == 'lotus-admin/make-request' || $_GET['p'] == 'lotus-admin/dr-summary'
                            || $_GET['p'] == 'lotus-admin/renew-summary' || $_GET['p'] == 'lotus-admin/renew-detail' || $_GET['p'] == 'lotus-admin/renew-request' 
                            || $_GET['p'] == 'lotus-admin/terminate-summary' || $_GET['p'] == 'lotus-admin/terminate-detail' || $_GET['p'] == 'lotus-admin/terminate-request' 
                            || $_GET['p'] == 'lotus-admin/modify-summary' || $_GET['p'] == 'lotus-admin/modify-detail' || $_GET['p'] == 'lotus-admin/modify-request' ) { echo 'active'; }?>">
                        <a href="/lotus-admin/requests?items=20">租赁合同申请</a>
                    </li>
                </ul>
            </li>
            <li class="<?php if (isset($_GET['p']) && $_GET['p'] == 'lotus-admin/sales-data-entries' || $_GET['p'] == 'lotus-admin/sales-data-entry') { echo 'active'; }?>">
                <a href="#"><i class="fa fa-calculator"></i>
                    <span>账务</span>
                    <i class="fa fa-angle-left pull-right"></i>
                </a>
                <ul class="treeview-menu">
                    <li class="<?php if (isset($_GET['p']) && $_GET['p'] == 'lotus-admin/sales-data-entries' || $_GET['p'] == 'lotus-admin/sales-data-entry') { echo 'active'; }?>"><a href="/lotus-admin/sales-data-entries?items=20">销售数据录入单</a></li>
                </ul>
            </li>
            <li class="<?php if (isset($_GET['p']) && $_GET['p'] == 'lotus-admin/sales-data-entries' || $_GET['p'] == 'lotus-admin/sales-data-entry') { echo 'active'; }?>">
                <a href="#"><i class="fa fa-dashboard"></i>
                    <span>物业</span>
                    <i class="fa fa-angle-left pull-right"></i>
                </a>
                <ul class="treeview-menu">
                    <li class="<?php if (isset($_GET['p']) && $_GET['p'] == 'lotus-admin/instruments') { echo 'active'; }?>"><a href="/lotus-admin/instruments?items=20">水电煤仪表</a></li>
                    <li class="<?php if (isset($_GET['p']) && $_GET['p'] == 'lotus-admin/instrument-type') { echo 'active'; }?>"><a href="/lotus-admin/instrument-type?items=20">仪表类型</a></li>
                    <li class="<?php if (isset($_GET['p']) && $_GET['p'] == 'lotus-admin/instrument-data-entris' || $_GET['p'] == 'lotus-admin/instrument-data-entry') { echo 'active'; }?>"><a href="/lotus-admin/instrument-data-entries?items=20">仪表数据录入单</a></li>
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