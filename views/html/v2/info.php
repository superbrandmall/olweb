<?php
$scripts = $scripts. '<script type="text/javascript" src="/views/assets/base/js/v2/info-admin.js"></script>';
?>

<?php include ('navbar_top.php'); ?>
<div class="weui-toptips bg-success topTips"><i class="fa fa-smile-o" aria-hidden="true"></i> 这里是您的个人主页，您能随时"完善信息"，也可以在"订单管理"追踪订单进度哦！</div>

<div class="page__bd" style="background-color: #EDEDED;">
    <div class="weui-panel weui-cell_access">
        <div class="weui-panel__bd">
            <div class="weui-media-box weui-media-box_appmsg">
                <div class="weui-media-box__hd">
                    <img class="weui-media-box__thumb" src="/views/assets/base/img/content/brands-admin/avatar.png" alt="">
                </div>
                <div class="weui-media-box__bd">
                    <h4 id="uid" class="weui-media-box__title"></h4>
                    <p id="contact_name_1" class="weui-media-box__desc"></p>
                </div>
                <a class="weui-cell__ft" href="/v2/improve-info" style="font-size: 15px; color: #576b95;">完善信息</a>
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
                            <i class="fa fa-clipboard" aria-hidden="true" style="margin-right: 10px; color: #fa9d3b;"></i>
                        </div>
                        <div class="weui-cell__bd weui-cell_primary">
                            <p>订单管理</p>
                        </div>
                        <span class="weui-cell__ft"></span>
                    </a>
                    <!--<a class="weui-cell weui-cell_active weui-cell_access" href="#!">
                        <div class="weui-cell__hd">
                            <i class="fa fa-comment-o" aria-hidden="true" style="margin-right: 10px; color: #6467f0;"></i>
                        </div>
                        <div class="weui-cell__bd weui-cell_primary">
                            <p>我的询价</p>
                        </div>
                        <span class="weui-cell__ft"></span>
                    </a>
                    <a class="weui-cell weui-cell_active weui-cell_access" href="#!">
                        <div class="weui-cell__hd">
                            <i class="fa fa-heart" aria-hidden="true" style="margin-right: 10px; color: #fa5151;"></i>
                        </div>
                        <div class="weui-cell__bd weui-cell_primary">
                            <p>我的关注</p>
                        </div>
                        <span class="weui-cell__ft"></span>
                    </a>-->
                </div>
            </div>
        </div>
    </div>
    
    <div class="weui-panel">
        <div class="weui-panel__bd">
            <div class="weui-media-box weui-media-box_small-appmsg">
                <div class="weui-cells">
                    <a class="weui-cell weui-cell_active weui-cell_access" href="/v2/company-info">
                        <div class="weui-cell__hd">
                            <i class="fa fa-user-circle-o" aria-hidden="true" style="margin-right: 10px; color: #1485ee;"></i>
                        </div>
                        <div class="weui-cell__bd weui-cell_primary">
                            <p>商户管理</p>
                        </div>
                        <span class="weui-cell__ft"></span>
                    </a>
                    <a class="weui-cell weui-cell_active weui-cell_access" href="/v2/my-files">
                        <div class="weui-cell__hd">
                            <i class="fa fa-print" aria-hidden="true" style="margin-right: 10px; color: #ffc300;"></i>
                        </div>
                        <div class="weui-cell__bd weui-cell_primary">
                            <p>我的文件</p>
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
                    <a class="weui-cell weui-cell_active weui-cell_access" href="/v2/contact">
                        <div class="weui-cell__hd">
                            <i class="fa fa-question-circle" aria-hidden="true" style="margin-right: 10px; color: #10aeff;"></i>
                        </div>
                        <div class="weui-cell__bd weui-cell_primary">
                            <p>联系客服</p>
                        </div>
                        <span class="weui-cell__ft"></span>
                    </a>
                    <a class="weui-cell weui-cell_active weui-cell_access" href="/v2/qa">
                        <div class="weui-cell__hd">
                            <i class="fa fa-life-saver" aria-hidden="true" style="margin-right: 10px; color: #91d300;"></i>
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