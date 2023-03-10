<div class="pull-right">
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
            <?php
            if(isset($_SESSION['lotus_admin_name']) && $_SESSION['lotus_admin_name'] == '刘方琨') {
                echo '<li><a href="javascript: void(0);" id="createContract">青岛凤凰城&辽阳西路-初始化租赁合同</a></li>';
            } else if(isset($_SESSION['lotus_admin_name']) && $_SESSION['lotus_admin_name'] == '郑瑞丰') {
                echo '<li><a href="javascript: void(0);" id="createContract">长沙凯德&富兴&宁乡-初始化租赁合同</a></li>';
            } else if(isset($_SESSION['lotus_admin_name']) && ($_SESSION['lotus_admin_name'] == '丁娜' || $_SESSION['lotus_admin_name'] == '杨诚')) {
                echo '<li><a href="javascript: void(0);" id="createContract">西安唐延路-初始化租赁合同</a></li>';
            } else if(isset($_SESSION['lotus_admin_name']) && $_SESSION['lotus_admin_name'] == '程海涛') {
                echo '<li><a href="javascript: void(0);" id="createContract">湖南永州愿景-初始化租赁合同</a></li>';
            }
            ?>
        </ul>
    </div>
</div>