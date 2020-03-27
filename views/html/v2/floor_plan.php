<?php
$scripts = $scripts . '<script type="text/javascript" src="/views/assets/base/js/v2/floor-plan-admin.js"></script>'
        . '<script src="/views/assets/plugins/datepicker/bootstrap-datepicker.min.js" type="text/javascript"></script>'
        . '<script src="/views/assets/plugins/datepicker/bootstrap-datepicker.zh-CN.min.js" type="text/javascript"></script>';
?>
<link href="/views/assets/plugins/datepicker/bootstrap-datepicker.css" rel="stylesheet" type="text/css" media="all" />

<div id="wrapper">
    <?php include ('navbar_top.php'); ?>
    <div id="page-wrapper" class="home-page">
        <div class="row">
            <div class="col-lg-12">
                <div class="c-label" id="fmap" style="display: inline-block; background-color: transparent; margin: 10px 0; font-size: 11px;">
                    <div class="col-xs-3" style="padding-left: 0; padding-right: 0;">
                        <div class="form-group">
                            <p>零售/非零售</p>
                            <select class="form-control input-sm c-square" id="modality_0" name="modality_0">
                                <option value="">所有</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-xs-3" style="padding-left: 0; padding-right: 0;">
                        <div class="form-group">
                            <p>业态</p>
                            <select class="form-control input-sm c-square" id="modality_1" name="modality_1">
                                <option value="">所有</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-xs-3" style="padding-left: 0; padding-right: 0;">
                        <div class="form-group">
                            <p>面积</p>
                            <select id="size" name="size" class="form-control c-square c-theme input-sm">
                                <option value="0-10000">所有</option>
                                <option value="0-50">50m²以下</option>
                                <option value="50-100">50-100m²</option>
                                <option value="100-200">100-200m²</option>
                                <option value="200-300">200-300m²</option>
                                <option value="300-500">300-500m²</option>
                                <option value="500-800">500-800m²</option>
                                <option value="800-1000">800-1000m²</option>
                                <option value="1000-10000">1000m²以上</option>
                            </select>
                        </div>
                    </div>

                    <div class="col-xs-3" style="padding-left: 0; padding-right: 0;">
                        <div class="form-group">
                            <p>起始日</p>
                            <input type="text" id="start" name="start" class="form-control c-square c-theme input-sm" placeholder="起始日" data-plugin="datepicker" readonly>
                        </div>
                    </div>
                    <div class="col-xs-12">
                        <span style="border: solid 1px #ccc; background-color: #ffff00; width: 20px; height: 13px; display: inline-block;"></span> 推荐位置
                    </div>
                </div>
            </div>
        </div>
        
        <div class="row" style="position: relative;">
            <div class="col-xs-12">
                <div class="form-group">
                    <div class="c-content-panel" style="background-color: transparent;">
                        <div class="c-body" style="position: relative;">
                            <div style="position: absolute;top: 0;left: 0; z-index: 1;">
                                <button id="zoom_in" class="btn btn-xs btn-default" style="display: block;">
                                    <i class="fa fa-plus"></i>
                                </button>
                                <button id="zoom_out" class="btn btn-xs btn-default" style="display: block;">
                                    <i class="fa fa-minus"></i>
                                </button>
                            </div>
                            <img src="#" class="img-responsive" usemap="" id="map" />
                            <map name="" id=""></map>
                        </div>
                    </div>
                </div>
            </div>
            
            <ul class="floor-guide">
                <li>
                    <a id="f8_g" href="/v2/floor-plan?f=8">8F</a>    
                </li>
                <li>
                    <a id="f7_g" href="/v2/floor-plan?f=7">7F</a>    
                </li>
                <li>
                    <a id="f6_g" href="/v2/floor-plan?f=6">6F</a>    
                </li>
                <li>
                    <a id="f5_g" href="/v2/floor-plan?f=5">5F</a>    
                </li>
                <li>
                    <a id="f4_g" href="/v2/floor-plan?f=4">4F</a>    
                </li>
                <li>
                    <a id="f3_g" href="/v2/floor-plan?f=3">3F</a>    
                </li>
                <li>
                    <a id="f2_g" href="/v2/floor-plan?f=2">2F</a>    
                </li>
                <li>
                    <a id="f1_g" href="/v2/floor-plan?f=1">1F</a>    
                </li>
                <li>
                    <a id="fb1_g" href="/v2/floor-plan?f=0">B1</a>    
                </li>
            </ul>
        </div>

        <div class="row">
            <div class="col-xs-12">
                <div class="panel panel-default" style="max-height: 300px; overflow: auto;">
                    <div id="floorNo" class="panel-heading"></div>
                    <div class="panel-body">
                        <ul class="chat"></ul>
                    </div>
                </div>
            </div>
        </div>


    </div>
</div>

<?php include ('menu_bottom.php'); ?>

<?php include ('footer.php'); ?>