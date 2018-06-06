<?php
$scripts = $scripts. '<script type="text/javascript" src="views/assets/base/js/deposit.js"></script>';

?>
<style>
    .modal-body {
        padding: 10px;
    }
    .modal-header {
        border-bottom: none;
        background-color: #eee;
        padding: 10px;
    }
</style>
    
<!-- BEGIN: PAGE CONTAINER -->
<div class="c-layout-page">
    <!-- BEGIN: 标题 -->
	<div class="c-layout-breadcrumbs-1 c-fonts-uppercase c-fonts-bold">
		<div class="container">
			<div class="c-page-title c-pull-left">
				<h3 class="c-font-uppercase c-font-bold">缴纳租赁保证金</h3>
			</div>
			<ul class="c-page-breadcrumbs c-theme-nav c-pull-right c-fonts-regular">
				<li>
					<a href="/">首页</a>
				</li>
                <li>
					/
				</li>
                <li>
					<a href="my-info">我的信息</a>
				</li>
                <li>
					/
				</li>
                <li>
					<a href="my-contracts">我的合同</a>
				</li>
				<li>
					/
				</li>
				<li class="c-state_active">
					缴纳租赁保证金
				</li>
			</ul>
		</div>
	</div>
	<!-- END: 标题 -->
    <!-- BEGIN: 缴纳租赁保证金 -->
    <div class="c-content-box c-size-md c-bg-grey-1" style="margin-bottom: 0;">
        <div class="container">
            <div class="c-content-feedback-1 c-option-1">
                <div class="row">
                    <div class="col-md-12">
                        <div class="c-container c-bg-grey-1 c-bg-img-bottom-right" style="background-image:url(views/assets/base/img/content/misc/feedback_box_3.png);">
                            <div class="c-content-title-1">
                                <h3 class="c-font-uppercase c-font-bold">缴纳租赁保证金</h3>
                                <div class="c-line-left">
                                </div>
                                <object data="" type="application/pdf" width="100%" height="800px"> 
                                    <p>您的浏览器没有安装PDF插件
                                     您可以 <a href="#!">点此下载</a>租赁保证金账单
                                    </p>
                                </object>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- END: 缴纳租赁保证金 -->
    <div class="c-content-box c-size-md c-bg-white">
		<div class="container">
            <h1 class="c-font-uppercase c-font-bold">请选择支付方式</h1>
            <div class="c-body">
                <div class="c-content-tab-1 c-theme c-margin-t-30">
                    <div class="clearfix">
                        <ul class="nav nav-tabs c-font-uppercase c-font-bold">
                            <li class="active">
                                <a href="#tab_1_1_content" data-toggle="tab">网上银行</a>
                            </li>
                            <li>
                                <a href="#tab_1_2_content" data-toggle="tab">银联支付</a>
                            </li>
                        </ul>
                    </div>
                    <div class="tab-content c-bordered c-padding-lg">
                        <div class="tab-pane active" id="tab_1_1_content">
                            <form class="form-horizontal">
                                <div class="form-group bank-cards">
                                    <label class="col-md-2 control-label">付款银行</label>
                                    <div class="col-md-10">
                                    <input type="radio" id="gongshang" name="bank-cards"><label class="col-xs-6 col-sm-3" for="gongshang"><img class="img-responsive" src="views/assets/base/img/content/banks/bank-gongshang.jpg" alt=""></label>
                                    <input type="radio" id="nongye" name="bank-cards"><label class="col-xs-6 col-sm-3" for="nongye"><img class="img-responsive" src="views/assets/base/img/content/banks/bank-nongye.jpg" alt=""></label>
                                    <input type="radio" id="jianshe" name="bank-cards"><label class="col-xs-6 col-sm-3" for="jianshe"><img class="img-responsive" src="views/assets/base/img/content/banks/bank-jianshe.jpg" alt=""></a></label>
                                    <input type="radio" id="zhongguo" name="bank-cards"><label class="col-xs-6 col-sm-3" for="zhongguo"><img class="img-responsive" src="views/assets/base/img/content/banks/bank-zhongguo.jpg" alt=""></a></label>
                                    <input type="radio" id="zhaoshang" name="bank-cards"><label class="col-xs-6 col-sm-3" for="zhaoshang"><img class="img-responsive" src="views/assets/base/img/content/banks/bank-zhaoshang.jpg" alt=""></a></label>
                                    <input type="radio" id="youzheng" name="bank-cards"><label class="col-xs-6 col-sm-3" for="youzheng"><img class="img-responsive" src="views/assets/base/img/content/banks/bank-youzheng.jpg" alt=""></a></label>
                                    <input type="radio" id="guangfa" name="bank-cards"><label class="col-xs-6 col-sm-3" for="guangfa"><img class="img-responsive" src="views/assets/base/img/content/banks/bank-guangfa.jpg" alt=""></a></label>
                                    <input type="radio" id="pufa" name="bank-cards"><label class="col-xs-6 col-sm-3" for="pufa"><img class="img-responsive" src="views/assets/base/img/content/banks/bank-pufa.jpg" alt=""></a></label>
                                    <input type="radio" id="guangda" name="bank-cards"><label class="col-xs-6 col-sm-3" for="guangda"><img class="img-responsive" src="views/assets/base/img/content/banks/bank-guangda.jpg" alt=""></a></label>
                                    <input type="radio" id="yinlian" name="bank-cards"><label class="col-xs-6 col-sm-3" for="yinlian"><img class="img-responsive" src="views/assets/base/img/content/banks/bank-yinlian.jpg" alt=""></a></label>
                                    <input type="radio" id="visa" name="bank-cards"><label class="col-xs-6 col-sm-3" for="visa"><img class="img-responsive" src="views/assets/base/img/content/banks/bank-visa.jpg" alt=""></a></label>
                                    <input type="radio" id="master" name="bank-cards"><label class="col-xs-6 col-sm-3" for="master"><img class="img-responsive" src="views/assets/base/img/content/banks/bank-master.jpg" alt=""></a></label>
                                    </div>
                                </div>
                                <div class="form-group form-c-radios">
                                    <label class="col-md-2 control-label">卡片类型</label>
                                    <div class="col-md-10">
                                        <div class="c-radio-inline">
                                            <div class="c-radio has-error">
                                                <input id="radio4-112" class="c-radio" name="radios2" type="radio">
                                                <label for="radio4-112">
                                                <span></span>
                                                <span class="check"></span>
                                                <span class="box"></span>
                                                储蓄卡</label>
                                            </div>
                                            <div class="c-radio has-error">
                                                <input id="radio5-112" class="c-radio" checked="" name="radios2" type="radio">
                                                <label for="radio5-112">
                                                <span></span>
                                                <span class="check"></span>
                                                <span class="box"></span>
                                                信用卡</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="col-md-10 col-md-offset-1">
                                        <button type="submit" class="btn c-theme-btn c-btn-uppercase btn-lg c-btn-bold c-btn-square">跳转网银并支付</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div class="tab-pane" id="tab_1_2_content">
                            <form class="form-horizontal">
                                <div class="form-group bank-cards">
                                    <label class="col-md-2 control-label">付款方式</label>
                                    <div class="col-md-10">
                                        <input type="radio" id="unionpay" name="bank-cards" checked><label class="col-xs-6 col-sm-3" for="unionpay"><img class="img-responsive" src="views/assets/base/img/content/banks/unionpay.jpg" alt=""></label>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="col-md-10 col-md-offset-1">
                                        <a href="javascript: void(0);" data-toggle="modal" data-target="#lock" class="btn c-theme-btn c-btn-uppercase btn-lg c-btn-bold c-btn-square">跳转银联并支付</a>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
		</div>
	</div>
    
    <div id="lock" class="modal fade text-center" role="dialog" style="top: 25%;">
        <div class="modal-dialog">
            <div class="modal-content c-square">
                <div class="modal-header">
                    <h4 class="modal-title" id="myModalLabel">确认支付</h4>
                </div>
                <div class="modal-body">
                    <p>
                        请在新打开的页面进行支付!
                    </p>
                    <p>
                        <small>支付完成前请不要关闭此窗口</small>
                    </p>
                    <center>
                        <button type="button" class="btn c-theme-btn c-btn-square c-btn-bold c-btn-uppercase">已完成支付</button>
                        <button type="button" class="btn c-theme-btn c-btn-border-2x c-btn-square c-btn-bold c-btn-uppercase" data-dismiss="modal">更换支付方式</button>
                        <br><br>
                        <p>
                            <small>支付遇到问题？请联系 <a href="javascript: void(0);">Online Leasing客服</a> 获得帮助</small>
                        </p>
                    </center>
                </div>
            </div>
            <!-- /.modal-content -->
        </div>
    </div>
</div>

<?php include ('footer.php'); ?>