<?php
if(isset($_SESSION['lotus_admin_name']) && $_SESSION['lotus_admin_name'] == '马俊') {
    $scripts = $scripts .PHP_EOL. '        <script type="text/javascript" src="/views/assets/plugins/tour/tour.js"></script>'.PHP_EOL
    . '        <script type="text/javascript" src="/views/assets/base/js/lotus-admin/todo-admin.js"></script>'.PHP_EOL;
?>
<link rel="stylesheet" type="text/css" href="/views/assets/plugins/tour/tour.css"/>
<style type="text/css">
    #box{
        position: absolute;
        top: 40px;
        left: 140px;
        width: 80%;
        margin: 0 auto;
        padding-top: 40px;
        overflow: hidden;
        z-index: 10001;
        color: #fff;
        font-size: 16px;
    }
    
    #box h2 {
        text-align: center;
        margin-bottom: 30px;
    }
    
    #box i {
        color: #4de6cf;
        margin-right: 10px;
    }
    
    #box li {
        line-height: 24px;
    }
    
    #box1{
        display: none;
        height: 250px;
        width: 1000px;
        margin: 0 auto;
        background: rgba(0,0,0,0.5);
        padding: 1px;
    }
    
    #box2{
        display: none;
        height: 250px;
        width: 1000px;
        margin: 0 auto;
        background: rgba(0,0,0,0.5);
        padding: 1px;
    }
    
    #box3{
        display: none;
        height: 250px;
        width: 1000px;
        margin: 0 auto;
        background: rgba(0,0,0,0.5);
        padding: 1px;
    }
</style>
<?php
} else {
    $scripts = $scripts .PHP_EOL. '        <script type="text/javascript" src="/views/assets/base/js/lotus-admin/encrypted/todo.js"></script>'.PHP_EOL;
}
?>
<?php $_SESSION['record_url'] = 'http://'.$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI']; ?>
<?php include 'sidebar.php'; ?>

<?php
if(isset($_SESSION['lotus_admin_name']) && $_SESSION['lotus_admin_name'] == '马俊') {
?>
<div id="box">
    <div id="box1">
        <h2>背景回顾</h2>
        <ul>
            <li><i class="fa fa-check"></i> 2021年底接手，面对不同城市、门店，没有顺手好用的招商管理工具</li>
            <li><i class="fa fa-check"></i> 特别项目组就是船上的马达，服务于莲花招商，服务于未来</li>
            <li><i class="fa fa-check"></i> 快速实现系统功能，做到先进、有弹性、可扩展</li>
            <li><i class="fa fa-check"></i> 用系统来解决问题，找到解决方案</li>
        </ul>
    </div>
    <div id="box2">
        <h2>当前状况</h2>
        <ul>
            <li><i class="fa fa-check"></i> 花钱不多、自主研发、组织精简、覆盖华东 (快速响应)</li>
            <li><i class="fa fa-check"></i> 已对全国各区域的招商作了系统操作培训</li>
            <li><i class="fa fa-check"></i> 已与上海财务确定结算规则</li>
            <li><i class="fa fa-check"></i> 已在测试SAP接口</li>
        </ul>
    </div>
    <div id="box3">
        <h2>下步计划</h2>
        <ul>
            <li><i class="fa fa-check"></i> 打通SAP，实现业务闭环。招商在系统中申请合同，财务在系统中做应收账款</li>
            <li><i class="fa fa-check"></i> 紧密配合各业务部门/人员</li>
            <li><i class="fa fa-check"></i> 积极参与莲花招商业务的相关会议，了解难点并提供帮助</li>
            <li><i class="fa fa-check"></i> 24年预算by门店by月</li>
            <li><i class="fa fa-check"></i> 品牌落位</li>
        </ul>
    </div>
</div>

<?php
}
?>

<div class="content-wrapper">
    <section class="content" style="margin-top: 50px;">
        <div id="webui">
            <div class="row">
                <div class="col-md-8">
                    <div class="box">
                        <div class="box-body">
                            <h4 style="display: inline-block;">待办事项</h4>
                            <div class="pull-right">
                                <ul class="nav nav-tabs" style="margin-bottom: 1px;">
                                    <li class="active"><a href="#toDoList" data-toggle="tab">我的待办<span id="toDoCount"></span></a></li>
                                    <li class="hidden-xs"><a href="#doneList" data-toggle="tab">我的已办<span id="doneCount"></span></a></li>
                                    <li class="hidden-xs"><a href="#draftList" data-toggle="tab">草稿箱<span id="draftCount"></span></a></li>
                                </ul>
                            </div>
                            <hr style="margin: 0; width: 100%;">
                            <div class="tab-content">
                                <div class="tab-pane fade in active" id="toDoList">
                                    <div class="bootstrap-table">
                                        <div class="fixed-table-container" style="border: none;">
                                            <div class="fixed-table-body" style="height: 300px;">
                                                <table class="table borderless table-responsive">
                                                    <thead id="assetsListingTable-sticky-header">
                                                        <tr>
                                                            <th>
                                                                <div class="th-inner">标题</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">发起人</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">接收时间</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">最新状态</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody id="toDoListBody"></tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="tab-pane fade" id="doneList">
                                    <div class="bootstrap-table">
                                        <div class="fixed-table-container" style="border: none;">
                                            <div class="fixed-table-body" style="height: 300px;">
                                                <table class="table borderless table-responsive">
                                                    <thead id="assetsListingTable-sticky-header">
                                                        <tr>
                                                            <th>
                                                                <div class="th-inner">标题</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">发起人</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">处理时间</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">最新状态</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody id="doneListBody"></tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="tab-pane fade" id="draftList">
                                    <div class="bootstrap-table">
                                        <div class="fixed-table-container" style="border: none;">
                                            <div class="fixed-table-body" style="height: 300px;">
                                                <table class="table borderless table-responsive">
                                                    <thead id="assetsListingTable-sticky-header">
                                                        <tr>
                                                            <th>
                                                                <div class="th-inner">标题</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">表单类型</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">修改时间</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">操作</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody id="draftListBody"></tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="box">
                        <div class="box-body">
                            <h4 style="display: inline-block;">我的消息</h4>
                            <hr style="margin: 0; width: 100%;">
                            <div class="tab-content">
                                <div class="tab-pane fade in active">
                                    <div class="bootstrap-table">
                                        <div class="fixed-table-container" style="border: none;">
                                            <div class="fixed-table-body" style="height: 300px;"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-8">
                    <div class="box">
                        <div class="box-body">
                            <h4 style="display: inline-block;">常用文件</h4>
                            <hr style="margin: 0; width: 100%;">
                            <div class="tab-content">
                                <div class="tab-pane fade in active" id="files">
                                    <div class="bootstrap-table">
                                        <div class="fixed-table-container" style="border: none;">
                                            <div class="fixed-table-body" style="height: 200px;">
                                                <table class="table borderless table-responsive">
                                                    <thead id="assetsListingTable-sticky-header">
                                                        <tr>
                                                            <th>
                                                                <div class="th-inner">附件类型</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">上传时间</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">文件名</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">大小</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">操作</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody id="filesBody">
                                                        <tr>
                                                            <td>操作手册</td>
                                                            <td>2023.08.28 11:18:30</td>
                                                            <td>Lotus招商管理系统操作手册_v2.5.pdf</td>
                                                            <td>6.6Mb</td>
                                                            <td><a href="/upload/manual/Lotus招商管理系统操作手册_v2.5.pdf" target="_blank">查看文件</a></td>
                                                        </tr>
                                                        <tr>
                                                            <td>操作指南</td>
                                                            <td>2023.05.06 10:29:33</td>
                                                            <td>Lotus招商系统快速操作指南v0.1.pptx</td>
                                                            <td>4.3Mb</td>
                                                            <td><a href="/upload/manual/Lotus招商系统快速操作指南v0.1.pptx" target="_blank">查看文件</a></td>
                                                        </tr>
                                                        <tr>
                                                            <td>审批节点模版</td>
                                                            <td>2023.05.06 10:29:37</td>
                                                            <td>莲花租赁流程审批人员表.xlsx</td>
                                                            <td>58Kb</td>
                                                            <td><a href="/upload/manual/莲花租赁流程审批人员表.xlsx" target="_blank">查看文件</a></td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="box">
                        <div class="box-body">
                            <h4 style="display: inline-block;">公告</h4>
                            <div class="pull-right" style="margin-top: 9px;">
                                <a hfef="javascript:void(0);"><i class="fa fa-angle-right"></i></a>
                            </div>
                            <hr style="margin: 0; width: 100%;">
                            <div class="tab-content">
                                <div class="tab-pane fade in active">
                                    <div class="bootstrap-table">
                                        <div class="fixed-table-container" style="border: none;">
                                            <div class="fixed-table-body" style="height: 200px;"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>

<?php include 'component/investment-todo-request-modify-create.php'; ?>

<?php include 'footer.php'; ?>