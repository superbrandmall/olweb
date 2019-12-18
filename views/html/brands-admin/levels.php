<?php
$scripts = $scripts . '<script src="/views/assets/base/js/brands-admin/levels-admin.js" type="text/javascript"></script>'
    . '<script src="/views/assets/plugins/datepicker/bootstrap-datepicker.min.js" type="text/javascript"></script>'
    . '<script src="/views/assets/plugins/datepicker/bootstrap-datepicker.zh-CN.min.js" type="text/javascript"></script>';
?>
<link href="/views/assets/plugins/datepicker/bootstrap-datepicker.css" rel="stylesheet" type="text/css" media="all" />

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
                            <span style="margin-left: 5px; background-image: linear-gradient(#becff4, #7d9fe9); width: 13px; height: 13px; display: inline-block;"></span> 在租 <span id="leased"></span>%
                            <span style="margin-left: 5px; background-image: linear-gradient(#fecece, #FE9E9E); width: 13px; height: 13px; display: inline-block;"></span> 空铺 <span id="empty"></span>%
                            <span style="margin-left: 5px; background-image: linear-gradient(#fef6cc, #FEED99); width: 13px; height: 13px; display: inline-block;"></span> 待租 <span id="to_be_lease"></span>%
                            <span style="margin-left: 5px; background-image: linear-gradient(#eae3d4, #D5C8AA); width: 13px; height: 13px; display: inline-block;"></span> 改造 <span id="renovation"></span>%
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
        <div class="col-lg-3 hidden-xs">
            <div class="box box-default">
                <div class="box-header with-border">
                    <h3 class="box-title">VR全景</h3>
                    <div class="box-tools pull-right">
                        <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
                        </button>
                    </div>
                </div>
                <div class="box-body">
                    <div id="store_img_2" class="embed-responsive embed-responsive-4by3" style="height: 100%;">
                        <img src="/views/assets/base/img/content/mall/shanghai-sbm.jpg" class="img-responsive" alt="">
                    </div>

                    <div id="store_vr" class="embed-responsive embed-responsive-4by3" style="display: none; height: 287px;">
                        <iframe class="embed-responsive-item" src="#" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-lg-3 hidden-xs">
            <div class="box box-default">
                <div class="box-header with-border">
                    <h3 class="box-title">店铺图片</h3>
                    <div class="box-tools pull-right">
                        <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
                        </button>
                    </div>
                </div>
                <div class="box-body">
                    <div id="store_img" class="embed-responsive embed-responsive-4by3" style="height: 100%;">
                        <img src="/views/assets/base/img/content/mall/shanghai-sbm.jpg" class="img-responsive" alt="">
                    </div>
                </div>
            </div>
        </div>
        <div class="col-lg-12">
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
                                    <div class="fixed-table-body" style="max-height: 715px;">
                                        <table class="table table-striped snipe-table table-responsive table-no-bordered" data-show-columns="true">
                                            <thead class="hidden-xs">
                                                <tr>
                                                    <th style="position: relative; background-image: linear-gradient(#AEAEB2, #6C6C70); color: #fff; z-index: 5;">
                                                        <div class="th-inner">铺位号</div>
                                                        <div class="fht-cell"></div>
                                                    </th>
                                                    <th style="position: relative; background-image: linear-gradient(#AEAEB2, #6C6C70); color: #fff; z-index: 5;">
                                                        <div class="th-inner">面积</div>
                                                        <div class="fht-cell"></div>
                                                    </th>
                                                    <th style="position: relative;  background-image: linear-gradient(#AEAEB2, #6C6C70); color: #fff; z-index: 5;">
                                                        <div class="th-inner">原品牌</div>
                                                        <div class="fht-cell"></div>
                                                    </th>
                                                    <th style="position: relative; background-image: linear-gradient(#AEAEB2, #6C6C70); color: #fff; z-index: 3;">
                                                        <div class="th-inner">新品牌</div>
                                                        <div class="fht-cell"></div>
                                                    </th>
                                                    <th style="position: relative; background-image: linear-gradient(#AEAEB2, #6C6C70); color: #fff; z-index: 3;">
                                                        <div class="th-inner">业态</div>
                                                        <div class="fht-cell"></div>
                                                    </th>
                                                    <th style="position: relative; background-image: linear-gradient(#AEAEB2, #6C6C70); color: #fff; z-index: 3;">
                                                        <div class="th-inner">确认时间</div>
                                                        <div class="fht-cell"></div>
                                                    </th>
                                                    <th style="position: relative; background-image: linear-gradient(#AEAEB2, #6C6C70); color: #fff; z-index: 3;">
                                                        <div class="th-inner">签约时间</div>
                                                        <div class="fht-cell"></div>
                                                    </th>
                                                    <th style="position: relative; background-image: linear-gradient(#AEAEB2, #6C6C70); color: #fff; z-index: 3;">
                                                        <div class="th-inner">围挡时间</div>
                                                        <div class="fht-cell"></div>
                                                    </th>
                                                    <th style="position: relative; background-image: linear-gradient(#AEAEB2, #6C6C70); color: #fff; z-index: 3;">
                                                        <div class="th-inner">进场时间</div>
                                                        <div class="fht-cell"></div>
                                                    </th>
                                                    <th style="position: relative; background-image: linear-gradient(#AEAEB2, #6C6C70); color: #fff; z-index: 3;">
                                                        <div class="th-inner">开业时间</div>
                                                        <div class="fht-cell"></div>
                                                    </th>
                                                    <th style="position: relative; background-image: linear-gradient(#AEAEB2, #6C6C70); color: #fff; z-index: 3;">
                                                        <div class="th-inner">备注</div>
                                                        <div class="fht-cell"></div>
                                                    </th>
                                                    <th style="position: relative; background-image: linear-gradient(#AEAEB2, #6C6C70); color: #fff; z-index: 3;">
                                                        <div class="th-inner">责任人</div>
                                                        <div class="fht-cell"></div>
                                                    </th>
                                                    <th style="position: relative; background-image: linear-gradient(#30DB5B, #248A3D); color: #fff; z-index: 3;">
                                                        <div class="th-inner">业绩预估</div>
                                                        <div class="fht-cell"></div>
                                                    </th>
                                                    <th style="position: relative; background-image: linear-gradient(#30DB5B, #248A3D); color: #fff; z-index: 3;">
                                                        <div class="th-inner">预估扣点</div>
                                                        <div class="fht-cell"></div>
                                                    </th>
                                                    <th style="position: relative; background-image: linear-gradient(#30DB5B, #248A3D); color: #fff; z-index: 3;">
                                                        <div class="th-inner">倒推月租金</div>
                                                        <div class="fht-cell"></div>
                                                    </th>
                                                    <th style="position: relative; background-image: linear-gradient(#30DB5B, #248A3D); color: #fff; z-index: 3;">
                                                        <div class="th-inner">倒推租金单价</div>
                                                        <div class="fht-cell"></div>
                                                    </th>
                                                    <th style="position: relative; background-image: linear-gradient(#409CFF, #0040DD); color: #fff; z-index: 3;">
                                                        <div class="th-inner">保底租金单价</div>
                                                        <div class="fht-cell"></div>
                                                    </th>
                                                    <th style="position: relative; background-image: linear-gradient(#409CFF, #0040DD); color: #fff; z-index: 3;">
                                                        <div class="th-inner">保底月租金</div>
                                                        <div class="fht-cell"></div>
                                                    </th>
                                                    <th style="position: relative; background-image: linear-gradient(#409CFF, #0040DD); color: #fff; z-index: 3;">
                                                        <div class="th-inner">取高月租金</div>
                                                        <div class="fht-cell"></div>
                                                    </th>
                                                    <th style="position: relative; background-image: linear-gradient(#409CFF, #0040DD); color: #fff; z-index: 3;">
                                                        <div class="th-inner">取高日租金</div>
                                                        <div class="fht-cell"></div>
                                                    </th>
                                                    <th style="position: relative; background-image: linear-gradient(#409CFF, #0040DD); color: #fff; z-index: 3;">
                                                        <div class="th-inner">保存</div>
                                                        <div class="fht-cell"></div>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody id="levelShopListL" class="hidden-xs"></tbody>
                                            <tbody id="levelShopListS" class="hidden-sm hidden-md hidden-lg"></tbody>
                                            <tbody id="levelShopList2" style="display: none;"></tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div class="clearfix"></div>
                        </div>
                        <div class="col-md-12 text-center hidden-xs" style="padding-top: 10px;">
                            <a id="view_all" href="javascript: void(0);" class="btn btn-primary btn-sm" style="width: 100%">查看全部</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>

<?php include ('footer.php'); ?>