<?php
$scripts = $scripts. '<script type="text/javascript" src="/views/assets/base/js/v2/authentication-admin.js"></script>';
?>

<div id="wrapper">
    <?php include ('navbar_top.php'); ?>
    <div id="page-wrapper">
        <div class="row">
            <div class="col-xs-12">
                <h4 class="page-header"><i class="fa fa-check-square-o" aria-hidden="true"></i> 授权认证</h4>
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <i class="fa fa-caret-square-o-down" aria-hidden="true"></i> 请选择您的业态
                    </div>
                    <div class="panel-body">
                        <div class="form-group">
                            <label for="modality_0" class="hide">一级业态</label>
                            <select class="form-control input-sm" id="modality_0" name="modality_0" onchange="getBrandModality1(this.value);">
                                <option value="">请选择一级业态</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="modality_1" class="hide">二级业态</label>
                            <select class="form-control input-sm" id="modality_1" name="modality_1" onchange="getBrandModality2(this.value);" required>
                                <option value="">请选择二级业态</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="modality_2" class="hide">三级业态</label>
                            <select class="form-control input-sm" id="modality_2" name="modality_2" onchange="getBrandModality3(this.value);" required>
                                <option value="">请选择三级业态</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="modality_3" class="hide">四级业态</label>
                            <select class="form-control input-sm" id="modality_3" name="modality_3" required>
                                <option value="">请选择四级业态</option>
                            </select>
                        </div>
                    </div>
                </div>
                
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <i class="fa fa-upload" aria-hidden="true"></i> 请及时上传以下相关资料
                    </div>
                    <div class="panel-body">
                        <div class="form-group">
                            <label><i class="fa fa-id-card-o" aria-hidden="true"></i> 名片 (.jpg/.png格式)</label>
                            <input type="file">
                        </div>
                        <div class="form-group">
                            <label><i class="fa fa-registered" aria-hidden="true"></i> 品牌Logo (.jpg/.png格式)</label>
                            <input type="file">
                        </div>
                        <div class="form-group">
                            <label><i class="fa fa-file-text-o" aria-hidden="true"></i> 品牌介绍 (.pdf格式)</label>
                            <input type="file">
                        </div>
                    </div>
                </div>
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <i class="fa fa-table" aria-hidden="true"></i> 请填写现有门店所在商场、楼层、面积、营业额
                    </div>
                    <div class="panel-body">
                        <div class="table-responsive">
                            <table class="table table-striped table-bordered table-hover no-footer" cellspacing="0">
                                <tbody>
                                    <tr>
                                        <th class="table-sub-title">所在商场</th>
                                        <th class="table-sub-title">楼层</th>
                                        <th class="table-sub-title">面积(m<sup>2</sup>)</th>
                                        <th class="table-sub-title">营业额(万)</th>
                                    </tr>
                                    <tr>
                                        <td><input type="text" value="港汇" style="width:100%;"></td>
                                        <td><input type="text" value="4F" style="width:100%;"></td>
                                        <td><input type="text" value="432" style="width:100%;"></td>
                                        <td><input type="text" value="100" style="width:100%;"></td>
                                    </tr>
                                    <tr>
                                        <td><input type="text" value="美罗城" style="width:100%;"></td>
                                        <td><input type="text" value="1F" style="width:100%;"></td>
                                        <td><input type="text" value="400" style="width:100%;"></td>
                                        <td><input type="text" value="300" style="width:100%;"></td>
                                    </tr>
                                    <tr>
                                        <td><input type="text" value="大宁国际" style="width:100%;"></td>
                                        <td><input type="text" value="1F" style="width:100%;"></td>
                                        <td><input type="text" value="270" style="width:100%;"></td>
                                        <td><input type="text" value="100" style="width:100%;"></td>
                                    </tr>
                                    <tr>
                                        <td><input type="text" value="LCM" style="width:100%;"></td>
                                        <td><input type="text" value="1F" style="width:100%;"></td>
                                        <td><input type="text" value="530" style="width:100%;"></td>
                                        <td><input type="text" value="120" style="width:100%;"></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xs-12" style="margin-bottom: 40px;">
                <center>
                    <button class="btn btn-success" id="to_authenticate"><i class="fa fa-paper-plane" aria-hidden="true"></i> 提交认证</button>
                </center>
            </div>
        </div>
    </div>
</div>

<?php include ('menu_bottom.php'); ?>
<?php include ('footer.php'); ?>