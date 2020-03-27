<?php
$scripts = $scripts. '<script type="text/javascript" src="/views/assets/base/js/v2/engineering-admin.js"></script>';
?>

<div id="wrapper">
    <?php include ('navbar_top.php'); ?>
    <div id="page-wrapper">
        <div class="row">
            <div class="col-xs-12">
                <h4 class="page-header">工程条件确认</h4>
                <div class="panel panel-default">
                    <div class="panel-heading">
                        请仔细阅读并提交确认
                    </div>
                    <div class="panel-body">
                        <div class="table-responsive">
                            <table class="table table-striped table-bordered table-hover no-footer" cellspacing="0">
                                <tbody>
                                    <tr>
                                        <td class="table-sub-title">结构</td>
                                        <td>地面荷载</td>
                                    </tr>
                                    <tr>
                                        <td class="table-sub-title">电气</td>
                                        <td>设计容量；光纤</td>
                                    </tr>
                                    <tr>
                                        <td class="table-sub-title">给水</td>
                                        <td>设计管径</td>
                                    </tr>
                                    <tr>
                                        <td class="table-sub-title">排水</td>
                                        <td>设计管径</td>
                                    </tr>
                                    <tr>
                                        <td class="table-sub-title">空调</td>
                                        <td>设计冷量</td>
                                    </tr>
                                    <tr>
                                        <td class="table-sub-title">排油烟</td>
                                        <td>设计排油烟量</td>
                                    </tr>
                                    <tr>
                                        <td class="table-sub-title">排油烟</td>
                                        <td>设计补（新）风量</td>
                                    </tr>
                                    <tr>
                                        <td class="table-sub-title">燃气</td>
                                        <td>设计流量</td>
                                    </tr>
                                    <tr>
                                        <td class="table-sub-title">消防</td>
                                        <td>消防验流程</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xs-12">
                <center>
                    <button class="btn btn-primary" id="confirm_engineering"><i class="fa fa-check" aria-hidden="true"> </i> 确认工程条件并获取合同</button>
                </center>
            </div>
        </div>
    </div>
</div>

<?php include ('menu_bottom.php'); ?>

<?php include ('footer.php'); ?>