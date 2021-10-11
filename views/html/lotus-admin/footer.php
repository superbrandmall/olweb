<?php
if(isset($_SESSION['lotus_admin_login'])) {
    if(isset($_GET['p']) && $_GET['p'] != 'lotus-admin/reset') {
?>
            <footer class="main-footer hidden-print">
                <div class="pull-right hidden-xs">
                </div>
                &copy; COPYRIGHT <?= date("Y") ?>. 上海帝泰发展有限公司版权所有
            </footer>
        </div>

        <div class="modal  modal-danger fade" id="dataConfirmModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title" id="myModalLabel"></h4>
                    </div>
                    <div class="modal-body"></div>
                    <div class="modal-footer">
                        <form method="post" id="deleteForm" role="form">
                            <button type="button" class="btn btn-default  pull-left" data-dismiss="modal">取消</button>
                            <button type="submit" class="btn btn-outline" id="dataConfirmOK">确定</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
<?php
    }
}
?>

        <script type="text/javascript" src="/views/assets/base/js/lotus-admin/dist/all.js"></script>
        <script type="text/javascript" src="/views/assets/base/js/lotus-admin/bootstrap-table.min.js"></script>
        <script type="text/javascript" src="/views/assets/base/js/lotus-admin/extensions/mobile/bootstrap-table-mobile.js"></script>
        <script type="text/javascript" src="/views/assets/base/js/lotus-admin/FileSaver.min.js"></script>
        <script type="text/javascript" src="/views/assets/base/js/lotus-admin/xlsx.core.min.js"></script>
        <script type="text/javascript" src="/views/assets/base/js/lotus-admin/jspdf.min.js"></script>
        <script type="text/javascript" src="/views/assets/base/js/lotus-admin/extensions/cookie/bootstrap-table-cookie.js"></script>
        <script type="text/javascript" src="/views/assets/base/js/lotus-admin/plugins/chart-master/Chart.js"></script>
        <script type="text/javascript" src="/views/assets/plugins/jquery.cookie.js"></script>
        <script type="text/javascript" src="/views/assets/plugins/jquery.validate.min.js"></script>
        <script type="text/javascript" src="/views/assets/plugins/jquery.imagemapster.js"></script>
        <script type="text/javascript" src="/views/assets/base/js/mall-code.js"></script>
        <script type="text/javascript" src="/views/assets/base/js/lotus-admin/protocol-admin.js"></script>
        <?php
            echo $scripts; 
        ?>
        <script type="text/javascript" src="/views/assets/base/js/lotus-admin/scripts-admin.js"></script>
    </body>
</html>