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
                            <i class="fa fa-asterisk text-green"></i> 所有品牌
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