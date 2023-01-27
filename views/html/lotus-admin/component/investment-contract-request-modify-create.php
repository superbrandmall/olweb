<div class="modal fade" id="investment-contract-request-modify-create" tabindex="-1" role="dialog" aria-hidden="true" data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog modal-md">
        <div class="modal-content c-square" style="background: #fff;">
            <div class="modal-header"><h4 class="text-center"></h4></div>
            <div class="modal-body">
                <form id="create-form" class="form-horizontal" role="form" enctype="multipart/form-data">
                    <div class="col-md-12">
                        <div class="form-group">
                            <label class="col-md-4 control-label" style="text-align: right;">项目</label>
                            <div class="col-md-8 col-sm-12">
                                <select class="select2 mallCode" id="modifyDepartment" style="width: 100%"></select>
                            </div>
                        </div> 
                        <div class="form-group">
                            <label class="col-md-4 control-label" style="text-align: right;"><span class="btn-box-tool-lg">*</span> 合同</label>
                            <div class="col-md-8 col-sm-12" required>
                                <select class="select2" id="modifyContract" style="width: 100%"></select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-4 control-label" style="text-align: right;">商户</label>
                            <div class="col-md-8 col-sm-12" id="modifyTenant" style="padding-top: 7px;">-</div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-4 control-label" style="text-align: right;">店招</label>
                            <div class="col-md-8 col-sm-12" id="modifyContractName" style="padding-top: 7px;">-</div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-4 control-label" style="text-align: right;">门牌号</label>
                            <div class="col-md-8 col-sm-12" id="modifyUnitName" style="padding-top: 7px;">-</div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-4 control-label" style="text-align: right;">租赁期限</label>
                            <div class="col-md-8 col-sm-12" id="modifyStartEndDate" style="padding-top: 7px;">-</div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-4 control-label" style="text-align: right;"><span class="btn-box-tool-lg">*</span> 表单类型</label>
                            <div class="col-md-8 col-sm-12" required>
                                <select class="select2" id="modifyUpdateFormType" style="width: 100%" disabled></select>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="form-group">
                            <label class="col-md-4 control-label"></label>
                            <div class="col-md-8 col-sm-12" style="text-align: left;">
                                <button type="button" class="btn btn-info btn-sm" id="modifyCreateRequest"><i class="fa fa-search icon-white"></i> <span class="hidden-xs">确定</span></button>
                                <button type="button" class="btn btn-default btn-sm" data-dismiss="modal" aria-label="Close"><i class="fa fa-times icon-white"></i> <span class="hidden-xs">取消</span></button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>