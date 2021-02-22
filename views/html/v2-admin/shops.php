<?php
$scripts = $scripts . '<script type="text/javascript" src="/views/assets/base/js/v2-admin/shops-admin.js"></script>';
?>

<body id="mimin" class="dashboard">
    <?php include ('navbar_top.php'); ?>
    <div class="container-fluid mimin-wrapper">
        <?php include ('navbar_side.php'); ?>
        <div id="content">
            <div class="panel box-shadow-none content-header">
                <div class="panel-body">
                    <div class="col-md-12">
                        <h3 class="animated fadeInLeft" style="display: inline-block;">店铺信息</h3>
                        <p class="animated fadeInDown" style="display: inline-block;">列表</p>
                    </div>
                </div>
            </div>

            <div class="col-md-12 top-20 padding-0">
                <div class="col-md-12">
                    <div class="panel">
                        <div id="panel_table" class="panel-body">
                            <div class="col-md-12 padding-0" style="padding-bottom:10px; overflow: auto;">
                                <div class="col-xs-4" style="padding-left:0;margin-bottom: 10px;">
                                    <select id="mall_list" style="padding-left: 5px; width: 100%;"></select>
                                </div>
                                <div class="col-xs-4" style="padding-left:0;">
                                    <input type="text" id="shop_name" class="form-control" placeholder="门牌号">
                                </div>
                                <div class="col-xs-4" style="padding:0;">
                                    <input type="text" id="unit" class="form-control" placeholder="单元号">
                                </div>
                                <div class="clearfix"> </div>
                                
                                <div class="col-xs-3" style="padding-left:0;margin-bottom: 10px;">
                                    <select id="shop_state" style="padding-left: 5px; width: 100%;">
                                        <option value="" selected="selected">出租状态</option>
                                        <option value="1">空铺</option>
                                        <option value="2">待租</option>
                                        <option value="0">在租</option>
                                    </select>
                                </div>
                                <div class="col-xs-3" style="padding-left:0;">
                                    <select id="state" style="padding-left: 5px; padding-right: 0; width: 100%;">
                                        <option value="" selected="selected">锁定状态</option>
                                        <option value="0">被锁定的店铺</option>
                                        <option value="1">未锁定店铺</option>
                                    </select>
                                </div>
                                <div class="col-xs-3" style="padding-left:0;">
                                    <select id="is_sync" style="padding-left: 5px; padding-right: 0; width: 100%;">
                                        <option value="" selected="selected">同步状态</option>
                                        <option value="0">不同步的店铺</option>
                                        <option value="1">同步的店铺</option>
                                    </select>
                                </div>
                                <div class="col-xs-3" style="padding: 0;">
                                    <button type="submit" id="search" class="btn btn-default dropdown-toggle" style="width: 100%;">搜索</button>
                                </div>
                            </div>
                            
                            <div class="responsive-table">
                                <table class="table table-striped table-bordered" width="100%" cellspacing="0">
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
                                    <tbody></tbody>
                                </table>
                            </div>
                            <div class="col-md-6" style="padding-top:20px;">
                                <span id="shows"></span>
                            </div>
                            <div class="col-md-6">
                                <ul class="pagination pull-right"></ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <?php include ('footer.php'); ?>