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
        </ul>
    </section>
</aside>