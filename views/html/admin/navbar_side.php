<nav class="navbar-default navbar-static-side" role="navigation">
    <div class="sidebar-collapse">
        <ul class="nav" id="side-menu">
            <li>
                <a href="home"><i class="fa fa-home fa-fw"></i> 首页</a>
            </li>
            <!--<li<?php if($getTarget === "admin/merchants" || $getTarget === "admin/merchant" || $getTarget === "admin/merchant-tianyancha") echo " class='active'"?>>
                <a href="#"><i class="fa fa-briefcase" aria-hidden="true"></i> 商户<span class="fa arrow"></span></a>
                <ul class="nav nav-second-level">
                    <li>
                        <a href="merchants">商户信息</a>
                    </li>
                </ul>
            </li>-->
            <li<?php if($getTarget === "admin/brands" || $getTarget === "admin/brand") echo " class='active'"?>>
                <a href="#"><i class="fa fa-globe" aria-hidden="true"></i> 品牌<span class="fa arrow"></span></a>
                <ul class="nav nav-second-level">
                    <li>
                        <a href="brands">品牌信息</a>
                    </li>
                </ul>
            </li>
            <li<?php if($getTarget === "admin/malls" || $getTarget === "admin/mall") echo " class='active'"?>>
                <a href="#"><i class="fa fa-star" aria-hidden="true"></i> 项目<span class="fa arrow"></span></a>
                <ul class="nav nav-second-level">
                    <li>
                        <a href="malls">项目信息</a>
                    </li>
                </ul>
            </li>
            <li<?php if($getTarget === "admin/buildings" || $getTarget === "admin/building") echo " class='active'"?>>
                <a href="#"><i class="fa fa-building" aria-hidden="true"></i> 建筑<span class="fa arrow"></span></a>
                <ul class="nav nav-second-level">
                    <li>
                        <a href="buildings">建筑信息</a>
                    </li>
                </ul>
            </li>
            <li<?php if($getTarget === "admin/floors" || $getTarget === "admin/floor") echo " class='active'"?>>
                <a href="#"><i class="fa fa-building-o" aria-hidden="true"></i> 楼层<span class="fa arrow"></span></a>
                <ul class="nav nav-second-level">
                    <li>
                        <a href="floors">楼层信息</a>
                    </li>
                </ul>
            </li>
            <li<?php if($getTarget === "admin/shops" || $getTarget === "admin/shop") echo " class='active'"?>>
                <a href="#"><i class="fa fa-gift" aria-hidden="true"></i> 店铺<span class="fa arrow"></span></a>
                <ul class="nav nav-second-level">
                    <li>
                        <a href="shops">店铺信息</a>
                    </li>
                </ul>
            </li>
            <!--<li<?php if($getTarget === "admin/bids" || $getTarget === "admin/bid") echo " class='active'"?>>
                <a href="#"><i class="fa fa-bar-chart-o" aria-hidden="true"></i> 出价<span class="fa arrow"></span></a>
                <ul class="nav nav-second-level">
                    <li>
                        <a href="bids">出价信息</a>
                    </li>
                </ul>
            </li>-->
            <li<?php if($getTarget === "admin/sync-hd") echo " class='active'"?>>
                <a href="#"><i class="fa fa-life-saver" aria-hidden="true"></i> 同步<span class="fa arrow"></span></a>
                <ul class="nav nav-second-level">
                    <li>
                        <a href="sync-hd">同步海鼎</a>
                    </li>
                </ul>
            </li>
            <!--<li<?php if($getTarget === "admin/users" || $getTarget === "admin/add-user") echo " class='active'"?>>
                <a href="#"><i class="fa fa-user" aria-hidden="true"></i> 用户<span class="fa arrow"></span></a>
                <ul class="nav nav-second-level">
                    <li>
                        <a href="users">用户信息</a>
                    </li>
                </ul>
            </li>
            <li<?php if($getTarget === "admin/roles" || $getTarget === "admin/add-role" || $getTarget === "admin/apis") echo " class='active'"?>>
                <a href="#"><i class="fa fa-fighter-jet" aria-hidden="true"></i> 权限<span class="fa arrow"></span></a>
                <ul class="nav nav-second-level">
                    <li>
                        <a href="roles">角色信息</a>
                    </li>
                    <li>
                        <a href="apis">API信息</a>
                    </li>
                </ul>
            </li>-->
        </ul>
    </div>
</nav>