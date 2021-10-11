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
            <li class="<?php if (isset($_GET['p']) && ($_GET['p'] == 'lotus-admin/' || $_GET['p'] == 'lotus-admin/home')) { echo 'active '; }?>">            
                <a href="#"><i class="fa fa-building-o"></i>
                    <span>楼层列表</span>
                    <i class="fa fa-angle-left pull-right"></i>
                </a>
                <ul id="floorList" class="treeview-menu">
                </ul>
            </li>
            <li  class="<?php if (isset($_GET['p']) && $_GET['p'] == 'lotus-admin/brands') { echo 'active'; }?>">
                <a href="/lotus-admin/brands?items=10"><i class="fa fa-registered"></i>
                    <span>品牌列表</span>
                </a>
            </li>
            <li  class="<?php if (isset($_GET['p']) && $_GET['p'] == 'lotus-admin/tenants') { echo 'active'; }?>">
                <a href="/lotus-admin/tenants?items=10"><i class="fa fa-users"></i>
                    <span>租户列表</span>
                </a>
            </li>
            <li  class="<?php if (isset($_GET['p']) && $_GET['p'] == 'lotus-admin/contracts') { echo 'active'; }?>">
                <a href="/lotus-admin/contracts?items=10"><i class="fa fa-file-archive-o"></i>
                    <span>合同列表</span>
                </a>
            </li>
        </ul>
    </section>
</aside>