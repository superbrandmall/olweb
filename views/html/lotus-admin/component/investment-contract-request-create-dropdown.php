<div class="pull-right">
    <div class="btn-group">
        <button type="button" class="btn btn-primary btn-sm dropdown-toggle" data-toggle="dropdown">
            <i class="fa fa-plus icon-white"></i> 创建
            <span class="caret"></span>
        </button>
        <ul class="dropdown-menu pull-right" role="menu">
            <li><a href="/lotus-admin/make-request">新签租赁合同申请单</a></li>
            <li><a href="javascript: void(0);" id="createRenew">续签租赁合同申请单</a></li>                   
            <li><a href="javascript: void(0);" id="createTerminate">终止租赁合同申请单</a></li>
            <li><a href="javascript: void(0);" id="createModify">变更租赁合同申请单</a></li>
            <?php
            if(isset($_SESSION['lotus_admin_name']) && ($_SESSION['lotus_admin_name'] == '马俊' || $_SESSION['lotus_admin_name'] == '刘方琨')) {
            ?>
            <li><a href="javascript: void(0);" id="createContract">青岛区-初始化租赁合同</a></li>
            <?php
            }
            ?>
        </ul>
    </div>
</div>