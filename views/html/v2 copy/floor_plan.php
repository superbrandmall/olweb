<?php
$scripts = $scripts . '<script type="text/javascript" src="/views/assets/base/js/v2/floor-plan-admin.js"></script>'
        . '<script src="/views/assets/plugins/datepicker/bootstrap-datepicker.min.js" type="text/javascript"></script>'
        . '<script src="/views/assets/plugins/datepicker/bootstrap-datepicker.zh-CN.min.js" type="text/javascript"></script>'
        . '<script src="/views/assets/plugins/pdfjs/build/pdf.worker.js" type="text/javascript"></script>';
?>
<link href="/views/assets/plugins/datepicker/bootstrap-datepicker.css" rel="stylesheet" type="text/css" media="all" />

<div id="wrapper">
    <?php include ('navbar_top.php'); ?>
    <div id="page-wrapper" class="home-page">
        <div class="row">
            <div class="col-lg-12" style="padding: 0; z-index: 9999;">
                    <!--<div class="col-xs-4">
                        <div class="form-group">
                            <p>业态</p>
                            <select class="form-control input-sm c-square" id="modality_1" name="modality_1">
                                <option value="">所有</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-xs-4">
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
                    <div class="col-xs-4">
                        <div class="form-group">
                            <p>起始日</p>
                            <input type="text" id="start" name="start" class="form-control c-square c-theme input-sm" placeholder="起始日" data-plugin="datepicker" readonly>
                        </div>
                    </div>-->
                    
                        
                    <div class="navbar-collapse navbar-ex1-collapse" style="background: #fff; padding: 0;">
                        <ul class="nav navbar-nav" style="margin: 0; border-bottom: solid 1px #eee;">
                    <li style="float: left; position: static;"><a href="#">业态</a></li>
                    <li style="float: left; position: static;" class="dropdown">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown">面积 <b class="caret"></b></a>
                        <ul class="dropdown-menu menu-top" id="size" style="position:absolute;left: 0;right: 0;width: 100%;background: #fff;top: 42px;padding: 0 15px;">
                            <li class="active" style="border-bottom: solid 1px #eee; padding: 5px 0;"><a href="#!" title="0-10000">所有</a></li>
                            <li style="border-bottom: solid 1px #eee; padding: 5px 0;"><a href="#!" title="0-50">50m²以下</a></li>
                            <li style="border-bottom: solid 1px #eee; padding: 5px 0;"><a href="#!" title="50-100">50-100m²</a></li>
                            <li style="border-bottom: solid 1px #eee; padding: 5px 0;"><a href="#!" title="100-200">100-200m²</a></li>
                            <li style="border-bottom: solid 1px #eee; padding: 5px 0;"><a href="#!" title="200-300">200-300m²</a></li>
                            <li style="border-bottom: solid 1px #eee; padding: 5px 0;"><a href="#!" title="300-500">300-500m²</a></li>
                            <li style="border-bottom: solid 1px #eee; padding: 5px 0;"><a href="#!" title="500-800">500-800m²</a></li>
                            <li style="border-bottom: solid 1px #eee; padding: 5px 0;"><a href="#!" title="800-1000">800-1000m²</a></li>
                            <li style="border-bottom: solid 1px #eee; padding: 5px 0;"><a href="#!" title="1000-10000">1000m²以上</a></li>
                        </ul>
                    </li>
                    <li style="float: left; position: static;"><a href="#">起始日</a></li>
                </ul>
            </div>
                    
                        
                    

                    
                    <div class="col-xs-12">
                        <span style="border: solid 1px #ccc; background-color: #ffff00; width: 20px; height: 13px; display: inline-block;"></span> 推荐位置
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

<div class="modal fade" id="engineering_pdf" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-md">
        <div class="modal-content c-square">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            </div>
            <div class="modal-body">
                <div class="col-xs-12">
                    <iframe id="pdfContainer" src="/views/assets/plugins/pdfjs/web/viewer.html?file=/views/html/v2/GF01A.pdf" width="100%" height="450px" frameborder="0"></iframe>
                </div>
            </div>
        </div>
    </div>
</div>

<?php include ('menu_bottom.php'); ?>

<?php include ('footer.php'); ?>