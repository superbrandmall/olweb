<div class="modal fade" id="investment-todo-request-modify-create" tabindex="-1" role="dialog" aria-hidden="true" data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog modal-md">
        <div class="modal-content c-square" style="background: #fff;">
            <div class="modal-header"><h4 class="text-center"></h4></div>
            <div class="modal-body">
                <form id="create-form" class="form-horizontal" role="form" enctype="multipart/form-data">
                    <div class="col-md-12">
                        <div class="form-group">
                            <label class="col-md-3 control-label" style="text-align: right;">单号</label>
                            <div class="col-md-9 col-sm-12" id="reqBizId" style="padding-top: 7px;">-</div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-3 control-label" style="text-align: right;">签约编号</label>
                            <div class="col-md-9 col-sm-12" id="reqContractNo" style="padding-top: 7px;">-</div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-3 control-label" style="text-align: right;">状态</label>
                            <div class="col-md-9 col-sm-12" id="reqFormStatus" style="padding-top: 7px;">-</div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-3 control-label" style="text-align: right;">表单类型</label>
                            <div class="col-md-9 col-sm-12" id="reqFormType" style="padding-top: 7px;">-</div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-3 control-label" style="text-align: right;">商户</label>
                            <div class="col-md-9 col-sm-12" id="reqTenantName" style="padding-top: 7px;">-</div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-3 control-label" style="text-align: right;">文件名</label>
                            <div class="col-md-9 col-sm-12" id="reqFileName" style="padding-top: 7px;">-</div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-3 control-label" style="text-align: right;">上传时间</label>
                            <div class="col-md-9 col-sm-12" id="reqUploadTime" style="padding-top: 7px;">-</div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-3 control-label" style="text-align: right;">文件上传</label>
                            <div class="col-md-9 col-sm-12">
                                 <div class="form-group input-group">
                                     <input type="text" id="reqUploadFileName" class="form-control" disabled placeholder="文件大小不超过10M" style="background-color: #fff; border: solid 1px rgb(210, 214, 222);">
                                    <input type="file" style="display: none;" onchange="javascript:$('input[id=\'reqUploadFileName\']').val(this.files[0].name);" accept="image/*,application/pdf" multiple />
                                    <div type="button" class="input-group-addon" id="reqUploadFile" style="padding: 6px 12px; font-size: 11px; cursor: pointer; border-left: 0 none; border-right: 0 none;"><i class="fa fa-upload"></i> 上传文件</div>
                                    <div type="button" class="input-group-addon" style="background-color: #3c8dbc; border-color: #367fa9; padding: 6px 12px; font-size: 11px; cursor: pointer; color: #fff;" onclick="javascript:$(this).parent().find('input[type=\'file\']').click();"><i class="fa fa-folder-open-o"></i> 选择文件 &hellip;</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="form-group">
                            <label class="col-md-4 control-label"></label>
                            <div class="col-md-8 col-sm-12" style="text-align: left;">
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