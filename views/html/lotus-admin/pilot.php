<?php
$scripts = $scripts . '<script src="/views/assets/base/js/lotus-admin/pilot-admin.js" type="text/javascript"></script>'
    . '<script src="/views/assets/plugins/fengniao_SDK_v3.0.6_Lib/fengmap.core.min.js" type="text/javascript"></script>';
?>

<?php $_SESSION['record_url'] = 'http://'.$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI']; ?>
<?php include 'sidebar.php'; ?>

<div class="content-wrapper" style="overflow: hidden;">
    <section class="content-header">
        <h1  class="pull-left"><span id="mallName"></span> <span id="floorNo"></span></h1>
    </section>
    
    <section class="content">
        <div class="col-lg-12" id="map_canvas">
            <div id="webui">
                <div class="box box-default" style="overflow: auto;">
                    <div class="box-header with-border">
                        <h3 class="box-title">楼层图</h3>
                        <div class="c-label" id="fmap" style="display: inline-block;">
                            <span style="margin-left: 5px; background-color: #d3fdd9; width: 13px; height: 13px; display: inline-block;"></span> 在租 <span id="leased"></span>%
                            <span style="margin-left: 5px; background-color: #ff2700; width: 13px; height: 13px; display: inline-block;"></span> 空铺 <span id="empty"></span>%
                        </div>
                    </div>
                    <div class="box-body">
                        <div class="row">
                            <div class="form-group">
                                <div class="c-content-panel">
                                    <div class="c-body">
                                        <!-- 加载地图容器 -->
                                        <div id="fengMap"></div>
                                        
                                        <!--楼层切换组件-->
                                        <div id="btnsFloor" class="btnsFloor">
                                            <!--多层/单层切换按钮-->
                                            <span onClick="changeViews(this)"></span>
                                            <!--楼层数据-->
                                            <ul id="floors"></ul>
                                        </div>
                                        <!--工具控件，2D/3D切换-->
                                        <div id="btnsSwitch" class="btnsSwitch">
                                            <span onClick="changeMode(this)"></span>
                                        </div>
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

<div class="modal fade" id="shop_detail" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content c-square">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="col-md-4">
                    <div class="form-group" id="store_img" style="margin-top: 15px;"></div>
                </div>
                
                <div class="col-md-4 col-xs-6">
                    <div class="form-group" id="contractName"></div>
                    <div class="form-group">
                        <span class="control-label">合同类型:</span>
                        <strong id="contractType" class="control-label"></strong>
                    </div>
                    <div class="form-group">
                        <span class="control-label">商户名称:</span>
                        <strong id="tenantName" class="control-label"></strong>
                    </div>
                    <div class="form-group">
                        <span class="control-label">一级业态:</span>
                        <strong id="modality1" class="control-label"></strong>
                    </div>
                    <div class="form-group">
                        <span class="control-label">二级业态:</span>
                        <strong id="modality2" class="control-label"></strong>
                    </div>
                    <div class="form-group">
                        <span class="control-label">三级业态:</span>
                        <strong id="modality3" class="control-label"></strong>
                    </div>
                </div>
                
                <div class="col-md-4 col-xs-6">
                    <div class="form-group">
                        <span class="control-label">门牌号:</span>
                        <strong id="unitName" class="control-label"></strong>
                    </div>
                    <div class="form-group">
                        <span class="control-label">位置代码:</span>
                        <strong id="unitCode" class="control-label"></strong>
                    </div>
                    <div class="form-group">
                        <span class="control-label">楼层:</span>
                        <strong id="floorName" class="control-label"></strong>
                    </div>
                    <div class="form-group">
                        <span class="control-label">合同面积:</span>
                        <strong id="unitArea" class="control-label"></strong>
                    </div>
                    <div class="form-group">
                        <span class="control-label">合同起始日:</span>
                        <strong id="startDate" class="control-label"></strong>
                    </div>
                    <div class="form-group">
                        <span class="control-label">合同终止日:</span>
                        <strong id="endDate" class="control-label"></strong>
                    </div>
                </div>
                
                <div class="col-md-12" style="clear: both;">
                    <div class="box">
                        <div class="box-body">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="bootstrap-table">
                                        <div class="fixed-table-container table-no-bordered">
                                            <div class="fixed-table-body">
                                                <table class="table table-striped snipe-table table-responsive table-no-bordered" style="margin-top: 0">
                                                    <thead id="assetsListingTable-sticky-header" class="hidden-xs">
                                                        <tr>
                                                            <th>
                                                            </th>
                                                            <th>
                                                                预算指标
                                                            </th>
                                                            <th>
                                                                本合同
                                                            </th>
                                                            <th>
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody id="comparisonL" class="hidden-xs">
                                                        <tr><td>合同总收入(A+B+C)(元)</td><td class="figure">0</td><td id="totalAmount" class="figure"></td><td id="totalAmountGrade">--</td></tr>
                                                        <tr><td>(A)固定租金(元)</td><td id="B011" class="figure">0</td><td id="B011_amount" class="figure"></td><td id="B011_grade">--</td></tr>
                                                        <tr><td>(B)物业管理费(元)</td><td id="B021" class="figure">0</td><td id="B021_amount" class="figure"></td><td id="B021_grade">--</td></tr>
                                                        <tr><td>(C)比率推广费(%)</td><td id="G021" class="figure">0</td><td id="G021_amount" class="figure"></td><td id="G021_grade">--</td></tr>
                                                        <tr><td>(C)固定推广费(元)</td><td id="G011" class="figure">0</td><td id="G011_amount" class="figure"></td><td id="G011_grade">--</td></tr>
                                                        <tr><td>提成扣率(%)</td><td id="D011" class="figure">0</td><td id="D011_amount" class="figure"></td><td id="D011_grade">--</td></tr>
                                                        <tr><td>保证金(元)</td><td id="E02" class="figure">0</td><td id="E02_amount" class="figure"></td><td id="E02_grade">--</td></tr>
                                                        <tr><td>日坪效(元/㎡/天)</td><td class="figure">0</td><td id="totalAmountDay" class="figure"></td><td id="totalAmountDayGrade">--</td></tr>
                                                    </tbody>
                                                    <tbody id="comparisonS" class="hidden-sm hidden-md hidden-lg"></tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                
                <!--<div class="col-md-12" style="clear: both;">
                    <div class="box">
                        <div class="box-body">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="bootstrap-table">
                                        <div class="fixed-table-container table-no-bordered">
                                            <div class="fixed-table-body">
                                                <table class="table table-striped snipe-table table-responsive table-no-bordered" style="margin-top: 0">
                                                    <thead id="assetsListingTable-sticky-header" class="hidden-xs">
                                                        <tr>
                                                            <th>
                                                                <div class="th-inner" style="width: 100px;"></div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">Budget Start Date<br>预算起始日</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">Budget End Date<br>预算结束日</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">January<br>一月(元)</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">February<br>二月(元)</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">March<br>三月(元)</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">April<br>四月(元)</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">May<br>五月(元)</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">June<br>六月(元)</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">July<br>七月(元)</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">August<br>八月(元)</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">September<br>九月(元)</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">October<br>十月(元)</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">November<br>十一月(元)</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">December<br>十二月(元)</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody id="budgetL" class="hidden-xs"></tbody>
                                                    <tbody id="budgetS" class="hidden-sm hidden-md hidden-lg"></tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>-->
            </div>
        </div>
    </div>
</div>

<?php include ('footer.php'); ?>