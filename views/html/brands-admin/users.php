<?php include 'sidebar.php'; ?>

<div class="content-wrapper">
    <section class="content-header" style="padding-bottom: 30px;">
        <h1 class="pull-left">
            招商专员
        </h1>
        <div class="pull-right">
            <a href="#" style="margin-right: 5px;" class="btn btn-default">
                导出本地</a>
        </div>
    </section>

    <section class="content">
        <div id="webui">
            <div class="row">
                <div class="col-md-12">
                    <div class="box">
                        <div class="box-body">
                            <form class="form-inline" id="bulkForm">
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="bootstrap-table">
                                            <div class="fixed-table-toolbar">
                                                <div class="bs-bars pull-left">
                                                    <div class="search">
                                                        <input class="form-control" type="text" placeholder="搜索">
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="fixed-table-pagination" style="clear: both;">
                                                <div class="pull-left pagination-detail">
                                                    <span class="pagination-info">显示 1 到 10 行，共 14 行</span>
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
                                                                    <div class="th-inner">姓名</div>
                                                                    <div class="fht-cell"></div>
                                                                </th>
                                                                <th>
                                                                    <div class="th-inner">性别</div>
                                                                    <div class="fht-cell"></div>
                                                                </th>
                                                                <th>
                                                                    <div class="th-inner">部门</div>
                                                                    <div class="fht-cell"></div>
                                                                </th>
                                                                <th>
                                                                    <div class="th-inner">职位</div>
                                                                    <div class="fht-cell"></div>
                                                                </th>
                                                                <th>
                                                                    <div class="th-inner">Email</div>
                                                                    <div class="fht-cell"></div>
                                                                </th>
                                                                <th>
                                                                    <div class="th-inner">Admin</div>
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
                                                                <td><a href="#"> 罗真龙</a></td>
                                                                <td>
                                                                    男
                                                                </td>
                                                                <td>
                                                                    Kids
                                                                </td>
                                                                <td>租赁经理</td>
                                                                <td>
                                                                    zhenlong.luo@superbrandmall.com
                                                                </td>
                                                                <td>
                                                                    <i class="fa fa-times text-danger"></i>
                                                                </td>
                                                                <td>

                                                                    <a href="#" class="btn btn-sm btn-warning" data-tooltip="true" title="Update">
                                                                        <i class="fa fa-pencil"></i>
                                                                    </a>
                                                                    &nbsp;
                                                                    <a class="btn btn-danger btn-sm delete-asset disabled" onclick="return false;"><i class="fa fa-trash"></i></a>
                                                                    &nbsp;

                                                                </td>
                                                            </tr>


                                                            <tr data-index="1">
                                                                <td class="bs-checkbox">
                                                                    <input data-index="1" name="btSelectItem" type="checkbox">
                                                                </td>
                                                                <td><a href="#"> 蒋晟</a></td>
                                                                <td>
                                                                    男
                                                                </td>
                                                                <td>
                                                                    F&B Chinese
                                                                </td>
                                                                <td>租赁总经理-F&B</td>
                                                                <td>
                                                                    sheng.jiang@superbrandmall.com
                                                                </td>
                                                                <td>
                                                                    <i class="fa fa-check text-success"></i>
                                                                </td>
                                                                <td>
                                                                    <a href="#" class="btn btn-sm btn-warning" data-tooltip="true" title="Update">
                                                                        <i class="fa fa-pencil"></i>
                                                                    </a>
                                                                    &nbsp;
                                                                    <a class="btn btn-danger btn-sm delete-asset disabled" onclick="return false;"><i class="fa fa-trash"></i></a>
                                                                    &nbsp;
                                                                </td>
                                                            </tr>

                                                            <tr data-index="2">
                                                                <td class="bs-checkbox">
                                                                    <input data-index="2" name="btSelectItem" type="checkbox">
                                                                </td>
                                                                <td><a href="brand.php"> 黄赛男</a></td>
                                                                <td>
                                                                    男
                                                                </td>
                                                                <td>
                                                                    Kids
                                                                </td>
                                                                <td>租赁副总经理</td>
                                                                <td>
                                                                    sainan.huang@superbrandmall.com
                                                                </td>
                                                                <td>
                                                                    <i class="fa fa-times text-danger"></i>
                                                                </td>
                                                                <td>
                                                                    <a href="#" class="btn btn-sm btn-warning" data-tooltip="true" title="Update">
                                                                        <i class="fa fa-pencil"></i>
                                                                    </a>
                                                                    &nbsp;
                                                                    <a class="btn btn-danger btn-sm delete-asset disabled" onclick="return false;"><i class="fa fa-trash"></i></a>
                                                                    &nbsp;
                                                                </td>
                                                            </tr>

                                                            <tr data-index="3">
                                                                <td class="bs-checkbox">
                                                                    <input data-index="3" name="btSelectItem" type="checkbox">
                                                                </td>
                                                                <td><a href="#">程虹</a></td>
                                                                <td>
                                                                    女
                                                                </td>
                                                                <td>
                                                                    Beauty&Wellness
                                                                </td>
                                                                <td>租赁副经理</td>
                                                                <td>
                                                                    hong.cheng@superbrandmall.com
                                                                </td>
                                                                <td>
                                                                    <i class="fa fa-times text-danger"></i>
                                                                </td>
                                                                <td>
                                                                    <a href="#" class="btn btn-sm btn-warning" data-tooltip="true" title="Update">
                                                                        <i class="fa fa-pencil"></i>
                                                                    </a>
                                                                    &nbsp;
                                                                    <a class="btn btn-danger btn-sm delete-asset disabled" onclick="return false;"><i class="fa fa-trash"></i></a>
                                                                    &nbsp;
                                                                </td>
                                                            </tr>

                                                            <tr data-index="4">
                                                                <td class="bs-checkbox">
                                                                    <input data-index="4" name="btSelectItem" type="checkbox">
                                                                </td>
                                                                <td><a href="#">胡益丹</a></td>
                                                                <td>
                                                                    女
                                                                </td>
                                                                <td>
                                                                    Fashion Accessories
                                                                </td>
                                                                <td>租赁副经理</td>
                                                                <td>
                                                                    yidan.hu@superbrandmall.com
                                                                </td>
                                                                <td>
                                                                    <i class="fa fa-times text-danger"></i>
                                                                </td>
                                                                <td>
                                                                    <a href="#" class="btn btn-sm btn-warning" data-tooltip="true" title="Update">
                                                                        <i class="fa fa-pencil"></i>
                                                                    </a>
                                                                    &nbsp;
                                                                    <a class="btn btn-danger btn-sm delete-asset disabled" onclick="return false;"><i class="fa fa-trash"></i></a>
                                                                    &nbsp;
                                                                </td>
                                                            </tr>

                                                            <tr data-index="5">
                                                                <td class="bs-checkbox">
                                                                    <input data-index="5" name="btSelectItem" type="checkbox">
                                                                </td>
                                                                <td><a href="#"> 饶朝阳</a></td>
                                                                <td>
                                                                    男
                                                                </td>
                                                                <td>
                                                                    Entertainment
                                                                </td>
                                                                <td>租赁总经理</td>
                                                                <td>
                                                                    chaoyang.rao@superbrandmall.com
                                                                </td>
                                                                <td>
                                                                    <i class="fa fa-check text-success"></i>
                                                                </td>
                                                                <td>
                                                                    <a href="#" class="btn btn-sm btn-warning" data-tooltip="true" title="Update">
                                                                        <i class="fa fa-pencil"></i>
                                                                    </a>
                                                                    &nbsp;
                                                                    <a class="btn btn-danger btn-sm delete-asset disabled" onclick="return false;"><i class="fa fa-trash"></i></a>
                                                                    &nbsp;
                                                                </td>
                                                            </tr>

                                                            <tr data-index="6">
                                                                <td class="bs-checkbox">
                                                                    <input data-index="6" name="btSelectItem" type="checkbox">
                                                                </td>
                                                                <td><a href="#">崔迪</a></td>
                                                                <td>
                                                                    女
                                                                </td>
                                                                <td>
                                                                    Beauty&Wellness
                                                                </td>
                                                                <td>租赁副总经理</td>
                                                                <td>
                                                                    di.cui@superbrandmall.com
                                                                </td>
                                                                <td>
                                                                    <i class="fa fa-times text-danger"></i>
                                                                </td>
                                                                <td>
                                                                    <a href="#" class="btn btn-sm btn-warning" data-tooltip="true" title="Update">
                                                                        <i class="fa fa-pencil"></i>
                                                                    </a>
                                                                    &nbsp;
                                                                    <a class="btn btn-danger btn-sm delete-asset disabled" onclick="return false;"><i class="fa fa-trash"></i></a>
                                                                    &nbsp;
                                                                </td>
                                                            </tr>

                                                            <tr data-index="7">
                                                                <td class="bs-checkbox">
                                                                    <input data-index="7" name="btSelectItem" type="checkbox">
                                                                </td>
                                                                <td><a href="#">周晓芳</a></td>
                                                                <td>
                                                                    女
                                                                </td>
                                                                <td>
                                                                    Pop-up
                                                                </td>
                                                                <td>租赁副总经理</td>
                                                                <td>
                                                                    xiaofang.zhou@superbrandmall.com
                                                                </td>
                                                                <td>
                                                                    <i class="fa fa-times text-danger"></i>
                                                                </td>
                                                                <td>
                                                                    <a href="#" class="btn btn-sm btn-warning" data-tooltip="true" title="Update">
                                                                        <i class="fa fa-pencil"></i>
                                                                    </a>
                                                                    &nbsp;
                                                                    <a class="btn btn-danger btn-sm delete-asset disabled" onclick="return false;"><i class="fa fa-trash"></i></a>
                                                                    &nbsp;
                                                                </td>
                                                            </tr>

                                                            <tr data-index="8">
                                                                <td class="bs-checkbox">
                                                                    <input data-index="8" name="btSelectItem" type="checkbox">
                                                                </td>
                                                                <td><a href="#">方佳俊</a></td>
                                                                <td>
                                                                    男
                                                                </td>
                                                                <td>
                                                                    Fashion Accessories
                                                                </td>
                                                                <td>租赁经理</td>
                                                                <td>
                                                                    jiajun.fang@superbrandmall.com
                                                                </td>
                                                                <td>
                                                                    <i class="fa fa-times text-danger"></i>
                                                                </td>
                                                                <td>
                                                                    <a href="#" class="btn btn-sm btn-warning" data-tooltip="true" title="Update">
                                                                        <i class="fa fa-pencil"></i>
                                                                    </a>
                                                                    &nbsp;
                                                                    <a class="btn btn-danger btn-sm delete-asset disabled" onclick="return false;"><i class="fa fa-trash"></i></a>
                                                                    &nbsp;
                                                                </td>
                                                            </tr>

                                                            <tr data-index="9">
                                                                <td class="bs-checkbox">
                                                                    <input data-index="9" name="btSelectItem" type="checkbox">
                                                                </td>
                                                                <td><a href="#">冰淼</a></td>
                                                                <td>
                                                                    女
                                                                </td>
                                                                <td>
                                                                    Fashion Accessories
                                                                </td>
                                                                <td>租赁副总裁</td>
                                                                <td>
                                                                    miao.bing@superbrandmall.com
                                                                </td>
                                                                <td>
                                                                    <i class="fa fa-check text-success"></i>
                                                                </td>
                                                                <td>
                                                                    <a href="#" class="btn btn-sm btn-warning" data-tooltip="true" title="Update">
                                                                        <i class="fa fa-pencil"></i>
                                                                    </a>
                                                                    &nbsp;
                                                                    <a class="btn btn-danger btn-sm delete-asset disabled" onclick="return false;"><i class="fa fa-trash"></i></a>
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
                                                                            <span class="title">姓名</span>
                                                                            <span class="value"><a href="#"> 罗真龙</a></span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">性别</span>
                                                                            <span class="value">男</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">部门</span>
                                                                            <span class="value">Kids</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">职位</span>
                                                                            <span class="value">租赁经理</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">Email</span>
                                                                            <span class="value">zhenlong.luo@superbrandmall.com</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">Admin</span>
                                                                            <span class="value"><i class="fa fa-times text-danger"></i></span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">操作</span>
                                                                            <span class="value">
                                                                                <a href="#" class="btn btn-xs btn-warning" data-tooltip="true" title="Update">
                                                                                    <i class="fa fa-pencil"></i>
                                                                                </a>
                                                                                &nbsp;
                                                                                <a class="btn btn-danger btn-xs delete-asset disabled" onclick="return false;"><i class="fa fa-trash"></i></a>
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
                                                                            <span class="title">姓名</span>
                                                                            <span class="value"><a href="#"> 蒋晟</a></span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">性别</span>
                                                                            <span class="value">男</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">部门</span>
                                                                            <span class="value">F&B Chinese</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">职位</span>
                                                                            <span class="value">租赁总经理-F&B</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">Email</span>
                                                                            <span class="value">sheng.jiang@superbrandmall.com</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">Admin</span>
                                                                            <span class="value"><i class="fa fa-check text-success"></i></span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">操作</span>
                                                                            <span class="value">
                                                                                <a href="#" class="btn btn-xs btn-warning" data-tooltip="true" title="Update">
                                                                                    <i class="fa fa-pencil"></i>
                                                                                </a>
                                                                                &nbsp;
                                                                                <a class="btn btn-danger btn-xs delete-asset disabled" onclick="return false;"><i class="fa fa-trash"></i></a>
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
                                                                            <span class="title">姓名</span>
                                                                            <span class="value"><a href="#"> 黄赛男</a></span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">性别</span>
                                                                            <span class="value">男</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">部门</span>
                                                                            <span class="value">Kids</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">职位</span>
                                                                            <span class="value">租赁副总经理</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">Email</span>
                                                                            <span class="value">sainan.huang@superbrandmall.com</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">Admin</span>
                                                                            <span class="value"><i class="fa fa-times text-danger"></i></span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">操作</span>
                                                                            <span class="value">
                                                                                <a href="#" class="btn btn-xs btn-warning" data-tooltip="true" title="Update">
                                                                                    <i class="fa fa-pencil"></i>
                                                                                </a>
                                                                                &nbsp;
                                                                                <a class="btn btn-danger btn-xs delete-asset disabled" onclick="return false;"><i class="fa fa-trash"></i></a>
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
                                                                            <span class="title">姓名</span>
                                                                            <span class="value"><a href="#"> 程虹</a></span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">性别</span>
                                                                            <span class="value">女</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">部门</span>
                                                                            <span class="value">Beauty&Wellness</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">职位</span>
                                                                            <span class="value">租赁副经理</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">Email</span>
                                                                            <span class="value">hong.cheng@superbrandmall.com</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">Admin</span>
                                                                            <span class="value"><i class="fa fa-times text-danger"></i></span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">操作</span>
                                                                            <span class="value">
                                                                                <a href="#" class="btn btn-xs btn-warning" data-tooltip="true" title="Update">
                                                                                    <i class="fa fa-pencil"></i>
                                                                                </a>
                                                                                &nbsp;
                                                                                <a class="btn btn-danger btn-xs delete-asset disabled" onclick="return false;"><i class="fa fa-trash"></i></a>
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
                                                                            <span class="title">姓名</span>
                                                                            <span class="value"><a href="#"> 胡益丹</a></span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">性别</span>
                                                                            <span class="value">女</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">部门</span>
                                                                            <span class="value">Fashion Accessories</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">职位</span>
                                                                            <span class="value">租赁副经理</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">Email</span>
                                                                            <span class="value">yidan.hu@superbrandmall.comm</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">Admin</span>
                                                                            <span class="value"><i class="fa fa-times text-danger"></i></span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">操作</span>
                                                                            <span class="value">
                                                                                <a href="#" class="btn btn-xs btn-warning" data-tooltip="true" title="Update">
                                                                                    <i class="fa fa-pencil"></i>
                                                                                </a>
                                                                                &nbsp;
                                                                                <a class="btn btn-danger btn-xs delete-asset disabled" onclick="return false;"><i class="fa fa-trash"></i></a>
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
                                                                            <span class="title">姓名</span>
                                                                            <span class="value"><a href="#"> 饶朝阳</a></span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">性别</span>
                                                                            <span class="value">男</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">部门</span>
                                                                            <span class="value">Entertainment</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">职位</span>
                                                                            <span class="value">租赁总经理</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">Email</span>
                                                                            <span class="value">chaoyang.rao@superbrandmall.com</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">Admin</span>
                                                                            <span class="value"><i class="fa fa-check text-success"></i></span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">操作</span>
                                                                            <span class="value">
                                                                                <a href="#" class="btn btn-xs btn-warning" data-tooltip="true" title="Update">
                                                                                    <i class="fa fa-pencil"></i>
                                                                                </a>
                                                                                &nbsp;
                                                                                <a class="btn btn-danger btn-xs delete-asset disabled" onclick="return false;"><i class="fa fa-trash"></i></a>
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
                                                                            <span class="title">姓名</span>
                                                                            <span class="value"><a href="#"> 崔迪</a></span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">性别</span>
                                                                            <span class="value">女</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">部门</span>
                                                                            <span class="value">Beauty&Wellness</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">职位</span>
                                                                            <span class="value">租赁副总经理</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">Email</span>
                                                                            <span class="value">di.cui@superbrandmall.com</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">Admin</span>
                                                                            <span class="value"><i class="fa fa-times text-danger"></i></span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">操作</span>
                                                                            <span class="value">
                                                                                <a href="#" class="btn btn-xs btn-warning" data-tooltip="true" title="Update">
                                                                                    <i class="fa fa-pencil"></i>
                                                                                </a>
                                                                                &nbsp;
                                                                                <a class="btn btn-danger btn-xs delete-asset disabled" onclick="return false;"><i class="fa fa-trash"></i></a>
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
                                                                            <span class="title">姓名</span>
                                                                            <span class="value"><a href="#"> 周晓芳</a></span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">性别</span>
                                                                            <span class="value">女</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">部门</span>
                                                                            <span class="value">Pop-up</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">职位</span>
                                                                            <span class="value">租赁副总经理</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">Email</span>
                                                                            <span class="value">xiaofang.zhou@superbrandmall.com</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">Admin</span>
                                                                            <span class="value"><i class="fa fa-times text-danger"></i></span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">操作</span>
                                                                            <span class="value">
                                                                                <a href="#" class="btn btn-xs btn-warning" data-tooltip="true" title="Update">
                                                                                    <i class="fa fa-pencil"></i>
                                                                                </a>
                                                                                &nbsp;
                                                                                <a class="btn btn-danger btn-xs delete-asset disabled" onclick="return false;"><i class="fa fa-trash"></i></a>
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
                                                                            <span class="title">姓名</span>
                                                                            <span class="value"><a href="#"> 方佳俊</a></span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">性别</span>
                                                                            <span class="value">男</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">部门</span>
                                                                            <span class="value">Fashion Accessories</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">职位</span>
                                                                            <span class="value">租赁经理</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">Email</span>
                                                                            <span class="value">jiajun.fang@superbrandmall.com</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">Admin</span>
                                                                            <span class="value"><i class="fa fa-times text-danger"></i></span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">操作</span>
                                                                            <span class="value">
                                                                                <a href="#" class="btn btn-xs btn-warning" data-tooltip="true" title="Update">
                                                                                    <i class="fa fa-pencil"></i>
                                                                                </a>
                                                                                &nbsp;
                                                                                <a class="btn btn-danger btn-xs delete-asset disabled" onclick="return false;"><i class="fa fa-trash"></i></a>
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
                                                                            <span class="title">姓名</span>
                                                                            <span class="value"><a href="#"> 冰淼</a></span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">性别</span>
                                                                            <span class="value">女</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">部门</span>
                                                                            <span class="value">Fashion Accessories</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">职位</span>
                                                                            <span class="value">租赁副总裁</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">Email</span>
                                                                            <span class="value">miao.bing@superbrandmall.com</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">Admin</span>
                                                                            <span class="value"><i class="fa fa-check text-success"></i></span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">操作</span>
                                                                            <span class="value">
                                                                                <a href="#" class="btn btn-xs btn-warning" data-tooltip="true" title="Update">
                                                                                    <i class="fa fa-pencil"></i>
                                                                                </a>
                                                                                &nbsp;
                                                                                <a class="btn btn-danger btn-xs delete-asset disabled" onclick="return false;"><i class="fa fa-trash"></i></a>
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
                                                            显示 1 到 10 行，共 14 行
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