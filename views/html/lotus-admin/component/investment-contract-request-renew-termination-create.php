<div class="modal fade" id="investment-contract-request-renew-termination-create" tabindex="-1" role="dialog" aria-hidden="true" data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog modal-md">
        <div class="modal-content c-square" style="background: #fff;">
            <div class="modal-header"><h4 class="text-center"></h4></div>
            <div class="modal-body">
                <form id="create-form" class="form-horizontal" role="form" enctype="multipart/form-data">
                    <div class="col-md-12">
                        <div class="form-group">
                            <label class="col-md-4 control-label" style="text-align: right;">门店</label>
                            <div class="col-md-8 col-sm-12">
                                <select class="select2" id="renewDepartment" style="width: 100%">
                                    <option value="">未选择</option>
                                    <option value="SC033">川沙店</option>
                                    <option value="SC001">杨高南路店</option>
                                    <option value="SC005">上南店</option>
                                    <option value="SC011">杨高北路店</option>
                                    <option value="SC043">杨高中路店</option>
                                    <option value="SC078">浦江店</option>
                                    <option value="SC145">临港店</option>
                                    <option value="SC055">松江文诚店</option>
                                    <option value="SC027">松江岳阳店</option>
                                    <option value="SC126">牡丹江店</option>
                                    <option value="SC060">蕴川店</option>
                                    <option value="SC082">新港店</option>
                                    <option value="SC010">汶水店</option>
                                    <option value="SC040">保德店</option>
                                    <option value="SC041">南奉店</option>
                                    <option value="SC127">南桥店</option>
                                    <option value="SC050">金山店</option>
                                </select>
                            </div>
                        </div> 
                        <div class="form-group">
                            <label class="col-md-4 control-label" style="text-align: right;"><span class="btn-box-tool-lg">*</span> 合同</label>
                            <div class="col-md-8 col-sm-12" required>
                                <select class="select2" id="renewContract" style="width: 100%"></select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-4 control-label" style="text-align: right;">商户</label>
                            <div class="col-md-8 col-sm-12" id="renewTenant" style="padding-top: 7px;">-</div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-4 control-label" style="text-align: right;">店招</label>
                            <div class="col-md-8 col-sm-12" id="renewContractName" style="padding-top: 7px;">-</div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-4 control-label" style="text-align: right;">门牌号</label>
                            <div class="col-md-8 col-sm-12" id="renewUnitName" style="padding-top: 7px;">-</div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-4 control-label" style="text-align: right;">租赁期限</label>
                            <div class="col-md-8 col-sm-12" id="renewStartEndDate" style="padding-top: 7px;">-</div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-4 control-label" style="text-align: right;"><span class="btn-box-tool-lg">*</span> 表单类型</label>
                            <div class="col-md-8 col-sm-12" required>
                                <select class="select2" id="updateFormType" style="width: 100%" disabled></select>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="form-group">
                            <label class="col-md-4 control-label"></label>
                            <div class="col-md-8 col-sm-12" style="text-align: left;">
                                <button type="button" class="btn btn-info btn-sm" id="createRequestRenew"><i class="fa fa-search icon-white"></i> <span class="hidden-xs">确定</span></button>
                                <button type="button" class="btn btn-default btn-sm" data-dismiss="modal" aria-label="Close"><i class="fa fa-times icon-white"></i> <span class="hidden-xs">取消</span></button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>