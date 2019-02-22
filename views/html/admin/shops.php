<?php
$scripts = $scripts. '<script type="text/javascript" src="/views/assets/base/js/admin/shops-admin.js"></script>';
?>

<div id="wrapper">
    <?php include ('navbar_top.php'); ?>
    <?php include ('navbar_side.php'); ?>
    <div id="page-wrapper">
        <div class="row">
            <div class="col-lg-12">
                <h1 class="page-header">店铺信息管理</h1>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-12">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        店铺信息管理
                    </div>
                    <!-- /.panel-heading -->
                    <div class="panel-body">
                        <div class="table-responsive">
                            <div class="form-inline">
                                <form>
                                    <div class="row">
                                        <div class="col-sm-3">
                                            <label>
                                                项目选择: 
                                                <select id="mall_list" class="form-control input-sm"></select>
                                            </label>
                                        </div>
                                        <div class="col-sm-3">
                                            <label>
                                                门牌号: 
                                                <input id="shop_name" class="form-control input-sm">
                                            </label>
                                        </div>
                                        <div class="col-sm-3">
                                            <label>
                                                单元号: 
                                                <input id="unit" class="form-control input-sm">
                                            </label>
                                        </div>
                                        <div class="clearfix"> </div>
                                        <div class="col-sm-3">
                                            <label>
                                                店铺状态: 
                                                <select id="shop_state" class="form-control input-sm">
                                                    <option value="" selected="selected">全部店铺</option>
                                                    <option value="1">空铺</option>
                                                    <option value="2">待租</option>
                                                    <option value="0">在租</option>
                                                </select>
                                            </label>
                                        </div>
                                        <div class="col-sm-3">
                                            <label>
                                                锁定状态: 
                                                <select id="state" class="form-control input-sm">
                                                    <option value="" selected="selected">全部店铺</option>
                                                    <option value="0">被锁定的店铺</option>
                                                    <option value="1">未锁定店铺</option>
                                                </select>
                                            </label>
                                        </div>
                                        <div class="col-sm-3">
                                            <label>
                                                同步状态: 
                                                <select id="is_sync" class="form-control input-sm">
                                                    <option value="" selected="selected">全部店铺</option>
                                                    <option value="0">不同步的店铺</option>
                                                    <option value="1">同步的店铺</option>
                                                </select>
                                            </label>
                                        </div>
                                        <div class="col-sm-3">
                                            <button type='submit' id="search" class='btn btn-primary btn-sm'>搜索</button>
                                        </div>
                                    </div>
                                </form>
                                <table class="table table-striped table-bordered table-hover">
                                    <thead>
                                        <tr>
                                            <th>单元号</th>
                                            <th>是否锁定</th>
                                            <th>是否同步</th>
                                            <th>店铺名称</th>
                                            <th>项目名称</th>
                                            <th>楼层</th>
                                            <th>店铺面积</th>
                                            <th>店铺类型</th>
                                            <th>推荐业态</th>
                                            <th>最早入驻日期</th>
                                            <th>店铺状态</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>

                                <div>
                                    <div class="col-sm-6">
                                        <div id="shows"></div>
                                    </div>
                                    <div class="col-sm-6">
                                        <ul class="pagination"></ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- /.table-responsive -->
                    </div>
                    <!-- /.panel-body -->
                </div>
            </div>
        </div>
    </div>
</div>

<?php include ('footer.php'); ?>