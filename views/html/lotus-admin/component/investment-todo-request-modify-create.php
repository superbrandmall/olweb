<div class="modal fade" id="investment-todo-request-modify-create" tabindex="-1" role="dialog" aria-hidden="true" data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog modal-lg">
        <div class="modal-content c-square" style="background: #fff;">
            <div class="modal-header"><h4 class="text-center">上传<span class="headTxt"></span></h4></div>
            <div class="modal-body">
                <form id="create-form" class="form-horizontal" role="form" enctype="multipart/form-data">
                    <div class="col-md-4">
                        <div class="form-group">
                            <label class="col-md-4 control-label" style="padding-left: 22px;">单号</label>
                            <div class="col-md-8 col-sm-12" id="reqBizId" style="padding-top: 7px;">-</div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-4 control-label" style="padding-left: 22px;">表单类型</label>
                            <div class="col-md-8 col-sm-12" id="reqFormType" style="padding-top: 7px;">-</div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label class="col-md-4 control-label" style="padding-left: 22px;">签约编号</label>
                            <div class="col-md-8 col-sm-12" id="reqContractNo" style="padding-top: 7px;">-</div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-4 control-label" style="padding-left: 22px;">商户</label>
                            <div class="col-md-8 col-sm-12" id="reqTenantName" style="padding-top: 7px;">-</div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label class="col-md-4 control-label" style="padding-left: 22px;">状态</label>
                            <div class="col-md-8 col-sm-12" id="reqFormStatus" style="padding-top: 7px;">-</div>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <table class="table table-responsive" style="font-size: 11px; text-align: left;">
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
                                    <td class="headTxt"></td>
                                    <td id="reqFileCreated_0"></td>
                                    <td>
                                        <input type="text" id="reqFile_0" name="reqFileName_0" style="border: 0 none; text-align: left; width: 100%;" readonly/>
                                    </td>
                                    <td id="reqFileFileSize_0"></td>
                                    <td id="reqFileAction_0"></td>
                                </tr>
                                <?php
                                    for($i=1;$i<10;$i++){
                                ?>
                                <tr style="display: none;">
                                    <td class="headTxt"></td>
                                    <td id="reqFileCreated_<?= $i; ?>"></td>
                                    <td>
                                        <input type="text" id="reqFile_<?= $i; ?>" name="reqFileName_<?= $i; ?>" style="border: 0 none; text-align: left; width: 100%;" readonly/>
                                    </td>
                                    <td id="reqFileFileSize_<?= $i; ?>"></td>
                                    <td id="reqFileAction_<?= $i; ?>"></td>
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
                        <div class="form-group">
                            <label class="col-md-2 control-label" style="padding-left: 22px;"><span class="headTxt">文件</span>上传</label>
                            <div class="col-md-10 col-sm-12">
                                 <div class="form-group input-group">
                                     <input type="text" id="fileName_reqFile" class="form-control" disabled placeholder="文件大小不超过10M" style="background-color: #fff; border: solid 1px rgb(210, 214, 222);">
                                    <input type="file" style="display: none;" onchange="javascript:$('input[id=\'fileName_reqFile\']').val(this.files[0].name);" accept="image/*,application/pdf" multiple />
                                    <div type="button" class="input-group-addon" id="reqUploadFile" style="padding: 6px 12px; font-size: 11px; cursor: pointer; border-left: 0 none; border-right: 0 none;"><i class="fa fa-upload"></i> 上传文件</div>
                                    <div type="button" class="input-group-addon" style="background-color: #3c8dbc; border-color: #367fa9; padding: 6px 12px; font-size: 11px; cursor: pointer; color: #fff;" onclick="javascript:$(this).parent().find('input[type=\'file\']').click();"><i class="fa fa-folder-open-o"></i> 选择文件 &hellip;</div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-2 control-label" style="padding-left: 22px;">其它文件上传</label>
                            <div class="col-md-10 col-sm-12">
                                 <div class="form-group input-group">
                                    <input type="text" id="fileName_otherFiles" class="form-control" disabled placeholder="文件大小不超过10M" style="background-color: #fff; border: solid 1px rgb(210, 214, 222);">
                                    <input type="file" style="display: none;" onchange="javascript:$('input[id=\'fileName_otherFiles\']').val(this.files[0].name);" accept="image/*,application/pdf" multiple />
                                    <div type="button" class="input-group-addon" id="uploadFile_otherFiles" style="padding: 6px 12px; font-size: 11px; cursor: pointer; border-left: 0 none; border-right: 0 none;"><i class="fa fa-upload"></i> 上传文件</div>
                                    <div type="button" class="input-group-addon" style="background-color: #3c8dbc; border-color: #367fa9; padding: 6px 12px; font-size: 11px; cursor: pointer; color: #fff;" onclick="javascript:$(this).parent().find('input[type=\'file\']').click();"><i class="fa fa-folder-open-o"></i> 选择文件 &hellip;</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="form-group">
                            <label class="col-md-5 control-label"></label>
                            <div class="col-md-7 col-sm-12" style="text-align: left;">
                                <button type="button" class="btn btn-info btn-sm" id="createToDoModify"><i class="fa fa-search icon-white"></i> <span class="hidden-xs">确定</span></button>
                                <button type="button" class="btn btn-default btn-sm" data-dismiss="modal" aria-label="Close"><i class="fa fa-times icon-white"></i> <span class="hidden-xs">取消</span></button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>