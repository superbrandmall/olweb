<?php
$scripts = $scripts . '<script type="text/javascript" src="/views/assets/base/js/v2/event-admin.js"></script>';
?>

<div id="wrapper">
    <?php include ('navbar_top.php'); ?>
    <div id="carousel-example-generic" class="carousel slide" data-ride="carousel">
        <!-- Indicators -->
        <ol class="carousel-indicators"></ol>

        <!-- Wrapper for slides -->
        <div class="carousel-inner" role="listbox"></div>

        <!-- Controls -->
        <a class="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev">
            <span class="glyphicon glyphicon-chevron-left"></span>
            <span class="sr-only">Previous</span>
        </a>
        <a class="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next">
            <span class="glyphicon glyphicon-chevron-right"></span>
            <span class="sr-only">Next</span>
        </a>
    </div>
    <div id="page-wrapper">
        <div class="row">
            <div class="col-xs-12">
                <h4 class="page-header">场地说明</h4>
                <div class="panel panel-default">
                    <div class="panel-body">
                        <div class="table-responsive">
                            <table class="table table-striped table-bordered table-hover no-footer" cellspacing="0">
                                <tbody>
                                    <tr>
                                        <td class="table-sub-title">门牌号</td>
                                        <td id="room_name"></td>
                                    </tr>
                                    <tr>
                                        <td class="table-sub-title">楼层</td>
                                        <td id="floor"></td>
                                    </tr>
                                    <tr>
                                        <td class="table-sub-title">面积</td>
                                        <td><span id="area"></span> (<span id="area_spesifc"></span>)</td>
                                    </tr>
                                    <tr>
                                        <td class="table-sub-title">限高</td>
                                        <td id="height"></td>
                                    </tr>
                                    <tr>
                                        <td class="table-sub-title">用电量(包含接口类型)</td>
                                        <td id="electricity"></td>
                                    </tr>
                                    <tr>
                                        <td class="table-sub-title">电线拖线要求</td>
                                        <td id="wire_towing"></td>
                                    </tr>
                                    <tr>
                                        <td class="table-sub-title">附近电梯门尺寸</td>
                                        <td id="elevator_size"></td>
                                    </tr>
                                    <tr>
                                        <td class="table-sub-title">网络端口</td>
                                        <td id="network_type"></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="panel-footer">
                        注:活动场地使用区域按斜线所示范围为限，活动场地内之装置或背板不得超过限高。
                    </div>
                </div>
            </div>

            <div class="container">
                <div class="row">
                    <div class="col-xs-12">
                        <h4 class="page-header">VR看场</h4>
                        <div class="embed-responsive embed-responsive-16by9">
                            <iframe class="embed-responsive-item" src="#"></iframe>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-xs-12">
                        <h4 class="page-header">场地落位图</h4>
                        <div>
                            <img src="#" class="img-responsive" id="map">
                        </div>
                    </div>
                </div>
            </div>
            <br><br>
            <div class="container">
                <div class="row">
                    <div class="col-xs-12">
                        <center>
                            <button class="btn btn-primary" id="choose_event"><i class="fa fa-check" aria-hidden="true"> </i> 选择该场地并报价</button>
                        </center>
                    </div>
                </div>
            </div>
        </div>
        
        <?php include ('events.php'); ?>
        
        <hr>

        <?php include ('menu_bottom.php'); ?>
    </div>

    <?php include ('footer.php'); ?>