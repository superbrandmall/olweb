<div class="pull-right">
<?php
if(isset($_GET['p']) && $_GET['p'] == 'lotus-admin/contracts') {
?>
    <a href="javascript:void(0);" class="btn btn-outline btn-sm">合同台账</a>
<?php
}
?>
    <a href="javascript:void(0);" class="btn btn-outline btn-sm">结算预览</a>
    <div class="btn-group">
        <button type="button" class="btn btn-primary btn-sm dropdown-toggle" data-toggle="dropdown">
            <i class="fa fa-plus icon-white"></i> 创建
            <span class="caret"></span>
        </button>
        <ul class="dropdown-menu pull-right" role="menu">
            <li><a href="/lotus-admin/make-request">上海-新签租赁合同申请单</a></li>
            <li><a href="javascript: void(0);" id="createRenew">上海-续签租赁合同申请单</a></li>                   
            <li><a href="javascript: void(0);" id="createTerminate">上海-终止租赁合同申请单</a></li>
            <li><a href="javascript: void(0);" id="createModify">上海-变更租赁合同申请单</a></li>
        </ul>
    </div>
</div>