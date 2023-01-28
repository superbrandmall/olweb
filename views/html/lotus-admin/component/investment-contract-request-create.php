<div class="modal fade" id="investment-contract-request-create" tabindex="-1" role="dialog" aria-hidden="true" data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog modal-md">
        <div class="modal-content c-square" style="background: #fff;">
            <div class="modal-header"><h4 class="text-center">创建初始化租赁合同</h4></div>
            <div class="modal-body">
                <form id="create-form" class="form-horizontal" role="form" enctype="multipart/form-data">
                    <div class="col-md-12">
                        <div class="form-group">
                            <label class="col-md-3 control-label" style="text-align: right;"><span class="btn-box-tool-lg">*</span> 项目</label>
                            <div class="col-md-9 col-sm-12">
                                <select class="select2 mallCode" id="createContractDepartment" style="width: 100%"></select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-3 control-label" style="text-align: right;"><span class="btn-box-tool-lg">*</span> 铺位</label>
                            <div class="col-md-9 col-sm-12">
                                <select class="select2" id="createContractStore" style="width: 100%"></select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-3 control-label" style="text-align: right;"><span class="btn-box-tool-lg">*</span> 品牌</label>
                            <div class="col-md-9 col-sm-12">
                                <select class="select2" id="createContractBrandName" style="width: 100%"></select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-3 control-label" style="text-align: right;"><span class="btn-box-tool-lg">*</span> 商户</label>
                            <div class="col-md-9 col-sm-12">
                                <select id="createContractSelectTenant" class="select2" style="width: 100%"></select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-3 control-label" style="text-align: right;"><span class="btn-box-tool-lg">*</span> 租赁期限</label>
                            <div class="col-md-9 col-sm-12">
                                <div class="input-daterange input-group">
                                    <input type="text" class="form-control" id="createContractStartDate" readonly style="border: 1px solid #ccc; background: #fff; border-radius: 0; border-right: none;" />
                                    <span class="input-group-addon" style="border-left: none; background: transparent;"><i class="fa fa-calendar"></i></span>
                                    <span class="input-group-addon" style="border: none; background: transparent;">-</span>
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="createContractEndDate" readonly style="border: 1px solid #ccc; background: #fff; border-radius: 0; border-right: none;" />
                                        <span class="input-group-addon" style="border-left: none; background: transparent;"><i class="fa fa-calendar"></i></span>
                                    </div>    
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-3 control-label" style="text-align: right;"><span class="btn-box-tool-lg">*</span> 计租方式</label>
                            <div class="col-md-9 col-sm-12">
                                <select class="select2" id="createContractSelectRentCalculationMode" style="width: 100%"></select>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="form-group">
                            <label class="col-md-3 control-label"></label>
                            <div class="col-md-9 col-sm-12" style="text-align: left;">
                                <button type="button" class="btn btn-info btn-sm" id="createContractRequest"><i class="fa fa-search icon-white"></i> <span class="hidden-xs">确定</span></button>
                                <button type="button" class="btn btn-default btn-sm" data-dismiss="modal" aria-label="Close"><i class="fa fa-times icon-white"></i> <span class="hidden-xs">取消</span></button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>