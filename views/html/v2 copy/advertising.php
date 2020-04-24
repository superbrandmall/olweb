<?php
if (explode('?f=', $_SERVER['REQUEST_URI'])[1] != null) {
    $floor = explode('?f=', $_SERVER['REQUEST_URI'])[1];
} else {
    $floor = '';
}

$scripts = $scripts . '<script type="text/javascript" src="/views/assets/base/js/v2/advertising-admin.js"></script>';
?>

<div id="wrapper">
    <?php include ('navbar_top.php'); ?>
    <div id="page-wrapper" class="home-page">
        <div class="row">
            <div class="col-lg-12">
                <div class="c-label" id="fmap" style="margin: 10px 0;">
                    <div class="form-group">
                        <label>请选择任意类型: </label>
                        <?php include ('ads-types/'.$floor.'.html'); ?>
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
                    <a id="f8_g" href="/v2/advertising?f=8">8F</a>    
                </li>
                <li>
                    <a id="f7_g" href="/v2/advertising?f=7">7F</a>    
                </li>
                <li>
                    <a id="f6_g" href="/v2/advertising?f=6">6F</a>    
                </li>
                <li>
                    <a id="f5_g" href="/v2/advertising?f=5">5F</a>    
                </li>
                <li>
                    <a id="f4_g" href="/v2/advertising?f=4">4F</a>    
                </li>
                <li>
                    <a id="f3_g" href="/v2/advertising?f=3">3F</a>    
                </li>
                <li>
                    <a id="f2_g" href="/v2/advertising?f=2">2F</a>    
                </li>
                <li>
                    <a id="f1_g" href="/v2/advertising?f=1">1F</a>    
                </li>
                <li>
                    <a id="fb1_g" href="/v2/advertising?f=0">B1</a>    
                </li>
            </ul>
        </div>

        <div class="row">
            <div class="col-xs-12">
                <div class="panel panel-default" style="max-height: 300px; overflow: auto;">
                    <div class="panel-heading">
                        <span id="floorNo"></span>
                        <a href="advertising-shopping-cart" class="pull-right badge"><i class="fa fa-shopping-cart" aria-hidden="true"></i> 查看购物车</a>
                    </div>
                    <div class="panel-body">
                        <ul class="chat">
                        </ul>
                    </div>
                </div>
            </div>
        </div>


    </div>
</div>

<?php include ('menu_bottom.php'); ?>

<?php include ('footer.php'); ?>