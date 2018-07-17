<?php
$scripts = '<script type="text/javascript" src="/views/assets/base/js/admin/mall-admin.js"></script>';
    
if(explode('?id=',$_SERVER['REQUEST_URI'])[1] != null) {
    $id = explode('?id=',$_SERVER['REQUEST_URI'])[1];
    if (strpos($id, '&k=') !== false) {
        $id = explode('&k=',$id)[0];
    }
} else {
    $id = null;
}
?>

<div class="alert alert-success"  id="ui_succeed" role="alert">成功!</div>
<div id="wrapper">
    <?php include ('navbar_top.php'); ?>
    <?php include ('navbar_side.php'); ?>
    <div id="page-wrapper">
        <div class="row">
            <div class="col-lg-12">
                <h1 class="page-header">项目信息详情</h1>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-12">
                <div class="panel panel-default">
                    <div class="panel-body">
                        <div class="row">
                            <div class="col-sm-4">
                                <div class="form-group">
                                    <label>项目编号</label>
                                    <input class="form-control" id="code" disabled>
                                </div>
                            </div>
                            <div class="col-sm-4">
                                <div class="form-group">
                                    <label>中文名称</label>
                                    <input class="form-control" id="name" disabled>
                                </div>
                            </div>
                            <div class="col-sm-4">
                                <div class="form-group">
                                    <label>英文名称</label>
                                    <input class="form-control" id="name_eng">
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label>建筑面积</label>
                                    <input class="form-control" id="gross_area" disabled>
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label>租赁面积</label>
                                    <input class="form-control" id="leasing_area" disabled>
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label>中文地址</label>
                                    <input class="form-control" id="location" disabled>
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label>英文地址</label>
                                    <input class="form-control" id="location_eng">
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label>热线电话</label>
                                    <input class="form-control" id="phone">
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label>顺序(从0开始)</label>
                                    <input class="form-control" id="position">
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label>中文描述</label>
                                    <textarea class="form-control" id="desc"></textarea>
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label>英文描述</label>
                                    <textarea class="form-control" id="desc_eng"></textarea>
                                </div>
                            </div>
                            <div class="clearfix"> </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="row">
            <div class="col-lg-12">
                <h1 class="page-header">项目周边交通</h1>
            </div>
            <div class="col-lg-6" id="traffics"></div>
            <div class="col-lg-6" id="traffics_eng"></div>
        </div>
        <!--<div class="row">
            <div class="col-lg-12">
                <h1 class="page-header">出价标准配置</h1>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-6">
                <div class="panel-body">
                    <div class="table-responsive">
                        <table class="table table-striped table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th colspan="4" style="text-align: center;">装修免租期</th>
                                </tr>
                                <tr>
                                    <th colspan="2" style="text-align: center;">零售</th>
                                    <th colspan="2" style="text-align: center;">非零售</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>商铺 < 200 m<sup>2</sup></td>
                                    <td>
                                        <div class="input-group">
                                            <input class="form-control" id="rent_free_retail_1">
                                            <span class="input-group-addon">天</span>
                                        </div>
                                    </td>
                                    <td>商铺 < 100 m<sup>2</sup></td>
                                    <td>
                                        <div class="input-group">
                                            <input class="form-control" id="rent_free_non_retail_1">
                                            <span class="input-group-addon">天</span>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>200 <= 商铺 < 500 m<sup>2</sup></td>
                                    <td>
                                        <div class="input-group">
                                            <input class="form-control" id="rent_free_retail_2">
                                            <span class="input-group-addon">天</span>
                                        </div>
                                    </td>
                                    <td>100 <= 商铺 < 500 m<sup>2</sup></td>
                                    <td>
                                        <div class="input-group">
                                            <input class="form-control" id="rent_free_non_retail_2">
                                            <span class="input-group-addon">天</span>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>商铺 >= 500 m<sup>2</sup></td>
                                    <td>
                                        <div class="input-group">
                                            <input class="form-control" id="rent_free_retail_3">
                                            <span class="input-group-addon">天</span>
                                        </div>
                                    </td>
                                    <td>商铺 >= 500 m<sup>2</sup></td>
                                    <td>
                                        <div class="input-group">
                                            <input class="form-control" id="rent_free_non_retail_3">
                                            <span class="input-group-addon">天</span>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            
            <div class="col-lg-6">
                <div class="panel-body">
                    <div class="table-responsive">
                        <table class="table table-striped table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th colspan="4" style="text-align: center;">合约年限</th>
                                </tr>
                                <tr>
                                    <th colspan="2" style="text-align: center;">零售</th>
                                    <th colspan="2" style="text-align: center;">非零售</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>商铺 < 200 m<sup>2</sup></td>
                                    <td>
                                        <div class="input-group">
                                            <span class="input-group-addon">1-</span>
                                            <input class="form-control" id="limit_retail_1">
                                            <span class="input-group-addon">年</span>
                                        </div>
                                    </td>
                                    <td>商铺 < 100 m<sup>2</sup></td>
                                    <td>
                                        <div class="input-group">
                                            <span class="input-group-addon">1-</span>
                                            <input class="form-control" id="limit_non_retail_1">
                                            <span class="input-group-addon">年</span>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>200 <= 商铺 < 500 m<sup>2</sup></td>
                                    <td>
                                        <div class="input-group">
                                            <span class="input-group-addon">1-</span>
                                            <input class="form-control" id="limit_retail_2">
                                            <span class="input-group-addon">年</span>
                                        </div>
                                    </td>
                                    <td>100 <= 商铺 < 500 m<sup>2</sup></td>
                                    <td>
                                        <div class="input-group">
                                            <span class="input-group-addon">1-</span>
                                            <input class="form-control" id="limit_non_retail_2">
                                            <span class="input-group-addon">年</span>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>商铺 >= 500 m<sup>2</sup></td>
                                    <td>
                                        <div class="input-group">
                                            <span class="input-group-addon">1-</span>
                                            <input class="form-control" id="limit_retail_3">
                                            <span class="input-group-addon">年</span>
                                        </div>
                                    </td>
                                    <td>商铺 >= 500 m<sup>2</sup></td>
                                    <td>
                                        <div class="input-group">
                                            <span class="input-group-addon">1-</span>
                                            <input class="form-control" id="limit_non_retail_3">
                                            <span class="input-group-addon">年</span>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>-->
        
        <div class="row">
            <!--<div class="col-lg-4">
                <div class="panel-body">
                    <div class="table-responsive">
                        <table class="table table-striped table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th colspan="2" style="text-align: center;">租金递增</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1-3年每年递增不低于</td>
                                    <td>
                                        <div class="input-group">
                                            <input class="form-control" id="rent_increase_1">
                                            <span class="input-group-addon">%</span>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>4-8年每2年递增不低于</td>
                                    <td>
                                        <div class="input-group">
                                            <input class="form-control" id="rent_increase_2">
                                            <span class="input-group-addon">%</span>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="col-lg-4">
                <div class="panel-body">
                    <div class="table-responsive">
                        <table class="table table-striped table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th colspan="2" style="text-align: center;">宣传推广费</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>税前月营业额的</td>
                                    <td>
                                        <div class="input-group">
                                            <input class="form-control" id="promotion_budget">
                                            <span class="input-group-addon">%</span>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="col-lg-4">
                <div class="panel-body">
                    <div class="table-responsive">
                        <table class="table table-striped table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th colspan="2" style="text-align: center;">物业管理费</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>租赁面积</td>
                                    <td>
                                        <div class="input-group">
                                            <input class="form-control" id="maintenance_fee">
                                            <span class="input-group-addon">元/m<sup>2</sup>/月</span>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>-->
            
            <div class="col-lg-12">
                <center>
                    <button class="btn btn-primary" id="submit">提交</button>
                    <a href="javascript:history.go(-1)" class="btn btn-default">返回</a>
                </center>
            </div>
        </div>
    </div>
</div>

<?php include ('footer.php');