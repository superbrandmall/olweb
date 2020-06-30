<?php
$scripts = $scripts. '<script type="text/javascript" src="/views/assets/base/js/v2/contract-view-admin.js"></script>'
        . '<script src="/views/assets/plugins/pdfjs/build/pdf.worker.js" type="text/javascript"></script>';
?>

<?php include ('navbar_top.php'); ?>
<div class="weui-toptips bg-success topTips"><i class="fa fa-smile-o" aria-hidden="true"></i> 尊敬的阁下，请查收我们为您精心准备的合同。如果没问题请点击"同意并用印"进入用印环节吧！</div>

<div class="weui-cells" id="download_links">
    <a class="weui-cell weui-cell_access" href="javascript: showContract();" style="width: 40%; float: left;">
        <div class="weui-cell__bd">
            <p>查看合同</p>
        </div>
        <div class="weui-cell__ft"></div>
    </a>
</div>

<div class="weui-cells__title">签约须知</div>
<div class="weui-cells">
    <div class="weui-cell">
        <div class="weui-cell__hd"><i class="fa fa-check" style="color: #07c160; margin-right: 16px;" aria-hidden="true"></i></div>
        <div class="weui-cell__bd">
            <p>承租方用于签约的证件和执照应合法有效；</p>
        </div>
    </div>
    <div class="weui-cell">
        <div class="weui-cell__hd"><i class="fa fa-check" style="color: #07c160; margin-right: 16px;" aria-hidden="true"></i> </div>
        <div class="weui-cell__bd">
            <p>不得私自转租，否则转租人需承担违约责任甚至会导致合同解除；</p>
        </div>
    </div>
    <div class="weui-cell">
        <div class="weui-cell__hd"><i class="fa fa-check" style="color: #07c160; margin-right: 16px;"  aria-hidden="true"></i> </div>
        <div class="weui-cell__bd">
            <p>中途解约需提前90天申请；</p>
        </div>
    </div>
    <div class="weui-cell">
        <div class="weui-cell__hd"><i class="fa fa-check" style="color: #07c160; margin-right: 16px;" aria-hidden="true"></i> </div>
        <div class="weui-cell__bd">
            <p>承租方在未交保证金前，出租方可以将房屋另行出租，且不承担任何违约责任。</p>
        </div>
    </div>
    <div class="weui-cell">
        <table style="font-size: 12px;">
            <thead>
                <tr>
                    <th style="width: 33%;">解约类型</th>
                    <th>违约金</th>
                    <th style="width: 34%;">注意事项</th>
                </tr>
            </thead>
            <tbody>
                <tr><td title="解约类型">7天不满意</td><td title="违约金">0违约金</td><td title="注意事项">需在签约后7日内发起申请，7日内办理。</td></tr>
                <tr><td title="解约类型">欠租</td><td title="违约金">200%保证金</td><td title="注意事项">欠租超过30日合同即解除</td></tr>
                <tr><td title="解约类型">擅自转租</td><td title="违约金">200%保证金</td><td title="注意事项">起租日前不支持转租，已使用租期短于2年（含）不支持转租</td></tr>
                <tr><td title="解约类型">换租</td><td title="违约金">0违约金</td><td title="注意事项">需提前90天申请，新铺旧铺衔接期小于等于0天，新合同无装修免租期</td></tr>
                <tr><td title="解约类型">提前退租</td><td title="违约金">100%保证金</td><td title="注意事项">需提前90天申请</td></tr>
                <tr><td title="解约类型">到期</td><td title="违约金">0违约金</td><td title="注意事项">不得超期占用</td></tr>
            </tbody>
        </table>
    </div>
    <div class="weui-panel weui-panel_access">
        <div class="weui-panel__bd">
            <div class="weui-media-box weui-media-box_text">
                <h4 class="weui-media-box__title">7天不满意无理由换租</h4>
                <p class="weui-media-box__desc">- 指租户在合同签订日后的7个自然日内发起退租申请并在7个自然日内完成换租手续办理的情形，期间产生的租金和物业管理费租户照约支付，剩余租金、物业管理费和保证金在5个工作日内退还到原账户。如超过7天未办理表示放弃办理。请在租约变更页面点击“我要退租”完成申请。</p>
                <p class="weui-media-box__desc">- 转租、换租、续租租户不享受7天无理由换租。</p>
            </div>
            <div class="weui-media-box weui-media-box_text">
                <h4 class="weui-media-box__title">合同到期退租</h4>
                <p class="weui-media-box__desc">请在到期日前在租约变更页面点击“我要退租”完成申请，并按时完成如下退租手续：</p>
                <p class="weui-media-box__desc">- 结清各项费用，剩余保证金在5个工作日内退还到原账户；</p>
                <p class="weui-media-box__desc">- 商铺复原或支付拆除费委托出租方复原；</p>
                <p class="weui-media-box__desc">- 30日内完成证照注销或迁移。</p>
            </div>
            <div class="weui-media-box weui-media-box_text">
                <h4 class="weui-media-box__title">合同未到期退租</h4>
                <p class="weui-media-box__desc">请至少提前90天在租约变更页面点击“我要退租”完成申请。</p>
                <p class="weui-media-box__desc">- 交付日前退租租户需承担30%保证金做为违约金；</p>
                <p class="weui-media-box__desc">- 交付日后退租未提前90天申请退租的，可以支付相应天数的代通知金并承担100%保证金做为违约金。</p>
            </div>
        </div>
    </div>
</div>
<div class="weui-btn-area">
    <button type="button" class="weui-btn weui-btn_default" onclick="javascript: window.history.back(-1);">返回</button>
</div>

<div id="contract_pdf" class="weui-gallery" style="display: none;">
    <iframe id="pdfContainer" src="#" width="100%" frameborder="0" style="height: 90vh;"></iframe>
    <div class="weui-gallery__opr">
        <a href="javascript:;" class="weui-gallery__del">
            <i class="fa fa-times" aria-hidden="true" style="color: #fff;" onclick='$("#contract_pdf").hide();'></i>
        </a>
    </div>
</div>

<div id="engineering_pdf" class="weui-gallery" style="display: none;">
    <iframe id="engineeringContainer" src="#" width="100%" frameborder="0" style="height: 90vh;"></iframe>
    <div class="weui-gallery__opr">
        <a href="javascript:;" class="weui-gallery__del">
            <i class="fa fa-times" aria-hidden="true" style="color: #fff;" onclick='$("#engineering_pdf").hide();'></i>
        </a>
    </div>
</div>

<br>
<br>
<br>

<?php include ('menu_bottom.php'); ?>
<?php include ('footer.php'); ?>