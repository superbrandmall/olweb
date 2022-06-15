<div class="box box-default" id="investmentContractCertificates">    
    <div class="box-header with-border">
        <h3 class="box-title">合同附件</h3>
        <div class="box-tools">
            <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
            </button>
        </div>
    </div>
    <div class="box-body">
        <div class="col-md-12">
            <h5>营业执照和法人代表身份证件请从商户管理中上传，商标注册证和品牌授权书请从品牌管理中上传。</h5>
            <span class="label label-danger">请先保存!</span>
            <span class="label label-danger">请先保存!!</span>
            <span class="label label-danger">请先保存!!!</span>
            <hr>
            <table class="table table-responsive" style="margin-top: 0; text-align: left;">
                <thead id="assetsListingTable-sticky-header">
                    <tr>
                        <th style="text-align: left;">
                            <div class="th-inner">附件类型</div>
                            <div class="fht-cell"></div>
                        </th>
                        <th style="text-align: left;">
                            <div class="th-inner">上传时间</div>
                            <div class="fht-cell"></div>
                        </th>
                        <th style="text-align: left;">
                            <div class="th-inner">文件名</div>
                            <div class="fht-cell"></div>
                        </th>
                        <th style="text-align: left;">
                            <div class="th-inner">大小</div>
                            <div class="fht-cell"></div>
                        </th>
                        <th style="text-align: left;">
                            <div class="th-inner">操作</div>
                            <div class="fht-cell"></div>
                        </th>
                    </tr>
                </thead>
                <tbody id="fileList">
                    <tr>
                        <td>营业执照</td>
                        <td id="businessLicenseCreated_0"></td>
                        <td>
                            <input type="text" id="businessLicense_0" name="businessLicense_0" style="border: 0 none; text-align: left; width: 100%;" placeholder="请从商户管理中上传营业执照" readonly/>
                        </td>
                        <td id="businessLicenseFileSize_0"></td>
                        <td id="businessLicenseAction_0"></td>
                    </tr>
                    <?php
                        for($i=1;$i<10;$i++){
                    ?>
                    <tr style="display: none;">
                        <td>营业执照</td>
                        <td id="businessLicenseCreated_<?= $i; ?>"></td>
                        <td>
                            <input type="text" id="businessLicense_<?= $i; ?>" name="businessLicense_<?= $i; ?>" style="border: 0 none; text-align: left; width: 100%;" readonly/>
                        </td>
                        <td id="businessLicenseFileSize_<?= $i; ?>"></td>
                        <td id="businessLicenseAction_<?= $i; ?>"></td>
                    </tr>
                    <?php
                        }
                    ?>
                    <tr>
                        <td>法人代表身份证件</td>
                        <td id="idCardCreated_0"></td>
                        <td>
                            <input type="text" id="idCard_0" name="idCard_0" style="border: 0 none; text-align: left; width: 100%;" placeholder="请从商户管理中上传法人代表身份证件" readonly/>
                        </td>
                        <td id="idCardFileSize_0"></td>
                        <td id="idCardAction_0"></td>
                    </tr>
                    <?php
                        for($i=1;$i<10;$i++){
                    ?>
                    <tr style="display: none;">
                        <td>法人代表身份证件</td>
                        <td id="idCardCreated_<?= $i; ?>"></td>
                        <td>
                            <input type="text" id="idCard_<?= $i; ?>" name="idCard_<?= $i; ?>" style="border: 0 none; text-align: left; width: 100%;" readonly/>
                        </td>
                        <td id="idCardFileSize_<?= $i; ?>"></td>
                        <td id="idCardAction_<?= $i; ?>"></td>
                    </tr>
                    <?php
                        }
                    ?>
                    <tr>
                        <td>商标注册证</td>
                        <td id="trademarkCreated_0"></td>
                        <td>
                            <input type="text" id="trademark_0" name="trademark_0" style="border: 0 none; text-align: left; width: 100%;" placeholder="请从品牌管理中上传商标注册证" readonly/>
                        </td>
                        <td id="trademarkFileSize_0"></td>
                        <td id="trademarkAction_0"></td>
                    </tr>
                    <?php
                        for($i=1;$i<10;$i++){
                    ?>
                    <tr style="display: none;">
                        <td>商标注册证</td>
                        <td id="trademarkCreated_<?= $i; ?>"></td>
                        <td>
                            <input type="text" id="trademark_<?= $i; ?>" name="trademark_<?= $i; ?>" style="border: 0 none; text-align: left; width: 100%;" readonly/>
                        </td>
                        <td id="trademarkFileSize_<?= $i; ?>"></td>
                        <td id="trademarkAction_<?= $i; ?>"></td>
                    </tr>
                    <?php
                        }
                    ?>
                    <tr>
                        <td>品牌授权书</td>
                        <td id="brandAuthorizationCreated_0"></td>
                        <td>
                            <input type="text" id="brandAuthorization_0" name="brandAuthorization_0" style="border: 0 none; text-align: left; width: 100%;" placeholder="请从品牌管理中上传品牌授权书" readonly/>
                        </td>
                        <td id="brandAuthorizationFileSize_0"></td>
                        <td id="brandAuthorizationAction_0"></td>
                    </tr>
                    <?php
                        for($i=1;$i<10;$i++){
                    ?>
                    <tr style="display: none;">
                        <td>品牌授权书</td>
                        <td id="brandAuthorizationCreated_<?= $i; ?>"></td>
                        <td>
                            <input type="text" id="brandAuthorization_<?= $i; ?>" name="brandAuthorization_<?= $i; ?>" style="border: 0 none; text-align: left; width: 100%;" readonly/>
                        </td>
                        <td id="brandAuthorizationFileSize_<?= $i; ?>"></td>
                        <td id="brandAuthorizationAction_<?= $i; ?>"></td>
                    </tr>
                    <?php
                        }
                    ?>
                    <tr>
                        <td>其它文件</td>
                        <td id="otherFilesCreated_0"></td>
                        <td>
                            <input type="text" id="otherFiles_0" name="otherFiles_0" style="border: 0 none; text-align: left; width: 100%;" readonly/>
                        </td>
                        <td id="otherFilesFileSize_0"></td>
                        <td id="otherFilesAction_0"></td>
                    </tr>
                    <?php
                        for($i=1;$i<10;$i++){
                    ?>
                    <tr style="display: none;">
                        <td>其它文件</td>
                        <td id="otherFilesCreated_<?= $i; ?>"></td>
                        <td>
                            <input type="text" id="otherFiles_<?= $i; ?>" name="otherFiles_<?= $i; ?>" style="border: 0 none; text-align: left; width: 100%;" readonly/>
                        </td>
                        <td id="otherFilesFileSize_<?= $i; ?>"></td>
                        <td id="otherFilesAction_<?= $i; ?>"></td>
                    </tr>
                    <?php
                        }
                    ?>
                </tbody>
            </table>
        </div>
        
        <div class="col-md-12">
            <div class="col-md-12">
                <label class="col-md-2 control-label">其它文件上传</label>
                <div class="col-md-10 col-sm-12">
                    <div class="form-group input-group">
                        <input type="text" id="fileName_otherFiles" class="form-control" disabled style="background-color: #fff; border: solid 1px rgb(210, 214, 222);">
                        <input type="file" style="display: none;" onchange="javascript:$('input[id=\'fileName_otherFiles\']').val(this.files[0].name);" accept="image/*,application/pdf" multiple />
                        <div type="button" class="input-group-addon" id="uploadFile_otherFiles" style="padding: 6px 12px; font-size: 11px; cursor: pointer; border-left: 0 none; border-right: 0 none;"><i class="fa fa-upload"></i> 上传文件</div>
                        <div type="button" class="input-group-addon" style="background-color: #3c8dbc; border-color: #367fa9; padding: 6px 12px; font-size: 11px; cursor: pointer; color: #fff;" onclick="javascript:$(this).parent().find('input[type=\'file\']').click();"><i class="fa fa-folder-open-o"></i> 选择文件 &hellip;</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>