<?php
$scripts = '<script type="text/javascript" src="/views/assets/base/js/admin/sync-hd-admin.js"></script>';
?>

<div class="alert alert-success"  id="ui_succeed" role="alert">成功!</div>
<div id="wrapper">
    <?php include ('navbar_top.php'); ?>
    <?php include ('navbar_side.php'); ?>
    <div id="page-wrapper">
        <div class="row">
            <div class="col-lg-12">
                <h1 class="page-header">同步海鼎</h1>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-4">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        基础数据
                    </div>
                    <div class="panel-body">
                        <p>刷新基础数据，包括mall,building,floor</p>
                    </div>
                    <div class="panel-footer">
                        <a href="#!" onclick="javascript: syncHDBaseInfo();" class="btn btn-default btn-block"><i class="fa fa-life-saver" aria-hidden="true"></i> 同步海鼎</a>
                        <a href="#!" onclick="javascript: cachingMallInfo();" class="btn btn-default btn-block"><i class="fa fa-refresh" aria-hidden="true"></i> 刷新购物中心</a>
                        <a href="#!" onclick="javascript: cachingFloorInfo();" class="btn btn-default btn-block"><i class="fa fa-refresh" aria-hidden="true"></i> 刷新楼层</a>
                    </div>
                </div>
                
                <div class="panel panel-primary">
                    <div class="panel-heading">
                        业态
                    </div>
                    <div class="panel-body">
                        <p>刷新数据</p>
                    </div>
                    <div class="panel-footer">
                        <a href="#!" onclick="javascript: syncHDModality();" class="btn btn-default btn-block"><i class="fa fa-life-saver" aria-hidden="true"></i> 同步海鼎</a>
                        <a href="#!" onclick="javascript: cachingModality();" class="btn btn-default btn-block"><i class="fa fa-refresh" aria-hidden="true"></i> 刷新业态</a>
                    </div>
                </div>
            </div>
            
            <div class="col-lg-4">
                <div class="panel panel-success">
                    <div class="panel-heading">
                        品牌
                    </div>
                    <div class="panel-body">
                        <p>刷新数据</p>
                    </div>
                    <div class="panel-footer">
                        <a href="#!" onclick="javascript: syncHDBrand();" class="btn btn-default btn-block"><i class="fa fa-life-saver" aria-hidden="true"></i> 同步海鼎</a>
                    </div>
                </div>
                
                 <div class="panel panel-info">
                    <div class="panel-heading">
                        商户
                    </div>
                    <div class="panel-body">
                        <p>刷新数据</p>
                    </div>
                    <div class="panel-footer">
                        <a href="#!" onclick="javascript: syncHDMerchant();" class="btn btn-default btn-block"><i class="fa fa-life-saver" aria-hidden="true"></i> 同步海鼎</a>
                    </div>
                </div>
            </div>
            
            <div class="col-lg-4">
                <div class="panel panel-warning">
                    <div class="panel-heading">
                        店铺
                    </div>
                    <div class="panel-body">
                        <p>刷新数据</p>
                    </div>
                    <div class="panel-footer">
                        <a href="#!" onclick="javascript: syncHDShop();" class="btn btn-default btn-block"><i class="fa fa-life-saver" aria-hidden="true"></i> 同步海鼎</a>
                        <a href="#!" onclick="javascript: cachingMallInfo();" class="btn btn-default btn-block"><i class="fa fa-refresh" aria-hidden="true"></i> 刷新购物中心</a>
                        <a href="#!" onclick="javascript: cachingFloorInfo();" class="btn btn-default btn-block"><i class="fa fa-refresh" aria-hidden="true"></i> 刷新楼层</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<?php include ('footer.php'); ?>