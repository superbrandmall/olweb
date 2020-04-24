<?php
$scripts = $scripts. '<script type="text/javascript" src="/views/assets/base/js/v2/info-admin.js"></script>';
?>

<?php include ('navbar_top.php'); ?>

<div class="page__bd" style="background-color: #EDEDED;">
    <div class="weui-panel weui-cell_access">
        <div class="weui-panel__bd">
            <div class="weui-media-box weui-media-box_appmsg">
                <div class="weui-media-box__hd">
                    <img class="weui-media-box__thumb" src="/views/assets/base/img/content/brands-admin/avatar.png" alt="">
                </div>
                <div class="weui-media-box__bd">
                    <h4 id="uid" class="weui-media-box__title"></h4>
                    <p class="weui-media-box__desc"></p>
                </div>
                <a class="weui-cell__ft" href="/v2/improve-info" style="font-size: 15px;">完善信息</a>
            </div>
        </div>
    </div>

    <div class="weui-header bg-blue" style="height: 40px;"> 
        <div class="weui-header-left" style="font-size: 14px; top: 10px;"><i class="fa fa-info-circle" aria-hidden="true"></i> 完善资料有助于订单审核通过</div>
    </div>

    <img style="width: 100%;" src="/views/assets/base/img/content/backgrounds/640.gif" alt="">

    <div class="weui-panel" style="margin-top: -5px;">
        <div class="weui-panel__bd">
            <div class="weui-media-box weui-media-box_small-appmsg">
                <div class="weui-cells">
                    <a class="weui-cell weui-cell_active weui-cell_access" href="/v2/all-orders">
                        <div class="weui-cell__hd">
                            <i class="fa fa-clipboard" aria-hidden="true" style="margin-right: 10px;"></i>
                        </div>
                        <div class="weui-cell__bd weui-cell_primary">
                            <p>订单管理</p>
                        </div>
                        <span class="weui-cell__ft"></span>
                    </a>
                    <a class="weui-cell weui-cell_active weui-cell_access" href="#!">
                        <div class="weui-cell__hd">
                            <i class="fa fa-comment-o" aria-hidden="true" style="margin-right: 10px;"></i>
                        </div>
                        <div class="weui-cell__bd weui-cell_primary">
                            <p>我的询价</p>
                        </div>
                        <span class="weui-cell__ft"></span>
                    </a>
                    <a class="weui-cell weui-cell_active weui-cell_access" href="#!">
                        <div class="weui-cell__hd">
                            <i class="fa fa-heart" aria-hidden="true" style="margin-right: 10px;"></i>
                        </div>
                        <div class="weui-cell__bd weui-cell_primary">
                            <p>我的关注</p>
                        </div>
                        <span class="weui-cell__ft"></span>
                    </a>
                </div>
            </div>
        </div>
    </div>
    
    <div class="weui-panel">
        <div class="weui-panel__bd">
            <div class="weui-media-box weui-media-box_small-appmsg">
                <div class="weui-cells">
                    <a class="weui-cell weui-cell_active weui-cell_access" href="#!">
                        <div class="weui-cell__hd">
                            <i class="fa fa-user-circle-o" aria-hidden="true" style="margin-right: 10px;"></i>
                        </div>
                        <div class="weui-cell__bd weui-cell_primary">
                            <p>联系人管理</p>
                        </div>
                        <span class="weui-cell__ft"></span>
                    </a>
                    <a class="weui-cell weui-cell_active weui-cell_access" href="#!">
                        <div class="weui-cell__hd">
                            <i class="fa fa-print" aria-hidden="true" style="margin-right: 10px;"></i>
                        </div>
                        <div class="weui-cell__bd weui-cell_primary">
                            <p>我的票据</p>
                        </div>
                        <span class="weui-cell__ft"></span>
                    </a>
                    <a class="weui-cell weui-cell_active weui-cell_access" href="#!">
                        <div class="weui-cell__hd">
                            <i class="fa fa-file-text" aria-hidden="true" style="margin-right: 10px;"></i>
                        </div>
                        <div class="weui-cell__bd weui-cell_primary">
                            <p>发票抬头</p>
                        </div>
                        <span class="weui-cell__ft"></span>
                    </a>
                </div>
            </div>
        </div>
    </div>
    
    <div class="weui-panel">
        <div class="weui-panel__bd">
            <div class="weui-media-box weui-media-box_small-appmsg">
                <div class="weui-cells">
                    <a class="weui-cell weui-cell_active weui-cell_access" href="#!">
                        <div class="weui-cell__hd">
                            <i class="fa fa-question-circle" aria-hidden="true" style="margin-right: 10px;"></i>
                        </div>
                        <div class="weui-cell__bd weui-cell_primary">
                            <p>联系客服</p>
                        </div>
                        <span class="weui-cell__ft"></span>
                    </a>
                    <a class="weui-cell weui-cell_active weui-cell_access" href="#!">
                        <div class="weui-cell__hd">
                            <i class="fa fa-life-saver" aria-hidden="true" style="margin-right: 10px;"></i>
                        </div>
                        <div class="weui-cell__bd weui-cell_primary">
                            <p>帮助中心</p>
                        </div>
                        <span class="weui-cell__ft"></span>
                    </a>
                </div>
            </div>
        </div>
    </div>
</div>
<br><br><br><br>

<?php include ('menu_bottom.php'); ?>

<?php include ('footer.php'); ?>