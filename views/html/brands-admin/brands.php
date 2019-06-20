<?php include 'sidebar.php'; ?>

<div class="content-wrapper">
    <section class="content-header" style="padding-bottom: 30px;">
        <h1 class="pull-left">
            所有品牌
        </h1>
        <div class="pull-right">
            <a href="#" style="margin-right: 5px;" class="btn btn-default">
                导出本地</a>
            <a href="/brands-admin/create-brand" class="btn btn-primary pull-right"></i> 新增</a>
        </div>
    </section>

    <section class="content">
        <div id="webui">

            <div class="row">
                <div class="col-md-12">
                    <div class="box">
                        <div class="box-body">
                            <form method="POST" action="#" accept-charset="UTF-8" class="form-inline" id="bulkForm"><input name="_token" type="hidden" value="">
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="bootstrap-table">
                                            <div class="fixed-table-toolbar">
                                                <div class="columns columns-right btn-group pull-right" role="group">
                                                    <button class="btn btn-default" type="button" name="advancedSearch" aria-label="高级搜索" title="Advanced search">
                                                        <i class="fa fa fa-search-plus"></i>
                                                    </button>
                                                </div>
                                                <div class="bs-bars pull-left">
                                                    <div class="search">
                                                        <input class="form-control" type="text" placeholder="搜索">
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="fixed-table-pagination" style="clear: both;">
                                                <div class="pull-left pagination-detail">
                                                    <span class="pagination-info">显示 1 到 10 行，共 2245 行</span>
                                                    <span class="page-list">
                                                        <span class="btn-group dropdown">
                                                            <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
                                                                <span class="page-size">10</span>
                                                                <span class="caret"></span>
                                                            </button>
                                                            <ul class="dropdown-menu" role="menu">
                                                                <li role="menuitem"><a href="#">10</a></li>
                                                                <li role="menuitem"><a href="#">20</a></li>
                                                                <li role="menuitem"><a href="#">30</a></li>
                                                                <li role="menuitem"><a href="#">50</a></li>
                                                            </ul>
                                                        </span> 行每页</span>
                                                </div>
                                                <div class="pull-right pagination">
                                                    <ul class="pagination">
                                                        <li class="page-pre">
                                                            <a href="#">上一页</a>
                                                        </li>
                                                        <li class="page-number active">
                                                            <a href="#">1</a>
                                                        </li>
                                                        <li class="page-number">
                                                            <a href="#">2</a>
                                                        </li>
                                                        <li class="page-number">
                                                            <a href="#">3</a>
                                                        </li>
                                                        <li class="page-next">
                                                            <a href="#">下一页</a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div class="fixed-table-container table-no-bordered">
                                                <div class="fixed-table-body">
                                                    <table class="table table-striped snipe-table table-responsive table-no-bordered" style="margin-top: 0">
                                                        <thead id="assetsListingTable-sticky-header" class="hidden-xs">
                                                            <tr>
                                                                <th class="bs-checkbox">
                                                                    <div class="th-inner ">
                                                                        <input name="btSelectAll" type="checkbox">
                                                                    </div>
                                                                    <div class="fht-cell"></div>
                                                                </th>
                                                                <th>
                                                                    <div class="th-inner">品牌</div>
                                                                    <div class="fht-cell"></div>
                                                                </th>
                                                                <th>
                                                                    <div class="th-inner">Logo</div>
                                                                    <div class="fht-cell"></div>
                                                                </th>
                                                                <th>
                                                                    <div class="th-inner">业态</div>
                                                                    <div class="fht-cell"></div>
                                                                </th>
                                                                <th>
                                                                    <div class="th-inner">属性</div>
                                                                    <div class="fht-cell"></div>
                                                                </th>
                                                                <th>
                                                                    <div class="th-inner">价位</div>
                                                                    <div class="fht-cell"></div>
                                                                </th>
                                                                <th>
                                                                    <div class="th-inner">口碑</div>
                                                                    <div class="fht-cell"></div>
                                                                </th>
                                                                <th>
                                                                    <div class="th-inner">状态</div>
                                                                    <div class="fht-cell"></div>
                                                                </th>
                                                                <th>
                                                                    <div class="th-inner">操作</div>
                                                                    <div class="fht-cell"></div>
                                                                </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody class="hidden-xs">
                                                            <tr data-index="0">
                                                                <td class="bs-checkbox">
                                                                    <input data-index="0" name="btSelectItem" type="checkbox">
                                                                </td>
                                                                <td><a href="/brands-admin/brand"> NUOGIC</a></td>
                                                                <td>
                                                                    <a href="/views/assets/base/img/content/brands-admin/nuogic.jpg" data-toggle="lightbox" data-type="image">
                                                                        <img src="/views/assets/base/img/content/brands-admin/nuogic.jpg" width="50">
                                                                    </a>
                                                                </td>
                                                                <td>
                                                                    女鞋
                                                                </td>
                                                                <td>
                                                                    国际普通品牌
                                                                </td>
                                                                <td>中等</td>
                                                                <td>比较好</td>
                                                                <td>
                                                                    <span class="btn btn-sm btn-info">已生效</span>
                                                                </td>
                                                                <td>

                                                                    <a href="#" class="btn btn-sm btn-warning" data-tooltip="true" title="Update">
                                                                        <i class="fa fa-pencil"></i>
                                                                    </a>
                                                                    &nbsp;
                                                                    <a href="#" class="btn btn-danger btn-sm delete-asset" data-tooltip="true" data-toggle="modal" data-content="是否确定删除该品牌 ?" data-title="删除品牌" onclick="return false;">
                                                                        <i class="fa fa-trash"></i>
                                                                    </a>
                                                                    &nbsp;

                                                                </td>
                                                            </tr>


                                                            <tr data-index="1">
                                                                <td class="bs-checkbox">
                                                                    <input data-index="1" name="btSelectItem" type="checkbox">
                                                                </td>
                                                                <td><a href="/brands-admin/brand"> Green&Safe</a></td>
                                                                <td>
                                                                    <a href="/views/assets/base/img/content/brands-admin/greensafe.jpg" data-toggle="lightbox" data-type="image">
                                                                        <img src="/views/assets/base/img/content/brands-admin/greensafe.jpg" width="50">
                                                                    </a>
                                                                </td>
                                                                <td>
                                                                </td>
                                                                <td>
                                                                    国际普通品牌
                                                                </td>
                                                                <td>中等</td>
                                                                <td>非常好</td>
                                                                <td>
                                                                    <span class="btn btn-sm btn-default">未生效</span>
                                                                </td>
                                                                <td>
                                                                    <a href="#" class="btn btn-sm btn-warning" data-tooltip="true" title="Update">
                                                                        <i class="fa fa-pencil"></i>
                                                                    </a>
                                                                    &nbsp;
                                                                    <a href="#" class="btn btn-danger btn-sm delete-asset" data-tooltip="true" data-toggle="modal" data-content="是否确定删除该品牌 ?" data-title="删除品牌" onclick="return false;">
                                                                        <i class="fa fa-trash"></i>
                                                                    </a>
                                                                    &nbsp;
                                                                </td>
                                                            </tr>

                                                            <tr data-index="2">
                                                                <td class="bs-checkbox">
                                                                    <input data-index="2" name="btSelectItem" type="checkbox">
                                                                </td>
                                                                <td><a href="/brands-admin/brand"> 墨格</a></td>
                                                                <td>
                                                                    <a href="/views/assets/base/img/content/brands-admin/moge.jpg" data-toggle="lightbox" data-type="image">
                                                                        <img src="/views/assets/base/img/content/brands-admin/moge.jpg" width="50">
                                                                    </a>
                                                                </td>
                                                                <td>

                                                                </td>
                                                                <td>
                                                                    国内普通品牌
                                                                </td>
                                                                <td>中等</td>
                                                                <td>比较好</td>
                                                                <td>
                                                                    <span class="btn btn-sm btn-default">未生效</span>
                                                                </td>
                                                                <td>
                                                                    <a href="#" class="btn btn-sm btn-warning" data-tooltip="true" title="Update">
                                                                        <i class="fa fa-pencil"></i>
                                                                    </a>
                                                                    &nbsp;
                                                                    <a href="#" class="btn btn-danger btn-sm delete-asset" data-tooltip="true" data-toggle="modal" data-content="是否确定删除该品牌 ?" data-title="删除品牌" onclick="return false;">
                                                                        <i class="fa fa-trash"></i>
                                                                    </a>
                                                                    &nbsp;
                                                                </td>
                                                            </tr>

                                                            <tr data-index="3">
                                                                <td class="bs-checkbox">
                                                                    <input data-index="3" name="btSelectItem" type="checkbox">
                                                                </td>
                                                                <td><a href="/brands-admin/brand">CLUB  XXHH</a></td>
                                                                <td>
                                                                    <a href="/views/assets/base/img/content/brands-admin/xxhh_club.jpg" data-toggle="lightbox" data-type="image">
                                                                        <img src="/views/assets/base/img/content/brands-admin/xxhh_club.jpg" width="50">
                                                                    </a>
                                                                </td>
                                                                <td>

                                                                </td>
                                                                <td>
                                                                    国际普通品牌
                                                                </td>
                                                                <td>中等</td>
                                                                <td>比较好</td>
                                                                <td>
                                                                    <span class="btn btn-sm btn-default">未生效</span>
                                                                </td>
                                                                <td>
                                                                    <a href="#" class="btn btn-sm btn-warning" data-tooltip="true" title="Update">
                                                                        <i class="fa fa-pencil"></i>
                                                                    </a>
                                                                    &nbsp;
                                                                    <a href="#" class="btn btn-danger btn-sm delete-asset" data-tooltip="true" data-toggle="modal" data-content="是否确定删除该品牌 ?" data-title="删除品牌" onclick="return false;">
                                                                        <i class="fa fa-trash"></i>
                                                                    </a>
                                                                    &nbsp;
                                                                </td>
                                                            </tr>

                                                            <tr data-index="4">
                                                                <td class="bs-checkbox">
                                                                    <input data-index="4" name="btSelectItem" type="checkbox">
                                                                </td>
                                                                <td><a href="/brands-admin/brand"> TangLeLe</a></td>
                                                                <td>
                                                                    <a href="/views/assets/base/img/content/brands-admin/tanglele.jpg" data-toggle="lightbox" data-type="image">
                                                                        <img src="/views/assets/base/img/content/brands-admin/tanglele.jpg" width="50">
                                                                    </a>
                                                                </td>
                                                                <td>
                                                                    儿童育乐
                                                                </td>
                                                                <td>
                                                                    国内普通品牌
                                                                </td>
                                                                <td>中等</td>
                                                                <td>比较好</td>
                                                                <td>
                                                                    <span class="btn btn-sm btn-info">已生效</span>
                                                                </td>
                                                                <td>
                                                                    <a href="#" class="btn btn-sm btn-warning" data-tooltip="true" title="Update">
                                                                        <i class="fa fa-pencil"></i>
                                                                    </a>
                                                                    &nbsp;
                                                                    <a href="#" class="btn btn-danger btn-sm delete-asset" data-tooltip="true" data-toggle="modal" data-content="是否确定删除该品牌 ?" data-title="删除品牌" onclick="return false;">
                                                                        <i class="fa fa-trash"></i>
                                                                    </a>
                                                                    &nbsp;
                                                                </td>
                                                            </tr>

                                                            <tr data-index="5">
                                                                <td class="bs-checkbox">
                                                                    <input data-index="5" name="btSelectItem" type="checkbox">
                                                                </td>
                                                                <td><a href="/brands-admin/brand"> aita</a></td>
                                                                <td>
                                                                    <a href="/views/assets/base/img/content/brands-admin/aita.jpg" data-toggle="lightbox" data-type="image">
                                                                        <img src="/views/assets/base/img/content/brands-admin/aita.jpg" width="50">
                                                                    </a>
                                                                </td>
                                                                <td>

                                                                </td>
                                                                <td>
                                                                    国际普通品牌
                                                                </td>
                                                                <td>中等</td>
                                                                <td>比较好</td>
                                                                <td>
                                                                    <span class="btn btn-sm btn-default">未生效</span>
                                                                </td>
                                                                <td>
                                                                    <a href="#" class="btn btn-sm btn-warning" data-tooltip="true" title="Update">
                                                                        <i class="fa fa-pencil"></i>
                                                                    </a>
                                                                    &nbsp;
                                                                    <a href="#" class="btn btn-danger btn-sm delete-asset" data-tooltip="true" data-toggle="modal" data-content="是否确定删除该品牌 ?" data-title="删除品牌" onclick="return false;">
                                                                        <i class="fa fa-trash"></i>
                                                                    </a>
                                                                    &nbsp;
                                                                </td>
                                                            </tr>

                                                            <tr data-index="6">
                                                                <td class="bs-checkbox">
                                                                    <input data-index="6" name="btSelectItem" type="checkbox">
                                                                </td>
                                                                <td><a href="/brands-admin/brand"> 卤丁制物</a></td>
                                                                <td>

                                                                </td>
                                                                <td>
                                                                    小型餐饮&咖啡店
                                                                </td>
                                                                <td>
                                                                    国内普通品牌
                                                                </td>
                                                                <td>中等</td>
                                                                <td>比较好</td>
                                                                <td>
                                                                    <span class="btn btn-sm btn-info">已生效</span>
                                                                </td>
                                                                <td>
                                                                    <a href="#" class="btn btn-sm btn-warning" data-tooltip="true" title="Update">
                                                                        <i class="fa fa-pencil"></i>
                                                                    </a>
                                                                    &nbsp;
                                                                    <a href="#" class="btn btn-danger btn-sm delete-asset" data-tooltip="true" data-toggle="modal" data-content="是否确定删除该品牌 ?" data-title="删除品牌" onclick="return false;">
                                                                        <i class="fa fa-trash"></i>
                                                                    </a>
                                                                    &nbsp;
                                                                </td>
                                                            </tr>

                                                            <tr data-index="7">
                                                                <td class="bs-checkbox">
                                                                    <input data-index="7" name="btSelectItem" type="checkbox">
                                                                </td>
                                                                <td><a href="/brands-admin/brand"> HEMLIV</a></td>
                                                                <td>
                                                                    <a href="/views/assets/base/img/content/brands-admin/hemliv.jpg" data-toggle="lightbox" data-type="image">
                                                                        <img src="/views/assets/base/img/content/brands-admin/hemliv.jpg" width="50">
                                                                    </a>
                                                                </td>
                                                                <td>

                                                                </td>
                                                                <td>
                                                                    国际普通品牌
                                                                </td>
                                                                <td>中等</td>
                                                                <td>比较好</td>
                                                                <td>
                                                                    <span class="btn btn-sm btn-default">未生效</span>
                                                                </td>
                                                                <td>
                                                                    <a href="#" class="btn btn-sm btn-warning" data-tooltip="true" title="Update">
                                                                        <i class="fa fa-pencil"></i>
                                                                    </a>
                                                                    &nbsp;
                                                                    <a href="#" class="btn btn-danger btn-sm delete-asset" data-tooltip="true" data-toggle="modal" data-content="是否确定删除该品牌 ?" data-title="删除品牌" onclick="return false;">
                                                                        <i class="fa fa-trash"></i>
                                                                    </a>
                                                                    &nbsp;
                                                                </td>
                                                            </tr>

                                                            <tr data-index="8">
                                                                <td class="bs-checkbox">
                                                                    <input data-index="8" name="btSelectItem" type="checkbox">
                                                                </td>
                                                                <td><a href="/brands-admin/brand"> 乐尚轮滑</a></td>
                                                                <td>
                                                                    <a href="/views/assets/base/img/content/brands-admin/action.jpg" data-toggle="lightbox" data-type="image">
                                                                        <img src="/views/assets/base/img/content/brands-admin/action.jpg" width="50">
                                                                    </a>
                                                                </td>
                                                                <td>

                                                                </td>
                                                                <td>
                                                                    国内普通品牌
                                                                </td>
                                                                <td>中等</td>
                                                                <td>比较好</td>
                                                                <td>
                                                                    <span class="btn btn-sm btn-default">未生效</span>
                                                                </td>
                                                                <td>
                                                                    <a href="#" class="btn btn-sm btn-warning" data-tooltip="true" title="Update">
                                                                        <i class="fa fa-pencil"></i>
                                                                    </a>
                                                                    &nbsp;
                                                                    <a href="#" class="btn btn-danger btn-sm delete-asset" data-tooltip="true" data-toggle="modal" data-content="是否确定删除该品牌 ?" data-title="删除品牌" onclick="return false;">
                                                                        <i class="fa fa-trash"></i>
                                                                    </a>
                                                                    &nbsp;
                                                                </td>
                                                            </tr>

                                                            <tr data-index="9">
                                                                <td class="bs-checkbox">
                                                                    <input data-index="9" name="btSelectItem" type="checkbox">
                                                                </td>
                                                                <td><a href="/brands-admin/brand"> PONHU</a></td>
                                                                <td>

                                                                </td>
                                                                <td>

                                                                </td>
                                                                <td>
                                                                    国际普通品牌
                                                                </td>
                                                                <td>中等</td>
                                                                <td>比较好</td>
                                                                <td>
                                                                    <span class="btn btn-sm btn-default">未生效</span>
                                                                </td>
                                                                <td>
                                                                    <a href="#" class="btn btn-sm btn-warning" data-tooltip="true" title="Update">
                                                                        <i class="fa fa-pencil"></i>
                                                                    </a>
                                                                    &nbsp;
                                                                    <a href="#" class="btn btn-danger btn-sm delete-asset" data-tooltip="true" data-toggle="modal" data-content="是否确定删除该品牌 ?" data-title="删除品牌" onclick="return false;">
                                                                        <i class="fa fa-trash"></i>
                                                                    </a>
                                                                    &nbsp;
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                        <tbody class="hidden-sm hidden-md hidden-lg">
                                                            <tr data-index="0">
                                                                <td colspan="65">
                                                                    <div class="card-views">
                                                                        <div class="card-view ">
                                                                            <input data-index="0" name="btSelectItem" type="checkbox">
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">Logo</span>
                                                                            <span class="value">
                                                                                <a href="/views/assets/base/img/content/brands-admin/nuogic.jpg" data-toggle="lightbox" data-type="image">
                                                                                    <img src="/views/assets/base/img/content/brands-admin/nuogic.jpg" style="max-height: 30px; width: auto; display: inline-block;" class="img-responsive">
                                                                                </a>
                                                                            </span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">品牌</span>
                                                                            <span class="value"><a href="/brands-admin/brand"> NUOGIC</a></span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">业态</span>
                                                                            <span class="value">女鞋</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">属性</span>
                                                                            <span class="value">国际普通品牌</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">价位</span>
                                                                            <span class="value">中等</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">口碑</span>
                                                                            <span class="value">比较好</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">状态</span>
                                                                            <span class="value" style="display: inline-block; margin-bottom: 2px;"><span class="btn btn-xs btn-info">已生效</span></span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">操作</span>
                                                                            <span class="value">
                                                                                <a href="#" class="btn btn-xs btn-warning" data-tooltip="true" title="Update">
                                                                                    <i class="fa fa-pencil"></i>
                                                                                </a>
                                                                                &nbsp;
                                                                                <a href="#" class="btn btn-danger btn-xs delete-asset" data-tooltip="true" data-toggle="modal" data-content="是否确定删除该品牌 ?" data-title="删除品牌" onclick="return false;">
                                                                                    <i class="fa fa-trash"></i>
                                                                                </a>
                                                                                &nbsp;
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr data-index="1">
                                                                <td colspan="65">
                                                                    <div class="card-views">
                                                                        <div class="card-view ">
                                                                            <input data-index="1" name="btSelectItem" type="checkbox">
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">Logo</span>
                                                                            <span class="value">
                                                                                <a href="/views/assets/base/img/content/brands-admin/greensafe.jpg" data-toggle="lightbox" data-type="image">
                                                                                    <img src="/views/assets/base/img/content/brands-admin/greensafe.jpg" style="max-height: 30px; width: auto; display: inline-block;" class="img-responsive">
                                                                                </a>
                                                                            </span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">品牌</span>
                                                                            <span class="value"><a href="/brands-admin/brand"> Green&Safe</a></span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">业态</span>
                                                                            <span class="value"></span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">属性</span>
                                                                            <span class="value">国际普通品牌</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">价位</span>
                                                                            <span class="value">中等</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">口碑</span>
                                                                            <span class="value">非常好</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">状态</span>
                                                                            <span class="value" style="display: inline-block; margin-bottom: 2px;"><span class="btn btn-xs btn-default">未生效</span></span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">操作</span>
                                                                            <span class="value">
                                                                                <a href="#" class="btn btn-xs btn-warning" data-tooltip="true" title="Update">
                                                                                    <i class="fa fa-pencil"></i>
                                                                                </a>
                                                                                &nbsp;
                                                                                <a href="#" class="btn btn-danger btn-xs delete-asset" data-tooltip="true" data-toggle="modal" data-content="是否确定删除该品牌 ?" data-title="删除品牌" onclick="return false;">
                                                                                    <i class="fa fa-trash"></i>
                                                                                </a>
                                                                                &nbsp;
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr data-index="2">
                                                                <td colspan="65">
                                                                    <div class="card-views">
                                                                        <div class="card-view ">
                                                                            <input data-index="2" name="btSelectItem" type="checkbox">
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">Logo</span>
                                                                            <span class="value">
                                                                                <a href="/views/assets/base/img/content/brands-admin/moge.jpg" data-toggle="lightbox" data-type="image">
                                                                                    <img src="/views/assets/base/img/content/brands-admin/moge.jpg" style="max-height: 30px; width: auto; display: inline-block;" class="img-responsive">
                                                                                </a>
                                                                            </span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">品牌</span>
                                                                            <span class="value"><a href="/brands-admin/brand"> 墨格</a></span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">业态</span>
                                                                            <span class="value"></span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">属性</span>
                                                                            <span class="value">国内普通品牌</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">价位</span>
                                                                            <span class="value">中等</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">口碑</span>
                                                                            <span class="value">比较好</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">状态</span>
                                                                            <span class="value" style="display: inline-block; margin-bottom: 2px;"><span class="btn btn-xs btn-default">未生效</span></span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">操作</span>
                                                                            <span class="value">
                                                                                <a href="#" class="btn btn-xs btn-warning" data-tooltip="true" title="Update">
                                                                                    <i class="fa fa-pencil"></i>
                                                                                </a>
                                                                                &nbsp;
                                                                                <a href="#" class="btn btn-danger btn-xs delete-asset" data-tooltip="true" data-toggle="modal" data-content="是否确定删除该品牌 ?" data-title="删除品牌" onclick="return false;">
                                                                                    <i class="fa fa-trash"></i>
                                                                                </a>
                                                                                &nbsp;
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr data-index="3">
                                                                <td colspan="65">
                                                                    <div class="card-views">
                                                                        <div class="card-view ">
                                                                            <input data-index="3" name="btSelectItem" type="checkbox">
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">Logo</span>
                                                                            <span class="value">
                                                                                <a href="/views/assets/base/img/content/brands-admin/xxhh_club.jpg" data-toggle="lightbox" data-type="image">
                                                                                    <img src="/views/assets/base/img/content/brands-admin/xxhh_club.jpg" style="max-height: 30px; width: auto; display: inline-block;" class="img-responsive">
                                                                                </a>
                                                                            </span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">品牌</span>
                                                                            <span class="value"><a href="/brands-admin/brand"> CLUB  XXHH</a></span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">业态</span>
                                                                            <span class="value"></span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">属性</span>
                                                                            <span class="value">国际普通品牌</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">价位</span>
                                                                            <span class="value">中等</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">口碑</span>
                                                                            <span class="value">比较好</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">状态</span>
                                                                            <span class="value" style="display: inline-block; margin-bottom: 2px;"><span class="btn btn-xs btn-default">未生效</span></span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">操作</span>
                                                                            <span class="value">
                                                                                <a href="#" class="btn btn-xs btn-warning" data-tooltip="true" title="Update">
                                                                                    <i class="fa fa-pencil"></i>
                                                                                </a>
                                                                                &nbsp;
                                                                                <a href="#" class="btn btn-danger btn-xs delete-asset" data-tooltip="true" data-toggle="modal" data-content="是否确定删除该品牌 ?" data-title="删除品牌" onclick="return false;">
                                                                                    <i class="fa fa-trash"></i>
                                                                                </a>
                                                                                &nbsp;
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr data-index="4">
                                                                <td colspan="65">
                                                                    <div class="card-views">
                                                                        <div class="card-view ">
                                                                            <input data-index="4" name="btSelectItem" type="checkbox">
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">Logo</span>
                                                                            <span class="value">
                                                                                <a href="/views/assets/base/img/content/brands-admin/tanglele.jpg" data-toggle="lightbox" data-type="image">
                                                                                    <img src="/views/assets/base/img/content/brands-admin/tanglele.jpg" style="max-height: 30px; width: auto; display: inline-block;" class="img-responsive">
                                                                                </a>
                                                                            </span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">品牌</span>
                                                                            <span class="value"><a href="/brands-admin/brand"> TangLeLe</a></span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">业态</span>
                                                                            <span class="value">儿童育乐</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">属性</span>
                                                                            <span class="value">国内普通品牌</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">价位</span>
                                                                            <span class="value">中等</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">口碑</span>
                                                                            <span class="value">比较好</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">状态</span>
                                                                            <span class="value" style="display: inline-block; margin-bottom: 2px;"><span class="btn btn-xs btn-info">已生效</span></span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">操作</span>
                                                                            <span class="value">
                                                                                <a href="#" class="btn btn-xs btn-warning" data-tooltip="true" title="Update">
                                                                                    <i class="fa fa-pencil"></i>
                                                                                </a>
                                                                                &nbsp;
                                                                                <a href="#" class="btn btn-danger btn-xs delete-asset" data-tooltip="true" data-toggle="modal" data-content="是否确定删除该品牌 ?" data-title="删除品牌" onclick="return false;">
                                                                                    <i class="fa fa-trash"></i>
                                                                                </a>
                                                                                &nbsp;
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr data-index="5">
                                                                <td colspan="65">
                                                                    <div class="card-views">
                                                                        <div class="card-view ">
                                                                            <input data-index="5" name="btSelectItem" type="checkbox">
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">Logo</span>
                                                                            <span class="value">
                                                                                <a href="/views/assets/base/img/content/brands-admin/aita.jpg" data-toggle="lightbox" data-type="image">
                                                                                    <img src="/views/assets/base/img/content/brands-admin/aita.jpg" style="max-height: 30px; width: auto; display: inline-block;" class="img-responsive">
                                                                                </a>
                                                                            </span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">品牌</span>
                                                                            <span class="value"><a href="/brands-admin/brand"> TangLeLe</a></span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">业态</span>
                                                                            <span class="value"></span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">属性</span>
                                                                            <span class="value">国际普通品牌</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">价位</span>
                                                                            <span class="value">中等</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">口碑</span>
                                                                            <span class="value">比较好</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">状态</span>
                                                                            <span class="value" style="display: inline-block; margin-bottom: 2px;"><span class="btn btn-xs btn-default">未生效</span></span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">操作</span>
                                                                            <span class="value">
                                                                                <a href="#" class="btn btn-xs btn-warning" data-tooltip="true" title="Update">
                                                                                    <i class="fa fa-pencil"></i>
                                                                                </a>
                                                                                &nbsp;
                                                                                <a href="#" class="btn btn-danger btn-xs delete-asset" data-tooltip="true" data-toggle="modal" data-content="是否确定删除该品牌 ?" data-title="删除品牌" onclick="return false;">
                                                                                    <i class="fa fa-trash"></i>
                                                                                </a>
                                                                                &nbsp;
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr data-index="6">
                                                                <td colspan="65">
                                                                    <div class="card-views">
                                                                        <div class="card-view ">
                                                                            <input data-index="6" name="btSelectItem" type="checkbox">
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">Logo</span>
                                                                            <span class="value">
                                                                            </span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">品牌</span>
                                                                            <span class="value"><a href="/brands-admin/brand"> 卤丁制物</a></span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">业态</span>
                                                                            <span class="value">小型餐饮&咖啡店</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">属性</span>
                                                                            <span class="value">国内普通品牌</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">价位</span>
                                                                            <span class="value">中等</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">口碑</span>
                                                                            <span class="value">比较好</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">状态</span>
                                                                            <span class="value" style="display: inline-block; margin-bottom: 2px;"><span class="btn btn-xs btn-info">已生效</span></span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">操作</span>
                                                                            <span class="value">
                                                                                <a href="#" class="btn btn-xs btn-warning" data-tooltip="true" title="Update">
                                                                                    <i class="fa fa-pencil"></i>
                                                                                </a>
                                                                                &nbsp;
                                                                                <a href="#" class="btn btn-danger btn-xs delete-asset" data-tooltip="true" data-toggle="modal" data-content="是否确定删除该品牌 ?" data-title="删除品牌" onclick="return false;">
                                                                                    <i class="fa fa-trash"></i>
                                                                                </a>
                                                                                &nbsp;
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr data-index="7">
                                                                <td colspan="65">
                                                                    <div class="card-views">
                                                                        <div class="card-view ">
                                                                            <input data-index="7" name="btSelectItem" type="checkbox">
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">Logo</span>
                                                                            <span class="value">
                                                                                <a href="/views/assets/base/img/content/brands-admin/hemliv.jpg" data-toggle="lightbox" data-type="image">
                                                                                    <img src="/views/assets/base/img/content/brands-admin/hemliv.jpg" style="max-height: 30px; width: auto; display: inline-block;" class="img-responsive">
                                                                                </a>
                                                                            </span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">品牌</span>
                                                                            <span class="value"><a href="/brands-admin/brand"> HEMLIV</a></span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">业态</span>
                                                                            <span class="value"></span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">属性</span>
                                                                            <span class="value">国际普通品牌</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">价位</span>
                                                                            <span class="value">中等</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">口碑</span>
                                                                            <span class="value">比较好</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">状态</span>
                                                                            <span class="value" style="display: inline-block; margin-bottom: 2px;"><span class="btn btn-xs btn-default">未生效</span></span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">操作</span>
                                                                            <span class="value">
                                                                                <a href="#" class="btn btn-xs btn-warning" data-tooltip="true" title="Update">
                                                                                    <i class="fa fa-pencil"></i>
                                                                                </a>
                                                                                &nbsp;
                                                                                <a href="#" class="btn btn-danger btn-xs delete-asset" data-tooltip="true" data-toggle="modal" data-content="是否确定删除该品牌 ?" data-title="删除品牌" onclick="return false;">
                                                                                    <i class="fa fa-trash"></i>
                                                                                </a>
                                                                                &nbsp;
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr data-index="8">
                                                                <td colspan="65">
                                                                    <div class="card-views">
                                                                        <div class="card-view ">
                                                                            <input data-index="8" name="btSelectItem" type="checkbox">
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">Logo</span>
                                                                            <span class="value">
                                                                                <a href="/views/assets/base/img/content/brands-admin/action.jpg" data-toggle="lightbox" data-type="image">
                                                                                    <img src="/views/assets/base/img/content/brands-admin/action.jpg" style="max-height: 30px; width: auto; display: inline-block;" class="img-responsive">
                                                                                </a>
                                                                            </span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">品牌</span>
                                                                            <span class="value"><a href="/brands-admin/brand"> 乐尚轮滑</a></span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">业态</span>
                                                                            <span class="value"></span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">属性</span>
                                                                            <span class="value">国内普通品牌</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">价位</span>
                                                                            <span class="value">中等</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">口碑</span>
                                                                            <span class="value">比较好</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">状态</span>
                                                                            <span class="value" style="display: inline-block; margin-bottom: 2px;"><span class="btn btn-xs btn-default">未生效</span></span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">操作</span>
                                                                            <span class="value">
                                                                                <a href="#" class="btn btn-xs btn-warning" data-tooltip="true" title="Update">
                                                                                    <i class="fa fa-pencil"></i>
                                                                                </a>
                                                                                &nbsp;
                                                                                <a href="#" class="btn btn-danger btn-xs delete-asset" data-tooltip="true" data-toggle="modal" data-content="是否确定删除该品牌 ?" data-title="删除品牌" onclick="return false;">
                                                                                    <i class="fa fa-trash"></i>
                                                                                </a>
                                                                                &nbsp;
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr data-index="9">
                                                                <td colspan="65">
                                                                    <div class="card-views">
                                                                        <div class="card-view ">
                                                                            <input data-index="9" name="btSelectItem" type="checkbox">
                                                                        </div>
                                                                        <div class="card-view">
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">品牌</span>
                                                                            <span class="value"><a href="/brands-admin/brand"> PONHU</a></span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">业态</span>
                                                                            <span class="value"></span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">属性</span>
                                                                            <span class="value">国际普通品牌</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">价位</span>
                                                                            <span class="value">中等</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">口碑</span>
                                                                            <span class="value">比较好</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">状态</span>
                                                                            <span class="value" style="display: inline-block; margin-bottom: 2px;"><span class="btn btn-xs btn-default">未生效</span></span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">操作</span>
                                                                            <span class="value">
                                                                                <a href="#" class="btn btn-xs btn-warning" data-tooltip="true" title="Update">
                                                                                    <i class="fa fa-pencil"></i>
                                                                                </a>
                                                                                &nbsp;
                                                                                <a href="#" class="btn btn-danger btn-xs delete-asset" data-tooltip="true" data-toggle="modal" data-content="是否确定删除该品牌 ?" data-title="删除品牌" onclick="return false;">
                                                                                    <i class="fa fa-trash"></i>
                                                                                </a>
                                                                                &nbsp;
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>

                                                <div class="fixed-table-pagination">
                                                    <div class="pull-left pagination-detail">
                                                        <span class="pagination-info">
                                                            显示 1 到 10 行，共 2245 行
                                                        </span>
                                                        <span class="page-list">
                                                            <span class="btn-group dropdown">
                                                                <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
                                                                    <span class="page-size">10</span>
                                                                    <span class="caret"></span>
                                                                </button>
                                                                <ul class="dropdown-menu" role="menu">
                                                                    <li role="menuitem"><a href="#">10</a></li>
                                                                    <li role="menuitem"><a href="#">20</a></li>
                                                                    <li role="menuitem"><a href="#">30</a></li>
                                                                    <li role="menuitem"><a href="#">50</a></li>
                                                                </ul>
                                                            </span> 行每页
                                                        </span>
                                                    </div>
                                                    <div class="pull-right pagination">
                                                        <ul class="pagination">
                                                            <li class="page-pre">
                                                                <a href="#">上一页</a>
                                                            </li>
                                                            <li class="page-number active">
                                                                <a href="#">1</a>
                                                            </li>
                                                            <li class="page-number">
                                                                <a href="#">2</a>
                                                            </li>
                                                            <li class="page-number">
                                                                <a href="#">3</a>
                                                            </li>
                                                            <li class="page-next">
                                                                <a href="#">下一页</a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="clearfix"></div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </section>

</div>
<?php include 'footer.php'; ?>