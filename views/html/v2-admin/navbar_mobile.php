<div id="mimin-mobile" class="reverse">
    <div class="mimin-mobile-menu-list">
        <div class="col-md-12 sub-mimin-mobile-menu-list animated fadeInLeft">
            <ul class="nav nav-list">
                <li><a href="/v2-admin/home"<?php if($getTarget === "v2-admin/home") echo " class='active'"?>><span class="fa-home fa"></span> 首页</a></li>
                <li class="ripple"><a class="tree-toggle nav-header<?php if($getTarget === "v2-admin/brands") echo " active"?>"><span class="fa-globe fa"></span> 品牌  <span class="fa-angle-right fa right-arrow text-right"></span> </a>
                    <ul class="nav nav-list tree">
                        <li><a href="/v2-admin/brands">品牌信息</a></li>
                    </ul>
                </li>
                <li class="ripple"><a class="tree-toggle nav-header<?php if($getTarget === "v2-admin/malls") echo " active"?>"><span class="fa-star fa"></span> 项目  <span class="fa-angle-right fa right-arrow text-right"></span> </a>
                    <ul class="nav nav-list tree">
                        <li><a href="/v2-admin/malls">项目信息</a></li>
                    </ul>
                </li>
                <li class="ripple"><a class="tree-toggle nav-header<?php if($getTarget === "v2-admin/buildings") echo " active"?>"><span class="fa-building fa"></span> 建筑  <span class="fa-angle-right fa right-arrow text-right"></span> </a>
                    <ul class="nav nav-list tree">
                        <li><a href="/v2-admin/buildings">建筑信息</a></li>
                    </ul>
                </li>
                <li class="ripple"><a class="tree-toggle nav-header<?php if($getTarget === "v2-admin/floors") echo " active"?>"><span class="fa-life-ring fa"></span> 楼层  <span class="fa-angle-right fa right-arrow text-right"></span> </a>
                    <ul class="nav nav-list tree">
                        <li><a href="/v2-admin/floors">楼层信息</a></li>
                    </ul>
                </li>
                <li class="ripple"><a class="tree-toggle nav-header<?php if($getTarget === "v2-admin/shops") echo " active"?>"><span class="fa-briefcase fa"></span> 店铺  <span class="fa-angle-right fa right-arrow text-right"></span> </a>
                    <ul class="nav nav-list tree">
                        <li><a href="/v2-admin/shops">店铺信息</a></li>
                    </ul>
                </li>
                <li class="ripple"><a class="tree-toggle nav-header<?php if($getTarget === "v2-admin/bids" || $getTarget === "v2-admin/bid") echo " active"?>"><span class="fa-info-circle fa"></span> 出价  <span class="fa-angle-right fa right-arrow text-right"></span> </a>
                    <ul class="nav nav-list tree">
                        <li><a href="/v2-admin/bids">出价信息</a></li>
                    </ul>
                </li>
                <li class="ripple"><a class="tree-toggle nav-header<?php if($getTarget === "v2-admin/sync-hd") echo " active"?>"><span class="fa-fast-forward fa"></span> 同步  <span class="fa-angle-right fa right-arrow text-right"></span> </a>
                    <ul class="nav nav-list tree">
                        <li><a href="/v2-admin/sync-hd">同步海鼎</a></li>
                    </ul>
                </li>
                <li class="ripple"><a class="tree-toggle nav-header<?php if($getTarget === "v2-admin/users") echo " active"?>"><span class="fa-user fa"></span> 用户  <span class="fa-angle-right fa right-arrow text-right"></span> </a>
                    <ul class="nav nav-list tree">
                        <li><a href="/v2-admin/users">用户信息</a></li>
                    </ul>
                </li>
                <li class="ripple"><a class="tree-toggle nav-header<?php if($getTarget === "v2-admin/roles" || $getTarget === "v2-admin/add-role" || $getTarget === "v2-admin/apis") echo " active"?>"><span class="fa-fighter-jet fa"></span> 权限  <span class="fa-angle-right fa right-arrow text-right"></span> </a>
                    <ul class="nav nav-list tree">
                        <li><a href="/v2-admin/roles">角色信息</a></li>
                        <li><a href="/v2-admin/apis">API信息</a></li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</div>