<?php
$scripts = $scripts. '<script type="text/javascript" src="/views/assets/base/js/admin/merchants-tianyancha-admin.js"></script>';
?>

<div id="wrapper">
    <?php include ('navbar_top.php'); ?>
    <?php include ('navbar_side.php'); ?>
    <div id="page-wrapper">
        <div class="row">
            <div class="col-lg-12">
                <h1 class="page-header">商户调查</h1>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-12">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        商户调查
                    </div>
                    <!-- /.panel-heading -->
                    <div class="panel-body">
                        <ul class="nav nav-tabs">
                            <li class="active"><a href="#court_announcement" data-toggle="tab">法院公告</a>
                            </li>
                            <li><a href="#lawsuits" data-toggle="tab">法律诉讼</a>
                            </li>
                            <li><a href="#illegal_info" data-toggle="tab">严重违法</a>
                            </li>
                            <li><a href="#own_tax" data-toggle="tab">欠税公告</a>
                            </li>
                            <li><a href="#punishment_info" data-toggle="tab">行政处罚</a>
                            </li>
                        </ul>
                        <div class="tab-content">
                            <div id="court_announcement" class="tab-pane fade in active">
                                <div class="table-responsive">
                                    <table class="table table-striped table-bordered table-hover">
                                        <thead>
                                            <tr>
                                                <th>公告号</th>
                                                <th>公告类型名称</th>
                                                <th>案件内容</th>
                                                <th>法院名</th>
                                                <th>处理等级</th>
                                                <th>法官</th>
                                                <th>原告</th>
                                                <th>当事人</th>
                                                <th>省份</th>
                                                <th>刊登日期</th>
                                                <th>刊登版面</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        </tbody>
                                    </table>
                                </div>
                                <!-- /.table-responsive -->
                            </div>
                            <div id="lawsuits" class="tab-pane fade">
                                <div class="table-responsive">
                                    <table class="table table-striped table-bordered table-hover">
                                        <thead>
                                            <tr>
                                                <th>案件号</th>
                                                <th>案件类型</th>
                                                <th>文书类型</th>
                                                <th>法院</th>
                                                <th>提交时间</th>
                                                <th>标题</th>
                                                <th>原文链接地址</th>
                                                <th>唯一标识符</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        </tbody>
                                    </table>
                                </div>
                                <!-- /.table-responsive -->
                            </div>
                            <div id="illegal_info" class="tab-pane fade">
                                <div class="table-responsive">
                                    <table class="table table-striped table-bordered table-hover">
                                        <thead>
                                            <tr>
                                                <th>列入原因</th>
                                                <th>列入日期</th>
                                                <th>决定列入部门(作出决定机关)</th>
                                                <th>移除原因</th>
                                                <th>决定移除部门</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        </tbody>
                                    </table>
                                </div>
                                <!-- /.table-responsive -->
                            </div>
                            <div id="own_tax" class="tab-pane fade">
                                <div class="table-responsive">
                                    <table class="table table-striped table-bordered table-hover">
                                        <thead>
                                            <tr>
                                                <th>证件号码</th>
                                                <th>法人或负责人名称</th>
                                                <th>经营地点</th>
                                                <th>当前新发生欠税余额</th>
                                                <th>纳税人名称</th>
                                                <th>欠税余额</th>
                                                <th>纳税人识别号</th>
                                                <th>0国税 1地税</th>
                                                <th>欠税税种</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        </tbody>
                                    </table>
                                </div>
                                <!-- /.table-responsive -->
                            </div>
                            <div id="punishment_info" class="tab-pane fade">
                                <div class="table-responsive">
                                    <table class="table table-striped table-bordered table-hover">
                                        <thead>
                                            <tr>
                                                <th>行政处罚内容</th>
                                                <th>行政处罚决定书文号</th>
                                                <th>注册号</th>
                                                <th>名称</th>
                                                <th>省份</th>
                                                <th>作出行政处罚决定日期</th>
                                                <th>法定代表人（负责人）姓名</th>
                                                <th>违法行为类型</th>
                                                <th>作出行政处罚决定机关名称</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        </tbody>
                                    </table>
                                </div>
                                <!-- /.table-responsive -->
                            </div>
                        </div>
                    </div>
                    <!-- /.panel-body -->
                </div>
            </div>
        </div>
    </div>
</div>

<?php include ('footer.php'); ?>