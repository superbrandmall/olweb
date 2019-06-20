<?php
$scripts = $scripts . '<script type="text/javascript" src="/views/assets/base/js/brands-admin/default-admin.js"></script>';
?>

<?php include 'sidebar.php'; ?>

<div class="content-wrapper">
    <section class="content-header" style="padding-bottom: 30px;">
        <h1 class="pull-left">
            Dashboard
        </h1>
        <div class="pull-right"></div>
    </section>

    <section class="content">
        <div id="webui">
            <div class="row">
                <div class="col-lg-3 col-xs-6">
                    <div class="small-box bg-teal">
                        <div class="inner">
                            <h3 id="totalBrands"></h3>
                            <p>所有品牌</p>
                        </div>
                        <div class="icon">
                            <i class="fa fa-asterisk"></i>
                        </div>
                        <a href="/brands-admin/brands" class="small-box-footer">查看详情 <i class="fa fa-arrow-circle-right"></i></a>
                    </div>
                </div>

                <div class="col-lg-3 col-xs-6">
                    <div class="small-box bg-maroon">
                        <div class="inner">
                            <h3 id="ljzRentingNum"></h3>
                            <p>陆家嘴在租品牌</p>
                        </div>
                        <div class="icon">
                            陆
                        </div>
                        <a href="/brands-admin/brands" class="small-box-footer">查看详情 <i class="fa fa-arrow-circle-right"></i></a>
                    </div>
                </div>

                <div class="col-lg-3 col-xs-6">
                    <div class="small-box bg-orange">
                        <div class="inner">
                            <h3 id="lyRentingNum"></h3>
                            <p>洛阳在租品牌</p>
                        </div>
                        <div class="icon">
                            洛
                        </div>
                        <a href="/brands-admin/brands" class="small-box-footer">查看详情 <i class="fa fa-arrow-circle-right"></i></a>
                    </div>
                </div>

                <div class="col-lg-3 col-xs-6">
                    <div class="small-box bg-purple">
                        <div class="inner">
                            <h3 id="hfRentingNum"></h3>
                            <p>合肥在租品牌</p>
                        </div>
                        <div class="icon">
                            合
                        </div>
                        <a href="/brands-admin/brands" class="small-box-footer">查看详情 <i class="fa fa-arrow-circle-right"></i></a>
                    </div>
                </div>
            </div>
            
            <div class="row">
                <div class="col-md-6">
                    <div class="box box-default">
                        <div class="box-header with-border">
                            <h3 class="box-title">陆家嘴在租业态分布</h3>
                            <div class="box-tools pull-right">
                                <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
                                </button>
                            </div>
                        </div>

                        <div class="box-body">
                            <div class="row">
                                <div class="col-md-12">
                                    <div style="text-align: center;">
                                        <canvas id="ljzStatusPieChart"></canvas>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-md-6">
                    <div class="box box-default">
                        <div class="box-header with-border">
                            <h3 class="box-title">洛阳在租业态分布</h3>
                            <div class="box-tools pull-right">
                                <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
                                </button>
                            </div>
                        </div>

                        <div class="box-body">
                            <div class="row">
                                <div class="col-md-12">
                                    <div style="text-align: center;">
                                        <canvas id="lyStatusPieChart"></canvas>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="col-md-6">
                    <div class="box box-default">
                        <div class="box-header with-border">
                            <h3 class="box-title">合肥在租业态分布</h3>
                            <div class="box-tools pull-right">
                                <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
                                </button>
                            </div>
                        </div>

                        <div class="box-body">
                            <div class="row">
                                <div class="col-md-12">
                                    <div style="text-align: center;">
                                        <canvas id="hfStatusPieChart"></canvas>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="col-md-6">
                    <div class="box">
                        <div class="box-header with-border">
                            <h3 class="box-title">最近操作</h3>
                            <div class="box-tools pull-right">
                                <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
                                </button>
                            </div>
                        </div>
                        <div class="box-body">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="table-responsive">
                                        <div class="bootstrap-table">
                                            <div class="fixed-table-toolbar"></div>
                                            <div class="fixed-table-container table-no-bordered">
                                                <div class="fixed-table-body">
                                                    <table class="table table-striped snipe-table table-responsive table-no-bordered" style="margin-top: 0;">
                                                        <thead class="hidden-xs">
                                                            <tr>
                                                                <th class="col-sm-3"><div class="th-inner">日期</div><div class="fht-cell"></div></th>
                                                                <th class="col-sm-2"><div class="th-inner">品牌</div><div class="fht-cell"></div></th>
                                                                <th class="col-sm-2"><div class="th-inner">操作</div><div class="fht-cell"></div></th>
                                                                <th class="col-sm-3"><div class="th-inner">业态</div><div class="fht-cell"></div></th>
                                                                <th class="col-sm-2"><div class="th-inner">负责人</div><div class="fht-cell"></div></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody class="hidden-xs">
                                                            <tr data-index="0">
                                                                <td class="col-sm-3" style="">11/06/2019</td>
                                                                <td class="col-sm-2" style=""><a href="/brands-admin/brand"> NUOGIC</a></td>
                                                                <td class="col-sm-2" style="">新增</td>
                                                                <td class="col-sm-3" style="">女鞋</td>
                                                                <td class="col-sm-2" style=""><a href="/brands-admin/user">罗真龙</a></td>
                                                            </tr>
                                                            <tr data-index="1">
                                                                <td class="col-sm-3" style="">04/06/2019</td>
                                                                <td class="col-sm-2" style=""><a href="/brands-admin/brand"> TangLeLe</a></td>
                                                                <td class="col-sm-2" style="">新增</td>
                                                                <td class="col-sm-3" style="">儿童育乐</td>
                                                                <td class="col-sm-2" style=""><a href="/brands-admin/user">程虹</a></td>
                                                            </tr>
                                                            <tr data-index="2">
                                                                <td class="col-sm-3" style="">01/06/2019</td>
                                                                <td class="col-sm-2" style=""><a href="/brands-admin/brand"> 卤丁制物</a></td>
                                                                <td class="col-sm-2" style="">修改</td>
                                                                <td class="col-sm-3" style="">小型餐饮&咖啡店</td>
                                                                <td class="col-sm-2" style=""><a href="/brands-admin/user">林尊德</a></td>
                                                            </tr>
                                                            <tr data-index="3">
                                                                <td class="col-sm-3" style="">30/05/2019</td>
                                                                <td class="col-sm-2" style=""><a href="/brands-admin/brand"> 鼎车堂</a></td>
                                                                <td class="col-sm-2" style="">修改</td>
                                                                <td class="col-sm-3" style="">生活服务</td>
                                                                <td class="col-sm-2" style=""><a href="/brands-admin/user">李晓洁</a></td>
                                                            </tr>
                                                            <tr data-index="4">
                                                                <td class="col-sm-3" style="">30/05/2019</td>
                                                                <td class="col-sm-2" style=""><a href="/brands-admin/brand">岛滋</a></td>
                                                                <td class="col-sm-2" style="">修改</td>
                                                                <td class="col-sm-3" style="">小型餐饮&咖啡店</td>
                                                                <td class="col-sm-2" style=""><a href="/brands-admin/user">徐金韬</a></td>
                                                            </tr>
                                                            <tr data-index="5">
                                                                <td class="col-sm-3" style="">30/05/2019</td>
                                                                <td class="col-sm-2" style=""><a href="/brands-admin/brand">琉璃鲸</a></td>
                                                                <td class="col-sm-2" style="">删除</td>
                                                                <td class="col-sm-3" style="">小型餐饮&咖啡店</td>
                                                                <td class="col-sm-2" style=""><a href="/brands-admin/user">崔迪</a></td>
                                                            </tr>
                                                            <tr data-index="6">
                                                                <td class="col-sm-3" style="">30/05/2019</td>
                                                                <td class="col-sm-2" style=""><a href="/brands-admin/brand">COMELY</a></td>
                                                                <td class="col-sm-2" style="">删除</td>
                                                                <td class="col-sm-3" style="">女鞋</td>
                                                                <td class="col-sm-2" style=""><a href="/brands-admin/user">周晓芳</a></td>
                                                            </tr>
                                                        </tbody>
                                                        <tbody class="hidden-sm hidden-md hidden-lg">
                                                            <tr data-index="0">
                                                                <td colspan="65">
                                                                    <div class="card-views">
                                                                        <div class="card-view">
                                                                            <span class="title">日期</span>
                                                                            <span class="value">
                                                                                11/06/2019
                                                                            </span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">品牌</span>
                                                                            <span class="value"><a href="/brands-admin/brand"> NUOGIC</a></span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">操作</span>
                                                                            <span class="value">新增</</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">业态</span>
                                                                            <span class="value">女鞋</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">负责人</span>
                                                                            <span class="value">罗真龙</span>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr data-index="1">
                                                                <td colspan="65">
                                                                    <div class="card-views">
                                                                        <div class="card-view">
                                                                            <span class="title">日期</span>
                                                                            <span class="value">
                                                                                04/06/2019
                                                                            </span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">品牌</span>
                                                                            <span class="value"><a href="/brands-admin/brand"> TangLeLe</a></span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">操作</span>
                                                                            <span class="value">新增</</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">业态</span>
                                                                            <span class="value">儿童育乐</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">负责人</span>
                                                                            <span class="value">程虹</span>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr data-index="2">
                                                                <td colspan="65">
                                                                    <div class="card-views">
                                                                        <div class="card-view">
                                                                            <span class="title">日期</span>
                                                                            <span class="value">
                                                                                01/06/2019
                                                                            </span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">品牌</span>
                                                                            <span class="value"><a href="/brands-admin/brand"> 卤丁制物</a></span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">操作</span>
                                                                            <span class="value">修改</</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">业态</span>
                                                                            <span class="value">小型餐饮&咖啡店</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">负责人</span>
                                                                            <span class="value">林尊德</span>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr data-index="3">
                                                                <td colspan="65">
                                                                    <div class="card-views">
                                                                        <div class="card-view">
                                                                            <span class="title">日期</span>
                                                                            <span class="value">
                                                                                30/05/2019
                                                                            </span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">品牌</span>
                                                                            <span class="value"><a href="/brands-admin/brand"> 鼎车堂</a></span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">操作</span>
                                                                            <span class="value">修改</</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">业态</span>
                                                                            <span class="value">生活服务</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">负责人</span>
                                                                            <span class="value">李晓洁</span>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr data-index="4">
                                                                <td colspan="65">
                                                                    <div class="card-views">
                                                                        <div class="card-view">
                                                                            <span class="title">日期</span>
                                                                            <span class="value">
                                                                                30/05/2019
                                                                            </span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">品牌</span>
                                                                            <span class="value"><a href="/brands-admin/brand"> 岛滋</a></span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">操作</span>
                                                                            <span class="value">修改</</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">业态</span>
                                                                            <span class="value">小型餐饮&咖啡店</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">负责人</span>
                                                                            <span class="value">徐金韬</span>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr data-index="5">
                                                                <td colspan="65">
                                                                    <div class="card-views">
                                                                        <div class="card-view">
                                                                            <span class="title">日期</span>
                                                                            <span class="value">
                                                                                30/05/2019
                                                                            </span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">品牌</span>
                                                                            <span class="value"><a href="/brands-admin/brand"> 琉璃鲸</a></span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">操作</span>
                                                                            <span class="value">删除</</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">业态</span>
                                                                            <span class="value">小型餐饮&咖啡店</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">负责人</span>
                                                                            <span class="value">崔迪</span>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr data-index="6">
                                                                <td colspan="65">
                                                                    <div class="card-views">
                                                                        <div class="card-view">
                                                                            <span class="title">日期</span>
                                                                            <span class="value">
                                                                                30/05/2019
                                                                            </span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">品牌</span>
                                                                            <span class="value"><a href="/brands-admin/brand"> COMELY</a></span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">操作</span>
                                                                            <span class="value">删除</</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">业态</span>
                                                                            <span class="value">女鞋</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">负责人</span>
                                                                            <span class="value">周晓芳</span>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="clearfix"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>

<?php include 'footer.php'; ?>