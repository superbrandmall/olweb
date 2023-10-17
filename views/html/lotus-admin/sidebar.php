<?php 
if(explode('?f=',$_SERVER['REQUEST_URI'])[1] != null) {
    $level = explode('?f=',$_SERVER['REQUEST_URI'])[1];
} else {
    $level = null;
}

?>
<aside class="main-sidebar hidden-print">
    <section class="sidebar">
        <ul class="sidebar-menu">
            <li class="<?php if ($_GET['p'] == 'lotus-admin/todo' || $_GET['p'] == 'lotus-admin' || $_GET['p'] == 'lotus-admin/' || $_GET['p'] == 'lotus-admin/home') { echo 'active'; }?>">
                <a href="/lotus-admin/todo"><i class="fa fa-home"></i>
                    <span>首页</span>
                </a>
            </li>
            <li class="<?php if (isset($_GET['p']) && $_GET['p'] == 'lotus-admin/my-process' || $_GET['p'] == 'lotus-admin/in-process' || $_GET['p'] == 'lotus-admin/processes' || $_GET['p'] == 'lotus-admin/process-detail' 
                    || $_GET['p'] == 'lotus-admin/process-request' || $_GET['p'] == 'lotus-admin/sign-request' || $_GET['p'] == 'lotus-admin/matter-process-detail' || $_GET['p'] == 'lotus-admin/sign-process-detail') { echo 'active'; }?>">
                <a href="#"><i class="fa fa-send"></i>
                    <span>流程</span>
                    <i class="fa fa-angle-left pull-right"></i>
                </a>
                <ul class="treeview-menu">
                    <li class="<?php if (isset($_GET['p']) && $_GET['p'] == 'lotus-admin/my-process' || $_GET['p'] == 'lotus-admin/in-process' || $_GET['p'] == 'lotus-admin/processes' || $_GET['p'] == 'lotus-admin/process-detail'
                            || $_GET['p'] == 'lotus-admin/process-request' || $_GET['p'] == 'lotus-admin/sign-request' || $_GET['p'] == 'lotus-admin/matter-process-detail' || $_GET['p'] == 'lotus-admin/sign-process-detail') { echo 'active'; }?>">
                        <a href="/lotus-admin/my-process?items=20">流程汇总</a>
                    </li>
                </ul>
            </li>
            <li class="<?php if (isset($_GET['p']) && $_GET['p'] == 'lotus-admin/bi' || $_GET['p'] == 'lotus-admin/lotus-south') { echo 'active'; }?>">
                <a href="#"><i class="fa fa-pie-chart"></i>
                    <span>报表</span>
                    <i class="fa fa-angle-left pull-right"></i>
                </a>
                <ul class="treeview-menu">
                    <li class="<?php if (isset($_GET['p']) && $_GET['p'] == 'lotus-admin/lotus-south') { echo 'active'; }?>">
                        <a href="/lotus-admin/lotus-south">南区铺位分析</a>
                    </li>
                    <li class="<?php if (isset($_GET['p']) && $_GET['p'] == 'lotus-admin/bi') { echo 'active'; }?>">
                        <a href="/lotus-admin/bi">合同信息分析</a>
                    </li>
                </ul>
            </li>
            <li class="<?php if (isset($_GET['p']) && $_GET['p'] == 'lotus-admin/malls' || $_GET['p'] == 'lotus-admin/mall-detail' || $_GET['p'] == 'lotus-admin/stores' || $_GET['p'] == 'lotus-admin/create-store' || $_GET['p'] == 'lotus-admin/store-detail' || $_GET['p'] == 'lotus-admin/store-contract' || 
                    $_GET['p'] == 'lotus-admin/store-budget' || $_GET['p'] == 'lotus-admin/brands' || $_GET['p'] == 'lotus-admin/create-brand' || $_GET['p'] == 'lotus-admin/brand-detail' || $_GET['p'] == 'lotus-admin/modality' || $_GET['p'] == 'lotus-admin/product-category' || $_GET['p'] == 'lotus-admin/tenants' || 
                    $_GET['p'] == 'lotus-admin/create-tenant' || $_GET['p'] == 'lotus-admin/tenant-detail' || $_GET['p'] == 'lotus-admin/store-change' || $_GET['p'] == 'lotus-admin/default') { echo 'active'; }?>">
                <a href="#"><i class="fa fa-address-card"></i>
                    <span>基础资料</span>
                    <i class="fa fa-angle-left pull-right"></i>
                </a>
                <ul class="treeview-menu">
                    <li class="<?php if (isset($_GET['p']) && $_GET['p'] == 'lotus-admin/malls' || $_GET['p'] == 'lotus-admin/mall-detail' || $_GET['p'] == 'lotus-admin/stores' || $_GET['p'] == 'lotus-admin/create-store' || $_GET['p'] == 'lotus-admin/store-detail' || 
                            $_GET['p'] == 'lotus-admin/store-contract' || $_GET['p'] == 'lotus-admin/store-budget' || $_GET['p'] == 'lotus-admin/default') { echo 'active'; }?>">
                        <a href="/lotus-admin/malls">物业资源</a>
                    </li>
                    <li class="<?php if (isset($_GET['p']) && $_GET['p'] == 'lotus-admin/brands' || $_GET['p'] == 'lotus-admin/create-brand' || $_GET['p'] == 'lotus-admin/brand-detail') { echo 'active'; }?>">
                        <a href="/lotus-admin/brands?items=20">品牌</a>
                    </li>
                    <li class="<?php if (isset($_GET['p']) && $_GET['p'] == 'lotus-admin/modality') { echo 'active'; }?>">
                        <a href="/lotus-admin/modality">业态</a>
                    </li>
                    <li class="<?php if (isset($_GET['p']) && $_GET['p'] == 'lotus-admin/product-category') { echo 'active'; }?>">
                        <a href="/lotus-admin/product-category">商品类别</a>
                    </li>
                    <li class="<?php if (isset($_GET['p']) && $_GET['p'] == 'lotus-admin/tenants' || $_GET['p'] == 'lotus-admin/create-tenant' || $_GET['p'] == 'lotus-admin/tenant-detail') { echo 'active'; }?>">
                        <a href="/lotus-admin/tenants?items=20">商户</a>
                    </li>
                    <li class="<?php if (isset($_GET['p']) && $_GET['p'] == 'lotus-admin/store-change') { echo 'active'; }?>">
                        <a href="/lotus-admin/store-change">铺位变更单</a>
                    </li>
                </ul>
            </li>
            <li class="<?php if (isset($_GET['p']) && $_GET['p'] == 'lotus-admin/store-progress-console' || $_GET['p'] == 'lotus-admin/modality-progress-console' || $_GET['p'] == 'lotus-admin/floor-progress-console' || $_GET['p'] == 'lotus-admin/leasing-budget' || $_GET['p'] == 'lotus-admin/budget-detail') { echo 'active'; }?>">
                <a href="#"><i class="fa fa-calendar-check-o"></i>
                    <span>招商规划</span>
                    <i class="fa fa-angle-left pull-right"></i>
                </a>
                <ul class="treeview-menu">
                    <li class="<?php if (isset($_GET['p']) && $_GET['p'] == 'lotus-admin/store-progress-console' || $_GET['p'] == 'lotus-admin/modality-progress-console' || $_GET['p'] == 'lotus-admin/floor-progress-console') { echo 'active'; }?>"><a href="/lotus-admin/store-progress-console?items=20">招商进度控制台</a></li>
                    <li class="<?php if (isset($_GET['p']) && $_GET['p'] == 'lotus-admin/leasing-budget' || $_GET['p'] == 'lotus-admin/budget-detail') { echo 'active'; }?>"><a href="/lotus-admin/leasing-budget?items=20">租金计划</a></li>
                </ul>
            </li>
            <li class="<?php if (isset($_GET['p']) && $_GET['p'] == 'lotus-admin/contracts' || $_GET['p'] == 'lotus-admin/contract-summary' || $_GET['p'] == 'lotus-admin/contract-detail' || $_GET['p'] == 'lotus-admin/contract-init' || $_GET['p'] == 'lotus-admin/contract-compare' || $_GET['p'] == 'lotus-admin/contract-history' || $_GET['p'] == 'lotus-admin/requests'
                    || $_GET['p'] == 'lotus-admin/request-summary' || $_GET['p'] == 'lotus-admin/request-detail' || $_GET['p'] == 'lotus-admin/dr-summary' || $_GET['p'] == 'lotus-admin/make-request' || $_GET['p'] == 'lotus-admin/renew-summary' || $_GET['p'] == 'lotus-admin/renew-detail' || $_GET['p'] == 'lotus-admin/renew-request'
                    || $_GET['p'] == 'lotus-admin/terminate-summary' || $_GET['p'] == 'lotus-admin/terminate-detail' || $_GET['p'] == 'lotus-admin/terminate-request' || $_GET['p'] == 'lotus-admin/modify-summary' || $_GET['p'] == 'lotus-admin/standing-book' || $_GET['p'] == 'lotus-admin/contract-balance-preview' 
                    || $_GET['p'] == 'lotus-admin/modify-detail' || $_GET['p'] == 'lotus-admin/modify-request' || $_GET['p'] == 'lotus-admin/request-balance-preview') { echo 'active'; }?>">
                <a href="#"><i class="fa fa-paperclip"></i>
                    <span>租赁合同</span>
                    <i class="fa fa-angle-left pull-right"></i>
                </a>
                <ul class="treeview-menu">
                    <li class="<?php if (isset($_GET['p']) && $_GET['p'] == 'lotus-admin/contracts' || $_GET['p'] == 'lotus-admin/contract-summary' || $_GET['p'] == 'lotus-admin/contract-detail' || $_GET['p'] == 'lotus-admin/contract-init' || $_GET['p'] == 'lotus-admin/contract-history' || $_GET['p'] == 'lotus-admin/contract-compare') { echo 'active'; }?>">
                        <a href="/lotus-admin/contracts?items=20">租赁合同</a>
                    </li>
                    <li class="<?php if (isset($_GET['p']) && $_GET['p'] == 'lotus-admin/standing-book') { echo 'active'; }?>">
                        <a href="/lotus-admin/standing-book">合同台账</a>
                    </li>
                    <li class="<?php if (isset($_GET['p']) && $_GET['p'] == 'lotus-admin/contract-balance-preview' || $_GET['p'] == 'lotus-admin/request-balance-preview') { echo 'active'; }?>">
                        <a href="/lotus-admin/contract-balance-preview">合同结算预览</a>
                    </li>
                    <li class="<?php if (isset($_GET['p']) && $_GET['p'] == 'lotus-admin/requests' || $_GET['p'] == 'lotus-admin/request-summary' || $_GET['p'] == 'lotus-admin/request-detail' || $_GET['p'] == 'lotus-admin/make-request' || $_GET['p'] == 'lotus-admin/dr-summary'
                            || $_GET['p'] == 'lotus-admin/renew-summary' || $_GET['p'] == 'lotus-admin/renew-detail' || $_GET['p'] == 'lotus-admin/renew-request' 
                            || $_GET['p'] == 'lotus-admin/terminate-summary' || $_GET['p'] == 'lotus-admin/terminate-detail' || $_GET['p'] == 'lotus-admin/terminate-request' 
                            || $_GET['p'] == 'lotus-admin/modify-summary' || $_GET['p'] == 'lotus-admin/modify-detail' || $_GET['p'] == 'lotus-admin/modify-request') { echo 'active'; }?>">
                        <a href="/lotus-admin/requests?items=20">租赁合同申请</a>
                    </li>
                </ul>
            </li>
            <li class="<?php if (isset($_GET['p']) && $_GET['p'] == 'lotus-admin/gl-config' || $_GET['p'] == 'lotus-admin/contract-balance' || $_GET['p'] == 'lotus-admin/accounting-voucher' || $_GET['p'] == 'lotus-admin/accounting-tenant' 
                    || $_GET['p'] == 'lotus-admin/accounting-contract' || $_GET['p'] == 'lotus-admin/sales-data-entries' || $_GET['p'] == 'lotus-admin/create-sales-data' || $_GET['p'] == 'lotus-admin/edit-sales-data') { echo 'active'; }?>">
                <a href="#"><i class="fa fa-calculator"></i>
                    <span>账务<img src="/views/assets/base/img/content/lotus-admin/new.gif" style="vertical-align: top;"></span>
                    <i class="fa fa-angle-left pull-right"></i>
                </a>
                <ul class="treeview-menu">
                    <li class="<?php if (isset($_GET['p']) && $_GET['p'] == 'lotus-admin/gl-config') { echo 'active'; }?>">
                        <a href="/lotus-admin/gl-config">结算配置</a>
                    </li>
                    <li class="<?php if (isset($_GET['p']) && $_GET['p'] == 'lotus-admin/contract-balance') { echo 'active'; }?>">
                        <a href="/lotus-admin/contract-balance?items=20">合同结算情况</a>
                    </li>
                    <li class="<?php if (isset($_GET['p']) && $_GET['p'] == 'lotus-admin/accounting-voucher' || $_GET['p'] == 'lotus-admin/accounting-tenant' || $_GET['p'] == 'lotus-admin/accounting-contract') { echo 'active'; }?>">
                        <a href="/lotus-admin/accounting-voucher?items=20">会计凭证</a>
                    </li>
                    <li class="<?php if (isset($_GET['p']) && $_GET['p'] == 'lotus-admin/sales-data-entries' || $_GET['p'] == 'lotus-admin/create-sales-data' || $_GET['p'] == 'lotus-admin/edit-sales-data') { echo 'active'; }?>">
                        <a href="/lotus-admin/sales-data-entries?items=20">销售数据录入</a>
                    </li>
                </ul>
            </li>
            <li class="<?php if (isset($_GET['p']) && $_GET['p'] == 'lotus-admin/dict' || $_GET['p'] == 'lotus-admin/create-dict-type' || $_GET['p'] == 'lotus-admin/create-dict-data' || $_GET['p'] == 'lotus-admin/edit-dict-data') { echo 'active'; }?>">
                <a href="/lotus-admin/dict"><i class="fa fa-book"></i>
                    <span>字典</span>
                    <i class="fa fa-angle-left pull-right"></i>
                </a>
                <ul class="treeview-menu">
                    <li class="<?php if (isset($_GET['p']) && $_GET['p'] == 'lotus-admin/dict') { echo 'active'; }?>">
                        <a href="/lotus-admin/dict">数据字典</a>
                    </li>
                    <li class="<?php if (isset($_GET['p']) && $_GET['p'] == 'lotus-admin/create-dict-type') { echo 'active'; }?>">
                        <a href="/lotus-admin/create-dict-type">新建类型</a>
                    </li>
                </ul>
            </li>
        </ul>
    </section>
</aside>