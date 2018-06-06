<?php
$scripts = '<script type="text/javascript" src="/views/assets/base/js/admin/shop-admin.js"></script>';
    
if(explode('?id=',$_SERVER['REQUEST_URI'])[1] != null) {
    $id = explode('?id=',$_SERVER['REQUEST_URI'])[1];
    if (strpos($id, '&k=') !== false) {
        $id = explode('&k=',$id)[0];
    }
} else {
    $id = null;
}
?>

<div class="alert alert-success"  id="ui_succeed" role="alert">保存成功!</div>
<div id="wrapper">
    <?php include ('navbar_top.php'); ?>
    <?php include ('navbar_side.php'); ?>
    <div id="page-wrapper">
        <div class="row">
            <div class="col-lg-12">
                <h1 class="page-header">店铺信息详情</h1>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-12">
                <div class="panel panel-default">
                    <div class="panel-body">
                        <div class="row">
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label>店铺编号</label>
                                    <input class="form-control" id="code" disabled>
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label>店铺名称</label>
                                    <input class="form-control" id="name" disabled>
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label>项目名称</label>
                                    <input class="form-control" id="mall" value="" disabled>
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label>建筑物名称</label>
                                    <input class="form-control" id="building" disabled>
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label>楼层</label>
                                    <input class="form-control" id="floor" disabled>
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label>租赁面积</label>
                                    <input class="form-control" id="area" disabled>
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label>推荐业态</label>
                                    <input class="form-control" id="modality" disabled>
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label>最早可入驻日期</label>
                                    <input class="form-control" id="moving_date" disabled>
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label>店铺状态</label>
                                    <input class="form-control" id="shop_state" disabled>
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label>在租/上一品牌</label>
                                    <input class="form-control" id="brand_name" disabled>
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label>参考租金</label>
                                    <input class="form-control" id="dead_rent" disabled>
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label>参考扣率</label>
                                    <input class="form-control" id="floating_rental_rate" disabled>
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label>海鼎标识</label>
                                    <input class="form-control" id="hd_code" value="">
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label>海鼎状态</label>
                                    <input class="form-control" id="hd_state" disabled>
                                </div>
                            </div>
                            <div class="clearfix"> </div>

                            <div class="col-sm-12">
                                <div class="form-group" id="images">
                                    <label>店铺图片</label>
                                    <div class="clearfix"> </div>
                                </div>
                            </div>
                            
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label>添加店铺图片</label>
                                    <input type="hidden" name="MAX_FILE_SIZE" value="9000000">
                                    <input type="file" id="add_images" name="add_images" multiple>
                                </div>
                            </div>  

                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label>店铺坐标</label>
                                    <textarea class="form-control" id="coords"></textarea>
                                </div>
                            </div>
                            <div class="clearfix"> </div>
                            <div class="col-sm-12" id="buttons">
                                <center>
                                    <button class="btn btn-primary" id="submit">提交</button>
                                    <a href="javascript:history.go(-1)" class="btn btn-default">返回</a>
                                </center>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<?php include ('footer.php'); ?>