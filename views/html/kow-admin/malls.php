<?php
if(isset($_SESSION['lotus_admin_name']) && $_SESSION['lotus_admin_name'] == '马俊') {
    $scripts = $scripts .PHP_EOL. '        <script type="text/javascript" src="/views/assets/base/js/kow-admin/malls-admin.js?t='.date("Y-m-d").'"></script>'.PHP_EOL;
} else {
    $scripts = $scripts .PHP_EOL. '        <script type="text/javascript" src="/views/assets/base/js/kow-admin/malls-admin.js?t='.date("Y-m-d").'"></script>'.PHP_EOL;
}
?>
<?php $_SESSION['record_url'] = 'http://'.$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI']; ?>
<?php include 'sidebar.php'; ?>

<div class="content-wrapper">
    <form id="search-form" class="form-horizontal" role="form" enctype="multipart/form-data">
        <section class="sub-header" style="height: 160px;">
            <h4>
                项目
            </h4>
            <div class="pull-right">
                <a href="/kow-admin/create-mall" class="btn btn-primary btn-sm"><i class="fa fa-plus icon-white"></i> <span class="hidden-xs">创建项目</span></a>
            </div>
            <div class="box-header">
                <div class="box-body">
                    <div class="col-md-12">
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="col-md-4 control-label" style="text-align: right;">状态</label>
                                <div class="col-md-8 col-sm-12" style="text-align: left;">
                                    <select class="select2" id="state" style="width: 100%">
                                        <option value="" selected>全部</option>
                                        <option value="1">使用中</option>
                                        <option value="0">已删除</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="col-md-4 control-label" style="text-align: right;">名称</label>
                                <div class="col-md-8 col-sm-12" style="text-align: left;">
                                    <input class="form-control" id="mallName" type="text"  />
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="col-md-4 control-label" style="text-align: right;">项目所属地</label>
                                <div class="col-md-8 col-sm-12" style="text-align: left;">
                                    <select class="select2" id="cityDistrict" name="cityDistrict" style="width: 100%">
                                        <option value="">未选择</option>
                                        <option value="上海市黄浦区">黄浦区</option>
                                        <option value="上海市徐汇区">徐汇区</option>
                                        <option value="上海市长宁区">长宁区</option>
                                        <option value="上海市静安区">静安区</option>
                                        <option value="上海市普陀区">普陀区</option>
                                        <option value="上海市虹口区">虹口区</option>
                                        <option value="上海市杨浦区">杨浦区</option>
                                        <option value="上海市闵行区">闵行区</option>
                                        <option value="上海市宝山区">宝山区</option>
                                        <option value="上海市嘉定区">嘉定区</option>
                                        <option value="上海市浦东新区">浦东新区</option>
                                        <option value="上海市金山区">金山区</option>
                                        <option value="上海市松江区">松江区</option>
                                        <option value="上海市青浦区">青浦区</option>
                                        <option value="上海市奉贤区">奉贤区</option>
                                        <option value="上海市崇明区">崇明区</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="col-md-4 control-label"></label>
                                <div class="col-md-8 col-sm-12" style="text-align: left;">
                                    <button type="button" class="btn btn-info btn-sm" id="search"><i class="fa fa-search icon-white"></i> <span class="hidden-xs">搜索</span></button>
                                    <button type="button" class="btn btn-default btn-sm" id="clear"><i class="fa fa-times icon-white"></i> <span class="hidden-xs">清除</span></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </form>

    <section class="content" style="margin-top: 210px;">
        <div id="webui">
            <div class="row">
                <div class="col-md-12">
                    <div class="box">
                        <div class="box-body">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="bootstrap-table">
                                        <div class="fixed-table-pagination" style="clear: both;">
                                            <div class="pull-left pagination-detail">
                                                <span class="pagination-info"></span>
                                                <span class="page-list">
                                                    <span class="btn-group dropdown">
                                                        <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
                                                            <span class="page-size">20</span>
                                                            <span class="caret"></span>
                                                        </button>
                                                        <ul class="dropdown-menu" role="menu">
                                                            <li role="menuitem"><a href="/kow-admin/malls?items=10">10</a></li>
                                                            <li role="menuitem"><a href="/kow-admin/malls?items=20">20</a></li>
                                                            <li role="menuitem"><a href="/kow-admin/malls?items=30">30</a></li>
                                                            <li role="menuitem"><a href="/kow-admin/malls?items=50">50</a></li>
                                                        </ul>
                                                    </span> 行每页</span>
                                            </div>
                                            <div class="pull-right pagination">
                                                <ul class="pagination">
                                                    <li class="page-item disabled"><a class="page-link" href="javascript: void(0);">«</a></li>
                                                    <li class="page-item disabled"><a class="page-link pn" href="javascript: void(0);">上一页</a></li>
                                                    <li class="page-item active"><a class="page-link" href="?page=1&amp;items=20">1</a></li>
                                                    <li class="page-item disabled"><a class="page-link pn" href="javascript: void(0);">下一页</a></li>
                                                    <li class="page-item disabled"><a class="page-link" href="javascript: void(0);">»</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div class="fixed-table-container">
                                            <div class="fixed-table-body">
                                                <table class="table table-striped snipe-table table-responsive" style="margin-top: 0; text-align: left;">
                                                    <thead id="assetsListingTable-sticky-header">
                                                        <tr>
                                                            <th>
                                                                <div class="th-inner">项目编号</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">名称</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">签约主体</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">区域</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">客流量/日</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">项目面积</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">项目地址</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody id="malls">
                                                        <tr data-index="0">
                                                            <td><a href="/kow-admin/create-mall?id=">KOMALL220506000001</a></td>
                                                            <td>大宁音乐广场</td>
                                                            <td></td>
                                                            <td>静安区</td>
                                                            <td>周中: 2万, 周末: 3万</td>
                                                            <td>145,000m<sup>2</sup></td>
                                                            <td>万荣路777号</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>

                                            <div class="fixed-table-pagination">
                                                <div class="pull-left pagination-detail">
                                                    <span class="pagination-info"></span>
                                                    <span class="page-list">
                                                        <span class="btn-group dropdown">
                                                            <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
                                                                <span class="page-size">20</span>
                                                                <span class="caret"></span>
                                                            </button>
                                                            <ul class="dropdown-menu" role="menu">
                                                                <li role="menuitem"><a href="/kow-admin/malls?items=10">10</a></li>
                                                                <li role="menuitem"><a href="/kow-admin/malls?items=20">20</a></li>
                                                                <li role="menuitem"><a href="/kow-admin/malls?items=30">30</a></li>
                                                                <li role="menuitem"><a href="/kow-admin/malls?items=50">50</a></li>
                                                            </ul>
                                                        </span> 行每页
                                                    </span>
                                                </div>
                                                <div class="pull-right pagination">
                                                    <ul class="pagination">
                                                        <li class="page-item disabled"><a class="page-link" href="javascript: void(0);">«</a></li>
                                                        <li class="page-item disabled"><a class="page-link pn" href="javascript: void(0);">上一页</a></li>
                                                        <li class="page-item active"><a class="page-link" href="?page=1&amp;items=20">1</a></li>
                                                        <li class="page-item disabled"><a class="page-link pn" href="javascript: void(0);">下一页</a></li>
                                                        <li class="page-item disabled"><a class="page-link" href="javascript: void(0);">»</a></li>
                                                    </ul>
                                                </div>
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
    </section>
</div>

<?php include 'footer.php'; ?>