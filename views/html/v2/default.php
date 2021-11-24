<?php
$scripts = $scripts . '<script type="text/javascript" src="/views/assets/base/js/v2/default-admin.js"></script>';
?>


<style>
    #pix_sbm img {
        width: 100%;
    }
</style>

<div style="position: relative; height: 100vh; overflow: hidden;">
    <div style="position: absolute; top: 0; bottom: 0;">
        <video id="video_sbm" class="embed-responsive-item" autoplay="true" muted playsinline loop="loop" style="width: 100%; height: auto; margin-top: -50px;">
            <source src="/upload/video/sbm.mp4" type="video/mp4">
        </video>
    </div>
    <div id="pix_sbm" style="position: absolute; top: 0; bottom: 0; display: none;">
        <img src="/upload/video/sbm-0/sbm000.jpg" />
    </div>
    <div style="position: relative; height: 100vh;">
        <div class="container fill-bloc-top-edge ltc-white" style="text-shadow: 1px 1px 20px #B8860B;">
            <div class="row">
                <div class="col-lg-12 cp-hero-titlte">
                    <h4 class="text-center mg-clear animated fadeInUp animDelay08" data-appear-anim-style="fadeInUp" style="font-weight: bold;">世界级城市的旗舰商业地标</h4>
                    <h1 class="text-center mg-clear none animated fadeInUp animDelay08" data-appear-anim-style="fadeInUp">上海 | 正大广场</h1>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <div>
                        <ul class="snap-scroll-pagination snap-scroll-paginate-dashes" data-min-breakpoint="768"></ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="container fill-bloc-bottom-edge" style="position: absolute; bottom: 30px;">
            <div class="row no-gutters">
                <div class="col-12 offset-lg-0 col-lg-12">
                    <div class="card border-0 card-sq bgc-white cp-hero-bottom">
                        <div class="row no-gutters">
                            <div class="col-xs-6 align-self-center cp-hero-button-column animated fadeIn animDelay1" data-appear-anim-style="fadeIn" style="margin: 0 auto;">
                                <div class="text-center">
                                    <a href="/v2/leasing?type=leasing" class="btn btn-d btn-lg cp-button-gold sm-shadow">从上海正大广场选择铺位</a>
                                </div>
                            </div>
                            <div class="col-xs-6 align-self-center cp-hero-button-column animated fadeIn animDelay1" data-appear-anim-style="fadeIn" style="margin: 0 auto;">
                                <div class="text-center">
                                    <a href="/v2/ljz" class="btn btn-d btn-lg cp-button-white sm-shadow">了解上海正大广场</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<a class="bloc-button btn btn-d scrollToTop" onclick="scrollToTarget('1', this)"><span class="fa fa-chevron-up"></span></a>
<?php include ('footer.php'); ?>