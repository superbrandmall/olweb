<?php
if(isset($_SESSION['lotus_admin_name']) && $_SESSION['lotus_admin_name'] == '马俊') {
    $scripts = $scripts .PHP_EOL. '        <script type="text/javascript" src="/views/assets/base/js/kow-admin/default-admin.js?t='.date("Y-m-d").'"></script>'.PHP_EOL;
} else {
    $scripts = $scripts .PHP_EOL. '        <script type="text/javascript" src="/views/assets/base/js/kow-admin/default-admin.js?t='.date("Y-m-d").'"></script>'.PHP_EOL;
}
?>

<?php $_SESSION['record_url'] = 'http://'.$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI']; ?>
<?php include 'sidebar.php'; ?>

<div class="content-wrapper" style="overflow: hidden;">
    <section class="sub-header">
        <h4>KOW上海项目概览</h4>
    </section>
    
    <section class="content" style="margin-top: 90px;">
        <div class="col-lg-12">
            <div id="webui">
                <div class="box box-default" style="overflow: auto;">
                    <div class="box-header with-border">
                        <div class="col-md-6">
                            <div class="form-group" style="margin-bottom: 0;">
                                <div class="col-md-3" style="padding-top: 7px;">时间范围:</div>
                                <div class="col-md-9 col-sm-12">
                                    <div class="input-daterange input-group">
                                        <input type="text" class="form-control" id="startDate" readonly style="border: 1px solid #ccc; background: #fff; border-radius: 0; border-right: none;" />
                                        <span class="input-group-addon" style="border-left: none; background: #fff;"><i class="fa fa-calendar"></i></span>
                                        <span class="input-group-addon" style="border: none; background: transparent;">-</span>
                                        <div class="input-group">
                                            <input type="text" class="form-control" id="endDate" readonly style="border: 1px solid #ccc; background: #fff; border-radius: 0; border-right: none;" />
                                            <span class="input-group-addon" style="border-left: none; background: #fff;"><i class="fa fa-calendar"></i></span>
                                        </div>    
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-2">
                            <button type="button" class="btn btn-info btn-sm" id="search"><i class="fa fa-search icon-white"></i> <span class="hidden-xs">搜索</span></button>
                            <button type="button" class="btn btn-default btn-sm" id="clear"><i class="fa fa-times icon-white"></i> <span class="hidden-xs">清除</span></button>
                        </div>
                        <div class="col-md-4" style="padding-top: 5px;">
                            <span style="margin-left: 5px; background-color: #58A55B; width: 13px; height: 10px; display: inline-block;"></span> 时间段内: <strong id="doing" class="box-title" style="color: #58A55B;"></strong>
                            <span style="margin-left: 5px; background-color: #E85D7D; width: 13px; height: 10px; display: inline-block;"></span> 时间段后: <strong id="toDo" class="box-title" style="color: #E85D7D;"></strong>
                        </div>
                    </div>
                    <div class="box-body" style="padding: 0;">
                        <div class="row">
                            <div id="citys" style="display: none;"></div>
                            <iframe class="embed-responsive-item" src="https://ol.superbrandmall.com/kow/index.html" name="map" frameborder="0" width="99%" height="500px;"></iframe>
                        </div>
                    </div>
                </div>        
            </div>
        </div>
    </section>
</div>

<?php include ('footer.php'); ?>