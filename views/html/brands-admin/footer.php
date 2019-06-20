<?php
if(isset($_SESSION['brands_admin_login'])) {
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
?>

        <script type="text/javascript" src="/views/assets/base/js/brands-admin/dist/all.js"></script>
        <script type="text/javascript" src="/views/assets/base/js/brands-admin/bootstrap-table.min.js"></script>
        <script type="text/javascript" src="/views/assets/base/js/brands-admin/extensions/mobile/bootstrap-table-mobile.js"></script>
        <script type="text/javascript" src="/views/assets/base/js/brands-admin/FileSaver.min.js"></script>
        <script type="text/javascript" src="/views/assets/base/js/brands-admin/xlsx.core.min.js"></script>
        <script type="text/javascript" src="/views/assets/base/js/brands-admin/jspdf.min.js"></script>
        <script type="text/javascript" src="/views/assets/base/js/brands-admin/extensions/cookie/bootstrap-table-cookie.js"></script>
        <script type="text/javascript" src="/views/assets/base/js/brands-admin/plugins/chart-master/Chart.js"></script>
        <script type="text/javascript" src="/views/assets/plugins/jquery.cookie.js"></script>
        <script type="text/javascript" src="/views/assets/plugins/jquery.validate.min.js"></script>
        <script type="text/javascript" src="/views/assets/base/js/mall-code.js"></script>
        <script type="text/javascript" src="/views/assets/base/js/brands-admin/protocol-admin.js"></script>
        <?php
            echo $scripts; 
        ?>
        <script>
                /* ChartJS
                 * -------
                 */

                // -----------------------
                // - LINE CHART -
                // -----------------------



                //var ctx = document.getElementById('salesChart').getContext("2d")
                //var myChart = new Chart(ctx, {
                //   type: 'line'
                //});


                //$.ajax({
                //    type: 'GET',
                //    url: 'https://demo.snipeitapp.com/api/v1/statuslabels/assets',
                //    headers: {
                //        "X-Requested-With": 'XMLHttpRequest',
                //        "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr('content')
                //    },

                //    dataType: 'json',
                //   success: function (data) {
                //       var ctx = new Chart(ctx,{
                //          type: 'line',
                //            data: data,
                //            options: lineOptions
                //        });
                //    },
                //    error: function (data) {
                //         window.location.reload(true);
                //     }
                // });





                // ---------------------------
                // - END MONTHLY SALES CHART -
                // ---------------------------


                /*var pieChartCanvas = $("#statusPieChart").get(0).getContext("2d");
                var pieChart = new Chart(pieChartCanvas);
                var ctx = document.getElementById("statusPieChart");



                $.ajax({
                    type: 'GET',
                    url: 'https://demo.snipeitapp.com/api/v1/statuslabels/assets',
                    headers: {
                        "X-Requested-With": 'XMLHttpRequest',
                        "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr('content')
                    },

                    dataType: 'json',
                    success: function (data) {
                        var myPieChart = new Chart(ctx, {

                            type: 'doughnut',
                            data: data,
                            options: pieOptions
                        });
                    },
                    error: function (data) {
                    }
                });*/   
        </script>
        <script type="text/javascript" src="/views/assets/base/js/brands-admin/scripts-admin.js"></script>
    </body>
</html>