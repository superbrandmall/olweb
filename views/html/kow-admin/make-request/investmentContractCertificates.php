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
            <span class="label label-danger">上传附件前请先保存!</span>
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
                <label class="col-md-2 control-label">附件上传</label>
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