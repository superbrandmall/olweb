<div class="modal fade" id="submitStateModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" data-backdrop="static">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title" id="myModalLabel">提交审核中，请稍后</h4>
            </div>
            <div id="submitState" class="modal-body"></div>
        </div>
    </div>
</div>
<?php
if(!isset($_SESSION['lotus_admin_login'])) {
    if(isset($_GET['p']) && $_GET['p'] == 'lotus-admin/login') {
?>
    <footer class="main-footer hidden-print text-center">
        <div class="pull-right hidden-xs"></div>
        &copy; COPYRIGHT <?= date("Y") ?>. 上海帝泰发展有限公司版权所有
        . <a target="_blank" href="https://beian.miit.gov.cn/">沪ICP备14029636号-1</a>
        . <a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=31011502015111"><img src="/views/assets/base/img/content/misc/gongan.png" />沪公网安备 31011502015111号</a>
    </footer>
<?php
    }
}
?>

        <script type="text/javascript" src="/views/assets/base/js/lotus-admin/dist/all.js"></script>
        <script type="text/javascript" src="/views/assets/base/js/lotus-admin/bootstrap-table.min.js"></script>
        <script type="text/javascript" src="/views/assets/base/js/lotus-admin/extensions/mobile/bootstrap-table-mobile.js"></script>
        <script type="text/javascript" src="/views/assets/base/js/lotus-admin/extensions/cookie/bootstrap-table-cookie.js"></script>
        <script type="text/javascript" src="/views/assets/plugins/jquery.cookie.js"></script>
        <script type="text/javascript" src="/views/assets/plugins/select2/select2.min.js"></script>
        <script type="text/javascript" src="/views/assets/plugins/jquery.validate.min.js"></script>
        <script type="text/javascript" src="/views/assets/plugins/jquery.imagemapster.js"></script>
        <script type="text/javascript" src="/views/assets/base/js/lotus-admin/protocol-admin.js"></script>
        <script type="text/javascript" src="/views/assets/plugins/accounting.min.js"></script>
        <?php
        if(isset($_SESSION['lotus_admin_name']) && $_SESSION['lotus_admin_name'] == '马俊') {
            echo '<script type="text/javascript" src="/views/assets/base/js/lotus-admin/scripts-admin.js?t='.date("Y-m-d").'"></script>'.PHP_EOL;
            echo '        <script type="text/javascript" src="/views/assets/base/js/lotus-admin/function-admin.js?t='.date("Y-m-d").'"></script>';
        } else {
            echo '<script type="text/javascript" src="/views/assets/base/js/lotus-admin/encrypted/script.js?t='.date("Y-m-d").'"></script>'.PHP_EOL;
            echo '        <script type="text/javascript" src="/views/assets/base/js/lotus-admin/encrypted/function.js?t='.date("Y-m-d").'"></script>';
        }
        ?>
        <?php
            echo $scripts; 
        ?>
        <script type="text/javascript" src="/views/assets/plugins/datepicker/bootstrap-datepicker.zh-CN.min.js"></script>
        <script type="text/javascript" src="/views/assets/plugins/datepicker/bootstrap-datepicker.min.js"></script>
        <script type="text/javascript">
            $(document).ready(function(){
                var title = $('.sub-header h4').ignore('.badge').text().replace(/<.>/g,"").replace(/\r|\n/ig,"").replace(/\s*/g,"");
                if(title != '' && title != null){
                    document.title = title;
                } else {
                    document.title = '首页';
                }
            })
            
            $.fn.ignore = function(sel){
                return this.clone().find(sel||">*").remove().end();
            };
        </script>
    </body>
</html>