<?php 
if(explode('?f=',$_SERVER['REQUEST_URI'])[1] != null) {
    $level = explode('?f=',$_SERVER['REQUEST_URI'])[1];
} else {
    $level = null;
}

?>
<aside class="main-sidebar hidden-print">
    <section class="sidebar">
        <span style="display: inline-block; margin-top: 10px;">
            <ul class="sidebar-menu">
                <li>
                    <input type="text" autocomplete="off" placeholder="请输入关键词" class="form-control sidebar-search">
                    <a href="#" class="sidebar-toggle btn btn-white" data-toggle="offcanvas" role="button">
                        <span class="sr-only">导航切换</span>
                    </a>
                </li>
            </ul>
        </span>
        <div id="basicMgmt" style="display: none;">
            <ul class="sidebar-menu">
                <li class="<?php if (isset($_GET['p']) && $_GET['p'] == 'lotus-admin/todo') { echo 'active'; }?>" style="display: none;">
                    <a href="/lotus-admin/todo"><i class="fa fa-home"></i>
                        <span>首页</span>
                    </a>
                </li>
                <li class="<?php if (isset($_GET['p']) && $_GET['p'] == 'lotus-admin/malls' || $_GET['p'] == 'lotus-admin/mall-detail' || $_GET['p'] == 'lotus-admin/stores' || $_GET['p'] == 'lotus-admin/create-store' || $_GET['p'] == 'lotus-admin/store-detail' || $_GET['p'] == 'lotus-admin/store-contract' || 
                        $_GET['p'] == 'lotus-admin/store-budget' || $_GET['p'] == 'lotus-admin/brands' || $_GET['p'] == 'lotus-admin/create-brand' || $_GET['p'] == 'lotus-admin/brand-detail' || $_GET['p'] == 'lotus-admin/modality') { echo 'active'; }?>">
                    <a href="#"><i class="fa fa-address-card"></i>
                        <span>主数据管理</span>
                        <i class="fa fa-angle-left pull-right"></i>
                    </a>
                    <ul class="treeview-menu">
                        <li class="<?php if (isset($_GET['p']) && $_GET['p'] == 'lotus-admin/modality') { echo 'active'; }?>">
                            <a href="/lotus-admin/modality">业态</a>
                        </li>
                        <li class="<?php if (isset($_GET['p']) && $_GET['p'] == 'lotus-admin/brands' || $_GET['p'] == 'lotus-admin/create-brand' || $_GET['p'] == 'lotus-admin/brand-detail') { echo 'active'; }?>">
                            <a href="/lotus-admin/brands?items=20">品牌</a>
                        </li>
                        <li class="<?php if (isset($_GET['p']) && $_GET['p'] == 'lotus-admin/malls' || $_GET['p'] == 'lotus-admin/mall-detail' || $_GET['p'] == 'lotus-admin/stores' || $_GET['p'] == 'lotus-admin/create-store' || $_GET['p'] == 'lotus-admin/store-detail' || 
                                $_GET['p'] == 'lotus-admin/store-contract' || $_GET['p'] == 'lotus-admin/store-budget') { echo 'active'; }?>">
                            <a href="/lotus-admin/malls">物业资源</a>
                        </li>
                    </ul>
                </li>
                <li class="<?php if (isset($_GET['p']) && $_GET['p'] == 'lotus-admin/tenants' || $_GET['p'] == 'lotus-admin/create-tenant' || $_GET['p'] == 'lotus-admin/tenant-detail' || $_GET['p'] == 'lotus-admin/tenant-history') { echo 'active'; }?>">
                    <a href="#"><i class="fa fa-users"></i>
                        <span>合作伙伴管理</span>
                        <i class="fa fa-angle-left pull-right"></i>
                    </a>
                    <ul class="treeview-menu">
                        <li class="<?php if (isset($_GET['p']) && $_GET['p'] == 'lotus-admin/tenants' || $_GET['p'] == 'lotus-admin/create-tenant' || $_GET['p'] == 'lotus-admin/tenant-detail' || $_GET['p'] == 'lotus-admin/tenant-history') { echo 'active'; }?>">
                            <a href="/lotus-admin/tenants?items=20">商户</a>
                        </li>
                    </ul>
                </li>
                <li class="<?php if (isset($_GET['p']) && $_GET['p'] == 'lotus-admin/map' || $_GET['p'] == 'lotus-admin/mall-visualization' || $_GET['p'] == 'lotus-admin/default') { echo 'active'; }?>">
                    <a href="#"><i class="fa fa-eye"></i>
                        <span>可视化管理</span>
                        <i class="fa fa-angle-left pull-right"></i>
                    </a>
                    <ul class="treeview-menu">
                        <li class="<?php if (isset($_GET['p']) && $_GET['p'] == 'lotus-admin/map') { echo 'active'; }?>">
                            <a href="/lotus-admin/map">地图</a>
                        </li>
                        <li class="<?php if (isset($_GET['p']) && $_GET['p'] == 'lotus-admin/mall-visualization' || $_GET['p'] == 'lotus-admin/default') { echo 'active'; }?>">
                            <a href="/lotus-admin/mall-visualization">项目可视化</a>
                        </li>
                    </ul>
                </li>
                <!--<li class="<?php if (isset($_GET['p']) && $_GET['p'] == 'lotus-admin/store-change') { echo 'active'; }?>">
                    <a href="#"><i class="fa fa-users"></i>
                        <span>拆分合并管理</span>
                        <i class="fa fa-angle-left pull-right"></i>
                    </a>
                    <ul class="treeview-menu">
                        <li class="<?php if (isset($_GET['p']) && $_GET['p'] == 'lotus-admin/store-change') { echo 'active'; }?>">
                            <a href="/lotus-admin/store-change">铺位变更单</a>
                        </li>
                    </ul>
                </li>-->
                <li class="<?php if (isset($_GET['p']) && $_GET['p'] == 'lotus-admin/dict' || $_GET['p'] == 'lotus-admin/create-dict-type' || $_GET['p'] == 'lotus-admin/create-dict-data' || $_GET['p'] == 'lotus-admin/edit-dict-data') { echo 'active'; }?>">
                    <a href="/lotus-admin/dict"><i class="fa fa-book"></i>
                        <span>字典管理</span>
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
        </div>
        <div id="leasingMgmt" style="display: none;">
            <ul class="sidebar-menu">
                <li class="<?php if (isset($_GET['p']) && $_GET['p'] == 'lotus-admin/store-progress-console' || $_GET['p'] == 'lotus-admin/modality-progress-console' || $_GET['p'] == 'lotus-admin/floor-progress-console' || $_GET['p'] == 'lotus-admin/leasing-budget' || $_GET['p'] == 'lotus-admin/budget-detail') { echo 'active'; }?>">
                    <a href="#"><i class="fa fa-calendar-check-o"></i>
                        <span>招商规划</span>
                        <i class="fa fa-angle-left pull-right"></i>
                    </a>
                    <ul class="treeview-menu">
                        <li class="<?php if (isset($_GET['p']) && $_GET['p'] == 'lotus-admin/leasing-budget' || $_GET['p'] == 'lotus-admin/budget-detail') { echo 'active'; }?>"><a href="/lotus-admin/leasing-budget?items=20">租金计划</a></li>
                        <li class="<?php if (isset($_GET['p']) && $_GET['p'] == 'lotus-admin/store-progress-console' || $_GET['p'] == 'lotus-admin/modality-progress-console' || $_GET['p'] == 'lotus-admin/floor-progress-console') { echo 'active'; }?>"><a href="/lotus-admin/store-progress-console?items=20">招商进度控制台</a></li>
                    </ul>
                </li>
                <li class="<?php if (isset($_GET['p']) && $_GET['p'] == 'lotus-admin/contracts' || $_GET['p'] == 'lotus-admin/contract-summary' || $_GET['p'] == 'lotus-admin/contract-detail' || $_GET['p'] == 'lotus-admin/contract-init' || $_GET['p'] == 'lotus-admin/contract-compare' || $_GET['p'] == 'lotus-admin/contract-history' || $_GET['p'] == 'lotus-admin/requests'
                        || $_GET['p'] == 'lotus-admin/request-summary' || $_GET['p'] == 'lotus-admin/request-detail' || $_GET['p'] == 'lotus-admin/dr-summary' || $_GET['p'] == 'lotus-admin/make-request' || $_GET['p'] == 'lotus-admin/renew-requests' || $_GET['p'] == 'lotus-admin/renew-summary' || $_GET['p'] == 'lotus-admin/renew-detail' || $_GET['p'] == 'lotus-admin/renew-request'
                        || $_GET['p'] == 'lotus-admin/terminate-requests' || $_GET['p'] == 'lotus-admin/terminate-summary' || $_GET['p'] == 'lotus-admin/terminate-detail' || $_GET['p'] == 'lotus-admin/terminate-request' || $_GET['p'] == 'lotus-admin/modify-summary' || $_GET['p'] == 'lotus-admin/standing-book' || $_GET['p'] == 'lotus-admin/contract-balance-preview' 
                        || $_GET['p'] == 'lotus-admin/modify-requests' || $_GET['p'] == 'lotus-admin/modify-detail' || $_GET['p'] == 'lotus-admin/modify-request' || $_GET['p'] == 'lotus-admin/request-balance-preview') { echo 'active'; }?>">
                    <a href="#"><i class="fa fa-paperclip"></i>
                        <span>租赁合同</span>
                        <i class="fa fa-angle-left pull-right"></i>
                    </a>
                    <ul class="treeview-menu">
                        <li class="<?php if (isset($_GET['p']) && $_GET['p'] == 'lotus-admin/contracts' || $_GET['p'] == 'lotus-admin/contract-summary' || $_GET['p'] == 'lotus-admin/contract-detail' || $_GET['p'] == 'lotus-admin/contract-init' || $_GET['p'] == 'lotus-admin/contract-history' || $_GET['p'] == 'lotus-admin/contract-compare' || $_GET['p'] == 'lotus-admin/standing-book' 
                        || $_GET['p'] == 'lotus-admin/contract-balance-preview' || $_GET['p'] == 'lotus-admin/request-balance-preview') { echo 'active'; }?>">
                            <a href="/lotus-admin/contracts?items=20">合同</a>
                        </li>
                        <li class="<?php if (isset($_GET['p']) && $_GET['p'] == 'lotus-admin/requests' || $_GET['p'] == 'lotus-admin/request-summary' || $_GET['p'] == 'lotus-admin/request-detail' || $_GET['p'] == 'lotus-admin/make-request' || $_GET['p'] == 'lotus-admin/dr-summary') { echo 'active'; }?>">
                            <a href="/lotus-admin/requests?items=20">新合同申请</a>
                        </li>
                        <li class="<?php if (isset($_GET['p']) && $_GET['p'] == 'lotus-admin/renew-requests' || $_GET['p'] == 'lotus-admin/renew-summary' || $_GET['p'] == 'lotus-admin/renew-detail' || $_GET['p'] == 'lotus-admin/renew-request' ) { echo 'active'; }?>">
                            <a href="/lotus-admin/renew-requests?items=20">续签申请</a>
                        </li>
                        <li class="<?php if (isset($_GET['p']) && $_GET['p'] == 'lotus-admin/terminate-requests' || $_GET['p'] == 'lotus-admin/terminate-summary' || $_GET['p'] == 'lotus-admin/terminate-detail' || $_GET['p'] == 'lotus-admin/terminate-request') { echo 'active'; }?>">
                            <a href="/lotus-admin/terminate-requests?items=20">终止申请</a>
                        </li>
                        <li class="<?php if (isset($_GET['p']) && $_GET['p'] == 'lotus-admin/modify-requests' || $_GET['p'] == 'lotus-admin/modify-summary' || $_GET['p'] == 'lotus-admin/modify-detail' || $_GET['p'] == 'lotus-admin/modify-request') { echo 'active'; }?>">
                            <a href="/lotus-admin/modify-requests?items=20">变更申请</a>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <div id="salesMgmt" style="display: none;">
            <ul class="sidebar-menu">
                <li class="<?php if (isset($_GET['p']) && $_GET['p'] == 'lotus-admin/product-category') { echo 'active'; }?>">
                    <a href="#"><i class="fa fa-cubes"></i>
                        <span>商品管理</span>
                        <i class="fa fa-angle-left pull-right"></i>
                    </a>
                    <ul class="treeview-menu">
                        <li class="<?php if (isset($_GET['p']) && $_GET['p'] == 'lotus-admin/product-category') { echo 'active'; }?>">
                            <a href="/lotus-admin/product-category">提成类别</a>
                        </li>
                    </ul>
                </li>
                <li class="<?php if (isset($_GET['p']) && $_GET['p'] == 'lotus-admin/sales-data-entries' || $_GET['p'] == 'lotus-admin/create-sales-data' || $_GET['p'] == 'lotus-admin/edit-sales-data') { echo 'active'; }?>">
                    <a href="#"><i class="fa fa-database"></i>
                        <span>数据采集</span>
                        <i class="fa fa-angle-left pull-right"></i>
                    </a>
                    <ul class="treeview-menu">
                        <li class="<?php if (isset($_GET['p']) && $_GET['p'] == 'lotus-admin/sales-data-entries' || $_GET['p'] == 'lotus-admin/create-sales-data' || $_GET['p'] == 'lotus-admin/edit-sales-data') { echo 'active'; }?>">
                            <a href="/lotus-admin/sales-data-entries?items=20">销售数据录入</a>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <div id="accountingMgmt" style="display: none;">
            <ul class="sidebar-menu">
                <li class="<?php if (isset($_GET['p']) && $_GET['p'] == 'lotus-admin/gl-config' || $_GET['p'] == 'lotus-admin/fee-item') { echo 'active'; }?>">
                    <a href="#"><i class="fa fa-book"></i>
                        <span>基础资料</span>
                        <i class="fa fa-angle-left pull-right"></i>
                    </a>
                    <ul class="treeview-menu">
                        <li class="<?php if (isset($_GET['p']) && $_GET['p'] == 'lotus-admin/fee-item') { echo 'active'; }?>">
                            <a href="/lotus-admin/fee-item">科目</a>
                        </li>
                        <li class="<?php if (isset($_GET['p']) && $_GET['p'] == 'lotus-admin/gl-config') { echo 'active'; }?>">
                            <a href="/lotus-admin/gl-config">账期设置</a>
                        </li>
                    </ul>
                </li>
                <li class="<?php if (isset($_GET['p']) && $_GET['p'] == 'lotus-admin/accounting-bill' || $_GET['p'] == 'lotus-admin/bill-detail') { echo 'active'; }?>">
                    <a href="#"><i class="fa fa-rmb"></i>
                        <span>账单管理</span>
                        <i class="fa fa-angle-left pull-right"></i>
                    </a>
                    <ul class="treeview-menu">
                        <li class="<?php if (isset($_GET['p']) && $_GET['p'] == 'lotus-admin/accounting-bill' || $_GET['p'] == 'lotus-admin/bill-detail') { echo 'active'; }?>">
                            <a href="/lotus-admin/accounting-bill?items=20">账单</a>
                        </li>
                    </ul>
                </li>
                <li class="<?php if (isset($_GET['p']) && $_GET['p'] == 'lotus-admin/contract-balance') { echo 'active'; }?>">
                    <a href="#"><i class="fa fa-calculator"></i>
                        <span>结算管理</span>
                        <i class="fa fa-angle-left pull-right"></i>
                    </a>
                    <ul class="treeview-menu">
                        <li class="<?php if (isset($_GET['p']) && $_GET['p'] == 'lotus-admin/contract-balance') { echo 'active'; }?>">
                            <a href="/lotus-admin/contract-balance?items=20">合同结算情况</a>
                        </li>
                    </ul>
                </li>
                <li class="<?php if (isset($_GET['p']) && $_GET['p'] == 'lotus-admin/accounting-voucher' || $_GET['p'] == 'lotus-admin/accounting-tenant' || $_GET['p'] == 'lotus-admin/accounting-contract') { echo 'active'; }?>">
                    <a href="#"><i class="fa fa-files-o"></i>
                        <span>凭证管理</span>
                        <i class="fa fa-angle-left pull-right"></i>
                    </a>
                    <ul class="treeview-menu">
                        <li class="<?php if (isset($_GET['p']) && $_GET['p'] == 'lotus-admin/accounting-voucher' || $_GET['p'] == 'lotus-admin/accounting-tenant' || $_GET['p'] == 'lotus-admin/accounting-contract') { echo 'active'; }?>">
                            <a href="/lotus-admin/accounting-voucher?items=20">会计凭证</a>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <div id="processMgmt" style="display: none;">
            <ul class="sidebar-menu">
                <li class="<?php if (isset($_GET['p']) && $_GET['p'] == 'lotus-admin/bi') { echo 'active'; }?>">
                    <a href="#"><i class="fa fa-pie-chart"></i>
                        <span>报表管理</span>
                        <i class="fa fa-angle-left pull-right"></i>
                    </a>
                    <ul class="treeview-menu">
                        <li class="<?php if (isset($_GET['p']) && $_GET['p'] == 'lotus-admin/bi') { echo 'active'; }?>">
                            <a href="/lotus-admin/bi">报表管理</a>
                        </li>
                    </ul>
                </li>
                <li class="<?php if (isset($_GET['p']) && $_GET['p'] == 'lotus-admin/my-process' || $_GET['p'] == 'lotus-admin/in-process' || $_GET['p'] == 'lotus-admin/processes' || $_GET['p'] == 'lotus-admin/process-detail' 
                        || $_GET['p'] == 'lotus-admin/process-request' || $_GET['p'] == 'lotus-admin/sign-process-detail') { echo 'active'; }?>">
                    <a href="#"><i class="fa fa-send"></i>
                        <span>流程管理</span>
                        <i class="fa fa-angle-left pull-right"></i>
                    </a>
                    <ul class="treeview-menu">
                        <li class="<?php if (isset($_GET['p']) && $_GET['p'] == 'lotus-admin/my-process' || $_GET['p'] == 'lotus-admin/in-process' || $_GET['p'] == 'lotus-admin/processes' || $_GET['p'] == 'lotus-admin/process-detail'
                            || $_GET['p'] == 'lotus-admin/sign-process-detail') { echo 'active'; }?>">
                            <a href="/lotus-admin/my-process?items=20">待办事项</a>
                        </li>
                        <li class="<?php if (isset($_GET['p']) && $_GET['p'] == 'lotus-admin/process-request') { echo 'active'; }?>">
                            <a href="/lotus-admin/process-request">发起流程</a>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </section>
</aside>