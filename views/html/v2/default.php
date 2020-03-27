<?php
$scripts = $scripts . '<script type="text/javascript" src="/views/assets/base/js/v2/default-admin.js"></script>';
?>

<div id="wrapper">
    <?php include ('navbar_top.php'); ?>
    <div id="carousel-example-generic" class="carousel slide" data-ride="carousel">
        <!-- Indicators -->
        <ol class="carousel-indicators">
            <li data-target="#carousel-example-generic" data-slide-to="0" class="active"></li>
            <li data-target="#carousel-example-generic" data-slide-to="1"></li>
            <li data-target="#carousel-example-generic" data-slide-to="2"></li>
            <li data-target="#carousel-example-generic" data-slide-to="3"></li>
        </ol>

        <!-- Wrapper for slides -->
        <div class="carousel-inner" role="listbox">
            <div class="item active">
                <img src="/views/assets/base/img/content/backgrounds/v2-banner-1.jpg" alt="...">
                <div class="carousel-caption">
                    ...
                </div>
            </div>
            <div class="item">
                <img src="/views/assets/base/img/content/backgrounds/v2-banner-2.jpg" alt="...">
                <div class="carousel-caption">
                    ...
                </div>
            </div>
            <div class="item">
                <img src="/views/assets/base/img/content/backgrounds/v2-banner-3.jpg" alt="...">
                <div class="carousel-caption">
                    ...
                </div>
            </div>
            <div class="item">
                <img src="/views/assets/base/img/content/backgrounds/v2-banner-4.jpg" alt="...">
                <div class="carousel-caption">
                    ...
                </div>
            </div>
        </div>

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
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <h4 class="page-header">商业项目</h4>
                </div>
                <div class="col-xs-3">
                    <a href="/v2/mall"><img class="img-circle img-responsive" src="/views/assets/base/img/content/mall/1s.jpg"></a>
                    <center><h3 style="margin-top: 0;"><a href="/v2/mall"><small>陆家嘴</small></a></h3></center>
                </div>
                <div class="col-xs-3">
                    <img class="img-circle img-responsive" src="/views/assets/base/img/content/mall/2s.jpg">
                    <center><h3 style="margin-top: 0;"><small>洛阳</small></h3></center>
                </div>
                <div class="col-xs-3">
                    <img class="img-circle img-responsive" src="/views/assets/base/img/content/mall/3s.jpg">
                    <center><h3 style="margin-top: 0;"><small>合肥</small></h3></center>
                </div>
                <div class="col-xs-3">
                    <img class="img-circle img-responsive" src="/views/assets/base/img/content/mall/4s.jpg">
                    <center><h3 style="margin-top: 0;"><small>徐汇</small></h3></center>
                </div>
                <div class="col-xs-3">
                    <img class="img-circle img-responsive" src="/views/assets/base/img/content/mall/5s.jpg">
                    <center><h3 style="margin-top: 0;"><small>宝山</small></h3></center>
                </div>
                <div class="col-xs-3">
                    <img class="img-circle img-responsive" src="/views/assets/base/img/content/mall/6s.jpg">
                    <center><h3 style="margin-top: 0;"><small>郑州</small></h3></center>
                </div>
                <div class="col-xs-3">
                    <img class="img-circle img-responsive" src="/views/assets/base/img/content/mall/7s.jpg">
                    <center><h3 style="margin-top: 0;"><small>无锡</small></h3></center>
                </div>
                <div class="col-xs-3">
                    <img class="img-circle img-responsive" src="http://placehold.it/200x200">
                    <center><h3 style="margin-top: 0;"><small>北京</small></h3></center>
                </div>
            </div>
            <hr>
            <div class="row">
                <div class="col-xs-4">
                    <a href="#" class="btn btn-default">增值服务</a>
                </div>
                <div class="col-xs-4">
                    <a href="#" class="btn btn-default">增值服务</a>
                </div>
                <div class="col-xs-4">
                    <a href="/v2/choose-event" class="btn btn-default">增值服务</a>
                </div>
            </div>
            <hr>
        </div>
    </div>
    
    <?php include ('menu_bottom.php'); ?>
</div>

<?php include ('footer.php'); ?>