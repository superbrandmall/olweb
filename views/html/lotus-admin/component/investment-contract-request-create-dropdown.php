<div class="pull-right">
<?php
if(isset($_GET['p']) && $_GET['p'] == 'lotus-admin/contracts') {
?>
    <a href="/lotus-admin/standing-book" class="btn btn-outline btn-sm">合同台账</a>
<?php
}
?>
    <a href="/lotus-admin/contract-balance-preview" class="btn btn-outline btn-sm">结算预览</a>
    <div class="btn-group">
        <button type="button" class="btn btn-primary btn-sm dropdown-toggle" data-toggle="dropdown">
            <i class="fa fa-plus icon-white"></i> 创建
            <span class="caret"></span>
        </button>
        <ul class="dropdown-menu pull-right" role="menu">
            <li><a href="/lotus-admin/make-request">新合同申请单</a></li>
            <li><a href="javascript: void(0);" id="createRenew">合同续签申请单</a></li>                   
            <li><a href="javascript: void(0);" id="createTerminate">合同终止申请单</a></li>
            <li><a href="javascript: void(0);" id="createModify">合同变更申请单</a></li>
            <!--<li class="divider"></li>
            <li><a href="javascript: void(0);" id="createContract">初始化租赁合同</a></li>-->
        </ul>
    </div>
</div>