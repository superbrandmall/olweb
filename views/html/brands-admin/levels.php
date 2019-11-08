<?php
$scripts = $scripts . '<script type="text/javascript" src="/views/assets/base/js/brands-admin/levels-admin.js"></script>';
?>
<?php $_SESSION['record_url'] = 'http://'.$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI']; ?>
<?php include 'sidebar.php'; ?>

<div class="content-wrapper">
    <section class="content-header" style="padding-bottom: 30px;">
        <h1 id="floorNo" class="pull-left" style="display: inline-block; margin-right: 5px;"></h1> 楼层指引
        <div class="pull-right">
            <div class="c-label" id="fmap">
                <span style="margin-left: 15px; background-color: #7d9fe9; width: 20px; height: 13px; display: inline-block;"></span> 在租 <span id="leased"></span>%
                <span style="margin-left: 15px; background-color: #FE9E9E; width: 20px; height: 13px; display: inline-block;"></span> 空铺 <span id="empty"></span>%
                <span style="margin-left: 15px; background-color: #FEED99; width: 20px; height: 13px; display: inline-block;"></span> 待租 <span id="to_be_lease"></span>%
                <span style="margin-left: 15px; background-color: #D5C8AA; width: 20px; height: 13px; display: inline-block;"></span> 改造 <span id="renovation"></span>%
            </div>
        </div>
    </section>
    
    <section class="content">
        <div class="col-lg-6" id="map_canvas">
            <div id="webui">
                <div class="row">
                    <div class="form-group">
                        <div class="c-content-panel" style="background-color: transparent;">
                            <div class="c-body" style="position: relative;">
                                <div style="position: absolute;top: 0;left: 0; z-index: 1;">
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
        <div class="col-lg-6" style="background: #FE9E9E;">
            
        </div>
    </section>
</div>

<?php include ('footer.php'); ?>