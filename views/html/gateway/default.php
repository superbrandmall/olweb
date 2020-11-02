<div class="container">
    <div class="row">
        <div class="col-lg-12">
            <h1 class="page-header">
                <p style="font-size: 16px; margin-bottom: 20px;">感谢贵司对"<span id="org"></span>"的信赖。贵我双方已经签定<span id="mall"></span>的<span id="type"></span>合同双方已完成签章, 已到付款环节。</p>
                <small>本订单应付金额</small> ¥ <span id="amount"></span> <small>(含税费 ¥ <span id="tax"></span>)</small>
            </h1>
            <ul style="padding-left: 15px;">
                <li>商户交易号: <strong id="outTradeNo"></strong></li>
          	<li>位置: <strong id="unitDesc"></strong></li>
                <li class="leasing_price" style="display: none;">装修期满后首月固定租金(含税): ¥ <strong id="Gamount"></strong></li>
          	<li class="leasing_price" style="display: none;">租赁期内首月物业管理费(含税): ¥ <strong id="Wamount"></strong></li>
          	<li class="leasing_price" style="display: none;">租赁保证金(含税): ¥ <strong id="depositAmount"></strong></li>
          	<li class="leasing_price" style="display: none;">数据采集设备押金: ¥ <strong>3,000</strong></li>
                <li class="adevent_price" style="display: none;">租金(含税): ¥ <strong id="adevent_rent"></strong></li>
                <li class="adevent_price" style="display: none;">保证金: ¥ <strong id="adevent_deposit"></strong></li>
            </ul>
            <div><small>* 应缴金额 = 保证金 + 首月固定租金与物业管理费 (含税)</small></div>
            <div><small>* 保证金构成 = 3 x (最高月固定租金 + 物业管理费) (含税)</small></div>
        </div>
    </div>
    
    <div class="row">
        <div class="col-lg-12">
            <h3 class="page-header">请选择银行网银 <span id="bankChosen" style="display: none; color: #ff4d4c;"></span></h3>
        </div>
    </div>

    <div class="row">
        <div class="col-sm-3 col-xs-6 portfolio-item">
            <a href="javascript:;" data-id="04100001001" data-name="平安银行"><img class="img-responsive" src="/views/assets/base/img/content/banks/bank-pingan.jpg"></a>
        </div>

        <div class="col-sm-3 col-xs-6 portfolio-item">
            <a href="javascript:;" data-id="03040001002" data-name="华夏银行"><img class="img-responsive" src="/views/assets/base/img/content/banks/bank-huaxia.jpg"></a>
        </div>

        <div class="col-sm-3 col-xs-6 portfolio-item">
            <a href="javascript:;" data-id="03080001000" data-name="招商银行"><img class="img-responsive" src="/views/assets/base/img/content/banks/bank-zhaoshang.jpg"></a>
        </div>

        <div class="col-sm-3 col-xs-6 portfolio-item">
            <a href="javascript:;" data-id="03030001001" data-name="中国光大银行"><img class="img-responsive" src="/views/assets/base/img/content/banks/bank-guangda.jpg"></a>
        </div>
    </div>
    <div class="row">
        <div class="col-sm-3 col-xs-6 portfolio-item">
            <a href="javascript:;" data-id="03050001001" data-name="中国民生银行"><img class="img-responsive" src="/views/assets/base/img/content/banks/bank-minsheng.jpg"></a>
        </div>
    </div>
    <hr>
    <div class="row text-center">

        <div class="col-lg-12">
            <button type="button" data-toggle="modal" data-target="#myModal" class="btn" style="background-color: #ff4d4c; color: #fff; padding: 10px 30px; float: right;">跳转网银支付</button>
        </div>
    </div>
</div>

<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                        &times;
                </button>
                <h4 class="modal-title" id="myModalLabel">
                    注意
                </h4>
            </div>
            <div class="modal-body">
                请在打开网银支付页面后的30分钟内完成支付。
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭
                </button>
                <button id="redirect" type="button" class="btn btn-warning">
                    确定
                </button>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="freezing" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" data-backdrop='static'>
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title" id="myModalLabel">提示</h4>
            </div>
            <div class="modal-body">
                支付中。。。<span id="payment_result"></span>
            </div>
        </div>
    </div>
</div>

<?php include ('footer.php'); ?>