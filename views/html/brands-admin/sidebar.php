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
            <li  class="<?php if (isset($_GET['p']) && $_GET['p'] == 'brands-admin/' || $_GET['p'] == 'brands-admin/home') { echo 'active'; }?>">
                <a href="#"><i class="fa fa-copyright"></i>
                    <span>品牌列表</span>
                    <i class="fa fa-angle-left pull-right"></i>
                </a>
                <ul class="treeview-menu">
                    <li class="<?php if (isset($_GET['p']) && $_GET['p'] == 'brands-admin/') { echo 'active '; }?>">
                        <a href="/brands-admin/?items=10">
                            <i class="fa fa-asterisk text-blue"></i> 所有品牌
                        </a>
                    </li>
                </ul>
            </li>
            <li  class="<?php if (isset($_GET['p']) && $_GET['p'] == 'brands-admin/levels') { echo 'active'; }?>">
                <a href="#"><i class="fa fa-building-o"></i>
                    <span>楼层列表</span>
                    <i class="fa fa-angle-left pull-right"></i>
                </a>
                <ul class="treeview-menu">
                    <li class="<?php if (isset($_GET['p']) && $_GET['p'] == 'brands-admin/levels' && $level == '8') { echo 'active'; }?>">
                        <a href="/brands-admin/levels?f=8">
                            <i class="fa fa-level-up text-green"></i> L8
                        </a>
                    </li>
                    <li class="<?php if (isset($_GET['p']) && $_GET['p'] == 'brands-admin/levels' && $level == '7') { echo 'active'; }?>">
                        <a href="/brands-admin/levels?f=7">
                            <i class="fa fa-level-up text-orange"></i> L7
                        </a>
                    </li>
                    <li class="<?php if (isset($_GET['p']) && $_GET['p'] == 'brands-admin/levels' && $level == '6') { echo 'active'; }?>">
                        <a href="/brands-admin/levels?f=6">
                            <i class="fa fa-level-up text-red"></i> L6
                        </a>
                    </li>
                    <li class="<?php if (isset($_GET['p']) && $_GET['p'] == 'brands-admin/levels' && $level == '5') { echo 'active'; }?>">
                        <a href="/brands-admin/levels?f=5">
                            <i class="fa fa-level-up text-red"></i> L5
                        </a>
                    </li>
                    <li class="<?php if (isset($_GET['p']) && $_GET['p'] == 'brands-admin/levels' && $level == '4') { echo 'active'; }?>">
                        <a href="/brands-admin/levels?f=4">
                            <i class="fa fa-level-up text-blue"></i> L4
                        </a>
                    </li>
                    <li class="<?php if (isset($_GET['p']) && $_GET['p'] == 'brands-admin/levels' && $level == '3') { echo 'active'; }?>">
                        <a href="/brands-admin/levels?f=3">
                            <i class="fa fa-level-up text-yellow"></i> L3
                        </a>
                    </li>
                    <li class="<?php if (isset($_GET['p']) && $_GET['p'] == 'brands-admin/levels' && $level == '2') { echo 'active'; }?>">
                        <a href="/brands-admin/levels?f=2">
                            <i class="fa fa-level-up text-red"></i> L2
                        </a>
                    </li>
                    <li class="<?php if (isset($_GET['p']) && $_GET['p'] == 'brands-admin/levels' && $level == '1') { echo 'active'; }?>">
                        <a href="/brands-admin/levels?f=1">
                            <i class="fa fa-level-up text-green"></i> L1
                        </a>
                    </li>
                    <li class="<?php if (isset($_GET['p']) && $_GET['p'] == 'brands-admin/levels' && $level == '0') { echo 'active'; }?>">
                        <a href="/brands-admin/levels?f=0">
                            <i class="fa fa-level-up text-orange"></i> B1
                        </a>
                    </li>
                </ul>
            </li>
            <?php
            if($_SESSION['brands_admin_login'] == 'CUSER190709000022' || $_SESSION['brands_admin_login'] == 'CUSER190709000015'){
            ?>
            <li class="<?php if (isset($_GET['p']) && $_GET['p'] == 'brands-admin/log') { echo 'active '; }?>">
                <a href="/brands-admin/log?items=10"><i class="fa fa-bar-chart"></i> 
                    <span>操作日志</span>
                </a>
            </li>
            <?php
            }
            ?>
        </ul>
    </section>
</aside>