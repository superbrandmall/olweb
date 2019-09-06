<?php
$scripts = $scripts. '<script type="text/javascript" src="/views/assets/base/js/ly-admin/summary-admin.js"></script>';
?>

<div id="wrapper">
    <?php include ('navbar_top.php'); ?>
    <?php include ('navbar_side.php'); ?>
    <div id="page-wrapper" style="color: #bdbdbd;">
        <div class="row">
            <div class="col-lg-12">
                <h1 class="page-header">Venue Rental Summary by Area</h1>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-6">
                <div class="table-responsive">
                    <table id="summary_area_percentage" class="table table-bordered">
                        <thead>
                            <tr>
                                <th>楼层</th>
                                <th>在租</th>
                                <th style="padding: 0;">
                                    <select class="form-control" name="days-before-expiration" style="border: 0 none; box-shadow: none; color: #bdbdbd; background-color: #252c48;">
                                        <option value="90">待租90天</option>
                                        <option value="60">待租60天</option>
                                        <option value="30">待租30天</option>
                                    </select>
                                </th>
                                <th>空铺</th>
                                <th>改造</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
                <!-- /.table-responsive -->
            </div>
            
            <div class="col-lg-6">
                <div class="table-responsive">
                    <table id="summary_area" class="table table-bordered">
                        <thead>
                            <tr>
                                <th>楼层</th>
                                <th>在租</th>
                                <th style="padding: 0;">
                                    <select class="form-control" name="days-before-expiration" style="border: 0 none; box-shadow: none; color: #bdbdbd; background-color: #252c48;">
                                        <option value="90">待租90天</option>
                                        <option value="60">待租60天</option>
                                        <option value="30">待租30天</option>
                                    </select>
                                </th>
                                <th>空铺</th>
                                <th>改造</th>
                                <th>合计</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
                <!-- /.table-responsive -->
            </div>
        </div>
        
        <div class="row">
            <div class="col-lg-12">
                <h1 class="page-header">Venue Rental Summary by Units</h1>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-6">
                <div class="table-responsive">
                    <table id="summary_units_percentage" class="table table-bordered">
                        <thead>
                            <tr>
                                <th>楼层</th>
                                <th>在租</th>
                                <th style="padding: 0;">
                                    <select class="form-control" name="days-before-expiration" style="border: 0 none; box-shadow: none; color: #bdbdbd; background-color: #252c48;">
                                        <option value="90">待租90天</option>
                                        <option value="60">待租60天</option>
                                        <option value="30">待租30天</option>
                                    </select>
                                </th>
                                <th>空铺</th>
                                <th>改造</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
                <!-- /.table-responsive -->
            </div>
            
            <div class="col-lg-6">
                <div class="table-responsive">
                    <table id="summary_units" class="table table-bordered">
                        <thead>
                            <tr>
                                <th>楼层</th>
                                <th>在租</th>
                                <th style="padding: 0;">
                                    <select class="form-control" name="days-before-expiration" style="border: 0 none; box-shadow: none; color: #bdbdbd; background-color: #252c48;">
                                        <option value="90">待租90天</option>
                                        <option value="60">待租60天</option>
                                        <option value="30">待租30天</option>
                                    </select>
                                </th>
                                <th>空铺</th>
                                <th>改造</th>
                                <th>合计</th>
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
</div>

<?php include ('footer.php'); ?>