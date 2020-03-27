<?php
if (explode('?type=', $_SERVER['REQUEST_URI'])[1] != null) {
    if(explode('?type=', $_SERVER['REQUEST_URI'])[1] == 'ads'){
        $file = '/views/html/v2/ads_service_agreent-20181107final.pdf';
        $download = 'ads_service_agreent-20181107final.pdf';
        $include = '032513555859.html';
        $pay = '/v2/confirm-ads';
    } else if(explode('?type=', $_SERVER['REQUEST_URI'])[1] == 'event'){
        $file = '/views/html/v2/event_short_term_template_20181226.pdf';
        $download = 'event_short_term_template_20181226.pdf';
        $include = '032517535926.html';
        $pay = '/v2/confirm-event';
    }
} else {
    $file = '/views/html/v2/SH-LA-finalized_cn_20181207.pdf';
    $download = 'SH-LA-finalized_cn_20181207.pdf';
    $include = '031722430867.html';
    $pay = '/v2/confirm-leasing';
}

$scripts = $scripts. '<script type="text/javascript" src="/views/assets/base/js/v2/contract-admin.js"></script>';
?>

<div id="wrapper">
    <?php include ('navbar_top.php'); ?>
    <div id="page-wrapper">
        <div class="row">
            <div class="col-xs-12">
                <h4 class="page-header">查看合同</h4>
                <div class="panel panel-default">
                    <div class="panel-heading">
                        你可以在线阅读并下载合同
                        <div class="pull-right">
                            <div class="btn-group">
                                <button type="button" class="btn btn-default btn-xs dropdown-toggle" data-toggle="dropdown">
                                    操作
                                    <span class="caret"></span>
                                </button>
                                <ul class="dropdown-menu pull-right" role="menu">
                                    <li><a href="<?php echo $file; ?>" download="<?php echo $download; ?>">点击下载合同</a>
                                    </li>
                                    <li><a href="#" onclick="javascript: $('#stamp_video').modal('toggle');">同意并盖章</a>
                                    </li>
                                    <li><a href="<?php echo $pay; ?>">同意并付款</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="panel-body" style="overflow: auto;">
                    <?php include ($include); ?>
                    </div>
                </div>
            </div>
            <div class="col-xs-12" style="margin-bottom: 40px;">
                <center>
                    <a href="<?php echo $file; ?>" download="<?php echo $download; ?>" class="btn btn-success">点击下载</a>
                    <a href="#" onclick="javascript: $('#stamp_video').modal('toggle');" class="btn btn-success">同意并盖章</a>
                    <a href="<?php echo $pay; ?>" class="btn btn-success">同意并付款</a>
                </center>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="stamp_video" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-md">
        <div class="modal-content c-square">
            <div class="modal-body">
                <div class="col-md-6">
                    <div class="embed-responsive embed-responsive-4by3">
                        <iframe class="embed-responsive-item" src="/upload/video/stamp.mp4" frameborder="0" autoplay loop webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<?php include ('menu_bottom.php'); ?>

<?php include ('footer.php'); ?>