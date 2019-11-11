<?php
$scripts = $scripts . '<script type="text/javascript" src="/views/assets/base/js/brands-admin/levels-admin.js"></script>';
?>
<?php $_SESSION['record_url'] = 'http://'.$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI']; ?>
<?php include 'sidebar.php'; ?>

<div class="content-wrapper">
    <section class="content-header" style="padding-bottom: 30px;">
        <h1  class="pull-left"><span id="floorNo"></span> Dashboard</h1>
    </section>
    
    <section class="content">
        <div class="col-lg-6" id="map_canvas">
            <div id="webui">
                <div class="box box-default" style="overflow-x: auto;">
                    <div class="box-header with-border">
                        <h3 class="box-title">楼层图</h3>
                        <div class="c-label" id="fmap" style="display: inline-block;">
                            <span style="margin-left: 5px; background-color: #7d9fe9; width: 13px; height: 13px; display: inline-block;"></span> 在租 <span id="leased"></span>%
                            <span style="margin-left: 5px; background-color: #FE9E9E; width: 13px; height: 13px; display: inline-block;"></span> 空铺 <span id="empty"></span>%
                            <span style="margin-left: 5px; background-color: #FEED99; width: 13px; height: 13px; display: inline-block;"></span> 待租 <span id="to_be_lease"></span>%
                            <span style="margin-left: 5px; background-color: #D5C8AA; width: 13px; height: 13px; display: inline-block;"></span> 改造 <span id="renovation"></span>%
                        </div>
                        <div class="box-tools pull-right">
                            <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
                            </button>
                        </div>
                    </div>
                    <div class="box-body">
                        <div class="row">
                            <div class="form-group">
                                <div class="c-content-panel" style="background-color: transparent;">
                                    <div class="c-body" style="position: relative;">
                                        <div style="position: absolute;top: 0;left: 15px; z-index: 1;">
                                            <button id="zoom_in" class="btn btn-sm btn-default" style="display: block;">
                                                <i class="fa fa-plus"></i>
                                            </button>
                                            <button id="zoom_out" class="btn btn-sm btn-default" style="display: block;">
                                                <i class="fa fa-minus"></i>
                                            </button>
                                        </div>
                                        <img src="#" class="img-responsive" usemap="" id="map" />
                                        <map name="" id=""></map>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-lg-6">
            <div class="box box-default">
                <div class="box-header with-border">
                    <h3 class="box-title">铺位列表</h3>
                    <div class="box-tools pull-right">
                        <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
                        </button>
                    </div>
                </div>
                <div class="box-body">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="bootstrap-table">
                                <div class="fixed-table-container table-no-bordered">
                                    <div class="fixed-table-body" style="max-height: 70vh;">
                                        <table class="table table-striped snipe-table table-responsive table-no-bordered">
                                            <thead id="assetsListingTable-sticky-header">
                                                <tr>
                                                    <th>
                                                        <div class="th-inner">铺位号</div>
                                                        <div class="fht-cell"></div>
                                                    </th>
                                                    <th>
                                                        <div class="th-inner">面积</div>
                                                        <div class="fht-cell"></div>
                                                    </th>
                                                    <th>
                                                        <div class="th-inner">现存品牌</div>
                                                        <div class="fht-cell"></div>
                                                    </th>
                                                    <th>
                                                        <div class="th-inner">新品牌</div>
                                                        <div class="fht-cell"></div>
                                                    </th>
                                                    <th>
                                                        <div class="th-inner">业态</div>
                                                        <div class="fht-cell"></div>
                                                    </th>
                                                    <th>
                                                        <div class="th-inner">确认时间</div>
                                                        <div class="fht-cell"></div>
                                                    </th>
                                                    <th>
                                                        <div class="th-inner">签约时间</div>
                                                        <div class="fht-cell"></div>
                                                    </th>
                                                    <th>
                                                        <div class="th-inner">围挡时间</div>
                                                        <div class="fht-cell"></div>
                                                    </th>
                                                    <th>
                                                        <div class="th-inner">进场时间</div>
                                                        <div class="fht-cell"></div>
                                                    </th>
                                                    <th>
                                                        <div class="th-inner">开业时间</div>
                                                        <div class="fht-cell"></div>
                                                    </th>
                                                    <th>
                                                        <div class="th-inner">备注</div>
                                                        <div class="fht-cell"></div>
                                                    </th>
                                                    <th>
                                                        <div class="th-inner">责任人</div>
                                                        <div class="fht-cell"></div>
                                                    </th>
                                                    <th>
                                                        <div class="th-inner">业绩预估</div>
                                                        <div class="fht-cell"></div>
                                                    </th>
                                                    <th>
                                                        <div class="th-inner">预估扣点</div>
                                                        <div class="fht-cell"></div>
                                                    </th>
                                                    <th>
                                                        <div class="th-inner">倒推月租金</div>
                                                        <div class="fht-cell"></div>
                                                    </th>
                                                    <th>
                                                        <div class="th-inner">倒推租金单价</div>
                                                        <div class="fht-cell"></div>
                                                    </th>
                                                    <th>
                                                        <div class="th-inner">保底租金单价</div>
                                                        <div class="fht-cell"></div>
                                                    </th>
                                                    <th>
                                                        <div class="th-inner">保底月租金</div>
                                                        <div class="fht-cell"></div>
                                                    </th>
                                                    <th>
                                                        <div class="th-inner">取高月租金</div>
                                                        <div class="fht-cell"></div>
                                                    </th>
                                                    <th>
                                                        <div class="th-inner">取高日租金</div>
                                                        <div class="fht-cell"></div>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody id="levelShopList"></tbody>
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
    </section>
</div>

<?php include ('footer.php'); ?>